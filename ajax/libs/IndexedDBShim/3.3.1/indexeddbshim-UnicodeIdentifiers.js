(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.EventTargeter = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

exports.ShimDOMException = void 0;
var phases = {
    NONE: 0,
    CAPTURING_PHASE: 1,
    AT_TARGET: 2,
    BUBBLING_PHASE: 3
};

if (typeof DOMException === 'undefined') {
    // Todo: Better polyfill (if even needed here)
    exports.ShimDOMException = function DOMException(msg, name) {
        // No need for `toString` as same as for `Error`
        var err = new Error(msg);
        err.name = name;
        return err;
    };
} else {
    exports.ShimDOMException = DOMException;
}

var ev = new WeakMap();
var evCfg = new WeakMap();

// Todo: Set _ev argument outside of this function
/**
* We use an adapter class rather than a proxy not only for compatibility but also since we have to clone
* native event properties anyways in order to properly set `target`, etc.
* @note The regular DOM method `dispatchEvent` won't work with this polyfill as it expects a native event
*/
var ShimEvent = function Event(type) {
    // eslint-disable-line no-native-reassign
    // For WebIDL checks of function's `length`, we check `arguments` for the optional arguments
    this[Symbol.toStringTag] = 'Event';
    this.toString = function () {
        return '[object Event]';
    };
    var evInit = arguments[1];
    var _ev = arguments[2];
    if (!arguments.length) {
        throw new TypeError("Failed to construct 'Event': 1 argument required, but only 0 present.");
    }
    evInit = evInit || {};
    _ev = _ev || {};

    var _evCfg = {};
    if ('composed' in evInit) {
        _evCfg.composed = evInit.composed;
    }

    // _evCfg.isTrusted = true; // We are not always using this for user-created events
    // _evCfg.timeStamp = new Date().valueOf(); // This is no longer a timestamp, but monotonic (elapsed?)

    ev.set(this, _ev);
    evCfg.set(this, _evCfg);
    this.initEvent(type, evInit.bubbles, evInit.cancelable);
    Object.defineProperties(this, ['target', 'currentTarget', 'eventPhase', 'defaultPrevented'].reduce(function (obj, prop) {
        obj[prop] = {
            get: function get$$1() {
                return (/* prop in _evCfg && */_evCfg[prop] !== undefined ? _evCfg[prop] : prop in _ev ? _ev[prop] :
                    // Defaults
                    prop === 'eventPhase' ? 0 : prop === 'defaultPrevented' ? false : null
                );
            }
        };
        return obj;
    }, {}));
    var props = [
    // Event
    'type', 'bubbles', 'cancelable', // Defaults to false
    'isTrusted', 'timeStamp', 'initEvent',
    // Other event properties (not used by our code)
    'composedPath', 'composed'];
    if (this.toString() === '[object CustomEvent]') {
        props.push('detail', 'initCustomEvent');
    }

    Object.defineProperties(this, props.reduce(function (obj, prop) {
        obj[prop] = {
            get: function get$$1() {
                return prop in _evCfg ? _evCfg[prop] : prop in _ev ? _ev[prop] : ['bubbles', 'cancelable', 'composed'].includes(prop) ? false : undefined;
            }
        };
        return obj;
    }, {}));
};

ShimEvent.prototype.preventDefault = function () {
    if (!(this instanceof ShimEvent)) {
        throw new TypeError('Illegal invocation');
    }
    var _ev = ev.get(this);
    var _evCfg = evCfg.get(this);
    if (this.cancelable && !_evCfg._passive) {
        _evCfg.defaultPrevented = true;
        if (typeof _ev.preventDefault === 'function') {
            // Prevent any predefined defaults
            _ev.preventDefault();
        }
    }
};
ShimEvent.prototype.stopImmediatePropagation = function () {
    var _evCfg = evCfg.get(this);
    _evCfg._stopImmediatePropagation = true;
};
ShimEvent.prototype.stopPropagation = function () {
    var _evCfg = evCfg.get(this);
    _evCfg._stopPropagation = true;
};
ShimEvent.prototype.initEvent = function (type, bubbles, cancelable) {
    // Chrome currently has function length 1 only but WebIDL says 3
    // const bubbles = arguments[1];
    // const cancelable = arguments[2];
    var _evCfg = evCfg.get(this);

    if (_evCfg._dispatched) {
        return;
    }

    _evCfg.type = type;
    if (bubbles !== undefined) {
        _evCfg.bubbles = bubbles;
    }
    if (cancelable !== undefined) {
        _evCfg.cancelable = cancelable;
    }
};
['type', 'target', 'currentTarget'].forEach(function (prop) {
    Object.defineProperty(ShimEvent.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get$$1() {
            throw new TypeError('Illegal invocation');
        }
    });
});
['eventPhase', 'defaultPrevented', 'bubbles', 'cancelable', 'timeStamp'].forEach(function (prop) {
    Object.defineProperty(ShimEvent.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get$$1() {
            throw new TypeError('Illegal invocation');
        }
    });
});
['NONE', 'CAPTURING_PHASE', 'AT_TARGET', 'BUBBLING_PHASE'].forEach(function (prop, i) {
    Object.defineProperty(ShimEvent, prop, {
        enumerable: true,
        writable: false,
        value: i
    });
    Object.defineProperty(ShimEvent.prototype, prop, {
        writable: false,
        value: i
    });
});
ShimEvent[Symbol.toStringTag] = 'Function';
ShimEvent.prototype[Symbol.toStringTag] = 'EventPrototype';
Object.defineProperty(ShimEvent, 'prototype', {
    writable: false
});

var ShimCustomEvent = function CustomEvent(type) {
    var evInit = arguments[1];
    var _ev = arguments[2];
    ShimEvent.call(this, type, evInit, _ev);
    this[Symbol.toStringTag] = 'CustomEvent';
    this.toString = function () {
        return '[object CustomEvent]';
    };
    // var _evCfg = evCfg.get(this);
    evInit = evInit || {};
    this.initCustomEvent(type, evInit.bubbles, evInit.cancelable, 'detail' in evInit ? evInit.detail : null);
};
Object.defineProperty(ShimCustomEvent.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: ShimCustomEvent
});
ShimCustomEvent.prototype.initCustomEvent = function (type, bubbles, cancelable, detail) {
    if (!(this instanceof ShimCustomEvent)) {
        throw new TypeError('Illegal invocation');
    }
    var _evCfg = evCfg.get(this);
    ShimCustomEvent.call(this, type, {
        bubbles: bubbles, cancelable: cancelable, detail: detail
    }, arguments[4]);

    if (_evCfg._dispatched) {
        return;
    }

    if (detail !== undefined) {
        _evCfg.detail = detail;
    }
    Object.defineProperty(this, 'detail', {
        get: function get$$1() {
            return _evCfg.detail;
        }
    });
};
ShimCustomEvent[Symbol.toStringTag] = 'Function';
ShimCustomEvent.prototype[Symbol.toStringTag] = 'CustomEventPrototype';
Object.setPrototypeOf(ShimCustomEvent, ShimEvent); // TODO: IDL needs but reported as slow!
Object.defineProperty(ShimCustomEvent.prototype, 'detail', {
    enumerable: true,
    configurable: true,
    get: function get$$1() {
        throw new TypeError('Illegal invocation');
    }
});
Object.setPrototypeOf(ShimCustomEvent.prototype, ShimEvent.prototype); // TODO: IDL needs but reported as slow!
Object.defineProperty(ShimCustomEvent, 'prototype', {
    writable: false
});

function copyEvent(ev) {
    if ('detail' in ev) {
        return new ShimCustomEvent(ev.type, { bubbles: ev.bubbles, cancelable: ev.cancelable, detail: ev.detail }, ev);
    }
    return new ShimEvent(ev.type, { bubbles: ev.bubbles, cancelable: ev.cancelable }, ev);
}

function getListenersOptions(listeners, type, options) {
    var listenersByType = listeners[type];
    if (listenersByType === undefined) listeners[type] = listenersByType = [];
    options = typeof options === 'boolean' ? { capture: options } : options || {};
    var stringifiedOptions = JSON.stringify(options);
    var listenersByTypeOptions = listenersByType.filter(function (obj) {
        return stringifiedOptions === JSON.stringify(obj.options);
    });
    return { listenersByTypeOptions: listenersByTypeOptions, options: options, listenersByType: listenersByType };
}

var methods = {
    addListener: function addListener(listeners, listener, type, options) {
        var listenerOptions = getListenersOptions(listeners, type, options);
        var listenersByTypeOptions = listenerOptions.listenersByTypeOptions;
        options = listenerOptions.options;
        var listenersByType = listenerOptions.listenersByType;

        if (listenersByTypeOptions.some(function (l) {
            return l.listener === listener;
        })) return;
        listenersByType.push({ listener: listener, options: options });
    },
    removeListener: function removeListener(listeners, listener, type, options) {
        var listenerOptions = getListenersOptions(listeners, type, options);
        var listenersByType = listenerOptions.listenersByType;
        var stringifiedOptions = JSON.stringify(listenerOptions.options);

        listenersByType.some(function (l, i) {
            if (l.listener === listener && stringifiedOptions === JSON.stringify(l.options)) {
                listenersByType.splice(i, 1);
                if (!listenersByType.length) delete listeners[type];
                return true;
            }
        });
    },
    hasListener: function hasListener(listeners, listener, type, options) {
        var listenerOptions = getListenersOptions(listeners, type, options);
        var listenersByTypeOptions = listenerOptions.listenersByTypeOptions;
        return listenersByTypeOptions.some(function (l) {
            return l.listener === listener;
        });
    }
};

function EventTarget() {
    throw new TypeError('Illegal constructor');
}

Object.assign(EventTarget.prototype, ['Early', '', 'Late', 'Default'].reduce(function (obj, listenerType) {
    ['add', 'remove', 'has'].forEach(function (method) {
        obj[method + listenerType + 'EventListener'] = function (type, listener) {
            var options = arguments[2]; // We keep the listener `length` as per WebIDL
            if (arguments.length < 2) throw new TypeError('2 or more arguments required');
            if (typeof type !== 'string') {
                throw new exports.ShimDOMException('UNSPECIFIED_EVENT_TYPE_ERR', 'UNSPECIFIED_EVENT_TYPE_ERR');
            }
            if (listener.handleEvent) {
                listener = listener.handleEvent.bind(listener);
            }
            var arrStr = '_' + listenerType.toLowerCase() + (listenerType === '' ? 'l' : 'L') + 'isteners';
            if (!this[arrStr]) {
                Object.defineProperty(this, arrStr, { value: {} });
            }
            return methods[method + 'Listener'](this[arrStr], listener, type, options);
        };
    });
    return obj;
}, {}));

Object.assign(EventTarget.prototype, {
    __setOptions: function __setOptions(customOptions) {
        customOptions = customOptions || {};
        // Todo: Make into event properties?
        this._defaultSync = customOptions.defaultSync;
        this._extraProperties = customOptions.extraProperties || [];
        if (customOptions.legacyOutputDidListenersThrowFlag) {
            // IndexedDB
            this._legacyOutputDidListenersThrowCheck = true;
            this._extraProperties.push('__legacyOutputDidListenersThrowError');
        }
    },
    dispatchEvent: function dispatchEvent(ev) {
        return this._dispatchEvent(ev, true);
    },
    _dispatchEvent: function _dispatchEvent(ev, setTarget) {
        var _this = this;

        ['early', '', 'late', 'default'].forEach(function (listenerType) {
            var arrStr = '_' + listenerType + (listenerType === '' ? 'l' : 'L') + 'isteners';
            if (!_this[arrStr]) {
                Object.defineProperty(_this, arrStr, { value: {} });
            }
        });

        var _evCfg = evCfg.get(ev);
        if (_evCfg && setTarget && _evCfg._dispatched) {
            throw new exports.ShimDOMException('The object is in an invalid state.', 'InvalidStateError');
        }

        var eventCopy = void 0;
        if (_evCfg) {
            eventCopy = ev;
        } else {
            eventCopy = copyEvent(ev);
            _evCfg = evCfg.get(eventCopy);
            _evCfg._dispatched = true;
            this._extraProperties.forEach(function (prop) {
                if (prop in ev) {
                    eventCopy[prop] = ev[prop]; // Todo: Put internal to `ShimEvent`?
                }
            });
        }
        var _eventCopy = eventCopy,
            type = _eventCopy.type;


        function finishEventDispatch() {
            _evCfg.eventPhase = phases.NONE;
            _evCfg.currentTarget = null;
            delete _evCfg._children;
        }
        function invokeDefaults() {
            // Ignore stopPropagation from defaults
            _evCfg._stopImmediatePropagation = undefined;
            _evCfg._stopPropagation = undefined;
            // We check here for whether we should invoke since may have changed since timeout (if late listener prevented default)
            if (!eventCopy.defaultPrevented || !_evCfg.cancelable) {
                // 2nd check should be redundant
                _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke default listeners
                eventCopy.target.invokeCurrentListeners(eventCopy.target._defaultListeners, eventCopy, type);
            }
            finishEventDispatch();
        }
        var continueEventDispatch = function continueEventDispatch() {
            // Ignore stop propagation of user now
            _evCfg._stopImmediatePropagation = undefined;
            _evCfg._stopPropagation = undefined;
            if (!_this._defaultSync) {
                setTimeout(invokeDefaults, 0);
            } else invokeDefaults();

            _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke late listeners
            // Sync default might have stopped
            if (!_evCfg._stopPropagation) {
                _evCfg._stopImmediatePropagation = undefined;
                _evCfg._stopPropagation = undefined;
                // We could allow stopPropagation by only executing upon (_evCfg._stopPropagation)
                eventCopy.target.invokeCurrentListeners(eventCopy.target._lateListeners, eventCopy, type);
            }
            finishEventDispatch();

            return !eventCopy.defaultPrevented;
        };

        if (setTarget) _evCfg.target = this;

        switch (eventCopy.eventPhase) {
            default:case phases.NONE:

                _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke early listeners
                this.invokeCurrentListeners(this._earlyListeners, eventCopy, type);
                if (!this.__getParent) {
                    _evCfg.eventPhase = phases.AT_TARGET;
                    return this._dispatchEvent(eventCopy, false);
                }

                var par = this;
                var root = this;
                while (par.__getParent && (par = par.__getParent()) !== null) {
                    if (!_evCfg._children) {
                        _evCfg._children = [];
                    }
                    _evCfg._children.push(root);
                    root = par;
                }
                root._defaultSync = this._defaultSync;
                _evCfg.eventPhase = phases.CAPTURING_PHASE;
                return root._dispatchEvent(eventCopy, false);
            case phases.CAPTURING_PHASE:
                if (_evCfg._stopPropagation) {
                    return continueEventDispatch();
                }
                this.invokeCurrentListeners(this._listeners, eventCopy, type);
                var child = _evCfg._children && _evCfg._children.length && _evCfg._children.pop();
                if (!child || child === eventCopy.target) {
                    _evCfg.eventPhase = phases.AT_TARGET;
                }
                if (child) child._defaultSync = this._defaultSync;
                return (child || this)._dispatchEvent(eventCopy, false);
            case phases.AT_TARGET:
                if (_evCfg._stopPropagation) {
                    return continueEventDispatch();
                }
                this.invokeCurrentListeners(this._listeners, eventCopy, type, true);
                if (!_evCfg.bubbles) {
                    return continueEventDispatch();
                }
                _evCfg.eventPhase = phases.BUBBLING_PHASE;
                return this._dispatchEvent(eventCopy, false);
            case phases.BUBBLING_PHASE:
                if (_evCfg._stopPropagation) {
                    return continueEventDispatch();
                }
                var parent = this.__getParent && this.__getParent();
                if (!parent) {
                    return continueEventDispatch();
                }
                parent.invokeCurrentListeners(parent._listeners, eventCopy, type, true);
                parent._defaultSync = this._defaultSync;
                return parent._dispatchEvent(eventCopy, false);
        }
    },
    invokeCurrentListeners: function invokeCurrentListeners(listeners, eventCopy, type, checkOnListeners) {
        var _this2 = this;

        var _evCfg = evCfg.get(eventCopy);
        _evCfg.currentTarget = this;

        var listOpts = getListenersOptions(listeners, type, {});
        var listenersByType = listOpts.listenersByType.concat();
        var dummyIPos = listenersByType.length ? 1 : 0;

        listenersByType.some(function (listenerObj, i) {
            var onListener = checkOnListeners ? _this2['on' + type] : null;
            if (_evCfg._stopImmediatePropagation) return true;
            if (i === dummyIPos && typeof onListener === 'function') {
                // We don't splice this in as could be overwritten; executes here per
                //    https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes:event-handlers-14
                _this2.tryCatch(eventCopy, function () {
                    var ret = onListener.call(eventCopy.currentTarget, eventCopy);
                    if (ret === false) {
                        eventCopy.preventDefault();
                    }
                });
            }
            var options = listenerObj.options;
            var once = options.once,
                passive = options.passive,
                capture = options.capture;


            _evCfg._passive = passive;

            if (capture && eventCopy.target !== eventCopy.currentTarget && eventCopy.eventPhase === phases.CAPTURING_PHASE || eventCopy.eventPhase === phases.AT_TARGET || !capture && eventCopy.target !== eventCopy.currentTarget && eventCopy.eventPhase === phases.BUBBLING_PHASE) {
                var listener = listenerObj.listener;
                _this2.tryCatch(eventCopy, function () {
                    listener.call(eventCopy.currentTarget, eventCopy);
                });
                if (once) {
                    _this2.removeEventListener(type, listener, options);
                }
            }
        });
        this.tryCatch(eventCopy, function () {
            var onListener = checkOnListeners ? _this2['on' + type] : null;
            if (typeof onListener === 'function' && listenersByType.length < 2) {
                var ret = onListener.call(eventCopy.currentTarget, eventCopy); // Won't have executed if too short
                if (ret === false) {
                    eventCopy.preventDefault();
                }
            }
        });

        return !eventCopy.defaultPrevented;
    },
    tryCatch: function tryCatch(ev, cb) {
        try {
            // Per MDN: Exceptions thrown by event handlers are reported
            //    as uncaught exceptions; the event handlers run on a nested
            //    callstack: they block the caller until they complete, but
            //    exceptions do not propagate to the caller.
            cb();
        } catch (err) {
            this.triggerErrorEvent(err, ev);
        }
    },
    triggerErrorEvent: function triggerErrorEvent(err, ev) {
        var error = err;
        if (typeof err === 'string') {
            error = new Error('Uncaught exception: ' + err);
        }

        var triggerGlobalErrorEvent = void 0;
        var useNodeImpl = false;
        if (typeof window === 'undefined' || typeof ErrorEvent === 'undefined' || window && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && !window.dispatchEvent) {
            useNodeImpl = true;
            triggerGlobalErrorEvent = function triggerGlobalErrorEvent() {
                setTimeout(function () {
                    // Node won't be able to catch in this way if we throw in the main thread
                    // console.log(err); // Should we auto-log for user?
                    throw error; // Let user listen to `process.on('uncaughtException', (err) => {});`
                });
            };
        } else {
            triggerGlobalErrorEvent = function triggerGlobalErrorEvent() {
                // See https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
                //     and https://github.com/w3c/IndexedDB/issues/49

                // Note that a regular Event will properly trigger
                //     `window.addEventListener('error')` handlers, but it will not trigger
                //     `window.onerror` as per https://html.spec.whatwg.org/multipage/webappapis.html#handler-onerror
                // Note also that the following line won't handle `window.addEventListener` handlers
                //        if (window.onerror) window.onerror(error.message, err.fileName, err.lineNumber, error.columnNumber, error);

                // `ErrorEvent` properly triggers `window.onerror` and `window.addEventListener('error')` handlers
                var errEv = new ErrorEvent('error', {
                    error: err,
                    message: error.message || '',
                    // We can't get the actually useful user's values!
                    filename: error.fileName || '',
                    lineno: error.lineNumber || 0,
                    colno: error.columnNumber || 0
                });
                window.dispatchEvent(errEv);
                // console.log(err); // Should we auto-log for user?
            };
        }

        // Todo: This really should always run here but as we can't set the global
        //     `window` (e.g., using jsdom) since `setGlobalVars` becomes unable to
        //     shim `indexedDB` in such a case currently (apparently due to
        //     <https://github.com/axemclion/IndexedDBShim/issues/280>), we can't
        //     avoid the above Node implementation (which, while providing some
        //     fallback mechanism, is unstable)
        if (!useNodeImpl || !this._legacyOutputDidListenersThrowCheck) triggerGlobalErrorEvent();

        // See https://dom.spec.whatwg.org/#concept-event-listener-inner-invoke and
        //    https://github.com/w3c/IndexedDB/issues/140 (also https://github.com/w3c/IndexedDB/issues/49 )
        if (this._legacyOutputDidListenersThrowCheck) {
            ev.__legacyOutputDidListenersThrowError = error;
        }
    }
});
EventTarget.prototype[Symbol.toStringTag] = 'EventTargetPrototype';

Object.defineProperty(EventTarget, 'prototype', {
    writable: false
});

var ShimEventTarget = EventTarget;
var EventTargetFactory = {
    createInstance: function createInstance(customOptions) {
        function EventTarget() {
            this.__setOptions(customOptions);
        }
        EventTarget.prototype = ShimEventTarget.prototype;
        return new EventTarget();
    }
};

EventTarget.ShimEvent = ShimEvent;
EventTarget.ShimCustomEvent = ShimCustomEvent;
EventTarget.ShimDOMException = exports.ShimDOMException;
EventTarget.ShimEventTarget = EventTarget;
EventTarget.EventTargetFactory = EventTargetFactory;

exports.EventTargetFactory = EventTargetFactory;
exports.ShimEventTarget = EventTarget;
exports.ShimEvent = ShimEvent;
exports.ShimCustomEvent = ShimCustomEvent;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],3:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
// Since [immediate](https://github.com/calvinmetcalf/immediate) is
//   not doing the trick for our WebSQL transactions (at least in Node),
//   we are forced to make the promises run fully synchronously.

function isPromise(p) {
  return p && typeof p.then === 'function';
}
function addReject(prom, reject) {
  prom.then(null, reject) // Use this style for sake of non-Promise thenables (e.g., jQuery Deferred)
}

// States
var PENDING = 2,
    FULFILLED = 0, // We later abuse these as array indices
    REJECTED = 1;

function SyncPromise(fn) {
  var self = this;
  self.v = 0; // Value, this will be set to either a resolved value or rejected reason
  self.s = PENDING; // State of the promise
  self.c = [[],[]]; // Callbacks c[0] is fulfillment and c[1] contains rejection callbacks
  function transist(val, state) {
    self.v = val;
    self.s = state;
    self.c[state].forEach(function(fn) { fn(val); });
    // Release memory, but if no handlers have been added, as we
    //   assume that we will resolve/reject (truly) synchronously
    //   and thus we avoid flagging checks about whether we've
    //   already resolved/rejected.
    if (self.c[state].length) self.c = null;
  }
  function resolve(val) {
    if (!self.c) {
      // Already resolved (or will be resolved), do nothing.
    } else if (isPromise(val)) {
      addReject(val.then(resolve), reject);
    } else {
      transist(val, FULFILLED);
    }
  }
  function reject(reason) {
    if (!self.c) {
      // Already resolved (or will be resolved), do nothing.
    } else if (isPromise(reason)) {
      addReject(reason.then(reject), reject);
    } else {
      transist(reason, REJECTED);
    }
  }
  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

var prot = SyncPromise.prototype;

prot.then = function(cb, errBack) {
  var self = this;
  return new SyncPromise(function(resolve, reject) {
    var rej = typeof errBack === 'function' ? errBack : reject;
    function settle() {
      try {
        resolve(cb ? cb(self.v) : self.v);
      } catch(e) {
        rej(e);
      }
    }
    if (self.s === FULFILLED) {
      settle();
    } else if (self.s === REJECTED) {
      rej(self.v);
    } else {
      self.c[FULFILLED].push(settle);
      self.c[REJECTED].push(rej);
    }
  });
};

prot.catch = function(cb) {
  var self = this;
  return new SyncPromise(function(resolve, reject) {
    function settle() {
      try {
        resolve(cb(self.v));
      } catch(e) {
        reject(e);
      }
    }
    if (self.s === REJECTED) {
      settle();
    } else if (self.s === FULFILLED) {
      resolve(self.v);
    } else {
      self.c[REJECTED].push(settle);
      self.c[FULFILLED].push(resolve);
    }
  });
};

SyncPromise.all = function(promises) {
  return new SyncPromise(function(resolve, reject, l) {
    l = promises.length;
    var hasPromises = false;
    var newPromises = [];
    if (!l) {
        resolve(newPromises);
        return;
    }
    promises.forEach(function(p, i) {
      if (isPromise(p)) {
        addReject(p.then(function(res) {
          newPromises[i] = res;
          --l || resolve(newPromises);
        }), reject);
      } else {
        newPromises[i] = p;
        --l || resolve(promises);
      }
    });
  });
};

SyncPromise.race = function(promises) {
  var resolved = false;
  return new SyncPromise(function(resolve, reject) {
    promises.some(function(p, i) {
      if (isPromise(p)) {
        addReject(p.then(function(res) {
          if (resolved) {
            return;
          }
          resolve(res);
          resolved = true;
        }), reject);
      } else {
        resolve(p);
        resolved = true;
        return true;
      }
    });
  });
};

SyncPromise.resolve = function(val) {
  return new SyncPromise(function(resolve, reject) {
    resolve(val);
  });
};

SyncPromise.reject = function(val) {
  return new SyncPromise(function(resolve, reject) {
    reject(val);
  });
};
module.exports = SyncPromise;

},{}],6:[function(require,module,exports){
(function (global){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.Typeson=e.Typeson||{},e.Typeson.presets=e.Typeson.presets||{},e.Typeson.presets.structuredCloningThrowing=t())}(this,function(){"use strict";function isThenable(e,t){return Typeson.isObject(e)&&"function"==typeof e.then&&(!t||"function"==typeof e.catch)}function toStringTag(e){return o.call(e).slice(8,-1)}function hasConstructorOf(t,n){if(!t||"object"!==(void 0===t?"undefined":e(t)))return!1;var r=s(t);if(!r)return!1;var i=a.call(r,"constructor")&&r.constructor;return"function"!=typeof i?null===n:"function"==typeof i&&null!==n&&c.call(i)===c.call(n)}function isPlainObject(e){if(!e||"Object"!==toStringTag(e))return!1;return!s(e)||hasConstructorOf(e,Object)}function isUserObject(e){if(!e||"Object"!==toStringTag(e))return!1;var t=s(e);return!t||(hasConstructorOf(e,Object)||isUserObject(t))}function isObject(t){return t&&"object"===(void 0===t?"undefined":e(t))}function Typeson(o){var s=[],a=[],c={},u=this.types={},f=this.stringify=function(e,t,n,r){r=Object.assign({},o,r,{stringification:!0});var s=l(e,null,r);return i(s)?JSON.stringify(s[0],t,n):s.then(function(e){return JSON.stringify(e,t,n)})};this.stringifySync=function(e,t,n,r){return f(e,t,n,Object.assign({},{throwOnBadSyncType:!0},r,{sync:!0}))},this.stringifyAsync=function(e,t,n,r){return f(e,t,n,Object.assign({},{throwOnBadSyncType:!0},r,{sync:!1}))};var p=this.parse=function(e,t,n){return n=Object.assign({},o,n,{parse:!0}),y(JSON.parse(e,t),n)};this.parseSync=function(e,t,n){return p(e,t,Object.assign({},{throwOnBadSyncType:!0},n,{sync:!0}))},this.parseAsync=function(e,t,n){return p(e,t,Object.assign({},{throwOnBadSyncType:!0},n,{sync:!1}))},this.specialTypeNames=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.returnTypeNames=!0,this.encapsulate(e,t,n)},this.rootTypeName=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.iterateNone=!0,this.encapsulate(e,t,n)};var l=this.encapsulate=function(u,f,p){function finish(e){var t=Object.values(y);if(p.iterateNone)return t.length?t[0]:Typeson.getJSONType(e);if(t.length){if(p.returnTypeNames)return[].concat(n(new Set(t)));e&&isPlainObject(e)&&!e.hasOwnProperty("$types")?e.$types=y:e={$:e,$types:{$:y}}}else isObject(e)&&e.hasOwnProperty("$types")&&(e={$:e,$types:!0});return!p.returnTypeNames&&e}function checkPromises(e,n){return Promise.all(n.map(function(e){return e[1].p})).then(function(r){return Promise.all(r.map(function(r){var i=[],o=n.splice(0,1)[0],s=t(o,7),a=s[0],c=s[2],u=s[3],f=s[4],p=s[5],l=s[6],y=_encapsulate(a,r,c,u,i,!0,l),v=hasConstructorOf(y,TypesonPromise);return a&&v?y.p.then(function(t){return f[p]=t,checkPromises(e,i)}):(a?f[p]=y:e=v?y.p:y,checkPromises(e,i))}))}).then(function(){return e})}function _encapsulate(t,n,o,a,c,u,f){var l=void 0,h={},g=void 0===n?"undefined":e(n),b=m?function(e){var r=f||a.type||Typeson.getJSONType(n);m(Object.assign(e||h,{keypath:t,value:n,cyclic:o,stateObj:a,promisesData:c,resolvingTypesonPromise:u,awaitingTypesonPromise:hasConstructorOf(n,TypesonPromise)},void 0!==r?{type:r}:{}))}:null;if(g in{string:1,boolean:1,number:1,undefined:1})return void 0===n||"number"===g&&(isNaN(n)||n===-1/0||n===1/0)?(l=replace(t,n,a,c,!1,u,b))!==n&&(h={replaced:l}):l=n,b&&b(),l;if(null===n)return b&&b(),n;if(o&&!a.iterateIn&&!a.iterateUnsetNumeric){var T=v.indexOf(n);if(!(T<0))return y[t]="#",b&&b({cyclicKeypath:d[T]}),"#"+d[T];!0===o&&(v.push(n),d.push(t))}var O=isPlainObject(n),w=i(n),S=(O||w)&&(!s.length||a.replaced)||a.iterateIn?n:replace(t,n,a,c,O||w,null,b),P=void 0;if(S!==n?(l=S,h={replaced:S}):w||"array"===a.iterateIn?(P=new Array(n.length),h={clone:P}):O||"object"===a.iterateIn?h={clone:P={}}:""===t&&hasConstructorOf(n,TypesonPromise)?(c.push([t,n,o,a,void 0,void 0,a.type]),l=n):l=n,b&&b(),p.iterateNone)return P||l;if(!P)return l;if(a.iterateIn){for(var j in n){var A={ownKeys:n.hasOwnProperty(j)},C=t+(t?".":"")+escapeKeyPathComponent(j),N=_encapsulate(C,n[j],!!o,A,c,u);hasConstructorOf(N,TypesonPromise)?c.push([C,N,!!o,A,P,j,A.type]):void 0!==N&&(P[j]=N)}b&&b({endIterateIn:!0,end:!0})}else r(n).forEach(function(e){var r=t+(t?".":"")+escapeKeyPathComponent(e),i={ownKeys:!0},s=_encapsulate(r,n[e],!!o,i,c,u);hasConstructorOf(s,TypesonPromise)?c.push([r,s,!!o,i,P,e,i.type]):void 0!==s&&(P[e]=s)}),b&&b({endIterateOwn:!0,end:!0});if(a.iterateUnsetNumeric){for(var B=n.length,E=0;E<B;E++)if(!(E in n)){var I=t+(t?".":"")+E,U={ownKeys:!1},K=_encapsulate(I,void 0,!!o,U,c,u);hasConstructorOf(K,TypesonPromise)?c.push([I,K,!!o,U,P,E,U.type]):void 0!==K&&(P[E]=K)}b&&b({endIterateUnsetNumeric:!0,end:!0})}return P}function replace(e,t,n,r,i,o,u){for(var f=i?s:a,p=f.length;p--;){var v=f[p];if(v.test(t,n)){var d=v.type;if(c[d]){var h=y[e];y[e]=h?[d].concat(h):d}if(n=Object.assign(n,{type:d,replaced:!0}),(l||!v.replaceAsync)&&!v.replace)return u&&u({typeDetected:!0}),_encapsulate(e,t,g&&"readonly",n,r,o,d);u&&u({replacing:!0});return _encapsulate(e,v[l||!v.replaceAsync?"replace":"replaceAsync"](t,n),g&&"readonly",n,r,o,d)}}return t}var l=(p=Object.assign({sync:!0},o,p)).sync,y={},v=[],d=[],h=[],g=!(p&&"cyclic"in p)||p.cyclic,m=p.encapsulateObserver,b=_encapsulate("",u,g,f||{},h);return h.length?l&&p.throwOnBadSyncType?function(){throw new TypeError("Sync method requested but async result obtained")}():Promise.resolve(checkPromises(b,h)).then(finish):!l&&p.throwOnBadSyncType?function(){throw new TypeError("Async method requested but sync result obtained")}():p.stringification&&l?[finish(b)]:l?finish(b):Promise.resolve(finish(b))};this.encapsulateSync=function(e,t,n){return l(e,t,Object.assign({},{throwOnBadSyncType:!0},n,{sync:!0}))},this.encapsulateAsync=function(e,t,n){return l(e,t,Object.assign({},{throwOnBadSyncType:!0},n,{sync:!1}))};var y=this.revive=function(e,n){function _revive(e,n,o,s,p,l){if(!u||"$types"!==e){var y=a[e];if(i(n)||isPlainObject(n)){var v=i(n)?new Array(n.length):{};for(r(n).forEach(function(t){var r=_revive(e+(e?".":"")+escapeKeyPathComponent(t),n[t],o||v,s,v,t);hasConstructorOf(r,Undefined)?v[t]=void 0:void 0!==r&&(v[t]=r)}),n=v;f.length;){var d=t(f[0],4),h=d[0],g=d[1],m=d[2],b=d[3],T=getByKeyPath(h,g);if(hasConstructorOf(T,Undefined))m[b]=void 0;else{if(void 0===T)break;m[b]=T}f.splice(0,1)}}if(!y)return n;if("#"===y){var O=getByKeyPath(o,n.substr(1));return void 0===O&&f.push([o,n.substr(1),p,l]),O}var w=s.sync;return[].concat(y).reduce(function(e,t){var n=c[t];if(!n)throw new Error("Unregistered type: "+t);return n[w&&n.revive?"revive":!w&&n.reviveAsync?"reviveAsync":"revive"](e)},n)}}var s=(n=Object.assign({sync:!0},o,n)).sync,a=e&&e.$types,u=!0;if(!a)return e;if(!0===a)return e.$;a.$&&isPlainObject(a.$)&&(e=e.$,a=a.$,u=!1);var f=[],p=_revive("",e,null,n);return p=hasConstructorOf(p,Undefined)?void 0:p,isThenable(p)?s&&n.throwOnBadSyncType?function(){throw new TypeError("Sync method requested but async result obtained")}():p:!s&&n.throwOnBadSyncType?function(){throw new TypeError("Async method requested but sync result obtained")}():s?p:Promise.resolve(p)};this.reviveSync=function(e,t){return y(e,Object.assign({},{throwOnBadSyncType:!0},t,{sync:!0}))},this.reviveAsync=function(e,t){return y(e,Object.assign({},{throwOnBadSyncType:!0},t,{sync:!1}))},this.register=function(e,t){return t=t||{},[].concat(e).forEach(function R(e){if(i(e))return e.map(R);e&&r(e).forEach(function(n){if("#"===n)throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");if(Typeson.JSON_TYPES.includes(n))throw new TypeError("Plain JSON object types are reserved as type names");var r=e[n],o=r.testPlainObjects?s:a,f=o.filter(function(e){return e.type===n});if(f.length&&(o.splice(o.indexOf(f[0]),1),delete c[n],delete u[n]),r){if("function"==typeof r){var p=r;r={test:function test(e){return e&&e.constructor===p},replace:function replace(e){return assign({},e)},revive:function revive(e){return assign(Object.create(p.prototype),e)}}}else i(r)&&(r={test:r[0],replace:r[1],revive:r[2]});var l={type:n,test:r.test.bind(r)};r.replace&&(l.replace=r.replace.bind(r)),r.replaceAsync&&(l.replaceAsync=r.replaceAsync.bind(r));var y="number"==typeof t.fallback?t.fallback:t.fallback?0:1/0;if(r.testPlainObjects?s.splice(y,0,l):a.splice(y,0,l),r.revive||r.reviveAsync){var v={};r.revive&&(v.revive=r.revive.bind(r)),r.reviveAsync&&(v.reviveAsync=r.reviveAsync.bind(r)),c[n]=v}u[n]=r}})}),this}}function assign(e,t){return r(t).map(function(n){e[n]=t[n]}),e}function escapeKeyPathComponent(e){return e.replace(/~/g,"~0").replace(/\./g,"~1")}function unescapeKeyPathComponent(e){return e.replace(/~1/g,".").replace(/~0/g,"~")}function getByKeyPath(e,t){if(""===t)return e;var n=t.indexOf(".");if(n>-1){var r=e[unescapeKeyPathComponent(t.substr(0,n))];return void 0===r?void 0:getByKeyPath(r,t.substr(n+1))}return e[unescapeKeyPathComponent(t)]}function Undefined(){}function TypesonPromise(e){this.p=new Promise(e)}var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&a.return&&a.return()}finally{if(i)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},r=Object.keys,i=Array.isArray,o={}.toString,s=Object.getPrototypeOf,a={}.hasOwnProperty,c=a.toString;TypesonPromise.prototype.then=function(e,t){var n=this;return new TypesonPromise(function(r,i){n.p.then(function(t){r(e?e(t):t)},function(e){n.p.catch(function(e){return t?t(e):Promise.reject(e)}).then(r,i)})})},TypesonPromise.prototype.catch=function(e){return this.then(null,e)},TypesonPromise.resolve=function(e){return new TypesonPromise(function(t){t(e)})},TypesonPromise.reject=function(e){return new TypesonPromise(function(t,n){n(e)})},["all","race"].map(function(e){TypesonPromise[e]=function(t){return new TypesonPromise(function(n,r){Promise[e](t.map(function(e){return e.p})).then(n,r)})}}),Typeson.Undefined=Undefined,Typeson.Promise=TypesonPromise,Typeson.isThenable=isThenable,Typeson.toStringTag=toStringTag,Typeson.hasConstructorOf=hasConstructorOf,Typeson.isObject=isObject,Typeson.isPlainObject=isPlainObject,Typeson.isUserObject=isUserObject,Typeson.escapeKeyPathComponent=escapeKeyPathComponent,Typeson.unescapeKeyPathComponent=unescapeKeyPathComponent,Typeson.getByKeyPath=getByKeyPath,Typeson.getJSONType=function(t){return null===t?"null":i(t)?"array":void 0===t?"undefined":e(t)},Typeson.JSON_TYPES=["null","boolean","number","string","array","object"];for(var u={userObject:{test:function test(e,t){return Typeson.isUserObject(e)},replace:function replace(e){return Object.assign({},e)},revive:function revive(e){return e}}},f=[[{sparseArrays:{testPlainObjects:!0,test:function test(e){return Array.isArray(e)},replace:function replace(e,t){return t.iterateUnsetNumeric=!0,e}}},{sparseUndefined:{test:function test(e,t){return void 0===e&&!1===t.ownKeys},replace:function replace(e){return null},revive:function revive(e){}}}],{undef:{test:function test(e,t){return void 0===e&&(t.ownKeys||!("ownKeys"in t))},replace:function replace(e){return null},revive:function revive(e){return new Typeson.Undefined}}}],p={StringObject:{test:function test(t){return"String"===Typeson.toStringTag(t)&&"object"===(void 0===t?"undefined":e(t))},replace:function replace(e){return String(e)},revive:function revive(e){return new String(e)}},BooleanObject:{test:function test(t){return"Boolean"===Typeson.toStringTag(t)&&"object"===(void 0===t?"undefined":e(t))},replace:function replace(e){return Boolean(e)},revive:function revive(e){return new Boolean(e)}},NumberObject:{test:function test(t){return"Number"===Typeson.toStringTag(t)&&"object"===(void 0===t?"undefined":e(t))},replace:function replace(e){return Number(e)},revive:function revive(e){return new Number(e)}}},l=[{nan:{test:function test(e){return"number"==typeof e&&isNaN(e)},replace:function replace(e){return"NaN"},revive:function revive(e){return NaN}}},{infinity:{test:function test(e){return e===1/0},replace:function replace(e){return"Infinity"},revive:function revive(e){return 1/0}}},{negativeInfinity:{test:function test(e){return e===-1/0},replace:function replace(e){return"-Infinity"},revive:function revive(e){return-1/0}}}],y={date:{test:function test(e){return"Date"===Typeson.toStringTag(e)},replace:function replace(e){var t=e.getTime();return isNaN(t)?"NaN":t},revive:function revive(e){return"NaN"===e?new Date(NaN):new Date(e)}}},v={regexp:{test:function test(e){return"RegExp"===Typeson.toStringTag(e)},replace:function replace(e){return{source:e.source,flags:(e.global?"g":"")+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.sticky?"y":"")+(e.unicode?"u":"")}},revive:function revive(e){var t=e.source,n=e.flags;return new RegExp(t,n)}}},d={map:{test:function test(e){return"Map"===Typeson.toStringTag(e)},replace:function replace(e){return Array.from(e.entries())},revive:function revive(e){return new Map(e)}}},h={set:{test:function test(e){return"Set"===Typeson.toStringTag(e)},replace:function replace(e){return Array.from(e.values())},revive:function revive(e){return new Set(e)}}},g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",m=new Uint8Array(256),b=0;b<g.length;b++)m[g.charCodeAt(b)]=b;var T=function encode(e,t,n){for(var r=new Uint8Array(e,t,n),i=r.length,o="",s=0;s<i;s+=3)o+=g[r[s]>>2],o+=g[(3&r[s])<<4|r[s+1]>>4],o+=g[(15&r[s+1])<<2|r[s+2]>>6],o+=g[63&r[s+2]];return i%3==2?o=o.substring(0,o.length-1)+"=":i%3==1&&(o=o.substring(0,o.length-2)+"=="),o},O=function decode(e){var t=e.length,n=.75*e.length,r=0,i=void 0,o=void 0,s=void 0,a=void 0;"="===e[e.length-1]&&(n--,"="===e[e.length-2]&&n--);for(var c=new ArrayBuffer(n),u=new Uint8Array(c),f=0;f<t;f+=4)i=m[e.charCodeAt(f)],o=m[e.charCodeAt(f+1)],s=m[e.charCodeAt(f+2)],a=m[e.charCodeAt(f+3)],u[r++]=i<<2|o>>4,u[r++]=(15&o)<<4|s>>2,u[r++]=(3&s)<<6|63&a;return c},w={arraybuffer:{test:function test(e){return"ArrayBuffer"===Typeson.toStringTag(e)},replace:function replace(e){return T(e)},revive:function revive(e){return O(e)}}},S="undefined"==typeof self?global:self,P={};["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"].forEach(function(e){var t=e,n=S[t];n&&(P[e.toLowerCase()]={test:function test(e){return Typeson.toStringTag(e)===t},replace:function replace(e){return T(e.buffer,e.byteOffset,e.byteLength)},revive:function revive(e){return new n(O(e))}})});var j={dataview:{test:function test(e){return"DataView"===Typeson.toStringTag(e)},replace:function replace(e){var t=e.buffer,n=e.byteOffset,r=e.byteLength;return{buffer:T(t),byteOffset:n,byteLength:r}},revive:function revive(e){var t=e.buffer,n=e.byteOffset,r=e.byteLength;return new DataView(O(t),n,r)}}},A={IntlCollator:{test:function test(e){return Typeson.hasConstructorOf(e,Intl.Collator)},replace:function replace(e){return e.resolvedOptions()},revive:function revive(e){return new Intl.Collator(e.locale,e)}},IntlDateTimeFormat:{test:function test(e){return Typeson.hasConstructorOf(e,Intl.DateTimeFormat)},replace:function replace(e){return e.resolvedOptions()},revive:function revive(e){return new Intl.DateTimeFormat(e.locale,e)}},IntlNumberFormat:{test:function test(e){return Typeson.hasConstructorOf(e,Intl.NumberFormat)},replace:function replace(e){return e.resolvedOptions()},revive:function revive(e){return new Intl.NumberFormat(e.locale,e)}}},C={file:{test:function test(e){return"File"===Typeson.toStringTag(e)},replace:function replace(e){var t=new XMLHttpRequest;if(t.open("GET",URL.createObjectURL(e),!1),200!==t.status&&0!==t.status)throw new Error("Bad Blob access: "+t.status);return t.send(),{type:e.type,stringContents:t.responseText,name:e.name,lastModified:e.lastModified}},revive:function revive(e){var t=e.name,n=e.type,r=e.stringContents,i=e.lastModified;return new File([r],t,{type:n,lastModified:i})},replaceAsync:function replaceAsync(e){return new Typeson.Promise(function(t,n){if(e.isClosed)n(new Error("The File is closed"));else{var r=new FileReader;r.addEventListener("load",function(){t({type:e.type,stringContents:r.result,name:e.name,lastModified:e.lastModified})}),r.addEventListener("error",function(){n(r.error)}),r.readAsText(e)}})}}};return[u,f,p,l,y,v,{imagedata:{test:function test(e){return"ImageData"===Typeson.toStringTag(e)},replace:function replace(e){return{array:Array.from(e.data),width:e.width,height:e.height}},revive:function revive(e){return new ImageData(new Uint8ClampedArray(e.array),e.width,e.height)}}},{imagebitmap:{test:function test(e){return"ImageBitmap"===Typeson.toStringTag(e)||e&&e.dataset&&"ImageBitmap"===e.dataset.toStringTag},replace:function replace(e){var t=document.createElement("canvas");return t.getContext("2d").drawImage(e,0,0),t.toDataURL()},revive:function revive(e){var t=document.createElement("canvas"),n=t.getContext("2d"),r=document.createElement("img");return r.onload=function(){n.drawImage(r,0,0)},r.src=e,t},reviveAsync:function reviveAsync(e){var t=document.createElement("canvas"),n=t.getContext("2d"),r=document.createElement("img");return r.onload=function(){n.drawImage(r,0,0)},r.src=e,createImageBitmap(t)}}},C,{file:C.file,filelist:{test:function test(e){return"FileList"===Typeson.toStringTag(e)},replace:function replace(e){for(var t=[],n=0;n<e.length;n++)t[n]=e.item(n);return t},revive:function revive(e){function FileList(){this._files=arguments[0],this.length=this._files.length}return FileList.prototype.item=function(e){return this._files[e]},FileList.prototype[Symbol.toStringTag]="FileList",new FileList(e)}}},{blob:{test:function test(e){return"Blob"===Typeson.toStringTag(e)},replace:function replace(e){var t=new XMLHttpRequest;if(t.open("GET",URL.createObjectURL(e),!1),200!==t.status&&0!==t.status)throw new Error("Bad Blob access: "+t.status);return t.send(),{type:e.type,stringContents:t.responseText}},revive:function revive(e){var t=e.type,n=e.stringContents;return new Blob([n],{type:t})},replaceAsync:function replaceAsync(e){return new Typeson.Promise(function(t,n){if(e.isClosed)n(new Error("The Blob is closed"));else{var r=new FileReader;r.addEventListener("load",function(){t({type:e.type,stringContents:r.result})}),r.addEventListener("error",function(){n(r.error)}),r.readAsText(e)}})}}}].concat("function"==typeof Map?d:[],"function"==typeof Set?h:[],"function"==typeof ArrayBuffer?w:[],"function"==typeof Uint8Array?P:[],"function"==typeof DataView?j:[],"undefined"!=typeof Intl?A:[]).concat({checkDataCloneException:[function(t){var n={}.toString.call(t).slice(8,-1);if(["symbol","function"].includes(void 0===t?"undefined":e(t))||["Arguments","Module","Error","Promise","WeakMap","WeakSet"].includes(n)||t===Object.prototype||("Blob"===n||"File"===n)&&t.isClosed||t&&"object"===(void 0===t?"undefined":e(t))&&"number"==typeof t.nodeType&&"function"==typeof t.insertBefore)throw new DOMException("The object cannot be cloned.","DataCloneError");return!1}]})});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.Typeson=n()}(this,function(){"use strict";function isThenable(e,n){return Typeson.isObject(e)&&"function"==typeof e.then&&(!n||"function"==typeof e.catch)}function toStringTag(e){return o.call(e).slice(8,-1)}function hasConstructorOf(n,t){if(!n||"object"!==(void 0===n?"undefined":e(n)))return!1;var r=s(n);if(!r)return!1;var i=c.call(r,"constructor")&&r.constructor;return"function"!=typeof i?null===t:"function"==typeof i&&null!==t&&a.call(i)===a.call(t)}function isPlainObject(e){if(!e||"Object"!==toStringTag(e))return!1;return!s(e)||hasConstructorOf(e,Object)}function isUserObject(e){if(!e||"Object"!==toStringTag(e))return!1;var n=s(e);return!n||(hasConstructorOf(e,Object)||isUserObject(n))}function isObject(n){return n&&"object"===(void 0===n?"undefined":e(n))}function Typeson(o){var s=[],c=[],a={},u=this.types={},y=this.stringify=function(e,n,t,r){r=Object.assign({},o,r,{stringification:!0});var s=f(e,null,r);return i(s)?JSON.stringify(s[0],n,t):s.then(function(e){return JSON.stringify(e,n,t)})};this.stringifySync=function(e,n,t,r){return y(e,n,t,Object.assign({},{throwOnBadSyncType:!0},r,{sync:!0}))},this.stringifyAsync=function(e,n,t,r){return y(e,n,t,Object.assign({},{throwOnBadSyncType:!0},r,{sync:!1}))};var p=this.parse=function(e,n,t){return t=Object.assign({},o,t,{parse:!0}),l(JSON.parse(e,n),t)};this.parseSync=function(e,n,t){return p(e,n,Object.assign({},{throwOnBadSyncType:!0},t,{sync:!0}))},this.parseAsync=function(e,n,t){return p(e,n,Object.assign({},{throwOnBadSyncType:!0},t,{sync:!1}))},this.specialTypeNames=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.returnTypeNames=!0,this.encapsulate(e,n,t)},this.rootTypeName=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.iterateNone=!0,this.encapsulate(e,n,t)};var f=this.encapsulate=function(u,y,p){function finish(e){var n=Object.values(l);if(p.iterateNone)return n.length?n[0]:Typeson.getJSONType(e);if(n.length){if(p.returnTypeNames)return[].concat(t(new Set(n)));e&&isPlainObject(e)&&!e.hasOwnProperty("$types")?e.$types=l:e={$:e,$types:{$:l}}}else isObject(e)&&e.hasOwnProperty("$types")&&(e={$:e,$types:!0});return!p.returnTypeNames&&e}function checkPromises(e,t){return Promise.all(t.map(function(e){return e[1].p})).then(function(r){return Promise.all(r.map(function(r){var i=[],o=t.splice(0,1)[0],s=n(o,7),c=s[0],a=s[2],u=s[3],y=s[4],p=s[5],f=s[6],l=_encapsulate(c,r,a,u,i,!0,f),h=hasConstructorOf(l,TypesonPromise);return c&&h?l.p.then(function(n){return y[p]=n,checkPromises(e,i)}):(c?y[p]=l:e=h?l.p:l,checkPromises(e,i))}))}).then(function(){return e})}function _encapsulate(n,t,o,c,a,u,y){var f=void 0,d={},b=void 0===t?"undefined":e(t),m=O?function(e){var r=y||c.type||Typeson.getJSONType(t);O(Object.assign(e||d,{keypath:n,value:t,cyclic:o,stateObj:c,promisesData:a,resolvingTypesonPromise:u,awaitingTypesonPromise:hasConstructorOf(t,TypesonPromise)},void 0!==r?{type:r}:{}))}:null;if(b in{string:1,boolean:1,number:1,undefined:1})return void 0===t||"number"===b&&(isNaN(t)||t===-1/0||t===1/0)?(f=replace(n,t,c,a,!1,u,m))!==t&&(d={replaced:f}):f=t,m&&m(),f;if(null===t)return m&&m(),t;if(o&&!c.iterateIn&&!c.iterateUnsetNumeric){var T=h.indexOf(t);if(!(T<0))return l[n]="#",m&&m({cyclicKeypath:v[T]}),"#"+v[T];!0===o&&(h.push(t),v.push(n))}var g=isPlainObject(t),P=i(t),j=(g||P)&&(!s.length||c.replaced)||c.iterateIn?t:replace(n,t,c,a,g||P,null,m),w=void 0;if(j!==t?(f=j,d={replaced:j}):P||"array"===c.iterateIn?(w=new Array(t.length),d={clone:w}):g||"object"===c.iterateIn?d={clone:w={}}:""===n&&hasConstructorOf(t,TypesonPromise)?(a.push([n,t,o,c,void 0,void 0,c.type]),f=t):f=t,m&&m(),p.iterateNone)return w||f;if(!w)return f;if(c.iterateIn){for(var S in t){var A={ownKeys:t.hasOwnProperty(S)},C=n+(n?".":"")+escapeKeyPathComponent(S),N=_encapsulate(C,t[S],!!o,A,a,u);hasConstructorOf(N,TypesonPromise)?a.push([C,N,!!o,A,w,S,A.type]):void 0!==N&&(w[S]=N)}m&&m({endIterateIn:!0,end:!0})}else r(t).forEach(function(e){var r=n+(n?".":"")+escapeKeyPathComponent(e),i={ownKeys:!0},s=_encapsulate(r,t[e],!!o,i,a,u);hasConstructorOf(s,TypesonPromise)?a.push([r,s,!!o,i,w,e,i.type]):void 0!==s&&(w[e]=s)}),m&&m({endIterateOwn:!0,end:!0});if(c.iterateUnsetNumeric){for(var K=t.length,B=0;B<K;B++)if(!(B in t)){var $=n+(n?".":"")+B,E={ownKeys:!1},U=_encapsulate($,void 0,!!o,E,a,u);hasConstructorOf(U,TypesonPromise)?a.push([$,U,!!o,E,w,B,E.type]):void 0!==U&&(w[B]=U)}m&&m({endIterateUnsetNumeric:!0,end:!0})}return w}function replace(e,n,t,r,i,o,u){for(var y=i?s:c,p=y.length;p--;){var h=y[p];if(h.test(n,t)){var v=h.type;if(a[v]){var d=l[e];l[e]=d?[v].concat(d):v}if(t=Object.assign(t,{type:v,replaced:!0}),(f||!h.replaceAsync)&&!h.replace)return u&&u({typeDetected:!0}),_encapsulate(e,n,b&&"readonly",t,r,o,v);u&&u({replacing:!0});return _encapsulate(e,h[f||!h.replaceAsync?"replace":"replaceAsync"](n,t),b&&"readonly",t,r,o,v)}}return n}var f=(p=Object.assign({sync:!0},o,p)).sync,l={},h=[],v=[],d=[],b=!(p&&"cyclic"in p)||p.cyclic,O=p.encapsulateObserver,m=_encapsulate("",u,b,y||{},d);return d.length?f&&p.throwOnBadSyncType?function(){throw new TypeError("Sync method requested but async result obtained")}():Promise.resolve(checkPromises(m,d)).then(finish):!f&&p.throwOnBadSyncType?function(){throw new TypeError("Async method requested but sync result obtained")}():p.stringification&&f?[finish(m)]:f?finish(m):Promise.resolve(finish(m))};this.encapsulateSync=function(e,n,t){return f(e,n,Object.assign({},{throwOnBadSyncType:!0},t,{sync:!0}))},this.encapsulateAsync=function(e,n,t){return f(e,n,Object.assign({},{throwOnBadSyncType:!0},t,{sync:!1}))};var l=this.revive=function(e,t){function _revive(e,t,o,s,p,f){if(!u||"$types"!==e){var l=c[e];if(i(t)||isPlainObject(t)){var h=i(t)?new Array(t.length):{};for(r(t).forEach(function(n){var r=_revive(e+(e?".":"")+escapeKeyPathComponent(n),t[n],o||h,s,h,n);hasConstructorOf(r,Undefined)?h[n]=void 0:void 0!==r&&(h[n]=r)}),t=h;y.length;){var v=n(y[0],4),d=v[0],b=v[1],O=v[2],m=v[3],T=getByKeyPath(d,b);if(hasConstructorOf(T,Undefined))O[m]=void 0;else{if(void 0===T)break;O[m]=T}y.splice(0,1)}}if(!l)return t;if("#"===l){var g=getByKeyPath(o,t.substr(1));return void 0===g&&y.push([o,t.substr(1),p,f]),g}var P=s.sync;return[].concat(l).reduce(function(e,n){var t=a[n];if(!t)throw new Error("Unregistered type: "+n);return t[P&&t.revive?"revive":!P&&t.reviveAsync?"reviveAsync":"revive"](e)},t)}}var s=(t=Object.assign({sync:!0},o,t)).sync,c=e&&e.$types,u=!0;if(!c)return e;if(!0===c)return e.$;c.$&&isPlainObject(c.$)&&(e=e.$,c=c.$,u=!1);var y=[],p=_revive("",e,null,t);return p=hasConstructorOf(p,Undefined)?void 0:p,isThenable(p)?s&&t.throwOnBadSyncType?function(){throw new TypeError("Sync method requested but async result obtained")}():p:!s&&t.throwOnBadSyncType?function(){throw new TypeError("Async method requested but sync result obtained")}():s?p:Promise.resolve(p)};this.reviveSync=function(e,n){return l(e,Object.assign({},{throwOnBadSyncType:!0},n,{sync:!0}))},this.reviveAsync=function(e,n){return l(e,Object.assign({},{throwOnBadSyncType:!0},n,{sync:!1}))},this.register=function(e,n){return n=n||{},[].concat(e).forEach(function R(e){if(i(e))return e.map(R);e&&r(e).forEach(function(t){if("#"===t)throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");if(Typeson.JSON_TYPES.includes(t))throw new TypeError("Plain JSON object types are reserved as type names");var r=e[t],o=r.testPlainObjects?s:c,y=o.filter(function(e){return e.type===t});if(y.length&&(o.splice(o.indexOf(y[0]),1),delete a[t],delete u[t]),r){if("function"==typeof r){var p=r;r={test:function test(e){return e&&e.constructor===p},replace:function replace(e){return assign({},e)},revive:function revive(e){return assign(Object.create(p.prototype),e)}}}else i(r)&&(r={test:r[0],replace:r[1],revive:r[2]});var f={type:t,test:r.test.bind(r)};r.replace&&(f.replace=r.replace.bind(r)),r.replaceAsync&&(f.replaceAsync=r.replaceAsync.bind(r));var l="number"==typeof n.fallback?n.fallback:n.fallback?0:1/0;if(r.testPlainObjects?s.splice(l,0,f):c.splice(l,0,f),r.revive||r.reviveAsync){var h={};r.revive&&(h.revive=r.revive.bind(r)),r.reviveAsync&&(h.reviveAsync=r.reviveAsync.bind(r)),a[t]=h}u[t]=r}})}),this}}function assign(e,n){return r(n).map(function(t){e[t]=n[t]}),e}function escapeKeyPathComponent(e){return e.replace(/~/g,"~0").replace(/\./g,"~1")}function unescapeKeyPathComponent(e){return e.replace(/~1/g,".").replace(/~0/g,"~")}function getByKeyPath(e,n){if(""===n)return e;var t=n.indexOf(".");if(t>-1){var r=e[unescapeKeyPathComponent(n.substr(0,t))];return void 0===r?void 0:getByKeyPath(r,n.substr(t+1))}return e[unescapeKeyPathComponent(n)]}function Undefined(){}function TypesonPromise(e){this.p=new Promise(e)}var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(){return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,n){var t=[],r=!0,i=!1,o=void 0;try{for(var s,c=e[Symbol.iterator]();!(r=(s=c.next()).done)&&(t.push(s.value),!n||t.length!==n);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(i)throw o}}return t}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),t=function(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)},r=Object.keys,i=Array.isArray,o={}.toString,s=Object.getPrototypeOf,c={}.hasOwnProperty,a=c.toString;return TypesonPromise.prototype.then=function(e,n){var t=this;return new TypesonPromise(function(r,i){t.p.then(function(n){r(e?e(n):n)},function(e){t.p.catch(function(e){return n?n(e):Promise.reject(e)}).then(r,i)})})},TypesonPromise.prototype.catch=function(e){return this.then(null,e)},TypesonPromise.resolve=function(e){return new TypesonPromise(function(n){n(e)})},TypesonPromise.reject=function(e){return new TypesonPromise(function(n,t){t(e)})},["all","race"].map(function(e){TypesonPromise[e]=function(n){return new TypesonPromise(function(t,r){Promise[e](n.map(function(e){return e.p})).then(t,r)})}}),Typeson.Undefined=Undefined,Typeson.Promise=TypesonPromise,Typeson.isThenable=isThenable,Typeson.toStringTag=toStringTag,Typeson.hasConstructorOf=hasConstructorOf,Typeson.isObject=isObject,Typeson.isPlainObject=isPlainObject,Typeson.isUserObject=isUserObject,Typeson.escapeKeyPathComponent=escapeKeyPathComponent,Typeson.unescapeKeyPathComponent=unescapeKeyPathComponent,Typeson.getByKeyPath=getByKeyPath,Typeson.getJSONType=function(n){return null===n?"null":i(n)?"array":void 0===n?"undefined":e(n)},Typeson.JSON_TYPES=["null","boolean","number","string","array","object"],Typeson});

},{}],8:[function(require,module,exports){
module.exports=/[\xC0-\xC5\xC7-\xCF\xD1-\xD6\xD9-\xDD\xE0-\xE5\xE7-\xEF\xF1-\xF6\xF9-\xFD\xFF-\u010F\u0112-\u0125\u0128-\u0130\u0134-\u0137\u0139-\u013E\u0143-\u0148\u014C-\u0151\u0154-\u0165\u0168-\u017E\u01A0\u01A1\u01AF\u01B0\u01CD-\u01DC\u01DE-\u01E3\u01E6-\u01F0\u01F4\u01F5\u01F8-\u021B\u021E\u021F\u0226-\u0233\u0344\u0385\u0386\u0388-\u038A\u038C\u038E-\u0390\u03AA-\u03B0\u03CA-\u03CE\u03D3\u03D4\u0400\u0401\u0403\u0407\u040C-\u040E\u0419\u0439\u0450\u0451\u0453\u0457\u045C-\u045E\u0476\u0477\u04C1\u04C2\u04D0-\u04D3\u04D6\u04D7\u04DA-\u04DF\u04E2-\u04E7\u04EA-\u04F5\u04F8\u04F9\u0622-\u0626\u06C0\u06C2\u06D3\u0929\u0931\u0934\u0958-\u095F\u09CB\u09CC\u09DC\u09DD\u09DF\u0A33\u0A36\u0A59-\u0A5B\u0A5E\u0B48\u0B4B\u0B4C\u0B5C\u0B5D\u0B94\u0BCA-\u0BCC\u0C48\u0CC0\u0CC7\u0CC8\u0CCA\u0CCB\u0D4A-\u0D4C\u0DDA\u0DDC-\u0DDE\u0F43\u0F4D\u0F52\u0F57\u0F5C\u0F69\u0F73\u0F75\u0F76\u0F78\u0F81\u0F93\u0F9D\u0FA2\u0FA7\u0FAC\u0FB9\u1026\u1B06\u1B08\u1B0A\u1B0C\u1B0E\u1B12\u1B3B\u1B3D\u1B40\u1B41\u1B43\u1E00-\u1E99\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FC1-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEE\u1FF2-\u1FF4\u1FF6-\u1FFC\u212B\u219A\u219B\u21AE\u21CD-\u21CF\u2204\u2209\u220C\u2224\u2226\u2241\u2244\u2247\u2249\u2260\u2262\u226D-\u2271\u2274\u2275\u2278\u2279\u2280\u2281\u2284\u2285\u2288\u2289\u22AC-\u22AF\u22E0-\u22E3\u22EA-\u22ED\u2ADC\u304C\u304E\u3050\u3052\u3054\u3056\u3058\u305A\u305C\u305E\u3060\u3062\u3065\u3067\u3069\u3070\u3071\u3073\u3074\u3076\u3077\u3079\u307A\u307C\u307D\u3094\u309E\u30AC\u30AE\u30B0\u30B2\u30B4\u30B6\u30B8\u30BA\u30BC\u30BE\u30C0\u30C2\u30C5\u30C7\u30C9\u30D0\u30D1\u30D3\u30D4\u30D6\u30D7\u30D9\u30DA\u30DC\u30DD\u30F4\u30F7-\u30FA\u30FE\uAC00-\uD7A3\uFB1D\uFB1F\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4E]|\uD804[\uDC9A\uDC9C\uDCAB\uDD2E\uDD2F\uDF4B\uDF4C]|\uD805[\uDCBB\uDCBC\uDCBE\uDDBA\uDDBB]|\uD834[\uDD5E-\uDD64\uDDBB-\uDDC0]/
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var map = {};
var CFG = {};

[
// Boolean for verbose reporting
'DEBUG', // Effectively defaults to false (ignored unless `true`)

'cacheDatabaseInstances', // Boolean (effectively defaults to true) on whether to cache WebSQL `openDatabase` instances

// Boolean on whether to auto-name databases (based on an auto-increment) when
//   the empty string is supplied; useful with `memoryDatabase`; defaults to `false`
//   which means the empty string will be used as the (valid) database name
'autoName',

// Determines whether the slow-performing `Object.setPrototypeOf` calls required
//    for full WebIDL compliance will be used. Probably only needed for testing
//    or environments where full introspection on class relationships is required;
//    see http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
'fullIDLSupport', // Effectively defaults to false (ignored unless `true`)

// Boolean on whether to perform origin checks in `IDBFactory` methods
'checkOrigin', // Effectively defaults to `true` (must be set to `false` to cancel checks)

// Used by `IDBCursor` continue methods for number of records to cache;
'cursorPreloadPackSize', //  Defaults to 100

// See optional API (`shimIndexedDB.__setUnicodeIdentifiers`);
//    or just use the Unicode builds which invoke this method
//    automatically using the large, fully spec-compliant, regular
//    expression strings of `src/UnicodeIdentifiers.js`)
'UnicodeIDStart', // In the non-Unicode builds, defaults to /[$A-Z_a-z]/
'UnicodeIDContinue', // In the non-Unicode builds, defaults to /[$0-9A-Z_a-z]/

// BROWSER-SPECIFIC CONFIG
'avoidAutoShim', // Where WebSQL is detected but where `indexedDB` is
//    missing or poor support is known (non-Chrome Android or
//    non-Safari iOS9), the shim will be auto-applied without
//   `shimIndexedDB.__useShim()`. Set this to `true` to avoid forcing
//    the shim for such cases.

// -----------SQL CONFIG----------
// Object (`window` in the browser) on which there may be an
//  `openDatabase` method (if any) for WebSQL. (The browser
//  throws if attempting to call `openDatabase` without the window
//  so this is why the config doesn't just allow the function.)
// Defaults to `window` or `self` in browser builds or
//  a singleton object with the `openDatabase` method set to
//  the "websql" package in Node.
'win',

// For internal `openDatabase` calls made by `IDBFactory` methods;
//  per the WebSQL spec, "User agents are expected to use the display name
//  and the estimated database size to optimize the user experience.
//  For example, a user agent could use the estimated size to suggest an
//  initial quota to the user. This allows a site that is aware that it
//  will try to use hundreds of megabytes to declare this upfront, instead
//  of the user agent prompting the user for permission to increase the
//  quota every five megabytes."
'DEFAULT_DB_SIZE', // Defaults to (4 * 1024 * 1024) or (25 * 1024 * 1024) in Safari
// Whether to create indexes on SQLite tables (and also whether to try dropping)
'useSQLiteIndexes', // Effectively defaults to `false` (ignored unless `true`)

// NODE-IMPINGING SETTINGS (created for sake of limitations in Node or desktop file
//    system implementation but applied by default in browser for parity)

// Used when setting global shims to determine whether to try to add
//   other globals shimmed by the library (`ShimDOMException`, `ShimDOMStringList`,
//   `ShimEvent`, `ShimCustomEvent`, `ShimEventTarget`)
'addNonIDBGlobals', // Effectively defaults to `false` (ignored unless `true`)
// Used when setting global shims to determine whether to try to overwrite
//   other globals shimmed by the library (`DOMException`, `DOMStringList`,
//   `Event`, `CustomEvent`, `EventTarget`)
'replaceNonIDBGlobals', // Effectively defaults to `false` (ignored unless `true`)

// Overcoming limitations with node-sqlite3/storing database name on file systems
// https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
// Defaults to prefixing database with `D_`, escaping
//   `databaseCharacterEscapeList`, escaping NUL, and
//   escaping upper case letters, as well as enforcing
//   `databaseNameLengthLimit`
'escapeDatabaseName', 'unescapeDatabaseName', // Not used internally; usable as a convenience method

// Defaults to global regex representing the following
//   (characters nevertheless commonly reserved in modern, Unicode-supporting
//   systems): 0x00-0x1F 0x7F " * / : < > ? \ |
'databaseCharacterEscapeList', 'databaseNameLengthLimit', // Defaults to 254 (shortest typical modern file length limit)

// Boolean defaulting to true on whether to escape NFD-escaping
//   characters to avoid clashes on MacOS which performs NFD on files
'escapeNFDForDatabaseNames',

// Boolean on whether to add the `.sqlite` extension to file names;
//   defaults to `true`
'addSQLiteExtension', ['memoryDatabase', function (val) {
    // Various types of in-memory databases that can auto-delete
    if (!/^(?::memory:|file::memory:(\?[^#]*)?(#.*)?)?$/.test(val)) {
        throw new TypeError('`memoryDatabase` must be the empty string, ":memory:", or a "file::memory:[?queryString][#hash] URL".');
    }
}],

// NODE-SPECIFIC CONFIG
// Boolean on whether to delete the database file itself after `deleteDatabase`;
//   defaults to `true` as the database will be empty
'deleteDatabaseFiles', 'databaseBasePath', 'sysDatabaseBasePath',

// NODE-SPECIFIC WEBSQL CONFIG
'sqlBusyTimeout', // Defaults to 1000
'sqlTrace', // Callback not used by default
'sqlProfile' // Callback not used by default
].forEach(function (prop) {
    var validator = void 0;
    if (Array.isArray(prop)) {
        validator = prop[1];
        prop = prop[0];
    }
    Object.defineProperty(CFG, prop, {
        get: function get() {
            return map[prop];
        },
        set: function set(val) {
            if (validator) {
                validator(val);
            }
            map[prop] = val;
        }
    });
});

exports.default = CFG;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webSQLErrback = exports.createDOMException = exports.ShimDOMException = exports.findError = exports.logError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* globals DOMException */


var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a native DOMException, for browsers that support it
 * @returns {DOMException}
 */
function createNativeDOMException(name, message) {
    return new DOMException.prototype.constructor(message, name || 'DOMException');
}

var codes = { // From web-platform-tests testharness.js name_code_map (though not in new spec)
    IndexSizeError: 1,
    HierarchyRequestError: 3,
    WrongDocumentError: 4,
    InvalidCharacterError: 5,
    NoModificationAllowedError: 7,
    NotFoundError: 8,
    NotSupportedError: 9,
    InUseAttributeError: 10,
    InvalidStateError: 11,
    SyntaxError: 12,
    InvalidModificationError: 13,
    NamespaceError: 14,
    InvalidAccessError: 15,
    TypeMismatchError: 17,
    SecurityError: 18,
    NetworkError: 19,
    AbortError: 20,
    URLMismatchError: 21,
    QuotaExceededError: 22,
    TimeoutError: 23,
    InvalidNodeTypeError: 24,
    DataCloneError: 25,

    EncodingError: 0,
    NotReadableError: 0,
    UnknownError: 0,
    ConstraintError: 0,
    DataError: 0,
    TransactionInactiveError: 0,
    ReadOnlyError: 0,
    VersionError: 0,
    OperationError: 0,
    NotAllowedError: 0
};

var legacyCodes = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
};

function createNonNativeDOMExceptionClass() {
    function DOMException(message, name) {
        // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
        this[Symbol.toStringTag] = 'DOMException';
        this._code = name in codes ? codes[name] : legacyCodes[name] || 0;
        this._name = name || 'Error';
        this._message = message === undefined ? '' : '' + message; // Not String() which converts Symbols
        Object.defineProperty(this, 'code', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: this._code
        });
        if (name !== undefined) {
            Object.defineProperty(this, 'name', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: this._name
            });
        }
        if (message !== undefined) {
            Object.defineProperty(this, 'message', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: this._message
            });
        }
    }

    // Necessary for W3C tests which complains if `DOMException` has properties on its "own" prototype

    // class DummyDOMException extends Error {}; // Sometimes causing problems in Node
    var DummyDOMException = function DOMException() {};
    DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing
    ['name', 'message'].forEach(function (prop) {
        Object.defineProperty(DummyDOMException.prototype, prop, {
            enumerable: true,
            get: function get() {
                if (!(this instanceof DOMException || this instanceof DummyDOMException || this instanceof Error)) {
                    throw new TypeError('Illegal invocation');
                }
                return this['_' + prop];
            }
        });
    });
    // DOMException uses the same `toString` as `Error`
    Object.defineProperty(DummyDOMException.prototype, 'code', {
        configurable: true,
        enumerable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
    DOMException.prototype = new DummyDOMException();

    DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
    Object.defineProperty(DOMException, 'prototype', {
        writable: false
    });

    Object.keys(codes).forEach(function (codeName) {
        Object.defineProperty(DOMException.prototype, codeName, {
            enumerable: true,
            configurable: false,
            value: codes[codeName]
        });
        Object.defineProperty(DOMException, codeName, {
            enumerable: true,
            configurable: false,
            value: codes[codeName]
        });
    });
    Object.keys(legacyCodes).forEach(function (codeName) {
        Object.defineProperty(DOMException.prototype, codeName, {
            enumerable: true,
            configurable: false,
            value: legacyCodes[codeName]
        });
        Object.defineProperty(DOMException, codeName, {
            enumerable: true,
            configurable: false,
            value: legacyCodes[codeName]
        });
    });
    Object.defineProperty(DOMException.prototype, 'constructor', {
        writable: true,
        configurable: true,
        enumerable: false,
        value: DOMException
    });

    return DOMException;
}

var ShimNonNativeDOMException = createNonNativeDOMExceptionClass();

/**
 * Creates a generic Error object
 * @returns {Error}
 */
function createNonNativeDOMException(name, message) {
    return new ShimNonNativeDOMException(message, name);
}

/**
 * Logs detailed error information to the console.
 * @param {string} name
 * @param {string} message
 * @param {string|Error|null} error
 */
function logError(name, message, error) {
    if (_CFG2.default.DEBUG) {
        if (error && error.message) {
            error = error.message;
        }

        var method = typeof console.error === 'function' ? 'error' : 'log';
        console[method](name + ': ' + message + '. ' + (error || ''));
        console.trace && console.trace();
    }
}

function isErrorOrDOMErrorOrDOMException(obj) {
    return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && // We don't use util.isObj here as mutual dependency causing problems in Babel with browser
    typeof obj.name === 'string';
}

/**
 * Finds the error argument.  This is useful because some WebSQL callbacks
 * pass the error as the first argument, and some pass it as the second argument.
 * @param {array} args
 * @returns {Error|DOMException|undefined}
 */
function findError(args) {
    var err = void 0;
    if (args) {
        if (args.length === 1) {
            return args[0];
        }
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (isErrorOrDOMErrorOrDOMException(arg)) {
                return arg;
            }
            if (arg && typeof arg.message === 'string') {
                err = arg;
            }
        }
    }
    return err;
}

function webSQLErrback(webSQLErr) {
    var name = void 0,
        message = void 0;
    switch (webSQLErr.code) {
        case 4:
            {
                // SQLError.QUOTA_ERR
                name = 'QuotaExceededError';
                message = 'The operation failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.';
                break;
            }
        /*
        // Should a WebSQL timeout treat as IndexedDB `TransactionInactiveError` or `UnknownError`?
        case 7: { // SQLError.TIMEOUT_ERR
            // All transaction errors abort later, so no need to mark inactive
            name = 'TransactionInactiveError';
            message = 'A request was placed against a transaction which is currently not active, or which is finished (Internal SQL Timeout).';
            break;
        }
        */
        default:
            {
                name = 'UnknownError';
                message = 'The operation failed for reasons unrelated to the database itself and not covered by any other errors.';
                break;
            }
    }
    message += ' (' + webSQLErr.message + ')--(' + webSQLErr.code + ')';
    var err = createDOMException(name, message);
    err.sqlError = webSQLErr;
    return err;
}

var test = void 0,
    useNativeDOMException = false;

// Test whether we can use the browser's native DOMException class
try {
    test = createNativeDOMException('test name', 'test message');
    if (isErrorOrDOMErrorOrDOMException(test) && test.name === 'test name' && test.message === 'test message') {
        // Native DOMException works as expected
        useNativeDOMException = true;
    }
} catch (e) {}

var createDOMException = void 0,
    ShimDOMException = void 0;
if (useNativeDOMException) {
    exports.ShimDOMException = ShimDOMException = DOMException;
    exports.createDOMException = createDOMException = function createDOMException(name, message, error) {
        logError(name, message, error);
        return createNativeDOMException(name, message);
    };
} else {
    exports.ShimDOMException = ShimDOMException = ShimNonNativeDOMException;
    exports.createDOMException = createDOMException = function createDOMException(name, message, error) {
        logError(name, message, error);
        return createNonNativeDOMException(name, message);
    };
}

exports.logError = logError;
exports.findError = findError;
exports.ShimDOMException = ShimDOMException;
exports.createDOMException = createDOMException;
exports.webSQLErrback = webSQLErrback;

},{"./CFG":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DOMStringList$protot;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cleanInterface = false;

var testObject = { test: true };
// Test whether Object.defineProperty really works.
if (Object.defineProperty) {
    try {
        Object.defineProperty(testObject, 'test', { enumerable: false });
        if (testObject.test) {
            cleanInterface = true;
        }
    } catch (e) {
        // Object.defineProperty does not work as intended.
    }
}

/**
 * Shim the DOMStringList object.
 *
 */
var DOMStringList = function DOMStringList() {
    throw new TypeError('Illegal constructor');
};
DOMStringList.prototype = (_DOMStringList$protot = {
    constructor: DOMStringList,
    // Interface.
    contains: function contains(str) {
        if (!arguments.length) {
            throw new TypeError('DOMStringList.contains must be supplied a value');
        }
        return this._items.includes(str);
    },
    item: function item(key) {
        if (!arguments.length) {
            throw new TypeError('DOMStringList.item must be supplied a value');
        }
        if (key < 0 || key >= this.length || !Number.isInteger(key)) {
            return null;
        }
        return this._items[key];
    },

    // Helpers. Should only be used internally.
    clone: function clone() {
        var stringList = DOMStringList.__createInstance();
        stringList._items = this._items.slice();
        stringList._length = this.length;
        stringList.addIndexes();
        return stringList;
    },
    addIndexes: function addIndexes() {
        for (var i = 0; i < this._items.length; i++) {
            this[i] = this._items[i];
        }
    },
    sortList: function sortList() {
        // http://w3c.github.io/IndexedDB/#sorted-list
        // https://tc39.github.io/ecma262/#sec-abstract-relational-comparison
        this._items.sort();
        this.addIndexes();
        return this._items;
    },
    forEach: function forEach(cb, thisArg) {
        this._items.forEach(cb, thisArg);
    },
    map: function map(cb, thisArg) {
        return this._items.map(cb, thisArg);
    },
    indexOf: function indexOf(str) {
        return this._items.indexOf(str);
    },
    push: function push(item) {
        this._items.push(item);
        this._length++;
        this.sortList();
    },
    splice: function splice() /* index, howmany, item1, ..., itemX */{
        var _items;

        (_items = this._items).splice.apply(_items, arguments);
        this._length = this._items.length;
        for (var i in this) {
            if (i === String(parseInt(i, 10))) {
                delete this[i];
            }
        }
        this.sortList();
    }
}, _defineProperty(_DOMStringList$protot, Symbol.toStringTag, 'DOMStringListPrototype'), _defineProperty(_DOMStringList$protot, Symbol.iterator, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    i = 0;

                case 1:
                    if (!(i < this._items.length)) {
                        _context.next = 6;
                        break;
                    }

                    _context.next = 4;
                    return this._items[i++];

                case 4:
                    _context.next = 1;
                    break;

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})), _DOMStringList$protot);
Object.defineProperty(DOMStringList, Symbol.hasInstance, {
    value: function value(obj) {
        return {}.toString.call(obj) === 'DOMStringListPrototype';
    }
});
var DOMStringListAlias = DOMStringList;
Object.defineProperty(DOMStringList, '__createInstance', {
    value: function value() {
        var DOMStringList = function DOMStringList() {
            this.toString = function () {
                return '[object DOMStringList]';
            };
            // Internal functions on the prototype have been made non-enumerable below.
            Object.defineProperty(this, 'length', {
                enumerable: true,
                get: function get() {
                    return this._length;
                }
            });
            this._items = [];
            this._length = 0;
        };
        DOMStringList.prototype = DOMStringListAlias.prototype;
        return new DOMStringList();
    }
});

if (cleanInterface) {
    Object.defineProperty(DOMStringList, 'prototype', {
        writable: false
    });

    var nonenumerableReadonly = ['addIndexes', 'sortList', 'forEach', 'map', 'indexOf', 'push', 'splice', 'constructor', '__createInstance'];
    nonenumerableReadonly.forEach(function (nonenumerableReadonly) {
        Object.defineProperty(DOMStringList.prototype, nonenumerableReadonly, {
            enumerable: false
        });
    });

    // Illegal invocations
    Object.defineProperty(DOMStringList.prototype, 'length', {
        configurable: true,
        enumerable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });

    var nonenumerableWritable = ['_items', '_length'];
    nonenumerableWritable.forEach(function (nonenumerableWritable) {
        Object.defineProperty(DOMStringList.prototype, nonenumerableWritable, {
            enumerable: false,
            writable: true
        });
    });
}

exports.default = DOMStringList;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShimEventTarget = exports.ShimCustomEvent = exports.ShimEvent = exports.createEvent = undefined;

var _eventtargeter = require('eventtargeter');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createEvent(type, debug, evInit) {
    var ev = new _eventtargeter.ShimEvent(type, evInit);
    ev.debug = debug;
    return ev;
}

// We don't add within polyfill repo as might not always be the desired implementation
Object.defineProperty(_eventtargeter.ShimEvent, Symbol.hasInstance, {
    value: function value(obj) {
        return util.isObj(obj) && 'target' in obj && typeof obj.bubbles === 'boolean';
    }
});

exports.createEvent = createEvent;
exports.ShimEvent = _eventtargeter.ShimEvent;
exports.ShimCustomEvent = _eventtargeter.ShimCustomEvent;
exports.ShimEventTarget = _eventtargeter.ShimEventTarget;

},{"./util":28,"eventtargeter":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IDBCursorWithValue = exports.IDBCursor = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _IDBRequest = require('./IDBRequest');

var _IDBObjectStore = require('./IDBObjectStore');

var _IDBObjectStore2 = _interopRequireDefault(_IDBObjectStore);

var _DOMException = require('./DOMException');

var _IDBKeyRange = require('./IDBKeyRange');

var _IDBFactory = require('./IDBFactory');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _IDBTransaction = require('./IDBTransaction');

var _IDBTransaction2 = _interopRequireDefault(_IDBTransaction);

var _Key = require('./Key');

var Key = _interopRequireWildcard(_Key);

var _Sca = require('./Sca');

var Sca = _interopRequireWildcard(_Sca);

var _IDBIndex = require('./IDBIndex');

var _IDBIndex2 = _interopRequireDefault(_IDBIndex);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The IndexedDB Cursor Object
 * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBCursor
 * @param {IDBKeyRange} range
 * @param {string} direction
 * @param {IDBObjectStore} store
 * @param {IDBObjectStore|IDBIndex} source
 * @param {string} keyColumnName
 * @param {string} valueColumnName
 * @param {boolean} count
 */
function IDBCursor() {
    throw new TypeError('Illegal constructor');
}
var IDBCursorAlias = IDBCursor;
IDBCursor.__super = function IDBCursor(query, direction, store, source, keyColumnName, valueColumnName, count) {
    this[Symbol.toStringTag] = 'IDBCursor';
    util.defineReadonlyProperties(this, ['key', 'primaryKey']);
    _IDBObjectStore2.default.__invalidStateIfDeleted(store);
    this.__indexSource = util.instanceOf(source, _IDBIndex2.default);
    if (this.__indexSource) _IDBIndex2.default.__invalidStateIfDeleted(source);
    _IDBTransaction2.default.__assertActive(store.transaction);
    var range = (0, _IDBKeyRange.convertValueToKeyRange)(query);
    if (direction !== undefined && !['next', 'prev', 'nextunique', 'prevunique'].includes(direction)) {
        throw new TypeError(direction + 'is not a valid cursor direction');
    }

    Object.defineProperties(this, {
        // Babel is not respecting default writable false here, so make explicit
        source: { writable: false, value: source },
        direction: { writable: false, value: direction || 'next' }
    });
    this.__key = undefined;
    this.__primaryKey = undefined;

    this.__store = store;
    this.__range = range;
    this.__req = _IDBRequest.IDBRequest.__createInstance();
    this.__req.__source = source;
    this.__req.__transaction = this.__store.transaction;
    this.__keyColumnName = keyColumnName;
    this.__valueColumnName = valueColumnName;
    this.__keyOnly = valueColumnName === 'key';
    this.__valueDecoder = this.__keyOnly ? Key : Sca;
    this.__count = count;
    this.__prefetchedIndex = -1;
    this.__multiEntryIndex = this.__indexSource ? source.multiEntry : false;
    this.__unique = this.direction.includes('unique');
    this.__sqlDirection = ['prev', 'prevunique'].includes(this.direction) ? 'DESC' : 'ASC';

    if (range !== undefined) {
        // Encode the key range and cache the encoded values, so we don't have to re-encode them over and over
        range.__lowerCached = range.lower !== undefined && Key.encode(range.lower, this.__multiEntryIndex);
        range.__upperCached = range.upper !== undefined && Key.encode(range.upper, this.__multiEntryIndex);
    }
    this.__gotValue = true;
    this['continue']();
};

IDBCursor.__createInstance = function () {
    var IDBCursor = IDBCursorAlias.__super;
    IDBCursor.prototype = IDBCursorAlias.prototype;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(IDBCursor, [null].concat(args)))();
};

IDBCursor.prototype.__find = function () /* key, tx, success, error, recordsToLoad */{
    if (this.__multiEntryIndex) {
        this.__findMultiEntry.apply(this, arguments);
    } else {
        this.__findBasic.apply(this, arguments);
    }
};

IDBCursor.prototype.__findBasic = function (key, primaryKey, tx, success, error, recordsToLoad) {
    var continueCall = recordsToLoad !== undefined;
    recordsToLoad = recordsToLoad || 1;

    var me = this;
    var quotedKeyColumnName = util.sqlQuote(me.__keyColumnName);
    var quotedKey = util.sqlQuote('key');
    var sql = ['SELECT * FROM', util.escapeStoreNameForSQL(me.__store.__currentName)];
    var sqlValues = [];
    sql.push('WHERE', quotedKeyColumnName, 'NOT NULL');
    (0, _IDBKeyRange.setSQLForKeyRange)(me.__range, quotedKeyColumnName, sql, sqlValues, true, true);

    // Determine the ORDER BY direction based on the cursor.
    var direction = me.__sqlDirection;
    var op = direction === 'ASC' ? '>' : '<';

    if (primaryKey !== undefined) {
        sql.push('AND', quotedKey, op + '= ?');
        // Key.convertValueToKey(primaryKey); // Already checked by `continuePrimaryKey`
        sqlValues.push(Key.encode(primaryKey));
    }
    if (key !== undefined) {
        sql.push('AND', quotedKeyColumnName, op + '= ?');
        // Key.convertValueToKey(key); // Already checked by `continue` or `continuePrimaryKey`
        sqlValues.push(Key.encode(key));
    } else if (continueCall && me.__key !== undefined) {
        sql.push('AND', quotedKeyColumnName, op + ' ?');
        // Key.convertValueToKey(me.__key); // Already checked when stored
        sqlValues.push(Key.encode(me.__key));
    }

    if (!me.__count) {
        // 1. Sort by key
        sql.push('ORDER BY', quotedKeyColumnName, direction);

        if (me.__keyColumnName !== 'key') {
            // Avoid adding 'key' twice
            if (!me.__unique) {
                // 2. Sort by primaryKey (if defined and not unique)
                // 3. Sort by position (if defined)
                sql.push(',', quotedKey, direction);
            } else if (me.direction === 'prevunique') {
                // Sort by first record with key matching
                sql.push(',', quotedKey, 'ASC');
            }
        }

        if (!me.__unique && me.__indexSource) {
            // 4. Sort by object store position (if defined and not unique)
            sql.push(',', util.sqlQuote(me.__valueColumnName), direction);
        }
        sql.push('LIMIT', recordsToLoad);
    }
    sql = sql.join(' ');
    _CFG2.default.DEBUG && console.log(sql, sqlValues);

    tx.executeSql(sql, sqlValues, function (tx, data) {
        if (me.__count) {
            success(undefined, data.rows.length, undefined);
        } else if (data.rows.length > 1) {
            me.__prefetchedIndex = 0;
            me.__prefetchedData = data.rows;
            _CFG2.default.DEBUG && console.log('Preloaded ' + me.__prefetchedData.length + ' records for cursor');
            me.__decode(data.rows.item(0), success);
        } else if (data.rows.length === 1) {
            me.__decode(data.rows.item(0), success);
        } else {
            _CFG2.default.DEBUG && console.log('Reached end of cursors');
            success(undefined, undefined, undefined);
        }
    }, function (tx, err) {
        _CFG2.default.DEBUG && console.log('Could not execute Cursor.continue', sql, sqlValues);
        error(err);
    });
};

IDBCursor.prototype.__findMultiEntry = function (key, primaryKey, tx, success, error) {
    var me = this;

    if (me.__prefetchedData && me.__prefetchedData.length === me.__prefetchedIndex) {
        _CFG2.default.DEBUG && console.log('Reached end of multiEntry cursor');
        success(undefined, undefined, undefined);
        return;
    }

    var quotedKeyColumnName = util.sqlQuote(me.__keyColumnName);
    var sql = ['SELECT * FROM', util.escapeStoreNameForSQL(me.__store.__currentName)];
    var sqlValues = [];
    sql.push('WHERE', quotedKeyColumnName, 'NOT NULL');
    if (me.__range && me.__range.lower !== undefined && Array.isArray(me.__range.upper)) {
        if (me.__range.upper.indexOf(me.__range.lower) === 0) {
            sql.push('AND', quotedKeyColumnName, "LIKE ? ESCAPE '^'");
            sqlValues.push('%' + util.sqlLIKEEscape(me.__range.__lowerCached.slice(0, -1)) + '%');
        }
    }

    // Determine the ORDER BY direction based on the cursor.
    var direction = me.__sqlDirection;
    var op = direction === 'ASC' ? '>' : '<';
    var quotedKey = util.sqlQuote('key');

    if (primaryKey !== undefined) {
        sql.push('AND', quotedKey, op + '= ?');
        // Key.convertValueToKey(primaryKey); // Already checked by `continuePrimaryKey`
        sqlValues.push(Key.encode(primaryKey));
    }
    if (key !== undefined) {
        sql.push('AND', quotedKeyColumnName, op + '= ?');
        // Key.convertValueToKey(key); // Already checked by `continue` or `continuePrimaryKey`
        sqlValues.push(Key.encode(key));
    } else if (me.__key !== undefined) {
        sql.push('AND', quotedKeyColumnName, op + ' ?');
        // Key.convertValueToKey(me.__key); // Already checked when entered
        sqlValues.push(Key.encode(me.__key));
    }

    if (!me.__count) {
        // 1. Sort by key
        sql.push('ORDER BY', quotedKeyColumnName, direction);

        // 2. Sort by primaryKey (if defined and not unique)
        if (!me.__unique && me.__keyColumnName !== 'key') {
            // Avoid adding 'key' twice
            sql.push(',', util.sqlQuote('key'), direction);
        }

        // 3. Sort by position (if defined)

        if (!me.__unique && me.__indexSource) {
            // 4. Sort by object store position (if defined and not unique)
            sql.push(',', util.sqlQuote(me.__valueColumnName), direction);
        }
    }
    sql = sql.join(' ');
    _CFG2.default.DEBUG && console.log(sql, sqlValues);

    tx.executeSql(sql, sqlValues, function (tx, data) {
        if (data.rows.length > 0) {
            if (me.__count) {
                // Avoid caching and other processing below
                var ct = 0;
                for (var i = 0; i < data.rows.length; i++) {
                    var rowItem = data.rows.item(i);
                    var rowKey = Key.decode(rowItem[me.__keyColumnName], true);
                    var matches = Key.findMultiEntryMatches(rowKey, me.__range);
                    ct += matches.length;
                }
                success(undefined, ct, undefined);
                return;
            }
            var rows = [];
            for (var _i = 0; _i < data.rows.length; _i++) {
                var _rowItem = data.rows.item(_i);
                var _rowKey = Key.decode(_rowItem[me.__keyColumnName], true);
                var _matches = Key.findMultiEntryMatches(_rowKey, me.__range);

                for (var j = 0; j < _matches.length; j++) {
                    var matchingKey = _matches[j];
                    var clone = {
                        matchingKey: Key.encode(matchingKey, true),
                        key: _rowItem.key
                    };
                    clone[me.__keyColumnName] = _rowItem[me.__keyColumnName];
                    clone[me.__valueColumnName] = _rowItem[me.__valueColumnName];
                    rows.push(clone);
                }
            }
            var reverse = me.direction.indexOf('prev') === 0;
            rows.sort(function (a, b) {
                if (a.matchingKey.replace('[', 'z') < b.matchingKey.replace('[', 'z')) {
                    return reverse ? 1 : -1;
                }
                if (a.matchingKey.replace('[', 'z') > b.matchingKey.replace('[', 'z')) {
                    return reverse ? -1 : 1;
                }
                if (a.key < b.key) {
                    return me.direction === 'prev' ? 1 : -1;
                }
                if (a.key > b.key) {
                    return me.direction === 'prev' ? -1 : 1;
                }
                return 0;
            });

            if (rows.length > 1) {
                me.__prefetchedIndex = 0;
                me.__prefetchedData = {
                    data: rows,
                    length: rows.length,
                    item: function item(index) {
                        return this.data[index];
                    }
                };
                _CFG2.default.DEBUG && console.log('Preloaded ' + me.__prefetchedData.length + ' records for multiEntry cursor');
                me.__decode(rows[0], success);
            } else if (rows.length === 1) {
                _CFG2.default.DEBUG && console.log('Reached end of multiEntry cursor');
                me.__decode(rows[0], success);
            } else {
                _CFG2.default.DEBUG && console.log('Reached end of multiEntry cursor');
                success(undefined, undefined, undefined);
            }
        } else {
            _CFG2.default.DEBUG && console.log('Reached end of multiEntry cursor');
            success(undefined, undefined, undefined);
        }
    }, function (tx, err) {
        _CFG2.default.DEBUG && console.log('Could not execute Cursor.continue', sql, sqlValues);
        error(err);
    });
};

/**
 * Creates an "onsuccess" callback
 * @private
 */
IDBCursor.prototype.__onsuccess = function (success) {
    var me = this;
    return function (key, value, primaryKey) {
        if (me.__count) {
            success(value, me.__req);
        } else {
            if (key !== undefined) {
                me.__gotValue = true;
            }
            me.__key = key === undefined ? null : key;
            me.__primaryKey = primaryKey === undefined ? null : primaryKey;
            me.__value = value === undefined ? null : value;
            var result = key === undefined ? null : me;
            success(result, me.__req);
        }
    };
};

IDBCursor.prototype.__decode = function (rowItem, callback) {
    var me = this;
    if (me.__multiEntryIndex && me.__unique) {
        if (!me.__matchedKeys) {
            me.__matchedKeys = {};
        }
        if (me.__matchedKeys[rowItem.matchingKey]) {
            callback(undefined, undefined, undefined); // eslint-disable-line standard/no-callback-literal
            return;
        }
        me.__matchedKeys[rowItem.matchingKey] = true;
    }
    var encKey = util.unescapeSQLiteResponse(me.__multiEntryIndex ? rowItem.matchingKey : rowItem[me.__keyColumnName]);
    var encVal = util.unescapeSQLiteResponse(rowItem[me.__valueColumnName]);
    var encPrimaryKey = util.unescapeSQLiteResponse(rowItem.key);

    var key = Key.decode(encKey, me.__multiEntryIndex);
    var val = me.__valueDecoder.decode(encVal);
    var primaryKey = Key.decode(encPrimaryKey);
    callback(key, val, primaryKey, encKey /*, encVal, encPrimaryKey */);
};

IDBCursor.prototype.__sourceOrEffectiveObjStoreDeleted = function () {
    _IDBObjectStore2.default.__invalidStateIfDeleted(this.__store, "The cursor's effective object store has been deleted");
    if (this.__indexSource) _IDBIndex2.default.__invalidStateIfDeleted(this.source, "The cursor's index source has been deleted");
};

IDBCursor.prototype.__invalidateCache = function () {
    this.__prefetchedData = null;
};

IDBCursor.prototype.__continue = function (key, advanceContinue) {
    var me = this;
    var advanceState = me.__advanceCount !== undefined;
    _IDBTransaction2.default.__assertActive(me.__store.transaction);
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__gotValue && !advanceContinue) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    if (key !== undefined) {
        Key.convertValueToKeyRethrowingAndIfInvalid(key);
        var cmpResult = (0, _IDBFactory.cmp)(key, me.key);
        if (cmpResult === 0 || me.direction.includes('next') && cmpResult === -1 || me.direction.includes('prev') && cmpResult === 1) {
            throw (0, _DOMException.createDOMException)('DataError', 'Cannot ' + (advanceState ? 'advance' : 'continue') + ' the cursor in an unexpected direction');
        }
    }
    this.__continueFinish(key, undefined, advanceState);
};

IDBCursor.prototype.__continueFinish = function (key, primaryKey, advanceState) {
    var me = this;
    var recordsToPreloadOnContinue = me.__advanceCount || _CFG2.default.cursorPreloadPackSize || 100;
    me.__gotValue = false;
    me.__req.__readyState = 'pending'; // Unset done flag

    me.__store.transaction.__pushToQueue(me.__req, function cursorContinue(tx, args, success, error, executeNextRequest) {
        function triggerSuccess(k, val, primKey) {
            if (advanceState) {
                if (me.__advanceCount >= 2 && k !== undefined) {
                    me.__advanceCount--;
                    me.__key = k;
                    me.__continue(undefined, true);
                    executeNextRequest(); // We don't call success yet but do need to advance the transaction queue
                    return;
                }
                me.__advanceCount = undefined;
            }
            me.__onsuccess(success)(k, val, primKey);
        }
        if (me.__prefetchedData) {
            // We have pre-loaded data for the cursor
            me.__prefetchedIndex++;
            if (me.__prefetchedIndex < me.__prefetchedData.length) {
                me.__decode(me.__prefetchedData.item(me.__prefetchedIndex), function (k, val, primKey, encKey) {
                    function checkKey() {
                        var cmpResult = key === undefined || (0, _IDBFactory.cmp)(k, key);
                        if (cmpResult > 0 || cmpResult === 0 && (me.__unique || primaryKey === undefined || (0, _IDBFactory.cmp)(primKey, primaryKey) >= 0)) {
                            triggerSuccess(k, val, primKey);
                            return;
                        }
                        cursorContinue(tx, args, success, error);
                    }
                    if (me.__unique && !me.__multiEntryIndex && encKey === Key.encode(me.key, me.__multiEntryIndex)) {
                        cursorContinue(tx, args, success, error);
                        return;
                    }
                    checkKey();
                });
                return;
            }
        }

        // No (or not enough) pre-fetched data, do query
        me.__find(key, primaryKey, tx, triggerSuccess, function () {
            me.__advanceCount = undefined;
            error.apply(undefined, arguments);
        }, recordsToPreloadOnContinue);
    });
};

IDBCursor.prototype['continue'] = function () /* key */{
    this.__continue(arguments[0]);
};

IDBCursor.prototype.continuePrimaryKey = function (key, primaryKey) {
    var me = this;
    _IDBTransaction2.default.__assertActive(me.__store.transaction);
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__indexSource) {
        throw (0, _DOMException.createDOMException)('InvalidAccessError', '`continuePrimaryKey` may only be called on an index source.');
    }
    if (!['next', 'prev'].includes(me.direction)) {
        throw (0, _DOMException.createDOMException)('InvalidAccessError', '`continuePrimaryKey` may not be called with unique cursors.');
    }
    if (!me.__gotValue) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    Key.convertValueToKeyRethrowingAndIfInvalid(key);
    Key.convertValueToKeyRethrowingAndIfInvalid(primaryKey);

    var cmpResult = (0, _IDBFactory.cmp)(key, me.key);
    if (me.direction === 'next' && cmpResult === -1 || me.direction === 'prev' && cmpResult === 1) {
        throw (0, _DOMException.createDOMException)('DataError', 'Cannot continue the cursor in an unexpected direction');
    }
    function noErrors() {
        me.__continueFinish(key, primaryKey, false);
    }
    if (cmpResult === 0) {
        Sca.encode(primaryKey, function (encPrimaryKey) {
            Sca.encode(me.primaryKey, function (encObjectStorePos) {
                if (encPrimaryKey === encObjectStorePos || me.direction === 'next' && encPrimaryKey < encObjectStorePos || me.direction === 'prev' && encPrimaryKey > encObjectStorePos) {
                    throw (0, _DOMException.createDOMException)('DataError', 'Cannot continue the cursor in an unexpected direction');
                }
                noErrors();
            });
        });
    } else {
        noErrors();
    }
};

IDBCursor.prototype.advance = function (count) {
    var me = this;
    count = util.enforceRange(count, 'unsigned long');
    if (count === 0) {
        throw new TypeError('Calling advance() with count argument 0');
    }
    if (me.__gotValue) {
        // Only set the count if not running in error (otherwise will override earlier good advance calls)
        me.__advanceCount = count;
    }
    me.__continue();
};

IDBCursor.prototype.update = function (valueToUpdate) {
    var me = this;
    if (!arguments.length) throw new TypeError('A value must be passed to update()');
    _IDBTransaction2.default.__assertActive(me.__store.transaction);
    me.__store.transaction.__assertWritable();
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__gotValue) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    if (me.__keyOnly) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'This cursor method cannot be called when the key only flag has been set.');
    }
    var request = me.__store.transaction.__createRequest(me);
    var key = me.primaryKey;
    function addToQueue(clonedValue) {
        // We set the `invalidateCache` argument to `false` since the old value shouldn't be accessed
        _IDBObjectStore2.default.__storingRecordObjectStore(request, me.__store, false, clonedValue, false, key);
    }
    if (me.__store.keyPath !== null) {
        var _me$__store$__validat = me.__store.__validateKeyAndValueAndCloneValue(valueToUpdate, undefined, true),
            _me$__store$__validat2 = _slicedToArray(_me$__store$__validat, 2),
            evaluatedKey = _me$__store$__validat2[0],
            clonedValue = _me$__store$__validat2[1];

        if ((0, _IDBFactory.cmp)(me.primaryKey, evaluatedKey) !== 0) {
            throw (0, _DOMException.createDOMException)('DataError', 'The key of the supplied value to `update` is not equal to the cursor\'s effective key');
        }
        addToQueue(clonedValue);
    } else {
        var _clonedValue = Sca.clone(valueToUpdate);
        addToQueue(_clonedValue);
    }
    return request;
};

IDBCursor.prototype['delete'] = function () {
    var me = this;
    _IDBTransaction2.default.__assertActive(me.__store.transaction);
    me.__store.transaction.__assertWritable();
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__gotValue) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    if (me.__keyOnly) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'This cursor method cannot be called when the key only flag has been set.');
    }
    return this.__store.transaction.__addToTransactionQueue(function cursorDelete(tx, args, success, error) {
        me.__find(undefined, undefined, tx, function (key, value, primaryKey) {
            var sql = 'DELETE FROM  ' + util.escapeStoreNameForSQL(me.__store.__currentName) + ' WHERE "key" = ?';
            _CFG2.default.DEBUG && console.log(sql, key, primaryKey);
            // Key.convertValueToKey(primaryKey); // Already checked when entered
            tx.executeSql(sql, [util.escapeSQLiteStatement(Key.encode(primaryKey))], function (tx, data) {
                if (data.rowsAffected === 1) {
                    // We don't invalidate the cache (as we don't access it anymore
                    //    and it will set the index off)
                    success(undefined);
                } else {
                    error('No rows with key found' + key);
                }
            }, function (tx, data) {
                error(data);
            });
        }, error);
    }, undefined, me);
};

IDBCursor.prototype[Symbol.toStringTag] = 'IDBCursorPrototype';

['source', 'direction', 'key', 'primaryKey'].forEach(function (prop) {
    Object.defineProperty(IDBCursor.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});
Object.defineProperty(IDBCursor, 'prototype', {
    writable: false
});

function IDBCursorWithValue() {
    throw new TypeError('Illegal constructor');
}

IDBCursorWithValue.prototype = Object.create(IDBCursor.prototype);
Object.defineProperty(IDBCursorWithValue.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBCursorWithValue
});

var IDBCursorWithValueAlias = IDBCursorWithValue;
IDBCursorWithValue.__createInstance = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    function IDBCursorWithValue() {
        var _IDBCursor$__super;

        (_IDBCursor$__super = IDBCursor.__super).call.apply(_IDBCursor$__super, [this].concat(args));
        this[Symbol.toStringTag] = 'IDBCursorWithValue';
        util.defineReadonlyProperties(this, 'value');
    }
    IDBCursorWithValue.prototype = IDBCursorWithValueAlias.prototype;
    return new IDBCursorWithValue();
};

Object.defineProperty(IDBCursorWithValue.prototype, 'value', {
    enumerable: true,
    configurable: true,
    get: function get() {
        throw new TypeError('Illegal invocation');
    }
});

IDBCursorWithValue.prototype[Symbol.toStringTag] = 'IDBCursorWithValuePrototype';

Object.defineProperty(IDBCursorWithValue, 'prototype', {
    writable: false
});

exports.IDBCursor = IDBCursor;
exports.IDBCursorWithValue = IDBCursorWithValue;

},{"./CFG":9,"./DOMException":10,"./IDBFactory":15,"./IDBIndex":16,"./IDBKeyRange":17,"./IDBObjectStore":18,"./IDBRequest":19,"./IDBTransaction":20,"./Key":22,"./Sca":23,"./util":28}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _DOMException = require('./DOMException');

var _Event = require('./Event');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _DOMStringList = require('./DOMStringList');

var _DOMStringList2 = _interopRequireDefault(_DOMStringList);

var _IDBObjectStore = require('./IDBObjectStore');

var _IDBObjectStore2 = _interopRequireDefault(_IDBObjectStore);

var _IDBTransaction = require('./IDBTransaction');

var _IDBTransaction2 = _interopRequireDefault(_IDBTransaction);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _eventtargeter = require('eventtargeter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var listeners = ['onabort', 'onclose', 'onerror', 'onversionchange'];
var readonlyProperties = ['name', 'version', 'objectStoreNames'];

/**
 * IDB Database Object
 * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#database-interface
 * @constructor
 */
function IDBDatabase() {
    throw new TypeError('Illegal constructor');
}
var IDBDatabaseAlias = IDBDatabase;
IDBDatabase.__createInstance = function (db, name, oldVersion, version, storeProperties) {
    function IDBDatabase() {
        var _this = this;

        this[Symbol.toStringTag] = 'IDBDatabase';
        util.defineReadonlyProperties(this, readonlyProperties);
        this.__db = db;
        this.__closed = false;
        this.__oldVersion = oldVersion;
        this.__version = version;
        this.__name = name;
        this.__upgradeTransaction = null;
        listeners.forEach(function (listener) {
            Object.defineProperty(_this, listener, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return this['__' + listener];
                },
                set: function set(val) {
                    this['__' + listener] = val;
                }
            });
        });
        listeners.forEach(function (l) {
            _this[l] = null;
        });
        this.__setOptions({
            legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
        });

        this.__transactions = [];
        this.__objectStores = {};
        this.__objectStoreNames = _DOMStringList2.default.__createInstance();
        var itemCopy = {};

        var _loop = function _loop(i) {
            var item = storeProperties.rows.item(i);
            // Safari implements `item` getter return object's properties
            //  as readonly, so we copy all its properties (except our
            //  custom `currNum` which we don't need) onto a new object
            itemCopy.name = item.name;
            itemCopy.keyPath = JSON.parse(item.keyPath);
            ['autoInc', 'indexList'].forEach(function (prop) {
                itemCopy[prop] = JSON.parse(item[prop]);
            });
            itemCopy.idbdb = _this;
            var store = _IDBObjectStore2.default.__createInstance(itemCopy);
            _this.__objectStores[store.name] = store;
            _this.objectStoreNames.push(store.name);
        };

        for (var i = 0; i < storeProperties.rows.length; i++) {
            _loop(i);
        }
        this.__oldObjectStoreNames = this.objectStoreNames.clone();
    }
    IDBDatabase.prototype = IDBDatabaseAlias.prototype;
    return new IDBDatabase();
};

IDBDatabase.prototype = _eventtargeter.EventTargetFactory.createInstance();
IDBDatabase.prototype[Symbol.toStringTag] = 'IDBDatabasePrototype';

/**
 * Creates a new object store.
 * @param {string} storeName
 * @param {object} [createOptions]
 * @returns {IDBObjectStore}
 */
IDBDatabase.prototype.createObjectStore = function (storeName /* , createOptions */) {
    var createOptions = arguments[1];
    storeName = String(storeName); // W3C test within IDBObjectStore.js seems to accept string conversion
    if (!(this instanceof IDBDatabase)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No object store name was specified');
    }
    _IDBTransaction2.default.__assertVersionChange(this.__versionTransaction); // this.__versionTransaction may not exist if called mistakenly by user in onsuccess
    this.throwIfUpgradeTransactionNull();
    _IDBTransaction2.default.__assertActive(this.__versionTransaction);

    createOptions = Object.assign({}, createOptions);
    var keyPath = createOptions.keyPath;
    keyPath = keyPath === undefined ? null : keyPath = util.convertToSequenceDOMString(keyPath);
    if (keyPath !== null && !util.isValidKeyPath(keyPath)) {
        throw (0, _DOMException.createDOMException)('SyntaxError', 'The keyPath argument contains an invalid key path.');
    }

    if (this.__objectStores[storeName] && !this.__objectStores[storeName].__pendingDelete) {
        throw (0, _DOMException.createDOMException)('ConstraintError', 'Object store "' + storeName + '" already exists in ' + this.name);
    }

    var autoInc = createOptions.autoIncrement;
    if (autoInc && (keyPath === '' || Array.isArray(keyPath))) {
        throw (0, _DOMException.createDOMException)('InvalidAccessError', 'With autoIncrement set, the keyPath argument must not be an array or empty string.');
    }

    /** @name IDBObjectStoreProperties **/
    var storeProperties = {
        name: storeName,
        keyPath: keyPath,
        autoInc: autoInc,
        indexList: {},
        idbdb: this
    };
    var store = _IDBObjectStore2.default.__createInstance(storeProperties, this.__versionTransaction);
    return _IDBObjectStore2.default.__createObjectStore(this, store);
};

/**
 * Deletes an object store.
 * @param {string} storeName
 */
IDBDatabase.prototype.deleteObjectStore = function (storeName) {
    if (!(this instanceof IDBDatabase)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No object store name was specified');
    }
    _IDBTransaction2.default.__assertVersionChange(this.__versionTransaction);
    this.throwIfUpgradeTransactionNull();
    _IDBTransaction2.default.__assertActive(this.__versionTransaction);

    var store = this.__objectStores[storeName];
    if (!store) {
        throw (0, _DOMException.createDOMException)('NotFoundError', 'Object store "' + storeName + '" does not exist in ' + this.name);
    }

    _IDBObjectStore2.default.__deleteObjectStore(this, store);
};

IDBDatabase.prototype.close = function () {
    if (!(this instanceof IDBDatabase)) {
        throw new TypeError('Illegal invocation');
    }
    this.__closed = true;
    if (this.__unblocking) {
        this.__unblocking.check();
    }
};

/**
 * Starts a new transaction.
 * @param {string|string[]} storeNames
 * @param {string} mode
 * @returns {IDBTransaction}
 */
IDBDatabase.prototype.transaction = function (storeNames /* , mode */) {
    var _this2 = this;

    if (arguments.length === 0) {
        throw new TypeError('You must supply a valid `storeNames` to `IDBDatabase.transaction`');
    }
    var mode = arguments[1];
    storeNames = util.isIterable(storeNames) ? [].concat(_toConsumableArray(new Set( // to be unique
    util.convertToSequenceDOMString(storeNames) // iterables have `ToString` applied (and we convert to array for convenience)
    ))).sort() // must be sorted
    : [util.convertToDOMString(storeNames)];

    /* (function () {
        throw new TypeError('You must supply a valid `storeNames` to `IDBDatabase.transaction`');
    }())); */

    // Since SQLite (at least node-websql and definitely WebSQL) requires
    //   locking of the whole database, to allow simultaneous readwrite
    //   operations on transactions without overlapping stores, we'd probably
    //   need to save the stores in separate databases (we could also consider
    //   prioritizing readonly but not starving readwrite).
    // Even for readonly transactions, due to [issue 17](https://github.com/nolanlawson/node-websql/issues/17),
    //   we're not currently actually running the SQL requests in parallel.
    if (typeof mode === 'number') {
        mode = mode === 1 ? 'readwrite' : 'readonly';
        _CFG2.default.DEBUG && console.log('Mode should be a string, but was specified as ', mode); // Todo Deprecated: Remove this option as no longer in spec
    } else {
        mode = mode || 'readonly';
    }

    _IDBTransaction2.default.__assertNotVersionChange(this.__versionTransaction);
    if (this.__closed) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'An attempt was made to start a new transaction on a database connection that is not open');
    }

    var objectStoreNames = _DOMStringList2.default.__createInstance();
    storeNames.forEach(function (storeName) {
        if (!_this2.objectStoreNames.contains(storeName)) {
            throw (0, _DOMException.createDOMException)('NotFoundError', 'The "' + storeName + '" object store does not exist');
        }
        objectStoreNames.push(storeName);
    });

    if (storeNames.length === 0) {
        throw (0, _DOMException.createDOMException)('InvalidAccessError', 'No valid object store names were specified');
    }

    if (mode !== 'readonly' && mode !== 'readwrite') {
        throw new TypeError('Invalid transaction mode: ' + mode);
    }

    // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87

    var trans = _IDBTransaction2.default.__createInstance(this, objectStoreNames, mode);
    this.__transactions.push(trans);
    return trans;
};

// See https://github.com/w3c/IndexedDB/issues/192
IDBDatabase.prototype.throwIfUpgradeTransactionNull = function () {
    if (this.__upgradeTransaction === null) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'No upgrade transaction associated with database.');
    }
};

// Todo __forceClose: Add tests for `__forceClose`
IDBDatabase.prototype.__forceClose = function (msg) {
    var me = this;
    me.close();
    var ct = 0;
    me.__transactions.forEach(function (trans) {
        trans.on__abort = function () {
            ct++;
            if (ct === me.__transactions.length) {
                // Todo __forceClose: unblock any pending `upgradeneeded` or `deleteDatabase` calls
                var evt = (0, _Event.createEvent)('close');
                setTimeout(function () {
                    me.dispatchEvent(evt);
                });
            }
        };
        trans.__abortTransaction((0, _DOMException.createDOMException)('AbortError', 'The connection was force-closed: ' + (msg || '')));
    });
};

listeners.forEach(function (listener) {
    Object.defineProperty(IDBDatabase.prototype, listener, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        },
        set: function set(val) {
            throw new TypeError('Illegal invocation');
        }
    });
});

readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBDatabase.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});

Object.defineProperty(IDBDatabase.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBDatabase
});

Object.defineProperty(IDBDatabase, 'prototype', {
    writable: false
});

exports.default = IDBDatabase;
module.exports = exports['default'];

},{"./CFG":9,"./DOMException":10,"./DOMStringList":11,"./Event":12,"./IDBObjectStore":18,"./IDBTransaction":20,"./util":28,"eventtargeter":2}],15:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shimIndexedDB = exports.cmp = exports.IDBFactory = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* globals location, Event */


var _Event = require('./Event');

var _IDBVersionChangeEvent = require('./IDBVersionChangeEvent');

var _IDBVersionChangeEvent2 = _interopRequireDefault(_IDBVersionChangeEvent);

var _DOMException = require('./DOMException');

var _IDBRequest = require('./IDBRequest');

var _cmp = require('./cmp');

var _cmp2 = _interopRequireDefault(_cmp);

var _DOMStringList = require('./DOMStringList');

var _DOMStringList2 = _interopRequireDefault(_DOMStringList);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _Key = require('./Key');

var Key = _interopRequireWildcard(_Key);

var _IDBTransaction = require('./IDBTransaction');

var _IDBTransaction2 = _interopRequireDefault(_IDBTransaction);

var _IDBDatabase = require('./IDBDatabase');

var _IDBDatabase2 = _interopRequireDefault(_IDBDatabase);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _syncPromise = require('sync-promise');

var _syncPromise2 = _interopRequireDefault(_syncPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOrigin = function getOrigin() {
    return (typeof location === 'undefined' ? 'undefined' : _typeof(location)) !== 'object' || !location ? 'null' : location.origin;
};
var hasNullOrigin = function hasNullOrigin() {
    return _CFG2.default.checkOrigin !== false && getOrigin() === 'null';
};

// Todo: This really should be process and tab-independent so the
//  origin could vary; in the browser, this might be through a
//  `SharedWorker`
var connectionQueue = {};

function processNextInConnectionQueue(name) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getOrigin();

    var queueItems = connectionQueue[origin][name];
    if (!queueItems[0]) {
        // Nothing left to process
        return;
    }
    var _queueItems$ = queueItems[0],
        req = _queueItems$.req,
        cb = _queueItems$.cb; // Keep in queue to prevent continuation

    function removeFromQueue() {
        queueItems.shift();
        processNextInConnectionQueue(name, origin);
    }
    req.addEventListener('success', removeFromQueue);
    req.addEventListener('error', removeFromQueue);
    cb(req);
}

function addRequestToConnectionQueue(req, name) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getOrigin();
    var cb = arguments[3];

    if (!connectionQueue[origin][name]) {
        connectionQueue[origin][name] = [];
    }
    connectionQueue[origin][name].push({ req: req, cb: cb });

    if (connectionQueue[origin][name].length === 1) {
        // If there are no items in the queue, we have to start it
        processNextInConnectionQueue(name, origin);
    }
}

function triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, newVersion) {
    // Todo: For Node (and in browser using service workers if available?) the
    //    connections ought to involve those in any process; should also
    //    auto-close if unloading
    var connectionIsClosed = function connectionIsClosed(connection) {
        return connection.__closed;
    };
    var connectionsClosed = function connectionsClosed() {
        return openConnections.every(connectionIsClosed);
    };
    return openConnections.reduce(function (promises, entry) {
        if (connectionIsClosed(entry)) {
            return promises;
        }
        return promises.then(function () {
            if (connectionIsClosed(entry)) {
                // Prior onversionchange must have caused this connection to be closed
                return;
            }
            var e = new _IDBVersionChangeEvent2.default('versionchange', { oldVersion: oldVersion, newVersion: newVersion });
            return new _syncPromise2.default(function (resolve) {
                setTimeout(function () {
                    entry.dispatchEvent(e); // No need to catch errors
                    resolve();
                });
            });
        });
    }, _syncPromise2.default.resolve()).then(function () {
        if (!connectionsClosed()) {
            return new _syncPromise2.default(function (resolve) {
                var unblocking = {
                    check: function check() {
                        if (connectionsClosed()) {
                            resolve();
                        }
                    }
                };
                var e = new _IDBVersionChangeEvent2.default('blocked', { oldVersion: oldVersion, newVersion: newVersion });
                setTimeout(function () {
                    req.dispatchEvent(e); // No need to catch errors
                    if (!connectionsClosed()) {
                        openConnections.forEach(function (connection) {
                            if (!connectionIsClosed(connection)) {
                                connection.__unblocking = unblocking;
                            }
                        });
                    } else {
                        resolve();
                    }
                });
            });
        }
    });
}

var websqlDBCache = {};
var sysdb = void 0;
var nameCounter = 0;

function getLatestCachedWebSQLVersion(name) {
    return Object.keys(websqlDBCache[name]).map(Number).reduce(function (prev, curr) {
        return curr > prev ? curr : prev;
    }, 0);
}

function getLatestCachedWebSQLDB(name) {
    return websqlDBCache[name] && websqlDBCache[name][// eslint-disable-line standard/computed-property-even-spacing
    getLatestCachedWebSQLVersion()];
}

function cleanupDatabaseResources(__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError) {
    var useMemoryDatabase = typeof _CFG2.default.memoryDatabase === 'string';
    if (useMemoryDatabase) {
        var latestSQLiteDBCached = websqlDBCache[name] ? getLatestCachedWebSQLDB(name) : null;
        if (!latestSQLiteDBCached) {
            console.warn('Could not find a memory database instance to delete.');
            databaseDeleted();
            return;
        }
        var _sqliteDB = latestSQLiteDBCached._db && latestSQLiteDBCached._db._db;
        if (!_sqliteDB || !_sqliteDB.close) {
            console.error('The `openDatabase` implementation does not have the expected `._db._db.close` method for closing the database');
            return;
        }
        _sqliteDB.close(function (err) {
            if (err) {
                console.warn('Error closing (destroying) memory database');
                return;
            }
            databaseDeleted();
        });
        return;
    }
    if (_CFG2.default.deleteDatabaseFiles !== false && {}.toString.call(process) === '[object process]') {
        require('fs').unlink(require('path').resolve(escapedDatabaseName), function (err) {
            if (err && err.code !== 'ENOENT') {
                // Ignore if file is already deleted
                dbError({ code: 0, message: 'Error removing database file: ' + escapedDatabaseName + ' ' + err });
                return;
            }
            databaseDeleted();
        });
        return;
    }

    var sqliteDB = __openDatabase(_path2.default.join(_CFG2.default.databaseBasePath || '', escapedDatabaseName), 1, name, _CFG2.default.DEFAULT_DB_SIZE);
    sqliteDB.transaction(function (tx) {
        tx.executeSql('SELECT "name" FROM __sys__', [], function (tx, data) {
            var tables = data.rows;
            (function deleteTables(i) {
                if (i >= tables.length) {
                    // If all tables are deleted, delete the housekeeping tables
                    tx.executeSql('DROP TABLE IF EXISTS __sys__', [], function () {
                        databaseDeleted();
                    }, dbError);
                } else {
                    // Delete all tables in this database, maintained in the sys table
                    tx.executeSql('DROP TABLE ' + util.escapeStoreNameForSQL(util.unescapeSQLiteResponse( // Avoid double-escaping
                    tables.item(i).name)), [], function () {
                        deleteTables(i + 1);
                    }, function () {
                        deleteTables(i + 1);
                    });
                }
            })(0);
        }, function (e) {
            // __sys__ table does not exist, but that does not mean delete did not happen
            databaseDeleted();
        });
    });
}

/**
 * Creates the sysDB to keep track of version numbers for databases
 **/
function createSysDB(__openDatabase, success, failure) {
    function sysDbCreateError(tx, err) {
        err = (0, _DOMException.webSQLErrback)(err || tx);
        _CFG2.default.DEBUG && console.log('Error in sysdb transaction - when creating dbVersions', err);
        failure(err);
    }

    if (sysdb) {
        success();
    } else {
        sysdb = __openDatabase(typeof _CFG2.default.memoryDatabase === 'string' ? _CFG2.default.memoryDatabase : _path2.default.join(typeof _CFG2.default.sysDatabaseBasePath === 'string' ? _CFG2.default.sysDatabaseBasePath : _CFG2.default.databaseBasePath || '', '__sysdb__' + (_CFG2.default.addSQLiteExtension !== false ? '.sqlite' : '')), 1, 'System Database', _CFG2.default.DEFAULT_DB_SIZE);
        sysdb.transaction(function (systx) {
            systx.executeSql('CREATE TABLE IF NOT EXISTS dbVersions (name BLOB, version INT);', [], function (systx) {
                if (!_CFG2.default.useSQLiteIndexes) {
                    success();
                    return;
                }
                systx.executeSql('CREATE INDEX IF NOT EXISTS dbvname ON dbVersions(name)', [], success, sysDbCreateError);
            }, sysDbCreateError);
        }, sysDbCreateError);
    }
}

/**
 * IDBFactory Class
 * https://w3c.github.io/IndexedDB/#idl-def-IDBFactory
 * @constructor
 */
function IDBFactory() {
    throw new TypeError('Illegal constructor');
}
var IDBFactoryAlias = IDBFactory;
IDBFactory.__createInstance = function () {
    function IDBFactory() {
        this[Symbol.toStringTag] = 'IDBFactory';
        this.modules = { // Export other shims (especially for testing)
            Event: typeof Event !== 'undefined' ? Event : _Event.ShimEvent,
            Error: Error, // For test comparisons
            ShimEvent: _Event.ShimEvent,
            ShimCustomEvent: _Event.ShimCustomEvent,
            ShimEventTarget: _Event.ShimEventTarget,
            ShimDOMException: _DOMException.ShimDOMException,
            ShimDOMStringList: _DOMStringList2.default,
            IDBFactory: IDBFactoryAlias
        };
        this.utils = { createDOMException: _DOMException.createDOMException }; // Expose for ease in simulating such exceptions during testing
        this.__connections = {};
    }
    IDBFactory.prototype = IDBFactoryAlias.prototype;
    return new IDBFactory();
};

/**
 * The IndexedDB Method to create a new database and return the DB
 * @param {string} name
 * @param {number} version
 */
IDBFactory.prototype.open = function (name /* , version */) {
    var me = this;
    if (!(me instanceof IDBFactory)) {
        throw new TypeError('Illegal invocation');
    }
    var version = arguments[1];

    if (arguments.length === 0) {
        throw new TypeError('Database name is required');
    }
    if (version !== undefined) {
        version = util.enforceRange(version, 'unsigned long long');
        if (version === 0) {
            throw new TypeError('Version cannot be 0');
        }
    }
    if (hasNullOrigin()) {
        throw (0, _DOMException.createDOMException)('SecurityError', 'Cannot open an IndexedDB database from an opaque origin.');
    }

    var req = _IDBRequest.IDBOpenDBRequest.__createInstance();
    var calledDbCreateError = false;

    if (_CFG2.default.autoName && name === '') {
        name = 'autoNamedDatabase_' + nameCounter++;
    }
    name = String(name); // cast to a string
    var sqlSafeName = util.escapeSQLiteStatement(name);

    var useMemoryDatabase = typeof _CFG2.default.memoryDatabase === 'string';
    var useDatabaseCache = _CFG2.default.cacheDatabaseInstances !== false || useMemoryDatabase;

    var escapedDatabaseName = void 0;
    try {
        escapedDatabaseName = util.escapeDatabaseNameForSQLAndFiles(name);
    } catch (err) {
        throw err; // new TypeError('You have supplied a database name which does not match the currently supported configuration, possibly due to a length limit enforced for Node compatibility.');
    }

    function dbCreateError(tx, err) {
        if (calledDbCreateError) {
            return;
        }
        err = err ? (0, _DOMException.webSQLErrback)(err) : tx;
        calledDbCreateError = true;
        // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
        var evt = (0, _Event.createEvent)('error', err, { bubbles: true, cancelable: true });
        req.__readyState = 'done';
        req.__error = err;
        req.__result = undefined; // Must be undefined if an error per `result` getter
        req.dispatchEvent(evt);
    }

    function setupDatabase(tx, db, oldVersion) {
        tx.executeSql('SELECT "name", "keyPath", "autoInc", "indexList" FROM __sys__', [], function (tx, data) {
            function finishRequest() {
                req.__result = connection;
                req.__readyState = 'done'; // https://github.com/w3c/IndexedDB/pull/202
            }
            var connection = _IDBDatabase2.default.__createInstance(db, name, oldVersion, version, data);
            if (!me.__connections[name]) {
                me.__connections[name] = [];
            }
            me.__connections[name].push(connection);

            if (oldVersion < version) {
                var openConnections = me.__connections[name].slice(0, -1);
                triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, version).then(function () {
                    // DB Upgrade in progress
                    var sysdbFinishedCb = function sysdbFinishedCb(systx, err, cb) {
                        if (err) {
                            try {
                                systx.executeSql('ROLLBACK', [], cb, cb);
                            } catch (er) {
                                // Browser may fail with expired transaction above so
                                //     no choice but to manually revert
                                sysdb.transaction(function (systx) {
                                    function reportError(msg) {
                                        throw new Error('Unable to roll back upgrade transaction!' + (msg || ''));
                                    }

                                    // Attempt to revert
                                    if (oldVersion === 0) {
                                        systx.executeSql('DELETE FROM dbVersions WHERE "name" = ?', [sqlSafeName], function () {
                                            cb(reportError);
                                        }, reportError);
                                    } else {
                                        systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [oldVersion, sqlSafeName], cb, reportError);
                                    }
                                });
                            }
                            return;
                        }
                        cb(); // In browser, should auto-commit
                    };

                    sysdb.transaction(function (systx) {
                        function versionSet() {
                            var e = new _IDBVersionChangeEvent2.default('upgradeneeded', { oldVersion: oldVersion, newVersion: version });
                            req.__result = connection;
                            connection.__upgradeTransaction = req.__transaction = req.__result.__versionTransaction = _IDBTransaction2.default.__createInstance(req.__result, req.__result.objectStoreNames, 'versionchange');
                            req.__readyState = 'done';
                            req.transaction.__addNonRequestToTransactionQueue(function onupgradeneeded(tx, args, finished, error) {
                                req.dispatchEvent(e);
                                if (e.__legacyOutputDidListenersThrowError) {
                                    (0, _DOMException.logError)('Error', 'An error occurred in an upgradeneeded handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
                                    req.transaction.__abortTransaction((0, _DOMException.createDOMException)('AbortError', 'A request was aborted.'));
                                    return;
                                }
                                finished();
                            });
                            req.transaction.on__beforecomplete = function (ev) {
                                connection.__upgradeTransaction = null;
                                req.__result.__versionTransaction = null;
                                sysdbFinishedCb(systx, false, function () {
                                    req.transaction.__transFinishedCb(false, function () {
                                        if (useDatabaseCache) {
                                            if (name in websqlDBCache) {
                                                delete websqlDBCache[name][version];
                                            }
                                        }
                                        ev.complete();
                                        req.__transaction = null;
                                    });
                                });
                            };
                            req.transaction.on__preabort = function () {
                                connection.__upgradeTransaction = null;
                                // We ensure any cache is deleted before any request error events fire and try to reopen
                                if (useDatabaseCache) {
                                    if (name in websqlDBCache) {
                                        delete websqlDBCache[name][version];
                                    }
                                }
                            };
                            req.transaction.on__abort = function () {
                                req.__transaction = null;
                                // `readyState` and `result` will be reset anyways by `dbCreateError` but we follow spec:
                                //    see https://github.com/w3c/IndexedDB/issues/161 and
                                //    https://github.com/w3c/IndexedDB/pull/202
                                req.__result = undefined;
                                req.__readyState = 'pending';

                                connection.close();
                                setTimeout(function () {
                                    var err = (0, _DOMException.createDOMException)('AbortError', 'The upgrade transaction was aborted.');
                                    sysdbFinishedCb(systx, err, function (reportError) {
                                        if (oldVersion === 0) {
                                            cleanupDatabaseResources(me.__openDatabase, name, escapedDatabaseName, dbCreateError.bind(null, err), reportError || dbCreateError);
                                            return;
                                        }
                                        dbCreateError(err);
                                    });
                                });
                            };
                            req.transaction.on__complete = function () {
                                if (req.__result.__closed) {
                                    req.__transaction = null;
                                    var err = (0, _DOMException.createDOMException)('AbortError', 'The connection has been closed.');
                                    dbCreateError(err);
                                    return;
                                }
                                // Since this is running directly after `IDBTransaction.complete`,
                                //   there should be a new task. However, while increasing the
                                //   timeout 1ms in `IDBTransaction.__executeRequests` can allow
                                //   `IDBOpenDBRequest.onsuccess` to trigger faster than a new
                                //   transaction as required by "transaction-create_in_versionchange" in
                                //   w3c/Transaction.js (though still on a timeout separate from this
                                //   preceding `IDBTransaction.oncomplete`), this causes a race condition
                                //   somehow with old transactions (e.g., for the Mocha test,
                                //   in `IDBObjectStore.deleteIndex`, "should delete an index that was
                                //   created in a previous transaction").
                                // setTimeout(() => {

                                finishRequest();

                                req.__transaction = null;
                                var e = (0, _Event.createEvent)('success');
                                req.dispatchEvent(e);
                                // });
                            };
                        }
                        if (oldVersion === 0) {
                            systx.executeSql('INSERT INTO dbVersions VALUES (?,?)', [sqlSafeName, version], versionSet, dbCreateError);
                        } else {
                            systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [version, sqlSafeName], versionSet, dbCreateError);
                        }
                    }, dbCreateError, null, function (currentTask, err, done, rollback, commit) {
                        if (currentTask.readOnly || err) {
                            return true;
                        }
                        sysdbFinishedCb = function sysdbFinishedCb(systx, err, cb) {
                            if (err) {
                                rollback(err, cb);
                            } else {
                                commit(cb);
                            }
                        };
                        return false;
                    });
                });
            } else {
                finishRequest();

                var e = (0, _Event.createEvent)('success');
                req.dispatchEvent(e);
            }
        }, dbCreateError);
    }

    function openDB(oldVersion) {
        var db = void 0;
        if ((useMemoryDatabase || useDatabaseCache) && name in websqlDBCache && websqlDBCache[name][version]) {
            db = websqlDBCache[name][version];
        } else {
            db = me.__openDatabase(useMemoryDatabase ? _CFG2.default.memoryDatabase : _path2.default.join(_CFG2.default.databaseBasePath || '', escapedDatabaseName), 1, name, _CFG2.default.DEFAULT_DB_SIZE);
            if (useDatabaseCache) {
                websqlDBCache[name][version] = db;
            }
        }

        if (version === undefined) {
            version = oldVersion || 1;
        }
        if (oldVersion > version) {
            var err = (0, _DOMException.createDOMException)('VersionError', 'An attempt was made to open a database using a lower version than the existing version.', version);
            dbCreateError(err);
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS __sys__ (name BLOB, keyPath BLOB, autoInc BOOLEAN, indexList BLOB, currNum INTEGER)', [], function () {
                function setup() {
                    setupDatabase(tx, db, oldVersion);
                }
                if (!_CFG2.default.createIndexes) {
                    setup();
                    return;
                }
                tx.executeSql('CREATE INDEX IF NOT EXISTS sysname ON __sys__(name)', [], setup, dbCreateError);
            }, dbCreateError);
        }, dbCreateError);
    }

    addRequestToConnectionQueue(req, name, /* origin */undefined, function (req) {
        var latestCachedVersion = void 0;
        if (useDatabaseCache) {
            if (!(name in websqlDBCache)) {
                websqlDBCache[name] = {};
            }
            if (version === undefined) {
                latestCachedVersion = getLatestCachedWebSQLVersion(name);
            } else if (websqlDBCache[name][version]) {
                latestCachedVersion = version;
            }
        }
        if (latestCachedVersion) {
            openDB(latestCachedVersion);
        } else {
            createSysDB(me.__openDatabase, function () {
                sysdb.readTransaction(function (sysReadTx) {
                    sysReadTx.executeSql('SELECT "version" FROM dbVersions WHERE "name" = ?', [sqlSafeName], function (sysReadTx, data) {
                        if (data.rows.length === 0) {
                            // Database with this name does not exist
                            openDB(0);
                        } else {
                            openDB(data.rows.item(0).version);
                        }
                    }, dbCreateError);
                }, dbCreateError);
            }, dbCreateError);
        }
    });

    return req;
};

/**
 * Deletes a database
 * @param {string} name
 * @returns {IDBOpenDBRequest}
 */
IDBFactory.prototype.deleteDatabase = function (name) {
    var me = this;
    if (!(me instanceof IDBFactory)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('Database name is required');
    }
    if (hasNullOrigin()) {
        throw (0, _DOMException.createDOMException)('SecurityError', 'Cannot delete an IndexedDB database from an opaque origin.');
    }

    name = String(name); // cast to a string
    var sqlSafeName = util.escapeSQLiteStatement(name);

    var escapedDatabaseName = void 0;
    try {
        escapedDatabaseName = util.escapeDatabaseNameForSQLAndFiles(name);
    } catch (err) {
        throw err; // throw new TypeError('You have supplied a database name which does not match the currently supported configuration, possibly due to a length limit enforced for Node compatibility.');
    }

    var useMemoryDatabase = typeof _CFG2.default.memoryDatabase === 'string';
    var useDatabaseCache = _CFG2.default.cacheDatabaseInstances !== false || useMemoryDatabase;

    var req = _IDBRequest.IDBOpenDBRequest.__createInstance();
    var calledDBError = false;
    var version = 0;

    var sysdbFinishedCbDelete = function sysdbFinishedCbDelete(err, cb) {
        cb(err);
    };

    // Although the spec has no specific conditions where an error
    //  may occur in `deleteDatabase`, it does provide for
    //  `UnknownError` as we may require upon a SQL deletion error
    function dbError(tx, err) {
        if (calledDBError || err === true) {
            return;
        }
        err = (0, _DOMException.webSQLErrback)(err || tx);
        sysdbFinishedCbDelete(true, function () {
            req.__readyState = 'done';
            req.__error = err;
            req.__result = undefined; // Must be undefined if an error per `result` getter
            // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
            var e = (0, _Event.createEvent)('error', err, { bubbles: true, cancelable: true });
            req.dispatchEvent(e);
            calledDBError = true;
        });
    }

    addRequestToConnectionQueue(req, name, /* origin */undefined, function (req) {
        createSysDB(me.__openDatabase, function () {
            // function callback (cb) { cb(); }
            // callback(function () {

            function completeDatabaseDelete() {
                req.__result = undefined;
                req.__readyState = 'done'; // https://github.com/w3c/IndexedDB/pull/202
                var e = new _IDBVersionChangeEvent2.default('success', { oldVersion: version, newVersion: null });
                req.dispatchEvent(e);
            }

            function databaseDeleted() {
                sysdbFinishedCbDelete(false, function () {
                    if (useDatabaseCache && name in websqlDBCache) {
                        delete websqlDBCache[name]; // New calls will treat as though never existed
                    }
                    delete me.__connections[name];

                    completeDatabaseDelete();
                });
            }
            sysdb.readTransaction(function (sysReadTx) {
                sysReadTx.executeSql('SELECT "version" FROM dbVersions WHERE "name" = ?', [sqlSafeName], function (sysReadTx, data) {
                    if (data.rows.length === 0) {
                        completeDatabaseDelete();
                        return;
                    }
                    version = data.rows.item(0).version;

                    var openConnections = me.__connections[name] || [];
                    triggerAnyVersionChangeAndBlockedEvents(openConnections, req, version, null).then(function () {
                        // Since we need two databases which can't be in a single transaction, we
                        //  do this deleting from `dbVersions` first since the `__sys__` deleting
                        //  only impacts file memory whereas this one is critical for avoiding it
                        //  being found via `open` or `webkitGetDatabaseNames`; however, we will
                        //  avoid committing anyways until all deletions are made and rollback the
                        //  `dbVersions` change if they fail
                        sysdb.transaction(function (systx) {
                            systx.executeSql('DELETE FROM dbVersions WHERE "name" = ? ', [sqlSafeName], function () {
                                // Todo: We should also check whether `dbVersions` is empty and if so, delete upon
                                //    `deleteDatabaseFiles` config. We also ought to do this when aborting (see
                                //    above code with `DELETE FROM dbVersions`)
                                cleanupDatabaseResources(me.__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError);
                            }, dbError);
                        }, dbError, null, function (currentTask, err, done, rollback, commit) {
                            if (currentTask.readOnly || err) {
                                return true;
                            }
                            sysdbFinishedCbDelete = function sysdbFinishedCbDelete(err, cb) {
                                if (err) {
                                    rollback(err, cb);
                                } else {
                                    commit(cb);
                                }
                            };
                            return false;
                        });
                    }, dbError);
                }, dbError);
            });
        }, dbError);
    });

    return req;
};

IDBFactory.prototype.cmp = function (key1, key2) {
    if (!(this instanceof IDBFactory)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length < 2) {
        throw new TypeError('You must provide two keys to be compared');
    }
    // We use encoding facilities already built for proper sorting;
    //   the following "conversions" are for validation only
    Key.convertValueToKeyRethrowingAndIfInvalid(key1);
    Key.convertValueToKeyRethrowingAndIfInvalid(key2);
    return (0, _cmp2.default)(key1, key2);
};

/**
* NON-STANDARD!! (Also may return outdated information if a database has since been deleted)
* @link https://www.w3.org/Bugs/Public/show_bug.cgi?id=16137
* @link http://lists.w3.org/Archives/Public/public-webapps/2011JulSep/1537.html
*/
IDBFactory.prototype.webkitGetDatabaseNames = function () {
    var me = this;
    if (!(me instanceof IDBFactory)) {
        throw new TypeError('Illegal invocation');
    }
    if (hasNullOrigin()) {
        throw (0, _DOMException.createDOMException)('SecurityError', 'Cannot get IndexedDB database names from an opaque origin.');
    }

    var calledDbCreateError = false;
    function dbGetDatabaseNamesError(tx, err) {
        if (calledDbCreateError) {
            return;
        }
        err = err ? (0, _DOMException.webSQLErrback)(err) : tx;
        calledDbCreateError = true;
        // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
        var evt = (0, _Event.createEvent)('error', err, { bubbles: true, cancelable: true }); // http://stackoverflow.com/questions/40165909/to-where-do-idbopendbrequest-error-events-bubble-up/40181108#40181108
        req.__readyState = 'done';
        req.__error = err;
        req.__result = undefined; // Must be undefined if an error per `result` getter
        req.dispatchEvent(evt);
    }
    var req = _IDBRequest.IDBRequest.__createInstance();
    createSysDB(me.__openDatabase, function () {
        sysdb.readTransaction(function (sysReadTx) {
            sysReadTx.executeSql('SELECT "name" FROM dbVersions', [], function (sysReadTx, data) {
                var dbNames = _DOMStringList2.default.__createInstance();
                for (var i = 0; i < data.rows.length; i++) {
                    dbNames.push(util.unescapeSQLiteResponse(data.rows.item(i).name));
                }
                req.__result = dbNames;
                req.__readyState = 'done'; // https://github.com/w3c/IndexedDB/pull/202
                var e = (0, _Event.createEvent)('success'); // http://stackoverflow.com/questions/40165909/to-where-do-idbopendbrequest-error-events-bubble-up/40181108#40181108
                req.dispatchEvent(e);
            }, dbGetDatabaseNamesError);
        }, dbGetDatabaseNamesError);
    }, dbGetDatabaseNamesError);
    return req;
};

/**
* @Todo __forceClose: Test
* This is provided to facilitate unit-testing of the
*  closing of a database connection with a forced flag:
* <http://w3c.github.io/IndexedDB/#steps-for-closing-a-database-connection>
*/
IDBFactory.prototype.__forceClose = function (dbName, connIdx, msg) {
    var me = this;
    function forceClose(conn) {
        conn.__forceClose(msg);
    }
    if (dbName == null) {
        Object.values(me.__connections).forEach(function (conn) {
            return conn.forEach(forceClose);
        });
    } else if (!me.__connections[dbName]) {
        console.log('No database connections with that name to force close');
    } else if (connIdx == null) {
        me.__connections[dbName].forEach(forceClose);
    } else if (!Number.isInteger(connIdx) || connIdx < 0 || connIdx > me.__connections[dbName].length - 1) {
        throw new TypeError('If providing an argument, __forceClose must be called with a ' + 'numeric index to indicate a specific connection to lose');
    } else {
        forceClose(me.__connections[dbName][connIdx]);
    }
};

IDBFactory.prototype.__setConnectionQueueOrigin = function () {
    var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getOrigin();

    connectionQueue[origin] = {};
};

IDBFactory.prototype[Symbol.toStringTag] = 'IDBFactoryPrototype';

Object.defineProperty(IDBFactory, 'prototype', {
    writable: false
});

var shimIndexedDB = IDBFactory.__createInstance();
exports.IDBFactory = IDBFactory;
exports.cmp = _cmp2.default;
exports.shimIndexedDB = shimIndexedDB;

}).call(this,require('_process'))

},{"./CFG":9,"./DOMException":10,"./DOMStringList":11,"./Event":12,"./IDBDatabase":14,"./IDBRequest":19,"./IDBTransaction":20,"./IDBVersionChangeEvent":21,"./Key":22,"./cmp":26,"./util":28,"_process":4,"fs":1,"path":3,"sync-promise":5}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.IDBIndex = exports.executeFetchIndexData = exports.buildFetchIndexDataSQL = undefined;

var _DOMException = require('./DOMException');

var _IDBCursor = require('./IDBCursor');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _Key = require('./Key');

var Key = _interopRequireWildcard(_Key);

var _IDBKeyRange = require('./IDBKeyRange');

var _IDBTransaction = require('./IDBTransaction');

var _IDBTransaction2 = _interopRequireDefault(_IDBTransaction);

var _Sca = require('./Sca');

var Sca = _interopRequireWildcard(_Sca);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _IDBObjectStore = require('./IDBObjectStore');

var _IDBObjectStore2 = _interopRequireDefault(_IDBObjectStore);

var _syncPromise = require('sync-promise');

var _syncPromise2 = _interopRequireDefault(_syncPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var readonlyProperties = ['objectStore', 'keyPath', 'multiEntry', 'unique'];

/**
 * IDB Index
 * http://www.w3.org/TR/IndexedDB/#idl-def-IDBIndex
 * @param {IDBObjectStore} store
 * @param {IDBIndexProperties} indexProperties
 * @constructor
 */
function IDBIndex() {
    throw new TypeError('Illegal constructor');
}
var IDBIndexAlias = IDBIndex;
IDBIndex.__createInstance = function (store, indexProperties) {
    function IDBIndex() {
        var me = this;
        me[Symbol.toStringTag] = 'IDBIndex';
        util.defineReadonlyProperties(me, readonlyProperties);
        me.__objectStore = store;
        me.__name = me.__originalName = indexProperties.columnName;
        me.__keyPath = Array.isArray(indexProperties.keyPath) ? indexProperties.keyPath.slice() : indexProperties.keyPath;
        var optionalParams = indexProperties.optionalParams;
        me.__multiEntry = !!(optionalParams && optionalParams.multiEntry);
        me.__unique = !!(optionalParams && optionalParams.unique);
        me.__deleted = !!indexProperties.__deleted;
        me.__objectStore.__cursors = indexProperties.cursors || [];
        Object.defineProperty(me, '__currentName', {
            get: function get() {
                return '__pendingName' in me ? me.__pendingName : me.name;
            }
        });
        Object.defineProperty(me, 'name', {
            enumerable: false,
            configurable: false,
            get: function get() {
                return this.__name;
            },
            set: function set(newName) {
                var me = this;
                newName = util.convertToDOMString(newName);
                var oldName = me.name;
                _IDBTransaction2.default.__assertVersionChange(me.objectStore.transaction);
                _IDBTransaction2.default.__assertActive(me.objectStore.transaction);
                IDBIndexAlias.__invalidStateIfDeleted(me);
                _IDBObjectStore2.default.__invalidStateIfDeleted(me);
                if (newName === oldName) {
                    return;
                }

                if (me.objectStore.__indexes[newName] && !me.objectStore.__indexes[newName].__deleted && !me.objectStore.__indexes[newName].__pendingDelete) {
                    throw (0, _DOMException.createDOMException)('ConstraintError', 'Index "' + newName + '" already exists on ' + me.objectStore.__currentName);
                }

                me.__name = newName;

                var objectStore = me.objectStore;
                delete objectStore.__indexes[oldName];
                objectStore.__indexes[newName] = me;
                objectStore.indexNames.splice(objectStore.indexNames.indexOf(oldName), 1, newName);

                var storeHandle = objectStore.transaction.__storeHandles[objectStore.name];
                var oldIndexHandle = storeHandle.__indexHandles[oldName];
                oldIndexHandle.__name = newName; // Fix old references
                storeHandle.__indexHandles[newName] = oldIndexHandle; // Ensure new reference accessible
                me.__pendingName = oldName;

                var colInfoToPreserveArr = [['key', 'BLOB ' + (objectStore.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY')], ['value', 'BLOB']].concat([].concat(_toConsumableArray(objectStore.indexNames)).filter(function (indexName) {
                    return indexName !== newName;
                }).map(function (indexName) {
                    return [util.escapeIndexNameForSQL(indexName), 'BLOB'];
                }));

                me.__renameIndex(objectStore, oldName, newName, colInfoToPreserveArr, function (tx, success) {
                    IDBIndexAlias.__updateIndexList(store, tx, function (store) {
                        delete storeHandle.__pendingName;
                        success(store);
                    });
                });
            }
        });
    }
    IDBIndex.prototype = IDBIndexAlias.prototype;
    return new IDBIndex();
};

IDBIndex.__invalidStateIfDeleted = function (index, msg) {
    if (index.__deleted || index.__pendingDelete || index.__pendingCreate && index.objectStore.transaction && index.objectStore.transaction.__errored) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', msg || 'This index has been deleted');
    }
};

/**
 * Clones an IDBIndex instance for a different IDBObjectStore instance.
 * @param {IDBIndex} index
 * @param {IDBObjectStore} store
 * @protected
 */
IDBIndex.__clone = function (index, store) {
    var idx = IDBIndex.__createInstance(store, {
        columnName: index.name,
        keyPath: index.keyPath,
        optionalParams: {
            multiEntry: index.multiEntry,
            unique: index.unique
        }
    });
    ['__pendingCreate', '__pendingDelete', '__deleted', '__originalName', '__recreated'].forEach(function (p) {
        idx[p] = index[p];
    });
    return idx;
};

/**
 * Creates a new index on an object store.
 * @param {IDBObjectStore} store
 * @param {IDBIndex} index
 * @returns {IDBIndex}
 * @protected
 */
IDBIndex.__createIndex = function (store, index) {
    var indexName = index.name;
    var storeName = store.__currentName;
    var idx = store.__indexes[indexName];

    index.__pendingCreate = true;

    // Add the index to the IDBObjectStore
    store.indexNames.push(indexName);
    store.__indexes[indexName] = index; // We add to indexes as needs to be available, e.g., if there is a subsequent deleteIndex call

    var indexHandle = store.__indexHandles[indexName];
    if (!indexHandle || index.__pendingDelete || index.__deleted || indexHandle.__pendingDelete || indexHandle.__deleted) {
        indexHandle = store.__indexHandles[indexName] = IDBIndex.__clone(index, store);
    }

    // Create the index in WebSQL
    var transaction = store.transaction;
    transaction.__addNonRequestToTransactionQueue(function createIndex(tx, args, success, failure) {
        var columnExists = idx && (idx.__deleted || idx.__recreated); // This check must occur here rather than earlier as properties may not have been set yet otherwise
        var indexValues = {};

        function error(tx, err) {
            failure((0, _DOMException.createDOMException)('UnknownError', 'Could not create index "' + indexName + '"' + err.code + '::' + err.message, err));
        }

        function applyIndex(tx) {
            // Update the object store's index list
            IDBIndex.__updateIndexList(store, tx, function () {
                // Add index entries for all existing records
                tx.executeSql('SELECT "key", "value" FROM ' + util.escapeStoreNameForSQL(storeName), [], function (tx, data) {
                    _CFG2.default.DEBUG && console.log('Adding existing ' + storeName + ' records to the ' + indexName + ' index');
                    addIndexEntry(0);

                    function addIndexEntry(i) {
                        if (i < data.rows.length) {
                            try {
                                var value = Sca.decode(util.unescapeSQLiteResponse(data.rows.item(i).value));
                                var indexKey = Key.extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Todo: Do we need this stricter error checking?
                                if (indexKey.invalid || indexKey.failure) {
                                    // Todo: Do we need invalid checks and should we instead treat these as being duplicates?
                                    throw new Error('Go to catch; ignore bad indexKey');
                                }
                                indexKey = Key.encode(indexKey.value, index.multiEntry);
                                if (index.unique) {
                                    if (indexValues[indexKey]) {
                                        indexValues = {};
                                        failure((0, _DOMException.createDOMException)('ConstraintError', 'Duplicate values already exist within the store'));
                                        return;
                                    }
                                    indexValues[indexKey] = true;
                                }

                                tx.executeSql('UPDATE ' + util.escapeStoreNameForSQL(storeName) + ' SET ' + util.escapeIndexNameForSQL(indexName) + ' = ? WHERE "key" = ?', [util.escapeSQLiteStatement(indexKey), data.rows.item(i).key], function (tx, data) {
                                    addIndexEntry(i + 1);
                                }, error);
                            } catch (e) {
                                // Not a valid value to insert into index, so just continue
                                addIndexEntry(i + 1);
                            }
                        } else {
                            delete index.__pendingCreate;
                            delete indexHandle.__pendingCreate;
                            if (index.__deleted) {
                                delete index.__deleted;
                                delete indexHandle.__deleted;
                                index.__recreated = true;
                                indexHandle.__recreated = true;
                            }
                            indexValues = {};
                            success(store);
                        }
                    }
                }, error);
            }, error);
        }

        var escapedStoreNameSQL = util.escapeStoreNameForSQL(storeName);
        var escapedIndexNameSQL = util.escapeIndexNameForSQL(index.name);

        function addIndexSQL(tx) {
            if (!_CFG2.default.useSQLiteIndexes) {
                applyIndex(tx);
                return;
            }
            tx.executeSql('CREATE INDEX IF NOT EXISTS "' +
            // The escaped index name must be unique among indexes in the whole database;
            //    so we prefix with store name; as prefixed, will also not conflict with
            //    index on `key`
            // Avoid quotes and separate with special escape sequence
            escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1) + '" ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')', [], applyIndex, error);
        }

        if (columnExists) {
            // For a previously existing index, just update the index entries in the existing column;
            //   no need to add SQLite index to it either as should already exist
            applyIndex(tx);
        } else {
            // For a new index, add a new column to the object store, then apply the index
            var sql = ['ALTER TABLE', escapedStoreNameSQL, 'ADD', escapedIndexNameSQL, 'BLOB'].join(' ');
            _CFG2.default.DEBUG && console.log(sql);
            tx.executeSql(sql, [], addIndexSQL, error);
        }
    }, undefined, store);
};

/**
 * Deletes an index from an object store.
 * @param {IDBObjectStore} store
 * @param {IDBIndex} index
 * @protected
 */
IDBIndex.__deleteIndex = function (store, index) {
    // Remove the index from the IDBObjectStore
    index.__pendingDelete = true;
    var indexHandle = store.__indexHandles[index.name];
    if (indexHandle) {
        indexHandle.__pendingDelete = true;
    }

    store.indexNames.splice(store.indexNames.indexOf(index.name), 1);

    // Remove the index in WebSQL
    var transaction = store.transaction;
    transaction.__addNonRequestToTransactionQueue(function deleteIndex(tx, args, success, failure) {
        function error(tx, err) {
            failure((0, _DOMException.createDOMException)('UnknownError', 'Could not delete index "' + index.name + '"', err));
        }

        function finishDeleteIndex() {
            // Update the object store's index list
            IDBIndex.__updateIndexList(store, tx, function (store) {
                delete index.__pendingDelete;
                delete index.__recreated;
                index.__deleted = true;
                if (indexHandle) {
                    indexHandle.__deleted = true;
                    delete indexHandle.__pendingDelete;
                }
                success(store);
            }, error);
        }

        if (!_CFG2.default.useSQLiteIndexes) {
            finishDeleteIndex();
            return;
        }
        tx.executeSql('DROP INDEX IF EXISTS ' + util.sqlQuote(util.escapeStoreNameForSQL(store.name).slice(1, -1) + '^5' + util.escapeIndexNameForSQL(index.name).slice(1, -1)), [], finishDeleteIndex, error);
    }, undefined, store);
};

/**
 * Updates index list for the given object store.
 * @param {IDBObjectStore} store
 * @param {object} tx
 * @param {function} success
 * @param {function} failure
 */
IDBIndex.__updateIndexList = function (store, tx, success, failure) {
    var indexList = {};
    for (var i = 0; i < store.indexNames.length; i++) {
        var idx = store.__indexes[store.indexNames[i]];
        /** @type {IDBIndexProperties} **/
        indexList[idx.name] = {
            columnName: idx.name,
            keyPath: idx.keyPath,
            optionalParams: {
                unique: idx.unique,
                multiEntry: idx.multiEntry
            },
            deleted: !!idx.deleted
        };
    }

    _CFG2.default.DEBUG && console.log('Updating the index list for ' + store.__currentName, indexList);
    tx.executeSql('UPDATE __sys__ SET "indexList" = ? WHERE "name" = ?', [JSON.stringify(indexList), util.escapeSQLiteStatement(store.__currentName)], function () {
        success(store);
    }, failure);
};

/**
 * Retrieves index data for the given key
 * @param {*|IDBKeyRange} range
 * @param {string} opType
 * @param {boolean} nullDisallowed
 * @param {number} count
 * @returns {IDBRequest}
 * @private
 */
IDBIndex.prototype.__fetchIndexData = function (range, opType, nullDisallowed, count) {
    var me = this;
    if (count !== undefined) {
        count = util.enforceRange(count, 'unsigned long');
    }

    IDBIndex.__invalidStateIfDeleted(me);
    _IDBObjectStore2.default.__invalidStateIfDeleted(me.objectStore);
    if (me.objectStore.__deleted) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', "This index's object store has been deleted");
    }
    _IDBTransaction2.default.__assertActive(me.objectStore.transaction);

    if (nullDisallowed && range == null) {
        throw (0, _DOMException.createDOMException)('DataError', 'No key or range was specified');
    }

    var fetchArgs = buildFetchIndexDataSQL(nullDisallowed, me, range, opType, false);
    return me.objectStore.transaction.__addToTransactionQueue(function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        executeFetchIndexData.apply(undefined, [count].concat(_toConsumableArray(fetchArgs), args));
    }, undefined, me);
};

/**
 * Opens a cursor over the given key range.
 * @param {*|IDBKeyRange} query
 * @param {string} direction
 * @returns {IDBRequest}
 */
IDBIndex.prototype.openCursor = function () /* query, direction */{
    var me = this;

    var _arguments = Array.prototype.slice.call(arguments),
        query = _arguments[0],
        direction = _arguments[1];

    var cursor = _IDBCursor.IDBCursorWithValue.__createInstance(query, direction, me.objectStore, me, util.escapeIndexNameForSQLKeyColumn(me.name), 'value');
    me.__objectStore.__cursors.push(cursor);
    return cursor.__req;
};

/**
 * Opens a cursor over the given key range.  The cursor only includes key values, not data.
 * @param {*|IDBKeyRange} query
 * @param {string} direction
 * @returns {IDBRequest}
 */
IDBIndex.prototype.openKeyCursor = function () /* query, direction */{
    var me = this;

    var _arguments2 = Array.prototype.slice.call(arguments),
        query = _arguments2[0],
        direction = _arguments2[1];

    var cursor = _IDBCursor.IDBCursor.__createInstance(query, direction, me.objectStore, me, util.escapeIndexNameForSQLKeyColumn(me.name), 'key');
    me.__objectStore.__cursors.push(cursor);
    return cursor.__req;
};

IDBIndex.prototype.get = function (query) {
    if (!arguments.length) {
        // Per https://heycam.github.io/webidl/
        throw new TypeError('A parameter was missing for `IDBIndex.get`.');
    }
    return this.__fetchIndexData(query, 'value', true);
};

IDBIndex.prototype.getKey = function (query) {
    if (!arguments.length) {
        // Per https://heycam.github.io/webidl/
        throw new TypeError('A parameter was missing for `IDBIndex.getKey`.');
    }
    return this.__fetchIndexData(query, 'key', true);
};

IDBIndex.prototype.getAll = function () /* query, count */{
    var _arguments3 = Array.prototype.slice.call(arguments),
        query = _arguments3[0],
        count = _arguments3[1];

    return this.__fetchIndexData(query, 'value', false, count);
};

IDBIndex.prototype.getAllKeys = function () /* query, count */{
    var _arguments4 = Array.prototype.slice.call(arguments),
        query = _arguments4[0],
        count = _arguments4[1];

    return this.__fetchIndexData(query, 'key', false, count);
};

IDBIndex.prototype.count = function () /* query */{
    var me = this;
    var query = arguments[0];
    // With the exception of needing to check whether the index has been
    //  deleted, we could, for greater spec parity (if not accuracy),
    //  just call:
    //  `return me.__objectStore.count(query);`

    if (util.instanceOf(query, _IDBKeyRange.IDBKeyRange)) {
        // Todo: Do we need this block?
        // We don't need to add to cursors array since has the count parameter which won't cache
        return _IDBCursor.IDBCursorWithValue.__createInstance(query, 'next', me.objectStore, me, util.escapeIndexNameForSQLKeyColumn(me.name), 'value', true).__req;
    }
    return me.__fetchIndexData(query, 'count', false);
};

IDBIndex.prototype.__renameIndex = function (store, oldName, newName) {
    var colInfoToPreserveArr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    var newNameType = 'BLOB';
    var storeName = store.__currentName;
    var escapedStoreNameSQL = util.escapeStoreNameForSQL(storeName);
    var escapedNewIndexNameSQL = util.escapeIndexNameForSQL(newName);
    var escapedTmpStoreNameSQL = util.sqlQuote('tmp_' + util.escapeStoreNameForSQL(storeName).slice(1, -1));
    var colNamesToPreserve = colInfoToPreserveArr.map(function (colInfo) {
        return colInfo[0];
    });
    var colInfoToPreserve = colInfoToPreserveArr.map(function (colInfo) {
        return colInfo.join(' ');
    });
    var listColInfoToPreserve = colInfoToPreserve.length ? colInfoToPreserve.join(', ') + ', ' : '';
    var listColsToPreserve = colNamesToPreserve.length ? colNamesToPreserve.join(', ') + ', ' : '';

    // We could adapt the approach at http://stackoverflow.com/a/8430746/271577
    //    to make the approach reusable without passing column names, but it is a bit fragile
    store.transaction.__addNonRequestToTransactionQueue(function renameIndex(tx, args, success, error) {
        function sqlError(tx, err) {
            error(err);
        }
        function finish() {
            if (cb) {
                cb(tx, success);
                return;
            }
            success();
        }
        // See https://www.sqlite.org/lang_altertable.html#otheralter
        // We don't query for indexes as we already have the info
        // This approach has the advantage of auto-deleting indexes via the DROP TABLE
        var sql = 'CREATE TABLE ' + escapedTmpStoreNameSQL + '(' + listColInfoToPreserve + escapedNewIndexNameSQL + ' ' + newNameType + ')';
        _CFG2.default.DEBUG && console.log(sql);
        tx.executeSql(sql, [], function () {
            var sql = 'INSERT INTO ' + escapedTmpStoreNameSQL + '(' + listColsToPreserve + escapedNewIndexNameSQL + ') SELECT ' + listColsToPreserve + util.escapeIndexNameForSQL(oldName) + ' FROM ' + escapedStoreNameSQL;
            _CFG2.default.DEBUG && console.log(sql);
            tx.executeSql(sql, [], function () {
                var sql = 'DROP TABLE ' + escapedStoreNameSQL;
                _CFG2.default.DEBUG && console.log(sql);
                tx.executeSql(sql, [], function () {
                    var sql = 'ALTER TABLE ' + escapedTmpStoreNameSQL + ' RENAME TO ' + escapedStoreNameSQL;
                    _CFG2.default.DEBUG && console.log(sql);
                    tx.executeSql(sql, [], function (tx, data) {
                        if (!_CFG2.default.useSQLiteIndexes) {
                            finish();
                            return;
                        }
                        var indexCreations = colNamesToPreserve.slice(2) // Doing `key` separately and no need for index on `value`
                        .map(function (escapedIndexNameSQL) {
                            return new _syncPromise2.default(function (resolve, reject) {
                                var escapedIndexToRecreate = util.sqlQuote(escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1));
                                // const sql = 'DROP INDEX IF EXISTS ' + escapedIndexToRecreate;
                                // CFG.DEBUG && console.log(sql);
                                // tx.executeSql(sql, [], function () {
                                var sql = 'CREATE INDEX ' + escapedIndexToRecreate + ' ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')';
                                _CFG2.default.DEBUG && console.log(sql);
                                tx.executeSql(sql, [], resolve, function (tx, err) {
                                    reject(err);
                                });
                                // }, function (tx, err) {
                                //    reject(err);
                                // });
                            });
                        });
                        indexCreations.push(new _syncPromise2.default(function (resolve, reject) {
                            var escapedIndexToRecreate = util.sqlQuote('sk_' + escapedStoreNameSQL.slice(1, -1));
                            // Chrome erring here if not dropped first; Node does not
                            var sql = 'DROP INDEX IF EXISTS ' + escapedIndexToRecreate;
                            _CFG2.default.DEBUG && console.log(sql);
                            tx.executeSql(sql, [], function () {
                                var sql = 'CREATE INDEX ' + escapedIndexToRecreate + ' ON ' + escapedStoreNameSQL + '("key")';
                                _CFG2.default.DEBUG && console.log(sql);
                                tx.executeSql(sql, [], resolve, function (tx, err) {
                                    reject(err);
                                });
                            }, function (tx, err) {
                                reject(err);
                            });
                        }));
                        _syncPromise2.default.all(indexCreations).then(finish, error);
                    }, sqlError);
                }, sqlError);
            }, sqlError);
        }, sqlError);
    });
};

Object.defineProperty(IDBIndex, Symbol.hasInstance, {
    value: function value(obj) {
        return util.isObj(obj) && typeof obj.openCursor === 'function' && typeof obj.multiEntry === 'boolean';
    }
});

readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBIndex.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});
Object.defineProperty(IDBIndex.prototype, 'name', {
    enumerable: true,
    configurable: true,
    get: function get() {
        throw new TypeError('Illegal invocation');
    },
    set: function set(val) {
        throw new TypeError('Illegal invocation');
    }
});
IDBIndex.prototype[Symbol.toStringTag] = 'IDBIndexPrototype';

Object.defineProperty(IDBIndex, 'prototype', {
    writable: false
});

function executeFetchIndexData(count, unboundedDisallowed, index, hasKey, range, opType, multiChecks, sql, sqlValues, tx, args, success, error) {
    if (unboundedDisallowed) {
        count = 1;
    }
    if (count) {
        sql.push('LIMIT', count);
    }
    var isCount = opType === 'count';
    _CFG2.default.DEBUG && console.log('Trying to fetch data for Index', sql.join(' '), sqlValues);
    tx.executeSql(sql.join(' '), sqlValues, function (tx, data) {
        var records = [];
        var recordCount = 0;
        var decode = isCount ? function () {} : opType === 'key' ? function (record) {
            // Key.convertValueToKey(record.key); // Already validated before storage
            return Key.decode(util.unescapeSQLiteResponse(record.key));
        } : function (record) {
            // when opType is value
            return Sca.decode(util.unescapeSQLiteResponse(record.value));
        };
        if (index.multiEntry) {
            var escapedIndexNameForKeyCol = util.escapeIndexNameForSQLKeyColumn(index.name);
            var encodedKey = Key.encode(range, index.multiEntry);

            var _loop = function _loop(i) {
                var row = data.rows.item(i);
                var rowKey = Key.decode(row[escapedIndexNameForKeyCol]);
                var record = void 0;
                if (hasKey && (multiChecks && range.some(function (check) {
                    return rowKey.includes(check);
                }) || // More precise than our SQL
                Key.isMultiEntryMatch(encodedKey, row[escapedIndexNameForKeyCol]))) {
                    recordCount++;
                    record = row;
                } else if (!hasKey && !multiChecks) {
                    if (rowKey !== undefined) {
                        recordCount += Array.isArray(rowKey) ? rowKey.length : 1;
                        record = row;
                    }
                }
                if (record) {
                    records.push(decode(record));
                    if (unboundedDisallowed) {
                        return 'break';
                    }
                }
            };

            for (var i = 0; i < data.rows.length; i++) {
                var _ret = _loop(i);

                if (_ret === 'break') break;
            }
        } else {
            for (var i = 0; i < data.rows.length; i++) {
                var _record = data.rows.item(i);
                if (_record) {
                    records.push(decode(_record));
                }
            }
            recordCount = records.length;
        }
        if (isCount) {
            success(recordCount);
        } else if (recordCount === 0) {
            success(unboundedDisallowed ? undefined : []);
        } else {
            success(unboundedDisallowed ? records[0] : records);
        }
    }, error);
}

function buildFetchIndexDataSQL(nullDisallowed, index, range, opType, multiChecks) {
    var hasRange = nullDisallowed || range != null;
    var col = opType === 'count' ? 'key' : opType; // It doesn't matter which column we use for 'count' as long as it is valid
    var sql = ['SELECT', util.sqlQuote(col) + (index.multiEntry ? ', ' + util.escapeIndexNameForSQL(index.name) : ''), 'FROM', util.escapeStoreNameForSQL(index.objectStore.__currentName), 'WHERE', util.escapeIndexNameForSQL(index.name), 'NOT NULL'];
    var sqlValues = [];
    if (hasRange) {
        if (multiChecks) {
            sql.push('AND (');
            range.forEach(function (innerKey, i) {
                if (i > 0) sql.push('OR');
                sql.push(util.escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^' ");
                sqlValues.push('%' + util.sqlLIKEEscape(Key.encode(innerKey, index.multiEntry)) + '%');
            });
            sql.push(')');
        } else if (index.multiEntry) {
            sql.push('AND', util.escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^'");
            sqlValues.push('%' + util.sqlLIKEEscape(Key.encode(range, index.multiEntry)) + '%');
        } else {
            var convertedRange = (0, _IDBKeyRange.convertValueToKeyRange)(range, nullDisallowed);
            (0, _IDBKeyRange.setSQLForKeyRange)(convertedRange, util.escapeIndexNameForSQL(index.name), sql, sqlValues, true, false);
        }
    }
    return [nullDisallowed, index, hasRange, range, opType, multiChecks, sql, sqlValues];
}

exports.buildFetchIndexDataSQL = buildFetchIndexDataSQL;
exports.executeFetchIndexData = executeFetchIndexData;
exports.IDBIndex = IDBIndex;
exports.default = IDBIndex;

},{"./CFG":9,"./DOMException":10,"./IDBCursor":13,"./IDBKeyRange":17,"./IDBObjectStore":18,"./IDBTransaction":20,"./Key":22,"./Sca":23,"./util":28,"sync-promise":5}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.convertValueToKeyRange = exports.IDBKeyRange = exports.setSQLForKeyRange = undefined;

var _DOMException = require('./DOMException');

var _Key = require('./Key');

var Key = _interopRequireWildcard(_Key);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var readonlyProperties = ['lower', 'upper', 'lowerOpen', 'upperOpen'];

/**
 * The IndexedDB KeyRange object
 * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#dfn-key-range
 * @param {Object} lower
 * @param {Object} upper
 * @param {Object} lowerOpen
 * @param {Object} upperOpen
 */
function IDBKeyRange() {
    throw new TypeError('Illegal constructor');
}
var IDBKeyRangeAlias = IDBKeyRange;
IDBKeyRange.__createInstance = function (lower, upper, lowerOpen, upperOpen) {
    function IDBKeyRange() {
        this[Symbol.toStringTag] = 'IDBKeyRange';
        if (lower === undefined && upper === undefined) {
            throw (0, _DOMException.createDOMException)('DataError', 'Both arguments to the key range method cannot be undefined');
        }
        var lowerConverted = void 0,
            upperConverted = void 0;
        if (lower !== undefined) {
            lowerConverted = Key.roundTrip(lower); // Todo: does this make the "conversions" redundant
            Key.convertValueToKeyRethrowingAndIfInvalid(lower);
        }
        if (upper !== undefined) {
            upperConverted = Key.roundTrip(upper); // Todo: does this make the "conversions" redundant
            Key.convertValueToKeyRethrowingAndIfInvalid(upper);
        }
        if (lower !== undefined && upper !== undefined && lower !== upper) {
            if (Key.encode(lower) > Key.encode(upper)) {
                throw (0, _DOMException.createDOMException)('DataError', '`lower` must not be greater than `upper` argument in `bound()` call.');
            }
        }

        this.__lower = lowerConverted;
        this.__upper = upperConverted;
        this.__lowerOpen = !!lowerOpen;
        this.__upperOpen = !!upperOpen;
    }
    IDBKeyRange.prototype = IDBKeyRangeAlias.prototype;
    return new IDBKeyRange();
};
IDBKeyRange.prototype.includes = function (key) {
    // We can't do a regular instanceof check as it will create a loop given our hasInstance implementation
    if (!util.isObj(this) || typeof this.__lowerOpen !== 'boolean') {
        throw new TypeError('Illegal invocation');
    }
    if (!arguments.length) {
        throw new TypeError('IDBKeyRange.includes requires a key argument');
    }
    Key.convertValueToKeyRethrowingAndIfInvalid(key);
    return Key.isKeyInRange(key, this);
};

IDBKeyRange.only = function (value) {
    if (!arguments.length) {
        throw new TypeError('IDBKeyRange.only requires a value argument');
    }
    return IDBKeyRange.__createInstance(value, value, false, false);
};

IDBKeyRange.lowerBound = function (value /*, open */) {
    if (!arguments.length) {
        throw new TypeError('IDBKeyRange.lowerBound requires a value argument');
    }
    return IDBKeyRange.__createInstance(value, undefined, arguments[1], true);
};
IDBKeyRange.upperBound = function (value /*, open */) {
    if (!arguments.length) {
        throw new TypeError('IDBKeyRange.upperBound requires a value argument');
    }
    return IDBKeyRange.__createInstance(undefined, value, true, arguments[1]);
};
IDBKeyRange.bound = function (lower, upper /* , lowerOpen, upperOpen */) {
    if (arguments.length <= 1) {
        throw new TypeError('IDBKeyRange.bound requires lower and upper arguments');
    }
    return IDBKeyRange.__createInstance(lower, upper, arguments[2], arguments[3]);
};
IDBKeyRange.prototype[Symbol.toStringTag] = 'IDBKeyRangePrototype';

readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBKeyRange.prototype, '__' + prop, {
        enumerable: false,
        configurable: false,
        writable: true
    });
    Object.defineProperty(IDBKeyRange.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            // We can't do a regular instanceof check as it will create a loop given our hasInstance implementation
            if (!util.isObj(this) || typeof this.__lowerOpen !== 'boolean') {
                throw new TypeError('Illegal invocation');
            }
            return this['__' + prop];
        }
    });
});

Object.defineProperty(IDBKeyRange, Symbol.hasInstance, {
    value: function value(obj) {
        return util.isObj(obj) && 'upper' in obj && typeof obj.lowerOpen === 'boolean';
    }
});

Object.defineProperty(IDBKeyRange, 'prototype', {
    writable: false
});

function setSQLForKeyRange(range, quotedKeyColumnName, sql, sqlValues, addAnd, checkCached) {
    if (range && (range.lower !== undefined || range.upper !== undefined)) {
        if (addAnd) sql.push('AND');
        var encodedLowerKey = void 0,
            encodedUpperKey = void 0;
        var hasLower = range.lower !== undefined;
        var hasUpper = range.upper !== undefined;
        if (hasLower) {
            encodedLowerKey = checkCached ? range.__lowerCached : Key.encode(range.lower);
        }
        if (hasUpper) {
            encodedUpperKey = checkCached ? range.__upperCached : Key.encode(range.upper);
        }
        if (hasLower) {
            sqlValues.push(util.escapeSQLiteStatement(encodedLowerKey));
            if (hasUpper && encodedLowerKey === encodedUpperKey && !range.lowerOpen && !range.upperOpen) {
                sql.push(quotedKeyColumnName, '=', '?');
                return;
            }
            sql.push(quotedKeyColumnName, range.lowerOpen ? '>' : '>=', '?');
        }
        hasLower && hasUpper && sql.push('AND');
        if (hasUpper) {
            sql.push(quotedKeyColumnName, range.upperOpen ? '<' : '<=', '?');
            sqlValues.push(util.escapeSQLiteStatement(encodedUpperKey));
        }
    }
}

function convertValueToKeyRange(value, nullDisallowed) {
    if (util.instanceOf(value, IDBKeyRange)) {
        // We still need to validate IDBKeyRange-like objects (the above check is based on loose duck-typing)
        if (!value.toString() !== '[object IDBKeyRange]') {
            return IDBKeyRange.__createInstance(value.lower, value.upper, value.lowerOpen, value.upperOpen);
        }
        return value;
    }
    if (value == null) {
        if (nullDisallowed) {
            throw (0, _DOMException.createDOMException)('DataError', 'No key or range was specified');
        }
        return undefined; // Represents unbounded
    }
    Key.convertValueToKeyRethrowingAndIfInvalid(value);
    return IDBKeyRange.only(value);
}

exports.setSQLForKeyRange = setSQLForKeyRange;
exports.IDBKeyRange = IDBKeyRange;
exports.convertValueToKeyRange = convertValueToKeyRange;
exports.default = IDBKeyRange;

},{"./DOMException":10,"./Key":22,"./util":28}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _DOMException = require('./DOMException');

var _IDBCursor = require('./IDBCursor');

var _IDBKeyRange = require('./IDBKeyRange');

var _DOMStringList = require('./DOMStringList');

var _DOMStringList2 = _interopRequireDefault(_DOMStringList);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _Key = require('./Key');

var Key = _interopRequireWildcard(_Key);

var _IDBIndex = require('./IDBIndex');

var _IDBTransaction = require('./IDBTransaction');

var _IDBTransaction2 = _interopRequireDefault(_IDBTransaction);

var _Sca = require('./Sca');

var Sca = _interopRequireWildcard(_Sca);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _syncPromise = require('sync-promise');

var _syncPromise2 = _interopRequireDefault(_syncPromise);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var readonlyProperties = ['keyPath', 'indexNames', 'transaction', 'autoIncrement'];

/**
 * IndexedDB Object Store
 * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBObjectStore
 * @param {IDBObjectStoreProperties} storeProperties
 * @param {IDBTransaction} transaction
 * @constructor
 */
function IDBObjectStore() {
    throw new TypeError('Illegal constructor');
}
var IDBObjectStoreAlias = IDBObjectStore;
IDBObjectStore.__createInstance = function (storeProperties, transaction) {
    function IDBObjectStore() {
        var me = this;
        me[Symbol.toStringTag] = 'IDBObjectStore';
        util.defineReadonlyProperties(this, readonlyProperties);
        me.__name = me.__originalName = storeProperties.name;
        me.__keyPath = Array.isArray(storeProperties.keyPath) ? storeProperties.keyPath.slice() : storeProperties.keyPath;
        me.__transaction = transaction;
        me.__idbdb = storeProperties.idbdb;
        me.__cursors = storeProperties.cursors || [];

        // autoInc is numeric (0/1) on WinPhone
        me.__autoIncrement = !!storeProperties.autoInc;

        me.__indexes = {};
        me.__indexHandles = {};
        me.__indexNames = _DOMStringList2.default.__createInstance();
        var indexList = storeProperties.indexList;
        for (var indexName in indexList) {
            if (indexList.hasOwnProperty(indexName)) {
                var index = _IDBIndex.IDBIndex.__createInstance(me, indexList[indexName]);
                me.__indexes[index.name] = index;
                if (!index.__deleted) {
                    me.indexNames.push(index.name);
                }
            }
        }
        me.__oldIndexNames = me.indexNames.clone();
        Object.defineProperty(this, '__currentName', {
            get: function get() {
                return '__pendingName' in this ? this.__pendingName : this.name;
            }
        });
        Object.defineProperty(this, 'name', {
            enumerable: false,
            configurable: false,
            get: function get() {
                return this.__name;
            },
            set: function set(name) {
                var me = this;
                name = util.convertToDOMString(name);
                var oldName = me.name;
                IDBObjectStoreAlias.__invalidStateIfDeleted(me);
                _IDBTransaction2.default.__assertVersionChange(me.transaction);
                _IDBTransaction2.default.__assertActive(me.transaction);
                if (oldName === name) {
                    return;
                }
                if (me.__idbdb.__objectStores[name] && !me.__idbdb.__objectStores[name].__pendingDelete) {
                    throw (0, _DOMException.createDOMException)('ConstraintError', 'Object store "' + name + '" already exists in ' + me.__idbdb.name);
                }

                me.__name = name;

                var oldStore = me.__idbdb.__objectStores[oldName];
                oldStore.__name = name; // Fix old references
                me.__idbdb.__objectStores[name] = oldStore; // Ensure new reference accessible
                delete me.__idbdb.__objectStores[oldName]; // Ensure won't be found

                me.__idbdb.objectStoreNames.splice(me.__idbdb.objectStoreNames.indexOf(oldName), 1, name);

                var oldHandle = me.transaction.__storeHandles[oldName];
                oldHandle.__name = name; // Fix old references
                me.transaction.__storeHandles[name] = oldHandle; // Ensure new reference accessible

                me.__pendingName = oldName;

                var sql = 'UPDATE __sys__ SET "name" = ? WHERE "name" = ?';
                var sqlValues = [util.escapeSQLiteStatement(name), util.escapeSQLiteStatement(oldName)];
                _CFG2.default.DEBUG && console.log(sql, sqlValues);
                me.transaction.__addNonRequestToTransactionQueue(function objectStoreClear(tx, args, success, error) {
                    tx.executeSql(sql, sqlValues, function (tx, data) {
                        // This SQL preserves indexes per https://www.sqlite.org/lang_altertable.html
                        var sql = 'ALTER TABLE ' + util.escapeStoreNameForSQL(oldName) + ' RENAME TO ' + util.escapeStoreNameForSQL(name);
                        _CFG2.default.DEBUG && console.log(sql);
                        tx.executeSql(sql, [], function (tx, data) {
                            delete me.__pendingName;
                            success();
                        });
                    }, function (tx, err) {
                        error(err);
                    });
                });
            }
        });
    }
    IDBObjectStore.prototype = IDBObjectStoreAlias.prototype;
    return new IDBObjectStore();
};

/**
 * Clones an IDBObjectStore instance for a different IDBTransaction instance.
 * @param {IDBObjectStore} store
 * @param {IDBTransaction} transaction
 * @protected
 */
IDBObjectStore.__clone = function (store, transaction) {
    var newStore = IDBObjectStore.__createInstance({
        name: store.__currentName,
        keyPath: Array.isArray(store.keyPath) ? store.keyPath.slice() : store.keyPath,
        autoInc: store.autoIncrement,
        indexList: {},
        idbdb: store.__idbdb,
        cursors: store.__cursors
    }, transaction);

    ['__indexes', '__indexNames', '__oldIndexNames', '__deleted', '__pendingDelete', '__pendingCreate', '__originalName'].forEach(function (p) {
        newStore[p] = store[p];
    });
    return newStore;
};

IDBObjectStore.__invalidStateIfDeleted = function (store, msg) {
    if (store.__deleted || store.__pendingDelete || store.__pendingCreate && store.transaction && store.transaction.__errored) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', msg || 'This store has been deleted');
    }
};

/**
 * Creates a new object store in the database.
 * @param {IDBDatabase} db
 * @param {IDBObjectStore} store
 * @protected
 */
IDBObjectStore.__createObjectStore = function (db, store) {
    // Add the object store to the IDBDatabase
    var storeName = store.__currentName;
    store.__pendingCreate = true;
    db.__objectStores[storeName] = store;
    db.objectStoreNames.push(storeName);

    // Add the object store to WebSQL
    var transaction = db.__versionTransaction;

    var storeHandles = transaction.__storeHandles;
    if (!storeHandles[storeName] ||
    // These latter conditions are to allow store
    //   recreation to create new clone object
    storeHandles[storeName].__pendingDelete || storeHandles[storeName].__deleted) {
        storeHandles[storeName] = IDBObjectStore.__clone(store, transaction);
    }

    transaction.__addNonRequestToTransactionQueue(function createObjectStore(tx, args, success, failure) {
        function error(tx, err) {
            _CFG2.default.DEBUG && console.log(err);
            failure((0, _DOMException.createDOMException)('UnknownError', 'Could not create object store "' + storeName + '"', err));
        }

        var escapedStoreNameSQL = util.escapeStoreNameForSQL(storeName);
        // key INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE
        var sql = ['CREATE TABLE', escapedStoreNameSQL, '(key BLOB', store.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY', ', value BLOB)'].join(' ');
        _CFG2.default.DEBUG && console.log(sql);
        tx.executeSql(sql, [], function (tx, data) {
            function insertStoreInfo() {
                var encodedKeyPath = JSON.stringify(store.keyPath);
                tx.executeSql('INSERT INTO __sys__ VALUES (?,?,?,?,?)', [util.escapeSQLiteStatement(storeName), encodedKeyPath, store.autoIncrement, '{}', 1], function () {
                    delete store.__pendingCreate;
                    delete store.__deleted;
                    success(store);
                }, error);
            }
            if (!_CFG2.default.useSQLiteIndexes) {
                insertStoreInfo();
                return;
            }
            tx.executeSql('CREATE INDEX IF NOT EXISTS ' + util.sqlQuote('sk_' + escapedStoreNameSQL.slice(1, -1)) + ' ON ' + escapedStoreNameSQL + '("key")', [], insertStoreInfo, error);
        }, error);
    });
    return storeHandles[storeName];
};

/**
 * Deletes an object store from the database.
 * @param {IDBDatabase} db
 * @param {IDBObjectStore} store
 * @protected
 */
IDBObjectStore.__deleteObjectStore = function (db, store) {
    // Remove the object store from the IDBDatabase
    store.__pendingDelete = true;
    // We don't delete the other index holders in case need reversion
    store.__indexNames = _DOMStringList2.default.__createInstance();

    db.objectStoreNames.splice(db.objectStoreNames.indexOf(store.__currentName), 1);

    var storeHandle = db.__versionTransaction.__storeHandles[store.__currentName];
    if (storeHandle) {
        storeHandle.__indexNames = _DOMStringList2.default.__createInstance();
        storeHandle.__pendingDelete = true;
    }

    // Remove the object store from WebSQL
    var transaction = db.__versionTransaction;
    transaction.__addNonRequestToTransactionQueue(function deleteObjectStore(tx, args, success, failure) {
        function error(tx, err) {
            _CFG2.default.DEBUG && console.log(err);
            failure((0, _DOMException.createDOMException)('UnknownError', 'Could not delete ObjectStore', err));
        }

        tx.executeSql('SELECT "name" FROM __sys__ WHERE "name" = ?', [util.escapeSQLiteStatement(store.__currentName)], function (tx, data) {
            if (data.rows.length > 0) {
                tx.executeSql('DROP TABLE ' + util.escapeStoreNameForSQL(store.__currentName), [], function () {
                    tx.executeSql('DELETE FROM __sys__ WHERE "name" = ?', [util.escapeSQLiteStatement(store.__currentName)], function () {
                        delete store.__pendingDelete;
                        store.__deleted = true;
                        if (storeHandle) {
                            delete storeHandle.__pendingDelete;
                            storeHandle.__deleted = true;
                        }
                        success();
                    }, error);
                }, error);
            }
        });
    });
};

// Todo: Although we may end up needing to do cloning genuinely asynchronously (for Blobs and FileLists),
//   and we'll want to ensure the queue starts up synchronously, we nevertheless do the cloning
//   before entering the queue and its callback since the encoding we do is preceded by validation
//   which we must do synchronously anyways. If we reimplement Blobs and FileLists asynchronously,
//   we can detect these types (though validating synchronously as possible) and once entering the
//   queue callback, ensure they load before triggering success or failure (perhaps by returning and
//   a `SyncPromise` from the `Sca.clone` operation and later detecting and ensuring it is resolved
//   before continuing).
/**
 * Determines whether the given inline or out-of-line key is valid, according to the object store's schema.
 * @param {*} value     Used for inline keys
 * @param {*} key       Used for out-of-line keys
 * @private
 */
IDBObjectStore.prototype.__validateKeyAndValueAndCloneValue = function (value, key, cursorUpdate) {
    var me = this;
    if (me.keyPath !== null) {
        if (key !== undefined) {
            throw (0, _DOMException.createDOMException)('DataError', 'The object store uses in-line keys and the key parameter was provided', me);
        }
        // Todo Binary: Avoid blobs loading async to ensure cloning (and errors therein)
        //   occurs sync; then can make cloning and this method without callbacks (except where ok
        //   to be async)
        var _clonedValue = Sca.clone(value);
        key = Key.extractKeyValueDecodedFromValueUsingKeyPath(_clonedValue, me.keyPath); // May throw so "rethrow"
        if (key.invalid) {
            throw (0, _DOMException.createDOMException)('DataError', 'KeyPath was specified, but key was invalid.');
        }
        if (key.failure) {
            if (!cursorUpdate) {
                if (!me.autoIncrement) {
                    throw (0, _DOMException.createDOMException)('DataError', 'Could not evaluate a key from keyPath and there is no key generator');
                }
                if (!Key.checkKeyCouldBeInjectedIntoValue(_clonedValue, me.keyPath)) {
                    throw (0, _DOMException.createDOMException)('DataError', 'A key could not be injected into a value');
                }
                // A key will be generated
                return [undefined, _clonedValue];
            }
            throw (0, _DOMException.createDOMException)('DataError', 'Could not evaluate a key from keyPath');
        }
        // An `IDBCursor.update` call will also throw if not equal to the cursor’s effective key
        return [key.value, _clonedValue];
    }
    if (key === undefined) {
        if (!me.autoIncrement) {
            throw (0, _DOMException.createDOMException)('DataError', 'The object store uses out-of-line keys and has no key generator and the key parameter was not provided.', me);
        }
        // A key will be generated
        key = undefined;
    } else {
        Key.convertValueToKeyRethrowingAndIfInvalid(key);
    }
    var clonedValue = Sca.clone(value);
    return [key, clonedValue];
};

/**
 * From the store properties and object, extracts the value for the key in the object store
 * If the table has auto increment, get the current number (unless it has a keyPath leading to a
 *  valid but non-numeric or < 1 key)
 * @param {Object} tx
 * @param {Object} value
 * @param {Object} key
 * @param {function} success
 * @param {function} failure
 */
IDBObjectStore.prototype.__deriveKey = function (tx, value, key, success, failCb) {
    var me = this;

    // Only run if cloning is needed
    function keyCloneThenSuccess(oldCn) {
        // We want to return the original key, so we don't need to accept an argument here
        Sca.encode(key, function (key) {
            key = Sca.decode(key);
            success(key, oldCn);
        });
    }

    if (me.autoIncrement) {
        // If auto-increment and no valid primaryKey found on the keyPath, get and set the new value, and use
        if (key === undefined) {
            Key.generateKeyForStore(tx, me, function (failure, key, oldCn) {
                if (failure) {
                    failCb((0, _DOMException.createDOMException)('ConstraintError', 'The key generator\'s current number has reached the maximum safe integer limit'));
                    return;
                }
                if (me.keyPath !== null) {
                    // Should not throw now as checked earlier
                    Key.injectKeyIntoValueUsingKeyPath(value, key, me.keyPath);
                }
                success(key, oldCn);
            }, failCb);
        } else {
            Key.possiblyUpdateKeyGenerator(tx, me, key, keyCloneThenSuccess, failCb);
        }
        // Not auto-increment
    } else {
        keyCloneThenSuccess();
    }
};

IDBObjectStore.prototype.__insertData = function (tx, encoded, value, clonedKeyOrCurrentNumber, oldCn, success, error) {
    var me = this;
    // The `ConstraintError` to occur for `add` upon a duplicate will occur naturally in attempting an insert
    // We process the index information first as it will stored in the same table as the store
    var paramMap = {};
    var indexPromises = Object.keys(
    // We do not iterate `indexNames` as those can be modified synchronously (e.g.,
    //   `deleteIndex` could, by its synchronous removal from `indexNames`, prevent
    //   iteration here of an index though per IndexedDB test
    //   `idbobjectstore_createIndex4-deleteIndex-event_order.js`, `createIndex`
    //   should be allowed to first fail even in such a case).
    me.__indexes).map(function (indexName) {
        // While this may sometimes resolve sync and sometimes async, the
        //   idea is to avoid, where possible, unnecessary delays (and
        //   consuming code ought to only see a difference in the browser
        //   where we can't control the transaction timeout anyways).
        return new _syncPromise2.default(function (resolve, reject) {
            var index = me.__indexes[indexName];
            if (
            // `createIndex` was called synchronously after the current insertion was added to
            //  the transaction queue so although it was added to `__indexes`, it is not yet
            //  ready to be checked here for the insertion as it will be when running the
            //  `createIndex` operation (e.g., if two items with the same key were added and
            //  *then* a unique index was created, it should not continue to err and abort
            //  yet, as we're still handling the insertions which must be processed (e.g., to
            //  add duplicates which then cause a unique index to fail))
            index.__pendingCreate ||
            // If already deleted (and not just slated for deletion (by `__pendingDelete`
            //  after this add), we avoid checks
            index.__deleted) {
                resolve();
                return;
            }
            var indexKey = void 0;
            try {
                indexKey = Key.extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Add as necessary to this and skip past this index if exceptions here)
                if (indexKey.invalid || indexKey.failure) {
                    throw new Error('Go to catch');
                }
            } catch (err) {
                resolve();
                return;
            }
            indexKey = indexKey.value;
            function setIndexInfo(index) {
                if (indexKey === undefined) {
                    return;
                }
                paramMap[index.__currentName] = Key.encode(indexKey, index.multiEntry);
            }
            if (index.unique) {
                var multiCheck = index.multiEntry && Array.isArray(indexKey);
                var fetchArgs = (0, _IDBIndex.buildFetchIndexDataSQL)(true, index, indexKey, 'key', multiCheck);
                _IDBIndex.executeFetchIndexData.apply(undefined, [null].concat(_toConsumableArray(fetchArgs), [tx, null, function success(key) {
                    if (key === undefined) {
                        setIndexInfo(index);
                        resolve();
                        return;
                    }
                    reject((0, _DOMException.createDOMException)('ConstraintError', 'Index already contains a record equal to ' + (multiCheck ? 'one of the subkeys of' : '') + '`indexKey`'));
                }, reject]));
            } else {
                setIndexInfo(index);
                resolve();
            }
        });
    });
    _syncPromise2.default.all(indexPromises).then(function () {
        var sqlStart = ['INSERT INTO', util.escapeStoreNameForSQL(me.__currentName), '('];
        var sqlEnd = [' VALUES ('];
        var insertSqlValues = [];
        if (clonedKeyOrCurrentNumber !== undefined) {
            // Key.convertValueToKey(primaryKey); // Already run
            sqlStart.push(util.sqlQuote('key'), ',');
            sqlEnd.push('?,');
            insertSqlValues.push(util.escapeSQLiteStatement(Key.encode(clonedKeyOrCurrentNumber)));
        }
        for (var key in paramMap) {
            sqlStart.push(util.escapeIndexNameForSQL(key) + ',');
            sqlEnd.push('?,');
            insertSqlValues.push(util.escapeSQLiteStatement(paramMap[key]));
        }
        // removing the trailing comma
        sqlStart.push(util.sqlQuote('value') + ' )');
        sqlEnd.push('?)');
        insertSqlValues.push(util.escapeSQLiteStatement(encoded));

        var insertSql = sqlStart.join(' ') + sqlEnd.join(' ');
        _CFG2.default.DEBUG && console.log('SQL for adding', insertSql, insertSqlValues);

        tx.executeSql(insertSql, insertSqlValues, function (tx, data) {
            success(clonedKeyOrCurrentNumber);
        }, function (tx, err) {
            // Should occur for `add` operation
            error((0, _DOMException.createDOMException)('ConstraintError', err.message, err));
        });
    }).catch(function (err) {
        function fail() {
            // Todo: Add a different error object here if `assignCurrentNumber` fails in reverting?
            error(err);
        }
        if (typeof oldCn === 'number') {
            Key.assignCurrentNumber(tx, me, oldCn, fail, fail);
            return;
        }
        fail();
    });
};

IDBObjectStore.prototype.add = function (value /* , key */) {
    var me = this;
    var key = arguments[1];
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No value was specified');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);
    me.transaction.__assertWritable();

    var request = me.transaction.__createRequest(me);

    var _me$__validateKeyAndV = me.__validateKeyAndValueAndCloneValue(value, key, false),
        _me$__validateKeyAndV2 = _slicedToArray(_me$__validateKeyAndV, 2),
        ky = _me$__validateKeyAndV2[0],
        clonedValue = _me$__validateKeyAndV2[1];

    IDBObjectStore.__storingRecordObjectStore(request, me, true, clonedValue, true, ky);
    return request;
};

IDBObjectStore.prototype.put = function (value /*, key */) {
    var me = this;
    var key = arguments[1];
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No value was specified');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);
    me.transaction.__assertWritable();

    var request = me.transaction.__createRequest(me);

    var _me$__validateKeyAndV3 = me.__validateKeyAndValueAndCloneValue(value, key, false),
        _me$__validateKeyAndV4 = _slicedToArray(_me$__validateKeyAndV3, 2),
        ky = _me$__validateKeyAndV4[0],
        clonedValue = _me$__validateKeyAndV4[1];

    IDBObjectStore.__storingRecordObjectStore(request, me, true, clonedValue, false, ky);
    return request;
};

IDBObjectStore.prototype.__overwrite = function (tx, key, cb, error) {
    var me = this;
    // First try to delete if the record exists
    // Key.convertValueToKey(key); // Already run
    var sql = 'DELETE FROM ' + util.escapeStoreNameForSQL(me.__currentName) + ' WHERE "key" = ?';
    var encodedKey = Key.encode(key);
    tx.executeSql(sql, [util.escapeSQLiteStatement(encodedKey)], function (tx, data) {
        _CFG2.default.DEBUG && console.log('Did the row with the', key, 'exist? ', data.rowsAffected);
        cb(tx);
    }, function (tx, err) {
        error(err);
    });
};

IDBObjectStore.__storingRecordObjectStore = function (request, store, invalidateCache, value, noOverwrite /* , key */) {
    var key = arguments[5];
    store.transaction.__pushToQueue(request, function (tx, args, success, error) {
        store.__deriveKey(tx, value, key, function (clonedKeyOrCurrentNumber, oldCn) {
            Sca.encode(value, function (encoded) {
                function insert(tx) {
                    store.__insertData(tx, encoded, value, clonedKeyOrCurrentNumber, oldCn, function () {
                        if (invalidateCache) {
                            store.__cursors.forEach(function (cursor) {
                                cursor.__invalidateCache();
                            });
                        }
                        success.apply(undefined, arguments);
                    }, error);
                }
                if (!noOverwrite) {
                    store.__overwrite(tx, clonedKeyOrCurrentNumber, insert, error);
                    return;
                }
                insert(tx);
            });
        }, error);
    });
};

IDBObjectStore.prototype.__get = function (query, getKey, getAll, count) {
    var me = this;
    if (count !== undefined) {
        count = util.enforceRange(count, 'unsigned long');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);

    var range = (0, _IDBKeyRange.convertValueToKeyRange)(query, !getAll);

    var col = getKey ? 'key' : 'value';
    var sql = ['SELECT', util.sqlQuote(col), 'FROM', util.escapeStoreNameForSQL(me.__currentName)];
    var sqlValues = [];
    if (range !== undefined) {
        sql.push('WHERE');
        (0, _IDBKeyRange.setSQLForKeyRange)(range, util.sqlQuote('key'), sql, sqlValues);
    }
    if (!getAll) {
        count = 1;
    }
    if (count) {
        if (typeof count !== 'number' || isNaN(count) || !isFinite(count)) {
            throw new TypeError('The count parameter must be a finite number');
        }
        sql.push('LIMIT', count);
    }
    sql = sql.join(' ');
    return me.transaction.__addToTransactionQueue(function objectStoreGet(tx, args, success, error) {
        _CFG2.default.DEBUG && console.log('Fetching', me.__currentName, sqlValues);
        tx.executeSql(sql, sqlValues, function (tx, data) {
            _CFG2.default.DEBUG && console.log('Fetched data', data);
            var ret = void 0;
            try {
                // Opera can't deal with the try-catch here.
                if (data.rows.length === 0) {
                    return getAll ? success([]) : success();
                }
                ret = [];
                if (getKey) {
                    for (var i = 0; i < data.rows.length; i++) {
                        // Key.convertValueToKey(data.rows.item(i).key); // Already validated before storage
                        ret.push(Key.decode(util.unescapeSQLiteResponse(data.rows.item(i).key), false));
                    }
                } else {
                    for (var _i = 0; _i < data.rows.length; _i++) {
                        ret.push(Sca.decode(util.unescapeSQLiteResponse(data.rows.item(_i).value)));
                    }
                }
                if (!getAll) {
                    ret = ret[0];
                }
            } catch (e) {
                // If no result is returned, or error occurs when parsing JSON
                _CFG2.default.DEBUG && console.log(e);
            }
            success(ret);
        }, function (tx, err) {
            error(err);
        });
    }, undefined, me);
};

IDBObjectStore.prototype.get = function (query) {
    if (!arguments.length) {
        throw new TypeError('A parameter was missing for `IDBObjectStore.get`.');
    }
    return this.__get(query);
};

IDBObjectStore.prototype.getKey = function (query) {
    if (!arguments.length) {
        throw new TypeError('A parameter was missing for `IDBObjectStore.getKey`.');
    }
    return this.__get(query, true);
};

IDBObjectStore.prototype.getAll = function () /* query, count */{
    var _arguments = Array.prototype.slice.call(arguments),
        query = _arguments[0],
        count = _arguments[1];

    return this.__get(query, false, true, count);
};

IDBObjectStore.prototype.getAllKeys = function () /* query, count */{
    var _arguments2 = Array.prototype.slice.call(arguments),
        query = _arguments2[0],
        count = _arguments2[1];

    return this.__get(query, true, true, count);
};

IDBObjectStore.prototype['delete'] = function (query) {
    var me = this;
    if (!(this instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    if (!arguments.length) {
        throw new TypeError('A parameter was missing for `IDBObjectStore.delete`.');
    }

    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);
    me.transaction.__assertWritable();

    var range = (0, _IDBKeyRange.convertValueToKeyRange)(query, true);

    var sqlArr = ['DELETE FROM', util.escapeStoreNameForSQL(me.__currentName), 'WHERE'];
    var sqlValues = [];
    (0, _IDBKeyRange.setSQLForKeyRange)(range, util.sqlQuote('key'), sqlArr, sqlValues);
    var sql = sqlArr.join(' ');

    return me.transaction.__addToTransactionQueue(function objectStoreDelete(tx, args, success, error) {
        _CFG2.default.DEBUG && console.log('Deleting', me.__currentName, sqlValues);
        tx.executeSql(sql, sqlValues, function (tx, data) {
            _CFG2.default.DEBUG && console.log('Deleted from database', data.rowsAffected);
            me.__cursors.forEach(function (cursor) {
                cursor.__invalidateCache(); // Delete
            });
            success();
        }, function (tx, err) {
            error(err);
        });
    }, undefined, me);
};

IDBObjectStore.prototype.clear = function () {
    var me = this;
    if (!(this instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);
    me.transaction.__assertWritable();

    return me.transaction.__addToTransactionQueue(function objectStoreClear(tx, args, success, error) {
        tx.executeSql('DELETE FROM ' + util.escapeStoreNameForSQL(me.__currentName), [], function (tx, data) {
            _CFG2.default.DEBUG && console.log('Cleared all records from database', data.rowsAffected);
            me.__cursors.forEach(function (cursor) {
                cursor.__invalidateCache(); // Clear
            });
            success();
        }, function (tx, err) {
            error(err);
        });
    }, undefined, me);
};

IDBObjectStore.prototype.count = function () /* query */{
    var me = this;
    var query = arguments[0];
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);

    // We don't need to add to cursors array since has the count parameter which won't cache
    return _IDBCursor.IDBCursorWithValue.__createInstance(query, 'next', me, me, 'key', 'value', true).__req;
};

IDBObjectStore.prototype.openCursor = function () /* query, direction */{
    var me = this;

    var _arguments3 = Array.prototype.slice.call(arguments),
        query = _arguments3[0],
        direction = _arguments3[1];

    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    var cursor = _IDBCursor.IDBCursorWithValue.__createInstance(query, direction, me, me, 'key', 'value');
    me.__cursors.push(cursor);
    return cursor.__req;
};

IDBObjectStore.prototype.openKeyCursor = function () /* query, direction */{
    var me = this;
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);

    var _arguments4 = Array.prototype.slice.call(arguments),
        query = _arguments4[0],
        direction = _arguments4[1];

    var cursor = _IDBCursor.IDBCursor.__createInstance(query, direction, me, me, 'key', 'key');
    me.__cursors.push(cursor);
    return cursor.__req;
};

IDBObjectStore.prototype.index = function (indexName) {
    var me = this;
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No index name was specified');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertNotFinished(me.transaction);
    var index = me.__indexes[indexName];
    if (!index || index.__deleted) {
        throw (0, _DOMException.createDOMException)('NotFoundError', 'Index "' + indexName + '" does not exist on ' + me.__currentName);
    }

    if (!me.__indexHandles[indexName] || me.__indexes[indexName].__pendingDelete || me.__indexes[indexName].__deleted) {
        me.__indexHandles[indexName] = _IDBIndex.IDBIndex.__clone(index, me);
    }
    return me.__indexHandles[indexName];
};

/**
 * Creates a new index on the object store.
 * @param {string} indexName
 * @param {string} keyPath
 * @param {object} optionalParameters
 * @returns {IDBIndex}
 */
IDBObjectStore.prototype.createIndex = function (indexName, keyPath /* , optionalParameters */) {
    var me = this;
    var optionalParameters = arguments[2];
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    indexName = String(indexName); // W3C test within IDBObjectStore.js seems to accept string conversion
    if (arguments.length === 0) {
        throw new TypeError('No index name was specified');
    }
    if (arguments.length === 1) {
        throw new TypeError('No key path was specified');
    }
    _IDBTransaction2.default.__assertVersionChange(me.transaction);
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);
    if (me.__indexes[indexName] && !me.__indexes[indexName].__deleted && !me.__indexes[indexName].__pendingDelete) {
        throw (0, _DOMException.createDOMException)('ConstraintError', 'Index "' + indexName + '" already exists on ' + me.__currentName);
    }

    keyPath = util.convertToSequenceDOMString(keyPath);
    if (!util.isValidKeyPath(keyPath)) {
        throw (0, _DOMException.createDOMException)('SyntaxError', 'A valid keyPath must be supplied');
    }
    if (Array.isArray(keyPath) && optionalParameters && optionalParameters.multiEntry) {
        throw (0, _DOMException.createDOMException)('InvalidAccessError', 'The keyPath argument was an array and the multiEntry option is true.');
    }

    optionalParameters = optionalParameters || {};
    /** @name IDBIndexProperties **/
    var indexProperties = {
        columnName: indexName,
        keyPath: keyPath,
        optionalParams: {
            unique: !!optionalParameters.unique,
            multiEntry: !!optionalParameters.multiEntry
        }
    };
    var index = _IDBIndex.IDBIndex.__createInstance(me, indexProperties);
    _IDBIndex.IDBIndex.__createIndex(me, index);
    return index;
};

IDBObjectStore.prototype.deleteIndex = function (name) {
    var me = this;
    if (!(me instanceof IDBObjectStore)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No index name was specified');
    }
    _IDBTransaction2.default.__assertVersionChange(me.transaction);
    IDBObjectStore.__invalidStateIfDeleted(me);
    _IDBTransaction2.default.__assertActive(me.transaction);
    var index = me.__indexes[name];
    if (!index) {
        throw (0, _DOMException.createDOMException)('NotFoundError', 'Index "' + name + '" does not exist on ' + me.__currentName);
    }

    _IDBIndex.IDBIndex.__deleteIndex(me, index);
};

readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBObjectStore.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});
Object.defineProperty(IDBObjectStore.prototype, 'name', {
    enumerable: true,
    configurable: true,
    get: function get() {
        throw new TypeError('Illegal invocation');
    },
    set: function set(val) {
        throw new TypeError('Illegal invocation');
    }
});

IDBObjectStore.prototype[Symbol.toStringTag] = 'IDBObjectStorePrototype';

Object.defineProperty(IDBObjectStore, 'prototype', {
    writable: false
});

exports.default = IDBObjectStore;
module.exports = exports['default'];

},{"./CFG":9,"./DOMException":10,"./DOMStringList":11,"./IDBCursor":13,"./IDBIndex":16,"./IDBKeyRange":17,"./IDBTransaction":20,"./Key":22,"./Sca":23,"./util":28,"sync-promise":5}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IDBOpenDBRequest = exports.IDBRequest = undefined;

var _DOMException = require('./DOMException');

var _eventtargeter = require('eventtargeter');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var listeners = ['onsuccess', 'onerror'];
var readonlyProperties = ['source', 'transaction', 'readyState'];
var doneFlagGetters = ['result', 'error'];

/**
 * The IDBRequest Object that is returns for all async calls
 * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#request-api
 */
function IDBRequest() {
    throw new TypeError('Illegal constructor');
}
IDBRequest.__super = function IDBRequest() {
    var _this = this;

    this[Symbol.toStringTag] = 'IDBRequest';
    this.__setOptions({
        legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
    });
    doneFlagGetters.forEach(function (prop) {
        Object.defineProperty(this, '__' + prop, {
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this, prop, {
            enumerable: true,
            configurable: true,
            get: function get() {
                if (this.__readyState !== 'done') {
                    throw (0, _DOMException.createDOMException)('InvalidStateError', "Can't get " + prop + '; the request is still pending.');
                }
                return this['__' + prop];
            }
        });
    }, this);
    util.defineReadonlyProperties(this, readonlyProperties);
    listeners.forEach(function (listener) {
        Object.defineProperty(_this, listener, {
            configurable: true, // Needed by support.js in W3C IndexedDB tests
            get: function get() {
                return this['__' + listener];
            },
            set: function set(val) {
                this['__' + listener] = val;
            }
        });
    }, this);
    listeners.forEach(function (l) {
        _this[l] = null;
    });
    this.__result = undefined;
    this.__error = this.__source = this.__transaction = null;
    this.__readyState = 'pending';
};

IDBRequest.__createInstance = function () {
    return new IDBRequest.__super();
};

IDBRequest.prototype = _eventtargeter.EventTargetFactory.createInstance({ extraProperties: ['debug'] });
IDBRequest.prototype[Symbol.toStringTag] = 'IDBRequestPrototype';

IDBRequest.prototype.__getParent = function () {
    if (this.toString() === '[object IDBOpenDBRequest]') {
        return null;
    }
    return this.__transaction;
};

// Illegal invocations
readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBRequest.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});

doneFlagGetters.forEach(function (prop) {
    Object.defineProperty(IDBRequest.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});

listeners.forEach(function (listener) {
    Object.defineProperty(IDBRequest.prototype, listener, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        },
        set: function set(val) {
            throw new TypeError('Illegal invocation');
        }
    });
});

Object.defineProperty(IDBRequest.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBRequest
});
IDBRequest.__super.prototype = IDBRequest.prototype;

Object.defineProperty(IDBRequest, 'prototype', {
    writable: false
});

var openListeners = ['onblocked', 'onupgradeneeded'];

/**
 * The IDBOpenDBRequest called when a database is opened
 */
function IDBOpenDBRequest() {
    throw new TypeError('Illegal constructor');
}
IDBOpenDBRequest.prototype = Object.create(IDBRequest.prototype);

Object.defineProperty(IDBOpenDBRequest.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBOpenDBRequest
});

var IDBOpenDBRequestAlias = IDBOpenDBRequest;
IDBOpenDBRequest.__createInstance = function () {
    function IDBOpenDBRequest() {
        var _this2 = this;

        IDBRequest.__super.call(this);

        this[Symbol.toStringTag] = 'IDBOpenDBRequest';
        this.__setOptions({
            legacyOutputDidListenersThrowFlag: true, // Event hook for IndexedB
            extraProperties: ['oldVersion', 'newVersion', 'debug']
        }); // Ensure EventTarget preserves our properties
        openListeners.forEach(function (listener) {
            Object.defineProperty(_this2, listener, {
                configurable: true, // Needed by support.js in W3C IndexedDB tests
                get: function get() {
                    return this['__' + listener];
                },
                set: function set(val) {
                    this['__' + listener] = val;
                }
            });
        }, this);
        openListeners.forEach(function (l) {
            _this2[l] = null;
        });
    }
    IDBOpenDBRequest.prototype = IDBOpenDBRequestAlias.prototype;
    return new IDBOpenDBRequest();
};

openListeners.forEach(function (listener) {
    Object.defineProperty(IDBOpenDBRequest.prototype, listener, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        },
        set: function set(val) {
            throw new TypeError('Illegal invocation');
        }
    });
});

IDBOpenDBRequest.prototype[Symbol.toStringTag] = 'IDBOpenDBRequestPrototype';

Object.defineProperty(IDBOpenDBRequest, 'prototype', {
    writable: false
});

exports.IDBRequest = IDBRequest;
exports.IDBOpenDBRequest = IDBOpenDBRequest;

},{"./DOMException":10,"./util":28,"eventtargeter":2}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Event = require('./Event');

var _DOMException = require('./DOMException');

var _IDBRequest = require('./IDBRequest');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _IDBObjectStore = require('./IDBObjectStore');

var _IDBObjectStore2 = _interopRequireDefault(_IDBObjectStore);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _eventtargeter = require('eventtargeter');

var _syncPromise = require('sync-promise');

var _syncPromise2 = _interopRequireDefault(_syncPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var uniqueID = 0;
var listeners = ['onabort', 'oncomplete', 'onerror'];
var readonlyProperties = ['objectStoreNames', 'mode', 'db', 'error'];

/**
 * The IndexedDB Transaction
 * http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBTransaction
 * @param {IDBDatabase} db
 * @param {string[]} storeNames
 * @param {string} mode
 * @constructor
 */
function IDBTransaction() {
    throw new TypeError('Illegal constructor');
}
var IDBTransactionAlias = IDBTransaction;
IDBTransaction.__createInstance = function (db, storeNames, mode) {
    function IDBTransaction() {
        var _this = this;

        var me = this;
        me[Symbol.toStringTag] = 'IDBTransaction';
        util.defineReadonlyProperties(me, readonlyProperties);
        me.__id = ++uniqueID; // for debugging simultaneous transactions
        me.__active = true;
        me.__running = false;
        me.__errored = false;
        me.__requests = [];
        me.__objectStoreNames = storeNames;
        me.__mode = mode;
        me.__db = db;
        me.__error = null;
        me.__setOptions({
            legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
        });

        readonlyProperties.forEach(function (readonlyProp) {
            Object.defineProperty(_this, readonlyProp, {
                configurable: true
            });
        });
        listeners.forEach(function (listener) {
            Object.defineProperty(_this, listener, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return this['__' + listener];
                },
                set: function set(val) {
                    this['__' + listener] = val;
                }
            });
        });
        listeners.forEach(function (l) {
            _this[l] = null;
        });
        me.__storeHandles = {};

        // Kick off the transaction as soon as all synchronous code is done
        setTimeout(function () {
            me.__executeRequests();
        }, 0);
    }
    IDBTransaction.prototype = IDBTransactionAlias.prototype;
    return new IDBTransaction();
};

IDBTransaction.prototype = _eventtargeter.EventTargetFactory.createInstance({ defaultSync: true, extraProperties: ['complete'] }); // Ensure EventTarget preserves our properties
IDBTransaction.prototype.__transFinishedCb = function (err, cb) {
    if (err) {
        cb(true); // eslint-disable-line standard/no-callback-literal
        return;
    }
    cb();
};
IDBTransaction.prototype.__executeRequests = function () {
    var me = this;
    if (me.__running) {
        _CFG2.default.DEBUG && console.log('Looks like the request set is already running', me.mode);
        return;
    }

    me.__running = true;

    me.db.__db[me.mode === 'readonly' ? 'readTransaction' : 'transaction']( // `readTransaction` is optimized, at least in `node-websql`
    function executeRequests(tx) {
        me.__tx = tx;
        var q = null,
            i = -1;

        function success(result, req) {
            if (me.__errored || me.__requestsFinished) {
                // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
                return;
            }
            if (req) {
                q.req = req; // Need to do this in case of cursors
            }
            if (q.req.__readyState === 'done') {
                // Avoid continuing with aborted requests
                return;
            }
            q.req.__readyState = 'done';
            q.req.__result = result;
            q.req.__error = null;

            me.__active = true;
            var e = (0, _Event.createEvent)('success');
            q.req.dispatchEvent(e);
            // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87
            if (e.__legacyOutputDidListenersThrowError) {
                (0, _DOMException.logError)('Error', 'An error occurred in a success handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
                me.__abortTransaction((0, _DOMException.createDOMException)('AbortError', 'A request was aborted (in user handler after success).'));
                return;
            }
            executeNextRequest();
        }

        function error() /* tx, err */{
            if (me.__errored || me.__requestsFinished) {
                // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
                return;
            }
            if (q.req && q.req.__readyState === 'done') {
                // Avoid continuing with aborted requests
                return;
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var err = (0, _DOMException.findError)(args);
            if (!q.req) {
                me.__abortTransaction(err);
                return;
            }
            // Fire an error event for the current IDBRequest
            q.req.__readyState = 'done';
            q.req.__error = err;
            q.req.__result = undefined; // Must be undefined if an error per `result` getter
            q.req.addLateEventListener('error', function (e) {
                if (e.cancelable && e.defaultPrevented && !e.__legacyOutputDidListenersThrowError) {
                    executeNextRequest();
                }
            });
            q.req.addDefaultEventListener('error', function () {
                me.__abortTransaction(q.req.__error);
            });

            me.__active = true;
            var e = (0, _Event.createEvent)('error', err, { bubbles: true, cancelable: true });
            q.req.dispatchEvent(e);
            // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87
            if (e.__legacyOutputDidListenersThrowError) {
                (0, _DOMException.logError)('Error', 'An error occurred in an error handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
                e.preventDefault(); // Prevent 'error' default as steps indicate we should abort with `AbortError` even without cancellation
                me.__abortTransaction((0, _DOMException.createDOMException)('AbortError', 'A request was aborted (in user handler after error).'));
            }
        }

        function executeNextRequest() {
            if (me.__errored || me.__requestsFinished) {
                // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
                return;
            }
            i++;
            if (i >= me.__requests.length) {
                // All requests in the transaction are done
                me.__requests = [];
                if (me.__active) {
                    requestsFinished();
                }
            } else {
                try {
                    q = me.__requests[i];
                    if (!q.req) {
                        q.op(tx, q.args, executeNextRequest, error);
                        return;
                    }
                    if (q.req.__readyState === 'done') {
                        // Avoid continuing with aborted requests
                        return;
                    }
                    q.op(tx, q.args, success, error, executeNextRequest);
                } catch (e) {
                    error(e);
                }
            }
        }

        executeNextRequest();
    }, function webSQLError(webSQLErr) {
        if (webSQLErr === true) {
            // Not a genuine SQL error
            return;
        }
        var err = (0, _DOMException.webSQLErrback)(webSQLErr);
        me.__abortTransaction(err);
    }, function () {
        // For Node, we don't need to try running here as we can keep
        //   the transaction running long enough to rollback (in the
        //   next (non-standard) callback for this transaction call)
        if (me.__transFinishedCb !== IDBTransaction.prototype.__transFinishedCb) {
            // Node
            return;
        }
        if (!me.__transactionEndCallback && !me.__requestsFinished) {
            me.__transactionFinished = true;
            return;
        }
        if (me.__transactionEndCallback && !me.__completed) {
            me.__transFinishedCb(me.__errored, me.__transactionEndCallback);
        }
    }, function (currentTask, err, done, rollback, commit) {
        if (currentTask.readOnly || err) {
            return true;
        }
        me.__transFinishedCb = function (err, cb) {
            if (err) {
                rollback(err, cb);
            } else {
                commit(cb);
            }
        };
        if (me.__transactionEndCallback && !me.__completed) {
            me.__transFinishedCb(me.__errored, me.__transactionEndCallback);
        }
        return false;
    });

    function requestsFinished() {
        me.__active = false;
        me.__requestsFinished = true;

        function complete() {
            me.__completed = true;
            _CFG2.default.DEBUG && console.log('Transaction completed');
            var evt = (0, _Event.createEvent)('complete');
            try {
                me.__internal = true;
                me.dispatchEvent(evt);
                me.__internal = false;
                me.dispatchEvent((0, _Event.createEvent)('__complete'));
            } catch (e) {
                me.__internal = false;
                // An error occurred in the "oncomplete" handler.
                // It's too late to call "onerror" or "onabort". Throw a global error instead.
                // (this may seem odd/bad, but it's how all native IndexedDB implementations work)
                me.__errored = true;
                throw e;
            } finally {
                me.__storeHandles = {};
            }
        }
        if (me.mode === 'readwrite') {
            if (me.__transactionFinished) {
                complete();
                return;
            }
            me.__transactionEndCallback = complete;
            return;
        }
        if (me.mode === 'readonly') {
            complete();
            return;
        }
        var ev = (0, _Event.createEvent)('__beforecomplete');
        ev.complete = complete;
        me.dispatchEvent(ev);
    }
};

/**
 * Creates a new IDBRequest for the transaction.
 * NOTE: The transaction is not queued until you call {@link IDBTransaction#__pushToQueue}
 * @returns {IDBRequest}
 * @protected
 */
IDBTransaction.prototype.__createRequest = function (source) {
    var me = this;
    var request = _IDBRequest.IDBRequest.__createInstance();
    request.__source = source !== undefined ? source : me.db;
    request.__transaction = me;
    return request;
};

/**
 * Adds a callback function to the transaction queue
 * @param {function} callback
 * @param {*} args
 * @returns {IDBRequest}
 * @protected
 */
IDBTransaction.prototype.__addToTransactionQueue = function (callback, args, source) {
    var request = this.__createRequest(source);
    this.__pushToQueue(request, callback, args);
    return request;
};

/**
 * Adds a callback function to the transaction queue without generating a request
 * @param {function} callback
 * @param {*} args
 * @returns {IDBRequest}
 * @protected
 */
IDBTransaction.prototype.__addNonRequestToTransactionQueue = function (callback, args, source) {
    this.__pushToQueue(null, callback, args);
};

/**
 * Adds an IDBRequest to the transaction queue
 * @param {IDBRequest} request
 * @param {function} callback
 * @param {*} args
 * @protected
 */
IDBTransaction.prototype.__pushToQueue = function (request, callback, args) {
    this.__assertActive();
    this.__requests.push({
        'op': callback,
        'args': args,
        'req': request
    });
};

IDBTransaction.prototype.__assertActive = function () {
    if (!this.__active) {
        throw (0, _DOMException.createDOMException)('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
    }
};

IDBTransaction.prototype.__assertWritable = function () {
    if (this.mode === 'readonly') {
        throw (0, _DOMException.createDOMException)('ReadOnlyError', 'The transaction is read only');
    }
};

IDBTransaction.prototype.__assertVersionChange = function () {
    IDBTransaction.__assertVersionChange(this);
};

/**
 * Returns the specified object store.
 * @param {string} objectStoreName
 * @returns {IDBObjectStore}
 */
IDBTransaction.prototype.objectStore = function (objectStoreName) {
    var me = this;
    if (!(me instanceof IDBTransaction)) {
        throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
        throw new TypeError('No object store name was specified');
    }
    IDBTransaction.__assertNotFinished(me);
    if (me.__objectStoreNames.indexOf(objectStoreName) === -1) {
        throw (0, _DOMException.createDOMException)('NotFoundError', objectStoreName + ' is not participating in this transaction');
    }
    var store = me.db.__objectStores[objectStoreName];
    if (!store) {
        throw (0, _DOMException.createDOMException)('NotFoundError', objectStoreName + ' does not exist in ' + me.db.name);
    }

    if (!me.__storeHandles[objectStoreName] ||
    // These latter conditions are to allow store
    //   recreation to create new clone object
    me.__storeHandles[objectStoreName].__pendingDelete || me.__storeHandles[objectStoreName].__deleted) {
        me.__storeHandles[objectStoreName] = _IDBObjectStore2.default.__clone(store, me);
    }
    return me.__storeHandles[objectStoreName];
};

IDBTransaction.prototype.__abortTransaction = function (err) {
    var me = this;
    (0, _DOMException.logError)('Error', 'An error occurred in a transaction', err);
    if (me.__errored) {
        // We've already called "onerror", "onabort", or thrown, so don't do it again.
        return;
    }
    me.__errored = true;

    if (me.mode === 'versionchange') {
        // Steps for aborting an upgrade transaction
        me.db.__version = me.db.__oldVersion;
        me.db.__objectStoreNames = me.db.__oldObjectStoreNames;
        me.__objectStoreNames = me.db.__oldObjectStoreNames;
        Object.values(me.db.__objectStores).concat(Object.values(me.__storeHandles)).forEach(function (store) {
            if ('__pendingName' in store && me.db.__oldObjectStoreNames.indexOf(store.__pendingName) > -1) {
                // Store was already created so we restore to name before the rename
                store.__name = store.__originalName;
            }
            store.__indexNames = store.__oldIndexNames;
            delete store.__pendingDelete;
            Object.values(store.__indexes).concat(Object.values(store.__indexHandles)).forEach(function (index) {
                if ('__pendingName' in index && store.__oldIndexNames.indexOf(index.__pendingName) > -1) {
                    // Index was already created so we restore to name before the rename
                    index.__name = index.__originalName;
                }
                delete index.__pendingDelete;
            });
        });
    }
    me.__active = false; // Setting here and in requestsFinished for https://github.com/w3c/IndexedDB/issues/87

    if (err !== null) {
        me.__error = err;
    }

    if (me.__requestsFinished) {
        // The transaction has already completed, so we can't call "onerror" or "onabort".
        // So throw the error instead.
        setTimeout(function () {
            throw err;
        }, 0);
    }

    function abort(tx, errOrResult) {
        if (!tx) {
            _CFG2.default.DEBUG && console.log('Rollback not possible due to missing transaction', me);
        } else if (errOrResult && typeof errOrResult.code === 'number') {
            _CFG2.default.DEBUG && console.log('Rollback erred; feature is probably not supported as per WebSQL', me);
        } else {
            _CFG2.default.DEBUG && console.log('Rollback succeeded', me);
        }

        me.dispatchEvent((0, _Event.createEvent)('__preabort'));
        me.__requests.filter(function (q, i, arr) {
            return q.req && q.req.__readyState !== 'done' && [i, -1].includes(arr.map(function (q) {
                return q.req;
            }).lastIndexOf(q.req));
        }).reduce(function (promises, q) {
            // We reduce to a chain of promises to be queued in order, so we cannot use `Promise.all`,
            //  and I'm unsure whether `setTimeout` currently behaves first-in-first-out with the same timeout
            //  so we could just use a `forEach`.
            return promises.then(function () {
                q.req.__readyState = 'done';
                q.req.__result = undefined;
                q.req.__error = (0, _DOMException.createDOMException)('AbortError', 'A request was aborted (an unfinished request).');
                var reqEvt = (0, _Event.createEvent)('error', q.req.__error, { bubbles: true, cancelable: true });
                return new _syncPromise2.default(function (resolve) {
                    setTimeout(function () {
                        q.req.dispatchEvent(reqEvt); // No need to catch errors
                        resolve();
                    });
                });
            });
        }, _syncPromise2.default.resolve()).then(function () {
            // Also works when there are no pending requests
            var evt = (0, _Event.createEvent)('abort', err, { bubbles: true, cancelable: false });
            setTimeout(function () {
                me.__abortFinished = true;
                me.dispatchEvent(evt);
                me.__storeHandles = {};
                me.dispatchEvent((0, _Event.createEvent)('__abort'));
            });
        });
    }

    me.__transFinishedCb(true, function (rollback) {
        if (rollback && me.__tx) {
            // Not supported in standard SQL (and WebSQL errors should
            //   rollback automatically), but for Node.js, etc., we give chance for
            //   manual aborts which would otherwise not work.
            if (me.mode === 'readwrite') {
                if (me.__transactionFinished) {
                    abort();
                    return;
                }
                me.__transactionEndCallback = abort;
                return;
            }
            try {
                me.__tx.executeSql('ROLLBACK', [], abort, abort); // Not working in some circumstances, even in Node
            } catch (err) {
                // Browser errs when transaction has ended and since it most likely already erred here,
                //   we call to abort
                abort();
            }
        } else {
            abort(null, { code: 0 });
        }
    });
};

IDBTransaction.prototype.abort = function () {
    var me = this;
    if (!(me instanceof IDBTransaction)) {
        throw new TypeError('Illegal invocation');
    }
    _CFG2.default.DEBUG && console.log('The transaction was aborted', me);
    IDBTransaction.__assertNotFinished(me);
    me.__abortTransaction(null);
};
IDBTransaction.prototype[Symbol.toStringTag] = 'IDBTransactionPrototype';

IDBTransaction.__assertVersionChange = function (tx) {
    if (!tx || tx.mode !== 'versionchange') {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'Not a version transaction');
    }
};
IDBTransaction.__assertNotVersionChange = function (tx) {
    if (tx && tx.mode === 'versionchange') {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'Cannot be called during a version transaction');
    }
};

IDBTransaction.__assertNotFinished = function (tx) {
    if (!tx || tx.__completed || tx.__abortFinished || tx.__errored) {
        throw (0, _DOMException.createDOMException)('InvalidStateError', 'Transaction finished by commit or abort');
    }
};

// object store methods behave differently: see https://github.com/w3c/IndexedDB/issues/192
IDBTransaction.__assertNotFinishedObjectStoreMethod = function (tx) {
    try {
        IDBTransaction.__assertNotFinished(tx);
    } catch (err) {
        if (tx && !tx.__completed && !tx.__abortFinished) {
            throw (0, _DOMException.createDOMException)('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
        }
        throw err;
    }
};

IDBTransaction.__assertActive = function (tx) {
    if (!tx || !tx.__active) {
        throw (0, _DOMException.createDOMException)('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
    }
};

/**
* Used by our EventTarget.prototype library to implement bubbling/capturing
*/
IDBTransaction.prototype.__getParent = function () {
    return this.db;
};

listeners.forEach(function (listener) {
    Object.defineProperty(IDBTransaction.prototype, listener, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        },
        set: function set(val) {
            throw new TypeError('Illegal invocation');
        }
    });
});

// Illegal invocations
readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBTransaction.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            throw new TypeError('Illegal invocation');
        }
    });
});

Object.defineProperty(IDBTransaction.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBTransaction
});

Object.defineProperty(IDBTransaction, 'prototype', {
    writable: false
});

exports.default = IDBTransaction;
module.exports = exports['default'];

},{"./CFG":9,"./DOMException":10,"./Event":12,"./IDBObjectStore":18,"./IDBRequest":19,"./util":28,"eventtargeter":2,"sync-promise":5}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Event = require('./Event');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var readonlyProperties = ['oldVersion', 'newVersion'];

// Babel apparently having a problem adding `hasInstance` to a class, so we are redefining as a function
function IDBVersionChangeEvent(type /* , eventInitDict */) {
    // eventInitDict is a IDBVersionChangeEventInit (but is not defined as a global)
    _Event.ShimEvent.call(this, type);
    this[Symbol.toStringTag] = 'IDBVersionChangeEvent';
    this.toString = function () {
        return '[object IDBVersionChangeEvent]';
    };
    this.__eventInitDict = arguments[1] || {};
}

IDBVersionChangeEvent.prototype = Object.create(_Event.ShimEvent.prototype);

IDBVersionChangeEvent.prototype[Symbol.toStringTag] = 'IDBVersionChangeEventPrototype';

readonlyProperties.forEach(function (prop) {
    Object.defineProperty(IDBVersionChangeEvent.prototype, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
            if (!(this instanceof IDBVersionChangeEvent)) {
                throw new TypeError('Illegal invocation');
            }
            return this.__eventInitDict && this.__eventInitDict[prop] || (prop === 'oldVersion' ? 0 : null);
        }
    });
});

Object.defineProperty(IDBVersionChangeEvent, Symbol.hasInstance, {
    value: function value(obj) {
        return util.isObj(obj) && 'oldVersion' in obj && typeof obj.defaultPrevented === 'boolean';
    }
});

Object.defineProperty(IDBVersionChangeEvent.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBVersionChangeEvent
});

Object.defineProperty(IDBVersionChangeEvent, 'prototype', {
    writable: false
});

exports.default = IDBVersionChangeEvent;
module.exports = exports['default'];

},{"./Event":12,"./util":28}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.possiblyUpdateKeyGenerator = exports.generateKeyForStore = exports.assignCurrentNumber = exports.findMultiEntryMatches = exports.isKeyInRange = exports.isMultiEntryMatch = exports.checkKeyCouldBeInjectedIntoValue = exports.injectKeyIntoValueUsingKeyPath = exports.extractKeyValueDecodedFromValueUsingKeyPath = exports.evaluateKeyPathOnValue = exports.extractKeyFromValueUsingKeyPath = exports.convertValueToKeyRethrowingAndIfInvalid = exports.convertValueToMultiEntryKey = exports.convertValueToKey = exports.convertValueToMultiEntryKeyDecoded = exports.convertValueToKeyValueDecoded = exports.convertKeyToValue = exports.roundTrip = exports.decode = exports.encode = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _DOMException = require('./DOMException');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _cmp = require('./cmp');

var _cmp2 = _interopRequireDefault(_cmp);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Encodes the keys based on their types. This is required to maintain collations
 * We leave space for future keys
 */
var keyTypeToEncodedChar = {
    invalid: 100,
    number: 200,
    date: 300,
    string: 400,
    binary: 500,
    array: 600
};
var keyTypes = Object.keys(keyTypeToEncodedChar);
keyTypes.forEach(function (k) {
    keyTypeToEncodedChar[k] = String.fromCharCode(keyTypeToEncodedChar[k]);
});

var encodedCharToKeyType = keyTypes.reduce(function (o, k) {
    o[keyTypeToEncodedChar[k]] = k;
    return o;
}, {});

/**
 * The sign values for numbers, ordered from least to greatest.
 *  - "negativeInfinity": Sorts below all other values.
 *  - "bigNegative": Negative values less than or equal to negative one.
 *  - "smallNegative": Negative values between negative one and zero, noninclusive.
 *  - "smallPositive": Positive values between zero and one, including zero but not one.
 *  - "largePositive": Positive values greater than or equal to one.
 *  - "positiveInfinity": Sorts above all other values.
 */
var signValues = ['negativeInfinity', 'bigNegative', 'smallNegative', 'smallPositive', 'bigPositive', 'positiveInfinity'];

var types = {
    invalid: {
        encode: function encode(key) {
            return keyTypeToEncodedChar.invalid + '-';
        },
        decode: function decode(key) {
            return undefined;
        }
    },

    // Numbers are represented in a lexically sortable base-32 sign-exponent-mantissa
    // notation.
    //
    // sign: takes a value between zero and five, inclusive. Represents infinite cases
    //     and the signs of both the exponent and the fractional part of the number.
    // exponent: padded to two base-32 digits, represented by the 32's compliment in the
    //     "smallPositive" and "bigNegative" cases to ensure proper lexical sorting.
    // mantissa: also called the fractional part. Normed 11-digit base-32 representation.
    //     Represented by the 32's compliment in the "smallNegative" and "bigNegative"
    //     cases to ensure proper lexical sorting.
    number: {
        // The encode step checks for six numeric cases and generates 14-digit encoded
        // sign-exponent-mantissa strings.
        encode: function encode(key) {
            var key32 = key === Number.MIN_VALUE
            // Mocha test `IDBFactory/cmp-spec.js` exposed problem for some
            //   Node (and Chrome) versions with `Number.MIN_VALUE` being treated
            //   as 0
            // https://stackoverflow.com/questions/43305403/number-min-value-and-tostring
            ? '0.' + '0'.repeat(214) + '2' : Math.abs(key).toString(32);
            // Get the index of the decimal.
            var decimalIndex = key32.indexOf('.');
            // Remove the decimal.
            key32 = decimalIndex !== -1 ? key32.replace('.', '') : key32;
            // Get the index of the first significant digit.
            var significantDigitIndex = key32.search(/[^0]/);
            // Truncate leading zeros.
            key32 = key32.slice(significantDigitIndex);
            var sign = void 0,
                exponent = void 0,
                mantissa = void 0;

            // Finite cases:
            if (isFinite(key)) {
                // Negative cases:
                if (key < 0) {
                    // Negative exponent case:
                    if (key > -1) {
                        sign = signValues.indexOf('smallNegative');
                        exponent = padBase32Exponent(significantDigitIndex);
                        mantissa = flipBase32(padBase32Mantissa(key32));
                        // Non-negative exponent case:
                    } else {
                        sign = signValues.indexOf('bigNegative');
                        exponent = flipBase32(padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length));
                        mantissa = flipBase32(padBase32Mantissa(key32));
                    }
                    // Non-negative cases:
                } else {
                    // Negative exponent case:
                    if (key < 1) {
                        sign = signValues.indexOf('smallPositive');
                        exponent = flipBase32(padBase32Exponent(significantDigitIndex));
                        mantissa = padBase32Mantissa(key32);
                        // Non-negative exponent case:
                    } else {
                        sign = signValues.indexOf('bigPositive');
                        exponent = padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length);
                        mantissa = padBase32Mantissa(key32);
                    }
                }
                // Infinite cases:
            } else {
                exponent = zeros(2);
                mantissa = zeros(11);
                sign = signValues.indexOf(key > 0 ? 'positiveInfinity' : 'negativeInfinity');
            }

            return keyTypeToEncodedChar.number + '-' + sign + exponent + mantissa;
        },
        // The decode step must interpret the sign, reflip values encoded as the 32's complements,
        // apply signs to the exponent and mantissa, do the base-32 power operation, and return
        // the original JavaScript number values.
        decode: function decode(key) {
            var sign = +key.substr(2, 1);
            var exponent = key.substr(3, 2);
            var mantissa = key.substr(5, 11);

            switch (signValues[sign]) {
                case 'negativeInfinity':
                    return -Infinity;
                case 'positiveInfinity':
                    return Infinity;
                case 'bigPositive':
                    return pow32(mantissa, exponent);
                case 'smallPositive':
                    exponent = negate(flipBase32(exponent));
                    return pow32(mantissa, exponent);
                case 'smallNegative':
                    exponent = negate(exponent);
                    mantissa = flipBase32(mantissa);
                    return -pow32(mantissa, exponent);
                case 'bigNegative':
                    exponent = flipBase32(exponent);
                    mantissa = flipBase32(mantissa);
                    return -pow32(mantissa, exponent);
                default:
                    throw new Error('Invalid number.');
            }
        }
    },

    // Strings are encoded as JSON strings (with quotes and unicode characters escaped).
    //
    // If the strings are in an array, then some extra encoding is done to make sorting work correctly:
    // Since we can't force all strings to be the same length, we need to ensure that characters line-up properly
    // for sorting, while also accounting for the extra characters that are added when the array itself is encoded as JSON.
    // To do this, each character of the string is prepended with a dash ("-"), and a space is added to the end of the string.
    // This effectively doubles the size of every string, but it ensures that when two arrays of strings are compared,
    // the indexes of each string's characters line up with each other.
    string: {
        encode: function encode(key, inArray) {
            if (inArray) {
                // prepend each character with a dash, and append a space to the end
                key = key.replace(/(.)/g, '-$1') + ' ';
            }
            return keyTypeToEncodedChar.string + '-' + key;
        },
        decode: function decode(key, inArray) {
            key = key.slice(2);
            if (inArray) {
                // remove the space at the end, and the dash before each character
                key = key.substr(0, key.length - 1).replace(/-(.)/g, '$1');
            }
            return key;
        }
    },

    // Arrays are encoded as JSON strings.
    // An extra, value is added to each array during encoding to make empty arrays sort correctly.
    array: {
        encode: function encode(key) {
            var encoded = [];
            for (var i = 0; i < key.length; i++) {
                var item = key[i];
                var encodedItem = _encode(item, true); // encode the array item
                encoded[i] = encodedItem;
            }
            encoded.push(keyTypeToEncodedChar.invalid + '-'); // append an extra item, so empty arrays sort correctly
            return keyTypeToEncodedChar.array + '-' + JSON.stringify(encoded);
        },
        decode: function decode(key) {
            var decoded = JSON.parse(key.slice(2));
            decoded.pop(); // remove the extra item
            for (var i = 0; i < decoded.length; i++) {
                var item = decoded[i];
                var decodedItem = _decode(item, true); // decode the item
                decoded[i] = decodedItem;
            }
            return decoded;
        }
    },

    // Dates are encoded as ISO 8601 strings, in UTC time zone.
    date: {
        encode: function encode(key) {
            return keyTypeToEncodedChar.date + '-' + key.toJSON();
        },
        decode: function decode(key) {
            return new Date(key.slice(2));
        }
    },
    binary: { // `ArrayBuffer`/Views on buffers (`TypedArray` or `DataView`)
        encode: function encode(key) {
            return keyTypeToEncodedChar.binary + '-' + (key.byteLength ? [].concat(_toConsumableArray(getCopyBytesHeldByBufferSource(key))).map(function (b) {
                return util.padStart(b, 3, '0');
            }) // e.g., '255,005,254,000,001,033'
            : '');
        },
        decode: function decode(key) {
            // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
            var k = key.slice(2);
            var arr = k.length ? k.split(',').map(function (s) {
                return parseInt(s, 10);
            }) : [];
            var buffer = new ArrayBuffer(arr.length);
            var uint8 = new Uint8Array(buffer);
            uint8.set(arr);
            return buffer;
        }
    }
};

/**
 * Return a padded base-32 exponent value.
 * @param {number}
 * @return {string}
 */
function padBase32Exponent(n) {
    n = n.toString(32);
    return n.length === 1 ? '0' + n : n;
}

/**
 * Return a padded base-32 mantissa.
 * @param {string}
 * @return {string}
 */
function padBase32Mantissa(s) {
    return (s + zeros(11)).slice(0, 11);
}

/**
 * Flips each digit of a base-32 encoded string.
 * @param {string} encoded
 */
function flipBase32(encoded) {
    var flipped = '';
    for (var i = 0; i < encoded.length; i++) {
        flipped += (31 - parseInt(encoded[i], 32)).toString(32);
    }
    return flipped;
}

/**
 * Base-32 power function.
 * RESEARCH: This function does not precisely decode floats because it performs
 * floating point arithmetic to recover values. But can the original values be
 * recovered exactly?
 * Someone may have already figured out a good way to store JavaScript floats as
 * binary strings and convert back. Barring a better method, however, one route
 * may be to generate decimal strings that `parseFloat` decodes predictably.
 * @param {string}
 * @param {string}
 * @return {number}
 */
function pow32(mantissa, exponent) {
    exponent = parseInt(exponent, 32);
    if (exponent < 0) {
        return roundToPrecision(parseInt(mantissa, 32) * Math.pow(32, exponent - 10));
    } else {
        if (exponent < 11) {
            var whole = mantissa.slice(0, exponent);
            whole = parseInt(whole, 32);
            var fraction = mantissa.slice(exponent);
            fraction = parseInt(fraction, 32) * Math.pow(32, exponent - 11);
            return roundToPrecision(whole + fraction);
        } else {
            var expansion = mantissa + zeros(exponent - 11);
            return parseInt(expansion, 32);
        }
    }
}

/**
 *
 */
function roundToPrecision(num, precision) {
    precision = precision || 16;
    return parseFloat(num.toPrecision(precision));
}

/**
 * Returns a string of n zeros.
 * @param {number}
 * @return {string}
 */
function zeros(n) {
    return '0'.repeat(n);
}

/**
 * Negates numeric strings.
 * @param {string}
 * @return {string}
 */
function negate(s) {
    return '-' + s;
}

/**
 * Returns the string "number", "date", "string", "binary", or "array"
 */
function getKeyType(key) {
    if (Array.isArray(key)) return 'array';
    if (util.isDate(key)) return 'date';
    if (util.isBinary(key)) return 'binary';
    var keyType = typeof key === 'undefined' ? 'undefined' : _typeof(key);
    return ['string', 'number'].includes(keyType) ? keyType : 'invalid';
}

/**
 * Keys must be strings, numbers (besides NaN), Dates (if value is not NaN),
 *   binary objects or Arrays
 * @param input The key input
 * @param seen An array of already seen keys
 */
function convertValueToKey(input, seen) {
    return convertValueToKeyValueDecoded(input, seen, false, true);
}

/**
* Currently not in use
*/
function convertValueToMultiEntryKey(input) {
    return convertValueToKeyValueDecoded(input, null, true, true);
}

// https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
function getCopyBytesHeldByBufferSource(O) {
    var offset = 0;
    var length = 0;
    if (ArrayBuffer.isView(O)) {
        // Has [[ViewedArrayBuffer]] internal slot
        var arrayBuffer = O.buffer;
        if (arrayBuffer === undefined) {
            throw new TypeError('Could not copy the bytes held by a buffer source as the buffer was undefined.');
        }
        offset = O.byteOffset; // [[ByteOffset]] (will also throw as desired if detached)
        length = O.byteLength; // [[ByteLength]] (will also throw as desired if detached)
    } else {
        length = O.byteLength; // [[ArrayBufferByteLength]] on ArrayBuffer (will also throw as desired if detached)
    }
    // const octets = new Uint8Array(input);
    // const octets = types.binary.decode(types.binary.encode(input));
    return new Uint8Array(O.buffer || O, offset, length);
}

/**
* Shortcut utility to avoid returning full keys from `convertValueToKey`
*   and subsequent need to process in calling code unless `fullKeys` is
*   set; may throw
*/
function convertValueToKeyValueDecoded(input, seen, multiEntry, fullKeys) {
    seen = seen || [];
    if (seen.includes(input)) return { type: 'array', invalid: true, message: 'An array key cannot be circular' };
    var type = getKeyType(input);
    var ret = { type: type, value: input };
    switch (type) {
        case 'number':
            {
                if (Number.isNaN(input)) {
                    return { type: 'NaN', invalid: true }; // List as 'NaN' type for convenience of consumers in reporting errors
                }
                return ret;
            }case 'string':
            {
                return ret;
            }case 'binary':
            {
                // May throw (if detached)
                // Get a copy of the bytes held by the buffer source
                // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
                var octets = getCopyBytesHeldByBufferSource(input);
                return { type: 'binary', value: octets };
            }case 'array':
            {
                // May throw (from binary)
                var len = input.length;
                seen.push(input);
                var keys = [];
                for (var i = 0; i < len; i++) {
                    // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
                    if (!multiEntry && !Object.prototype.hasOwnProperty.call(input, i)) {
                        return { type: type, invalid: true, message: 'Does not have own index property' };
                    }
                    try {
                        var _ret = function () {
                            var entry = input[i];
                            var key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry
                            if (key.invalid) {
                                if (multiEntry) {
                                    return 'continue';
                                }
                                return {
                                    v: { type: type, invalid: true, message: 'Bad array entry value-to-key conversion' }
                                };
                            }
                            if (!multiEntry || !fullKeys && keys.every(function (k) {
                                return (0, _cmp2.default)(k, key.value) !== 0;
                            }) || fullKeys && keys.every(function (k) {
                                return (0, _cmp2.default)(k, key) !== 0;
                            })) {
                                keys.push(fullKeys ? key : key.value);
                            }
                        }();

                        switch (_ret) {
                            case 'continue':
                                continue;

                            default:
                                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        }
                    } catch (err) {
                        if (!multiEntry) {
                            throw err;
                        }
                    }
                }
                return { type: type, value: keys };
            }case 'date':
            {
                if (!Number.isNaN(input.getTime())) {
                    return fullKeys ? { type: type, value: input.getTime() } : { type: type, value: new Date(input.getTime()) };
                }
                return { type: type, invalid: true, message: 'Not a valid date' };
                // Falls through
            }case 'invalid':default:
            {
                // Other `typeof` types which are not valid keys:
                //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function
                var _type = input === null ? 'null' : typeof input === 'undefined' ? 'undefined' : _typeof(input); // Convert `null` for convenience of consumers in reporting errors
                return { type: _type, invalid: true, message: 'Not a valid key; type ' + _type };
            }
    }
}
function convertValueToMultiEntryKeyDecoded(key, fullKeys) {
    return convertValueToKeyValueDecoded(key, null, true, fullKeys);
}

/**
* An internal utility
*/
function convertValueToKeyRethrowingAndIfInvalid(input, seen) {
    var key = convertValueToKey(input, seen);
    if (key.invalid) {
        throw (0, _DOMException.createDOMException)('DataError', key.message || 'Not a valid key; type: ' + key.type);
    }
    return key;
}

function extractKeyFromValueUsingKeyPath(value, keyPath, multiEntry) {
    return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
}
/**
* Not currently in use
*/
function evaluateKeyPathOnValue(value, keyPath, multiEntry) {
    return evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, true);
}

/**
* May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
*    or `{invalid: true}` (e.g., `NaN`)
*/
function extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, fullKeys) {
    var r = evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys);
    if (r.failure) {
        return r;
    }
    if (!multiEntry) {
        return convertValueToKeyValueDecoded(r.value, null, false, fullKeys);
    }
    return convertValueToMultiEntryKeyDecoded(r.value, fullKeys);
}

/**
 * Returns the value of an inline key based on a key path (wrapped in an object with key `value`)
 *   or `{failure: true}`
 * @param {object} value
 * @param {string|array} keyPath
 * @param {boolean} multiEntry
 * @returns {undefined|array|string}
 */
function evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys) {
    if (Array.isArray(keyPath)) {
        var result = [];
        return keyPath.some(function (item) {
            var key = evaluateKeyPathOnValueToDecodedValue(value, item, multiEntry, fullKeys);
            if (key.failure) {
                return true;
            }
            result.push(key.value);
        }, []) ? { failure: true } : { value: result };
    }
    if (keyPath === '') {
        return { value: value };
    }
    var identifiers = keyPath.split('.');
    return identifiers.some(function (idntfr, i) {
        if (idntfr === 'length' && (typeof value === 'string' || Array.isArray(value))) {
            value = value.length;
        } else if (util.isBlob(value)) {
            switch (idntfr) {
                case 'size':case 'type':
                    value = value[idntfr];
                    break;
            }
        } else if (util.isFile(value)) {
            switch (idntfr) {
                case 'name':case 'lastModified':
                    value = value[idntfr];
                    break;
                case 'lastModifiedDate':
                    value = new Date(value.lastModified);
                    break;
            }
        } else if (!util.isObj(value) || !Object.prototype.hasOwnProperty.call(value, idntfr)) {
            return true;
        } else {
            value = value[idntfr];
            return value === undefined;
        }
    }) ? { failure: true } : { value: value };
}

/**
 * Sets the inline key value
 * @param {object} value
 * @param {*} key
 * @param {string} keyPath
 */
function injectKeyIntoValueUsingKeyPath(value, key, keyPath) {
    var identifiers = keyPath.split('.');
    var last = identifiers.pop();
    for (var i = 0; i < identifiers.length; i++) {
        var identifier = identifiers[i];
        var hop = Object.prototype.hasOwnProperty.call(value, identifier);
        if (!hop) {
            value[identifier] = {};
        }
        value = value[identifier];
    }
    value[last] = key; // key is already a `keyValue` in our processing so no need to convert
}

// See https://github.com/w3c/IndexedDB/pull/146
function checkKeyCouldBeInjectedIntoValue(value, keyPath) {
    var identifiers = keyPath.split('.');
    identifiers.pop();
    for (var i = 0; i < identifiers.length; i++) {
        if (!util.isObj(value)) {
            return false;
        }
        var identifier = identifiers[i];
        var hop = Object.prototype.hasOwnProperty.call(value, identifier);
        if (!hop) {
            return true;
        }
        value = value[identifier];
    }
    return util.isObj(value);
}

function isKeyInRange(key, range, checkCached) {
    var lowerMatch = range.lower === undefined;
    var upperMatch = range.upper === undefined;
    var encodedKey = _encode(key, true);
    var lower = checkCached ? range.__lowerCached : _encode(range.lower, true);
    var upper = checkCached ? range.__upperCached : _encode(range.upper, true);

    if (range.lower !== undefined) {
        if (range.lowerOpen && encodedKey > lower) {
            lowerMatch = true;
        }
        if (!range.lowerOpen && encodedKey >= lower) {
            lowerMatch = true;
        }
    }
    if (range.upper !== undefined) {
        if (range.upperOpen && encodedKey < upper) {
            upperMatch = true;
        }
        if (!range.upperOpen && encodedKey <= upper) {
            upperMatch = true;
        }
    }

    return lowerMatch && upperMatch;
}

/**
 * Determines whether an index entry matches a multi-entry key value.
 * @param {string} encodedEntry     The entry value (already encoded)
 * @param {string} encodedKey       The full index key (already encoded)
 * @returns {boolean}
 */
function isMultiEntryMatch(encodedEntry, encodedKey) {
    var keyType = encodedCharToKeyType[encodedKey.slice(0, 1)];

    if (keyType === 'array') {
        return encodedKey.indexOf(encodedEntry) > 1;
    } else {
        return encodedKey === encodedEntry;
    }
}

function findMultiEntryMatches(keyEntry, range) {
    var matches = [];

    if (Array.isArray(keyEntry)) {
        for (var i = 0; i < keyEntry.length; i++) {
            var key = keyEntry[i];

            if (Array.isArray(key)) {
                if (range && range.lower === range.upper) {
                    continue;
                }
                if (key.length === 1) {
                    key = key[0];
                } else {
                    var nested = findMultiEntryMatches(key, range);
                    if (nested.length > 0) {
                        matches.push(key);
                    }
                    continue;
                }
            }

            if (range == null || isKeyInRange(key, range, true)) {
                matches.push(key);
            }
        }
    } else {
        if (range == null || isKeyInRange(keyEntry, range, true)) {
            matches.push(keyEntry);
        }
    }
    return matches;
}

/**
* Not currently in use but keeping for spec parity
*/
function convertKeyToValue(key) {
    var type = key.type;
    var value = key.value;
    switch (type) {
        case 'number':case 'string':
            {
                return value;
            }case 'array':
            {
                var array = [];
                var len = value.length;
                var index = 0;
                while (index < len) {
                    var entry = convertKeyToValue(value[index]);
                    array[index] = entry;
                    index++;
                }
                return array;
            }case 'date':
            {
                return new Date(value);
            }case 'binary':
            {
                var _len = value.length;
                var buffer = new ArrayBuffer(_len);
                // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
                var uint8 = new Uint8Array(buffer, value.byteOffset || 0, value.byteLength);
                uint8.set(value);
                return buffer;
            }case 'invalid':default:
            throw new Error('Bad key');
    }
}

function _encode(key, inArray) {
    // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
    if (key === undefined) {
        return null;
    }
    // array, date, number, string, binary (should already have detected "invalid")
    return types[getKeyType(key)].encode(key, inArray);
}
function _decode(key, inArray) {
    if (typeof key !== 'string') {
        return undefined;
    }
    return types[encodedCharToKeyType[key.slice(0, 1)]].decode(key, inArray);
}

function roundTrip(key, inArray) {
    return _decode(_encode(key, inArray), inArray);
}

var MAX_ALLOWED_CURRENT_NUMBER = 9007199254740992; // 2 ^ 53 (Also equal to `Number.MAX_SAFE_INTEGER + 1`)

function getCurrentNumber(tx, store, callback, sqlFailCb) {
    tx.executeSql('SELECT "currNum" FROM __sys__ WHERE "name" = ?', [util.escapeSQLiteStatement(store.__currentName)], function (tx, data) {
        if (data.rows.length !== 1) {
            callback(1); // eslint-disable-line standard/no-callback-literal
        } else {
            callback(data.rows.item(0).currNum);
        }
    }, function (tx, error) {
        sqlFailCb((0, _DOMException.createDOMException)('DataError', 'Could not get the auto increment value for key', error));
    });
}

function assignCurrentNumber(tx, store, num, successCb, failCb) {
    var sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
    var sqlValues = [num, util.escapeSQLiteStatement(store.__currentName)];
    _CFG2.default.DEBUG && console.log(sql, sqlValues);
    tx.executeSql(sql, sqlValues, function (tx, data) {
        successCb(num);
    }, function (tx, err) {
        failCb((0, _DOMException.createDOMException)('UnknownError', 'Could not set the auto increment value for key', err));
    });
}

// Bump up the auto-inc counter if the key path-resolved value is valid (greater than old value and >=1) OR
//  if a manually passed in key is valid (numeric and >= 1) and >= any primaryKey
function setCurrentNumber(tx, store, num, successCb, failCb) {
    num = num === MAX_ALLOWED_CURRENT_NUMBER ? num + 2 // Since incrementing by one will have no effect in JavaScript on this unsafe max, we represent the max as a number incremented by two. The getting of the current number is never returned to the user and is only used in safe comparisons, so it is safe for us to represent it in this manner
    : num + 1;
    return assignCurrentNumber(tx, store, num, successCb, failCb);
}

function generateKeyForStore(tx, store, cb, sqlFailCb) {
    getCurrentNumber(tx, store, function (key) {
        if (key > MAX_ALLOWED_CURRENT_NUMBER) {
            // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
            return cb('failure'); // eslint-disable-line standard/no-callback-literal
        }
        // Increment current number by 1 (we cannot leverage SQLite's
        //  autoincrement (and decrement when not needed), as decrementing
        //  will be overwritten/ignored upon the next insert)
        setCurrentNumber(tx, store, key, function () {
            cb(null, key, key);
        }, sqlFailCb);
    }, sqlFailCb);
}

// Fractional or numbers exceeding the max do not get changed in the result
//     per https://github.com/w3c/IndexedDB/issues/147
//     so we do not return a key
function possiblyUpdateKeyGenerator(tx, store, key, successCb, sqlFailCb) {
    // Per https://github.com/w3c/IndexedDB/issues/147 , non-finite numbers
    //   (or numbers larger than the max) are now to have the explicit effect of
    //   setting the current number (up to the max), so we do not optimize them
    //   out here
    if (typeof key !== 'number' || key < 1) {
        // Optimize with no need to get the current number
        // Auto-increment attempted with a bad key;
        //   we are not to change the current number, but the steps don't call for failure
        // Numbers < 1 are optimized out as they will never be greater than the current number which must be at least 1
        successCb();
    } else {
        // If auto-increment and the keyPath item is a valid numeric key, get the old auto-increment to compare if the new is higher
        //  to determine which to use and whether to update the current number
        getCurrentNumber(tx, store, function (cn) {
            var value = Math.floor(Math.min(key, MAX_ALLOWED_CURRENT_NUMBER));
            var useNewKeyForAutoInc = value >= cn;
            if (useNewKeyForAutoInc) {
                setCurrentNumber(tx, store, value, function () {
                    successCb(cn); // Supply old current number in case needs to be reverted
                }, sqlFailCb);
            } else {
                // Not updated
                successCb();
            }
        }, sqlFailCb);
    }
}

/* eslint-disable object-property-newline */
exports.encode = _encode;
exports.decode = _decode;
exports.roundTrip = roundTrip;
exports.convertKeyToValue = convertKeyToValue;
exports.convertValueToKeyValueDecoded = convertValueToKeyValueDecoded;
exports.convertValueToMultiEntryKeyDecoded = convertValueToMultiEntryKeyDecoded;
exports.convertValueToKey = convertValueToKey;
exports.convertValueToMultiEntryKey = convertValueToMultiEntryKey;
exports.convertValueToKeyRethrowingAndIfInvalid = convertValueToKeyRethrowingAndIfInvalid;
exports.extractKeyFromValueUsingKeyPath = extractKeyFromValueUsingKeyPath;
exports.evaluateKeyPathOnValue = evaluateKeyPathOnValue;
exports.extractKeyValueDecodedFromValueUsingKeyPath = extractKeyValueDecodedFromValueUsingKeyPath;
exports.injectKeyIntoValueUsingKeyPath = injectKeyIntoValueUsingKeyPath;
exports.checkKeyCouldBeInjectedIntoValue = checkKeyCouldBeInjectedIntoValue;
exports.isMultiEntryMatch = isMultiEntryMatch;
exports.isKeyInRange = isKeyInRange;
exports.findMultiEntryMatches = findMultiEntryMatches;
exports.assignCurrentNumber = assignCurrentNumber;
exports.generateKeyForStore = generateKeyForStore;
exports.possiblyUpdateKeyGenerator = possiblyUpdateKeyGenerator;

},{"./CFG":9,"./DOMException":10,"./cmp":26,"./util":28}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clone = exports.decode = exports.encode = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
// import Blob from 'w3c-blob'; // Needed by Node; uses native if available (browser)

var _typeson = require('typeson');

var _typeson2 = _interopRequireDefault(_typeson);

var _structuredCloningThrowing = require('typeson-registry/dist/presets/structured-cloning-throwing');

var _structuredCloningThrowing2 = _interopRequireDefault(_structuredCloningThrowing);

var _DOMException = require('./DOMException');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Todo: Register `ImageBitmap` and add `Blob`/`File`/`FileList`
// Todo: add a proper polyfill for `ImageData` using node-canvas
// See also: http://stackoverflow.com/questions/42170826/categories-for-rejection-by-the-structured-cloning-algorithm

function traverseMapToRevertToLegacyTypeNames(obj) {
    if (Array.isArray(obj)) {
        return obj.forEach(traverseMapToRevertToLegacyTypeNames);
    }
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        // Should be all
        Object.entries(obj).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                prop = _ref2[0],
                val = _ref2[1];

            if (prop in newTypeNamesToLegacy) {
                var legacyProp = newTypeNamesToLegacy[prop];
                delete obj[prop];
                obj[legacyProp] = val;
            }
        });
    }
}

var structuredCloning = _structuredCloningThrowing2.default;
var newTypeNamesToLegacy = {
    IntlCollator: 'Intl.Collator',
    IntlDateTimeFormat: 'Intl.DateTimeFormat',
    IntlNumberFormat: 'Intl.NumberFormat',
    userObject: 'userObjects',
    undef: 'undefined',
    negativeInfinity: 'NegativeInfinity',
    nonbuiltinIgnore: 'nonBuiltInIgnore',
    arraybuffer: 'ArrayBuffer',
    blob: 'Blob',
    dataview: 'DataView',
    date: 'Date',
    error: 'Error',
    file: 'File',
    filelist: 'FileList',
    imagebitmap: 'ImageBitmap',
    imagedata: 'ImageData',
    infinity: 'Infinity',
    map: 'Map',
    nan: 'NaN',
    regexp: 'RegExp',
    set: 'Set',
    int8array: 'Int8Array',
    uint8array: 'Uint8Array',
    uint8clampedarray: 'Uint8ClampedArray',
    int16array: 'Int16Array',
    uint16array: 'Uint16Array',
    int32array: 'Int32Array',
    uint32array: 'Uint32Array',
    float32array: 'Float32Array',
    float64array: 'Float64Array'
};

// Todo: We should make this conditional on CONFIG and deprecate the legacy
//   names, but for compatibility with data created under this major version,
//   we need the legacy now

// console.log('StructuredCloning1', JSON.stringify(structuredCloning));
traverseMapToRevertToLegacyTypeNames(structuredCloning);
// console.log('StructuredCloning2', JSON.stringify(structuredCloning));

var typeson = new _typeson2.default().register(structuredCloning);

// We are keeping the callback approach for now in case we wish to reexpose Blob, File, FileList
function encode(obj, cb) {
    var ret = void 0;
    try {
        ret = typeson.stringifySync(obj);
    } catch (err) {
        // SCA in typeson-registry using `DOMException` which is not defined (e.g., in Node)
        if (_typeson2.default.hasConstructorOf(err, ReferenceError) ||
        // SCA in typeson-registry threw a cloning error and we are in a
        //   supporting environment (e.g., the browser) where `ShimDOMException` is
        //   an alias for `DOMException`; if typeson-registry ever uses our shim
        //   to throw, we can use this condition alone.
        _typeson2.default.hasConstructorOf(err, _DOMException.ShimDOMException)) {
            throw (0, _DOMException.createDOMException)('DataCloneError', 'The object cannot be cloned.');
        }
        // We should rethrow non-cloning exceptions like from
        //  throwing getters (as in the W3C test, key-conversion-exceptions.htm)
        throw err;
    }
    if (cb) cb(ret);
    return ret;
}

function decode(obj) {
    return typeson.parse(obj);
}

function clone(val) {
    // We don't return the intermediate `encode` as we'll need to reencode the clone as it may differ
    return decode(encode(val));
}

exports.encode = encode;
exports.decode = decode;
exports.clone = clone;

},{"./DOMException":10,"typeson":7,"typeson-registry/dist/presets/structured-cloning-throwing":6}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ID_Start (includes Other_ID_Start)
var UnicodeIDStart = '(?:[$A-Z_a-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B4\\u08B6-\\u08BD\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C80\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D54-\\u0D56\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1C80-\\u1C88\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2118-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309B-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AE\\uA7B0-\\uA7B7\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDD40-\\uDD74\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDF00-\\uDF1F\\uDF30-\\uDF4A\\uDF50-\\uDF75\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDFD1-\\uDFD5]|\\uD801[\\uDC00-\\uDC9D\\uDCB0-\\uDCD3\\uDCD8-\\uDCFB\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00\\uDE10-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE4\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC03-\\uDC37\\uDC83-\\uDCAF\\uDCD0-\\uDCE8\\uDD03-\\uDD26\\uDD50-\\uDD72\\uDD76\\uDD83-\\uDDB2\\uDDC1-\\uDDC4\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE2B\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEDE\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3D\\uDF50\\uDF5D-\\uDF61]|\\uD805[\\uDC00-\\uDC34\\uDC47-\\uDC4A\\uDC80-\\uDCAF\\uDCC4\\uDCC5\\uDCC7\\uDD80-\\uDDAE\\uDDD8-\\uDDDB\\uDE00-\\uDE2F\\uDE44\\uDE80-\\uDEAA\\uDF00-\\uDF19]|\\uD806[\\uDCA0-\\uDCDF\\uDCFF\\uDEC0-\\uDEF8]|\\uD807[\\uDC00-\\uDC08\\uDC0A-\\uDC2E\\uDC40\\uDC72-\\uDC8F]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC00-\\uDC6E\\uDC80-\\uDD43]|[\\uD80C\\uD81C-\\uD820\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDED0-\\uDEED\\uDF00-\\uDF2F\\uDF40-\\uDF43\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50\\uDF93-\\uDF9F\\uDFE0]|\\uD821[\\uDC00-\\uDFEC]|\\uD822[\\uDC00-\\uDEF2]|\\uD82C[\\uDC00\\uDC01]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB]|\\uD83A[\\uDC00-\\uDCC4\\uDD00-\\uDD43]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D])';

// ID_Continue (includes Other_ID_Continue)
var UnicodeIDContinue = '(?:[$0-9A-Z_a-z\\xAA\\xB5\\xB7\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B4\\u08B6-\\u08BD\\u08D4-\\u08E1\\u08E3-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0AF9\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58-\\u0C5A\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C80-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D54-\\u0D57\\u0D5F-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1369-\\u1371\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19DA\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1C80-\\u1C88\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFB-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2118-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AE\\uA7B0-\\uA7B7\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C5\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA8FD\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2F\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDD40-\\uDD74\\uDDFD\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDEE0\\uDF00-\\uDF1F\\uDF30-\\uDF4A\\uDF50-\\uDF7A\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDFD1-\\uDFD5]|\\uD801[\\uDC00-\\uDC9D\\uDCA0-\\uDCA9\\uDCB0-\\uDCD3\\uDCD8-\\uDCFB\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00-\\uDE03\\uDE05\\uDE06\\uDE0C-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE38-\\uDE3A\\uDE3F\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE6\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC00-\\uDC46\\uDC66-\\uDC6F\\uDC7F-\\uDCBA\\uDCD0-\\uDCE8\\uDCF0-\\uDCF9\\uDD00-\\uDD34\\uDD36-\\uDD3F\\uDD50-\\uDD73\\uDD76\\uDD80-\\uDDC4\\uDDCA-\\uDDCC\\uDDD0-\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE37\\uDE3E\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEEA\\uDEF0-\\uDEF9\\uDF00-\\uDF03\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3C-\\uDF44\\uDF47\\uDF48\\uDF4B-\\uDF4D\\uDF50\\uDF57\\uDF5D-\\uDF63\\uDF66-\\uDF6C\\uDF70-\\uDF74]|\\uD805[\\uDC00-\\uDC4A\\uDC50-\\uDC59\\uDC80-\\uDCC5\\uDCC7\\uDCD0-\\uDCD9\\uDD80-\\uDDB5\\uDDB8-\\uDDC0\\uDDD8-\\uDDDD\\uDE00-\\uDE40\\uDE44\\uDE50-\\uDE59\\uDE80-\\uDEB7\\uDEC0-\\uDEC9\\uDF00-\\uDF19\\uDF1D-\\uDF2B\\uDF30-\\uDF39]|\\uD806[\\uDCA0-\\uDCE9\\uDCFF\\uDEC0-\\uDEF8]|\\uD807[\\uDC00-\\uDC08\\uDC0A-\\uDC36\\uDC38-\\uDC40\\uDC50-\\uDC59\\uDC72-\\uDC8F\\uDC92-\\uDCA7\\uDCA9-\\uDCB6]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC00-\\uDC6E\\uDC80-\\uDD43]|[\\uD80C\\uD81C-\\uD820\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDE60-\\uDE69\\uDED0-\\uDEED\\uDEF0-\\uDEF4\\uDF00-\\uDF36\\uDF40-\\uDF43\\uDF50-\\uDF59\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50-\\uDF7E\\uDF8F-\\uDF9F\\uDFE0]|\\uD821[\\uDC00-\\uDFEC]|\\uD822[\\uDC00-\\uDEF2]|\\uD82C[\\uDC00\\uDC01]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99\\uDC9D\\uDC9E]|\\uD834[\\uDD65-\\uDD69\\uDD6D-\\uDD72\\uDD7B-\\uDD82\\uDD85-\\uDD8B\\uDDAA-\\uDDAD\\uDE42-\\uDE44]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB\\uDFCE-\\uDFFF]|\\uD836[\\uDE00-\\uDE36\\uDE3B-\\uDE6C\\uDE75\\uDE84\\uDE9B-\\uDE9F\\uDEA1-\\uDEAF]|\\uD838[\\uDC00-\\uDC06\\uDC08-\\uDC18\\uDC1B-\\uDC21\\uDC23\\uDC24\\uDC26-\\uDC2A]|\\uD83A[\\uDC00-\\uDCC4\\uDCD0-\\uDCD6\\uDD00-\\uDD4A\\uDD50-\\uDD59]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D]|\\uDB40[\\uDD00-\\uDDEF])';

exports.UnicodeIDStart = UnicodeIDStart;
exports.UnicodeIDContinue = UnicodeIDContinue;

},{}],25:[function(require,module,exports){
'use strict';

var _UnicodeIdentifiers = require('./UnicodeIdentifiers');

var UnicodeIdentifiers = _interopRequireWildcard(_UnicodeIdentifiers);

var _setGlobalVars = require('./setGlobalVars');

var _setGlobalVars2 = _interopRequireDefault(_setGlobalVars);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// BEGIN: Same code as in browser.js
_CFG2.default.win = typeof window !== 'undefined' ? window : self; // For Web Workers

/* eslint-env browser, worker */
/* global shimIndexedDB */
(0, _setGlobalVars2.default)();
// END: Same code as in browser.js

var __setUnicodeIdentifiers = shimIndexedDB.__setUnicodeIdentifiers.bind(shimIndexedDB);
shimIndexedDB.__setUnicodeIdentifiers = function () {
    __setUnicodeIdentifiers(UnicodeIdentifiers);
};

shimIndexedDB.__setUnicodeIdentifiers();

},{"./CFG":9,"./UnicodeIdentifiers":24,"./setGlobalVars":27}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _Key = require('./Key');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compares two keys
 * @param key1
 * @param key2
 * @returns {number}
 */
function cmp(first, second) {
    var encodedKey1 = (0, _Key.encode)(first);
    var encodedKey2 = (0, _Key.encode)(second);
    var result = encodedKey1 > encodedKey2 ? 1 : encodedKey1 === encodedKey2 ? 0 : -1;

    if (_CFG2.default.DEBUG) {
        // verify that the keys encoded correctly
        var decodedKey1 = (0, _Key.decode)(encodedKey1);
        var decodedKey2 = (0, _Key.decode)(encodedKey2);
        if ((typeof first === 'undefined' ? 'undefined' : _typeof(first)) === 'object') {
            first = JSON.stringify(first);
            decodedKey1 = JSON.stringify(decodedKey1);
        }
        if ((typeof second === 'undefined' ? 'undefined' : _typeof(second)) === 'object') {
            second = JSON.stringify(second);
            decodedKey2 = JSON.stringify(decodedKey2);
        }

        // encoding/decoding mismatches are usually due to a loss of floating-point precision
        if (decodedKey1 !== first) {
            console.warn(first + ' was incorrectly encoded as ' + decodedKey1);
        }
        if (decodedKey2 !== second) {
            console.warn(second + ' was incorrectly encoded as ' + decodedKey2);
        }
    }

    return result;
}

exports.default = cmp;
module.exports = exports['default'];

},{"./CFG":9,"./Key":22}],27:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* globals self */


var _IDBVersionChangeEvent = require('./IDBVersionChangeEvent');

var _IDBVersionChangeEvent2 = _interopRequireDefault(_IDBVersionChangeEvent);

var _IDBCursor = require('./IDBCursor');

var _IDBRequest = require('./IDBRequest');

var _DOMException = require('./DOMException');

var _IDBFactory = require('./IDBFactory');

var _IDBKeyRange = require('./IDBKeyRange');

var _IDBKeyRange2 = _interopRequireDefault(_IDBKeyRange);

var _IDBObjectStore = require('./IDBObjectStore');

var _IDBObjectStore2 = _interopRequireDefault(_IDBObjectStore);

var _IDBIndex = require('./IDBIndex');

var _IDBIndex2 = _interopRequireDefault(_IDBIndex);

var _IDBTransaction = require('./IDBTransaction');

var _IDBTransaction2 = _interopRequireDefault(_IDBTransaction);

var _IDBDatabase = require('./IDBDatabase');

var _IDBDatabase2 = _interopRequireDefault(_IDBDatabase);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setConfig(prop, val) {
    if (prop && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
        for (var p in prop) {
            setConfig(p, prop[p]);
        }
        return;
    }
    if (!(prop in _CFG2.default)) {
        throw new Error(prop + ' is not a valid configuration property');
    }
    _CFG2.default[prop] = val;
}

function setGlobalVars(idb, initialConfig) {
    if (initialConfig) {
        setConfig(initialConfig);
    }
    var IDB = idb || (typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {});
    function shim(name, value, propDesc) {
        if (!propDesc || !Object.defineProperty) {
            try {
                // Try setting the property. This will fail if the property is read-only.
                IDB[name] = value;
            } catch (e) {
                console.log(e);
            }
        }
        if (IDB[name] !== value && Object.defineProperty) {
            // Setting a read-only property failed, so try re-defining the property
            try {
                var desc = propDesc || {};
                if (!('value' in desc)) {
                    desc.get = function () {
                        return value;
                    };
                }
                Object.defineProperty(IDB, name, desc);
            } catch (e) {
                // With `indexedDB`, PhantomJS fails here and below but
                //  not above, while Chrome is reverse (and Firefox doesn't
                //  get here since no WebSQL to use for shimming)
            }
        }
        if (IDB[name] !== value) {
            typeof console !== 'undefined' && console.warn && console.warn('Unable to shim ' + name);
        }
    }
    if (_CFG2.default.win.openDatabase !== undefined) {
        shim('shimIndexedDB', _IDBFactory.shimIndexedDB, {
            enumerable: false,
            configurable: true
        });
    }
    if (IDB.shimIndexedDB) {
        IDB.shimIndexedDB.__useShim = function () {
            function setNonIDBGlobals() {
                var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                shim(prefix + 'DOMException', IDB.indexedDB.modules.ShimDOMException);
                shim(prefix + 'DOMStringList', IDB.indexedDB.modules.ShimDOMStringList, {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: IDB.indexedDB.modules.ShimDOMStringList
                });
                shim(prefix + 'Event', IDB.indexedDB.modules.ShimEvent, {
                    configurable: true,
                    writable: true,
                    value: IDB.indexedDB.modules.ShimEvent,
                    enumerable: false
                });
                shim(prefix + 'CustomEvent', IDB.indexedDB.modules.ShimCustomEvent, {
                    configurable: true,
                    writable: true,
                    value: IDB.indexedDB.modules.ShimCustomEvent,
                    enumerable: false
                });
                shim(prefix + 'EventTarget', IDB.indexedDB.modules.ShimEventTarget, {
                    configurable: true,
                    writable: true,
                    value: IDB.indexedDB.modules.ShimEventTarget,
                    enumerable: false
                });
            }
            var shimIDBFactory = IDB.shimIndexedDB.modules.IDBFactory;
            if (_CFG2.default.win.openDatabase !== undefined) {
                _IDBFactory.shimIndexedDB.__openDatabase = _CFG2.default.win.openDatabase.bind(_CFG2.default.win); // We cache here in case the function is overwritten later as by the IndexedDB support promises tests
                // Polyfill ALL of IndexedDB, using WebSQL
                [['indexedDB', _IDBFactory.shimIndexedDB], ['IDBFactory', shimIDBFactory], ['IDBDatabase', _IDBDatabase2.default], ['IDBObjectStore', _IDBObjectStore2.default], ['IDBIndex', _IDBIndex2.default], ['IDBTransaction', _IDBTransaction2.default], ['IDBCursor', _IDBCursor.IDBCursor], ['IDBCursorWithValue', _IDBCursor.IDBCursorWithValue], ['IDBKeyRange', _IDBKeyRange2.default], ['IDBRequest', _IDBRequest.IDBRequest], ['IDBOpenDBRequest', _IDBRequest.IDBOpenDBRequest], ['IDBVersionChangeEvent', _IDBVersionChangeEvent2.default]].forEach(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        prop = _ref2[0],
                        obj = _ref2[1];

                    shim(prop, obj, {
                        enumerable: false,
                        configurable: true
                    });
                });
                if (_CFG2.default.fullIDLSupport) {
                    // Slow per MDN so off by default! Though apparently needed for WebIDL: http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
                    Object.setPrototypeOf(IDB.IDBOpenDBRequest, IDB.IDBRequest);
                    Object.setPrototypeOf(IDB.IDBCursorWithValue, IDB.IDBCursor);

                    var ShimEvent = IDB.shimIndexedDB.modules.ShimEvent;
                    var ShimEventTarget = IDB.shimIndexedDB.modules.ShimEventTarget;
                    Object.setPrototypeOf(_IDBDatabase2.default, ShimEventTarget);
                    Object.setPrototypeOf(_IDBRequest.IDBRequest, ShimEventTarget);
                    Object.setPrototypeOf(_IDBTransaction2.default, ShimEventTarget);
                    Object.setPrototypeOf(_IDBVersionChangeEvent2.default, ShimEvent);
                    Object.setPrototypeOf(_DOMException.ShimDOMException, Error);
                    Object.setPrototypeOf(_DOMException.ShimDOMException.prototype, Error.prototype);
                }
                if (IDB.indexedDB && IDB.indexedDB.modules) {
                    if (_CFG2.default.addNonIDBGlobals) {
                        // As `DOMStringList` exists per IDL (and Chrome) in the global
                        //   thread (but not in workers), we prefix the name to avoid
                        //   shadowing or conflicts
                        setNonIDBGlobals('Shim');
                    }
                    if (_CFG2.default.replaceNonIDBGlobals) {
                        setNonIDBGlobals();
                    }
                }
                IDB.shimIndexedDB.__setConnectionQueueOrigin();
            }
        };

        IDB.shimIndexedDB.__debug = function (val) {
            _CFG2.default.DEBUG = val;
        };
        IDB.shimIndexedDB.__setConfig = setConfig;
        IDB.shimIndexedDB.__getConfig = function (prop) {
            if (!(prop in _CFG2.default)) {
                throw new Error(prop + ' is not a valid configuration property');
            }
            return _CFG2.default[prop];
        };
        IDB.shimIndexedDB.__setUnicodeIdentifiers = function (_ref3) {
            var UnicodeIDStart = _ref3.UnicodeIDStart,
                UnicodeIDContinue = _ref3.UnicodeIDContinue;

            setConfig({ UnicodeIDStart: UnicodeIDStart, UnicodeIDContinue: UnicodeIDContinue });
        };
    } else {
        // We no-op the harmless set-up properties and methods with a warning; the `IDBFactory` methods,
        //    however (including our non-standard methods), are not stubbed as they ought
        //    to fail earlier rather than potentially having side effects.
        IDB.shimIndexedDB = {
            modules: ['DOMException', 'DOMStringList', 'Event', 'CustomEvent', 'EventTarget'].reduce(function (o, prop) {
                o['Shim' + prop] = IDB[prop]; // Just alias
                return o;
            }, {})
        };
        ['__useShim', '__debug', '__setConfig', '__getConfig', '__setUnicodeIdentifiers'].forEach(function (prop) {
            IDB.shimIndexedDB[prop] = function () {
                console.warn('This browser does not have WebSQL to shim.');
            };
        });
    }

    // Workaround to prevent an error in Firefox
    if (!('indexedDB' in IDB) && typeof window !== 'undefined') {
        // 2nd condition avoids problems in Node
        IDB.indexedDB = IDB.indexedDB || IDB.webkitIndexedDB || IDB.mozIndexedDB || IDB.oIndexedDB || IDB.msIndexedDB;
    }

    // Detect browsers with known IndexedDB issues (e.g. Android pre-4.4)
    var poorIndexedDbSupport = false;
    if (typeof navigator !== 'undefined' && ( // Ignore Node or other environments

    // Bad non-Chrome Android support
    /Android (?:2|3|4\.[0-3])/.test(navigator.userAgent) && !navigator.userAgent.includes('Chrome') ||
    // Bad non-Safari iOS9 support (see <https://github.com/axemclion/IndexedDBShim/issues/252>)
    (!navigator.userAgent.includes('Safari') || navigator.userAgent.includes('Chrome')) && // Exclude genuine Safari: http://stackoverflow.com/a/7768006/271577
    // Detect iOS: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
    // and detect version 9: http://stackoverflow.com/a/26363560/271577
    /(iPad|iPhone|iPod).* os 9_/i.test(navigator.userAgent) && !window.MSStream // But avoid IE11
    )) {
        poorIndexedDbSupport = true;
    }
    if (!_CFG2.default.DEFAULT_DB_SIZE) {
        _CFG2.default.DEFAULT_DB_SIZE = ( // Safari currently requires larger size: (We don't need a larger size for Node as node-websql doesn't use this info)
        // https://github.com/axemclion/IndexedDBShim/issues/41
        // https://github.com/axemclion/IndexedDBShim/issues/115
        typeof navigator !== 'undefined' && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') ? 25 : 4) * 1024 * 1024;
    }
    if (!_CFG2.default.avoidAutoShim && (!IDB.indexedDB || poorIndexedDbSupport) && _CFG2.default.win.openDatabase !== undefined) {
        IDB.shimIndexedDB.__useShim();
    } else {
        IDB.IDBDatabase = IDB.IDBDatabase || IDB.webkitIDBDatabase;
        IDB.IDBTransaction = IDB.IDBTransaction || IDB.webkitIDBTransaction || {};
        IDB.IDBCursor = IDB.IDBCursor || IDB.webkitIDBCursor;
        IDB.IDBKeyRange = IDB.IDBKeyRange || IDB.webkitIDBKeyRange;
    }
    return IDB;
}

exports.default = setGlobalVars;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./CFG":9,"./DOMException":10,"./IDBCursor":13,"./IDBDatabase":14,"./IDBFactory":15,"./IDBIndex":16,"./IDBKeyRange":17,"./IDBObjectStore":18,"./IDBRequest":19,"./IDBTransaction":20,"./IDBVersionChangeEvent":21}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.padStart = exports.convertToSequenceDOMString = exports.convertToDOMString = exports.enforceRange = exports.isValidKeyPath = exports.defineReadonlyProperties = exports.isIterable = exports.isBinary = exports.isFile = exports.isRegExp = exports.isBlob = exports.isDate = exports.isObj = exports.instanceOf = exports.sqlQuote = exports.sqlLIKEEscape = exports.escapeIndexNameForSQLKeyColumn = exports.escapeIndexNameForSQL = exports.escapeStoreNameForSQL = exports.unescapeDatabaseNameForSQLAndFiles = exports.escapeDatabaseNameForSQLAndFiles = exports.unescapeSQLiteResponse = exports.escapeSQLiteStatement = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _regex = require('unicode-9.0.0/Binary_Property/Expands_On_NFD/regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function escapeUnmatchedSurrogates(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return arg.replace(/([\uD800-\uDBFF])(?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])([\uDC00-\uDFFF])/g, function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
        // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
        //   but Chrome having problems
        if (unmatchedHighSurrogate) {
            return '^2' + padStart(unmatchedHighSurrogate.charCodeAt().toString(16), 4, '0');
        }
        return (precedingLow || '') + '^3' + padStart(unmatchedLowSurrogate.charCodeAt().toString(16), 4, '0');
    });
}

function escapeNameForSQLiteIdentifier(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return '_' + // Prevent empty string
    escapeUnmatchedSurrogates(arg.replace(/\^/g, '^^') // Escape our escape
    // http://www.sqlite.org/src/tktview?name=57c971fc74
    .replace(/\0/g, '^0')
    // We need to avoid identifiers being treated as duplicates based on SQLite's ASCII-only case-insensitive table and column names
    // (For SQL in general, however, see http://stackoverflow.com/a/17215009/271577
    // See also https://www.sqlite.org/faq.html#q18 re: Unicode (non-ASCII) case-insensitive not working
    .replace(/([A-Z])/g, '^$1'));
}

// The escaping of unmatched surrogates was needed by Chrome but not Node
function escapeSQLiteStatement(arg) {
    return escapeUnmatchedSurrogates(arg.replace(/\^/g, '^^').replace(/\0/g, '^0'));
}
function unescapeSQLiteResponse(arg) {
    return unescapeUnmatchedSurrogates(arg).replace(/\^0/g, '\0').replace(/\^\^/g, '^');
}

function sqlEscape(arg) {
    // https://www.sqlite.org/lang_keywords.html
    // http://stackoverflow.com/a/6701665/271577
    // There is no need to escape ', `, or [], as
    //   we should always be within double quotes
    // NUL should have already been stripped
    return arg.replace(/"/g, '""');
}

function sqlQuote(arg) {
    return '"' + sqlEscape(arg) + '"';
}

function escapeDatabaseNameForSQLAndFiles(db) {
    if (_CFG2.default.escapeDatabaseName) {
        // We at least ensure NUL is escaped by default, but we need to still
        //   handle empty string and possibly also length (potentially
        //   throwing if too long), escaping casing (including Unicode?),
        //   and escaping special characters depending on file system
        return _CFG2.default.escapeDatabaseName(escapeSQLiteStatement(db));
    }
    db = 'D' + escapeNameForSQLiteIdentifier(db);
    if (_CFG2.default.escapeNFDForDatabaseNames !== false) {
        // ES6 copying of regex with different flags
        db = db.replace(new RegExp(_regex2.default, 'g'), function (expandable) {
            return '^4' + padStart(expandable.codePointAt().toString(16), 6, '0');
        });
    }
    if (_CFG2.default.databaseCharacterEscapeList !== false) {
        db = db.replace(_CFG2.default.databaseCharacterEscapeList ? new RegExp(_CFG2.default.databaseCharacterEscapeList, 'g') : /[\u0000-\u001F\u007F"*/:<>?\\|]/g, function (n0) {
            return '^1' + padStart(n0.charCodeAt().toString(16), 2, '0');
        });
    }
    if (_CFG2.default.databaseNameLengthLimit !== false && db.length >= (_CFG2.default.databaseNameLengthLimit || 254) - (_CFG2.default.addSQLiteExtension !== false ? 7 /* '.sqlite'.length */ : 0)) {
        throw new Error('Unexpectedly long database name supplied; length limit required for Node compatibility; passed length: ' + db.length + '; length limit setting: ' + (_CFG2.default.databaseNameLengthLimit || 254) + '.');
    }
    return db + (_CFG2.default.addSQLiteExtension !== false ? '.sqlite' : ''); // Shouldn't have quoting (do we even need NUL/case escaping here?)
}

function unescapeUnmatchedSurrogates(arg) {
    return arg.replace(/(\^+)3(d[0-9a-f]{3})/g, function (_, esc, lowSurr) {
        return esc.length % 2 ? String.fromCharCode(parseInt(lowSurr, 16)) : _;
    }).replace(/(\^+)2(d[0-9a-f]{3})/g, function (_, esc, highSurr) {
        return esc.length % 2 ? String.fromCharCode(parseInt(highSurr, 16)) : _;
    });
}

// Not in use internally but supplied for convenience
function unescapeDatabaseNameForSQLAndFiles(db) {
    if (_CFG2.default.unescapeDatabaseName) {
        // We at least ensure NUL is unescaped by default, but we need to still
        //   handle empty string and possibly also length (potentially
        //   throwing if too long), unescaping casing (including Unicode?),
        //   and unescaping special characters depending on file system
        return _CFG2.default.unescapeDatabaseName(unescapeSQLiteResponse(db));
    }

    return unescapeUnmatchedSurrogates(db.slice(2) // D_
    // CFG.databaseCharacterEscapeList
    .replace(/(\^+)1([0-9a-f]{2})/g, function (_, esc, hex) {
        return esc.length % 2 ? String.fromCharCode(parseInt(hex, 16)) : _;
    })
    // CFG.escapeNFDForDatabaseNames
    .replace(/(\^+)4([0-9a-f]{6})/g, function (_, esc, hex) {
        return esc.length % 2 ? String.fromCodePoint(parseInt(hex, 16)) : _;
    }))
    // escapeNameForSQLiteIdentifier (including unescapeUnmatchedSurrogates() above)
    .replace(/(\^+)([A-Z])/g, function (_, esc, upperCase) {
        return esc.length % 2 ? upperCase : _;
    }).replace(/(\^+)0/g, function (_, esc) {
        return esc.length % 2 ? '\0' : _;
    }).replace(/\^\^/g, '^');
}

function escapeStoreNameForSQL(store) {
    return sqlQuote('S' + escapeNameForSQLiteIdentifier(store));
}

function escapeIndexNameForSQL(index) {
    return sqlQuote('I' + escapeNameForSQLiteIdentifier(index));
}

function escapeIndexNameForSQLKeyColumn(index) {
    return 'I' + escapeNameForSQLiteIdentifier(index);
}

function sqlLIKEEscape(str) {
    // https://www.sqlite.org/lang_expr.html#like
    return sqlEscape(str).replace(/\^/g, '^^');
}

// Babel doesn't seem to provide a means of using the `instanceof` operator with Symbol.hasInstance (yet?)
function instanceOf(obj, Clss) {
    return Clss[Symbol.hasInstance](obj);
}

function isObj(obj) {
    return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isDate(obj) {
    return isObj(obj) && typeof obj.getDate === 'function';
}

function isBlob(obj) {
    return isObj(obj) && typeof obj.size === 'number' && typeof obj.slice === 'function' && !('lastModified' in obj);
}

function isRegExp(obj) {
    return isObj(obj) && typeof obj.flags === 'string' && typeof obj.exec === 'function';
}

function isFile(obj) {
    return isObj(obj) && typeof obj.name === 'string' && typeof obj.slice === 'function' && 'lastModified' in obj;
}

function isBinary(obj) {
    return isObj(obj) && typeof obj.byteLength === 'number' && (typeof obj.slice === 'function' || // `TypedArray` (view on buffer) or `ArrayBuffer`
    typeof obj.getFloat64 === 'function' // `DataView` (view on buffer)
    );
}

function isIterable(obj) {
    return isObj(obj) && typeof obj[Symbol.iterator] === 'function';
}

function defineReadonlyProperties(obj, props) {
    props = typeof props === 'string' ? [props] : props;
    props.forEach(function (prop) {
        Object.defineProperty(obj, '__' + prop, {
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(obj, prop, {
            enumerable: true,
            configurable: true,
            get: function get() {
                return this['__' + prop];
            }
        });
    });
}

function isIdentifier(item) {
    // For load-time and run-time performance, we don't provide the complete regular
    //   expression for identifiers, but these can be passed in, using the expressions
    //   found at https://gist.github.com/brettz9/b4cd6821d990daa023b2e604de371407
    // ID_Start (includes Other_ID_Start)
    var UnicodeIDStart = _CFG2.default.UnicodeIDStart || '[$A-Z_a-z]';
    // ID_Continue (includes Other_ID_Continue)
    var UnicodeIDContinue = _CFG2.default.UnicodeIDContinue || '[$0-9A-Z_a-z]';
    var IdentifierStart = '(?:' + UnicodeIDStart + '|[$_])';
    var IdentifierPart = '(?:' + UnicodeIDContinue + '|[$_\u200C\u200D])';
    return new RegExp('^' + IdentifierStart + IdentifierPart + '*$').test(item);
}

function isValidKeyPathString(keyPathString) {
    return typeof keyPathString === 'string' && (keyPathString === '' || isIdentifier(keyPathString) || keyPathString.split('.').every(isIdentifier));
}

function isValidKeyPath(keyPath) {
    return isValidKeyPathString(keyPath) || Array.isArray(keyPath) && keyPath.length &&
    // Convert array from sparse to dense http://www.2ality.com/2012/06/dense-arrays.html
    Array.apply(null, keyPath).every(function (kpp) {
        // See also https://heycam.github.io/webidl/#idl-DOMString
        return isValidKeyPathString(kpp); // Should already be converted to string by here
    });
}

function enforceRange(number, type) {
    number = Math.floor(Number(number));
    var max = void 0,
        min = void 0;
    switch (type) {
        case 'unsigned long long':
            {
                max = 0x1FFFFFFFFFFFFF; // 2^53 - 1
                min = 0;
                break;
            }
        case 'unsigned long':
            {
                max = 0xFFFFFFFF; // 2^32 - 1
                min = 0;
                break;
            }
        default:
            throw new Error('Unrecognized type supplied to enforceRange');
    }
    if (isNaN(number) || !isFinite(number) || number > max || number < min) {
        throw new TypeError('Invalid range: ' + number);
    }
    return number;
}

function convertToDOMString(v, treatNullAs) {
    return v === null && treatNullAs ? '' : ToString(v);
}

function ToString(o) {
    // Todo: See `es-abstract/es7`
    return '' + o; // `String()` will not throw with Symbols
}

function convertToSequenceDOMString(val) {
    // Per <https://heycam.github.io/webidl/#idl-sequence>, converting to a sequence works with iterables
    if (isIterable(val)) {
        // We don't want conversion to array to convert primitives
        // Per <https://heycam.github.io/webidl/#es-DOMString>, converting to a `DOMString` to be via `ToString`: https://tc39.github.io/ecma262/#sec-tostring
        return [].concat(_toConsumableArray(val)).map(ToString);
    }
    return ToString(val);
}

// Todo: Replace with `String.prototype.padStart` when targeting supporting Node version
function padStart(str, ct, fill) {
    return new Array(ct - String(str).length + 1).join(fill) + str;
}

exports.escapeSQLiteStatement = escapeSQLiteStatement;
exports.unescapeSQLiteResponse = unescapeSQLiteResponse;
exports.escapeDatabaseNameForSQLAndFiles = escapeDatabaseNameForSQLAndFiles;
exports.unescapeDatabaseNameForSQLAndFiles = unescapeDatabaseNameForSQLAndFiles;
exports.escapeStoreNameForSQL = escapeStoreNameForSQL;
exports.escapeIndexNameForSQL = escapeIndexNameForSQL;
exports.escapeIndexNameForSQLKeyColumn = escapeIndexNameForSQLKeyColumn;
exports.sqlLIKEEscape = sqlLIKEEscape;
exports.sqlQuote = sqlQuote;
exports.instanceOf = instanceOf;
exports.isObj = isObj;
exports.isDate = isDate;
exports.isBlob = isBlob;
exports.isRegExp = isRegExp;
exports.isFile = isFile;
exports.isBinary = isBinary;
exports.isIterable = isIterable;
exports.defineReadonlyProperties = defineReadonlyProperties;
exports.isValidKeyPath = isValidKeyPath;
exports.enforceRange = enforceRange;
exports.convertToDOMString = convertToDOMString;
exports.convertToSequenceDOMString = convertToSequenceDOMString;
exports.padStart = padStart;

},{"./CFG":9,"unicode-9.0.0/Binary_Property/Expands_On_NFD/regex":8}]},{},[25])
//# sourceMappingURL=indexeddbshim-UnicodeIdentifiers.js.map