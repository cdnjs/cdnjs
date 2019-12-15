(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Streaming = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Faye Client extensions: https://faye.jcoglan.com/browser/extensions.html
 *
 * For use with Streaming.prototype.createClient()
**/
var StreamingExtension = {};

/**
 * Constructor for an auth failure detector extension
 *
 * Based on new feature released with Salesforce Spring '18:
 * https://releasenotes.docs.salesforce.com/en-us/spring18/release-notes/rn_messaging_cometd_auth_validation.htm?edition=&impact=
 *
 * Example triggering error message:
 *
 * ```
 * {
 *   "ext":{
 *     "sfdc":{"failureReason":"401::Authentication invalid"},
 *     "replay":true},
 *   "advice":{"reconnect":"none"},
 *   "channel":"/meta/handshake",
 *   "error":"403::Handshake denied",
 *   "successful":false
 * }
 * ```
 *
 * Example usage:
 *
 * ```javascript
 * const conn = new jsforce.Connection({ … });
 * 
 * const channel = "/event/My_Event__e";
 * 
 * // Exit the Node process when auth fails
 * const exitCallback = () => process.exit(1);
 * const authFailureExt = new jsforce.StreamingExtension.AuthFailure(exitCallback);
 * 
 * const fayeClient = conn.streaming.createClient([ authFailureExt ]);
 * 
 * const subscription = fayeClient.subscribe(channel, data => {
 *   console.log('topic received data', data);
 * });
 * 
 * subscription.cancel();
 * ```
 *
 * @param {Function} failureCallback - Invoked when authentication becomes invalid
 */
StreamingExtension.AuthFailure = function(failureCallback) {
  this.incoming = function(message, callback) {
    if (
      (message.channel === '/meta/connect' ||
        message.channel === '/meta/handshake')
      && message.advice
      && message.advice.reconnect == 'none'
    ) {
      failureCallback(message);
    } else {
      callback(message);
    }
  }
};

/**
 * Constructor for a durable streaming replay extension
 *
 * Modified from original Salesforce demo source code:
 * https://github.com/developerforce/SalesforceDurableStreamingDemo/blob/3d4a56eac956f744ad6c22e6a8141b6feb57abb9/staticresources/cometdReplayExtension.resource
 * 
 * Example usage:
 *
 * ```javascript
 * const conn = new jsforce.Connection({ … });
 * 
 * const channel = "/event/My_Event__e";
 * const replayId = -2; // -2 is all retained events
 * 
 * const replayExt = new jsforce.StreamingExtension.Replay(channel, replayId);
 * 
 * const fayeClient = conn.streaming.createClient([ replayExt ]);
 * 
 * const subscription = fayeClient.subscribe(channel, data => {
 *   console.log('topic received data', data);
 * });
 * 
 * subscription.cancel();
 * ```
 */
StreamingExtension.Replay = function(channel, replayId) {
  var REPLAY_FROM_KEY = "replay";
  
  var _extensionEnabled = replayId != null ? true : false;
  var _replay = replayId;
  var _channel = channel;

  this.setExtensionEnabled = function(extensionEnabled) {
    _extensionEnabled = extensionEnabled;
  }

  this.setReplay = function (replay) {
    _replay = parseInt(replay, 10);
  }

  this.setChannel = function(channel) {
    _channel = channel;
  }

  this.incoming = function(message, callback) {
    if (message.channel === '/meta/handshake') {
      if (message.ext && message.ext[REPLAY_FROM_KEY] == true) {
        _extensionEnabled = true;
      }
    } else if (message.channel === _channel && message.data && message.data.event && message.data.event.replayId) {
      _replay = message.data.event.replayId;
    }
    callback(message);
  }
  
  this.outgoing = function(message, callback) {
    if (message.channel === '/meta/subscribe') {
      if (_extensionEnabled) {
        if (!message.ext) { message.ext = {}; }

        var replayFromMap = {};
        replayFromMap[_channel] = _replay;

        // add "ext : { "replay" : { CHANNEL : REPLAY_VALUE }}" to subscribe message
        message.ext[REPLAY_FROM_KEY] = replayFromMap;
      }
    }
    callback(message);
  };
};

module.exports = StreamingExtension;

},{}],2:[function(require,module,exports){
/**
 * @file Manages Streaming APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var events = window.jsforce.require('events'),
    inherits = window.jsforce.require('inherits'),
    _ = window.jsforce.require('lodash/core'),
    Faye   = require('faye'),
    StreamingExtension = require('./streaming-extension'),
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
 * Subscribe to channel
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
Streaming.prototype._createClient = function(forChannelName, extensions) {
  // forChannelName is advisory, for an API workaround. It does not restrict or select the channel.
  var needsReplayFix = typeof forChannelName === 'string' && forChannelName.indexOf('/u/') === 0;
  var endpointUrl = [
    this._conn.instanceUrl,
    // special endpoint "/cometd/replay/xx.x" is only available in 36.0.
    // See https://releasenotes.docs.salesforce.com/en-us/summer16/release-notes/rn_api_streaming_classic_replay.htm
    "cometd" + (needsReplayFix === true && this._conn.version === "36.0" ? "/replay" : ""),
    this._conn.version
  ].join('/');
  var fayeClient = new Faye.Client(endpointUrl, {});
  fayeClient.setHeader('Authorization', 'OAuth '+this._conn.accessToken);
  if (extensions instanceof Array) {
    extensions.forEach(function(extension) {
      fayeClient.addExtension(extension);
    });
  }
  if (fayeClient._dispatcher.getConnectionTypes().indexOf('callback-polling') === -1) {
    // prevent streaming API server error
    fayeClient._dispatcher.selectTransport('long-polling');
    fayeClient._dispatcher._transport.batching = false;
  }
  return fayeClient;
};

/** @private **/
Streaming.prototype._getFayeClient = function(channelName) {
  var isGeneric = channelName.indexOf('/u/') === 0;
  var clientType = isGeneric ? 'generic' : 'pushTopic';
  if (!this._fayeClients || !this._fayeClients[clientType]) {
    this._fayeClients = this._fayeClients || {};
    this._fayeClients[clientType] = this._createClient(channelName);
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


/**
 * Create a Streaming client, optionally with extensions
 *
 * See Faye docs for implementation details: https://faye.jcoglan.com/browser/extensions.html
 *
 * Example usage:
 * 
 * ```javascript
 * // Establish a Salesforce connection. (Details elided)
 * const conn = new jsforce.Connection({ … });
 * 
 * const fayeClient = conn.streaming.createClient();
 * 
 * const subscription = fayeClient.subscribe(channel, data => {
 *   console.log('topic received data', data);
 * });
 * 
 * subscription.cancel();
 * ```
 * 
 * Example with extensions, using Replay & Auth Failure extensions in a server-side Node.js app:
 * 
 * ```javascript
 * // Establish a Salesforce connection. (Details elided)
 * const conn = new jsforce.Connection({ … });
 * 
 * const channel = "/event/My_Event__e";
 * const replayId = -2; // -2 is all retained events
 * 
 * const exitCallback = () => process.exit(1);
 * const authFailureExt = new jsforce.StreamingExtension.AuthFailure(exitCallback);
 * 
 * const replayExt = new jsforce.StreamingExtension.Replay(channel, replayId);
 * 
 * const fayeClient = conn.streaming.createClient([
 *   authFailureExt,
 *   replayExt
 * ]);
 * 
 * const subscription = fayeClient.subscribe(channel, data => {
 *   console.log('topic received data', data);
 * });
 * 
 * subscription.cancel();
 * ```
 * 
 * @param {Array} Extensions - Optional, extensions to apply to the Faye client
 * @returns {FayeClient} - Faye client object
 */
Streaming.prototype.createClient = function(extensions) {
  return this._createClient(null, extensions);
};

/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.streaming = new Streaming(conn);
});

/*
 * 
 */
jsforce.StreamingExtension = StreamingExtension;

module.exports = Streaming;

},{"./streaming-extension":1,"faye":5}],3:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":4}],4:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
'use strict';

var constants = require('./util/constants'),
    Logging   = require('./mixins/logging');

var Faye = {
  VERSION:    constants.VERSION,

  Client:     require('./protocol/client'),
  Scheduler:  require('./protocol/scheduler')
};

Logging.wrapper = Faye;

module.exports = Faye;

},{"./mixins/logging":7,"./protocol/client":11,"./protocol/scheduler":17,"./util/constants":29}],6:[function(require,module,exports){
(function (global){
'use strict';

var Promise   = require('../util/promise');

module.exports = {
  then: function(callback, errback) {
    var self = this;
    if (!this._promise)
      this._promise = new Promise(function(resolve, reject) {
        self._resolve = resolve;
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
    this._timer = global.setTimeout(function() {
      self._reject(message);
    }, seconds * 1000);
  },

  setDeferredStatus: function(status, value) {
    if (this._timer) global.clearTimeout(this._timer);

    this.then();

    if (status === 'succeeded')
      this._resolve(value);
    else if (status === 'failed')
      this._reject(value);
    else
      delete this._promise;
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/promise":34}],7:[function(require,module,exports){
'use strict';

var toJSON = require('../util/to_json');

var Logging = {
  LOG_LEVELS: {
    fatal:  4,
    error:  3,
    warn:   2,
    info:   1,
    debug:  0
  },

  writeLog: function(messageArgs, level) {
    var logger = Logging.logger || (Logging.wrapper || Logging).logger;
    if (!logger) return;

    var args   = Array.prototype.slice.apply(messageArgs),
        banner = '[Faye',
        klass  = this.className,

        message = args.shift().replace(/\?/g, function() {
          try {
            return toJSON(args.shift());
          } catch (error) {
            return '[Object]';
          }
        });

    if (klass) banner += '.' + klass;
    banner += '] ';

    if (typeof logger[level] === 'function')
      logger[level](banner + message);
    else if (typeof logger === 'function')
      logger(banner + message);
  }
};

for (var key in Logging.LOG_LEVELS)
  (function(level) {
    Logging[level] = function() {
      this.writeLog(arguments, level);
    };
  })(key);

module.exports = Logging;

},{"../util/to_json":36}],8:[function(require,module,exports){
'use strict';

var extend       = require('../util/extend'),
    EventEmitter = require('../util/event_emitter');

var Publisher = {
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

extend(Publisher, EventEmitter.prototype);
Publisher.trigger = Publisher.emit;

module.exports = Publisher;

},{"../util/event_emitter":32,"../util/extend":33}],9:[function(require,module,exports){
(function (global){
'use strict';

module.exports = {
  addTimeout: function(name, delay, callback, context) {
    this._timeouts = this._timeouts || {};
    if (this._timeouts.hasOwnProperty(name)) return;
    var self = this;
    this._timeouts[name] = global.setTimeout(function() {
      delete self._timeouts[name];
      callback.call(context);
    }, 1000 * delay);
  },

  removeTimeout: function(name) {
    this._timeouts = this._timeouts || {};
    var timeout = this._timeouts[name];
    if (!timeout) return;
    global.clearTimeout(timeout);
    delete this._timeouts[name];
  },

  removeAllTimeouts: function() {
    this._timeouts = this._timeouts || {};
    for (var name in this._timeouts) this.removeTimeout(name);
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
'use strict';

var Class     = require('../util/class'),
    extend    = require('../util/extend'),
    Publisher = require('../mixins/publisher'),
    Grammar   = require('./grammar');

var Channel = Class({
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

extend(Channel.prototype, Publisher);

extend(Channel, {
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
    return Grammar.CHANNEL_NAME.test(name) ||
           Grammar.CHANNEL_PATTERN.test(name);
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

  Set: Class({
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

    subscribe: function(names, subscription) {
      var name;
      for (var i = 0, n = names.length; i < n; i++) {
        name = names[i];
        var channel = this._channels[name] = this._channels[name] || new Channel(name);
        channel.bind('message', subscription);
      }
    },

    unsubscribe: function(name, subscription) {
      var channel = this._channels[name];
      if (!channel) return false;
      channel.unbind('message', subscription);

      if (channel.isUnused()) {
        this.remove(name);
        return true;
      } else {
        return false;
      }
    },

    distributeMessage: function(message) {
      var channels = Channel.expand(message.channel);

      for (var i = 0, n = channels.length; i < n; i++) {
        var channel = this._channels[channels[i]];
        if (channel) channel.trigger('message', message);
      }
    }
  })
});

module.exports = Channel;

},{"../mixins/publisher":8,"../util/class":28,"../util/extend":33,"./grammar":15}],11:[function(require,module,exports){
(function (global){
'use strict';

var asap            = require('asap'),
    Class           = require('../util/class'),
    Promise         = require('../util/promise'),
    URI             = require('../util/uri'),
    array           = require('../util/array'),
    browser         = require('../util/browser'),
    constants       = require('../util/constants'),
    extend          = require('../util/extend'),
    validateOptions = require('../util/validate_options'),
    Deferrable      = require('../mixins/deferrable'),
    Logging         = require('../mixins/logging'),
    Publisher       = require('../mixins/publisher'),
    Channel         = require('./channel'),
    Dispatcher      = require('./dispatcher'),
    Error           = require('./error'),
    Extensible      = require('./extensible'),
    Publication     = require('./publication'),
    Subscription    = require('./subscription');

var Client = Class({ className: 'Client',
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

    validateOptions(options, ['interval', 'timeout', 'endpoints', 'proxy', 'retry', 'scheduler', 'websocketExtensions', 'tls', 'ca']);

    this._channels   = new Channel.Set();
    this._dispatcher = Dispatcher.create(this, endpoint || this.DEFAULT_ENDPOINT, options);

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

    if (browser.Event && global.onbeforeunload !== undefined)
      browser.Event.on(global, 'beforeunload', function() {
        if (array.indexOf(this._dispatcher._disabled, 'autodisconnect') < 0)
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

    this.info('Initiating handshake with ?', URI.stringify(this._dispatcher.endpoint));
    this._dispatcher.selectTransport(constants.MANDATORY_CONNECTION_TYPES);

    this._sendMessage({
      channel:                  Channel.HANDSHAKE,
      version:                  constants.BAYEUX_VERSION,
      supportedConnectionTypes: this._dispatcher.getConnectionTypes()

    }, {}, function(response) {

      if (response.successful) {
        this._state = this.CONNECTED;
        this._dispatcher.clientId  = response.clientId;

        this._dispatcher.selectTransport(response.supportedConnectionTypes);

        this.info('Handshake successful: ?', this._dispatcher.clientId);

        this.subscribe(this._channels.getKeys(), true);
        if (callback) asap(function() { callback.call(context) });

      } else {
        this.info('Handshake unsuccessful');
        global.setTimeout(function() { self.handshake(callback, context) }, this._dispatcher.retry * 1000);
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
      channel:        Channel.CONNECT,
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
    var promise = new Publication();

    this._sendMessage({
      channel:  Channel.DISCONNECT,
      clientId: this._dispatcher.clientId

    }, {}, function(response) {
      if (response.successful) {
        this._dispatcher.close();
        promise.setDeferredStatus('succeeded');
      } else {
        promise.setDeferredStatus('failed', Error.parse(response.error));
      }
    }, this);

    this.info('Clearing channel listeners for ?', this._dispatcher.clientId);
    this._channels = new Channel.Set();

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
      return array.map(channel, function(c) {
        return this.subscribe(c, callback, context);
      }, this);

    var subscription = new Subscription(this, channel, callback, context),
        force        = (callback === true),
        hasSubscribe = this._channels.hasSubscription(channel);

    if (hasSubscribe && !force) {
      this._channels.subscribe([channel], subscription);
      subscription.setDeferredStatus('succeeded');
      return subscription;
    }

    this.connect(function() {
      this.info('Client ? attempting to subscribe to ?', this._dispatcher.clientId, channel);
      if (!force) this._channels.subscribe([channel], subscription);

      this._sendMessage({
        channel:      Channel.SUBSCRIBE,
        clientId:     this._dispatcher.clientId,
        subscription: channel

      }, {}, function(response) {
        if (!response.successful) {
          subscription.setDeferredStatus('failed', Error.parse(response.error));
          return this._channels.unsubscribe(channel, subscription);
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
  unsubscribe: function(channel, subscription) {
    if (channel instanceof Array)
      return array.map(channel, function(c) {
        return this.unsubscribe(c, subscription);
      }, this);

    var dead = this._channels.unsubscribe(channel, subscription);
    if (!dead) return;

    this.connect(function() {
      this.info('Client ? attempting to unsubscribe from ?', this._dispatcher.clientId, channel);

      this._sendMessage({
        channel:      Channel.UNSUBSCRIBE,
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
    validateOptions(options || {}, ['attempts', 'deadline']);
    var publication = new Publication();

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
          publication.setDeferredStatus('failed', Error.parse(response.error));
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
    extend(this._advice, advice);
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
    global.setTimeout(function() { self.connect() }, this._advice.interval);
  }
});

extend(Client.prototype, Deferrable);
extend(Client.prototype, Publisher);
extend(Client.prototype, Logging);
extend(Client.prototype, Extensible);

module.exports = Client;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/deferrable":6,"../mixins/logging":7,"../mixins/publisher":8,"../util/array":26,"../util/browser":27,"../util/class":28,"../util/constants":29,"../util/extend":33,"../util/promise":34,"../util/uri":37,"../util/validate_options":38,"./channel":10,"./dispatcher":12,"./error":13,"./extensible":14,"./publication":16,"./subscription":18,"asap":3}],12:[function(require,module,exports){
(function (global){
'use strict';

var Class     = require('../util/class'),
    URI       = require('../util/uri'),
    cookies   = require('../util/cookies'),
    extend    = require('../util/extend'),
    Logging   = require('../mixins/logging'),
    Publisher = require('../mixins/publisher'),
    Transport = require('../transport'),
    Scheduler = require('./scheduler');

var Dispatcher = Class({ className: 'Dispatcher',
  MAX_REQUEST_SIZE: 2048,
  DEFAULT_RETRY:    5,

  UP:   1,
  DOWN: 2,

  initialize: function(client, endpoint, options) {
    this._client     = client;
    this.endpoint    = URI.parse(endpoint);
    this._alternates = options.endpoints || {};

    this.cookies      = cookies.CookieJar && new cookies.CookieJar();
    this._disabled    = [];
    this._envelopes   = {};
    this.headers      = {};
    this.retry        = options.retry || this.DEFAULT_RETRY;
    this._scheduler   = options.scheduler || Scheduler;
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
      this._alternates[type] = URI.parse(this._alternates[type]);

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
    return Transport.getConnectionTypes();
  },

  selectTransport: function(transportTypes) {
    Transport.get(this, transportTypes, this._disabled, function(transport) {
      this.debug('Selected ? transport for ?', transport.connectionType, URI.stringify(transport.endpoint));

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

    envelope.timer = global.setTimeout(function() {
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
      global.clearTimeout(envelope.timer);
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

    global.clearTimeout(envelope.timer);
    envelope.request = envelope.timer = null;

    if (immediate) {
      this._sendEnvelope(envelope);
    } else {
      envelope.timer = global.setTimeout(function() {
        envelope.timer = null;
        self._sendEnvelope(envelope);
      }, scheduler.getInterval() * 1000);
    }

    if (this._state === this.DOWN) return;
    this._state = this.DOWN;
    this._client.trigger('transport:down');
  }
});

Dispatcher.create = function(client, endpoint, options) {
  return new Dispatcher(client, endpoint, options);
};

extend(Dispatcher.prototype, Publisher);
extend(Dispatcher.prototype, Logging);

module.exports = Dispatcher;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/logging":7,"../mixins/publisher":8,"../transport":19,"../util/class":28,"../util/cookies":30,"../util/extend":33,"../util/uri":37,"./scheduler":17}],13:[function(require,module,exports){
'use strict';

var Class   = require('../util/class'),
    Grammar = require('./grammar');

var Error = Class({
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

Error.parse = function(message) {
  message = message || '';
  if (!Grammar.ERROR.test(message)) return new Error(null, [], message);

  var parts   = message.split(':'),
      code    = parseInt(parts[0]),
      params  = parts[1].split(','),
      message = parts[2];

  return new Error(code, params, message);
};

// http://code.google.com/p/cometd/wiki/BayeuxCodes
var errors = {
  versionMismatch:  [300, 'Version mismatch'],
  conntypeMismatch: [301, 'Connection types not supported'],
  extMismatch:      [302, 'Extension mismatch'],
  badRequest:       [400, 'Bad request'],
  clientUnknown:    [401, 'Unknown client'],
  parameterMissing: [402, 'Missing required parameter'],
  channelForbidden: [403, 'Forbidden channel'],
  channelUnknown:   [404, 'Unknown channel'],
  channelInvalid:   [405, 'Invalid channel'],
  extUnknown:       [406, 'Unknown extension'],
  publishFailed:    [407, 'Failed to publish'],
  serverError:      [500, 'Internal server error']
};

for (var name in errors)
  (function(name) {
    Error[name] = function() {
      return new Error(errors[name][0], arguments, errors[name][1]).toString();
    };
  })(name);

module.exports = Error;

},{"../util/class":28,"./grammar":15}],14:[function(require,module,exports){
'use strict';

var extend  = require('../util/extend'),
    Logging = require('../mixins/logging');

var Extensible = {
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

extend(Extensible, Logging);

module.exports = Extensible;

},{"../mixins/logging":7,"../util/extend":33}],15:[function(require,module,exports){
'use strict';

module.exports = {
  CHANNEL_NAME:     /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
  CHANNEL_PATTERN:  /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
  ERROR:            /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
  VERSION:          /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
};

},{}],16:[function(require,module,exports){
'use strict';

var Class      = require('../util/class'),
    Deferrable = require('../mixins/deferrable');

module.exports = Class(Deferrable);

},{"../mixins/deferrable":6,"../util/class":28}],17:[function(require,module,exports){
'use strict';

var extend = require('../util/extend');

var Scheduler = function(message, options) {
  this.message  = message;
  this.options  = options;
  this.attempts = 0;
};

extend(Scheduler.prototype, {
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

module.exports = Scheduler;

},{"../util/extend":33}],18:[function(require,module,exports){
'use strict';

var Class      = require('../util/class'),
    extend     = require('../util/extend'),
    Deferrable = require('../mixins/deferrable');

var Subscription = Class({
  initialize: function(client, channels, callback, context) {
    this._client    = client;
    this._channels  = channels;
    this._callback  = callback;
    this._context   = context;
    this._cancelled = false;
  },

  withChannel: function(callback, context) {
    this._withChannel = [callback, context];
    return this;
  },

  apply: function(context, args) {
    var message = args[0];

    if (this._callback)
      this._callback.call(this._context, message.data);

    if (this._withChannel)
      this._withChannel[0].call(this._withChannel[1], message.channel, message.data);
  },

  cancel: function() {
    if (this._cancelled) return;
    this._client.unsubscribe(this._channels, this);
    this._cancelled = true;
  },

  unsubscribe: function() {
    this.cancel();
  }
});

extend(Subscription.prototype, Deferrable);

module.exports = Subscription;

},{"../mixins/deferrable":6,"../util/class":28,"../util/extend":33}],19:[function(require,module,exports){
'use strict';

var Transport = require('./transport');

Transport.register('websocket', require('./web_socket'));
Transport.register('eventsource', require('./event_source'));
Transport.register('long-polling', require('./xhr'));
Transport.register('cross-origin-long-polling', require('./cors'));
Transport.register('callback-polling', require('./jsonp'));

module.exports = Transport;

},{"./cors":20,"./event_source":21,"./jsonp":22,"./transport":23,"./web_socket":24,"./xhr":25}],20:[function(require,module,exports){
(function (global){
'use strict';

var Class     = require('../util/class'),
    Set       = require('../util/set'),
    URI       = require('../util/uri'),
    extend    = require('../util/extend'),
    toJSON    = require('../util/to_json'),
    Transport = require('./transport');

var CORS = extend(Class(Transport, {
  encode: function(messages) {
    return 'message=' + encodeURIComponent(toJSON(messages));
  },

  request: function(messages) {
    var xhrClass = global.XDomainRequest ? XDomainRequest : XMLHttpRequest,
        xhr      = new xhrClass(),
        id       = ++CORS._id,
        headers  = this._dispatcher.headers,
        self     = this,
        key;

    xhr.open('POST', URI.stringify(this.endpoint), true);

    if (xhr.setRequestHeader) {
      xhr.setRequestHeader('Pragma', 'no-cache');
      for (key in headers) {
        if (!headers.hasOwnProperty(key)) continue;
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    var cleanUp = function() {
      if (!xhr) return false;
      CORS._pending.remove(id);
      xhr.onload = xhr.onerror = xhr.ontimeout = xhr.onprogress = null;
      xhr = null;
    };

    xhr.onload = function() {
      var replies;
      try { replies = JSON.parse(xhr.responseText) } catch (error) {}

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

    if (xhrClass === global.XDomainRequest)
      CORS._pending.add({id: id, xhr: xhr});

    xhr.send(this.encode(messages));
    return xhr;
  }
}), {
  _id:      0,
  _pending: new Set(),

  isUsable: function(dispatcher, endpoint, callback, context) {
    if (URI.isSameOrigin(endpoint))
      return callback.call(context, false);

    if (global.XDomainRequest)
      return callback.call(context, endpoint.protocol === location.protocol);

    if (global.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
      return callback.call(context, xhr.withCredentials !== undefined);
    }
    return callback.call(context, false);
  }
});

module.exports = CORS;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/class":28,"../util/extend":33,"../util/set":35,"../util/to_json":36,"../util/uri":37,"./transport":23}],21:[function(require,module,exports){
(function (global){
'use strict';

var Class      = require('../util/class'),
    URI        = require('../util/uri'),
    copyObject = require('../util/copy_object'),
    extend     = require('../util/extend'),
    Deferrable = require('../mixins/deferrable'),
    Transport  = require('./transport'),
    XHR        = require('./xhr');

var EventSource = extend(Class(Transport, {
  initialize: function(dispatcher, endpoint) {
    Transport.prototype.initialize.call(this, dispatcher, endpoint);
    if (!global.EventSource) return this.setDeferredStatus('failed');

    this._xhr = new XHR(dispatcher, endpoint);

    endpoint = copyObject(endpoint);
    endpoint.pathname += '/' + dispatcher.clientId;

    var socket = new global.EventSource(URI.stringify(endpoint)),
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
      var replies;
      try { replies = JSON.parse(event.data) } catch (error) {}

      if (replies)
        self._receive(replies);
      else
        self._handleError([]);
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

    XHR.isUsable(dispatcher, endpoint, function(usable) {
      if (!usable) return callback.call(context, false);
      this.create(dispatcher, endpoint).isUsable(callback, context);
    }, this);
  },

  create: function(dispatcher, endpoint) {
    var sockets = dispatcher.transports.eventsource = dispatcher.transports.eventsource || {},
        id      = dispatcher.clientId;

    var url = copyObject(endpoint);
    url.pathname += '/' + (id || '');
    url = URI.stringify(url);

    sockets[url] = sockets[url] || new this(dispatcher, endpoint);
    return sockets[url];
  }
});

extend(EventSource.prototype, Deferrable);

module.exports = EventSource;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/deferrable":6,"../util/class":28,"../util/copy_object":31,"../util/extend":33,"../util/uri":37,"./transport":23,"./xhr":25}],22:[function(require,module,exports){
(function (global){
'use strict';

var Class      = require('../util/class'),
    URI        = require('../util/uri'),
    copyObject = require('../util/copy_object'),
    extend     = require('../util/extend'),
    toJSON     = require('../util/to_json'),
    Transport  = require('./transport');

var JSONP = extend(Class(Transport, {
 encode: function(messages) {
    var url = copyObject(this.endpoint);
    url.query.message = toJSON(messages);
    url.query.jsonp   = '__jsonp' + JSONP._cbCount + '__';
    return URI.stringify(url);
  },

  request: function(messages) {
    var head         = document.getElementsByTagName('head')[0],
        script       = document.createElement('script'),
        callbackName = JSONP.getCallbackName(),
        endpoint     = copyObject(this.endpoint),
        self         = this;

    endpoint.query.message = toJSON(messages);
    endpoint.query.jsonp   = callbackName;

    var cleanup = function() {
      if (!global[callbackName]) return false;
      global[callbackName] = undefined;
      try { delete global[callbackName] } catch (error) {}
      script.parentNode.removeChild(script);
    };

    global[callbackName] = function(replies) {
      cleanup();
      self._receive(replies);
    };

    script.type = 'text/javascript';
    script.src  = URI.stringify(endpoint);
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

module.exports = JSONP;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/class":28,"../util/copy_object":31,"../util/extend":33,"../util/to_json":36,"../util/uri":37,"./transport":23}],23:[function(require,module,exports){
(function (process){
'use strict';

var Class    = require('../util/class'),
    Cookie   = require('../util/cookies').Cookie,
    Promise  = require('../util/promise'),
    URI      = require('../util/uri'),
    array    = require('../util/array'),
    extend   = require('../util/extend'),
    Logging  = require('../mixins/logging'),
    Timeouts = require('../mixins/timeouts'),
    Channel  = require('../protocol/channel');

var Transport = extend(Class({ className: 'Transport',
  DEFAULT_PORTS: {'http:': 80, 'https:': 443, 'ws:': 80, 'wss:': 443},
  MAX_DELAY:     0,

  batching:  true,

  initialize: function(dispatcher, endpoint) {
    this._dispatcher = dispatcher;
    this.endpoint    = endpoint;
    this._outbox     = [];
    this._proxy      = extend({}, this._dispatcher.proxy);

    if (!this._proxy.origin)
      this._proxy.origin = this._findProxy();
  },

  close: function() {},

  encode: function(messages) {
    return '';
  },

  sendMessage: function(message) {
    this.debug('Client ? sending message to ?: ?',
               this._dispatcher.clientId, URI.stringify(this.endpoint), message);

    if (!this.batching) return Promise.resolve(this.request([message]));

    this._outbox.push(message);
    this._flushLargeBatch();

    if (message.channel === Channel.HANDSHAKE)
      return this._publish(0.01);

    if (message.channel === Channel.CONNECT)
      this._connectMessage = message;

    return this._publish(this.MAX_DELAY);
  },

  _makePromise: function() {
    var self = this;

    this._requestPromise = this._requestPromise || new Promise(function(resolve) {
      self._resolvePromise = resolve;
    });
  },

  _publish: function(delay) {
    this._makePromise();

    this.addTimeout('publish', delay, function() {
      this._flush();
      delete this._requestPromise;
    }, this);

    return this._requestPromise;
  },

  _flush: function() {
    this.removeTimeout('publish');

    if (this._outbox.length > 1 && this._connectMessage)
      this._connectMessage.advice = {timeout: 0};

    this._resolvePromise(this.request(this._outbox));

    this._connectMessage = null;
    this._outbox = [];
  },

  _flushLargeBatch: function() {
    var string = this.encode(this._outbox);
    if (string.length < this._dispatcher.maxRequestSize) return;
    var last = this._outbox.pop();

    this._makePromise();
    this._flush();

    if (last) this._outbox.push(last);
  },

  _receive: function(replies) {
    if (!replies) return;
    replies = [].concat(replies);

    this.debug('Client ? received from ? via ?: ?',
               this._dispatcher.clientId, URI.stringify(this.endpoint), this.connectionType, replies);

    for (var i = 0, n = replies.length; i < n; i++)
      this._dispatcher.handleResponse(replies[i]);
  },

  _handleError: function(messages, immediate) {
    messages = [].concat(messages);

    this.debug('Client ? failed to send to ? via ?: ?',
               this._dispatcher.clientId, URI.stringify(this.endpoint), this.connectionType, messages);

    for (var i = 0, n = messages.length; i < n; i++)
      this._dispatcher.handleError(messages[i]);
  },

  _getCookies: function() {
    var cookies = this._dispatcher.cookies,
        url     = URI.stringify(this.endpoint);

    if (!cookies) return '';

    return array.map(cookies.getCookiesSync(url), function(cookie) {
      return cookie.cookieString();
    }).join('; ');
  },

  _storeCookies: function(setCookie) {
    var cookies = this._dispatcher.cookies,
        url     = URI.stringify(this.endpoint),
        cookie;

    if (!setCookie || !cookies) return;
    setCookie = [].concat(setCookie);

    for (var i = 0, n = setCookie.length; i < n; i++) {
      cookie = Cookie.parse(setCookie[i]);
      cookies.setCookieSync(cookie, url);
    }
  },

  _findProxy: function() {
    if (typeof process === 'undefined') return undefined;

    var protocol = this.endpoint.protocol;
    if (!protocol) return undefined;

    var name   = protocol.replace(/:$/, '').toLowerCase() + '_proxy',
        upcase = name.toUpperCase(),
        env    = process.env,
        keys, proxy;

    if (name === 'http_proxy' && env.REQUEST_METHOD) {
      keys = Object.keys(env).filter(function(k) { return /^http_proxy$/i.test(k) });
      if (keys.length === 1) {
        if (keys[0] === name && env[upcase] === undefined)
          proxy = env[name];
      } else if (keys.length > 1) {
        proxy = env[name];
      }
      proxy = proxy || env['CGI_' + upcase];
    } else {
      proxy = env[name] || env[upcase];
      if (proxy && !env[name])
        console.warn('The environment variable ' + upcase +
                     ' is discouraged. Use ' + name + '.');
    }
    return proxy;
  }

}), {
  get: function(dispatcher, allowed, disabled, callback, context) {
    var endpoint = dispatcher.endpoint;

    array.asyncEach(this._transports, function(pair, resume) {
      var connType     = pair[0], klass = pair[1],
          connEndpoint = dispatcher.endpointFor(connType);

      if (array.indexOf(disabled, connType) >= 0)
        return resume();

      if (array.indexOf(allowed, connType) < 0) {
        klass.isUsable(dispatcher, connEndpoint, function() {});
        return resume();
      }

      klass.isUsable(dispatcher, connEndpoint, function(isUsable) {
        if (!isUsable) return resume();
        var transport = klass.hasOwnProperty('create') ? klass.create(dispatcher, connEndpoint) : new klass(dispatcher, connEndpoint);
        callback.call(context, transport);
      });
    }, function() {
      throw new Error('Could not find a usable connection type for ' + URI.stringify(endpoint));
    });
  },

  register: function(type, klass) {
    this._transports.push([type, klass]);
    klass.prototype.connectionType = type;
  },

  getConnectionTypes: function() {
    return array.map(this._transports, function(t) { return t[0] });
  },

  _transports: []
});

extend(Transport.prototype, Logging);
extend(Transport.prototype, Timeouts);

module.exports = Transport;

}).call(this,require('_process'))

},{"../mixins/logging":7,"../mixins/timeouts":9,"../protocol/channel":10,"../util/array":26,"../util/class":28,"../util/cookies":30,"../util/extend":33,"../util/promise":34,"../util/uri":37,"_process":40}],24:[function(require,module,exports){
(function (global){
'use strict';

var Class      = require('../util/class'),
    Promise    = require('../util/promise'),
    Set        = require('../util/set'),
    URI        = require('../util/uri'),
    browser    = require('../util/browser'),
    copyObject = require('../util/copy_object'),
    extend     = require('../util/extend'),
    toJSON     = require('../util/to_json'),
    ws         = require('../util/websocket'),
    Deferrable = require('../mixins/deferrable'),
    Transport  = require('./transport');

var WebSocket = extend(Class(Transport, {
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
    this._pending = this._pending || new Set();
    for (var i = 0, n = messages.length; i < n; i++) this._pending.add(messages[i]);

    var self = this;

    var promise = new Promise(function(resolve, reject) {
      self.callback(function(socket) {
        if (!socket || socket.readyState !== 1) return;
        socket.send(toJSON(messages));
        resolve(socket);
      });

      self.connect();
    });

    return {
      abort: function() { promise.then(function(ws) { ws.close() }) }
    };
  },

  connect: function() {
    if (WebSocket._unloaded) return;

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

      var pending = self._pending ? self._pending.toArray() : [];
      delete self._pending;

      if (wasConnected || self._everConnected) {
        self.setDeferredStatus('unknown');
        self._handleError(pending, wasConnected);
      } else {
        self.setDeferredStatus('failed');
      }
    };

    socket.onmessage = function(event) {
      var replies;
      try { replies = JSON.parse(event.data) } catch (error) {}

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
    var url        = WebSocket.getSocketUrl(this.endpoint),
        headers    = this._dispatcher.headers,
        extensions = this._dispatcher.wsExtensions,
        cookie     = this._getCookies(),
        tls        = this._dispatcher.tls,
        options    = {extensions: extensions, headers: headers, proxy: this._proxy, tls: tls};

    if (cookie !== '') options.headers['Cookie'] = cookie;

    return ws.create(url, [], options);
  },

  _ping: function() {
    if (!this._socket || this._socket.readyState !== 1) return;
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
    endpoint = copyObject(endpoint);
    endpoint.protocol = this.PROTOCOLS[endpoint.protocol];
    return URI.stringify(endpoint);
  },

  isUsable: function(dispatcher, endpoint, callback, context) {
    this.create(dispatcher, endpoint).isUsable(callback, context);
  }
});

extend(WebSocket.prototype, Deferrable);

if (browser.Event && global.onbeforeunload !== undefined)
  browser.Event.on(global, 'beforeunload', function() { WebSocket._unloaded = true });

module.exports = WebSocket;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/deferrable":6,"../util/browser":27,"../util/class":28,"../util/copy_object":31,"../util/extend":33,"../util/promise":34,"../util/set":35,"../util/to_json":36,"../util/uri":37,"../util/websocket":39,"./transport":23}],25:[function(require,module,exports){
(function (global){
'use strict';

var Class     = require('../util/class'),
    URI       = require('../util/uri'),
    browser   = require('../util/browser'),
    extend    = require('../util/extend'),
    toJSON    = require('../util/to_json'),
    Transport = require('./transport');

var XHR = extend(Class(Transport, {
  encode: function(messages) {
    return toJSON(messages);
  },

  request: function(messages) {
    var href = this.endpoint.href,
        self = this,
        xhr;

    // Prefer XMLHttpRequest over ActiveXObject if they both exist
    if (global.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (global.ActiveXObject) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      return this._handleError(messages);
    }

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
    if (global.onbeforeunload !== undefined)
      browser.Event.on(global, 'beforeunload', abort);

    xhr.onreadystatechange = function() {
      if (!xhr || xhr.readyState !== 4) return;

      var replies    = null,
          status     = xhr.status,
          text       = xhr.responseText,
          successful = (status >= 200 && status < 300) || status === 304 || status === 1223;

      if (global.onbeforeunload !== undefined)
        browser.Event.detach(global, 'beforeunload', abort);

      xhr.onreadystatechange = function() {};
      xhr = null;

      if (!successful) return self._handleError(messages);

      try {
        replies = JSON.parse(text);
      } catch (error) {}

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
    var usable = (navigator.product === 'ReactNative')
              || URI.isSameOrigin(endpoint);

    callback.call(context, usable);
  }
});

module.exports = XHR;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../util/browser":27,"../util/class":28,"../util/extend":33,"../util/to_json":36,"../util/uri":37,"./transport":23}],26:[function(require,module,exports){
'use strict';

module.exports = {
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
  }
};

},{}],27:[function(require,module,exports){
(function (global){
'use strict';

var Event = {
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

      if ((element    && element    !== register._element)  ||
          (eventName  && eventName  !== register._type)     ||
          (callback   && callback   !== register._callback) ||
          (context    && context    !== register._context))
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

if (global.onunload !== undefined)
  Event.on(global, 'unload', Event.detach, Event);

module.exports = {
  Event: Event
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],28:[function(require,module,exports){
'use strict';

var extend = require('./extend');

module.exports = function(parent, methods) {
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
  extend(klass.prototype, methods);

  return klass;
};

},{"./extend":33}],29:[function(require,module,exports){
module.exports = {
  VERSION:          '1.2.4',

  BAYEUX_VERSION:   '1.0',
  ID_LENGTH:        160,
  JSONP_CALLBACK:   'jsonpcallback',
  CONNECTION_TYPES: ['long-polling', 'cross-origin-long-polling', 'callback-polling', 'websocket', 'eventsource', 'in-process'],

  MANDATORY_CONNECTION_TYPES: ['long-polling', 'callback-polling', 'in-process']
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = {};

},{}],31:[function(require,module,exports){
'use strict';

var copyObject = function(object) {
  var clone, i, key;
  if (object instanceof Array) {
    clone = [];
    i = object.length;
    while (i--) clone[i] = copyObject(object[i]);
    return clone;
  } else if (typeof object === 'object') {
    clone = (object === null) ? null : {};
    for (key in object) clone[key] = copyObject(object[key]);
    return clone;
  } else {
    return object;
  }
};

module.exports = copyObject;

},{}],32:[function(require,module,exports){
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

function EventEmitter() {}
module.exports = EventEmitter;

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

},{}],33:[function(require,module,exports){
'use strict';

module.exports = function(dest, source, overwrite) {
  if (!source) return dest;
  for (var key in source) {
    if (!source.hasOwnProperty(key)) continue;
    if (dest.hasOwnProperty(key) && overwrite === false) continue;
    if (dest[key] !== source[key])
      dest[key] = source[key];
  }
  return dest;
};

},{}],34:[function(require,module,exports){
'use strict';

var asap = require('asap');

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

  task(function(value)  { resolve(self, value) },
       function(reason) { reject(self, reason) });
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var next = new Promise();
  registerOnFulfilled(this, onFulfilled, next);
  registerOnRejected(this, onRejected, next);
  return next;
};

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
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
  asap(function() { _invoke(fn, value, next) });
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
    resolve(next, outcome);
  }
};

var resolve = function(promise, value) {
  var called = false, type, then;

  try {
    type = typeof value;
    then = value !== null && (type === 'function' || type === 'object') && value.then;

    if (typeof then !== 'function') return fulfill(promise, value);

    then.call(value, function(v) {
      if (!(called ^ (called = true))) return;
      resolve(promise, v);
    }, function(r) {
      if (!(called ^ (called = true))) return;
      reject(promise, r);
    });
  } catch (error) {
    if (!(called ^ (called = true))) return;
    reject(promise, error);
  }
};

var fulfill = function(promise, value) {
  if (promise._state !== PENDING) return;

  promise._state      = FULFILLED;
  promise._value      = value;
  promise._onRejected = [];

  var onFulfilled = promise._onFulfilled, fn;
  while (fn = onFulfilled.shift()) fn(value);
};

var reject = function(promise, reason) {
  if (promise._state !== PENDING) return;

  promise._state       = REJECTED;
  promise._reason      = reason;
  promise._onFulfilled = [];

  var onRejected = promise._onRejected, fn;
  while (fn = onRejected.shift()) fn(reason);
};

Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) { resolve(value) });
};

Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) { reject(reason) });
};

Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    var list = [], n = promises.length, i;

    if (n === 0) return resolve(list);

    for (i = 0; i < n; i++) (function(promise, i) {
      Promise.resolve(promise).then(function(value) {
        list[i] = value;
        if (--n === 0) resolve(list);
      }, reject);
    })(promises[i], i);
  });
};

Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, n = promises.length; i < n; i++)
      Promise.resolve(promises[i]).then(resolve, reject);
  });
};

Promise.deferred = Promise.pending = function() {
  var tuple = {};

  tuple.promise = new Promise(function(resolve, reject) {
    tuple.resolve = resolve;
    tuple.reject  = reject;
  });
  return tuple;
};

module.exports = Promise;

},{"asap":3}],35:[function(require,module,exports){
'use strict';

var Class = require('./class');

module.exports = Class({
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

},{"./class":28}],36:[function(require,module,exports){
'use strict';

// http://assanka.net/content/tech/2009/09/02/json2-js-vs-prototype/

module.exports = function(object) {
  return JSON.stringify(object, function(key, value) {
    return (this[key] instanceof Array) ? this[key] : value;
  });
};

},{}],37:[function(require,module,exports){
'use strict';

module.exports = {
  isURI: function(uri) {
    return uri && uri.protocol && uri.host && uri.path;
  },

  isSameOrigin: function(uri) {
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
      url = location.pathname.replace(/[^\/]*$/, '') + url;

    consume('pathname', /^[^\?#]*/);
    consume('search',   /^\?[^#]*/);
    consume('hash',     /^#.*/);

    uri.protocol = uri.protocol || location.protocol;

    if (uri.host) {
      uri.host     = uri.host.substr(2);
      parts        = uri.host.split(':');
      uri.hostname = parts[0];
      uri.port     = parts[1] || '';
    } else {
      uri.host     = location.host;
      uri.hostname = location.hostname;
      uri.port     = location.port;
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

},{}],38:[function(require,module,exports){
'use strict';

var array = require('./array');

module.exports = function(options, validKeys) {
  for (var key in options) {
    if (array.indexOf(validKeys, key) < 0)
      throw new Error('Unrecognized option: ' + key);
  }
};

},{"./array":26}],39:[function(require,module,exports){
(function (global){
'use strict';

var WS = global.MozWebSocket || global.WebSocket;

module.exports = {
  create: function(url, protocols, options) {
    if (typeof WS !== 'function') return null;
    return new WS(url);
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],40:[function(require,module,exports){
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

},{}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3N0cmVhbWluZy1leHRlbnNpb24uanMiLCJsaWIvYXBpL3N0cmVhbWluZy5qcyIsIm5vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItYXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItcmF3LmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL2ZheWVfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9taXhpbnMvZGVmZXJyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9taXhpbnMvbG9nZ2luZy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9taXhpbnMvcHVibGlzaGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL21peGlucy90aW1lb3V0cy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9jaGFubmVsLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3Byb3RvY29sL2NsaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9kaXNwYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3Byb3RvY29sL2Vycm9yLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3Byb3RvY29sL2V4dGVuc2libGUuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvcHJvdG9jb2wvZ3JhbW1hci5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9wdWJsaWNhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9zY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvcHJvdG9jb2wvc3Vic2NyaXB0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3RyYW5zcG9ydC9icm93c2VyX3RyYW5zcG9ydHMuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdHJhbnNwb3J0L2NvcnMuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdHJhbnNwb3J0L2V2ZW50X3NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy90cmFuc3BvcnQvanNvbnAuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdHJhbnNwb3J0L3RyYW5zcG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy90cmFuc3BvcnQvd2ViX3NvY2tldC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy90cmFuc3BvcnQveGhyLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9icm93c2VyL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9jb29raWVzL2Jyb3dzZXJfY29va2llcy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL2NvcHlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvZXZlbnRfZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL2V4dGVuZC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9zZXQuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC90b19qc29uLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvdXJpLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvdmFsaWRhdGVfb3B0aW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL3dlYnNvY2tldC9icm93c2VyX3dlYnNvY2tldC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogRmF5ZSBDbGllbnQgZXh0ZW5zaW9uczogaHR0cHM6Ly9mYXllLmpjb2dsYW4uY29tL2Jyb3dzZXIvZXh0ZW5zaW9ucy5odG1sXG4gKlxuICogRm9yIHVzZSB3aXRoIFN0cmVhbWluZy5wcm90b3R5cGUuY3JlYXRlQ2xpZW50KClcbioqL1xudmFyIFN0cmVhbWluZ0V4dGVuc2lvbiA9IHt9O1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIGZvciBhbiBhdXRoIGZhaWx1cmUgZGV0ZWN0b3IgZXh0ZW5zaW9uXG4gKlxuICogQmFzZWQgb24gbmV3IGZlYXR1cmUgcmVsZWFzZWQgd2l0aCBTYWxlc2ZvcmNlIFNwcmluZyAnMTg6XG4gKiBodHRwczovL3JlbGVhc2Vub3Rlcy5kb2NzLnNhbGVzZm9yY2UuY29tL2VuLXVzL3NwcmluZzE4L3JlbGVhc2Utbm90ZXMvcm5fbWVzc2FnaW5nX2NvbWV0ZF9hdXRoX3ZhbGlkYXRpb24uaHRtP2VkaXRpb249JmltcGFjdD1cbiAqXG4gKiBFeGFtcGxlIHRyaWdnZXJpbmcgZXJyb3IgbWVzc2FnZTpcbiAqXG4gKiBgYGBcbiAqIHtcbiAqICAgXCJleHRcIjp7XG4gKiAgICAgXCJzZmRjXCI6e1wiZmFpbHVyZVJlYXNvblwiOlwiNDAxOjpBdXRoZW50aWNhdGlvbiBpbnZhbGlkXCJ9LFxuICogICAgIFwicmVwbGF5XCI6dHJ1ZX0sXG4gKiAgIFwiYWR2aWNlXCI6e1wicmVjb25uZWN0XCI6XCJub25lXCJ9LFxuICogICBcImNoYW5uZWxcIjpcIi9tZXRhL2hhbmRzaGFrZVwiLFxuICogICBcImVycm9yXCI6XCI0MDM6OkhhbmRzaGFrZSBkZW5pZWRcIixcbiAqICAgXCJzdWNjZXNzZnVsXCI6ZmFsc2VcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgY29ubiA9IG5ldyBqc2ZvcmNlLkNvbm5lY3Rpb24oeyDigKYgfSk7XG4gKiBcbiAqIGNvbnN0IGNoYW5uZWwgPSBcIi9ldmVudC9NeV9FdmVudF9fZVwiO1xuICogXG4gKiAvLyBFeGl0IHRoZSBOb2RlIHByb2Nlc3Mgd2hlbiBhdXRoIGZhaWxzXG4gKiBjb25zdCBleGl0Q2FsbGJhY2sgPSAoKSA9PiBwcm9jZXNzLmV4aXQoMSk7XG4gKiBjb25zdCBhdXRoRmFpbHVyZUV4dCA9IG5ldyBqc2ZvcmNlLlN0cmVhbWluZ0V4dGVuc2lvbi5BdXRoRmFpbHVyZShleGl0Q2FsbGJhY2spO1xuICogXG4gKiBjb25zdCBmYXllQ2xpZW50ID0gY29ubi5zdHJlYW1pbmcuY3JlYXRlQ2xpZW50KFsgYXV0aEZhaWx1cmVFeHQgXSk7XG4gKiBcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGZheWVDbGllbnQuc3Vic2NyaWJlKGNoYW5uZWwsIGRhdGEgPT4ge1xuICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICogfSk7XG4gKiBcbiAqIHN1YnNjcmlwdGlvbi5jYW5jZWwoKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZhaWx1cmVDYWxsYmFjayAtIEludm9rZWQgd2hlbiBhdXRoZW50aWNhdGlvbiBiZWNvbWVzIGludmFsaWRcbiAqL1xuU3RyZWFtaW5nRXh0ZW5zaW9uLkF1dGhGYWlsdXJlID0gZnVuY3Rpb24oZmFpbHVyZUNhbGxiYWNrKSB7XG4gIHRoaXMuaW5jb21pbmcgPSBmdW5jdGlvbihtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgIGlmIChcbiAgICAgIChtZXNzYWdlLmNoYW5uZWwgPT09ICcvbWV0YS9jb25uZWN0JyB8fFxuICAgICAgICBtZXNzYWdlLmNoYW5uZWwgPT09ICcvbWV0YS9oYW5kc2hha2UnKVxuICAgICAgJiYgbWVzc2FnZS5hZHZpY2VcbiAgICAgICYmIG1lc3NhZ2UuYWR2aWNlLnJlY29ubmVjdCA9PSAnbm9uZSdcbiAgICApIHtcbiAgICAgIGZhaWx1cmVDYWxsYmFjayhtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIGZvciBhIGR1cmFibGUgc3RyZWFtaW5nIHJlcGxheSBleHRlbnNpb25cbiAqXG4gKiBNb2RpZmllZCBmcm9tIG9yaWdpbmFsIFNhbGVzZm9yY2UgZGVtbyBzb3VyY2UgY29kZTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9wZXJmb3JjZS9TYWxlc2ZvcmNlRHVyYWJsZVN0cmVhbWluZ0RlbW8vYmxvYi8zZDRhNTZlYWM5NTZmNzQ0YWQ2YzIyZTZhODE0MWI2ZmViNTdhYmI5L3N0YXRpY3Jlc291cmNlcy9jb21ldGRSZXBsYXlFeHRlbnNpb24ucmVzb3VyY2VcbiAqIFxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjb25uID0gbmV3IGpzZm9yY2UuQ29ubmVjdGlvbih7IOKApiB9KTtcbiAqIFxuICogY29uc3QgY2hhbm5lbCA9IFwiL2V2ZW50L015X0V2ZW50X19lXCI7XG4gKiBjb25zdCByZXBsYXlJZCA9IC0yOyAvLyAtMiBpcyBhbGwgcmV0YWluZWQgZXZlbnRzXG4gKiBcbiAqIGNvbnN0IHJlcGxheUV4dCA9IG5ldyBqc2ZvcmNlLlN0cmVhbWluZ0V4dGVuc2lvbi5SZXBsYXkoY2hhbm5lbCwgcmVwbGF5SWQpO1xuICogXG4gKiBjb25zdCBmYXllQ2xpZW50ID0gY29ubi5zdHJlYW1pbmcuY3JlYXRlQ2xpZW50KFsgcmVwbGF5RXh0IF0pO1xuICogXG4gKiBjb25zdCBzdWJzY3JpcHRpb24gPSBmYXllQ2xpZW50LnN1YnNjcmliZShjaGFubmVsLCBkYXRhID0+IHtcbiAqICAgY29uc29sZS5sb2coJ3RvcGljIHJlY2VpdmVkIGRhdGEnLCBkYXRhKTtcbiAqIH0pO1xuICogXG4gKiBzdWJzY3JpcHRpb24uY2FuY2VsKCk7XG4gKiBgYGBcbiAqL1xuU3RyZWFtaW5nRXh0ZW5zaW9uLlJlcGxheSA9IGZ1bmN0aW9uKGNoYW5uZWwsIHJlcGxheUlkKSB7XG4gIHZhciBSRVBMQVlfRlJPTV9LRVkgPSBcInJlcGxheVwiO1xuICBcbiAgdmFyIF9leHRlbnNpb25FbmFibGVkID0gcmVwbGF5SWQgIT0gbnVsbCA/IHRydWUgOiBmYWxzZTtcbiAgdmFyIF9yZXBsYXkgPSByZXBsYXlJZDtcbiAgdmFyIF9jaGFubmVsID0gY2hhbm5lbDtcblxuICB0aGlzLnNldEV4dGVuc2lvbkVuYWJsZWQgPSBmdW5jdGlvbihleHRlbnNpb25FbmFibGVkKSB7XG4gICAgX2V4dGVuc2lvbkVuYWJsZWQgPSBleHRlbnNpb25FbmFibGVkO1xuICB9XG5cbiAgdGhpcy5zZXRSZXBsYXkgPSBmdW5jdGlvbiAocmVwbGF5KSB7XG4gICAgX3JlcGxheSA9IHBhcnNlSW50KHJlcGxheSwgMTApO1xuICB9XG5cbiAgdGhpcy5zZXRDaGFubmVsID0gZnVuY3Rpb24oY2hhbm5lbCkge1xuICAgIF9jaGFubmVsID0gY2hhbm5lbDtcbiAgfVxuXG4gIHRoaXMuaW5jb21pbmcgPSBmdW5jdGlvbihtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgIGlmIChtZXNzYWdlLmNoYW5uZWwgPT09ICcvbWV0YS9oYW5kc2hha2UnKSB7XG4gICAgICBpZiAobWVzc2FnZS5leHQgJiYgbWVzc2FnZS5leHRbUkVQTEFZX0ZST01fS0VZXSA9PSB0cnVlKSB7XG4gICAgICAgIF9leHRlbnNpb25FbmFibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuY2hhbm5lbCA9PT0gX2NoYW5uZWwgJiYgbWVzc2FnZS5kYXRhICYmIG1lc3NhZ2UuZGF0YS5ldmVudCAmJiBtZXNzYWdlLmRhdGEuZXZlbnQucmVwbGF5SWQpIHtcbiAgICAgIF9yZXBsYXkgPSBtZXNzYWdlLmRhdGEuZXZlbnQucmVwbGF5SWQ7XG4gICAgfVxuICAgIGNhbGxiYWNrKG1lc3NhZ2UpO1xuICB9XG4gIFxuICB0aGlzLm91dGdvaW5nID0gZnVuY3Rpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgICBpZiAobWVzc2FnZS5jaGFubmVsID09PSAnL21ldGEvc3Vic2NyaWJlJykge1xuICAgICAgaWYgKF9leHRlbnNpb25FbmFibGVkKSB7XG4gICAgICAgIGlmICghbWVzc2FnZS5leHQpIHsgbWVzc2FnZS5leHQgPSB7fTsgfVxuXG4gICAgICAgIHZhciByZXBsYXlGcm9tTWFwID0ge307XG4gICAgICAgIHJlcGxheUZyb21NYXBbX2NoYW5uZWxdID0gX3JlcGxheTtcblxuICAgICAgICAvLyBhZGQgXCJleHQgOiB7IFwicmVwbGF5XCIgOiB7IENIQU5ORUwgOiBSRVBMQVlfVkFMVUUgfX1cIiB0byBzdWJzY3JpYmUgbWVzc2FnZVxuICAgICAgICBtZXNzYWdlLmV4dFtSRVBMQVlfRlJPTV9LRVldID0gcmVwbGF5RnJvbU1hcDtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FsbGJhY2sobWVzc2FnZSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbWluZ0V4dGVuc2lvbjtcbiIsIi8qKlxuICogQGZpbGUgTWFuYWdlcyBTdHJlYW1pbmcgQVBJc1xuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRzID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnZXZlbnRzJyksXG4gICAgaW5oZXJpdHMgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdpbmhlcml0cycpLFxuICAgIF8gPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdsb2Rhc2gvY29yZScpLFxuICAgIEZheWUgICA9IHJlcXVpcmUoJ2ZheWUnKSxcbiAgICBTdHJlYW1pbmdFeHRlbnNpb24gPSByZXF1aXJlKCcuL3N0cmVhbWluZy1leHRlbnNpb24nKSxcbiAgICBqc2ZvcmNlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9jb3JlJyk7XG5cbi8qKlxuICogU3RyZWFtaW5nIEFQSSB0b3BpYyBjbGFzc1xuICpcbiAqIEBjbGFzcyBTdHJlYW1pbmd+VG9waWNcbiAqIEBwYXJhbSB7U3RyZWFtaW5nfSBzdGVhbWluZyAtIFN0cmVhbWluZyBBUEkgb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqL1xudmFyIFRvcGljID0gZnVuY3Rpb24oc3RyZWFtaW5nLCBuYW1lKSB7XG4gIHRoaXMuX3N0cmVhbWluZyA9IHN0cmVhbWluZztcbiAgdGhpcy5uYW1lID0gbmFtZTtcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RyZWFtaW5nflN0cmVhbWluZ01lc3NhZ2VcbiAqIEBwcm9wIHtPYmplY3R9IGV2ZW50XG4gKiBAcHJvcCB7T2JqZWN0fSBldmVudC50eXBlIC0gRXZlbnQgdHlwZVxuICogQHByb3Age1JlY29yZH0gc29iamVjdCAtIFJlY29yZCBpbmZvcm1hdGlvblxuICovXG4vKipcbiAqIFN1YnNjcmliZSBsaXN0ZW5lciB0byB0b3BpY1xuICpcbiAqIEBtZXRob2QgU3RyZWFtaW5nflRvcGljI3N1YnNjcmliZVxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyZWFtaW5nflN0cmVhbWluZ01lc2FzZ2U+fSBsaXN0ZW5lciAtIFN0cmVhbWluZyBtZXNzYWdlIGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7U3Vic2NyaXB0aW9ufSAtIEZheWUgc3Vic2NyaXB0aW9uIG9iamVjdFxuICovXG5Ub3BpYy5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgcmV0dXJuIHRoaXMuX3N0cmVhbWluZy5zdWJzY3JpYmUodGhpcy5uYW1lLCBsaXN0ZW5lcik7XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGxpc3RlbmVyIGZyb20gdG9waWNcbiAqXG4gKiBAbWV0aG9kIFN0cmVhbWluZ35Ub3BpYyN1bnN1YnNjcmliZVxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyZWFtaW5nflN0cmVhbWluZ01lc2FzZ2U+fSBsaXN0ZW5lciAtIFN0cmVhbWluZyBtZXNzYWdlIGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7U3RyZWFtaW5nflRvcGljfVxuICovXG5Ub3BpYy5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICB0aGlzLl9zdHJlYW1pbmcudW5zdWJzY3JpYmUodGhpcy5uYW1lLCBsaXN0ZW5lcik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogU3RyZWFtaW5nIEFQSSBHZW5lcmljIFN0cmVhbWluZyBDaGFubmVsXG4gKlxuICogQGNsYXNzIFN0cmVhbWluZ35DaGFubmVsXG4gKiBAcGFyYW0ge1N0cmVhbWluZ30gc3RlYW1pbmcgLSBTdHJlYW1pbmcgQVBJIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBDaGFubmVsIG5hbWUgKHN0YXJ0cyB3aXRoIFwiL3UvXCIpXG4gKi9cbnZhciBDaGFubmVsID0gZnVuY3Rpb24oc3RyZWFtaW5nLCBuYW1lKSB7XG4gIHRoaXMuX3N0cmVhbWluZyA9IHN0cmVhbWluZztcbiAgdGhpcy5fbmFtZSA9IG5hbWU7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBjaGFubmVsXG4gKlxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyZWFtaW5nflN0cmVhbWluZ01lc3NhZ2U+fSBsaXN0ZW5lciAtIFN0cmVhbWluZyBtZXNzYWdlIGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7U3Vic2NyaXB0aW9ufSAtIEZheWUgc3Vic2NyaXB0aW9uIG9iamVjdFxuICovXG5DaGFubmVsLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICByZXR1cm4gdGhpcy5fc3RyZWFtaW5nLnN1YnNjcmliZSh0aGlzLl9uYW1lLCBsaXN0ZW5lcik7XG59O1xuXG5DaGFubmVsLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gIHRoaXMuX3N0cmVhbWluZy51bnN1YnNjcmliZSh0aGlzLl9uYW1lLCBsaXN0ZW5lcik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQ2hhbm5lbC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGV2ZW50cywgY2FsbGJhY2spIHtcbiAgdmFyIGlzQXJyYXkgPSBfLmlzQXJyYXkoZXZlbnRzKTtcbiAgZXZlbnRzID0gaXNBcnJheSA/IGV2ZW50cyA6IFsgZXZlbnRzIF07XG4gIHZhciBjb25uID0gdGhpcy5fc3RyZWFtaW5nLl9jb25uO1xuICBpZiAoIXRoaXMuX2lkKSB7XG4gICAgdGhpcy5faWQgPSBjb25uLnNvYmplY3QoJ1N0cmVhbWluZ0NoYW5uZWwnKS5maW5kT25lKHsgTmFtZTogdGhpcy5fbmFtZSB9LCAnSWQnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjKSB7IHJldHVybiByZWMuSWQgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2lkLnRoZW4oZnVuY3Rpb24oaWQpIHtcbiAgICB2YXIgY2hhbm5lbFVybCA9ICcvc29iamVjdHMvU3RyZWFtaW5nQ2hhbm5lbC8nICsgaWQgKyAnL3B1c2gnO1xuICAgIHJldHVybiBjb25uLnJlcXVlc3RQb3N0KGNoYW5uZWxVcmwsIHsgcHVzaEV2ZW50czogZXZlbnRzIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uKHJldHMpIHtcbiAgICByZXR1cm4gaXNBcnJheSA/IHJldHMgOiByZXRzWzBdO1xuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBTdHJlYW1pbmcgQVBJIGNsYXNzXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm4gLSBDb25uZWN0aW9uIG9iamVjdFxuICovXG52YXIgU3RyZWFtaW5nID0gZnVuY3Rpb24oY29ubikge1xuICB0aGlzLl9jb25uID0gY29ubjtcbn07XG5cbmluaGVyaXRzKFN0cmVhbWluZywgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cbi8qKiBAcHJpdmF0ZSAqKi9cblN0cmVhbWluZy5wcm90b3R5cGUuX2NyZWF0ZUNsaWVudCA9IGZ1bmN0aW9uKGZvckNoYW5uZWxOYW1lLCBleHRlbnNpb25zKSB7XG4gIC8vIGZvckNoYW5uZWxOYW1lIGlzIGFkdmlzb3J5LCBmb3IgYW4gQVBJIHdvcmthcm91bmQuIEl0IGRvZXMgbm90IHJlc3RyaWN0IG9yIHNlbGVjdCB0aGUgY2hhbm5lbC5cbiAgdmFyIG5lZWRzUmVwbGF5Rml4ID0gdHlwZW9mIGZvckNoYW5uZWxOYW1lID09PSAnc3RyaW5nJyAmJiBmb3JDaGFubmVsTmFtZS5pbmRleE9mKCcvdS8nKSA9PT0gMDtcbiAgdmFyIGVuZHBvaW50VXJsID0gW1xuICAgIHRoaXMuX2Nvbm4uaW5zdGFuY2VVcmwsXG4gICAgLy8gc3BlY2lhbCBlbmRwb2ludCBcIi9jb21ldGQvcmVwbGF5L3h4LnhcIiBpcyBvbmx5IGF2YWlsYWJsZSBpbiAzNi4wLlxuICAgIC8vIFNlZSBodHRwczovL3JlbGVhc2Vub3Rlcy5kb2NzLnNhbGVzZm9yY2UuY29tL2VuLXVzL3N1bW1lcjE2L3JlbGVhc2Utbm90ZXMvcm5fYXBpX3N0cmVhbWluZ19jbGFzc2ljX3JlcGxheS5odG1cbiAgICBcImNvbWV0ZFwiICsgKG5lZWRzUmVwbGF5Rml4ID09PSB0cnVlICYmIHRoaXMuX2Nvbm4udmVyc2lvbiA9PT0gXCIzNi4wXCIgPyBcIi9yZXBsYXlcIiA6IFwiXCIpLFxuICAgIHRoaXMuX2Nvbm4udmVyc2lvblxuICBdLmpvaW4oJy8nKTtcbiAgdmFyIGZheWVDbGllbnQgPSBuZXcgRmF5ZS5DbGllbnQoZW5kcG9pbnRVcmwsIHt9KTtcbiAgZmF5ZUNsaWVudC5zZXRIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnT0F1dGggJyt0aGlzLl9jb25uLmFjY2Vzc1Rva2VuKTtcbiAgaWYgKGV4dGVuc2lvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICAgIGZheWVDbGllbnQuYWRkRXh0ZW5zaW9uKGV4dGVuc2lvbik7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGZheWVDbGllbnQuX2Rpc3BhdGNoZXIuZ2V0Q29ubmVjdGlvblR5cGVzKCkuaW5kZXhPZignY2FsbGJhY2stcG9sbGluZycpID09PSAtMSkge1xuICAgIC8vIHByZXZlbnQgc3RyZWFtaW5nIEFQSSBzZXJ2ZXIgZXJyb3JcbiAgICBmYXllQ2xpZW50Ll9kaXNwYXRjaGVyLnNlbGVjdFRyYW5zcG9ydCgnbG9uZy1wb2xsaW5nJyk7XG4gICAgZmF5ZUNsaWVudC5fZGlzcGF0Y2hlci5fdHJhbnNwb3J0LmJhdGNoaW5nID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZheWVDbGllbnQ7XG59O1xuXG4vKiogQHByaXZhdGUgKiovXG5TdHJlYW1pbmcucHJvdG90eXBlLl9nZXRGYXllQ2xpZW50ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUpIHtcbiAgdmFyIGlzR2VuZXJpYyA9IGNoYW5uZWxOYW1lLmluZGV4T2YoJy91LycpID09PSAwO1xuICB2YXIgY2xpZW50VHlwZSA9IGlzR2VuZXJpYyA/ICdnZW5lcmljJyA6ICdwdXNoVG9waWMnO1xuICBpZiAoIXRoaXMuX2ZheWVDbGllbnRzIHx8ICF0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXSkge1xuICAgIHRoaXMuX2ZheWVDbGllbnRzID0gdGhpcy5fZmF5ZUNsaWVudHMgfHwge307XG4gICAgdGhpcy5fZmF5ZUNsaWVudHNbY2xpZW50VHlwZV0gPSB0aGlzLl9jcmVhdGVDbGllbnQoY2hhbm5lbE5hbWUpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXTtcbn07XG5cblxuLyoqXG4gKiBHZXQgbmFtZWQgdG9waWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEByZXR1cm5zIHtTdHJlYW1pbmd+VG9waWN9XG4gKi9cblN0cmVhbWluZy5wcm90b3R5cGUudG9waWMgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMuX3RvcGljcyA9IHRoaXMuX3RvcGljcyB8fCB7fTtcbiAgdmFyIHRvcGljID0gdGhpcy5fdG9waWNzW25hbWVdID1cbiAgICB0aGlzLl90b3BpY3NbbmFtZV0gfHwgbmV3IFRvcGljKHRoaXMsIG5hbWUpO1xuICByZXR1cm4gdG9waWM7XG59O1xuXG4vKipcbiAqIEdldCBDaGFubmVsIGZvciBJZFxuICogQHBhcmFtIHtTdHJpbmd9IGNoYW5uZWxJZCAtIElkIG9mIFN0cmVhbWluZ0NoYW5uZWwgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyZWFtaW5nfkNoYW5uZWx9XG4gKi9cblN0cmVhbWluZy5wcm90b3R5cGUuY2hhbm5lbCA9IGZ1bmN0aW9uKGNoYW5uZWxJZCkge1xuICByZXR1cm4gbmV3IENoYW5uZWwodGhpcywgY2hhbm5lbElkKTtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvcGljL2NoYW5uZWxcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N1YnNjcmlwdGlvbn0gLSBGYXllIHN1YnNjcmlwdGlvbiBvYmplY3RcbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgY2hhbm5lbE5hbWUgPSBuYW1lLmluZGV4T2YoJy8nKSA9PT0gMCA/IG5hbWUgOiAnL3RvcGljLycgKyBuYW1lO1xuICB2YXIgZmF5ZUNsaWVudCA9IHRoaXMuX2dldEZheWVDbGllbnQoY2hhbm5lbE5hbWUpO1xuICByZXR1cm4gZmF5ZUNsaWVudC5zdWJzY3JpYmUoY2hhbm5lbE5hbWUsIGxpc3RlbmVyKTtcbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgdG9waWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N0cmVhbWluZ31cbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBjaGFubmVsTmFtZSA9IG5hbWUuaW5kZXhPZignLycpID09PSAwID8gbmFtZSA6ICcvdG9waWMvJyArIG5hbWU7XG4gIHZhciBmYXllQ2xpZW50ID0gdGhpcy5fZ2V0RmF5ZUNsaWVudChjaGFubmVsTmFtZSk7XG4gIGZheWVDbGllbnQudW5zdWJzY3JpYmUoY2hhbm5lbE5hbWUsIGxpc3RlbmVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgU3RyZWFtaW5nIGNsaWVudCwgb3B0aW9uYWxseSB3aXRoIGV4dGVuc2lvbnNcbiAqXG4gKiBTZWUgRmF5ZSBkb2NzIGZvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzOiBodHRwczovL2ZheWUuamNvZ2xhbi5jb20vYnJvd3Nlci9leHRlbnNpb25zLmh0bWxcbiAqXG4gKiBFeGFtcGxlIHVzYWdlOlxuICogXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAvLyBFc3RhYmxpc2ggYSBTYWxlc2ZvcmNlIGNvbm5lY3Rpb24uIChEZXRhaWxzIGVsaWRlZClcbiAqIGNvbnN0IGNvbm4gPSBuZXcganNmb3JjZS5Db25uZWN0aW9uKHsg4oCmIH0pO1xuICogXG4gKiBjb25zdCBmYXllQ2xpZW50ID0gY29ubi5zdHJlYW1pbmcuY3JlYXRlQ2xpZW50KCk7XG4gKiBcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGZheWVDbGllbnQuc3Vic2NyaWJlKGNoYW5uZWwsIGRhdGEgPT4ge1xuICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICogfSk7XG4gKiBcbiAqIHN1YnNjcmlwdGlvbi5jYW5jZWwoKTtcbiAqIGBgYFxuICogXG4gKiBFeGFtcGxlIHdpdGggZXh0ZW5zaW9ucywgdXNpbmcgUmVwbGF5ICYgQXV0aCBGYWlsdXJlIGV4dGVuc2lvbnMgaW4gYSBzZXJ2ZXItc2lkZSBOb2RlLmpzIGFwcDpcbiAqIFxuICogYGBgamF2YXNjcmlwdFxuICogLy8gRXN0YWJsaXNoIGEgU2FsZXNmb3JjZSBjb25uZWN0aW9uLiAoRGV0YWlscyBlbGlkZWQpXG4gKiBjb25zdCBjb25uID0gbmV3IGpzZm9yY2UuQ29ubmVjdGlvbih7IOKApiB9KTtcbiAqIFxuICogY29uc3QgY2hhbm5lbCA9IFwiL2V2ZW50L015X0V2ZW50X19lXCI7XG4gKiBjb25zdCByZXBsYXlJZCA9IC0yOyAvLyAtMiBpcyBhbGwgcmV0YWluZWQgZXZlbnRzXG4gKiBcbiAqIGNvbnN0IGV4aXRDYWxsYmFjayA9ICgpID0+IHByb2Nlc3MuZXhpdCgxKTtcbiAqIGNvbnN0IGF1dGhGYWlsdXJlRXh0ID0gbmV3IGpzZm9yY2UuU3RyZWFtaW5nRXh0ZW5zaW9uLkF1dGhGYWlsdXJlKGV4aXRDYWxsYmFjayk7XG4gKiBcbiAqIGNvbnN0IHJlcGxheUV4dCA9IG5ldyBqc2ZvcmNlLlN0cmVhbWluZ0V4dGVuc2lvbi5SZXBsYXkoY2hhbm5lbCwgcmVwbGF5SWQpO1xuICogXG4gKiBjb25zdCBmYXllQ2xpZW50ID0gY29ubi5zdHJlYW1pbmcuY3JlYXRlQ2xpZW50KFtcbiAqICAgYXV0aEZhaWx1cmVFeHQsXG4gKiAgIHJlcGxheUV4dFxuICogXSk7XG4gKiBcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGZheWVDbGllbnQuc3Vic2NyaWJlKGNoYW5uZWwsIGRhdGEgPT4ge1xuICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICogfSk7XG4gKiBcbiAqIHN1YnNjcmlwdGlvbi5jYW5jZWwoKTtcbiAqIGBgYFxuICogXG4gKiBAcGFyYW0ge0FycmF5fSBFeHRlbnNpb25zIC0gT3B0aW9uYWwsIGV4dGVuc2lvbnMgdG8gYXBwbHkgdG8gdGhlIEZheWUgY2xpZW50XG4gKiBAcmV0dXJucyB7RmF5ZUNsaWVudH0gLSBGYXllIGNsaWVudCBvYmplY3RcbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS5jcmVhdGVDbGllbnQgPSBmdW5jdGlvbihleHRlbnNpb25zKSB7XG4gIHJldHVybiB0aGlzLl9jcmVhdGVDbGllbnQobnVsbCwgZXh0ZW5zaW9ucyk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5qc2ZvcmNlLm9uKCdjb25uZWN0aW9uOm5ldycsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgY29ubi5zdHJlYW1pbmcgPSBuZXcgU3RyZWFtaW5nKGNvbm4pO1xufSk7XG5cbi8qXG4gKiBcbiAqL1xuanNmb3JjZS5TdHJlYW1pbmdFeHRlbnNpb24gPSBTdHJlYW1pbmdFeHRlbnNpb247XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHJhd0FzYXAgcHJvdmlkZXMgZXZlcnl0aGluZyB3ZSBuZWVkIGV4Y2VwdCBleGNlcHRpb24gbWFuYWdlbWVudC5cbnZhciByYXdBc2FwID0gcmVxdWlyZShcIi4vcmF3XCIpO1xuLy8gUmF3VGFza3MgYXJlIHJlY3ljbGVkIHRvIHJlZHVjZSBHQyBjaHVybi5cbnZhciBmcmVlVGFza3MgPSBbXTtcbi8vIFdlIHF1ZXVlIGVycm9ycyB0byBlbnN1cmUgdGhleSBhcmUgdGhyb3duIGluIHJpZ2h0IG9yZGVyIChGSUZPKS5cbi8vIEFycmF5LWFzLXF1ZXVlIGlzIGdvb2QgZW5vdWdoIGhlcmUsIHNpbmNlIHdlIGFyZSBqdXN0IGRlYWxpbmcgd2l0aCBleGNlcHRpb25zLlxudmFyIHBlbmRpbmdFcnJvcnMgPSBbXTtcbnZhciByZXF1ZXN0RXJyb3JUaHJvdyA9IHJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKHRocm93Rmlyc3RFcnJvcik7XG5cbmZ1bmN0aW9uIHRocm93Rmlyc3RFcnJvcigpIHtcbiAgICBpZiAocGVuZGluZ0Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgcGVuZGluZ0Vycm9ycy5zaGlmdCgpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxscyBhIHRhc2sgYXMgc29vbiBhcyBwb3NzaWJsZSBhZnRlciByZXR1cm5pbmcsIGluIGl0cyBvd24gZXZlbnQsIHdpdGggcHJpb3JpdHlcbiAqIG92ZXIgb3RoZXIgZXZlbnRzIGxpa2UgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZXBhaW50LiBBbiBlcnJvciB0aHJvd24gZnJvbSBhblxuICogZXZlbnQgd2lsbCBub3QgaW50ZXJydXB0LCBub3IgZXZlbiBzdWJzdGFudGlhbGx5IHNsb3cgZG93biB0aGUgcHJvY2Vzc2luZyBvZlxuICogb3RoZXIgZXZlbnRzLCBidXQgd2lsbCBiZSByYXRoZXIgcG9zdHBvbmVkIHRvIGEgbG93ZXIgcHJpb3JpdHkgZXZlbnQuXG4gKiBAcGFyYW0ge3tjYWxsfX0gdGFzayBBIGNhbGxhYmxlIG9iamVjdCwgdHlwaWNhbGx5IGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzYXA7XG5mdW5jdGlvbiBhc2FwKHRhc2spIHtcbiAgICB2YXIgcmF3VGFzaztcbiAgICBpZiAoZnJlZVRhc2tzLmxlbmd0aCkge1xuICAgICAgICByYXdUYXNrID0gZnJlZVRhc2tzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1Rhc2sgPSBuZXcgUmF3VGFzaygpO1xuICAgIH1cbiAgICByYXdUYXNrLnRhc2sgPSB0YXNrO1xuICAgIHJhd0FzYXAocmF3VGFzayk7XG59XG5cbi8vIFdlIHdyYXAgdGFza3Mgd2l0aCByZWN5Y2xhYmxlIHRhc2sgb2JqZWN0cy4gIEEgdGFzayBvYmplY3QgaW1wbGVtZW50c1xuLy8gYGNhbGxgLCBqdXN0IGxpa2UgYSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJhd1Rhc2soKSB7XG4gICAgdGhpcy50YXNrID0gbnVsbDtcbn1cblxuLy8gVGhlIHNvbGUgcHVycG9zZSBvZiB3cmFwcGluZyB0aGUgdGFzayBpcyB0byBjYXRjaCB0aGUgZXhjZXB0aW9uIGFuZCByZWN5Y2xlXG4vLyB0aGUgdGFzayBvYmplY3QgYWZ0ZXIgaXRzIHNpbmdsZSB1c2UuXG5SYXdUYXNrLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMudGFzay5jYWxsKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGFzYXAub25lcnJvcikge1xuICAgICAgICAgICAgLy8gVGhpcyBob29rIGV4aXN0cyBwdXJlbHkgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAgICAgICAgICAvLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXRcbiAgICAgICAgICAgIC8vIGRlcGVuZHMgb24gaXRzIGV4aXN0ZW5jZS5cbiAgICAgICAgICAgIGFzYXAub25lcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbiBhIHdlYiBicm93c2VyLCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuIEhvd2V2ZXIsIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBzbG93aW5nIGRvd24gdGhlIHF1ZXVlIG9mIHBlbmRpbmcgdGFza3MsIHdlIHJldGhyb3cgdGhlIGVycm9yIGluIGFcbiAgICAgICAgICAgIC8vIGxvd2VyIHByaW9yaXR5IHR1cm4uXG4gICAgICAgICAgICBwZW5kaW5nRXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgcmVxdWVzdEVycm9yVGhyb3coKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XG4gICAgICAgIGZyZWVUYXNrc1tmcmVlVGFza3MubGVuZ3RoXSA9IHRoaXM7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgSU8sIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVkcmF3XG4vLyBldmVudHMgaW4gYnJvd3NlcnMuXG4vL1xuLy8gQW4gZXhjZXB0aW9uIHRocm93biBieSBhIHRhc2sgd2lsbCBwZXJtYW5lbnRseSBpbnRlcnJ1cHQgdGhlIHByb2Nlc3Npbmcgb2Zcbi8vIHN1YnNlcXVlbnQgdGFza3MuIFRoZSBoaWdoZXIgbGV2ZWwgYGFzYXBgIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93biBieSBhIHRhc2ssIHRoYXQgdGhlIHRhc2sgcXVldWUgd2lsbCBjb250aW51ZSBmbHVzaGluZyBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZSwgYnV0IGlmIHlvdSB1c2UgYHJhd0FzYXBgIGRpcmVjdGx5LCB5b3UgYXJlIHJlc3BvbnNpYmxlIHRvXG4vLyBlaXRoZXIgZW5zdXJlIHRoYXQgbm8gZXhjZXB0aW9ucyBhcmUgdGhyb3duIGZyb20geW91ciB0YXNrLCBvciB0byBtYW51YWxseVxuLy8gY2FsbCBgcmF3QXNhcC5yZXF1ZXN0Rmx1c2hgIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5tb2R1bGUuZXhwb3J0cyA9IHJhd0FzYXA7XG5mdW5jdGlvbiByYXdBc2FwKHRhc2spIHtcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXF1ZXN0Rmx1c2goKTtcbiAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFcXVpdmFsZW50IHRvIHB1c2gsIGJ1dCBhdm9pZHMgYSBmdW5jdGlvbiBjYWxsLlxuICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSB0YXNrO1xufVxuXG52YXIgcXVldWUgPSBbXTtcbi8vIE9uY2UgYSBmbHVzaCBoYXMgYmVlbiByZXF1ZXN0ZWQsIG5vIGZ1cnRoZXIgY2FsbHMgdG8gYHJlcXVlc3RGbHVzaGAgYXJlXG4vLyBuZWNlc3NhcnkgdW50aWwgdGhlIG5leHQgYGZsdXNoYCBjb21wbGV0ZXMuXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIG1ldGhvZCB0aGF0IGF0dGVtcHRzIHRvIGtpY2tcbi8vIG9mZiBhIGBmbHVzaGAgZXZlbnQgYXMgcXVpY2tseSBhcyBwb3NzaWJsZS4gYGZsdXNoYCB3aWxsIGF0dGVtcHQgdG8gZXhoYXVzdFxuLy8gdGhlIGV2ZW50IHF1ZXVlIGJlZm9yZSB5aWVsZGluZyB0byB0aGUgYnJvd3NlcidzIG93biBldmVudCBsb29wLlxudmFyIHJlcXVlc3RGbHVzaDtcbi8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbmV4dCB0YXNrIHRvIGV4ZWN1dGUgaW4gdGhlIHRhc2sgcXVldWUuIFRoaXMgaXNcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNhbGxzIHRvIGBmbHVzaGAgc28gdGhhdCBpdCBjYW4gYmUgcmVzdW1lZCBpZlxuLy8gYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24uXG52YXIgaW5kZXggPSAwO1xuLy8gSWYgYSB0YXNrIHNjaGVkdWxlcyBhZGRpdGlvbmFsIHRhc2tzIHJlY3Vyc2l2ZWx5LCB0aGUgdGFzayBxdWV1ZSBjYW4gZ3Jvd1xuLy8gdW5ib3VuZGVkLiBUbyBwcmV2ZW50IG1lbW9yeSBleGhhdXN0aW9uLCB0aGUgdGFzayBxdWV1ZSB3aWxsIHBlcmlvZGljYWxseVxuLy8gdHJ1bmNhdGUgYWxyZWFkeS1jb21wbGV0ZWQgdGFza3MuXG52YXIgY2FwYWNpdHkgPSAxMDI0O1xuXG4vLyBUaGUgZmx1c2ggZnVuY3Rpb24gcHJvY2Vzc2VzIGFsbCB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzY2hlZHVsZWQgd2l0aFxuLy8gYHJhd0FzYXBgIHVubGVzcyBhbmQgdW50aWwgb25lIG9mIHRob3NlIHRhc2tzIHRocm93cyBhbiBleGNlcHRpb24uXG4vLyBJZiBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYGZsdXNoYCBlbnN1cmVzIHRoYXQgaXRzIHN0YXRlIHdpbGwgcmVtYWluXG4vLyBjb25zaXN0ZW50IGFuZCB3aWxsIHJlc3VtZSB3aGVyZSBpdCBsZWZ0IG9mZiB3aGVuIGNhbGxlZCBhZ2Fpbi5cbi8vIEhvd2V2ZXIsIGBmbHVzaGAgZG9lcyBub3QgbWFrZSBhbnkgYXJyYW5nZW1lbnRzIHRvIGJlIGNhbGxlZCBhZ2FpbiBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93bi5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlIChpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIGluZGV4IGJlZm9yZSBjYWxsaW5nIHRoZSB0YXNrLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSB3aWxsXG4gICAgICAgIC8vIGJlZ2luIGZsdXNoaW5nIG9uIHRoZSBuZXh0IHRhc2sgdGhlIHRhc2sgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgcXVldWVbY3VycmVudEluZGV4XS5jYWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgbGVha2luZyBtZW1vcnkgZm9yIGxvbmcgY2hhaW5zIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBgYXNhcGAuXG4gICAgICAgIC8vIElmIHdlIGNhbGwgYGFzYXBgIHdpdGhpbiB0YXNrcyBzY2hlZHVsZWQgYnkgYGFzYXBgLCB0aGUgcXVldWUgd2lsbFxuICAgICAgICAvLyBncm93LCBidXQgdG8gYXZvaWQgYW4gTyhuKSB3YWxrIGZvciBldmVyeSB0YXNrIHdlIGV4ZWN1dGUsIHdlIGRvbid0XG4gICAgICAgIC8vIHNoaWZ0IHRhc2tzIG9mZiB0aGUgcXVldWUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZXhlY3V0ZWQuXG4gICAgICAgIC8vIEluc3RlYWQsIHdlIHBlcmlvZGljYWxseSBzaGlmdCAxMDI0IHRhc2tzIG9mZiB0aGUgcXVldWUuXG4gICAgICAgIGlmIChpbmRleCA+IGNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBzaGlmdCBhbGwgdmFsdWVzIHN0YXJ0aW5nIGF0IHRoZSBpbmRleCBiYWNrIHRvIHRoZVxuICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSBpbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUubGVuZ3RoIC09IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaW5kZXggPSAwO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGltcGxlbWVudGVkIHVzaW5nIGEgc3RyYXRlZ3kgYmFzZWQgb24gZGF0YSBjb2xsZWN0ZWQgZnJvbVxuLy8gZXZlcnkgYXZhaWxhYmxlIFNhdWNlTGFicyBTZWxlbml1bSB3ZWIgZHJpdmVyIHdvcmtlciBhdCB0aW1lIG9mIHdyaXRpbmcuXG4vLyBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xbUctNVVZR3VwNXF4R2RFTVdraFA2QldDejA1M05VYjJFMVFvVVRVMTZ1QS9lZGl0I2dpZD03ODM3MjQ1OTNcblxuLy8gU2FmYXJpIDYgYW5kIDYuMSBmb3IgZGVza3RvcCwgaVBhZCwgYW5kIGlQaG9uZSBhcmUgdGhlIG9ubHkgYnJvd3NlcnMgdGhhdFxuLy8gaGF2ZSBXZWJLaXRNdXRhdGlvbk9ic2VydmVyIGJ1dCBub3QgdW4tcHJlZml4ZWQgTXV0YXRpb25PYnNlcnZlci5cbi8vIE11c3QgdXNlIGBnbG9iYWxgIG9yIGBzZWxmYCBpbnN0ZWFkIG9mIGB3aW5kb3dgIHRvIHdvcmsgaW4gYm90aCBmcmFtZXMgYW5kIHdlYlxuLy8gd29ya2Vycy4gYGdsb2JhbGAgaXMgYSBwcm92aXNpb24gb2YgQnJvd3NlcmlmeSwgTXIsIE1ycywgb3IgTW9wLlxuXG4vKiBnbG9iYWxzIHNlbGYgKi9cbnZhciBzY29wZSA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiBzZWxmO1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gc2NvcGUuTXV0YXRpb25PYnNlcnZlciB8fCBzY29wZS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG4vLyBNdXRhdGlvbk9ic2VydmVycyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBoYXZlIGhpZ2ggcHJpb3JpdHkgYW5kIHdvcmtcbi8vIHJlbGlhYmx5IGV2ZXJ5d2hlcmUgdGhleSBhcmUgaW1wbGVtZW50ZWQuXG4vLyBUaGV5IGFyZSBpbXBsZW1lbnRlZCBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzLlxuLy9cbi8vIC0gQW5kcm9pZCA0LTQuM1xuLy8gLSBDaHJvbWUgMjYtMzRcbi8vIC0gRmlyZWZveCAxNC0yOVxuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciAxMVxuLy8gLSBpUGFkIFNhZmFyaSA2LTcuMVxuLy8gLSBpUGhvbmUgU2FmYXJpIDctNy4xXG4vLyAtIFNhZmFyaSA2LTdcbmlmICh0eXBlb2YgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcblxuLy8gTWVzc2FnZUNoYW5uZWxzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGdpdmUgZGlyZWN0IGFjY2VzcyB0byB0aGUgSFRNTFxuLy8gdGFzayBxdWV1ZSwgYXJlIGltcGxlbWVudGVkIGluIEludGVybmV0IEV4cGxvcmVyIDEwLCBTYWZhcmkgNS4wLTEsIGFuZCBPcGVyYVxuLy8gMTEtMTIsIGFuZCBpbiB3ZWIgd29ya2VycyBpbiBtYW55IGVuZ2luZXMuXG4vLyBBbHRob3VnaCBtZXNzYWdlIGNoYW5uZWxzIHlpZWxkIHRvIGFueSBxdWV1ZWQgcmVuZGVyaW5nIGFuZCBJTyB0YXNrcywgdGhleVxuLy8gd291bGQgYmUgYmV0dGVyIHRoYW4gaW1wb3NpbmcgdGhlIDRtcyBkZWxheSBvZiB0aW1lcnMuXG4vLyBIb3dldmVyLCB0aGV5IGRvIG5vdCB3b3JrIHJlbGlhYmx5IGluIEludGVybmV0IEV4cGxvcmVyIG9yIFNhZmFyaS5cblxuLy8gSW50ZXJuZXQgRXhwbG9yZXIgMTAgaXMgdGhlIG9ubHkgYnJvd3NlciB0aGF0IGhhcyBzZXRJbW1lZGlhdGUgYnV0IGRvZXNcbi8vIG5vdCBoYXZlIE11dGF0aW9uT2JzZXJ2ZXJzLlxuLy8gQWx0aG91Z2ggc2V0SW1tZWRpYXRlIHlpZWxkcyB0byB0aGUgYnJvd3NlcidzIHJlbmRlcmVyLCBpdCB3b3VsZCBiZVxuLy8gcHJlZmVycmFibGUgdG8gZmFsbGluZyBiYWNrIHRvIHNldFRpbWVvdXQgc2luY2UgaXQgZG9lcyBub3QgaGF2ZVxuLy8gdGhlIG1pbmltdW0gNG1zIHBlbmFsdHkuXG4vLyBVbmZvcnR1bmF0ZWx5IHRoZXJlIGFwcGVhcnMgdG8gYmUgYSBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAgTW9iaWxlIChhbmRcbi8vIERlc2t0b3AgdG8gYSBsZXNzZXIgZXh0ZW50KSB0aGF0IHJlbmRlcnMgYm90aCBzZXRJbW1lZGlhdGUgYW5kXG4vLyBNZXNzYWdlQ2hhbm5lbCB1c2VsZXNzIGZvciB0aGUgcHVycG9zZXMgb2YgQVNBUC5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9pc3N1ZXMvMzk2XG5cbi8vIFRpbWVycyBhcmUgaW1wbGVtZW50ZWQgdW5pdmVyc2FsbHkuXG4vLyBXZSBmYWxsIGJhY2sgdG8gdGltZXJzIGluIHdvcmtlcnMgaW4gbW9zdCBlbmdpbmVzLCBhbmQgaW4gZm9yZWdyb3VuZFxuLy8gY29udGV4dHMgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vycy5cbi8vIEhvd2V2ZXIsIG5vdGUgdGhhdCBldmVuIHRoaXMgc2ltcGxlIGNhc2UgcmVxdWlyZXMgbnVhbmNlcyB0byBvcGVyYXRlIGluIGFcbi8vIGJyb2FkIHNwZWN0cnVtIG9mIGJyb3dzZXJzLlxuLy9cbi8vIC0gRmlyZWZveCAzLTEzXG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDYtOVxuLy8gLSBpUGFkIFNhZmFyaSA0LjNcbi8vIC0gTHlueCAyLjguN1xufSBlbHNlIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoZmx1c2gpO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCByZXF1ZXN0cyB0aGF0IHRoZSBoaWdoIHByaW9yaXR5IGV2ZW50IHF1ZXVlIGJlIGZsdXNoZWQgYXNcbi8vIHNvb24gYXMgcG9zc2libGUuXG4vLyBUaGlzIGlzIHVzZWZ1bCB0byBwcmV2ZW50IGFuIGVycm9yIHRocm93biBpbiBhIHRhc2sgZnJvbSBzdGFsbGluZyB0aGUgZXZlbnRcbi8vIHF1ZXVlIGlmIHRoZSBleGNlcHRpb24gaGFuZGxlZCBieSBOb2RlLmpz4oCZc1xuLy8gYHByb2Nlc3Mub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiKWAgb3IgYnkgYSBkb21haW4uXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcblxuLy8gVG8gcmVxdWVzdCBhIGhpZ2ggcHJpb3JpdHkgZXZlbnQsIHdlIGluZHVjZSBhIG11dGF0aW9uIG9ic2VydmVyIGJ5IHRvZ2dsaW5nXG4vLyB0aGUgdGV4dCBvZiBhIHRleHQgbm9kZSBiZXR3ZWVuIFwiMVwiIGFuZCBcIi0xXCIuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjaykge1xuICAgIHZhciB0b2dnbGUgPSAxO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICB0b2dnbGUgPSAtdG9nZ2xlO1xuICAgICAgICBub2RlLmRhdGEgPSB0b2dnbGU7XG4gICAgfTtcbn1cblxuLy8gVGhlIG1lc3NhZ2UgY2hhbm5lbCB0ZWNobmlxdWUgd2FzIGRpc2NvdmVyZWQgYnkgTWFsdGUgVWJsIGFuZCB3YXMgdGhlXG4vLyBvcmlnaW5hbCBmb3VuZGF0aW9uIGZvciB0aGlzIGxpYnJhcnkuXG4vLyBodHRwOi8vd3d3Lm5vbmJsb2NraW5nLmlvLzIwMTEvMDYvd2luZG93bmV4dHRpY2suaHRtbFxuXG4vLyBTYWZhcmkgNi4wLjUgKGF0IGxlYXN0KSBpbnRlcm1pdHRlbnRseSBmYWlscyB0byBjcmVhdGUgbWVzc2FnZSBwb3J0cyBvbiBhXG4vLyBwYWdlJ3MgZmlyc3QgbG9hZC4gVGhhbmtmdWxseSwgdGhpcyB2ZXJzaW9uIG9mIFNhZmFyaSBzdXBwb3J0c1xuLy8gTXV0YXRpb25PYnNlcnZlcnMsIHNvIHdlIGRvbid0IG5lZWQgdG8gZmFsbCBiYWNrIGluIHRoYXQgY2FzZS5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU1lc3NhZ2VDaGFubmVsKGNhbGxiYWNrKSB7XG4vLyAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbi8vICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGNhbGxiYWNrO1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBGb3IgcmVhc29ucyBleHBsYWluZWQgYWJvdmUsIHdlIGFyZSBhbHNvIHVuYWJsZSB0byB1c2UgYHNldEltbWVkaWF0ZWBcbi8vIHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzLlxuLy8gRXZlbiBpZiB3ZSB3ZXJlLCB0aGVyZSBpcyBhbm90aGVyIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbi8vIEl0IGlzIG5vdCBzdWZmaWNpZW50IHRvIGFzc2lnbiBgc2V0SW1tZWRpYXRlYCB0byBgcmVxdWVzdEZsdXNoYCBiZWNhdXNlXG4vLyBgc2V0SW1tZWRpYXRlYCBtdXN0IGJlIGNhbGxlZCAqYnkgbmFtZSogYW5kIHRoZXJlZm9yZSBtdXN0IGJlIHdyYXBwZWQgaW4gYVxuLy8gY2xvc3VyZS5cbi8vIE5ldmVyIGZvcmdldC5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgc2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBTYWZhcmkgNi4wIGhhcyBhIHByb2JsZW0gd2hlcmUgdGltZXJzIHdpbGwgZ2V0IGxvc3Qgd2hpbGUgdGhlIHVzZXIgaXNcbi8vIHNjcm9sbGluZy4gVGhpcyBwcm9ibGVtIGRvZXMgbm90IGltcGFjdCBBU0FQIGJlY2F1c2UgU2FmYXJpIDYuMCBzdXBwb3J0c1xuLy8gbXV0YXRpb24gb2JzZXJ2ZXJzLCBzbyB0aGF0IGltcGxlbWVudGF0aW9uIGlzIHVzZWQgaW5zdGVhZC5cbi8vIEhvd2V2ZXIsIGlmIHdlIGV2ZXIgZWxlY3QgdG8gdXNlIHRpbWVycyBpbiBTYWZhcmksIHRoZSBwcmV2YWxlbnQgd29yay1hcm91bmRcbi8vIGlzIHRvIGFkZCBhIHNjcm9sbCBldmVudCBsaXN0ZW5lciB0aGF0IGNhbGxzIGZvciBhIGZsdXNoLlxuXG4vLyBgc2V0VGltZW91dGAgZG9lcyBub3QgY2FsbCB0aGUgcGFzc2VkIGNhbGxiYWNrIGlmIHRoZSBkZWxheSBpcyBsZXNzIHRoYW5cbi8vIGFwcHJveGltYXRlbHkgNyBpbiB3ZWIgd29ya2VycyBpbiBGaXJlZm94IDggdGhyb3VnaCAxOCwgYW5kIHNvbWV0aW1lcyBub3Rcbi8vIGV2ZW4gdGhlbi5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICAvLyBXZSBkaXNwYXRjaCBhIHRpbWVvdXQgd2l0aCBhIHNwZWNpZmllZCBkZWxheSBvZiAwIGZvciBlbmdpbmVzIHRoYXRcbiAgICAgICAgLy8gY2FuIHJlbGlhYmx5IGFjY29tbW9kYXRlIHRoYXQgcmVxdWVzdC4gVGhpcyB3aWxsIHVzdWFsbHkgYmUgc25hcHBlZFxuICAgICAgICAvLyB0byBhIDQgbWlsaXNlY29uZCBkZWxheSwgYnV0IG9uY2Ugd2UncmUgZmx1c2hpbmcsIHRoZXJlJ3Mgbm8gZGVsYXlcbiAgICAgICAgLy8gYmV0d2VlbiBldmVudHMuXG4gICAgICAgIHZhciB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChoYW5kbGVUaW1lciwgMCk7XG4gICAgICAgIC8vIEhvd2V2ZXIsIHNpbmNlIHRoaXMgdGltZXIgZ2V0cyBmcmVxdWVudGx5IGRyb3BwZWQgaW4gRmlyZWZveFxuICAgICAgICAvLyB3b3JrZXJzLCB3ZSBlbmxpc3QgYW4gaW50ZXJ2YWwgaGFuZGxlIHRoYXQgd2lsbCB0cnkgdG8gZmlyZVxuICAgICAgICAvLyBhbiBldmVudCAyMCB0aW1lcyBwZXIgc2Vjb25kIHVudGlsIGl0IHN1Y2NlZWRzLlxuICAgICAgICB2YXIgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChoYW5kbGVUaW1lciwgNTApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRpbWVyKCkge1xuICAgICAgICAgICAgLy8gV2hpY2hldmVyIHRpbWVyIHN1Y2NlZWRzIHdpbGwgY2FuY2VsIGJvdGggdGltZXJzIGFuZFxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgY2FsbGJhY2suXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBUaGlzIGlzIGZvciBgYXNhcC5qc2Agb25seS5cbi8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdCBkZXBlbmRzIG9uXG4vLyBpdHMgZXhpc3RlbmNlLlxucmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIgPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXI7XG5cbi8vIEFTQVAgd2FzIG9yaWdpbmFsbHkgYSBuZXh0VGljayBzaGltIGluY2x1ZGVkIGluIFEuIFRoaXMgd2FzIGZhY3RvcmVkIG91dFxuLy8gaW50byB0aGlzIEFTQVAgcGFja2FnZS4gSXQgd2FzIGxhdGVyIGFkYXB0ZWQgdG8gUlNWUCB3aGljaCBtYWRlIGZ1cnRoZXJcbi8vIGFtZW5kbWVudHMuIFRoZXNlIGRlY2lzaW9ucywgcGFydGljdWxhcmx5IHRvIG1hcmdpbmFsaXplIE1lc3NhZ2VDaGFubmVsIGFuZFxuLy8gdG8gY2FwdHVyZSB0aGUgTXV0YXRpb25PYnNlcnZlciBpbXBsZW1lbnRhdGlvbiBpbiBhIGNsb3N1cmUsIHdlcmUgaW50ZWdyYXRlZFxuLy8gYmFjayBpbnRvIEFTQVAgcHJvcGVyLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL2NkZGY3MjMyNTQ2YTljZjg1ODUyNGI3NWNkZTZmOWVkZjcyNjIwYTcvbGliL3JzdnAvYXNhcC5qc1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi91dGlsL2NvbnN0YW50cycpLFxuICAgIExvZ2dpbmcgICA9IHJlcXVpcmUoJy4vbWl4aW5zL2xvZ2dpbmcnKTtcblxudmFyIEZheWUgPSB7XG4gIFZFUlNJT046ICAgIGNvbnN0YW50cy5WRVJTSU9OLFxuXG4gIENsaWVudDogICAgIHJlcXVpcmUoJy4vcHJvdG9jb2wvY2xpZW50JyksXG4gIFNjaGVkdWxlcjogIHJlcXVpcmUoJy4vcHJvdG9jb2wvc2NoZWR1bGVyJylcbn07XG5cbkxvZ2dpbmcud3JhcHBlciA9IEZheWU7XG5cbm1vZHVsZS5leHBvcnRzID0gRmF5ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFByb21pc2UgICA9IHJlcXVpcmUoJy4uL3V0aWwvcHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGhlbjogZnVuY3Rpb24oY2FsbGJhY2ssIGVycmJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCF0aGlzLl9wcm9taXNlKVxuICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgc2VsZi5fcmVqZWN0ICA9IHJlamVjdDtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKGNhbGxiYWNrLCBlcnJiYWNrKTtcbiAgfSxcblxuICBjYWxsYmFjazogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdmFsdWUpIH0pO1xuICB9LFxuXG4gIGVycmJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBmdW5jdGlvbihyZWFzb24pIHsgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZWFzb24pIH0pO1xuICB9LFxuXG4gIHRpbWVvdXQ6IGZ1bmN0aW9uKHNlY29uZHMsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnRoZW4oKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fdGltZXIgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuX3JlamVjdChtZXNzYWdlKTtcbiAgICB9LCBzZWNvbmRzICogMTAwMCk7XG4gIH0sXG5cbiAgc2V0RGVmZXJyZWRTdGF0dXM6IGZ1bmN0aW9uKHN0YXR1cywgdmFsdWUpIHtcbiAgICBpZiAodGhpcy5fdGltZXIpIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuXG4gICAgdGhpcy50aGVuKCk7XG5cbiAgICBpZiAoc3RhdHVzID09PSAnc3VjY2VlZGVkJylcbiAgICAgIHRoaXMuX3Jlc29sdmUodmFsdWUpO1xuICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2ZhaWxlZCcpXG4gICAgICB0aGlzLl9yZWplY3QodmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIGRlbGV0ZSB0aGlzLl9wcm9taXNlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9KU09OID0gcmVxdWlyZSgnLi4vdXRpbC90b19qc29uJyk7XG5cbnZhciBMb2dnaW5nID0ge1xuICBMT0dfTEVWRUxTOiB7XG4gICAgZmF0YWw6ICA0LFxuICAgIGVycm9yOiAgMyxcbiAgICB3YXJuOiAgIDIsXG4gICAgaW5mbzogICAxLFxuICAgIGRlYnVnOiAgMFxuICB9LFxuXG4gIHdyaXRlTG9nOiBmdW5jdGlvbihtZXNzYWdlQXJncywgbGV2ZWwpIHtcbiAgICB2YXIgbG9nZ2VyID0gTG9nZ2luZy5sb2dnZXIgfHwgKExvZ2dpbmcud3JhcHBlciB8fCBMb2dnaW5nKS5sb2dnZXI7XG4gICAgaWYgKCFsb2dnZXIpIHJldHVybjtcblxuICAgIHZhciBhcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobWVzc2FnZUFyZ3MpLFxuICAgICAgICBiYW5uZXIgPSAnW0ZheWUnLFxuICAgICAgICBrbGFzcyAgPSB0aGlzLmNsYXNzTmFtZSxcblxuICAgICAgICBtZXNzYWdlID0gYXJncy5zaGlmdCgpLnJlcGxhY2UoL1xcPy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRvSlNPTihhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tPYmplY3RdJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgaWYgKGtsYXNzKSBiYW5uZXIgKz0gJy4nICsga2xhc3M7XG4gICAgYmFubmVyICs9ICddICc7XG5cbiAgICBpZiAodHlwZW9mIGxvZ2dlcltsZXZlbF0gPT09ICdmdW5jdGlvbicpXG4gICAgICBsb2dnZXJbbGV2ZWxdKGJhbm5lciArIG1lc3NhZ2UpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBsb2dnZXIgPT09ICdmdW5jdGlvbicpXG4gICAgICBsb2dnZXIoYmFubmVyICsgbWVzc2FnZSk7XG4gIH1cbn07XG5cbmZvciAodmFyIGtleSBpbiBMb2dnaW5nLkxPR19MRVZFTFMpXG4gIChmdW5jdGlvbihsZXZlbCkge1xuICAgIExvZ2dpbmdbbGV2ZWxdID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLndyaXRlTG9nKGFyZ3VtZW50cywgbGV2ZWwpO1xuICAgIH07XG4gIH0pKGtleSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nZ2luZztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZCAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvZXh0ZW5kJyksXG4gICAgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi4vdXRpbC9ldmVudF9lbWl0dGVyJyk7XG5cbnZhciBQdWJsaXNoZXIgPSB7XG4gIGNvdW50TGlzdGVuZXJzOiBmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMoZXZlbnRUeXBlKS5sZW5ndGg7XG4gIH0sXG5cbiAgYmluZDogZnVuY3Rpb24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgIHZhciBzbGljZSAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24oKSB7IGxpc3RlbmVyLmFwcGx5KGNvbnRleHQsIHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgfTtcblxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChbZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCwgaGFuZGxlcl0pO1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH0sXG5cbiAgdW5iaW5kOiBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IFtdO1xuICAgIHZhciBuID0gdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCwgdHVwbGU7XG5cbiAgICB3aGlsZSAobi0tKSB7XG4gICAgICB0dXBsZSA9IHRoaXMuX2xpc3RlbmVyc1tuXTtcbiAgICAgIGlmICh0dXBsZVswXSAhPT0gZXZlbnRUeXBlKSBjb250aW51ZTtcbiAgICAgIGlmIChsaXN0ZW5lciAmJiAodHVwbGVbMV0gIT09IGxpc3RlbmVyIHx8IHR1cGxlWzJdICE9PSBjb250ZXh0KSkgY29udGludWU7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKG4sIDEpO1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudFR5cGUsIHR1cGxlWzNdKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4dGVuZChQdWJsaXNoZXIsIEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuUHVibGlzaGVyLnRyaWdnZXIgPSBQdWJsaXNoZXIuZW1pdDtcblxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGRUaW1lb3V0OiBmdW5jdGlvbihuYW1lLCBkZWxheSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl90aW1lb3V0cyA9IHRoaXMuX3RpbWVvdXRzIHx8IHt9O1xuICAgIGlmICh0aGlzLl90aW1lb3V0cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgcmV0dXJuO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl90aW1lb3V0c1tuYW1lXSA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHNlbGYuX3RpbWVvdXRzW25hbWVdO1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcbiAgICB9LCAxMDAwICogZGVsYXkpO1xuICB9LFxuXG4gIHJlbW92ZVRpbWVvdXQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB0aGlzLl90aW1lb3V0cyA9IHRoaXMuX3RpbWVvdXRzIHx8IHt9O1xuICAgIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dHNbbmFtZV07XG4gICAgaWYgKCF0aW1lb3V0KSByZXR1cm47XG4gICAgZ2xvYmFsLmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBkZWxldGUgdGhpcy5fdGltZW91dHNbbmFtZV07XG4gIH0sXG5cbiAgcmVtb3ZlQWxsVGltZW91dHM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3RpbWVvdXRzID0gdGhpcy5fdGltZW91dHMgfHwge307XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLl90aW1lb3V0cykgdGhpcy5yZW1vdmVUaW1lb3V0KG5hbWUpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIGV4dGVuZCAgICA9IHJlcXVpcmUoJy4uL3V0aWwvZXh0ZW5kJyksXG4gICAgUHVibGlzaGVyID0gcmVxdWlyZSgnLi4vbWl4aW5zL3B1Ymxpc2hlcicpLFxuICAgIEdyYW1tYXIgICA9IHJlcXVpcmUoJy4vZ3JhbW1hcicpO1xuXG52YXIgQ2hhbm5lbCA9IENsYXNzKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHRoaXMuaWQgPSB0aGlzLm5hbWUgPSBuYW1lO1xuICB9LFxuXG4gIHB1c2g6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICB0aGlzLnRyaWdnZXIoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcbiAgfSxcblxuICBpc1VudXNlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRMaXN0ZW5lcnMoJ21lc3NhZ2UnKSA9PT0gMDtcbiAgfVxufSk7XG5cbmV4dGVuZChDaGFubmVsLnByb3RvdHlwZSwgUHVibGlzaGVyKTtcblxuZXh0ZW5kKENoYW5uZWwsIHtcbiAgSEFORFNIQUtFOiAgICAnL21ldGEvaGFuZHNoYWtlJyxcbiAgQ09OTkVDVDogICAgICAnL21ldGEvY29ubmVjdCcsXG4gIFNVQlNDUklCRTogICAgJy9tZXRhL3N1YnNjcmliZScsXG4gIFVOU1VCU0NSSUJFOiAgJy9tZXRhL3Vuc3Vic2NyaWJlJyxcbiAgRElTQ09OTkVDVDogICAnL21ldGEvZGlzY29ubmVjdCcsXG5cbiAgTUVUQTogICAgICAgICAnbWV0YScsXG4gIFNFUlZJQ0U6ICAgICAgJ3NlcnZpY2UnLFxuXG4gIGV4cGFuZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBzZWdtZW50cyA9IHRoaXMucGFyc2UobmFtZSksXG4gICAgICAgIGNoYW5uZWxzID0gWycvKionLCBuYW1lXTtcblxuICAgIHZhciBjb3B5ID0gc2VnbWVudHMuc2xpY2UoKTtcbiAgICBjb3B5W2NvcHkubGVuZ3RoIC0gMV0gPSAnKic7XG4gICAgY2hhbm5lbHMucHVzaCh0aGlzLnVucGFyc2UoY29weSkpO1xuXG4gICAgZm9yICh2YXIgaSA9IDEsIG4gPSBzZWdtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGNvcHkgPSBzZWdtZW50cy5zbGljZSgwLCBpKTtcbiAgICAgIGNvcHkucHVzaCgnKionKTtcbiAgICAgIGNoYW5uZWxzLnB1c2godGhpcy51bnBhcnNlKGNvcHkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbHM7XG4gIH0sXG5cbiAgaXNWYWxpZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBHcmFtbWFyLkNIQU5ORUxfTkFNRS50ZXN0KG5hbWUpIHx8XG4gICAgICAgICAgIEdyYW1tYXIuQ0hBTk5FTF9QQVRURVJOLnRlc3QobmFtZSk7XG4gIH0sXG5cbiAgcGFyc2U6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChuYW1lKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG5hbWUuc3BsaXQoJy8nKS5zbGljZSgxKTtcbiAgfSxcblxuICB1bnBhcnNlOiBmdW5jdGlvbihzZWdtZW50cykge1xuICAgIHJldHVybiAnLycgKyBzZWdtZW50cy5qb2luKCcvJyk7XG4gIH0sXG5cbiAgaXNNZXRhOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHNlZ21lbnRzID0gdGhpcy5wYXJzZShuYW1lKTtcbiAgICByZXR1cm4gc2VnbWVudHMgPyAoc2VnbWVudHNbMF0gPT09IHRoaXMuTUVUQSkgOiBudWxsO1xuICB9LFxuXG4gIGlzU2VydmljZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBzZWdtZW50cyA9IHRoaXMucGFyc2UobmFtZSk7XG4gICAgcmV0dXJuIHNlZ21lbnRzID8gKHNlZ21lbnRzWzBdID09PSB0aGlzLlNFUlZJQ0UpIDogbnVsbDtcbiAgfSxcblxuICBpc1N1YnNjcmliYWJsZTogZnVuY3Rpb24obmFtZSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKG5hbWUpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gIXRoaXMuaXNNZXRhKG5hbWUpICYmICF0aGlzLmlzU2VydmljZShuYW1lKTtcbiAgfSxcblxuICBTZXQ6IENsYXNzKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgfSxcblxuICAgIGdldEtleXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9jaGFubmVscykga2V5cy5wdXNoKGtleSk7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBkZWxldGUgdGhpcy5fY2hhbm5lbHNbbmFtZV07XG4gICAgfSxcblxuICAgIGhhc1N1YnNjcmlwdGlvbjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG5cbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKG5hbWVzLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgIHZhciBuYW1lO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBuYW1lcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICB2YXIgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW25hbWVdID0gdGhpcy5fY2hhbm5lbHNbbmFtZV0gfHwgbmV3IENoYW5uZWwobmFtZSk7XG4gICAgICAgIGNoYW5uZWwuYmluZCgnbWVzc2FnZScsIHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihuYW1lLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgIHZhciBjaGFubmVsID0gdGhpcy5fY2hhbm5lbHNbbmFtZV07XG4gICAgICBpZiAoIWNoYW5uZWwpIHJldHVybiBmYWxzZTtcbiAgICAgIGNoYW5uZWwudW5iaW5kKCdtZXNzYWdlJywgc3Vic2NyaXB0aW9uKTtcblxuICAgICAgaWYgKGNoYW5uZWwuaXNVbnVzZWQoKSkge1xuICAgICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRpc3RyaWJ1dGVNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICB2YXIgY2hhbm5lbHMgPSBDaGFubmVsLmV4cGFuZChtZXNzYWdlLmNoYW5uZWwpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGNoYW5uZWxzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxzW2ldXTtcbiAgICAgICAgaWYgKGNoYW5uZWwpIGNoYW5uZWwudHJpZ2dlcignbWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSlcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYW5uZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc2FwICAgICAgICAgICAgPSByZXF1aXJlKCdhc2FwJyksXG4gICAgQ2xhc3MgICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIFByb21pc2UgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvcHJvbWlzZScpLFxuICAgIFVSSSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdXJpJyksXG4gICAgYXJyYXkgICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpLFxuICAgIGJyb3dzZXIgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYnJvd3NlcicpLFxuICAgIGNvbnN0YW50cyAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY29uc3RhbnRzJyksXG4gICAgZXh0ZW5kICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9leHRlbmQnKSxcbiAgICB2YWxpZGF0ZU9wdGlvbnMgPSByZXF1aXJlKCcuLi91dGlsL3ZhbGlkYXRlX29wdGlvbnMnKSxcbiAgICBEZWZlcnJhYmxlICAgICAgPSByZXF1aXJlKCcuLi9taXhpbnMvZGVmZXJyYWJsZScpLFxuICAgIExvZ2dpbmcgICAgICAgICA9IHJlcXVpcmUoJy4uL21peGlucy9sb2dnaW5nJyksXG4gICAgUHVibGlzaGVyICAgICAgID0gcmVxdWlyZSgnLi4vbWl4aW5zL3B1Ymxpc2hlcicpLFxuICAgIENoYW5uZWwgICAgICAgICA9IHJlcXVpcmUoJy4vY2hhbm5lbCcpLFxuICAgIERpc3BhdGNoZXIgICAgICA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hlcicpLFxuICAgIEVycm9yICAgICAgICAgICA9IHJlcXVpcmUoJy4vZXJyb3InKSxcbiAgICBFeHRlbnNpYmxlICAgICAgPSByZXF1aXJlKCcuL2V4dGVuc2libGUnKSxcbiAgICBQdWJsaWNhdGlvbiAgICAgPSByZXF1aXJlKCcuL3B1YmxpY2F0aW9uJyksXG4gICAgU3Vic2NyaXB0aW9uICAgID0gcmVxdWlyZSgnLi9zdWJzY3JpcHRpb24nKTtcblxudmFyIENsaWVudCA9IENsYXNzKHsgY2xhc3NOYW1lOiAnQ2xpZW50JyxcbiAgVU5DT05ORUNURUQ6ICAgICAgICAxLFxuICBDT05ORUNUSU5HOiAgICAgICAgIDIsXG4gIENPTk5FQ1RFRDogICAgICAgICAgMyxcbiAgRElTQ09OTkVDVEVEOiAgICAgICA0LFxuXG4gIEhBTkRTSEFLRTogICAgICAgICAgJ2hhbmRzaGFrZScsXG4gIFJFVFJZOiAgICAgICAgICAgICAgJ3JldHJ5JyxcbiAgTk9ORTogICAgICAgICAgICAgICAnbm9uZScsXG5cbiAgQ09OTkVDVElPTl9USU1FT1VUOiA2MCxcblxuICBERUZBVUxUX0VORFBPSU5UOiAgICcvYmF5ZXV4JyxcbiAgSU5URVJWQUw6ICAgICAgICAgICAwLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGVuZHBvaW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbmZvKCdOZXcgY2xpZW50IGNyZWF0ZWQgZm9yID8nLCBlbmRwb2ludCk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgWydpbnRlcnZhbCcsICd0aW1lb3V0JywgJ2VuZHBvaW50cycsICdwcm94eScsICdyZXRyeScsICdzY2hlZHVsZXInLCAnd2Vic29ja2V0RXh0ZW5zaW9ucycsICd0bHMnLCAnY2EnXSk7XG5cbiAgICB0aGlzLl9jaGFubmVscyAgID0gbmV3IENoYW5uZWwuU2V0KCk7XG4gICAgdGhpcy5fZGlzcGF0Y2hlciA9IERpc3BhdGNoZXIuY3JlYXRlKHRoaXMsIGVuZHBvaW50IHx8IHRoaXMuREVGQVVMVF9FTkRQT0lOVCwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9tZXNzYWdlSWQgPSAwO1xuICAgIHRoaXMuX3N0YXRlICAgICA9IHRoaXMuVU5DT05ORUNURUQ7XG5cbiAgICB0aGlzLl9yZXNwb25zZUNhbGxiYWNrcyA9IHt9O1xuXG4gICAgdGhpcy5fYWR2aWNlID0ge1xuICAgICAgcmVjb25uZWN0OiB0aGlzLlJFVFJZLFxuICAgICAgaW50ZXJ2YWw6ICAxMDAwICogKG9wdGlvbnMuaW50ZXJ2YWwgfHwgdGhpcy5JTlRFUlZBTCksXG4gICAgICB0aW1lb3V0OiAgIDEwMDAgKiAob3B0aW9ucy50aW1lb3V0ICB8fCB0aGlzLkNPTk5FQ1RJT05fVElNRU9VVClcbiAgICB9O1xuICAgIHRoaXMuX2Rpc3BhdGNoZXIudGltZW91dCA9IHRoaXMuX2FkdmljZS50aW1lb3V0IC8gMTAwMDtcblxuICAgIHRoaXMuX2Rpc3BhdGNoZXIuYmluZCgnbWVzc2FnZScsIHRoaXMuX3JlY2VpdmVNZXNzYWdlLCB0aGlzKTtcblxuICAgIGlmIChicm93c2VyLkV2ZW50ICYmIGdsb2JhbC5vbmJlZm9yZXVubG9hZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgYnJvd3Nlci5FdmVudC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodGhpcy5fZGlzcGF0Y2hlci5fZGlzYWJsZWQsICdhdXRvZGlzY29ubmVjdCcpIDwgMClcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGFkZFdlYnNvY2tldEV4dGVuc2lvbjogZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuYWRkV2Vic29ja2V0RXh0ZW5zaW9uKGV4dGVuc2lvbik7XG4gIH0sXG5cbiAgZGlzYWJsZTogZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc2FibGUoZmVhdHVyZSk7XG4gIH0sXG5cbiAgc2V0SGVhZGVyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLnNldEhlYWRlcihuYW1lLCB2YWx1ZSk7XG4gIH0sXG5cbiAgLy8gUmVxdWVzdFxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWxcbiAgLy8gICAgICAgICAgICAgICAgKiB2ZXJzaW9uXG4gIC8vICAgICAgICAgICAgICAgICogc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogbWluaW11bVZlcnNpb25cbiAgLy8gICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZFxuICAvL1xuICAvLyBTdWNjZXNzIFJlc3BvbnNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGYWlsZWQgUmVzcG9uc2VcbiAgLy8gTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsICAgICAgICAgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogdmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bFxuICAvLyAgICAgICAgICAgICAgICAqIHN1cHBvcnRlZENvbm5lY3Rpb25UeXBlcyAgICAgICAgICAgICAgICAgICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzXG4gIC8vICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogYWR2aWNlXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogbWluaW11bVZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdmVyc2lvblxuICAvLyAgICAgICAgICAgICAgICAqIGFkdmljZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIG1pbmltdW1WZXJzaW9uXG4gIC8vICAgICAgICAgICAgICAgICogZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgKiBhdXRoU3VjY2Vzc2Z1bFxuICBoYW5kc2hha2U6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuX2FkdmljZS5yZWNvbm5lY3QgPT09IHRoaXMuTk9ORSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gdGhpcy5VTkNPTk5FQ1RFRCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLkNPTk5FQ1RJTkc7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5pbmZvKCdJbml0aWF0aW5nIGhhbmRzaGFrZSB3aXRoID8nLCBVUkkuc3RyaW5naWZ5KHRoaXMuX2Rpc3BhdGNoZXIuZW5kcG9pbnQpKTtcbiAgICB0aGlzLl9kaXNwYXRjaGVyLnNlbGVjdFRyYW5zcG9ydChjb25zdGFudHMuTUFOREFUT1JZX0NPTk5FQ1RJT05fVFlQRVMpO1xuXG4gICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgY2hhbm5lbDogICAgICAgICAgICAgICAgICBDaGFubmVsLkhBTkRTSEFLRSxcbiAgICAgIHZlcnNpb246ICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLkJBWUVVWF9WRVJTSU9OLFxuICAgICAgc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzOiB0aGlzLl9kaXNwYXRjaGVyLmdldENvbm5lY3Rpb25UeXBlcygpXG5cbiAgICB9LCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLkNPTk5FQ1RFRDtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCAgPSByZXNwb25zZS5jbGllbnRJZDtcblxuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLnNlbGVjdFRyYW5zcG9ydChyZXNwb25zZS5zdXBwb3J0ZWRDb25uZWN0aW9uVHlwZXMpO1xuXG4gICAgICAgIHRoaXMuaW5mbygnSGFuZHNoYWtlIHN1Y2Nlc3NmdWw6ID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmliZSh0aGlzLl9jaGFubmVscy5nZXRLZXlzKCksIHRydWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIGFzYXAoZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCkgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5mbygnSGFuZHNoYWtlIHVuc3VjY2Vzc2Z1bCcpO1xuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHsgc2VsZi5oYW5kc2hha2UoY2FsbGJhY2ssIGNvbnRleHQpIH0sIHRoaXMuX2Rpc3BhdGNoZXIucmV0cnkgKiAxMDAwKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLlVOQ09OTkVDVEVEO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gICAgICAgICAgICAgICAgKiBjb25uZWN0aW9uVHlwZSAgICAgICAgICAgICAgICAgICAgICogY2xpZW50SWRcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBleHQgICAgICAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogYWR2aWNlXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGV4dFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBpZFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aW1lc3RhbXBcbiAgY29ubmVjdDogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5fYWR2aWNlLnJlY29ubmVjdCA9PT0gdGhpcy5OT05FKSByZXR1cm47XG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLkRJU0NPTk5FQ1RFRCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLlVOQ09OTkVDVEVEKVxuICAgICAgcmV0dXJuIHRoaXMuaGFuZHNoYWtlKGZ1bmN0aW9uKCkgeyB0aGlzLmNvbm5lY3QoY2FsbGJhY2ssIGNvbnRleHQpIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5jYWxsYmFjayhjYWxsYmFjaywgY29udGV4dCk7XG4gICAgaWYgKHRoaXMuX3N0YXRlICE9PSB0aGlzLkNPTk5FQ1RFRCkgcmV0dXJuO1xuXG4gICAgdGhpcy5pbmZvKCdDYWxsaW5nIGRlZmVycmVkIGFjdGlvbnMgZm9yID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcbiAgICB0aGlzLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICB0aGlzLnNldERlZmVycmVkU3RhdHVzKCd1bmtub3duJyk7XG5cbiAgICBpZiAodGhpcy5fY29ubmVjdFJlcXVlc3QpIHJldHVybjtcbiAgICB0aGlzLl9jb25uZWN0UmVxdWVzdCA9IHRydWU7XG5cbiAgICB0aGlzLmluZm8oJ0luaXRpYXRpbmcgY29ubmVjdGlvbiBmb3IgPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuXG4gICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgY2hhbm5lbDogICAgICAgIENoYW5uZWwuQ09OTkVDVCxcbiAgICAgIGNsaWVudElkOiAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLFxuICAgICAgY29ubmVjdGlvblR5cGU6IHRoaXMuX2Rpc3BhdGNoZXIuY29ubmVjdGlvblR5cGVcblxuICAgIH0sIHt9LCB0aGlzLl9jeWNsZUNvbm5lY3Rpb24sIHRoaXMpO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogY2xpZW50SWRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGlkXG4gIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gdGhpcy5DT05ORUNURUQpIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuRElTQ09OTkVDVEVEO1xuXG4gICAgdGhpcy5pbmZvKCdEaXNjb25uZWN0aW5nID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkKTtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQdWJsaWNhdGlvbigpO1xuXG4gICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgY2hhbm5lbDogIENoYW5uZWwuRElTQ09OTkVDVCxcbiAgICAgIGNsaWVudElkOiB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkXG5cbiAgICB9LCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzZnVsKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xvc2UoKTtcbiAgICAgICAgcHJvbWlzZS5zZXREZWZlcnJlZFN0YXR1cygnc3VjY2VlZGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnLCBFcnJvci5wYXJzZShyZXNwb25zZS5lcnJvcikpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5pbmZvKCdDbGVhcmluZyBjaGFubmVsIGxpc3RlbmVycyBmb3IgPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuICAgIHRoaXMuX2NoYW5uZWxzID0gbmV3IENoYW5uZWwuU2V0KCk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfSxcblxuICAvLyBSZXF1ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzcG9uc2VcbiAgLy8gTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsICAgICAgICAgICAgIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbFxuICAvLyAgICAgICAgICAgICAgICAqIGNsaWVudElkICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzdWNjZXNzZnVsXG4gIC8vICAgICAgICAgICAgICAgICogc3Vic2NyaXB0aW9uICAgICAgICAgICAgICAgICAgICAgICAqIGNsaWVudElkXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1YnNjcmlwdGlvblxuICAvLyAgICAgICAgICAgICAgICAqIGlkICAgICAgICAgICAgICAgICAgTUFZIGluY2x1ZGU6ICAgKiBlcnJvclxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBhZHZpY2VcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGlkXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHRpbWVzdGFtcFxuICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGNoYW5uZWwsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKGNoYW5uZWwgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgIHJldHVybiBhcnJheS5tYXAoY2hhbm5lbCwgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmUoYywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0aGlzLCBjaGFubmVsLCBjYWxsYmFjaywgY29udGV4dCksXG4gICAgICAgIGZvcmNlICAgICAgICA9IChjYWxsYmFjayA9PT0gdHJ1ZSksXG4gICAgICAgIGhhc1N1YnNjcmliZSA9IHRoaXMuX2NoYW5uZWxzLmhhc1N1YnNjcmlwdGlvbihjaGFubmVsKTtcblxuICAgIGlmIChoYXNTdWJzY3JpYmUgJiYgIWZvcmNlKSB7XG4gICAgICB0aGlzLl9jaGFubmVscy5zdWJzY3JpYmUoW2NoYW5uZWxdLCBzdWJzY3JpcHRpb24pO1xuICAgICAgc3Vic2NyaXB0aW9uLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfVxuXG4gICAgdGhpcy5jb25uZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbmZvKCdDbGllbnQgPyBhdHRlbXB0aW5nIHRvIHN1YnNjcmliZSB0byA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCwgY2hhbm5lbCk7XG4gICAgICBpZiAoIWZvcmNlKSB0aGlzLl9jaGFubmVscy5zdWJzY3JpYmUoW2NoYW5uZWxdLCBzdWJzY3JpcHRpb24pO1xuXG4gICAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWw6ICAgICAgQ2hhbm5lbC5TVUJTQ1JJQkUsXG4gICAgICAgIGNsaWVudElkOiAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCxcbiAgICAgICAgc3Vic2NyaXB0aW9uOiBjaGFubmVsXG5cbiAgICAgIH0sIHt9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICBzdWJzY3JpcHRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcsIEVycm9yLnBhcnNlKHJlc3BvbnNlLmVycm9yKSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzLnVuc3Vic2NyaWJlKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hhbm5lbHMgPSBbXS5jb25jYXQocmVzcG9uc2Uuc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5pbmZvKCdTdWJzY3JpcHRpb24gYWNrbm93bGVkZ2VkIGZvciA/IHRvID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBjaGFubmVscyk7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5zZXREZWZlcnJlZFN0YXR1cygnc3VjY2VlZGVkJyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH0sXG5cbiAgLy8gUmVxdWVzdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc3BvbnNlXG4gIC8vIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbCAgICAgICAgICAgICBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWxcbiAgLy8gICAgICAgICAgICAgICAgKiBjbGllbnRJZCAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bFxuICAvLyAgICAgICAgICAgICAgICAqIHN1YnNjcmlwdGlvbiAgICAgICAgICAgICAgICAgICAgICAgKiBjbGllbnRJZFxuICAvLyBNQVkgaW5jbHVkZTogICAqIGV4dCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzdWJzY3JpcHRpb25cbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogYWR2aWNlXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGV4dFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBpZFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiB0aW1lc3RhbXBcbiAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGNoYW5uZWwsIHN1YnNjcmlwdGlvbikge1xuICAgIGlmIChjaGFubmVsIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICByZXR1cm4gYXJyYXkubWFwKGNoYW5uZWwsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5zdWJzY3JpYmUoYywgc3Vic2NyaXB0aW9uKTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIGRlYWQgPSB0aGlzLl9jaGFubmVscy51bnN1YnNjcmliZShjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuICAgIGlmICghZGVhZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5jb25uZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbmZvKCdDbGllbnQgPyBhdHRlbXB0aW5nIHRvIHVuc3Vic2NyaWJlIGZyb20gPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIGNoYW5uZWwpO1xuXG4gICAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWw6ICAgICAgQ2hhbm5lbC5VTlNVQlNDUklCRSxcbiAgICAgICAgY2xpZW50SWQ6ICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLFxuICAgICAgICBzdWJzY3JpcHRpb246IGNoYW5uZWxcblxuICAgICAgfSwge30sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzc2Z1bCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBjaGFubmVscyA9IFtdLmNvbmNhdChyZXNwb25zZS5zdWJzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmluZm8oJ1Vuc3Vic2NyaXB0aW9uIGFja25vd2xlZGdlZCBmb3IgPyBmcm9tID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBjaGFubmVscyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICAvLyBSZXF1ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzcG9uc2VcbiAgLy8gTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsICAgICAgICAgICAgIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbFxuICAvLyAgICAgICAgICAgICAgICAqIGRhdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzdWNjZXNzZnVsXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogY2xpZW50SWQgICAgICAgICAgICBNQVkgaW5jbHVkZTogICAqIGlkXG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICogZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGV4dFxuICBwdWJsaXNoOiBmdW5jdGlvbihjaGFubmVsLCBkYXRhLCBvcHRpb25zKSB7XG4gICAgdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMgfHwge30sIFsnYXR0ZW1wdHMnLCAnZGVhZGxpbmUnXSk7XG4gICAgdmFyIHB1YmxpY2F0aW9uID0gbmV3IFB1YmxpY2F0aW9uKCk7XG5cbiAgICB0aGlzLmNvbm5lY3QoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluZm8oJ0NsaWVudCA/IHF1ZXVlaW5nIHB1Ymxpc2hlZCBtZXNzYWdlIHRvID86ID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBjaGFubmVsLCBkYXRhKTtcblxuICAgICAgdGhpcy5fc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBjaGFubmVsOiAgY2hhbm5lbCxcbiAgICAgICAgZGF0YTogICAgIGRhdGEsXG4gICAgICAgIGNsaWVudElkOiB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkXG5cbiAgICAgIH0sIG9wdGlvbnMsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzZnVsKVxuICAgICAgICAgIHB1YmxpY2F0aW9uLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHB1YmxpY2F0aW9uLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnLCBFcnJvci5wYXJzZShyZXNwb25zZS5lcnJvcikpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gcHVibGljYXRpb247XG4gIH0sXG5cbiAgX3NlbmRNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIG1lc3NhZ2UuaWQgPSB0aGlzLl9nZW5lcmF0ZU1lc3NhZ2VJZCgpO1xuXG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzLl9hZHZpY2UudGltZW91dFxuICAgICAgICAgICAgICAgID8gMS4yICogdGhpcy5fYWR2aWNlLnRpbWVvdXQgLyAxMDAwXG4gICAgICAgICAgICAgICAgOiAxLjIgKiB0aGlzLl9kaXNwYXRjaGVyLnJldHJ5O1xuXG4gICAgdGhpcy5waXBlVGhyb3VnaEV4dGVuc2lvbnMoJ291dGdvaW5nJywgbWVzc2FnZSwgbnVsbCwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm47XG4gICAgICBpZiAoY2FsbGJhY2spIHRoaXMuX3Jlc3BvbnNlQ2FsbGJhY2tzW21lc3NhZ2UuaWRdID0gW2NhbGxiYWNrLCBjb250ZXh0XTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuc2VuZE1lc3NhZ2UobWVzc2FnZSwgdGltZW91dCwgb3B0aW9ucyB8fCB7fSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX2dlbmVyYXRlTWVzc2FnZUlkOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9tZXNzYWdlSWQgKz0gMTtcbiAgICBpZiAodGhpcy5fbWVzc2FnZUlkID49IE1hdGgucG93KDIsMzIpKSB0aGlzLl9tZXNzYWdlSWQgPSAwO1xuICAgIHJldHVybiB0aGlzLl9tZXNzYWdlSWQudG9TdHJpbmcoMzYpO1xuICB9LFxuXG4gIF9yZWNlaXZlTWVzc2FnZTogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIHZhciBpZCA9IG1lc3NhZ2UuaWQsIGNhbGxiYWNrO1xuXG4gICAgaWYgKG1lc3NhZ2Uuc3VjY2Vzc2Z1bCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjYWxsYmFjayA9IHRoaXMuX3Jlc3BvbnNlQ2FsbGJhY2tzW2lkXTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9yZXNwb25zZUNhbGxiYWNrc1tpZF07XG4gICAgfVxuXG4gICAgdGhpcy5waXBlVGhyb3VnaEV4dGVuc2lvbnMoJ2luY29taW5nJywgbWVzc2FnZSwgbnVsbCwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm47XG4gICAgICBpZiAobWVzc2FnZS5hZHZpY2UpIHRoaXMuX2hhbmRsZUFkdmljZShtZXNzYWdlLmFkdmljZSk7XG4gICAgICB0aGlzLl9kZWxpdmVyTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2tbMF0uY2FsbChjYWxsYmFja1sxXSwgbWVzc2FnZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX2hhbmRsZUFkdmljZTogZnVuY3Rpb24oYWR2aWNlKSB7XG4gICAgZXh0ZW5kKHRoaXMuX2FkdmljZSwgYWR2aWNlKTtcbiAgICB0aGlzLl9kaXNwYXRjaGVyLnRpbWVvdXQgPSB0aGlzLl9hZHZpY2UudGltZW91dCAvIDEwMDA7XG5cbiAgICBpZiAodGhpcy5fYWR2aWNlLnJlY29ubmVjdCA9PT0gdGhpcy5IQU5EU0hBS0UgJiYgdGhpcy5fc3RhdGUgIT09IHRoaXMuRElTQ09OTkVDVEVEKSB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuVU5DT05ORUNURUQ7XG4gICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkID0gbnVsbDtcbiAgICAgIHRoaXMuX2N5Y2xlQ29ubmVjdGlvbigpO1xuICAgIH1cbiAgfSxcblxuICBfZGVsaXZlck1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICBpZiAoIW1lc3NhZ2UuY2hhbm5lbCB8fCBtZXNzYWdlLmRhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIHRoaXMuaW5mbygnQ2xpZW50ID8gY2FsbGluZyBsaXN0ZW5lcnMgZm9yID8gd2l0aCA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCwgbWVzc2FnZS5jaGFubmVsLCBtZXNzYWdlLmRhdGEpO1xuICAgIHRoaXMuX2NoYW5uZWxzLmRpc3RyaWJ1dGVNZXNzYWdlKG1lc3NhZ2UpO1xuICB9LFxuXG4gIF9jeWNsZUNvbm5lY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jb25uZWN0UmVxdWVzdCkge1xuICAgICAgdGhpcy5fY29ubmVjdFJlcXVlc3QgPSBudWxsO1xuICAgICAgdGhpcy5pbmZvKCdDbG9zZWQgY29ubmVjdGlvbiBmb3IgPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHNlbGYuY29ubmVjdCgpIH0sIHRoaXMuX2FkdmljZS5pbnRlcnZhbCk7XG4gIH1cbn0pO1xuXG5leHRlbmQoQ2xpZW50LnByb3RvdHlwZSwgRGVmZXJyYWJsZSk7XG5leHRlbmQoQ2xpZW50LnByb3RvdHlwZSwgUHVibGlzaGVyKTtcbmV4dGVuZChDbGllbnQucHJvdG90eXBlLCBMb2dnaW5nKTtcbmV4dGVuZChDbGllbnQucHJvdG90eXBlLCBFeHRlbnNpYmxlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbGllbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDbGFzcyAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgVVJJICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC91cmknKSxcbiAgICBjb29raWVzICAgPSByZXF1aXJlKCcuLi91dGlsL2Nvb2tpZXMnKSxcbiAgICBleHRlbmQgICAgPSByZXF1aXJlKCcuLi91dGlsL2V4dGVuZCcpLFxuICAgIExvZ2dpbmcgICA9IHJlcXVpcmUoJy4uL21peGlucy9sb2dnaW5nJyksXG4gICAgUHVibGlzaGVyID0gcmVxdWlyZSgnLi4vbWl4aW5zL3B1Ymxpc2hlcicpLFxuICAgIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpLFxuICAgIFNjaGVkdWxlciA9IHJlcXVpcmUoJy4vc2NoZWR1bGVyJyk7XG5cbnZhciBEaXNwYXRjaGVyID0gQ2xhc3MoeyBjbGFzc05hbWU6ICdEaXNwYXRjaGVyJyxcbiAgTUFYX1JFUVVFU1RfU0laRTogMjA0OCxcbiAgREVGQVVMVF9SRVRSWTogICAgNSxcblxuICBVUDogICAxLFxuICBET1dOOiAyLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGNsaWVudCwgZW5kcG9pbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9jbGllbnQgICAgID0gY2xpZW50O1xuICAgIHRoaXMuZW5kcG9pbnQgICAgPSBVUkkucGFyc2UoZW5kcG9pbnQpO1xuICAgIHRoaXMuX2FsdGVybmF0ZXMgPSBvcHRpb25zLmVuZHBvaW50cyB8fCB7fTtcblxuICAgIHRoaXMuY29va2llcyAgICAgID0gY29va2llcy5Db29raWVKYXIgJiYgbmV3IGNvb2tpZXMuQ29va2llSmFyKCk7XG4gICAgdGhpcy5fZGlzYWJsZWQgICAgPSBbXTtcbiAgICB0aGlzLl9lbnZlbG9wZXMgICA9IHt9O1xuICAgIHRoaXMuaGVhZGVycyAgICAgID0ge307XG4gICAgdGhpcy5yZXRyeSAgICAgICAgPSBvcHRpb25zLnJldHJ5IHx8IHRoaXMuREVGQVVMVF9SRVRSWTtcbiAgICB0aGlzLl9zY2hlZHVsZXIgICA9IG9wdGlvbnMuc2NoZWR1bGVyIHx8IFNjaGVkdWxlcjtcbiAgICB0aGlzLl9zdGF0ZSAgICAgICA9IDA7XG4gICAgdGhpcy50cmFuc3BvcnRzICAgPSB7fTtcbiAgICB0aGlzLndzRXh0ZW5zaW9ucyA9IFtdO1xuXG4gICAgdGhpcy5wcm94eSA9IG9wdGlvbnMucHJveHkgfHwge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9wcm94eSA9PT0gJ3N0cmluZycpIHRoaXMuX3Byb3h5ID0ge29yaWdpbjogdGhpcy5fcHJveHl9O1xuXG4gICAgdmFyIGV4dHMgPSBvcHRpb25zLndlYnNvY2tldEV4dGVuc2lvbnM7XG4gICAgaWYgKGV4dHMpIHtcbiAgICAgIGV4dHMgPSBbXS5jb25jYXQoZXh0cyk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGV4dHMubGVuZ3RoOyBpIDwgbjsgaSsrKVxuICAgICAgICB0aGlzLmFkZFdlYnNvY2tldEV4dGVuc2lvbihleHRzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLnRscyA9IG9wdGlvbnMudGxzIHx8IHt9O1xuICAgIHRoaXMudGxzLmNhID0gdGhpcy50bHMuY2EgfHwgb3B0aW9ucy5jYTtcblxuICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy5fYWx0ZXJuYXRlcylcbiAgICAgIHRoaXMuX2FsdGVybmF0ZXNbdHlwZV0gPSBVUkkucGFyc2UodGhpcy5fYWx0ZXJuYXRlc1t0eXBlXSk7XG5cbiAgICB0aGlzLm1heFJlcXVlc3RTaXplID0gdGhpcy5NQVhfUkVRVUVTVF9TSVpFO1xuICB9LFxuXG4gIGVuZHBvaW50Rm9yOiBmdW5jdGlvbihjb25uZWN0aW9uVHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9hbHRlcm5hdGVzW2Nvbm5lY3Rpb25UeXBlXSB8fCB0aGlzLmVuZHBvaW50O1xuICB9LFxuXG4gIGFkZFdlYnNvY2tldEV4dGVuc2lvbjogZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgdGhpcy53c0V4dGVuc2lvbnMucHVzaChleHRlbnNpb24pO1xuICB9LFxuXG4gIGRpc2FibGU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICB0aGlzLl9kaXNhYmxlZC5wdXNoKGZlYXR1cmUpO1xuICB9LFxuXG4gIHNldEhlYWRlcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLmhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgfSxcblxuICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuX3RyYW5zcG9ydDtcbiAgICBkZWxldGUgdGhpcy5fdHJhbnNwb3J0O1xuICAgIGlmICh0cmFuc3BvcnQpIHRyYW5zcG9ydC5jbG9zZSgpO1xuICB9LFxuXG4gIGdldENvbm5lY3Rpb25UeXBlczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFRyYW5zcG9ydC5nZXRDb25uZWN0aW9uVHlwZXMoKTtcbiAgfSxcblxuICBzZWxlY3RUcmFuc3BvcnQ6IGZ1bmN0aW9uKHRyYW5zcG9ydFR5cGVzKSB7XG4gICAgVHJhbnNwb3J0LmdldCh0aGlzLCB0cmFuc3BvcnRUeXBlcywgdGhpcy5fZGlzYWJsZWQsIGZ1bmN0aW9uKHRyYW5zcG9ydCkge1xuICAgICAgdGhpcy5kZWJ1ZygnU2VsZWN0ZWQgPyB0cmFuc3BvcnQgZm9yID8nLCB0cmFuc3BvcnQuY29ubmVjdGlvblR5cGUsIFVSSS5zdHJpbmdpZnkodHJhbnNwb3J0LmVuZHBvaW50KSk7XG5cbiAgICAgIGlmICh0cmFuc3BvcnQgPT09IHRoaXMuX3RyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgaWYgKHRoaXMuX3RyYW5zcG9ydCkgdGhpcy5fdHJhbnNwb3J0LmNsb3NlKCk7XG5cbiAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSB0cmFuc3BvcnQuY29ubmVjdGlvblR5cGU7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UsIHRpbWVvdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBpZCAgICAgICA9IG1lc3NhZ2UuaWQsXG4gICAgICAgIGF0dGVtcHRzID0gb3B0aW9ucy5hdHRlbXB0cyxcbiAgICAgICAgZGVhZGxpbmUgPSBvcHRpb25zLmRlYWRsaW5lICYmIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKG9wdGlvbnMuZGVhZGxpbmUgKiAxMDAwKSxcbiAgICAgICAgZW52ZWxvcGUgPSB0aGlzLl9lbnZlbG9wZXNbaWRdLFxuICAgICAgICBzY2hlZHVsZXI7XG5cbiAgICBpZiAoIWVudmVsb3BlKSB7XG4gICAgICBzY2hlZHVsZXIgPSBuZXcgdGhpcy5fc2NoZWR1bGVyKG1lc3NhZ2UsIHt0aW1lb3V0OiB0aW1lb3V0LCBpbnRlcnZhbDogdGhpcy5yZXRyeSwgYXR0ZW1wdHM6IGF0dGVtcHRzLCBkZWFkbGluZTogZGVhZGxpbmV9KTtcbiAgICAgIGVudmVsb3BlICA9IHRoaXMuX2VudmVsb3Blc1tpZF0gPSB7bWVzc2FnZTogbWVzc2FnZSwgc2NoZWR1bGVyOiBzY2hlZHVsZXJ9O1xuICAgIH1cblxuICAgIHRoaXMuX3NlbmRFbnZlbG9wZShlbnZlbG9wZSk7XG4gIH0sXG5cbiAgX3NlbmRFbnZlbG9wZTogZnVuY3Rpb24oZW52ZWxvcGUpIHtcbiAgICBpZiAoIXRoaXMuX3RyYW5zcG9ydCkgcmV0dXJuO1xuICAgIGlmIChlbnZlbG9wZS5yZXF1ZXN0IHx8IGVudmVsb3BlLnRpbWVyKSByZXR1cm47XG5cbiAgICB2YXIgbWVzc2FnZSAgID0gZW52ZWxvcGUubWVzc2FnZSxcbiAgICAgICAgc2NoZWR1bGVyID0gZW52ZWxvcGUuc2NoZWR1bGVyLFxuICAgICAgICBzZWxmICAgICAgPSB0aGlzO1xuXG4gICAgaWYgKCFzY2hlZHVsZXIuaXNEZWxpdmVyYWJsZSgpKSB7XG4gICAgICBzY2hlZHVsZXIuYWJvcnQoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9lbnZlbG9wZXNbbWVzc2FnZS5pZF07XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZW52ZWxvcGUudGltZXIgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuaGFuZGxlRXJyb3IobWVzc2FnZSk7XG4gICAgfSwgc2NoZWR1bGVyLmdldFRpbWVvdXQoKSAqIDEwMDApO1xuXG4gICAgc2NoZWR1bGVyLnNlbmQoKTtcbiAgICBlbnZlbG9wZS5yZXF1ZXN0ID0gdGhpcy5fdHJhbnNwb3J0LnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICB9LFxuXG4gIGhhbmRsZVJlc3BvbnNlOiBmdW5jdGlvbihyZXBseSkge1xuICAgIHZhciBlbnZlbG9wZSA9IHRoaXMuX2VudmVsb3Blc1tyZXBseS5pZF07XG5cbiAgICBpZiAocmVwbHkuc3VjY2Vzc2Z1bCAhPT0gdW5kZWZpbmVkICYmIGVudmVsb3BlKSB7XG4gICAgICBlbnZlbG9wZS5zY2hlZHVsZXIuc3VjY2VlZCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2VudmVsb3Blc1tyZXBseS5pZF07XG4gICAgICBnbG9iYWwuY2xlYXJUaW1lb3V0KGVudmVsb3BlLnRpbWVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ21lc3NhZ2UnLCByZXBseSk7XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IHRoaXMuVVApIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuVVA7XG4gICAgdGhpcy5fY2xpZW50LnRyaWdnZXIoJ3RyYW5zcG9ydDp1cCcpO1xuICB9LFxuXG4gIGhhbmRsZUVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgZW52ZWxvcGUgPSB0aGlzLl9lbnZlbG9wZXNbbWVzc2FnZS5pZF0sXG4gICAgICAgIHJlcXVlc3QgID0gZW52ZWxvcGUgJiYgZW52ZWxvcGUucmVxdWVzdCxcbiAgICAgICAgc2VsZiAgICAgPSB0aGlzO1xuXG4gICAgaWYgKCFyZXF1ZXN0KSByZXR1cm47XG5cbiAgICByZXF1ZXN0LnRoZW4oZnVuY3Rpb24ocmVxKSB7XG4gICAgICBpZiAocmVxICYmIHJlcS5hYm9ydCkgcmVxLmFib3J0KCk7XG4gICAgfSk7XG5cbiAgICB2YXIgc2NoZWR1bGVyID0gZW52ZWxvcGUuc2NoZWR1bGVyO1xuICAgIHNjaGVkdWxlci5mYWlsKCk7XG5cbiAgICBnbG9iYWwuY2xlYXJUaW1lb3V0KGVudmVsb3BlLnRpbWVyKTtcbiAgICBlbnZlbG9wZS5yZXF1ZXN0ID0gZW52ZWxvcGUudGltZXIgPSBudWxsO1xuXG4gICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgdGhpcy5fc2VuZEVudmVsb3BlKGVudmVsb3BlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW52ZWxvcGUudGltZXIgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgZW52ZWxvcGUudGltZXIgPSBudWxsO1xuICAgICAgICBzZWxmLl9zZW5kRW52ZWxvcGUoZW52ZWxvcGUpO1xuICAgICAgfSwgc2NoZWR1bGVyLmdldEludGVydmFsKCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IHRoaXMuRE9XTikgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5ET1dOO1xuICAgIHRoaXMuX2NsaWVudC50cmlnZ2VyKCd0cmFuc3BvcnQ6ZG93bicpO1xuICB9XG59KTtcblxuRGlzcGF0Y2hlci5jcmVhdGUgPSBmdW5jdGlvbihjbGllbnQsIGVuZHBvaW50LCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRGlzcGF0Y2hlcihjbGllbnQsIGVuZHBvaW50LCBvcHRpb25zKTtcbn07XG5cbmV4dGVuZChEaXNwYXRjaGVyLnByb3RvdHlwZSwgUHVibGlzaGVyKTtcbmV4dGVuZChEaXNwYXRjaGVyLnByb3RvdHlwZSwgTG9nZ2luZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgR3JhbW1hciA9IHJlcXVpcmUoJy4vZ3JhbW1hcicpO1xuXG52YXIgRXJyb3IgPSBDbGFzcyh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGNvZGUsIHBhcmFtcywgbWVzc2FnZSkge1xuICAgIHRoaXMuY29kZSAgICA9IGNvZGU7XG4gICAgdGhpcy5wYXJhbXMgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyYW1zKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9LFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb2RlICsgJzonICtcbiAgICAgICAgICAgdGhpcy5wYXJhbXMuam9pbignLCcpICsgJzonICtcbiAgICAgICAgICAgdGhpcy5tZXNzYWdlO1xuICB9XG59KTtcblxuRXJyb3IucGFyc2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIG1lc3NhZ2UgPSBtZXNzYWdlIHx8ICcnO1xuICBpZiAoIUdyYW1tYXIuRVJST1IudGVzdChtZXNzYWdlKSkgcmV0dXJuIG5ldyBFcnJvcihudWxsLCBbXSwgbWVzc2FnZSk7XG5cbiAgdmFyIHBhcnRzICAgPSBtZXNzYWdlLnNwbGl0KCc6JyksXG4gICAgICBjb2RlICAgID0gcGFyc2VJbnQocGFydHNbMF0pLFxuICAgICAgcGFyYW1zICA9IHBhcnRzWzFdLnNwbGl0KCcsJyksXG4gICAgICBtZXNzYWdlID0gcGFydHNbMl07XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihjb2RlLCBwYXJhbXMsIG1lc3NhZ2UpO1xufTtcblxuLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2NvbWV0ZC93aWtpL0JheWV1eENvZGVzXG52YXIgZXJyb3JzID0ge1xuICB2ZXJzaW9uTWlzbWF0Y2g6ICBbMzAwLCAnVmVyc2lvbiBtaXNtYXRjaCddLFxuICBjb25udHlwZU1pc21hdGNoOiBbMzAxLCAnQ29ubmVjdGlvbiB0eXBlcyBub3Qgc3VwcG9ydGVkJ10sXG4gIGV4dE1pc21hdGNoOiAgICAgIFszMDIsICdFeHRlbnNpb24gbWlzbWF0Y2gnXSxcbiAgYmFkUmVxdWVzdDogICAgICAgWzQwMCwgJ0JhZCByZXF1ZXN0J10sXG4gIGNsaWVudFVua25vd246ICAgIFs0MDEsICdVbmtub3duIGNsaWVudCddLFxuICBwYXJhbWV0ZXJNaXNzaW5nOiBbNDAyLCAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXInXSxcbiAgY2hhbm5lbEZvcmJpZGRlbjogWzQwMywgJ0ZvcmJpZGRlbiBjaGFubmVsJ10sXG4gIGNoYW5uZWxVbmtub3duOiAgIFs0MDQsICdVbmtub3duIGNoYW5uZWwnXSxcbiAgY2hhbm5lbEludmFsaWQ6ICAgWzQwNSwgJ0ludmFsaWQgY2hhbm5lbCddLFxuICBleHRVbmtub3duOiAgICAgICBbNDA2LCAnVW5rbm93biBleHRlbnNpb24nXSxcbiAgcHVibGlzaEZhaWxlZDogICAgWzQwNywgJ0ZhaWxlZCB0byBwdWJsaXNoJ10sXG4gIHNlcnZlckVycm9yOiAgICAgIFs1MDAsICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InXVxufTtcblxuZm9yICh2YXIgbmFtZSBpbiBlcnJvcnMpXG4gIChmdW5jdGlvbihuYW1lKSB7XG4gICAgRXJyb3JbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3JzW25hbWVdWzBdLCBhcmd1bWVudHMsIGVycm9yc1tuYW1lXVsxXSkudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9KShuYW1lKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZCAgPSByZXF1aXJlKCcuLi91dGlsL2V4dGVuZCcpLFxuICAgIExvZ2dpbmcgPSByZXF1aXJlKCcuLi9taXhpbnMvbG9nZ2luZycpO1xuXG52YXIgRXh0ZW5zaWJsZSA9IHtcbiAgYWRkRXh0ZW5zaW9uOiBmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICB0aGlzLl9leHRlbnNpb25zID0gdGhpcy5fZXh0ZW5zaW9ucyB8fCBbXTtcbiAgICB0aGlzLl9leHRlbnNpb25zLnB1c2goZXh0ZW5zaW9uKTtcbiAgICBpZiAoZXh0ZW5zaW9uLmFkZGVkKSBleHRlbnNpb24uYWRkZWQodGhpcyk7XG4gIH0sXG5cbiAgcmVtb3ZlRXh0ZW5zaW9uOiBmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbnMpIHJldHVybjtcbiAgICB2YXIgaSA9IHRoaXMuX2V4dGVuc2lvbnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICh0aGlzLl9leHRlbnNpb25zW2ldICE9PSBleHRlbnNpb24pIGNvbnRpbnVlO1xuICAgICAgdGhpcy5fZXh0ZW5zaW9ucy5zcGxpY2UoaSwxKTtcbiAgICAgIGlmIChleHRlbnNpb24ucmVtb3ZlZCkgZXh0ZW5zaW9uLnJlbW92ZWQodGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIHBpcGVUaHJvdWdoRXh0ZW5zaW9uczogZnVuY3Rpb24oc3RhZ2UsIG1lc3NhZ2UsIHJlcXVlc3QsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5kZWJ1ZygnUGFzc2luZyB0aHJvdWdoID8gZXh0ZW5zaW9uczogPycsIHN0YWdlLCBtZXNzYWdlKTtcblxuICAgIGlmICghdGhpcy5fZXh0ZW5zaW9ucykgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgbWVzc2FnZSk7XG4gICAgdmFyIGV4dGVuc2lvbnMgPSB0aGlzLl9leHRlbnNpb25zLnNsaWNlKCk7XG5cbiAgICB2YXIgcGlwZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICghbWVzc2FnZSkgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgbWVzc2FnZSk7XG5cbiAgICAgIHZhciBleHRlbnNpb24gPSBleHRlbnNpb25zLnNoaWZ0KCk7XG4gICAgICBpZiAoIWV4dGVuc2lvbikgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgbWVzc2FnZSk7XG5cbiAgICAgIHZhciBmbiA9IGV4dGVuc2lvbltzdGFnZV07XG4gICAgICBpZiAoIWZuKSByZXR1cm4gcGlwZShtZXNzYWdlKTtcblxuICAgICAgaWYgKGZuLmxlbmd0aCA+PSAzKSBleHRlbnNpb25bc3RhZ2VdKG1lc3NhZ2UsIHJlcXVlc3QsIHBpcGUpO1xuICAgICAgZWxzZSAgICAgICAgICAgICAgICBleHRlbnNpb25bc3RhZ2VdKG1lc3NhZ2UsIHBpcGUpO1xuICAgIH07XG4gICAgcGlwZShtZXNzYWdlKTtcbiAgfVxufTtcblxuZXh0ZW5kKEV4dGVuc2libGUsIExvZ2dpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4dGVuc2libGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDSEFOTkVMX05BTUU6ICAgICAvXlxcLygoKChbYS16XXxbQS1aXSl8WzAtOV0pfChcXC18XFxffFxcIXxcXH58XFwofFxcKXxcXCR8XFxAKSkpKyhcXC8oKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCkpKSspKiQvLFxuICBDSEFOTkVMX1BBVFRFUk46ICAvXihcXC8oKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCkpKSspKlxcL1xcKnsxLDJ9JC8sXG4gIEVSUk9SOiAgICAgICAgICAgIC9eKFswLTldWzAtOV1bMC05XTooKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCl8IHxcXC98XFwqfFxcLikpKigsKCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApfCB8XFwvfFxcKnxcXC4pKSopKjooKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCl8IHxcXC98XFwqfFxcLikpKnxbMC05XVswLTldWzAtOV06OigoKChbYS16XXxbQS1aXSl8WzAtOV0pfChcXC18XFxffFxcIXxcXH58XFwofFxcKXxcXCR8XFxAKXwgfFxcL3xcXCp8XFwuKSkqKSQvLFxuICBWRVJTSU9OOiAgICAgICAgICAvXihbMC05XSkrKFxcLigoW2Etel18W0EtWl0pfFswLTldKSgoKChbYS16XXxbQS1aXSl8WzAtOV0pfFxcLXxcXF8pKSopKiQvXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBEZWZlcnJhYmxlID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlZmVycmFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbGFzcyhEZWZlcnJhYmxlKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4uL3V0aWwvZXh0ZW5kJyk7XG5cbnZhciBTY2hlZHVsZXIgPSBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zKSB7XG4gIHRoaXMubWVzc2FnZSAgPSBtZXNzYWdlO1xuICB0aGlzLm9wdGlvbnMgID0gb3B0aW9ucztcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuXG5leHRlbmQoU2NoZWR1bGVyLnByb3RvdHlwZSwge1xuICBnZXRUaW1lb3V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVvdXQ7XG4gIH0sXG5cbiAgZ2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW50ZXJ2YWw7XG4gIH0sXG5cbiAgaXNEZWxpdmVyYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGF0dGVtcHRzID0gdGhpcy5vcHRpb25zLmF0dGVtcHRzLFxuICAgICAgICBtYWRlICAgICA9IHRoaXMuYXR0ZW1wdHMsXG4gICAgICAgIGRlYWRsaW5lID0gdGhpcy5vcHRpb25zLmRlYWRsaW5lLFxuICAgICAgICBub3cgICAgICA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgaWYgKGF0dGVtcHRzICE9PSB1bmRlZmluZWQgJiYgbWFkZSA+PSBhdHRlbXB0cylcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChkZWFkbGluZSAhPT0gdW5kZWZpbmVkICYmIG5vdyA+IGRlYWRsaW5lKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgc2VuZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hdHRlbXB0cyArPSAxO1xuICB9LFxuXG4gIHN1Y2NlZWQ6IGZ1bmN0aW9uKCkge30sXG5cbiAgZmFpbDogZnVuY3Rpb24oKSB7fSxcblxuICBhYm9ydDogZnVuY3Rpb24oKSB7fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2NoZWR1bGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBleHRlbmQgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9leHRlbmQnKSxcbiAgICBEZWZlcnJhYmxlID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlZmVycmFibGUnKTtcblxudmFyIFN1YnNjcmlwdGlvbiA9IENsYXNzKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oY2xpZW50LCBjaGFubmVscywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGllbnQgICAgPSBjbGllbnQ7XG4gICAgdGhpcy5fY2hhbm5lbHMgID0gY2hhbm5lbHM7XG4gICAgdGhpcy5fY2FsbGJhY2sgID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fY29udGV4dCAgID0gY29udGV4dDtcbiAgICB0aGlzLl9jYW5jZWxsZWQgPSBmYWxzZTtcbiAgfSxcblxuICB3aXRoQ2hhbm5lbDogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl93aXRoQ2hhbm5lbCA9IFtjYWxsYmFjaywgY29udGV4dF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXBwbHk6IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGFyZ3NbMF07XG5cbiAgICBpZiAodGhpcy5fY2FsbGJhY2spXG4gICAgICB0aGlzLl9jYWxsYmFjay5jYWxsKHRoaXMuX2NvbnRleHQsIG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAodGhpcy5fd2l0aENoYW5uZWwpXG4gICAgICB0aGlzLl93aXRoQ2hhbm5lbFswXS5jYWxsKHRoaXMuX3dpdGhDaGFubmVsWzFdLCBtZXNzYWdlLmNoYW5uZWwsIG1lc3NhZ2UuZGF0YSk7XG4gIH0sXG5cbiAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fY2FuY2VsbGVkKSByZXR1cm47XG4gICAgdGhpcy5fY2xpZW50LnVuc3Vic2NyaWJlKHRoaXMuX2NoYW5uZWxzLCB0aGlzKTtcbiAgICB0aGlzLl9jYW5jZWxsZWQgPSB0cnVlO1xuICB9LFxuXG4gIHVuc3Vic2NyaWJlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNhbmNlbCgpO1xuICB9XG59KTtcblxuZXh0ZW5kKFN1YnNjcmlwdGlvbi5wcm90b3R5cGUsIERlZmVycmFibGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YnNjcmlwdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0Jyk7XG5cblRyYW5zcG9ydC5yZWdpc3Rlcignd2Vic29ja2V0JywgcmVxdWlyZSgnLi93ZWJfc29ja2V0JykpO1xuVHJhbnNwb3J0LnJlZ2lzdGVyKCdldmVudHNvdXJjZScsIHJlcXVpcmUoJy4vZXZlbnRfc291cmNlJykpO1xuVHJhbnNwb3J0LnJlZ2lzdGVyKCdsb25nLXBvbGxpbmcnLCByZXF1aXJlKCcuL3hocicpKTtcblRyYW5zcG9ydC5yZWdpc3RlcignY3Jvc3Mtb3JpZ2luLWxvbmctcG9sbGluZycsIHJlcXVpcmUoJy4vY29ycycpKTtcblRyYW5zcG9ydC5yZWdpc3RlcignY2FsbGJhY2stcG9sbGluZycsIHJlcXVpcmUoJy4vanNvbnAnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIFNldCAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvc2V0JyksXG4gICAgVVJJICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC91cmknKSxcbiAgICBleHRlbmQgICAgPSByZXF1aXJlKCcuLi91dGlsL2V4dGVuZCcpLFxuICAgIHRvSlNPTiAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdG9fanNvbicpLFxuICAgIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0Jyk7XG5cbnZhciBDT1JTID0gZXh0ZW5kKENsYXNzKFRyYW5zcG9ydCwge1xuICBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuICdtZXNzYWdlPScgKyBlbmNvZGVVUklDb21wb25lbnQodG9KU09OKG1lc3NhZ2VzKSk7XG4gIH0sXG5cbiAgcmVxdWVzdDogZnVuY3Rpb24obWVzc2FnZXMpIHtcbiAgICB2YXIgeGhyQ2xhc3MgPSBnbG9iYWwuWERvbWFpblJlcXVlc3QgPyBYRG9tYWluUmVxdWVzdCA6IFhNTEh0dHBSZXF1ZXN0LFxuICAgICAgICB4aHIgICAgICA9IG5ldyB4aHJDbGFzcygpLFxuICAgICAgICBpZCAgICAgICA9ICsrQ09SUy5faWQsXG4gICAgICAgIGhlYWRlcnMgID0gdGhpcy5fZGlzcGF0Y2hlci5oZWFkZXJzLFxuICAgICAgICBzZWxmICAgICA9IHRoaXMsXG4gICAgICAgIGtleTtcblxuICAgIHhoci5vcGVuKCdQT1NUJywgVVJJLnN0cmluZ2lmeSh0aGlzLmVuZHBvaW50KSwgdHJ1ZSk7XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdQcmFnbWEnLCAnbm8tY2FjaGUnKTtcbiAgICAgIGZvciAoa2V5IGluIGhlYWRlcnMpIHtcbiAgICAgICAgaWYgKCFoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNsZWFuVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgheGhyKSByZXR1cm4gZmFsc2U7XG4gICAgICBDT1JTLl9wZW5kaW5nLnJlbW92ZShpZCk7XG4gICAgICB4aHIub25sb2FkID0geGhyLm9uZXJyb3IgPSB4aHIub250aW1lb3V0ID0geGhyLm9ucHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgeGhyID0gbnVsbDtcbiAgICB9O1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlcGxpZXM7XG4gICAgICB0cnkgeyByZXBsaWVzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgY2xlYW5VcCgpO1xuXG4gICAgICBpZiAocmVwbGllcylcbiAgICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICAgIGVsc2VcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuICAgIH07XG5cbiAgICB4aHIub25lcnJvciA9IHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFuVXAoKTtcbiAgICAgIHNlbGYuX2hhbmRsZUVycm9yKG1lc3NhZ2VzKTtcbiAgICB9O1xuXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHt9O1xuXG4gICAgaWYgKHhockNsYXNzID09PSBnbG9iYWwuWERvbWFpblJlcXVlc3QpXG4gICAgICBDT1JTLl9wZW5kaW5nLmFkZCh7aWQ6IGlkLCB4aHI6IHhocn0pO1xuXG4gICAgeGhyLnNlbmQodGhpcy5lbmNvZGUobWVzc2FnZXMpKTtcbiAgICByZXR1cm4geGhyO1xuICB9XG59KSwge1xuICBfaWQ6ICAgICAgMCxcbiAgX3BlbmRpbmc6IG5ldyBTZXQoKSxcblxuICBpc1VzYWJsZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKFVSSS5pc1NhbWVPcmlnaW4oZW5kcG9pbnQpKVxuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZmFsc2UpO1xuXG4gICAgaWYgKGdsb2JhbC5YRG9tYWluUmVxdWVzdClcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVuZHBvaW50LnByb3RvY29sID09PSBsb2NhdGlvbi5wcm90b2NvbCk7XG5cbiAgICBpZiAoZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCB4aHIud2l0aENyZWRlbnRpYWxzICE9PSB1bmRlZmluZWQpO1xuICAgIH1cbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENPUlM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDbGFzcyAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIFVSSSAgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3VyaScpLFxuICAgIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuLi91dGlsL2NvcHlfb2JqZWN0JyksXG4gICAgZXh0ZW5kICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvZXh0ZW5kJyksXG4gICAgRGVmZXJyYWJsZSA9IHJlcXVpcmUoJy4uL21peGlucy9kZWZlcnJhYmxlJyksXG4gICAgVHJhbnNwb3J0ICA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0JyksXG4gICAgWEhSICAgICAgICA9IHJlcXVpcmUoJy4veGhyJyk7XG5cbnZhciBFdmVudFNvdXJjZSA9IGV4dGVuZChDbGFzcyhUcmFuc3BvcnQsIHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQpIHtcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBkaXNwYXRjaGVyLCBlbmRwb2ludCk7XG4gICAgaWYgKCFnbG9iYWwuRXZlbnRTb3VyY2UpIHJldHVybiB0aGlzLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnKTtcblxuICAgIHRoaXMuX3hociA9IG5ldyBYSFIoZGlzcGF0Y2hlciwgZW5kcG9pbnQpO1xuXG4gICAgZW5kcG9pbnQgPSBjb3B5T2JqZWN0KGVuZHBvaW50KTtcbiAgICBlbmRwb2ludC5wYXRobmFtZSArPSAnLycgKyBkaXNwYXRjaGVyLmNsaWVudElkO1xuXG4gICAgdmFyIHNvY2tldCA9IG5ldyBnbG9iYWwuRXZlbnRTb3VyY2UoVVJJLnN0cmluZ2lmeShlbmRwb2ludCkpLFxuICAgICAgICBzZWxmICAgPSB0aGlzO1xuXG4gICAgc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fZXZlckNvbm5lY3RlZCA9IHRydWU7XG4gICAgICBzZWxmLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICB9O1xuXG4gICAgc29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLl9ldmVyQ29ubmVjdGVkKSB7XG4gICAgICAgIHNlbGYuX2hhbmRsZUVycm9yKFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcpO1xuICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgcmVwbGllcztcbiAgICAgIHRyeSB7IHJlcGxpZXMgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpIH0gY2F0Y2ggKGVycm9yKSB7fVxuXG4gICAgICBpZiAocmVwbGllcylcbiAgICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICAgIGVsc2VcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IoW10pO1xuICAgIH07XG5cbiAgICB0aGlzLl9zb2NrZXQgPSBzb2NrZXQ7XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0KSByZXR1cm47XG4gICAgdGhpcy5fc29ja2V0Lm9ub3BlbiA9IHRoaXMuX3NvY2tldC5vbmVycm9yID0gdGhpcy5fc29ja2V0Lm9ubWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5fc29ja2V0LmNsb3NlKCk7XG4gICAgZGVsZXRlIHRoaXMuX3NvY2tldDtcbiAgfSxcblxuICBpc1VzYWJsZTogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmNhbGxiYWNrKGZ1bmN0aW9uKCkgeyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRydWUpIH0pO1xuICAgIHRoaXMuZXJyYmFjayhmdW5jdGlvbigpIHsgY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSkgfSk7XG4gIH0sXG5cbiAgZW5jb2RlOiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiB0aGlzLl94aHIuZW5jb2RlKG1lc3NhZ2VzKTtcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiB0aGlzLl94aHIucmVxdWVzdChtZXNzYWdlcyk7XG4gIH1cblxufSksIHtcbiAgaXNVc2FibGU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBpZCA9IGRpc3BhdGNoZXIuY2xpZW50SWQ7XG4gICAgaWYgKCFpZCkgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZmFsc2UpO1xuXG4gICAgWEhSLmlzVXNhYmxlKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBmdW5jdGlvbih1c2FibGUpIHtcbiAgICAgIGlmICghdXNhYmxlKSByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSk7XG4gICAgICB0aGlzLmNyZWF0ZShkaXNwYXRjaGVyLCBlbmRwb2ludCkuaXNVc2FibGUoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQpIHtcbiAgICB2YXIgc29ja2V0cyA9IGRpc3BhdGNoZXIudHJhbnNwb3J0cy5ldmVudHNvdXJjZSA9IGRpc3BhdGNoZXIudHJhbnNwb3J0cy5ldmVudHNvdXJjZSB8fCB7fSxcbiAgICAgICAgaWQgICAgICA9IGRpc3BhdGNoZXIuY2xpZW50SWQ7XG5cbiAgICB2YXIgdXJsID0gY29weU9iamVjdChlbmRwb2ludCk7XG4gICAgdXJsLnBhdGhuYW1lICs9ICcvJyArIChpZCB8fCAnJyk7XG4gICAgdXJsID0gVVJJLnN0cmluZ2lmeSh1cmwpO1xuXG4gICAgc29ja2V0c1t1cmxdID0gc29ja2V0c1t1cmxdIHx8IG5ldyB0aGlzKGRpc3BhdGNoZXIsIGVuZHBvaW50KTtcbiAgICByZXR1cm4gc29ja2V0c1t1cmxdO1xuICB9XG59KTtcblxuZXh0ZW5kKEV2ZW50U291cmNlLnByb3RvdHlwZSwgRGVmZXJyYWJsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRTb3VyY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDbGFzcyAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIFVSSSAgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3VyaScpLFxuICAgIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuLi91dGlsL2NvcHlfb2JqZWN0JyksXG4gICAgZXh0ZW5kICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvZXh0ZW5kJyksXG4gICAgdG9KU09OICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdG9fanNvbicpLFxuICAgIFRyYW5zcG9ydCAgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuXG52YXIgSlNPTlAgPSBleHRlbmQoQ2xhc3MoVHJhbnNwb3J0LCB7XG4gZW5jb2RlOiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHZhciB1cmwgPSBjb3B5T2JqZWN0KHRoaXMuZW5kcG9pbnQpO1xuICAgIHVybC5xdWVyeS5tZXNzYWdlID0gdG9KU09OKG1lc3NhZ2VzKTtcbiAgICB1cmwucXVlcnkuanNvbnAgICA9ICdfX2pzb25wJyArIEpTT05QLl9jYkNvdW50ICsgJ19fJztcbiAgICByZXR1cm4gVVJJLnN0cmluZ2lmeSh1cmwpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdmFyIGhlYWQgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHNjcmlwdCAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgICBjYWxsYmFja05hbWUgPSBKU09OUC5nZXRDYWxsYmFja05hbWUoKSxcbiAgICAgICAgZW5kcG9pbnQgICAgID0gY29weU9iamVjdCh0aGlzLmVuZHBvaW50KSxcbiAgICAgICAgc2VsZiAgICAgICAgID0gdGhpcztcblxuICAgIGVuZHBvaW50LnF1ZXJ5Lm1lc3NhZ2UgPSB0b0pTT04obWVzc2FnZXMpO1xuICAgIGVuZHBvaW50LnF1ZXJ5Lmpzb25wICAgPSBjYWxsYmFja05hbWU7XG5cbiAgICB2YXIgY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFnbG9iYWxbY2FsbGJhY2tOYW1lXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZ2xvYmFsW2NhbGxiYWNrTmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICB0cnkgeyBkZWxldGUgZ2xvYmFsW2NhbGxiYWNrTmFtZV0gfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgIH07XG5cbiAgICBnbG9iYWxbY2FsbGJhY2tOYW1lXSA9IGZ1bmN0aW9uKHJlcGxpZXMpIHtcbiAgICAgIGNsZWFudXAoKTtcbiAgICAgIHNlbGYuX3JlY2VpdmUocmVwbGllcyk7XG4gICAgfTtcblxuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyAgPSBVUkkuc3RyaW5naWZ5KGVuZHBvaW50KTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgc2VsZi5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge2Fib3J0OiBjbGVhbnVwfTtcbiAgfVxufSksIHtcbiAgX2NiQ291bnQ6IDAsXG5cbiAgZ2V0Q2FsbGJhY2tOYW1lOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jYkNvdW50ICs9IDE7XG4gICAgcmV0dXJuICdfX2pzb25wJyArIHRoaXMuX2NiQ291bnQgKyAnX18nO1xuICB9LFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRydWUpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBKU09OUDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIENvb2tpZSAgID0gcmVxdWlyZSgnLi4vdXRpbC9jb29raWVzJykuQ29va2llLFxuICAgIFByb21pc2UgID0gcmVxdWlyZSgnLi4vdXRpbC9wcm9taXNlJyksXG4gICAgVVJJICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3VyaScpLFxuICAgIGFycmF5ICAgID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpLFxuICAgIGV4dGVuZCAgID0gcmVxdWlyZSgnLi4vdXRpbC9leHRlbmQnKSxcbiAgICBMb2dnaW5nICA9IHJlcXVpcmUoJy4uL21peGlucy9sb2dnaW5nJyksXG4gICAgVGltZW91dHMgPSByZXF1aXJlKCcuLi9taXhpbnMvdGltZW91dHMnKSxcbiAgICBDaGFubmVsICA9IHJlcXVpcmUoJy4uL3Byb3RvY29sL2NoYW5uZWwnKTtcblxudmFyIFRyYW5zcG9ydCA9IGV4dGVuZChDbGFzcyh7IGNsYXNzTmFtZTogJ1RyYW5zcG9ydCcsXG4gIERFRkFVTFRfUE9SVFM6IHsnaHR0cDonOiA4MCwgJ2h0dHBzOic6IDQ0MywgJ3dzOic6IDgwLCAnd3NzOic6IDQ0M30sXG4gIE1BWF9ERUxBWTogICAgIDAsXG5cbiAgYmF0Y2hpbmc6ICB0cnVlLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50KSB7XG4gICAgdGhpcy5fZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG4gICAgdGhpcy5lbmRwb2ludCAgICA9IGVuZHBvaW50O1xuICAgIHRoaXMuX291dGJveCAgICAgPSBbXTtcbiAgICB0aGlzLl9wcm94eSAgICAgID0gZXh0ZW5kKHt9LCB0aGlzLl9kaXNwYXRjaGVyLnByb3h5KTtcblxuICAgIGlmICghdGhpcy5fcHJveHkub3JpZ2luKVxuICAgICAgdGhpcy5fcHJveHkub3JpZ2luID0gdGhpcy5fZmluZFByb3h5KCk7XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge30sXG5cbiAgZW5jb2RlOiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiAnJztcbiAgfSxcblxuICBzZW5kTWVzc2FnZTogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIHRoaXMuZGVidWcoJ0NsaWVudCA/IHNlbmRpbmcgbWVzc2FnZSB0byA/OiA/JyxcbiAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIFVSSS5zdHJpbmdpZnkodGhpcy5lbmRwb2ludCksIG1lc3NhZ2UpO1xuXG4gICAgaWYgKCF0aGlzLmJhdGNoaW5nKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucmVxdWVzdChbbWVzc2FnZV0pKTtcblxuICAgIHRoaXMuX291dGJveC5wdXNoKG1lc3NhZ2UpO1xuICAgIHRoaXMuX2ZsdXNoTGFyZ2VCYXRjaCgpO1xuXG4gICAgaWYgKG1lc3NhZ2UuY2hhbm5lbCA9PT0gQ2hhbm5lbC5IQU5EU0hBS0UpXG4gICAgICByZXR1cm4gdGhpcy5fcHVibGlzaCgwLjAxKTtcblxuICAgIGlmIChtZXNzYWdlLmNoYW5uZWwgPT09IENoYW5uZWwuQ09OTkVDVClcbiAgICAgIHRoaXMuX2Nvbm5lY3RNZXNzYWdlID0gbWVzc2FnZTtcblxuICAgIHJldHVybiB0aGlzLl9wdWJsaXNoKHRoaXMuTUFYX0RFTEFZKTtcbiAgfSxcblxuICBfbWFrZVByb21pc2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuX3JlcXVlc3RQcm9taXNlID0gdGhpcy5fcmVxdWVzdFByb21pc2UgfHwgbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgc2VsZi5fcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuICB9LFxuXG4gIF9wdWJsaXNoOiBmdW5jdGlvbihkZWxheSkge1xuICAgIHRoaXMuX21ha2VQcm9taXNlKCk7XG5cbiAgICB0aGlzLmFkZFRpbWVvdXQoJ3B1Ymxpc2gnLCBkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9mbHVzaCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX3JlcXVlc3RQcm9taXNlO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RQcm9taXNlO1xuICB9LFxuXG4gIF9mbHVzaDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVUaW1lb3V0KCdwdWJsaXNoJyk7XG5cbiAgICBpZiAodGhpcy5fb3V0Ym94Lmxlbmd0aCA+IDEgJiYgdGhpcy5fY29ubmVjdE1lc3NhZ2UpXG4gICAgICB0aGlzLl9jb25uZWN0TWVzc2FnZS5hZHZpY2UgPSB7dGltZW91dDogMH07XG5cbiAgICB0aGlzLl9yZXNvbHZlUHJvbWlzZSh0aGlzLnJlcXVlc3QodGhpcy5fb3V0Ym94KSk7XG5cbiAgICB0aGlzLl9jb25uZWN0TWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5fb3V0Ym94ID0gW107XG4gIH0sXG5cbiAgX2ZsdXNoTGFyZ2VCYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZyA9IHRoaXMuZW5jb2RlKHRoaXMuX291dGJveCk7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPCB0aGlzLl9kaXNwYXRjaGVyLm1heFJlcXVlc3RTaXplKSByZXR1cm47XG4gICAgdmFyIGxhc3QgPSB0aGlzLl9vdXRib3gucG9wKCk7XG5cbiAgICB0aGlzLl9tYWtlUHJvbWlzZSgpO1xuICAgIHRoaXMuX2ZsdXNoKCk7XG5cbiAgICBpZiAobGFzdCkgdGhpcy5fb3V0Ym94LnB1c2gobGFzdCk7XG4gIH0sXG5cbiAgX3JlY2VpdmU6IGZ1bmN0aW9uKHJlcGxpZXMpIHtcbiAgICBpZiAoIXJlcGxpZXMpIHJldHVybjtcbiAgICByZXBsaWVzID0gW10uY29uY2F0KHJlcGxpZXMpO1xuXG4gICAgdGhpcy5kZWJ1ZygnQ2xpZW50ID8gcmVjZWl2ZWQgZnJvbSA/IHZpYSA/OiA/JyxcbiAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIFVSSS5zdHJpbmdpZnkodGhpcy5lbmRwb2ludCksIHRoaXMuY29ubmVjdGlvblR5cGUsIHJlcGxpZXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSByZXBsaWVzLmxlbmd0aDsgaSA8IG47IGkrKylcbiAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuaGFuZGxlUmVzcG9uc2UocmVwbGllc1tpXSk7XG4gIH0sXG5cbiAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbihtZXNzYWdlcywgaW1tZWRpYXRlKSB7XG4gICAgbWVzc2FnZXMgPSBbXS5jb25jYXQobWVzc2FnZXMpO1xuXG4gICAgdGhpcy5kZWJ1ZygnQ2xpZW50ID8gZmFpbGVkIHRvIHNlbmQgdG8gPyB2aWEgPzogPycsXG4gICAgICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBVUkkuc3RyaW5naWZ5KHRoaXMuZW5kcG9pbnQpLCB0aGlzLmNvbm5lY3Rpb25UeXBlLCBtZXNzYWdlcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IG1lc3NhZ2VzLmxlbmd0aDsgaSA8IG47IGkrKylcbiAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuaGFuZGxlRXJyb3IobWVzc2FnZXNbaV0pO1xuICB9LFxuXG4gIF9nZXRDb29raWVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29va2llcyA9IHRoaXMuX2Rpc3BhdGNoZXIuY29va2llcyxcbiAgICAgICAgdXJsICAgICA9IFVSSS5zdHJpbmdpZnkodGhpcy5lbmRwb2ludCk7XG5cbiAgICBpZiAoIWNvb2tpZXMpIHJldHVybiAnJztcblxuICAgIHJldHVybiBhcnJheS5tYXAoY29va2llcy5nZXRDb29raWVzU3luYyh1cmwpLCBmdW5jdGlvbihjb29raWUpIHtcbiAgICAgIHJldHVybiBjb29raWUuY29va2llU3RyaW5nKCk7XG4gICAgfSkuam9pbignOyAnKTtcbiAgfSxcblxuICBfc3RvcmVDb29raWVzOiBmdW5jdGlvbihzZXRDb29raWUpIHtcbiAgICB2YXIgY29va2llcyA9IHRoaXMuX2Rpc3BhdGNoZXIuY29va2llcyxcbiAgICAgICAgdXJsICAgICA9IFVSSS5zdHJpbmdpZnkodGhpcy5lbmRwb2ludCksXG4gICAgICAgIGNvb2tpZTtcblxuICAgIGlmICghc2V0Q29va2llIHx8ICFjb29raWVzKSByZXR1cm47XG4gICAgc2V0Q29va2llID0gW10uY29uY2F0KHNldENvb2tpZSk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHNldENvb2tpZS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGNvb2tpZSA9IENvb2tpZS5wYXJzZShzZXRDb29raWVbaV0pO1xuICAgICAgY29va2llcy5zZXRDb29raWVTeW5jKGNvb2tpZSwgdXJsKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZpbmRQcm94eTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJykgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHZhciBwcm90b2NvbCA9IHRoaXMuZW5kcG9pbnQucHJvdG9jb2w7XG4gICAgaWYgKCFwcm90b2NvbCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHZhciBuYW1lICAgPSBwcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKS50b0xvd2VyQ2FzZSgpICsgJ19wcm94eScsXG4gICAgICAgIHVwY2FzZSA9IG5hbWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgZW52ICAgID0gcHJvY2Vzcy5lbnYsXG4gICAgICAgIGtleXMsIHByb3h5O1xuXG4gICAgaWYgKG5hbWUgPT09ICdodHRwX3Byb3h5JyAmJiBlbnYuUkVRVUVTVF9NRVRIT0QpIHtcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhlbnYpLmZpbHRlcihmdW5jdGlvbihrKSB7IHJldHVybiAvXmh0dHBfcHJveHkkL2kudGVzdChrKSB9KTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoa2V5c1swXSA9PT0gbmFtZSAmJiBlbnZbdXBjYXNlXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHByb3h5ID0gZW52W25hbWVdO1xuICAgICAgfSBlbHNlIGlmIChrZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcHJveHkgPSBlbnZbbmFtZV07XG4gICAgICB9XG4gICAgICBwcm94eSA9IHByb3h5IHx8IGVudlsnQ0dJXycgKyB1cGNhc2VdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm94eSA9IGVudltuYW1lXSB8fCBlbnZbdXBjYXNlXTtcbiAgICAgIGlmIChwcm94eSAmJiAhZW52W25hbWVdKVxuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBlbnZpcm9ubWVudCB2YXJpYWJsZSAnICsgdXBjYXNlICtcbiAgICAgICAgICAgICAgICAgICAgICcgaXMgZGlzY291cmFnZWQuIFVzZSAnICsgbmFtZSArICcuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm94eTtcbiAgfVxuXG59KSwge1xuICBnZXQ6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGFsbG93ZWQsIGRpc2FibGVkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBlbmRwb2ludCA9IGRpc3BhdGNoZXIuZW5kcG9pbnQ7XG5cbiAgICBhcnJheS5hc3luY0VhY2godGhpcy5fdHJhbnNwb3J0cywgZnVuY3Rpb24ocGFpciwgcmVzdW1lKSB7XG4gICAgICB2YXIgY29ublR5cGUgICAgID0gcGFpclswXSwga2xhc3MgPSBwYWlyWzFdLFxuICAgICAgICAgIGNvbm5FbmRwb2ludCA9IGRpc3BhdGNoZXIuZW5kcG9pbnRGb3IoY29ublR5cGUpO1xuXG4gICAgICBpZiAoYXJyYXkuaW5kZXhPZihkaXNhYmxlZCwgY29ublR5cGUpID49IDApXG4gICAgICAgIHJldHVybiByZXN1bWUoKTtcblxuICAgICAgaWYgKGFycmF5LmluZGV4T2YoYWxsb3dlZCwgY29ublR5cGUpIDwgMCkge1xuICAgICAgICBrbGFzcy5pc1VzYWJsZShkaXNwYXRjaGVyLCBjb25uRW5kcG9pbnQsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICByZXR1cm4gcmVzdW1lKCk7XG4gICAgICB9XG5cbiAgICAgIGtsYXNzLmlzVXNhYmxlKGRpc3BhdGNoZXIsIGNvbm5FbmRwb2ludCwgZnVuY3Rpb24oaXNVc2FibGUpIHtcbiAgICAgICAgaWYgKCFpc1VzYWJsZSkgcmV0dXJuIHJlc3VtZSgpO1xuICAgICAgICB2YXIgdHJhbnNwb3J0ID0ga2xhc3MuaGFzT3duUHJvcGVydHkoJ2NyZWF0ZScpID8ga2xhc3MuY3JlYXRlKGRpc3BhdGNoZXIsIGNvbm5FbmRwb2ludCkgOiBuZXcga2xhc3MoZGlzcGF0Y2hlciwgY29ubkVuZHBvaW50KTtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB0cmFuc3BvcnQpO1xuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGEgdXNhYmxlIGNvbm5lY3Rpb24gdHlwZSBmb3IgJyArIFVSSS5zdHJpbmdpZnkoZW5kcG9pbnQpKTtcbiAgICB9KTtcbiAgfSxcblxuICByZWdpc3RlcjogZnVuY3Rpb24odHlwZSwga2xhc3MpIHtcbiAgICB0aGlzLl90cmFuc3BvcnRzLnB1c2goW3R5cGUsIGtsYXNzXSk7XG4gICAga2xhc3MucHJvdG90eXBlLmNvbm5lY3Rpb25UeXBlID0gdHlwZTtcbiAgfSxcblxuICBnZXRDb25uZWN0aW9uVHlwZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcnJheS5tYXAodGhpcy5fdHJhbnNwb3J0cywgZnVuY3Rpb24odCkgeyByZXR1cm4gdFswXSB9KTtcbiAgfSxcblxuICBfdHJhbnNwb3J0czogW11cbn0pO1xuXG5leHRlbmQoVHJhbnNwb3J0LnByb3RvdHlwZSwgTG9nZ2luZyk7XG5leHRlbmQoVHJhbnNwb3J0LnByb3RvdHlwZSwgVGltZW91dHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgUHJvbWlzZSAgICA9IHJlcXVpcmUoJy4uL3V0aWwvcHJvbWlzZScpLFxuICAgIFNldCAgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3NldCcpLFxuICAgIFVSSSAgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3VyaScpLFxuICAgIGJyb3dzZXIgICAgPSByZXF1aXJlKCcuLi91dGlsL2Jyb3dzZXInKSxcbiAgICBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi4vdXRpbC9jb3B5X29iamVjdCcpLFxuICAgIGV4dGVuZCAgICAgPSByZXF1aXJlKCcuLi91dGlsL2V4dGVuZCcpLFxuICAgIHRvSlNPTiAgICAgPSByZXF1aXJlKCcuLi91dGlsL3RvX2pzb24nKSxcbiAgICB3cyAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC93ZWJzb2NrZXQnKSxcbiAgICBEZWZlcnJhYmxlID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlZmVycmFibGUnKSxcbiAgICBUcmFuc3BvcnQgID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKTtcblxudmFyIFdlYlNvY2tldCA9IGV4dGVuZChDbGFzcyhUcmFuc3BvcnQsIHtcbiAgVU5DT05ORUNURUQ6ICAxLFxuICBDT05ORUNUSU5HOiAgIDIsXG4gIENPTk5FQ1RFRDogICAgMyxcblxuICBiYXRjaGluZzogICAgIGZhbHNlLFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuY2FsbGJhY2soZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdHJ1ZSkgfSk7XG4gICAgdGhpcy5lcnJiYWNrKGZ1bmN0aW9uKCkgeyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKSB9KTtcbiAgICB0aGlzLmNvbm5lY3QoKTtcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHRoaXMuX3BlbmRpbmcgPSB0aGlzLl9wZW5kaW5nIHx8IG5ldyBTZXQoKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IG1lc3NhZ2VzLmxlbmd0aDsgaSA8IG47IGkrKykgdGhpcy5fcGVuZGluZy5hZGQobWVzc2FnZXNbaV0pO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHNlbGYuY2FsbGJhY2soZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgICAgIGlmICghc29ja2V0IHx8IHNvY2tldC5yZWFkeVN0YXRlICE9PSAxKSByZXR1cm47XG4gICAgICAgIHNvY2tldC5zZW5kKHRvSlNPTihtZXNzYWdlcykpO1xuICAgICAgICByZXNvbHZlKHNvY2tldCk7XG4gICAgICB9KTtcblxuICAgICAgc2VsZi5jb25uZWN0KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCkgeyBwcm9taXNlLnRoZW4oZnVuY3Rpb24od3MpIHsgd3MuY2xvc2UoKSB9KSB9XG4gICAgfTtcbiAgfSxcblxuICBjb25uZWN0OiBmdW5jdGlvbigpIHtcbiAgICBpZiAoV2ViU29ja2V0Ll91bmxvYWRlZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9zdGF0ZSB8fCB0aGlzLlVOQ09OTkVDVEVEO1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gdGhpcy5VTkNPTk5FQ1RFRCkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5DT05ORUNUSU5HO1xuXG4gICAgdmFyIHNvY2tldCA9IHRoaXMuX2NyZWF0ZVNvY2tldCgpO1xuICAgIGlmICghc29ja2V0KSByZXR1cm4gdGhpcy5zZXREZWZlcnJlZFN0YXR1cygnZmFpbGVkJyk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzb2NrZXQub25vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc29ja2V0LmhlYWRlcnMpIHNlbGYuX3N0b3JlQ29va2llcyhzb2NrZXQuaGVhZGVyc1snc2V0LWNvb2tpZSddKTtcbiAgICAgIHNlbGYuX3NvY2tldCA9IHNvY2tldDtcbiAgICAgIHNlbGYuX3N0YXRlID0gc2VsZi5DT05ORUNURUQ7XG4gICAgICBzZWxmLl9ldmVyQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgIHNlbGYuX3BpbmcoKTtcbiAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcsIHNvY2tldCk7XG4gICAgfTtcblxuICAgIHZhciBjbG9zZWQgPSBmYWxzZTtcbiAgICBzb2NrZXQub25jbG9zZSA9IHNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2xvc2VkKSByZXR1cm47XG4gICAgICBjbG9zZWQgPSB0cnVlO1xuXG4gICAgICB2YXIgd2FzQ29ubmVjdGVkID0gKHNlbGYuX3N0YXRlID09PSBzZWxmLkNPTk5FQ1RFRCk7XG4gICAgICBzb2NrZXQub25vcGVuID0gc29ja2V0Lm9uY2xvc2UgPSBzb2NrZXQub25lcnJvciA9IHNvY2tldC5vbm1lc3NhZ2UgPSBudWxsO1xuXG4gICAgICBkZWxldGUgc2VsZi5fc29ja2V0O1xuICAgICAgc2VsZi5fc3RhdGUgPSBzZWxmLlVOQ09OTkVDVEVEO1xuICAgICAgc2VsZi5yZW1vdmVUaW1lb3V0KCdwaW5nJyk7XG5cbiAgICAgIHZhciBwZW5kaW5nID0gc2VsZi5fcGVuZGluZyA/IHNlbGYuX3BlbmRpbmcudG9BcnJheSgpIDogW107XG4gICAgICBkZWxldGUgc2VsZi5fcGVuZGluZztcblxuICAgICAgaWYgKHdhc0Nvbm5lY3RlZCB8fCBzZWxmLl9ldmVyQ29ubmVjdGVkKSB7XG4gICAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ3Vua25vd24nKTtcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IocGVuZGluZywgd2FzQ29ubmVjdGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciByZXBsaWVzO1xuICAgICAgdHJ5IHsgcmVwbGllcyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgIGlmICghcmVwbGllcykgcmV0dXJuO1xuXG4gICAgICByZXBsaWVzID0gW10uY29uY2F0KHJlcGxpZXMpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHJlcGxpZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGlmIChyZXBsaWVzW2ldLnN1Y2Nlc3NmdWwgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgIHNlbGYuX3BlbmRpbmcucmVtb3ZlKHJlcGxpZXNbaV0pO1xuICAgICAgfVxuICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICB9O1xuICB9LFxuXG4gIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkgcmV0dXJuO1xuICAgIHRoaXMuX3NvY2tldC5jbG9zZSgpO1xuICB9LFxuXG4gIF9jcmVhdGVTb2NrZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1cmwgICAgICAgID0gV2ViU29ja2V0LmdldFNvY2tldFVybCh0aGlzLmVuZHBvaW50KSxcbiAgICAgICAgaGVhZGVycyAgICA9IHRoaXMuX2Rpc3BhdGNoZXIuaGVhZGVycyxcbiAgICAgICAgZXh0ZW5zaW9ucyA9IHRoaXMuX2Rpc3BhdGNoZXIud3NFeHRlbnNpb25zLFxuICAgICAgICBjb29raWUgICAgID0gdGhpcy5fZ2V0Q29va2llcygpLFxuICAgICAgICB0bHMgICAgICAgID0gdGhpcy5fZGlzcGF0Y2hlci50bHMsXG4gICAgICAgIG9wdGlvbnMgICAgPSB7ZXh0ZW5zaW9uczogZXh0ZW5zaW9ucywgaGVhZGVyczogaGVhZGVycywgcHJveHk6IHRoaXMuX3Byb3h5LCB0bHM6IHRsc307XG5cbiAgICBpZiAoY29va2llICE9PSAnJykgb3B0aW9ucy5oZWFkZXJzWydDb29raWUnXSA9IGNvb2tpZTtcblxuICAgIHJldHVybiB3cy5jcmVhdGUodXJsLCBbXSwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgX3Bpbmc6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0IHx8IHRoaXMuX3NvY2tldC5yZWFkeVN0YXRlICE9PSAxKSByZXR1cm47XG4gICAgdGhpcy5fc29ja2V0LnNlbmQoJ1tdJyk7XG4gICAgdGhpcy5hZGRUaW1lb3V0KCdwaW5nJywgdGhpcy5fZGlzcGF0Y2hlci50aW1lb3V0IC8gMiwgdGhpcy5fcGluZywgdGhpcyk7XG4gIH1cblxufSksIHtcbiAgUFJPVE9DT0xTOiB7XG4gICAgJ2h0dHA6JzogICd3czonLFxuICAgICdodHRwczonOiAnd3NzOidcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50KSB7XG4gICAgdmFyIHNvY2tldHMgPSBkaXNwYXRjaGVyLnRyYW5zcG9ydHMud2Vic29ja2V0ID0gZGlzcGF0Y2hlci50cmFuc3BvcnRzLndlYnNvY2tldCB8fCB7fTtcbiAgICBzb2NrZXRzW2VuZHBvaW50LmhyZWZdID0gc29ja2V0c1tlbmRwb2ludC5ocmVmXSB8fCBuZXcgdGhpcyhkaXNwYXRjaGVyLCBlbmRwb2ludCk7XG4gICAgcmV0dXJuIHNvY2tldHNbZW5kcG9pbnQuaHJlZl07XG4gIH0sXG5cbiAgZ2V0U29ja2V0VXJsOiBmdW5jdGlvbihlbmRwb2ludCkge1xuICAgIGVuZHBvaW50ID0gY29weU9iamVjdChlbmRwb2ludCk7XG4gICAgZW5kcG9pbnQucHJvdG9jb2wgPSB0aGlzLlBST1RPQ09MU1tlbmRwb2ludC5wcm90b2NvbF07XG4gICAgcmV0dXJuIFVSSS5zdHJpbmdpZnkoZW5kcG9pbnQpO1xuICB9LFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmNyZWF0ZShkaXNwYXRjaGVyLCBlbmRwb2ludCkuaXNVc2FibGUoY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9XG59KTtcblxuZXh0ZW5kKFdlYlNvY2tldC5wcm90b3R5cGUsIERlZmVycmFibGUpO1xuXG5pZiAoYnJvd3Nlci5FdmVudCAmJiBnbG9iYWwub25iZWZvcmV1bmxvYWQgIT09IHVuZGVmaW5lZClcbiAgYnJvd3Nlci5FdmVudC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHsgV2ViU29ja2V0Ll91bmxvYWRlZCA9IHRydWUgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIFVSSSAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdXJpJyksXG4gICAgYnJvd3NlciAgID0gcmVxdWlyZSgnLi4vdXRpbC9icm93c2VyJyksXG4gICAgZXh0ZW5kICAgID0gcmVxdWlyZSgnLi4vdXRpbC9leHRlbmQnKSxcbiAgICB0b0pTT04gICAgPSByZXF1aXJlKCcuLi91dGlsL3RvX2pzb24nKSxcbiAgICBUcmFuc3BvcnQgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuXG52YXIgWEhSID0gZXh0ZW5kKENsYXNzKFRyYW5zcG9ydCwge1xuICBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIHRvSlNPTihtZXNzYWdlcyk7XG4gIH0sXG5cbiAgcmVxdWVzdDogZnVuY3Rpb24obWVzc2FnZXMpIHtcbiAgICB2YXIgaHJlZiA9IHRoaXMuZW5kcG9pbnQuaHJlZixcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIHhocjtcblxuICAgIC8vIFByZWZlciBYTUxIdHRwUmVxdWVzdCBvdmVyIEFjdGl2ZVhPYmplY3QgaWYgdGhleSBib3RoIGV4aXN0XG4gICAgaWYgKGdsb2JhbC5YTUxIdHRwUmVxdWVzdCkge1xuICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfSBlbHNlIGlmIChnbG9iYWwuQWN0aXZlWE9iamVjdCkge1xuICAgICAgeGhyID0gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVFcnJvcihtZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCBocmVmLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignUHJhZ21hJywgJ25vLWNhY2hlJyk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcblxuICAgIHZhciBoZWFkZXJzID0gdGhpcy5fZGlzcGF0Y2hlci5oZWFkZXJzO1xuICAgIGZvciAodmFyIGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICBpZiAoIWhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWU7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgfVxuXG4gICAgdmFyIGFib3J0ID0gZnVuY3Rpb24oKSB7IHhoci5hYm9ydCgpIH07XG4gICAgaWYgKGdsb2JhbC5vbmJlZm9yZXVubG9hZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgYnJvd3Nlci5FdmVudC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBhYm9ydCk7XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXhociB8fCB4aHIucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuXG4gICAgICB2YXIgcmVwbGllcyAgICA9IG51bGwsXG4gICAgICAgICAgc3RhdHVzICAgICA9IHhoci5zdGF0dXMsXG4gICAgICAgICAgdGV4dCAgICAgICA9IHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgc3VjY2Vzc2Z1bCA9IChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkgfHwgc3RhdHVzID09PSAzMDQgfHwgc3RhdHVzID09PSAxMjIzO1xuXG4gICAgICBpZiAoZ2xvYmFsLm9uYmVmb3JldW5sb2FkICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJyb3dzZXIuRXZlbnQuZGV0YWNoKGdsb2JhbCwgJ2JlZm9yZXVubG9hZCcsIGFib3J0KTtcblxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge307XG4gICAgICB4aHIgPSBudWxsO1xuXG4gICAgICBpZiAoIXN1Y2Nlc3NmdWwpIHJldHVybiBzZWxmLl9oYW5kbGVFcnJvcihtZXNzYWdlcyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcGxpZXMgPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgIGlmIChyZXBsaWVzKVxuICAgICAgICBzZWxmLl9yZWNlaXZlKHJlcGxpZXMpO1xuICAgICAgZWxzZVxuICAgICAgICBzZWxmLl9oYW5kbGVFcnJvcihtZXNzYWdlcyk7XG4gICAgfTtcblxuICAgIHhoci5zZW5kKHRoaXMuZW5jb2RlKG1lc3NhZ2VzKSk7XG4gICAgcmV0dXJuIHhocjtcbiAgfVxufSksIHtcbiAgaXNVc2FibGU6IGZ1bmN0aW9uKGRpc3BhdGNoZXIsIGVuZHBvaW50LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciB1c2FibGUgPSAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpXG4gICAgICAgICAgICAgIHx8IFVSSS5pc1NhbWVPcmlnaW4oZW5kcG9pbnQpO1xuXG4gICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB1c2FibGUpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBYSFI7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21tb25FbGVtZW50OiBmdW5jdGlvbihsaXN0YSwgbGlzdGIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGxpc3RhLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgaWYgKHRoaXMuaW5kZXhPZihsaXN0YiwgbGlzdGFbaV0pICE9PSAtMSlcbiAgICAgICAgcmV0dXJuIGxpc3RhW2ldO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBpbmRleE9mOiBmdW5jdGlvbihsaXN0LCBuZWVkbGUpIHtcbiAgICBpZiAobGlzdC5pbmRleE9mKSByZXR1cm4gbGlzdC5pbmRleE9mKG5lZWRsZSk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGxpc3QubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbmVlZGxlKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9LFxuXG4gIG1hcDogZnVuY3Rpb24ob2JqZWN0LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmIChvYmplY3QubWFwKSByZXR1cm4gb2JqZWN0Lm1hcChjYWxsYmFjaywgY29udGV4dCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IG9iamVjdC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2FsbGJhY2suY2FsbChjb250ZXh0IHx8IG51bGwsIG9iamVjdFtpXSwgaSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgICByZXN1bHQucHVzaChjYWxsYmFjay5jYWxsKGNvbnRleHQgfHwgbnVsbCwga2V5LCBvYmplY3Rba2V5XSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIGZpbHRlcjogZnVuY3Rpb24oYXJyYXksIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKGFycmF5LmZpbHRlcikgcmV0dXJuIGFycmF5LmZpbHRlcihjYWxsYmFjaywgY29udGV4dCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChjb250ZXh0IHx8IG51bGwsIGFycmF5W2ldLCBpKSlcbiAgICAgICAgcmVzdWx0LnB1c2goYXJyYXlbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIGFzeW5jRWFjaDogZnVuY3Rpb24obGlzdCwgaXRlcmF0b3IsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIG4gICAgICAgPSBsaXN0Lmxlbmd0aCxcbiAgICAgICAgaSAgICAgICA9IC0xLFxuICAgICAgICBjYWxscyAgID0gMCxcbiAgICAgICAgbG9vcGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxzIC09IDE7XG4gICAgICBpICs9IDE7XG4gICAgICBpZiAoaSA9PT0gbikgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoY29udGV4dCk7XG4gICAgICBpdGVyYXRvcihsaXN0W2ldLCByZXN1bWUpO1xuICAgIH07XG5cbiAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGxvb3BpbmcpIHJldHVybjtcbiAgICAgIGxvb3BpbmcgPSB0cnVlO1xuICAgICAgd2hpbGUgKGNhbGxzID4gMCkgaXRlcmF0ZSgpO1xuICAgICAgbG9vcGluZyA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgcmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICBjYWxscyArPSAxO1xuICAgICAgbG9vcCgpO1xuICAgIH07XG4gICAgcmVzdW1lKCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudCA9IHtcbiAgX3JlZ2lzdHJ5OiBbXSxcblxuICBvbjogZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciB3cmFwcGVkID0gZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCkgfTtcblxuICAgIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkLCBmYWxzZSk7XG4gICAgZWxzZVxuICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCB3cmFwcGVkKTtcblxuICAgIHRoaXMuX3JlZ2lzdHJ5LnB1c2goe1xuICAgICAgX2VsZW1lbnQ6ICAgZWxlbWVudCxcbiAgICAgIF90eXBlOiAgICAgIGV2ZW50TmFtZSxcbiAgICAgIF9jYWxsYmFjazogIGNhbGxiYWNrLFxuICAgICAgX2NvbnRleHQ6ICAgICBjb250ZXh0LFxuICAgICAgX2hhbmRsZXI6ICAgd3JhcHBlZFxuICAgIH0pO1xuICB9LFxuXG4gIGRldGFjaDogZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBpID0gdGhpcy5fcmVnaXN0cnkubGVuZ3RoLCByZWdpc3RlcjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICByZWdpc3RlciA9IHRoaXMuX3JlZ2lzdHJ5W2ldO1xuXG4gICAgICBpZiAoKGVsZW1lbnQgICAgJiYgZWxlbWVudCAgICAhPT0gcmVnaXN0ZXIuX2VsZW1lbnQpICB8fFxuICAgICAgICAgIChldmVudE5hbWUgICYmIGV2ZW50TmFtZSAgIT09IHJlZ2lzdGVyLl90eXBlKSAgICAgfHxcbiAgICAgICAgICAoY2FsbGJhY2sgICAmJiBjYWxsYmFjayAgICE9PSByZWdpc3Rlci5fY2FsbGJhY2spIHx8XG4gICAgICAgICAgKGNvbnRleHQgICAgJiYgY29udGV4dCAgICAhPT0gcmVnaXN0ZXIuX2NvbnRleHQpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHJlZ2lzdGVyLl9lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICAgIHJlZ2lzdGVyLl9lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIocmVnaXN0ZXIuX3R5cGUsIHJlZ2lzdGVyLl9oYW5kbGVyLCBmYWxzZSk7XG4gICAgICBlbHNlXG4gICAgICAgIHJlZ2lzdGVyLl9lbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyByZWdpc3Rlci5fdHlwZSwgcmVnaXN0ZXIuX2hhbmRsZXIpO1xuXG4gICAgICB0aGlzLl9yZWdpc3RyeS5zcGxpY2UoaSwxKTtcbiAgICAgIHJlZ2lzdGVyID0gbnVsbDtcbiAgICB9XG4gIH1cbn07XG5cbmlmIChnbG9iYWwub251bmxvYWQgIT09IHVuZGVmaW5lZClcbiAgRXZlbnQub24oZ2xvYmFsLCAndW5sb2FkJywgRXZlbnQuZGV0YWNoLCBFdmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFdmVudDogRXZlbnRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL2V4dGVuZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBhcmVudCwgbWV0aG9kcykge1xuICBpZiAodHlwZW9mIHBhcmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIG1ldGhvZHMgPSBwYXJlbnQ7XG4gICAgcGFyZW50ICA9IE9iamVjdDtcbiAgfVxuXG4gIHZhciBrbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplKSByZXR1cm4gdGhpcztcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfTtcblxuICB2YXIgYnJpZGdlID0gZnVuY3Rpb24oKSB7fTtcbiAgYnJpZGdlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG5cbiAga2xhc3MucHJvdG90eXBlID0gbmV3IGJyaWRnZSgpO1xuICBleHRlbmQoa2xhc3MucHJvdG90eXBlLCBtZXRob2RzKTtcblxuICByZXR1cm4ga2xhc3M7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFZFUlNJT046ICAgICAgICAgICcxLjIuNCcsXG5cbiAgQkFZRVVYX1ZFUlNJT046ICAgJzEuMCcsXG4gIElEX0xFTkdUSDogICAgICAgIDE2MCxcbiAgSlNPTlBfQ0FMTEJBQ0s6ICAgJ2pzb25wY2FsbGJhY2snLFxuICBDT05ORUNUSU9OX1RZUEVTOiBbJ2xvbmctcG9sbGluZycsICdjcm9zcy1vcmlnaW4tbG9uZy1wb2xsaW5nJywgJ2NhbGxiYWNrLXBvbGxpbmcnLCAnd2Vic29ja2V0JywgJ2V2ZW50c291cmNlJywgJ2luLXByb2Nlc3MnXSxcblxuICBNQU5EQVRPUllfQ09OTkVDVElPTl9UWVBFUzogWydsb25nLXBvbGxpbmcnLCAnY2FsbGJhY2stcG9sbGluZycsICdpbi1wcm9jZXNzJ11cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb3B5T2JqZWN0ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBjbG9uZSwgaSwga2V5O1xuICBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBjbG9uZSA9IFtdO1xuICAgIGkgPSBvYmplY3QubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIGNsb25lW2ldID0gY29weU9iamVjdChvYmplY3RbaV0pO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgIGNsb25lID0gKG9iamVjdCA9PT0gbnVsbCkgPyBudWxsIDoge307XG4gICAgZm9yIChrZXkgaW4gb2JqZWN0KSBjbG9uZVtrZXldID0gY29weU9iamVjdChvYmplY3Rba2V5XSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29weU9iamVjdDtcbiIsIi8qXG5Db3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2ZcbnRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbnRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbnVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzXG5vZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG9cbnNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbnZhciBpc0FycmF5ID0gdHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbidcbiAgICA/IEFycmF5LmlzQXJyYXlcbiAgICA6IGZ1bmN0aW9uICh4cykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuICAgIH1cbjtcbmZ1bmN0aW9uIGluZGV4T2YgKHhzLCB4KSB7XG4gICAgaWYgKHhzLmluZGV4T2YpIHJldHVybiB4cy5pbmRleE9mKHgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHggPT09IHhzW2ldKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7fVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzQXJyYXkodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpXG4gICAge1xuICAgICAgaWYgKGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGFyZ3VtZW50c1sxXTsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIGZhbHNlO1xuICB2YXIgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgaWYgKCFoYW5kbGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09ICdmdW5jdGlvbicpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGlzQXJyYXkoaGFuZGxlcikpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gRXZlbnRFbWl0dGVyIGlzIGRlZmluZWQgaW4gc3JjL25vZGVfZXZlbnRzLmNjXG4vLyBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQoKSBpcyBhbHNvIGRlZmluZWQgdGhlcmUuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBsaXN0ZW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkTGlzdGVuZXIgb25seSB0YWtlcyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09IFwibmV3TGlzdGVuZXJzXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyc1wiLlxuICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh0aGlzLl9ldmVudHNbdHlwZV0pKSB7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHNlbGYub24odHlwZSwgZnVuY3Rpb24gZygpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgbGlzdGVuZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gIH1cblxuICAvLyBkb2VzIG5vdCB1c2UgbGlzdGVuZXJzKCksIHNvIG5vIHNpZGUgZWZmZWN0IG9mIGNyZWF0aW5nIF9ldmVudHNbdHlwZV1cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzQXJyYXkobGlzdCkpIHtcbiAgICB2YXIgaSA9IGluZGV4T2YobGlzdCwgbGlzdGVuZXIpO1xuICAgIGlmIChpIDwgMCkgcmV0dXJuIHRoaXM7XG4gICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09IDApXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICB9IGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSA9PT0gbGlzdGVuZXIpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGRvZXMgbm90IHVzZSBsaXN0ZW5lcnMoKSwgc28gbm8gc2lkZSBlZmZlY3Qgb2YgY3JlYXRpbmcgX2V2ZW50c1t0eXBlXVxuICBpZiAodHlwZSAmJiB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW3R5cGVdKSB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB0aGlzLl9ldmVudHNbdHlwZV0gPSBbXTtcbiAgaWYgKCFpc0FycmF5KHRoaXMuX2V2ZW50c1t0eXBlXSkpIHtcbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZXZlbnRzW3R5cGVdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXN0LCBzb3VyY2UsIG92ZXJ3cml0ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGRlc3Q7XG4gIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICBpZiAoIXNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcbiAgICBpZiAoZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIG92ZXJ3cml0ZSA9PT0gZmFsc2UpIGNvbnRpbnVlO1xuICAgIGlmIChkZXN0W2tleV0gIT09IHNvdXJjZVtrZXldKVxuICAgICAgZGVzdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIGRlc3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNhcCA9IHJlcXVpcmUoJ2FzYXAnKTtcblxudmFyIFBFTkRJTkcgICA9IDAsXG4gICAgRlVMRklMTEVEID0gMSxcbiAgICBSRUpFQ1RFRCAgPSAyO1xuXG52YXIgUkVUVVJOID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geCB9LFxuICAgIFRIUk9XICA9IGZ1bmN0aW9uKHgpIHsgdGhyb3cgIHggfTtcblxudmFyIFByb21pc2UgPSBmdW5jdGlvbih0YXNrKSB7XG4gIHRoaXMuX3N0YXRlICAgICAgID0gUEVORElORztcbiAgdGhpcy5fb25GdWxmaWxsZWQgPSBbXTtcbiAgdGhpcy5fb25SZWplY3RlZCAgPSBbXTtcblxuICBpZiAodHlwZW9mIHRhc2sgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRhc2soZnVuY3Rpb24odmFsdWUpICB7IHJlc29sdmUoc2VsZiwgdmFsdWUpIH0sXG4gICAgICAgZnVuY3Rpb24ocmVhc29uKSB7IHJlamVjdChzZWxmLCByZWFzb24pIH0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIHZhciBuZXh0ID0gbmV3IFByb21pc2UoKTtcbiAgcmVnaXN0ZXJPbkZ1bGZpbGxlZCh0aGlzLCBvbkZ1bGZpbGxlZCwgbmV4dCk7XG4gIHJlZ2lzdGVyT25SZWplY3RlZCh0aGlzLCBvblJlamVjdGVkLCBuZXh0KTtcbiAgcmV0dXJuIG5leHQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5cbnZhciByZWdpc3Rlck9uRnVsZmlsbGVkID0gZnVuY3Rpb24ocHJvbWlzZSwgb25GdWxmaWxsZWQsIG5leHQpIHtcbiAgaWYgKHR5cGVvZiBvbkZ1bGZpbGxlZCAhPT0gJ2Z1bmN0aW9uJykgb25GdWxmaWxsZWQgPSBSRVRVUk47XG4gIHZhciBoYW5kbGVyID0gZnVuY3Rpb24odmFsdWUpIHsgaW52b2tlKG9uRnVsZmlsbGVkLCB2YWx1ZSwgbmV4dCkgfTtcblxuICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICBwcm9taXNlLl9vbkZ1bGZpbGxlZC5wdXNoKGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHByb21pc2UuX3N0YXRlID09PSBGVUxGSUxMRUQpIHtcbiAgICBoYW5kbGVyKHByb21pc2UuX3ZhbHVlKTtcbiAgfVxufTtcblxudmFyIHJlZ2lzdGVyT25SZWplY3RlZCA9IGZ1bmN0aW9uKHByb21pc2UsIG9uUmVqZWN0ZWQsIG5leHQpIHtcbiAgaWYgKHR5cGVvZiBvblJlamVjdGVkICE9PSAnZnVuY3Rpb24nKSBvblJlamVjdGVkID0gVEhST1c7XG4gIHZhciBoYW5kbGVyID0gZnVuY3Rpb24ocmVhc29uKSB7IGludm9rZShvblJlamVjdGVkLCByZWFzb24sIG5leHQpIH07XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgcHJvbWlzZS5fb25SZWplY3RlZC5wdXNoKGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHByb21pc2UuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIGhhbmRsZXIocHJvbWlzZS5fcmVhc29uKTtcbiAgfVxufTtcblxudmFyIGludm9rZSA9IGZ1bmN0aW9uKGZuLCB2YWx1ZSwgbmV4dCkge1xuICBhc2FwKGZ1bmN0aW9uKCkgeyBfaW52b2tlKGZuLCB2YWx1ZSwgbmV4dCkgfSk7XG59O1xuXG52YXIgX2ludm9rZSA9IGZ1bmN0aW9uKGZuLCB2YWx1ZSwgbmV4dCkge1xuICB2YXIgb3V0Y29tZTtcblxuICB0cnkge1xuICAgIG91dGNvbWUgPSBmbih2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlamVjdChuZXh0LCBlcnJvcik7XG4gIH1cblxuICBpZiAob3V0Y29tZSA9PT0gbmV4dCkge1xuICAgIHJlamVjdChuZXh0LCBuZXcgVHlwZUVycm9yKCdSZWN1cnNpdmUgcHJvbWlzZSBjaGFpbiBkZXRlY3RlZCcpKTtcbiAgfSBlbHNlIHtcbiAgICByZXNvbHZlKG5leHQsIG91dGNvbWUpO1xuICB9XG59O1xuXG52YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uKHByb21pc2UsIHZhbHVlKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZSwgdHlwZSwgdGhlbjtcblxuICB0cnkge1xuICAgIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgdGhlbiA9IHZhbHVlICE9PSBudWxsICYmICh0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnKSAmJiB2YWx1ZS50aGVuO1xuXG4gICAgaWYgKHR5cGVvZiB0aGVuICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG5cbiAgICB0aGVuLmNhbGwodmFsdWUsIGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghKGNhbGxlZCBeIChjYWxsZWQgPSB0cnVlKSkpIHJldHVybjtcbiAgICAgIHJlc29sdmUocHJvbWlzZSwgdik7XG4gICAgfSwgZnVuY3Rpb24ocikge1xuICAgICAgaWYgKCEoY2FsbGVkIF4gKGNhbGxlZCA9IHRydWUpKSkgcmV0dXJuO1xuICAgICAgcmVqZWN0KHByb21pc2UsIHIpO1xuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghKGNhbGxlZCBeIChjYWxsZWQgPSB0cnVlKSkpIHJldHVybjtcbiAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICB9XG59O1xuXG52YXIgZnVsZmlsbCA9IGZ1bmN0aW9uKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykgcmV0dXJuO1xuXG4gIHByb21pc2UuX3N0YXRlICAgICAgPSBGVUxGSUxMRUQ7XG4gIHByb21pc2UuX3ZhbHVlICAgICAgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fb25SZWplY3RlZCA9IFtdO1xuXG4gIHZhciBvbkZ1bGZpbGxlZCA9IHByb21pc2UuX29uRnVsZmlsbGVkLCBmbjtcbiAgd2hpbGUgKGZuID0gb25GdWxmaWxsZWQuc2hpZnQoKSkgZm4odmFsdWUpO1xufTtcblxudmFyIHJlamVjdCA9IGZ1bmN0aW9uKHByb21pc2UsIHJlYXNvbikge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHJldHVybjtcblxuICBwcm9taXNlLl9zdGF0ZSAgICAgICA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZWFzb24gICAgICA9IHJlYXNvbjtcbiAgcHJvbWlzZS5fb25GdWxmaWxsZWQgPSBbXTtcblxuICB2YXIgb25SZWplY3RlZCA9IHByb21pc2UuX29uUmVqZWN0ZWQsIGZuO1xuICB3aGlsZSAoZm4gPSBvblJlamVjdGVkLnNoaWZ0KCkpIGZuKHJlYXNvbik7XG59O1xuXG5Qcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7IHJlc29sdmUodmFsdWUpIH0pO1xufTtcblxuUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbihyZWFzb24pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkgeyByZWplY3QocmVhc29uKSB9KTtcbn07XG5cblByb21pc2UuYWxsID0gZnVuY3Rpb24ocHJvbWlzZXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBsaXN0ID0gW10sIG4gPSBwcm9taXNlcy5sZW5ndGgsIGk7XG5cbiAgICBpZiAobiA9PT0gMCkgcmV0dXJuIHJlc29sdmUobGlzdCk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSAoZnVuY3Rpb24ocHJvbWlzZSwgaSkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgbGlzdFtpXSA9IHZhbHVlO1xuICAgICAgICBpZiAoLS1uID09PSAwKSByZXNvbHZlKGxpc3QpO1xuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KShwcm9taXNlc1tpXSwgaSk7XG4gIH0pO1xufTtcblxuUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24ocHJvbWlzZXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gcHJvbWlzZXMubGVuZ3RoOyBpIDwgbjsgaSsrKVxuICAgICAgUHJvbWlzZS5yZXNvbHZlKHByb21pc2VzW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gIH0pO1xufTtcblxuUHJvbWlzZS5kZWZlcnJlZCA9IFByb21pc2UucGVuZGluZyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdHVwbGUgPSB7fTtcblxuICB0dXBsZS5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHVwbGUucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgdHVwbGUucmVqZWN0ICA9IHJlamVjdDtcbiAgfSk7XG4gIHJldHVybiB0dXBsZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzID0gcmVxdWlyZSgnLi9jbGFzcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENsYXNzKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5faW5kZXggPSB7fTtcbiAgfSxcblxuICBhZGQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB2YXIga2V5ID0gKGl0ZW0uaWQgIT09IHVuZGVmaW5lZCkgPyBpdGVtLmlkIDogaXRlbTtcbiAgICBpZiAodGhpcy5faW5kZXguaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHRoaXMuX2luZGV4W2tleV0gPSBpdGVtO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGZvckVhY2g6IGZ1bmN0aW9uKGJsb2NrLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2luZGV4KSB7XG4gICAgICBpZiAodGhpcy5faW5kZXguaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgYmxvY2suY2FsbChjb250ZXh0LCB0aGlzLl9pbmRleFtrZXldKTtcbiAgICB9XG4gIH0sXG5cbiAgaXNFbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2luZGV4KSB7XG4gICAgICBpZiAodGhpcy5faW5kZXguaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBtZW1iZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5faW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRleFtrZXldID09PSBpdGVtKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24oaXRlbSkge1xuICAgIHZhciBrZXkgPSAoaXRlbS5pZCAhPT0gdW5kZWZpbmVkKSA/IGl0ZW0uaWQgOiBpdGVtO1xuICAgIHZhciByZW1vdmVkID0gdGhpcy5faW5kZXhba2V5XTtcbiAgICBkZWxldGUgdGhpcy5faW5kZXhba2V5XTtcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfSxcblxuICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyBhcnJheS5wdXNoKGl0ZW0pIH0pO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGh0dHA6Ly9hc3NhbmthLm5ldC9jb250ZW50L3RlY2gvMjAwOS8wOS8wMi9qc29uMi1qcy12cy1wcm90b3R5cGUvXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gKHRoaXNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSA/IHRoaXNba2V5XSA6IHZhbHVlO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1VSSTogZnVuY3Rpb24odXJpKSB7XG4gICAgcmV0dXJuIHVyaSAmJiB1cmkucHJvdG9jb2wgJiYgdXJpLmhvc3QgJiYgdXJpLnBhdGg7XG4gIH0sXG5cbiAgaXNTYW1lT3JpZ2luOiBmdW5jdGlvbih1cmkpIHtcbiAgICByZXR1cm4gdXJpLnByb3RvY29sID09PSBsb2NhdGlvbi5wcm90b2NvbCAmJlxuICAgICAgICAgICB1cmkuaG9zdG5hbWUgPT09IGxvY2F0aW9uLmhvc3RuYW1lICYmXG4gICAgICAgICAgIHVyaS5wb3J0ICAgICA9PT0gbG9jYXRpb24ucG9ydDtcbiAgfSxcblxuICBwYXJzZTogZnVuY3Rpb24odXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gdXJsO1xuICAgIHZhciB1cmkgPSB7fSwgcGFydHMsIHF1ZXJ5LCBwYWlycywgaSwgbiwgZGF0YTtcblxuICAgIHZhciBjb25zdW1lID0gZnVuY3Rpb24obmFtZSwgcGF0dGVybikge1xuICAgICAgdXJsID0gdXJsLnJlcGxhY2UocGF0dGVybiwgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgdXJpW25hbWVdID0gbWF0Y2g7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0pO1xuICAgICAgdXJpW25hbWVdID0gdXJpW25hbWVdIHx8ICcnO1xuICAgIH07XG5cbiAgICBjb25zdW1lKCdwcm90b2NvbCcsIC9eW2Etel0rXFw6L2kpO1xuICAgIGNvbnN1bWUoJ2hvc3QnLCAgICAgL15cXC9cXC9bXlxcL1xcPyNdKy8pO1xuXG4gICAgaWYgKCEvXlxcLy8udGVzdCh1cmwpICYmICF1cmkuaG9zdClcbiAgICAgIHVybCA9IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1teXFwvXSokLywgJycpICsgdXJsO1xuXG4gICAgY29uc3VtZSgncGF0aG5hbWUnLCAvXlteXFw/I10qLyk7XG4gICAgY29uc3VtZSgnc2VhcmNoJywgICAvXlxcP1teI10qLyk7XG4gICAgY29uc3VtZSgnaGFzaCcsICAgICAvXiMuKi8pO1xuXG4gICAgdXJpLnByb3RvY29sID0gdXJpLnByb3RvY29sIHx8IGxvY2F0aW9uLnByb3RvY29sO1xuXG4gICAgaWYgKHVyaS5ob3N0KSB7XG4gICAgICB1cmkuaG9zdCAgICAgPSB1cmkuaG9zdC5zdWJzdHIoMik7XG4gICAgICBwYXJ0cyAgICAgICAgPSB1cmkuaG9zdC5zcGxpdCgnOicpO1xuICAgICAgdXJpLmhvc3RuYW1lID0gcGFydHNbMF07XG4gICAgICB1cmkucG9ydCAgICAgPSBwYXJ0c1sxXSB8fCAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdXJpLmhvc3QgICAgID0gbG9jYXRpb24uaG9zdDtcbiAgICAgIHVyaS5ob3N0bmFtZSA9IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgdXJpLnBvcnQgICAgID0gbG9jYXRpb24ucG9ydDtcbiAgICB9XG5cbiAgICB1cmkucGF0aG5hbWUgPSB1cmkucGF0aG5hbWUgfHwgJy8nO1xuICAgIHVyaS5wYXRoID0gdXJpLnBhdGhuYW1lICsgdXJpLnNlYXJjaDtcblxuICAgIHF1ZXJ5ID0gdXJpLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpO1xuICAgIHBhaXJzID0gcXVlcnkgPyBxdWVyeS5zcGxpdCgnJicpIDogW107XG4gICAgZGF0YSAgPSB7fTtcblxuICAgIGZvciAoaSA9IDAsIG4gPSBwYWlycy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIHBhcnRzID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgIGRhdGFbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdIHx8ICcnKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0gfHwgJycpO1xuICAgIH1cblxuICAgIHVyaS5xdWVyeSA9IGRhdGE7XG5cbiAgICB1cmkuaHJlZiA9IHRoaXMuc3RyaW5naWZ5KHVyaSk7XG4gICAgcmV0dXJuIHVyaTtcbiAgfSxcblxuICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHVyaSkge1xuICAgIHZhciBzdHJpbmcgPSB1cmkucHJvdG9jb2wgKyAnLy8nICsgdXJpLmhvc3RuYW1lO1xuICAgIGlmICh1cmkucG9ydCkgc3RyaW5nICs9ICc6JyArIHVyaS5wb3J0O1xuICAgIHN0cmluZyArPSB1cmkucGF0aG5hbWUgKyB0aGlzLnF1ZXJ5U3RyaW5nKHVyaS5xdWVyeSkgKyAodXJpLmhhc2ggfHwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH0sXG5cbiAgcXVlcnlTdHJpbmc6IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gICAgdmFyIHBhaXJzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIHF1ZXJ5KSB7XG4gICAgICBpZiAoIXF1ZXJ5Lmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeVtrZXldKSk7XG4gICAgfVxuICAgIGlmIChwYWlycy5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgICByZXR1cm4gJz8nICsgcGFpcnMuam9pbignJicpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXJyYXkgPSByZXF1aXJlKCcuL2FycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0aW9ucywgdmFsaWRLZXlzKSB7XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgaWYgKGFycmF5LmluZGV4T2YodmFsaWRLZXlzLCBrZXkpIDwgMClcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5yZWNvZ25pemVkIG9wdGlvbjogJyArIGtleSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBXUyA9IGdsb2JhbC5Nb3pXZWJTb2NrZXQgfHwgZ2xvYmFsLldlYlNvY2tldDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24odXJsLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIFdTICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gbmV3IFdTKHVybCk7XG4gIH1cbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl19
