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
    if (message.channel === '/meta/subscribe' && message.subscription === _channel) {
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

},{"./mixins/logging":7,"./protocol/client":11,"./protocol/scheduler":17,"./util/constants":30}],6:[function(require,module,exports){
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

var assign       = require('../util/assign'),
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

assign(Publisher, EventEmitter.prototype);
Publisher.trigger = Publisher.emit;

module.exports = Publisher;

},{"../util/assign":27,"../util/event_emitter":33}],9:[function(require,module,exports){
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
    assign    = require('../util/assign'),
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

assign(Channel.prototype, Publisher);

assign(Channel, {
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

},{"../mixins/publisher":8,"../util/assign":27,"../util/class":29,"./grammar":15}],11:[function(require,module,exports){
(function (global){
'use strict';

var asap            = require('asap'),
    Class           = require('../util/class'),
    Promise         = require('../util/promise'),
    array           = require('../util/array'),
    browser         = require('../util/browser'),
    constants       = require('../util/constants'),
    assign          = require('../util/assign'),
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
  UNCONNECTED:  1,
  CONNECTING:   2,
  CONNECTED:    3,
  DISCONNECTED: 4,

  HANDSHAKE: 'handshake',
  RETRY:     'retry',
  NONE:      'none',

  CONNECTION_TIMEOUT: 60,

  DEFAULT_ENDPOINT: '/bayeux',
  INTERVAL:         0,

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

    this.info('Initiating handshake with ?', this._dispatcher.endpoint.href);
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
    assign(this._advice, advice);
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

assign(Client.prototype, Deferrable);
assign(Client.prototype, Publisher);
assign(Client.prototype, Logging);
assign(Client.prototype, Extensible);

module.exports = Client;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/deferrable":6,"../mixins/logging":7,"../mixins/publisher":8,"../util/array":26,"../util/assign":27,"../util/browser":28,"../util/class":29,"../util/constants":30,"../util/promise":34,"../util/validate_options":38,"./channel":10,"./dispatcher":12,"./error":13,"./extensible":14,"./publication":16,"./subscription":18,"asap":3}],12:[function(require,module,exports){
(function (global){
'use strict';

var Class     = require('../util/class'),
    URI       = require('../util/uri'),
    cookies   = require('../util/cookies'),
    assign    = require('../util/assign'),
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
    if (typeof this._proxy === 'string') this._proxy = { origin: this._proxy };

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
    Transport.disable(feature);
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
      this.debug('Selected ? transport for ?', transport.connectionType, transport.endpoint.href);

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
      scheduler = new this._scheduler(message, { timeout: timeout, interval: this.retry, attempts: attempts, deadline: deadline });
      envelope  = this._envelopes[id] = { message: message, scheduler: scheduler };
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

assign(Dispatcher.prototype, Publisher);
assign(Dispatcher.prototype, Logging);

module.exports = Dispatcher;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/logging":7,"../mixins/publisher":8,"../transport":19,"../util/assign":27,"../util/class":29,"../util/cookies":31,"../util/uri":37,"./scheduler":17}],13:[function(require,module,exports){
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

},{"../util/class":29,"./grammar":15}],14:[function(require,module,exports){
'use strict';

var assign  = require('../util/assign'),
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

assign(Extensible, Logging);

module.exports = Extensible;

},{"../mixins/logging":7,"../util/assign":27}],15:[function(require,module,exports){
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

},{"../mixins/deferrable":6,"../util/class":29}],17:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

var Scheduler = function(message, options) {
  this.message  = message;
  this.options  = options;
  this.attempts = 0;
};

assign(Scheduler.prototype, {
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

},{"../util/assign":27}],18:[function(require,module,exports){
'use strict';

var Class      = require('../util/class'),
    assign     = require('../util/assign'),
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

assign(Subscription.prototype, Deferrable);

module.exports = Subscription;

},{"../mixins/deferrable":6,"../util/assign":27,"../util/class":29}],19:[function(require,module,exports){
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
    assign    = require('../util/assign'),
    toJSON    = require('../util/to_json'),
    Transport = require('./transport');

var CORS = assign(Class(Transport, {
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

    xhr.open('POST', this.endpoint.href, true);
    xhr.withCredentials = true;

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
      CORS._pending.add({ id: id, xhr: xhr });

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

},{"../util/assign":27,"../util/class":29,"../util/set":35,"../util/to_json":36,"../util/uri":37,"./transport":23}],21:[function(require,module,exports){
(function (global){
'use strict';

var Class      = require('../util/class'),
    URI        = require('../util/uri'),
    copyObject = require('../util/copy_object'),
    assign     = require('../util/assign'),
    Deferrable = require('../mixins/deferrable'),
    Transport  = require('./transport'),
    XHR        = require('./xhr');

var EventSource = assign(Class(Transport, {
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

assign(EventSource.prototype, Deferrable);

module.exports = EventSource;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/deferrable":6,"../util/assign":27,"../util/class":29,"../util/copy_object":32,"../util/uri":37,"./transport":23,"./xhr":25}],22:[function(require,module,exports){
(function (global){
'use strict';

var Class      = require('../util/class'),
    URI        = require('../util/uri'),
    copyObject = require('../util/copy_object'),
    assign     = require('../util/assign'),
    toJSON     = require('../util/to_json'),
    Transport  = require('./transport');

var JSONP = assign(Class(Transport, {
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

    return { abort: cleanup };
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

},{"../util/assign":27,"../util/class":29,"../util/copy_object":32,"../util/to_json":36,"../util/uri":37,"./transport":23}],23:[function(require,module,exports){
(function (process){
'use strict';

var Class    = require('../util/class'),
    Cookie   = require('../util/cookies').Cookie,
    Promise  = require('../util/promise'),
    array    = require('../util/array'),
    assign   = require('../util/assign'),
    Logging  = require('../mixins/logging'),
    Timeouts = require('../mixins/timeouts'),
    Channel  = require('../protocol/channel');

var Transport = assign(Class({ className: 'Transport',
  DEFAULT_PORTS: { 'http:': 80, 'https:': 443, 'ws:': 80, 'wss:': 443 },
  MAX_DELAY:     0,

  batching:  true,

  initialize: function(dispatcher, endpoint) {
    this._dispatcher = dispatcher;
    this.endpoint    = endpoint;
    this._outbox     = [];
    this._proxy      = assign({}, this._dispatcher.proxy);

    if (!this._proxy.origin)
      this._proxy.origin = this._findProxy();
  },

  close: function() {},

  encode: function(messages) {
    return '';
  },

  sendMessage: function(message) {
    this.debug('Client ? sending message to ?: ?',
               this._dispatcher.clientId, this.endpoint.href, message);

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
      this._connectMessage.advice = { timeout: 0 };

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
               this._dispatcher.clientId, this.endpoint.href, this.connectionType, replies);

    for (var i = 0, n = replies.length; i < n; i++)
      this._dispatcher.handleResponse(replies[i]);
  },

  _handleError: function(messages, immediate) {
    messages = [].concat(messages);

    this.debug('Client ? failed to send to ? via ?: ?',
               this._dispatcher.clientId, this.endpoint.href, this.connectionType, messages);

    for (var i = 0, n = messages.length; i < n; i++)
      this._dispatcher.handleError(messages[i]);
  },

  _getCookies: function() {
    var cookies = this._dispatcher.cookies,
        url     = this.endpoint.href;

    if (!cookies) return '';

    return array.map(cookies.getCookiesSync(url), function(cookie) {
      return cookie.cookieString();
    }).join('; ');
  },

  _storeCookies: function(setCookie) {
    var cookies = this._dispatcher.cookies,
        url     = this.endpoint.href,
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
      throw new Error('Could not find a usable connection type for ' + endpoint.href);
    });
  },

  register: function(type, klass) {
    this._transports.push([type, klass]);
    klass.prototype.connectionType = type;
  },

  getConnectionTypes: function() {
    return array.map(this._transports, function(t) { return t[0] });
  },

  disable: function(feature) {
    if (feature !== 'autodisconnect') return;

    for (var i = 0; i < this._transports.length; i++)
      this._transports[i][1]._unloaded = false;
  },

  _transports: []
});

assign(Transport.prototype, Logging);
assign(Transport.prototype, Timeouts);

module.exports = Transport;

}).call(this,require('_process'))

},{"../mixins/logging":7,"../mixins/timeouts":9,"../protocol/channel":10,"../util/array":26,"../util/assign":27,"../util/class":29,"../util/cookies":31,"../util/promise":34,"_process":40}],24:[function(require,module,exports){
(function (global){
'use strict';

var Class      = require('../util/class'),
    Promise    = require('../util/promise'),
    Set        = require('../util/set'),
    URI        = require('../util/uri'),
    browser    = require('../util/browser'),
    copyObject = require('../util/copy_object'),
    assign     = require('../util/assign'),
    toJSON     = require('../util/to_json'),
    ws         = require('../util/websocket'),
    Deferrable = require('../mixins/deferrable'),
    Transport  = require('./transport');

var WebSocket = assign(Class(Transport, {
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
        options    = { extensions: extensions, headers: headers, proxy: this._proxy, tls: tls };

    if (cookie !== '') options.headers['Cookie'] = cookie;

    try {
      return ws.create(url, [], options);
    } catch (e) {
      // catch CSP error to allow transport to fallback to next connType
    }
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

assign(WebSocket.prototype, Deferrable);

if (browser.Event && global.onbeforeunload !== undefined) {
  browser.Event.on(global, 'beforeunload', function() {
    if (WebSocket._unloaded === undefined)
      WebSocket._unloaded = true;
  });
}

module.exports = WebSocket;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/deferrable":6,"../util/assign":27,"../util/browser":28,"../util/class":29,"../util/copy_object":32,"../util/promise":34,"../util/set":35,"../util/to_json":36,"../util/uri":37,"../util/websocket":39,"./transport":23}],25:[function(require,module,exports){
(function (global){
'use strict';

var Class     = require('../util/class'),
    URI       = require('../util/uri'),
    browser   = require('../util/browser'),
    assign    = require('../util/assign'),
    toJSON    = require('../util/to_json'),
    Transport = require('./transport');

var XHR = assign(Class(Transport, {
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

},{"../util/assign":27,"../util/browser":28,"../util/class":29,"../util/to_json":36,"../util/uri":37,"./transport":23}],26:[function(require,module,exports){
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
'use strict';

var forEach = Array.prototype.forEach,
    hasOwn  = Object.prototype.hasOwnProperty;

module.exports = function(target) {
  forEach.call(arguments, function(source, i) {
    if (i === 0) return;

    for (var key in source) {
      if (hasOwn.call(source, key)) target[key] = source[key];
    }
  });

  return target;
};

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
'use strict';

var assign = require('./assign');

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
  assign(klass.prototype, methods);

  return klass;
};

},{"./assign":27}],30:[function(require,module,exports){
module.exports = {
  VERSION:          '1.4.0',

  BAYEUX_VERSION:   '1.0',
  ID_LENGTH:        160,
  JSONP_CALLBACK:   'jsonpcallback',
  CONNECTION_TYPES: ['long-polling', 'cross-origin-long-polling', 'callback-polling', 'websocket', 'eventsource', 'in-process'],

  MANDATORY_CONNECTION_TYPES: ['long-polling', 'callback-polling', 'in-process']
};

},{}],31:[function(require,module,exports){
'use strict';

module.exports = {};

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
'use strict';

var asap = require('asap');

var PENDING   = -1,
    FULFILLED =  0,
    REJECTED  =  1;

var Promise = function(task) {
  this._state = PENDING;
  this._value = null;
  this._defer = [];

  execute(this, task);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var promise = new Promise();

  var deferred = {
    promise:     promise,
    onFulfilled: onFulfilled,
    onRejected:  onRejected
  };

  if (this._state === PENDING)
    this._defer.push(deferred);
  else
    propagate(this, deferred);

  return promise;
};

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

var execute = function(promise, task) {
  if (typeof task !== 'function') return;

  var calls = 0;

  var resolvePromise = function(value) {
    if (calls++ === 0) resolve(promise, value);
  };

  var rejectPromise = function(reason) {
    if (calls++ === 0) reject(promise, reason);
  };

  try {
    task(resolvePromise, rejectPromise);
  } catch (error) {
    rejectPromise(error);
  }
};

var propagate = function(promise, deferred) {
  var state   = promise._state,
      value   = promise._value,
      next    = deferred.promise,
      handler = [deferred.onFulfilled, deferred.onRejected][state],
      pass    = [resolve, reject][state];

  if (typeof handler !== 'function')
    return pass(next, value);

  asap(function() {
    try {
      resolve(next, handler(value));
    } catch (error) {
      reject(next, error);
    }
  });
};

var resolve = function(promise, value) {
  if (promise === value)
    return reject(promise, new TypeError('Recursive promise chain detected'));

  var then;

  try {
    then = getThen(value);
  } catch (error) {
    return reject(promise, error);
  }

  if (!then) return fulfill(promise, value);

  execute(promise, function(resolvePromise, rejectPromise) {
    then.call(value, resolvePromise, rejectPromise);
  });
};

var getThen = function(value) {
  var type = typeof value,
      then = (type === 'object' || type === 'function') && value && value.then;

  return (typeof then === 'function')
         ? then
         : null;
};

var fulfill = function(promise, value) {
  settle(promise, FULFILLED, value);
};

var reject = function(promise, reason) {
  settle(promise, REJECTED, reason);
};

var settle = function(promise, state, value) {
  var defer = promise._defer, i = 0;

  promise._state = state;
  promise._value = value;
  promise._defer = null;

  if (defer.length === 0) return;
  while (i < defer.length) propagate(promise, defer[i++]);
};

Promise.resolve = function(value) {
  try {
    if (getThen(value)) return value;
  } catch (error) {
    return Promise.reject(error);
  }

  return new Promise(function(resolve, reject) { resolve(value) });
};

Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) { reject(reason) });
};

Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    var list = [], n = promises.length, i;

    if (n === 0) return resolve(list);

    var push = function(promise, i) {
      Promise.resolve(promise).then(function(value) {
        list[i] = value;
        if (--n === 0) resolve(list);
      }, reject);
    };

    for (i = 0; i < n; i++) push(promises[i], i);
  });
};

Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, n = promises.length; i < n; i++)
      Promise.resolve(promises[i]).then(resolve, reject);
  });
};

Promise.deferred = function() {
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

},{"./class":29}],36:[function(require,module,exports){
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
      uri.host = uri.host.substr(2);

      if (/@/.test(uri.host)) {
        uri.auth = uri.host.split('@')[0];
        uri.host = uri.host.split('@')[1];
      }
      parts        = uri.host.match(/^\[([^\]]+)\]|^[^:]+/);
      uri.hostname = parts[1] || parts[0];
      uri.port     = (uri.host.match(/:(\d+)$/) || [])[1] || '';
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
    var auth   = uri.auth ? uri.auth + '@' : '',
        string = uri.protocol + '//' + auth + uri.host;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3N0cmVhbWluZy1leHRlbnNpb24uanMiLCJsaWIvYXBpL3N0cmVhbWluZy5qcyIsIm5vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItYXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItcmF3LmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL2ZheWVfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9taXhpbnMvZGVmZXJyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9taXhpbnMvbG9nZ2luZy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9taXhpbnMvcHVibGlzaGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL21peGlucy90aW1lb3V0cy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9jaGFubmVsLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3Byb3RvY29sL2NsaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9kaXNwYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3Byb3RvY29sL2Vycm9yLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3Byb3RvY29sL2V4dGVuc2libGUuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvcHJvdG9jb2wvZ3JhbW1hci5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9wdWJsaWNhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy9wcm90b2NvbC9zY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvcHJvdG9jb2wvc3Vic2NyaXB0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3RyYW5zcG9ydC9icm93c2VyX3RyYW5zcG9ydHMuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdHJhbnNwb3J0L2NvcnMuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdHJhbnNwb3J0L2V2ZW50X3NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy90cmFuc3BvcnQvanNvbnAuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdHJhbnNwb3J0L3RyYW5zcG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy90cmFuc3BvcnQvd2ViX3NvY2tldC5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy90cmFuc3BvcnQveGhyLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9icm93c2VyL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9jb29raWVzL2Jyb3dzZXJfY29va2llcy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL2NvcHlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvZXZlbnRfZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC9zZXQuanMiLCJub2RlX21vZHVsZXMvZmF5ZS9zcmMvdXRpbC90b19qc29uLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvdXJpLmpzIiwibm9kZV9tb2R1bGVzL2ZheWUvc3JjL3V0aWwvdmFsaWRhdGVfb3B0aW9ucy5qcyIsIm5vZGVfbW9kdWxlcy9mYXllL3NyYy91dGlsL3dlYnNvY2tldC9icm93c2VyX3dlYnNvY2tldC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2pZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBGYXllIENsaWVudCBleHRlbnNpb25zOiBodHRwczovL2ZheWUuamNvZ2xhbi5jb20vYnJvd3Nlci9leHRlbnNpb25zLmh0bWxcbiAqXG4gKiBGb3IgdXNlIHdpdGggU3RyZWFtaW5nLnByb3RvdHlwZS5jcmVhdGVDbGllbnQoKVxuKiovXG52YXIgU3RyZWFtaW5nRXh0ZW5zaW9uID0ge307XG5cbi8qKlxuICogQ29uc3RydWN0b3IgZm9yIGFuIGF1dGggZmFpbHVyZSBkZXRlY3RvciBleHRlbnNpb25cbiAqXG4gKiBCYXNlZCBvbiBuZXcgZmVhdHVyZSByZWxlYXNlZCB3aXRoIFNhbGVzZm9yY2UgU3ByaW5nICcxODpcbiAqIGh0dHBzOi8vcmVsZWFzZW5vdGVzLmRvY3Muc2FsZXNmb3JjZS5jb20vZW4tdXMvc3ByaW5nMTgvcmVsZWFzZS1ub3Rlcy9ybl9tZXNzYWdpbmdfY29tZXRkX2F1dGhfdmFsaWRhdGlvbi5odG0/ZWRpdGlvbj0maW1wYWN0PVxuICpcbiAqIEV4YW1wbGUgdHJpZ2dlcmluZyBlcnJvciBtZXNzYWdlOlxuICpcbiAqIGBgYFxuICoge1xuICogICBcImV4dFwiOntcbiAqICAgICBcInNmZGNcIjp7XCJmYWlsdXJlUmVhc29uXCI6XCI0MDE6OkF1dGhlbnRpY2F0aW9uIGludmFsaWRcIn0sXG4gKiAgICAgXCJyZXBsYXlcIjp0cnVlfSxcbiAqICAgXCJhZHZpY2VcIjp7XCJyZWNvbm5lY3RcIjpcIm5vbmVcIn0sXG4gKiAgIFwiY2hhbm5lbFwiOlwiL21ldGEvaGFuZHNoYWtlXCIsXG4gKiAgIFwiZXJyb3JcIjpcIjQwMzo6SGFuZHNoYWtlIGRlbmllZFwiLFxuICogICBcInN1Y2Nlc3NmdWxcIjpmYWxzZVxuICogfVxuICogYGBgXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjb25uID0gbmV3IGpzZm9yY2UuQ29ubmVjdGlvbih7IOKApiB9KTtcbiAqIFxuICogY29uc3QgY2hhbm5lbCA9IFwiL2V2ZW50L015X0V2ZW50X19lXCI7XG4gKiBcbiAqIC8vIEV4aXQgdGhlIE5vZGUgcHJvY2VzcyB3aGVuIGF1dGggZmFpbHNcbiAqIGNvbnN0IGV4aXRDYWxsYmFjayA9ICgpID0+IHByb2Nlc3MuZXhpdCgxKTtcbiAqIGNvbnN0IGF1dGhGYWlsdXJlRXh0ID0gbmV3IGpzZm9yY2UuU3RyZWFtaW5nRXh0ZW5zaW9uLkF1dGhGYWlsdXJlKGV4aXRDYWxsYmFjayk7XG4gKiBcbiAqIGNvbnN0IGZheWVDbGllbnQgPSBjb25uLnN0cmVhbWluZy5jcmVhdGVDbGllbnQoWyBhdXRoRmFpbHVyZUV4dCBdKTtcbiAqIFxuICogY29uc3Qgc3Vic2NyaXB0aW9uID0gZmF5ZUNsaWVudC5zdWJzY3JpYmUoY2hhbm5lbCwgZGF0YSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKCd0b3BpYyByZWNlaXZlZCBkYXRhJywgZGF0YSk7XG4gKiB9KTtcbiAqIFxuICogc3Vic2NyaXB0aW9uLmNhbmNlbCgpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZmFpbHVyZUNhbGxiYWNrIC0gSW52b2tlZCB3aGVuIGF1dGhlbnRpY2F0aW9uIGJlY29tZXMgaW52YWxpZFxuICovXG5TdHJlYW1pbmdFeHRlbnNpb24uQXV0aEZhaWx1cmUgPSBmdW5jdGlvbihmYWlsdXJlQ2FsbGJhY2spIHtcbiAgdGhpcy5pbmNvbWluZyA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgaWYgKFxuICAgICAgKG1lc3NhZ2UuY2hhbm5lbCA9PT0gJy9tZXRhL2Nvbm5lY3QnIHx8XG4gICAgICAgIG1lc3NhZ2UuY2hhbm5lbCA9PT0gJy9tZXRhL2hhbmRzaGFrZScpXG4gICAgICAmJiBtZXNzYWdlLmFkdmljZVxuICAgICAgJiYgbWVzc2FnZS5hZHZpY2UucmVjb25uZWN0ID09ICdub25lJ1xuICAgICkge1xuICAgICAgZmFpbHVyZUNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ29uc3RydWN0b3IgZm9yIGEgZHVyYWJsZSBzdHJlYW1pbmcgcmVwbGF5IGV4dGVuc2lvblxuICpcbiAqIE1vZGlmaWVkIGZyb20gb3JpZ2luYWwgU2FsZXNmb3JjZSBkZW1vIHNvdXJjZSBjb2RlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BlcmZvcmNlL1NhbGVzZm9yY2VEdXJhYmxlU3RyZWFtaW5nRGVtby9ibG9iLzNkNGE1NmVhYzk1NmY3NDRhZDZjMjJlNmE4MTQxYjZmZWI1N2FiYjkvc3RhdGljcmVzb3VyY2VzL2NvbWV0ZFJlcGxheUV4dGVuc2lvbi5yZXNvdXJjZVxuICogXG4gKiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNvbm4gPSBuZXcganNmb3JjZS5Db25uZWN0aW9uKHsg4oCmIH0pO1xuICogXG4gKiBjb25zdCBjaGFubmVsID0gXCIvZXZlbnQvTXlfRXZlbnRfX2VcIjtcbiAqIGNvbnN0IHJlcGxheUlkID0gLTI7IC8vIC0yIGlzIGFsbCByZXRhaW5lZCBldmVudHNcbiAqIFxuICogY29uc3QgcmVwbGF5RXh0ID0gbmV3IGpzZm9yY2UuU3RyZWFtaW5nRXh0ZW5zaW9uLlJlcGxheShjaGFubmVsLCByZXBsYXlJZCk7XG4gKiBcbiAqIGNvbnN0IGZheWVDbGllbnQgPSBjb25uLnN0cmVhbWluZy5jcmVhdGVDbGllbnQoWyByZXBsYXlFeHQgXSk7XG4gKiBcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGZheWVDbGllbnQuc3Vic2NyaWJlKGNoYW5uZWwsIGRhdGEgPT4ge1xuICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICogfSk7XG4gKiBcbiAqIHN1YnNjcmlwdGlvbi5jYW5jZWwoKTtcbiAqIGBgYFxuICovXG5TdHJlYW1pbmdFeHRlbnNpb24uUmVwbGF5ID0gZnVuY3Rpb24oY2hhbm5lbCwgcmVwbGF5SWQpIHtcbiAgdmFyIFJFUExBWV9GUk9NX0tFWSA9IFwicmVwbGF5XCI7XG4gIFxuICB2YXIgX2V4dGVuc2lvbkVuYWJsZWQgPSByZXBsYXlJZCAhPSBudWxsID8gdHJ1ZSA6IGZhbHNlO1xuICB2YXIgX3JlcGxheSA9IHJlcGxheUlkO1xuICB2YXIgX2NoYW5uZWwgPSBjaGFubmVsO1xuXG4gIHRoaXMuc2V0RXh0ZW5zaW9uRW5hYmxlZCA9IGZ1bmN0aW9uKGV4dGVuc2lvbkVuYWJsZWQpIHtcbiAgICBfZXh0ZW5zaW9uRW5hYmxlZCA9IGV4dGVuc2lvbkVuYWJsZWQ7XG4gIH1cblxuICB0aGlzLnNldFJlcGxheSA9IGZ1bmN0aW9uIChyZXBsYXkpIHtcbiAgICBfcmVwbGF5ID0gcGFyc2VJbnQocmVwbGF5LCAxMCk7XG4gIH1cblxuICB0aGlzLnNldENoYW5uZWwgPSBmdW5jdGlvbihjaGFubmVsKSB7XG4gICAgX2NoYW5uZWwgPSBjaGFubmVsO1xuICB9XG5cbiAgdGhpcy5pbmNvbWluZyA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgaWYgKG1lc3NhZ2UuY2hhbm5lbCA9PT0gJy9tZXRhL2hhbmRzaGFrZScpIHtcbiAgICAgIGlmIChtZXNzYWdlLmV4dCAmJiBtZXNzYWdlLmV4dFtSRVBMQVlfRlJPTV9LRVldID09IHRydWUpIHtcbiAgICAgICAgX2V4dGVuc2lvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5jaGFubmVsID09PSBfY2hhbm5lbCAmJiBtZXNzYWdlLmRhdGEgJiYgbWVzc2FnZS5kYXRhLmV2ZW50ICYmIG1lc3NhZ2UuZGF0YS5ldmVudC5yZXBsYXlJZCkge1xuICAgICAgX3JlcGxheSA9IG1lc3NhZ2UuZGF0YS5ldmVudC5yZXBsYXlJZDtcbiAgICB9XG4gICAgY2FsbGJhY2sobWVzc2FnZSk7XG4gIH1cbiAgXG4gIHRoaXMub3V0Z29pbmcgPSBmdW5jdGlvbihtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgIGlmIChtZXNzYWdlLmNoYW5uZWwgPT09ICcvbWV0YS9zdWJzY3JpYmUnICYmIG1lc3NhZ2Uuc3Vic2NyaXB0aW9uID09PSBfY2hhbm5lbCkge1xuICAgICAgaWYgKF9leHRlbnNpb25FbmFibGVkKSB7XG4gICAgICAgIGlmICghbWVzc2FnZS5leHQpIHsgbWVzc2FnZS5leHQgPSB7fTsgfVxuXG4gICAgICAgIHZhciByZXBsYXlGcm9tTWFwID0ge307XG4gICAgICAgIHJlcGxheUZyb21NYXBbX2NoYW5uZWxdID0gX3JlcGxheTtcblxuICAgICAgICAvLyBhZGQgXCJleHQgOiB7IFwicmVwbGF5XCIgOiB7IENIQU5ORUwgOiBSRVBMQVlfVkFMVUUgfX1cIiB0byBzdWJzY3JpYmUgbWVzc2FnZVxuICAgICAgICBtZXNzYWdlLmV4dFtSRVBMQVlfRlJPTV9LRVldID0gcmVwbGF5RnJvbU1hcDtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FsbGJhY2sobWVzc2FnZSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbWluZ0V4dGVuc2lvbjtcbiIsIi8qKlxuICogQGZpbGUgTWFuYWdlcyBTdHJlYW1pbmcgQVBJc1xuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRzID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnZXZlbnRzJyksXG4gICAgaW5oZXJpdHMgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdpbmhlcml0cycpLFxuICAgIF8gPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdsb2Rhc2gvY29yZScpLFxuICAgIEZheWUgICA9IHJlcXVpcmUoJ2ZheWUnKSxcbiAgICBTdHJlYW1pbmdFeHRlbnNpb24gPSByZXF1aXJlKCcuL3N0cmVhbWluZy1leHRlbnNpb24nKSxcbiAgICBqc2ZvcmNlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9jb3JlJyk7XG5cbi8qKlxuICogU3RyZWFtaW5nIEFQSSB0b3BpYyBjbGFzc1xuICpcbiAqIEBjbGFzcyBTdHJlYW1pbmd+VG9waWNcbiAqIEBwYXJhbSB7U3RyZWFtaW5nfSBzdGVhbWluZyAtIFN0cmVhbWluZyBBUEkgb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqL1xudmFyIFRvcGljID0gZnVuY3Rpb24oc3RyZWFtaW5nLCBuYW1lKSB7XG4gIHRoaXMuX3N0cmVhbWluZyA9IHN0cmVhbWluZztcbiAgdGhpcy5uYW1lID0gbmFtZTtcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RyZWFtaW5nflN0cmVhbWluZ01lc3NhZ2VcbiAqIEBwcm9wIHtPYmplY3R9IGV2ZW50XG4gKiBAcHJvcCB7T2JqZWN0fSBldmVudC50eXBlIC0gRXZlbnQgdHlwZVxuICogQHByb3Age1JlY29yZH0gc29iamVjdCAtIFJlY29yZCBpbmZvcm1hdGlvblxuICovXG4vKipcbiAqIFN1YnNjcmliZSBsaXN0ZW5lciB0byB0b3BpY1xuICpcbiAqIEBtZXRob2QgU3RyZWFtaW5nflRvcGljI3N1YnNjcmliZVxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyZWFtaW5nflN0cmVhbWluZ01lc2FzZ2U+fSBsaXN0ZW5lciAtIFN0cmVhbWluZyBtZXNzYWdlIGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7U3Vic2NyaXB0aW9ufSAtIEZheWUgc3Vic2NyaXB0aW9uIG9iamVjdFxuICovXG5Ub3BpYy5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgcmV0dXJuIHRoaXMuX3N0cmVhbWluZy5zdWJzY3JpYmUodGhpcy5uYW1lLCBsaXN0ZW5lcik7XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGxpc3RlbmVyIGZyb20gdG9waWNcbiAqXG4gKiBAbWV0aG9kIFN0cmVhbWluZ35Ub3BpYyN1bnN1YnNjcmliZVxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyZWFtaW5nflN0cmVhbWluZ01lc2FzZ2U+fSBsaXN0ZW5lciAtIFN0cmVhbWluZyBtZXNzYWdlIGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7U3RyZWFtaW5nflRvcGljfVxuICovXG5Ub3BpYy5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICB0aGlzLl9zdHJlYW1pbmcudW5zdWJzY3JpYmUodGhpcy5uYW1lLCBsaXN0ZW5lcik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogU3RyZWFtaW5nIEFQSSBHZW5lcmljIFN0cmVhbWluZyBDaGFubmVsXG4gKlxuICogQGNsYXNzIFN0cmVhbWluZ35DaGFubmVsXG4gKiBAcGFyYW0ge1N0cmVhbWluZ30gc3RlYW1pbmcgLSBTdHJlYW1pbmcgQVBJIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBDaGFubmVsIG5hbWUgKHN0YXJ0cyB3aXRoIFwiL3UvXCIpXG4gKi9cbnZhciBDaGFubmVsID0gZnVuY3Rpb24oc3RyZWFtaW5nLCBuYW1lKSB7XG4gIHRoaXMuX3N0cmVhbWluZyA9IHN0cmVhbWluZztcbiAgdGhpcy5fbmFtZSA9IG5hbWU7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBjaGFubmVsXG4gKlxuICogQHBhcmFtIHtDYWxsYmFjay48U3RyZWFtaW5nflN0cmVhbWluZ01lc3NhZ2U+fSBsaXN0ZW5lciAtIFN0cmVhbWluZyBtZXNzYWdlIGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7U3Vic2NyaXB0aW9ufSAtIEZheWUgc3Vic2NyaXB0aW9uIG9iamVjdFxuICovXG5DaGFubmVsLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihsaXN0ZW5lcikge1xuICByZXR1cm4gdGhpcy5fc3RyZWFtaW5nLnN1YnNjcmliZSh0aGlzLl9uYW1lLCBsaXN0ZW5lcik7XG59O1xuXG5DaGFubmVsLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gIHRoaXMuX3N0cmVhbWluZy51bnN1YnNjcmliZSh0aGlzLl9uYW1lLCBsaXN0ZW5lcik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQ2hhbm5lbC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGV2ZW50cywgY2FsbGJhY2spIHtcbiAgdmFyIGlzQXJyYXkgPSBfLmlzQXJyYXkoZXZlbnRzKTtcbiAgZXZlbnRzID0gaXNBcnJheSA/IGV2ZW50cyA6IFsgZXZlbnRzIF07XG4gIHZhciBjb25uID0gdGhpcy5fc3RyZWFtaW5nLl9jb25uO1xuICBpZiAoIXRoaXMuX2lkKSB7XG4gICAgdGhpcy5faWQgPSBjb25uLnNvYmplY3QoJ1N0cmVhbWluZ0NoYW5uZWwnKS5maW5kT25lKHsgTmFtZTogdGhpcy5fbmFtZSB9LCAnSWQnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVjKSB7IHJldHVybiByZWMuSWQgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2lkLnRoZW4oZnVuY3Rpb24oaWQpIHtcbiAgICB2YXIgY2hhbm5lbFVybCA9ICcvc29iamVjdHMvU3RyZWFtaW5nQ2hhbm5lbC8nICsgaWQgKyAnL3B1c2gnO1xuICAgIHJldHVybiBjb25uLnJlcXVlc3RQb3N0KGNoYW5uZWxVcmwsIHsgcHVzaEV2ZW50czogZXZlbnRzIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uKHJldHMpIHtcbiAgICByZXR1cm4gaXNBcnJheSA/IHJldHMgOiByZXRzWzBdO1xuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBTdHJlYW1pbmcgQVBJIGNsYXNzXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm4gLSBDb25uZWN0aW9uIG9iamVjdFxuICovXG52YXIgU3RyZWFtaW5nID0gZnVuY3Rpb24oY29ubikge1xuICB0aGlzLl9jb25uID0gY29ubjtcbn07XG5cbmluaGVyaXRzKFN0cmVhbWluZywgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cbi8qKiBAcHJpdmF0ZSAqKi9cblN0cmVhbWluZy5wcm90b3R5cGUuX2NyZWF0ZUNsaWVudCA9IGZ1bmN0aW9uKGZvckNoYW5uZWxOYW1lLCBleHRlbnNpb25zKSB7XG4gIC8vIGZvckNoYW5uZWxOYW1lIGlzIGFkdmlzb3J5LCBmb3IgYW4gQVBJIHdvcmthcm91bmQuIEl0IGRvZXMgbm90IHJlc3RyaWN0IG9yIHNlbGVjdCB0aGUgY2hhbm5lbC5cbiAgdmFyIG5lZWRzUmVwbGF5Rml4ID0gdHlwZW9mIGZvckNoYW5uZWxOYW1lID09PSAnc3RyaW5nJyAmJiBmb3JDaGFubmVsTmFtZS5pbmRleE9mKCcvdS8nKSA9PT0gMDtcbiAgdmFyIGVuZHBvaW50VXJsID0gW1xuICAgIHRoaXMuX2Nvbm4uaW5zdGFuY2VVcmwsXG4gICAgLy8gc3BlY2lhbCBlbmRwb2ludCBcIi9jb21ldGQvcmVwbGF5L3h4LnhcIiBpcyBvbmx5IGF2YWlsYWJsZSBpbiAzNi4wLlxuICAgIC8vIFNlZSBodHRwczovL3JlbGVhc2Vub3Rlcy5kb2NzLnNhbGVzZm9yY2UuY29tL2VuLXVzL3N1bW1lcjE2L3JlbGVhc2Utbm90ZXMvcm5fYXBpX3N0cmVhbWluZ19jbGFzc2ljX3JlcGxheS5odG1cbiAgICBcImNvbWV0ZFwiICsgKG5lZWRzUmVwbGF5Rml4ID09PSB0cnVlICYmIHRoaXMuX2Nvbm4udmVyc2lvbiA9PT0gXCIzNi4wXCIgPyBcIi9yZXBsYXlcIiA6IFwiXCIpLFxuICAgIHRoaXMuX2Nvbm4udmVyc2lvblxuICBdLmpvaW4oJy8nKTtcbiAgdmFyIGZheWVDbGllbnQgPSBuZXcgRmF5ZS5DbGllbnQoZW5kcG9pbnRVcmwsIHt9KTtcbiAgZmF5ZUNsaWVudC5zZXRIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnT0F1dGggJyt0aGlzLl9jb25uLmFjY2Vzc1Rva2VuKTtcbiAgaWYgKGV4dGVuc2lvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICAgIGZheWVDbGllbnQuYWRkRXh0ZW5zaW9uKGV4dGVuc2lvbik7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGZheWVDbGllbnQuX2Rpc3BhdGNoZXIuZ2V0Q29ubmVjdGlvblR5cGVzKCkuaW5kZXhPZignY2FsbGJhY2stcG9sbGluZycpID09PSAtMSkge1xuICAgIC8vIHByZXZlbnQgc3RyZWFtaW5nIEFQSSBzZXJ2ZXIgZXJyb3JcbiAgICBmYXllQ2xpZW50Ll9kaXNwYXRjaGVyLnNlbGVjdFRyYW5zcG9ydCgnbG9uZy1wb2xsaW5nJyk7XG4gICAgZmF5ZUNsaWVudC5fZGlzcGF0Y2hlci5fdHJhbnNwb3J0LmJhdGNoaW5nID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZheWVDbGllbnQ7XG59O1xuXG4vKiogQHByaXZhdGUgKiovXG5TdHJlYW1pbmcucHJvdG90eXBlLl9nZXRGYXllQ2xpZW50ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUpIHtcbiAgdmFyIGlzR2VuZXJpYyA9IGNoYW5uZWxOYW1lLmluZGV4T2YoJy91LycpID09PSAwO1xuICB2YXIgY2xpZW50VHlwZSA9IGlzR2VuZXJpYyA/ICdnZW5lcmljJyA6ICdwdXNoVG9waWMnO1xuICBpZiAoIXRoaXMuX2ZheWVDbGllbnRzIHx8ICF0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXSkge1xuICAgIHRoaXMuX2ZheWVDbGllbnRzID0gdGhpcy5fZmF5ZUNsaWVudHMgfHwge307XG4gICAgdGhpcy5fZmF5ZUNsaWVudHNbY2xpZW50VHlwZV0gPSB0aGlzLl9jcmVhdGVDbGllbnQoY2hhbm5lbE5hbWUpO1xuICB9XG4gIHJldHVybiB0aGlzLl9mYXllQ2xpZW50c1tjbGllbnRUeXBlXTtcbn07XG5cblxuLyoqXG4gKiBHZXQgbmFtZWQgdG9waWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEByZXR1cm5zIHtTdHJlYW1pbmd+VG9waWN9XG4gKi9cblN0cmVhbWluZy5wcm90b3R5cGUudG9waWMgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMuX3RvcGljcyA9IHRoaXMuX3RvcGljcyB8fCB7fTtcbiAgdmFyIHRvcGljID0gdGhpcy5fdG9waWNzW25hbWVdID1cbiAgICB0aGlzLl90b3BpY3NbbmFtZV0gfHwgbmV3IFRvcGljKHRoaXMsIG5hbWUpO1xuICByZXR1cm4gdG9waWM7XG59O1xuXG4vKipcbiAqIEdldCBDaGFubmVsIGZvciBJZFxuICogQHBhcmFtIHtTdHJpbmd9IGNoYW5uZWxJZCAtIElkIG9mIFN0cmVhbWluZ0NoYW5uZWwgb2JqZWN0XG4gKiBAcmV0dXJucyB7U3RyZWFtaW5nfkNoYW5uZWx9XG4gKi9cblN0cmVhbWluZy5wcm90b3R5cGUuY2hhbm5lbCA9IGZ1bmN0aW9uKGNoYW5uZWxJZCkge1xuICByZXR1cm4gbmV3IENoYW5uZWwodGhpcywgY2hhbm5lbElkKTtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvcGljL2NoYW5uZWxcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N1YnNjcmlwdGlvbn0gLSBGYXllIHN1YnNjcmlwdGlvbiBvYmplY3RcbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgY2hhbm5lbE5hbWUgPSBuYW1lLmluZGV4T2YoJy8nKSA9PT0gMCA/IG5hbWUgOiAnL3RvcGljLycgKyBuYW1lO1xuICB2YXIgZmF5ZUNsaWVudCA9IHRoaXMuX2dldEZheWVDbGllbnQoY2hhbm5lbE5hbWUpO1xuICByZXR1cm4gZmF5ZUNsaWVudC5zdWJzY3JpYmUoY2hhbm5lbE5hbWUsIGxpc3RlbmVyKTtcbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgdG9waWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFRvcGljIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFN0cmVhbWluZ35TdHJlYW1pbmdNZXNzYWdlPn0gbGlzdGVuZXIgLSBTdHJlYW1pbmcgbWVzc2FnZSBsaXN0ZW5lclxuICogQHJldHVybnMge1N0cmVhbWluZ31cbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBjaGFubmVsTmFtZSA9IG5hbWUuaW5kZXhPZignLycpID09PSAwID8gbmFtZSA6ICcvdG9waWMvJyArIG5hbWU7XG4gIHZhciBmYXllQ2xpZW50ID0gdGhpcy5fZ2V0RmF5ZUNsaWVudChjaGFubmVsTmFtZSk7XG4gIGZheWVDbGllbnQudW5zdWJzY3JpYmUoY2hhbm5lbE5hbWUsIGxpc3RlbmVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgU3RyZWFtaW5nIGNsaWVudCwgb3B0aW9uYWxseSB3aXRoIGV4dGVuc2lvbnNcbiAqXG4gKiBTZWUgRmF5ZSBkb2NzIGZvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzOiBodHRwczovL2ZheWUuamNvZ2xhbi5jb20vYnJvd3Nlci9leHRlbnNpb25zLmh0bWxcbiAqXG4gKiBFeGFtcGxlIHVzYWdlOlxuICogXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAvLyBFc3RhYmxpc2ggYSBTYWxlc2ZvcmNlIGNvbm5lY3Rpb24uIChEZXRhaWxzIGVsaWRlZClcbiAqIGNvbnN0IGNvbm4gPSBuZXcganNmb3JjZS5Db25uZWN0aW9uKHsg4oCmIH0pO1xuICogXG4gKiBjb25zdCBmYXllQ2xpZW50ID0gY29ubi5zdHJlYW1pbmcuY3JlYXRlQ2xpZW50KCk7XG4gKiBcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGZheWVDbGllbnQuc3Vic2NyaWJlKGNoYW5uZWwsIGRhdGEgPT4ge1xuICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICogfSk7XG4gKiBcbiAqIHN1YnNjcmlwdGlvbi5jYW5jZWwoKTtcbiAqIGBgYFxuICogXG4gKiBFeGFtcGxlIHdpdGggZXh0ZW5zaW9ucywgdXNpbmcgUmVwbGF5ICYgQXV0aCBGYWlsdXJlIGV4dGVuc2lvbnMgaW4gYSBzZXJ2ZXItc2lkZSBOb2RlLmpzIGFwcDpcbiAqIFxuICogYGBgamF2YXNjcmlwdFxuICogLy8gRXN0YWJsaXNoIGEgU2FsZXNmb3JjZSBjb25uZWN0aW9uLiAoRGV0YWlscyBlbGlkZWQpXG4gKiBjb25zdCBjb25uID0gbmV3IGpzZm9yY2UuQ29ubmVjdGlvbih7IOKApiB9KTtcbiAqIFxuICogY29uc3QgY2hhbm5lbCA9IFwiL2V2ZW50L015X0V2ZW50X19lXCI7XG4gKiBjb25zdCByZXBsYXlJZCA9IC0yOyAvLyAtMiBpcyBhbGwgcmV0YWluZWQgZXZlbnRzXG4gKiBcbiAqIGNvbnN0IGV4aXRDYWxsYmFjayA9ICgpID0+IHByb2Nlc3MuZXhpdCgxKTtcbiAqIGNvbnN0IGF1dGhGYWlsdXJlRXh0ID0gbmV3IGpzZm9yY2UuU3RyZWFtaW5nRXh0ZW5zaW9uLkF1dGhGYWlsdXJlKGV4aXRDYWxsYmFjayk7XG4gKiBcbiAqIGNvbnN0IHJlcGxheUV4dCA9IG5ldyBqc2ZvcmNlLlN0cmVhbWluZ0V4dGVuc2lvbi5SZXBsYXkoY2hhbm5lbCwgcmVwbGF5SWQpO1xuICogXG4gKiBjb25zdCBmYXllQ2xpZW50ID0gY29ubi5zdHJlYW1pbmcuY3JlYXRlQ2xpZW50KFtcbiAqICAgYXV0aEZhaWx1cmVFeHQsXG4gKiAgIHJlcGxheUV4dFxuICogXSk7XG4gKiBcbiAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGZheWVDbGllbnQuc3Vic2NyaWJlKGNoYW5uZWwsIGRhdGEgPT4ge1xuICogICBjb25zb2xlLmxvZygndG9waWMgcmVjZWl2ZWQgZGF0YScsIGRhdGEpO1xuICogfSk7XG4gKiBcbiAqIHN1YnNjcmlwdGlvbi5jYW5jZWwoKTtcbiAqIGBgYFxuICogXG4gKiBAcGFyYW0ge0FycmF5fSBFeHRlbnNpb25zIC0gT3B0aW9uYWwsIGV4dGVuc2lvbnMgdG8gYXBwbHkgdG8gdGhlIEZheWUgY2xpZW50XG4gKiBAcmV0dXJucyB7RmF5ZUNsaWVudH0gLSBGYXllIGNsaWVudCBvYmplY3RcbiAqL1xuU3RyZWFtaW5nLnByb3RvdHlwZS5jcmVhdGVDbGllbnQgPSBmdW5jdGlvbihleHRlbnNpb25zKSB7XG4gIHJldHVybiB0aGlzLl9jcmVhdGVDbGllbnQobnVsbCwgZXh0ZW5zaW9ucyk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5qc2ZvcmNlLm9uKCdjb25uZWN0aW9uOm5ldycsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgY29ubi5zdHJlYW1pbmcgPSBuZXcgU3RyZWFtaW5nKGNvbm4pO1xufSk7XG5cbi8qXG4gKiBcbiAqL1xuanNmb3JjZS5TdHJlYW1pbmdFeHRlbnNpb24gPSBTdHJlYW1pbmdFeHRlbnNpb247XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHJhd0FzYXAgcHJvdmlkZXMgZXZlcnl0aGluZyB3ZSBuZWVkIGV4Y2VwdCBleGNlcHRpb24gbWFuYWdlbWVudC5cbnZhciByYXdBc2FwID0gcmVxdWlyZShcIi4vcmF3XCIpO1xuLy8gUmF3VGFza3MgYXJlIHJlY3ljbGVkIHRvIHJlZHVjZSBHQyBjaHVybi5cbnZhciBmcmVlVGFza3MgPSBbXTtcbi8vIFdlIHF1ZXVlIGVycm9ycyB0byBlbnN1cmUgdGhleSBhcmUgdGhyb3duIGluIHJpZ2h0IG9yZGVyIChGSUZPKS5cbi8vIEFycmF5LWFzLXF1ZXVlIGlzIGdvb2QgZW5vdWdoIGhlcmUsIHNpbmNlIHdlIGFyZSBqdXN0IGRlYWxpbmcgd2l0aCBleGNlcHRpb25zLlxudmFyIHBlbmRpbmdFcnJvcnMgPSBbXTtcbnZhciByZXF1ZXN0RXJyb3JUaHJvdyA9IHJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKHRocm93Rmlyc3RFcnJvcik7XG5cbmZ1bmN0aW9uIHRocm93Rmlyc3RFcnJvcigpIHtcbiAgICBpZiAocGVuZGluZ0Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgcGVuZGluZ0Vycm9ycy5zaGlmdCgpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxscyBhIHRhc2sgYXMgc29vbiBhcyBwb3NzaWJsZSBhZnRlciByZXR1cm5pbmcsIGluIGl0cyBvd24gZXZlbnQsIHdpdGggcHJpb3JpdHlcbiAqIG92ZXIgb3RoZXIgZXZlbnRzIGxpa2UgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZXBhaW50LiBBbiBlcnJvciB0aHJvd24gZnJvbSBhblxuICogZXZlbnQgd2lsbCBub3QgaW50ZXJydXB0LCBub3IgZXZlbiBzdWJzdGFudGlhbGx5IHNsb3cgZG93biB0aGUgcHJvY2Vzc2luZyBvZlxuICogb3RoZXIgZXZlbnRzLCBidXQgd2lsbCBiZSByYXRoZXIgcG9zdHBvbmVkIHRvIGEgbG93ZXIgcHJpb3JpdHkgZXZlbnQuXG4gKiBAcGFyYW0ge3tjYWxsfX0gdGFzayBBIGNhbGxhYmxlIG9iamVjdCwgdHlwaWNhbGx5IGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzYXA7XG5mdW5jdGlvbiBhc2FwKHRhc2spIHtcbiAgICB2YXIgcmF3VGFzaztcbiAgICBpZiAoZnJlZVRhc2tzLmxlbmd0aCkge1xuICAgICAgICByYXdUYXNrID0gZnJlZVRhc2tzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1Rhc2sgPSBuZXcgUmF3VGFzaygpO1xuICAgIH1cbiAgICByYXdUYXNrLnRhc2sgPSB0YXNrO1xuICAgIHJhd0FzYXAocmF3VGFzayk7XG59XG5cbi8vIFdlIHdyYXAgdGFza3Mgd2l0aCByZWN5Y2xhYmxlIHRhc2sgb2JqZWN0cy4gIEEgdGFzayBvYmplY3QgaW1wbGVtZW50c1xuLy8gYGNhbGxgLCBqdXN0IGxpa2UgYSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJhd1Rhc2soKSB7XG4gICAgdGhpcy50YXNrID0gbnVsbDtcbn1cblxuLy8gVGhlIHNvbGUgcHVycG9zZSBvZiB3cmFwcGluZyB0aGUgdGFzayBpcyB0byBjYXRjaCB0aGUgZXhjZXB0aW9uIGFuZCByZWN5Y2xlXG4vLyB0aGUgdGFzayBvYmplY3QgYWZ0ZXIgaXRzIHNpbmdsZSB1c2UuXG5SYXdUYXNrLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMudGFzay5jYWxsKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGFzYXAub25lcnJvcikge1xuICAgICAgICAgICAgLy8gVGhpcyBob29rIGV4aXN0cyBwdXJlbHkgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAgICAgICAgICAvLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXRcbiAgICAgICAgICAgIC8vIGRlcGVuZHMgb24gaXRzIGV4aXN0ZW5jZS5cbiAgICAgICAgICAgIGFzYXAub25lcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbiBhIHdlYiBicm93c2VyLCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuIEhvd2V2ZXIsIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBzbG93aW5nIGRvd24gdGhlIHF1ZXVlIG9mIHBlbmRpbmcgdGFza3MsIHdlIHJldGhyb3cgdGhlIGVycm9yIGluIGFcbiAgICAgICAgICAgIC8vIGxvd2VyIHByaW9yaXR5IHR1cm4uXG4gICAgICAgICAgICBwZW5kaW5nRXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgcmVxdWVzdEVycm9yVGhyb3coKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XG4gICAgICAgIGZyZWVUYXNrc1tmcmVlVGFza3MubGVuZ3RoXSA9IHRoaXM7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgSU8sIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVkcmF3XG4vLyBldmVudHMgaW4gYnJvd3NlcnMuXG4vL1xuLy8gQW4gZXhjZXB0aW9uIHRocm93biBieSBhIHRhc2sgd2lsbCBwZXJtYW5lbnRseSBpbnRlcnJ1cHQgdGhlIHByb2Nlc3Npbmcgb2Zcbi8vIHN1YnNlcXVlbnQgdGFza3MuIFRoZSBoaWdoZXIgbGV2ZWwgYGFzYXBgIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93biBieSBhIHRhc2ssIHRoYXQgdGhlIHRhc2sgcXVldWUgd2lsbCBjb250aW51ZSBmbHVzaGluZyBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZSwgYnV0IGlmIHlvdSB1c2UgYHJhd0FzYXBgIGRpcmVjdGx5LCB5b3UgYXJlIHJlc3BvbnNpYmxlIHRvXG4vLyBlaXRoZXIgZW5zdXJlIHRoYXQgbm8gZXhjZXB0aW9ucyBhcmUgdGhyb3duIGZyb20geW91ciB0YXNrLCBvciB0byBtYW51YWxseVxuLy8gY2FsbCBgcmF3QXNhcC5yZXF1ZXN0Rmx1c2hgIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5tb2R1bGUuZXhwb3J0cyA9IHJhd0FzYXA7XG5mdW5jdGlvbiByYXdBc2FwKHRhc2spIHtcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXF1ZXN0Rmx1c2goKTtcbiAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFcXVpdmFsZW50IHRvIHB1c2gsIGJ1dCBhdm9pZHMgYSBmdW5jdGlvbiBjYWxsLlxuICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSB0YXNrO1xufVxuXG52YXIgcXVldWUgPSBbXTtcbi8vIE9uY2UgYSBmbHVzaCBoYXMgYmVlbiByZXF1ZXN0ZWQsIG5vIGZ1cnRoZXIgY2FsbHMgdG8gYHJlcXVlc3RGbHVzaGAgYXJlXG4vLyBuZWNlc3NhcnkgdW50aWwgdGhlIG5leHQgYGZsdXNoYCBjb21wbGV0ZXMuXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIG1ldGhvZCB0aGF0IGF0dGVtcHRzIHRvIGtpY2tcbi8vIG9mZiBhIGBmbHVzaGAgZXZlbnQgYXMgcXVpY2tseSBhcyBwb3NzaWJsZS4gYGZsdXNoYCB3aWxsIGF0dGVtcHQgdG8gZXhoYXVzdFxuLy8gdGhlIGV2ZW50IHF1ZXVlIGJlZm9yZSB5aWVsZGluZyB0byB0aGUgYnJvd3NlcidzIG93biBldmVudCBsb29wLlxudmFyIHJlcXVlc3RGbHVzaDtcbi8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbmV4dCB0YXNrIHRvIGV4ZWN1dGUgaW4gdGhlIHRhc2sgcXVldWUuIFRoaXMgaXNcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNhbGxzIHRvIGBmbHVzaGAgc28gdGhhdCBpdCBjYW4gYmUgcmVzdW1lZCBpZlxuLy8gYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24uXG52YXIgaW5kZXggPSAwO1xuLy8gSWYgYSB0YXNrIHNjaGVkdWxlcyBhZGRpdGlvbmFsIHRhc2tzIHJlY3Vyc2l2ZWx5LCB0aGUgdGFzayBxdWV1ZSBjYW4gZ3Jvd1xuLy8gdW5ib3VuZGVkLiBUbyBwcmV2ZW50IG1lbW9yeSBleGhhdXN0aW9uLCB0aGUgdGFzayBxdWV1ZSB3aWxsIHBlcmlvZGljYWxseVxuLy8gdHJ1bmNhdGUgYWxyZWFkeS1jb21wbGV0ZWQgdGFza3MuXG52YXIgY2FwYWNpdHkgPSAxMDI0O1xuXG4vLyBUaGUgZmx1c2ggZnVuY3Rpb24gcHJvY2Vzc2VzIGFsbCB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzY2hlZHVsZWQgd2l0aFxuLy8gYHJhd0FzYXBgIHVubGVzcyBhbmQgdW50aWwgb25lIG9mIHRob3NlIHRhc2tzIHRocm93cyBhbiBleGNlcHRpb24uXG4vLyBJZiBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYGZsdXNoYCBlbnN1cmVzIHRoYXQgaXRzIHN0YXRlIHdpbGwgcmVtYWluXG4vLyBjb25zaXN0ZW50IGFuZCB3aWxsIHJlc3VtZSB3aGVyZSBpdCBsZWZ0IG9mZiB3aGVuIGNhbGxlZCBhZ2Fpbi5cbi8vIEhvd2V2ZXIsIGBmbHVzaGAgZG9lcyBub3QgbWFrZSBhbnkgYXJyYW5nZW1lbnRzIHRvIGJlIGNhbGxlZCBhZ2FpbiBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93bi5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlIChpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIGluZGV4IGJlZm9yZSBjYWxsaW5nIHRoZSB0YXNrLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSB3aWxsXG4gICAgICAgIC8vIGJlZ2luIGZsdXNoaW5nIG9uIHRoZSBuZXh0IHRhc2sgdGhlIHRhc2sgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgcXVldWVbY3VycmVudEluZGV4XS5jYWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgbGVha2luZyBtZW1vcnkgZm9yIGxvbmcgY2hhaW5zIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBgYXNhcGAuXG4gICAgICAgIC8vIElmIHdlIGNhbGwgYGFzYXBgIHdpdGhpbiB0YXNrcyBzY2hlZHVsZWQgYnkgYGFzYXBgLCB0aGUgcXVldWUgd2lsbFxuICAgICAgICAvLyBncm93LCBidXQgdG8gYXZvaWQgYW4gTyhuKSB3YWxrIGZvciBldmVyeSB0YXNrIHdlIGV4ZWN1dGUsIHdlIGRvbid0XG4gICAgICAgIC8vIHNoaWZ0IHRhc2tzIG9mZiB0aGUgcXVldWUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZXhlY3V0ZWQuXG4gICAgICAgIC8vIEluc3RlYWQsIHdlIHBlcmlvZGljYWxseSBzaGlmdCAxMDI0IHRhc2tzIG9mZiB0aGUgcXVldWUuXG4gICAgICAgIGlmIChpbmRleCA+IGNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBzaGlmdCBhbGwgdmFsdWVzIHN0YXJ0aW5nIGF0IHRoZSBpbmRleCBiYWNrIHRvIHRoZVxuICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSBpbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUubGVuZ3RoIC09IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaW5kZXggPSAwO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGltcGxlbWVudGVkIHVzaW5nIGEgc3RyYXRlZ3kgYmFzZWQgb24gZGF0YSBjb2xsZWN0ZWQgZnJvbVxuLy8gZXZlcnkgYXZhaWxhYmxlIFNhdWNlTGFicyBTZWxlbml1bSB3ZWIgZHJpdmVyIHdvcmtlciBhdCB0aW1lIG9mIHdyaXRpbmcuXG4vLyBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xbUctNVVZR3VwNXF4R2RFTVdraFA2QldDejA1M05VYjJFMVFvVVRVMTZ1QS9lZGl0I2dpZD03ODM3MjQ1OTNcblxuLy8gU2FmYXJpIDYgYW5kIDYuMSBmb3IgZGVza3RvcCwgaVBhZCwgYW5kIGlQaG9uZSBhcmUgdGhlIG9ubHkgYnJvd3NlcnMgdGhhdFxuLy8gaGF2ZSBXZWJLaXRNdXRhdGlvbk9ic2VydmVyIGJ1dCBub3QgdW4tcHJlZml4ZWQgTXV0YXRpb25PYnNlcnZlci5cbi8vIE11c3QgdXNlIGBnbG9iYWxgIG9yIGBzZWxmYCBpbnN0ZWFkIG9mIGB3aW5kb3dgIHRvIHdvcmsgaW4gYm90aCBmcmFtZXMgYW5kIHdlYlxuLy8gd29ya2Vycy4gYGdsb2JhbGAgaXMgYSBwcm92aXNpb24gb2YgQnJvd3NlcmlmeSwgTXIsIE1ycywgb3IgTW9wLlxuXG4vKiBnbG9iYWxzIHNlbGYgKi9cbnZhciBzY29wZSA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiBzZWxmO1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gc2NvcGUuTXV0YXRpb25PYnNlcnZlciB8fCBzY29wZS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG4vLyBNdXRhdGlvbk9ic2VydmVycyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBoYXZlIGhpZ2ggcHJpb3JpdHkgYW5kIHdvcmtcbi8vIHJlbGlhYmx5IGV2ZXJ5d2hlcmUgdGhleSBhcmUgaW1wbGVtZW50ZWQuXG4vLyBUaGV5IGFyZSBpbXBsZW1lbnRlZCBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzLlxuLy9cbi8vIC0gQW5kcm9pZCA0LTQuM1xuLy8gLSBDaHJvbWUgMjYtMzRcbi8vIC0gRmlyZWZveCAxNC0yOVxuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciAxMVxuLy8gLSBpUGFkIFNhZmFyaSA2LTcuMVxuLy8gLSBpUGhvbmUgU2FmYXJpIDctNy4xXG4vLyAtIFNhZmFyaSA2LTdcbmlmICh0eXBlb2YgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcblxuLy8gTWVzc2FnZUNoYW5uZWxzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGdpdmUgZGlyZWN0IGFjY2VzcyB0byB0aGUgSFRNTFxuLy8gdGFzayBxdWV1ZSwgYXJlIGltcGxlbWVudGVkIGluIEludGVybmV0IEV4cGxvcmVyIDEwLCBTYWZhcmkgNS4wLTEsIGFuZCBPcGVyYVxuLy8gMTEtMTIsIGFuZCBpbiB3ZWIgd29ya2VycyBpbiBtYW55IGVuZ2luZXMuXG4vLyBBbHRob3VnaCBtZXNzYWdlIGNoYW5uZWxzIHlpZWxkIHRvIGFueSBxdWV1ZWQgcmVuZGVyaW5nIGFuZCBJTyB0YXNrcywgdGhleVxuLy8gd291bGQgYmUgYmV0dGVyIHRoYW4gaW1wb3NpbmcgdGhlIDRtcyBkZWxheSBvZiB0aW1lcnMuXG4vLyBIb3dldmVyLCB0aGV5IGRvIG5vdCB3b3JrIHJlbGlhYmx5IGluIEludGVybmV0IEV4cGxvcmVyIG9yIFNhZmFyaS5cblxuLy8gSW50ZXJuZXQgRXhwbG9yZXIgMTAgaXMgdGhlIG9ubHkgYnJvd3NlciB0aGF0IGhhcyBzZXRJbW1lZGlhdGUgYnV0IGRvZXNcbi8vIG5vdCBoYXZlIE11dGF0aW9uT2JzZXJ2ZXJzLlxuLy8gQWx0aG91Z2ggc2V0SW1tZWRpYXRlIHlpZWxkcyB0byB0aGUgYnJvd3NlcidzIHJlbmRlcmVyLCBpdCB3b3VsZCBiZVxuLy8gcHJlZmVycmFibGUgdG8gZmFsbGluZyBiYWNrIHRvIHNldFRpbWVvdXQgc2luY2UgaXQgZG9lcyBub3QgaGF2ZVxuLy8gdGhlIG1pbmltdW0gNG1zIHBlbmFsdHkuXG4vLyBVbmZvcnR1bmF0ZWx5IHRoZXJlIGFwcGVhcnMgdG8gYmUgYSBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAgTW9iaWxlIChhbmRcbi8vIERlc2t0b3AgdG8gYSBsZXNzZXIgZXh0ZW50KSB0aGF0IHJlbmRlcnMgYm90aCBzZXRJbW1lZGlhdGUgYW5kXG4vLyBNZXNzYWdlQ2hhbm5lbCB1c2VsZXNzIGZvciB0aGUgcHVycG9zZXMgb2YgQVNBUC5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9pc3N1ZXMvMzk2XG5cbi8vIFRpbWVycyBhcmUgaW1wbGVtZW50ZWQgdW5pdmVyc2FsbHkuXG4vLyBXZSBmYWxsIGJhY2sgdG8gdGltZXJzIGluIHdvcmtlcnMgaW4gbW9zdCBlbmdpbmVzLCBhbmQgaW4gZm9yZWdyb3VuZFxuLy8gY29udGV4dHMgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vycy5cbi8vIEhvd2V2ZXIsIG5vdGUgdGhhdCBldmVuIHRoaXMgc2ltcGxlIGNhc2UgcmVxdWlyZXMgbnVhbmNlcyB0byBvcGVyYXRlIGluIGFcbi8vIGJyb2FkIHNwZWN0cnVtIG9mIGJyb3dzZXJzLlxuLy9cbi8vIC0gRmlyZWZveCAzLTEzXG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDYtOVxuLy8gLSBpUGFkIFNhZmFyaSA0LjNcbi8vIC0gTHlueCAyLjguN1xufSBlbHNlIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoZmx1c2gpO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCByZXF1ZXN0cyB0aGF0IHRoZSBoaWdoIHByaW9yaXR5IGV2ZW50IHF1ZXVlIGJlIGZsdXNoZWQgYXNcbi8vIHNvb24gYXMgcG9zc2libGUuXG4vLyBUaGlzIGlzIHVzZWZ1bCB0byBwcmV2ZW50IGFuIGVycm9yIHRocm93biBpbiBhIHRhc2sgZnJvbSBzdGFsbGluZyB0aGUgZXZlbnRcbi8vIHF1ZXVlIGlmIHRoZSBleGNlcHRpb24gaGFuZGxlZCBieSBOb2RlLmpz4oCZc1xuLy8gYHByb2Nlc3Mub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiKWAgb3IgYnkgYSBkb21haW4uXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcblxuLy8gVG8gcmVxdWVzdCBhIGhpZ2ggcHJpb3JpdHkgZXZlbnQsIHdlIGluZHVjZSBhIG11dGF0aW9uIG9ic2VydmVyIGJ5IHRvZ2dsaW5nXG4vLyB0aGUgdGV4dCBvZiBhIHRleHQgbm9kZSBiZXR3ZWVuIFwiMVwiIGFuZCBcIi0xXCIuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjaykge1xuICAgIHZhciB0b2dnbGUgPSAxO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICB0b2dnbGUgPSAtdG9nZ2xlO1xuICAgICAgICBub2RlLmRhdGEgPSB0b2dnbGU7XG4gICAgfTtcbn1cblxuLy8gVGhlIG1lc3NhZ2UgY2hhbm5lbCB0ZWNobmlxdWUgd2FzIGRpc2NvdmVyZWQgYnkgTWFsdGUgVWJsIGFuZCB3YXMgdGhlXG4vLyBvcmlnaW5hbCBmb3VuZGF0aW9uIGZvciB0aGlzIGxpYnJhcnkuXG4vLyBodHRwOi8vd3d3Lm5vbmJsb2NraW5nLmlvLzIwMTEvMDYvd2luZG93bmV4dHRpY2suaHRtbFxuXG4vLyBTYWZhcmkgNi4wLjUgKGF0IGxlYXN0KSBpbnRlcm1pdHRlbnRseSBmYWlscyB0byBjcmVhdGUgbWVzc2FnZSBwb3J0cyBvbiBhXG4vLyBwYWdlJ3MgZmlyc3QgbG9hZC4gVGhhbmtmdWxseSwgdGhpcyB2ZXJzaW9uIG9mIFNhZmFyaSBzdXBwb3J0c1xuLy8gTXV0YXRpb25PYnNlcnZlcnMsIHNvIHdlIGRvbid0IG5lZWQgdG8gZmFsbCBiYWNrIGluIHRoYXQgY2FzZS5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU1lc3NhZ2VDaGFubmVsKGNhbGxiYWNrKSB7XG4vLyAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbi8vICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGNhbGxiYWNrO1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBGb3IgcmVhc29ucyBleHBsYWluZWQgYWJvdmUsIHdlIGFyZSBhbHNvIHVuYWJsZSB0byB1c2UgYHNldEltbWVkaWF0ZWBcbi8vIHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzLlxuLy8gRXZlbiBpZiB3ZSB3ZXJlLCB0aGVyZSBpcyBhbm90aGVyIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbi8vIEl0IGlzIG5vdCBzdWZmaWNpZW50IHRvIGFzc2lnbiBgc2V0SW1tZWRpYXRlYCB0byBgcmVxdWVzdEZsdXNoYCBiZWNhdXNlXG4vLyBgc2V0SW1tZWRpYXRlYCBtdXN0IGJlIGNhbGxlZCAqYnkgbmFtZSogYW5kIHRoZXJlZm9yZSBtdXN0IGJlIHdyYXBwZWQgaW4gYVxuLy8gY2xvc3VyZS5cbi8vIE5ldmVyIGZvcmdldC5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgc2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBTYWZhcmkgNi4wIGhhcyBhIHByb2JsZW0gd2hlcmUgdGltZXJzIHdpbGwgZ2V0IGxvc3Qgd2hpbGUgdGhlIHVzZXIgaXNcbi8vIHNjcm9sbGluZy4gVGhpcyBwcm9ibGVtIGRvZXMgbm90IGltcGFjdCBBU0FQIGJlY2F1c2UgU2FmYXJpIDYuMCBzdXBwb3J0c1xuLy8gbXV0YXRpb24gb2JzZXJ2ZXJzLCBzbyB0aGF0IGltcGxlbWVudGF0aW9uIGlzIHVzZWQgaW5zdGVhZC5cbi8vIEhvd2V2ZXIsIGlmIHdlIGV2ZXIgZWxlY3QgdG8gdXNlIHRpbWVycyBpbiBTYWZhcmksIHRoZSBwcmV2YWxlbnQgd29yay1hcm91bmRcbi8vIGlzIHRvIGFkZCBhIHNjcm9sbCBldmVudCBsaXN0ZW5lciB0aGF0IGNhbGxzIGZvciBhIGZsdXNoLlxuXG4vLyBgc2V0VGltZW91dGAgZG9lcyBub3QgY2FsbCB0aGUgcGFzc2VkIGNhbGxiYWNrIGlmIHRoZSBkZWxheSBpcyBsZXNzIHRoYW5cbi8vIGFwcHJveGltYXRlbHkgNyBpbiB3ZWIgd29ya2VycyBpbiBGaXJlZm94IDggdGhyb3VnaCAxOCwgYW5kIHNvbWV0aW1lcyBub3Rcbi8vIGV2ZW4gdGhlbi5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICAvLyBXZSBkaXNwYXRjaCBhIHRpbWVvdXQgd2l0aCBhIHNwZWNpZmllZCBkZWxheSBvZiAwIGZvciBlbmdpbmVzIHRoYXRcbiAgICAgICAgLy8gY2FuIHJlbGlhYmx5IGFjY29tbW9kYXRlIHRoYXQgcmVxdWVzdC4gVGhpcyB3aWxsIHVzdWFsbHkgYmUgc25hcHBlZFxuICAgICAgICAvLyB0byBhIDQgbWlsaXNlY29uZCBkZWxheSwgYnV0IG9uY2Ugd2UncmUgZmx1c2hpbmcsIHRoZXJlJ3Mgbm8gZGVsYXlcbiAgICAgICAgLy8gYmV0d2VlbiBldmVudHMuXG4gICAgICAgIHZhciB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChoYW5kbGVUaW1lciwgMCk7XG4gICAgICAgIC8vIEhvd2V2ZXIsIHNpbmNlIHRoaXMgdGltZXIgZ2V0cyBmcmVxdWVudGx5IGRyb3BwZWQgaW4gRmlyZWZveFxuICAgICAgICAvLyB3b3JrZXJzLCB3ZSBlbmxpc3QgYW4gaW50ZXJ2YWwgaGFuZGxlIHRoYXQgd2lsbCB0cnkgdG8gZmlyZVxuICAgICAgICAvLyBhbiBldmVudCAyMCB0aW1lcyBwZXIgc2Vjb25kIHVudGlsIGl0IHN1Y2NlZWRzLlxuICAgICAgICB2YXIgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChoYW5kbGVUaW1lciwgNTApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRpbWVyKCkge1xuICAgICAgICAgICAgLy8gV2hpY2hldmVyIHRpbWVyIHN1Y2NlZWRzIHdpbGwgY2FuY2VsIGJvdGggdGltZXJzIGFuZFxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgY2FsbGJhY2suXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBUaGlzIGlzIGZvciBgYXNhcC5qc2Agb25seS5cbi8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdCBkZXBlbmRzIG9uXG4vLyBpdHMgZXhpc3RlbmNlLlxucmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIgPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXI7XG5cbi8vIEFTQVAgd2FzIG9yaWdpbmFsbHkgYSBuZXh0VGljayBzaGltIGluY2x1ZGVkIGluIFEuIFRoaXMgd2FzIGZhY3RvcmVkIG91dFxuLy8gaW50byB0aGlzIEFTQVAgcGFja2FnZS4gSXQgd2FzIGxhdGVyIGFkYXB0ZWQgdG8gUlNWUCB3aGljaCBtYWRlIGZ1cnRoZXJcbi8vIGFtZW5kbWVudHMuIFRoZXNlIGRlY2lzaW9ucywgcGFydGljdWxhcmx5IHRvIG1hcmdpbmFsaXplIE1lc3NhZ2VDaGFubmVsIGFuZFxuLy8gdG8gY2FwdHVyZSB0aGUgTXV0YXRpb25PYnNlcnZlciBpbXBsZW1lbnRhdGlvbiBpbiBhIGNsb3N1cmUsIHdlcmUgaW50ZWdyYXRlZFxuLy8gYmFjayBpbnRvIEFTQVAgcHJvcGVyLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL2NkZGY3MjMyNTQ2YTljZjg1ODUyNGI3NWNkZTZmOWVkZjcyNjIwYTcvbGliL3JzdnAvYXNhcC5qc1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi91dGlsL2NvbnN0YW50cycpLFxuICAgIExvZ2dpbmcgICA9IHJlcXVpcmUoJy4vbWl4aW5zL2xvZ2dpbmcnKTtcblxudmFyIEZheWUgPSB7XG4gIFZFUlNJT046ICAgIGNvbnN0YW50cy5WRVJTSU9OLFxuXG4gIENsaWVudDogICAgIHJlcXVpcmUoJy4vcHJvdG9jb2wvY2xpZW50JyksXG4gIFNjaGVkdWxlcjogIHJlcXVpcmUoJy4vcHJvdG9jb2wvc2NoZWR1bGVyJylcbn07XG5cbkxvZ2dpbmcud3JhcHBlciA9IEZheWU7XG5cbm1vZHVsZS5leHBvcnRzID0gRmF5ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFByb21pc2UgICA9IHJlcXVpcmUoJy4uL3V0aWwvcHJvbWlzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGhlbjogZnVuY3Rpb24oY2FsbGJhY2ssIGVycmJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCF0aGlzLl9wcm9taXNlKVxuICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgc2VsZi5fcmVqZWN0ICA9IHJlamVjdDtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKGNhbGxiYWNrLCBlcnJiYWNrKTtcbiAgfSxcblxuICBjYWxsYmFjazogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdmFsdWUpIH0pO1xuICB9LFxuXG4gIGVycmJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBmdW5jdGlvbihyZWFzb24pIHsgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZWFzb24pIH0pO1xuICB9LFxuXG4gIHRpbWVvdXQ6IGZ1bmN0aW9uKHNlY29uZHMsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLnRoZW4oKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fdGltZXIgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuX3JlamVjdChtZXNzYWdlKTtcbiAgICB9LCBzZWNvbmRzICogMTAwMCk7XG4gIH0sXG5cbiAgc2V0RGVmZXJyZWRTdGF0dXM6IGZ1bmN0aW9uKHN0YXR1cywgdmFsdWUpIHtcbiAgICBpZiAodGhpcy5fdGltZXIpIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuXG4gICAgdGhpcy50aGVuKCk7XG5cbiAgICBpZiAoc3RhdHVzID09PSAnc3VjY2VlZGVkJylcbiAgICAgIHRoaXMuX3Jlc29sdmUodmFsdWUpO1xuICAgIGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2ZhaWxlZCcpXG4gICAgICB0aGlzLl9yZWplY3QodmFsdWUpO1xuICAgIGVsc2VcbiAgICAgIGRlbGV0ZSB0aGlzLl9wcm9taXNlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9KU09OID0gcmVxdWlyZSgnLi4vdXRpbC90b19qc29uJyk7XG5cbnZhciBMb2dnaW5nID0ge1xuICBMT0dfTEVWRUxTOiB7XG4gICAgZmF0YWw6ICA0LFxuICAgIGVycm9yOiAgMyxcbiAgICB3YXJuOiAgIDIsXG4gICAgaW5mbzogICAxLFxuICAgIGRlYnVnOiAgMFxuICB9LFxuXG4gIHdyaXRlTG9nOiBmdW5jdGlvbihtZXNzYWdlQXJncywgbGV2ZWwpIHtcbiAgICB2YXIgbG9nZ2VyID0gTG9nZ2luZy5sb2dnZXIgfHwgKExvZ2dpbmcud3JhcHBlciB8fCBMb2dnaW5nKS5sb2dnZXI7XG4gICAgaWYgKCFsb2dnZXIpIHJldHVybjtcblxuICAgIHZhciBhcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobWVzc2FnZUFyZ3MpLFxuICAgICAgICBiYW5uZXIgPSAnW0ZheWUnLFxuICAgICAgICBrbGFzcyAgPSB0aGlzLmNsYXNzTmFtZSxcblxuICAgICAgICBtZXNzYWdlID0gYXJncy5zaGlmdCgpLnJlcGxhY2UoL1xcPy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRvSlNPTihhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tPYmplY3RdJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgaWYgKGtsYXNzKSBiYW5uZXIgKz0gJy4nICsga2xhc3M7XG4gICAgYmFubmVyICs9ICddICc7XG5cbiAgICBpZiAodHlwZW9mIGxvZ2dlcltsZXZlbF0gPT09ICdmdW5jdGlvbicpXG4gICAgICBsb2dnZXJbbGV2ZWxdKGJhbm5lciArIG1lc3NhZ2UpO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBsb2dnZXIgPT09ICdmdW5jdGlvbicpXG4gICAgICBsb2dnZXIoYmFubmVyICsgbWVzc2FnZSk7XG4gIH1cbn07XG5cbmZvciAodmFyIGtleSBpbiBMb2dnaW5nLkxPR19MRVZFTFMpXG4gIChmdW5jdGlvbihsZXZlbCkge1xuICAgIExvZ2dpbmdbbGV2ZWxdID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLndyaXRlTG9nKGFyZ3VtZW50cywgbGV2ZWwpO1xuICAgIH07XG4gIH0pKGtleSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nZ2luZztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi4vdXRpbC9ldmVudF9lbWl0dGVyJyk7XG5cbnZhciBQdWJsaXNoZXIgPSB7XG4gIGNvdW50TGlzdGVuZXJzOiBmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMoZXZlbnRUeXBlKS5sZW5ndGg7XG4gIH0sXG5cbiAgYmluZDogZnVuY3Rpb24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgIHZhciBzbGljZSAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24oKSB7IGxpc3RlbmVyLmFwcGx5KGNvbnRleHQsIHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgfTtcblxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChbZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCwgaGFuZGxlcl0pO1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH0sXG5cbiAgdW5iaW5kOiBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IFtdO1xuICAgIHZhciBuID0gdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCwgdHVwbGU7XG5cbiAgICB3aGlsZSAobi0tKSB7XG4gICAgICB0dXBsZSA9IHRoaXMuX2xpc3RlbmVyc1tuXTtcbiAgICAgIGlmICh0dXBsZVswXSAhPT0gZXZlbnRUeXBlKSBjb250aW51ZTtcbiAgICAgIGlmIChsaXN0ZW5lciAmJiAodHVwbGVbMV0gIT09IGxpc3RlbmVyIHx8IHR1cGxlWzJdICE9PSBjb250ZXh0KSkgY29udGludWU7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKG4sIDEpO1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudFR5cGUsIHR1cGxlWzNdKTtcbiAgICB9XG4gIH1cbn07XG5cbmFzc2lnbihQdWJsaXNoZXIsIEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuUHVibGlzaGVyLnRyaWdnZXIgPSBQdWJsaXNoZXIuZW1pdDtcblxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGRUaW1lb3V0OiBmdW5jdGlvbihuYW1lLCBkZWxheSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl90aW1lb3V0cyA9IHRoaXMuX3RpbWVvdXRzIHx8IHt9O1xuICAgIGlmICh0aGlzLl90aW1lb3V0cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgcmV0dXJuO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl90aW1lb3V0c1tuYW1lXSA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHNlbGYuX3RpbWVvdXRzW25hbWVdO1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0KTtcbiAgICB9LCAxMDAwICogZGVsYXkpO1xuICB9LFxuXG4gIHJlbW92ZVRpbWVvdXQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB0aGlzLl90aW1lb3V0cyA9IHRoaXMuX3RpbWVvdXRzIHx8IHt9O1xuICAgIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dHNbbmFtZV07XG4gICAgaWYgKCF0aW1lb3V0KSByZXR1cm47XG4gICAgZ2xvYmFsLmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBkZWxldGUgdGhpcy5fdGltZW91dHNbbmFtZV07XG4gIH0sXG5cbiAgcmVtb3ZlQWxsVGltZW91dHM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3RpbWVvdXRzID0gdGhpcy5fdGltZW91dHMgfHwge307XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLl90aW1lb3V0cykgdGhpcy5yZW1vdmVUaW1lb3V0KG5hbWUpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIGFzc2lnbiAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgUHVibGlzaGVyID0gcmVxdWlyZSgnLi4vbWl4aW5zL3B1Ymxpc2hlcicpLFxuICAgIEdyYW1tYXIgICA9IHJlcXVpcmUoJy4vZ3JhbW1hcicpO1xuXG52YXIgQ2hhbm5lbCA9IENsYXNzKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHRoaXMuaWQgPSB0aGlzLm5hbWUgPSBuYW1lO1xuICB9LFxuXG4gIHB1c2g6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICB0aGlzLnRyaWdnZXIoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcbiAgfSxcblxuICBpc1VudXNlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRMaXN0ZW5lcnMoJ21lc3NhZ2UnKSA9PT0gMDtcbiAgfVxufSk7XG5cbmFzc2lnbihDaGFubmVsLnByb3RvdHlwZSwgUHVibGlzaGVyKTtcblxuYXNzaWduKENoYW5uZWwsIHtcbiAgSEFORFNIQUtFOiAgICAnL21ldGEvaGFuZHNoYWtlJyxcbiAgQ09OTkVDVDogICAgICAnL21ldGEvY29ubmVjdCcsXG4gIFNVQlNDUklCRTogICAgJy9tZXRhL3N1YnNjcmliZScsXG4gIFVOU1VCU0NSSUJFOiAgJy9tZXRhL3Vuc3Vic2NyaWJlJyxcbiAgRElTQ09OTkVDVDogICAnL21ldGEvZGlzY29ubmVjdCcsXG5cbiAgTUVUQTogICAgICAgICAnbWV0YScsXG4gIFNFUlZJQ0U6ICAgICAgJ3NlcnZpY2UnLFxuXG4gIGV4cGFuZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBzZWdtZW50cyA9IHRoaXMucGFyc2UobmFtZSksXG4gICAgICAgIGNoYW5uZWxzID0gWycvKionLCBuYW1lXTtcblxuICAgIHZhciBjb3B5ID0gc2VnbWVudHMuc2xpY2UoKTtcbiAgICBjb3B5W2NvcHkubGVuZ3RoIC0gMV0gPSAnKic7XG4gICAgY2hhbm5lbHMucHVzaCh0aGlzLnVucGFyc2UoY29weSkpO1xuXG4gICAgZm9yICh2YXIgaSA9IDEsIG4gPSBzZWdtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGNvcHkgPSBzZWdtZW50cy5zbGljZSgwLCBpKTtcbiAgICAgIGNvcHkucHVzaCgnKionKTtcbiAgICAgIGNoYW5uZWxzLnB1c2godGhpcy51bnBhcnNlKGNvcHkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbHM7XG4gIH0sXG5cbiAgaXNWYWxpZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBHcmFtbWFyLkNIQU5ORUxfTkFNRS50ZXN0KG5hbWUpIHx8XG4gICAgICAgICAgIEdyYW1tYXIuQ0hBTk5FTF9QQVRURVJOLnRlc3QobmFtZSk7XG4gIH0sXG5cbiAgcGFyc2U6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChuYW1lKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG5hbWUuc3BsaXQoJy8nKS5zbGljZSgxKTtcbiAgfSxcblxuICB1bnBhcnNlOiBmdW5jdGlvbihzZWdtZW50cykge1xuICAgIHJldHVybiAnLycgKyBzZWdtZW50cy5qb2luKCcvJyk7XG4gIH0sXG5cbiAgaXNNZXRhOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHNlZ21lbnRzID0gdGhpcy5wYXJzZShuYW1lKTtcbiAgICByZXR1cm4gc2VnbWVudHMgPyAoc2VnbWVudHNbMF0gPT09IHRoaXMuTUVUQSkgOiBudWxsO1xuICB9LFxuXG4gIGlzU2VydmljZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBzZWdtZW50cyA9IHRoaXMucGFyc2UobmFtZSk7XG4gICAgcmV0dXJuIHNlZ21lbnRzID8gKHNlZ21lbnRzWzBdID09PSB0aGlzLlNFUlZJQ0UpIDogbnVsbDtcbiAgfSxcblxuICBpc1N1YnNjcmliYWJsZTogZnVuY3Rpb24obmFtZSkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKG5hbWUpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gIXRoaXMuaXNNZXRhKG5hbWUpICYmICF0aGlzLmlzU2VydmljZShuYW1lKTtcbiAgfSxcblxuICBTZXQ6IENsYXNzKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgfSxcblxuICAgIGdldEtleXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9jaGFubmVscykga2V5cy5wdXNoKGtleSk7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBkZWxldGUgdGhpcy5fY2hhbm5lbHNbbmFtZV07XG4gICAgfSxcblxuICAgIGhhc1N1YnNjcmlwdGlvbjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIH0sXG5cbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKG5hbWVzLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgIHZhciBuYW1lO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBuYW1lcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICB2YXIgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW25hbWVdID0gdGhpcy5fY2hhbm5lbHNbbmFtZV0gfHwgbmV3IENoYW5uZWwobmFtZSk7XG4gICAgICAgIGNoYW5uZWwuYmluZCgnbWVzc2FnZScsIHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihuYW1lLCBzdWJzY3JpcHRpb24pIHtcbiAgICAgIHZhciBjaGFubmVsID0gdGhpcy5fY2hhbm5lbHNbbmFtZV07XG4gICAgICBpZiAoIWNoYW5uZWwpIHJldHVybiBmYWxzZTtcbiAgICAgIGNoYW5uZWwudW5iaW5kKCdtZXNzYWdlJywgc3Vic2NyaXB0aW9uKTtcblxuICAgICAgaWYgKGNoYW5uZWwuaXNVbnVzZWQoKSkge1xuICAgICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRpc3RyaWJ1dGVNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICB2YXIgY2hhbm5lbHMgPSBDaGFubmVsLmV4cGFuZChtZXNzYWdlLmNoYW5uZWwpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGNoYW5uZWxzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxzW2ldXTtcbiAgICAgICAgaWYgKGNoYW5uZWwpIGNoYW5uZWwudHJpZ2dlcignbWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSlcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYW5uZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc2FwICAgICAgICAgICAgPSByZXF1aXJlKCdhc2FwJyksXG4gICAgQ2xhc3MgICAgICAgICAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIFByb21pc2UgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvcHJvbWlzZScpLFxuICAgIGFycmF5ICAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXJyYXknKSxcbiAgICBicm93c2VyICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2Jyb3dzZXInKSxcbiAgICBjb25zdGFudHMgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NvbnN0YW50cycpLFxuICAgIGFzc2lnbiAgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgdmFsaWRhdGVPcHRpb25zID0gcmVxdWlyZSgnLi4vdXRpbC92YWxpZGF0ZV9vcHRpb25zJyksXG4gICAgRGVmZXJyYWJsZSAgICAgID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlZmVycmFibGUnKSxcbiAgICBMb2dnaW5nICAgICAgICAgPSByZXF1aXJlKCcuLi9taXhpbnMvbG9nZ2luZycpLFxuICAgIFB1Ymxpc2hlciAgICAgICA9IHJlcXVpcmUoJy4uL21peGlucy9wdWJsaXNoZXInKSxcbiAgICBDaGFubmVsICAgICAgICAgPSByZXF1aXJlKCcuL2NoYW5uZWwnKSxcbiAgICBEaXNwYXRjaGVyICAgICAgPSByZXF1aXJlKCcuL2Rpc3BhdGNoZXInKSxcbiAgICBFcnJvciAgICAgICAgICAgPSByZXF1aXJlKCcuL2Vycm9yJyksXG4gICAgRXh0ZW5zaWJsZSAgICAgID0gcmVxdWlyZSgnLi9leHRlbnNpYmxlJyksXG4gICAgUHVibGljYXRpb24gICAgID0gcmVxdWlyZSgnLi9wdWJsaWNhdGlvbicpLFxuICAgIFN1YnNjcmlwdGlvbiAgICA9IHJlcXVpcmUoJy4vc3Vic2NyaXB0aW9uJyk7XG5cbnZhciBDbGllbnQgPSBDbGFzcyh7IGNsYXNzTmFtZTogJ0NsaWVudCcsXG4gIFVOQ09OTkVDVEVEOiAgMSxcbiAgQ09OTkVDVElORzogICAyLFxuICBDT05ORUNURUQ6ICAgIDMsXG4gIERJU0NPTk5FQ1RFRDogNCxcblxuICBIQU5EU0hBS0U6ICdoYW5kc2hha2UnLFxuICBSRVRSWTogICAgICdyZXRyeScsXG4gIE5PTkU6ICAgICAgJ25vbmUnLFxuXG4gIENPTk5FQ1RJT05fVElNRU9VVDogNjAsXG5cbiAgREVGQVVMVF9FTkRQT0lOVDogJy9iYXlldXgnLFxuICBJTlRFUlZBTDogICAgICAgICAwLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGVuZHBvaW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbmZvKCdOZXcgY2xpZW50IGNyZWF0ZWQgZm9yID8nLCBlbmRwb2ludCk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgWydpbnRlcnZhbCcsICd0aW1lb3V0JywgJ2VuZHBvaW50cycsICdwcm94eScsICdyZXRyeScsICdzY2hlZHVsZXInLCAnd2Vic29ja2V0RXh0ZW5zaW9ucycsICd0bHMnLCAnY2EnXSk7XG5cbiAgICB0aGlzLl9jaGFubmVscyAgID0gbmV3IENoYW5uZWwuU2V0KCk7XG4gICAgdGhpcy5fZGlzcGF0Y2hlciA9IERpc3BhdGNoZXIuY3JlYXRlKHRoaXMsIGVuZHBvaW50IHx8IHRoaXMuREVGQVVMVF9FTkRQT0lOVCwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9tZXNzYWdlSWQgPSAwO1xuICAgIHRoaXMuX3N0YXRlICAgICA9IHRoaXMuVU5DT05ORUNURUQ7XG5cbiAgICB0aGlzLl9yZXNwb25zZUNhbGxiYWNrcyA9IHt9O1xuXG4gICAgdGhpcy5fYWR2aWNlID0ge1xuICAgICAgcmVjb25uZWN0OiB0aGlzLlJFVFJZLFxuICAgICAgaW50ZXJ2YWw6ICAxMDAwICogKG9wdGlvbnMuaW50ZXJ2YWwgfHwgdGhpcy5JTlRFUlZBTCksXG4gICAgICB0aW1lb3V0OiAgIDEwMDAgKiAob3B0aW9ucy50aW1lb3V0ICB8fCB0aGlzLkNPTk5FQ1RJT05fVElNRU9VVClcbiAgICB9O1xuICAgIHRoaXMuX2Rpc3BhdGNoZXIudGltZW91dCA9IHRoaXMuX2FkdmljZS50aW1lb3V0IC8gMTAwMDtcblxuICAgIHRoaXMuX2Rpc3BhdGNoZXIuYmluZCgnbWVzc2FnZScsIHRoaXMuX3JlY2VpdmVNZXNzYWdlLCB0aGlzKTtcblxuICAgIGlmIChicm93c2VyLkV2ZW50ICYmIGdsb2JhbC5vbmJlZm9yZXVubG9hZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgYnJvd3Nlci5FdmVudC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YodGhpcy5fZGlzcGF0Y2hlci5fZGlzYWJsZWQsICdhdXRvZGlzY29ubmVjdCcpIDwgMClcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGFkZFdlYnNvY2tldEV4dGVuc2lvbjogZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuYWRkV2Vic29ja2V0RXh0ZW5zaW9uKGV4dGVuc2lvbik7XG4gIH0sXG5cbiAgZGlzYWJsZTogZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc2FibGUoZmVhdHVyZSk7XG4gIH0sXG5cbiAgc2V0SGVhZGVyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLnNldEhlYWRlcihuYW1lLCB2YWx1ZSk7XG4gIH0sXG5cbiAgLy8gUmVxdWVzdFxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWxcbiAgLy8gICAgICAgICAgICAgICAgKiB2ZXJzaW9uXG4gIC8vICAgICAgICAgICAgICAgICogc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogbWluaW11bVZlcnNpb25cbiAgLy8gICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZFxuICAvL1xuICAvLyBTdWNjZXNzIFJlc3BvbnNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGYWlsZWQgUmVzcG9uc2VcbiAgLy8gTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsICAgICAgICAgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogdmVyc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bFxuICAvLyAgICAgICAgICAgICAgICAqIHN1cHBvcnRlZENvbm5lY3Rpb25UeXBlcyAgICAgICAgICAgICAgICAgICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVzXG4gIC8vICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogYWR2aWNlXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogbWluaW11bVZlcnNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdmVyc2lvblxuICAvLyAgICAgICAgICAgICAgICAqIGFkdmljZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIG1pbmltdW1WZXJzaW9uXG4gIC8vICAgICAgICAgICAgICAgICogZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgKiBhdXRoU3VjY2Vzc2Z1bFxuICBoYW5kc2hha2U6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuX2FkdmljZS5yZWNvbm5lY3QgPT09IHRoaXMuTk9ORSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gdGhpcy5VTkNPTk5FQ1RFRCkgcmV0dXJuO1xuXG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLkNPTk5FQ1RJTkc7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5pbmZvKCdJbml0aWF0aW5nIGhhbmRzaGFrZSB3aXRoID8nLCB0aGlzLl9kaXNwYXRjaGVyLmVuZHBvaW50LmhyZWYpO1xuICAgIHRoaXMuX2Rpc3BhdGNoZXIuc2VsZWN0VHJhbnNwb3J0KGNvbnN0YW50cy5NQU5EQVRPUllfQ09OTkVDVElPTl9UWVBFUyk7XG5cbiAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICBjaGFubmVsOiAgICAgICAgICAgICAgICAgIENoYW5uZWwuSEFORFNIQUtFLFxuICAgICAgdmVyc2lvbjogICAgICAgICAgICAgICAgICBjb25zdGFudHMuQkFZRVVYX1ZFUlNJT04sXG4gICAgICBzdXBwb3J0ZWRDb25uZWN0aW9uVHlwZXM6IHRoaXMuX2Rpc3BhdGNoZXIuZ2V0Q29ubmVjdGlvblR5cGVzKClcblxuICAgIH0sIHt9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzc2Z1bCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuQ09OTkVDVEVEO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkICA9IHJlc3BvbnNlLmNsaWVudElkO1xuXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuc2VsZWN0VHJhbnNwb3J0KHJlc3BvbnNlLnN1cHBvcnRlZENvbm5lY3Rpb25UeXBlcyk7XG5cbiAgICAgICAgdGhpcy5pbmZvKCdIYW5kc2hha2Ugc3VjY2Vzc2Z1bDogPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKHRoaXMuX2NoYW5uZWxzLmdldEtleXMoKSwgdHJ1ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaykgYXNhcChmdW5jdGlvbigpIHsgY2FsbGJhY2suY2FsbChjb250ZXh0KSB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbmZvKCdIYW5kc2hha2UgdW5zdWNjZXNzZnVsJyk7XG4gICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBzZWxmLmhhbmRzaGFrZShjYWxsYmFjaywgY29udGV4dCkgfSwgdGhpcy5fZGlzcGF0Y2hlci5yZXRyeSAqIDEwMDApO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuVU5DT05ORUNURUQ7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgLy8gUmVxdWVzdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc3BvbnNlXG4gIC8vIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbCAgICAgICAgICAgICBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWxcbiAgLy8gICAgICAgICAgICAgICAgKiBjbGllbnRJZCAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bFxuICAvLyAgICAgICAgICAgICAgICAqIGNvbm5lY3Rpb25UeXBlICAgICAgICAgICAgICAgICAgICAgKiBjbGllbnRJZFxuICAvLyBNQVkgaW5jbHVkZTogICAqIGV4dCAgICAgICAgICAgICAgICAgTUFZIGluY2x1ZGU6ICAgKiBlcnJvclxuICAvLyAgICAgICAgICAgICAgICAqIGlkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBhZHZpY2VcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGlkXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHRpbWVzdGFtcFxuICBjb25uZWN0OiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLl9hZHZpY2UucmVjb25uZWN0ID09PSB0aGlzLk5PTkUpIHJldHVybjtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IHRoaXMuRElTQ09OTkVDVEVEKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IHRoaXMuVU5DT05ORUNURUQpXG4gICAgICByZXR1cm4gdGhpcy5oYW5kc2hha2UoZnVuY3Rpb24oKSB7IHRoaXMuY29ubmVjdChjYWxsYmFjaywgY29udGV4dCkgfSwgdGhpcyk7XG5cbiAgICB0aGlzLmNhbGxiYWNrKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICBpZiAodGhpcy5fc3RhdGUgIT09IHRoaXMuQ09OTkVDVEVEKSByZXR1cm47XG5cbiAgICB0aGlzLmluZm8oJ0NhbGxpbmcgZGVmZXJyZWQgYWN0aW9ucyBmb3IgPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuICAgIHRoaXMuc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgIHRoaXMuc2V0RGVmZXJyZWRTdGF0dXMoJ3Vua25vd24nKTtcblxuICAgIGlmICh0aGlzLl9jb25uZWN0UmVxdWVzdCkgcmV0dXJuO1xuICAgIHRoaXMuX2Nvbm5lY3RSZXF1ZXN0ID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5mbygnSW5pdGlhdGluZyBjb25uZWN0aW9uIGZvciA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCk7XG5cbiAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICBjaGFubmVsOiAgICAgICAgQ2hhbm5lbC5DT05ORUNULFxuICAgICAgY2xpZW50SWQ6ICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsXG4gICAgICBjb25uZWN0aW9uVHlwZTogdGhpcy5fZGlzcGF0Y2hlci5jb25uZWN0aW9uVHlwZVxuXG4gICAgfSwge30sIHRoaXMuX2N5Y2xlQ29ubmVjdGlvbiwgdGhpcyk7XG4gIH0sXG5cbiAgLy8gUmVxdWVzdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc3BvbnNlXG4gIC8vIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbCAgICAgICAgICAgICBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWxcbiAgLy8gICAgICAgICAgICAgICAgKiBjbGllbnRJZCAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3VjY2Vzc2Z1bFxuICAvLyBNQVkgaW5jbHVkZTogICAqIGV4dCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBjbGllbnRJZFxuICAvLyAgICAgICAgICAgICAgICAqIGlkICAgICAgICAgICAgICAgICAgTUFZIGluY2x1ZGU6ICAgKiBlcnJvclxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlICE9PSB0aGlzLkNPTk5FQ1RFRCkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gdGhpcy5ESVNDT05ORUNURUQ7XG5cbiAgICB0aGlzLmluZm8oJ0Rpc2Nvbm5lY3RpbmcgPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQpO1xuICAgIHZhciBwcm9taXNlID0gbmV3IFB1YmxpY2F0aW9uKCk7XG5cbiAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICBjaGFubmVsOiAgQ2hhbm5lbC5ESVNDT05ORUNULFxuICAgICAgY2xpZW50SWQ6IHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWRcblxuICAgIH0sIHt9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbG9zZSgpO1xuICAgICAgICBwcm9taXNlLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2Uuc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcsIEVycm9yLnBhcnNlKHJlc3BvbnNlLmVycm9yKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLmluZm8oJ0NsZWFyaW5nIGNoYW5uZWwgbGlzdGVuZXJzIGZvciA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCk7XG4gICAgdGhpcy5fY2hhbm5lbHMgPSBuZXcgQ2hhbm5lbC5TZXQoKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogY2xpZW50SWQgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gICAgICAgICAgICAgICAgKiBzdWJzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICogY2xpZW50SWRcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogc3Vic2NyaXB0aW9uXG4gIC8vICAgICAgICAgICAgICAgICogaWQgICAgICAgICAgICAgICAgICBNQVkgaW5jbHVkZTogICAqIGVycm9yXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGFkdmljZVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBleHRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogdGltZXN0YW1wXG4gIHN1YnNjcmliZTogZnVuY3Rpb24oY2hhbm5lbCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoY2hhbm5lbCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgcmV0dXJuIGFycmF5Lm1hcChjaGFubmVsLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShjLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIHZhciBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRoaXMsIGNoYW5uZWwsIGNhbGxiYWNrLCBjb250ZXh0KSxcbiAgICAgICAgZm9yY2UgICAgICAgID0gKGNhbGxiYWNrID09PSB0cnVlKSxcbiAgICAgICAgaGFzU3Vic2NyaWJlID0gdGhpcy5fY2hhbm5lbHMuaGFzU3Vic2NyaXB0aW9uKGNoYW5uZWwpO1xuXG4gICAgaWYgKGhhc1N1YnNjcmliZSAmJiAhZm9yY2UpIHtcbiAgICAgIHRoaXMuX2NoYW5uZWxzLnN1YnNjcmliZShbY2hhbm5lbF0sIHN1YnNjcmlwdGlvbik7XG4gICAgICBzdWJzY3JpcHRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbm5lY3QoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluZm8oJ0NsaWVudCA/IGF0dGVtcHRpbmcgdG8gc3Vic2NyaWJlIHRvID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBjaGFubmVsKTtcbiAgICAgIGlmICghZm9yY2UpIHRoaXMuX2NoYW5uZWxzLnN1YnNjcmliZShbY2hhbm5lbF0sIHN1YnNjcmlwdGlvbik7XG5cbiAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbDogICAgICBDaGFubmVsLlNVQlNDUklCRSxcbiAgICAgICAgY2xpZW50SWQ6ICAgICB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLFxuICAgICAgICBzdWJzY3JpcHRpb246IGNoYW5uZWxcblxuICAgICAgfSwge30sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzc2Z1bCkge1xuICAgICAgICAgIHN1YnNjcmlwdGlvbi5zZXREZWZlcnJlZFN0YXR1cygnZmFpbGVkJywgRXJyb3IucGFyc2UocmVzcG9uc2UuZXJyb3IpKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHMudW5zdWJzY3JpYmUoY2hhbm5lbCwgc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGFubmVscyA9IFtdLmNvbmNhdChyZXNwb25zZS5zdWJzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmluZm8oJ1N1YnNjcmlwdGlvbiBhY2tub3dsZWRnZWQgZm9yID8gdG8gPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIGNoYW5uZWxzKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnNldERlZmVycmVkU3RhdHVzKCdzdWNjZWVkZWQnKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfSxcblxuICAvLyBSZXF1ZXN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzcG9uc2VcbiAgLy8gTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsICAgICAgICAgICAgIE1VU1QgaW5jbHVkZTogICogY2hhbm5lbFxuICAvLyAgICAgICAgICAgICAgICAqIGNsaWVudElkICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBzdWNjZXNzZnVsXG4gIC8vICAgICAgICAgICAgICAgICogc3Vic2NyaXB0aW9uICAgICAgICAgICAgICAgICAgICAgICAqIGNsaWVudElkXG4gIC8vIE1BWSBpbmNsdWRlOiAgICogZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1YnNjcmlwdGlvblxuICAvLyAgICAgICAgICAgICAgICAqIGlkICAgICAgICAgICAgICAgICAgTUFZIGluY2x1ZGU6ICAgKiBlcnJvclxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBhZHZpY2VcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGlkXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHRpbWVzdGFtcFxuICB1bnN1YnNjcmliZTogZnVuY3Rpb24oY2hhbm5lbCwgc3Vic2NyaXB0aW9uKSB7XG4gICAgaWYgKGNoYW5uZWwgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgIHJldHVybiBhcnJheS5tYXAoY2hhbm5lbCwgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gdGhpcy51bnN1YnNjcmliZShjLCBzdWJzY3JpcHRpb24pO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgZGVhZCA9IHRoaXMuX2NoYW5uZWxzLnVuc3Vic2NyaWJlKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG4gICAgaWYgKCFkZWFkKSByZXR1cm47XG5cbiAgICB0aGlzLmNvbm5lY3QoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluZm8oJ0NsaWVudCA/IGF0dGVtcHRpbmcgdG8gdW5zdWJzY3JpYmUgZnJvbSA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCwgY2hhbm5lbCk7XG5cbiAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbDogICAgICBDaGFubmVsLlVOU1VCU0NSSUJFLFxuICAgICAgICBjbGllbnRJZDogICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsXG4gICAgICAgIHN1YnNjcmlwdGlvbjogY2hhbm5lbFxuXG4gICAgICB9LCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzZnVsKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNoYW5uZWxzID0gW10uY29uY2F0KHJlc3BvbnNlLnN1YnNjcmlwdGlvbik7XG4gICAgICAgIHRoaXMuaW5mbygnVW5zdWJzY3JpcHRpb24gYWNrbm93bGVkZ2VkIGZvciA/IGZyb20gPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIGNoYW5uZWxzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIC8vIFJlcXVlc3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZVxuICAvLyBNVVNUIGluY2x1ZGU6ICAqIGNoYW5uZWwgICAgICAgICAgICAgTVVTVCBpbmNsdWRlOiAgKiBjaGFubmVsXG4gIC8vICAgICAgICAgICAgICAgICogZGF0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIHN1Y2Nlc3NmdWxcbiAgLy8gTUFZIGluY2x1ZGU6ICAgKiBjbGllbnRJZCAgICAgICAgICAgIE1BWSBpbmNsdWRlOiAgICogaWRcbiAgLy8gICAgICAgICAgICAgICAgKiBpZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXJyb3JcbiAgLy8gICAgICAgICAgICAgICAgKiBleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogZXh0XG4gIHB1Ymxpc2g6IGZ1bmN0aW9uKGNoYW5uZWwsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyB8fCB7fSwgWydhdHRlbXB0cycsICdkZWFkbGluZSddKTtcbiAgICB2YXIgcHVibGljYXRpb24gPSBuZXcgUHVibGljYXRpb24oKTtcblxuICAgIHRoaXMuY29ubmVjdChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5mbygnQ2xpZW50ID8gcXVldWVpbmcgcHVibGlzaGVkIG1lc3NhZ2UgdG8gPzogPycsIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIGNoYW5uZWwsIGRhdGEpO1xuXG4gICAgICB0aGlzLl9zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWw6ICBjaGFubmVsLFxuICAgICAgICBkYXRhOiAgICAgZGF0YSxcbiAgICAgICAgY2xpZW50SWQ6IHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWRcblxuICAgICAgfSwgb3B0aW9ucywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpXG4gICAgICAgICAgcHVibGljYXRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcHVibGljYXRpb24uc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcsIEVycm9yLnBhcnNlKHJlc3BvbnNlLmVycm9yKSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiBwdWJsaWNhdGlvbjtcbiAgfSxcblxuICBfc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgbWVzc2FnZS5pZCA9IHRoaXMuX2dlbmVyYXRlTWVzc2FnZUlkKCk7XG5cbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX2FkdmljZS50aW1lb3V0XG4gICAgICAgICAgICAgICAgPyAxLjIgKiB0aGlzLl9hZHZpY2UudGltZW91dCAvIDEwMDBcbiAgICAgICAgICAgICAgICA6IDEuMiAqIHRoaXMuX2Rpc3BhdGNoZXIucmV0cnk7XG5cbiAgICB0aGlzLnBpcGVUaHJvdWdoRXh0ZW5zaW9ucygnb3V0Z29pbmcnLCBtZXNzYWdlLCBudWxsLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgIGlmIChjYWxsYmFjaykgdGhpcy5fcmVzcG9uc2VDYWxsYmFja3NbbWVzc2FnZS5pZF0gPSBbY2FsbGJhY2ssIGNvbnRleHRdO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hlci5zZW5kTWVzc2FnZShtZXNzYWdlLCB0aW1lb3V0LCBvcHRpb25zIHx8IHt9KTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2VuZXJhdGVNZXNzYWdlSWQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX21lc3NhZ2VJZCArPSAxO1xuICAgIGlmICh0aGlzLl9tZXNzYWdlSWQgPj0gTWF0aC5wb3coMiwzMikpIHRoaXMuX21lc3NhZ2VJZCA9IDA7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VJZC50b1N0cmluZygzNik7XG4gIH0sXG5cbiAgX3JlY2VpdmVNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgdmFyIGlkID0gbWVzc2FnZS5pZCwgY2FsbGJhY2s7XG5cbiAgICBpZiAobWVzc2FnZS5zdWNjZXNzZnVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5fcmVzcG9uc2VDYWxsYmFja3NbaWRdO1xuICAgICAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlQ2FsbGJhY2tzW2lkXTtcbiAgICB9XG5cbiAgICB0aGlzLnBpcGVUaHJvdWdoRXh0ZW5zaW9ucygnaW5jb21pbmcnLCBtZXNzYWdlLCBudWxsLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgIGlmIChtZXNzYWdlLmFkdmljZSkgdGhpcy5faGFuZGxlQWR2aWNlKG1lc3NhZ2UuYWR2aWNlKTtcbiAgICAgIHRoaXMuX2RlbGl2ZXJNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFja1swXS5jYWxsKGNhbGxiYWNrWzFdLCBtZXNzYWdlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfaGFuZGxlQWR2aWNlOiBmdW5jdGlvbihhZHZpY2UpIHtcbiAgICBhc3NpZ24odGhpcy5fYWR2aWNlLCBhZHZpY2UpO1xuICAgIHRoaXMuX2Rpc3BhdGNoZXIudGltZW91dCA9IHRoaXMuX2FkdmljZS50aW1lb3V0IC8gMTAwMDtcblxuICAgIGlmICh0aGlzLl9hZHZpY2UucmVjb25uZWN0ID09PSB0aGlzLkhBTkRTSEFLRSAmJiB0aGlzLl9zdGF0ZSAhPT0gdGhpcy5ESVNDT05ORUNURUQpIHtcbiAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5VTkNPTk5FQ1RFRDtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQgPSBudWxsO1xuICAgICAgdGhpcy5fY3ljbGVDb25uZWN0aW9uKCk7XG4gICAgfVxuICB9LFxuXG4gIF9kZWxpdmVyTWVzc2FnZTogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIGlmICghbWVzc2FnZS5jaGFubmVsIHx8IG1lc3NhZ2UuZGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgdGhpcy5pbmZvKCdDbGllbnQgPyBjYWxsaW5nIGxpc3RlbmVycyBmb3IgPyB3aXRoID8nLCB0aGlzLl9kaXNwYXRjaGVyLmNsaWVudElkLCBtZXNzYWdlLmNoYW5uZWwsIG1lc3NhZ2UuZGF0YSk7XG4gICAgdGhpcy5fY2hhbm5lbHMuZGlzdHJpYnV0ZU1lc3NhZ2UobWVzc2FnZSk7XG4gIH0sXG5cbiAgX2N5Y2xlQ29ubmVjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2Nvbm5lY3RSZXF1ZXN0KSB7XG4gICAgICB0aGlzLl9jb25uZWN0UmVxdWVzdCA9IG51bGw7XG4gICAgICB0aGlzLmluZm8oJ0Nsb3NlZCBjb25uZWN0aW9uIGZvciA/JywgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHsgc2VsZi5jb25uZWN0KCkgfSwgdGhpcy5fYWR2aWNlLmludGVydmFsKTtcbiAgfVxufSk7XG5cbmFzc2lnbihDbGllbnQucHJvdG90eXBlLCBEZWZlcnJhYmxlKTtcbmFzc2lnbihDbGllbnQucHJvdG90eXBlLCBQdWJsaXNoZXIpO1xuYXNzaWduKENsaWVudC5wcm90b3R5cGUsIExvZ2dpbmcpO1xuYXNzaWduKENsaWVudC5wcm90b3R5cGUsIEV4dGVuc2libGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENsaWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBVUkkgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3VyaScpLFxuICAgIGNvb2tpZXMgICA9IHJlcXVpcmUoJy4uL3V0aWwvY29va2llcycpLFxuICAgIGFzc2lnbiAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgTG9nZ2luZyAgID0gcmVxdWlyZSgnLi4vbWl4aW5zL2xvZ2dpbmcnKSxcbiAgICBQdWJsaXNoZXIgPSByZXF1aXJlKCcuLi9taXhpbnMvcHVibGlzaGVyJyksXG4gICAgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi4vdHJhbnNwb3J0JyksXG4gICAgU2NoZWR1bGVyID0gcmVxdWlyZSgnLi9zY2hlZHVsZXInKTtcblxudmFyIERpc3BhdGNoZXIgPSBDbGFzcyh7IGNsYXNzTmFtZTogJ0Rpc3BhdGNoZXInLFxuICBNQVhfUkVRVUVTVF9TSVpFOiAyMDQ4LFxuICBERUZBVUxUX1JFVFJZOiAgICA1LFxuXG4gIFVQOiAgIDEsXG4gIERPV046IDIsXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oY2xpZW50LCBlbmRwb2ludCwgb3B0aW9ucykge1xuICAgIHRoaXMuX2NsaWVudCAgICAgPSBjbGllbnQ7XG4gICAgdGhpcy5lbmRwb2ludCAgICA9IFVSSS5wYXJzZShlbmRwb2ludCk7XG4gICAgdGhpcy5fYWx0ZXJuYXRlcyA9IG9wdGlvbnMuZW5kcG9pbnRzIHx8IHt9O1xuXG4gICAgdGhpcy5jb29raWVzICAgICAgPSBjb29raWVzLkNvb2tpZUphciAmJiBuZXcgY29va2llcy5Db29raWVKYXIoKTtcbiAgICB0aGlzLl9kaXNhYmxlZCAgICA9IFtdO1xuICAgIHRoaXMuX2VudmVsb3BlcyAgID0ge307XG4gICAgdGhpcy5oZWFkZXJzICAgICAgPSB7fTtcbiAgICB0aGlzLnJldHJ5ICAgICAgICA9IG9wdGlvbnMucmV0cnkgfHwgdGhpcy5ERUZBVUxUX1JFVFJZO1xuICAgIHRoaXMuX3NjaGVkdWxlciAgID0gb3B0aW9ucy5zY2hlZHVsZXIgfHwgU2NoZWR1bGVyO1xuICAgIHRoaXMuX3N0YXRlICAgICAgID0gMDtcbiAgICB0aGlzLnRyYW5zcG9ydHMgICA9IHt9O1xuICAgIHRoaXMud3NFeHRlbnNpb25zID0gW107XG5cbiAgICB0aGlzLnByb3h5ID0gb3B0aW9ucy5wcm94eSB8fCB7fTtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3Byb3h5ID09PSAnc3RyaW5nJykgdGhpcy5fcHJveHkgPSB7IG9yaWdpbjogdGhpcy5fcHJveHkgfTtcblxuICAgIHZhciBleHRzID0gb3B0aW9ucy53ZWJzb2NrZXRFeHRlbnNpb25zO1xuICAgIGlmIChleHRzKSB7XG4gICAgICBleHRzID0gW10uY29uY2F0KGV4dHMpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBleHRzLmxlbmd0aDsgaSA8IG47IGkrKylcbiAgICAgICAgdGhpcy5hZGRXZWJzb2NrZXRFeHRlbnNpb24oZXh0c1tpXSk7XG4gICAgfVxuXG4gICAgdGhpcy50bHMgPSBvcHRpb25zLnRscyB8fCB7fTtcbiAgICB0aGlzLnRscy5jYSA9IHRoaXMudGxzLmNhIHx8IG9wdGlvbnMuY2E7XG5cbiAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMuX2FsdGVybmF0ZXMpXG4gICAgICB0aGlzLl9hbHRlcm5hdGVzW3R5cGVdID0gVVJJLnBhcnNlKHRoaXMuX2FsdGVybmF0ZXNbdHlwZV0pO1xuXG4gICAgdGhpcy5tYXhSZXF1ZXN0U2l6ZSA9IHRoaXMuTUFYX1JFUVVFU1RfU0laRTtcbiAgfSxcblxuICBlbmRwb2ludEZvcjogZnVuY3Rpb24oY29ubmVjdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fYWx0ZXJuYXRlc1tjb25uZWN0aW9uVHlwZV0gfHwgdGhpcy5lbmRwb2ludDtcbiAgfSxcblxuICBhZGRXZWJzb2NrZXRFeHRlbnNpb246IGZ1bmN0aW9uKGV4dGVuc2lvbikge1xuICAgIHRoaXMud3NFeHRlbnNpb25zLnB1c2goZXh0ZW5zaW9uKTtcbiAgfSxcblxuICBkaXNhYmxlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQucHVzaChmZWF0dXJlKTtcbiAgICBUcmFuc3BvcnQuZGlzYWJsZShmZWF0dXJlKTtcbiAgfSxcblxuICBzZXRIZWFkZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gIH0sXG5cbiAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0cmFuc3BvcnQgPSB0aGlzLl90cmFuc3BvcnQ7XG4gICAgZGVsZXRlIHRoaXMuX3RyYW5zcG9ydDtcbiAgICBpZiAodHJhbnNwb3J0KSB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgfSxcblxuICBnZXRDb25uZWN0aW9uVHlwZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBUcmFuc3BvcnQuZ2V0Q29ubmVjdGlvblR5cGVzKCk7XG4gIH0sXG5cbiAgc2VsZWN0VHJhbnNwb3J0OiBmdW5jdGlvbih0cmFuc3BvcnRUeXBlcykge1xuICAgIFRyYW5zcG9ydC5nZXQodGhpcywgdHJhbnNwb3J0VHlwZXMsIHRoaXMuX2Rpc2FibGVkLCBmdW5jdGlvbih0cmFuc3BvcnQpIHtcbiAgICAgIHRoaXMuZGVidWcoJ1NlbGVjdGVkID8gdHJhbnNwb3J0IGZvciA/JywgdHJhbnNwb3J0LmNvbm5lY3Rpb25UeXBlLCB0cmFuc3BvcnQuZW5kcG9pbnQuaHJlZik7XG5cbiAgICAgIGlmICh0cmFuc3BvcnQgPT09IHRoaXMuX3RyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgaWYgKHRoaXMuX3RyYW5zcG9ydCkgdGhpcy5fdHJhbnNwb3J0LmNsb3NlKCk7XG5cbiAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSB0cmFuc3BvcnQuY29ubmVjdGlvblR5cGU7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UsIHRpbWVvdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBpZCAgICAgICA9IG1lc3NhZ2UuaWQsXG4gICAgICAgIGF0dGVtcHRzID0gb3B0aW9ucy5hdHRlbXB0cyxcbiAgICAgICAgZGVhZGxpbmUgPSBvcHRpb25zLmRlYWRsaW5lICYmIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKG9wdGlvbnMuZGVhZGxpbmUgKiAxMDAwKSxcbiAgICAgICAgZW52ZWxvcGUgPSB0aGlzLl9lbnZlbG9wZXNbaWRdLFxuICAgICAgICBzY2hlZHVsZXI7XG5cbiAgICBpZiAoIWVudmVsb3BlKSB7XG4gICAgICBzY2hlZHVsZXIgPSBuZXcgdGhpcy5fc2NoZWR1bGVyKG1lc3NhZ2UsIHsgdGltZW91dDogdGltZW91dCwgaW50ZXJ2YWw6IHRoaXMucmV0cnksIGF0dGVtcHRzOiBhdHRlbXB0cywgZGVhZGxpbmU6IGRlYWRsaW5lIH0pO1xuICAgICAgZW52ZWxvcGUgID0gdGhpcy5fZW52ZWxvcGVzW2lkXSA9IHsgbWVzc2FnZTogbWVzc2FnZSwgc2NoZWR1bGVyOiBzY2hlZHVsZXIgfTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZW5kRW52ZWxvcGUoZW52ZWxvcGUpO1xuICB9LFxuXG4gIF9zZW5kRW52ZWxvcGU6IGZ1bmN0aW9uKGVudmVsb3BlKSB7XG4gICAgaWYgKCF0aGlzLl90cmFuc3BvcnQpIHJldHVybjtcbiAgICBpZiAoZW52ZWxvcGUucmVxdWVzdCB8fCBlbnZlbG9wZS50aW1lcikgcmV0dXJuO1xuXG4gICAgdmFyIG1lc3NhZ2UgICA9IGVudmVsb3BlLm1lc3NhZ2UsXG4gICAgICAgIHNjaGVkdWxlciA9IGVudmVsb3BlLnNjaGVkdWxlcixcbiAgICAgICAgc2VsZiAgICAgID0gdGhpcztcblxuICAgIGlmICghc2NoZWR1bGVyLmlzRGVsaXZlcmFibGUoKSkge1xuICAgICAgc2NoZWR1bGVyLmFib3J0KCk7XG4gICAgICBkZWxldGUgdGhpcy5fZW52ZWxvcGVzW21lc3NhZ2UuaWRdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVudmVsb3BlLnRpbWVyID0gZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmhhbmRsZUVycm9yKG1lc3NhZ2UpO1xuICAgIH0sIHNjaGVkdWxlci5nZXRUaW1lb3V0KCkgKiAxMDAwKTtcblxuICAgIHNjaGVkdWxlci5zZW5kKCk7XG4gICAgZW52ZWxvcGUucmVxdWVzdCA9IHRoaXMuX3RyYW5zcG9ydC5zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgfSxcblxuICBoYW5kbGVSZXNwb25zZTogZnVuY3Rpb24ocmVwbHkpIHtcbiAgICB2YXIgZW52ZWxvcGUgPSB0aGlzLl9lbnZlbG9wZXNbcmVwbHkuaWRdO1xuXG4gICAgaWYgKHJlcGx5LnN1Y2Nlc3NmdWwgIT09IHVuZGVmaW5lZCAmJiBlbnZlbG9wZSkge1xuICAgICAgZW52ZWxvcGUuc2NoZWR1bGVyLnN1Y2NlZWQoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9lbnZlbG9wZXNbcmVwbHkuaWRdO1xuICAgICAgZ2xvYmFsLmNsZWFyVGltZW91dChlbnZlbG9wZS50aW1lcik7XG4gICAgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdtZXNzYWdlJywgcmVwbHkpO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLlVQKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLlVQO1xuICAgIHRoaXMuX2NsaWVudC50cmlnZ2VyKCd0cmFuc3BvcnQ6dXAnKTtcbiAgfSxcblxuICBoYW5kbGVFcnJvcjogZnVuY3Rpb24obWVzc2FnZSwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIGVudmVsb3BlID0gdGhpcy5fZW52ZWxvcGVzW21lc3NhZ2UuaWRdLFxuICAgICAgICByZXF1ZXN0ICA9IGVudmVsb3BlICYmIGVudmVsb3BlLnJlcXVlc3QsXG4gICAgICAgIHNlbGYgICAgID0gdGhpcztcblxuICAgIGlmICghcmVxdWVzdCkgcmV0dXJuO1xuXG4gICAgcmVxdWVzdC50aGVuKGZ1bmN0aW9uKHJlcSkge1xuICAgICAgaWYgKHJlcSAmJiByZXEuYWJvcnQpIHJlcS5hYm9ydCgpO1xuICAgIH0pO1xuXG4gICAgdmFyIHNjaGVkdWxlciA9IGVudmVsb3BlLnNjaGVkdWxlcjtcbiAgICBzY2hlZHVsZXIuZmFpbCgpO1xuXG4gICAgZ2xvYmFsLmNsZWFyVGltZW91dChlbnZlbG9wZS50aW1lcik7XG4gICAgZW52ZWxvcGUucmVxdWVzdCA9IGVudmVsb3BlLnRpbWVyID0gbnVsbDtcblxuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIHRoaXMuX3NlbmRFbnZlbG9wZShlbnZlbG9wZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudmVsb3BlLnRpbWVyID0gZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGVudmVsb3BlLnRpbWVyID0gbnVsbDtcbiAgICAgICAgc2VsZi5fc2VuZEVudmVsb3BlKGVudmVsb3BlKTtcbiAgICAgIH0sIHNjaGVkdWxlci5nZXRJbnRlcnZhbCgpICogMTAwMCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLkRPV04pIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuRE9XTjtcbiAgICB0aGlzLl9jbGllbnQudHJpZ2dlcigndHJhbnNwb3J0OmRvd24nKTtcbiAgfVxufSk7XG5cbkRpc3BhdGNoZXIuY3JlYXRlID0gZnVuY3Rpb24oY2xpZW50LCBlbmRwb2ludCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IERpc3BhdGNoZXIoY2xpZW50LCBlbmRwb2ludCwgb3B0aW9ucyk7XG59O1xuXG5hc3NpZ24oRGlzcGF0Y2hlci5wcm90b3R5cGUsIFB1Ymxpc2hlcik7XG5hc3NpZ24oRGlzcGF0Y2hlci5wcm90b3R5cGUsIExvZ2dpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDbGFzcyAgID0gcmVxdWlyZSgnLi4vdXRpbC9jbGFzcycpLFxuICAgIEdyYW1tYXIgPSByZXF1aXJlKCcuL2dyYW1tYXInKTtcblxudmFyIEVycm9yID0gQ2xhc3Moe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbihjb2RlLCBwYXJhbXMsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLmNvZGUgICAgPSBjb2RlO1xuICAgIHRoaXMucGFyYW1zICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhcmFtcyk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfSxcblxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29kZSArICc6JyArXG4gICAgICAgICAgIHRoaXMucGFyYW1zLmpvaW4oJywnKSArICc6JyArXG4gICAgICAgICAgIHRoaXMubWVzc2FnZTtcbiAgfVxufSk7XG5cbkVycm9yLnBhcnNlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBtZXNzYWdlID0gbWVzc2FnZSB8fCAnJztcbiAgaWYgKCFHcmFtbWFyLkVSUk9SLnRlc3QobWVzc2FnZSkpIHJldHVybiBuZXcgRXJyb3IobnVsbCwgW10sIG1lc3NhZ2UpO1xuXG4gIHZhciBwYXJ0cyAgID0gbWVzc2FnZS5zcGxpdCgnOicpLFxuICAgICAgY29kZSAgICA9IHBhcnNlSW50KHBhcnRzWzBdKSxcbiAgICAgIHBhcmFtcyAgPSBwYXJ0c1sxXS5zcGxpdCgnLCcpLFxuICAgICAgbWVzc2FnZSA9IHBhcnRzWzJdO1xuXG4gIHJldHVybiBuZXcgRXJyb3IoY29kZSwgcGFyYW1zLCBtZXNzYWdlKTtcbn07XG5cbi8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jb21ldGQvd2lraS9CYXlldXhDb2Rlc1xudmFyIGVycm9ycyA9IHtcbiAgdmVyc2lvbk1pc21hdGNoOiAgWzMwMCwgJ1ZlcnNpb24gbWlzbWF0Y2gnXSxcbiAgY29ubnR5cGVNaXNtYXRjaDogWzMwMSwgJ0Nvbm5lY3Rpb24gdHlwZXMgbm90IHN1cHBvcnRlZCddLFxuICBleHRNaXNtYXRjaDogICAgICBbMzAyLCAnRXh0ZW5zaW9uIG1pc21hdGNoJ10sXG4gIGJhZFJlcXVlc3Q6ICAgICAgIFs0MDAsICdCYWQgcmVxdWVzdCddLFxuICBjbGllbnRVbmtub3duOiAgICBbNDAxLCAnVW5rbm93biBjbGllbnQnXSxcbiAgcGFyYW1ldGVyTWlzc2luZzogWzQwMiwgJ01pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyJ10sXG4gIGNoYW5uZWxGb3JiaWRkZW46IFs0MDMsICdGb3JiaWRkZW4gY2hhbm5lbCddLFxuICBjaGFubmVsVW5rbm93bjogICBbNDA0LCAnVW5rbm93biBjaGFubmVsJ10sXG4gIGNoYW5uZWxJbnZhbGlkOiAgIFs0MDUsICdJbnZhbGlkIGNoYW5uZWwnXSxcbiAgZXh0VW5rbm93bjogICAgICAgWzQwNiwgJ1Vua25vd24gZXh0ZW5zaW9uJ10sXG4gIHB1Ymxpc2hGYWlsZWQ6ICAgIFs0MDcsICdGYWlsZWQgdG8gcHVibGlzaCddLFxuICBzZXJ2ZXJFcnJvcjogICAgICBbNTAwLCAnSW50ZXJuYWwgc2VydmVyIGVycm9yJ11cbn07XG5cbmZvciAodmFyIG5hbWUgaW4gZXJyb3JzKVxuICAoZnVuY3Rpb24obmFtZSkge1xuICAgIEVycm9yW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yc1tuYW1lXVswXSwgYXJndW1lbnRzLCBlcnJvcnNbbmFtZV1bMV0pLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfSkobmFtZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gID0gcmVxdWlyZSgnLi4vdXRpbC9hc3NpZ24nKSxcbiAgICBMb2dnaW5nID0gcmVxdWlyZSgnLi4vbWl4aW5zL2xvZ2dpbmcnKTtcblxudmFyIEV4dGVuc2libGUgPSB7XG4gIGFkZEV4dGVuc2lvbjogZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IHRoaXMuX2V4dGVuc2lvbnMgfHwgW107XG4gICAgdGhpcy5fZXh0ZW5zaW9ucy5wdXNoKGV4dGVuc2lvbik7XG4gICAgaWYgKGV4dGVuc2lvbi5hZGRlZCkgZXh0ZW5zaW9uLmFkZGVkKHRoaXMpO1xuICB9LFxuXG4gIHJlbW92ZUV4dGVuc2lvbjogZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgaWYgKCF0aGlzLl9leHRlbnNpb25zKSByZXR1cm47XG4gICAgdmFyIGkgPSB0aGlzLl9leHRlbnNpb25zLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAodGhpcy5fZXh0ZW5zaW9uc1tpXSAhPT0gZXh0ZW5zaW9uKSBjb250aW51ZTtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbnMuc3BsaWNlKGksMSk7XG4gICAgICBpZiAoZXh0ZW5zaW9uLnJlbW92ZWQpIGV4dGVuc2lvbi5yZW1vdmVkKHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBwaXBlVGhyb3VnaEV4dGVuc2lvbnM6IGZ1bmN0aW9uKHN0YWdlLCBtZXNzYWdlLCByZXF1ZXN0LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuZGVidWcoJ1Bhc3NpbmcgdGhyb3VnaCA/IGV4dGVuc2lvbnM6ID8nLCBzdGFnZSwgbWVzc2FnZSk7XG5cbiAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbnMpIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIG1lc3NhZ2UpO1xuICAgIHZhciBleHRlbnNpb25zID0gdGhpcy5fZXh0ZW5zaW9ucy5zbGljZSgpO1xuXG4gICAgdmFyIHBpcGUgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIG1lc3NhZ2UpO1xuXG4gICAgICB2YXIgZXh0ZW5zaW9uID0gZXh0ZW5zaW9ucy5zaGlmdCgpO1xuICAgICAgaWYgKCFleHRlbnNpb24pIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIG1lc3NhZ2UpO1xuXG4gICAgICB2YXIgZm4gPSBleHRlbnNpb25bc3RhZ2VdO1xuICAgICAgaWYgKCFmbikgcmV0dXJuIHBpcGUobWVzc2FnZSk7XG5cbiAgICAgIGlmIChmbi5sZW5ndGggPj0gMykgZXh0ZW5zaW9uW3N0YWdlXShtZXNzYWdlLCByZXF1ZXN0LCBwaXBlKTtcbiAgICAgIGVsc2UgICAgICAgICAgICAgICAgZXh0ZW5zaW9uW3N0YWdlXShtZXNzYWdlLCBwaXBlKTtcbiAgICB9O1xuICAgIHBpcGUobWVzc2FnZSk7XG4gIH1cbn07XG5cbmFzc2lnbihFeHRlbnNpYmxlLCBMb2dnaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHRlbnNpYmxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ0hBTk5FTF9OQU1FOiAgICAgL15cXC8oKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCkpKSsoXFwvKCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApKSkrKSokLyxcbiAgQ0hBTk5FTF9QQVRURVJOOiAgL14oXFwvKCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApKSkrKSpcXC9cXCp7MSwyfSQvLFxuICBFUlJPUjogICAgICAgICAgICAvXihbMC05XVswLTldWzAtOV06KCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApfCB8XFwvfFxcKnxcXC4pKSooLCgoKChbYS16XXxbQS1aXSl8WzAtOV0pfChcXC18XFxffFxcIXxcXH58XFwofFxcKXxcXCR8XFxAKXwgfFxcL3xcXCp8XFwuKSkqKSo6KCgoKFthLXpdfFtBLVpdKXxbMC05XSl8KFxcLXxcXF98XFwhfFxcfnxcXCh8XFwpfFxcJHxcXEApfCB8XFwvfFxcKnxcXC4pKSp8WzAtOV1bMC05XVswLTldOjooKCgoW2Etel18W0EtWl0pfFswLTldKXwoXFwtfFxcX3xcXCF8XFx+fFxcKHxcXCl8XFwkfFxcQCl8IHxcXC98XFwqfFxcLikpKikkLyxcbiAgVkVSU0lPTjogICAgICAgICAgL14oWzAtOV0pKyhcXC4oKFthLXpdfFtBLVpdKXxbMC05XSkoKCgoW2Etel18W0EtWl0pfFswLTldKXxcXC18XFxfKSkqKSokL1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgRGVmZXJyYWJsZSA9IHJlcXVpcmUoJy4uL21peGlucy9kZWZlcnJhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xhc3MoRGVmZXJyYWJsZSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuLi91dGlsL2Fzc2lnbicpO1xuXG52YXIgU2NoZWR1bGVyID0gZnVuY3Rpb24obWVzc2FnZSwgb3B0aW9ucykge1xuICB0aGlzLm1lc3NhZ2UgID0gbWVzc2FnZTtcbiAgdGhpcy5vcHRpb25zICA9IG9wdGlvbnM7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufTtcblxuYXNzaWduKFNjaGVkdWxlci5wcm90b3R5cGUsIHtcbiAgZ2V0VGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lb3V0O1xuICB9LFxuXG4gIGdldEludGVydmFsOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmludGVydmFsO1xuICB9LFxuXG4gIGlzRGVsaXZlcmFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdHRlbXB0cyA9IHRoaXMub3B0aW9ucy5hdHRlbXB0cyxcbiAgICAgICAgbWFkZSAgICAgPSB0aGlzLmF0dGVtcHRzLFxuICAgICAgICBkZWFkbGluZSA9IHRoaXMub3B0aW9ucy5kZWFkbGluZSxcbiAgICAgICAgbm93ICAgICAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIGlmIChhdHRlbXB0cyAhPT0gdW5kZWZpbmVkICYmIG1hZGUgPj0gYXR0ZW1wdHMpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoZGVhZGxpbmUgIT09IHVuZGVmaW5lZCAmJiBub3cgPiBkZWFkbGluZSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHNlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYXR0ZW1wdHMgKz0gMTtcbiAgfSxcblxuICBzdWNjZWVkOiBmdW5jdGlvbigpIHt9LFxuXG4gIGZhaWw6IGZ1bmN0aW9uKCkge30sXG5cbiAgYWJvcnQ6IGZ1bmN0aW9uKCkge31cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVkdWxlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgYXNzaWduICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgRGVmZXJyYWJsZSA9IHJlcXVpcmUoJy4uL21peGlucy9kZWZlcnJhYmxlJyk7XG5cbnZhciBTdWJzY3JpcHRpb24gPSBDbGFzcyh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGNsaWVudCwgY2hhbm5lbHMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xpZW50ICAgID0gY2xpZW50O1xuICAgIHRoaXMuX2NoYW5uZWxzICA9IGNoYW5uZWxzO1xuICAgIHRoaXMuX2NhbGxiYWNrICA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX2NvbnRleHQgICA9IGNvbnRleHQ7XG4gICAgdGhpcy5fY2FuY2VsbGVkID0gZmFsc2U7XG4gIH0sXG5cbiAgd2l0aENoYW5uZWw6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fd2l0aENoYW5uZWwgPSBbY2FsbGJhY2ssIGNvbnRleHRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGFwcGx5OiBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBhcmdzWzBdO1xuXG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrKVxuICAgICAgdGhpcy5fY2FsbGJhY2suY2FsbCh0aGlzLl9jb250ZXh0LCBtZXNzYWdlLmRhdGEpO1xuXG4gICAgaWYgKHRoaXMuX3dpdGhDaGFubmVsKVxuICAgICAgdGhpcy5fd2l0aENoYW5uZWxbMF0uY2FsbCh0aGlzLl93aXRoQ2hhbm5lbFsxXSwgbWVzc2FnZS5jaGFubmVsLCBtZXNzYWdlLmRhdGEpO1xuICB9LFxuXG4gIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbmNlbGxlZCkgcmV0dXJuO1xuICAgIHRoaXMuX2NsaWVudC51bnN1YnNjcmliZSh0aGlzLl9jaGFubmVscywgdGhpcyk7XG4gICAgdGhpcy5fY2FuY2VsbGVkID0gdHJ1ZTtcbiAgfSxcblxuICB1bnN1YnNjcmliZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jYW5jZWwoKTtcbiAgfVxufSk7XG5cbmFzc2lnbihTdWJzY3JpcHRpb24ucHJvdG90eXBlLCBEZWZlcnJhYmxlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJzY3JpcHRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuXG5UcmFuc3BvcnQucmVnaXN0ZXIoJ3dlYnNvY2tldCcsIHJlcXVpcmUoJy4vd2ViX3NvY2tldCcpKTtcblRyYW5zcG9ydC5yZWdpc3RlcignZXZlbnRzb3VyY2UnLCByZXF1aXJlKCcuL2V2ZW50X3NvdXJjZScpKTtcblRyYW5zcG9ydC5yZWdpc3RlcignbG9uZy1wb2xsaW5nJywgcmVxdWlyZSgnLi94aHInKSk7XG5UcmFuc3BvcnQucmVnaXN0ZXIoJ2Nyb3NzLW9yaWdpbi1sb25nLXBvbGxpbmcnLCByZXF1aXJlKCcuL2NvcnMnKSk7XG5UcmFuc3BvcnQucmVnaXN0ZXIoJ2NhbGxiYWNrLXBvbGxpbmcnLCByZXF1aXJlKCcuL2pzb25wJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBTZXQgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3NldCcpLFxuICAgIFVSSSAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdXJpJyksXG4gICAgYXNzaWduICAgID0gcmVxdWlyZSgnLi4vdXRpbC9hc3NpZ24nKSxcbiAgICB0b0pTT04gICAgPSByZXF1aXJlKCcuLi91dGlsL3RvX2pzb24nKSxcbiAgICBUcmFuc3BvcnQgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuXG52YXIgQ09SUyA9IGFzc2lnbihDbGFzcyhUcmFuc3BvcnQsIHtcbiAgZW5jb2RlOiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiAnbWVzc2FnZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRvSlNPTihtZXNzYWdlcykpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdmFyIHhockNsYXNzID0gZ2xvYmFsLlhEb21haW5SZXF1ZXN0ID8gWERvbWFpblJlcXVlc3QgOiBYTUxIdHRwUmVxdWVzdCxcbiAgICAgICAgeGhyICAgICAgPSBuZXcgeGhyQ2xhc3MoKSxcbiAgICAgICAgaWQgICAgICAgPSArK0NPUlMuX2lkLFxuICAgICAgICBoZWFkZXJzICA9IHRoaXMuX2Rpc3BhdGNoZXIuaGVhZGVycyxcbiAgICAgICAgc2VsZiAgICAgPSB0aGlzLFxuICAgICAgICBrZXk7XG5cbiAgICB4aHIub3BlbignUE9TVCcsIHRoaXMuZW5kcG9pbnQuaHJlZiwgdHJ1ZSk7XG4gICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdQcmFnbWEnLCAnbm8tY2FjaGUnKTtcbiAgICAgIGZvciAoa2V5IGluIGhlYWRlcnMpIHtcbiAgICAgICAgaWYgKCFoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNsZWFuVXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgheGhyKSByZXR1cm4gZmFsc2U7XG4gICAgICBDT1JTLl9wZW5kaW5nLnJlbW92ZShpZCk7XG4gICAgICB4aHIub25sb2FkID0geGhyLm9uZXJyb3IgPSB4aHIub250aW1lb3V0ID0geGhyLm9ucHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgeGhyID0gbnVsbDtcbiAgICB9O1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlcGxpZXM7XG4gICAgICB0cnkgeyByZXBsaWVzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgY2xlYW5VcCgpO1xuXG4gICAgICBpZiAocmVwbGllcylcbiAgICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICAgIGVsc2VcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuICAgIH07XG5cbiAgICB4aHIub25lcnJvciA9IHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFuVXAoKTtcbiAgICAgIHNlbGYuX2hhbmRsZUVycm9yKG1lc3NhZ2VzKTtcbiAgICB9O1xuXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHt9O1xuXG4gICAgaWYgKHhockNsYXNzID09PSBnbG9iYWwuWERvbWFpblJlcXVlc3QpXG4gICAgICBDT1JTLl9wZW5kaW5nLmFkZCh7IGlkOiBpZCwgeGhyOiB4aHIgfSk7XG5cbiAgICB4aHIuc2VuZCh0aGlzLmVuY29kZShtZXNzYWdlcykpO1xuICAgIHJldHVybiB4aHI7XG4gIH1cbn0pLCB7XG4gIF9pZDogICAgICAwLFxuICBfcGVuZGluZzogbmV3IFNldCgpLFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoVVJJLmlzU2FtZU9yaWdpbihlbmRwb2ludCkpXG4gICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSk7XG5cbiAgICBpZiAoZ2xvYmFsLlhEb21haW5SZXF1ZXN0KVxuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZW5kcG9pbnQucHJvdG9jb2wgPT09IGxvY2F0aW9uLnByb3RvY29sKTtcblxuICAgIGlmIChnbG9iYWwuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHhoci53aXRoQ3JlZGVudGlhbHMgIT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ09SUztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgVVJJICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdXJpJyksXG4gICAgY29weU9iamVjdCA9IHJlcXVpcmUoJy4uL3V0aWwvY29weV9vYmplY3QnKSxcbiAgICBhc3NpZ24gICAgID0gcmVxdWlyZSgnLi4vdXRpbC9hc3NpZ24nKSxcbiAgICBEZWZlcnJhYmxlID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlZmVycmFibGUnKSxcbiAgICBUcmFuc3BvcnQgID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKSxcbiAgICBYSFIgICAgICAgID0gcmVxdWlyZSgnLi94aHInKTtcblxudmFyIEV2ZW50U291cmNlID0gYXNzaWduKENsYXNzKFRyYW5zcG9ydCwge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCkge1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGRpc3BhdGNoZXIsIGVuZHBvaW50KTtcbiAgICBpZiAoIWdsb2JhbC5FdmVudFNvdXJjZSkgcmV0dXJuIHRoaXMuc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcpO1xuXG4gICAgdGhpcy5feGhyID0gbmV3IFhIUihkaXNwYXRjaGVyLCBlbmRwb2ludCk7XG5cbiAgICBlbmRwb2ludCA9IGNvcHlPYmplY3QoZW5kcG9pbnQpO1xuICAgIGVuZHBvaW50LnBhdGhuYW1lICs9ICcvJyArIGRpc3BhdGNoZXIuY2xpZW50SWQ7XG5cbiAgICB2YXIgc29ja2V0ID0gbmV3IGdsb2JhbC5FdmVudFNvdXJjZShVUkkuc3RyaW5naWZ5KGVuZHBvaW50KSksXG4gICAgICAgIHNlbGYgICA9IHRoaXM7XG5cbiAgICBzb2NrZXQub25vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLl9ldmVyQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ3N1Y2NlZWRlZCcpO1xuICAgIH07XG5cbiAgICBzb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuX2V2ZXJDb25uZWN0ZWQpIHtcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IoW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5zZXREZWZlcnJlZFN0YXR1cygnZmFpbGVkJyk7XG4gICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciByZXBsaWVzO1xuICAgICAgdHJ5IHsgcmVwbGllcyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgIGlmIChyZXBsaWVzKVxuICAgICAgICBzZWxmLl9yZWNlaXZlKHJlcGxpZXMpO1xuICAgICAgZWxzZVxuICAgICAgICBzZWxmLl9oYW5kbGVFcnJvcihbXSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3NvY2tldCA9IHNvY2tldDtcbiAgfSxcblxuICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLl9zb2NrZXQpIHJldHVybjtcbiAgICB0aGlzLl9zb2NrZXQub25vcGVuID0gdGhpcy5fc29ja2V0Lm9uZXJyb3IgPSB0aGlzLl9zb2NrZXQub25tZXNzYWdlID0gbnVsbDtcbiAgICB0aGlzLl9zb2NrZXQuY2xvc2UoKTtcbiAgICBkZWxldGUgdGhpcy5fc29ja2V0O1xuICB9LFxuXG4gIGlzVXNhYmxlOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuY2FsbGJhY2soZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdHJ1ZSkgfSk7XG4gICAgdGhpcy5lcnJiYWNrKGZ1bmN0aW9uKCkgeyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKSB9KTtcbiAgfSxcblxuICBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3hoci5lbmNvZGUobWVzc2FnZXMpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3hoci5yZXF1ZXN0KG1lc3NhZ2VzKTtcbiAgfVxuXG59KSwge1xuICBpc1VzYWJsZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIGlkID0gZGlzcGF0Y2hlci5jbGllbnRJZDtcbiAgICBpZiAoIWlkKSByZXR1cm4gY2FsbGJhY2suY2FsbChjb250ZXh0LCBmYWxzZSk7XG5cbiAgICBYSFIuaXNVc2FibGUoZGlzcGF0Y2hlciwgZW5kcG9pbnQsIGZ1bmN0aW9uKHVzYWJsZSkge1xuICAgICAgaWYgKCF1c2FibGUpIHJldHVybiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGZhbHNlKTtcbiAgICAgIHRoaXMuY3JlYXRlKGRpc3BhdGNoZXIsIGVuZHBvaW50KS5pc1VzYWJsZShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCkge1xuICAgIHZhciBzb2NrZXRzID0gZGlzcGF0Y2hlci50cmFuc3BvcnRzLmV2ZW50c291cmNlID0gZGlzcGF0Y2hlci50cmFuc3BvcnRzLmV2ZW50c291cmNlIHx8IHt9LFxuICAgICAgICBpZCAgICAgID0gZGlzcGF0Y2hlci5jbGllbnRJZDtcblxuICAgIHZhciB1cmwgPSBjb3B5T2JqZWN0KGVuZHBvaW50KTtcbiAgICB1cmwucGF0aG5hbWUgKz0gJy8nICsgKGlkIHx8ICcnKTtcbiAgICB1cmwgPSBVUkkuc3RyaW5naWZ5KHVybCk7XG5cbiAgICBzb2NrZXRzW3VybF0gPSBzb2NrZXRzW3VybF0gfHwgbmV3IHRoaXMoZGlzcGF0Y2hlciwgZW5kcG9pbnQpO1xuICAgIHJldHVybiBzb2NrZXRzW3VybF07XG4gIH1cbn0pO1xuXG5hc3NpZ24oRXZlbnRTb3VyY2UucHJvdG90eXBlLCBEZWZlcnJhYmxlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICAgPSByZXF1aXJlKCcuLi91dGlsL2NsYXNzJyksXG4gICAgVVJJICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdXJpJyksXG4gICAgY29weU9iamVjdCA9IHJlcXVpcmUoJy4uL3V0aWwvY29weV9vYmplY3QnKSxcbiAgICBhc3NpZ24gICAgID0gcmVxdWlyZSgnLi4vdXRpbC9hc3NpZ24nKSxcbiAgICB0b0pTT04gICAgID0gcmVxdWlyZSgnLi4vdXRpbC90b19qc29uJyksXG4gICAgVHJhbnNwb3J0ICA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0Jyk7XG5cbnZhciBKU09OUCA9IGFzc2lnbihDbGFzcyhUcmFuc3BvcnQsIHtcbiBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdmFyIHVybCA9IGNvcHlPYmplY3QodGhpcy5lbmRwb2ludCk7XG4gICAgdXJsLnF1ZXJ5Lm1lc3NhZ2UgPSB0b0pTT04obWVzc2FnZXMpO1xuICAgIHVybC5xdWVyeS5qc29ucCAgID0gJ19fanNvbnAnICsgSlNPTlAuX2NiQ291bnQgKyAnX18nO1xuICAgIHJldHVybiBVUkkuc3RyaW5naWZ5KHVybCk7XG4gIH0sXG5cbiAgcmVxdWVzdDogZnVuY3Rpb24obWVzc2FnZXMpIHtcbiAgICB2YXIgaGVhZCAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc2NyaXB0ICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICAgIGNhbGxiYWNrTmFtZSA9IEpTT05QLmdldENhbGxiYWNrTmFtZSgpLFxuICAgICAgICBlbmRwb2ludCAgICAgPSBjb3B5T2JqZWN0KHRoaXMuZW5kcG9pbnQpLFxuICAgICAgICBzZWxmICAgICAgICAgPSB0aGlzO1xuXG4gICAgZW5kcG9pbnQucXVlcnkubWVzc2FnZSA9IHRvSlNPTihtZXNzYWdlcyk7XG4gICAgZW5kcG9pbnQucXVlcnkuanNvbnAgICA9IGNhbGxiYWNrTmFtZTtcblxuICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWdsb2JhbFtjYWxsYmFja05hbWVdKSByZXR1cm4gZmFsc2U7XG4gICAgICBnbG9iYWxbY2FsbGJhY2tOYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgIHRyeSB7IGRlbGV0ZSBnbG9iYWxbY2FsbGJhY2tOYW1lXSB9IGNhdGNoIChlcnJvcikge31cbiAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgfTtcblxuICAgIGdsb2JhbFtjYWxsYmFja05hbWVdID0gZnVuY3Rpb24ocmVwbGllcykge1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQuc3JjICA9IFVSSS5zdHJpbmdpZnkoZW5kcG9pbnQpO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgICBzZWxmLl9oYW5kbGVFcnJvcihtZXNzYWdlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGFib3J0OiBjbGVhbnVwIH07XG4gIH1cbn0pLCB7XG4gIF9jYkNvdW50OiAwLFxuXG4gIGdldENhbGxiYWNrTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fY2JDb3VudCArPSAxO1xuICAgIHJldHVybiAnX19qc29ucCcgKyB0aGlzLl9jYkNvdW50ICsgJ19fJztcbiAgfSxcblxuICBpc1VzYWJsZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB0cnVlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlA7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDbGFzcyAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBDb29raWUgICA9IHJlcXVpcmUoJy4uL3V0aWwvY29va2llcycpLkNvb2tpZSxcbiAgICBQcm9taXNlICA9IHJlcXVpcmUoJy4uL3V0aWwvcHJvbWlzZScpLFxuICAgIGFycmF5ICAgID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpLFxuICAgIGFzc2lnbiAgID0gcmVxdWlyZSgnLi4vdXRpbC9hc3NpZ24nKSxcbiAgICBMb2dnaW5nICA9IHJlcXVpcmUoJy4uL21peGlucy9sb2dnaW5nJyksXG4gICAgVGltZW91dHMgPSByZXF1aXJlKCcuLi9taXhpbnMvdGltZW91dHMnKSxcbiAgICBDaGFubmVsICA9IHJlcXVpcmUoJy4uL3Byb3RvY29sL2NoYW5uZWwnKTtcblxudmFyIFRyYW5zcG9ydCA9IGFzc2lnbihDbGFzcyh7IGNsYXNzTmFtZTogJ1RyYW5zcG9ydCcsXG4gIERFRkFVTFRfUE9SVFM6IHsgJ2h0dHA6JzogODAsICdodHRwczonOiA0NDMsICd3czonOiA4MCwgJ3dzczonOiA0NDMgfSxcbiAgTUFYX0RFTEFZOiAgICAgMCxcblxuICBiYXRjaGluZzogIHRydWUsXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQpIHtcbiAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiAgICB0aGlzLmVuZHBvaW50ICAgID0gZW5kcG9pbnQ7XG4gICAgdGhpcy5fb3V0Ym94ICAgICA9IFtdO1xuICAgIHRoaXMuX3Byb3h5ICAgICAgPSBhc3NpZ24oe30sIHRoaXMuX2Rpc3BhdGNoZXIucHJveHkpO1xuXG4gICAgaWYgKCF0aGlzLl9wcm94eS5vcmlnaW4pXG4gICAgICB0aGlzLl9wcm94eS5vcmlnaW4gPSB0aGlzLl9maW5kUHJveHkoKTtcbiAgfSxcblxuICBjbG9zZTogZnVuY3Rpb24oKSB7fSxcblxuICBlbmNvZGU6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgcmV0dXJuICcnO1xuICB9LFxuXG4gIHNlbmRNZXNzYWdlOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgdGhpcy5kZWJ1ZygnQ2xpZW50ID8gc2VuZGluZyBtZXNzYWdlIHRvID86ID8nLFxuICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGllbnRJZCwgdGhpcy5lbmRwb2ludC5ocmVmLCBtZXNzYWdlKTtcblxuICAgIGlmICghdGhpcy5iYXRjaGluZykgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnJlcXVlc3QoW21lc3NhZ2VdKSk7XG5cbiAgICB0aGlzLl9vdXRib3gucHVzaChtZXNzYWdlKTtcbiAgICB0aGlzLl9mbHVzaExhcmdlQmF0Y2goKTtcblxuICAgIGlmIChtZXNzYWdlLmNoYW5uZWwgPT09IENoYW5uZWwuSEFORFNIQUtFKVxuICAgICAgcmV0dXJuIHRoaXMuX3B1Ymxpc2goMC4wMSk7XG5cbiAgICBpZiAobWVzc2FnZS5jaGFubmVsID09PSBDaGFubmVsLkNPTk5FQ1QpXG4gICAgICB0aGlzLl9jb25uZWN0TWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICByZXR1cm4gdGhpcy5fcHVibGlzaCh0aGlzLk1BWF9ERUxBWSk7XG4gIH0sXG5cbiAgX21ha2VQcm9taXNlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLl9yZXF1ZXN0UHJvbWlzZSA9IHRoaXMuX3JlcXVlc3RQcm9taXNlIHx8IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIHNlbGYuX3Jlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgfSxcblxuICBfcHVibGlzaDogZnVuY3Rpb24oZGVsYXkpIHtcbiAgICB0aGlzLl9tYWtlUHJvbWlzZSgpO1xuXG4gICAgdGhpcy5hZGRUaW1lb3V0KCdwdWJsaXNoJywgZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fZmx1c2goKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9yZXF1ZXN0UHJvbWlzZTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0UHJvbWlzZTtcbiAgfSxcblxuICBfZmx1c2g6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlVGltZW91dCgncHVibGlzaCcpO1xuXG4gICAgaWYgKHRoaXMuX291dGJveC5sZW5ndGggPiAxICYmIHRoaXMuX2Nvbm5lY3RNZXNzYWdlKVxuICAgICAgdGhpcy5fY29ubmVjdE1lc3NhZ2UuYWR2aWNlID0geyB0aW1lb3V0OiAwIH07XG5cbiAgICB0aGlzLl9yZXNvbHZlUHJvbWlzZSh0aGlzLnJlcXVlc3QodGhpcy5fb3V0Ym94KSk7XG5cbiAgICB0aGlzLl9jb25uZWN0TWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5fb3V0Ym94ID0gW107XG4gIH0sXG5cbiAgX2ZsdXNoTGFyZ2VCYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZyA9IHRoaXMuZW5jb2RlKHRoaXMuX291dGJveCk7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPCB0aGlzLl9kaXNwYXRjaGVyLm1heFJlcXVlc3RTaXplKSByZXR1cm47XG4gICAgdmFyIGxhc3QgPSB0aGlzLl9vdXRib3gucG9wKCk7XG5cbiAgICB0aGlzLl9tYWtlUHJvbWlzZSgpO1xuICAgIHRoaXMuX2ZsdXNoKCk7XG5cbiAgICBpZiAobGFzdCkgdGhpcy5fb3V0Ym94LnB1c2gobGFzdCk7XG4gIH0sXG5cbiAgX3JlY2VpdmU6IGZ1bmN0aW9uKHJlcGxpZXMpIHtcbiAgICBpZiAoIXJlcGxpZXMpIHJldHVybjtcbiAgICByZXBsaWVzID0gW10uY29uY2F0KHJlcGxpZXMpO1xuXG4gICAgdGhpcy5kZWJ1ZygnQ2xpZW50ID8gcmVjZWl2ZWQgZnJvbSA/IHZpYSA/OiA/JyxcbiAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIHRoaXMuZW5kcG9pbnQuaHJlZiwgdGhpcy5jb25uZWN0aW9uVHlwZSwgcmVwbGllcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHJlcGxpZXMubGVuZ3RoOyBpIDwgbjsgaSsrKVxuICAgICAgdGhpcy5fZGlzcGF0Y2hlci5oYW5kbGVSZXNwb25zZShyZXBsaWVzW2ldKTtcbiAgfSxcblxuICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2VzLCBpbW1lZGlhdGUpIHtcbiAgICBtZXNzYWdlcyA9IFtdLmNvbmNhdChtZXNzYWdlcyk7XG5cbiAgICB0aGlzLmRlYnVnKCdDbGllbnQgPyBmYWlsZWQgdG8gc2VuZCB0byA/IHZpYSA/OiA/JyxcbiAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xpZW50SWQsIHRoaXMuZW5kcG9pbnQuaHJlZiwgdGhpcy5jb25uZWN0aW9uVHlwZSwgbWVzc2FnZXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBtZXNzYWdlcy5sZW5ndGg7IGkgPCBuOyBpKyspXG4gICAgICB0aGlzLl9kaXNwYXRjaGVyLmhhbmRsZUVycm9yKG1lc3NhZ2VzW2ldKTtcbiAgfSxcblxuICBfZ2V0Q29va2llczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvb2tpZXMgPSB0aGlzLl9kaXNwYXRjaGVyLmNvb2tpZXMsXG4gICAgICAgIHVybCAgICAgPSB0aGlzLmVuZHBvaW50LmhyZWY7XG5cbiAgICBpZiAoIWNvb2tpZXMpIHJldHVybiAnJztcblxuICAgIHJldHVybiBhcnJheS5tYXAoY29va2llcy5nZXRDb29raWVzU3luYyh1cmwpLCBmdW5jdGlvbihjb29raWUpIHtcbiAgICAgIHJldHVybiBjb29raWUuY29va2llU3RyaW5nKCk7XG4gICAgfSkuam9pbignOyAnKTtcbiAgfSxcblxuICBfc3RvcmVDb29raWVzOiBmdW5jdGlvbihzZXRDb29raWUpIHtcbiAgICB2YXIgY29va2llcyA9IHRoaXMuX2Rpc3BhdGNoZXIuY29va2llcyxcbiAgICAgICAgdXJsICAgICA9IHRoaXMuZW5kcG9pbnQuaHJlZixcbiAgICAgICAgY29va2llO1xuXG4gICAgaWYgKCFzZXRDb29raWUgfHwgIWNvb2tpZXMpIHJldHVybjtcbiAgICBzZXRDb29raWUgPSBbXS5jb25jYXQoc2V0Q29va2llKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBuID0gc2V0Q29va2llLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgY29va2llID0gQ29va2llLnBhcnNlKHNldENvb2tpZVtpXSk7XG4gICAgICBjb29raWVzLnNldENvb2tpZVN5bmMoY29va2llLCB1cmwpO1xuICAgIH1cbiAgfSxcblxuICBfZmluZFByb3h5OiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgdmFyIHByb3RvY29sID0gdGhpcy5lbmRwb2ludC5wcm90b2NvbDtcbiAgICBpZiAoIXByb3RvY29sKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgdmFyIG5hbWUgICA9IHByb3RvY29sLnJlcGxhY2UoLzokLywgJycpLnRvTG93ZXJDYXNlKCkgKyAnX3Byb3h5JyxcbiAgICAgICAgdXBjYXNlID0gbmFtZS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICBlbnYgICAgPSBwcm9jZXNzLmVudixcbiAgICAgICAga2V5cywgcHJveHk7XG5cbiAgICBpZiAobmFtZSA9PT0gJ2h0dHBfcHJveHknICYmIGVudi5SRVFVRVNUX01FVEhPRCkge1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKGVudikuZmlsdGVyKGZ1bmN0aW9uKGspIHsgcmV0dXJuIC9eaHR0cF9wcm94eSQvaS50ZXN0KGspIH0pO1xuICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChrZXlzWzBdID09PSBuYW1lICYmIGVudlt1cGNhc2VdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgcHJveHkgPSBlbnZbbmFtZV07XG4gICAgICB9IGVsc2UgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICBwcm94eSA9IGVudltuYW1lXTtcbiAgICAgIH1cbiAgICAgIHByb3h5ID0gcHJveHkgfHwgZW52WydDR0lfJyArIHVwY2FzZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3h5ID0gZW52W25hbWVdIHx8IGVudlt1cGNhc2VdO1xuICAgICAgaWYgKHByb3h5ICYmICFlbnZbbmFtZV0pXG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGVudmlyb25tZW50IHZhcmlhYmxlICcgKyB1cGNhc2UgK1xuICAgICAgICAgICAgICAgICAgICAgJyBpcyBkaXNjb3VyYWdlZC4gVXNlICcgKyBuYW1lICsgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3h5O1xuICB9XG5cbn0pLCB7XG4gIGdldDogZnVuY3Rpb24oZGlzcGF0Y2hlciwgYWxsb3dlZCwgZGlzYWJsZWQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIGVuZHBvaW50ID0gZGlzcGF0Y2hlci5lbmRwb2ludDtcblxuICAgIGFycmF5LmFzeW5jRWFjaCh0aGlzLl90cmFuc3BvcnRzLCBmdW5jdGlvbihwYWlyLCByZXN1bWUpIHtcbiAgICAgIHZhciBjb25uVHlwZSAgICAgPSBwYWlyWzBdLCBrbGFzcyA9IHBhaXJbMV0sXG4gICAgICAgICAgY29ubkVuZHBvaW50ID0gZGlzcGF0Y2hlci5lbmRwb2ludEZvcihjb25uVHlwZSk7XG5cbiAgICAgIGlmIChhcnJheS5pbmRleE9mKGRpc2FibGVkLCBjb25uVHlwZSkgPj0gMClcbiAgICAgICAgcmV0dXJuIHJlc3VtZSgpO1xuXG4gICAgICBpZiAoYXJyYXkuaW5kZXhPZihhbGxvd2VkLCBjb25uVHlwZSkgPCAwKSB7XG4gICAgICAgIGtsYXNzLmlzVXNhYmxlKGRpc3BhdGNoZXIsIGNvbm5FbmRwb2ludCwgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgIHJldHVybiByZXN1bWUoKTtcbiAgICAgIH1cblxuICAgICAga2xhc3MuaXNVc2FibGUoZGlzcGF0Y2hlciwgY29ubkVuZHBvaW50LCBmdW5jdGlvbihpc1VzYWJsZSkge1xuICAgICAgICBpZiAoIWlzVXNhYmxlKSByZXR1cm4gcmVzdW1lKCk7XG4gICAgICAgIHZhciB0cmFuc3BvcnQgPSBrbGFzcy5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlJykgPyBrbGFzcy5jcmVhdGUoZGlzcGF0Y2hlciwgY29ubkVuZHBvaW50KSA6IG5ldyBrbGFzcyhkaXNwYXRjaGVyLCBjb25uRW5kcG9pbnQpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRyYW5zcG9ydCk7XG4gICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYSB1c2FibGUgY29ubmVjdGlvbiB0eXBlIGZvciAnICsgZW5kcG9pbnQuaHJlZik7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKHR5cGUsIGtsYXNzKSB7XG4gICAgdGhpcy5fdHJhbnNwb3J0cy5wdXNoKFt0eXBlLCBrbGFzc10pO1xuICAgIGtsYXNzLnByb3RvdHlwZS5jb25uZWN0aW9uVHlwZSA9IHR5cGU7XG4gIH0sXG5cbiAgZ2V0Q29ubmVjdGlvblR5cGVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYXJyYXkubWFwKHRoaXMuX3RyYW5zcG9ydHMsIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIHRbMF0gfSk7XG4gIH0sXG5cbiAgZGlzYWJsZTogZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgIGlmIChmZWF0dXJlICE9PSAnYXV0b2Rpc2Nvbm5lY3QnKSByZXR1cm47XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RyYW5zcG9ydHMubGVuZ3RoOyBpKyspXG4gICAgICB0aGlzLl90cmFuc3BvcnRzW2ldWzFdLl91bmxvYWRlZCA9IGZhbHNlO1xuICB9LFxuXG4gIF90cmFuc3BvcnRzOiBbXVxufSk7XG5cbmFzc2lnbihUcmFuc3BvcnQucHJvdG90eXBlLCBMb2dnaW5nKTtcbmFzc2lnbihUcmFuc3BvcnQucHJvdG90eXBlLCBUaW1lb3V0cyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBQcm9taXNlICAgID0gcmVxdWlyZSgnLi4vdXRpbC9wcm9taXNlJyksXG4gICAgU2V0ICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvc2V0JyksXG4gICAgVVJJICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdXJpJyksXG4gICAgYnJvd3NlciAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYnJvd3NlcicpLFxuICAgIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuLi91dGlsL2NvcHlfb2JqZWN0JyksXG4gICAgYXNzaWduICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgdG9KU09OICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvdG9fanNvbicpLFxuICAgIHdzICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3dlYnNvY2tldCcpLFxuICAgIERlZmVycmFibGUgPSByZXF1aXJlKCcuLi9taXhpbnMvZGVmZXJyYWJsZScpLFxuICAgIFRyYW5zcG9ydCAgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuXG52YXIgV2ViU29ja2V0ID0gYXNzaWduKENsYXNzKFRyYW5zcG9ydCwge1xuICBVTkNPTk5FQ1RFRDogIDEsXG4gIENPTk5FQ1RJTkc6ICAgMixcbiAgQ09OTkVDVEVEOiAgICAzLFxuXG4gIGJhdGNoaW5nOiAgICAgZmFsc2UsXG5cbiAgaXNVc2FibGU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5jYWxsYmFjayhmdW5jdGlvbigpIHsgY2FsbGJhY2suY2FsbChjb250ZXh0LCB0cnVlKSB9KTtcbiAgICB0aGlzLmVycmJhY2soZnVuY3Rpb24oKSB7IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZmFsc2UpIH0pO1xuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5fcGVuZGluZyA9IHRoaXMuX3BlbmRpbmcgfHwgbmV3IFNldCgpO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gbWVzc2FnZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB0aGlzLl9wZW5kaW5nLmFkZChtZXNzYWdlc1tpXSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgc2VsZi5jYWxsYmFjayhmdW5jdGlvbihzb2NrZXQpIHtcbiAgICAgICAgaWYgKCFzb2NrZXQgfHwgc29ja2V0LnJlYWR5U3RhdGUgIT09IDEpIHJldHVybjtcbiAgICAgICAgc29ja2V0LnNlbmQodG9KU09OKG1lc3NhZ2VzKSk7XG4gICAgICAgIHJlc29sdmUoc29ja2V0KTtcbiAgICAgIH0pO1xuXG4gICAgICBzZWxmLmNvbm5lY3QoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7IHByb21pc2UudGhlbihmdW5jdGlvbih3cykgeyB3cy5jbG9zZSgpIH0pIH1cbiAgICB9O1xuICB9LFxuXG4gIGNvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgIGlmIChXZWJTb2NrZXQuX3VubG9hZGVkKSByZXR1cm47XG5cbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlIHx8IHRoaXMuVU5DT05ORUNURUQ7XG4gICAgaWYgKHRoaXMuX3N0YXRlICE9PSB0aGlzLlVOQ09OTkVDVEVEKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLkNPTk5FQ1RJTkc7XG5cbiAgICB2YXIgc29ja2V0ID0gdGhpcy5fY3JlYXRlU29ja2V0KCk7XG4gICAgaWYgKCFzb2NrZXQpIHJldHVybiB0aGlzLnNldERlZmVycmVkU3RhdHVzKCdmYWlsZWQnKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzb2NrZXQuaGVhZGVycykgc2VsZi5fc3RvcmVDb29raWVzKHNvY2tldC5oZWFkZXJzWydzZXQtY29va2llJ10pO1xuICAgICAgc2VsZi5fc29ja2V0ID0gc29ja2V0O1xuICAgICAgc2VsZi5fc3RhdGUgPSBzZWxmLkNPTk5FQ1RFRDtcbiAgICAgIHNlbGYuX2V2ZXJDb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgc2VsZi5zZXREZWZlcnJlZFN0YXR1cygnc3VjY2VlZGVkJywgc29ja2V0KTtcbiAgICB9O1xuXG4gICAgdmFyIGNsb3NlZCA9IGZhbHNlO1xuICAgIHNvY2tldC5vbmNsb3NlID0gc29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjbG9zZWQpIHJldHVybjtcbiAgICAgIGNsb3NlZCA9IHRydWU7XG5cbiAgICAgIHZhciB3YXNDb25uZWN0ZWQgPSAoc2VsZi5fc3RhdGUgPT09IHNlbGYuQ09OTkVDVEVEKTtcbiAgICAgIHNvY2tldC5vbm9wZW4gPSBzb2NrZXQub25jbG9zZSA9IHNvY2tldC5vbmVycm9yID0gc29ja2V0Lm9ubWVzc2FnZSA9IG51bGw7XG5cbiAgICAgIGRlbGV0ZSBzZWxmLl9zb2NrZXQ7XG4gICAgICBzZWxmLl9zdGF0ZSA9IHNlbGYuVU5DT05ORUNURUQ7XG5cbiAgICAgIHZhciBwZW5kaW5nID0gc2VsZi5fcGVuZGluZyA/IHNlbGYuX3BlbmRpbmcudG9BcnJheSgpIDogW107XG4gICAgICBkZWxldGUgc2VsZi5fcGVuZGluZztcblxuICAgICAgaWYgKHdhc0Nvbm5lY3RlZCB8fCBzZWxmLl9ldmVyQ29ubmVjdGVkKSB7XG4gICAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ3Vua25vd24nKTtcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IocGVuZGluZywgd2FzQ29ubmVjdGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuc2V0RGVmZXJyZWRTdGF0dXMoJ2ZhaWxlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciByZXBsaWVzO1xuICAgICAgdHJ5IHsgcmVwbGllcyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgIGlmICghcmVwbGllcykgcmV0dXJuO1xuXG4gICAgICByZXBsaWVzID0gW10uY29uY2F0KHJlcGxpZXMpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHJlcGxpZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGlmIChyZXBsaWVzW2ldLnN1Y2Nlc3NmdWwgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgIHNlbGYuX3BlbmRpbmcucmVtb3ZlKHJlcGxpZXNbaV0pO1xuICAgICAgfVxuICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICB9O1xuICB9LFxuXG4gIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkgcmV0dXJuO1xuICAgIHRoaXMuX3NvY2tldC5jbG9zZSgpO1xuICB9LFxuXG4gIF9jcmVhdGVTb2NrZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1cmwgICAgICAgID0gV2ViU29ja2V0LmdldFNvY2tldFVybCh0aGlzLmVuZHBvaW50KSxcbiAgICAgICAgaGVhZGVycyAgICA9IHRoaXMuX2Rpc3BhdGNoZXIuaGVhZGVycyxcbiAgICAgICAgZXh0ZW5zaW9ucyA9IHRoaXMuX2Rpc3BhdGNoZXIud3NFeHRlbnNpb25zLFxuICAgICAgICBjb29raWUgICAgID0gdGhpcy5fZ2V0Q29va2llcygpLFxuICAgICAgICB0bHMgICAgICAgID0gdGhpcy5fZGlzcGF0Y2hlci50bHMsXG4gICAgICAgIG9wdGlvbnMgICAgPSB7IGV4dGVuc2lvbnM6IGV4dGVuc2lvbnMsIGhlYWRlcnM6IGhlYWRlcnMsIHByb3h5OiB0aGlzLl9wcm94eSwgdGxzOiB0bHMgfTtcblxuICAgIGlmIChjb29raWUgIT09ICcnKSBvcHRpb25zLmhlYWRlcnNbJ0Nvb2tpZSddID0gY29va2llO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB3cy5jcmVhdGUodXJsLCBbXSwgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gY2F0Y2ggQ1NQIGVycm9yIHRvIGFsbG93IHRyYW5zcG9ydCB0byBmYWxsYmFjayB0byBuZXh0IGNvbm5UeXBlXG4gICAgfVxuICB9XG5cbn0pLCB7XG4gIFBST1RPQ09MUzoge1xuICAgICdodHRwOic6ICAnd3M6JyxcbiAgICAnaHR0cHM6JzogJ3dzczonXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCkge1xuICAgIHZhciBzb2NrZXRzID0gZGlzcGF0Y2hlci50cmFuc3BvcnRzLndlYnNvY2tldCA9IGRpc3BhdGNoZXIudHJhbnNwb3J0cy53ZWJzb2NrZXQgfHwge307XG4gICAgc29ja2V0c1tlbmRwb2ludC5ocmVmXSA9IHNvY2tldHNbZW5kcG9pbnQuaHJlZl0gfHwgbmV3IHRoaXMoZGlzcGF0Y2hlciwgZW5kcG9pbnQpO1xuICAgIHJldHVybiBzb2NrZXRzW2VuZHBvaW50LmhyZWZdO1xuICB9LFxuXG4gIGdldFNvY2tldFVybDogZnVuY3Rpb24oZW5kcG9pbnQpIHtcbiAgICBlbmRwb2ludCA9IGNvcHlPYmplY3QoZW5kcG9pbnQpO1xuICAgIGVuZHBvaW50LnByb3RvY29sID0gdGhpcy5QUk9UT0NPTFNbZW5kcG9pbnQucHJvdG9jb2xdO1xuICAgIHJldHVybiBVUkkuc3RyaW5naWZ5KGVuZHBvaW50KTtcbiAgfSxcblxuICBpc1VzYWJsZTogZnVuY3Rpb24oZGlzcGF0Y2hlciwgZW5kcG9pbnQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5jcmVhdGUoZGlzcGF0Y2hlciwgZW5kcG9pbnQpLmlzVXNhYmxlKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmFzc2lnbihXZWJTb2NrZXQucHJvdG90eXBlLCBEZWZlcnJhYmxlKTtcblxuaWYgKGJyb3dzZXIuRXZlbnQgJiYgZ2xvYmFsLm9uYmVmb3JldW5sb2FkICE9PSB1bmRlZmluZWQpIHtcbiAgYnJvd3Nlci5FdmVudC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoV2ViU29ja2V0Ll91bmxvYWRlZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgV2ViU29ja2V0Ll91bmxvYWRlZCA9IHRydWU7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENsYXNzICAgICA9IHJlcXVpcmUoJy4uL3V0aWwvY2xhc3MnKSxcbiAgICBVUkkgICAgICAgPSByZXF1aXJlKCcuLi91dGlsL3VyaScpLFxuICAgIGJyb3dzZXIgICA9IHJlcXVpcmUoJy4uL3V0aWwvYnJvd3NlcicpLFxuICAgIGFzc2lnbiAgICA9IHJlcXVpcmUoJy4uL3V0aWwvYXNzaWduJyksXG4gICAgdG9KU09OICAgID0gcmVxdWlyZSgnLi4vdXRpbC90b19qc29uJyksXG4gICAgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKTtcblxudmFyIFhIUiA9IGFzc2lnbihDbGFzcyhUcmFuc3BvcnQsIHtcbiAgZW5jb2RlOiBmdW5jdGlvbihtZXNzYWdlcykge1xuICAgIHJldHVybiB0b0pTT04obWVzc2FnZXMpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uKG1lc3NhZ2VzKSB7XG4gICAgdmFyIGhyZWYgPSB0aGlzLmVuZHBvaW50LmhyZWYsXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICB4aHI7XG5cbiAgICAvLyBQcmVmZXIgWE1MSHR0cFJlcXVlc3Qgb3ZlciBBY3RpdmVYT2JqZWN0IGlmIHRoZXkgYm90aCBleGlzdFxuICAgIGlmIChnbG9iYWwuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLkFjdGl2ZVhPYmplY3QpIHtcbiAgICAgIHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuICAgIH1cblxuICAgIHhoci5vcGVuKCdQT1NUJywgaHJlZiwgdHJ1ZSk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1ByYWdtYScsICduby1jYWNoZScpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0Jyk7XG5cbiAgICB2YXIgaGVhZGVycyA9IHRoaXMuX2Rpc3BhdGNoZXIuaGVhZGVycztcbiAgICBmb3IgKHZhciBrZXkgaW4gaGVhZGVycykge1xuICAgICAgaWYgKCFoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuICAgIH1cblxuICAgIHZhciBhYm9ydCA9IGZ1bmN0aW9uKCkgeyB4aHIuYWJvcnQoKSB9O1xuICAgIGlmIChnbG9iYWwub25iZWZvcmV1bmxvYWQgIT09IHVuZGVmaW5lZClcbiAgICAgIGJyb3dzZXIuRXZlbnQub24oZ2xvYmFsLCAnYmVmb3JldW5sb2FkJywgYWJvcnQpO1xuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF4aHIgfHwgeGhyLnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcblxuICAgICAgdmFyIHJlcGxpZXMgICAgPSBudWxsLFxuICAgICAgICAgIHN0YXR1cyAgICAgPSB4aHIuc3RhdHVzLFxuICAgICAgICAgIHRleHQgICAgICAgPSB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgIHN1Y2Nlc3NmdWwgPSAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApIHx8IHN0YXR1cyA9PT0gMzA0IHx8IHN0YXR1cyA9PT0gMTIyMztcblxuICAgICAgaWYgKGdsb2JhbC5vbmJlZm9yZXVubG9hZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBicm93c2VyLkV2ZW50LmRldGFjaChnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBhYm9ydCk7XG5cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgeGhyID0gbnVsbDtcblxuICAgICAgaWYgKCFzdWNjZXNzZnVsKSByZXR1cm4gc2VsZi5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXBsaWVzID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuXG4gICAgICBpZiAocmVwbGllcylcbiAgICAgICAgc2VsZi5fcmVjZWl2ZShyZXBsaWVzKTtcbiAgICAgIGVsc2VcbiAgICAgICAgc2VsZi5faGFuZGxlRXJyb3IobWVzc2FnZXMpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZCh0aGlzLmVuY29kZShtZXNzYWdlcykpO1xuICAgIHJldHVybiB4aHI7XG4gIH1cbn0pLCB7XG4gIGlzVXNhYmxlOiBmdW5jdGlvbihkaXNwYXRjaGVyLCBlbmRwb2ludCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgdXNhYmxlID0gKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKVxuICAgICAgICAgICAgICB8fCBVUkkuaXNTYW1lT3JpZ2luKGVuZHBvaW50KTtcblxuICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdXNhYmxlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gWEhSO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tbW9uRWxlbWVudDogZnVuY3Rpb24obGlzdGEsIGxpc3RiKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBsaXN0YS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmluZGV4T2YobGlzdGIsIGxpc3RhW2ldKSAhPT0gLTEpXG4gICAgICAgIHJldHVybiBsaXN0YVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgaW5kZXhPZjogZnVuY3Rpb24obGlzdCwgbmVlZGxlKSB7XG4gICAgaWYgKGxpc3QuaW5kZXhPZikgcmV0dXJuIGxpc3QuaW5kZXhPZihuZWVkbGUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBsaXN0Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IG5lZWRsZSkgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfSxcblxuICBtYXA6IGZ1bmN0aW9uKG9iamVjdCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAob2JqZWN0Lm1hcCkgcmV0dXJuIG9iamVjdC5tYXAoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBvYmplY3QubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNhbGxiYWNrLmNhbGwoY29udGV4dCB8fCBudWxsLCBvYmplY3RbaV0sIGkpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcbiAgICAgICAgcmVzdWx0LnB1c2goY2FsbGJhY2suY2FsbChjb250ZXh0IHx8IG51bGwsIGtleSwgb2JqZWN0W2tleV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBmaWx0ZXI6IGZ1bmN0aW9uKGFycmF5LCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmIChhcnJheS5maWx0ZXIpIHJldHVybiBhcnJheS5maWx0ZXIoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoY29udGV4dCB8fCBudWxsLCBhcnJheVtpXSwgaSkpXG4gICAgICAgIHJlc3VsdC5wdXNoKGFycmF5W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBhc3luY0VhY2g6IGZ1bmN0aW9uKGxpc3QsIGl0ZXJhdG9yLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBuICAgICAgID0gbGlzdC5sZW5ndGgsXG4gICAgICAgIGkgICAgICAgPSAtMSxcbiAgICAgICAgY2FsbHMgICA9IDAsXG4gICAgICAgIGxvb3BpbmcgPSBmYWxzZTtcblxuICAgIHZhciBpdGVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjYWxscyAtPSAxO1xuICAgICAgaSArPSAxO1xuICAgICAgaWYgKGkgPT09IG4pIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGNvbnRleHQpO1xuICAgICAgaXRlcmF0b3IobGlzdFtpXSwgcmVzdW1lKTtcbiAgICB9O1xuXG4gICAgdmFyIGxvb3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChsb29waW5nKSByZXR1cm47XG4gICAgICBsb29waW5nID0gdHJ1ZTtcbiAgICAgIHdoaWxlIChjYWxscyA+IDApIGl0ZXJhdGUoKTtcbiAgICAgIGxvb3BpbmcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFyIHJlc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbHMgKz0gMTtcbiAgICAgIGxvb3AoKTtcbiAgICB9O1xuICAgIHJlc3VtZSgpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLFxuICAgIGhhc093biAgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICBmb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbihzb3VyY2UsIGkpIHtcbiAgICBpZiAoaSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKGhhc093bi5jYWxsKHNvdXJjZSwga2V5KSkgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnQgPSB7XG4gIF9yZWdpc3RyeTogW10sXG5cbiAgb246IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgd3JhcHBlZCA9IGZ1bmN0aW9uKCkgeyBjYWxsYmFjay5jYWxsKGNvbnRleHQpIH07XG5cbiAgICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKVxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZCwgZmFsc2UpO1xuICAgIGVsc2VcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgd3JhcHBlZCk7XG5cbiAgICB0aGlzLl9yZWdpc3RyeS5wdXNoKHtcbiAgICAgIF9lbGVtZW50OiAgIGVsZW1lbnQsXG4gICAgICBfdHlwZTogICAgICBldmVudE5hbWUsXG4gICAgICBfY2FsbGJhY2s6ICBjYWxsYmFjayxcbiAgICAgIF9jb250ZXh0OiAgICAgY29udGV4dCxcbiAgICAgIF9oYW5kbGVyOiAgIHdyYXBwZWRcbiAgICB9KTtcbiAgfSxcblxuICBkZXRhY2g6IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgaSA9IHRoaXMuX3JlZ2lzdHJ5Lmxlbmd0aCwgcmVnaXN0ZXI7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcmVnaXN0ZXIgPSB0aGlzLl9yZWdpc3RyeVtpXTtcblxuICAgICAgaWYgKChlbGVtZW50ICAgICYmIGVsZW1lbnQgICAgIT09IHJlZ2lzdGVyLl9lbGVtZW50KSAgfHxcbiAgICAgICAgICAoZXZlbnROYW1lICAmJiBldmVudE5hbWUgICE9PSByZWdpc3Rlci5fdHlwZSkgICAgIHx8XG4gICAgICAgICAgKGNhbGxiYWNrICAgJiYgY2FsbGJhY2sgICAhPT0gcmVnaXN0ZXIuX2NhbGxiYWNrKSB8fFxuICAgICAgICAgIChjb250ZXh0ICAgICYmIGNvbnRleHQgICAgIT09IHJlZ2lzdGVyLl9jb250ZXh0KSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChyZWdpc3Rlci5fZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgICByZWdpc3Rlci5fZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHJlZ2lzdGVyLl90eXBlLCByZWdpc3Rlci5faGFuZGxlciwgZmFsc2UpO1xuICAgICAgZWxzZVxuICAgICAgICByZWdpc3Rlci5fZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgcmVnaXN0ZXIuX3R5cGUsIHJlZ2lzdGVyLl9oYW5kbGVyKTtcblxuICAgICAgdGhpcy5fcmVnaXN0cnkuc3BsaWNlKGksMSk7XG4gICAgICByZWdpc3RlciA9IG51bGw7XG4gICAgfVxuICB9XG59O1xuXG5pZiAoZ2xvYmFsLm9udW5sb2FkICE9PSB1bmRlZmluZWQpXG4gIEV2ZW50Lm9uKGdsb2JhbCwgJ3VubG9hZCcsIEV2ZW50LmRldGFjaCwgRXZlbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRXZlbnQ6IEV2ZW50XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXJlbnQsIG1ldGhvZHMpIHtcbiAgaWYgKHR5cGVvZiBwYXJlbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICBtZXRob2RzID0gcGFyZW50O1xuICAgIHBhcmVudCAgPSBPYmplY3Q7XG4gIH1cblxuICB2YXIga2xhc3MgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZSkgcmV0dXJuIHRoaXM7XG4gICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH07XG5cbiAgdmFyIGJyaWRnZSA9IGZ1bmN0aW9uKCkge307XG4gIGJyaWRnZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuXG4gIGtsYXNzLnByb3RvdHlwZSA9IG5ldyBicmlkZ2UoKTtcbiAgYXNzaWduKGtsYXNzLnByb3RvdHlwZSwgbWV0aG9kcyk7XG5cbiAgcmV0dXJuIGtsYXNzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBWRVJTSU9OOiAgICAgICAgICAnMS40LjAnLFxuXG4gIEJBWUVVWF9WRVJTSU9OOiAgICcxLjAnLFxuICBJRF9MRU5HVEg6ICAgICAgICAxNjAsXG4gIEpTT05QX0NBTExCQUNLOiAgICdqc29ucGNhbGxiYWNrJyxcbiAgQ09OTkVDVElPTl9UWVBFUzogWydsb25nLXBvbGxpbmcnLCAnY3Jvc3Mtb3JpZ2luLWxvbmctcG9sbGluZycsICdjYWxsYmFjay1wb2xsaW5nJywgJ3dlYnNvY2tldCcsICdldmVudHNvdXJjZScsICdpbi1wcm9jZXNzJ10sXG5cbiAgTUFOREFUT1JZX0NPTk5FQ1RJT05fVFlQRVM6IFsnbG9uZy1wb2xsaW5nJywgJ2NhbGxiYWNrLXBvbGxpbmcnLCAnaW4tcHJvY2VzcyddXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29weU9iamVjdCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgY2xvbmUsIGksIGtleTtcbiAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgY2xvbmUgPSBbXTtcbiAgICBpID0gb2JqZWN0Lmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSBjbG9uZVtpXSA9IGNvcHlPYmplY3Qob2JqZWN0W2ldKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICBjbG9uZSA9IChvYmplY3QgPT09IG51bGwpID8gbnVsbCA6IHt9O1xuICAgIGZvciAoa2V5IGluIG9iamVjdCkgY2xvbmVba2V5XSA9IGNvcHlPYmplY3Qob2JqZWN0W2tleV0pO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlPYmplY3Q7XG4iLCIvKlxuQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG50aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG50aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG51c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllc1xub2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvXG5zbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG52YXIgaXNBcnJheSA9IHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nXG4gICAgPyBBcnJheS5pc0FycmF5XG4gICAgOiBmdW5jdGlvbiAoeHMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSdcbiAgICB9XG47XG5mdW5jdGlvbiBpbmRleE9mICh4cywgeCkge1xuICAgIGlmICh4cy5pbmRleE9mKSByZXR1cm4geHMuaW5kZXhPZih4KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh4ID09PSB4c1tpXSkgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc0FycmF5KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKVxuICAgIHtcbiAgICAgIGlmIChhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBhcmd1bWVudHNbMV07IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmNhdWdodCwgdW5zcGVjaWZpZWQgJ2Vycm9yJyBldmVudC5cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiBmYWxzZTtcbiAgdmFyIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGlmICghaGFuZGxlcikgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmIChpc0FycmF5KGhhbmRsZXIpKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8vIEV2ZW50RW1pdHRlciBpcyBkZWZpbmVkIGluIHNyYy9ub2RlX2V2ZW50cy5jY1xuLy8gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0KCkgaXMgYWxzbyBkZWZpbmVkIHRoZXJlLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgbGlzdGVuZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZExpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gIH1cblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PSBcIm5ld0xpc3RlbmVyc1wiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lcnNcIi5cbiAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkodGhpcy5fZXZlbnRzW3R5cGVdKSkge1xuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLm9uKHR5cGUsIGZ1bmN0aW9uIGcoKSB7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcbiAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9KTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGxpc3RlbmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgLy8gZG9lcyBub3QgdXNlIGxpc3RlbmVycygpLCBzbyBubyBzaWRlIGVmZmVjdCBvZiBjcmVhdGluZyBfZXZlbnRzW3R5cGVdXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0FycmF5KGxpc3QpKSB7XG4gICAgdmFyIGkgPSBpbmRleE9mKGxpc3QsIGxpc3RlbmVyKTtcbiAgICBpZiAoaSA8IDApIHJldHVybiB0aGlzO1xuICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgfSBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0gPT09IGxpc3RlbmVyKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkb2VzIG5vdCB1c2UgbGlzdGVuZXJzKCksIHNvIG5vIHNpZGUgZWZmZWN0IG9mIGNyZWF0aW5nIF9ldmVudHNbdHlwZV1cbiAgaWYgKHR5cGUgJiYgdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1t0eXBlXSkgdGhpcy5fZXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHt9O1xuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgdGhpcy5fZXZlbnRzW3R5cGVdID0gW107XG4gIGlmICghaXNBcnJheSh0aGlzLl9ldmVudHNbdHlwZV0pKSB7XG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2V2ZW50c1t0eXBlXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc2FwID0gcmVxdWlyZSgnYXNhcCcpO1xuXG52YXIgUEVORElORyAgID0gLTEsXG4gICAgRlVMRklMTEVEID0gIDAsXG4gICAgUkVKRUNURUQgID0gIDE7XG5cbnZhciBQcm9taXNlID0gZnVuY3Rpb24odGFzaykge1xuICB0aGlzLl9zdGF0ZSA9IFBFTkRJTkc7XG4gIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgdGhpcy5fZGVmZXIgPSBbXTtcblxuICBleGVjdXRlKHRoaXMsIHRhc2spO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKTtcblxuICB2YXIgZGVmZXJyZWQgPSB7XG4gICAgcHJvbWlzZTogICAgIHByb21pc2UsXG4gICAgb25GdWxmaWxsZWQ6IG9uRnVsZmlsbGVkLFxuICAgIG9uUmVqZWN0ZWQ6ICBvblJlamVjdGVkXG4gIH07XG5cbiAgaWYgKHRoaXMuX3N0YXRlID09PSBQRU5ESU5HKVxuICAgIHRoaXMuX2RlZmVyLnB1c2goZGVmZXJyZWQpO1xuICBlbHNlXG4gICAgcHJvcGFnYXRlKHRoaXMsIGRlZmVycmVkKTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cblByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24ob25SZWplY3RlZCkge1xuICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xufTtcblxudmFyIGV4ZWN1dGUgPSBmdW5jdGlvbihwcm9taXNlLCB0YXNrKSB7XG4gIGlmICh0eXBlb2YgdGFzayAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuXG4gIHZhciBjYWxscyA9IDA7XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoY2FsbHMrKyA9PT0gMCkgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gIH07XG5cbiAgdmFyIHJlamVjdFByb21pc2UgPSBmdW5jdGlvbihyZWFzb24pIHtcbiAgICBpZiAoY2FsbHMrKyA9PT0gMCkgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICB0YXNrKHJlc29sdmVQcm9taXNlLCByZWplY3RQcm9taXNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3RQcm9taXNlKGVycm9yKTtcbiAgfVxufTtcblxudmFyIHByb3BhZ2F0ZSA9IGZ1bmN0aW9uKHByb21pc2UsIGRlZmVycmVkKSB7XG4gIHZhciBzdGF0ZSAgID0gcHJvbWlzZS5fc3RhdGUsXG4gICAgICB2YWx1ZSAgID0gcHJvbWlzZS5fdmFsdWUsXG4gICAgICBuZXh0ICAgID0gZGVmZXJyZWQucHJvbWlzZSxcbiAgICAgIGhhbmRsZXIgPSBbZGVmZXJyZWQub25GdWxmaWxsZWQsIGRlZmVycmVkLm9uUmVqZWN0ZWRdW3N0YXRlXSxcbiAgICAgIHBhc3MgICAgPSBbcmVzb2x2ZSwgcmVqZWN0XVtzdGF0ZV07XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBwYXNzKG5leHQsIHZhbHVlKTtcblxuICBhc2FwKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXNvbHZlKG5leHQsIGhhbmRsZXIodmFsdWUpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0KG5leHQsIGVycm9yKTtcbiAgICB9XG4gIH0pO1xufTtcblxudmFyIHJlc29sdmUgPSBmdW5jdGlvbihwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpXG4gICAgcmV0dXJuIHJlamVjdChwcm9taXNlLCBuZXcgVHlwZUVycm9yKCdSZWN1cnNpdmUgcHJvbWlzZSBjaGFpbiBkZXRlY3RlZCcpKTtcblxuICB2YXIgdGhlbjtcblxuICB0cnkge1xuICAgIHRoZW4gPSBnZXRUaGVuKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgfVxuXG4gIGlmICghdGhlbikgcmV0dXJuIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuXG4gIGV4ZWN1dGUocHJvbWlzZSwgZnVuY3Rpb24ocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpIHtcbiAgICB0aGVuLmNhbGwodmFsdWUsIHJlc29sdmVQcm9taXNlLCByZWplY3RQcm9taXNlKTtcbiAgfSk7XG59O1xuXG52YXIgZ2V0VGhlbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlLFxuICAgICAgdGhlbiA9ICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSAmJiB2YWx1ZSAmJiB2YWx1ZS50aGVuO1xuXG4gIHJldHVybiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpXG4gICAgICAgICA/IHRoZW5cbiAgICAgICAgIDogbnVsbDtcbn07XG5cbnZhciBmdWxmaWxsID0gZnVuY3Rpb24ocHJvbWlzZSwgdmFsdWUpIHtcbiAgc2V0dGxlKHByb21pc2UsIEZVTEZJTExFRCwgdmFsdWUpO1xufTtcblxudmFyIHJlamVjdCA9IGZ1bmN0aW9uKHByb21pc2UsIHJlYXNvbikge1xuICBzZXR0bGUocHJvbWlzZSwgUkVKRUNURUQsIHJlYXNvbik7XG59O1xuXG52YXIgc2V0dGxlID0gZnVuY3Rpb24ocHJvbWlzZSwgc3RhdGUsIHZhbHVlKSB7XG4gIHZhciBkZWZlciA9IHByb21pc2UuX2RlZmVyLCBpID0gMDtcblxuICBwcm9taXNlLl9zdGF0ZSA9IHN0YXRlO1xuICBwcm9taXNlLl92YWx1ZSA9IHZhbHVlO1xuICBwcm9taXNlLl9kZWZlciA9IG51bGw7XG5cbiAgaWYgKGRlZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICB3aGlsZSAoaSA8IGRlZmVyLmxlbmd0aCkgcHJvcGFnYXRlKHByb21pc2UsIGRlZmVyW2krK10pO1xufTtcblxuUHJvbWlzZS5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBpZiAoZ2V0VGhlbih2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkgeyByZXNvbHZlKHZhbHVlKSB9KTtcbn07XG5cblByb21pc2UucmVqZWN0ID0gZnVuY3Rpb24ocmVhc29uKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHsgcmVqZWN0KHJlYXNvbikgfSk7XG59O1xuXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uKHByb21pc2VzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgbGlzdCA9IFtdLCBuID0gcHJvbWlzZXMubGVuZ3RoLCBpO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiByZXNvbHZlKGxpc3QpO1xuXG4gICAgdmFyIHB1c2ggPSBmdW5jdGlvbihwcm9taXNlLCBpKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBsaXN0W2ldID0gdmFsdWU7XG4gICAgICAgIGlmICgtLW4gPT09IDApIHJlc29sdmUobGlzdCk7XG4gICAgICB9LCByZWplY3QpO1xuICAgIH07XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSBwdXNoKHByb21pc2VzW2ldLCBpKTtcbiAgfSk7XG59O1xuXG5Qcm9taXNlLnJhY2UgPSBmdW5jdGlvbihwcm9taXNlcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwcm9taXNlcy5sZW5ndGg7IGkgPCBuOyBpKyspXG4gICAgICBQcm9taXNlLnJlc29sdmUocHJvbWlzZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgfSk7XG59O1xuXG5Qcm9taXNlLmRlZmVycmVkID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0dXBsZSA9IHt9O1xuXG4gIHR1cGxlLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0dXBsZS5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB0dXBsZS5yZWplY3QgID0gcmVqZWN0O1xuICB9KTtcbiAgcmV0dXJuIHR1cGxlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2xhc3MgPSByZXF1aXJlKCcuL2NsYXNzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xhc3Moe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9pbmRleCA9IHt9O1xuICB9LFxuXG4gIGFkZDogZnVuY3Rpb24oaXRlbSkge1xuICAgIHZhciBrZXkgPSAoaXRlbS5pZCAhPT0gdW5kZWZpbmVkKSA/IGl0ZW0uaWQgOiBpdGVtO1xuICAgIGlmICh0aGlzLl9pbmRleC5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy5faW5kZXhba2V5XSA9IGl0ZW07XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgZm9yRWFjaDogZnVuY3Rpb24oYmxvY2ssIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5faW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRleC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICBibG9jay5jYWxsKGNvbnRleHQsIHRoaXMuX2luZGV4W2tleV0pO1xuICAgIH1cbiAgfSxcblxuICBpc0VtcHR5OiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5faW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRleC5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIG1lbWJlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9pbmRleCkge1xuICAgICAgaWYgKHRoaXMuX2luZGV4W2tleV0gPT09IGl0ZW0pIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgdmFyIGtleSA9IChpdGVtLmlkICE9PSB1bmRlZmluZWQpID8gaXRlbS5pZCA6IGl0ZW07XG4gICAgdmFyIHJlbW92ZWQgPSB0aGlzLl9pbmRleFtrZXldO1xuICAgIGRlbGV0ZSB0aGlzLl9pbmRleFtrZXldO1xuICAgIHJldHVybiByZW1vdmVkO1xuICB9LFxuXG4gIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7IGFycmF5LnB1c2goaXRlbSkgfSk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gaHR0cDovL2Fzc2Fua2EubmV0L2NvbnRlbnQvdGVjaC8yMDA5LzA5LzAyL2pzb24yLWpzLXZzLXByb3RvdHlwZS9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiAodGhpc1trZXldIGluc3RhbmNlb2YgQXJyYXkpID8gdGhpc1trZXldIDogdmFsdWU7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzVVJJOiBmdW5jdGlvbih1cmkpIHtcbiAgICByZXR1cm4gdXJpICYmIHVyaS5wcm90b2NvbCAmJiB1cmkuaG9zdCAmJiB1cmkucGF0aDtcbiAgfSxcblxuICBpc1NhbWVPcmlnaW46IGZ1bmN0aW9uKHVyaSkge1xuICAgIHJldHVybiB1cmkucHJvdG9jb2wgPT09IGxvY2F0aW9uLnByb3RvY29sICYmXG4gICAgICAgICAgIHVyaS5ob3N0bmFtZSA9PT0gbG9jYXRpb24uaG9zdG5hbWUgJiZcbiAgICAgICAgICAgdXJpLnBvcnQgICAgID09PSBsb2NhdGlvbi5wb3J0O1xuICB9LFxuXG4gIHBhcnNlOiBmdW5jdGlvbih1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHJldHVybiB1cmw7XG4gICAgdmFyIHVyaSA9IHt9LCBwYXJ0cywgcXVlcnksIHBhaXJzLCBpLCBuLCBkYXRhO1xuXG4gICAgdmFyIGNvbnN1bWUgPSBmdW5jdGlvbihuYW1lLCBwYXR0ZXJuKSB7XG4gICAgICB1cmwgPSB1cmwucmVwbGFjZShwYXR0ZXJuLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICB1cmlbbmFtZV0gPSBtYXRjaDtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG4gICAgICB1cmlbbmFtZV0gPSB1cmlbbmFtZV0gfHwgJyc7XG4gICAgfTtcblxuICAgIGNvbnN1bWUoJ3Byb3RvY29sJywgL15bYS16XStcXDovaSk7XG4gICAgY29uc3VtZSgnaG9zdCcsICAgICAvXlxcL1xcL1teXFwvXFw/I10rLyk7XG5cbiAgICBpZiAoIS9eXFwvLy50ZXN0KHVybCkgJiYgIXVyaS5ob3N0KVxuICAgICAgdXJsID0gbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvW15cXC9dKiQvLCAnJykgKyB1cmw7XG5cbiAgICBjb25zdW1lKCdwYXRobmFtZScsIC9eW15cXD8jXSovKTtcbiAgICBjb25zdW1lKCdzZWFyY2gnLCAgIC9eXFw/W14jXSovKTtcbiAgICBjb25zdW1lKCdoYXNoJywgICAgIC9eIy4qLyk7XG5cbiAgICB1cmkucHJvdG9jb2wgPSB1cmkucHJvdG9jb2wgfHwgbG9jYXRpb24ucHJvdG9jb2w7XG5cbiAgICBpZiAodXJpLmhvc3QpIHtcbiAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyKDIpO1xuXG4gICAgICBpZiAoL0AvLnRlc3QodXJpLmhvc3QpKSB7XG4gICAgICAgIHVyaS5hdXRoID0gdXJpLmhvc3Quc3BsaXQoJ0AnKVswXTtcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zcGxpdCgnQCcpWzFdO1xuICAgICAgfVxuICAgICAgcGFydHMgICAgICAgID0gdXJpLmhvc3QubWF0Y2goL15cXFsoW15cXF1dKylcXF18XlteOl0rLyk7XG4gICAgICB1cmkuaG9zdG5hbWUgPSBwYXJ0c1sxXSB8fCBwYXJ0c1swXTtcbiAgICAgIHVyaS5wb3J0ICAgICA9ICh1cmkuaG9zdC5tYXRjaCgvOihcXGQrKSQvKSB8fCBbXSlbMV0gfHwgJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVyaS5ob3N0ICAgICA9IGxvY2F0aW9uLmhvc3Q7XG4gICAgICB1cmkuaG9zdG5hbWUgPSBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgIHVyaS5wb3J0ICAgICA9IGxvY2F0aW9uLnBvcnQ7XG4gICAgfVxuXG4gICAgdXJpLnBhdGhuYW1lID0gdXJpLnBhdGhuYW1lIHx8ICcvJztcbiAgICB1cmkucGF0aCA9IHVyaS5wYXRobmFtZSArIHVyaS5zZWFyY2g7XG5cbiAgICBxdWVyeSA9IHVyaS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKTtcbiAgICBwYWlycyA9IHF1ZXJ5ID8gcXVlcnkuc3BsaXQoJyYnKSA6IFtdO1xuICAgIGRhdGEgID0ge307XG5cbiAgICBmb3IgKGkgPSAwLCBuID0gcGFpcnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBwYXJ0cyA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICBkYXRhW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSB8fCAnJyldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdIHx8ICcnKTtcbiAgICB9XG5cbiAgICB1cmkucXVlcnkgPSBkYXRhO1xuXG4gICAgdXJpLmhyZWYgPSB0aGlzLnN0cmluZ2lmeSh1cmkpO1xuICAgIHJldHVybiB1cmk7XG4gIH0sXG5cbiAgc3RyaW5naWZ5OiBmdW5jdGlvbih1cmkpIHtcbiAgICB2YXIgYXV0aCAgID0gdXJpLmF1dGggPyB1cmkuYXV0aCArICdAJyA6ICcnLFxuICAgICAgICBzdHJpbmcgPSB1cmkucHJvdG9jb2wgKyAnLy8nICsgYXV0aCArIHVyaS5ob3N0O1xuXG4gICAgc3RyaW5nICs9IHVyaS5wYXRobmFtZSArIHRoaXMucXVlcnlTdHJpbmcodXJpLnF1ZXJ5KSArICh1cmkuaGFzaCB8fCAnJyk7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9LFxuXG4gIHF1ZXJ5U3RyaW5nOiBmdW5jdGlvbihxdWVyeSkge1xuICAgIHZhciBwYWlycyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBxdWVyeSkge1xuICAgICAgaWYgKCFxdWVyeS5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnlba2V5XSkpO1xuICAgIH1cbiAgICBpZiAocGFpcnMubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gICAgcmV0dXJuICc/JyArIHBhaXJzLmpvaW4oJyYnKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFycmF5ID0gcmVxdWlyZSgnLi9hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMsIHZhbGlkS2V5cykge1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgIGlmIChhcnJheS5pbmRleE9mKHZhbGlkS2V5cywga2V5KSA8IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBvcHRpb246ICcgKyBrZXkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgV1MgPSBnbG9iYWwuTW96V2ViU29ja2V0IHx8IGdsb2JhbC5XZWJTb2NrZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uKHVybCwgcHJvdG9jb2xzLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBXUyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG5ldyBXUyh1cmwpO1xuICB9XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdfQ==
