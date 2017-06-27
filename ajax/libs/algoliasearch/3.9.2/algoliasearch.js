/*! algoliasearch 3.9.2 | © 2014, 2015 Algolia SAS | github.com/algolia/algoliasearch-client-js */
(function(f){var g;if(typeof window!=='undefined'){g=window}else if(typeof self!=='undefined'){g=self}g.ALGOLIA_MIGRATION_LAYER=f()})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = function load (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || function() {}

  script.type = opts.type || 'text/javascript'
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true
  script.src = src

  if (opts.attrs) {
    setAttributes(script, opts.attrs)
  }

  if (opts.text) {
    script.text = '' + opts.text
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
  onend(script, cb)

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script)
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null
    cb(null, script)
  }
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src), script)
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null
    cb(null, script) // there is no way to catch loading errors in IE8
  }
}

},{}],2:[function(require,module,exports){
'use strict';

// this module helps finding if the current page is using
// the cdn.jsdelivr.net/algoliasearch/latest/$BUILDNAME.min.js version

module.exports = isUsingLatest;

function isUsingLatest(buildName) {
  var toFind = new RegExp('cdn\\.jsdelivr\\.net/algoliasearch/latest/' +
    buildName.replace('.', '\\.') + // algoliasearch, algoliasearch.angular
    '(?:\\.min)?\\.js$'); // [.min].js

  var scripts = document.getElementsByTagName('script');
  var found = false;
  for (var currentScript = 0, nbScripts = scripts.length; currentScript < nbScripts; currentScript++) {
    if (scripts[currentScript].src && toFind.test(scripts[currentScript].src)) {
      found = true;
      break;
    }
  }

  return found;
}

},{}],3:[function(require,module,exports){
'use strict';

module.exports = loadV2;

function loadV2(buildName) {
  var loadScript = require(1);
  var v2ScriptUrl = '//cdn.jsdelivr.net/algoliasearch/2/' + buildName + '.min.js';

  var message = '-- AlgoliaSearch `latest` warning --\n' +
    'Warning, you are using the `latest` version string from jsDelivr to load the AlgoliaSearch library.\n' +
    'Using `latest` is no more recommended, you should load //cdn.jsdelivr.net/algoliasearch/2/algoliasearch.min.js\n\n' +
    'Also, we updated the AlgoliaSearch JavaScript client to V3. If you want to upgrade,\n' +
    'please read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' +
    '-- /AlgoliaSearch  `latest` warning --';

  if (window.console) {
    if (window.console.warn) {
      window.console.warn(message);
    } else if (window.console.log) {
      window.console.log(message);
    }
  }

  // If current script loaded asynchronously,
  // it will load the script with DOMElement
  // otherwise, it will load the script with document.write
  try {
    // why \x3c? http://stackoverflow.com/a/236106/147079
    document.write('\x3Cscript>window.ALGOLIA_SUPPORTS_DOCWRITE = true\x3C/script>');

    if (window.ALGOLIA_SUPPORTS_DOCWRITE === true) {
      document.write('\x3Cscript src="' + v2ScriptUrl + '">\x3C/script>');
      scriptLoaded('document.write')();
    } else {
      loadScript(v2ScriptUrl, scriptLoaded('DOMElement'));
    }
  } catch (e) {
    loadScript(v2ScriptUrl, scriptLoaded('DOMElement'));
  }
}

function scriptLoaded(method) {
  return function log() {
    var message = 'AlgoliaSearch: loaded V2 script using ' + method;

    if (window.console && window.console.log) {
      window.console.log(message);
    }
  };
}

},{"1":1}],4:[function(require,module,exports){
'use strict';

/* eslint no-unused-vars: [2, {"vars": "local"}] */

module.exports = oldGlobals;

// put old window.AlgoliaSearch.. into window. again so that
// users upgrading to V3 without changing their code, will be warned
function oldGlobals() {
  var message = '-- AlgoliaSearch V2 => V3 error --\n' +
    'You are trying to use a new version of the AlgoliaSearch JavaScript client with an old notation.\n' +
    'Please read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' +
    '-- /AlgoliaSearch V2 => V3 error --';

  window.AlgoliaSearch = function() {
    throw new Error(message);
  };

  window.AlgoliaSearchHelper = function() {
    throw new Error(message);
  };

  window.AlgoliaExplainResults = function() {
    throw new Error(message);
  };
}

},{}],5:[function(require,module,exports){
'use strict';

// This script will be browserified and prepended to the normal build
// directly in window, not wrapped in any module definition
// To avoid cases where we are loaded with /latest/ along with
migrationLayer("algoliasearch");

// Now onto the V2 related code:
//  If the client is using /latest/$BUILDNAME.min.js, load V2 of the library
//
//  Otherwise, setup a migration layer that will throw on old constructors like
//  new AlgoliaSearch().
//  So that users upgrading from v2 to v3 will have a clear information
//  message on what to do if they did not read the migration guide
function migrationLayer(buildName) {
  var isUsingLatest = require(2);
  var loadV2 = require(3);
  var oldGlobals = require(4);

  if (isUsingLatest(buildName)) {
    loadV2(buildName);
  } else {
    oldGlobals();
  }
}

},{"2":2,"3":3,"4":4}]},{},[5])(5)
});(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.algoliasearch = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
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
    clearTimeout(timeout);
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
        setTimeout(drainQueue, 0);
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
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

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],4:[function(require,module,exports){
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

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],5:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require(3);
exports.encode = exports.stringify = require(4);

},{"3":3,"4":4}],6:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require(7);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"7":7}],7:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require(8);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"8":8}],8:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  // long, short were "future reserved words in js", YUI compressor fail on them
  // https://github.com/algolia/algoliasearch-client-js/issues/113#issuecomment-111978606
  // https://github.com/yui/yuicompressor/issues/47
  // https://github.com/rauchg/ms.js/pull/40
  return options['long']
    ? _long(val)
    : _short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function _short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function _long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],9:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.0.2
 */

(function() {
    "use strict";
    function lib$es6$promise$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$es6$promise$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$es6$promise$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$es6$promise$utils$$_isArray;
    if (!Array.isArray) {
      lib$es6$promise$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$es6$promise$utils$$_isArray = Array.isArray;
    }

    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
    var lib$es6$promise$asap$$len = 0;
    var lib$es6$promise$asap$$toString = {}.toString;
    var lib$es6$promise$asap$$vertxNext;
    var lib$es6$promise$asap$$customSchedulerFn;

    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
      lib$es6$promise$asap$$len += 2;
      if (lib$es6$promise$asap$$len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (lib$es6$promise$asap$$customSchedulerFn) {
          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
        } else {
          lib$es6$promise$asap$$scheduleFlush();
        }
      }
    }

    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
    }

    function lib$es6$promise$asap$$setAsap(asapFn) {
      lib$es6$promise$asap$$asap = asapFn;
    }

    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$es6$promise$asap$$useNextTick() {
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // see https://github.com/cujojs/when/issues/410 for details
      return function() {
        process.nextTick(lib$es6$promise$asap$$flush);
      };
    }

    // vertx
    function lib$es6$promise$asap$$useVertxTimer() {
      return function() {
        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
      };
    }

    function lib$es6$promise$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$es6$promise$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$es6$promise$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$es6$promise$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$es6$promise$asap$$flush, 1);
      };
    }

    var lib$es6$promise$asap$$queue = new Array(1000);
    function lib$es6$promise$asap$$flush() {
      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
        var callback = lib$es6$promise$asap$$queue[i];
        var arg = lib$es6$promise$asap$$queue[i+1];

        callback(arg);

        lib$es6$promise$asap$$queue[i] = undefined;
        lib$es6$promise$asap$$queue[i+1] = undefined;
      }

      lib$es6$promise$asap$$len = 0;
    }

    function lib$es6$promise$asap$$attemptVertx() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$es6$promise$asap$$useVertxTimer();
      } catch(e) {
        return lib$es6$promise$asap$$useSetTimeout();
      }
    }

    var lib$es6$promise$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$es6$promise$asap$$isNode) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
    } else if (lib$es6$promise$asap$$isWorker) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
    } else {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
    }

    function lib$es6$promise$$internal$$noop() {}

    var lib$es6$promise$$internal$$PENDING   = void 0;
    var lib$es6$promise$$internal$$FULFILLED = 1;
    var lib$es6$promise$$internal$$REJECTED  = 2;

    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$selfFulfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function lib$es6$promise$$internal$$cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$es6$promise$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
        return lib$es6$promise$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
       lib$es6$promise$asap$$asap(function(promise) {
        var sealed = false;
        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$es6$promise$$internal$$resolve(promise, value);
          } else {
            lib$es6$promise$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$es6$promise$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$es6$promise$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, thenable._result);
      } else {
        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
      if (maybeThenable.constructor === promise.constructor) {
        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$es6$promise$utils$$isFunction(then)) {
          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$es6$promise$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
      } else {
        lib$es6$promise$$internal$$fulfill(promise, value);
      }
    }

    function lib$es6$promise$$internal$$publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      lib$es6$promise$$internal$$publish(promise);
    }

    function lib$es6$promise$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$es6$promise$$internal$$FULFILLED;

      if (promise._subscribers.length !== 0) {
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
      }
    }

    function lib$es6$promise$$internal$$reject(promise, reason) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
      promise._state = lib$es6$promise$$internal$$REJECTED;
      promise._result = reason;

      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
    }

    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onerror = null;

      subscribers[length] = child;
      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
      }
    }

    function lib$es6$promise$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$es6$promise$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$es6$promise$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$es6$promise$$internal$$reject(promise, error);
      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, value);
      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, value);
      }
    }

    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value){
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$es6$promise$$internal$$reject(promise, e);
      }
    }

    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
      var enumerator = this;

      enumerator._instanceConstructor = Constructor;
      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (enumerator._validateInput(input)) {
        enumerator._input     = input;
        enumerator.length     = input.length;
        enumerator._remaining = input.length;

        enumerator._init();

        if (enumerator.length === 0) {
          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
        } else {
          enumerator.length = enumerator.length || 0;
          enumerator._enumerate();
          if (enumerator._remaining === 0) {
            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
          }
        }
      } else {
        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
      }
    }

    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return lib$es6$promise$utils$$isArray(input);
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
      var enumerator = this;

      var length  = enumerator.length;
      var promise = enumerator.promise;
      var input   = enumerator._input;

      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        enumerator._eachEntry(input[i], i);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var enumerator = this;
      var c = enumerator._instanceConstructor;

      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
          entry._onerror = null;
          enumerator._settledAt(entry._state, i, entry._result);
        } else {
          enumerator._willSettleAt(c.resolve(entry), i);
        }
      } else {
        enumerator._remaining--;
        enumerator._result[i] = entry;
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var enumerator = this;
      var promise = enumerator.promise;

      if (promise._state === lib$es6$promise$$internal$$PENDING) {
        enumerator._remaining--;

        if (state === lib$es6$promise$$internal$$REJECTED) {
          lib$es6$promise$$internal$$reject(promise, value);
        } else {
          enumerator._result[i] = value;
        }
      }

      if (enumerator._remaining === 0) {
        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
      });
    };
    function lib$es6$promise$promise$all$$all(entries) {
      return new lib$es6$promise$enumerator$$default(this, entries).promise;
    }
    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
    function lib$es6$promise$promise$race$$race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (!lib$es6$promise$utils$$isArray(entries)) {
        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        lib$es6$promise$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        lib$es6$promise$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    }
    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
    function lib$es6$promise$promise$resolve$$resolve(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
    function lib$es6$promise$promise$reject$$reject(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

    var lib$es6$promise$promise$$counter = 0;

    function lib$es6$promise$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$es6$promise$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function lib$es6$promise$promise$$Promise(resolver) {
      this._id = lib$es6$promise$promise$$counter++;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if (lib$es6$promise$$internal$$noop !== resolver) {
        if (!lib$es6$promise$utils$$isFunction(resolver)) {
          lib$es6$promise$promise$$needsResolver();
        }

        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
          lib$es6$promise$promise$$needsNew();
        }

        lib$es6$promise$$internal$$initializePromise(this, resolver);
      }
    }

    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

    lib$es6$promise$promise$$Promise.prototype = {
      constructor: lib$es6$promise$promise$$Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
      then: function(onFulfillment, onRejection) {
        var parent = this;
        var state = parent._state;

        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
          return this;
        }

        var child = new this.constructor(lib$es6$promise$$internal$$noop);
        var result = parent._result;

        if (state) {
          var callback = arguments[state - 1];
          lib$es6$promise$asap$$asap(function(){
            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
      },

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection) {
        return this.then(null, onRejection);
      }
    };
    function lib$es6$promise$polyfill$$polyfill() {
      var local;

      if (typeof global !== 'undefined') {
          local = global;
      } else if (typeof self !== 'undefined') {
          local = self;
      } else {
          try {
              local = Function('return this')();
          } catch (e) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
          }
      }

      var P = local.Promise;

      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
        return;
      }

      local.Promise = lib$es6$promise$promise$$default;
    }
    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

    var lib$es6$promise$umd$$ES6Promise = {
      'Promise': lib$es6$promise$promise$$default,
      'polyfill': lib$es6$promise$polyfill$$default
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$es6$promise$umd$$ES6Promise; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
    }

    lib$es6$promise$polyfill$$default();
}).call(this);


}).call(this,require(2),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
var arrayEach = require(14),
    baseEach = require(18),
    createForEach = require(30);

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iteratee functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"14":14,"18":18,"30":30}],12:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],13:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],14:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],15:[function(require,module,exports){
var baseCopy = require(17),
    keys = require(53);

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"17":17,"53":53}],16:[function(require,module,exports){
var arrayCopy = require(13),
    arrayEach = require(14),
    baseAssign = require(15),
    baseForOwn = require(21),
    initCloneArray = require(33),
    initCloneByTag = require(34),
    initCloneObject = require(35),
    isArray = require(46),
    isObject = require(49);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseAssign(result, value);
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return its corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"13":13,"14":14,"15":15,"21":21,"33":33,"34":34,"35":35,"46":46,"49":49}],17:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],18:[function(require,module,exports){
var baseForOwn = require(21),
    createBaseEach = require(28);

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"21":21,"28":28}],19:[function(require,module,exports){
var createBaseFor = require(29);

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"29":29}],20:[function(require,module,exports){
var baseFor = require(19),
    keysIn = require(54);

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"19":19,"54":54}],21:[function(require,module,exports){
var baseFor = require(19),
    keys = require(53);

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"19":19,"53":53}],22:[function(require,module,exports){
var arrayEach = require(14),
    baseMergeDeep = require(23),
    isArray = require(46),
    isArrayLike = require(36),
    isObject = require(49),
    isObjectLike = require(40),
    isTypedArray = require(51),
    keys = require(53);

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

module.exports = baseMerge;

},{"14":14,"23":23,"36":36,"40":40,"46":46,"49":49,"51":51,"53":53}],23:[function(require,module,exports){
var arrayCopy = require(13),
    isArguments = require(45),
    isArray = require(46),
    isArrayLike = require(36),
    isPlainObject = require(50),
    isTypedArray = require(51),
    toPlainObject = require(52);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"13":13,"36":36,"45":45,"46":46,"50":50,"51":51,"52":52}],24:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],25:[function(require,module,exports){
var identity = require(56);

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"56":56}],26:[function(require,module,exports){
(function (global){
/** Native method references. */
var ArrayBuffer = global.ArrayBuffer,
    Uint8Array = global.Uint8Array;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  var result = new ArrayBuffer(buffer.byteLength),
      view = new Uint8Array(result);

  view.set(new Uint8Array(buffer));
  return result;
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],27:[function(require,module,exports){
var bindCallback = require(25),
    isIterateeCall = require(38),
    restParam = require(12);

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"12":12,"25":25,"38":38}],28:[function(require,module,exports){
var getLength = require(31),
    isLength = require(39),
    toObject = require(42);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"31":31,"39":39,"42":42}],29:[function(require,module,exports){
var toObject = require(42);

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"42":42}],30:[function(require,module,exports){
var bindCallback = require(25),
    isArray = require(46);

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

module.exports = createForEach;

},{"25":25,"46":46}],31:[function(require,module,exports){
var baseProperty = require(24);

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"24":24}],32:[function(require,module,exports){
var isNative = require(48);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"48":48}],33:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],34:[function(require,module,exports){
var bufferClone = require(26);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"26":26}],35:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],36:[function(require,module,exports){
var getLength = require(31),
    isLength = require(39);

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"31":31,"39":39}],37:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],38:[function(require,module,exports){
var isArrayLike = require(36),
    isIndex = require(37),
    isObject = require(49);

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"36":36,"37":37,"49":49}],39:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],40:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],41:[function(require,module,exports){
var isArguments = require(45),
    isArray = require(46),
    isIndex = require(37),
    isLength = require(39),
    keysIn = require(54);

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"37":37,"39":39,"45":45,"46":46,"54":54}],42:[function(require,module,exports){
var isObject = require(49);

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"49":49}],43:[function(require,module,exports){
var baseClone = require(16),
    bindCallback = require(25),
    isIterateeCall = require(38);

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it's
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  return typeof customizer == 'function'
    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3))
    : baseClone(value, isDeep);
}

module.exports = clone;

},{"16":16,"25":25,"38":38}],44:[function(require,module,exports){
var baseClone = require(16),
    bindCallback = require(25);

/**
 * Creates a deep clone of `value`. If `customizer` is provided it's invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with up to three argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var deep = _.cloneDeep(users);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.cloneDeep(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 20
 */
function cloneDeep(value, customizer, thisArg) {
  return typeof customizer == 'function'
    ? baseClone(value, true, bindCallback(customizer, thisArg, 3))
    : baseClone(value, true);
}

module.exports = cloneDeep;

},{"16":16,"25":25}],45:[function(require,module,exports){
var isArrayLike = require(36),
    isObjectLike = require(40);

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"36":36,"40":40}],46:[function(require,module,exports){
var getNative = require(32),
    isLength = require(39),
    isObjectLike = require(40);

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"32":32,"39":39,"40":40}],47:[function(require,module,exports){
var isObject = require(49);

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"49":49}],48:[function(require,module,exports){
var isFunction = require(47),
    isObjectLike = require(40);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"40":40,"47":47}],49:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],50:[function(require,module,exports){
var baseForIn = require(20),
    isArguments = require(45),
    isObjectLike = require(40);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"20":20,"40":40,"45":45}],51:[function(require,module,exports){
var isLength = require(39),
    isObjectLike = require(40);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"39":39,"40":40}],52:[function(require,module,exports){
var baseCopy = require(17),
    keysIn = require(54);

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"17":17,"54":54}],53:[function(require,module,exports){
var getNative = require(32),
    isArrayLike = require(36),
    isObject = require(49),
    shimKeys = require(41);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"32":32,"36":36,"41":41,"49":49}],54:[function(require,module,exports){
var isArguments = require(45),
    isArray = require(46),
    isIndex = require(37),
    isLength = require(39),
    isObject = require(49);

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"37":37,"39":39,"45":45,"46":46,"49":49}],55:[function(require,module,exports){
var baseMerge = require(22),
    createAssigner = require(27);

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it's invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"22":22,"27":27}],56:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],57:[function(require,module,exports){
'use strict';

module.exports = AlgoliaSearch;

var process = process || undefined;
// default debug activated in dev environments
// this is triggered in package.json, using the envify transform
if (process && process.env && "production" === 'development') {
  require(6).enable('algoliasearch*');
}

var errors = require(63);

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='http:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'https:' to force using https.
 *                                        Default to document.location.protocol in browsers
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearch(applicationID, apiKey, opts) {
  var debug = require(6)('algoliasearch');

  var clone = require(43);
  var isArray = require(46);

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (!applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (!apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  var defaultHosts = [
    this.applicationID + '-1.algolianet.com',
    this.applicationID + '-2.algolianet.com',
    this.applicationID + '-3.algolianet.com'
  ];
  this.hosts = {
    read: [],
    write: []
  };

  this.hostIndex = {
    read: 0,
    write: 0
  };

  opts = opts || {};

  var protocol = opts.protocol || 'https:';
  var timeout = opts.timeout === undefined ? 2000 : opts.timeout;

  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  // no hosts given, add defaults
  if (!opts.hosts) {
    this.hosts.read = [this.applicationID + '-dsn.algolia.net'].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));
  this.requestTimeout = timeout;

  this.extraHeaders = [];
  this.cache = {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined ? true : opts._useCache;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

AlgoliaSearch.prototype = {
  /*
   * Delete an index
   *
   * @param indexName the name of index to delete
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  deleteIndex: function(indexName, callback) {
    return this._jsonRequest({
      method: 'DELETE',
      url: '/1/indexes/' + encodeURIComponent(indexName),
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Move an existing index.
   * @param srcIndexName the name of index to copy.
   * @param dstIndexName the new index name that will contains a copy of
   * srcIndexName (destination will be overriten if it already exist).
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  moveIndex: function(srcIndexName, dstIndexName, callback) {
    var postObj = {
      operation: 'move', destination: dstIndexName
    };
    return this._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Copy an existing index.
   * @param srcIndexName the name of index to copy.
   * @param dstIndexName the new index name that will contains a copy
   * of srcIndexName (destination will be overriten if it already exist).
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  copyIndex: function(srcIndexName, dstIndexName, callback) {
    var postObj = {
      operation: 'copy', destination: dstIndexName
    };
    return this._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Return last log entries.
   * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
   * @param length Specify the maximum number of entries to retrieve starting
   * at offset. Maximum allowed value: 1000.
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  getLogs: function(offset, length, callback) {
    if (arguments.length === 0 || typeof offset === 'function') {
      // getLogs([cb])
      callback = offset;
      offset = 0;
      length = 10;
    } else if (arguments.length === 1 || typeof length === 'function') {
      // getLogs(1, [cb)]
      callback = length;
      length = 10;
    }

    return this._jsonRequest({
      method: 'GET',
      url: '/1/logs?offset=' + offset + '&length=' + length,
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * List all existing indexes (paginated)
   *
   * @param page The page to retrieve, starting at 0.
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with index list
   */
  listIndexes: function(page, callback) {
    var params = '';

    if (page === undefined || typeof page === 'function') {
      callback = page;
    } else {
      params = '?page=' + page;
    }

    return this._jsonRequest({
      method: 'GET',
      url: '/1/indexes' + params,
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Get the index object initialized
   *
   * @param indexName the name of index
   * @param callback the result callback with one argument (the Index instance)
   */
  initIndex: function(indexName) {
    return new this.Index(this, indexName);
  },
  /*
   * List all existing user keys with their associated ACLs
   *
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  listUserKeys: function(callback) {
    return this._jsonRequest({
      method: 'GET',
      url: '/1/keys',
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Get ACL of a user key
   *
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  getUserKeyACL: function(key, callback) {
    return this._jsonRequest({
      method: 'GET',
      url: '/1/keys/' + key,
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Delete an existing user key
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  deleteUserKey: function(key, callback) {
    return this._jsonRequest({
      method: 'DELETE',
      url: '/1/keys/' + key,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Add a new global API key
   *
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string[]} params.indexes - Allowed targeted indexes for this key
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * client.addUserKey(['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   indexes: ['fruits'],
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#AddKey|Algolia REST API Documentation}
   */
  addUserKey: function(acls, params, callback) {
    var isArray = require(46);
    var usage = 'Usage: client.addUserKey(arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 1 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var postObj = {
      acl: acls
    };

    if (params) {
      postObj.validity = params.validity;
      postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      postObj.maxHitsPerQuery = params.maxHitsPerQuery;
      postObj.indexes = params.indexes;
      postObj.description = params.description;

      if (params.queryParameters) {
        postObj.queryParameters = this._getSearchParams(params.queryParameters, '');
      }

      postObj.referers = params.referers;
    }

    return this._jsonRequest({
      method: 'POST',
      url: '/1/keys',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Add a new global API key
   * @deprecated Please use client.addUserKey()
   */
  addUserKeyWithValidity: deprecate(function(acls, params, callback) {
    return this.addUserKey(acls, params, callback);
  }, deprecatedMessage('client.addUserKeyWithValidity()', 'client.addUserKey()')),

  /**
   * Update an existing API key
   * @param {string} key - The key to update
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string[]} params.indexes - Allowed targeted indexes for this key
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * client.updateUserKey('APIKEY', ['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   indexes: ['fruits'],
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
   */
  updateUserKey: function(key, acls, params, callback) {
    var isArray = require(46);
    var usage = 'Usage: client.updateUserKey(key, arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 2 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var putObj = {
      acl: acls
    };

    if (params) {
      putObj.validity = params.validity;
      putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      putObj.maxHitsPerQuery = params.maxHitsPerQuery;
      putObj.indexes = params.indexes;
      putObj.description = params.description;

      if (params.queryParameters) {
        putObj.queryParameters = this._getSearchParams(params.queryParameters, '');
      }

      putObj.referers = params.referers;
    }

    return this._jsonRequest({
      method: 'PUT',
      url: '/1/keys/' + key,
      body: putObj,
      hostType: 'write',
      callback: callback
    });
  },

  /**
   * Set the extra security tagFilters header
   * @param {string|array} tags The list of tags defining the current security filters
   */
  setSecurityTags: function(tags) {
    if (Object.prototype.toString.call(tags) === '[object Array]') {
      var strTags = [];
      for (var i = 0; i < tags.length; ++i) {
        if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
          var oredTags = [];
          for (var j = 0; j < tags[i].length; ++j) {
            oredTags.push(tags[i][j]);
          }
          strTags.push('(' + oredTags.join(',') + ')');
        } else {
          strTags.push(tags[i]);
        }
      }
      tags = strTags.join(',');
    }

    this.securityTags = tags;
  },

  /**
   * Set the extra user token header
   * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
   */
  setUserToken: function(userToken) {
    this.userToken = userToken;
  },

  /**
   * Initialize a new batch of search queries
   * @deprecated use client.search()
   */
  startQueriesBatch: deprecate(function startQueriesBatchDeprecated() {
    this._batch = [];
  }, deprecatedMessage('client.startQueriesBatch()', 'client.search()')),

  /**
   * Add a search query in the batch
   * @deprecated use client.search()
   */
  addQueryInBatch: deprecate(function addQueryInBatchDeprecated(indexName, query, args) {
    this._batch.push({
      indexName: indexName,
      query: query,
      params: args
    });
  }, deprecatedMessage('client.addQueryInBatch()', 'client.search()')),

  /**
   * Clear all queries in client's cache
   * @return undefined
   */
  clearCache: function() {
    this.cache = {};
  },

  /**
   * Launch the batch of queries using XMLHttpRequest.
   * @deprecated use client.search()
   */
  sendQueriesBatch: deprecate(function sendQueriesBatchDeprecated(callback) {
    return this.search(this._batch, callback);
  }, deprecatedMessage('client.sendQueriesBatch()', 'client.search()')),

  /**
  * Set the number of milliseconds a request can take before automatically being terminated.
  *
  * @param {Number} milliseconds
  */
  setRequestTimeout: function(milliseconds) {
    if (milliseconds) {
      this.requestTimeout = parseInt(milliseconds, 10);
    }
  },

  /**
   * Search through multiple indices at the same time
   * @param  {Object[]}   queries  An array of queries you want to run.
   * @param {string} queries[].indexName The index name you want to target
   * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
   * @param {Object} queries[].params Any search param like hitsPerPage, ..
   * @param  {Function} callback Callback to be called
   * @return {Promise|undefined} Returns a promise if no callback given
   */
  search: function(queries, callback) {
    var isArray = require(46);
    var usage = 'Usage: client.search(arrayOfQueries[, callback])';

    if (!isArray(queries)) {
      throw new Error(usage);
    }

    var client = this;

    var postObj = {
      requests: map(queries, function prepareRequest(query) {
        var params = '';

        // allow query.query
        // so we are mimicing the index.search(query, params) method
        // {indexName:, query:, params:}
        if (query.query !== undefined) {
          params += 'query=' + encodeURIComponent(query.query);
        }

        return {
          indexName: query.indexName,
          params: client._getSearchParams(query.params, params)
        };
      })
    };

    return this._jsonRequest({
      cache: this.cache,
      method: 'POST',
      url: '/1/indexes/*/queries',
      body: postObj,
      hostType: 'read',
      callback: callback
    });
  },

  /**
   * Perform write operations accross multiple indexes.
   *
   * To reduce the amount of time spent on network round trips,
   * you can create, update, or delete several objects in one call,
   * using the batch endpoint (all operations are done in the given order).
   *
   * Available actions:
   *   - addObject
   *   - updateObject
   *   - partialUpdateObject
   *   - partialUpdateObjectNoCreate
   *   - deleteObject
   *
   * https://www.algolia.com/doc/rest_api#Indexes
   * @param  {Object[]} operations An array of operations to perform
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * client.batch([{
   *   action: 'addObject',
   *   indexName: 'clients',
   *   body: {
   *     name: 'Bill'
   *   }
   * }, {
   *   action: 'udpateObject',
   *   indexName: 'fruits',
   *   body: {
   *     objectID: '29138',
   *     name: 'banana'
   *   }
   * }], cb)
   */
  batch: function(operations, callback) {
    var isArray = require(46);
    var usage = 'Usage: client.batch(operations[, callback])';

    if (!isArray(operations)) {
      throw new Error(usage);
    }

    return this._jsonRequest({
      method: 'POST',
      url: '/1/indexes/*/batch',
      body: {
        requests: operations
      },
      hostType: 'write',
      callback: callback
    });
  },

  // environment specific methods
  destroy: notImplemented,
  enableRateLimitForward: notImplemented,
  disableRateLimitForward: notImplemented,
  useSecuredAPIKey: notImplemented,
  disableSecuredAPIKey: notImplemented,
  generateSecuredApiKey: notImplemented,
  /*
   * Index class constructor.
   * You should not use this method directly but use initIndex() function
   */
  Index: function(algoliasearch, indexName) {
    this.indexName = indexName;
    this.as = algoliasearch;
    this.typeAheadArgs = null;
    this.typeAheadValueOption = null;

    // make sure every index instance has it's own cache
    this.cache = {};
  },
  /**
  * Add an extra field to the HTTP request
  *
  * @param name the header field name
  * @param value the header field value
  */
  setExtraHeader: function(name, value) {
    this.extraHeaders.push({
      name: name.toLowerCase(), value: value
    });
  },

  /**
  * Augment sent x-algolia-agent with more data, each agent part
  * is automatically separated from the others by a semicolon;
  *
  * @param algoliaAgent the agent to add
  */
  addAlgoliaAgent: function(algoliaAgent) {
    this._ua += ';' + algoliaAgent;
  },

  _sendQueriesBatch: function(params, callback) {
    function prepareParams() {
      var reqParams = '';
      for (var i = 0; i < params.requests.length; ++i) {
        var q = '/1/indexes/' +
          encodeURIComponent(params.requests[i].indexName) +
          '?' + params.requests[i].params;
        reqParams += i + '=' + encodeURIComponent(q) + '&';
      }
      return reqParams;
    }

    return this._jsonRequest({
      cache: this.cache,
      method: 'POST',
      url: '/1/indexes/*/queries',
      body: params,
      hostType: 'read',
      fallback: {
        method: 'GET',
        url: '/1/indexes/*',
        body: {
          params: prepareParams()
        }
      },
      callback: callback
    });
  },
  /*
   * Wrapper that try all hosts to maximize the quality of service
   */
  _jsonRequest: function(opts) {
    var requestDebug = require(6)('algoliasearch:' + opts.url);

    var body;
    var cache = opts.cache;
    var client = this;
    var tries = 0;
    var usingFallback = false;

    if (opts.body !== undefined) {
      body = safeJSONStringify(opts.body);
    }

    requestDebug('request start');

    function doRequest(requester, reqOpts) {
      var cacheID;

      if (client._useCache) {
        cacheID = opts.url;
      }

      // as we sometime use POST requests to pass parameters (like query='aa'),
      // the cacheID must also include the body to be different between calls
      if (client._useCache && body) {
        cacheID += '_body_' + reqOpts.body;
      }

      // handle cache existence
      if (client._useCache && cache && cache[cacheID] !== undefined) {
        requestDebug('serving response from cache');
        return client._promise.resolve(JSON.parse(cache[cacheID]));
      }

      // if we reached max tries
      if (tries >= client.hosts[opts.hostType].length ||
        // or we need to switch to fallback
        client.useFallback && !usingFallback) {
        // and there's no fallback or we are already using a fallback
        if (!opts.fallback || !client._request.fallback || usingFallback) {
          requestDebug('could not get any response');
          // then stop
          return client._promise.reject(new errors.AlgoliaSearchError(
            'Cannot connect to the AlgoliaSearch API.' +
            ' Send an email to support@algolia.com to report and resolve the issue.' +
            ' Application id was: ' + client.applicationID
          ));
        }

        requestDebug('switching to fallback');

        // let's try the fallback starting from here
        tries = 0;

        // method, url and body are fallback dependent
        reqOpts.method = opts.fallback.method;
        reqOpts.url = opts.fallback.url;
        reqOpts.jsonBody = opts.fallback.body;
        if (reqOpts.jsonBody) {
          reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
        }

        reqOpts.timeout = client.requestTimeout * (tries + 1);
        client.hostIndex[opts.hostType] = 0;
        usingFallback = true; // the current request is now using fallback
        return doRequest(client._request.fallback, reqOpts);
      }

      var url = client.hosts[opts.hostType][client.hostIndex[opts.hostType]] + reqOpts.url;
      var options = {
        body: body,
        jsonBody: opts.body,
        method: reqOpts.method,
        headers: client._computeRequestHeaders(),
        timeout: reqOpts.timeout,
        debug: requestDebug
      };

      requestDebug('method: %s, url: %s, headers: %j, timeout: %d',
        options.method, url, options.headers, options.timeout);

      if (requester === client._request.fallback) {
        requestDebug('using fallback');
      }

      // `requester` is any of this._request or this._request.fallback
      // thus it needs to be called using the client as context
      return requester.call(client, url, options).then(success, tryFallback);

      function success(httpResponse) {
        // compute the status of the response,
        //
        // When in browser mode, using XDR or JSONP, we have no statusCode available
        // So we rely on our API response `status` property.
        // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
        // So we check if there's a `message` along `status` and it means it's an error
        //
        // That's the only case where we have a response.status that's not the http statusCode
        var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

          // this is important to check the request statusCode AFTER the body eventual
          // statusCode because some implementations (jQuery XDomainRequest transport) may
          // send statusCode 200 while we had an error
          httpResponse.statusCode ||

          // When in browser mode, using XDR or JSONP
          // we default to success when no error (no response.status && response.message)
          // If there was a JSON.parse() error then body is null and it fails
          httpResponse && httpResponse.body && 200;

        requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
          httpResponse.statusCode, status, httpResponse.headers);

        if (process && process.env.DEBUG && process.env.DEBUG.indexOf('debugBody') !== -1) {
          requestDebug('body: %j', httpResponse.body);
        }

        var ok = status === 200 || status === 201;
        var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;

        if (client._useCache && ok && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        if (ok) {
          return httpResponse.body;
        }

        if (retry) {
          tries += 1;
          return retryRequest();
        }

        var unrecoverableError = new errors.AlgoliaSearchError(
          httpResponse.body && httpResponse.body.message
        );

        return client._promise.reject(unrecoverableError);
      }

      function tryFallback(err) {
        // error cases:
        //  While not in fallback mode:
        //    - CORS not supported
        //    - network error
        //  While in fallback mode:
        //    - timeout
        //    - network error
        //    - badly formatted JSONP (script loaded, did not call our callback)
        //  In both cases:
        //    - uncaught exception occurs (TypeError)
        requestDebug('error: %s, stack: %s', err.message, err.stack);

        if (!(err instanceof errors.AlgoliaSearchError)) {
          err = new errors.Unknown(err && err.message, err);
        }

        tries += 1;

        // stop the request implementation when:
        if (
          // we did not generate this error,
          // it comes from a throw in some other piece of code
          err instanceof errors.Unknown ||

          // server sent unparsable JSON
          err instanceof errors.UnparsableJSON ||

          // max tries and already using fallback or no fallback
          tries >= client.hosts[opts.hostType].length &&
          (usingFallback || !opts.fallback || !client._request.fallback)) {
          // stop request implementation for this command
          return client._promise.reject(err);
        }

        client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;

        if (err instanceof errors.RequestTimeout) {
          return retryRequest();
        } else if (client._request.fallback && !client.useFallback) {
          // if any error occured but timeout, use fallback for the rest
          // of the session
          client.useFallback = true;
        }

        return doRequest(requester, reqOpts);
      }

      function retryRequest() {
        client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;
        reqOpts.timeout = client.requestTimeout * (tries + 1);
        return doRequest(requester, reqOpts);
      }
    }

    // we can use a fallback if forced AND fallback parameters are available
    var useFallback = client.useFallback && opts.fallback;
    var requestOptions = useFallback ? opts.fallback : opts;

    var promise = doRequest(
      // set the requester
      useFallback ? client._request.fallback : client._request, {
        url: requestOptions.url,
        method: requestOptions.method,
        body: body,
        jsonBody: opts.body,
        timeout: client.requestTimeout * (tries + 1)
      }
    );

    // either we have a callback
    // either we are using promises
    if (opts.callback) {
      promise.then(function okCb(content) {
        exitPromise(function() {
          opts.callback(null, content);
        }, client._setTimeout || setTimeout);
      }, function nookCb(err) {
        exitPromise(function() {
          opts.callback(err);
        }, client._setTimeout || setTimeout);
      });
    } else {
      return promise;
    }
  },

  /*
  * Transform search param object in query string
  */
  _getSearchParams: function(args, params) {
    if (this._isUndefined(args) || args === null) {
      return params;
    }
    for (var key in args) {
      if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
        params += params === '' ? '' : '&';
        params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
      }
    }
    return params;
  },

  _isUndefined: function(obj) {
    return obj === void 0;
  },

  _computeRequestHeaders: function() {
    var forEach = require(11);

    var requestHeaders = {
      'x-algolia-api-key': this.apiKey,
      'x-algolia-application-id': this.applicationID,
      'x-algolia-agent': this._ua
    };

    if (this.userToken) {
      requestHeaders['x-algolia-usertoken'] = this.userToken;
    }

    if (this.securityTags) {
      requestHeaders['x-algolia-tagfilters'] = this.securityTags;
    }

    if (this.extraHeaders) {
      forEach(this.extraHeaders, function addToRequestHeaders(header) {
        requestHeaders[header.name] = header.value;
      });
    }

    return requestHeaders;
  }
};

/*
 * Contains all the functions related to one index
 * You should use AlgoliaSearch.initIndex(indexName) to retrieve this object
 */
AlgoliaSearch.prototype.Index.prototype = {
  /*
   * Clear all queries in cache
   */
  clearCache: function() {
    this.cache = {};
  },
  /*
   * Add an object in this index
   *
   * @param content contains the javascript object to add inside the index
   * @param objectID (optional) an objectID you want to attribute to this object
   * (if the attribute already exist the old object will be overwrite)
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
   */
  addObject: function(content, objectID, callback) {
    var indexObj = this;

    if (arguments.length === 1 || typeof objectID === 'function') {
      callback = objectID;
      objectID = undefined;
    }

    return this.as._jsonRequest({
      method: objectID !== undefined ?
        'PUT' : // update or create
        'POST', // create (API generates an objectID)
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + // create
        (objectID !== undefined ? '/' + encodeURIComponent(objectID) : ''), // update or create
      body: content,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Add several objects
   *
   * @param objects contains an array of objects to add
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that updateAt and taskID
   */
  addObjects: function(objects, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.addObjects(arrayOfObjects[, callback])';

    if (!isArray(objects)) {
      throw new Error(usage);
    }

    var indexObj = this;
    var postObj = {
      requests: []
    };
    for (var i = 0; i < objects.length; ++i) {
      var request = {
        action: 'addObject',
        body: objects[i]
      };
      postObj.requests.push(request);
    }
    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Get an object from this index
   *
   * @param objectID the unique identifier of the object to retrieve
   * @param attrs (optional) if set, contains the array of attribute names to retrieve
   * @param callback (optional) the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the object to retrieve or the error message if a failure occured
   */
  getObject: function(objectID, attrs, callback) {
    var indexObj = this;

    if (arguments.length === 1 || typeof attrs === 'function') {
      callback = attrs;
      attrs = undefined;
    }

    var params = '';
    if (attrs !== undefined) {
      params = '?attributes=';
      for (var i = 0; i < attrs.length; ++i) {
        if (i !== 0) {
          params += ',';
        }
        params += attrs[i];
      }
    }

    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Get several objects from this index
   *
   * @param objectIDs the array of unique identifier of objects to retrieve
   */
  getObjects: function(objectIDs, attributesToRetrieve, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

    if (!isArray(objectIDs)) {
      throw new Error(usage);
    }

    var indexObj = this;

    if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
      callback = attributesToRetrieve;
      attributesToRetrieve = undefined;
    }

    var body = {
      requests: map(objectIDs, function prepareRequest(objectID) {
        var request = {
          indexName: indexObj.indexName,
          objectID: objectID
        };

        if (attributesToRetrieve) {
          request.attributesToRetrieve = attributesToRetrieve.join(',');
        }

        return request;
      })
    };

    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/*/objects',
      hostType: 'read',
      body: body,
      callback: callback
    });
  },

  /*
   * Update partially an object (only update attributes passed in argument)
   *
   * @param partialObject contains the javascript attributes to override, the
   *  object must contains an objectID attribute
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
   */
  partialUpdateObject: function(partialObject, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial',
      body: partialObject,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Partially Override the content of several objects
   *
   * @param objects contains an array of objects to update (each object must contains a objectID attribute)
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that updateAt and taskID
   */
  partialUpdateObjects: function(objects, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.partialUpdateObjects(arrayOfObjects[, callback])';

    if (!isArray(objects)) {
      throw new Error(usage);
    }

    var indexObj = this;
    var postObj = {
      requests: []
    };
    for (var i = 0; i < objects.length; ++i) {
      var request = {
        action: 'partialUpdateObject',
        objectID: objects[i].objectID,
        body: objects[i]
      };
      postObj.requests.push(request);
    }
    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Override the content of object
   *
   * @param object contains the javascript object to save, the object must contains an objectID attribute
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that updateAt and taskID
   */
  saveObject: function(object, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'PUT',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
      body: object,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Override the content of several objects
   *
   * @param objects contains an array of objects to update (each object must contains a objectID attribute)
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that updateAt and taskID
   */
  saveObjects: function(objects, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.saveObjects(arrayOfObjects[, callback])';

    if (!isArray(objects)) {
      throw new Error(usage);
    }

    var indexObj = this;
    var postObj = {
      requests: []
    };
    for (var i = 0; i < objects.length; ++i) {
      var request = {
        action: 'updateObject',
        objectID: objects[i].objectID,
        body: objects[i]
      };
      postObj.requests.push(request);
    }
    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Delete an object from the index
   *
   * @param objectID the unique identifier of object to delete
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
   */
  deleteObject: function(objectID, callback) {
    if (typeof objectID === 'function' || typeof objectID !== 'string' && typeof objectID !== 'number') {
      var err = new errors.AlgoliaSearchError('Cannot delete an object without an objectID');
      callback = objectID;
      if (typeof callback === 'function') {
        return callback(err);
      }

      return this.as._promise.reject(err);
    }

    var indexObj = this;
    return this.as._jsonRequest({
      method: 'DELETE',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Delete several objects from an index
   *
   * @param objectIDs contains an array of objectID to delete
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
   */
  deleteObjects: function(objectIDs, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.deleteObjects(arrayOfObjectIDs[, callback])';

    if (!isArray(objectIDs)) {
      throw new Error(usage);
    }

    var indexObj = this;
    var postObj = {
      requests: map(objectIDs, function prepareRequest(objectID) {
        return {
          action: 'deleteObject',
          objectID: objectID,
          body: {
            objectID: objectID
          }
        };
      })
    };

    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Delete all objects matching a query
   *
   * @param query the query string
   * @param params the optional query parameters
   * @param callback (optional) the result callback called with one argument
   *  error: null or Error('message')
   */
  deleteByQuery: function(query, params, callback) {
    var clone = require(43);

    var indexObj = this;
    var client = indexObj.as;

    if (arguments.length === 1 || typeof params === 'function') {
      callback = params;
      params = {};
    } else {
      params = clone(params);
    }

    params.attributesToRetrieve = 'objectID';
    params.hitsPerPage = 1000;
    params.distinct = false;

    // when deleting, we should never use cache to get the
    // search results
    this.clearCache();

    // there's a problem in how we use the promise chain,
    // see how waitTask is done
    var promise = this
      .search(query, params)
      .then(stopOrDelete);

    function stopOrDelete(searchContent) {
      // stop here
      if (searchContent.nbHits === 0) {
        // return indexObj.as._request.resolve();
        return searchContent;
      }

      // continue and do a recursive call
      var objectIDs = map(searchContent.hits, function getObjectID(object) {
        return object.objectID;
      });

      return indexObj
        .deleteObjects(objectIDs)
        .then(waitTask)
        .then(doDeleteByQuery);
    }

    function waitTask(deleteObjectsContent) {
      return indexObj.waitTask(deleteObjectsContent.taskID);
    }

    function doDeleteByQuery() {
      return indexObj.deleteByQuery(query, params);
    }

    if (!callback) {
      return promise;
    }

    promise.then(success, failure);

    function success() {
      exitPromise(function exit() {
        callback(null);
      }, client._setTimeout || setTimeout);
    }

    function failure(err) {
      exitPromise(function exit() {
        callback(err);
      }, client._setTimeout || setTimeout);
    }
  },

  /*
   * Search inside the index using XMLHttpRequest request (Using a POST query to
   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
   *
   * @param query the full text query
   * @param args (optional) if set, contains an object with query parameters:
   * - page: (integer) Pagination parameter used to select the page to retrieve.
   *                   Page is zero-based and defaults to 0. Thus,
   *                   to retrieve the 10th page you need to set page=9
   * - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
   * - attributesToRetrieve: a string that contains the list of object attributes
   * you want to retrieve (let you minimize the answer size).
   *   Attributes are separated with a comma (for example "name,address").
   *   You can also use an array (for example ["name","address"]).
   *   By default, all attributes are retrieved. You can also use '*' to retrieve all
   *   values when an attributesToRetrieve setting is specified for your index.
   * - attributesToHighlight: a string that contains the list of attributes you
   *   want to highlight according to the query.
   *   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
   *   If an attribute has no match for the query, the raw value is returned.
   *   By default all indexed text attributes are highlighted.
   *   You can use `*` if you want to highlight all textual attributes.
   *   Numerical attributes are not highlighted.
   *   A matchLevel is returned for each highlighted attribute and can contain:
   *      - full: if all the query terms were found in the attribute,
   *      - partial: if only some of the query terms were found,
   *      - none: if none of the query terms were found.
   * - attributesToSnippet: a string that contains the list of attributes to snippet alongside
   * the number of words to return (syntax is `attributeName:nbWords`).
   *    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
   *    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
   *    By default no snippet is computed.
   * - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
   * Defaults to 3.
   * - minWordSizefor2Typos: the minimum number of characters in a query word
   * to accept two typos in this word. Defaults to 7.
   * - getRankingInfo: if set to 1, the result hits will contain ranking
   * information in _rankingInfo attribute.
   * - aroundLatLng: search for entries around a given
   * latitude/longitude (specified as two floats separated by a comma).
   *   For example aroundLatLng=47.316669,5.016670).
   *   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
   *   and the precision for ranking with aroundPrecision
   *   (for example if you set aroundPrecision=100, two objects that are distant of
   *   less than 100m will be considered as identical for "geo" ranking parameter).
   *   At indexing, you should specify geoloc of an object with the _geoloc attribute
   *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
   * - insideBoundingBox: search entries inside a given area defined by the two extreme points
   * of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
   *   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
   *   At indexing, you should specify geoloc of an object with the _geoloc attribute
   *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
   * - numericFilters: a string that contains the list of numeric filters you want to
   * apply separated by a comma.
   *   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
   *   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
   *   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
   *   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
   * - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
   *   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
   *   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
   *   means tag1 AND (tag2 OR tag3).
   *   At indexing, tags should be added in the _tags** attribute
   *   of objects (for example {"_tags":["tag1","tag2"]}).
   * - facetFilters: filter the query by a list of facets.
   *   Facets are separated by commas and each facet is encoded as `attributeName:value`.
   *   For example: `facetFilters=category:Book,author:John%20Doe`.
   *   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
   * - facets: List of object attributes that you want to use for faceting.
   *   Comma separated list: `"category,author"` or array `['category','author']`
   *   Only attributes that have been added in **attributesForFaceting** index setting
   *   can be used in this parameter.
   *   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
   * - queryType: select how the query words are interpreted, it can be one of the following value:
   *    - prefixAll: all query words are interpreted as prefixes,
   *    - prefixLast: only the last word is interpreted as a prefix (default behavior),
   *    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
   * - optionalWords: a string that contains the list of words that should
   * be considered as optional when found in the query.
   *   Comma separated and array are accepted.
   * - distinct: If set to 1, enable the distinct feature (disabled by default)
   * if the attributeForDistinct index setting is set.
   *   This feature is similar to the SQL "distinct" keyword: when enabled
   *   in a query with the distinct=1 parameter,
   *   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
   *   For example, if the chosen attribute is show_name and several hits have
   *   the same value for show_name, then only the best
   *   one is kept and others are removed.
   * - restrictSearchableAttributes: List of attributes you want to use for
   * textual search (must be a subset of the attributesToIndex index setting)
   * either comma separated or as an array
   * @param callback the result callback called with two arguments:
   *  error: null or Error('message'). If false, the content contains the error.
   *  content: the server answer that contains the list of results.
   */
  search: buildSearchMethod('query'),

  /*
   * -- BETA --
   * Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
   *
   * @param query the similar query
   * @param args (optional) if set, contains an object with query parameters.
   *   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
   *   are the two most useful to restrict the similar results and get more relevant content
   */
  similarSearch: buildSearchMethod('similarQuery'),

  /*
   * Browse index content. The response content will have a `cursor` property that you can use
   * to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
   *
   * @param {string} query - The full text query
   * @param {Object} [queryParameters] - Any search query parameter
   * @param {Function} [callback] - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with the browse result
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * index.browse('cool songs', {
   *   tagFilters: 'public,comments',
   *   hitsPerPage: 500
   * }, callback);
   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
   */
  // pre 3.5.0 usage, backward compatible
  // browse: function(page, hitsPerPage, callback) {
  browse: function(query, queryParameters, callback) {
    var merge = require(55);

    var indexObj = this;

    var page;
    var hitsPerPage;

    // we check variadic calls that are not the one defined
    // .browse()/.browse(fn)
    // => page = 0
    if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
      page = 0;
      callback = arguments[0];
      query = undefined;
    } else if (typeof arguments[0] === 'number') {
      // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
      page = arguments[0];
      if (typeof arguments[1] === 'number') {
        hitsPerPage = arguments[1];
      } else if (typeof arguments[1] === 'function') {
        callback = arguments[1];
        hitsPerPage = undefined;
      }
      query = undefined;
      queryParameters = undefined;
    } else if (typeof arguments[0] === 'object') {
      // .browse(queryParameters)/.browse(queryParameters, cb)
      if (typeof arguments[1] === 'function') {
        callback = arguments[1];
      }
      queryParameters = arguments[0];
      query = undefined;
    } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
      // .browse(query, cb)
      callback = arguments[1];
      queryParameters = undefined;
    }

    // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

    // get search query parameters combining various possible calls
    // to .browse();
    queryParameters = merge({}, queryParameters || {}, {
      page: page,
      hitsPerPage: hitsPerPage,
      query: query
    });

    var params = this.as._getSearchParams(queryParameters, '');

    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse?' + params,
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
   *
   * @param {string} query - The full text query
   * @param {Object} [queryParameters] - Any search query parameter
   * @param {Function} [callback] - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with the browse result
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * index.browseFrom('14lkfsakl32', callback);
   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
   */
  browseFrom: function(cursor, callback) {
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse?cursor=' + encodeURIComponent(cursor),
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Browse all content from an index using events. Basically this will do
   * .browse() -> .browseFrom -> .browseFrom -> .. until all the results are returned
   *
   * @param {string} query - The full text query
   * @param {Object} [queryParameters] - Any search query parameter
   * @return {EventEmitter}
   * @example
   * var browser = index.browseAll('cool songs', {
   *   tagFilters: 'public,comments',
   *   hitsPerPage: 500
   * });
   *
   * browser.on('result', function resultCallback(content) {
   *   console.log(content.hits);
   * });
   *
   * // if any error occurs, you get it
   * browser.on('error', function(err) {
   *   throw err;
   * });
   *
   * // when you have browsed the whole index, you get this event
   * browser.on('end', function() {
   *   console.log('finished');
   * });
   *
   * // at any point if you want to stop the browsing process, you can stop it manually
   * // otherwise it will go on and on
   * browser.stop();
   *
   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
   */
  browseAll: function(query, queryParameters) {
    if (typeof query === 'object') {
      queryParameters = query;
      query = undefined;
    }

    var merge = require(55);

    var IndexBrowser = require(58);

    var browser = new IndexBrowser();
    var client = this.as;
    var index = this;
    var params = client._getSearchParams(
      merge({}, queryParameters || {}, {
        query: query
      }), ''
    );

    // start browsing
    browseLoop();

    function browseLoop(cursor) {
      if (browser._stopped) {
        return;
      }

      var queryString;

      if (cursor !== undefined) {
        queryString = 'cursor=' + encodeURIComponent(cursor);
      } else {
        queryString = params;
      }

      client._jsonRequest({
        method: 'GET',
        url: '/1/indexes/' + encodeURIComponent(index.indexName) + '/browse?' + queryString,
        hostType: 'read',
        callback: browseCallback
      });
    }

    function browseCallback(err, content) {
      if (browser._stopped) {
        return;
      }

      if (err) {
        browser._error(err);
        return;
      }

      browser._result(content);

      // no cursor means we are finished browsing
      if (content.cursor === undefined) {
        browser._end();
        return;
      }

      browseLoop(content.cursor);
    }

    return browser;
  },

  /*
   * Get a Typeahead.js adapter
   * @param searchParams contains an object with query parameters (see search for details)
   */
  ttAdapter: function(params) {
    var self = this;
    return function ttAdapter(query, syncCb, asyncCb) {
      var cb;

      if (typeof asyncCb === 'function') {
        // typeahead 0.11
        cb = asyncCb;
      } else {
        // pre typeahead 0.11
        cb = syncCb;
      }

      self.search(query, params, function searchDone(err, content) {
        if (err) {
          cb(err);
          return;
        }

        cb(content.hits);
      });
    };
  },

  /*
   * Wait the publication of a task on the server.
   * All server task are asynchronous and you can check with this method that the task is published.
   *
   * @param taskID the id of the task returned by server
   * @param callback the result callback with with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that contains the list of results
   */
  waitTask: function(taskID, callback) {
    // wait minimum 100ms before retrying
    var baseDelay = 100;
    // wait maximum 5s before retrying
    var maxDelay = 5000;
    var loop = 0;

    // waitTask() must be handled differently from other methods,
    // it's a recursive method using a timeout
    var indexObj = this;
    var client = indexObj.as;

    var promise = retryLoop();

    function retryLoop() {
      return client._jsonRequest({
        method: 'GET',
        hostType: 'read',
        url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID
      }).then(function success(content) {
        loop++;
        var delay = baseDelay * loop * loop;
        if (delay > maxDelay) {
          delay = maxDelay;
        }

        if (content.status !== 'published') {
          return client._promise.delay(delay).then(retryLoop);
        }

        return content;
      });
    }

    if (!callback) {
      return promise;
    }

    promise.then(successCb, failureCb);

    function successCb(content) {
      exitPromise(function exit() {
        callback(null, content);
      }, client._setTimeout || setTimeout);
    }

    function failureCb(err) {
      exitPromise(function exit() {
        callback(err);
      }, client._setTimeout || setTimeout);
    }
  },

  /*
   * This function deletes the index content. Settings and index specific API keys are kept untouched.
   *
   * @param callback (optional) the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the settings object or the error message if a failure occured
   */
  clearIndex: function(callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Get settings of this index
   *
   * @param callback (optional) the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the settings object or the error message if a failure occured
   */
  getSettings: function(callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Set settings for this index
   *
   * @param settigns the settings object that can contains :
   * - minWordSizefor1Typo: (integer) the minimum number of characters to accept one typo (default = 3).
   * - minWordSizefor2Typos: (integer) the minimum number of characters to accept two typos (default = 7).
   * - hitsPerPage: (integer) the number of hits per page (default = 10).
   * - attributesToRetrieve: (array of strings) default list of attributes to retrieve in objects.
   *   If set to null, all attributes are retrieved.
   * - attributesToHighlight: (array of strings) default list of attributes to highlight.
   *   If set to null, all indexed attributes are highlighted.
   * - attributesToSnippet**: (array of strings) default list of attributes to snippet alongside the number
   * of words to return (syntax is attributeName:nbWords).
   *   By default no snippet is computed. If set to null, no snippet is computed.
   * - attributesToIndex: (array of strings) the list of fields you want to index.
   *   If set to null, all textual and numerical attributes of your objects are indexed,
   *   but you should update it to get optimal results.
   *   This parameter has two important uses:
   *     - Limit the attributes to index: For example if you store a binary image in base64,
   *     you want to store it and be able to
   *       retrieve it but you don't want to search in the base64 string.
   *     - Control part of the ranking*: (see the ranking parameter for full explanation)
   *     Matches in attributes at the beginning of
   *       the list will be considered more important than matches in attributes further down the list.
   *       In one attribute, matching text at the beginning of the attribute will be
   *       considered more important than text after, you can disable
   *       this behavior if you add your attribute inside `unordered(AttributeName)`,
   *       for example attributesToIndex: ["title", "unordered(text)"].
   * - attributesForFaceting: (array of strings) The list of fields you want to use for faceting.
   *   All strings in the attribute selected for faceting are extracted and added as a facet.
   *   If set to null, no attribute is used for faceting.
   * - attributeForDistinct: (string) The attribute name used for the Distinct feature.
   * This feature is similar to the SQL "distinct" keyword: when enabled
   *   in query with the distinct=1 parameter, all hits containing a duplicate
   *   value for this attribute are removed from results.
   *   For example, if the chosen attribute is show_name and several hits have
   *   the same value for show_name, then only the best one is kept and others are removed.
   * - ranking: (array of strings) controls the way results are sorted.
   *   We have six available criteria:
   *    - typo: sort according to number of typos,
   *    - geo: sort according to decreassing distance when performing a geo-location based search,
   *    - proximity: sort according to the proximity of query words in hits,
   *    - attribute: sort according to the order of attributes defined by attributesToIndex,
   *    - exact:
   *        - if the user query contains one word: sort objects having an attribute
   *        that is exactly the query word before others.
   *          For example if you search for the "V" TV show, you want to find it
   *          with the "V" query and avoid to have all popular TV
   *          show starting by the v letter before it.
   *        - if the user query contains multiple words: sort according to the
   *        number of words that matched exactly (and not as a prefix).
   *    - custom: sort according to a user defined formula set in **customRanking** attribute.
   *   The standard order is ["typo", "geo", "proximity", "attribute", "exact", "custom"]
   * - customRanking: (array of strings) lets you specify part of the ranking.
   *   The syntax of this condition is an array of strings containing attributes
   *   prefixed by asc (ascending order) or desc (descending order) operator.
   *   For example `"customRanking" => ["desc(population)", "asc(name)"]`
   * - queryType: Select how the query words are interpreted, it can be one of the following value:
   *   - prefixAll: all query words are interpreted as prefixes,
   *   - prefixLast: only the last word is interpreted as a prefix (default behavior),
   *   - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
   * - highlightPreTag: (string) Specify the string that is inserted before
   * the highlighted parts in the query result (default to "<em>").
   * - highlightPostTag: (string) Specify the string that is inserted after
   * the highlighted parts in the query result (default to "</em>").
   * - optionalWords: (array of strings) Specify a list of words that should
   * be considered as optional when found in the query.
   * @param callback (optional) the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer or the error message if a failure occured
   */
  setSettings: function(settings, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'PUT',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
      hostType: 'write',
      body: settings,
      callback: callback
    });
  },
  /*
   * List all existing user keys associated to this index
   *
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  listUserKeys: function(callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Get ACL of a user key associated to this index
   *
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  getUserKeyACL: function(key, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Delete an existing user key associated to this index
   *
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  deleteUserKey: function(key, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'DELETE',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Add a new API key to this index
   *
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will
   * be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * index.addUserKey(['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#AddIndexKey|Algolia REST API Documentation}
   */
  addUserKey: function(acls, params, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.addUserKey(arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 1 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var postObj = {
      acl: acls
    };

    if (params) {
      postObj.validity = params.validity;
      postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      postObj.maxHitsPerQuery = params.maxHitsPerQuery;
      postObj.description = params.description;

      if (params.queryParameters) {
        postObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
      }

      postObj.referers = params.referers;
    }

    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },

  /**
   * Add an existing user key associated to this index
   * @deprecated use index.addUserKey()
   */
  addUserKeyWithValidity: deprecate(function deprecatedAddUserKeyWithValidity(acls, params, callback) {
    return this.addUserKey(acls, params, callback);
  }, deprecatedMessage('index.addUserKeyWithValidity()', 'index.addUserKey()')),

  /**
   * Update an existing API key of this index
   * @param {string} key - The key to update
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will
   * be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * index.updateUserKey('APIKEY', ['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
   */
  updateUserKey: function(key, acls, params, callback) {
    var isArray = require(46);
    var usage = 'Usage: index.updateUserKey(key, arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 2 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var putObj = {
      acl: acls
    };

    if (params) {
      putObj.validity = params.validity;
      putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      putObj.maxHitsPerQuery = params.maxHitsPerQuery;
      putObj.description = params.description;

      if (params.queryParameters) {
        putObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
      }

      putObj.referers = params.referers;
    }

    return this.as._jsonRequest({
      method: 'PUT',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys/' + key,
      body: putObj,
      hostType: 'write',
      callback: callback
    });
  },

  _search: function(params, callback) {
    return this.as._jsonRequest({
      cache: this.cache,
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
      body: {params: params},
      hostType: 'read',
      fallback: {
        method: 'GET',
        url: '/1/indexes/' + encodeURIComponent(this.indexName),
        body: {params: params}
      },
      callback: callback
    });
  },

  as: null,
  indexName: null,
  typeAheadArgs: null,
  typeAheadValueOption: null
};

// extracted from https://github.com/component/map/blob/master/index.js
// without the crazy toFunction thing
function map(arr, fn) {
  var ret = [];
  for (var i = 0; i < arr.length; ++i) {
    ret.push(fn(arr[i], i));
  }
  return ret;
}

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

function notImplemented() {
  var message = 'Not implemented in this environment.\n' +
    'If you feel this is a mistake, write to support@algolia.com';

  throw new errors.AlgoliaSearchError(message);
}

function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace('.', '')
    .replace('()', '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#' + githubAnchorLink;
}

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
}

function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.log(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function buildSearchMethod(queryParam) {
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    if (arguments.length === 0 || typeof query === 'function') {
      // .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }

    // .search(args), careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    if (args !== undefined) {
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }

    return this._search(params, callback);
  };
}

},{"11":11,"43":43,"46":46,"55":55,"58":58,"6":6,"63":63}],58:[function(require,module,exports){
'use strict';

// This is the object returned by the `index.browseAll()` method

module.exports = IndexBrowser;

var inherits = require(10);
var EventEmitter = require(1).EventEmitter;

function IndexBrowser() {
}

inherits(IndexBrowser, EventEmitter);

IndexBrowser.prototype.stop = function() {
  this._stopped = true;
  this._clean();
};

IndexBrowser.prototype._end = function() {
  this.emit('end');
  this._clean();
};

IndexBrowser.prototype._error = function(err) {
  this.emit('error', err);
  this._clean();
};

IndexBrowser.prototype._result = function(content) {
  this.emit('result', content);
};

IndexBrowser.prototype._clean = function() {
  this.removeAllListeners('stop');
  this.removeAllListeners('end');
  this.removeAllListeners('error');
  this.removeAllListeners('result');
};

},{"1":1,"10":10}],59:[function(require,module,exports){
'use strict';

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = algoliasearch;

var inherits = require(10);
var Promise = window.Promise || require(9).Promise;

var AlgoliaSearch = require(57);
var errors = require(63);
var inlineHeaders = require(61);
var jsonpRequest = require(62);

function algoliasearch(applicationID, apiKey, opts) {
  var cloneDeep = require(44);

  var getDocumentProtocol = require(60);

  opts = cloneDeep(opts || {});

  if (opts.protocol === undefined) {
    opts.protocol = getDocumentProtocol();
  }

  opts._ua = opts._ua || algoliasearch.ua;

  return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
}

algoliasearch.version = require(64);
algoliasearch.ua = 'Algolia for vanilla JavaScript ' + algoliasearch.version;

// we expose into window no matter how we are used, this will allow
// us to easily debug any website running algolia
window.__algolia = {
  debug: require(6),
  algoliasearch: algoliasearch
};

var support = {
  hasXMLHttpRequest: 'XMLHttpRequest' in window,
  hasXDomainRequest: 'XDomainRequest' in window,
  cors: 'withCredentials' in new XMLHttpRequest(),
  timeout: 'timeout' in new XMLHttpRequest()
};

function AlgoliaSearchBrowser() {
  // call AlgoliaSearch constructor
  AlgoliaSearch.apply(this, arguments);
}

inherits(AlgoliaSearchBrowser, AlgoliaSearch);

AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
  return new Promise(function wrapRequest(resolve, reject) {
    // no cors or XDomainRequest, no request
    if (!support.cors && !support.hasXDomainRequest) {
      // very old browser, not supported
      reject(new errors.Network('CORS not supported'));
      return;
    }

    url = inlineHeaders(url, opts.headers);

    var body = opts.body;
    var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
    var ontimeout;
    var timedOut;

    // do not rely on default XHR async flag, as some analytics code like hotjar
    // breaks it and set it to false by default
    if (req instanceof XMLHttpRequest) {
      req.open(opts.method, url, true);
    } else {
      req.open(opts.method, url);
    }

    if (support.cors) {
      if (body) {
        if (opts.method === 'POST') {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
          req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        } else {
          req.setRequestHeader('content-type', 'application/json');
        }
      }
      req.setRequestHeader('accept', 'application/json');
    }

    // we set an empty onprogress listener
    // so that XDomainRequest on IE9 is not aborted
    // refs:
    //  - https://github.com/algolia/algoliasearch-client-js/issues/76
    //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
    req.onprogress = function noop() {};

    req.onload = load;
    req.onerror = error;

    if (support.timeout) {
      // .timeout supported by both XHR and XDR,
      // we do receive timeout event, tested
      req.timeout = opts.timeout;

      req.ontimeout = timeout;
    } else {
      ontimeout = setTimeout(timeout, opts.timeout);
    }

    req.send(body);

    // event object not received in IE8, at least
    // but we do not use it, still important to note
    function load(/* event */) {
      // When browser does not supports req.timeout, we can
      // have both a load and timeout event, since handled by a dumb setTimeout
      if (timedOut) {
        return;
      }

      if (!support.timeout) {
        clearTimeout(ontimeout);
      }

      var out;

      try {
        out = {
          body: JSON.parse(req.responseText),
          responseText: req.responseText,
          statusCode: req.status,
          // XDomainRequest does not have any response headers
          headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
        };
      } catch (e) {
        out = new errors.UnparsableJSON({
          more: req.responseText
        });
      }

      if (out instanceof errors.UnparsableJSON) {
        reject(out);
      } else {
        resolve(out);
      }
    }

    function error(event) {
      if (timedOut) {
        return;
      }

      if (!support.timeout) {
        clearTimeout(ontimeout);
      }

      // error event is trigerred both with XDR/XHR on:
      //   - DNS error
      //   - unallowed cross domain request
      reject(
        new errors.Network({
          more: event
        })
      );
    }

    function timeout() {
      if (!support.timeout) {
        timedOut = true;
        req.abort();
      }

      reject(new errors.RequestTimeout());
    }
  });
};

AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
  url = inlineHeaders(url, opts.headers);

  return new Promise(function wrapJsonpRequest(resolve, reject) {
    jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
      if (err) {
        reject(err);
        return;
      }

      resolve(content);
    });
  });
};

AlgoliaSearchBrowser.prototype._promise = {
  reject: function rejectPromise(val) {
    return Promise.reject(val);
  },
  resolve: function resolvePromise(val) {
    return Promise.resolve(val);
  },
  delay: function delayPromise(ms) {
    return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
      setTimeout(resolve, ms);
    });
  }
};

},{"10":10,"44":44,"57":57,"6":6,"60":60,"61":61,"62":62,"63":63,"64":64,"9":9}],60:[function(require,module,exports){
'use strict';

module.exports = getDocumentProtocol;

function getDocumentProtocol() {
  var protocol = window.document.location.protocol;

  // when in `file:` mode (local html file), default to `http:`
  if (protocol !== 'http:' && protocol !== 'https:') {
    protocol = 'http:';
  }

  return protocol;
}

},{}],61:[function(require,module,exports){
'use strict';

module.exports = inlineHeaders;

var querystring = require(5);

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + querystring.encode(headers);
}

},{"5":5}],62:[function(require,module,exports){
'use strict';

module.exports = jsonpRequest;

var errors = require(63);

var JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
    return;
  }

  opts.debug('JSONP: start');

  var cbCalled = false;
  var timedOut = false;

  JSONPCounter += 1;
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var cbName = 'algoliaJSONP_' + JSONPCounter;
  var done = false;

  window[cbName] = function(data) {
    try {
      delete window[cbName];
    } catch (e) {
      window[cbName] = undefined;
    }

    if (timedOut) {
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
    });
  };

  // add callback by hand
  url += '&callback=' + cbName;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += '&' + opts.jsonBody.params;
  }

  var ontimeout = setTimeout(timeout, opts.timeout);

  // script onreadystatechange needed only for
  // <= IE8
  // https://github.com/angular/angular.js/issues/4523
  script.onreadystatechange = readystatechange;
  script.onload = success;
  script.onerror = error;

  script.async = true;
  script.defer = true;
  script.src = url;
  head.appendChild(script);

  function success() {
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
    }
  }

  function readystatechange() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      success();
    }
  }

  function clean() {
    clearTimeout(ontimeout);
    script.onload = null;
    script.onreadystatechange = null;
    script.onerror = null;
    head.removeChild(script);

    try {
      delete window[cbName];
      delete window[cbName + '_loaded'];
    } catch (e) {
      window[cbName] = null;
      window[cbName + '_loaded'] = null;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');

    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}

},{"63":63}],63:[function(require,module,exports){
'use strict';

// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var inherits = require(10);

function AlgoliaSearchError(message, extraProperties) {
  var forEach = require(11);

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = this.constructor.name;
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timedout before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};

},{"10":10,"11":11}],64:[function(require,module,exports){
'use strict';

module.exports = '3.9.2';

},{}]},{},[59])(59)
});