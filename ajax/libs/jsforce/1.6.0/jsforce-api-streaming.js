(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Streaming = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Streaming APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var events = window.jsforce.require('events'),
    inherits = window.jsforce.require('inherits'),
    _ = window.jsforce.require('lodash/core'),
    Faye   = require('faye'),
    jsforce = window.jsforce.require('./core');

/**
 * Streaming API topic class
 *
 * @class Streaming~Topic
 * @param {Streaming} steaming - Streaming API object
 * @param {String} name - Topic name
 */
var Topic = function(streaming, name) {
  this._streaming = streaming;
  this.name = name;
};

/**
 * @typedef {Object} Streaming~StreamingMessage
 * @prop {Object} event
 * @prop {Object} event.type - Event type
 * @prop {Record} sobject - Record information
 */
/**
 * Subscribe listener to topic
 *
 * @method Streaming~Topic#subscribe
 * @param {Callback.<Streaming~StreamingMesasge>} listener - Streaming message listener
 * @returns {Subscription} - Faye subscription object
 */
Topic.prototype.subscribe = function(listener) {
  return this._streaming.subscribe(this.name, listener);
};

/**
 * Unsubscribe listener from topic
 *
 * @method Streaming~Topic#unsubscribe
 * @param {Callback.<Streaming~StreamingMesasge>} listener - Streaming message listener
 * @returns {Streaming~Topic}
 */
Topic.prototype.unsubscribe = function(listener) {
  this._streaming.unsubscribe(this.name, listener);
  return this;
};

/*--------------------------------------------*/

/**
 * Streaming API Generic Streaming Channel
 *
 * @class Streaming~Channel
 * @param {Streaming} steaming - Streaming API object
 * @param {String} name - Channel name (starts with "/u/")
 */
var Channel = function(streaming, name) {
  this._streaming = streaming;
  this._name = name;
};

/**
 * Subscribe to hannel
 *
 * @param {Callback.<Streaming~StreamingMessage>} listener - Streaming message listener
 * @returns {Subscription} - Faye subscription object
 */
Channel.prototype.subscribe = function(listener) {
  return this._streaming.subscribe(this._name, listener);
};

Channel.prototype.unsubscribe = function(listener) {
  this._streaming.unsubscribe(this._name, listener);
  return this;
};

Channel.prototype.push = function(events, callback) {
  var isArray = _.isArray(events);
  events = isArray ? events : [ events ];
  var conn = this._streaming._conn;
  if (!this._id) {
    this._id = conn.sobject('StreamingChannel').findOne({ Name: this._name }, 'Id')
      .then(function(rec) { return rec.Id });
  }
  return this._id.then(function(id) {
    var channelUrl = '/sobjects/StreamingChannel/' + id + '/push';
    return conn.requestPost(channelUrl, { pushEvents: events });
  }).then(function(rets) {
    return isArray ? rets : rets[0];
  }).thenCall(callback);
};

/*--------------------------------------------*/

/**
 * Streaming API class
 *
 * @class
 * @extends events.EventEmitter
 * @param {Connection} conn - Connection object
 */
var Streaming = function(conn) {
  this._conn = conn;
};

inherits(Streaming, events.EventEmitter);

/** @private **/
Streaming.prototype._createClient = function(replay) {
  var endpointUrl = [ this._conn.instanceUrl, "cometd" + (replay ? "/replay" : ""), this._conn.version ].join('/');
  var fayeClient = new Faye.Client(endpointUrl, {});
  fayeClient.setHeader('Authorization', 'OAuth '+this._conn.accessToken);
  return fayeClient;
};

/** @private **/
Streaming.prototype._getFayeClient = function(channelName) {
  var isGeneric = channelName.indexOf('/u/') === 0;
  var clientType = isGeneric ? 'generic' : 'pushTopic';
  if (!this._fayeClients || !this._fayeClients[clientType]) {
    this._fayeClients = this._fayeClients || {};
    this._fayeClients[clientType] = this._createClient(isGeneric);
    if (Faye.Transport.NodeHttp) {
      Faye.Transport.NodeHttp.prototype.batching = false; // prevent streaming API server error
    }
  }
  return this._fayeClients[clientType];
};


/**
 * Get named topic
 *
 * @param {String} name - Topic name
 * @returns {Streaming~Topic}
 */
Streaming.prototype.topic = function(name) {
  this._topics = this._topics || {};
  var topic = this._topics[name] =
    this._topics[name] || new Topic(this, name);
  return topic;
};

/**
 * Get Channel for Id
 * @param {String} channelId - Id of StreamingChannel object
 * @returns {Streaming~Channel}
 */
Streaming.prototype.channel = function(channelId) {
  return new Channel(this, channelId);
};

/**
 * Subscribe topic/channel
 *
 * @param {String} name - Topic name
 * @param {Callback.<Streaming~StreamingMessage>} listener - Streaming message listener
 * @returns {Subscription} - Faye subscription object
 */
Streaming.prototype.subscribe = function(name, listener) {
  var channelName = name.indexOf('/') === 0 ? name : '/topic/' + name;
  var fayeClient = this._getFayeClient(channelName);
  return fayeClient.subscribe(channelName, listener);
};

/**
 * Unsubscribe topic
 *
 * @param {String} name - Topic name
 * @param {Callback.<Streaming~StreamingMessage>} listener - Streaming message listener
 * @returns {Streaming}
 */
Streaming.prototype.unsubscribe = function(name, listener) {
  var channelName = name.indexOf('/') === 0 ? name : '/topic/' + name;
  var fayeClient = this._getFayeClient(channelName);
  fayeClient.unsubscribe(channelName, listener);
  return this;
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.streaming = new Streaming(conn);
});


module.exports = Streaming;

},{"faye":3}],2:[function(require,module,exports){
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
(function (process,global){
(function() {
'use strict';

var Faye = {
  VERSION:          '1.1.2',

  BAYEUX_VERSION:   '1.0',
  ID_LENGTH:        160,
  JSONP_CALLBACK:   'jsonpcallback',
  CONNECTION_TYPES: ['long-polling', 'cross-origin-long-polling', 'callback-polling', 'websocket', 'eventsource', 'in-process'],

  MANDATORY_CONNECTION_TYPES: ['long-polling', 'callback-polling', 'in-process'],

  ENV: (typeof window !== 'undefined') ? window : global,

  extend: function(dest, source, overwrite) {
    if (!source) return dest;
    for (var key in source) {
      if (!source.hasOwnProperty(key)) continue;
      if (dest.hasOwnProperty(key) && overwrite === false) continue;
      if (dest[key] !== source[key])
        dest[key] = source[key];
    }
    return dest;
  },

  random: function(bitlength) {
    bitlength = bitlength || this.ID_LENGTH;
    var maxLength = Math.ceil(bitlength * Math.log(2) / Math.log(36));
    var string = csprng(bitlength, 36);
    while (string.length < maxLength) string = '0' + string;
    return string;
  },

  validateOptions: function(options, validKeys) {
    for (var key in options) {
      if (this.indexOf(validKeys, key) < 0)
        throw new Error('Unrecognized option: ' + key);
    }
  },

  clientIdFromMessages: function(messages) {
    var connect = this.filter([].concat(messages), function(message) {
      return message.channel === '/meta/connect';
    });
    return connect[0] && connect[0].clientId;
  },

  copyObject: function(object) {
    var clone, i, key;
    if (object instanceof Array) {
      clone = [];
      i = object.length;
      while (i--) clone[i] = Faye.copyObject(object[i]);
      return clone;
    } else if (typeof object === 'object') {
      clone = (object === null) ? null : {};
      for (key in object) clone[key] = Faye.copyObject(object[key]);
      return clone;
    } else {
      return object;
    }
  },

  commonElement: function(lista, listb) {
    for (var i = 0, n = lista.length; i < n; i++) {
      if (this.indexOf(listb, lista[i]) !== -1)
        return lista[i];
    }
    return null;
  },

  indexOf: function(list, needle) {
    if (list.indexOf) return list.indexOf(needle);

    for (var i = 0, n = list.length; i < n; i++) {
      if (list[i] === needle) return i;
    }
    return -1;
  },

  map: function(object, callback, context) {
    if (object.map) return object.map(callback, context);
    var result = [];

    if (object instanceof Array) {
      for (var i = 0, n = object.length; i < n; i++) {
        result.push(callback.call(context || null, object[i], i));
      }
    } else {
      for (var key in object) {
        if (!object.hasOwnProperty(key)) continue;
        result.push(callback.call(context || null, key, object[key]));
      }
    }
    return result;
  },

  filter: function(array, callback, context) {
    if (array.filter) return array.filter(callback, context);
    var result = [];
    for (var i = 0, n = array.length; i < n; i++) {
      if (callback.call(context || null, array[i], i))
        result.push(array[i]);
    }
    return result;
  },

  asyncEach: function(list, iterator, callback, context) {
    var n       = list.length,
        i       = -1,
        calls   = 0,
        looping = false;

    var iterate = function() {
      calls -= 1;
      i += 1;
      if (i === n) return callback && callback.call(context);
      iterator(list[i], resume);
    };

    var loop = function() {
      if (looping) return;
      looping = true;
      while (calls > 0) iterate();
      looping = false;
    };

    var resume = function() {
      calls += 1;
      loop();
    };
    resume();
  },

  // http://assanka.net/content/tech/2009/09/02/json2-js-vs-prototype/
  toJSON: function(object) {
    if (!this.stringify) return JSON.stringify(object);

    return this.stringify(object, function(key, value) {
      return (this[key] instanceof Array) ? this[key] : value;
    });
  }
};

if (typeof module !== 'undefined')
  module.exports = Faye;
else if (typeof window !== 'undefined')
  window.Faye = Faye;

Faye.Class = function(parent, methods) {
  if (typeof parent !== 'function') {
    methods = parent;
    parent  = Object;
  }

  var klass = function() {
    if (!this.initialize) return this;
    return this.initialize.apply(this, arguments) || this;
  };

  var bridge = function() {};
  bridge.prototype = parent.prototype;

  klass.prototype = new bridge();
  Faye.extend(klass.prototype, methods);

  return klass;
};

(function() {
var EventEmitter = Faye.EventEmitter = function() {};

/*
Copyright Joyent, Inc. and other Node contributors. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
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
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {
    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})();

Faye.Namespace = Faye.Class({
  initialize: function() {
    this._used = {};
  },

  exists: function(id) {
    return this._used.hasOwnProperty(id);
  },

  generate: function() {
    var name = Faye.random();
    while (this._used.hasOwnProperty(name))
      name = Faye.random();
    return this._used[name] = name;
  },

  release: function(id) {
    delete this._used[id];
  }
});

(function() {
'use strict';

var timeout = setTimeout, defer;

if (typeof setImmediate === 'function')
  defer = function(fn) { setImmediate(fn) };
else if (typeof process === 'object' && process.nextTick)
  defer = function(fn) { process.nextTick(fn) };
else
  defer = function(fn) { timeout(fn, 0) };

var PENDING   = 0,
    FULFILLED = 1,
    REJECTED  = 2;

var RETURN = function(x) { return x },
    THROW  = function(x) { throw  x };

var Promise = function(task) {
  this._state       = PENDING;
  this._onFulfilled = [];
  this._onRejected  = [];

  if (typeof task !== 'function') return;
  var self = this;

  task(function(value)  { fulfill(self, value) },
       function(reason) { reject(self, reason) });
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var next = new Promise();
  registerOnFulfilled(this, onFulfilled, next);
  registerOnRejected(this, onRejected, next);
  return next;
};

var registerOnFulfilled = function(promise, onFulfilled, next) {
  if (typeof onFulfilled !== 'function') onFulfilled = RETURN;
  var handler = function(value) { invoke(onFulfilled, value, next) };

  if (promise._state === PENDING) {
    promise._onFulfilled.push(handler);
  } else if (promise._state === FULFILLED) {
    handler(promise._value);
  }
};

var registerOnRejected = function(promise, onRejected, next) {
  if (typeof onRejected !== 'function') onRejected = THROW;
  var handler = function(reason) { invoke(onRejected, reason, next) };

  if (promise._state === PENDING) {
    promise._onRejected.push(handler);
  } else if (promise._state === REJECTED) {
    handler(promise._reason);
  }
};

var invoke = function(fn, value, next) {
  defer(function() { _invoke(fn, value, next) });
};

var _invoke = function(fn, value, next) {
  var outcome;

  try {
    outcome = fn(value);
  } catch (error) {
    return reject(next, error);
  }

  if (outcome === next) {
    reject(next, new TypeError('Recursive promise chain detected'));
  } else {
    fulfill(next, outcome);
  }
};

var fulfill = Promise.fulfill = Promise.resolve = function(promise, value) {
  var called = false, type, then;

  try {
    type = typeof value;
    then = value !== null && (type === 'function' || type === 'object') && value.then;

    if (typeof then !== 'function') return _fulfill(promise, value);

    then.call(value, function(v) {
      if (!(called ^ (called = true))) return;
      fulfill(promise, v);
    }, function(r) {
      if (!(called ^ (called = true))) return;
      reject(promise, r);
    });
  } catch (error) {
    if (!(called ^ (called = true))) return;
    reject(promise, error);
  }
};

var _fulfill = function(promise, value) {
  if (promise._state !== PENDING) return;

  promise._state      = FULFILLED;
  promise._value      = value;
  promise._onRejected = [];

  var onFulfilled = promise._onFulfilled, fn;
  while (fn = onFulfilled.shift()) fn(value);
};

var reject = Promise.reject = function(promise, reason) {
  if (promise._state !== PENDING) return;

  promise._state       = REJECTED;
  promise._reason      = reason;
  promise._onFulfilled = [];

  var onRejected = promise._onRejected, fn;
  while (fn = onRejected.shift()) fn(reason);
};

Promise.all = function(promises) {
  return new Promise(function(fulfill, reject) {
    var list = [],
         n   = promises.length,
         i;

    if (n === 0) return fulfill(list);

    for (i = 0; i < n; i++) (function(promise, i) {
      Promise.fulfilled(promise).then(function(value) {
        list[i] = value;
        if (--n === 0) fulfill(list);
      }, reject);
    })(promises[i], i);
  });
};

Promise.defer = defer;

Promise.deferred = Promise.pending = function() {
  var tuple = {};

  tuple.promise = new Promise(function(fulfill, reject) {
    tuple.fulfill = tuple.resolve = fulfill;
    tuple.reject  = reject;
  });
  return tuple;
};

Promise.fulfilled = Promise.resolved = function(value) {
  return new Promise(function(fulfill, reject) { fulfill(value) });
};

Promise.rejected = function(reason) {
  return new Promise(function(fulfill, reject) { reject(reason) });
};

if (typeof Faye === 'undefined')
  module.exports = Promise;
else
  Faye.Promise = Promise;

})();

Faye.Set = Faye.Class({
  initialize: function() {
    this._index = {};
  },

  add: function(item) {
    var key = (item.id !== undefined) ? item.id : item;
    if (this._index.hasOwnProperty(key)) return false;
    this._index[key] = item;
    return true;
  },

  forEach: function(block, context) {
    for (var key in this._index) {
      if (this._index.hasOwnProperty(key))
        block.call(context, this._index[key]);
    }
  },

  isEmpty: function() {
    for (var key in this._index) {
      if (this._index.hasOwnProperty(key)) return false;
    }
    return true;
  },

  member: function(item) {
    for (var key in this._index) {
      if (this._index[key] === item) return true;
    }
    return false;
  },

  remove: function(item) {
    var key = (item.id !== undefined) ? item.id : item;
    var removed = this._index[key];
    delete this._index[key];
    return removed;
  },

  toArray: function() {
    var array = [];
    this.forEach(function(item) { array.push(item) });
    return array;
  }
});

Faye.URI = {
  isURI: function(uri) {
    return uri && uri.protocol && uri.host && uri.path;
  },

  isSameOrigin: function(uri) {
    var location = Faye.ENV.location;
    return uri.protocol === location.protocol &&
           uri.hostname === location.hostname &&
           uri.port     === location.port;
  },

  parse: function(url) {
    if (typeof url !== 'string') return url;
    var uri = {}, parts, query, pairs, i, n, data;

    var consume = function(name, pattern) {
      url = url.replace(pattern, function(match) {
        uri[name] = match;
        return '';
      });
      uri[name] = uri[name] || '';
    };

    consume('protocol', /^[a-z]+\:/i);
    consume('host',     /^\/\/[^\/\?#]+/);

    if (!/^\//.test(url) && !uri.host)
      url = Faye.ENV.location.pathname.replace(/[^\/]*$/, '') + url;

    consume('pathname', /^[^\?#]*/);
    consume('search',   /^\?[^#]*/);
    consume('hash',     /^#.*/);

    uri.protocol = uri.protocol || Faye.ENV.location.protocol;

    if (uri.host) {
      uri.host     = uri.host.substr(2);
      parts        = uri.host.split(':');
      uri.hostname = parts[0];
      uri.port     = parts[1] || '';
    } else {
      uri.host     = Faye.ENV.location.host;
      uri.hostname = Faye.ENV.location.hostname;
      uri.port     = Faye.ENV.location.port;
    }

    uri.pathname = uri.pathname || '/';
    uri.path = uri.pathname + uri.search;

    query = uri.search.replace(/^\?/, '');
    pairs = query ? query.split('&') : [];
    data  = {};

    for (i = 0, n = pairs.length; i < n; i++) {
      parts = pairs[i].split('=');
      data[decodeURIComponent(parts[0] || '')] = decodeURIComponent(parts[1] || '');
    }

    uri.query = data;

    uri.href = this.stringify(uri);
    return uri;
  },

  stringify: function(uri) {
    var string = uri.protocol + '//' + uri.hostname;
    if (uri.port) string += ':' + uri.port;
    string += uri.pathname + this.queryString(uri.query) + (uri.hash || '');
    return string;
  },

  queryString: function(query) {
    var pairs = [];
    for (var key in query) {
      if (!query.hasOwnProperty(key)) continue;
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
    }
    if (pairs.length === 0) return '';
    return '?' + pairs.join('&');
  }
};

Faye.Error = Faye.Class({
  initialize: function(code, params, message) {
    this.code    = code;
    this.params  = Array.prototype.slice.call(params);
    this.message = message;
  },

  toString: function() {
    return this.code + ':' +
           this.params.join(',') + ':' +
           this.message;
  }
});

Faye.Error.parse = function(message) {
  message = message || '';
  if (!Faye.Grammar.ERROR.test(message)) return new this(null, [], message);

  var parts   = message.split(':'),
      code    = parseInt(parts[0]),
      params  = parts[1].split(','),
      message = parts[2];

  return new this(code, params, message);
};




Faye.Error.versionMismatch = function() {
  return new this(300, arguments, 'Version mismatch').toString();
};

Faye.Error.conntypeMismatch = function() {
  return new this(301, arguments, 'Connection types not supported').toString();
};

Faye.Error.extMismatch = function() {
  return new this(302, arguments, 'Extension mismatch').toString();
};

Faye.Error.badRequest = function() {
  return new this(400, arguments, 'Bad request').toString();
};

Faye.Error.clientUnknown = function() {
  return new this(401, arguments, 'Unknown client').toString();
};

Faye.Error.parameterMissing = function() {
  return new this(402, arguments, 'Missing required parameter').toString();
};

Faye.Error.channelForbidden = function() {
  return new this(403, arguments, 'Forbidden channel').toString();
};

Faye.Error.channelUnknown = function() {
  return new this(404, arguments, 'Unknown channel').toString();
};

Faye.Error.channelInvalid = function() {
  return new this(405, arguments, 'Invalid channel').toString();
};

Faye.Error.extUnknown = function() {
  return new this(406, arguments, 'Unknown extension').toString();
};

Faye.Error.publishFailed = function() {
  return new this(407, arguments, 'Failed to publish').toString();
};

Faye.Error.serverError = function() {
  return new this(500, arguments, 'Internal server error').toString();
};


Faye.Deferrable = {
  then: function(callback, errback) {
    var self = this;
    if (!this._promise)
      this._promise = new Faye.Promise(function(fulfill, reject) {
        self._fulfill = fulfill;
        self._reject  = reject;
      });

    if (arguments.length === 0)
      return this._promise;
    else
      return this._promise.then(callback, errback);
  },

  callback: function(callback, context) {
    return this.then(function(value) { callback.call(context, value) });
  },

  errback: function(callback, context) {
    return this.then(null, function(reason) { callback.call(context, reason) });
  },

  timeout: function(seconds, message) {
    this.then();
    var self = this;
    this._timer = Faye.ENV.setTimeout(function() {
      self._reject(message);
    }, seconds * 1000);
  },

  setDeferredStatus: function(status, value) {
    if (this._timer) Faye.ENV.clearTimeout(this._timer);

    this.then();

    if (status === 'succeeded')
      this._fulfill(value);
    else if (status === 'failed')
      this._reject(value);
    else
      delete this._promise;
  }
};

Faye.Publisher = {
  countListeners: function(eventType) {
    return this.listeners(eventType).length;
  },

  bind: function(eventType, listener, context) {
    var slice   = Array.prototype.slice,
        handler = function() { listener.apply(context, slice.call(arguments)) };

    this._listeners = this._listeners || [];
    this._listeners.push([eventType, listener, context, handler]);
    return this.on(eventType, handler);
  },

  unbind: function(eventType, listener, context) {
    this._listeners = this._listeners || [];
    var n = this._listeners.length, tuple;

    while (n--) {
      tuple = this._listeners[n];
      if (tuple[0] !== eventType) continue;
      if (listener && (tuple[1] !== listener || tuple[2] !== context)) continue;
      this._listeners.splice(n, 1);
      this.removeListener(eventType, tuple[3]);
    }
  }
};

Faye.extend(Faye.Publisher, Faye.EventEmitter.prototype);
Faye.Publisher.trigger = Faye.Publisher.emit;

Faye.Timeouts = {
  addTimeout: function(name, delay, callback, context) {
    this._timeouts = this._timeouts || {};
    if (this._timeouts.hasOwnProperty(name)) return;
    var self = this;
    this._timeouts[name] = Faye.ENV.setTimeout(function() {
      delete self._timeouts[name];
      callback.call(context);
    }, 1000 * delay);
  },

  removeTimeout: function(name) {
    this._timeouts = this._timeouts || {};
    var timeout = this._timeouts[name];
    if (!timeout) return;
    Faye.ENV.clearTimeout(timeout);
    delete this._timeouts[name];
  },

  removeAllTimeouts: function() {
    this._timeouts = this._timeouts || {};
    for (var name in this._timeouts) this.removeTimeout(name);
  }
};

Faye.Logging = {
  LOG_LEVELS: {
    fatal:  4,
    error:  3,
    warn:   2,
    info:   1,
    debug:  0
  },

  writeLog: function(messageArgs, level) {
    if (!Faye.logger) return;

    var args   = Array.prototype.slice.apply(messageArgs),
        banner = '[Faye',
        klass  = this.className,

        message = args.shift().replace(/\?/g, function() {
          try {
            return Faye.toJSON(args.shift());
          } catch (e) {
            return '[Object]';
          }
        });

    for (var key in Faye) {
      if (klass) continue;
      if (typeof Faye[key] !== 'function') continue;
      if (this instanceof Faye[key]) klass = key;
    }
    if (klass) banner += '.' + klass;
    banner += '] ';

    if (typeof Faye.logger[level] === 'function')
      Faye.logger[level](banner + message);
    else if (typeof Faye.logger === 'function')
      Faye.logger(banner + message);
  }
};

(function() {
  for (var key in Faye.Logging.LOG_LEVELS)
    (function(level) {
      Faye.Logging[level] = function() {
        this.writeLog(arguments, level);
      };
    })(key);
})();

Faye.Grammar = {
  CHANNEL_NAME:     /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
  CHANNEL_PATTERN:  /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
  ERROR:            /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
  VERSION:          /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
};

Faye.Extensible = {
  addExtension: function(extension) {
    this._extensions = this._extensions || [];
    this._extensions.push(extension);
    if (extension.added) extension.added(this);
  },

  removeExtension: function(extension) {
    if (!this._extensions) return;
    var i = this._extensions.length;
    while (i--) {
      if (this._extensions[i] !== extension) continue;
      this._extensions.splice(i,1);
      if (extension.removed) extension.removed(this);
    }
  },

  pipeThroughExtensions: function(stage, message, request, callback, context) {
    this.debug('Passing through ? extensions: ?', stage, message);

    if (!this._extensions) return callback.call(context, message);
    var extensions = this._extensions.slice();

    var pipe = function(message) {
      if (!message) return callback.call(context, message);

      var extension = extensions.shift();
      if (!extension) return callback.call(context, message);

      var fn = extension[stage];
      if (!fn) return pipe(message);

      if (fn.length >= 3) extension[stage](message, request, pipe);
      else                extension[stage](message, pipe);
    };
    pipe(message);
  }
};

Faye.extend(Faye.Extensible, Faye.Logging);

Faye.Channel = Faye.Class({
  initialize: function(name) {
    this.id = this.name = name;
  },

  push: function(message) {
    this.trigger('message', message);
  },

  isUnused: function() {
    return this.countListeners('message') === 0;
  }
});

Faye.extend(Faye.Channel.prototype, Faye.Publisher);

Faye.extend(Faye.Channel, {
  HANDSHAKE:    '/meta/handshake',
  CONNECT:      '/meta/connect',
  SUBSCRIBE:    '/meta/subscribe',
  UNSUBSCRIBE:  '/meta/unsubscribe',
  DISCONNECT:   '/meta/disconnect',

  META:         'meta',
  SERVICE:      'service',

  expand: function(name) {
    var segments = this.parse(name),
        channels = ['/**', name];

    var copy = segments.slice();
    copy[copy.length - 1] = '*';
    channels.push(this.unparse(copy));

    for (var i = 1, n = segments.length; i < n; i++) {
      copy = segments.slice(0, i);
      copy.push('**');
      channels.push(this.unparse(copy));
    }

    return channels;
  },

  isValid: function(name) {
    return Faye.Grammar.CHANNEL_NAME.test(name) ||
           Faye.Grammar.CHANNEL_PATTERN.test(name);
  },

  parse: function(name) {
    if (!this.isValid(name)) return null;
    return name.split('/').slice(1);
  },

  unparse: function(segments) {
    return '/' + segments.join('/');
  },

  isMeta: function(name) {
    var segments = this.parse(name);
    return segments ? (segments[0] === this.META) : null;
  },

  isService: function(name) {
    var segments = this.parse(name);
    return segments ? (segments[0] === this.SERVICE) : null;
  },

  isSubscribable: function(name) {
    if (!this.isValid(name)) return null;
    return !this.isMeta(name) && !this.isService(name);
  },

  Set: Faye.Class({
    initialize: function() {
      this._channels = {};
    },

    getKeys: function() {
      var keys = [];
      for (var key in this._channels) keys.push(key);
      return keys;
    },

    remove: function(name) {
      delete this._channels[name];
    },

    hasSubscription: function(name) {
      return this._channels.hasOwnProperty(name);
    },

    subscribe: function(names, callback, context) {
      var name;
      for (var i = 0, n = names.length; i < n; i++) {
        name = names[i];
        var channel = this._channels[name] = this._channels[name] || new Faye.Channel(name);
        if (callback) channel.bind('message', callback, context);
      }
    },

    unsubscribe: function(name, callback, context) {
      var channel = this._channels[name];
      if (!channel) return false;
      channel.unbind('message', callback, context);

      if (channel.isUnused()) {
        this.remove(name);
        return true;
      } else {
        return false;
      }
    },

    distributeMessage: function(message) {
      var channels = Faye.Channel.expand(message.channel);

      for (var i = 0, n = channels.length; i < n; i++) {
        var channel = this._channels[channels[i]];
        if (channel) channel.trigger('message', message.data);
      }
    }
  })
});

Faye.Publication = Faye.Class(Faye.Deferrable);

Faye.Subscription = Faye.Class({
  initialize: function(client, channels, callback, context) {
    this._client    = client;
    this._channels  = channels;
    this._callback  = callback;
    this._context     = context;
    this._cancelled = false;
  },

  cancel: function() {
    if (this._cancelled) return;
    this._client.unsubscribe(this._channels, this._callback, this._context);
    this._cancelled = true;
  },

  unsubscribe: function() {
    this.cancel();
  }
});

Faye.extend(Faye.Subscription.prototype, Faye.Deferrable);

Faye.Client = Faye.Class({
  UNCONNECTED:        1,
  CONNECTING:         2,
  CONNECTED:          3,
  DISCONNECTED:       4,

  HANDSHAKE:          'handshake',
  RETRY:              'retry',
  NONE:               'none',

  CONNECTION_TIMEOUT: 60,

  DEFAULT_ENDPOINT:   '/bayeux',
  INTERVAL:           0,

  initialize: function(endpoint, options) {
    this.info('New client created for ?', endpoint);
    options = options || {};

    Faye.validateOptions(options, ['interval', 'timeout', 'endpoints', 'proxy', 'retry', 'scheduler', 'websocketExtensions', 'tls', 'ca']);

    this._endpoint   = endpoint || this.DEFAULT_ENDPOINT;
    this._channels   = new Faye.Channel.Set();
    this._dispatcher = new Faye.Dispatcher(this, this._endpoint, options);

    this._messageId = 0;
    this._state     = this.UNCONNECTED;

    this._responseCallbacks = {};

    this._advice = {
      reconnect: this.RETRY,
      interval:  1000 * (options.interval || this.INTERVAL),
      timeout:   1000 * (options.timeout  || this.CONNECTION_TIMEOUT)
    };
    this._dispatcher.timeout = this._advice.timeout / 1000;

    this._dispatcher.bind('message', this._receiveMessage, this);

    if (Faye.Event && Faye.ENV.onbeforeunload !== undefined)
      Faye.Event.on(Faye.ENV, 'beforeunload', function() {
        if (Faye.indexOf(this._dispatcher._disabled, 'autodisconnect') < 0)
          this.disconnect();
      }, this);
  },

  addWebsocketExtension: function(extension) {
    return this._dispatcher.addWebsocketExtension(extension);
  },

  disable: function(feature) {
    return this._dispatcher.disable(feature);
  },

  setHeader: function(name, value) {
    return this._dispatcher.setHeader(name, value);
  },

  // Request
  // MUST include:  * channel
  //                * version
  //                * supportedConnectionTypes
  // MAY include:   * minimumVersion
  //                * ext
  //                * id
  //
  // Success Response                             Failed Response
  // MUST include:  * channel                     MUST include:  * channel
  //                * version                                    * successful
  //                * supportedConnectionTypes                   * error
  //                * clientId                    MAY include:   * supportedConnectionTypes
  //                * successful                                 * advice
  // MAY include:   * minimumVersion                             * version
  //                * advice                                     * minimumVersion
  //                * ext                                        * ext
  //                * id                                         * id
  //                * authSuccessful
  handshake: function(callback, context) {
    if (this._advice.reconnect === this.NONE) return;
    if (this._state !== this.UNCONNECTED) return;

    this._state = this.CONNECTING;
    var self = this;

    this.info('Initiating handshake with ?', Faye.URI.stringify(this._endpoint));
    this._dispatcher.selectTransport(Faye.MANDATORY_CONNECTION_TYPES);

    this._sendMessage({
      channel:                  Faye.Channel.HANDSHAKE,
      version:                  Faye.BAYEUX_VERSION,
      supportedConnectionTypes: this._dispatcher.getConnectionTypes()

    }, {}, function(response) {

      if (response.successful) {
        this._state = this.CONNECTED;
        this._dispatcher.clientId  = response.clientId;

        this._dispatcher.selectTransport(response.supportedConnectionTypes);

        this.info('Handshake successful: ?', this._dispatcher.clientId);

        this.subscribe(this._channels.getKeys(), true);
        if (callback) Faye.Promise.defer(function() { callback.call(context) });

      } else {
        this.info('Handshake unsuccessful');
        Faye.ENV.setTimeout(function() { self.handshake(callback, context) }, this._dispatcher.retry * 1000);
        this._state = this.UNCONNECTED;
      }
    }, this);
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  //                * connectionType                     * clientId
  // MAY include:   * ext                 MAY include:   * error
  //                * id                                 * advice
  //                                                     * ext
  //                                                     * id
  //                                                     * timestamp
  connect: function(callback, context) {
    if (this._advice.reconnect === this.NONE) return;
    if (this._state === this.DISCONNECTED) return;

    if (this._state === this.UNCONNECTED)
      return this.handshake(function() { this.connect(callback, context) }, this);

    this.callback(callback, context);
    if (this._state !== this.CONNECTED) return;

    this.info('Calling deferred actions for ?', this._dispatcher.clientId);
    this.setDeferredStatus('succeeded');
    this.setDeferredStatus('unknown');

    if (this._connectRequest) return;
    this._connectRequest = true;

    this.info('Initiating connection for ?', this._dispatcher.clientId);

    this._sendMessage({
      channel:        Faye.Channel.CONNECT,
      clientId:       this._dispatcher.clientId,
      connectionType: this._dispatcher.connectionType

    }, {}, this._cycleConnection, this);
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  // MAY include:   * ext                                * clientId
  //                * id                  MAY include:   * error
  //                                                     * ext
  //                                                     * id
  disconnect: function() {
    if (this._state !== this.CONNECTED) return;
    this._state = this.DISCONNECTED;

    this.info('Disconnecting ?', this._dispatcher.clientId);
    var promise = new Faye.Publication();

    this._sendMessage({
      channel:  Faye.Channel.DISCONNECT,
      clientId: this._dispatcher.clientId

    }, {}, function(response) {
      if (response.successful) {
        this._dispatcher.close();
        promise.setDeferredStatus('succeeded');
      } else {
        promise.setDeferredStatus('failed', Faye.Error.parse(response.error));
      }
    }, this);

    this.info('Clearing channel listeners for ?', this._dispatcher.clientId);
    this._channels = new Faye.Channel.Set();

    return promise;
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  //                * subscription                       * clientId
  // MAY include:   * ext                                * subscription
  //                * id                  MAY include:   * error
  //                                                     * advice
  //                                                     * ext
  //                                                     * id
  //                                                     * timestamp
  subscribe: function(channel, callback, context) {
    if (channel instanceof Array)
      return Faye.map(channel, function(c) {
        return this.subscribe(c, callback, context);
      }, this);

    var subscription = new Faye.Subscription(this, channel, callback, context),
        force        = (callback === true),
        hasSubscribe = this._channels.hasSubscription(channel);

    if (hasSubscribe && !force) {
      this._channels.subscribe([channel], callback, context);
      subscription.setDeferredStatus('succeeded');
      return subscription;
    }

    this.connect(function() {
      this.info('Client ? attempting to subscribe to ?', this._dispatcher.clientId, channel);
      if (!force) this._channels.subscribe([channel], callback, context);

      this._sendMessage({
        channel:      Faye.Channel.SUBSCRIBE,
        clientId:     this._dispatcher.clientId,
        subscription: channel

      }, {}, function(response) {
        if (!response.successful) {
          subscription.setDeferredStatus('failed', Faye.Error.parse(response.error));
          return this._channels.unsubscribe(channel, callback, context);
        }

        var channels = [].concat(response.subscription);
        this.info('Subscription acknowledged for ? to ?', this._dispatcher.clientId, channels);
        subscription.setDeferredStatus('succeeded');
      }, this);
    }, this);

    return subscription;
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  //                * subscription                       * clientId
  // MAY include:   * ext                                * subscription
  //                * id                  MAY include:   * error
  //                                                     * advice
  //                                                     * ext
  //                                                     * id
  //                                                     * timestamp
  unsubscribe: function(channel, callback, context) {
    if (channel instanceof Array)
      return Faye.map(channel, function(c) {
        return this.unsubscribe(c, callback, context);
      }, this);

    var dead = this._channels.unsubscribe(channel, callback, context);
    if (!dead) return;

    this.connect(function() {
      this.info('Client ? attempting to unsubscribe from ?', this._dispatcher.clientId, channel);

      this._sendMessage({
        channel:      Faye.Channel.UNSUBSCRIBE,
        clientId:     this._dispatcher.clientId,
        subscription: channel

      }, {}, function(response) {
        if (!response.successful) return;

        var channels = [].concat(response.subscription);
        this.info('Unsubscription acknowledged for ? from ?', this._dispatcher.clientId, channels);
      }, this);
    }, this);
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * data                               * successful
  // MAY include:   * clientId            MAY include:   * id
  //                * id                                 * error
  //                * ext                                * ext
  publish: function(channel, data, options) {
    Faye.validateOptions(options || {}, ['attempts', 'deadline']);
    var publication = new Faye.Publication();

    this.connect(function() {
      this.info('Client ? queueing published message to ?: ?', this._dispatcher.clientId, channel, data);

      this._sendMessage({
        channel:  channel,
        data:     data,
        clientId: this._dispatcher.clientId

      }, options, function(response) {
        if (response.successful)
          publication.setDeferredStatus('succeeded');
        else
          publication.setDeferredStatus('failed', Faye.Error.parse(response.error));
      }, this);
    }, this);

    return publication;
  },

  _sendMessage: function(message, options, callback, context) {
    message.id = this._generateMessageId();

    var timeout = this._advice.timeout
                ? 1.2 * this._advice.timeout / 1000
                : 1.2 * this._dispatcher.retry;

    this.pipeThroughExtensions('outgoing', message, null, function(message) {
      if (!message) return;
      if (callback) this._responseCallbacks[message.id] = [callback, context];
      this._dispatcher.sendMessage(message, timeout, options || {});
    }, this);
  },

  _generateMessageId: function() {
    this._messageId += 1;
    if (this._messageId >= Math.pow(2,32)) this._messageId = 0;
    return this._messageId.toString(36);
  },

  _receiveMessage: function(message) {
    var id = message.id, callback;

    if (message.successful !== undefined) {
      callback = this._responseCallbacks[id];
      delete this._responseCallbacks[id];
    }

    this.pipeThroughExtensions('incoming', message, null, function(message) {
      if (!message) return;
      if (message.advice) this._handleAdvice(message.advice);
      this._deliverMessage(message);
      if (callback) callback[0].call(callback[1], message);
    }, this);
  },

  _handleAdvice: function(advice) {
    Faye.extend(this._advice, advice);
    this._dispatcher.timeout = this._advice.timeout / 1000;

    if (this._advice.reconnect === this.HANDSHAKE && this._state !== this.DISCONNECTED) {
      this._state = this.UNCONNECTED;
      this._dispatcher.clientId = null;
      this._cycleConnection();
    }
  },

  _deliverMessage: function(message) {
    if (!message.channel || message.data === undefined) return;
    this.info('Client ? calling listeners for ? with ?', this._dispatcher.clientId, message.channel, message.data);
    this._channels.distributeMessage(message);
  },

  _cycleConnection: function() {
    if (this._connectRequest) {
      this._connectRequest = null;
      this.info('Closed connection for ?', this._dispatcher.clientId);
    }
    var self = this;
    Faye.ENV.setTimeout(function() { self.connect() }, this._advice.interval);
  }
});

Faye.extend(Faye.Client.prototype, Faye.Deferrable);
Faye.extend(Faye.Client.prototype, Faye.Publisher);
Faye.extend(Faye.Client.prototype, Faye.Logging);
Faye.extend(Faye.Client.prototype, Faye.Extensible);

Faye.Dispatcher = Faye.Class({
  MAX_REQUEST_SIZE: 2048,
  DEFAULT_RETRY:    5,

  UP:   1,
  DOWN: 2,

  initialize: function(client, endpoint, options) {
    this._client     = client;
    this.endpoint    = Faye.URI.parse(endpoint);
    this._alternates = options.endpoints || {};

    this.cookies      = Faye.Cookies && new Faye.Cookies.CookieJar();
    this._disabled    = [];
    this._envelopes   = {};
    this.headers      = {};
    this.retry        = options.retry || this.DEFAULT_RETRY;
    this._scheduler   = options.scheduler || Faye.Scheduler;
    this._state       = 0;
    this.transports   = {};
    this.wsExtensions = [];

    this.proxy = options.proxy || {};
    if (typeof this._proxy === 'string') this._proxy = {origin: this._proxy};

    var exts = options.websocketExtensions;
    if (exts) {
      exts = [].concat(exts);
      for (var i = 0, n = exts.length; i < n; i++)
        this.addWebsocketExtension(exts[i]);
    }

    this.tls = options.tls || {};
    this.tls.ca = this.tls.ca || options.ca;

    for (var type in this._alternates)
      this._alternates[type] = Faye.URI.parse(this._alternates[type]);

    this.maxRequestSize = this.MAX_REQUEST_SIZE;
  },

  endpointFor: function(connectionType) {
    return this._alternates[connectionType] || this.endpoint;
  },

  addWebsocketExtension: function(extension) {
    this.wsExtensions.push(extension);
  },

  disable: function(feature) {
    this._disabled.push(feature);
  },

  setHeader: function(name, value) {
    this.headers[name] = value;
  },

  close: function() {
    var transport = this._transport;
    delete this._transport;
    if (transport) transport.close();
  },

  getConnectionTypes: function() {
    return Faye.Transport.getConnectionTypes();
  },

  selectTransport: function(transportTypes) {
    Faye.Transport.get(this, transportTypes, this._disabled, function(transport) {
      this.debug('Selected ? transport for ?', transport.connectionType, Faye.URI.stringify(transport.endpoint));

      if (transport === this._transport) return;
      if (this._transport) this._transport.close();

      this._transport = transport;
      this.connectionType = transport.connectionType;
    }, this);
  },

  sendMessage: function(message, timeout, options) {
    options = options || {};

    var id       = message.id,
        attempts = options.attempts,
        deadline = options.deadline && new Date().getTime() + (options.deadline * 1000),
        envelope = this._envelopes[id],
        scheduler;

    if (!envelope) {
      scheduler = new this._scheduler(message, {timeout: timeout, interval: this.retry, attempts: attempts, deadline: deadline});
      envelope  = this._envelopes[id] = {message: message, scheduler: scheduler};
    }

    this._sendEnvelope(envelope);
  },

  _sendEnvelope: function(envelope) {
    if (!this._transport) return;
    if (envelope.request || envelope.timer) return;

    var message   = envelope.message,
        scheduler = envelope.scheduler,
        self      = this;

    if (!scheduler.isDeliverable()) {
      scheduler.abort();
      delete this._envelopes[message.id];
      return;
    }

    envelope.timer = Faye.ENV.setTimeout(function() {
      self.handleError(message);
    }, scheduler.getTimeout() * 1000);

    scheduler.send();
    envelope.request = this._transport.sendMessage(message);
  },

  handleResponse: function(reply) {
    var envelope = this._envelopes[reply.id];

    if (reply.successful !== undefined && envelope) {
      envelope.scheduler.succeed();
      delete this._envelopes[reply.id];
      Faye.ENV.clearTimeout(envelope.timer);
    }

    this.trigger('message', reply);

    if (this._state === this.UP) return;
    this._state = this.UP;
    this._client.trigger('transport:up');
  },

  handleError: function(message, immediate) {
    var envelope = this._envelopes[message.id],
        request  = envelope && envelope.request,
        self     = this;

    if (!request) return;

    request.then(function(req) {
      if (req && req.abort) req.abort();
    });

    var scheduler = envelope.scheduler;
    scheduler.fail();

    Faye.ENV.clearTimeout(envelope.timer);
    envelope.request = envelope.timer = null;

    if (immediate) {
      this._sendEnvelope(envelope);
    } else {
      envelope.timer = Faye.ENV.setTimeout(function() {
        envelope.timer = null;
        self._sendEnvelope(envelope);
      }, scheduler.getInterval() * 1000);
    }

    if (this._state === this.DOWN) return;
    this._state = this.DOWN;
    this._client.trigger('transport:down');
  }
});

Faye.extend(Faye.Dispatcher.prototype, Faye.Publisher);
Faye.extend(Faye.Dispatcher.prototype, Faye.Logging);

Faye.Scheduler = function(message, options) {
  this.message  = message;
  this.options  = options;
  this.attempts = 0;
};

Faye.extend(Faye.Scheduler.prototype, {
  getTimeout: function() {
    return this.options.timeout;
  },

  getInterval: function() {
    return this.options.interval;
  },

  isDeliverable: function() {
    var attempts = this.options.attempts,
        made     = this.attempts,
        deadline = this.options.deadline,
        now      = new Date().getTime();

    if (attempts !== undefined && made >= attempts)
      return false;

    if (deadline !== undefined && now > deadline)
      return false;

    return true;
  },

  send: function() {
    this.attempts += 1;
  },

  succeed: function() {},

  fail: function() {},

  abort: function() {}
});

Faye.Transport = Faye.extend(Faye.Class({
  DEFAULT_PORTS:    {'http:': 80, 'https:': 443, 'ws:': 80, 'wss:': 443},
  SECURE_PROTOCOLS: ['https:', 'wss:'],
  MAX_DELAY:        0,

  batching:  true,

  initialize: function(dispatcher, endpoint) {
    this._dispatcher = dispatcher;
    this.endpoint    = endpoint;
    this._outbox     = [];
    this._proxy      = Faye.extend({}, this._dispatcher.proxy);

    if (!this._proxy.origin && Faye.NodeAdapter) {
      this._proxy.origin = Faye.indexOf(this.SECURE_PROTOCOLS, this.endpoint.protocol) >= 0
                         ? (process.env.HTTPS_PROXY || process.env.https_proxy)
                         : (process.env.HTTP_PROXY  || process.env.http_proxy);
    }
  },

  close: function() {},

  encode: function(messages) {
    return '';
  },

  sendMessage: function(message) {
    this.debug('Client ? sending message to ?: ?',
               this._dispatcher.clientId, Faye.URI.stringify(this.endpoint), message);

    if (!this.batching) return Faye.Promise.fulfilled(this.request([message]));

    this._outbox.push(message);
    this._promise = this._promise || new Faye.Promise();
    this._flushLargeBatch();

    if (message.channel === Faye.Channel.HANDSHAKE) {
      this.addTimeout('publish', 0.01, this._flush, this);
      return this._promise;
    }

    if (message.channel === Faye.Channel.CONNECT)
      this._connectMessage = message;

    this.addTimeout('publish', this.MAX_DELAY, this._flush, this);
    return this._promise;
  },

  _flush: function() {
    this.removeTimeout('publish');

    if (this._outbox.length > 1 && this._connectMessage)
      this._connectMessage.advice = {timeout: 0};

    Faye.Promise.fulfill(this._promise, this.request(this._outbox));
    delete this._promise;

    this._connectMessage = null;
    this._outbox = [];
  },

  _flushLargeBatch: function() {
    var string = this.encode(this._outbox);
    if (string.length < this._dispatcher.maxRequestSize) return;
    var last = this._outbox.pop();
    this._flush();
    if (last) this._outbox.push(last);
  },

  _receive: function(replies) {
    if (!replies) return;
    replies = [].concat(replies);

    this.debug('Client ? received from ? via ?: ?',
               this._dispatcher.clientId, Faye.URI.stringify(this.endpoint), this.connectionType, replies);

    for (var i = 0, n = replies.length; i < n; i++)
      this._dispatcher.handleResponse(replies[i]);
  },

  _handleError: function(messages, immediate) {
    messages = [].concat(messages);

    this.debug('Client ? failed to send to ? via ?: ?',
               this._dispatcher.clientId, Faye.URI.stringify(this.endpoint), this.connectionType, messages);

    for (var i = 0, n = messages.length; i < n; i++)
      this._dispatcher.handleError(messages[i]);
  },

  _getCookies: function() {
    var cookies = this._dispatcher.cookies,
        url     = Faye.URI.stringify(this.endpoint);

    if (!cookies) return '';

    return Faye.map(cookies.getCookiesSync(url), function(cookie) {
      return cookie.cookieString();
    }).join('; ');
  },

  _storeCookies: function(setCookie) {
    var cookies = this._dispatcher.cookies,
        url     = Faye.URI.stringify(this.endpoint),
        cookie;

    if (!setCookie || !cookies) return;
    setCookie = [].concat(setCookie);

    for (var i = 0, n = setCookie.length; i < n; i++) {
      cookie = Faye.Cookies.Cookie.parse(setCookie[i]);
      cookies.setCookieSync(cookie, url);
    }
  }

}), {
  get: function(dispatcher, allowed, disabled, callback, context) {
    var endpoint = dispatcher.endpoint;

    Faye.asyncEach(this._transports, function(pair, resume) {
      var connType     = pair[0], klass = pair[1],
          connEndpoint = dispatcher.endpointFor(connType);

      if (Faye.indexOf(disabled, connType) >= 0)
        return resume();

      if (Faye.indexOf(allowed, connType) < 0) {
        klass.isUsable(dispatcher, connEndpoint, function() {});
        return resume();
      }

      klass.isUsable(dispatcher, connEndpoint, function(isUsable) {
        if (!isUsable) return resume();
        var transport = klass.hasOwnProperty('create') ? klass.create(dispatcher, connEndpoint) : new klass(dispatcher, connEndpoint);
        callback.call(context, transport);
      });
    }, function() {
      throw new Error('Could not find a usable connection type for ' + Faye.URI.stringify(endpoint));
    });
  },

  register: function(type, klass) {
    this._transports.push([type, klass]);
    klass.prototype.connectionType = type;
  },

  getConnectionTypes: function() {
    return Faye.map(this._transports, function(t) { return t[0] });
  },

  _transports: []
});

Faye.extend(Faye.Transport.prototype, Faye.Logging);
Faye.extend(Faye.Transport.prototype, Faye.Timeouts);

Faye.Event = {
  _registry: [],

  on: function(element, eventName, callback, context) {
    var wrapped = function() { callback.call(context) };

    if (element.addEventListener)
      element.addEventListener(eventName, wrapped, false);
    else
      element.attachEvent('on' + eventName, wrapped);

    this._registry.push({
      _element:   element,
      _type:      eventName,
      _callback:  callback,
      _context:     context,
      _handler:   wrapped
    });
  },

  detach: function(element, eventName, callback, context) {
    var i = this._registry.length, register;
    while (i--) {
      register = this._registry[i];

      if ((element    && element    !== register._element)   ||
          (eventName  && eventName  !== register._type)      ||
          (callback   && callback   !== register._callback)  ||
          (context      && context      !== register._context))
        continue;

      if (register._element.removeEventListener)
        register._element.removeEventListener(register._type, register._handler, false);
      else
        register._element.detachEvent('on' + register._type, register._handler);

      this._registry.splice(i,1);
      register = null;
    }
  }
};

if (Faye.ENV.onunload !== undefined) Faye.Event.on(Faye.ENV, 'unload', Faye.Event.detach, Faye.Event);

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

    Faye.stringify = function (value, replacer, space) {

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

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = Faye.stringify;
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

Faye.Transport.WebSocket = Faye.extend(Faye.Class(Faye.Transport, {
  UNCONNECTED:  1,
  CONNECTING:   2,
  CONNECTED:    3,

  batching:     false,

  isUsable: function(callback, context) {
    this.callback(function() { callback.call(context, true) });
    this.errback(function() { callback.call(context, false) });
    this.connect();
  },

  request: function(messages) {
    this._pending = this._pending || new Faye.Set();
    for (var i = 0, n = messages.length; i < n; i++) this._pending.add(messages[i]);

    var promise = new Faye.Promise();

    this.callback(function(socket) {
      if (!socket || socket.readyState !== 1) return;
      socket.send(Faye.toJSON(messages));
      Faye.Promise.fulfill(promise, socket);
    }, this);

    this.connect();

    return {
      abort: function() { promise.then(function(ws) { ws.close() }) }
    };
  },

  connect: function() {
    if (Faye.Transport.WebSocket._unloaded) return;

    this._state = this._state || this.UNCONNECTED;
    if (this._state !== this.UNCONNECTED) return;
    this._state = this.CONNECTING;

    var socket = this._createSocket();
    if (!socket) return this.setDeferredStatus('failed');

    var self = this;

    socket.onopen = function() {
      if (socket.headers) self._storeCookies(socket.headers['set-cookie']);
      self._socket = socket;
      self._state = self.CONNECTED;
      self._everConnected = true;
      self._ping();
      self.setDeferredStatus('succeeded', socket);
    };

    var closed = false;
    socket.onclose = socket.onerror = function() {
      if (closed) return;
      closed = true;

      var wasConnected = (self._state === self.CONNECTED);
      socket.onopen = socket.onclose = socket.onerror = socket.onmessage = null;

      delete self._socket;
      self._state = self.UNCONNECTED;
      self.removeTimeout('ping');
      self.setDeferredStatus('unknown');

      var pending = self._pending ? self._pending.toArray() : [];
      delete self._pending;

      if (wasConnected) {
        self._handleError(pending, true);
      } else if (self._everConnected) {
        self._handleError(pending);
      } else {
        self.setDeferredStatus('failed');
      }
    };

    socket.onmessage = function(event) {
      var replies = JSON.parse(event.data);
      if (!replies) return;

      replies = [].concat(replies);

      for (var i = 0, n = replies.length; i < n; i++) {
        if (replies[i].successful === undefined) continue;
        self._pending.remove(replies[i]);
      }
      self._receive(replies);
    };
  },

  close: function() {
    if (!this._socket) return;
    this._socket.close();
  },

  _createSocket: function() {
    var url        = Faye.Transport.WebSocket.getSocketUrl(this.endpoint),
        headers    = this._dispatcher.headers,
        extensions = this._dispatcher.wsExtensions,
        cookie     = this._getCookies(),
        tls        = this._dispatcher.tls,
        options    = {extensions: extensions, headers: headers, proxy: this._proxy, tls: tls};

    if (cookie !== '') options.headers['Cookie'] = cookie;

    if (Faye.WebSocket)        return new Faye.WebSocket.Client(url, [], options);
    if (Faye.ENV.MozWebSocket) return new MozWebSocket(url);
    if (Faye.ENV.WebSocket)    return new WebSocket(url);
  },

  _ping: function() {
    if (!this._socket) return;
    this._socket.send('[]');
    this.addTimeout('ping', this._dispatcher.timeout / 2, this._ping, this);
  }

}), {
  PROTOCOLS: {
    'http:':  'ws:',
    'https:': 'wss:'
  },

  create: function(dispatcher, endpoint) {
    var sockets = dispatcher.transports.websocket = dispatcher.transports.websocket || {};
    sockets[endpoint.href] = sockets[endpoint.href] || new this(dispatcher, endpoint);
    return sockets[endpoint.href];
  },

  getSocketUrl: function(endpoint) {
    endpoint = Faye.copyObject(endpoint);
    endpoint.protocol = this.PROTOCOLS[endpoint.protocol];
    return Faye.URI.stringify(endpoint);
  },

  isUsable: function(dispatcher, endpoint, callback, context) {
    this.create(dispatcher, endpoint).isUsable(callback, context);
  }
});

Faye.extend(Faye.Transport.WebSocket.prototype, Faye.Deferrable);
Faye.Transport.register('websocket', Faye.Transport.WebSocket);

if (Faye.Event && Faye.ENV.onbeforeunload !== undefined)
  Faye.Event.on(Faye.ENV, 'beforeunload', function() {
    Faye.Transport.WebSocket._unloaded = true;
  });

Faye.Transport.EventSource = Faye.extend(Faye.Class(Faye.Transport, {
  initialize: function(dispatcher, endpoint) {
    Faye.Transport.prototype.initialize.call(this, dispatcher, endpoint);
    if (!Faye.ENV.EventSource) return this.setDeferredStatus('failed');

    this._xhr = new Faye.Transport.XHR(dispatcher, endpoint);

    endpoint = Faye.copyObject(endpoint);
    endpoint.pathname += '/' + dispatcher.clientId;

    var socket = new EventSource(Faye.URI.stringify(endpoint)),
        self   = this;

    socket.onopen = function() {
      self._everConnected = true;
      self.setDeferredStatus('succeeded');
    };

    socket.onerror = function() {
      if (self._everConnected) {
        self._handleError([]);
      } else {
        self.setDeferredStatus('failed');
        socket.close();
      }
    };

    socket.onmessage = function(event) {
      self._receive(JSON.parse(event.data));
    };

    this._socket = socket;
  },

  close: function() {
    if (!this._socket) return;
    this._socket.onopen = this._socket.onerror = this._socket.onmessage = null;
    this._socket.close();
    delete this._socket;
  },

  isUsable: function(callback, context) {
    this.callback(function() { callback.call(context, true) });
    this.errback(function() { callback.call(context, false) });
  },

  encode: function(messages) {
    return this._xhr.encode(messages);
  },

  request: function(messages) {
    return this._xhr.request(messages);
  }

}), {
  isUsable: function(dispatcher, endpoint, callback, context) {
    var id = dispatcher.clientId;
    if (!id) return callback.call(context, false);

    Faye.Transport.XHR.isUsable(dispatcher, endpoint, function(usable) {
      if (!usable) return callback.call(context, false);
      this.create(dispatcher, endpoint).isUsable(callback, context);
    }, this);
  },

  create: function(dispatcher, endpoint) {
    var sockets = dispatcher.transports.eventsource = dispatcher.transports.eventsource || {},
        id      = dispatcher.clientId;

    var url = Faye.copyObject(endpoint);
    url.pathname += '/' + (id || '');
    url = Faye.URI.stringify(url);

    sockets[url] = sockets[url] || new this(dispatcher, endpoint);
    return sockets[url];
  }
});

Faye.extend(Faye.Transport.EventSource.prototype, Faye.Deferrable);
Faye.Transport.register('eventsource', Faye.Transport.EventSource);

Faye.Transport.XHR = Faye.extend(Faye.Class(Faye.Transport, {
  encode: function(messages) {
    return Faye.toJSON(messages);
  },

  request: function(messages) {
    var href = this.endpoint.href,
        xhr  = Faye.ENV.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest(),
        self = this;

    xhr.open('POST', href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    var headers = this._dispatcher.headers;
    for (var key in headers) {
      if (!headers.hasOwnProperty(key)) continue;
      xhr.setRequestHeader(key, headers[key]);
    }

    var abort = function() { xhr.abort() };
    if (Faye.ENV.onbeforeunload !== undefined) Faye.Event.on(Faye.ENV, 'beforeunload', abort);

    xhr.onreadystatechange = function() {
      if (!xhr || xhr.readyState !== 4) return;

      var replies    = null,
          status     = xhr.status,
          text       = xhr.responseText,
          successful = (status >= 200 && status < 300) || status === 304 || status === 1223;

      if (Faye.ENV.onbeforeunload !== undefined) Faye.Event.detach(Faye.ENV, 'beforeunload', abort);
      xhr.onreadystatechange = function() {};
      xhr = null;

      if (!successful) return self._handleError(messages);

      try {
        replies = JSON.parse(text);
      } catch (e) {}

      if (replies)
        self._receive(replies);
      else
        self._handleError(messages);
    };

    xhr.send(this.encode(messages));
    return xhr;
  }
}), {
  isUsable: function(dispatcher, endpoint, callback, context) {
    callback.call(context, Faye.URI.isSameOrigin(endpoint));
  }
});

Faye.Transport.register('long-polling', Faye.Transport.XHR);

Faye.Transport.CORS = Faye.extend(Faye.Class(Faye.Transport, {
  encode: function(messages) {
    return 'message=' + encodeURIComponent(Faye.toJSON(messages));
  },

  request: function(messages) {
    var xhrClass = Faye.ENV.XDomainRequest ? XDomainRequest : XMLHttpRequest,
        xhr      = new xhrClass(),
        id       = ++Faye.Transport.CORS._id,
        headers  = this._dispatcher.headers,
        self     = this,
        key;

    xhr.open('POST', Faye.URI.stringify(this.endpoint), true);

    if (xhr.setRequestHeader) {
      xhr.setRequestHeader('Pragma', 'no-cache');
      for (key in headers) {
        if (!headers.hasOwnProperty(key)) continue;
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    var cleanUp = function() {
      if (!xhr) return false;
      Faye.Transport.CORS._pending.remove(id);
      xhr.onload = xhr.onerror = xhr.ontimeout = xhr.onprogress = null;
      xhr = null;
    };

    xhr.onload = function() {
      var replies = null;
      try {
        replies = JSON.parse(xhr.responseText);
      } catch (e) {}

      cleanUp();

      if (replies)
        self._receive(replies);
      else
        self._handleError(messages);
    };

    xhr.onerror = xhr.ontimeout = function() {
      cleanUp();
      self._handleError(messages);
    };

    xhr.onprogress = function() {};

    if (xhrClass === Faye.ENV.XDomainRequest)
      Faye.Transport.CORS._pending.add({id: id, xhr: xhr});

    xhr.send(this.encode(messages));
    return xhr;
  }
}), {
  _id:      0,
  _pending: new Faye.Set(),

  isUsable: function(dispatcher, endpoint, callback, context) {
    if (Faye.URI.isSameOrigin(endpoint))
      return callback.call(context, false);

    if (Faye.ENV.XDomainRequest)
      return callback.call(context, endpoint.protocol === Faye.ENV.location.protocol);

    if (Faye.ENV.XMLHttpRequest) {
      var xhr = new Faye.ENV.XMLHttpRequest();
      return callback.call(context, xhr.withCredentials !== undefined);
    }
    return callback.call(context, false);
  }
});

Faye.Transport.register('cross-origin-long-polling', Faye.Transport.CORS);

Faye.Transport.JSONP = Faye.extend(Faye.Class(Faye.Transport, {
 encode: function(messages) {
    var url = Faye.copyObject(this.endpoint);
    url.query.message = Faye.toJSON(messages);
    url.query.jsonp   = '__jsonp' + Faye.Transport.JSONP._cbCount + '__';
    return Faye.URI.stringify(url);
  },

  request: function(messages) {
    var head         = document.getElementsByTagName('head')[0],
        script       = document.createElement('script'),
        callbackName = Faye.Transport.JSONP.getCallbackName(),
        endpoint     = Faye.copyObject(this.endpoint),
        self         = this;

    endpoint.query.message = Faye.toJSON(messages);
    endpoint.query.jsonp   = callbackName;

    var cleanup = function() {
      if (!Faye.ENV[callbackName]) return false;
      Faye.ENV[callbackName] = undefined;
      try { delete Faye.ENV[callbackName] } catch (e) {}
      script.parentNode.removeChild(script);
    };

    Faye.ENV[callbackName] = function(replies) {
      cleanup();
      self._receive(replies);
    };

    script.type = 'text/javascript';
    script.src  = Faye.URI.stringify(endpoint);
    head.appendChild(script);

    script.onerror = function() {
      cleanup();
      self._handleError(messages);
    };

    return {abort: cleanup};
  }
}), {
  _cbCount: 0,

  getCallbackName: function() {
    this._cbCount += 1;
    return '__jsonp' + this._cbCount + '__';
  },

  isUsable: function(dispatcher, endpoint, callback, context) {
    callback.call(context, true);
  }
});

Faye.Transport.register('callback-polling', Faye.Transport.JSONP);

})();
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":2}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3N0cmVhbWluZy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9icm93c2VyL2ZheWUtYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZSBNYW5hZ2VzIFN0cmVhbWluZyBBUElzXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBldmVudHMgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdldmVudHMnKSxcbiAgICBpbmhlcml0cyA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2luaGVyaXRzJyksXG4gICAgXyA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2xvZGFzaC9jb3JlJyksXG4gICAgRmF5ZSAgID0gcmVxdWlyZSgnZmF5ZScpLFxuICAgIGpzZm9yY2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKTtcblxuLyoqXG4gKiBTdHJlYW1pbmcgQVBJIHRvcGljIGNsYXNzXG4gKlxuICogQGNsYXNzIFN0cmVhbWluZ35Ub3BpY1xuICogQHBhcmFtIHtTdHJlYW1pbmd9IHN0ZWFtaW5nIC0gU3RyZWFtaW5nIEFQSSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVG9waWMgbmFtZVxuICovXG52YXIgVG9waWMgPSBmdW5jdGlvbihzdHJlYW1pbmcsIG5hbWUpIHtcbiAgdGhpcy5fc3RyZWFtaW5nID0gc3RyZWFtaW5nO1xuICB0aGlzLm5hbWUgPSBuYW1lO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTdHJlYW1pbmd+U3RyZWFtaW5nTWVzc2FnZVxuICogQHByb3Age09iamVjdH0gZXZlbnRcbiAqIEBwcm9wIHtPYmplY3R9IGV2ZW50LnR5cGUgLSBFdmVudCB0eXBlXG4gKiBAcHJvcCB7UmVjb3JkfSBzb2JqZWN0IC0gUmVjb3JkIGluZm9ybWF0aW9uXG4gKi9cbi8qKlxuICogU3Vic2NyaWJlIGxpc3RlbmVyIHRvIHRvcGljXG4gKlxuICogQG1ldGhvZCBTdHJlYW1pbmd+VG9waWMjc3Vic2NyaWJlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxTdHJlYW1pbmd+U3RyZWFtaW5nTWVzYXNnZT59IGxpc3RlbmVyIC0gU3RyZWFtaW5nIG1lc3NhZ2UgbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtTdWJzY3JpcHRpb259IC0gRmF5ZSBzdWJzY3JpcHRpb24gb2JqZWN0XG4gKi9cblRvcGljLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICByZXR1cm4gdGhpcy5fc3RyZWFtaW5nLnN1YnNjcmliZSh0aGlzLm5hbWUsIGxpc3RlbmVyKTtcbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgbGlzdGVuZXIgZnJvbSB0b3BpY1xuICpcbiAqIEBtZXRob2QgU3RyZWFtaW5nflRvcGljI3Vuc3Vic2NyaWJlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxTdHJlYW1pbmd+U3RyZWFtaW5nTWVzYXNnZT59IGxpc3RlbmVyIC0gU3RyZWFtaW5nIG1lc3NhZ2UgbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtTdHJlYW1pbmd+VG9waWN9XG4gKi9cblRvcGljLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gIHRoaXMuX3N0cmVhbWluZy51bnN1YnNjcmliZSh0aGlzLm5hbWUsIGxpc3RlbmVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBTdHJlYW1pbmcgQVBJIEdlbmVyaWMgU3RyZWFtaW5nIENoYW5uZWxcbiAqXG4gKiBAY2xhc3MgU3RyZWFtaW5nfkNoYW5uZWxcbiAqIEBwYXJhbSB7U3RyZWFtaW5nfSBzdGVhbWluZyAtIFN0cmVhbWluZyBBUEkgb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIENoYW5uZWwgbmFtZSAoc3RhcnRzIHdpdGggXCIvdS9cIilcbiAqL1xudmFyIENoYW5uZWwgPSBmdW5jdGlvbihzdHJlYW1pbmcsIG5hbWUpIHtcbiAgdGhpcy5fc3RyZWFtaW5nID0gc3RyZWFtaW5nO1xuICB0aGlzLl9uYW1lID0gbmFtZTtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIGhhbm5lbFxuICpcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N1YnNjcmlwdGlvbn0gLSBGYXllIHN1YnNjcmlwdGlvbiBvYmplY3RcbiAqL1xuQ2hhbm5lbC5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgcmV0dXJuIHRoaXMuX3N0cmVhbWluZy5zdWJzY3JpYmUodGhpcy5fbmFtZSwgbGlzdGVuZXIpO1xufTtcblxuQ2hhbm5lbC5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICB0aGlzLl9zdHJlYW1pbmcudW5zdWJzY3JpYmUodGhpcy5fbmFtZSwgbGlzdGVuZXIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkNoYW5uZWwucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gIHZhciBpc0FycmF5ID0gXy5pc0FycmF5KGV2ZW50cyk7XG4gIGV2ZW50cyA9IGlzQXJyYXkgPyBldmVudHMgOiBbIGV2ZW50cyBdO1xuICB2YXIgY29ubiA9IHRoaXMuX3N0cmVhbWluZy5fY29ubjtcbiAgaWYgKCF0aGlzLl9pZCkge1xuICAgIHRoaXMuX2lkID0gY29ubi5zb2JqZWN0KCdTdHJlYW1pbmdDaGFubmVsJykuZmluZE9uZSh7IE5hbWU6IHRoaXMuX25hbWUgfSwgJ0lkJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlYykgeyByZXR1cm4gcmVjLklkIH0pO1xuICB9XG4gIHJldHVybiB0aGlzLl9pZC50aGVuKGZ1bmN0aW9uKGlkKSB7XG4gICAgdmFyIGNoYW5uZWxVcmwgPSAnL3NvYmplY3RzL1N0cmVhbWluZ0NoYW5uZWwvJyArIGlkICsgJy9wdXNoJztcbiAgICByZXR1cm4gY29ubi5yZXF1ZXN0UG9zdChjaGFubmVsVXJsLCB7IHB1c2hFdmVudHM6IGV2ZW50cyB9KTtcbiAgfSkudGhlbihmdW5jdGlvbihyZXRzKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkgPyByZXRzIDogcmV0c1swXTtcbiAgfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogU3RyZWFtaW5nIEFQSSBjbGFzc1xuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlclxuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIC0gQ29ubmVjdGlvbiBvYmplY3RcbiAqL1xudmFyIFN0cmVhbWluZyA9IGZ1bmN0aW9uKGNvbm4pIHtcbiAgdGhpcy5fY29ubiA9IGNvbm47XG59O1xuXG5pbmhlcml0cyhTdHJlYW1pbmcsIGV2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG4vKiogQHByaXZhdGUgKiovXG5TdHJlYW1pbmcucHJvdG90eXBlLl9jcmVhdGVDbGllbnQgPSBmdW5jdGlvbihyZXBsYXkpIHtcbiAgdmFyIGVuZHBvaW50VXJsID0gWyB0aGlzLl9jb25uLmluc3RhbmNlVXJsLCBcImNvbWV0ZFwiICsgKHJlcGxheSA/IFwiL3JlcGxheVwiIDogXCJcIiksIHRoaXMuX2Nvbm4udmVyc2lvbiBdLmpvaW4oJy8nKTtcbiAgdmFyIGZheWVDbGllbnQgPSBuZXcgRmF5ZS5DbGllbnQoZW5kcG9pbnRVcmwsIHt9KTtcbiAgZmF5ZUNsaWVudC5zZXRIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnT0F1dGggJyt0aGlzLl9jb25uLmFjY2Vzc1Rva2VuKTtcbiAgcmV0dXJuIGZheWVDbGllbnQ7XG59O1xuXG4vKiogQHByaXZhdGUgKiovXG5TdHJlYW1pbmcucHJvdG90eXBlLl9nZXRGYXllQ2xpZW50ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUpIHtcbiAgdmFyIGlzR2VuZXJpYyA9IGNoYW5uZWxOYW1lLmluZGV4T2YoJy91LycpID09PSAwO1xuICB2YXIgY2xpZW50VHlwZSA9IGlzR2VuZXJpYyA/ICdnZW5lcmljJyA6ICdwdXNoVG9waWMnO1xuICBpZiAoIXRoaXMuX2ZheWVDbGllbnRzIHx8ICF0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXSkge1xuICAgIHRoaXMuX2ZheWVDbGllbnRzID0gdGhpcy5fZmF5ZUNsaWVudHMgfHwge307XG4gICAgdGhpcy5fZmF5ZUNsaWVudHNbY2xpZW50VHlwZV0gPSB0aGlzLl9jcmVhdGVDbGllbnQoaXNHZW5lcmljKTtcbiAgICBpZiAoRmF5ZS5UcmFuc3BvcnQuTm9kZUh0dHApIHtcbiAgICAgIEZheWUuVHJhbnNwb3J0Lk5vZGVIdHRwLnByb3RvdHlwZS5iYXRjaGluZyA9IGZhbHNlOyAvLyBwcmV2ZW50IHN0cmVhbWluZyBBUEkgc2VydmVyIGVycm9yXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXTtcbn07XG5cblxuLyoqXG4gKiBHZXQgbmFtZWQgdG9waWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEByZXR1cm5zIHtTdHJlYW1pbmd+VG9waWN9XG4gKi9cblN0cmVhbWluZy5wcm90b3R5cGUudG9waWMgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMuX3RvcGljcyA9IHRoaXMuX3RvcGljcyB8fCB7fTtcbiAgdmFyIHRvcGljID0gdGhpcy5fdG9waWNzW25hbWVdID1cbiAgICB0aGlzLl90b3BpY3NbbmFtZV0gfHwgbmV3IFRvcGljKHRoaXMsIG5hbWUpO1xuICByZXR1cm4gdG9waWM7XG59O1xuXG4vKipcbiAqIEdldCBDaGFubmVsIGZvciBJZFxuICogQHBhcmFtIHtTdHJpbmd9IGNoYW5uZWxJZCAtIElkIG9mIFN0cmVhbWluZ0NoYW5uZWwgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyZWFtaW5nfkNoYW5uZWx9XG4gKi9cblN0cmVhbWluZy5wcm90b3R5cGUuY2hhbm5lbCA9IGZ1bmN0aW9uKGNoYW5uZWxJZCkge1xuICByZXR1cm4gbmV3IENoYW5uZWwodGhpcywgY2hhbm5lbElkKTtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvcGljL2NoYW5uZWxcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N1YnNjcmlwdGlvbn0gLSBGYXllIHN1YnNjcmlwdGlvbiBvYmplY3RcbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgY2hhbm5lbE5hbWUgPSBuYW1lLmluZGV4T2YoJy8nKSA9PT0gMCA/IG5hbWUgOiAnL3RvcGljLycgKyBuYW1lO1xuICB2YXIgZmF5ZUNsaWVudCA9IHRoaXMuX2dldEZheWVDbGllbnQoY2hhbm5lbE5hbWUpO1xuICByZXR1cm4gZmF5ZUNsaWVudC5zdWJzY3JpYmUoY2hhbm5lbE5hbWUsIGxpc3RlbmVyKTtcbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgdG9waWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N0cmVhbWluZ31cbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBjaGFubmVsTmFtZSA9IG5hbWUuaW5kZXhPZignLycpID09PSAwID8gbmFtZSA6ICcvdG9waWMvJyArIG5hbWU7XG4gIHZhciBmYXllQ2xpZW50ID0gdGhpcy5fZ2V0RmF5ZUNsaWVudChjaGFubmVsTmFtZSk7XG4gIGZheWVDbGllbnQudW5zdWJzY3JpYmUoY2hhbm5lbE5hbWUsIGxpc3RlbmVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLnN0cmVhbWluZyA9IG5ldyBTdHJlYW1pbmcoY29ubik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbWluZztcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRmF5ZSA9IHtcbiAgVkVSU0lPTjogICAgICAgICAgJzEuMS4yJyxcblxuICBCQVlFVVhfVkVSU0lPTjogICAnMS4wJyxcbiAgSURfTEVOR1RIOiAgICAgICAgMTYwLFxuICBKU09OUF9DQUxMQkFDSzogICAnanNvbnBjYWxsYmFjaycsXG4gIENPTk5FQ1RJT05fVFlQRVM6IFsnbG9uZy1wb2xsaW5nJywgJ2Nyb3NzLW9yaWdpbi1sb25nLXBvbGxpbmcnLCAnY2FsbGJhY2stcG9sbGluZycsICd3ZWJzb2NrZXQnLCAnZXZlbnRzb3VyY2UnLCAnaW4tcHJvY2VzcyddLFxuXG4gIE1BTkRBVE9SWV9DT05ORUNUSU9OX1RZUEVTOiBbJ2xvbmctcG9sbGluZycsICdjYWxsYmFjay1wb2xsaW5nJywgJ2luLXByb2Nlc3MnXSxcblxuICBFTlY6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiBnbG9iYWwsXG5cbiAgZXh0ZW5kOiBmdW5jdGlvbihkZXN0LCBzb3VyY2UsIG92ZXJ3cml0ZSkge1xuICAgIGlmICghc291cmNlKSByZXR1cm4gZGVzdDtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoIXNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcbiAgICAgIGlmIChkZXN0Lmhhc093blByb3BlcnR5KGtleSkgJiYgb3ZlcndyaXRlID09PSBmYWxzZSkgY29udGludWU7XG4gICAgICBpZiAoZGVzdFtrZXldICE9PSBzb3VyY2Vba2V5XSlcbiAgICAgICAgZGVzdFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xuICB9LFxuXG4gIHJhbmRvbTogZnVuY3Rpb24oYml0bGVuZ3RoKSB7XG4gICAgYml0bGVuZ3RoID0gYml0bGVuZ3RoIHx8IHRoaXMuSURfTEVOR1RIO1xuICAgIHZhciBtYXhMZW5ndGggPSBNYXRoLmNlaWwoYml0bGVuZ3RoICogTWF0aC5sb2coMikgLyBNYXRoLmxvZygzNikpO1xuICAgIHZhciBzdHJpbmcgPSBjc3BybmcoYml0bGVuZ3RoLCAzNik7XG4gICAgd2hpbGUgKHN0cmluZy5sZW5ndGggPCBtYXhMZW5ndGgpIHN0cmluZyA9ICcwJyArIHN0cmluZztcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9LFxuXG4gIHZhbGlkYXRlT3B0aW9uczogZnVuY3Rpb24ob3B0aW9ucywgdmFsaWRLZXlzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLmluZGV4T2YodmFsaWRLZXlzLCBrZXkpIDwgMClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnJlY29nbml6ZWQgb3B0aW9uOiAnICsga2V5KTtcbiAgICB9XG4gIH0sXG5cbiAgY2xpZW50SWRGcm9tTWVzc2FnZXM6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdmFyIGNvbm5lY3QgPSB0aGlzLmZpbHRlcihbXS5jb25jYXQobWVzc2FnZXMpLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5jaGFubmVsID09PSAnL21ldGEvY29ubmVjdCc7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbm5lY3RbMF0gJiYgY29ubmVjdFswXS5jbGllbnRJZDtcbiAgfSxcblxuICBjb3B5T2JqZWN0OiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgY2xvbmUsIGksIGtleTtcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGNsb25lID0gW107XG4gICAgICBpID0gb2JqZWN0Lmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIGNsb25lW2ldID0gRmF5ZS5jb3B5T2JqZWN0KG9iamVjdFtpXSk7XG4gICAgICByZXR1cm4gY2xvbmU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgY2xvbmUgPSAob2JqZWN0ID09PSBudWxsKSA/IG51bGwgOiB7fTtcbiAgICAgIGZvciAoa2V5IGluIG9iamVjdCkgY2xvbmVba2V5XSA9IEZheWUuY29weU9iamVjdChvYmplY3Rba2V5XSk7XG4gICAgICByZXR1cm4gY2xvbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICB9LFxuXG4gIGNvbW1vbkVsZW1lbnQ6IGZ1bmN0aW9uKGxpc3RhLCBsaXN0Yikge1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gbGlzdGEubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5pbmRleE9mKGxpc3RiLCBsaXN0YVtpXSkgIT09IC0xKVxuICAgICAgICByZXR1cm4gbGlzdGFbaV07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGluZGV4T2Y6IGZ1bmN0aW9uKGxpc3QsIG5lZWRsZSkge1xuICAgIGlmIChsaXN0LmluZGV4T2YpIHJldHVybiBsaXN0LmluZGV4T2YobmVlZGxlKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBuID0gbGlzdC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBuZWVkbGUpIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH0sXG5cbiAgbWFwOiBmdW5jdGlvbihvYmplY3QsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iamVjdC5tYXApIHJldHVybiBvYmplY3QubWFwKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gb2JqZWN0Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChjYWxsYmFjay5jYWxsKGNvbnRleHQgfHwgbnVsbCwgb2JqZWN0W2ldLCBpKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNhbGxiYWNrLmNhbGwoY29udGV4dCB8fCBudWxsLCBrZXksIG9iamVjdFtrZXldKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgZmlsdGVyOiBmdW5jdGlvbihhcnJheSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoYXJyYXkuZmlsdGVyKSByZXR1cm4gYXJyYXkuZmlsdGVyKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcnJheS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGNvbnRleHQgfHwgbnVsbCwgYXJyYXlbaV0sIGkpKVxuICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgYXN5bmNFYWNoOiBmdW5jdGlvbihsaXN0LCBpdGVyYXRvciwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgbiAgICAgICA9IGxpc3QubGVuZ3RoLFxuICAgICAgICBpICAgICAgID0gLTEsXG4gICAgICAgIGNhbGxzICAgPSAwLFxuICAgICAgICBsb29waW5nID0gZmFsc2U7XG5cbiAgICB2YXIgaXRlcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbHMgLT0gMTtcbiAgICAgIGkgKz0gMTtcbiAgICAgIGlmIChpID09PSBuKSByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcbiAgICAgIGl0ZXJhdG9yKGxpc3RbaV0sIHJlc3VtZSk7XG4gICAgfTtcblxuICAgIHZhciBsb29wID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobG9vcGluZykgcmV0dXJuO1xuICAgICAgbG9vcGluZyA9IHRydWU7XG4gICAgICB3aGlsZSAoY2FsbHMgPiAwKSBpdGVyYXRlKCk7XG4gICAgICBsb29waW5nID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHZhciByZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxzICs9IDE7XG4gICAgICBsb29wKCk7XG4gICAgfTtcbiAgICByZXN1bWUoKTtcbiAgfSxcblxuICAvLyBodHRwOi8vYXNzYW5rYS5uZXQvY29udGVudC90ZWNoLzIwMDkvMDkvMDIvanNvbjItanMtdnMtcHJvdG90eXBlL1xuICB0b0pTT046IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGlmICghdGhpcy5zdHJpbmdpZnkpIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KG9iamVjdCwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuICh0aGlzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkgPyB0aGlzW2tleV0gOiB2YWx1ZTtcbiAgICB9KTtcbiAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKVxuICBtb2R1bGUuZXhwb3J0cyA9IEZheWU7XG5lbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcbiAgd2luZG93LkZheWUgPSBGYXllO1xuXG5GYXllLkNsYXNzID0gZnVuY3Rpb24ocGFyZW50LCBtZXRob2RzKSB7XG4gIGlmICh0eXBlb2YgcGFyZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgbWV0aG9kcyA9IHBhcmVudDtcbiAgICBwYXJlbnQgID0gT2JqZWN0O1xuICB9XG5cbiAgdmFyIGtsYXNzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemUpIHJldHVybiB0aGlzO1xuICAgIHJldHVybiB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9O1xuXG4gIHZhciBicmlkZ2UgPSBmdW5jdGlvbigpIHt9O1xuICBicmlkZ2UucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcblxuICBrbGFzcy5wcm90b3R5cGUgPSBuZXcgYnJpZGdlKCk7XG4gIEZheWUuZXh0ZW5kKGtsYXNzLnByb3RvdHlwZSwgbWV0aG9kcyk7XG5cbiAgcmV0dXJuIGtsYXNzO1xufTtcblxuKGZ1bmN0aW9uKCkge1xudmFyIEV2ZW50RW1pdHRlciA9IEZheWUuRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24oKSB7fTtcblxuLypcbkNvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxudGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxudGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xudXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXNcbm9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkb1xuc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxudmFyIGlzQXJyYXkgPSB0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gQXJyYXkuaXNBcnJheVxuICAgIDogZnVuY3Rpb24gKHhzKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nXG4gICAgfVxuO1xuZnVuY3Rpb24gaW5kZXhPZiAoeHMsIHgpIHtcbiAgICBpZiAoeHMuaW5kZXhPZikgcmV0dXJuIHhzLmluZGV4T2YoeCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoeCA9PT0geHNbaV0pIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNBcnJheSh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSlcbiAgICB7XG4gICAgICBpZiAoYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgYXJndW1lbnRzWzFdOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5jYXVnaHQsIHVuc3BlY2lmaWVkICdlcnJvcicgZXZlbnQuXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gZmFsc2U7XG4gIHZhciBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBpZiAoIWhhbmRsZXIpIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoaXNBcnJheShoYW5kbGVyKSkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vLyBFdmVudEVtaXR0ZXIgaXMgZGVmaW5lZCBpbiBzcmMvbm9kZV9ldmVudHMuY2Ncbi8vIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCgpIGlzIGFsc28gZGVmaW5lZCB0aGVyZS5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGxpc3RlbmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGRMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT0gXCJuZXdMaXN0ZW5lcnNcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJzXCIuXG4gIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHRoaXMuX2V2ZW50c1t0eXBlXSkpIHtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9IGVsc2Uge1xuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5vbih0eXBlLCBmdW5jdGlvbiBnKCkge1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG4gICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBsaXN0ZW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlTGlzdGVuZXIgb25seSB0YWtlcyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIC8vIGRvZXMgbm90IHVzZSBsaXN0ZW5lcnMoKSwgc28gbm8gc2lkZSBlZmZlY3Qgb2YgY3JlYXRpbmcgX2V2ZW50c1t0eXBlXVxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKSByZXR1cm4gdGhpcztcblxuICB2YXIgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNBcnJheShsaXN0KSkge1xuICAgIHZhciBpID0gaW5kZXhPZihsaXN0LCBsaXN0ZW5lcik7XG4gICAgaWYgKGkgPCAwKSByZXR1cm4gdGhpcztcbiAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICBpZiAobGlzdC5sZW5ndGggPT0gMClcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIH0gZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdID09PSBsaXN0ZW5lcikge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZG9lcyBub3QgdXNlIGxpc3RlbmVycygpLCBzbyBubyBzaWRlIGVmZmVjdCBvZiBjcmVhdGluZyBfZXZlbnRzW3R5cGVdXG4gIGlmICh0eXBlICYmIHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbdHlwZV0pIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdO1xuICBpZiAoIWlzQXJyYXkodGhpcy5fZXZlbnRzW3R5cGVdKSkge1xuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICB9XG4gIHJldHVybiB0aGlzLl9ldmVudHNbdHlwZV07XG59O1xuXG59KSgpO1xuXG5GYXllLk5hbWVzcGFjZSA9IEZheWUuQ2xhc3Moe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl91c2VkID0ge307XG4gIH0sXG5cbiAgZXhpc3RzOiBmdW5jdGlvbihpZCkge1xuICAgIHJldHVybiB0aGlzLl91c2VkLmhhc093blByb3BlcnR5KGlkKTtcbiAgfSxcblxuICBnZW5lcmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5hbWUgPSBGYXllLnJhbmRvbSgpO1xuICAgIHdoaWxlICh0aGlzLl91c2VkLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgbmFtZSA9IEZheWUucmFuZG9tKCk7XG4gICAgcmV0dXJuIHRoaXMuX3VzZWRbbmFtZV0gPSBuYW1lO1xuICB9LFxuXG4gIHJlbGVhc2U6IGZ1bmN0aW9uKGlkKSB7XG4gICAgZGVsZXRlIHRoaXMuX3VzZWRbaWRdO1xuICB9XG59KTtcblxuKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGltZW91dCA9IHNldFRpbWVvdXQsIGRlZmVyO1xuXG5pZiAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgZGVmZXIgPSBmdW5jdGlvbihmbikgeyBzZXRJbW1lZGlhdGUoZm4pIH07XG5lbHNlIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgcHJvY2Vzcy5uZXh0VGljaylcbiAgZGVmZXIgPSBmdW5jdGlvbihmbikgeyBwcm9jZXNzLm5leHRUaWNrKGZuKSB9O1xuZWxzZVxuICBkZWZlciA9IGZ1bmN0aW9uKGZuKSB7IHRpbWVvdXQoZm4sIDApIH07XG5cbnZhciBQRU5ESU5HICAgPSAwLFxuICAgIEZVTEZJTExFRCA9IDEsXG4gICAgUkVKRUNURUQgID0gMjtcblxudmFyIFJFVFVSTiA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggfSxcbiAgICBUSFJPVyAgPSBmdW5jdGlvbih4KSB7IHRocm93ICB4IH07XG5cbnZhciBQcm9taXNlID0gZnVuY3Rpb24odGFzaykge1xuICB0aGlzLl9zdGF0ZSAgICAgICA9IFBFTkRJTkc7XG4gIHRoaXMuX29uRnVsZmlsbGVkID0gW107XG4gIHRoaXMuX29uUmVqZWN0ZWQgID0gW107XG5cbiAgaWYgKHR5cGVvZiB0YXNrICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0YXNrKGZ1bmN0aW9uKHZhbHVlKSAgeyBmdWxmaWxsKHNlbGYsIHZhbHVlKSB9LFxuICAgICAgIGZ1bmN0aW9uKHJlYXNvbikgeyByZWplY3Qoc2VsZiwgcmVhc29uKSB9KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICB2YXIgbmV4dCA9IG5ldyBQcm9taXNlKCk7XG4gIHJlZ2lzdGVyT25GdWxmaWxsZWQodGhpcywgb25GdWxmaWxsZWQsIG5leHQpO1xuICByZWdpc3Rlck9uUmVqZWN0ZWQodGhpcywgb25SZWplY3RlZCwgbmV4dCk7XG4gIHJldHVybiBuZXh0O1xufTtcblxudmFyIHJlZ2lzdGVyT25GdWxmaWxsZWQgPSBmdW5jdGlvbihwcm9taXNlLCBvbkZ1bGZpbGxlZCwgbmV4dCkge1xuICBpZiAodHlwZW9mIG9uRnVsZmlsbGVkICE9PSAnZnVuY3Rpb24nKSBvbkZ1bGZpbGxlZCA9IFJFVFVSTjtcbiAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbih2YWx1ZSkgeyBpbnZva2Uob25GdWxmaWxsZWQsIHZhbHVlLCBuZXh0KSB9O1xuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gUEVORElORykge1xuICAgIHByb21pc2UuX29uRnVsZmlsbGVkLnB1c2goaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAocHJvbWlzZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGhhbmRsZXIocHJvbWlzZS5fdmFsdWUpO1xuICB9XG59O1xuXG52YXIgcmVnaXN0ZXJPblJlamVjdGVkID0gZnVuY3Rpb24ocHJvbWlzZSwgb25SZWplY3RlZCwgbmV4dCkge1xuICBpZiAodHlwZW9mIG9uUmVqZWN0ZWQgIT09ICdmdW5jdGlvbicpIG9uUmVqZWN0ZWQgPSBUSFJPVztcbiAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihyZWFzb24pIHsgaW52b2tlKG9uUmVqZWN0ZWQsIHJlYXNvbiwgbmV4dCkgfTtcblxuICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICBwcm9taXNlLl9vblJlamVjdGVkLnB1c2goaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgaGFuZGxlcihwcm9taXNlLl9yZWFzb24pO1xuICB9XG59O1xuXG52YXIgaW52b2tlID0gZnVuY3Rpb24oZm4sIHZhbHVlLCBuZXh0KSB7XG4gIGRlZmVyKGZ1bmN0aW9uKCkgeyBfaW52b2tlKGZuLCB2YWx1ZSwgbmV4dCkgfSk7XG59O1xuXG52YXIgX2ludm9rZSA9IGZ1bmN0aW9uKGZuLCB2YWx1ZSwgbmV4dCkge1xuICB2YXIgb3V0Y29tZTtcblxuICB0cnkge1xuICAgIG91dGNvbWUgPSBmbih2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlamVjdChuZXh0LCBlcnJvcik7XG4gIH1cblxuICBpZiAob3V0Y29tZSA9PT0gbmV4dCkge1xuICAgIHJlamVjdChuZXh0LCBuZXcgVHlwZUVycm9yKCdSZWN1cnNpdmUgcHJvbWlzZSBjaGFpbiBkZXRlY3RlZCcpKTtcbiAgfSBlbHNlIHtcbiAgICBmdWxmaWxsKG5leHQsIG91dGNvbWUpO1xuICB9XG59O1xuXG52YXIgZnVsZmlsbCA9IFByb21pc2UuZnVsZmlsbCA9IFByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uKHByb21pc2UsIHZhbHVlKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZSwgdHlwZSwgdGhlbjtcblxuICB0cnkge1xuICAgIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgdGhlbiA9IHZhbHVlICE9PSBudWxsICYmICh0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnKSAmJiB2YWx1ZS50aGVuO1xuXG4gICAgaWYgKHR5cGVvZiB0aGVuICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gX2Z1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuXG4gICAgdGhlbi5jYWxsKHZhbHVlLCBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIShjYWxsZWQgXiAoY2FsbGVkID0gdHJ1ZSkpKSByZXR1cm47XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHYpO1xuICAgIH0sIGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmICghKGNhbGxlZCBeIChjYWxsZWQgPSB0cnVlKSkpIHJldHVybjtcbiAgICAgIHJlamVjdChwcm9taXNlLCByKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIShjYWxsZWQgXiAoY2FsbGVkID0gdHJ1ZSkpKSByZXR1cm47XG4gICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgfVxufTtcblxudmFyIF9mdWxmaWxsID0gZnVuY3Rpb24ocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSByZXR1cm47XG5cbiAgcHJvbWlzZS5fc3RhdGUgICAgICA9IEZVTEZJTExFRDtcbiAgcHJvbWlzZS5fdmFsdWUgICAgICA9IHZhbHVlO1xuICBwcm9taXNlLl9vblJlamVjdGVkID0gW107XG5cbiAgdmFyIG9uRnVsZmlsbGVkID0gcHJvbWlzZS5fb25GdWxmaWxsZWQsIGZuO1xuICB3aGlsZSAoZm4gPSBvbkZ1bGZpbGxlZC5zaGlmdCgpKSBmbih2YWx1ZSk7XG59O1xuXG52YXIgcmVqZWN0ID0gUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbihwcm9taXNlLCByZWFzb24pIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSByZXR1cm47XG5cbiAgcHJvbWlzZS5fc3RhdGUgICAgICAgPSBSRUpFQ1RFRDtcbiAgcHJvbWlzZS5fcmVhc29uICAgICAgPSByZWFzb247XG4gIHByb21pc2UuX29uRnVsZmlsbGVkID0gW107XG5cbiAgdmFyIG9uUmVqZWN0ZWQgPSBwcm9taXNlLl9vblJlamVjdGVkLCBmbjtcbiAgd2hpbGUgKGZuID0gb25SZWplY3RlZC5zaGlmdCgpKSBmbihyZWFzb24pO1xufTtcblxuUHJvbWlzZS5hbGwgPSBmdW5jdGlvbihwcm9taXNlcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oZnVsZmlsbCwgcmVqZWN0KSB7XG4gICAgdmFyIGxpc3QgPSBbXSxcbiAgICAgICAgIG4gICA9IHByb21pc2VzLmxlbmd0aCxcbiAgICAgICAgIGk7XG5cbiAgICBpZiAobiA9PT0gMCkgcmV0dXJuIGZ1bGZpbGwobGlzdCk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSAoZnVuY3Rpb24ocHJvbWlzZSwgaSkge1xuICAgICAgUHJvbWlzZS5mdWxmaWxsZWQocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBsaXN0W2ldID0gdmFsdWU7XG4gICAgICAgIGlmICgtLW4gPT09IDApIGZ1bGZpbGwobGlzdCk7XG4gICAgICB9LCByZWplY3QpO1xuICAgIH0pKHByb21pc2VzW2ldLCBpKTtcbiAgfSk7XG59O1xuXG5Qcm9taXNlLmRlZmVyID0gZGVmZXI7XG5cblByb21pc2UuZGVmZXJyZWQgPSBQcm9taXNlLnBlbmRpbmcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHR1cGxlID0ge307XG5cbiAgdHVwbGUucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGZ1bGZpbGwsIHJlamVjdCkge1xuICAgIHR1cGxlLmZ1bGZpbGwgPSB0dXBsZS5yZXNvbHZlID0gZnVsZmlsbDtcbiAgICB0dXBsZS5yZWplY3QgID0gcmVqZWN0O1xuICB9KTtcbiAgcmV0dXJuIHR1cGxlO1xufTtcblxuUHJvbWlzZS5mdWxmaWxsZWQgPSBQcm9taXNlLnJlc29sdmVkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKGZ1bGZpbGwsIHJlamVjdCkgeyBmdWxmaWxsKHZhbHVlKSB9KTtcbn07XG5cblByb21pc2UucmVqZWN0ZWQgPSBmdW5jdGlvbihyZWFzb24pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKGZ1bGZpbGwsIHJlamVjdCkgeyByZWplY3QocmVhc29uKSB9KTtcbn07XG5cbmlmICh0eXBlb2YgRmF5ZSA9PT0gJ3VuZGVmaW5lZCcpXG4gIG1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcbmVsc2VcbiAgRmF5ZS5Qcm9taXNlID0gUHJvbWlzZTtcblxufSkoKTtcblxuRmF5ZS5TZXQgPSBGYXllLkNsYXNzKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5faW5kZXggPSB7fTtcbiAgfSxcblxuICBhZGQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB2YXIga2V5ID0gKGl0ZW0uaWQgIT09IHVuZGVmaW5lZCkgPyBpdGVtLmlkIDogaXRlbTtcbiAgICBpZiAodGhpcy5faW5kZXguaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHRoaXMuX2luZGV4W2tleV0gPSBpdGVtO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGZvckVhY2g6IGZ1bmN0aW9uKGJsb2NrLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2luZGV4KSB7XG4gICAgICBpZiAodGhpcy5faW5kZXguaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgYmxvY2suY2FsbChjb250ZXh0LCB0aGlzLl9pbmRleFtrZXldKTtcbiAgICB9XG4gIH0sXG5cbiAgaXNFbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2luZGV4KSB7XG4gICAgICBpZiAodGhpcy5faW5kZXguaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBtZW1iZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5faW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRleFtrZXldID09PSBpdGVtKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24oaXRlbSkge1xuICAgIHZhciBrZXkgPSAoaXRlbS5pZCAhPT0gdW5kZWZpbmVkKSA/IGl0ZW0uaWQgOiBpdGVtO1xuICAgIHZhciByZW1vdmVkID0gdGhpcy5faW5kZXhba2V5XTtcbiAgICBkZWxldGUgdGhpcy5faW5kZXhba2V5XTtcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfSxcblxuICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyBhcnJheS5wdXNoKGl0ZW0pIH0pO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxufSk7XG5cbkZheWUuVVJJID0ge1xuICBpc1VSSTogZnVuY3Rpb24odXJpKSB7XG4gICAgcmV0dXJuIHVyaSAmJiB1cmkucHJvdG9jb2wgJiYgdXJpLmhvc3QgJiYgdXJpLnBhdGg7XG4gIH0sXG5cbiAgaXNTYW1lT3JpZ2luOiBmdW5jdGlvbih1cmkpIHtcbiAgICB2YXIgbG9jYXRpb24gPSBGYXllLkVOVi5sb2NhdGlvbjtcbiAgICByZXR1cm4gdXJpLnByb3RvY29sID09PSBsb2NhdGlvbi5wcm90b2NvbCAmJlxuICAgICAgICAgICB1cmkuaG9zdG5hbWUgPT09IGxvY2F0aW9uLmhvc3RuYW1lICYmXG4gICAgICAgICAgIHVyaS5wb3J0ICAgICA9PT0gbG9jYXRpb24ucG9ydDtcbiAgfSxcblxuICBwYXJzZTogZnVuY3Rpb24odXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gdXJsO1xuICAgIHZhciB1cmkgPSB7fSwgcGFydHMsIHF1ZXJ5LCBwYWlycywgaSwgbiwgZGF0YTtcblxuICAgIHZhciBjb25zdW1lID0gZnVuY3Rpb24obmFtZSwgcGF0dGVybikge1xuICAgICAgdXJsID0gdXJsLnJlcGxhY2UocGF0dGVybiwgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgdXJpW25hbWVdID0gbWF0Y2g7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0pO1xuICAgICAgdXJpW25hbWVdID0gdXJpW25hbWVdIHx8ICcnO1xuICAgIH07XG5cbiAgICBjb25zdW1lKCdwcm90b2NvbCcsIC9eW2Etel0rXFw6L2kpO1xuICAgIGNvbnN1bWUoJ2hvc3QnLCAgICAgL15cXC9cXC9bXlxcL1xcPyNdKy8pO1xuXG4gICAgaWYgKCEvXlxcLy8udGVzdCh1cmwpICYmICF1cmkuaG9zdClcbiAgICAgIHVybCA9IEZheWUuRU5WLmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1teXFwvXSokLywgJycpICsgdXJsO1xuXG4gICAgY29uc3VtZSgncGF0aG5hbWUnLCAvXlteXFw/I10qLyk7XG4gICAgY29uc3VtZSgnc2VhcmNoJywgICAvXlxcP1teI10qLyk7XG4gICAgY29uc3VtZSgnaGFzaCcsICAgICAvXiMuKi8pO1xuXG4gICAgdXJpLnByb3RvY29sID0gdXJpLnByb3RvY29sIHx8IEZheWUuRU5WLmxvY2F0aW9uLnByb3RvY29sO1xuXG4gICAgaWYgKHVyaS5ob3N0KSB7XG4gICAgICB1cmkuaG9zdCAgICAgPSB1cmkuaG9zdC5zdWJzdHIoMik7XG4gICAgICBwYXJ0cyAgICAgICAgPSB1cmkuaG9zdC5zcGxpdCgnOicpO1xuICAgICAgdXJpLmhvc3RuYW1lID0gcGFydHNbMF07XG4gICAgICB1cmkucG9ydCAgICAgPSBwYXJ0c1sxXSB8fCAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdXJpLmhvc3QgICAgID0gRmF5ZS5FTlYubG9jYXRpb24uaG9zdDtcbiAgICAgIHVyaS5ob3N0bmFtZSA9IEZheWUuRU5WLmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgdXJpLnBvcnQgICAgID0gRmF5ZS5FTlYubG9jYXRpb24ucG9ydDtcbiAgICB9XG5cbiAgICB1cmkucGF0aG5hbWUgPSB1cmkucGF0aG5hbWUgfHwgJy8nO1xuICAgIHVyaS5wYXRoID0gdXJpLnBhdGhuYW1lICsgdXJpLnNlYXJjaDtcblxuICAgIHF1ZXJ5ID0gdXJpLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpO1xuICAgIHBhaXJzID0gcXVlcnkgPyBxdWVyeS5zcGxpdCgnJicpIDogW107XG4gICAgZGF0YSAgPSB7fTtcblxuICAgIGZvciAoaSA9IDAsIG4gPSBwYWlycy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIHBhcnRzID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgIGRhdGFbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdIHx8ICcnKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0gfHwgJycpO1xuICAgIH1cblxuICAgIHVyaS5xdWVyeSA9IGRhdGE7XG5cbiAgICB1cmkuaHJlZiA9IHRoaXMuc3RyaW5naWZ5KHVyaSk7XG4gICAgcmV0dXJuIHVyaTtcbiAgfSxcblxuICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHVyaSkge1xuICAgIHZhciBzdHJpbmcgPSB1cmkucHJvdG9jb2wgKyAnLy8nICsgdXJpLmhvc3RuYW1lO1xuICAgIGlmICh1cmkucG9ydCkgc3RyaW5nICs9ICc6JyArIHVyaS5wb3J0O1xuICAgIHN0cmluZyArPSB1cmkucGF0aG5hbWUgKyB0aGlzLnF1ZXJ5U3RyaW5nKHVyaS5xdWVyeSkgKyAodXJpLmhhc2ggfHwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH0sXG5cbiAgcXVlcnlTdHJpbmc6IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gICAgdmFyIHBhaXJzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIHF1ZXJ5KSB7XG4gICAgICBpZiAoIXF1ZXJ5Lmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeVtrZXldKSk7XG4gICAgfVxuICAgIGlmIChwYWlycy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgICByZXR1cm4gJz8nICsgcGFpcnMuam9pbignJicpO1xuICB9XG59O1xuXG5GYXllLkVycm9yID0gRmF5ZS5DbGFzcyh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGNvZGUsIHBhcmFtcywgbWVzc2FnZSkge1xuICAgIHRoaXMuY29kZSAgICA9IGNvZGU7XG4gICAgdGhpcy5wYXJhbXMgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyYW1zKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9LFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb2RlICsgJzonICtcbiAgICAgICAgICAgdGhpcy5wYXJhbXMuam9pbignLCcpICsgJzonICtcbiAgICAgICAgICAgdGhpcy5tZXNzYWdlO1xuICB9XG59KTtcblxuRmF5ZS5FcnJvci5wYXJzZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgJyc7XG4gIGlmICghRmF5ZS5HcmFtbWFyLkVSUk9SLnRlc3QobWVzc2FnZSkpIHJldHVybiBuZXcgdGhpcyhudWxsLCBbXSwgbWVzc2FnZSk7XG5cbiAgdmFyIHBhcnRzICAgPSBtZXNzYWdlLnNwbGl0KCc6JyksXG4gICAgICBjb2RlICAgID0gcGFyc2VJbnQocGFydHNbMF0pLFxuICAgICAgcGFyYW1zICA9IHBhcnRzWzFdLnNwbGl0KCcsJyksXG4gICAgICBtZXNzYWdlID0gcGFydHNbMl07XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZGUsIHBhcmFtcywgbWVzc2FnZSk7XG59O1xuXG5cblxuXG5GYXllLkVycm9yLnZlcnNpb25NaXNtYXRjaCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IHRoaXMoMzAwLCBhcmd1bWVudHMsICdWZXJzaW9uIG1pc21hdGNoJykudG9TdHJpbmcoKTtcbn07XG5cbkZheWUuRXJyb3IuY29ubnR5cGVNaXNtYXRjaCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IHRoaXMoMzAxLCBhcmd1bWVudHMsICdDb25uZWN0aW9uIHR5cGVzIG5vdCBzdXBwb3J0ZWQnKS50b1N0cmluZygpO1xufTtcblxuRmF5ZS5FcnJvci5leHRNaXNtYXRjaCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IHRoaXMoMzAyLCBhcmd1bWVudHMsICdFeHRlbnNpb24gbWlzbWF0Y2gnKS50b1N0cmluZygpO1xufTtcblxuRmF5ZS5FcnJvci5iYWRSZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgdGhpcyg0MDAsIGFyZ3VtZW50cywgJ0JhZCByZXF1ZXN0JykudG9TdHJpbmcoKTtcbn07XG5cbkZheWUuRXJyb3IuY2xpZW50VW5rbm93biA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IHRoaXMoNDAxLCBhcmd1bWVudHMsICdVbmtub3duIGNsaWVudCcpLnRvU3RyaW5nKCk7XG59O1xuXG5GYXllLkVycm9yLnBhcmFtZXRlck1pc3NpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyB0aGlzKDQwMiwgYXJndW1lbnRzLCAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXInKS50b1N0cmluZygpO1xufTtcblxuRmF5ZS5FcnJvci5jaGFubmVsRm9yYmlkZGVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgdGhpcyg0MDMsIGFyZ3VtZW50cywgJ0ZvcmJpZGRlbiBjaGFubmVsJykudG9TdHJpbmcoKTtcbn07XG5cbkZheWUuRXJyb3IuY2hhbm5lbFVua25vd24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyB0aGlzKDQwNCwgYXJndW1lbnRzLCAnVW5rbm93biBjaGFubmVsJykudG9TdHJpbmcoKTtcbn07XG5cbkZheWUuRXJyb3IuY2hhbm5lbEludmFsaWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyB0aGlzKDQwNSwgYXJndW1lbnRzLCAnSW52YWxpZCBjaGFubmVsJykudG9TdHJpbmcoKTtcbn07XG5cbkZheWUuRXJyb3IuZXh0VW5rbm93biA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IHRoaXMoNDA2LCBhcmd1bWVudHMsICdVbmtub3duIGV4dGVuc2lvbicpLnRvU3RyaW5nKCk7XG59O1xuXG5GYXllLkVycm9yLnB1Ymxpc2hGYWlsZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyB0aGlzKDQwNywgYXJndW1lbnRzLCAnRmFpbGVkIHRvIHB1Ymxpc2gnKS50b1N0cmluZygpO1xufTtcblxuRmF5ZS5FcnJvci5zZXJ2ZXJFcnJvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IHRoaXMoNTAwLCBhcmd1bWVudHMsICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKS50b1N0cmluZygpO1xufTtcblxuXG5GYXllLkRlZmVycmFibGUgPSB7XG4gIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrLCBlcnJiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICghdGhpcy5fcHJvbWlzZSlcbiAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgRmF5ZS5Qcm9taXNlKGZ1bmN0aW9uKGZ1bGZpbGwsIHJlamVjdCkge1xuICAgICAgICBzZWxmLl9mdWxmaWxsID0gZnVsZmlsbDtcbiAgICAgICAgc2VsZi5fcmVqZWN0ICA9IHJlamVjdDtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKGNhbGxiYWNrLCBlcnJiYWNrKTtcbiAgfSxcblxuICBjYWxsYmFjazogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdmFsdWUpIH0pO1xuICB9LFxuXG4gIGVycmJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBmdW5jdGlvbihyZWFzb24pIHsgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZWFzb24pIH0pO1xuICB9LFxuXG4gIHRpbWVvdXQ6IGZ1bmN0aW9uKHNlY29uZHMsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnRoZW4oKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fdGltZXIgPSBGYXllLkVOVi5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fcmVqZWN0KG1lc3NhZ2UpO1xuICAgIH0sIHNlY29uZHMgKiAxMDAwKTtcbiAgfSxcblxuICBzZXREZWZlcnJlZFN0YXR1czogZnVuY3Rpb24oc3RhdHVzLCB2YWx1ZSkge1xuICAgIGlmICh0aGlzLl90aW1lcikgRmF5ZS5FTlYuY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcblxuICAgIHRoaXMudGhlbigpO1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcpXG4gICAgICB0aGlzLl9mdWxmaWxsKHZhbHVlKTtcbiAgICBlbHNlIGlmIChzdGF0dXMgPT09ICdmYWlsZWQnKVxuICAgICAgdGhpcy5fcmVqZWN0KHZhbHVlKTtcbiAgICBlbHNlXG4gICAgICBkZWxldGUgdGhpcy5fcHJvbWlzZTtcbiAgfVxufTtcblxuRmF5ZS5QdWJsaXNoZXIgPSB7XG4gIGNvdW50TGlzdGVuZXJzOiBmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMoZXZlbnRUeXBlKS5sZW5ndGg7XG4gIH0sXG5cbiAgYmluZDogZnVuY3Rpb24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgIHZhciBzbGljZSAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24oKSB7IGxpc3RlbmVyLmFwcGx5KGNvbnRleHQsIHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgfTtcblxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChbZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCwgaGFuZGxlcl0pO1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH0sXG5cbiAgdW5iaW5kOiBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IFtdO1xuICAgIHZhciBuID0gdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCwgdHVwbGU7XG5cbiAgICB3aGlsZSAobi0tKSB7XG4gICAgICB0dXBsZSA9IHRoaXMuX2xpc3RlbmVyc1tuXTtcbiAgICAgIGlmICh0dXBsZVswXSAhPT0gZXZlbnRUeXBlKSBjb250aW51ZTtcbiAgICAgIGlmIChsaXN0ZW5lciAmJiAodHVwbGVbMV0gIT09IGxpc3RlbmVyIHx8IHR1cGxlWzJdICE9PSBjb250ZXh0KSkgY29udGludWU7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKG4sIDEpO1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudFR5cGUsIHR1cGxlWzNdKTtcbiAgICB9XG4gIH1cbn07XG5cbkZheWUuZXh0ZW5kKEZheWUuUHVibGlzaGVyLCBGYXllLkV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuRmF5ZS5QdWJsaXNoZXIudHJpZ2dlciA9IEZheWUuUHVibGlzaGVyLmVtaXQ7XG5cbkZheWUuVGltZW91dHMgPSB7XG4gIGFkZFRpbWVvdXQ6IGZ1bmN0aW9uKG5hbWUsIGRlbGF5LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX3RpbWVvdXRzID0gdGhpcy5fdGltZW91dHMgfHwge307XG4gICAgaWYgKHRoaXMuX3RpbWVvdXRzLmhhc093blByb3BlcnR5KG5hbWUpKSByZXR1cm47XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3RpbWVvdXRzW25hbWVdID0gRmF5ZS5FTlYuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSBzZWxmLl90aW1lb3V0c1tuYW1lXTtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCk7XG4gICAgfSwgMTAwMCAqIGRlbGF5KTtcbiAgfSxcblxuICByZW1vdmVUaW1lb3V0OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdGhpcy5fdGltZW91dHMgPSB0aGlzLl90aW1lb3V0cyB8fCB7fTtcbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXRzW25hbWVdO1xuICAgIGlmICghdGltZW91dCkgcmV0dXJuO1xuICAgIEZheWUuRU5WLmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBkZWxldGUgdGhpcy5fdGltZW91dHNbbmFtZV07XG4gIH0sXG5cbiAgcmVtb3ZlQWxsVGltZW91dHM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3RpbWVvdXRzID0gdGhpcy5fdGltZW91dHMgfHwge307XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLl90aW1lb3V0cykgdGhpcy5yZW1vdmVUaW1lb3V0KG5hbWUpO1xuICB9XG59O1xuXG5GYXllLkxvZ2dpbmcgPSB7XG4gIExPR19MRVZFTFM6IHtcbiAgICBmYXRhbDogIDQsXG4gICAgZXJyb3I6ICAzLFxuICAgIHdhcm46ICAgMixcbiAgICBpbmZvOiAgIDEsXG4gICAgZGVidWc6ICAwXG4gIH0sXG5cbiAgd3JpdGVMb2c6IGZ1bmN0aW9uKG1lc3NhZ2VBcmdzLCBsZXZlbCkge1xuICAgIGlmICghRmF5ZS5sb2dnZXIpIHJldHVybjtcblxuICAgIHZhciBhcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobWVzc2FnZUFyZ3MpLFxuICAgICAgICBiYW5uZXIgPSAnW0ZheWUnLFxuICAgICAgICBrbGFzcyAgPSB0aGlzLmNsYXNzTmFtZSxcblxuICAgICAgICBtZXNzYWdlID0gYXJncy5zaGlmdCgpLnJlcGxhY2UoL1xcPy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEZheWUudG9KU09OKGFyZ3Muc2hpZnQoKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuICdbT2JqZWN0XSc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIGZvciAodmFyIGtleSBpbiBGYXllKSB7XG4gICAgICBpZiAoa2xhc3MpIGNvbnRpbnVlO1xuICAgICAgaWYgKHR5cGVvZiBGYXllW2tleV0gIT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBGYXllW2tleV0pIGtsYXNzID0ga2V5O1xuICAgIH1cbiAgICBpZiAoa2xhc3MpIGJhbm5lciArPSAnLicgKyBrbGFzcztcbiAgICBiYW5uZXIgKz0gJ10gJztcblxuICAgIGlmICh0eXBlb2YgRmF5ZS5sb2dnZXJbbGV2ZWxdID09PSAnZnVuY3Rpb24nKVxuICAgICAgRmF5ZS5sb2dnZXJbbGV2ZWxdKGJhbm5lciArIG1lc3NhZ2UpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBGYXllLmxvZ2dlciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIEZheWUubG9nZ2VyKGJhbm5lciArIG1lc3NhZ2UpO1xuICB9XG59O1xuXG4oZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGtleSBpbiBGYXllLkxvZ2dpbmcuTE9HX0xFVkVMUylcbiAgICAoZnVuY3Rpb24obGV2ZWwpIHtcbiAgICAgIEZheWUuTG9nZ2luZ1tsZXZlbF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUxvZyhhcmd1bWVudHMsIGxldmVsKTtcbiAgICAgIH07XG4gICAgfSkoa2V5KTtcbn0pKCk7XG5cbkZheWUuR3JhbW1hciA9IHtcbiAgQ0hBTk5FTF9OQU1FOiAgICAgL15cXC8oKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCkpKSsoXFwvKCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApKSkrKSokLyxcbiAgQ0hBTk5FTF9QQVRURVJOOiAgL14oXFwvKCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApKSkrKSpcXC9cXCp7MSwyfSQvLFxuICBFUlJPUjogICAgICAgICAgICAvXihbMC05XVswLTldWzAtOV06KCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApfCB8XFwvfFxcKnxcXC4pKSooLCgoKChbYS16XXxbQS1aXSl8WzAtOV0pfChcXC18XFxffFxcIXxcXH58XFwofFxcKXxcXCR8XFxAKXwgfFxcL3xcXCp8XFwuKSkqKSo6KCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApfCB8XFwvfFxcKnxcXC4pKSp8WzAtOV1bMC05XVswLTldOjooKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCl8IHxcXC98XFwqfFxcLikpKikkLyxcbiAgVkVSU0lPTjogICAgICAgICAgL14oWzAtOV0pKyhcXC4oKFthLXpdfFtBLVpdKXxbMC05XSkoKCgoW2Etel18W0EtWl0pfFswLTldKXxcXC18XFxfKSkqKSokL1xufTtcblxuRmF5ZS5FeHRlbnNpYmxlID0ge1xuICBhZGRFeHRlbnNpb246IGZ1bmN0aW9uKGV4dGVuc2lvbikge1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSB0aGlzLl9leHRlbnNpb25zIHx8IFtdO1xuICAgIHRoaXMuX2V4dGVuc2lvbnMucHVzaChleHRlbnNpb24pO1xuICAgIGlmIChleHRlbnNpb24uYWRkZWQpIGV4dGVuc2lvbi5hZGRlZCh0aGlzKTtcbiAgfSxcblxuICByZW1vdmVFeHRlbnNpb246IGZ1bmN0aW9uKGV4dGVuc2lvbikge1xuICAgIGlmICghdGhpcy5fZXh0ZW5zaW9ucykgcmV0dXJuO1xuICAgIHZhciBpID0gdGhpcy5fZXh0ZW5zaW9ucy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKHRoaXMuX2V4dGVuc2lvbnNbaV0gIT09IGV4dGVuc2lvbikgY29udGludWU7XG4gICAgICB0aGlzLl9leHRlbnNpb25zLnNwbGljZShpLDEpO1xuICAgICAgaWYgKGV4dGVuc2lvbi5yZW1vdmVkKSBleHRlbnNpb24ucmVtb3ZlZCh0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgcGlwZVRocm91Z2hFeHRlbnNpb25zOiBmdW5jdGlvbihzdGFnZSwgbWVzc2FnZSwgcmVxdWVzdCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmRlYnVnKCdQYXNzaW5nIHRocm91Z2ggPyBleHRlbnNpb25zOiA/Jywgc3RhZ2UsIG1lc3NhZ2UpO1xuXG4gICAgaWYgKCF0aGlzLl9leHRlbnNpb25zKSByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBtZXNzYWdlKTtcbiAgICB2YXIgZXh0ZW5zaW9ucyA9IHRoaXMuX2V4dGVuc2lvbnMuc2xpY2UoKTtcblxuICAgIHZhciBwaXBlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBtZXNzYWdlKTtcblxuICAgICAgdmFyIGV4dGVuc2lvbiA9IGV4dGVuc2lvbnMuc2hpZnQoKTtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBtZXNzYWdlKTtcblxuICAgICAgdmFyIGZuID0gZXh0ZW5zaW9uW3N0YWdlXTtcbiAgICAgIGlmICghZm4pIHJldHVybiBwaXBlKG1lc3NhZ2UpO1xuXG4gICAgICBpZiAoZm4ubGVuZ3RoID49IDMpIGV4dGVuc2lvbltzdGFnZV0obWVzc2FnZSwgcmVxdWVzdCwgcGlwZSk7XG4gICAgICBlbHNlICAgICAgICAgICAgICAgIGV4dGVuc2lvbltzdGFnZV0obWVzc2FnZSwgcGlwZSk7XG4gICAgfTtcbiAgICBwaXBlKG1lc3NhZ2UpO1xuICB9XG59O1xuXG5GYXllLmV4dGVuZChGYXllLkV4dGVuc2libGUsIEZheWUuTG9nZ2luZyk7XG5cbkZheWUuQ2hhbm5lbCA9IEZheWUuQ2xhc3Moe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMubmFtZSA9IG5hbWU7XG4gIH0sXG5cbiAgcHVzaDogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIHRoaXMudHJpZ2dlcignbWVzc2FnZScsIG1lc3NhZ2UpO1xuICB9LFxuXG4gIGlzVW51c2VkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudExpc3RlbmVycygnbWVzc2FnZScpID09PSAwO1xuICB9XG59KTtcblxuRmF5ZS5leHRlbmQoRmF5ZS5DaGFubmVsLnByb3RvdHlwZSwgRmF5ZS5QdWJsaXNoZXIpO1xuXG5GYXllLmV4dGVuZChGYXllLkNoYW5uZWwsIHtcbiAgSEFORFNIQUtFOiAgICAnL21ldGEvaGFuZHNoYWtlJyxcbiAgQ09OTkVDVDogICAgICAnL21ldGEvY29ubmVjdCcsXG4gIFNVQlNDUklCRTogICAgJy9tZXRhL3N1YnNjcmliZScsXG4gIFVOU1VCU0NSSUJFOiAgJy9tZXRhL3Vuc3Vic2NyaWJlJyxcbiAgRElTQ09OTkVDVDogICAnL21ldGEvZGlzY29ubmVjdCcsXG5cbiAgTUVUQTogICAgICAgICAnbWV0YScsXG4gIFNFUlZJQ0U6ICAgICAgJ3NlcnZpY2UnLFxuXG4gIGV4cGFuZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBzZWdtZW50cyA9IHRoaXMucGFyc2UobmFtZSksXG4gICAgICAgIGNoYW5uZWxzID0gWycvKionLCBuYW1lXTtcblxuICAgIHZhciBjb3B5ID0gc2VnbWVudHMuc2xpY2UoKTtcbiAgICBjb3B5W2NvcHkubGVuZ3RoIC0gMV0gPSAnKic7XG4gICAgY2hhbm5lbHMucHVzaCh0aGlzLnVucGFyc2UoY29weSkpO1xuXG4gICAgZm9yICh2YXIgaSA9IDEsIG4gPSBzZWdtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGNvcHkgPSBzZWdtZW50cy5zbGljZSgwLCBpKTtcbiAgICAgIGNvcHkucHVzaCgnKionKTtcbiAgICAgIGNoYW5uZWxzLnB1c2godGhpcy51bnBhcnNlKGNvcHkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbHM7XG4gIH0sXG5cbiAgaXNWYWxpZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBGYXllLkdyYW1tYXIuQ0hBTk5FTF9OQU1FLnRlc3QobmFtZSkgfHxcbiAgICAgICAgICAgRmF5ZS5HcmFtbWFyLkNIQU5ORUxfUEFUVEVSTi50ZXN0KG5hbWUpO1xuICB9LFxuXG4gIHBhcnNlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQobmFtZSkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBuYW1lLnNwbGl0KCcvJykuc2xpY2UoMSk7XG4gIH0sXG5cbiAgdW5wYXJzZTogZnVuY3Rpb24oc2VnbWVudHMpIHtcbiAgICByZXR1cm4gJy8nICsgc2VnbWVudHMuam9pbignLycpO1xuICB9LFxuXG4gIGlzTWV0YTogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBzZWdtZW50cyA9IHRoaXMucGFyc2UobmFtZSk7XG4gICAgcmV0dXJuIHNlZ21lbnRzID8gKHNlZ21lbnRzWzBdID09PSB0aGlzLk1FVEEpIDogbnVsbDtcbiAgfSxcblxuICBpc1NlcnZpY2U6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgc2VnbWVudHMgPSB0aGlzLnBhcnNlKG5hbWUpO1xuICAgIHJldHVybiBzZWdtZW50cyA/IChzZWdtZW50c1swXSA9PT0gdGhpcy5TRVJWSUNFKSA6IG51bGw7XG4gIH0sXG5cbiAgaXNTdWJzY3JpYmFibGU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChuYW1lKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuICF0aGlzLmlzTWV0YShuYW1lKSAmJiAhdGhpcy5pc1NlcnZpY2UobmFtZSk7XG4gIH0sXG5cbiAgU2V0OiBGYXllLkNsYXNzKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgfSxcblxuICAgIGdldEtleXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9jaGFubmVscykga2V5cy5wdXNoKGtleSk7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBkZWxldGUgdGhpcy5fY2hhbm5lbHNbbmFtZV07XG4gICAgfSxcblxuICAgIGhhc1N1YnNjcmlwdGlvbjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG5cbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKG5hbWVzLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgdmFyIG5hbWU7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IG5hbWVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgIHZhciBjaGFubmVsID0gdGhpcy5fY2hhbm5lbHNbbmFtZV0gPSB0aGlzLl9jaGFubmVsc1tuYW1lXSB8fCBuZXcgRmF5ZS5DaGFubmVsKG5hbWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNoYW5uZWwuYmluZCgnbWVzc2FnZScsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICB2YXIgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW25hbWVdO1xuICAgICAgaWYgKCFjaGFubmVsKSByZXR1cm4gZmFsc2U7XG4gICAgICBjaGFubmVsLnVuYmluZCgnbWVzc2FnZScsIGNhbGxiYWNrLCBjb250ZXh0KTtcblxuICAgICAgaWYgKGNoYW5uZWwuaXNVbnVzZWQoKSkge1xuICAgICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRpc3RyaWJ1dGVNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICB2YXIgY2hhbm5lbHMgPSBGYXllLkNoYW5uZWwuZXhwYW5kKG1lc3NhZ2UuY2hhbm5lbCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gY2hhbm5lbHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbHNbaV1dO1xuICAgICAgICBpZiAoY2hhbm5lbCkgY2hhbm5lbC50cmlnZ2VyKCdtZXNzYWdlJywgbWVzc2FnZS5kYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59KTtcblxuRmF5ZS5QdWJsaWNhdGlvbiA9IEZheWUuQ2xhc3MoRmF5ZS5EZWZlcnJhYmxlKTtcblxuRmF5ZS5TdWJzY3JpcHRpb24gPSBGYXllLkNsYXNzKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oY2xpZW50LCBjaGFubmVscywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGllbnQgICAgPSBjbGllbnQ7XG4gICAgdGhpcy5fY2hhbm5lbHMgID0gY2hhbm5lbHM7XG4gICAgdGhpcy5fY2FsbGJhY2sgID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fY29udGV4dCAgICAgPSBjb250ZXh0O1xuICAgIHRoaXMuX2NhbmNlbGxlZCA9IGZhbHNlO1xuICB9LFxuXG4gIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbmNlbGxlZCkgcmV0dXJuO1xuICAgIHRoaXMuX2NsaWVudC51bnN1YnNjcmliZSh0aGlzLl9jaGFubmVscywgdGhpcy5fY2FsbGJhY2ssIHRoaXMuX2NvbnRleHQpO1xuICAgIHRoaXMuX2NhbmNlbGxlZCA9IHRydWU7XG4gIH0sXG5cbiAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY2FuY2VsKCk7XG4gIH1cbn0pO1xuXG5GYXllLmV4dGVuZChGYXllLlN1YnNjcmlwdGlvbi5wcm90b3R5cGUsIEZheWUuRGVmZXJyYWJsZSk7XG5cbkZheWUuQ2xpZW50ID0gRmF5ZS5DbGFzcyh7XG4gIFVOQ09OTkVDVEVEOiAgICAgICAgMSxcbiAgQ09OTkVDVElORzogICAgICAgICAyLFxuICBDT05ORUNURUQ6ICAgICAgICAgIDMsXG4gIERJU0NPTk5FQ1RFRDogICAgICAgNCxcblxuICBIQU5EU0hBS0U6ICAgICAgICAgICdoYW5kc2hha2UnLFxuICBSRVRSWTogICAgICAgICAgICAgICdyZXRyeScsXG4gIE5PTkU6ICAgICAgICAgICAgICAgJ25vbmUnLFxuXG4gIENPTk5FQ1RJT05fVElNRU9VVDogNjAsXG5cbiAgREVGQVVMVF9FTkRQT0lOVDogICAnL2JheWV1eCcsXG4gIElOVEVSVkFMOiAgICAgICAgICAgMCxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihlbmRwb2ludCwgb3B0aW9ucykge1xuICAgIHRoaXMuaW5mbygnTmV3IGNsaWVudCBjcmVhdGVkIGZvciA/JywgZW5kcG9pbnQpO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgRmF5ZS52YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgWydpbnRlcnZhbCcsICd0aW1lb3V0JywgJ2VuZHBvaW50cycsICdwcm94eScsICdyZXRyeScsICdzY2hlZHVsZXInLCAnd2Vic29ja2V0RXh0ZW5zaW9ucycsICd0bHMnLCAnY2EnXSk7XG5cbiAgICB0aGlzLl9lbmRwb2ludCAgID0gZW5kcG9pbnQgfHwgdGhpcy5ERUZBVUxUX0VORFBPSU5UO1xuICAgIHRoaXMuX2NoYW5uZWxzICAgPSBuZXcgRmF5ZS5DaGFubmVsLlNldCgpO1xuICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRmF5ZS5EaXNwYXRjaGVyKHRoaXMsIHRoaXMuX2VuZHBvaW50LCBvcHRpb25zKTtcblxuICAgIHRoaXMuX21lc3NhZ2VJZCA9IDA7XG4gICAgdGhpcy5fc3RhdGUgICAgID0gdGhpcy5VTkNPTk5FQ1RFRDtcblxuICAgIHRoaXMuX3Jlc3BvbnNlQ2FsbGJhY2tzID0ge307XG5cbiAgICB0aGlzLl9hZHZpY2UgPSB7XG4gICAgICByZWNvbm5lY3Q6IHRoaXMuUkVUUlksXG4gICAgICBpbnRlcnZhbDogIDEwMDAgKiAob3B0aW9ucy5pbnRlcnZhbCB8fCB0aGlzLklOVEVSVkFMKSxcbiAgICAgIHRpbWVvdXQ6ICAgMTAwMCAqIChvcHRpb25zLnRpbWVvdXQgIHx8IHRoaXMuQ09OTkVDVElPTl9USU1FT1VUKVxuICAgIH07XG4gICAgdGhpcy5fZGlzcGF0Y2hlci50aW1lb3V0ID0gdGhpcy5fYWR2aWNlLnRpbWVvdXQgLyAxMDAwO1xuXG4gICAgdGhpcy5fZGlzcGF0Y2hlci5iaW5kKCdtZXNzYWdlJywgdGhpcy5fcmVjZWl2ZU1lc3NhZ2UsIHRoaXMpO1xuXG4gICAgaWYgKEZheWUuRXZlbnQgJiYgRmF5ZS5FTlYub25iZWZvcmV1bmxvYWQgIT09IHVuZGVmaW5lZClcbiAgICAgIEZheWUuRXZlbnQub24oRmF5ZS5FTlYsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEZheWUuaW5kZXhPZih0aGlzLl9kaXNwYXRjaGVyLl9kaXNhYmxlZCwgJ2F1dG9kaXNjb25uZWN0JykgPCAwKVxuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgYWRkV2Vic29ja2V0RXh0ZW5zaW9uOiBmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5hZGRXZWJzb2NrZXRFeHRlbnNpb24oZXh0ZW5zaW9uKTtcbiAgfSxcblxuICBkaXNhYmxlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzYWJsZShmZWF0dXJlKTtcbiAgfSxcblxuICBzZXRIZWFkZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuc2V0SGVhZGVyKG5hbWUsIHZhbHVlKTtcbiAgfSxcblxuICAvLyBSZXF1ZXN0XG4gIC8vIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbFxuICAvLyAgICAgICAgICAgICAgICAqIHZlcnNpb25cbiAgLy8gICAgICAgICAgICAgICAgKiBzdXBwb3J0ZWRDb25uZWN0aW9uVHlwZXNcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBtaW5pbXVtVmVyc2lvblxuICAvLyAgICAgICAgICAgICAgICAqIGV4dFxuICAvLyAgICAgICAgICAgICAgICAqIGlkXG4gIC8vXG4gIC8vIFN1Y2Nlc3MgUmVzcG9uc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZhaWxlZCBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgICAgICAgICBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWxcbiAgLy8gICAgICAgICAgICAgICAgKiB2ZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzdWNjZXNzZnVsXG4gIC8vICAgICAgICAgICAgICAgICogc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzICAgICAgICAgICAgICAgICAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgKiBjbGllbnRJZCAgICAgICAgICAgICAgICAgICAgTUFZIGluY2x1ZGU6ICAgKiBzdXBwb3J0ZWRDb25uZWN0aW9uVHlwZXNcbiAgLy8gICAgICAgICAgICAgICAgKiBzdWNjZXNzZnVsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBhZHZpY2VcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBtaW5pbXVtVmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB2ZXJzaW9uXG4gIC8vICAgICAgICAgICAgICAgICogYWR2aWNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogbWluaW11bVZlcnNpb25cbiAgLy8gICAgICAgICAgICAgICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBpZFxuICAvLyAgICAgICAgICAgICAgICAqIGF1dGhTdWNjZXNzZnVsXG4gIGhhbmRzaGFrZTogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5fYWR2aWNlLnJlY29ubmVjdCA9PT0gdGhpcy5OT05FKSByZXR1cm47XG4gICAgaWYgKHRoaXMuX3N0YXRlICE9PSB0aGlzLlVOQ09OTkVDVEVEKSByZXR1cm47XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuQ09OTkVDVElORztcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmluZm8oJ0luaXRpYXRpbmcgaGFuZHNoYWtlIHdpdGggPycsIEZheWUuVVJJLnN0cmluZ2lmeSh0aGlzLl9lbmRwb2ludCkpO1xuICAgIHRoaXMuX2Rpc3BhdGNoZXIuc2VsZWN0VHJhbnNwb3J0KEZheWUuTUFOREFUT1JZX0NPTk5FQ1RJT05fVFlQRVMpO1xuXG4gICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgY2hhbm5lbDogICAgICAgICAgICAgICAgICBGYXllLkNoYW5uZWwuSEFORFNIQUtFLFxuICAgICAgdmVyc2lvbjogICAgICAgICAgICAgICAgICBGYXllLkJBWUVVWF9WRVJTSU9OLFxuICAgICAgc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzOiB0aGlzLl9kaXNwYXRjaGVyLmdldENvbm5lY3Rpb25UeXBlcygpXG5cbiAgICB9LCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLkNPTk5FQ1RFRDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCAgPSByZXNwb25zZS5jbGllbnRJZDtcblxuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLnNlbGVjdFRyYW5zcG9ydChyZXNwb25zZS5zdXBwb3J0ZWRDb25uZWN0aW9uVHlwZXMpO1xuXG4gICAgICAgIHRoaXMuaW5mbygnSGFuZHNoYWtlIHN1Y2Nlc3NmdWw6ID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmliZSh0aGlzLl9jaGFubmVscy5nZXRLZXlzKCksIHRydWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIEZheWUuUHJvbWlzZS5kZWZlcihmdW5jdGlvbigpIHsgY2FsbGJhY2suY2FsbChjb250ZXh0KSB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbmZvKCdIYW5kc2hha2UgdW5zdWNjZXNzZnVsJyk7XG4gICAgICAgIEZheWUuRU5WLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHNlbGYuaGFuZHNoYWtlKGNhbGxiYWNrLCBjb250ZXh0KSB9LCB0aGlzLl9kaXNwYXRjaGVyLnJldHJ5ICogMTAwMCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5VTkNPTk5FQ1RFRDtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICAvLyBSZXF1ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzcG9uc2VcbiAgLy8gTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsICAgICAgICAgICAgIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbFxuICAvLyAgICAgICAgICAgICAgICAqIGNsaWVudElkICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzdWNjZXNzZnVsXG4gIC8vICAgICAgICAgICAgICAgICogY29ubmVjdGlvblR5cGUgICAgICAgICAgICAgICAgICAgICAqIGNsaWVudElkXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogZXh0ICAgICAgICAgICAgICAgICBNQVkgaW5jbHVkZTogICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGFkdmljZVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGltZXN0YW1wXG4gIGNvbm5lY3Q6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuX2FkdmljZS5yZWNvbm5lY3QgPT09IHRoaXMuTk9ORSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gdGhpcy5ESVNDT05ORUNURUQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gdGhpcy5VTkNPTk5FQ1RFRClcbiAgICAgIHJldHVybiB0aGlzLmhhbmRzaGFrZShmdW5jdGlvbigpIHsgdGhpcy5jb25uZWN0KGNhbGxiYWNrLCBjb250ZXh0KSB9LCB0aGlzKTtcblxuICAgIHRoaXMuY2FsbGJhY2soY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gdGhpcy5DT05ORUNURUQpIHJldHVybjtcblxuICAgIHRoaXMuaW5mbygnQ2FsbGluZyBkZWZlcnJlZCBhY3Rpb25zIGZvciA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCk7XG4gICAgdGhpcy5zZXREZWZlcnJlZFN0YXR1cygnc3VjY2VlZGVkJyk7XG4gICAgdGhpcy5zZXREZWZlcnJlZFN0YXR1cygndW5rbm93bicpO1xuXG4gICAgaWYgKHRoaXMuX2Nvbm5lY3RSZXF1ZXN0KSByZXR1cm47XG4gICAgdGhpcy5fY29ubmVjdFJlcXVlc3QgPSB0cnVlO1xuXG4gICAgdGhpcy5pbmZvKCdJbml0aWF0aW5nIGNvbm5lY3Rpb24gZm9yID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcblxuICAgIHRoaXMuX3NlbmRNZXNzYWdlKHtcbiAgICAgIGNoYW5uZWw6ICAgICAgICBGYXllLkNoYW5uZWwuQ09OTkVDVCxcbiAgICAgIGNsaWVudElkOiAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLFxuICAgICAgY29ubmVjdGlvblR5cGU6IHRoaXMuX2Rpc3BhdGNoZXIuY29ubmVjdGlvblR5cGVcblxuICAgIH0sIHt9LCB0aGlzLl9jeWNsZUNvbm5lY3Rpb24sIHRoaXMpO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogY2xpZW50SWRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGlkXG4gIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gdGhpcy5DT05ORUNURUQpIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuRElTQ09OTkVDVEVEO1xuXG4gICAgdGhpcy5pbmZvKCdEaXNjb25uZWN0aW5nID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBGYXllLlB1YmxpY2F0aW9uKCk7XG5cbiAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICBjaGFubmVsOiAgRmF5ZS5DaGFubmVsLkRJU0NPTk5FQ1QsXG4gICAgICBjbGllbnRJZDogdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZFxuXG4gICAgfSwge30sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzc2Z1bCkge1xuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsb3NlKCk7XG4gICAgICAgIHByb21pc2Uuc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZS5zZXREZWZlcnJlZFN0YXR1cygnZmFpbGVkJywgRmF5ZS5FcnJvci5wYXJzZShyZXNwb25zZS5lcnJvcikpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5pbmZvKCdDbGVhcmluZyBjaGFubmVsIGxpc3RlbmVycyBmb3IgPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuICAgIHRoaXMuX2NoYW5uZWxzID0gbmV3IEZheWUuQ2hhbm5lbC5TZXQoKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gICAgICAgICAgICAgICAgKiBzdWJzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICogY2xpZW50SWRcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3Vic2NyaXB0aW9uXG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICBNQVkgaW5jbHVkZTogICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGFkdmljZVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGltZXN0YW1wXG4gIHN1YnNjcmliZTogZnVuY3Rpb24oY2hhbm5lbCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoY2hhbm5lbCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgcmV0dXJuIEZheWUubWFwKGNoYW5uZWwsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IG5ldyBGYXllLlN1YnNjcmlwdGlvbih0aGlzLCBjaGFubmVsLCBjYWxsYmFjaywgY29udGV4dCksXG4gICAgICAgIGZvcmNlICAgICAgICA9IChjYWxsYmFjayA9PT0gdHJ1ZSksXG4gICAgICAgIGhhc1N1YnNjcmliZSA9IHRoaXMuX2NoYW5uZWxzLmhhc1N1YnNjcmlwdGlvbihjaGFubmVsKTtcblxuICAgIGlmIChoYXNTdWJzY3JpYmUgJiYgIWZvcmNlKSB7XG4gICAgICB0aGlzLl9jaGFubmVscy5zdWJzY3JpYmUoW2NoYW5uZWxdLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICBzdWJzY3JpcHRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbm5lY3QoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluZm8oJ0NsaWVudCA/IGF0dGVtcHRpbmcgdG8gc3Vic2NyaWJlIHRvID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBjaGFubmVsKTtcbiAgICAgIGlmICghZm9yY2UpIHRoaXMuX2NoYW5uZWxzLnN1YnNjcmliZShbY2hhbm5lbF0sIGNhbGxiYWNrLCBjb250ZXh0KTtcblxuICAgICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBjaGFubmVsOiAgICAgIEZheWUuQ2hhbm5lbC5TVUJTQ1JJQkUsXG4gICAgICAgIGNsaWVudElkOiAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCxcbiAgICAgICAgc3Vic2NyaXB0aW9uOiBjaGFubmVsXG5cbiAgICAgIH0sIHt9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICBzdWJzY3JpcHRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcsIEZheWUuRXJyb3IucGFyc2UocmVzcG9uc2UuZXJyb3IpKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHMudW5zdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoYW5uZWxzID0gW10uY29uY2F0KHJlc3BvbnNlLnN1YnNjcmlwdGlvbik7XG4gICAgICAgIHRoaXMuaW5mbygnU3Vic2NyaXB0aW9uIGFja25vd2xlZGdlZCBmb3IgPyB0byA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCwgY2hhbm5lbHMpO1xuICAgICAgICBzdWJzY3JpcHRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gICAgICAgICAgICAgICAgKiBzdWJzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICogY2xpZW50SWRcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3Vic2NyaXB0aW9uXG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICBNQVkgaW5jbHVkZTogICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGFkdmljZVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGltZXN0YW1wXG4gIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihjaGFubmVsLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmIChjaGFubmVsIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICByZXR1cm4gRmF5ZS5tYXAoY2hhbm5lbCwgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gdGhpcy51bnN1YnNjcmliZShjLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIHZhciBkZWFkID0gdGhpcy5fY2hhbm5lbHMudW5zdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIGlmICghZGVhZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5jb25uZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbmZvKCdDbGllbnQgPyBhdHRlbXB0aW5nIHRvIHVuc3Vic2NyaWJlIGZyb20gPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIGNoYW5uZWwpO1xuXG4gICAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWw6ICAgICAgRmF5ZS5DaGFubmVsLlVOU1VCU0NSSUJFLFxuICAgICAgICBjbGllbnRJZDogICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsXG4gICAgICAgIHN1YnNjcmlwdGlvbjogY2hhbm5lbFxuXG4gICAgICB9LCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzZnVsKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNoYW5uZWxzID0gW10uY29uY2F0KHJlc3BvbnNlLnN1YnNjcmlwdGlvbik7XG4gICAgICAgIHRoaXMuaW5mbygnVW5zdWJzY3JpcHRpb24gYWNrbm93bGVkZ2VkIGZvciA/IGZyb20gPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIGNoYW5uZWxzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBjbGllbnRJZCAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIHB1Ymxpc2g6IGZ1bmN0aW9uKGNoYW5uZWwsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICBGYXllLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zIHx8IHt9LCBbJ2F0dGVtcHRzJywgJ2RlYWRsaW5lJ10pO1xuICAgIHZhciBwdWJsaWNhdGlvbiA9IG5ldyBGYXllLlB1YmxpY2F0aW9uKCk7XG5cbiAgICB0aGlzLmNvbm5lY3QoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluZm8oJ0NsaWVudCA/IHF1ZXVlaW5nIHB1Ymxpc2hlZCBtZXNzYWdlIHRvID86ID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBjaGFubmVsLCBkYXRhKTtcblxuICAgICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBjaGFubmVsOiAgY2hhbm5lbCxcbiAgICAgICAgZGF0YTogICAgIGRhdGEsXG4gICAgICAgIGNsaWVudElkOiB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkXG5cbiAgICAgIH0sIG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzZnVsKVxuICAgICAgICAgIHB1YmxpY2F0aW9uLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHB1YmxpY2F0aW9uLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnLCBGYXllLkVycm9yLnBhcnNlKHJlc3BvbnNlLmVycm9yKSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiBwdWJsaWNhdGlvbjtcbiAgfSxcblxuICBfc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgbWVzc2FnZS5pZCA9IHRoaXMuX2dlbmVyYXRlTWVzc2FnZUlkKCk7XG5cbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX2FkdmljZS50aW1lb3V0XG4gICAgICAgICAgICAgICAgPyAxLjIgKiB0aGlzLl9hZHZpY2UudGltZW91dCAvIDEwMDBcbiAgICAgICAgICAgICAgICA6IDEuMiAqIHRoaXMuX2Rpc3BhdGNoZXIucmV0cnk7XG5cbiAgICB0aGlzLnBpcGVUaHJvdWdoRXh0ZW5zaW9ucygnb3V0Z29pbmcnLCBtZXNzYWdlLCBudWxsLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgIGlmIChjYWxsYmFjaykgdGhpcy5fcmVzcG9uc2VDYWxsYmFja3NbbWVzc2FnZS5pZF0gPSBbY2FsbGJhY2ssIGNvbnRleHRdO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hlci5zZW5kTWVzc2FnZShtZXNzYWdlLCB0aW1lb3V0LCBvcHRpb25zIHx8IHt9KTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2VuZXJhdGVNZXNzYWdlSWQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX21lc3NhZ2VJZCArPSAxO1xuICAgIGlmICh0aGlzLl9tZXNzYWdlSWQgPj0gTWF0aC5wb3coMiwzMikpIHRoaXMuX21lc3NhZ2VJZCA9IDA7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VJZC50b1N0cmluZygzNik7XG4gIH0sXG5cbiAgX3JlY2VpdmVNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgdmFyIGlkID0gbWVzc2FnZS5pZCwgY2FsbGJhY2s7XG5cbiAgICBpZiAobWVzc2FnZS5zdWNjZXNzZnVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5fcmVzcG9uc2VDYWxsYmFja3NbaWRdO1xuICAgICAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlQ2FsbGJhY2tzW2lkXTtcbiAgICB9XG5cbiAgICB0aGlzLnBpcGVUaHJvdWdoRXh0ZW5zaW9ucygnaW5jb21pbmcnLCBtZXNzYWdlLCBudWxsLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgIGlmIChtZXNzYWdlLmFkdmljZSkgdGhpcy5faGFuZGxlQWR2aWNlKG1lc3NhZ2UuYWR2aWNlKTtcbiAgICAgIHRoaXMuX2RlbGl2ZXJNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFja1swXS5jYWxsKGNhbGxiYWNrWzFdLCBtZXNzYWdlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfaGFuZGxlQWR2aWNlOiBmdW5jdGlvbihhZHZpY2UpIHtcbiAgICBGYXllLmV4dGVuZCh0aGlzLl9hZHZpY2UsIGFkdmljZSk7XG4gICAgdGhpcy5fZGlzcGF0Y2hlci50aW1lb3V0ID0gdGhpcy5fYWR2aWNlLnRpbWVvdXQgLyAxMDAwO1xuXG4gICAgaWYgKHRoaXMuX2FkdmljZS5yZWNvbm5lY3QgPT09IHRoaXMuSEFORFNIQUtFICYmIHRoaXMuX3N0YXRlICE9PSB0aGlzLkRJU0NPTk5FQ1RFRCkge1xuICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLlVOQ09OTkVDVEVEO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCA9IG51bGw7XG4gICAgICB0aGlzLl9jeWNsZUNvbm5lY3Rpb24oKTtcbiAgICB9XG4gIH0sXG5cbiAgX2RlbGl2ZXJNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlLmNoYW5uZWwgfHwgbWVzc2FnZS5kYXRhID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICB0aGlzLmluZm8oJ0NsaWVudCA/IGNhbGxpbmcgbGlzdGVuZXJzIGZvciA/IHdpdGggPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIG1lc3NhZ2UuY2hhbm5lbCwgbWVzc2FnZS5kYXRhKTtcbiAgICB0aGlzLl9jaGFubmVscy5kaXN0cmlidXRlTWVzc2FnZShtZXNzYWdlKTtcbiAgfSxcblxuICBfY3ljbGVDb25uZWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY29ubmVjdFJlcXVlc3QpIHtcbiAgICAgIHRoaXMuX2Nvbm5lY3RSZXF1ZXN0ID0gbnVsbDtcbiAgICAgIHRoaXMuaW5mbygnQ2xvc2VkIGNvbm5lY3Rpb24gZm9yID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIEZheWUuRU5WLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHNlbGYuY29ubmVjdCgpIH0sIHRoaXMuX2FkdmljZS5pbnRlcnZhbCk7XG4gIH1cbn0pO1xuXG5GYXllLmV4dGVuZChGYXllLkNsaWVudC5wcm90b3R5cGUsIEZheWUuRGVmZXJyYWJsZSk7XG5GYXllLmV4dGVuZChGYXllLkNsaWVudC5wcm90b3R5cGUsIEZheWUuUHVibGlzaGVyKTtcbkZheWUuZXh0ZW5kKEZheWUuQ2xpZW50LnByb3RvdHlwZSwgRmF5ZS5Mb2dnaW5nKTtcbkZheWUuZXh0ZW5kKEZheWUuQ2xpZW50LnByb3RvdHlwZSwgRmF5ZS5FeHRlbnNpYmxlKTtcblxuRmF5ZS5EaXNwYXRjaGVyID0gRmF5ZS5DbGFzcyh7XG4gIE1BWF9SRVFVRVNUX1NJWkU6IDIwNDgsXG4gIERFRkFVTFRfUkVUUlk6ICAgIDUsXG5cbiAgVVA6ICAgMSxcbiAgRE9XTjogMixcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihjbGllbnQsIGVuZHBvaW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5fY2xpZW50ICAgICA9IGNsaWVudDtcbiAgICB0aGlzLmVuZHBvaW50ICAgID0gRmF5ZS5VUkkucGFyc2UoZW5kcG9pbnQpO1xuICAgIHRoaXMuX2FsdGVybmF0ZXMgPSBvcHRpb25zLmVuZHBvaW50cyB8fCB7fTtcblxuICAgIHRoaXMuY29va2llcyAgICAgID0gRmF5ZS5Db29raWVzICYmIG5ldyBGYXllLkNvb2tpZXMuQ29va2llSmFyKCk7XG4gICAgdGhpcy5fZGlzYWJsZWQgICAgPSBbXTtcbiAgICB0aGlzLl9lbnZlbG9wZXMgICA9IHt9O1xuICAgIHRoaXMuaGVhZGVycyAgICAgID0ge307XG4gICAgdGhpcy5yZXRyeSAgICAgICAgPSBvcHRpb25zLnJldHJ5IHx8IHRoaXMuREVGQVVMVF9SRVRSWTtcbiAgICB0aGlzLl9zY2hlZHVsZXIgICA9IG9wdGlvbnMuc2NoZWR1bGVyIHx8IEZheWUuU2NoZWR1bGVyO1xuICAgIHRoaXMuX3N0YXRlICAgICAgID0gMDtcbiAgICB0aGlzLnRyYW5zcG9ydHMgICA9IHt9O1xuICAgIHRoaXMud3NFeHRlbnNpb25zID0gW107XG5cbiAgICB0aGlzLnByb3h5ID0gb3B0aW9ucy5wcm94eSB8fCB7fTtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3Byb3h5ID09PSAnc3RyaW5nJykgdGhpcy5fcHJveHkgPSB7b3JpZ2luOiB0aGlzLl9wcm94eX07XG5cbiAgICB2YXIgZXh0cyA9IG9wdGlvbnMud2Vic29ja2V0RXh0ZW5zaW9ucztcbiAgICBpZiAoZXh0cykge1xuICAgICAgZXh0cyA9IFtdLmNvbmNhdChleHRzKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gZXh0cy5sZW5ndGg7IGkgPCBuOyBpKyspXG4gICAgICAgIHRoaXMuYWRkV2Vic29ja2V0RXh0ZW5zaW9uKGV4dHNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMudGxzID0gb3B0aW9ucy50bHMgfHwge307XG4gICAgdGhpcy50bHMuY2EgPSB0aGlzLnRscy5jYSB8fCBvcHRpb25zLmNhO1xuXG4gICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLl9hbHRlcm5hdGVzKVxuICAgICAgdGhpcy5fYWx0ZXJuYXRlc1t0eXBlXSA9IEZheWUuVVJJLnBhcnNlKHRoaXMuX2FsdGVybmF0ZXNbdHlwZV0pO1xuXG4gICAgdGhpcy5tYXhSZXF1ZXN0U2l6ZSA9IHRoaXMuTUFYX1JFUVVFU1RfU0laRTtcbiAgfSxcblxuICBlbmRwb2ludEZvcjogZnVuY3Rpb24oY29ubmVjdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fYWx0ZXJuYXRlc1tjb25uZWN0aW9uVHlwZV0gfHwgdGhpcy5lbmRwb2ludDtcbiAgfSxcblxuICBhZGRXZWJzb2NrZXRFeHRlbnNpb246IGZ1bmN0aW9uKGV4dGVuc2lvbikge1xuICAgIHRoaXMud3NFeHRlbnNpb25zLnB1c2goZXh0ZW5zaW9uKTtcbiAgfSxcblxuICBkaXNhYmxlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQucHVzaChmZWF0dXJlKTtcbiAgfSxcblxuICBzZXRIZWFkZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0cmFuc3BvcnQgPSB0aGlzLl90cmFuc3BvcnQ7XG4gICAgZGVsZXRlIHRoaXMuX3RyYW5zcG9ydDtcbiAgICBpZiAodHJhbnNwb3J0KSB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgfSxcblxuICBnZXRDb25uZWN0aW9uVHlwZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBGYXllLlRyYW5zcG9ydC5nZXRDb25uZWN0aW9uVHlwZXMoKTtcbiAgfSxcblxuICBzZWxlY3RUcmFuc3BvcnQ6IGZ1bmN0aW9uKHRyYW5zcG9ydFR5cGVzKSB7XG4gICAgRmF5ZS5UcmFuc3BvcnQuZ2V0KHRoaXMsIHRyYW5zcG9ydFR5cGVzLCB0aGlzLl9kaXNhYmxlZCwgZnVuY3Rpb24odHJhbnNwb3J0KSB7XG4gICAgICB0aGlzLmRlYnVnKCdTZWxlY3RlZCA/IHRyYW5zcG9ydCBmb3IgPycsIHRyYW5zcG9ydC5jb25uZWN0aW9uVHlwZSwgRmF5ZS5VUkkuc3RyaW5naWZ5KHRyYW5zcG9ydC5lbmRwb2ludCkpO1xuXG4gICAgICBpZiAodHJhbnNwb3J0ID09PSB0aGlzLl90cmFuc3BvcnQpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLl90cmFuc3BvcnQpIHRoaXMuX3RyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgICB0aGlzLl90cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gdHJhbnNwb3J0LmNvbm5lY3Rpb25UeXBlO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIHNlbmRNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlLCB0aW1lb3V0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgaWQgICAgICAgPSBtZXNzYWdlLmlkLFxuICAgICAgICBhdHRlbXB0cyA9IG9wdGlvbnMuYXR0ZW1wdHMsXG4gICAgICAgIGRlYWRsaW5lID0gb3B0aW9ucy5kZWFkbGluZSAmJiBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIChvcHRpb25zLmRlYWRsaW5lICogMTAwMCksXG4gICAgICAgIGVudmVsb3BlID0gdGhpcy5fZW52ZWxvcGVzW2lkXSxcbiAgICAgICAgc2NoZWR1bGVyO1xuXG4gICAgaWYgKCFlbnZlbG9wZSkge1xuICAgICAgc2NoZWR1bGVyID0gbmV3IHRoaXMuX3NjaGVkdWxlcihtZXNzYWdlLCB7dGltZW91dDogdGltZW91dCwgaW50ZXJ2YWw6IHRoaXMucmV0cnksIGF0dGVtcHRzOiBhdHRlbXB0cywgZGVhZGxpbmU6IGRlYWRsaW5lfSk7XG4gICAgICBlbnZlbG9wZSAgPSB0aGlzLl9lbnZlbG9wZXNbaWRdID0ge21lc3NhZ2U6IG1lc3NhZ2UsIHNjaGVkdWxlcjogc2NoZWR1bGVyfTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZW5kRW52ZWxvcGUoZW52ZWxvcGUpO1xuICB9LFxuXG4gIF9zZW5kRW52ZWxvcGU6IGZ1bmN0aW9uKGVudmVsb3BlKSB7XG4gICAgaWYgKCF0aGlzLl90cmFuc3BvcnQpIHJldHVybjtcbiAgICBpZiAoZW52ZWxvcGUucmVxdWVzdCB8fCBlbnZlbG9wZS50aW1lcikgcmV0dXJuO1xuXG4gICAgdmFyIG1lc3NhZ2UgICA9IGVudmVsb3BlLm1lc3NhZ2UsXG4gICAgICAgIHNjaGVkdWxlciA9IGVudmVsb3BlLnNjaGVkdWxlcixcbiAgICAgICAgc2VsZiAgICAgID0gdGhpcztcblxuICAgIGlmICghc2NoZWR1bGVyLmlzRGVsaXZlcmFibGUoKSkge1xuICAgICAgc2NoZWR1bGVyLmFib3J0KCk7XG4gICAgICBkZWxldGUgdGhpcy5fZW52ZWxvcGVzW21lc3NhZ2UuaWRdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVudmVsb3BlLnRpbWVyID0gRmF5ZS5FTlYuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuaGFuZGxlRXJyb3IobWVzc2FnZSk7XG4gICAgfSwgc2NoZWR1bGVyLmdldFRpbWVvdXQoKSAqIDEwMDApO1xuXG4gICAgc2NoZWR1bGVyLnNlbmQoKTtcbiAgICBlbnZlbG9wZS5yZXF1ZXN0ID0gdGhpcy5fdHJhbnNwb3J0LnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9LFxuXG4gIGhhbmRsZVJlc3BvbnNlOiBmdW5jdGlvbihyZXBseSkge1xuICAgIHZhciBlbnZlbG9wZSA9IHRoaXMuX2VudmVsb3Blc1tyZXBseS5pZF07XG5cbiAgICBpZiAocmVwbHkuc3VjY2Vzc2Z1bCAhPT0gdW5kZWZpbmVkICYmIGVudmVsb3BlKSB7XG4gICAgICBlbnZlbG9wZS5zY2hlZHVsZXIuc3VjY2VlZCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2VudmVsb3Blc1tyZXBseS5pZF07XG4gICAgICBGYXllLkVOVi5jbGVhclRpbWVvdXQoZW52ZWxvcGUudGltZXIpO1xuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcignbWVzc2FnZScsIHJlcGx5KTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gdGhpcy5VUCkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5VUDtcbiAgICB0aGlzLl9jbGllbnQudHJpZ2dlcigndHJhbnNwb3J0OnVwJyk7XG4gIH0sXG5cbiAgaGFuZGxlRXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UsIGltbWVkaWF0ZSkge1xuICAgIHZhciBlbnZlbG9wZSA9IHRoaXMuX2VudmVsb3Blc1ttZXNzYWdlLmlkXSxcbiAgICAgICAgcmVxdWVzdCAgPSBlbnZlbG9wZSAmJiBlbnZlbG9wZS5yZXF1ZXN0LFxuICAgICAgICBzZWxmICAgICA9IHRoaXM7XG5cbiAgICBpZiAoIXJlcXVlc3QpIHJldHVybjtcblxuICAgIHJlcXVlc3QudGhlbihmdW5jdGlvbihyZXEpIHtcbiAgICAgIGlmIChyZXEgJiYgcmVxLmFib3J0KSByZXEuYWJvcnQoKTtcbiAgICB9KTtcblxuICAgIHZhciBzY2hlZHVsZXIgPSBlbnZlbG9wZS5zY2hlZHVsZXI7XG4gICAgc2NoZWR1bGVyLmZhaWwoKTtcblxuICAgIEZheWUuRU5WLmNsZWFyVGltZW91dChlbnZlbG9wZS50aW1lcik7XG4gICAgZW52ZWxvcGUucmVxdWVzdCA9IGVudmVsb3BlLnRpbWVyID0gbnVsbDtcblxuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIHRoaXMuX3NlbmRFbnZlbG9wZShlbnZlbG9wZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudmVsb3BlLnRpbWVyID0gRmF5ZS5FTlYuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgZW52ZWxvcGUudGltZXIgPSBudWxsO1xuICAgICAgICBzZWxmLl9zZW5kRW52ZWxvcGUoZW52ZWxvcGUpO1xuICAgICAgfSwgc2NoZWR1bGVyLmdldEludGVydmFsKCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IHRoaXMuRE9XTikgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5ET1dOO1xuICAgIHRoaXMuX2NsaWVudC50cmlnZ2VyKCd0cmFuc3BvcnQ6ZG93bicpO1xuICB9XG59KTtcblxuRmF5ZS5leHRlbmQoRmF5ZS5EaXNwYXRjaGVyLnByb3RvdHlwZSwgRmF5ZS5QdWJsaXNoZXIpO1xuRmF5ZS5leHRlbmQoRmF5ZS5EaXNwYXRjaGVyLnByb3RvdHlwZSwgRmF5ZS5Mb2dnaW5nKTtcblxuRmF5ZS5TY2hlZHVsZXIgPSBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zKSB7XG4gIHRoaXMubWVzc2FnZSAgPSBtZXNzYWdlO1xuICB0aGlzLm9wdGlvbnMgID0gb3B0aW9ucztcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuXG5GYXllLmV4dGVuZChGYXllLlNjaGVkdWxlci5wcm90b3R5cGUsIHtcbiAgZ2V0VGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lb3V0O1xuICB9LFxuXG4gIGdldEludGVydmFsOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmludGVydmFsO1xuICB9LFxuXG4gIGlzRGVsaXZlcmFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdHRlbXB0cyA9IHRoaXMub3B0aW9ucy5hdHRlbXB0cyxcbiAgICAgICAgbWFkZSAgICAgPSB0aGlzLmF0dGVtcHRzLFxuICAgICAgICBkZWFkbGluZSA9IHRoaXMub3B0aW9ucy5kZWFkbGluZSxcbiAgICAgICAgbm93ICAgICAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIGlmIChhdHRlbXB0cyAhPT0gdW5kZWZpbmVkICYmIG1hZGUgPj0gYXR0ZW1wdHMpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoZGVhZGxpbmUgIT09IHVuZGVmaW5lZCAmJiBub3cgPiBkZWFkbGluZSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHNlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYXR0ZW1wdHMgKz0gMTtcbiAgfSxcblxuICBzdWNjZWVkOiBmdW5jdGlvbigpIHt9LFxuXG4gIGZhaWw6IGZ1bmN0aW9uKCkge30sXG5cbiAgYWJvcnQ6IGZ1bmN0aW9uKCkge31cbn0pO1xuXG5GYXllLlRyYW5zcG9ydCA9IEZheWUuZXh0ZW5kKEZheWUuQ2xhc3Moe1xuICBERUZBVUxUX1BPUlRTOiAgICB7J2h0dHA6JzogODAsICdodHRwczonOiA0NDMsICd3czonOiA4MCwgJ3dzczonOiA0NDN9LFxuICBTRUNVUkVfUFJPVE9DT0xTOiBbJ2h0dHBzOicsICd3c3M6J10sXG4gIE1BWF9ERUxBWTogICAgICAgIDAsXG5cbiAgYmF0Y2hpbmc6ICB0cnVlLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50KSB7XG4gICAgdGhpcy5fZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG4gICAgdGhpcy5lbmRwb2ludCAgICA9IGVuZHBvaW50O1xuICAgIHRoaXMuX291dGJveCAgICAgPSBbXTtcbiAgICB0aGlzLl9wcm94eSAgICAgID0gRmF5ZS5leHRlbmQoe30sIHRoaXMuX2Rpc3BhdGNoZXIucHJveHkpO1xuXG4gICAgaWYgKCF0aGlzLl9wcm94eS5vcmlnaW4gJiYgRmF5ZS5Ob2RlQWRhcHRlcikge1xuICAgICAgdGhpcy5fcHJveHkub3JpZ2luID0gRmF5ZS5pbmRleE9mKHRoaXMuU0VDVVJFX1BST1RPQ09MUywgdGhpcy5lbmRwb2ludC5wcm90b2NvbCkgPj0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgID8gKHByb2Nlc3MuZW52LkhUVFBTX1BST1hZIHx8IHByb2Nlc3MuZW52Lmh0dHBzX3Byb3h5KVxuICAgICAgICAgICAgICAgICAgICAgICAgIDogKHByb2Nlc3MuZW52LkhUVFBfUFJPWFkgIHx8IHByb2Nlc3MuZW52Lmh0dHBfcHJveHkpO1xuICAgIH1cbiAgfSxcblxuICBjbG9zZTogZnVuY3Rpb24oKSB7fSxcblxuICBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuICcnO1xuICB9LFxuXG4gIHNlbmRNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgdGhpcy5kZWJ1ZygnQ2xpZW50ID8gc2VuZGluZyBtZXNzYWdlIHRvID86ID8nLFxuICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCwgRmF5ZS5VUkkuc3RyaW5naWZ5KHRoaXMuZW5kcG9pbnQpLCBtZXNzYWdlKTtcblxuICAgIGlmICghdGhpcy5iYXRjaGluZykgcmV0dXJuIEZheWUuUHJvbWlzZS5mdWxmaWxsZWQodGhpcy5yZXF1ZXN0KFttZXNzYWdlXSkpO1xuXG4gICAgdGhpcy5fb3V0Ym94LnB1c2gobWVzc2FnZSk7XG4gICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UgfHwgbmV3IEZheWUuUHJvbWlzZSgpO1xuICAgIHRoaXMuX2ZsdXNoTGFyZ2VCYXRjaCgpO1xuXG4gICAgaWYgKG1lc3NhZ2UuY2hhbm5lbCA9PT0gRmF5ZS5DaGFubmVsLkhBTkRTSEFLRSkge1xuICAgICAgdGhpcy5hZGRUaW1lb3V0KCdwdWJsaXNoJywgMC4wMSwgdGhpcy5fZmx1c2gsIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuXG4gICAgaWYgKG1lc3NhZ2UuY2hhbm5lbCA9PT0gRmF5ZS5DaGFubmVsLkNPTk5FQ1QpXG4gICAgICB0aGlzLl9jb25uZWN0TWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICB0aGlzLmFkZFRpbWVvdXQoJ3B1Ymxpc2gnLCB0aGlzLk1BWF9ERUxBWSwgdGhpcy5fZmx1c2gsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICB9LFxuXG4gIF9mbHVzaDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVUaW1lb3V0KCdwdWJsaXNoJyk7XG5cbiAgICBpZiAodGhpcy5fb3V0Ym94Lmxlbmd0aCA+IDEgJiYgdGhpcy5fY29ubmVjdE1lc3NhZ2UpXG4gICAgICB0aGlzLl9jb25uZWN0TWVzc2FnZS5hZHZpY2UgPSB7dGltZW91dDogMH07XG5cbiAgICBGYXllLlByb21pc2UuZnVsZmlsbCh0aGlzLl9wcm9taXNlLCB0aGlzLnJlcXVlc3QodGhpcy5fb3V0Ym94KSk7XG4gICAgZGVsZXRlIHRoaXMuX3Byb21pc2U7XG5cbiAgICB0aGlzLl9jb25uZWN0TWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5fb3V0Ym94ID0gW107XG4gIH0sXG5cbiAgX2ZsdXNoTGFyZ2VCYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZyA9IHRoaXMuZW5jb2RlKHRoaXMuX291dGJveCk7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPCB0aGlzLl9kaXNwYXRjaGVyLm1heFJlcXVlc3RTaXplKSByZXR1cm47XG4gICAgdmFyIGxhc3QgPSB0aGlzLl9vdXRib3gucG9wKCk7XG4gICAgdGhpcy5fZmx1c2goKTtcbiAgICBpZiAobGFzdCkgdGhpcy5fb3V0Ym94LnB1c2gobGFzdCk7XG4gIH0sXG5cbiAgX3JlY2VpdmU6IGZ1bmN0aW9uKHJlcGxpZXMpIHtcbiAgICBpZiAoIXJlcGxpZXMpIHJldHVybjtcbiAgICByZXBsaWVzID0gW10uY29uY2F0KHJlcGxpZXMpO1xuXG4gICAgdGhpcy5kZWJ1ZygnQ2xpZW50ID8gcmVjZWl2ZWQgZnJvbSA/IHZpYSA/OiA/JyxcbiAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIEZheWUuVVJJLnN0cmluZ2lmeSh0aGlzLmVuZHBvaW50KSwgdGhpcy5jb25uZWN0aW9uVHlwZSwgcmVwbGllcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHJlcGxpZXMubGVuZ3RoOyBpIDwgbjsgaSsrKVxuICAgICAgdGhpcy5fZGlzcGF0Y2hlci5oYW5kbGVSZXNwb25zZShyZXBsaWVzW2ldKTtcbiAgfSxcblxuICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2VzLCBpbW1lZGlhdGUpIHtcbiAgICBtZXNzYWdlcyA9IFtdLmNvbmNhdChtZXNzYWdlcyk7XG5cbiAgICB0aGlzLmRlYnVnKCdDbGllbnQgPyBmYWlsZWQgdG8gc2VuZCB0byA/IHZpYSA/OiA/JyxcbiAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIEZheWUuVVJJLnN0cmluZ2lmeSh0aGlzLmVuZHBvaW50KSwgdGhpcy5jb25uZWN0aW9uVHlwZSwgbWVzc2FnZXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBtZXNzYWdlcy5sZW5ndGg7IGkgPCBuOyBpKyspXG4gICAgICB0aGlzLl9kaXNwYXRjaGVyLmhhbmRsZUVycm9yKG1lc3NhZ2VzW2ldKTtcbiAgfSxcblxuICBfZ2V0Q29va2llczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvb2tpZXMgPSB0aGlzLl9kaXNwYXRjaGVyLmNvb2tpZXMsXG4gICAgICAgIHVybCAgICAgPSBGYXllLlVSSS5zdHJpbmdpZnkodGhpcy5lbmRwb2ludCk7XG5cbiAgICBpZiAoIWNvb2tpZXMpIHJldHVybiAnJztcblxuICAgIHJldHVybiBGYXllLm1hcChjb29raWVzLmdldENvb2tpZXNTeW5jKHVybCksIGZ1bmN0aW9uKGNvb2tpZSkge1xuICAgICAgcmV0dXJuIGNvb2tpZS5jb29raWVTdHJpbmcoKTtcbiAgICB9KS5qb2luKCc7ICcpO1xuICB9LFxuXG4gIF9zdG9yZUNvb2tpZXM6IGZ1bmN0aW9uKHNldENvb2tpZSkge1xuICAgIHZhciBjb29raWVzID0gdGhpcy5fZGlzcGF0Y2hlci5jb29raWVzLFxuICAgICAgICB1cmwgICAgID0gRmF5ZS5VUkkuc3RyaW5naWZ5KHRoaXMuZW5kcG9pbnQpLFxuICAgICAgICBjb29raWU7XG5cbiAgICBpZiAoIXNldENvb2tpZSB8fCAhY29va2llcykgcmV0dXJuO1xuICAgIHNldENvb2tpZSA9IFtdLmNvbmNhdChzZXRDb29raWUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBzZXRDb29raWUubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjb29raWUgPSBGYXllLkNvb2tpZXMuQ29va2llLnBhcnNlKHNldENvb2tpZVtpXSk7XG4gICAgICBjb29raWVzLnNldENvb2tpZVN5bmMoY29va2llLCB1cmwpO1xuICAgIH1cbiAgfVxuXG59KSwge1xuICBnZXQ6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGFsbG93ZWQsIGRpc2FibGVkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBlbmRwb2ludCA9IGRpc3BhdGNoZXIuZW5kcG9pbnQ7XG5cbiAgICBGYXllLmFzeW5jRWFjaCh0aGlzLl90cmFuc3BvcnRzLCBmdW5jdGlvbihwYWlyLCByZXN1bWUpIHtcbiAgICAgIHZhciBjb25uVHlwZSAgICAgPSBwYWlyWzBdLCBrbGFzcyA9IHBhaXJbMV0sXG4gICAgICAgICAgY29ubkVuZHBvaW50ID0gZGlzcGF0Y2hlci5lbmRwb2ludEZvcihjb25uVHlwZSk7XG5cbiAgICAgIGlmIChGYXllLmluZGV4T2YoZGlzYWJsZWQsIGNvbm5UeXBlKSA+PSAwKVxuICAgICAgICByZXR1cm4gcmVzdW1lKCk7XG5cbiAgICAgIGlmIChGYXllLmluZGV4T2YoYWxsb3dlZCwgY29ublR5cGUpIDwgMCkge1xuICAgICAgICBrbGFzcy5pc1VzYWJsZShkaXNwYXRjaGVyLCBjb25uRW5kcG9pbnQsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICByZXR1cm4gcmVzdW1lKCk7XG4gICAgICB9XG5cbiAgICAgIGtsYXNzLmlzVXNhYmxlKGRpc3BhdGNoZXIsIGNvbm5FbmRwb2ludCwgZnVuY3Rpb24oaXNVc2FibGUpIHtcbiAgICAgICAgaWYgKCFpc1VzYWJsZSkgcmV0dXJuIHJlc3VtZSgpO1xuICAgICAgICB2YXIgdHJhbnNwb3J0ID0ga2xhc3MuaGFzT3duUHJvcGVydHkoJ2NyZWF0ZScpID8ga2xhc3MuY3JlYXRlKGRpc3BhdGNoZXIsIGNvbm5FbmRwb2ludCkgOiBuZXcga2xhc3MoZGlzcGF0Y2hlciwgY29ubkVuZHBvaW50KTtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB0cmFuc3BvcnQpO1xuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGEgdXNhYmxlIGNvbm5lY3Rpb24gdHlwZSBmb3IgJyArIEZheWUuVVJJLnN0cmluZ2lmeShlbmRwb2ludCkpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlZ2lzdGVyOiBmdW5jdGlvbih0eXBlLCBrbGFzcykge1xuICAgIHRoaXMuX3RyYW5zcG9ydHMucHVzaChbdHlwZSwga2xhc3NdKTtcbiAgICBrbGFzcy5wcm90b3R5cGUuY29ubmVjdGlvblR5cGUgPSB0eXBlO1xuICB9LFxuXG4gIGdldENvbm5lY3Rpb25UeXBlczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEZheWUubWFwKHRoaXMuX3RyYW5zcG9ydHMsIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIHRbMF0gfSk7XG4gIH0sXG5cbiAgX3RyYW5zcG9ydHM6IFtdXG59KTtcblxuRmF5ZS5leHRlbmQoRmF5ZS5UcmFuc3BvcnQucHJvdG90eXBlLCBGYXllLkxvZ2dpbmcpO1xuRmF5ZS5leHRlbmQoRmF5ZS5UcmFuc3BvcnQucHJvdG90eXBlLCBGYXllLlRpbWVvdXRzKTtcblxuRmF5ZS5FdmVudCA9IHtcbiAgX3JlZ2lzdHJ5OiBbXSxcblxuICBvbjogZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciB3cmFwcGVkID0gZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCkgfTtcblxuICAgIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkLCBmYWxzZSk7XG4gICAgZWxzZVxuICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCB3cmFwcGVkKTtcblxuICAgIHRoaXMuX3JlZ2lzdHJ5LnB1c2goe1xuICAgICAgX2VsZW1lbnQ6ICAgZWxlbWVudCxcbiAgICAgIF90eXBlOiAgICAgIGV2ZW50TmFtZSxcbiAgICAgIF9jYWxsYmFjazogIGNhbGxiYWNrLFxuICAgICAgX2NvbnRleHQ6ICAgICBjb250ZXh0LFxuICAgICAgX2hhbmRsZXI6ICAgd3JhcHBlZFxuICAgIH0pO1xuICB9LFxuXG4gIGRldGFjaDogZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBpID0gdGhpcy5fcmVnaXN0cnkubGVuZ3RoLCByZWdpc3RlcjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICByZWdpc3RlciA9IHRoaXMuX3JlZ2lzdHJ5W2ldO1xuXG4gICAgICBpZiAoKGVsZW1lbnQgICAgJiYgZWxlbWVudCAgICAhPT0gcmVnaXN0ZXIuX2VsZW1lbnQpICAgfHxcbiAgICAgICAgICAoZXZlbnROYW1lICAmJiBldmVudE5hbWUgICE9PSByZWdpc3Rlci5fdHlwZSkgICAgICB8fFxuICAgICAgICAgIChjYWxsYmFjayAgICYmIGNhbGxiYWNrICAgIT09IHJlZ2lzdGVyLl9jYWxsYmFjaykgIHx8XG4gICAgICAgICAgKGNvbnRleHQgICAgICAmJiBjb250ZXh0ICAgICAgIT09IHJlZ2lzdGVyLl9jb250ZXh0KSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChyZWdpc3Rlci5fZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgICByZWdpc3Rlci5fZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHJlZ2lzdGVyLl90eXBlLCByZWdpc3Rlci5faGFuZGxlciwgZmFsc2UpO1xuICAgICAgZWxzZVxuICAgICAgICByZWdpc3Rlci5fZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgcmVnaXN0ZXIuX3R5cGUsIHJlZ2lzdGVyLl9oYW5kbGVyKTtcblxuICAgICAgdGhpcy5fcmVnaXN0cnkuc3BsaWNlKGksMSk7XG4gICAgICByZWdpc3RlciA9IG51bGw7XG4gICAgfVxuICB9XG59O1xuXG5pZiAoRmF5ZS5FTlYub251bmxvYWQgIT09IHVuZGVmaW5lZCkgRmF5ZS5FdmVudC5vbihGYXllLkVOViwgJ3VubG9hZCcsIEZheWUuRXZlbnQuZGV0YWNoLCBGYXllLkV2ZW50KTtcblxuLypcbiAgICBqc29uMi5qc1xuICAgIDIwMTMtMDUtMjZcblxuICAgIFB1YmxpYyBEb21haW4uXG5cbiAgICBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG5cbiAgICBTZWUgaHR0cDovL3d3dy5KU09OLm9yZy9qcy5odG1sXG5cblxuICAgIFRoaXMgY29kZSBzaG91bGQgYmUgbWluaWZpZWQgYmVmb3JlIGRlcGxveW1lbnQuXG4gICAgU2VlIGh0dHA6Ly9qYXZhc2NyaXB0LmNyb2NrZm9yZC5jb20vanNtaW4uaHRtbFxuXG4gICAgVVNFIFlPVVIgT1dOIENPUFkuIElUIElTIEVYVFJFTUVMWSBVTldJU0UgVE8gTE9BRCBDT0RFIEZST00gU0VSVkVSUyBZT1UgRE9cbiAgICBOT1QgQ09OVFJPTC5cblxuXG4gICAgVGhpcyBmaWxlIGNyZWF0ZXMgYSBnbG9iYWwgSlNPTiBvYmplY3QgY29udGFpbmluZyB0d28gbWV0aG9kczogc3RyaW5naWZ5XG4gICAgYW5kIHBhcnNlLlxuXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlLCByZXBsYWNlciwgc3BhY2UpXG4gICAgICAgICAgICB2YWx1ZSAgICAgICBhbnkgSmF2YVNjcmlwdCB2YWx1ZSwgdXN1YWxseSBhbiBvYmplY3Qgb3IgYXJyYXkuXG5cbiAgICAgICAgICAgIHJlcGxhY2VyICAgIGFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IGRldGVybWluZXMgaG93IG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIGFyZSBzdHJpbmdpZmllZCBmb3Igb2JqZWN0cy4gSXQgY2FuIGJlIGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MuXG5cbiAgICAgICAgICAgIHNwYWNlICAgICAgIGFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mIG5lc3RlZCBzdHJ1Y3R1cmVzLiBJZiBpdCBpcyBvbWl0dGVkLCB0aGUgdGV4dCB3aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICBiZSBwYWNrZWQgd2l0aG91dCBleHRyYSB3aGl0ZXNwYWNlLiBJZiBpdCBpcyBhIG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0IHdpbGwgc3BlY2lmeSB0aGUgbnVtYmVyIG9mIHNwYWNlcyB0byBpbmRlbnQgYXQgZWFjaFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwuIElmIGl0IGlzIGEgc3RyaW5nIChzdWNoIGFzICdcXHQnIG9yICcmbmJzcDsnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0IGNvbnRhaW5zIHRoZSBjaGFyYWN0ZXJzIHVzZWQgdG8gaW5kZW50IGF0IGVhY2ggbGV2ZWwuXG5cbiAgICAgICAgICAgIFRoaXMgbWV0aG9kIHByb2R1Y2VzIGEgSlNPTiB0ZXh0IGZyb20gYSBKYXZhU2NyaXB0IHZhbHVlLlxuXG4gICAgICAgICAgICBXaGVuIGFuIG9iamVjdCB2YWx1ZSBpcyBmb3VuZCwgaWYgdGhlIG9iamVjdCBjb250YWlucyBhIHRvSlNPTlxuICAgICAgICAgICAgbWV0aG9kLCBpdHMgdG9KU09OIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhbmQgdGhlIHJlc3VsdCB3aWxsIGJlXG4gICAgICAgICAgICBzdHJpbmdpZmllZC4gQSB0b0pTT04gbWV0aG9kIGRvZXMgbm90IHNlcmlhbGl6ZTogaXQgcmV0dXJucyB0aGVcbiAgICAgICAgICAgIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBuYW1lL3ZhbHVlIHBhaXIgdGhhdCBzaG91bGQgYmUgc2VyaWFsaXplZCxcbiAgICAgICAgICAgIG9yIHVuZGVmaW5lZCBpZiBub3RoaW5nIHNob3VsZCBiZSBzZXJpYWxpemVkLiBUaGUgdG9KU09OIG1ldGhvZFxuICAgICAgICAgICAgd2lsbCBiZSBwYXNzZWQgdGhlIGtleSBhc3NvY2lhdGVkIHdpdGggdGhlIHZhbHVlLCBhbmQgdGhpcyB3aWxsIGJlXG4gICAgICAgICAgICBib3VuZCB0byB0aGUgdmFsdWVcblxuICAgICAgICAgICAgRm9yIGV4YW1wbGUsIHRoaXMgd291bGQgc2VyaWFsaXplIERhdGVzIGFzIElTTyBzdHJpbmdzLlxuXG4gICAgICAgICAgICAgICAgRGF0ZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBmKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm1hdCBpbnRlZ2VycyB0byBoYXZlIGF0IGxlYXN0IHR3byBkaWdpdHMuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVVENGdWxsWWVhcigpICAgKyAnLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENNb250aCgpICsgMSkgKyAnLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENEYXRlKCkpICAgICAgKyAnVCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENIb3VycygpKSAgICAgKyAnOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENNaW51dGVzKCkpICAgKyAnOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENTZWNvbmRzKCkpICAgKyAnWic7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsIHJlcGxhY2VyIG1ldGhvZC4gSXQgd2lsbCBiZSBwYXNzZWQgdGhlXG4gICAgICAgICAgICBrZXkgYW5kIHZhbHVlIG9mIGVhY2ggbWVtYmVyLCB3aXRoIHRoaXMgYm91bmQgdG8gdGhlIGNvbnRhaW5pbmdcbiAgICAgICAgICAgIG9iamVjdC4gVGhlIHZhbHVlIHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB5b3VyIG1ldGhvZCB3aWxsIGJlXG4gICAgICAgICAgICBzZXJpYWxpemVkLiBJZiB5b3VyIG1ldGhvZCByZXR1cm5zIHVuZGVmaW5lZCwgdGhlbiB0aGUgbWVtYmVyIHdpbGxcbiAgICAgICAgICAgIGJlIGV4Y2x1ZGVkIGZyb20gdGhlIHNlcmlhbGl6YXRpb24uXG5cbiAgICAgICAgICAgIElmIHRoZSByZXBsYWNlciBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncywgdGhlbiBpdCB3aWxsIGJlXG4gICAgICAgICAgICB1c2VkIHRvIHNlbGVjdCB0aGUgbWVtYmVycyB0byBiZSBzZXJpYWxpemVkLiBJdCBmaWx0ZXJzIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBzdWNoIHRoYXQgb25seSBtZW1iZXJzIHdpdGgga2V5cyBsaXN0ZWQgaW4gdGhlIHJlcGxhY2VyIGFycmF5IGFyZVxuICAgICAgICAgICAgc3RyaW5naWZpZWQuXG5cbiAgICAgICAgICAgIFZhbHVlcyB0aGF0IGRvIG5vdCBoYXZlIEpTT04gcmVwcmVzZW50YXRpb25zLCBzdWNoIGFzIHVuZGVmaW5lZCBvclxuICAgICAgICAgICAgZnVuY3Rpb25zLCB3aWxsIG5vdCBiZSBzZXJpYWxpemVkLiBTdWNoIHZhbHVlcyBpbiBvYmplY3RzIHdpbGwgYmVcbiAgICAgICAgICAgIGRyb3BwZWQ7IGluIGFycmF5cyB0aGV5IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBudWxsLiBZb3UgY2FuIHVzZVxuICAgICAgICAgICAgYSByZXBsYWNlciBmdW5jdGlvbiB0byByZXBsYWNlIHRob3NlIHdpdGggSlNPTiB2YWx1ZXMuXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh1bmRlZmluZWQpIHJldHVybnMgdW5kZWZpbmVkLlxuXG4gICAgICAgICAgICBUaGUgb3B0aW9uYWwgc3BhY2UgcGFyYW1ldGVyIHByb2R1Y2VzIGEgc3RyaW5naWZpY2F0aW9uIG9mIHRoZVxuICAgICAgICAgICAgdmFsdWUgdGhhdCBpcyBmaWxsZWQgd2l0aCBsaW5lIGJyZWFrcyBhbmQgaW5kZW50YXRpb24gdG8gbWFrZSBpdFxuICAgICAgICAgICAgZWFzaWVyIHRvIHJlYWQuXG5cbiAgICAgICAgICAgIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBub24tZW1wdHkgc3RyaW5nLCB0aGVuIHRoYXQgc3RyaW5nIHdpbGxcbiAgICAgICAgICAgIGJlIHVzZWQgZm9yIGluZGVudGF0aW9uLiBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLCB0aGVuXG4gICAgICAgICAgICB0aGUgaW5kZW50YXRpb24gd2lsbCBiZSB0aGF0IG1hbnkgc3BhY2VzLlxuXG4gICAgICAgICAgICBFeGFtcGxlOlxuXG4gICAgICAgICAgICB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoWydlJywge3BsdXJpYnVzOiAndW51bSd9XSk7XG4gICAgICAgICAgICAvLyB0ZXh0IGlzICdbXCJlXCIse1wicGx1cmlidXNcIjpcInVudW1cIn1dJ1xuXG5cbiAgICAgICAgICAgIHRleHQgPSBKU09OLnN0cmluZ2lmeShbJ2UnLCB7cGx1cmlidXM6ICd1bnVtJ31dLCBudWxsLCAnXFx0Jyk7XG4gICAgICAgICAgICAvLyB0ZXh0IGlzICdbXFxuXFx0XCJlXCIsXFxuXFx0e1xcblxcdFxcdFwicGx1cmlidXNcIjogXCJ1bnVtXCJcXG5cXHR9XFxuXSdcblxuICAgICAgICAgICAgdGV4dCA9IEpTT04uc3RyaW5naWZ5KFtuZXcgRGF0ZSgpXSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1trZXldIGluc3RhbmNlb2YgRGF0ZSA/XG4gICAgICAgICAgICAgICAgICAgICdEYXRlKCcgKyB0aGlzW2tleV0gKyAnKScgOiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gdGV4dCBpcyAnW1wiRGF0ZSgtLS1jdXJyZW50IHRpbWUtLS0pXCJdJ1xuXG5cbiAgICAgICAgSlNPTi5wYXJzZSh0ZXh0LCByZXZpdmVyKVxuICAgICAgICAgICAgVGhpcyBtZXRob2QgcGFyc2VzIGEgSlNPTiB0ZXh0IHRvIHByb2R1Y2UgYW4gb2JqZWN0IG9yIGFycmF5LlxuICAgICAgICAgICAgSXQgY2FuIHRocm93IGEgU3ludGF4RXJyb3IgZXhjZXB0aW9uLlxuXG4gICAgICAgICAgICBUaGUgb3B0aW9uYWwgcmV2aXZlciBwYXJhbWV0ZXIgaXMgYSBmdW5jdGlvbiB0aGF0IGNhbiBmaWx0ZXIgYW5kXG4gICAgICAgICAgICB0cmFuc2Zvcm0gdGhlIHJlc3VsdHMuIEl0IHJlY2VpdmVzIGVhY2ggb2YgdGhlIGtleXMgYW5kIHZhbHVlcyxcbiAgICAgICAgICAgIGFuZCBpdHMgcmV0dXJuIHZhbHVlIGlzIHVzZWQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gICAgICAgICAgICBJZiBpdCByZXR1cm5zIHdoYXQgaXQgcmVjZWl2ZWQsIHRoZW4gdGhlIHN0cnVjdHVyZSBpcyBub3QgbW9kaWZpZWQuXG4gICAgICAgICAgICBJZiBpdCByZXR1cm5zIHVuZGVmaW5lZCB0aGVuIHRoZSBtZW1iZXIgaXMgZGVsZXRlZC5cblxuICAgICAgICAgICAgRXhhbXBsZTpcblxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIHRleHQuIFZhbHVlcyB0aGF0IGxvb2sgbGlrZSBJU08gZGF0ZSBzdHJpbmdzIHdpbGxcbiAgICAgICAgICAgIC8vIGJlIGNvbnZlcnRlZCB0byBEYXRlIG9iamVjdHMuXG5cbiAgICAgICAgICAgIG15RGF0YSA9IEpTT04ucGFyc2UodGV4dCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBhID1cbi9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK2FbMV0sICthWzJdIC0gMSwgK2FbM10sICthWzRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICthWzVdLCArYVs2XSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBteURhdGEgPSBKU09OLnBhcnNlKCdbXCJEYXRlKDA5LzA5LzIwMDEpXCJdJywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2xpY2UoMCwgNSkgPT09ICdEYXRlKCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnNsaWNlKC0xKSA9PT0gJyknKSB7XG4gICAgICAgICAgICAgICAgICAgIGQgPSBuZXcgRGF0ZSh2YWx1ZS5zbGljZSg1LCAtMSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgIFRoaXMgaXMgYSByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24uIFlvdSBhcmUgZnJlZSB0byBjb3B5LCBtb2RpZnksIG9yXG4gICAgcmVkaXN0cmlidXRlLlxuKi9cblxuLypqc2xpbnQgZXZpbDogdHJ1ZSwgcmVnZXhwOiB0cnVlICovXG5cbi8qbWVtYmVycyBcIlwiLCBcIlxcYlwiLCBcIlxcdFwiLCBcIlxcblwiLCBcIlxcZlwiLCBcIlxcclwiLCBcIlxcXCJcIiwgSlNPTiwgXCJcXFxcXCIsIGFwcGx5LFxuICAgIGNhbGwsIGNoYXJDb2RlQXQsIGdldFVUQ0RhdGUsIGdldFVUQ0Z1bGxZZWFyLCBnZXRVVENIb3VycyxcbiAgICBnZXRVVENNaW51dGVzLCBnZXRVVENNb250aCwgZ2V0VVRDU2Vjb25kcywgaGFzT3duUHJvcGVydHksIGpvaW4sXG4gICAgbGFzdEluZGV4LCBsZW5ndGgsIHBhcnNlLCBwcm90b3R5cGUsIHB1c2gsIHJlcGxhY2UsIHNsaWNlLCBzdHJpbmdpZnksXG4gICAgdGVzdCwgdG9KU09OLCB0b1N0cmluZywgdmFsdWVPZlxuKi9cblxuXG4vLyBDcmVhdGUgYSBKU09OIG9iamVjdCBvbmx5IGlmIG9uZSBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LiBXZSBjcmVhdGUgdGhlXG4vLyBtZXRob2RzIGluIGEgY2xvc3VyZSB0byBhdm9pZCBjcmVhdGluZyBnbG9iYWwgdmFyaWFibGVzLlxuXG5pZiAodHlwZW9mIEpTT04gIT09ICdvYmplY3QnKSB7XG4gICAgSlNPTiA9IHt9O1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGZ1bmN0aW9uIGYobikge1xuICAgICAgICAvLyBGb3JtYXQgaW50ZWdlcnMgdG8gaGF2ZSBhdCBsZWFzdCB0d28gZGlnaXRzLlxuICAgICAgICByZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBEYXRlLnByb3RvdHlwZS50b0pTT04gIT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICBEYXRlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBpc0Zpbml0ZSh0aGlzLnZhbHVlT2YoKSlcbiAgICAgICAgICAgICAgICA/IHRoaXMuZ2V0VVRDRnVsbFllYXIoKSAgICAgKyAnLScgK1xuICAgICAgICAgICAgICAgICAgICBmKHRoaXMuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICtcbiAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ0RhdGUoKSkgICAgICArICdUJyArXG4gICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENIb3VycygpKSAgICAgKyAnOicgK1xuICAgICAgICAgICAgICAgICAgICBmKHRoaXMuZ2V0VVRDTWludXRlcygpKSAgICsgJzonICtcbiAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ1NlY29uZHMoKSkgICArICdaJ1xuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICBTdHJpbmcucHJvdG90eXBlLnRvSlNPTiAgICAgID1cbiAgICAgICAgICAgIE51bWJlci5wcm90b3R5cGUudG9KU09OICA9XG4gICAgICAgICAgICBCb29sZWFuLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICAgICAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICAgICAgZXNjYXBhYmxlID0gL1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICAgICAgZ2FwLFxuICAgICAgICBpbmRlbnQsXG4gICAgICAgIG1ldGEgPSB7ICAgIC8vIHRhYmxlIG9mIGNoYXJhY3RlciBzdWJzdGl0dXRpb25zXG4gICAgICAgICAgICAnXFxiJzogJ1xcXFxiJyxcbiAgICAgICAgICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICAgICAgICAgJ1xcbic6ICdcXFxcbicsXG4gICAgICAgICAgICAnXFxmJzogJ1xcXFxmJyxcbiAgICAgICAgICAgICdcXHInOiAnXFxcXHInLFxuICAgICAgICAgICAgJ1wiJyA6ICdcXFxcXCInLFxuICAgICAgICAgICAgJ1xcXFwnOiAnXFxcXFxcXFwnXG4gICAgICAgIH0sXG4gICAgICAgIHJlcDtcblxuXG4gICAgZnVuY3Rpb24gcXVvdGUoc3RyaW5nKSB7XG5cbi8vIElmIHRoZSBzdHJpbmcgY29udGFpbnMgbm8gY29udHJvbCBjaGFyYWN0ZXJzLCBubyBxdW90ZSBjaGFyYWN0ZXJzLCBhbmQgbm9cbi8vIGJhY2tzbGFzaCBjaGFyYWN0ZXJzLCB0aGVuIHdlIGNhbiBzYWZlbHkgc2xhcCBzb21lIHF1b3RlcyBhcm91bmQgaXQuXG4vLyBPdGhlcndpc2Ugd2UgbXVzdCBhbHNvIHJlcGxhY2UgdGhlIG9mZmVuZGluZyBjaGFyYWN0ZXJzIHdpdGggc2FmZSBlc2NhcGVcbi8vIHNlcXVlbmNlcy5cblxuICAgICAgICBlc2NhcGFibGUubGFzdEluZGV4ID0gMDtcbiAgICAgICAgcmV0dXJuIGVzY2FwYWJsZS50ZXN0KHN0cmluZykgPyAnXCInICsgc3RyaW5nLnJlcGxhY2UoZXNjYXBhYmxlLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgdmFyIGMgPSBtZXRhW2FdO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBjID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8gY1xuICAgICAgICAgICAgICAgIDogJ1xcXFx1JyArICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XG4gICAgICAgIH0pICsgJ1wiJyA6ICdcIicgKyBzdHJpbmcgKyAnXCInO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG5cbi8vIFByb2R1Y2UgYSBzdHJpbmcgZnJvbSBob2xkZXJba2V5XS5cblxuICAgICAgICB2YXIgaSwgICAgICAgICAgLy8gVGhlIGxvb3AgY291bnRlci5cbiAgICAgICAgICAgIGssICAgICAgICAgIC8vIFRoZSBtZW1iZXIga2V5LlxuICAgICAgICAgICAgdiwgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICAgIG1pbmQgPSBnYXAsXG4gICAgICAgICAgICBwYXJ0aWFsLFxuICAgICAgICAgICAgdmFsdWUgPSBob2xkZXJba2V5XTtcblxuLy8gSWYgdGhlIHZhbHVlIGhhcyBhIHRvSlNPTiBtZXRob2QsIGNhbGwgaXQgdG8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihrZXkpO1xuICAgICAgICB9XG5cbi8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuLy8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcmVwLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuXG4vLyBXaGF0IGhhcHBlbnMgbmV4dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSdzIHR5cGUuXG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiBxdW90ZSh2YWx1ZSk7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcblxuLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBFbmNvZGUgbm9uLWZpbml0ZSBudW1iZXJzIGFzIG51bGwuXG5cbiAgICAgICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogJ251bGwnO1xuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBjYXNlICdudWxsJzpcblxuLy8gSWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbiBvciBudWxsLCBjb252ZXJ0IGl0IHRvIGEgc3RyaW5nLiBOb3RlOlxuLy8gdHlwZW9mIG51bGwgZG9lcyBub3QgcHJvZHVjZSAnbnVsbCcuIFRoZSBjYXNlIGlzIGluY2x1ZGVkIGhlcmUgaW5cbi8vIHRoZSByZW1vdGUgY2hhbmNlIHRoYXQgdGhpcyBnZXRzIGZpeGVkIHNvbWVkYXkuXG5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuXG4vLyBJZiB0aGUgdHlwZSBpcyAnb2JqZWN0Jywgd2UgbWlnaHQgYmUgZGVhbGluZyB3aXRoIGFuIG9iamVjdCBvciBhbiBhcnJheSBvclxuLy8gbnVsbC5cblxuICAgICAgICBjYXNlICdvYmplY3QnOlxuXG4vLyBEdWUgdG8gYSBzcGVjaWZpY2F0aW9uIGJsdW5kZXIgaW4gRUNNQVNjcmlwdCwgdHlwZW9mIG51bGwgaXMgJ29iamVjdCcsXG4vLyBzbyB3YXRjaCBvdXQgZm9yIHRoYXQgY2FzZS5cblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICAgICAgICB9XG5cbi8vIE1ha2UgYW4gYXJyYXkgdG8gaG9sZCB0aGUgcGFydGlhbCByZXN1bHRzIG9mIHN0cmluZ2lmeWluZyB0aGlzIG9iamVjdCB2YWx1ZS5cblxuICAgICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICAgIHBhcnRpYWwgPSBbXTtcblxuLy8gSXMgdGhlIHZhbHVlIGFuIGFycmF5P1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcblxuLy8gVGhlIHZhbHVlIGlzIGFuIGFycmF5LiBTdHJpbmdpZnkgZXZlcnkgZWxlbWVudC4gVXNlIG51bGwgYXMgYSBwbGFjZWhvbGRlclxuLy8gZm9yIG5vbi1KU09OIHZhbHVlcy5cblxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGlhbFtpXSA9IHN0cihpLCB2YWx1ZSkgfHwgJ251bGwnO1xuICAgICAgICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZCB3cmFwIHRoZW0gaW5cbi8vIGJyYWNrZXRzLlxuXG4gICAgICAgICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgICAgID8gJ1tdJ1xuICAgICAgICAgICAgICAgICAgICA6IGdhcFxuICAgICAgICAgICAgICAgICAgICA/ICdbXFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ10nXG4gICAgICAgICAgICAgICAgICAgIDogJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cblxuLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlIHN0cmluZ2lmaWVkLlxuXG4gICAgICAgICAgICBpZiAocmVwICYmIHR5cGVvZiByZXAgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcmVwLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXBbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuLy8gT3RoZXJ3aXNlLCBpdGVyYXRlIHRocm91Z2ggYWxsIG9mIHRoZSBrZXlzIGluIHRoZSBvYmplY3QuXG5cbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIG1lbWJlciB0ZXh0cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLFxuLy8gYW5kIHdyYXAgdGhlbSBpbiBicmFjZXMuXG5cbiAgICAgICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgID8gJ3t9J1xuICAgICAgICAgICAgICAgIDogZ2FwXG4gICAgICAgICAgICAgICAgPyAne1xcbicgKyBnYXAgKyBwYXJ0aWFsLmpvaW4oJyxcXG4nICsgZ2FwKSArICdcXG4nICsgbWluZCArICd9J1xuICAgICAgICAgICAgICAgIDogJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9XG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHN0cmluZ2lmeSBtZXRob2QsIGdpdmUgaXQgb25lLlxuXG4gICAgRmF5ZS5zdHJpbmdpZnkgPSBmdW5jdGlvbiAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuXG4vLyBUaGUgc3RyaW5naWZ5IG1ldGhvZCB0YWtlcyBhIHZhbHVlIGFuZCBhbiBvcHRpb25hbCByZXBsYWNlciwgYW5kIGFuIG9wdGlvbmFsXG4vLyBzcGFjZSBwYXJhbWV0ZXIsIGFuZCByZXR1cm5zIGEgSlNPTiB0ZXh0LiBUaGUgcmVwbGFjZXIgY2FuIGJlIGEgZnVuY3Rpb25cbi8vIHRoYXQgY2FuIHJlcGxhY2UgdmFsdWVzLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIHRoYXQgd2lsbCBzZWxlY3QgdGhlIGtleXMuXG4vLyBBIGRlZmF1bHQgcmVwbGFjZXIgbWV0aG9kIGNhbiBiZSBwcm92aWRlZC4gVXNlIG9mIHRoZSBzcGFjZSBwYXJhbWV0ZXIgY2FuXG4vLyBwcm9kdWNlIHRleHQgdGhhdCBpcyBtb3JlIGVhc2lseSByZWFkYWJsZS5cblxuICAgICAgICB2YXIgaTtcbiAgICAgICAgZ2FwID0gJyc7XG4gICAgICAgIGluZGVudCA9ICcnO1xuXG4vLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLCBtYWtlIGFuIGluZGVudCBzdHJpbmcgY29udGFpbmluZyB0aGF0XG4vLyBtYW55IHNwYWNlcy5cblxuICAgICAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNwYWNlOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gJyAnO1xuICAgICAgICAgICAgfVxuXG4vLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG5cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpbmRlbnQgPSBzcGFjZTtcbiAgICAgICAgfVxuXG4vLyBJZiB0aGVyZSBpcyBhIHJlcGxhY2VyLCBpdCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkuXG4vLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yLlxuXG4gICAgICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgICAgICBpZiAocmVwbGFjZXIgJiYgdHlwZW9mIHJlcGxhY2VyICE9PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICAgICAgKHR5cGVvZiByZXBsYWNlciAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICAgICAgICB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSAnbnVtYmVyJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTi5zdHJpbmdpZnknKTtcbiAgICAgICAgfVxuXG4vLyBNYWtlIGEgZmFrZSByb290IG9iamVjdCBjb250YWluaW5nIG91ciB2YWx1ZSB1bmRlciB0aGUga2V5IG9mICcnLlxuLy8gUmV0dXJuIHRoZSByZXN1bHQgb2Ygc3RyaW5naWZ5aW5nIHRoZSB2YWx1ZS5cblxuICAgICAgICByZXR1cm4gc3RyKCcnLCB7Jyc6IHZhbHVlfSk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgSlNPTi5zdHJpbmdpZnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkgPSBGYXllLnN0cmluZ2lmeTtcbiAgICB9XG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHBhcnNlIG1ldGhvZCwgZ2l2ZSBpdCBvbmUuXG5cbiAgICBpZiAodHlwZW9mIEpTT04ucGFyc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgSlNPTi5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0LCByZXZpdmVyKSB7XG5cbi8vIFRoZSBwYXJzZSBtZXRob2QgdGFrZXMgYSB0ZXh0IGFuZCBhbiBvcHRpb25hbCByZXZpdmVyIGZ1bmN0aW9uLCBhbmQgcmV0dXJuc1xuLy8gYSBKYXZhU2NyaXB0IHZhbHVlIGlmIHRoZSB0ZXh0IGlzIGEgdmFsaWQgSlNPTiB0ZXh0LlxuXG4gICAgICAgICAgICB2YXIgajtcblxuICAgICAgICAgICAgZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xuXG4vLyBUaGUgd2FsayBtZXRob2QgaXMgdXNlZCB0byByZWN1cnNpdmVseSB3YWxrIHRoZSByZXN1bHRpbmcgc3RydWN0dXJlIHNvXG4vLyB0aGF0IG1vZGlmaWNhdGlvbnMgY2FuIGJlIG1hZGUuXG5cbiAgICAgICAgICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHdhbGsodmFsdWUsIGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuXG5cbi8vIFBhcnNpbmcgaGFwcGVucyBpbiBmb3VyIHN0YWdlcy4gSW4gdGhlIGZpcnN0IHN0YWdlLCB3ZSByZXBsYWNlIGNlcnRhaW5cbi8vIFVuaWNvZGUgY2hhcmFjdGVycyB3aXRoIGVzY2FwZSBzZXF1ZW5jZXMuIEphdmFTY3JpcHQgaGFuZGxlcyBtYW55IGNoYXJhY3RlcnNcbi8vIGluY29ycmVjdGx5LCBlaXRoZXIgc2lsZW50bHkgZGVsZXRpbmcgdGhlbSwgb3IgdHJlYXRpbmcgdGhlbSBhcyBsaW5lIGVuZGluZ3MuXG5cbiAgICAgICAgICAgIHRleHQgPSBTdHJpbmcodGV4dCk7XG4gICAgICAgICAgICBjeC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKGN4LnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGN4LCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1xcXFx1JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4vLyBJbiB0aGUgc2Vjb25kIHN0YWdlLCB3ZSBydW4gdGhlIHRleHQgYWdhaW5zdCByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgbG9va1xuLy8gZm9yIG5vbi1KU09OIHBhdHRlcm5zLiBXZSBhcmUgZXNwZWNpYWxseSBjb25jZXJuZWQgd2l0aCAnKCknIGFuZCAnbmV3J1xuLy8gYmVjYXVzZSB0aGV5IGNhbiBjYXVzZSBpbnZvY2F0aW9uLCBhbmQgJz0nIGJlY2F1c2UgaXQgY2FuIGNhdXNlIG11dGF0aW9uLlxuLy8gQnV0IGp1c3QgdG8gYmUgc2FmZSwgd2Ugd2FudCB0byByZWplY3QgYWxsIHVuZXhwZWN0ZWQgZm9ybXMuXG5cbi8vIFdlIHNwbGl0IHRoZSBzZWNvbmQgc3RhZ2UgaW50byA0IHJlZ2V4cCBvcGVyYXRpb25zIGluIG9yZGVyIHRvIHdvcmsgYXJvdW5kXG4vLyBjcmlwcGxpbmcgaW5lZmZpY2llbmNpZXMgaW4gSUUncyBhbmQgU2FmYXJpJ3MgcmVnZXhwIGVuZ2luZXMuIEZpcnN0IHdlXG4vLyByZXBsYWNlIHRoZSBKU09OIGJhY2tzbGFzaCBwYWlycyB3aXRoICdAJyAoYSBub24tSlNPTiBjaGFyYWN0ZXIpLiBTZWNvbmQsIHdlXG4vLyByZXBsYWNlIGFsbCBzaW1wbGUgdmFsdWUgdG9rZW5zIHdpdGggJ10nIGNoYXJhY3RlcnMuIFRoaXJkLCB3ZSBkZWxldGUgYWxsXG4vLyBvcGVuIGJyYWNrZXRzIHRoYXQgZm9sbG93IGEgY29sb24gb3IgY29tbWEgb3IgdGhhdCBiZWdpbiB0aGUgdGV4dC4gRmluYWxseSxcbi8vIHdlIGxvb2sgdG8gc2VlIHRoYXQgdGhlIHJlbWFpbmluZyBjaGFyYWN0ZXJzIGFyZSBvbmx5IHdoaXRlc3BhY2Ugb3IgJ10nIG9yXG4vLyAnLCcgb3IgJzonIG9yICd7JyBvciAnfScuIElmIHRoYXQgaXMgc28sIHRoZW4gdGhlIHRleHQgaXMgc2FmZSBmb3IgZXZhbC5cblxuICAgICAgICAgICAgaWYgKC9eW1xcXSw6e31cXHNdKiQvXG4gICAgICAgICAgICAgICAgICAgIC50ZXN0KHRleHQucmVwbGFjZSgvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nLCAnQCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2csICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZywgJycpKSkge1xuXG4vLyBJbiB0aGUgdGhpcmQgc3RhZ2Ugd2UgdXNlIHRoZSBldmFsIGZ1bmN0aW9uIHRvIGNvbXBpbGUgdGhlIHRleHQgaW50byBhXG4vLyBKYXZhU2NyaXB0IHN0cnVjdHVyZS4gVGhlICd7JyBvcGVyYXRvciBpcyBzdWJqZWN0IHRvIGEgc3ludGFjdGljIGFtYmlndWl0eVxuLy8gaW4gSmF2YVNjcmlwdDogaXQgY2FuIGJlZ2luIGEgYmxvY2sgb3IgYW4gb2JqZWN0IGxpdGVyYWwuIFdlIHdyYXAgdGhlIHRleHRcbi8vIGluIHBhcmVucyB0byBlbGltaW5hdGUgdGhlIGFtYmlndWl0eS5cblxuICAgICAgICAgICAgICAgIGogPSBldmFsKCcoJyArIHRleHQgKyAnKScpO1xuXG4vLyBJbiB0aGUgb3B0aW9uYWwgZm91cnRoIHN0YWdlLCB3ZSByZWN1cnNpdmVseSB3YWxrIHRoZSBuZXcgc3RydWN0dXJlLCBwYXNzaW5nXG4vLyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byBhIHJldml2ZXIgZnVuY3Rpb24gZm9yIHBvc3NpYmxlIHRyYW5zZm9ybWF0aW9uLlxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgID8gd2Fsayh7Jyc6IGp9LCAnJylcbiAgICAgICAgICAgICAgICAgICAgOiBqO1xuICAgICAgICAgICAgfVxuXG4vLyBJZiB0aGUgdGV4dCBpcyBub3QgSlNPTiBwYXJzZWFibGUsIHRoZW4gYSBTeW50YXhFcnJvciBpcyB0aHJvd24uXG5cbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSlNPTi5wYXJzZScpO1xuICAgICAgICB9O1xuICAgIH1cbn0oKSk7XG5cbkZheWUuVHJhbnNwb3J0LldlYlNvY2tldCA9IEZheWUuZXh0ZW5kKEZheWUuQ2xhc3MoRmF5ZS5UcmFuc3BvcnQsIHtcbiAgVU5DT05ORUNURUQ6ICAxLFxuICBDT05ORUNUSU5HOiAgIDIsXG4gIENPTk5FQ1RFRDogICAgMyxcblxuICBiYXRjaGluZzogICAgIGZhbHNlLFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuY2FsbGJhY2soZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdHJ1ZSkgfSk7XG4gICAgdGhpcy5lcnJiYWNrKGZ1bmN0aW9uKCkgeyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKSB9KTtcbiAgICB0aGlzLmNvbm5lY3QoKTtcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHRoaXMuX3BlbmRpbmcgPSB0aGlzLl9wZW5kaW5nIHx8IG5ldyBGYXllLlNldCgpO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gbWVzc2FnZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB0aGlzLl9wZW5kaW5nLmFkZChtZXNzYWdlc1tpXSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBGYXllLlByb21pc2UoKTtcblxuICAgIHRoaXMuY2FsbGJhY2soZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgICBpZiAoIXNvY2tldCB8fCBzb2NrZXQucmVhZHlTdGF0ZSAhPT0gMSkgcmV0dXJuO1xuICAgICAgc29ja2V0LnNlbmQoRmF5ZS50b0pTT04obWVzc2FnZXMpKTtcbiAgICAgIEZheWUuUHJvbWlzZS5mdWxmaWxsKHByb21pc2UsIHNvY2tldCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLmNvbm5lY3QoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7IHByb21pc2UudGhlbihmdW5jdGlvbih3cykgeyB3cy5jbG9zZSgpIH0pIH1cbiAgICB9O1xuICB9LFxuXG4gIGNvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgIGlmIChGYXllLlRyYW5zcG9ydC5XZWJTb2NrZXQuX3VubG9hZGVkKSByZXR1cm47XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlIHx8IHRoaXMuVU5DT05ORUNURUQ7XG4gICAgaWYgKHRoaXMuX3N0YXRlICE9PSB0aGlzLlVOQ09OTkVDVEVEKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLkNPTk5FQ1RJTkc7XG5cbiAgICB2YXIgc29ja2V0ID0gdGhpcy5fY3JlYXRlU29ja2V0KCk7XG4gICAgaWYgKCFzb2NrZXQpIHJldHVybiB0aGlzLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzb2NrZXQuaGVhZGVycykgc2VsZi5fc3RvcmVDb29raWVzKHNvY2tldC5oZWFkZXJzWydzZXQtY29va2llJ10pO1xuICAgICAgc2VsZi5fc29ja2V0ID0gc29ja2V0O1xuICAgICAgc2VsZi5fc3RhdGUgPSBzZWxmLkNPTk5FQ1RFRDtcbiAgICAgIHNlbGYuX2V2ZXJDb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgc2VsZi5fcGluZygpO1xuICAgICAgc2VsZi5zZXREZWZlcnJlZFN0YXR1cygnc3VjY2VlZGVkJywgc29ja2V0KTtcbiAgICB9O1xuXG4gICAgdmFyIGNsb3NlZCA9IGZhbHNlO1xuICAgIHNvY2tldC5vbmNsb3NlID0gc29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjbG9zZWQpIHJldHVybjtcbiAgICAgIGNsb3NlZCA9IHRydWU7XG5cbiAgICAgIHZhciB3YXNDb25uZWN0ZWQgPSAoc2VsZi5fc3RhdGUgPT09IHNlbGYuQ09OTkVDVEVEKTtcbiAgICAgIHNvY2tldC5vbm9wZW4gPSBzb2NrZXQub25jbG9zZSA9IHNvY2tldC5vbmVycm9yID0gc29ja2V0Lm9ubWVzc2FnZSA9IG51bGw7XG5cbiAgICAgIGRlbGV0ZSBzZWxmLl9zb2NrZXQ7XG4gICAgICBzZWxmLl9zdGF0ZSA9IHNlbGYuVU5DT05ORUNURUQ7XG4gICAgICBzZWxmLnJlbW92ZVRpbWVvdXQoJ3BpbmcnKTtcbiAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ3Vua25vd24nKTtcblxuICAgICAgdmFyIHBlbmRpbmcgPSBzZWxmLl9wZW5kaW5nID8gc2VsZi5fcGVuZGluZy50b0FycmF5KCkgOiBbXTtcbiAgICAgIGRlbGV0ZSBzZWxmLl9wZW5kaW5nO1xuXG4gICAgICBpZiAod2FzQ29ubmVjdGVkKSB7XG4gICAgICAgIHNlbGYuX2hhbmRsZUVycm9yKHBlbmRpbmcsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzZWxmLl9ldmVyQ29ubmVjdGVkKSB7XG4gICAgICAgIHNlbGYuX2hhbmRsZUVycm9yKHBlbmRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5zZXREZWZlcnJlZFN0YXR1cygnZmFpbGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIHJlcGxpZXMgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgaWYgKCFyZXBsaWVzKSByZXR1cm47XG5cbiAgICAgIHJlcGxpZXMgPSBbXS5jb25jYXQocmVwbGllcyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcmVwbGllcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgaWYgKHJlcGxpZXNbaV0uc3VjY2Vzc2Z1bCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgc2VsZi5fcGVuZGluZy5yZW1vdmUocmVwbGllc1tpXSk7XG4gICAgICB9XG4gICAgICBzZWxmLl9yZWNlaXZlKHJlcGxpZXMpO1xuICAgIH07XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0KSByZXR1cm47XG4gICAgdGhpcy5fc29ja2V0LmNsb3NlKCk7XG4gIH0sXG5cbiAgX2NyZWF0ZVNvY2tldDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHVybCAgICAgICAgPSBGYXllLlRyYW5zcG9ydC5XZWJTb2NrZXQuZ2V0U29ja2V0VXJsKHRoaXMuZW5kcG9pbnQpLFxuICAgICAgICBoZWFkZXJzICAgID0gdGhpcy5fZGlzcGF0Y2hlci5oZWFkZXJzLFxuICAgICAgICBleHRlbnNpb25zID0gdGhpcy5fZGlzcGF0Y2hlci53c0V4dGVuc2lvbnMsXG4gICAgICAgIGNvb2tpZSAgICAgPSB0aGlzLl9nZXRDb29raWVzKCksXG4gICAgICAgIHRscyAgICAgICAgPSB0aGlzLl9kaXNwYXRjaGVyLnRscyxcbiAgICAgICAgb3B0aW9ucyAgICA9IHtleHRlbnNpb25zOiBleHRlbnNpb25zLCBoZWFkZXJzOiBoZWFkZXJzLCBwcm94eTogdGhpcy5fcHJveHksIHRsczogdGxzfTtcblxuICAgIGlmIChjb29raWUgIT09ICcnKSBvcHRpb25zLmhlYWRlcnNbJ0Nvb2tpZSddID0gY29va2llO1xuXG4gICAgaWYgKEZheWUuV2ViU29ja2V0KSAgICAgICAgcmV0dXJuIG5ldyBGYXllLldlYlNvY2tldC5DbGllbnQodXJsLCBbXSwgb3B0aW9ucyk7XG4gICAgaWYgKEZheWUuRU5WLk1veldlYlNvY2tldCkgcmV0dXJuIG5ldyBNb3pXZWJTb2NrZXQodXJsKTtcbiAgICBpZiAoRmF5ZS5FTlYuV2ViU29ja2V0KSAgICByZXR1cm4gbmV3IFdlYlNvY2tldCh1cmwpO1xuICB9LFxuXG4gIF9waW5nOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkgcmV0dXJuO1xuICAgIHRoaXMuX3NvY2tldC5zZW5kKCdbXScpO1xuICAgIHRoaXMuYWRkVGltZW91dCgncGluZycsIHRoaXMuX2Rpc3BhdGNoZXIudGltZW91dCAvIDIsIHRoaXMuX3BpbmcsIHRoaXMpO1xuICB9XG5cbn0pLCB7XG4gIFBST1RPQ09MUzoge1xuICAgICdodHRwOic6ICAnd3M6JyxcbiAgICAnaHR0cHM6JzogJ3dzczonXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCkge1xuICAgIHZhciBzb2NrZXRzID0gZGlzcGF0Y2hlci50cmFuc3BvcnRzLndlYnNvY2tldCA9IGRpc3BhdGNoZXIudHJhbnNwb3J0cy53ZWJzb2NrZXQgfHwge307XG4gICAgc29ja2V0c1tlbmRwb2ludC5ocmVmXSA9IHNvY2tldHNbZW5kcG9pbnQuaHJlZl0gfHwgbmV3IHRoaXMoZGlzcGF0Y2hlciwgZW5kcG9pbnQpO1xuICAgIHJldHVybiBzb2NrZXRzW2VuZHBvaW50LmhyZWZdO1xuICB9LFxuXG4gIGdldFNvY2tldFVybDogZnVuY3Rpb24oZW5kcG9pbnQpIHtcbiAgICBlbmRwb2ludCA9IEZheWUuY29weU9iamVjdChlbmRwb2ludCk7XG4gICAgZW5kcG9pbnQucHJvdG9jb2wgPSB0aGlzLlBST1RPQ09MU1tlbmRwb2ludC5wcm90b2NvbF07XG4gICAgcmV0dXJuIEZheWUuVVJJLnN0cmluZ2lmeShlbmRwb2ludCk7XG4gIH0sXG5cbiAgaXNVc2FibGU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuY3JlYXRlKGRpc3BhdGNoZXIsIGVuZHBvaW50KS5pc1VzYWJsZShjYWxsYmFjaywgY29udGV4dCk7XG4gIH1cbn0pO1xuXG5GYXllLmV4dGVuZChGYXllLlRyYW5zcG9ydC5XZWJTb2NrZXQucHJvdG90eXBlLCBGYXllLkRlZmVycmFibGUpO1xuRmF5ZS5UcmFuc3BvcnQucmVnaXN0ZXIoJ3dlYnNvY2tldCcsIEZheWUuVHJhbnNwb3J0LldlYlNvY2tldCk7XG5cbmlmIChGYXllLkV2ZW50ICYmIEZheWUuRU5WLm9uYmVmb3JldW5sb2FkICE9PSB1bmRlZmluZWQpXG4gIEZheWUuRXZlbnQub24oRmF5ZS5FTlYsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBGYXllLlRyYW5zcG9ydC5XZWJTb2NrZXQuX3VubG9hZGVkID0gdHJ1ZTtcbiAgfSk7XG5cbkZheWUuVHJhbnNwb3J0LkV2ZW50U291cmNlID0gRmF5ZS5leHRlbmQoRmF5ZS5DbGFzcyhGYXllLlRyYW5zcG9ydCwge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCkge1xuICAgIEZheWUuVHJhbnNwb3J0LnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgZGlzcGF0Y2hlciwgZW5kcG9pbnQpO1xuICAgIGlmICghRmF5ZS5FTlYuRXZlbnRTb3VyY2UpIHJldHVybiB0aGlzLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnKTtcblxuICAgIHRoaXMuX3hociA9IG5ldyBGYXllLlRyYW5zcG9ydC5YSFIoZGlzcGF0Y2hlciwgZW5kcG9pbnQpO1xuXG4gICAgZW5kcG9pbnQgPSBGYXllLmNvcHlPYmplY3QoZW5kcG9pbnQpO1xuICAgIGVuZHBvaW50LnBhdGhuYW1lICs9ICcvJyArIGRpc3BhdGNoZXIuY2xpZW50SWQ7XG5cbiAgICB2YXIgc29ja2V0ID0gbmV3IEV2ZW50U291cmNlKEZheWUuVVJJLnN0cmluZ2lmeShlbmRwb2ludCkpLFxuICAgICAgICBzZWxmICAgPSB0aGlzO1xuXG4gICAgc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fZXZlckNvbm5lY3RlZCA9IHRydWU7XG4gICAgICBzZWxmLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICB9O1xuXG4gICAgc29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLl9ldmVyQ29ubmVjdGVkKSB7XG4gICAgICAgIHNlbGYuX2hhbmRsZUVycm9yKFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcpO1xuICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBzZWxmLl9yZWNlaXZlKEpTT04ucGFyc2UoZXZlbnQuZGF0YSkpO1xuICAgIH07XG5cbiAgICB0aGlzLl9zb2NrZXQgPSBzb2NrZXQ7XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0KSByZXR1cm47XG4gICAgdGhpcy5fc29ja2V0Lm9ub3BlbiA9IHRoaXMuX3NvY2tldC5vbmVycm9yID0gdGhpcy5fc29ja2V0Lm9ubWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5fc29ja2V0LmNsb3NlKCk7XG4gICAgZGVsZXRlIHRoaXMuX3NvY2tldDtcbiAgfSxcblxuICBpc1VzYWJsZTogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmNhbGxiYWNrKGZ1bmN0aW9uKCkgeyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRydWUpIH0pO1xuICAgIHRoaXMuZXJyYmFjayhmdW5jdGlvbigpIHsgY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSkgfSk7XG4gIH0sXG5cbiAgZW5jb2RlOiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiB0aGlzLl94aHIuZW5jb2RlKG1lc3NhZ2VzKTtcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiB0aGlzLl94aHIucmVxdWVzdChtZXNzYWdlcyk7XG4gIH1cblxufSksIHtcbiAgaXNVc2FibGU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBpZCA9IGRpc3BhdGNoZXIuY2xpZW50SWQ7XG4gICAgaWYgKCFpZCkgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZmFsc2UpO1xuXG4gICAgRmF5ZS5UcmFuc3BvcnQuWEhSLmlzVXNhYmxlKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBmdW5jdGlvbih1c2FibGUpIHtcbiAgICAgIGlmICghdXNhYmxlKSByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSk7XG4gICAgICB0aGlzLmNyZWF0ZShkaXNwYXRjaGVyLCBlbmRwb2ludCkuaXNVc2FibGUoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQpIHtcbiAgICB2YXIgc29ja2V0cyA9IGRpc3BhdGNoZXIudHJhbnNwb3J0cy5ldmVudHNvdXJjZSA9IGRpc3BhdGNoZXIudHJhbnNwb3J0cy5ldmVudHNvdXJjZSB8fCB7fSxcbiAgICAgICAgaWQgICAgICA9IGRpc3BhdGNoZXIuY2xpZW50SWQ7XG5cbiAgICB2YXIgdXJsID0gRmF5ZS5jb3B5T2JqZWN0KGVuZHBvaW50KTtcbiAgICB1cmwucGF0aG5hbWUgKz0gJy8nICsgKGlkIHx8ICcnKTtcbiAgICB1cmwgPSBGYXllLlVSSS5zdHJpbmdpZnkodXJsKTtcblxuICAgIHNvY2tldHNbdXJsXSA9IHNvY2tldHNbdXJsXSB8fCBuZXcgdGhpcyhkaXNwYXRjaGVyLCBlbmRwb2ludCk7XG4gICAgcmV0dXJuIHNvY2tldHNbdXJsXTtcbiAgfVxufSk7XG5cbkZheWUuZXh0ZW5kKEZheWUuVHJhbnNwb3J0LkV2ZW50U291cmNlLnByb3RvdHlwZSwgRmF5ZS5EZWZlcnJhYmxlKTtcbkZheWUuVHJhbnNwb3J0LnJlZ2lzdGVyKCdldmVudHNvdXJjZScsIEZheWUuVHJhbnNwb3J0LkV2ZW50U291cmNlKTtcblxuRmF5ZS5UcmFuc3BvcnQuWEhSID0gRmF5ZS5leHRlbmQoRmF5ZS5DbGFzcyhGYXllLlRyYW5zcG9ydCwge1xuICBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIEZheWUudG9KU09OKG1lc3NhZ2VzKTtcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHZhciBocmVmID0gdGhpcy5lbmRwb2ludC5ocmVmLFxuICAgICAgICB4aHIgID0gRmF5ZS5FTlYuQWN0aXZlWE9iamVjdCA/IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpIDogbmV3IFhNTEh0dHBSZXF1ZXN0KCksXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCBocmVmLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignUHJhZ21hJywgJ25vLWNhY2hlJyk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcblxuICAgIHZhciBoZWFkZXJzID0gdGhpcy5fZGlzcGF0Y2hlci5oZWFkZXJzO1xuICAgIGZvciAodmFyIGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICBpZiAoIWhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgfVxuXG4gICAgdmFyIGFib3J0ID0gZnVuY3Rpb24oKSB7IHhoci5hYm9ydCgpIH07XG4gICAgaWYgKEZheWUuRU5WLm9uYmVmb3JldW5sb2FkICE9PSB1bmRlZmluZWQpIEZheWUuRXZlbnQub24oRmF5ZS5FTlYsICdiZWZvcmV1bmxvYWQnLCBhYm9ydCk7XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXhociB8fCB4aHIucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuXG4gICAgICB2YXIgcmVwbGllcyAgICA9IG51bGwsXG4gICAgICAgICAgc3RhdHVzICAgICA9IHhoci5zdGF0dXMsXG4gICAgICAgICAgdGV4dCAgICAgICA9IHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgc3VjY2Vzc2Z1bCA9IChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkgfHwgc3RhdHVzID09PSAzMDQgfHwgc3RhdHVzID09PSAxMjIzO1xuXG4gICAgICBpZiAoRmF5ZS5FTlYub25iZWZvcmV1bmxvYWQgIT09IHVuZGVmaW5lZCkgRmF5ZS5FdmVudC5kZXRhY2goRmF5ZS5FTlYsICdiZWZvcmV1bmxvYWQnLCBhYm9ydCk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIHhociA9IG51bGw7XG5cbiAgICAgIGlmICghc3VjY2Vzc2Z1bCkgcmV0dXJuIHNlbGYuX2hhbmRsZUVycm9yKG1lc3NhZ2VzKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVwbGllcyA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICBpZiAocmVwbGllcylcbiAgICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICAgIGVsc2VcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZCh0aGlzLmVuY29kZShtZXNzYWdlcykpO1xuICAgIHJldHVybiB4aHI7XG4gIH1cbn0pLCB7XG4gIGlzVXNhYmxlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIEZheWUuVVJJLmlzU2FtZU9yaWdpbihlbmRwb2ludCkpO1xuICB9XG59KTtcblxuRmF5ZS5UcmFuc3BvcnQucmVnaXN0ZXIoJ2xvbmctcG9sbGluZycsIEZheWUuVHJhbnNwb3J0LlhIUik7XG5cbkZheWUuVHJhbnNwb3J0LkNPUlMgPSBGYXllLmV4dGVuZChGYXllLkNsYXNzKEZheWUuVHJhbnNwb3J0LCB7XG4gIGVuY29kZTogZnVuY3Rpb24obWVzc2FnZXMpIHtcbiAgICByZXR1cm4gJ21lc3NhZ2U9JyArIGVuY29kZVVSSUNvbXBvbmVudChGYXllLnRvSlNPTihtZXNzYWdlcykpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdmFyIHhockNsYXNzID0gRmF5ZS5FTlYuWERvbWFpblJlcXVlc3QgPyBYRG9tYWluUmVxdWVzdCA6IFhNTEh0dHBSZXF1ZXN0LFxuICAgICAgICB4aHIgICAgICA9IG5ldyB4aHJDbGFzcygpLFxuICAgICAgICBpZCAgICAgICA9ICsrRmF5ZS5UcmFuc3BvcnQuQ09SUy5faWQsXG4gICAgICAgIGhlYWRlcnMgID0gdGhpcy5fZGlzcGF0Y2hlci5oZWFkZXJzLFxuICAgICAgICBzZWxmICAgICA9IHRoaXMsXG4gICAgICAgIGtleTtcblxuICAgIHhoci5vcGVuKCdQT1NUJywgRmF5ZS5VUkkuc3RyaW5naWZ5KHRoaXMuZW5kcG9pbnQpLCB0cnVlKTtcblxuICAgIGlmICh4aHIuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1ByYWdtYScsICduby1jYWNoZScpO1xuICAgICAgZm9yIChrZXkgaW4gaGVhZGVycykge1xuICAgICAgICBpZiAoIWhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2xlYW5VcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF4aHIpIHJldHVybiBmYWxzZTtcbiAgICAgIEZheWUuVHJhbnNwb3J0LkNPUlMuX3BlbmRpbmcucmVtb3ZlKGlkKTtcbiAgICAgIHhoci5vbmxvYWQgPSB4aHIub25lcnJvciA9IHhoci5vbnRpbWVvdXQgPSB4aHIub25wcm9ncmVzcyA9IG51bGw7XG4gICAgICB4aHIgPSBudWxsO1xuICAgIH07XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVwbGllcyA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICByZXBsaWVzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGNsZWFuVXAoKTtcblxuICAgICAgaWYgKHJlcGxpZXMpXG4gICAgICAgIHNlbGYuX3JlY2VpdmUocmVwbGllcyk7XG4gICAgICBlbHNlXG4gICAgICAgIHNlbGYuX2hhbmRsZUVycm9yKG1lc3NhZ2VzKTtcbiAgICB9O1xuXG4gICAgeGhyLm9uZXJyb3IgPSB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhblVwKCk7XG4gICAgICBzZWxmLl9oYW5kbGVFcnJvcihtZXNzYWdlcyk7XG4gICAgfTtcblxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24oKSB7fTtcblxuICAgIGlmICh4aHJDbGFzcyA9PT0gRmF5ZS5FTlYuWERvbWFpblJlcXVlc3QpXG4gICAgICBGYXllLlRyYW5zcG9ydC5DT1JTLl9wZW5kaW5nLmFkZCh7aWQ6IGlkLCB4aHI6IHhocn0pO1xuXG4gICAgeGhyLnNlbmQodGhpcy5lbmNvZGUobWVzc2FnZXMpKTtcbiAgICByZXR1cm4geGhyO1xuICB9XG59KSwge1xuICBfaWQ6ICAgICAgMCxcbiAgX3BlbmRpbmc6IG5ldyBGYXllLlNldCgpLFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoRmF5ZS5VUkkuaXNTYW1lT3JpZ2luKGVuZHBvaW50KSlcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKTtcblxuICAgIGlmIChGYXllLkVOVi5YRG9tYWluUmVxdWVzdClcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVuZHBvaW50LnByb3RvY29sID09PSBGYXllLkVOVi5sb2NhdGlvbi5wcm90b2NvbCk7XG5cbiAgICBpZiAoRmF5ZS5FTlYuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgIHZhciB4aHIgPSBuZXcgRmF5ZS5FTlYuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHhoci53aXRoQ3JlZGVudGlhbHMgIT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKTtcbiAgfVxufSk7XG5cbkZheWUuVHJhbnNwb3J0LnJlZ2lzdGVyKCdjcm9zcy1vcmlnaW4tbG9uZy1wb2xsaW5nJywgRmF5ZS5UcmFuc3BvcnQuQ09SUyk7XG5cbkZheWUuVHJhbnNwb3J0LkpTT05QID0gRmF5ZS5leHRlbmQoRmF5ZS5DbGFzcyhGYXllLlRyYW5zcG9ydCwge1xuIGVuY29kZTogZnVuY3Rpb24obWVzc2FnZXMpIHtcbiAgICB2YXIgdXJsID0gRmF5ZS5jb3B5T2JqZWN0KHRoaXMuZW5kcG9pbnQpO1xuICAgIHVybC5xdWVyeS5tZXNzYWdlID0gRmF5ZS50b0pTT04obWVzc2FnZXMpO1xuICAgIHVybC5xdWVyeS5qc29ucCAgID0gJ19fanNvbnAnICsgRmF5ZS5UcmFuc3BvcnQuSlNPTlAuX2NiQ291bnQgKyAnX18nO1xuICAgIHJldHVybiBGYXllLlVSSS5zdHJpbmdpZnkodXJsKTtcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHZhciBoZWFkICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzY3JpcHQgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSxcbiAgICAgICAgY2FsbGJhY2tOYW1lID0gRmF5ZS5UcmFuc3BvcnQuSlNPTlAuZ2V0Q2FsbGJhY2tOYW1lKCksXG4gICAgICAgIGVuZHBvaW50ICAgICA9IEZheWUuY29weU9iamVjdCh0aGlzLmVuZHBvaW50KSxcbiAgICAgICAgc2VsZiAgICAgICAgID0gdGhpcztcblxuICAgIGVuZHBvaW50LnF1ZXJ5Lm1lc3NhZ2UgPSBGYXllLnRvSlNPTihtZXNzYWdlcyk7XG4gICAgZW5kcG9pbnQucXVlcnkuanNvbnAgICA9IGNhbGxiYWNrTmFtZTtcblxuICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIUZheWUuRU5WW2NhbGxiYWNrTmFtZV0pIHJldHVybiBmYWxzZTtcbiAgICAgIEZheWUuRU5WW2NhbGxiYWNrTmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICB0cnkgeyBkZWxldGUgRmF5ZS5FTlZbY2FsbGJhY2tOYW1lXSB9IGNhdGNoIChlKSB7fVxuICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICB9O1xuXG4gICAgRmF5ZS5FTlZbY2FsbGJhY2tOYW1lXSA9IGZ1bmN0aW9uKHJlcGxpZXMpIHtcbiAgICAgIGNsZWFudXAoKTtcbiAgICAgIHNlbGYuX3JlY2VpdmUocmVwbGllcyk7XG4gICAgfTtcblxuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyAgPSBGYXllLlVSSS5zdHJpbmdpZnkoZW5kcG9pbnQpO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgICBzZWxmLl9oYW5kbGVFcnJvcihtZXNzYWdlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7YWJvcnQ6IGNsZWFudXB9O1xuICB9XG59KSwge1xuICBfY2JDb3VudDogMCxcblxuICBnZXRDYWxsYmFja05hbWU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2NiQ291bnQgKz0gMTtcbiAgICByZXR1cm4gJ19fanNvbnAnICsgdGhpcy5fY2JDb3VudCArICdfXyc7XG4gIH0sXG5cbiAgaXNVc2FibGU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdHJ1ZSk7XG4gIH1cbn0pO1xuXG5GYXllLlRyYW5zcG9ydC5yZWdpc3RlcignY2FsbGJhY2stcG9sbGluZycsIEZheWUuVHJhbnNwb3J0LkpTT05QKTtcblxufSkoKTsiXX0=
