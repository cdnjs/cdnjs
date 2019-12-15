/*!
* metismenu - v3.0.0-alpha.0
* A menu plugin
* https://github.com/onokumus/metismenu#readme
*
* Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.MetisMenu = factory());
}(this, (function () { 'use strict';

  // Copyright Joyent, Inc. and other Node contributors.

  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };

  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target)
        .concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  var events = EventEmitter;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;

  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
      defaultMaxListeners = arg;
    }
  });

  EventEmitter.init = function() {

    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = (type === 'error');

    var events = this._events;
    if (events !== undefined)
      doError = (doError && events.error === undefined);
    else if (!doError)
      return false;

    // If there is no 'error' event listener then throw.
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];

    if (handler === undefined)
      return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    events = target._events;
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
        // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }

      // Check for listener leak
      m = $getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + String(type) + ' listeners ' +
                            'added. Use emitter.setMaxListeners() to ' +
                            'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function onceWrapper() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      ReflectApply(this.listener, this.target, args);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function') {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function') {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }

        events = this._events;
        if (events === undefined)
          return this;

        list = events[type];
        if (list === undefined)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener !== undefined)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (events === undefined)
          return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

  function _listeners(target, type, unwrap) {
    var events = target._events;

    if (events === undefined)
      return [];

    var evlistener = events[type];
    if (evlistener === undefined)
      return [];

    if (typeof evlistener === 'function')
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];

    return unwrap ?
      unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var Default = {
    activeClass: "active",
    collapseClass: "collapse",
    collapseInClass: "in",
    collapsingClass: "collapsing",
    parentTrigger: "li",
    preventDefault: true,
    subMenu: "ul",
    toggle: true,
    triggerElement: "a"
  };

  var MetisMenu =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inheritsLoose(MetisMenu, _EventEmitter);

    function MetisMenu(element, options) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.element = typeof element === "string" ? document.querySelector(element) : element;
      _this.cacheEl = _this.element;
      _this.config = _objectSpread({}, Default, options);
      _this.cacheConfig = _this.config;
      _this.disposed = false;
      _this.ulArr = [];
      _this.liArr = [];
      _this.aArr = [];
      _this.listenerOb = [];

      _this.init();

      return _this;
    }

    var _proto = MetisMenu.prototype;

    _proto.update = function update() {
      this.disposed = false;
      this.element = this.cacheEl;
      this.config = this.cacheConfig;
      this.init();
    };

    _proto.dispose = function dispose() {
      for (var _iterator = this.listenerOb, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var lo = _ref;

        for (var key in lo) {
          if (lo.hasOwnProperty(key)) {
            var el = lo[key];
            el[1].removeEventListener(el[0], el[2]);
          }
        }
      }

      this.ulArr = [];
      this.liArr = [];
      this.aArr = [];
      this.listenerOb = [];
      this.config = null;
      this.element = null;
      this.disposed = true;
    };

    _proto.init = function init() {
      this.ulArr = [].slice.call(this.element.querySelectorAll(this.config.subMenu));

      for (var _iterator2 = this.ulArr.entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _ref3 = _ref2,
            index = _ref3[0],
            ul = _ref3[1];
        var li = ul.parentNode;
        this.liArr.push(li);

        if (li.getAttribute("id") === null) {
          li.setAttribute("id", "mm-item-" + index);
          ul.setAttribute("aria-labelledby", "mm-item-" + index);
        } else {
          ul.setAttribute("aria-labelledby", li.getAttribute("id"));
        }

        var ulId = ul.getAttribute("id") !== null ? ul.getAttribute("id") : "mm-item-ul-" + index;

        if (ul.getAttribute("id") === null) {
          ul.setAttribute("id", ulId);
        }

        ul.classList.add(this.config.collapseClass);

        if (li.classList.contains(this.config.activeClass)) {
          this.show(ul);
        } else {
          this.hide(ul);
        }

        var a = li.querySelector(this.config.triggerElement);
        a.setAttribute("aria-controls", ulId);
        a.setAttribute("aria-expanded", "false");
        var listenerOb = {
          aClick: ["click", a, this.clickEvent.bind(this)]
        };

        for (var key in listenerOb) {
          if (listenerOb.hasOwnProperty(key)) {
            var listener = listenerOb[key];
            listener[1].addEventListener(listener[0], listener[2]);
          }
        }

        this.listenerOb.push(listenerOb);
      }
    };

    _proto.clickEvent = function clickEvent(ev) {
      if (!this.disposed) {
        if (ev.currentTarget.tagName === "A") {
          ev.preventDefault();
        }

        var li = ev.target.parentNode;
        var ul = li.querySelector(this.config.subMenu);
        this.toggle(ul);
      }
    };

    _proto.toggle = function toggle(ul) {
      if (ul.parentNode.classList.contains(this.config.activeClass)) {
        this.hide(ul);
      } else {
        this.show(ul);
      }
    };

    _proto.show = function show(ul) {
      var _this2 = this;

      if (this.isTransitioning || ul.classList.contains(this.config.collapseInClass)) {
        return;
      }

      var li = ul.parentNode;
      this.emit("show.metisMenu", li);

      var complete = function complete() {
        ul.classList.remove(_this2.config.collapsingClass);
        ul.style.height = "";
        ul.removeEventListener("transitionend", complete);

        _this2.setTransitioning(false);
      };

      li.classList.add(this.config.activeClass);
      var a = li.querySelector(this.config.triggerElement);
      a.setAttribute("aria-expanded", "true");
      ul.style.height = "0px";
      ul.classList.remove(this.config.collapseClass);
      ul.classList.remove(this.config.collapseInClass);
      ul.classList.add(this.config.collapsingClass);
      var eleParentSiblins = [].slice.call(li.parentNode.children).filter(function (c) {
        return c !== li;
      });

      if (this.config.toggle && eleParentSiblins.length > 0) {
        for (var _iterator3 = eleParentSiblins, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref4;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref4 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref4 = _i3.value;
          }

          var sibli = _ref4;
          var sibUl = sibli.querySelector(this.config.subMenu);

          if (sibUl !== null) {
            this.hide(sibUl);
          }
        }
      }

      this.setTransitioning(true);
      ul.classList.add(this.config.collapseClass);
      ul.classList.add(this.config.collapseInClass);
      ul.style.height = ul.scrollHeight + "px";
      ul.addEventListener("transitionend", complete);
      this.emit("shown.metisMenu", ul);
    };

    _proto.hide = function hide(ul) {
      var _this3 = this;

      if (this.isTransitioning || !ul.classList.contains(this.config.collapseInClass)) {
        return;
      }

      var li = ul.parentNode;
      this.emit("hide.metisMenu", li);
      li.classList.remove(this.config.activeClass);

      var comp = function comp() {
        ul.classList.remove(_this3.config.collapsingClass);
        ul.classList.add(_this3.config.collapseClass);
        ul.removeEventListener("transitionend", comp);

        _this3.setTransitioning(false);
      };

      ul.style.height = ul.getBoundingClientRect().height + "px";
      ul.style.height = ul.offsetHeight + "px";
      ul.classList.add(this.config.collapsingClass);
      ul.classList.remove(this.config.collapseClass);
      ul.classList.remove(this.config.collapseInClass);
      this.setTransitioning(true);
      ul.addEventListener("transitionend", comp);
      ul.style.height = "0px";
      var a = li.querySelector(this.config.triggerElement);
      a.setAttribute("aria-expanded", "false");
      this.emit("hidden.metisMenu", li);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this.isTransitioning = isTransitioning;
    };

    return MetisMenu;
  }(events.EventEmitter);

  var cjs = MetisMenu;

  return cjs;

})));
//# sourceMappingURL=metisMenu.js.map
