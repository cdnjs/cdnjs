(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.peaks = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function() {
  var colors = {
    aqua:    '#7fdbff',
    blue:    '#0074d9',
    lime:    '#01ff70',
    navy:    '#001f3f',
    teal:    '#39cccc',
    olive:   '#3d9970',
    green:   '#2ecc40',
    red:     '#ff4136',
    maroon:  '#85144b',
    orange:  '#ff851b',
    purple:  '#b10dc9',
    yellow:  '#ffdc00',
    fuchsia: '#f012be',
    gray:    '#aaaaaa',
    white:   '#ffffff',
    black:   '#111111',
    silver:  '#dddddd'
  };

  if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = colors;
  } else {
    window.colors = colors;
  }
})();

},{}],2:[function(_dereq_,module,exports){
(function (process){
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this._newListener = conf.newListener);
      conf.removeListener && (this._removeListener = conf.removeListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this._newListener = false;
    this._removeListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

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

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._maxListeners > 0 &&
            tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';


  EventEmitter.prototype.once = function(event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function(event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  }

  EventEmitter.prototype.prependMany = function(event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  }

  EventEmitter.prototype._many = function(event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function(type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  }

  EventEmitter.prototype._on = function(type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    if (this._newListener)
       this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  }

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
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
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
        if (this._removeListener)
          this.emit("removeListener", type, listener);

        return this;
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
        if (this._removeListener)
          this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          if (this._removeListener)
            this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      if (this._removeListener) {
        for(i = 0, l = fns.length; i < l; i++)
          this.emit("removeListenerAny", fns[i]);
      }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type === undefined) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
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

  EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events);
  }

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

}).call(this,_dereq_('_process'))

},{"_process":61}],3:[function(_dereq_,module,exports){
(function (global){
var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

function InlineWorker(func, self) {
  var _this = this;
  var functionBody;

  self = self || {};

  if (WORKER_ENABLED) {
    functionBody = func.toString().trim().match(
      /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
    )[1];

    return new global.Worker(global.URL.createObjectURL(
      new global.Blob([ functionBody ], { type: "text/javascript" })
    ));
  }

  function postMessage(data) {
    setTimeout(function() {
      _this.onmessage({ data: data });
    }, 0);
  }

  this.self = self;
  this.self.postMessage = postMessage;

  setTimeout(func.bind(self, self), 0);
}

InlineWorker.prototype.postMessage = function postMessage(data) {
  var _this = this;

  setTimeout(function() {
    _this.self.onmessage({ data: data });
  }, 0);
};

module.exports = InlineWorker;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = _dereq_("./Global");
var now = (function () {
    if (Global_1.glob.performance && Global_1.glob.performance.now) {
        return function () {
            return Global_1.glob.performance.now();
        };
    }
    return function () {
        return new Date().getTime();
    };
})();
var Animation = (function () {
    function Animation(func, layers) {
        this.id = Animation.animIdCounter++;
        this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: now(),
            frameRate: 0
        };
        this.func = func;
        this.setLayers(layers);
    }
    Animation.prototype.setLayers = function (layers) {
        var lays = [];
        if (!layers) {
            lays = [];
        }
        else if (layers.length > 0) {
            lays = layers;
        }
        else {
            lays = [layers];
        }
        this.layers = lays;
        return this;
    };
    Animation.prototype.getLayers = function () {
        return this.layers;
    };
    Animation.prototype.addLayer = function (layer) {
        var layers = this.layers, len = layers.length, n;
        for (n = 0; n < len; n++) {
            if (layers[n]._id === layer._id) {
                return false;
            }
        }
        this.layers.push(layer);
        return true;
    };
    Animation.prototype.isRunning = function () {
        var a = Animation, animations = a.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === this.id) {
                return true;
            }
        }
        return false;
    };
    Animation.prototype.start = function () {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        Animation._addAnimation(this);
        return this;
    };
    Animation.prototype.stop = function () {
        Animation._removeAnimation(this);
        return this;
    };
    Animation.prototype._updateFrameObject = function (time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1000 / this.frame.timeDiff;
    };
    Animation._addAnimation = function (anim) {
        this.animations.push(anim);
        this._handleAnimation();
    };
    Animation._removeAnimation = function (anim) {
        var id = anim.id, animations = this.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === id) {
                this.animations.splice(n, 1);
                break;
            }
        }
    };
    Animation._runFrames = function () {
        var layerHash = {}, animations = this.animations, anim, layers, func, n, i, layersLen, layer, key, needRedraw;
        for (n = 0; n < animations.length; n++) {
            anim = animations[n];
            layers = anim.layers;
            func = anim.func;
            anim._updateFrameObject(now());
            layersLen = layers.length;
            if (func) {
                needRedraw = func.call(anim, anim.frame) !== false;
            }
            else {
                needRedraw = true;
            }
            if (!needRedraw) {
                continue;
            }
            for (i = 0; i < layersLen; i++) {
                layer = layers[i];
                if (layer._id !== undefined) {
                    layerHash[layer._id] = layer;
                }
            }
        }
        for (key in layerHash) {
            if (!layerHash.hasOwnProperty(key)) {
                continue;
            }
            layerHash[key].draw();
        }
    };
    Animation._animationLoop = function () {
        var Anim = Animation;
        if (Anim.animations.length) {
            Anim._runFrames();
            requestAnimationFrame(Anim._animationLoop);
        }
        else {
            Anim.animRunning = false;
        }
    };
    Animation._handleAnimation = function () {
        if (!this.animRunning) {
            this.animRunning = true;
            requestAnimationFrame(this._animationLoop);
        }
    };
    Animation.animations = [];
    Animation.animIdCounter = 0;
    Animation.animRunning = false;
    return Animation;
}());
exports.Animation = Animation;

},{"./Global":12}],5:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Container_1 = _dereq_("./Container");
var Node_1 = _dereq_("./Node");
var Factory_1 = _dereq_("./Factory");
var Canvas_1 = _dereq_("./Canvas");
var BaseLayer = (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer(config) {
        var _this = _super.call(this, config) || this;
        _this.canvas = new Canvas_1.SceneCanvas();
        _this._waitingForDraw = false;
        _this.on('visibleChange', _this._checkVisibility);
        _this._checkVisibility();
        _this.on('imageSmoothingEnabledChange', _this._checkSmooth);
        _this._checkSmooth();
        return _this;
    }
    BaseLayer.prototype.createPNGStream = function () {
        var c = this.canvas._canvas;
        return c.createPNGStream();
    };
    BaseLayer.prototype.getCanvas = function () {
        return this.canvas;
    };
    BaseLayer.prototype.getHitCanvas = function () {
        return this.hitCanvas;
    };
    BaseLayer.prototype.getContext = function () {
        return this.getCanvas().getContext();
    };
    BaseLayer.prototype.clear = function (bounds) {
        this.getContext().clear(bounds);
        return this;
    };
    BaseLayer.prototype.setZIndex = function (index) {
        _super.prototype.setZIndex.call(this, index);
        var stage = this.getStage();
        if (stage) {
            stage.content.removeChild(this.getCanvas()._canvas);
            if (index < stage.getChildren().length - 1) {
                stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[index + 1].getCanvas()._canvas);
            }
            else {
                stage.content.appendChild(this.getCanvas()._canvas);
            }
        }
        return this;
    };
    BaseLayer.prototype.moveToTop = function () {
        Node_1.Node.prototype.moveToTop.call(this);
        var stage = this.getStage();
        if (stage) {
            stage.content.removeChild(this.getCanvas()._canvas);
            stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
    };
    BaseLayer.prototype.moveUp = function () {
        var moved = Node_1.Node.prototype.moveUp.call(this);
        if (!moved) {
            return false;
        }
        var stage = this.getStage();
        if (!stage) {
            return false;
        }
        stage.content.removeChild(this.getCanvas()._canvas);
        if (this.index < stage.getChildren().length - 1) {
            stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[this.index + 1].getCanvas()._canvas);
        }
        else {
            stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
    };
    BaseLayer.prototype.moveDown = function () {
        if (Node_1.Node.prototype.moveDown.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.getChildren();
                stage.content.removeChild(this.getCanvas()._canvas);
                stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
            }
            return true;
        }
        return false;
    };
    BaseLayer.prototype.moveToBottom = function () {
        if (Node_1.Node.prototype.moveToBottom.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.getChildren();
                stage.content.removeChild(this.getCanvas()._canvas);
                stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
            }
            return true;
        }
        return false;
    };
    BaseLayer.prototype.getLayer = function () {
        return this;
    };
    BaseLayer.prototype.hitGraphEnabled = function () {
        return true;
    };
    BaseLayer.prototype.remove = function () {
        var _canvas = this.getCanvas()._canvas;
        Node_1.Node.prototype.remove.call(this);
        if (_canvas && _canvas.parentNode && Util_1.Util._isInDocument(_canvas)) {
            _canvas.parentNode.removeChild(_canvas);
        }
        return this;
    };
    BaseLayer.prototype.getStage = function () {
        return this.parent;
    };
    BaseLayer.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        this.canvas.setSize(width, height);
        return this;
    };
    BaseLayer.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== undefined ? config.x : this.x();
        config.y = config.y !== undefined ? config.y : this.y();
        return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
    };
    BaseLayer.prototype._checkVisibility = function () {
        var visible = this.visible();
        if (visible) {
            this.canvas._canvas.style.display = 'block';
        }
        else {
            this.canvas._canvas.style.display = 'none';
        }
    };
    BaseLayer.prototype._checkSmooth = function () {
        this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
    };
    BaseLayer.prototype.getWidth = function () {
        if (this.parent) {
            return this.parent.width();
        }
    };
    BaseLayer.prototype.setWidth = function () {
        Util_1.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
    };
    BaseLayer.prototype.getHeight = function () {
        if (this.parent) {
            return this.parent.height();
        }
    };
    BaseLayer.prototype.setHeight = function () {
        Util_1.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
    };
    BaseLayer.prototype.getIntersection = function (pos, selector) {
        return null;
    };
    BaseLayer.prototype.batchDraw = function () {
        var _this = this;
        if (!this._waitingForDraw) {
            this._waitingForDraw = true;
            Util_1.Util.requestAnimFrame(function () {
                _this.draw();
                _this._waitingForDraw = false;
            });
        }
        return this;
    };
    BaseLayer.prototype._applyTransform = function (shape, context, top) {
        var m = shape.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    };
    return BaseLayer;
}(Container_1.Container));
exports.BaseLayer = BaseLayer;
BaseLayer.prototype.nodeType = 'BaseLayer';
Factory_1.Factory.addGetterSetter(BaseLayer, 'imageSmoothingEnabled', true);
Factory_1.Factory.addGetterSetter(BaseLayer, 'clearBeforeDraw', true);
Util_1.Collection.mapMethods(BaseLayer);

},{"./Canvas":6,"./Container":7,"./Factory":10,"./Node":15,"./Util":20}],6:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Context_1 = _dereq_("./Context");
var Global_1 = _dereq_("./Global");
var Factory_1 = _dereq_("./Factory");
var Validators_1 = _dereq_("./Validators");
var _pixelRatio;
function getDevicePixelRatio() {
    if (_pixelRatio) {
        return _pixelRatio;
    }
    var canvas = Util_1.Util.createCanvasElement();
    var context = canvas.getContext('2d');
    _pixelRatio = (function () {
        var devicePixelRatio = Global_1.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
        return devicePixelRatio / backingStoreRatio;
    })();
    return _pixelRatio;
}
var Canvas = (function () {
    function Canvas(config) {
        this.pixelRatio = 1;
        this.width = 0;
        this.height = 0;
        this.isCache = false;
        var conf = config || {};
        var pixelRatio = conf.pixelRatio || Global_1.Konva.pixelRatio || getDevicePixelRatio();
        this.pixelRatio = pixelRatio;
        this._canvas = Util_1.Util.createCanvasElement();
        this._canvas.style.padding = '0';
        this._canvas.style.margin = '0';
        this._canvas.style.border = '0';
        this._canvas.style.background = 'transparent';
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = '0';
        this._canvas.style.left = '0';
    }
    Canvas.prototype.getContext = function () {
        return this.context;
    };
    Canvas.prototype.getPixelRatio = function () {
        return this.pixelRatio;
    };
    Canvas.prototype.setPixelRatio = function (pixelRatio) {
        var previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
    };
    Canvas.prototype.setWidth = function (width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.setHeight = function (height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.getWidth = function () {
        return this.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.height;
    };
    Canvas.prototype.setSize = function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };
    Canvas.prototype.toDataURL = function (mimeType, quality) {
        try {
            return this._canvas.toDataURL(mimeType, quality);
        }
        catch (e) {
            try {
                return this._canvas.toDataURL();
            }
            catch (err) {
                Util_1.Util.error('Unable to get data URL. ' + err.message);
                return '';
            }
        }
    };
    return Canvas;
}());
exports.Canvas = Canvas;
Factory_1.Factory.addGetterSetter(Canvas, 'pixelRatio', undefined, Validators_1.getNumberValidator());
var SceneCanvas = (function (_super) {
    __extends(SceneCanvas, _super);
    function SceneCanvas(config) {
        if (config === void 0) { config = { width: 0, height: 0 }; }
        var _this = _super.call(this, config) || this;
        _this.context = new Context_1.SceneContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
    }
    return SceneCanvas;
}(Canvas));
exports.SceneCanvas = SceneCanvas;
var HitCanvas = (function (_super) {
    __extends(HitCanvas, _super);
    function HitCanvas(config) {
        if (config === void 0) { config = { width: 0, height: 0 }; }
        var _this = _super.call(this, config) || this;
        _this.hitCanvas = true;
        _this.context = new Context_1.HitContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
    }
    return HitCanvas;
}(Canvas));
exports.HitCanvas = HitCanvas;

},{"./Context":8,"./Factory":10,"./Global":12,"./Util":20,"./Validators":21}],7:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Factory_1 = _dereq_("./Factory");
var Node_1 = _dereq_("./Node");
var DragAndDrop_1 = _dereq_("./DragAndDrop");
var Validators_1 = _dereq_("./Validators");
var Global_1 = _dereq_("./Global");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new Util_1.Collection();
        return _this;
    }
    Container.prototype.getChildren = function (filterFunc) {
        if (!filterFunc) {
            return this.children;
        }
        var results = new Util_1.Collection();
        this.children.each(function (child) {
            if (filterFunc(child)) {
                results.push(child);
            }
        });
        return results;
    };
    Container.prototype.hasChildren = function () {
        return this.getChildren().length > 0;
    };
    Container.prototype.removeChildren = function () {
        var child;
        for (var i = 0; i < this.children.length; i++) {
            child = this.children[i];
            child.parent = null;
            child.index = 0;
            child.remove();
        }
        this.children = new Util_1.Collection();
        return this;
    };
    Container.prototype.destroyChildren = function () {
        var child;
        for (var i = 0; i < this.children.length; i++) {
            child = this.children[i];
            child.parent = null;
            child.index = 0;
            child.destroy();
        }
        this.children = new Util_1.Collection();
        return this;
    };
    Container.prototype.add = function (child) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        if (child.getParent()) {
            child.moveTo(this);
            return this;
        }
        var children = this.children;
        this._validateAdd(child);
        child.index = children.length;
        child.parent = this;
        children.push(child);
        this._fire('add', {
            child: child
        });
        return this;
    };
    Container.prototype.destroy = function () {
        if (this.hasChildren()) {
            this.destroyChildren();
        }
        _super.prototype.destroy.call(this);
        return this;
    };
    Container.prototype.find = function (selector) {
        return this._generalFind(selector, false);
    };
    Container.prototype.get = function (selector) {
        Util_1.Util.warn('collection.get() method is deprecated. Please use collection.find() instead.');
        return this.find(selector);
    };
    Container.prototype.findOne = function (selector) {
        var result = this._generalFind(selector, true);
        return result.length > 0 ? result[0] : undefined;
    };
    Container.prototype._generalFind = function (selector, findOne) {
        var retArr = [];
        this._descendants(function (node) {
            var valid = node._isMatch(selector);
            if (valid) {
                retArr.push(node);
            }
            if (valid && findOne) {
                return true;
            }
            return false;
        });
        return Util_1.Collection.toCollection(retArr);
    };
    Container.prototype._descendants = function (fn) {
        var shouldStop = false;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            shouldStop = fn(child);
            if (shouldStop) {
                return true;
            }
            if (!child.hasChildren()) {
                continue;
            }
            shouldStop = child._descendants(fn);
            if (shouldStop) {
                return true;
            }
        }
        return false;
    };
    Container.prototype.toObject = function () {
        var obj = Node_1.Node.prototype.toObject.call(this);
        obj.children = [];
        var children = this.getChildren();
        var len = children.length;
        for (var n = 0; n < len; n++) {
            var child = children[n];
            obj.children.push(child.toObject());
        }
        return obj;
    };
    Container.prototype._getDescendants = function (arr) {
        var retArr = [];
        var len = arr.length;
        for (var n = 0; n < len; n++) {
            var node = arr[n];
            if (this.isAncestorOf(node)) {
                retArr.push(node);
            }
        }
        return retArr;
    };
    Container.prototype.isAncestorOf = function (node) {
        var parent = node.getParent();
        while (parent) {
            if (parent._id === this._id) {
                return true;
            }
            parent = parent.getParent();
        }
        return false;
    };
    Container.prototype.clone = function (obj) {
        var node = Node_1.Node.prototype.clone.call(this, obj);
        this.getChildren().each(function (no) {
            node.add(no.clone());
        });
        return node;
    };
    Container.prototype.getAllIntersections = function (pos) {
        var arr = [];
        this.find('Shape').each(function (shape) {
            if (shape.isVisible() && shape.intersects(pos)) {
                arr.push(shape);
            }
        });
        return arr;
    };
    Container.prototype._setChildrenIndices = function () {
        this.children.each(function (child, n) {
            child.index = n;
        });
    };
    Container.prototype.drawScene = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas()), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
        if (this.isVisible() || caching) {
            if (!caching && cachedSceneCanvas) {
                context.save();
                layer._applyTransform(this, context, top);
                this._drawCachedSceneCanvas(context);
                context.restore();
            }
            else {
                this._drawChildren(canvas, 'drawScene', top, false, caching, caching);
            }
        }
        return this;
    };
    Container.prototype.drawHit = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (this.shouldDrawHit(canvas) || caching) {
            if (!caching && cachedHitCanvas) {
                context.save();
                layer._applyTransform(this, context, top);
                this._drawCachedHitCanvas(context);
                context.restore();
            }
            else {
                this._drawChildren(canvas, 'drawHit', top, false, caching, caching);
            }
        }
        return this;
    };
    Container.prototype._drawChildren = function (canvas, drawMethod, top, caching, skipBuffer, skipComposition) {
        var layer = this.getLayer(), context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = (clipWidth && clipHeight) || clipFunc, clipX, clipY;
        if (hasClip && layer) {
            context.save();
            var transform = this.getAbsoluteTransform(top);
            var m = transform.getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            context.beginPath();
            if (clipFunc) {
                clipFunc.call(this, context, this);
            }
            else {
                clipX = this.clipX();
                clipY = this.clipY();
                context.rect(clipX, clipY, clipWidth, clipHeight);
            }
            context.clip();
            m = transform
                .copy()
                .invert()
                .getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        var hasComposition = this.globalCompositeOperation() !== 'source-over' && !skipComposition;
        if (hasComposition && layer) {
            context.save();
            context._applyGlobalCompositeOperation(this);
        }
        this.children.each(function (child) {
            child[drawMethod](canvas, top, caching, skipBuffer);
        });
        if (hasComposition && layer) {
            context.restore();
        }
        if (hasClip && layer) {
            context.restore();
        }
    };
    Container.prototype.shouldDrawHit = function (canvas) {
        if (canvas && canvas.isCache) {
            return true;
        }
        var layer = this.getLayer();
        var layerUnderDrag = false;
        DragAndDrop_1.DD._dragElements.forEach(function (elem) {
            if (elem.isDragging && elem.node.getLayer() === layer) {
                layerUnderDrag = true;
            }
        });
        var dragSkip = !Global_1.Konva.hitOnDragEnabled && layerUnderDrag;
        return layer && layer.hitGraphEnabled() && this.isVisible() && !dragSkip;
    };
    Container.prototype.getClientRect = function (attrs) {
        attrs = attrs || {};
        var skipTransform = attrs.skipTransform;
        var relativeTo = attrs.relativeTo;
        var minX, minY, maxX, maxY;
        var selfRect = {
            x: Infinity,
            y: Infinity,
            width: 0,
            height: 0
        };
        var that = this;
        this.children.each(function (child) {
            if (!child.visible()) {
                return;
            }
            var rect = child.getClientRect({
                relativeTo: that,
                skipShadow: attrs.skipShadow,
                skipStroke: attrs.skipStroke
            });
            if (rect.width === 0 && rect.height === 0) {
                return;
            }
            if (minX === undefined) {
                minX = rect.x;
                minY = rect.y;
                maxX = rect.x + rect.width;
                maxY = rect.y + rect.height;
            }
            else {
                minX = Math.min(minX, rect.x);
                minY = Math.min(minY, rect.y);
                maxX = Math.max(maxX, rect.x + rect.width);
                maxY = Math.max(maxY, rect.y + rect.height);
            }
        });
        var shapes = this.find('Shape');
        var hasVisible = false;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            if (shape._isVisible(this)) {
                hasVisible = true;
                break;
            }
        }
        if (hasVisible) {
            selfRect = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
        else {
            selfRect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        if (!skipTransform) {
            return this._transformedRect(selfRect, relativeTo);
        }
        return selfRect;
    };
    return Container;
}(Node_1.Node));
exports.Container = Container;
Factory_1.Factory.addComponentsGetterSetter(Container, 'clip', [
    'x',
    'y',
    'width',
    'height'
]);
Factory_1.Factory.addGetterSetter(Container, 'clipX', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipY', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipWidth', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipHeight', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipFunc');
Util_1.Collection.mapMethods(Container);

},{"./DragAndDrop":9,"./Factory":10,"./Global":12,"./Node":15,"./Util":20,"./Validators":21}],8:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Global_1 = _dereq_("./Global");
var COMMA = ',', OPEN_PAREN = '(', CLOSE_PAREN = ')', OPEN_PAREN_BRACKET = '([', CLOSE_BRACKET_PAREN = '])', SEMICOLON = ';', DOUBLE_PAREN = '()', EQUALS = '=', CONTEXT_METHODS = [
    'arc',
    'arcTo',
    'beginPath',
    'bezierCurveTo',
    'clearRect',
    'clip',
    'closePath',
    'createLinearGradient',
    'createPattern',
    'createRadialGradient',
    'drawImage',
    'ellipse',
    'fill',
    'fillText',
    'getImageData',
    'createImageData',
    'lineTo',
    'moveTo',
    'putImageData',
    'quadraticCurveTo',
    'rect',
    'restore',
    'rotate',
    'save',
    'scale',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeText',
    'transform',
    'translate'
];
var CONTEXT_PROPERTIES = [
    'fillStyle',
    'strokeStyle',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'font',
    'textAlign',
    'textBaseline',
    'globalAlpha',
    'globalCompositeOperation',
    'imageSmoothingEnabled'
];
var traceArrMax = 100;
var Context = (function () {
    function Context(canvas) {
        this.canvas = canvas;
        this._context = canvas._canvas.getContext('2d');
        if (Global_1.Konva.enableTrace) {
            this.traceArr = [];
            this._enableTrace();
        }
    }
    Context.prototype.fillShape = function (shape) {
        if (shape.getFillEnabled()) {
            this._fill(shape);
        }
    };
    Context.prototype._fill = function (shape) {
    };
    Context.prototype.strokeShape = function (shape) {
        if (shape.getStrokeEnabled()) {
            this._stroke(shape);
        }
    };
    Context.prototype._stroke = function (shape) {
    };
    Context.prototype.fillStrokeShape = function (shape) {
        if (shape.getFillEnabled()) {
            this._fill(shape);
        }
        if (shape.getStrokeEnabled()) {
            this._stroke(shape);
        }
    };
    Context.prototype.getTrace = function (relaxed) {
        var traceArr = this.traceArr, len = traceArr.length, str = '', n, trace, method, args;
        for (n = 0; n < len; n++) {
            trace = traceArr[n];
            method = trace.method;
            if (method) {
                args = trace.args;
                str += method;
                if (relaxed) {
                    str += DOUBLE_PAREN;
                }
                else {
                    if (Util_1.Util._isArray(args[0])) {
                        str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
                    }
                    else {
                        str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
                    }
                }
            }
            else {
                str += trace.property;
                if (!relaxed) {
                    str += EQUALS + trace.val;
                }
            }
            str += SEMICOLON;
        }
        return str;
    };
    Context.prototype.clearTrace = function () {
        this.traceArr = [];
    };
    Context.prototype._trace = function (str) {
        var traceArr = this.traceArr, len;
        traceArr.push(str);
        len = traceArr.length;
        if (len >= traceArrMax) {
            traceArr.shift();
        }
    };
    Context.prototype.reset = function () {
        var pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    };
    Context.prototype.getCanvas = function () {
        return this.canvas;
    };
    Context.prototype.clear = function (bounds) {
        var canvas = this.getCanvas();
        if (bounds) {
            this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        }
        else {
            this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
    };
    Context.prototype._applyLineCap = function (shape) {
        var lineCap = shape.getLineCap();
        if (lineCap) {
            this.setAttr('lineCap', lineCap);
        }
    };
    Context.prototype._applyOpacity = function (shape) {
        var absOpacity = shape.getAbsoluteOpacity();
        if (absOpacity !== 1) {
            this.setAttr('globalAlpha', absOpacity);
        }
    };
    Context.prototype._applyLineJoin = function (shape) {
        var lineJoin = shape.getLineJoin();
        if (lineJoin) {
            this.setAttr('lineJoin', lineJoin);
        }
    };
    Context.prototype.setAttr = function (attr, val) {
        this._context[attr] = val;
    };
    Context.prototype.arc = function (a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.arcTo = function (a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.beginPath = function () {
        this._context.beginPath();
    };
    Context.prototype.bezierCurveTo = function (a0, a1, a2, a3, a4, a5) {
        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.clearRect = function (a0, a1, a2, a3) {
        this._context.clearRect(a0, a1, a2, a3);
    };
    Context.prototype.clip = function () {
        this._context.clip();
    };
    Context.prototype.closePath = function () {
        this._context.closePath();
    };
    Context.prototype.createImageData = function (a0, a1) {
        var a = arguments;
        if (a.length === 2) {
            return this._context.createImageData(a0, a1);
        }
        else if (a.length === 1) {
            return this._context.createImageData(a0);
        }
    };
    Context.prototype.createLinearGradient = function (a0, a1, a2, a3) {
        return this._context.createLinearGradient(a0, a1, a2, a3);
    };
    Context.prototype.createPattern = function (a0, a1) {
        return this._context.createPattern(a0, a1);
    };
    Context.prototype.createRadialGradient = function (a0, a1, a2, a3, a4, a5) {
        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.drawImage = function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        var a = arguments, _context = this._context;
        if (a.length === 3) {
            _context.drawImage(a0, a1, a2);
        }
        else if (a.length === 5) {
            _context.drawImage(a0, a1, a2, a3, a4);
        }
        else if (a.length === 9) {
            _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        }
    };
    Context.prototype.ellipse = function (a0, a1, a2, a3, a4, a5, a6, a7) {
        this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
    };
    Context.prototype.isPointInPath = function (x, y) {
        return this._context.isPointInPath(x, y);
    };
    Context.prototype.fill = function () {
        this._context.fill();
    };
    Context.prototype.fillRect = function (x, y, width, height) {
        this._context.fillRect(x, y, width, height);
    };
    Context.prototype.strokeRect = function (x, y, width, height) {
        this._context.strokeRect(x, y, width, height);
    };
    Context.prototype.fillText = function (a0, a1, a2) {
        this._context.fillText(a0, a1, a2);
    };
    Context.prototype.measureText = function (text) {
        return this._context.measureText(text);
    };
    Context.prototype.getImageData = function (a0, a1, a2, a3) {
        return this._context.getImageData(a0, a1, a2, a3);
    };
    Context.prototype.lineTo = function (a0, a1) {
        this._context.lineTo(a0, a1);
    };
    Context.prototype.moveTo = function (a0, a1) {
        this._context.moveTo(a0, a1);
    };
    Context.prototype.rect = function (a0, a1, a2, a3) {
        this._context.rect(a0, a1, a2, a3);
    };
    Context.prototype.putImageData = function (a0, a1, a2) {
        this._context.putImageData(a0, a1, a2);
    };
    Context.prototype.quadraticCurveTo = function (a0, a1, a2, a3) {
        this._context.quadraticCurveTo(a0, a1, a2, a3);
    };
    Context.prototype.restore = function () {
        this._context.restore();
    };
    Context.prototype.rotate = function (a0) {
        this._context.rotate(a0);
    };
    Context.prototype.save = function () {
        this._context.save();
    };
    Context.prototype.scale = function (a0, a1) {
        this._context.scale(a0, a1);
    };
    Context.prototype.setLineDash = function (a0) {
        if (this._context.setLineDash) {
            this._context.setLineDash(a0);
        }
        else if ('mozDash' in this._context) {
            this._context['mozDash'] = a0;
        }
        else if ('webkitLineDash' in this._context) {
            this._context['webkitLineDash'] = a0;
        }
    };
    Context.prototype.getLineDash = function () {
        return this._context.getLineDash();
    };
    Context.prototype.setTransform = function (a0, a1, a2, a3, a4, a5) {
        this._context.setTransform(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.stroke = function () {
        this._context.stroke();
    };
    Context.prototype.strokeText = function (a0, a1, a2, a3) {
        this._context.strokeText(a0, a1, a2, a3);
    };
    Context.prototype.transform = function (a0, a1, a2, a3, a4, a5) {
        this._context.transform(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.translate = function (a0, a1) {
        this._context.translate(a0, a1);
    };
    Context.prototype._enableTrace = function () {
        var that = this, len = CONTEXT_METHODS.length, _simplifyArray = Util_1.Util._simplifyArray, origSetter = this.setAttr, n, args;
        var func = function (methodName) {
            var origMethod = that[methodName], ret;
            that[methodName] = function () {
                args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
                ret = origMethod.apply(that, arguments);
                that._trace({
                    method: methodName,
                    args: args
                });
                return ret;
            };
        };
        for (n = 0; n < len; n++) {
            func(CONTEXT_METHODS[n]);
        }
        that.setAttr = function () {
            origSetter.apply(that, arguments);
            var prop = arguments[0];
            var val = arguments[1];
            if (prop === 'shadowOffsetX' ||
                prop === 'shadowOffsetY' ||
                prop === 'shadowBlur') {
                val = val / this.canvas.getPixelRatio();
            }
            that._trace({
                property: prop,
                val: val
            });
        };
    };
    Context.prototype._applyGlobalCompositeOperation = function (node) {
        var globalCompositeOperation = node.getGlobalCompositeOperation();
        if (globalCompositeOperation !== 'source-over') {
            this.setAttr('globalCompositeOperation', globalCompositeOperation);
        }
    };
    return Context;
}());
exports.Context = Context;
CONTEXT_PROPERTIES.forEach(function (prop) {
    Object.defineProperty(Context.prototype, prop, {
        get: function () {
            return this._context[prop];
        },
        set: function (val) {
            this._context[prop] = val;
        }
    });
});
var SceneContext = (function (_super) {
    __extends(SceneContext, _super);
    function SceneContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneContext.prototype._fillColor = function (shape) {
        var fill = shape.fill();
        this.setAttr('fillStyle', fill);
        shape._fillFunc(this);
    };
    SceneContext.prototype._fillPattern = function (shape) {
        var fillPatternX = shape.getFillPatternX(), fillPatternY = shape.getFillPatternY(), fillPatternScaleX = shape.getFillPatternScaleX(), fillPatternScaleY = shape.getFillPatternScaleY(), fillPatternRotation = Global_1.Konva.getAngle(shape.getFillPatternRotation()), fillPatternOffsetX = shape.getFillPatternOffsetX(), fillPatternOffsetY = shape.getFillPatternOffsetY();
        if (fillPatternX || fillPatternY) {
            this.translate(fillPatternX || 0, fillPatternY || 0);
        }
        if (fillPatternRotation) {
            this.rotate(fillPatternRotation);
        }
        if (fillPatternScaleX || fillPatternScaleY) {
            this.scale(fillPatternScaleX, fillPatternScaleY);
        }
        if (fillPatternOffsetX || fillPatternOffsetY) {
            this.translate(-1 * fillPatternOffsetX, -1 * fillPatternOffsetY);
        }
        this.setAttr('fillStyle', shape._getFillPattern());
        shape._fillFunc(this);
    };
    SceneContext.prototype._fillLinearGradient = function (shape) {
        var grd = shape._getLinearGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    };
    SceneContext.prototype._fillRadialGradient = function (shape) {
        var grd = shape._getRadialGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    };
    SceneContext.prototype._fill = function (shape) {
        var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
        if (hasColor && fillPriority === 'color') {
            this._fillColor(shape);
            return;
        }
        var hasPattern = shape.getFillPatternImage();
        if (hasPattern && fillPriority === 'pattern') {
            this._fillPattern(shape);
            return;
        }
        var hasLinearGradient = shape.getFillLinearGradientColorStops();
        if (hasLinearGradient && fillPriority === 'linear-gradient') {
            this._fillLinearGradient(shape);
            return;
        }
        var hasRadialGradient = shape.getFillRadialGradientColorStops();
        if (hasRadialGradient && fillPriority === 'radial-gradient') {
            this._fillRadialGradient(shape);
            return;
        }
        if (hasColor) {
            this._fillColor(shape);
        }
        else if (hasPattern) {
            this._fillPattern(shape);
        }
        else if (hasLinearGradient) {
            this._fillLinearGradient(shape);
        }
        else if (hasRadialGradient) {
            this._fillRadialGradient(shape);
        }
    };
    SceneContext.prototype._strokeLinearGradient = function (shape) {
        var start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
        if (colorStops) {
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            this.setAttr('strokeStyle', grd);
        }
    };
    SceneContext.prototype._stroke = function (shape) {
        var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (shape.hasStroke()) {
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            if (dash && shape.dashEnabled()) {
                this.setLineDash(dash);
                this.setAttr('lineDashOffset', shape.dashOffset());
            }
            this.setAttr('lineWidth', shape.strokeWidth());
            if (!shape.getShadowForStrokeEnabled()) {
                this.setAttr('shadowColor', 'rgba(0,0,0,0)');
            }
            var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
            if (hasLinearGradient) {
                this._strokeLinearGradient(shape);
            }
            else {
                this.setAttr('strokeStyle', shape.stroke());
            }
            shape._strokeFunc(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    };
    SceneContext.prototype._applyShadow = function (shape) {
        var util = Util_1.Util, color = util.get(shape.getShadowRGBA(), 'black'), blur = util.get(shape.getShadowBlur(), 5), offset = util.get(shape.getShadowOffset(), {
            x: 0,
            y: 0
        }), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
        this.setAttr('shadowColor', color);
        this.setAttr('shadowBlur', blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr('shadowOffsetX', offset.x * scaleX);
        this.setAttr('shadowOffsetY', offset.y * scaleY);
    };
    return SceneContext;
}(Context));
exports.SceneContext = SceneContext;
var HitContext = (function (_super) {
    __extends(HitContext, _super);
    function HitContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HitContext.prototype._fill = function (shape) {
        this.save();
        this.setAttr('fillStyle', shape.colorKey);
        shape._fillFuncHit(this);
        this.restore();
    };
    HitContext.prototype._stroke = function (shape) {
        if (shape.hasStroke() && shape.hitStrokeWidth()) {
            var strokeScaleEnabled = shape.getStrokeScaleEnabled();
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            var hitStrokeWidth = shape.hitStrokeWidth();
            var strokeWidth = hitStrokeWidth === 'auto' ? shape.strokeWidth() : hitStrokeWidth;
            this.setAttr('lineWidth', strokeWidth);
            this.setAttr('strokeStyle', shape.colorKey);
            shape._strokeFuncHit(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    };
    return HitContext;
}(Context));
exports.HitContext = HitContext;

},{"./Global":12,"./Util":20}],9:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = _dereq_("./Global");
var Util_1 = _dereq_("./Util");
exports.DD = {
    get isDragging() {
        var flag = false;
        exports.DD._dragElements.forEach(function (elem) {
            if (elem.isDragging) {
                flag = true;
            }
        });
        return flag;
    },
    justDragged: false,
    get node() {
        var node;
        exports.DD._dragElements.forEach(function (elem) {
            node = elem.node;
        });
        return node;
    },
    _dragElements: new Map(),
    _drag: function (evt) {
        exports.DD._dragElements.forEach(function (elem, key) {
            var node = elem.node;
            var stage = node.getStage();
            stage.setPointersPositions(evt);
            if (elem.pointerId === undefined) {
                elem.pointerId = Util_1.Util._getFirstPointerId(evt);
            }
            var pos = stage._changedPointerPositions.find(function (pos) { return pos.id === elem.pointerId; });
            if (!pos) {
                return;
            }
            if (!elem.isDragging) {
                var dragDistance = node.dragDistance();
                var distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
                if (distance < dragDistance) {
                    return;
                }
                elem.isDragging = true;
                node.fire('dragstart', {
                    type: 'dragstart',
                    target: node,
                    evt: evt
                }, true);
                if (!node.isDragging()) {
                    return;
                }
            }
            node._setDragPosition(evt, elem);
            node.fire('dragmove', {
                type: 'dragmove',
                target: node,
                evt: evt
            }, true);
        });
    },
    _endDragBefore: function (evt) {
        exports.DD._dragElements.forEach(function (elem, key) {
            var node = elem.node;
            var stage = node.getStage();
            stage.setPointersPositions(evt);
            var pos = stage._changedPointerPositions.find(function (pos) { return pos.id === elem.pointerId; });
            if (!pos) {
                return;
            }
            if (elem.isDragging) {
                exports.DD.justDragged = true;
                Global_1.Konva.listenClickTap = false;
            }
            elem.dragStopped = true;
            elem.isDragging = false;
            var drawNode = elem.node.getLayer() ||
                (elem.node instanceof Global_1.Konva['Stage'] && elem.node);
            if (drawNode) {
                drawNode.draw();
            }
        });
    },
    _endDragAfter: function (evt) {
        exports.DD._dragElements.forEach(function (elem, key) {
            if (elem.dragStopped) {
                elem.node.fire('dragend', {
                    type: 'dragend',
                    target: elem.node,
                    evt: evt
                }, true);
                exports.DD._dragElements.delete(key);
            }
        });
    }
};
if (Global_1.Konva.isBrowser) {
    window.addEventListener('mouseup', exports.DD._endDragBefore, true);
    window.addEventListener('touchend', exports.DD._endDragBefore, true);
    window.addEventListener('mousemove', exports.DD._drag);
    window.addEventListener('touchmove', exports.DD._drag);
    window.addEventListener('mouseup', exports.DD._endDragAfter, false);
    window.addEventListener('touchend', exports.DD._endDragAfter, false);
}

},{"./Global":12,"./Util":20}],10:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Validators_1 = _dereq_("./Validators");
var GET = 'get', SET = 'set';
exports.Factory = {
    addGetterSetter: function (constructor, attr, def, validator, after) {
        this.addGetter(constructor, attr, def);
        this.addSetter(constructor, attr, validator, after);
        this.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function (constructor, attr, def) {
        var method = GET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] =
            constructor.prototype[method] ||
                function () {
                    var val = this.attrs[attr];
                    return val === undefined ? def : val;
                };
    },
    addSetter: function (constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        if (!constructor.prototype[method]) {
            exports.Factory.overWriteSetter(constructor, attr, validator, after);
        }
    },
    overWriteSetter: function (constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = function (val) {
            if (validator && val !== undefined && val !== null) {
                val = validator.call(this, val, attr);
            }
            this._setAttr(attr, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
    },
    addComponentsGetterSetter: function (constructor, attr, components, validator, after) {
        var len = components.length, capitalize = Util_1.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n, component;
        constructor.prototype[getter] = function () {
            var ret = {};
            for (n = 0; n < len; n++) {
                component = components[n];
                ret[component] = this.getAttr(attr + capitalize(component));
            }
            return ret;
        };
        var basicValidator = Validators_1.getComponentValidator(components);
        constructor.prototype[setter] = function (val) {
            var oldVal = this.attrs[attr], key;
            if (validator) {
                val = validator.call(this, val);
            }
            if (basicValidator) {
                basicValidator.call(this, val, attr);
            }
            for (key in val) {
                if (!val.hasOwnProperty(key)) {
                    continue;
                }
                this._setAttr(attr + capitalize(key), val[key]);
            }
            this._fireChangeEvent(attr, oldVal, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
        this.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function (constructor, attr) {
        var capitalizedAttr = Util_1.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
        constructor.prototype[attr] = function () {
            if (arguments.length) {
                this[setter](arguments[0]);
                return this;
            }
            return this[getter]();
        };
    },
    addDeprecatedGetterSetter: function (constructor, attr, def, validator) {
        Util_1.Util.error('Adding deprecated ' + attr);
        var method = GET + Util_1.Util._capitalize(attr);
        var message = attr +
            ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
        constructor.prototype[method] = function () {
            Util_1.Util.error(message);
            var val = this.attrs[attr];
            return val === undefined ? def : val;
        };
        this.addSetter(constructor, attr, validator, function () {
            Util_1.Util.error(message);
        });
        this.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function (constructor, methods) {
        Util_1.Util.each(methods, function (oldMethodName, newMethodName) {
            var method = constructor.prototype[newMethodName];
            var oldGetter = GET + Util_1.Util._capitalize(oldMethodName);
            var oldSetter = SET + Util_1.Util._capitalize(oldMethodName);
            function deprecated() {
                method.apply(this, arguments);
                Util_1.Util.error('"' +
                    oldMethodName +
                    '" method is deprecated and will be removed soon. Use ""' +
                    newMethodName +
                    '" instead.');
            }
            constructor.prototype[oldMethodName] = deprecated;
            constructor.prototype[oldGetter] = deprecated;
            constructor.prototype[oldSetter] = deprecated;
        });
    },
    afterSetFilter: function () {
        this._filterUpToDate = false;
    }
};

},{"./Util":20,"./Validators":21}],11:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Container_1 = _dereq_("./Container");
var BaseLayer_1 = _dereq_("./BaseLayer");
var Global_1 = _dereq_("./Global");
var FastLayer = (function (_super) {
    __extends(FastLayer, _super);
    function FastLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastLayer.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Shape') {
            Util_1.Util.throw('You may only add shapes to a fast layer.');
        }
    };
    FastLayer.prototype._setCanvasSize = function (width, height) {
        this.canvas.setSize(width, height);
        this._checkSmooth();
    };
    FastLayer.prototype.hitGraphEnabled = function () {
        return false;
    };
    FastLayer.prototype.drawScene = function (can) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
        if (this.clearBeforeDraw()) {
            canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas);
        return this;
    };
    FastLayer.prototype.draw = function () {
        this.drawScene();
        return this;
    };
    return FastLayer;
}(BaseLayer_1.BaseLayer));
exports.FastLayer = FastLayer;
FastLayer.prototype.nodeType = 'FastLayer';
Global_1._registerNode(FastLayer);
Util_1.Collection.mapMethods(FastLayer);

},{"./BaseLayer":5,"./Container":7,"./Global":12,"./Util":20}],12:[function(_dereq_,module,exports){
(function (global){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PI_OVER_180 = Math.PI / 180;
function detectBrowser() {
    return (typeof window !== 'undefined' &&
        ({}.toString.call(window) === '[object Window]' ||
            {}.toString.call(window) === '[object global]'));
}
var _detectIE = function (ua) {
    var msie = ua.indexOf('msie ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
};
exports._parseUA = function (userAgent) {
    var ua = userAgent.toLowerCase(), match = /(chrome)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        (ua.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
        [], mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), ieMobile = !!userAgent.match(/IEMobile/i);
    return {
        browser: match[1] || '',
        version: match[2] || '0',
        isIE: _detectIE(ua),
        mobile: mobile,
        ieMobile: ieMobile
    };
};
exports.glob = typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined'
            ? self
            : {};
exports.Konva = {
    _global: exports.glob,
    version: '4.0.4',
    isBrowser: detectBrowser(),
    isUnminified: /param/.test(function (param) { }.toString()),
    dblClickWindow: 400,
    getAngle: function (angle) {
        return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
    },
    enableTrace: false,
    _pointerEventsEnabled: false,
    hitOnDragEnabled: false,
    captureTouchEventsEnabled: false,
    listenClickTap: false,
    inDblClickWindow: false,
    pixelRatio: undefined,
    dragDistance: 3,
    angleDeg: true,
    showWarnings: true,
    dragButtons: [0, 1],
    isDragging: function () {
        return exports.Konva['DD'].isDragging;
    },
    isDragReady: function () {
        return !!exports.Konva['DD'].node;
    },
    UA: exports._parseUA((exports.glob.navigator && exports.glob.navigator.userAgent) || ''),
    document: exports.glob.document,
    _injectGlobal: function (Konva) {
        exports.glob.Konva = Konva;
    },
    _parseUA: exports._parseUA
};
exports._NODES_REGISTRY = {};
exports._registerNode = function (NodeClass) {
    exports._NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass;
    exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],13:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Container_1 = _dereq_("./Container");
var Global_1 = _dereq_("./Global");
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            Util_1.Util.throw('You may only add groups and shapes to groups.');
        }
    };
    return Group;
}(Container_1.Container));
exports.Group = Group;
Group.prototype.nodeType = 'Group';
Global_1._registerNode(Group);
Util_1.Collection.mapMethods(Group);

},{"./Container":7,"./Global":12,"./Util":20}],14:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Container_1 = _dereq_("./Container");
var Factory_1 = _dereq_("./Factory");
var BaseLayer_1 = _dereq_("./BaseLayer");
var Canvas_1 = _dereq_("./Canvas");
var Shape_1 = _dereq_("./Shape");
var Validators_1 = _dereq_("./Validators");
var Global_1 = _dereq_("./Global");
var HASH = '#', BEFORE_DRAW = 'beforeDraw', DRAW = 'draw', INTERSECTION_OFFSETS = [
    { x: 0, y: 0 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 }
], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hitCanvas = new Canvas_1.HitCanvas({
            pixelRatio: 1
        });
        return _this;
    }
    Layer.prototype._setCanvasSize = function (width, height) {
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);
        this._checkSmooth();
    };
    Layer.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            Util_1.Util.throw('You may only add groups and shapes to a layer.');
        }
    };
    Layer.prototype.getIntersection = function (pos, selector) {
        var obj, i, intersectionOffset, shape;
        if (!this.hitGraphEnabled() || !this.isVisible()) {
            return null;
        }
        var spiralSearchDistance = 1;
        var continueSearch = false;
        while (true) {
            for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
                intersectionOffset = INTERSECTION_OFFSETS[i];
                obj = this._getIntersection({
                    x: pos.x + intersectionOffset.x * spiralSearchDistance,
                    y: pos.y + intersectionOffset.y * spiralSearchDistance
                });
                shape = obj.shape;
                if (shape && selector) {
                    return shape.findAncestor(selector, true);
                }
                else if (shape) {
                    return shape;
                }
                continueSearch = !!obj.antialiased;
                if (!obj.antialiased) {
                    break;
                }
            }
            if (continueSearch) {
                spiralSearchDistance += 1;
            }
            else {
                return null;
            }
        }
    };
    Layer.prototype._getIntersection = function (pos) {
        var ratio = this.hitCanvas.pixelRatio;
        var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data, p3 = p[3], colorKey, shape;
        if (p3 === 255) {
            colorKey = Util_1.Util._rgbToHex(p[0], p[1], p[2]);
            shape = Shape_1.shapes[HASH + colorKey];
            if (shape) {
                return {
                    shape: shape
                };
            }
            return {
                antialiased: true
            };
        }
        else if (p3 > 0) {
            return {
                antialiased: true
            };
        }
        return {};
    };
    Layer.prototype.drawScene = function (can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
        this._fire(BEFORE_DRAW, {
            node: this
        });
        if (this.clearBeforeDraw()) {
            canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas, top);
        this._fire(DRAW, {
            node: this
        });
        return this;
    };
    Layer.prototype.drawHit = function (can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);
        if (layer && layer.clearBeforeDraw()) {
            layer
                .getHitCanvas()
                .getContext()
                .clear();
        }
        Container_1.Container.prototype.drawHit.call(this, canvas, top);
        return this;
    };
    Layer.prototype.clear = function (bounds) {
        BaseLayer_1.BaseLayer.prototype.clear.call(this, bounds);
        this.getHitCanvas()
            .getContext()
            .clear(bounds);
        return this;
    };
    Layer.prototype.enableHitGraph = function () {
        this.hitGraphEnabled(true);
        return this;
    };
    Layer.prototype.disableHitGraph = function () {
        this.hitGraphEnabled(false);
        return this;
    };
    Layer.prototype.toggleHitCanvas = function () {
        if (!this.parent) {
            return;
        }
        var parent = this.parent;
        var added = !!this.hitCanvas._canvas.parentNode;
        if (added) {
            parent.content.removeChild(this.hitCanvas._canvas);
        }
        else {
            parent.content.appendChild(this.hitCanvas._canvas);
        }
    };
    Layer.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        _super.prototype.setSize.call(this, { width: width, height: height });
        this.hitCanvas.setSize(width, height);
        return this;
    };
    return Layer;
}(BaseLayer_1.BaseLayer));
exports.Layer = Layer;
Layer.prototype.nodeType = 'Layer';
Global_1._registerNode(Layer);
Factory_1.Factory.addGetterSetter(Layer, 'hitGraphEnabled', true, Validators_1.getBooleanValidator());
Util_1.Collection.mapMethods(Layer);

},{"./BaseLayer":5,"./Canvas":6,"./Container":7,"./Factory":10,"./Global":12,"./Shape":17,"./Util":20,"./Validators":21}],15:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Factory_1 = _dereq_("./Factory");
var Canvas_1 = _dereq_("./Canvas");
var Global_1 = _dereq_("./Global");
var DragAndDrop_1 = _dereq_("./DragAndDrop");
var Validators_1 = _dereq_("./Validators");
exports.ids = {};
exports.names = {};
var _addId = function (node, id) {
    if (!id) {
        return;
    }
    exports.ids[id] = node;
};
exports._removeId = function (id, node) {
    if (!id) {
        return;
    }
    if (exports.ids[id] !== node) {
        return;
    }
    delete exports.ids[id];
};
exports._addName = function (node, name) {
    if (name) {
        if (!exports.names[name]) {
            exports.names[name] = [];
        }
        exports.names[name].push(node);
    }
};
exports._removeName = function (name, _id) {
    if (!name) {
        return;
    }
    var nodes = exports.names[name];
    if (!nodes) {
        return;
    }
    for (var n = 0; n < nodes.length; n++) {
        var no = nodes[n];
        if (no._id === _id) {
            nodes.splice(n, 1);
        }
    }
    if (nodes.length === 0) {
        delete exports.names[name];
    }
};
var ABSOLUTE_OPACITY = 'absoluteOpacity', ABSOLUTE_TRANSFORM = 'absoluteTransform', ABSOLUTE_SCALE = 'absoluteScale', CANVAS = 'canvas', CHANGE = 'Change', CHILDREN = 'children', KONVA = 'konva', LISTENING = 'listening', MOUSEENTER = 'mouseenter', MOUSELEAVE = 'mouseleave', NAME = 'name', SET = 'set', SHAPE = 'Shape', SPACE = ' ', STAGE = 'stage', TRANSFORM = 'transform', UPPER_STAGE = 'Stage', VISIBLE = 'visible', CLONE_BLACK_LIST = ['id'], TRANSFORM_CHANGE_STR = [
    'xChange.konva',
    'yChange.konva',
    'scaleXChange.konva',
    'scaleYChange.konva',
    'skewXChange.konva',
    'skewYChange.konva',
    'rotationChange.konva',
    'offsetXChange.konva',
    'offsetYChange.konva',
    'transformsEnabledChange.konva'
].join(SPACE), SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);
var emptyChildren = new Util_1.Collection();
var idCounter = 1;
var Node = (function () {
    function Node(config) {
        var _this = this;
        this._id = idCounter++;
        this.eventListeners = {};
        this.attrs = {};
        this.index = 0;
        this.parent = null;
        this._cache = new Map();
        this._lastPos = null;
        this._filterUpToDate = false;
        this._isUnderCache = false;
        this.children = emptyChildren;
        this._dragEventId = null;
        this.setAttrs(config);
        this.on(TRANSFORM_CHANGE_STR, function () {
            _this._clearCache(TRANSFORM);
            _this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        });
        this.on(SCALE_CHANGE_STR, function () {
            _this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        });
        this.on('visibleChange.konva', function () {
            _this._clearSelfAndDescendantCache(VISIBLE);
        });
        this.on('listeningChange.konva', function () {
            _this._clearSelfAndDescendantCache(LISTENING);
        });
        this.on('opacityChange.konva', function () {
            _this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        });
    }
    Node.prototype.hasChildren = function () {
        return false;
    };
    Node.prototype.getChildren = function () {
        return emptyChildren;
    };
    Node.prototype._clearCache = function (attr) {
        if (attr) {
            this._cache.delete(attr);
        }
        else {
            this._cache.clear();
        }
    };
    Node.prototype._getCache = function (attr, privateGetter) {
        var cache = this._cache.get(attr);
        if (cache === undefined) {
            cache = privateGetter.call(this);
            this._cache.set(attr, cache);
        }
        return cache;
    };
    Node.prototype._getCanvasCache = function () {
        return this._cache.get(CANVAS);
    };
    Node.prototype._clearSelfAndDescendantCache = function (attr) {
        this._clearCache(attr);
        if (this._getCanvasCache()) {
            return;
        }
        if (this.children) {
            this.children.each(function (node) {
                node._clearSelfAndDescendantCache(attr);
            });
        }
    };
    Node.prototype.clearCache = function () {
        this._cache.delete(CANVAS);
        this._clearSelfAndDescendantCache();
        return this;
    };
    Node.prototype.cache = function (config) {
        var conf = config || {};
        var rect = {};
        if (conf.x === undefined ||
            conf.y === undefined ||
            conf.width === undefined ||
            conf.height === undefined) {
            rect = this.getClientRect({
                skipTransform: true,
                relativeTo: this.getParent()
            });
        }
        var width = conf.width || rect.width, height = conf.height || rect.height, pixelRatio = conf.pixelRatio, x = conf.x === undefined ? rect.x : conf.x, y = conf.y === undefined ? rect.y : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false;
        if (!width || !height) {
            Util_1.Util.error('Can not cache the node. Width or height of the node equals 0. Caching is skipped.');
            return;
        }
        width += offset * 2;
        height += offset * 2;
        x -= offset;
        y -= offset;
        var cachedSceneCanvas = new Canvas_1.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height
        }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height
        }), cachedHitCanvas = new Canvas_1.HitCanvas({
            pixelRatio: 1,
            width: width,
            height: height
        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        this._cache.delete('canvas');
        this._filterUpToDate = false;
        if (conf.imageSmoothingEnabled === false) {
            cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
            cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
            cachedHitCanvas.getContext()._context.imageSmoothingEnabled = false;
        }
        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x, -y);
        hitContext.translate(-x, -y);
        this._isUnderCache = true;
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this.drawScene(cachedSceneCanvas, this, true);
        this.drawHit(cachedHitCanvas, this, true);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();
        if (drawBorder) {
            sceneContext.save();
            sceneContext.beginPath();
            sceneContext.rect(0, 0, width, height);
            sceneContext.closePath();
            sceneContext.setAttr('strokeStyle', 'red');
            sceneContext.setAttr('lineWidth', 5);
            sceneContext.stroke();
            sceneContext.restore();
        }
        this._cache.set(CANVAS, {
            scene: cachedSceneCanvas,
            filter: cachedFilterCanvas,
            hit: cachedHitCanvas,
            x: x,
            y: y
        });
        return this;
    };
    Node.prototype.isCached = function () {
        return this._cache.has('canvas');
    };
    Node.prototype.getClientRect = function (config) {
        throw new Error('abstract "getClientRect" method call');
    };
    Node.prototype._transformedRect = function (rect, top) {
        var points = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
            { x: rect.x, y: rect.y + rect.height }
        ];
        var minX, minY, maxX, maxY;
        var trans = this.getAbsoluteTransform(top);
        points.forEach(function (point) {
            var transformed = trans.point(point);
            if (minX === undefined) {
                minX = maxX = transformed.x;
                minY = maxY = transformed.y;
            }
            minX = Math.min(minX, transformed.x);
            minY = Math.min(minY, transformed.y);
            maxX = Math.max(maxX, transformed.x);
            maxY = Math.max(maxY, transformed.y);
        });
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    };
    Node.prototype._drawCachedSceneCanvas = function (context) {
        context.save();
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        var canvasCache = this._getCanvasCache();
        context.translate(canvasCache.x, canvasCache.y);
        var cacheCanvas = this._getCachedSceneCanvas();
        var ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
    };
    Node.prototype._drawCachedHitCanvas = function (context) {
        var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
        context.save();
        context._applyGlobalCompositeOperation(this);
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0);
        context.restore();
    };
    Node.prototype._getCachedSceneCanvas = function () {
        var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
        if (filters) {
            if (!this._filterUpToDate) {
                var ratio = sceneCanvas.pixelRatio;
                try {
                    len = filters.length;
                    filterContext.clear();
                    filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
                    imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
                    for (n = 0; n < len; n++) {
                        filter = filters[n];
                        if (typeof filter !== 'function') {
                            Util_1.Util.error('Filter should be type of function, but got ' +
                                typeof filter +
                                ' insted. Please check correct filters');
                            continue;
                        }
                        filter.call(this, imageData);
                        filterContext.putImageData(imageData, 0, 0);
                    }
                }
                catch (e) {
                    Util_1.Util.error('Unable to apply filter. ' + e.message);
                }
                this._filterUpToDate = true;
            }
            return filterCanvas;
        }
        return sceneCanvas;
    };
    Node.prototype.on = function (evtStr, handler) {
        if (arguments.length === 3) {
            return this._delegate.apply(this, arguments);
        }
        var events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1] || '';
            if (!this.eventListeners[baseEvent]) {
                this.eventListeners[baseEvent] = [];
            }
            this.eventListeners[baseEvent].push({
                name: name,
                handler: handler
            });
        }
        return this;
    };
    Node.prototype.off = function (evtStr, callback) {
        var events = (evtStr || '').split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
        if (!evtStr) {
            for (t in this.eventListeners) {
                this._off(t);
            }
        }
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1];
            if (baseEvent) {
                if (this.eventListeners[baseEvent]) {
                    this._off(baseEvent, name, callback);
                }
            }
            else {
                for (t in this.eventListeners) {
                    this._off(t, name, callback);
                }
            }
        }
        return this;
    };
    Node.prototype.dispatchEvent = function (evt) {
        var e = {
            target: this,
            type: evt.type,
            evt: evt
        };
        this.fire(evt.type, e);
        return this;
    };
    Node.prototype.addEventListener = function (type, handler) {
        this.on(type, function (evt) {
            handler.call(this, evt.evt);
        });
        return this;
    };
    Node.prototype.removeEventListener = function (type) {
        this.off(type);
        return this;
    };
    Node.prototype._delegate = function (event, selector, handler) {
        var stopNode = this;
        this.on(event, function (evt) {
            var targets = evt.target.findAncestors(selector, true, stopNode);
            for (var i = 0; i < targets.length; i++) {
                evt = Util_1.Util.cloneObject(evt);
                evt.currentTarget = targets[i];
                handler.call(targets[i], evt);
            }
        });
    };
    Node.prototype.remove = function () {
        if (this.isDragging()) {
            this.stopDrag();
        }
        DragAndDrop_1.DD._dragElements.delete(this._id);
        this._remove();
        return this;
    };
    Node.prototype._remove = function () {
        this._clearSelfAndDescendantCache(STAGE);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        this._clearSelfAndDescendantCache(VISIBLE);
        this._clearSelfAndDescendantCache(LISTENING);
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        var parent = this.getParent();
        if (parent && parent.children) {
            parent.children.splice(this.index, 1);
            parent._setChildrenIndices();
            this.parent = null;
        }
    };
    Node.prototype.destroy = function () {
        exports._removeId(this.id(), this);
        var names = (this.name() || '').split(/\s/g);
        for (var i = 0; i < names.length; i++) {
            var subname = names[i];
            exports._removeName(subname, this._id);
        }
        this.remove();
        return this;
    };
    Node.prototype.getAttr = function (attr) {
        var method = 'get' + Util_1.Util._capitalize(attr);
        if (Util_1.Util._isFunction(this[method])) {
            return this[method]();
        }
        return this.attrs[attr];
    };
    Node.prototype.getAncestors = function () {
        var parent = this.getParent(), ancestors = new Util_1.Collection();
        while (parent) {
            ancestors.push(parent);
            parent = parent.getParent();
        }
        return ancestors;
    };
    Node.prototype.getAttrs = function () {
        return this.attrs || {};
    };
    Node.prototype.setAttrs = function (config) {
        var key, method;
        if (!config) {
            return this;
        }
        for (key in config) {
            if (key === CHILDREN) {
                continue;
            }
            method = SET + Util_1.Util._capitalize(key);
            if (Util_1.Util._isFunction(this[method])) {
                this[method](config[key]);
            }
            else {
                this._setAttr(key, config[key]);
            }
        }
        return this;
    };
    Node.prototype.isListening = function () {
        return this._getCache(LISTENING, this._isListening);
    };
    Node.prototype._isListening = function () {
        var listening = this.listening(), parent = this.getParent();
        if (listening === 'inherit') {
            if (parent) {
                return parent.isListening();
            }
            else {
                return true;
            }
        }
        else {
            return listening;
        }
    };
    Node.prototype.isVisible = function () {
        return this._getCache(VISIBLE, this._isVisible);
    };
    Node.prototype._isVisible = function (relativeTo) {
        var visible = this.visible(), parent = this.getParent();
        if (visible === 'inherit') {
            if (parent && parent !== relativeTo) {
                return parent._isVisible(relativeTo);
            }
            else {
                return true;
            }
        }
        else {
            return visible;
        }
    };
    Node.prototype.shouldDrawHit = function () {
        var layer = this.getLayer();
        return ((!layer && this.isListening() && this.isVisible()) ||
            (layer &&
                layer.hitGraphEnabled() &&
                this.isListening() &&
                this.isVisible()));
    };
    Node.prototype.show = function () {
        this.visible(true);
        return this;
    };
    Node.prototype.hide = function () {
        this.visible(false);
        return this;
    };
    Node.prototype.getZIndex = function () {
        return this.index || 0;
    };
    Node.prototype.getAbsoluteZIndex = function () {
        var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
        function addChildren(children) {
            nodes = [];
            len = children.length;
            for (n = 0; n < len; n++) {
                child = children[n];
                index++;
                if (child.nodeType !== SHAPE) {
                    nodes = nodes.concat(child.getChildren().toArray());
                }
                if (child._id === that._id) {
                    n = len;
                }
            }
            if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
                addChildren(nodes);
            }
        }
        if (that.nodeType !== UPPER_STAGE) {
            addChildren(that.getStage().getChildren());
        }
        return index;
    };
    Node.prototype.getDepth = function () {
        var depth = 0, parent = this.parent;
        while (parent) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    };
    Node.prototype.setPosition = function (pos) {
        this.x(pos.x);
        this.y(pos.y);
        return this;
    };
    Node.prototype.getPosition = function () {
        return {
            x: this.x(),
            y: this.y()
        };
    };
    Node.prototype.getAbsolutePosition = function (top) {
        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util_1.Transform(), offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
    };
    Node.prototype.setAbsolutePosition = function (pos) {
        var origTrans = this._clearTransform(), it;
        this.attrs.x = origTrans.x;
        this.attrs.y = origTrans.y;
        delete origTrans.x;
        delete origTrans.y;
        it = this.getAbsoluteTransform();
        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
            x: this.attrs.x + it.getTranslation().x,
            y: this.attrs.y + it.getTranslation().y
        };
        this.setPosition({ x: pos.x, y: pos.y });
        this._setTransform(origTrans);
        return this;
    };
    Node.prototype._setTransform = function (trans) {
        var key;
        for (key in trans) {
            this.attrs[key] = trans[key];
        }
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    };
    Node.prototype._clearTransform = function () {
        var trans = {
            x: this.x(),
            y: this.y(),
            rotation: this.rotation(),
            scaleX: this.scaleX(),
            scaleY: this.scaleY(),
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
            skewX: this.skewX(),
            skewY: this.skewY()
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        return trans;
    };
    Node.prototype.move = function (change) {
        var changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
        if (changeX !== undefined) {
            x += changeX;
        }
        if (changeY !== undefined) {
            y += changeY;
        }
        this.setPosition({ x: x, y: y });
        return this;
    };
    Node.prototype._eachAncestorReverse = function (func, top) {
        var family = [], parent = this.getParent(), len, n;
        if (top && top._id === this._id) {
            func(this);
            return;
        }
        family.unshift(this);
        while (parent && (!top || parent._id !== top._id)) {
            family.unshift(parent);
            parent = parent.parent;
        }
        len = family.length;
        for (n = 0; n < len; n++) {
            func(family[n]);
        }
    };
    Node.prototype.rotate = function (theta) {
        this.rotation(this.rotation() + theta);
        return this;
    };
    Node.prototype.moveToTop = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveToTop function is ignored.');
            return false;
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.push(this);
        this.parent._setChildrenIndices();
        return true;
    };
    Node.prototype.moveUp = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveUp function is ignored.');
            return false;
        }
        var index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index + 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.moveDown = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveDown function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index - 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.moveToBottom = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveToBottom function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.unshift(this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.setZIndex = function (zIndex) {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. zIndex parameter is ignored.');
            return this;
        }
        if (zIndex < 0 || zIndex >= this.parent.children.length) {
            Util_1.Util.warn('Unexpected value ' +
                zIndex +
                ' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' +
                (this.parent.children.length - 1) +
                '.');
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);
        this.parent._setChildrenIndices();
        return this;
    };
    Node.prototype.getAbsoluteOpacity = function () {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    };
    Node.prototype._getAbsoluteOpacity = function () {
        var absOpacity = this.opacity();
        var parent = this.getParent();
        if (parent && !parent._isUnderCache) {
            absOpacity *= parent.getAbsoluteOpacity();
        }
        return absOpacity;
    };
    Node.prototype.moveTo = function (newContainer) {
        if (this.getParent() !== newContainer) {
            this._remove();
            newContainer.add(this);
        }
        return this;
    };
    Node.prototype.toObject = function () {
        var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
        obj.attrs = {};
        for (key in attrs) {
            val = attrs[key];
            nonPlainObject =
                Util_1.Util.isObject(val) && !Util_1.Util._isPlainObject(val) && !Util_1.Util._isArray(val);
            if (nonPlainObject) {
                continue;
            }
            getter = typeof this[key] === 'function' && this[key];
            delete attrs[key];
            defaultValue = getter ? getter.call(this) : null;
            attrs[key] = val;
            if (defaultValue !== val) {
                obj.attrs[key] = val;
            }
        }
        obj.className = this.getClassName();
        return Util_1.Util._prepareToStringify(obj);
    };
    Node.prototype.toJSON = function () {
        return JSON.stringify(this.toObject());
    };
    Node.prototype.getParent = function () {
        return this.parent;
    };
    Node.prototype.findAncestors = function (selector, includeSelf, stopNode) {
        var res = [];
        if (includeSelf && this._isMatch(selector)) {
            res.push(this);
        }
        var ancestor = this.parent;
        while (ancestor) {
            if (ancestor === stopNode) {
                return res;
            }
            if (ancestor._isMatch(selector)) {
                res.push(ancestor);
            }
            ancestor = ancestor.parent;
        }
        return res;
    };
    Node.prototype.isAncestorOf = function (node) {
        return false;
    };
    Node.prototype.findAncestor = function (selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
    };
    Node.prototype._isMatch = function (selector) {
        if (!selector) {
            return false;
        }
        if (typeof selector === 'function') {
            return selector(this);
        }
        var selectorArr = selector.replace(/ /g, '').split(','), len = selectorArr.length, n, sel;
        for (n = 0; n < len; n++) {
            sel = selectorArr[n];
            if (!Util_1.Util.isValidSelector(sel)) {
                Util_1.Util.warn('Selector "' +
                    sel +
                    '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
                Util_1.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
                Util_1.Util.warn('Konva is awesome, right?');
            }
            if (sel.charAt(0) === '#') {
                if (this.id() === sel.slice(1)) {
                    return true;
                }
            }
            else if (sel.charAt(0) === '.') {
                if (this.hasName(sel.slice(1))) {
                    return true;
                }
            }
            else if (this.className === selector || this.nodeType === selector) {
                return true;
            }
        }
        return false;
    };
    Node.prototype.getLayer = function () {
        var parent = this.getParent();
        return parent ? parent.getLayer() : null;
    };
    Node.prototype.getStage = function () {
        return this._getCache(STAGE, this._getStage);
    };
    Node.prototype._getStage = function () {
        var parent = this.getParent();
        if (parent) {
            return parent.getStage();
        }
        else {
            return undefined;
        }
    };
    Node.prototype.fire = function (eventType, evt, bubble) {
        evt = evt || {};
        evt.target = evt.target || this;
        if (bubble) {
            this._fireAndBubble(eventType, evt);
        }
        else {
            this._fire(eventType, evt);
        }
        return this;
    };
    Node.prototype.getAbsoluteTransform = function (top) {
        if (top) {
            return this._getAbsoluteTransform(top);
        }
        else {
            return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
    };
    Node.prototype._getAbsoluteTransform = function (top) {
        var at = new Util_1.Transform();
        this._eachAncestorReverse(function (node) {
            var transformsEnabled = node.getTransformsEnabled();
            if (transformsEnabled === 'all') {
                at.multiply(node.getTransform());
            }
            else if (transformsEnabled === 'position') {
                at.translate(node.getX() - node.getOffsetX(), node.getY() - node.getOffsetY());
            }
        }, top);
        return at;
    };
    Node.prototype.getAbsoluteScale = function (top) {
        if (top) {
            return this._getAbsoluteScale(top);
        }
        else {
            return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
        }
    };
    Node.prototype._getAbsoluteScale = function (top) {
        var parent = this;
        while (parent) {
            if (parent._isUnderCache) {
                top = parent;
            }
            parent = parent.getParent();
        }
        var scaleX = 1, scaleY = 1;
        this._eachAncestorReverse(function (node) {
            scaleX *= node.scaleX();
            scaleY *= node.scaleY();
        }, top);
        return {
            x: scaleX,
            y: scaleY
        };
    };
    Node.prototype.getTransform = function () {
        return this._getCache(TRANSFORM, this._getTransform);
    };
    Node.prototype._getTransform = function () {
        var m = new Util_1.Transform(), x = this.x(), y = this.y(), rotation = Global_1.Konva.getAngle(this.rotation()), scaleX = this.scaleX(), scaleY = this.scaleY(), skewX = this.skewX(), skewY = this.skewY(), offsetX = this.offsetX(), offsetY = this.offsetY();
        if (x !== 0 || y !== 0) {
            m.translate(x, y);
        }
        if (rotation !== 0) {
            m.rotate(rotation);
        }
        if (skewX !== 0 || skewY !== 0) {
            m.skew(skewX, skewY);
        }
        if (scaleX !== 1 || scaleY !== 1) {
            m.scale(scaleX, scaleY);
        }
        if (offsetX !== 0 || offsetY !== 0) {
            m.translate(-1 * offsetX, -1 * offsetY);
        }
        return m;
    };
    Node.prototype.clone = function (obj) {
        var attrs = Util_1.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
        for (var i in CLONE_BLACK_LIST) {
            var blockAttr = CLONE_BLACK_LIST[i];
            delete attrs[blockAttr];
        }
        for (key in obj) {
            attrs[key] = obj[key];
        }
        var node = new this.constructor(attrs);
        for (key in this.eventListeners) {
            allListeners = this.eventListeners[key];
            len = allListeners.length;
            for (n = 0; n < len; n++) {
                listener = allListeners[n];
                if (listener.name.indexOf(KONVA) < 0) {
                    if (!node.eventListeners[key]) {
                        node.eventListeners[key] = [];
                    }
                    node.eventListeners[key].push(listener);
                }
            }
        }
        return node;
    };
    Node.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        var box = this.getClientRect();
        var stage = this.getStage(), x = config.x !== undefined ? config.x : box.x, y = config.y !== undefined ? config.y : box.y, pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
            width: config.width || box.width || (stage ? stage.width() : 0),
            height: config.height || box.height || (stage ? stage.height() : 0),
            pixelRatio: pixelRatio
        }), context = canvas.getContext();
        context.save();
        if (x || y) {
            context.translate(-1 * x, -1 * y);
        }
        this.drawScene(canvas);
        context.restore();
        return canvas;
    };
    Node.prototype.toCanvas = function (config) {
        return this._toKonvaCanvas(config)._canvas;
    };
    Node.prototype.toDataURL = function (config) {
        config = config || {};
        var mimeType = config.mimeType || null, quality = config.quality || null;
        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
        if (config.callback) {
            config.callback(url);
        }
        return url;
    };
    Node.prototype.toImage = function (config) {
        if (!config || !config.callback) {
            throw 'callback required for toImage method config argument';
        }
        var callback = config.callback;
        delete config.callback;
        Util_1.Util._urlToImage(this.toDataURL(config), function (img) {
            callback(img);
        });
    };
    Node.prototype.setSize = function (size) {
        this.width(size.width);
        this.height(size.height);
        return this;
    };
    Node.prototype.getSize = function () {
        return {
            width: this.width(),
            height: this.height()
        };
    };
    Node.prototype.getClassName = function () {
        return this.className || this.nodeType;
    };
    Node.prototype.getType = function () {
        return this.nodeType;
    };
    Node.prototype.getDragDistance = function () {
        if (this.attrs.dragDistance !== undefined) {
            return this.attrs.dragDistance;
        }
        else if (this.parent) {
            return this.parent.getDragDistance();
        }
        else {
            return Global_1.Konva.dragDistance;
        }
    };
    Node.prototype._off = function (type, name, callback) {
        var evtListeners = this.eventListeners[type], i, evtName, handler;
        for (i = 0; i < evtListeners.length; i++) {
            evtName = evtListeners[i].name;
            handler = evtListeners[i].handler;
            if ((evtName !== 'konva' || name === 'konva') &&
                (!name || evtName === name) &&
                (!callback || callback === handler)) {
                evtListeners.splice(i, 1);
                if (evtListeners.length === 0) {
                    delete this.eventListeners[type];
                    break;
                }
                i--;
            }
        }
    };
    Node.prototype._fireChangeEvent = function (attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
            oldVal: oldVal,
            newVal: newVal
        });
    };
    Node.prototype.setId = function (id) {
        var oldId = this.id();
        exports._removeId(oldId, this);
        _addId(this, id);
        this._setAttr('id', id);
        return this;
    };
    Node.prototype.setName = function (name) {
        var oldNames = (this.name() || '').split(/\s/g);
        var newNames = (name || '').split(/\s/g);
        var subname, i;
        for (i = 0; i < oldNames.length; i++) {
            subname = oldNames[i];
            if (newNames.indexOf(subname) === -1 && subname) {
                exports._removeName(subname, this._id);
            }
        }
        for (i = 0; i < newNames.length; i++) {
            subname = newNames[i];
            if (oldNames.indexOf(subname) === -1 && subname) {
                exports._addName(this, subname);
            }
        }
        this._setAttr(NAME, name);
        return this;
    };
    Node.prototype.addName = function (name) {
        if (!this.hasName(name)) {
            var oldName = this.name();
            var newName = oldName ? oldName + ' ' + name : name;
            this.setName(newName);
        }
        return this;
    };
    Node.prototype.hasName = function (name) {
        if (!name) {
            return false;
        }
        var fullName = this.name();
        if (!fullName) {
            return false;
        }
        var names = (fullName || '').split(/\s/g);
        return names.indexOf(name) !== -1;
    };
    Node.prototype.removeName = function (name) {
        var names = (this.name() || '').split(/\s/g);
        var index = names.indexOf(name);
        if (index !== -1) {
            names.splice(index, 1);
            this.setName(names.join(' '));
        }
        return this;
    };
    Node.prototype.setAttr = function (attr, val) {
        var func = this[SET + Util_1.Util._capitalize(attr)];
        if (Util_1.Util._isFunction(func)) {
            func.call(this, val);
        }
        else {
            this._setAttr(attr, val);
        }
        return this;
    };
    Node.prototype._setAttr = function (key, val) {
        var oldVal = this.attrs[key];
        if (oldVal === val && !Util_1.Util.isObject(val)) {
            return;
        }
        if (val === undefined || val === null) {
            delete this.attrs[key];
        }
        else {
            this.attrs[key] = val;
        }
        this._fireChangeEvent(key, oldVal, val);
    };
    Node.prototype._setComponentAttr = function (key, component, val) {
        var oldVal;
        if (val !== undefined) {
            oldVal = this.attrs[key];
            if (!oldVal) {
                this.attrs[key] = this.getAttr(key);
            }
            this.attrs[key][component] = val;
            this._fireChangeEvent(key, oldVal, val);
        }
    };
    Node.prototype._fireAndBubble = function (eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
            evt.target = this;
        }
        var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
            ((compareShape &&
                (this === compareShape ||
                    (this.isAncestorOf && this.isAncestorOf(compareShape)))) ||
                (this.nodeType === 'Stage' && !compareShape));
        if (!shouldStop) {
            this._fire(eventType, evt);
            var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
                (compareShape &&
                    compareShape.isAncestorOf &&
                    compareShape.isAncestorOf(this) &&
                    !compareShape.isAncestorOf(this.parent));
            if (((evt && !evt.cancelBubble) || !evt) &&
                this.parent &&
                this.parent.isListening() &&
                !stopBubble) {
                if (compareShape && compareShape.parent) {
                    this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
                }
                else {
                    this._fireAndBubble.call(this.parent, eventType, evt);
                }
            }
        }
    };
    Node.prototype._fire = function (eventType, evt) {
        var events = this.eventListeners[eventType], i;
        if (events) {
            evt = evt || {};
            evt.currentTarget = this;
            evt.type = eventType;
            for (i = 0; i < events.length; i++) {
                events[i].handler.call(this, evt);
            }
        }
    };
    Node.prototype.draw = function () {
        this.drawScene();
        this.drawHit();
        return this;
    };
    Node.prototype.startDrag = function (evt) {
        var forceDrag = !evt;
        var pointerId = evt ? evt.pointerId : undefined;
        var stage = this.getStage(), pos = stage._getPointerById(pointerId), ap = this.getAbsolutePosition();
        if (pos || forceDrag) {
            DragAndDrop_1.DD._dragElements.set(this._id, {
                node: this,
                startPointerPos: pos,
                offset: forceDrag ? { x: 0, y: 0 } : {
                    x: pos.x - ap.x,
                    y: pos.y - ap.y
                },
                isDragging: forceDrag ? true : false,
                pointerId: pointerId,
                dragStopped: false
            });
        }
    };
    Node.prototype._setDragPosition = function (evt, elem) {
        var pos = this.getStage()._getPointerById(elem.pointerId);
        var dbf = this.dragBoundFunc();
        if (!pos) {
            return;
        }
        var newNodePos = {
            x: pos.x - elem.offset.x,
            y: pos.y - elem.offset.y
        };
        if (dbf !== undefined) {
            newNodePos = dbf.call(this, newNodePos, evt);
        }
        if (!this._lastPos ||
            this._lastPos.x !== newNodePos.x ||
            this._lastPos.y !== newNodePos.y) {
            this.setAbsolutePosition(newNodePos);
            if (this.getLayer()) {
                this.getLayer().batchDraw();
            }
            else if (this.getStage()) {
                this.getStage().batchDraw();
            }
        }
        this._lastPos = newNodePos;
    };
    Node.prototype.stopDrag = function () {
        var evt = {};
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        if (elem) {
            elem.dragStopped = true;
        }
        DragAndDrop_1.DD._endDragBefore(evt);
        DragAndDrop_1.DD._endDragAfter(evt);
    };
    Node.prototype.setDraggable = function (draggable) {
        this._setAttr('draggable', draggable);
        this._dragChange();
    };
    Node.prototype.isDragging = function () {
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        return elem ? elem.isDragging : false;
    };
    Node.prototype._listenDrag = function () {
        this._dragCleanup();
        this.on('mousedown.konva touchstart.konva', function (evt) {
            var _this = this;
            var shouldCheckButton = evt.evt['button'] !== undefined;
            var canDrag = !shouldCheckButton || Global_1.Konva.dragButtons.indexOf(evt.evt['button']) >= 0;
            if (!canDrag) {
                return;
            }
            if (this.isDragging()) {
                return;
            }
            var hasDraggingChild = false;
            DragAndDrop_1.DD._dragElements.forEach(function (elem) {
                if (_this.isAncestorOf(elem.node)) {
                    hasDraggingChild = true;
                }
            });
            if (!hasDraggingChild) {
                this.startDrag(evt);
            }
        });
    };
    Node.prototype._dragChange = function () {
        if (this.attrs.draggable) {
            this._listenDrag();
        }
        else {
            this._dragCleanup();
            var stage = this.getStage();
            if (stage && DragAndDrop_1.DD._dragElements.has(this._id)) {
                this.stopDrag();
            }
        }
    };
    Node.prototype._dragCleanup = function () {
        this.off('mousedown.konva');
        this.off('touchstart.konva');
    };
    Node.create = function (data, container) {
        if (Util_1.Util._isString(data)) {
            data = JSON.parse(data);
        }
        return this._createNode(data, container);
    };
    Node._createNode = function (obj, container) {
        var className = Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
        if (container) {
            obj.attrs.container = container;
        }
        if (!Global_1._NODES_REGISTRY[className]) {
            Util_1.Util.warn('Can not find a node with class name "' +
                className +
                '". Fallback to "Shape".');
            className = 'Shape';
        }
        var Class = Global_1._NODES_REGISTRY[className];
        no = new Class(obj.attrs);
        if (children) {
            len = children.length;
            for (n = 0; n < len; n++) {
                no.add(Node._createNode(children[n]));
            }
        }
        return no;
    };
    return Node;
}());
exports.Node = Node;
Node.prototype.nodeType = 'Node';
Node.prototype._attrsAffectingSize = [];
Factory_1.Factory.addGetterSetter(Node, 'zIndex');
Factory_1.Factory.addGetterSetter(Node, 'absolutePosition');
Factory_1.Factory.addGetterSetter(Node, 'position');
Factory_1.Factory.addGetterSetter(Node, 'x', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'y', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'globalCompositeOperation', 'source-over', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'opacity', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'name', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'id', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'rotation', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'scale', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'scaleX', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'scaleY', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'skew', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'skewX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'skewY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'offset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'offsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'offsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'dragDistance', null, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'width', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'height', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'listening', 'inherit', function (val) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
        Util_1.Util.warn(val +
            ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".');
    }
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'preventDefault', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Node, 'filters', null, function (val) {
    this._filterUpToDate = false;
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'visible', 'inherit', function (val) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
        Util_1.Util.warn(val +
            ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".');
    }
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'transformsEnabled', 'all', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'size');
Factory_1.Factory.addGetterSetter(Node, 'dragBoundFunc');
Factory_1.Factory.addGetterSetter(Node, 'draggable', false, Validators_1.getBooleanValidator());
Factory_1.Factory.backCompat(Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation'
});
Util_1.Collection.mapMethods(Node);

},{"./Canvas":6,"./DragAndDrop":9,"./Factory":10,"./Global":12,"./Util":20,"./Validators":21}],16:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = _dereq_("./Global");
var Captures = new Map();
var SUPPORT_POINTER_EVENTS = Global_1.Konva._global['PointerEvent'] !== undefined;
function getCapturedShape(pointerId) {
    return Captures.get(pointerId);
}
exports.getCapturedShape = getCapturedShape;
function createEvent(evt) {
    return {
        evt: evt,
        pointerId: evt.pointerId
    };
}
exports.createEvent = createEvent;
function hasPointerCapture(pointerId, shape) {
    return Captures.get(pointerId) === shape;
}
exports.hasPointerCapture = hasPointerCapture;
function setPointerCapture(pointerId, shape) {
    releaseCapture(pointerId);
    var stage = shape.getStage();
    if (!stage)
        return;
    Captures.set(pointerId, shape);
    if (SUPPORT_POINTER_EVENTS) {
        shape._fire('gotpointercapture', createEvent(new PointerEvent('gotpointercapture')));
    }
}
exports.setPointerCapture = setPointerCapture;
function releaseCapture(pointerId, target) {
    var shape = Captures.get(pointerId);
    if (!shape)
        return;
    var stage = shape.getStage();
    if (stage && stage.content) {
    }
    Captures.delete(pointerId);
    if (SUPPORT_POINTER_EVENTS) {
        shape._fire('lostpointercapture', createEvent(new PointerEvent('lostpointercapture')));
    }
}
exports.releaseCapture = releaseCapture;

},{"./Global":12}],17:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Factory_1 = _dereq_("./Factory");
var Node_1 = _dereq_("./Node");
var Validators_1 = _dereq_("./Validators");
var Global_1 = _dereq_("./Global");
var PointerEvents = _dereq_("./PointerEvents");
var HAS_SHADOW = 'hasShadow';
var SHADOW_RGBA = 'shadowRGBA';
var patternImage = 'patternImage';
var linearGradient = 'linearGradient';
var radialGradient = 'radialGradient';
var dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = Util_1.Util.createCanvasElement().getContext('2d');
    return dummyContext;
}
exports.shapes = {};
function _fillFunc(context) {
    context.fill();
}
function _strokeFunc(context) {
    context.stroke();
}
function _fillFuncHit(context) {
    context.fill();
}
function _strokeFuncHit(context) {
    context.stroke();
}
function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
}
function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
}
function _clearFillPatternCache() {
    this._clearCache(patternImage);
}
function _clearLinearGradientCache() {
    this._clearCache(linearGradient);
}
function _clearRadialGradientCache() {
    this._clearCache(radialGradient);
}
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(config) {
        var _this = _super.call(this, config) || this;
        var key;
        while (true) {
            key = Util_1.Util.getRandomColor();
            if (key && !(key in exports.shapes)) {
                break;
            }
        }
        _this.colorKey = key;
        exports.shapes[key] = _this;
        _this.on('shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);
        _this.on('shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
        _this.on('fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva', _clearFillPatternCache);
        _this.on('fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva', _clearLinearGradientCache);
        _this.on('fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva', _clearRadialGradientCache);
        return _this;
    }
    Shape.prototype.getContext = function () {
        return this.getLayer().getContext();
    };
    Shape.prototype.getCanvas = function () {
        return this.getLayer().getCanvas();
    };
    Shape.prototype.getSceneFunc = function () {
        return this.attrs.sceneFunc || this['_sceneFunc'];
    };
    Shape.prototype.getHitFunc = function () {
        return this.attrs.hitFunc || this['_hitFunc'];
    };
    Shape.prototype.hasShadow = function () {
        return this._getCache(HAS_SHADOW, this._hasShadow);
    };
    Shape.prototype._hasShadow = function () {
        return (this.shadowEnabled() &&
            (this.shadowOpacity() !== 0 &&
                !!(this.shadowColor() ||
                    this.shadowBlur() ||
                    this.shadowOffsetX() ||
                    this.shadowOffsetY())));
    };
    Shape.prototype._getFillPattern = function () {
        return this._getCache(patternImage, this.__getFillPattern);
    };
    Shape.prototype.__getFillPattern = function () {
        if (this.fillPatternImage()) {
            var ctx = getDummyContext();
            return ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || 'repeat');
        }
    };
    Shape.prototype._getLinearGradient = function () {
        return this._getCache(linearGradient, this.__getLinearGradient);
    };
    Shape.prototype.__getLinearGradient = function () {
        var colorStops = this.fillLinearGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillLinearGradientStartPoint();
            var end = this.fillLinearGradientEndPoint();
            var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    };
    Shape.prototype._getRadialGradient = function () {
        return this._getCache(radialGradient, this.__getRadialGradient);
    };
    Shape.prototype.__getRadialGradient = function () {
        var colorStops = this.fillRadialGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillRadialGradientStartPoint();
            var end = this.fillRadialGradientEndPoint();
            var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    };
    Shape.prototype.getShadowRGBA = function () {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    };
    Shape.prototype._getShadowRGBA = function () {
        if (this.hasShadow()) {
            var rgba = Util_1.Util.colorToRGBA(this.shadowColor());
            return ('rgba(' +
                rgba.r +
                ',' +
                rgba.g +
                ',' +
                rgba.b +
                ',' +
                rgba.a * (this.shadowOpacity() || 1) +
                ')');
        }
    };
    Shape.prototype.hasFill = function () {
        return !!(this.fill() ||
            this.fillPatternImage() ||
            this.fillLinearGradientColorStops() ||
            this.fillRadialGradientColorStops());
    };
    Shape.prototype.hasStroke = function () {
        return (this.strokeEnabled() &&
            this.strokeWidth() &&
            !!(this.stroke() || this.strokeLinearGradientColorStops()));
    };
    Shape.prototype.intersects = function (point) {
        var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas);
        p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p[3] > 0;
    };
    Shape.prototype.destroy = function () {
        Node_1.Node.prototype.destroy.call(this);
        delete exports.shapes[this.colorKey];
        delete this.colorKey;
        return this;
    };
    Shape.prototype._useBufferCanvas = function (caching) {
        return !!((!caching || this.hasShadow()) &&
            this.perfectDrawEnabled() &&
            this.getAbsoluteOpacity() !== 1 &&
            this.hasFill() &&
            this.hasStroke() &&
            this.getStage());
    };
    Shape.prototype.setStrokeHitEnabled = function (val) {
        if (val) {
            this.hitStrokeWidth('auto');
        }
        else {
            this.hitStrokeWidth(0);
        }
    };
    Shape.prototype.getStrokeHitEnabled = function () {
        if (this.hitStrokeWidth() === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Shape.prototype.getSelfRect = function () {
        var size = this.size();
        return {
            x: this._centroid ? Math.round(-size.width / 2) : 0,
            y: this._centroid ? Math.round(-size.height / 2) : 0,
            width: size.width,
            height: size.height
        };
    };
    Shape.prototype.getClientRect = function (attrs) {
        attrs = attrs || {};
        var skipTransform = attrs.skipTransform;
        var relativeTo = attrs.relativeTo;
        var fillRect = this.getSelfRect();
        var applyStroke = !attrs.skipStroke && this.hasStroke();
        var strokeWidth = (applyStroke && this.strokeWidth()) || 0;
        var fillAndStrokeWidth = fillRect.width + strokeWidth;
        var fillAndStrokeHeight = fillRect.height + strokeWidth;
        var applyShadow = !attrs.skipShadow && this.hasShadow();
        var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        var blurRadius = (applyShadow && this.shadowBlur()) || 0;
        var width = preWidth + blurRadius * 2;
        var height = preHeight + blurRadius * 2;
        var roundingOffset = 0;
        if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
            roundingOffset = 1;
        }
        var rect = {
            width: width + roundingOffset,
            height: height + roundingOffset,
            x: -Math.round(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetX, 0) +
                fillRect.x,
            y: -Math.round(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetY, 0) +
                fillRect.y
        };
        if (!skipTransform) {
            return this._transformedRect(rect, relativeTo);
        }
        return rect;
    };
    Shape.prototype.drawScene = function (can, top, caching, skipBuffer) {
        var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.sceneFunc(), hasShadow = this.hasShadow(), hasStroke = this.hasStroke(), stage, bufferCanvas, bufferContext;
        if (!this.isVisible() && !caching) {
            return this;
        }
        if (cachedCanvas) {
            context.save();
            layer._applyTransform(this, context, top);
            this._drawCachedSceneCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        if (this._useBufferCanvas(caching) && !skipBuffer) {
            stage = this.getStage();
            bufferCanvas = stage.bufferCanvas;
            bufferContext = bufferCanvas.getContext();
            bufferContext.clear();
            bufferContext.save();
            bufferContext._applyLineJoin(this);
            if (!caching) {
                if (layer) {
                    layer._applyTransform(this, bufferContext, top);
                }
                else {
                    var m = this.getAbsoluteTransform(top).getMatrix();
                    context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                }
            }
            drawFunc.call(this, bufferContext, this);
            bufferContext.restore();
            var ratio = bufferCanvas.pixelRatio;
            if (hasShadow && !canvas.hitCanvas) {
                context.save();
                context._applyShadow(this);
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
                context.restore();
            }
            else {
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
            }
        }
        else {
            context._applyLineJoin(this);
            if (!caching) {
                if (layer) {
                    layer._applyTransform(this, context, top);
                }
                else {
                    var o = this.getAbsoluteTransform(top).getMatrix();
                    context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
                }
            }
            if (hasShadow && hasStroke && !canvas.hitCanvas) {
                context.save();
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                context._applyShadow(this);
                drawFunc.call(this, context, this);
                context.restore();
                if (this.hasFill() && this.shadowForStrokeEnabled()) {
                    drawFunc.call(this, context, this);
                }
            }
            else if (hasShadow && !canvas.hitCanvas) {
                context.save();
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                context._applyShadow(this);
                drawFunc.call(this, context, this);
                context.restore();
            }
            else {
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                drawFunc.call(this, context, this);
            }
        }
        context.restore();
        return this;
    };
    Shape.prototype.drawHit = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (!this.colorKey) {
            console.log(this);
            Util_1.Util.warn('Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()');
        }
        if (!this.shouldDrawHit() && !caching) {
            return this;
        }
        if (cachedHitCanvas) {
            context.save();
            layer._applyTransform(this, context, top);
            this._drawCachedHitCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        context._applyLineJoin(this);
        if (!caching) {
            if (layer) {
                layer._applyTransform(this, context, top);
            }
            else {
                var o = this.getAbsoluteTransform(top).getMatrix();
                context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
            }
        }
        drawFunc.call(this, context, this);
        context.restore();
        return this;
    };
    Shape.prototype.drawHitFromCache = function (alphaThreshold) {
        if (alphaThreshold === void 0) { alphaThreshold = 0; }
        var cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i, alpha;
        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
        try {
            hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
            hitData = hitImageData.data;
            len = hitData.length;
            rgbColorKey = Util_1.Util._hexToRgb(this.colorKey);
            for (i = 0; i < len; i += 4) {
                alpha = hitData[i + 3];
                if (alpha > alphaThreshold) {
                    hitData[i] = rgbColorKey.r;
                    hitData[i + 1] = rgbColorKey.g;
                    hitData[i + 2] = rgbColorKey.b;
                    hitData[i + 3] = 255;
                }
                else {
                    hitData[i + 3] = 0;
                }
            }
            hitContext.putImageData(hitImageData, 0, 0);
        }
        catch (e) {
            Util_1.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
        }
        return this;
    };
    Shape.prototype.hasPointerCapture = function (pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
    };
    Shape.prototype.setPointerCapture = function (pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
    };
    Shape.prototype.releaseCapture = function (pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
    };
    return Shape;
}(Node_1.Node));
exports.Shape = Shape;
Shape.prototype._fillFunc = _fillFunc;
Shape.prototype._strokeFunc = _strokeFunc;
Shape.prototype._fillFuncHit = _fillFuncHit;
Shape.prototype._strokeFuncHit = _strokeFuncHit;
Shape.prototype._centroid = false;
Shape.prototype.nodeType = 'Shape';
Global_1._registerNode(Shape);
Factory_1.Factory.addGetterSetter(Shape, 'stroke', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'strokeWidth', 2, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'hitStrokeWidth', 'auto', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.addGetterSetter(Shape, 'strokeHitEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'perfectDrawEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowForStrokeEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'lineJoin');
Factory_1.Factory.addGetterSetter(Shape, 'lineCap');
Factory_1.Factory.addGetterSetter(Shape, 'sceneFunc');
Factory_1.Factory.addGetterSetter(Shape, 'hitFunc');
Factory_1.Factory.addGetterSetter(Shape, 'dash');
Factory_1.Factory.addGetterSetter(Shape, 'dashOffset', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowColor', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowBlur', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowOpacity', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'shadowOffset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'shadowOffsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowOffsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternImage');
Factory_1.Factory.addGetterSetter(Shape, 'fill', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartRadius', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndRadius', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternRepeat', 'repeat');
Factory_1.Factory.addGetterSetter(Shape, 'fillEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'strokeEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'shadowEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'dashEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'strokeScaleEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'fillPriority', 'color');
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillPatternOffset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternOffsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternOffsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillPatternScale', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternScaleX', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternScaleY', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternRotation', 0);
Factory_1.Factory.backCompat(Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',
    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',
    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc'
});
Util_1.Collection.mapMethods(Shape);

},{"./Factory":10,"./Global":12,"./Node":15,"./PointerEvents":16,"./Util":20,"./Validators":21}],18:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Factory_1 = _dereq_("./Factory");
var Container_1 = _dereq_("./Container");
var Global_1 = _dereq_("./Global");
var Canvas_1 = _dereq_("./Canvas");
var DragAndDrop_1 = _dereq_("./DragAndDrop");
var Global_2 = _dereq_("./Global");
var PointerEvents = _dereq_("./PointerEvents");
var STAGE = 'Stage', STRING = 'string', PX = 'px', MOUSEOUT = 'mouseout', MOUSELEAVE = 'mouseleave', MOUSEOVER = 'mouseover', MOUSEENTER = 'mouseenter', MOUSEMOVE = 'mousemove', MOUSEDOWN = 'mousedown', MOUSEUP = 'mouseup', POINTERMOVE = 'pointermove', POINTERDOWN = 'pointerdown', POINTERUP = 'pointerup', POINTERCANCEL = 'pointercancel', LOSTPOINTERCAPTURE = 'lostpointercapture', CONTEXTMENU = 'contextmenu', CLICK = 'click', DBL_CLICK = 'dblclick', TOUCHSTART = 'touchstart', TOUCHEND = 'touchend', TAP = 'tap', DBL_TAP = 'dbltap', TOUCHMOVE = 'touchmove', WHEEL = 'wheel', CONTENT_MOUSEOUT = 'contentMouseout', CONTENT_MOUSEOVER = 'contentMouseover', CONTENT_MOUSEMOVE = 'contentMousemove', CONTENT_MOUSEDOWN = 'contentMousedown', CONTENT_MOUSEUP = 'contentMouseup', CONTENT_CONTEXTMENU = 'contentContextmenu', CONTENT_CLICK = 'contentClick', CONTENT_DBL_CLICK = 'contentDblclick', CONTENT_TOUCHSTART = 'contentTouchstart', CONTENT_TOUCHEND = 'contentTouchend', CONTENT_DBL_TAP = 'contentDbltap', CONTENT_TAP = 'contentTap', CONTENT_TOUCHMOVE = 'contentTouchmove', CONTENT_POINTERMOVE = 'contentPointermove', CONTENT_POINTERDOWN = 'contentPointerdown', CONTENT_POINTERUP = 'contentPointerup', CONTENT_WHEEL = 'contentWheel', RELATIVE = 'relative', KONVA_CONTENT = 'konvajs-content', SPACE = ' ', UNDERSCORE = '_', CONTAINER = 'container', MAX_LAYERS_NUMBER = 5, EMPTY_STRING = '', EVENTS = [
    MOUSEENTER,
    MOUSEDOWN,
    MOUSEMOVE,
    MOUSEUP,
    MOUSEOUT,
    TOUCHSTART,
    TOUCHMOVE,
    TOUCHEND,
    MOUSEOVER,
    WHEEL,
    CONTEXTMENU,
    POINTERDOWN,
    POINTERMOVE,
    POINTERUP,
    POINTERCANCEL,
    LOSTPOINTERCAPTURE
], eventsLength = EVENTS.length;
function addEvent(ctx, eventName) {
    ctx.content.addEventListener(eventName, function (evt) {
        ctx[UNDERSCORE + eventName](evt);
    }, false);
}
var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
exports.stages = [];
function checkNoClip(attrs) {
    if (attrs === void 0) { attrs = {}; }
    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
        Util_1.Util.warn('Stage does not support clipping. Please use clip for Layers or Groups.');
    }
    return attrs;
}
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(config) {
        var _this = _super.call(this, checkNoClip(config)) || this;
        _this._pointerPositions = [];
        _this._changedPointerPositions = [];
        _this._buildDOM();
        _this._bindContentEvents();
        exports.stages.push(_this);
        _this.on('widthChange.konva heightChange.konva', _this._resizeDOM);
        _this.on('visibleChange.konva', _this._checkVisibility);
        _this.on('clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva', function () {
            checkNoClip(_this.attrs);
        });
        _this._checkVisibility();
        return _this;
    }
    Stage.prototype._validateAdd = function (child) {
        var isLayer = child.getType() === 'Layer';
        var isFastLayer = child.getType() === 'FastLayer';
        var valid = isLayer || isFastLayer;
        if (!valid) {
            Util_1.Util.throw('You may only add layers to the stage.');
        }
    };
    Stage.prototype._checkVisibility = function () {
        var style = this.visible() ? '' : 'none';
        this.content.style.display = style;
    };
    Stage.prototype.setContainer = function (container) {
        if (typeof container === STRING) {
            if (container.charAt(0) === '.') {
                var className = container.slice(1);
                container = document.getElementsByClassName(className)[0];
            }
            else {
                var id;
                if (container.charAt(0) !== '#') {
                    id = container;
                }
                else {
                    id = container.slice(1);
                }
                container = document.getElementById(id);
            }
            if (!container) {
                throw 'Can not find container in document with id ' + id;
            }
        }
        this._setAttr(CONTAINER, container);
        if (this.content) {
            if (this.content.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }
            container.appendChild(this.content);
        }
        return this;
    };
    Stage.prototype.shouldDrawHit = function () {
        return true;
    };
    Stage.prototype.clear = function () {
        var layers = this.children, len = layers.length, n;
        for (n = 0; n < len; n++) {
            layers[n].clear();
        }
        return this;
    };
    Stage.prototype.clone = function (obj) {
        if (!obj) {
            obj = {};
        }
        obj.container = document.createElement('div');
        return Container_1.Container.prototype.clone.call(this, obj);
    };
    Stage.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var content = this.content;
        if (content && Util_1.Util._isInDocument(content)) {
            this.container().removeChild(content);
        }
        var index = exports.stages.indexOf(this);
        if (index > -1) {
            exports.stages.splice(index, 1);
        }
        return this;
    };
    Stage.prototype.getPointerPosition = function () {
        var pos = this._pointerPositions[0];
        if (!pos) {
            Util_1.Util.warn(NO_POINTERS_MESSAGE);
        }
        return {
            x: pos.x,
            y: pos.y
        };
    };
    Stage.prototype._getPointerById = function (id) {
        return this._pointerPositions.find(function (p) { return p.id === id; });
    };
    Stage.prototype.getPointersPositions = function () {
        return this._pointerPositions;
    };
    Stage.prototype.getStage = function () {
        return this;
    };
    Stage.prototype.getContent = function () {
        return this.content;
    };
    Stage.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        var x = config.x || 0, y = config.y || 0, canvas = new Canvas_1.SceneCanvas({
            width: config.width || this.width(),
            height: config.height || this.height(),
            pixelRatio: config.pixelRatio || 1
        }), _context = canvas.getContext()._context, layers = this.children;
        if (x || y) {
            _context.translate(-1 * x, -1 * y);
        }
        layers.each(function (layer) {
            if (!layer.isVisible()) {
                return;
            }
            var layerCanvas = layer._toKonvaCanvas(config);
            _context.drawImage(layerCanvas._canvas, x, y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
    };
    Stage.prototype.getIntersection = function (pos, selector) {
        var layers = this.children, len = layers.length, end = len - 1, n, shape;
        for (n = end; n >= 0; n--) {
            shape = layers[n].getIntersection(pos, selector);
            if (shape) {
                return shape;
            }
        }
        return null;
    };
    Stage.prototype._resizeDOM = function () {
        if (this.content) {
            var width = this.width(), height = this.height(), layers = this.getChildren(), len = layers.length, n, layer;
            this.content.style.width = width + PX;
            this.content.style.height = height + PX;
            this.bufferCanvas.setSize(width, height);
            this.bufferHitCanvas.setSize(width, height);
            for (n = 0; n < len; n++) {
                layer = layers[n];
                layer.setSize({ width: width, height: height });
                layer.draw();
            }
        }
    };
    Stage.prototype.add = function (layer) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        _super.prototype.add.call(this, layer);
        var length = this.children.length;
        if (length > MAX_LAYERS_NUMBER) {
            Util_1.Util.warn('The stage has ' +
                length +
                ' layers. Recommended maximin number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.');
        }
        layer._setCanvasSize(this.width(), this.height());
        layer.draw();
        if (Global_1.Konva.isBrowser) {
            this.content.appendChild(layer.canvas._canvas);
        }
        return this;
    };
    Stage.prototype.getParent = function () {
        return null;
    };
    Stage.prototype.getLayer = function () {
        return null;
    };
    Stage.prototype.hasPointerCapture = function (pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
    };
    Stage.prototype.setPointerCapture = function (pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
    };
    Stage.prototype.releaseCapture = function (pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
    };
    Stage.prototype.getLayers = function () {
        return this.getChildren();
    };
    Stage.prototype._bindContentEvents = function () {
        if (!Global_1.Konva.isBrowser) {
            return;
        }
        for (var n = 0; n < eventsLength; n++) {
            addEvent(this, EVENTS[n]);
        }
    };
    Stage.prototype._mouseenter = function (evt) {
        this.setPointersPositions(evt);
        this._fire(MOUSEENTER, { evt: evt, target: this, currentTarget: this });
    };
    Stage.prototype._mouseover = function (evt) {
        this.setPointersPositions(evt);
        this._fire(CONTENT_MOUSEOVER, { evt: evt });
        this._fire(MOUSEOVER, { evt: evt, target: this, currentTarget: this });
    };
    Stage.prototype._mouseout = function (evt) {
        this.setPointersPositions(evt);
        var targetShape = this.targetShape;
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (targetShape && eventsEnabled) {
            targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
            targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
            this.targetShape = null;
        }
        else if (eventsEnabled) {
            this._fire(MOUSELEAVE, {
                evt: evt,
                target: this,
                currentTarget: this
            });
            this._fire(MOUSEOUT, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this.pointerPos = undefined;
        this._pointerPositions = [];
        this._fire(CONTENT_MOUSEOUT, { evt: evt });
    };
    Stage.prototype._mousemove = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchmove(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape;
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (eventsEnabled) {
            shape = this.getIntersection(this.getPointerPosition());
            if (shape && shape.isListening()) {
                var differentTarget = !this.targetShape || this.targetShape !== shape;
                if (eventsEnabled && differentTarget) {
                    if (this.targetShape) {
                        this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt, pointerId: pointerId }, shape);
                        this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt, pointerId: pointerId }, shape);
                    }
                    shape._fireAndBubble(MOUSEOVER, { evt: evt, pointerId: pointerId }, this.targetShape);
                    shape._fireAndBubble(MOUSEENTER, { evt: evt, pointerId: pointerId }, this.targetShape);
                    shape._fireAndBubble(MOUSEMOVE, { evt: evt, pointerId: pointerId });
                    this.targetShape = shape;
                }
                else {
                    shape._fireAndBubble(MOUSEMOVE, { evt: evt, pointerId: pointerId });
                }
            }
            else {
                if (this.targetShape && eventsEnabled) {
                    this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt, pointerId: pointerId });
                    this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt, pointerId: pointerId });
                    this._fire(MOUSEOVER, {
                        evt: evt,
                        target: this,
                        currentTarget: this,
                        pointerId: pointerId
                    });
                    this.targetShape = null;
                }
                this._fire(MOUSEMOVE, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: pointerId
                });
            }
            this._fire(CONTENT_MOUSEMOVE, { evt: evt });
        }
        if (evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._mousedown = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchstart(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        Global_1.Konva.listenClickTap = true;
        if (shape && shape.isListening()) {
            this.clickStartShape = shape;
            shape._fireAndBubble(MOUSEDOWN, { evt: evt, pointerId: pointerId });
        }
        else {
            this._fire(MOUSEDOWN, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: pointerId
            });
        }
        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
    };
    Stage.prototype._mouseup = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchend(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape = this.getIntersection(this.getPointerPosition()), clickStartShape = this.clickStartShape, clickEndShape = this.clickEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
            fireDblClick = true;
            clearTimeout(this.dblTimeout);
        }
        else if (!DragAndDrop_1.DD.justDragged) {
            Global_1.Konva.inDblClickWindow = true;
            clearTimeout(this.dblTimeout);
        }
        else if (DragAndDrop_1.DD) {
            DragAndDrop_1.DD.justDragged = false;
        }
        this.dblTimeout = setTimeout(function () {
            Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        if (shape && shape.isListening()) {
            this.clickEndShape = shape;
            shape._fireAndBubble(MOUSEUP, { evt: evt, pointerId: pointerId });
            if (Global_1.Konva.listenClickTap &&
                clickStartShape &&
                clickStartShape._id === shape._id) {
                shape._fireAndBubble(CLICK, { evt: evt, pointerId: pointerId });
                if (fireDblClick && clickEndShape && clickEndShape === shape) {
                    shape._fireAndBubble(DBL_CLICK, { evt: evt, pointerId: pointerId });
                }
            }
        }
        else {
            this._fire(MOUSEUP, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: pointerId
            });
            if (Global_1.Konva.listenClickTap) {
                this._fire(CLICK, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: pointerId
                });
            }
            if (fireDblClick) {
                this._fire(DBL_CLICK, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: pointerId
                });
            }
        }
        this._fire(CONTENT_MOUSEUP, { evt: evt });
        if (Global_1.Konva.listenClickTap) {
            this._fire(CONTENT_CLICK, { evt: evt });
            if (fireDblClick) {
                this._fire(CONTENT_DBL_CLICK, { evt: evt });
            }
        }
        Global_1.Konva.listenClickTap = false;
        if (evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._contextmenu = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(CONTEXTMENU, { evt: evt });
        }
        else {
            this._fire(CONTEXTMENU, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_CONTEXTMENU, { evt: evt });
    };
    Stage.prototype._touchstart = function (evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var triggeredOnShape = false;
        this._changedPointerPositions.forEach(function (pos) {
            var shape = _this.getIntersection(pos);
            Global_1.Konva.listenClickTap = true;
            var hasShape = shape && shape.isListening();
            if (!hasShape) {
                return;
            }
            if (Global_1.Konva.captureTouchEventsEnabled) {
                shape.setPointerCapture(pos.id);
            }
            _this.tapStartShape = shape;
            shape._fireAndBubble(TOUCHSTART, { evt: evt, pointerId: pos.id }, _this);
            triggeredOnShape = true;
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                evt.preventDefault();
            }
        });
        if (!triggeredOnShape) {
            this._fire(TOUCHSTART, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        this._fire(CONTENT_TOUCHSTART, { evt: evt });
    };
    Stage.prototype._touchmove = function (evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (eventsEnabled) {
            var triggeredOnShape = false;
            var processedShapesIds = {};
            this._changedPointerPositions.forEach(function (pos) {
                var shape = PointerEvents.getCapturedShape(pos.id) || _this.getIntersection(pos);
                var hasShape = shape && shape.isListening();
                if (!hasShape) {
                    return;
                }
                if (processedShapesIds[shape._id]) {
                    return;
                }
                processedShapesIds[shape._id] = true;
                shape._fireAndBubble(TOUCHMOVE, { evt: evt, pointerId: pos.id });
                triggeredOnShape = true;
                if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                    evt.preventDefault();
                }
            });
            if (!triggeredOnShape) {
                this._fire(TOUCHMOVE, {
                    evt: evt,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                });
            }
            this._fire(CONTENT_TOUCHMOVE, { evt: evt });
        }
        if (DragAndDrop_1.DD.isDragging && DragAndDrop_1.DD.node.preventDefault() && evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._touchend = function (evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var clickEndShape = this.clickEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
            fireDblClick = true;
            clearTimeout(this.dblTimeout);
        }
        else {
            Global_1.Konva.inDblClickWindow = true;
            clearTimeout(this.dblTimeout);
        }
        this.dblTimeout = setTimeout(function () {
            Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        var triggeredOnShape = false;
        var processedShapesIds = {};
        this._changedPointerPositions.forEach(function (pos) {
            var shape = PointerEvents.getCapturedShape(pos.id) ||
                _this.getIntersection(pos);
            if (shape) {
                shape.releaseCapture(pos.id);
            }
            var hasShape = shape && shape.isListening();
            if (!hasShape) {
                return;
            }
            if (processedShapesIds[shape._id]) {
                return;
            }
            processedShapesIds[shape._id] = true;
            _this.clickEndShape = shape;
            shape._fireAndBubble(TOUCHEND, { evt: evt, pointerId: pos.id });
            triggeredOnShape = true;
            if (Global_1.Konva.listenClickTap &&
                _this.tapStartShape &&
                shape._id === _this.tapStartShape._id) {
                shape._fireAndBubble(TAP, { evt: evt, pointerId: pos.id });
                if (fireDblClick && clickEndShape && clickEndShape === shape) {
                    shape._fireAndBubble(DBL_TAP, { evt: evt, pointerId: pos.id });
                }
            }
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                evt.preventDefault();
            }
        });
        if (!triggeredOnShape) {
            this._fire(TOUCHEND, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        if (Global_1.Konva.listenClickTap) {
            this._fire(TAP, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        if (fireDblClick) {
            this._fire(DBL_TAP, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id
            });
        }
        this._fire(CONTENT_TOUCHEND, { evt: evt });
        if (Global_1.Konva.listenClickTap) {
            this._fire(CONTENT_TAP, { evt: evt });
            if (fireDblClick) {
                this._fire(CONTENT_DBL_TAP, { evt: evt });
            }
        }
        Global_1.Konva.listenClickTap = false;
    };
    Stage.prototype._wheel = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(WHEEL, { evt: evt });
        }
        else {
            this._fire(WHEEL, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_WHEEL, { evt: evt });
    };
    Stage.prototype._pointerdown = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERDOWN, PointerEvents.createEvent(evt));
        }
    };
    Stage.prototype._pointermove = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERMOVE, PointerEvents.createEvent(evt));
        }
    };
    Stage.prototype._pointerup = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage.prototype._pointercancel = function (evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
            return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage.prototype._lostpointercapture = function (evt) {
        PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage.prototype.setPointersPositions = function (evt) {
        var _this = this;
        var contentPosition = this._getContentPosition(), x = null, y = null;
        evt = evt ? evt : window.event;
        if (evt.touches !== undefined) {
            this._pointerPositions = [];
            this._changedPointerPositions = [];
            Util_1.Collection.prototype.each.call(evt.touches, function (touch) {
                _this._pointerPositions.push({
                    id: touch.identifier,
                    x: touch.clientX - contentPosition.left,
                    y: touch.clientY - contentPosition.top
                });
            });
            Util_1.Collection.prototype.each.call(evt.changedTouches || evt.touches, function (touch) {
                _this._changedPointerPositions.push({
                    id: touch.identifier,
                    x: touch.clientX - contentPosition.left,
                    y: touch.clientY - contentPosition.top
                });
            });
            if (evt.touches.length > 0) {
                var touch = evt.touches[0];
                x = touch.clientX - contentPosition.left;
                y = touch.clientY - contentPosition.top;
            }
        }
        else {
            x = evt.clientX - contentPosition.left;
            y = evt.clientY - contentPosition.top;
            this.pointerPos = {
                x: x,
                y: y
            };
            this._pointerPositions = [{ x: x, y: y, id: Util_1.Util._getFirstPointerId(evt) }];
            this._changedPointerPositions = [
                { x: x, y: y, id: Util_1.Util._getFirstPointerId(evt) }
            ];
        }
    };
    Stage.prototype._setPointerPosition = function (evt) {
        Util_1.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
    };
    Stage.prototype._getContentPosition = function () {
        var rect = this.content.getBoundingClientRect
            ? this.content.getBoundingClientRect()
            : { top: 0, left: 0 };
        return {
            top: rect.top,
            left: rect.left
        };
    };
    Stage.prototype._buildDOM = function () {
        this.bufferCanvas = new Canvas_1.SceneCanvas();
        this.bufferHitCanvas = new Canvas_1.HitCanvas({ pixelRatio: 1 });
        if (!Global_1.Konva.isBrowser) {
            return;
        }
        var container = this.container();
        if (!container) {
            throw 'Stage has no container. A container is required.';
        }
        container.innerHTML = EMPTY_STRING;
        this.content = document.createElement('div');
        this.content.style.position = RELATIVE;
        this.content.style.userSelect = 'none';
        this.content.className = KONVA_CONTENT;
        this.content.setAttribute('role', 'presentation');
        container.appendChild(this.content);
        this._resizeDOM();
    };
    Stage.prototype.cache = function () {
        Util_1.Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
        return this;
    };
    Stage.prototype.clearCache = function () {
        return this;
    };
    Stage.prototype.batchDraw = function () {
        this.children.each(function (layer) {
            layer.batchDraw();
        });
        return this;
    };
    return Stage;
}(Container_1.Container));
exports.Stage = Stage;
Stage.prototype.nodeType = STAGE;
Global_2._registerNode(Stage);
Factory_1.Factory.addGetterSetter(Stage, 'container');

},{"./Canvas":6,"./Container":7,"./DragAndDrop":9,"./Factory":10,"./Global":12,"./PointerEvents":16,"./Util":20}],19:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("./Util");
var Animation_1 = _dereq_("./Animation");
var Node_1 = _dereq_("./Node");
var Global_1 = _dereq_("./Global");
var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
}, PAUSED = 1, PLAYING = 2, REVERSING = 3, idCounter = 0, colorAttrs = ['fill', 'stroke', 'shadowColor'];
var TweenEngine = (function () {
    function TweenEngine(prop, propFunc, func, begin, finish, duration, yoyo) {
        this.prop = prop;
        this.propFunc = propFunc;
        this.begin = begin;
        this._pos = begin;
        this.duration = duration;
        this._change = 0;
        this.prevPos = 0;
        this.yoyo = yoyo;
        this._time = 0;
        this._position = 0;
        this._startTime = 0;
        this._finish = 0;
        this.func = func;
        this._change = finish - this.begin;
        this.pause();
    }
    TweenEngine.prototype.fire = function (str) {
        var handler = this[str];
        if (handler) {
            handler();
        }
    };
    TweenEngine.prototype.setTime = function (t) {
        if (t > this.duration) {
            if (this.yoyo) {
                this._time = this.duration;
                this.reverse();
            }
            else {
                this.finish();
            }
        }
        else if (t < 0) {
            if (this.yoyo) {
                this._time = 0;
                this.play();
            }
            else {
                this.reset();
            }
        }
        else {
            this._time = t;
            this.update();
        }
    };
    TweenEngine.prototype.getTime = function () {
        return this._time;
    };
    TweenEngine.prototype.setPosition = function (p) {
        this.prevPos = this._pos;
        this.propFunc(p);
        this._pos = p;
    };
    TweenEngine.prototype.getPosition = function (t) {
        if (t === undefined) {
            t = this._time;
        }
        return this.func(t, this.begin, this._change, this.duration);
    };
    TweenEngine.prototype.play = function () {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onPlay');
    };
    TweenEngine.prototype.reverse = function () {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onReverse');
    };
    TweenEngine.prototype.seek = function (t) {
        this.pause();
        this._time = t;
        this.update();
        this.fire('onSeek');
    };
    TweenEngine.prototype.reset = function () {
        this.pause();
        this._time = 0;
        this.update();
        this.fire('onReset');
    };
    TweenEngine.prototype.finish = function () {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire('onFinish');
    };
    TweenEngine.prototype.update = function () {
        this.setPosition(this.getPosition(this._time));
    };
    TweenEngine.prototype.onEnterFrame = function () {
        var t = this.getTimer() - this._startTime;
        if (this.state === PLAYING) {
            this.setTime(t);
        }
        else if (this.state === REVERSING) {
            this.setTime(this.duration - t);
        }
    };
    TweenEngine.prototype.pause = function () {
        this.state = PAUSED;
        this.fire('onPause');
    };
    TweenEngine.prototype.getTimer = function () {
        return new Date().getTime();
    };
    return TweenEngine;
}());
var Tween = (function () {
    function Tween(config) {
        var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo, key;
        if (typeof config.duration === 'undefined') {
            duration = 0.3;
        }
        else if (config.duration === 0) {
            duration = 0.001;
        }
        else {
            duration = config.duration;
        }
        this.node = node;
        this._id = idCounter++;
        var layers = node.getLayer() ||
            (node instanceof Global_1.Konva['Stage'] ? node.getLayers() : null);
        if (!layers) {
            Util_1.Util.error('Tween constructor have `node` that is not in a layer. Please add node into layer first.');
        }
        this.anim = new Animation_1.Animation(function () {
            that.tween.onEnterFrame();
        }, layers);
        this.tween = new TweenEngine(key, function (i) {
            that._tweenFunc(i);
        }, easing, 0, 1, duration * 1000, yoyo);
        this._addListeners();
        if (!Tween.attrs[nodeId]) {
            Tween.attrs[nodeId] = {};
        }
        if (!Tween.attrs[nodeId][this._id]) {
            Tween.attrs[nodeId][this._id] = {};
        }
        if (!Tween.tweens[nodeId]) {
            Tween.tweens[nodeId] = {};
        }
        for (key in config) {
            if (blacklist[key] === undefined) {
                this._addAttr(key, config[key]);
            }
        }
        this.reset();
        this.onFinish = config.onFinish;
        this.onReset = config.onReset;
    }
    Tween.prototype._addAttr = function (key, end) {
        var node = this.node, nodeId = node._id, start, diff, tweenId, n, len, trueEnd, trueStart, endRGBA;
        tweenId = Tween.tweens[nodeId][key];
        if (tweenId) {
            delete Tween.attrs[nodeId][tweenId][key];
        }
        start = node.getAttr(key);
        if (Util_1.Util._isArray(end)) {
            diff = [];
            len = Math.max(end.length, start.length);
            if (key === 'points' && end.length !== start.length) {
                if (end.length > start.length) {
                    trueStart = start;
                    start = Util_1.Util._prepareArrayForTween(start, end, node.closed());
                }
                else {
                    trueEnd = end;
                    end = Util_1.Util._prepareArrayForTween(end, start, node.closed());
                }
            }
            if (key.indexOf('fill') === 0) {
                for (n = 0; n < len; n++) {
                    if (n % 2 === 0) {
                        diff.push(end[n] - start[n]);
                    }
                    else {
                        var startRGBA = Util_1.Util.colorToRGBA(start[n]);
                        endRGBA = Util_1.Util.colorToRGBA(end[n]);
                        start[n] = startRGBA;
                        diff.push({
                            r: endRGBA.r - startRGBA.r,
                            g: endRGBA.g - startRGBA.g,
                            b: endRGBA.b - startRGBA.b,
                            a: endRGBA.a - startRGBA.a
                        });
                    }
                }
            }
            else {
                for (n = 0; n < len; n++) {
                    diff.push(end[n] - start[n]);
                }
            }
        }
        else if (colorAttrs.indexOf(key) !== -1) {
            start = Util_1.Util.colorToRGBA(start);
            endRGBA = Util_1.Util.colorToRGBA(end);
            diff = {
                r: endRGBA.r - start.r,
                g: endRGBA.g - start.g,
                b: endRGBA.b - start.b,
                a: endRGBA.a - start.a
            };
        }
        else {
            diff = end - start;
        }
        Tween.attrs[nodeId][this._id][key] = {
            start: start,
            diff: diff,
            end: end,
            trueEnd: trueEnd,
            trueStart: trueStart
        };
        Tween.tweens[nodeId][key] = this._id;
    };
    Tween.prototype._tweenFunc = function (i) {
        var node = this.node, attrs = Tween.attrs[node._id][this._id], key, attr, start, diff, newVal, n, len, end;
        for (key in attrs) {
            attr = attrs[key];
            start = attr.start;
            diff = attr.diff;
            end = attr.end;
            if (Util_1.Util._isArray(start)) {
                newVal = [];
                len = Math.max(start.length, end.length);
                if (key.indexOf('fill') === 0) {
                    for (n = 0; n < len; n++) {
                        if (n % 2 === 0) {
                            newVal.push((start[n] || 0) + diff[n] * i);
                        }
                        else {
                            newVal.push('rgba(' +
                                Math.round(start[n].r + diff[n].r * i) +
                                ',' +
                                Math.round(start[n].g + diff[n].g * i) +
                                ',' +
                                Math.round(start[n].b + diff[n].b * i) +
                                ',' +
                                (start[n].a + diff[n].a * i) +
                                ')');
                        }
                    }
                }
                else {
                    for (n = 0; n < len; n++) {
                        newVal.push((start[n] || 0) + diff[n] * i);
                    }
                }
            }
            else if (colorAttrs.indexOf(key) !== -1) {
                newVal =
                    'rgba(' +
                        Math.round(start.r + diff.r * i) +
                        ',' +
                        Math.round(start.g + diff.g * i) +
                        ',' +
                        Math.round(start.b + diff.b * i) +
                        ',' +
                        (start.a + diff.a * i) +
                        ')';
            }
            else {
                newVal = start + diff * i;
            }
            node.setAttr(key, newVal);
        }
    };
    Tween.prototype._addListeners = function () {
        var _this = this;
        this.tween.onPlay = function () {
            _this.anim.start();
        };
        this.tween.onReverse = function () {
            _this.anim.start();
        };
        this.tween.onPause = function () {
            _this.anim.stop();
        };
        this.tween.onFinish = function () {
            var node = _this.node;
            var attrs = Tween.attrs[node._id][_this._id];
            if (attrs.points && attrs.points.trueEnd) {
                node.setAttr('points', attrs.points.trueEnd);
            }
            if (_this.onFinish) {
                _this.onFinish.call(_this);
            }
        };
        this.tween.onReset = function () {
            var node = _this.node;
            var attrs = Tween.attrs[node._id][_this._id];
            if (attrs.points && attrs.points.trueStart) {
                node.points(attrs.points.trueStart);
            }
            if (_this.onReset) {
                _this.onReset();
            }
        };
    };
    Tween.prototype.play = function () {
        this.tween.play();
        return this;
    };
    Tween.prototype.reverse = function () {
        this.tween.reverse();
        return this;
    };
    Tween.prototype.reset = function () {
        this.tween.reset();
        return this;
    };
    Tween.prototype.seek = function (t) {
        this.tween.seek(t * 1000);
        return this;
    };
    Tween.prototype.pause = function () {
        this.tween.pause();
        return this;
    };
    Tween.prototype.finish = function () {
        this.tween.finish();
        return this;
    };
    Tween.prototype.destroy = function () {
        var nodeId = this.node._id, thisId = this._id, attrs = Tween.tweens[nodeId], key;
        this.pause();
        for (key in attrs) {
            delete Tween.tweens[nodeId][key];
        }
        delete Tween.attrs[nodeId][thisId];
    };
    Tween.attrs = {};
    Tween.tweens = {};
    return Tween;
}());
exports.Tween = Tween;
Node_1.Node.prototype.to = function (params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function () {
        this.destroy();
        if (onFinish) {
            onFinish();
        }
    };
    var tween = new Tween(params);
    tween.play();
};
exports.Easings = {
    BackEaseIn: function (t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function (t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function (t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1) {
            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    ElasticEaseIn: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (-(a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b);
    },
    ElasticEaseOut: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
            c +
            b);
    },
    ElasticEaseInOut: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        if (t < 1) {
            return (-0.5 *
                (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
                b);
        }
        return (a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
            0.5 +
            c +
            b);
    },
    BounceEaseOut: function (t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    BounceEaseIn: function (t, b, c, d) {
        return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseInOut: function (t, b, c, d) {
        if (t < d / 2) {
            return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
        }
        else {
            return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    },
    EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    EaseOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t + b;
        }
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    StrongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    StrongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    StrongEaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t * t * t + b;
        }
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Linear: function (t, b, c, d) {
        return (c * t) / d + b;
    }
};

},{"./Animation":4,"./Global":12,"./Node":15,"./Util":20}],20:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = _dereq_("./Global");
var Collection = (function () {
    function Collection() {
    }
    Collection.toCollection = function (arr) {
        var collection = new Collection(), len = arr.length, n;
        for (n = 0; n < len; n++) {
            collection.push(arr[n]);
        }
        return collection;
    };
    Collection._mapMethod = function (methodName) {
        Collection.prototype[methodName] = function () {
            var len = this.length, i;
            var args = [].slice.call(arguments);
            for (i = 0; i < len; i++) {
                this[i][methodName].apply(this[i], args);
            }
            return this;
        };
    };
    Collection.mapMethods = function (constructor) {
        var prot = constructor.prototype;
        for (var methodName in prot) {
            Collection._mapMethod(methodName);
        }
    };
    return Collection;
}());
exports.Collection = Collection;
Collection.prototype = [];
Collection.prototype.each = function (func) {
    for (var n = 0; n < this.length; n++) {
        func(this[n], n);
    }
};
Collection.prototype.toArray = function () {
    var arr = [], len = this.length, n;
    for (n = 0; n < len; n++) {
        arr.push(this[n]);
    }
    return arr;
};
var Transform = (function () {
    function Transform(m) {
        if (m === void 0) { m = [1, 0, 0, 1, 0, 0]; }
        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
    }
    Transform.prototype.copy = function () {
        return new Transform(this.m);
    };
    Transform.prototype.point = function (point) {
        var m = this.m;
        return {
            x: m[0] * point.x + m[2] * point.y + m[4],
            y: m[1] * point.x + m[3] * point.y + m[5]
        };
    };
    Transform.prototype.translate = function (x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
        return this;
    };
    Transform.prototype.scale = function (sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
    };
    Transform.prototype.rotate = function (rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.m[0] * c + this.m[2] * s;
        var m12 = this.m[1] * c + this.m[3] * s;
        var m21 = this.m[0] * -s + this.m[2] * c;
        var m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    };
    Transform.prototype.getTranslation = function () {
        return {
            x: this.m[4],
            y: this.m[5]
        };
    };
    Transform.prototype.skew = function (sx, sy) {
        var m11 = this.m[0] + this.m[2] * sy;
        var m12 = this.m[1] + this.m[3] * sy;
        var m21 = this.m[2] + this.m[0] * sx;
        var m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    };
    Transform.prototype.multiply = function (matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
    };
    Transform.prototype.invert = function () {
        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d;
        var m1 = -this.m[1] * d;
        var m2 = -this.m[2] * d;
        var m3 = this.m[0] * d;
        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
    };
    Transform.prototype.getMatrix = function () {
        return this.m;
    };
    Transform.prototype.setAbsolutePosition = function (x, y) {
        var m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3], m4 = this.m[4], m5 = this.m[5], yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2), xt = (x - m4 - m2 * yt) / m0;
        return this.translate(xt, yt);
    };
    return Transform;
}());
exports.Transform = Transform;
var OBJECT_ARRAY = '[object Array]', OBJECT_NUMBER = '[object Number]', OBJECT_STRING = '[object String]', OBJECT_BOOLEAN = '[object Boolean]', PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = '#', EMPTY_STRING = '', ZERO = '0', KONVA_WARNING = 'Konva warning: ', KONVA_ERROR = 'Konva error: ', RGB_PAREN = 'rgb(', COLORS = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5]
}, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, animQueue = [];
exports.Util = {
    _isElement: function (obj) {
        return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isPlainObject: function (obj) {
        return !!obj && obj.constructor === Object;
    },
    _isArray: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function (obj) {
        return (Object.prototype.toString.call(obj) === OBJECT_NUMBER &&
            !isNaN(obj) &&
            isFinite(obj));
    },
    _isString: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    isObject: function (val) {
        return val instanceof Object;
    },
    isValidSelector: function (selector) {
        if (typeof selector !== 'string') {
            return false;
        }
        var firstChar = selector[0];
        return (firstChar === '#' ||
            firstChar === '.' ||
            firstChar === firstChar.toUpperCase());
    },
    _sign: function (number) {
        if (number === 0) {
            return 0;
        }
        if (number > 0) {
            return 1;
        }
        else {
            return -1;
        }
    },
    requestAnimFrame: function (callback) {
        animQueue.push(callback);
        if (animQueue.length === 1) {
            requestAnimationFrame(function () {
                var queue = animQueue;
                animQueue = [];
                queue.forEach(function (cb) {
                    cb();
                });
            });
        }
    },
    createCanvasElement: function () {
        var canvas = document.createElement('canvas');
        try {
            canvas.style = canvas.style || {};
        }
        catch (e) { }
        return canvas;
    },
    createImageElement: function () {
        return document.createElement('img');
    },
    _isInDocument: function (el) {
        while ((el = el.parentNode)) {
            if (el == document) {
                return true;
            }
        }
        return false;
    },
    _simplifyArray: function (arr) {
        var retArr = [], len = arr.length, util = exports.Util, n, val;
        for (n = 0; n < len; n++) {
            val = arr[n];
            if (util._isNumber(val)) {
                val = Math.round(val * 1000) / 1000;
            }
            else if (!util._isString(val)) {
                val = val.toString();
            }
            retArr.push(val);
        }
        return retArr;
    },
    _urlToImage: function (url, callback) {
        var imageObj = new Global_1.glob.Image();
        imageObj.onload = function () {
            callback(imageObj);
        };
        imageObj.src = url;
    },
    _rgbToHex: function (r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function (hex) {
        hex = hex.replace(HASH, EMPTY_STRING);
        var bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    },
    getRandomColor: function () {
        var randColor = ((Math.random() * 0xffffff) << 0).toString(16);
        while (randColor.length < 6) {
            randColor = ZERO + randColor;
        }
        return HASH + randColor;
    },
    get: function (val, def) {
        if (val === undefined) {
            return def;
        }
        else {
            return val;
        }
    },
    getRGB: function (color) {
        var rgb;
        if (color in COLORS) {
            rgb = COLORS[color];
            return {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2]
            };
        }
        else if (color[0] === HASH) {
            return this._hexToRgb(color.substring(1));
        }
        else if (color.substr(0, 4) === RGB_PAREN) {
            rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
            return {
                r: parseInt(rgb[1], 10),
                g: parseInt(rgb[2], 10),
                b: parseInt(rgb[3], 10)
            };
        }
        else {
            return {
                r: 0,
                g: 0,
                b: 0
            };
        }
    },
    colorToRGBA: function (str) {
        str = str || 'black';
        return (exports.Util._namedColorToRBA(str) ||
            exports.Util._hex3ColorToRGBA(str) ||
            exports.Util._hex6ColorToRGBA(str) ||
            exports.Util._rgbColorToRGBA(str) ||
            exports.Util._rgbaColorToRGBA(str) ||
            exports.Util._hslColorToRGBA(str));
    },
    _namedColorToRBA: function (str) {
        var c = COLORS[str.toLowerCase()];
        if (!c) {
            return null;
        }
        return {
            r: c[0],
            g: c[1],
            b: c[2],
            a: 1
        };
    },
    _rgbColorToRGBA: function (str) {
        if (str.indexOf('rgb(') === 0) {
            str = str.match(/rgb\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: 1
            };
        }
    },
    _rgbaColorToRGBA: function (str) {
        if (str.indexOf('rgba(') === 0) {
            str = str.match(/rgba\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: parts[3]
            };
        }
    },
    _hex6ColorToRGBA: function (str) {
        if (str[0] === '#' && str.length === 7) {
            return {
                r: parseInt(str.slice(1, 3), 16),
                g: parseInt(str.slice(3, 5), 16),
                b: parseInt(str.slice(5, 7), 16),
                a: 1
            };
        }
    },
    _hex3ColorToRGBA: function (str) {
        if (str[0] === '#' && str.length === 4) {
            return {
                r: parseInt(str[1] + str[1], 16),
                g: parseInt(str[2] + str[2], 16),
                b: parseInt(str[3] + str[3], 16),
                a: 1
            };
        }
    },
    _hslColorToRGBA: function (str) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
            var _a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str), _ = _a[0], hsl = _a.slice(1);
            var h = Number(hsl[0]) / 360;
            var s = Number(hsl[1]) / 100;
            var l = Number(hsl[2]) / 100;
            var t2 = void 0;
            var t3 = void 0;
            var val = void 0;
            if (s === 0) {
                val = l * 255;
                return {
                    r: Math.round(val),
                    g: Math.round(val),
                    b: Math.round(val),
                    a: 1
                };
            }
            if (l < 0.5) {
                t2 = l * (1 + s);
            }
            else {
                t2 = l + s - l * s;
            }
            var t1 = 2 * l - t2;
            var rgb = [0, 0, 0];
            for (var i = 0; i < 3; i++) {
                t3 = h + 1 / 3 * -(i - 1);
                if (t3 < 0) {
                    t3++;
                }
                if (t3 > 1) {
                    t3--;
                }
                if (6 * t3 < 1) {
                    val = t1 + (t2 - t1) * 6 * t3;
                }
                else if (2 * t3 < 1) {
                    val = t2;
                }
                else if (3 * t3 < 2) {
                    val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                }
                else {
                    val = t1;
                }
                rgb[i] = val * 255;
            }
            return {
                r: Math.round(rgb[0]),
                g: Math.round(rgb[1]),
                b: Math.round(rgb[2]),
                a: 1
            };
        }
    },
    haveIntersection: function (r1, r2) {
        return !(r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y);
    },
    cloneObject: function (obj) {
        var retObj = {};
        for (var key in obj) {
            if (this._isPlainObject(obj[key])) {
                retObj[key] = this.cloneObject(obj[key]);
            }
            else if (this._isArray(obj[key])) {
                retObj[key] = this.cloneArray(obj[key]);
            }
            else {
                retObj[key] = obj[key];
            }
        }
        return retObj;
    },
    cloneArray: function (arr) {
        return arr.slice(0);
    },
    _degToRad: function (deg) {
        return deg * PI_OVER_DEG180;
    },
    _radToDeg: function (rad) {
        return rad * DEG180_OVER_PI;
    },
    _capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function (str) {
        throw new Error(KONVA_ERROR + str);
    },
    error: function (str) {
        console.error(KONVA_ERROR + str);
    },
    warn: function (str) {
        if (!Global_1.Konva.showWarnings) {
            return;
        }
        console.warn(KONVA_WARNING + str);
    },
    extend: function (child, parent) {
        function Ctor() {
            this.constructor = child;
        }
        Ctor.prototype = parent.prototype;
        var oldProto = child.prototype;
        child.prototype = new Ctor();
        for (var key in oldProto) {
            if (oldProto.hasOwnProperty(key)) {
                child.prototype[key] = oldProto[key];
            }
        }
        child.__super__ = parent.prototype;
        child.super = parent;
    },
    _getControlPoints: function (x0, y0, x1, y1, x2, y2, t) {
        var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = (t * d01) / (d01 + d12), fb = (t * d12) / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
        return [p1x, p1y, p2x, p2y];
    },
    _expandPoints: function (p, tension) {
        var len = p.length, allPoints = [], n, cp;
        for (n = 2; n < len - 2; n += 2) {
            cp = exports.Util._getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
            allPoints.push(cp[0]);
            allPoints.push(cp[1]);
            allPoints.push(p[n]);
            allPoints.push(p[n + 1]);
            allPoints.push(cp[2]);
            allPoints.push(cp[3]);
        }
        return allPoints;
    },
    each: function (obj, func) {
        for (var key in obj) {
            func(key, obj[key]);
        }
    },
    _inRange: function (val, left, right) {
        return left <= val && val < right;
    },
    _getProjectionToSegment: function (x1, y1, x2, y2, x3, y3) {
        var x, y, dist;
        var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (pd2 == 0) {
            x = x1;
            y = y1;
            dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
        }
        else {
            var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
            if (u < 0) {
                x = x1;
                y = y1;
                dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
            }
            else if (u > 1.0) {
                x = x2;
                y = y2;
                dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
            }
            else {
                x = x1 + u * (x2 - x1);
                y = y1 + u * (y2 - y1);
                dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
            }
        }
        return [x, y, dist];
    },
    _getProjectionToLine: function (pt, line, isClosed) {
        var pc = exports.Util.cloneObject(pt);
        var dist = Number.MAX_VALUE;
        line.forEach(function (p1, i) {
            if (!isClosed && i === line.length - 1) {
                return;
            }
            var p2 = line[(i + 1) % line.length];
            var proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
            var px = proj[0], py = proj[1], pdist = proj[2];
            if (pdist < dist) {
                pc.x = px;
                pc.y = py;
                dist = pdist;
            }
        });
        return pc;
    },
    _prepareArrayForTween: function (startArray, endArray, isClosed) {
        var n, start = [], end = [];
        if (startArray.length > endArray.length) {
            var temp = endArray;
            endArray = startArray;
            startArray = temp;
        }
        for (n = 0; n < startArray.length; n += 2) {
            start.push({
                x: startArray[n],
                y: startArray[n + 1]
            });
        }
        for (n = 0; n < endArray.length; n += 2) {
            end.push({
                x: endArray[n],
                y: endArray[n + 1]
            });
        }
        var newStart = [];
        end.forEach(function (point) {
            var pr = exports.Util._getProjectionToLine(point, start, isClosed);
            newStart.push(pr.x);
            newStart.push(pr.y);
        });
        return newStart;
    },
    _prepareToStringify: function (obj) {
        var desc;
        obj.visitedByCircularReferenceRemoval = true;
        for (var key in obj) {
            if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')) {
                continue;
            }
            desc = Object.getOwnPropertyDescriptor(obj, key);
            if (obj[key].visitedByCircularReferenceRemoval ||
                exports.Util._isElement(obj[key])) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
            else if (exports.Util._prepareToStringify(obj[key]) === null) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
        }
        delete obj.visitedByCircularReferenceRemoval;
        return obj;
    },
    _assign: function (target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    },
    _getFirstPointerId: function (evt) {
        if (!evt.touches) {
            return 999;
        }
        else {
            return evt.changedTouches[0].identifier;
        }
    }
};

},{"./Global":12}],21:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = _dereq_("./Global");
var Util_1 = _dereq_("./Util");
function _formatValue(val) {
    if (Util_1.Util._isString(val)) {
        return '"' + val + '"';
    }
    if (Object.prototype.toString.call(val) === '[object Number]') {
        return val;
    }
    if (Util_1.Util._isBoolean(val)) {
        return val;
    }
    return Object.prototype.toString.call(val);
}
function RGBComponent(val) {
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    return Math.round(val);
}
exports.RGBComponent = RGBComponent;
function alphaComponent(val) {
    if (val > 1) {
        return 1;
    }
    else if (val < 0.0001) {
        return 0.0001;
    }
    return val;
}
exports.alphaComponent = alphaComponent;
function getNumberValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isNumber(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number.');
            }
            return val;
        };
    }
}
exports.getNumberValidator = getNumberValidator;
function getNumberOrAutoValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            var isNumber = Util_1.Util._isNumber(val);
            var isAuto = val === 'auto';
            if (!(isNumber || isAuto)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number or "auto".');
            }
            return val;
        };
    }
}
exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
function getStringValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isString(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a string.');
            }
            return val;
        };
    }
}
exports.getStringValidator = getStringValidator;
function getFunctionValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isFunction(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a function.');
            }
            return val;
        };
    }
}
exports.getFunctionValidator = getFunctionValidator;
function getNumberArrayValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isArray(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a array of numbers.');
            }
            else {
                val.forEach(function (item) {
                    if (!Util_1.Util._isNumber(item)) {
                        Util_1.Util.warn('"' +
                            attr +
                            '" attribute has non numeric element ' +
                            item +
                            '. Make sure that all elements are numbers.');
                    }
                });
            }
            return val;
        };
    }
}
exports.getNumberArrayValidator = getNumberArrayValidator;
function getBooleanValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            var isBool = val === true || val === false;
            if (!isBool) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a boolean.');
            }
            return val;
        };
    }
}
exports.getBooleanValidator = getBooleanValidator;
function getComponentValidator(components) {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util.isObject(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be an object with properties ' +
                    components);
            }
            return val;
        };
    }
}
exports.getComponentValidator = getComponentValidator;

},{"./Global":12,"./Util":20}],22:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = _dereq_("./Global");
var Util_1 = _dereq_("./Util");
var Node_1 = _dereq_("./Node");
var Container_1 = _dereq_("./Container");
var Stage_1 = _dereq_("./Stage");
var Layer_1 = _dereq_("./Layer");
var FastLayer_1 = _dereq_("./FastLayer");
var Group_1 = _dereq_("./Group");
var DragAndDrop_1 = _dereq_("./DragAndDrop");
var Shape_1 = _dereq_("./Shape");
var Animation_1 = _dereq_("./Animation");
var Tween_1 = _dereq_("./Tween");
var Context_1 = _dereq_("./Context");
var Canvas_1 = _dereq_("./Canvas");
exports.Konva = Util_1.Util._assign(Global_1.Konva, {
    Collection: Util_1.Collection,
    Util: Util_1.Util,
    Node: Node_1.Node,
    ids: Node_1.ids,
    names: Node_1.names,
    Container: Container_1.Container,
    Stage: Stage_1.Stage,
    stages: Stage_1.stages,
    Layer: Layer_1.Layer,
    FastLayer: FastLayer_1.FastLayer,
    Group: Group_1.Group,
    DD: DragAndDrop_1.DD,
    Shape: Shape_1.Shape,
    shapes: Shape_1.shapes,
    Animation: Animation_1.Animation,
    Tween: Tween_1.Tween,
    Easings: Tween_1.Easings,
    Context: Context_1.Context,
    Canvas: Canvas_1.Canvas
});

},{"./Animation":4,"./Canvas":6,"./Container":7,"./Context":8,"./DragAndDrop":9,"./FastLayer":11,"./Global":12,"./Group":13,"./Layer":14,"./Node":15,"./Shape":17,"./Stage":18,"./Tween":19,"./Util":20}],23:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _CoreInternals_1 = _dereq_("./_CoreInternals");
var Arc_1 = _dereq_("./shapes/Arc");
var Arrow_1 = _dereq_("./shapes/Arrow");
var Circle_1 = _dereq_("./shapes/Circle");
var Ellipse_1 = _dereq_("./shapes/Ellipse");
var Image_1 = _dereq_("./shapes/Image");
var Label_1 = _dereq_("./shapes/Label");
var Line_1 = _dereq_("./shapes/Line");
var Path_1 = _dereq_("./shapes/Path");
var Rect_1 = _dereq_("./shapes/Rect");
var RegularPolygon_1 = _dereq_("./shapes/RegularPolygon");
var Ring_1 = _dereq_("./shapes/Ring");
var Sprite_1 = _dereq_("./shapes/Sprite");
var Star_1 = _dereq_("./shapes/Star");
var Text_1 = _dereq_("./shapes/Text");
var TextPath_1 = _dereq_("./shapes/TextPath");
var Transformer_1 = _dereq_("./shapes/Transformer");
var Wedge_1 = _dereq_("./shapes/Wedge");
var Blur_1 = _dereq_("./filters/Blur");
var Brighten_1 = _dereq_("./filters/Brighten");
var Contrast_1 = _dereq_("./filters/Contrast");
var Emboss_1 = _dereq_("./filters/Emboss");
var Enhance_1 = _dereq_("./filters/Enhance");
var Grayscale_1 = _dereq_("./filters/Grayscale");
var HSL_1 = _dereq_("./filters/HSL");
var HSV_1 = _dereq_("./filters/HSV");
var Invert_1 = _dereq_("./filters/Invert");
var Kaleidoscope_1 = _dereq_("./filters/Kaleidoscope");
var Mask_1 = _dereq_("./filters/Mask");
var Noise_1 = _dereq_("./filters/Noise");
var Pixelate_1 = _dereq_("./filters/Pixelate");
var Posterize_1 = _dereq_("./filters/Posterize");
var RGB_1 = _dereq_("./filters/RGB");
var RGBA_1 = _dereq_("./filters/RGBA");
var Sepia_1 = _dereq_("./filters/Sepia");
var Solarize_1 = _dereq_("./filters/Solarize");
var Threshold_1 = _dereq_("./filters/Threshold");
exports.Konva = _CoreInternals_1.Konva.Util._assign(_CoreInternals_1.Konva, {
    Arc: Arc_1.Arc,
    Arrow: Arrow_1.Arrow,
    Circle: Circle_1.Circle,
    Ellipse: Ellipse_1.Ellipse,
    Image: Image_1.Image,
    Label: Label_1.Label,
    Tag: Label_1.Tag,
    Line: Line_1.Line,
    Path: Path_1.Path,
    Rect: Rect_1.Rect,
    RegularPolygon: RegularPolygon_1.RegularPolygon,
    Ring: Ring_1.Ring,
    Sprite: Sprite_1.Sprite,
    Star: Star_1.Star,
    Text: Text_1.Text,
    TextPath: TextPath_1.TextPath,
    Transformer: Transformer_1.Transformer,
    Wedge: Wedge_1.Wedge,
    Filters: {
        Blur: Blur_1.Blur,
        Brighten: Brighten_1.Brighten,
        Contrast: Contrast_1.Contrast,
        Emboss: Emboss_1.Emboss,
        Enhance: Enhance_1.Enhance,
        Grayscale: Grayscale_1.Grayscale,
        HSL: HSL_1.HSL,
        HSV: HSV_1.HSV,
        Invert: Invert_1.Invert,
        Kaleidoscope: Kaleidoscope_1.Kaleidoscope,
        Mask: Mask_1.Mask,
        Noise: Noise_1.Noise,
        Pixelate: Pixelate_1.Pixelate,
        Posterize: Posterize_1.Posterize,
        RGB: RGB_1.RGB,
        RGBA: RGBA_1.RGBA,
        Sepia: Sepia_1.Sepia,
        Solarize: Solarize_1.Solarize,
        Threshold: Threshold_1.Threshold
    }
});

},{"./_CoreInternals":22,"./filters/Blur":24,"./filters/Brighten":25,"./filters/Contrast":26,"./filters/Emboss":27,"./filters/Enhance":28,"./filters/Grayscale":29,"./filters/HSL":30,"./filters/HSV":31,"./filters/Invert":32,"./filters/Kaleidoscope":33,"./filters/Mask":34,"./filters/Noise":35,"./filters/Pixelate":36,"./filters/Posterize":37,"./filters/RGB":38,"./filters/RGBA":39,"./filters/Sepia":40,"./filters/Solarize":41,"./filters/Threshold":42,"./shapes/Arc":44,"./shapes/Arrow":45,"./shapes/Circle":46,"./shapes/Ellipse":47,"./shapes/Image":48,"./shapes/Label":49,"./shapes/Line":50,"./shapes/Path":51,"./shapes/Rect":52,"./shapes/RegularPolygon":53,"./shapes/Ring":54,"./shapes/Sprite":55,"./shapes/Star":56,"./shapes/Text":57,"./shapes/TextPath":58,"./shapes/Transformer":59,"./shapes/Wedge":60}],24:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}
var mul_table = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456,
    388,
    335,
    292,
    512,
    454,
    405,
    364,
    328,
    298,
    271,
    496,
    456,
    420,
    388,
    360,
    335,
    312,
    292,
    273,
    512,
    482,
    454,
    428,
    405,
    383,
    364,
    345,
    328,
    312,
    298,
    284,
    271,
    259,
    496,
    475,
    456,
    437,
    420,
    404,
    388,
    374,
    360,
    347,
    335,
    323,
    312,
    302,
    292,
    282,
    273,
    265,
    512,
    497,
    482,
    468,
    454,
    441,
    428,
    417,
    405,
    394,
    383,
    373,
    364,
    354,
    345,
    337,
    328,
    320,
    312,
    305,
    298,
    291,
    284,
    278,
    271,
    265,
    259,
    507,
    496,
    485,
    475,
    465,
    456,
    446,
    437,
    428,
    420,
    412,
    404,
    396,
    388,
    381,
    374,
    367,
    360,
    354,
    347,
    341,
    335,
    329,
    323,
    318,
    312,
    307,
    302,
    297,
    292,
    287,
    282,
    278,
    273,
    269,
    265,
    261,
    512,
    505,
    497,
    489,
    482,
    475,
    468,
    461,
    454,
    447,
    441,
    435,
    428,
    422,
    417,
    411,
    405,
    399,
    394,
    389,
    383,
    378,
    373,
    368,
    364,
    359,
    354,
    350,
    345,
    341,
    337,
    332,
    328,
    324,
    320,
    316,
    312,
    309,
    305,
    301,
    298,
    294,
    291,
    287,
    284,
    281,
    278,
    274,
    271,
    268,
    265,
    262,
    259,
    257,
    507,
    501,
    496,
    491,
    485,
    480,
    475,
    470,
    465,
    460,
    456,
    451,
    446,
    442,
    437,
    433,
    428,
    424,
    420,
    416,
    412,
    408,
    404,
    400,
    396,
    392,
    388,
    385,
    381,
    377,
    374,
    370,
    367,
    363,
    360,
    357,
    354,
    350,
    347,
    344,
    341,
    338,
    335,
    332,
    329,
    326,
    323,
    320,
    318,
    315,
    312,
    310,
    307,
    304,
    302,
    299,
    297,
    294,
    292,
    289,
    287,
    285,
    282,
    280,
    278,
    275,
    273,
    271,
    269,
    267,
    265,
    263,
    261,
    259
];
var shg_table = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24
];
function filterGaussBlurRGBA(imageData, radius) {
    var pixels = imageData.data, width = imageData.width, height = imageData.height;
    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
    var div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2, stackStart = new BlurStack(), stackEnd = null, stack = stackStart, stackIn = null, stackOut = null, mul_sum = mul_table[radius], shg_sum = shg_table[radius];
    for (i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();
        if (i === radiusPlus1) {
            stackEnd = stack;
        }
    }
    stack.next = stackStart;
    yw = yi = 0;
    for (y = 0; y < height; y++) {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }
        for (i = 1; i < radiusPlus1; i++) {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
            a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;
            stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++) {
            pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa !== 0) {
                pa = 255 / pa;
                pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            }
            else {
                pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
            }
            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;
            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;
            p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
            r_in_sum += stackIn.r = pixels[p];
            g_in_sum += stackIn.g = pixels[p + 1];
            b_in_sum += stackIn.b = pixels[p + 2];
            a_in_sum += stackIn.a = pixels[p + 3];
            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;
            stackIn = stackIn.next;
            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;
            a_out_sum += pa = stackOut.a;
            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;
            stackOut = stackOut.next;
            yi += 4;
        }
        yw += width;
    }
    for (x = 0; x < width; x++) {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }
        yp = width;
        for (i = 1; i <= radius; i++) {
            yi = (yp + x) << 2;
            r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
            b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
            a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;
            stack = stack.next;
            if (i < heightMinus1) {
                yp += width;
            }
        }
        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++) {
            p = yi << 2;
            pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa > 0) {
                pa = 255 / pa;
                pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            }
            else {
                pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
            }
            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;
            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;
            p =
                (x +
                    ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width) <<
                    2;
            r_sum += r_in_sum += stackIn.r = pixels[p];
            g_sum += g_in_sum += stackIn.g = pixels[p + 1];
            b_sum += b_in_sum += stackIn.b = pixels[p + 2];
            a_sum += a_in_sum += stackIn.a = pixels[p + 3];
            stackIn = stackIn.next;
            r_out_sum += pr = stackOut.r;
            g_out_sum += pg = stackOut.g;
            b_out_sum += pb = stackOut.b;
            a_out_sum += pa = stackOut.a;
            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;
            stackOut = stackOut.next;
            yi += width;
        }
    }
}
exports.Blur = function Blur(imageData) {
    var radius = Math.round(this.blurRadius());
    if (radius > 0) {
        filterGaussBlurRGBA(imageData, radius);
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blurRadius', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],25:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.Brighten = function (imageData) {
    var brightness = this.brightness() * 255, data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 4) {
        data[i] += brightness;
        data[i + 1] += brightness;
        data[i + 2] += brightness;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'brightness', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],26:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.Contrast = function (imageData) {
    var adjust = Math.pow((this.contrast() + 100) / 100, 2);
    var data = imageData.data, nPixels = data.length, red = 150, green = 150, blue = 150, i;
    for (i = 0; i < nPixels; i += 4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        red /= 255;
        red -= 0.5;
        red *= adjust;
        red += 0.5;
        red *= 255;
        green /= 255;
        green -= 0.5;
        green *= adjust;
        green += 0.5;
        green *= 255;
        blue /= 255;
        blue -= 0.5;
        blue *= adjust;
        blue += 0.5;
        blue *= 255;
        red = red < 0 ? 0 : red > 255 ? 255 : red;
        green = green < 0 ? 0 : green > 255 ? 255 : green;
        blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
        data[i] = red;
        data[i + 1] = green;
        data[i + 2] = blue;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'contrast', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],27:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Util_1 = _dereq_("../Util");
var Validators_1 = _dereq_("../Validators");
exports.Emboss = function (imageData) {
    var strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), dirY = 0, dirX = 0, data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
    switch (direction) {
        case 'top-left':
            dirY = -1;
            dirX = -1;
            break;
        case 'top':
            dirY = -1;
            dirX = 0;
            break;
        case 'top-right':
            dirY = -1;
            dirX = 1;
            break;
        case 'right':
            dirY = 0;
            dirX = 1;
            break;
        case 'bottom-right':
            dirY = 1;
            dirX = 1;
            break;
        case 'bottom':
            dirY = 1;
            dirX = 0;
            break;
        case 'bottom-left':
            dirY = 1;
            dirX = -1;
            break;
        case 'left':
            dirY = 0;
            dirX = -1;
            break;
        default:
            Util_1.Util.error('Unknown emboss direction: ' + direction);
    }
    do {
        var offsetY = (y - 1) * w4;
        var otherY = dirY;
        if (y + otherY < 1) {
            otherY = 0;
        }
        if (y + otherY > h) {
            otherY = 0;
        }
        var offsetYOther = (y - 1 + otherY) * w * 4;
        var x = w;
        do {
            var offset = offsetY + (x - 1) * 4;
            var otherX = dirX;
            if (x + otherX < 1) {
                otherX = 0;
            }
            if (x + otherX > w) {
                otherX = 0;
            }
            var offsetOther = offsetYOther + (x - 1 + otherX) * 4;
            var dR = data[offset] - data[offsetOther];
            var dG = data[offset + 1] - data[offsetOther + 1];
            var dB = data[offset + 2] - data[offsetOther + 2];
            var dif = dR;
            var absDif = dif > 0 ? dif : -dif;
            var absG = dG > 0 ? dG : -dG;
            var absB = dB > 0 ? dB : -dB;
            if (absG > absDif) {
                dif = dG;
            }
            if (absB > absDif) {
                dif = dB;
            }
            dif *= strength;
            if (blend) {
                var r = data[offset] + dif;
                var g = data[offset + 1] + dif;
                var b = data[offset + 2] + dif;
                data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
                data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
                data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
            }
            else {
                var grey = greyLevel - dif;
                if (grey < 0) {
                    grey = 0;
                }
                else if (grey > 255) {
                    grey = 255;
                }
                data[offset] = data[offset + 1] = data[offset + 2] = grey;
            }
        } while (--x);
    } while (--y);
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossStrength', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossWhiteLevel', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossDirection', 'top-left', null, Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'embossBlend', false, null, Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Util":20,"../Validators":21}],28:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
function remap(fromValue, fromMin, fromMax, toMin, toMax) {
    var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;
    if (fromRange === 0) {
        return toMin + toRange / 2;
    }
    if (toRange === 0) {
        return toMin;
    }
    toValue = (fromValue - fromMin) / fromRange;
    toValue = toRange * toValue + toMin;
    return toValue;
}
exports.Enhance = function (imageData) {
    var data = imageData.data, nSubPixels = data.length, rMin = data[0], rMax = rMin, r, gMin = data[1], gMax = gMin, g, bMin = data[2], bMax = bMin, b, i;
    var enhanceAmount = this.enhance();
    if (enhanceAmount === 0) {
        return;
    }
    for (i = 0; i < nSubPixels; i += 4) {
        r = data[i + 0];
        if (r < rMin) {
            rMin = r;
        }
        else if (r > rMax) {
            rMax = r;
        }
        g = data[i + 1];
        if (g < gMin) {
            gMin = g;
        }
        else if (g > gMax) {
            gMax = g;
        }
        b = data[i + 2];
        if (b < bMin) {
            bMin = b;
        }
        else if (b > bMax) {
            bMax = b;
        }
    }
    if (rMax === rMin) {
        rMax = 255;
        rMin = 0;
    }
    if (gMax === gMin) {
        gMax = 255;
        gMin = 0;
    }
    if (bMax === bMin) {
        bMax = 255;
        bMin = 0;
    }
    var rMid, rGoalMax, rGoalMin, gMid, gGoalMax, gGoalMin, bMid, bGoalMax, bGoalMin;
    if (enhanceAmount > 0) {
        rGoalMax = rMax + enhanceAmount * (255 - rMax);
        rGoalMin = rMin - enhanceAmount * (rMin - 0);
        gGoalMax = gMax + enhanceAmount * (255 - gMax);
        gGoalMin = gMin - enhanceAmount * (gMin - 0);
        bGoalMax = bMax + enhanceAmount * (255 - bMax);
        bGoalMin = bMin - enhanceAmount * (bMin - 0);
    }
    else {
        rMid = (rMax + rMin) * 0.5;
        rGoalMax = rMax + enhanceAmount * (rMax - rMid);
        rGoalMin = rMin + enhanceAmount * (rMin - rMid);
        gMid = (gMax + gMin) * 0.5;
        gGoalMax = gMax + enhanceAmount * (gMax - gMid);
        gGoalMin = gMin + enhanceAmount * (gMin - gMid);
        bMid = (bMax + bMin) * 0.5;
        bGoalMax = bMax + enhanceAmount * (bMax - bMid);
        bGoalMin = bMin + enhanceAmount * (bMin - bMid);
    }
    for (i = 0; i < nSubPixels; i += 4) {
        data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
        data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
        data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'enhance', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],29:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grayscale = function (imageData) {
    var data = imageData.data, len = data.length, i, brightness;
    for (i = 0; i < len; i += 4) {
        brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
    }
};

},{}],30:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
Factory_1.Factory.addGetterSetter(Node_1.Node, 'hue', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'saturation', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'luminance', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
exports.HSL = function (imageData) {
    var data = imageData.data, nPixels = data.length, v = 1, s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127, i;
    var vsu = v * s * Math.cos((h * Math.PI) / 180), vsw = v * s * Math.sin((h * Math.PI) / 180);
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
    var r, g, b, a;
    for (i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        data[i + 0] = rr * r + rg * g + rb * b + l;
        data[i + 1] = gr * r + gg * g + gb * b + l;
        data[i + 2] = br * r + bg * g + bb * b + l;
        data[i + 3] = a;
    }
};

},{"../Factory":10,"../Node":15,"../Validators":21}],31:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.HSV = function (imageData) {
    var data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, i;
    var vsu = v * s * Math.cos((h * Math.PI) / 180), vsw = v * s * Math.sin((h * Math.PI) / 180);
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
    var r, g, b, a;
    for (i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        data[i + 0] = rr * r + rg * g + rb * b;
        data[i + 1] = gr * r + gg * g + gb * b;
        data[i + 2] = br * r + bg * g + bb * b;
        data[i + 3] = a;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'hue', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'saturation', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'value', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],32:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invert = function (imageData) {
    var data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Util_1 = _dereq_("../Util");
var Validators_1 = _dereq_("../Validators");
var ToPolar = function (src, dst, opt) {
    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, r = 0, g = 0, b = 0, a = 0;
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;
    var rSize = ySize, tSize = xSize, radius, theta;
    var conversion = ((360 / tSize) * Math.PI) / 180, sin, cos;
    for (theta = 0; theta < tSize; theta += 1) {
        sin = Math.sin(theta * conversion);
        cos = Math.cos(theta * conversion);
        for (radius = 0; radius < rSize; radius += 1) {
            x = Math.floor(xMid + ((rMax * radius) / rSize) * cos);
            y = Math.floor(yMid + ((rMax * radius) / rSize) * sin);
            i = (y * xSize + x) * 4;
            r = srcPixels[i + 0];
            g = srcPixels[i + 1];
            b = srcPixels[i + 2];
            a = srcPixels[i + 3];
            i = (theta + radius * xSize) * 4;
            dstPixels[i + 0] = r;
            dstPixels[i + 1] = g;
            dstPixels[i + 2] = b;
            dstPixels[i + 3] = a;
        }
    }
};
var FromPolar = function (src, dst, opt) {
    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, dx, dy, r = 0, g = 0, b = 0, a = 0;
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;
    var rSize = ySize, tSize = xSize, radius, theta, phaseShift = opt.polarRotation || 0;
    var x1, y1;
    for (x = 0; x < xSize; x += 1) {
        for (y = 0; y < ySize; y += 1) {
            dx = x - xMid;
            dy = y - yMid;
            radius = (Math.sqrt(dx * dx + dy * dy) * rSize) / rMax;
            theta = ((Math.atan2(dy, dx) * 180) / Math.PI + 360 + phaseShift) % 360;
            theta = (theta * tSize) / 360;
            x1 = Math.floor(theta);
            y1 = Math.floor(radius);
            i = (y1 * xSize + x1) * 4;
            r = srcPixels[i + 0];
            g = srcPixels[i + 1];
            b = srcPixels[i + 2];
            a = srcPixels[i + 3];
            i = (y * xSize + x) * 4;
            dstPixels[i + 0] = r;
            dstPixels[i + 1] = g;
            dstPixels[i + 2] = b;
            dstPixels[i + 3] = a;
        }
    }
};
exports.Kaleidoscope = function (imageData) {
    var xSize = imageData.width, ySize = imageData.height;
    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
    var power = Math.round(this.kaleidoscopePower());
    var angle = Math.round(this.kaleidoscopeAngle());
    var offset = Math.floor((xSize * (angle % 360)) / 360);
    if (power < 1) {
        return;
    }
    var tempCanvas = Util_1.Util.createCanvasElement();
    tempCanvas.width = xSize;
    tempCanvas.height = ySize;
    var scratchData = tempCanvas
        .getContext('2d')
        .getImageData(0, 0, xSize, ySize);
    ToPolar(imageData, scratchData, {
        polarCenterX: xSize / 2,
        polarCenterY: ySize / 2
    });
    var minSectionSize = xSize / Math.pow(2, power);
    while (minSectionSize <= 8) {
        minSectionSize = minSectionSize * 2;
        power -= 1;
    }
    minSectionSize = Math.ceil(minSectionSize);
    var sectionSize = minSectionSize;
    var xStart = 0, xEnd = sectionSize, xDelta = 1;
    if (offset + minSectionSize > xSize) {
        xStart = sectionSize;
        xEnd = 0;
        xDelta = -1;
    }
    for (y = 0; y < ySize; y += 1) {
        for (x = xStart; x !== xEnd; x += xDelta) {
            xoff = Math.round(x + offset) % xSize;
            srcPos = (xSize * y + xoff) * 4;
            r = scratchData.data[srcPos + 0];
            g = scratchData.data[srcPos + 1];
            b = scratchData.data[srcPos + 2];
            a = scratchData.data[srcPos + 3];
            dstPos = (xSize * y + x) * 4;
            scratchData.data[dstPos + 0] = r;
            scratchData.data[dstPos + 1] = g;
            scratchData.data[dstPos + 2] = b;
            scratchData.data[dstPos + 3] = a;
        }
    }
    for (y = 0; y < ySize; y += 1) {
        sectionSize = Math.floor(minSectionSize);
        for (i = 0; i < power; i += 1) {
            for (x = 0; x < sectionSize + 1; x += 1) {
                srcPos = (xSize * y + x) * 4;
                r = scratchData.data[srcPos + 0];
                g = scratchData.data[srcPos + 1];
                b = scratchData.data[srcPos + 2];
                a = scratchData.data[srcPos + 3];
                dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
                scratchData.data[dstPos + 0] = r;
                scratchData.data[dstPos + 1] = g;
                scratchData.data[dstPos + 2] = b;
                scratchData.data[dstPos + 3] = a;
            }
            sectionSize *= 2;
        }
    }
    FromPolar(scratchData, imageData, { polarRotation: 0 });
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'kaleidoscopePower', 2, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'kaleidoscopeAngle', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Util":20,"../Validators":21}],34:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
function pixelAt(idata, x, y) {
    var idx = (y * idata.width + x) * 4;
    var d = [];
    d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
    return d;
}
function rgbDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2));
}
function rgbMean(pTab) {
    var m = [0, 0, 0];
    for (var i = 0; i < pTab.length; i++) {
        m[0] += pTab[i][0];
        m[1] += pTab[i][1];
        m[2] += pTab[i][2];
    }
    m[0] /= pTab.length;
    m[1] /= pTab.length;
    m[2] /= pTab.length;
    return m;
}
function backgroundMask(idata, threshold) {
    var rgbv_no = pixelAt(idata, 0, 0);
    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
    var thres = threshold || 10;
    if (rgbDistance(rgbv_no, rgbv_ne) < thres &&
        rgbDistance(rgbv_ne, rgbv_se) < thres &&
        rgbDistance(rgbv_se, rgbv_so) < thres &&
        rgbDistance(rgbv_so, rgbv_no) < thres) {
        var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
        var mask = [];
        for (var i = 0; i < idata.width * idata.height; i++) {
            var d = rgbDistance(mean, [
                idata.data[i * 4],
                idata.data[i * 4 + 1],
                idata.data[i * 4 + 2]
            ]);
            mask[i] = d < thres ? 0 : 255;
        }
        return mask;
    }
}
function applyMask(idata, mask) {
    for (var i = 0; i < idata.width * idata.height; i++) {
        idata.data[4 * i + 3] = mask[i];
    }
}
function erodeMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
        for (var x = 0; x < sw; x++) {
            var so = y * sw + x;
            var a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = y + cy - halfSide;
                    var scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = scy * sw + scx;
                        var wt = weights[cy * side + cx];
                        a += mask[srcOff] * wt;
                    }
                }
            }
            maskResult[so] = a === 255 * 8 ? 255 : 0;
        }
    }
    return maskResult;
}
function dilateMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
        for (var x = 0; x < sw; x++) {
            var so = y * sw + x;
            var a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = y + cy - halfSide;
                    var scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = scy * sw + scx;
                        var wt = weights[cy * side + cx];
                        a += mask[srcOff] * wt;
                    }
                }
            }
            maskResult[so] = a >= 255 * 4 ? 255 : 0;
        }
    }
    return maskResult;
}
function smoothEdgeMask(mask, sw, sh) {
    var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
        for (var x = 0; x < sw; x++) {
            var so = y * sw + x;
            var a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = y + cy - halfSide;
                    var scx = x + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = scy * sw + scx;
                        var wt = weights[cy * side + cx];
                        a += mask[srcOff] * wt;
                    }
                }
            }
            maskResult[so] = a;
        }
    }
    return maskResult;
}
exports.Mask = function (imageData) {
    var threshold = this.threshold(), mask = backgroundMask(imageData, threshold);
    if (mask) {
        mask = erodeMask(mask, imageData.width, imageData.height);
        mask = dilateMask(mask, imageData.width, imageData.height);
        mask = smoothEdgeMask(mask, imageData.width, imageData.height);
        applyMask(imageData, mask);
    }
    return imageData;
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'threshold', 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],35:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.Noise = function (imageData) {
    var amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2, i;
    for (i = 0; i < nPixels; i += 4) {
        data[i + 0] += half - 2 * half * Math.random();
        data[i + 1] += half - 2 * half * Math.random();
        data[i + 2] += half - 2 * half * Math.random();
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'noise', 0.2, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],36:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Util_1 = _dereq_("../Util");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.Pixelate = function (imageData) {
    var pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, x, y, i, red, green, blue, alpha, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), xBinStart, xBinEnd, yBinStart, yBinEnd, xBin, yBin, pixelsInBin, data = imageData.data;
    if (pixelSize <= 0) {
        Util_1.Util.error('pixelSize value can not be <= 0');
        return;
    }
    for (xBin = 0; xBin < nBinsX; xBin += 1) {
        for (yBin = 0; yBin < nBinsY; yBin += 1) {
            red = 0;
            green = 0;
            blue = 0;
            alpha = 0;
            xBinStart = xBin * pixelSize;
            xBinEnd = xBinStart + pixelSize;
            yBinStart = yBin * pixelSize;
            yBinEnd = yBinStart + pixelSize;
            pixelsInBin = 0;
            for (x = xBinStart; x < xBinEnd; x += 1) {
                if (x >= width) {
                    continue;
                }
                for (y = yBinStart; y < yBinEnd; y += 1) {
                    if (y >= height) {
                        continue;
                    }
                    i = (width * y + x) * 4;
                    red += data[i + 0];
                    green += data[i + 1];
                    blue += data[i + 2];
                    alpha += data[i + 3];
                    pixelsInBin += 1;
                }
            }
            red = red / pixelsInBin;
            green = green / pixelsInBin;
            blue = blue / pixelsInBin;
            alpha = alpha / pixelsInBin;
            for (x = xBinStart; x < xBinEnd; x += 1) {
                if (x >= width) {
                    continue;
                }
                for (y = yBinStart; y < yBinEnd; y += 1) {
                    if (y >= height) {
                        continue;
                    }
                    i = (width * y + x) * 4;
                    data[i + 0] = red;
                    data[i + 1] = green;
                    data[i + 2] = blue;
                    data[i + 3] = alpha;
                }
            }
        }
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'pixelSize', 8, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Util":20,"../Validators":21}],37:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.Posterize = function (imageData) {
    var levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels, i;
    for (i = 0; i < len; i += 1) {
        data[i] = Math.floor(data[i] / scale) * scale;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'levels', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],38:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.RGB = function (imageData) {
    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), i, brightness;
    for (i = 0; i < nPixels; i += 4) {
        brightness =
            (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
        data[i] = brightness * red;
        data[i + 1] = brightness * green;
        data[i + 2] = brightness * blue;
        data[i + 3] = data[i + 3];
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'red', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'green', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],39:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.RGBA = function (imageData) {
    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha(), i, ia;
    for (i = 0; i < nPixels; i += 4) {
        ia = 1 - alpha;
        data[i] = red * alpha + data[i] * ia;
        data[i + 1] = green * alpha + data[i + 1] * ia;
        data[i + 2] = blue * alpha + data[i + 2] * ia;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'red', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'green', 0, function (val) {
    this._filterUpToDate = false;
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return Math.round(val);
    }
});
Factory_1.Factory.addGetterSetter(Node_1.Node, 'blue', 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
Factory_1.Factory.addGetterSetter(Node_1.Node, 'alpha', 1, function (val) {
    this._filterUpToDate = false;
    if (val > 1) {
        return 1;
    }
    else if (val < 0) {
        return 0;
    }
    else {
        return val;
    }
});

},{"../Factory":10,"../Node":15,"../Validators":21}],40:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sepia = function (imageData) {
    var data = imageData.data, nPixels = data.length, i, r, g, b;
    for (i = 0; i < nPixels; i += 4) {
        r = data[i + 0];
        g = data[i + 1];
        b = data[i + 2];
        data[i + 0] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
};

},{}],41:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solarize = function (imageData) {
    var data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
    do {
        var offsetY = (y - 1) * w4;
        var x = w;
        do {
            var offset = offsetY + (x - 1) * 4;
            var r = data[offset];
            var g = data[offset + 1];
            var b = data[offset + 2];
            if (r > 127) {
                r = 255 - r;
            }
            if (g > 127) {
                g = 255 - g;
            }
            if (b > 127) {
                b = 255 - b;
            }
            data[offset] = r;
            data[offset + 1] = g;
            data[offset + 2] = b;
        } while (--x);
    } while (--y);
};

},{}],42:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Validators_1 = _dereq_("../Validators");
exports.Threshold = function (imageData) {
    var level = this.threshold() * 255, data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 1) {
        data[i] = data[i] < level ? 0 : 255;
    }
};
Factory_1.Factory.addGetterSetter(Node_1.Node, 'threshold', 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);

},{"../Factory":10,"../Node":15,"../Validators":21}],43:[function(_dereq_,module,exports){
var Konva = _dereq_('./_FullInternals').Konva;
Konva._injectGlobal(Konva);
exports['default'] = Konva;
module.exports = exports['default'];

},{"./_FullInternals":23}],44:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Global_1 = _dereq_("../Global");
var Validators_1 = _dereq_("../Validators");
var Global_2 = _dereq_("../Global");
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arc.prototype._sceneFunc = function (context) {
        var angle = Global_1.Konva.getAngle(this.angle()), clockwise = this.clockwise();
        context.beginPath();
        context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
        context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Arc.prototype.getWidth = function () {
        return this.outerRadius() * 2;
    };
    Arc.prototype.getHeight = function () {
        return this.outerRadius() * 2;
    };
    Arc.prototype.setWidth = function (width) {
        this.outerRadius(width / 2);
    };
    Arc.prototype.setHeight = function (height) {
        this.outerRadius(height / 2);
    };
    return Arc;
}(Shape_1.Shape));
exports.Arc = Arc;
Arc.prototype._centroid = true;
Arc.prototype.className = 'Arc';
Arc.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
Global_2._registerNode(Arc);
Factory_1.Factory.addGetterSetter(Arc, 'innerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arc, 'outerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arc, 'angle', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arc, 'clockwise', false, Validators_1.getBooleanValidator());
Util_1.Collection.mapMethods(Arc);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],45:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Line_1 = _dereq_("./Line");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arrow.prototype._sceneFunc = function (ctx) {
        _super.prototype._sceneFunc.call(this, ctx);
        var PI2 = Math.PI * 2;
        var points = this.points();
        var tp = points;
        var fromTension = this.tension() !== 0 && points.length > 4;
        if (fromTension) {
            tp = this.getTensionPoints();
        }
        var n = points.length;
        var dx, dy;
        if (fromTension) {
            dx = points[n - 2] - (tp[tp.length - 2] + tp[tp.length - 4]) / 2;
            dy = points[n - 1] - (tp[tp.length - 1] + tp[tp.length - 3]) / 2;
        }
        else {
            dx = points[n - 2] - points[n - 4];
            dy = points[n - 1] - points[n - 3];
        }
        var radians = (Math.atan2(dy, dx) + PI2) % PI2;
        var length = this.pointerLength();
        var width = this.pointerWidth();
        ctx.save();
        ctx.beginPath();
        ctx.translate(points[n - 2], points[n - 1]);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width / 2);
        ctx.lineTo(-length, -width / 2);
        ctx.closePath();
        ctx.restore();
        if (this.pointerAtBeginning()) {
            ctx.save();
            ctx.translate(points[0], points[1]);
            if (fromTension) {
                dx = (tp[0] + tp[2]) / 2 - points[0];
                dy = (tp[1] + tp[3]) / 2 - points[1];
            }
            else {
                dx = points[2] - points[0];
                dy = points[3] - points[1];
            }
            ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
            ctx.moveTo(0, 0);
            ctx.lineTo(-length, width / 2);
            ctx.lineTo(-length, -width / 2);
            ctx.closePath();
            ctx.restore();
        }
        var isDashEnabled = this.dashEnabled();
        if (isDashEnabled) {
            this.attrs.dashEnabled = false;
            ctx.setLineDash([]);
        }
        ctx.fillStrokeShape(this);
        if (isDashEnabled) {
            this.attrs.dashEnabled = true;
        }
    };
    return Arrow;
}(Line_1.Line));
exports.Arrow = Arrow;
Arrow.prototype.className = 'Arrow';
Global_1._registerNode(Arrow);
Factory_1.Factory.addGetterSetter(Arrow, 'pointerLength', 10, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arrow, 'pointerWidth', 10, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Arrow, 'pointerAtBeginning', false);
Util_1.Collection.mapMethods(Arrow);

},{"../Factory":10,"../Global":12,"../Util":20,"../Validators":21,"./Line":50}],46:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Math.PI * 2, false);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Circle.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    Circle.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    Circle.prototype.setWidth = function (width) {
        if (this.radius() !== width / 2) {
            this.radius(width / 2);
        }
    };
    Circle.prototype.setHeight = function (height) {
        if (this.radius() !== height / 2) {
            this.radius(height / 2);
        }
    };
    return Circle;
}(Shape_1.Shape));
exports.Circle = Circle;
Circle.prototype._centroid = true;
Circle.prototype.className = 'Circle';
Circle.prototype._attrsAffectingSize = ['radius'];
Global_1._registerNode(Circle);
Factory_1.Factory.addGetterSetter(Circle, 'radius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Circle);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],47:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ellipse.prototype._sceneFunc = function (context) {
        var rx = this.radiusX(), ry = this.radiusY();
        context.beginPath();
        context.save();
        if (rx !== ry) {
            context.scale(1, ry / rx);
        }
        context.arc(0, 0, rx, 0, Math.PI * 2, false);
        context.restore();
        context.closePath();
        context.fillStrokeShape(this);
    };
    Ellipse.prototype.getWidth = function () {
        return this.radiusX() * 2;
    };
    Ellipse.prototype.getHeight = function () {
        return this.radiusY() * 2;
    };
    Ellipse.prototype.setWidth = function (width) {
        this.radiusX(width / 2);
    };
    Ellipse.prototype.setHeight = function (height) {
        this.radiusY(height / 2);
    };
    return Ellipse;
}(Shape_1.Shape));
exports.Ellipse = Ellipse;
Ellipse.prototype.className = 'Ellipse';
Ellipse.prototype._centroid = true;
Ellipse.prototype._attrsAffectingSize = ['radiusX', 'radiusY'];
Global_1._registerNode(Ellipse);
Factory_1.Factory.addComponentsGetterSetter(Ellipse, 'radius', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Ellipse, 'radiusX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Ellipse, 'radiusY', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Ellipse);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],48:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.prototype._useBufferCanvas = function () {
        return !!((this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
            this.hasStroke() &&
            this.getStage());
    };
    Image.prototype._sceneFunc = function (context) {
        var width = this.width(), height = this.height(), image = this.image(), cropWidth, cropHeight, params;
        if (image) {
            cropWidth = this.cropWidth();
            cropHeight = this.cropHeight();
            if (cropWidth && cropHeight) {
                params = [
                    image,
                    this.cropX(),
                    this.cropY(),
                    cropWidth,
                    cropHeight,
                    0,
                    0,
                    width,
                    height
                ];
            }
            else {
                params = [image, 0, 0, width, height];
            }
        }
        if (this.hasFill() || this.hasStroke()) {
            context.beginPath();
            context.rect(0, 0, width, height);
            context.closePath();
            context.fillStrokeShape(this);
        }
        if (image) {
            context.drawImage.apply(context, params);
        }
    };
    Image.prototype._hitFunc = function (context) {
        var width = this.width(), height = this.height();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Image.prototype.getWidth = function () {
        var image = this.image();
        return this.attrs.width || (image ? image.width : 0);
    };
    Image.prototype.getHeight = function () {
        var image = this.image();
        return this.attrs.height || (image ? image.height : 0);
    };
    Image.fromURL = function (url, callback) {
        var img = Util_1.Util.createImageElement();
        img.onload = function () {
            var image = new Image({
                image: img
            });
            callback(image);
        };
        img.crossOrigin = 'Anonymous';
        img.src = url;
    };
    return Image;
}(Shape_1.Shape));
exports.Image = Image;
Image.prototype.className = 'Image';
Global_1._registerNode(Image);
Factory_1.Factory.addGetterSetter(Image, 'image');
Factory_1.Factory.addComponentsGetterSetter(Image, 'crop', ['x', 'y', 'width', 'height']);
Factory_1.Factory.addGetterSetter(Image, 'cropX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Image, 'cropY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Image, 'cropWidth', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Image, 'cropHeight', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Image);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],49:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Group_1 = _dereq_("../Group");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var ATTR_CHANGE_LIST = [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'padding',
    'lineHeight',
    'text',
    'width'
], CHANGE_KONVA = 'Change.konva', NONE = 'none', UP = 'up', RIGHT = 'right', DOWN = 'down', LEFT = 'left', attrChangeListLen = ATTR_CHANGE_LIST.length;
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(config) {
        var _this = _super.call(this, config) || this;
        _this.on('add.konva', function (evt) {
            this._addListeners(evt.child);
            this._sync();
        });
        return _this;
    }
    Label.prototype.getText = function () {
        return this.find('Text')[0];
    };
    Label.prototype.getTag = function () {
        return this.find('Tag')[0];
    };
    Label.prototype._addListeners = function (text) {
        var that = this, n;
        var func = function () {
            that._sync();
        };
        for (n = 0; n < attrChangeListLen; n++) {
            text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
        }
    };
    Label.prototype.getWidth = function () {
        return this.getText().width();
    };
    Label.prototype.getHeight = function () {
        return this.getText().height();
    };
    Label.prototype._sync = function () {
        var text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x, y, pointerHeight;
        if (text && tag) {
            width = text.width();
            height = text.height();
            pointerDirection = tag.pointerDirection();
            pointerWidth = tag.pointerWidth();
            pointerHeight = tag.pointerHeight();
            x = 0;
            y = 0;
            switch (pointerDirection) {
                case UP:
                    x = width / 2;
                    y = -1 * pointerHeight;
                    break;
                case RIGHT:
                    x = width + pointerWidth;
                    y = height / 2;
                    break;
                case DOWN:
                    x = width / 2;
                    y = height + pointerHeight;
                    break;
                case LEFT:
                    x = -1 * pointerWidth;
                    y = height / 2;
                    break;
            }
            tag.setAttrs({
                x: -1 * x,
                y: -1 * y,
                width: width,
                height: height
            });
            text.setAttrs({
                x: -1 * x,
                y: -1 * y
            });
        }
    };
    return Label;
}(Group_1.Group));
exports.Label = Label;
Label.prototype.className = 'Label';
Global_1._registerNode(Label);
Util_1.Collection.mapMethods(Label);
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tag.prototype._sceneFunc = function (context) {
        var width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = Math.min(this.cornerRadius(), width / 2, height / 2);
        context.beginPath();
        if (!cornerRadius) {
            context.moveTo(0, 0);
        }
        else {
            context.moveTo(cornerRadius, 0);
        }
        if (pointerDirection === UP) {
            context.lineTo((width - pointerWidth) / 2, 0);
            context.lineTo(width / 2, -1 * pointerHeight);
            context.lineTo((width + pointerWidth) / 2, 0);
        }
        if (!cornerRadius) {
            context.lineTo(width, 0);
        }
        else {
            context.lineTo(width - cornerRadius, 0);
            context.arc(width - cornerRadius, cornerRadius, cornerRadius, (Math.PI * 3) / 2, 0, false);
        }
        if (pointerDirection === RIGHT) {
            context.lineTo(width, (height - pointerHeight) / 2);
            context.lineTo(width + pointerWidth, height / 2);
            context.lineTo(width, (height + pointerHeight) / 2);
        }
        if (!cornerRadius) {
            context.lineTo(width, height);
        }
        else {
            context.lineTo(width, height - cornerRadius);
            context.arc(width - cornerRadius, height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
        }
        if (pointerDirection === DOWN) {
            context.lineTo((width + pointerWidth) / 2, height);
            context.lineTo(width / 2, height + pointerHeight);
            context.lineTo((width - pointerWidth) / 2, height);
        }
        if (!cornerRadius) {
            context.lineTo(0, height);
        }
        else {
            context.lineTo(cornerRadius, height);
            context.arc(cornerRadius, height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
        }
        if (pointerDirection === LEFT) {
            context.lineTo(0, (height + pointerHeight) / 2);
            context.lineTo(-1 * pointerWidth, height / 2);
            context.lineTo(0, (height - pointerHeight) / 2);
        }
        if (cornerRadius) {
            context.lineTo(0, cornerRadius);
            context.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, (Math.PI * 3) / 2, false);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    Tag.prototype.getSelfRect = function () {
        var x = 0, y = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
        if (direction === UP) {
            y -= pointerHeight;
            height += pointerHeight;
        }
        else if (direction === DOWN) {
            height += pointerHeight;
        }
        else if (direction === LEFT) {
            x -= pointerWidth * 1.5;
            width += pointerWidth;
        }
        else if (direction === RIGHT) {
            width += pointerWidth * 1.5;
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    };
    return Tag;
}(Shape_1.Shape));
exports.Tag = Tag;
Tag.prototype.className = 'Tag';
Global_1._registerNode(Tag);
Factory_1.Factory.addGetterSetter(Tag, 'pointerDirection', NONE);
Factory_1.Factory.addGetterSetter(Tag, 'pointerWidth', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Tag, 'pointerHeight', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Tag, 'cornerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Tag);

},{"../Factory":10,"../Global":12,"../Group":13,"../Shape":17,"../Util":20,"../Validators":21}],50:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(config) {
        var _this = _super.call(this, config) || this;
        _this.on('pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva', function () {
            this._clearCache('tensionPoints');
        });
        return _this;
    }
    Line.prototype._sceneFunc = function (context) {
        var points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n;
        if (!length) {
            return;
        }
        context.beginPath();
        context.moveTo(points[0], points[1]);
        if (tension !== 0 && length > 4) {
            tp = this.getTensionPoints();
            len = tp.length;
            n = closed ? 0 : 4;
            if (!closed) {
                context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
            }
            while (n < len - 2) {
                context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
            }
            if (!closed) {
                context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
            }
        }
        else if (bezier) {
            n = 2;
            while (n < length) {
                context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
            }
        }
        else {
            for (n = 2; n < length; n += 2) {
                context.lineTo(points[n], points[n + 1]);
            }
        }
        if (closed) {
            context.closePath();
            context.fillStrokeShape(this);
        }
        else {
            context.strokeShape(this);
        }
    };
    Line.prototype.getTensionPoints = function () {
        return this._getCache('tensionPoints', this._getTensionPoints);
    };
    Line.prototype._getTensionPoints = function () {
        if (this.closed()) {
            return this._getTensionPointsClosed();
        }
        else {
            return Util_1.Util._expandPoints(this.points(), this.tension());
        }
    };
    Line.prototype._getTensionPointsClosed = function () {
        var p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = Util_1.Util._getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = Util_1.Util._getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = Util_1.Util._expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]]
            .concat(middle)
            .concat([
            lastControlPoints[0],
            lastControlPoints[1],
            p[len - 2],
            p[len - 1],
            lastControlPoints[2],
            lastControlPoints[3],
            firstControlPoints[0],
            firstControlPoints[1],
            p[0],
            p[1]
        ]);
        return tp;
    };
    Line.prototype.getWidth = function () {
        return this.getSelfRect().width;
    };
    Line.prototype.getHeight = function () {
        return this.getSelfRect().height;
    };
    Line.prototype.getSelfRect = function () {
        var points;
        if (this.tension() !== 0) {
            points = this._getTensionPoints();
        }
        else {
            points = this.points();
        }
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        return {
            x: Math.round(minX),
            y: Math.round(minY),
            width: Math.round(maxX - minX),
            height: Math.round(maxY - minY)
        };
    };
    return Line;
}(Shape_1.Shape));
exports.Line = Line;
Line.prototype.className = 'Line';
Line.prototype._attrsAffectingSize = ['points', 'bezier', 'tension'];
Global_1._registerNode(Line);
Factory_1.Factory.addGetterSetter(Line, 'closed', false);
Factory_1.Factory.addGetterSetter(Line, 'bezier', false);
Factory_1.Factory.addGetterSetter(Line, 'tension', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Line, 'points', [], Validators_1.getNumberArrayValidator());
Util_1.Collection.mapMethods(Line);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],51:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Global_1 = _dereq_("../Global");
var Path = (function (_super) {
    __extends(Path, _super);
    function Path(config) {
        var _this = _super.call(this, config) || this;
        _this.dataArray = [];
        _this.pathLength = 0;
        _this.dataArray = Path.parsePathData(_this.data());
        _this.pathLength = 0;
        for (var i = 0; i < _this.dataArray.length; ++i) {
            _this.pathLength += _this.dataArray[i].pathLength;
        }
        _this.on('dataChange.konva', function () {
            this.dataArray = Path.parsePathData(this.data());
            this.pathLength = 0;
            for (var i = 0; i < this.dataArray.length; ++i) {
                this.pathLength += this.dataArray[i].pathLength;
            }
        });
        return _this;
    }
    Path.prototype._sceneFunc = function (context) {
        var ca = this.dataArray;
        context.beginPath();
        for (var n = 0; n < ca.length; n++) {
            var c = ca[n].command;
            var p = ca[n].points;
            switch (c) {
                case 'L':
                    context.lineTo(p[0], p[1]);
                    break;
                case 'M':
                    context.moveTo(p[0], p[1]);
                    break;
                case 'C':
                    context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
                    break;
                case 'Q':
                    context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
                    break;
                case 'A':
                    var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
                    var r = rx > ry ? rx : ry;
                    var scaleX = rx > ry ? 1 : rx / ry;
                    var scaleY = rx > ry ? ry / rx : 1;
                    context.translate(cx, cy);
                    context.rotate(psi);
                    context.scale(scaleX, scaleY);
                    context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
                    context.scale(1 / scaleX, 1 / scaleY);
                    context.rotate(-psi);
                    context.translate(-cx, -cy);
                    break;
                case 'z':
                    context.closePath();
                    break;
            }
        }
        context.fillStrokeShape(this);
    };
    Path.prototype.getSelfRect = function () {
        var points = [];
        this.dataArray.forEach(function (data) {
            points = points.concat(data.points);
        });
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            if (!isNaN(x)) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
            }
            if (!isNaN(y)) {
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
        return {
            x: Math.round(minX),
            y: Math.round(minY),
            width: Math.round(maxX - minX),
            height: Math.round(maxY - minY)
        };
    };
    Path.prototype.getLength = function () {
        return this.pathLength;
    };
    Path.prototype.getPointAtLength = function (length) {
        var point, i = 0, ii = this.dataArray.length;
        if (!ii) {
            return null;
        }
        while (i < ii && length > this.dataArray[i].pathLength) {
            length -= this.dataArray[i].pathLength;
            ++i;
        }
        if (i === ii) {
            point = this.dataArray[i - 1].points.slice(-2);
            return {
                x: point[0],
                y: point[1]
            };
        }
        if (length < 0.01) {
            point = this.dataArray[i].points.slice(0, 2);
            return {
                x: point[0],
                y: point[1]
            };
        }
        var cp = this.dataArray[i];
        var p = cp.points;
        switch (cp.command) {
            case 'L':
                return Path.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
            case 'C':
                return Path.getPointOnCubicBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[4], p[5]);
            case 'Q':
                return Path.getPointOnQuadraticBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3]);
            case 'A':
                var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6];
                theta += (dTheta * length) / cp.pathLength;
                return Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
        }
        return null;
    };
    Path.getLineLength = function (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    Path.getPointOnLine = function (dist, P1x, P1y, P2x, P2y, fromX, fromY) {
        if (fromX === undefined) {
            fromX = P1x;
        }
        if (fromY === undefined) {
            fromY = P1y;
        }
        var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
        var run = Math.sqrt((dist * dist) / (1 + m * m));
        if (P2x < P1x) {
            run *= -1;
        }
        var rise = m * run;
        var pt;
        if (P2x === P1x) {
            pt = {
                x: fromX,
                y: fromY + rise
            };
        }
        else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
            pt = {
                x: fromX + run,
                y: fromY + rise
            };
        }
        else {
            var ix, iy;
            var len = this.getLineLength(P1x, P1y, P2x, P2y);
            if (len < 0.00000001) {
                return undefined;
            }
            var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
            u = u / (len * len);
            ix = P1x + u * (P2x - P1x);
            iy = P1y + u * (P2y - P1y);
            var pRise = this.getLineLength(fromX, fromY, ix, iy);
            var pRun = Math.sqrt(dist * dist - pRise * pRise);
            run = Math.sqrt((pRun * pRun) / (1 + m * m));
            if (P2x < P1x) {
                run *= -1;
            }
            rise = m * run;
            pt = {
                x: ix + run,
                y: iy + rise
            };
        }
        return pt;
    };
    Path.getPointOnCubicBezier = function (pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
        function CB1(t) {
            return t * t * t;
        }
        function CB2(t) {
            return 3 * t * t * (1 - t);
        }
        function CB3(t) {
            return 3 * t * (1 - t) * (1 - t);
        }
        function CB4(t) {
            return (1 - t) * (1 - t) * (1 - t);
        }
        var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
        var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
        return {
            x: x,
            y: y
        };
    };
    Path.getPointOnQuadraticBezier = function (pct, P1x, P1y, P2x, P2y, P3x, P3y) {
        function QB1(t) {
            return t * t;
        }
        function QB2(t) {
            return 2 * t * (1 - t);
        }
        function QB3(t) {
            return (1 - t) * (1 - t);
        }
        var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
        var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
        return {
            x: x,
            y: y
        };
    };
    Path.getPointOnEllipticalArc = function (cx, cy, rx, ry, theta, psi) {
        var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
        var pt = {
            x: rx * Math.cos(theta),
            y: ry * Math.sin(theta)
        };
        return {
            x: cx + (pt.x * cosPsi - pt.y * sinPsi),
            y: cy + (pt.x * sinPsi + pt.y * cosPsi)
        };
    };
    Path.parsePathData = function (data) {
        if (!data) {
            return [];
        }
        var cs = data;
        var cc = [
            'm',
            'M',
            'l',
            'L',
            'v',
            'V',
            'h',
            'H',
            'z',
            'Z',
            'c',
            'C',
            'q',
            'Q',
            't',
            'T',
            's',
            'S',
            'a',
            'A'
        ];
        cs = cs.replace(new RegExp(' ', 'g'), ',');
        for (var n = 0; n < cc.length; n++) {
            cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
        }
        var arr = cs.split('|');
        var ca = [];
        var coords = [];
        var cpx = 0;
        var cpy = 0;
        var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
        var match;
        for (n = 1; n < arr.length; n++) {
            var str = arr[n];
            var c = str.charAt(0);
            str = str.slice(1);
            coords.length = 0;
            while ((match = re.exec(str))) {
                coords.push(match[0]);
            }
            var p = [];
            for (var j = 0, jlen = coords.length; j < jlen; j++) {
                var parsed = parseFloat(coords[j]);
                if (!isNaN(parsed)) {
                    p.push(parsed);
                }
                else {
                    p.push(0);
                }
            }
            while (p.length > 0) {
                if (isNaN(p[0])) {
                    break;
                }
                var cmd = null;
                var points = [];
                var startX = cpx, startY = cpy;
                var prevCmd, ctlPtx, ctlPty;
                var rx, ry, psi, fa, fs, x1, y1;
                switch (c) {
                    case 'l':
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'L':
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'm':
                        var dx = p.shift();
                        var dy = p.shift();
                        cpx += dx;
                        cpy += dy;
                        cmd = 'M';
                        if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
                            for (var idx = ca.length - 2; idx >= 0; idx--) {
                                if (ca[idx].command === 'M') {
                                    cpx = ca[idx].points[0] + dx;
                                    cpy = ca[idx].points[1] + dy;
                                    break;
                                }
                            }
                        }
                        points.push(cpx, cpy);
                        c = 'l';
                        break;
                    case 'M':
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'M';
                        points.push(cpx, cpy);
                        c = 'L';
                        break;
                    case 'h':
                        cpx += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'H':
                        cpx = p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'v':
                        cpy += p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'V':
                        cpy = p.shift();
                        cmd = 'L';
                        points.push(cpx, cpy);
                        break;
                    case 'C':
                        points.push(p.shift(), p.shift(), p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'c':
                        points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 'S':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'C') {
                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
                            ctlPty = cpy + (cpy - prevCmd.points[3]);
                        }
                        points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 's':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'C') {
                            ctlPtx = cpx + (cpx - prevCmd.points[2]);
                            ctlPty = cpy + (cpy - prevCmd.points[3]);
                        }
                        points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'C';
                        points.push(cpx, cpy);
                        break;
                    case 'Q':
                        points.push(p.shift(), p.shift());
                        cpx = p.shift();
                        cpy = p.shift();
                        points.push(cpx, cpy);
                        break;
                    case 'q':
                        points.push(cpx + p.shift(), cpy + p.shift());
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'Q';
                        points.push(cpx, cpy);
                        break;
                    case 'T':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'Q') {
                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
                            ctlPty = cpy + (cpy - prevCmd.points[1]);
                        }
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'Q';
                        points.push(ctlPtx, ctlPty, cpx, cpy);
                        break;
                    case 't':
                        ctlPtx = cpx;
                        ctlPty = cpy;
                        prevCmd = ca[ca.length - 1];
                        if (prevCmd.command === 'Q') {
                            ctlPtx = cpx + (cpx - prevCmd.points[0]);
                            ctlPty = cpy + (cpy - prevCmd.points[1]);
                        }
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'Q';
                        points.push(ctlPtx, ctlPty, cpx, cpy);
                        break;
                    case 'A':
                        rx = p.shift();
                        ry = p.shift();
                        psi = p.shift();
                        fa = p.shift();
                        fs = p.shift();
                        x1 = cpx;
                        y1 = cpy;
                        cpx = p.shift();
                        cpy = p.shift();
                        cmd = 'A';
                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                        break;
                    case 'a':
                        rx = p.shift();
                        ry = p.shift();
                        psi = p.shift();
                        fa = p.shift();
                        fs = p.shift();
                        x1 = cpx;
                        y1 = cpy;
                        cpx += p.shift();
                        cpy += p.shift();
                        cmd = 'A';
                        points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                        break;
                }
                ca.push({
                    command: cmd || c,
                    points: points,
                    start: {
                        x: startX,
                        y: startY
                    },
                    pathLength: this.calcLength(startX, startY, cmd || c, points)
                });
            }
            if (c === 'z' || c === 'Z') {
                ca.push({
                    command: 'z',
                    points: [],
                    start: undefined,
                    pathLength: 0
                });
            }
        }
        return ca;
    };
    Path.calcLength = function (x, y, cmd, points) {
        var len, p1, p2, t;
        var path = Path;
        switch (cmd) {
            case 'L':
                return path.getLineLength(x, y, points[0], points[1]);
            case 'C':
                len = 0.0;
                p1 = path.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                for (t = 0.01; t <= 1; t += 0.01) {
                    p2 = path.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                return len;
            case 'Q':
                len = 0.0;
                p1 = path.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
                for (t = 0.01; t <= 1; t += 0.01) {
                    p2 = path.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
                    len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
                return len;
            case 'A':
                len = 0.0;
                var start = points[4];
                var dTheta = points[5];
                var end = points[4] + dTheta;
                var inc = Math.PI / 180.0;
                if (Math.abs(start - end) < inc) {
                    inc = Math.abs(start - end);
                }
                p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
                if (dTheta < 0) {
                    for (t = start - inc; t > end; t -= inc) {
                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                        p1 = p2;
                    }
                }
                else {
                    for (t = start + inc; t < end; t += inc) {
                        p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                        p1 = p2;
                    }
                }
                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                return len;
        }
        return 0;
    };
    Path.convertEndpointToCenterParameterization = function (x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
        var psi = psiDeg * (Math.PI / 180.0);
        var xp = (Math.cos(psi) * (x1 - x2)) / 2.0 + (Math.sin(psi) * (y1 - y2)) / 2.0;
        var yp = (-1 * Math.sin(psi) * (x1 - x2)) / 2.0 +
            (Math.cos(psi) * (y1 - y2)) / 2.0;
        var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
        if (lambda > 1) {
            rx *= Math.sqrt(lambda);
            ry *= Math.sqrt(lambda);
        }
        var f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
            (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
        if (fa === fs) {
            f *= -1;
        }
        if (isNaN(f)) {
            f = 0;
        }
        var cxp = (f * rx * yp) / ry;
        var cyp = (f * -ry * xp) / rx;
        var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
        var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
        var vMag = function (v) {
            return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        };
        var vRatio = function (u, v) {
            return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
        };
        var vAngle = function (u, v) {
            return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
        };
        var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
        var u = [(xp - cxp) / rx, (yp - cyp) / ry];
        var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
        var dTheta = vAngle(u, v);
        if (vRatio(u, v) <= -1) {
            dTheta = Math.PI;
        }
        if (vRatio(u, v) >= 1) {
            dTheta = 0;
        }
        if (fs === 0 && dTheta > 0) {
            dTheta = dTheta - 2 * Math.PI;
        }
        if (fs === 1 && dTheta < 0) {
            dTheta = dTheta + 2 * Math.PI;
        }
        return [cx, cy, rx, ry, theta, dTheta, psi, fs];
    };
    return Path;
}(Shape_1.Shape));
exports.Path = Path;
Path.prototype.className = 'Path';
Path.prototype._attrsAffectingSize = ['data'];
Global_1._registerNode(Path);
Factory_1.Factory.addGetterSetter(Path, 'data');
Util_1.Collection.mapMethods(Path);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20}],52:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Global_1 = _dereq_("../Global");
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rect.prototype._sceneFunc = function (context) {
        var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
        context.beginPath();
        if (!cornerRadius) {
            context.rect(0, 0, width, height);
        }
        else {
            var topLeft = 0;
            var topRight = 0;
            var bottomLeft = 0;
            var bottomRight = 0;
            if (typeof cornerRadius === 'number') {
                topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
            }
            else {
                topLeft = Math.min(cornerRadius[0], width / 2, height / 2);
                topRight = Math.min(cornerRadius[1], width / 2, height / 2);
                bottomRight = Math.min(cornerRadius[2], width / 2, height / 2);
                bottomLeft = Math.min(cornerRadius[3], width / 2, height / 2);
            }
            context.moveTo(topLeft, 0);
            context.lineTo(width - topRight, 0);
            context.arc(width - topRight, topRight, topRight, (Math.PI * 3) / 2, 0, false);
            context.lineTo(width, height - bottomRight);
            context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
            context.lineTo(bottomLeft, height);
            context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
            context.lineTo(0, topLeft);
            context.arc(topLeft, topLeft, topLeft, Math.PI, (Math.PI * 3) / 2, false);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    return Rect;
}(Shape_1.Shape));
exports.Rect = Rect;
Rect.prototype.className = 'Rect';
Global_1._registerNode(Rect);
Factory_1.Factory.addGetterSetter(Rect, 'cornerRadius', 0);
Util_1.Collection.mapMethods(Rect);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20}],53:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var RegularPolygon = (function (_super) {
    __extends(RegularPolygon, _super);
    function RegularPolygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegularPolygon.prototype._sceneFunc = function (context) {
        var sides = this.sides(), radius = this.radius(), n, x, y;
        context.beginPath();
        context.moveTo(0, 0 - radius);
        for (n = 1; n < sides; n++) {
            x = radius * Math.sin((n * 2 * Math.PI) / sides);
            y = -1 * radius * Math.cos((n * 2 * Math.PI) / sides);
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    RegularPolygon.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    RegularPolygon.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    RegularPolygon.prototype.setWidth = function (width) {
        this.radius(width / 2);
    };
    RegularPolygon.prototype.setHeight = function (height) {
        this.radius(height / 2);
    };
    return RegularPolygon;
}(Shape_1.Shape));
exports.RegularPolygon = RegularPolygon;
RegularPolygon.prototype.className = 'RegularPolygon';
RegularPolygon.prototype._centroid = true;
RegularPolygon.prototype._attrsAffectingSize = ['radius'];
Global_1._registerNode(RegularPolygon);
Factory_1.Factory.addGetterSetter(RegularPolygon, 'radius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(RegularPolygon, 'sides', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(RegularPolygon);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],54:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var PIx2 = Math.PI * 2;
var Ring = (function (_super) {
    __extends(Ring, _super);
    function Ring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ring.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
        context.moveTo(this.outerRadius(), 0);
        context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Ring.prototype.getWidth = function () {
        return this.outerRadius() * 2;
    };
    Ring.prototype.getHeight = function () {
        return this.outerRadius() * 2;
    };
    Ring.prototype.setWidth = function (width) {
        this.outerRadius(width / 2);
    };
    Ring.prototype.setHeight = function (height) {
        this.outerRadius(height / 2);
    };
    return Ring;
}(Shape_1.Shape));
exports.Ring = Ring;
Ring.prototype.className = 'Ring';
Ring.prototype._centroid = true;
Ring.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
Global_1._registerNode(Ring);
Factory_1.Factory.addGetterSetter(Ring, 'innerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Ring, 'outerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Ring);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],55:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Animation_1 = _dereq_("../Animation");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(config) {
        var _this = _super.call(this, config) || this;
        _this._updated = true;
        _this.anim = new Animation_1.Animation(function () {
            var updated = _this._updated;
            _this._updated = false;
            return updated;
        });
        _this.on('animationChange.konva', function () {
            this.frameIndex(0);
        });
        _this.on('frameIndexChange.konva', function () {
            this._updated = true;
        });
        _this.on('frameRateChange.konva', function () {
            if (!this.anim.isRunning()) {
                return;
            }
            clearInterval(this.interval);
            this._setInterval();
        });
        return _this;
    }
    Sprite.prototype._sceneFunc = function (context) {
        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x = set[ix4 + 0], y = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
        if (this.hasFill() || this.hasStroke()) {
            context.beginPath();
            context.rect(0, 0, width, height);
            context.closePath();
            context.fillStrokeShape(this);
        }
        if (image) {
            if (offsets) {
                var offset = offsets[anim], ix2 = index * 2;
                context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
            }
            else {
                context.drawImage(image, x, y, width, height, 0, 0, width, height);
            }
        }
    };
    Sprite.prototype._hitFunc = function (context) {
        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
        context.beginPath();
        if (offsets) {
            var offset = offsets[anim];
            var ix2 = index * 2;
            context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
        }
        else {
            context.rect(0, 0, width, height);
        }
        context.closePath();
        context.fillShape(this);
    };
    Sprite.prototype._useBufferCanvas = function () {
        return ((this.hasShadow() || this.getAbsoluteOpacity() !== 1) && this.hasStroke());
    };
    Sprite.prototype._setInterval = function () {
        var that = this;
        this.interval = setInterval(function () {
            that._updateIndex();
        }, 1000 / this.frameRate());
    };
    Sprite.prototype.start = function () {
        if (this.isRunning()) {
            return;
        }
        var layer = this.getLayer();
        this.anim.setLayers(layer);
        this._setInterval();
        this.anim.start();
    };
    Sprite.prototype.stop = function () {
        this.anim.stop();
        clearInterval(this.interval);
    };
    Sprite.prototype.isRunning = function () {
        return this.anim.isRunning();
    };
    Sprite.prototype._updateIndex = function () {
        var index = this.frameIndex(), animation = this.animation(), animations = this.animations(), anim = animations[animation], len = anim.length / 4;
        if (index < len - 1) {
            this.frameIndex(index + 1);
        }
        else {
            this.frameIndex(0);
        }
    };
    return Sprite;
}(Shape_1.Shape));
exports.Sprite = Sprite;
Sprite.prototype.className = 'Sprite';
Global_1._registerNode(Sprite);
Factory_1.Factory.addGetterSetter(Sprite, 'animation');
Factory_1.Factory.addGetterSetter(Sprite, 'animations');
Factory_1.Factory.addGetterSetter(Sprite, 'frameOffsets');
Factory_1.Factory.addGetterSetter(Sprite, 'image');
Factory_1.Factory.addGetterSetter(Sprite, 'frameIndex', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Sprite, 'frameRate', 17, Validators_1.getNumberValidator());
Factory_1.Factory.backCompat(Sprite, {
    index: 'frameIndex',
    getIndex: 'getFrameIndex',
    setIndex: 'setFrameIndex'
});
Util_1.Collection.mapMethods(Sprite);

},{"../Animation":4,"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],56:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var Star = (function (_super) {
    __extends(Star, _super);
    function Star() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Star.prototype._sceneFunc = function (context) {
        var innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
        context.beginPath();
        context.moveTo(0, 0 - outerRadius);
        for (var n = 1; n < numPoints * 2; n++) {
            var radius = n % 2 === 0 ? outerRadius : innerRadius;
            var x = radius * Math.sin((n * Math.PI) / numPoints);
            var y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
            context.lineTo(x, y);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    Star.prototype.getWidth = function () {
        return this.outerRadius() * 2;
    };
    Star.prototype.getHeight = function () {
        return this.outerRadius() * 2;
    };
    Star.prototype.setWidth = function (width) {
        this.outerRadius(width / 2);
    };
    Star.prototype.setHeight = function (height) {
        this.outerRadius(height / 2);
    };
    return Star;
}(Shape_1.Shape));
exports.Star = Star;
Star.prototype.className = 'Star';
Star.prototype._centroid = true;
Star.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
Global_1._registerNode(Star);
Factory_1.Factory.addGetterSetter(Star, 'numPoints', 5, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Star, 'innerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Star, 'outerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Star);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],57:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Global_1 = _dereq_("../Global");
var Validators_1 = _dereq_("../Validators");
var Global_2 = _dereq_("../Global");
var AUTO = 'auto', CENTER = 'center', JUSTIFY = 'justify', CHANGE_KONVA = 'Change.konva', CONTEXT_2D = '2d', DASH = '-', LEFT = 'left', TEXT = 'text', TEXT_UPPER = 'Text', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle', NORMAL = 'normal', PX_SPACE = 'px ', SPACE = ' ', RIGHT = 'right', WORD = 'word', CHAR = 'char', NONE = 'none', ELLIPSIS = '…', ATTR_CHANGE_LIST = [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'padding',
    'align',
    'verticalAlign',
    'lineHeight',
    'text',
    'width',
    'height',
    'wrap',
    'ellipsis',
    'letterSpacing'
], attrChangeListLen = ATTR_CHANGE_LIST.length;
var dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = Util_1.Util.createCanvasElement().getContext(CONTEXT_2D);
    return dummyContext;
}
function _fillFunc(context) {
    context.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function _strokeFunc(context) {
    context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function checkDefaultFill(config) {
    config = config || {};
    if (!config.fillLinearGradientColorStops &&
        !config.fillRadialGradientColorStops &&
        !config.fillPatternImage) {
        config.fill = config.fill || 'black';
    }
    return config;
}
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(config) {
        var _this = _super.call(this, checkDefaultFill(config)) || this;
        _this._partialTextX = 0;
        _this._partialTextY = 0;
        for (var n = 0; n < attrChangeListLen; n++) {
            _this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, _this._setTextData);
        }
        _this._setTextData();
        return _this;
    }
    Text.prototype._sceneFunc = function (context) {
        var padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, textArr = this.textArr, textArrLen = textArr.length, verticalAlign = this.verticalAlign(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf('underline') !== -1, shouldLineThrough = textDecoration.indexOf('line-through') !== -1, n;
        var translateY = 0;
        var translateY = lineHeightPx / 2;
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        context.setAttr('font', this._getContextFont());
        context.setAttr('textBaseline', MIDDLE);
        context.setAttr('textAlign', LEFT);
        if (verticalAlign === MIDDLE) {
            alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
        }
        else if (verticalAlign === BOTTOM) {
            alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
        }
        context.translate(padding, alignY + padding);
        for (n = 0; n < textArrLen; n++) {
            var lineTranslateX = 0;
            var lineTranslateY = 0;
            var obj = textArr[n], text = obj.text, width = obj.width, lastLine = n !== textArrLen - 1, spacesNumber, oneWord, lineWidth;
            context.save();
            if (align === RIGHT) {
                lineTranslateX += totalWidth - width - padding * 2;
            }
            else if (align === CENTER) {
                lineTranslateX += (totalWidth - width - padding * 2) / 2;
            }
            if (shouldUnderline) {
                context.save();
                context.beginPath();
                context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
                spacesNumber = text.split(' ').length - 1;
                oneWord = spacesNumber === 0;
                lineWidth =
                    align === JUSTIFY && lastLine && !oneWord
                        ? totalWidth - padding * 2
                        : width;
                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
                context.lineWidth = fontSize / 15;
                context.strokeStyle = fill;
                context.stroke();
                context.restore();
            }
            if (shouldLineThrough) {
                context.save();
                context.beginPath();
                context.moveTo(lineTranslateX, translateY + lineTranslateY);
                spacesNumber = text.split(' ').length - 1;
                oneWord = spacesNumber === 0;
                lineWidth =
                    align === JUSTIFY && lastLine && !oneWord
                        ? totalWidth - padding * 2
                        : width;
                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
                context.lineWidth = fontSize / 15;
                context.strokeStyle = fill;
                context.stroke();
                context.restore();
            }
            if (letterSpacing !== 0 || align === JUSTIFY) {
                spacesNumber = text.split(' ').length - 1;
                for (var li = 0; li < text.length; li++) {
                    var letter = text[li];
                    if (letter === ' ' && n !== textArrLen - 1 && align === JUSTIFY) {
                        lineTranslateX += Math.floor((totalWidth - padding * 2 - width) / spacesNumber);
                    }
                    this._partialTextX = lineTranslateX;
                    this._partialTextY = translateY + lineTranslateY;
                    this._partialText = letter;
                    context.fillStrokeShape(this);
                    lineTranslateX +=
                        Math.round(this.measureSize(letter).width) + letterSpacing;
                }
            }
            else {
                this._partialTextX = lineTranslateX;
                this._partialTextY = translateY + lineTranslateY;
                this._partialText = text;
                context.fillStrokeShape(this);
            }
            context.restore();
            if (textArrLen > 1) {
                translateY += lineHeightPx;
            }
        }
    };
    Text.prototype._hitFunc = function (context) {
        var width = this.getWidth(), height = this.getHeight();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Text.prototype.setText = function (text) {
        var str = Util_1.Util._isString(text) ? text : (text || '').toString();
        this._setAttr(TEXT, str);
        return this;
    };
    Text.prototype.getWidth = function () {
        var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
    };
    Text.prototype.getHeight = function () {
        var isAuto = this.attrs.height === AUTO || this.attrs.height === undefined;
        return isAuto
            ? this.fontSize() * this.textArr.length * this.lineHeight() +
                this.padding() * 2
            : this.attrs.height;
    };
    Text.prototype.getTextWidth = function () {
        return this.textWidth;
    };
    Text.prototype.getTextHeight = function () {
        Util_1.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
        return this.textHeight;
    };
    Text.prototype.measureSize = function (text) {
        var _context = getDummyContext(), fontSize = this.fontSize(), metrics;
        _context.save();
        _context.font = this._getContextFont();
        metrics = _context.measureText(text);
        _context.restore();
        return {
            width: metrics.width,
            height: fontSize
        };
    };
    Text.prototype._getContextFont = function () {
        if (Global_1.Konva.UA.isIE) {
            return (this.fontStyle() +
                SPACE +
                this.fontSize() +
                PX_SPACE +
                this.fontFamily());
        }
        return (this.fontStyle() +
            SPACE +
            this.fontVariant() +
            SPACE +
            this.fontSize() +
            PX_SPACE +
            this.fontFamily());
    };
    Text.prototype._addTextLine = function (line) {
        if (this.align() === JUSTIFY) {
            line = line.trim();
        }
        var width = this._getTextWidth(line);
        return this.textArr.push({ text: line, width: width });
    };
    Text.prototype._getTextWidth = function (text) {
        var letterSpacing = this.letterSpacing();
        var length = text.length;
        return (getDummyContext().measureText(text).width +
            (length ? letterSpacing * (length - 1) : 0));
    };
    Text.prototype._setTextData = function () {
        var lines = this.text().split('\n'), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== undefined, fixedHeight = height !== AUTO && height !== undefined, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis() && !shouldWrap;
        this.textArr = [];
        getDummyContext().font = this._getContextFont();
        var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
        for (var i = 0, max = lines.length; i < max; ++i) {
            var line = lines[i];
            var lineWidth = this._getTextWidth(line);
            if (fixedWidth && lineWidth > maxWidth) {
                while (line.length > 0) {
                    var low = 0, high = line.length, match = '', matchWidth = 0;
                    while (low < high) {
                        var mid = (low + high) >>> 1, substr = line.slice(0, mid + 1), substrWidth = this._getTextWidth(substr) + additionalWidth;
                        if (substrWidth <= maxWidth) {
                            low = mid + 1;
                            match = substr + (shouldAddEllipsis ? ELLIPSIS : '');
                            matchWidth = substrWidth;
                        }
                        else {
                            high = mid;
                        }
                    }
                    if (match) {
                        if (wrapAtWord) {
                            var wrapIndex;
                            var nextChar = line[match.length];
                            var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                            if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                                wrapIndex = match.length;
                            }
                            else {
                                wrapIndex =
                                    Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) +
                                        1;
                            }
                            if (wrapIndex > 0) {
                                low = wrapIndex;
                                match = match.slice(0, low);
                                matchWidth = this._getTextWidth(match);
                            }
                        }
                        match = match.trimRight();
                        this._addTextLine(match);
                        textWidth = Math.max(textWidth, matchWidth);
                        currentHeightPx += lineHeightPx;
                        if (!shouldWrap ||
                            (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)) {
                            break;
                        }
                        line = line.slice(low);
                        line = line.trimLeft();
                        if (line.length > 0) {
                            lineWidth = this._getTextWidth(line);
                            if (lineWidth <= maxWidth) {
                                this._addTextLine(line);
                                currentHeightPx += lineHeightPx;
                                textWidth = Math.max(textWidth, lineWidth);
                                break;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                this._addTextLine(line);
                currentHeightPx += lineHeightPx;
                textWidth = Math.max(textWidth, lineWidth);
            }
            if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
                break;
            }
        }
        this.textHeight = fontSize;
        this.textWidth = textWidth;
    };
    Text.prototype.getStrokeScaleEnabled = function () {
        return true;
    };
    return Text;
}(Shape_1.Shape));
exports.Text = Text;
Text.prototype._fillFunc = _fillFunc;
Text.prototype._strokeFunc = _strokeFunc;
Text.prototype.className = TEXT_UPPER;
Text.prototype._attrsAffectingSize = [
    'text',
    'fontSize',
    'padding',
    'wrap',
    'lineHeight'
];
Global_2._registerNode(Text);
Factory_1.Factory.overWriteSetter(Text, 'width', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.overWriteSetter(Text, 'height', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.addGetterSetter(Text, 'fontFamily', 'Arial');
Factory_1.Factory.addGetterSetter(Text, 'fontSize', 12, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'fontStyle', NORMAL);
Factory_1.Factory.addGetterSetter(Text, 'fontVariant', NORMAL);
Factory_1.Factory.addGetterSetter(Text, 'padding', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'align', LEFT);
Factory_1.Factory.addGetterSetter(Text, 'verticalAlign', TOP);
Factory_1.Factory.addGetterSetter(Text, 'lineHeight', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'wrap', WORD);
Factory_1.Factory.addGetterSetter(Text, 'ellipsis', false);
Factory_1.Factory.addGetterSetter(Text, 'letterSpacing', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Text, 'text', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Text, 'textDecoration', '');
Util_1.Collection.mapMethods(Text);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],58:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Path_1 = _dereq_("./Path");
var Text_1 = _dereq_("./Text");
var Validators_1 = _dereq_("../Validators");
var Global_1 = _dereq_("../Global");
var EMPTY_STRING = '', NORMAL = 'normal';
function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
}
function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
}
var TextPath = (function (_super) {
    __extends(TextPath, _super);
    function TextPath(config) {
        var _this = _super.call(this, config) || this;
        _this.dummyCanvas = Util_1.Util.createCanvasElement();
        _this.dataArray = [];
        _this.dataArray = Path_1.Path.parsePathData(_this.attrs.data);
        _this.on('dataChange.konva', function () {
            this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
            this._setTextData();
        });
        _this.on('textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva', _this._setTextData);
        if (config && config['getKerning']) {
            Util_1.Util.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.');
            _this.kerningFunc(config['getKerning']);
        }
        _this._setTextData();
        return _this;
    }
    TextPath.prototype._sceneFunc = function (context) {
        context.setAttr('font', this._getContextFont());
        context.setAttr('textBaseline', this.textBaseline());
        context.setAttr('textAlign', 'left');
        context.save();
        var textDecoration = this.textDecoration();
        var fill = this.fill();
        var fontSize = this.fontSize();
        var glyphInfo = this.glyphInfo;
        if (textDecoration === 'underline') {
            context.beginPath();
        }
        for (var i = 0; i < glyphInfo.length; i++) {
            context.save();
            var p0 = glyphInfo[i].p0;
            context.translate(p0.x, p0.y);
            context.rotate(glyphInfo[i].rotation);
            this.partialText = glyphInfo[i].text;
            context.fillStrokeShape(this);
            if (textDecoration === 'underline') {
                if (i === 0) {
                    context.moveTo(0, fontSize / 2 + 1);
                }
                context.lineTo(fontSize, fontSize / 2 + 1);
            }
            context.restore();
        }
        if (textDecoration === 'underline') {
            context.strokeStyle = fill;
            context.lineWidth = fontSize / 20;
            context.stroke();
        }
        context.restore();
    };
    TextPath.prototype._hitFunc = function (context) {
        context.beginPath();
        var glyphInfo = this.glyphInfo;
        if (glyphInfo.length >= 1) {
            var p0 = glyphInfo[0].p0;
            context.moveTo(p0.x, p0.y);
        }
        for (var i = 0; i < glyphInfo.length; i++) {
            var p1 = glyphInfo[i].p1;
            context.lineTo(p1.x, p1.y);
        }
        context.setAttr('lineWidth', this.fontSize());
        context.setAttr('strokeStyle', this.colorKey);
        context.stroke();
    };
    TextPath.prototype.getTextWidth = function () {
        return this.textWidth;
    };
    TextPath.prototype.getTextHeight = function () {
        Util_1.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
        return this.textHeight;
    };
    TextPath.prototype.setText = function (text) {
        return Text_1.Text.prototype.setText.call(this, text);
    };
    TextPath.prototype._getContextFont = function () {
        return Text_1.Text.prototype._getContextFont.call(this);
    };
    TextPath.prototype._getTextSize = function (text) {
        var dummyCanvas = this.dummyCanvas;
        var _context = dummyCanvas.getContext('2d');
        _context.save();
        _context.font = this._getContextFont();
        var metrics = _context.measureText(text);
        _context.restore();
        return {
            width: metrics.width,
            height: parseInt(this.attrs.fontSize, 10)
        };
    };
    TextPath.prototype._setTextData = function () {
        var that = this;
        var size = this._getTextSize(this.attrs.text);
        var letterSpacing = this.letterSpacing();
        var align = this.align();
        var kerningFunc = this.kerningFunc();
        this.textWidth = size.width;
        this.textHeight = size.height;
        var textFullWidth = Math.max(this.textWidth + ((this.attrs.text || '').length - 1) * letterSpacing, 0);
        this.glyphInfo = [];
        var fullPathWidth = 0;
        for (var l = 0; l < that.dataArray.length; l++) {
            if (that.dataArray[l].pathLength > 0) {
                fullPathWidth += that.dataArray[l].pathLength;
            }
        }
        var offset = 0;
        if (align === 'center') {
            offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
        }
        if (align === 'right') {
            offset = Math.max(0, fullPathWidth - textFullWidth);
        }
        var charArr = this.text().split('');
        var spacesNumber = this.text().split(' ').length - 1;
        var p0, p1, pathCmd;
        var pIndex = -1;
        var currentT = 0;
        var getNextPathSegment = function () {
            currentT = 0;
            var pathData = that.dataArray;
            for (var j = pIndex + 1; j < pathData.length; j++) {
                if (pathData[j].pathLength > 0) {
                    pIndex = j;
                    return pathData[j];
                }
                else if (pathData[j].command === 'M') {
                    p0 = {
                        x: pathData[j].points[0],
                        y: pathData[j].points[1]
                    };
                }
            }
            return {};
        };
        var findSegmentToFitCharacter = function (c) {
            var glyphWidth = that._getTextSize(c).width + letterSpacing;
            if (c === ' ' && align === 'justify') {
                glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
            }
            var currLen = 0;
            var attempts = 0;
            p1 = undefined;
            while (Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 &&
                attempts < 25) {
                attempts++;
                var cumulativePathLength = currLen;
                while (pathCmd === undefined) {
                    pathCmd = getNextPathSegment();
                    if (pathCmd &&
                        cumulativePathLength + pathCmd.pathLength < glyphWidth) {
                        cumulativePathLength += pathCmd.pathLength;
                        pathCmd = undefined;
                    }
                }
                if (pathCmd === {} || p0 === undefined) {
                    return undefined;
                }
                var needNewSegment = false;
                switch (pathCmd.command) {
                    case 'L':
                        if (Path_1.Path.getLineLength(p0.x, p0.y, pathCmd.points[0], pathCmd.points[1]) > glyphWidth) {
                            p1 = Path_1.Path.getPointOnLine(glyphWidth, p0.x, p0.y, pathCmd.points[0], pathCmd.points[1], p0.x, p0.y);
                        }
                        else {
                            pathCmd = undefined;
                        }
                        break;
                    case 'A':
                        var start = pathCmd.points[4];
                        var dTheta = pathCmd.points[5];
                        var end = pathCmd.points[4] + dTheta;
                        if (currentT === 0) {
                            currentT = start + 0.00000001;
                        }
                        else if (glyphWidth > currLen) {
                            currentT += ((Math.PI / 180.0) * dTheta) / Math.abs(dTheta);
                        }
                        else {
                            currentT -= ((Math.PI / 360.0) * dTheta) / Math.abs(dTheta);
                        }
                        if ((dTheta < 0 && currentT < end) ||
                            (dTheta >= 0 && currentT > end)) {
                            currentT = end;
                            needNewSegment = true;
                        }
                        p1 = Path_1.Path.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
                        break;
                    case 'C':
                        if (currentT === 0) {
                            if (glyphWidth > pathCmd.pathLength) {
                                currentT = 0.00000001;
                            }
                            else {
                                currentT = glyphWidth / pathCmd.pathLength;
                            }
                        }
                        else if (glyphWidth > currLen) {
                            currentT += (glyphWidth - currLen) / pathCmd.pathLength;
                        }
                        else {
                            currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
                        }
                        if (currentT > 1.0) {
                            currentT = 1.0;
                            needNewSegment = true;
                        }
                        p1 = Path_1.Path.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
                        break;
                    case 'Q':
                        if (currentT === 0) {
                            currentT = glyphWidth / pathCmd.pathLength;
                        }
                        else if (glyphWidth > currLen) {
                            currentT += (glyphWidth - currLen) / pathCmd.pathLength;
                        }
                        else {
                            currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
                        }
                        if (currentT > 1.0) {
                            currentT = 1.0;
                            needNewSegment = true;
                        }
                        p1 = Path_1.Path.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
                        break;
                }
                if (p1 !== undefined) {
                    currLen = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
                }
                if (needNewSegment) {
                    needNewSegment = false;
                    pathCmd = undefined;
                }
            }
        };
        var testChar = 'C';
        var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
        for (var k = 0; k < offset / glyphWidth; k++) {
            findSegmentToFitCharacter(testChar);
            if (p0 === undefined || p1 === undefined) {
                break;
            }
            p0 = p1;
        }
        for (var i = 0; i < charArr.length; i++) {
            findSegmentToFitCharacter(charArr[i]);
            if (p0 === undefined || p1 === undefined) {
                break;
            }
            var width = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
            var kern = 0;
            if (kerningFunc) {
                try {
                    kern = kerningFunc(charArr[i - 1], charArr[i]) * this.fontSize();
                }
                catch (e) {
                    kern = 0;
                }
            }
            p0.x += kern;
            p1.x += kern;
            this.textWidth += kern;
            var midpoint = Path_1.Path.getPointOnLine(kern + width / 2.0, p0.x, p0.y, p1.x, p1.y);
            var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
            this.glyphInfo.push({
                transposeX: midpoint.x,
                transposeY: midpoint.y,
                text: charArr[i],
                rotation: rotation,
                p0: p0,
                p1: p1
            });
            p0 = p1;
        }
    };
    TextPath.prototype.getSelfRect = function () {
        var points = [];
        this.glyphInfo.forEach(function (info) {
            points.push(info.p0.x);
            points.push(info.p0.y);
            points.push(info.p1.x);
            points.push(info.p1.y);
        });
        var minX = points[0];
        var maxX = points[0];
        var minY = points[0];
        var maxY = points[0];
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        var fontSize = this.fontSize();
        return {
            x: Math.round(minX) - fontSize / 2,
            y: Math.round(minY) - fontSize / 2,
            width: Math.round(maxX - minX) + fontSize,
            height: Math.round(maxY - minY) + fontSize
        };
    };
    return TextPath;
}(Shape_1.Shape));
exports.TextPath = TextPath;
TextPath.prototype._fillFunc = _fillFunc;
TextPath.prototype._strokeFunc = _strokeFunc;
TextPath.prototype._fillFuncHit = _fillFunc;
TextPath.prototype._strokeFuncHit = _strokeFunc;
TextPath.prototype.className = 'TextPath';
TextPath.prototype._attrsAffectingSize = ['text', 'fontSize', 'data'];
Global_1._registerNode(TextPath);
Factory_1.Factory.addGetterSetter(TextPath, 'data');
Factory_1.Factory.addGetterSetter(TextPath, 'fontFamily', 'Arial');
Factory_1.Factory.addGetterSetter(TextPath, 'fontSize', 12, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(TextPath, 'fontStyle', NORMAL);
Factory_1.Factory.addGetterSetter(TextPath, 'align', 'left');
Factory_1.Factory.addGetterSetter(TextPath, 'letterSpacing', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(TextPath, 'textBaseline', 'middle');
Factory_1.Factory.addGetterSetter(TextPath, 'fontVariant', NORMAL);
Factory_1.Factory.addGetterSetter(TextPath, 'text', EMPTY_STRING);
Factory_1.Factory.addGetterSetter(TextPath, 'textDecoration', null);
Factory_1.Factory.addGetterSetter(TextPath, 'kerningFunc', null);
Util_1.Collection.mapMethods(TextPath);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21,"./Path":51,"./Text":57}],59:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Node_1 = _dereq_("../Node");
var Shape_1 = _dereq_("../Shape");
var Rect_1 = _dereq_("./Rect");
var Group_1 = _dereq_("../Group");
var Global_1 = _dereq_("../Global");
var Validators_1 = _dereq_("../Validators");
var Global_2 = _dereq_("../Global");
var EVENTS_NAME = 'tr-konva';
var ATTR_CHANGE_LIST = [
    'resizeEnabledChange',
    'rotateAnchorOffsetChange',
    'rotateEnabledChange',
    'enabledAnchorsChange',
    'anchorSizeChange',
    'borderEnabledChange',
    'borderStrokeChange',
    'borderStrokeWidthChange',
    'borderDashChange',
    'anchorStrokeChange',
    'anchorStrokeWidthChange',
    'anchorFillChange',
    'anchorCornerRadiusChange',
    'ignoreStrokeChange'
]
    .map(function (e) { return e + ("." + EVENTS_NAME); })
    .join(' ');
var NODE_RECT = 'nodeRect';
var TRANSFORM_CHANGE_STR = [
    'widthChange',
    'heightChange',
    'scaleXChange',
    'scaleYChange',
    'skewXChange',
    'skewYChange',
    'rotationChange',
    'offsetXChange',
    'offsetYChange',
    'transformsEnabledChange',
    'strokeWidthChange'
]
    .map(function (e) { return e + ("." + EVENTS_NAME); })
    .join(' ');
var ANGLES = {
    'top-left': -45,
    'top-center': 0,
    'top-right': 45,
    'middle-right': -90,
    'middle-left': 90,
    'bottom-left': -135,
    'bottom-center': 180,
    'bottom-right': 135
};
function getCursor(anchorName, rad, isMirrored) {
    if (anchorName === 'rotater') {
        return 'crosshair';
    }
    rad += Util_1.Util._degToRad(ANGLES[anchorName] || 0);
    if (isMirrored) {
        rad *= -1;
    }
    var angle = ((Util_1.Util._radToDeg(rad) % 360) + 360) % 360;
    if (Util_1.Util._inRange(angle, 315 + 22.5, 360) || Util_1.Util._inRange(angle, 0, 22.5)) {
        return 'ns-resize';
    }
    else if (Util_1.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
        return 'nesw-resize';
    }
    else if (Util_1.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
        return 'ew-resize';
    }
    else if (Util_1.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
        return 'nwse-resize';
    }
    else if (Util_1.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
        return 'ns-resize';
    }
    else if (Util_1.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
        return 'nesw-resize';
    }
    else if (Util_1.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
        return 'ew-resize';
    }
    else if (Util_1.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
        return 'nwse-resize';
    }
    else {
        Util_1.Util.error('Transformer has unknown angle for cursor detection: ' + angle);
        return 'pointer';
    }
}
var ANCHORS_NAMES = [
    'top-left',
    'top-center',
    'top-right',
    'middle-right',
    'middle-left',
    'bottom-left',
    'bottom-center',
    'bottom-right'
];
var MAX_SAFE_INTEGER = 100000000;
var Transformer = (function (_super) {
    __extends(Transformer, _super);
    function Transformer(config) {
        var _this = _super.call(this, config) || this;
        _this._transforming = false;
        _this._createElements();
        _this._handleMouseMove = _this._handleMouseMove.bind(_this);
        _this._handleMouseUp = _this._handleMouseUp.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.on(ATTR_CHANGE_LIST, _this.update);
        if (_this.getNode()) {
            _this.update();
        }
        return _this;
    }
    Transformer.prototype.attachTo = function (node) {
        this.setNode(node);
        return this;
    };
    Transformer.prototype.setNode = function (node) {
        var _this = this;
        if (this._node) {
            this.detach();
        }
        this._node = node;
        this._resetTransformCache();
        var additionalEvents = node._attrsAffectingSize
            .map(function (prop) { return prop + 'Change.' + EVENTS_NAME; })
            .join(' ');
        var onChange = function () {
            _this._resetTransformCache();
            if (!_this._transforming) {
                _this.update();
            }
        };
        node.on(additionalEvents, onChange);
        node.on(TRANSFORM_CHANGE_STR, onChange);
        node.on("xChange." + EVENTS_NAME + " yChange." + EVENTS_NAME, function () {
            return _this._resetTransformCache();
        });
        var elementsCreated = !!this.findOne('.top-left');
        if (elementsCreated) {
            this.update();
        }
        return this;
    };
    Transformer.prototype.getNode = function () {
        return this._node;
    };
    Transformer.prototype.detach = function () {
        if (this.getNode()) {
            this.getNode().off('.' + EVENTS_NAME);
            this._node = undefined;
        }
        this._resetTransformCache();
    };
    Transformer.prototype._resetTransformCache = function () {
        this._clearCache(NODE_RECT);
        this._clearCache('transform');
        this._clearSelfAndDescendantCache('absoluteTransform');
    };
    Transformer.prototype._getNodeRect = function () {
        return this._getCache(NODE_RECT, this.__getNodeRect);
    };
    Transformer.prototype.__getNodeRect = function () {
        var node = this.getNode();
        if (!node) {
            return {
                x: -MAX_SAFE_INTEGER,
                y: -MAX_SAFE_INTEGER,
                width: 0,
                height: 0,
                rotation: 0
            };
        }
        if (node.parent && this.parent && node.parent !== this.parent) {
            Util_1.Util.warn('Transformer and attached node have different parents. Konva does not support such case right now. Please move Transformer to the parent of attaching node.');
        }
        var rect = node.getClientRect({
            skipTransform: true,
            skipShadow: true,
            skipStroke: this.ignoreStroke()
        });
        var rotation = Global_1.Konva.getAngle(node.rotation());
        var dx = rect.x * node.scaleX() - node.offsetX() * node.scaleX();
        var dy = rect.y * node.scaleY() - node.offsetY() * node.scaleY();
        return {
            x: node.x() + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
            y: node.y() + dy * Math.cos(rotation) + dx * Math.sin(rotation),
            width: rect.width * node.scaleX(),
            height: rect.height * node.scaleY(),
            rotation: node.rotation()
        };
    };
    Transformer.prototype.getX = function () {
        return this._getNodeRect().x;
    };
    Transformer.prototype.getY = function () {
        return this._getNodeRect().y;
    };
    Transformer.prototype.getRotation = function () {
        return this._getNodeRect().rotation;
    };
    Transformer.prototype.getWidth = function () {
        return this._getNodeRect().width;
    };
    Transformer.prototype.getHeight = function () {
        return this._getNodeRect().height;
    };
    Transformer.prototype._createElements = function () {
        this._createBack();
        ANCHORS_NAMES.forEach(function (name) {
            this._createAnchor(name);
        }.bind(this));
        this._createAnchor('rotater');
    };
    Transformer.prototype._createAnchor = function (name) {
        var _this = this;
        var anchor = new Rect_1.Rect({
            stroke: 'rgb(0, 161, 255)',
            fill: 'white',
            strokeWidth: 1,
            name: name + ' _anchor',
            dragDistance: 0,
            draggable: true
        });
        var self = this;
        anchor.on('mousedown touchstart', function (e) {
            self._handleMouseDown(e);
        });
        anchor.on('dragstart', function (e) {
            e.cancelBubble = true;
        });
        anchor.on('dragmove', function (e) {
            e.cancelBubble = true;
        });
        anchor.on('dragend', function (e) {
            e.cancelBubble = true;
        });
        anchor.on('mouseenter', function () {
            var rad = Global_1.Konva.getAngle(_this.rotation());
            var scale = _this.getNode().getAbsoluteScale();
            var isMirrored = scale.y * scale.x < 0;
            var cursor = getCursor(name, rad, isMirrored);
            anchor.getStage().content.style.cursor = cursor;
            _this._cursorChange = true;
        });
        anchor.on('mouseout', function () {
            if (!anchor.getStage() || !anchor.getParent()) {
                return;
            }
            anchor.getStage().content.style.cursor = '';
            _this._cursorChange = false;
        });
        this.add(anchor);
    };
    Transformer.prototype._createBack = function () {
        var back = new Shape_1.Shape({
            name: 'back',
            width: 0,
            height: 0,
            listening: false,
            sceneFunc: function (ctx) {
                var tr = this.getParent();
                var padding = tr.padding();
                ctx.beginPath();
                ctx.rect(-padding, -padding, this.width() + padding * 2, this.height() + padding * 2);
                ctx.moveTo(this.width() / 2, -padding);
                if (tr.rotateEnabled()) {
                    ctx.lineTo(this.width() / 2, -tr.rotateAnchorOffset() * Util_1.Util._sign(this.height()));
                }
                ctx.fillStrokeShape(this);
            }
        });
        this.add(back);
    };
    Transformer.prototype._handleMouseDown = function (e) {
        this.movingResizer = e.target.name().split(' ')[0];
        var attrs = this._getNodeRect();
        var width = attrs.width;
        var height = attrs.height;
        var hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.sin = Math.abs(height / hypotenuse);
        this.cos = Math.abs(width / hypotenuse);
        window.addEventListener('mousemove', this._handleMouseMove);
        window.addEventListener('touchmove', this._handleMouseMove);
        window.addEventListener('mouseup', this._handleMouseUp, true);
        window.addEventListener('touchend', this._handleMouseUp, true);
        this._transforming = true;
        this._fire('transformstart', { evt: e });
        this.getNode()._fire('transformstart', { evt: e });
    };
    Transformer.prototype._handleMouseMove = function (e) {
        var x, y, newHypotenuse;
        var resizerNode = this.findOne('.' + this.movingResizer);
        var stage = resizerNode.getStage();
        var box = stage.getContent().getBoundingClientRect();
        var zeroPoint = {
            x: box.left,
            y: box.top
        };
        var pointerPos = {
            left: e.clientX !== undefined ? e.clientX : e.touches[0].clientX,
            top: e.clientX !== undefined ? e.clientY : e.touches[0].clientY
        };
        var newAbsPos = {
            x: pointerPos.left - zeroPoint.x,
            y: pointerPos.top - zeroPoint.y
        };
        resizerNode.setAbsolutePosition(newAbsPos);
        var keepProportion = this.keepRatio() || e.shiftKey;
        if (this.movingResizer === 'top-left') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-right').x() - resizerNode.x(), 2) +
                    Math.pow(this.findOne('.bottom-right').y() - resizerNode.y(), 2));
                var reverse = this.findOne('.top-left').x() > this.findOne('.bottom-right').x()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverse;
                y = newHypotenuse * this.sin * reverse;
                this.findOne('.top-left').x(this.findOne('.bottom-right').x() - x);
                this.findOne('.top-left').y(this.findOne('.bottom-right').y() - y);
            }
        }
        else if (this.movingResizer === 'top-center') {
            this.findOne('.top-left').y(resizerNode.y());
        }
        else if (this.movingResizer === 'top-right') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-left').x() - resizerNode.x(), 2) +
                    Math.pow(this.findOne('.bottom-left').y() - resizerNode.y(), 2));
                var reverse = this.findOne('.top-right').x() < this.findOne('.top-left').x()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverse;
                y = newHypotenuse * this.sin * reverse;
                this.findOne('.top-right').x(x);
                this.findOne('.top-right').y(this.findOne('.bottom-left').y() - y);
            }
            var pos = resizerNode.position();
            this.findOne('.top-left').y(pos.y);
            this.findOne('.bottom-right').x(pos.x);
        }
        else if (this.movingResizer === 'middle-left') {
            this.findOne('.top-left').x(resizerNode.x());
        }
        else if (this.movingResizer === 'middle-right') {
            this.findOne('.bottom-right').x(resizerNode.x());
        }
        else if (this.movingResizer === 'bottom-left') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.top-right').x() - resizerNode.x(), 2) +
                    Math.pow(this.findOne('.top-right').y() - resizerNode.y(), 2));
                var reverse = this.findOne('.top-right').x() < this.findOne('.bottom-left').x()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverse;
                y = newHypotenuse * this.sin * reverse;
                this.findOne('.bottom-left').x(this.findOne('.top-right').x() - x);
                this.findOne('.bottom-left').y(y);
            }
            pos = resizerNode.position();
            this.findOne('.top-left').x(pos.x);
            this.findOne('.bottom-right').y(pos.y);
        }
        else if (this.movingResizer === 'bottom-center') {
            this.findOne('.bottom-right').y(resizerNode.y());
        }
        else if (this.movingResizer === 'bottom-right') {
            if (keepProportion) {
                newHypotenuse = Math.sqrt(Math.pow(this.findOne('.bottom-right').x(), 2) +
                    Math.pow(this.findOne('.bottom-right').y(), 2));
                var reverse = this.findOne('.top-left').x() > this.findOne('.bottom-right').x()
                    ? -1
                    : 1;
                x = newHypotenuse * this.cos * reverse;
                y = newHypotenuse * this.sin * reverse;
                this.findOne('.bottom-right').x(x);
                this.findOne('.bottom-right').y(y);
            }
        }
        else if (this.movingResizer === 'rotater') {
            var padding = this.padding();
            var attrs = this._getNodeRect();
            x = resizerNode.x() - attrs.width / 2;
            y = -resizerNode.y() + attrs.height / 2;
            var dAlpha = Math.atan2(-y, x) + Math.PI / 2;
            if (attrs.height < 0) {
                dAlpha -= Math.PI;
            }
            var rot = Global_1.Konva.getAngle(this.rotation());
            var newRotation = Util_1.Util._radToDeg(rot) + Util_1.Util._radToDeg(dAlpha);
            var alpha = Global_1.Konva.getAngle(this.getNode().rotation());
            var newAlpha = Util_1.Util._degToRad(newRotation);
            var snaps = this.rotationSnaps();
            var offset = 0.1;
            for (var i = 0; i < snaps.length; i++) {
                var angle = Global_1.Konva.getAngle(snaps[i]);
                var dif = Math.abs(angle - Util_1.Util._degToRad(newRotation)) % (Math.PI * 2);
                if (dif < offset) {
                    newRotation = Util_1.Util._radToDeg(angle);
                    newAlpha = Util_1.Util._degToRad(newRotation);
                }
            }
            var dx = padding;
            var dy = padding;
            this._fitNodeInto({
                rotation: Global_1.Konva.angleDeg ? newRotation : Util_1.Util._degToRad(newRotation),
                x: attrs.x +
                    (attrs.width / 2 + padding) *
                        (Math.cos(alpha) - Math.cos(newAlpha)) +
                    (attrs.height / 2 + padding) *
                        (Math.sin(-alpha) - Math.sin(-newAlpha)) -
                    (dx * Math.cos(rot) + dy * Math.sin(-rot)),
                y: attrs.y +
                    (attrs.height / 2 + padding) *
                        (Math.cos(alpha) - Math.cos(newAlpha)) +
                    (attrs.width / 2 + padding) *
                        (Math.sin(alpha) - Math.sin(newAlpha)) -
                    (dy * Math.cos(rot) + dx * Math.sin(rot)),
                width: attrs.width + padding * 2,
                height: attrs.height + padding * 2
            }, e);
        }
        else {
            console.error(new Error('Wrong position argument of selection resizer: ' + this.movingResizer));
        }
        if (this.movingResizer === 'rotater') {
            return;
        }
        var absPos = this.findOne('.top-left').getAbsolutePosition(this.getParent());
        var centeredScaling = this.centeredScaling() || e.altKey;
        if (centeredScaling) {
            var topLeft = this.findOne('.top-left');
            var bottomRight = this.findOne('.bottom-right');
            var topOffsetX = topLeft.x();
            var topOffsetY = topLeft.y();
            var bottomOffsetX = this.getWidth() - bottomRight.x();
            var bottomOffsetY = this.getHeight() - bottomRight.y();
            bottomRight.move({
                x: -topOffsetX,
                y: -topOffsetY
            });
            topLeft.move({
                x: bottomOffsetX,
                y: bottomOffsetY
            });
            absPos = topLeft.getAbsolutePosition(this.getParent());
        }
        x = absPos.x;
        y = absPos.y;
        var width = this.findOne('.bottom-right').x() - this.findOne('.top-left').x();
        var height = this.findOne('.bottom-right').y() - this.findOne('.top-left').y();
        this._fitNodeInto({
            x: x + this.offsetX(),
            y: y + this.offsetY(),
            width: width,
            height: height
        }, e);
    };
    Transformer.prototype._handleMouseUp = function (e) {
        this._removeEvents(e);
    };
    Transformer.prototype._removeEvents = function (e) {
        if (this._transforming) {
            this._transforming = false;
            window.removeEventListener('mousemove', this._handleMouseMove);
            window.removeEventListener('touchmove', this._handleMouseMove);
            window.removeEventListener('mouseup', this._handleMouseUp, true);
            window.removeEventListener('touchend', this._handleMouseUp, true);
            this._fire('transformend', { evt: e });
            var node = this.getNode();
            if (node) {
                node.fire('transformend', { evt: e });
            }
        }
    };
    Transformer.prototype._fitNodeInto = function (newAttrs, evt) {
        var boundBoxFunc = this.boundBoxFunc();
        if (boundBoxFunc) {
            var oldAttrs = this._getNodeRect();
            newAttrs = boundBoxFunc.call(this, oldAttrs, newAttrs);
        }
        var node = this.getNode();
        if (newAttrs.rotation !== undefined) {
            this.getNode().rotation(newAttrs.rotation);
        }
        var pure = node.getClientRect({
            skipTransform: true,
            skipShadow: true,
            skipStroke: this.ignoreStroke()
        });
        var padding = this.padding();
        var scaleX = (newAttrs.width - padding * 2) / pure.width;
        var scaleY = (newAttrs.height - padding * 2) / pure.height;
        var rotation = Global_1.Konva.getAngle(node.rotation());
        var dx = pure.x * scaleX - padding - node.offsetX() * scaleX;
        var dy = pure.y * scaleY - padding - node.offsetY() * scaleY;
        this.getNode().setAttrs({
            scaleX: scaleX,
            scaleY: scaleY,
            x: newAttrs.x - (dx * Math.cos(rotation) + dy * Math.sin(-rotation)),
            y: newAttrs.y - (dy * Math.cos(rotation) + dx * Math.sin(rotation))
        });
        this._fire('transform', { evt: evt });
        this.getNode()._fire('transform', { evt: evt });
        this.update();
        this.getLayer().batchDraw();
    };
    Transformer.prototype.forceUpdate = function () {
        this._resetTransformCache();
        this.update();
    };
    Transformer.prototype.update = function () {
        var _this = this;
        var attrs = this._getNodeRect();
        var node = this.getNode();
        var scale = { x: 1, y: 1 };
        if (node && node.getParent()) {
            scale = node.getParent().getAbsoluteScale();
        }
        var invertedScale = {
            x: 1 / scale.x,
            y: 1 / scale.y
        };
        var width = attrs.width;
        var height = attrs.height;
        var enabledAnchors = this.enabledAnchors();
        var resizeEnabled = this.resizeEnabled();
        var padding = this.padding();
        var anchorSize = this.anchorSize();
        this.find('._anchor').each(function (node) {
            return node.setAttrs({
                width: anchorSize,
                height: anchorSize,
                offsetX: anchorSize / 2,
                offsetY: anchorSize / 2,
                stroke: _this.anchorStroke(),
                strokeWidth: _this.anchorStrokeWidth(),
                fill: _this.anchorFill(),
                cornerRadius: _this.anchorCornerRadius()
            });
        });
        this.findOne('.top-left').setAttrs({
            x: -padding,
            y: -padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('top-left') >= 0
        });
        this.findOne('.top-center').setAttrs({
            x: width / 2,
            y: -padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('top-center') >= 0
        });
        this.findOne('.top-right').setAttrs({
            x: width + padding,
            y: -padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('top-right') >= 0
        });
        this.findOne('.middle-left').setAttrs({
            x: -padding,
            y: height / 2,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('middle-left') >= 0
        });
        this.findOne('.middle-right').setAttrs({
            x: width + padding,
            y: height / 2,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('middle-right') >= 0
        });
        this.findOne('.bottom-left').setAttrs({
            x: -padding,
            y: height + padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('bottom-left') >= 0
        });
        this.findOne('.bottom-center').setAttrs({
            x: width / 2,
            y: height + padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('bottom-center') >= 0
        });
        this.findOne('.bottom-right').setAttrs({
            x: width + padding,
            y: height + padding,
            scale: invertedScale,
            visible: resizeEnabled && enabledAnchors.indexOf('bottom-right') >= 0
        });
        var scaledRotateAnchorOffset = -this.rotateAnchorOffset() * Math.abs(invertedScale.y);
        this.findOne('.rotater').setAttrs({
            x: width / 2,
            y: scaledRotateAnchorOffset * Util_1.Util._sign(height),
            scale: invertedScale,
            visible: this.rotateEnabled()
        });
        this.findOne('.back').setAttrs({
            width: width * scale.x,
            height: height * scale.y,
            scale: invertedScale,
            visible: this.borderEnabled(),
            stroke: this.borderStroke(),
            strokeWidth: this.borderStrokeWidth(),
            dash: this.borderDash()
        });
    };
    Transformer.prototype.isTransforming = function () {
        return this._transforming;
    };
    Transformer.prototype.stopTransform = function () {
        if (this._transforming) {
            this._removeEvents();
            var resizerNode = this.findOne('.' + this.movingResizer);
            if (resizerNode) {
                resizerNode.stopDrag();
            }
        }
    };
    Transformer.prototype.destroy = function () {
        if (this.getStage() && this._cursorChange) {
            this.getStage().content.style.cursor = '';
        }
        Group_1.Group.prototype.destroy.call(this);
        this.detach();
        this._removeEvents();
        return this;
    };
    Transformer.prototype.toObject = function () {
        return Node_1.Node.prototype.toObject.call(this);
    };
    return Transformer;
}(Group_1.Group));
exports.Transformer = Transformer;
function validateAnchors(val) {
    if (!(val instanceof Array)) {
        Util_1.Util.warn('enabledAnchors value should be an array');
    }
    if (val instanceof Array) {
        val.forEach(function (name) {
            if (ANCHORS_NAMES.indexOf(name) === -1) {
                Util_1.Util.warn('Unknown anchor name: ' +
                    name +
                    '. Available names are: ' +
                    ANCHORS_NAMES.join(', '));
            }
        });
    }
    return val || [];
}
Transformer.prototype.className = 'Transformer';
Global_2._registerNode(Transformer);
Factory_1.Factory.addGetterSetter(Transformer, 'enabledAnchors', ANCHORS_NAMES, validateAnchors);
Factory_1.Factory.addGetterSetter(Transformer, 'resizeEnabled', true);
Factory_1.Factory.addGetterSetter(Transformer, 'anchorSize', 10, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'rotateEnabled', true);
Factory_1.Factory.addGetterSetter(Transformer, 'rotationSnaps', []);
Factory_1.Factory.addGetterSetter(Transformer, 'rotateAnchorOffset', 50, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'borderEnabled', true);
Factory_1.Factory.addGetterSetter(Transformer, 'anchorStroke', 'rgb(0, 161, 255)');
Factory_1.Factory.addGetterSetter(Transformer, 'anchorStrokeWidth', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'anchorFill', 'white');
Factory_1.Factory.addGetterSetter(Transformer, 'anchorCornerRadius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'borderStroke', 'rgb(0, 161, 255)');
Factory_1.Factory.addGetterSetter(Transformer, 'borderStrokeWidth', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'borderDash');
Factory_1.Factory.addGetterSetter(Transformer, 'keepRatio', true);
Factory_1.Factory.addGetterSetter(Transformer, 'centeredScaling', false);
Factory_1.Factory.addGetterSetter(Transformer, 'ignoreStroke', false);
Factory_1.Factory.addGetterSetter(Transformer, 'padding', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Transformer, 'node');
Factory_1.Factory.addGetterSetter(Transformer, 'boundBoxFunc');
Factory_1.Factory.backCompat(Transformer, {
    lineEnabled: 'borderEnabled',
    rotateHandlerOffset: 'rotateAnchorOffset',
    enabledHandlers: 'enabledAnchors'
});
Util_1.Collection.mapMethods(Transformer);

},{"../Factory":10,"../Global":12,"../Group":13,"../Node":15,"../Shape":17,"../Util":20,"../Validators":21,"./Rect":52}],60:[function(_dereq_,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = _dereq_("../Util");
var Factory_1 = _dereq_("../Factory");
var Shape_1 = _dereq_("../Shape");
var Global_1 = _dereq_("../Global");
var Validators_1 = _dereq_("../Validators");
var Global_2 = _dereq_("../Global");
var Wedge = (function (_super) {
    __extends(Wedge, _super);
    function Wedge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wedge.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Global_1.Konva.getAngle(this.angle()), this.clockwise());
        context.lineTo(0, 0);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Wedge.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    Wedge.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    Wedge.prototype.setWidth = function (width) {
        this.radius(width / 2);
    };
    Wedge.prototype.setHeight = function (height) {
        this.radius(height / 2);
    };
    return Wedge;
}(Shape_1.Shape));
exports.Wedge = Wedge;
Wedge.prototype.className = 'Wedge';
Wedge.prototype._centroid = true;
Wedge.prototype._attrsAffectingSize = ['radius'];
Global_2._registerNode(Wedge);
Factory_1.Factory.addGetterSetter(Wedge, 'radius', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Wedge, 'angle', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Wedge, 'clockwise', false);
Factory_1.Factory.backCompat(Wedge, {
    angleDeg: 'angle',
    getAngleDeg: 'getAngle',
    setAngleDeg: 'setAngle'
});
Util_1.Collection.mapMethods(Wedge);

},{"../Factory":10,"../Global":12,"../Shape":17,"../Util":20,"../Validators":21}],61:[function(_dereq_,module,exports){
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

},{}],62:[function(_dereq_,module,exports){
"use strict";

/**
 * ArrayBuffer adapter consumes binary waveform data.
 * It is used as a data abstraction layer by `WaveformData`.
 *
 * This is supposed to be the fastest adapter ever:
 * * **Pros**: working directly in memory, everything is done by reference
 *   (including the offsetting)
 * * **Cons**: binary data are hardly readable without data format knowledge
 *   (and this is why this adapter exists).
 *
 * @param {ArrayBuffer} buffer
 * @constructor
 */

function WaveformDataArrayBufferAdapter(buffer) {
  this._data = new DataView(buffer);
  this._offset = this.version === 2 ? 24 : 20;
}

/**
 * Detects if a set of data is suitable for the ArrayBuffer adapter.
 * It is used internally by `WaveformData.create` so you should not bother using it.
 *
 * @static
 * @param {Mixed} data
 * @returns {boolean}
 */

WaveformDataArrayBufferAdapter.isCompatible = function isCompatible(data) {
  const isCompatible = data && typeof data === "object" && "byteLength" in data;

  if (isCompatible) {
    const view = new DataView(data);
    const version = view.getInt32(0, true);

    if (version !== 1 && version !== 2) {
      throw new TypeError("This waveform data version not supported.");
    }
  }

  return isCompatible;
};

/**
 * @namespace WaveformDataArrayBufferAdapter
 */

 WaveformDataArrayBufferAdapter.prototype = {
  /**
   * Returns the data format version number.
   *
   * @return {Integer} Version number of the consumed data format.
   */

  get version() {
    return this._data.getInt32(0, true);
  },

  /**
   * Returns the number of bits per sample, either 8 or 16.
   */

  get bits() {
    var bits = Boolean(this._data.getUint32(4, true));

    return bits ? 8 : 16;
  },

  /**
   * Returns the number of channels.
   *
   * @return {Integer} Number of channels.
   */

  get channels() {
    if (this.version === 2) {
      return this._data.getInt32(20, true);
    }
    else {
      return 1;
    }
  },

  /**
   * Returns the number of samples per second.
   *
   * @return {Integer} Number of samples per second.
   */

  get sample_rate() {
    return this._data.getInt32(8, true);
  },

  /**
   * Returns the scale (number of samples per pixel).
   *
   * @return {Integer} Number of samples per pixel.
   */

  get scale() {
    return this._data.getInt32(12, true);
  },

  /**
   * Returns the length of the waveform data (number of data points).
   *
   * @return {Integer} Length of the waveform data.
   */

  get length() {
    return this._data.getUint32(16, true);
  },

  /**
   * Returns a value at a specific offset.
   *
   * @param {Integer} index
   * @return {Integer} waveform value
   */

  at: function at_sample(index) {
    return this._data.getInt8(this._offset + index);
  }
};

module.exports = WaveformDataArrayBufferAdapter;

},{}],63:[function(_dereq_,module,exports){
"use strict";

/**
 * Object adapter consumes waveform data in JSON format.
 * It is used as a data abstraction layer by `WaveformData`.
 *
 * This is supposed to be a fallback for browsers not supporting ArrayBuffer:
 * * **Pros**: easy to debug and quite self describing.
 * * **Cons**: slower than ArrayBuffer, more memory consumption.
 *
 * @param {Object} data Waveform data object
 * @constructor
 */

function WaveformDataObjectAdapter(data) {
  this._data = data;
}

/**
 * Detects if a set of data is suitable for the Object adapter.
 * It is used internally by `WaveformData.create` so you should not bother using it.
 *
 * @static
 * @param {Mixed} data
 * @returns {boolean}
 */

WaveformDataObjectAdapter.isCompatible = function isCompatible(data) {
  return data &&
    typeof data === "object" &&
    "sample_rate" in data &&
    "samples_per_pixel" in data &&
    "bits" in data &&
    "length" in data &&
    "data" in data;
};

/**
 * @namespace WaveformDataObjectAdapter
 */

WaveformDataObjectAdapter.prototype = {
  /**
   * Returns the data format version number.
   *
   * @return {Integer} Version number of the consumed data format.
   */

  get version() {
    return this._data.version || 1;
  },

  /**
   * Returns the number of bits per sample, either 8 or 16.
   */

  get bits() {
    return this._data.bits;
  },

  /**
   * Returns the number of channels.
   *
   * @return {Integer} Number of channels.
   */

  get channels() {
    return this._data.channels || 1;
  },

  /**
   * Returns the number of samples per second.
   *
   * @return {Integer} Number of samples per second.
   */

  get sample_rate() {
    return this._data.sample_rate;
  },

  /**
   * Returns the scale (number of samples per pixel).
   *
   * @return {Integer} Number of samples per pixel.
   */

  get scale() {
    return this._data.samples_per_pixel;
  },

  /**
   * Returns the length of the waveform data (number of data points).
   *
   * @return {Integer} Length of the waveform data.
   */

  get length() {
    return this._data.length;
  },

  /**
   * Returns a value at a specific offset.
   *
   * @param {Integer} index
   * @return {number} waveform value
   */

  at: function at_sample(index) {
    const data = this._data.data;

    if (index >= 0 && index < data.length) {
      return data[index];
    }
    else {
      throw new RangeError("Invalid index: " + index);
    }
  }
};

module.exports = WaveformDataObjectAdapter;

},{}],64:[function(_dereq_,module,exports){
"use strict";

var getAudioDecoder = _dereq_("./audiodecoder");
var getOptions = _dereq_("./options");

function fromAudioBuffer(audioBuffer, options, callback) {
  var opts = getOptions(options, callback);

  return getAudioDecoder(opts.options, opts.callback)(audioBuffer);
}

module.exports = fromAudioBuffer;

},{"./audiodecoder":65,"./options":66}],65:[function(_dereq_,module,exports){
"use strict";

var WaveformData = _dereq_("../core");
var InlineWorker = _dereq_("inline-worker");

/**
 * This callback is executed once the audio has been decoded by the browser and
 * resampled by waveform-data.
 *
 * @callback onAudioResampled
 * @param {Error?}
 * @param {WaveformData} waveform_data Waveform instance of the browser decoded audio
 * @param {AudioBuffer} audio_buffer Decoded audio buffer
 */

/**
 * AudioBuffer-based WaveformData generator
 *
 * Adapted from BlockFile::CalcSummary in Audacity, with permission.
 * @see https://code.google.com/p/audacity/source/browse/audacity-src/trunk/src/BlockFile.cpp
 *
 * @param {Object.<{scale: Number, amplitude_scale: Number, split_channels: Boolean}>} options
 * @param {onAudioResampled} callback
 * @returns {Function.<AudioBuffer>}
 */

function getAudioDecoder(options, callback) {
  return function onAudioDecoded(audio_buffer) {
    var worker = new InlineWorker(function() {
      var INT8_MAX = 127;
      var INT8_MIN = -128;

      function calculateWaveformDataLength(audio_sample_count, scale) {
        var data_length = Math.floor(audio_sample_count / scale);

        var samples_remaining = audio_sample_count - (data_length * scale);

        if (samples_remaining > 0) {
          data_length++;
        }

        return data_length;
      }

      this.addEventListener("message", function(evt) {
        var scale = evt.data.scale;
        var amplitude_scale = evt.data.amplitude_scale;
        var split_channels = evt.data.split_channels;
        var audio_buffer = evt.data.audio_buffer;

        var channels = audio_buffer.channels;
        var output_channels = split_channels ? channels.length : 1;
        var version = output_channels === 1 ? 1 : 2;
        var header_size = version === 1 ? 20 : 24;
        var data_length = calculateWaveformDataLength(audio_buffer.length, scale);
        var total_size = header_size + data_length * 2 * output_channels;
        var data_object = new DataView(new ArrayBuffer(total_size));

        var min_value = new Array(output_channels);
        var max_value = new Array(output_channels);

        for (let channel = 0; channel < output_channels; channel++) {
          min_value[channel] = Infinity;
          max_value[channel] = -Infinity;
        }

        var scale_counter = 0;
        var buffer_length = audio_buffer.length;
        var offset = header_size;
        var channel, i;

        data_object.setInt32(0, version, true); // Version
        data_object.setUint32(4, 1, true); // Is 8 bit?
        data_object.setInt32(8, audio_buffer.sampleRate, true); // Sample rate
        data_object.setInt32(12, scale, true); // Scale
        data_object.setInt32(16, data_length, true); // Length

        if (version === 2) {
          data_object.setInt32(20, output_channels, true);
        }

        for (i = 0; i < buffer_length; i++) {
          var sample = 0;

          if (output_channels === 1) {
            for (channel = 0; channel < channels.length; ++channel) {
              sample += channels[channel][i];
            }

            sample = Math.floor(INT8_MAX * sample * amplitude_scale / channels.length);

            if (sample < min_value[0]) {
              min_value[0] = sample;

              if (min_value[0] < INT8_MIN) {
                min_value[0] = INT8_MIN;
              }
            }

            if (sample > max_value[0]) {
              max_value[0] = sample;

              if (max_value[0] > INT8_MAX) {
                max_value[0] = INT8_MAX;
              }
            }
          }
          else {
            for (channel = 0; channel < output_channels; ++channel) {
              sample = Math.floor(INT8_MAX * channels[channel][i] * amplitude_scale);

              if (sample < min_value[channel]) {
                min_value[channel] = sample;

                if (min_value[channel] < INT8_MIN) {
                  min_value[channel] = INT8_MIN;
                }
              }

              if (sample > max_value[channel]) {
                max_value[channel] = sample;

                if (max_value[channel] > INT8_MAX) {
                  max_value[channel] = INT8_MAX;
                }
              }
            }
          }

          if (++scale_counter === scale) {
            for (channel = 0; channel < output_channels; channel++) {
              data_object.setInt8(offset++, min_value[channel]);
              data_object.setInt8(offset++, max_value[channel]);

              min_value[channel] = Infinity;
              max_value[channel] = -Infinity;
            }

            scale_counter = 0;
          }
        }

        if (scale_counter > 0) {
          for (channel = 0; channel < output_channels; channel++) {
            data_object.setInt8(offset++, min_value[channel]);
            data_object.setInt8(offset++, max_value[channel]);
          }
        }

        this.postMessage(data_object);
      });
    });

    worker.addEventListener("message", function(evt) {
      var data_object = evt.data;

      callback(
        null,
        new WaveformData(data_object.buffer),
        audio_buffer
      );
    });

    // Construct a simple object with the necessary AudioBuffer data,
    // as we cannot send an AudioBuffer to a Web Worker.
    var audio_buffer_obj = {
      length: audio_buffer.length,
      sampleRate: audio_buffer.sampleRate,
      channels: []
    };

    // Fill in the channels data.
    for (var channel = 0; channel < audio_buffer.numberOfChannels; ++channel) {
      audio_buffer_obj.channels[channel] = audio_buffer.getChannelData(channel);
    }

    worker.postMessage({
      scale: options.scale,
      amplitude_scale: options.amplitude_scale,
      split_channels: options.split_channels,
      audio_buffer: audio_buffer_obj
    });
  };
}

module.exports = getAudioDecoder;

},{"../core":69,"inline-worker":3}],66:[function(_dereq_,module,exports){
"use strict";

var defaultOptions = {
  scale: 512,
  amplitude_scale: 1.0,
  split_channels: false
};

function getOptions(options) {
  if (Object.prototype.hasOwnProperty.call(options, "scale_adjuster")) {
    throw new Error("Please rename the 'scale_adjuster' option to 'amplitude_scale'");
  }

  var opts = {
    scale: options.scale || defaultOptions.scale,
    amplitude_scale: options.amplitude_scale || defaultOptions.amplitude_scale,
    split_channels: options.split_channels || defaultOptions.split_channels
  };

  return opts;
}

module.exports = getOptions;

},{}],67:[function(_dereq_,module,exports){
"use strict";

var getAudioDecoder = _dereq_("./audiodecoder");
var getOptions = _dereq_("./options");

function createFromArrayBuffer(audioContext, audioData, options, callback) {
  // The following function is a workaround for a Webkit bug where decodeAudioData
  // invokes the errorCallback with null instead of a DOMException.
  // See https://webaudio.github.io/web-audio-api/#dom-baseaudiocontext-decodeaudiodata
  // and http://stackoverflow.com/q/10365335/103396

  function errorCallback(error) {
    if (!error) {
      error = new DOMException("EncodingError");
    }

    callback(error);
  }

  audioContext.decodeAudioData(
    audioData,
    getAudioDecoder(options, callback),
    errorCallback
  );
}

function createFromAudioBuffer(audioBuffer, options, callback) {
  var audioDecoder = getAudioDecoder(options, callback);

  return audioDecoder(audioBuffer);
}

/**
 * Creates a working WaveformData based on binary audio data.
 *
 * This is still quite experimental and the result will mostly depend on the
 * level of browser support.
 *
 * ```javascript
 * const xhr = new XMLHttpRequest();
 * const audioContext = new AudioContext();
 *
 * // URL of a CORS MP3/Ogg file
 * xhr.open('GET', 'https://example.com/audio/track.ogg');
 * xhr.responseType = 'arraybuffer';
 *
 * xhr.addEventListener('load', function(progressEvent) {
 *   WaveformData.createFromAudio(audioContext, progressEvent.target.response,
 *     function(err, waveform) {
 *     if (err) {
 *       console.error(err);
 *       return;
 *     }
 *
 *     console.log(waveform.duration);
 *   });
 * });
 *
 * xhr.send();
 * ```
 *
 * @todo Use `SourceBuffer.appendBuffer` and `ProgressEvent` to stream the decoding?
 * @param {AudioContext|webkitAudioContext} audio_context
 * @param {ArrayBuffer} audio_data
 * @param {callback} what to do once the decoding is done
 * @constructor
 */

function createFromAudio(options, callback) {
  var opts = getOptions(options);

  if (options.audio_context && options.array_buffer) {
    return createFromArrayBuffer(options.audio_context, options.array_buffer, opts, callback);
  }
  else if (options.audio_buffer) {
    return createFromAudioBuffer(options.audio_buffer, opts, callback);
  }
  else {
    throw new TypeError("Please pass either an AudioContext and ArrayBuffer, or an AudioBuffer object");
  }
}

module.exports = createFromAudio;

},{"./audiodecoder":65,"./options":66}],68:[function(_dereq_,module,exports){
"use strict";

/**
 * Provides access to the waveform data for a single audio channel.
 *
 * @param {WaveformData} waveformData Waveform data.
 * @param {Number} channelIndex Channel number.
 * @constructor
 */

function WaveformDataChannel(waveformData, channelIndex) {
  this._waveformData = waveformData;
  this._channelIndex = channelIndex;
}

/**
 * Returns a min value for a specific offset.
 *
 * ```javascript
 * var waveform = WaveformData.create({ ... });
 * var channel = waveform.channel(0);
 *
 * console.log(channel.min_sample(10)); // -> -12
 * ```
 *
 * @api
 * @param {Integer} offset
 * @return {Number} Offset min value
 */

WaveformDataChannel.prototype.min_sample = function(index) {
  const offset = (index * this._waveformData.channels + this._channelIndex) * 2;

  return this._waveformData._adapter.at(offset);
};

/**
 * Returns a max value for a specific offset.
 *
 * ```javascript
 * var waveform = WaveformData.create({ ... });
 * var channel = waveform.channel(0);
 *
 * console.log(channel.max_sample(10)); // -> 12
 * ```
 *
 * @api
 * @param {Integer} offset
 * @return {Number} Offset max value
 */

WaveformDataChannel.prototype.max_sample = function(index) {
  const offset = (index * this._waveformData.channels + this._channelIndex) * 2 + 1;

  return this._waveformData._adapter.at(offset);
};

/**
 * Returns all the min values within the current offset.
 *
 * ```javascript
 * var waveform = WaveformData.create({ ... });
 * var channel = waveform.channel(0);
 *
 * console.log(channel.min_array()); // -> [-7, -5, -10]
 * ```
 *
 * @return {Array.<Integer>} Min values contained in the offset.
 */

WaveformDataChannel.prototype.min_array = function() {
  return this._waveformData._offsetValues(
    0,
    this._waveformData.length,
    this._channelIndex * 2
  );
};

/**
 * Returns all the max values within the current offset.
 *
 * ```javascript
 * var waveform = WaveformData.create({ ... });
 * var channel = waveform.channel(0);
 *
 * console.log(channel.max_array()); // -> [9, 6, 11]
 * ```
 *
 * @return {Array.<Integer>} Max values contained in the offset.
 */

WaveformDataChannel.prototype.max_array = function() {
  return this._waveformData._offsetValues(
    0,
    this._waveformData.length,
    this._channelIndex * 2 + 1
  );
};

module.exports = WaveformDataChannel;

},{}],69:[function(_dereq_,module,exports){
"use strict";

var WaveformDataChannel = _dereq_("./channel");
var WaveformDataObjectAdapter = _dereq_("./adapters/object");
var WaveformDataArrayBufferAdapter = _dereq_("./adapters/arraybuffer");

var adapters = [
  WaveformDataArrayBufferAdapter,
  WaveformDataObjectAdapter
];

/**
 * Facade to iterate on audio waveform response.
 *
 * ```javascript
 * var waveform = new WaveformData({ ... });
 *
 * var json_waveform = new WaveformData(xhr.responseText);
 *
 * var arraybuff_waveform = new WaveformData(
 *   getArrayBufferData()
 * );
 * ```
 *
 * ## Offsets
 *
 * An **offset** is a non-destructive way to iterate on a subset of data.
 *
 * It is the easiest way to **navigate** through data without having to deal
 * with complex calculations. Simply iterate over the data to display them.
 *
 * *Notice*: the default offset is the entire set of data.
 *
 * @param {String|ArrayBuffer|Object} data Waveform data,
 * to be consumed by the related adapter.
 * @param {WaveformData.adapter|Function} adapter Backend adapter used to manage
 * access to the data.
 * @constructor
 */

function WaveformData(data) {
  var Adapter = this._getAdapter(data);

  this._adapter = new Adapter(data);

  this._channels = [];

  for (let channel = 0; channel < this.channels; channel++) {
    this._channels[channel] = new WaveformDataChannel(this, channel);
  }
}

/**
 * Creates an instance of WaveformData by guessing the adapter from the
 * data type. It can also accept an XMLHttpRequest response.
 *
 * ```javascript
 * var xhr = new XMLHttpRequest();
 * xhr.open("GET", "http://example.com/waveforms/track.dat");
 * xhr.responseType = "arraybuffer";
 *
 * xhr.addEventListener("load", function onResponse(progressEvent) {
 *   var waveform = WaveformData.create(progressEvent.target);
 *
 *   console.log(waveform.duration);
 * });
 *
 * xhr.send();
 * ```
 *
 * @static
 * @throws TypeError
 * @param {Object} data
 * @return {WaveformData}
 */

WaveformData.create = function create(data) {
  return new WaveformData(data);
};

/**
 * Public API for the Waveform Data manager.
 *
 * @namespace WaveformData
 */

WaveformData.prototype = {

  _getAdapter: function(data) {
    var Adapter = null;

    adapters.some(function(AdapterClass) {
      if (AdapterClass.isCompatible(data)) {
        Adapter = AdapterClass;
        return true;
      }
    });

    if (Adapter === null) {
      throw new TypeError("Could not detect a WaveformData adapter from the input.");
    }

    return Adapter;
  },

  /**
   * Creates a new WaveformData object with resampled data.
   * Returns a rescaled waveform, to either fit the waveform to a specific
   * width, or to a specific zoom level.
   *
   * **Note**: You may specify either the *width* or the *scale*, but not both.
   * The `scale` will be deduced from the `width` you want to fit the data into.
   *
   * Adapted from Sequence::GetWaveDisplay in Audacity, with permission.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   * // ...
   *
   * // fitting the data in a 500px wide canvas
   * var resampled_waveform = waveform.resample({ width: 500 });
   *
   * console.log(resampled_waveform.min.length);   // -> 500
   *
   * // zooming out on a 3 times less precise scale
   * var resampled_waveform = waveform.resample({ scale: waveform.scale * 3 });
   * ```
   *
   * @see https://code.google.com/p/audacity/source/browse/audacity-src/trunk/src/Sequence.cpp
   * @param {Number|{width: Number, scale: Number}} options Either a constraint width or a constraint sample rate
   * @return {WaveformData} New resampled object
   */

  resample: function(options) {
    if (typeof options === "number") {
      options = {
        width: options
      };
    }

    options.input_index = typeof options.input_index === "number" ? options.input_index : null;
    options.output_index = typeof options.output_index === "number" ? options.output_index : null;
    options.scale = typeof options.scale === "number" ? options.scale : null;
    options.width = typeof options.width === "number" ? options.width : null;

    var is_partial_resampling = Boolean(options.input_index) || Boolean(options.output_index);

    if (options.input_index != null && (options.input_index < 0)) {
      throw new RangeError("options.input_index should be a positive integer value. [" + options.input_index + "]");
    }

    if (options.output_index != null && (options.output_index < 0)) {
      throw new RangeError("options.output_index should be a positive integer value. [" + options.output_index + "]");
    }

    if (options.width != null && (options.width <= 0)) {
      throw new RangeError("options.width should be a strictly positive integer value. [" + options.width + "]");
    }

    if (options.scale != null && (options.scale <= 0)) {
      throw new RangeError("options.scale should be a strictly positive integer value. [" + options.scale + "]");
    }

    if (!options.scale && !options.width) {
      throw new RangeError("You should provide either a resampling scale or a width in pixel the data should fit in.");
    }

    var definedPartialOptionsCount = ["width", "scale", "output_index", "input_index"].reduce(function(count, key) {
      return count + (options[key] === null ? 0 : 1);
    }, 0);

    if (is_partial_resampling && definedPartialOptionsCount !== 4) {
      throw new Error("Some partial resampling options are missing. You provided " + definedPartialOptionsCount + " of them over 4.");
    }

    var output_data = [];
    var samples_per_pixel = options.scale || Math.floor(this.duration * this.sample_rate / options.width); // scale we want to reach
    var scale = this.scale; // scale we are coming from
    var channel_count = 2 * this.channels;

    var input_buffer_size = this.length; // the amount of data we want to resample i.e. final zoom want to resample all data but for intermediate zoom we want to resample subset
    var input_index = options.input_index || 0; // is this start point? or is this the index at current scale
    var output_index = options.output_index || 0; // is this end point? or is this the index at scale we want to be?

    var channels = this.channels;

    var min = new Array(channels);
    var max = new Array(channels);

    for (let channel = 0; channel < channels; ++channel) {
      if (input_buffer_size > 0) {
        min[channel] = this.channel(channel).min_sample(input_index);
        max[channel] = this.channel(channel).max_sample(input_index);
      }
      else {
        min[channel] = 0;
        max[channel] = 0;
      }
    }

    var min_value = -128;
    var max_value = 127;

    if (samples_per_pixel < scale) {
      throw new Error("Zoom level " + samples_per_pixel + " too low, minimum: " + scale);
    }

    var where, prev_where, stop, value, last_input_index;

    function sample_at_pixel(x) {
      return Math.floor(x * samples_per_pixel);
    }

    function add_sample(min, max) {
      output_data.push(min, max);
    }

    while (input_index < input_buffer_size) {
      while (Math.floor(sample_at_pixel(output_index) / scale) <= input_index) {
        if (output_index > 0) {
          for (let channel = 0; channel < channels; ++channel) {
            add_sample(min[channel], max[channel]);
          }
        }

        last_input_index = input_index;

        output_index++;

        where      = sample_at_pixel(output_index);
        prev_where = sample_at_pixel(output_index - 1);

        if (where !== prev_where) {
          for (let channel = 0; channel < channels; ++channel) {
            min[channel] = max_value;
            max[channel] = min_value;
          }
        }
      }

      where = sample_at_pixel(output_index);
      stop = Math.floor(where / scale);

      if (stop > input_buffer_size) {
        stop = input_buffer_size;
      }

      while (input_index < stop) {
        for (let channel = 0; channel < channels; ++channel) {
          value = this.channel(channel).min_sample(input_index);

          if (value < min[channel]) {
            min[channel] = value;
          }

          value = this.channel(channel).max_sample(input_index);

          if (value > max[channel]) {
            max[channel] = value;
          }
        }

        input_index++;
      }

      if (is_partial_resampling && (output_data.length / channel_count) >= options.width) {
        break;
      }
    }

    if (is_partial_resampling) {
      if ((output_data.length / channel_count) > options.width &&
          input_index !== last_input_index) {
          for (let channel = 0; channel < channels; ++channel) {
            add_sample(min[channel], max[channel]);
          }
      }
    }
    else if (input_index !== last_input_index) {
      for (let channel = 0; channel < channels; ++channel) {
        add_sample(min[channel], max[channel]);
      }
    }

    return new WaveformData({
      version: this._adapter.version,
      bits: this.bits,
      samples_per_pixel: samples_per_pixel,
      length: output_data.length / channel_count,
      data: output_data,
      sample_rate: this.sample_rate,
      channels: channels
    });
  },

  /**
   * Return the unpacked values for a particular offset.
   *
   * @param {Integer} start
   * @param {Integer} length
   * @param {Integer} correction The step to skip for each iteration
   * (as the response body is [min, max, min, max...])
   * @return {Array.<Integer>}
   */

  _offsetValues: function getOffsetValues(start, length, correction) {
    var adapter = this._adapter;
    var values = [];
    var channels = this.channels;

    correction += (start * channels * 2); // offset the positioning query

    for (var i = 0; i < length; i++) {
      values.push(adapter.at((i * channels * 2) + correction));
    }

    return values;
  },

  /**
   * Returns the length of the waveform, in pixels.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   * console.log(waveform.length); // -> 600
   * ```
   *
   * @api
   * @return {Integer} Length of the waveform, in pixels.
   */

  get length() {
    return this._adapter.length;
  },

  /**
   * Returns the number of bits per sample, either 8 or 16.
   */

  get bits() {
    return this._adapter.bits;
  },

  /**
   * Returns the (approximate) duration of the audio file, in seconds.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   * console.log(waveform.duration); // -> 10.33333333333
   * ```
   *
   * @api
   * @return {number} Duration of the audio waveform, in seconds.
   */

  get duration() {
    return this.length * this.scale / this.sample_rate;
  },

  /**
   * Return the number of pixels per second.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   *
   * console.log(waveform.pixels_per_second); // -> 93.75
   * ```
   *
   * @api
   * @return {number} Number of pixels per second.
   */

  get pixels_per_second() {
    return this.sample_rate / this.scale;
  },

  /**
   * Return the amount of time represented by a single pixel.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   *
   * console.log(waveform.seconds_per_pixel);       // -> 0.010666666666666666
   * ```
   *
   * @return {number} Amount of time (in seconds) contained in a pixel.
   */

  get seconds_per_pixel() {
    return this.scale / this.sample_rate;
  },

  /**
   * Returns the number of waveform channels.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   * console.log(waveform.channels);    // -> 1
   * ```
   *
   * @api
   * @return {number} Number of channels.
   */

  get channels() {
    return this._adapter.channels;
  },

  /**
   * Returns a waveform channel.
   *
   * ```javascript
   * var waveform = WaveformData.create({ ... });
   * var channel = waveform.channel(0);
   * console.log(channel.min_sample(0)); // -> 1
   * ```
   *
   * @api
   * @param {Number} Channel index.
   * @return {WaveformDataChannel} Waveform channel.
   */

  channel: function(index) {
    if (index >= 0 && index < this._channels.length) {
      return this._channels[index];
    }
    else {
      throw new RangeError("Invalid channel: " + index);
    }
  },

  /**
   * Returns the number of samples per second.
   *
   * @return {Integer} Number of samples per second.
   */

  get sample_rate() {
    return this._adapter.sample_rate;
  },

  /**
   * Returns the scale (number of samples per pixel).
   *
   * @return {Integer} Number of samples per pixel.
   */

  get scale() {
    return this._adapter.scale;
  },

  /**
   * Returns the pixel location for a given time.
   *
   * @param {number} time
   * @return {integer} Index location for a specific time.
   */

  at_time: function at_time(time) {
    return Math.floor(time * this.sample_rate / this.scale);
  },

  /**
   * Returns the time in seconds for a given index
   *
   * @param {Integer} index
   * @return {number}
   */

  time: function time(index) {
    return index * this.scale / this.sample_rate;
  }
};

module.exports = WaveformData;

},{"./adapters/arraybuffer":62,"./adapters/object":63,"./channel":68}],70:[function(_dereq_,module,exports){
"use strict";

var WaveformData = _dereq_("./lib/core");

WaveformData.createFromAudio = _dereq_("./lib/builders/webaudio");

module.exports = WaveformData;

},{"./lib/builders/webaudio":67,"./lib/core":69}],71:[function(_dereq_,module,exports){
"use strict";

var webAudioBuilder = _dereq_("./lib/builders/webaudio");
var fromAudioBuffer = _dereq_("./lib/builders/audiobuffer");


webAudioBuilder.fromAudioBuffer = fromAudioBuffer;

module.exports = webAudioBuilder;

},{"./lib/builders/audiobuffer":64,"./lib/builders/webaudio":67}],72:[function(_dereq_,module,exports){
module.exports = function (Colors, EventEmitter, WaveformPoints, WaveformSegments, Player, ViewController, TimeController, ZoomController, WaveformBuilder, mixins, Utils, KeyboardHandler, CueEmitter) {
    'use strict';
    function buildUi(container) {
        return {
            player: container.querySelector('.waveform'),
            zoomview: container.querySelector('.zoom-container'),
            overview: container.querySelector('.overview-container')
        };
    }
    function Peaks() {
        EventEmitter.call(this, { wildcard: true });
        this.options = {
            zoomLevels: [
                512,
                1024,
                2048,
                4096
            ],
            dataUri: null,
            dataUriDefaultFormat: 'json',
            withCredentials: false,
            logger: null,
            deprecationLogger: console.log.bind(console),
            keyboard: false,
            nudgeIncrement: 1,
            inMarkerColor: Colors.gray,
            outMarkerColor: Colors.gray,
            zoomWaveformColor: 'rgba(0, 225, 128, 1)',
            overviewWaveformColor: 'rgba(0,0,0,0.2)',
            overviewHighlightRectangleColor: 'grey',
            randomizeSegmentColor: true,
            height: 200,
            segmentColor: Colors.orange,
            playheadColor: Colors.black,
            playheadTextColor: Colors.gray,
            showPlayheadTime: false,
            axisGridlineColor: '#ccc',
            axisLabelColor: Colors.gray,
            template: [
                '<div class="waveform">',
                '<div class="zoom-container"></div>',
                '<div class="overview-container"></div>',
                '</div>'
            ].join(''),
            pointMarkerColor: Colors.teal,
            pointDblClickHandler: null,
            pointDragEndHandler: null,
            audioContext: null,
            waveformBuilderOptions: {
                scale: 512,
                amplitude_scale: 1
            },
            zoomAdapter: 'static',
            emitCueEvents: false
        };
        this.logger = console.error.bind(console);
        return this;
    }
    Peaks.prototype = Object.create(EventEmitter.prototype);
    Peaks.init = function (opts, callback) {
        var instance = new Peaks();
        opts = opts || {};
        instance._setOptions(opts);
        var containers = null;
        if (typeof instance.options.template === 'string') {
            opts.container.innerHTML = instance.options.template;
            containers = buildUi(instance.options.container);
        } else if (Utils.isHTMLElement(instance.options.template)) {
            this.container.appendChild(instance.options.template);
            containers = buildUi(instance.options.container);
        } else if (instance.options.containers) {
            containers = instance.options.containers;
        } else {
            throw new TypeError('Peaks.init(): The template option must be a valid HTML string or a DOM object');
        }
        var zoomviewContainer = containers.zoomview || containers.zoom;
        if (!Utils.isHTMLElement(zoomviewContainer) && !Utils.isHTMLElement(containers.overview)) {
            throw new TypeError('Peaks.init(): The containers.zoomview and/or containers.overview options must be valid HTML elements');
        }
        if (zoomviewContainer && zoomviewContainer.clientWidth <= 0) {
            throw new TypeError('Peaks.init(): Please ensure that the zoomview container is visible and has non-zero width');
        }
        if (containers.overview && containers.overview.clientWidth <= 0) {
            throw new TypeError('Peaks.init(): Please ensure that the overview container is visible and has non-zero width');
        }
        if (instance.options.keyboard) {
            instance.keyboardHandler = new KeyboardHandler(instance);
        }
        instance.player = new Player(instance, instance.options.mediaElement);
        instance.segments = new WaveformSegments(instance);
        instance.points = new WaveformPoints(instance);
        instance.zoom = new ZoomController(instance, instance.options.zoomLevels);
        instance.time = new TimeController(instance);
        instance.views = new ViewController(instance);
        var waveformBuilder = new WaveformBuilder(instance);
        waveformBuilder.init(instance.options, function (err, waveformData) {
            if (err) {
                if (callback) {
                    callback(err);
                }
                return;
            }
            instance._waveformData = waveformData;
            if (containers.overview) {
                instance.views.createOverview(containers.overview);
            }
            if (zoomviewContainer) {
                instance.views.createZoomview(zoomviewContainer);
            }
            instance._addWindowResizeHandler();
            if (instance.options.segments) {
                instance.segments.add(instance.options.segments);
            }
            if (instance.options.points) {
                instance.points.add(instance.options.points);
            }
            if (instance.options.emitCueEvents) {
                instance._cueEmitter = new CueEmitter(instance);
            }
            instance.emit('segments.ready');
            instance.emit('peaks.ready');
            if (callback) {
                callback(null, instance);
            }
        });
        return instance;
    };
    Peaks.prototype._setOptions = function (opts) {
        opts.deprecationLogger = opts.deprecationLogger || console.log.bind(console);
        if (opts.audioElement) {
            opts.mediaElement = opts.audioElement;
            opts.deprecationLogger('Peaks.init(): The audioElement option is deprecated, please use mediaElement instead');
        }
        if (!opts.mediaElement) {
            throw new Error('Peaks.init(): Missing mediaElement option');
        }
        if (!(opts.mediaElement instanceof HTMLMediaElement)) {
            throw new TypeError('Peaks.init(): The mediaElement option should be an HTMLMediaElement');
        }
        if (!opts.container && !opts.containers) {
            throw new Error('Peaks.init(): Please specify either a container or containers option');
        } else if (Boolean(opts.container) === Boolean(opts.containers)) {
            throw new Error('Peaks.init(): Please specify either a container or containers option, but not both');
        }
        if (opts.template && opts.containers) {
            throw new Error('Peaks.init(): Please specify either a template or a containers option, but not both');
        }
        if (opts.containers) {
            opts.template = null;
        }
        if (opts.logger && !Utils.isFunction(opts.logger)) {
            throw new TypeError('Peaks.init(): The logger option should be a function');
        }
        if (opts.segments && !Array.isArray(opts.segments)) {
            throw new TypeError('Peaks.init(): options.segments must be an array of segment objects');
        }
        if (opts.points && !Array.isArray(opts.points)) {
            throw new TypeError('Peaks.init(): options.points must be an array of point objects');
        }
        Utils.extend(this.options, opts);
        Utils.extend(this.options, {
            createSegmentMarker: mixins.createSegmentMarker,
            createSegmentLabel: mixins.createSegmentLabel,
            createPointMarker: mixins.createPointMarker
        });
        if (!Array.isArray(this.options.zoomLevels)) {
            throw new TypeError('Peaks.init(): The zoomLevels option should be an array');
        } else if (this.options.zoomLevels.length === 0) {
            throw new Error('Peaks.init(): The zoomLevels array must not be empty');
        } else {
            if (!Utils.isInAscendingOrder(this.options.zoomLevels)) {
                throw new Error('Peaks.init(): The zoomLevels array must be sorted in ascending order');
            }
        }
        if (this.options.pointDblClickHandler) {
            opts.deprecationLogger('Peaks.init(): The pointDblClickHandler option is deprecated, please use the points.dblclick event instead');
            this.on('points.dblclick', this.options.pointDblClickHandler);
        }
        if (this.options.pointDragEndHandler) {
            opts.deprecationLogger('Peaks.init(): The pointDragEndHandler option is deprecated, please use the points.dragend event instead');
            this.on('points.dragend', this.options.pointDragEndHandler);
        }
        if (opts.logger) {
            this.logger = opts.logger;
        }
    };
    Peaks.prototype.setSource = function (options, callback) {
        var self = this;
        if (!options.mediaUrl) {
            callback(new Error('peaks.setSource(): options must contain a mediaUrl'));
            return;
        }
        function reset() {
            self.removeAllListeners('player_canplay');
            self.removeAllListeners('player_error');
        }
        function playerErrorHandler(err) {
            reset();
            callback(err);
        }
        function playerCanPlayHandler() {
            reset();
            if (!options.zoomLevels) {
                options.zoomLevels = self.options.zoomLevels;
            }
            var waveformBuilder = new WaveformBuilder(self);
            waveformBuilder.init(options, function (err, waveformData) {
                if (err) {
                    callback(err);
                    return;
                }
                self._waveformData = waveformData;
                [
                    'overview',
                    'zoomview'
                ].forEach(function (viewName) {
                    var view = self.views.getView(viewName);
                    if (view) {
                        view.setWaveformData(waveformData);
                    }
                });
                self.zoom.setZoomLevels(options.zoomLevels);
                callback();
            });
        }
        self.once('player_canplay', playerCanPlayHandler);
        self.once('player_error', playerErrorHandler);
        self.player.setSource(options.mediaUrl);
    };
    Peaks.prototype.getWaveformData = function () {
        return this._waveformData;
    };
    Peaks.prototype._addWindowResizeHandler = function () {
        this._onResize = this._onResize.bind(this);
        window.addEventListener('resize', this._onResize);
    };
    Peaks.prototype._onResize = function () {
        this.emit('window_resize');
    };
    Peaks.prototype._removeWindowResizeHandler = function () {
        window.removeEventListener('resize', this._onResize);
    };
    Peaks.prototype.destroy = function () {
        this._removeWindowResizeHandler();
        if (this.views) {
            this.views.destroy();
        }
        if (this.player) {
            this.player.destroy();
        }
        if (this._cueEmitter) {
            this._cueEmitter.destroy();
        }
    };
    return Peaks;
}(_dereq_('colors.css'), _dereq_('EventEmitter'), _dereq_('peaks/markers/waveform.points'), _dereq_('peaks/markers/waveform.segments'), _dereq_('peaks/player/player'), _dereq_('peaks/views/view-controller'), _dereq_('peaks/views/waveform.timecontroller'), _dereq_('peaks/views/waveform.zoomcontroller'), _dereq_('peaks/waveform/waveform-builder'), _dereq_('peaks/waveform/waveform.mixins'), _dereq_('peaks/waveform/waveform.utils'), _dereq_('peaks/player/player.keyboard'), _dereq_('peaks/cues/cue-emitter'));
},{"EventEmitter":2,"colors.css":1,"peaks/cues/cue-emitter":73,"peaks/markers/waveform.points":77,"peaks/markers/waveform.segments":78,"peaks/player/player":79,"peaks/player/player.keyboard":80,"peaks/views/view-controller":85,"peaks/views/waveform.timecontroller":88,"peaks/views/waveform.zoomcontroller":89,"peaks/waveform/waveform-builder":93,"peaks/waveform/waveform.mixins":95,"peaks/waveform/waveform.utils":96}],73:[function(_dereq_,module,exports){
module.exports = function (Cue) {
    'use strict';
    var isHeadless = /HeadlessChrome/.test(navigator.userAgent);
    function windowIsVisible() {
        if (isHeadless || navigator.webdriver) {
            return false;
        }
        return typeof document === 'object' && 'visibilityState' in document && document.visibilityState === 'visible';
    }
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    var eventTypes = {
        forward: {},
        reverse: {}
    };
    var EVENT_TYPE_POINT = 0;
    var EVENT_TYPE_SEGMENT_ENTER = 1;
    var EVENT_TYPE_SEGMENT_EXIT = 2;
    eventTypes.forward[Cue.POINT] = EVENT_TYPE_POINT;
    eventTypes.forward[Cue.SEGMENT_START] = EVENT_TYPE_SEGMENT_ENTER;
    eventTypes.forward[Cue.SEGMENT_END] = EVENT_TYPE_SEGMENT_EXIT;
    eventTypes.reverse[Cue.POINT] = EVENT_TYPE_POINT;
    eventTypes.reverse[Cue.SEGMENT_START] = EVENT_TYPE_SEGMENT_EXIT;
    eventTypes.reverse[Cue.SEGMENT_END] = EVENT_TYPE_SEGMENT_ENTER;
    var eventNames = {};
    eventNames[EVENT_TYPE_POINT] = 'points.enter';
    eventNames[EVENT_TYPE_SEGMENT_ENTER] = 'segments.enter';
    eventNames[EVENT_TYPE_SEGMENT_EXIT] = 'segments.exit';
    function getPointOrSegment(peaks, cue) {
        switch (cue.type) {
        case Cue.POINT:
            return peaks.points.getPoint(cue.id);
        case Cue.SEGMENT_START:
        case Cue.SEGMENT_END:
            return peaks.segments.getSegment(cue.id);
        default:
            throw new Error('getPointOrSegment: id not found?');
        }
    }
    function CueEmitter(peaks) {
        this._cues = [];
        this._peaks = peaks;
        this._previousTime = -1;
        this._updateCues = this._updateCues.bind(this);
        this._onPlay = this.onPlay.bind(this);
        this._onSeek = this.onSeek.bind(this);
        this._onTimeUpdate = this.onTimeUpdate.bind(this);
        this._onAnimationFrame = this.onAnimationFrame.bind(this);
        this._rAFHandle = null;
        this._activeSegments = {};
        this._attachEventHandlers();
    }
    CueEmitter.prototype._updateCues = function () {
        var self = this;
        var points = self._peaks.points.getPoints();
        var segments = self._peaks.segments.getSegments();
        self._cues.length = 0;
        points.forEach(function (point) {
            self._cues.push(new Cue(point.time, Cue.POINT, point.id));
        });
        segments.forEach(function (segment) {
            self._cues.push(new Cue(segment.startTime, Cue.SEGMENT_START, segment.id));
            self._cues.push(new Cue(segment.endTime, Cue.SEGMENT_END, segment.id));
        });
        self._cues.sort(Cue.sorter);
        var time = self._peaks.player.getCurrentTime();
        self._updateActiveSegments(time);
    };
    CueEmitter.prototype._onUpdate = function (time, previousTime) {
        var isForward = time > previousTime;
        var start;
        var end;
        var step;
        if (isForward) {
            start = 0;
            end = this._cues.length;
            step = 1;
        } else {
            start = this._cues.length - 1;
            end = -1;
            step = -1;
        }
        for (var i = start; isForward ? i < end : i > end; i += step) {
            var cue = this._cues[i];
            if (isForward ? cue.time > previousTime : cue.time < previousTime) {
                if (isForward ? cue.time > time : cue.time < time) {
                    break;
                }
                var marker = getPointOrSegment(this._peaks, cue);
                var eventType = isForward ? eventTypes.forward[cue.type] : eventTypes.reverse[cue.type];
                if (eventType === EVENT_TYPE_SEGMENT_ENTER) {
                    this._activeSegments[marker.id] = marker;
                } else if (eventType === EVENT_TYPE_SEGMENT_EXIT) {
                    delete this._activeSegments[marker.id];
                }
                this._peaks.emit(eventNames[eventType], marker);
            }
        }
    };
    CueEmitter.prototype.onTimeUpdate = function (time) {
        if (windowIsVisible()) {
            return;
        }
        if (this._peaks.player.isPlaying() && !this._peaks.player.isSeeking()) {
            this._onUpdate(time, this._previousTime);
        }
        this._previousTime = time;
    };
    CueEmitter.prototype.onAnimationFrame = function () {
        var time = this._peaks.player.getCurrentTime();
        if (!this._peaks.player.isSeeking()) {
            this._onUpdate(time, this._previousTime);
        }
        this._previousTime = time;
        if (this._peaks.player.isPlaying()) {
            this._rAFHandle = requestAnimationFrame(this._onAnimationFrame);
        }
    };
    CueEmitter.prototype.onPlay = function () {
        this._previousTime = this._peaks.player.getCurrentTime();
        this._rAFHandle = requestAnimationFrame(this._onAnimationFrame);
    };
    CueEmitter.prototype.onSeek = function (time) {
        this._previousTime = time;
        this._updateActiveSegments(time);
    };
    function getSegmentIdComparator(id) {
        return function compareSegmentIds(segment) {
            return segment.id === id;
        };
    }
    CueEmitter.prototype._updateActiveSegments = function (time) {
        var self = this;
        var activeSegments = self._peaks.segments.getSegmentsAtTime(time);
        for (var id in self._activeSegments) {
            if (Object.prototype.hasOwnProperty.call(self._activeSegments, id)) {
                var segment = activeSegments.find(getSegmentIdComparator(id));
                if (!segment) {
                    self._peaks.emit('segments.exit', self._activeSegments[id]);
                    delete self._activeSegments[id];
                }
            }
        }
        activeSegments.forEach(function (segment) {
            if (!(segment.id in self._activeSegments)) {
                self._activeSegments[segment.id] = segment;
                self._peaks.emit('segments.enter', segment);
            }
        });
    };
    var triggerUpdateOn = Array('points.update', 'points.dragmove', 'points.add', 'points.remove', 'points.remove_all', 'segments.update', 'segments.dragged', 'segments.add', 'segments.remove', 'segments.remove_all');
    CueEmitter.prototype._attachEventHandlers = function () {
        this._peaks.on('player_time_update', this._onTimeUpdate);
        this._peaks.on('player_play', this._onPlay);
        this._peaks.on('player_seek', this._onSeek);
        for (var i = 0; i < triggerUpdateOn.length; i++) {
            this._peaks.on(triggerUpdateOn[i], this._updateCues);
        }
        this._updateCues();
    };
    CueEmitter.prototype._detachEventHandlers = function () {
        this._peaks.off('player_time_update', this._onTimeUpdate);
        this._peaks.off('player_play', this._onPlay);
        this._peaks.off('player_seek', this._onSeek);
        for (var i = 0; i < triggerUpdateOn.length; i++) {
            this._peaks.off(triggerUpdateOn[i], this._updateCues);
        }
    };
    CueEmitter.prototype.destroy = function () {
        if (this._rAFHandle) {
            cancelAnimationFrame(this._rAFHandle);
            this._rAFHandle = null;
        }
        this._detachEventHandlers();
        this._previousTime = -1;
        this._marks.length = 0;
    };
    return CueEmitter;
}(_dereq_('peaks/cues/cue'));
},{"peaks/cues/cue":74}],74:[function(_dereq_,module,exports){
module.exports = function () {
    'use strict';
    function Cue(time, type, id) {
        this.time = time;
        this.type = type;
        this.id = id;
    }
    Cue.POINT = 0;
    Cue.SEGMENT_START = 1;
    Cue.SEGMENT_END = 2;
    Cue.sorter = function (a, b) {
        return a.time - b.time;
    };
    return Cue;
}();
},{}],75:[function(_dereq_,module,exports){
module.exports = function (Utils) {
    'use strict';
    function validatePoint(time, labelText) {
        if (!Utils.isValidTime(time)) {
            throw new TypeError('peaks.points.add(): time should be a numeric value');
        }
        if (time < 0) {
            throw new TypeError('peaks.points.add(): time should not be negative');
        }
        if (Utils.isNullOrUndefined(labelText)) {
            labelText = '';
        } else if (!Utils.isString(labelText)) {
            throw new TypeError('peaks.points.add(): labelText must be a string');
        }
    }
    function Point(parent, id, time, labelText, color, editable) {
        labelText = labelText || '';
        validatePoint(time, labelText);
        this._parent = parent;
        this._id = id;
        this._time = time;
        this._labelText = labelText;
        this._color = color;
        this._editable = editable;
    }
    Object.defineProperties(Point.prototype, {
        parent: {
            get: function () {
                return this._parent;
            }
        },
        id: {
            enumerable: true,
            get: function () {
                return this._id;
            }
        },
        time: {
            enumerable: true,
            get: function () {
                return this._time;
            },
            set: function (time) {
                this._time = time;
            }
        },
        labelText: {
            get: function () {
                return this._labelText;
            }
        },
        color: {
            enumerable: true,
            get: function () {
                return this._color;
            }
        },
        editable: {
            enumerable: true,
            get: function () {
                return this._editable;
            }
        }
    });
    Point.prototype.update = function (options) {
        var time = Object.prototype.hasOwnProperty.call(options, 'time') ? options.time : this.time;
        var labelText = Object.prototype.hasOwnProperty.call(options, 'labelText') ? options.labelText || '' : this.labelText;
        var color = Object.prototype.hasOwnProperty.call(options, 'color') ? options.color : this.color;
        var editable = Object.prototype.hasOwnProperty.call(options, 'editable') ? options.editable : this.editable;
        validatePoint(time, labelText);
        this._time = time;
        this._labelText = labelText;
        this._color = color;
        this._editable = editable;
        this._parent._peaks.emit('points.update', this);
    };
    Point.prototype.isVisible = function (startTime, endTime) {
        return this.time >= startTime && this.time < endTime;
    };
    return Point;
}(_dereq_('peaks/waveform/waveform.utils'));
},{"peaks/waveform/waveform.utils":96}],76:[function(_dereq_,module,exports){
module.exports = function (Utils) {
    'use strict';
    function validateSegment(startTime, endTime, validationContext) {
        if (!Utils.isValidTime(startTime)) {
            throw new TypeError('peaks.segments.' + validationContext + ': startTime should be a valid number');
        }
        if (!Utils.isValidTime(endTime)) {
            throw new TypeError('peaks.segments.' + validationContext + ': endTime should be a valid number');
        }
        if (startTime < 0) {
            throw new RangeError('peaks.segments.' + validationContext + ': startTime should not be negative');
        }
        if (endTime < 0) {
            throw new RangeError('peaks.segments.' + validationContext + ': endTime should not be negative');
        }
        if (endTime <= startTime) {
            throw new RangeError('peaks.segments.' + validationContext + ': endTime should be greater than startTime');
        }
    }
    function Segment(parent, id, startTime, endTime, labelText, color, editable) {
        validateSegment(startTime, endTime, 'add()');
        this._parent = parent;
        this._id = id;
        this._startTime = startTime;
        this._endTime = endTime;
        this._labelText = labelText;
        this._color = color;
        this._editable = editable;
    }
    Object.defineProperties(Segment.prototype, {
        parent: {
            get: function () {
                return this._parent;
            }
        },
        id: {
            enumerable: true,
            get: function () {
                return this._id;
            }
        },
        startTime: {
            enumerable: true,
            get: function () {
                return this._startTime;
            },
            set: function (time) {
                this._startTime = time;
            }
        },
        endTime: {
            enumerable: true,
            get: function () {
                return this._endTime;
            },
            set: function (time) {
                this._endTime = time;
            }
        },
        labelText: {
            enumerable: true,
            get: function () {
                return this._labelText;
            }
        },
        color: {
            enumerable: true,
            get: function () {
                return this._color;
            }
        },
        editable: {
            enumerable: true,
            get: function () {
                return this._editable;
            }
        }
    });
    Segment.prototype.update = function (options) {
        var startTime = Object.prototype.hasOwnProperty.call(options, 'startTime') ? options.startTime : this.startTime;
        var endTime = Object.prototype.hasOwnProperty.call(options, 'endTime') ? options.endTime : this.endTime;
        var labelText = Object.prototype.hasOwnProperty.call(options, 'labelText') ? options.labelText : this.labelText;
        var color = Object.prototype.hasOwnProperty.call(options, 'color') ? options.color : this.color;
        var editable = Object.prototype.hasOwnProperty.call(options, 'editable') ? options.editable : this.editable;
        validateSegment(startTime, endTime, 'updateTime()');
        this._startTime = startTime;
        this._endTime = endTime;
        this._labelText = labelText;
        this._color = color;
        this._editable = editable;
        this._parent._peaks.emit('segments.update', this);
    };
    Segment.prototype.isVisible = function (startTime, endTime) {
        return this.startTime < endTime && startTime < this.endTime;
    };
    return Segment;
}(_dereq_('peaks/waveform/waveform.utils'));
},{"peaks/waveform/waveform.utils":96}],77:[function(_dereq_,module,exports){
module.exports = function (Point, Utils) {
    'use strict';
    function WaveformPoints(peaks) {
        this._peaks = peaks;
        this._points = [];
        this._pointsById = {};
        this._pointIdCounter = 0;
    }
    WaveformPoints.prototype._getNextPointId = function () {
        return 'peaks.point.' + this._pointIdCounter++;
    };
    WaveformPoints.prototype._addPoint = function (point) {
        this._points.push(point);
        this._pointsById[point.id] = point;
    };
    WaveformPoints.prototype._createPoint = function (options) {
        if (Object.prototype.hasOwnProperty.call(options, 'timestamp') || !Object.prototype.hasOwnProperty.call(options, 'time')) {
            this._peaks.options.deprecationLogger('peaks.points.add(): The \'timestamp\' attribute is deprecated; use \'time\' instead');
            options.time = options.timestamp;
        }
        var point = new Point(this, Utils.isNullOrUndefined(options.id) ? this._getNextPointId() : options.id, options.time, options.labelText, options.color, Boolean(options.editable));
        return point;
    };
    WaveformPoints.prototype.getPoints = function () {
        return this._points;
    };
    WaveformPoints.prototype.getPoint = function (id) {
        return this._pointsById[id] || null;
    };
    WaveformPoints.prototype.find = function (startTime, endTime) {
        return this._points.filter(function (point) {
            return point.isVisible(startTime, endTime);
        });
    };
    WaveformPoints.prototype.add = function (pointOrPoints) {
        var self = this;
        var points = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
        if (typeof points[0] === 'number') {
            this._peaks.options.deprecationLogger('peaks.points.add(): expected a segment object or an array');
            points = [{
                    time: arguments[0],
                    editable: arguments[1],
                    color: arguments[2],
                    labelText: arguments[3]
                }];
        }
        points = points.map(function (pointOptions) {
            var point = self._createPoint(pointOptions);
            if (Object.prototype.hasOwnProperty.call(self._pointsById, point.id)) {
                throw new Error('peaks.points.add(): duplicate id');
            }
            return point;
        });
        points.forEach(function (point) {
            self._addPoint(point);
        });
        this._peaks.emit('points.add', points);
    };
    WaveformPoints.prototype._findPoint = function (predicate) {
        var indexes = [];
        for (var i = 0, length = this._points.length; i < length; i++) {
            if (predicate(this._points[i])) {
                indexes.push(i);
            }
        }
        return indexes;
    };
    WaveformPoints.prototype._removeIndexes = function (indexes) {
        var removed = [];
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i] - removed.length;
            var itemRemoved = this._points.splice(index, 1)[0];
            delete this._pointsById[itemRemoved.id];
            removed.push(itemRemoved);
        }
        return removed;
    };
    WaveformPoints.prototype._removePoints = function (predicate) {
        var indexes = this._findPoint(predicate);
        var removed = this._removeIndexes(indexes);
        this._peaks.emit('points.remove', removed);
        return removed;
    };
    WaveformPoints.prototype.remove = function (point) {
        return this._removePoints(function (p) {
            return p === point;
        });
    };
    WaveformPoints.prototype.removeById = function (pointId) {
        return this._removePoints(function (point) {
            return point.id === pointId;
        });
    };
    WaveformPoints.prototype.removeByTime = function (time) {
        return this._removePoints(function (point) {
            return point.time === time;
        });
    };
    WaveformPoints.prototype.removeAll = function () {
        this._points = [];
        this._pointsById = {};
        this._peaks.emit('points.remove_all');
    };
    return WaveformPoints;
}(_dereq_('peaks/markers/point'), _dereq_('peaks/waveform/waveform.utils'));
},{"peaks/markers/point":75,"peaks/waveform/waveform.utils":96}],78:[function(_dereq_,module,exports){
module.exports = function (Colors, Segment, Utils) {
    'use strict';
    function WaveformSegments(peaks) {
        this._peaks = peaks;
        this._segments = [];
        this._segmentsById = {};
        this._segmentIdCounter = 0;
        this._colorIndex = 0;
    }
    WaveformSegments.prototype._getNextSegmentId = function () {
        return 'peaks.segment.' + this._segmentIdCounter++;
    };
    var colors = [
        Colors.navy,
        Colors.blue,
        Colors.aqua,
        Colors.teal,
        Colors.yellow,
        Colors.orange,
        Colors.red,
        Colors.maroon,
        Colors.fuchsia,
        Colors.purple
    ];
    WaveformSegments.prototype._getSegmentColor = function () {
        if (this._peaks.options.randomizeSegmentColor) {
            if (++this._colorIndex === colors.length) {
                this._colorIndex = 0;
            }
            return colors[this._colorIndex];
        } else {
            return this._peaks.options.segmentColor;
        }
    };
    WaveformSegments.prototype._addSegment = function (segment) {
        this._segments.push(segment);
        this._segmentsById[segment.id] = segment;
    };
    WaveformSegments.prototype._createSegment = function (options) {
        if (!Utils.isObject(options)) {
            throw new TypeError('peaks.segments.add(): expected a Segment object parameter');
        }
        var segment = new Segment(this, Utils.isNullOrUndefined(options.id) ? this._getNextSegmentId() : options.id, options.startTime, options.endTime, options.labelText || '', options.color || this._getSegmentColor(), options.editable || false);
        return segment;
    };
    WaveformSegments.prototype.getSegments = function () {
        return this._segments;
    };
    WaveformSegments.prototype.getSegment = function (id) {
        return this._segmentsById[id] || null;
    };
    WaveformSegments.prototype.getSegmentsAtTime = function (time) {
        return this._segments.filter(function (segment) {
            return time >= segment.startTime && time < segment.endTime;
        });
    };
    WaveformSegments.prototype.find = function (startTime, endTime) {
        return this._segments.filter(function (segment) {
            return segment.isVisible(startTime, endTime);
        });
    };
    WaveformSegments.prototype.add = function (segmentOrSegments) {
        var self = this;
        var segments = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
        if (typeof segments[0] === 'number') {
            this._peaks.options.deprecationLogger('peaks.segments.add(): expected a segment object or an array');
            segments = [{
                    startTime: arguments[0],
                    endTime: arguments[1],
                    editable: arguments[2],
                    color: arguments[3],
                    labelText: arguments[4]
                }];
        }
        segments = segments.map(function (segmentOptions) {
            var segment = self._createSegment(segmentOptions);
            if (Object.prototype.hasOwnProperty.call(self._segmentsById, segment.id)) {
                throw new Error('peaks.segments.add(): duplicate id');
            }
            return segment;
        });
        segments.forEach(function (segment) {
            self._addSegment(segment);
        });
        this._peaks.emit('segments.add', segments);
    };
    WaveformSegments.prototype._findSegment = function (predicate) {
        var indexes = [];
        for (var i = 0, length = this._segments.length; i < length; i++) {
            if (predicate(this._segments[i])) {
                indexes.push(i);
            }
        }
        return indexes;
    };
    WaveformSegments.prototype._removeIndexes = function (indexes) {
        var removed = [];
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i] - removed.length;
            var itemRemoved = this._segments.splice(index, 1)[0];
            delete this._segmentsById[itemRemoved.id];
            removed.push(itemRemoved);
        }
        return removed;
    };
    WaveformSegments.prototype._removeSegments = function (predicate) {
        var indexes = this._findSegment(predicate);
        var removed = this._removeIndexes(indexes);
        this._peaks.emit('segments.remove', removed);
        return removed;
    };
    WaveformSegments.prototype.remove = function (segment) {
        return this._removeSegments(function (s) {
            return s === segment;
        });
    };
    WaveformSegments.prototype.removeById = function (segmentId) {
        return this._removeSegments(function (segment) {
            return segment.id === segmentId;
        });
    };
    WaveformSegments.prototype.removeByTime = function (startTime, endTime) {
        endTime = typeof endTime === 'number' ? endTime : 0;
        var fnFilter;
        if (endTime > 0) {
            fnFilter = function (segment) {
                return segment.startTime === startTime && segment.endTime === endTime;
            };
        } else {
            fnFilter = function (segment) {
                return segment.startTime === startTime;
            };
        }
        return this._removeSegments(fnFilter);
    };
    WaveformSegments.prototype.removeAll = function () {
        this._segments = [];
        this._segmentsById = {};
        this._peaks.emit('segments.remove_all');
    };
    return WaveformSegments;
}(_dereq_('colors.css'), _dereq_('peaks/markers/segment'), _dereq_('peaks/waveform/waveform.utils'));
},{"colors.css":1,"peaks/markers/segment":76,"peaks/waveform/waveform.utils":96}],79:[function(_dereq_,module,exports){
module.exports = function (Utils) {
    'use strict';
    function Player(peaks, mediaElement) {
        var self = this;
        self._peaks = peaks;
        self._listeners = [];
        self._mediaElement = mediaElement;
        self._duration = self.getDuration();
        self._isPlaying = false;
        if (self._mediaElement.readyState === 4) {
            self._peaks.emit('player_load', self);
        }
        self._addMediaListener('timeupdate', function () {
            self._peaks.emit('player_time_update', self.getCurrentTime());
        });
        self._addMediaListener('play', function () {
            self._isPlaying = true;
            self._peaks.emit('player_play', self.getCurrentTime());
        });
        self._addMediaListener('pause', function () {
            self._isPlaying = false;
            self._peaks.emit('player_pause', self.getCurrentTime());
        });
        self._addMediaListener('seeked', function () {
            self._peaks.emit('player_seek', self.getCurrentTime());
        });
        self._addMediaListener('canplay', function () {
            self._peaks.emit('player_canplay', self);
        });
        self._addMediaListener('error', function (event) {
            self._peaks.emit('player_error', event.target.error);
        });
        self._interval = null;
    }
    Player.prototype._addMediaListener = function (type, callback) {
        this._listeners.push({
            type: type,
            callback: callback
        });
        this._mediaElement.addEventListener(type, callback);
    };
    Player.prototype.destroy = function () {
        for (var i = 0; i < this._listeners.length; i++) {
            var listener = this._listeners[i];
            this._mediaElement.removeEventListener(listener.type, listener.callback);
        }
        this._listeners.length = 0;
        if (this._interval !== null) {
            clearTimeout(this._interval);
            this._interval = null;
        }
    };
    Player.prototype.setSource = function (source) {
        this._mediaElement.setAttribute('src', source);
    };
    Player.prototype.getSource = function () {
        return this._mediaElement.src;
    };
    Player.prototype.getCurrentSource = function () {
        return this._mediaElement.currentSrc;
    };
    Player.prototype.play = function () {
        this._mediaElement.play();
    };
    Player.prototype.pause = function () {
        this._mediaElement.pause();
    };
    Player.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Player.prototype.isSeeking = function () {
        return this._mediaElement.seeking;
    };
    Player.prototype.getCurrentTime = function () {
        return this._mediaElement.currentTime;
    };
    Player.prototype.getDuration = function () {
        return this._mediaElement.duration;
    };
    Player.prototype.seek = function (time) {
        if (!Utils.isValidTime(time)) {
            this._peaks.logger('peaks.player.seek(): parameter must be a valid time, in seconds');
            return;
        }
        this._mediaElement.currentTime = time;
    };
    Player.prototype.playSegment = function (segment) {
        var self = this;
        if (!segment || !Utils.isValidTime(segment.startTime) || !Utils.isValidTime(segment.endTime)) {
            self._peaks.logger('peaks.player.playSegment(): parameter must be a segment object');
            return;
        }
        clearTimeout(self._interval);
        self._interval = null;
        self.seek(segment.startTime);
        self._mediaElement.play();
        self._interval = setInterval(function () {
            if (self.getCurrentTime() >= segment.endTime || self._mediaElement.paused) {
                clearTimeout(self._interval);
                self._interval = null;
                self._mediaElement.pause();
            }
        }, 30);
    };
    return Player;
}(_dereq_('peaks/waveform/waveform.utils'));
},{"peaks/waveform/waveform.utils":96}],80:[function(_dereq_,module,exports){
module.exports = function () {
    'use strict';
    var nodes = [
        'OBJECT',
        'TEXTAREA',
        'INPUT',
        'SELECT',
        'OPTION'
    ];
    var SPACE = 32, TAB = 9, LEFT_ARROW = 37, RIGHT_ARROW = 39;
    var keys = [
        SPACE,
        TAB,
        LEFT_ARROW,
        RIGHT_ARROW
    ];
    function KeyboardHandler(eventEmitter) {
        this.eventEmitter = eventEmitter;
        document.addEventListener('keydown', this.handleKeyEvent.bind(this));
        document.addEventListener('keypress', this.handleKeyEvent.bind(this));
        document.addEventListener('keyup', this.handleKeyEvent.bind(this));
    }
    KeyboardHandler.prototype.handleKeyEvent = function handleKeyEvent(event) {
        if (nodes.indexOf(event.target.nodeName) === -1) {
            if (keys.indexOf(event.type) > -1) {
                event.preventDefault();
            }
            if (event.type === 'keydown' || event.type === 'keypress') {
                switch (event.keyCode) {
                case SPACE:
                    this.eventEmitter.emit('keyboard.space');
                    break;
                case TAB:
                    this.eventEmitter.emit('keyboard.tab');
                    break;
                }
            } else if (event.type === 'keyup') {
                switch (event.keyCode) {
                case LEFT_ARROW:
                    if (event.shiftKey) {
                        this.eventEmitter.emit('keyboard.shift_left');
                    } else {
                        this.eventEmitter.emit('keyboard.left');
                    }
                    break;
                case RIGHT_ARROW:
                    if (event.shiftKey) {
                        this.eventEmitter.emit('keyboard.shift_right');
                    } else {
                        this.eventEmitter.emit('keyboard.right');
                    }
                    break;
                }
            }
        }
    };
    return KeyboardHandler;
}();
},{}],81:[function(_dereq_,module,exports){
module.exports = function () {
    'use strict';
    function MouseDragHandler(stage, handlers) {
        this._stage = stage;
        this._handlers = handlers;
        this._dragging = false;
        this._mouseDown = this.mouseDown.bind(this);
        this._mouseUp = this.mouseUp.bind(this);
        this._mouseMove = this.mouseMove.bind(this);
        this._stage.on('mousedown', this._mouseDown);
        this._stage.on('touchstart', this._mouseDown);
        this._mouseDownClientX = null;
    }
    MouseDragHandler.prototype.mouseDown = function (event) {
        if (!event.target) {
            return;
        }
        if (event.target.attrs.draggable) {
            return;
        }
        if (event.target.parent && event.target.parent.attrs.draggable) {
            return;
        }
        if (event.type === 'touchstart') {
            this._mouseDownClientX = Math.floor(event.evt.touches[0].clientX);
        } else {
            this._mouseDownClientX = event.evt.clientX;
        }
        if (this._handlers.onMouseDown) {
            var mouseDownPosX = this._getMousePosX(this._mouseDownClientX);
            this._handlers.onMouseDown(mouseDownPosX);
        }
        window.addEventListener('mousemove', this._mouseMove, false);
        window.addEventListener('touchmove', this._mouseMove, false);
        window.addEventListener('mouseup', this._mouseUp, false);
        window.addEventListener('touchend', this._mouseUp, false);
        window.addEventListener('blur', this._mouseUp, false);
    };
    MouseDragHandler.prototype.mouseMove = function (event) {
        var clientX = null;
        if (event.type === 'touchmove') {
            clientX = Math.floor(event.changedTouches[0].clientX);
        } else {
            clientX = event.clientX;
        }
        if (clientX === this._mouseDownClientX) {
            return;
        }
        this._dragging = true;
        if (this._handlers.onMouseMove) {
            var mousePosX = this._getMousePosX(clientX);
            this._handlers.onMouseMove(mousePosX);
        }
    };
    MouseDragHandler.prototype.mouseUp = function (event) {
        var clientX = null;
        if (event.type === 'touchend') {
            clientX = Math.floor(event.changedTouches[0].clientX);
            if (event.cancelable) {
                event.preventDefault();
            }
        } else {
            clientX = event.clientX;
        }
        if (this._handlers.onMouseUp) {
            var mousePosX = this._getMousePosX(clientX);
            this._handlers.onMouseUp(mousePosX);
        }
        window.removeEventListener('mousemove', this._mouseMove, false);
        window.removeEventListener('touchmove', this._mouseMove, false);
        window.removeEventListener('mouseup', this._mouseUp, false);
        window.removeEventListener('touchend', this._mouseUp, false);
        window.removeEventListener('blur', this._mouseUp, false);
        this._dragging = false;
    };
    MouseDragHandler.prototype._getMousePosX = function (clientX) {
        var containerPos = this._stage.getContainer().getBoundingClientRect();
        return clientX - containerPos.left;
    };
    MouseDragHandler.prototype.isDragging = function () {
        return this._dragging;
    };
    return MouseDragHandler;
}();
},{}],82:[function(_dereq_,module,exports){
module.exports = function (Utils, Konva) {
    'use strict';
    function PlayheadLayer(peaks, view, showTime, time) {
        this._peaks = peaks;
        this._view = view;
        this._playheadPixel = 0;
        this._playheadLineAnimation = null;
        this._playheadVisible = false;
        this._playheadColor = peaks.options.playheadColor;
        this._playheadTextColor = peaks.options.playheadTextColor;
        this._playheadLayer = new Konva.Layer();
        this._createPlayhead(this._playheadColor);
        if (showTime) {
            this._createPlayheadText(this._playheadTextColor);
        }
        this.zoomLevelChanged();
        this._syncPlayhead(time);
    }
    PlayheadLayer.prototype.addToStage = function (stage) {
        stage.add(this._playheadLayer);
    };
    PlayheadLayer.prototype.zoomLevelChanged = function () {
        var pixelsPerSecond = this._view.timeToPixels(1);
        var time;
        this._useAnimation = pixelsPerSecond >= 5;
        if (this._useAnimation) {
            if (this._peaks.player.isPlaying() && !this._playheadLineAnimation) {
                this._start();
            }
        } else {
            if (this._playheadLineAnimation) {
                time = this._peaks.player.getCurrentTime();
                this.stop(time);
            }
        }
    };
    PlayheadLayer.prototype._createPlayhead = function (color) {
        this._playheadLine = new Konva.Line({
            points: [
                0.5,
                0,
                0.5,
                this._view.getHeight()
            ],
            stroke: color,
            strokeWidth: 1
        });
        this._playheadGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        this._playheadGroup.add(this._playheadLine);
        this._playheadLayer.add(this._playheadGroup);
    };
    PlayheadLayer.prototype._createPlayheadText = function (color) {
        this._playheadText = new Konva.Text({
            x: 2,
            y: 12,
            text: '00:00:00',
            fontSize: 11,
            fontFamily: 'sans-serif',
            fill: color,
            align: 'right'
        });
        this._playheadGroup.add(this._playheadText);
    };
    PlayheadLayer.prototype.updatePlayheadTime = function (time) {
        this._syncPlayhead(time);
        if (this._peaks.player.isPlaying()) {
            this._start();
        }
    };
    PlayheadLayer.prototype._syncPlayhead = function (time) {
        var pixelIndex = this._view.timeToPixels(time);
        var frameOffset = this._view.getFrameOffset();
        var width = this._view.getWidth();
        var isVisible = pixelIndex >= frameOffset && pixelIndex < frameOffset + width;
        this._playheadPixel = pixelIndex;
        if (isVisible) {
            var playheadX = this._playheadPixel - frameOffset;
            if (!this._playheadVisible) {
                this._playheadVisible = true;
                this._playheadGroup.show();
            }
            this._playheadGroup.setAttr('x', playheadX);
            if (this._playheadText) {
                var text = Utils.formatTime(time, false);
                this._playheadText.setText(text);
            }
            this._playheadLayer.draw();
        } else {
            if (this._playheadVisible) {
                this._playheadVisible = false;
                this._playheadGroup.hide();
                this._playheadLayer.draw();
            }
        }
    };
    PlayheadLayer.prototype._start = function () {
        var self = this;
        if (self._playheadLineAnimation) {
            self._playheadLineAnimation.stop();
            self._playheadLineAnimation = null;
        }
        if (!self._useAnimation) {
            return;
        }
        var lastPlayheadPosition = null;
        self._playheadLineAnimation = new Konva.Animation(function () {
            var time = self._peaks.player.getCurrentTime();
            var playheadPosition = self._view.timeToPixels(time);
            if (playheadPosition !== lastPlayheadPosition) {
                self._syncPlayhead(time);
                lastPlayheadPosition = playheadPosition;
            }
        }, self._playheadLayer);
        self._playheadLineAnimation.start();
    };
    PlayheadLayer.prototype.stop = function (time) {
        if (this._playheadLineAnimation) {
            this._playheadLineAnimation.stop();
            this._playheadLineAnimation = null;
        }
        this._syncPlayhead(time);
    };
    PlayheadLayer.prototype.getPlayheadOffset = function () {
        return this._playheadPixel - this._view.getFrameOffset();
    };
    PlayheadLayer.prototype.getPlayheadPixel = function () {
        return this._playheadPixel;
    };
    PlayheadLayer.prototype.showPlayheadTime = function (show) {
        var updated = false;
        if (show) {
            if (!this._playheadText) {
                this._createPlayheadText(this._playheadTextColor);
                updated = true;
            }
        } else {
            if (this._playheadText) {
                this._playheadText.remove();
                this._playheadText.destroy();
                this._playheadText = null;
                updated = true;
            }
        }
        if (updated) {
            this._playheadLayer.draw();
        }
    };
    return PlayheadLayer;
}(_dereq_('peaks/waveform/waveform.utils'), _dereq_('konva'));
},{"konva":43,"peaks/waveform/waveform.utils":96}],83:[function(_dereq_,module,exports){
module.exports = function (Utils, Konva) {
    'use strict';
    function PointsLayer(peaks, view, allowEditing, showLabels) {
        this._peaks = peaks;
        this._view = view;
        this._allowEditing = allowEditing;
        this._showLabels = showLabels;
        this._pointGroups = {};
        this._layer = new Konva.Layer();
        this._registerEventHandlers();
    }
    PointsLayer.prototype.addToStage = function (stage) {
        stage.add(this._layer);
    };
    PointsLayer.prototype._registerEventHandlers = function () {
        var self = this;
        this._peaks.on('points.update', function (point) {
            var frameOffset = self._view.getFrameOffset();
            var width = self._view.getWidth();
            var frameStartTime = self._view.pixelsToTime(frameOffset);
            var frameEndTime = self._view.pixelsToTime(frameOffset + width);
            self._removePoint(point);
            if (point.isVisible(frameStartTime, frameEndTime)) {
                self._addPointGroup(point);
            }
            self.updatePoints(frameStartTime, frameEndTime);
        });
        this._peaks.on('points.add', function (points) {
            var frameOffset = self._view.getFrameOffset();
            var width = self._view.getWidth();
            var frameStartTime = self._view.pixelsToTime(frameOffset);
            var frameEndTime = self._view.pixelsToTime(frameOffset + width);
            points.forEach(function (point) {
                if (point.isVisible(frameStartTime, frameEndTime)) {
                    self._addPointGroup(point);
                }
            });
            self.updatePoints(frameStartTime, frameEndTime);
        });
        this._peaks.on('points.remove', function (points) {
            points.forEach(function (point) {
                self._removePoint(point);
            });
            self._layer.draw();
        });
        this._peaks.on('points.remove_all', function () {
            self._layer.removeChildren();
            self._pointGroups = {};
            self._layer.draw();
        });
        var pointDragHandler = this._pointDragHandler.bind(this);
        this._peaks.on('points.dragstart', pointDragHandler);
        this._peaks.on('points.dragmove', pointDragHandler);
        this._peaks.on('points.dragend', pointDragHandler);
    };
    PointsLayer.prototype._pointDragHandler = function (point) {
        this._updatePoint(point);
        this._layer.draw();
    };
    PointsLayer.prototype._createPointGroup = function (point) {
        var pointGroup = new Konva.Group();
        pointGroup.point = point;
        var editable = this._allowEditing && point.editable;
        pointGroup.marker = this._peaks.options.createPointMarker({
            draggable: editable,
            showLabel: this._showLabels,
            handleColor: point.color ? point.color : this._peaks.options.pointMarkerColor,
            height: this._view.getHeight(),
            pointGroup: pointGroup,
            point: point,
            layer: this._layer,
            onDblClick: this._onPointHandleDblClick.bind(this),
            onDragStart: this._onPointHandleDragStart.bind(this),
            onDragMove: this._onPointHandleDragMove.bind(this),
            onDragEnd: this._onPointHandleDragEnd.bind(this),
            onMouseEnter: this._onPointHandleMouseEnter.bind(this),
            onMouseLeave: this._onPointHandleMouseLeave.bind(this)
        });
        pointGroup.add(pointGroup.marker);
        return pointGroup;
    };
    PointsLayer.prototype._addPointGroup = function (point) {
        var pointGroup = this._createPointGroup(point);
        this._pointGroups[point.id] = pointGroup;
        this._layer.add(pointGroup);
        return pointGroup;
    };
    PointsLayer.prototype._onPointHandleDragMove = function (point) {
        var pointGroup = this._pointGroups[point.id];
        var markerX = pointGroup.marker.getX();
        if (markerX > 0 && markerX < this._view.getWidth()) {
            var offset = this._view.getFrameOffset() + markerX + pointGroup.marker.getWidth();
            point.time = this._view.pixelsToTime(offset);
        }
        this._peaks.emit('points.dragmove', point);
    };
    PointsLayer.prototype._onPointHandleMouseEnter = function (point) {
        this._peaks.emit('points.mouseenter', point);
    };
    PointsLayer.prototype._onPointHandleMouseLeave = function (point) {
        this._peaks.emit('points.mouseleave', point);
    };
    PointsLayer.prototype._onPointHandleDblClick = function (point) {
        this._peaks.emit('points.dblclick', point);
    };
    PointsLayer.prototype._onPointHandleDragStart = function (point) {
        this._peaks.emit('points.dragstart', point);
    };
    PointsLayer.prototype._onPointHandleDragEnd = function (point) {
        this._peaks.emit('points.dragend', point);
    };
    PointsLayer.prototype.updatePoints = function (startTime, endTime) {
        var points = this._peaks.points.find(startTime, endTime);
        var count = points.length;
        points.forEach(this._updatePoint.bind(this));
        count += this._removeInvisiblePoints(startTime, endTime);
        if (count > 0) {
            this._layer.draw();
        }
    };
    PointsLayer.prototype._updatePoint = function (point) {
        var pointGroup = this._findOrAddPointGroup(point);
        var timestampOffset = this._view.timeToPixels(point.time);
        var startPixel = timestampOffset - this._view.getFrameOffset();
        if (pointGroup.marker) {
            pointGroup.marker.setX(startPixel);
            if (pointGroup.marker.time) {
                pointGroup.marker.time.setText(Utils.formatTime(point.time, false));
            }
        }
    };
    PointsLayer.prototype._findOrAddPointGroup = function (point) {
        var pointGroup = this._pointGroups[point.id];
        if (!pointGroup) {
            pointGroup = this._addPointGroup(point);
        }
        return pointGroup;
    };
    PointsLayer.prototype._removeInvisiblePoints = function (startTime, endTime) {
        var count = 0;
        for (var pointId in this._pointGroups) {
            if (Object.prototype.hasOwnProperty.call(this._pointGroups, pointId)) {
                var point = this._pointGroups[pointId].point;
                if (!point.isVisible(startTime, endTime)) {
                    this._removePoint(point);
                    count++;
                }
            }
        }
        return count;
    };
    PointsLayer.prototype._removePoint = function (point) {
        var pointGroup = this._pointGroups[point.id];
        if (pointGroup) {
            pointGroup.destroyChildren();
            pointGroup.destroy();
            delete this._pointGroups[point.id];
        }
    };
    PointsLayer.prototype.setVisible = function (visible) {
        this._layer.setVisible(visible);
    };
    return PointsLayer;
}(_dereq_('peaks/waveform/waveform.utils'), _dereq_('konva'));
},{"konva":43,"peaks/waveform/waveform.utils":96}],84:[function(_dereq_,module,exports){
module.exports = function (WaveformShape, Utils, Konva) {
    'use strict';
    function SegmentsLayer(peaks, view, allowEditing) {
        this._peaks = peaks;
        this._view = view;
        this._allowEditing = allowEditing;
        this._segmentGroups = {};
        this._layer = new Konva.Layer();
        this._registerEventHandlers();
    }
    SegmentsLayer.prototype.addToStage = function (stage) {
        stage.add(this._layer);
    };
    SegmentsLayer.prototype._registerEventHandlers = function () {
        var self = this;
        this._peaks.on('segments.update', function (segment) {
            var redraw = false;
            var segmentGroup = self._segmentGroups[segment.id];
            var frameOffset = self._view.getFrameOffset();
            var width = self._view.getWidth();
            var frameStartTime = self._view.pixelsToTime(frameOffset);
            var frameEndTime = self._view.pixelsToTime(frameOffset + width);
            if (segmentGroup) {
                self._removeSegment(segment);
                redraw = true;
            }
            if (segment.isVisible(frameStartTime, frameEndTime)) {
                self._addSegmentGroup(segment);
                redraw = true;
            }
            if (redraw) {
                self.updateSegments(frameStartTime, frameEndTime);
            }
        });
        this._peaks.on('segments.add', function (segments) {
            var frameOffset = self._view.getFrameOffset();
            var width = self._view.getWidth();
            var frameStartTime = self._view.pixelsToTime(frameOffset);
            var frameEndTime = self._view.pixelsToTime(frameOffset + width);
            segments.forEach(function (segment) {
                if (segment.isVisible(frameStartTime, frameEndTime)) {
                    self._addSegmentGroup(segment);
                }
            });
            self.updateSegments(frameStartTime, frameEndTime);
        });
        this._peaks.on('segments.remove', function (segments) {
            segments.forEach(function (segment) {
                self._removeSegment(segment);
            });
            self._layer.draw();
        });
        this._peaks.on('segments.remove_all', function () {
            self._layer.removeChildren();
            self._segmentGroups = {};
            self._layer.draw();
        });
        this._peaks.on('segments.dragged', function (segment) {
            self._updateSegment(segment);
            self._layer.draw();
        });
    };
    SegmentsLayer.prototype._createSegmentGroup = function (segment) {
        var self = this;
        var segmentGroup = new Konva.Group();
        segmentGroup.segment = segment;
        segmentGroup.waveformShape = new WaveformShape({
            color: segment.color,
            view: self._view,
            segment: segment
        });
        segmentGroup.waveformShape.on('mouseenter', function (event) {
            if (!event.target.parent) {
                self._peaks.logger('No parent for object:', event.target);
                return;
            }
            event.target.parent.label.show();
            self._layer.draw();
            self._peaks.emit('segments.mouseenter', event.target._segment);
        });
        segmentGroup.waveformShape.on('mouseleave', function (event) {
            if (!event.target.parent) {
                self._peaks.logger('No parent for object:', event.target);
                return;
            }
            event.target.parent.label.hide();
            self._layer.draw();
            self._peaks.emit('segments.mouseleave', event.target._segment);
        });
        segmentGroup.waveformShape.on('click', function (event) {
            if (!event.target.parent) {
                self._peaks.logger('No parent for object:', event.target);
                return;
            }
            self._peaks.emit('segments.click', event.target._segment);
        });
        segmentGroup.add(segmentGroup.waveformShape);
        segmentGroup.label = self._peaks.options.createSegmentLabel(segmentGroup, segment);
        segmentGroup.label.hide();
        segmentGroup.add(segmentGroup.label);
        var editable = self._allowEditing && segment.editable;
        if (editable) {
            segmentGroup.inMarker = this._peaks.options.createSegmentMarker({
                draggable: editable,
                height: this._view.getHeight(),
                color: this._peaks.options.inMarkerColor,
                inMarker: true,
                segmentGroup: segmentGroup,
                segment: segment,
                layer: self._layer,
                onDrag: editable ? self._onSegmentHandleDrag.bind(self) : null
            });
            segmentGroup.add(segmentGroup.inMarker);
            segmentGroup.outMarker = this._peaks.options.createSegmentMarker({
                draggable: editable,
                height: this._view.getHeight(),
                color: this._peaks.options.outMarkerColor,
                inMarker: false,
                segmentGroup: segmentGroup,
                segment: segment,
                layer: self._layer,
                onDrag: editable ? self._onSegmentHandleDrag.bind(self) : null
            });
            segmentGroup.add(segmentGroup.outMarker);
        }
        return segmentGroup;
    };
    SegmentsLayer.prototype._addSegmentGroup = function (segment) {
        var segmentGroup = this._createSegmentGroup(segment);
        this._layer.add(segmentGroup);
        this._segmentGroups[segment.id] = segmentGroup;
        return segmentGroup;
    };
    SegmentsLayer.prototype._onSegmentHandleDrag = function (segmentGroup, segment) {
        var frameOffset = this._view.getFrameOffset();
        var width = this._view.getWidth();
        var inMarkerX = segmentGroup.inMarker.getX();
        var outMarkerX = segmentGroup.outMarker.getX();
        if (inMarkerX > 0) {
            var inOffset = frameOffset + inMarkerX + segmentGroup.inMarker.getWidth();
            segment.startTime = this._view.pixelsToTime(inOffset);
        }
        if (outMarkerX < width) {
            var outOffset = frameOffset + outMarkerX;
            segment.endTime = this._view.pixelsToTime(outOffset);
        }
        this._peaks.emit('segments.dragged', segment);
    };
    SegmentsLayer.prototype.updateSegments = function (startTime, endTime) {
        var segments = this._peaks.segments.find(startTime, endTime);
        var count = segments.length;
        segments.forEach(this._updateSegment.bind(this));
        count += this._removeInvisibleSegments(startTime, endTime);
        if (count > 0) {
            this._layer.draw();
        }
    };
    SegmentsLayer.prototype._updateSegment = function (segment) {
        var segmentGroup = this._findOrAddSegmentGroup(segment);
        var segmentStartOffset = this._view.timeToPixels(segment.startTime);
        var segmentEndOffset = this._view.timeToPixels(segment.endTime);
        var frameStartOffset = this._view.getFrameOffset();
        var startPixel = segmentStartOffset - frameStartOffset;
        var endPixel = segmentEndOffset - frameStartOffset;
        if (this._allowEditing && segment.editable) {
            var marker = segmentGroup.inMarker;
            if (marker) {
                marker.setX(startPixel - marker.getWidth());
                marker.label.setText(Utils.formatTime(segment.startTime, false));
            }
            marker = segmentGroup.outMarker;
            if (marker) {
                marker.setX(endPixel);
                marker.label.setText(Utils.formatTime(segment.endTime, false));
            }
        }
    };
    SegmentsLayer.prototype._findOrAddSegmentGroup = function (segment) {
        var segmentGroup = this._segmentGroups[segment.id];
        if (!segmentGroup) {
            segmentGroup = this._addSegmentGroup(segment);
        }
        return segmentGroup;
    };
    SegmentsLayer.prototype._removeInvisibleSegments = function (startTime, endTime) {
        var count = 0;
        for (var segmentId in this._segmentGroups) {
            if (Object.prototype.hasOwnProperty.call(this._segmentGroups, segmentId)) {
                var segment = this._segmentGroups[segmentId].segment;
                if (!segment.isVisible(startTime, endTime)) {
                    this._removeSegment(segment);
                    count++;
                }
            }
        }
        return count;
    };
    SegmentsLayer.prototype._removeSegment = function (segment) {
        var segmentGroup = this._segmentGroups[segment.id];
        if (segmentGroup) {
            segmentGroup.destroyChildren();
            segmentGroup.destroy();
            delete this._segmentGroups[segment.id];
        }
    };
    SegmentsLayer.prototype.setVisible = function (visible) {
        this._layer.setVisible(visible);
    };
    SegmentsLayer.prototype.setAmplitudeScale = function (scale) {
        var updated = false;
        for (var segmentId in this._segmentGroups) {
            if (Object.prototype.hasOwnProperty.call(this._segmentGroups, segmentId)) {
                var segmentGroup = this._segmentGroups[segmentId];
                segmentGroup.waveformShape.setAmplitudeScale(scale);
                updated = true;
            }
        }
        if (updated) {
            this._layer.draw();
        }
    };
    return SegmentsLayer;
}(_dereq_('peaks/views/waveform-shape'), _dereq_('peaks/waveform/waveform.utils'), _dereq_('konva'));
},{"konva":43,"peaks/views/waveform-shape":86,"peaks/waveform/waveform.utils":96}],85:[function(_dereq_,module,exports){
module.exports = function (WaveformOverview, WaveformZoomView, Utils) {
    'use strict';
    function ViewController(peaks) {
        this._peaks = peaks;
        this._overview = null;
        this._zoomview = null;
    }
    ViewController.prototype.createOverview = function (container) {
        if (this._overview) {
            return this._overview;
        }
        var waveformData = this._peaks.getWaveformData();
        this._overview = new WaveformOverview(waveformData, container, this._peaks);
        return this._overview;
    };
    ViewController.prototype.createZoomview = function (container) {
        if (this._zoomview) {
            return this._zoomview;
        }
        var waveformData = this._peaks.getWaveformData();
        this._zoomview = new WaveformZoomView(waveformData, container, this._peaks);
        return this._zoomview;
    };
    ViewController.prototype.destroy = function () {
        if (this._overview) {
            this._overview.destroy();
            this._overview = null;
        }
        if (this._zoomview) {
            this._zoomview.destroy();
            this._zoomview = null;
        }
    };
    ViewController.prototype.getView = function (name) {
        if (Utils.isNullOrUndefined(name)) {
            if (this._overview && this._zoomview) {
                return null;
            } else if (this._overview) {
                return this._overview;
            } else if (this._zoomview) {
                return this._zoomview;
            } else {
                return null;
            }
        } else {
            switch (name) {
            case 'overview':
                return this._overview;
            case 'zoomview':
                return this._zoomview;
            default:
                return null;
            }
        }
    };
    return ViewController;
}(_dereq_('peaks/views/waveform.overview'), _dereq_('peaks/views/waveform.zoomview'), _dereq_('peaks/waveform/waveform.utils'));
},{"peaks/views/waveform.overview":87,"peaks/views/waveform.zoomview":90,"peaks/waveform/waveform.utils":96}],86:[function(_dereq_,module,exports){
module.exports = function (Utils, Konva) {
    'use strict';
    function scaleY(amplitude, height, scale) {
        var range = 256;
        var offset = 128;
        var scaledAmplitude = (amplitude * scale + offset) * height / range;
        return height - Utils.clamp(height - scaledAmplitude, 0, height);
    }
    function WaveformShape(options) {
        Konva.Shape.call(this, { fill: options.color });
        this._view = options.view;
        this._segment = options.segment;
        this._scale = 1;
        this.sceneFunc(this._sceneFunc);
    }
    WaveformShape.prototype = Object.create(Konva.Shape.prototype);
    WaveformShape.prototype.setAmplitudeScale = function (scale) {
        this._scale = scale;
    };
    WaveformShape.prototype._sceneFunc = function (context) {
        var frameOffset = this._view.getFrameOffset();
        var width = this._view.getWidth();
        var height = this._view.getHeight();
        this._drawWaveform(context, this._view.getWaveformData(), frameOffset, this._segment ? this._view.timeToPixels(this._segment.startTime) : frameOffset, this._segment ? this._view.timeToPixels(this._segment.endTime) : frameOffset + width, width, height);
        context.fillShape(this);
    };
    WaveformShape.prototype._drawWaveform = function (context, waveformData, frameOffset, startPixels, endPixels, width, height) {
        if (startPixels < frameOffset) {
            startPixels = frameOffset;
        }
        var limit = frameOffset + width;
        if (endPixels > limit) {
            endPixels = limit;
        }
        if (endPixels > waveformData.length) {
            endPixels = waveformData.length;
        }
        var channel = waveformData.channel(0);
        var x, val;
        context.beginPath();
        for (x = startPixels; x < endPixels; x++) {
            val = channel.min_sample(x);
            context.lineTo(x - frameOffset + 0.5, scaleY(val, height, this._scale) + 0.5);
        }
        for (x = endPixels - 1; x >= startPixels; x--) {
            val = channel.max_sample(x);
            context.lineTo(x - frameOffset + 0.5, scaleY(val, height, this._scale) + 0.5);
        }
        context.closePath();
    };
    WaveformShape.prototype.setWaveformColor = function (color) {
        this.fill(color);
    };
    return WaveformShape;
}(_dereq_('peaks/waveform/waveform.utils'), _dereq_('konva'));
},{"konva":43,"peaks/waveform/waveform.utils":96}],87:[function(_dereq_,module,exports){
module.exports = function (PlayheadLayer, PointsLayer, SegmentsLayer, WaveformShape, MouseDragHandler, WaveformAxis, Utils, Konva) {
    'use strict';
    function WaveformOverview(waveformData, container, peaks) {
        var self = this;
        self._originalWaveformData = waveformData;
        self._container = container;
        self._peaks = peaks;
        self._options = peaks.options;
        self._width = container.clientWidth;
        self._height = container.clientHeight || self._options.height;
        if (self._width !== 0) {
            self._data = waveformData.resample(self._width);
        } else {
            self._data = waveformData;
        }
        self._resizeTimeoutId = null;
        self._stage = new Konva.Stage({
            container: container,
            width: self._width,
            height: self._height
        });
        self._waveformLayer = new Konva.FastLayer();
        self._axis = new WaveformAxis(self, self._waveformLayer, peaks.options);
        self._createWaveform();
        self._segmentsLayer = new SegmentsLayer(peaks, self, false);
        self._segmentsLayer.addToStage(self._stage);
        self._pointsLayer = new PointsLayer(peaks, self, false, false);
        self._pointsLayer.addToStage(self._stage);
        self._createHighlightLayer();
        self._playheadLayer = new PlayheadLayer(peaks, self, false, self._options.mediaElement.currentTime);
        self._playheadLayer.addToStage(self._stage);
        self._mouseDragHandler = new MouseDragHandler(self._stage, {
            onMouseDown: function (mousePosX) {
                mousePosX = Utils.clamp(mousePosX, 0, self._width);
                var time = self.pixelsToTime(mousePosX);
                self._playheadLayer.updatePlayheadTime(time);
                peaks.player.seek(time);
            },
            onMouseMove: function (mousePosX) {
                mousePosX = Utils.clamp(mousePosX, 0, self._width);
                var time = self.pixelsToTime(mousePosX);
                self._playheadLayer.updatePlayheadTime(time);
                self._peaks.player.seek(time);
            }
        });
        peaks.on('player_play', function (time) {
            self._playheadLayer.updatePlayheadTime(time);
        });
        peaks.on('player_pause', function (time) {
            self._playheadLayer.stop(time);
        });
        peaks.on('player_time_update', function (time) {
            self._playheadLayer.updatePlayheadTime(time);
        });
        peaks.on('zoomview.displaying', function (startTime, endTime) {
            if (!self._highlightRect) {
                self._createHighlightRect(startTime, endTime);
            }
            self._updateHighlightRect(startTime, endTime);
        });
        peaks.on('window_resize', function () {
            if (self._resizeTimeoutId) {
                clearTimeout(self._resizeTimeoutId);
                self._resizeTimeoutId = null;
            }
            if (self._container.clientWidth !== 0) {
                self._width = self._container.clientWidth;
                self._stage.setWidth(self._width);
                self._resizeTimeoutId = setTimeout(function () {
                    self._width = self._container.clientWidth;
                    self._data = self._originalWaveformData.resample(self._width);
                    self._stage.setWidth(self._width);
                    self._updateWaveform();
                }, 500);
            }
        });
    }
    WaveformOverview.prototype.setWaveformData = function (waveformData) {
        this._originalWaveformData = waveformData;
        if (this._width !== 0) {
            this._data = waveformData.resample(this._width);
        } else {
            this._data = waveformData;
        }
        this._updateWaveform();
    };
    WaveformOverview.prototype.timeToPixels = function (time) {
        return Math.floor(time * this._data.sample_rate / this._data.scale);
    };
    WaveformOverview.prototype.pixelsToTime = function (pixels) {
        return pixels * this._data.scale / this._data.sample_rate;
    };
    WaveformOverview.prototype.getFrameOffset = function () {
        return 0;
    };
    WaveformOverview.prototype.getWidth = function () {
        return this._width;
    };
    WaveformOverview.prototype.getHeight = function () {
        return this._height;
    };
    WaveformOverview.prototype.setAmplitudeScale = function (scale) {
        if (!Utils.isNumber(scale) || !Number.isFinite(scale)) {
            throw new Error('view.setAmplitudeScale(): Scale must be a valid number');
        }
        this._waveformShape.setAmplitudeScale(scale);
        this._waveformLayer.draw();
    };
    WaveformOverview.prototype.getWaveformData = function () {
        return this._data;
    };
    WaveformOverview.prototype._createWaveform = function () {
        this._waveformShape = new WaveformShape({
            color: this._options.overviewWaveformColor,
            view: this
        });
        this._waveformLayer.add(this._waveformShape);
        this._stage.add(this._waveformLayer);
    };
    WaveformOverview.prototype._createHighlightLayer = function () {
        this._highlightLayer = new Konva.FastLayer();
        this._stage.add(this._highlightLayer);
    };
    WaveformOverview.prototype._createHighlightRect = function (startTime, endTime) {
        this._highlightRectStartTime = startTime;
        this._highlightRectEndTime = endTime;
        var startOffset = this.timeToPixels(startTime);
        var endOffset = this.timeToPixels(endTime);
        this._highlightRect = new Konva.Rect({
            startOffset: 0,
            y: 11,
            width: endOffset - startOffset,
            stroke: this._options.overviewHighlightRectangleColor,
            strokeWidth: 1,
            height: this._height - 11 * 2,
            fill: this._options.overviewHighlightRectangleColor,
            opacity: 0.3,
            cornerRadius: 2
        });
        this._highlightLayer.add(this._highlightRect);
    };
    WaveformOverview.prototype._updateHighlightRect = function (startTime, endTime) {
        this._highlightRectStartTime = startTime;
        this._highlightRectEndTime = endTime;
        var startOffset = this.timeToPixels(startTime);
        var endOffset = this.timeToPixels(endTime);
        this._highlightRect.setAttrs({
            x: startOffset,
            width: endOffset - startOffset
        });
        this._highlightLayer.draw();
    };
    WaveformOverview.prototype._updateWaveform = function () {
        this._waveformLayer.draw();
        var playheadTime = this._peaks.player.getCurrentTime();
        this._playheadLayer.updatePlayheadTime(playheadTime);
        if (this._highlightRect) {
            this._updateHighlightRect(this._highlightRectStartTime, this._highlightRectEndTime);
        }
        var frameStartTime = 0;
        var frameEndTime = this.pixelsToTime(this._width);
        this._pointsLayer.updatePoints(frameStartTime, frameEndTime);
        this._segmentsLayer.updateSegments(frameStartTime, frameEndTime);
    };
    WaveformOverview.prototype.setWaveformColor = function (color) {
        this._waveformShape.setWaveformColor(color);
        this._waveformLayer.draw();
    };
    WaveformOverview.prototype.showPlayheadTime = function (show) {
        this._playheadLayer.showPlayheadTime(show);
    };
    WaveformOverview.prototype.destroy = function () {
        if (this._resizeTimeoutId) {
            clearTimeout(this._resizeTimeoutId);
            this._resizeTimeoutId = null;
        }
        if (this._stage) {
            this._stage.destroy();
            this._stage = null;
        }
    };
    return WaveformOverview;
}(_dereq_('peaks/views/playhead-layer'), _dereq_('peaks/views/points-layer'), _dereq_('peaks/views/segments-layer'), _dereq_('peaks/views/waveform-shape'), _dereq_('peaks/views/helpers/mousedraghandler'), _dereq_('peaks/waveform/waveform.axis'), _dereq_('peaks/waveform/waveform.utils'), _dereq_('konva'));
},{"konva":43,"peaks/views/helpers/mousedraghandler":81,"peaks/views/playhead-layer":82,"peaks/views/points-layer":83,"peaks/views/segments-layer":84,"peaks/views/waveform-shape":86,"peaks/waveform/waveform.axis":94,"peaks/waveform/waveform.utils":96}],88:[function(_dereq_,module,exports){
module.exports = function () {
    'use strict';
    function TimeController(peaks) {
        this._peaks = peaks;
    }
    TimeController.prototype.setCurrentTime = function (time) {
        this._peaks.options.deprecationLogger('peaks.time.setCurrentTime(): this function is deprecated. Call peaks.player.seek() instead');
        return this._peaks.player.seek(time);
    };
    TimeController.prototype.getCurrentTime = function () {
        this._peaks.options.deprecationLogger('peaks.time.getCurrentTime(): this function is deprecated. Call peaks.player.getCurrentTime() instead');
        return this._peaks.player.getCurrentTime();
    };
    return TimeController;
}();
},{}],89:[function(_dereq_,module,exports){
module.exports = function () {
    'use strict';
    function ZoomController(peaks, zoomLevels) {
        this._peaks = peaks;
        this._zoomLevels = zoomLevels;
        this._zoomLevelIndex = 0;
    }
    ZoomController.prototype.setZoomLevels = function (zoomLevels) {
        this._zoomLevels = zoomLevels;
        this.setZoom(0, true);
    };
    ZoomController.prototype.zoomIn = function () {
        this.setZoom(this._zoomLevelIndex - 1);
    };
    ZoomController.prototype.zoomOut = function () {
        this.setZoom(this._zoomLevelIndex + 1);
    };
    ZoomController.prototype.setZoom = function (zoomLevelIndex, forceUpdate) {
        if (zoomLevelIndex >= this._zoomLevels.length) {
            zoomLevelIndex = this._zoomLevels.length - 1;
        }
        if (zoomLevelIndex < 0) {
            zoomLevelIndex = 0;
        }
        if (!forceUpdate && zoomLevelIndex === this._zoomLevelIndex) {
            return;
        }
        var previousZoomLevelIndex = this._zoomLevelIndex;
        this._zoomLevelIndex = zoomLevelIndex;
        this._peaks.emit('zoom.update', this._zoomLevels[zoomLevelIndex], this._zoomLevels[previousZoomLevelIndex]);
    };
    ZoomController.prototype.getZoom = function () {
        return this._zoomLevelIndex;
    };
    ZoomController.prototype.getZoomLevel = function () {
        return this._zoomLevels[this._zoomLevelIndex];
    };
    return ZoomController;
}();
},{}],90:[function(_dereq_,module,exports){
module.exports = function (WaveformAxis, Utils, PlayheadLayer, PointsLayer, SegmentsLayer, WaveformShape, MouseDragHandler, AnimatedZoomAdapter, StaticZoomAdapter, Konva) {
    'use strict';
    function WaveformZoomView(waveformData, container, peaks) {
        var self = this;
        self._originalWaveformData = waveformData;
        self._container = container;
        self._peaks = peaks;
        self._options = peaks.options;
        self._data = null;
        self._pixelLength = 0;
        var initialZoomLevel = self._options.zoomLevels[peaks.zoom.getZoom()];
        self._resampleData(initialZoomLevel);
        self._width = container.clientWidth;
        self._height = container.clientHeight || self._options.height;
        self._frameOffset = 0;
        self._stage = new Konva.Stage({
            container: container,
            width: self._width,
            height: self._height
        });
        self._waveformLayer = new Konva.FastLayer();
        self._axis = new WaveformAxis(self, self._waveformLayer, peaks.options);
        self._createWaveform();
        self._segmentsLayer = new SegmentsLayer(peaks, self, true);
        self._segmentsLayer.addToStage(self._stage);
        self._pointsLayer = new PointsLayer(peaks, self, true, true);
        self._pointsLayer.addToStage(self._stage);
        self._playheadLayer = new PlayheadLayer(peaks, self, self._options.showPlayheadTime, self._options.mediaElement.currentTime);
        self._playheadLayer.addToStage(self._stage);
        var time = self._peaks.player.getCurrentTime();
        self._syncPlayhead(time);
        self._mouseDragHandler = new MouseDragHandler(self._stage, {
            onMouseDown: function (mousePosX) {
                this.initialFrameOffset = self._frameOffset;
                this.mouseDownX = mousePosX;
            },
            onMouseMove: function (mousePosX) {
                var diff = this.mouseDownX - mousePosX;
                var newFrameOffset = Utils.clamp(this.initialFrameOffset + diff, 0, self._pixelLength - self._width);
                if (newFrameOffset !== this.initialFrameOffset) {
                    self._peaks.emit('user_scroll.zoomview', newFrameOffset);
                }
            },
            onMouseUp: function (mousePosX) {
                if (!self._mouseDragHandler.isDragging()) {
                    var mouseDownX = Math.floor(this.mouseDownX);
                    var pixelIndex = self._frameOffset + mouseDownX;
                    var time = self.pixelsToTime(pixelIndex);
                    self._updateWaveform(pixelIndex - mouseDownX);
                    self._playheadLayer.updatePlayheadTime(time);
                    self._peaks.player.seek(time);
                }
            }
        });
        self._peaks.on('player_time_update', function (time) {
            if (self._mouseDragHandler.isDragging()) {
                return;
            }
            self._syncPlayhead(time);
        });
        self._peaks.on('user_seek', function (time) {
            var frameIndex = self.timeToPixels(time);
            self._updateWaveform(frameIndex - Math.floor(self._width / 2));
            self._playheadLayer.updatePlayheadTime(time);
        });
        self._peaks.on('user_scroll.zoomview', function (pixelOffset) {
            self._updateWaveform(pixelOffset);
        });
        self._peaks.on('player_play', function (time) {
            self._playheadLayer.updatePlayheadTime(time);
        });
        self._peaks.on('player_pause', function (time) {
            self._playheadLayer.stop(time);
        });
        self._peaks.on('zoom.update', function (currentScale, previousScale) {
            self.setZoomLevel(currentScale, previousScale);
        });
        self._peaks.on('window_resize', function () {
            self._width = self._container.clientWidth;
            self._stage.setWidth(self._width);
            self._updateWaveform(self._frameOffset);
        });
        function nudgeFrame(direction, large) {
            var increment;
            if (large) {
                increment = direction * self._width;
            } else {
                increment = direction * self.timeToPixels(self._options.nudgeIncrement);
            }
            self._updateWaveform(self._frameOffset + increment);
        }
        self._peaks.on('keyboard.left', nudgeFrame.bind(self, -1, false));
        self._peaks.on('keyboard.right', nudgeFrame.bind(self, 1, false));
        self._peaks.on('keyboard.shift_left', nudgeFrame.bind(self, -1, true));
        self._peaks.on('keyboard.shift_right', nudgeFrame.bind(self, 1, true));
    }
    WaveformZoomView.prototype.setWaveformData = function (waveformData) {
        this._originalWaveformData = waveformData;
    };
    WaveformZoomView.prototype._syncPlayhead = function (time) {
        this._playheadLayer.updatePlayheadTime(time);
        var pixelIndex = this.timeToPixels(time);
        var endThreshold = this._frameOffset + this._width - 100;
        if (pixelIndex >= endThreshold || pixelIndex < this._frameOffset) {
            this._frameOffset = pixelIndex - 100;
            if (this._frameOffset < 0) {
                this._frameOffset = 0;
            }
            this._updateWaveform(this._frameOffset);
        }
    };
    WaveformZoomView.prototype.setZoomLevel = function (currentScale, previousScale) {
        var currentTime = this._peaks.player.getCurrentTime();
        var apexTime;
        var playheadOffsetPixels = this._playheadLayer.getPlayheadOffset();
        if (playheadOffsetPixels >= 0 && playheadOffsetPixels < this._width) {
            apexTime = currentTime;
        } else {
            playheadOffsetPixels = this._width / 2;
            apexTime = this.pixelsToTime(this._frameOffset + playheadOffsetPixels);
        }
        this._resampleData(currentScale);
        var apexPixel = this.timeToPixels(apexTime);
        this._frameOffset = apexPixel - playheadOffsetPixels;
        this._updateWaveform(this._frameOffset);
        this._playheadLayer.zoomLevelChanged();
        this._playheadLayer.updatePlayheadTime(currentTime);
    };
    WaveformZoomView.prototype._resampleData = function (scale) {
        this._scale = scale;
        this._data = this._originalWaveformData.resample({ scale: scale });
        this._pixelLength = this._data.length;
    };
    WaveformZoomView.prototype.timeToPixels = function (time) {
        return Math.floor(time * this._data.sample_rate / this._data.scale);
    };
    WaveformZoomView.prototype.pixelsToTime = function (pixels) {
        return pixels * this._data.scale / this._data.sample_rate;
    };
    WaveformZoomView.prototype.getFrameOffset = function () {
        return this._frameOffset;
    };
    WaveformZoomView.prototype.getWidth = function () {
        return this._width;
    };
    WaveformZoomView.prototype.getHeight = function () {
        return this._height;
    };
    WaveformZoomView.prototype.setAmplitudeScale = function (scale) {
        if (!Utils.isNumber(scale) || !Number.isFinite(scale)) {
            throw new Error('view.setAmplitudeScale(): Scale must be a valid number');
        }
        this._waveformShape.setAmplitudeScale(scale);
        this._waveformLayer.draw();
        this._segmentsLayer.setAmplitudeScale(scale);
    };
    WaveformZoomView.prototype.getWaveformData = function () {
        return this._data;
    };
    WaveformZoomView.prototype._createWaveform = function () {
        this._waveformShape = new WaveformShape({
            color: this._options.zoomWaveformColor,
            view: this
        });
        this._waveformLayer.add(this._waveformShape);
        this._stage.add(this._waveformLayer);
        this._peaks.emit('zoomview.displaying', 0, this.pixelsToTime(this._width));
    };
    WaveformZoomView.prototype._updateWaveform = function (frameOffset) {
        var upperLimit;
        if (this._pixelLength < this._width) {
            frameOffset = 0;
            upperLimit = this._width;
        } else {
            upperLimit = this._pixelLength - this._width;
        }
        frameOffset = Utils.clamp(frameOffset, 0, upperLimit);
        this._frameOffset = frameOffset;
        var playheadPixel = this._playheadLayer.getPlayheadPixel();
        this._playheadLayer.updatePlayheadTime(this.pixelsToTime(playheadPixel));
        this._waveformLayer.draw();
        var frameStartTime = this.pixelsToTime(this._frameOffset);
        var frameEndTime = this.pixelsToTime(this._frameOffset + this._width);
        this._pointsLayer.updatePoints(frameStartTime, frameEndTime);
        this._segmentsLayer.updateSegments(frameStartTime, frameEndTime);
        this._peaks.emit('zoomview.displaying', frameStartTime, frameEndTime);
    };
    WaveformZoomView.prototype.setWaveformColor = function (color) {
        this._waveformShape.setWaveformColor(color);
        this._waveformLayer.draw();
    };
    WaveformZoomView.prototype.showPlayheadTime = function (show) {
        this._playheadLayer.showPlayheadTime(show);
    };
    WaveformZoomView.prototype.destroy = function () {
        if (this._stage) {
            this._stage.destroy();
            this._stage = null;
        }
    };
    return WaveformZoomView;
}(_dereq_('peaks/waveform/waveform.axis'), _dereq_('peaks/waveform/waveform.utils'), _dereq_('peaks/views/playhead-layer'), _dereq_('peaks/views/points-layer'), _dereq_('peaks/views/segments-layer'), _dereq_('peaks/views/waveform-shape'), _dereq_('peaks/views/helpers/mousedraghandler'), _dereq_('peaks/views/zooms/animated'), _dereq_('peaks/views/zooms/static'), _dereq_('konva'));
},{"konva":43,"peaks/views/helpers/mousedraghandler":81,"peaks/views/playhead-layer":82,"peaks/views/points-layer":83,"peaks/views/segments-layer":84,"peaks/views/waveform-shape":86,"peaks/views/zooms/animated":91,"peaks/views/zooms/static":92,"peaks/waveform/waveform.axis":94,"peaks/waveform/waveform.utils":96}],91:[function(_dereq_,module,exports){
module.exports = function (Konva) {
    'use strict';
    return {
        create: function (currentScale, previousScale, view) {
            var currentTime = view.peaks.player.getCurrentTime();
            var frameData = [];
            var inputIndex;
            var outputIndex;
            var lastFrameOffsetTime;
            var rootData = view.originalWaveformData;
            view.beginZoom();
            var frameCount = previousScale < currentScale ? 15 : 30;
            for (var i = 0; i < frameCount; i++) {
                var frameScale = Math.floor(previousScale + i * (currentScale - previousScale) / frameCount);
                var newWidthSeconds = view.width * frameScale / rootData.adapter.sample_rate;
                if (currentTime >= 0 && currentTime <= newWidthSeconds / 2) {
                    inputIndex = 0;
                    outputIndex = 0;
                } else if (currentTime <= rootData.duration && currentTime >= rootData.duration - newWidthSeconds / 2) {
                    lastFrameOffsetTime = rootData.duration - newWidthSeconds;
                    inputIndex = lastFrameOffsetTime * rootData.adapter.sample_rate / previousScale;
                    outputIndex = lastFrameOffsetTime * rootData.adapter.sample_rate / frameScale;
                } else {
                    var oldPixelIndex = currentTime * rootData.adapter.sample_rate / previousScale;
                    var newPixelIndex = currentTime * rootData.adapter.sample_rate / frameScale;
                    inputIndex = oldPixelIndex - view.width / 2;
                    outputIndex = newPixelIndex - view.width / 2;
                }
                if (inputIndex < 0) {
                    inputIndex = 0;
                }
                var resampled = rootData.resample({
                    scale: frameScale,
                    input_index: Math.floor(inputIndex),
                    output_index: Math.floor(outputIndex),
                    width: view.width
                });
                frameData.push(resampled);
            }
            var animationFrameFunction = this.createAnimationFrameFunction(view, frameData);
            return new Konva.Animation(animationFrameFunction, view);
        },
        createAnimationFrameFunction: function (view, frameData) {
            var index = 0;
            view.intermediateData = null;
            return function (frame) {
                if (index < frameData.length) {
                    view.intermediateData = frameData[index];
                    index++;
                    view.zoomWaveformLayer.draw();
                } else {
                    this.stop();
                    view.intermediateData = null;
                    view.endZoom();
                }
            };
        }
    };
}(_dereq_('konva'));
},{"konva":43}],92:[function(_dereq_,module,exports){
module.exports = function (Utils) {
    'use strict';
    return {
        create: function (currentScale, previousScale, view) {
            return {
                start: function (relativePosition) {
                    view.segmentLayer.draw();
                    view.pointLayer.draw();
                    var time = view.peaks.player.getCurrentTime();
                    var index = view.timeToPixels(time);
                    view.seekFrame(index, relativePosition);
                }
            };
        }
    };
}(_dereq_('peaks/waveform/waveform.utils'));
},{"peaks/waveform/waveform.utils":96}],93:[function(_dereq_,module,exports){
module.exports = function (WaveformData, webaudioBuilder, Utils) {
    'use strict';
    var isXhr2 = 'withCredentials' in new XMLHttpRequest();
    function WaveformBuilder(peaks) {
        this._peaks = peaks;
    }
    WaveformBuilder.prototype.init = function (options, callback) {
        if (options.dataUri && options.audioContext) {
            throw new Error('Peaks.init(): You must pass an audioContext or dataUri to render waveform data, not both');
        }
        if (options.dataUri) {
            return this._getRemoteWaveformData(options, callback);
        } else if (options.audioContext) {
            return this._buildWaveformDataUsingWebAudio(options, callback);
        } else {
            throw new Error('Peaks.init(): You must pass an audioContext or dataUri to render waveform data');
        }
    };
    WaveformBuilder.prototype._getRemoteWaveformData = function (options, callback) {
        var self = this;
        var dataUri = null;
        var requestType = null;
        var url;
        if (Utils.isObject(options.dataUri)) {
            dataUri = options.dataUri;
        } else if (Utils.isString(options.dataUri)) {
            dataUri = {};
            dataUri[options.dataUriDefaultFormat || 'json'] = options.dataUri;
        } else {
            throw new Error('Peaks.init(): The dataUri option must be an object');
        }
        [
            'ArrayBuffer',
            'JSON'
        ].some(function (connector) {
            if (window[connector]) {
                requestType = connector.toLowerCase();
                url = dataUri[requestType];
                return Boolean(url);
            }
        });
        if (!url) {
            throw new Error('Peaks.init(): Unable to determine a compatible dataUri format for this browser');
        }
        var xhr = self._createXHR(url, requestType, options.withCredentials, function (response) {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status !== 200) {
                callback(new Error('Unable to fetch remote data. HTTP status ' + this.status));
                return;
            }
            var waveformData = WaveformData.create(response.target.response);
            if (waveformData.channels !== 1) {
                callback(new Error('Peaks.init(): Multi-channel waveforms are not currently supported'));
                return;
            }
            callback(null, waveformData);
        }, function () {
            callback(new Error('XHR Failed'));
        });
        xhr.send();
    };
    WaveformBuilder.prototype._buildWaveformDataUsingWebAudio = function (options, callback) {
        var self = this;
        var audioContext = window.AudioContext || window.webkitAudioContext;
        if (!(options.audioContext instanceof audioContext)) {
            throw new TypeError('Peaks.init(): The audioContext option must be a valid AudioContext');
        }
        var waveformBuilderOptions;
        if (options.waveformBuilderOptions) {
            waveformBuilderOptions = options.waveformBuilderOptions;
        } else {
            waveformBuilderOptions = { scale: options.zoomLevels[0] };
        }
        if (waveformBuilderOptions.scale !== options.zoomLevels[0]) {
            waveformBuilderOptions.scale = options.zoomLevels[0];
        }
        var mediaSourceUrl = self._peaks.player.getCurrentSource();
        if (mediaSourceUrl) {
            self._requestAudioAndBuildWaveformData(mediaSourceUrl, options.audioContext, waveformBuilderOptions, options.withCredentials, callback);
        } else {
            self._peaks.once('player_canplay', function (player) {
                self._requestAudioAndBuildWaveformData(player.getCurrentSource(), options.audioContext, waveformBuilderOptions, options.withCredentials, callback);
            });
        }
    };
    WaveformBuilder.prototype._requestAudioAndBuildWaveformData = function (url, audioContext, waveformBuilderOptions, withCredentials, callback) {
        var self = this;
        if (!url) {
            self._peaks.logger('Peaks.init(): The mediaElement src is invalid');
            return;
        }
        var xhr = self._createXHR(url, 'arraybuffer', withCredentials, function (response) {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status !== 200) {
                callback(new Error('Unable to fetch remote data. HTTP status ' + this.status));
                return;
            }
            var webAudioBuilderOptions = {
                audio_context: audioContext,
                array_buffer: response.target.response
            };
            Utils.extend(webAudioBuilderOptions, waveformBuilderOptions);
            webaudioBuilder(webAudioBuilderOptions, callback);
        }, function () {
            callback(new Error('XHR Failed'));
        });
        xhr.send();
    };
    WaveformBuilder.prototype._createXHR = function (url, requestType, withCredentials, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        if (isXhr2) {
            try {
                xhr.responseType = requestType;
            } catch (e) {
            }
        }
        xhr.onload = onLoad;
        xhr.onerror = onError;
        if (isXhr2 && withCredentials) {
            xhr.withCredentials = true;
        }
        return xhr;
    };
    return WaveformBuilder;
}(_dereq_('waveform-data'), _dereq_('waveform-data/webaudio'), _dereq_('peaks/waveform/waveform.utils'));
},{"peaks/waveform/waveform.utils":96,"waveform-data":70,"waveform-data/webaudio":71}],94:[function(_dereq_,module,exports){
module.exports = function (Utils, Konva) {
    'use strict';
    function WaveformAxis(view, layer, options) {
        var self = this;
        self._options = options;
        var axisShape = new Konva.Shape({
            fill: 'rgba(38, 255, 161, 1)',
            strokeWidth: 0,
            opacity: 1,
            sceneFunc: function (context) {
                self.drawAxis(context, view);
            }
        });
        layer.add(axisShape);
    }
    WaveformAxis.prototype.getAxisLabelScale = function (view) {
        var baseSecs = 1;
        var steps = [
            1,
            2,
            5,
            10,
            20,
            30
        ];
        var minSpacing = 60;
        var index = 0;
        var secs;
        for (;;) {
            secs = baseSecs * steps[index];
            var pixels = view.timeToPixels(secs);
            if (pixels < minSpacing) {
                if (++index === steps.length) {
                    baseSecs *= 60;
                    index = 0;
                }
            } else {
                break;
            }
        }
        return secs;
    };
    WaveformAxis.prototype.drawAxis = function (context, view) {
        var currentFrameStartTime = view.pixelsToTime(view.getFrameOffset());
        var markerHeight = 10;
        var axisLabelIntervalSecs = this.getAxisLabelScale(view);
        var firstAxisLabelSecs = Utils.roundUpToNearest(currentFrameStartTime, axisLabelIntervalSecs);
        var axisLabelOffsetSecs = firstAxisLabelSecs - currentFrameStartTime;
        var axisLabelOffsetPixels = view.timeToPixels(axisLabelOffsetSecs);
        context.setAttr('strokeStyle', this._options.axisGridlineColor);
        context.setAttr('lineWidth', 1);
        context.setAttr('font', '11px sans-serif');
        context.setAttr('fillStyle', this._options.axisLabelColor);
        context.setAttr('textAlign', 'left');
        context.setAttr('textBaseline', 'bottom');
        var secs = firstAxisLabelSecs;
        var x;
        var width = view.getWidth();
        var height = view.getHeight();
        for (;;) {
            x = axisLabelOffsetPixels + view.timeToPixels(secs - firstAxisLabelSecs);
            if (x >= width) {
                break;
            }
            context.beginPath();
            context.moveTo(x + 0.5, 0);
            context.lineTo(x + 0.5, 0 + markerHeight);
            context.moveTo(x + 0.5, height);
            context.lineTo(x + 0.5, height - markerHeight);
            context.stroke();
            var label = Utils.formatTime(secs, true);
            var labelWidth = context.measureText(label).width;
            var labelX = x - labelWidth / 2;
            var labelY = height - 1 - markerHeight;
            if (labelX >= 0) {
                context.fillText(label, labelX, labelY);
            }
            secs += axisLabelIntervalSecs;
        }
    };
    return WaveformAxis;
}(_dereq_('peaks/waveform/waveform.utils'), _dereq_('konva'));
},{"konva":43,"peaks/waveform/waveform.utils":96}],95:[function(_dereq_,module,exports){
module.exports = function (Konva) {
    'use strict';
    function createSegmentMarker(options) {
        var handleHeight = 20;
        var handleWidth = handleHeight / 2;
        var handleY = options.height / 2 - 10.5;
        var handleX = -(handleWidth / 2) + 0.5;
        var group = new Konva.Group({
            draggable: options.draggable,
            dragBoundFunc: function (pos) {
                var limit;
                if (options.inMarker) {
                    limit = options.segmentGroup.outMarker.getX() - options.segmentGroup.outMarker.getWidth();
                    if (pos.x > limit) {
                        pos.x = limit;
                    }
                } else {
                    limit = options.segmentGroup.inMarker.getX() + options.segmentGroup.inMarker.getWidth();
                    if (pos.x < limit) {
                        pos.x = limit;
                    }
                }
                return {
                    x: pos.x,
                    y: this.getAbsolutePosition().y
                };
            }
        });
        var xPosition = options.inMarker ? -24 : 24;
        var text = new Konva.Text({
            x: xPosition,
            y: options.height / 2 - 5,
            text: '',
            fontSize: 10,
            fontFamily: 'sans-serif',
            fill: '#000',
            textAlign: 'center'
        });
        text.hide();
        group.label = text;
        var handle = new Konva.Rect({
            x: handleX,
            y: handleY,
            width: handleWidth,
            height: handleHeight,
            fill: options.color,
            stroke: options.color,
            strokeWidth: 1
        });
        var line = new Konva.Line({
            x: 0,
            y: 0,
            points: [
                0.5,
                0,
                0.5,
                options.height
            ],
            stroke: options.color,
            strokeWidth: 1
        });
        if (options.draggable && options.onDrag) {
            group.on('dragmove', function (event) {
                options.onDrag(options.segmentGroup, options.segment);
            });
            group.on('dragstart', function (event) {
                if (options.inMarker) {
                    text.setX(xPosition - text.getWidth());
                }
                text.show();
                options.layer.draw();
            });
            group.on('dragend', function (event) {
                text.hide();
                options.layer.draw();
            });
        }
        handle.on('mouseover touchstart', function (event) {
            if (options.inMarker) {
                text.setX(xPosition - text.getWidth());
            }
            text.show();
            options.layer.draw();
        });
        handle.on('mouseout touchend', function (event) {
            text.hide();
            options.layer.draw();
        });
        group.add(text);
        group.add(line);
        group.add(handle);
        return group;
    }
    function createSegmentLabel(segmentGroup, segment) {
        return new Konva.Text({
            x: 12,
            y: 12,
            text: segment.labelText,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Arial, sans-serif',
            fill: '#000'
        });
    }
    function createPointMarker(options) {
        var handleTop = options.height / 2 - 10.5;
        var handleWidth = 10;
        var handleHeight = 20;
        var handleX = -(handleWidth / 2) + 0.5;
        var group = new Konva.Group({
            draggable: options.draggable,
            dragBoundFunc: function (pos) {
                return {
                    x: pos.x,
                    y: this.getAbsolutePosition().y
                };
            }
        });
        if (options.onDragStart) {
            group.on('dragstart', function (event) {
                options.onDragStart(options.point);
            });
        }
        if (options.onDragMove) {
            group.on('dragmove', function (event) {
                options.onDragMove(options.point);
            });
        }
        if (options.onDragEnd) {
            group.on('dragend', function (event) {
                options.onDragEnd(options.point);
            });
        }
        if (options.onDblClick) {
            group.on('dblclick', function (event) {
                options.onDblClick(options.point);
            });
        }
        if (options.onMouseEnter) {
            group.on('mouseenter', function (event) {
                options.onMouseEnter(options.point);
            });
        }
        if (options.onMouseLeave) {
            group.on('mouseleave', function (event) {
                options.onMouseLeave(options.point);
            });
        }
        var text = null;
        if (options.showLabel) {
            text = new Konva.Text({
                x: 2,
                y: 12,
                text: options.point.labelText,
                textAlign: 'left',
                fontSize: 10,
                fontFamily: 'sans-serif',
                fill: '#000'
            });
            group.label = text;
        }
        var handle = null;
        if (options.draggable) {
            handle = new Konva.Rect({
                x: handleX,
                y: handleTop,
                width: handleWidth,
                height: handleHeight,
                fill: options.handleColor
            });
        }
        var line = new Konva.Line({
            x: 0,
            y: 0,
            points: [
                0,
                0,
                0,
                options.height
            ],
            stroke: options.handleColor,
            strokeWidth: 1
        });
        var time = null;
        if (handle) {
            time = new Konva.Text({
                x: -24,
                y: options.height / 2 - 5,
                text: '',
                fontSize: 10,
                fontFamily: 'sans-serif',
                fill: '#000',
                textAlign: 'center'
            });
            time.hide();
            group.time = time;
            handle.on('mouseover touchstart', function (event) {
                time.setX(-24 - time.getWidth());
                time.show();
                options.layer.draw();
            });
            handle.on('mouseout touchend', function (event) {
                time.hide();
                options.layer.draw();
            });
            group.on('dragstart', function (event) {
                time.setX(-24 - time.getWidth());
                time.show();
                options.layer.draw();
            });
            group.on('dragend', function (event) {
                time.hide();
                options.layer.draw();
            });
        }
        if (handle) {
            group.add(handle);
        }
        group.add(line);
        if (text) {
            group.add(text);
        }
        if (time) {
            group.add(time);
        }
        return group;
    }
    return {
        createSegmentMarker: createSegmentMarker,
        createPointMarker: createPointMarker,
        createSegmentLabel: createSegmentLabel
    };
}(_dereq_('konva'));
},{"konva":43}],96:[function(_dereq_,module,exports){
module.exports = function () {
    'use strict';
    if (typeof Number.isFinite !== 'function') {
        Number.isFinite = function isFinite(value) {
            if (typeof value !== 'number') {
                return false;
            }
            if (value !== value || value === Infinity || value === -Infinity) {
                return false;
            }
            return true;
        };
    }
    function zeroPad(number) {
        return number < 10 ? '0' + number : number;
    }
    return {
        formatTime: function (time, dropHundredths) {
            var result = [];
            var hundredths = Math.floor(time % 1 * 100);
            var seconds = Math.floor(time);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            if (hours > 0) {
                result.push(hours);
            }
            result.push(minutes % 60);
            result.push(seconds % 60);
            for (var i = 0; i < result.length; i++) {
                result[i] = zeroPad(result[i]);
            }
            result = result.join(':');
            if (!dropHundredths) {
                result += '.' + zeroPad(hundredths);
            }
            return result;
        },
        roundUpToNearest: function (value, multiple) {
            if (multiple === 0) {
                return 0;
            }
            var multiplier = 1;
            if (value < 0) {
                multiplier = -1;
                value = -value;
            }
            var roundedUp = Math.ceil(value);
            return multiplier * ((roundedUp + multiple - 1) / multiple | 0) * multiple;
        },
        clamp: function (value, min, max) {
            if (value < min) {
                return min;
            } else if (value > max) {
                return max;
            } else {
                return value;
            }
        },
        extend: function (to, from) {
            for (var key in from) {
                if (Object.prototype.hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
            return to;
        },
        isInAscendingOrder: function (array) {
            if (array.length === 0) {
                return true;
            }
            var value = array[0];
            for (var i = 1; i < array.length; i++) {
                if (value >= array[i]) {
                    return false;
                }
                value = array[i];
            }
            return true;
        },
        isNumber: function (value) {
            return typeof value === 'number';
        },
        isValidTime: function (value) {
            return typeof value === 'number' && Number.isFinite(value);
        },
        isObject: function (value) {
            return value !== null && typeof value === 'object' && !Array.isArray(value);
        },
        isString: function (value) {
            return typeof value === 'string';
        },
        isNullOrUndefined: function (value) {
            return value === undefined || value === null;
        },
        isFunction: function (value) {
            return typeof value === 'function';
        },
        isHTMLElement: function (value) {
            return value instanceof HTMLElement;
        }
    };
}();
},{}]},{},[72])(72)
});
//# sourceMappingURL=peaks.js.map
