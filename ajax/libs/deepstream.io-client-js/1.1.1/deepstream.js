(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.deepstream = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],2:[function(_dereq_,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],3:[function(_dereq_,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

},{}],4:[function(_dereq_,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){

},{}],6:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],7:[function(_dereq_,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],8:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
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

},{"./debug":9}],9:[function(_dereq_,module,exports){

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
exports.humanize = _dereq_('ms');

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

},{"ms":27}],10:[function(_dereq_,module,exports){

module.exports =  _dereq_('./lib/');

},{"./lib/":11}],11:[function(_dereq_,module,exports){

module.exports = _dereq_('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = _dereq_('engine.io-parser');

},{"./socket":12,"engine.io-parser":20}],12:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = _dereq_('./transports');
var Emitter = _dereq_('component-emitter');
var debug = _dereq_('debug')('engine.io-client:socket');
var index = _dereq_('indexof');
var parser = _dereq_('engine.io-parser');
var parseuri = _dereq_('parseuri');
var parsejson = _dereq_('parsejson');
var parseqs = _dereq_('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;

  // other options for Node.js client
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }
  }

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = _dereq_('./transport');
Socket.transports = _dereq_('./transports');
Socket.parser = _dereq_('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized,
    perMessageDeflate: this.perMessageDeflate,
    extraHeaders: this.extraHeaders
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function(){
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if('function' == typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' == typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./transport":13,"./transports":14,"component-emitter":6,"debug":8,"engine.io-parser":20,"indexof":25,"parsejson":28,"parseqs":29,"parseuri":30}],13:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var parser = _dereq_('engine.io-parser');
var Emitter = _dereq_('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":6,"engine.io-parser":20}],14:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var XHR = _dereq_('./polling-xhr');
var JSONP = _dereq_('./polling-jsonp');
var websocket = _dereq_('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling-jsonp":15,"./polling-xhr":16,"./websocket":18,"xmlhttprequest-ssl":19}],15:[function(_dereq_,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = _dereq_('./polling');
var inherit = _dereq_('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  }
  else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
  
  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":17,"component-inherit":7}],16:[function(_dereq_,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var Polling = _dereq_('./polling');
var Emitter = _dereq_('component-emitter');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  } else {
    this.extraHeaders = opts.extraHeaders;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        try {
          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
        } catch (e) {
          var ui8Arr = new Uint8Array(this.xhr.response);
          var dataArray = [];
          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
            dataArray.push(ui8Arr[idx]);
          }

          data = String.fromCharCode.apply(null, dataArray);
        }
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":17,"component-emitter":6,"component-inherit":7,"debug":8,"xmlhttprequest-ssl":19}],17:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parseqs = _dereq_('parseqs');
var parser = _dereq_('engine.io-parser');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

},{"../transport":13,"component-inherit":7,"debug":8,"engine.io-parser":20,"parseqs":29,"xmlhttprequest-ssl":19,"yeast":33}],18:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parser = _dereq_('engine.io-parser');
var parseqs = _dereq_('parseqs');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  try {
    WebSocket = _dereq_('ws');
  } catch (e) { }
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }

  this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'buffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function(packet) {
      parser.encodePacket(packet, self.supportsBinary, function(data) {
        if (!BrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        //Sometimes the websocket has already been closed but the browser didn't
        //have a chance of informing us about it yet, in that case send will
        //throw an error
        try {
          if (BrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e){
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done(){
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function(){
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../transport":13,"component-inherit":7,"debug":8,"engine.io-parser":20,"parseqs":29,"ws":5,"yeast":33}],19:[function(_dereq_,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = _dereq_('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":24}],20:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = _dereq_('./keys');
var hasBinary = _dereq_('has-binary');
var sliceBuffer = _dereq_('arraybuffer.slice');
var base64encoder = _dereq_('base64-arraybuffer');
var after = _dereq_('after');
var utf8 = _dereq_('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = _dereq_('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./keys":21,"after":1,"arraybuffer.slice":2,"base64-arraybuffer":3,"blob":4,"has-binary":23,"utf8":32}],21:[function(_dereq_,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],22:[function(_dereq_,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"isarray":26}],24:[function(_dereq_,module,exports){

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{}],25:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],26:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],27:[function(_dereq_,module,exports){
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
  return options.long
    ? long(val)
    : short(val);
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

function short(ms) {
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

function long(ms) {
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

},{}],28:[function(_dereq_,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],29:[function(_dereq_,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],30:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],31:[function(_dereq_,module,exports){
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],32:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],33:[function(_dereq_,module,exports){
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

},{}],34:[function(_dereq_,module,exports){
var C = _dereq_( './constants/constants' ),
	MS = _dereq_( './constants/merge-strategies' ),
	Emitter = _dereq_( 'component-emitter' ),
	Connection = _dereq_( './message/connection' ),
	EventHandler = _dereq_( './event/event-handler' ),
	RpcHandler = _dereq_( './rpc/rpc-handler' ),
	RecordHandler = _dereq_( './record/record-handler' ),
	WebRtcHandler = _dereq_( './webrtc/webrtc-handler' ),
	defaultOptions = _dereq_( './default-options' );

/**
 * deepstream.io javascript client - works in
 * node.js and browsers (using engine.io)
 *
 * @copyright 2016 deepstreamHub GmbH
 * @author deepstreamHub GmbH
 *
 *
 * @{@link http://deepstream.io}
 *
 *
 * @param {String} url     URL to connect to. The protocoll can be ommited, e.g. <host>:<port>. Use TCP URL for node.js
 * @param {Object} options A map of options that extend the ones specified in default-options.js
 *
 * @public
 * @constructor
 */
var Client = function( url, options ) {
	this._url = url;
	this._options = this._getOptions( options || {} );

	this._connection = new Connection( this, this._url, this._options );

	this.event = new EventHandler( this._options, this._connection, this );
	this.rpc = new RpcHandler( this._options, this._connection, this );
	this.record = new RecordHandler( this._options, this._connection, this );
	this.webrtc = new WebRtcHandler( this._options, this._connection, this );

	this._messageCallbacks = {};
	this._messageCallbacks[ C.TOPIC.WEBRTC ] = this.webrtc._$handle.bind( this.webrtc );
	this._messageCallbacks[ C.TOPIC.EVENT ] = this.event._$handle.bind( this.event );
	this._messageCallbacks[ C.TOPIC.RPC ] = this.rpc._$handle.bind( this.rpc );
	this._messageCallbacks[ C.TOPIC.RECORD ] = this.record._$handle.bind( this.record );
	this._messageCallbacks[ C.TOPIC.ERROR ] = this._onErrorMessage.bind( this );
};

Emitter( Client.prototype );

/**
 * Send authentication parameters to the client to fully open
 * the connection.
 *
 * Please note: Authentication parameters are send over an already established
 * connection, rather than appended to the server URL. This means the parameters
 * will be encrypted when used with a WSS / HTTPS connection. If the deepstream server
 * on the other side has message logging enabled it will however be written to the logs in
 * plain text. If additional security is a requirement it might therefor make sense to hash
 * the password on the client.
 *
 * If the connection is not yet established the authentication parameter will be
 * stored and send once it becomes available
 *
 * authParams can be any JSON serializable data structure and its up for the
 * permission handler on the server to make sense of them, although something
 * like { username: 'someName', password: 'somePass' } will probably make the most sense.
 *
 * login can be called multiple times until either the connection is authenticated or
 * forcefully closed by the server since its maxAuthAttempts threshold has been exceeded
 *
 * @param   {Object}   authParams JSON.serializable authentication data
 * @param   {Function} callback   Will be called with either (true) or (false, data)
 *
 * @public
 * @returns {Client}
 */
Client.prototype.login = function( authParams, callback ) {
	this._connection.authenticate( authParams || {}, callback );
	return this;
};

/**
 * Closes the connection to the server.
 *
 * @public
 * @returns {void}
 */
Client.prototype.close = function() {
	this._connection.close();
};

/**
 * Returns the current state of the connection.
 *
 * connectionState is one of CONSTANTS.CONNECTION_STATE
 *
 * @returns {[type]} [description]
 */
Client.prototype.getConnectionState = function() {
	return this._connection.getState();
};

/**
 * Returns a random string. The first block of characters
 * is a timestamp, in order to allow databases to optimize for semi-
 * sequentuel numberings
 *
 * @public
 * @returns {String} unique id
 */
Client.prototype.getUid = function() {
	var timestamp = (new Date()).getTime().toString(36),
		randomString = (Math.random() * 10000000000000000).toString(36).replace( '.', '' );

	return timestamp + '-' + randomString;
};

/**
 * Package private callback for parsed incoming messages. Will be invoked
 * by the connection class
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
Client.prototype._$onMessage = function( message ) {
	if( this._messageCallbacks[ message.topic ] ) {
		this._messageCallbacks[ message.topic ]( message );
	} else {
		message.processedError = true;
		this._$onError( message.topic, C.EVENT.MESSAGE_PARSE_ERROR, 'Received message for unknown topic ' + message.topic );
	}

	if( message.action === C.ACTIONS.ERROR && !message.processedError ) {
		this._$onError( message.topic, message.data[ 0 ],  message.data.slice( 0 ) );
	}
};

/**
 * Package private error callback. This is the single point at which
 * errors are thrown in the client. (Well... that's the intention anyways)
 *
 * The expectations would be for implementations to subscribe
 * to the client's error event to prevent errors from being thrown
 * and then decide based on the event and topic parameters how
 * to handle the errors
 *
 * IMPORTANT: Errors that are specific to a request, e.g. a RPC
 * timing out or a record not being permissioned are passed directly
 * to the method that requested them
 *
 * @param   {String} topic One of CONSTANTS.TOPIC
 * @param   {String} event One of CONSTANTS.EVENT
 * @param   {String} msg   Error dependent message
 *
 * @package private
 * @returns {void}
 */
Client.prototype._$onError = function( topic, event, msg ) {
	var errorMsg;

	/*
	 * Help to diagnose the problem quicker by checking for
	 * some common problems
	 */
	if( event === C.EVENT.ACK_TIMEOUT || event === C.EVENT.RESPONSE_TIMEOUT ) {
		if( this.getConnectionState() === C.CONNECTION_STATE.AWAITING_AUTHENTICATION ) {
			errorMsg = 'Your message timed out because you\'re not authenticated. Have you called login()?';
			setTimeout( this._$onError.bind( this, C.EVENT.NOT_AUTHENTICATED, C.TOPIC.ERROR, errorMsg ), 1 );
		}
	}

	if( this.hasListeners( 'error' ) ) {
		this.emit( 'error', msg, event, topic );
		this.emit( event, topic, msg );
	} else {
		console.log( '--- You can catch all deepstream errors by subscribing to the error event ---' );

		errorMsg = event + ': ' + msg;

		if( topic ) {
			errorMsg += ' (' + topic + ')';
		}

		throw new Error( errorMsg );
	}
};

/**
 * Passes generic messages from the error topic
 * to the _$onError handler
 *
 * @param {Object} errorMessage parsed deepstream error message
 *
 * @private
 * @returns {void}
 */
Client.prototype._onErrorMessage = function( errorMessage ) {
	this._$onError( errorMessage.topic, errorMessage.data[ 0 ], errorMessage.data[ 1 ] );
};

/**
 * Creates a new options map by extending default
 * options with the passed in options
 *
 * @param   {Object} options The user specified client configuration options
 *
 * @private
 * @returns {Object}	merged options
 */
Client.prototype._getOptions = function( options ) {
	var mergedOptions = {},
		key;

	for( key in defaultOptions ) {
		if( typeof options[ key ] === 'undefined' ) {
			mergedOptions[ key ] = defaultOptions[ key ];
		} else {
			mergedOptions[ key ] = options[ key ];
		}
	}

	return mergedOptions;
};

/**
 * Exports factory function to adjust to the current JS style of
 * disliking 'new' :-)
 *
 * @param {String} url     URL to connect to. The protocoll can be ommited, e.g. <host>:<port>. Use TCP URL for node.js
 * @param {Object} options A map of options that extend the ones specified in default-options.js
 *
 * @public
 * @returns {void}
 */
function createDeepstream( url, options ) {
	return new Client( url, options );
}

/**
 * Expose constants to allow consumers to access them
*/
Client.prototype.CONSTANTS = C;
createDeepstream.CONSTANTS = C;

/**
 * Expose merge strategies to allow consumers to access them
*/
Client.prototype.MERGE_STRATEGIES = MS;
createDeepstream.MERGE_STRATEGIES = MS;

module.exports = createDeepstream;

},{"./constants/constants":35,"./constants/merge-strategies":36,"./default-options":37,"./event/event-handler":38,"./message/connection":39,"./record/record-handler":45,"./rpc/rpc-handler":47,"./webrtc/webrtc-handler":57,"component-emitter":6}],35:[function(_dereq_,module,exports){
exports.CONNECTION_STATE = {};

exports.CONNECTION_STATE.CLOSED = 'CLOSED';
exports.CONNECTION_STATE.AWAITING_CONNECTION = 'AWAITING_CONNECTION';
exports.CONNECTION_STATE.CHALLENGING = 'CHALLENGING';
exports.CONNECTION_STATE.AWAITING_AUTHENTICATION = 'AWAITING_AUTHENTICATION';
exports.CONNECTION_STATE.AUTHENTICATING = 'AUTHENTICATING';
exports.CONNECTION_STATE.OPEN = 'OPEN';
exports.CONNECTION_STATE.ERROR = 'ERROR';
exports.CONNECTION_STATE.RECONNECTING = 'RECONNECTING';

exports.MESSAGE_SEPERATOR = String.fromCharCode( 30 ); // ASCII Record Seperator 1E
exports.MESSAGE_PART_SEPERATOR = String.fromCharCode( 31 ); // ASCII Unit Separator 1F

exports.TYPES = {};
exports.TYPES.STRING = 'S';
exports.TYPES.OBJECT = 'O';
exports.TYPES.NUMBER = 'N';
exports.TYPES.NULL = 'L';
exports.TYPES.TRUE = 'T';
exports.TYPES.FALSE = 'F';
exports.TYPES.UNDEFINED = 'U';

exports.TOPIC = {};
exports.TOPIC.CONNECTION = 'C';
exports.TOPIC.AUTH = 'A';
exports.TOPIC.ERROR = 'X';
exports.TOPIC.EVENT = 'E';
exports.TOPIC.RECORD = 'R';
exports.TOPIC.RPC = 'P';
exports.TOPIC.WEBRTC = 'W';
exports.TOPIC.PRIVATE = 'PRIVATE/';

exports.EVENT = {};
exports.EVENT.CONNECTION_ERROR = 'connectionError';
exports.EVENT.CONNECTION_STATE_CHANGED = 'connectionStateChanged';
exports.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED = 'MAX_RECONNECTION_ATTEMPTS_REACHED';
exports.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT = 'CONNECTION_AUTHENTICATION_TIMEOUT';
exports.EVENT.ACK_TIMEOUT = 'ACK_TIMEOUT';
exports.EVENT.NO_RPC_PROVIDER = 'NO_RPC_PROVIDER';
exports.EVENT.RESPONSE_TIMEOUT = 'RESPONSE_TIMEOUT';
exports.EVENT.DELETE_TIMEOUT = 'DELETE_TIMEOUT';
exports.EVENT.UNSOLICITED_MESSAGE = 'UNSOLICITED_MESSAGE';
exports.EVENT.MESSAGE_DENIED = 'MESSAGE_DENIED';
exports.EVENT.MESSAGE_PARSE_ERROR = 'MESSAGE_PARSE_ERROR';
exports.EVENT.VERSION_EXISTS = 'VERSION_EXISTS';
exports.EVENT.NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
exports.EVENT.MESSAGE_PERMISSION_ERROR = 'MESSAGE_PERMISSION_ERROR';
exports.EVENT.LISTENER_EXISTS = 'LISTENER_EXISTS';
exports.EVENT.NOT_LISTENING = 'NOT_LISTENING';
exports.EVENT.TOO_MANY_AUTH_ATTEMPTS = 'TOO_MANY_AUTH_ATTEMPTS';
exports.EVENT.IS_CLOSED = 'IS_CLOSED';
exports.EVENT.UNKNOWN_CALLEE = 'UNKNOWN_CALLEE';
exports.EVENT.RECORD_NOT_FOUND = 'RECORD_NOT_FOUND';
exports.EVENT.NOT_SUBSCRIBED = 'NOT_SUBSCRIBED';

exports.ACTIONS = {};
exports.ACTIONS.ACK = 'A';
exports.ACTIONS.REDIRECT = 'RED';
exports.ACTIONS.CHALLENGE = 'CH';
exports.ACTIONS.CHALLENGE_RESPONSE = 'CHR';
exports.ACTIONS.READ = 'R';
exports.ACTIONS.CREATE = 'C';
exports.ACTIONS.UPDATE = 'U';
exports.ACTIONS.PATCH = 'P';
exports.ACTIONS.DELETE = 'D';
exports.ACTIONS.SUBSCRIBE = 'S';
exports.ACTIONS.UNSUBSCRIBE = 'US';
exports.ACTIONS.HAS = 'H';
exports.ACTIONS.SNAPSHOT = 'SN';
exports.ACTIONS.INVOKE = 'I';
exports.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND = 'SP';
exports.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED = 'SR';
exports.ACTIONS.SUBSCRIPTION_HAS_PROVIDER = 'SH';
exports.ACTIONS.LISTEN = 'L';
exports.ACTIONS.UNLISTEN = 'UL';
exports.ACTIONS.LISTEN_ACCEPT = 'LA';
exports.ACTIONS.LISTEN_REJECT = 'LR';
exports.ACTIONS.PROVIDER_UPDATE = 'PU';
exports.ACTIONS.QUERY = 'Q';
exports.ACTIONS.CREATEORREAD = 'CR';
exports.ACTIONS.EVENT = 'EVT';
exports.ACTIONS.ERROR = 'E';
exports.ACTIONS.REQUEST = 'REQ';
exports.ACTIONS.RESPONSE = 'RES';
exports.ACTIONS.REJECTION = 'REJ';

//WebRtc
exports.ACTIONS.WEBRTC_REGISTER_CALLEE = 'RC';
exports.ACTIONS.WEBRTC_UNREGISTER_CALLEE = 'URC';
exports.ACTIONS.WEBRTC_OFFER = 'OF';
exports.ACTIONS.WEBRTC_ANSWER = 'AN';
exports.ACTIONS.WEBRTC_ICE_CANDIDATE = 'IC';
exports.ACTIONS.WEBRTC_CALL_DECLINED = 'CD';
exports.ACTIONS.WEBRTC_CALL_ENDED = 'CE';
exports.ACTIONS.WEBRTC_LISTEN_FOR_CALLEES = 'LC';
exports.ACTIONS.WEBRTC_UNLISTEN_FOR_CALLEES = 'ULC';
exports.ACTIONS.WEBRTC_ALL_CALLEES = 'WAC';
exports.ACTIONS.WEBRTC_CALLEE_ADDED = 'WCA';
exports.ACTIONS.WEBRTC_CALLEE_REMOVED = 'WCR';
exports.ACTIONS.WEBRTC_IS_ALIVE = 'WIA';

exports.CALL_STATE = {};
exports.CALL_STATE.INITIAL = 'INITIAL';
exports.CALL_STATE.CONNECTING = 'CONNECTING';
exports.CALL_STATE.ESTABLISHED = 'ESTABLISHED';
exports.CALL_STATE.ACCEPTED = 'ACCEPTED';
exports.CALL_STATE.DECLINED = 'DECLINED';
exports.CALL_STATE.ENDED = 'ENDED';
exports.CALL_STATE.ERROR = 'ERROR';

},{}],36:[function(_dereq_,module,exports){
module.exports = {
	/**
	*	Choose the server's state over the client's
	**/
	REMOTE_WINS: function( record, remoteValue, remoteVersion, callback ) {
		callback( null, remoteValue );
	},
	/**
	*	Choose the local state over the server's
	**/
	LOCAL_WINS: function( record, remoteValue, remoteVersion, callback ) {
		callback( null, record.get() );
	}
};
},{}],37:[function(_dereq_,module,exports){
var MERGE_STRATEGIES = _dereq_( './constants/merge-strategies' );

module.exports = {
	/************************************************
	* Deepstream									*
	************************************************/

	/**
	 * @param {Boolean} recordPersistDefault Whether records should be
	 *                                       persisted by default. Can be overwritten
	 *                                       for individual records when calling getRecord( name, persist );
	 */
	recordPersistDefault: true,

	/**
	 * @param {Number} reconnectIntervalIncrement Specifies the number of milliseconds by which the time until
	 *                                            the next reconnection attempt will be incremented after every
	 *                                            unsuccesful attempt.
	 *                                            E.g. for 1500: if the connection is lost, the client will attempt to reconnect
	 *                                            immediatly, if that fails it will try again after 1.5 seconds, if that fails
	 *                                            it will try again after 3 seconds and so on
	 */
	reconnectIntervalIncrement: 4000,

	/**
	 * @param {Number} maxReconnectInterval       Specifies the maximum number of milliseconds for the reconnectIntervalIncrement
	 *                                            The amount of reconnections will reach this value
	 *                                            then reconnectIntervalIncrement will be ignored.
	 */
	maxReconnectInterval: 180000,

	/**
	 * @param {Number} maxReconnectAttempts		The number of reconnection attempts until the client gives
	 *                                       	up and declares the connection closed
	 */
	maxReconnectAttempts: 5,

	/**
	 * @param {Number} rpcAckTimeout			The number of milliseconds after which a rpc will create an error if
	 * 											no Ack-message has been received
	 */
	 rpcAckTimeout: 6000,

	 /**
	 * @param {Number} rpcResponseTimeout		The number of milliseconds after which a rpc will create an error if
	 * 											no response-message has been received
	 */
	 rpcResponseTimeout: 10000,

	 /**
	 * @param {Number} subscriptionTimeout		The number of milliseconds that can pass after providing/unproviding a RPC or subscribing/unsubscribing/
	 * 											listening to a record before an error is thrown
	 */
	 subscriptionTimeout: 2000,

	 /**
	  * @param {Number} maxMessagesPerPacket	If the implementation tries to send a large number of messages at the same
	  *                                      	time, the deepstream client will try to split them into smaller packets and send
	  *                                      	these every <timeBetweenSendingQueuedPackages> ms.
	  *
	  *                                       	This parameter specifies the number of messages after which deepstream sends the
	  *                                       	packet and queues the remaining messages. Set to Infinity to turn the feature off.
	  *
	  */
	 maxMessagesPerPacket: 100,

	 /**
	  * @param {Number} timeBetweenSendingQueuedPackages Please see description for maxMessagesPerPacket. Sets the time in ms.
	  */
	 timeBetweenSendingQueuedPackages: 16,

	 /**
	  * @param {Number} recordReadAckTimeout 	The number of milliseconds from the moment client.record.getRecord() is called
	  *                                       	until an error is thrown since no ack message has been received.
	  */
	 recordReadAckTimeout: 1000,

	 /**
	  * @param {Number} recordReadTimeout 		The number of milliseconds from the moment client.record.getRecord() is called
	  *                                       	until an error is thrown since no data has been received.
	  */
	 recordReadTimeout: 3000,

	 /**
	  * @param {Number} recordDeleteTimeout 	The number of milliseconds from the moment record.delete() is called
	  *                                       	until an error is thrown since no delete ack message had been received. Please
	  *                                       	take into account that the deletion is only complete after the record has been
	  *                                       	deleted from both cache and storage
	  */
	 recordDeleteTimeout: 3000,

	 /**
	  * @param {Number} calleeAckTimeout 		The number of milliseconds from the moment webrtc.registerCallee has been
	  *                                    		called until an error is thrown since no ACK response has been received
	  */
	 calleeAckTimeout: 3000,

	 /**
	  * @param {Object} rtcPeerConnectionConfig An RTCConfiguration (https://developer.mozilla.org/en/docs/Web/API/RTCConfiguration). This
	  *                                         is used to establish your public IP address when behind a NAT (Network Address Translation)
	  *                                         Set to null if you only intend to use WebRTC within your local network
	  */
	 rtcPeerConnectionConfig: { iceServers: [
		{ url: 'stun:stun.services.mozilla.com' },
		{ url: 'stun:stun.l.google.com:19302' }
	]},

	/************************************************
	* Engine.io										*
	************************************************/

	/**
	 * @param {http.Agent} agent http.Agent to use, defaults to false (NodeJS only)
	 */
	agent: false,

	/**
	 * @param {Boolean} upgrade 	whether the client should try to upgrade the
	 *                          	transport from long-polling to something better
	 */
	upgrade: true,

	/**
	 * @param {Boolean} forceJSONP forces JSONP for polling transport
	 */
	forceJSONP: false,

	/**
	 * @param {Boolean} jsonp determines whether to use JSONP when
	 *                        necessary for polling. If disabled (by settings to false)
	 *                        an error will be emitted (saying "No transports available")
	 *                        if no other transports are available. If another transport
	 *                        is available for opening a connection (e.g. WebSocket)
	 *                        that transport will be used instead.
	 */
	jsonp: true,

	/**
	 * @param {Boolean} forceBase64 forces base 64 encoding for polling transport even when XHR2 responseType
	 *                              is available and WebSocket even if the used standard supports binary.
	 */
	forceBase64: false,

	/**
	 * @param {Boolean} enablesXDR 	enables XDomainRequest for IE8 to avoid loading bar flashing with click sound.
	 *                              default to false because XDomainRequest has a flaw of not sending cookie.
	 */
	enablesXDR: false,

	/**
	 * @param {Boolean} timestampRequests 	whether to add the timestamp with each transport request. Note: this is
	 *                                     	ignored if the browser is IE or Android, in which case requests are always stamped
	 */
	timestampRequests: false,

	/**
	 * @param {String} timestampParam timestamp parameter
	 */
	timestampParam: 't',

	/**
	 * @param {Number} policyPort ort the policy server listens on
	 */
	policyPort: 843,

	/**
	 * @param {String} path path to connect to
	 */
	path: '/deepstream',

	/**
	 * @param {Array} transports        a list of transports to try (in order). Engine always
	 *                                  attempts to connect directly with the first one,
	 *                                  provided the feature detection test for it passes.
	 */
	transports: [ 'polling', 'websocket' ],

	/**
	 * @param {Boolean} rememberUpgrade If true and if the previous websocket connection to
	 *                                  the server succeeded, the connection attempt will bypass the normal
	 *                                  upgrade process and will initially try websocket. A connection
	 *                                  attempt following a transport error will use the normal upgrade
	 *                                  process. It is recommended you turn this on only when using
	 *                                  SSL/TLS connections, or if you know that
	 *                                  your network does not block websockets.
	 */
	rememberUpgrade: false,

	/**
   *  @param {Function} mergeStrategy 	This provides the default strategy used to deal with merge conflicts.
	 *                                  If the merge strategy is not succesfull it will set an error, else set the
	 *                                  returned data as the latest revision. This can be overriden on a per record
	 *                                  basis by setting the `setMergeStrategy`.
	 */
	mergeStrategy: MERGE_STRATEGIES.REMOTE_WINS,

	/**
	 * @param {Boolean} recordDeepCopy Setting to false disabled deepcopying of record data
	 *                                  when provided via `get()` in a `subscribe` callback. This
	 *                                  improves speed at the expense of the user having to ensure
	 *                                  object immutability.
	 */
	recordDeepCopy: true
};

},{"./constants/merge-strategies":36}],38:[function(_dereq_,module,exports){
var messageBuilder = _dereq_( '../message/message-builder' ),
	messageParser = _dereq_( '../message/message-parser' ),
	AckTimeoutRegistry = _dereq_( '../utils/ack-timeout-registry' ),
	ResubscribeNotifier = _dereq_( '../utils/resubscribe-notifier' ),
	C = _dereq_( '../constants/constants' ),
	Listener = _dereq_( '../utils/listener' ),
	EventEmitter = _dereq_( 'component-emitter' );

/**
 * This class handles incoming and outgoing messages in relation
 * to deepstream events. It basically acts like an event-hub that's
 * replicated across all connected clients.
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 * @public
 * @constructor
 */
var EventHandler = function( options, connection, client ) {
	this._options = options;
	this._connection = connection;
	this._client = client;
	this._emitter = new EventEmitter();
	this._listener = {};
	this._ackTimeoutRegistry = new AckTimeoutRegistry( client, C.TOPIC.EVENT, this._options.subscriptionTimeout );
	this._resubscribeNotifier = new ResubscribeNotifier( this._client, this._resubscribe.bind( this ) );
};

/**
 * Subscribe to an event. This will receive both locally emitted events
 * as well as events emitted by other connected clients.
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.subscribe = function( name, callback ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}
	if ( typeof callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	if( !this._emitter.hasListeners( name ) ) {
		this._ackTimeoutRegistry.add( name, C.ACTIONS.SUBSCRIBE );
		this._connection.sendMsg( C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [ name ] );
	}

	this._emitter.on( name, callback );
};

/**
 * Removes a callback for a specified event. If all callbacks
 * for an event have been removed, the server will be notified
 * that the client is unsubscribed as a listener
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unsubscribe = function( name, callback ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}
	if ( callback !== undefined && typeof callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}
	this._emitter.off( name, callback );

	if( !this._emitter.hasListeners( name ) ) {
		this._ackTimeoutRegistry.add( name, C.ACTIONS.UNSUBSCRIBE );
		this._connection.sendMsg( C.TOPIC.EVENT, C.ACTIONS.UNSUBSCRIBE, [ name ] );
	}
};

/**
 * Emits an event locally and sends a message to the server to
 * broadcast the event to the other connected clients
 *
 * @param   {String} name
 * @param   {Mixed} data will be serialized and deserialized to its original type.
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.emit = function( name, data ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}

	this._connection.sendMsg( C.TOPIC.EVENT, C.ACTIONS.EVENT, [ name, messageBuilder.typed( data ) ] );
	this._emitter.emit( name, data );
};

/**
 * Allows to listen for event subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular event if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.listen = function( pattern, callback ) {
	if ( typeof pattern !== 'string' || pattern.length === 0 ) {
		throw new Error( 'invalid argument pattern' );
	}
	if ( typeof callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	if( this._listener[ pattern ] && !this._listener[ pattern ].destroyPending ) {
		return this._client._$onError( C.TOPIC.EVENT, C.EVENT.LISTENER_EXISTS, pattern );
	} else if( this._listener[ pattern ] ) {
		this._listener[ pattern ].destroy();
	}

	this._listener[ pattern ] = new Listener( C.TOPIC.EVENT, pattern, callback, this._options, this._client, this._connection );
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unlisten = function( pattern ) {
	if ( typeof pattern !== 'string' || pattern.length === 0 ) {
		throw new Error( 'invalid argument pattern' );
	}

	var listener = this._listener[ pattern ];

	if( listener && !listener.destroyPending ) {
		listener.sendDestroy();
	} else if( this._listener[ pattern ] ) {
		this._ackTimeoutRegistry.add( pattern, C.EVENT.UNLISTEN );
		this._listener[ pattern ].destroy();
		delete this._listener[ pattern ];
	} else {
		this._client._$onError( C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern );
	}
};

/**
 * Handles incoming messages from the server
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._$handle = function( message ) {
	var name = message.data[ message.action === C.ACTIONS.ACK ? 1 : 0 ];

	if( message.action === C.ACTIONS.EVENT ) {
		processed = true;
		if( message.data && message.data.length === 2 ) {
			this._emitter.emit( name, messageParser.convertTyped( message.data[ 1 ], this._client ) );
		} else {
			this._emitter.emit( name );
		}
		return;
	}

	if( message.action === C.ACTIONS.ACK && message.data[ 0 ] === C.ACTIONS.UNLISTEN &&
		this._listener[ name ] && this._listener[ name ].destroyPending
	) {
		this._listener[ name ].destroy();
		delete this._listener[ name ];
		return;
	} else if( this._listener[ name ] ) {
		processed = true;
		this._listener[ name ]._$onMessage( message );
		return;
	} else if( message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED ) {
		// An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
		return;
	}  else if( message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER ) {
		// record can receive a HAS_PROVIDER after discarding the record
		return;
	}

	if( message.action === C.ACTIONS.ACK ) {
		this._ackTimeoutRegistry.clear( message );
		return;
	}

	if( message.action === C.ACTIONS.ERROR ) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED){
      this._ackTimeoutRegistry.remove( message.data[1], message.data[2] );
    }
    else if ( message.data[0] === C.EVENT.NOT_SUBSCRIBED ){
      this._ackTimeoutRegistry.remove( message.data[1], C.ACTIONS.UNSUBSCRIBE );
    }
		message.processedError = true;
		this._client._$onError( C.TOPIC.EVENT, message.data[ 0 ], message.data[ 1 ] );
		return;
	}

	this._client._$onError( C.TOPIC.EVENT, C.EVENT.UNSOLICITED_MESSAGE, name );
};


/**
 * Resubscribes to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._resubscribe = function() {
	var callbacks = this._emitter._callbacks;
	for( var eventName in callbacks ) {
		this._connection.sendMsg( C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [ eventName ] );
	}
};

module.exports = EventHandler;

},{"../constants/constants":35,"../message/message-builder":40,"../message/message-parser":41,"../utils/ack-timeout-registry":50,"../utils/listener":51,"../utils/resubscribe-notifier":52,"component-emitter":6}],39:[function(_dereq_,module,exports){
var engineIoClient = _dereq_( 'engine.io-client' ),
	messageParser = _dereq_( './message-parser' ),
	messageBuilder = _dereq_( './message-builder' ),
	TcpConnection = _dereq_( '../tcp/tcp-connection' ),
	utils = _dereq_( '../utils/utils' ),
	C = _dereq_( '../constants/constants' );

/**
 * Establishes a connection to a deepstream server, either
 * using TCP in node or engine.io in the browser.
 *
 * @param {Client} client
 * @param {String} url     Short url, e.g. <host>:<port>. Deepstream works out the protocol
 * @param {Object} options connection options
 *
 * @constructor
 */
var Connection = function( client, url, options ) {
	this._client = client;
	this._originalUrl = url;
	this._url = url;
	this._options = options;
	this._authParams = null;
	this._authCallback = null;
	this._deliberateClose = false;
	this._redirecting = false;
	this._tooManyAuthAttempts = false;
	this._connectionAuthenticationTimeout = false;
	this._challengeDenied = false;
	this._queuedMessages = [];
	this._reconnectTimeout = null;
	this._reconnectionAttempt = 0;
	this._currentPacketMessageCount = 0;
	this._sendNextPacketTimeout = null;
	this._currentMessageResetTimeout = null;
	this._endpoint = null;

	this._state = C.CONNECTION_STATE.CLOSED;
	this._createEndpoint();
};

/**
 * Returns the current connection state.
 * (One of constants.CONNECTION_STATE)
 *
 * @public
 * @returns {String} connectionState
 */
Connection.prototype.getState = function() {
	return this._state;
};

/**
 * Sends the specified authentication parameters
 * to the server. Can be called up to <maxAuthAttempts>
 * times for the same connection.
 *
 * @param   {Object}   authParams A map of user defined auth parameters. E.g. { username:<String>, password:<String> }
 * @param   {Function} callback   A callback that will be invoked with the authenticationr result
 *
 * @public
 * @returns {void}
 */
Connection.prototype.authenticate = function( authParams, callback ) {
	this._authParams = authParams;
	this._authCallback = callback;

	if( this._tooManyAuthAttempts || this._challengeDenied || this._connectionAuthenticationTimeout ) {
		this._client._$onError( C.TOPIC.ERROR, C.EVENT.IS_CLOSED, 'this client\'s connection was closed' );
		return;
	}
	else if( this._deliberateClose === true && this._state === C.CONNECTION_STATE.CLOSED ) {
		this._createEndpoint();
		this._deliberateClose = false;
		return;
	}

	if( this._state === C.CONNECTION_STATE.AWAITING_AUTHENTICATION ) {
		this._sendAuthParams();
	}
};

/**
 * High level send message method. Creates a deepstream message
 * string and invokes the actual send method.
 *
 * @param   {String} topic  One of C.TOPIC
 * @param   {String} action One of C.ACTIONS
 * @param   {[Mixed]} data 	Date that will be added to the message. Primitive values will
 *                          be appended directly, objects and arrays will be serialized as JSON
 *
 * @private
 * @returns {void}
 */
Connection.prototype.sendMsg = function( topic, action, data ) {
	this.send( messageBuilder.getMsg( topic, action, data ) );
};

/**
 * Main method for sending messages. Doesn't send messages instantly,
 * but instead achieves conflation by adding them to the message
 * buffer that will be drained on the next tick
 *
 * @param   {String} message deepstream message
 *
 * @public
 * @returns {void}
 */
Connection.prototype.send = function( message ) {
	this._queuedMessages.push( message );
	this._currentPacketMessageCount++;

	if( this._currentMessageResetTimeout === null ) {
		this._currentMessageResetTimeout = utils.nextTick( this._resetCurrentMessageCount.bind( this ) );
	}

	if( this._state === C.CONNECTION_STATE.OPEN &&
		this._queuedMessages.length < this._options.maxMessagesPerPacket &&
		this._currentPacketMessageCount < this._options.maxMessagesPerPacket ) {
		this._sendQueuedMessages();
	}
	else if( this._sendNextPacketTimeout === null ) {
		this._queueNextPacket();
	}
};

/**
 * Closes the connection. Using this method
 * sets a _deliberateClose flag that will prevent the client from
 * reconnecting.
 *
 * @public
 * @returns {void}
 */
Connection.prototype.close = function() {
	this._deliberateClose = true;
	this._endpoint.close();
};

/**
 * Creates the endpoint to connect to using the url deepstream
 * was initialised with. If running in node automatically uses TCP
 * for better performance
 *
 * @private
 * @returns {void}
 */
Connection.prototype._createEndpoint = function() {
	if( utils.isNode ) {
		this._endpoint = new TcpConnection( this._url );
	} else {
		this._endpoint = engineIoClient( this._url, this._options );
	}

	this._endpoint.on( 'open', this._onOpen.bind( this ) );
	this._endpoint.on( 'error', this._onError.bind( this ) );
	this._endpoint.on( 'close', this._onClose.bind( this ) );
	this._endpoint.on( 'message', this._onMessage.bind( this ) );
};

/**
 * When the implementation tries to send a large
 * number of messages in one execution thread, the first
 * <maxMessagesPerPacket> are send straight away.
 *
 * _currentPacketMessageCount keeps track of how many messages
 * went into that first packet. Once this number has been exceeded
 * the remaining messages are written to a queue and this message
 * is invoked on a timeout to reset the count.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._resetCurrentMessageCount = function() {
	this._currentPacketMessageCount = 0;
	this._currentMessageResetTimeout = null;
};

/**
 * Concatenates the messages in the current message queue
 * and sends them as a single package. This will also
 * empty the message queue and conclude the send process.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._sendQueuedMessages = function() {
	if( this._state !== C.CONNECTION_STATE.OPEN ) {
		return;
	}

	if( this._queuedMessages.length === 0 ) {
		this._sendNextPacketTimeout = null;
		return;
	}

	var message = this._queuedMessages.splice( 0, this._options.maxMessagesPerPacket ).join( '' );

	if( this._queuedMessages.length !== 0 ) {
		this._queueNextPacket();
	} else {
		this._sendNextPacketTimeout = null;
	}

	this._endpoint.send( message );
};

/**
 * Schedules the next packet whilst the connection is under
 * heavy load.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._queueNextPacket = function() {
	var fn = this._sendQueuedMessages.bind( this ),
		delay = this._options.timeBetweenSendingQueuedPackages;

	this._sendNextPacketTimeout = setTimeout( fn, delay );
};

/**
 * Sends authentication params to the server. Please note, this
 * doesn't use the queued message mechanism, but rather sends the message directly
 *
 * @private
 * @returns {void}
 */
Connection.prototype._sendAuthParams = function() {
	this._setState( C.CONNECTION_STATE.AUTHENTICATING );
	var authMessage = messageBuilder.getMsg( C.TOPIC.AUTH, C.ACTIONS.REQUEST, [ this._authParams ] );
	this._endpoint.send( authMessage );
};

/**
 * Will be invoked once the connection is established. The client
 * can't send messages yet, and needs to get a connection ACK or REDIRECT
 * from the server before authenticating
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onOpen = function() {
	this._clearReconnect();
	this._setState( C.CONNECTION_STATE.AWAITING_CONNECTION );
};

/**
 * Callback for generic connection errors. Forwards
 * the error to the client.
 *
 * The connection is considered broken once this method has been
 * invoked.
 *
 * @param   {String|Error} error connection error
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onError = function( error ) {
	this._setState( C.CONNECTION_STATE.ERROR );

	/*
	 * If the implementation isn't listening on the error event this will throw
	 * an error. So let's defer it to allow the reconnection to kick in.
	 */
	setTimeout(function(){
		this._client._$onError( C.TOPIC.CONNECTION, C.EVENT.CONNECTION_ERROR, error.toString() );
	}.bind( this ), 1);
};

/**
 * Callback when the connection closes. This might have been a deliberate
 * close triggered by the client or the result of the connection getting
 * lost.
 *
 * In the latter case the client will try to reconnect using the configured
 * strategy.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onClose = function() {
	if( this._redirecting === true ) {
		this._redirecting = false;
		this._createEndpoint();
	}
	else if( this._deliberateClose === true ) {
		this._setState( C.CONNECTION_STATE.CLOSED );
	}
	else {
		if( this._originalUrl !== this._url ) {
			this._url = this._originalUrl;
			this._createEndpoint();
		}

		this._tryReconnect();
	}
};

/**
 * Callback for messages received on the connection.
 *
 * @param   {String} message deepstream message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onMessage = function( message ) {
	var parsedMessages = messageParser.parse( message, this._client ),
		i;

	for( i = 0; i < parsedMessages.length; i++ ) {
		if( parsedMessages[ i ] === null ) {
			continue;
		}
		else if( parsedMessages[ i ].topic === C.TOPIC.CONNECTION ) {
			this._handleConnectionResponse( parsedMessages[ i ] );
		}
		else if( parsedMessages[ i ].topic === C.TOPIC.AUTH ) {
			this._handleAuthResponse( parsedMessages[ i ] );
		} else {
			this._client._$onMessage( parsedMessages[ i ] );
		}
	}
};

/**
 * The connection response will indicate whether the deepstream connection
 * can be used or if it should be forwarded to another instance. This
 * allows us to introduce load-balancing if needed.
 *
 * If authentication parameters are already provided this will kick of
 * authentication immediately. The actual 'open' event won't be emitted
 * by the client until the authentication is successful.
 *
 * If a challenge is recieved, the user will send the url to the server
 * in response to get the appropriate redirect. If the URL is invalid the
 * server will respond with a REJECTION resulting in the client connection
 * being permanently closed.
 *
 * If a redirect is recieved, this connection is closed and updated with
 * a connection to the url supplied in the message.
 *
 * @param   {Object} message parsed connection message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._handleConnectionResponse = function( message ) {
	var data;

	if( message.action === C.ACTIONS.ACK ) {
		this._setState( C.CONNECTION_STATE.AWAITING_AUTHENTICATION );
		if( this._authParams ) {
			this._sendAuthParams();
		}
	}
	else if( message.action === C.ACTIONS.CHALLENGE ) {
		this._setState( C.CONNECTION_STATE.CHALLENGING );
		this._endpoint.send( messageBuilder.getMsg( C.TOPIC.CONNECTION, C.ACTIONS.CHALLENGE_RESPONSE, [ this._originalUrl ] ) );
	}
	else if( message.action === C.ACTIONS.REJECTION ) {
		this._challengeDenied = true;
		this.close();
	}
	else if( message.action === C.ACTIONS.REDIRECT ) {
		this._url = message.data[ 0 ];
		this._redirecting = true;
		this._endpoint.close();
	}
	else if( message.action === C.ACTIONS.ERROR ) {
		if( message.data[ 0 ] === C.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT ) {
			this._deliberateClose = true;
			this._connectionAuthenticationTimeout = true;
			this._client._$onError( C.TOPIC.CONNECTION, message.data[ 0 ], message.data[ 1 ] );
		}
	}
};

/**
 * Callback for messages received for the AUTH topic. If
 * the authentication was successful this method will
 * open the connection and send all messages that the client
 * tried to send so far.
 *
 * @param   {Object} message parsed auth message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._handleAuthResponse = function( message ) {
	var data;

	if( message.action === C.ACTIONS.ERROR ) {

		if( message.data[ 0 ] === C.EVENT.TOO_MANY_AUTH_ATTEMPTS ) {
			this._deliberateClose = true;
			this._tooManyAuthAttempts = true;
		} else {
			this._setState( C.CONNECTION_STATE.AWAITING_AUTHENTICATION );
		}

		if( this._authCallback ) {
			this._authCallback( false, this._getAuthData( message.data[ 1 ] ) );
		}

	} else if( message.action === C.ACTIONS.ACK ) {
		this._setState( C.CONNECTION_STATE.OPEN );

		if( this._authCallback ) {
			this._authCallback( true, this._getAuthData( message.data[ 0 ] ) );
		}

		this._sendQueuedMessages();
	}
};

/**
 * Checks if data is present with login ack and converts it
 * to the correct type
 *
 * @param {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {object}
 */
Connection.prototype._getAuthData = function( data ) {
	if( data === undefined ) {
		return null;
	} else {
		return messageParser.convertTyped( data, this._client );
	}
};

/**
 * Updates the connection state and emits the
 * connectionStateChanged event on the client
 *
 * @private
 * @returns {void}
 */
Connection.prototype._setState = function( state ) {
	this._state = state;
	this._client.emit( C.EVENT.CONNECTION_STATE_CHANGED, state );
};

/**
 * If the connection drops or is closed in error this
 * method schedules increasing reconnection intervals
 *
 * If the number of failed reconnection attempts exceeds
 * options.maxReconnectAttempts the connection is closed
 *
 * @private
 * @returns {void}
 */
Connection.prototype._tryReconnect = function() {
	if( this._reconnectTimeout !== null ) {
		return;
	}

	if( this._reconnectionAttempt < this._options.maxReconnectAttempts ) {
		this._setState( C.CONNECTION_STATE.RECONNECTING );
		this._reconnectTimeout = setTimeout(
			this._tryOpen.bind( this ),
			Math.min(
				this._options.maxReconnectInterval,
				this._options.reconnectIntervalIncrement * this._reconnectionAttempt
			)
		);
		this._reconnectionAttempt++;
	} else {
		this._clearReconnect();
		this.close();
		this._client.emit( C.MAX_RECONNECTION_ATTEMPTS_REACHED, this._reconnectionAttempt );
	}
};

/**
 * Attempts to open a errourosly closed connection
 *
 * @private
 * @returns {void}
 */
Connection.prototype._tryOpen = function() {
	this._endpoint.open();
	this._reconnectTimeout = null;
};

/**
 * Stops all further reconnection attempts,
 * either because the connection is open again
 * or because the maximal number of reconnection
 * attempts has been exceeded
 *
 * @private
 * @returns {void}
 */
Connection.prototype._clearReconnect = function() {
	clearTimeout( this._reconnectTimeout );
	this._reconnectTimeout = null;
	this._reconnectionAttempt = 0;
};

module.exports = Connection;

},{"../constants/constants":35,"../tcp/tcp-connection":22,"../utils/utils":54,"./message-builder":40,"./message-parser":41,"engine.io-client":10}],40:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	SEP = C.MESSAGE_PART_SEPERATOR;

/**
 * Creates a deepstream message string, based on the 
 * provided parameters
 *
 * @param   {String} topic  One of CONSTANTS.TOPIC
 * @param   {String} action One of CONSTANTS.ACTIONS
 * @param   {Array} data An array of strings or JSON-serializable objects
 *
 * @returns {String} deepstream message string
 */
exports.getMsg = function( topic, action, data ) {
	if( data && !( data instanceof Array ) ) {
		throw new Error( 'data must be an array' );
	}
	var sendData = [ topic, action ],
		i;

	if( data ) {
		for( i = 0; i < data.length; i++ ) {
			if( typeof data[ i ] === 'object' ) {
				sendData.push( JSON.stringify( data[ i ] ) );
			} else {
				sendData.push( data[ i ] );
			}
		}
	}

	return sendData.join( SEP ) + C.MESSAGE_SEPERATOR;
};

/**
 * Converts a serializable value into its string-representation and adds
 * a flag that provides instructions on how to deserialize it.
 * 
 * Please see messageParser.convertTyped for the counterpart of this method
 * 
 * @param {Mixed} value
 * 
 * @public
 * @returns {String} string representation of the value
 */
exports.typed = function( value ) {
	var type = typeof value;
	
	if( type === 'string' ) {
		return C.TYPES.STRING + value;
	}
	
	if( value === null ) {
		return C.TYPES.NULL;
	}
	
	if( type === 'object' ) {
		return C.TYPES.OBJECT + JSON.stringify( value );
	}
	
	if( type === 'number' ) {
		return C.TYPES.NUMBER + value.toString();
	}
	
	if( value === true ) {
		return C.TYPES.TRUE;
	}
	
	if( value === false ) {
		return C.TYPES.FALSE;
	}
	
	if( value === undefined ) {
		return C.TYPES.UNDEFINED;
	}
	
	throw new Error( 'Can\'t serialize type ' + value );
};
},{"../constants/constants":35}],41:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' );

/**
 * Parses ASCII control character seperated
 * message strings into digestable maps
 *
 * @constructor
 */
var MessageParser = function() {
	this._actions = this._getActions();
};

/**
 * Main interface method. Receives a raw message
 * string, containing one or more messages
 * and returns an array of parsed message objects
 * or null for invalid messages
 *
 * @param   {String} message raw message
 *
 * @public
 *
 * @returns {Array} array of parsed message objects
 *                  following the format
 *                  {
 *                  	raw: <original message string>
 *                  	topic: <string>
 *                  	action: <string - shortcode>
 *                  	data: <array of strings>
 *                  }
 */
MessageParser.prototype.parse = function( message, client ) {
	var parsedMessages = [],
		rawMessages = message.split( C.MESSAGE_SEPERATOR ),
		i;

	for( i = 0; i < rawMessages.length; i++ ) {
		if( rawMessages[ i ].length > 2 ) {
			parsedMessages.push( this._parseMessage( rawMessages[ i ], client ) );
		}
	}

	return parsedMessages;
};

/**
 * Deserializes values created by MessageBuilder.typed to
 * their original format
 * 
 * @param {String} value
 *
 * @public
 * @returns {Mixed} original value
 */
MessageParser.prototype.convertTyped = function( value, client ) {
	var type = value.charAt( 0 );
	
	if( type === C.TYPES.STRING ) {
		return value.substr( 1 );
	}
	
	if( type === C.TYPES.OBJECT ) {
		try {
			return JSON.parse( value.substr( 1 ) );
		} catch( e ) {
			client._$onError( C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, e.toString() + '(' + value + ')' );
			return;
		}
	}
	
	if( type === C.TYPES.NUMBER ) {
		return parseFloat( value.substr( 1 ) );
	}
	
	if( type === C.TYPES.NULL ) {
		return null;
	}
	
	if( type === C.TYPES.TRUE ) {
		return true;
	}
	
	if( type === C.TYPES.FALSE ) {
		return false;
	}
	
	if( type === C.TYPES.UNDEFINED ) {
		return undefined;
	}
	
	client._$onError( C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'UNKNOWN_TYPE (' + value + ')' );
};

/**
 * Turns the ACTION:SHORTCODE constants map
 * around to facilitate shortcode lookup
 *
 * @private
 *
 * @returns {Object} actions
 */
MessageParser.prototype._getActions = function() {
	var actions = {},
		key;

	for( key in C.ACTIONS ) {
		actions[ C.ACTIONS[ key ] ] = key;
	}

	return actions;
};

/**
 * Parses an individual message (as oposed to a 
 * block of multiple messages as is processed by .parse())
 *
 * @param   {String} message
 *
 * @private
 * 
 * @returns {Object} parsedMessage
 */
MessageParser.prototype._parseMessage = function( message, client ) {
	var parts = message.split( C.MESSAGE_PART_SEPERATOR ), 
		messageObject = {};

	if( parts.length < 2 ) {
		message.processedError = true;
		client._$onError( C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Insufficiant message parts' );
		return null;
	}

	if( this._actions[ parts[ 1 ] ] === undefined ) {
		message.processedError = true;
		client._$onError( C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Unknown action ' + parts[ 1 ] );
		return null;
	}

	messageObject.raw = message;
	messageObject.topic = parts[ 0 ];
	messageObject.action = parts[ 1 ];
	messageObject.data = parts.splice( 2 );

	return messageObject;
};

module.exports = new MessageParser();
},{"../constants/constants":35}],42:[function(_dereq_,module,exports){
var Record = _dereq_( './record' ),
	EventEmitter = _dereq_( 'component-emitter' );

/**
 * An AnonymousRecord is a record without a predefined name. It
 * acts like a wrapper around an actual record that can
 * be swapped out for another one whilst keeping all bindings intact.
 *
 * Imagine a customer relationship management system with a list of users
 * on the left and a user detail panel on the right. The user detail
 * panel could use the anonymous record to set up its bindings, yet whenever
 * a user is chosen from the list of existing users the anonymous record's
 * setName method is called and the detail panel will update to
 * show the selected user's details
 *
 * @param {RecordHandler} recordHandler
 * 
 * @constructor
 */
var AnonymousRecord = function( recordHandler ) {
	this.name = null;
	this._recordHandler = recordHandler;
	this._record = null;
	this._subscriptions = [];
	this._proxyMethod( 'delete' );
	this._proxyMethod( 'set' );
	this._proxyMethod( 'discard' );
};

EventEmitter( AnonymousRecord.prototype );

/**
 * Proxies the actual record's get method. It is valid
 * to call get prior to setName - if no record exists,
 * the method returns undefined
 *
 * @param   {[String]} path A json path. If non is provided,
 *                          the entire record is returned.
 *
 * @public
 * @returns {mixed}    the value of path or the entire object
 */
AnonymousRecord.prototype.get = function( path ) {
	if( this._record === null ) {
		return undefined;
	}

	return this._record.get( path );
};

/**
 * Proxies the actual record's subscribe method. The same parameters
 * can be used. Can be called prior to setName(). Please note, triggerIfReady
 * will always be set to true to reflect changes in the underlying record.
 *
 * @param   {[String]} path 	A json path. If non is provided,
 *	                          	it subscribes to changes for the entire record.
 *
 * @param 	{Function} callback A callback function that will be invoked whenever
 *                              the subscribed path or record updates
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.subscribe = function() {
	var parameters = Record.prototype._normalizeArguments( arguments );
	parameters.triggerNow = true;
	this._subscriptions.push( parameters );

	if( this._record !== null ) {
		this._record.subscribe( parameters );
	}
};

/**
 * Proxies the actual record's unsubscribe method. The same parameters
 * can be used. Can be called prior to setName()
 *
 * @param   {[String]} path 	A json path. If non is provided,
 *	                          	it subscribes to changes for the entire record.
 *
 * @param 	{Function} callback A callback function that will be invoked whenever
 *                              the subscribed path or record updates
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.unsubscribe = function() {
	var parameters = Record.prototype._normalizeArguments( arguments ),
		subscriptions = [],
		i;

	for( i = 0; i < this._subscriptions.length; i++ ) {
		if(
			this._subscriptions[ i ].path !== parameters.path ||
			this._subscriptions[ i ].callback !== parameters.callback
		) {
			subscriptions.push( this._subscriptions[ i ] );
		}
	}

	this._subscriptions = subscriptions;

	if( this._record !== null ) {
		this._record.unsubscribe( parameters );
	}
};

/**
 * Sets the underlying record the anonymous record is bound
 * to. Can be called multiple times.
 *
 * @param {String} recordName
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.setName = function( recordName ) {
	this.name = recordName;
	
	var i;

	if( this._record !== null && !this._record.isDestroyed) {
		for( i = 0; i < this._subscriptions.length; i++ ) {
			this._record.unsubscribe( this._subscriptions[ i ] );
		}
		this._record.discard();
	}

	this._record = this._recordHandler.getRecord( recordName );

	for( i = 0; i < this._subscriptions.length; i++ ) {
		this._record.subscribe( this._subscriptions[ i ] );
	}

	this._record.whenReady( this.emit.bind( this, 'ready' ) );
	this.emit( 'nameChanged', recordName );
};

/**
 * Adds the specified method to this method and forwards it
 * to _callMethodOnRecord
 *
 * @param   {String} methodName
 *
 * @private
 * @returns {void}
 */
AnonymousRecord.prototype._proxyMethod = function( methodName ) {
	this[ methodName ] = this._callMethodOnRecord.bind( this, methodName );
};

/**
 * Invokes the specified method with the provided parameters on
 * the underlying record. Throws erros if the method is not
 * specified yet or doesn't expose the method in question
 *
 * @param   {String} methodName
 *
 * @private
 * @returns {Mixed} the return value of the actual method
 */
AnonymousRecord.prototype._callMethodOnRecord = function( methodName ) {
	if( this._record === null ) {
		throw new Error( 'Can`t invoke ' + methodName + '. AnonymousRecord not initialised. Call setName first' );
	}

	if( typeof this._record[ methodName ] !== 'function' ) {
		throw new Error( methodName + ' is not a method on the record' );
	}

	var args = Array.prototype.slice.call( arguments, 1 );

	return this._record[ methodName ].apply( this._record, args );
};

module.exports = AnonymousRecord;
},{"./record":46,"component-emitter":6}],43:[function(_dereq_,module,exports){
var utils = _dereq_( '../utils/utils' );
var PARTS_REG_EXP = /([^\.\[\]\s]+)/g;

var cache = Object.create( null );

/**
 * Returns the value of the path or
 * undefined if the path can't be resolved
 *
 * @public
 * @returns {Mixed}
 */
module.exports.get = function ( data, path, deepCopy ) {
	var tokens = tokenize( path );

	for( var i = 0; i < tokens.length; i++ ) {
		if ( data === undefined ) {
			return undefined;
		}
		if ( typeof data !== 'object' ) {
			throw new Error( 'invalid data or path' );
		}
		data = data[ tokens[ i ] ];
	}

	return deepCopy !== false ? utils.deepCopy( data ) : data;
};

/**
 * Sets the value of the path. If the path (or parts
 * of it) doesn't exist yet, it will be created
 *
 * @param {Mixed} value
 *
 * @public
 * @returns {Mixed} updated value
 */
module.exports.set = function( data, path, value, deepCopy ) {
	var tokens = tokenize( path );

	if ( tokens.length === 0 ) {
		return patch( data, value, deepCopy );
	}

	var oldValue = module.exports.get( data, path, false );
	var newValue = patch( oldValue, value, deepCopy );

	if ( newValue === oldValue ) {
		return data;
	}

	var result = utils.shallowCopy( data );

	var node = result;
	for( var i = 0; i < tokens.length; i++ ) {
		if ( i === tokens.length - 1) {
			node[ tokens[ i ] ] = newValue;
		}
		else if( node[ tokens[ i ] ] !== undefined ) {
			node = node[ tokens[ i ] ] = utils.shallowCopy( node[ tokens[ i ] ] );
		}
		else if( tokens[ i + 1 ] && !isNaN( tokens[ i + 1 ] ) ){
			node = node[ tokens[ i ] ] = [];
		}
		else {
			node = node[ tokens[ i ] ] = Object.create( null );
		}
	}

	return result;
};

/**
 * Merge the new value into the old value
 * @param  {Mixed} oldValue
 * @param  {Mixed} newValue
 * @param  {boolean} deepCopy
 * @return {Mixed}
 */
function patch( oldValue, newValue, deepCopy ) {
	var i;

	if ( utils.deepEquals( oldValue, newValue ) ) {
		return oldValue;
	}
	else if ( Array.isArray( oldValue ) && Array.isArray( newValue ) ) {
		var arr = [];
		for ( i = 0; i < newValue.length; i++ ) {
			arr[ i ] = patch( oldValue[ i ], newValue[ i ], deepCopy );
		}
		return arr;
	}
	else if ( !Array.isArray( newValue ) && typeof oldValue === 'object' && typeof newValue === 'object' ) {
		var props = Object.keys( newValue );
		var obj = Object.create( null );
		for ( i = 0; i < props.length; i++ ) {
			obj[ props[ i ] ] = patch( oldValue[ props[ i ] ], newValue[ props[ i ] ], deepCopy );
		}
		return obj;
	}
	else {
		return deepCopy !== false ? utils.deepCopy( newValue ) : newValue;
	}
}

/**
 * Parses the path. Splits it into
 * keys for objects and indices for arrays.
 *
 * @returns Array of tokens
 */
function tokenize( path ) {
	if ( cache[ path ] ) {
		return cache[ path ];
	}

	var parts = String(path) !== 'undefined' ? String( path ).match(PARTS_REG_EXP) : [];

	if ( !parts ) {
		throw new Error('invalid path ' + path)
	}

	return cache[ path ] = parts.map( function( part ) {
		return !isNaN( part ) ? parseInt( part, 10 ) : part;
	} );
};

},{"../utils/utils":54}],44:[function(_dereq_,module,exports){
var EventEmitter = _dereq_( 'component-emitter' ),
	Record = _dereq_( './record' ),
	C = _dereq_( '../constants/constants' ),
	ENTRY_ADDED_EVENT = 'entry-added',
	ENTRY_REMOVED_EVENT = 'entry-removed',
	ENTRY_MOVED_EVENT = 'entry-moved';

/**
 * A List is a specialised Record that contains
 * an Array of recordNames and provides a number
 * of convinience methods for interacting with them.
 *
 * @param {RecordHanlder} recordHandler
 * @param {String} name    The name of the list
 *
 * @constructor
 */
var List = function( recordHandler, name, options ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}

	this._recordHandler = recordHandler;
	this._record = this._recordHandler.getRecord( name, options );
	this._record._applyUpdate = this._applyUpdate.bind( this );

	this._record.on( 'delete', this.emit.bind( this, 'delete' ) );
	this._record.on( 'discard', this._onDiscard.bind( this ) );
	this._record.on( 'ready', this._onReady.bind( this ) );

	this.isDestroyed = this._record.isDestroyed;
	this.isReady = this._record.isReady;
	this.name = name;
	this._queuedMethods = [];
	this._beforeStructure = null;
	this._hasAddListener = null;
	this._hasRemoveListener = null;
	this._hasMoveListener = null;

	this.delete = this._record.delete.bind( this._record );
	this.discard = this._record.discard.bind( this._record );
	this.whenReady = this._record.whenReady.bind( this );
};

EventEmitter( List.prototype );

/**
 * Returns the array of list entries or an
 * empty array if the list hasn't been populated yet.
 *
 * @public
 * @returns {Array} entries
 */
List.prototype.getEntries = function() {
	var entries = this._record.get();

	if( !( entries instanceof Array ) ) {
		return [];
	}

	return entries;
};

/**
 * Returns true if the list is empty
 *
 * @public
 * @returns {Boolean} isEmpty
 */
List.prototype.isEmpty = function() {
	return this.getEntries().length === 0;
};

/**
 * Updates the list with a new set of entries
 *
 * @public
 * @param {Array} entries
 */
List.prototype.setEntries = function( entries ) {
	var errorMsg = 'entries must be an array of record names',
		i;

	if( !( entries instanceof Array ) ) {
		throw new Error( errorMsg );
	}

	for( i = 0; i < entries.length; i++ ) {
		if( typeof entries[ i ] !== 'string' ) {
			throw new Error( errorMsg );
		}
	}

	if( this._record.isReady === false ) {
		this._queuedMethods.push( this.setEntries.bind( this, entries ) );
	} else {
		this._beforeChange();
		this._record.set( entries );
		this._afterChange();
	}
};

/**
 * Removes an entry from the list
 *
 * @param   {String} entry
 * @param {Number} [index]
 *
 * @public
 * @returns {void}
 */
List.prototype.removeEntry = function( entry, index ) {
	if( this._record.isReady === false ) {
		this._queuedMethods.push( this.removeEntry.bind( this, entry ) );
		return;
	}

	var currentEntries = this._record.get(),
		hasIndex = this._hasIndex( index ),
		entries = [],
		i;

	for( i = 0; i < currentEntries.length; i++ ) {
		if( currentEntries[i] !== entry || ( hasIndex && index !== i ) ) {
			entries.push( currentEntries[i] );
		}
	}
	this._beforeChange();
	this._record.set( entries );
	this._afterChange();
};

/**
 * Adds an entry to the list
 *
 * @param {String} entry
 * @param {Number} [index]
 *
 * @public
 * @returns {void}
 */
List.prototype.addEntry = function( entry, index ) {
	if( typeof entry !== 'string' ) {
		throw new Error( 'Entry must be a recordName' );
	}

	if( this._record.isReady === false ) {
		this._queuedMethods.push( this.addEntry.bind( this, entry ) );
		return;
	}

	var hasIndex = this._hasIndex( index );
	var entries = this.getEntries();
	if( hasIndex ) {
		entries.splice( index, 0, entry );
	} else {
		entries.push( entry );
	}
	this._beforeChange();
	this._record.set( entries );
	this._afterChange();
};

/**
 * Proxies the underlying Record's subscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.subscribe = function() {
	var parameters = Record.prototype._normalizeArguments( arguments );

	if( parameters.path ) {
		throw new Error( 'path is not supported for List.subscribe' );
	}

	//Make sure the callback is invoked with an empty array for new records
	var listCallback = function( callback ) {
		callback( this.getEntries() );
	}.bind( this, parameters.callback );

	/**
	* Adding a property onto a function directly is terrible practice,
	* and we will change this as soon as we have a more seperate approach
	* of creating lists that doesn't have records default state.
	*
	* The reason we are holding a referencing to wrapped array is so that
	* on unsubscribe it can provide a reference to the actual method the
	* record is subscribed too.
	**/
	parameters.callback.wrappedCallback = listCallback;
	parameters.callback = listCallback;

	this._record.subscribe( parameters );
};

/**
 * Proxies the underlying Record's unsubscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.unsubscribe = function() {
	var parameters = Record.prototype._normalizeArguments( arguments );

	if( parameters.path ) {
		throw new Error( 'path is not supported for List.unsubscribe' );
	}

	parameters.callback = parameters.callback.wrappedCallback;
	this._record.unsubscribe( parameters );
};

/**
 * Listens for changes in the Record's ready state
 * and applies them to this list
 *
 * @private
 * @returns {void}
 */
List.prototype._onReady = function() {
	this.isReady = true;

	for( var i = 0; i < this._queuedMethods.length; i++ ) {
		this._queuedMethods[ i ]();
	}

	this.emit( 'ready' );
};

/**
 * Listens for the record discard event and applies
 * changes to list
 *
 * @private
 * @returns {void}
 */
List.prototype._onDiscard = function() {
	this.isDestroyed = true;
	this.emit( 'discard' );
};

/**
 * Proxies the underlying Record's _update method. Set's
 * data to an empty array if no data is provided.
 *
 * @param   {null}   path must (should :-)) be null
 * @param   {Array}  data
 *
 * @private
 * @returns {void}
 */
List.prototype._applyUpdate = function( message ) {
	if( message.action === C.ACTIONS.PATCH ) {
		throw new Error( 'PATCH is not supported for Lists' );
	}

	if( message.data[ 2 ].charAt( 0 ) !== '[' ) {
		message.data[ 2 ] = '[]';
	}

	this._beforeChange();
	Record.prototype._applyUpdate.call( this._record, message );
	this._afterChange();
};

/**
 * Validates that the index provided is within the current set of entries.
 *
 * @param {Number} index
 *
 * @private
 * @returns {Number}
 */
List.prototype._hasIndex = function( index ) {
	var hasIndex = false;
	var entries = this.getEntries();
	if( index !== undefined ) {
		if( isNaN( index ) ) {
			throw new Error( 'Index must be a number' );
		}
		if( index !== entries.length && ( index >= entries.length || index < 0 ) ) {
			throw new Error( 'Index must be within current entries' );
		}
		hasIndex = true;
	}
	return hasIndex;
};

/**
 * Establishes the current structure of the list, provided the client has attached any
 * add / move / remove listener
 *
 * This will be called before any change to the list, regardsless if the change was triggered
 * by an incoming message from the server or by the client
 *
 * @private
 * @returns {void}
 */
List.prototype._beforeChange = function() {
	this._hasAddListener = this.listeners( ENTRY_ADDED_EVENT ).length > 0;
	this._hasRemoveListener = this.listeners( ENTRY_REMOVED_EVENT ).length > 0;
	this._hasMoveListener = this.listeners( ENTRY_MOVED_EVENT ).length > 0;

	if( this._hasAddListener || this._hasRemoveListener || this._hasMoveListener ) {
		this._beforeStructure = this._getStructure();
	} else {
		this._beforeStructure = null;
	}
};

/**
 * Compares the structure of the list after a change to its previous structure and notifies
 * any add / move / remove listener. Won't do anything if no listeners are attached.
 *
 * @private
 * @returns {void}
 */
List.prototype._afterChange = function() {
	if( this._beforeStructure === null ) {
		return;
	}

	var after = this._getStructure();
	var before = this._beforeStructure;
	var entry, i;

	if( this._hasRemoveListener ) {
		for( entry in before ) {
			for( i = 0; i < before[ entry ].length; i++ ) {
				if( after[ entry ] === undefined || after[ entry ][ i ] === undefined ) {
					this.emit( ENTRY_REMOVED_EVENT, entry, before[ entry ][ i ] );
				}
			}
		}
	}

	if( this._hasAddListener || this._hasMoveListener ) {
		for( entry in after ) {
			if( before[ entry ] === undefined ) {
				for( i = 0; i < after[ entry ].length; i++ ) {
					this.emit( ENTRY_ADDED_EVENT, entry, after[ entry ][ i ] );
				}
			} else {
				for( i = 0; i < after[ entry ].length; i++ ) {
					if( before[ entry ][ i ] !== after[ entry ][ i ] ) {
						if( before[ entry ][ i ] === undefined ) {
							this.emit( ENTRY_ADDED_EVENT, entry, after[ entry ][ i ] );
						} else {
							this.emit( ENTRY_MOVED_EVENT, entry, after[ entry ][ i ] );
						}
					}
				}
			}
		}
	}
};

/**
 * Iterates through the list and creates a map with the entry as a key
 * and an array of its position(s) within the list as a value, e.g.
 *
 * {
 * 	'recordA': [ 0, 3 ],
 * 	'recordB': [ 1 ],
 * 	'recordC': [ 2 ]
 * }
 *
 * @private
 * @returns {Array} structure
 */
List.prototype._getStructure = function() {
	var structure = {};
	var i;
	var entries = this._record.get();

	for( i = 0; i < entries.length; i++ ) {
		if( structure[ entries[ i ] ] === undefined ) {
			structure[ entries[ i ] ] = [ i ];
		} else {
			structure[ entries[ i ] ].push( i );
		}
	}

	return structure;
};

module.exports = List;

},{"../constants/constants":35,"./record":46,"component-emitter":6}],45:[function(_dereq_,module,exports){
var Record = _dereq_( './record' ),
	AnonymousRecord = _dereq_( './anonymous-record' ),
	List = _dereq_( './list' ),
	Listener = _dereq_( '../utils/listener' ),
	SingleNotifier = _dereq_( '../utils/single-notifier' ),
	C = _dereq_( '../constants/constants' ),
	messageParser = _dereq_( '../message/message-parser' ),
	EventEmitter = _dereq_( 'component-emitter' );

/**
 * A collection of factories for records. This class
 * is exposed as client.record
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 */
var RecordHandler = function( options, connection, client ) {
	this._options = options;
	this._connection = connection;
	this._client = client;
	this._records = {};
	this._lists = {};
	this._listener = {};
	this._destroyEventEmitter = new EventEmitter();

	this._hasRegistry = new SingleNotifier( client, connection, C.TOPIC.RECORD, C.ACTIONS.HAS, this._options.recordReadTimeout );
	this._snapshotRegistry = new SingleNotifier( client, connection, C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, this._options.recordReadTimeout );
};

/**
 * Returns an existing record or creates a new one.
 *
 * @param   {String} name          		the unique name of the record
 * @param   {[Object]} recordOptions 	A map of parameters for this particular record.
 *                                    	{ persist: true }
 *
 * @public
 * @returns {Record}
 */
RecordHandler.prototype.getRecord = function( name, recordOptions ) {
	if( !this._records[ name ] ) {
		this._records[ name ] = new Record( name, recordOptions || {}, this._connection, this._options, this._client );
		this._records[ name ].on( 'error', this._onRecordError.bind( this, name ) );
		this._records[ name ].on( 'destroyPending', this._onDestroyPending.bind( this, name ) );
		this._records[ name ].on( 'delete', this._removeRecord.bind( this, name ) );
		this._records[ name ].on( 'discard', this._removeRecord.bind( this, name ) );
	}

	this._records[ name ].usages++;

	return this._records[ name ];
};

/**
 * Returns an existing List or creates a new one. A list is a specialised
 * type of record that holds an array of recordNames.
 *
 * @param   {String} name       the unique name of the list
 * @param   {[Object]} options 	A map of parameters for this particular list.
 *                              { persist: true }
 *
 * @public
 * @returns {List}
 */
RecordHandler.prototype.getList = function( name, options ) {
	if( !this._lists[ name ] ) {
		this._lists[ name ] = new List( this, name, options );
	} else {
		this._records[ name ].usages++;
	}
	return this._lists[ name ];
};

/**
 * Returns an anonymous record. A anonymous record is effectively
 * a wrapper that mimicks the API of a record, but allows for the
 * underlying record to be swapped without loosing subscriptions etc.
 *
 * This is particularly useful when selecting from a number of similarly
 * structured records. E.g. a list of users that can be choosen from a list
 *
 * The only API difference to a normal record is an additional setName( name ) method.
 *
 *
 * @public
 * @returns {AnonymousRecord}
 */
RecordHandler.prototype.getAnonymousRecord = function() {
	return new AnonymousRecord( this );
};

/**
 * Allows to listen for record subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular record if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
RecordHandler.prototype.listen = function( pattern, callback ) {
	if ( typeof pattern !== 'string' || pattern.length === 0 ) {
		throw new Error( 'invalid argument pattern' );
	}
	if ( typeof callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	if( this._listener[ pattern ] && !this._listener[ pattern ].destroyPending ) {
		return this._client._$onError( C.TOPIC.RECORD, C.EVENT.LISTENER_EXISTS, pattern );
	}

	if( this._listener[ pattern ] ) {
		this._listener[ pattern ].destroy();
	}
	this._listener[ pattern ] = new Listener( C.TOPIC.RECORD, pattern, callback, this._options, this._client, this._connection );
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
RecordHandler.prototype.unlisten = function( pattern ) {
	if ( typeof pattern !== 'string' || pattern.length === 0 ) {
		throw new Error( 'invalid argument pattern' );
	}

	var listener = this._listener[ pattern ];
	if( listener && !listener.destroyPending ) {
		listener.sendDestroy();
	} else if( this._listener[ pattern ] ) {
		this._listener[ pattern ].destroy();
		delete this._listener[ pattern ];
	} else {
		this._client._$onError( C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern );
	}
};

/**
 * Retrieve the current record data without subscribing to changes
 *
 * @param   {String}	name the unique name of the record
 * @param   {Function}	callback
 *
 * @public
 */
RecordHandler.prototype.snapshot = function( name, callback ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}

	if( this._records[ name ] && this._records[ name ].isReady ) {
		callback( null, this._records[ name ].get() );
	} else {
		this._snapshotRegistry.request( name, callback );
	}
};

/**
 * Allows the user to query to see whether or not the record exists.
 *
 * @param   {String}	name the unique name of the record
 * @param   {Function}	callback
 *
 * @public
 */
RecordHandler.prototype.has = function( name, callback ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}

	if( this._records[ name ] ) {
		callback( null, true );
	} else {
		this._hasRegistry.request( name, callback );
	}
};

/**
 * Will be called by the client for incoming messages on the RECORD topic
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
RecordHandler.prototype._$handle = function( message ) {
	var name;

	if( message.action === C.ACTIONS.ERROR &&
		( message.data[ 0 ] !== C.EVENT.VERSION_EXISTS &&
			message.data[ 0 ] !== C.ACTIONS.SNAPSHOT &&
			message.data[ 0 ] !== C.ACTIONS.HAS  &&
			message.data[ 0 ] !== C.EVENT.MESSAGE_DENIED
		)
	) {
		message.processedError = true;
		this._client._$onError( C.TOPIC.RECORD, message.data[ 0 ], message.data[ 1 ] );
		return;
	}

	if( message.action === C.ACTIONS.ACK || message.action === C.ACTIONS.ERROR ) {
		name = message.data[ 1 ];

		/*
		 * The following prevents errors that occur when a record is discarded or deleted and
		 * recreated before the discard / delete ack message is received.
		 *
		 * A (presumably unsolvable) problem remains when a client deletes a record in the exact moment
		 * between another clients creation and read message for the same record
		 */
		if( message.data[ 0 ] === C.ACTIONS.DELETE ||
			  message.data[ 0 ] === C.ACTIONS.UNSUBSCRIBE ||
			 ( message.data[ 0 ] === C.EVENT.MESSAGE_DENIED && message.data[ 2 ] === C.ACTIONS.DELETE  )
			) {
			this._destroyEventEmitter.emit( 'destroy_ack_' + name, message );

			if( message.data[ 0 ] === C.ACTIONS.DELETE && this._records[ name ] ) {
				this._records[ name ]._$onMessage( message );
			}

			return;
		}

		if( message.data[ 0 ] === C.ACTIONS.SNAPSHOT ) {
			message.processedError = true;
			this._snapshotRegistry.recieve( name, message.data[ 2 ] );
			return;
		}

		if( message.data[ 0 ] === C.ACTIONS.HAS ) {
			message.processedError = true;
			this._snapshotRegistry.recieve( name, message.data[ 2 ] );
			return;
		}

	} else {
		name = message.data[ 0 ];
	}

	var processed = false;

	if( this._records[ name ] ) {
		processed = true;
		this._records[ name ]._$onMessage( message );
	}

	if( message.action === C.ACTIONS.READ && this._snapshotRegistry.hasRequest( name ) ) {
		processed = true;
		this._snapshotRegistry.recieve( name, null, JSON.parse( message.data[ 2 ] ) );
	}

	if( message.action === C.ACTIONS.HAS && this._hasRegistry.hasRequest( name ) ) {
		processed = true;
		this._hasRegistry.recieve( name, null, messageParser.convertTyped( message.data[ 1 ] ) );
	}

	if( message.action === C.ACTIONS.ACK && message.data[ 0 ] === C.ACTIONS.UNLISTEN &&
		this._listener[ name ] && this._listener[ name ].destroyPending
	) {
		processed = true;
		this._listener[ name ].destroy();
		delete this._listener[ name ];
	} else if( this._listener[ name ] ) {
		processed = true;
		this._listener[ name ]._$onMessage( message );
	} else if( message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED ) {
		// An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
		processed = true;
	}  else if( message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER ) {
		// record can receive a HAS_PROVIDER after discarding the record
		processed = true;
	}

	if( !processed ) {
		message.processedError = true;
		this._client._$onError( C.TOPIC.RECORD, C.EVENT.UNSOLICITED_MESSAGE, name );
	}
};

/**
 * Callback for 'error' events from the record.
 *
 * @param   {String} recordName
 * @param   {String} error
 *
 * @private
 * @returns {void}
 */
RecordHandler.prototype._onRecordError = function( recordName, error ) {
	this._client._$onError( C.TOPIC.RECORD, error, recordName );
};

/**
 * When the client calls discard or delete on a record, there is a short delay
 * before the corresponding ACK message is received from the server. To avoid
 * race conditions if the record is re-requested straight away the old record is
 * removed from the cache straight awy and will only listen for one last ACK message
 *
 * @param   {String} recordName The name of the record that was just deleted / discarded
 *
 * @private
 * @returns {void}
 */
RecordHandler.prototype._onDestroyPending = function( recordName ) {
	if ( !this._records[ recordName ] ) {
		this.emit( 'error', 'Record \'' + recordName + '\' does not exists' );
		return;
	}
	var onMessage = this._records[ recordName ]._$onMessage.bind( this._records[ recordName ] );
	this._destroyEventEmitter.once( 'destroy_ack_' + recordName, onMessage );
	this._removeRecord( recordName );
};

/**
 * Callback for 'deleted' and 'discard' events from a record. Removes the record from
 * the registry
 *
 * @param   {String} recordName
 *
 * @returns {void}
 */
RecordHandler.prototype._removeRecord = function( recordName ) {
	delete this._records[ recordName ];
	delete this._lists[ recordName ];
};

module.exports = RecordHandler;

},{"../constants/constants":35,"../message/message-parser":41,"../utils/listener":51,"../utils/single-notifier":53,"./anonymous-record":42,"./list":44,"./record":46,"component-emitter":6}],46:[function(_dereq_,module,exports){
var jsonPath = _dereq_( './json-path' ),
	utils = _dereq_( '../utils/utils' ),
	ResubscribeNotifier = _dereq_( '../utils/resubscribe-notifier' ),
	EventEmitter = _dereq_( 'component-emitter' ),
	C = _dereq_( '../constants/constants' ),
	messageBuilder = _dereq_( '../message/message-builder' ),
	messageParser = _dereq_( '../message/message-parser' );

/**
 * This class represents a single record - an observable
 * dataset returned by client.record.getRecord()
 *
 * @extends {EventEmitter}
 *
 * @param {String} name          		The unique name of the record
 * @param {Object} recordOptions 		A map of options, e.g. { persist: true }
 * @param {Connection} Connection		The instance of the server connection
 * @param {Object} options				Deepstream options
 * @param {Client} client				deepstream.io client
 *
 * @constructor
 */
var Record = function( name, recordOptions, connection, options, client ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}

	this.name = name;
	this.usages = 0;
	this._recordOptions = recordOptions;
	this._connection = connection;
	this._client = client;
	this._options = options;
	this.isReady = false;
	this.isDestroyed = false;
	this.hasProvider = false;
	this._$data = Object.create( null );
	this.version = null;
	this._eventEmitter = new EventEmitter();
	this._queuedMethodCalls = [];

	this._mergeStrategy = null;
	if( options.mergeStrategy ) {
		this.setMergeStrategy( options.mergeStrategy );
	}

	this._resubscribeNotifier = new ResubscribeNotifier( this._client, this._sendRead.bind( this ) );
	this._readAckTimeout = setTimeout( this._onTimeout.bind( this, C.EVENT.ACK_TIMEOUT ), this._options.recordReadAckTimeout );
	this._readTimeout = setTimeout( this._onTimeout.bind( this, C.EVENT.RESPONSE_TIMEOUT ), this._options.recordReadTimeout );
	this._sendRead();
};

EventEmitter( Record.prototype );

/**
 * Set a merge strategy to resolve any merge conflicts that may occur due
 * to offline work or write conflicts. The function will be called with the
 * local record, the remote version/data and a callback to call once the merge has
 * completed or if an error occurs ( which leaves it in an inconsistent state until
 * the next update merge attempt ).
 *
 * @param   {Function} mergeStrategy A Function that can resolve merge issues.
 *
 * @public
 * @returns {void}
 */
Record.prototype.setMergeStrategy = function( mergeStrategy ) {
	if( typeof mergeStrategy === 'function' ) {
		this._mergeStrategy = mergeStrategy;
	} else {
		throw new Error( 'Invalid merge strategy: Must be a Function' );
	}
};


/**
 * Returns a copy of either the entire dataset of the record
 * or - if called with a path - the value of that path within
 * the record's dataset.
 *
 * Returning a copy rather than the actual value helps to prevent
 * the record getting out of sync due to unintentional changes to
 * its data
 *
 * @param   {[String]} path A JSON path, e.g. users[ 2 ].firstname
 *
 * @public
 * @returns {Mixed} value
 */
Record.prototype.get = function( path ) {
	return jsonPath.get( this._$data, path, this._options.recordDeepCopy );
};

/**
 * Sets the value of either the entire dataset
 * or of a specific path within the record
 * and submits the changes to the server
 *
 * If the new data is equal to the current data, nothing will happen
 *
 * @param {[String|Object]} pathOrData Either a JSON path when called with two arguments or the data itself
 * @param {Object} data     The data that should be stored in the record
 *
 * @public
 * @returns {void}
 */
Record.prototype.set = function( pathOrData, data ) {
	if( arguments.length === 1 && typeof pathOrData !== 'object' ) {
		throw new Error( 'invalid argument data' );
	}
	if( arguments.length === 2 && ( typeof pathOrData !== 'string' || pathOrData.length === 0 ) ) {
		throw new Error( 'invalid argument path' )
	}

	if( this._checkDestroyed( 'set' ) ) {
		return this;
	}

	if( !this.isReady ) {
		this._queuedMethodCalls.push({ method: 'set', args: arguments });
		return this;
	}

	var path = arguments.length === 1 ? undefined : pathOrData;
	data = path ? data : pathOrData;

	var oldValue = this._$data;
	var newValue = jsonPath.set( oldValue, path, data, this._options.recordDeepCopy );

	if ( oldValue === newValue ) {
		return this;
	}

	this._sendUpdate( path, data );
	this._applyChange( newValue );
	return this;
};

/**
 * Subscribes to changes to the records dataset.
 *
 * Callback is the only mandatory argument.
 *
 * When called with a path, it will only subscribe to updates
 * to that path, rather than the entire record
 *
 * If called with true for triggerNow, the callback will
 * be called immediatly with the current value
 *
 * @param   {[String]}		path			A JSON path within the record to subscribe to
 * @param   {Function} 		callback       	Callback function to notify on changes
 * @param   {[Boolean]}		triggerNow      A flag to specify whether the callback should be invoked immediatly
 *                                       	with the current value
 *
 * @public
 * @returns {void}
 */
Record.prototype.subscribe = function( path, callback, triggerNow ) {
	var args = this._normalizeArguments( arguments );

	if ( args.path !== undefined && ( typeof args.path !== 'string' || args.path.length === 0 ) ) {
		throw new Error( 'invalid argument path' );
	}
	if ( typeof args.callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	if( this._checkDestroyed( 'subscribe' ) ) {
		return;
	}

	if( args.triggerNow ) {
		this.whenReady( function () {
			this._eventEmitter.on( args.path, args.callback );
			args.callback( this.get( args.path ) );
		}.bind(this) );
	} else {
		this._eventEmitter.on( args.path, args.callback );
	}
};

/**
 * Removes a subscription that was previously made using record.subscribe()
 *
 * Can be called with a path to remove the callback for this specific
 * path or only with a callback which removes it from the generic subscriptions
 *
 * Please Note: unsubscribe is a purely client side operation. If the app is no longer
 * interested in receiving updates for this record from the server it needs to call
 * discard instead
 *
 * @param   {[String|Function]}   pathOrCallback A JSON path
 * @param   {Function} 			  callback   	The callback method. Please note, if a bound method was passed to
 *                                	   			subscribe, the same method must be passed to unsubscribe as well.
 *
 * @public
 * @returns {void}
 */
Record.prototype.unsubscribe = function( pathOrCallback, callback ) {
	var args = this._normalizeArguments( arguments );

	if ( args.path !== undefined && ( typeof args.path !== 'string' || args.path.length === 0 ) ) {
		throw new Error( 'invalid argument path' );
	}
	if ( args.callback !== undefined && typeof args.callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	if( this._checkDestroyed( 'unsubscribe' ) ) {
		return;
	}
	this._eventEmitter.off( args.path, args.callback );
};

/**
 * Removes all change listeners and notifies the server that the client is
 * no longer interested in updates for this record
 *
 * @public
 * @returns {void}
 */
Record.prototype.discard = function() {
	if( this._checkDestroyed( 'discard' ) ) {
		return;
	}
	this.whenReady( function() {
		this.usages--;
		if( this.usages <= 0 ) {
				this.emit( 'destroyPending' );
				this._discardTimeout = setTimeout( this._onTimeout.bind( this, C.EVENT.ACK_TIMEOUT ), this._options.subscriptionTimeout );
				this._connection.sendMsg( C.TOPIC.RECORD, C.ACTIONS.UNSUBSCRIBE, [ this.name ] );
		}
	}.bind( this ) );
};

/**
 * Deletes the record on the server.
 *
 * @public
 * @returns {void}
 */
Record.prototype.delete = function() {
	if( this._checkDestroyed( 'delete' ) ) {
		return;
	}
	this.whenReady( function() {
		this.emit( 'destroyPending' );
		this._deleteAckTimeout = setTimeout( this._onTimeout.bind( this, C.EVENT.DELETE_TIMEOUT ), this._options.recordDeleteTimeout );
		this._connection.sendMsg( C.TOPIC.RECORD, C.ACTIONS.DELETE, [ this.name ] );
	}.bind( this ) );
};

/**
 * Convenience method, similar to promises. Executes callback
 * whenever the record is ready, either immediatly or once the ready
 * event is fired
 *
 * @param   {Function} callback Will be called when the record is ready
 *
 * @returns {void}
 */
Record.prototype.whenReady = function( callback ) {
	if( this.isReady === true ) {
		callback( this );
	} else {
		this.once( 'ready', callback.bind( this, this ) );
	}
};

/**
 * Callback for incoming messages from the message handler
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
Record.prototype._$onMessage = function( message ) {
	if( message.action === C.ACTIONS.READ ) {
		if( this.version === null ) {
			clearTimeout( this._readTimeout );
			this._onRead( message );
		} else {
			this._applyUpdate( message, this._client );
		}
	}
	else if( message.action === C.ACTIONS.ACK ) {
		this._processAckMessage( message );
	}
	else if( message.action === C.ACTIONS.UPDATE || message.action === C.ACTIONS.PATCH ) {
		this._applyUpdate( message, this._client );
	}
	// Otherwise it should be an error, and dealt with accordingly
	else if( message.data[ 0 ] === C.EVENT.VERSION_EXISTS ) {
		this._recoverRecord( message.data[ 2 ], JSON.parse( message.data[ 3 ] ), message );
	}
	else if( message.data[ 0 ] === C.EVENT.MESSAGE_DENIED ) {
		this._clearTimeouts();
	} else if( message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER ) {
		var hasProvider = messageParser.convertTyped( message.data[ 1 ], this._client );
		this.hasProvider = hasProvider;
		this.emit( 'hasProviderChanged', hasProvider );
	}
};

/**
 * Called when a merge conflict is detected by a VERSION_EXISTS error or if an update recieved
 * is directly after the clients. If no merge strategy is configure it will emit a VERSION_EXISTS
 * error and the record will remain in an inconsistent state.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._recoverRecord = function( remoteVersion, remoteData, message ) {
	message.processedError = true;
	if( this._mergeStrategy ) {
		this._mergeStrategy( this, remoteData, remoteVersion, this._onRecordRecovered.bind( this, remoteVersion, remoteData ) );
	}
	else {
		this.emit( 'error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version );
	}
};

Record.prototype._sendUpdate = function ( path, data ) {
	this.version++;
	if( !path ) {
		this._connection.sendMsg( C.TOPIC.RECORD, C.ACTIONS.UPDATE, [
			this.name,
			this.version,
			data
		]);
	} else {
		this._connection.sendMsg( C.TOPIC.RECORD, C.ACTIONS.PATCH, [
			this.name,
			this.version,
			path,
			messageBuilder.typed( data )
		]);
	}
};

/**
 * Callback once the record merge has completed. If successful it will set the
 * record state, else emit and error and the record will remain in an
 * inconsistent state until the next update.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRecordRecovered = function( remoteVersion, remoteData, error, data ) {
	if( !error ) {
		this.version = remoteVersion;

		var oldValue = this._$data;
		var newValue = jsonPath.set( oldValue, undefined, data, false );

/*		if( utils.deepEquals( newValue, remoteData ) ) {
			return;
		}*/
		if ( oldValue === newValue ) {
			return;
		}

		this._sendUpdate( undefined, data );
		this._applyChange( newValue );
	} else {
		this.emit( 'error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version );
	}
};

/**
 * Callback for ack-messages. Acks can be received for
 * subscriptions, discards and deletes
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._processAckMessage = function( message ) {
	var acknowledgedAction = message.data[ 0 ];

	if( acknowledgedAction === C.ACTIONS.SUBSCRIBE ) {
		clearTimeout( this._readAckTimeout );
	}

	else if( acknowledgedAction === C.ACTIONS.DELETE ) {
		this.emit( 'delete' );
		this._destroy();
	}

	else if( acknowledgedAction === C.ACTIONS.UNSUBSCRIBE ) {
		this.emit( 'discard' );
		this._destroy();
	}
};

/**
 * Applies incoming updates and patches to the record's dataset
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyUpdate = function( message ) {
	var version = parseInt( message.data[ 1 ], 10 );
	var data;

	if( message.action === C.ACTIONS.PATCH ) {
		data = messageParser.convertTyped( message.data[ 3 ], this._client );
	} else {
		data = JSON.parse( message.data[ 2 ] );
	}

	if( this.version === null ) {
		this.version = version;
	}
	else if( this.version + 1 !== version ) {
		if( message.action === C.ACTIONS.PATCH ) {
			/**
			* Request a snapshot so that a merge can be done with the read reply which contains
			* the full state of the record
			**/
			this._connection.sendMsg( C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, [ this.name ] );
		} else {
			this._recoverRecord( version, data, message );
		}
		return;
	}

	this.version = version;
	this._applyChange( jsonPath.set( this._$data, message.action === C.ACTIONS.PATCH ? message.data[ 2 ] : undefined, data ) );
};

/**
 * Callback for incoming read messages
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRead = function( message ) {
	this.version = parseInt( message.data[ 1 ], 10 );
	this._applyChange( jsonPath.set( this._$data, undefined, JSON.parse( message.data[ 2 ] ) ) );
	this._setReady();
};

/**
 * Invokes method calls that where queued while the record wasn't ready
 * and emits the ready event
 *
 * @private
 * @returns {void}
 */
Record.prototype._setReady = function() {
	this.isReady = true;
	for( var i = 0; i < this._queuedMethodCalls.length; i++ ) {
		this[ this._queuedMethodCalls[ i ].method ].apply( this, this._queuedMethodCalls[ i ].args );
	}
	this._queuedMethodCalls = [];
	this.emit( 'ready' );
};

/**
 * Sends the read message, either initially at record
 * creation or after a lost connection has been re-established
 *
 * @private
 * @returns {void}
 */
 Record.prototype._sendRead = function() {
 	this._connection.sendMsg( C.TOPIC.RECORD, C.ACTIONS.CREATEORREAD, [ this.name ] );
 };

/**
 * Compares the new values for every path with the previously stored ones and
 * updates the subscribers if the value has changed
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyChange = function( newData ) {
	if ( this.isDestroyed ) {
		return;
	}

	var oldData = this._$data;
	this._$data = newData;

	if ( !this._eventEmitter._callbacks ) {
		return;
	}

	var paths = Object.keys( this._eventEmitter._callbacks );

	for ( var i = 0; i < paths.length; i++ ) {
		var newValue = jsonPath.get( newData, paths[ i ], false );
		var oldValue = jsonPath.get( oldData, paths[ i ], false );

		if( newValue !== oldValue ) {
			this._eventEmitter.emit( paths[ i ], this.get( paths[ i ] ) );
		}
	}
};

/**
 * Creates a map based on the types of the provided arguments
 *
 * @param {Arguments} args
 *
 * @private
 * @returns {Object} arguments map
 */
Record.prototype._normalizeArguments = function( args ) {
	// If arguments is already a map of normalized parameters
	// (e.g. when called by AnonymousRecord), just return it.
	if( args.length === 1 && typeof args[ 0 ] === 'object' ) {
		return args[ 0 ];
	}

	var result = Object.create( null );

	for( var i = 0; i < args.length; i++ ) {
		if( typeof args[ i ] === 'string' ) {
			result.path = args[ i ];
		}
		else if( typeof args[ i ] === 'function' ) {
			result.callback = args[ i ];
		}
		else if( typeof args[ i ] === 'boolean' ) {
			result.triggerNow = args[ i ];
		}
	}

	return result;
};

/**
 * Clears all timeouts that are set when the record is created
 *
 * @private
 * @returns {void}
 */
Record.prototype._clearTimeouts = function() {
	clearTimeout( this._readAckTimeout );
	clearTimeout( this._deleteAckTimeout );
	clearTimeout( this._discardTimeout );
	clearTimeout( this._deleteAckTimeout );
};

/**
 * A quick check that's carried out by most methods that interact with the record
 * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
 *
 * @param   {String} methodName The name of the method that invoked this check
 *
 * @private
 * @returns {Boolean} is destroyed
 */
Record.prototype._checkDestroyed = function( methodName ) {
	if( this.isDestroyed ) {
		this.emit( 'error', 'Can\'t invoke \'' + methodName + '\'. Record \'' + this.name + '\' is already destroyed' );
		return true;
	}

	return false;
};
/**
 * Generic handler for ack, read and delete timeouts
 *
 * @private
 * @returns {void}
 */
Record.prototype._onTimeout = function( timeoutType ) {
	this._clearTimeouts();
	this.emit( 'error', timeoutType );
};

/**
 * Destroys the record and nulls all
 * its dependencies
 *
 * @private
 * @returns {void}
 */
 Record.prototype._destroy = function() {
 	this._clearTimeouts();
 	this._eventEmitter.off();
 	this._resubscribeNotifier.destroy();
 	this.isDestroyed = true;
 	this.isReady = false;
 	this._client = null;
	this._eventEmitter = null;
	this._connection = null;
 };

module.exports = Record;

},{"../constants/constants":35,"../message/message-builder":40,"../message/message-parser":41,"../utils/resubscribe-notifier":52,"../utils/utils":54,"./json-path":43,"component-emitter":6}],47:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	AckTimeoutRegistry = _dereq_( '../utils/ack-timeout-registry' ),
	ResubscribeNotifier = _dereq_( '../utils/resubscribe-notifier' ),
	RpcResponse = _dereq_( './rpc-response' ),
	Rpc = _dereq_( './rpc' ),
	messageParser= _dereq_( '../message/message-parser' ),
	messageBuilder = _dereq_( '../message/message-builder' );

/**
 * The main class for remote procedure calls
 *
 * Provides the rpc interface and handles incoming messages
 * on the rpc topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
var RpcHandler = function( options, connection, client ) {
	this._options = options;
	this._connection = connection;
	this._client = client;
	this._rpcs = {};
	this._providers = {};
	this._provideAckTimeouts = {};
	this._ackTimeoutRegistry = new AckTimeoutRegistry( client, C.TOPIC.RPC, this._options.subscriptionTimeout );
	this._resubscribeNotifier = new ResubscribeNotifier( this._client, this._reprovide.bind( this ) );
};

/**
 * Registers a callback function as a RPC provider. If another connected client calls
 * client.rpc.make() the request will be routed to this method
 *
 * The callback will be invoked with two arguments:
 * 		{Mixed} data The data passed to the client.rpc.make function
 *   	{RpcResponse} rpcResponse An object with methods to respons, acknowledge or reject the request
 *
 * Only one callback can be registered for a RPC at a time
 *
 * Please note: Deepstream tries to deliver data in its original format. Data passed to client.rpc.make as a String will arrive as a String,
 * numbers or implicitly JSON serialized objects will arrive in their respective format as well
 *
 * @public
 * @returns void
 */
RpcHandler.prototype.provide = function( name, callback ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}
	if( this._providers[ name ] ) {
		throw new Error( 'RPC ' + name + ' already registered' );
	}
	if ( typeof callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	this._ackTimeoutRegistry.add( name, C.ACTIONS.SUBSCRIBE );
	this._providers[ name ] = callback;
	this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [ name ] );
};

/**
 * Unregisters this client as a provider for a remote procedure call
 *
 * @param   {String} name the name of the rpc
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.unprovide = function( name ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}

	if( this._providers[ name ] ) {
		delete this._providers[ name ];
		this._ackTimeoutRegistry.add( name, C.ACTIONS.UNSUBSCRIBE );
		this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.UNSUBSCRIBE, [ name ] );
	}
};

/**
 * Executes the actual remote procedure call
 *
 * @param   {String}   name     The name of the rpc
 * @param   {Mixed}    data     Serializable data that will be passed to the provider
 * @param   {Function} callback Will be invoked with the returned result or if the rpc failed
 *                              receives to arguments: error or null and the result
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.make = function( name, data, callback ) {
	if ( typeof name !== 'string' || name.length === 0 ) {
		throw new Error( 'invalid argument name' );
	}
	if ( typeof callback !== 'function' ) {
		throw new Error( 'invalid argument callback' );
	}

	var uid = this._client.getUid(),
		typedData = messageBuilder.typed( data );

	this._rpcs[ uid ] = new Rpc( this._options, callback, this._client );
	this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.REQUEST, [ name, uid, typedData ] );
};

/**
 * Retrieves a RPC instance for a correlationId or throws an error
 * if it can't be found (which should never happen)
 *
 * @param {String} correlationId
 * @param {String} rpcName
 *
 * @private
 * @returns {Rpc}
 */
RpcHandler.prototype._getRpc = function( correlationId, rpcName, rawMessage ) {
	var rpc = this._rpcs[ correlationId ];

	if( !rpc ) {
		this._client._$onError( C.TOPIC.RPC, C.EVENT.UNSOLICITED_MESSAGE, rawMessage );
		return null;
	}

	return rpc;
};

/**
 * Handles incoming rpc REQUEST messages. Instantiates a new response object
 * and invokes the provider callback or rejects the request if no rpc provider
 * is present (which shouldn't really happen, but might be the result of a race condition
 * if this client sends a unprovide message whilst an incoming request is already in flight)
 *
 * @param   {Object} message The parsed deepstream RPC request message.
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._respondToRpc = function( message ) {
	var name = message.data[ 0 ],
		correlationId = message.data[ 1 ],
		data = null,
		response;

	if( message.data[ 2 ] ) {
		data = messageParser.convertTyped( message.data[ 2 ], this._client );
	}

	if( this._providers[ name ] ) {
		response = new RpcResponse( this._connection,name, correlationId );
		this._providers[ name ]( data, response );
	} else {
		this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.REJECTION, [ name, correlationId ] );
	}
};

/**
 * Distributes incoming messages from the server
 * based on their action
 *
 * @param   {Object} message A parsed deepstream message
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._$handle = function( message ) {
	var rpcName, correlationId, rpc;

	// RPC Requests
	if( message.action === C.ACTIONS.REQUEST ) {
		this._respondToRpc( message );
		return;
	}

	// RPC subscription Acks
	if( message.action === C.ACTIONS.ACK &&
		( message.data[ 0 ] === C.ACTIONS.SUBSCRIBE  || message.data[ 0 ] === C.ACTIONS.UNSUBSCRIBE ) ) {
		this._ackTimeoutRegistry.clear( message );
		return;
	}


	/*
	 * Error messages always have the error as first parameter. So the
	 * order is different to ack and response messages
	 */
	if( message.action === C.ACTIONS.ERROR ) {
		if( message.data[ 0 ] === C.EVENT.MESSAGE_PERMISSION_ERROR ) {
			return;
		}
		else if( message.data[ 0 ] === C.EVENT.MESSAGE_DENIED ) {
			if( message.data[ 2 ] === C.ACTIONS.SUBSCRIBE ) {
				this._ackTimeoutRegistry.remove( message.data[ 1 ], C.ACTIONS.SUBSCRIBE );
				return;
			}
			else if( message.data[ 2 ] === C.ACTIONS.REQUEST ) {
				rpcName = message.data[ 1 ];
				correlationId = message.data[ 3 ];
			}
		} else {
			rpcName = message.data[ 1 ];
			correlationId = message.data[ 2 ];
		}

	} else {
		rpcName = message.data[ 0 ];
		correlationId = message.data[ 1 ];
	}

	/*
	* Retrieve the rpc object
	*/
	rpc = this._getRpc( correlationId, rpcName, message.raw );
	if( rpc === null ) {
		return;
	}

	// RPC Responses
	if( message.action === C.ACTIONS.ACK ) {
		rpc.ack();
	}
	else if( message.action === C.ACTIONS.RESPONSE ) {
		rpc.respond( message.data[ 2 ] );
		delete this._rpcs[ correlationId ];
	}
	else if( message.action === C.ACTIONS.ERROR ) {
		message.processedError = true;
		rpc.error( message.data[ 0 ] );
		delete this._rpcs[ correlationId ];
	}
};

/**
 * Reregister providers to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
RpcHandler.prototype._reprovide = function() {
	for( var rpcName in this._providers ) {
		this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [ rpcName ] );
	}
};


module.exports = RpcHandler;
},{"../constants/constants":35,"../message/message-builder":40,"../message/message-parser":41,"../utils/ack-timeout-registry":50,"../utils/resubscribe-notifier":52,"./rpc":49,"./rpc-response":48}],48:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	utils = _dereq_( '../utils/utils' ),
	messageBuilder = _dereq_( '../message/message-builder' );

/**
 * This object provides a number of methods that allow a rpc provider
 * to respond to a request
 *
 * @param {Connection} connection - the clients connection object
 * @param {String} name the name of the rpc
 * @param {String} correlationId the correlationId for the RPC
 */
var RpcResponse = function( connection, name, correlationId ) {
	this._connection = connection;
	this._name = name;
	this._correlationId = correlationId;
	this._isAcknowledged = false;
	this._isComplete = false;
	this.autoAck = true;
	utils.nextTick( this._performAutoAck.bind( this ) );
};

/**
 * Acknowledges the receipt of the request. This
 * will happen implicitly unless the request callback
 * explicitly sets autoAck to false
 *
 * @public
 * @returns 	{void}
 */
RpcResponse.prototype.ack = function() {
	if( this._isAcknowledged === false ) {
		this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.ACK, [ this._name, this._correlationId ] );
		this._isAcknowledged = true;
	}
};

/**
 * Reject the request. This might be necessary if the client
 * is already processing a large number of requests. If deepstream
 * receives a rejection message it will try to route the request to
 * another provider - or return a NO_RPC_PROVIDER error if there are no
 * providers left
 *
 * @public
 * @returns	{void}
 */
RpcResponse.prototype.reject = function() {
	this.autoAck = false;
	this._isComplete = true;
	this._isAcknowledged = true;
	this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.REJECTION, [ this._name, this._correlationId ] );
};

/**
 * Notifies the server that an error has occured while trying to process the request.
 * This will complete the rpc.
 *
 * @param {String} errorMsg the message used to describe the error that occured
 * @public
 * @returns	{void}
 */
RpcResponse.prototype.error = function( errorMsg ) {
	this.autoAck = false;
	this._isComplete = true;
	this._isAcknowledged = true;
	this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.ERROR, [ errorMsg, this._name, this._correlationId ] );
};

/**
 * Completes the request by sending the response data
 * to the server. If data is an array or object it will
 * automatically be serialised.
 * If autoAck is disabled and the response is sent before
 * the ack message the request will still be completed and the
 * ack message ignored
 *
 * @param {String} data the data send by the provider. Might be JSON serialized
 *
 * @public
 * @returns {void}
 */
RpcResponse.prototype.send = function( data ) {
	if( this._isComplete === true ) {
		throw new Error( 'Rpc ' + this._name + ' already completed' );
	}
	this.ack();

	var typedData = messageBuilder.typed( data );
	this._connection.sendMsg( C.TOPIC.RPC, C.ACTIONS.RESPONSE, [ this._name, this._correlationId, typedData ] );
	this._isComplete = true;
};

/**
 * Callback for the autoAck timeout. Executes ack
 * if autoAck is not disabled
 *
 * @private
 * @returns {void}
 */
RpcResponse.prototype._performAutoAck = function() {
	if( this.autoAck === true ) {
		this.ack();
	}
};

module.exports = RpcResponse;
},{"../constants/constants":35,"../message/message-builder":40,"../utils/utils":54}],49:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	messageParser = _dereq_( '../message/message-parser' );

/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 *
 * @param {Object}   options  deepstream client config
 * @param {Function} callback the function that will be called once the request is complete or failed
 * @param {Client} client
 *
 * @constructor
 */
var Rpc = function( options, callback, client ) {
	this._options = options;
	this._callback = callback;
	this._client = client;
	this._ackTimeout = setTimeout( this.error.bind( this, C.EVENT.ACK_TIMEOUT ), this._options.rpcAckTimeout );
	this._responseTimeout = setTimeout( this.error.bind( this, C.EVENT.RESPONSE_TIMEOUT ), this._options.rpcResponseTimeout );
};

/**
 * Called once an ack message is received from the server
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.ack = function() {
	clearTimeout( this._ackTimeout );
};

/**
 * Called once a response message is received from the server.
 * Converts the typed data and completes the request
 *
 * @param   {String} data typed value
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.respond = function( data ) {
	var convertedData = messageParser.convertTyped( data, this._client );
	this._callback( null, convertedData );
	this._complete();
};

/**
 * Callback for error messages received from the server. Once
 * an error is received the request is considered completed. Even
 * if a response arrives later on it will be ignored / cause an
 * UNSOLICITED_MESSAGE error
 *
 * @param   {String} errorMsg @TODO should be CODE and message
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.error = function( errorMsg ) {
	this._callback( errorMsg );
	this._complete();
};

/**
 * Called after either an error or a response
 * was received
 *
 * @private
 * @returns {void}
 */
Rpc.prototype._complete = function() {
	clearTimeout( this._ackTimeout );
	clearTimeout( this._responseTimeout );
};

module.exports = Rpc;
},{"../constants/constants":35,"../message/message-parser":41}],50:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	EventEmitter = _dereq_( 'component-emitter' );

/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 *
 * @param {Client} client          The deepstream client
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @extends {EventEmitter}
 * @constructor
 */
var AckTimeoutRegistry = function( client, topic, timeoutDuration ) {
	this._client = client;
	this._topic = topic;
	this._timeoutDuration = timeoutDuration;
	this._register = {};
};

EventEmitter( AckTimeoutRegistry.prototype );

/**
 * Add an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name, an event name,
 *                      the name of a webrtc callee etc.
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.add = function( name, action ) {
	var uniqueName = action ? action + name : name;

	this.remove( name, action );
	this._register[ uniqueName ] = setTimeout( this._onTimeout.bind( this, uniqueName, name ), this._timeoutDuration );
};

/**
 * Remove an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name, an event name,
 *                      the name of a webrtc callee etc.
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.remove = function( name, action ) {
	var uniqueName = action ? action + name : name;

	if( this._register[ uniqueName ] ) {
		this.clear( {
			data: [ action, name ]
		} );
	}
};

/**
 * Processes an incoming ACK-message and removes the corresponding subscription
 *
 * @param   {Object} message A parsed deepstream ACK message
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.clear = function( message ) {
	var name = message.data[ 1 ];
	var uniqueName = message.data[ 0 ] + name;
	var timeout =  this._register[ uniqueName ] || this._register[ name ];

	if( timeout ) {
		clearTimeout( timeout );
	} else {
		this._client._$onError( this._topic, C.EVENT.UNSOLICITED_MESSAGE, message.raw );
	}
};

/**
 * Will be invoked if the timeout has occured before the ack message was received
 *
 * @param {String} name An identifier for the subscription, e.g. a record name, an event name,
 *                      the name of a webrtc callee etc.
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onTimeout = function( uniqueName, name ) {
	delete this._register[ uniqueName ];
	var msg = 'No ACK message received in time for ' + name;
	this._client._$onError( this._topic, C.EVENT.ACK_TIMEOUT, msg );
	this.emit( 'timeout', name );
};

module.exports = AckTimeoutRegistry;

},{"../constants/constants":35,"component-emitter":6}],51:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' );
var ResubscribeNotifier = _dereq_( './resubscribe-notifier' );

/*
 * Creates a listener instance which is usedby deepstream Records and Events.
 *
 * @param {String} type                 One of CONSTANTS.TOPIC
 * @param {String} pattern              A pattern that can be compiled via new RegExp(pattern)
 * @param {Function} callback           The function which is called when pattern was found and removed
 * @param {Connection} Connection       The instance of the server connection
 * @param {Object} options              Deepstream options
 * @param {Client} client               deepstream.io client
 *
 * @constructor
 */
var Listener = function( type, pattern, callback, options, client, connection ) {
	this._type = type;
	this._callback = callback;
	this._pattern = pattern;
	this._options = options;
	this._client = client;
	this._connection = connection;
	this._ackTimeout = setTimeout( this._onAckTimeout.bind( this ), this._options.subscriptionTimeout );
	this._resubscribeNotifier = new ResubscribeNotifier( client, this._sendListen.bind( this ) );
	this._sendListen();
	this.destroyPending = false;
};

Listener.prototype.sendDestroy = function() {
	this.destroyPending = true;
	this._connection.sendMsg( this._type, C.ACTIONS.UNLISTEN, [ this._pattern ] );
	this._resubscribeNotifier.destroy();

};

/*
 * Resets internal properties. Is called when provider cals unlisten.
 *
 * @returns {void}
 */
Listener.prototype.destroy = function() {
	this._callback = null;
	this._pattern = null;
	this._client = null;
	this._connection = null;
};

/*
 * Accepting a listener request informs deepstream that the current provider is willing to
 * provide the record or event matching the subscriptionName . This will establish the current
 * provider as the only publisher for the actual subscription with the deepstream cluster.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.accept = function( name ) {
	this._connection.sendMsg( this._type, C.ACTIONS.LISTEN_ACCEPT, [ this._pattern, name ] );
}

/*
 *  Rejecting a listener request informs deepstream that the current provider is not willing
 * to provide the record or event matching the subscriptionName . This will result in deepstream
 * requesting another provider to do so instead. If no other provider accepts or exists, the
 * record will remain unprovided.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.reject = function( name ) {
	this._connection.sendMsg( this._type, C.ACTIONS.LISTEN_REJECT, [ this._pattern, name ] );
}

/*
 * Wraps accept and reject as an argument for the callback function.
 *
 * @private
 * @returns {Object}
 */
Listener.prototype._createCallbackResponse = function(message) {
	return {
		accept: this.accept.bind( this, message.data[ 1 ] ),
		reject: this.reject.bind( this, message.data[ 1 ] )
	}
}

/*
 * Handles the incomming message.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._$onMessage = function( message ) {
	if( message.action === C.ACTIONS.ACK ) {
		clearTimeout( this._ackTimeout );
	} else if ( message.action === C
		.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND ) {
		this._showDeprecatedMessage( message );
		this._callback( message.data[ 1 ], true, this._createCallbackResponse( message) );
	} else if ( message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED ) {
		this._callback( message.data[ 1 ], false );
	} else {
		this._client._$onError( this._type, C.EVENT.UNSOLICITED_MESSAGE, message.data[ 0 ] + '|' + message.data[ 1 ] );
	}
};

/*
 * Sends a C.ACTIONS.LISTEN to deepstream.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._sendListen = function() {
	this._connection.sendMsg( this._type, C.ACTIONS.LISTEN, [ this._pattern ] );
};

/*
 * Sends a C.EVENT.ACK_TIMEOUT to deepstream.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._onAckTimeout = function() {
	this._client._$onError( this._type, C.EVENT.ACK_TIMEOUT, 'No ACK message received in time for ' + this._pattern );
};

/*
 * Shows a deprecation message to users before 1.1
 *
 * @private
 * @returns {void}
 */
Listener.prototype._showDeprecatedMessage = function( message ) {
	if( this._callback.length !== 3 ) {
	var deprecatedMessage = 'DEPRECATED: listen should explicitly accept or reject for pattern: ' + message.data[ 0 ];
	deprecatedMessage += '\nhttps://github.com/deepstreamIO/deepstream.io-client-js/issues/212';
		if( console && console.warn ) {
			console.warn( deprecatedMessage );
		}
	}
};

module.exports = Listener;

},{"../constants/constants":35,"./resubscribe-notifier":52}],52:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' );

/**
 * Makes sure that all functionality is resubscribed on reconnect. Subscription is called
 * when the connection drops - which seems counterintuitive, but in fact just means
 * that the re-subscription message will be added to the queue of messages that
 * need re-sending as soon as the connection is re-established.
 * 
 * Resubscribe logic should only occur once per connection loss
 *
 * @param {Client} client          The deepstream client
 * @param {Function} reconnect     Function to call to allow resubscribing
 *
 * @constructor
 */
var ResubscribeNotifier = function( client, resubscribe ) {
	this._client = client;
	this._resubscribe = resubscribe;

	this._isReconnecting = false;
	this._connectionStateChangeHandler = this._handleConnectionStateChanges.bind( this );
	this._client.on( 'connectionStateChanged', this._connectionStateChangeHandler );
};

/**
 * Call this whenever this functionality is no longer needed to remove links
 * 
 * @returns {void}
 */
ResubscribeNotifier.prototype.destroy = function() {
	this._client.removeListener( 'connectionStateChanged', this._connectionStateChangeHandler );
	this._connectionStateChangeHandler = null;
	this._client = null;
};

 /**
 * Check whenever the connection state changes if it is in reconnecting to resubscribe
 * @private
 * @returns {void}
 */
 ResubscribeNotifier.prototype._handleConnectionStateChanges = function() {
	var state = this._client.getConnectionState();
		
	if( state === C.CONNECTION_STATE.RECONNECTING && this._isReconnecting === false ) {
		this._isReconnecting = true;
	}
	if( state === C.CONNECTION_STATE.OPEN && this._isReconnecting === true ) {
		this._isReconnecting = false;
		this._resubscribe();
	}
 };

module.exports = ResubscribeNotifier;
},{"../constants/constants":35}],53:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	ResubscribeNotifier = _dereq_( './resubscribe-notifier' );

/**
 * Provides a scaffold for subscriptionless requests to deepstream, such as the SNAPSHOT 
 * and HAS functionality. The SingleNotifier multiplexes all the client requests so 
 * that they can can be notified at once, and also includes reconnection funcionality 
 * incase the connection drops.
 *
 * @param {Client} client          The deepstream client
 * @param {Connection} connection  The deepstream connection
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {String} action          Constant. One of C.ACTIONS
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @constructor
 */
var SingleNotifier = function( client, connection, topic, action, timeoutDuration ) {
	this._client = client;
	this._connection = connection;
	this._topic = topic;
	this._action = action;
	this._timeoutDuration = timeoutDuration;
	this._requests = {};
	this._resubscribeNotifier = new ResubscribeNotifier( this._client, this._resendRequests.bind( this ) );
};

/**
 * Check if there is a request pending with a specified name
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.hasRequest = function( name ) {		
	return !!this._requests[ name ]; 
};

/**
 * Add a request. If one has already been made it will skip the server request
 * and multiplex the response
 *
 * @param {String} name An identifier for the request, e.g. a record name

 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.request = function( name, callback ) {	
	var responseTimeout;

	if( !this._requests[ name ] ) {
		this._requests[ name ] = [];
		this._connection.sendMsg( this._topic, this._action, [ name ] );
	}

	responseTimeout = setTimeout( this._onResponseTimeout.bind( this, name ), this._timeoutDuration );
	this._requests[ name ].push( { timeout: responseTimeout, callback: callback } );
};

/**
 * Process a response for a request. This has quite a flexible API since callback functions
 * differ greatly and helps maximise reuse.
 *
 * @param {String} name An identifier for the request, e.g. a record name
 * @param {String} error Error message
 * @param {Object} data If successful, the response data
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.recieve = function( name, error, data ) {
	var entries = this._requests[ name ];
	for( i=0; i < entries.length; i++ ) {
		entry = entries[ i ];
		clearTimeout( entry.timeout );
		entry.callback( error, data );
	}
	delete this._requests[ name ];
};

/**
 * Will be invoked if a timeout occurs before a response arrives from the server
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._onResponseTimeout = function( name ) {
	var msg = 'No response received in time for ' + this._topic + '|' + this._action + '|' + name;
	this._client._$onError( this._topic, C.EVENT.RESPONSE_TIMEOUT, msg );
};

/**
 * Resends all the requests once the connection is back up
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._resendRequests = function() {
	for( var request in this._requests ) {
		this._connection.sendMsg( this._topic, this._action, [ this._requests[ request ] ] );
	}
};

module.exports = SingleNotifier;
},{"../constants/constants":35,"./resubscribe-notifier":52}],54:[function(_dereq_,module,exports){
(function (process){
/**
 * A regular expression that matches whitespace on either side, but
 * not in the center of a string
 *
 * @type {RegExp}
 */
var TRIM_REGULAR_EXPRESSION = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * Used in typeof comparisons
 *
 * @type {String}
 */
var OBJECT = 'object';

/**
 * True if environment is node, false if it's a browser
 * This seems somewhat inelegant, if anyone knows a better solution,
 * let's change this (must identify browserify's pseudo node implementation though)
 *
 * @public
 * @type {Boolean}
 */
exports.isNode = typeof process !== 'undefined' && process.toString() === '[object process]';

/**
 * Provides as soon as possible async execution in a cross
 * platform way
 *
 * @param   {Function} fn the function to be executed in an asynchronous fashion
 *
 * @public
 * @returns {void}
 */
exports.nextTick = function( fn ) {
	if( exports.isNode ) {
		process.nextTick( fn );
	} else {
		setTimeout( fn, 0 );
	}
};

/**
 * Removes whitespace from the beginning and end of a string
 *
 * @param   {String} inputString
 *
 * @public
 * @returns {String} trimmedString
 */
exports.trim = function( inputString ) {
	if( inputString.trim ) {
		return inputString.trim();
	} else {
		return inputString.replace( TRIM_REGULAR_EXPRESSION, '' );
	}
};

/**
 * Compares two objects for deep (recoursive) equality
 *
 * This used to be a significantly more complex custom implementation,
 * but JSON.stringify has gotten so fast that it now outperforms the custom
 * way by a factor of 1.5 to 3.
 *
 * In IE11 / Edge the custom implementation is still slightly faster, but for
 * consistencies sake and the upsides of leaving edge-case handling to the native
 * browser / node implementation we'll go for JSON.stringify from here on.
 *
 * Please find performance test results here
 *
 * http://jsperf.com/deep-equals-code-vs-json
 *
 * @param   {Mixed} objA
 * @param   {Mixed} objB
 *
 * @public
 * @returns {Boolean} isEqual
 */
exports.deepEquals= function( objA, objB ) {
	if ( objA === objB ) {
		return true
	}
	else if( typeof objA !== OBJECT || typeof objB !== OBJECT ) {
		return false;
	}
	else {
		return JSON.stringify( objA ) === JSON.stringify( objB );
	}
};

/**
 * Similar to deepEquals above, tests have shown that JSON stringify outperforms any attempt of
 * a code based implementation by 50% - 100% whilst also handling edge-cases and keeping implementation
 * complexity low.
 *
 * If ES6/7 ever decides to implement deep copying natively (what happened to Object.clone? that was briefly
 * a thing...), let's switch it for the native implementation. For now though, even Object.assign({}, obj) only
 * provides a shallow copy.
 *
 * Please find performance test results backing these statements here:
 *
 * http://jsperf.com/object-deep-copy-assign
 *
 * @param   {Mixed} obj the object that should be cloned
 *
 * @public
 * @returns {Mixed} clone
 */
exports.deepCopy = function( obj ) {
	if( typeof obj === OBJECT ) {
		return JSON.parse( JSON.stringify( obj ) );
	} else {
		return obj;
	}
};

/**
 * Copy the top level of items, but do not copy its items recourisvely. This
 * is much quicker than deepCopy does not guarantee the object items are new/unique.
 * Mainly used to change the reference to the actual object itself, but not its children.
 *
 * @param   {Mixed} obj the object that should cloned
 *
 * @public
 * @returns {Mixed} clone
 */
exports.shallowCopy = function ( obj ) {
	if ( Array.isArray( obj ) ) {
		return obj.slice( 0 );
	}
	else if ( typeof obj === OBJECT ) {
		var copy = Object.create( null );
		var props = Object.keys( obj );
		for ( var i = 0; i < props.length; i++ ) {
			copy[ props[ i ] ] = obj[ props[ i ] ];
		}
	  return copy;
	}
	return obj;
}

}).call(this,_dereq_('_process'))
},{"_process":31}],55:[function(_dereq_,module,exports){
var WebRtcConnection = _dereq_( './webrtc-connection' ),
	EventEmitter = _dereq_( 'component-emitter' ),
	C = _dereq_( '../constants/constants' );

/**
 * This class represents a single call between two peers
 * in all its states. It's returned by ds.webrtc.makeCall
 * as well as passed to the callback of 
 * ds.webrtc.registerCallee( name, callback );
 *
 * @constructor
 * @extends {EventEmitter}
 *
 * @event established <remoteStream>
 * @event declined <reason>
 * @event error <error>
 * @event stateChange <state>
 * @event ended
 *
 * @param {Object} settings
 *
 * {
 * 		isOutgoing: <Boolean>, 
 * 		connection: <Deepstream Connection>,
 * 		localId: <String>,
 * 		remoteId: <String>,
 * 		localStream: <MediaStream>,
 * 		offer: <Offer SDP>
 * }
 *
 * @param {Object} options deepstream options
 */
var WebRtcCall = function( settings, options ) {
	this._connection = settings.connection;
	this._localId = settings.localId;
	this._remoteId = settings.remoteId;
	this._localStream = settings.localStream;
	this._offer = settings.offer;
	this._$webRtcConnection = null;
	this._bufferedIceCandidates = [];
	this._options = options;

	this.state = C.CALL_STATE.INITIAL;
	this.metaData = settings.metaData || null;
	this.callee = settings.isOutgoing ? settings.remoteId : settings.localId;
	this.isOutgoing = settings.isOutgoing;
	this.isIncoming = !settings.isOutgoing;
	this.isAccepted = false;
	this.isDeclined = false;
	
	if( this.isOutgoing ) {
		this._initiate();
	}
};

EventEmitter( WebRtcCall.prototype );

/**
 * Accept an incoming call
 *
 * @param   {MediaStream} localStream
 *
 * @public
 * @returns {void}
 */
WebRtcCall.prototype.accept = function( localStream ) {
	if( this.isAccepted ) {
		throw new Error( 'Incoming call is already accepted' );
	}

	if( this.isDeclined ) {
		throw new Error( 'Can\'t accept incoming call. Call was already declined' );
	}

	this.isAccepted = true;

	this._$webRtcConnection = new WebRtcConnection( this._connection, this._options, this._localId, this._remoteId );
	
	if( localStream ) {
		this._$webRtcConnection.addStream( localStream );
	}
	
	this._$webRtcConnection.setRemoteDescription( new RTCSessionDescription( this._offer ) );
	this._$webRtcConnection.createAnswer();
	this._$webRtcConnection.on( 'stream', this._onEstablished.bind( this ) );
	this._$webRtcConnection.on( 'error', this.emit.bind( this, 'error' ) );

	for( var i = 0; i < this._bufferedIceCandidates.length; i++ ) {
		this._$webRtcConnection.addIceCandidate( this._bufferedIceCandidates[ i ] );
	}
	
	this._bufferedIceCandidates = [];
	this._stateChange( C.CALL_STATE.ACCEPTED );
};

/**
 * Decline an incoming call
 *
 * @param   {[String]} reason An optional reason as to why the call was declined
 *
 * @private
 * @returns {void}
 */
WebRtcCall.prototype.decline = function( reason ) {
	if( this.isAccepted ) {
		throw new Error( 'Can\'t decline incoming call. Call was already accepted' );
	}

	if( this.isDeclined ) {
		throw new Error( 'Incoming call was already declined' );
	}

	this.isDeclined = true;
	this._connection.sendMsg( C.TOPIC.WEBRTC, C.ACTIONS.WEBRTC_CALL_DECLINED, [ this._localId, this._remoteId, reason || null ] );
	this._$declineReceived( reason || null );
};

/**
 * Ends a call that's in progress.
 *
 * @public
 * @returns {void}
 */
WebRtcCall.prototype.end = function() {
	this._connection.sendMsg( C.TOPIC.WEBRTC, C.ACTIONS.WEBRTC_CALL_ENDED, [ this._localId, this._remoteId, null ] );
	this._$close();
};

/**
 * Closes the connection and ends the call. This can be invoked from the
 * outside as a result of an incoming end message as well as by calling end()
 *
 * @protected
 * @returns {void}
 */
WebRtcCall.prototype._$close = function() {
	this._stateChange( C.CALL_STATE.ENDED );
	if( this._$webRtcConnection ) {
		this._$webRtcConnection.close();
	}
	this.emit( 'ended' );
};

/**
 * Add an ICE (Interactive Connection Establishing) Candidate
 *
 * @param   {RTCIceCandidate} iceCandidate An object, describing a host and port combination
 *                                         that the peers can try to connect on
 *
 * @protected
 * @returns {void}
 */
WebRtcCall.prototype._$addIceCandidate = function( iceCandidate ) {
	if( this.isIncoming && this.isAccepted === false ) {
		this._bufferedIceCandidates.push( iceCandidate );
	} else {
		this._$webRtcConnection.addIceCandidate( iceCandidate );
	}
};

/**
 * Will be invoked by the webrtcHandler if a decline message is received from the other party
 *
 * @param   {[String]} reason Optional reason as to why the call was declined
 *
 * @protected
 * @returns {void}
 */
WebRtcCall.prototype._$declineReceived = function( reason ) {
	this.isDeclined = true;
	this.isAccepted = false;
	this._stateChange( C.CALL_STATE.DECLINED );
	this.emit( 'declined', reason );
};

/**
 * Is invoked for every stateChange
 *
 * @param   {String} state one of C.CALL_STATE
 *
 * @private
 * @returns {void}
 */
WebRtcCall.prototype._stateChange = function( state ) {
	this.state = state;
	this.emit( 'stateChange', state );
};

/**
 * Initiates the an outgoing call
 *
 * @private
 * @returns {void}
 */
WebRtcCall.prototype._initiate = function() {
	this._stateChange( C.CALL_STATE.CONNECTING );
	this._$webRtcConnection = new WebRtcConnection( this._connection, this._options, this._localId, this._remoteId );
	this._$webRtcConnection.initiate( this._localStream, this.metaData );
	this._$webRtcConnection.on( 'stream', this._onEstablished.bind( this ) );
};

/**
 * Callback for accept messages. Sets the call to established and informs the client
 *
 * @param   {MediaStream} stream
 *
 * @private
 * @returns {void}
 */
WebRtcCall.prototype._onEstablished = function( stream ) {
	this.isDeclined = false;
	this.isAccepted = true;
	this._stateChange( C.CALL_STATE.ESTABLISHED );
	this.emit( 'established', stream );
};

module.exports = WebRtcCall;
},{"../constants/constants":35,"./webrtc-connection":56,"component-emitter":6}],56:[function(_dereq_,module,exports){
var Emitter = _dereq_( 'component-emitter' );
var C = _dereq_( '../constants/constants' );
var noop = function(){};

/**
 * This class wraps around the native RTCPeerConnection
 * object (https://developer.mozilla.org/en/docs/Web/API/RTCPeerConnection)
 * and provides a thin layer of deepstream integration
 *
 * @constructor
 * 
 * @event error {Error}
 * @event stream {MediaStream}
 * 
 * @param {Connection} connection deepstream connection
 * @param {Object} options deepstream options
 * @param {String} localId    either a random id for outgoing calls or a callee name for incoming calls
 * @param {String} remoteId   either a random id for incoming calls or a callee name for outgoing calls
 */
var WebRtcConnection = function( connection, options, localId, remoteId ) {
	this._connection = connection;
	this._remoteId = remoteId;
	this._localId = localId;

	this._peerConnection = new RTCPeerConnection( options.rtcPeerConnectionConfig );
	this._peerConnection.onaddstream = this._onStream.bind( this );
	this._peerConnection.onicecandidate = this._onIceCandidate.bind( this );
	this._peerConnection.oniceconnectionstatechange = this._onIceConnectionStateChange.bind( this );
	this._constraints = { mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true } };
};

Emitter( WebRtcConnection.prototype );

/**
 * Initiates a connection if this is an outgoing call
 *
 * @param   {MediaStream} stream   the local media stream
 * @param   {Mixed} metaData metaData will be attached to the offer
 *
 * @public
 * @returns {void}
 */
WebRtcConnection.prototype.initiate = function( stream, metaData ) {
	this._peerConnection.addStream( stream );
	this._peerConnection.createOffer( this._onOfferCreated.bind( this, metaData ), this._onError.bind( this ) );
};

/**
 * Closes the connection
 *
 * @public
 * @returns {void}
 */
WebRtcConnection.prototype.close = function() {
	this._peerConnection.close();
};

/**
 * Add a Media Stream to the connection
 *
 * @param   {MediaStream} stream   the local media stream
 *
 * @public
 * @returns {void}
 */
WebRtcConnection.prototype.addStream = function( stream ) {
	this._peerConnection.addStream( stream );
};

/**
 * Adds a remote description SDP
 *
 * @param {RTCSessionDescription} remoteDescription A session description SDP (https://developer.mozilla.org/en/docs/Web/API/RTCSessionDescription)
 * 
 * @public
 * @returns {void}
 */
WebRtcConnection.prototype.setRemoteDescription = function( remoteDescription ) {
	this._peerConnection.setRemoteDescription( remoteDescription, noop, this._onError.bind( this ) );
};

/**
 * Create an answer SDP
 *
 * @public
 * @returns {void}
 */
WebRtcConnection.prototype.createAnswer = function() {
	this._peerConnection.createAnswer( this._onAnswerCreated.bind( this ), this._onError.bind( this ), this._constraints );
};

/**
 * Adds an RTCIceCandidate to the peerConnection
 *
 * @param {RTCIceCandidate} iceCandidate
 *
 * @public
 * @returns {void}
 */
WebRtcConnection.prototype.addIceCandidate = function( iceCandidate ) {
	this._peerConnection.addIceCandidate( iceCandidate, noop, this._onError.bind( this ) );
};

/**
 * Callback for incoming stream
 *
 * @param   {MediaStreamEvent} event (https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamEvent)
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._onStream = function( event ) {
	this.emit( 'stream', event.stream );
};

/**
 * Callback once the offer was created (why does this happen asynchronously?)
 *
 * @param   {Mixed} metaData
 * @param   {RTCSessionDescription} offer
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._onOfferCreated = function( metaData, offer ) {
	this._sendMsg( C.ACTIONS.WEBRTC_OFFER, JSON.stringify({
		sdp: offer.sdp,
		type: offer.type,
		meta: metaData
	}));
	this._peerConnection.setLocalDescription( offer, noop, this._onError.bind( this ) );
};

/**
 * Callback once the answer was created (why does this happen asynchronously?)
 *
 * @param   {Mixed} metaData
 * @param   {RTCSessionDescription} answer
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._onAnswerCreated = function( answer ) {
	this._sendMsg( C.ACTIONS.WEBRTC_ANSWER, answer.toJSON() );
	this._peerConnection.setLocalDescription( answer, noop, this._onError.bind( this ) );
};	

/**
 * Sends a message via deepstream
 *
 * @param   {String} action one of C.ACTIONS
 * @param   {String} data
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._sendMsg = function( action, data ) {
	this._connection.sendMsg( 
		C.TOPIC.WEBRTC,
		action,
		[ this._localId, this._remoteId, data ]
	);
};

/**
 * Callback for incoming ICECandidates
 *
 * @param   {RTCPeerConnectionIceEvent} event https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnectionIceEvent
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._onIceCandidate = function( event ) {
	if( event.candidate ) {
		this._sendMsg( C.ACTIONS.WEBRTC_ICE_CANDIDATE, event.candidate.toJSON() );
	}
};

/**
 *  Callback for changes to the ICE connection state
 *  
 *  Available states are
 *  
 * "new": the ICE agent is gathering addresses or waiting for remote candidates (or both).
 * "checking": the ICE agent has remote candidates, on at least one component, and is check them, though it has not found a connection yet. At the same time, it may still be gathering candidates.
 * "connected": the ICE agent has found a usable connection for each component, but is still testing more remote candidates for a better connection. At the same time, it may still be gathering candidates.
 * "completed": the ICE agent has found a usable connection for each component, and is no more testing remote candidates.
 * "failed": the ICE agent has checked all the remote candidates and didn't find a match for at least one component. Connections may have been found for some components.
 * "disconnected": liveness check has failed for at least one component. This may be a transient state, e. g. on a flaky network, that can recover by itself.
 * "closed": the ICE agent has shutdown and is not answering to requests.
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._onIceConnectionStateChange = function() {
	if( this._peerConnection.iceConnectionState === 'disconnected' ) {
		this._connection.sendMsg( 
			C.TOPIC.WEBRTC,
			C.ACTIONS.WEBRTC_IS_ALIVE,
			[ this._remoteId ]
		);
	}
};

/**
 * Error callback
 *
 * @param   {Error} error
 *
 * @private
 * @returns {void}
 */
WebRtcConnection.prototype._onError = function( error ) {
	this.emit( 'error', error );
};

module.exports = WebRtcConnection;

},{"../constants/constants":35,"component-emitter":6}],57:[function(_dereq_,module,exports){
var C = _dereq_( '../constants/constants' ),
	WebRtcConnection = _dereq_( './webrtc-connection' ),
	WebRtcCall = _dereq_( './webrtc-call' ),
	AckTimeoutRegistry = _dereq_( '../utils/ack-timeout-registry' ),
	CALLEE_UPDATE_EVENT = 'callee-update';

/**
 * The main class for webrtc operations
 * 
 * Provides an interface to register callees, make calls and listen 
 * for callee registrations
 *
 * WebRTC (Web Real Time Communication) is a standard that allows browsers
 * to share video, audio and data-streams via a peer connection. A server is only
 * used to establish and end calls
 *
 * To learn more, please have a look at the WebRTC documentation on MDN
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
 * 
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 * 
 * @constructor
 * @public
 */
var WebRtcHandler = function( options, connection, client ) {
	this._options = options;
	this._connection = connection;
	this._client = client;
	this._localCallees = {};
	this._remoteCallees = [];
	this._remoteCalleesCallback = null;
	this._ackTimeoutRegistry = new AckTimeoutRegistry( client, C.TOPIC.WEBRTC, this._options.calleeAckTimeout );
	this._ackTimeoutRegistry.on( 'timeout', this._removeCallee.bind( this ) );
	this._calls = {};
};

/**
 * Register a "callee" (an endpoint that can receive incoming audio and video streams). Callees are comparable
 * to entries in a phonebook. They have a unique identifier (their name) and an on-call function that will be invoked
 * whenever another client calls makeCall.
 *
 * @param   {String} 	name     A name that can be used in makeCall to establish a connection to this callee
 * @param   {Function} 	onCallFn Callback for incoming calls. Will be invoked with a <webrtc-call> object and meta-data
 *
 * @public
 * @returns {void}
 */
WebRtcHandler.prototype.registerCallee = function( name, onCallFn ) {
	this._checkCompatibility();

	if( typeof name !== 'string' ) {
		throw new Error( 'Invalid callee name ' + name );
	}

	if( typeof onCallFn !== 'function' ) {
		throw new Error( 'Callback is not a function' );
	}

	if( this._localCallees[ name ] ) {
		throw new Error( 'Callee ' + name + ' is already registered' );
	}

	this._localCallees[ name ] = onCallFn;
	this._ackTimeoutRegistry.add( name );
	this._connection.sendMsg( C.TOPIC.WEBRTC, C.ACTIONS.WEBRTC_REGISTER_CALLEE, [ name ] );
};

/**
 * Removes a callee that was previously registered with WebRtcHandler.registerCallee
 *
 * @param   {String} name calleeName
 *
 * @public
 * @returns {void}
 */
WebRtcHandler.prototype.unregisterCallee = function( name ) {
	if( !this._localCallees[ name ] ) {
		throw new Error( 'Callee is not registered' );
	}
	
	this._removeCallee( name );
	this._ackTimeoutRegistry.add( name );
	this._connection.sendMsg( C.TOPIC.WEBRTC, C.ACTIONS.WEBRTC_UNREGISTER_CALLEE, [ name ] );
};

/**
 * Creates a call to another registered callee. This call can still be declined or remain unanswered. The call
 * object that this method returns will emit an 'established' event once the other side has accepted it and shares
 * its video/audio stream.
 *
 * @param   {String} calleeName  The name of a previously registered callee
 * @param 	{Object} metaData	Additional information that will be passed to the receiver's onCall function
 * @param   {[MediaStream]} localStream A local media stream. Can be ommited if the call is used purely for data.

 * @public
 * @returns {WebRtcCall}
 */
WebRtcHandler.prototype.makeCall = function( calleeName, metaData, localStream ) {
	this._checkCompatibility();

	if( typeof calleeName !== 'string' ) {
		throw new Error( 'Callee must be provided as string' );
	}

	if( typeof metaData !== 'object' ) {
		throw new Error( 'metaData must be provided' );
	}

	if( this._calls[ calleeName ] ) {
		throw new Error( 'Call with ' + calleeName + ' is already in progress' );
	}

	var localId = this._client.getUid();

	this._ackTimeoutRegistry.add( localId );

	return this._createCall( calleeName, {
		isOutgoing: true,
		connection: this._connection, 
		localId: localId, 
		remoteId: calleeName, 
		localStream: localStream,
		offer: null,
		metaData: metaData
	});
};
 
/**
 * Register a listener that will be invoked with all callees that are currently registered. This is
 * useful to create a "phone-book" display. Only one listener can be registered at a time
 *
 * @param   {Function} callback Will be invoked initially and every time a callee is added or removed
 *
 * @public
 * @returns {void}
 */
WebRtcHandler.prototype.listenForCallees = function( callback ) {
	if( this._remoteCalleesCallback !== null ) {
		throw new Error( 'Already listening for callees' );
	}
	this._remoteCalleesCallback = callback;
	this._ackTimeoutRegistry.add( CALLEE_UPDATE_EVENT );
	this._connection.sendMsg( C.TOPIC.WEBRTC, C.ACTIONS.WEBRTC_LISTEN_FOR_CALLEES );
};

/**
 * Removes the listener that was previously registered with listenForCallees
 *
 * @public
 * @returns {void}
 */
WebRtcHandler.prototype.unlistenForCallees = function() {
	if( !this._remoteCalleesCallback ) {
		throw new Error( 'Not listening for callees' );
	}
	this._remoteCalleesCallback = null;
	this._ackTimeoutRegistry.add( CALLEE_UPDATE_EVENT );
	this._connection.sendMsg( C.TOPIC.WEBRTC, C.ACTIONS.WEBRTC_UNLISTEN_FOR_CALLEES );
};

/**
 * This method is invoked whenever an incoming call message is received. It constracts
 * a call object and passes it to the callback function that was registered with registerCallee
 *
 * @param   {Object} message parsed deepstream message
 *
 * @private
 * @returns {void}
 */
WebRtcHandler.prototype._handleIncomingCall = function( message ) {
	var remoteId = message.data[ 0 ],
		localId = message.data[ 1 ],
		offer = JSON.parse( message.data[ 2 ] ),
		call = this._createCall( remoteId, {
			isOutgoing: false,
			connection: this._connection, 
			localId: localId, 
			remoteId: remoteId, 
			localStream: null,
			metaData: offer.meta,
			offer: offer
		});

	this._localCallees[ localId ]( call, offer.meta );
};

/**
 * Removes a call from the internal cache. This can be the result of a call ending, being
 * declined or erroring.
 *
 * @param   {String} id The temporary id (receiverName for incoming-, senderName for outgoing calls)
 *
 * @private
 * @returns {void}
 */
WebRtcHandler.prototype._removeCall = function( id ) {
	delete this._calls[ id ];
};

/**
 * Creates a new instance of WebRtcCall
 *
 * @param   {String} id The temporary id (receiverName for incoming-, senderName for outgoing calls)
 * @param   {Object} settings Call settings. Please see WebRtcCall for details
 *
 * @private
 * @returns {void}
 */
WebRtcHandler.prototype._createCall = function( id, settings ) {
	this._calls[ id ] = new WebRtcCall( settings, this._options );
	this._calls[ id ].on( 'ended', this._removeCall.bind( this, id ) );
	return this._calls[ id ];
};

/**
 * All call-related messages (offer, answer, ice candidate, decline, end etc.) share the same data signature.
 *
 * [ senderName, receiverName, arbitrary data string ]
 *
 * This method makes sure the message is in the correct format.
 *
 * @param   {Object}  message A parsed deepstream message
 *
 * @private
 * @returns {Boolean}
 */
WebRtcHandler.prototype._isValidMessage = function( message ) {
	return message.data.length === 3 &&
	typeof message.data[ 0 ] === 'string' &&
	typeof message.data[ 1 ] === 'string' &&
	typeof message.data[ 2 ] === 'string';
};

/**
 * Returns true if the messages is an update to the list of updated callees
 *
 * @param   {Object}  message A parsed deepstream message
 *
 * @private
 * @returns {Boolean}
 */
WebRtcHandler.prototype._isCalleeUpdate = function( message ) {
	return 	message.action === C.ACTIONS.WEBRTC_ALL_CALLEES ||
			message.action === C.ACTIONS.WEBRTC_CALLEE_ADDED ||
			message.action === C.ACTIONS.WEBRTC_CALLEE_REMOVED;
};

/**
 * The WebRTC specification is still very much in flux and implementations are fairly unstandardized. To
 * get WebRTC to work across all supporting browsers it is therefor crucial to use a shim / adapter script
 * to normalize implementation specifities.
 *
 * This adapter script however is not included with the client. This is for three reasons:
 * 
 * - Whilst WebRTC is a great feature of deepstream, it is not a central one. Most usecases will probably
 *   focus on Records, Events and RPCs. We've therefor choosen to rather reduce the client size and leave
 *   it to WebRTC users to include the script themselves
 *
 * - Since the API differences are still subject to frequent change it is likely that updates to the WebRTC
 *   adapter script will be quite frequent. By making it a seperate dependency it can be updated individually
 *   as soon as it is released.
 *
 * - Whilst working well, the code quality of adapter is rather poor. It lives in the global namespace, adds
 *   console logs etc.
 *
 * This method checks if all the WebRTC related objects that it will use further down the line are present
 * and if not recommends usage of the WebRTC adapter script
 *
 * @private
 * @returns {void}
 */
WebRtcHandler.prototype._checkCompatibility = function() {
	if(
		typeof RTCPeerConnection === 'undefined' ||
		typeof RTCSessionDescription === 'undefined' ||
		typeof RTCIceCandidate === 'undefined'
	){
		var msg =  'RTC global objects not detected. \n';
			msg += 'deepstream expects a standardized WebRtc implementation (e.g. no vendor prefixes etc.) \n';
			msg += 'until WebRtc is fully supported, we recommend including the official WebRTC adapter script \n';
			msg += 'which can be found at https://github.com/webrtc/adapter';

		throw new Error( msg );
	}
};

/**
 * Removes a callee from the internal cache as a result of an ACK timeout or the callee being unregistered.
 *
 * @param   {String} calleeName A local callee that was previously registered using registerCallee
 *
 * @private
 * @returns {void}
 */
WebRtcHandler.prototype._removeCallee = function( calleeName ) {
	delete this._localCallees[ calleeName ];
};

/**
 * Processes an update to the list of callees that are registered with deepstream. When listenForCallees
 * is initally called, it receives a full list of all registered callees. From there on it is only
 * send deltas. This method merges the delta updates into the full array of registered callees and
 * invokes the listener callback with the result.
 *
 * @param   {Object} message a parsed deepstream message
 *
 * @private
 * @returns {void}
 */
WebRtcHandler.prototype._processCalleeUpdate = function( message ) {
	if( this._remoteCalleesCallback === null ) {
		this._client._$onError( C.TOPIC.WEBRTC, C.EVENT.UNSOLICITED_MESSAGE, message.raw );
		return;
	}

	if( message.action === C.ACTIONS.WEBRTC_ALL_CALLEES ) {
		this._remoteCallees = message.data;
	}

	var index = this._remoteCallees.indexOf( message.data[ 0 ] );
	
	if( message.action === C.ACTIONS.WEBRTC_CALLEE_ADDED ) {
		if( index !== -1 ) {
			return;
		}
		this._remoteCallees.push( message.data[ 0 ] );
	}
	else if ( message.action === C.ACTIONS.WEBRTC_CALLEE_REMOVED ) {
		if( index === -1 ) {
			return;
		}
		this._remoteCallees.splice( index, 1 );
	}

	this._remoteCalleesCallback( this._remoteCallees );
};

/**
 * The main method for incoming WebRTC messages.
 *
 * @param   {Object} message a parsed deepstream message
 *
 *
 * @private
 * 
 * @returns {void}
 */
WebRtcHandler.prototype._$handle = function( message ) {
	var call,
		sessionDescription,
		iceCandidate;

	if( message.action === C.ACTIONS.ERROR ) {
		this._client._$onError( C.TOPIC.WEBRTC, message.data[ 0 ], message.data[ 1 ] );
		return;
	}

	if( message.action === C.ACTIONS.ACK ) {
		this._ackTimeoutRegistry.clear( message );
		return;
	}

	if( this._isCalleeUpdate( message ) ) {
		this._processCalleeUpdate( message );
		return;	
	}

	if( message.action === C.ACTIONS.WEBRTC_IS_ALIVE ) {
		if( message.data[ 1 ] === 'false' && this._calls[ message.data[ 0 ] ] ) {
			this._calls[ message.data[ 0 ] ]._$close();
		}
		return;
	}

	if( !this._isValidMessage( message ) ) {
		this._client._$onError( C.TOPIC.WEBRTC, C.EVENT.MESSAGE_PARSE_ERROR, message );
		return;
	}

	if( message.action === C.ACTIONS.WEBRTC_OFFER ) {
		this._handleIncomingCall( message );
		return;
	}

	call = this._calls[ message.data[ 0 ] ] || this._calls[ message.data[ 1 ] ];

	if( !call ) {
		this._client._$onError( C.TOPIC.WEBRTC, C.EVENT.UNSOLICITED_MESSAGE, message.raw );
		return;
	}
	
	if ( message.action === C.ACTIONS.WEBRTC_ANSWER ) {
		sessionDescription = new RTCSessionDescription( JSON.parse( message.data[ 2 ] ) );
		call._$webRtcConnection.setRemoteDescription( sessionDescription );
		return;
	}
	
	if( message.action === C.ACTIONS.WEBRTC_ICE_CANDIDATE ) {
		iceCandidate = new RTCIceCandidate( JSON.parse( message.data[ 2 ] ) );
		call._$addIceCandidate( iceCandidate );
		return;
	}

	if( message.action === C.ACTIONS.WEBRTC_CALL_DECLINED ) {
		call._$declineReceived( message.data[ 2 ] );
		return;
	}
	
	if( message.action === C.ACTIONS.WEBRTC_CALL_ENDED ) {
		call._$close();
		return;
	}

	this._client._$onError( C.TOPIC.WEBRTC, C.EVENT.EVENT.MESSAGE_PARSE_ERROR, 'unsupported action ' + message.action );
};

module.exports = WebRtcHandler;
},{"../constants/constants":35,"../utils/ack-timeout-registry":50,"./webrtc-call":55,"./webrtc-connection":56}]},{},[34])(34)
});