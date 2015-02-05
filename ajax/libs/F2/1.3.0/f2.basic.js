;(function(exports) {

	if (exports.F2 && !exports.F2_TESTING_MODE) {
		return;
	}

/*!
    JSON.org requires the following notice to accompany json2:

    Copyright (c) 2002 JSON.org

    http://json.org

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
    to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
    and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    The Software shall be used for Good, not Evil.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
    IN THE SOFTWARE.
*/
/*
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


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

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
            Boolean.prototype.toJSON = function (key) {
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
}());

/*!
 * Hij1nx requires the following notice to accompany EventEmitter:
 * 
 * Copyright (c) 2011 hij1nx 
 * 
 * http://www.twitter.com/hij1nx
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the 'Software'), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
!function(exports, undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = new Object;
  }

  function configure(conf) {
    if (conf) {
      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.wildcard && (this.wildcard = conf.wildcard);
      if (this.wildcard) {
        this.listenerTree = new Object;
      }
    }
  }

  function EventEmitter(conf) {
    this._events = new Object;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }
    
    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }
        
        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
    
    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = new Object;
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;
            
            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  };

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    };

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {
    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener') {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      
      if (!this._all && 
        !this._events.error && 
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || this._all;
    }
    else {
      return this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {
    
    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;
        
        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if(!this._all) {
      this._all = [];
    }

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          return this;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1)
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  // if (typeof define === 'function' && define.amd) {
  //   define('EventEmitter2', [], function() {
  //     return EventEmitter;
  //   });
  // } else {
    exports.EventEmitter2 = EventEmitter; 
  // }

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);

/*!
 * F2 v1.3.0 09-16-2013
 * Copyright (c) 2013 Markit On Demand, Inc. http://www.openf2.org
 *
 * "F2" is licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * Please note that F2 ("Software") may contain third party material that Markit 
 * On Demand Inc. has a license to use and include within the Software (the 
 * "Third Party Material"). A list of the software comprising the Third Party Material 
 * and the terms and conditions under which such Third Party Material is distributed 
 * are reproduced in the ThirdPartyMaterial.md file available at:
 * 
 * https://github.com/OpenF2/F2/blob/master/ThirdPartyMaterial.md
 * 
 * The inclusion of the Third Party Material in the Software does not grant, provide 
 * nor result in you having acquiring any rights whatsoever, other than as stipulated 
 * in the terms and conditions related to the specific Third Party Material, if any.
 *
 */

var F2;
/**
 * Open F2
 * @module f2
 * @main f2
 */

F2 = (function() {

	/**
	 * Abosolutizes a relative URL
	 * @method _absolutizeURI
	 * @private
	 * @param {e.g., location.href} base
	 * @param {URL to absolutize} href
	 * @returns {string} URL
	 * Source: https://gist.github.com/Yaffle/1088850
	 * Tests: http://skew.org/uri/uri_tests.html
	 */
	var _absolutizeURI = function(base, href) {// RFC 3986

		function removeDotSegments(input) {
			var output = [];
			input.replace(/^(\.\.?(\/|$))+/, '')
				.replace(/\/(\.(\/|$))+/g, '/')
				.replace(/\/\.\.$/, '/../')
				.replace(/\/?[^\/]*/g, function (p) {
					if (p === '/..') {
						output.pop();
					} else {
						output.push(p);
					}
				});
			return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
		}

		href = _parseURI(href || '');
		base = _parseURI(base || '');

		return !href || !base ? null : (href.protocol || base.protocol) +
			(href.protocol || href.authority ? href.authority : base.authority) +
			removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
			(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
			href.hash;
	};

	/**
	 * Parses URI
	 * @method _parseURI
	 * @private
	 * @param {The URL to parse} url
	 * @returns {Parsed URL} string
	 * Source: https://gist.github.com/Yaffle/1088850
	 * Tests: http://skew.org/uri/uri_tests.html
	 */
	var _parseURI = function(url) {
		var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
		// authority = '//' + user + ':' + pass '@' + hostname + ':' port
		return (m ? {
				href     : m[0] || '',
				protocol : m[1] || '',
				authority: m[2] || '',
				host     : m[3] || '',
				hostname : m[4] || '',
				port     : m[5] || '',
				pathname : m[6] || '',
				search   : m[7] || '',
				hash     : m[8] || ''
			} : null);
	};

	return {
		/**
		 * A function to pass into F2.stringify which will prevent circular
		 * reference errors when serializing objects
		 * @method appConfigReplacer
		 */
		appConfigReplacer: function(key, value) {
			if (key == 'root' || key == 'ui' || key == 'height') {
				return undefined;
			} else {
				return value;
			}
		},
		/**
		 * The apps namespace is a place for app developers to put the javascript
		 * class that is used to initialize their app. The javascript classes should
		 * be namepaced with the {{#crossLink "F2.AppConfig"}}{{/crossLink}}.appId. 
		 * It is recommended that the code be placed in a closure to help keep the
		 * global namespace clean.
		 *
		 * If the class has an 'init' function, that function will be called 
		 * automatically by F2.
		 * @property Apps
		 * @type object
		 * @example
		 *     F2.Apps["com_example_helloworld"] = (function() {
		 *         var App_Class = function(appConfig, appContent, root) {
		 *             this._app = appConfig; // the F2.AppConfig object
		 *             this._appContent = appContent // the F2.AppManifest.AppContent object
		 *             this.$root = $(root); // the root DOM Element that contains this app
		 *         }
		 *
		 *         App_Class.prototype.init = function() {
		 *             // perform init actions
		 *         }
		 *
		 *         return App_Class;
		 *     })();
		 * @example
		 *     F2.Apps["com_example_helloworld"] = function(appConfig, appContent, root) {
		 *        return {
		 *            init:function() {
		 *                // perform init actions
		 *            }
		 *        };
		 *     };
		 * @for F2
		 */
		Apps: {},
		/**
		 * Creates a namespace on F2 and copies the contents of an object into
		 * that namespace optionally overwriting existing properties.
		 * @method extend
		 * @param {string} ns The namespace to create. Pass a falsy value to 
		 * add properties to the F2 namespace directly.
		 * @param {object} obj The object to copy into the namespace.
		 * @param {bool} overwrite True if object properties should be overwritten
		 * @return {object} The created object
		 */
		extend: function (ns, obj, overwrite) {
			var isFunc = typeof obj === 'function';
			var parts = ns ? ns.split('.') : [];
			var parent = this;
			obj = obj || {};
			
			// ignore leading global
			if (parts[0] === 'F2') {
				parts = parts.slice(1);
			}

			// create namespaces
			for (var i = 0, len = parts.length; i < len; i++) {
				if (!parent[parts[i]]) {
					parent[parts[i]] = isFunc && i + 1 == len ? obj : {};
				}
				parent = parent[parts[i]];
			}

			// copy object into namespace
			if (!isFunc) {
				for (var prop in obj) {
					if (typeof parent[prop] === 'undefined' || overwrite) {
						parent[prop] = obj[prop];
					} 
				}
			}

			return parent;
		},
		/** 
		 * Generates a somewhat random id
		 * @method guid
		 * @return {string} A random id
		 * @for F2
		 */
		guid: function() {
			var S4 = function() {
				return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			};
			return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
		},
		/**
		 * Search for a value within an array.
		 * @method inArray
		 * @param {object} value The value to search for
		 * @param {Array} array The array to search
		 * @return {bool} True if the item is in the array
		 */
		inArray: function(value, array) {
			return jQuery.inArray(value, array) > -1;
		},
		/**
		 * Tests a URL to see if it's on the same domain (local) or not
		 * @method isLocalRequest
		 * @param {URL to test} url
		 * @returns {bool} Whether the URL is local or not
		 * Derived from: https://github.com/jquery/jquery/blob/master/src/ajax.js
		 */
		isLocalRequest: function(url){
			var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
				urlLower = url.toLowerCase(),
				parts = rurl.exec( urlLower ),
				ajaxLocation,
				ajaxLocParts;

			try {
				ajaxLocation = location.href;
			} catch( e ) {
				// Use the href attribute of an A element
				// since IE will modify it given document.location
				ajaxLocation = document.createElement('a');
				ajaxLocation.href = '';
				ajaxLocation = ajaxLocation.href;
			}

			ajaxLocation = ajaxLocation.toLowerCase();

			// uh oh, the url must be relative
			// make it fully qualified and re-regex url
			if (!parts){
				urlLower = _absolutizeURI(ajaxLocation,urlLower).toLowerCase();
				parts = rurl.exec( urlLower );
			}

			// Segment location into parts
			ajaxLocParts = rurl.exec( ajaxLocation ) || [];

			// do hostname and protocol and port of manifest URL match location.href? (a "local" request on the same domain)
			var matched = !(parts &&
					(parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						(parts[ 3 ] || (parts[ 1 ] === 'http:' ? '80' : '443')) !==
							(ajaxLocParts[ 3 ] || (ajaxLocParts[ 1 ] === 'http:' ? '80' : '443'))));
		
			return matched;
		},
		/**
		 * Utility method to determine whether or not the argument passed in is or is not a native dom node.
		 * @method isNativeDOMNode
		 * @param {object} testObject The object you want to check as native dom node.
		 * @return {bool} Returns true if the object passed is a native dom node.
		 */
		isNativeDOMNode: function(testObject) {
			var bIsNode = (
				typeof Node === 'object' ? testObject instanceof Node : 
				testObject && typeof testObject === 'object' && typeof testObject.nodeType === 'number' && typeof testObject.nodeName === 'string'
			);
			
			var bIsElement = (
				typeof HTMLElement === 'object' ? testObject instanceof HTMLElement : //DOM2
				testObject && typeof testObject === 'object' && testObject.nodeType === 1 && typeof testObject.nodeName === 'string'
			);
			
			return (bIsNode || bIsElement);
		},
		/**
		 * A utility logging function to write messages or objects to the browser console. This is a proxy for the [`console` API](https://developers.google.com/chrome-developer-tools/docs/console). 
		 * @method log
		 * @param {object|string} Object/Method An object to be logged _or_ a `console` API method name, such as `warn` or `error`. All of the console method names are [detailed in the Chrome docs](https://developers.google.com/chrome-developer-tools/docs/console-api).
		 * @param {object} [obj2]* An object to be logged
		 * @example
			//Pass any object (string, int, array, object, bool) to .log()
			F2.log('foo');
			F2.log(myArray);
			//Use a console method name as the first argument. 
			F2.log('error', err);
			F2.log('info', 'The session ID is ' + sessionId);
		 * Some code derived from [HTML5 Boilerplate console plugin](https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js)
		 */
		log: function() {
			var _log;
			var _logMethod = 'log';
			var method;
			var noop = function () { };
			var methods = [
				'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				'timeStamp', 'trace', 'warn'
			];
			var length = methods.length;
			var console = (window.console = window.console || {});
			var args;

			while (length--) {
				method = methods[length];

				// Only stub undefined methods.
				if (!console[method]) {
					console[method] = noop;
				}

				//if first arg is a console function, use it. 
				//defaults to console.log()
				if (arguments && arguments.length > 1 && arguments[0] == method){
					_logMethod = method;
					//remove console func from args
					args = Array.prototype.slice.call(arguments, 1);
				}
			}

			if (Function.prototype.bind) {
				_log = Function.prototype.bind.call(console[_logMethod], console);
			} else {
				_log = function() { 
					Function.prototype.apply.call(console[_logMethod], console, (args || arguments));
				};
			}

			_log.apply(this, (args || arguments));			
		},
		/**
		 * Wrapper to convert a JSON string to an object
		 * @method parse
		 * @param {string} str The JSON string to convert
		 * @return {object} The parsed object
		 */
		parse: function(str) {
			return JSON.parse(str);
		},
		/**
		 * Wrapper to convert an object to JSON
		 *
		 * **Note: When using F2.stringify on an F2.AppConfig object, it is
		 * recommended to pass F2.appConfigReplacer as the replacer function in
		 * order to prevent circular serialization errors.**
		 * @method stringify
		 * @param {object} value The object to convert
		 * @param {function|Array} replacer An optional parameter that determines
		 * how object values are stringified for objects. It can be a function or an 
		 * array of strings.
		 * @param {int|string} space An optional parameter that specifies the
		 * indentation of nested structures. If it is omitted, the text will be
		 * packed without extra whitespace. If it is a number, it will specify the
		 * number of spaces to indent at each level. If it is a string (such as '\t'
		 * or '&nbsp;'), it contains the characters used to indent at each level.
		 * @return {string} The JSON string
		 */
		stringify: function(value, replacer, space) {
			return JSON.stringify(value, replacer, space);
		},
		/** 
		 * Function to get the F2 version number
		 * @method version
		 * @return {string} F2 version number
		 */
		version: function() { return '{{sdk.version}}'; }
	};
})();

/**
 * The new `AppHandlers` functionality provides Container Developers a higher level of control over configuring app rendering and interaction.
 *
 *<p class="alert alert-block alert-warning">
 *The addition of `F2.AppHandlers` replaces the previous {{#crossLink "F2.ContainerConfig"}}{{/crossLink}} properties `beforeAppRender`, `appRender`, and `afterAppRender`. These methods were deprecated&mdash;but not removed&mdash;in version 1.2. They will be permanently removed in a future version of F2.
 *</p>
 *
 *<p class="alert alert-block alert-info">
 *Starting with F2 version 1.2, `AppHandlers` is the preferred method for Container Developers to manage app layout.
 *</p>
 *
 * ### Order of Execution
 * 
 * **App Rendering**
 *
 * 0. {{#crossLink "F2/registerApps"}}F2.registerApps(){{/crossLink}} method is called by the Container Developer and the following methods are run for *each* {{#crossLink "F2.AppConfig"}}{{/crossLink}} passed.
 * 1. **'appCreateRoot'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_CREATE\_ROOT*) handlers are fired in the order they were attached.
 * 2. **'appRenderBefore'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_RENDER\_BEFORE*) handlers are fired in the order they were attached.
 * 3. Each app's `manifestUrl` is requested asynchronously; on success the following methods are fired.
 * 3. **'appRender'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_RENDER*) handlers are fired in the order they were attached.
 * 4. **'appRenderAfter'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_RENDER\_AFTER*) handlers are fired in the order they were attached.
 *
 *
 * **App Removal**

 * 0. {{#crossLink "F2/removeApp"}}F2.removeApp(){{/crossLink}} with a specific {{#crossLink "F2.AppConfig/instanceId "}}{{/crossLink}} or {{#crossLink "F2/removeAllApps"}}F2.removeAllApps(){{/crossLink}} method is called by the Container Developer and the following methods are run.
 * 1. **'appDestroyBefore'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_DESTROY\_BEFORE*) handlers are fired in the order they were attached.
 * 2. **'appDestroy'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_DESTROY*) handlers are fired in the order they were attached.
 * 3. **'appDestroyAfter'** (*{{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.APP\_DESTROY\_AFTER*) handlers are fired in the order they were attached.
 * @class F2.AppHandlers
 */
F2.extend('AppHandlers', (function() {

	// the hidden token that we will check against every time someone tries to add, remove, fire handler
	var _ct = F2.guid();
	var _f2t = F2.guid();
	
	var _handlerCollection = {
		appCreateRoot: [],
		appRenderBefore: [],			
		appDestroyBefore: [],
		appRenderAfter: [],
		appDestroyAfter: [],
		appRender: [],
		appDestroy: []			
	};
	
	var _defaultMethods = {
		appRender: function(appConfig, appHtml)
		{
			var $root = null;
			
			// if no app root is defined use the app's outer most node
			if(!F2.isNativeDOMNode(appConfig.root))
			{
				appConfig.root = jQuery(appHtml).get(0);
				// get a handle on the root in jQuery
				$root = jQuery(appConfig.root);				
			}
			else
			{
				// get a handle on the root in jQuery
				$root = jQuery(appConfig.root);			
				
				// append the app html to the root
				$root.append(appHtml);
			}			
			
			// append the root to the body by default.
			jQuery('body').append($root);
		},
		appDestroy: function(appInstance)
		{
			// call the apps destroy method, if it has one
			if(appInstance && appInstance.app && appInstance.app.destroy && typeof(appInstance.app.destroy) == 'function')
			{
				appInstance.app.destroy();
			}
			// warn the Container and App Developer that even though they have a destroy method it hasn't been 
			else if(appInstance && appInstance.app && appInstance.app.destroy)
			{
				F2.log(appInstance.config.appId + ' has a destroy property, but destroy is not of type function and as such will not be executed.');
			}
			
			// fade out and remove the root
			jQuery(appInstance.config.root).fadeOut(500, function() {
				jQuery(this).remove();
			});
		}
	};
	
	var _createHandler = function(token, sNamespace, func_or_element, bDomNodeAppropriate)
	{	
		// will throw an exception and stop execution if the token is invalid
		_validateToken(token);			
		
		// create handler structure. Not all arguments properties will be populated/used.
		var handler = {
			func: (typeof(func_or_element)) ? func_or_element : null,
			namespace: sNamespace,			
			domNode: (F2.isNativeDOMNode(func_or_element)) ? func_or_element : null
		};
		
		if(!handler.func && !handler.domNode)
		{
			throw ('Invalid or null argument passed. Handler will not be added to collection. A valid dom element or callback function is required.');
		}

		if(handler.domNode && !bDomNodeAppropriate)
		{
			throw ('Invalid argument passed. Handler will not be added to collection. A callback function is required for this event type.');
		}
		
		return handler;
	};
	
	var _validateToken = function(sToken)
	{
		// check token against F2 and container
		if(_ct != sToken && _f2t != sToken) { throw ('Invalid token passed. Please verify that you have correctly received and stored token from F2.AppHandlers.getToken().'); }
	};
	
	var _removeHandler = function(sToken, eventKey, sNamespace)
	{
		// will throw an exception and stop execution if the token is invalid
		_validateToken(sToken);
		
		if(!sNamespace && !eventKey)
		{			
			return;
		}
		// remove by event key
		else if(!sNamespace && eventKey)
		{
			_handlerCollection[eventKey] = [];
		}
		// remove by namespace only
		else if(sNamespace && !eventKey)
		{
			sNamespace = sNamespace.toLowerCase();		
		
			for(var currentEventKey in _handlerCollection)
			{
				var eventCollection = _handlerCollection[currentEventKey];
				var newEvents = [];

				for(var i = 0, ec = eventCollection.length; i < ec; i++)
				{
					var currentEventHandler = eventCollection[i];
					if(currentEventHandler)
					{
						if(!currentEventHandler.namespace || currentEventHandler.namespace.toLowerCase() != sNamespace)
						{
							newEvents.push(currentEventHandler);
						}
					}
				}

				eventCollection = newEvents;				
			}			
		}
		else if(sNamespace && _handlerCollection[eventKey])
		{
			sNamespace = sNamespace.toLowerCase();		
		
			var newHandlerCollection = [];
			
			for(var iCounter = 0, hc = _handlerCollection[eventKey].length; iCounter < hc; iCounter++)
			{
				var currentHandler = _handlerCollection[eventKey][iCounter];
				if(currentHandler)
				{
					if(!currentHandler.namespace || currentHandler.namespace.toLowerCase() != sNamespace)
					{
						newHandlerCollection.push(currentHandler);
					}
				}
			}
			
			_handlerCollection[eventKey] = newHandlerCollection;
		}
	};
	
	return {
		/**
		* Allows Container Developer to retrieve a unique token which must be passed to
		* all `on` and `off` methods. This function will self destruct and can only be called 
		* one time. Container Developers must store the return value inside of a closure.
		* @method getToken		 
		**/
		getToken: function()
		{
			// delete this method for security that way only the container has access to the token 1 time.
			// kind of Ethan Hunt-ish, this message will self destruct immediately.
			delete this.getToken;
			// return the token, which we validate against.
			return _ct;
		},
		/**
		* Allows F2 to get a token internally. Token is required to call {{#crossLink "F2.AppHandlers/\_\_trigger:method"}}{{/crossLink}}.
		* This function will self destruct to eliminate other sources from using the {{#crossLink "F2.AppHandlers/\_\_trigger:method"}}{{/crossLink}}
		* and additional internal methods.
		* @method __f2GetToken
		* @private
		**/
		__f2GetToken: function()
		{
			// delete this method for security that way only the F2 internally has access to the token 1 time.
			// kind of Ethan Hunt-ish, this message will self destruct immediately.
			delete this.__f2GetToken;
			// return the token, which we validate against.
			return _f2t;
		},
		/**
		* Allows F2 to trigger specific events internally.
		* @method __trigger
		* @private
		* @chainable
		* @param {String} token The token received from {{#crossLink "F2.AppHandlers/\_\_f2GetToken:method"}}{{/crossLink}}.
		* @param {String} eventKey The event to fire. The complete list of event keys is available in {{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.
		**/
		__trigger: function(token, eventKey) // additional arguments will likely be passed
		{			
			// will throw an exception and stop execution if the token is invalid
			if(token != _f2t)
			{
				throw ('Token passed is invalid. Only F2 is allowed to call F2.AppHandlers.__trigger().');
			}
			
			if(_handlerCollection && _handlerCollection[eventKey])
			{				
				// create a collection of arguments that are safe to pass to the callback.
				var passableArgs = [];
				
				// populate that collection with all arguments except token and eventKey
				for(var i = 2, j = arguments.length; i < j; i++)
				{
					passableArgs.push(arguments[i]);
				}
				
				if(_handlerCollection[eventKey].length === 0 && _defaultMethods[eventKey])
				{
					_defaultMethods[eventKey].apply(F2, passableArgs);
					return this;
				}
				else if(_handlerCollection[eventKey].length === 0 && !_handlerCollection[eventKey])
				{
					return this;
				}
				
				// fire all event listeners in the order that they were added.
				for(var iCounter = 0, hcl = _handlerCollection[eventKey].length; iCounter < hcl; iCounter++)
				{
					var handler = _handlerCollection[eventKey][iCounter];
					
					// appRender where root is already defined
					if (handler.domNode && arguments[2] && arguments[2].root && arguments[3])
					{
						var $appRoot = jQuery(arguments[2].root).append(arguments[3]);
						jQuery(handler.domNode).append($appRoot);
					}
					else if (handler.domNode && arguments[2] && !arguments[2].root && arguments[3])
					{
						// set the root to the actual HTML of the app
						arguments[2].root = jQuery(arguments[3]).get(0);
						// appends the root to the dom node specified
						jQuery(handler.domNode).append(arguments[2].root);
					}
					else
					{
						handler.func.apply(F2, passableArgs);
					}
				}
			}
			else
			{
				throw ('Invalid EventKey passed. Check your inputs and try again.');
			}
			
			return this;
		},
		/**
		* Allows Container Developer to easily tell all apps to render in a specific location. Only valid for eventType `appRender`.
		* @method on
		* @chainable
		* @param {String} token The token received from {{#crossLink "F2.AppHandlers/getToken:method"}}{{/crossLink}}.
		* @param {String} eventKey{.namespace} The event key used to determine which event to attach the listener to. The namespace is useful for removal 
		* purposes. At this time it does not affect when an event is fired. Complete list of event keys available in 
		* {{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.
		* @params {HTMLElement} element Specific DOM element to which app gets appended.
		* @example
		*	var _token = F2.AppHandlers.getToken();
		*	F2.AppHandlers.on(
		*		_token,
		*		'appRender',
		*		document.getElementById('my_app')
		*	);
		*
		* Or:
		* @example
		*	F2.AppHandlers.on(
		*		_token,
		*		'appRender.myNamespace',
		*		document.getElementById('my_app')
		*	);
		**/
		/**
		* Allows Container Developer to add listener method that will be triggered when a specific event occurs.
		* @method on
		* @chainable
		* @param {String} token The token received from {{#crossLink "F2.AppHandlers/getToken:method"}}{{/crossLink}}.
		* @param {String} eventKey{.namespace} The event key used to determine which event to attach the listener to. The namespace is useful for removal 
		* purposes. At this time it does not affect when an event is fired. Complete list of event keys available in 
		* {{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.
		* @params {Function} listener A function that will be triggered when a specific event occurs. For detailed argument definition refer to {{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.
		* @example
		*	var _token = F2.AppHandlers.getToken();
		*	F2.AppHandlers.on(
		*		_token,
		*		'appRenderBefore'
		*		function() { F2.log('before app rendered!'); }
		*	);
		*
		* Or:
		* @example
		*	F2.AppHandlers.on(
		*		_token,
		*		'appRenderBefore.myNamespace',
		*		function() { F2.log('before app rendered!'); }
		*	);
		**/
		on: function(token, eventKey, func_or_element)
		{
			var sNamespace = null;
			
			if(!eventKey)
			{
				throw ('eventKey must be of type string and not null. For available appHandlers check F2.Constants.AppHandlers.');
			}
			
			// we need to check the key for a namespace
			if(eventKey.indexOf('.') > -1)
			{
				var arData = eventKey.split('.');
				eventKey = arData[0];
				sNamespace = arData[1];
			}
			
			if(_handlerCollection && _handlerCollection[eventKey])
			{
				_handlerCollection[eventKey].push(
					_createHandler(
						token,
						sNamespace,
						func_or_element,
						(eventKey == 'appRender')
					)
				);
			}
			else
			{
				throw ('Invalid EventKey passed. Check your inputs and try again.');
			}
			
			return this;
		},
		/**
		* Allows Container Developer to remove listener methods for specific events
		* @method off
		* @chainable
		* @param {String} token The token received from {{#crossLink "F2.AppHandlers/getToken:method"}}{{/crossLink}}.
		* @param {String} eventKey{.namespace} The event key used to determine which event to attach the listener to. If no namespace is provided all
		*  listeners for the specified event type will be removed.
		*  Complete list available in {{#crossLink "F2.Constants.AppHandlers"}}{{/crossLink}}.
		* @example
		*	var _token = F2.AppHandlers.getToken();
		*	F2.AppHandlers.off(_token,'appRenderBefore');
		*
		**/
		off: function(token, eventKey)
		{
			var sNamespace = null;
			
			if(!eventKey)
			{
				throw ('eventKey must be of type string and not null. For available appHandlers check F2.Constants.AppHandlers.');
			}
			
			// we need to check the key for a namespace
			if(eventKey.indexOf('.') > -1)
			{
				var arData = eventKey.split('.');
				eventKey = arData[0];
				sNamespace = arData[1];
			}
			
			if(_handlerCollection && _handlerCollection[eventKey])
			{				
				_removeHandler(
					token,
					eventKey,
					sNamespace
				);
			}
			else
			{
				throw ('Invalid EventKey passed. Check your inputs and try again.');
			}
			
			return this;
		}
	};
})());

F2.extend('Constants', {
	/**
	* A convenient collection of all available appHandler events.
	* @class F2.Constants.AppHandlers
	**/
	AppHandlers: (function()
	{
		return {
			/**
			* Equivalent to `appCreateRoot`. Identifies the create root method for use in AppHandlers.on/off. 
			* When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			* following argument(s): ( {{#crossLink "F2.AppConfig"}}appConfig{{/crossLink}} )
			* @property APP_CREATE_ROOT
			* @type string
			* @static
			* @final
			* @example
			*	var _token = F2.AppHandlers.getToken();
			*	F2.AppHandlers.on(
			*		_token,
			*		F2.Constants.AppHandlers.APP_CREATE_ROOT,
			*		function(appConfig)
			*		{
			*			// If you want to create a custom root. By default F2 uses the app's outermost HTML element.
			*			// the app's html is not available until after the manifest is retrieved so this logic occurs in F2.Constants.AppHandlers.APP_RENDER
			*			appConfig.root = jQuery('<section></section>').get(0);
			*		}
			*	);
			*/
			APP_CREATE_ROOT: 'appCreateRoot',
			/**
			 * Equivalent to `appRenderBefore`. Identifies the before app render method for use in AppHandlers.on/off. 
			 * When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			 * following argument(s): ( {{#crossLink "F2.AppConfig"}}appConfig{{/crossLink}} )
			 * @property APP_RENDER_BEFORE
			 * @type string
			 * @static
			 * @final
			 * @example
			 *	var _token = F2.AppHandlers.getToken();
			 *	F2.AppHandlers.on(
			 *		_token,
			 *		F2.Constants.AppHandlers.APP_RENDER_BEFORE,
			 *		function(appConfig)
			 *		{
			 *			F2.log(appConfig);
			 *		}
			 *	);
			 */
			APP_RENDER_BEFORE: 'appRenderBefore',
			/**
			* Equivalent to `appRender`. Identifies the app render method for use in AppHandlers.on/off. 
			* When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			* following argument(s): ( {{#crossLink "F2.AppConfig"}}appConfig{{/crossLink}}, [appHtml](../../app-development.html#app-design) )
			* @property APP_RENDER
			* @type string
			* @static
			* @final
			* @example
			*	var _token = F2.AppHandlers.getToken();
			*	F2.AppHandlers.on(
			*		_token,
			*		F2.Constants.AppHandlers.APP_RENDER,
			*		function(appConfig, appHtml)
			*		{
			*			var $root = null;
			*
			*			// if no app root is defined use the app's outer most node
			*			if(!F2.isNativeDOMNode(appConfig.root))
			*			{
			*				appConfig.root = jQuery(appHtml).get(0);
			*				// get a handle on the root in jQuery
			*				$root = jQuery(appConfig.root);				
			*			}
			*			else
			*			{
			*				// get a handle on the root in jQuery
			*				$root = jQuery(appConfig.root);			
			*				
			*				// append the app html to the root
			*				$root.append(appHtml);
			*			}			
			*			
			*			// append the root to the body by default.
			*			jQuery('body').append($root);
			*		}
			*	);
			*/		
			APP_RENDER: 'appRender',
			/**
			* Equivalent to `appRenderAfter`. Identifies the after app render method for use in AppHandlers.on/off. 
			* When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			* following argument(s): ( {{#crossLink "F2.AppConfig"}}appConfig{{/crossLink}} )
			* @property APP_RENDER_AFTER
			* @type string
			* @static
			* @final
			* @example
			*	var _token = F2.AppHandlers.getToken();
			*	F2.AppHandlers.on(
			*		_token,
			*		F2.Constants.AppHandlers.APP_RENDER_AFTER,
			*		function(appConfig)
			*		{
			*			F2.log(appConfig);
			*		}
			*	);
			*/	
			APP_RENDER_AFTER: 'appRenderAfter',
			/**
			* Equivalent to `appDestroyBefore`. Identifies the before app destroy method for use in AppHandlers.on/off. 
			* When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			* following argument(s): ( appInstance )
			* @property APP_DESTROY_BEFORE
			* @type string
			* @static
			* @final
			* @example
			*	var _token = F2.AppHandlers.getToken();
			*	F2.AppHandlers.on(
			*		_token,
			*		F2.Constants.AppHandlers.APP_DESTROY_BEFORE,
			*		function(appInstance)
			*		{
			*			F2.log(appInstance);
			*		}
			*	);
			*/
			APP_DESTROY_BEFORE: 'appDestroyBefore',
			/**
			* Equivalent to `appDestroy`. Identifies the app destroy method for use in AppHandlers.on/off. 
			* When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			* following argument(s): ( appInstance )
			* @property APP_DESTROY
			* @type string
			* @static
			* @final
			* @example
			*	var _token = F2.AppHandlers.getToken();
			*	F2.AppHandlers.on(
			*		_token,
			*		F2.Constants.AppHandlers.APP_DESTROY,
			*		function(appInstance)
			*		{
			*			// call the apps destroy method, if it has one
			*			if(appInstance && appInstance.app && appInstance.app.destroy && typeof(appInstance.app.destroy) == 'function')
			*			{
			*				appInstance.app.destroy();
			*			}
			*			else if(appInstance && appInstance.app && appInstance.app.destroy)
			*			{
			*				F2.log(appInstance.config.appId + ' has a destroy property, but destroy is not of type function and as such will not be executed.');
			*			}
			*			
			*			// fade out and remove the root
			*			jQuery(appInstance.config.root).fadeOut(500, function() {
			*				jQuery(this).remove();
			*			});
			*		}
			*	);
			*/		
			APP_DESTROY: 'appDestroy',
			/**
			* Equivalent to `appDestroyAfter`. Identifies the after app destroy method for use in AppHandlers.on/off. 
			* When bound using {{#crossLink "F2.AppHandlers/on"}}F2.AppHandlers.on(){{/crossLink}} the listener function passed will receive the 
			* following argument(s): ( appInstance )
			* @property APP_DESTROY_AFTER
			* @type string
			* @static
			* @final
			* @example
			*	var _token = F2.AppHandlers.getToken();
			*	F2.AppHandlers.on(
			*		_token,
			*		F2.Constants.AppHandlers.APP_DESTROY_AFTER,
			*		function(appInstance)
			*		{
			*			F2.log(appInstance);
			*		}
			*	);
			*/
			APP_DESTROY_AFTER: 'appDestroyAfter'
		};
	})()
});
/**
 * Class stubs for documentation purposes
 * @main F2
 */
F2.extend('', {
	/**
	 * The App Class is an optional class that can be namespaced onto the 
	 * {{#crossLink "F2\Apps"}}{{/crossLink}} namespace.  The 
	 * [F2 Docs](../../app-development.html#app-class)
	 * has more information on the usage of the App Class.
	 * @class F2.App
	 * @constructor
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object for the app
	 * @param {F2.AppManifest.AppContent} appContent The F2.AppManifest.AppContent
	 * object
	 * @param {Element} root The root DOM Element for the app
	 */
	App: function(appConfig, appContent, root) {
		return {
			/**
			 * An optional init function that will automatically be called when
			 * F2.{{#crossLink "F2\registerApps"}}{{/crossLink}} is called.
			 * @method init
			 * @optional
			 */
			init:function() {}
		};
	},
	/**
	 * The AppConfig object represents an app's meta data
	 * @class F2.AppConfig
	 */
	AppConfig: {
		/**
		 * The unique ID of the app. More information can be found
		 * [here](../../app-development.html#f2-appid)
		 * @property appId
		 * @type string
		 * @required
		 */
		appId: '',
		/**
		 * An object that represents the context of an app
		 * @property context
		 * @type object
		 */
		context: {},
		/**
		 * True if the app should be requested in a single request with other apps.
		 * @property enableBatchRequests
		 * @type bool
		 * @default false
		 */
		enableBatchRequests: false,
		/**
		 * The height of the app. The initial height will be pulled from
		 * the {{#crossLink "F2.AppConfig"}}{{/crossLink}} object, but later
		 * modified by calling
		 * F2.UI.{{#crossLink "F2.UI/updateHeight"}}{{/crossLink}}. This is used
		 * for secure apps to be able to set the initial height of the iframe.
		 * @property height
		 * @type int
		 */
		height: 0,
		/**
		 * The unique runtime ID of the app.
		 *
		 * **This property is populated during the
		 * F2.{{#crossLink "F2/registerApps"}}{{/crossLink}} process**
		 * @property instanceId
		 * @type string
		 */
		instanceId: '',
		/**
		 * True if the app will be loaded in an iframe. This property
		 * will be true if the {{#crossLink "F2.AppConfig"}}{{/crossLink}} object
		 * sets isSecure = true. It will also be true if the
		 * [container](../../container-development.html) has made the decision to
		 * run apps in iframes.
		 * @property isSecure
		 * @type bool
		 * @default false
		 */
		isSecure: false,
		/**
		 * The url to retrieve the {{#crossLink "F2.AppManifest"}}{{/crossLink}}
		 * object.
		 * @property manifestUrl
		 * @type string
		 * @required
		 */
		manifestUrl: '',
		/**
		 * The recommended maximum width in pixels that this app should be run.
		 * **It is up to the [container](../../container-development.html) to
		 * implement the logic to prevent an app from being run when the maxWidth
		 * requirements are not met.**
		 * @property maxWidth
		 * @type int
		 */
		maxWidth: 0,
		/**
		 * The recommended minimum grid size that this app should be run. This
		 * value corresponds to the 12-grid system that is used by the
		 * [container](../../container-development.html). This property should be
		 * set by apps that require a certain number of columns in their layout.
		 * @property minGridSize
		 * @type int
		 * @default 4
		 */
		minGridSize: 4,
		/**
		 * The recommended minimum width in pixels that this app should be run. **It
		 * is up to the [container](../../container-development.html) to implement
		 * the logic to prevent an app from being run when the minWidth requirements
		 * are not met.
		 * @property minWidth
		 * @type int
		 * @default 300
		 */
		minWidth: 300,
		/**
		 * The name of the app
		 * @property name
		 * @type string
		 * @required
		 */
		name: '',
		/**
		 * The root DOM element that contains the app
		 *
		 * **This property is populated during the
		 * F2.{{#crossLink "F2/registerApps"}}{{/crossLink}} process**
		 * @property root
		 * @type Element
		 */
		root: undefined,
		/**
		 * The instance of F2.UI providing easy access to F2.UI methods
		 *
		 * **This property is populated during the
		 * F2.{{#crossLink "F2/registerApps"}}{{/crossLink}} process**
		 * @property ui
		 * @type F2.UI
		 */
		ui: undefined,
		/**
		 * The views that this app supports. Available views
		 * are defined in {{#crossLink "F2.Constants.Views"}}{{/crossLink}}. The
		 * presence of a view can be checked via
		 * F2.{{#crossLink "F2/inArray"}}{{/crossLink}}:
		 * 
		 *     F2.inArray(F2.Constants.Views.SETTINGS, app.views)
		 *
		 * @property views
		 * @type Array
		 */
		views: []
	},
	/**
	 * The assets needed to render an app on the page
	 * @class F2.AppManifest
	 */
	AppManifest: {
		/**
		 * The array of {{#crossLink "F2.AppManifest.AppContent"}}{{/crossLink}}
		 * objects
		 * @property apps
		 * @type Array
		 * @required
		 */
		apps: [],
		/**
		 * Any inline javascript tha should initially be run
		 * @property inlineScripts
		 * @type Array
		 * @optional
		 */
		inlineScripts: [],
		/**
		 * Urls to javascript files required by the app
		 * @property scripts
		 * @type Array
		 * @optional
		 */
		scripts: [],
		/**
		 * Urls to CSS files required by the app
		 * @property styles
		 * @type Array
		 * @optional
		 */
		styles: []
	},
	/**
	 * The AppContent object
	 * @class F2.AppManifest.AppContent
	 **/
	AppContent: {
		/**
		 * Arbitrary data to be passed along with the app
		 * @property data
		 * @type object
		 * @optional
		 */
		data: {},
		/**
		 * The string of HTML representing the app
		 * @property html
		 * @type string
		 * @required
		 */
		html: '',
		/**
		 * A status message
		 * @property status
		 * @type string
		 * @optional
		 */
		status: ''
	},
	/**
	 * An object containing configuration information for the
	 * [container](../../container-development.html)
	 * @class F2.ContainerConfig
	 */
	ContainerConfig: {		
		/**
		 * Allows the [container](../../container-development.html) to override how
		 * an app's html is inserted into the page. The function should accept an
		 * {{#crossLink "F2.AppConfig"}}{{/crossLink}} object and also a string of
		 * html
		 * @method afterAppRender
		 * @deprecated This has been replaced with {{#crossLink "F2.AppHandlers"}}{{/crossLink}} and will be removed in v2.0
		 * @param {F2.AppConfig} appConfig The F2.AppConfig object
		 * @param {string} html The string of html representing the app 
		 * @return {Element} The DOM Element surrounding the app
		 */
		afterAppRender: function(appConfig, html) {},
		/**
		 * Allows the [container](../../container-development.html) to wrap an app
		 * in extra html. The function should accept an
		 * {{#crossLink "F2.AppConfig"}}{{/crossLink}} object and also a string of
		 * html. The extra html can provide links to edit app settings and remove an
		 * app from the container. See
		 * {{#crossLink "F2.Constants.Css"}}{{/crossLink}} for CSS classes that
		 * should be applied to elements.
		 * @method appRender
		 * @deprecated This has been replaced with {{#crossLink "F2.AppHandlers"}}{{/crossLink}} and will be removed in v2.0
		 * @param {F2.AppConfig} appConfig The F2.AppConfig object
		 * @param {string} html The string of html representing the app
		 */
		appRender: function(appConfig, html) {},
		/**
		 * Allows the container to render html for an app before the AppManifest for
		 * an app has loaded. This can be useful if the design calls for loading
		 * icons to appear for each app before each app is loaded and rendered to
		 * the page.
		 * @method beforeAppRender
		 * @deprecated This has been replaced with {{#crossLink "F2.AppHandlers"}}{{/crossLink}} and will be removed in v2.0
		 * @param {F2.AppConfig} appConfig The F2.AppConfig object
		 * @return {Element} The DOM Element surrounding the app
		 */
		beforeAppRender: function(appConfig) {},
		/**
		 * True to enable debug mode in F2.js. Adds additional logging, resource cache busting, etc.
		 * @property debugMode
		 * @type bool
		 * @default false
		 */
		debugMode: false,
		/**
		 * Milliseconds before F2 fires callback on script resource load errors. Due to issue with the way Internet Explorer attaches load events to script elements, the error event doesn't fire.
		 * @property scriptErrorTimeout
		 * @type milliseconds
		 * @default 7000 (7 seconds)
		 */
		scriptErrorTimeout: 7000,
		/**
		 * Tells the container that it is currently running within
		 * a secure app page
		 * @property isSecureAppPage
		 * @type bool
		 */
		isSecureAppPage: false,
		/**
		 * Allows the container to specify which page is used when
		 * loading a secure app. The page must reside on a different domain than the
		 * container
		 * @property secureAppPagePath
		 * @type string
		 * @for F2.ContainerConfig
		 */
		secureAppPagePath: '',
		/**
		 * Specifies what views a container will provide buttons
		 * or links to. Generally, the views will be switched via buttons or links
		 * in the app's header.
		 * @property supportedViews
		 * @type Array
		 * @required
		 */
		supportedViews: [],
		/**
		 * An object containing configuration defaults for F2.UI
		 * @class F2.ContainerConfig.UI
		 */
		UI: {
			/**
			 * An object containing configuration defaults for the 
			 * F2.UI.{{#crossLink "F2.UI/showMask"}}{{/crossLink}} and
			 * F2.UI.{{#crossLink "F2.UI/hideMask"}}{{/crossLink}} methods.
			 * @class F2.ContainerConfig.UI.Mask
			 */
			Mask: {
				/**
				 * The backround color of the overlay
				 * @property backgroundColor
				 * @type string
				 * @default #FFF
				 */
				backgroundColor: '#FFF',
				/**
				 * The path to the loading icon
				 * @property loadingIcon
				 * @type string
				 */
				loadingIcon: '',
				/**
				 * The opacity of the background overlay
				 * @property opacity
				 * @type int
				 * @default 0.6
				 */
				opacity: 0.6,
				/**
				 * Do not use inline styles for mask functinality. Instead classes will
				 * be applied to the elements and it is up to the container provider to
				 * implement the class definitions.
				 * @property useClasses
				 * @type bool
				 * @default false
				 */
				useClasses: false,
				/**
				 * The z-index to use for the overlay
				 * @property zIndex
				 * @type int
				 * @default 2
				 */
				zIndex: 2
			}
		},
		/**
		 * Allows the container to fully override how the AppManifest request is
		 * made inside of F2.
		 * 
		 * @method xhr
		 * @param {string} url The manifest url
		 * @param {Array} appConfigs An array of {{#crossLink "F2.AppConfig"}}{{/crossLink}}
		 * objects
		 * @param {function} success The function to be called if the request
		 * succeeds
		 * @param {function} error The function to be called if the request fails
		 * @param {function} complete The function to be called when the request
		 * finishes (after success and error callbacks have been executed)
		 * @return {XMLHttpRequest} The XMLHttpRequest object (or an object that has
		 * an `abort` function (such as the jqXHR object in jQuery) to abort the
		 * request)
		 *
		 * @example
		 *     F2.init({
		 *         xhr: function(url, appConfigs, success, error, complete) {
		 *             $.ajax({
		 *                 url: url,
		 *                 type: 'POST',
		 *                 data: {
		 *                     params: F2.stringify(appConfigs, F2.appConfigReplacer)
		 *                 },
		 *                 jsonp: false, // do not put 'callback=' in the query string
		 *                 jsonpCallback: F2.Constants.JSONP_CALLBACK + appConfigs[0].appId, // Unique function name
		 *                 dataType: 'json',
		 *                 success: function(appManifest) {
		 *                     // custom success logic
		 *                     success(appManifest); // fire success callback
		 *                 },
		 *                 error: function() {
		 *                     // custom error logic
		 *                     error(); // fire error callback
		 *                 },
		 *                 complete: function() {
		 *                     // custom complete logic
		 *                     complete(); // fire complete callback
		 *                 }
		 *             });
		 *         }
		 *     });
		 *
		 * @for F2.ContainerConfig
		 */
		//xhr: function(url, appConfigs, success, error, complete) {},
		/**
		 * Allows the container to override individual parts of the AppManifest
		 * request.  See properties and methods with the `xhr.` prefix.
		 * @property xhr
		 * @type Object
		 *
		 * @example
		 *     F2.init({
		 *         xhr: {
		 *             url: function(url, appConfigs) {
		 *                 return 'http://example.com/proxy.php?url=' + encocdeURIComponent(url);
		 *             }
		 *         }
		 *     });
		 */
		xhr: {
			/**
			 * Allows the container to override the request data type (JSON or JSONP)
			 * that is used for the request
			 * @method xhr.dataType
			 * @param {string} url The manifest url
			 * @param {Array} appConfigs An array of {{#crossLink "F2.AppConfig"}}{{/crossLink}}
			 * objects
			 * @return {string} The request data type that should be used
			 *
			 * @example
			 *     F2.init({
			 *         xhr: {
			 *             dataType: function(url) {
			 *                 return F2.isLocalRequest(url) ? 'json' : 'jsonp';
			 *             },
			 *             type: function(url) {
			 *                 return F2.isLocalRequest(url) ? 'POST' : 'GET';
			 *             }
			 *         }
			 *     });
			 */
			dataType: function(url, appConfigs) {},
			/**
			 * Allows the container to override the request method that is used (just
			 * like the `type` parameter to `jQuery.ajax()`.
			 * @method xhr.type
			 * @param {string} url The manifest url
			 * @param {Array} appConfigs An array of {{#crossLink "F2.AppConfig"}}{{/crossLink}}
			 * objects
			 * @return {string} The request method that should be used
			 *
			 * @example
			 *     F2.init({
			 *         xhr: {
			 *             dataType: function(url) {
			 *                 return F2.isLocalRequest(url) ? 'json' : 'jsonp';
			 *             },
			 *             type: function(url) {
			 *                 return F2.isLocalRequest(url) ? 'POST' : 'GET';
			 *             }
			 *         }
			 *     });
			 */
			type: function(url, appConfigs) {},
			/**
			 * Allows the container to override the url that is used to request an
			 * app's F2.{{#crossLink "F2.AppManifest"}}{{/crossLink}}
			 * @method xhr.url
			 * @param {string} url The manifest url
			 * @param {Array} appConfigs An array of {{#crossLink "F2.AppConfig"}}{{/crossLink}}
			 * objects
			 * @return {string} The url that should be used for the request
			 *
			 * @example
			 *     F2.init({
			 *         xhr: {
			 *             url: function(url, appConfigs) {
			 *                 return 'http://example.com/proxy.php?url=' + encocdeURIComponent(url);
			 *             }
			 *         }
			 *     });
			 */
			url: function(url, appConfigs) {}
		}
	}
});
/**
 * Constants used throughout the Open Financial Framework
 * @class F2.Constants
 * @static
 */
F2.extend('Constants', {
	/**
	 * CSS class constants
	 * @class F2.Constants.Css
	 */
	Css: (function() {

		/** @private */
		var _PREFIX = 'f2-';

		return {
			/**
			 * The APP class should be applied to the DOM Element that surrounds the
			 * entire app, including any extra html that surrounds the APP\_CONTAINER
			 * that is inserted by the container. See the 
			 * {{#crossLink "F2.ContainerConfig"}}{{/crossLink}} object.
			 * @property APP
			 * @type string
			 * @static
			 * @final
			 */
			APP: _PREFIX + 'app',
			/**
			 * The APP\_CONTAINER class should be applied to the outermost DOM Element
			 * of the app.
			 * @property APP_CONTAINER
			 * @type string
			 * @static
			 * @final
			 */
			APP_CONTAINER: _PREFIX + 'app-container',
			/**
			 * The APP\_TITLE class should be applied to the DOM Element that contains
			 * the title for an app.  If this class is not present, then
			 * F2.UI.{{#crossLink "F2.UI/setTitle"}}{{/crossLink}} will not function.
			 * @property APP_TITLE
			 * @type string
			 * @static
			 * @final
			 */
			APP_TITLE: _PREFIX + 'app-title',
			/**
			 * The APP\_VIEW class should be applied to the DOM Element that contains
			 * a view for an app. The DOM Element should also have a
			 * {{#crossLink "F2.Constants.Views"}}{{/crossLink}}.DATA_ATTRIBUTE
			 * attribute that specifies which
			 * {{#crossLink "F2.Constants.Views"}}{{/crossLink}} it is. 
			 * @property APP_VIEW
			 * @type string
			 * @static
			 * @final
			 */
			APP_VIEW: _PREFIX + 'app-view',
			/**
			 * APP\_VIEW\_TRIGGER class should be applied to the DOM Elements that
			 * trigger an
			 * {{#crossLink "F2.Constants.Events"}}{{/crossLink}}.APP\_VIEW\_CHANGE
			 * event. The DOM Element should also have a
			 * {{#crossLink "F2.Constants.Views"}}{{/crossLink}}.DATA_ATTRIBUTE
			 * attribute that specifies which
			 * {{#crossLink "F2.Constants.Views"}}{{/crossLink}} it will trigger.
			 * @property APP_VIEW_TRIGGER
			 * @type string
			 * @static
			 * @final
			 */
			APP_VIEW_TRIGGER: _PREFIX + 'app-view-trigger',
			/**
			 * The MASK class is applied to the overlay element that is created
			 * when the F2.UI.{{#crossLink "F2.UI/showMask"}}{{/crossLink}} method is
			 * fired.
			 * @property MASK
			 * @type string
			 * @static
			 * @final
			 */
			MASK: _PREFIX + 'mask',
			/**
			 * The MASK_CONTAINER class is applied to the Element that is passed into
			 * the F2.UI.{{#crossLink "F2.UI/showMask"}}{{/crossLink}} method.
			 * @property MASK_CONTAINER
			 * @type string
			 * @static
			 * @final
			 */
			MASK_CONTAINER: _PREFIX + 'mask-container'
		};
	})(),
	
	/**
	 * Events constants
	 * @class F2.Constants.Events
	 */
	Events: (function() {
		/** @private */
		var _APP_EVENT_PREFIX = 'App.';
		/** @private */
		var _CONTAINER_EVENT_PREFIX = 'Container.';

		return {
			/**
			 * The APP\_SYMBOL\_CHANGE event is fired when the symbol is changed in an
			 * app. It is up to the app developer to fire this event.
			 * Returns an object with the symbol and company name:
			 *
			 *     { symbol: 'MSFT', name: 'Microsoft Corp (NASDAQ)' }
			 *
			 * @property APP_SYMBOL_CHANGE
			 * @type string
			 * @static
			 * @final
			 */
			APP_SYMBOL_CHANGE: _APP_EVENT_PREFIX + 'symbolChange',
			/**
			 * The APP\_WIDTH\_CHANGE event will be fired by the container when the
			 * width of an app is changed. The app's instanceId should be concatenated
			 * to this constant.
			 * Returns an object with the gridSize and width in pixels:
			 *
			 *     { gridSize:8, width:620 }
			 *
			 * @property APP_WIDTH_CHANGE
			 * @type string
			 * @static
			 * @final
			 */
			APP_WIDTH_CHANGE: _APP_EVENT_PREFIX + 'widthChange.',
			/**
			 * The CONTAINER\_SYMBOL\_CHANGE event is fired when the symbol is changed
			 * at the container level. This event should only be fired by the
			 * container or container provider.
			 * Returns an object with the symbol and company name:
			 *
			 *     { symbol: 'MSFT', name: 'Microsoft Corp (NASDAQ)' }
			 *
			 * @property CONTAINER_SYMBOL_CHANGE
			 * @type string
			 * @static
			 * @final
			 */
			CONTAINER_SYMBOL_CHANGE: _CONTAINER_EVENT_PREFIX + 'symbolChange',
			/**
			 * The CONTAINER\_WIDTH\_CHANGE event will be fired by the container when
			 * the width of the container has changed.
			 * @property CONTAINER_WIDTH_CHANGE
			 * @type string
			 * @static
			 * @final
			 */
			CONTAINER_WIDTH_CHANGE: _CONTAINER_EVENT_PREFIX + 'widthChange'
		};
	})(),

	JSONP_CALLBACK: 'F2_jsonpCallback_',

	/**
	 * Constants for use with cross-domain sockets
	 * @class F2.Constants.Sockets
	 * @protected
	 */
	Sockets: {
		/**
		 * The EVENT message is sent whenever
		 * F2.Events.{{#crossLink "F2.Events/emit"}}{{/crossLink}} is fired
		 * @property EVENT
		 * @type string
		 * @static
		 * @final
		 */
		EVENT: '__event__',
		/**
		 * The LOAD message is sent when an iframe socket initially loads.
		 * Returns a JSON string that represents:
		 *
		 *     [ App, AppManifest]
		 * 
		 * @property LOAD
		 * @type string
		 * @static
		 * @final
		 */
		LOAD: '__socketLoad__',
		/**
		 * The RPC message is sent when a method is passed up from within a secure
		 * app page.
		 * @property RPC
		 * @type string
		 * @static
		 * @final
		 */
		RPC: '__rpc__',
		/**
		 * The RPC\_CALLBACK message is sent when a call back from an RPC method is
		 * fired.
		 * @property RPC_CALLBACK
		 * @type string
		 * @static
		 * @final
		 */
		RPC_CALLBACK: '__rpcCallback__',
		/**
		 * The UI\_RPC message is sent when a UI method called.
		 * @property UI_RPC
		 * @type string
		 * @static
		 * @final
		 */
		UI_RPC: '__uiRpc__'
	},

	/**
	 * The available view types to apps. The view should be specified by applying
	 * the {{#crossLink "F2.Constants.Css"}}{{/crossLink}}.APP\_VIEW class to the
	 * containing DOM Element. A DATA\_ATTRIBUTE attribute should be added to the
	 * Element as well which defines what view type is represented.
	 * The `hide` class can be applied to views that should be hidden by default.
	 * @class F2.Constants.Views
	 */
	Views: {
		/**
		 * The DATA_ATTRIBUTE should be placed on the DOM Element that contains the
		 * view.
		 * @property DATA_ATTRIBUTE
		 * @type string
		 * @static
		 * @final
		 */
		DATA_ATTRIBUTE: 'data-f2-view',
		/**
		 * The ABOUT view gives details about the app.
		 * @property ABOUT
		 * @type string
		 * @static
		 * @final
		 */
		ABOUT: 'about',
		/**
		 * The HELP view provides users with help information for using an app.
		 * @property HELP
		 * @type string
		 * @static
		 * @final
		 */
		HELP: 'help',
		/**
		 * The HOME view is the main view for an app. This view should always
		 * be provided by an app.
		 * @property HOME
		 * @type string
		 * @static
		 * @final
		 */
		HOME: 'home',
		/**
		 * The REMOVE view is a special view that handles the removal of an app
		 * from the container.
		 * @property REMOVE
		 * @type string
		 * @static
		 * @final
		 */
		REMOVE: 'remove',
		/**
		 * The SETTINGS view provides users the ability to modify advanced settings
		 * for an app.
		 * @property SETTINGS
		 * @type string
		 * @static
		 * @final
		 */
		SETTINGS: 'settings'
	}
});
/**
 * Handles [Context](../../app-development.html#context) passing from
 * containers to apps and apps to apps.
 * @class F2.Events
 */
F2.extend('Events', (function() {
	// init EventEmitter
	var _events = new EventEmitter2({
		wildcard:true
	});

	// unlimited listeners, set to > 0 for debugging
	_events.setMaxListeners(0);

	return {
		/**
		 * Same as F2.Events.emit except that it will not send the event
		 * to all sockets.
		 * @method _socketEmit
		 * @private
		 * @param {string} event The event name
		 * @param {object} [arg]* The arguments to be passed
		 */
		_socketEmit: function() {
			return EventEmitter2.prototype.emit.apply(_events, [].slice.call(arguments));
		},
		/**
		 * Execute each of the listeners that may be listening for the specified
		 * event name in order with the list of arguments.
		 * @method emit
		 * @param {string} event The event name
		 * @param {object} [arg]* The arguments to be passed
		 */
		emit: function() {
			F2.Rpc.broadcast(F2.Constants.Sockets.EVENT, [].slice.call(arguments));
			return EventEmitter2.prototype.emit.apply(_events, [].slice.call(arguments));
		},
		/**
		 * Adds a listener that will execute n times for the event before being 
		 * removed. The listener is invoked only the first time the event is 
		 * fired, after which it is removed.
		 * @method many
		 * @param {string} event The event name
		 * @param {int} timesToListen The number of times to execute the event
		 * before being removed
		 * @param {function} listener The function to be fired when the event is
		 * emitted
		 */
		many: function(event, timesToListen, listener) {
			return _events.many(event, timesToListen, listener);
		},
		/**
		 * Remove a listener for the specified event.
		 * @method off
		 * @param {string} event The event name
		 * @param {function} listener The function that will be removed
		 */
		off: function(event, listener) {
			return _events.off(event, listener);
		},
		/**
		 * Adds a listener for the specified event
		 * @method on
		 * @param {string} event The event name
		 * @param {function} listener The function to be fired when the event is
		 * emitted
		 */
		on: function(event, listener){
			return _events.on(event, listener);
		},
		/**
		 * Adds a one time listener for the event. The listener is invoked only
		 * the first time the event is fired, after which it is removed.
		 * @method once
		 * @param {string} event The event name
		 * @param {function} listener The function to be fired when the event is
		 * emitted
		 */
		once: function(event, listener) {
			return _events.once(event, listener);
		}
	};
})());
/**
 * Handles socket communication between the container and secure apps
 * @class F2.Rpc
 */
F2.extend('Rpc', (function(){
	var _callbacks = {};
	var _secureAppPagePath = '';
	var _apps = {};
	var _rEvents = new RegExp('^' + F2.Constants.Sockets.EVENT);
	var _rRpc = new RegExp('^' + F2.Constants.Sockets.RPC);
	var _rRpcCallback = new RegExp('^' + F2.Constants.Sockets.RPC_CALLBACK);
	var _rSocketLoad = new RegExp('^' + F2.Constants.Sockets.LOAD);
	var _rUiCall = new RegExp('^' + F2.Constants.Sockets.UI_RPC);

	/**
	 * Creates a socket connection from the app to the container using 
	 * <a href="http://easyxdm.net" target="_blank">easyXDM</a>.
	 * @method _createAppToContainerSocket
	 * @private
	 */
	var _createAppToContainerSocket = function() {

		var appConfig; // socket closure
		var isLoaded = false;
		// its possible for messages to be received before the socket load event has
		// happened.  We'll save off these messages and replay them once the socket
		// is ready
		var messagePlayback = [];

		var socket = new easyXDM.Socket({
			onMessage: function(message, origin){

				// handle Socket Load
				if (!isLoaded && _rSocketLoad.test(message)) {
					message = message.replace(_rSocketLoad, '');
					var appParts = F2.parse(message);

					// make sure we have the AppConfig and AppManifest
					if (appParts.length == 2) {
						appConfig = appParts[0];

						// save socket
						_apps[appConfig.instanceId] = {
							config:appConfig,
							socket:socket
						};	

						// register app
						F2.registerApps([appConfig], [appParts[1]]);

						// socket message playback
						jQuery.each(messagePlayback, function(i, e) {
							_onMessage(appConfig, message, origin);
						});
						
						isLoaded = true;
					}
				} else if (isLoaded) {
					// pass everyting else to _onMessage
					_onMessage(appConfig, message, origin);
				} else {
					//F2.log('socket not ready, queuing message', message);
					messagePlayback.push(message);
				}
			}
		});
	};

	/**
	 * Creates a socket connection from the container to the app using 
	 * <a href="http://easyxdm.net" target="_blank">easyXDM</a>.
	 * @method _createContainerToAppSocket
	 * @private
	 * @param {appConfig} appConfig The F2.AppConfig object
	 * @param {F2.AppManifest} appManifest The F2.AppManifest object
	 */
	var _createContainerToAppSocket = function(appConfig, appManifest) {

		var container = jQuery(appConfig.root);

		if (!container.is('.' + F2.Constants.Css.APP_CONTAINER)) {
			container.find('.' + F2.Constants.Css.APP_CONTAINER);
		}

		if (!container.length) {
			F2.log('Unable to locate app in order to establish secure connection.');
			return;
		}

		var iframeProps = {
			scrolling:'no',
			style:{
				width:'100%'
			}
		};

		if (appConfig.height) {
			iframeProps.style.height = appConfig.height + 'px';
		}

		var socket = new easyXDM.Socket({
			remote: _secureAppPagePath,
			container: container.get(0),
			props:iframeProps,
			onMessage: function(message, origin) {
				// pass everything to _onMessage
				_onMessage(appConfig, message, origin);
			},
			onReady: function() {
				socket.postMessage(F2.Constants.Sockets.LOAD + F2.stringify([appConfig, appManifest], F2.appConfigReplacer));
			}
		});

		return socket;
	};

	/**
	 * @method _createRpcCallback
	 * @private
	 * @param {string} instanceId The app's Instance ID
	 * @param {function} callbackId The callback ID
	 * @return {function} A function to make the RPC call
	 */
	var _createRpcCallback = function(instanceId, callbackId) {
		return function() {
			F2.Rpc.call(
				instanceId,
				F2.Constants.Sockets.RPC_CALLBACK,
				callbackId,
				[].slice.call(arguments).slice(2)
			);
		};
	};

	/**
	 * Handles messages that come across the sockets
	 * @method _onMessage
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @param {string} message The socket message
	 * @param {string} origin The originator
	 */
	var _onMessage = function(appConfig, message, origin) {

		var obj, func;

		function parseFunction(parent, functionName) {
			var path = String(functionName).split('.');
			for (var i = 0; i < path.length; i++) {
				if (parent[path[i]] === undefined) {
					parent = undefined;
					break;
				}
				parent = parent[path[i]];
			}
			return parent;
		}

		function parseMessage(regEx, message, instanceId) {
			var o = F2.parse(message.replace(regEx, ''));

			// if obj.callbacks
			//   for each callback
			//     for each params
			//       if callback matches param
			//        replace param with _createRpcCallback(app.instanceId, callback)
			if (o.params && o.params.length && o.callbacks && o.callbacks.length) {
				jQuery.each(o.callbacks, function(i, c) {
					jQuery.each(o.params, function(i, p) {
						if (c == p) {
							o.params[i] = _createRpcCallback(instanceId, c);
						}
					});
				});
			}

			return o;
		}

		// handle UI Call
		if (_rUiCall.test(message)) {
			obj = parseMessage(_rUiCall, message, appConfig.instanceId);
			func = parseFunction(appConfig.ui, obj.functionName);
			// if we found the function, call it
			if (func !== undefined) {
				func.apply(appConfig.ui, obj.params);
			} else {
				F2.log('Unable to locate UI RPC function: ' + obj.functionName);
			}

		// handle RPC
		} else if (_rRpc.test(message)) {
			obj = parseMessage(_rRpc, message, appConfig.instanceId);
			func = parseFunction(window, obj.functionName);
			if (func !== undefined) {
				func.apply(func, obj.params);
			} else {
				F2.log('Unable to locate RPC function: ' + obj.functionName);
			}

		// handle RPC Callback
		} else if (_rRpcCallback.test(message)) {
			obj = parseMessage(_rRpcCallback, message, appConfig.instanceId);
			if (_callbacks[obj.functionName] !== undefined) {
				_callbacks[obj.functionName].apply(_callbacks[obj.functionName], obj.params);
				delete _callbacks[obj.functionName];
			}

		// handle Events
		} else if (_rEvents.test(message)) {
			obj = parseMessage(_rEvents, message, appConfig.instanceId);
			F2.Events._socketEmit.apply(F2.Events, obj);
		}
	};

	/**
	 * Registers a callback function
	 * @method _registerCallback
	 * @private
	 * @param {function} callback The callback function
	 * @return {string} The callback ID
	 */
	var _registerCallback = function(callback) {
		var callbackId = F2.guid();
		_callbacks[callbackId] = callback;
		return callbackId;
	};

	return {
		/**
		 * Broadcast an RPC function to all sockets
		 * @method broadcast
		 * @param {string} messageType The message type
		 * @param {Array} params The parameters to broadcast
		 */
		broadcast: function(messageType, params) {
			// check valid messageType
			var message = messageType + F2.stringify(params);
			jQuery.each(_apps, function(i, a) {
				a.socket.postMessage(message);
			});
		},
		/**
		 * Calls a remote function
		 * @method call
		 * @param {string} instanceId The app's Instance ID
		 * @param {string} messageType The message type
		 * @param {string} functionName The name of the remote function
		 * @param {Array} params An array of parameters to pass to the remote
		 * function. Any functions found within the params will be treated as a
		 * callback function.
		 */
		call: function(instanceId, messageType, functionName, params) {
			// loop through params and find functions and convert them to callbacks
			var callbacks = [];
			jQuery.each(params, function(i, e) {
				if (typeof e === 'function') {
					var cid = _registerCallback(e);
					params[i] = cid;
					callbacks.push(cid);
				}
			});
			// check valid messageType
			_apps[instanceId].socket.postMessage(
				messageType + F2.stringify({
					functionName:functionName,
					params:params,
					callbacks:callbacks
				})
			);
		},

		/**
		 * Init function which tells F2.Rpc whether it is running at the container-
		 * level or the app-level. This method is generally called by
		 * F2.{{#crossLink "F2/init"}}{{/crossLink}}
		 * @method init
		 * @param {string} [secureAppPagePath] The
		 * {{#crossLink "F2.ContainerConfig"}}{{/crossLink}}.secureAppPagePath
		 * property
		 */
		init: function(secureAppPagePath) {
			_secureAppPagePath = secureAppPagePath;
			if (!_secureAppPagePath) {
				_createAppToContainerSocket();
			}
		},

		/**
		 * Determines whether the Instance ID is considered to be 'remote'. This is
		 * determined by checking if 1) the app has an open socket and 2) whether
		 * F2.Rpc is running inside of an iframe
		 * @method isRemote
		 * @param {string} instanceId The Instance ID
		 * @return {bool} True if there is an open socket
		 */
		isRemote: function(instanceId) {
			return (
				// we have an app
				_apps[instanceId] !== undefined &&
				// the app is secure
				_apps[instanceId].config.isSecure &&
				// we can't access the iframe
				jQuery(_apps[instanceId].config.root).find('iframe').length === 0
			);
		},

		/**
		 * Creates a container-to-app or app-to-container socket for communication
		 * @method register
		 * @param {F2.AppConfig} [appConfig] The F2.AppConfig object
		 * @param {F2.AppManifest} [appManifest] The F2.AppManifest object
		 */
		register: function(appConfig, appManifest) {
			if (!!appConfig && !!appManifest) {
				_apps[appConfig.instanceId] = {
					config:appConfig,
					socket:_createContainerToAppSocket(appConfig, appManifest)
				};
			} else {
				F2.log('Unable to register socket connection. Please check container configuration.');
			}
		}
	};
})());
F2.extend('UI', (function(){

	var _containerConfig;

	/**
	 * UI helper methods
	 * @class F2.UI
	 * @constructor
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 */
	var UI_Class = function(appConfig) {

		var _appConfig = appConfig;
		var $root = jQuery(appConfig.root);

		var _updateHeight = function(height) {
			height = height || jQuery(_appConfig.root).outerHeight();

			if (F2.Rpc.isRemote(_appConfig.instanceId)) {
				F2.Rpc.call(
					_appConfig.instanceId,
					F2.Constants.Sockets.UI_RPC,
					'updateHeight',
					[
						height
					]
				);
			} else {
				_appConfig.height = height;
				$root.find('iframe').height(_appConfig.height);
			}
		};

		return {
			/**
			 * Removes a overlay from an Element on the page
			 * @method hideMask
			 * @param {string|Element} selector The Element or selector to an Element
			 * that currently contains the loader
			 */
			hideMask: function(selector) {
				F2.UI.hideMask(_appConfig.instanceId, selector);
			},
			/**
			 * Helper methods for creating and using Modals
			 * @class F2.UI.Modals
			 * @for F2.UI
			 */
			Modals: (function(){

				var _renderAlert = function(message) {
					return [
						'<div class="modal">',
							'<header class="modal-header">',
								'<h3>Alert!</h3>',
							'</header>',
							'<div class="modal-body">',
								'<p>',
									message,
								'</p>',
							'</div>',
							'<div class="modal-footer">',
								'<button class="btn btn-primary btn-ok">OK</button>',
							'</div>',
						'</div>'
					].join('');
				};

				var _renderConfirm = function(message) {
					return [
						'<div class="modal">',
							'<header class="modal-header">',
								'<h3>Confirm</h3>',
							'</header>',
							'<div class="modal-body">',
								'<p>',
									message,
								'</p>',
							'</div>',
							'<div class="modal-footer">',
								'<button type="button" class="btn btn-primary btn-ok">OK</button>',
								'<button type="button" class="btn btn-cancel">Cancel</button">',
							'</div>',
						'</div>'
					].join('');
				};

				return {
					/**
					 * Display an alert message on the page
					 * @method alert
					 * @param {string} message The message to be displayed
					 * @param {function} [callback] The callback to be fired when the user
					 * closes the dialog
					 * @for F2.UI.Modals
					 */
					alert: function(message, callback) {

						if (!F2.isInit()) {
							F2.log('F2.init() must be called before F2.UI.Modals.alert()');
							return;
						}

						if (F2.Rpc.isRemote(_appConfig.instanceId)) {
							F2.Rpc.call(
								_appConfig.instanceId,
								F2.Constants.Sockets.UI_RPC,
								'Modals.alert',
								[].slice.call(arguments)
							);
						} else {
							// display the alert
							jQuery(_renderAlert(message))
								.on('show', function() {
									var modal = this;
									jQuery(modal).find('.btn-primary').on('click', function() {
										jQuery(modal).modal('hide').remove();
										(callback || jQuery.noop)();
									});
								})
								.modal({backdrop:true});
						}
					},
					/**
					 * Display a confirm message on the page
					 * @method confirm
					 * @param {string} message The message to be displayed
					 * @param {function} okCallback The function that will be called when the OK
					 * button is pressed
					 * @param {function} cancelCallback The function that will be called when
					 * the Cancel button is pressed
					 * @for F2.UI.Modals
					 */
					confirm: function(message, okCallback, cancelCallback) {

						if (!F2.isInit()) {
							F2.log('F2.init() must be called before F2.UI.Modals.confirm()');
							return;
						}

						if (F2.Rpc.isRemote(_appConfig.instanceId)) {
							F2.Rpc.call(
								_appConfig.instanceId,
								F2.Constants.Sockets.UI_RPC,
								'Modals.confirm',
								[].slice.call(arguments)
							);
						} else {
							// display the alert
							jQuery(_renderConfirm(message))
								.on('show', function() {
									var modal = this;

									jQuery(modal).find('.btn-ok').on('click', function() {
										jQuery(modal).modal('hide').remove();
										(okCallback || jQuery.noop)();
									});

									jQuery(modal).find('.btn-cancel').on('click', function() {
										jQuery(modal).modal('hide').remove();
										(cancelCallback || jQuery.noop)();
									});
								})
								.modal({backdrop:true});
						}
					}
				};
			})(),
			/**
			 * Sets the title of the app as shown in the browser. Depending on the
			 * container HTML, this method may do nothing if the container has not been
			 * configured properly or else the container provider does not allow Title's
			 * to be set.
			 * @method setTitle
			 * @params {string} title The title of the app
			 * @for F2.UI
			 */
			setTitle: function(title) {

				if (F2.Rpc.isRemote(_appConfig.instanceId)) {
					F2.Rpc.call(
						_appConfig.instanceId,
						F2.Constants.Sockets.UI_RPC,
						'setTitle',
						[
							title
						]
					);
				} else {
					jQuery(_appConfig.root).find('.' + F2.Constants.Css.APP_TITLE).text(title);
				}
			},
			/**
			 * Display an ovarlay over an Element on the page
			 * @method showMask
			 * @param {string|Element} selector The Element or selector to an Element
			 * over which to display the loader
			 * @param {bool} showLoading Display a loading icon
			 */
			showMask: function(selector, showLoader) {
				F2.UI.showMask(_appConfig.instanceId, selector, showLoader);
			},
			/**
			 * For secure apps, this method updates the size of the iframe that
			 * contains the app. **Note: It is recommended that app developers call
			 * this method anytime Elements are added or removed from the DOM**
			 * @method updateHeight
			 * @params {int} height The height of the app
			 */
			updateHeight: _updateHeight,
			/**
			 * Helper methods for creating and using Views
			 * @class F2.UI.Views
			 * @for F2.UI
			 */
			Views: (function(){

				var _events = new EventEmitter2();
				var _rValidEvents = /change/i;

				// unlimited listeners, set to > 0 for debugging
				_events.setMaxListeners(0);

				var _isValid = function(eventName) {
					if (_rValidEvents.test(eventName)) {
						return true;
					} else {
						F2.log('"' + eventName + '" is not a valid F2.UI.Views event name');
						return false;
					}
				};

				return {
					/**
					 * Change the current view for the app or add an event listener
					 * @method change
					 * @param {string|function} [input] If a string is passed in, the view
					 * will be changed for the app. If a function is passed in, a change
					 * event listener will be added.
					 * @for F2.UI.Views
					 */
					change: function(input) {

						if (typeof input === 'function') {
							this.on('change', input);
						} else if (typeof input === 'string') {

							if (_appConfig.isSecure && !F2.Rpc.isRemote(_appConfig.instanceId)) {
								F2.Rpc.call(
									_appConfig.instanceId,
									F2.Constants.Sockets.UI_RPC,
									'Views.change',
									[].slice.call(arguments)
								);
							} else if (F2.inArray(input, _appConfig.views)) {
								jQuery('.' + F2.Constants.Css.APP_VIEW, $root)
									.addClass('hide')
									.filter('[data-f2-view="' + input + '"]', $root)
									.removeClass('hide');
								
								_updateHeight();
								_events.emit('change', input);
							}							
						}
					},
					/**
					 * Removes a view event listener
					 * @method off
					 * @param {string} event The event name
					 * @param {function} listener The function that will be removed
					 * @for F2.UI.Views
					 */
					off: function(event, listener) {
						if (_isValid(event)) {
							_events.off(event, listener);
						}
					},
					/**
					 * Adds a view event listener
					 * @method on
					 * @param {string} event The event name
					 * @param {function} listener The function to be fired when the event is
					 * emitted
					 * @for F2.UI.Views
					 */
					on: function(event, listener) {
						if (_isValid(event)) {
							_events.on(event, listener);
						}
					}
				};
			})()
		};
	};

	/**
	 * Removes a overlay from an Element on the page
	 * @method hideMask
	 * @static
	 * @param {string} instanceId The Instance ID of the app
	 * @param {string|Element} selector The Element or selector to an Element
	 * that currently contains the loader
	 * @for F2.UI
	 */
	UI_Class.hideMask = function(instanceId, selector) {

		if (!F2.isInit()) {
			F2.log('F2.init() must be called before F2.UI.hideMask()');
			return;
		}

		if (F2.Rpc.isRemote(instanceId) && !jQuery(selector).is('.' + F2.Constants.Css.APP)) {
			F2.Rpc.call(
				instanceId,
				F2.Constants.Sockets.RPC,
				'F2.UI.hideMask',
				[
					instanceId,
					// must only pass the selector argument. if we pass an Element there
					// will be F2.stringify() errors
					jQuery(selector).selector
				]
			);
		} else {
			
			var container = jQuery(selector);
			container.find('> .' + F2.Constants.Css.MASK).remove();
			container.removeClass(F2.Constants.Css.MASK_CONTAINER);

			// if the element contains this data property, we need to reset static
			// position
			if (container.data(F2.Constants.Css.MASK_CONTAINER)) {
				container.css({'position':'static'});
			}
		}
	};

	/**
	 *
	 * @method init
	 * @static
	 * @param {F2.ContainerConfig} containerConfig The F2.ContainerConfig object
	 */
	UI_Class.init = function(containerConfig) {
		_containerConfig = containerConfig;

		// set defaults
		_containerConfig.UI = jQuery.extend(true, {}, F2.ContainerConfig.UI, _containerConfig.UI || {});
	};

	/**
	 * Display an ovarlay over an Element on the page
	 * @method showMask
	 * @static
	 * @param {string} instanceId The Instance ID of the app
	 * @param {string|Element} selector The Element or selector to an Element
	 * over which to display the loader
	 * @param {bool} showLoading Display a loading icon
	 */
	UI_Class.showMask = function(instanceId, selector, showLoading) {

		if (!F2.isInit()) {
			F2.log('F2.init() must be called before F2.UI.showMask()');
			return;
		}

		if (F2.Rpc.isRemote(instanceId) && jQuery(selector).is('.' + F2.Constants.Css.APP)) {
			F2.Rpc.call(
				instanceId,
				F2.Constants.Sockets.RPC,
				'F2.UI.showMask',
				[
					instanceId,
					// must only pass the selector argument. if we pass an Element there
					// will be F2.stringify() errors
					jQuery(selector).selector,
					showLoading
				]
			);
		} else {

			if (showLoading && !_containerConfig.UI.Mask.loadingIcon) {
				F2.log('Unable to display loading icon. Please set F2.ContainerConfig.UI.Mask.loadingIcon	when calling F2.init();');
			}

			var container = jQuery(selector).addClass(F2.Constants.Css.MASK_CONTAINER);
			var mask = jQuery('<div>')
				.height('100%' /*container.outerHeight()*/)
				.width('100%' /*container.outerWidth()*/)
				.addClass(F2.Constants.Css.MASK);

			// set inline styles if useClasses is false
			if (!_containerConfig.UI.Mask.useClasses) {
				mask.css({
					'background-color':_containerConfig.UI.Mask.backgroundColor,
					'background-image': !!_containerConfig.UI.Mask.loadingIcon ? ('url(' + _containerConfig.UI.Mask.loadingIcon + ')') : '',
					'background-position':'50% 50%',
					'background-repeat':'no-repeat',
					'display':'block',
					'left':0,
					'min-height':30,
					'padding':0,
					'position':'absolute',
					'top':0,
					'z-index':_containerConfig.UI.Mask.zIndex,

					'filter':'alpha(opacity=' + (_containerConfig.UI.Mask.opacity * 100) + ')',
					'opacity':_containerConfig.UI.Mask.opacity
				});
			}

			// only set the position if the container is currently static
			if (container.css('position') === 'static') {
				container.css({'position':'relative'});
				// setting this data property tells hideMask to set the position
				// back to static
				container.data(F2.Constants.Css.MASK_CONTAINER, true);
			}

			// add the mask to the container
			container.append(mask);
		}
	};

	return UI_Class;
})());
/**
 * Root namespace of the F2 SDK
 * @module f2
 * @class F2
 */
F2.extend('', (function(){

	var _apps = {};
	var _config = false;
	var _bUsesAppHandlers = false;
	var _sAppHandlerToken = F2.AppHandlers.__f2GetToken();

	/**
	 * Appends the app's html to the DOM
	 * @method _afterAppRender
	 * @deprecated This has been replaced with {{#crossLink "F2.AppHandlers"}}{{/crossLink}} and will be removed in v2.0
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @param {string} html The string of html
	 * @return {Element} The DOM Element that contains the app
	 */
	var _afterAppRender = function(appConfig, html) {
		
		var handler = _config.afterAppRender || function(appConfig, html) {
			return jQuery(html).appendTo('body');
		};
		var appContainer = handler(appConfig, html);

		if (!!_config.afterAppRender && !appContainer) {
			F2.log('F2.ContainerConfig.afterAppRender() must return the DOM Element that contains the app');
			return;
		} else {
			// apply APP class and Instance ID
			jQuery(appContainer).addClass(F2.Constants.Css.APP);
			return appContainer.get(0);
		}
	};

	/**
	 * Renders the html for an app.
	 * @method _appRender
	 * @deprecated This has been replaced with {{#crossLink "F2.AppHandlers"}}{{/crossLink}} and will be removed in v2.0
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @param {string} html The string of html
	 */
	var _appRender = function(appConfig, html) {

		// apply APP_CONTAINER class
		html = _outerHtml(jQuery(html).addClass(F2.Constants.Css.APP_CONTAINER + ' ' + appConfig.appId));

		// optionally apply wrapper html
		if (_config.appRender) {
			html = _config.appRender(appConfig, html);
		}

		// apply APP class and instanceId
		return _outerHtml(html);
	};

	/**
	 * Rendering hook to allow containers to render some html prior to an app
	 * loading
	 * @method _beforeAppRender
	 * @deprecated This has been replaced with {{#crossLink "F2.AppHandlers"}}{{/crossLink}} and will be removed in v2.0
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @return {Element} The DOM Element surrounding the app
	 */
	var _beforeAppRender = function(appConfig) {
		var handler = _config.beforeAppRender || jQuery.noop;
		return handler(appConfig);
	};

	/**
	 * Adds properties to the AppConfig object
	 * @method _createAppConfig
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @return {F2.AppConfig} The new F2.AppConfig object, prepopulated with
	 * necessary properties
	 */
	var _createAppConfig = function(appConfig) {

		// make a copy of the app config to ensure that the original is not modified
		appConfig = jQuery.extend(true, {}, appConfig);

		// create the instanceId for the app
		appConfig.instanceId = appConfig.instanceId || F2.guid();

		// default the views if not provided
		appConfig.views = appConfig.views || [];
		if (!F2.inArray(F2.Constants.Views.HOME, appConfig.views)) {
			appConfig.views.push(F2.Constants.Views.HOME);
		}

		return appConfig;
	};

	/**
	 * Adds properties to the ContainerConfig object to take advantage of defaults
	 * @method _hydrateContainerConfig
	 * @private
	 * @param {F2.ContainerConfig} containerConfig The F2.ContainerConfig object
	 */
	var _hydrateContainerConfig = function(containerConfig) {
		if (!containerConfig.scriptErrorTimeout){
			containerConfig.scriptErrorTimeout = F2.ContainerConfig.scriptErrorTimeout;
		}

		if (containerConfig.debugMode !== true){
			containerConfig.debugMode = F2.ContainerConfig.debugMode;
		}
	};

	/**
	 * Attach app events
	 * @method _initAppEvents
	 * @private
	 */
	var _initAppEvents = function (appConfig) {

		jQuery(appConfig.root).on('click', '.' + F2.Constants.Css.APP_VIEW_TRIGGER + '[' + F2.Constants.Views.DATA_ATTRIBUTE + ']', function(event) {

			event.preventDefault();

			var view = jQuery(this).attr(F2.Constants.Views.DATA_ATTRIBUTE).toLowerCase();

			// handle the special REMOVE view
			if (view == F2.Constants.Views.REMOVE) {
				F2.removeApp(appConfig.instanceId);
			} else {
				appConfig.ui.Views.change(view);
			}
		});
	};

	/**
	 * Attach container Events
	 * @method _initContainerEvents
	 * @private
	 */
	var _initContainerEvents = function() {

		var resizeTimeout;
		var resizeHandler = function() {
			F2.Events.emit(F2.Constants.Events.CONTAINER_WIDTH_CHANGE);
		};

		jQuery(window).on('resize', function() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resizeHandler, 100);
		});
	};

	/**
	 * Has the container been init?
	 * @method _isInit
	 * @private
	 * @return {bool} True if the container has been init
	 */
	var _isInit = function() {
		return !!_config;
	};

	/**
	 * Instantiates each app from it's appConfig and stores that in a local private collection
	 * @method _createAppInstance
	 * @private
	 * @param {Array} appConfigs An array of {{#crossLink "F2.AppConfig"}}{{/crossLink}} objects
	 */
	var _createAppInstance = function(appConfig, appContent){
		// instantiate F2.UI
		appConfig.ui = new F2.UI(appConfig);

		// instantiate F2.App
		if (F2.Apps[appConfig.appId] !== undefined) {
			if (typeof F2.Apps[appConfig.appId] === 'function') {

				// IE
				setTimeout(function() {
					_apps[appConfig.instanceId].app = new F2.Apps[appConfig.appId](appConfig, appContent, appConfig.root);
					if (_apps[appConfig.instanceId].app['init'] !== undefined) {
						_apps[appConfig.instanceId].app.init();
					}
				}, 0);
				
			} else {
				F2.log('app initialization class is defined but not a function. (' + appConfig.appId + ')');
			}
		}
	};

	/**
	 * Loads the app's html/css/javascript
	 * @method loadApp
	 * @private
	 * @param {Array} appConfigs An array of
	 * {{#crossLink "F2.AppConfig"}}{{/crossLink}} objects
	 * @param {F2.AppManifest} [appManifest] The AppManifest object
	 */
	var _loadApps = function(appConfigs, appManifest) {

		appConfigs = [].concat(appConfigs);

		// check for secure app
		if (appConfigs.length == 1 && appConfigs[0].isSecure && !_config.isSecureAppPage) {
			_loadSecureApp(appConfigs[0], appManifest);
			return;
		}

		// check that the number of apps in manifest matches the number requested
		if (appConfigs.length != appManifest.apps.length) {
			F2.log('The number of apps defined in the AppManifest do not match the number requested.', appManifest);
			return;
		}

		var scripts = appManifest.scripts || [];
		var styles = appManifest.styles || [];
		var inlines = appManifest.inlineScripts || [];
		var scriptCount = scripts.length;
		var scriptsLoaded = 0;
		var appInit = function() {
			jQuery.each(appConfigs, function(i, a) {
				_createAppInstance(a, appManifest.apps[i]);
			});
		};
		//Check to see if any of the ways a file can be ready are available as properties on the file's element (borrowed from yepnope)
		var isFileReady = function(readyState) {
			return ( !readyState || readyState == 'loaded' || readyState == 'complete' || readyState == 'uninitialized' );
		};
		var _onload = function(e){
			if ( e.type == 'load' || isFileReady((e.currentTarget || e.srcElement).readyState) ){
				//done, cleanup
				var script = e.currentTarget || e.srcElement;
				if (script.detachEvent){
					script.detachEvent('onreadystatechange', _onload);//IE
				} else {
					removeEventListener(script, _onload, 'load');
					removeEventListener(script, _error, 'error');
				}
			}

			//are we done loading all scripts for this app?
			if (++scriptsLoaded == scriptCount) {
				evalInlines();
				appInit();
			}
		};
		var _error = function(e){
			//log and emit event for the failed (400,500) scripts
			setTimeout(function(){
				var evtData = {
					src: e.target.src,
					appId: appConfigs[0].appId
				};
				//send error to console
				F2.log('Script defined in \'' + evtData.appId + '\' failed to load \'' + evtData.src + '\'');
				//emit event 
				F2.Events.emit('RESOURCE_FAILED_TO_LOAD', evtData);
			}, _config.scriptErrorTimeout);//defaults to 7000
		};
		//eval inlines
		var evalInlines = function(){
			jQuery.each(inlines, function(i, e) {
				try {
					eval(e);
				} catch (exception) {
					F2.log('Error loading inline script: ' + exception + '\n\n' + e);
				}
			});
		};

		// load styles, see #101
		var stylesFragment = null,
			useCreateStyleSheet = !!document.createStyleSheet;
		jQuery.each(styles, function(i, e) {
			if (useCreateStyleSheet) {
                document.createStyleSheet(e); 
			} else {
				stylesFragment = stylesFragment || [];
				stylesFragment.push('<link rel="stylesheet" type="text/css" href="' + e + '"/>');
			}
		});

		if (stylesFragment){
			jQuery('head').append(stylesFragment.join(''));
		}

		// load html
		jQuery.each(appManifest.apps, function(i, a) {
			if(!_bUsesAppHandlers) {
				// load html and save the root node
				appConfigs[i].root = _afterAppRender(appConfigs[i], _appRender(appConfigs[i], a.html));
			} else {
				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_RENDER,
					appConfigs[i], // the app config
					_outerHtml(a.html)
				);

				var appId = appConfigs[i].appId;
				
				if (!appConfigs[i].root) {
					throw('Root for ' +appId+ ' must be a native DOM element and cannot be null or undefined. Check your AppHandler callbacks to ensure you have set App root to a native DOM element.');
				}
				
				var $root = jQuery(appConfigs[i].root);
				
				if ($root.parents('body:first').length === 0) {
					throw('App root for ' +appId+ ' was not appended to the DOM. Check your AppHandler callbacks to ensure you have rendered the app root to the DOM.');
				}
				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_RENDER_AFTER,
					appConfigs[i] // the app config
				);
				
				if(!F2.isNativeDOMNode(appConfigs[i].root)) {
					throw('App root for ' +appId+ ' must be a native DOM element. Check your AppHandler callbacks to ensure you have set app root to a native DOM element.');
				}
				
				$root.addClass(F2.Constants.Css.APP_CONTAINER + ' ' + appId);
			}
			
			// init events
			_initAppEvents(appConfigs[i]);
		});

		// load scripts and eval inlines once complete
		jQuery.each(scripts, function(i, e) {
			var doc = document, 
				script = doc.createElement('script'), 
				resourceUrl = e;

			//if in debugMode, add cache buster to each script URL
			if (_config.debugMode){
				resourceUrl += '?cachebuster=' + new Date().getTime();
			}
			
			//scripts needed to be loaded in order they're defined in the AppManifest
			script.async = false;
			//add other attrs
			script.src = resourceUrl;
			script.type = 'text/javascript';
			script.charset = 'utf-8';
			//attach load event to script to evaluate inline scripts and init the AppClass
			if (script.attachEvent && !(script.attachEvent.toString && script.attachEvent.toString().indexOf('[native code') < 0)){//for IE, from requirejs
				script.attachEvent('onreadystatechange', _onload);
			} else {
				script.addEventListener('load', _onload, false);
				//attach error event for 400s and 500s
				script.addEventListener('error', _error, false);
			}
			
			doc.body.appendChild(script);
		});

		// if no scripts were to be processed, fire the appInit event
		if (!scriptCount) {
			evalInlines();
			appInit();
		}
	};

	/**
	 * Loads the app's html/css/javascript into an iframe
	 * @method loadSecureApp
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @param {F2.AppManifest} appManifest The app's html/css/js to be loaded into the
	 * page.
	 */
	var _loadSecureApp = function(appConfig, appManifest) {

		// make sure the container is configured for secure apps
		if (_config.secureAppPagePath) {
			if(!_bUsesAppHandlers) {
				// create the html container for the iframe
				appConfig.root = _afterAppRender(appConfig, _appRender(appConfig, '<div></div>'));
			} else {
				var $root = jQuery(appConfig.root);
				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_RENDER,
					appConfig, // the app config
					appManifest.html
				);
				
				if ($root.parents('body:first').length === 0) {
					throw('App was never rendered on the page. Please check your AppHandler callbacks to ensure you have rendered the app root to the DOM.');
				}
				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_RENDER_AFTER,
					appConfig // the app config
				);
				
				if (!appConfig.root) {
					throw('App Root must be a native dom node and can not be null or undefined. Please check your AppHandler callbacks to ensure you have set App Root to a native dom node.');
				}
				
				if (!F2.isNativeDOMNode(appConfig.root)) {
					throw('App Root must be a native dom node. Please check your AppHandler callbacks to ensure you have set App Root to a native dom node.');
				}
				
				jQuery(appConfig.root).addClass(F2.Constants.Css.APP_CONTAINER + ' ' + appConfig.appId);
			}
			
			// instantiate F2.UI
			appConfig.ui = new F2.UI(appConfig);
			// init events
			_initAppEvents(appConfig);
			// create RPC socket
			F2.Rpc.register(appConfig, appManifest);
		} else {
			F2.log('Unable to load secure app: "secureAppPagePath" is not defined in F2.ContainerConfig.');
		}
	};

	var _outerHtml = function(html) {
		return jQuery('<div></div>').append(html).html();
	};

	/**
	 * Checks if the app is valid
	 * @method _validateApp
	 * @private
	 * @param {F2.AppConfig} appConfig The F2.AppConfig object
	 * @returns {bool} True if the app is valid
	 */
	var _validateApp = function(appConfig) {

		// check for valid app configurations
		if (!appConfig.appId) {
			F2.log('"appId" missing from app object');
			return false;
		} else if (!appConfig.root && !appConfig.manifestUrl) {
			F2.log('"manifestUrl" missing from app object');
			return false;
		}

		return true;
	};

	/**
	 * Checks if the ContainerConfig is valid
	 * @method _validateContainerConfig
	 * @private
	 * @returns {bool} True if the config is valid
	 */
	var _validateContainerConfig = function() {

		if (_config) {
			if (_config.xhr) {
				if (!(typeof _config.xhr === 'function' || typeof _config.xhr === 'object')) {
					throw('ContainerConfig.xhr should be a function or an object');
				}
				if (_config.xhr.dataType && typeof _config.xhr.dataType !== 'function') {
					throw('ContainerConfig.xhr.dataType should be a function');
				}
				if (_config.xhr.type && typeof _config.xhr.type !== 'function') {
					throw('ContainerConfig.xhr.type should be a function');
				}
				if (_config.xhr.url && typeof _config.xhr.url !== 'function') {
					throw('ContainerConfig.xhr.url should be a function');
				}
			}
		}

		return true;
	};

	return {
		/**
		 * Gets the current list of apps in the container
		 * @method getContainerState
		 * @returns {Array} An array of objects containing the appId
		 */
		getContainerState: function() {
			if (!_isInit()) {
				F2.log('F2.init() must be called before F2.getContainerState()');
				return;
			}

			return jQuery.map(_apps, function(app) {
				return { appId: app.config.appId };
			});
		},
		/**
		 * Initializes the container. This method must be called before performing
		 * any other actions in the container.
		 * @method init
		 * @param {F2.ContainerConfig} config The configuration object
		 */
		init: function(config) {
			_config = config || {};
			
			_validateContainerConfig();

			_hydrateContainerConfig(_config);
			
			// dictates whether we use the old logic or the new logic.
			// TODO: Remove in v2.0
			_bUsesAppHandlers = (!_config.beforeAppRender && !_config.appRender && !_config.afterAppRender);
			
			// only establish RPC connection if the container supports the secure app page
			if (!!_config.secureAppPagePath || _config.isSecureAppPage) {
				F2.Rpc.init(!!_config.secureAppPagePath ? _config.secureAppPagePath : false);
			}
			
			F2.UI.init(_config);

			if (!_config.isSecureAppPage) {
				_initContainerEvents();
			}
		},
		/**
		 * Has the container been init?
		 * @method isInit
		 * @return {bool} True if the container has been init
		 */
		isInit: _isInit,
		/**
		* Begins the loading process for all apps and/or initialization process for pre-loaded apps.
		* The app will be passed the {{#crossLink "F2.AppConfig"}}{{/crossLink}} object which will
		* contain the app's unique instanceId within the container. If the 
		* {{#crossLink "F2.AppConfig"}}{{/crossLink}}.root property is populated the app is considered
		* to be a pre-loaded app and will be handled accordingly. Optionally, the
		* {{#crossLink "F2.AppManifest"}}{{/crossLink}} can be passed in and those
		* assets will be used instead of making a request.
		* @method registerApps
		* @param {Array} appConfigs An array of {{#crossLink "F2.AppConfig"}}{{/crossLink}}
		* objects
		* @param {Array} [appManifests] An array of
		* {{#crossLink "F2.AppManifest"}}{{/crossLink}}
		* objects. This array must be the same length as the apps array that is
		* objects. This array must be the same length as the apps array that is
		* passed in. This can be useful if apps are loaded on the server-side and
		* passed down to the client.
		* @example
		* Traditional App requests.
		*
		*	// Traditional f2 app configs
		*	var arConfigs = [
		*		{
		*			appId: 'com_externaldomain_example_app',
		*			context: {},
		*			manifestUrl: 'http://www.externaldomain.com/F2/AppManifest'
		*		},
		*		{
		*			appId: 'com_externaldomain_example_app',
		*			context: {},
		*			manifestUrl: 'http://www.externaldomain.com/F2/AppManifest'
		*		},
		*		{
		*			appId: 'com_externaldomain_example_app2',
		*			context: {},
		*			manifestUrl: 'http://www.externaldomain.com/F2/AppManifest'
		*		}
		*	];
		*	
		*	F2.init();
		*	F2.registerApps(arConfigs);
		*
		* @example
		* Pre-loaded and tradition apps mixed.
		* 
		*	// Pre-loaded apps and traditional f2 app configs
		*	// you can preload the same app multiple times as long as you have a unique root for each
		*	var arConfigs = [
		*		{
		*			appId: 'com_mydomain_example_app',
		*			context: {},
		*			root: 'div#example-app-1',
		*			manifestUrl: ''
		*		},
		*		{
		*			appId: 'com_mydomain_example_app',
		*			context: {},
		*			root: 'div#example-app-2',
		*			manifestUrl: ''
		*		},
		*		{
		*			appId: 'com_externaldomain_example_app',
		*			context: {},
		*			manifestUrl: 'http://www.externaldomain.com/F2/AppManifest'
		*		}
		*	];
		*
		*	F2.init();
		*	F2.registerApps(arConfigs);
		*
		* @example
		* Apps with predefined manifests.
		*
		*	// Traditional f2 app configs
		*	var arConfigs = [
		*		{appId: 'com_externaldomain_example_app', context: {}},
		*		{appId: 'com_externaldomain_example_app', context: {}},
		*		{appId: 'com_externaldomain_example_app2', context: {}}
		*	];
		*
		*	// Pre requested manifest responses
		*	var arManifests = [
		*		{
		*			apps: ['<div>Example App!</div>'],
		*			inlineScripts: [],
		*			scripts: ['http://www.domain.com/js/AppClass.js'],
		*			styles: ['http://www.domain.com/css/AppStyles.css']
		*		},
		*		{
		*			apps: ['<div>Example App!</div>'],
		*			inlineScripts: [],
		*			scripts: ['http://www.domain.com/js/AppClass.js'],
		*			styles: ['http://www.domain.com/css/AppStyles.css']
		*		},
		*		{
		*			apps: ['<div>Example App 2!</div>'],
		*			inlineScripts: [],
		*			scripts: ['http://www.domain.com/js/App2Class.js'],
		*			styles: ['http://www.domain.com/css/App2Styles.css'] 
		*		}
		*	];
		*	
		*	F2.init();
		*	F2.registerApps(arConfigs, arManifests);
		*/
		registerApps: function(appConfigs, appManifests) {

			if (!_isInit()) {
				F2.log('F2.init() must be called before F2.registerApps()');
				return;
			} else if (!appConfigs) {
				F2.log('At least one AppConfig must be passed when calling F2.registerApps()');
				return;
			}

			var appStack = [];
			var batches = {};
			var callbackStack = {};
			var haveManifests = false;
			appConfigs = [].concat(appConfigs);
			appManifests = [].concat(appManifests || []);
			haveManifests = !!appManifests.length;

			// appConfigs must have a length
			if (!appConfigs.length) {
				F2.log('At least one AppConfig must be passed when calling F2.registerApps()');
				return;
			// ensure that the array of apps and manifests are qual
			} else if (appConfigs.length && haveManifests && appConfigs.length != appManifests.length) {
				F2.log('The length of "apps" does not equal the length of "appManifests"');
				return;
			}

			// validate each app and assign it an instanceId
			// then determine which apps can be batched together
			jQuery.each(appConfigs, function(i, a) {

				// add properties and methods
				a = _createAppConfig(a);

				// Will set to itself, for preloaded apps, or set to null for apps that aren't already
				// on the page.
				a.root = a.root || null;

				// we validate the app after setting the root property because pre-load apps do no require
				// manifest url
				if (!_validateApp(a)) {					
					return; // move to the next app
				}
				
				// save app
				_apps[a.instanceId] = { config:a };

				// If the root property is defined then this app is considered to be preloaded and we will
				// run it through that logic.
				if(a.root)
				{
					if((!a.root && typeof(a.root) != 'string') && !F2.isNativeDOMNode(a.root))
					{
						F2.log('AppConfig invalid for pre-load, not a valid string and not dom node');
						F2.log('AppConfig instance:', a);
						throw('Preloaded appConfig.root property must be a native dom node or a string representing a sizzle selector. Please check your inputs and try again.');
					}
					else if(jQuery(a.root).length != 1)
					{
						F2.log('AppConfig invalid for pre-load, root not unique');
						F2.log('AppConfig instance:', a);
						F2.log('Number of dom node instances:', jQuery(a.root).length);
						throw('Preloaded appConfig.root property must map to a unique dom node. Please check your inputs and try again.');
					}

					// instantiate F2.App
					_createAppInstance(a);
					
					// init events
					_initAppEvents(a);

					// Continue on in the .each loop, no need to continue because the app is on the page
					// the js in initialized, and it is ready to role.
					return; // equivalent to continue in .each
				}

				if(!_bUsesAppHandlers)
				{
					// fire beforeAppRender
					a.root = _beforeAppRender(a);
				}
				else
				{
					F2.AppHandlers.__trigger(
						_sAppHandlerToken,
						F2.Constants.AppHandlers.APP_CREATE_ROOT,
						a // the app config
					);
					
					F2.AppHandlers.__trigger(
						_sAppHandlerToken,
						F2.Constants.AppHandlers.APP_RENDER_BEFORE,
						a // the app config
					);
				}

				// if we have the manifest, go ahead and load the app
				if (haveManifests) {
					_loadApps(a, appManifests[i]);
				} else {
					// check if this app can be batched
					if (a.enableBatchRequests && !a.isSecure) {
						batches[a.manifestUrl.toLowerCase()] = batches[a.manifestUrl.toLowerCase()] || [];
						batches[a.manifestUrl.toLowerCase()].push(a);
					} else {
						appStack.push({
							apps:[a],
							url:a.manifestUrl
						});
					}
				}
			});

			// we don't have the manifests, go ahead and load them
			if (!haveManifests) {
				// add the batches to the appStack
				jQuery.each(batches, function(i, b) {
					appStack.push({ url:i, apps:b });
				});

				// if an app is being loaded more than once on the page, there is the
				// potential that the jsonp callback will be clobbered if the request
				// for the AppManifest for the app comes back at the same time as
				// another request for the same app.  We'll create a callbackStack
				// that will ensure that requests for the same app are loaded in order
				// rather than at the same time
				jQuery.each(appStack, function(i, req) {
					// define the callback function based on the first app's App ID
					var jsonpCallback = F2.Constants.JSONP_CALLBACK + req.apps[0].appId;

					// push the request onto the callback stack
					callbackStack[jsonpCallback] = callbackStack[jsonpCallback] || [];
					callbackStack[jsonpCallback].push(req);
				});

				// loop through each item in the callback stack and make the request
				// for the AppManifest. When the request is complete, pop the next 
				// request off the stack and make the request.
				jQuery.each(callbackStack, function(i, requests) {

					var manifestRequest = function(jsonpCallback, req) {
						if (!req) { return; }

						// setup defaults and callbacks
						var url = req.url,
							type = 'GET',
							dataType = 'jsonp',
							completeFunc = function() {
								manifestRequest(i, requests.pop());
							},
							errorFunc = function() {
								jQuery.each(req.apps, function(idx,item){
									F2.log('Removed failed ' +item.name+ ' app', item);
									F2.removeApp(item.instanceId);
								});
							},
							successFunc = function(appManifest) {
								_loadApps(req.apps, appManifest);
							};

						// optionally fire xhr overrides
						if (_config.xhr && _config.xhr.dataType) {
							dataType = _config.xhr.dataType(req.url, req.apps);
							if (typeof dataType !== 'string') {
								throw('ContainerConfig.xhr.dataType should return a string');
							}
						}
						if (_config.xhr && _config.xhr.type) {
							type = _config.xhr.type(req.url, req.apps);
							if (typeof type !== 'string') {
								throw('ContainerConfig.xhr.type should return a string');
							}
						}
						if (_config.xhr && _config.xhr.url) {
							url = _config.xhr.url(req.url, req.apps);
							if (typeof url !== 'string') {
								throw('ContainerConfig.xhr.url should return a string');
							}
						}

						// setup the default request function if an override is not present
						var requestFunc = _config.xhr;
						if (typeof requestFunc !== 'function') {
							requestFunc = function(url, appConfigs, successCallback, errorCallback, completeCallback) {
								jQuery.ajax({
									url: url,
									type: type,
									data: {
										params: F2.stringify(req.apps, F2.appConfigReplacer)
									},
									jsonp: false, // do not put 'callback=' in the query string
									jsonpCallback: jsonpCallback, // Unique function name
									dataType: dataType,
									success: successCallback,
									error: function(jqxhr, settings, exception) {
										F2.log('Failed to load app(s)', exception.toString(), req.apps);
										errorCallback();
									},
									complete: completeCallback
								});
							};
						}

						requestFunc(url, req.apps, successFunc, errorFunc, completeFunc);
					};

					manifestRequest(i, requests.pop());
				});
			}
		},
		/**
		 * Removes all apps from the container
		 * @method removeAllApps
		 */
		removeAllApps: function() {

			if (!_isInit()) {
				F2.log('F2.init() must be called before F2.removeAllApps()');
				return;
			}

			jQuery.each(_apps, function(i, a) {
				F2.removeApp(a.config.instanceId);
			});
		},
		/**
		 * Removes an app from the container
		 * @method removeApp
		 * @param {string} instanceId The app's instanceId
		 */
		removeApp: function(instanceId) {

			if (!_isInit()) {
				F2.log('F2.init() must be called before F2.removeApp()');
				return;
			}

			if (_apps[instanceId]) {				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_DESTROY_BEFORE,
					_apps[instanceId] // the app instance
				);
				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_DESTROY,
					_apps[instanceId] // the app instance
				);
				
				F2.AppHandlers.__trigger(
					_sAppHandlerToken,
					F2.Constants.AppHandlers.APP_DESTROY_AFTER,
					_apps[instanceId] // the app instance
				);				
				
				delete _apps[instanceId];
			}
		}
	};
})());
	
	exports.F2 = F2;

	if (typeof define !== 'undefined' && define.amd) {

		define(function() {
			return F2;
		});
		
	}

})(typeof exports !== 'undefined' ? exports : window);