function equals(slot, scope, expected) {
  return function(item) {
    return (item.funct === slot && item.scope === scope) === expected;
  };
}
function hasListener(listeners, signal, slot, scope) {
  if (!listeners[signal]) {
    return false;
  }
  return listeners[signal].some(equals(slot, scope, true));
}
function Emitter() {
  this._listeners = {};
}
Emitter.prototype = {
  /**
   * Returns the count of listeners for a specific signal.
   *
   * @param signal <String> The signal we want to count listeners from.
   * @returns <Number> The count.
   */
  listenersCount: function(signal) {
    var list = this._listeners[signal];
    return list ? list.length : 0;
  },
  /**
   * Adds a listener to a signal, optionally a scope can be provided.
   * NOTE: Calling this method with the same arguments will NOT add a new listener.
   *
   * @param signal <String> The signal to listen.
   * @param slot <Function> The callback function.
   * @param scope <Object?> The scope for the callback.
   */
  on: function on(signal, slot, scope) {
    var list = this._listeners;
    if (hasListener(list, signal, slot, scope)) {
      return;
    }
    if (!list[signal]) {
      list[signal] = [];
    }
    list[signal].push({
      funct: slot,
      scope
    });
  },
  /**
   * Removes the listener added with exactly the same arguments.
   *
   * @param signal <String> The signal from we want to remove the listener.
   * @param slot <Function> The callback passed to .on() method.
   * @param scope <Object> The scope for the callback.
   */
  off: function off(signal, slot, scope) {
    var list = this._listeners[signal];
    if (!list) {
      return;
    }
    this._listeners[signal] = list.filter(equals(slot, scope, false));
  },
  /**
   * Adds a listener to be fired only the next time the signal is emitted.
   *
   * @param signal <String> The signal to listen.
   * @param slot <Function> The callback function.
   * @param scope <Object?> The scope for the callback.
   */
  once: function once(signal, slot, scope) {
    if (hasListener(this._listeners, signal, slot, scope)) {
      return;
    }
    this.on(
      signal,
      function wrapper() {
        this.off(signal, wrapper, this);
        slot.apply(scope, arguments);
      },
      this
    );
  },
  /**
   * Executes the callbacks for the given signal.
   * Any extra argument will be passed to the callback.
   *
   * @param signal <String> The signal of the listeners we want to invoke.
   * @param var_args <object...> Any arguments we want the callbacks to recive.
   */
  emit: function emit(signal) {
    var list = this._listeners[signal];
    if (!list) {
      return;
    }
    var data = Array.prototype.slice.call(arguments, 1);
    list.forEach(function(item) {
      item.funct.apply(item.scope, data);
    });
  },
  /**
   * Connects slots to a group of signals,
   * optionally a scope can be provided.
   *
   * @param slots <Object> Map of signals and slots.
   * @param scope <Object> The scope for the callback.
   */
  connect: function connect(slots, scope) {
    if (!slots) {
      return;
    }
    for (var signal in slots) {
      if (slots.hasOwnProperty(signal)) {
        this.on(signal, slots[signal], scope);
      }
    }
  },
  /**
   * Disconnects slots to a group of signals,
   * optionally a scope can be provided.
   *
   * @param slots <Object> Map of signals and slots.
   * @param scope <Object> The scope for the callback.
   */
  disconnect: function disconnect(slots, scope) {
    if (!slots) {
      return;
    }
    for (var signal in slots) {
      if (slots.hasOwnProperty(signal)) {
        this.off(signal, slots[signal], scope);
      }
    }
  }
};
const View = function(elementOrMarkup) {
  if (typeof elementOrMarkup === "string") {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = elementOrMarkup;
    this.el = wrapper.firstChild;
  } else {
    this.el = elementOrMarkup;
  }
};
View.prototype = {
  listen(map, scope) {
    const splitter = /^(?:(.*)\s)?(\w+)$/;
    let handler, data, selector, event;
    for (let key in map) {
      if (!map.hasOwnProperty(key)) {
        continue;
      }
      handler = map[key];
      data = key.match(splitter);
      selector = data[1];
      event = data[2];
      if (event === "mousedown") {
        event += " touchstart";
      } else if (event === "mousemove") {
        event += " touchmove";
      } else if (event === "mouseup") {
        event += " touchend";
      } else if (event === "click") {
        event += " touchend";
      }
      if (typeof handler === "string") {
        handler = scope[handler];
      }
      if (!handler) {
        throw new Error("Handler not found");
      }
      for (const eventName of event.split(" ").filter((e) => !!e.trim())) {
        if (selector) {
          const elements = this.el.querySelectorAll(selector);
          for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener(
              eventName,
              handler.bind(scope || this)
            );
          }
        } else {
          this.el.addEventListener(eventName, handler.bind(scope || this));
        }
      }
    }
    return this;
  },
  on(name, handler) {
    this.el.addEventListener(name, handler);
  },
  off(name, handler) {
    this.el.removeEventListener(name, handler);
  },
  one(name, handler) {
    const wrapper = () => {
      this.el.removeEventListener(name, wrapper);
      handler.apply(this, arguments);
    };
    this.el.addEventListener(name, wrapper);
  },
  onTransitionEnd(handler, scope) {
    this.one("transitionend", () => {
      handler.apply(scope || this);
    });
  },
  onAnimationEnd(handler, scope) {
    this.one("animationend", () => {
      handler.apply(scope || this);
    });
  },
  show() {
    if (this.el.style.display === "none" || this.el.style.display === "") {
      this.el.style.display = this._display || "block";
    }
  },
  hide() {
    if (this.el.style.display !== "none" && this.el.style.display !== "") {
      this._display = this.el.style.display;
      this.el.style.display = "none";
    }
  },
  find(selector) {
    const element = this.el.querySelector(selector);
    return element ? new View(element) : null;
  },
  set width(value) {
    this.el.style.width = `${value}px`;
  },
  get width() {
    return this.el.offsetWidth;
  },
  set height(value) {
    this.el.style.height = `${value}px`;
  },
  get height() {
    return this.el.offsetHeight;
  },
  set top(value) {
    this.el.style.top = `${value || 0}px`;
  },
  get top() {
    return parseInt(this.el.style.top || 0, 10);
  },
  set bottom(value) {
    this.el.style.bottom = `${value || 0}px`;
  },
  get bottom() {
    return parseInt(this.el.style.top || 0, 10);
  },
  set left(value) {
    this.el.style.left = `${value || 0}px`;
  },
  get left() {
    return parseInt(this.el.style.left || 0, 10);
  },
  set right(value) {
    this.el.style.right = `${value || 0}px`;
  },
  get right() {
    return parseInt(this.el.style.right || 0, 10);
  },
  set zIndex(value) {
    this.el.style.zIndex = value;
  },
  get zIndex() {
    return parseInt(this.el.style.zIndex || 0, 10);
  },
  set opacity(value) {
    this.el.style.opacity = value;
  },
  get opacity() {
    return parseInt(this.el.style.opacity || 0, 10);
  },
  append(content) {
    const view = content instanceof View ? content : new View(content);
    this.el.appendChild(view.el);
  },
  empty() {
    this.el.innerHTML = "";
  }
};
function isTouchEvent(e) {
  return !!window.TouchEvent && e.originalEvent instanceof window.TouchEvent;
}
function convertMoveEvent(e) {
  return isTouchEvent(e) ? e.originalEvent.changedTouches[0] : e;
}
var Window = function(options) {
  this.signals = new Emitter();
  options = options || {
    title: "Untitle Window",
    width: 400,
    height: 200,
    x: 0,
    y: 0,
    content: "",
    movable: true,
    resizable: true,
    widget: false,
    titlebar: true,
    animations: true,
    classname: "",
    stayinspace: false
  };
  if (options.animations) {
    options.classname + " animated";
  }
  this.view = new View(`<div class="wm-window ${options.classname}">
    <div class="wm-window-box">
      <header class="wm-window-title" unselectable="on">
        <h1 unselectable="on">${options.title}</h1>
        <div class="wm-button-group">
          <button class="wm-minimize">&nbsp;</button>
          <button class="wm-maximize">&nbsp;</button>
          <button class="wm-close">&nbsp;</button>
        </div>
      </header>

      <section class="wm-content"></section>

      <button class="wm-resize">&nbsp;</button>
    </div>
    <div class="wm-window-overlay"></div>
  </div>`);
  this.view.listen(this.events.window, this);
  if (options.opacity) {
    this.view.el.style.opacity = options.opacity;
  }
  if (options.events) {
    for (var eventName in options.events) {
      if (options.events.hasOwnProperty(eventName) && typeof options.events[eventName] === "function") {
        this.signals.on(eventName, options.events[eventName], this);
      }
    }
  }
  this.$content = this.view.find(".wm-content");
  if (options.content) {
    this.$content.append(options.content);
  }
  this.$titlebar = this.view.find("header");
  this.width = options.width || 400;
  this.height = options.height || 200;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.z = 1e4;
  this.enabled = true;
  this.active = false;
  this.maximized = false;
  this.minimized = false;
  this._closed = true;
  this._destroyed = false;
  this.widget = false;
  this.movable = typeof options.movable !== "undefined" ? options.movable : true;
  this.resizable = typeof options.resizable !== "undefined" ? options.resizable : true;
  this.animations = typeof options.animations !== "undefined" ? options.animations : true;
  this.titlebar = true;
  this.stayinspace = typeof options.stayinspace !== "undefined" ? options.stayinspace : false;
};
Window.prototype = {
  _restore: null,
  _moving: null,
  _resizing: null,
  slots: {
    move(e) {
      var event = convertMoveEvent(e);
      if (!this.enabled || !this.movable) {
        return;
      }
      this._moving = this.toLocal({
        x: event.pageX,
        y: event.pageY
      });
      this.view.el.classList.add("move");
      this._space.el.classList.add("no-events");
      e.preventDefault();
    }
  },
  events: {
    window: {
      "click": function(e) {
        this.signals.emit("select", this, e);
      },
      "mousedown": function(e) {
        this.focus();
        if (this.widget) {
          this.slots.move.call(this, e);
        }
      },
      ".wm-content click": function(e) {
        if (this.enabled) {
          this.signals.emit("click", this, e);
        }
      },
      ".wm-window-title mousedown": function(e) {
        if (!this.maximized) {
          this.slots.move.call(this, e);
        }
      },
      ".wm-window-title dblclick": function() {
        if (this.enabled && this.resizable) {
          this.maximize();
        }
      },
      ".wm-window-title button.wm-close click": function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.enabled) {
          this.close();
        }
      },
      ".wm-window-title button.wm-maximize click": function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.enabled && this.resizable) {
          this.maximize();
        }
      },
      ".wm-window-title button.wm-minimize click": function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.enabled) {
          this.minimize();
        }
      },
      ".wm-window-title button mousedown": function(e) {
        this.focus();
        e.stopPropagation();
        e.preventDefault();
      },
      "button.wm-resize mousedown": function(e) {
        var event = convertMoveEvent(e);
        if (!this.enabled || !this.resizable) {
          return;
        }
        this._resizing = {
          width: this.width - event.pageX,
          height: this.height - event.pageY
        };
        this._space.el.classList.add("no-events");
        this.view.el.classList.add("resizing");
        e.preventDefault();
      }
    },
    space: {
      "mousemove": function(e) {
        var event = convertMoveEvent(e);
        if (!isTouchEvent(e) && e.which !== 1) {
          this._moving && this._stopMove();
          this._resizing && this._stopResize();
        }
        if (this._moving) {
          if (this.stayinspace) {
            if (this.view.el.clientWidth > this.space.el.clientWidth || this.view.el.clientHeight > this.space.el.clientHeight) {
              this.resize(
                Math.min(this.view.el.clientWidth, this.space.el.clientWidth),
                Math.min(this.view.el.clientHeight, this.space.el.clientHeight)
              );
            }
            var movingX = Math.max(0, event.pageX - this._moving.x);
            var minusX = 0;
            var movingY = Math.max(0, event.pageY - this._moving.y);
            var minusY = 0;
            if (movingX + this.view.el.clientWidth > this.space.el.clientWidth) {
              minusX = movingX + this.view.el.clientWidth - this.space.el.clientWidth;
            }
            if (movingY + this.view.el.clientHeight > this.space.el.clientHeight) {
              minusY = movingY + this.view.el.clientHeight - this.space.el.clientHeight;
            }
            this.move(
              movingX - minusX,
              movingY - minusY
            );
          } else {
            this.move(
              event.pageX - this._moving.x,
              event.pageY - this._moving.y
            );
          }
        }
        if (this._resizing) {
          this.resize(
            event.pageX + this._resizing.width,
            event.pageY + this._resizing.height
          );
        }
      },
      "mouseup": function() {
        this._moving && this._stopMove();
        this._resizing && this._stopResize();
      }
    }
  },
  _stopMove: function() {
    this.view.el.classList.remove("move");
    this._space.el.classList.remove("no-events");
    this._moving = null;
  },
  _stopResize: function() {
    this._space.el.classList.remove("no-events");
    this.view.el.classList.remove("resizing");
    this._restore = null;
    this._resizing = null;
  },
  set space(el) {
    if (el && !(el instanceof View)) {
      console.error("The given space element is not a valid View.");
      return;
    }
    this._space = el;
    el.append(this.view);
    el.listen(this.events.space, this);
  },
  get space() {
    return this._space;
  },
  get maximized() {
    return this._maximized;
  },
  set maximized(value) {
    if (value) {
      this._restoreMaximized = this.stamp();
      this.view.el.classList.add("maximized");
      this.signals.emit("maximize", this, this._restoreMaximized);
    } else {
      this.view.el.classList.remove("maximized");
      this.signals.emit("restore", this, this._restoreMaximized);
    }
    this._maximized = value;
  },
  get minimized() {
    return this._minimized;
  },
  set minimized(value) {
    if (value) {
      this._restoreMinimized = this.stamp();
      this.signals.emit("minimize", this, this._restoreMinimized);
    } else {
      this.signals.emit("restore", this, this._restoreMinimized);
    }
    this._minimized = value;
  },
  set active(value) {
    if (value) {
      this.signals.emit("focus", this);
      this.view.el.classList.add("active");
      this.view.el.classList.remove("inactive");
    } else {
      this.signals.emit("blur", this);
      this.view.el.classList.remove("active");
      this.view.el.classList.add("inactive");
    }
    this._active = value;
  },
  get active() {
    return this._active;
  },
  set enabled(value) {
    if (!value) {
      this.view.el.classList.add("disabled");
    } else {
      this.view.el.classList.remove("disabled");
    }
    this._enabled = value;
  },
  get enabled() {
    return this._enabled;
  },
  set movable(value) {
    this._movable = !!value;
  },
  get movable() {
    return this._movable;
  },
  set resizable(value) {
    if (!value) {
      this.view.el.classList.add("noresizable");
    } else {
      this.view.el.classList.remove("noresizable");
    }
    this._resizable = !!value;
  },
  get resizable() {
    return this._resizable;
  },
  set closed(value) {
  },
  // jshint ignore:line
  get closed() {
    return this._closed;
  },
  set destroyed(value) {
  },
  // jshint ignore:line
  get destroyed() {
    return this._destroyed;
  },
  set widget(value) {
    this._widget = value;
  },
  get widget() {
    return this._widget;
  },
  set titlebar(value) {
    if (value) {
      this.$titlebar.el.classList.remove("hide");
    } else {
      this.$titlebar.el.classList.add("hide");
    }
    this._titlebar = value;
  },
  get titlebar() {
    return this._titlebar;
  },
  set animations(value) {
    if (value) {
      this.view.el.classList.add("animated");
    } else {
      this.view.el.classList.remove("animated");
    }
    this._animations = value;
  },
  get animations() {
    return this._animations;
  },
  set width(value) {
    this.view.width = value;
  },
  get width() {
    return parseInt(this.view.width, 10);
  },
  set height(value) {
    this.view.height = value;
  },
  get height() {
    return parseInt(this.view.height, 10);
  },
  set x(value) {
    this.view.el.style.left = `${value}px`;
  },
  set y(value) {
    this.view.el.style.top = `${value}px`;
  },
  get x() {
    return parseInt(this.view.el.style.left || 0, 10);
  },
  get y() {
    return parseInt(this.view.el.style.top || 0, 10);
  },
  set z(value) {
    this.view.el.style.zIndex = value;
  },
  get z() {
    return parseInt(this.view.el.style.zIndex || 0, 10);
  },
  open() {
    return new Promise((done) => {
      this.signals.emit("open", this);
      this.view.show();
      this.view.el.classList.add("opening");
      this.view.onAnimationEnd(() => {
        this.view.el.classList.remove("opening");
        done();
      }, this);
      this._closed = false;
    });
  },
  close() {
    return new Promise((done) => {
      if (this.enabled) {
        this.signals.emit("close", this);
        this.view.el.classList.add("closing");
        this.view.onAnimationEnd(() => {
          this.view.el.classList.remove("closing");
          this.view.hide();
          done();
        }, this);
        this._closed = true;
      }
    });
  },
  destroy() {
    const destroy = () => {
      this.view.el.parentNode.removeChild(this.view.el);
      this.view = null;
      this._destroyed = true;
    };
    if (this._closed) {
      destroy();
    } else {
      this.close().then(destroy);
    }
  },
  resize(w, h) {
    this.width = w;
    this.height = h;
    this.signals.emit("resize", this);
  },
  move(x, y) {
    this.x = x;
    this.y = y;
    this.signals.emit("move", this);
    return this;
  },
  stamp() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      maximized: this.maximized,
      minimized: this.minimized,
      animations: this.animations
    };
  },
  restore(stamp) {
    stamp = stamp || this._restore;
    if (!stamp) {
      return;
    }
    this.maximized = stamp.maximized;
    this.minimized = stamp.minimized;
    this.resize(stamp.width, stamp.height);
    this.move(stamp.x, stamp.y);
    this.animations = stamp.animations;
  },
  maximize() {
    if (this.maximized) {
      this.maximized = false;
      this.restore();
    } else {
      this.maximized = true;
    }
    return this;
  },
  minimize() {
    if (this.minimized) {
      this.minimized = false;
      this.restore();
    } else {
      this.minimized = true;
    }
    return this;
  },
  focus() {
    this.signals.emit("focus", this);
    return this;
  },
  blur() {
    this.signals.emit("blur", this);
    return this;
  },
  toLocal(coord) {
    return {
      x: coord.x - this.x,
      y: coord.y - this.y
    };
  },
  toGlobal(coord) {
    return {
      x: coord.x + this.x,
      y: coord.y + this.y
    };
  },
  append(content) {
    this.$content.append(content);
    return this;
  }
};
const DefaultMode = {
  register() {
    console.log("Default mode registered.");
  },
  actions: {
    maximize(win) {
      win.move(0, 0);
      win.resize(this.view.width, this.view.height);
    },
    restore(win, restore) {
      restore.call(win);
    },
    minimize(win) {
      win.resize(0, 0);
    }
  }
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var FUNC_ERROR_TEXT = "Expected a function";
var NAN = 0 / 0;
var symbolTag = "[object Symbol]";
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var nativeMax = Math.max, nativeMin = Math.min;
var now = function() {
  return root.Date.now();
};
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
    return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
function isObject(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var lodash_throttle = throttle;
const throttle$1 = /* @__PURE__ */ getDefaultExportFromCjs(lodash_throttle);
const ExposeMode = {
  // Launch when plugin is registered.
  register() {
    console.log("Expose mode registered.");
    this.view.on(
      "contextmenu",
      throttle$1((event) => {
        if (this.mode !== "expose") {
          if (this.windows.length > 0) {
            this.mode = "expose";
          }
        } else if (this.mode === "expose") {
          this.mode = "default";
        }
        event.stopPropagation();
        event.preventDefault();
      }, 1e3)
    );
  },
  // Launch when plugin is enabled.
  plug() {
    const grid = Math.ceil(this.windows.length / 2);
    const maxWidth = Math.floor(this.view.width / grid);
    const maxHeight = Math.floor(this.view.height / 2);
    let scale, left, top, pos;
    this.view.el.classList.add("expose");
    for (let win, i = 0, len = this.windows.length; i < len; i++) {
      win = this.windows[i];
      win._exposeRestore = win.stamp();
      if (win.height > win.width) {
        scale = win.height > maxHeight ? maxHeight / win.height : 1;
      } else {
        scale = win.width > maxWidth ? maxWidth / win.width : 1;
      }
      scale -= 0.15;
      pos = {
        x: i % grid * maxWidth,
        y: (i < grid ? 0 : 1) * maxHeight
      };
      left = pos.x + Math.floor((maxWidth - scale * win.width) / 2);
      top = pos.y + Math.floor((maxHeight - scale * win.height) / 2);
      win.enabled = false;
      win.movable = false;
      win.view.el.classList.add("exposing");
      win.view.el.style.transformOrigin = "0 0";
      win.view.el.style.transform = `scale(${scale})`;
      win.view.top = top;
      win.view.left = left;
      const endExposing = () => {
        win.view.el.classList.remove("exposing");
      };
      if (win.animations) {
        win.view.on("transitionend", endExposing);
      } else {
        endExposing();
      }
    }
    this.overlay = true;
    this.view.one("click", () => {
      this.mode = "default";
    });
  },
  // Lauch when plugin is disabled
  unplug() {
    return new Promise((done) => {
      if (this.windows.length === 0) {
        done();
      }
      for (let win, i = this.windows.length; i--; ) {
        win = this.windows[i];
        win.restore(win._exposeRestore);
        win.view.el.style.transform = "scale(1)";
        win.view.el.style.transformOrigin = "50% 50%";
        const removeTransform = /* @__PURE__ */ function(win2, windowIndex) {
          return function() {
            if (windowIndex === 0) {
              done();
            }
            win2.view.el.style.transform = "";
            win2._exposeRestore = null;
          };
        }(win, i);
        if (win.animations) {
          this.view.onTransitionEnd(removeTransform, this);
        } else {
          removeTransform.call(this);
        }
        win.movable = true;
        win.enabled = true;
      }
      this.overlay = false;
    }).then(() => {
      this.view.el.classList.remove("expose");
    });
  },
  actions: {
    focus() {
    },
    close() {
      this.mode = "expose";
    },
    select(win) {
      this.mode = "default";
      win.focus();
    }
  }
};
var WindowManager = function(container) {
  var createWindow;
  var root2 = container ? container : document.body;
  this.view = new View(
    '<div class="wm-space"><div class="wm-overlay" /></div>'
  );
  root2.insertBefore(this.view.el, root2.firstChild);
  this.$overlay = this.view.find(".wm-overlay");
  this.$overlay.el.style.zIndex = this._baseZ - 1;
  this.actions.forEach(function(value) {
    this[value] = (function(action) {
      return function() {
        if (this.currentMode.actions[action]) {
          this.currentMode.actions[action].apply(this, arguments);
        }
      };
    }).call(this, value);
  }, this);
  for (var mode in this.modes) {
    if (this.modes.hasOwnProperty(mode) && this.modes[mode].register) {
      this.modes[mode].register.apply(this);
    }
  }
  this.windows = [];
  this.active = null;
  this.mode = "default";
  createWindow = this.createWindow;
  this.createWindow = createWindow.bind(this);
  this.createWindow.fromQuery = createWindow.fromQuery.bind(this);
  this.createWindow.fromElement = createWindow.fromElement.bind(this);
};
WindowManager.prototype = {
  actions: [
    "focus",
    "blur",
    "close",
    "maximize",
    "minimize",
    "restore",
    "select"
  ],
  modes: {
    "default": DefaultMode,
    "expose": ExposeMode
  },
  set mode(value) {
    var mode = this.modes[value];
    if (!mode || this._mode === value) {
      return;
    }
    if (this._mode && this.currentMode.unplug) {
      this.currentMode.unplug.apply(this);
    }
    if (mode.plug) {
      mode.plug.apply(this);
    }
    this._mode = value;
  },
  get mode() {
    return this._mode;
  },
  get currentMode() {
    return this.modes[this._mode];
  },
  set overlay(value) {
    this.$overlay.el.style.opacity = value ? 0.8 : 0;
    this._overlay = this.$overlay.el.style.opacity;
  },
  get overlay() {
    return this._overlay;
  },
  createWindow(options) {
    var win = new Window(options);
    this.mode = "default";
    win.signals.on("focus", this._focus, this);
    win.signals.on("blur", this._blur, this);
    win.signals.on("close", this._close, this);
    this.actions.forEach(function(action) {
      win.signals.on(action, this[action], this);
    }, this);
    this.windows.push(win);
    win.space = this.view;
    win.focus();
    return win;
  },
  /**
   * Internal action always performed besides the mode definition
   */
  _focus(win) {
    var currentZ, baseZ = 1e4, maxZ = baseZ + 1e4, index;
    if (this.active && this.active === win) {
      return;
    }
    if (this.active) {
      currentZ = this.active.z;
      this.active.blur();
    } else {
      currentZ = baseZ;
    }
    index = this.windows.indexOf(win);
    this.windows.splice(index, 1);
    this.windows.push(win);
    win.z = currentZ + 1;
    if (currentZ > maxZ + this.windows.length) {
      for (var z, i = this.windows.length; i--; ) {
        z = this.windows[i].z;
        this.windows[i].z = baseZ + (z - maxZ);
      }
    }
    this.active = win;
  },
  /**
   * Internal action always performed besides the mode definition
   */
  _blur(win) {
    if (this.active === win) {
      this.active = null;
    }
  },
  /**
   * Internal action always performed besides the mode definition
   */
  _close(win) {
    var id = this.windows.indexOf(win), len;
    if (id === -1) {
      console.log("Trying to close a window that doesn't exist in this window manager");
      return;
    }
    this.windows.splice(id, 1);
    len = this.windows.length;
    if (this.active && this.active === win) {
      this.active = len !== 0 ? this.windows[len - 1] : null;
      if (this.active) {
        this.active.focus();
      }
    }
  }
};
WindowManager.prototype.createWindow.fromQuery = function(selector, options) {
  const element = document.querySelector(selector);
  if (!!element) {
    options.content = new View(element);
  }
  return this.createWindow(options);
};
WindowManager.prototype.createWindow.fromElement = function(element, options) {
  options.content = new View(element);
  return this.createWindow(options);
};
const version = "0.3.0";
if (typeof window !== "undefined") {
  window.Ventus = {
    version: "0.3.0",
    WindowManager,
    Window
  };
}
export {
  Window,
  WindowManager,
  version
};
//# sourceMappingURL=ventus.js.map
