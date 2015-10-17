/**
 * rome - Customizable date (and time) picker. Opt-in UI, no jQuery!
 * @version v2.0.0
 * @link https://github.com/bevacqua/rome
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.rome=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(_dereq_,module,exports){
module.exports = _dereq_('./src/contra.emitter.js');

},{"./src/contra.emitter.js":3}],3:[function(_dereq_,module,exports){
(function (process){
(function (root, undefined) {
  'use strict';

  var undef = '' + undefined;
  function atoa (a, n) { return Array.prototype.slice.call(a, n); }
  function debounce (fn, args, ctx) { if (!fn) { return; } tick(function run () { fn.apply(ctx || null, args || []); }); }

  // cross-platform ticker
  var si = typeof setImmediate === 'function', tick;
  if (si) {
    tick = function (fn) { setImmediate(fn); };
  } else if (typeof process !== undef && process.nextTick) {
    tick = process.nextTick;
  } else {
    tick = function (fn) { setTimeout(fn, 0); };
  }

  function _emitter (thing, options) {
    var opts = options || {};
    var evt = {};
    if (thing === undefined) { thing = {}; }
    thing.on = function (type, fn) {
      if (!evt[type]) {
        evt[type] = [fn];
      } else {
        evt[type].push(fn);
      }
      return thing;
    };
    thing.once = function (type, fn) {
      fn._once = true; // thing.off(fn) still works!
      thing.on(type, fn);
      return thing;
    };
    thing.off = function (type, fn) {
      var c = arguments.length;
      if (c === 1) {
        delete evt[type];
      } else if (c === 0) {
        evt = {};
      } else {
        var et = evt[type];
        if (!et) { return thing; }
        et.splice(et.indexOf(fn), 1);
      }
      return thing;
    };
    thing.emit = function () {
      var args = atoa(arguments);
      return thing.emitterSnapshot(args.shift()).apply(this, args);
    };
    thing.emitterSnapshot = function (type) {
      var et = (evt[type] || []).slice(0);
      return function () {
        var args = atoa(arguments);
        var ctx = this || thing;
        if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
        evt[type] = et.filter(function emitter (listen) {
          if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
          return !listen._once;
        });
        return thing;
      };
    }
    return thing;
  }

  // cross-platform export
  if (typeof module !== undef && module.exports) {
    module.exports = _emitter;
  } else {
    root.contra = root.contra || {};
    root.contra.emitter = _emitter;
  }
})(this);

}).call(this,_dereq_("FWaASH"))
},{"FWaASH":1}],4:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var debounce = _dereq_('lodash.debounce'),
    isFunction = _dereq_('lodash.isfunction'),
    isObject = _dereq_('lodash.isobject');

/** Used as an internal `_.debounce` options object */
var debounceOptions = {
  'leading': false,
  'maxWait': 0,
  'trailing': false
};

/**
 * Creates a function that, when executed, will only call the `func` function
 * at most once per every `wait` milliseconds. Provide an options object to
 * indicate that `func` should be invoked on the leading and/or trailing edge
 * of the `wait` timeout. Subsequent calls to the throttled function will
 * return the result of the last `func` call.
 *
 * Note: If `leading` and `trailing` options are `true` `func` will be called
 * on the trailing edge of the timeout only if the the throttled function is
 * invoked more than once during the `wait` timeout.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to throttle.
 * @param {number} wait The number of milliseconds to throttle executions to.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // avoid excessively updating the position while scrolling
 * var throttled = _.throttle(updatePosition, 100);
 * jQuery(window).on('scroll', throttled);
 *
 * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
 * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
 *   'trailing': false
 * }));
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError;
  }
  if (options === false) {
    leading = false;
  } else if (isObject(options)) {
    leading = 'leading' in options ? options.leading : leading;
    trailing = 'trailing' in options ? options.trailing : trailing;
  }
  debounceOptions.leading = leading;
  debounceOptions.maxWait = wait;
  debounceOptions.trailing = trailing;

  return debounce(func, wait, debounceOptions);
}

module.exports = throttle;

},{"lodash.debounce":5,"lodash.isfunction":8,"lodash.isobject":9}],5:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = _dereq_('lodash.isfunction'),
    isObject = _dereq_('lodash.isobject'),
    now = _dereq_('lodash.now');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates a function that will delay the execution of `func` until after
 * `wait` milliseconds have elapsed since the last time it was invoked.
 * Provide an options object to indicate that `func` should be invoked on
 * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
 * to the debounced function will return the result of the last `func` call.
 *
 * Note: If `leading` and `trailing` options are `true` `func` will be called
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * var lazyLayout = _.debounce(calculateLayout, 150);
 * jQuery(window).on('resize', lazyLayout);
 *
 * // execute `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * });
 *
 * // ensure `batchLog` is executed once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * source.addEventListener('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }, false);
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError;
  }
  wait = nativeMax(0, wait) || 0;
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }
  var delayed = function() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  };

  var maxDelayed = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  };

  return function() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  };
}

module.exports = debounce;

},{"lodash.isfunction":8,"lodash.isobject":9,"lodash.now":6}],6:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = _dereq_('lodash._isnative');

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var stamp = _.now();
 * _.defer(function() { console.log(_.now() - stamp); });
 * // => logs the number of milliseconds it took for the deferred function to be called
 */
var now = isNative(now = Date.now) && now || function() {
  return new Date().getTime();
};

module.exports = now;

},{"lodash._isnative":7}],7:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],8:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],9:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = _dereq_('lodash._objecttypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"lodash._objecttypes":10}],10:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],11:[function(_dereq_,module,exports){
var now = _dereq_('performance-now')
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
  , isNative = true

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  isNative = false

  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  if(!isNative) {
    return raf.call(global, fn)
  }
  return raf.call(global, function() {
    try{
      fn.apply(this, arguments)
    } catch(e) {
      setTimeout(function() { throw e }, 0)
    }
  })
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

},{"performance-now":12}],12:[function(_dereq_,module,exports){
(function (process){
// Generated by CoffeeScript 1.6.3
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/*
//@ sourceMappingURL=performance-now.map
*/

}).call(this,_dereq_("FWaASH"))
},{"FWaASH":1}],13:[function(_dereq_,module,exports){
'use strict';

var isInput = _dereq_('./isInput');
var bindings = {};

function has (source, target) {
  var binding = bindings[source.id];
  return binding && binding[target.id];
}

function insert (source, target) {
  var binding = bindings[source.id];
  if (!binding) {
    binding = bindings[source.id] = {};
  }
  var invalidate = invalidator(target);
  binding[target.id] = invalidate;
  source.on('data', invalidate);
  source.on('destroyed', remove.bind(null, source, target));
}

function remove (source, target) {
  var binding = bindings[source.id];
  if (!binding) {
    return;
  }
  var invalidate = binding[target.id];
  source.off('data', invalidate);
  delete binding[target.id];
}

function invalidator (target) {
  return function invalidate () {
    target.refresh();
  };
}

function add (source, target) {
  if (isInput(target.associated) || has(source, target)) {
    return;
  }
  insert(source, target);
}

module.exports = {
  add: add,
  remove: remove
};

},{"./isInput":24}],14:[function(_dereq_,module,exports){
'use strict';

var emitter = _dereq_('contra.emitter');
var raf = _dereq_('raf');
var dom = _dereq_('./dom');
var text = _dereq_('./text');
var parse = _dereq_('./parse');
var clone = _dereq_('./clone');
var defaults = _dereq_('./defaults');
var momentum = _dereq_('./momentum');
var classes = _dereq_('./classes');
var events = _dereq_('./events');
var noop = _dereq_('./noop');
var no;

function calendar (calendarOptions) {
  var o;
  var api = emitter({});
  var ref;
  var refCal;
  var container;
  var rendered = false;

  // date variables
  var monthOffsetAttribute = 'data-rome-offset';
  var weekdays;
  var weekdayCount;
  var calendarMonths = [];
  var lastYear;
  var lastMonth;
  var lastDay;
  var lastDayElement;
  var datewrapper;
  var back;
  var next;

  // time variables
  var secondsInDay = 60 * 60 * 24;
  var time;
  var timelist;

  init();
  raf(ready);

  return api;

  function napi () { return api; }

  function init (initOptions) {
    o = defaults(initOptions || calendarOptions, api);
    if (!container) { container = dom({ className: o.styles.container }); }
    weekdays = o.weekdayFormat;
    weekdayCount = weekdays.length;
    lastMonth = no;
    lastYear = no;
    lastDay = no;
    lastDayElement = no;
    o.appendTo.appendChild(container);

    removeChildren(container);
    rendered = false;
    ref = o.initialValue ? o.initialValue : momentum.moment();
    refCal = ref.clone();

    api.container = container;
    api.destroyed = false;
    api.destroy = destroy.bind(api, false);
    api.emitValues = emitValues;
    api.getDate = getDate;
    api.getDateString = getDateString;
    api.getMoment = getMoment;
    api.hide = hide;
    api.options = changeOptions;
    api.options.reset = resetOptions;
    api.refresh = refresh;
    api.restore = napi;
    api.setValue = setValue;
    api.show = show;

    if (o._input !== true) {
      show();
    }

    eventListening();
    ready();

    return api;
  }

  function ready () {
    api.emit('ready', clone(o));
  }

  function destroy (silent) {
    if (container) {
      container.parentNode.removeChild(container);
    }

    if (o) {
      eventListening(true);
    }

    var destroyed = api.emitterSnapshot('destroyed');
    api.destroyed = true;
    api.destroy = napi;
    api.emitValues = napi;
    api.getDate = noop;
    api.getDateString = noop;
    api.getMoment = noop;
    api.hide = napi;
    api.options = napi;
    api.options.reset = napi;
    api.refresh = napi;
    api.restore = init;
    api.setValue = napi;
    api.show = napi;
    api.off();

    if (silent !== true) {
      destroyed();
    }

    return api;
  }

  function eventListening (remove) {
    var op = remove ? 'remove' : 'add';
    if (o.autoHideOnBlur) { events[op](document.documentElement, 'focus', hideOnBlur, true); }
    if (o.autoHideOnClick) { events[op](document, 'click', hideOnClick); }
  }

  function changeOptions (options) {
    if (arguments.length === 0) {
      return clone(o);
    }
    destroy();
    init(options);
    return api;
  }

  function resetOptions () {
    return changeOptions({});
  }

  function render () {
    if (rendered) {
      return;
    }
    rendered = true;
    renderDates();
    renderTime();
    api.emit('render');
  }

  function renderDates () {
    if (!o.date) {
      return;
    }
    var i;
    calendarMonths = [];

    datewrapper = dom({ className: o.styles.date, parent: container });

    for (i = 0; i < o.monthsInCalendar; i++) {
      renderMonth(i);
    }

    events.add(back, 'click', subtractMonth);
    events.add(next, 'click', addMonth);
    events.add(datewrapper, 'click', pickDay);

    function renderMonth (i) {
      var month = dom({ className: o.styles.month, parent: datewrapper });
      if (i === 0) {
        back = dom({ type: 'button', className: o.styles.back, attributes: { type: 'button' }, parent: month });
      }
      if (i === o.monthsInCalendar -1) {
        next = dom({ type: 'button', className: o.styles.next, attributes: { type: 'button' }, parent: month });
      }
      var label = dom({ className: o.styles.monthLabel, parent: month });
      var date = dom({ type: 'table', className: o.styles.dayTable, parent: month });
      var datehead = dom({ type: 'thead', className: o.styles.dayHead, parent: date });
      var dateheadrow = dom({ type: 'tr', className: o.styles.dayRow, parent: datehead });
      var datebody = dom({ type: 'tbody', className: o.styles.dayBody, parent: date });
      var j;

      for (j = 0; j < weekdayCount; j++) {
        dom({ type: 'th', className: o.styles.dayHeadElem, parent: dateheadrow, text: weekdays[weekday(j)] });
      }

      datebody.setAttribute(monthOffsetAttribute, i);
      calendarMonths.push({
        label: label,
        body: datebody
      });
    }
  }

  function renderTime () {
    if (!o.time || !o.timeInterval) {
      return;
    }
    var timewrapper = dom({ className: o.styles.time, parent: container });
    time = dom({ className: o.styles.selectedTime, parent: timewrapper, text: ref.format(o.timeFormat) });
    events.add(time, 'click', toggleTimeList);
    timelist = dom({ className: o.styles.timeList, parent: timewrapper });
    events.add(timelist, 'click', pickTime);
    var next = momentum.moment('00:00:00', 'HH:mm:ss');
    var latest = next.clone().add(1, 'days');
    while (next.isBefore(latest)) {
      dom({ className: o.styles.timeOption, parent: timelist, text: next.format(o.timeFormat) });
      next.add(o.timeInterval, 'seconds');
    }
  }

  function weekday (index, backwards) {
    var factor = backwards ? -1 : 1;
    var offset = index + o.weekStart * factor;
    if (offset >= weekdayCount || offset < 0) {
      offset += weekdayCount * -factor;
    }
    return offset;
  }

  function displayValidTimesOnly () {
    if (!o.time || !rendered) {
      return;
    }
    var times = timelist.children;
    var length = times.length;
    var date;
    var time;
    var item;
    var i;
    for (i = 0; i < length; i++) {
      item = times[i];
      time = momentum.moment(text(item), o.timeFormat);
      date = setTime(ref.clone(), time);
      item.style.display = isInRange(date, false, o.timeValidator) ? 'block' : 'none';
    }
  }

  function toggleTimeList (show) {
    var display = typeof show === 'boolean' ? show : timelist.style.display === 'none';
    if (display) {
      showTimeList();
    } else {
      hideTimeList();
    }
  }

  function showTimeList () { if (timelist) { timelist.style.display = 'block'; } }
  function hideTimeList () { if (timelist) { timelist.style.display = 'none'; } }
  function showCalendar () { container.style.display = 'inline-block'; api.emit('show'); }
  function hideCalendar () { container.style.display = 'none'; api.emit('hide'); }

  function show () {
    render();
    refresh();
    toggleTimeList(!o.date);
    showCalendar();
    return api;
  }

  function hide () {
    hideTimeList();
    raf(hideCalendar);
    return api;
  }

  function hideConditionally () {
    hideTimeList();

    var pos = classes.contains(container, o.styles.positioned);
    if (pos) {
      raf(hideCalendar);
    }
    return api;
  }

  function calendarEventTarget (e) {
    var target = e.target;
    if (target === api.associated) {
      return true;
    }
    while (target) {
      if (target === container) {
        return true;
      }
      target = target.parentNode;
    }
  }

  function hideOnBlur (e) {
    if (calendarEventTarget(e)) {
      return;
    }
    hideConditionally();
  }

  function hideOnClick (e) {
    if (calendarEventTarget(e)) {
      return;
    }
    hideConditionally();
  }

  function subtractMonth () { changeMonth('subtract'); }
  function addMonth () { changeMonth('add'); }
  function changeMonth (op) {
    var bound;
    var direction = op === 'add' ? -1 : 1;
    var offset = o.monthsInCalendar + direction * getMonthOffset(lastDayElement);
    refCal[op](offset, 'months');
    bound = inRange(refCal.clone());
    ref = bound || ref;
    if (bound) { refCal = bound.clone(); }
    update();
  }

  function update (silent) {
    updateCalendar();
    updateTime();
    if (silent !== true) { emitValues(); }
    displayValidTimesOnly();
  }

  function updateCalendar () {
    if (!o.date || !rendered) {
      return;
    }
    var y = refCal.year();
    var m = refCal.month();
    var d = refCal.date();
    if (d === lastDay && m === lastMonth && y === lastYear) {
      return;
    }
    var canStay = isDisplayed();
    lastDay = refCal.date();
    lastMonth = refCal.month();
    lastYear = refCal.year();
    if (canStay) { updateCalendarSelection(); return; }
    calendarMonths.forEach(updateMonth);
    renderAllDays();

    function updateMonth (month, i) {
      var offsetCal = refCal.clone().add(i, 'months');
      text(month.label, offsetCal.format(o.monthFormat));
      removeChildren(month.body);
    }
  }

  function updateCalendarSelection () {
    var day = refCal.date() - 1;
    selectDayElement(false);
    calendarMonths.forEach(function (cal) {
      var days;
      if (sameCalendarMonth(cal.date, refCal)) {
        days = cast(cal.body.children).map(aggregate);
        days = Array.prototype.concat.apply([], days).filter(inside);
        selectDayElement(days[day]);
      }
    });

    function cast (like) {
      var dest = [];
      var i;
      for (i = 0; i < like.length; i++) {
        dest.push(like[i]);
      }
      return dest;
    }

    function aggregate (child) {
      return cast(child.children);
    }

    function inside (child) {
      return !classes.contains(child, o.styles.dayPrevMonth) &&
             !classes.contains(child, o.styles.dayNextMonth);
    }
  }

  function isDisplayed () {
    return calendarMonths.some(matches);

    function matches (cal) {
      if (!lastYear) { return false; }
      return sameCalendarMonth(cal.date, refCal);
    }
  }

  function sameCalendarMonth (left, right) {
    return left && right && left.year() === right.year() && left.month() === right.month();
  }

  function updateTime () {
    if (!o.time || !rendered) {
      return;
    }
    text(time, ref.format(o.timeFormat));
  }

  function emitValues () {
    api.emit('data', getDateString());
    api.emit('year', ref.year());
    api.emit('month', ref.month());
    api.emit('day', ref.day());
    api.emit('time', ref.format(o.timeFormat));
    return api;
  }

  function refresh () {
    lastYear = false;
    lastMonth = false;
    lastDay = false;
    update(true);
    return api;
  }

  function setValue (value) {
    var date = parse(value, o.inputFormat);
    if (date === null) {
      return;
    }
    ref = inRange(date) || ref;
    refCal = ref.clone();
    update(true);

    return api;
  }

  function removeChildren (elem, self) {
    while (elem && elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    if (self === true) {
      elem.parentNode.removeChild(elem);
    }
  }

  function renderAllDays () {
    var i;
    for (i = 0; i < o.monthsInCalendar; i++) {
      renderDays(i);
    }
  }

  function renderDays (offset) {
    var month = calendarMonths[offset];
    var offsetCal = refCal.clone().add(offset, 'months');
    var total = offsetCal.daysInMonth();
    var current = offsetCal.month() !== ref.month() ? -1 : ref.date(); // -1 : 1..31
    var first = offsetCal.clone().date(1);
    var firstDay = weekday(first.day(), true); // 0..6
    var tr = dom({ type: 'tr', className: o.styles.dayRow, parent: month.body });
    var prevMonth = hiddenWhen(offset !== 0, [o.styles.dayBodyElem, o.styles.dayPrevMonth]);
    var nextMonth = hiddenWhen(offset !== o.monthsInCalendar - 1, [o.styles.dayBodyElem, o.styles.dayNextMonth]);
    var disabled = o.styles.dayDisabled;
    var lastDay;

    part({
      base: first.clone().subtract(firstDay, 'days'),
      length: firstDay,
      cell: prevMonth
    });

    part({
      base: first.clone(),
      length: total,
      cell: [o.styles.dayBodyElem],
      selectable: true
    });

    lastDay = first.clone().add(total, 'days');

    part({
      base: lastDay,
      length: weekdayCount - tr.children.length,
      cell: nextMonth
    });

    back.disabled = !isInRangeLeft(first, true);
    next.disabled = !isInRangeRight(lastDay, true);
    month.date = offsetCal.clone();

    function part (data) {
      var i, day, node;
      for (i = 0; i < data.length; i++) {
        if (tr.children.length === weekdayCount) {
          tr = dom({ type: 'tr', className: o.styles.dayRow, parent: month.body });
        }
        day = data.base.clone().add(i, 'days');
        node = dom({
          type: 'td',
          parent: tr,
          text: day.format(o.dayFormat),
          className: validationTest(day, data.cell.join(' ').split(' ')).join(' ')
        });
        if (data.selectable && day.date() === current) {
          selectDayElement(node);
        }
      }
    }

    function validationTest (day, cell) {
      if (!isInRange(day, true, o.dateValidator)) { cell.push(disabled); }
      return cell;
    }

    function hiddenWhen (value, cell) {
      if (value) { cell.push(o.styles.dayConcealed); }
      return cell;
    }
  }

  function isInRange (date, allday, validator) {
    if (!isInRangeLeft(date, allday)) {
      return false;
    }
    if (!isInRangeRight(date, allday)) {
      return false;
    }
    var valid = (validator || Function.prototype).call(api, date.toDate());
    return valid !== false;
  }

  function isInRangeLeft (date, allday) {
    var min = !o.min ? false : (allday ? o.min.clone().startOf('day') : o.min);
    return !min || !date.isBefore(min);
  }

  function isInRangeRight (date, allday) {
    var max = !o.max ? false : (allday ? o.max.clone().endOf('day') : o.max);
    return !max || !date.isAfter(max);
  }

  function inRange (date) {
    if (o.min && date.isBefore(o.min)) {
      return inRange(o.min.clone());
    } else if (o.max && date.isAfter(o.max)) {
      return inRange(o.max.clone());
    }
    var value = date.clone().subtract(1, 'days');
    if (validateTowards(value, date, 'add')) {
      return inTimeRange(value);
    }
    value = date.clone();
    if (validateTowards(value, date, 'subtract')) {
      return inTimeRange(value);
    }
  }

  function inTimeRange (value) {
    var copy = value.clone().subtract(o.timeInterval, 'seconds');
    var times = Math.ceil(secondsInDay / o.timeInterval);
    var i;
    for (i = 0; i < times; i++) {
      copy.add(o.timeInterval, 'seconds');
      if (copy.date() > value.date()) {
        copy.subtract(1, 'days');
      }
      if (o.timeValidator.call(api, copy.toDate()) !== false) {
        return copy;
      }
    }
  }

  function validateTowards (value, date, op) {
    var valid = false;
    while (valid === false) {
      value[op](1, 'days');
      if (value.month() !== date.month()) {
        break;
      }
      valid = o.dateValidator.call(api, value.toDate());
    }
    return valid !== false;
  }

  function pickDay (e) {
    var target = e.target;
    if (classes.contains(target, o.styles.dayDisabled) || !classes.contains(target, o.styles.dayBodyElem)) {
      return;
    }
    var day = parseInt(text(target), 10);
    var prev = classes.contains(target, o.styles.dayPrevMonth);
    var next = classes.contains(target, o.styles.dayNextMonth);
    var offset = getMonthOffset(target) - getMonthOffset(lastDayElement);
    ref.add(offset, 'months');
    if (prev || next) {
      ref.add(prev ? -1 : 1, 'months');
    }
    selectDayElement(target);
    ref.date(day); // must run after setting the month
    setTime(ref, inRange(ref) || ref);
    refCal = ref.clone();
    if (o.autoClose) { hideConditionally(); }
    update();
  }

  function selectDayElement (node) {
    if (lastDayElement) {
      classes.remove(lastDayElement, o.styles.selectedDay);
    }
    if (node) {
      classes.add(node, o.styles.selectedDay);
    }
    lastDayElement = node;
  }

  function getMonthOffset (elem) {
    var offset;
    while (elem && elem.getAttribute) {
      offset = elem.getAttribute(monthOffsetAttribute);
      if (typeof offset === 'string') {
        return parseInt(offset, 10);
      }
      elem = elem.parentNode;
    }
    return 0;
  }

  function setTime (to, from) {
    to.hour(from.hour()).minute(from.minute()).second(from.second());
    return to;
  }

  function pickTime (e) {
    var target = e.target;
    if (!classes.contains(target, o.styles.timeOption)) {
      return;
    }
    var value = momentum.moment(text(target), o.timeFormat);
    setTime(ref, value);
    refCal = ref.clone();
    emitValues();
    updateTime();
    if (!o.date && o.autoClose) {
      hideConditionally();
    } else {
      hideTimeList();
    }
  }

  function getDate () {
    return ref.toDate();
  }

  function getDateString (format) {
    return ref.format(format || o.inputFormat);
  }

  function getMoment () {
    return ref.clone();
  }
}

module.exports = calendar;

},{"./classes":15,"./clone":16,"./defaults":18,"./dom":19,"./events":20,"./momentum":25,"./noop":26,"./parse":27,"./text":39,"contra.emitter":2,"raf":11}],15:[function(_dereq_,module,exports){
'use strict';

var trim = /^\s+|\s+$/g;
var whitespace = /\s+/;

function classes (node) {
  return node.className.replace(trim, '').split(whitespace);
}

function set (node, value) {
  node.className = value.join(' ');
}

function add (node, value) {
  var values = remove(node, value);
  values.push(value);
  set(node, values);
}

function remove (node, value) {
  var values = classes(node);
  var i = values.indexOf(value);
  if (i !== -1) {
    values.splice(i, 1);
    set(node, values);
  }
  return values;
}

function contains (node, value) {
  return classes(node).indexOf(value) !== -1;
}

module.exports = {
  add: add,
  remove: remove,
  contains: contains
};

},{}],16:[function(_dereq_,module,exports){
'use strict';

var momentum = _dereq_('./momentum');

// naïve implementation, specifically meant to clone `options` objects
function clone (thing) {
  var copy = {};
  var value;

  for (var key in thing) {
    value = thing[key];

    if (!value) {
      copy[key] = value;
    } else if (momentum.isMoment(value)) {
      copy[key] = value.clone();
    } else if (value._isStylesConfiguration) {
      copy[key] = clone(value);
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

module.exports = clone;

},{"./momentum":25}],17:[function(_dereq_,module,exports){
'use strict';

var index = _dereq_('./index');
var input = _dereq_('./input');
var inline = _dereq_('./inline');
var isInput = _dereq_('./isInput');

function core (elem, options) {
  var cal;
  var existing = index.find(elem);
  if (existing) {
    return existing;
  }

  if (isInput(elem)) {
    cal = input(elem, options);
  } else {
    cal = inline(elem, options);
  }
  cal.associated = elem;
  index.assign(elem, cal);

  return cal;
}

module.exports = core;

},{"./index":21,"./inline":22,"./input":23,"./isInput":24}],18:[function(_dereq_,module,exports){
'use strict';

var parse = _dereq_('./parse');
var isInput = _dereq_('./isInput');
var momentum = _dereq_('./momentum');

function defaults (options, cal) {
  var temp;
  var no;
  var o = options || {};
  if (o.autoHideOnClick === no) { o.autoHideOnClick = true; }
  if (o.autoHideOnBlur === no) { o.autoHideOnBlur = true; }
  if (o.autoClose === no) { o.autoClose = true; }
  if (o.appendTo === no) { o.appendTo = document.body; }
  if (o.appendTo === 'parent') {
    if (isInput(cal.associated)) {
      o.appendTo = cal.associated.parentNode;
    } else {
      throw new Error('Inline calendars must be appended to a parent node explicitly.');
    }
  }
  if (o.invalidate === no) { o.invalidate = true; }
  if (o.required === no) { o.required = false; }
  if (o.date === no) { o.date = true; }
  if (o.time === no) { o.time = true; }
  if (o.date === false && o.time === false) { throw new Error('At least one of `date` or `time` must be `true`.'); }
  if (o.inputFormat === no) {
    if (o.date && o.time) {
      o.inputFormat = 'YYYY-MM-DD HH:mm';
    } else if (o.date) {
      o.inputFormat = 'YYYY-MM-DD';
    } else {
      o.inputFormat = 'HH:mm';
    }
  }
  if (o.initialValue === no) {
    o.initialValue = null;
  } else {
    o.initialValue = parse(o.initialValue, o.inputFormat);
  }
  if (o.min === no) { o.min = null; } else { o.min = parse(o.min, o.inputFormat); }
  if (o.max === no) { o.max = null; } else { o.max = parse(o.max, o.inputFormat); }
  if (o.timeInterval === no) { o.timeInterval = 60 * 30; } // 30 minutes by default
  if (o.min && o.max) {
    if (o.max.isBefore(o.min)) {
      temp = o.max;
      o.max = o.min;
      o.min = temp;
    }
    if (o.date === true) {
      if (o.max.clone().subtract(1, 'days').isBefore(o.min)) {
        throw new Error('`max` must be at least one day after `min`');
      }
    } else if (o.timeInterval * 1000 - o.min % (o.timeInterval * 1000) > o.max - o.min) {
      throw new Error('`min` to `max` range must allow for at least one time option that matches `timeInterval`');
    }
  }
  if (o.dateValidator === no) { o.dateValidator = Function.prototype; }
  if (o.timeValidator === no) { o.timeValidator = Function.prototype; }
  if (o.timeFormat === no) { o.timeFormat = 'HH:mm'; }
  if (o.weekStart === no) { o.weekStart = momentum.moment().weekday(0).day(); }
  if (o.weekdayFormat === no) { o.weekdayFormat = 'min'; }
  if (o.weekdayFormat === 'long') {
    o.weekdayFormat = momentum.moment.weekdays();
  } else if (o.weekdayFormat === 'short') {
    o.weekdayFormat = momentum.moment.weekdaysShort();
  } else if (o.weekdayFormat === 'min') {
    o.weekdayFormat = momentum.moment.weekdaysMin();
  } else if (!Array.isArray(o.weekdayFormat) || o.weekdayFormat.length < 7) {
    throw new Error('`weekdays` must be `min`, `short`, or `long`');
  }
  if (o.monthsInCalendar === no) { o.monthsInCalendar = 1; }
  if (o.monthFormat === no) { o.monthFormat = 'MMMM YYYY'; }
  if (o.dayFormat === no) { o.dayFormat = 'DD'; }
  if (o.styles === no) { o.styles = {}; }

  o.styles._isStylesConfiguration = true;

  var styl = o.styles;
  if (styl.back === no) { styl.back = 'rd-back'; }
  if (styl.container === no) { styl.container = 'rd-container'; }
  if (styl.positioned === no) { styl.positioned = 'rd-container-attachment'; }
  if (styl.date === no) { styl.date = 'rd-date'; }
  if (styl.dayBody === no) { styl.dayBody = 'rd-days-body'; }
  if (styl.dayBodyElem === no) { styl.dayBodyElem = 'rd-day-body'; }
  if (styl.dayPrevMonth === no) { styl.dayPrevMonth = 'rd-day-prev-month'; }
  if (styl.dayNextMonth === no) { styl.dayNextMonth = 'rd-day-next-month'; }
  if (styl.dayDisabled === no) { styl.dayDisabled = 'rd-day-disabled'; }
  if (styl.dayConcealed === no) { styl.dayConcealed = 'rd-day-concealed'; }
  if (styl.dayHead === no) { styl.dayHead = 'rd-days-head'; }
  if (styl.dayHeadElem === no) { styl.dayHeadElem = 'rd-day-head'; }
  if (styl.dayRow === no) { styl.dayRow = 'rd-days-row'; }
  if (styl.dayTable === no) { styl.dayTable = 'rd-days'; }
  if (styl.month === no) { styl.month = 'rd-month'; }
  if (styl.monthLabel === no) { styl.monthLabel = 'rd-month-label'; }
  if (styl.next === no) { styl.next = 'rd-next'; }
  if (styl.selectedDay === no) { styl.selectedDay = 'rd-day-selected'; }
  if (styl.selectedTime === no) { styl.selectedTime = 'rd-time-selected'; }
  if (styl.time === no) { styl.time = 'rd-time'; }
  if (styl.timeList === no) { styl.timeList = 'rd-time-list'; }
  if (styl.timeOption === no) { styl.timeOption = 'rd-time-option'; }

  return o;
}

module.exports = defaults;

},{"./isInput":24,"./momentum":25,"./parse":27}],19:[function(_dereq_,module,exports){
'use strict';

function dom (options) {
  var o = options || {};
  if (!o.type) { o.type = 'div'; }
  var elem = document.createElement(o.type);
  if (o.className) { elem.className = o.className; }
  if (o.text) { elem.innerText = elem.textContent = o.text; }
  if (o.attributes) {
    Object.keys(o.attributes).forEach(function(key) {
      elem.setAttribute(key, o.attributes[key]);
    });
  }
  if (o.parent) { o.parent.appendChild(elem); }
  return elem;
}

module.exports = dom;

},{}],20:[function(_dereq_,module,exports){
'use strict';

var addEvent = addEventEasy;
var removeEvent = removeEventEasy;

if (!window.addEventListener) {
  addEvent = addEventHard;
}

if (!window.removeEventListener) {
  removeEvent = removeEventHard;
}

function addEventEasy (element, evt, fn, capture) {
  return element.addEventListener(evt, fn, capture);
}

function addEventHard (element, evt, fn, capture) {
  return element.attachEvent('on' + evt, function (ae) {
    var e = ae || window.event;
    e.target = e.target || e.srcElement;
    e.preventDefault  = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    fn.call(element, e);
  }, capture);
}

function removeEventEasy (element, evt, fn) {
  return element.removeEventListener(evt, fn);
}

function removeEventHard (element, evt, fn) {
  return element.detachEvent('on' + evt, fn);
}

module.exports = {
  add: addEvent,
  remove: removeEvent
};

},{}],21:[function(_dereq_,module,exports){
'use strict';
var no;
var ikey = 'data-rome-id';
var index = [];

function find (thing) { // can be a DOM element or a number
  if (typeof thing !== 'number' && thing && thing.getAttribute) {
    return find(thing.getAttribute(ikey));
  }
  var existing = index[thing];
  if (existing !== no) {
    return existing;
  }
  return null;
}

function assign (elem, instance) {
  elem.setAttribute(ikey, instance.id = index.push(instance) - 1);
}

module.exports = {
  find: find,
  assign: assign
};

},{}],22:[function(_dereq_,module,exports){
'use strict';

var raf = _dereq_('raf');
var calendar = _dereq_('./calendar');

function inline (elem, calendarOptions) {
  var o = calendarOptions || {};

  o.appendTo = elem;

  var api = calendar(o)
    .on('ready', ready);

  function ready () {
    raf(api.show);
  }

  return api;
}

module.exports = inline;

},{"./calendar":14,"raf":11}],23:[function(_dereq_,module,exports){
'use strict';

var throttle = _dereq_('lodash.throttle');
var raf = _dereq_('raf');
var clone = _dereq_('./clone');
var defaults = _dereq_('./defaults');
var calendar = _dereq_('./calendar');
var momentum = _dereq_('./momentum');
var classes = _dereq_('./classes');
var events = _dereq_('./events');

function inputCalendar (input, calendarOptions) {
  var o;
  var api = calendar(asInput(calendarOptions));
  var throttledTakeInput = throttle(takeInput, 50);
  var throttledPosition = throttle(position, 30);
  var ignoreInvalidation;
  var ignoreShow;

  init(calendarOptions);

  return api;

  function asInput (options) {
    var o = options || {};
    o._input = true;
    return o;
  }

  function init (initOptions) {
    o = defaults(asInput(initOptions || calendarOptions), api);

    classes.add(api.container, o.styles.positioned);
    events.add(api.container, 'mousedown', containerMouseDown);
    events.add(api.container, 'click', containerClick);

    api.getDate = unrequire(api.getDate);
    api.getDateString = unrequire(api.getDateString);
    api.getMoment = unrequire(api.getMoment);

    if (o.initialValue) {
      input.value = o.initialValue.format(o.inputFormat);
    }

    api.on('data', updateInput);
    api.on('show', throttledPosition);

    eventListening();
    throttledTakeInput();
  }

  function destroy () {
    eventListening(true);
  }

  function eventListening (remove) {
    var op = remove ? 'remove' : 'add';
    events[op](input, 'click', show);
    events[op](input, 'touchend', show);
    events[op](input, 'focusin', show);
    events[op](input, 'change', throttledTakeInput);
    events[op](input, 'keypress', throttledTakeInput);
    events[op](input, 'keydown', throttledTakeInput);
    events[op](input, 'input', throttledTakeInput);
    if (o.invalidate) { events[op](input, 'blur', invalidateInput); }
    events[op](window, 'resize', throttledPosition);

    if (remove) {
      api.once('ready', init);
      api.off('destroyed', destroy);
    } else {
      api.off('ready', init);
      api.once('destroyed', destroy);
    }
  }

  function containerClick () {
    ignoreShow = true;
    input.focus();
    ignoreShow = false;
  }

  function containerMouseDown () {
    ignoreInvalidation = true;
    raf(unignore);

    function unignore () {
      ignoreInvalidation = false;
    }
  }

  function invalidateInput () {
    if (!ignoreInvalidation && !isEmpty()) {
      api.emitValues();
    }
  }

  function show () {
    if (ignoreShow) {
      return;
    }
    api.show();
  }

  function position () {
    var bounds = input.getBoundingClientRect();
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    api.container.style.top  = bounds.top + scrollTop + input.offsetHeight + 'px';
    api.container.style.left = bounds.left + 'px';
  }

  function takeInput () {
    var value = input.value.trim();
    if (isEmpty()) {
      return;
    }
    var date = momentum.moment(value, o.inputFormat);
    api.setValue(date);
  }

  function updateInput (data) {
    input.value = data;
  }

  function isEmpty () {
    return o.required === false && input.value.trim() === '';
  }

  function unrequire (fn) {
    return function maybe () {
      return isEmpty() ? null : fn.apply(this, arguments);
    };
  }
}

module.exports = inputCalendar;

},{"./calendar":14,"./classes":15,"./clone":16,"./defaults":18,"./events":20,"./momentum":25,"lodash.throttle":4,"raf":11}],24:[function(_dereq_,module,exports){
'use strict';

function isInput (elem) {
  return elem && elem.nodeName && elem.nodeName.toLowerCase() === 'input';
}

module.exports = isInput;

},{}],25:[function(_dereq_,module,exports){
'use strict';

function isMoment (value) {
  return value && Object.prototype.hasOwnProperty.call(value, '_isAMomentObject');
}

var api = {
  moment: null,
  isMoment: isMoment
};

module.exports = api;

},{}],26:[function(_dereq_,module,exports){
'use strict';

function noop () {}

module.exports = noop;

},{}],27:[function(_dereq_,module,exports){
'use strict';

var momentum = _dereq_('./momentum');

function raw (date, format) {
  if (typeof date === 'string') {
    return momentum.moment(date, format);
  }
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return momentum.moment(date);
  }
  if (momentum.isMoment(date)) {
    return date.clone();
  }
}

function parse (date, format) {
  var m = raw(date, typeof format === 'string' ? format : null);
  return m && m.isValid() ? m : null;
}

module.exports = parse;

},{"./momentum":25}],28:[function(_dereq_,module,exports){
'use strict';

if (!Array.prototype.filter) {
  Array.prototype.filter = function (fn, ctx) {
    var f = [];
    this.forEach(function (v, i, t) {
      if (fn.call(ctx, v, i, t)) { f.push(v); }
    }, ctx);
    return f;
  };
}

},{}],29:[function(_dereq_,module,exports){
'use strict';

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, ctx) {
    if (this === void 0 || this === null || typeof fn !== 'function') {
      throw new TypeError();
    }
    var t = this;
    var len = t.length;
    for (var i = 0; i < len; i++) {
      if (i in t) { fn.call(ctx, t[i], i, t); }
    }
  };
}

},{}],30:[function(_dereq_,module,exports){
'use strict';

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (what, start) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    var length = this.length;
    start = +start || 0;
    if (Math.abs(start) === Infinity) {
      start = 0;
    } else if (start < 0) {
      start += length;
      if (start < 0) { start = 0; }
    }
    for (; start < length; start++) {
      if (this[start] === what) {
        return start;
      }
    }
    return -1;
  };
}

},{}],31:[function(_dereq_,module,exports){
'use strict';

Array.isArray || (Array.isArray = function (a) {
  return '' + a !== a && Object.prototype.toString.call(a) === '[object Array]';
});

},{}],32:[function(_dereq_,module,exports){
'use strict';

if (!Array.prototype.map) {
  Array.prototype.map = function (fn, ctx) {
    var context, result, i;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var source = Object(this);
    var len = source.length >>> 0;

    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }

    if (arguments.length > 1) {
      context = ctx;
    }

    result = new Array(len);
    i = 0;

    while (i < len) {
      if (i in source) {
        result[i] = fn.call(context, source[i], i, source);
      }
      i++;
    }
    return result;
  };
}

},{}],33:[function(_dereq_,module,exports){
'use strict';

if (!Array.prototype.some) {
  Array.prototype.some = function (fn, ctx) {
    var context, i;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var source = Object(this);
    var len = source.length >>> 0;

    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }

    if (arguments.length > 1) {
      context = ctx;
    }

    i = 0;

    while (i < len) {
      if (i in source) {
        var test = fn.call(context, source[i], i, source);
        if (test) {
          return true;
        }
      }
      i++;
    }
    return false;
  };
}

},{}],34:[function(_dereq_,module,exports){
'use strict';

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var curried = Array.prototype.slice.call(arguments, 1);
    var original = this;
    var NoOp = function () {};
    var bound = function () {
      var ctx = this instanceof NoOp && context ? this : context;
      var args = curried.concat(Array.prototype.slice.call(arguments));
      return original.apply(ctx, args);
    };
    NoOp.prototype = this.prototype;
    bound.prototype = new NoOp();
    return bound;
  };
}

},{}],35:[function(_dereq_,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
var dontEnums = [
  'toString',
  'toLocaleString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'constructor'
];
var dontEnumsLength = dontEnums.length;

if (!Object.keys) {
  Object.keys = function(obj) {
    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
      throw new TypeError('Object.keys called on non-object');
    }

    var result = [], prop, i;

    for (prop in obj) {
      if (hasOwn.call(obj, prop)) {
        result.push(prop);
      }
    }

    if (hasDontEnumBug) {
      for (i = 0; i < dontEnumsLength; i++) {
        if (hasOwn.call(obj, dontEnums[i])) {
          result.push(dontEnums[i]);
        }
      }
    }
    return result;
  };
}

},{}],36:[function(_dereq_,module,exports){
'use strict';

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

},{}],37:[function(_dereq_,module,exports){
'use strict';

// these are only required for IE < 9
// maybe move to IE-specific distro?
_dereq_('./polyfills/function.bind');
_dereq_('./polyfills/array.foreach');
_dereq_('./polyfills/array.map');
_dereq_('./polyfills/array.filter');
_dereq_('./polyfills/array.isarray');
_dereq_('./polyfills/array.indexof');
_dereq_('./polyfills/array.some');
_dereq_('./polyfills/string.trim');
_dereq_('./polyfills/object.keys');

var core = _dereq_('./core');
var index = _dereq_('./index');
var use = _dereq_('./use');

core.use = use.bind(core);
core.find = index.find;
core.val = _dereq_('./validators');

module.exports = core;

},{"./core":17,"./index":21,"./polyfills/array.filter":28,"./polyfills/array.foreach":29,"./polyfills/array.indexof":30,"./polyfills/array.isarray":31,"./polyfills/array.map":32,"./polyfills/array.some":33,"./polyfills/function.bind":34,"./polyfills/object.keys":35,"./polyfills/string.trim":36,"./use":40,"./validators":41}],38:[function(_dereq_,module,exports){
(function (global){
var rome = _dereq_('./rome');
var momentum = _dereq_('./momentum');

rome.use(global.moment);

if (momentum.moment === void 0) {
  throw new Error('rome depends on moment.js, you can get it at http://momentjs.com, or you could use the bundled distribution file instead.');
}

module.exports = rome;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./momentum":25,"./rome":37}],39:[function(_dereq_,module,exports){
'use strict';

function text (elem, value) {
  if (arguments.length === 2) {
    elem.innerText = elem.textContent = value;
  }
  return elem.innerText || elem.textContent;
}

module.exports = text;

},{}],40:[function(_dereq_,module,exports){
'use strict';

var momentum = _dereq_('./momentum');

function use (moment) {
  this.moment = momentum.moment = moment;
}

module.exports = use;

},{"./momentum":25}],41:[function(_dereq_,module,exports){
'use strict';

var index = _dereq_('./index');
var parse = _dereq_('./parse');
var association = _dereq_('./association');

function compareBuilder (compare) {
  return function factory (value) {
    var fixed = parse(value);

    return function validate (date) {
      var cal = index.find(value);
      var left = parse(date);
      var right = fixed || cal && cal.getMoment();
      if (!right) {
        return true;
      }
      if (cal) {
        association.add(this, cal);
      }
      return compare(left, right);
    };
  };
}

function rangeBuilder (how, compare) {
  return function factory (start, end) {
    var dates;
    var len = arguments.length;

    if (Array.isArray(start)) {
      dates = start;
    } else {
      if (len === 1) {
        dates = [start];
      } else if (len === 2) {
        dates = [[start, end]];
      }
    }

    return function validate (date) {
      return dates.map(expand.bind(this))[how](compare.bind(this, date));
    };

    function expand (value) {
      var start, end;
      var cal = index.find(value);
      if (cal) {
        start = end = cal.getMoment();
      } else if (Array.isArray(value)) {
        start = value[0]; end = value[1];
      } else {
        start = end = value;
      }
      if (cal) {
        association.add(cal, this);
      }
      return {
        start: parse(start).startOf('day').toDate(),
        end: parse(end).endOf('day').toDate()
      };
    }
  };
}

var afterEq  = compareBuilder(function (left, right) { return left >= right; });
var after    = compareBuilder(function (left, right) { return left  > right; });
var beforeEq = compareBuilder(function (left, right) { return left <= right; });
var before   = compareBuilder(function (left, right) { return left  < right; });

var except   = rangeBuilder('every', function (left, right) { return right.start  > left || right.end  < left; });
var only     = rangeBuilder('some',  function (left, right) { return right.start <= left && right.end >= left; });

module.exports = {
  afterEq: afterEq,
  after: after,
  beforeEq: beforeEq,
  before: before,
  except: except,
  only: only
};

},{"./association":13,"./index":21,"./parse":27}]},{},[38])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWNvL2Rldi9yb21lL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvbm9kZV9tb2R1bGVzL2NvbnRyYS5lbWl0dGVyL2luZGV4LmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvbm9kZV9tb2R1bGVzL2NvbnRyYS5lbWl0dGVyL3NyYy9jb250cmEuZW1pdHRlci5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL25vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvaW5kZXguanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9ub2RlX21vZHVsZXMvbG9kYXNoLnRocm90dGxlL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9ub2RlX21vZHVsZXMvbG9kYXNoLnRocm90dGxlL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5ub3cvaW5kZXguanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9ub2RlX21vZHVsZXMvbG9kYXNoLnRocm90dGxlL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5ub3cvbm9kZV9tb2R1bGVzL2xvZGFzaC5faXNuYXRpdmUvaW5kZXguanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9ub2RlX21vZHVsZXMvbG9kYXNoLnRocm90dGxlL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNmdW5jdGlvbi9pbmRleC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL25vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc29iamVjdC9pbmRleC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL25vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc29iamVjdC9ub2RlX21vZHVsZXMvbG9kYXNoLl9vYmplY3R0eXBlcy9pbmRleC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL25vZGVfbW9kdWxlcy9yYWYvaW5kZXguanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9ub2RlX21vZHVsZXMvcmFmL25vZGVfbW9kdWxlcy9wZXJmb3JtYW5jZS1ub3cvbGliL3BlcmZvcm1hbmNlLW5vdy5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9hc3NvY2lhdGlvbi5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9jYWxlbmRhci5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9jbGFzc2VzLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL2Nsb25lLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL2NvcmUuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvZGVmYXVsdHMuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvZG9tLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL2V2ZW50cy5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9pbmxpbmUuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvaW5wdXQuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvaXNJbnB1dC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9tb21lbnR1bS5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9ub29wLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL3BhcnNlLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL3BvbHlmaWxscy9hcnJheS5maWx0ZXIuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvcG9seWZpbGxzL2FycmF5LmZvcmVhY2guanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvcG9seWZpbGxzL2FycmF5LmluZGV4b2YuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvcG9seWZpbGxzL2FycmF5LmlzYXJyYXkuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvcG9seWZpbGxzL2FycmF5Lm1hcC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9wb2x5ZmlsbHMvYXJyYXkuc29tZS5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9wb2x5ZmlsbHMvZnVuY3Rpb24uYmluZC5qcyIsIi9Vc2Vycy9uaWNvL2Rldi9yb21lL3NyYy9wb2x5ZmlsbHMvb2JqZWN0LmtleXMuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvcG9seWZpbGxzL3N0cmluZy50cmltLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL3JvbWUuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvcm9tZS5zdGFuZGFsb25lLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL3RleHQuanMiLCIvVXNlcnMvbmljby9kZXYvcm9tZS9zcmMvdXNlLmpzIiwiL1VzZXJzL25pY28vZGV2L3JvbWUvc3JjL3ZhbGlkYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNucEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3JjL2NvbnRyYS5lbWl0dGVyLmpzJyk7XG4iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuKGZ1bmN0aW9uIChyb290LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB1bmRlZiA9ICcnICsgdW5kZWZpbmVkO1xuICBmdW5jdGlvbiBhdG9hIChhLCBuKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLCBuKTsgfVxuICBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGFyZ3MsIGN0eCkgeyBpZiAoIWZuKSB7IHJldHVybjsgfSB0aWNrKGZ1bmN0aW9uIHJ1biAoKSB7IGZuLmFwcGx5KGN0eCB8fCBudWxsLCBhcmdzIHx8IFtdKTsgfSk7IH1cblxuICAvLyBjcm9zcy1wbGF0Zm9ybSB0aWNrZXJcbiAgdmFyIHNpID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJywgdGljaztcbiAgaWYgKHNpKSB7XG4gICAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSB1bmRlZiAmJiBwcm9jZXNzLm5leHRUaWNrKSB7XG4gICAgdGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG4gIH0gZWxzZSB7XG4gICAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9lbWl0dGVyICh0aGluZywgb3B0aW9ucykge1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgZXZ0ID0ge307XG4gICAgaWYgKHRoaW5nID09PSB1bmRlZmluZWQpIHsgdGhpbmcgPSB7fTsgfVxuICAgIHRoaW5nLm9uID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgICBpZiAoIWV2dFt0eXBlXSkge1xuICAgICAgICBldnRbdHlwZV0gPSBbZm5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZ0W3R5cGVdLnB1c2goZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gICAgdGhpbmcub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgICAgZm4uX29uY2UgPSB0cnVlOyAvLyB0aGluZy5vZmYoZm4pIHN0aWxsIHdvcmtzIVxuICAgICAgdGhpbmcub24odHlwZSwgZm4pO1xuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gICAgdGhpbmcub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAoYyA9PT0gMSkge1xuICAgICAgICBkZWxldGUgZXZ0W3R5cGVdO1xuICAgICAgfSBlbHNlIGlmIChjID09PSAwKSB7XG4gICAgICAgIGV2dCA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGV0ID0gZXZ0W3R5cGVdO1xuICAgICAgICBpZiAoIWV0KSB7IHJldHVybiB0aGluZzsgfVxuICAgICAgICBldC5zcGxpY2UoZXQuaW5kZXhPZihmbiksIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gICAgdGhpbmcuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaW5nLmVtaXR0ZXJTbmFwc2hvdChhcmdzLnNoaWZ0KCkpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gICAgdGhpbmcuZW1pdHRlclNuYXBzaG90ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHZhciBldCA9IChldnRbdHlwZV0gfHwgW10pLnNsaWNlKDApO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhdG9hKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBjdHggPSB0aGlzIHx8IHRoaW5nO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJyAmJiBvcHRzLnRocm93cyAhPT0gZmFsc2UgJiYgIWV0Lmxlbmd0aCkgeyB0aHJvdyBhcmdzLmxlbmd0aCA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzOyB9XG4gICAgICAgIGV2dFt0eXBlXSA9IGV0LmZpbHRlcihmdW5jdGlvbiBlbWl0dGVyIChsaXN0ZW4pIHtcbiAgICAgICAgICBpZiAob3B0cy5hc3luYykgeyBkZWJvdW5jZShsaXN0ZW4sIGFyZ3MsIGN0eCk7IH0gZWxzZSB7IGxpc3Rlbi5hcHBseShjdHgsIGFyZ3MpOyB9XG4gICAgICAgICAgcmV0dXJuICFsaXN0ZW4uX29uY2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpbmc7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpbmc7XG4gIH1cblxuICAvLyBjcm9zcy1wbGF0Zm9ybSBleHBvcnRcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09IHVuZGVmICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfZW1pdHRlcjtcbiAgfSBlbHNlIHtcbiAgICByb290LmNvbnRyYSA9IHJvb3QuY29udHJhIHx8IHt9O1xuICAgIHJvb3QuY29udHJhLmVtaXR0ZXIgPSBfZW1pdHRlcjtcbiAgfVxufSkodGhpcyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiRldhQVNIXCIpKSIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5wbVwiIC1vIC4vbnBtL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC5pc29iamVjdCcpO1xuXG4vKiogVXNlZCBhcyBhbiBpbnRlcm5hbCBgXy5kZWJvdW5jZWAgb3B0aW9ucyBvYmplY3QgKi9cbnZhciBkZWJvdW5jZU9wdGlvbnMgPSB7XG4gICdsZWFkaW5nJzogZmFsc2UsXG4gICdtYXhXYWl0JzogMCxcbiAgJ3RyYWlsaW5nJzogZmFsc2Vcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gZXhlY3V0ZWQsIHdpbGwgb25seSBjYWxsIHRoZSBgZnVuY2AgZnVuY3Rpb25cbiAqIGF0IG1vc3Qgb25jZSBwZXIgZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gUHJvdmlkZSBhbiBvcHRpb25zIG9iamVjdCB0b1xuICogaW5kaWNhdGUgdGhhdCBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2VcbiAqIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGxcbiAqIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBjYWxsLlxuICpcbiAqIE5vdGU6IElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAgYGZ1bmNgIHdpbGwgYmUgY2FsbGVkXG4gKiBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGlzXG4gKiBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgZXhlY3V0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBhdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKTtcbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIGV4ZWN1dGUgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlc1xuICogalF1ZXJ5KCcuaW50ZXJhY3RpdmUnKS5vbignY2xpY2snLCBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwge1xuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB9XG4gIGlmIChvcHRpb25zID09PSBmYWxzZSkge1xuICAgIGxlYWRpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyBvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgZGVib3VuY2VPcHRpb25zLmxlYWRpbmcgPSBsZWFkaW5nO1xuICBkZWJvdW5jZU9wdGlvbnMubWF4V2FpdCA9IHdhaXQ7XG4gIGRlYm91bmNlT3B0aW9ucy50cmFpbGluZyA9IHRyYWlsaW5nO1xuXG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCBkZWJvdW5jZU9wdGlvbnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibnBtXCIgLW8gLi9ucG0vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC5pc29iamVjdCcpLFxuICAgIG5vdyA9IHJlcXVpcmUoJ2xvZGFzaC5ub3cnKTtcblxuLyogTmF0aXZlIG1ldGhvZCBzaG9ydGN1dHMgZm9yIG1ldGhvZHMgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMgKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGRlbGF5IHRoZSBleGVjdXRpb24gb2YgYGZ1bmNgIHVudGlsIGFmdGVyXG4gKiBgd2FpdGAgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBpbnZva2VkLlxuICogUHJvdmlkZSBhbiBvcHRpb25zIG9iamVjdCB0byBpbmRpY2F0ZSB0aGF0IGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvblxuICogdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBTdWJzZXF1ZW50IGNhbGxzXG4gKiB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGNhbGwuXG4gKlxuICogTm90ZTogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCBgZnVuY2Agd2lsbCBiZSBjYWxsZWRcbiAqIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gaXNcbiAqIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXSBTcGVjaWZ5IGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBjYWxsZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBhdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4XG4gKiB2YXIgbGF6eUxheW91dCA9IF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApO1xuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIGxhenlMYXlvdXQpO1xuICpcbiAqIC8vIGV4ZWN1dGUgYHNlbmRNYWlsYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzXG4gKiBqUXVlcnkoJyNwb3N0Ym94Jykub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pO1xuICpcbiAqIC8vIGVuc3VyZSBgYmF0Y2hMb2dgIGlzIGV4ZWN1dGVkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzXG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwge1xuICogICAnbWF4V2FpdCc6IDEwMDBcbiAqIH0sIGZhbHNlKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgYXJncyxcbiAgICAgIG1heFRpbWVvdXRJZCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHN0YW1wLFxuICAgICAgdGhpc0FyZyxcbiAgICAgIHRpbWVvdXRJZCxcbiAgICAgIHRyYWlsaW5nQ2FsbCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwLFxuICAgICAgbWF4V2FpdCA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIH1cbiAgd2FpdCA9IG5hdGl2ZU1heCgwLCB3YWl0KSB8fCAwO1xuICBpZiAob3B0aW9ucyA9PT0gdHJ1ZSkge1xuICAgIHZhciBsZWFkaW5nID0gdHJ1ZTtcbiAgICB0cmFpbGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9IG9wdGlvbnMubGVhZGluZztcbiAgICBtYXhXYWl0ID0gJ21heFdhaXQnIGluIG9wdGlvbnMgJiYgKG5hdGl2ZU1heCh3YWl0LCBvcHRpb25zLm1heFdhaXQpIHx8IDApO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHZhciBkZWxheWVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93KCkgLSBzdGFtcCk7XG4gICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICBpZiAobWF4VGltZW91dElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtYXhUaW1lb3V0SWQpO1xuICAgICAgfVxuICAgICAgdmFyIGlzQ2FsbGVkID0gdHJhaWxpbmdDYWxsO1xuICAgICAgbWF4VGltZW91dElkID0gdGltZW91dElkID0gdHJhaWxpbmdDYWxsID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGlzQ2FsbGVkKSB7XG4gICAgICAgIGxhc3RDYWxsZWQgPSBub3coKTtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgICAgaWYgKCF0aW1lb3V0SWQgJiYgIW1heFRpbWVvdXRJZCkge1xuICAgICAgICAgIGFyZ3MgPSB0aGlzQXJnID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHJlbWFpbmluZyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBtYXhEZWxheWVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgfVxuICAgIG1heFRpbWVvdXRJZCA9IHRpbWVvdXRJZCA9IHRyYWlsaW5nQ2FsbCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodHJhaWxpbmcgfHwgKG1heFdhaXQgIT09IHdhaXQpKSB7XG4gICAgICBsYXN0Q2FsbGVkID0gbm93KCk7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgaWYgKCF0aW1lb3V0SWQgJiYgIW1heFRpbWVvdXRJZCkge1xuICAgICAgICBhcmdzID0gdGhpc0FyZyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHN0YW1wID0gbm93KCk7XG4gICAgdGhpc0FyZyA9IHRoaXM7XG4gICAgdHJhaWxpbmdDYWxsID0gdHJhaWxpbmcgJiYgKHRpbWVvdXRJZCB8fCAhbGVhZGluZyk7XG5cbiAgICBpZiAobWF4V2FpdCA9PT0gZmFsc2UpIHtcbiAgICAgIHZhciBsZWFkaW5nQ2FsbCA9IGxlYWRpbmcgJiYgIXRpbWVvdXRJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFtYXhUaW1lb3V0SWQgJiYgIWxlYWRpbmcpIHtcbiAgICAgICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgICAgfVxuICAgICAgdmFyIHJlbWFpbmluZyA9IG1heFdhaXQgLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKSxcbiAgICAgICAgICBpc0NhbGxlZCA9IHJlbWFpbmluZyA8PSAwO1xuXG4gICAgICBpZiAoaXNDYWxsZWQpIHtcbiAgICAgICAgaWYgKG1heFRpbWVvdXRJZCkge1xuICAgICAgICAgIG1heFRpbWVvdXRJZCA9IGNsZWFyVGltZW91dChtYXhUaW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFtYXhUaW1lb3V0SWQpIHtcbiAgICAgICAgbWF4VGltZW91dElkID0gc2V0VGltZW91dChtYXhEZWxheWVkLCByZW1haW5pbmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNDYWxsZWQgJiYgdGltZW91dElkKSB7XG4gICAgICB0aW1lb3V0SWQgPSBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXRpbWVvdXRJZCAmJiB3YWl0ICE9PSBtYXhXYWl0KSB7XG4gICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuICAgIH1cbiAgICBpZiAobGVhZGluZ0NhbGwpIHtcbiAgICAgIGlzQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgfVxuICAgIGlmIChpc0NhbGxlZCAmJiAhdGltZW91dElkICYmICFtYXhUaW1lb3V0SWQpIHtcbiAgICAgIGFyZ3MgPSB0aGlzQXJnID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5wbVwiIC1vIC4vbnBtL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNOYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guX2lzbmF0aXZlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgVW5peCBlcG9jaFxuICogKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHN0YW1wID0gXy5ub3coKTtcbiAqIF8uZGVmZXIoZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7IH0pO1xuICogLy8gPT4gbG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgZnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKi9cbnZhciBub3cgPSBpc05hdGl2ZShub3cgPSBEYXRlLm5vdykgJiYgbm93IHx8IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdztcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5wbVwiIC1vIC4vbnBtL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGludGVybmFsIFtbQ2xhc3NdXSBvZiB2YWx1ZXMgKi9cbnZhciB0b1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgU3RyaW5nKHRvU3RyaW5nKVxuICAgIC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL3RvU3RyaW5nfCBmb3IgW15cXF1dKy9nLCAnLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyAmJiByZU5hdGl2ZS50ZXN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05hdGl2ZTtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5wbVwiIC1vIC4vbnBtL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdHNcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibnBtXCIgLW8gLi9ucG0vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBvYmplY3RUeXBlcyA9IHJlcXVpcmUoJ2xvZGFzaC5fb2JqZWN0dHlwZXMnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBPYmplY3QuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdHNcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyB0aGUgRUNNQVNjcmlwdCBsYW5ndWFnZSB0eXBlIG9mIE9iamVjdFxuICAvLyBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDhcbiAgLy8gYW5kIGF2b2lkIGEgVjggYnVnXG4gIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTFcbiAgcmV0dXJuICEhKHZhbHVlICYmIG9iamVjdFR5cGVzW3R5cGVvZiB2YWx1ZV0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibnBtXCIgLW8gLi9ucG0vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgT2JqZWN0ICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdib29sZWFuJzogZmFsc2UsXG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlLFxuICAnbnVtYmVyJzogZmFsc2UsXG4gICdzdHJpbmcnOiBmYWxzZSxcbiAgJ3VuZGVmaW5lZCc6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFR5cGVzO1xuIiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IHdpbmRvd1xuICAsIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXVxuICAsIHN1ZmZpeCA9ICdBbmltYXRpb25GcmFtZSdcbiAgLCByYWYgPSBnbG9iYWxbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IGdsb2JhbFsnY2FuY2VsJyArIHN1ZmZpeF0gfHwgZ2xvYmFsWydjYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgLCBpc05hdGl2ZSA9IHRydWVcblxuZm9yKHZhciBpID0gMDsgaSA8IHZlbmRvcnMubGVuZ3RoICYmICFyYWY7IGkrKykge1xuICByYWYgPSBnbG9iYWxbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gZ2xvYmFsW3ZlbmRvcnNbaV0gKyAnQ2FuY2VsJyArIHN1ZmZpeF1cbiAgICAgIHx8IGdsb2JhbFt2ZW5kb3JzW2ldICsgJ0NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxufVxuXG4vLyBTb21lIHZlcnNpb25zIG9mIEZGIGhhdmUgckFGIGJ1dCBub3QgY0FGXG5pZighcmFmIHx8ICFjYWYpIHtcbiAgaXNOYXRpdmUgPSBmYWxzZVxuXG4gIHZhciBsYXN0ID0gMFxuICAgICwgaWQgPSAwXG4gICAgLCBxdWV1ZSA9IFtdXG4gICAgLCBmcmFtZUR1cmF0aW9uID0gMTAwMCAvIDYwXG5cbiAgcmFmID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBpZihxdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHZhciBfbm93ID0gbm93KClcbiAgICAgICAgLCBuZXh0ID0gTWF0aC5tYXgoMCwgZnJhbWVEdXJhdGlvbiAtIChfbm93IC0gbGFzdCkpXG4gICAgICBsYXN0ID0gbmV4dCArIF9ub3dcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjcCA9IHF1ZXVlLnNsaWNlKDApXG4gICAgICAgIC8vIENsZWFyIHF1ZXVlIGhlcmUgdG8gcHJldmVudFxuICAgICAgICAvLyBjYWxsYmFja3MgZnJvbSBhcHBlbmRpbmcgbGlzdGVuZXJzXG4gICAgICAgIC8vIHRvIHRoZSBjdXJyZW50IGZyYW1lJ3MgcXVldWVcbiAgICAgICAgcXVldWUubGVuZ3RoID0gMFxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3AubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZighY3BbaV0uY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgIGNwW2ldLmNhbGxiYWNrKGxhc3QpXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdGhyb3cgZSB9LCAwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgTWF0aC5yb3VuZChuZXh0KSlcbiAgICB9XG4gICAgcXVldWUucHVzaCh7XG4gICAgICBoYW5kbGU6ICsraWQsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBjYW5jZWxsZWQ6IGZhbHNlXG4gICAgfSlcbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIGNhZiA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYocXVldWVbaV0uaGFuZGxlID09PSBoYW5kbGUpIHtcbiAgICAgICAgcXVldWVbaV0uY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuKSB7XG4gIC8vIFdyYXAgaW4gYSBuZXcgZnVuY3Rpb24gdG8gcHJldmVudFxuICAvLyBgY2FuY2VsYCBwb3RlbnRpYWxseSBiZWluZyBhc3NpZ25lZFxuICAvLyB0byB0aGUgbmF0aXZlIHJBRiBmdW5jdGlvblxuICBpZighaXNOYXRpdmUpIHtcbiAgICByZXR1cm4gcmFmLmNhbGwoZ2xvYmFsLCBmbilcbiAgfVxuICByZXR1cm4gcmFmLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpIHtcbiAgICB0cnl7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aHJvdyBlIH0sIDApXG4gICAgfVxuICB9KVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShnbG9iYWwsIGFyZ3VtZW50cylcbn1cbiIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNi4zXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnZXROYW5vU2Vjb25kcywgaHJ0aW1lLCBsb2FkVGltZTtcblxuICBpZiAoKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCkgJiYgcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsKSAmJiBwcm9jZXNzLmhydGltZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGdldE5hbm9TZWNvbmRzKCkgLSBsb2FkVGltZSkgLyAxZTY7XG4gICAgfTtcbiAgICBocnRpbWUgPSBwcm9jZXNzLmhydGltZTtcbiAgICBnZXROYW5vU2Vjb25kcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhyO1xuICAgICAgaHIgPSBocnRpbWUoKTtcbiAgICAgIHJldHVybiBoclswXSAqIDFlOSArIGhyWzFdO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBnZXROYW5vU2Vjb25kcygpO1xuICB9IGVsc2UgaWYgKERhdGUubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IERhdGUubm93KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuXG4vKlxuLy9AIHNvdXJjZU1hcHBpbmdVUkw9cGVyZm9ybWFuY2Utbm93Lm1hcFxuKi9cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJGV2FBU0hcIikpIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNJbnB1dCA9IHJlcXVpcmUoJy4vaXNJbnB1dCcpO1xudmFyIGJpbmRpbmdzID0ge307XG5cbmZ1bmN0aW9uIGhhcyAoc291cmNlLCB0YXJnZXQpIHtcbiAgdmFyIGJpbmRpbmcgPSBiaW5kaW5nc1tzb3VyY2UuaWRdO1xuICByZXR1cm4gYmluZGluZyAmJiBiaW5kaW5nW3RhcmdldC5pZF07XG59XG5cbmZ1bmN0aW9uIGluc2VydCAoc291cmNlLCB0YXJnZXQpIHtcbiAgdmFyIGJpbmRpbmcgPSBiaW5kaW5nc1tzb3VyY2UuaWRdO1xuICBpZiAoIWJpbmRpbmcpIHtcbiAgICBiaW5kaW5nID0gYmluZGluZ3Nbc291cmNlLmlkXSA9IHt9O1xuICB9XG4gIHZhciBpbnZhbGlkYXRlID0gaW52YWxpZGF0b3IodGFyZ2V0KTtcbiAgYmluZGluZ1t0YXJnZXQuaWRdID0gaW52YWxpZGF0ZTtcbiAgc291cmNlLm9uKCdkYXRhJywgaW52YWxpZGF0ZSk7XG4gIHNvdXJjZS5vbignZGVzdHJveWVkJywgcmVtb3ZlLmJpbmQobnVsbCwgc291cmNlLCB0YXJnZXQpKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChzb3VyY2UsIHRhcmdldCkge1xuICB2YXIgYmluZGluZyA9IGJpbmRpbmdzW3NvdXJjZS5pZF07XG4gIGlmICghYmluZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW52YWxpZGF0ZSA9IGJpbmRpbmdbdGFyZ2V0LmlkXTtcbiAgc291cmNlLm9mZignZGF0YScsIGludmFsaWRhdGUpO1xuICBkZWxldGUgYmluZGluZ1t0YXJnZXQuaWRdO1xufVxuXG5mdW5jdGlvbiBpbnZhbGlkYXRvciAodGFyZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbnZhbGlkYXRlICgpIHtcbiAgICB0YXJnZXQucmVmcmVzaCgpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhZGQgKHNvdXJjZSwgdGFyZ2V0KSB7XG4gIGlmIChpc0lucHV0KHRhcmdldC5hc3NvY2lhdGVkKSB8fCBoYXMoc291cmNlLCB0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGluc2VydChzb3VyY2UsIHRhcmdldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZCxcbiAgcmVtb3ZlOiByZW1vdmVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbWl0dGVyID0gcmVxdWlyZSgnY29udHJhLmVtaXR0ZXInKTtcbnZhciByYWYgPSByZXF1aXJlKCdyYWYnKTtcbnZhciBkb20gPSByZXF1aXJlKCcuL2RvbScpO1xudmFyIHRleHQgPSByZXF1aXJlKCcuL3RleHQnKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbnZhciBtb21lbnR1bSA9IHJlcXVpcmUoJy4vbW9tZW50dW0nKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMnKTtcbnZhciBub29wID0gcmVxdWlyZSgnLi9ub29wJyk7XG52YXIgbm87XG5cbmZ1bmN0aW9uIGNhbGVuZGFyIChjYWxlbmRhck9wdGlvbnMpIHtcbiAgdmFyIG87XG4gIHZhciBhcGkgPSBlbWl0dGVyKHt9KTtcbiAgdmFyIHJlZjtcbiAgdmFyIHJlZkNhbDtcbiAgdmFyIGNvbnRhaW5lcjtcbiAgdmFyIHJlbmRlcmVkID0gZmFsc2U7XG5cbiAgLy8gZGF0ZSB2YXJpYWJsZXNcbiAgdmFyIG1vbnRoT2Zmc2V0QXR0cmlidXRlID0gJ2RhdGEtcm9tZS1vZmZzZXQnO1xuICB2YXIgd2Vla2RheXM7XG4gIHZhciB3ZWVrZGF5Q291bnQ7XG4gIHZhciBjYWxlbmRhck1vbnRocyA9IFtdO1xuICB2YXIgbGFzdFllYXI7XG4gIHZhciBsYXN0TW9udGg7XG4gIHZhciBsYXN0RGF5O1xuICB2YXIgbGFzdERheUVsZW1lbnQ7XG4gIHZhciBkYXRld3JhcHBlcjtcbiAgdmFyIGJhY2s7XG4gIHZhciBuZXh0O1xuXG4gIC8vIHRpbWUgdmFyaWFibGVzXG4gIHZhciBzZWNvbmRzSW5EYXkgPSA2MCAqIDYwICogMjQ7XG4gIHZhciB0aW1lO1xuICB2YXIgdGltZWxpc3Q7XG5cbiAgaW5pdCgpO1xuICByYWYocmVhZHkpO1xuXG4gIHJldHVybiBhcGk7XG5cbiAgZnVuY3Rpb24gbmFwaSAoKSB7IHJldHVybiBhcGk7IH1cblxuICBmdW5jdGlvbiBpbml0IChpbml0T3B0aW9ucykge1xuICAgIG8gPSBkZWZhdWx0cyhpbml0T3B0aW9ucyB8fCBjYWxlbmRhck9wdGlvbnMsIGFwaSk7XG4gICAgaWYgKCFjb250YWluZXIpIHsgY29udGFpbmVyID0gZG9tKHsgY2xhc3NOYW1lOiBvLnN0eWxlcy5jb250YWluZXIgfSk7IH1cbiAgICB3ZWVrZGF5cyA9IG8ud2Vla2RheUZvcm1hdDtcbiAgICB3ZWVrZGF5Q291bnQgPSB3ZWVrZGF5cy5sZW5ndGg7XG4gICAgbGFzdE1vbnRoID0gbm87XG4gICAgbGFzdFllYXIgPSBubztcbiAgICBsYXN0RGF5ID0gbm87XG4gICAgbGFzdERheUVsZW1lbnQgPSBubztcbiAgICBvLmFwcGVuZFRvLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICByZW1vdmVDaGlsZHJlbihjb250YWluZXIpO1xuICAgIHJlbmRlcmVkID0gZmFsc2U7XG4gICAgcmVmID0gby5pbml0aWFsVmFsdWUgPyBvLmluaXRpYWxWYWx1ZSA6IG1vbWVudHVtLm1vbWVudCgpO1xuICAgIHJlZkNhbCA9IHJlZi5jbG9uZSgpO1xuXG4gICAgYXBpLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICBhcGkuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgYXBpLmRlc3Ryb3kgPSBkZXN0cm95LmJpbmQoYXBpLCBmYWxzZSk7XG4gICAgYXBpLmVtaXRWYWx1ZXMgPSBlbWl0VmFsdWVzO1xuICAgIGFwaS5nZXREYXRlID0gZ2V0RGF0ZTtcbiAgICBhcGkuZ2V0RGF0ZVN0cmluZyA9IGdldERhdGVTdHJpbmc7XG4gICAgYXBpLmdldE1vbWVudCA9IGdldE1vbWVudDtcbiAgICBhcGkuaGlkZSA9IGhpZGU7XG4gICAgYXBpLm9wdGlvbnMgPSBjaGFuZ2VPcHRpb25zO1xuICAgIGFwaS5vcHRpb25zLnJlc2V0ID0gcmVzZXRPcHRpb25zO1xuICAgIGFwaS5yZWZyZXNoID0gcmVmcmVzaDtcbiAgICBhcGkucmVzdG9yZSA9IG5hcGk7XG4gICAgYXBpLnNldFZhbHVlID0gc2V0VmFsdWU7XG4gICAgYXBpLnNob3cgPSBzaG93O1xuXG4gICAgaWYgKG8uX2lucHV0ICE9PSB0cnVlKSB7XG4gICAgICBzaG93KCk7XG4gICAgfVxuXG4gICAgZXZlbnRMaXN0ZW5pbmcoKTtcbiAgICByZWFkeSgpO1xuXG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWR5ICgpIHtcbiAgICBhcGkuZW1pdCgncmVhZHknLCBjbG9uZShvKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95IChzaWxlbnQpIHtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICBjb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgIH1cblxuICAgIGlmIChvKSB7XG4gICAgICBldmVudExpc3RlbmluZyh0cnVlKTtcbiAgICB9XG5cbiAgICB2YXIgZGVzdHJveWVkID0gYXBpLmVtaXR0ZXJTbmFwc2hvdCgnZGVzdHJveWVkJyk7XG4gICAgYXBpLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgYXBpLmRlc3Ryb3kgPSBuYXBpO1xuICAgIGFwaS5lbWl0VmFsdWVzID0gbmFwaTtcbiAgICBhcGkuZ2V0RGF0ZSA9IG5vb3A7XG4gICAgYXBpLmdldERhdGVTdHJpbmcgPSBub29wO1xuICAgIGFwaS5nZXRNb21lbnQgPSBub29wO1xuICAgIGFwaS5oaWRlID0gbmFwaTtcbiAgICBhcGkub3B0aW9ucyA9IG5hcGk7XG4gICAgYXBpLm9wdGlvbnMucmVzZXQgPSBuYXBpO1xuICAgIGFwaS5yZWZyZXNoID0gbmFwaTtcbiAgICBhcGkucmVzdG9yZSA9IGluaXQ7XG4gICAgYXBpLnNldFZhbHVlID0gbmFwaTtcbiAgICBhcGkuc2hvdyA9IG5hcGk7XG4gICAgYXBpLm9mZigpO1xuXG4gICAgaWYgKHNpbGVudCAhPT0gdHJ1ZSkge1xuICAgICAgZGVzdHJveWVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuaW5nIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGlmIChvLmF1dG9IaWRlT25CbHVyKSB7IGV2ZW50c1tvcF0oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnZm9jdXMnLCBoaWRlT25CbHVyLCB0cnVlKTsgfVxuICAgIGlmIChvLmF1dG9IaWRlT25DbGljaykgeyBldmVudHNbb3BdKGRvY3VtZW50LCAnY2xpY2snLCBoaWRlT25DbGljayk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZU9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNsb25lKG8pO1xuICAgIH1cbiAgICBkZXN0cm95KCk7XG4gICAgaW5pdChvcHRpb25zKTtcbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRPcHRpb25zICgpIHtcbiAgICByZXR1cm4gY2hhbmdlT3B0aW9ucyh7fSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgIGlmIChyZW5kZXJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJlZCA9IHRydWU7XG4gICAgcmVuZGVyRGF0ZXMoKTtcbiAgICByZW5kZXJUaW1lKCk7XG4gICAgYXBpLmVtaXQoJ3JlbmRlcicpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF0ZXMgKCkge1xuICAgIGlmICghby5kYXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpO1xuICAgIGNhbGVuZGFyTW9udGhzID0gW107XG5cbiAgICBkYXRld3JhcHBlciA9IGRvbSh7IGNsYXNzTmFtZTogby5zdHlsZXMuZGF0ZSwgcGFyZW50OiBjb250YWluZXIgfSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgby5tb250aHNJbkNhbGVuZGFyOyBpKyspIHtcbiAgICAgIHJlbmRlck1vbnRoKGkpO1xuICAgIH1cblxuICAgIGV2ZW50cy5hZGQoYmFjaywgJ2NsaWNrJywgc3VidHJhY3RNb250aCk7XG4gICAgZXZlbnRzLmFkZChuZXh0LCAnY2xpY2snLCBhZGRNb250aCk7XG4gICAgZXZlbnRzLmFkZChkYXRld3JhcHBlciwgJ2NsaWNrJywgcGlja0RheSk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJNb250aCAoaSkge1xuICAgICAgdmFyIG1vbnRoID0gZG9tKHsgY2xhc3NOYW1lOiBvLnN0eWxlcy5tb250aCwgcGFyZW50OiBkYXRld3JhcHBlciB9KTtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGJhY2sgPSBkb20oeyB0eXBlOiAnYnV0dG9uJywgY2xhc3NOYW1lOiBvLnN0eWxlcy5iYWNrLCBhdHRyaWJ1dGVzOiB7IHR5cGU6ICdidXR0b24nIH0sIHBhcmVudDogbW9udGggfSk7XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gby5tb250aHNJbkNhbGVuZGFyIC0xKSB7XG4gICAgICAgIG5leHQgPSBkb20oeyB0eXBlOiAnYnV0dG9uJywgY2xhc3NOYW1lOiBvLnN0eWxlcy5uZXh0LCBhdHRyaWJ1dGVzOiB7IHR5cGU6ICdidXR0b24nIH0sIHBhcmVudDogbW9udGggfSk7XG4gICAgICB9XG4gICAgICB2YXIgbGFiZWwgPSBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLm1vbnRoTGFiZWwsIHBhcmVudDogbW9udGggfSk7XG4gICAgICB2YXIgZGF0ZSA9IGRvbSh7IHR5cGU6ICd0YWJsZScsIGNsYXNzTmFtZTogby5zdHlsZXMuZGF5VGFibGUsIHBhcmVudDogbW9udGggfSk7XG4gICAgICB2YXIgZGF0ZWhlYWQgPSBkb20oeyB0eXBlOiAndGhlYWQnLCBjbGFzc05hbWU6IG8uc3R5bGVzLmRheUhlYWQsIHBhcmVudDogZGF0ZSB9KTtcbiAgICAgIHZhciBkYXRlaGVhZHJvdyA9IGRvbSh7IHR5cGU6ICd0cicsIGNsYXNzTmFtZTogby5zdHlsZXMuZGF5Um93LCBwYXJlbnQ6IGRhdGVoZWFkIH0pO1xuICAgICAgdmFyIGRhdGVib2R5ID0gZG9tKHsgdHlwZTogJ3Rib2R5JywgY2xhc3NOYW1lOiBvLnN0eWxlcy5kYXlCb2R5LCBwYXJlbnQ6IGRhdGUgfSk7XG4gICAgICB2YXIgajtcblxuICAgICAgZm9yIChqID0gMDsgaiA8IHdlZWtkYXlDb3VudDsgaisrKSB7XG4gICAgICAgIGRvbSh7IHR5cGU6ICd0aCcsIGNsYXNzTmFtZTogby5zdHlsZXMuZGF5SGVhZEVsZW0sIHBhcmVudDogZGF0ZWhlYWRyb3csIHRleHQ6IHdlZWtkYXlzW3dlZWtkYXkoaildIH0pO1xuICAgICAgfVxuXG4gICAgICBkYXRlYm9keS5zZXRBdHRyaWJ1dGUobW9udGhPZmZzZXRBdHRyaWJ1dGUsIGkpO1xuICAgICAgY2FsZW5kYXJNb250aHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgYm9keTogZGF0ZWJvZHlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRpbWUgKCkge1xuICAgIGlmICghby50aW1lIHx8ICFvLnRpbWVJbnRlcnZhbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZXdyYXBwZXIgPSBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLnRpbWUsIHBhcmVudDogY29udGFpbmVyIH0pO1xuICAgIHRpbWUgPSBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLnNlbGVjdGVkVGltZSwgcGFyZW50OiB0aW1ld3JhcHBlciwgdGV4dDogcmVmLmZvcm1hdChvLnRpbWVGb3JtYXQpIH0pO1xuICAgIGV2ZW50cy5hZGQodGltZSwgJ2NsaWNrJywgdG9nZ2xlVGltZUxpc3QpO1xuICAgIHRpbWVsaXN0ID0gZG9tKHsgY2xhc3NOYW1lOiBvLnN0eWxlcy50aW1lTGlzdCwgcGFyZW50OiB0aW1ld3JhcHBlciB9KTtcbiAgICBldmVudHMuYWRkKHRpbWVsaXN0LCAnY2xpY2snLCBwaWNrVGltZSk7XG4gICAgdmFyIG5leHQgPSBtb21lbnR1bS5tb21lbnQoJzAwOjAwOjAwJywgJ0hIOm1tOnNzJyk7XG4gICAgdmFyIGxhdGVzdCA9IG5leHQuY2xvbmUoKS5hZGQoMSwgJ2RheXMnKTtcbiAgICB3aGlsZSAobmV4dC5pc0JlZm9yZShsYXRlc3QpKSB7XG4gICAgICBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLnRpbWVPcHRpb24sIHBhcmVudDogdGltZWxpc3QsIHRleHQ6IG5leHQuZm9ybWF0KG8udGltZUZvcm1hdCkgfSk7XG4gICAgICBuZXh0LmFkZChvLnRpbWVJbnRlcnZhbCwgJ3NlY29uZHMnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3ZWVrZGF5IChpbmRleCwgYmFja3dhcmRzKSB7XG4gICAgdmFyIGZhY3RvciA9IGJhY2t3YXJkcyA/IC0xIDogMTtcbiAgICB2YXIgb2Zmc2V0ID0gaW5kZXggKyBvLndlZWtTdGFydCAqIGZhY3RvcjtcbiAgICBpZiAob2Zmc2V0ID49IHdlZWtkYXlDb3VudCB8fCBvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgKz0gd2Vla2RheUNvdW50ICogLWZhY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlWYWxpZFRpbWVzT25seSAoKSB7XG4gICAgaWYgKCFvLnRpbWUgfHwgIXJlbmRlcmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lcyA9IHRpbWVsaXN0LmNoaWxkcmVuO1xuICAgIHZhciBsZW5ndGggPSB0aW1lcy5sZW5ndGg7XG4gICAgdmFyIGRhdGU7XG4gICAgdmFyIHRpbWU7XG4gICAgdmFyIGl0ZW07XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpdGVtID0gdGltZXNbaV07XG4gICAgICB0aW1lID0gbW9tZW50dW0ubW9tZW50KHRleHQoaXRlbSksIG8udGltZUZvcm1hdCk7XG4gICAgICBkYXRlID0gc2V0VGltZShyZWYuY2xvbmUoKSwgdGltZSk7XG4gICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSBpc0luUmFuZ2UoZGF0ZSwgZmFsc2UsIG8udGltZVZhbGlkYXRvcikgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRpbWVMaXN0IChzaG93KSB7XG4gICAgdmFyIGRpc3BsYXkgPSB0eXBlb2Ygc2hvdyA9PT0gJ2Jvb2xlYW4nID8gc2hvdyA6IHRpbWVsaXN0LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJztcbiAgICBpZiAoZGlzcGxheSkge1xuICAgICAgc2hvd1RpbWVMaXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVUaW1lTGlzdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dUaW1lTGlzdCAoKSB7IGlmICh0aW1lbGlzdCkgeyB0aW1lbGlzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgfSB9XG4gIGZ1bmN0aW9uIGhpZGVUaW1lTGlzdCAoKSB7IGlmICh0aW1lbGlzdCkgeyB0aW1lbGlzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9IH1cbiAgZnVuY3Rpb24gc2hvd0NhbGVuZGFyICgpIHsgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJzsgYXBpLmVtaXQoJ3Nob3cnKTsgfVxuICBmdW5jdGlvbiBoaWRlQ2FsZW5kYXIgKCkgeyBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgYXBpLmVtaXQoJ2hpZGUnKTsgfVxuXG4gIGZ1bmN0aW9uIHNob3cgKCkge1xuICAgIHJlbmRlcigpO1xuICAgIHJlZnJlc2goKTtcbiAgICB0b2dnbGVUaW1lTGlzdCghby5kYXRlKTtcbiAgICBzaG93Q2FsZW5kYXIoKTtcbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZSAoKSB7XG4gICAgaGlkZVRpbWVMaXN0KCk7XG4gICAgcmFmKGhpZGVDYWxlbmRhcik7XG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVDb25kaXRpb25hbGx5ICgpIHtcbiAgICBoaWRlVGltZUxpc3QoKTtcblxuICAgIHZhciBwb3MgPSBjbGFzc2VzLmNvbnRhaW5zKGNvbnRhaW5lciwgby5zdHlsZXMucG9zaXRpb25lZCk7XG4gICAgaWYgKHBvcykge1xuICAgICAgcmFmKGhpZGVDYWxlbmRhcik7XG4gICAgfVxuICAgIHJldHVybiBhcGk7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxlbmRhckV2ZW50VGFyZ2V0IChlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQgPT09IGFwaS5hc3NvY2lhdGVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgd2hpbGUgKHRhcmdldCkge1xuICAgICAgaWYgKHRhcmdldCA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQmx1ciAoZSkge1xuICAgIGlmIChjYWxlbmRhckV2ZW50VGFyZ2V0KGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpZGVDb25kaXRpb25hbGx5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlT25DbGljayAoZSkge1xuICAgIGlmIChjYWxlbmRhckV2ZW50VGFyZ2V0KGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpZGVDb25kaXRpb25hbGx5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJ0cmFjdE1vbnRoICgpIHsgY2hhbmdlTW9udGgoJ3N1YnRyYWN0Jyk7IH1cbiAgZnVuY3Rpb24gYWRkTW9udGggKCkgeyBjaGFuZ2VNb250aCgnYWRkJyk7IH1cbiAgZnVuY3Rpb24gY2hhbmdlTW9udGggKG9wKSB7XG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcCA9PT0gJ2FkZCcgPyAtMSA6IDE7XG4gICAgdmFyIG9mZnNldCA9IG8ubW9udGhzSW5DYWxlbmRhciArIGRpcmVjdGlvbiAqIGdldE1vbnRoT2Zmc2V0KGxhc3REYXlFbGVtZW50KTtcbiAgICByZWZDYWxbb3BdKG9mZnNldCwgJ21vbnRocycpO1xuICAgIGJvdW5kID0gaW5SYW5nZShyZWZDYWwuY2xvbmUoKSk7XG4gICAgcmVmID0gYm91bmQgfHwgcmVmO1xuICAgIGlmIChib3VuZCkgeyByZWZDYWwgPSBib3VuZC5jbG9uZSgpOyB9XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHNpbGVudCkge1xuICAgIHVwZGF0ZUNhbGVuZGFyKCk7XG4gICAgdXBkYXRlVGltZSgpO1xuICAgIGlmIChzaWxlbnQgIT09IHRydWUpIHsgZW1pdFZhbHVlcygpOyB9XG4gICAgZGlzcGxheVZhbGlkVGltZXNPbmx5KCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYWxlbmRhciAoKSB7XG4gICAgaWYgKCFvLmRhdGUgfHwgIXJlbmRlcmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB5ID0gcmVmQ2FsLnllYXIoKTtcbiAgICB2YXIgbSA9IHJlZkNhbC5tb250aCgpO1xuICAgIHZhciBkID0gcmVmQ2FsLmRhdGUoKTtcbiAgICBpZiAoZCA9PT0gbGFzdERheSAmJiBtID09PSBsYXN0TW9udGggJiYgeSA9PT0gbGFzdFllYXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNhblN0YXkgPSBpc0Rpc3BsYXllZCgpO1xuICAgIGxhc3REYXkgPSByZWZDYWwuZGF0ZSgpO1xuICAgIGxhc3RNb250aCA9IHJlZkNhbC5tb250aCgpO1xuICAgIGxhc3RZZWFyID0gcmVmQ2FsLnllYXIoKTtcbiAgICBpZiAoY2FuU3RheSkgeyB1cGRhdGVDYWxlbmRhclNlbGVjdGlvbigpOyByZXR1cm47IH1cbiAgICBjYWxlbmRhck1vbnRocy5mb3JFYWNoKHVwZGF0ZU1vbnRoKTtcbiAgICByZW5kZXJBbGxEYXlzKCk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNb250aCAobW9udGgsIGkpIHtcbiAgICAgIHZhciBvZmZzZXRDYWwgPSByZWZDYWwuY2xvbmUoKS5hZGQoaSwgJ21vbnRocycpO1xuICAgICAgdGV4dChtb250aC5sYWJlbCwgb2Zmc2V0Q2FsLmZvcm1hdChvLm1vbnRoRm9ybWF0KSk7XG4gICAgICByZW1vdmVDaGlsZHJlbihtb250aC5ib2R5KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYWxlbmRhclNlbGVjdGlvbiAoKSB7XG4gICAgdmFyIGRheSA9IHJlZkNhbC5kYXRlKCkgLSAxO1xuICAgIHNlbGVjdERheUVsZW1lbnQoZmFsc2UpO1xuICAgIGNhbGVuZGFyTW9udGhzLmZvckVhY2goZnVuY3Rpb24gKGNhbCkge1xuICAgICAgdmFyIGRheXM7XG4gICAgICBpZiAoc2FtZUNhbGVuZGFyTW9udGgoY2FsLmRhdGUsIHJlZkNhbCkpIHtcbiAgICAgICAgZGF5cyA9IGNhc3QoY2FsLmJvZHkuY2hpbGRyZW4pLm1hcChhZ2dyZWdhdGUpO1xuICAgICAgICBkYXlzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgZGF5cykuZmlsdGVyKGluc2lkZSk7XG4gICAgICAgIHNlbGVjdERheUVsZW1lbnQoZGF5c1tkYXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNhc3QgKGxpa2UpIHtcbiAgICAgIHZhciBkZXN0ID0gW107XG4gICAgICB2YXIgaTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsaWtlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlc3QucHVzaChsaWtlW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFnZ3JlZ2F0ZSAoY2hpbGQpIHtcbiAgICAgIHJldHVybiBjYXN0KGNoaWxkLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNpZGUgKGNoaWxkKSB7XG4gICAgICByZXR1cm4gIWNsYXNzZXMuY29udGFpbnMoY2hpbGQsIG8uc3R5bGVzLmRheVByZXZNb250aCkgJiZcbiAgICAgICAgICAgICAhY2xhc3Nlcy5jb250YWlucyhjaGlsZCwgby5zdHlsZXMuZGF5TmV4dE1vbnRoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0Rpc3BsYXllZCAoKSB7XG4gICAgcmV0dXJuIGNhbGVuZGFyTW9udGhzLnNvbWUobWF0Y2hlcyk7XG5cbiAgICBmdW5jdGlvbiBtYXRjaGVzIChjYWwpIHtcbiAgICAgIGlmICghbGFzdFllYXIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICByZXR1cm4gc2FtZUNhbGVuZGFyTW9udGgoY2FsLmRhdGUsIHJlZkNhbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2FtZUNhbGVuZGFyTW9udGggKGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIGxlZnQgJiYgcmlnaHQgJiYgbGVmdC55ZWFyKCkgPT09IHJpZ2h0LnllYXIoKSAmJiBsZWZ0Lm1vbnRoKCkgPT09IHJpZ2h0Lm1vbnRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUaW1lICgpIHtcbiAgICBpZiAoIW8udGltZSB8fCAhcmVuZGVyZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGV4dCh0aW1lLCByZWYuZm9ybWF0KG8udGltZUZvcm1hdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdFZhbHVlcyAoKSB7XG4gICAgYXBpLmVtaXQoJ2RhdGEnLCBnZXREYXRlU3RyaW5nKCkpO1xuICAgIGFwaS5lbWl0KCd5ZWFyJywgcmVmLnllYXIoKSk7XG4gICAgYXBpLmVtaXQoJ21vbnRoJywgcmVmLm1vbnRoKCkpO1xuICAgIGFwaS5lbWl0KCdkYXknLCByZWYuZGF5KCkpO1xuICAgIGFwaS5lbWl0KCd0aW1lJywgcmVmLmZvcm1hdChvLnRpbWVGb3JtYXQpKTtcbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgbGFzdFllYXIgPSBmYWxzZTtcbiAgICBsYXN0TW9udGggPSBmYWxzZTtcbiAgICBsYXN0RGF5ID0gZmFsc2U7XG4gICAgdXBkYXRlKHRydWUpO1xuICAgIHJldHVybiBhcGk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRWYWx1ZSAodmFsdWUpIHtcbiAgICB2YXIgZGF0ZSA9IHBhcnNlKHZhbHVlLCBvLmlucHV0Rm9ybWF0KTtcbiAgICBpZiAoZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWYgPSBpblJhbmdlKGRhdGUpIHx8IHJlZjtcbiAgICByZWZDYWwgPSByZWYuY2xvbmUoKTtcbiAgICB1cGRhdGUodHJ1ZSk7XG5cbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4gKGVsZW0sIHNlbGYpIHtcbiAgICB3aGlsZSAoZWxlbSAmJiBlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgaWYgKHNlbGYgPT09IHRydWUpIHtcbiAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJBbGxEYXlzICgpIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgby5tb250aHNJbkNhbGVuZGFyOyBpKyspIHtcbiAgICAgIHJlbmRlckRheXMoaSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF5cyAob2Zmc2V0KSB7XG4gICAgdmFyIG1vbnRoID0gY2FsZW5kYXJNb250aHNbb2Zmc2V0XTtcbiAgICB2YXIgb2Zmc2V0Q2FsID0gcmVmQ2FsLmNsb25lKCkuYWRkKG9mZnNldCwgJ21vbnRocycpO1xuICAgIHZhciB0b3RhbCA9IG9mZnNldENhbC5kYXlzSW5Nb250aCgpO1xuICAgIHZhciBjdXJyZW50ID0gb2Zmc2V0Q2FsLm1vbnRoKCkgIT09IHJlZi5tb250aCgpID8gLTEgOiByZWYuZGF0ZSgpOyAvLyAtMSA6IDEuLjMxXG4gICAgdmFyIGZpcnN0ID0gb2Zmc2V0Q2FsLmNsb25lKCkuZGF0ZSgxKTtcbiAgICB2YXIgZmlyc3REYXkgPSB3ZWVrZGF5KGZpcnN0LmRheSgpLCB0cnVlKTsgLy8gMC4uNlxuICAgIHZhciB0ciA9IGRvbSh7IHR5cGU6ICd0cicsIGNsYXNzTmFtZTogby5zdHlsZXMuZGF5Um93LCBwYXJlbnQ6IG1vbnRoLmJvZHkgfSk7XG4gICAgdmFyIHByZXZNb250aCA9IGhpZGRlbldoZW4ob2Zmc2V0ICE9PSAwLCBbby5zdHlsZXMuZGF5Qm9keUVsZW0sIG8uc3R5bGVzLmRheVByZXZNb250aF0pO1xuICAgIHZhciBuZXh0TW9udGggPSBoaWRkZW5XaGVuKG9mZnNldCAhPT0gby5tb250aHNJbkNhbGVuZGFyIC0gMSwgW28uc3R5bGVzLmRheUJvZHlFbGVtLCBvLnN0eWxlcy5kYXlOZXh0TW9udGhdKTtcbiAgICB2YXIgZGlzYWJsZWQgPSBvLnN0eWxlcy5kYXlEaXNhYmxlZDtcbiAgICB2YXIgbGFzdERheTtcblxuICAgIHBhcnQoe1xuICAgICAgYmFzZTogZmlyc3QuY2xvbmUoKS5zdWJ0cmFjdChmaXJzdERheSwgJ2RheXMnKSxcbiAgICAgIGxlbmd0aDogZmlyc3REYXksXG4gICAgICBjZWxsOiBwcmV2TW9udGhcbiAgICB9KTtcblxuICAgIHBhcnQoe1xuICAgICAgYmFzZTogZmlyc3QuY2xvbmUoKSxcbiAgICAgIGxlbmd0aDogdG90YWwsXG4gICAgICBjZWxsOiBbby5zdHlsZXMuZGF5Qm9keUVsZW1dLFxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgbGFzdERheSA9IGZpcnN0LmNsb25lKCkuYWRkKHRvdGFsLCAnZGF5cycpO1xuXG4gICAgcGFydCh7XG4gICAgICBiYXNlOiBsYXN0RGF5LFxuICAgICAgbGVuZ3RoOiB3ZWVrZGF5Q291bnQgLSB0ci5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICBjZWxsOiBuZXh0TW9udGhcbiAgICB9KTtcblxuICAgIGJhY2suZGlzYWJsZWQgPSAhaXNJblJhbmdlTGVmdChmaXJzdCwgdHJ1ZSk7XG4gICAgbmV4dC5kaXNhYmxlZCA9ICFpc0luUmFuZ2VSaWdodChsYXN0RGF5LCB0cnVlKTtcbiAgICBtb250aC5kYXRlID0gb2Zmc2V0Q2FsLmNsb25lKCk7XG5cbiAgICBmdW5jdGlvbiBwYXJ0IChkYXRhKSB7XG4gICAgICB2YXIgaSwgZGF5LCBub2RlO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRyLmNoaWxkcmVuLmxlbmd0aCA9PT0gd2Vla2RheUNvdW50KSB7XG4gICAgICAgICAgdHIgPSBkb20oeyB0eXBlOiAndHInLCBjbGFzc05hbWU6IG8uc3R5bGVzLmRheVJvdywgcGFyZW50OiBtb250aC5ib2R5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGRheSA9IGRhdGEuYmFzZS5jbG9uZSgpLmFkZChpLCAnZGF5cycpO1xuICAgICAgICBub2RlID0gZG9tKHtcbiAgICAgICAgICB0eXBlOiAndGQnLFxuICAgICAgICAgIHBhcmVudDogdHIsXG4gICAgICAgICAgdGV4dDogZGF5LmZvcm1hdChvLmRheUZvcm1hdCksXG4gICAgICAgICAgY2xhc3NOYW1lOiB2YWxpZGF0aW9uVGVzdChkYXksIGRhdGEuY2VsbC5qb2luKCcgJykuc3BsaXQoJyAnKSkuam9pbignICcpXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YS5zZWxlY3RhYmxlICYmIGRheS5kYXRlKCkgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICBzZWxlY3REYXlFbGVtZW50KG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGlvblRlc3QgKGRheSwgY2VsbCkge1xuICAgICAgaWYgKCFpc0luUmFuZ2UoZGF5LCB0cnVlLCBvLmRhdGVWYWxpZGF0b3IpKSB7IGNlbGwucHVzaChkaXNhYmxlZCk7IH1cbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGRlbldoZW4gKHZhbHVlLCBjZWxsKSB7XG4gICAgICBpZiAodmFsdWUpIHsgY2VsbC5wdXNoKG8uc3R5bGVzLmRheUNvbmNlYWxlZCk7IH1cbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5SYW5nZSAoZGF0ZSwgYWxsZGF5LCB2YWxpZGF0b3IpIHtcbiAgICBpZiAoIWlzSW5SYW5nZUxlZnQoZGF0ZSwgYWxsZGF5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWlzSW5SYW5nZVJpZ2h0KGRhdGUsIGFsbGRheSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHZhbGlkID0gKHZhbGlkYXRvciB8fCBGdW5jdGlvbi5wcm90b3R5cGUpLmNhbGwoYXBpLCBkYXRlLnRvRGF0ZSgpKTtcbiAgICByZXR1cm4gdmFsaWQgIT09IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNJblJhbmdlTGVmdCAoZGF0ZSwgYWxsZGF5KSB7XG4gICAgdmFyIG1pbiA9ICFvLm1pbiA/IGZhbHNlIDogKGFsbGRheSA/IG8ubWluLmNsb25lKCkuc3RhcnRPZignZGF5JykgOiBvLm1pbik7XG4gICAgcmV0dXJuICFtaW4gfHwgIWRhdGUuaXNCZWZvcmUobWluKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5SYW5nZVJpZ2h0IChkYXRlLCBhbGxkYXkpIHtcbiAgICB2YXIgbWF4ID0gIW8ubWF4ID8gZmFsc2UgOiAoYWxsZGF5ID8gby5tYXguY2xvbmUoKS5lbmRPZignZGF5JykgOiBvLm1heCk7XG4gICAgcmV0dXJuICFtYXggfHwgIWRhdGUuaXNBZnRlcihtYXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5SYW5nZSAoZGF0ZSkge1xuICAgIGlmIChvLm1pbiAmJiBkYXRlLmlzQmVmb3JlKG8ubWluKSkge1xuICAgICAgcmV0dXJuIGluUmFuZ2Uoby5taW4uY2xvbmUoKSk7XG4gICAgfSBlbHNlIGlmIChvLm1heCAmJiBkYXRlLmlzQWZ0ZXIoby5tYXgpKSB7XG4gICAgICByZXR1cm4gaW5SYW5nZShvLm1heC5jbG9uZSgpKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gZGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdkYXlzJyk7XG4gICAgaWYgKHZhbGlkYXRlVG93YXJkcyh2YWx1ZSwgZGF0ZSwgJ2FkZCcpKSB7XG4gICAgICByZXR1cm4gaW5UaW1lUmFuZ2UodmFsdWUpO1xuICAgIH1cbiAgICB2YWx1ZSA9IGRhdGUuY2xvbmUoKTtcbiAgICBpZiAodmFsaWRhdGVUb3dhcmRzKHZhbHVlLCBkYXRlLCAnc3VidHJhY3QnKSkge1xuICAgICAgcmV0dXJuIGluVGltZVJhbmdlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpblRpbWVSYW5nZSAodmFsdWUpIHtcbiAgICB2YXIgY29weSA9IHZhbHVlLmNsb25lKCkuc3VidHJhY3Qoby50aW1lSW50ZXJ2YWwsICdzZWNvbmRzJyk7XG4gICAgdmFyIHRpbWVzID0gTWF0aC5jZWlsKHNlY29uZHNJbkRheSAvIG8udGltZUludGVydmFsKTtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xuICAgICAgY29weS5hZGQoby50aW1lSW50ZXJ2YWwsICdzZWNvbmRzJyk7XG4gICAgICBpZiAoY29weS5kYXRlKCkgPiB2YWx1ZS5kYXRlKCkpIHtcbiAgICAgICAgY29weS5zdWJ0cmFjdCgxLCAnZGF5cycpO1xuICAgICAgfVxuICAgICAgaWYgKG8udGltZVZhbGlkYXRvci5jYWxsKGFwaSwgY29weS50b0RhdGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlVG93YXJkcyAodmFsdWUsIGRhdGUsIG9wKSB7XG4gICAgdmFyIHZhbGlkID0gZmFsc2U7XG4gICAgd2hpbGUgKHZhbGlkID09PSBmYWxzZSkge1xuICAgICAgdmFsdWVbb3BdKDEsICdkYXlzJyk7XG4gICAgICBpZiAodmFsdWUubW9udGgoKSAhPT0gZGF0ZS5tb250aCgpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdmFsaWQgPSBvLmRhdGVWYWxpZGF0b3IuY2FsbChhcGksIHZhbHVlLnRvRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkICE9PSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tEYXkgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKGNsYXNzZXMuY29udGFpbnModGFyZ2V0LCBvLnN0eWxlcy5kYXlEaXNhYmxlZCkgfHwgIWNsYXNzZXMuY29udGFpbnModGFyZ2V0LCBvLnN0eWxlcy5kYXlCb2R5RWxlbSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRleHQodGFyZ2V0KSwgMTApO1xuICAgIHZhciBwcmV2ID0gY2xhc3Nlcy5jb250YWlucyh0YXJnZXQsIG8uc3R5bGVzLmRheVByZXZNb250aCk7XG4gICAgdmFyIG5leHQgPSBjbGFzc2VzLmNvbnRhaW5zKHRhcmdldCwgby5zdHlsZXMuZGF5TmV4dE1vbnRoKTtcbiAgICB2YXIgb2Zmc2V0ID0gZ2V0TW9udGhPZmZzZXQodGFyZ2V0KSAtIGdldE1vbnRoT2Zmc2V0KGxhc3REYXlFbGVtZW50KTtcbiAgICByZWYuYWRkKG9mZnNldCwgJ21vbnRocycpO1xuICAgIGlmIChwcmV2IHx8IG5leHQpIHtcbiAgICAgIHJlZi5hZGQocHJldiA/IC0xIDogMSwgJ21vbnRocycpO1xuICAgIH1cbiAgICBzZWxlY3REYXlFbGVtZW50KHRhcmdldCk7XG4gICAgcmVmLmRhdGUoZGF5KTsgLy8gbXVzdCBydW4gYWZ0ZXIgc2V0dGluZyB0aGUgbW9udGhcbiAgICBzZXRUaW1lKHJlZiwgaW5SYW5nZShyZWYpIHx8IHJlZik7XG4gICAgcmVmQ2FsID0gcmVmLmNsb25lKCk7XG4gICAgaWYgKG8uYXV0b0Nsb3NlKSB7IGhpZGVDb25kaXRpb25hbGx5KCk7IH1cbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdERheUVsZW1lbnQgKG5vZGUpIHtcbiAgICBpZiAobGFzdERheUVsZW1lbnQpIHtcbiAgICAgIGNsYXNzZXMucmVtb3ZlKGxhc3REYXlFbGVtZW50LCBvLnN0eWxlcy5zZWxlY3RlZERheSk7XG4gICAgfVxuICAgIGlmIChub2RlKSB7XG4gICAgICBjbGFzc2VzLmFkZChub2RlLCBvLnN0eWxlcy5zZWxlY3RlZERheSk7XG4gICAgfVxuICAgIGxhc3REYXlFbGVtZW50ID0gbm9kZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1vbnRoT2Zmc2V0IChlbGVtKSB7XG4gICAgdmFyIG9mZnNldDtcbiAgICB3aGlsZSAoZWxlbSAmJiBlbGVtLmdldEF0dHJpYnV0ZSkge1xuICAgICAgb2Zmc2V0ID0gZWxlbS5nZXRBdHRyaWJ1dGUobW9udGhPZmZzZXRBdHRyaWJ1dGUpO1xuICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChvZmZzZXQsIDEwKTtcbiAgICAgIH1cbiAgICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VGltZSAodG8sIGZyb20pIHtcbiAgICB0by5ob3VyKGZyb20uaG91cigpKS5taW51dGUoZnJvbS5taW51dGUoKSkuc2Vjb25kKGZyb20uc2Vjb25kKCkpO1xuICAgIHJldHVybiB0bztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tUaW1lIChlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICghY2xhc3Nlcy5jb250YWlucyh0YXJnZXQsIG8uc3R5bGVzLnRpbWVPcHRpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IG1vbWVudHVtLm1vbWVudCh0ZXh0KHRhcmdldCksIG8udGltZUZvcm1hdCk7XG4gICAgc2V0VGltZShyZWYsIHZhbHVlKTtcbiAgICByZWZDYWwgPSByZWYuY2xvbmUoKTtcbiAgICBlbWl0VmFsdWVzKCk7XG4gICAgdXBkYXRlVGltZSgpO1xuICAgIGlmICghby5kYXRlICYmIG8uYXV0b0Nsb3NlKSB7XG4gICAgICBoaWRlQ29uZGl0aW9uYWxseSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlVGltZUxpc3QoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlICgpIHtcbiAgICByZXR1cm4gcmVmLnRvRGF0ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGF0ZVN0cmluZyAoZm9ybWF0KSB7XG4gICAgcmV0dXJuIHJlZi5mb3JtYXQoZm9ybWF0IHx8IG8uaW5wdXRGb3JtYXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TW9tZW50ICgpIHtcbiAgICByZXR1cm4gcmVmLmNsb25lKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWxlbmRhcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyaW0gPSAvXlxccyt8XFxzKyQvZztcbnZhciB3aGl0ZXNwYWNlID0gL1xccysvO1xuXG5mdW5jdGlvbiBjbGFzc2VzIChub2RlKSB7XG4gIHJldHVybiBub2RlLmNsYXNzTmFtZS5yZXBsYWNlKHRyaW0sICcnKS5zcGxpdCh3aGl0ZXNwYWNlKTtcbn1cblxuZnVuY3Rpb24gc2V0IChub2RlLCB2YWx1ZSkge1xuICBub2RlLmNsYXNzTmFtZSA9IHZhbHVlLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gYWRkIChub2RlLCB2YWx1ZSkge1xuICB2YXIgdmFsdWVzID0gcmVtb3ZlKG5vZGUsIHZhbHVlKTtcbiAgdmFsdWVzLnB1c2godmFsdWUpO1xuICBzZXQobm9kZSwgdmFsdWVzKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChub2RlLCB2YWx1ZSkge1xuICB2YXIgdmFsdWVzID0gY2xhc3Nlcyhub2RlKTtcbiAgdmFyIGkgPSB2YWx1ZXMuaW5kZXhPZih2YWx1ZSk7XG4gIGlmIChpICE9PSAtMSkge1xuICAgIHZhbHVlcy5zcGxpY2UoaSwgMSk7XG4gICAgc2V0KG5vZGUsIHZhbHVlcyk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuZnVuY3Rpb24gY29udGFpbnMgKG5vZGUsIHZhbHVlKSB7XG4gIHJldHVybiBjbGFzc2VzKG5vZGUpLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkLFxuICByZW1vdmU6IHJlbW92ZSxcbiAgY29udGFpbnM6IGNvbnRhaW5zXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW9tZW50dW0gPSByZXF1aXJlKCcuL21vbWVudHVtJyk7XG5cbi8vIG5hw692ZSBpbXBsZW1lbnRhdGlvbiwgc3BlY2lmaWNhbGx5IG1lYW50IHRvIGNsb25lIGBvcHRpb25zYCBvYmplY3RzXG5mdW5jdGlvbiBjbG9uZSAodGhpbmcpIHtcbiAgdmFyIGNvcHkgPSB7fTtcbiAgdmFyIHZhbHVlO1xuXG4gIGZvciAodmFyIGtleSBpbiB0aGluZykge1xuICAgIHZhbHVlID0gdGhpbmdba2V5XTtcblxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIGNvcHlba2V5XSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAobW9tZW50dW0uaXNNb21lbnQodmFsdWUpKSB7XG4gICAgICBjb3B5W2tleV0gPSB2YWx1ZS5jbG9uZSgpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUuX2lzU3R5bGVzQ29uZmlndXJhdGlvbikge1xuICAgICAgY29weVtrZXldID0gY2xvbmUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3B5W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29weTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluZGV4ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGlucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpO1xudmFyIGlubGluZSA9IHJlcXVpcmUoJy4vaW5saW5lJyk7XG52YXIgaXNJbnB1dCA9IHJlcXVpcmUoJy4vaXNJbnB1dCcpO1xuXG5mdW5jdGlvbiBjb3JlIChlbGVtLCBvcHRpb25zKSB7XG4gIHZhciBjYWw7XG4gIHZhciBleGlzdGluZyA9IGluZGV4LmZpbmQoZWxlbSk7XG4gIGlmIChleGlzdGluZykge1xuICAgIHJldHVybiBleGlzdGluZztcbiAgfVxuXG4gIGlmIChpc0lucHV0KGVsZW0pKSB7XG4gICAgY2FsID0gaW5wdXQoZWxlbSwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgY2FsID0gaW5saW5lKGVsZW0sIG9wdGlvbnMpO1xuICB9XG4gIGNhbC5hc3NvY2lhdGVkID0gZWxlbTtcbiAgaW5kZXguYXNzaWduKGVsZW0sIGNhbCk7XG5cbiAgcmV0dXJuIGNhbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgaXNJbnB1dCA9IHJlcXVpcmUoJy4vaXNJbnB1dCcpO1xudmFyIG1vbWVudHVtID0gcmVxdWlyZSgnLi9tb21lbnR1bScpO1xuXG5mdW5jdGlvbiBkZWZhdWx0cyAob3B0aW9ucywgY2FsKSB7XG4gIHZhciB0ZW1wO1xuICB2YXIgbm87XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8uYXV0b0hpZGVPbkNsaWNrID09PSBubykgeyBvLmF1dG9IaWRlT25DbGljayA9IHRydWU7IH1cbiAgaWYgKG8uYXV0b0hpZGVPbkJsdXIgPT09IG5vKSB7IG8uYXV0b0hpZGVPbkJsdXIgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9DbG9zZSA9PT0gbm8pIHsgby5hdXRvQ2xvc2UgPSB0cnVlOyB9XG4gIGlmIChvLmFwcGVuZFRvID09PSBubykgeyBvLmFwcGVuZFRvID0gZG9jdW1lbnQuYm9keTsgfVxuICBpZiAoby5hcHBlbmRUbyA9PT0gJ3BhcmVudCcpIHtcbiAgICBpZiAoaXNJbnB1dChjYWwuYXNzb2NpYXRlZCkpIHtcbiAgICAgIG8uYXBwZW5kVG8gPSBjYWwuYXNzb2NpYXRlZC5wYXJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lubGluZSBjYWxlbmRhcnMgbXVzdCBiZSBhcHBlbmRlZCB0byBhIHBhcmVudCBub2RlIGV4cGxpY2l0bHkuJyk7XG4gICAgfVxuICB9XG4gIGlmIChvLmludmFsaWRhdGUgPT09IG5vKSB7IG8uaW52YWxpZGF0ZSA9IHRydWU7IH1cbiAgaWYgKG8ucmVxdWlyZWQgPT09IG5vKSB7IG8ucmVxdWlyZWQgPSBmYWxzZTsgfVxuICBpZiAoby5kYXRlID09PSBubykgeyBvLmRhdGUgPSB0cnVlOyB9XG4gIGlmIChvLnRpbWUgPT09IG5vKSB7IG8udGltZSA9IHRydWU7IH1cbiAgaWYgKG8uZGF0ZSA9PT0gZmFsc2UgJiYgby50aW1lID09PSBmYWxzZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvZiBgZGF0ZWAgb3IgYHRpbWVgIG11c3QgYmUgYHRydWVgLicpOyB9XG4gIGlmIChvLmlucHV0Rm9ybWF0ID09PSBubykge1xuICAgIGlmIChvLmRhdGUgJiYgby50aW1lKSB7XG4gICAgICBvLmlucHV0Rm9ybWF0ID0gJ1lZWVktTU0tREQgSEg6bW0nO1xuICAgIH0gZWxzZSBpZiAoby5kYXRlKSB7XG4gICAgICBvLmlucHV0Rm9ybWF0ID0gJ1lZWVktTU0tREQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvLmlucHV0Rm9ybWF0ID0gJ0hIOm1tJztcbiAgICB9XG4gIH1cbiAgaWYgKG8uaW5pdGlhbFZhbHVlID09PSBubykge1xuICAgIG8uaW5pdGlhbFZhbHVlID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICBvLmluaXRpYWxWYWx1ZSA9IHBhcnNlKG8uaW5pdGlhbFZhbHVlLCBvLmlucHV0Rm9ybWF0KTtcbiAgfVxuICBpZiAoby5taW4gPT09IG5vKSB7IG8ubWluID0gbnVsbDsgfSBlbHNlIHsgby5taW4gPSBwYXJzZShvLm1pbiwgby5pbnB1dEZvcm1hdCk7IH1cbiAgaWYgKG8ubWF4ID09PSBubykgeyBvLm1heCA9IG51bGw7IH0gZWxzZSB7IG8ubWF4ID0gcGFyc2Uoby5tYXgsIG8uaW5wdXRGb3JtYXQpOyB9XG4gIGlmIChvLnRpbWVJbnRlcnZhbCA9PT0gbm8pIHsgby50aW1lSW50ZXJ2YWwgPSA2MCAqIDMwOyB9IC8vIDMwIG1pbnV0ZXMgYnkgZGVmYXVsdFxuICBpZiAoby5taW4gJiYgby5tYXgpIHtcbiAgICBpZiAoby5tYXguaXNCZWZvcmUoby5taW4pKSB7XG4gICAgICB0ZW1wID0gby5tYXg7XG4gICAgICBvLm1heCA9IG8ubWluO1xuICAgICAgby5taW4gPSB0ZW1wO1xuICAgIH1cbiAgICBpZiAoby5kYXRlID09PSB0cnVlKSB7XG4gICAgICBpZiAoby5tYXguY2xvbmUoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLmlzQmVmb3JlKG8ubWluKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BtYXhgIG11c3QgYmUgYXQgbGVhc3Qgb25lIGRheSBhZnRlciBgbWluYCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoby50aW1lSW50ZXJ2YWwgKiAxMDAwIC0gby5taW4gJSAoby50aW1lSW50ZXJ2YWwgKiAxMDAwKSA+IG8ubWF4IC0gby5taW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYG1pbmAgdG8gYG1heGAgcmFuZ2UgbXVzdCBhbGxvdyBmb3IgYXQgbGVhc3Qgb25lIHRpbWUgb3B0aW9uIHRoYXQgbWF0Y2hlcyBgdGltZUludGVydmFsYCcpO1xuICAgIH1cbiAgfVxuICBpZiAoby5kYXRlVmFsaWRhdG9yID09PSBubykgeyBvLmRhdGVWYWxpZGF0b3IgPSBGdW5jdGlvbi5wcm90b3R5cGU7IH1cbiAgaWYgKG8udGltZVZhbGlkYXRvciA9PT0gbm8pIHsgby50aW1lVmFsaWRhdG9yID0gRnVuY3Rpb24ucHJvdG90eXBlOyB9XG4gIGlmIChvLnRpbWVGb3JtYXQgPT09IG5vKSB7IG8udGltZUZvcm1hdCA9ICdISDptbSc7IH1cbiAgaWYgKG8ud2Vla1N0YXJ0ID09PSBubykgeyBvLndlZWtTdGFydCA9IG1vbWVudHVtLm1vbWVudCgpLndlZWtkYXkoMCkuZGF5KCk7IH1cbiAgaWYgKG8ud2Vla2RheUZvcm1hdCA9PT0gbm8pIHsgby53ZWVrZGF5Rm9ybWF0ID0gJ21pbic7IH1cbiAgaWYgKG8ud2Vla2RheUZvcm1hdCA9PT0gJ2xvbmcnKSB7XG4gICAgby53ZWVrZGF5Rm9ybWF0ID0gbW9tZW50dW0ubW9tZW50LndlZWtkYXlzKCk7XG4gIH0gZWxzZSBpZiAoby53ZWVrZGF5Rm9ybWF0ID09PSAnc2hvcnQnKSB7XG4gICAgby53ZWVrZGF5Rm9ybWF0ID0gbW9tZW50dW0ubW9tZW50LndlZWtkYXlzU2hvcnQoKTtcbiAgfSBlbHNlIGlmIChvLndlZWtkYXlGb3JtYXQgPT09ICdtaW4nKSB7XG4gICAgby53ZWVrZGF5Rm9ybWF0ID0gbW9tZW50dW0ubW9tZW50LndlZWtkYXlzTWluKCk7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoby53ZWVrZGF5Rm9ybWF0KSB8fCBvLndlZWtkYXlGb3JtYXQubGVuZ3RoIDwgNykge1xuICAgIHRocm93IG5ldyBFcnJvcignYHdlZWtkYXlzYCBtdXN0IGJlIGBtaW5gLCBgc2hvcnRgLCBvciBgbG9uZ2AnKTtcbiAgfVxuICBpZiAoby5tb250aHNJbkNhbGVuZGFyID09PSBubykgeyBvLm1vbnRoc0luQ2FsZW5kYXIgPSAxOyB9XG4gIGlmIChvLm1vbnRoRm9ybWF0ID09PSBubykgeyBvLm1vbnRoRm9ybWF0ID0gJ01NTU0gWVlZWSc7IH1cbiAgaWYgKG8uZGF5Rm9ybWF0ID09PSBubykgeyBvLmRheUZvcm1hdCA9ICdERCc7IH1cbiAgaWYgKG8uc3R5bGVzID09PSBubykgeyBvLnN0eWxlcyA9IHt9OyB9XG5cbiAgby5zdHlsZXMuX2lzU3R5bGVzQ29uZmlndXJhdGlvbiA9IHRydWU7XG5cbiAgdmFyIHN0eWwgPSBvLnN0eWxlcztcbiAgaWYgKHN0eWwuYmFjayA9PT0gbm8pIHsgc3R5bC5iYWNrID0gJ3JkLWJhY2snOyB9XG4gIGlmIChzdHlsLmNvbnRhaW5lciA9PT0gbm8pIHsgc3R5bC5jb250YWluZXIgPSAncmQtY29udGFpbmVyJzsgfVxuICBpZiAoc3R5bC5wb3NpdGlvbmVkID09PSBubykgeyBzdHlsLnBvc2l0aW9uZWQgPSAncmQtY29udGFpbmVyLWF0dGFjaG1lbnQnOyB9XG4gIGlmIChzdHlsLmRhdGUgPT09IG5vKSB7IHN0eWwuZGF0ZSA9ICdyZC1kYXRlJzsgfVxuICBpZiAoc3R5bC5kYXlCb2R5ID09PSBubykgeyBzdHlsLmRheUJvZHkgPSAncmQtZGF5cy1ib2R5JzsgfVxuICBpZiAoc3R5bC5kYXlCb2R5RWxlbSA9PT0gbm8pIHsgc3R5bC5kYXlCb2R5RWxlbSA9ICdyZC1kYXktYm9keSc7IH1cbiAgaWYgKHN0eWwuZGF5UHJldk1vbnRoID09PSBubykgeyBzdHlsLmRheVByZXZNb250aCA9ICdyZC1kYXktcHJldi1tb250aCc7IH1cbiAgaWYgKHN0eWwuZGF5TmV4dE1vbnRoID09PSBubykgeyBzdHlsLmRheU5leHRNb250aCA9ICdyZC1kYXktbmV4dC1tb250aCc7IH1cbiAgaWYgKHN0eWwuZGF5RGlzYWJsZWQgPT09IG5vKSB7IHN0eWwuZGF5RGlzYWJsZWQgPSAncmQtZGF5LWRpc2FibGVkJzsgfVxuICBpZiAoc3R5bC5kYXlDb25jZWFsZWQgPT09IG5vKSB7IHN0eWwuZGF5Q29uY2VhbGVkID0gJ3JkLWRheS1jb25jZWFsZWQnOyB9XG4gIGlmIChzdHlsLmRheUhlYWQgPT09IG5vKSB7IHN0eWwuZGF5SGVhZCA9ICdyZC1kYXlzLWhlYWQnOyB9XG4gIGlmIChzdHlsLmRheUhlYWRFbGVtID09PSBubykgeyBzdHlsLmRheUhlYWRFbGVtID0gJ3JkLWRheS1oZWFkJzsgfVxuICBpZiAoc3R5bC5kYXlSb3cgPT09IG5vKSB7IHN0eWwuZGF5Um93ID0gJ3JkLWRheXMtcm93JzsgfVxuICBpZiAoc3R5bC5kYXlUYWJsZSA9PT0gbm8pIHsgc3R5bC5kYXlUYWJsZSA9ICdyZC1kYXlzJzsgfVxuICBpZiAoc3R5bC5tb250aCA9PT0gbm8pIHsgc3R5bC5tb250aCA9ICdyZC1tb250aCc7IH1cbiAgaWYgKHN0eWwubW9udGhMYWJlbCA9PT0gbm8pIHsgc3R5bC5tb250aExhYmVsID0gJ3JkLW1vbnRoLWxhYmVsJzsgfVxuICBpZiAoc3R5bC5uZXh0ID09PSBubykgeyBzdHlsLm5leHQgPSAncmQtbmV4dCc7IH1cbiAgaWYgKHN0eWwuc2VsZWN0ZWREYXkgPT09IG5vKSB7IHN0eWwuc2VsZWN0ZWREYXkgPSAncmQtZGF5LXNlbGVjdGVkJzsgfVxuICBpZiAoc3R5bC5zZWxlY3RlZFRpbWUgPT09IG5vKSB7IHN0eWwuc2VsZWN0ZWRUaW1lID0gJ3JkLXRpbWUtc2VsZWN0ZWQnOyB9XG4gIGlmIChzdHlsLnRpbWUgPT09IG5vKSB7IHN0eWwudGltZSA9ICdyZC10aW1lJzsgfVxuICBpZiAoc3R5bC50aW1lTGlzdCA9PT0gbm8pIHsgc3R5bC50aW1lTGlzdCA9ICdyZC10aW1lLWxpc3QnOyB9XG4gIGlmIChzdHlsLnRpbWVPcHRpb24gPT09IG5vKSB7IHN0eWwudGltZU9wdGlvbiA9ICdyZC10aW1lLW9wdGlvbic7IH1cblxuICByZXR1cm4gbztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZG9tIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFvLnR5cGUpIHsgby50eXBlID0gJ2Rpdic7IH1cbiAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG8udHlwZSk7XG4gIGlmIChvLmNsYXNzTmFtZSkgeyBlbGVtLmNsYXNzTmFtZSA9IG8uY2xhc3NOYW1lOyB9XG4gIGlmIChvLnRleHQpIHsgZWxlbS5pbm5lclRleHQgPSBlbGVtLnRleHRDb250ZW50ID0gby50ZXh0OyB9XG4gIGlmIChvLmF0dHJpYnV0ZXMpIHtcbiAgICBPYmplY3Qua2V5cyhvLmF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksIG8uYXR0cmlidXRlc1trZXldKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoby5wYXJlbnQpIHsgby5wYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbSk7IH1cbiAgcmV0dXJuIGVsZW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG5cbmlmICghd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG59XG5cbmlmICghd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWxlbWVudCwgZXZ0LCBmbiwgY2FwdHVyZSkge1xuICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dCwgZm4sIGNhcHR1cmUpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhcmQgKGVsZW1lbnQsIGV2dCwgZm4sIGNhcHR1cmUpIHtcbiAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2dCwgZnVuY3Rpb24gKGFlKSB7XG4gICAgdmFyIGUgPSBhZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCAgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGZuLmNhbGwoZWxlbWVudCwgZSk7XG4gIH0sIGNhcHR1cmUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsZW1lbnQsIGV2dCwgZm4pIHtcbiAgcmV0dXJuIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGZuKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbGVtZW50LCBldnQsIGZuKSB7XG4gIHJldHVybiBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldnQsIGZuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnRcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbm87XG52YXIgaWtleSA9ICdkYXRhLXJvbWUtaWQnO1xudmFyIGluZGV4ID0gW107XG5cbmZ1bmN0aW9uIGZpbmQgKHRoaW5nKSB7IC8vIGNhbiBiZSBhIERPTSBlbGVtZW50IG9yIGEgbnVtYmVyXG4gIGlmICh0eXBlb2YgdGhpbmcgIT09ICdudW1iZXInICYmIHRoaW5nICYmIHRoaW5nLmdldEF0dHJpYnV0ZSkge1xuICAgIHJldHVybiBmaW5kKHRoaW5nLmdldEF0dHJpYnV0ZShpa2V5KSk7XG4gIH1cbiAgdmFyIGV4aXN0aW5nID0gaW5kZXhbdGhpbmddO1xuICBpZiAoZXhpc3RpbmcgIT09IG5vKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBhc3NpZ24gKGVsZW0sIGluc3RhbmNlKSB7XG4gIGVsZW0uc2V0QXR0cmlidXRlKGlrZXksIGluc3RhbmNlLmlkID0gaW5kZXgucHVzaChpbnN0YW5jZSkgLSAxKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpbmQ6IGZpbmQsXG4gIGFzc2lnbjogYXNzaWduXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFmID0gcmVxdWlyZSgncmFmJyk7XG52YXIgY2FsZW5kYXIgPSByZXF1aXJlKCcuL2NhbGVuZGFyJyk7XG5cbmZ1bmN0aW9uIGlubGluZSAoZWxlbSwgY2FsZW5kYXJPcHRpb25zKSB7XG4gIHZhciBvID0gY2FsZW5kYXJPcHRpb25zIHx8IHt9O1xuXG4gIG8uYXBwZW5kVG8gPSBlbGVtO1xuXG4gIHZhciBhcGkgPSBjYWxlbmRhcihvKVxuICAgIC5vbigncmVhZHknLCByZWFkeSk7XG5cbiAgZnVuY3Rpb24gcmVhZHkgKCkge1xuICAgIHJhZihhcGkuc2hvdyk7XG4gIH1cblxuICByZXR1cm4gYXBpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlubGluZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRocm90dGxlID0gcmVxdWlyZSgnbG9kYXNoLnRocm90dGxlJyk7XG52YXIgcmFmID0gcmVxdWlyZSgncmFmJyk7XG52YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG52YXIgY2FsZW5kYXIgPSByZXF1aXJlKCcuL2NhbGVuZGFyJyk7XG52YXIgbW9tZW50dW0gPSByZXF1aXJlKCcuL21vbWVudHVtJyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJy4vZXZlbnRzJyk7XG5cbmZ1bmN0aW9uIGlucHV0Q2FsZW5kYXIgKGlucHV0LCBjYWxlbmRhck9wdGlvbnMpIHtcbiAgdmFyIG87XG4gIHZhciBhcGkgPSBjYWxlbmRhcihhc0lucHV0KGNhbGVuZGFyT3B0aW9ucykpO1xuICB2YXIgdGhyb3R0bGVkVGFrZUlucHV0ID0gdGhyb3R0bGUodGFrZUlucHV0LCA1MCk7XG4gIHZhciB0aHJvdHRsZWRQb3NpdGlvbiA9IHRocm90dGxlKHBvc2l0aW9uLCAzMCk7XG4gIHZhciBpZ25vcmVJbnZhbGlkYXRpb247XG4gIHZhciBpZ25vcmVTaG93O1xuXG4gIGluaXQoY2FsZW5kYXJPcHRpb25zKTtcblxuICByZXR1cm4gYXBpO1xuXG4gIGZ1bmN0aW9uIGFzSW5wdXQgKG9wdGlvbnMpIHtcbiAgICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gICAgby5faW5wdXQgPSB0cnVlO1xuICAgIHJldHVybiBvO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCAoaW5pdE9wdGlvbnMpIHtcbiAgICBvID0gZGVmYXVsdHMoYXNJbnB1dChpbml0T3B0aW9ucyB8fCBjYWxlbmRhck9wdGlvbnMpLCBhcGkpO1xuXG4gICAgY2xhc3Nlcy5hZGQoYXBpLmNvbnRhaW5lciwgby5zdHlsZXMucG9zaXRpb25lZCk7XG4gICAgZXZlbnRzLmFkZChhcGkuY29udGFpbmVyLCAnbW91c2Vkb3duJywgY29udGFpbmVyTW91c2VEb3duKTtcbiAgICBldmVudHMuYWRkKGFwaS5jb250YWluZXIsICdjbGljaycsIGNvbnRhaW5lckNsaWNrKTtcblxuICAgIGFwaS5nZXREYXRlID0gdW5yZXF1aXJlKGFwaS5nZXREYXRlKTtcbiAgICBhcGkuZ2V0RGF0ZVN0cmluZyA9IHVucmVxdWlyZShhcGkuZ2V0RGF0ZVN0cmluZyk7XG4gICAgYXBpLmdldE1vbWVudCA9IHVucmVxdWlyZShhcGkuZ2V0TW9tZW50KTtcblxuICAgIGlmIChvLmluaXRpYWxWYWx1ZSkge1xuICAgICAgaW5wdXQudmFsdWUgPSBvLmluaXRpYWxWYWx1ZS5mb3JtYXQoby5pbnB1dEZvcm1hdCk7XG4gICAgfVxuXG4gICAgYXBpLm9uKCdkYXRhJywgdXBkYXRlSW5wdXQpO1xuICAgIGFwaS5vbignc2hvdycsIHRocm90dGxlZFBvc2l0aW9uKTtcblxuICAgIGV2ZW50TGlzdGVuaW5nKCk7XG4gICAgdGhyb3R0bGVkVGFrZUlucHV0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBldmVudExpc3RlbmluZyh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuaW5nIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGV2ZW50c1tvcF0oaW5wdXQsICdjbGljaycsIHNob3cpO1xuICAgIGV2ZW50c1tvcF0oaW5wdXQsICd0b3VjaGVuZCcsIHNob3cpO1xuICAgIGV2ZW50c1tvcF0oaW5wdXQsICdmb2N1c2luJywgc2hvdyk7XG4gICAgZXZlbnRzW29wXShpbnB1dCwgJ2NoYW5nZScsIHRocm90dGxlZFRha2VJbnB1dCk7XG4gICAgZXZlbnRzW29wXShpbnB1dCwgJ2tleXByZXNzJywgdGhyb3R0bGVkVGFrZUlucHV0KTtcbiAgICBldmVudHNbb3BdKGlucHV0LCAna2V5ZG93bicsIHRocm90dGxlZFRha2VJbnB1dCk7XG4gICAgZXZlbnRzW29wXShpbnB1dCwgJ2lucHV0JywgdGhyb3R0bGVkVGFrZUlucHV0KTtcbiAgICBpZiAoby5pbnZhbGlkYXRlKSB7IGV2ZW50c1tvcF0oaW5wdXQsICdibHVyJywgaW52YWxpZGF0ZUlucHV0KTsgfVxuICAgIGV2ZW50c1tvcF0od2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkUG9zaXRpb24pO1xuXG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAgYXBpLm9uY2UoJ3JlYWR5JywgaW5pdCk7XG4gICAgICBhcGkub2ZmKCdkZXN0cm95ZWQnLCBkZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLm9mZigncmVhZHknLCBpbml0KTtcbiAgICAgIGFwaS5vbmNlKCdkZXN0cm95ZWQnLCBkZXN0cm95KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJDbGljayAoKSB7XG4gICAgaWdub3JlU2hvdyA9IHRydWU7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgICBpZ25vcmVTaG93ID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJNb3VzZURvd24gKCkge1xuICAgIGlnbm9yZUludmFsaWRhdGlvbiA9IHRydWU7XG4gICAgcmFmKHVuaWdub3JlKTtcblxuICAgIGZ1bmN0aW9uIHVuaWdub3JlICgpIHtcbiAgICAgIGlnbm9yZUludmFsaWRhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRhdGVJbnB1dCAoKSB7XG4gICAgaWYgKCFpZ25vcmVJbnZhbGlkYXRpb24gJiYgIWlzRW1wdHkoKSkge1xuICAgICAgYXBpLmVtaXRWYWx1ZXMoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93ICgpIHtcbiAgICBpZiAoaWdub3JlU2hvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhcGkuc2hvdygpO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zaXRpb24gKCkge1xuICAgIHZhciBib3VuZHMgPSBpbnB1dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgc2Nyb2xsVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBhcGkuY29udGFpbmVyLnN0eWxlLnRvcCAgPSBib3VuZHMudG9wICsgc2Nyb2xsVG9wICsgaW5wdXQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICBhcGkuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBib3VuZHMubGVmdCArICdweCc7XG4gIH1cblxuICBmdW5jdGlvbiB0YWtlSW5wdXQgKCkge1xuICAgIHZhciB2YWx1ZSA9IGlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICBpZiAoaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBkYXRlID0gbW9tZW50dW0ubW9tZW50KHZhbHVlLCBvLmlucHV0Rm9ybWF0KTtcbiAgICBhcGkuc2V0VmFsdWUoZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVJbnB1dCAoZGF0YSkge1xuICAgIGlucHV0LnZhbHVlID0gZGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkgKCkge1xuICAgIHJldHVybiBvLnJlcXVpcmVkID09PSBmYWxzZSAmJiBpbnB1dC52YWx1ZS50cmltKCkgPT09ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5yZXF1aXJlIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBtYXliZSAoKSB7XG4gICAgICByZXR1cm4gaXNFbXB0eSgpID8gbnVsbCA6IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0Q2FsZW5kYXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGlzSW5wdXQgKGVsZW0pIHtcbiAgcmV0dXJuIGVsZW0gJiYgZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbnB1dDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNNb21lbnQgKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdfaXNBTW9tZW50T2JqZWN0Jyk7XG59XG5cbnZhciBhcGkgPSB7XG4gIG1vbWVudDogbnVsbCxcbiAgaXNNb21lbnQ6IGlzTW9tZW50XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwaTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vb3A7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtb21lbnR1bSA9IHJlcXVpcmUoJy4vbW9tZW50dW0nKTtcblxuZnVuY3Rpb24gcmF3IChkYXRlLCBmb3JtYXQpIHtcbiAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBtb21lbnR1bS5tb21lbnQoZGF0ZSwgZm9ybWF0KTtcbiAgfVxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGUpID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICByZXR1cm4gbW9tZW50dW0ubW9tZW50KGRhdGUpO1xuICB9XG4gIGlmIChtb21lbnR1bS5pc01vbWVudChkYXRlKSkge1xuICAgIHJldHVybiBkYXRlLmNsb25lKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2UgKGRhdGUsIGZvcm1hdCkge1xuICB2YXIgbSA9IHJhdyhkYXRlLCB0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJyA/IGZvcm1hdCA6IG51bGwpO1xuICByZXR1cm4gbSAmJiBtLmlzVmFsaWQoKSA/IG0gOiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maWx0ZXIpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gICAgdmFyIGYgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHYsIGksIHQpIHtcbiAgICAgIGlmIChmbi5jYWxsKGN0eCwgdiwgaSwgdCkpIHsgZi5wdXNoKHYpOyB9XG4gICAgfSwgY3R4KTtcbiAgICByZXR1cm4gZjtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gICAgaWYgKHRoaXMgPT09IHZvaWQgMCB8fCB0aGlzID09PSBudWxsIHx8IHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgdCA9IHRoaXM7XG4gICAgdmFyIGxlbiA9IHQubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpIGluIHQpIHsgZm4uY2FsbChjdHgsIHRbaV0sIGksIHQpOyB9XG4gICAgfVxuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gIEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKHdoYXQsIHN0YXJ0KSB7XG4gICAgaWYgKHRoaXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICBzdGFydCA9ICtzdGFydCB8fCAwO1xuICAgIGlmIChNYXRoLmFicyhzdGFydCkgPT09IEluZmluaXR5KSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfSBlbHNlIGlmIChzdGFydCA8IDApIHtcbiAgICAgIHN0YXJ0ICs9IGxlbmd0aDtcbiAgICAgIGlmIChzdGFydCA8IDApIHsgc3RhcnQgPSAwOyB9XG4gICAgfVxuICAgIGZvciAoOyBzdGFydCA8IGxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKHRoaXNbc3RhcnRdID09PSB3aGF0KSB7XG4gICAgICAgIHJldHVybiBzdGFydDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcnJheS5pc0FycmF5IHx8IChBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuICcnICsgYSAhPT0gYSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKCFBcnJheS5wcm90b3R5cGUubWFwKSB7XG4gIEFycmF5LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICAgIHZhciBjb250ZXh0LCByZXN1bHQsIGk7XG5cbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlID0gT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSBzb3VyY2UubGVuZ3RoID4+PiAwO1xuXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihmbiArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnRleHQgPSBjdHg7XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbik7XG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgaWYgKGkgaW4gc291cmNlKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IGZuLmNhbGwoY29udGV4dCwgc291cmNlW2ldLCBpLCBzb3VyY2UpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5zb21lKSB7XG4gIEFycmF5LnByb3RvdHlwZS5zb21lID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgICB2YXIgY29udGV4dCwgaTtcblxuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2UgPSBPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHNvdXJjZS5sZW5ndGggPj4+IDA7XG5cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgY29udGV4dCA9IGN0eDtcbiAgICB9XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBpZiAoaSBpbiBzb3VyY2UpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBmbi5jYWxsKGNvbnRleHQsIHNvdXJjZVtpXSwgaSwgc291cmNlKTtcbiAgICAgICAgaWYgKHRlc3QpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG4gICAgdmFyIGN1cnJpZWQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBvcmlnaW5hbCA9IHRoaXM7XG4gICAgdmFyIE5vT3AgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICB2YXIgYm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY3R4ID0gdGhpcyBpbnN0YW5jZW9mIE5vT3AgJiYgY29udGV4dCA/IHRoaXMgOiBjb250ZXh0O1xuICAgICAgdmFyIGFyZ3MgPSBjdXJyaWVkLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgIHJldHVybiBvcmlnaW5hbC5hcHBseShjdHgsIGFyZ3MpO1xuICAgIH07XG4gICAgTm9PcC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgTm9PcCgpO1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaGFzRG9udEVudW1CdWcgPSAhKHsgdG9TdHJpbmc6IG51bGwgfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG52YXIgZG9udEVudW1zID0gW1xuICAndG9TdHJpbmcnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndmFsdWVPZicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ2NvbnN0cnVjdG9yJ1xuXTtcbnZhciBkb250RW51bXNMZW5ndGggPSBkb250RW51bXMubGVuZ3RoO1xuXG5pZiAoIU9iamVjdC5rZXlzKSB7XG4gIE9iamVjdC5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmICh0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBub24tb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdLCBwcm9wLCBpO1xuXG4gICAgZm9yIChwcm9wIGluIG9iaikge1xuICAgICAgaWYgKGhhc093bi5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc0RvbnRFbnVtQnVnKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZG9udEVudW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093bi5jYWxsKG9iaiwgZG9udEVudW1zW2ldKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGRvbnRFbnVtc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnRyaW0pIHtcbiAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gdGhlc2UgYXJlIG9ubHkgcmVxdWlyZWQgZm9yIElFIDwgOVxuLy8gbWF5YmUgbW92ZSB0byBJRS1zcGVjaWZpYyBkaXN0cm8/XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9mdW5jdGlvbi5iaW5kJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9hcnJheS5mb3JlYWNoJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9hcnJheS5tYXAnKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzL2FycmF5LmZpbHRlcicpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMvYXJyYXkuaXNhcnJheScpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMvYXJyYXkuaW5kZXhvZicpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMvYXJyYXkuc29tZScpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMvc3RyaW5nLnRyaW0nKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzL29iamVjdC5rZXlzJyk7XG5cbnZhciBjb3JlID0gcmVxdWlyZSgnLi9jb3JlJyk7XG52YXIgaW5kZXggPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgdXNlID0gcmVxdWlyZSgnLi91c2UnKTtcblxuY29yZS51c2UgPSB1c2UuYmluZChjb3JlKTtcbmNvcmUuZmluZCA9IGluZGV4LmZpbmQ7XG5jb3JlLnZhbCA9IHJlcXVpcmUoJy4vdmFsaWRhdG9ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmU7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgcm9tZSA9IHJlcXVpcmUoJy4vcm9tZScpO1xudmFyIG1vbWVudHVtID0gcmVxdWlyZSgnLi9tb21lbnR1bScpO1xuXG5yb21lLnVzZShnbG9iYWwubW9tZW50KTtcblxuaWYgKG1vbWVudHVtLm1vbWVudCA9PT0gdm9pZCAwKSB7XG4gIHRocm93IG5ldyBFcnJvcigncm9tZSBkZXBlbmRzIG9uIG1vbWVudC5qcywgeW91IGNhbiBnZXQgaXQgYXQgaHR0cDovL21vbWVudGpzLmNvbSwgb3IgeW91IGNvdWxkIHVzZSB0aGUgYnVuZGxlZCBkaXN0cmlidXRpb24gZmlsZSBpbnN0ZWFkLicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJvbWU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0ZXh0IChlbGVtLCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIGVsZW0uaW5uZXJUZXh0ID0gZWxlbS50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBlbGVtLmlubmVyVGV4dCB8fCBlbGVtLnRleHRDb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRleHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtb21lbnR1bSA9IHJlcXVpcmUoJy4vbW9tZW50dW0nKTtcblxuZnVuY3Rpb24gdXNlIChtb21lbnQpIHtcbiAgdGhpcy5tb21lbnQgPSBtb21lbnR1bS5tb21lbnQgPSBtb21lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5kZXggPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgYXNzb2NpYXRpb24gPSByZXF1aXJlKCcuL2Fzc29jaWF0aW9uJyk7XG5cbmZ1bmN0aW9uIGNvbXBhcmVCdWlsZGVyIChjb21wYXJlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmYWN0b3J5ICh2YWx1ZSkge1xuICAgIHZhciBmaXhlZCA9IHBhcnNlKHZhbHVlKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB2YWxpZGF0ZSAoZGF0ZSkge1xuICAgICAgdmFyIGNhbCA9IGluZGV4LmZpbmQodmFsdWUpO1xuICAgICAgdmFyIGxlZnQgPSBwYXJzZShkYXRlKTtcbiAgICAgIHZhciByaWdodCA9IGZpeGVkIHx8IGNhbCAmJiBjYWwuZ2V0TW9tZW50KCk7XG4gICAgICBpZiAoIXJpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNhbCkge1xuICAgICAgICBhc3NvY2lhdGlvbi5hZGQodGhpcywgY2FsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb21wYXJlKGxlZnQsIHJpZ2h0KTtcbiAgICB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiByYW5nZUJ1aWxkZXIgKGhvdywgY29tcGFyZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZmFjdG9yeSAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBkYXRlcztcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0YXJ0KSkge1xuICAgICAgZGF0ZXMgPSBzdGFydDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGxlbiA9PT0gMSkge1xuICAgICAgICBkYXRlcyA9IFtzdGFydF07XG4gICAgICB9IGVsc2UgaWYgKGxlbiA9PT0gMikge1xuICAgICAgICBkYXRlcyA9IFtbc3RhcnQsIGVuZF1dO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiB2YWxpZGF0ZSAoZGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGVzLm1hcChleHBhbmQuYmluZCh0aGlzKSlbaG93XShjb21wYXJlLmJpbmQodGhpcywgZGF0ZSkpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBleHBhbmQgKHZhbHVlKSB7XG4gICAgICB2YXIgc3RhcnQsIGVuZDtcbiAgICAgIHZhciBjYWwgPSBpbmRleC5maW5kKHZhbHVlKTtcbiAgICAgIGlmIChjYWwpIHtcbiAgICAgICAgc3RhcnQgPSBlbmQgPSBjYWwuZ2V0TW9tZW50KCk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHN0YXJ0ID0gdmFsdWVbMF07IGVuZCA9IHZhbHVlWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnQgPSBlbmQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWwpIHtcbiAgICAgICAgYXNzb2NpYXRpb24uYWRkKGNhbCwgdGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogcGFyc2Uoc3RhcnQpLnN0YXJ0T2YoJ2RheScpLnRvRGF0ZSgpLFxuICAgICAgICBlbmQ6IHBhcnNlKGVuZCkuZW5kT2YoJ2RheScpLnRvRGF0ZSgpXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGFmdGVyRXEgID0gY29tcGFyZUJ1aWxkZXIoZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ID49IHJpZ2h0OyB9KTtcbnZhciBhZnRlciAgICA9IGNvbXBhcmVCdWlsZGVyKGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCAgPiByaWdodDsgfSk7XG52YXIgYmVmb3JlRXEgPSBjb21wYXJlQnVpbGRlcihmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgPD0gcmlnaHQ7IH0pO1xudmFyIGJlZm9yZSAgID0gY29tcGFyZUJ1aWxkZXIoZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ICA8IHJpZ2h0OyB9KTtcblxudmFyIGV4Y2VwdCAgID0gcmFuZ2VCdWlsZGVyKCdldmVyeScsIGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gcmlnaHQuc3RhcnQgID4gbGVmdCB8fCByaWdodC5lbmQgIDwgbGVmdDsgfSk7XG52YXIgb25seSAgICAgPSByYW5nZUJ1aWxkZXIoJ3NvbWUnLCAgZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiByaWdodC5zdGFydCA8PSBsZWZ0ICYmIHJpZ2h0LmVuZCA+PSBsZWZ0OyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFmdGVyRXE6IGFmdGVyRXEsXG4gIGFmdGVyOiBhZnRlcixcbiAgYmVmb3JlRXE6IGJlZm9yZUVxLFxuICBiZWZvcmU6IGJlZm9yZSxcbiAgZXhjZXB0OiBleGNlcHQsXG4gIG9ubHk6IG9ubHlcbn07XG4iXX0=
(38)
});
