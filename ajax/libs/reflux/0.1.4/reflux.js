!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Reflux=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = {};
}

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  return Array.apply(this, this._events[event] || []);
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , length = listeners.length
    , len = arguments.length
    , fn = listeners[0]
    , args
    , i;

  if (1 === length) {
    if (fn.__EE3_once) this.removeListener(event, fn);

    switch (len) {
      case 1:
        fn.call(fn.__EE3_context || this);
      break;
      case 2:
        fn.call(fn.__EE3_context || this, a1);
      break;
      case 3:
        fn.call(fn.__EE3_context || this, a1, a2);
      break;
      case 4:
        fn.call(fn.__EE3_context || this, a1, a2, a3);
      break;
      case 5:
        fn.call(fn.__EE3_context || this, a1, a2, a3, a4);
      break;
      case 6:
        fn.call(fn.__EE3_context || this, a1, a2, a3, a4, a5);
      break;

      default:
        for (i = 1, args = new Array(len -1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        fn.apply(fn.__EE3_context || this, args);
    }
  } else {
    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    for (i = 0; i < length; fn = listeners[++i]) {
      if (fn.__EE3_once) this.removeListener(event, fn);
      fn.apply(fn.__EE3_context || this, args);
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = [];

  fn.__EE3_context = context;
  this._events[event].push(fn);

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  fn.__EE3_once = true;
  return this.on(event, fn, context);
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  for (var i = 0, length = listeners.length; i < length; i++) {
    if (fn && listeners[i] !== fn) {
      events.push(listeners[i]);
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) this._events[event] = events;
  else this._events[event] = null;

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) this._events[event] = null;
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

try { module.exports = EventEmitter; }
catch (e) {}

},{}],2:[function(_dereq_,module,exports){
module.exports = {

    /**
     * Set up the mixin before the initial rendering occurs. Event listeners
     * and callbacks should be registered once the component successfully
     * mounted (as described in the React docs).
     */
    componentWillMount: function() {
        this.subscriptions = [];
    },


    /**
     * Subscribes the given callback for action triggered
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @param {Function} callback The callback to register as event handler
     */
    listenTo: function(listenable, callback) {
        var unsubscribe = listenable.listen(callback, this);
        this.subscriptions.push(unsubscribe);
    },

    componentWillUnmount: function() {
        this.subscriptions.forEach(function(unsubscribe) {
            unsubscribe();
        });
        this.subscriptions = [];
    }
};

},{}],3:[function(_dereq_,module,exports){
var _ = _dereq_('./utils');

/**
 * Creates an action functor object
 */
module.exports = function() {

    var action = new _.EventEmitter(),
        eventLabel = "action",
        functor;

    functor = function() {
        functor.preEmit.apply(functor, arguments);
        if (functor.shouldEmit.apply(functor, arguments)) {
            action.emit(eventLabel, arguments);
        }
    };

    /**
     * Subscribes the given callback for action triggered
     *
     * @param {Function} callback The callback to register as event handler
     * @param {Mixed} [optional] bindContext The context to bind the callback with
     * @returns {Function} Callback that unsubscribes the registered event handler
     */
    functor.listen = function(callback, bindContext) {
        var eventHandler = function(args) {
            callback.apply(bindContext, args);
        };
        action.addListener(eventLabel, eventHandler);

        return function() {
            action.removeListener(eventLabel, eventHandler);
        };
    };

    /**
     * Hook used by the action functor that is invoked before emitting 
     * and before `shouldEmit`. The arguments are the ones that the action
     * is invoked with.
     */
    functor.preEmit = function() {};

    /**
     * Hook used by the action functor after `preEmit` to determine if the
     * event should be emitted with given arguments. This may be overridden
     * in your application, default implementation always returns true.
     *
     * @returns {Boolean} true if event should be emitted
     */
    functor.shouldEmit = function() { return true; };

    return functor;

};

},{"./utils":6}],4:[function(_dereq_,module,exports){
var _ = _dereq_('./utils');

/**
 * Creates an event emitting Data Store
 *
 * @param {Object} definition The data store object definition
 */
module.exports = function(definition) {
    var store = new _.EventEmitter(),
        eventLabel = "change";

    function Store() {
        if (this.init && _.isFunction(this.init)) {
            this.init();
        }
    }
    _.extend(Store.prototype, definition);
    Store.prototype.listenTo = function(listenable, callback) {
        if (!_.isFunction(listenable.listen)) {
            throw new TypeError(listenable + " is missing a listen method");
        }
        return listenable.listen(callback, this);
    };
    Store.prototype.listen = function(callback, bindContext) {
        var eventHandler = function(args) {
            callback.apply(bindContext, args);
        };
        store.addListener(eventLabel, eventHandler);

        return function() {
            store.removeListener(eventLabel, eventHandler);
        };
    };
    Store.prototype.trigger = function() {
        store.emit(eventLabel, arguments);
    };

    return new Store();
};

},{"./utils":6}],5:[function(_dereq_,module,exports){
exports.createAction = _dereq_('./createAction');

exports.createStore = _dereq_('./createStore');

exports.ListenerMixin = _dereq_('./ListenerMixin');

exports.createActions = function(actionNames) {
    var i = 0, actions = {};
    for (; i < actionNames.length; i++) {
        actions[actionNames[i]] = exports.createAction();
    }
    return actions;
};

exports.setEventEmitter = function(ctx) {
    var _ = _dereq_('./utils');
    _.EventEmitter = ctx;
};

},{"./ListenerMixin":2,"./createAction":3,"./createStore":4,"./utils":6}],6:[function(_dereq_,module,exports){
/*
 * isObject, extend and isFunction are taken from undescore/lodash in 
 * order to remove the dependency
 */

var isObject = module.exports.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

module.exports.extend = function(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            obj[prop] = source[prop];
        }
    }
    return obj;
};

module.exports.isFunction = function(value) {
    return typeof value === 'function';
};

module.exports.EventEmitter = _dereq_('eventemitter3');
},{"eventemitter3":1}]},{},[5])
(5)
});