/**
* immstruct v1.4.0
* Authors: Mikael Brevik, @torgeir
***************************************/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.immstruct=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Structure = _dereq_('./src/structure');

function Immstruct () {
  if (!(this instanceof Immstruct)) {
    return new Immstruct();
  }

  this.instances = {};
}

Immstruct.prototype.get = function (key, data) {
  return getInstance(this, {
    key: key,
    data: data
  });
};

Immstruct.prototype.clear = function () {
  this.instances = {};
};

Immstruct.prototype.remove = function (key) {
  return delete this.instances[key];
};

Immstruct.prototype.withHistory = function (key, data) {
  return getInstance(this, {
    key: key,
    data: data,
    history: true
  });
};

var inst = new Immstruct();

module.exports = function (key, data) {
  return getInstance(inst, {
    key: key,
    data: data
  });
};

module.exports.withHistory = function (key, data) {
  return getInstance(inst, {
    key: key,
    data: data,
    history: true
  });
};

module.exports.Structure = Structure;
module.exports.Immstruct = Immstruct;
module.exports.clear = inst.clear.bind(inst);
module.exports.remove = inst.remove.bind(inst);
Object.defineProperty(module.exports, 'instances', {
  get: function() { return inst.instances; },
  enumerable: true,
  configurable: true
});

function getInstance (obj, options) {
  if (typeof options.key === 'object') {
    options.data = options.key;
    options.key = void 0;
  }

  if (options.key && obj.instances[options.key]) {
    return obj.instances[options.key];
  }

  var newInstance = new Structure(options);
  obj.instances[newInstance.key] = newInstance;
  return newInstance;
}
},{"./src/structure":5}],2:[function(_dereq_,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
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
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
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
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

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
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

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

  if (event) delete this._events[event];
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

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],3:[function(_dereq_,module,exports){
/**
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Cursor is expected to be required in a node or other CommonJS context:
 *
 *     var Cursor = require('immutable/contrib/cursor');
 *
 * If you wish to use it in the browser, please check out Browserify or WebPack!
 */

var Immutable = (typeof window !== "undefined" ? window.Immutable : typeof global !== "undefined" ? global.Immutable : null);
var Iterable = Immutable.Iterable;
var Iterator = Iterable.Iterator;
var Seq = Immutable.Seq;
var Map = Immutable.Map;


function cursorFrom(rootData, keyPath, onChange) {
  if (arguments.length === 1) {
    keyPath = [];
  } else if (typeof keyPath === 'function') {
    onChange = keyPath;
    keyPath = [];
  } else {
    keyPath = valToKeyPath(keyPath);
  }
  return makeCursor(rootData, keyPath, onChange);
}


var KeyedCursorPrototype = Object.create(Seq.Keyed.prototype);
var IndexedCursorPrototype = Object.create(Seq.Indexed.prototype);

function KeyedCursor(rootData, keyPath, onChange, size) {
  this.size = size;
  this._rootData = rootData;
  this._keyPath = keyPath;
  this._onChange = onChange;
}
KeyedCursorPrototype.constructor = KeyedCursor;

function IndexedCursor(rootData, keyPath, onChange, size) {
  this.size = size;
  this._rootData = rootData;
  this._keyPath = keyPath;
  this._onChange = onChange;
}
IndexedCursorPrototype.constructor = IndexedCursor;

KeyedCursorPrototype.toString = function() {
  return this.__toString('Cursor {', '}');
}
IndexedCursorPrototype.toString = function() {
  return this.__toString('Cursor [', ']');
}

KeyedCursorPrototype.deref =
KeyedCursorPrototype.valueOf =
IndexedCursorPrototype.deref =
IndexedCursorPrototype.valueOf = function(notSetValue) {
  return this._rootData.getIn(this._keyPath, notSetValue);
}

KeyedCursorPrototype.get =
IndexedCursorPrototype.get = function(key, notSetValue) {
  return this.getIn([key], notSetValue);
}

KeyedCursorPrototype.getIn =
IndexedCursorPrototype.getIn = function(keyPath, notSetValue) {
  keyPath = listToKeyPath(keyPath);
  if (keyPath.length === 0) {
    return this;
  }
  var value = this._rootData.getIn(newKeyPath(this._keyPath, keyPath), NOT_SET);
  return value === NOT_SET ? notSetValue : wrappedValue(this, keyPath, value);
}

IndexedCursorPrototype.set =
KeyedCursorPrototype.set = function(key, value) {
  return updateCursor(this, function (m) { return m.set(key, value); }, [key]);
}

IndexedCursorPrototype.setIn =
KeyedCursorPrototype.setIn = Map.prototype.setIn;

KeyedCursorPrototype.remove =
KeyedCursorPrototype['delete'] =
IndexedCursorPrototype.remove =
IndexedCursorPrototype['delete'] = function(key) {
  return updateCursor(this, function (m) { return m.remove(key); }, [key]);
}

IndexedCursorPrototype.removeIn =
IndexedCursorPrototype.deleteIn =
KeyedCursorPrototype.removeIn =
KeyedCursorPrototype.deleteIn = Map.prototype.deleteIn;

KeyedCursorPrototype.clear =
IndexedCursorPrototype.clear = function() {
  return updateCursor(this, function (m) { return m.clear(); });
}

IndexedCursorPrototype.update =
KeyedCursorPrototype.update = function(keyOrFn, notSetValue, updater) {
  return arguments.length === 1 ?
    updateCursor(this, keyOrFn) :
    this.updateIn([keyOrFn], notSetValue, updater);
}

IndexedCursorPrototype.updateIn =
KeyedCursorPrototype.updateIn = function(keyPath, notSetValue, updater) {
  return updateCursor(this, function (m) {
    return m.updateIn(keyPath, notSetValue, updater);
  }, keyPath);
}

IndexedCursorPrototype.merge =
KeyedCursorPrototype.merge = function(/*...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.merge.apply(m, args);
  });
}

IndexedCursorPrototype.mergeWith =
KeyedCursorPrototype.mergeWith = function(merger/*, ...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.mergeWith.apply(m, args);
  });
}

IndexedCursorPrototype.mergeIn =
KeyedCursorPrototype.mergeIn = Map.prototype.mergeIn;

IndexedCursorPrototype.mergeDeep =
KeyedCursorPrototype.mergeDeep = function(/*...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.mergeDeep.apply(m, args);
  });
}

IndexedCursorPrototype.mergeDeepWith =
KeyedCursorPrototype.mergeDeepWith = function(merger/*, ...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.mergeDeepWith.apply(m, args);
  });
}

IndexedCursorPrototype.mergeDeepIn =
KeyedCursorPrototype.mergeDeepIn = Map.prototype.mergeDeepIn;

KeyedCursorPrototype.withMutations =
IndexedCursorPrototype.withMutations = function(fn) {
  return updateCursor(this, function (m) {
    return (m || Map()).withMutations(fn);
  });
}

KeyedCursorPrototype.cursor =
IndexedCursorPrototype.cursor = function(subKeyPath) {
  subKeyPath = valToKeyPath(subKeyPath);
  return subKeyPath.length === 0 ? this : subCursor(this, subKeyPath);
}

/**
 * All iterables need to implement __iterate
 */
KeyedCursorPrototype.__iterate =
IndexedCursorPrototype.__iterate = function(fn, reverse) {
  var cursor = this;
  var deref = cursor.deref();
  return deref && deref.__iterate ? deref.__iterate(
    function (v, k) { return fn(wrappedValue(cursor, [k], v), k, cursor); },
    reverse
  ) : 0;
}

/**
 * All iterables need to implement __iterator
 */
KeyedCursorPrototype.__iterator =
IndexedCursorPrototype.__iterator = function(type, reverse) {
  var deref = this.deref();
  var cursor = this;
  var iterator = deref && deref.__iterator &&
    deref.__iterator(Iterator.ENTRIES, reverse);
  return new Iterator(function () {
    if (!iterator) {
      return { value: undefined, done: true };
    }
    var step = iterator.next();
    if (step.done) {
      return step;
    }
    var entry = step.value;
    var k = entry[0];
    var v = wrappedValue(cursor, [k], entry[1]);
    return {
      value: type === Iterator.KEYS ? k : type === Iterator.VALUES ? v : [k, v],
      done: false
    };
  });
}

KeyedCursor.prototype = KeyedCursorPrototype;
IndexedCursor.prototype = IndexedCursorPrototype;


var NOT_SET = {}; // Sentinel value

function makeCursor(rootData, keyPath, onChange, value) {
  if (arguments.length < 4) {
    value = rootData.getIn(keyPath);
  }
  var size = value && value.size;
  var CursorClass = Iterable.isIndexed(value) ? IndexedCursor : KeyedCursor;
  return new CursorClass(rootData, keyPath, onChange, size);
}

function wrappedValue(cursor, keyPath, value) {
  return Iterable.isIterable(value) ? subCursor(cursor, keyPath, value) : value;
}

function subCursor(cursor, keyPath, value) {
  return makeCursor(
    cursor._rootData,
    newKeyPath(cursor._keyPath, keyPath),
    cursor._onChange,
    value
  );
}

function updateCursor(cursor, changeFn, changeKeyPath) {
  var deepChange = arguments.length > 2;
  var newRootData = cursor._rootData.updateIn(
    cursor._keyPath,
    deepChange ? Map() : undefined,
    changeFn
  );
  var keyPath = cursor._keyPath || [];
  var result = cursor._onChange && cursor._onChange.call(
    undefined,
    newRootData,
    cursor._rootData,
    deepChange ? newKeyPath(keyPath, changeKeyPath) : keyPath
  );
  if (result !== undefined) {
    newRootData = result;
  }
  return makeCursor(newRootData, cursor._keyPath, cursor._onChange);
}

function newKeyPath(head, tail) {
  return head.concat(listToKeyPath(tail));
}

function listToKeyPath(list) {
  return Array.isArray(list) ? list : Immutable.Iterable(list).toArray();
}

function valToKeyPath(val) {
  return Array.isArray(val) ? val :
    Iterable.isIterable(val) ? val.toArray() :
    [val];
}

exports.from = cursorFrom;

},{"immutable":undefined}],4:[function(_dereq_,module,exports){
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

},{}],5:[function(_dereq_,module,exports){
(function (global){
var Immutable = (typeof window !== "undefined" ? window.Immutable : typeof global !== "undefined" ? global.Immutable : null);
var Cursor = _dereq_('immutable/contrib/cursor');
var EventEmitter = _dereq_('eventemitter3').EventEmitter;
var inherits = _dereq_('inherits');
var utils = _dereq_('./utils');

/************************************
 *
 * ## Public API.
 *   Constructor({ history: bool, key: string, data: structure|object })
 *   .cursor(path)
 *   .reference(path)
 *   .forceHasSwapped(newData, oldData, keyPath)
 *   .undo(steps)
 *   .redo(steps)
 *   .undoUntil(structure)
 *
 ************************************/
function Structure (options) {
  var self = this;

  options = options || {};
  if (!(this instanceof Structure)) {
    return new Structure(options);
  }

  this.key = options.key || utils.generateRandomKey();

  this.current = options.data;
  if (!isImmutableStructure(this.current) || !this.current) {
    this.current = Immutable.fromJS(this.current || {});
  }

  if (!!options.history) {
    this.history = Immutable.List.of(this.current);
    this._currentRevision = 0;
  }

  this._pathListeners = [];
  this.on('swap', function (newData, oldData, keyPath) {
    listListenerMatching(self._pathListeners, pathString(keyPath)).forEach(function (fns) {
      fns.forEach(function (fn) {
        if (typeof fn !== 'function') return;
        fn(newData, oldData, keyPath);
      });
    });
  });

  EventEmitter.call(this, arguments);
}
inherits(Structure, EventEmitter);
module.exports = Structure;

Structure.prototype.cursor = function (path) {
  var self = this;
  path = path || [];

  if (!this.current) {
    throw new Error('No structure loaded.');
  }

  var changeListener = function (newRoot, oldRoot, path) {
    if(self.current === oldRoot) {
      return self.current = newRoot;
    }
    // Othewise an out-of-sync change occured. We ignore `oldRoot`, and focus on
    // changes at path `path`, and sync this to `self.current`.

    if(!hasIn(newRoot, path)) {
      return self.current = self.current.removeIn(path);
    }

    // Update an existing path or add a new path within the current map.
    return self.current = self.current.setIn(path, newRoot.getIn(path));
  };

  changeListener = handleHistory(this, changeListener);
  changeListener = handleSwap(this, changeListener);
  changeListener = handlePersisting(this, changeListener);
  return Cursor.from(self.current, path, changeListener);
};

Structure.prototype.reference = function (path) {
  if (isCursor(path) && path._keyPath) {
    path = path._keyPath;
  }
  var self = this, pathId = pathString(path);
  var listenerNs = self._pathListeners[pathId];
  var cursor = this.cursor(path);

  var changeListener = function (newRoot, oldRoot, changedPath) { cursor = self.cursor(path); };
  var referenceListeners = [changeListener];
  this._pathListeners[pathId] = !listenerNs ? referenceListeners : listenerNs.concat(changeListener);

  return {
    observe: function (eventName, newFn) {
      if (typeof eventName === 'function') {
        newFn = eventName;
        eventName = void 0;
      }
      if (this._dead || typeof newFn !== 'function') return;
      if (eventName && eventName !== 'swap') {
        newFn = onlyOnEvent(eventName, newFn);
      }

      self._pathListeners[pathId] = self._pathListeners[pathId].concat(newFn);
      referenceListeners = referenceListeners.concat(newFn);

      return function unobserve () {
        var fnIndex = self._pathListeners[pathId].indexOf(newFn);
        var localListenerIndex = referenceListeners.indexOf(newFn);

        if (referenceListeners[localListenerIndex] === newFn) {
          referenceListeners.splice(localListenerIndex, 1);
        }

        if (!self._pathListeners[pathId]) return;
        if (self._pathListeners[pathId][fnIndex] !== newFn) return;
        self._pathListeners[pathId].splice(fnIndex, 1);
      };
    },
    cursor: function (subPath) {
      if (subPath) return cursor.cursor(subPath);
      return cursor;
    },
    unobserveAll: function () {
      removeAllListenersBut(self, pathId, referenceListeners, changeListener);
      referenceListeners = [changeListener];
    },
    destroy: function () {
      removeAllListenersBut(self, pathId, referenceListeners);
      referenceListeners = void 0;
      cursor = void 0;

      this._dead = true;
      this.observe = void 0;
      this.unobserveAll = void 0;
      this.cursor = void 0;
      this.destroy = void 0;
    }
  };
};

Structure.prototype.forceHasSwapped = function (newData, oldData, keyPath) {
  this.emit('swap', newData || this.current, oldData, keyPath);
  possiblyEmitAnimationFrameEvent(this, newData || this.current, oldData, keyPath)
};

Structure.prototype.undo = function(back) {
  this._currentRevision -= back || 1;
  if (this._currentRevision < 0) {
    this._currentRevision = 0;
  }

  this.current = this.history.get(this._currentRevision);
  return this.current;
};

Structure.prototype.redo = function(head) {
  this._currentRevision += head || 1;
  if (this._currentRevision > this.history.count() - 1) {
    this._currentRevision = this.history.count() - 1;
  }

  this.current = this.history.get(this._currentRevision);
  return this.current;
};

Structure.prototype.undoUntil = function(structure) {
  this._currentRevision = this.history.indexOf(structure);
  this.current = structure;

  return structure;
};


/************************************
 * Private decorators.
 ***********************************/

// Update history if history is active
function handleHistory (emitter, fn) {
  return function (newData, oldData, path) {
    var newStructure = fn.apply(fn, arguments);
    if (!emitter.history || (newData === oldData)) return newStructure;

    emitter.history = emitter.history
      .take(++emitter._currentRevision)
      .push(emitter.current);

    return newStructure;
  };
}

// Update history if history is active
var possiblyEmitAnimationFrameEvent = (function () {
  var queuedChange = false;
  if (typeof requestAnimationFrame !== 'function') {
    return function () {};
  }

  return function requestAnimationFrameEmitter (emitter, newStructure, oldData) {
    if (queuedChange) return;
    queuedChange = true;

    requestAnimationFrame(function () {
      queuedChange = false;
      emitter.emit('next-animation-frame', newStructure, oldData);
    });
  };
}());

// Emit swap event on values are swapped
function handleSwap (emitter, fn) {
  return function (newData, oldData, keyPath) {
    var newStructure = fn.apply(fn, arguments);
    if(newData === oldData) return newStructure;

    emitter.emit('swap', newStructure, oldData, keyPath);
    possiblyEmitAnimationFrameEvent(emitter, newStructure, oldData, keyPath);

    return newStructure;
  };
}

// Map changes to update events (delete/change/add).
function handlePersisting (emitter, fn) {
  return function (newData, oldData, path) {
    var newStructure = fn.apply(fn, arguments);
    if(newData === oldData) return newStructure;
    var info = analyze(newData, oldData, path);

    if (info.eventName) {
      emitter.emit.apply(emitter, [info.eventName].concat(info.arguments));
    }
    return newStructure;
  };
}

/************************************
 * Private helpers.
 ***********************************/

function removeAllListenersBut(self, pathId, listeners, except) {
  if (!listeners) return;
  listeners.forEach(function (fn) {
    if (except && fn === except) return;
    var index = self._pathListeners[pathId].indexOf(fn);
    self._pathListeners[pathId].splice(index, 1);
  });
}

function analyze (newData, oldData, path) {
  var oldObject = oldData && oldData.getIn(path);
  var newObject = newData && newData.getIn(path);

  var inOld = oldData && hasIn(oldData, path);
  var inNew = newData && hasIn(newData, path);

  var arguments, eventName;

  if (inOld && !inNew) {
    eventName = 'delete';
    arguments = [path, oldObject];
  } else if (inOld && inNew) {
    eventName = 'change';
    arguments = [path, newObject, oldObject];
  } else if (!inOld && inNew) {
    eventName = 'add';
    arguments = [path, newObject];
  }

  return {
    eventName: eventName,
    arguments: arguments
  };
}


// Check if path exists.
var NOT_SET = {};
function hasIn(cursor, path) {
  if(cursor.hasIn) return cursor.hasIn(path);
  return cursor.getIn(path, NOT_SET) !== NOT_SET;
}

function pathString(path) {
  var topLevel = 'global';
  if (!path || !path.length) return topLevel;
  return [topLevel].concat(path).join('|');
}

function listListenerMatching (listeners, basePath) {
  var newListeners = [];
  for (var key in listeners) {
    if (!listeners.hasOwnProperty(key)) return;
    if (basePath.indexOf(key) !== 0) continue;
    newListeners.push(listeners[key]);
  }

  return newListeners;
}

function onlyOnEvent(eventName, fn) {
  return function (newData, oldData, keyPath) {
    var info = analyze(newData, oldData, keyPath);
    if (info.eventName !== eventName) return;
    return fn(newData, oldData, keyPath);
  };
}

function isCursor (potential) {
  return potential && typeof potential.deref === 'function';
}

// Check if passed structure is existing immutable structure.
// From https://github.com/facebook/immutable-js/wiki/Upgrading-to-Immutable-v3#additional-changes
function isImmutableStructure (data) {
  return immutableSafeCheck('Iterable', 'isIterable', data) ||
          immutableSafeCheck('Seq', 'isSeq', data) ||
          immutableSafeCheck('Map', 'isMap', data) ||
          immutableSafeCheck('OrderedMap', 'isOrderedMap', data) ||
          immutableSafeCheck('List', 'isList', data) ||
          immutableSafeCheck('Stack', 'isStack', data) ||
          immutableSafeCheck('Set', 'isSet', data);
}

function immutableSafeCheck (ns, method, data) {
  return Immutable[ns] && Immutable[ns][method] && Immutable[ns][method](data);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":6,"eventemitter3":2,"immutable/contrib/cursor":3,"inherits":4}],6:[function(_dereq_,module,exports){


module.exports.generateRandomKey = function (len) {
  len = len || 10;
  return Math.random().toString(36).substring(2).substring(0, len);
};

},{}]},{},[1])(1)
});