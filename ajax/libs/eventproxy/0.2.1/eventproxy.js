/*global exports */
/*!
 * This file is used for define the EventProxy library.
 * @author <a href="mailto:shyvo1987@gmail.com">Jackson Tian</a>
 * @version 0.1.0
 */
;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) { // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) { // Node.js Module
    module.exports = definition();
  } else { // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('EventProxy', function () {

  /**
   * EventProxy. An implementation of task/event based asynchronous pattern.
   * A module that can be mixed in to *any object* in order to provide it with custom events.
   * You may `bind` or `unbind` a callback function to an event;
   * `trigger`-ing an event fires all callbacks in succession.
   * Examples:
   * ```
   * var render = function (template, resources) {};
   * var proxy = new EventProxy();
   * proxy.assign("template", "l10n", render);
   * proxy.trigger("template", template);
   * proxy.trigger("l10n", resources);
   * ```
   */
  var EventProxy = function () {
    if (!(this instanceof EventProxy)) {
      return new EventProxy();
    }
    this._callbacks = {};
    this._fired = {};
  };

  /**
   * Bind an event, specified by a string name, `ev`, to a `callback` function.
   * Passing `all` will bind the callback to all events fired.
   * @param {String} eventName Event name.
   * @param {Function} callback Callback.
   */
  EventProxy.prototype.addListener = function (ev, callback) {
    this._callbacks = this._callbacks || {};
    this._callbacks[ev] = this._callbacks[ev] || [];
    this._callbacks[ev].push(callback);
    return this;
  };
  /**
   * `addListener` alias
   */
  EventProxy.prototype.bind = EventProxy.prototype.addListener;
  /**
   * `addListener` alias
   */
  EventProxy.prototype.on = EventProxy.prototype.addListener;
  /**
   * `addListener` alias
   */
  EventProxy.prototype.await = EventProxy.prototype.addListener;

  /**
   * Remove one or many callbacks. If `callback` is null, removes all callbacks for the event.
   * If `ev` is null, removes all bound callbacks
   * for all events.
   * @param {String} eventName Event name.
   * @param {Function} callback Callback.
   */
  EventProxy.prototype.removeListener = function (ev, callback) {
    var calls = this._callbacks, i, l;
    if (!ev) {
      this._callbacks = {};
    } else if (calls) {
      if (!callback) {
        calls[ev] = [];
      } else {
        var list = calls[ev];
        if (!list) {
          return this;
        }
        l = list.length;
        for (i = 0; i < l; i++) {
          if (callback === list[i]) {
            list[i] = null;
            break;
          }
        }
      }
    }
    return this;
  };
  /**
   * `removeListener` alias
   */
  EventProxy.prototype.unbind = EventProxy.prototype.removeListener;

  /**
   * Remove all listeners. It equals unbind()
   * Just add this API for as same as Event.Emitter.
   * @param {String} event Event name.
   */
  EventProxy.prototype.removeAllListeners = function (event) {
    return this.unbind(event);
  };

  /**
   * Trigger an event, firing all bound callbacks. Callbacks are passed the
   * same arguments as `trigger` is, apart from the event name.
   * Listening for `"all"` passes the true event name as the first argument.
   * @param {String} eventName Event name
   * @param {Mix} data Pass in data
   */
  EventProxy.prototype.trigger = function (eventName, data) {
    var list, calls, ev, callback, args, i, l;
    var both = 2;
    if (!(calls = this._callbacks)) {
      return this;
    }
    while (both--) {
      ev = both ? eventName : 'all';
      list = calls[ev];
      if (list) {
        for (i = 0, l = list.length; i < l; i++) {
          if (!(callback = list[i])) {
            list.splice(i, 1); i--; l--;
          } else {
            args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
            callback.apply(this, args);
          }
        }
      }
    }
    return this;
  };
  /**
   * `trigger` alias
   */
  EventProxy.prototype.emit = EventProxy.prototype.trigger;
  /**
   * `trigger` alias
   */
  EventProxy.prototype.fire = EventProxy.prototype.trigger;

  /**
   * Bind an event like the bind method, but will remove the listener after it was fired.
   * @param {String} ev Event name
   * @param {Function} callback Callback
   */
  EventProxy.prototype.once = function (ev, callback) {
    var self = this;
    var wrapper = function () {
      callback.apply(self, arguments);
      self.unbind(ev, wrapper);
    };
    this.bind(ev, wrapper);
    return this;
  };

  /**
   * Bind an event, and trigger it immediately.
   * @param {String} ev Event name.
   * @param {Function} callback Callback.
   * @param {Mix} data The data that will be passed to calback as arguments.
   */
  EventProxy.prototype.immediate = function (ev, callback, data) {
    this.bind(ev, callback);
    this.trigger(ev, data);
    return this;
  };
  /**
   * `immediate` alias
   */
  EventProxy.prototype.asap = EventProxy.prototype.immediate;

  var _assign = function (eventname1, eventname2, cb, once) {
    var proxy = this, length, index = 0, argsLength = arguments.length,
      bind, _all,
      callback, events, isOnce, times = 0, flag = {};

    // Check the arguments length.
    if (argsLength < 3) {
      return this;
    }

    events = Array.prototype.slice.apply(arguments, [0, argsLength - 2]);
    callback = arguments[argsLength - 2];
    isOnce = arguments[argsLength - 1];

    // Check the callback type.
    if (typeof callback !== "function") {
      return this;
    }

    length = events.length;
    bind = function (key) {
      var method = isOnce ? "once" : "bind";
      proxy[method](key, function (data) {
        proxy._fired[key] = proxy._fired[key] || {};
        proxy._fired[key].data = data;
        if (!flag[key]) {
          flag[key] = true;
          times++;
        }
      });
    };

    for (index = 0; index < length; index++) {
      bind(events[index]);
    }

    _all = function (event) {
      if (times < length) {
        return;
      }
      if (!flag[event]) {
        return;
      }
      var data = [];
      for (index = 0; index < length; index++) {
        data.push(proxy._fired[events[index]].data);
      }
      if (isOnce) {
        proxy.unbind("all", _all);
      }
      callback.apply(null, data);
    };
    proxy.bind("all", _all);
  };

  /**
   * Assign some events, after all events were fired, the callback will be executed once.
   * Examples:
   * ```
   * proxy.all(ev1, ev2, callback);
   * proxy.all([ev1, ev2], callback);
   * proxy.all(ev1, [ev2, ev3], callback);
   * ```
   * @param {String} eventName1 First event name.
   * @param {String} eventName2 Second event name.
   * @param {Function} callback Callback, that will be called after predefined events were fired.
   */
  EventProxy.prototype.all = function (eventname1, eventname2, callback) {
    var args = Array.prototype.concat.apply([], arguments);
    args.push(true);
    _assign.apply(this, args);
    return this;
  };
  /**
   * `all` alias
   */
  EventProxy.prototype.assign = EventProxy.prototype.all;

  /**
   * Assign the only one 'error' event handler.
   * @param {Function(err)} callback
   */
  EventProxy.prototype.fail = function (callback) {
    var that = this;
    that.once('error', function (err) {
      that.unbind();
      callback(err);
    });
    return this;
  };

  /**
   * Assign some events, after all events were fired, the callback will be executed first time.
   * Then any event that predefined be fired again, the callback will executed with the newest data.
   * Examples:
   * ```
   * proxy.tail(ev1, ev2, callback);
   * proxy.tail([ev1, ev2], callback);
   * proxy.tail(ev1, [ev2, ev3], callback);
   * ```
   * @param {String} eventName1 First event name.
   * @param {String} eventName2 Second event name.
   * @param {Function} callback Callback, that will be called after predefined events were fired.
   */
  EventProxy.prototype.tail = function () {
    var args = Array.prototype.concat.apply([], arguments);
    args.push(false);
    _assign.apply(this, args);
    return this;
  };
  /**
   * `tail` alias
   */
  EventProxy.prototype.assignAll = EventProxy.prototype.tail;
  /**
   * `tail` alias
   */
  EventProxy.prototype.assignAlways = EventProxy.prototype.tail;

  /**
   * The callback will be executed after the event be fired N times.
   * @param {String} eventName Event name.
   * @param {Mumber} times N times.
   * @param {Function} callback Callback, that will be called after event was fired N times.
   */
  EventProxy.prototype.after = function (eventName, times, callback) {
    if (times === 0) {
      callback.call(null, []);
      return this;
    }
    var proxy = this,
      firedData = [],
      all;
    all = function (name, data) {
      if (name === eventName) {
        times--;
        firedData.push(data);
        if (times < 1) {
          proxy.unbind("all", all);
          callback.apply(null, [firedData]);
        }
      }
    };
    proxy.bind("all", all);
    return this;
  };

  /**
   * The callback will be executed after any registered event was fired. It only executed once.
   * @param {string} eventName1 Event name.
   * @param {string} eventName2 Event name.
   * @param {function} callback The callback will get a map that has data and eventName attributes.
   */
  EventProxy.prototype.any = function () {
    var proxy = this,
      index,
      _bind,
      len = arguments.length,
      callback = arguments[len - 1],
      events = Array.prototype.slice.apply(arguments, [0, len - 1]),
      count = events.length,
      _eventName = events.join("_");

    proxy.once(_eventName, callback);

    _bind = function (key) {
      proxy.bind(key, function (data) {
        proxy.trigger(_eventName, {"data": data, eventName: key});
      });
    };

    for (index = 0; index < count; index++) {
      _bind(events[index]);
    }
  };

  /**
   * The callback will be executed when the evnet name not equals with assigned evnet.
   * @param {string} eventName Event name.
   * @param {function} callback Callback.
   */
  EventProxy.prototype.not = function (eventName, callback) {
    var proxy = this;
    proxy.bind("all", function (name, data) {
      if (name !== eventName) {
        callback(data);
      }
    });
  };

  /**
   * Success callback wraper, will handler err for you.
   *
   * ```js
   * fs.readFile('foo.txt', ep.done('content'));
   *
   * // equal to =>
   *
   * fs.readFile('foo.txt', function (err, content) {
   *   if (err) {
   *     return ep.emit('error', err);
   *   }
   *   ep.emit('content', content);
   * });
   * ```
   *
   * @param {Function|String} handler, success callback or event name will be emit after callback.
   * @return {Function}
   */
  EventProxy.prototype.done = function (handler) {
    var that = this;
    return function (err, data) {
      if (err) {
        return that.emit('error', err);
      }

      // getAsync(query, ep.done('query'));
      if (typeof handler === 'string') {
        return that.emit(handler, data);
      }

      // speed improve for mostly case: `callback(err, data)`
      if (arguments.length <= 2) {
        return handler(data);
      }

      // callback(err, args1, args2, ...)
      var args = Array.prototype.slice.call(arguments, 1);
      handler.apply(null, args);
    };
  };

  /**
   * Create a new EventProxy
   * Examples:
   * ```
   * var ep = EventProxy.create();
   * ep.assign('user', 'articles', function(user, articles) {
   *   // do something...
   * });
   * // or one line ways: Create EventProxy and Assign
   * var ep = EventProxy.create('user', 'articles', function(user, articles) {
   *   // do something...
   * });
   *
   * @returns {EventProxy} EventProxy instance
   */

  EventProxy.create = function () {
    var ep = new EventProxy();
    var args = Array.prototype.concat.apply([], arguments);
    if (args.length) {
      var errorHandler = args[args.length - 1];
      var callback = args[args.length - 2];
      if (typeof errorHandler === 'function' && typeof callback === 'function') {
        args.pop();
        ep.fail(errorHandler);
      }
      ep.assign.apply(ep, Array.prototype.slice.call(args));
    }
    return ep;
  };

  // Backwards compatibility
  EventProxy.EventProxy = EventProxy;

  return EventProxy;
});
