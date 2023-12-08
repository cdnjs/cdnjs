/*! indexeddbshim - v13.0.0 - 12/7/2023 */

'use strict';

var fs$1 = require('node:fs');
var path = require('path');
var require$$0 = require('url');
var require$$0$1 = require('fs');
var require$$3 = require('mock-aws-s3');
var require$$4 = require('os');
var require$$5$1 = require('aws-sdk');
var require$$6 = require('nock');
var require$$2 = require('stream');
var require$$0$2 = require('util');
var require$$2$1 = require('events');
var require$$1 = require('readable-stream');
var require$$5$2 = require('assert');
var require$$0$3 = require('child_process');

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

/* eslint-disable n/no-sync -- Want sync naming */
/* eslint-disable no-restricted-syntax -- Instanceof checks */
/* eslint-disable unicorn/no-this-assignment -- TS */

/**
 * @typedef {number} Integer
 */

/**
 * @callback InvokeCurrentListeners
 * @param {AllListeners} listeners
 * @param {EventWithProps} eventCopy
 * @param {string} type
 * @param {boolean} [checkOnListeners]
 * @returns {boolean}
 */

/**
 * @typedef {{
 *   defaultSync?: boolean,
 *   extraProperties?: string[],
 *   legacyOutputDidListenersThrowFlag?: boolean
 * }} CustomOptions
 */
/**
 * @typedef {{
 *   __legacyOutputDidListenersThrowError: unknown,
 *   target: EventTarget & {
 *     invokeCurrentListeners: InvokeCurrentListeners,
 *     _earlyListeners: AllListeners,
 *     _listeners: AllListeners,
 *     _lateListeners: AllListeners,
 *     _defaultListeners: AllListeners
 *   },
 *   composed: boolean,
 *   currentTarget: EventTarget,
 *   eventPhase: 0|1|2|3
 *   defaultPrevented: boolean,
 *   type: string,
 *   bubbles: boolean,
 *   cancelable: boolean,
 *   isTrusted: boolean,
 *   timeStamp: Integer,
 *   initEvent: (type: string, bubbles: boolean, cancelable: boolean) => void,
 *   preventDefault: () => void,
 *   composedPath: () => void,
 *   detail: any,
 *   initCustomEvent: (
 *     type: string, canBubble: boolean, cancelable: boolean,
 *     detail: any
 *   ) => void
 * }} EventWithProps
 */

// Todo: Switch to ES6 classes

var phases = {
  NONE: 0,
  CAPTURING_PHASE: 1,
  AT_TARGET: 2,
  BUBBLING_PHASE: 3
};
var ShimDOMException$1 = typeof DOMException === 'undefined'
// Todo: Better polyfill (if even needed here)
/* eslint-disable no-shadow -- Polyfill */
// eslint-disable-next-line operator-linebreak -- TS/JSDoc needs
?
/**
 * @param {string} msg
 * @param {string} name
 * @returns {Error}
 */
function DOMException(msg, name) {
  // No need for `toString` as same as for `Error`
  /* eslint-enable no-shadow -- Polyfill */
  var err = new Error(msg);
  err.name = name;
  return err;
} : DOMException;
var ev = new WeakMap();
var evCfg = new WeakMap();

// Todo: Set _ev argument outside of this function

/* eslint-disable func-name-matching -- Shim vs. Polyfill */
/* eslint-disable no-shadow -- Polyfilling */
/**
* We use an adapter class rather than a proxy not only for compatibility
* but also since we have to clone native event properties anyways in order
* to properly set `target`, etc.
* The regular DOM method `dispatchEvent` won't work with this polyfill as
* it expects a native event.
* @class
* @param {string} type
*/
var ShimEvent = /** @type {unknown} */function Event(type) {
  var _this = this;
  /* eslint-enable func-name-matching -- Shim vs. Polyfill */
  /* eslint-enable no-shadow -- Polyfilling */
  // For WebIDL checks of function's `length`, we check `arguments` for the optional arguments
  // @ts-expect-error
  this[Symbol.toStringTag] = 'Event';
  this.toString = function () {
    return '[object Event]';
  };
  // eslint-disable-next-line prefer-rest-params -- Don't want to change signature
  var _arguments = Array.prototype.slice.call(arguments),
    evInit = _arguments[1],
    _ev = _arguments[2];
  if (!arguments.length) {
    throw new TypeError("Failed to construct 'Event': 1 argument required, but only 0 present.");
  }
  evInit = evInit || {};
  _ev = _ev || {};

  /** @type {EventWithProps} */
  var _evCfg = {};
  if ('composed' in evInit) {
    _evCfg.composed = evInit.composed;
  }

  // _evCfg.isTrusted = true; // We are not always using this for user-created events
  // _evCfg.timeStamp = new Date().valueOf(); // This is no longer a timestamp, but monotonic (elapsed?)

  ev.set(this, _ev);
  evCfg.set(this, _evCfg);
  var that = /** @type {unknown} */this;
  /** @type {ShimEvent} */
  that.initEvent(type, evInit.bubbles, evInit.cancelable);
  ['target', 'currentTarget', 'eventPhase', 'defaultPrevented'].forEach(function (pr) {
    var prop = /** @type {"target"|"currentTarget"|"eventPhase"|"defaultPrevented"} */
    pr;
    Object.defineProperty(_this, prop, {
      get: function get() {
        return /* prop in _evCfg && */_evCfg[prop] !== undefined ? _evCfg[prop] : prop in _ev ? _ev[prop] :
        // Defaults
        prop === 'eventPhase' ? 0 : prop === 'defaultPrevented' ? false : null;
      }
    });
  });
  var props = [
  // Event
  'type', 'bubbles', 'cancelable',
  // Defaults to false
  'isTrusted', 'timeStamp', 'initEvent',
  // Other event properties (not used by our code)
  'composedPath', 'composed'];
  if (this.toString() === '[object CustomEvent]') {
    props.push('detail', 'initCustomEvent');
  }
  Object.defineProperties(this, props.reduce(function (obj, pr) {
    var prop =
    /**
     * @type {"type"|"bubbles"|"cancelable"|"isTrusted"|
     *   "timeStamp"|"initEvent"|"composedPath"|"composed"|
     *   "detail"|"initCustomEvent"
     * }
     */
    pr;
    obj[prop] = {
      get: function get() {
        return prop in _evCfg ? _evCfg[prop] : prop in _ev ? _ev[prop] : ['bubbles', 'cancelable', 'composed'].includes(prop) ? false : undefined;
      }
    };
    return obj;
  }, /** @type {{[key: string]: any}} */{}));
};

// @ts-expect-error Casting doesn't work
ShimEvent.prototype.preventDefault = function () {
  // @ts-expect-error Needed for exporting
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

// @ts-expect-error Casting doesn't work
ShimEvent.prototype.stopImmediatePropagation = function () {
  var _evCfg = evCfg.get(this);
  _evCfg._stopImmediatePropagation = true;
};

// @ts-expect-error Casting doesn't work
ShimEvent.prototype.stopPropagation = function () {
  var _evCfg = evCfg.get(this);
  _evCfg._stopPropagation = true;
};

// @ts-expect-error Casting doesn't work
ShimEvent.prototype.initEvent = function (type, bubbles, cancelable) {
  // Chrome currently has function length 1 only but WebIDL says 3
  // const bubbles = arguments[1];
  // const cancelable = arguments[2];
  var _evCfg = evCfg.get(this);
  if (_evCfg._dispatched) {
    return;
  }
  Object.defineProperty(this, 'type', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return type;
    }
  });
  Object.defineProperty(this, 'bubbles', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return bubbles;
    }
  });
  Object.defineProperty(this, 'cancelable', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return cancelable;
    }
  });
  _evCfg.type = type;
  if (bubbles !== undefined) {
    _evCfg.bubbles = bubbles;
  }
  if (cancelable !== undefined) {
    _evCfg.cancelable = cancelable;
  }
};
['type', 'target', 'currentTarget'].forEach(function (prop) {
  // @ts-expect-error Casting doesn't work
  Object.defineProperty(ShimEvent.prototype, prop, {
    enumerable: true,
    configurable: true,
    get: function get() {
      throw new TypeError('Illegal invocation');
    }
  });
});
['eventPhase', 'defaultPrevented', 'bubbles', 'cancelable', 'timeStamp'].forEach(function (prop) {
  // @ts-expect-error Casting doesn't work
  Object.defineProperty(ShimEvent.prototype, prop, {
    enumerable: true,
    configurable: true,
    get: function get() {
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
  // @ts-expect-error Casting doesn't work
  Object.defineProperty(ShimEvent.prototype, prop, {
    writable: false,
    value: i
  });
});
// @ts-expect-error Casting doesn't work
ShimEvent[Symbol.toStringTag] = 'Function';

// @ts-expect-error Casting doesn't work
ShimEvent.prototype[Symbol.toStringTag] = 'EventPrototype';
Object.defineProperty(ShimEvent, 'prototype', {
  writable: false
});

/* eslint-disable func-name-matching -- Polyfill */
/* eslint-disable no-shadow -- Polyfill */
/**
 * @class
 * @param {string} type
 */
var ShimCustomEvent = /** @type {unknown} */function CustomEvent(type) {
  /* eslint-enable func-name-matching -- Polyfill */
  /* eslint-enable no-shadow -- Polyfill */

  // eslint-disable-next-line prefer-rest-params -- Keep signature
  var _arguments2 = Array.prototype.slice.call(arguments),
    evInit = _arguments2[1],
    _ev = _arguments2[2];
  // @ts-expect-error Casting doesn't work
  ShimEvent.call(this, type, evInit, _ev);
  // @ts-expect-error
  this[Symbol.toStringTag] = 'CustomEvent';
  this.toString = function () {
    return '[object CustomEvent]';
  };
  // var _evCfg = evCfg.get(this);
  evInit = evInit || {};
  // @ts-ignore
  this.initCustomEvent(type, evInit.bubbles, evInit.cancelable, 'detail' in evInit ? evInit.detail : null);
};
// @ts-expect-error Casting doesn't work
Object.defineProperty(ShimCustomEvent.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: ShimCustomEvent
});
// @ts-expect-error Casting doesn't work
ShimCustomEvent.prototype.initCustomEvent = function (type, bubbles, cancelable, detail) {
  // @ts-expect-error Needed for exporting
  if (!(this instanceof ShimCustomEvent)) {
    throw new TypeError('Illegal invocation');
  }
  var _evCfg = evCfg.get(this);
  // @ts-expect-error Casting doesn't work
  ShimCustomEvent.call(this, type, {
    bubbles: bubbles,
    cancelable: cancelable,
    detail: detail
    // eslint-disable-next-line prefer-rest-params -- Keep signature
  }, arguments[4]);
  if (_evCfg._dispatched) {
    return;
  }
  if (detail !== undefined) {
    _evCfg.detail = detail;
  }
  Object.defineProperty(this, 'detail', {
    get: function get() {
      return _evCfg.detail;
    }
  });
};
// @ts-expect-error Casting doesn't work
ShimCustomEvent[Symbol.toStringTag] = 'Function';
// @ts-expect-error Casting doesn't work
ShimCustomEvent.prototype[Symbol.toStringTag] = 'CustomEventPrototype';

// @ts-expect-error Casting doesn't work
Object.defineProperty(ShimCustomEvent.prototype, 'detail', {
  enumerable: true,
  configurable: true,
  get: function get() {
    throw new TypeError('Illegal invocation');
  }
});
Object.defineProperty(ShimCustomEvent, 'prototype', {
  writable: false
});

/**
 *
 * @param {EventWithProps} e
 * @returns {EventWithProps}
 */
function copyEvent(e) {
  var bubbles = e.bubbles,
    cancelable = e.cancelable,
    detail = e.detail,
    type = e.type;
  if ('detail' in e) {
    // @ts-expect-error Casting doesn't work
    return new ShimCustomEvent(type, {
      bubbles: bubbles,
      cancelable: cancelable,
      detail: detail
    }, e);
  }
  // @ts-expect-error Casting doesn't work
  return new ShimEvent(type, {
    bubbles: bubbles,
    cancelable: cancelable
  }, e);
}

/**
* @typedef {object} ListenerOptions
* @property {boolean} [once] Remove listener after invoking once
* @property {boolean} [passive] Don't allow `preventDefault`
* @property {boolean} [capture] Use `_children` and set `eventPhase`
*/

/**
* @typedef {object} ListenerAndOptions
* @property {Listener} listener
* @property {ListenerOptions} options
*/

/**
* @typedef {object} ListenerInfo
* @property {ListenerAndOptions[]} listenersByTypeOptions
* @property {ListenerOptions} options
* @property {ListenerAndOptions[]} listenersByType
*/

/**
* @callback Listener
* @param {EventWithProps} e
* @returns {boolean}
*/

/**
 * Keys are event types.
 * @typedef {{[key: string]: Listener[]}} Listeners
 */

/**
 * @typedef {{
 *   [type: string]: ListenerAndOptions[]
 * }} AllListeners
 */

/**
 *
 * @param {AllListeners} listeners
 * @param {string} type
 * @param {boolean|ListenerOptions} options
 * @returns {ListenerInfo}
 */
function getListenersOptions(listeners, type, options) {
  var listenersByType = listeners[type];
  if (listenersByType === undefined) listeners[type] = listenersByType = [];
  var opts = typeof options === 'boolean' ? {
    capture: options
  } : options || {};
  var stringifiedOptions = JSON.stringify(opts);
  var listenersByTypeOptions = listenersByType.filter(function (obj) {
    return stringifiedOptions === JSON.stringify(obj.options);
  });
  return {
    listenersByTypeOptions: listenersByTypeOptions,
    options: opts,
    listenersByType: listenersByType
  };
}
var methods = {
  /**
   * @param {AllListeners} listeners
   * @param {Listener} listener
   * @param {string} type
   * @param {boolean|ListenerOptions} options
   * @returns {void}
   */
  addListener: function addListener(listeners, listener, type, options) {
    var listenersOptions = getListenersOptions(listeners, type, options);
    var listenersByTypeOptions = listenersOptions.listenersByTypeOptions;
    options = listenersOptions.options;
    var listenersByType = listenersOptions.listenersByType;
    if (listenersByTypeOptions.some(function (l) {
      return l.listener === listener;
    })) return;
    listenersByType.push({
      listener: listener,
      options: options
    });
  },
  /**
   * @param {AllListeners} listeners
   * @param {Listener} listener
   * @param {string} type
   * @param {boolean|ListenerOptions} options
   * @returns {void}
   */
  removeListener: function removeListener(listeners, listener, type, options) {
    var listenersOptions = getListenersOptions(listeners, type, options);
    var listenersByType = listenersOptions.listenersByType;
    var stringifiedOptions = JSON.stringify(listenersOptions.options);
    listenersByType.some(function (l, i) {
      if (l.listener === listener && stringifiedOptions === JSON.stringify(l.options)) {
        listenersByType.splice(i, 1);
        if (!listenersByType.length) delete listeners[type];
        return true;
      }
      return false;
    });
  },
  /**
   *
   * @param {AllListeners} listeners
   * @param {Listener} listener
   * @param {string} type
   * @param {boolean|ListenerOptions} options
   * @returns {boolean}
   */
  hasListener: function hasListener(listeners, listener, type, options) {
    var listenersOptions = getListenersOptions(listeners, type, options);
    var listenersByTypeOptions = listenersOptions.listenersByTypeOptions;
    return listenersByTypeOptions.some(function (l) {
      return l.listener === listener;
    });
  }
};

/* eslint-disable no-shadow -- Polyfill */
/**
 * @class
 */
function EventTarget() {
  /* eslint-enable no-shadow -- Polyfill */
  throw new TypeError('Illegal constructor');
}

/**
 * @typedef {"addEarlyEventListener"|"removeEarlyEventListener"|"hasEarlyEventListener"|
 *   "addEventListener"|"removeEventListener"|"hasEventListener"|
 *   "addLateEventListener"|"removeLateEventListener"|"hasLateEventListener"|
 *   "addDefaultEventListener"|"removeDefaultEventListener"|"hasDefaultEventListener"
 * } ListenerName
 */
Object.assign(EventTarget.prototype, ['Early', '', 'Late', 'Default'].reduce(function ( /** @type {{[key: string]: Function}} */
obj, listenerType) {
  ['add', 'remove', 'has'].forEach(function (method) {
    var mainMethod = /** @type {ListenerName} */method + listenerType + 'EventListener';
    /**
     * @param {string} type
     * @param {Listener|{handleEvent: Listener}} listener
     * @this {EventTarget & {
     *   _earlyListeners: AllListeners,
     *   _listeners: AllListeners,
     *   _lateListeners: AllListeners,
     *   _defaultListeners: AllListeners,
     * }}
     * @returns {boolean|void}
     */
    obj[mainMethod] = function (type, listener) {
      // eslint-disable-next-line prefer-rest-params -- Keep signature
      var options = arguments[2]; // We keep the listener `length` as per WebIDL
      if (arguments.length < 2) throw new TypeError('2 or more arguments required');
      if (typeof type !== 'string') {
        // @ts-expect-error It's ok to construct
        throw new ShimDOMException$1('UNSPECIFIED_EVENT_TYPE_ERR', 'UNSPECIFIED_EVENT_TYPE_ERR');
      }
      try {
        // As per code such as the following, handleEvent may throw,
        //  but is uncaught
        // https://github.com/web-platform-tests/wpt/blob/master/IndexedDB/fire-error-event-exception.html#L54-L56
        if ('handleEvent' in listener && listener.handleEvent.bind) {
          listener = listener.handleEvent.bind(listener);
        }
      } catch (err) {
        // eslint-disable-next-line no-console -- Feedback to user
        console.log('Uncaught `handleEvent` error', err);
      }
      var arrStr = /** @type {"_earlyListeners"|"_listeners"|"_lateListeners"|"_defaultListeners"} */
      '_' + listenerType.toLowerCase() + (listenerType === '' ? 'l' : 'L') + 'isteners';
      if (!this[arrStr]) {
        Object.defineProperty(this, arrStr, {
          value: {}
        });
      }
      var meth = /** @type {"addListener"|"removeListener"|"hasListener"} */
      method + 'Listener';
      return methods[meth](this[arrStr], /** @type {Listener} */listener, type, options);
    };
  });
  return obj;
}, {}));
Object.assign(EventTarget.prototype, {
  _legacyOutputDidListenersThrowCheck: undefined,
  /**
   * @param {CustomOptions} customOptions
   * @this {EventTarget.prototype}
   * @returns {void}
   */
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
  /**
   * @param {ShimEvent} e
   * @this {EventTarget & {
   *   _dispatchEvent: (e: ShimEvent|ShimCustomEvent, setTarget: boolean) => boolean,
  * }}
   * @returns {boolean}
   */
  dispatchEvent: function dispatchEvent(e) {
    return this._dispatchEvent(e, true);
  },
  /**
   * @param {EventWithProps} e
   * @param {boolean} setTarget
   * @this {EventTarget.prototype & {
   *   _earlyListeners: AllListeners,
   *   _listeners: AllListeners,
   *   _lateListeners: AllListeners,
   *   _defaultListeners: AllListeners,
   * }}
   * @returns {boolean}
   */
  _dispatchEvent: function _dispatchEvent(e, setTarget) {
    var _this2 = this;
    ['early', '', 'late', 'default'].forEach(function (listenerType) {
      var arrStr = /** @type {"_earlyListeners"|"_listeners"|"_lateListeners"|"_defaultListeners"} */
      '_' + listenerType + (listenerType === '' ? 'l' : 'L') + 'isteners';
      if (!_this2[arrStr]) {
        Object.defineProperty(_this2, arrStr, {
          value: {}
        });
      }
    });
    var _evCfg = evCfg.get(e);
    if (_evCfg && setTarget && _evCfg._dispatched) {
      // @ts-expect-error It's ok to construct
      throw new ShimDOMException$1('The object is in an invalid state.', 'InvalidStateError');
    }

    /** @type {EventWithProps} */
    var eventCopy;
    if (_evCfg) {
      eventCopy = e;
    } else {
      eventCopy = copyEvent(e);
      _evCfg = evCfg.get(eventCopy);
      _evCfg._dispatched = true;

      /** @type {string[]} */
      this._extraProperties.forEach(function (prop) {
        if (prop in e) {
          /** @type {{[key: string]: any}} */eventCopy[prop] = /** @type {{[key: string]: any}} */e[prop]; // Todo: Put internal to `ShimEvent`?
        }
      });
    }
    var _eventCopy = eventCopy,
      type = _eventCopy.type;

    /**
     *
     * @returns {void}
     */
    function finishEventDispatch() {
      _evCfg.eventPhase = phases.NONE;
      _evCfg.currentTarget = null;
      delete _evCfg._children;
    }
    /**
     *
     * @returns {void}
     */
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
      if (!_this2._defaultSync) {
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
    switch ('eventPhase' in eventCopy && eventCopy.eventPhase) {
      case phases.CAPTURING_PHASE:
        {
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
        }
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
        {
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
      case phases.NONE:
      default:
        {
          _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke early listeners
          this.invokeCurrentListeners(this._earlyListeners, eventCopy, type);
          if (!('__getParent' in this)) {
            _evCfg.eventPhase = phases.AT_TARGET;
            return this._dispatchEvent(eventCopy, false);
          }

          /* eslint-disable consistent-this -- Readability */
          var par = this;
          var root_ = this;
          /* eslint-enable consistent-this -- Readability */
          while (par.__getParent && (par = par.__getParent()) !== null) {
            if (!_evCfg._children) {
              _evCfg._children = [];
            }
            _evCfg._children.push(root_);
            root_ = par;
          }
          root_._defaultSync = this._defaultSync;
          _evCfg.eventPhase = phases.CAPTURING_PHASE;
          return root_._dispatchEvent(eventCopy, false);
        }
    }
  },
  /**
   * @type {InvokeCurrentListeners}
   * @this {EventTarget.prototype & {[key: string]: Listener}}
   */
  invokeCurrentListeners: function invokeCurrentListeners(listeners, eventCopy, type, checkOnListeners) {
    var _this3 = this;
    var _evCfg = evCfg.get(eventCopy);
    _evCfg.currentTarget = this;
    var listOpts = getListenersOptions(listeners, type, {});
    // eslint-disable-next-line unicorn/prefer-spread -- Performance?
    var listenersByType = listOpts.listenersByType.concat();
    var dummyIPos = listenersByType.length ? 1 : 0;
    listenersByType.some(function (listenerObj, i) {
      var onListener = checkOnListeners ? _this3['on' + type] : null;
      if (_evCfg._stopImmediatePropagation) return true;
      if (i === dummyIPos && typeof onListener === 'function') {
        // We don't splice this in as could be overwritten; executes here per
        //    https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes:event-handlers-14
        _this3.tryCatch(eventCopy, function () {
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
        _this3.tryCatch(eventCopy, function () {
          listener.call(eventCopy.currentTarget, eventCopy);
        });
        if (once) {
          _this3.removeEventListener(type, listener, options);
        }
      }
      return false;
    });
    this.tryCatch(eventCopy, function () {
      var onListener = checkOnListeners ? _this3['on' + type] : null;
      if (typeof onListener === 'function' && listenersByType.length < 2) {
        var ret = onListener.call(eventCopy.currentTarget, eventCopy); // Won't have executed if too short
        if (ret === false) {
          eventCopy.preventDefault();
        }
      }
    });
    return !eventCopy.defaultPrevented;
  },
  /* eslint-disable promise/prefer-await-to-callbacks -- Try-catch */
  /**
   * @param {EventWithProps} evt
   * @param {() => void} cb
   * @returns {void}
   */
  tryCatch: function tryCatch(evt, cb) {
    /* eslint-enable promise/prefer-await-to-callbacks -- Try-catch */
    try {
      // Per MDN: Exceptions thrown by event handlers are reported
      //    as uncaught exceptions; the event handlers run on a nested
      //    callstack: they block the caller until they complete, but
      //    exceptions do not propagate to the caller.
      // eslint-disable-next-line promise/prefer-await-to-callbacks, n/callback-return --  Try-catch
      cb();
    } catch (err) {
      this.triggerErrorEvent(err, evt);
    }
  },
  /**
   * @param {unknown} err
   * @param {EventWithProps} evt
   * @returns {void}
   */
  triggerErrorEvent: function triggerErrorEvent(err, evt) {
    var error = err;
    if (typeof err === 'string') {
      error = new Error('Uncaught exception: ' + err);
    }
    var triggerGlobalErrorEvent;
    var useNodeImpl = false;
    if (typeof window === 'undefined' || typeof ErrorEvent === 'undefined' || window && (typeof window === "undefined" ? "undefined" : _typeof$1(window)) === 'object' && !window.dispatchEvent) {
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
          message: /** @type {Error} */error.message || '',
          // We can't get the actually useful user's values!
          filename: /** @type {Error & {fileName: string}} */error.fileName || '',
          lineno: /** @type {Error & {lineNumber: Integer}} */error.lineNumber || 0,
          colno: /** @type {Error & {columnNumber: Integer}} */error.columnNumber || 0
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
      evt.__legacyOutputDidListenersThrowError = error;
    }
  }
});
EventTarget.prototype[Symbol.toStringTag] = 'EventTargetPrototype';
Object.defineProperty(EventTarget, 'prototype', {
  writable: false
});
var ShimEventTarget = EventTarget;
var EventTargetFactory = {
  /**
   * @param {CustomOptions} customOptions
   * @returns {EventTarget}
   */
  createInstance: function createInstance(customOptions) {
    /* eslint-disable func-name-matching -- Shim vs. Polyfill */
    /* eslint-disable no-shadow -- Polyfill */
    /**
     * @class
     * @this {typeof ShimEventTarget.prototype}
     */
    var ET = /** @type {unknown} */function EventTarget() {
      /* eslint-enable no-shadow -- Polyfill */
      /* eslint-enable func-name-matching -- Shim vs. Polyfill */
      this.__setOptions(customOptions);
    };
    // @ts-expect-error Casting doesn't work
    ET.prototype = ShimEventTarget.prototype;
    // @ts-expect-error Casting doesn't work
    return new ET();
  }
};
EventTarget.ShimEvent = ShimEvent;
EventTarget.ShimCustomEvent = ShimCustomEvent;
EventTarget.ShimDOMException = ShimDOMException$1;
EventTarget.ShimEventTarget = EventTarget;
EventTarget.EventTargetFactory = EventTargetFactory;

/**
 * @returns {void}
 */
function setPrototypeOfCustomEvent() {
  // TODO: IDL needs but reported as slow!
  Object.setPrototypeOf(ShimCustomEvent, /** @type {object} */ShimEvent);
  // @ts-expect-error How to overcome?
  Object.setPrototypeOf(ShimCustomEvent.prototype, ShimEvent.prototype);
}

/* eslint-disable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/147 */
/**
 * @typedef {T[keyof T]} ValueOf<T>
 * @template T
 */
/* eslint-enable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/147 */

/**
 * @typedef {{unlink: (path: string, cb: import('fs').NoParamCallback) => void}} FSApi
 */

/**
 * @typedef {{
 *   DEBUG: boolean,
 *   cacheDatabaseInstances: boolean,
 *   autoName: boolean,
 *   fullIDLSupport: boolean,
 *   checkOrigin: boolean,
 *   cursorPreloadPackSize: number,
 *   UnicodeIDStart: string,
 *   UnicodeIDContinue: string,
 *   registerSCA: (
 *     preset: import('typeson').Preset
 *   ) => import('typeson').Preset,
 *   avoidAutoShim: boolean,
 *   win: {
 *     openDatabase: (name: string, version: string, displayName: string, estimatedSize: number) => import('websql-configurable').default
 *   },
 *   DEFAULT_DB_SIZE: number,
 *   useSQLiteIndexes: boolean,
 *   fs: FSApi,
 *   addNonIDBGlobals: boolean,
 *   replaceNonIDBGlobals: boolean,
 *   escapeDatabaseName: (name: string) => string,
 *   unescapeDatabaseName: (name: string) => string,
 *   databaseCharacterEscapeList: string|false,
 *   databaseNameLengthLimit: number|false,
 *   escapeNFDForDatabaseNames: boolean,
 *   addSQLiteExtension: boolean,
 *   memoryDatabase: string,
 *   deleteDatabaseFiles: boolean,
 *   databaseBasePath: string,
 *   sysDatabaseBasePath: string,
 *   sqlBusyTimeout: number,
 *   sqlTrace: () => void,
 *   sqlProfile: () => void,
 *   createIndexes: boolean
 * }} ConfigValues
 */

/**
 * @typedef {ValueOf<ConfigValues>} ConfigValue
 */

/** @type {{[key: string]: ConfigValue}} */
const map = {};
const CFG = /** @type {ConfigValues} */{};

/**
 * @typedef {keyof ConfigValues} KeyofConfigValues
 */

/**
 * @typedef {KeyofConfigValues[]} Config
 */

/** @type {Config} */
[
// Boolean for verbose reporting
'DEBUG',
// Effectively defaults to false (ignored unless `true`)

// Boolean (effectively defaults to true) on whether to cache WebSQL
//  `openDatabase` instances
'cacheDatabaseInstances',
// Boolean on whether to auto-name databases (based on an
//   auto-increment) when the empty string is supplied; useful with
//   `memoryDatabase`; defaults to `false` which means the empty string
//   will be used as the (valid) database name
'autoName',
// Determines whether the slow-performing `Object.setPrototypeOf`
//    calls required for full WebIDL compliance will be used. Probably
//    only needed for testing or environments where full introspection
//    on class relationships is required; see
//    http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
'fullIDLSupport',
// Effectively defaults to false (ignored unless `true`)

// Boolean on whether to perform origin checks in `IDBFactory` methods
// Effectively defaults to `true` (must be set to `false` to cancel checks)
'checkOrigin',
// Used by `IDBCursor` continue methods for number of records to cache;
//  Defaults to 100
'cursorPreloadPackSize',
// See optional API (`shimIndexedDB.__setUnicodeIdentifiers`);
//    or just use the Unicode builds which invoke this method
//    automatically using the large, fully spec-compliant, regular
//    expression strings of `src/UnicodeIdentifiers.js`)
// In the non-Unicode builds, defaults to /[$A-Z_a-z]/
'UnicodeIDStart',
// In the non-Unicode builds, defaults to /[$0-9A-Z_a-z]/
'UnicodeIDContinue',
// Used by SCA.js for optional restructuring of typeson-registry
//   Structured Cloning Algorithm; should only be needed for ensuring data
//   created in 3.* versions of IndexedDBShim continue to work; see the
//   library `typeson-registry-sca-reverter` to get a function to do this
'registerSCA',
// BROWSER-SPECIFIC CONFIG
'avoidAutoShim',
// Where WebSQL is detected but where `indexedDB` is
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
// Defaults to (4 * 1024 * 1024) or (25 * 1024 * 1024) in Safari
'DEFAULT_DB_SIZE',
// Whether to create indexes on SQLite tables (and also whether to try
//   dropping)
// Effectively defaults to `false` (ignored unless `true`)
'useSQLiteIndexes',
// NODE-IMPINGING SETTINGS (created for sake of limitations in Node
//    or desktop file system implementation but applied by default in
//    browser for parity)

// File system module with `unlink` to remove deleted database files
'fs',
// Used when setting global shims to determine whether to try to add
//   other globals shimmed by the library (`ShimDOMException`,
//   `ShimDOMStringList`, `ShimEvent`, `ShimCustomEvent`, `ShimEventTarget`)
// Effectively defaults to `false` (ignored unless `true`)
'addNonIDBGlobals',
// Used when setting global shims to determine whether to try to overwrite
//   other globals shimmed by the library (`DOMException`, `DOMStringList`,
//   `Event`, `CustomEvent`, `EventTarget`)
// Effectively defaults to `false` (ignored unless `true`)
'replaceNonIDBGlobals',
// Overcoming limitations with node-sqlite3/storing database name on
//   file systems
// https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
// Defaults to prefixing database with `D_`, escaping
//   `databaseCharacterEscapeList`, escaping NUL, and
//   escaping upper case letters, as well as enforcing
//   `databaseNameLengthLimit`
'escapeDatabaseName',
// Not used internally; usable as a convenience method
'unescapeDatabaseName',
// Defaults to global regex representing the following
//   (characters nevertheless commonly reserved in modern,
//   Unicode-supporting systems): 0x00-0x1F 0x7F " * / : < > ? \ |
'databaseCharacterEscapeList',
// Defaults to 254 (shortest typical modern file length limit)
'databaseNameLengthLimit',
// Boolean defaulting to true on whether to escape NFD-escaping
//   characters to avoid clashes on MacOS which performs NFD on files
'escapeNFDForDatabaseNames',
// Boolean on whether to add the `.sqlite` extension to file names;
//   defaults to `true`
'addSQLiteExtension',
// Various types of in-memory databases that can auto-delete
['memoryDatabase',
/**
 * @param {string} val
 * @throws {TypeError}
 * @returns {void}
 */
val => {
  if (!/^(?::memory:|file::memory:(\?[^#]*)?(#.*)?)?$/u.test( /** @type {string} */val)) {
    throw new TypeError('`memoryDatabase` must be the empty string, ":memory:", or a ' + '"file::memory:[?queryString][#hash] URL".');
  }
}],
// NODE-SPECIFIC CONFIG
// Boolean on whether to delete the database file itself after
//   `deleteDatabase`; defaults to `true` as the database will be empty
'deleteDatabaseFiles', 'databaseBasePath', 'sysDatabaseBasePath',
// NODE-SPECIFIC WEBSQL CONFIG
'sqlBusyTimeout',
// Defaults to 1000
'sqlTrace',
// Callback not used by default
'sqlProfile',
// Callback not used by default

'createIndexes'].forEach(prop => {
  /** @type {(val: any) => void} */
  let validator;
  if (Array.isArray(prop)) {
    [prop, validator] = prop;
  }
  Object.defineProperty(CFG, prop, {
    get() {
      return map[prop];
    },
    set(val) {
      if (validator) {
        validator(val);
      }
      map[prop] = val;
    }
  });
});

// @ts-nocheck

function getDefaultExportFromCjs$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
var regex = /[\xC0-\xC5\xC7-\xCF\xD1-\xD6\xD9-\xDD\xE0-\xE5\xE7-\xEF\xF1-\xF6\xF9-\xFD\xFF-\u010F\u0112-\u0125\u0128-\u0130\u0134-\u0137\u0139-\u013E\u0143-\u0148\u014C-\u0151\u0154-\u0165\u0168-\u017E\u01A0\u01A1\u01AF\u01B0\u01CD-\u01DC\u01DE-\u01E3\u01E6-\u01F0\u01F4\u01F5\u01F8-\u021B\u021E\u021F\u0226-\u0233\u0344\u0385\u0386\u0388-\u038A\u038C\u038E-\u0390\u03AA-\u03B0\u03CA-\u03CE\u03D3\u03D4\u0400\u0401\u0403\u0407\u040C-\u040E\u0419\u0439\u0450\u0451\u0453\u0457\u045C-\u045E\u0476\u0477\u04C1\u04C2\u04D0-\u04D3\u04D6\u04D7\u04DA-\u04DF\u04E2-\u04E7\u04EA-\u04F5\u04F8\u04F9\u0622-\u0626\u06C0\u06C2\u06D3\u0929\u0931\u0934\u0958-\u095F\u09CB\u09CC\u09DC\u09DD\u09DF\u0A33\u0A36\u0A59-\u0A5B\u0A5E\u0B48\u0B4B\u0B4C\u0B5C\u0B5D\u0B94\u0BCA-\u0BCC\u0C48\u0CC0\u0CC7\u0CC8\u0CCA\u0CCB\u0D4A-\u0D4C\u0DDA\u0DDC-\u0DDE\u0F43\u0F4D\u0F52\u0F57\u0F5C\u0F69\u0F73\u0F75\u0F76\u0F78\u0F81\u0F93\u0F9D\u0FA2\u0FA7\u0FAC\u0FB9\u1026\u1B06\u1B08\u1B0A\u1B0C\u1B0E\u1B12\u1B3B\u1B3D\u1B40\u1B41\u1B43\u1E00-\u1E99\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FC1-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEE\u1FF2-\u1FF4\u1FF6-\u1FFC\u212B\u219A\u219B\u21AE\u21CD-\u21CF\u2204\u2209\u220C\u2224\u2226\u2241\u2244\u2247\u2249\u2260\u2262\u226D-\u2271\u2274\u2275\u2278\u2279\u2280\u2281\u2284\u2285\u2288\u2289\u22AC-\u22AF\u22E0-\u22E3\u22EA-\u22ED\u2ADC\u304C\u304E\u3050\u3052\u3054\u3056\u3058\u305A\u305C\u305E\u3060\u3062\u3065\u3067\u3069\u3070\u3071\u3073\u3074\u3076\u3077\u3079\u307A\u307C\u307D\u3094\u309E\u30AC\u30AE\u30B0\u30B2\u30B4\u30B6\u30B8\u30BA\u30BC\u30BE\u30C0\u30C2\u30C5\u30C7\u30C9\u30D0\u30D1\u30D3\u30D4\u30D6\u30D7\u30D9\u30DA\u30DC\u30DD\u30F4\u30F7-\u30FA\u30FE\uAC00-\uD7A3\uFB1D\uFB1F\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4E]|\uD804[\uDC9A\uDC9C\uDCAB\uDD2E\uDD2F\uDF4B\uDF4C]|\uD805[\uDCBB\uDCBC\uDCBE\uDDBA\uDDBB]|\uD806\uDD38|\uD834[\uDD5E-\uDD64\uDDBB-\uDDC0]/;
var regex$1 = /*@__PURE__*/getDefaultExportFromCjs$1(regex);

/* eslint-disable new-cap -- ToString is how it is defined */

/**
 * @typedef {number} Integer
 */

/**
 * @param {string} arg
 * @returns {string}
 */
function escapeUnmatchedSurrogates(arg) {
  // http://stackoverflow.com/a/6701665/271577
  return arg.replaceAll(/([\uD800-\uDBFF])(?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])([\uDC00-\uDFFF])/gu, function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
    // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
    //   but Chrome having problems
    if (unmatchedHighSurrogate) {
      return '^2' + unmatchedHighSurrogate.codePointAt().toString(16).padStart(4, '0');
    }
    return (precedingLow || '') + '^3' + unmatchedLowSurrogate.codePointAt().toString(16).padStart(4, '0');
  });
}

/**
 * @param {string} arg
 * @returns {string}
 */
function escapeNameForSQLiteIdentifier(arg) {
  // http://stackoverflow.com/a/6701665/271577
  return '_' +
  // Prevent empty string
  escapeUnmatchedSurrogates(arg.replaceAll('^', '^^') // Escape our escape
  // http://www.sqlite.org/src/tktview?name=57c971fc74
  .replaceAll('\0', '^0')
  // We need to avoid identifiers being treated as duplicates based on SQLite's ASCII-only case-insensitive table and column names
  // (For SQL in general, however, see http://stackoverflow.com/a/17215009/271577
  // See also https://www.sqlite.org/faq.html#q18 re: Unicode (non-ASCII) case-insensitive not working
  .replaceAll(/([A-Z])/gu, '^$1'));
}

/**
 * The escaping of unmatched surrogates was needed by Chrome but not Node.
 * @param {string} arg
 * @returns {string}
 */
function escapeSQLiteStatement(arg) {
  return escapeUnmatchedSurrogates(arg.replaceAll('^', '^^').replaceAll('\0', '^0'));
}

/**
 * @param {string} arg
 * @returns {string}
 */
function unescapeSQLiteResponse(arg) {
  return unescapeUnmatchedSurrogates(arg).replaceAll(/(\^+)0/gu, (_, esc) => {
    return esc.length % 2 ? esc.slice(1) + '\0' : _;
  }).replaceAll('^^', '^');
}

/**
 * @param {string} arg
 * @returns {string}
 */
function sqlEscape(arg) {
  // https://www.sqlite.org/lang_keywords.html
  // http://stackoverflow.com/a/6701665/271577
  // There is no need to escape ', `, or [], as
  //   we should always be within double quotes
  // NUL should have already been stripped
  return arg.replaceAll('"', '""');
}

/**
 * @param {string} arg
 * @returns {string}
 */
function sqlQuote(arg) {
  return '"' + sqlEscape(arg) + '"';
}

/**
 * @param {string} db
 * @throws {Error}
 * @returns {string}
 */
function escapeDatabaseNameForSQLAndFiles(db) {
  if (CFG.escapeDatabaseName) {
    // We at least ensure NUL is escaped by default, but we need to still
    //   handle empty string and possibly also length (potentially
    //   throwing if too long), escaping casing (including Unicode?),
    //   and escaping special characters depending on file system
    return CFG.escapeDatabaseName(escapeSQLiteStatement(db));
  }
  db = 'D' + escapeNameForSQLiteIdentifier(db);
  if (CFG.escapeNFDForDatabaseNames !== false) {
    // ES6 copying of regex with different flags
    db = db.replaceAll(new RegExp(regex$1, 'gu'), function (expandable) {
      return '^4' + /** @type {Integer} */expandable.codePointAt(0).toString(16).padStart(6, '0');
    });
  }
  if (CFG.databaseCharacterEscapeList !== false) {
    db = db.replace(CFG.databaseCharacterEscapeList ? new RegExp(CFG.databaseCharacterEscapeList, 'gu') : /[\u0000-\u001F\u007F"*/:<>?\\|]/gu,
    // eslint-disable-line no-control-regex
    function (n0) {
      // eslint-disable-next-line unicorn/prefer-code-point -- Switch to `codePointAt`?
      return '^1' + n0.charCodeAt(0).toString(16).padStart(2, '0');
    });
  }
  if (CFG.databaseNameLengthLimit !== false && db.length >= (CFG.databaseNameLengthLimit || 254) - (CFG.addSQLiteExtension !== false ? 7 /* '.sqlite'.length */ : 0)) {
    throw new Error('Unexpectedly long database name supplied; length limit required for Node compatibility; passed length: ' + db.length + '; length limit setting: ' + (CFG.databaseNameLengthLimit || 254) + '.');
  }
  return db + (CFG.addSQLiteExtension !== false ? '.sqlite' : ''); // Shouldn't have quoting (do we even need NUL/case escaping here?)
}

/**
 * @param {string} arg
 * @returns {string}
 */
function unescapeUnmatchedSurrogates(arg) {
  return arg.replaceAll(/(\^+)3(d[0-9a-f]{3})/gu, (_, esc, lowSurr) => {
    return esc.length % 2 ? esc.slice(1) + String.fromCodePoint(Number.parseInt(lowSurr, 16)) : _;
  }).replaceAll(/(\^+)2(d[0-9a-f]{3})/gu, (_, esc, highSurr) => {
    return esc.length % 2 ? esc.slice(1) + String.fromCodePoint(Number.parseInt(highSurr, 16)) : _;
  });
}

/**
 * @param {string} store
 * @returns {string}
 */
function escapeStoreNameForSQL(store) {
  return sqlQuote('S' + escapeNameForSQLiteIdentifier(store));
}

/**
 * @param {string} index
 * @returns {string}
 */
function escapeIndexNameForSQL(index) {
  return sqlQuote('I' + escapeNameForSQLiteIdentifier(index));
}

/**
 * @param {string} index
 * @returns {string}
 */
function escapeIndexNameForSQLKeyColumn(index) {
  return 'I' + escapeNameForSQLiteIdentifier(index);
}

/**
 * @param {string} str
 * @returns {string}
 */
function sqlLIKEEscape(str) {
  // https://www.sqlite.org/lang_expr.html#like
  return sqlEscape(str).replaceAll('^', '^^');
}

/**
 * @typedef {Function} AnyClass
 */

// Babel doesn't seem to provide a means of using the `instanceof` operator with Symbol.hasInstance (yet?)
/**
 *
 * @param {AnyValue} obj
 * @param {AnyClass} Clss
 * @returns {boolean}
 */
function instanceOf(obj, Clss) {
  return Clss[Symbol.hasInstance](obj);
}

/**
 *
 * @param {AnyValue} obj
 * @returns {obj is object}
 */
function isObj(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 *
 * @param {object} obj
 * @returns {boolean}
 */
function isDate(obj) {
  return isObj(obj) && 'getDate' in obj && typeof obj.getDate === 'function';
}

/**
 *
 * @param {object} obj
 * @returns {boolean}
 */
function isBlob(obj) {
  return isObj(obj) && 'size' in obj && typeof obj.size === 'number' && 'slice' in obj && typeof obj.slice === 'function' && !('lastModified' in obj);
}

/**
 *
 * @param {object} obj
 * @returns {boolean}
 */
function isFile(obj) {
  return isObj(obj) && 'name' in obj && typeof obj.name === 'string' && 'slice' in obj && typeof obj.slice === 'function' && 'lastModified' in obj;
}

/**
 *
 * @param {AnyValue} obj
 * @returns {boolean}
 */
function isBinary(obj) {
  return isObj(obj) && 'byteLength' in obj && typeof obj.byteLength === 'number' && ('slice' in obj && typeof obj.slice === 'function' ||
  // `TypedArray` (view on buffer) or `ArrayBuffer`
  'getFloat64' in obj && typeof obj.getFloat64 === 'function' // `DataView` (view on buffer)
  );
}

/**
 *
 * @param {AnyValue} obj
 * @returns {boolean}
 */
function isIterable(obj) {
  return isObj(obj) && Symbol.iterator in obj && typeof obj[Symbol.iterator] === 'function';
}

/**
 *
 * @param {object} obj
 * @param {string[]} props
 * @returns {void}
 */
function defineOuterInterface(obj, props) {
  props.forEach(prop => {
    const o = {
      get [prop]() {
        throw new TypeError('Illegal invocation');
      },
      // @ts-expect-error Deliberately errs
      set [prop](val) {
        throw new TypeError('Illegal invocation');
      }
    };
    const desc = /** @type {PropertyDescriptor} */
    Object.getOwnPropertyDescriptor(o, prop);
    Object.defineProperty(obj, prop, desc);
  });
}

/**
 *
 * @param {object} obj
 * @param {string[]} props
 * @returns {void}
 */
function defineReadonlyOuterInterface(obj, props) {
  props.forEach(prop => {
    const o = {
      get [prop]() {
        throw new TypeError('Illegal invocation');
      }
    };
    const desc = /** @type {PropertyDescriptor} */
    Object.getOwnPropertyDescriptor(o, prop);
    Object.defineProperty(obj, prop, desc);
  });
}

/**
 *
 * @param {object & {
 *   [key: string]: any
 * }} obj
 * @param {string[]} listeners
 * @returns {void}
 */
function defineListenerProperties(obj, listeners) {
  listeners = typeof listeners === 'string' ? [listeners] : listeners;
  listeners.forEach(listener => {
    const o = {
      get [listener]() {
        return obj['__' + listener];
      },
      /**
       * @param {AnyValue} val
       * @returns {void}
       */
      set [listener](val) {
        obj['__' + listener] = val;
      }
    };
    const desc = /** @type {PropertyDescriptor} */
    Object.getOwnPropertyDescriptor(o, listener);
    // desc.enumerable = true; // Default
    // desc.configurable = true; // Default // Needed by support.js in W3C IndexedDB tests (for openListeners)
    Object.defineProperty(obj, listener, desc);
  });
  listeners.forEach(l => {
    obj[l] = null;
  });
}

/**
 *
 * @param {object} obj
 * @param {string|string[]} props
 * @param {null|{
 *   [key: string]: any
 * }} getter
 * @returns {void}
 */
function defineReadonlyProperties(obj, props, getter = null) {
  props = typeof props === 'string' ? [props] : props;
  props.forEach(function (prop) {
    let o;
    if (getter && prop in getter) {
      o = getter[prop];
    } else {
      Object.defineProperty(obj, '__' + prop, {
        enumerable: false,
        configurable: false,
        writable: true
      });
      // We must resort to this to get "get <name>" as
      //   the function `name` for proper IDL
      o = {
        get [prop]() {
          return this['__' + prop];
        }
      };
    }
    const desc = /** @type {PropertyDescriptor} */
    Object.getOwnPropertyDescriptor(o, prop);
    // desc.enumerable = true; // Default
    // desc.configurable = true; // Default
    Object.defineProperty(obj, prop, desc);
  });
}

/**
 *
 * @param {string} item
 * @returns {boolean}
 */
function isIdentifier(item) {
  // For load-time and run-time performance, we don't provide the complete regular
  //   expression for identifiers, but these can be passed in, using the expressions
  //   found at https://gist.github.com/brettz9/b4cd6821d990daa023b2e604de371407
  // ID_Start (includes Other_ID_Start)
  const UnicodeIDStart = CFG.UnicodeIDStart || '[$A-Z_a-z]';
  // ID_Continue (includes Other_ID_Continue)
  const UnicodeIDContinue = CFG.UnicodeIDContinue || '[$0-9A-Z_a-z]';
  const IdentifierStart = '(?:' + UnicodeIDStart + '|[$_])';
  const IdentifierPart = '(?:' + UnicodeIDContinue + '|[$_\u200C\u200D])';
  return new RegExp('^' + IdentifierStart + IdentifierPart + '*$', 'u').test(item);
}

/**
 *
 * @param {string|string[]} keyPathString
 * @returns {boolean}
 */
function isValidKeyPathString(keyPathString) {
  return typeof keyPathString === 'string' && (keyPathString === '' || isIdentifier(keyPathString) || keyPathString.split('.').every(pathComponent => {
    return isIdentifier(pathComponent);
  }));
}

/**
 *
 * @param {string|string[]} keyPath
 * @returns {boolean}
 */
function isValidKeyPath(keyPath) {
  return isValidKeyPathString(keyPath) || Array.isArray(keyPath) && Boolean(keyPath.length) &&
  // Convert array from sparse to dense http://www.2ality.com/2012/06/dense-arrays.html
  // See also https://heycam.github.io/webidl/#idl-DOMString
  [...keyPath].every(pathComponent => {
    return isValidKeyPathString(pathComponent);
  });
}

/**
 * @param {number} number
 * @param {"unsigned long long"|"unsigned long"} type
 * @throws {Error|TypeError}
 * @returns {number}
 */
function enforceRange(number, type) {
  number = Math.floor(Number(number));
  let max, min;
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
  if (!Number.isFinite(number) || number > max || number < min) {
    throw new TypeError('Invalid range: ' + number);
  }
  return number;
}

/**
 * @typedef {any} AnyValue
 */

/**
 * @param {AnyValue} v
 * @param {boolean} [treatNullAs]
 * @returns {string}
 */
function convertToDOMString(v, treatNullAs) {
  return v === null && treatNullAs ? '' : ToString(v);
}

/**
 * @param {AnyValue} o
 * @returns {string}
 */
function ToString(o) {
  // Todo: See `es-abstract/es7`
  // `String()` will not throw with Symbols
  return '' + o; // eslint-disable-line no-implicit-coercion
}

/**
 *
 * @param {AnyValue} val
 * @returns {string|string[]}
 */
function convertToSequenceDOMString(val) {
  // Per <https://heycam.github.io/webidl/#idl-sequence>, converting to a sequence works with iterables
  if (isIterable(val)) {
    // We don't want conversion to array to convert primitives
    // Per <https://heycam.github.io/webidl/#es-DOMString>, converting to a `DOMString` to be via `ToString`: https://tc39.github.io/ecma262/#sec-tostring
    return [...val].map(item => {
      return ToString(item);
    });
  }
  return ToString(val);
}

/**
 * @param {AnyValue} v
 * @returns {v is null|undefined}
 */
function isNullish(v) {
  return v === null || v === undefined;
}

/**
 * @typedef {Error} DebuggingError
 */

/**
 *
 * @param {string} type
 * @param {DebuggingError|null} [debug]
 * @param {EventInit} [evInit]
 * @returns {Event & {
 *   __legacyOutputDidListenersThrowError?: boolean
 * }}
 */
function createEvent(type, debug, evInit) {
  // @ts-expect-error It's ok
  const ev = new ShimEvent(type, evInit);
  ev.debug = debug;
  return ev;
}

// We don't add within polyfill repo as might not always be the desired implementation
Object.defineProperty(ShimEvent, Symbol.hasInstance, {
  /**
   * @typedef {any} AnyValue
   */
  value:
  /**
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  obj => isObj(obj) && 'target' in obj && 'bubbles' in obj && typeof obj.bubbles === 'boolean'
});

const readonlyProperties$6 = ['oldVersion', 'newVersion'];

/**
 * Babel apparently having a problem adding `hasInstance` to a class,
 * so we are redefining as a function.
 * @class
 * @param {string} type
 */
function IDBVersionChangeEvent(type /* , eventInitDict */) {
  // eventInitDict is a IDBVersionChangeEventInit (but is not defined as a global)
  // @ts-expect-error It's passing only one!
  ShimEvent.call(this, type);
  this[Symbol.toStringTag] = 'IDBVersionChangeEvent';
  this.toString = function () {
    return '[object IDBVersionChangeEvent]';
  };
  // eslint-disable-next-line prefer-rest-params
  this.__eventInitDict = arguments[1] || {};
}

// @ts-expect-error It's ok
IDBVersionChangeEvent.prototype = Object.create(ShimEvent.prototype);
IDBVersionChangeEvent.prototype[Symbol.toStringTag] = 'IDBVersionChangeEventPrototype';

/**
 * @typedef {number} Integer
 */

readonlyProperties$6.forEach(prop => {
  // Ensure for proper interface testing that "get <name>" is the function name
  const o = {
    /**
     * @returns {Integer|null}
     */
    get [prop]() {
      if (!(this instanceof IDBVersionChangeEvent)) {
        throw new TypeError('Illegal invocation');
      }
      return this.__eventInitDict && this.__eventInitDict[prop] || (prop === 'oldVersion' ? 0 : null);
    }
  };
  const desc = /** @type {PropertyDescriptor} */
  Object.getOwnPropertyDescriptor(o, prop);
  // desc.enumerable = true; // Default
  // desc.configurable = true; // Default
  Object.defineProperty(IDBVersionChangeEvent.prototype, prop, desc);
});
Object.defineProperty(IDBVersionChangeEvent, Symbol.hasInstance, {
  /**
   * @typedef {any} AnyValue
   */
  value:
  /**
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  obj => isObj(obj) && 'oldVersion' in obj && 'defaultPrevented' in obj && typeof obj.defaultPrevented === 'boolean'
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

/**
 * Creates a native DOMException, for browsers that support it.
 * @param {string} name
 * @param {string} message
 * @returns {DOMException}
 */
function createNativeDOMException(name, message) {
  // @ts-expect-error It's ok
  return new DOMException.prototype.constructor(message, name || 'DOMException');
}

// From web-platform-tests testharness.js name_code_map (though not in new spec)

/**
 * @typedef {"IndexSizeError"|"HierarchyRequestError"|"WrongDocumentError"|
 * "InvalidCharacterError"|"NoModificationAllowedError"|"NotFoundError"|
 * "NotSupportedError"|"InUseAttributeError"|"InvalidStateError"|
 * "SyntaxError"|"InvalidModificationError"|"NamespaceError"|
 * "InvalidAccessError"|"TypeMismatchError"|"SecurityError"|
 * "NetworkError"|"AbortError"|"URLMismatchError"|"QuotaExceededError"|
 * "TimeoutError"|"InvalidNodeTypeError"|"DataCloneError"|"EncodingError"|
 * "NotReadableError"|"UnknownError"|"ConstraintError"|"DataError"|
 * "TransactionInactiveError"|"ReadOnlyError"|"VersionError"|
 * "OperationError"|"NotAllowedError"} Code
 */

const codes = {
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

/**
 * @typedef {"INDEX_SIZE_ERR"|"DOMSTRING_SIZE_ERR"|"HIERARCHY_REQUEST_ERR"|
 * "WRONG_DOCUMENT_ERR"|"INVALID_CHARACTER_ERR"|"NO_DATA_ALLOWED_ERR"|
 * "NO_MODIFICATION_ALLOWED_ERR"|"NOT_FOUND_ERR"|"NOT_SUPPORTED_ERR"|
 * "INUSE_ATTRIBUTE_ERR"|"INVALID_STATE_ERR"|"SYNTAX_ERR"|
 * "INVALID_MODIFICATION_ERR"|"NAMESPACE_ERR"|"INVALID_ACCESS_ERR"|
 * "VALIDATION_ERR"|"TYPE_MISMATCH_ERR"|"SECURITY_ERR"|"NETWORK_ERR"|
 * "ABORT_ERR"|"URL_MISMATCH_ERR"|"QUOTA_EXCEEDED_ERR"|"TIMEOUT_ERR"|
 * "INVALID_NODE_TYPE_ERR"|"DATA_CLONE_ERR"} LegacyCode
 */

const legacyCodes = {
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

/**
 *
 * @returns {typeof DOMException}
 */
function createNonNativeDOMExceptionClass() {
  /**
   * @param {string|undefined} message
   * @param {Code|LegacyCode} name
   * @returns {void}
   */
  function DOMException(message, name) {
    // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
    this[Symbol.toStringTag] = 'DOMException';
    this._code = name in codes ? codes[( /** @type {Code} */name)] : legacyCodes[( /** @type {LegacyCode} */name)] || 0;
    this._name = name || 'Error';
    // We avoid `String()` in this next line as it converts Symbols
    this._message = message === undefined ? '' : '' + message; // eslint-disable-line no-implicit-coercion
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
  /* eslint-disable func-name-matching */
  /**
   * @class
   */
  const DummyDOMException = function DOMException() {/* */};
  /* eslint-enable func-name-matching */
  DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing
  /** @type {const} */
  ['name', 'message'].forEach(prop => {
    Object.defineProperty(DummyDOMException.prototype, prop, {
      enumerable: true,
      /**
       * @this {DOMException}
       * @returns {string}
       */
      get() {
        if (!(this instanceof DOMException ||
        // @ts-expect-error Just checking
        this instanceof DummyDOMException ||
        // @ts-expect-error Just checking
        this instanceof Error)) {
          throw new TypeError('Illegal invocation');
        }
        return this[prop === 'name' ? '_name' : '_message'];
      }
    });
  });
  // DOMException uses the same `toString` as `Error`
  Object.defineProperty(DummyDOMException.prototype, 'code', {
    configurable: true,
    enumerable: true,
    get() {
      throw new TypeError('Illegal invocation');
    }
  });
  // @ts-expect-error It's ok
  DOMException.prototype = new DummyDOMException();
  DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
  Object.defineProperty(DOMException, 'prototype', {
    writable: false
  });
  const keys = Object.keys(codes);

  /** @type {(keyof codes)[]} */
  keys.forEach(codeName => {
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
  /** @type {(keyof legacyCodes)[]} */
  Object.keys(legacyCodes).forEach(codeName => {
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

  // @ts-expect-error We don't need all its properties
  return DOMException;
}
const ShimNonNativeDOMException = createNonNativeDOMExceptionClass();

/**
 * Creates a generic Error object.
 * @param {string} name
 * @param {string} message
 * @returns {Error}
 */
function createNonNativeDOMException(name, message) {
  return new ShimNonNativeDOMException(message, name);
}

/**
 * @typedef {{
 *   message: string|DOMString
 * }} ErrorLike
 */

/**
 * Logs detailed error information to the console.
 * @param {string} name
 * @param {string} message
 * @param {string|ErrorLike|boolean|null} [error]
 * @returns {void}
 */
function logError(name, message, error) {
  if (CFG.DEBUG) {
    const msg = error && typeof error === 'object' && error.message ? error.message : ( /** @type {string} */error);
    const method = typeof console.error === 'function' ? 'error' : 'log';
    console[method](name + ': ' + message + '. ' + (msg || ''));
    if (console.trace) {
      console.trace();
    }
  }
}

/**
 * @typedef {any} ArbitraryValue
 */

/**
 * @param {ArbitraryValue} obj
 * @returns {boolean}
 */
function isErrorOrDOMErrorOrDOMException(obj) {
  return obj && typeof obj === 'object' &&
  // We don't use util.isObj here as mutual dependency causing problems in Babel with browser
  typeof obj.name === 'string';
}

/**
 * Finds the error argument.  This is useful because some WebSQL callbacks
 * pass the error as the first argument, and some pass it as the second
 * argument.
 * @param {(Error|{message?: string, name?: string}|any)[]} args
 * @returns {Error|DOMException|undefined}
 */
function findError(args) {
  let err;
  if (args) {
    if (args.length === 1) {
      return args[0];
    }
    for (const arg of args) {
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

/**
 *
 * @param {SQLError} webSQLErr
 * @returns {(DOMException|Error) & {
 *   sqlError: SQLError
 * }}
 */
function webSQLErrback(webSQLErr) {
  let name, message;
  switch (webSQLErr.code) {
    case 4:
      {
        // SQLError.QUOTA_ERR
        name = 'QuotaExceededError';
        message = 'The operation failed because there was not enough ' + 'remaining storage space, or the storage quota was reached ' + 'and the user declined to give more space to the database.';
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
  const err =
  /**
   * @type {(Error | DOMException) & {
   *   sqlError: SQLError
   * }}
   */
  createDOMException(name, message);
  err.sqlError = webSQLErr;
  return err;
}
let test,
  useNativeDOMException = false;

// Test whether we can use the browser's native DOMException class
try {
  test = createNativeDOMException('test name', 'test message');
  if (isErrorOrDOMErrorOrDOMException(test) && test.name === 'test name' && test.message === 'test message') {
    // Native DOMException works as expected
    useNativeDOMException = true;
  }
} catch (e) {}
const createDOMException = useNativeDOMException
// eslint-disable-next-line @stylistic/operator-linebreak -- Need JSDoc
?
/**
* @param {string} name
* @param {string} message
* @param {ErrorLike} [error]
* @returns {DOMException}
*/
function (name, message, error) {
  logError(name, message, error);
  return createNativeDOMException(name, message);
}
// eslint-disable-next-line @stylistic/operator-linebreak -- Need JSDoc
:
/**
* @param {string} name
* @param {string} message
* @param {ErrorLike} [error]
* @returns {Error}
*/
function (name, message, error) {
  logError(name, message, error);
  return createNonNativeDOMException(name, message);
};
const ShimDOMException = useNativeDOMException ? DOMException : ShimNonNativeDOMException;

const listeners$2 = ['onsuccess', 'onerror'];
const readonlyProperties$5 = ['source', 'transaction', 'readyState'];
const doneFlagGetters = ['result', 'error'];

/**
 * The IDBRequest Object that is returns for all async calls.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#request-api
 * @class
 */
function IDBRequest() {
  throw new TypeError('Illegal constructor');
}

/**
 * @typedef {IDBRequest & EventTarget & import('eventtargeter').ShimEventTarget & {
 *   transaction: import('./IDBTransaction.js').IDBTransactionFull,
 *   __done: boolean,
 *   __result: import('./IDBDatabase.js').IDBDatabaseFull|undefined,
 *   __error: null|DOMException|Error,
 *   __source: null|import('./IDBDatabase.js').IDBDatabaseFull|
 *     import('./IDBObjectStore.js').IDBObjectStoreFull|
 *     import('./IDBIndex.js').IDBIndexFull,
 *   __transaction: undefined|null|
 *     import('./IDBTransaction.js').IDBTransactionFull,
 *   addLateEventListener: (ev: string, listener: (e: Event & {
 *     __legacyOutputDidListenersThrowError: boolean
 *   }) => void) => void
 *   addDefaultEventListener: (ev: string, listener: (e: Event & {
 *     __legacyOutputDidListenersThrowError: boolean
 *   }) => void) => void
 * }} IDBRequestFull
 */

/* eslint-disable func-name-matching -- Polyfill */
/**
 * @class
 * @this {IDBRequestFull}
 */
IDBRequest.__super = function IDBRequest() {
  // @ts-expect-error It's ok
  this[Symbol.toStringTag] = 'IDBRequest';
  // @ts-expect-error Part of `ShimEventTarget`
  this.__setOptions({
    legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
  });
  doneFlagGetters.forEach(prop => {
    Object.defineProperty(this, '__' + prop, {
      enumerable: false,
      configurable: false,
      writable: true
    });
    Object.defineProperty(this, prop, {
      enumerable: true,
      configurable: true,
      get() {
        if (!this.__done) {
          throw createDOMException('InvalidStateError', "Can't get " + prop + '; the request is still pending.');
        }
        return this['__' + prop];
      }
    });
  });
  defineReadonlyProperties(this, readonlyProperties$5, {
    readyState: {
      /**
       * @this {IDBRequestFull}
       * @returns {"done"|"pending"}
       */
      get readyState() {
        return this.__done ? 'done' : 'pending';
      }
    }
  });
  defineListenerProperties(this, listeners$2);
  this.__result = undefined;
  this.__error = this.__source = this.__transaction = null;
  this.__done = false;
};
/* eslint-enable func-name-matching -- Polyfill */

/**
 * @returns {IDBRequestFull}
 */
IDBRequest.__createInstance = function () {
  // @ts-expect-error Casting this causes other errors
  return new IDBRequest.__super();
};

// @ts-expect-error It's ok
IDBRequest.prototype = EventTargetFactory.createInstance({
  extraProperties: ['debug']
});
IDBRequest.prototype[Symbol.toStringTag] = 'IDBRequestPrototype';

/**
 * @this {IDBRequestFull}
 * @returns {import('./IDBTransaction.js').IDBTransactionFull|null|undefined}
 */
IDBRequest.prototype.__getParent = function () {
  if (this.toString() === '[object IDBOpenDBRequest]') {
    return null;
  }
  return this.__transaction;
};

// Illegal invocations
defineReadonlyOuterInterface(IDBRequest.prototype, readonlyProperties$5);
defineReadonlyOuterInterface(IDBRequest.prototype, doneFlagGetters);
defineOuterInterface(IDBRequest.prototype, listeners$2);
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
const openListeners = ['onblocked', 'onupgradeneeded'];

/**
 * @typedef {IDBRequestFull & IDBOpenDBRequest & {}} IDBOpenDBRequestFull
 */

/**
 * The IDBOpenDBRequest called when a database is opened.
 * @class
 */
function IDBOpenDBRequest() {
  throw new TypeError('Illegal constructor');
}

// @ts-expect-error It's ok
IDBOpenDBRequest.prototype = Object.create(IDBRequest.prototype);
Object.defineProperty(IDBOpenDBRequest.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: IDBOpenDBRequest
});
const IDBOpenDBRequestAlias = IDBOpenDBRequest;
/**
 * @returns {IDBRequestFull & IDBOpenDBRequest}
 */
IDBOpenDBRequest.__createInstance = function () {
  /**
   * @class
   * @this {IDBOpenDBRequestFull}
   */
  function IDBOpenDBRequest() {
    IDBRequest.__super.call(this);

    // @ts-expect-error It's ok
    this[Symbol.toStringTag] = 'IDBOpenDBRequest';
    // @ts-expect-error It's ok
    this.__setOptions({
      legacyOutputDidListenersThrowFlag: true,
      // Event hook for IndexedB
      extraProperties: ['oldVersion', 'newVersion', 'debug']
    }); // Ensure EventTarget preserves our properties
    defineListenerProperties(this, openListeners);
  }
  IDBOpenDBRequest.prototype = IDBOpenDBRequestAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBOpenDBRequest();
};
defineOuterInterface(IDBOpenDBRequest.prototype, openListeners);
IDBOpenDBRequest.prototype[Symbol.toStringTag] = 'IDBOpenDBRequestPrototype';
Object.defineProperty(IDBOpenDBRequest, 'prototype', {
  writable: false
});

/* eslint-disable promise/prefer-await-to-callbacks -- Needed for API */
/* eslint-disable promise/catch-or-return, n/callback-return,
    promise/always-return -- Not needed */
/* eslint-disable unicorn/no-this-assignment -- Clarity */
// Since [immediate](https://github.com/calvinmetcalf/immediate) is
//   not doing the trick for our WebSQL transactions (at least in Node),
//   we are forced to make the promises run fully synchronously.

// Todo: Use ES6 classes

/**
 * @typedef {any} ArbitraryValue
 */

/**
 * @callback Resolve
 * @param {ArbitraryValue} val
 * @returns {void}
 */
/**
 * @callback Reject
 * @param {ArbitraryValue} reason
 * @returns {void}
 */
/**
 * @callback Settle
 * @returns {void}
 */

/**
 * @callback ResolveReject
 * @param {Resolve} resolve
 * @param {Reject} reject
 * @returns {void}
 */

/**
 * @callback OnFulfilled
 * @param {ArbitraryValue} resolve
 * @returns {void}
 */

/**
 * @typedef {[(Settle|Resolve)[], (Settle|Reject)[]]} Callbacks
 */

/**
 *
 * @param {PromiseLike<ArbitraryValue>} p
 * @returns {boolean}
 */
function isPromise(p) {
  return p && typeof p.then === 'function';
}
/**
 *
 * @param {PromiseLike<ArbitraryValue>} prom
 * @param {(err: Error) => void} reject
 * @returns {void}
 */
function addReject(prom, reject) {
  // Use this style for sake of non-Promise thenables (e.g., jQuery Deferred)
  prom.then(null, reject);
}

// States
const PENDING = 2,
  FULFILLED = 0,
  // We later abuse these as array indices
  REJECTED = 1;

/**
 * @class
 * @param {(
 *   resolve: (value: ArbitraryValue | PromiseLike<ArbitraryValue>) => void,
 *   reject: (reason?: any) => void
 * ) => void} fn
 */
function SyncPromise(fn) {
  const that = this;
  // Value, this will be set to either a resolved value or rejected reason
  that.v = 0;
  // State of the promise
  that.s = PENDING;
  // Callbacks c[0] is fulfillment and c[1] contains rejection callbacks
  /** @type {Callbacks|null} */
  that.c = [[], []];
  /**
   *
   * @param {ArbitraryValue} val
   * @param {0|1} state
   * @returns {void}
   */
  function transist(val, state) {
    that.v = val;
    that.s = state;

    // console.log('state', state);
    /** @type {Callbacks} */
    that.c[state].forEach(function (func) {
      func(val);
    });
    // Release memory, but if no handlers have been added, as we
    //   assume that we will resolve/reject (truly) synchronously
    //   and thus we avoid flagging checks about whether we've
    //   already resolved/rejected.
    if ( /** @type {Callbacks} */that.c[state].length) {
      that.c = null;
    }
  }

  /** @type {Resolve} */
  function resolve(val) {
    if (!that.c) ; else if (isPromise(val)) {
      addReject(val.then(resolve), reject);
    } else {
      transist(val, FULFILLED);
    }
  }

  /** @type {Reject} */
  function reject(reason) {
    if (!that.c) ; else if (isPromise(reason)) {
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

/* eslint-disable unicorn/no-thenable -- Promise API */
/**
 * @param {((value: ArbitraryValue) => ArbitraryValue)|null|undefined} [cb]
 * @param {(reason: any) => PromiseLike<never>} [errBack]
 * @returns {SyncPromise}
 */
SyncPromise.prototype.then = function (cb, errBack) {
  /* eslint-enable unicorn/no-thenable -- Promise API */
  const that = this;
  return new SyncPromise( /** @type {ResolveReject} */
  function (resolve, reject) {
    const rej = typeof errBack === 'function' ? errBack : reject;

    /** @type {Settle} */
    function settle() {
      try {
        resolve(cb ? cb(that.v) : that.v);
      } catch (e) {
        rej(e);
      }
    }
    if (that.s === FULFILLED) {
      settle();
    } else if (that.s === REJECTED) {
      rej(that.v);
    } else {
      /** @type {Callbacks} */that.c[FULFILLED].push(settle);
      /** @type {Callbacks} */
      that.c[REJECTED].push(rej);
    }
  });
};

/**
 * @param {(reason: any) => PromiseLike<never>|null|undefined} cb
 * @returns {SyncPromise}
 */
SyncPromise.prototype.catch = function (cb) {
  const that = this;
  return new SyncPromise( /** @type {ResolveReject} */
  function (resolve, reject) {
    /**
     * @returns {void}
     */
    function settle() {
      try {
        resolve(cb(that.v));
      } catch (e) {
        reject(e);
      }
    }
    if (that.s === REJECTED) {
      settle();
    } else if (that.s === FULFILLED) {
      resolve(that.v);
    } else {
      /** @type {Callbacks} */that.c[REJECTED].push(settle);
      /** @type {Callbacks} */
      that.c[FULFILLED].push(resolve);
    }
  });
};

/**
 * @param {unknown[]|[]} promises
 * @returns {SyncPromise}
 */
SyncPromise.all = function (promises) {
  return new SyncPromise( /** @type {ResolveReject} */
  (resolve, reject) => {
    let l = promises.length;
    /** @type {ArbitraryValue[]} */
    const newPromises = [];
    if (!l) {
      resolve(newPromises);
      return;
    }
    promises.forEach((p, i) => {
      if (isPromise( /** @type {PromiseLike<any>} */p)) {
        addReject( /** @type {PromiseLike<any>} */p.then( /** @type {OnFulfilled} */
        res => {
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

/**
 * @param {unknown[]|[]} promises
 * @returns {SyncPromise}
 */
SyncPromise.race = function (promises) {
  let resolved = false;
  return new SyncPromise( /** @type {ResolveReject} */
  (resolve, reject) => {
    promises.some((p, i) => {
      if (isPromise( /** @type {PromiseLike<any>} */p)) {
        addReject( /** @type {PromiseLike<any>} */p.then( /** @type {OnFulfilled} */
        res => {
          if (resolved) {
            return;
          }
          resolve(res);
          resolved = true;
        }), reject);
        return false;
      }
      resolve(p);
      resolved = true;
      return true;
    });
  });
};

/**
 * @param {ArbitraryValue} val
 * @returns {SyncPromise}
 */
SyncPromise.resolve = function (val) {
  return new SyncPromise( /** @type {ResolveReject} */
  (resolve, reject) => {
    resolve(val);
  });
};

/**
 * @param {ArbitraryValue} val
 * @returns {SyncPromise}
 */
SyncPromise.reject = function (val) {
  return new SyncPromise( /** @type {ResolveReject} */
  (resolve, reject) => {
    reject(val);
  });
};

/**
 * Compares two keys.
 * @param {import('./Key.js').Key} first
 * @param {import('./Key.js').Key} second
 * @returns {0|1|-1}
 */
function cmp(first, second) {
  const encodedKey1 = /** @type {string} */encode$1(first);
  const encodedKey2 = /** @type {string} */encode$1(second);
  const result = encodedKey1 > encodedKey2 ? 1 : encodedKey1 === encodedKey2 ? 0 : -1;
  if (CFG.DEBUG) {
    // verify that the keys encoded correctly
    let decodedKey1 = decode$1(encodedKey1);
    let decodedKey2 = decode$1(encodedKey2);
    if (typeof first === 'object') {
      first = JSON.stringify(first);
      decodedKey1 = JSON.stringify(decodedKey1);
    }
    if (typeof second === 'object') {
      second = JSON.stringify(second);
      decodedKey2 = JSON.stringify(decodedKey2);
    }

    // Encoding/decoding mismatches are usually due to a loss of
    //   floating-point precision
    if (decodedKey1 !== first) {
      console.warn(first + ' was incorrectly encoded as ' + decodedKey1);
    }
    if (decodedKey2 !== second) {
      console.warn(second + ' was incorrectly encoded as ' + decodedKey2);
    }
  }
  return result;
}

/**
 * @typedef {NodeJS.TypedArray|DataView} ArrayBufferView
 */

/**
 * @typedef {ArrayBufferView|ArrayBuffer} BufferSource
 */

/**
 * @typedef {"number"|"date"|"string"|"binary"|"array"} KeyType
 */

/**
 * @typedef {any} Value
 */

/**
 * @typedef {any} Key
 * @todo Specify possible value more precisely
 */

/**
 * @typedef {KeyPath[]} KeyPathArray
 */
/**
 * @typedef {string|KeyPathArray} KeyPath
 */

/**
* @typedef {object} KeyValueObject
* @property {KeyType|"NaN"|"null"|"undefined"|"boolean"|"object"|"symbol"|
*   "function"|"bigint"} type If not `KeyType`, indicates invalid value
* @property {Value} [value]
* @property {boolean} [invalid]
* @property {string} [message]
* @todo Specify acceptable `value` more precisely
*/

/**
 * @typedef {number|string|Date|ArrayBuffer} ValueTypePrimitive
 */
/**
 * @typedef {ValueType[]} ValueTypeArray
 */
/**
 * @typedef {ValueTypePrimitive|ValueTypeArray} ValueType
 */

/**
 * Encodes the keys based on their types. This is required to maintain collations
 * We leave space for future keys.
 * @type {{[key: string]: Integer|string}}
 */
const keyTypeToEncodedChar = {
  invalid: 100,
  number: 200,
  date: 300,
  string: 400,
  binary: 500,
  array: 600
};
const keyTypes = /** @type {(KeyType|"invalid")[]} */Object.keys(keyTypeToEncodedChar);
keyTypes.forEach(k => {
  keyTypeToEncodedChar[k] = String.fromCodePoint( /** @type {number} */keyTypeToEncodedChar[k]);
});
const encodedCharToKeyType = keyTypes.reduce((o, k) => {
  o[keyTypeToEncodedChar[k]] = k;
  return o;
}, /** @type {{[key: string]: KeyType|"invalid"}} */{});

/**
 * The sign values for numbers, ordered from least to greatest.
 *  - "negativeInfinity": Sorts below all other values.
 *  - "bigNegative": Negative values less than or equal to negative one.
 *  - "smallNegative": Negative values between negative one and zero, noninclusive.
 *  - "smallPositive": Positive values between zero and one, including zero but not one.
 *  - "largePositive": Positive values greater than or equal to one.
 *  - "positiveInfinity": Sorts above all other values.
 */
const signValues = ['negativeInfinity', 'bigNegative', 'smallNegative', 'smallPositive', 'bigPositive', 'positiveInfinity'];

/**
 * @typedef {any} AnyValue
 */

const types$2 = {
  invalid: {
    /**
     * @returns {string}
     */
    encode() {
      return keyTypeToEncodedChar.invalid + '-';
    },
    /**
     * @returns {undefined}
     */
    decode() {
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
    /**
     * @param {number} key
     * @returns {string}
     */
    encode(key) {
      let key32 = key === Number.MIN_VALUE
      // Mocha test `IDBFactory/cmp-spec.js` exposed problem for some
      //   Node (and Chrome) versions with `Number.MIN_VALUE` being treated
      //   as 0
      // https://stackoverflow.com/questions/43305403/number-min-value-and-tostring
      ? '0.' + '0'.repeat(214) + '2' : Math.abs(key).toString(32);
      // Get the index of the decimal.
      const decimalIndex = key32.indexOf('.');
      // Remove the decimal.
      key32 = decimalIndex !== -1 ? key32.replace('.', '') : key32;
      // Get the index of the first significant digit.
      const significantDigitIndex = key32.search(/[^0]/u);
      // Truncate leading zeros.
      key32 = key32.slice(significantDigitIndex);
      let sign, exponent, mantissa;

      // Finite cases:
      if (Number.isFinite(Number(key))) {
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
          // Negative exponent case:
        } else if (key < 1) {
          sign = signValues.indexOf('smallPositive');
          exponent = flipBase32(padBase32Exponent(significantDigitIndex));
          mantissa = padBase32Mantissa(key32);
          // Non-negative exponent case:
        } else {
          sign = signValues.indexOf('bigPositive');
          exponent = padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length);
          mantissa = padBase32Mantissa(key32);
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
    /**
     * @param {string} key
     * @returns {number}
     */
    decode(key) {
      const sign = Number(key.slice(2, 3));
      let exponent = key.slice(3, 5);
      let mantissa = key.slice(5, 16);
      switch (signValues[sign]) {
        case 'negativeInfinity':
          return Number.NEGATIVE_INFINITY;
        case 'positiveInfinity':
          return Number.POSITIVE_INFINITY;
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
    /**
     * @param {string} key
     * @param {boolean} [inArray]
     * @returns {string}
     */
    encode(key, inArray) {
      if (inArray) {
        // prepend each character with a dash, and append a space to the end
        key = key.replaceAll(/(.)/gu, '-$1') + ' ';
      }
      return keyTypeToEncodedChar.string + '-' + key;
    },
    /**
     * @param {string} key
     * @param {boolean} [inArray]
     * @returns {string}
     */
    decode(key, inArray) {
      key = key.slice(2);
      if (inArray) {
        // remove the space at the end, and the dash before each character
        key = key.slice(0, -1).replaceAll(/-(.)/gu, '$1');
      }
      return key;
    }
  },
  // Arrays are encoded as JSON strings.
  // An extra, value is added to each array during encoding to make
  //  empty arrays sort correctly.
  array: {
    /**
     * @param {ValueTypeArray} key
     * @returns {string}
     */
    encode(key) {
      const encoded = [];
      for (const [i, item] of key.entries()) {
        const encodedItem = encode$1(item, true); // encode the array item
        encoded[i] = encodedItem;
      }
      encoded.push(keyTypeToEncodedChar.invalid + '-'); // append an extra item, so empty arrays sort correctly
      return keyTypeToEncodedChar.array + '-' + JSON.stringify(encoded);
    },
    /**
     * @param {string} key
     * @returns {ValueTypeArray}
     */
    decode(key) {
      const decoded = JSON.parse(key.slice(2));
      decoded.pop(); // remove the extra item
      for (let i = 0; i < decoded.length; i++) {
        const item = decoded[i];
        const decodedItem = decode$1(item, true); // decode the item
        decoded[i] = decodedItem;
      }
      return decoded;
    }
  },
  // Dates are encoded as ISO 8601 strings, in UTC time zone.
  date: {
    /**
     * @param {Date} key
     * @returns {string}
     */
    encode(key) {
      return keyTypeToEncodedChar.date + '-' + key.toJSON();
    },
    /**
     * @param {string} key
     * @returns {Date}
     */
    decode(key) {
      return new Date(key.slice(2));
    }
  },
  binary: {
    // `ArrayBuffer`/Views on buffers (`TypedArray` or `DataView`)
    /**
     * @param {BufferSource} key
     * @returns {string}
     */
    encode(key) {
      return keyTypeToEncodedChar.binary + '-' + (key.byteLength ? [...getCopyBytesHeldByBufferSource(key)].map(b => String(b).padStart(3, '0')) // e.g., '255,005,254,000,001,033'
      : '');
    },
    /**
     * @param {string} key
     * @returns {ArrayBuffer}
     */
    decode(key) {
      // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
      const k = key.slice(2);
      const arr = k.length ? k.split(',').map(s => Number.parseInt(s)) : [];
      const buffer = new ArrayBuffer(arr.length);
      const uint8 = new Uint8Array(buffer);
      uint8.set(arr);
      return buffer;
    }
  }
};

/**
 * Return a padded base-32 exponent value.
 * @param {number} n
 * @returns {string}
 */
function padBase32Exponent(n) {
  const exp = n.toString(32);
  return exp.length === 1 ? '0' + exp : exp;
}

/**
 * Return a padded base-32 mantissa.
 * @param {string} s
 * @returns {string}
 */
function padBase32Mantissa(s) {
  return (s + zeros(11)).slice(0, 11);
}

/**
 * Flips each digit of a base-32 encoded string.
 * @param {string} encoded
 * @returns {string}
 */
function flipBase32(encoded) {
  let flipped = '';
  for (const ch of encoded) {
    flipped += (31 - Number.parseInt(ch, 32)).toString(32);
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
 * @param {string} mantissa
 * @param {string} exponent
 * @returns {number}
 */
function pow32(mantissa, exponent) {
  const exp = Number.parseInt(exponent, 32);
  if (exp < 0) {
    return roundToPrecision(Number.parseInt(mantissa, 32) * 32 ** (exp - 10));
  }
  if (exp < 11) {
    const whole = mantissa.slice(0, exp);
    const wholeNum = Number.parseInt(whole, 32);
    const fraction = mantissa.slice(exp);
    const fractionNum = Number.parseInt(fraction, 32) * 32 ** (exp - 11);
    return roundToPrecision(wholeNum + fractionNum);
  }
  const expansion = mantissa + zeros(exp - 11);
  return Number.parseInt(expansion, 32);
}

/**
 * @typedef {number} Float
 */

/**
 * @param {Float} num
 * @param {Float} [precision]
 * @returns {Float}
 */
function roundToPrecision(num, precision = 16) {
  return Number.parseFloat(num.toPrecision(precision));
}

/**
 * Returns a string of n zeros.
 * @param {number} n
 * @returns {string}
 */
function zeros(n) {
  return '0'.repeat(n);
}

/**
 * Negates numeric strings.
 * @param {string} s
 * @returns {string}
 */
function negate(s) {
  return '-' + s;
}

/**
 * @param {Key} key
 * @returns {KeyType|"invalid"}
 */
function getKeyType(key) {
  if (Array.isArray(key)) {
    return 'array';
  }
  if (isDate(key)) {
    return 'date';
  }
  if (isBinary(key)) {
    return 'binary';
  }
  const keyType = typeof key;
  return ['string', 'number'].includes(keyType) ? ( /** @type {"string"|"number"} */keyType) : 'invalid';
}

/**
 * Keys must be strings, numbers (besides `NaN`), Dates (if value is not
 *   `NaN`), binary objects or Arrays.
 * @param {Value} input The key input
 * @param {Value[]|null|undefined} [seen] An array of already seen keys
 * @returns {KeyValueObject}
 */
function convertValueToKey(input, seen) {
  return convertValueToKeyValueDecoded(input, seen, false, true);
}

/**
* Currently not in use.
* @param {Value} input
* @returns {KeyValueObject}
*/
function convertValueToMultiEntryKey(input) {
  return convertValueToKeyValueDecoded(input, null, true, true);
}

/**
 *
 * @param {BufferSource} O
 * @throws {TypeError}
 * @see https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
 * @returns {Uint8Array}
 */
function getCopyBytesHeldByBufferSource(O) {
  let offset = 0;
  let length = 0;
  if (ArrayBuffer.isView(O)) {
    // Has [[ViewedArrayBuffer]] internal slot
    const arrayBuffer = O.buffer;
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
  return new Uint8Array(
  // Should allow DataView
  /** @type {ArrayBuffer} */
  'buffer' in O && O.buffer || O, offset, length);
}

/**
* Shortcut utility to avoid returning full keys from `convertValueToKey`
*   and subsequent need to process in calling code unless `fullKeys` is
*   set; may throw.
* @param {Value} input
* @param {Value[]|null} [seen]
* @param {boolean} [multiEntry]
* @param {boolean} [fullKeys]
* @throws {TypeError} See `getCopyBytesHeldByBufferSource`
* @todo Document other allowable `input`
* @returns {KeyValueObject}
*/
function convertValueToKeyValueDecoded(input, seen, multiEntry, fullKeys) {
  seen = seen || [];
  if (seen.includes(input)) {
    return {
      type: 'array',
      invalid: true,
      message: 'An array key cannot be circular'
    };
  }
  const type = getKeyType(input);
  const ret = {
    type,
    value: input
  };
  switch (type) {
    case 'number':
      {
        if (Number.isNaN(input)) {
          // List as 'NaN' type for convenience of consumers in reporting errors
          return {
            type: 'NaN',
            invalid: true
          };
        }

        // https://github.com/w3c/IndexedDB/issues/375
        // https://github.com/w3c/IndexedDB/pull/386
        if (Object.is(input, -0)) {
          return {
            type,
            value: 0
          };
        }
        return /** @type {{type: KeyType; value: Value}} */ret;
      }
    case 'string':
      {
        return /** @type {{type: KeyType; value: Value}} */ret;
      }
    case 'binary':
      {
        // May throw (if detached)
        // Get a copy of the bytes held by the buffer source
        // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
        const octets = getCopyBytesHeldByBufferSource( /** @type {BufferSource} */input);
        return {
          type: 'binary',
          value: octets
        };
      }
    case 'array':
      {
        // May throw (from binary)
        const arr = /** @type {Array<any>} */input;
        const len = arr.length;
        seen.push(input);

        /** @type {(KeyValueObject|Value)[]} */
        const keys = [];
        for (let i = 0; i < len; i++) {
          // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
          if (!multiEntry && !Object.hasOwn(arr, i)) {
            return {
              type,
              invalid: true,
              message: 'Does not have own index property'
            };
          }
          try {
            const entry = arr[i];
            const key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry
            if (key.invalid) {
              if (multiEntry) {
                continue;
              }
              return {
                type,
                invalid: true,
                message: 'Bad array entry value-to-key conversion'
              };
            }
            if (!multiEntry || !fullKeys && keys.every(k => cmp(k, key.value) !== 0) || fullKeys && keys.every(k => cmp(k, key) !== 0)) {
              keys.push(fullKeys ? key : key.value);
            }
          } catch (err) {
            if (!multiEntry) {
              throw err;
            }
          }
        }
        return {
          type,
          value: keys
        };
      }
    case 'date':
      {
        const date = /** @type {Date} */input;
        if (!Number.isNaN(date.getTime())) {
          return fullKeys ? {
            type,
            value: date.getTime()
          } : {
            type,
            value: new Date(date.getTime())
          };
        }
        return {
          type,
          invalid: true,
          message: 'Not a valid date'
        };
        // Falls through
      }
    case 'invalid':
    default:
      {
        // Other `typeof` types which are not valid keys:
        //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function'
        const type = input === null ? 'null' : typeof input; // Convert `null` for convenience of consumers in reporting errors
        return {
          type,
          invalid: true,
          message: 'Not a valid key; type ' + type
        };
      }
  }
}

/**
 *
 * @param {Key} key
 * @param {boolean} [fullKeys]
 * @returns {KeyValueObject}
 * @todo Document other allowable `key`?
 */
function convertValueToMultiEntryKeyDecoded(key, fullKeys) {
  return convertValueToKeyValueDecoded(key, null, true, fullKeys);
}

/**
* An internal utility.
* @param {Value} input
* @param {Value[]|null|undefined} [seen]
* @throws {DOMException} `DataError`
* @returns {KeyValueObject}
*/
function convertValueToKeyRethrowingAndIfInvalid(input, seen) {
  const key = convertValueToKey(input, seen);
  if (key.invalid) {
    throw createDOMException('DataError', key.message || 'Not a valid key; type: ' + key.type);
  }
  return key;
}

/**
 *
 * @param {Value} value
 * @param {KeyPath} keyPath
 * @param {boolean} multiEntry
 * @returns {KeyValueObject|KeyPathEvaluateValue}
 * @todo Document other possible return?
 */
function extractKeyFromValueUsingKeyPath(value, keyPath, multiEntry) {
  return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
}
/**
* Not currently in use.
* @param {Value} value
* @param {KeyPath} keyPath
* @param {boolean} multiEntry
* @returns {KeyPathEvaluateValue}
*/
function evaluateKeyPathOnValue(value, keyPath, multiEntry) {
  return evaluateKeyPathOnValueToDecodedValue(value, keyPath);
}

/**
* May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
*    or `{invalid: true}` (e.g., `NaN`).
* @param {Value} value
* @param {KeyPath} keyPath
* @param {boolean} [multiEntry]
* @param {boolean} [fullKeys]
* @returns {KeyValueObject|KeyPathEvaluateValue}
* @todo Document other possible return?
*/
function extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, fullKeys) {
  const r = evaluateKeyPathOnValueToDecodedValue(value, keyPath);
  if (r.failure) {
    return r;
  }
  if (!multiEntry) {
    return convertValueToKeyValueDecoded(r.value, null, false, fullKeys);
  }
  return convertValueToMultiEntryKeyDecoded(r.value, fullKeys);
}

/**
 * Unused?
 * @typedef {object} KeyPathEvaluateFailure
 * @property {boolean} failure
 */

/**
 * @typedef {KeyPathEvaluateValueValue[]} KeyPathEvaluateValueValueArray
 */

/**
 * @typedef {undefined|number|string|Date|object|KeyPathEvaluateValueValueArray} KeyPathEvaluateValueValue
 */

/**
 * @typedef {object} KeyPathEvaluateValue
 * @property {KeyPathEvaluateValueValue} [value]
 * @property {boolean} [failure]
 */

/**
 * Returns the value of an inline key based on a key path (wrapped in an
 *   object with key `value`) or `{failure: true}`
 * @param {Value} value
 * @param {KeyPath} keyPath
 * @param {boolean} [multiEntry]
 * @param {boolean} [fullKeys]
 * @returns {KeyPathEvaluateValue}
 */
function evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys) {
  if (Array.isArray(keyPath)) {
    /** @type {KeyPathEvaluateValueValueArray} */
    const result = [];
    return keyPath.some(item => {
      const key = evaluateKeyPathOnValueToDecodedValue(value, item);
      if (key.failure) {
        return true;
      }
      result.push(key.value);
      return false;
    }) ? {
      failure: true
    } : {
      value: result
    };
  }
  if (keyPath === '') {
    return {
      value
    };
  }
  const identifiers = keyPath.split('.');
  return identifiers.some(idntfr => {
    if (idntfr === 'length' && (typeof value === 'string' || Array.isArray(value))) {
      value = value.length;
    } else if (isBlob(value)) {
      switch (idntfr) {
        case 'size':
        case 'type':
          value = /** @type {Blob} */value[idntfr];
          break;
      }
    } else if (isFile(value)) {
      switch (idntfr) {
        case 'name':
        case 'lastModified':
          value = /** @type {File} */value[idntfr];
          break;
        case 'lastModifiedDate':
          value = new Date( /** @type {File} */value.lastModified);
          break;
      }
    } else if (!isObj(value) || !Object.hasOwn(value, idntfr)) {
      return true;
    } else {
      value = /** @type {{[key: string]: KeyPathEvaluateValueValue}} */value[idntfr];
      return value === undefined;
    }
    return false;
  }) ? {
    failure: true
  } : {
    value
  };
}

/**
 * Sets the inline key value.
 * @param {{[key: string]: AnyValue}} value
 * @param {Key} key
 * @param {string} keyPath
 * @returns {void}
 */
function injectKeyIntoValueUsingKeyPath(value, key, keyPath) {
  const identifiers = keyPath.split('.');
  const last = identifiers.pop();
  identifiers.forEach(identifier => {
    const hop = Object.hasOwn(value, identifier);
    if (!hop) {
      value[identifier] = {};
    }
    value = value[identifier];
  });
  value[( /** @type {string} */last)] = key; // key is already a `keyValue` in our processing so no need to convert
}

/**
 *
 * @param {Value} value
 * @param {string} keyPath
 * @see https://github.com/w3c/IndexedDB/pull/146
 * @returns {boolean}
 */
function checkKeyCouldBeInjectedIntoValue(value, keyPath) {
  const identifiers = keyPath.split('.');
  identifiers.pop();
  for (const identifier of identifiers) {
    if (!isObj(value)) {
      return false;
    }
    const hop = Object.hasOwn(value, identifier);
    if (!hop) {
      return true;
    }
    value = /** @type {{[key: string]: Value}} */value[identifier];
  }
  return isObj(value);
}

/**
 *
 * @param {Key} key
 * @param {import('./IDBKeyRange.js').IDBKeyRangeFull} range
 * @param {boolean} [checkCached]
 * @returns {boolean}
 */
function isKeyInRange(key, range, checkCached) {
  let lowerMatch = range.lower === undefined;
  let upperMatch = range.upper === undefined;
  const encodedKey = encode$1(key, true);
  const lower = checkCached ? range.__lowerCached : encode$1(range.lower, true);
  const upper = checkCached ? range.__upperCached : encode$1(range.upper, true);
  if (!lowerMatch && (range.lowerOpen && encodedKey !== null && lower !== null && encodedKey > lower || !range.lowerOpen && (!encodedKey && !lower || encodedKey !== null && lower !== null && encodedKey >= lower))) {
    lowerMatch = true;
  }
  if (!upperMatch && (range.upperOpen && encodedKey !== null && upper !== null && encodedKey < upper || !range.upperOpen && (!encodedKey && !upper || encodedKey !== null && upper !== null && encodedKey <= upper))) {
    upperMatch = true;
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
  const keyType = encodedCharToKeyType[encodedKey.slice(0, 1)];
  if (keyType === 'array') {
    return encodedKey.indexOf(encodedEntry) > 1;
  }
  return encodedKey === encodedEntry;
}

/**
 *
 * @param {Key} keyEntry
 * @param {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined} range
 * @returns {Key[]}
 */
function findMultiEntryMatches(keyEntry, range) {
  const matches = [];
  if (Array.isArray(keyEntry)) {
    for (let key of keyEntry) {
      if (Array.isArray(key)) {
        if (range && range.lower === range.upper) {
          continue;
        }
        if (key.length === 1) {
          key = key[0];
        } else {
          const nested = findMultiEntryMatches(key, range);
          if (nested.length > 0) {
            matches.push(key);
          }
          continue;
        }
      }
      if (isNullish(range) || isKeyInRange(key, range, true)) {
        matches.push(key);
      }
    }
  } else if (isNullish(range) || isKeyInRange(keyEntry, range, true)) {
    matches.push(keyEntry);
  }
  return matches;
}

/**
* Not currently in use but keeping for spec parity.
* @param {Key} key
* @throws {Error} Upon a "bad key"
* @returns {ValueType}
*/
function convertKeyToValue(key) {
  const {
    type,
    value
  } = key;
  switch (type) {
    case 'number':
    case 'string':
      {
        return value;
      }
    case 'array':
      {
        const array = [];
        const len = value.length;
        let index = 0;
        while (index < len) {
          const entry = convertKeyToValue(value[index]);
          array[index] = entry;
          index++;
        }
        return array;
      }
    case 'date':
      {
        return new Date(value);
      }
    case 'binary':
      {
        const len = value.length;
        const buffer = new ArrayBuffer(len);
        // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
        const uint8 = new Uint8Array(buffer, value.byteOffset || 0, value.byteLength);
        uint8.set(value);
        return buffer;
      }
    case 'invalid':
    default:
      throw new Error('Bad key');
  }
}

/**
 *
 * @param {Key} key
 * @param {boolean} [inArray]
 * @returns {string|null}
 */
function encode$1(key, inArray) {
  // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
  if (key === undefined) {
    return null;
  }
  // array, date, number, string, binary (should already have detected "invalid")
  // @ts-expect-error Argument may be ignored
  return types$2[getKeyType(key)].encode(key, inArray);
}

/**
 *
 * @param {Key} key
 * @param {boolean} [inArray]
 * @throws {Error} Invalid number
 * @returns {undefined|ValueType}
 */
function decode$1(key, inArray) {
  if (typeof key !== 'string') {
    return undefined;
  }
  return types$2[encodedCharToKeyType[key.slice(0, 1)]].decode(key, inArray);
}

/**
 *
 * @param {Key} key
 * @param {boolean} [inArray]
 * @returns {undefined|ValueType}
 */
function roundTrip(key, inArray) {
  return decode$1(encode$1(key, inArray), inArray);
}
const MAX_ALLOWED_CURRENT_NUMBER = 9007199254740992; // 2 ^ 53 (Also equal to `Number.MAX_SAFE_INTEGER + 1`)

/**
 * @typedef {number} Integer
 */

/**
 * @callback CurrentNumberCallback
 * @param {Integer} cn The current number
 * @returns {void}
 */

/**
* @callback SQLFailureCallback
* @param {DOMException|Error} exception
* @returns {void}
*/

/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {CurrentNumberCallback} func
 * @param {SQLFailureCallback} sqlFailCb
 * @returns {void}
 */
function getCurrentNumber(tx, store, func, sqlFailCb) {
  tx.executeSql('SELECT "currNum" FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function (tx, data) {
    if (data.rows.length !== 1) {
      func(1);
    } else {
      func(data.rows.item(0).currNum);
    }
  }, function (tx, error) {
    sqlFailCb(createDOMException('DataError', 'Could not get the auto increment value for key', error));
    return false;
  });
}

/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {Integer} num
 * @param {CurrentNumberCallback} successCb
 * @param {SQLFailureCallback} failCb
 * @returns {void}
 */
function assignCurrentNumber(tx, store, num, successCb, failCb) {
  const sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
  const sqlValues = [num, escapeSQLiteStatement(store.__currentName)];
  if (CFG.DEBUG) {
    console.log(sql, sqlValues);
  }
  tx.executeSql(sql, sqlValues, function () {
    successCb(num);
  }, function (tx, err) {
    failCb(createDOMException('UnknownError', 'Could not set the auto increment value for key', err));
    return false;
  });
}

/**
 * Bump up the auto-inc counter if the key path-resolved value is valid
 *   (greater than old value and >=1) OR if a manually passed in key is
 *   valid (numeric and >= 1) and >= any primaryKey.
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {Integer} num
 * @param {CurrentNumberCallback} successCb
 * @param {SQLFailureCallback} failCb
 * @returns {void}
 */
function setCurrentNumber(tx, store, num, successCb, failCb) {
  num = num === MAX_ALLOWED_CURRENT_NUMBER ? num + 2 // Since incrementing by one will have no effect in JavaScript on this unsafe max, we represent the max as a number incremented by two. The getting of the current number is never returned to the user and is only used in safe comparisons, so it is safe for us to represent it in this manner
  : num + 1;
  return assignCurrentNumber(tx, store, num, successCb, failCb);
}

/**
 * @callback KeyForStoreCallback
 * @param {"failure"|null} arg1
 * @param {Integer} [arg2]
 * @param {Integer} [arg3]
 * @returns {void}
 */

/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {KeyForStoreCallback} cb
 * @param {SQLFailureCallback} sqlFailCb
 * @returns {void}
 */
function generateKeyForStore(tx, store, cb, sqlFailCb) {
  getCurrentNumber(tx, store, function (key) {
    if (key > MAX_ALLOWED_CURRENT_NUMBER) {
      // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
      cb('failure'); // eslint-disable-line n/no-callback-literal
      return;
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
/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {import('./Key.js').Key} key
 * @param {(num?: Integer) => void} successCb
 * @param {SQLFailureCallback} sqlFailCb
 * @returns {void}
 */
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
      const value = Math.floor(Math.min(key, MAX_ALLOWED_CURRENT_NUMBER));
      const useNewKeyForAutoInc = value >= cn;
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

var Key = /*#__PURE__*/Object.freeze({
  __proto__: null,
  assignCurrentNumber: assignCurrentNumber,
  checkKeyCouldBeInjectedIntoValue: checkKeyCouldBeInjectedIntoValue,
  convertKeyToValue: convertKeyToValue,
  convertValueToKey: convertValueToKey,
  convertValueToKeyRethrowingAndIfInvalid: convertValueToKeyRethrowingAndIfInvalid,
  convertValueToKeyValueDecoded: convertValueToKeyValueDecoded,
  convertValueToMultiEntryKey: convertValueToMultiEntryKey,
  convertValueToMultiEntryKeyDecoded: convertValueToMultiEntryKeyDecoded,
  decode: decode$1,
  encode: encode$1,
  evaluateKeyPathOnValue: evaluateKeyPathOnValue,
  extractKeyFromValueUsingKeyPath: extractKeyFromValueUsingKeyPath,
  extractKeyValueDecodedFromValueUsingKeyPath: extractKeyValueDecodedFromValueUsingKeyPath,
  findMultiEntryMatches: findMultiEntryMatches,
  generateKeyForStore: generateKeyForStore,
  injectKeyIntoValueUsingKeyPath: injectKeyIntoValueUsingKeyPath,
  isKeyInRange: isKeyInRange,
  isMultiEntryMatch: isMultiEntryMatch,
  possiblyUpdateKeyGenerator: possiblyUpdateKeyGenerator,
  roundTrip: roundTrip
});

const readonlyProperties$4 = /** @type {const} */['lower', 'upper', 'lowerOpen', 'upperOpen'];

/**
 * @typedef {globalThis.IDBKeyRange & {
*   __lowerCached: string|null|false,
*   __upperCached: string|null|false,
*   __lowerOpen: boolean,
* }} IDBKeyRangeFull
*/

/**
 * The IndexedDB KeyRange object.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#dfn-key-range
 * @throws {TypeError}
 * @class
 */
function IDBKeyRange() {
  this.__lowerOpen = false;
  this.__upperOpen = false;
  throw new TypeError('Illegal constructor');
}
const IDBKeyRangeAlias = IDBKeyRange;

/**
 * @param {import('./Key.js').Key|null} lower
 * @param {import('./Key.js').Key|null} upper
 * @param {boolean} lowerOpen
 * @param {boolean} upperOpen
 * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull}
 */
IDBKeyRange.__createInstance = function (lower, upper, lowerOpen, upperOpen) {
  /**
   * @class
   */
  function IDBKeyRange() {
    this[Symbol.toStringTag] = 'IDBKeyRange';
    if (lower === undefined && upper === undefined) {
      throw createDOMException('DataError', 'Both arguments to the key range method cannot be undefined');
    }
    let lowerConverted, upperConverted;
    if (lower !== undefined) {
      lowerConverted = roundTrip(lower); // Todo: does this make the "conversions" redundant
      convertValueToKeyRethrowingAndIfInvalid(lower);
    }
    if (upper !== undefined) {
      upperConverted = roundTrip(upper); // Todo: does this make the "conversions" redundant
      convertValueToKeyRethrowingAndIfInvalid(upper);
    }
    if (lower !== undefined && upper !== undefined && lower !== upper) {
      if ( /** @type {string} */encode$1(lower) > ( /** @type {string} */encode$1(upper))) {
        throw createDOMException('DataError', '`lower` must not be greater than `upper` argument in `bound()` call.');
      }
    }
    this.__lower = lowerConverted;
    this.__upper = upperConverted;
    this.__lowerOpen = Boolean(lowerOpen);
    this.__upperOpen = Boolean(upperOpen);
  }
  IDBKeyRange.prototype = IDBKeyRangeAlias.prototype;

  // @ts-expect-error Properties added by `defineProperty/ies`
  return new IDBKeyRange();
};

/**
 * @param {import('./Key.js').Key} key
 * @this {IDBKeyRangeFull}
 * @returns {boolean}
 */
IDBKeyRange.prototype.includes = function (key) {
  // We can't do a regular instanceof check as it will create a loop given our hasInstance implementation
  if (!isObj(this) || typeof this.__lowerOpen !== 'boolean') {
    throw new TypeError('Illegal invocation');
  }
  if (!arguments.length) {
    throw new TypeError('IDBKeyRange.includes requires a key argument');
  }
  convertValueToKeyRethrowingAndIfInvalid(key);
  return isKeyInRange(key, this);
};

/**
 * @param {import('./Key.js').Value} value
 * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull}
 */
IDBKeyRange.only = function (value) {
  if (!arguments.length) {
    throw new TypeError('IDBKeyRange.only requires a value argument');
  }
  return IDBKeyRange.__createInstance(value, value, false, false);
};

/**
 * @param {import('./Key.js').Value} value
 * @returns {globalThis.IDBKeyRange}
 */
IDBKeyRange.lowerBound = function (value /* , open */) {
  if (!arguments.length) {
    throw new TypeError('IDBKeyRange.lowerBound requires a value argument');
  }
  // eslint-disable-next-line prefer-rest-params
  return IDBKeyRange.__createInstance(value, undefined, arguments[1], true);
};

/**
 * @param {import('./Key.js').Value} value
 * @returns {globalThis.IDBKeyRange}
 */
IDBKeyRange.upperBound = function (value /* , open */) {
  if (!arguments.length) {
    throw new TypeError('IDBKeyRange.upperBound requires a value argument');
  }
  // eslint-disable-next-line prefer-rest-params
  return IDBKeyRange.__createInstance(undefined, value, true, arguments[1]);
};

/**
 * @param {import('./Key.js').Value} lower
 * @param {import('./Key.js').Value} upper
 * @returns {globalThis.IDBKeyRange}
 */
IDBKeyRange.bound = function (lower, upper /* , lowerOpen, upperOpen */) {
  if (arguments.length <= 1) {
    throw new TypeError('IDBKeyRange.bound requires lower and upper arguments');
  }
  // eslint-disable-next-line prefer-rest-params
  return IDBKeyRange.__createInstance(lower, upper, arguments[2], arguments[3]);
};
IDBKeyRange.prototype[Symbol.toStringTag] = 'IDBKeyRangePrototype';
readonlyProperties$4.forEach(prop => {
  Object.defineProperty(IDBKeyRange.prototype, '__' + prop, {
    enumerable: false,
    configurable: false,
    writable: true
  });
  // Ensure for proper interface testing that "get <name>" is the function name
  const o = {
    /**
     * @returns {import('./Key.js').Key|null|boolean}
     */
    get [prop]() {
      // We can't do a regular instanceof check as it will create a loop given our hasInstance implementation
      if (!isObj(this) || typeof this.__lowerOpen !== 'boolean') {
        throw new TypeError('Illegal invocation');
      }
      return this['__' + prop];
    }
  };
  const desc = /** @type {PropertyDescriptor} */
  Object.getOwnPropertyDescriptor(o, prop);
  // desc.enumerable = true; // Default
  // desc.configurable = true; // Default
  Object.defineProperty(IDBKeyRange.prototype, prop, desc);
});
Object.defineProperty(IDBKeyRange, Symbol.hasInstance, {
  value:
  /**
   * @param {object} obj
   * @returns {boolean}
   */
  obj => isObj(obj) && 'upper' in obj && 'lowerOpen' in obj && typeof obj.lowerOpen === 'boolean'
});
Object.defineProperty(IDBKeyRange, 'prototype', {
  writable: false
});

/**
 * @param {IDBKeyRangeFull|undefined} range
 * @param {string} quotedKeyColumnName
 * @param {string[]} sql
 * @param {string[]} sqlValues
 * @param {boolean} [addAnd]
 * @param {boolean} [checkCached]
 * @returns {void}
 */
function setSQLForKeyRange(range, quotedKeyColumnName, sql, sqlValues, addAnd, checkCached) {
  if (range && (range.lower !== undefined || range.upper !== undefined)) {
    if (addAnd) {
      sql.push('AND');
    }
    let encodedLowerKey, encodedUpperKey;
    const hasLower = range.lower !== undefined;
    const hasUpper = range.upper !== undefined;
    if (hasLower) {
      encodedLowerKey = checkCached ? range.__lowerCached : encode$1(range.lower);
    }
    if (hasUpper) {
      encodedUpperKey = checkCached ? range.__upperCached : encode$1(range.upper);
    }
    if (hasLower) {
      sqlValues.push(escapeSQLiteStatement( /** @type {string} */encodedLowerKey));
      if (hasUpper && encodedLowerKey === encodedUpperKey && !range.lowerOpen && !range.upperOpen) {
        sql.push(quotedKeyColumnName, '=', '?');
        return;
      }
      sql.push(quotedKeyColumnName, range.lowerOpen ? '>' : '>=', '?');
    }
    if (hasLower && hasUpper) {
      sql.push('AND');
    }
    if (hasUpper) {
      sql.push(quotedKeyColumnName, range.upperOpen ? '<' : '<=', '?');
      sqlValues.push(escapeSQLiteStatement( /** @type {string} */encodedUpperKey));
    }
  }
}

/**
 * @param {import('./Key.js').Value} value
 * @param {boolean} [nullDisallowed]
 * @throws {DOMException}
 * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined}
 */
function convertValueToKeyRange(value, nullDisallowed) {
  if (instanceOf(value, IDBKeyRange)) {
    // We still need to validate IDBKeyRange-like objects (the above check is based on loose duck-typing)
    if (value.toString() !== '[object IDBKeyRange]') {
      return IDBKeyRange.__createInstance(value.lower, value.upper, value.lowerOpen, value.upperOpen);
    }
    return value;
  }
  if (isNullish(value)) {
    if (nullDisallowed) {
      throw createDOMException('DataError', 'No key or range was specified');
    }
    return undefined; // Represents unbounded
  }
  convertValueToKeyRethrowingAndIfInvalid(value);
  return IDBKeyRange.only(value);
}

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {{
 *   _items: string[],
 *   _length: Integer,
 *   [key: number]: string,
 *   addIndexes: () => void,
 *   sortList: () => string[],
 *   push: (item: string) => void,
 *   clone: () => DOMStringListFull,
 *   contains: (str: string) => boolean,
 *   indexOf: (str: string) => Integer,
 *   splice: (index: Integer, howmany: Integer, ...args: any) => void
 *   length: Integer
 * }} DOMStringListFull
 */

let cleanInterface = false;
const testObject = {
  test: true
};
// Test whether Object.defineProperty really works.
if (Object.defineProperty) {
  try {
    Object.defineProperty(testObject, 'test', {
      enumerable: false
    });
    if (testObject.test) {
      cleanInterface = true;
    }
  } catch (e) {
    // Object.defineProperty does not work as intended.
  }
}

/**
 * Shim the DOMStringList object.
 * @throws {TypeError}
 * @class
 */
const DOMStringList = function () {
  /** @type {string[]} */
  this._items = [];
  /** @type {Integer} */
  this._length = 0;
  throw new TypeError('Illegal constructor');
};

// @ts-expect-error It's ok
DOMStringList.prototype = {
  constructor: DOMStringList,
  // Interface.

  /**
   * @param {string} str
   * @returns {boolean}
   */
  contains(str) {
    if (!arguments.length) {
      throw new TypeError('DOMStringList.contains must be supplied a value');
    }
    return this._items.includes(str);
  },
  /**
   * @param {number} key
   * @returns {string|null}
   */
  item(key) {
    if (!arguments.length) {
      throw new TypeError('DOMStringList.item must be supplied a value');
    }
    if (key < 0 || key >= this.length || !Number.isInteger(key)) {
      return null;
    }
    return this._items[key];
  },
  // Helpers. Should only be used internally.
  /**
   * @returns {DOMStringListFull}
   */
  clone() {
    const stringList = DOMStringList.__createInstance();
    stringList._items = this._items.slice();
    stringList._length = this.length;
    stringList.addIndexes();
    return stringList;
  },
  /**
   * @this {DOMStringListFull}
   * @returns {void}
   */
  addIndexes() {
    for (let i = 0; i < this._items.length; i++) {
      this[i] = this._items[i];
    }
  },
  /**
   * @this {DOMStringListFull}
   * @returns {string[]}
   */
  sortList() {
    // http://w3c.github.io/IndexedDB/#sorted-list
    // https://tc39.github.io/ecma262/#sec-abstract-relational-comparison
    this._items.sort();
    this.addIndexes();
    return this._items;
  },
  /**
   * @param {(value: string, i: Integer, arr: string[]) => void} cb
   * @param {object} thisArg
   * @returns {void}
   */
  forEach(cb, thisArg) {
    // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
    this._items.forEach(cb, thisArg);
  },
  /**
   * @param {(value: string, i: Integer, arr: string[]) => any[]} cb
   * @param {object} thisArg
   * @returns {any[]}
   */
  map(cb, thisArg) {
    // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
    return this._items.map(cb, thisArg);
  },
  /**
   * @param {string} str
   * @returns {Integer}
   */
  indexOf(str) {
    return this._items.indexOf(str);
  },
  /**
   * @param {string} item
   * @this {DOMStringListFull}
   * @returns {void}
   */
  push(item) {
    this._items.push(item);
    this._length++;
    this.sortList();
  },
  /**
   * @typedef {any} AnyArgs
   */
  /**
   * @param {[index: Integer, howmany: Integer, ...args: any]} args
   * @this {DOMStringListFull}
   * @returns {void}
   */
  splice(...args /* index, howmany, item1, ..., itemX */) {
    this._items.splice(...args);
    this._length = this._items.length;
    for (const i in this) {
      if (i === String(Number.parseInt(i))) {
        delete this[i];
      }
    }
    this.sortList();
  },
  [Symbol.toStringTag]: 'DOMStringListPrototype',
  // At least because `DOMStringList`, as a [list](https://infra.spec.whatwg.org/#list)
  //    can be converted to a sequence per https://infra.spec.whatwg.org/#list-iterate
  //    and particularly as some methods, e.g., `IDBDatabase.transaction`
  //    expect such sequence<DOMString> (or DOMString), we need an iterator (some of
  //    the Mocha tests rely on these)
  *[Symbol.iterator]() {
    let i = 0;
    while (i < this._items.length) {
      yield this._items[i++];
    }
  }
};

/**
 * @typedef {any} AnyValue
 */
Object.defineProperty(DOMStringList, Symbol.hasInstance, {
  /**
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  value(obj) {
    return Object.prototype.toString.call(obj) === 'DOMStringListPrototype';
  }
});
const DOMStringListAlias = DOMStringList;
Object.defineProperty(DOMStringList, '__createInstance', {
  /**
   * @returns {DOMStringListFull}
   */
  value() {
    /**
     * @class
     * @this {DOMStringList}
     */
    const DOMStringList = function DOMStringList() {
      this.toString = function () {
        return '[object DOMStringList]';
      };
      // Internal functions on the prototype have been made non-enumerable below.
      Object.defineProperty(this, 'length', {
        enumerable: true,
        get() {
          return this._length;
        }
      });
      this._items = /** @type {string[]} */[];
      this._length = 0;
    };
    DOMStringList.prototype = DOMStringListAlias.prototype;
    return /** @type {DOMStringListFull} */new DOMStringList();
  }
});
if (cleanInterface) {
  Object.defineProperty(DOMStringList, 'prototype', {
    writable: false
  });
  const nonenumerableReadonly = ['addIndexes', 'sortList', 'forEach', 'map', 'indexOf', 'push', 'splice', 'constructor', '__createInstance'];
  nonenumerableReadonly.forEach(nonenumerableReadonly => {
    Object.defineProperty(DOMStringList.prototype, nonenumerableReadonly, {
      enumerable: false
    });
  });

  // Illegal invocations
  // @ts-expect-error No return value
  Object.defineProperty(DOMStringList.prototype, 'length', {
    configurable: true,
    enumerable: true,
    get() {
      throw new TypeError('Illegal invocation');
    }
  });
  const nonenumerableWritable = ['_items', '_length'];
  nonenumerableWritable.forEach(nonenumerableWritable => {
    Object.defineProperty(DOMStringList.prototype, nonenumerableWritable, {
      enumerable: false,
      writable: true
    });
  });
}

let uniqueID = 0;
const listeners$1 = ['onabort', 'oncomplete', 'onerror'];
const readonlyProperties$3 = ['objectStoreNames', 'mode', 'db', 'error'];

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {{
 *   op: SQLCallback,
 *   args: ObjectArray,
 *   req: import('./IDBRequest.js').IDBRequestFull|null
 * }} RequestInfo
 */

/**
 * @typedef {EventTarget & {
 *   mode: "readonly"|"readwrite"|"versionchange",
 *   db: import('./IDBDatabase.js').IDBDatabaseFull,
 *   on__abort: () => void,
 *   on__complete: () => void,
 *   on__beforecomplete: (ev: Event & {
 *     complete: () => void
 *   }) => void,
 *   on__preabort: () => void,
 *   __abortTransaction: (err: Error|DOMException|null) => void,
 *   __executeRequests: () => void,
 *   __tx: SQLTransaction,
 *   __id: Integer,
 *   __active: boolean,
 *   __running: boolean,
 *   __errored: boolean,
 *   __requests: RequestInfo[],
 *   __db: import('./IDBDatabase.js').IDBDatabaseFull,
 *   __mode: string,
 *   __error: null|DOMException|Error,
 *   __objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
 *   __storeHandles: {
 *     [key: string]: import('./IDBObjectStore.js').IDBObjectStoreFull
 *   },
 *   __requestsFinished: boolean,
 *   __transFinishedCb: (err: boolean, cb: ((bool?: boolean) => void)) => void,
 *   __transactionEndCallback: () => void,
 *   __transactionFinished: boolean,
 *   __completed: boolean,
 *   __internal: boolean,
 *   __abortFinished: boolean,
 *   __createRequest: (
 *     source: import('./IDBDatabase.js').IDBDatabaseFull|
 *       import('./IDBObjectStore.js').IDBObjectStoreFull|
 *       import('./IDBIndex.js').IDBIndexFull|
 *       import('./IDBCursor.js').IDBCursorFull
 *   ) => import('./IDBRequest.js').IDBRequestFull,
 *   __pushToQueue: (
 *     request: import('./IDBRequest.js').IDBRequestFull|null,
 *     callback: SQLCallback,
 *     args?: ObjectArray
 *   ) => void,
 *   __assertActive: () => void,
 *   __addNonRequestToTransactionQueue: (
 *     callback: SQLCallback,
 *     args?: ObjectArray
 *   ) => void
 *   __addToTransactionQueue: (
 *     callback: SQLCallback,
 *     args: ObjectArray|undefined,
 *     source: import('./IDBDatabase.js').IDBDatabaseFull|
 *       import('./IDBObjectStore.js').IDBObjectStoreFull|
 *       import('./IDBIndex.js').IDBIndexFull|
 *       import('./IDBCursor.js').IDBCursorFull
 *   ) => import('./IDBRequest.js').IDBRequestFull
 *   __assertWritable: () => void,
 * }} IDBTransactionFull
 */

/**
 * The IndexedDB Transaction.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBTransaction
 * @class
 */
function IDBTransaction() {
  throw new TypeError('Illegal constructor');
}
const IDBTransactionAlias = IDBTransaction;
/**
 * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
 * @param {import('./DOMStringList.js').DOMStringListFull} storeNames
 * @param {string} mode
 * @returns {IDBTransactionFull}
 */
IDBTransaction.__createInstance = function (db, storeNames, mode) {
  /**
   * @class
   * @this {IDBTransactionFull}
   */
  function IDBTransaction() {
    const me = this;
    // @ts-expect-error It's ok
    me[Symbol.toStringTag] = 'IDBTransaction';
    defineReadonlyProperties(me, readonlyProperties$3);
    me.__id = ++uniqueID; // for debugging simultaneous transactions
    me.__active = true;
    me.__running = false;
    me.__errored = false;
    me.__requests = [];
    me.__objectStoreNames = storeNames;
    me.__mode = mode;
    me.__db = db;
    me.__error = null;
    // @ts-expect-error Part of `ShimEventTarget`
    me.__setOptions({
      legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
    });
    readonlyProperties$3.forEach(readonlyProp => {
      Object.defineProperty(this, readonlyProp, {
        configurable: true
      });
    });
    defineListenerProperties(this, listeners$1);
    me.__storeHandles = {};

    // Kick off the transaction as soon as all synchronous code is done
    setTimeout(() => {
      me.__executeRequests();
    }, 0);
  }
  IDBTransaction.prototype = IDBTransactionAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBTransaction();
};

// @ts-expect-error It's ok
IDBTransaction.prototype = EventTargetFactory.createInstance({
  // eslint-disable-next-line n/no-sync -- API
  defaultSync: true,
  // Ensure EventTarget preserves our properties
  extraProperties: ['complete']
});

/**
 *
 * @param {boolean} err
 * @param {(bool: boolean) => void} cb
 * @returns {void}
 */
IDBTransaction.prototype.__transFinishedCb = function (err, cb) {
  cb(Boolean(err));
};
/**
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.__executeRequests = function () {
  const me = this;
  if (me.__running) {
    if (CFG.DEBUG) {
      console.log('Looks like the request set is already running', me.mode);
    }
    return;
  }
  me.__running = true;
  me.db.__db[me.mode === 'readonly' ? 'readTransaction' : 'transaction'](
  // `readTransaction` is optimized, at least in `node-websql`
  function executeRequests(tx) {
    me.__tx = tx;
    /** @type {RequestInfo} */
    let q,
      i = -1;

    /**
     * @typedef {any} IDBRequestResult
     */

    /**
     * @param {IDBRequestResult} [result]
     * @param {import('./IDBRequest.js').IDBRequestFull} [req]
     * @returns {void}
     */
    function success(result, req) {
      if (me.__errored || me.__requestsFinished) {
        // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
        return;
      }
      if (req) {
        q.req = req; // Need to do this in case of cursors
      }
      if (!q.req) {
        // TS guard
        return;
      }
      if (q.req.__done) {
        // Avoid continuing with aborted requests
        return;
      }
      q.req.__done = true;
      q.req.__result = result;
      q.req.__error = null;
      me.__active = true;
      const e = createEvent('success');
      q.req.dispatchEvent(e);
      // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87
      if (e.__legacyOutputDidListenersThrowError) {
        logError('Error', 'An error occurred in a success handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
        // me.__active = false;
        me.__abortTransaction(createDOMException('AbortError', 'A request was aborted (in user handler after success).'));
        return;
      }
      executeNextRequest();
    }

    /**
     * @param {[tx: SQLTransaction|DOMException|Error|SQLError, err?: SQLError]} args
     * @returns {void}
     */
    function error(...args /* tx, err */) {
      if (me.__errored || me.__requestsFinished) {
        // We've already called "onerror", "onabort", or thrown within
        //  the transaction, so don't do it again.
        return;
      }
      if (q.req && q.req.__done) {
        // Avoid continuing with aborted requests
        return;
      }
      const err = /** @type {Error|DOMException} */findError(args);
      if (!q.req) {
        me.__abortTransaction(err);
        return;
      }

      // Fire an error event for the current IDBRequest
      q.req.__done = true;
      q.req.__error = err;
      q.req.__result = undefined; // Must be undefined if an error per `result` getter
      q.req.addLateEventListener('error', function (e) {
        if (e.cancelable && e.defaultPrevented && !e.__legacyOutputDidListenersThrowError) {
          executeNextRequest();
        }
      });
      q.req.addDefaultEventListener('error', function () {
        if (!q.req) {
          // TS guard
          return;
        }
        me.__abortTransaction(q.req.__error);
      });
      me.__active = true;
      const e = createEvent('error', err, {
        bubbles: true,
        cancelable: true
      });
      q.req.dispatchEvent(e);
      // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87
      if (e.__legacyOutputDidListenersThrowError) {
        logError('Error', 'An error occurred in an error handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
        e.preventDefault(); // Prevent 'error' default as steps indicate we should abort with `AbortError` even without cancellation
        me.__abortTransaction(createDOMException('AbortError', 'A request was aborted (in user handler after error).'));
      }
    }

    /**
     * @returns {void}
     */
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
          if (q.req.__done) {
            // Avoid continuing with aborted requests
            return;
          }
          q.op(tx, q.args, success, error, executeNextRequest);
        } catch (e) {
          error( /** @type {Error} */e);
        }
      }
    }
    executeNextRequest();
  }, function webSQLError(webSQLErr) {
    // @ts-expect-error It's ok
    if (webSQLErr === true) {
      // Not a genuine SQL error
      return;
    }
    const err = webSQLErrback( /** @type {SQLError} */webSQLErr);
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

  /**
   * @returns {void}
   */
  function requestsFinished() {
    me.__active = false;
    me.__requestsFinished = true;

    /**
     * @throws {Error}
     * @returns {void}
     */
    function complete() {
      me.__completed = true;
      if (CFG.DEBUG) {
        console.log('Transaction completed');
      }
      const evt = createEvent('complete');
      try {
        me.__internal = true;
        me.dispatchEvent(evt);
        me.__internal = false;
        me.dispatchEvent(createEvent('__complete'));
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
    const ev = /** @type {Event & {complete: () => void}} */
    createEvent('__beforecomplete');
    ev.complete = complete;
    me.dispatchEvent(ev);
  }
};

/**
 * Creates a new IDBRequest for the transaction.
 * NOTE: The transaction is not queued until you call {@link IDBTransaction#__pushToQueue}.
 * @param {import('./IDBDatabase.js').IDBDatabaseFull} source
 * @this {IDBTransactionFull}
 * @returns {IDBRequest}
 */
IDBTransaction.prototype.__createRequest = function (source) {
  const me = this;
  const request = IDBRequest.__createInstance();
  request.__source = source !== undefined ? source : me.db;
  request.__transaction = me;
  return request;
};

/**
 * @typedef {(
 *   tx: SQLTransaction,
 *   args: ObjectArray,
 *   success: (result?: any, req?: import('./IDBRequest.js').IDBRequestFull) => void,
 *   error: (tx: SQLTransaction|Error|DOMException|SQLError, err?: SQLError) => void,
 *   executeNextRequest?: () => void
 * ) => void} SQLCallback
 */

/**
 * Adds a callback function to the transaction queue.
 * @param {SQLCallback} callback
 * @param {ObjectArray} args
 * @param {import('./IDBDatabase.js').IDBDatabaseFull|
 *   import('./IDBObjectStore.js').IDBObjectStoreFull|
 *   import('./IDBIndex.js').IDBIndexFull} source
 * @this {IDBTransactionFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBTransaction.prototype.__addToTransactionQueue = function (callback, args, source) {
  const request = this.__createRequest(source);
  this.__pushToQueue(request, callback, args);
  return request;
};

/**
 * Adds a callback function to the transaction queue without generating a
 *   request.
 * @param {SQLCallback} callback
 * @param {ObjectArray} args
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.__addNonRequestToTransactionQueue = function (callback, args) {
  this.__pushToQueue(null, callback, args);
};

/**
 * Adds an IDBRequest to the transaction queue.
 * @param {import('./IDBRequest.js').IDBRequestFull|null} request
 * @param {SQLCallback} callback
 * @param {ObjectArray} args
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.__pushToQueue = function (request, callback, args) {
  this.__assertActive();
  this.__requests.push({
    op: callback,
    args,
    req: request
  });
};

/**
 * @throws {DOMException}
 * @returns {void}
 */
IDBTransaction.prototype.__assertActive = function () {
  if (!this.__active) {
    throw createDOMException('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
  }
};

/**
 * @throws {DOMException}
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.__assertWritable = function () {
  if (this.mode === 'readonly') {
    throw createDOMException('ReadOnlyError', 'The transaction is read only');
  }
};

/**
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.__assertVersionChange = function () {
  IDBTransaction.__assertVersionChange(this);
};

/**
 * Returns the specified object store.
 * @param {string} objectStoreName
 * @this {IDBTransactionFull}
 * @returns {IDBObjectStore}
 */
IDBTransaction.prototype.objectStore = function (objectStoreName) {
  const me = this;
  if (!(me instanceof IDBTransaction)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No object store name was specified');
  }
  IDBTransaction.__assertNotFinished(me);
  if (me.__objectStoreNames.indexOf(objectStoreName) === -1) {
    // eslint-disable-line unicorn/prefer-includes
    throw createDOMException('NotFoundError', objectStoreName + ' is not participating in this transaction');
  }
  const store = me.db.__objectStores[objectStoreName];
  if (!store) {
    throw createDOMException('NotFoundError', objectStoreName + ' does not exist in ' + me.db.name);
  }
  if (!me.__storeHandles[objectStoreName] ||
  // These latter conditions are to allow store
  //   recreation to create new clone object
  me.__storeHandles[objectStoreName].__pendingDelete || me.__storeHandles[objectStoreName].__deleted) {
    me.__storeHandles[objectStoreName] = IDBObjectStore.__clone(store, me);
  }
  return me.__storeHandles[objectStoreName];
};

/**
 *
 * @param {Error|DOMException|null} err
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.__abortTransaction = function (err) {
  const me = this;
  logError('Error', 'An error occurred in a transaction', err);
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
      // Store was already created so we restore to name before the rename
      if ('__pendingName' in store && me.db.__oldObjectStoreNames.indexOf(store.__pendingName) > -1 // eslint-disable-line unicorn/prefer-includes
      ) {
        store.__name = store.__originalName;
      }
      store.__indexNames = store.__oldIndexNames;
      delete store.__pendingDelete;
      Object.values(store.__indexes).concat(Object.values(store.__indexHandles)).forEach(function (index) {
        // Index was already created so we restore to name before the rename
        if ('__pendingName' in index && store.__oldIndexNames.indexOf(index.__pendingName) > -1 // eslint-disable-line unicorn/prefer-includes
        ) {
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
    setTimeout(() => {
      throw err;
    }, 0);
  }

  /**
   * @param {SQLTransaction|null} [tx]
   * @param {SQLResultSet|SQLError|{code: 0}} [errOrResult]
   * @returns {void}
   */
  function abort(tx, errOrResult) {
    if (!tx) {
      if (CFG.DEBUG) {
        console.log('Rollback not possible due to missing transaction', me);
      }
    } else if (errOrResult && 'code' in errOrResult && typeof errOrResult.code === 'number') {
      if (CFG.DEBUG) {
        console.log('Rollback erred; feature is probably not supported as per WebSQL', me);
      }
    } else if (CFG.DEBUG) {
      console.log('Rollback succeeded', me);
    }
    me.dispatchEvent(createEvent('__preabort'));
    me.__requests.filter(function (q, i, arr) {
      // eslint-disable-line promise/no-promise-in-callback
      return q.req && !q.req.__done && [i, -1].includes(arr.map(q => q.req).lastIndexOf(q.req));
    }).reduce(function (promises, q) {
      // We reduce to a chain of promises to be queued in order, so we cannot
      //  use `Promise.all`, and I'm unsure whether `setTimeout` currently
      //  behaves first-in-first-out with the same timeout so we could
      //  just use a `forEach`.
      return promises.then(function () {
        if (!q.req) {
          // TS guard
          throw new Error('Missing request');
        }
        q.req.__done = true;
        q.req.__result = undefined;
        q.req.__error = createDOMException('AbortError', 'A request was aborted (an unfinished request).');
        const reqEvt = createEvent('error', q.req.__error, {
          bubbles: true,
          cancelable: true
        });
        return new SyncPromise( /** @type {() => void} */
        resolve => {
          setTimeout(() => {
            if (!q.req) {
              // TS guard
              throw new Error('Missing request');
            }
            q.req.dispatchEvent(reqEvt); // No need to catch errors
            resolve();
          });
        });
      });
    }, SyncPromise.resolve(undefined)).then(function () {
      // Also works when there are no pending requests
      const evt = createEvent('abort', err, {
        bubbles: true,
        cancelable: false
      });
      setTimeout(() => {
        me.__abortFinished = true;
        me.dispatchEvent(evt);
        me.__storeHandles = {};
        me.dispatchEvent(createEvent('__abort'));
      });
      return undefined;
    }).catch(err => {
      console.log('Abort error');
      throw err;
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
        me.__tx.executeSql('ROLLBACK', [], abort, /** @type {SQLStatementErrorCallback} */abort); // Not working in some circumstances, even in Node
      } catch (err) {
        // Browser errs when transaction has ended and since it most likely already erred here,
        //   we call to abort
        abort();
      }
    } else {
      abort(null, {
        code: 0
      });
    }
  });
};

/**
 * @this {IDBTransactionFull}
 * @returns {void}
 */
IDBTransaction.prototype.abort = function () {
  const me = this;
  if (!(me instanceof IDBTransaction)) {
    throw new TypeError('Illegal invocation');
  }
  if (CFG.DEBUG) {
    console.log('The transaction was aborted', me);
  }
  IDBTransaction.__assertNotFinished(me);
  me.__abortTransaction(null);
};
IDBTransaction.prototype[Symbol.toStringTag] = 'IDBTransactionPrototype';

/**
 *
 * @param {IDBTransactionFull|undefined} tx
 * @returns {void}
 */
IDBTransaction.__assertVersionChange = function (tx) {
  if (!tx || tx.mode !== 'versionchange') {
    throw createDOMException('InvalidStateError', 'Not a version transaction');
  }
};
/**
 *
 * @param {IDBTransactionFull} tx
 * @throws {DOMException}
 * @returns {void}
 */
IDBTransaction.__assertNotVersionChange = function (tx) {
  if (tx && tx.mode === 'versionchange') {
    throw createDOMException('InvalidStateError', 'Cannot be called during a version transaction');
  }
};

/**
 *
 * @param {IDBTransactionFull|undefined} tx
 * @throws {DOMException}
 * @returns {void}
 */
IDBTransaction.__assertNotFinished = function (tx) {
  if (!tx || tx.__completed || tx.__abortFinished || tx.__errored) {
    throw createDOMException('InvalidStateError', 'Transaction finished by commit or abort');
  }
};

// object store methods behave differently: see https://github.com/w3c/IndexedDB/issues/192
/**
 *
 * @param {IDBTransactionFull} tx
 * @returns {void}
 */
IDBTransaction.__assertNotFinishedObjectStoreMethod = function (tx) {
  try {
    IDBTransaction.__assertNotFinished(tx);
  } catch (err) {
    if (tx && !tx.__completed && !tx.__abortFinished) {
      throw createDOMException('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
    }
    throw err;
  }
};

/**
 *
 * @param {IDBTransactionFull|undefined} tx
 * @throws {DOMException}
 * @returns {void}
 */
IDBTransaction.__assertActive = function (tx) {
  if (!tx || !tx.__active) {
    throw createDOMException('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
  }
};

/**
* Used by our `EventTarget.prototype` library to implement bubbling/capturing.
 * @this {IDBTransactionFull}
* @returns {import('./IDBDatabase.js').IDBDatabaseFull}
*/
IDBTransaction.prototype.__getParent = function () {
  return this.db;
};
defineOuterInterface(IDBTransaction.prototype, listeners$1);
defineReadonlyOuterInterface(IDBTransaction.prototype, readonlyProperties$3);
Object.defineProperty(IDBTransaction.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: IDBTransaction
});
Object.defineProperty(IDBTransaction, 'prototype', {
  writable: false
});

function ownKeys(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys(Object(r), !0).forEach(function (t) {
      _defineProperty(e, t, r[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
    });
  }
  return e;
}
function _typeof(e) {
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _typeof(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _toPropertyKey(n.key), n);
  }
}
function _createClass(e, t, r) {
  return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, t, r) {
  return (t = _toPropertyKey(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function _slicedToArray(e, t) {
  return function _arrayWithHoles(e) {
    if (Array.isArray(e)) return e;
  }(e) || function _iterableToArrayLimit(e, t) {
    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null != r) {
      var n,
        a,
        o,
        i,
        c = [],
        s = !0,
        u = !1;
      try {
        if (o = (r = r.call(e)).next, 0 === t) {
          if (Object(r) !== r) return;
          s = !1;
        } else for (; !(s = (n = o.call(r)).done) && (c.push(n.value), c.length !== t); s = !0);
      } catch (e) {
        u = !0, a = e;
      } finally {
        try {
          if (!s && null != r.return && (i = r.return(), Object(i) !== i)) return;
        } finally {
          if (u) throw a;
        }
      }
      return c;
    }
  }(e, t) || _unsupportedIterableToArray(e, t) || function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0;
  }
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _toPropertyKey(e) {
  var t = function _toPrimitive(e, t) {
    if ("object" != typeof e || null === e) return e;
    var r = e[Symbol.toPrimitive];
    if (void 0 !== r) {
      var n = r.call(e, t || "default");
      if ("object" != typeof n) return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(e);
  }(e, "string");
  return "symbol" == typeof t ? t : String(t);
}
var e = _createClass(function TypesonPromise(e) {
  _classCallCheck(this, TypesonPromise), this.p = new Promise(e);
});
e.__typeson__type__ = "TypesonPromise", "undefined" != typeof Symbol && Object.defineProperty(e.prototype, Symbol.toStringTag, {
  get: function get() {
    return "TypesonPromise";
  }
}), e.prototype.then = function (t, r) {
  var n = this;
  return new e(function (e, a) {
    n.p.then(function (r) {
      e(t ? t(r) : r);
    }).catch(function (e) {
      return r ? r(e) : Promise.reject(e);
    }).then(e, a);
  });
}, e.prototype.catch = function (e) {
  return this.then(function () {}, e);
}, e.resolve = function (t) {
  return new e(function (e) {
    e(t);
  });
}, e.reject = function (t) {
  return new e(function (e, r) {
    r(t);
  });
}, e.all = function (t) {
  return new e(function (e, r) {
    Promise.all(t.map(function (e) {
      return null != e && e.constructor && "__typeson__type__" in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e;
    })).then(e, r);
  });
}, e.race = function (t) {
  return new e(function (e, r) {
    Promise.race(t.map(function (e) {
      return null != e && e.constructor && "__typeson__type__" in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e;
    })).then(e, r);
  });
}, e.allSettled = function (t) {
  return new e(function (e, r) {
    Promise.allSettled(t.map(function (e) {
      return null != e && e.constructor && "__typeson__type__" in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e;
    })).then(e, r);
  });
};
var t = Object.hasOwn,
  r = Object.getPrototypeOf;
function isThenable(e, t) {
  return isObject(e) && "function" == typeof e.then && (!t || "function" == typeof e.catch);
}
function toStringTag(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function hasConstructorOf(e, n) {
  if (!e || "object" !== _typeof(e)) return !1;
  var a = r(e);
  if (!a) return null === n;
  var o = t(a, "constructor") && a.constructor;
  return "function" != typeof o ? null === n : n === o || null !== n && Function.prototype.toString.call(o) === Function.prototype.toString.call(n) || "function" == typeof n && "string" == typeof o.__typeson__type__ && o.__typeson__type__ === n.__typeson__type__;
}
function isPlainObject(e) {
  return !(!e || "Object" !== toStringTag(e)) && (!r(e) || hasConstructorOf(e, Object));
}
function isUserObject(e) {
  if (!e || "Object" !== toStringTag(e)) return !1;
  var t = r(e);
  return !t || hasConstructorOf(e, Object) || isUserObject(t);
}
function isObject(e) {
  return null !== e && "object" === _typeof(e);
}
function escapeKeyPathComponent(e) {
  return e.replaceAll("''", "''''").replace(/^$/, "''").replaceAll("~", "~0").replaceAll(".", "~1");
}
function unescapeKeyPathComponent(e) {
  return e.replaceAll("~1", ".").replaceAll("~0", "~").replace(/^''$/, "").replaceAll("''''", "''");
}
function getByKeyPath(e, t) {
  if ("" === t) return e;
  if (null === e || "object" !== _typeof(e)) throw new TypeError("Unexpected non-object type");
  var r = t.indexOf(".");
  if (r > -1) {
    var n = e[unescapeKeyPathComponent(t.slice(0, r))];
    return void 0 === n ? void 0 : getByKeyPath(n, t.slice(r + 1));
  }
  return e[unescapeKeyPathComponent(t)];
}
function setAtKeyPath(e, t, r) {
  if ("" === t) return r;
  if (!e || "object" !== _typeof(e)) throw new TypeError("Unexpected non-object type");
  var n = t.indexOf(".");
  return n > -1 ? setAtKeyPath(e[unescapeKeyPathComponent(t.slice(0, n))], t.slice(n + 1), r) : (e[unescapeKeyPathComponent(t)] = r, e);
}
function getJSONType(e) {
  return null === e ? "null" : Array.isArray(e) ? "array" : _typeof(e);
}
function _await(e, t, r) {
  return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var n = Object.keys,
  a = Object.hasOwn,
  o = Array.isArray,
  i$1 = ["type", "replaced", "iterateIn", "iterateUnsetNumeric", "addLength"];
function _async(e) {
  return function () {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    try {
      return Promise.resolve(e.apply(this, t));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function nestedPathsFirst(e, t) {
  var r, n;
  if ("" === e.keypath) return -1;
  var a = null !== (r = e.keypath.match(/\./g)) && void 0 !== r ? r : 0,
    o = null !== (n = t.keypath.match(/\./g)) && void 0 !== n ? n : 0;
  return a && (a = a.length), o && (o = o.length), a > o ? -1 : a < o ? 1 : e.keypath < t.keypath ? -1 : e.keypath > t.keypath ? 1 : 0;
}
var c = function () {
    function Typeson(e) {
      _classCallCheck(this, Typeson), this.options = e, this.plainObjectReplacers = [], this.nonplainObjectReplacers = [], this.revivers = {}, this.types = {};
    }
    return _createClass(Typeson, [{
      key: "stringify",
      value: function stringify(e, t, r, n) {
        n = _objectSpread2(_objectSpread2(_objectSpread2({}, this.options), n), {}, {
          stringification: !0
        });
        var a = this.encapsulate(e, null, n);
        return o(a) ? JSON.stringify(a[0], t, r) : a.then(function (e) {
          return JSON.stringify(e, t, r);
        });
      }
    }, {
      key: "stringifySync",
      value: function stringifySync(e, t, r, n) {
        return this.stringify(e, t, r, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, n), {}, {
          sync: !0
        }));
      }
    }, {
      key: "stringifyAsync",
      value: function stringifyAsync(e, t, r, n) {
        return this.stringify(e, t, r, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, n), {}, {
          sync: !1
        }));
      }
    }, {
      key: "parse",
      value: function parse(e, t, r) {
        return r = _objectSpread2(_objectSpread2(_objectSpread2({}, this.options), r), {}, {
          parse: !0
        }), this.revive(JSON.parse(e, t), r);
      }
    }, {
      key: "parseSync",
      value: function parseSync(e, t, r) {
        return this.parse(e, t, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, r), {}, {
          sync: !0
        }));
      }
    }, {
      key: "parseAsync",
      value: function parseAsync(e, t, r) {
        return this.parse(e, t, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, r), {}, {
          sync: !1
        }));
      }
    }, {
      key: "specialTypeNames",
      value: function specialTypeNames(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return r.returnTypeNames = !0, this.encapsulate(e, t, r);
      }
    }, {
      key: "rootTypeName",
      value: function rootTypeName(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return r.iterateNone = !0, this.encapsulate(e, t, r);
      }
    }, {
      key: "encapsulate",
      value: function encapsulate(t, r, c) {
        var s = this,
          u = _objectSpread2(_objectSpread2({
            sync: !0
          }, this.options), c),
          l = u.sync,
          f = {},
          y = [],
          p = [],
          d = [],
          v = !("cyclic" in u) || u.cyclic,
          b = u.encapsulateObserver,
          m = function finish(e) {
            var t = Object.values(f);
            if (u.iterateNone) return t.length ? t[0] : getJSONType(e);
            if (t.length) {
              if (u.returnTypeNames) return function _toConsumableArray(e) {
                return function _arrayWithoutHoles(e) {
                  if (Array.isArray(e)) return _arrayLikeToArray(e);
                }(e) || function _iterableToArray(e) {
                  if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
                }(e) || _unsupportedIterableToArray(e) || function _nonIterableSpread() {
                  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
              }(new Set(t));
              e && isPlainObject(e) && !a(e, "$types") ? e.$types = f : e = {
                $: e,
                $types: {
                  $: f
                }
              };
            } else isObject(e) && a(e, "$types") && (e = {
              $: e,
              $types: !0
            });
            return !u.returnTypeNames && e;
          },
          h = _async(function (t, r) {
            return _await(Promise.all(r.map(function (e) {
              return e[1].p;
            })), function (n) {
              return _await(Promise.all(n.map(_async(function (n) {
                var a = !1,
                  o = [],
                  i = _slicedToArray(r.splice(0, 1), 1),
                  c = _slicedToArray(i[0], 7),
                  s = c[0],
                  u = c[2],
                  l = c[3],
                  f = c[4],
                  y = c[5],
                  p = c[6],
                  d = O(s, n, u, l, o, !0, p),
                  v = hasConstructorOf(d, e);
                return function _invoke(e, t) {
                  var r = e();
                  return r && r.then ? r.then(t) : t(r);
                }(function () {
                  if (s && v) return _await(d.p, function (e) {
                    f[y] = e;
                    var r = h(t, o);
                    return a = !0, r;
                  });
                }, function (e) {
                  return a ? e : (s ? f[y] = d : t = v ? d.p : d, h(t, o));
                });
              }))), function () {
                return t;
              });
            });
          }),
          g = function _adaptBuiltinStateObjectProperties(e, t, r) {
            Object.assign(e, t);
            var n = i$1.map(function (t) {
              var r = e[t];
              return delete e[t], r;
            });
            r(), i$1.forEach(function (t, r) {
              e[t] = n[r];
            });
          },
          O = function _encapsulate(t, r, i, c, l, d, v) {
            var m,
              h = {},
              O = _typeof(r),
              w = b ? function (n) {
                var a,
                  o = null !== (a = null != v ? v : c.type) && void 0 !== a ? a : getJSONType(r);
                b(Object.assign(null != n ? n : h, {
                  keypath: t,
                  value: r,
                  cyclic: i,
                  stateObj: c,
                  promisesData: l,
                  resolvingTypesonPromise: d,
                  awaitingTypesonPromise: hasConstructorOf(r, e)
                }, {
                  type: o
                }));
              } : null;
            if (["string", "boolean", "number", "undefined"].includes(O)) return void 0 === r || Number.isNaN(r) || r === Number.NEGATIVE_INFINITY || r === Number.POSITIVE_INFINITY || 0 === r ? (m = c.replaced ? r : _(t, r, c, l, !1, d, w)) !== r && (h = {
              replaced: m
            }) : m = r, w && w(), m;
            if (null === r) return w && w(), r;
            if (i && !c.iterateIn && !c.iterateUnsetNumeric && r && "object" === _typeof(r)) {
              var A = y.indexOf(r);
              if (!(A < 0)) return f[t] = "#", w && w({
                cyclicKeypath: p[A]
              }), "#" + p[A];
              !0 === i && (y.push(r), p.push(t));
            }
            var S,
              j,
              T = isPlainObject(r),
              N = o(r),
              I = (T || N) && (!s.plainObjectReplacers.length || c.replaced) || c.iterateIn ? r : _(t, r, c, l, T || N, null, w);
            if (I !== r ? (m = I, h = {
              replaced: I
            }) : "" === t && hasConstructorOf(r, e) ? (l.push([t, r, i, c, void 0, void 0, c.type]), m = r) : N && "object" !== c.iterateIn || "array" === c.iterateIn ? (S = new Array(r.length), h = {
              clone: S
            }) : (["function", "symbol"].includes(_typeof(r)) || "toJSON" in r || hasConstructorOf(r, e) || hasConstructorOf(r, Promise) || hasConstructorOf(r, ArrayBuffer)) && !T && "object" !== c.iterateIn ? m = r : (S = {}, c.addLength && (S.length = r.length), h = {
              clone: S
            }), w && w(), u.iterateNone) return null !== (j = S) && void 0 !== j ? j : m;
            if (!S) return m;
            if (c.iterateIn) {
              var P = function _loop(n) {
                var o = {
                  ownKeys: a(r, n)
                };
                g(c, o, function () {
                  var a = t + (t ? "." : "") + escapeKeyPathComponent(n),
                    o = _encapsulate(a, r[n], Boolean(i), c, l, d);
                  hasConstructorOf(o, e) ? l.push([a, o, Boolean(i), c, S, n, c.type]) : void 0 !== o && (S[n] = o);
                });
              };
              for (var E in r) P(E);
              w && w({
                endIterateIn: !0,
                end: !0
              });
            } else n(r).forEach(function (n) {
              var a = t + (t ? "." : "") + escapeKeyPathComponent(n);
              g(c, {
                ownKeys: !0
              }, function () {
                var t = _encapsulate(a, r[n], Boolean(i), c, l, d);
                hasConstructorOf(t, e) ? l.push([a, t, Boolean(i), c, S, n, c.type]) : void 0 !== t && (S[n] = t);
              });
            }), w && w({
              endIterateOwn: !0,
              end: !0
            });
            if (c.iterateUnsetNumeric) {
              for (var x = r.length, C = function _loop2(n) {
                  if (!(n in r)) {
                    var a = "".concat(t).concat(t ? "." : "").concat(n);
                    g(c, {
                      ownKeys: !1
                    }, function () {
                      var t = _encapsulate(a, void 0, Boolean(i), c, l, d);
                      hasConstructorOf(t, e) ? l.push([a, t, Boolean(i), c, S, n, c.type]) : void 0 !== t && (S[n] = t);
                    });
                  }
                }, k = 0; k < x; k++) C(k);
              w && w({
                endIterateUnsetNumeric: !0,
                end: !0
              });
            }
            return S;
          },
          _ = function replace(e, t, r, n, a, o, i) {
            for (var c = a ? s.plainObjectReplacers : s.nonplainObjectReplacers, u = c.length; u--;) {
              var y = c[u];
              if (y.test(t, r)) {
                var p = y.type;
                if (s.revivers[p]) {
                  var d = f[e];
                  f[e] = d ? [p].concat(d) : p;
                }
                if (Object.assign(r, {
                  type: p,
                  replaced: !0
                }), (l || !y.replaceAsync) && !y.replace) return i && i({
                  typeDetected: !0
                }), O(e, t, v && "readonly", r, n, o, p);
                i && i({
                  replacing: !0
                });
                var b = void 0;
                if (l || !y.replaceAsync) {
                  if (void 0 === y.replace) throw new TypeError("Missing replacer");
                  b = y.replace(t, r);
                } else b = y.replaceAsync(t, r);
                return O(e, b, v && "readonly", r, n, o, p);
              }
            }
            return t;
          },
          w = O("", t, v, null != r ? r : {}, d);
        if (d.length) return l && u.throwOnBadSyncType ? function () {
          throw new TypeError("Sync method requested but async result obtained");
        }() : Promise.resolve(h(w, d)).then(m);
        if (!l && u.throwOnBadSyncType) throw new TypeError("Async method requested but sync result obtained");
        return u.stringification && l ? [m(w)] : l ? m(w) : Promise.resolve(m(w));
      }
    }, {
      key: "encapsulateSync",
      value: function encapsulateSync(e, t, r) {
        return this.encapsulate(e, t, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, r), {}, {
          sync: !0
        }));
      }
    }, {
      key: "encapsulateAsync",
      value: function encapsulateAsync(e, t, r) {
        return this.encapsulate(e, t, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, r), {}, {
          sync: !1
        }));
      }
    }, {
      key: "revive",
      value: function revive(t, r) {
        var a = this,
          i = _objectSpread2(_objectSpread2({
            sync: !0
          }, this.options), r),
          c = i.sync;
        function finishRevival(e) {
          if (c) return e;
          if (i.throwOnBadSyncType) throw new TypeError("Async method requested but sync result obtained");
          return Promise.resolve(e);
        }
        if (!t || "object" !== _typeof(t) || Array.isArray(t)) return finishRevival(t);
        var u = t.$types;
        if (!0 === u) return finishRevival(t.$);
        if (!u || "object" !== _typeof(u) || Array.isArray(u)) return finishRevival(t);
        var l = [],
          f = {},
          y = !0;
        u.$ && isPlainObject(u.$) && (t = t.$, u = u.$, y = !1);
        var p = function executeReviver(e, t) {
            var r,
              n = _slicedToArray(null !== (r = a.revivers[e]) && void 0 !== r ? r : [], 1)[0];
            if (!n) throw new Error("Unregistered type: " + e);
            if (c && !("revive" in n)) return t;
            if (!c && n.reviveAsync) return n.reviveAsync(t, f);
            if (n.revive) return n.revive(t, f);
            throw new Error("Missing reviver");
          },
          d = [];
        function checkUndefined(e) {
          return hasConstructorOf(e, s) ? void 0 : e;
        }
        var v,
          b = function revivePlainObjects() {
            var r = [];
            if (!u) throw new Error("Found bad `types`");
            if (Object.entries(u).forEach(function (e) {
              var t = _slicedToArray(e, 2),
                n = t[0],
                o = t[1];
              "#" !== o && [].concat(o).forEach(function (e) {
                var t;
                _slicedToArray(null !== (t = a.revivers[e]) && void 0 !== t ? t : [null, {}], 2)[1].plain && (r.push({
                  keypath: n,
                  type: e
                }), delete u[n]);
              });
            }), r.length) return r.sort(nestedPathsFirst).reduce(function reducer(r, n) {
              var a = n.keypath,
                o = n.type;
              if (isThenable(r)) return r.then(function (e) {
                return reducer(e, {
                  keypath: a,
                  type: o
                });
              });
              var i = getByKeyPath(t, a);
              if (hasConstructorOf(i = p(o, i), e)) return i.then(function (e) {
                var r = setAtKeyPath(t, a, e);
                r === e && (t = r);
              });
              var c = setAtKeyPath(t, a, i);
              c === i && (t = c);
            }, void 0);
          }();
        return hasConstructorOf(b, e) ? v = b.then(function () {
          return t;
        }) : (v = function _revive(t, r, a, i, c) {
          if (!y || "$types" !== t) {
            var f = u[t],
              v = o(r);
            if (v || isPlainObject(r)) {
              var b = v ? new Array(r.length) : {};
              for (n(r).forEach(function (n) {
                var o = _revive(t + (t ? "." : "") + escapeKeyPathComponent(n), r[n], null != a ? a : b, b, n),
                  i = function set(e) {
                    return hasConstructorOf(e, s) ? b[n] = void 0 : void 0 !== e && (b[n] = e), e;
                  };
                hasConstructorOf(o, e) ? d.push(o.then(function (e) {
                  return i(e);
                })) : i(o);
              }), r = b; l.length;) {
                var m = _slicedToArray(l[0], 4),
                  h = m[0],
                  g = m[1],
                  O = m[2],
                  _ = m[3],
                  w = getByKeyPath(h, g);
                if (void 0 === w) break;
                O[_] = w, l.splice(0, 1);
              }
            }
            if (!f) return r;
            if ("#" === f) {
              var A = getByKeyPath(a, r.slice(1));
              return void 0 === A && l.push([a, r.slice(1), i, c]), A;
            }
            return [].concat(f).reduce(function reducer(t, r) {
              if (hasConstructorOf(t, e)) return t.then(function (e) {
                return reducer(e, r);
              });
              if ("string" != typeof r) throw new TypeError("Bad type JSON");
              return p(r, t);
            }, r);
          }
        }("", t, null), d.length && (v = e.resolve(v).then(function (t) {
          return e.all([t].concat(d));
        }).then(function (e) {
          return _slicedToArray(e, 1)[0];
        }))), isThenable(v) ? c && i.throwOnBadSyncType ? function () {
          throw new TypeError("Sync method requested but async result obtained");
        }() : hasConstructorOf(v, e) ? v.p.then(checkUndefined) : v : !c && i.throwOnBadSyncType ? function () {
          throw new TypeError("Async method requested but sync result obtained");
        }() : c ? checkUndefined(v) : Promise.resolve(checkUndefined(v));
      }
    }, {
      key: "reviveSync",
      value: function reviveSync(e, t) {
        return this.revive(e, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, t), {}, {
          sync: !0
        }));
      }
    }, {
      key: "reviveAsync",
      value: function reviveAsync(e, t) {
        return this.revive(e, _objectSpread2(_objectSpread2({
          throwOnBadSyncType: !0
        }, t), {}, {
          sync: !1
        }));
      }
    }, {
      key: "register",
      value: function register(e, t) {
        var r = this,
          a = null != t ? t : {},
          i = function R(e) {
            o(e) ? e.forEach(function (e) {
              return R(e);
            }) : n(e).forEach(function (t) {
              var n;
              if ("#" === t) throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");
              if (u.includes(t)) throw new TypeError("Plain JSON object types are reserved as type names");
              var i = e[t],
                c = i && "function" != typeof i && !Array.isArray(i) && i.testPlainObjects ? r.plainObjectReplacers : r.nonplainObjectReplacers,
                s = c.filter(function (e) {
                  return e.type === t;
                });
              if (s.length && (c.splice(c.indexOf(s[0]), 1), delete r.revivers[t], delete r.types[t]), "function" == typeof i) {
                var l = i;
                i = {
                  test: function test(e) {
                    return e && e.constructor === l;
                  },
                  replace: function replace(e) {
                    return _objectSpread2({}, e);
                  },
                  revive: function revive(e) {
                    return Object.assign(Object.create(l.prototype), e);
                  }
                };
              } else if (o(i)) {
                var f = _slicedToArray(i, 3);
                i = {
                  test: f[0],
                  replace: f[1],
                  revive: f[2]
                };
              }
              if (null !== (n = i) && void 0 !== n && n.test) {
                var y = {
                  type: t,
                  test: i.test.bind(i)
                };
                i.replace && (y.replace = i.replace.bind(i)), i.replaceAsync && (y.replaceAsync = i.replaceAsync.bind(i));
                var p = "number" == typeof a.fallback ? a.fallback : a.fallback ? 0 : Number.POSITIVE_INFINITY;
                if (i.testPlainObjects ? r.plainObjectReplacers.splice(p, 0, y) : r.nonplainObjectReplacers.splice(p, 0, y), i.revive || i.reviveAsync) {
                  var d = {};
                  i.revive && (d.revive = i.revive.bind(i)), i.reviveAsync && (d.reviveAsync = i.reviveAsync.bind(i)), r.revivers[t] = [d, {
                    plain: i.testPlainObjects
                  }];
                }
                r.types[t] = i;
              }
            });
          };
        return [].concat(e).forEach(function (e) {
          return i(e);
        }), this;
      }
    }]), Typeson;
  }(),
  s = _createClass(function Undefined() {
    _classCallCheck(this, Undefined);
  });
s.__typeson__type__ = "TypesonUndefined";
for (var u = ["null", "boolean", "number", "string", "array", "object"], l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = new Uint8Array(256), y = 0; y < 64; y++) f[l.codePointAt(y)] = y;
var p = function encode(e, t, r) {
    null == r && (r = e.byteLength);
    for (var n = new Uint8Array(e, t || 0, r), a = n.length, o = "", i = 0; i < a; i += 3) o += l[n[i] >> 2], o += l[(3 & n[i]) << 4 | n[i + 1] >> 4], o += l[(15 & n[i + 1]) << 2 | n[i + 2] >> 6], o += l[63 & n[i + 2]];
    return a % 3 == 2 ? o = o.slice(0, -1) + "=" : a % 3 == 1 && (o = o.slice(0, -2) + "=="), o;
  },
  d = function decode(e) {
    var t = e.length;
    if (t % 4) throw new Error("Bad base64 length: not divisible by four");
    var r,
      n,
      a,
      o,
      i = .75 * e.length,
      c = 0;
    "=" === e[e.length - 1] && (i--, "=" === e[e.length - 2] && i--);
    for (var s = new ArrayBuffer(i), u = new Uint8Array(s), l = 0; l < t; l += 4) r = f[e.codePointAt(l)], n = f[e.codePointAt(l + 1)], a = f[e.codePointAt(l + 2)], o = f[e.codePointAt(l + 3)], u[c++] = r << 2 | n >> 4, u[c++] = (15 & n) << 4 | a >> 2, u[c++] = (3 & a) << 6 | 63 & o;
    return s;
  };
const v = {
    arraybuffer: {
      test: e => "ArrayBuffer" === toStringTag(e),
      replace(e, t) {
        t.buffers || (t.buffers = []);
        const r = t.buffers.indexOf(e);
        return r > -1 ? {
          index: r
        } : (t.buffers.push(e), p(e));
      },
      revive(e, t) {
        if (t.buffers || (t.buffers = []), "object" == typeof e) return t.buffers[e.index];
        const r = d(e);
        return t.buffers.push(r), r;
      }
    }
  },
  b = {
    bigintObject: {
      test: e => "object" == typeof e && hasConstructorOf(e, BigInt),
      replace: String,
      revive: e => new Object(BigInt(e))
    }
  },
  m = {
    bigint: {
      test: e => "bigint" == typeof e,
      replace: String,
      revive: e => BigInt(e)
    }
  };
function string2arraybuffer(e) {
  const t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
  return t.buffer;
}
const h = {
  blob: {
    test: e => "Blob" === toStringTag(e),
    replace(e) {
      const t = new XMLHttpRequest();
      if (t.overrideMimeType("text/plain; charset=x-user-defined"), t.open("GET", URL.createObjectURL(e), !1), t.send(), 200 !== t.status && 0 !== t.status) throw new Error("Bad Blob access: " + t.status);
      return {
        type: e.type,
        stringContents: t.responseText
      };
    },
    revive(e) {
      const {
        type: t,
        stringContents: r
      } = e;
      return new Blob([string2arraybuffer(r)], {
        type: t
      });
    },
    replaceAsync: t => new e((e, r) => {
      const n = new FileReader();
      n.addEventListener("load", () => {
        e({
          type: t.type,
          stringContents: n.result
        });
      }), n.addEventListener("error", () => {
        r(n.error);
      }), n.readAsBinaryString(t);
    })
  }
};
const _ = {
    cryptokey: {
      test: e => "CryptoKey" === toStringTag(e) && e.extractable,
      replaceAsync: t => new e(async (e, r) => {
        let n;
        try {
          n = await crypto.subtle.exportKey("jwk", t);
        } catch (e) {
          return void r(e);
        }
        e({
          jwk: n,
          algorithm: t.algorithm,
          usages: t.usages
        });
      }),
      revive(e) {
        const {
          jwk: t,
          algorithm: r,
          usages: n
        } = e;
        return crypto.subtle.importKey("jwk", t, r, !0, n);
      }
    }
  },
  w = {
    dataview: {
      test: e => "DataView" === toStringTag(e),
      replace({
        buffer: e,
        byteOffset: t,
        byteLength: r
      }, n) {
        n.buffers || (n.buffers = []);
        const a = n.buffers.indexOf(e);
        return a > -1 ? {
          index: a,
          byteOffset: t,
          byteLength: r
        } : (n.buffers.push(e), {
          encoded: p(e),
          byteOffset: t,
          byteLength: r
        });
      },
      revive(e, t) {
        t.buffers || (t.buffers = []);
        const {
          byteOffset: r,
          byteLength: n,
          encoded: a,
          index: o
        } = e;
        let i;
        return "index" in e ? i = t.buffers[o] : (i = d(a), t.buffers.push(i)), new DataView(i, r, n);
      }
    }
  },
  A = {
    date: {
      test: e => "Date" === toStringTag(e),
      replace(e) {
        const t = e.getTime();
        return Number.isNaN(t) ? "NaN" : t;
      },
      revive: e => "NaN" === e ? new Date(Number.NaN) : new Date(e)
    }
  },
  S = {
    domexception: {
      test: e => "DOMException" === toStringTag(e),
      replace: e => ({
        name: e.name,
        message: e.message
      }),
      revive: ({
        message: e,
        name: t
      }) => new DOMException(e, t)
    }
  },
  j = {};
function create$5(e) {
  j[e.name.toLowerCase()] = {
    test: t => toStringTag(t) === e.name,
    replace: e => e.is2D ? {
      a: e.a,
      b: e.b,
      c: e.c,
      d: e.d,
      e: e.e,
      f: e.f
    } : {
      m11: e.m11,
      m12: e.m12,
      m13: e.m13,
      m14: e.m14,
      m21: e.m21,
      m22: e.m22,
      m23: e.m23,
      m24: e.m24,
      m31: e.m31,
      m32: e.m32,
      m33: e.m33,
      m34: e.m34,
      m41: e.m41,
      m42: e.m42,
      m43: e.m43,
      m44: e.m44
    },
    revive: t => Object.hasOwn(t, "a") ? new e([t.a, t.b, t.c, t.d, t.e, t.f]) : new e([t.m11, t.m12, t.m13, t.m14, t.m21, t.m22, t.m23, t.m24, t.m31, t.m32, t.m33, t.m34, t.m41, t.m42, t.m43, t.m44])
  };
}
"undefined" != typeof DOMMatrix && create$5(DOMMatrix), "undefined" != typeof DOMMatrixReadOnly && create$5(DOMMatrixReadOnly);
const T = {};
function create$4(e) {
  T[e.name.toLowerCase()] = {
    test: t => toStringTag(t) === e.name,
    replace: e => ({
      x: e.x,
      y: e.y,
      z: e.z,
      w: e.w
    }),
    revive: ({
      x: t,
      y: r,
      z: n,
      w: a
    }) => new e(t, r, n, a)
  };
}
"undefined" != typeof DOMPoint && create$4(DOMPoint), "undefined" != typeof DOMPointReadOnly && create$4(DOMPointReadOnly);
const N = {
    domquad: {
      test: e => "DOMQuad" === toStringTag(e),
      replace: e => ({
        p1: e.p1,
        p2: e.p2,
        p3: e.p3,
        p4: e.p4
      }),
      revive: ({
        p1: e,
        p2: t,
        p3: r,
        p4: n
      }) => new DOMQuad(e, t, r, n)
    }
  },
  I = {};
function create$3(e) {
  I[e.name.toLowerCase()] = {
    test: t => toStringTag(t) === e.name,
    replace: e => ({
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    }),
    revive: ({
      x: t,
      y: r,
      width: n,
      height: a
    }) => new e(t, r, n, a)
  };
}
"undefined" != typeof DOMRect && create$3(DOMRect), "undefined" != typeof DOMRectReadOnly && create$3(DOMRectReadOnly);
const P = {
    error: {
      test: e => "Error" === toStringTag(e),
      replace: ({
        name: e,
        message: t,
        cause: r,
        stack: n,
        fileName: a,
        lineNumber: o,
        columnNumber: i
      }) => ({
        name: e,
        message: t,
        cause: r,
        stack: n,
        fileName: a,
        lineNumber: o,
        columnNumber: i
      }),
      revive(e) {
        const t = new Error(e.message);
        return t.name = e.name, t.cause = e.cause, t.stack = e.stack, t.fileName = e.fileName, t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
      }
    }
  },
  E = {};
function create$2(e) {
  E[e.name.toLowerCase()] = {
    test: t => hasConstructorOf(t, e),
    replace: ({
      name: e,
      message: t,
      cause: r,
      stack: n,
      fileName: a,
      lineNumber: o,
      columnNumber: i,
      errors: c
    }) => ({
      name: e,
      message: t,
      cause: r,
      stack: n,
      fileName: a,
      lineNumber: o,
      columnNumber: i,
      errors: c
    }),
    revive(t) {
      const r = "undefined" != typeof AggregateError && e === AggregateError ? new e(t.errors, t.message) : new e(t.message);
      return r.name = t.name, r.cause = t.cause, r.stack = t.stack, r.fileName = t.fileName, r.lineNumber = t.lineNumber, r.columnNumber = t.columnNumber, r;
    }
  };
}
[TypeError, RangeError, SyntaxError, ReferenceError, EvalError, URIError].forEach(e => create$2(e)), "undefined" != typeof AggregateError && create$2(AggregateError), "function" == typeof InternalError && create$2(InternalError);
const x = {
    file: {
      test: e => "File" === toStringTag(e),
      replace(e) {
        const t = new XMLHttpRequest();
        if (t.overrideMimeType("text/plain; charset=x-user-defined"), t.open("GET", URL.createObjectURL(e), !1), t.send(), 200 !== t.status && 0 !== t.status) throw new Error("Bad File access: " + t.status);
        return {
          type: e.type,
          stringContents: t.responseText,
          name: e.name,
          lastModified: e.lastModified
        };
      },
      revive: ({
        name: e,
        type: t,
        stringContents: r,
        lastModified: n
      }) => new File([string2arraybuffer(r)], e, {
        type: t,
        lastModified: n
      }),
      replaceAsync: t => new e(function (e, r) {
        const n = new FileReader();
        n.addEventListener("load", function () {
          e({
            type: t.type,
            stringContents: n.result,
            name: t.name,
            lastModified: t.lastModified
          });
        }), n.addEventListener("error", function () {
          r(n.error);
        }), n.readAsBinaryString(t);
      })
    }
  },
  C = {
    file: x.file,
    filelist: {
      test: e => "FileList" === toStringTag(e),
      replace(e) {
        const t = [];
        for (let r = 0; r < e.length; r++) t[r] = e.item(r);
        return t;
      },
      revive(e) {
        class FileList {
          constructor() {
            this._files = arguments[0], this.length = this._files.length;
          }
          item(e) {
            return this._files[e];
          }
          get [Symbol.toStringTag]() {
            return "FileList";
          }
        }
        return new FileList(e);
      }
    }
  },
  k = {
    imagebitmap: {
      test: e => "ImageBitmap" === toStringTag(e) || e && e.dataset && "ImageBitmap" === e.dataset.toStringTag,
      replace(e) {
        const t = document.createElement("canvas");
        return t.getContext("2d").drawImage(e, 0, 0), t.toDataURL();
      },
      revive(e) {
        const t = document.createElement("canvas"),
          r = t.getContext("2d"),
          n = document.createElement("img");
        return n.addEventListener("load", function () {
          r.drawImage(n, 0, 0);
        }), n.src = e, t;
      },
      reviveAsync(t) {
        const r = document.createElement("canvas"),
          n = r.getContext("2d"),
          a = document.createElement("img");
        return a.addEventListener("load", function () {
          n.drawImage(a, 0, 0);
        }), a.src = t, new e(async (e, t) => {
          try {
            e(await createImageBitmap(r));
          } catch (e) {
            t(e);
          }
        });
      }
    }
  },
  B = {
    imagedata: {
      test: e => "ImageData" === toStringTag(e),
      replace: e => ({
        array: [...e.data],
        width: e.width,
        height: e.height
      }),
      revive: e => new ImageData(new Uint8ClampedArray(e.array), e.width, e.height)
    }
  },
  U = {
    infinity: {
      test: e => e === Number.POSITIVE_INFINITY,
      replace: () => "Infinity",
      revive: () => Number.POSITIVE_INFINITY
    }
  },
  K = {
    map: {
      test: e => "Map" === toStringTag(e),
      replace: e => [...e.entries()],
      revive: e => new Map(e)
    }
  },
  L = {
    nan: {
      test: e => Number.isNaN(e),
      replace: () => "NaN",
      revive: () => Number.NaN
    }
  },
  F = {
    negativeInfinity: {
      test: e => e === Number.NEGATIVE_INFINITY,
      replace: () => "-Infinity",
      revive: () => Number.NEGATIVE_INFINITY
    }
  },
  $ = {
    negativeZero: {
      test: e => Object.is(e, -0),
      replace: () => 0,
      revive: () => -0
    }
  },
  V = {
    StringObject: {
      test: e => "String" === toStringTag(e) && "object" == typeof e,
      replace: String,
      revive: e => new String(e)
    },
    BooleanObject: {
      test: e => "Boolean" === toStringTag(e) && "object" == typeof e,
      replace: Boolean,
      revive: e => new Boolean(e)
    },
    NumberObject: {
      test: e => "Number" === toStringTag(e) && "object" == typeof e,
      replace: Number,
      revive: e => new Number(e)
    }
  },
  q = {
    regexp: {
      test: e => "RegExp" === toStringTag(e),
      replace: e => ({
        source: e.source,
        flags: (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "")
      }),
      revive: ({
        source: e,
        flags: t
      }) => new RegExp(e, t)
    }
  },
  G = {
    set: {
      test: e => "Set" === toStringTag(e),
      replace: e => [...e.values()],
      revive: e => new Set(e)
    }
  },
  H = {};
"function" == typeof Int8Array && [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, ...("function" == typeof BigInt64Array ? [BigInt64Array, BigUint64Array] : [])].forEach(e => function create$1(e) {
  const t = e.name;
  H[t.toLowerCase()] = {
    test: e => toStringTag(e) === t,
    replace: e => (0 === e.byteOffset && e.byteLength === e.buffer.byteLength ? e : e.slice(0)).buffer,
    revive: t => "ArrayBuffer" === toStringTag(t) ? new e(t) : t
  };
}(e));
const z = {};
"function" == typeof Int8Array && [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, ...("function" == typeof BigInt64Array ? [BigInt64Array, BigUint64Array] : [])].forEach(e => function create(e) {
  const t = e.name;
  z[t.toLowerCase()] = {
    test: e => toStringTag(e) === t,
    replace({
      buffer: e,
      byteOffset: t,
      length: r
    }, n) {
      n.buffers || (n.buffers = []);
      const a = n.buffers.indexOf(e);
      return a > -1 ? {
        index: a,
        byteOffset: t,
        length: r
      } : (n.buffers.push(e), {
        encoded: p(e),
        byteOffset: t,
        length: r
      });
    },
    revive(t, r) {
      r.buffers || (r.buffers = []);
      const {
        byteOffset: n,
        length: a,
        encoded: o,
        index: i
      } = t;
      let c;
      return "index" in t ? c = r.buffers[i] : (c = d(o), r.buffers.push(c)), new e(c, n, a);
    }
  };
}(e));
const Q = {
    undef: {
      test: (e, t) => void 0 === e && (t.ownKeys || !("ownKeys" in t)),
      replace: () => 0,
      revive: () => new s()
    }
  },
  X = {
    userObject: {
      test: e => isUserObject(e),
      replace: e => ({
        ...e
      }),
      revive: e => e
    }
  },
  Z = [{
    arrayNonindexKeys: {
      testPlainObjects: !0,
      test: (e, t) => !!Array.isArray(e) && (Object.keys(e).some(e => String(Number.parseInt(e)) !== e) && (t.iterateIn = "object", t.addLength = !0), !0),
      replace: (e, t) => (t.iterateUnsetNumeric = !0, e),
      revive(e) {
        if (Array.isArray(e)) return e;
        const t = [];
        return Object.entries(e).forEach(([e, r]) => {
          t[e] = r;
        }), t;
      }
    }
  }, {
    sparseUndefined: {
      test: (e, t) => void 0 === e && !1 === t.ownKeys,
      replace: () => 0,
      revive() {}
    }
  }],
  ee = [L, U, F, $],
  oe = [X, Q, Z, V, ee, A, q, B, k, x, C, h, P, E].concat("function" == typeof Map ? K : [], "function" == typeof Set ? G : [], "function" == typeof ArrayBuffer ? v : [], "function" == typeof Uint8Array ? z : [], "function" == typeof DataView ? w : [], "undefined" != typeof crypto ? _ : [], "undefined" != typeof BigInt ? [m, b] : [], "undefined" != typeof DOMException ? S : [], "undefined" != typeof DOMRect ? I : [], "undefined" != typeof DOMPoint ? T : [], "undefined" != typeof DOMQuad ? N : [], "undefined" != typeof DOMMatrix ? j : []),
  ie = oe.concat({
    checkDataCloneException: {
      test(e) {
        const t = {}.toString.call(e).slice(8, -1);
        if (["symbol", "function"].includes(typeof e) || ["Arguments", "Module", "Promise", "WeakMap", "WeakSet", "Event", "MessageChannel"].includes(t) || e && "object" == typeof e && "number" == typeof e.nodeType && "function" == typeof e.insertBefore) throw new DOMException("The object cannot be cloned.", "DataCloneError");
        return !1;
      }
    }
  });

// See: http://stackoverflow.com/questions/42170826/categories-for-rejection-by-the-structured-cloning-algorithm

let typeson = new c().register(ie);

/**
 * @param {(preset: import('typeson-registry').Preset) =>
 *   import('typeson-registry').Preset} func
 * @returns {void}
 */
function register(func) {
  typeson = new c().register(func(ie));
}

/**
 * We are keeping the callback approach for now in case we wish to reexpose
 * `Blob`, `File`, `FileList` asynchronously (though in such a case, we
 * should probably refactor as a Promise).
 * @param {AnyValue} obj
 * @param {(str: string) => void} [func]
 * @throws {Error}
 * @returns {string}
 */
function encode(obj, func) {
  let ret;
  try {
    // eslint-disable-next-line n/no-sync
    ret = typeson.stringifySync(obj);
  } catch (err) {
    // SCA in typeson-registry using `DOMException` which is not defined (e.g., in Node)
    if (hasConstructorOf(err, ReferenceError) ||
    // SCA in typeson-registry threw a cloning error and we are in a
    //   supporting environment (e.g., the browser) where `ShimDOMException` is
    //   an alias for `DOMException`; if typeson-registry ever uses our shim
    //   to throw, we can use this condition alone.
    hasConstructorOf(err, ShimDOMException)) {
      throw createDOMException('DataCloneError', 'The object cannot be cloned.');
    }
    // We should rethrow non-cloning exceptions like from
    //  throwing getters (as in the W3C test, key-conversion-exceptions.htm)
    throw err;
  }
  if (func) {
    func(ret);
  }
  return ret;
}

/**
 * @typedef {any} AnyValue
 */

/**
 * @param {string} obj
 * @returns {AnyValue}
 */
function decode(obj) {
  return typeson.parse(obj);
}

/**
 * @param {AnyValue} val
 * @returns {AnyValue}
 */
function clone(val) {
  // We don't return the intermediate `encode` as we'll need to reencode
  //   the clone as it may differ
  return decode(encode(val));
}

var Sca = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone,
  decode: decode,
  encode: encode,
  register: register
});

const readonlyProperties$2 = ['objectStore', 'keyPath', 'multiEntry', 'unique'];

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {{
 *   columnName: string,
 *   keyPath: import('./Key.js').KeyPath,
 *   optionalParams: {
 *     unique: boolean,
 *     multiEntry: boolean
 *   }
 *   deleted?: boolean,
 *   __deleted?: boolean,
 *   cursors?: import('./IDBCursor.js').IDBCursorWithValueFull[],
 * }} IDBIndexProperties
 */

/**
 * IDB Index.
 * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBIndex
 * @class
 */
function IDBIndex() {
  throw new TypeError('Illegal constructor');
}
const IDBIndexAlias = IDBIndex;

/**
 * @typedef {IDBIndex & {
 *   name: string,
 *   keyPath: import('./Key.js').KeyPath,
 *   multiEntry: boolean,
 *   unique: boolean,
 *   objectStore: import('./IDBObjectStore.js').IDBObjectStoreFull,
 *   __pendingCreate?: boolean,
 *   __deleted?: boolean,
 *   __originalName: string,
 *   __currentName: string,
 *   __pendingName?: string,
 *   __pendingDelete?: boolean,
 *   __name: string,
 *   __multiEntry: boolean,
 *   __unique: boolean,
 *   __objectStore: import('./IDBObjectStore.js').IDBObjectStoreFull,
 *   __keyPath: import('./Key.js').KeyPath,
 *   __recreated?: boolean
 * }} IDBIndexFull
 */

/**
 *
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {IDBIndexProperties} indexProperties
 * @returns {IDBIndexFull}
 */
IDBIndex.__createInstance = function (store, indexProperties) {
  /**
   * @class
   * @this {IDBIndexFull}
   */
  function IDBIndex() {
    const me = this;
    // @ts-expect-error It's ok
    me[Symbol.toStringTag] = 'IDBIndex';
    defineReadonlyProperties(me, readonlyProperties$2);
    me.__objectStore = store;
    me.__name = me.__originalName = indexProperties.columnName;
    me.__keyPath = Array.isArray(indexProperties.keyPath) ? indexProperties.keyPath.slice() : indexProperties.keyPath;
    const {
      optionalParams
    } = indexProperties;
    me.__multiEntry = Boolean(optionalParams && optionalParams.multiEntry);
    me.__unique = Boolean(optionalParams && optionalParams.unique);
    me.__deleted = Boolean(indexProperties.__deleted);
    me.__objectStore.__cursors = indexProperties.cursors || [];
    Object.defineProperty(me, '__currentName', {
      /**
       * @this {IDBIndexFull}
       * @returns {string}
       */
      get() {
        return '__pendingName' in me ? ( /** @type {string} */me.__pendingName) : me.name;
      }
    });
    Object.defineProperty(me, 'name', {
      enumerable: false,
      configurable: false,
      /**
       * @this {IDBIndexFull}
       * @returns {string}
       */
      get() {
        return this.__name;
      },
      /**
       * @param {string} newName
       * @this {IDBIndexFull}
       * @returns {void}
       */
      set(newName) {
        const me = this;
        newName = convertToDOMString(newName);
        const oldName = me.name;
        IDBTransaction.__assertVersionChange(me.objectStore.transaction);
        IDBTransaction.__assertActive(me.objectStore.transaction);
        IDBIndexAlias.__invalidStateIfDeleted(me);
        IDBObjectStore.__invalidStateIfDeleted(me);
        if (newName === oldName) {
          return;
        }
        if (me.objectStore.__indexes[newName] && !me.objectStore.__indexes[newName].__deleted && !me.objectStore.__indexes[newName].__pendingDelete) {
          throw createDOMException('ConstraintError', 'Index "' + newName + '" already exists on ' + me.objectStore.__currentName);
        }
        me.__name = newName;
        const {
          objectStore
        } = me;
        delete objectStore.__indexes[oldName];
        objectStore.__indexes[newName] = me;
        objectStore.indexNames.splice(objectStore.indexNames.indexOf(oldName), 1, newName);
        const storeHandle = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */objectStore.transaction.__storeHandles[objectStore.name];
        const oldIndexHandle = storeHandle.__indexHandles[oldName];
        oldIndexHandle.__name = newName; // Fix old references
        storeHandle.__indexHandles[newName] = oldIndexHandle; // Ensure new reference accessible
        me.__pendingName = oldName;
        const colInfoToPreserveArr = [['key', 'BLOB ' + (objectStore.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY')], ['value', 'BLOB']].concat(
        // @ts-expect-error Has numeric indexes instead of iterator
        [...objectStore.indexNames].filter(indexName => indexName !== newName).map(indexName => [escapeIndexNameForSQL(indexName), 'BLOB']));
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

  // @ts-expect-error It's ok
  return new IDBIndex();
};

/**
 *
 * @param {IDBIndexFull} index
 * @param {string} [msg]
 * @throws {DOMException}
 * @returns {void}
 */
IDBIndex.__invalidStateIfDeleted = function (index, msg) {
  if (index.__deleted || index.__pendingDelete || index.__pendingCreate && index.objectStore.transaction && index.objectStore.transaction.__errored) {
    throw createDOMException('InvalidStateError', msg || 'This index has been deleted');
  }
};

/**
 * Clones an IDBIndex instance for a different IDBObjectStore instance.
 * @param {IDBIndexFull} index
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @returns {IDBIndexFull}
 */
IDBIndex.__clone = function (index, store) {
  const idx = IDBIndex.__createInstance(store, {
    columnName: index.name,
    keyPath: index.keyPath,
    optionalParams: {
      multiEntry: index.multiEntry,
      unique: index.unique
    }
  });
  /** @type {const} */
  ['__pendingCreate', '__pendingDelete', '__deleted', '__originalName', '__recreated'].forEach(p => {
    // @ts-expect-error Why is this type "never"?
    idx[p] = index[p];
  });
  return idx;
};

/**
 * Creates a new index on an object store.
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {IDBIndexFull} index
 * @returns {void}
 */
IDBIndex.__createIndex = function (store, index) {
  const indexName = index.name;
  const storeName = store.__currentName;
  const idx = store.__indexes[indexName];
  index.__pendingCreate = true;

  // Add the index to the IDBObjectStore
  store.indexNames.push(indexName);
  store.__indexes[indexName] = index; // We add to indexes as needs to be available, e.g., if there is a subsequent deleteIndex call

  let indexHandle = store.__indexHandles[indexName];
  if (!indexHandle || index.__pendingDelete || index.__deleted || indexHandle.__pendingDelete || indexHandle.__deleted) {
    indexHandle = store.__indexHandles[indexName] = IDBIndex.__clone(index, store);
  }

  // Create the index in WebSQL
  const {
    transaction
  } = store;
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  transaction.__addNonRequestToTransactionQueue(function createIndex(tx, args, success, failure) {
    const columnExists = idx && (idx.__deleted || idx.__recreated); // This check must occur here rather than earlier as properties may not have been set yet otherwise

    /** @type {{[key: string]: boolean}} */
    let indexValues = {};

    /**
     * @param {SQLTransaction} tx
     * @param {SQLError} err
     * @returns {void}
     */
    function error(tx, err) {
      failure(createDOMException('UnknownError', 'Could not create index "' + indexName + '"' + err.code + '::' + err.message, err));
    }

    /**
     * @param {SQLTransaction} tx
     * @returns {void}
     */
    function applyIndex(tx) {
      // Update the object store's index list
      IDBIndex.__updateIndexList(store, tx, function () {
        // Add index entries for all existing records
        tx.executeSql('SELECT "key", "value" FROM ' + escapeStoreNameForSQL(storeName), [], function (tx, data) {
          if (CFG.DEBUG) {
            console.log('Adding existing ' + storeName + ' records to the ' + indexName + ' index');
          }
          addIndexEntry(0);

          /**
           * @param {Integer} i
           * @returns {void}
           */
          function addIndexEntry(i) {
            if (i < data.rows.length) {
              try {
                const value = decode(unescapeSQLiteResponse(data.rows.item(i).value));
                const indexKey = extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Todo: Do we need this stricter error checking?
                if ('invalid' in indexKey && indexKey.invalid || 'failure' in indexKey && indexKey.failure) {
                  // Todo: Do we need invalid checks and should we instead treat these as being duplicates?
                  throw new Error('Go to catch; ignore bad indexKey');
                }
                const indexKeyStr = /** @type {string} */
                encode$1(indexKey.value, index.multiEntry);
                if (index.unique) {
                  if (indexValues[indexKeyStr]) {
                    indexValues = {};
                    failure(createDOMException('ConstraintError', 'Duplicate values already exist within the store'));
                    return;
                  }
                  indexValues[indexKeyStr] = true;
                }
                tx.executeSql('UPDATE ' + escapeStoreNameForSQL(storeName) + ' SET ' + escapeIndexNameForSQL(indexName) + ' = ? WHERE "key" = ?', [escapeSQLiteStatement(indexKeyStr), data.rows.item(i).key], function () {
                  addIndexEntry(i + 1);
                }, /** @type {SQLStatementErrorCallback} */error);
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
        }, /** @type {SQLStatementErrorCallback} */error);
      }, /** @type {SQLStatementErrorCallback} */error);
    }
    const escapedStoreNameSQL = escapeStoreNameForSQL(storeName);
    const escapedIndexNameSQL = escapeIndexNameForSQL(index.name);

    /**
     * @param {SQLTransaction} tx
     * @returns {void}
     */
    function addIndexSQL(tx) {
      if (!CFG.useSQLiteIndexes) {
        applyIndex(tx);
        return;
      }
      tx.executeSql('CREATE INDEX IF NOT EXISTS "' +
      // The escaped index name must be unique among indexes in the whole database;
      //    so we prefix with store name; as prefixed, will also not conflict with
      //    index on `key`
      // Avoid quotes and separate with special escape sequence
      escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1) + '" ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')', [], applyIndex, /** @type {SQLStatementErrorCallback} */error);
    }
    if (columnExists) {
      // For a previously existing index, just update the index entries in the existing column;
      //   no need to add SQLite index to it either as should already exist
      applyIndex(tx);
    } else {
      // For a new index, add a new column to the object store, then apply the index
      const sql = ['ALTER TABLE', escapedStoreNameSQL, 'ADD', escapedIndexNameSQL, 'BLOB'].join(' ');
      if (CFG.DEBUG) {
        console.log(sql);
      }
      tx.executeSql(sql, [], addIndexSQL, /** @type {SQLStatementErrorCallback} */error);
    }
  });
};

/**
 * Deletes an index from an object store.
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {IDBIndexFull} index
 * @returns {void}
 */
IDBIndex.__deleteIndex = function (store, index) {
  // Remove the index from the IDBObjectStore
  index.__pendingDelete = true;
  const indexHandle = store.__indexHandles[index.name];
  if (indexHandle) {
    indexHandle.__pendingDelete = true;
  }
  store.indexNames.splice(store.indexNames.indexOf(index.name), 1);

  // Remove the index in WebSQL
  const {
    transaction
  } = store;
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  transaction.__addNonRequestToTransactionQueue(function deleteIndex(tx, args, success, failure) {
    /**
     * @param {SQLTransaction} tx
     * @param {SQLError} err
     * @returns {void}
     */
    function error(tx, err) {
      failure(createDOMException('UnknownError', 'Could not delete index "' + index.name + '"', err));
    }

    /**
     * @returns {void}
     */
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
      }, /** @type {SQLStatementErrorCallback} */error);
    }
    if (!CFG.useSQLiteIndexes) {
      finishDeleteIndex();
      return;
    }
    tx.executeSql('DROP INDEX IF EXISTS ' + sqlQuote(escapeStoreNameForSQL(store.name).slice(1, -1) + '^5' + escapeIndexNameForSQL(index.name).slice(1, -1)), [], finishDeleteIndex, /** @type {SQLStatementErrorCallback} */error);
  });
};

/**
 * @typedef {{[key: string]: IDBIndexProperties}} IndexList
 */

/**
 * Updates index list for the given object store.
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {SQLTransaction} tx
 * @param {(store: IDBObjectStore) => void} success
 * @param {(
 *   tx: SQLTransaction,
 *   err: SQLError
 * ) => boolean} [failure]
 * @returns {void}
 */
IDBIndex.__updateIndexList = function (store, tx, success, failure) {
  /** @type {IndexList} **/
  const indexList = {};
  for (let i = 0; i < store.indexNames.length; i++) {
    const idx = store.__indexes[store.indexNames[i]];
    indexList[idx.name] = {
      columnName: idx.name,
      keyPath: idx.keyPath,
      optionalParams: {
        unique: idx.unique,
        multiEntry: idx.multiEntry
      },
      deleted: Boolean(idx.__deleted)
    };
  }
  if (CFG.DEBUG) {
    console.log('Updating the index list for ' + store.__currentName, indexList);
  }
  tx.executeSql('UPDATE __sys__ SET "indexList" = ? WHERE "name" = ?', [JSON.stringify(indexList), escapeSQLiteStatement(store.__currentName)], function () {
    success(store);
  }, /** @type {SQLStatementErrorCallback} */failure);
};

/**
 * @typedef {any|IDBKeyRange} Query
 */

/**
 * Retrieves index data for the given key.
 * @param {Query} range
 * @param {"value"|"key"|"count"} opType
 * @param {boolean} nullDisallowed
 * @param {number} [count]
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.__fetchIndexData = function (range, opType, nullDisallowed, count) {
  const me = this;
  if (count !== undefined) {
    count = enforceRange(count, 'unsigned long');
  }
  IDBIndex.__invalidStateIfDeleted(me);
  IDBObjectStore.__invalidStateIfDeleted(me.objectStore);
  if (me.objectStore.__deleted) {
    throw createDOMException('InvalidStateError', "This index's object store has been deleted");
  }
  IDBTransaction.__assertActive(me.objectStore.transaction);
  if (nullDisallowed && isNullish(range)) {
    throw createDOMException('DataError', 'No key or range was specified');
  }
  const fetchArgs = buildFetchIndexDataSQL(nullDisallowed, me, range, opType, false);
  return /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.objectStore.transaction.__addToTransactionQueue(function (...args) {
    executeFetchIndexData(count, ...fetchArgs,
    // @ts-expect-error It's ok
    ...args);
  }, undefined, me);
};

/**
 * Opens a cursor over the given key range.
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.openCursor = function /* query, direction */
() {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const [query, direction] = arguments;
  const cursor = IDBCursorWithValue.__createInstance(query, direction, me.objectStore, me, escapeIndexNameForSQLKeyColumn(me.name), 'value');
  me.__objectStore.__cursors.push(cursor);
  return cursor.__request;
};

/**
 * Opens a cursor over the given key range.  The cursor only includes key values, not data.
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.openKeyCursor = function /* query, direction */
() {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const [query, direction] = arguments;
  const cursor = IDBCursor.__createInstance(query, direction, me.objectStore, me, escapeIndexNameForSQLKeyColumn(me.name), 'key');
  me.__objectStore.__cursors.push(cursor);
  return cursor.__request;
};

/**
 *
 * @param {Query} query
 * @throws {TypeError}
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.get = function (query) {
  if (!arguments.length) {
    // Per https://heycam.github.io/webidl/
    throw new TypeError('A parameter was missing for `IDBIndex.get`.');
  }
  return this.__fetchIndexData(query, 'value', true);
};

/**
 *
 * @param {Query} query
 * @throws {TypeError}
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.getKey = function (query) {
  if (!arguments.length) {
    // Per https://heycam.github.io/webidl/
    throw new TypeError('A parameter was missing for `IDBIndex.getKey`.');
  }
  return this.__fetchIndexData(query, 'key', true);
};

/**
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.getAll = function /* query, count */
() {
  // eslint-disable-next-line prefer-rest-params
  const [query, count] = arguments;
  return this.__fetchIndexData(query, 'value', false, count);
};

/**
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.getAllKeys = function /* query, count */
() {
  // eslint-disable-next-line prefer-rest-params
  const [query, count] = arguments;
  return this.__fetchIndexData(query, 'key', false, count);
};

/**
 * @this {IDBIndexFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBIndex.prototype.count = function /* query */
() {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const query = arguments[0];
  // With the exception of needing to check whether the index has been
  //  deleted, we could, for greater spec parity (if not accuracy),
  //  just call:
  //  `return me.__objectStore.count(query);`

  if (instanceOf(query, IDBKeyRange)) {
    // Todo: Do we need this block?
    // We don't need to add to cursors array since has the count parameter which won't cache
    return IDBCursorWithValue.__createInstance(query, 'next', me.objectStore, me, escapeIndexNameForSQLKeyColumn(me.name), 'value', true).__request;
  }
  return me.__fetchIndexData(query, 'count', false);
};

/**
 *
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {string} oldName
 * @param {string} newName
 * @param {string[][]} colInfoToPreserveArr
 * @param {null|((
 *   tx: SQLTransaction,
 *   success: ((store: IDBObjectStore) => void)
 * ) => void)} cb
 * @this {IDBIndexFull}
 * @returns {void}
 */
IDBIndex.prototype.__renameIndex = function (store, oldName, newName, colInfoToPreserveArr = [], cb = null) {
  const newNameType = 'BLOB';
  const storeName = store.__currentName;
  const escapedStoreNameSQL = escapeStoreNameForSQL(storeName);
  const escapedNewIndexNameSQL = escapeIndexNameForSQL(newName);
  const escapedTmpStoreNameSQL = sqlQuote('tmp_' + escapeStoreNameForSQL(storeName).slice(1, -1));
  const colNamesToPreserve = colInfoToPreserveArr.map(colInfo => colInfo[0]);
  const colInfoToPreserve = colInfoToPreserveArr.map(colInfo => colInfo.join(' '));
  const listColInfoToPreserve = colInfoToPreserve.length ? colInfoToPreserve.join(', ') + ', ' : '';
  const listColsToPreserve = colNamesToPreserve.length ? colNamesToPreserve.join(', ') + ', ' : '';

  // We could adapt the approach at http://stackoverflow.com/a/8430746/271577
  //    to make the approach reusable without passing column names, but it is a bit fragile
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  store.transaction.__addNonRequestToTransactionQueue(function renameIndex(tx, args, success, error) {
    /**
     * @param {SQLTransaction} tx
     * @param {SQLError} err
     * @returns {void}
     */
    function sqlError(tx, err) {
      error(err);
    }
    /**
     * @returns {void}
     */
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
    const sql = 'CREATE TABLE ' + escapedTmpStoreNameSQL + '(' + listColInfoToPreserve + escapedNewIndexNameSQL + ' ' + newNameType + ')';
    if (CFG.DEBUG) {
      console.log(sql);
    }
    tx.executeSql(sql, [], function () {
      const sql = 'INSERT INTO ' + escapedTmpStoreNameSQL + '(' + listColsToPreserve + escapedNewIndexNameSQL + ') SELECT ' + listColsToPreserve + escapeIndexNameForSQL(oldName) + ' FROM ' + escapedStoreNameSQL;
      if (CFG.DEBUG) {
        console.log(sql);
      }
      tx.executeSql(sql, [], function () {
        const sql = 'DROP TABLE ' + escapedStoreNameSQL;
        if (CFG.DEBUG) {
          console.log(sql);
        }
        tx.executeSql(sql, [], function () {
          const sql = 'ALTER TABLE ' + escapedTmpStoreNameSQL + ' RENAME TO ' + escapedStoreNameSQL;
          if (CFG.DEBUG) {
            console.log(sql);
          }
          tx.executeSql(sql, [], function (tx) {
            if (!CFG.useSQLiteIndexes) {
              finish();
              return;
            }
            const indexCreations = colNamesToPreserve.slice(2) // Doing `key` separately and no need for index on `value`
            .map(escapedIndexNameSQL => new SyncPromise(function (resolve, reject) {
              const escapedIndexToRecreate = sqlQuote(escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1));
              // const sql = 'DROP INDEX IF EXISTS ' + escapedIndexToRecreate;
              // if (CFG.DEBUG) { console.log(sql); }
              // tx.executeSql(sql, [], function () {
              const sql = 'CREATE INDEX ' + escapedIndexToRecreate + ' ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')';
              if (CFG.DEBUG) {
                console.log(sql);
              }
              tx.executeSql(sql, [], resolve, /** @type {SQLStatementErrorCallback} */
              function (tx, err) {
                reject(err);
              });
              // }, function (tx, err) {
              //    reject(err);
              // });
            }));
            indexCreations.push(new SyncPromise(function (resolve, reject) {
              const escapedIndexToRecreate = sqlQuote('sk_' + escapedStoreNameSQL.slice(1, -1));
              // Chrome erring here if not dropped first; Node does not
              const sql = 'DROP INDEX IF EXISTS ' + escapedIndexToRecreate;
              if (CFG.DEBUG) {
                console.log(sql);
              }
              tx.executeSql(sql, [], function () {
                const sql = 'CREATE INDEX ' + escapedIndexToRecreate + ' ON ' + escapedStoreNameSQL + '("key")';
                if (CFG.DEBUG) {
                  console.log(sql);
                }
                tx.executeSql(sql, [], resolve, /** @type {SQLStatementErrorCallback} */
                function (tx, err) {
                  reject(err);
                });
              }, /** @type {SQLStatementErrorCallback} */
              function (tx, err) {
                reject(err);
              });
            }));
            SyncPromise.all(indexCreations).then(finish, /** @type {(reason: any) => PromiseLike<never>} */
            error).catch(err => {
              console.log('Index rename error');
              throw err;
            });
          }, /** @type {SQLStatementErrorCallback} */sqlError);
        }, /** @type {SQLStatementErrorCallback} */sqlError);
      }, /** @type {SQLStatementErrorCallback} */sqlError);
    }, /** @type {SQLStatementErrorCallback} */sqlError);
  });
};

/**
 * @typedef {any} AnyValue
 */

Object.defineProperty(IDBIndex, Symbol.hasInstance, {
  /**
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  value: obj => isObj(obj) && 'openCursor' in obj && typeof obj.openCursor === 'function' && 'multiEntry' in obj && typeof obj.multiEntry === 'boolean'
});
defineReadonlyOuterInterface(IDBIndex.prototype, readonlyProperties$2);
defineOuterInterface(IDBIndex.prototype, ['name']);
IDBIndex.prototype[Symbol.toStringTag] = 'IDBIndexPrototype';
Object.defineProperty(IDBIndex, 'prototype', {
  writable: false
});

/**
 * @param {number|null} count
 * @param {boolean} unboundedDisallowed
 * @param {IDBIndexFull} index
 * @param {boolean} hasKey
 * @param {import('./Key.js').Value|import('./Key.js').Key} range
 * @param {"value"|"key"|"count"} opType
 * @param {boolean} multiChecks
 * @param {string[]} sql
 * @param {string[]} sqlValues
 * @param {SQLTransaction} tx
 * @param {null|undefined} args
 * @param {(result: number|undefined|[]|AnyValue|AnyValue[]) => void} success
 * @param {(tx: SQLTransaction, err: SQLError) => void} error
 * @returns {void}
 */
function executeFetchIndexData(count, unboundedDisallowed, index, hasKey, range, opType, multiChecks, sql, sqlValues, tx, args, success, error) {
  if (unboundedDisallowed) {
    count = 1;
  }
  if (count) {
    sql.push('LIMIT', String(count));
  }
  const isCount = opType === 'count';
  if (CFG.DEBUG) {
    console.log('Trying to fetch data for Index', sql.join(' '), sqlValues);
  }
  tx.executeSql(sql.join(' '), sqlValues, function (tx, data) {
    const records = [];
    let recordCount = 0;
    const decode$2 = isCount ? () => {/* */} : opType === 'key'
    // eslint-disable-next-line @stylistic/operator-linebreak -- JSDoc
    ?
    /**
     * @param {{
     *   key: string
     * }} record
     * @returns {import('./Key.js').ValueType|undefined}
     */
    record => {
      // Key.convertValueToKey(record.key); // Already validated before storage
      return decode$1(unescapeSQLiteResponse(record.key));
    }
    // eslint-disable-next-line @stylistic/operator-linebreak -- JSDoc
    :
    /**
     * @param {{
     *   value: string
     * }} record
     * @returns {AnyValue}
     */
    record => {
      // when opType is value
      return decode(unescapeSQLiteResponse(record.value));
    };
    if (index.multiEntry) {
      const escapedIndexNameForKeyCol = escapeIndexNameForSQLKeyColumn(index.name);
      const encodedKey = encode$1(range, index.multiEntry);
      for (let i = 0; i < data.rows.length; i++) {
        const row = data.rows.item(i);
        const rowKey = /** @type {import('./Key.js').ValueTypeArray} */
        decode$1(row[escapedIndexNameForKeyCol]);
        let record;
        if (hasKey && (multiChecks && range.some(
        /**
         * @param {string} check
         * @returns {boolean}
         */
        check => rowKey.includes(check)) ||
        // More precise than our SQL
        isMultiEntryMatch( /** @type {string} */
        encodedKey, row[escapedIndexNameForKeyCol]))) {
          recordCount++;
          record = row;
        } else if (!hasKey && !multiChecks) {
          if (rowKey !== undefined) {
            recordCount += Array.isArray(rowKey) ? rowKey.length : 1;
            record = row;
          }
        }
        if (record) {
          records.push(decode$2(record));
          if (unboundedDisallowed) {
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < data.rows.length; i++) {
        const record = data.rows.item(i);
        if (record) {
          records.push(decode$2(record));
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
  }, /** @type {SQLStatementErrorCallback} */error);
}

/**
 * @param {boolean} nullDisallowed
 * @param {IDBIndexFull} index
 * @param {import('./Key.js').Value|import('./Key.js').Key} range
 * @param {"value"|"key"|"count"} opType
 * @param {boolean} multiChecks
 * @returns {[
 *   nullDisallowed: boolean,
 *   index: IDBIndexFull,
 *   hasRange: boolean,
 *   range: import('./Key.js').Value|import('./Key.js').Key,
 *   opType: "value"|"key"|"count",
 *   multiChecks: boolean,
 *   sql: string[],
 *   sqlValues: string[]
 * ]}
 */
function buildFetchIndexDataSQL(nullDisallowed, index, range, opType, multiChecks) {
  const hasRange = nullDisallowed || !isNullish(range);
  const col = opType === 'count' ? 'key' : opType; // It doesn't matter which column we use for 'count' as long as it is valid
  const sql = ['SELECT', sqlQuote(col) + (index.multiEntry ? ', ' + escapeIndexNameForSQL(index.name) : ''), 'FROM', escapeStoreNameForSQL(index.objectStore.__currentName), 'WHERE', escapeIndexNameForSQL(index.name), 'NOT NULL'];

  /** @type {string[]} */
  const sqlValues = [];
  if (hasRange) {
    if (multiChecks) {
      sql.push('AND (');
      /** @type {import('./Key.js').KeyPathArray} */
      range.forEach((innerKey, i) => {
        if (i > 0) {
          sql.push('OR');
        }
        sql.push(escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^' ");
        sqlValues.push('%' + sqlLIKEEscape( /** @type {string} */encode$1(innerKey, index.multiEntry)) + '%');
      });
      sql.push(')');
    } else if (index.multiEntry) {
      sql.push('AND', escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^'");
      sqlValues.push('%' + sqlLIKEEscape( /** @type {string} */encode$1(range, index.multiEntry)) + '%');
    } else {
      const convertedRange = convertValueToKeyRange(range, nullDisallowed);
      setSQLForKeyRange(convertedRange, escapeIndexNameForSQL(index.name), sql, sqlValues, true, false);
    }
  }
  return [nullDisallowed, index, hasRange, range, opType, multiChecks, sql, sqlValues];
}

const readonlyProperties$1 = ['keyPath', 'indexNames', 'transaction', 'autoIncrement'];

/**
 * @typedef {number} Integer
 */

/**
 * IndexedDB Object Store.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBObjectStore
 * @class
 */
function IDBObjectStore() {
  throw new TypeError('Illegal constructor');
}
const IDBObjectStoreAlias = IDBObjectStore;

/**
 * @typedef {IDBObjectStore & {
 *   name: string,
 *   keyPath: import('./Key.js').KeyPath,
 *   transaction?: import('./IDBTransaction.js').IDBTransactionFull,
 *   indexNames: import('./DOMStringList.js').DOMStringListFull,
 *   autoIncrement: boolean,
 *   __autoIncrement: boolean,
 *   __indexes: {[key: string]: import('./IDBIndex.js').IDBIndexFull},
 *   __indexHandles: {[key: string]: import('./IDBIndex.js').IDBIndexFull},
 *   __indexNames: import('./DOMStringList.js').DOMStringListFull,
 *   __oldIndexNames: import('./DOMStringList.js').DOMStringListFull,
 *   __transaction?: import('./IDBTransaction.js').IDBTransactionFull,
 *   __name: string,
 *   __keyPath: import('./Key.js').KeyPath,
 *   __originalName: string,
 *   __currentName: string,
 *   __pendingName?: string,
 *   __pendingDelete?: boolean,
 *   __pendingCreate?: boolean,
 *   __deleted?: boolean,
 *   __cursors: (
 *     import('./IDBCursor.js').IDBCursorFull|
 *     import('./IDBCursor.js').IDBCursorWithValueFull
 *   )[],
 *   __idbdb: import('./IDBDatabase.js').IDBDatabaseFull,
 * }} IDBObjectStoreFull
 */

/**
 *
 * @param {import('./IDBDatabase.js').IDBObjectStoreProperties} storeProperties
 * @param {import('./IDBTransaction.js').IDBTransactionFull} [transaction]
 * @returns {IDBObjectStoreFull}
 */
IDBObjectStore.__createInstance = function (storeProperties, transaction) {
  /**
   * @class
   * @this {IDBObjectStoreFull}
   */
  function IDBObjectStore() {
    const me = this;
    // @ts-expect-error It's ok
    me[Symbol.toStringTag] = 'IDBObjectStore';
    defineReadonlyProperties(this, readonlyProperties$1);
    me.__name = me.__originalName = storeProperties.name;
    me.__keyPath = Array.isArray(storeProperties.keyPath) ? storeProperties.keyPath.slice() : storeProperties.keyPath;
    me.__transaction = transaction;
    me.__idbdb = storeProperties.idbdb;
    me.__cursors = storeProperties.cursors || [];

    // autoInc is numeric (0/1) on WinPhone
    me.__autoIncrement = Boolean(storeProperties.autoInc);
    me.__indexes = {};
    me.__indexHandles = {};
    me.__indexNames = DOMStringList.__createInstance();
    const {
      indexList
    } = storeProperties;
    for (const indexName in indexList) {
      if (Object.hasOwn(indexList, indexName)) {
        const index = IDBIndex.__createInstance(me, indexList[indexName]);
        me.__indexes[index.name] = index;
        if (!index.__deleted) {
          me.indexNames.push(index.name);
        }
      }
    }
    me.__oldIndexNames = me.indexNames.clone();
    Object.defineProperty(this, '__currentName', {
      get() {
        return '__pendingName' in this ? this.__pendingName : this.name;
      }
    });
    Object.defineProperty(this, 'name', {
      enumerable: false,
      configurable: false,
      /**
       * @this {IDBObjectStoreFull}
       * @returns {string}
       */
      get() {
        return this.__name;
      },
      /**
       * @param {string} name
       * @this {IDBObjectStoreFull}
       * @returns {void}
       */
      set(name) {
        const me = this;
        name = convertToDOMString(name);
        const oldName = me.name;
        IDBObjectStoreAlias.__invalidStateIfDeleted(me);
        IDBTransaction.__assertVersionChange(me.transaction);
        IDBTransaction.__assertActive(me.transaction);
        if (oldName === name) {
          return;
        }
        if (me.__idbdb.__objectStores[name] && !me.__idbdb.__objectStores[name].__pendingDelete) {
          throw createDOMException('ConstraintError', 'Object store "' + name + '" already exists in ' + me.__idbdb.name);
        }
        me.__name = name;
        const oldStore = me.__idbdb.__objectStores[oldName];
        oldStore.__name = name; // Fix old references
        me.__idbdb.__objectStores[name] = oldStore; // Ensure new reference accessible
        delete me.__idbdb.__objectStores[oldName]; // Ensure won't be found

        me.__idbdb.objectStoreNames.splice(me.__idbdb.objectStoreNames.indexOf(oldName), 1, name);
        const oldHandle = /** @type {IDBObjectStoreFull} */
        /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__storeHandles[oldName];
        oldHandle.__name = name; // Fix old references
        /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
        me.transaction.__storeHandles[name] = oldHandle; // Ensure new reference accessible

        me.__pendingName = oldName;
        const sql = 'UPDATE __sys__ SET "name" = ? WHERE "name" = ?';
        const sqlValues = [escapeSQLiteStatement(name), escapeSQLiteStatement(oldName)];
        if (CFG.DEBUG) {
          console.log(sql, sqlValues);
        }
        /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
        me.transaction.__addNonRequestToTransactionQueue(function objectStoreClear(tx, args, success, error) {
          tx.executeSql(sql, sqlValues, function (tx) {
            // This SQL preserves indexes per https://www.sqlite.org/lang_altertable.html
            const sql = 'ALTER TABLE ' + escapeStoreNameForSQL(oldName) + ' RENAME TO ' + escapeStoreNameForSQL(name);
            if (CFG.DEBUG) {
              console.log(sql);
            }
            tx.executeSql(sql, [], function () {
              delete me.__pendingName;
              success();
            });
          }, function (tx, err) {
            error(err);
            return false;
          });
        });
      }
    });
  }
  IDBObjectStore.prototype = IDBObjectStoreAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBObjectStore();
};

/**
 * Clones an IDBObjectStore instance for a different IDBTransaction instance.
 * @param {IDBObjectStoreFull} store
 * @param {import('./IDBTransaction.js').IDBTransactionFull} transaction
 * @returns {IDBObjectStoreFull}
 */
IDBObjectStore.__clone = function (store, transaction) {
  const newStore = IDBObjectStore.__createInstance({
    name: store.__currentName,
    keyPath: Array.isArray(store.keyPath) ? store.keyPath.slice() : store.keyPath,
    autoInc: store.autoIncrement,
    indexList: {},
    idbdb: store.__idbdb,
    cursors: store.__cursors
  }, transaction);

  /** @type {const} */
  ['__indexes', '__indexNames', '__oldIndexNames', '__deleted', '__pendingDelete', '__pendingCreate', '__originalName'].forEach(p => {
    // @ts-expect-error It's ok
    newStore[p] = store[p];
  });
  return newStore;
};

/**
 *
 * @param {IDBObjectStoreFull|import('./IDBIndex.js').IDBIndexFull} store
 * @param {string} [msg]
 * @throws {DOMException}
 * @returns {void}
 */
IDBObjectStore.__invalidStateIfDeleted = function (store, msg) {
  if (store.__deleted || store.__pendingDelete || store.__pendingCreate && 'transaction' in store && store.transaction && store.transaction.__errored) {
    throw createDOMException('InvalidStateError', msg || 'This store has been deleted');
  }
};

/**
 * Creates a new object store in the database.
 * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
 * @param {IDBObjectStoreFull} store
 * @returns {IDBObjectStore}
 */
IDBObjectStore.__createObjectStore = function (db, store) {
  // Add the object store to the IDBDatabase
  const storeName = store.__currentName;
  store.__pendingCreate = true;
  db.__objectStores[storeName] = store;
  db.objectStoreNames.push(storeName);

  // Add the object store to WebSQL
  const transaction = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  db.__versionTransaction;
  const storeHandles = transaction.__storeHandles;
  if (!storeHandles[storeName] ||
  // These latter conditions are to allow store
  //   recreation to create new clone object
  storeHandles[storeName].__pendingDelete || storeHandles[storeName].__deleted) {
    storeHandles[storeName] = IDBObjectStore.__clone(store, transaction);
  }
  transaction.__addNonRequestToTransactionQueue(function createObjectStore(tx, args, success, failure) {
    /**
     * @param {SQLTransaction} tx
     * @param {SQLError} [err]
     * @returns {boolean}
     */
    function error(tx, err) {
      if (CFG.DEBUG) {
        console.log(err);
      }
      failure(createDOMException('UnknownError', 'Could not create object store "' + storeName + '"', err));
      return false;
    }
    const escapedStoreNameSQL = escapeStoreNameForSQL(storeName);
    // key INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE
    const sql = ['CREATE TABLE', escapedStoreNameSQL, '(key BLOB', store.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY', ', value BLOB)'].join(' ');
    if (CFG.DEBUG) {
      console.log(sql);
    }
    tx.executeSql(sql, [], function (tx) {
      /**
       * @returns {void}
       */
      function insertStoreInfo() {
        const encodedKeyPath = JSON.stringify(store.keyPath);
        tx.executeSql('INSERT INTO __sys__ VALUES (?,?,?,?,?)', [escapeSQLiteStatement(storeName), encodedKeyPath,
        // For why converting here, see comment and following
        //  discussion at:
        //  https://github.com/axemclion/IndexedDBShim/issues/313#issuecomment-590086778
        Number(store.autoIncrement), '{}', 1], function () {
          delete store.__pendingCreate;
          delete store.__deleted;
          success(store);
        }, error);
      }
      if (!CFG.useSQLiteIndexes) {
        insertStoreInfo();
        return;
      }
      tx.executeSql('CREATE INDEX IF NOT EXISTS ' + sqlQuote('sk_' + escapedStoreNameSQL.slice(1, -1)) + ' ON ' + escapedStoreNameSQL + '("key")', [], insertStoreInfo, error);
    }, error);
  });
  return storeHandles[storeName];
};

/**
 * Deletes an object store from the database.
 * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @returns {void}
 */
IDBObjectStore.__deleteObjectStore = function (db, store) {
  // Remove the object store from the IDBDatabase
  store.__pendingDelete = true;
  // We don't delete the other index holders in case need reversion
  store.__indexNames = DOMStringList.__createInstance();
  db.objectStoreNames.splice(db.objectStoreNames.indexOf(store.__currentName), 1);
  const storeHandle = db.__versionTransaction.__storeHandles[store.__currentName];
  if (storeHandle) {
    storeHandle.__indexNames = DOMStringList.__createInstance();
    storeHandle.__pendingDelete = true;
  }

  // Remove the object store from WebSQL
  const transaction = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  db.__versionTransaction;
  transaction.__addNonRequestToTransactionQueue(function deleteObjectStore(tx, args, success, failure) {
    /**
     * @param {SQLTransaction} tx
     * @param {SQLError} [err]
     * @returns {boolean}
     */
    function error(tx, err) {
      if (CFG.DEBUG) {
        console.log(err);
      }
      failure(createDOMException('UnknownError', 'Could not delete ObjectStore', err));
      return false;
    }
    tx.executeSql('SELECT "name" FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function (tx, data) {
      if (data.rows.length > 0) {
        tx.executeSql('DROP TABLE ' + escapeStoreNameForSQL(store.__currentName), [], function () {
          tx.executeSql('DELETE FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function () {
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

/**
 * @typedef {[import('./Key.js').Key, import('./Key.js').Value]} KeyValueArray
 */

// Todo: Although we may end up needing to do cloning genuinely asynchronously (for Blobs and FileLists),
//   and we'll want to ensure the queue starts up synchronously, we nevertheless do the cloning
//   before entering the queue and its callback since the encoding we do is preceded by validation
//   which we must do synchronously anyways. If we reimplement Blobs and FileLists asynchronously,
//   we can detect these types (though validating synchronously as possible) and once entering the
//   queue callback, ensure they load before triggering success or failure (perhaps by returning and
//   a `SyncPromise` from the `Sca.clone` operation and later detecting and ensuring it is resolved
//   before continuing).
/**
 * Determines whether the given inline or out-of-line key is valid,
 *   according to the object store's schema.
 * @param {import('./Key.js').Value} value Used for inline keys
 * @param {import('./Key.js').Key} key Used for out-of-line keys
 * @param {boolean} cursorUpdate
 * @throws {DOMException}
 * @this {IDBObjectStoreFull}
 * @returns {KeyValueArray}
 */
IDBObjectStore.prototype.__validateKeyAndValueAndCloneValue = function (value, key, cursorUpdate) {
  const me = this;
  if (me.keyPath !== null) {
    if (key !== undefined) {
      throw createDOMException('DataError', 'The object store uses in-line keys and the key parameter was provided');
    }
    // Todo Binary: Avoid blobs loading async to ensure cloning (and errors therein)
    //   occurs sync; then can make cloning and this method without callbacks (except where ok
    //   to be async)
    const clonedValue = clone(value);
    key = extractKeyValueDecodedFromValueUsingKeyPath(clonedValue, me.keyPath); // May throw so "rethrow"
    if (key.invalid) {
      throw createDOMException('DataError', 'KeyPath was specified, but key was invalid.');
    }
    if (key.failure) {
      if (!cursorUpdate) {
        if (!me.autoIncrement) {
          throw createDOMException('DataError', 'Could not evaluate a key from keyPath and there is no key generator');
        }
        // Todo: Could the keyPath not be an array?
        if (!checkKeyCouldBeInjectedIntoValue(clonedValue, /** @type {string} */me.keyPath)) {
          throw createDOMException('DataError', 'A key could not be injected into a value');
        }
        // A key will be generated
        return [undefined, clonedValue];
      }
      throw createDOMException('DataError', 'Could not evaluate a key from keyPath');
    }
    // An `IDBCursor.update` call will also throw if not equal to the cursor’s effective key
    return [key.value, clonedValue];
  }
  if (key === undefined) {
    if (!me.autoIncrement) {
      throw createDOMException('DataError', 'The object store uses out-of-line keys and has no key generator and the key parameter was not provided.');
    }
    // A key will be generated
    key = undefined;
  } else {
    convertValueToKeyRethrowingAndIfInvalid(key);
  }
  const clonedValue = clone(value);
  return [key, clonedValue];
};

/**
 * From the store properties and object, extracts the value for the key in
 *   the object store
 * If the table has auto increment, get the current number (unless it has
 *   a keyPath leading to a valid but non-numeric or < 1 key).
 * @param {SQLTransaction} tx
 * @param {import('./Key.js').Value} value
 * @param {import('./Key.js').Key} key
 * @param {(key: import('./Key.js').Key, cn?: Integer) => void} success
 * @param {import('./Key.js').SQLFailureCallback} failCb
 * @this {IDBObjectStoreFull}
 * @returns {void}
 */
IDBObjectStore.prototype.__deriveKey = function (tx, value, key, success, failCb) {
  const me = this;

  // Only run if cloning is needed
  /**
   * @param {Integer} [oldCn]
   * @returns {void}
   */
  function keyCloneThenSuccess(oldCn) {
    // We want to return the original key, so we don't need to accept an argument here
    encode(key, function (key) {
      key = decode(key);
      success(key, oldCn);
    });
  }
  if (me.autoIncrement) {
    // If auto-increment and no valid primaryKey found on the keyPath, get and set the new value, and use
    if (key === undefined) {
      // @ts-expect-error Due to re-exporting `Key.d.ts` file (needed for `node_modules` imports)
      generateKeyForStore(tx, me, function (failure, key, oldCn) {
        if (failure) {
          failCb(createDOMException('ConstraintError', 'The key generator\'s current number has reached the maximum safe integer limit'));
          return;
        }
        if (me.keyPath !== null) {
          // Should not throw now as checked earlier
          // Todo: Could this not be an array here?
          injectKeyIntoValueUsingKeyPath(value, key, /** @type {string} */me.keyPath);
        }
        success(key, oldCn);
      }, failCb);
    } else {
      // @ts-expect-error Due to re-exporting `Key.d.ts` file (needed for `node_modules` imports)
      possiblyUpdateKeyGenerator(tx, me, key, keyCloneThenSuccess, failCb);
    }
    // Not auto-increment
  } else {
    keyCloneThenSuccess();
  }
};

/**
 *
 * @param {SQLTransaction} tx
 * @param {string} encoded
 * @param {import('./Key.js').Value} value
 * @param {import('./Key.js').Key|Integer} clonedKeyOrCurrentNumber
 * @param {Integer|undefined} oldCn
 * @param {(
 *   clonedKeyOrCurrentNumber: import('./Key.js').Key|Integer
 * ) => void} success
 * @param {(err: Error|DOMException) => void} error
 * @this {IDBObjectStoreFull}
 * @returns {SyncPromise}
 */
IDBObjectStore.prototype.__insertData = function (tx, encoded, value, clonedKeyOrCurrentNumber, oldCn, success, error) {
  const me = this;
  // The `ConstraintError` to occur for `add` upon a duplicate will occur naturally in attempting an insert
  // We process the index information first as it will stored in the same table as the store
  /** @type {{[key: string]: string}} */
  const paramMap = {};
  const indexPromises = Object.keys(
  // We do not iterate `indexNames` as those can be modified synchronously (e.g.,
  //   `deleteIndex` could, by its synchronous removal from `indexNames`, prevent
  //   iteration here of an index though per IndexedDB test
  //   `idbobjectstore_createIndex4-deleteIndex-event_order.js`, `createIndex`
  //   should be allowed to first fail even in such a case).
  me.__indexes).map(indexName => {
    // While this may sometimes resolve sync and sometimes async, the
    //   idea is to avoid, where possible, unnecessary delays (and
    //   consuming code ought to only see a difference in the browser
    //   where we can't control the transaction timeout anyways).
    return new SyncPromise((resolve, reject) => {
      const index = me.__indexes[indexName];
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
        resolve(undefined);
        return;
      }
      /**
       * @type {import('./Key.js').KeyValueObject|
       *   import('./Key.js').KeyPathEvaluateValue}
       */
      let indexKey;
      try {
        indexKey = extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Add as necessary to this and skip past this index if exceptions here)
        if ('invalid' in indexKey && indexKey.invalid || 'failure' in indexKey && indexKey.failure) {
          throw new Error('Go to catch');
        }
      } catch (err) {
        resolve(undefined);
        return;
      }
      indexKey = indexKey.value;
      /**
       * @param {import('./IDBIndex.js').IDBIndexFull} index
       * @returns {void}
       */
      function setIndexInfo(index) {
        if (indexKey === undefined) {
          return;
        }
        paramMap[index.__currentName] = /** @type {string} */
        encode$1(indexKey, index.multiEntry);
      }
      if (index.unique) {
        const multiCheck = index.multiEntry && Array.isArray(indexKey);
        const fetchArgs = buildFetchIndexDataSQL(true, index, indexKey, 'key', multiCheck);
        executeFetchIndexData(null, ...fetchArgs, tx, null, function success(key) {
          if (key === undefined) {
            setIndexInfo(index);
            resolve(undefined);
            return;
          }
          reject(createDOMException('ConstraintError', 'Index already contains a record equal to ' + (multiCheck ? 'one of the subkeys of' : '') + '`indexKey`'));
        }, reject);
      } else {
        setIndexInfo(index);
        resolve(undefined);
      }
    });
  });
  return SyncPromise.all(indexPromises).then(() => {
    const sqlStart = ['INSERT INTO', escapeStoreNameForSQL(me.__currentName), '('];
    const sqlEnd = [' VALUES ('];
    const insertSqlValues = [];
    if (clonedKeyOrCurrentNumber !== undefined) {
      // Key.convertValueToKey(primaryKey); // Already run
      sqlStart.push(sqlQuote('key'), ',');
      sqlEnd.push('?,');
      insertSqlValues.push(escapeSQLiteStatement( /** @type {string} */encode$1(clonedKeyOrCurrentNumber)));
    }
    Object.entries(paramMap).forEach(([key, stmt]) => {
      sqlStart.push(escapeIndexNameForSQL(key) + ',');
      sqlEnd.push('?,');
      insertSqlValues.push(escapeSQLiteStatement(stmt));
    });
    // removing the trailing comma
    sqlStart.push(sqlQuote('value') + ' )');
    sqlEnd.push('?)');
    insertSqlValues.push(escapeSQLiteStatement(encoded));
    const insertSql = sqlStart.join(' ') + sqlEnd.join(' ');
    if (CFG.DEBUG) {
      console.log('SQL for adding', insertSql, insertSqlValues);
    }
    tx.executeSql(insertSql, insertSqlValues, function () {
      success(clonedKeyOrCurrentNumber);
    }, function (tx, err) {
      // Should occur for `add` operation
      error(createDOMException('ConstraintError', /** @type {string} */err.message, err));
      return false;
    });
    return undefined;
  }).catch(function (err) {
    /**
     * @returns {void}
     */
    function fail() {
      // Todo: Add a different error object here if `assignCurrentNumber`
      //  fails in reverting?
      error(err);
    }
    if (typeof oldCn === 'number') {
      // @ts-expect-error Due to re-exporting `Key.d.ts` file (needed for `node_modules` imports)
      assignCurrentNumber(tx, me, oldCn, fail, fail);
      return null;
    }
    fail();
    return null;
  });
};

/**
 *
 * @param {import('./Key.js').Value} value
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.add = function (value /* , key */) {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const key = arguments[1];
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No value was specified');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.transaction.__assertWritable();
  const request = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__createRequest(me);
  const [ky, clonedValue] = me.__validateKeyAndValueAndCloneValue(value, key, false);
  IDBObjectStore.__storingRecordObjectStore(request, me, true, clonedValue, true, ky);
  return request;
};

/**
 *
 * @param {import('./Key.js').Value} value
 * @throws {TypeError}
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.put = function (value /* , key */) {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const key = arguments[1];
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No value was specified');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.transaction.__assertWritable();
  const request = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__createRequest(me);
  const [ky, clonedValue] = me.__validateKeyAndValueAndCloneValue(value, key, false);
  IDBObjectStore.__storingRecordObjectStore(request, me, true, clonedValue, false, ky);
  return request;
};

/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./Key.js').Key} key
 * @param {(tx: SQLTransaction) => void} cb
 * @param {(err: SQLError) => void} error
 * @this {IDBObjectStoreFull}
 * @returns {void}
 */
IDBObjectStore.prototype.__overwrite = function (tx, key, cb, error) {
  const me = this;
  // First try to delete if the record exists
  // Key.convertValueToKey(key); // Already run
  const sql = 'DELETE FROM ' + escapeStoreNameForSQL(me.__currentName) + ' WHERE "key" = ?';
  const encodedKey = /** @type {string} */encode$1(key);
  tx.executeSql(sql, [escapeSQLiteStatement(encodedKey)], function (tx, data) {
    if (CFG.DEBUG) {
      console.log('Did the row with the', key, 'exist?', data.rowsAffected);
    }
    cb(tx);
  }, function (tx, err) {
    error(err);
    return false;
  });
};

/**
 *
 * @param {import('./IDBRequest.js').IDBRequestFull} request
 * @param {IDBObjectStoreFull} store
 * @param {boolean} invalidateCache
 * @param {import('./Key.js').Value} value
 * @param {boolean} noOverwrite
 * @returns {void}
 */
IDBObjectStore.__storingRecordObjectStore = function (request, store, invalidateCache, value, noOverwrite /* , key */) {
  // eslint-disable-next-line prefer-rest-params
  const key = arguments[5];
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  store.transaction.__pushToQueue(request, function (tx, args, success, error) {
    store.__deriveKey(tx, value, key, function (clonedKeyOrCurrentNumber, oldCn) {
      encode(value, function (encoded) {
        /**
         * @param {SQLTransaction} tx
         * @returns {void}
         */
        function insert(tx) {
          store.__insertData(tx, encoded, value, clonedKeyOrCurrentNumber, oldCn, function (...args) {
            if (invalidateCache) {
              store.__cursors.forEach(cursor => {
                cursor.__invalidateCache();
              });
            }
            success(...args);
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

/**
 *
 * @param {import('./Key.js').Value} query
 * @param {boolean} [getKey]
 * @param {boolean} [getAll]
 * @param {Integer} [count]
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.__get = function (query, getKey, getAll, count) {
  const me = this;
  if (count !== undefined) {
    count = enforceRange(count, 'unsigned long');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  const range = convertValueToKeyRange(query, !getAll);
  const col = getKey ? 'key' : 'value';
  const sql = ['SELECT', sqlQuote(col), 'FROM', escapeStoreNameForSQL(me.__currentName)];
  /** @type {string[]} */
  const sqlValues = [];
  if (range !== undefined) {
    sql.push('WHERE');
    setSQLForKeyRange(range, sqlQuote('key'), sql, sqlValues);
  }
  if (!getAll) {
    count = 1;
  }
  if (count) {
    if (!Number.isFinite(count)) {
      throw new TypeError('The count parameter must be a finite number');
    }
    sql.push('LIMIT', String(count));
  }
  const sqlStr = sql.join(' ');
  return /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__addToTransactionQueue(function objectStoreGet(tx, args, success, error) {
    if (CFG.DEBUG) {
      console.log('Fetching', me.__currentName, sqlValues);
    }
    tx.executeSql(sqlStr, sqlValues, function (tx, data) {
      if (CFG.DEBUG) {
        console.log('Fetched data', data);
      }
      let ret;
      try {
        // Opera can't deal with the try-catch here.
        if (data.rows.length === 0) {
          if (getAll) {
            success([]);
          } else {
            success();
          }
          return;
        }
        ret = [];
        if (getKey) {
          for (let i = 0; i < data.rows.length; i++) {
            // Key.convertValueToKey(data.rows.item(i).key); // Already validated before storage
            ret.push(decode$1(unescapeSQLiteResponse(data.rows.item(i).key), false));
          }
        } else {
          for (let i = 0; i < data.rows.length; i++) {
            ret.push(decode(unescapeSQLiteResponse(data.rows.item(i).value)));
          }
        }
        if (!getAll) {
          ret = ret[0];
        }
      } catch (e) {
        // If no result is returned, or error occurs when parsing JSON
        if (CFG.DEBUG) {
          console.log(e);
        }
      }
      success(ret);
    }, function (tx, err) {
      error(err);
      return false;
    });
  }, undefined, me);
};

/**
 *
 * @param {import('./Key.js').Value} query
 * @throws {TypeError}
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.get = function (query) {
  if (!arguments.length) {
    throw new TypeError('A parameter was missing for `IDBObjectStore.get`.');
  }
  return this.__get(query);
};

/**
 *
 * @param {import('./Key.js').Value} query
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.getKey = function (query) {
  if (!arguments.length) {
    throw new TypeError('A parameter was missing for `IDBObjectStore.getKey`.');
  }
  return this.__get(query, true);
};

/**
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.getAll = function /* query, count */
() {
  // eslint-disable-next-line prefer-rest-params
  const [query, count] = arguments;
  return this.__get(query, false, true, count);
};

/**
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.getAllKeys = function /* query, count */
() {
  // eslint-disable-next-line prefer-rest-params
  const [query, count] = arguments;
  return this.__get(query, true, true, count);
};

/**
 *
 * @param {import('./Key.js').Value} query
 * @throws {TypeError}
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.delete = function (query) {
  const me = this;
  if (!(this instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  if (!arguments.length) {
    throw new TypeError('A parameter was missing for `IDBObjectStore.delete`.');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.transaction.__assertWritable();
  const range = convertValueToKeyRange(query, true);
  const sqlArr = ['DELETE FROM', escapeStoreNameForSQL(me.__currentName), 'WHERE'];
  /** @type {string[]} */
  const sqlValues = [];
  setSQLForKeyRange(range, sqlQuote('key'), sqlArr, sqlValues);
  const sql = sqlArr.join(' ');
  return /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__addToTransactionQueue(function objectStoreDelete(tx, args, success, error) {
    if (CFG.DEBUG) {
      console.log('Deleting', me.__currentName, sqlValues);
    }
    tx.executeSql(sql, sqlValues, function (tx, data) {
      if (CFG.DEBUG) {
        console.log('Deleted from database', data.rowsAffected);
      }
      me.__cursors.forEach(cursor => {
        cursor.__invalidateCache(); // Delete
      });
      success();
    }, function (tx, err) {
      error(err);
      return false;
    });
  }, undefined, me);
};

/**
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.clear = function () {
  const me = this;
  if (!(this instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.transaction.__assertWritable();
  return /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__addToTransactionQueue(function objectStoreClear(tx, args, success, error) {
    tx.executeSql('DELETE FROM ' + escapeStoreNameForSQL(me.__currentName), [], function (tx, data) {
      if (CFG.DEBUG) {
        console.log('Cleared all records from database', data.rowsAffected);
      }
      me.__cursors.forEach(cursor => {
        cursor.__invalidateCache(); // Clear
      });
      success();
    }, function (tx, err) {
      error(err);
      return false;
    });
  }, undefined, me);
};

/**
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.count = function /* query */
() {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const query = arguments[0];
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);

  // We don't need to add to cursors array since has the count parameter which won't cache
  return IDBCursorWithValue.__createInstance(query, 'next', me, me, 'key', 'value', true).__request;
};

/**
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.openCursor = function /* query, direction */
() {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  const [query, direction] = arguments;
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  const cursor = IDBCursorWithValue.__createInstance(query, direction, me, me, 'key', 'value');
  me.__cursors.push(cursor);
  return cursor.__request;
};

/**
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBRequest.js').IDBRequestFull}
 */
IDBObjectStore.prototype.openKeyCursor = function /* query, direction */
() {
  const me = this;
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  // eslint-disable-next-line prefer-rest-params
  const [query, direction] = arguments;
  const cursor = IDBCursor.__createInstance(query, direction, me, me, 'key', 'key');
  me.__cursors.push(cursor);
  return cursor.__request;
};

/**
 *
 * @param {string} indexName
 * @this {IDBObjectStoreFull}
 * @returns {import('./IDBIndex.js').IDBIndexFull}
 */
IDBObjectStore.prototype.index = function (indexName) {
  const me = this;
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No index name was specified');
  }
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertNotFinished(me.transaction);
  const index = me.__indexes[indexName];
  if (!index || index.__deleted) {
    throw createDOMException('NotFoundError', 'Index "' + indexName + '" does not exist on ' + me.__currentName);
  }
  if (!me.__indexHandles[indexName] || me.__indexes[indexName].__pendingDelete || me.__indexes[indexName].__deleted) {
    me.__indexHandles[indexName] = IDBIndex.__clone(index, me);
  }
  return me.__indexHandles[indexName];
};

/**
 * Creates a new index on the object store.
 * @param {string} indexName
 * @param {string|string[]} keyPath
 * @this {IDBObjectStoreFull}
 * @returns {IDBIndex}
 */
IDBObjectStore.prototype.createIndex = function (indexName, keyPath /* , optionalParameters */) {
  const me = this;
  // eslint-disable-next-line prefer-rest-params
  let optionalParameters = arguments[2];
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
  IDBTransaction.__assertVersionChange(me.transaction);
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  if (me.__indexes[indexName] && !me.__indexes[indexName].__deleted && !me.__indexes[indexName].__pendingDelete) {
    throw createDOMException('ConstraintError', 'Index "' + indexName + '" already exists on ' + me.__currentName);
  }
  keyPath = convertToSequenceDOMString(keyPath);
  if (!isValidKeyPath(keyPath)) {
    throw createDOMException('SyntaxError', 'A valid keyPath must be supplied');
  }
  if (Array.isArray(keyPath) && optionalParameters && optionalParameters.multiEntry) {
    throw createDOMException('InvalidAccessError', 'The keyPath argument was an array and the multiEntry option is true.');
  }
  optionalParameters = optionalParameters || {};
  /** @type {import('./IDBIndex.js').IDBIndexProperties} */
  const indexProperties = {
    columnName: indexName,
    keyPath,
    optionalParams: {
      unique: Boolean(optionalParameters.unique),
      multiEntry: Boolean(optionalParameters.multiEntry)
    }
  };
  const index = IDBIndex.__createInstance(me, indexProperties);
  IDBIndex.__createIndex(me, index);
  return index;
};

/**
 *
 * @param {string} name
 * @this {IDBObjectStoreFull}
 * @returns {void}
 */
IDBObjectStore.prototype.deleteIndex = function (name) {
  const me = this;
  if (!(me instanceof IDBObjectStore)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No index name was specified');
  }
  IDBTransaction.__assertVersionChange(me.transaction);
  IDBObjectStore.__invalidStateIfDeleted(me);
  IDBTransaction.__assertActive(me.transaction);
  const index = me.__indexes[name];
  if (!index) {
    throw createDOMException('NotFoundError', 'Index "' + name + '" does not exist on ' + me.__currentName);
  }
  IDBIndex.__deleteIndex(me, index);
};
defineReadonlyOuterInterface(IDBObjectStore.prototype, readonlyProperties$1);
defineOuterInterface(IDBObjectStore.prototype, ['name']);
IDBObjectStore.prototype[Symbol.toStringTag] = 'IDBObjectStorePrototype';
Object.defineProperty(IDBObjectStore, 'prototype', {
  writable: false
});

const listeners = ['onabort', 'onclose', 'onerror', 'onversionchange'];
const readonlyProperties = ['name', 'version', 'objectStoreNames'];

/**
 * @typedef {{
 *   name: string,
 *   keyPath: import('./Key.js').KeyPath,
 *   autoInc: boolean,
 *   indexList: {[key: string]: import('./IDBIndex.js').IDBIndexProperties},
 *   idbdb: IDBDatabaseFull,
 *   cursors?: (import('./IDBCursor.js').IDBCursorFull|
 *     import('./IDBCursor.js').IDBCursorWithValueFull)[],
 * }} IDBObjectStoreProperties
 */

/**
 * IDB Database Object.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#database-interface
 * @class
 */
function IDBDatabase() {
  this.__versionTransaction = null;
  this.__objectStores = null;
  throw new TypeError('Illegal constructor');
}
const IDBDatabaseAlias = IDBDatabase;

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {IDBDatabase & EventTarget & {
 *   createObjectStore: (storeName: string) => IDBObjectStore,
 *   deleteObjectStore: (storeName: string) => void,
 *   close: () => void,
 *   transaction: (storeNames: string|string[], mode: string) => IDBTransaction,
 *   throwIfUpgradeTransactionNull: () => void,
 *   objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
 *   name: string,
 *   __forceClose: (msg: string) => void,
 *   __db: import('websql-configurable/lib/websql/WebSQLDatabase.js').default,
 *   __oldVersion: Integer,
 *   __version: Integer,
 *   __name: string,
 *   __upgradeTransaction: null|import('./IDBTransaction.js').IDBTransactionFull,
 *   __versionTransaction: import('./IDBTransaction.js').IDBTransactionFull,
 *   __transactions: import('./IDBTransaction.js').IDBTransactionFull[],
 *   __objectStores: {[key: string]: IDBObjectStore},
 *   __objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
 *   __oldObjectStoreNames: import('./DOMStringList.js').DOMStringListFull,
 *   __unblocking: {
 *     check: () => void
 *   }
 * }} IDBDatabaseFull
 */

/**
 * @param {import('websql-configurable').default} db
 * @param {string} name
 * @param {Integer} oldVersion
 * @param {Integer} version
 * @param {SQLResultSet} storeProperties
 * @returns {IDBDatabaseFull}
 */
IDBDatabase.__createInstance = function (db, name, oldVersion, version, storeProperties) {
  /**
   * @class
   * @this {IDBDatabaseFull}
   */
  function IDBDatabase() {
    // @ts-expect-error It's ok
    this[Symbol.toStringTag] = 'IDBDatabase';
    defineReadonlyProperties(this, readonlyProperties);
    this.__db = db;
    this.__closePending = false;
    this.__oldVersion = oldVersion;
    this.__version = version;
    this.__name = name;
    this.__upgradeTransaction = null;
    defineListenerProperties(this, listeners);
    // @ts-expect-error Part of `ShimEventTarget`
    this.__setOptions({
      legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
    });
    this.__transactions = [];

    /** @type {{[key: string]: IDBObjectStore}} */
    this.__objectStores = {};
    this.__objectStoreNames = DOMStringList.__createInstance();

    /**
     * @type {IDBObjectStoreProperties}
     */
    const itemCopy = {};
    for (let i = 0; i < storeProperties.rows.length; i++) {
      const item = storeProperties.rows.item(i);
      // Safari implements `item` getter return object's properties
      //  as readonly, so we copy all its properties (except our
      //  custom `currNum` which we don't need) onto a new object
      itemCopy.name = item.name;
      itemCopy.keyPath = JSON.parse(item.keyPath);
      // Though `autoInc` is coming from the database as a NUMERIC
      // type (how SQLite stores BOOLEAN set in CREATE TABLE),
      // and should thus be parsed into a number here (0 or 1),
      // `IDBObjectStore.__createInstance` will convert to a boolean
      // when setting the store's `autoIncrement`.
      /** @type {const} */
      ['autoInc', 'indexList'].forEach(prop => {
        itemCopy[prop] = JSON.parse(item[prop]);
      });
      itemCopy.idbdb = this;
      const store = IDBObjectStore.__createInstance(itemCopy);
      this.__objectStores[store.name] = store;
      this.objectStoreNames.push(store.name);
    }
    this.__oldObjectStoreNames = this.objectStoreNames.clone();
  }
  IDBDatabase.prototype = IDBDatabaseAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBDatabase();
};

// @ts-expect-error It's ok
IDBDatabase.prototype = EventTargetFactory.createInstance();
IDBDatabase.prototype[Symbol.toStringTag] = 'IDBDatabasePrototype';

/**
 * Creates a new object store.
 * @param {string} storeName
 * @this {IDBDatabaseFull}
 * @returns {IDBObjectStore}
 */
IDBDatabase.prototype.createObjectStore = function (storeName /* , createOptions */) {
  // eslint-disable-next-line prefer-rest-params
  let createOptions = arguments[1];
  storeName = String(storeName); // W3C test within IDBObjectStore.js seems to accept string conversion
  if (!(this instanceof IDBDatabase)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No object store name was specified');
  }
  IDBTransaction.__assertVersionChange(this.__versionTransaction); // this.__versionTransaction may not exist if called mistakenly by user in onsuccess
  this.throwIfUpgradeTransactionNull();
  IDBTransaction.__assertActive(this.__versionTransaction);
  createOptions = {
    ...createOptions
  };
  let {
    keyPath
  } = createOptions;
  keyPath = keyPath === undefined ? null : convertToSequenceDOMString(keyPath);
  if (keyPath !== null && !isValidKeyPath(keyPath)) {
    throw createDOMException('SyntaxError', 'The keyPath argument contains an invalid key path.');
  }
  if (this.__objectStores[storeName] && !this.__objectStores[storeName].__pendingDelete) {
    throw createDOMException('ConstraintError', 'Object store "' + storeName + '" already exists in ' + this.name);
  }
  const autoInc = createOptions.autoIncrement;
  if (autoInc && (keyPath === '' || Array.isArray(keyPath))) {
    throw createDOMException('InvalidAccessError', 'With autoIncrement set, the keyPath argument must not be an array or empty string.');
  }

  /** @type {IDBObjectStoreProperties} */
  const storeProperties = {
    name: storeName,
    keyPath,
    autoInc,
    indexList: {},
    idbdb: this
  };
  const store = IDBObjectStore.__createInstance(storeProperties, this.__versionTransaction);
  return IDBObjectStore.__createObjectStore(this, store);
};

/**
 * Deletes an object store.
 * @param {string} storeName
 * @throws {TypeError|DOMException}
 * @this {IDBDatabaseFull}
 * @returns {void}
 */
IDBDatabase.prototype.deleteObjectStore = function (storeName) {
  if (!(this instanceof IDBDatabase)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('No object store name was specified');
  }
  IDBTransaction.__assertVersionChange(this.__versionTransaction);
  this.throwIfUpgradeTransactionNull();
  IDBTransaction.__assertActive(this.__versionTransaction);
  const store = this.__objectStores[storeName];
  if (!store) {
    throw createDOMException('NotFoundError', 'Object store "' + storeName + '" does not exist in ' + this.name);
  }
  IDBObjectStore.__deleteObjectStore(this, store);
};

/**
 * @throws {TypeError}
 * @this {IDBDatabaseFull}
 * @returns {void}
 */
IDBDatabase.prototype.close = function () {
  if (!(this instanceof IDBDatabase)) {
    throw new TypeError('Illegal invocation');
  }
  this.__closePending = true;
  if (this.__unblocking) {
    this.__unblocking.check();
  }
};

/**
 * Starts a new transaction.
 * @param {string|string[]} storeNames
 * @this {IDBDatabaseFull}
 * @returns {import('./IDBTransaction.js').IDBTransactionFull}
 */
IDBDatabase.prototype.transaction = function (storeNames /* , mode */) {
  if (arguments.length === 0) {
    throw new TypeError('You must supply a valid `storeNames` to `IDBDatabase.transaction`');
  }
  // eslint-disable-next-line prefer-rest-params
  let mode = arguments[1];
  storeNames = isIterable(storeNames)
  // Creating new array also ensures sequence is passed by value: https://heycam.github.io/webidl/#idl-sequence
  ? [...new Set(
  // to be unique
  convertToSequenceDOMString(storeNames) // iterables have `ToString` applied (and we convert to array for convenience)
  )].sort() // must be sorted
  : [convertToDOMString(storeNames)];

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
  mode = mode || 'readonly';
  IDBTransaction.__assertNotVersionChange(this.__versionTransaction);
  if (this.__closePending) {
    throw createDOMException('InvalidStateError', 'An attempt was made to start a new transaction on a database connection that is not open');
  }
  const objectStoreNames = DOMStringList.__createInstance();
  storeNames.forEach(storeName => {
    if (!this.objectStoreNames.contains(storeName)) {
      throw createDOMException('NotFoundError', 'The "' + storeName + '" object store does not exist');
    }
    objectStoreNames.push(storeName);
  });
  if (storeNames.length === 0) {
    throw createDOMException('InvalidAccessError', 'No valid object store names were specified');
  }
  if (mode !== 'readonly' && mode !== 'readwrite') {
    throw new TypeError('Invalid transaction mode: ' + mode);
  }

  // Do not set transaction state to "inactive" yet (will be set after
  //   timeout on creating transaction instance):
  //   https://github.com/w3c/IndexedDB/issues/87
  const trans = IDBTransaction.__createInstance(this, objectStoreNames, mode);
  this.__transactions.push(trans);
  return trans;
};

/**
 * @see https://github.com/w3c/IndexedDB/issues/192
 * @throws {DOMException}
 * @this {IDBDatabaseFull}
 * @returns {void}
 */
IDBDatabase.prototype.throwIfUpgradeTransactionNull = function () {
  if (this.__upgradeTransaction === null) {
    throw createDOMException('InvalidStateError', 'No upgrade transaction associated with database.');
  }
};

// Todo __forceClose: Add tests for `__forceClose`
/**
 *
 * @param {string} msg
 * @this {IDBDatabaseFull}
 * @returns {void}
 */
IDBDatabase.prototype.__forceClose = function (msg) {
  const me = this;
  me.close();
  let ct = 0;
  me.__transactions.forEach(function (trans) {
    // eslint-disable-next-line camelcase -- Clear API
    trans.on__abort = function () {
      ct++;
      if (ct === me.__transactions.length) {
        // Todo __forceClose: unblock any pending `upgradeneeded` or `deleteDatabase` calls
        const evt = createEvent('close');
        setTimeout(() => {
          me.dispatchEvent(evt);
        });
      }
    };
    trans.__abortTransaction(createDOMException('AbortError', 'The connection was force-closed: ' + (msg || '')));
  });
};
defineOuterInterface(IDBDatabase.prototype, listeners);
defineReadonlyOuterInterface(IDBDatabase.prototype, readonlyProperties);
Object.defineProperty(IDBDatabase.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: IDBDatabase
});
Object.defineProperty(IDBDatabase, 'prototype', {
  writable: false
});

/**
 * @typedef {number} Integer
 */

/**
 * @callback DatabaseDeleted
 * @returns {void}
 */

/** @type {import('./CFG.js').FSApi} */
let fs;

/**
 * @param {import('./CFG.js').FSApi} _fs
 * @returns {void}
 */
const setFS = _fs => {
  fs = _fs;
};

/**
 * @returns {string}
 */
const getOrigin = () => {
  return typeof location !== 'object' || !location ? 'null' : location.origin;
};
const hasNullOrigin = () => CFG.checkOrigin !== false && getOrigin() === 'null';

// Todo: This really should be process and tab-independent so the
//  origin could vary; in the browser, this might be through a
//  `SharedWorker`

/**
 * @type {{
 *   [key: string]: {
 *     [key: string]: {
 *       req: import('./IDBRequest.js').IDBOpenDBRequestFull,
 *       cb: (req: import('./IDBRequest.js').IDBRequestFull) => void,
 *     }[]
 *   }
 * }}
 */
const connectionQueue = {};

/**
 * @param {string} name
 * @param {string} origin
 * @returns {void}
 */
function processNextInConnectionQueue(name, origin = getOrigin()) {
  const queueItems = connectionQueue[origin][name];
  if (!queueItems[0]) {
    // Nothing left to process
    return;
  }
  const {
    req,
    cb
  } = queueItems[0]; // Keep in queue to prevent continuation

  /**
   * @returns {void}
   */
  function removeFromQueue() {
    queueItems.shift();
    processNextInConnectionQueue(name, origin);
  }
  req.addEventListener('success', removeFromQueue);
  req.addEventListener('error', removeFromQueue);
  cb(req);
}

/* eslint-disable default-param-last */
/**
 * @param {import('./IDBRequest.js').IDBOpenDBRequestFull} req
 * @param {string} name
 * @param {string} origin
 * @param {(req: import('./IDBRequest.js').IDBOpenDBRequestFull) => void} cb
 * @returns {void}
 */
function addRequestToConnectionQueue(req, name, origin = getOrigin(), cb) {
  /* eslint-enable default-param-last */
  if (!connectionQueue[origin][name]) {
    connectionQueue[origin][name] = [];
  }
  connectionQueue[origin][name].push({
    req,
    cb
  });
  if (connectionQueue[origin][name].length === 1) {
    // If there are no items in the queue, we have to start it
    processNextInConnectionQueue(name, origin);
  }
}

/**
 * @param {import('./IDBDatabase.js').IDBDatabaseFull[]} openConnections
 * @param {import('./IDBRequest.js').IDBRequestFull} req
 * @param {Integer} oldVersion
 * @param {Integer|null} newVersion
 * @returns {SyncPromise}
 */
function triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, newVersion) {
  // Todo: For Node (and in browser using service workers if available?) the
  //    connections ought to involve those in any process; should also
  //    auto-close if unloading

  /**
   * @param {IDBDatabase} connection
   * @returns {boolean|undefined}
   */
  const connectionIsClosed = connection => connection.__closePending;
  const connectionsClosed = () => openConnections.every(conn => {
    return connectionIsClosed(conn);
  });
  return openConnections.reduce(function (promises, entry) {
    if (connectionIsClosed(entry)) {
      return promises;
    }
    return promises.then(function () {
      if (connectionIsClosed(entry)) {
        // Prior onversionchange must have caused this connection to be closed
        return undefined;
      }
      const e = /** @type {Event & IDBVersionChangeEvent} */
      new IDBVersionChangeEvent('versionchange', {
        oldVersion,
        newVersion
      });
      return new SyncPromise(function (resolve) {
        setTimeout(() => {
          entry.dispatchEvent(e); // No need to catch errors
          resolve(undefined);
        });
      });
    });
  }, SyncPromise.resolve(undefined)).then(function () {
    if (connectionsClosed()) {
      return undefined;
    }
    return new SyncPromise(function (resolve) {
      const unblocking = {
        check() {
          if (connectionsClosed()) {
            resolve(undefined);
          }
        }
      };
      const e = /** @type {Event & IDBVersionChangeEvent} */
      new IDBVersionChangeEvent('blocked', {
        oldVersion,
        newVersion
      });
      setTimeout(() => {
        req.dispatchEvent(e); // No need to catch errors
        if (!connectionsClosed()) {
          openConnections.forEach(connection => {
            if (!connectionIsClosed(connection)) {
              connection.__unblocking = unblocking;
            }
          });
        } else {
          resolve(undefined);
        }
      });
    });
  });
}

/**
 * @typedef {import('websql-configurable/lib/websql/WebSQLDatabase.js').default & {
 *   _db: {
 *     _db: {
 *       close: (errBack: (err: Error) => void) => void
 *     }
 *   }
 * }} DatabaseFull
 */

/**
 * @type {{
 *   [key: string]: {
 *     [key: string]: DatabaseFull
 *   }
 * }}
 */
const websqlDBCache = {};

/** @type {import('websql-configurable/lib/websql/WebSQLDatabase.js').default} */
let sysdb;
let nameCounter = 0;

/**
 * @param {string} name
 * @returns {Integer}
 */
function getLatestCachedWebSQLVersion(name) {
  return Object.keys(websqlDBCache[name]).map(Number).reduce((prev, curr) => {
    return curr > prev ? curr : prev;
  }, 0);
}

/**
 * @param {string} name
 * @returns {DatabaseFull}
 */
function getLatestCachedWebSQLDB(name) {
  return websqlDBCache[name] && websqlDBCache[name][getLatestCachedWebSQLVersion(name)];
}

/**
 * @param {OpenDatabase} __openDatabase
 * @param {string} name
 * @param {string} escapedDatabaseName
 * @param {DatabaseDeleted} databaseDeleted
 * @param {(tx: SQLTransaction|Error|SQLError, err?: SQLError) => boolean} dbError
 * @returns {void}
 */
function cleanupDatabaseResources(__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError) {
  const useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
  if (useMemoryDatabase) {
    const latestSQLiteDBCached = websqlDBCache[name] ? getLatestCachedWebSQLDB(name) : null;
    if (!latestSQLiteDBCached) {
      console.warn('Could not find a memory database instance to delete.');
      databaseDeleted();
      return;
    }
    const sqliteDB = latestSQLiteDBCached._db && latestSQLiteDBCached._db._db;
    if (!sqliteDB || !sqliteDB.close) {
      console.error('The `openDatabase` implementation does not have the expected `._db._db.close` method for closing the database');
      return;
    }
    sqliteDB.close(
    /**
     * @param {Error} err
     * @returns {void}
     */
    err => {
      if (err) {
        console.warn('Error closing (destroying) memory database');
        return;
      }
      databaseDeleted();
    });
    return;
  }
  if (fs && CFG.deleteDatabaseFiles !== false) {
    fs.unlink(path.join(CFG.databaseBasePath || '', escapedDatabaseName), err => {
      if (err && err.code !== 'ENOENT') {
        // Ignore if file is already deleted
        dbError({
          code: 0,
          message: 'Error removing database file: ' + escapedDatabaseName + ' ' + err
        });
        return;
      }
      databaseDeleted();
    });
    return;
  }
  const sqliteDB = __openDatabase(path.join(CFG.databaseBasePath || '', escapedDatabaseName), '1', name, CFG.DEFAULT_DB_SIZE);
  sqliteDB.transaction(function (tx) {
    tx.executeSql('SELECT "name" FROM __sys__', [], function (tx, data) {
      const tables = data.rows;
      (function deleteTables(i) {
        if (i >= tables.length) {
          // If all tables are deleted, delete the housekeeping tables
          tx.executeSql('DROP TABLE IF EXISTS __sys__', [], function () {
            databaseDeleted();
          }, dbError);
        } else {
          // Delete all tables in this database, maintained in the sys table
          tx.executeSql('DROP TABLE ' + escapeStoreNameForSQL(unescapeSQLiteResponse(
          // Avoid double-escaping
          tables.item(i).name)), [], function () {
            deleteTables(i + 1);
          }, function () {
            deleteTables(i + 1);
            return false;
          });
        }
      })(0);
    }, function () {
      // __sys__ table does not exist, but that does not mean delete did not happen
      databaseDeleted();
      return false;
    });
  });
}

/**
 * @callback CreateSysDBSuccessCallback
 * @returns {void}
 */

/**
 * Creates the sysDB to keep track of version numbers for databases.
 * @param {OpenDatabase} __openDatabase
 * @param {CreateSysDBSuccessCallback} success
 * @param {(tx: SQLTransaction|SQLError|Error, err?: SQLError) => void} failure
 * @returns {void}
 */
function createSysDB(__openDatabase, success, failure) {
  /**
   *
   * @param {boolean|SQLTransaction|SQLError} tx
   * @param {SQLError} [err]
   * @returns {void}
   */
  function sysDbCreateError(tx, err) {
    const er = webSQLErrback( /** @type {SQLError} */err || tx);
    if (CFG.DEBUG) {
      console.log('Error in sysdb transaction - when creating dbVersions', err);
    }
    failure(er);
  }
  if (sysdb) {
    success();
  } else {
    sysdb = __openDatabase(typeof CFG.memoryDatabase === 'string' ? CFG.memoryDatabase : path.join(typeof CFG.sysDatabaseBasePath === 'string' ? CFG.sysDatabaseBasePath : CFG.databaseBasePath || '', '__sysdb__' + (CFG.addSQLiteExtension !== false ? '.sqlite' : '')), '1', 'System Database', CFG.DEFAULT_DB_SIZE);
    sysdb.transaction(function (systx) {
      systx.executeSql('CREATE TABLE IF NOT EXISTS dbVersions (name BLOB, version INT);', [], function (systx) {
        if (!CFG.useSQLiteIndexes) {
          success();
          return;
        }
        systx.executeSql('CREATE INDEX IF NOT EXISTS dbvname ON dbVersions(name)', [], success, /** @type {SQLStatementErrorCallback} */sysDbCreateError);
      }, /** @type {SQLStatementErrorCallback} */sysDbCreateError);
    }, sysDbCreateError);
  }
}

/**
 * IDBFactory Class.
 * @see https://w3c.github.io/IndexedDB/#idl-def-IDBFactory
 * @class
 */
function IDBFactory() {
  throw new TypeError('Illegal constructor');
}

/**
 * @typedef {(
 *   name: string, version: string, displayName: string, estimatedSize: number
 * ) => import('websql-configurable/lib/websql/WebSQLDatabase.js').default} OpenDatabase
 */

/**
 * @typedef {globalThis.IDBFactory & {
 *   __openDatabase: OpenDatabase,
 *   __connections: {
 *     [key: string]: import('./IDBDatabase.js').IDBDatabaseFull[]
 *   }
* }} IDBFactoryFull
 */

const IDBFactoryAlias = IDBFactory;
/**
 * @returns {IDBFactoryFull}
 */
IDBFactory.__createInstance = function () {
  /**
   * @class
   */
  function IDBFactory() {
    this[Symbol.toStringTag] = 'IDBFactory';
    this.__connections = {};
  }
  IDBFactory.prototype = IDBFactoryAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBFactory();
};

/**
 * The IndexedDB Method to create a new database and return the DB.
 * @param {string} name
 * @this {IDBFactoryFull}
 * @throws {TypeError} Illegal invocation or no arguments (for database name)
 * @returns {IDBOpenDBRequest}
 */
IDBFactory.prototype.open = function (name /* , version */) {
  const me = this;
  if (!(me instanceof IDBFactory)) {
    throw new TypeError('Illegal invocation');
  }
  // eslint-disable-next-line prefer-rest-params
  let version = arguments[1];
  if (arguments.length === 0) {
    throw new TypeError('Database name is required');
  }
  if (version !== undefined) {
    version = enforceRange(version, 'unsigned long long');
    if (version === 0) {
      throw new TypeError('Version cannot be 0');
    }
  }
  if (hasNullOrigin()) {
    throw createDOMException('SecurityError', 'Cannot open an IndexedDB database from an opaque origin.');
  }
  const req = IDBOpenDBRequest.__createInstance();
  let calledDbCreateError = false;
  if (CFG.autoName && name === '') {
    name = 'autoNamedDatabase_' + nameCounter++;
  }
  name = String(name); // cast to a string
  const sqlSafeName = escapeSQLiteStatement(name);
  const useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
  const useDatabaseCache = CFG.cacheDatabaseInstances !== false || useMemoryDatabase;

  /** @type {string} */
  let escapedDatabaseName;
  // eslint-disable-next-line no-useless-catch
  try {
    escapedDatabaseName = escapeDatabaseNameForSQLAndFiles(name);
    // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (err) {
    throw err; // new TypeError('You have supplied a database name which does not match the currently supported configuration, possibly due to a length limit enforced for Node compatibility.');
  }

  /**
   *
   * @param {SQLTransaction|Error|SQLError} tx
   * @param {SQLError} [err]
   * @returns {boolean}
   */
  function dbCreateError(tx, err) {
    if (calledDbCreateError) {
      return false;
    }
    const er = err ? webSQLErrback(err) : ( /** @type {Error} */tx);
    calledDbCreateError = true;
    // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
    const evt = createEvent('error', er, {
      bubbles: true,
      cancelable: true
    });
    req.__done = true;
    req.__error = er;
    req.__result = undefined; // Must be undefined if an error per `result` getter
    req.dispatchEvent(evt);
    return false;
  }

  /**
   *
   * @param {SQLTransaction} tx
   * @param {DatabaseFull} db
   * @param {Integer} oldVersion
   * @returns {void}
   */
  function setupDatabase(tx, db, oldVersion) {
    tx.executeSql('SELECT "name", "keyPath", "autoInc", "indexList" FROM __sys__', [], function (tx, data) {
      /**
       * @returns {void}
       */
      function finishRequest() {
        req.__result = connection;
        req.__done = true;
      }
      const connection = IDBDatabase.__createInstance(db, name, oldVersion, version, data);
      if (!me.__connections[name]) {
        me.__connections[name] = [];
      }
      me.__connections[name].push(connection);
      if (oldVersion < version) {
        const openConnections = me.__connections[name].slice(0, -1);
        triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, version).then(function () {
          // DB Upgrade in progress
          /**
           *
           * @param {SQLTransaction} systx
           * @param {boolean|SQLError|DOMException|Error} err
           * @param {(tx?: SQLTransaction|SQLError, err?: SQLError|SQLResultSet) => boolean} cb
           * @returns {void}
           */
          let sysdbFinishedCb = function (systx, err, cb) {
            if (err) {
              try {
                systx.executeSql('ROLLBACK', [], cb, cb);
              } catch (er) {
                // Browser may fail with expired transaction above so
                //     no choice but to manually revert
                sysdb.transaction(function (systx) {
                  /**
                   *
                   * @param {string} msg
                   * @throws {Error}
                   * @returns {never}
                   */
                  function reportError(msg) {
                    throw new Error('Unable to roll back upgrade transaction!' + (msg || ''));
                  }

                  // Attempt to revert
                  if (oldVersion === 0) {
                    systx.executeSql('DELETE FROM dbVersions WHERE "name" = ?', [sqlSafeName], function () {
                      // @ts-expect-error Force to work
                      cb(reportError); // eslint-disable-line promise/no-callback-in-promise
                    },
                    // @ts-expect-error Force to work
                    reportError);
                  } else {
                    systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [oldVersion, sqlSafeName], cb,
                    // @ts-expect-error Force to work
                    reportError);
                  }
                });
              }
              return;
            }
            // In browser, should auto-commit
            cb(); // eslint-disable-line promise/no-callback-in-promise
          };
          sysdb.transaction(function (systx) {
            /**
             * @returns {void}
             */
            function versionSet() {
              const e = /** @type {import('eventtargeter').EventWithProps & Event & IDBVersionChangeEvent} */
              new IDBVersionChangeEvent('upgradeneeded', {
                oldVersion,
                newVersion: version
              });
              req.__result = connection;
              connection.__upgradeTransaction = req.__transaction = req.__result.__versionTransaction = IDBTransaction.__createInstance(req.__result, req.__result.objectStoreNames, 'versionchange');
              req.__done = true;
              req.transaction.__addNonRequestToTransactionQueue(function onupgradeneeded(tx, args, finished /* , error */) {
                req.dispatchEvent(e);
                if (e.__legacyOutputDidListenersThrowError) {
                  logError('Error', 'An error occurred in an upgradeneeded handler attached to request chain', /** @type {Error} */e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
                  req.transaction.__abortTransaction(createDOMException('AbortError', 'A request was aborted.'));
                  return;
                }
                finished();
              });

              // eslint-disable-next-line camelcase -- Clear API
              req.transaction.on__beforecomplete = function (ev) {
                connection.__upgradeTransaction = null;
                /** @type {import('./IDBDatabase.js').IDBDatabaseFull} */
                req.__result.__versionTransaction = null;
                sysdbFinishedCb(systx, false, function () {
                  req.transaction.__transFinishedCb(false, function () {
                    ev.complete();
                    req.__transaction = null;
                  });
                  return false;
                });
              };

              // eslint-disable-next-line camelcase -- Clear API
              req.transaction.on__preabort = function () {
                connection.__upgradeTransaction = null;
                // We ensure any cache is deleted before any request error events fire and try to reopen
                if (useDatabaseCache) {
                  if (name in websqlDBCache) {
                    delete websqlDBCache[name][version];
                  }
                }
              };

              // eslint-disable-next-line camelcase -- Clear API
              req.transaction.on__abort = function () {
                req.__transaction = null;
                // `readyState` and `result` will be reset anyways by `dbCreateError` but we follow spec.
                req.__result = undefined;
                req.__done = false;
                connection.close();
                setTimeout(() => {
                  const err = createDOMException('AbortError', 'The upgrade transaction was aborted.');
                  sysdbFinishedCb(systx, err, function (reportError) {
                    if (oldVersion === 0) {
                      cleanupDatabaseResources(me.__openDatabase, name, escapedDatabaseName, dbCreateError.bind(null, err),
                      // @ts-expect-error It's ok
                      reportError || dbCreateError);
                      return false;
                    }
                    dbCreateError(err);
                    return false;
                  });
                });
              };

              // eslint-disable-next-line camelcase -- Clear API
              req.transaction.on__complete = function () {
                if ( /** @type {import('./IDBDatabase.js').IDBDatabaseFull} */req.__result.__closePending) {
                  req.__transaction = null;
                  const err = createDOMException('AbortError', 'The connection has been closed.');
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
                const e = createEvent('success');
                req.dispatchEvent(e);
                // });
              };
            }
            if (oldVersion === 0) {
              systx.executeSql('INSERT INTO dbVersions VALUES (?,?)', [sqlSafeName, version], versionSet, dbCreateError);
            } else {
              systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [version, sqlSafeName], versionSet, dbCreateError);
            }
          }, dbCreateError, undefined, function (currentTask, err, done, rollback, commit) {
            if (currentTask.readOnly || err) {
              return true;
            }
            sysdbFinishedCb = function (systx, err, cb) {
              if (err) {
                rollback(err, cb);
              } else {
                commit(cb);
              }
            };
            return false;
          });
          return undefined;
        }).catch(err => {
          console.log('Error within `triggerAnyVersionChangeAndBlockedEvents`');
          throw err;
        });
      } else {
        finishRequest();
        const e = createEvent('success');
        req.dispatchEvent(e);
      }
    }, dbCreateError);
  }

  /**
   *
   * @param {Integer} oldVersion
   * @returns {void}
   */
  function openDB(oldVersion) {
    /** @type {DatabaseFull} */
    let db;
    if ((useMemoryDatabase || useDatabaseCache) && name in websqlDBCache && websqlDBCache[name][version]) {
      db = websqlDBCache[name][version];
    } else {
      db = me.__openDatabase(useMemoryDatabase ? CFG.memoryDatabase : path.join(CFG.databaseBasePath || '', escapedDatabaseName), '1', name, CFG.DEFAULT_DB_SIZE);
      if (useDatabaseCache) {
        if (!(name in websqlDBCache)) {
          websqlDBCache[name] = {};
        }
        websqlDBCache[name][version] = db;
      }
    }
    if (version === undefined) {
      version = oldVersion || 1;
    }
    if (oldVersion > version) {
      const err = createDOMException('VersionError', 'An attempt was made to open a database using a lower version than the existing version.', version);
      if (useDatabaseCache) {
        setTimeout(() => {
          dbCreateError(err);
        });
      } else {
        dbCreateError(err);
      }
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS __sys__ (name BLOB, keyPath BLOB, autoInc BOOLEAN, indexList BLOB, currNum INTEGER)', [], function () {
        /**
         * @returns {void}
         */
        function setup() {
          setupDatabase(tx, db, oldVersion);
        }
        if (!CFG.createIndexes) {
          setup();
          return;
        }
        tx.executeSql('CREATE INDEX IF NOT EXISTS sysname ON __sys__(name)', [], setup, dbCreateError);
      }, /** @type {SQLStatementErrorCallback} */dbCreateError);
    }, dbCreateError);
  }
  addRequestToConnectionQueue(req, name, /* origin */undefined, function () {
    let latestCachedVersion;
    if (useDatabaseCache) {
      if (!(name in websqlDBCache)) {
        websqlDBCache[name] = {};
      }
      latestCachedVersion = getLatestCachedWebSQLVersion(name);
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
 * Deletes a database.
 * @param {string} name
 * @this {IDBFactoryFull}
 * @returns {IDBOpenDBRequest}
 */
IDBFactory.prototype.deleteDatabase = function (name) {
  const me = this;
  if (!(me instanceof IDBFactory)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length === 0) {
    throw new TypeError('Database name is required');
  }
  if (hasNullOrigin()) {
    throw createDOMException('SecurityError', 'Cannot delete an IndexedDB database from an opaque origin.');
  }
  name = String(name); // cast to a string
  const sqlSafeName = escapeSQLiteStatement(name);

  /** @type {string} */
  let escapedDatabaseName;
  // eslint-disable-next-line no-useless-catch
  try {
    escapedDatabaseName = escapeDatabaseNameForSQLAndFiles(name);
    // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (err) {
    throw err; // throw new TypeError('You have supplied a database name which does not match the currently supported configuration, possibly due to a length limit enforced for Node compatibility.');
  }
  const useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
  const useDatabaseCache = CFG.cacheDatabaseInstances !== false || useMemoryDatabase;
  const req = IDBOpenDBRequest.__createInstance();
  let calledDBError = false;
  let version = 0;

  /**
   *
   * @param {boolean} err
   * @param {(erred?: boolean) => void} cb
   * @returns {void}
   */
  let sysdbFinishedCbDelete = function (err, cb) {
    cb(err);
  };

  // Although the spec has no specific conditions where an error
  //  may occur in `deleteDatabase`, it does provide for
  //  `UnknownError` as we may require upon a SQL deletion error
  /**
   *
   * @param {SQLTransaction|SQLError|Error} tx
   * @param {SQLError|boolean} [err]
   * @returns {boolean}
   */
  function dbError(tx, err) {
    if (calledDBError || err === true) {
      return false;
    }
    const er = webSQLErrback( /** @type {SQLError} */err || tx);
    sysdbFinishedCbDelete(true, function () {
      req.__done = true;
      req.__error = er;
      req.__result = undefined; // Must be undefined if an error per `result` getter
      // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
      const e = createEvent('error', er, {
        bubbles: true,
        cancelable: true
      });
      req.dispatchEvent(e);
      calledDBError = true;
    });
    return false;
  }
  addRequestToConnectionQueue(req, name, /* origin */undefined, function (req) {
    createSysDB(me.__openDatabase, function () {
      // function callback (cb) { cb(); }
      // callback(function () {

      /**
       * @returns {void}
       */
      function completeDatabaseDelete() {
        req.__result = undefined;
        req.__done = true;
        const e = /** @type {Event & IDBVersionChangeEvent} */
        new IDBVersionChangeEvent('success', {
          oldVersion: version,
          newVersion: null
        });
        req.dispatchEvent(e);
      }

      /** @type {DatabaseDeleted} */
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
            return undefined;
          }
          ({
            version
          } = data.rows.item(0));
          const openConnections = me.__connections[name] || [];
          triggerAnyVersionChangeAndBlockedEvents(openConnections, req, version, null).then(function () {
            // eslint-disable-line promise/catch-or-return
            // Since we need two databases which can't be in a single transaction, we
            //  do this deleting from `dbVersions` first since the `__sys__` deleting
            //  only impacts file memory whereas this one is critical for avoiding it
            //  being found via `open` or `databases`; however, we will
            //  avoid committing anyways until all deletions are made and rollback the
            //  `dbVersions` change if they fail
            sysdb.transaction(function (systx) {
              systx.executeSql('DELETE FROM dbVersions WHERE "name" = ? ', [sqlSafeName], function () {
                // Todo: We should also check whether `dbVersions` is empty and if so, delete upon
                //    `deleteDatabaseFiles` config. We also ought to do this when aborting (see
                //    above code with `DELETE FROM dbVersions`)
                cleanupDatabaseResources(me.__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError);
              }, dbError);
            }, dbError, undefined, function (currentTask, err, done, rollback, commit) {
              if (currentTask.readOnly || err) {
                return true;
              }
              sysdbFinishedCbDelete = function (err, cb) {
                if (err) {
                  rollback(err, cb);
                } else {
                  commit(cb);
                }
              };
              return false;
            });
            return undefined;
            // @ts-expect-error It's ok
          }, dbError);
          return undefined;
        }, dbError);
      });
    }, dbError);
  });
  return req;
};

/**
 *
 * @param {import('./Key.js').Key} key1
 * @param {import('./Key.js').Key} key2
 * @throws {TypeError}
 * @returns {0|1|-1}
 */
IDBFactory.prototype.cmp = function (key1, key2) {
  if (!(this instanceof IDBFactory)) {
    throw new TypeError('Illegal invocation');
  }
  if (arguments.length < 2) {
    throw new TypeError('You must provide two keys to be compared');
  }
  // We use encoding facilities already built for proper sorting;
  //   the following "conversions" are for validation only
  convertValueToKeyRethrowingAndIfInvalid(key1);
  convertValueToKeyRethrowingAndIfInvalid(key2);
  return cmp(key1, key2);
};

/**
* May return outdated information if a database has since been deleted.
* @see https://github.com/w3c/IndexedDB/pull/240/files
* @this {IDBFactoryFull}
* @returns {Promise<{
*   name: string,
*   version: Integer
* }[]>}
*/
IDBFactory.prototype.databases = function () {
  const me = this;
  let calledDbCreateError = false;
  return new Promise(function (resolve, reject) {
    // eslint-disable-line promise/avoid-new
    if (!(me instanceof IDBFactory)) {
      throw new TypeError('Illegal invocation');
    }
    if (hasNullOrigin()) {
      throw createDOMException('SecurityError', 'Cannot get IndexedDB database names from an opaque origin.');
    }
    /**
     *
     * @param {true|SQLTransaction|SQLError|DOMException|Error} tx
     * @param {SQLError|DOMException|Error} [err]
     * @returns {boolean}
     */
    function dbGetDatabaseNamesError(tx, err) {
      if (calledDbCreateError) {
        return false;
      }
      const er = err ? webSQLErrback( /** @type {SQLError} */err) : tx;
      calledDbCreateError = true;
      reject(er);
      return false;
    }
    createSysDB(me.__openDatabase, function () {
      sysdb.readTransaction(function (sysReadTx) {
        sysReadTx.executeSql('SELECT "name", "version" FROM dbVersions', [], function (sysReadTx, data) {
          const dbNames = [];
          for (let i = 0; i < data.rows.length; i++) {
            const {
              name,
              version
            } = data.rows.item(i);
            dbNames.push({
              name: unescapeSQLiteResponse(name),
              version
            });
          }
          resolve(dbNames);
        }, dbGetDatabaseNamesError);
      }, dbGetDatabaseNamesError);
    }, dbGetDatabaseNamesError);
  });
};

/**
* @todo forceClose: Test
* This is provided to facilitate unit-testing of the
*  closing of a database connection with a forced flag:
* <http://w3c.github.io/IndexedDB/#steps-for-closing-a-database-connection>
* @param {string} dbName
* @param {Integer} connIdx
* @param {string} msg
* @throws {TypeError}
* @this {IDBFactoryFull}
* @returns {void}
*/
IDBFactory.prototype.__forceClose = function (dbName, connIdx, msg) {
  const me = this;
  /**
   *
   * @param {import('./IDBDatabase.js').IDBDatabaseFull} conn
   * @returns {void}
   */
  function forceClose(conn) {
    conn.__forceClose(msg);
  }
  if (isNullish(dbName)) {
    Object.values(me.__connections).forEach(conn => {
      // @ts-expect-error It's ok
      forceClose(conn);
    });
  } else if (!me.__connections[dbName]) {
    console.log('No database connections with that name to force close');
  } else if (isNullish(connIdx)) {
    me.__connections[dbName].forEach(conn => {
      forceClose(conn);
    });
  } else if (!Number.isInteger(connIdx) || connIdx < 0 || connIdx > me.__connections[dbName].length - 1) {
    throw new TypeError('If providing an argument, __forceClose must be called with a ' + 'numeric index to indicate a specific connection to lose');
  } else {
    forceClose(me.__connections[dbName][connIdx]);
  }
};

/**
 *
 * @param {string} [origin]
 * @returns {void}
 */
IDBFactory.prototype.__setConnectionQueueOrigin = function (origin = getOrigin()) {
  connectionQueue[origin] = {};
};
IDBFactory.prototype[Symbol.toStringTag] = 'IDBFactoryPrototype';
Object.defineProperty(IDBFactory, 'prototype', {
  writable: false
});
const shimIndexedDB = IDBFactory.__createInstance();

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {IDBCursor & {
 *   primaryKey: import('./Key.js').Key,
 *   key:  import('./Key.js').Key,
 *   direction: string,
 *   source: import('./IDBObjectStore.js').IDBObjectStoreFull|
 *     import('./IDBIndex.js').IDBIndexFull,
 *   __request: import('./IDBRequest.js').IDBRequestFull,
 *   __advanceCount: Integer|undefined,
 *   __indexSource: boolean,
 *   __key: import('./Key.js').Key,
 *   __primaryKey: import('./Key.js').Key,
 *   __value: import('./Key.js').Value,
 *   __store: import('./IDBObjectStore.js').IDBObjectStoreFull,
 *   __range: import('./IDBKeyRange.js').IDBKeyRangeFull|undefined,
 *   __keyColumnName: string,
 *   __valueColumnName: string,
 *   __keyOnly: boolean,
 *   __valueDecoder: {
 *     decode: (str: string) => any,
 *   },
 *   __count: boolean,
 *   __prefetchedIndex: Integer,
 *   __prefetchedData: null|SQLResultSetRowList|{
 *     data: RowItemNonNull[],
 *     length: Integer,
 *     item: (index: Integer) => RowItemNonNull
 *   },
 *   __multiEntryIndex: boolean,
 *   __unique: boolean,
 *   __sqlDirection: "DESC"|"ASC",
 *   __matchedKeys: {[key: string]: true},
 *   __invalidateCache: () => void
 * }} IDBCursorFull
 */

/**
 * @typedef {IDBCursorFull & {
 *   __request: import('./IDBRequest.js').IDBRequestFull,
 * }} IDBCursorWithValueFull
 */

/**
 * @class
 */
function IDBCursor() {
  throw new TypeError('Illegal constructor');
}
const IDBCursorAlias = IDBCursor;

/* eslint-disable func-name-matching */
/**
 * The IndexedDB Cursor Object.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBCursor
 * @param {IDBKeyRange} query
 * @param {string} direction
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull|
 *   import('./IDBIndex.js').IDBIndexFull} source
 * @param {string} keyColumnName
 * @param {string} valueColumnName
 * @param {boolean} count
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.__super = function IDBCursor(query, direction, store, source, keyColumnName, valueColumnName, count) {
  /* eslint-enable func-name-matching */
  // @ts-expect-error Should be ok
  this[Symbol.toStringTag] = 'IDBCursor';
  defineReadonlyProperties(this, ['key', 'primaryKey', 'request']);
  IDBObjectStore.__invalidStateIfDeleted(store);
  this.__indexSource = instanceOf(source, IDBIndex);
  if (this.__indexSource) {
    IDBIndex.__invalidStateIfDeleted( /** @type {import('./IDBIndex.js').IDBIndexFull} */source);
  }
  IDBTransaction.__assertActive(store.transaction);
  const range = convertValueToKeyRange(query);
  if (direction !== undefined && !['next', 'prev', 'nextunique', 'prevunique'].includes(direction)) {
    throw new TypeError(direction + 'is not a valid cursor direction');
  }
  Object.defineProperties(this, {
    // Babel is not respecting default writable false here, so make explicit
    source: {
      writable: false,
      value: source
    },
    direction: {
      writable: false,
      value: direction || 'next'
    }
  });
  this.__key = undefined;
  this.__primaryKey = undefined;
  this.__store = store;
  this.__range = range;
  this.__request = IDBRequest.__createInstance();
  this.__request.__source = source;
  this.__request.__transaction = this.__store.transaction;
  this.__keyColumnName = keyColumnName;
  this.__valueColumnName = valueColumnName;
  this.__keyOnly = valueColumnName === 'key';
  this.__valueDecoder = this.__keyOnly ? Key : Sca;
  this.__count = count;
  this.__prefetchedIndex = -1;
  this.__multiEntryIndex = this.__indexSource ? 'multiEntry' in source && source.multiEntry : false;
  this.__unique = this.direction.includes('unique');
  this.__sqlDirection = ['prev', 'prevunique'].includes(this.direction) ? 'DESC' : 'ASC';
  if (range !== undefined) {
    // Encode the key range and cache the encoded values, so we don't have to re-encode them over and over
    range.__lowerCached = range.lower !== undefined && encode$1(range.lower, this.__multiEntryIndex);
    range.__upperCached = range.upper !== undefined && encode$1(range.upper, this.__multiEntryIndex);
  }
  this.__gotValue = true;
  this.continue();
};

/**
 *
 * @param {...any} args
 * @returns {IDBCursorFull}
 */
IDBCursor.__createInstance = function (...args) {
  const IDBCursor = IDBCursorAlias.__super;
  IDBCursor.prototype = IDBCursorAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBCursor(...args);
};

/**
 *
 * @param {...any} args
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__find = function (...args /* key, tx, success, error, recordsToLoad */) {
  if (this.__multiEntryIndex) {
    const [key, primaryKey, tx, success, error] = args;
    this.__findMultiEntry(key, primaryKey, tx, success, error);
  } else {
    const [key, primaryKey, tx, success, error, recordsToLoad] = args;
    this.__findBasic(key, primaryKey, tx, success, error, recordsToLoad);
  }
};

/**
 * @typedef {(
 *   k: import('./Key.js').Key,
 *   val: import('./Key.js').Value,
 *   primKey: import('./Key.js').Key
 * ) => void} KeySuccess
 */

/**
 * @typedef {(tx: SQLTransaction|Error|DOMException|SQLError, err?: SQLError) => void} FindError
 */

/**
 *
 * @param {undefined|import('./Key.js').Key} key
 * @param {undefined|import('./Key.js').Key} primaryKey
 * @param {SQLTransaction} tx
 * @param {KeySuccess} success
 * @param {FindError} error
 * @param {Integer|undefined} recordsToLoad
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__findBasic = function (key, primaryKey, tx, success, error, recordsToLoad) {
  const continueCall = recordsToLoad !== undefined;
  recordsToLoad = recordsToLoad || 1;
  const me = this;
  const quotedKeyColumnName = sqlQuote(me.__keyColumnName);
  const quotedKey = sqlQuote('key');
  const sql = ['SELECT * FROM', escapeStoreNameForSQL(me.__store.__currentName)];

  /** @type {string[]} */
  const sqlValues = [];
  sql.push('WHERE', quotedKeyColumnName, 'NOT NULL');
  setSQLForKeyRange(me.__range, quotedKeyColumnName, sql, sqlValues, true, true);

  // Determine the ORDER BY direction based on the cursor.
  const direction = me.__sqlDirection;
  const op = direction === 'ASC' ? '>' : '<';
  if (primaryKey !== undefined) {
    sql.push('AND', quotedKey, op + '= ?');
    // Key.convertValueToKey(primaryKey); // Already checked by `continuePrimaryKey`
    sqlValues.push( /** @type {string} */encode$1(primaryKey));
  }
  if (key !== undefined) {
    sql.push('AND', quotedKeyColumnName, op + '= ?');
    // Key.convertValueToKey(key); // Already checked by `continue` or `continuePrimaryKey`
    sqlValues.push( /** @type {string} */encode$1(key));
  } else if (continueCall && me.__key !== undefined) {
    sql.push('AND', quotedKeyColumnName, op + ' ?');
    // Key.convertValueToKey(me.__key); // Already checked when stored
    sqlValues.push( /** @type {string} */encode$1(me.__key));
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
      sql.push(',', sqlQuote(me.__valueColumnName), direction);
    }
    sql.push('LIMIT', String(recordsToLoad));
  }
  const sqlStr = sql.join(' ');
  if (CFG.DEBUG) {
    console.log(sqlStr, sqlValues);
  }
  tx.executeSql(sqlStr, sqlValues, function (tx, data) {
    if (me.__count) {
      success(undefined, data.rows.length, undefined);
    } else if (data.rows.length > 1) {
      me.__prefetchedIndex = 0;
      me.__prefetchedData = data.rows;
      if (CFG.DEBUG) {
        console.log('Preloaded ' + me.__prefetchedData.length + ' records for cursor');
      }
      me.__decode(data.rows.item(0), success);
    } else if (data.rows.length === 1) {
      me.__decode(data.rows.item(0), success);
    } else {
      if (CFG.DEBUG) {
        console.log('Reached end of cursors');
      }
      success(undefined, undefined, undefined);
    }
  }, function (tx, err) {
    if (CFG.DEBUG) {
      console.log('Could not execute Cursor.continue', sqlStr, sqlValues);
    }
    error(err);
    return false;
  });
};
const leftBracketRegex = /\[/gu;

/**
 *
 * @param {undefined|import('./Key.js').Key} key
 * @param {undefined|import('./Key.js').Key} primaryKey
 * @param {SQLTransaction} tx
 * @param {KeySuccess} success
 * @param {FindError} error
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__findMultiEntry = function (key, primaryKey, tx, success, error) {
  const me = this;
  if (me.__prefetchedData && me.__prefetchedData.length === me.__prefetchedIndex) {
    if (CFG.DEBUG) {
      console.log('Reached end of multiEntry cursor');
    }
    success(undefined, undefined, undefined);
    return;
  }
  const quotedKeyColumnName = sqlQuote(me.__keyColumnName);
  const sql = ['SELECT * FROM', escapeStoreNameForSQL(me.__store.__currentName)];
  /** @type {string[]} */
  const sqlValues = [];
  sql.push('WHERE', quotedKeyColumnName, 'NOT NULL');
  if (me.__range && me.__range.lower !== undefined && Array.isArray(me.__range.upper)) {
    if (me.__range.upper.indexOf(me.__range.lower) === 0) {
      sql.push('AND', quotedKeyColumnName, "LIKE ? ESCAPE '^'");
      sqlValues.push('%' + sqlLIKEEscape( /** @type {string} */me.__range.__lowerCached.slice(0, -1)) + '%');
    }
  }

  // Determine the ORDER BY direction based on the cursor.
  const direction = me.__sqlDirection;
  const op = direction === 'ASC' ? '>' : '<';
  const quotedKey = sqlQuote('key');
  if (primaryKey !== undefined) {
    sql.push('AND', quotedKey, op + '= ?');
    // Key.convertValueToKey(primaryKey); // Already checked by `continuePrimaryKey`
    sqlValues.push( /** @type {string} */encode$1(primaryKey));
  }
  if (key !== undefined) {
    sql.push('AND', quotedKeyColumnName, op + '= ?');
    // Key.convertValueToKey(key); // Already checked by `continue` or `continuePrimaryKey`
    sqlValues.push( /** @type {string} */encode$1(key));
  } else if (me.__key !== undefined) {
    sql.push('AND', quotedKeyColumnName, op + ' ?');
    // Key.convertValueToKey(me.__key); // Already checked when entered
    sqlValues.push( /** @type {string} */encode$1(me.__key));
  }
  if (!me.__count) {
    // 1. Sort by key
    sql.push('ORDER BY', quotedKeyColumnName, direction);

    // 2. Sort by primaryKey (if defined and not unique)
    if (!me.__unique && me.__keyColumnName !== 'key') {
      // Avoid adding 'key' twice
      sql.push(',', sqlQuote('key'), direction);
    }

    // 3. Sort by position (if defined)

    if (!me.__unique && me.__indexSource) {
      // 4. Sort by object store position (if defined and not unique)
      sql.push(',', sqlQuote(me.__valueColumnName), direction);
    }
  }
  const sqlStr = sql.join(' ');
  if (CFG.DEBUG) {
    console.log(sqlStr, sqlValues);
  }
  tx.executeSql(sqlStr, sqlValues, function (tx, data) {
    if (data.rows.length > 0) {
      if (me.__count) {
        // Avoid caching and other processing below
        let ct = 0;
        for (let i = 0; i < data.rows.length; i++) {
          const rowItem = data.rows.item(i);
          const rowKey = decode$1(rowItem[me.__keyColumnName], true);
          const matches = findMultiEntryMatches(rowKey, me.__range);
          ct += matches.length;
        }
        success(undefined, ct, undefined);
        return;
      }
      const rows = [];
      for (let i = 0; i < data.rows.length; i++) {
        const rowItem = data.rows.item(i);
        const rowKey = decode$1(rowItem[me.__keyColumnName], true);
        const matches = findMultiEntryMatches(rowKey, me.__range);
        for (const matchingKey of matches) {
          /**
           * @type {RowItemNonNull}
           */
          const clone = {
            matchingKey: ( /** @type {string} */
            encode$1(matchingKey, true)),
            key: rowItem.key
          };
          clone[me.__keyColumnName] = rowItem[me.__keyColumnName];
          clone[me.__valueColumnName] = rowItem[me.__valueColumnName];
          rows.push(clone);
        }
      }
      const reverse = me.direction.indexOf('prev') === 0;
      rows.sort(function (a, b) {
        if (a.matchingKey.replaceAll(leftBracketRegex, 'z') < b.matchingKey.replaceAll(leftBracketRegex, 'z')) {
          return reverse ? 1 : -1;
        }
        if (a.matchingKey.replaceAll(leftBracketRegex, 'z') > b.matchingKey.replaceAll(leftBracketRegex, 'z')) {
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
          /**
           * @param {Integer} index
           * @returns {RowItemNonNull}
           */
          item(index) {
            return this.data[index];
          }
        };
        if (CFG.DEBUG) {
          console.log('Preloaded ' + me.__prefetchedData.length + ' records for multiEntry cursor');
        }
        me.__decode(rows[0], success);
      } else if (rows.length === 1) {
        if (CFG.DEBUG) {
          console.log('Reached end of multiEntry cursor');
        }
        me.__decode(rows[0], success);
      } else {
        if (CFG.DEBUG) {
          console.log('Reached end of multiEntry cursor');
        }
        success(undefined, undefined, undefined);
      }
    } else {
      if (CFG.DEBUG) {
        console.log('Reached end of multiEntry cursor');
      }
      success(undefined, undefined, undefined);
    }
  }, function (tx, err) {
    if (CFG.DEBUG) {
      console.log('Could not execute Cursor.continue', sqlStr, sqlValues);
    }
    error(err);
    return false;
  });
};

/**
 * @typedef {any} StructuredCloneValue
 */

/**
 * @typedef {any} IndexedDBKey
 */

/**
* @callback SuccessArg
* @param {StructuredCloneValue} value
* @param {import('./IDBRequest.js').IDBRequestFull} req
* @returns {void}
*/

/**
* @callback SuccessCallback
* @param {IndexedDBKey} key
* @param {StructuredCloneValue} value
* @param {IndexedDBKey} primaryKey
* @returns {void}
*/

/**
 * Creates an "onsuccess" callback.
 * @param {SuccessArg} success
 * @this {IDBCursorFull}
 * @returns {SuccessCallback}
 */
IDBCursor.prototype.__onsuccess = function (success) {
  const me = this;
  return function (key, value, primaryKey) {
    if (me.__count) {
      success(value, me.__request);
    } else {
      if (key !== undefined) {
        me.__gotValue = true;
      }
      me.__key = key === undefined ? null : key;
      me.__primaryKey = primaryKey === undefined ? null : primaryKey;
      me.__value = value === undefined ? null : value;
      const result = key === undefined ? null : me;
      success(result, me.__request);
    }
  };
};

/**
 * @typedef {{
*   matchingKey: string,
*   key: string,
*   [k: string]: string
* }} RowItemNonNull
*/

/**
 *
 * @param {RowItemNonNull} rowItem
 * @param {(
 *   key: import('./Key.js').Key,
 *   val: import('./Key.js').Value,
 *   primaryKey: import('./Key.js').Key,
 *   encKey?: string
 * ) => void} callback
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__decode = function (rowItem, callback) {
  const me = this;
  if (me.__multiEntryIndex && me.__unique) {
    if (!me.__matchedKeys) {
      me.__matchedKeys = {};
    }
    if (me.__matchedKeys[rowItem.matchingKey]) {
      callback(undefined, undefined, undefined);
      return;
    }
    me.__matchedKeys[rowItem.matchingKey] = true;
  }
  const encKey = unescapeSQLiteResponse(me.__multiEntryIndex ? rowItem.matchingKey : rowItem[me.__keyColumnName]);
  const encVal = unescapeSQLiteResponse(rowItem[me.__valueColumnName]);
  const encPrimaryKey = unescapeSQLiteResponse(rowItem.key);
  const key = decode$1(encKey, me.__multiEntryIndex);
  const val = me.__valueDecoder.decode(encVal);
  const primaryKey = decode$1(encPrimaryKey);
  callback(key, val, primaryKey, encKey /* , encVal, encPrimaryKey */);
};

/**
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__sourceOrEffectiveObjStoreDeleted = function () {
  IDBObjectStore.__invalidStateIfDeleted(this.__store, "The cursor's effective object store has been deleted");
  if (this.__indexSource) {
    IDBIndex.__invalidStateIfDeleted( /** @type {import('./IDBIndex.js').IDBIndexFull} */this.source, "The cursor's index source has been deleted");
  }
};

/**
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__invalidateCache = function () {
  // @ts-expect-error Why is this not being found?
  this.__prefetchedData = null;
};

/**
 *
 * @param {import('./Key.js').Key} [key]
 * @param {boolean} [advanceContinue]
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__continue = function (key, advanceContinue) {
  const me = this;
  const advanceState = me.__advanceCount !== undefined;
  IDBTransaction.__assertActive(me.__store.transaction);
  me.__sourceOrEffectiveObjStoreDeleted();
  if (!me.__gotValue && !advanceContinue) {
    throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
  }
  if (key !== undefined) {
    convertValueToKeyRethrowingAndIfInvalid(key);
    const cmpResult = cmp(key, me.key);
    if (cmpResult === 0 || me.direction.includes('next') && cmpResult === -1 || me.direction.includes('prev') && cmpResult === 1) {
      throw createDOMException('DataError', 'Cannot ' + (advanceState ? 'advance' : 'continue') + ' the cursor in an unexpected direction');
    }
  }
  this.__continueFinish(key, undefined, advanceState);
};

/**
 *
 * @param {import('./Key.js').Key} key
 * @param {import('./Key.js').Key} primaryKey
 * @param {boolean} advanceState
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.__continueFinish = function (key, primaryKey, advanceState) {
  const me = this;
  const recordsToPreloadOnContinue = me.__advanceCount || CFG.cursorPreloadPackSize || 100;
  me.__gotValue = false;
  me.__request.__done = false;

  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.__store.transaction.__pushToQueue(me.__request, function cursorContinue(tx, args, success, error, executeNextRequest) {
    /**
     * @param {import('./Key.js').Key} k
     * @param {import('./Key.js').Value} val
     * @param {import('./Key.js').Key} primKey
     * @returns {void}
     */
    function triggerSuccess(k, val, primKey) {
      if (advanceState) {
        if (me.__advanceCount && me.__advanceCount >= 2 && k !== undefined) {
          me.__advanceCount--;
          me.__key = k;
          me.__continue(undefined, true);
          /** @type {() => void} */
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
          /**
           * @returns {void}
           */
          function checkKey() {
            const cmpResult = Number(key === undefined) || cmp(k, key);
            if (cmpResult > 0 || cmpResult === 0 && (me.__unique || primaryKey === undefined || cmp(primKey, primaryKey) >= 0)) {
              triggerSuccess(k, val, primKey);
              return;
            }
            cursorContinue(tx, args, success, error);
          }
          if (me.__unique && !me.__multiEntryIndex && encKey === encode$1(me.key, me.__multiEntryIndex)) {
            cursorContinue(tx, args, success, error);
            return;
          }
          checkKey();
        });
        return;
      }
    }

    // No (or not enough) pre-fetched data, do query
    me.__find(key, primaryKey, tx, triggerSuccess, /** @type {FindError} */
    function (...args) {
      me.__advanceCount = undefined;
      const [t, err] = args;
      error(t, err);
    }, recordsToPreloadOnContinue);
  });
};

/**
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.continue = function /* key */
() {
  // eslint-disable-next-line prefer-rest-params
  this.__continue(arguments[0]);
};

/**
 *
 * @param {import('./Key.js').Key} key
 * @param {import('./Key.js').Key} primaryKey
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.continuePrimaryKey = function (key, primaryKey) {
  const me = this;
  IDBTransaction.__assertActive(me.__store.transaction);
  me.__sourceOrEffectiveObjStoreDeleted();
  if (!me.__indexSource) {
    throw createDOMException('InvalidAccessError', '`continuePrimaryKey` may only be called on an index source.');
  }
  if (!['next', 'prev'].includes(me.direction)) {
    throw createDOMException('InvalidAccessError', '`continuePrimaryKey` may not be called with unique cursors.');
  }
  if (!me.__gotValue) {
    throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
  }
  convertValueToKeyRethrowingAndIfInvalid(key);
  convertValueToKeyRethrowingAndIfInvalid(primaryKey);
  const cmpResult = cmp(key, me.key);
  if (me.direction === 'next' && cmpResult === -1 || me.direction === 'prev' && cmpResult === 1) {
    throw createDOMException('DataError', 'Cannot continue the cursor in an unexpected direction');
  }

  /**
   * @returns {void}
   */
  function noErrors() {
    me.__continueFinish(key, primaryKey, false);
  }
  if (cmpResult === 0) {
    encode(primaryKey, function (encPrimaryKey) {
      encode(me.primaryKey, function (encObjectStorePos) {
        if (encPrimaryKey === encObjectStorePos || me.direction === 'next' && encPrimaryKey < encObjectStorePos || me.direction === 'prev' && encPrimaryKey > encObjectStorePos) {
          throw createDOMException('DataError', 'Cannot continue the cursor in an unexpected direction');
        }
        noErrors();
      });
    });
  } else {
    noErrors();
  }
};

/**
 *
 * @param {Integer} count
 * @this {IDBCursorFull}
 * @returns {void}
 */
IDBCursor.prototype.advance = function (count) {
  const me = this;
  count = enforceRange(count, 'unsigned long');
  if (count === 0) {
    throw new TypeError('Calling advance() with count argument 0');
  }
  if (me.__gotValue) {
    // Only set the count if not running in error (otherwise will override earlier good advance calls)
    me.__advanceCount = count;
  }
  me.__continue();
};

/**
 * @typedef {any} AnyValue
 */

/**
 *
 * @param {AnyValue} valueToUpdate
 * @this {IDBCursorFull}
 * @returns {IDBRequest}
 */
IDBCursor.prototype.update = function (valueToUpdate) {
  const me = this;
  if (!arguments.length) {
    throw new TypeError('A value must be passed to update()');
  }
  IDBTransaction.__assertActive(me.__store.transaction);
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.__store.transaction.__assertWritable();
  me.__sourceOrEffectiveObjStoreDeleted();
  if (!me.__gotValue) {
    throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
  }
  if (me.__keyOnly) {
    throw createDOMException('InvalidStateError', 'This cursor method cannot be called when the key only flag has been set.');
  }
  const request = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.__store.transaction.__createRequest(me);
  const key = me.primaryKey;

  /**
   * @param {import('./Key.js').Value} clonedValue
   * @returns {void}
   */
  function addToQueue(clonedValue) {
    // We set the `invalidateCache` argument to `false` since the old value shouldn't be accessed
    IDBObjectStore.__storingRecordObjectStore(request, me.__store, false, clonedValue, false, key);
  }
  if (me.__store.keyPath !== null) {
    const [evaluatedKey, clonedValue] = me.__store.__validateKeyAndValueAndCloneValue(valueToUpdate, undefined, true);
    if (cmp(me.primaryKey, evaluatedKey) !== 0) {
      throw createDOMException('DataError', 'The key of the supplied value to `update` is not equal to the cursor\'s effective key');
    }
    addToQueue(clonedValue);
  } else {
    const clonedValue = clone(valueToUpdate);
    addToQueue(clonedValue);
  }
  return request;
};

/**
 * @this {IDBCursorFull}
 * @returns {IDBRequest}
 */
IDBCursor.prototype.delete = function () {
  const me = this;
  IDBTransaction.__assertActive(me.__store.transaction);
  /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
  me.__store.transaction.__assertWritable();
  me.__sourceOrEffectiveObjStoreDeleted();
  if (!me.__gotValue) {
    throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
  }
  if (me.__keyOnly) {
    throw createDOMException('InvalidStateError', 'This cursor method cannot be called when the key only flag has been set.');
  }
  return /** @type {import('./IDBTransaction.js').IDBTransactionFull} */this.__store.transaction.__addToTransactionQueue(function cursorDelete(tx, args, success, error) {
    me.__find(undefined, undefined, tx, /** @type {KeySuccess} */
    function (key, value, primaryKey) {
      const sql = 'DELETE FROM  ' + escapeStoreNameForSQL(me.__store.__currentName) + ' WHERE "key" = ?';
      if (CFG.DEBUG) {
        console.log(sql, key, primaryKey);
      }
      // Key.convertValueToKey(primaryKey); // Already checked when entered
      tx.executeSql(sql, [escapeSQLiteStatement( /** @type {string} */encode$1(primaryKey))], function (tx, data) {
        if (data.rowsAffected === 1) {
          // We don't invalidate the cache (as we don't access it anymore
          //    and it will set the index off)
          success(undefined);
        } else {
          // @ts-expect-error Apparently ok
          error('No rows with key found' + key);
        }
      }, function (tx, data) {
        error(data);
        return false;
      });
    }, error);
  }, undefined, me);
};
IDBCursor.prototype[Symbol.toStringTag] = 'IDBCursorPrototype';
defineReadonlyOuterInterface(IDBCursor.prototype, ['source', 'direction', 'key', 'primaryKey', 'request']);
Object.defineProperty(IDBCursor, 'prototype', {
  writable: false
});

/**
 * @class
 */
function IDBCursorWithValue() {
  throw new TypeError('Illegal constructor');
}

// @ts-expect-error It's ok
IDBCursorWithValue.prototype = Object.create(IDBCursor.prototype);
Object.defineProperty(IDBCursorWithValue.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: IDBCursorWithValue
});
const IDBCursorWithValueAlias = IDBCursorWithValue;
/**
 *
 * @param {...any} args
 * @returns {IDBCursorWithValueFull}
 */
IDBCursorWithValue.__createInstance = function (...args) {
  /**
   * @class
   * @this {IDBCursorWithValueFull}
   */
  function IDBCursorWithValue() {
    const [query, direction, store, source, keyColumnName, valueColumnName, count] = args;
    IDBCursor.__super.call(this, query, direction, store, source, keyColumnName, valueColumnName, count);
    // @ts-expect-error It's ok
    this[Symbol.toStringTag] = 'IDBCursorWithValue';
    defineReadonlyProperties(this, 'value');
  }
  IDBCursorWithValue.prototype = IDBCursorWithValueAlias.prototype;

  // @ts-expect-error It's ok
  return new IDBCursorWithValue();
};
defineReadonlyOuterInterface(IDBCursorWithValue.prototype, ['value']);
IDBCursorWithValue.prototype[Symbol.toStringTag] = 'IDBCursorWithValuePrototype';
Object.defineProperty(IDBCursorWithValue, 'prototype', {
  writable: false
});

/**
 * @typedef {any} AnyValue
 */

/**
 * @callback SetConfig
 * @param {import('./CFG.js').KeyofConfigValues|
 *   Partial<import('./CFG.js').ConfigValues>} prop
 * @param {AnyValue} [val]
 * @throws {Error}
 * @returns {void}
 */

/** @type {SetConfig} */
function setConfig(prop, val) {
  if (prop && typeof prop === 'object') {
    Object.entries(prop).forEach(([p, val]) => {
      setConfig( /** @type {import('./CFG.js').KeyofConfigValues} */
      p, val);
    });
    return;
  }
  if (!(prop in CFG)) {
    throw new Error(prop + ' is not a valid configuration property');
  }
  // @ts-expect-error Should not be `never` here!
  CFG[prop] = val;
  if (prop === 'registerSCA' && typeof val === 'function') {
    register(
    /**
     * @type {(
     *   preset: import('typeson').Preset
     * ) => import('typeson').Preset}
     */
    val);
  }
}

/**
 * @typedef {(
 *   prop: import('./CFG.js').KeyofConfigValues
 * ) => import('../src/CFG.js').ConfigValue} GetConfig
 */

/**
 * @typedef {(cfg: {
 *   UnicodeIDStart: string,
 *   UnicodeIDContinue: string
 * }) => void} SetUnicodeIdentifiers
 */

/**
 * @typedef {(IDBFactory|object) & {
 *     __useShim: () => void,
 *     __debug: (val: boolean) => void,
 *     __setConfig: SetConfig,
 *     __getConfig: GetConfig,
 *     __setUnicodeIdentifiers: SetUnicodeIdentifiers,
 *     __setConnectionQueueOrigin: (origin?: string) => void
 *   }} ShimIndexedDB
 */

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {(typeof globalThis|object) & {
 *   indexedDB?: Partial<IDBFactory>,
 *   IDBFactory: typeof IDBFactory,
 *   IDBOpenDBRequest: typeof IDBOpenDBRequest,
 *   IDBRequest: typeof IDBRequest,
 *   IDBCursorWithValue: typeof IDBCursorWithValue,
 *   IDBCursor: typeof IDBCursor,
 *   IDBDatabase: typeof IDBDatabase,
 *   IDBTransaction: typeof IDBTransaction,
 *   IDBKeyRange: typeof IDBKeyRange,
 *   shimIndexedDB?: ShimIndexedDB
 * }} ShimmedObject
 */

/**
 *
 * @param {ShimmedObject} [idb]
 * @param {import('./CFG.js').ConfigValues} [initialConfig]
 * @returns {ShimmedObject}
 */
function setGlobalVars(idb, initialConfig) {
  if (initialConfig) {
    setConfig(initialConfig);
  }
  const IDB = idb || globalThis || {};
  /**
   * @typedef {any} AnyClass
   */
  /**
   * @typedef {any} AnyValue
   */
  /**
   * @typedef {Function} AnyFunction
   */
  /**
   * @param {string} name
   * @param {AnyClass} value
   * @param {PropertyDescriptor & {
   *   shimNS?: object
   * }|undefined} [propDesc]
   * @returns {void}
   */
  function shim(name, value, propDesc) {
    if (!propDesc || !Object.defineProperty) {
      try {
        // Try setting the property. This will fail if the property is read-only.
        // @ts-expect-error It's ok
        IDB[name] = value;
      } catch (e) {
        console.log(e);
      }
    }
    if (
    // @ts-expect-error It's ok
    IDB[name] !== value && Object.defineProperty) {
      // Setting a read-only property failed, so try re-defining the property
      try {
        let desc = propDesc || {};
        if (!('get' in desc)) {
          if (!('value' in desc)) {
            desc.value = value;
          }
          if (!('writable' in desc)) {
            desc.writable = true;
          }
        } else {
          const o = {
            /**
             * @returns {AnyValue}
             */
            get [name]() {
              return /** @type {AnyFunction} */( /** @type {PropertyDescriptor} */propDesc.get).call(this);
            }
          };
          desc = /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(o, name);
        }
        Object.defineProperty(IDB, name, desc);
      } catch (e) {
        // With `indexedDB`, PhantomJS fails here and below but
        //  not above, while Chrome is reverse (and Firefox doesn't
        //  get here since no WebSQL to use for shimming)
      }
    }

    // @ts-expect-error It's ok
    if (IDB[name] !== value) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('Unable to shim ' + name);
      }
    }
  }
  if (CFG.win.openDatabase !== undefined) {
    shim('shimIndexedDB', shimIndexedDB, {
      enumerable: false,
      configurable: true
    });
  }
  if ('shimIndexedDB' in IDB && IDB.shimIndexedDB) {
    IDB.shimIndexedDB.__useShim = function () {
      /**
       *
       * @param {"Shim"|""} [prefix]
       * @returns {void}
       */
      function setNonIDBGlobals(prefix = '') {
        shim(prefix + 'DOMException', ShimDOMException);
        shim(prefix + 'DOMStringList', DOMStringList, {
          enumerable: false,
          configurable: true,
          writable: true,
          value: DOMStringList
        });
        shim(prefix + 'Event', ShimEvent, {
          configurable: true,
          writable: true,
          value: ShimEvent,
          enumerable: false
        });
        shim(prefix + 'CustomEvent', ShimCustomEvent, {
          configurable: true,
          writable: true,
          value: ShimCustomEvent,
          enumerable: false
        });
        shim(prefix + 'EventTarget', EventTarget, {
          configurable: true,
          writable: true,
          value: EventTarget,
          enumerable: false
        });
      }
      const shimIDBFactory = IDBFactory;
      if (CFG.win.openDatabase !== undefined) {
        shimIndexedDB.__openDatabase = CFG.win.openDatabase.bind(CFG.win); // We cache here in case the function is overwritten later as by the IndexedDB support promises tests
        // Polyfill ALL of IndexedDB, using WebSQL
        shim('indexedDB', shimIndexedDB, {
          enumerable: true,
          configurable: true,
          get() {
            if (this !== IDB && !isNullish(this) && !this.shimNS) {
              // Latter is hack for test environment
              throw new TypeError('Illegal invocation');
            }
            return shimIndexedDB;
          }
        });
        /** @type {[string, any][]} */
        [['IDBFactory', shimIDBFactory], ['IDBDatabase', IDBDatabase], ['IDBObjectStore', IDBObjectStore], ['IDBIndex', IDBIndex], ['IDBTransaction', IDBTransaction], ['IDBCursor', IDBCursor], ['IDBCursorWithValue', IDBCursorWithValue], ['IDBKeyRange', IDBKeyRange], ['IDBRequest', IDBRequest], ['IDBOpenDBRequest', IDBOpenDBRequest], ['IDBVersionChangeEvent', IDBVersionChangeEvent]].forEach(([prop, obj]) => {
          shim(prop, obj, {
            enumerable: false,
            configurable: true
          });
        });
        // For Node environments
        if (CFG.fs) {
          setFS(CFG.fs);
        }
        if (CFG.fullIDLSupport) {
          // Slow per MDN so off by default! Though apparently needed for WebIDL: http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements

          Object.setPrototypeOf(IDB.IDBOpenDBRequest, IDB.IDBRequest);
          Object.setPrototypeOf(IDB.IDBCursorWithValue, IDB.IDBCursor);
          Object.setPrototypeOf(IDBDatabase, EventTarget);
          Object.setPrototypeOf(IDBRequest, EventTarget);
          Object.setPrototypeOf(IDBTransaction, EventTarget);
          Object.setPrototypeOf(IDBVersionChangeEvent, ShimEvent);
          Object.setPrototypeOf(ShimDOMException, Error);
          Object.setPrototypeOf(ShimDOMException.prototype, Error.prototype);
          setPrototypeOfCustomEvent();
        }
        if (IDB.indexedDB && !IDB.indexedDB.toString().includes('[native code]')) {
          if (CFG.addNonIDBGlobals) {
            // As `DOMStringList` exists per IDL (and Chrome) in the global
            //   thread (but not in workers), we prefix the name to avoid
            //   shadowing or conflicts
            setNonIDBGlobals('Shim');
          }
          if (CFG.replaceNonIDBGlobals) {
            setNonIDBGlobals();
          }
        }
        /* istanbul ignore next -- TS guard */
        if (!IDB.shimIndexedDB) {
          return;
        }
        IDB.shimIndexedDB.__setConnectionQueueOrigin();
      }
    };
    IDB.shimIndexedDB.__debug = function (val) {
      CFG.DEBUG = val;
    };
    IDB.shimIndexedDB.__setConfig = setConfig;

    /** @type {GetConfig} */
    IDB.shimIndexedDB.__getConfig = function (prop) {
      if (!(prop in CFG)) {
        throw new Error(prop + ' is not a valid configuration property');
      }
      return CFG[prop];
    };

    /** @type {SetUnicodeIdentifiers} */
    IDB.shimIndexedDB.__setUnicodeIdentifiers = function ({
      UnicodeIDStart,
      UnicodeIDContinue
    }) {
      setConfig({
        UnicodeIDStart,
        UnicodeIDContinue
      });
    };
  } else {
    // We no-op the harmless set-up properties and methods with a warning; the `IDBFactory` methods,
    //    however (including our non-standard methods), are not stubbed as they ought
    //    to fail earlier rather than potentially having side effects.
    IDB.shimIndexedDB = /** @type {ShimIndexedDB} */{};
    /** @type {const} */
    ['__useShim', '__debug', '__setConfig', '__getConfig', '__setUnicodeIdentifiers'].forEach(prop => {
      /** @type {ShimIndexedDB} */IDB.shimIndexedDB[prop] = /** @type {() => any} */function () {
        console.warn('This browser does not have WebSQL to shim.');
      };
    });
  }

  // Workaround to prevent an error in Firefox
  if (!('indexedDB' in IDB) && typeof window !== 'undefined') {
    // 2nd condition avoids problems in Node
    IDB.indexedDB = /** @type {IDBFactory} */IDB.indexedDB || 'webkitIndexedDB' in IDB && IDB.webkitIndexedDB || 'mozIndexedDB' in IDB && IDB.mozIndexedDB || 'oIndexedDB' in IDB && IDB.oIndexedDB || 'msIndexedDB' in IDB && IDB.msIndexedDB;
  }

  // Detect browsers with known IndexedDB issues (e.g. Android pre-4.4)
  let poorIndexedDbSupport = false;
  if (typeof navigator !== 'undefined' &&
  // Not apparently defined in React Native
  navigator.userAgent && (
  // Ignore Node or other environments
  // Bad non-Chrome Android support
  /Android (?:2|3|4\.[0-3])/u.test(navigator.userAgent) && !navigator.userAgent.includes('Chrome') ||
  // Bad non-Safari iOS9 support (see <https://github.com/axemclion/IndexedDBShim/issues/252>)
  (!navigator.userAgent.includes('Safari') || navigator.userAgent.includes('Chrome')) &&
  // Exclude genuine Safari: http://stackoverflow.com/a/7768006/271577
  // Detect iOS: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
  // and detect version 9: http://stackoverflow.com/a/26363560/271577
  /(iPad|iPhone|iPod).* os 9_/ui.test(navigator.userAgent) && !('MSStream' in window) // But avoid IE11
  )) {
    poorIndexedDbSupport = true;
  }
  if (!CFG.DEFAULT_DB_SIZE) {
    CFG.DEFAULT_DB_SIZE = (
    // Safari currently requires larger size: (We don't need a larger size for Node as node-websql doesn't use this info)
    // https://github.com/axemclion/IndexedDBShim/issues/41
    // https://github.com/axemclion/IndexedDBShim/issues/115
    typeof navigator !== 'undefined' &&
    // React Native
    navigator.userAgent && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') ? 25 : 4) * 1024 * 1024;
  }
  if (!CFG.avoidAutoShim && (!IDB.indexedDB || poorIndexedDbSupport) && CFG.win.openDatabase !== undefined) {
    IDB.shimIndexedDB.__useShim();
  } else {
    IDB.IDBDatabase = IDB.IDBDatabase || 'webkitIDBDatabase' in IDB && IDB.webkitIDBDatabase;
    IDB.IDBTransaction = IDB.IDBTransaction || 'webkitIDBTransaction' in IDB && IDB.webkitIDBTransaction || {};
    IDB.IDBCursor = IDB.IDBCursor || 'webkitIDBCursor' in IDB && IDB.webkitIDBCursor;
    IDB.IDBKeyRange = IDB.IDBKeyRange || 'webkitIDBKeyRange' in IDB && IDB.webkitIDBKeyRange;
  }
  return /** @type {ShimmedObject} */IDB;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var nextTick$1 = {};

nextTick$1.test = function () {
  // Don't get fooled by e.g. browserify environments.
  return typeof process !== 'undefined' && !process.browser;
};
nextTick$1.install = function (func) {
  return function () {
    process.nextTick(func);
  };
};

var queueMicrotask = {};

queueMicrotask.test = function () {
  return typeof commonjsGlobal.queueMicrotask === 'function';
};
queueMicrotask.install = function (func) {
  return function () {
    commonjsGlobal.queueMicrotask(func);
  };
};

var mutation = {};

//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = commonjsGlobal.MutationObserver || commonjsGlobal.WebKitMutationObserver;
mutation.test = function () {
  return Mutation;
};
mutation.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = commonjsGlobal.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = called = ++called % 2;
  };
};

var messageChannel = {};

messageChannel.test = function () {
  if (commonjsGlobal.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof commonjsGlobal.MessageChannel !== 'undefined';
};
messageChannel.install = function (func) {
  var channel = new commonjsGlobal.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};

var stateChange = {};

stateChange.test = function () {
  return 'document' in commonjsGlobal && 'onreadystatechange' in commonjsGlobal.document.createElement('script');
};
stateChange.install = function (handle) {
  return function () {
    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = commonjsGlobal.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();
      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    commonjsGlobal.document.documentElement.appendChild(scriptEl);
    return handle;
  };
};

var timeout = {};

timeout.test = function () {
  return true;
};
timeout.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};

var types$1 = [nextTick$1, queueMicrotask, mutation, messageChannel, stateChange, timeout];
var draining;
var currentQueue;
var queueIndex = -1;
var queue = [];
var scheduled = false;
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
    nextTick();
  }
}

//named nextTick for less confusing stack traces
function nextTick() {
  if (draining) {
    return;
  }
  scheduled = false;
  draining = true;
  var len = queue.length;
  var timeout = setTimeout(cleanUpNextTick);
  while (len) {
    currentQueue = queue;
    queue = [];
    while (currentQueue && ++queueIndex < len) {
      currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  queueIndex = -1;
  draining = false;
  clearTimeout(timeout);
}
var scheduleDrain;
var i = -1;
var len = types$1.length;
while (++i < len) {
  if (types$1[i] && types$1[i].test && types$1[i].test()) {
    scheduleDrain = types$1[i].install(nextTick);
    break;
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  var fun = this.fun;
  var array = this.array;
  switch (array.length) {
    case 0:
      return fun();
    case 1:
      return fun(array[0]);
    case 2:
      return fun(array[0], array[1]);
    case 3:
      return fun(array[0], array[1], array[2]);
    default:
      return fun.apply(null, array);
  }
};
var lib$1 = immediate;
function immediate(task) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(task, args));
  if (!scheduled && !draining) {
    scheduled = true;
    scheduleDrain();
  }
}
var immediate$1 = /*@__PURE__*/getDefaultExportFromCjs(lib$1);

// Simple FIFO queue implementation to avoid having to do shift()
// on an array, which is slow.

function Queue() {
  this.length = 0;
}
Queue.prototype.push = function (item) {
  var node = {
    item: item
  };
  if (this.last) {
    this.last = this.last.next = node;
  } else {
    this.last = this.first = node;
  }
  this.length++;
};
Queue.prototype.shift = function () {
  var node = this.first;
  if (node) {
    this.first = node.next;
    if (! --this.length) {
      this.last = undefined;
    }
    return node.item;
  }
};
Queue.prototype.slice = function (start, end) {
  start = typeof start === 'undefined' ? 0 : start;
  end = typeof end === 'undefined' ? Infinity : end;
  var output = [];
  var i = 0;
  for (var node = this.first; node; node = node.next) {
    if (--end < 0) {
      break;
    } else if (++i > start) {
      output.push(node.item);
    }
  }
  return output;
};
var tinyQueue = Queue;
var Queue$1 = /*@__PURE__*/getDefaultExportFromCjs(tinyQueue);

var noopFn = function () {};
var noop = /*@__PURE__*/getDefaultExportFromCjs(noopFn);

function WebSQLRows(array) {
  this._array = array;
  this.length = array.length;
}
WebSQLRows.prototype.item = function (i) {
  return this._array[i];
};
function WebSQLResultSet(insertId, rowsAffected, rows) {
  this.insertId = insertId;
  this.rowsAffected = rowsAffected;
  this.rows = new WebSQLRows(rows);
}

function errorUnhandled() {
  return true; // a non-truthy return indicates error was handled
}

// WebSQL has some bizarre behavior regarding insertId/rowsAffected. To try
// to match the observed behavior of Chrome/Safari as much as possible, we
// sniff the SQL message to try to massage the returned insertId/rowsAffected.
// This helps us pass the tests, although it's error-prone and should
// probably be revised.
function massageSQLResult(sql, insertId, rowsAffected, rows) {
  if (/^\s*UPDATE\b/i.test(sql)) {
    // insertId is always undefined for "UPDATE" statements
    insertId = void 0;
  } else if (/^\s*CREATE\s+TABLE\b/i.test(sql)) {
    // WebSQL always returns an insertId of 0 for "CREATE TABLE" statements
    insertId = 0;
    rowsAffected = 0;
  } else if (/^\s*DROP\s+TABLE\b/i.test(sql)) {
    // WebSQL always returns insertId=undefined and rowsAffected=0
    // for "DROP TABLE" statements. Go figure.
    insertId = void 0;
    rowsAffected = 0;
  } else if (!/^\s*INSERT\b/i.test(sql)) {
    // for all non-inserts (deletes, etc.) insertId is always undefined
    // ¯\_(ツ)_/¯
    insertId = void 0;
  }
  return new WebSQLResultSet(insertId, rowsAffected, rows);
}
function SQLTask(sql, args, sqlCallback, sqlErrorCallback) {
  this.sql = sql;
  this.args = args;
  this.sqlCallback = sqlCallback;
  this.sqlErrorCallback = sqlErrorCallback;
}
function runBatch(self, batch) {
  function onDone() {
    self._running = false;
    runAllSql(self);
  }
  var readOnly = self._websqlDatabase._currentTask.readOnly;
  self._websqlDatabase._db.exec(batch, readOnly, function (err, results) {
    /* istanbul ignore next */
    if (err) {
      self._error = err;
      return onDone();
    }
    for (var i = 0; i < results.length; i++) {
      var res = results[i];
      var batchTask = batch[i];
      if (res.error) {
        if (batchTask.sqlErrorCallback(self, res.error)) {
          // user didn't handle the error
          self._error = res.error;
          return onDone();
        }
      } else {
        try {
          batchTask.sqlCallback(self, massageSQLResult(batch[i].sql, res.insertId, res.rowsAffected, res.rows));
        } catch (err) {
          self._error = err;
          runAllSql(self);
        }
      }
    }
    onDone();
  });
}
function runAllSql(self) {
  if (self._running || self._complete) {
    return;
  }
  if (self._error || !self._sqlQueue.length) {
    self._complete = true;
    return self._websqlDatabase._onTransactionComplete(self._error);
  }
  self._running = true;
  var batch = [];
  var task;
  while (task = self._sqlQueue.shift()) {
    batch.push(task);
  }
  runBatch(self, batch);
}
function executeSql(self, sql, args, sqlCallback, sqlErrorCallback, executeDelay) {
  self._sqlQueue.push(new SQLTask(sql, args, sqlCallback, sqlErrorCallback));
  if (self._runningTimeout) {
    return;
  }
  self._runningTimeout = true;
  executeDelay(function () {
    self._runningTimeout = false;
    runAllSql(self);
  });
}
function WebSQLTransaction(websqlDatabase, executeDelay) {
  this._websqlDatabase = websqlDatabase;
  this._error = null;
  this._complete = false;
  this._runningTimeout = false;
  this._executeDelay = executeDelay || immediate$1;
  this._sqlQueue = new Queue$1();
  if (!websqlDatabase._currentTask.readOnly) {
    // Since we serialize all access to the database, there is no need to
    // run read-only tasks in a transaction. This is a perf boost.
    this._sqlQueue.push(new SQLTask('BEGIN;', [], noop, noop));
  }
}

/**
 * @param {string} sql
 * @param {ObjectArray} args
 * @param {SQLStatementCallback} sqlCallback
 * @param {SQLStatementErrorCallback} sqlErrorCallback
 */
WebSQLTransaction.prototype.executeSql = function (sql, args, sqlCallback, sqlErrorCallback) {
  args = Array.isArray(args) ? args : [];
  sqlCallback = typeof sqlCallback === 'function' ? sqlCallback : noop;
  sqlErrorCallback = typeof sqlErrorCallback === 'function' ? sqlErrorCallback : errorUnhandled;
  executeSql(this, sql, args, sqlCallback, sqlErrorCallback, this._executeDelay);
};
WebSQLTransaction.prototype._checkDone = function () {
  runAllSql(this);
};

var ROLLBACK = [{
  sql: 'ROLLBACK;',
  args: []
}];
var COMMIT = [{
  sql: 'END;',
  args: []
}];

// v8 likes predictable objects
function TransactionTask(readOnly, txnCallback, errorCallback, successCallback, nonstandardTransCb) {
  this.readOnly = readOnly;
  this.txnCallback = txnCallback;
  this.errorCallback = errorCallback;
  this.successCallback = successCallback;
  this.nonstandardTransCb = nonstandardTransCb;
}
function WebSQLDatabase(dbVersion, db, webSQLOverrides) {
  this.version = dbVersion;
  this._db = db;
  this._txnQueue = new Queue$1();
  this._running = false;
  this._currentTask = null;
  this._transactionDelay = webSQLOverrides.transactionDelay || immediate$1;
  this._executeDelay = webSQLOverrides.executeDelay;
}
WebSQLDatabase.prototype._onTransactionComplete = function (err) {
  var self = this;
  function done(er) {
    if (er) {
      self._currentTask && self._currentTask.errorCallback(er);
    } else {
      self._currentTask && self._currentTask.successCallback();
    }
    self._running = false;
    self._currentTask = null;
    self._runNextTransaction();
  }
  function rollback(er, cb) {
    self._db.exec(ROLLBACK, false, function () {
      done(er);
      if (cb) {
        cb();
      }
    });
  }
  function commit(cb) {
    self._db.exec(COMMIT, false, function () {
      done();
      if (cb) {
        cb();
      }
    });
  }
  if (self._currentTask && self._currentTask.nonstandardTransCb) {
    var cont = self._currentTask.nonstandardTransCb.call(this, self._currentTask, err, done, rollback, commit);
    if (!cont) {
      return;
    }
  }
  if (self._currentTask && self._currentTask.readOnly) {
    done(err); // read-only doesn't require a transaction
  } else if (err) {
    rollback(err);
  } else {
    commit();
  }
};
WebSQLDatabase.prototype._runTransaction = function () {
  var self = this;
  var txn = new WebSQLTransaction(self, this._executeDelay);
  this._transactionDelay(function () {
    self._currentTask.txnCallback(txn);
    txn._checkDone();
  });
};
WebSQLDatabase.prototype._runNextTransaction = function () {
  if (this._running) {
    return;
  }
  var task = this._txnQueue.shift();
  if (!task) {
    return;
  }
  this._currentTask = task;
  this._running = true;
  this._runTransaction();
};
WebSQLDatabase.prototype._createTransaction = function (readOnly, txnCallback, errorCallback, successCallback, nonstandardTransCb) {
  errorCallback = errorCallback || noop;
  successCallback = successCallback || noop;
  if (typeof txnCallback !== 'function') {
    throw new Error('The callback provided as parameter 1 is not a function.');
  }
  this._txnQueue.push(new TransactionTask(readOnly, txnCallback, errorCallback, successCallback, nonstandardTransCb));
  this._runNextTransaction();
};

/**
 * @param {(trans: import('./WebSQLTransaction.js').default) => void} txnCallback
 * @param {(err: SQLError) => void} [errorCallback]
 * @param {() => void} [successCallback]
 * @param {(
 *   currentTask: TransactionTask,
 *   err: Error,
 *   done: () => void,
 *   rollback: (err: boolean|Error|SQLError, cb: () => void) => void,
 *   commit: (cb: () => void) => void
 * ) => boolean} [nonstandardTransCb]
 */
WebSQLDatabase.prototype.transaction = function (txnCallback, errorCallback, successCallback, nonstandardTransCb) {
  this._createTransaction(false, txnCallback, errorCallback, successCallback, nonstandardTransCb);
};

/**
 * @param {(trans: import('./WebSQLTransaction.js').default) => void} txnCallback
 * @param {(err: Error) => void} [errorCallback]
 * @param {() => void} [successCallback]
 */
WebSQLDatabase.prototype.readTransaction = function (txnCallback, errorCallback, successCallback) {
  this._createTransaction(true, txnCallback, errorCallback, successCallback);
};

function customOpenDatabase(SQLiteDatabase, opts) {
  opts = opts || {};
  var sqliteOpts = opts.sqlite;
  var webSQLOverrides = opts.websql || {};
  var openDelay = webSQLOverrides.openDelay || immediate$1;
  function createDb(dbName, dbVersion) {
    var sqliteDatabase = new SQLiteDatabase(dbName, sqliteOpts);
    return new WebSQLDatabase(dbVersion, sqliteDatabase, webSQLOverrides);
  }
  function openDatabase(args) {
    if (args.length < 4) {
      throw new Error('Failed to execute \'openDatabase\': ' + '4 arguments required, but only ' + args.length + ' present');
    }
    var dbName = args[0];
    var dbVersion = args[1];
    // db description and size are ignored
    var callback = args[4];
    var db = createDb(dbName, dbVersion);
    if (typeof callback === 'function') {
      openDelay(function () {
        callback(db);
      });
    }
    return db;
  }
  return (...args) => openDatabase(args);
}

var sqlite3$1 = {exports: {}};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var sqlite3Binding = {exports: {}};

var nodePreGyp = {exports: {}};

var s3_setup = {exports: {}};

(function (module, exports) {

  module.exports = exports;
  const url = require$$0;
  const fs = require$$0$1;
  const path$1 = path;
  module.exports.detect = function (opts, config) {
    const to = opts.hosted_path;
    const uri = url.parse(to);
    config.prefix = !uri.pathname || uri.pathname === '/' ? '' : uri.pathname.replace('/', '');
    if (opts.bucket && opts.region) {
      config.bucket = opts.bucket;
      config.region = opts.region;
      config.endpoint = opts.host;
      config.s3ForcePathStyle = opts.s3ForcePathStyle;
    } else {
      const parts = uri.hostname.split('.s3');
      const bucket = parts[0];
      if (!bucket) {
        return;
      }
      if (!config.bucket) {
        config.bucket = bucket;
      }
      if (!config.region) {
        const region = parts[1].slice(1).split('.')[0];
        if (region === 'amazonaws') {
          config.region = 'us-east-1';
        } else {
          config.region = region;
        }
      }
    }
  };
  module.exports.get_s3 = function (config) {
    if (process.env.node_pre_gyp_mock_s3) {
      // here we're mocking. node_pre_gyp_mock_s3 is the scratch directory
      // for the mock code.
      const AWSMock = require$$3;
      const os = require$$4;
      AWSMock.config.basePath = `${os.tmpdir()}/mock`;
      const s3 = AWSMock.S3();

      // wrapped callback maker. fs calls return code of ENOENT but AWS.S3 returns
      // NotFound.
      const wcb = fn => (err, ...args) => {
        if (err && err.code === 'ENOENT') {
          err.code = 'NotFound';
        }
        return fn(err, ...args);
      };
      return {
        listObjects(params, callback) {
          return s3.listObjects(params, wcb(callback));
        },
        headObject(params, callback) {
          return s3.headObject(params, wcb(callback));
        },
        deleteObject(params, callback) {
          return s3.deleteObject(params, wcb(callback));
        },
        putObject(params, callback) {
          return s3.putObject(params, wcb(callback));
        }
      };
    }

    // if not mocking then setup real s3.
    const AWS = require$$5$1;
    AWS.config.update(config);
    const s3 = new AWS.S3();

    // need to change if additional options need to be specified.
    return {
      listObjects(params, callback) {
        return s3.listObjects(params, callback);
      },
      headObject(params, callback) {
        return s3.headObject(params, callback);
      },
      deleteObject(params, callback) {
        return s3.deleteObject(params, callback);
      },
      putObject(params, callback) {
        return s3.putObject(params, callback);
      }
    };
  };

  //
  // function to get the mocking control function. if not mocking it returns a no-op.
  //
  // if mocking it sets up the mock http interceptors that use the mocked s3 file system
  // to fulfill reponses.
  module.exports.get_mockS3Http = function () {
    let mock_s3 = false;
    if (!process.env.node_pre_gyp_mock_s3) {
      return () => mock_s3;
    }
    const nock = require$$6;
    // the bucket used for testing, as addressed by https.
    const host = 'https://mapbox-node-pre-gyp-public-testing-bucket.s3.us-east-1.amazonaws.com';
    const mockDir = process.env.node_pre_gyp_mock_s3 + '/mapbox-node-pre-gyp-public-testing-bucket';

    // function to setup interceptors. they are "turned off" by setting mock_s3 to false.
    const mock_http = () => {
      // eslint-disable-next-line no-unused-vars
      function get(uri, requestBody) {
        const filepath = path$1.join(mockDir, uri.replace('%2B', '+'));
        try {
          fs.accessSync(filepath, fs.constants.R_OK);
        } catch (e) {
          return [404, 'not found\n'];
        }

        // the mock s3 functions just write to disk, so just read from it.
        return [200, fs.createReadStream(filepath)];
      }

      // eslint-disable-next-line no-unused-vars
      return nock(host).persist().get(() => mock_s3) // mock any uri for s3 when true
      .reply(get);
    };

    // setup interceptors. they check the mock_s3 flag to determine whether to intercept.
    mock_http();
    // function to turn matching all requests to s3 on/off.
    const mockS3Http = action => {
      const previous = mock_s3;
      if (action === 'off') {
        mock_s3 = false;
      } else if (action === 'on') {
        mock_s3 = true;
      } else if (action !== 'get') {
        throw new Error(`illegal action for setMockHttp ${action}`);
      }
      return previous;
    };

    // call mockS3Http with the argument
    // - 'on' - turn it on
    // - 'off' - turn it off (used by fetch.test.js so it doesn't interfere with redirects)
    // - 'get' - return true or false for 'on' or 'off'
    return mockS3Http;
  };
})(s3_setup, s3_setup.exports);
var s3_setupExports = s3_setup.exports;

var nopt = {exports: {}};

var abbrev = {exports: {}};

(function (module, exports) {
  module.exports = abbrev.abbrev = abbrev;
  abbrev.monkeyPatch = monkeyPatch;
  function monkeyPatch() {
    Object.defineProperty(Array.prototype, 'abbrev', {
      value: function () {
        return abbrev(this);
      },
      enumerable: false,
      configurable: true,
      writable: true
    });
    Object.defineProperty(Object.prototype, 'abbrev', {
      value: function () {
        return abbrev(Object.keys(this));
      },
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  function abbrev(list) {
    if (arguments.length !== 1 || !Array.isArray(list)) {
      list = Array.prototype.slice.call(arguments, 0);
    }
    for (var i = 0, l = list.length, args = []; i < l; i++) {
      args[i] = typeof list[i] === "string" ? list[i] : String(list[i]);
    }

    // sort them lexicographically, so that they're next to their nearest kin
    args = args.sort(lexSort);

    // walk through each, seeing how much it has in common with the next and previous
    var abbrevs = {},
      prev = "";
    for (var i = 0, l = args.length; i < l; i++) {
      var current = args[i],
        next = args[i + 1] || "",
        nextMatches = true,
        prevMatches = true;
      if (current === next) continue;
      for (var j = 0, cl = current.length; j < cl; j++) {
        var curChar = current.charAt(j);
        nextMatches = nextMatches && curChar === next.charAt(j);
        prevMatches = prevMatches && curChar === prev.charAt(j);
        if (!nextMatches && !prevMatches) {
          j++;
          break;
        }
      }
      prev = current;
      if (j === cl) {
        abbrevs[current] = current;
        continue;
      }
      for (var a = current.substr(0, j); j <= cl; j++) {
        abbrevs[a] = current;
        a += current.charAt(j);
      }
    }
    return abbrevs;
  }
  function lexSort(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  }
})(abbrev);
var abbrevExports = abbrev.exports;

(function (module, exports) {
  // info about each config option.

  var debug = process.env.DEBUG_NOPT || process.env.NOPT_DEBUG ? function () {
    console.error.apply(console, arguments);
  } : function () {};
  var url = require$$0,
    path$1 = path,
    Stream = require$$2.Stream,
    abbrev = abbrevExports,
    os = require$$4;
  module.exports = exports = nopt;
  exports.clean = clean;
  exports.typeDefs = {
    String: {
      type: String,
      validate: validateString
    },
    Boolean: {
      type: Boolean,
      validate: validateBoolean
    },
    url: {
      type: url,
      validate: validateUrl
    },
    Number: {
      type: Number,
      validate: validateNumber
    },
    path: {
      type: path$1,
      validate: validatePath
    },
    Stream: {
      type: Stream,
      validate: validateStream
    },
    Date: {
      type: Date,
      validate: validateDate
    }
  };
  function nopt(types, shorthands, args, slice) {
    args = args || process.argv;
    types = types || {};
    shorthands = shorthands || {};
    if (typeof slice !== "number") slice = 2;
    debug(types, shorthands, args, slice);
    args = args.slice(slice);
    var data = {},
      argv = {
        remain: [],
        cooked: args,
        original: args.slice(0)
      };
    parse(args, data, argv.remain, types, shorthands);
    // now data is full
    clean(data, types, exports.typeDefs);
    data.argv = argv;
    Object.defineProperty(data.argv, 'toString', {
      value: function () {
        return this.original.map(JSON.stringify).join(" ");
      },
      enumerable: false
    });
    return data;
  }
  function clean(data, types, typeDefs) {
    typeDefs = typeDefs || exports.typeDefs;
    var remove = {},
      typeDefault = [false, true, null, String, Array];
    Object.keys(data).forEach(function (k) {
      if (k === "argv") return;
      var val = data[k],
        isArray = Array.isArray(val),
        type = types[k];
      if (!isArray) val = [val];
      if (!type) type = typeDefault;
      if (type === Array) type = typeDefault.concat(Array);
      if (!Array.isArray(type)) type = [type];
      debug("val=%j", val);
      debug("types=", type);
      val = val.map(function (val) {
        // if it's an unknown value, then parse false/true/null/numbers/dates
        if (typeof val === "string") {
          debug("string %j", val);
          val = val.trim();
          if (val === "null" && ~type.indexOf(null) || val === "true" && (~type.indexOf(true) || ~type.indexOf(Boolean)) || val === "false" && (~type.indexOf(false) || ~type.indexOf(Boolean))) {
            val = JSON.parse(val);
            debug("jsonable %j", val);
          } else if (~type.indexOf(Number) && !isNaN(val)) {
            debug("convert to number", val);
            val = +val;
          } else if (~type.indexOf(Date) && !isNaN(Date.parse(val))) {
            debug("convert to date", val);
            val = new Date(val);
          }
        }
        if (!types.hasOwnProperty(k)) {
          return val;
        }

        // allow `--no-blah` to set 'blah' to null if null is allowed
        if (val === false && ~type.indexOf(null) && !(~type.indexOf(false) || ~type.indexOf(Boolean))) {
          val = null;
        }
        var d = {};
        d[k] = val;
        debug("prevalidated val", d, val, types[k]);
        if (!validate(d, k, val, types[k], typeDefs)) {
          if (exports.invalidHandler) {
            exports.invalidHandler(k, val, types[k], data);
          } else if (exports.invalidHandler !== false) {
            debug("invalid: " + k + "=" + val, types[k]);
          }
          return remove;
        }
        debug("validated val", d, val, types[k]);
        return d[k];
      }).filter(function (val) {
        return val !== remove;
      });

      // if we allow Array specifically, then an empty array is how we
      // express 'no value here', not null.  Allow it.
      if (!val.length && type.indexOf(Array) === -1) {
        debug('VAL HAS NO LENGTH, DELETE IT', val, k, type.indexOf(Array));
        delete data[k];
      } else if (isArray) {
        debug(isArray, data[k], val);
        data[k] = val;
      } else data[k] = val[0];
      debug("k=%s val=%j", k, val, data[k]);
    });
  }
  function validateString(data, k, val) {
    data[k] = String(val);
  }
  function validatePath(data, k, val) {
    if (val === true) return false;
    if (val === null) return true;
    val = String(val);
    var isWin = process.platform === 'win32',
      homePattern = isWin ? /^~(\/|\\)/ : /^~\//,
      home = os.homedir();
    if (home && val.match(homePattern)) {
      data[k] = path$1.resolve(home, val.substr(2));
    } else {
      data[k] = path$1.resolve(val);
    }
    return true;
  }
  function validateNumber(data, k, val) {
    debug("validate Number %j %j %j", k, val, isNaN(val));
    if (isNaN(val)) return false;
    data[k] = +val;
  }
  function validateDate(data, k, val) {
    var s = Date.parse(val);
    debug("validate Date %j %j %j", k, val, s);
    if (isNaN(s)) return false;
    data[k] = new Date(val);
  }
  function validateBoolean(data, k, val) {
    if (val instanceof Boolean) val = val.valueOf();else if (typeof val === "string") {
      if (!isNaN(val)) val = !!+val;else if (val === "null" || val === "false") val = false;else val = true;
    } else val = !!val;
    data[k] = val;
  }
  function validateUrl(data, k, val) {
    val = url.parse(String(val));
    if (!val.host) return false;
    data[k] = val.href;
  }
  function validateStream(data, k, val) {
    if (!(val instanceof Stream)) return false;
    data[k] = val;
  }
  function validate(data, k, val, type, typeDefs) {
    // arrays are lists of types.
    if (Array.isArray(type)) {
      for (var i = 0, l = type.length; i < l; i++) {
        if (type[i] === Array) continue;
        if (validate(data, k, val, type[i], typeDefs)) return true;
      }
      delete data[k];
      return false;
    }

    // an array of anything?
    if (type === Array) return true;

    // NaN is poisonous.  Means that something is not allowed.
    if (type !== type) {
      debug("Poison NaN", k, val, type);
      delete data[k];
      return false;
    }

    // explicit list of values
    if (val === type) {
      debug("Explicitly allowed %j", val);
      // if (isArray) (data[k] = data[k] || []).push(val)
      // else data[k] = val
      data[k] = val;
      return true;
    }

    // now go through the list of typeDefs, validate against each one.
    var ok = false,
      types = Object.keys(typeDefs);
    for (var i = 0, l = types.length; i < l; i++) {
      debug("test type %j %j %j", k, val, types[i]);
      var t = typeDefs[types[i]];
      if (t && (type && type.name && t.type && t.type.name ? type.name === t.type.name : type === t.type)) {
        var d = {};
        ok = false !== t.validate(d, k, val);
        val = d[k];
        if (ok) {
          // if (isArray) (data[k] = data[k] || []).push(val)
          // else data[k] = val
          data[k] = val;
          break;
        }
      }
    }
    debug("OK? %j (%j %j %j)", ok, k, val, types[i]);
    if (!ok) delete data[k];
    return ok;
  }
  function parse(args, data, remain, types, shorthands) {
    debug("parse", args, data, remain);
    var abbrevs = abbrev(Object.keys(types)),
      shortAbbr = abbrev(Object.keys(shorthands));
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      debug("arg", arg);
      if (arg.match(/^-{2,}$/)) {
        // done with keys.
        // the rest are args.
        remain.push.apply(remain, args.slice(i + 1));
        args[i] = "--";
        break;
      }
      var hadEq = false;
      if (arg.charAt(0) === "-" && arg.length > 1) {
        var at = arg.indexOf('=');
        if (at > -1) {
          hadEq = true;
          var v = arg.substr(at + 1);
          arg = arg.substr(0, at);
          args.splice(i, 1, arg, v);
        }

        // see if it's a shorthand
        // if so, splice and back up to re-parse it.
        var shRes = resolveShort(arg, shorthands, shortAbbr, abbrevs);
        debug("arg=%j shRes=%j", arg, shRes);
        if (shRes) {
          debug(arg, shRes);
          args.splice.apply(args, [i, 1].concat(shRes));
          if (arg !== shRes[0]) {
            i--;
            continue;
          }
        }
        arg = arg.replace(/^-+/, "");
        var no = null;
        while (arg.toLowerCase().indexOf("no-") === 0) {
          no = !no;
          arg = arg.substr(3);
        }
        if (abbrevs[arg]) arg = abbrevs[arg];
        var argType = types[arg];
        var isTypeArray = Array.isArray(argType);
        if (isTypeArray && argType.length === 1) {
          isTypeArray = false;
          argType = argType[0];
        }
        var isArray = argType === Array || isTypeArray && argType.indexOf(Array) !== -1;

        // allow unknown things to be arrays if specified multiple times.
        if (!types.hasOwnProperty(arg) && data.hasOwnProperty(arg)) {
          if (!Array.isArray(data[arg])) data[arg] = [data[arg]];
          isArray = true;
        }
        var val,
          la = args[i + 1];
        var isBool = typeof no === 'boolean' || argType === Boolean || isTypeArray && argType.indexOf(Boolean) !== -1 || typeof argType === 'undefined' && !hadEq || la === "false" && (argType === null || isTypeArray && ~argType.indexOf(null));
        if (isBool) {
          // just set and move along
          val = !no;
          // however, also support --bool true or --bool false
          if (la === "true" || la === "false") {
            val = JSON.parse(la);
            la = null;
            if (no) val = !val;
            i++;
          }

          // also support "foo":[Boolean, "bar"] and "--foo bar"
          if (isTypeArray && la) {
            if (~argType.indexOf(la)) {
              // an explicit type
              val = la;
              i++;
            } else if (la === "null" && ~argType.indexOf(null)) {
              // null allowed
              val = null;
              i++;
            } else if (!la.match(/^-{2,}[^-]/) && !isNaN(la) && ~argType.indexOf(Number)) {
              // number
              val = +la;
              i++;
            } else if (!la.match(/^-[^-]/) && ~argType.indexOf(String)) {
              // string
              val = la;
              i++;
            }
          }
          if (isArray) (data[arg] = data[arg] || []).push(val);else data[arg] = val;
          continue;
        }
        if (argType === String) {
          if (la === undefined) {
            la = "";
          } else if (la.match(/^-{1,2}[^-]+/)) {
            la = "";
            i--;
          }
        }
        if (la && la.match(/^-{2,}$/)) {
          la = undefined;
          i--;
        }
        val = la === undefined ? true : la;
        if (isArray) (data[arg] = data[arg] || []).push(val);else data[arg] = val;
        i++;
        continue;
      }
      remain.push(arg);
    }
  }
  function resolveShort(arg, shorthands, shortAbbr, abbrevs) {
    // handle single-char shorthands glommed together, like
    // npm ls -glp, but only if there is one dash, and only if
    // all of the chars are single-char shorthands, and it's
    // not a match to some other abbrev.
    arg = arg.replace(/^-+/, '');

    // if it's an exact known option, then don't go any further
    if (abbrevs[arg] === arg) return null;

    // if it's an exact known shortopt, same deal
    if (shorthands[arg]) {
      // make it an array, if it's a list of words
      if (shorthands[arg] && !Array.isArray(shorthands[arg])) shorthands[arg] = shorthands[arg].split(/\s+/);
      return shorthands[arg];
    }

    // first check to see if this arg is a set of single-char shorthands
    var singles = shorthands.___singles;
    if (!singles) {
      singles = Object.keys(shorthands).filter(function (s) {
        return s.length === 1;
      }).reduce(function (l, r) {
        l[r] = true;
        return l;
      }, {});
      shorthands.___singles = singles;
      debug('shorthand singles', singles);
    }
    var chrs = arg.split("").filter(function (c) {
      return singles[c];
    });
    if (chrs.join("") === arg) return chrs.map(function (c) {
      return shorthands[c];
    }).reduce(function (l, r) {
      return l.concat(r);
    }, []);

    // if it's an arg abbrev, and not a literal shorthand, then prefer the arg
    if (abbrevs[arg] && !shorthands[arg]) return null;

    // if it's an abbr for a shorthand, then use that
    if (shortAbbr[arg]) arg = shortAbbr[arg];

    // make it an array, if it's a list of words
    if (shorthands[arg] && !Array.isArray(shorthands[arg])) shorthands[arg] = shorthands[arg].split(/\s+/);
    return shorthands[arg];
  }
})(nopt, nopt.exports);
var noptExports = nopt.exports;

var log = {exports: {}};

var lib = {};

var trackerGroup = {exports: {}};

var trackerBase = {exports: {}};

var EventEmitter = require$$2$1.EventEmitter;
var util$4 = require$$0$2;
var trackerId = 0;
var TrackerBase$2 = trackerBase.exports = function (name) {
  EventEmitter.call(this);
  this.id = ++trackerId;
  this.name = name;
};
util$4.inherits(TrackerBase$2, EventEmitter);
var trackerBaseExports = trackerBase.exports;

var tracker = {exports: {}};

var util$3 = require$$0$2;
var TrackerBase$1 = trackerBaseExports;
var Tracker$2 = tracker.exports = function (name, todo) {
  TrackerBase$1.call(this, name);
  this.workDone = 0;
  this.workTodo = todo || 0;
};
util$3.inherits(Tracker$2, TrackerBase$1);
Tracker$2.prototype.completed = function () {
  return this.workTodo === 0 ? 0 : this.workDone / this.workTodo;
};
Tracker$2.prototype.addWork = function (work) {
  this.workTodo += work;
  this.emit('change', this.name, this.completed(), this);
};
Tracker$2.prototype.completeWork = function (work) {
  this.workDone += work;
  if (this.workDone > this.workTodo) {
    this.workDone = this.workTodo;
  }
  this.emit('change', this.name, this.completed(), this);
};
Tracker$2.prototype.finish = function () {
  this.workTodo = this.workDone = 1;
  this.emit('change', this.name, 1, this);
};
var trackerExports = tracker.exports;

var trackerStream = {exports: {}};

/**
 * Expose `Delegator`.
 */

var delegates = Delegator;

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.method = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);
  proto[name] = function () {
    return this[target][name].apply(this[target], arguments);
  };
  return this;
};

/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.access = function (name) {
  return this.getter(name).setter(name);
};

/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.getter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);
  proto.__defineGetter__(name, function () {
    return this[target][name];
  });
  return this;
};

/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.setter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);
  proto.__defineSetter__(name, function (val) {
    return this[target][name] = val;
  });
  return this;
};

/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);
  proto[name] = function (val) {
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };
  return this;
};

var util$2 = require$$0$2;
var stream = require$$1;
var delegate = delegates;
var Tracker$1 = trackerExports;
var TrackerStream$1 = trackerStream.exports = function (name, size, options) {
  stream.Transform.call(this, options);
  this.tracker = new Tracker$1(name, size);
  this.name = name;
  this.id = this.tracker.id;
  this.tracker.on('change', delegateChange(this));
};
util$2.inherits(TrackerStream$1, stream.Transform);
function delegateChange(trackerStream) {
  return function (name, completion, tracker) {
    trackerStream.emit('change', name, completion, trackerStream);
  };
}
TrackerStream$1.prototype._transform = function (data, encoding, cb) {
  this.tracker.completeWork(data.length ? data.length : 1);
  this.push(data);
  cb();
};
TrackerStream$1.prototype._flush = function (cb) {
  this.tracker.finish();
  cb();
};
delegate(TrackerStream$1.prototype, 'tracker').method('completed').method('addWork').method('finish');
var trackerStreamExports = trackerStream.exports;

var util$1 = require$$0$2;
var TrackerBase = trackerBaseExports;
var Tracker = trackerExports;
var TrackerStream = trackerStreamExports;
var TrackerGroup = trackerGroup.exports = function (name) {
  TrackerBase.call(this, name);
  this.parentGroup = null;
  this.trackers = [];
  this.completion = {};
  this.weight = {};
  this.totalWeight = 0;
  this.finished = false;
  this.bubbleChange = bubbleChange(this);
};
util$1.inherits(TrackerGroup, TrackerBase);
function bubbleChange(trackerGroup) {
  return function (name, completed, tracker) {
    trackerGroup.completion[tracker.id] = completed;
    if (trackerGroup.finished) {
      return;
    }
    trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup);
  };
}
TrackerGroup.prototype.nameInTree = function () {
  var names = [];
  var from = this;
  while (from) {
    names.unshift(from.name);
    from = from.parentGroup;
  }
  return names.join('/');
};
TrackerGroup.prototype.addUnit = function (unit, weight) {
  if (unit.addUnit) {
    var toTest = this;
    while (toTest) {
      if (unit === toTest) {
        throw new Error('Attempted to add tracker group ' + unit.name + ' to tree that already includes it ' + this.nameInTree(this));
      }
      toTest = toTest.parentGroup;
    }
    unit.parentGroup = this;
  }
  this.weight[unit.id] = weight || 1;
  this.totalWeight += this.weight[unit.id];
  this.trackers.push(unit);
  this.completion[unit.id] = unit.completed();
  unit.on('change', this.bubbleChange);
  if (!this.finished) {
    this.emit('change', unit.name, this.completion[unit.id], unit);
  }
  return unit;
};
TrackerGroup.prototype.completed = function () {
  if (this.trackers.length === 0) {
    return 0;
  }
  var valPerWeight = 1 / this.totalWeight;
  var completed = 0;
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var trackerId = this.trackers[ii].id;
    completed += valPerWeight * this.weight[trackerId] * this.completion[trackerId];
  }
  return completed;
};
TrackerGroup.prototype.newGroup = function (name, weight) {
  return this.addUnit(new TrackerGroup(name), weight);
};
TrackerGroup.prototype.newItem = function (name, todo, weight) {
  return this.addUnit(new Tracker(name, todo), weight);
};
TrackerGroup.prototype.newStream = function (name, todo, weight) {
  return this.addUnit(new TrackerStream(name, todo), weight);
};
TrackerGroup.prototype.finish = function () {
  this.finished = true;
  if (!this.trackers.length) {
    this.addUnit(new Tracker(), 1, true);
  }
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var tracker = this.trackers[ii];
    tracker.finish();
    tracker.removeListener('change', this.bubbleChange);
  }
  this.emit('change', this.name, 1, this);
};
var buffer = '                                  ';
TrackerGroup.prototype.debug = function (depth) {
  depth = depth || 0;
  var indent = depth ? buffer.substr(0, depth) : '';
  var output = indent + (this.name || 'top') + ': ' + this.completed() + '\n';
  this.trackers.forEach(function (tracker) {
    if (tracker instanceof TrackerGroup) {
      output += tracker.debug(depth + 1);
    } else {
      output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\n';
    }
  });
  return output;
};
var trackerGroupExports = trackerGroup.exports;

lib.TrackerGroup = trackerGroupExports;
lib.Tracker = trackerExports;
lib.TrackerStream = trackerStreamExports;

var plumbing = {exports: {}};

var consoleControlStrings = {};

// These tables borrowed from `ansi`

var prefix = '\x1b[';
consoleControlStrings.up = function up(num) {
  return prefix + (num || '') + 'A';
};
consoleControlStrings.down = function down(num) {
  return prefix + (num || '') + 'B';
};
consoleControlStrings.forward = function forward(num) {
  return prefix + (num || '') + 'C';
};
consoleControlStrings.back = function back(num) {
  return prefix + (num || '') + 'D';
};
consoleControlStrings.nextLine = function nextLine(num) {
  return prefix + (num || '') + 'E';
};
consoleControlStrings.previousLine = function previousLine(num) {
  return prefix + (num || '') + 'F';
};
consoleControlStrings.horizontalAbsolute = function horizontalAbsolute(num) {
  if (num == null) throw new Error('horizontalAboslute requires a column to position to');
  return prefix + num + 'G';
};
consoleControlStrings.eraseData = function eraseData() {
  return prefix + 'J';
};
consoleControlStrings.eraseLine = function eraseLine() {
  return prefix + 'K';
};
consoleControlStrings.goto = function (x, y) {
  return prefix + y + ';' + x + 'H';
};
consoleControlStrings.gotoSOL = function () {
  return '\r';
};
consoleControlStrings.beep = function () {
  return '\x07';
};
consoleControlStrings.hideCursor = function hideCursor() {
  return prefix + '?25l';
};
consoleControlStrings.showCursor = function showCursor() {
  return prefix + '?25h';
};
var colors = {
  reset: 0,
  // styles
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
  // resets
  stopBold: 22,
  stopItalic: 23,
  stopUnderline: 24,
  stopInverse: 27,
  // colors
  white: 37,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  magenta: 35,
  red: 31,
  yellow: 33,
  bgWhite: 47,
  bgBlack: 40,
  bgBlue: 44,
  bgCyan: 46,
  bgGreen: 42,
  bgMagenta: 45,
  bgRed: 41,
  bgYellow: 43,
  grey: 90,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,
  bgGrey: 100,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
};
consoleControlStrings.color = function color(colorWith) {
  if (arguments.length !== 1 || !Array.isArray(colorWith)) {
    colorWith = Array.prototype.slice.call(arguments);
  }
  return prefix + colorWith.map(colorNameToCode).join(';') + 'm';
};
function colorNameToCode(color) {
  if (colors[color] != null) return colors[color];
  throw new Error('Unknown color or style name: ' + color);
}

var renderTemplate$3 = {exports: {}};

var align$1 = {};

var stringWidth$5 = {exports: {}};

var ansiRegex$1 = ({
  onlyFirst = false
} = {}) => {
  const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
};

const ansiRegex = ansiRegex$1;
var stripAnsi$2 = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;

var isFullwidthCodePoint$2 = {exports: {}};

/* eslint-disable yoda */
const isFullwidthCodePoint$1 = codePoint => {
  if (Number.isNaN(codePoint)) {
    return false;
  }

  // Code points are derived from:
  // http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
  if (codePoint >= 0x1100 && (codePoint <= 0x115F ||
  // Hangul Jamo
  codePoint === 0x2329 ||
  // LEFT-POINTING ANGLE BRACKET
  codePoint === 0x232A ||
  // RIGHT-POINTING ANGLE BRACKET
  // CJK Radicals Supplement .. Enclosed CJK Letters and Months
  0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F ||
  // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
  0x3250 <= codePoint && codePoint <= 0x4DBF ||
  // CJK Unified Ideographs .. Yi Radicals
  0x4E00 <= codePoint && codePoint <= 0xA4C6 ||
  // Hangul Jamo Extended-A
  0xA960 <= codePoint && codePoint <= 0xA97C ||
  // Hangul Syllables
  0xAC00 <= codePoint && codePoint <= 0xD7A3 ||
  // CJK Compatibility Ideographs
  0xF900 <= codePoint && codePoint <= 0xFAFF ||
  // Vertical Forms
  0xFE10 <= codePoint && codePoint <= 0xFE19 ||
  // CJK Compatibility Forms .. Small Form Variants
  0xFE30 <= codePoint && codePoint <= 0xFE6B ||
  // Halfwidth and Fullwidth Forms
  0xFF01 <= codePoint && codePoint <= 0xFF60 || 0xFFE0 <= codePoint && codePoint <= 0xFFE6 ||
  // Kana Supplement
  0x1B000 <= codePoint && codePoint <= 0x1B001 ||
  // Enclosed Ideographic Supplement
  0x1F200 <= codePoint && codePoint <= 0x1F251 ||
  // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
  0x20000 <= codePoint && codePoint <= 0x3FFFD)) {
    return true;
  }
  return false;
};
isFullwidthCodePoint$2.exports = isFullwidthCodePoint$1;
isFullwidthCodePoint$2.exports.default = isFullwidthCodePoint$1;
var isFullwidthCodePointExports = isFullwidthCodePoint$2.exports;

var emojiRegex$1 = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};

const stripAnsi$1 = stripAnsi$2;
const isFullwidthCodePoint = isFullwidthCodePointExports;
const emojiRegex = emojiRegex$1;
const stringWidth$4 = string => {
  if (typeof string !== 'string' || string.length === 0) {
    return 0;
  }
  string = stripAnsi$1(string);
  if (string.length === 0) {
    return 0;
  }
  string = string.replace(emojiRegex(), '  ');
  let width = 0;
  for (let i = 0; i < string.length; i++) {
    const code = string.codePointAt(i);

    // Ignore control characters
    if (code <= 0x1F || code >= 0x7F && code <= 0x9F) {
      continue;
    }

    // Ignore combining characters
    if (code >= 0x300 && code <= 0x36F) {
      continue;
    }

    // Surrogates
    if (code > 0xFFFF) {
      i++;
    }
    width += isFullwidthCodePoint(code) ? 2 : 1;
  }
  return width;
};
stringWidth$5.exports = stringWidth$4;
// TODO: remove this in the next major version
stringWidth$5.exports.default = stringWidth$4;
var stringWidthExports = stringWidth$5.exports;

var stringWidth$3 = stringWidthExports;
align$1.center = alignCenter;
align$1.left = alignLeft;
align$1.right = alignRight;

// lodash's way of generating pad characters.

function createPadding(width) {
  var result = '';
  var string = ' ';
  var n = width;
  do {
    if (n % 2) {
      result += string;
    }
    n = Math.floor(n / 2);
    string += string;
  } while (n);
  return result;
}
function alignLeft(str, width) {
  var trimmed = str.trimRight();
  if (trimmed.length === 0 && str.length >= width) return str;
  var padding = '';
  var strWidth = stringWidth$3(trimmed);
  if (strWidth < width) {
    padding = createPadding(width - strWidth);
  }
  return trimmed + padding;
}
function alignRight(str, width) {
  var trimmed = str.trimLeft();
  if (trimmed.length === 0 && str.length >= width) return str;
  var padding = '';
  var strWidth = stringWidth$3(trimmed);
  if (strWidth < width) {
    padding = createPadding(width - strWidth);
  }
  return padding + trimmed;
}
function alignCenter(str, width) {
  var trimmed = str.trim();
  if (trimmed.length === 0 && str.length >= width) return str;
  var padLeft = '';
  var padRight = '';
  var strWidth = stringWidth$3(trimmed);
  if (strWidth < width) {
    var padLeftBy = parseInt((width - strWidth) / 2, 10);
    padLeft = createPadding(padLeftBy);
    padRight = createPadding(width - (strWidth + padLeftBy));
  }
  return padLeft + trimmed + padRight;
}

var aproba = validate$3;
function isArguments(thingy) {
  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee');
}
const types = {
  '*': {
    label: 'any',
    check: () => true
  },
  A: {
    label: 'array',
    check: _ => Array.isArray(_) || isArguments(_)
  },
  S: {
    label: 'string',
    check: _ => typeof _ === 'string'
  },
  N: {
    label: 'number',
    check: _ => typeof _ === 'number'
  },
  F: {
    label: 'function',
    check: _ => typeof _ === 'function'
  },
  O: {
    label: 'object',
    check: _ => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)
  },
  B: {
    label: 'boolean',
    check: _ => typeof _ === 'boolean'
  },
  E: {
    label: 'error',
    check: _ => _ instanceof Error
  },
  Z: {
    label: 'null',
    check: _ => _ == null
  }
};
function addSchema(schema, arity) {
  const group = arity[schema.length] = arity[schema.length] || [];
  if (group.indexOf(schema) === -1) group.push(schema);
}
function validate$3(rawSchemas, args) {
  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length);
  if (!rawSchemas) throw missingRequiredArg(0);
  if (!args) throw missingRequiredArg(1);
  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas);
  if (!types.A.check(args)) throw invalidType(1, ['array'], args);
  const schemas = rawSchemas.split('|');
  const arity = {};
  schemas.forEach(schema => {
    for (let ii = 0; ii < schema.length; ++ii) {
      const type = schema[ii];
      if (!types[type]) throw unknownType(ii, type);
    }
    if (/E.*E/.test(schema)) throw moreThanOneError(schema);
    addSchema(schema, arity);
    if (/E/.test(schema)) {
      addSchema(schema.replace(/E.*$/, 'E'), arity);
      addSchema(schema.replace(/E/, 'Z'), arity);
      if (schema.length === 1) addSchema('', arity);
    }
  });
  let matching = arity[args.length];
  if (!matching) {
    throw wrongNumberOfArgs(Object.keys(arity), args.length);
  }
  for (let ii = 0; ii < args.length; ++ii) {
    let newMatching = matching.filter(schema => {
      const type = schema[ii];
      const typeCheck = types[type].check;
      return typeCheck(args[ii]);
    });
    if (!newMatching.length) {
      const labels = matching.map(_ => types[_[ii]].label).filter(_ => _ != null);
      throw invalidType(ii, labels, args[ii]);
    }
    matching = newMatching;
  }
}
function missingRequiredArg(num) {
  return newException('EMISSINGARG', 'Missing required argument #' + (num + 1));
}
function unknownType(num, type) {
  return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1));
}
function invalidType(num, expectedTypes, value) {
  let valueType;
  Object.keys(types).forEach(typeCode => {
    if (types[typeCode].check(value)) valueType = types[typeCode].label;
  });
  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' + englishList(expectedTypes) + ' but got ' + valueType);
}
function englishList(list) {
  return list.join(', ').replace(/, ([^,]+)$/, ' or $1');
}
function wrongNumberOfArgs(expected, got) {
  const english = englishList(expected);
  const args = expected.every(ex => ex.length === 1) ? 'argument' : 'arguments';
  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got);
}
function moreThanOneError(schema) {
  return newException('ETOOMANYERRORTYPES', 'Only one error type per argument signature is allowed, more than one found in "' + schema + '"');
}
function newException(code, msg) {
  const err = new Error(msg);
  err.code = code;
  /* istanbul ignore else */
  if (Error.captureStackTrace) Error.captureStackTrace(err, validate$3);
  return err;
}

var stringWidth$2 = stringWidthExports;
var stripAnsi = stripAnsi$2;
var wideTruncate_1 = wideTruncate$2;
function wideTruncate$2(str, target) {
  if (stringWidth$2(str) === 0) return str;
  if (target <= 0) return '';
  if (stringWidth$2(str) <= target) return str;

  // We compute the number of bytes of ansi sequences here and add
  // that to our initial truncation to ensure that we don't slice one
  // that we want to keep in half.
  var noAnsi = stripAnsi(str);
  var ansiSize = str.length + noAnsi.length;
  var truncated = str.slice(0, target + ansiSize);

  // we have to shrink the result to account for our ansi sequence buffer
  // (if an ansi sequence was truncated) and double width characters.
  while (stringWidth$2(truncated) > target) {
    truncated = truncated.slice(0, -1);
  }
  return truncated;
}

var error$1 = {};

var util = require$$0$2;
var User = error$1.User = function User(msg) {
  var err = new Error(msg);
  Error.captureStackTrace(err, User);
  err.code = 'EGAUGE';
  return err;
};
error$1.MissingTemplateValue = function MissingTemplateValue(item, values) {
  var err = new User(util.format('Missing template value "%s"', item.type));
  Error.captureStackTrace(err, MissingTemplateValue);
  err.template = item;
  err.values = values;
  return err;
};
error$1.Internal = function Internal(msg) {
  var err = new Error(msg);
  Error.captureStackTrace(err, Internal);
  err.code = 'EGAUGEINTERNAL';
  return err;
};

var stringWidth$1 = stringWidthExports;
var templateItem = TemplateItem$1;
function isPercent(num) {
  if (typeof num !== 'string') return false;
  return num.slice(-1) === '%';
}
function percent(num) {
  return Number(num.slice(0, -1)) / 100;
}
function TemplateItem$1(values, outputLength) {
  this.overallOutputLength = outputLength;
  this.finished = false;
  this.type = null;
  this.value = null;
  this.length = null;
  this.maxLength = null;
  this.minLength = null;
  this.kerning = null;
  this.align = 'left';
  this.padLeft = 0;
  this.padRight = 0;
  this.index = null;
  this.first = null;
  this.last = null;
  if (typeof values === 'string') {
    this.value = values;
  } else {
    for (var prop in values) this[prop] = values[prop];
  }
  // Realize percents
  if (isPercent(this.length)) {
    this.length = Math.round(this.overallOutputLength * percent(this.length));
  }
  if (isPercent(this.minLength)) {
    this.minLength = Math.round(this.overallOutputLength * percent(this.minLength));
  }
  if (isPercent(this.maxLength)) {
    this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength));
  }
  return this;
}
TemplateItem$1.prototype = {};
TemplateItem$1.prototype.getBaseLength = function () {
  var length = this.length;
  if (length == null && typeof this.value === 'string' && this.maxLength == null && this.minLength == null) {
    length = stringWidth$1(this.value);
  }
  return length;
};
TemplateItem$1.prototype.getLength = function () {
  var length = this.getBaseLength();
  if (length == null) return null;
  return length + this.padLeft + this.padRight;
};
TemplateItem$1.prototype.getMaxLength = function () {
  if (this.maxLength == null) return null;
  return this.maxLength + this.padLeft + this.padRight;
};
TemplateItem$1.prototype.getMinLength = function () {
  if (this.minLength == null) return null;
  return this.minLength + this.padLeft + this.padRight;
};

var align = align$1;
var validate$2 = aproba;
var wideTruncate$1 = wideTruncate_1;
var error = error$1;
var TemplateItem = templateItem;
function renderValueWithValues(values) {
  return function (item) {
    return renderValue(item, values);
  };
}
var renderTemplate$2 = renderTemplate$3.exports = function (width, template, values) {
  var items = prepareItems(width, template, values);
  var rendered = items.map(renderValueWithValues(values)).join('');
  return align.left(wideTruncate$1(rendered, width), width);
};
function preType(item) {
  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
  return 'pre' + cappedTypeName;
}
function postType(item) {
  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
  return 'post' + cappedTypeName;
}
function hasPreOrPost(item, values) {
  if (!item.type) return;
  return values[preType(item)] || values[postType(item)];
}
function generatePreAndPost(baseItem, parentValues) {
  var item = Object.assign({}, baseItem);
  var values = Object.create(parentValues);
  var template = [];
  var pre = preType(item);
  var post = postType(item);
  if (values[pre]) {
    template.push({
      value: values[pre]
    });
    values[pre] = null;
  }
  item.minLength = null;
  item.length = null;
  item.maxLength = null;
  template.push(item);
  values[item.type] = values[item.type];
  if (values[post]) {
    template.push({
      value: values[post]
    });
    values[post] = null;
  }
  return function ($1, $2, length) {
    return renderTemplate$2(length, template, values);
  };
}
function prepareItems(width, template, values) {
  function cloneAndObjectify(item, index, arr) {
    var cloned = new TemplateItem(item, width);
    var type = cloned.type;
    if (cloned.value == null) {
      if (!(type in values)) {
        if (cloned.default == null) {
          throw new error.MissingTemplateValue(cloned, values);
        } else {
          cloned.value = cloned.default;
        }
      } else {
        cloned.value = values[type];
      }
    }
    if (cloned.value == null || cloned.value === '') return null;
    cloned.index = index;
    cloned.first = index === 0;
    cloned.last = index === arr.length - 1;
    if (hasPreOrPost(cloned, values)) cloned.value = generatePreAndPost(cloned, values);
    return cloned;
  }
  var output = template.map(cloneAndObjectify).filter(function (item) {
    return item != null;
  });
  var remainingSpace = width;
  var variableCount = output.length;
  function consumeSpace(length) {
    if (length > remainingSpace) length = remainingSpace;
    remainingSpace -= length;
  }
  function finishSizing(item, length) {
    if (item.finished) throw new error.Internal('Tried to finish template item that was already finished');
    if (length === Infinity) throw new error.Internal('Length of template item cannot be infinity');
    if (length != null) item.length = length;
    item.minLength = null;
    item.maxLength = null;
    --variableCount;
    item.finished = true;
    if (item.length == null) item.length = item.getBaseLength();
    if (item.length == null) throw new error.Internal('Finished template items must have a length');
    consumeSpace(item.getLength());
  }
  output.forEach(function (item) {
    if (!item.kerning) return;
    var prevPadRight = item.first ? 0 : output[item.index - 1].padRight;
    if (!item.first && prevPadRight < item.kerning) item.padLeft = item.kerning - prevPadRight;
    if (!item.last) item.padRight = item.kerning;
  });

  // Finish any that have a fixed (literal or intuited) length
  output.forEach(function (item) {
    if (item.getBaseLength() == null) return;
    finishSizing(item);
  });
  var resized = 0;
  var resizing;
  var hunkSize;
  do {
    resizing = false;
    hunkSize = Math.round(remainingSpace / variableCount);
    output.forEach(function (item) {
      if (item.finished) return;
      if (!item.maxLength) return;
      if (item.getMaxLength() < hunkSize) {
        finishSizing(item, item.maxLength);
        resizing = true;
      }
    });
  } while (resizing && resized++ < output.length);
  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining maxLength');
  resized = 0;
  do {
    resizing = false;
    hunkSize = Math.round(remainingSpace / variableCount);
    output.forEach(function (item) {
      if (item.finished) return;
      if (!item.minLength) return;
      if (item.getMinLength() >= hunkSize) {
        finishSizing(item, item.minLength);
        resizing = true;
      }
    });
  } while (resizing && resized++ < output.length);
  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining minLength');
  hunkSize = Math.round(remainingSpace / variableCount);
  output.forEach(function (item) {
    if (item.finished) return;
    finishSizing(item, hunkSize);
  });
  return output;
}
function renderFunction(item, values, length) {
  validate$2('OON', arguments);
  if (item.type) {
    return item.value(values, values[item.type + 'Theme'] || {}, length);
  } else {
    return item.value(values, {}, length);
  }
}
function renderValue(item, values) {
  var length = item.getBaseLength();
  var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value;
  if (value == null || value === '') return '';
  var alignWith = align[item.align] || align.left;
  var leftPadding = item.padLeft ? align.left('', item.padLeft) : '';
  var rightPadding = item.padRight ? align.right('', item.padRight) : '';
  var truncated = wideTruncate$1(String(value), length);
  var aligned = alignWith(truncated, length);
  return leftPadding + aligned + rightPadding;
}
var renderTemplateExports = renderTemplate$3.exports;

var consoleControl = consoleControlStrings;
var renderTemplate$1 = renderTemplateExports;
var validate$1 = aproba;
var Plumbing$1 = plumbing.exports = function (theme, template, width) {
  if (!width) width = 80;
  validate$1('OAN', [theme, template, width]);
  this.showing = false;
  this.theme = theme;
  this.width = width;
  this.template = template;
};
Plumbing$1.prototype = {};
Plumbing$1.prototype.setTheme = function (theme) {
  validate$1('O', [theme]);
  this.theme = theme;
};
Plumbing$1.prototype.setTemplate = function (template) {
  validate$1('A', [template]);
  this.template = template;
};
Plumbing$1.prototype.setWidth = function (width) {
  validate$1('N', [width]);
  this.width = width;
};
Plumbing$1.prototype.hide = function () {
  return consoleControl.gotoSOL() + consoleControl.eraseLine();
};
Plumbing$1.prototype.hideCursor = consoleControl.hideCursor;
Plumbing$1.prototype.showCursor = consoleControl.showCursor;
Plumbing$1.prototype.show = function (status) {
  var values = Object.create(this.theme);
  for (var key in status) {
    values[key] = status[key];
  }
  return renderTemplate$1(this.width, this.template, values).trim() + consoleControl.color('reset') + consoleControl.eraseLine() + consoleControl.gotoSOL();
};
var plumbingExports = plumbing.exports;

var hasUnicode$1 = {exports: {}};

var os = require$$4;
hasUnicode$1.exports = function () {
  // Recent Win32 platforms (>XP) CAN support unicode in the console but
  // don't have to, and in non-english locales often use traditional local
  // code pages. There's no way, short of windows system calls or execing
  // the chcp command line program to figure this out. As such, we default
  // this to false and encourage your users to override it via config if
  // appropriate.
  if (os.type() == "Windows_NT") {
    return false;
  }
  var isUTF8 = /UTF-?8$/i;
  var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG;
  return isUTF8.test(ctype);
};
var hasUnicodeExports = hasUnicode$1.exports;

// call it on itself so we can test the export val for basic stuff
var colorSupport_1 = colorSupport$1({
  alwaysReturn: true
}, colorSupport$1);
function hasNone(obj, options) {
  obj.level = 0;
  obj.hasBasic = false;
  obj.has256 = false;
  obj.has16m = false;
  if (!options.alwaysReturn) {
    return false;
  }
  return obj;
}
function hasBasic(obj) {
  obj.hasBasic = true;
  obj.has256 = false;
  obj.has16m = false;
  obj.level = 1;
  return obj;
}
function has256(obj) {
  obj.hasBasic = true;
  obj.has256 = true;
  obj.has16m = false;
  obj.level = 2;
  return obj;
}
function has16m(obj) {
  obj.hasBasic = true;
  obj.has256 = true;
  obj.has16m = true;
  obj.level = 3;
  return obj;
}
function colorSupport$1(options, obj) {
  options = options || {};
  obj = obj || {};

  // if just requesting a specific level, then return that.
  if (typeof options.level === 'number') {
    switch (options.level) {
      case 0:
        return hasNone(obj, options);
      case 1:
        return hasBasic(obj);
      case 2:
        return has256(obj);
      case 3:
        return has16m(obj);
    }
  }
  obj.level = 0;
  obj.hasBasic = false;
  obj.has256 = false;
  obj.has16m = false;
  if (typeof process === 'undefined' || !process || !process.stdout || !process.env || !process.platform) {
    return hasNone(obj, options);
  }
  var env = options.env || process.env;
  var stream = options.stream || process.stdout;
  var term = options.term || env.TERM || '';
  var platform = options.platform || process.platform;
  if (!options.ignoreTTY && !stream.isTTY) {
    return hasNone(obj, options);
  }
  if (!options.ignoreDumb && term === 'dumb' && !env.COLORTERM) {
    return hasNone(obj, options);
  }
  if (platform === 'win32') {
    return hasBasic(obj);
  }
  if (env.TMUX) {
    return has256(obj);
  }
  if (!options.ignoreCI && (env.CI || env.TEAMCITY_VERSION)) {
    if (env.TRAVIS) {
      return has256(obj);
    } else {
      return hasNone(obj, options);
    }
  }

  // TODO: add more term programs
  switch (env.TERM_PROGRAM) {
    case 'iTerm.app':
      var ver = env.TERM_PROGRAM_VERSION || '0.';
      if (/^[0-2]\./.test(ver)) {
        return has256(obj);
      } else {
        return has16m(obj);
      }
    case 'HyperTerm':
    case 'Hyper':
      return has16m(obj);
    case 'MacTerm':
      return has16m(obj);
    case 'Apple_Terminal':
      return has256(obj);
  }
  if (/^xterm-256/.test(term)) {
    return has256(obj);
  }
  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(term)) {
    return hasBasic(obj);
  }
  if (env.COLORTERM) {
    return hasBasic(obj);
  }
  return hasNone(obj, options);
}

var colorSupport = colorSupport_1;
var hasColor$1 = colorSupport().hasBasic;

var signalExit = {exports: {}};

var signals$1 = {exports: {}};

var hasRequiredSignals;
function requireSignals() {
  if (hasRequiredSignals) return signals$1.exports;
  hasRequiredSignals = 1;
  (function (module) {
    // This is not the set of all possible signals.
    //
    // It IS, however, the set of all signals that trigger
    // an exit on either Linux or BSD systems.  Linux is a
    // superset of the signal names supported on BSD, and
    // the unknown signals just fail to register, so we can
    // catch that easily enough.
    //
    // Don't bother with SIGKILL.  It's uncatchable, which
    // means that we can't fire any callbacks anyway.
    //
    // If a user does happen to register a handler on a non-
    // fatal signal like SIGWINCH or something, and then
    // exit, it'll end up firing `process.emit('exit')`, so
    // the handler will be fired anyway.
    //
    // SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
    // artificially, inherently leave the process in a
    // state from which it is not safe to try and enter JS
    // listeners.
    module.exports = ['SIGABRT', 'SIGALRM', 'SIGHUP', 'SIGINT', 'SIGTERM'];
    if (process.platform !== 'win32') {
      module.exports.push('SIGVTALRM', 'SIGXCPU', 'SIGXFSZ', 'SIGUSR2', 'SIGTRAP', 'SIGSYS', 'SIGQUIT', 'SIGIOT'
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
      );
    }
    if (process.platform === 'linux') {
      module.exports.push('SIGIO', 'SIGPOLL', 'SIGPWR', 'SIGSTKFLT', 'SIGUNUSED');
    }
  })(signals$1);
  return signals$1.exports;
}

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
var process$3 = commonjsGlobal.process;
const processOk = function (process) {
  return process && typeof process === 'object' && typeof process.removeListener === 'function' && typeof process.emit === 'function' && typeof process.reallyExit === 'function' && typeof process.listeners === 'function' && typeof process.kill === 'function' && typeof process.pid === 'number' && typeof process.on === 'function';
};

// some kind of non-node environment, just no-op
/* istanbul ignore if */
if (!processOk(process$3)) {
  signalExit.exports = function () {
    return function () {};
  };
} else {
  var assert = require$$5$2;
  var signals = requireSignals();
  var isWin = /^win/i.test(process$3.platform);
  var EE = require$$2$1;
  /* istanbul ignore if */
  if (typeof EE !== 'function') {
    EE = EE.EventEmitter;
  }
  var emitter;
  if (process$3.__signal_exit_emitter__) {
    emitter = process$3.__signal_exit_emitter__;
  } else {
    emitter = process$3.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }

  // Because this emitter is a global, we have to check to see if a
  // previous version of this library failed to enable infinite listeners.
  // I know what you're about to say.  But literally everything about
  // signal-exit is a compromise with evil.  Get used to it.
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }
  signalExit.exports = function (cb, opts) {
    /* istanbul ignore if */
    if (!processOk(commonjsGlobal.process)) {
      return function () {};
    }
    assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler');
    if (loaded === false) {
      load();
    }
    var ev = 'exit';
    if (opts && opts.alwaysLast) {
      ev = 'afterexit';
    }
    var remove = function () {
      emitter.removeListener(ev, cb);
      if (emitter.listeners('exit').length === 0 && emitter.listeners('afterexit').length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);
    return remove;
  };
  var unload = function unload() {
    if (!loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = false;
    signals.forEach(function (sig) {
      try {
        process$3.removeListener(sig, sigListeners[sig]);
      } catch (er) {}
    });
    process$3.emit = originalProcessEmit;
    process$3.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  signalExit.exports.unload = unload;
  var emit = function emit(event, code, signal) {
    /* istanbul ignore if */
    if (emitter.emitted[event]) {
      return;
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };

  // { <signal>: <listener fn>, ... }
  var sigListeners = {};
  signals.forEach(function (sig) {
    sigListeners[sig] = function listener() {
      /* istanbul ignore if */
      if (!processOk(commonjsGlobal.process)) {
        return;
      }
      // If there are no other listeners, an exit is coming!
      // Simplest way: remove us and then re-send the signal.
      // We know that this will kill the process, so we can
      // safely emit now.
      var listeners = process$3.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit('exit', null, sig);
        /* istanbul ignore next */
        emit('afterexit', null, sig);
        /* istanbul ignore next */
        if (isWin && sig === 'SIGHUP') {
          // "SIGHUP" throws an `ENOSYS` error on Windows,
          // so use a supported signal instead
          sig = 'SIGINT';
        }
        /* istanbul ignore next */
        process$3.kill(process$3.pid, sig);
      }
    };
  });
  signalExit.exports.signals = function () {
    return signals;
  };
  var loaded = false;
  var load = function load() {
    if (loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = true;

    // This is the number of onSignalExit's that are in play.
    // It's important so that we can count the correct number of
    // listeners on signals, and don't wait for the other one to
    // handle it instead of us.
    emitter.count += 1;
    signals = signals.filter(function (sig) {
      try {
        process$3.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });
    process$3.emit = processEmit;
    process$3.reallyExit = processReallyExit;
  };
  signalExit.exports.load = load;
  var originalProcessReallyExit = process$3.reallyExit;
  var processReallyExit = function processReallyExit(code) {
    /* istanbul ignore if */
    if (!processOk(commonjsGlobal.process)) {
      return;
    }
    process$3.exitCode = code || /* istanbul ignore next */0;
    emit('exit', process$3.exitCode, null);
    /* istanbul ignore next */
    emit('afterexit', process$3.exitCode, null);
    /* istanbul ignore next */
    originalProcessReallyExit.call(process$3, process$3.exitCode);
  };
  var originalProcessEmit = process$3.emit;
  var processEmit = function processEmit(ev, arg) {
    if (ev === 'exit' && processOk(commonjsGlobal.process)) {
      /* istanbul ignore else */
      if (arg !== undefined) {
        process$3.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      /* istanbul ignore next */
      emit('exit', process$3.exitCode, null);
      /* istanbul ignore next */
      emit('afterexit', process$3.exitCode, null);
      /* istanbul ignore next */
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  };
}
var signalExitExports = signalExit.exports;

var themes$1 = {exports: {}};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}
var objectAssign$1 = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};

var spin$1 = function spin(spinstr, spun) {
  return spinstr[spun % spinstr.length];
};

var validate = aproba;
var renderTemplate = renderTemplateExports;
var wideTruncate = wideTruncate_1;
var stringWidth = stringWidthExports;
var progressBar$1 = function (theme, width, completed) {
  validate('ONN', [theme, width, completed]);
  if (completed < 0) completed = 0;
  if (completed > 1) completed = 1;
  if (width <= 0) return '';
  var sofar = Math.round(width * completed);
  var rest = width - sofar;
  var template = [{
    type: 'complete',
    value: repeat(theme.complete, sofar),
    length: sofar
  }, {
    type: 'remaining',
    value: repeat(theme.remaining, rest),
    length: rest
  }];
  return renderTemplate(width, template, theme);
};

// lodash's way of repeating
function repeat(string, width) {
  var result = '';
  var n = width;
  do {
    if (n % 2) {
      result += string;
    }
    n = Math.floor(n / 2);
    /* eslint no-self-assign: 0 */
    string += string;
  } while (n && stringWidth(result) < width);
  return wideTruncate(result, width);
}

var spin = spin$1;
var progressBar = progressBar$1;
var baseTheme = {
  activityIndicator: function (values, theme, width) {
    if (values.spun == null) return;
    return spin(theme, values.spun);
  },
  progressbar: function (values, theme, width) {
    if (values.completed == null) return;
    return progressBar(theme, width, values.completed);
  }
};

var objectAssign = objectAssign$1;
var themeSet = function () {
  return ThemeSetProto.newThemeSet();
};
var ThemeSetProto = {};
ThemeSetProto.baseTheme = baseTheme;
ThemeSetProto.newTheme = function (parent, theme) {
  if (!theme) {
    theme = parent;
    parent = this.baseTheme;
  }
  return objectAssign({}, parent, theme);
};
ThemeSetProto.getThemeNames = function () {
  return Object.keys(this.themes);
};
ThemeSetProto.addTheme = function (name, parent, theme) {
  this.themes[name] = this.newTheme(parent, theme);
};
ThemeSetProto.addToAllThemes = function (theme) {
  var themes = this.themes;
  Object.keys(themes).forEach(function (name) {
    objectAssign(themes[name], theme);
  });
  objectAssign(this.baseTheme, theme);
};
ThemeSetProto.getTheme = function (name) {
  if (!this.themes[name]) throw this.newMissingThemeError(name);
  return this.themes[name];
};
ThemeSetProto.setDefault = function (opts, name) {
  if (name == null) {
    name = opts;
    opts = {};
  }
  var platform = opts.platform == null ? 'fallback' : opts.platform;
  var hasUnicode = !!opts.hasUnicode;
  var hasColor = !!opts.hasColor;
  if (!this.defaults[platform]) this.defaults[platform] = {
    true: {},
    false: {}
  };
  this.defaults[platform][hasUnicode][hasColor] = name;
};
ThemeSetProto.getDefault = function (opts) {
  if (!opts) opts = {};
  var platformName = opts.platform || process.platform;
  var platform = this.defaults[platformName] || this.defaults.fallback;
  var hasUnicode = !!opts.hasUnicode;
  var hasColor = !!opts.hasColor;
  if (!platform) throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor);
  if (!platform[hasUnicode][hasColor]) {
    if (hasUnicode && hasColor && platform[!hasUnicode][hasColor]) {
      hasUnicode = false;
    } else if (hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
      hasColor = false;
    } else if (hasUnicode && hasColor && platform[!hasUnicode][!hasColor]) {
      hasUnicode = false;
      hasColor = false;
    } else if (hasUnicode && !hasColor && platform[!hasUnicode][hasColor]) {
      hasUnicode = false;
    } else if (!hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
      hasColor = false;
    } else if (platform === this.defaults.fallback) {
      throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor);
    }
  }
  if (platform[hasUnicode][hasColor]) {
    return this.getTheme(platform[hasUnicode][hasColor]);
  } else {
    return this.getDefault(objectAssign({}, opts, {
      platform: 'fallback'
    }));
  }
};
ThemeSetProto.newMissingThemeError = function newMissingThemeError(name) {
  var err = new Error('Could not find a gauge theme named "' + name + '"');
  Error.captureStackTrace.call(err, newMissingThemeError);
  err.theme = name;
  err.code = 'EMISSINGTHEME';
  return err;
};
ThemeSetProto.newMissingDefaultThemeError = function newMissingDefaultThemeError(platformName, hasUnicode, hasColor) {
  var err = new Error('Could not find a gauge theme for your platform/unicode/color use combo:\n' + '    platform = ' + platformName + '\n' + '    hasUnicode = ' + hasUnicode + '\n' + '    hasColor = ' + hasColor);
  Error.captureStackTrace.call(err, newMissingDefaultThemeError);
  err.platform = platformName;
  err.hasUnicode = hasUnicode;
  err.hasColor = hasColor;
  err.code = 'EMISSINGTHEME';
  return err;
};
ThemeSetProto.newThemeSet = function () {
  var themeset = function (opts) {
    return themeset.getDefault(opts);
  };
  return objectAssign(themeset, ThemeSetProto, {
    themes: objectAssign({}, this.themes),
    baseTheme: objectAssign({}, this.baseTheme),
    defaults: JSON.parse(JSON.stringify(this.defaults || {}))
  });
};

var color = consoleControlStrings.color;
var ThemeSet = themeSet;
var themes = themes$1.exports = new ThemeSet();
themes.addTheme('ASCII', {
  preProgressbar: '[',
  postProgressbar: ']',
  progressbarTheme: {
    complete: '#',
    remaining: '.'
  },
  activityIndicatorTheme: '-\\|/',
  preSubsection: '>'
});
themes.addTheme('colorASCII', themes.getTheme('ASCII'), {
  progressbarTheme: {
    preComplete: color('bgBrightWhite', 'brightWhite'),
    complete: '#',
    postComplete: color('reset'),
    preRemaining: color('bgBrightBlack', 'brightBlack'),
    remaining: '.',
    postRemaining: color('reset')
  }
});
themes.addTheme('brailleSpinner', {
  preProgressbar: '⸨',
  postProgressbar: '⸩',
  progressbarTheme: {
    complete: '#',
    remaining: '⠂'
  },
  activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
  preSubsection: '>'
});
themes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {
  progressbarTheme: {
    preComplete: color('bgBrightWhite', 'brightWhite'),
    complete: '#',
    postComplete: color('reset'),
    preRemaining: color('bgBrightBlack', 'brightBlack'),
    remaining: '⠂',
    postRemaining: color('reset')
  }
});
themes.setDefault({}, 'ASCII');
themes.setDefault({
  hasColor: true
}, 'colorASCII');
themes.setDefault({
  platform: 'darwin',
  hasUnicode: true
}, 'brailleSpinner');
themes.setDefault({
  platform: 'darwin',
  hasUnicode: true,
  hasColor: true
}, 'colorBrailleSpinner');
themes.setDefault({
  platform: 'linux',
  hasUnicode: true
}, 'brailleSpinner');
themes.setDefault({
  platform: 'linux',
  hasUnicode: true,
  hasColor: true
}, 'colorBrailleSpinner');
var themesExports = themes$1.exports;

// this exists so we can replace it during testing
var setInterval_1 = setInterval;

// this exists so we can replace it during testing
var process_1$1 = process;

var setImmediate$2 = {exports: {}};

var process$2 = process_1$1;
try {
  setImmediate$2.exports = setImmediate;
} catch (ex) {
  setImmediate$2.exports = process$2.nextTick;
}
var setImmediateExports = setImmediate$2.exports;

var Plumbing = plumbingExports;
var hasUnicode = hasUnicodeExports;
var hasColor = hasColor$1;
var onExit = signalExitExports;
var defaultThemes = themesExports;
var setInterval$1 = setInterval_1;
var process$1 = process_1$1;
var setImmediate$1 = setImmediateExports;
var gauge = Gauge;
function callWith(obj, method) {
  return function () {
    return method.call(obj);
  };
}
function Gauge(arg1, arg2) {
  var options, writeTo;
  if (arg1 && arg1.write) {
    writeTo = arg1;
    options = arg2 || {};
  } else if (arg2 && arg2.write) {
    writeTo = arg2;
    options = arg1 || {};
  } else {
    writeTo = process$1.stderr;
    options = arg1 || arg2 || {};
  }
  this._status = {
    spun: 0,
    section: '',
    subsection: ''
  };
  this._paused = false; // are we paused for back pressure?
  this._disabled = true; // are all progress bar updates disabled?
  this._showing = false; // do we WANT the progress bar on screen
  this._onScreen = false; // IS the progress bar on screen
  this._needsRedraw = false; // should we print something at next tick?
  this._hideCursor = options.hideCursor == null ? true : options.hideCursor;
  this._fixedFramerate = options.fixedFramerate == null ? !/^v0\.8\./.test(process$1.version) : options.fixedFramerate;
  this._lastUpdateAt = null;
  this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval;
  this._themes = options.themes || defaultThemes;
  this._theme = options.theme;
  var theme = this._computeTheme(options.theme);
  var template = options.template || [{
    type: 'progressbar',
    length: 20
  }, {
    type: 'activityIndicator',
    kerning: 1,
    length: 1
  }, {
    type: 'section',
    kerning: 1,
    default: ''
  }, {
    type: 'subsection',
    kerning: 1,
    default: ''
  }];
  this.setWriteTo(writeTo, options.tty);
  var PlumbingClass = options.Plumbing || Plumbing;
  this._gauge = new PlumbingClass(theme, template, this.getWidth());
  this._$$doRedraw = callWith(this, this._doRedraw);
  this._$$handleSizeChange = callWith(this, this._handleSizeChange);
  this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit;
  this._removeOnExit = null;
  if (options.enabled || options.enabled == null && this._tty && this._tty.isTTY) {
    this.enable();
  } else {
    this.disable();
  }
}
Gauge.prototype = {};
Gauge.prototype.isEnabled = function () {
  return !this._disabled;
};
Gauge.prototype.setTemplate = function (template) {
  this._gauge.setTemplate(template);
  if (this._showing) this._requestRedraw();
};
Gauge.prototype._computeTheme = function (theme) {
  if (!theme) theme = {};
  if (typeof theme === 'string') {
    theme = this._themes.getTheme(theme);
  } else if (theme && (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null)) {
    var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode;
    var useColor = theme.hasColor == null ? hasColor : theme.hasColor;
    theme = this._themes.getDefault({
      hasUnicode: useUnicode,
      hasColor: useColor,
      platform: theme.platform
    });
  }
  return theme;
};
Gauge.prototype.setThemeset = function (themes) {
  this._themes = themes;
  this.setTheme(this._theme);
};
Gauge.prototype.setTheme = function (theme) {
  this._gauge.setTheme(this._computeTheme(theme));
  if (this._showing) this._requestRedraw();
  this._theme = theme;
};
Gauge.prototype._requestRedraw = function () {
  this._needsRedraw = true;
  if (!this._fixedFramerate) this._doRedraw();
};
Gauge.prototype.getWidth = function () {
  return (this._tty && this._tty.columns || 80) - 1;
};
Gauge.prototype.setWriteTo = function (writeTo, tty) {
  var enabled = !this._disabled;
  if (enabled) this.disable();
  this._writeTo = writeTo;
  this._tty = tty || writeTo === process$1.stderr && process$1.stdout.isTTY && process$1.stdout || writeTo.isTTY && writeTo || this._tty;
  if (this._gauge) this._gauge.setWidth(this.getWidth());
  if (enabled) this.enable();
};
Gauge.prototype.enable = function () {
  if (!this._disabled) return;
  this._disabled = false;
  if (this._tty) this._enableEvents();
  if (this._showing) this.show();
};
Gauge.prototype.disable = function () {
  if (this._disabled) return;
  if (this._showing) {
    this._lastUpdateAt = null;
    this._showing = false;
    this._doRedraw();
    this._showing = true;
  }
  this._disabled = true;
  if (this._tty) this._disableEvents();
};
Gauge.prototype._enableEvents = function () {
  if (this._cleanupOnExit) {
    this._removeOnExit = onExit(callWith(this, this.disable));
  }
  this._tty.on('resize', this._$$handleSizeChange);
  if (this._fixedFramerate) {
    this.redrawTracker = setInterval$1(this._$$doRedraw, this._updateInterval);
    if (this.redrawTracker.unref) this.redrawTracker.unref();
  }
};
Gauge.prototype._disableEvents = function () {
  this._tty.removeListener('resize', this._$$handleSizeChange);
  if (this._fixedFramerate) clearInterval(this.redrawTracker);
  if (this._removeOnExit) this._removeOnExit();
};
Gauge.prototype.hide = function (cb) {
  if (this._disabled) return cb && process$1.nextTick(cb);
  if (!this._showing) return cb && process$1.nextTick(cb);
  this._showing = false;
  this._doRedraw();
  cb && setImmediate$1(cb);
};
Gauge.prototype.show = function (section, completed) {
  this._showing = true;
  if (typeof section === 'string') {
    this._status.section = section;
  } else if (typeof section === 'object') {
    var sectionKeys = Object.keys(section);
    for (var ii = 0; ii < sectionKeys.length; ++ii) {
      var key = sectionKeys[ii];
      this._status[key] = section[key];
    }
  }
  if (completed != null) this._status.completed = completed;
  if (this._disabled) return;
  this._requestRedraw();
};
Gauge.prototype.pulse = function (subsection) {
  this._status.subsection = subsection || '';
  this._status.spun++;
  if (this._disabled) return;
  if (!this._showing) return;
  this._requestRedraw();
};
Gauge.prototype._handleSizeChange = function () {
  this._gauge.setWidth(this._tty.columns - 1);
  this._requestRedraw();
};
Gauge.prototype._doRedraw = function () {
  if (this._disabled || this._paused) return;
  if (!this._fixedFramerate) {
    var now = Date.now();
    if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) return;
    this._lastUpdateAt = now;
  }
  if (!this._showing && this._onScreen) {
    this._onScreen = false;
    var result = this._gauge.hide();
    if (this._hideCursor) {
      result += this._gauge.showCursor();
    }
    return this._writeTo.write(result);
  }
  if (!this._showing && !this._onScreen) return;
  if (this._showing && !this._onScreen) {
    this._onScreen = true;
    this._needsRedraw = true;
    if (this._hideCursor) {
      this._writeTo.write(this._gauge.hideCursor());
    }
  }
  if (!this._needsRedraw) return;
  if (!this._writeTo.write(this._gauge.show(this._status))) {
    this._paused = true;
    this._writeTo.on('drain', callWith(this, function () {
      this._paused = false;
      this._doRedraw();
    }));
  }
};

var setBlocking = function (blocking) {
  [process.stdout, process.stderr].forEach(function (stream) {
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
      stream._handle.setBlocking(blocking);
    }
  });
};

(function (module, exports) {

  var Progress = lib;
  var Gauge = gauge;
  var EE = require$$2$1.EventEmitter;
  var log = module.exports = new EE();
  var util = require$$0$2;
  var setBlocking$1 = setBlocking;
  var consoleControl = consoleControlStrings;
  setBlocking$1(true);
  var stream = process.stderr;
  Object.defineProperty(log, 'stream', {
    set: function (newStream) {
      stream = newStream;
      if (this.gauge) {
        this.gauge.setWriteTo(stream, stream);
      }
    },
    get: function () {
      return stream;
    }
  });

  // by default, decide based on tty-ness.
  var colorEnabled;
  log.useColor = function () {
    return colorEnabled != null ? colorEnabled : stream.isTTY;
  };
  log.enableColor = function () {
    colorEnabled = true;
    this.gauge.setTheme({
      hasColor: colorEnabled,
      hasUnicode: unicodeEnabled
    });
  };
  log.disableColor = function () {
    colorEnabled = false;
    this.gauge.setTheme({
      hasColor: colorEnabled,
      hasUnicode: unicodeEnabled
    });
  };

  // default level
  log.level = 'info';
  log.gauge = new Gauge(stream, {
    enabled: false,
    // no progress bars unless asked
    theme: {
      hasColor: log.useColor()
    },
    template: [{
      type: 'progressbar',
      length: 20
    }, {
      type: 'activityIndicator',
      kerning: 1,
      length: 1
    }, {
      type: 'section',
      default: ''
    }, ':', {
      type: 'logline',
      kerning: 1,
      default: ''
    }]
  });
  log.tracker = new Progress.TrackerGroup();

  // we track this separately as we may need to temporarily disable the
  // display of the status bar for our own loggy purposes.
  log.progressEnabled = log.gauge.isEnabled();
  var unicodeEnabled;
  log.enableUnicode = function () {
    unicodeEnabled = true;
    this.gauge.setTheme({
      hasColor: this.useColor(),
      hasUnicode: unicodeEnabled
    });
  };
  log.disableUnicode = function () {
    unicodeEnabled = false;
    this.gauge.setTheme({
      hasColor: this.useColor(),
      hasUnicode: unicodeEnabled
    });
  };
  log.setGaugeThemeset = function (themes) {
    this.gauge.setThemeset(themes);
  };
  log.setGaugeTemplate = function (template) {
    this.gauge.setTemplate(template);
  };
  log.enableProgress = function () {
    if (this.progressEnabled) {
      return;
    }
    this.progressEnabled = true;
    this.tracker.on('change', this.showProgress);
    if (this._paused) {
      return;
    }
    this.gauge.enable();
  };
  log.disableProgress = function () {
    if (!this.progressEnabled) {
      return;
    }
    this.progressEnabled = false;
    this.tracker.removeListener('change', this.showProgress);
    this.gauge.disable();
  };
  var trackerConstructors = ['newGroup', 'newItem', 'newStream'];
  var mixinLog = function (tracker) {
    // mixin the public methods from log into the tracker
    // (except: conflicts and one's we handle specially)
    Object.keys(log).forEach(function (P) {
      if (P[0] === '_') {
        return;
      }
      if (trackerConstructors.filter(function (C) {
        return C === P;
      }).length) {
        return;
      }
      if (tracker[P]) {
        return;
      }
      if (typeof log[P] !== 'function') {
        return;
      }
      var func = log[P];
      tracker[P] = function () {
        return func.apply(log, arguments);
      };
    });
    // if the new tracker is a group, make sure any subtrackers get
    // mixed in too
    if (tracker instanceof Progress.TrackerGroup) {
      trackerConstructors.forEach(function (C) {
        var func = tracker[C];
        tracker[C] = function () {
          return mixinLog(func.apply(tracker, arguments));
        };
      });
    }
    return tracker;
  };

  // Add tracker constructors to the top level log object
  trackerConstructors.forEach(function (C) {
    log[C] = function () {
      return mixinLog(this.tracker[C].apply(this.tracker, arguments));
    };
  });
  log.clearProgress = function (cb) {
    if (!this.progressEnabled) {
      return cb && process.nextTick(cb);
    }
    this.gauge.hide(cb);
  };
  log.showProgress = function (name, completed) {
    if (!this.progressEnabled) {
      return;
    }
    var values = {};
    if (name) {
      values.section = name;
    }
    var last = log.record[log.record.length - 1];
    if (last) {
      values.subsection = last.prefix;
      var disp = log.disp[last.level] || last.level;
      var logline = this._format(disp, log.style[last.level]);
      if (last.prefix) {
        logline += ' ' + this._format(last.prefix, this.prefixStyle);
      }
      logline += ' ' + last.message.split(/\r?\n/)[0];
      values.logline = logline;
    }
    values.completed = completed || this.tracker.completed();
    this.gauge.show(values);
  }.bind(log); // bind for use in tracker's on-change listener

  // temporarily stop emitting, but don't drop
  log.pause = function () {
    this._paused = true;
    if (this.progressEnabled) {
      this.gauge.disable();
    }
  };
  log.resume = function () {
    if (!this._paused) {
      return;
    }
    this._paused = false;
    var b = this._buffer;
    this._buffer = [];
    b.forEach(function (m) {
      this.emitLog(m);
    }, this);
    if (this.progressEnabled) {
      this.gauge.enable();
    }
  };
  log._buffer = [];
  var id = 0;
  log.record = [];
  log.maxRecordSize = 10000;
  log.log = function (lvl, prefix, message) {
    var l = this.levels[lvl];
    if (l === undefined) {
      return this.emit('error', new Error(util.format('Undefined log level: %j', lvl)));
    }
    var a = new Array(arguments.length - 2);
    var stack = null;
    for (var i = 2; i < arguments.length; i++) {
      var arg = a[i - 2] = arguments[i];

      // resolve stack traces to a plain string.
      if (typeof arg === 'object' && arg instanceof Error && arg.stack) {
        Object.defineProperty(arg, 'stack', {
          value: stack = arg.stack + '',
          enumerable: true,
          writable: true
        });
      }
    }
    if (stack) {
      a.unshift(stack + '\n');
    }
    message = util.format.apply(util, a);
    var m = {
      id: id++,
      level: lvl,
      prefix: String(prefix || ''),
      message: message,
      messageRaw: a
    };
    this.emit('log', m);
    this.emit('log.' + lvl, m);
    if (m.prefix) {
      this.emit(m.prefix, m);
    }
    this.record.push(m);
    var mrs = this.maxRecordSize;
    var n = this.record.length - mrs;
    if (n > mrs / 10) {
      var newSize = Math.floor(mrs * 0.9);
      this.record = this.record.slice(-1 * newSize);
    }
    this.emitLog(m);
  }.bind(log);
  log.emitLog = function (m) {
    if (this._paused) {
      this._buffer.push(m);
      return;
    }
    if (this.progressEnabled) {
      this.gauge.pulse(m.prefix);
    }
    var l = this.levels[m.level];
    if (l === undefined) {
      return;
    }
    if (l < this.levels[this.level]) {
      return;
    }
    if (l > 0 && !isFinite(l)) {
      return;
    }

    // If 'disp' is null or undefined, use the lvl as a default
    // Allows: '', 0 as valid disp
    var disp = log.disp[m.level] != null ? log.disp[m.level] : m.level;
    this.clearProgress();
    m.message.split(/\r?\n/).forEach(function (line) {
      if (this.heading) {
        this.write(this.heading, this.headingStyle);
        this.write(' ');
      }
      this.write(disp, log.style[m.level]);
      var p = m.prefix || '';
      if (p) {
        this.write(' ');
      }
      this.write(p, this.prefixStyle);
      this.write(' ' + line + '\n');
    }, this);
    this.showProgress();
  };
  log._format = function (msg, style) {
    if (!stream) {
      return;
    }
    var output = '';
    if (this.useColor()) {
      style = style || {};
      var settings = [];
      if (style.fg) {
        settings.push(style.fg);
      }
      if (style.bg) {
        settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1));
      }
      if (style.bold) {
        settings.push('bold');
      }
      if (style.underline) {
        settings.push('underline');
      }
      if (style.inverse) {
        settings.push('inverse');
      }
      if (settings.length) {
        output += consoleControl.color(settings);
      }
      if (style.beep) {
        output += consoleControl.beep();
      }
    }
    output += msg;
    if (this.useColor()) {
      output += consoleControl.color('reset');
    }
    return output;
  };
  log.write = function (msg, style) {
    if (!stream) {
      return;
    }
    stream.write(this._format(msg, style));
  };
  log.addLevel = function (lvl, n, style, disp) {
    // If 'disp' is null or undefined, use the lvl as a default
    if (disp == null) {
      disp = lvl;
    }
    this.levels[lvl] = n;
    this.style[lvl] = style;
    if (!this[lvl]) {
      this[lvl] = function () {
        var a = new Array(arguments.length + 1);
        a[0] = lvl;
        for (var i = 0; i < arguments.length; i++) {
          a[i + 1] = arguments[i];
        }
        return this.log.apply(this, a);
      }.bind(this);
    }
    this.disp[lvl] = disp;
  };
  log.prefixStyle = {
    fg: 'magenta'
  };
  log.headingStyle = {
    fg: 'white',
    bg: 'black'
  };
  log.style = {};
  log.levels = {};
  log.disp = {};
  log.addLevel('silly', -Infinity, {
    inverse: true
  }, 'sill');
  log.addLevel('verbose', 1000, {
    fg: 'blue',
    bg: 'black'
  }, 'verb');
  log.addLevel('info', 2000, {
    fg: 'green'
  });
  log.addLevel('timing', 2500, {
    fg: 'green',
    bg: 'black'
  });
  log.addLevel('http', 3000, {
    fg: 'green',
    bg: 'black'
  });
  log.addLevel('notice', 3500, {
    fg: 'blue',
    bg: 'black'
  });
  log.addLevel('warn', 4000, {
    fg: 'black',
    bg: 'yellow'
  }, 'WARN');
  log.addLevel('error', 5000, {
    fg: 'red',
    bg: 'black'
  }, 'ERR!');
  log.addLevel('silent', Infinity);

  // allow 'error' prefix
  log.on('error', function () {});
})(log);
var logExports = log.exports;

var napi = {exports: {}};

var old = {};

var hasRequiredOld;
function requireOld() {
  if (hasRequiredOld) return old;
  hasRequiredOld = 1;
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

  var pathModule = path;
  var isWindows = process.platform === 'win32';
  var fs = require$$0$1;

  // JavaScript implementation of realpath, ported from node pre-v6

  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function rethrow() {
    // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
    // is fairly slow to generate.
    var callback;
    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else callback = missingCallback;
    return callback;
    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }
    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation) throw err; // Forgot a callback but don't know where? Use NODE_DEBUG=fs
        else if (!process.noDeprecation) {
          var msg = 'fs: missing callback ' + (err.stack || err.message);
          if (process.traceDeprecation) console.trace(msg);else console.error(msg);
        }
      }
    }
  }
  function maybeCallback(cb) {
    return typeof cb === 'function' ? cb : rethrow();
  }
  pathModule.normalize;

  // Regexp that finds the next partion of a (partial) path
  // result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
  if (isWindows) {
    var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    var nextPartRe = /(.*?)(?:[\/]+|$)/g;
  }

  // Regex to find the device root, including trailing slash. E.g. 'c:\\'.
  if (isWindows) {
    var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    var splitRootRe = /^[\/]*/;
  }
  old.realpathSync = function realpathSync(p, cache) {
    // make p is absolute
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }
    var original = p,
      seenLinks = {},
      knownHard = {};

    // current character position in p
    var pos;
    // the partial path so far, including a trailing slash if any
    var current;
    // the partial path without a trailing slash (except when pointing at a root)
    var base;
    // the partial path scanned in the previous round, with slash
    var previous;
    start();
    function start() {
      // Skip over roots
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = '';

      // On windows, check that the root exists. On unix there is no need.
      if (isWindows && !knownHard[base]) {
        fs.lstatSync(base);
        knownHard[base] = true;
      }
    }

    // walk down the path, swapping out linked pathparts for their real
    // values
    // NB: p.length changes.
    while (pos < p.length) {
      // find the next part
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;

      // continue if not a symlink
      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }
      var resolvedLink;
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        // some known symbolic link.  no need to stat again.
        resolvedLink = cache[base];
      } else {
        var stat = fs.lstatSync(base);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache) cache[base] = base;
          continue;
        }

        // read the link if it wasn't read before
        // dev/ino always return 0 on windows, so skip the check.
        var linkTarget = null;
        if (!isWindows) {
          var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }
        if (linkTarget === null) {
          fs.statSync(base);
          linkTarget = fs.readlinkSync(base);
        }
        resolvedLink = pathModule.resolve(previous, linkTarget);
        // track this, if given a cache.
        if (cache) cache[base] = resolvedLink;
        if (!isWindows) seenLinks[id] = linkTarget;
      }

      // resolve the link, then start over
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
    if (cache) cache[original] = p;
    return p;
  };
  old.realpath = function realpath(p, cache, cb) {
    if (typeof cb !== 'function') {
      cb = maybeCallback(cache);
      cache = null;
    }

    // make p is absolute
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }
    var original = p,
      seenLinks = {},
      knownHard = {};

    // current character position in p
    var pos;
    // the partial path so far, including a trailing slash if any
    var current;
    // the partial path without a trailing slash (except when pointing at a root)
    var base;
    // the partial path scanned in the previous round, with slash
    var previous;
    start();
    function start() {
      // Skip over roots
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = '';

      // On windows, check that the root exists. On unix there is no need.
      if (isWindows && !knownHard[base]) {
        fs.lstat(base, function (err) {
          if (err) return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    }

    // walk down the path, swapping out linked pathparts for their real
    // values
    function LOOP() {
      // stop if scanned past end of path
      if (pos >= p.length) {
        if (cache) cache[original] = p;
        return cb(null, p);
      }

      // find the next part
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;

      // continue if not a symlink
      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        // known symbolic link.  no need to stat again.
        return gotResolvedLink(cache[base]);
      }
      return fs.lstat(base, gotStat);
    }
    function gotStat(err, stat) {
      if (err) return cb(err);

      // if not a symlink, skip to the next path part
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        return process.nextTick(LOOP);
      }

      // stat & read the link if not read before
      // call gotTarget as soon as the link target is known
      // dev/ino always return 0 on windows, so skip the check.
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }
      fs.stat(base, function (err) {
        if (err) return cb(err);
        fs.readlink(base, function (err, target) {
          if (!isWindows) seenLinks[id] = target;
          gotTarget(err, target);
        });
      });
    }
    function gotTarget(err, target, base) {
      if (err) return cb(err);
      var resolvedLink = pathModule.resolve(previous, target);
      if (cache) cache[base] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }
    function gotResolvedLink(resolvedLink) {
      // resolve the link, then start over
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
  };
  return old;
}

var fs_realpath;
var hasRequiredFs_realpath;
function requireFs_realpath() {
  if (hasRequiredFs_realpath) return fs_realpath;
  hasRequiredFs_realpath = 1;
  fs_realpath = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;
  var fs = require$$0$1;
  var origRealpath = fs.realpath;
  var origRealpathSync = fs.realpathSync;
  var version = process.version;
  var ok = /^v[0-5]\./.test(version);
  var old = requireOld();
  function newError(er) {
    return er && er.syscall === 'realpath' && (er.code === 'ELOOP' || er.code === 'ENOMEM' || er.code === 'ENAMETOOLONG');
  }
  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }
    if (typeof cache === 'function') {
      cb = cache;
      cache = null;
    }
    origRealpath(p, cache, function (er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }
  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }
    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }
  function monkeypatch() {
    fs.realpath = realpath;
    fs.realpathSync = realpathSync;
  }
  function unmonkeypatch() {
    fs.realpath = origRealpath;
    fs.realpathSync = origRealpathSync;
  }
  return fs_realpath;
}

var concatMap;
var hasRequiredConcatMap;
function requireConcatMap() {
  if (hasRequiredConcatMap) return concatMap;
  hasRequiredConcatMap = 1;
  concatMap = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x)) res.push.apply(res, x);else res.push(x);
    }
    return res;
  };
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  return concatMap;
}

var balancedMatch;
var hasRequiredBalancedMatch;
function requireBalancedMatch() {
  if (hasRequiredBalancedMatch) return balancedMatch;
  hasRequiredBalancedMatch = 1;
  balancedMatch = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp) a = maybeMatch(a, str);
    if (b instanceof RegExp) b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }
  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }
  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;
    if (ai >= 0 && bi > 0) {
      if (a === b) {
        return [ai, bi];
      }
      begs = [];
      left = str.length;
      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }
          bi = str.indexOf(b, i + 1);
        }
        i = ai < bi && ai >= 0 ? ai : bi;
      }
      if (begs.length) {
        result = [left, right];
      }
    }
    return result;
  }
  return balancedMatch;
}

var braceExpansion;
var hasRequiredBraceExpansion;
function requireBraceExpansion() {
  if (hasRequiredBraceExpansion) return braceExpansion;
  hasRequiredBraceExpansion = 1;
  var concatMap = requireConcatMap();
  var balanced = requireBalancedMatch();
  braceExpansion = expandTop;
  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function escapeBraces(str) {
    return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
  }

  // Basically just str.split(","), but handling cases
  // where we have nested braced sections, which should be
  // treated as individual members, like {a,{b,c},d}
  function parseCommaParts(str) {
    if (!str) return [''];
    var parts = [];
    var m = balanced('{', '}', str);
    if (!m) return str.split(',');
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');
    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
  }
  function expandTop(str) {
    if (!str) return [];

    // I don't know why Bash 4.3 does this, but it does.
    // Anything starting with {} will have the first two bytes preserved
    // but *only* at the top level, so {},a}b will not expand to anything,
    // but a{},b}c will be expanded to [a}c,abc].
    // One could argue that this is a bug in Bash, but since the goal of
    // this module is to match Bash's rules, we escape a leading {}
    if (str.substr(0, 2) === '{}') {
      str = '\\{\\}' + str.substr(2);
    }
    return expand(escapeBraces(str), true).map(unescapeBraces);
  }
  function embrace(str) {
    return '{' + str + '}';
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
  function expand(str, isTop) {
    var expansions = [];
    var m = balanced('{', '}', str);
    if (!m || /\$$/.test(m.pre)) return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;
    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function (p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.

    // no need to expand pre, since it is guaranteed to be free of brace-sets
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);else c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function (el) {
        return expand(el, false);
      });
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }
    return expansions;
  }
  return braceExpansion;
}

var minimatch_1;
var hasRequiredMinimatch;
function requireMinimatch() {
  if (hasRequiredMinimatch) return minimatch_1;
  hasRequiredMinimatch = 1;
  minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;
  var path = function () {
    try {
      return require('path');
    } catch (e) {}
  }() || {
    sep: '/'
  };
  minimatch.sep = path.sep;
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = requireBraceExpansion();
  var plTypes = {
    '!': {
      open: '(?:(?!(?:',
      close: '))[^/]*?)'
    },
    '?': {
      open: '(?:',
      close: ')?'
    },
    '+': {
      open: '(?:',
      close: ')+'
    },
    '*': {
      open: '(?:',
      close: ')*'
    },
    '@': {
      open: '(?:',
      close: ')'
    }
  };

  // any single thing other than /
  // don't need to escape / when using new RegExp()
  var qmark = '[^/]';

  // * => any number of characters
  var star = qmark + '*?';

  // ** when dots are allowed.  Anything goes, except .. and .
  // not (^ or / followed by one or two dots followed by $ or /),
  // followed by anything, any number of times.
  var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

  // not a ^ or / followed by a dot,
  // followed by anything, any number of times.
  var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

  // characters that need to be escaped in RegExp.
  var reSpecials = charSet('().*{}+?[]^$\\!');

  // "abc" -> { a:true, b:true, c:true }
  function charSet(s) {
    return s.split('').reduce(function (set, c) {
      set[c] = true;
      return set;
    }, {});
  }

  // normalizes slashes.
  var slashSplit = /\/+/;
  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function (p, i, list) {
      return minimatch(p, pattern, options);
    };
  }
  function ext(a, b) {
    b = b || {};
    var t = {};
    Object.keys(a).forEach(function (k) {
      t[k] = a[k];
    });
    Object.keys(b).forEach(function (k) {
      t[k] = b[k];
    });
    return t;
  }
  minimatch.defaults = function (def) {
    if (!def || typeof def !== 'object' || !Object.keys(def).length) {
      return minimatch;
    }
    var orig = minimatch;
    var m = function minimatch(p, pattern, options) {
      return orig(p, pattern, ext(def, options));
    };
    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };
    m.Minimatch.defaults = function defaults(options) {
      return orig.defaults(ext(def, options)).Minimatch;
    };
    m.filter = function filter(pattern, options) {
      return orig.filter(pattern, ext(def, options));
    };
    m.defaults = function defaults(options) {
      return orig.defaults(ext(def, options));
    };
    m.makeRe = function makeRe(pattern, options) {
      return orig.makeRe(pattern, ext(def, options));
    };
    m.braceExpand = function braceExpand(pattern, options) {
      return orig.braceExpand(pattern, ext(def, options));
    };
    m.match = function (list, pattern, options) {
      return orig.match(list, pattern, ext(def, options));
    };
    return m;
  };
  Minimatch.defaults = function (def) {
    return minimatch.defaults(def).Minimatch;
  };
  function minimatch(p, pattern, options) {
    assertValidPattern(pattern);
    if (!options) options = {};

    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }
    return new Minimatch(pattern, options).match(p);
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }
    assertValidPattern(pattern);
    if (!options) options = {};
    pattern = pattern.trim();

    // windows support: need to use /, not \
    if (!options.allowWindowsEscape && path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }
    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;

    // make the set of regexps etc.
    this.make();
  }
  Minimatch.prototype.debug = function () {};
  Minimatch.prototype.make = make;
  function make() {
    var pattern = this.pattern;
    var options = this.options;

    // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }

    // step 1: figure out negation, etc.
    this.parseNegate();

    // step 2: expand braces
    var set = this.globSet = this.braceExpand();
    if (options.debug) this.debug = function debug() {
      console.error.apply(console, arguments);
    };
    this.debug(this.pattern, set);

    // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters
    set = this.globParts = set.map(function (s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);

    // glob --> regexps
    set = set.map(function (s, si, set) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);

    // filter out everything that didn't compile properly.
    set = set.filter(function (s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }
  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate) return;
    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

  // Brace expansion:
  // a{b,c}d -> abd acd
  // a{b,}c -> abc ac
  // a{0..3}d -> a0d a1d a2d a3d
  // a{b,c{d,e}f}g -> abg acdfg acefg
  // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
  //
  // Invalid sets are not expanded.
  // a{2..}b -> a{2..}b
  // a{b}c -> a{b}c
  minimatch.braceExpand = function (pattern, options) {
    return braceExpand(pattern, options);
  };
  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }
    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;
    assertValidPattern(pattern);

    // Thanks to Yeting Li <https://github.com/yetingli> for
    // improving this regexp to avoid a ReDOS vulnerability.
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
      // shortcut. no need to expand.
      return [pattern];
    }
    return expand(pattern);
  }
  var MAX_PATTERN_LENGTH = 1024 * 64;
  var assertValidPattern = function (pattern) {
    if (typeof pattern !== 'string') {
      throw new TypeError('invalid pattern');
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
      throw new TypeError('pattern is too long');
    }
  };

  // parse a component of the expanded set.
  // At this point, no pattern may contain "/" in it
  // so we're going to return a 2d array, where each entry is the full
  // pattern, split on '/', and then turned into a regular expression.
  // A regexp is made at the end which joins each array with an
  // escaped /, and another full one which joins each regexp with |.
  //
  // Following the lead of Bash 4.1, note that "**" only has special meaning
  // when it is the *only* thing in a path portion.  Otherwise, any series
  // of * is equivalent to a single *.  Globstar behavior is enabled by
  // default, and can be disabled by setting options.noglobstar.
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    assertValidPattern(pattern);
    var options = this.options;

    // shortcuts
    if (pattern === '**') {
      if (!options.noglobstar) return GLOBSTAR;else pattern = '*';
    }
    if (pattern === '') return '';
    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false;
    // ? => one single character
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    // . and .. never match anything that doesn't start with .,
    // even when options.dot is set.
    var patternStart = pattern.charAt(0) === '.' ? '' // anything
    // not (start or / followed by . or .. followed by / or end)
    : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
    var self = this;
    function clearStateChar() {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;
          case '?':
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += '\\' + stateChar;
            break;
        }
        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }
    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);

      // skip over any that are escaped.
      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }
      switch (c) {
        /* istanbul ignore next */
        case '/':
          {
            // completely not allowed, even escaped.
            // Should already be path-split by now.
            return false;
          }
        case '\\':
          clearStateChar();
          escaping = true;
          continue;

        // the various stateChar values
        // for the "extglob" stuff.
        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

          // all of those are literals inside a class, except that
          // the glob [!a] means [^a] in regexp
          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue;
          }

          // if we already have a stateChar, then it means
          // that there was something like ** or +? in there.
          // Handle the stateChar, then proceed with this one.
          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;
          // if extglob is disabled, then +(asdf|foo) isn't a thing.
          // just clear the statechar *now*, rather than even diving into
          // the patternList stuff.
          if (options.noext) clearStateChar();
          continue;
        case '(':
          if (inClass) {
            re += '(';
            continue;
          }
          if (!stateChar) {
            re += '\\(';
            continue;
          }
          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          // negation is (?:(?!js)[^/]*)
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;
        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }
          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          // negation is (?:(?!js)[^/]*)
          // The others are (?:<pattern>)<type>
          re += pl.close;
          if (pl.type === '!') {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;
        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }
          clearStateChar();
          re += '|';
          continue;

        // these are mostly the same in regexp and glob
        case '[':
          // swallow any state-tracking char before the [
          clearStateChar();
          if (inClass) {
            re += '\\' + c;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;
        case ']':
          //  a right bracket shall lose its special
          //  meaning and represent itself in
          //  a bracket expression if it occurs
          //  first in the list.  -- POSIX.2 2.8.3.2
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          }

          // handle the case where we left a class open.
          // "[z-a]" is valid, equivalent to "\[z-a\]"
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue;
          }

          // finish up the class.
          hasMagic = true;
          inClass = false;
          re += c;
          continue;
        default:
          // swallow any state char that wasn't consumed
          clearStateChar();
          if (escaping) {
            // no need
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }
          re += c;
      } // switch
    } // for

    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug('setting tail', re, pl);
      // maybe some even number of \, then maybe 1 \, followed by a |
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = '\\';
        }

        // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.
        return $1 + $1 + $2 + '|';
      });
      this.debug('tail=%j\n   %s', tail, tail, pl, re);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }

    // handle trailing things that only matter at the very end.
    clearStateChar();
    if (escaping) {
      // trailing \\
      re += '\\\\';
    }

    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case '[':
      case '.':
      case '(':
        addPatternStart = true;
    }

    // Hack to work around lack of negative lookbehind in JS
    // A pattern like: *.!(x).!(y|z) needs to ensure that a name
    // like 'a.xyz.yz' doesn't match.  So, the first negative
    // lookahead, has to look ALL the way ahead, to the end of
    // the pattern.
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;

      // Handle nested stuff like *(*.js|!(*.json)), where open parens
      // mean that we should *not* include the ) in the bit that is considered
      // "after" the negated section.
      var openParensBefore = nlBefore.split('(').length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }
      nlAfter = cleanAfter;
      var dollar = '';
      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }

    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }
    if (addPatternStart) {
      re = patternStart + re;
    }

    // parsing just a piece of a larger pattern.
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }

    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) {
      return globUnescape(pattern);
    }
    var flags = options.nocase ? 'i' : '';
    try {
      var regExp = new RegExp('^' + re + '$', flags);
    } catch (er) /* istanbul ignore next - should be impossible */{
      // If it was an invalid regular expression, then it can't match
      // anything.  This trick looks for a character after the end of
      // the string, which is of course impossible, except in multi-line
      // mode, but it's not a /m regex.
      return new RegExp('$.');
    }
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }
  minimatch.makeRe = function (pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };
  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;

    // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.
    var set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';
    var re = set.map(function (pattern) {
      return pattern.map(function (p) {
        return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
      }).join('\\\/');
    }).join('|');

    // must match entire pattern
    // ending in a * or ** will make it less strict.
    re = '^(?:' + re + ')$';

    // can match anything, as long as it's not this.
    if (this.negate) re = '^(?!' + re + ').*$';
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) /* istanbul ignore next - should be impossible */{
      this.regexp = false;
    }
    return this.regexp;
  }
  minimatch.match = function (list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function (f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  Minimatch.prototype.match = function match(f, partial) {
    if (typeof partial === 'undefined') partial = this.partial;
    this.debug('match', f, this.pattern);
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false;
    if (this.empty) return f === '';
    if (f === '/' && partial) return true;
    var options = this.options;

    // windows: need to use /, not \
    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    }

    // treat the test path as a set of pathparts.
    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);

    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    var set = this.set;
    this.debug(this.pattern, 'set', set);

    // Find the basename of the path by looking for the last non-empty segment
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }
    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    }

    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false;
    return this.negate;
  };

  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  Minimatch.prototype.matchOne = function (file, pattern, partial) {
    var options = this.options;
    this.debug('matchOne', {
      'this': this,
      file: file,
      pattern: pattern
    });
    this.debug('matchOne', file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);

      // should be impossible.
      // some invalid regexp stuff in the set.
      /* istanbul ignore if */
      if (p === false) return false;
      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);

        // "**"
        // a/**/b/**/c would match the following:
        // a/b/x/y/z/c
        // a/x/y/z/b/c
        // a/b/x/b/x/c
        // a/b/c
        // To do this, take the rest of the pattern after
        // the **, and see if it would match the file remainder.
        // If so, return success.
        // If not, the ** "swallows" a segment, and try again.
        // This is recursively awful.
        //
        // a/**/b/**/c matching a/b/x/y/z/c
        // - a matches a
        // - doublestar
        //   - matchOne(b/x/y/z/c, b/**/c)
        //     - b matches b
        //     - doublestar
        //       - matchOne(x/y/z/c, c) -> no
        //       - matchOne(y/z/c, c) -> no
        //       - matchOne(z/c, c) -> no
        //       - matchOne(c, c) yes, hit
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug('** at the end');
          // a ** at the end will just swallow the rest.
          // We have found a match.
          // however, it will not swallow /.x, unless
          // options.dot is set.
          // . and .. are *never* matched by **, for explosively
          // exponential reasons.
          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
          }
          return true;
        }

        // ok, let's see if we can swallow whatever we can.
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

          // XXX remove this slice.  Just pass the start index.
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);
            // found a match.
            return true;
          } else {
            // can't swallow "." or ".." ever.
            // can only swallow ".foo" when explicitly asked.
            if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            }

            // ** swallows a segment, and continue.
            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }

        // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then
        /* istanbul ignore if */
        if (partial) {
          // ran out of file
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true;
        }
        return false;
      }

      // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.
      var hit;
      if (typeof p === 'string') {
        hit = f === p;
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }
      if (!hit) return false;
    }

    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*

    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true;
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial;
    } else /* istanbul ignore else */if (pi === pl) {
        // ran out of pattern, still have file left.
        // this is only acceptable if we're on the very last
        // empty segment of a file with a trailing slash.
        // a/* should match a/b/
        return fi === fl - 1 && file[fi] === '';
      }

    // should be unreachable.
    /* istanbul ignore next */
    throw new Error('wtf?');
  };

  // replace stuff like \* with *
  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }
  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  return minimatch_1;
}

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;
function requireInherits_browser() {
  if (hasRequiredInherits_browser) return inherits_browser.exports;
  hasRequiredInherits_browser = 1;
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    inherits_browser.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    inherits_browser.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  return inherits_browser.exports;
}

var hasRequiredInherits;
function requireInherits() {
  if (hasRequiredInherits) return inherits.exports;
  hasRequiredInherits = 1;
  try {
    var util = require('util');
    /* istanbul ignore next */
    if (typeof util.inherits !== 'function') throw '';
    inherits.exports = util.inherits;
  } catch (e) {
    /* istanbul ignore next */
    inherits.exports = requireInherits_browser();
  }
  return inherits.exports;
}

var pathIsAbsolute = {exports: {}};

var hasRequiredPathIsAbsolute;
function requirePathIsAbsolute() {
  if (hasRequiredPathIsAbsolute) return pathIsAbsolute.exports;
  hasRequiredPathIsAbsolute = 1;
  function posix(path) {
    return path.charAt(0) === '/';
  }
  function win32(path) {
    // https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || '';
    var isUnc = Boolean(device && device.charAt(1) !== ':');

    // UNC paths are always absolute
    return Boolean(result[2] || isUnc);
  }
  pathIsAbsolute.exports = process.platform === 'win32' ? win32 : posix;
  pathIsAbsolute.exports.posix = posix;
  pathIsAbsolute.exports.win32 = win32;
  return pathIsAbsolute.exports;
}

var common = {};

var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  common.setopts = setopts;
  common.ownProp = ownProp;
  common.makeAbs = makeAbs;
  common.finish = finish;
  common.mark = mark;
  common.isIgnored = isIgnored;
  common.childrenIgnored = childrenIgnored;
  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }
  var fs = require$$0$1;
  var path$1 = path;
  var minimatch = requireMinimatch();
  var isAbsolute = requirePathIsAbsolute();
  var Minimatch = minimatch.Minimatch;
  function alphasort(a, b) {
    return a.localeCompare(b, 'en');
  }
  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];
    if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];
    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }

  // ignore patterns are always in dot:true mode.
  function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(-3) === '/**') {
      var gpattern = pattern.replace(/(\/\*\*)+$/, '');
      gmatcher = new Minimatch(gpattern, {
        dot: true
      });
    }
    return {
      matcher: new Minimatch(pattern, {
        dot: true
      }),
      gmatcher: gmatcher
    };
  }
  function setopts(self, pattern, options) {
    if (!options) options = {};

    // base-matching: just use globstar for that.
    if (options.matchBase && -1 === pattern.indexOf("/")) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }
      pattern = "**/" + pattern;
    }
    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir) self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;
    self.fs = options.fs || fs;
    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd")) self.cwd = cwd;else {
      self.cwd = path$1.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }
    self.root = options.root || path$1.resolve(self.cwd, "/");
    self.root = path$1.resolve(self.root);
    if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/");

    // TODO: is an absolute `cwd` supposed to be resolved against `root`?
    // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32") self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount;

    // disable comments and negation in Minimatch.
    // Note that they are not supported in Glob itself anyway.
    options.nonegate = true;
    options.nocomment = true;
    // always treat \ in patterns as escapes, not path separators
    options.allowWindowsEscape = false;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }
  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);
    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];
      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          // do like the shell, and spit out the literal glob
          var literal = self.minimatch.globSet[i];
          if (nou) all.push(literal);else all[literal] = true;
        }
      } else {
        // had matches
        var m = Object.keys(matches);
        if (nou) all.push.apply(all, m);else m.forEach(function (m) {
          all[m] = true;
        });
      }
    }
    if (!nou) all = Object.keys(all);
    if (!self.nosort) all = all.sort(alphasort);

    // at *some* point we statted all of these
    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }
      if (self.nodir) {
        all = all.filter(function (e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c) notDir = c !== 'DIR' && !Array.isArray(c);
          return notDir;
        });
      }
    }
    if (self.ignore.length) all = all.filter(function (m) {
      return !isIgnored(self, m);
    });
    self.found = all;
  }
  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
      var isDir = c === 'DIR' || Array.isArray(c);
      var slash = p.slice(-1) === '/';
      if (isDir && !slash) m += '/';else if (!isDir && slash) m = m.slice(0, -1);
      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }
    return m;
  }

  // lotta situps...
  function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === '/') {
      abs = path$1.join(self.root, f);
    } else if (isAbsolute(f) || f === '') {
      abs = f;
    } else if (self.changedCwd) {
      abs = path$1.resolve(self.cwd, f);
    } else {
      abs = path$1.resolve(f);
    }
    if (process.platform === 'win32') abs = abs.replace(/\\/g, '/');
    return abs;
  }

  // Return true, if pattern ends with globstar '**', for the accompanying parent directory.
  // Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
  function isIgnored(self, path) {
    if (!self.ignore.length) return false;
    return self.ignore.some(function (item) {
      return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
    });
  }
  function childrenIgnored(self, path) {
    if (!self.ignore.length) return false;
    return self.ignore.some(function (item) {
      return !!(item.gmatcher && item.gmatcher.match(path));
    });
  }
  return common;
}

var sync;
var hasRequiredSync;
function requireSync() {
  if (hasRequiredSync) return sync;
  hasRequiredSync = 1;
  sync = globSync;
  globSync.GlobSync = GlobSync;
  var rp = requireFs_realpath();
  var minimatch = requireMinimatch();
  minimatch.Minimatch;
  requireGlob().Glob;
  var path$1 = path;
  var assert = require$$5$2;
  var isAbsolute = requirePathIsAbsolute();
  var common = requireCommon();
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  function globSync(pattern, options) {
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
    return new GlobSync(pattern, options).found;
  }
  function GlobSync(pattern, options) {
    if (!pattern) throw new Error('must provide pattern');
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
    if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);
    setopts(this, pattern, options);
    if (this.noprocess) return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }
    this._finish();
  }
  GlobSync.prototype._finish = function () {
    assert.ok(this instanceof GlobSync);
    if (this.realpath) {
      var self = this;
      this.matches.forEach(function (matchset, index) {
        var set = self.matches[index] = Object.create(null);
        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = rp.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === 'stat') set[self._makeAbs(p)] = true;else throw er;
          }
        }
      });
    }
    common.finish(this);
  };
  GlobSync.prototype._process = function (pattern, index, inGlobStar) {
    assert.ok(this instanceof GlobSync);

    // Get the first [n] parts of pattern that are all strings.
    var n = 0;
    while (typeof pattern[n] === 'string') {
      n++;
    }
    // now n is the index of the first one that is *not* a string.

    // See if there's anything else
    var prefix;
    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index);
        return;
      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;
      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break;
    }
    var remain = pattern.slice(n);

    // get the list of entries.
    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.map(function (p) {
      return typeof p === 'string' ? p : '[*]';
    }).join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;
    var abs = this._makeAbs(read);

    //if ignored, skip processing
    if (childrenIgnored(this, read)) return;
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };
  GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);

    // if the abs isn't a dir, then nothing can match!
    if (!entries) return;

    // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== '.' || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m) matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    // If there are no matched entries, then nothing matches.
    if (len === 0) return;

    // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix.slice(-1) !== '/') e = prefix + '/' + e;else e = prefix + e;
        }
        if (e.charAt(0) === '/' && !this.nomount) {
          e = path$1.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      // This was the last one, and no stats were needed
      return;
    }

    // now test all matched entries as stand-ins for that part
    // of the pattern.
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) newPattern = [prefix, e];else newPattern = [e];
      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };
  GlobSync.prototype._emitMatch = function (index, e) {
    if (isIgnored(this, e)) return;
    var abs = this._makeAbs(e);
    if (this.mark) e = this._mark(e);
    if (this.absolute) {
      e = abs;
    }
    if (this.matches[index][e]) return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }
    this.matches[index][e] = true;
    if (this.stat) this._stat(e);
  };
  GlobSync.prototype._readdirInGlobStar = function (abs) {
    // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation
    if (this.follow) return this._readdir(abs, false);
    var entries;
    var lstat;
    try {
      lstat = this.fs.lstatSync(abs);
    } catch (er) {
      if (er.code === 'ENOENT') {
        // lstat failed, doesn't exist
        return null;
      }
    }
    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) this.cache[abs] = 'FILE';else entries = this._readdir(abs, false);
    return entries;
  };
  GlobSync.prototype._readdir = function (abs, inGlobStar) {
    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return null;
      if (Array.isArray(c)) return c;
    }
    try {
      return this._readdirEntries(abs, this.fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);
      return null;
    }
  };
  GlobSync.prototype._readdirEntries = function (abs, entries) {
    // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;

    // mark and cache dir-ness
    return entries;
  };
  GlobSync.prototype._readdirError = function (f, er) {
    // handle errors, and cache the information
    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
      case 'ENOTDIR':
        // totally normal. means it *does* exist.
        var abs = this._makeAbs(f);
        this.cache[abs] = 'FILE';
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }
        break;
      case 'ENOENT': // not terribly unusual
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        // some unusual error.  Treat as failure.
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) throw er;
        if (!this.silent) console.error('glob error', er);
        break;
    }
  };
  GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);

    // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt
    if (!entries) return;

    // test without the globstar, and with every child both below
    // and replacing the globstar.
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    // the noGlobStar pattern exits the inGlobStar state
    this._process(noGlobStar, index, false);
    var len = entries.length;
    var isSym = this.symlinks[abs];

    // If it's a symlink, and we're in a globstar, then stop
    if (isSym && inGlobStar) return;
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;

      // these two cases enter the inGlobStar state
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true);
    }
  };
  GlobSync.prototype._processSimple = function (prefix, index) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    var exists = this._stat(prefix);
    if (!this.matches[index]) this.matches[index] = Object.create(null);

    // If it doesn't exist, then just mark the lack of results
    if (!exists) return;
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path$1.join(this.root, prefix);
      } else {
        prefix = path$1.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }
    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    // Mark this as a match
    this._emitMatch(index, prefix);
  };

  // Returns either 'DIR', 'FILE', or false
  GlobSync.prototype._stat = function (f) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === '/';
    if (f.length > this.maxLength) return false;
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c)) c = 'DIR';

      // It exists, but maybe not how we need it
      if (!needDir || c === 'DIR') return c;
      if (needDir && c === 'FILE') return false;

      // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }
    var stat = this.statCache[abs];
    if (!stat) {
      var lstat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
          this.statCache[abs] = false;
          return false;
        }
      }
      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = this.fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }
    this.statCache[abs] = stat;
    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === 'FILE') return false;
    return c;
  };
  GlobSync.prototype._mark = function (p) {
    return common.mark(this, p);
  };
  GlobSync.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };
  return sync;
}

var wrappy_1;
var hasRequiredWrappy;
function requireWrappy() {
  if (hasRequiredWrappy) return wrappy_1;
  hasRequiredWrappy = 1;
  // Returns a wrapper function that returns a wrapped callback
  // The wrapper function should do some stuff, and return a
  // presumably different callback function.
  // This makes sure that own properties are retained, so that
  // decorations and such are not lost along the way.
  wrappy_1 = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);
    if (typeof fn !== 'function') throw new TypeError('need wrapper function');
    Object.keys(fn).forEach(function (k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb = args[args.length - 1];
      if (typeof ret === 'function' && ret !== cb) {
        Object.keys(cb).forEach(function (k) {
          ret[k] = cb[k];
        });
      }
      return ret;
    }
  }
  return wrappy_1;
}

var once = {exports: {}};

var hasRequiredOnce;
function requireOnce() {
  if (hasRequiredOnce) return once.exports;
  hasRequiredOnce = 1;
  var wrappy = requireWrappy();
  once.exports = wrappy(once$1);
  once.exports.strict = wrappy(onceStrict);
  once$1.proto = once$1(function () {
    Object.defineProperty(Function.prototype, 'once', {
      value: function () {
        return once$1(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
      value: function () {
        return onceStrict(this);
      },
      configurable: true
    });
  });
  function once$1(fn) {
    var f = function () {
      if (f.called) return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  function onceStrict(fn) {
    var f = function () {
      if (f.called) throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || 'Function wrapped with `once`';
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
  return once.exports;
}

var inflight_1;
var hasRequiredInflight;
function requireInflight() {
  if (hasRequiredInflight) return inflight_1;
  hasRequiredInflight = 1;
  var wrappy = requireWrappy();
  var reqs = Object.create(null);
  var once = requireOnce();
  inflight_1 = wrappy(inflight);
  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }
  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);

      // XXX It's somewhat ambiguous whether a new callback added in this
      // pass should be queued for later execution if something in the
      // list of callbacks throws, or if it should just be discarded.
      // However, it's such an edge case that it hardly matters, and either
      // choice is likely as surprising as the other.
      // As it happens, we do go ahead and schedule it for later execution.
      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          // added more in the interim.
          // de-zalgo, just in case, but don't call again.
          cbs.splice(0, len);
          process.nextTick(function () {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }
  function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++) array[i] = args[i];
    return array;
  }
  return inflight_1;
}

var glob_1;
var hasRequiredGlob;
function requireGlob() {
  if (hasRequiredGlob) return glob_1;
  hasRequiredGlob = 1;
  // Approach:
  //
  // 1. Get the minimatch set
  // 2. For each pattern in the set, PROCESS(pattern, false)
  // 3. Store matches per-set, then uniq them
  //
  // PROCESS(pattern, inGlobStar)
  // Get the first [n] items from pattern that are all strings
  // Join these together.  This is PREFIX.
  //   If there is no more remaining, then stat(PREFIX) and
  //   add to matches if it succeeds.  END.
  //
  // If inGlobStar and PREFIX is symlink and points to dir
  //   set ENTRIES = []
  // else readdir(PREFIX) as ENTRIES
  //   If fail, END
  //
  // with ENTRIES
  //   If pattern[n] is GLOBSTAR
  //     // handle the case where the globstar match is empty
  //     // by pruning it out, and testing the resulting pattern
  //     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
  //     // handle other cases.
  //     for ENTRY in ENTRIES (not dotfiles)
  //       // attach globstar + tail onto the entry
  //       // Mark that this entry is a globstar match
  //       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
  //
  //   else // not globstar
  //     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
  //       Test ENTRY against pattern[n]
  //       If fails, continue
  //       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
  //
  // Caveat:
  //   Cache all stats and readdirs results to minimize syscall.  Since all
  //   we ever care about is existence and directory-ness, we can just keep
  //   `true` for files, and [children,...] for directories, or `false` for
  //   things that don't exist.

  glob_1 = glob;
  var rp = requireFs_realpath();
  var minimatch = requireMinimatch();
  minimatch.Minimatch;
  var inherits = requireInherits();
  var EE = require$$2$1.EventEmitter;
  var path$1 = path;
  var assert = require$$5$2;
  var isAbsolute = requirePathIsAbsolute();
  var globSync = requireSync();
  var common = requireCommon();
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = requireInflight();
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  var once = requireOnce();
  function glob(pattern, options, cb) {
    if (typeof options === 'function') cb = options, options = {};
    if (!options) options = {};
    if (options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return globSync(pattern, options);
    }
    return new Glob(pattern, options, cb);
  }
  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;

  // old api surface
  glob.glob = glob;
  function extend(origin, add) {
    if (add === null || typeof add !== 'object') {
      return origin;
    }
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  glob.hasMagic = function (pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;
    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (!pattern) return false;
    if (set.length > 1) return true;
    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== 'string') return true;
    }
    return false;
  };
  glob.Glob = Glob;
  inherits(Glob, EE);
  function Glob(pattern, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = null;
    }
    if (options && options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return new GlobSync(pattern, options);
    }
    if (!(this instanceof Glob)) return new Glob(pattern, options, cb);
    setopts(this, pattern, options);
    this._didRealPath = false;

    // process each pattern in the minimatch set
    var n = this.minimatch.set.length;

    // The matches are stored as {<filename>: true,...} so that
    // duplicates are automagically pruned.
    // Later, we do an Object.keys() on these.
    // Keep them as a list so we can fill in when nonull is set.
    this.matches = new Array(n);
    if (typeof cb === 'function') {
      cb = once(cb);
      this.on('error', cb);
      this.on('end', function (matches) {
        cb(null, matches);
      });
    }
    var self = this;
    this._processing = 0;
    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;
    if (this.noprocess) return this;
    if (n === 0) return done();
    var sync = true;
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }
    sync = false;
    function done() {
      --self._processing;
      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function () {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }
  Glob.prototype._finish = function () {
    assert(this instanceof Glob);
    if (this.aborted) return;
    if (this.realpath && !this._didRealpath) return this._realpath();
    common.finish(this);
    this.emit('end', this.found);
  };
  Glob.prototype._realpath = function () {
    if (this._didRealpath) return;
    this._didRealpath = true;
    var n = this.matches.length;
    if (n === 0) return this._finish();
    var self = this;
    for (var i = 0; i < this.matches.length; i++) this._realpathSet(i, next);
    function next() {
      if (--n === 0) self._finish();
    }
  };
  Glob.prototype._realpathSet = function (index, cb) {
    var matchset = this.matches[index];
    if (!matchset) return cb();
    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;
    if (n === 0) return cb();
    var set = this.matches[index] = Object.create(null);
    found.forEach(function (p, i) {
      // If there's a problem with the stat, then it means that
      // one or more of the links in the realpath couldn't be
      // resolved.  just return the abs value in that case.
      p = self._makeAbs(p);
      rp.realpath(p, self.realpathCache, function (er, real) {
        if (!er) set[real] = true;else if (er.syscall === 'stat') set[p] = true;else self.emit('error', er); // srsly wtf right here

        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };
  Glob.prototype._mark = function (p) {
    return common.mark(this, p);
  };
  Glob.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };
  Glob.prototype.abort = function () {
    this.aborted = true;
    this.emit('abort');
  };
  Glob.prototype.pause = function () {
    if (!this.paused) {
      this.paused = true;
      this.emit('pause');
    }
  };
  Glob.prototype.resume = function () {
    if (this.paused) {
      this.emit('resume');
      this.paused = false;
      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];
          this._emitMatch(e[0], e[1]);
        }
      }
      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;
          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };
  Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === 'function');
    if (this.aborted) return;
    this._processing++;
    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);
      return;
    }

    //console.error('PROCESS %d', this._processing, pattern)

    // Get the first [n] parts of pattern that are all strings.
    var n = 0;
    while (typeof pattern[n] === 'string') {
      n++;
    }
    // now n is the index of the first one that is *not* a string.

    // see if there's anything else
    var prefix;
    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index, cb);
        return;
      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;
      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break;
    }
    var remain = pattern.slice(n);

    // get the list of entries.
    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.map(function (p) {
      return typeof p === 'string' ? p : '[*]';
    }).join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;
    var abs = this._makeAbs(read);

    //if ignored, skip _processing
    if (childrenIgnored(this, read)) return cb();
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };
  Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function (er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    // if the abs isn't a dir, then nothing can match!
    if (!entries) return cb();

    // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== '.' || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m) matchedEntries.push(e);
      }
    }

    //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

    var len = matchedEntries.length;
    // If there are no matched entries, then nothing matches.
    if (len === 0) return cb();

    // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
        }
        if (e.charAt(0) === '/' && !this.nomount) {
          e = path$1.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      // This was the last one, and no stats were needed
      return cb();
    }

    // now test all matched entries as stand-ins for that part
    // of the pattern.
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      if (prefix) {
        if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
      }
      this._process([e].concat(remain), index, inGlobStar, cb);
    }
    cb();
  };
  Glob.prototype._emitMatch = function (index, e) {
    if (this.aborted) return;
    if (isIgnored(this, e)) return;
    if (this.paused) {
      this._emitQueue.push([index, e]);
      return;
    }
    var abs = isAbsolute(e) ? e : this._makeAbs(e);
    if (this.mark) e = this._mark(e);
    if (this.absolute) e = abs;
    if (this.matches[index][e]) return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }
    this.matches[index][e] = true;
    var st = this.statCache[abs];
    if (st) this.emit('stat', e, st);
    this.emit('match', e);
  };
  Glob.prototype._readdirInGlobStar = function (abs, cb) {
    if (this.aborted) return;

    // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation
    if (this.follow) return this._readdir(abs, false, cb);
    var lstatkey = 'lstat\0' + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);
    if (lstatcb) self.fs.lstat(abs, lstatcb);
    function lstatcb_(er, lstat) {
      if (er && er.code === 'ENOENT') return cb();
      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;

      // If it's not a symlink or a dir, then it's definitely a regular file.
      // don't bother doing a readdir in that case.
      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = 'FILE';
        cb();
      } else self._readdir(abs, false, cb);
    }
  };
  Glob.prototype._readdir = function (abs, inGlobStar, cb) {
    if (this.aborted) return;
    cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
    if (!cb) return;

    //console.error('RD %j %j', +inGlobStar, abs)
    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return cb();
      if (Array.isArray(c)) return cb(null, c);
    }
    var self = this;
    self.fs.readdir(abs, readdirCb(this, abs, cb));
  };
  function readdirCb(self, abs, cb) {
    return function (er, entries) {
      if (er) self._readdirError(abs, er, cb);else self._readdirEntries(abs, entries, cb);
    };
  }
  Glob.prototype._readdirEntries = function (abs, entries, cb) {
    if (this.aborted) return;

    // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return cb(null, entries);
  };
  Glob.prototype._readdirError = function (f, er, cb) {
    if (this.aborted) return;

    // handle errors, and cache the information
    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
      case 'ENOTDIR':
        // totally normal. means it *does* exist.
        var abs = this._makeAbs(f);
        this.cache[abs] = 'FILE';
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit('error', error);
          this.abort();
        }
        break;
      case 'ENOENT': // not terribly unusual
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        // some unusual error.  Treat as failure.
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) {
          this.emit('error', er);
          // If the error is handled, then we abort
          // if not, we threw out of here
          this.abort();
        }
        if (!this.silent) console.error('glob error', er);
        break;
    }
    return cb();
  };
  Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function (er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    //console.error('pgs2', prefix, remain[0], entries)

    // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt
    if (!entries) return cb();

    // test without the globstar, and with every child both below
    // and replacing the globstar.
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    // the noGlobStar pattern exits the inGlobStar state
    this._process(noGlobStar, index, false, cb);
    var isSym = this.symlinks[abs];
    var len = entries.length;

    // If it's a symlink, and we're in a globstar, then stop
    if (isSym && inGlobStar) return cb();
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;

      // these two cases enter the inGlobStar state
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true, cb);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true, cb);
    }
    cb();
  };
  Glob.prototype._processSimple = function (prefix, index, cb) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    var self = this;
    this._stat(prefix, function (er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };
  Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {
    //console.error('ps2', prefix, exists)

    if (!this.matches[index]) this.matches[index] = Object.create(null);

    // If it doesn't exist, then just mark the lack of results
    if (!exists) return cb();
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path$1.join(this.root, prefix);
      } else {
        prefix = path$1.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }
    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    // Mark this as a match
    this._emitMatch(index, prefix);
    cb();
  };

  // Returns either 'DIR', 'FILE', or false
  Glob.prototype._stat = function (f, cb) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === '/';
    if (f.length > this.maxLength) return cb();
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c)) c = 'DIR';

      // It exists, but maybe not how we need it
      if (!needDir || c === 'DIR') return cb(null, c);
      if (needDir && c === 'FILE') return cb();

      // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }
    var stat = this.statCache[abs];
    if (stat !== undefined) {
      if (stat === false) return cb(null, stat);else {
        var type = stat.isDirectory() ? 'DIR' : 'FILE';
        if (needDir && type === 'FILE') return cb();else return cb(null, type, stat);
      }
    }
    var self = this;
    var statcb = inflight('stat\0' + abs, lstatcb_);
    if (statcb) self.fs.lstat(abs, statcb);
    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        // If it's a symlink, then treat it as the target, unless
        // the target does not exist, then treat it as a file.
        return self.fs.stat(abs, function (er, stat) {
          if (er) self._stat2(f, abs, null, lstat, cb);else self._stat2(f, abs, er, stat, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };
  Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
    if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
      this.statCache[abs] = false;
      return cb();
    }
    var needDir = f.slice(-1) === '/';
    this.statCache[abs] = stat;
    if (abs.slice(-1) === '/' && stat && !stat.isDirectory()) return cb(null, false, stat);
    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === 'FILE') return cb();
    return cb(null, c, stat);
  };
  return glob_1;
}

var rimraf_1;
var hasRequiredRimraf;
function requireRimraf() {
  if (hasRequiredRimraf) return rimraf_1;
  hasRequiredRimraf = 1;
  const assert = require$$5$2;
  const path$1 = path;
  const fs = require$$0$1;
  let glob = undefined;
  try {
    glob = requireGlob();
  } catch (_err) {
    // treat glob as optional.
  }
  const defaultGlobOpts = {
    nosort: true,
    silent: true
  };

  // for EMFILE handling
  let timeout = 0;
  const isWindows = process.platform === "win32";
  const defaults = options => {
    const methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
    methods.forEach(m => {
      options[m] = options[m] || fs[m];
      m = m + 'Sync';
      options[m] = options[m] || fs[m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1000;
    if (options.glob === false) {
      options.disableGlob = true;
    }
    if (options.disableGlob !== true && glob === undefined) {
      throw Error('glob dependency not found, set `options.disableGlob = true` if intentional');
    }
    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  };
  const rimraf = (p, options, cb) => {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    assert(p, 'rimraf: missing path');
    assert.equal(typeof p, 'string', 'rimraf: path should be a string');
    assert.equal(typeof cb, 'function', 'rimraf: callback function required');
    assert(options, 'rimraf: invalid options argument provided');
    assert.equal(typeof options, 'object', 'rimraf: options should be object');
    defaults(options);
    let busyTries = 0;
    let errState = null;
    let n = 0;
    const next = er => {
      errState = errState || er;
      if (--n === 0) cb(errState);
    };
    const afterGlob = (er, results) => {
      if (er) return cb(er);
      n = results.length;
      if (n === 0) return cb();
      results.forEach(p => {
        const CB = er => {
          if (er) {
            if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              // try again, with the same exact callback as this one.
              return setTimeout(() => rimraf_(p, options, CB), busyTries * 100);
            }

            // this one won't happen if graceful-fs is used.
            if (er.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(() => rimraf_(p, options, CB), timeout++);
            }

            // already gone
            if (er.code === "ENOENT") er = null;
          }
          timeout = 0;
          next(er);
        };
        rimraf_(p, options, CB);
      });
    };
    if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [p]);
    options.lstat(p, (er, stat) => {
      if (!er) return afterGlob(null, [p]);
      glob(p, options.glob, afterGlob);
    });
  };

  // Two possible strategies.
  // 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
  // 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
  //
  // Both result in an extra syscall when you guess wrong.  However, there
  // are likely far more normal files in the world than directories.  This
  // is based on the assumption that a the average number of files per
  // directory is >= 1.
  //
  // If anyone ever complains about this, then I guess the strategy could
  // be made configurable somehow.  But until then, YAGNI.
  const rimraf_ = (p, options, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');

    // sunos lets the root user unlink directories, which is... weird.
    // so we have to lstat here and make sure it's not a dir.
    options.lstat(p, (er, st) => {
      if (er && er.code === "ENOENT") return cb(null);

      // Windows can EPERM on stat.  Life is suffering.
      if (er && er.code === "EPERM" && isWindows) fixWinEPERM(p, options, er, cb);
      if (st && st.isDirectory()) return rmdir(p, options, er, cb);
      options.unlink(p, er => {
        if (er) {
          if (er.code === "ENOENT") return cb(null);
          if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
          if (er.code === "EISDIR") return rmdir(p, options, er, cb);
        }
        return cb(er);
      });
    });
  };
  const fixWinEPERM = (p, options, er, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    options.chmod(p, 0o666, er2 => {
      if (er2) cb(er2.code === "ENOENT" ? null : er);else options.stat(p, (er3, stats) => {
        if (er3) cb(er3.code === "ENOENT" ? null : er);else if (stats.isDirectory()) rmdir(p, options, er, cb);else options.unlink(p, cb);
      });
    });
  };
  const fixWinEPERMSync = (p, options, er) => {
    assert(p);
    assert(options);
    try {
      options.chmodSync(p, 0o666);
    } catch (er2) {
      if (er2.code === "ENOENT") return;else throw er;
    }
    let stats;
    try {
      stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT") return;else throw er;
    }
    if (stats.isDirectory()) rmdirSync(p, options, er);else options.unlinkSync(p);
  };
  const rmdir = (p, options, originalEr, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');

    // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
    // if we guessed wrong, and it's not a directory, then
    // raise the original error.
    options.rmdir(p, er => {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);else if (er && er.code === "ENOTDIR") cb(originalEr);else cb(er);
    });
  };
  const rmkids = (p, options, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    options.readdir(p, (er, files) => {
      if (er) return cb(er);
      let n = files.length;
      if (n === 0) return options.rmdir(p, cb);
      let errState;
      files.forEach(f => {
        rimraf(path$1.join(p, f), options, er => {
          if (errState) return;
          if (er) return cb(errState = er);
          if (--n === 0) options.rmdir(p, cb);
        });
      });
    });
  };

  // this looks simpler, and is strictly *faster*, but will
  // tie up the JavaScript thread and fail on excessively
  // deep directory trees.
  const rimrafSync = (p, options) => {
    options = options || {};
    defaults(options);
    assert(p, 'rimraf: missing path');
    assert.equal(typeof p, 'string', 'rimraf: path should be a string');
    assert(options, 'rimraf: missing options');
    assert.equal(typeof options, 'object', 'rimraf: options should be object');
    let results;
    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        options.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }
    if (!results.length) return;
    for (let i = 0; i < results.length; i++) {
      const p = results[i];
      let st;
      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") return;

        // Windows can EPERM on stat.  Life is suffering.
        if (er.code === "EPERM" && isWindows) fixWinEPERMSync(p, options, er);
      }
      try {
        // sunos lets the root user unlink directories, which is... weird.
        if (st && st.isDirectory()) rmdirSync(p, options, null);else options.unlinkSync(p);
      } catch (er) {
        if (er.code === "ENOENT") return;
        if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        if (er.code !== "EISDIR") throw er;
        rmdirSync(p, options, er);
      }
    }
  };
  const rmdirSync = (p, options, originalEr) => {
    assert(p);
    assert(options);
    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT") return;
      if (er.code === "ENOTDIR") throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
    }
  };
  const rmkidsSync = (p, options) => {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach(f => rimrafSync(path$1.join(p, f), options));

    // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.
    const retries = isWindows ? 100 : 1;
    let i = 0;
    do {
      let threw = true;
      try {
        const ret = options.rmdirSync(p, options);
        threw = false;
        return ret;
      } finally {
        if (++i < retries && threw) continue;
      }
    } while (true);
  };
  rimraf_1 = rimraf;
  rimraf.sync = rimrafSync;
  return rimraf_1;
}

napi.exports;
var hasRequiredNapi;
function requireNapi() {
  if (hasRequiredNapi) return napi.exports;
  hasRequiredNapi = 1;
  (function (module, exports) {

    const fs = require$$0$1;
    module.exports = exports;
    const versionArray = process.version.substr(1).replace(/-.*$/, '').split('.').map(item => {
      return +item;
    });
    const napi_multiple_commands = ['build', 'clean', 'configure', 'package', 'publish', 'reveal', 'testbinary', 'testpackage', 'unpublish'];
    const napi_build_version_tag = 'napi_build_version=';
    module.exports.get_napi_version = function () {
      // returns the non-zero numeric napi version or undefined if napi is not supported.
      // correctly supporting target requires an updated cross-walk
      let version = process.versions.napi; // can be undefined
      if (!version) {
        // this code should never need to be updated
        if (versionArray[0] === 9 && versionArray[1] >= 3) version = 2; // 9.3.0+
        else if (versionArray[0] === 8) version = 1; // 8.0.0+
      }
      return version;
    };
    module.exports.get_napi_version_as_string = function (target) {
      // returns the napi version as a string or an empty string if napi is not supported.
      const version = module.exports.get_napi_version(target);
      return version ? '' + version : '';
    };
    module.exports.validate_package_json = function (package_json, opts) {
      // throws Error

      const binary = package_json.binary;
      const module_path_ok = pathOK(binary.module_path);
      const remote_path_ok = pathOK(binary.remote_path);
      const package_name_ok = pathOK(binary.package_name);
      const napi_build_versions = module.exports.get_napi_build_versions(package_json, opts, true);
      const napi_build_versions_raw = module.exports.get_napi_build_versions_raw(package_json);
      if (napi_build_versions) {
        napi_build_versions.forEach(napi_build_version => {
          if (!(parseInt(napi_build_version, 10) === napi_build_version && napi_build_version > 0)) {
            throw new Error('All values specified in napi_versions must be positive integers.');
          }
        });
      }
      if (napi_build_versions && (!module_path_ok || !remote_path_ok && !package_name_ok)) {
        throw new Error('When napi_versions is specified; module_path and either remote_path or ' + "package_name must contain the substitution string '{napi_build_version}`.");
      }
      if ((module_path_ok || remote_path_ok || package_name_ok) && !napi_build_versions_raw) {
        throw new Error("When the substitution string '{napi_build_version}` is specified in " + 'module_path, remote_path, or package_name; napi_versions must also be specified.');
      }
      if (napi_build_versions && !module.exports.get_best_napi_build_version(package_json, opts) && module.exports.build_napi_only(package_json)) {
        throw new Error('The Node-API version of this Node instance is ' + module.exports.get_napi_version(opts ? opts.target : undefined) + '. ' + 'This module supports Node-API version(s) ' + module.exports.get_napi_build_versions_raw(package_json) + '. ' + 'This Node instance cannot run this module.');
      }
      if (napi_build_versions_raw && !napi_build_versions && module.exports.build_napi_only(package_json)) {
        throw new Error('The Node-API version of this Node instance is ' + module.exports.get_napi_version(opts ? opts.target : undefined) + '. ' + 'This module supports Node-API version(s) ' + module.exports.get_napi_build_versions_raw(package_json) + '. ' + 'This Node instance cannot run this module.');
      }
    };
    function pathOK(path) {
      return path && (path.indexOf('{napi_build_version}') !== -1 || path.indexOf('{node_napi_label}') !== -1);
    }
    module.exports.expand_commands = function (package_json, opts, commands) {
      const expanded_commands = [];
      const napi_build_versions = module.exports.get_napi_build_versions(package_json, opts);
      commands.forEach(command => {
        if (napi_build_versions && command.name === 'install') {
          const napi_build_version = module.exports.get_best_napi_build_version(package_json, opts);
          const args = napi_build_version ? [napi_build_version_tag + napi_build_version] : [];
          expanded_commands.push({
            name: command.name,
            args: args
          });
        } else if (napi_build_versions && napi_multiple_commands.indexOf(command.name) !== -1) {
          napi_build_versions.forEach(napi_build_version => {
            const args = command.args.slice();
            args.push(napi_build_version_tag + napi_build_version);
            expanded_commands.push({
              name: command.name,
              args: args
            });
          });
        } else {
          expanded_commands.push(command);
        }
      });
      return expanded_commands;
    };
    module.exports.get_napi_build_versions = function (package_json, opts, warnings) {
      // opts may be undefined
      const log = logExports;
      let napi_build_versions = [];
      const supported_napi_version = module.exports.get_napi_version(opts ? opts.target : undefined);
      // remove duplicates, verify each napi version can actaully be built
      if (package_json.binary && package_json.binary.napi_versions) {
        package_json.binary.napi_versions.forEach(napi_version => {
          const duplicated = napi_build_versions.indexOf(napi_version) !== -1;
          if (!duplicated && supported_napi_version && napi_version <= supported_napi_version) {
            napi_build_versions.push(napi_version);
          } else if (warnings && !duplicated && supported_napi_version) {
            log.info('This Node instance does not support builds for Node-API version', napi_version);
          }
        });
      }
      if (opts && opts['build-latest-napi-version-only']) {
        let latest_version = 0;
        napi_build_versions.forEach(napi_version => {
          if (napi_version > latest_version) latest_version = napi_version;
        });
        napi_build_versions = latest_version ? [latest_version] : [];
      }
      return napi_build_versions.length ? napi_build_versions : undefined;
    };
    module.exports.get_napi_build_versions_raw = function (package_json) {
      const napi_build_versions = [];
      // remove duplicates
      if (package_json.binary && package_json.binary.napi_versions) {
        package_json.binary.napi_versions.forEach(napi_version => {
          if (napi_build_versions.indexOf(napi_version) === -1) {
            napi_build_versions.push(napi_version);
          }
        });
      }
      return napi_build_versions.length ? napi_build_versions : undefined;
    };
    module.exports.get_command_arg = function (napi_build_version) {
      return napi_build_version_tag + napi_build_version;
    };
    module.exports.get_napi_build_version_from_command_args = function (command_args) {
      for (let i = 0; i < command_args.length; i++) {
        const arg = command_args[i];
        if (arg.indexOf(napi_build_version_tag) === 0) {
          return parseInt(arg.substr(napi_build_version_tag.length), 10);
        }
      }
      return undefined;
    };
    module.exports.swap_build_dir_out = function (napi_build_version) {
      if (napi_build_version) {
        const rm = requireRimraf();
        rm.sync(module.exports.get_build_dir(napi_build_version));
        fs.renameSync('build', module.exports.get_build_dir(napi_build_version));
      }
    };
    module.exports.swap_build_dir_in = function (napi_build_version) {
      if (napi_build_version) {
        const rm = requireRimraf();
        rm.sync('build');
        fs.renameSync(module.exports.get_build_dir(napi_build_version), 'build');
      }
    };
    module.exports.get_build_dir = function (napi_build_version) {
      return 'build-tmp-napi-v' + napi_build_version;
    };
    module.exports.get_best_napi_build_version = function (package_json, opts) {
      let best_napi_build_version = 0;
      const napi_build_versions = module.exports.get_napi_build_versions(package_json, opts);
      if (napi_build_versions) {
        const our_napi_version = module.exports.get_napi_version(opts ? opts.target : undefined);
        napi_build_versions.forEach(napi_build_version => {
          if (napi_build_version > best_napi_build_version && napi_build_version <= our_napi_version) {
            best_napi_build_version = napi_build_version;
          }
        });
      }
      return best_napi_build_version === 0 ? undefined : best_napi_build_version;
    };
    module.exports.build_napi_only = function (package_json) {
      return package_json.binary && package_json.binary.package_name && package_json.binary.package_name.indexOf('{node_napi_label}') === -1;
    };
  })(napi, napi.exports);
  return napi.exports;
}

var preBinding = {exports: {}};

var versioning = {exports: {}};

var re = {exports: {}};

var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  // Note: this is the semver.org version of the spec that it implements
  // Not necessarily the package version of this code.
  const SEMVER_SPEC_VERSION = '2.0.0';
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */9007199254740991;

  // Max safe segment length for coercion.
  const MAX_SAFE_COMPONENT_LENGTH = 16;

  // Max safe length for a build identifier. The max length minus 6 characters for
  // the shortest version with a build 0.0.0+BUILD.
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 0b001,
    FLAG_LOOSE: 0b010
  };
  return constants;
}

var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  const debug = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error('SEMVER', ...args) : () => {};
  debug_1 = debug;
  return debug_1;
}

var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re.exports;
  hasRequiredRe = 1;
  (function (module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports = module.exports = {};

    // The actual regexps go on exports.re
    const re = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const t = exports.t = {};
    let R = 0;
    const LETTERDASHNUMBER = '[a-zA-Z0-9-]';

    // Replace some greedy regex tokens to prevent regex dos issues. These regex are
    // used internally via the safeRe object since all inputs in this library get
    // normalized first to trim and collapse all extra whitespace. The original
    // regexes are exported for userland consumption and lower level usage. A
    // future breaking change could export the safer regex only with a note that
    // all input should have extra whitespace removed.
    const safeRegexReplacements = [['\\s', 1], ['\\d', MAX_LENGTH], [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]];
    const makeSafeRegex = value => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
      safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
    };

    // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.

    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.

    createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
    createToken('NUMERICIDENTIFIERLOOSE', '\\d+');

    // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.

    createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);

    // ## Main Version
    // Three dot-separated numeric identifiers.

    createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
    createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

    // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.

    createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);

    // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.

    createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

    // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.

    createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);

    // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.

    createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

    // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.

    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.

    createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken('FULL', `^${src[t.FULLPLAIN]}$`);

    // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.
    createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
    createToken('GTLT', '((?:<|>)?=?)');

    // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.
    createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
    createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
    createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

    // Coercion.
    // Extract anything that could conceivably be a part of a valid semver
    createToken('COERCE', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
    createToken('COERCERTL', src[t.COERCE], true);

    // Tilde ranges.
    // Meaning is "reasonably at or greater than"
    createToken('LONETILDE', '(?:~>?)');
    createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = '$1~';
    createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

    // Caret ranges.
    // Meaning is "at least and backwards compatible with"
    createToken('LONECARET', '(?:\\^)');
    createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = '$1^';
    createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

    // A simple gt/lt/eq thing, or just "" to indicate "any version"
    createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

    // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`
    createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = '$1$2$3';

    // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.
    createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
    createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);

    // Star ranges basically just allow anything at all.
    createToken('STAR', '(<|>)?=?\\s*\\*');
    // >=0.0.0 is like a star
    createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
    createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
  })(re, re.exports);
  return re.exports;
}

var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  // parse out just the options we care about
  const looseOption = Object.freeze({
    loose: true
  });
  const emptyOpts = Object.freeze({});
  const parseOptions = options => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== 'object') {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}

var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a, b) => {
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}

var semver$1;
var hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$1;
  hasRequiredSemver$1 = 1;
  const debug = requireDebug();
  const {
    MAX_LENGTH,
    MAX_SAFE_INTEGER
  } = requireConstants();
  const {
    safeRe: re,
    t
  } = requireRe();
  const parseOptions = requireParseOptions();
  const {
    compareIdentifiers
  } = requireIdentifiers();
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== 'string') {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
      }
      debug('SemVer', version, options);
      this.options = options;
      this.loose = !!options.loose;
      // this isn't actually relevant for versions, but keep it so that we
      // don't run into trouble passing this.options around.
      this.includePrerelease = !!options.includePrerelease;
      const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;

      // these are actually numbers
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError('Invalid major version');
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError('Invalid minor version');
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError('Invalid patch version');
      }

      // numberify any prerelease numeric ids
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split('.').map(id => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split('.') : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join('.')}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug('SemVer.compare', this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === 'string' && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      // NOT having a prerelease is > having one
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug('prerelease compare', i, a, b);
        if (a === undefined && b === undefined) {
          return 0;
        } else if (b === undefined) {
          return 1;
        } else if (a === undefined) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug('prerelease compare', i, a, b);
        if (a === undefined && b === undefined) {
          return 0;
        } else if (b === undefined) {
          return 1;
        } else if (a === undefined) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }

    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier, identifierBase);
          break;
        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier, identifierBase);
          break;
        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier, identifierBase);
          this.inc('pre', identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier, identifierBase);
          }
          this.inc('pre', identifier, identifierBase);
          break;
        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case 'pre':
          {
            const base = Number(identifierBase) ? 1 : 0;
            if (!identifier && identifierBase === false) {
              throw new Error('invalid increment argument: identifier is empty');
            }
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === 'number') {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                // didn't increment anything
                if (identifier === this.prerelease.join('.') && identifierBase === false) {
                  throw new Error('invalid increment argument: identifier already exists');
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
              // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join('.')}`;
      }
      return this;
    }
  }
  semver$1 = SemVer;
  return semver$1;
}

var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver$1();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse;
  return parse_1;
}

var valid_1;
var hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1;
  hasRequiredValid$1 = 1;
  const parse = requireParse();
  const valid = (version, options) => {
    const v = parse(version, options);
    return v ? v.version : null;
  };
  valid_1 = valid;
  return valid_1;
}

var clean_1;
var hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const parse = requireParse();
  const clean = (version, options) => {
    const s = parse(version.trim().replace(/^[=v]+/, ''), options);
    return s ? s.version : null;
  };
  clean_1 = clean;
  return clean_1;
}

var inc_1;
var hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const SemVer = requireSemver$1();
  const inc = (version, release, options, identifier, identifierBase) => {
    if (typeof options === 'string') {
      identifierBase = identifier;
      identifier = options;
      options = undefined;
    }
    try {
      return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
    } catch (er) {
      return null;
    }
  };
  inc_1 = inc;
  return inc_1;
}

var diff_1;
var hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  const parse = requireParse();
  const diff = (version1, version2) => {
    const v1 = parse(version1, null, true);
    const v2 = parse(version2, null, true);
    const comparison = v1.compare(v2);
    if (comparison === 0) {
      return null;
    }
    const v1Higher = comparison > 0;
    const highVersion = v1Higher ? v1 : v2;
    const lowVersion = v1Higher ? v2 : v1;
    const highHasPre = !!highVersion.prerelease.length;
    const lowHasPre = !!lowVersion.prerelease.length;
    if (lowHasPre && !highHasPre) {
      // Going from prerelease -> no prerelease requires some special casing

      // If the low version has only a major, then it will always be a major
      // Some examples:
      // 1.0.0-1 -> 1.0.0
      // 1.0.0-1 -> 1.1.1
      // 1.0.0-1 -> 2.0.0
      if (!lowVersion.patch && !lowVersion.minor) {
        return 'major';
      }

      // Otherwise it can be determined by checking the high version

      if (highVersion.patch) {
        // anything higher than a patch bump would result in the wrong version
        return 'patch';
      }
      if (highVersion.minor) {
        // anything higher than a minor bump would result in the wrong version
        return 'minor';
      }

      // bumping major/minor/patch all have same result
      return 'major';
    }

    // add the `pre` prefix if we are going to a prerelease version
    const prefix = highHasPre ? 'pre' : '';
    if (v1.major !== v2.major) {
      return prefix + 'major';
    }
    if (v1.minor !== v2.minor) {
      return prefix + 'minor';
    }
    if (v1.patch !== v2.patch) {
      return prefix + 'patch';
    }

    // high and low are preleases
    return 'prerelease';
  };
  diff_1 = diff;
  return diff_1;
}

var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver$1();
  const major = (a, loose) => new SemVer(a, loose).major;
  major_1 = major;
  return major_1;
}

var minor_1;
var hasRequiredMinor;
function requireMinor() {
  if (hasRequiredMinor) return minor_1;
  hasRequiredMinor = 1;
  const SemVer = requireSemver$1();
  const minor = (a, loose) => new SemVer(a, loose).minor;
  minor_1 = minor;
  return minor_1;
}

var patch_1;
var hasRequiredPatch;
function requirePatch() {
  if (hasRequiredPatch) return patch_1;
  hasRequiredPatch = 1;
  const SemVer = requireSemver$1();
  const patch = (a, loose) => new SemVer(a, loose).patch;
  patch_1 = patch;
  return patch_1;
}

var prerelease_1;
var hasRequiredPrerelease;
function requirePrerelease() {
  if (hasRequiredPrerelease) return prerelease_1;
  hasRequiredPrerelease = 1;
  const parse = requireParse();
  const prerelease = (version, options) => {
    const parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  };
  prerelease_1 = prerelease;
  return prerelease_1;
}

var compare_1;
var hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const SemVer = requireSemver$1();
  const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  compare_1 = compare;
  return compare_1;
}

var rcompare_1;
var hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const compare = requireCompare();
  const rcompare = (a, b, loose) => compare(b, a, loose);
  rcompare_1 = rcompare;
  return rcompare_1;
}

var compareLoose_1;
var hasRequiredCompareLoose;
function requireCompareLoose() {
  if (hasRequiredCompareLoose) return compareLoose_1;
  hasRequiredCompareLoose = 1;
  const compare = requireCompare();
  const compareLoose = (a, b) => compare(a, b, true);
  compareLoose_1 = compareLoose;
  return compareLoose_1;
}

var compareBuild_1;
var hasRequiredCompareBuild;
function requireCompareBuild() {
  if (hasRequiredCompareBuild) return compareBuild_1;
  hasRequiredCompareBuild = 1;
  const SemVer = requireSemver$1();
  const compareBuild = (a, b, loose) => {
    const versionA = new SemVer(a, loose);
    const versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  };
  compareBuild_1 = compareBuild;
  return compareBuild_1;
}

var sort_1;
var hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const compareBuild = requireCompareBuild();
  const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
  sort_1 = sort;
  return sort_1;
}

var rsort_1;
var hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const compareBuild = requireCompareBuild();
  const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  rsort_1 = rsort;
  return rsort_1;
}

var gt_1;
var hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const compare = requireCompare();
  const gt = (a, b, loose) => compare(a, b, loose) > 0;
  gt_1 = gt;
  return gt_1;
}

var lt_1;
var hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const compare = requireCompare();
  const lt = (a, b, loose) => compare(a, b, loose) < 0;
  lt_1 = lt;
  return lt_1;
}

var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const compare = requireCompare();
  const eq = (a, b, loose) => compare(a, b, loose) === 0;
  eq_1 = eq;
  return eq_1;
}

var neq_1;
var hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const compare = requireCompare();
  const neq = (a, b, loose) => compare(a, b, loose) !== 0;
  neq_1 = neq;
  return neq_1;
}

var gte_1;
var hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const compare = requireCompare();
  const gte = (a, b, loose) => compare(a, b, loose) >= 0;
  gte_1 = gte;
  return gte_1;
}

var lte_1;
var hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const compare = requireCompare();
  const lte = (a, b, loose) => compare(a, b, loose) <= 0;
  lte_1 = lte;
  return lte_1;
}

var cmp_1;
var hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const eq = requireEq();
  const neq = requireNeq();
  const gt = requireGt();
  const gte = requireGte();
  const lt = requireLt();
  const lte = requireLte();
  const cmp = (a, op, b, loose) => {
    switch (op) {
      case '===':
        if (typeof a === 'object') {
          a = a.version;
        }
        if (typeof b === 'object') {
          b = b.version;
        }
        return a === b;
      case '!==':
        if (typeof a === 'object') {
          a = a.version;
        }
        if (typeof b === 'object') {
          b = b.version;
        }
        return a !== b;
      case '':
      case '=':
      case '==':
        return eq(a, b, loose);
      case '!=':
        return neq(a, b, loose);
      case '>':
        return gt(a, b, loose);
      case '>=':
        return gte(a, b, loose);
      case '<':
        return lt(a, b, loose);
      case '<=':
        return lte(a, b, loose);
      default:
        throw new TypeError(`Invalid operator: ${op}`);
    }
  };
  cmp_1 = cmp;
  return cmp_1;
}

var coerce_1;
var hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const SemVer = requireSemver$1();
  const parse = requireParse();
  const {
    safeRe: re,
    t
  } = requireRe();
  const coerce = (version, options) => {
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version === 'number') {
      version = String(version);
    }
    if (typeof version !== 'string') {
      return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
      match = version.match(re[t.COERCE]);
    } else {
      // Find the right-most coercible string that does not share
      // a terminus with a more left-ward coercible string.
      // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
      //
      // Walk through the string checking with a /g regexp
      // Manually set the index so as to pick up overlapping matches.
      // Stop when we get a match that ends at the string end, since no
      // coercible string can be more right-ward without the same terminus.
      let next;
      while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      }
      // leave it in a clean state
      re[t.COERCERTL].lastIndex = -1;
    }
    if (match === null) {
      return null;
    }
    return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options);
  };
  coerce_1 = coerce;
  return coerce_1;
}

var iterator;
var hasRequiredIterator;
function requireIterator() {
  if (hasRequiredIterator) return iterator;
  hasRequiredIterator = 1;
  iterator = function (Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };
  return iterator;
}

var yallist;
var hasRequiredYallist;
function requireYallist() {
  if (hasRequiredYallist) return yallist;
  hasRequiredYallist = 1;
  yallist = Yallist;
  Yallist.Node = Node;
  Yallist.create = Yallist;
  function Yallist(list) {
    var self = this;
    if (!(self instanceof Yallist)) {
      self = new Yallist();
    }
    self.tail = null;
    self.head = null;
    self.length = 0;
    if (list && typeof list.forEach === 'function') {
      list.forEach(function (item) {
        self.push(item);
      });
    } else if (arguments.length > 0) {
      for (var i = 0, l = arguments.length; i < l; i++) {
        self.push(arguments[i]);
      }
    }
    return self;
  }
  Yallist.prototype.removeNode = function (node) {
    if (node.list !== this) {
      throw new Error('removing node which does not belong to this list');
    }
    var next = node.next;
    var prev = node.prev;
    if (next) {
      next.prev = prev;
    }
    if (prev) {
      prev.next = next;
    }
    if (node === this.head) {
      this.head = next;
    }
    if (node === this.tail) {
      this.tail = prev;
    }
    node.list.length--;
    node.next = null;
    node.prev = null;
    node.list = null;
    return next;
  };
  Yallist.prototype.unshiftNode = function (node) {
    if (node === this.head) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    var head = this.head;
    node.list = this;
    node.next = head;
    if (head) {
      head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  };
  Yallist.prototype.pushNode = function (node) {
    if (node === this.tail) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    var tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) {
      tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.length++;
  };
  Yallist.prototype.push = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      push(this, arguments[i]);
    }
    return this.length;
  };
  Yallist.prototype.unshift = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      unshift(this, arguments[i]);
    }
    return this.length;
  };
  Yallist.prototype.pop = function () {
    if (!this.tail) {
      return undefined;
    }
    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return res;
  };
  Yallist.prototype.shift = function () {
    if (!this.head) {
      return undefined;
    }
    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return res;
  };
  Yallist.prototype.forEach = function (fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.head, i = 0; walker !== null; i++) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.next;
    }
  };
  Yallist.prototype.forEachReverse = function (fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.prev;
    }
  };
  Yallist.prototype.get = function (n) {
    for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
      // abort out of the list early if we hit a cycle
      walker = walker.next;
    }
    if (i === n && walker !== null) {
      return walker.value;
    }
  };
  Yallist.prototype.getReverse = function (n) {
    for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
      // abort out of the list early if we hit a cycle
      walker = walker.prev;
    }
    if (i === n && walker !== null) {
      return walker.value;
    }
  };
  Yallist.prototype.map = function (fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist();
    for (var walker = this.head; walker !== null;) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.next;
    }
    return res;
  };
  Yallist.prototype.mapReverse = function (fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist();
    for (var walker = this.tail; walker !== null;) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.prev;
    }
    return res;
  };
  Yallist.prototype.reduce = function (fn, initial) {
    var acc;
    var walker = this.head;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.head) {
      walker = this.head.next;
      acc = this.head.value;
    } else {
      throw new TypeError('Reduce of empty list with no initial value');
    }
    for (var i = 0; walker !== null; i++) {
      acc = fn(acc, walker.value, i);
      walker = walker.next;
    }
    return acc;
  };
  Yallist.prototype.reduceReverse = function (fn, initial) {
    var acc;
    var walker = this.tail;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.tail) {
      walker = this.tail.prev;
      acc = this.tail.value;
    } else {
      throw new TypeError('Reduce of empty list with no initial value');
    }
    for (var i = this.length - 1; walker !== null; i--) {
      acc = fn(acc, walker.value, i);
      walker = walker.prev;
    }
    return acc;
  };
  Yallist.prototype.toArray = function () {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.head; walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.next;
    }
    return arr;
  };
  Yallist.prototype.toArrayReverse = function () {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.tail; walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.prev;
    }
    return arr;
  };
  Yallist.prototype.slice = function (from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist();
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
      walker = walker.next;
    }
    for (; walker !== null && i < to; i++, walker = walker.next) {
      ret.push(walker.value);
    }
    return ret;
  };
  Yallist.prototype.sliceReverse = function (from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist();
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
      walker = walker.prev;
    }
    for (; walker !== null && i > from; i--, walker = walker.prev) {
      ret.push(walker.value);
    }
    return ret;
  };
  Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
    if (start > this.length) {
      start = this.length - 1;
    }
    if (start < 0) {
      start = this.length + start;
    }
    for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
      walker = walker.next;
    }
    var ret = [];
    for (var i = 0; walker && i < deleteCount; i++) {
      ret.push(walker.value);
      walker = this.removeNode(walker);
    }
    if (walker === null) {
      walker = this.tail;
    }
    if (walker !== this.head && walker !== this.tail) {
      walker = walker.prev;
    }
    for (var i = 0; i < nodes.length; i++) {
      walker = insert(this, walker, nodes[i]);
    }
    return ret;
  };
  Yallist.prototype.reverse = function () {
    var head = this.head;
    var tail = this.tail;
    for (var walker = head; walker !== null; walker = walker.prev) {
      var p = walker.prev;
      walker.prev = walker.next;
      walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this;
  };
  function insert(self, node, value) {
    var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
    if (inserted.next === null) {
      self.tail = inserted;
    }
    if (inserted.prev === null) {
      self.head = inserted;
    }
    self.length++;
    return inserted;
  }
  function push(self, item) {
    self.tail = new Node(item, self.tail, null, self);
    if (!self.head) {
      self.head = self.tail;
    }
    self.length++;
  }
  function unshift(self, item) {
    self.head = new Node(item, null, self.head, self);
    if (!self.tail) {
      self.tail = self.head;
    }
    self.length++;
  }
  function Node(value, prev, next, list) {
    if (!(this instanceof Node)) {
      return new Node(value, prev, next, list);
    }
    this.list = list;
    this.value = value;
    if (prev) {
      prev.next = this;
      this.prev = prev;
    } else {
      this.prev = null;
    }
    if (next) {
      next.prev = this;
      this.next = next;
    } else {
      this.next = null;
    }
  }
  try {
    // add if support for Symbol.iterator is present
    requireIterator()(Yallist);
  } catch (er) {}
  return yallist;
}

var lruCache;
var hasRequiredLruCache;
function requireLruCache() {
  if (hasRequiredLruCache) return lruCache;
  hasRequiredLruCache = 1;

  // A linked list to keep track of recently-used-ness
  const Yallist = requireYallist();
  const MAX = Symbol('max');
  const LENGTH = Symbol('length');
  const LENGTH_CALCULATOR = Symbol('lengthCalculator');
  const ALLOW_STALE = Symbol('allowStale');
  const MAX_AGE = Symbol('maxAge');
  const DISPOSE = Symbol('dispose');
  const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
  const LRU_LIST = Symbol('lruList');
  const CACHE = Symbol('cache');
  const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');
  const naiveLength = () => 1;

  // lruList is a yallist where the head is the youngest
  // item, and the tail is the oldest.  the list contains the Hit
  // objects as the entries.
  // Each Hit object has a reference to its Yallist.Node.  This
  // never changes.
  //
  // cache is a Map (or PseudoMap) that matches the keys to
  // the Yallist.Node object.
  class LRUCache {
    constructor(options) {
      if (typeof options === 'number') options = {
        max: options
      };
      if (!options) options = {};
      if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number');
      // Kind of weird to have a default max of Infinity, but oh well.
      this[MAX] = options.max || Infinity;
      const lc = options.length || naiveLength;
      this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
      this[ALLOW_STALE] = options.stale || false;
      if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
      this[MAX_AGE] = options.maxAge || 0;
      this[DISPOSE] = options.dispose;
      this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
      this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
      this.reset();
    }

    // resize the cache when the max changes.
    set max(mL) {
      if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
      this[MAX] = mL || Infinity;
      trim(this);
    }
    get max() {
      return this[MAX];
    }
    set allowStale(allowStale) {
      this[ALLOW_STALE] = !!allowStale;
    }
    get allowStale() {
      return this[ALLOW_STALE];
    }
    set maxAge(mA) {
      if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
      this[MAX_AGE] = mA;
      trim(this);
    }
    get maxAge() {
      return this[MAX_AGE];
    }

    // resize the cache when the lengthCalculator changes.
    set lengthCalculator(lC) {
      if (typeof lC !== 'function') lC = naiveLength;
      if (lC !== this[LENGTH_CALCULATOR]) {
        this[LENGTH_CALCULATOR] = lC;
        this[LENGTH] = 0;
        this[LRU_LIST].forEach(hit => {
          hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
          this[LENGTH] += hit.length;
        });
      }
      trim(this);
    }
    get lengthCalculator() {
      return this[LENGTH_CALCULATOR];
    }
    get length() {
      return this[LENGTH];
    }
    get itemCount() {
      return this[LRU_LIST].length;
    }
    rforEach(fn, thisp) {
      thisp = thisp || this;
      for (let walker = this[LRU_LIST].tail; walker !== null;) {
        const prev = walker.prev;
        forEachStep(this, fn, walker, thisp);
        walker = prev;
      }
    }
    forEach(fn, thisp) {
      thisp = thisp || this;
      for (let walker = this[LRU_LIST].head; walker !== null;) {
        const next = walker.next;
        forEachStep(this, fn, walker, thisp);
        walker = next;
      }
    }
    keys() {
      return this[LRU_LIST].toArray().map(k => k.key);
    }
    values() {
      return this[LRU_LIST].toArray().map(k => k.value);
    }
    reset() {
      if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
        this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
      }
      this[CACHE] = new Map(); // hash of items by key
      this[LRU_LIST] = new Yallist(); // list of items in order of use recency
      this[LENGTH] = 0; // length of items in the list
    }
    dump() {
      return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h);
    }
    dumpLru() {
      return this[LRU_LIST];
    }
    set(key, value, maxAge) {
      maxAge = maxAge || this[MAX_AGE];
      if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
      const now = maxAge ? Date.now() : 0;
      const len = this[LENGTH_CALCULATOR](value, key);
      if (this[CACHE].has(key)) {
        if (len > this[MAX]) {
          del(this, this[CACHE].get(key));
          return false;
        }
        const node = this[CACHE].get(key);
        const item = node.value;

        // dispose of the old one before overwriting
        // split out into 2 ifs for better coverage tracking
        if (this[DISPOSE]) {
          if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
        }
        item.now = now;
        item.maxAge = maxAge;
        item.value = value;
        this[LENGTH] += len - item.length;
        item.length = len;
        this.get(key);
        trim(this);
        return true;
      }
      const hit = new Entry(key, value, len, now, maxAge);

      // oversized objects fall out of cache automatically.
      if (hit.length > this[MAX]) {
        if (this[DISPOSE]) this[DISPOSE](key, value);
        return false;
      }
      this[LENGTH] += hit.length;
      this[LRU_LIST].unshift(hit);
      this[CACHE].set(key, this[LRU_LIST].head);
      trim(this);
      return true;
    }
    has(key) {
      if (!this[CACHE].has(key)) return false;
      const hit = this[CACHE].get(key).value;
      return !isStale(this, hit);
    }
    get(key) {
      return get(this, key, true);
    }
    peek(key) {
      return get(this, key, false);
    }
    pop() {
      const node = this[LRU_LIST].tail;
      if (!node) return null;
      del(this, node);
      return node.value;
    }
    del(key) {
      del(this, this[CACHE].get(key));
    }
    load(arr) {
      // reset the cache
      this.reset();
      const now = Date.now();
      // A previous serialized cache has the most recent items first
      for (let l = arr.length - 1; l >= 0; l--) {
        const hit = arr[l];
        const expiresAt = hit.e || 0;
        if (expiresAt === 0)
          // the item was created without expiration in a non aged cache
          this.set(hit.k, hit.v);else {
          const maxAge = expiresAt - now;
          // dont add already expired items
          if (maxAge > 0) {
            this.set(hit.k, hit.v, maxAge);
          }
        }
      }
    }
    prune() {
      this[CACHE].forEach((value, key) => get(this, key, false));
    }
  }
  const get = (self, key, doUse) => {
    const node = self[CACHE].get(key);
    if (node) {
      const hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE]) return undefined;
      } else {
        if (doUse) {
          if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
          self[LRU_LIST].unshiftNode(node);
        }
      }
      return hit.value;
    }
  };
  const isStale = (self, hit) => {
    if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
    const diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
  };
  const trim = self => {
    if (self[LENGTH] > self[MAX]) {
      for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
        // We know that we're about to delete this one, and also
        // what the next least recently used key will be, so just
        // go ahead and set it now.
        const prev = walker.prev;
        del(self, walker);
        walker = prev;
      }
    }
  };
  const del = (self, node) => {
    if (node) {
      const hit = node.value;
      if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
      self[LENGTH] -= hit.length;
      self[CACHE].delete(hit.key);
      self[LRU_LIST].removeNode(node);
    }
  };
  class Entry {
    constructor(key, value, length, now, maxAge) {
      this.key = key;
      this.value = value;
      this.length = length;
      this.now = now;
      this.maxAge = maxAge || 0;
    }
  }
  const forEachStep = (self, fn, node, thisp) => {
    let hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) hit = undefined;
    }
    if (hit) fn.call(thisp, hit.value, hit.key, self);
  };
  lruCache = LRUCache;
  return lruCache;
}

var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  // hoisted class for cyclic dependency
  class Range {
    constructor(range, options) {
      options = parseOptions(options);
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        // just put it in the set and return
        this.raw = range.value;
        this.set = [[range]];
        this.format();
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;

      // First reduce all whitespace as much as possible so we do not have to rely
      // on potentially slow regexes like \s*. This is then stored and used for
      // future error messages as well.
      this.raw = range.trim().split(/\s+/).join(' ');

      // First, split on ||
      this.set = this.raw.split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }

      // if we have any that are not the null set, throw out null sets.
      if (this.set.length > 1) {
        // keep the first one, in case they're all null sets
        const first = this.set[0];
        this.set = this.set.filter(c => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          // if we have any that are *, then the range is just *
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.format();
    }
    format() {
      this.range = this.set.map(comps => comps.join(' ').trim()).join('||').trim();
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range) {
      // memoize range parsing for performance.
      // this is a very hot path, and fully deterministic.
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ':' + range;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
      const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug('hyphen replace', range);

      // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range);

      // `~ 1.2.3` => `~1.2.3`
      range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
      debug('tilde trim', range);

      // `^ 1.2.3` => `^1.2.3`
      range = range.replace(re[t.CARETTRIM], caretTrimReplace);
      debug('caret trim', range);

      // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      let rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options));
      if (loose) {
        // in loose mode, throw out any that are not valid comparators
        rangeList = rangeList.filter(comp => {
          debug('loose invalid filter', comp, this.options);
          return !!comp.match(re[t.COMPARATORLOOSE]);
        });
      }
      debug('range list', rangeList);

      // if any comparators are the null set, then replace with JUST null set
      // if more than one comparator, remove any * comparators
      // also, don't include the same comparator more than once
      const rangeMap = new Map();
      const comparators = rangeList.map(comp => new Comparator(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has('')) {
        rangeMap.delete('');
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required');
      }
      return this.set.some(thisComparators => {
        return isSatisfiable(thisComparators, options) && range.set.some(rangeComparators => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every(thisComparator => {
            return rangeComparators.every(rangeComparator => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }

    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range;
  const LRU = requireLruCache();
  const cache = new LRU({
    max: 1000
  });
  const parseOptions = requireParseOptions();
  const Comparator = requireComparator();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const {
    safeRe: re,
    t,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = requireRe();
  const {
    FLAG_INCLUDE_PRERELEASE,
    FLAG_LOOSE
  } = requireConstants();
  const isNullSet = c => c.value === '<0.0.0-0';
  const isAny = c => c.value === '';

  // take a set of comparators and determine whether there
  // exists a version which can satisfy it
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every(otherComparator => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };

  // comprised of xranges, tildes, stars, and gtlt's at this point.
  // already replaced the hyphen ranges
  // turn into a set of JUST comparators.
  const parseComparator = (comp, options) => {
    debug('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug('caret', comp);
    comp = replaceTildes(comp, options);
    debug('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug('xrange', comp);
    comp = replaceStars(comp, options);
    debug('stars', comp);
    return comp;
  };
  const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

  // ~, ~> --> * (any, kinda silly)
  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
  // ~0.0.1 --> >=0.0.1 <0.1.0-0
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map(c => replaceTilde(c, options)).join(' ');
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug('tilde', comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        // ~1.2 == >=1.2.0 <1.3.0-0
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug('replaceTilde pr', pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        // ~1.2.3 == >=1.2.3 <1.3.0-0
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug('tilde return', ret);
      return ret;
    });
  };

  // ^ --> * (any, kinda silly)
  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
  // ^1.2.3 --> >=1.2.3 <2.0.0-0
  // ^1.2.0 --> >=1.2.0 <2.0.0-0
  // ^0.0.1 --> >=0.0.1 <0.0.2-0
  // ^0.1.0 --> >=0.1.0 <0.2.0-0
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map(c => replaceCaret(c, options)).join(' ');
  };
  const replaceCaret = (comp, options) => {
    debug('caret', comp, options);
    const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    const z = options.includePrerelease ? '-0' : '';
    return comp.replace(r, (_, M, m, p, pr) => {
      debug('caret', comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === '0') {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug('replaceCaret pr', pr);
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug('no pr');
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug('caret return', ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug('replaceXRanges', comp, options);
    return comp.split(/\s+/).map(c => replaceXRange(c, options)).join(' ');
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug('xRange', comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === '=' && anyX) {
        gtlt = '';
      }

      // if we're including prereleases in the match, then we need
      // to fix this to -0, the lowest possible prerelease value
      pr = options.includePrerelease ? '-0' : '';
      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          // nothing is allowed
          ret = '<0.0.0-0';
        } else {
          // nothing is forbidden
          ret = '*';
        }
      } else if (gtlt && anyX) {
        // we know patch is an x, because we have any x at all.
        // replace X with 0
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === '>') {
          // >1 => >=2.0.0
          // >1.2 => >=1.3.0
          gtlt = '>=';
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          // <=0.7.x is actually <0.8.0, since any 0.7.x should
          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
          gtlt = '<';
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === '<') {
          pr = '-0';
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug('xRange return', ret);
      return ret;
    });
  };

  // Because * is AND-ed with everything else in the comparator,
  // and '' means "any version", just remove the *s entirely.
  const replaceStars = (comp, options) => {
    debug('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], '');
  };
  const replaceGTE0 = (comp, options) => {
    debug('replaceGTE0', comp, options);
    return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
  };

  // This function is passed to string.replace(re[t.HYPHENRANGE])
  // M, m, patch, prerelease, build
  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
  // 1.2 - 3.4 => >=1.2.0 <3.5.0-0
  const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = '';
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? '-0' : ''}`;
    }
    if (isX(tM)) {
      to = '';
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      // Find the set of versions that are allowed to have prereleases
      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
      // That should allow `1.2.3-pr.2` to pass.
      // However, `1.2.4-alpha.notready` should NOT be allowed,
      // even though it's within the range set by the comparators.
      for (let i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === Comparator.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }

      // Version has a -pre, but it's not one of the ones we like.
      return false;
    }
    return true;
  };
  return range;
}

var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY = Symbol('SemVer ANY');
  // hoisted class for cyclic dependency
  class Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      options = parseOptions(options);
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(' ');
      debug('comparator', comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = '';
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug('comp', this);
    }
    parse(comp) {
      const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== undefined ? m[1] : '';
      if (this.operator === '=') {
        this.operator = '';
      }

      // if it literally is just '>' or '' then allow anything.
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug('Comparator.test', version, this.options.loose);
      if (this.semver === ANY || version === ANY) {
        return true;
      }
      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required');
      }
      if (this.operator === '') {
        if (this.value === '') {
          return true;
        }
        return new Range(comp.value, options).test(this.value);
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true;
        }
        return new Range(this.value, options).test(comp.semver);
      }
      options = parseOptions(options);

      // Special cases where nothing can possibly be lower
      if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
        return false;
      }

      // Same direction increasing (> or >=)
      if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
        return true;
      }
      // Same direction decreasing (< or <=)
      if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
        return true;
      }
      // same SemVer and both sides are inclusive (<= or >=)
      if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
        return true;
      }
      // opposite directions less than
      if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
        return true;
      }
      // opposite directions greater than
      if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator;
  const parseOptions = requireParseOptions();
  const {
    safeRe: re,
    t
  } = requireRe();
  const cmp = requireCmp();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const Range = requireRange();
  return comparator;
}

var satisfies_1;
var hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const Range = requireRange();
  const satisfies = (version, range, options) => {
    try {
      range = new Range(range, options);
    } catch (er) {
      return false;
    }
    return range.test(version);
  };
  satisfies_1 = satisfies;
  return satisfies_1;
}

var toComparators_1;
var hasRequiredToComparators;
function requireToComparators() {
  if (hasRequiredToComparators) return toComparators_1;
  hasRequiredToComparators = 1;
  const Range = requireRange();

  // Mostly just for testing and legacy API reasons
  const toComparators = (range, options) => new Range(range, options).set.map(comp => comp.map(c => c.value).join(' ').trim().split(' '));
  toComparators_1 = toComparators;
  return toComparators_1;
}

var maxSatisfying_1;
var hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const maxSatisfying = (versions, range, options) => {
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(v => {
      if (rangeObj.test(v)) {
        // satisfies(v, range, options)
        if (!max || maxSV.compare(v) === -1) {
          // compare(max, v, true)
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  };
  maxSatisfying_1 = maxSatisfying;
  return maxSatisfying_1;
}

var minSatisfying_1;
var hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const minSatisfying = (versions, range, options) => {
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(v => {
      if (rangeObj.test(v)) {
        // satisfies(v, range, options)
        if (!min || minSV.compare(v) === 1) {
          // compare(min, v, true)
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  };
  minSatisfying_1 = minSatisfying;
  return minSatisfying_1;
}

var minVersion_1;
var hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const gt = requireGt();
  const minVersion = (range, loose) => {
    range = new Range(range, loose);
    let minver = new SemVer('0.0.0');
    if (range.test(minver)) {
      return minver;
    }
    minver = new SemVer('0.0.0-0');
    if (range.test(minver)) {
      return minver;
    }
    minver = null;
    for (let i = 0; i < range.set.length; ++i) {
      const comparators = range.set[i];
      let setMin = null;
      comparators.forEach(comparator => {
        // Clone to avoid manipulating the comparator's semver object.
        const compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case '>':
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          /* fallthrough */
          case '':
          case '>=':
            if (!setMin || gt(compver, setMin)) {
              setMin = compver;
            }
            break;
          case '<':
          case '<=':
            /* Ignore maximum versions */
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${comparator.operator}`);
        }
      });
      if (setMin && (!minver || gt(minver, setMin))) {
        minver = setMin;
      }
    }
    if (minver && range.test(minver)) {
      return minver;
    }
    return null;
  };
  minVersion_1 = minVersion;
  return minVersion_1;
}

var valid;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid;
  hasRequiredValid = 1;
  const Range = requireRange();
  const validRange = (range, options) => {
    try {
      // Return '*' instead of '' so that truthiness works.
      // This will throw if it's invalid anyway
      return new Range(range, options).range || '*';
    } catch (er) {
      return null;
    }
  };
  valid = validRange;
  return valid;
}

var outside_1;
var hasRequiredOutside;
function requireOutside() {
  if (hasRequiredOutside) return outside_1;
  hasRequiredOutside = 1;
  const SemVer = requireSemver$1();
  const Comparator = requireComparator();
  const {
    ANY
  } = Comparator;
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const gt = requireGt();
  const lt = requireLt();
  const lte = requireLte();
  const gte = requireGte();
  const outside = (version, range, hilo, options) => {
    version = new SemVer(version, options);
    range = new Range(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case '>':
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = '>';
        ecomp = '>=';
        break;
      case '<':
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = '<';
        ecomp = '<=';
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }

    // If it satisfies the range it is not outside
    if (satisfies(version, range, options)) {
      return false;
    }

    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.

    for (let i = 0; i < range.set.length; ++i) {
      const comparators = range.set[i];
      let high = null;
      let low = null;
      comparators.forEach(comparator => {
        if (comparator.semver === ANY) {
          comparator = new Comparator('>=0.0.0');
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });

      // If the edge version comparator has a operator then our version
      // isn't outside it
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }

      // If the lowest version comparator has an operator and our version
      // is less than it then it isn't higher than the range
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  };
  outside_1 = outside;
  return outside_1;
}

var gtr_1;
var hasRequiredGtr;
function requireGtr() {
  if (hasRequiredGtr) return gtr_1;
  hasRequiredGtr = 1;
  // Determine if version is greater than all the versions possible in the range.
  const outside = requireOutside();
  const gtr = (version, range, options) => outside(version, range, '>', options);
  gtr_1 = gtr;
  return gtr_1;
}

var ltr_1;
var hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const outside = requireOutside();
  // Determine if version is less than all the versions possible in the range
  const ltr = (version, range, options) => outside(version, range, '<', options);
  ltr_1 = ltr;
  return ltr_1;
}

var intersects_1;
var hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const Range = requireRange();
  const intersects = (r1, r2, options) => {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2, options);
  };
  intersects_1 = intersects;
  return intersects_1;
}

var simplify;
var hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  // given a set of versions and a range, create a "simplified" range
  // that includes the same versions that the original range does
  // If the original range is shorter than the simplified one, return that.
  const satisfies = requireSatisfies();
  const compare = requireCompare();
  simplify = (versions, range, options) => {
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b) => compare(a, b, options));
    for (const version of v) {
      const included = satisfies(version, range, options);
      if (included) {
        prev = version;
        if (!first) {
          first = version;
        }
      } else {
        if (prev) {
          set.push([first, prev]);
        }
        prev = null;
        first = null;
      }
    }
    if (first) {
      set.push([first, null]);
    }
    const ranges = [];
    for (const [min, max] of set) {
      if (min === max) {
        ranges.push(min);
      } else if (!max && min === v[0]) {
        ranges.push('*');
      } else if (!max) {
        ranges.push(`>=${min}`);
      } else if (min === v[0]) {
        ranges.push(`<=${max}`);
      } else {
        ranges.push(`${min} - ${max}`);
      }
    }
    const simplified = ranges.join(' || ');
    const original = typeof range.raw === 'string' ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
  };
  return simplify;
}

var subset_1;
var hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const Range = requireRange();
  const Comparator = requireComparator();
  const {
    ANY
  } = Comparator;
  const satisfies = requireSatisfies();
  const compare = requireCompare();

  // Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
  // - Every simple range `r1, r2, ...` is a null set, OR
  // - Every simple range `r1, r2, ...` which is not a null set is a subset of
  //   some `R1, R2, ...`
  //
  // Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
  // - If c is only the ANY comparator
  //   - If C is only the ANY comparator, return true
  //   - Else if in prerelease mode, return false
  //   - else replace c with `[>=0.0.0]`
  // - If C is only the ANY comparator
  //   - if in prerelease mode, return true
  //   - else replace C with `[>=0.0.0]`
  // - Let EQ be the set of = comparators in c
  // - If EQ is more than one, return true (null set)
  // - Let GT be the highest > or >= comparator in c
  // - Let LT be the lowest < or <= comparator in c
  // - If GT and LT, and GT.semver > LT.semver, return true (null set)
  // - If any C is a = range, and GT or LT are set, return false
  // - If EQ
  //   - If GT, and EQ does not satisfy GT, return true (null set)
  //   - If LT, and EQ does not satisfy LT, return true (null set)
  //   - If EQ satisfies every C, return true
  //   - Else return false
  // - If GT
  //   - If GT.semver is lower than any > or >= comp in C, return false
  //   - If GT is >=, and GT.semver does not satisfy every C, return false
  //   - If GT.semver has a prerelease, and not in prerelease mode
  //     - If no C has a prerelease and the GT.semver tuple, return false
  // - If LT
  //   - If LT.semver is greater than any < or <= comp in C, return false
  //   - If LT is <=, and LT.semver does not satisfy every C, return false
  //   - If GT.semver has a prerelease, and not in prerelease mode
  //     - If no C has a prerelease and the LT.semver tuple, return false
  // - Else return true

  const subset = (sub, dom, options = {}) => {
    if (sub === dom) {
      return true;
    }
    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      // the null set is a subset of everything, but null simple ranges in
      // a complex range should be ignored.  so if we saw a non-null range,
      // then we know this isn't a subset, but if EVERY simple range was null,
      // then it is a subset.
      if (sawNonNull) {
        return false;
      }
    }
    return true;
  };
  const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')];
  const minimumVersion = [new Comparator('>=0.0.0')];
  const simpleSubset = (sub, dom, options) => {
    if (sub === dom) {
      return true;
    }
    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY) {
        return true;
      } else if (options.includePrerelease) {
        sub = minimumVersionWithPreRelease;
      } else {
        sub = minimumVersion;
      }
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options.includePrerelease) {
        return true;
      } else {
        dom = minimumVersion;
      }
    }
    const eqSet = new Set();
    let gt, lt;
    for (const c of sub) {
      if (c.operator === '>' || c.operator === '>=') {
        gt = higherGT(gt, c, options);
      } else if (c.operator === '<' || c.operator === '<=') {
        lt = lowerLT(lt, c, options);
      } else {
        eqSet.add(c.semver);
      }
    }
    if (eqSet.size > 1) {
      return null;
    }
    let gtltComp;
    if (gt && lt) {
      gtltComp = compare(gt.semver, lt.semver, options);
      if (gtltComp > 0) {
        return null;
      } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
        return null;
      }
    }

    // will iterate one or zero times
    for (const eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options)) {
        return null;
      }
      if (lt && !satisfies(eq, String(lt), options)) {
        return null;
      }
      for (const c of dom) {
        if (!satisfies(eq, String(c), options)) {
          return false;
        }
      }
      return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    // if the subset has a prerelease, we need a comparator in the superset
    // with the same tuple and a prerelease, or it's not a subset
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    // exception: <1.2.3-0 is the same as <1.2.3
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
      needDomLTPre = false;
    }
    for (const c of dom) {
      hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
      hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
      if (gt) {
        if (needDomGTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
            needDomGTPre = false;
          }
        }
        if (c.operator === '>' || c.operator === '>=') {
          higher = higherGT(gt, c, options);
          if (higher === c && higher !== gt) {
            return false;
          }
        } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
          return false;
        }
      }
      if (lt) {
        if (needDomLTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
            needDomLTPre = false;
          }
        }
        if (c.operator === '<' || c.operator === '<=') {
          lower = lowerLT(lt, c, options);
          if (lower === c && lower !== lt) {
            return false;
          }
        } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
          return false;
        }
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0) {
        return false;
      }
    }

    // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
    if (gt && hasDomLT && !lt && gtltComp !== 0) {
      return false;
    }
    if (lt && hasDomGT && !gt && gtltComp !== 0) {
      return false;
    }

    // we needed a prerelease range in a specific tuple, but didn't get one
    // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
    // because it includes prereleases in the 1.2.3 tuple
    if (needDomGTPre || needDomLTPre) {
      return false;
    }
    return true;
  };

  // >=1.2.3 is lower than >1.2.3
  const higherGT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
  };

  // <=1.2.3 is higher than <1.2.3
  const lowerLT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
  };
  subset_1 = subset;
  return subset_1;
}

var semver;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  // just pre-load all the stuff that index.js lazily exports
  const internalRe = requireRe();
  const constants = requireConstants();
  const SemVer = requireSemver$1();
  const identifiers = requireIdentifiers();
  const parse = requireParse();
  const valid = requireValid$1();
  const clean = requireClean();
  const inc = requireInc();
  const diff = requireDiff();
  const major = requireMajor();
  const minor = requireMinor();
  const patch = requirePatch();
  const prerelease = requirePrerelease();
  const compare = requireCompare();
  const rcompare = requireRcompare();
  const compareLoose = requireCompareLoose();
  const compareBuild = requireCompareBuild();
  const sort = requireSort();
  const rsort = requireRsort();
  const gt = requireGt();
  const lt = requireLt();
  const eq = requireEq();
  const neq = requireNeq();
  const gte = requireGte();
  const lte = requireLte();
  const cmp = requireCmp();
  const coerce = requireCoerce();
  const Comparator = requireComparator();
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const toComparators = requireToComparators();
  const maxSatisfying = requireMaxSatisfying();
  const minSatisfying = requireMinSatisfying();
  const minVersion = requireMinVersion();
  const validRange = requireValid();
  const outside = requireOutside();
  const gtr = requireGtr();
  const ltr = requireLtr();
  const intersects = requireIntersects();
  const simplifyRange = requireSimplify();
  const subset = requireSubset();
  semver = {
    parse,
    valid,
    clean,
    inc,
    diff,
    major,
    minor,
    patch,
    prerelease,
    compare,
    rcompare,
    compareLoose,
    compareBuild,
    sort,
    rsort,
    gt,
    lt,
    eq,
    neq,
    gte,
    lte,
    cmp,
    coerce,
    Comparator,
    Range,
    satisfies,
    toComparators,
    maxSatisfying,
    minSatisfying,
    minVersion,
    validRange,
    outside,
    gtr,
    ltr,
    intersects,
    simplifyRange,
    subset,
    SemVer,
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: constants.RELEASE_TYPES,
    compareIdentifiers: identifiers.compareIdentifiers,
    rcompareIdentifiers: identifiers.rcompareIdentifiers
  };
  return semver;
}

var process_1;
var hasRequiredProcess;
function requireProcess() {
  if (hasRequiredProcess) return process_1;
  hasRequiredProcess = 1;
  const isLinux = () => process.platform === 'linux';
  let report = null;
  const getReport = () => {
    if (!report) {
      /* istanbul ignore next */
      report = isLinux() && process.report ? process.report.getReport() : {};
    }
    return report;
  };
  process_1 = {
    isLinux,
    getReport
  };
  return process_1;
}

var filesystem;
var hasRequiredFilesystem;
function requireFilesystem() {
  if (hasRequiredFilesystem) return filesystem;
  hasRequiredFilesystem = 1;
  const fs = require$$0$1;

  /**
   * The path where we can find the ldd
   */
  const LDD_PATH = '/usr/bin/ldd';

  /**
   * Read the content of a file synchronous
   *
   * @param {string} path
   * @returns {string}
   */
  const readFileSync = path => fs.readFileSync(path, 'utf-8');

  /**
   * Read the content of a file
   *
   * @param {string} path
   * @returns {Promise<string>}
   */
  const readFile = path => new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  filesystem = {
    LDD_PATH,
    readFileSync,
    readFile
  };
  return filesystem;
}

var detectLibc;
var hasRequiredDetectLibc;
function requireDetectLibc() {
  if (hasRequiredDetectLibc) return detectLibc;
  hasRequiredDetectLibc = 1;
  const childProcess = require$$0$3;
  const {
    isLinux,
    getReport
  } = requireProcess();
  const {
    LDD_PATH,
    readFile,
    readFileSync
  } = requireFilesystem();
  let cachedFamilyFilesystem;
  let cachedVersionFilesystem;
  const command = 'getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true';
  let commandOut = '';
  const safeCommand = () => {
    if (!commandOut) {
      return new Promise(resolve => {
        childProcess.exec(command, (err, out) => {
          commandOut = err ? ' ' : out;
          resolve(commandOut);
        });
      });
    }
    return commandOut;
  };
  const safeCommandSync = () => {
    if (!commandOut) {
      try {
        commandOut = childProcess.execSync(command, {
          encoding: 'utf8'
        });
      } catch (_err) {
        commandOut = ' ';
      }
    }
    return commandOut;
  };

  /**
   * A String constant containing the value `glibc`.
   * @type {string}
   * @public
   */
  const GLIBC = 'glibc';

  /**
   * A Regexp constant to get the GLIBC Version.
   * @type {string}
   */
  const RE_GLIBC_VERSION = /GLIBC\s(\d+\.\d+)/;

  /**
   * A String constant containing the value `musl`.
   * @type {string}
   * @public
   */
  const MUSL = 'musl';

  /**
   * This string is used to find if the {@link LDD_PATH} is GLIBC
   * @type {string}
   */
  const GLIBC_ON_LDD = GLIBC.toUpperCase();

  /**
   * This string is used to find if the {@link LDD_PATH} is musl
   * @type {string}
   */
  const MUSL_ON_LDD = MUSL.toLowerCase();
  const isFileMusl = f => f.includes('libc.musl-') || f.includes('ld-musl-');
  const familyFromReport = () => {
    const report = getReport();
    if (report.header && report.header.glibcVersionRuntime) {
      return GLIBC;
    }
    if (Array.isArray(report.sharedObjects)) {
      if (report.sharedObjects.some(isFileMusl)) {
        return MUSL;
      }
    }
    return null;
  };
  const familyFromCommand = out => {
    const [getconf, ldd1] = out.split(/[\r\n]+/);
    if (getconf && getconf.includes(GLIBC)) {
      return GLIBC;
    }
    if (ldd1 && ldd1.includes(MUSL)) {
      return MUSL;
    }
    return null;
  };
  const getFamilyFromLddContent = content => {
    if (content.includes(MUSL_ON_LDD)) {
      return MUSL;
    }
    if (content.includes(GLIBC_ON_LDD)) {
      return GLIBC;
    }
    return null;
  };
  const familyFromFilesystem = async () => {
    if (cachedFamilyFilesystem !== undefined) {
      return cachedFamilyFilesystem;
    }
    cachedFamilyFilesystem = null;
    try {
      const lddContent = await readFile(LDD_PATH);
      cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
    } catch (e) {}
    return cachedFamilyFilesystem;
  };
  const familyFromFilesystemSync = () => {
    if (cachedFamilyFilesystem !== undefined) {
      return cachedFamilyFilesystem;
    }
    cachedFamilyFilesystem = null;
    try {
      const lddContent = readFileSync(LDD_PATH);
      cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
    } catch (e) {}
    return cachedFamilyFilesystem;
  };

  /**
   * Resolves with the libc family when it can be determined, `null` otherwise.
   * @returns {Promise<?string>}
   */
  const family = async () => {
    let family = null;
    if (isLinux()) {
      family = await familyFromFilesystem();
      if (!family) {
        family = familyFromReport();
      }
      if (!family) {
        const out = await safeCommand();
        family = familyFromCommand(out);
      }
    }
    return family;
  };

  /**
   * Returns the libc family when it can be determined, `null` otherwise.
   * @returns {?string}
   */
  const familySync = () => {
    let family = null;
    if (isLinux()) {
      family = familyFromFilesystemSync();
      if (!family) {
        family = familyFromReport();
      }
      if (!family) {
        const out = safeCommandSync();
        family = familyFromCommand(out);
      }
    }
    return family;
  };

  /**
   * Resolves `true` only when the platform is Linux and the libc family is not `glibc`.
   * @returns {Promise<boolean>}
   */
  const isNonGlibcLinux = async () => isLinux() && (await family()) !== GLIBC;

  /**
   * Returns `true` only when the platform is Linux and the libc family is not `glibc`.
   * @returns {boolean}
   */
  const isNonGlibcLinuxSync = () => isLinux() && familySync() !== GLIBC;
  const versionFromFilesystem = async () => {
    if (cachedVersionFilesystem !== undefined) {
      return cachedVersionFilesystem;
    }
    cachedVersionFilesystem = null;
    try {
      const lddContent = await readFile(LDD_PATH);
      const versionMatch = lddContent.match(RE_GLIBC_VERSION);
      if (versionMatch) {
        cachedVersionFilesystem = versionMatch[1];
      }
    } catch (e) {}
    return cachedVersionFilesystem;
  };
  const versionFromFilesystemSync = () => {
    if (cachedVersionFilesystem !== undefined) {
      return cachedVersionFilesystem;
    }
    cachedVersionFilesystem = null;
    try {
      const lddContent = readFileSync(LDD_PATH);
      const versionMatch = lddContent.match(RE_GLIBC_VERSION);
      if (versionMatch) {
        cachedVersionFilesystem = versionMatch[1];
      }
    } catch (e) {}
    return cachedVersionFilesystem;
  };
  const versionFromReport = () => {
    const report = getReport();
    if (report.header && report.header.glibcVersionRuntime) {
      return report.header.glibcVersionRuntime;
    }
    return null;
  };
  const versionSuffix = s => s.trim().split(/\s+/)[1];
  const versionFromCommand = out => {
    const [getconf, ldd1, ldd2] = out.split(/[\r\n]+/);
    if (getconf && getconf.includes(GLIBC)) {
      return versionSuffix(getconf);
    }
    if (ldd1 && ldd2 && ldd1.includes(MUSL)) {
      return versionSuffix(ldd2);
    }
    return null;
  };

  /**
   * Resolves with the libc version when it can be determined, `null` otherwise.
   * @returns {Promise<?string>}
   */
  const version = async () => {
    let version = null;
    if (isLinux()) {
      version = await versionFromFilesystem();
      if (!version) {
        version = versionFromReport();
      }
      if (!version) {
        const out = await safeCommand();
        version = versionFromCommand(out);
      }
    }
    return version;
  };

  /**
   * Returns the libc version when it can be determined, `null` otherwise.
   * @returns {?string}
   */
  const versionSync = () => {
    let version = null;
    if (isLinux()) {
      version = versionFromFilesystemSync();
      if (!version) {
        version = versionFromReport();
      }
      if (!version) {
        const out = safeCommandSync();
        version = versionFromCommand(out);
      }
    }
    return version;
  };
  detectLibc = {
    GLIBC,
    MUSL,
    family,
    familySync,
    isNonGlibcLinux,
    isNonGlibcLinuxSync,
    version,
    versionSync
  };
  return detectLibc;
}

var require$$5 = {
	"0.1.14": {
	node_abi: null,
	v8: "1.3"
},
	"0.1.15": {
	node_abi: null,
	v8: "1.3"
},
	"0.1.16": {
	node_abi: null,
	v8: "1.3"
},
	"0.1.17": {
	node_abi: null,
	v8: "1.3"
},
	"0.1.18": {
	node_abi: null,
	v8: "1.3"
},
	"0.1.19": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.20": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.21": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.22": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.23": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.24": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.25": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.26": {
	node_abi: null,
	v8: "2.0"
},
	"0.1.27": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.28": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.29": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.30": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.31": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.32": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.33": {
	node_abi: null,
	v8: "2.1"
},
	"0.1.90": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.91": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.92": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.93": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.94": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.95": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.96": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.97": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.98": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.99": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.100": {
	node_abi: null,
	v8: "2.2"
},
	"0.1.101": {
	node_abi: null,
	v8: "2.3"
},
	"0.1.102": {
	node_abi: null,
	v8: "2.3"
},
	"0.1.103": {
	node_abi: null,
	v8: "2.3"
},
	"0.1.104": {
	node_abi: null,
	v8: "2.3"
},
	"0.2.0": {
	node_abi: 1,
	v8: "2.3"
},
	"0.2.1": {
	node_abi: 1,
	v8: "2.3"
},
	"0.2.2": {
	node_abi: 1,
	v8: "2.3"
},
	"0.2.3": {
	node_abi: 1,
	v8: "2.3"
},
	"0.2.4": {
	node_abi: 1,
	v8: "2.3"
},
	"0.2.5": {
	node_abi: 1,
	v8: "2.3"
},
	"0.2.6": {
	node_abi: 1,
	v8: "2.3"
},
	"0.3.0": {
	node_abi: 1,
	v8: "2.5"
},
	"0.3.1": {
	node_abi: 1,
	v8: "2.5"
},
	"0.3.2": {
	node_abi: 1,
	v8: "3.0"
},
	"0.3.3": {
	node_abi: 1,
	v8: "3.0"
},
	"0.3.4": {
	node_abi: 1,
	v8: "3.0"
},
	"0.3.5": {
	node_abi: 1,
	v8: "3.0"
},
	"0.3.6": {
	node_abi: 1,
	v8: "3.0"
},
	"0.3.7": {
	node_abi: 1,
	v8: "3.0"
},
	"0.3.8": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.0": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.1": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.2": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.3": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.4": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.5": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.6": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.7": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.8": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.9": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.10": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.11": {
	node_abi: 1,
	v8: "3.1"
},
	"0.4.12": {
	node_abi: 1,
	v8: "3.1"
},
	"0.5.0": {
	node_abi: 1,
	v8: "3.1"
},
	"0.5.1": {
	node_abi: 1,
	v8: "3.4"
},
	"0.5.2": {
	node_abi: 1,
	v8: "3.4"
},
	"0.5.3": {
	node_abi: 1,
	v8: "3.4"
},
	"0.5.4": {
	node_abi: 1,
	v8: "3.5"
},
	"0.5.5": {
	node_abi: 1,
	v8: "3.5"
},
	"0.5.6": {
	node_abi: 1,
	v8: "3.6"
},
	"0.5.7": {
	node_abi: 1,
	v8: "3.6"
},
	"0.5.8": {
	node_abi: 1,
	v8: "3.6"
},
	"0.5.9": {
	node_abi: 1,
	v8: "3.6"
},
	"0.5.10": {
	node_abi: 1,
	v8: "3.7"
},
	"0.6.0": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.1": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.2": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.3": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.4": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.5": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.6": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.7": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.8": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.9": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.10": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.11": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.12": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.13": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.14": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.15": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.16": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.17": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.18": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.19": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.20": {
	node_abi: 1,
	v8: "3.6"
},
	"0.6.21": {
	node_abi: 1,
	v8: "3.6"
},
	"0.7.0": {
	node_abi: 1,
	v8: "3.8"
},
	"0.7.1": {
	node_abi: 1,
	v8: "3.8"
},
	"0.7.2": {
	node_abi: 1,
	v8: "3.8"
},
	"0.7.3": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.4": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.5": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.6": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.7": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.8": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.9": {
	node_abi: 1,
	v8: "3.11"
},
	"0.7.10": {
	node_abi: 1,
	v8: "3.9"
},
	"0.7.11": {
	node_abi: 1,
	v8: "3.11"
},
	"0.7.12": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.0": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.1": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.2": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.3": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.4": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.5": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.6": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.7": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.8": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.9": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.10": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.11": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.12": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.13": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.14": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.15": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.16": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.17": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.18": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.19": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.20": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.21": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.22": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.23": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.24": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.25": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.26": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.27": {
	node_abi: 1,
	v8: "3.11"
},
	"0.8.28": {
	node_abi: 1,
	v8: "3.11"
},
	"0.9.0": {
	node_abi: 1,
	v8: "3.11"
},
	"0.9.1": {
	node_abi: 10,
	v8: "3.11"
},
	"0.9.2": {
	node_abi: 10,
	v8: "3.11"
},
	"0.9.3": {
	node_abi: 10,
	v8: "3.13"
},
	"0.9.4": {
	node_abi: 10,
	v8: "3.13"
},
	"0.9.5": {
	node_abi: 10,
	v8: "3.13"
},
	"0.9.6": {
	node_abi: 10,
	v8: "3.15"
},
	"0.9.7": {
	node_abi: 10,
	v8: "3.15"
},
	"0.9.8": {
	node_abi: 10,
	v8: "3.15"
},
	"0.9.9": {
	node_abi: 11,
	v8: "3.15"
},
	"0.9.10": {
	node_abi: 11,
	v8: "3.15"
},
	"0.9.11": {
	node_abi: 11,
	v8: "3.14"
},
	"0.9.12": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.0": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.1": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.2": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.3": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.4": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.5": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.6": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.7": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.8": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.9": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.10": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.11": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.12": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.13": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.14": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.15": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.16": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.17": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.18": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.19": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.20": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.21": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.22": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.23": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.24": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.25": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.26": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.27": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.28": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.29": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.30": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.31": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.32": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.33": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.34": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.35": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.36": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.37": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.38": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.39": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.40": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.41": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.42": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.43": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.44": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.45": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.46": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.47": {
	node_abi: 11,
	v8: "3.14"
},
	"0.10.48": {
	node_abi: 11,
	v8: "3.14"
},
	"0.11.0": {
	node_abi: 12,
	v8: "3.17"
},
	"0.11.1": {
	node_abi: 12,
	v8: "3.18"
},
	"0.11.2": {
	node_abi: 12,
	v8: "3.19"
},
	"0.11.3": {
	node_abi: 12,
	v8: "3.19"
},
	"0.11.4": {
	node_abi: 12,
	v8: "3.20"
},
	"0.11.5": {
	node_abi: 12,
	v8: "3.20"
},
	"0.11.6": {
	node_abi: 12,
	v8: "3.20"
},
	"0.11.7": {
	node_abi: 12,
	v8: "3.20"
},
	"0.11.8": {
	node_abi: 13,
	v8: "3.21"
},
	"0.11.9": {
	node_abi: 13,
	v8: "3.22"
},
	"0.11.10": {
	node_abi: 13,
	v8: "3.22"
},
	"0.11.11": {
	node_abi: 14,
	v8: "3.22"
},
	"0.11.12": {
	node_abi: 14,
	v8: "3.22"
},
	"0.11.13": {
	node_abi: 14,
	v8: "3.25"
},
	"0.11.14": {
	node_abi: 14,
	v8: "3.26"
},
	"0.11.15": {
	node_abi: 14,
	v8: "3.28"
},
	"0.11.16": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.0": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.1": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.2": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.3": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.4": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.5": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.6": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.7": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.8": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.9": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.10": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.11": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.12": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.13": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.14": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.15": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.16": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.17": {
	node_abi: 14,
	v8: "3.28"
},
	"0.12.18": {
	node_abi: 14,
	v8: "3.28"
},
	"1.0.0": {
	node_abi: 42,
	v8: "3.31"
},
	"1.0.1": {
	node_abi: 42,
	v8: "3.31"
},
	"1.0.2": {
	node_abi: 42,
	v8: "3.31"
},
	"1.0.3": {
	node_abi: 42,
	v8: "4.1"
},
	"1.0.4": {
	node_abi: 42,
	v8: "4.1"
},
	"1.1.0": {
	node_abi: 43,
	v8: "4.1"
},
	"1.2.0": {
	node_abi: 43,
	v8: "4.1"
},
	"1.3.0": {
	node_abi: 43,
	v8: "4.1"
},
	"1.4.1": {
	node_abi: 43,
	v8: "4.1"
},
	"1.4.2": {
	node_abi: 43,
	v8: "4.1"
},
	"1.4.3": {
	node_abi: 43,
	v8: "4.1"
},
	"1.5.0": {
	node_abi: 43,
	v8: "4.1"
},
	"1.5.1": {
	node_abi: 43,
	v8: "4.1"
},
	"1.6.0": {
	node_abi: 43,
	v8: "4.1"
},
	"1.6.1": {
	node_abi: 43,
	v8: "4.1"
},
	"1.6.2": {
	node_abi: 43,
	v8: "4.1"
},
	"1.6.3": {
	node_abi: 43,
	v8: "4.1"
},
	"1.6.4": {
	node_abi: 43,
	v8: "4.1"
},
	"1.7.1": {
	node_abi: 43,
	v8: "4.1"
},
	"1.8.1": {
	node_abi: 43,
	v8: "4.1"
},
	"1.8.2": {
	node_abi: 43,
	v8: "4.1"
},
	"1.8.3": {
	node_abi: 43,
	v8: "4.1"
},
	"1.8.4": {
	node_abi: 43,
	v8: "4.1"
},
	"2.0.0": {
	node_abi: 44,
	v8: "4.2"
},
	"2.0.1": {
	node_abi: 44,
	v8: "4.2"
},
	"2.0.2": {
	node_abi: 44,
	v8: "4.2"
},
	"2.1.0": {
	node_abi: 44,
	v8: "4.2"
},
	"2.2.0": {
	node_abi: 44,
	v8: "4.2"
},
	"2.2.1": {
	node_abi: 44,
	v8: "4.2"
},
	"2.3.0": {
	node_abi: 44,
	v8: "4.2"
},
	"2.3.1": {
	node_abi: 44,
	v8: "4.2"
},
	"2.3.2": {
	node_abi: 44,
	v8: "4.2"
},
	"2.3.3": {
	node_abi: 44,
	v8: "4.2"
},
	"2.3.4": {
	node_abi: 44,
	v8: "4.2"
},
	"2.4.0": {
	node_abi: 44,
	v8: "4.2"
},
	"2.5.0": {
	node_abi: 44,
	v8: "4.2"
},
	"3.0.0": {
	node_abi: 45,
	v8: "4.4"
},
	"3.1.0": {
	node_abi: 45,
	v8: "4.4"
},
	"3.2.0": {
	node_abi: 45,
	v8: "4.4"
},
	"3.3.0": {
	node_abi: 45,
	v8: "4.4"
},
	"3.3.1": {
	node_abi: 45,
	v8: "4.4"
},
	"4.0.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.1.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.1.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.1.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.3": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.4": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.5": {
	node_abi: 46,
	v8: "4.5"
},
	"4.2.6": {
	node_abi: 46,
	v8: "4.5"
},
	"4.3.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.3.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.3.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.3": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.4": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.5": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.6": {
	node_abi: 46,
	v8: "4.5"
},
	"4.4.7": {
	node_abi: 46,
	v8: "4.5"
},
	"4.5.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.6.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.6.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.6.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.7.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.7.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.7.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.7.3": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.1": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.2": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.3": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.4": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.5": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.6": {
	node_abi: 46,
	v8: "4.5"
},
	"4.8.7": {
	node_abi: 46,
	v8: "4.5"
},
	"4.9.0": {
	node_abi: 46,
	v8: "4.5"
},
	"4.9.1": {
	node_abi: 46,
	v8: "4.5"
},
	"5.0.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.1.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.1.1": {
	node_abi: 47,
	v8: "4.6"
},
	"5.2.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.3.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.4.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.4.1": {
	node_abi: 47,
	v8: "4.6"
},
	"5.5.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.6.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.7.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.7.1": {
	node_abi: 47,
	v8: "4.6"
},
	"5.8.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.9.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.9.1": {
	node_abi: 47,
	v8: "4.6"
},
	"5.10.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.10.1": {
	node_abi: 47,
	v8: "4.6"
},
	"5.11.0": {
	node_abi: 47,
	v8: "4.6"
},
	"5.11.1": {
	node_abi: 47,
	v8: "4.6"
},
	"5.12.0": {
	node_abi: 47,
	v8: "4.6"
},
	"6.0.0": {
	node_abi: 48,
	v8: "5.0"
},
	"6.1.0": {
	node_abi: 48,
	v8: "5.0"
},
	"6.2.0": {
	node_abi: 48,
	v8: "5.0"
},
	"6.2.1": {
	node_abi: 48,
	v8: "5.0"
},
	"6.2.2": {
	node_abi: 48,
	v8: "5.0"
},
	"6.3.0": {
	node_abi: 48,
	v8: "5.0"
},
	"6.3.1": {
	node_abi: 48,
	v8: "5.0"
},
	"6.4.0": {
	node_abi: 48,
	v8: "5.0"
},
	"6.5.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.6.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.7.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.8.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.8.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.9.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.9.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.9.2": {
	node_abi: 48,
	v8: "5.1"
},
	"6.9.3": {
	node_abi: 48,
	v8: "5.1"
},
	"6.9.4": {
	node_abi: 48,
	v8: "5.1"
},
	"6.9.5": {
	node_abi: 48,
	v8: "5.1"
},
	"6.10.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.10.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.10.2": {
	node_abi: 48,
	v8: "5.1"
},
	"6.10.3": {
	node_abi: 48,
	v8: "5.1"
},
	"6.11.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.11.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.11.2": {
	node_abi: 48,
	v8: "5.1"
},
	"6.11.3": {
	node_abi: 48,
	v8: "5.1"
},
	"6.11.4": {
	node_abi: 48,
	v8: "5.1"
},
	"6.11.5": {
	node_abi: 48,
	v8: "5.1"
},
	"6.12.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.12.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.12.2": {
	node_abi: 48,
	v8: "5.1"
},
	"6.12.3": {
	node_abi: 48,
	v8: "5.1"
},
	"6.13.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.13.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.14.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.14.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.14.2": {
	node_abi: 48,
	v8: "5.1"
},
	"6.14.3": {
	node_abi: 48,
	v8: "5.1"
},
	"6.14.4": {
	node_abi: 48,
	v8: "5.1"
},
	"6.15.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.15.1": {
	node_abi: 48,
	v8: "5.1"
},
	"6.16.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.17.0": {
	node_abi: 48,
	v8: "5.1"
},
	"6.17.1": {
	node_abi: 48,
	v8: "5.1"
},
	"7.0.0": {
	node_abi: 51,
	v8: "5.4"
},
	"7.1.0": {
	node_abi: 51,
	v8: "5.4"
},
	"7.2.0": {
	node_abi: 51,
	v8: "5.4"
},
	"7.2.1": {
	node_abi: 51,
	v8: "5.4"
},
	"7.3.0": {
	node_abi: 51,
	v8: "5.4"
},
	"7.4.0": {
	node_abi: 51,
	v8: "5.4"
},
	"7.5.0": {
	node_abi: 51,
	v8: "5.4"
},
	"7.6.0": {
	node_abi: 51,
	v8: "5.5"
},
	"7.7.0": {
	node_abi: 51,
	v8: "5.5"
},
	"7.7.1": {
	node_abi: 51,
	v8: "5.5"
},
	"7.7.2": {
	node_abi: 51,
	v8: "5.5"
},
	"7.7.3": {
	node_abi: 51,
	v8: "5.5"
},
	"7.7.4": {
	node_abi: 51,
	v8: "5.5"
},
	"7.8.0": {
	node_abi: 51,
	v8: "5.5"
},
	"7.9.0": {
	node_abi: 51,
	v8: "5.5"
},
	"7.10.0": {
	node_abi: 51,
	v8: "5.5"
},
	"7.10.1": {
	node_abi: 51,
	v8: "5.5"
},
	"8.0.0": {
	node_abi: 57,
	v8: "5.8"
},
	"8.1.0": {
	node_abi: 57,
	v8: "5.8"
},
	"8.1.1": {
	node_abi: 57,
	v8: "5.8"
},
	"8.1.2": {
	node_abi: 57,
	v8: "5.8"
},
	"8.1.3": {
	node_abi: 57,
	v8: "5.8"
},
	"8.1.4": {
	node_abi: 57,
	v8: "5.8"
},
	"8.2.0": {
	node_abi: 57,
	v8: "5.8"
},
	"8.2.1": {
	node_abi: 57,
	v8: "5.8"
},
	"8.3.0": {
	node_abi: 57,
	v8: "6.0"
},
	"8.4.0": {
	node_abi: 57,
	v8: "6.0"
},
	"8.5.0": {
	node_abi: 57,
	v8: "6.0"
},
	"8.6.0": {
	node_abi: 57,
	v8: "6.0"
},
	"8.7.0": {
	node_abi: 57,
	v8: "6.1"
},
	"8.8.0": {
	node_abi: 57,
	v8: "6.1"
},
	"8.8.1": {
	node_abi: 57,
	v8: "6.1"
},
	"8.9.0": {
	node_abi: 57,
	v8: "6.1"
},
	"8.9.1": {
	node_abi: 57,
	v8: "6.1"
},
	"8.9.2": {
	node_abi: 57,
	v8: "6.1"
},
	"8.9.3": {
	node_abi: 57,
	v8: "6.1"
},
	"8.9.4": {
	node_abi: 57,
	v8: "6.1"
},
	"8.10.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.11.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.11.1": {
	node_abi: 57,
	v8: "6.2"
},
	"8.11.2": {
	node_abi: 57,
	v8: "6.2"
},
	"8.11.3": {
	node_abi: 57,
	v8: "6.2"
},
	"8.11.4": {
	node_abi: 57,
	v8: "6.2"
},
	"8.12.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.13.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.14.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.14.1": {
	node_abi: 57,
	v8: "6.2"
},
	"8.15.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.15.1": {
	node_abi: 57,
	v8: "6.2"
},
	"8.16.0": {
	node_abi: 57,
	v8: "6.2"
},
	"8.16.1": {
	node_abi: 57,
	v8: "6.2"
},
	"8.16.2": {
	node_abi: 57,
	v8: "6.2"
},
	"8.17.0": {
	node_abi: 57,
	v8: "6.2"
},
	"9.0.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.1.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.2.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.2.1": {
	node_abi: 59,
	v8: "6.2"
},
	"9.3.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.4.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.5.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.6.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.6.1": {
	node_abi: 59,
	v8: "6.2"
},
	"9.7.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.7.1": {
	node_abi: 59,
	v8: "6.2"
},
	"9.8.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.9.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.10.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.10.1": {
	node_abi: 59,
	v8: "6.2"
},
	"9.11.0": {
	node_abi: 59,
	v8: "6.2"
},
	"9.11.1": {
	node_abi: 59,
	v8: "6.2"
},
	"9.11.2": {
	node_abi: 59,
	v8: "6.2"
},
	"10.0.0": {
	node_abi: 64,
	v8: "6.6"
},
	"10.1.0": {
	node_abi: 64,
	v8: "6.6"
},
	"10.2.0": {
	node_abi: 64,
	v8: "6.6"
},
	"10.2.1": {
	node_abi: 64,
	v8: "6.6"
},
	"10.3.0": {
	node_abi: 64,
	v8: "6.6"
},
	"10.4.0": {
	node_abi: 64,
	v8: "6.7"
},
	"10.4.1": {
	node_abi: 64,
	v8: "6.7"
},
	"10.5.0": {
	node_abi: 64,
	v8: "6.7"
},
	"10.6.0": {
	node_abi: 64,
	v8: "6.7"
},
	"10.7.0": {
	node_abi: 64,
	v8: "6.7"
},
	"10.8.0": {
	node_abi: 64,
	v8: "6.7"
},
	"10.9.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.10.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.11.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.12.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.13.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.14.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.14.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.14.2": {
	node_abi: 64,
	v8: "6.8"
},
	"10.15.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.15.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.15.2": {
	node_abi: 64,
	v8: "6.8"
},
	"10.15.3": {
	node_abi: 64,
	v8: "6.8"
},
	"10.16.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.16.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.16.2": {
	node_abi: 64,
	v8: "6.8"
},
	"10.16.3": {
	node_abi: 64,
	v8: "6.8"
},
	"10.17.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.18.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.18.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.19.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.20.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.20.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.21.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.22.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.22.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.23.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.23.1": {
	node_abi: 64,
	v8: "6.8"
},
	"10.23.2": {
	node_abi: 64,
	v8: "6.8"
},
	"10.23.3": {
	node_abi: 64,
	v8: "6.8"
},
	"10.24.0": {
	node_abi: 64,
	v8: "6.8"
},
	"10.24.1": {
	node_abi: 64,
	v8: "6.8"
},
	"11.0.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.1.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.2.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.3.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.4.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.5.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.6.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.7.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.8.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.9.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.10.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.10.1": {
	node_abi: 67,
	v8: "7.0"
},
	"11.11.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.12.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.13.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.14.0": {
	node_abi: 67,
	v8: "7.0"
},
	"11.15.0": {
	node_abi: 67,
	v8: "7.0"
},
	"12.0.0": {
	node_abi: 72,
	v8: "7.4"
},
	"12.1.0": {
	node_abi: 72,
	v8: "7.4"
},
	"12.2.0": {
	node_abi: 72,
	v8: "7.4"
},
	"12.3.0": {
	node_abi: 72,
	v8: "7.4"
},
	"12.3.1": {
	node_abi: 72,
	v8: "7.4"
},
	"12.4.0": {
	node_abi: 72,
	v8: "7.4"
},
	"12.5.0": {
	node_abi: 72,
	v8: "7.5"
},
	"12.6.0": {
	node_abi: 72,
	v8: "7.5"
},
	"12.7.0": {
	node_abi: 72,
	v8: "7.5"
},
	"12.8.0": {
	node_abi: 72,
	v8: "7.5"
},
	"12.8.1": {
	node_abi: 72,
	v8: "7.5"
},
	"12.9.0": {
	node_abi: 72,
	v8: "7.6"
},
	"12.9.1": {
	node_abi: 72,
	v8: "7.6"
},
	"12.10.0": {
	node_abi: 72,
	v8: "7.6"
},
	"12.11.0": {
	node_abi: 72,
	v8: "7.7"
},
	"12.11.1": {
	node_abi: 72,
	v8: "7.7"
},
	"12.12.0": {
	node_abi: 72,
	v8: "7.7"
},
	"12.13.0": {
	node_abi: 72,
	v8: "7.7"
},
	"12.13.1": {
	node_abi: 72,
	v8: "7.7"
},
	"12.14.0": {
	node_abi: 72,
	v8: "7.7"
},
	"12.14.1": {
	node_abi: 72,
	v8: "7.7"
},
	"12.15.0": {
	node_abi: 72,
	v8: "7.7"
},
	"12.16.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.16.1": {
	node_abi: 72,
	v8: "7.8"
},
	"12.16.2": {
	node_abi: 72,
	v8: "7.8"
},
	"12.16.3": {
	node_abi: 72,
	v8: "7.8"
},
	"12.17.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.18.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.18.1": {
	node_abi: 72,
	v8: "7.8"
},
	"12.18.2": {
	node_abi: 72,
	v8: "7.8"
},
	"12.18.3": {
	node_abi: 72,
	v8: "7.8"
},
	"12.18.4": {
	node_abi: 72,
	v8: "7.8"
},
	"12.19.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.19.1": {
	node_abi: 72,
	v8: "7.8"
},
	"12.20.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.20.1": {
	node_abi: 72,
	v8: "7.8"
},
	"12.20.2": {
	node_abi: 72,
	v8: "7.8"
},
	"12.21.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.0": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.1": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.2": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.3": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.4": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.5": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.6": {
	node_abi: 72,
	v8: "7.8"
},
	"12.22.7": {
	node_abi: 72,
	v8: "7.8"
},
	"13.0.0": {
	node_abi: 79,
	v8: "7.8"
},
	"13.0.1": {
	node_abi: 79,
	v8: "7.8"
},
	"13.1.0": {
	node_abi: 79,
	v8: "7.8"
},
	"13.2.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.3.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.4.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.5.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.6.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.7.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.8.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.9.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.10.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.10.1": {
	node_abi: 79,
	v8: "7.9"
},
	"13.11.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.12.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.13.0": {
	node_abi: 79,
	v8: "7.9"
},
	"13.14.0": {
	node_abi: 79,
	v8: "7.9"
},
	"14.0.0": {
	node_abi: 83,
	v8: "8.1"
},
	"14.1.0": {
	node_abi: 83,
	v8: "8.1"
},
	"14.2.0": {
	node_abi: 83,
	v8: "8.1"
},
	"14.3.0": {
	node_abi: 83,
	v8: "8.1"
},
	"14.4.0": {
	node_abi: 83,
	v8: "8.1"
},
	"14.5.0": {
	node_abi: 83,
	v8: "8.3"
},
	"14.6.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.7.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.8.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.9.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.10.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.10.1": {
	node_abi: 83,
	v8: "8.4"
},
	"14.11.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.12.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.13.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.13.1": {
	node_abi: 83,
	v8: "8.4"
},
	"14.14.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.15.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.15.1": {
	node_abi: 83,
	v8: "8.4"
},
	"14.15.2": {
	node_abi: 83,
	v8: "8.4"
},
	"14.15.3": {
	node_abi: 83,
	v8: "8.4"
},
	"14.15.4": {
	node_abi: 83,
	v8: "8.4"
},
	"14.15.5": {
	node_abi: 83,
	v8: "8.4"
},
	"14.16.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.16.1": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.1": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.2": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.3": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.4": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.5": {
	node_abi: 83,
	v8: "8.4"
},
	"14.17.6": {
	node_abi: 83,
	v8: "8.4"
},
	"14.18.0": {
	node_abi: 83,
	v8: "8.4"
},
	"14.18.1": {
	node_abi: 83,
	v8: "8.4"
},
	"15.0.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.0.1": {
	node_abi: 88,
	v8: "8.6"
},
	"15.1.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.2.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.2.1": {
	node_abi: 88,
	v8: "8.6"
},
	"15.3.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.4.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.5.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.5.1": {
	node_abi: 88,
	v8: "8.6"
},
	"15.6.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.7.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.8.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.9.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.10.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.11.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.12.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.13.0": {
	node_abi: 88,
	v8: "8.6"
},
	"15.14.0": {
	node_abi: 88,
	v8: "8.6"
},
	"16.0.0": {
	node_abi: 93,
	v8: "9.0"
},
	"16.1.0": {
	node_abi: 93,
	v8: "9.0"
},
	"16.2.0": {
	node_abi: 93,
	v8: "9.0"
},
	"16.3.0": {
	node_abi: 93,
	v8: "9.0"
},
	"16.4.0": {
	node_abi: 93,
	v8: "9.1"
},
	"16.4.1": {
	node_abi: 93,
	v8: "9.1"
},
	"16.4.2": {
	node_abi: 93,
	v8: "9.1"
},
	"16.5.0": {
	node_abi: 93,
	v8: "9.1"
},
	"16.6.0": {
	node_abi: 93,
	v8: "9.2"
},
	"16.6.1": {
	node_abi: 93,
	v8: "9.2"
},
	"16.6.2": {
	node_abi: 93,
	v8: "9.2"
},
	"16.7.0": {
	node_abi: 93,
	v8: "9.2"
},
	"16.8.0": {
	node_abi: 93,
	v8: "9.2"
},
	"16.9.0": {
	node_abi: 93,
	v8: "9.3"
},
	"16.9.1": {
	node_abi: 93,
	v8: "9.3"
},
	"16.10.0": {
	node_abi: 93,
	v8: "9.3"
},
	"16.11.0": {
	node_abi: 93,
	v8: "9.4"
},
	"16.11.1": {
	node_abi: 93,
	v8: "9.4"
},
	"16.12.0": {
	node_abi: 93,
	v8: "9.4"
},
	"16.13.0": {
	node_abi: 93,
	v8: "9.4"
},
	"17.0.0": {
	node_abi: 102,
	v8: "9.5"
},
	"17.0.1": {
	node_abi: 102,
	v8: "9.5"
},
	"17.1.0": {
	node_abi: 102,
	v8: "9.5"
}
};

var hasRequiredVersioning;
function requireVersioning() {
  if (hasRequiredVersioning) return versioning.exports;
  hasRequiredVersioning = 1;
  (function (module, exports) {

    module.exports = exports;
    const path$1 = path;
    const semver = requireSemver();
    const url = require$$0;
    const detect_libc = requireDetectLibc();
    const napi = requireNapi();
    let abi_crosswalk;

    // This is used for unit testing to provide a fake
    // ABI crosswalk that emulates one that is not updated
    // for the current version
    if (process.env.NODE_PRE_GYP_ABI_CROSSWALK) {
      abi_crosswalk = commonjsRequire(process.env.NODE_PRE_GYP_ABI_CROSSWALK);
    } else {
      abi_crosswalk = require$$5;
    }
    const major_versions = {};
    Object.keys(abi_crosswalk).forEach(v => {
      const major = v.split('.')[0];
      if (!major_versions[major]) {
        major_versions[major] = v;
      }
    });
    function get_electron_abi(runtime, target_version) {
      if (!runtime) {
        throw new Error('get_electron_abi requires valid runtime arg');
      }
      if (typeof target_version === 'undefined') {
        // erroneous CLI call
        throw new Error('Empty target version is not supported if electron is the target.');
      }
      // Electron guarantees that patch version update won't break native modules.
      const sem_ver = semver.parse(target_version);
      return runtime + '-v' + sem_ver.major + '.' + sem_ver.minor;
    }
    module.exports.get_electron_abi = get_electron_abi;
    function get_node_webkit_abi(runtime, target_version) {
      if (!runtime) {
        throw new Error('get_node_webkit_abi requires valid runtime arg');
      }
      if (typeof target_version === 'undefined') {
        // erroneous CLI call
        throw new Error('Empty target version is not supported if node-webkit is the target.');
      }
      return runtime + '-v' + target_version;
    }
    module.exports.get_node_webkit_abi = get_node_webkit_abi;
    function get_node_abi(runtime, versions) {
      if (!runtime) {
        throw new Error('get_node_abi requires valid runtime arg');
      }
      if (!versions) {
        throw new Error('get_node_abi requires valid process.versions object');
      }
      const sem_ver = semver.parse(versions.node);
      if (sem_ver.major === 0 && sem_ver.minor % 2) {
        // odd series
        // https://github.com/mapbox/node-pre-gyp/issues/124
        return runtime + '-v' + versions.node;
      } else {
        // process.versions.modules added in >= v0.10.4 and v0.11.7
        // https://github.com/joyent/node/commit/ccabd4a6fa8a6eb79d29bc3bbe9fe2b6531c2d8e
        return versions.modules ? runtime + '-v' + +versions.modules : 'v8-' + versions.v8.split('.').slice(0, 2).join('.');
      }
    }
    module.exports.get_node_abi = get_node_abi;
    function get_runtime_abi(runtime, target_version) {
      if (!runtime) {
        throw new Error('get_runtime_abi requires valid runtime arg');
      }
      if (runtime === 'node-webkit') {
        return get_node_webkit_abi(runtime, target_version || process.versions['node-webkit']);
      } else if (runtime === 'electron') {
        return get_electron_abi(runtime, target_version || process.versions.electron);
      } else {
        if (runtime !== 'node') {
          throw new Error("Unknown Runtime: '" + runtime + "'");
        }
        if (!target_version) {
          return get_node_abi(runtime, process.versions);
        } else {
          let cross_obj;
          // abi_crosswalk generated with ./scripts/abi_crosswalk.js
          if (abi_crosswalk[target_version]) {
            cross_obj = abi_crosswalk[target_version];
          } else {
            const target_parts = target_version.split('.').map(i => {
              return +i;
            });
            if (target_parts.length !== 3) {
              // parse failed
              throw new Error('Unknown target version: ' + target_version);
            }
            /*
                        The below code tries to infer the last known ABI compatible version
                        that we have recorded in the abi_crosswalk.json when an exact match
                        is not possible. The reasons for this to exist are complicated:
                            - We support passing --target to be able to allow developers to package binaries for versions of node
                             that are not the same one as they are running. This might also be used in combination with the
                             --target_arch or --target_platform flags to also package binaries for alternative platforms
                           - When --target is passed we can't therefore determine the ABI (process.versions.modules) from the node
                             version that is running in memory
                           - So, therefore node-pre-gyp keeps an "ABI crosswalk" (lib/util/abi_crosswalk.json) to be able to look
                             this info up for all versions
                           - But we cannot easily predict what the future ABI will be for released versions
                           - And node-pre-gyp needs to be a `bundledDependency` in apps that depend on it in order to work correctly
                             by being fully available at install time.
                           - So, the speed of node releases and the bundled nature of node-pre-gyp mean that a new node-pre-gyp release
                             need to happen for every node.js/io.js/node-webkit/nw.js/atom-shell/etc release that might come online if
                             you want the `--target` flag to keep working for the latest version
                           - Which is impractical ^^
                           - Hence the below code guesses about future ABI to make the need to update node-pre-gyp less demanding.
                         In practice then you can have a dependency of your app like `node-sqlite3` that bundles a `node-pre-gyp` that
                        only knows about node v0.10.33 in the `abi_crosswalk.json` but target node v0.10.34 (which is assumed to be
                        ABI compatible with v0.10.33).
                         TODO: use semver module instead of custom version parsing
                    */
            const major = target_parts[0];
            let minor = target_parts[1];
            let patch = target_parts[2];
            // io.js: yeah if node.js ever releases 1.x this will break
            // but that is unlikely to happen: https://github.com/iojs/io.js/pull/253#issuecomment-69432616
            if (major === 1) {
              // look for last release that is the same major version
              // e.g. we assume io.js 1.x is ABI compatible with >= 1.0.0
              while (true) {
                if (minor > 0) --minor;
                if (patch > 0) --patch;
                const new_iojs_target = '' + major + '.' + minor + '.' + patch;
                if (abi_crosswalk[new_iojs_target]) {
                  cross_obj = abi_crosswalk[new_iojs_target];
                  console.log('Warning: node-pre-gyp could not find exact match for ' + target_version);
                  console.log('Warning: but node-pre-gyp successfully choose ' + new_iojs_target + ' as ABI compatible target');
                  break;
                }
                if (minor === 0 && patch === 0) {
                  break;
                }
              }
            } else if (major >= 2) {
              // look for last release that is the same major version
              if (major_versions[major]) {
                cross_obj = abi_crosswalk[major_versions[major]];
                console.log('Warning: node-pre-gyp could not find exact match for ' + target_version);
                console.log('Warning: but node-pre-gyp successfully choose ' + major_versions[major] + ' as ABI compatible target');
              }
            } else if (major === 0) {
              // node.js
              if (target_parts[1] % 2 === 0) {
                // for stable/even node.js series
                // look for the last release that is the same minor release
                // e.g. we assume node 0.10.x is ABI compatible with >= 0.10.0
                while (--patch > 0) {
                  const new_node_target = '' + major + '.' + minor + '.' + patch;
                  if (abi_crosswalk[new_node_target]) {
                    cross_obj = abi_crosswalk[new_node_target];
                    console.log('Warning: node-pre-gyp could not find exact match for ' + target_version);
                    console.log('Warning: but node-pre-gyp successfully choose ' + new_node_target + ' as ABI compatible target');
                    break;
                  }
                }
              }
            }
          }
          if (!cross_obj) {
            throw new Error('Unsupported target version: ' + target_version);
          }
          // emulate process.versions
          const versions_obj = {
            node: target_version,
            v8: cross_obj.v8 + '.0',
            // abi_crosswalk uses 1 for node versions lacking process.versions.modules
            // process.versions.modules added in >= v0.10.4 and v0.11.7
            modules: cross_obj.node_abi > 1 ? cross_obj.node_abi : undefined
          };
          return get_node_abi(runtime, versions_obj);
        }
      }
    }
    module.exports.get_runtime_abi = get_runtime_abi;
    const required_parameters = ['module_name', 'module_path', 'host'];
    function validate_config(package_json, opts) {
      const msg = package_json.name + ' package.json is not node-pre-gyp ready:\n';
      const missing = [];
      if (!package_json.main) {
        missing.push('main');
      }
      if (!package_json.version) {
        missing.push('version');
      }
      if (!package_json.name) {
        missing.push('name');
      }
      if (!package_json.binary) {
        missing.push('binary');
      }
      const o = package_json.binary;
      if (o) {
        required_parameters.forEach(p => {
          if (!o[p] || typeof o[p] !== 'string') {
            missing.push('binary.' + p);
          }
        });
      }
      if (missing.length >= 1) {
        throw new Error(msg + 'package.json must declare these properties: \n' + missing.join('\n'));
      }
      if (o) {
        // enforce https over http
        const protocol = url.parse(o.host).protocol;
        if (protocol === 'http:') {
          throw new Error("'host' protocol (" + protocol + ") is invalid - only 'https:' is accepted");
        }
      }
      napi.validate_package_json(package_json, opts);
    }
    module.exports.validate_config = validate_config;
    function eval_template(template, opts) {
      Object.keys(opts).forEach(key => {
        const pattern = '{' + key + '}';
        while (template.indexOf(pattern) > -1) {
          template = template.replace(pattern, opts[key]);
        }
      });
      return template;
    }

    // url.resolve needs single trailing slash
    // to behave correctly, otherwise a double slash
    // may end up in the url which breaks requests
    // and a lacking slash may not lead to proper joining
    function fix_slashes(pathname) {
      if (pathname.slice(-1) !== '/') {
        return pathname + '/';
      }
      return pathname;
    }

    // remove double slashes
    // note: path.normalize will not work because
    // it will convert forward to back slashes
    function drop_double_slashes(pathname) {
      return pathname.replace(/\/\//g, '/');
    }
    function get_process_runtime(versions) {
      let runtime = 'node';
      if (versions['node-webkit']) {
        runtime = 'node-webkit';
      } else if (versions.electron) {
        runtime = 'electron';
      }
      return runtime;
    }
    module.exports.get_process_runtime = get_process_runtime;
    const default_package_name = '{module_name}-v{version}-{node_abi}-{platform}-{arch}.tar.gz';
    const default_remote_path = '';
    module.exports.evaluate = function (package_json, options, napi_build_version) {
      options = options || {};
      validate_config(package_json, options); // options is a suitable substitute for opts in this case
      const v = package_json.version;
      const module_version = semver.parse(v);
      const runtime = options.runtime || get_process_runtime(process.versions);
      const opts = {
        name: package_json.name,
        configuration: options.debug ? 'Debug' : 'Release',
        debug: options.debug,
        module_name: package_json.binary.module_name,
        version: module_version.version,
        prerelease: module_version.prerelease.length ? module_version.prerelease.join('.') : '',
        build: module_version.build.length ? module_version.build.join('.') : '',
        major: module_version.major,
        minor: module_version.minor,
        patch: module_version.patch,
        runtime: runtime,
        node_abi: get_runtime_abi(runtime, options.target),
        node_abi_napi: napi.get_napi_version(options.target) ? 'napi' : get_runtime_abi(runtime, options.target),
        napi_version: napi.get_napi_version(options.target),
        // non-zero numeric, undefined if unsupported
        napi_build_version: napi_build_version || '',
        node_napi_label: napi_build_version ? 'napi-v' + napi_build_version : get_runtime_abi(runtime, options.target),
        target: options.target || '',
        platform: options.target_platform || process.platform,
        target_platform: options.target_platform || process.platform,
        arch: options.target_arch || process.arch,
        target_arch: options.target_arch || process.arch,
        libc: options.target_libc || detect_libc.familySync() || 'unknown',
        module_main: package_json.main,
        toolset: options.toolset || '',
        // address https://github.com/mapbox/node-pre-gyp/issues/119
        bucket: package_json.binary.bucket,
        region: package_json.binary.region,
        s3ForcePathStyle: package_json.binary.s3ForcePathStyle || false
      };
      // support host mirror with npm config `--{module_name}_binary_host_mirror`
      // e.g.: https://github.com/node-inspector/v8-profiler/blob/master/package.json#L25
      // > npm install v8-profiler --profiler_binary_host_mirror=https://npm.taobao.org/mirrors/node-inspector/
      const validModuleName = opts.module_name.replace('-', '_');
      const host = process.env['npm_config_' + validModuleName + '_binary_host_mirror'] || package_json.binary.host;
      opts.host = fix_slashes(eval_template(host, opts));
      opts.module_path = eval_template(package_json.binary.module_path, opts);
      // now we resolve the module_path to ensure it is absolute so that binding.gyp variables work predictably
      if (options.module_root) {
        // resolve relative to known module root: works for pre-binding require
        opts.module_path = path$1.join(options.module_root, opts.module_path);
      } else {
        // resolve relative to current working directory: works for node-pre-gyp commands
        opts.module_path = path$1.resolve(opts.module_path);
      }
      opts.module = path$1.join(opts.module_path, opts.module_name + '.node');
      opts.remote_path = package_json.binary.remote_path ? drop_double_slashes(fix_slashes(eval_template(package_json.binary.remote_path, opts))) : default_remote_path;
      const package_name = package_json.binary.package_name ? package_json.binary.package_name : default_package_name;
      opts.package_name = eval_template(package_name, opts);
      opts.staged_tarball = path$1.join('build/stage', opts.remote_path, opts.package_name);
      opts.hosted_path = url.resolve(opts.host, opts.remote_path);
      opts.hosted_tarball = url.resolve(opts.hosted_path, opts.package_name);
      return opts;
    };
  })(versioning, versioning.exports);
  return versioning.exports;
}

var hasRequiredPreBinding;
function requirePreBinding() {
  if (hasRequiredPreBinding) return preBinding.exports;
  hasRequiredPreBinding = 1;
  (function (module, exports) {

    const npg = requireNodePreGyp();
    const versioning = requireVersioning();
    const napi = requireNapi();
    const existsSync = require$$0$1.existsSync || path.existsSync;
    const path$1 = path;
    module.exports = exports;
    exports.usage = 'Finds the require path for the node-pre-gyp installed module';
    exports.validate = function (package_json, opts) {
      versioning.validate_config(package_json, opts);
    };
    exports.find = function (package_json_path, opts) {
      if (!existsSync(package_json_path)) {
        throw new Error(package_json_path + 'does not exist');
      }
      const prog = new npg.Run({
        package_json_path,
        argv: process.argv
      });
      prog.setBinaryHostProperty();
      const package_json = prog.package_json;
      versioning.validate_config(package_json, opts);
      let napi_build_version;
      if (napi.get_napi_build_versions(package_json, opts)) {
        napi_build_version = napi.get_best_napi_build_version(package_json, opts);
      }
      opts = opts || {};
      if (!opts.module_root) opts.module_root = path$1.dirname(package_json_path);
      const meta = versioning.evaluate(package_json, opts, napi_build_version);
      return meta.module;
    };
  })(preBinding, preBinding.exports);
  return preBinding.exports;
}

var name = "@mapbox/node-pre-gyp";
var description = "Node.js native addon binary install tool";
var version = "1.0.11";
var keywords = [
	"native",
	"addon",
	"module",
	"c",
	"c++",
	"bindings",
	"binary"
];
var license = "BSD-3-Clause";
var author = "Dane Springmeyer <dane@mapbox.com>";
var repository = {
	type: "git",
	url: "git://github.com/mapbox/node-pre-gyp.git"
};
var bin = "./bin/node-pre-gyp";
var main = "./lib/node-pre-gyp.js";
var dependencies = {
	"detect-libc": "^2.0.0",
	"https-proxy-agent": "^5.0.0",
	"make-dir": "^3.1.0",
	"node-fetch": "^2.6.7",
	nopt: "^5.0.0",
	npmlog: "^5.0.1",
	rimraf: "^3.0.2",
	semver: "^7.3.5",
	tar: "^6.1.11"
};
var devDependencies = {
	"@mapbox/cloudfriend": "^5.1.0",
	"@mapbox/eslint-config-mapbox": "^3.0.0",
	"aws-sdk": "^2.1087.0",
	codecov: "^3.8.3",
	eslint: "^7.32.0",
	"eslint-plugin-node": "^11.1.0",
	"mock-aws-s3": "^4.0.2",
	nock: "^12.0.3",
	"node-addon-api": "^4.3.0",
	nyc: "^15.1.0",
	tape: "^5.5.2",
	"tar-fs": "^2.1.1"
};
var nyc = {
	all: true,
	"skip-full": false,
	exclude: [
		"test/**"
	]
};
var scripts = {
	coverage: "nyc --all --include index.js --include lib/ npm test",
	"upload-coverage": "nyc report --reporter json && codecov --clear --flags=unit --file=./coverage/coverage-final.json",
	lint: "eslint bin/node-pre-gyp lib/*js lib/util/*js test/*js scripts/*js",
	fix: "npm run lint -- --fix",
	"update-crosswalk": "node scripts/abi_crosswalk.js",
	test: "tape test/*test.js"
};
var require$$9 = {
	name: name,
	description: description,
	version: version,
	keywords: keywords,
	license: license,
	author: author,
	repository: repository,
	bin: bin,
	main: main,
	dependencies: dependencies,
	devDependencies: devDependencies,
	nyc: nyc,
	scripts: scripts
};

var hasRequiredNodePreGyp;
function requireNodePreGyp() {
  if (hasRequiredNodePreGyp) return nodePreGyp.exports;
  hasRequiredNodePreGyp = 1;
  (function (module, exports) {

    /**
     * Module exports.
     */
    module.exports = exports;

    /**
     * Module dependencies.
     */

    // load mocking control function for accessing s3 via https. the function is a noop always returning
    // false if not mocking.
    exports.mockS3Http = s3_setupExports.get_mockS3Http();
    exports.mockS3Http('on');
    const mocking = exports.mockS3Http('get');
    const fs = require$$0$1;
    const path$1 = path;
    const nopt = noptExports;
    const log = logExports;
    log.disableProgress();
    const napi = requireNapi();
    const EE = require$$2$1.EventEmitter;
    const inherits = require$$0$2.inherits;
    const cli_commands = ['clean', 'install', 'reinstall', 'build', 'rebuild', 'package', 'testpackage', 'publish', 'unpublish', 'info', 'testbinary', 'reveal', 'configure'];
    const aliases = {};

    // differentiate node-pre-gyp's logs from npm's
    log.heading = 'node-pre-gyp';
    if (mocking) {
      log.warn(`mocking s3 to ${process.env.node_pre_gyp_mock_s3}`);
    }

    // this is a getter to avoid circular reference warnings with node v14.
    Object.defineProperty(exports, 'find', {
      get: function () {
        return requirePreBinding().find;
      },
      enumerable: true
    });

    // in the following, "my_module" is using node-pre-gyp to
    // prebuild and install pre-built binaries. "main_module"
    // is using "my_module".
    //
    // "bin/node-pre-gyp" invokes Run() without a path. the
    // expectation is that the working directory is the package
    // root "my_module". this is true because in all cases npm is
    // executing a script in the context of "my_module".
    //
    // "pre-binding.find()" is executed by "my_module" but in the
    // context of "main_module". this is because "main_module" is
    // executing and requires "my_module" which is then executing
    // "pre-binding.find()" via "node-pre-gyp.find()", so the working
    // directory is that of "main_module".
    //
    // that's why "find()" must pass the path to package.json.
    //
    function Run({
      package_json_path = './package.json',
      argv
    }) {
      this.package_json_path = package_json_path;
      this.commands = {};
      const self = this;
      cli_commands.forEach(command => {
        self.commands[command] = function (argvx, callback) {
          log.verbose('command', command, argvx);
          return commonjsRequire('./' + command)(self, argvx, callback);
        };
      });
      this.parseArgv(argv);

      // this is set to true after the binary.host property was set to
      // either staging_host or production_host.
      this.binaryHostSet = false;
    }
    inherits(Run, EE);
    exports.Run = Run;
    const proto = Run.prototype;

    /**
     * Export the contents of the package.json.
     */

    proto.package = require$$9;

    /**
     * nopt configuration definitions
     */

    proto.configDefs = {
      help: Boolean,
      // everywhere
      arch: String,
      // 'configure'
      debug: Boolean,
      // 'build'
      directory: String,
      // bin
      proxy: String,
      // 'install'
      loglevel: String // everywhere
    };

    /**
     * nopt shorthands
     */

    proto.shorthands = {
      release: '--no-debug',
      C: '--directory',
      debug: '--debug',
      j: '--jobs',
      silent: '--loglevel=silent',
      silly: '--loglevel=silly',
      verbose: '--loglevel=verbose'
    };

    /**
     * expose the command aliases for the bin file to use.
     */

    proto.aliases = aliases;

    /**
     * Parses the given argv array and sets the 'opts', 'argv',
     * 'command', and 'package_json' properties.
     */

    proto.parseArgv = function parseOpts(argv) {
      this.opts = nopt(this.configDefs, this.shorthands, argv);
      this.argv = this.opts.argv.remain.slice();
      const commands = this.todo = [];

      // create a copy of the argv array with aliases mapped
      argv = this.argv.map(arg => {
        // is this an alias?
        if (arg in this.aliases) {
          arg = this.aliases[arg];
        }
        return arg;
      });

      // process the mapped args into "command" objects ("name" and "args" props)
      argv.slice().forEach(arg => {
        if (arg in this.commands) {
          const args = argv.splice(0, argv.indexOf(arg));
          argv.shift();
          if (commands.length > 0) {
            commands[commands.length - 1].args = args;
          }
          commands.push({
            name: arg,
            args: []
          });
        }
      });
      if (commands.length > 0) {
        commands[commands.length - 1].args = argv.splice(0);
      }

      // if a directory was specified package.json is assumed to be relative
      // to it.
      let package_json_path = this.package_json_path;
      if (this.opts.directory) {
        package_json_path = path$1.join(this.opts.directory, package_json_path);
      }
      this.package_json = JSON.parse(fs.readFileSync(package_json_path));

      // expand commands entries for multiple napi builds
      this.todo = napi.expand_commands(this.package_json, this.opts, commands);

      // support for inheriting config env variables from npm
      const npm_config_prefix = 'npm_config_';
      Object.keys(process.env).forEach(name => {
        if (name.indexOf(npm_config_prefix) !== 0) return;
        const val = process.env[name];
        if (name === npm_config_prefix + 'loglevel') {
          log.level = val;
        } else {
          // add the user-defined options to the config
          name = name.substring(npm_config_prefix.length);
          // avoid npm argv clobber already present args
          // which avoids problem of 'npm test' calling
          // script that runs unique npm install commands
          if (name === 'argv') {
            if (this.opts.argv && this.opts.argv.remain && this.opts.argv.remain.length) ; else {
              this.opts[name] = val;
            }
          } else {
            this.opts[name] = val;
          }
        }
      });
      if (this.opts.loglevel) {
        log.level = this.opts.loglevel;
      }
      log.resume();
    };

    /**
     * allow the binary.host property to be set at execution time.
     *
     * for this to take effect requires all the following to be true.
     * - binary is a property in package.json
     * - binary.host is falsey
     * - binary.staging_host is not empty
     * - binary.production_host is not empty
     *
     * if any of the previous checks fail then the function returns an empty string
     * and makes no changes to package.json's binary property.
     *
     *
     * if command is "publish" then the default is set to "binary.staging_host"
     * if command is not "publish" the the default is set to "binary.production_host"
     *
     * if the command-line option '--s3_host' is set to "staging" or "production" then
     * "binary.host" is set to the specified "staging_host" or "production_host". if
     * '--s3_host' is any other value an exception is thrown.
     *
     * if '--s3_host' is not present then "binary.host" is set to the default as above.
     *
     * this strategy was chosen so that any command other than "publish" or "unpublish" uses "production"
     * as the default without requiring any command-line options but that "publish" and "unpublish" require
     * '--s3_host production_host' to be specified in order to *really* publish (or unpublish). publishing
     * to staging can be done freely without worrying about disturbing any production releases.
     */
    proto.setBinaryHostProperty = function (command) {
      if (this.binaryHostSet) {
        return this.package_json.binary.host;
      }
      const p = this.package_json;
      // don't set anything if host is present. it must be left blank to trigger this.
      if (!p || !p.binary || p.binary.host) {
        return '';
      }
      // and both staging and production must be present. errors will be reported later.
      if (!p.binary.staging_host || !p.binary.production_host) {
        return '';
      }
      let target = 'production_host';
      if (command === 'publish' || command === 'unpublish') {
        target = 'staging_host';
      }
      // the environment variable has priority over the default or the command line. if
      // either the env var or the command line option are invalid throw an error.
      const npg_s3_host = process.env.node_pre_gyp_s3_host;
      if (npg_s3_host === 'staging' || npg_s3_host === 'production') {
        target = `${npg_s3_host}_host`;
      } else if (this.opts['s3_host'] === 'staging' || this.opts['s3_host'] === 'production') {
        target = `${this.opts['s3_host']}_host`;
      } else if (this.opts['s3_host'] || npg_s3_host) {
        throw new Error(`invalid s3_host ${this.opts['s3_host'] || npg_s3_host}`);
      }
      p.binary.host = p.binary[target];
      this.binaryHostSet = true;
      return p.binary.host;
    };

    /**
     * Returns the usage instructions for node-pre-gyp.
     */

    proto.usage = function usage() {
      const str = ['', '  Usage: node-pre-gyp <command> [options]', '', '  where <command> is one of:', cli_commands.map(c => {
        return '    - ' + c + ' - ' + commonjsRequire('./' + c).usage;
      }).join('\n'), '', 'node-pre-gyp@' + this.version + '  ' + path$1.resolve(__dirname, '..'), 'node@' + process.versions.node].join('\n');
      return str;
    };

    /**
     * Version number getter.
     */

    Object.defineProperty(proto, 'version', {
      get: function () {
        return this.package.version;
      },
      enumerable: true
    });
  })(nodePreGyp, nodePreGyp.exports);
  return nodePreGyp.exports;
}

(function (module, exports) {
  const binary = requireNodePreGyp();
  const path$1 = path;
  const binding_path = binary.find(path$1.resolve(path$1.join(__dirname, '../package.json')));
  const binding = commonjsRequire(binding_path);
  module.exports = binding;
})(sqlite3Binding);
var sqlite3BindingExports = sqlite3Binding.exports;

var trace = {};

var hasRequiredTrace;
function requireTrace() {
  if (hasRequiredTrace) return trace;
  hasRequiredTrace = 1;
  // Inspired by https://github.com/tlrobinson/long-stack-traces
  const util = require$$0$2;
  function extendTrace(object, property, pos) {
    const old = object[property];
    object[property] = function () {
      const error = new Error();
      const name = object.constructor.name + '#' + property + '(' + Array.prototype.slice.call(arguments).map(function (el) {
        return util.inspect(el, false, 0);
      }).join(', ') + ')';
      if (typeof pos === 'undefined') pos = -1;
      if (pos < 0) pos += arguments.length;
      const cb = arguments[pos];
      if (typeof arguments[pos] === 'function') {
        arguments[pos] = function replacement() {
          const err = arguments[0];
          if (err && err.stack && !err.__augmented) {
            err.stack = filter(err).join('\n');
            err.stack += '\n--> in ' + name;
            err.stack += '\n' + filter(error).slice(1).join('\n');
            err.__augmented = true;
          }
          return cb.apply(this, arguments);
        };
      }
      return old.apply(this, arguments);
    };
  }
  trace.extendTrace = extendTrace;
  function filter(error) {
    return error.stack.split('\n').filter(function (line) {
      return line.indexOf(__filename) < 0;
    });
  }
  return trace;
}

(function (module, exports) {
  const path$1 = path;
  const sqlite3 = sqlite3BindingExports;
  const EventEmitter = require$$2$1.EventEmitter;
  module.exports = sqlite3;
  function normalizeMethod(fn) {
    return function (sql) {
      let errBack;
      const args = Array.prototype.slice.call(arguments, 1);
      if (typeof args[args.length - 1] === 'function') {
        const callback = args[args.length - 1];
        errBack = function (err) {
          if (err) {
            callback(err);
          }
        };
      }
      const statement = new Statement(this, sql, errBack);
      return fn.call(this, statement, args);
    };
  }
  function inherits(target, source) {
    for (const k in source.prototype) target.prototype[k] = source.prototype[k];
  }
  sqlite3.cached = {
    Database: function (file, a, b) {
      if (file === '' || file === ':memory:') {
        // Don't cache special databases.
        return new Database(file, a, b);
      }
      let db;
      file = path$1.resolve(file);
      if (!sqlite3.cached.objects[file]) {
        db = sqlite3.cached.objects[file] = new Database(file, a, b);
      } else {
        // Make sure the callback is called.
        db = sqlite3.cached.objects[file];
        const callback = typeof a === 'number' ? b : a;
        if (typeof callback === 'function') {
          function cb() {
            callback.call(db, null);
          }
          if (db.open) process.nextTick(cb);else db.once('open', cb);
        }
      }
      return db;
    },
    objects: {}
  };
  const Database = sqlite3.Database;
  const Statement = sqlite3.Statement;
  const Backup = sqlite3.Backup;
  inherits(Database, EventEmitter);
  inherits(Statement, EventEmitter);
  inherits(Backup, EventEmitter);

  // Database#prepare(sql, [bind1, bind2, ...], [callback])
  Database.prototype.prepare = normalizeMethod(function (statement, params) {
    return params.length ? statement.bind.apply(statement, params) : statement;
  });

  // Database#run(sql, [bind1, bind2, ...], [callback])
  Database.prototype.run = normalizeMethod(function (statement, params) {
    statement.run.apply(statement, params).finalize();
    return this;
  });

  // Database#get(sql, [bind1, bind2, ...], [callback])
  Database.prototype.get = normalizeMethod(function (statement, params) {
    statement.get.apply(statement, params).finalize();
    return this;
  });

  // Database#all(sql, [bind1, bind2, ...], [callback])
  Database.prototype.all = normalizeMethod(function (statement, params) {
    statement.all.apply(statement, params).finalize();
    return this;
  });

  // Database#each(sql, [bind1, bind2, ...], [callback], [complete])
  Database.prototype.each = normalizeMethod(function (statement, params) {
    statement.each.apply(statement, params).finalize();
    return this;
  });
  Database.prototype.map = normalizeMethod(function (statement, params) {
    statement.map.apply(statement, params).finalize();
    return this;
  });

  // Database#backup(filename, [callback])
  // Database#backup(filename, destName, sourceName, filenameIsDest, [callback])
  Database.prototype.backup = function () {
    let backup;
    if (arguments.length <= 2) {
      // By default, we write the main database out to the main database of the named file.
      // This is the most likely use of the backup api.
      backup = new Backup(this, arguments[0], 'main', 'main', true, arguments[1]);
    } else {
      // Otherwise, give the user full control over the sqlite3_backup_init arguments.
      backup = new Backup(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    }
    // Per the sqlite docs, exclude the following errors as non-fatal by default.
    backup.retryErrors = [sqlite3.BUSY, sqlite3.LOCKED];
    return backup;
  };
  Statement.prototype.map = function () {
    const params = Array.prototype.slice.call(arguments);
    const callback = params.pop();
    params.push(function (err, rows) {
      if (err) return callback(err);
      const result = {};
      if (rows.length) {
        const keys = Object.keys(rows[0]);
        const key = keys[0];
        if (keys.length > 2) {
          // Value is an object
          for (let i = 0; i < rows.length; i++) {
            result[rows[i][key]] = rows[i];
          }
        } else {
          const value = keys[1];
          // Value is a plain value
          for (let i = 0; i < rows.length; i++) {
            result[rows[i][key]] = rows[i][value];
          }
        }
      }
      callback(err, result);
    });
    return this.all.apply(this, params);
  };
  let isVerbose = false;
  const supportedEvents = ['trace', 'profile', 'change'];
  Database.prototype.addListener = Database.prototype.on = function (type) {
    const val = EventEmitter.prototype.addListener.apply(this, arguments);
    if (supportedEvents.indexOf(type) >= 0) {
      this.configure(type, true);
    }
    return val;
  };
  Database.prototype.removeListener = function (type) {
    const val = EventEmitter.prototype.removeListener.apply(this, arguments);
    if (supportedEvents.indexOf(type) >= 0 && !this._events[type]) {
      this.configure(type, false);
    }
    return val;
  };
  Database.prototype.removeAllListeners = function (type) {
    const val = EventEmitter.prototype.removeAllListeners.apply(this, arguments);
    if (supportedEvents.indexOf(type) >= 0) {
      this.configure(type, false);
    }
    return val;
  };

  // Save the stack trace over EIO callbacks.
  sqlite3.verbose = function () {
    if (!isVerbose) {
      const trace = requireTrace();
      ['prepare', 'get', 'run', 'all', 'each', 'map', 'close', 'exec'].forEach(function (name) {
        trace.extendTrace(Database.prototype, name);
      });
      ['bind', 'get', 'run', 'all', 'each', 'map', 'reset', 'finalize'].forEach(function (name) {
        trace.extendTrace(Statement.prototype, name);
      });
      isVerbose = true;
    }
    return sqlite3;
  };
})(sqlite3$1);
var sqlite3Exports = sqlite3$1.exports;
var sqlite3 = /*@__PURE__*/getDefaultExportFromCjs(sqlite3Exports);

function SQLiteResult(error, insertId, rowsAffected, rows) {
  this.error = error;
  this.insertId = insertId;
  this.rowsAffected = rowsAffected;
  this.rows = rows;
}

var READ_ONLY_ERROR = new Error('could not prepare statement (23 not authorized)');
function SQLiteDatabase(name, opts) {
  opts = opts || {};
  this._db = new sqlite3.Database(name);
  if (opts.busyTimeout) {
    this._db.configure('busyTimeout', opts.busyTimeout); // Default is 1000
  }
  if (opts.trace) {
    this._db.configure('trace', opts.trace);
  }
  if (opts.profile) {
    this._db.configure('profile', opts.profile);
  }
}
function runSelect(db, sql, args, cb) {
  db.all(sql, args, function (err, rows) {
    if (err) {
      return cb(new SQLiteResult(err));
    }
    var insertId = void 0;
    var rowsAffected = 0;
    var resultSet = new SQLiteResult(null, insertId, rowsAffected, rows);
    cb(resultSet);
  });
}
function runNonSelect(db, sql, args, cb) {
  db.run(sql, args, function (err) {
    if (err) {
      return cb(new SQLiteResult(err));
    }
    /* jshint validthis:true */
    var executionResult = this;
    var insertId = executionResult.lastID;
    var rowsAffected = executionResult.changes;
    var rows = [];
    var resultSet = new SQLiteResult(null, insertId, rowsAffected, rows);
    cb(resultSet);
  });
}
SQLiteDatabase.prototype.exec = function exec(queries, readOnly, callback) {
  var db = this._db;
  var len = queries.length;
  var results = new Array(len);
  var i = 0;
  function checkDone() {
    if (++i === len) {
      callback(null, results);
    } else {
      doNext();
    }
  }
  function onQueryComplete(i) {
    return function (res) {
      results[i] = res;
      checkDone();
    };
  }
  function doNext() {
    var query = queries[i];
    var sql = query.sql;
    var args = query.args;

    // TODO: It seems like the node-sqlite3 API either allows:
    // 1) all(), which returns results but not rowsAffected or lastID
    // 2) run(), which doesn't return results, but returns rowsAffected and lastID
    // So we try to sniff whether it's a SELECT query or not.
    // This is inherently error-prone, although it will probably work in the 99%
    // case.
    var isSelect = /^\s*SELECT\b/i.test(sql);
    if (readOnly && !isSelect) {
      onQueryComplete(i)(new SQLiteResult(READ_ONLY_ERROR));
    } else if (isSelect) {
      runSelect(db, sql, args, onQueryComplete(i));
    } else {
      runNonSelect(db, sql, args, onQueryComplete(i));
    }
  }
  doNext();
};

/**
 * @param {string} name
 * @returns {SQLiteDatabase}
 */
function wrappedSQLiteDatabase(name) {
  const db = new SQLiteDatabase(name, {});
  if (CFG.sqlBusyTimeout) {
    db._db.configure('busyTimeout', /** @type {number} */CFG.sqlBusyTimeout); // Default is 1000
  }
  if (CFG.sqlTrace) {
    // @ts-expect-error native API?
    db._db.configure('trace', CFG.sqlTrace);
  }
  if (CFG.sqlProfile) {
    // @ts-expect-error native API?
    db._db.configure('profile', CFG.sqlProfile);
  }
  return db;
}
const nodeWebSQL = customOpenDatabase(wrappedSQLiteDatabase, {});

// ID_Start (includes Other_ID_Start)
const UnicodeIDStart = '(?:[$A-Z_a-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B4\\u08B6-\\u08BD\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C80\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D54-\\u0D56\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1C80-\\u1C88\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2118-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309B-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AE\\uA7B0-\\uA7B7\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDD40-\\uDD74\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDF00-\\uDF1F\\uDF30-\\uDF4A\\uDF50-\\uDF75\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDFD1-\\uDFD5]|\\uD801[\\uDC00-\\uDC9D\\uDCB0-\\uDCD3\\uDCD8-\\uDCFB\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00\\uDE10-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE4\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC03-\\uDC37\\uDC83-\\uDCAF\\uDCD0-\\uDCE8\\uDD03-\\uDD26\\uDD50-\\uDD72\\uDD76\\uDD83-\\uDDB2\\uDDC1-\\uDDC4\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE2B\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEDE\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3D\\uDF50\\uDF5D-\\uDF61]|\\uD805[\\uDC00-\\uDC34\\uDC47-\\uDC4A\\uDC80-\\uDCAF\\uDCC4\\uDCC5\\uDCC7\\uDD80-\\uDDAE\\uDDD8-\\uDDDB\\uDE00-\\uDE2F\\uDE44\\uDE80-\\uDEAA\\uDF00-\\uDF19]|\\uD806[\\uDCA0-\\uDCDF\\uDCFF\\uDEC0-\\uDEF8]|\\uD807[\\uDC00-\\uDC08\\uDC0A-\\uDC2E\\uDC40\\uDC72-\\uDC8F]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC00-\\uDC6E\\uDC80-\\uDD43]|[\\uD80C\\uD81C-\\uD820\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDED0-\\uDEED\\uDF00-\\uDF2F\\uDF40-\\uDF43\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50\\uDF93-\\uDF9F\\uDFE0]|\\uD821[\\uDC00-\\uDFEC]|\\uD822[\\uDC00-\\uDEF2]|\\uD82C[\\uDC00\\uDC01]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB]|\\uD83A[\\uDC00-\\uDCC4\\uDD00-\\uDD43]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D])';

// ID_Continue (includes Other_ID_Continue)
const UnicodeIDContinue = '(?:[$0-9A-Z_a-z\\xAA\\xB5\\xB7\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B4\\u08B6-\\u08BD\\u08D4-\\u08E1\\u08E3-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0AF9\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58-\\u0C5A\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C80-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D54-\\u0D57\\u0D5F-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1369-\\u1371\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19DA\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1C80-\\u1C88\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFB-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2118-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AE\\uA7B0-\\uA7B7\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C5\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA8FD\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2F\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]|\\uD800[\\uDC00-\\uDC0B\\uDC0D-\\uDC26\\uDC28-\\uDC3A\\uDC3C\\uDC3D\\uDC3F-\\uDC4D\\uDC50-\\uDC5D\\uDC80-\\uDCFA\\uDD40-\\uDD74\\uDDFD\\uDE80-\\uDE9C\\uDEA0-\\uDED0\\uDEE0\\uDF00-\\uDF1F\\uDF30-\\uDF4A\\uDF50-\\uDF7A\\uDF80-\\uDF9D\\uDFA0-\\uDFC3\\uDFC8-\\uDFCF\\uDFD1-\\uDFD5]|\\uD801[\\uDC00-\\uDC9D\\uDCA0-\\uDCA9\\uDCB0-\\uDCD3\\uDCD8-\\uDCFB\\uDD00-\\uDD27\\uDD30-\\uDD63\\uDE00-\\uDF36\\uDF40-\\uDF55\\uDF60-\\uDF67]|\\uD802[\\uDC00-\\uDC05\\uDC08\\uDC0A-\\uDC35\\uDC37\\uDC38\\uDC3C\\uDC3F-\\uDC55\\uDC60-\\uDC76\\uDC80-\\uDC9E\\uDCE0-\\uDCF2\\uDCF4\\uDCF5\\uDD00-\\uDD15\\uDD20-\\uDD39\\uDD80-\\uDDB7\\uDDBE\\uDDBF\\uDE00-\\uDE03\\uDE05\\uDE06\\uDE0C-\\uDE13\\uDE15-\\uDE17\\uDE19-\\uDE33\\uDE38-\\uDE3A\\uDE3F\\uDE60-\\uDE7C\\uDE80-\\uDE9C\\uDEC0-\\uDEC7\\uDEC9-\\uDEE6\\uDF00-\\uDF35\\uDF40-\\uDF55\\uDF60-\\uDF72\\uDF80-\\uDF91]|\\uD803[\\uDC00-\\uDC48\\uDC80-\\uDCB2\\uDCC0-\\uDCF2]|\\uD804[\\uDC00-\\uDC46\\uDC66-\\uDC6F\\uDC7F-\\uDCBA\\uDCD0-\\uDCE8\\uDCF0-\\uDCF9\\uDD00-\\uDD34\\uDD36-\\uDD3F\\uDD50-\\uDD73\\uDD76\\uDD80-\\uDDC4\\uDDCA-\\uDDCC\\uDDD0-\\uDDDA\\uDDDC\\uDE00-\\uDE11\\uDE13-\\uDE37\\uDE3E\\uDE80-\\uDE86\\uDE88\\uDE8A-\\uDE8D\\uDE8F-\\uDE9D\\uDE9F-\\uDEA8\\uDEB0-\\uDEEA\\uDEF0-\\uDEF9\\uDF00-\\uDF03\\uDF05-\\uDF0C\\uDF0F\\uDF10\\uDF13-\\uDF28\\uDF2A-\\uDF30\\uDF32\\uDF33\\uDF35-\\uDF39\\uDF3C-\\uDF44\\uDF47\\uDF48\\uDF4B-\\uDF4D\\uDF50\\uDF57\\uDF5D-\\uDF63\\uDF66-\\uDF6C\\uDF70-\\uDF74]|\\uD805[\\uDC00-\\uDC4A\\uDC50-\\uDC59\\uDC80-\\uDCC5\\uDCC7\\uDCD0-\\uDCD9\\uDD80-\\uDDB5\\uDDB8-\\uDDC0\\uDDD8-\\uDDDD\\uDE00-\\uDE40\\uDE44\\uDE50-\\uDE59\\uDE80-\\uDEB7\\uDEC0-\\uDEC9\\uDF00-\\uDF19\\uDF1D-\\uDF2B\\uDF30-\\uDF39]|\\uD806[\\uDCA0-\\uDCE9\\uDCFF\\uDEC0-\\uDEF8]|\\uD807[\\uDC00-\\uDC08\\uDC0A-\\uDC36\\uDC38-\\uDC40\\uDC50-\\uDC59\\uDC72-\\uDC8F\\uDC92-\\uDCA7\\uDCA9-\\uDCB6]|\\uD808[\\uDC00-\\uDF99]|\\uD809[\\uDC00-\\uDC6E\\uDC80-\\uDD43]|[\\uD80C\\uD81C-\\uD820\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD80D[\\uDC00-\\uDC2E]|\\uD811[\\uDC00-\\uDE46]|\\uD81A[\\uDC00-\\uDE38\\uDE40-\\uDE5E\\uDE60-\\uDE69\\uDED0-\\uDEED\\uDEF0-\\uDEF4\\uDF00-\\uDF36\\uDF40-\\uDF43\\uDF50-\\uDF59\\uDF63-\\uDF77\\uDF7D-\\uDF8F]|\\uD81B[\\uDF00-\\uDF44\\uDF50-\\uDF7E\\uDF8F-\\uDF9F\\uDFE0]|\\uD821[\\uDC00-\\uDFEC]|\\uD822[\\uDC00-\\uDEF2]|\\uD82C[\\uDC00\\uDC01]|\\uD82F[\\uDC00-\\uDC6A\\uDC70-\\uDC7C\\uDC80-\\uDC88\\uDC90-\\uDC99\\uDC9D\\uDC9E]|\\uD834[\\uDD65-\\uDD69\\uDD6D-\\uDD72\\uDD7B-\\uDD82\\uDD85-\\uDD8B\\uDDAA-\\uDDAD\\uDE42-\\uDE44]|\\uD835[\\uDC00-\\uDC54\\uDC56-\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDEA5\\uDEA8-\\uDEC0\\uDEC2-\\uDEDA\\uDEDC-\\uDEFA\\uDEFC-\\uDF14\\uDF16-\\uDF34\\uDF36-\\uDF4E\\uDF50-\\uDF6E\\uDF70-\\uDF88\\uDF8A-\\uDFA8\\uDFAA-\\uDFC2\\uDFC4-\\uDFCB\\uDFCE-\\uDFFF]|\\uD836[\\uDE00-\\uDE36\\uDE3B-\\uDE6C\\uDE75\\uDE84\\uDE9B-\\uDE9F\\uDEA1-\\uDEAF]|\\uD838[\\uDC00-\\uDC06\\uDC08-\\uDC18\\uDC1B-\\uDC21\\uDC23\\uDC24\\uDC26-\\uDC2A]|\\uD83A[\\uDC00-\\uDCC4\\uDCD0-\\uDCD6\\uDD00-\\uDD4A\\uDD50-\\uDD59]|\\uD83B[\\uDE00-\\uDE03\\uDE05-\\uDE1F\\uDE21\\uDE22\\uDE24\\uDE27\\uDE29-\\uDE32\\uDE34-\\uDE37\\uDE39\\uDE3B\\uDE42\\uDE47\\uDE49\\uDE4B\\uDE4D-\\uDE4F\\uDE51\\uDE52\\uDE54\\uDE57\\uDE59\\uDE5B\\uDE5D\\uDE5F\\uDE61\\uDE62\\uDE64\\uDE67-\\uDE6A\\uDE6C-\\uDE72\\uDE74-\\uDE77\\uDE79-\\uDE7C\\uDE7E\\uDE80-\\uDE89\\uDE8B-\\uDE9B\\uDEA1-\\uDEA3\\uDEA5-\\uDEA9\\uDEAB-\\uDEBB]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D]|\\uDB40[\\uDD00-\\uDDEF])';

var UnicodeIdentifiers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  UnicodeIDContinue: UnicodeIDContinue,
  UnicodeIDStart: UnicodeIDStart
});

CFG.win = {
  openDatabase: nodeWebSQL
};

/**
 * @param {import('./setGlobalVars.js').ShimmedObject} idb
 * @param {import('./CFG.js').default} initialConfig
 * @returns {{}|Window}
 */
const __setGlobalVars = function (idb, initialConfig = {}) {
  const obj = setGlobalVars(idb, {
    fs: fs$1,
    ...initialConfig
  });
  /* istanbul ignore next -- TS guard */
  if (!obj.shimIndexedDB) {
    return obj;
  }
  obj.shimIndexedDB.__setUnicodeIdentifiers(UnicodeIdentifiers);
  return obj;
};

module.exports = __setGlobalVars;
//# sourceMappingURL=indexeddbshim-UnicodeIdentifiers-node.cjs.map
