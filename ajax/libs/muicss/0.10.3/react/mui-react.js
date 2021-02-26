(function (global) {
  var babelHelpers = global.babelHelpers = {};

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  babelHelpers.classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  babelHelpers.createClass = _createClass;

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

  babelHelpers.defineProperty = _defineProperty;

  function _extends() {
    babelHelpers.extends = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  babelHelpers.extends = _extends;

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) babelHelpers.setPrototypeOf(subClass, superClass);
  }

  babelHelpers.inherits = _inherits;

  function _getPrototypeOf(o) {
    babelHelpers.getPrototypeOf = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  babelHelpers.getPrototypeOf = _getPrototypeOf;

  function _setPrototypeOf(o, p) {
    babelHelpers.setPrototypeOf = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  babelHelpers.setPrototypeOf = _setPrototypeOf;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  babelHelpers.interopRequireDefault = _interopRequireDefault;

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function () {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  babelHelpers.interopRequireWildcard = _interopRequireWildcard;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  babelHelpers.objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = babelHelpers.objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  babelHelpers.objectWithoutProperties = _objectWithoutProperties;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  babelHelpers.assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return babelHelpers.assertThisInitialized(self);
  }

  babelHelpers.possibleConstructorReturn = _possibleConstructorReturn;
})(typeof global === "undefined" ? self : global);(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * MUI React main module
 * @module react/main
 */
(function (win) {
  // return if library has been loaded already
  if (win._muiReactLoaded) return;else win._muiReactLoaded = true;
  var mui = win.mui = win.mui || [],
      react = mui.react = {},
      lib;
  react.Appbar = require('src/react/appbar');
  react.Button = require('src/react/button');
  react.Caret = require('src/react/caret');
  react.Checkbox = require('src/react/checkbox');
  react.Col = require('src/react/col');
  react.Container = require('src/react/container');
  react.Divider = require('src/react/divider');
  react.Dropdown = require('src/react/dropdown'), react.DropdownItem = require('src/react/dropdown-item'), react.Form = require('src/react/form');
  react.Input = require('src/react/input');
  react.Option = require('src/react/option');
  react.Panel = require('src/react/panel');
  react.Radio = require('src/react/radio');
  react.Row = require('src/react/row');
  react.Select = require('src/react/select');
  react.Tab = require('src/react/tab');
  react.Tabs = require('src/react/tabs');
  react.Textarea = require('src/react/textarea');
})(window);

},{"src/react/appbar":11,"src/react/button":12,"src/react/caret":13,"src/react/checkbox":14,"src/react/col":15,"src/react/container":16,"src/react/divider":17,"src/react/dropdown":19,"src/react/dropdown-item":18,"src/react/form":20,"src/react/input":21,"src/react/option":22,"src/react/panel":23,"src/react/radio":24,"src/react/row":25,"src/react/select":26,"src/react/tab":27,"src/react/tabs":28,"src/react/textarea":29}],2:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule shallowCompare
 */

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}

module.exports = shallowCompare;

},{"fbjs/lib/shallowEqual":2}],5:[function(require,module,exports){
"use strict";

/**
 * MUI config module
 * @module config
 */

/** Define module API */
module.exports = {
  /** Use debug mode */
  debug: true
};

},{}],6:[function(require,module,exports){
/**
 * MUI CSS/JS form helpers module
 * @module lib/forms.py
 */
'use strict';

var jqLite = require('./jqLite');
/**
 * Menu position/size/scroll helper
 * @returns {Object} Object with keys 'height', 'top', 'scrollTop'
 */


function getMenuPositionalCSSFn(wrapperEl, menuEl, selectedRow) {
  var viewHeight = document.documentElement.clientHeight,
      numRows = menuEl.children.length; // determine menu height

  var h = parseInt(menuEl.offsetHeight),
      height = Math.min(h, viewHeight); // determine row height

  var p = parseInt(jqLite.css(menuEl, 'padding-top')),
      rowHeight = (h - 2 * p) / numRows; // determine 'top'

  var top, initTop, minTop, maxTop;
  initTop = -1 * selectedRow * rowHeight;
  minTop = -1 * wrapperEl.getBoundingClientRect().top;
  maxTop = viewHeight - height + minTop;
  top = Math.min(Math.max(initTop, minTop), maxTop); // determine 'scrollTop'

  var scrollTop = 0,
      scrollIdeal,
      scrollMax;

  if (h > viewHeight) {
    scrollIdeal = top + p + selectedRow * rowHeight;
    scrollMax = numRows * rowHeight + 2 * p - height;
    scrollTop = Math.min(scrollIdeal, scrollMax);
  }

  return {
    'height': height + 'px',
    'top': top + 'px',
    'scrollTop': scrollTop
  };
}
/** Define module API */


module.exports = {
  getMenuPositionalCSS: getMenuPositionalCSSFn
};

},{"./jqLite":7}],7:[function(require,module,exports){
/**
 * MUI CSS/JS jqLite module
 * @module lib/jqLite
 */
'use strict';
/**
 * Add a class to an element.
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */

function jqLiteAddClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i = 0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();

    if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
      existingClasses += cssClass + ' ';
    }
  }

  element.setAttribute('class', existingClasses.trim());
}
/**
 * Get or set CSS properties.
 * @param {Element} element - The DOM element.
 * @param {string} [name] - The property name.
 * @param {string} [value] - The property value.
 */


function jqLiteCss(element, name, value) {
  // Return full style object
  if (name === undefined) {
    return getComputedStyle(element);
  }

  var nameType = jqLiteType(name); // Set multiple values

  if (nameType === 'object') {
    for (var key in name) {
      element.style[_camelCase(key)] = name[key];
    }

    return;
  } // Set a single value


  if (nameType === 'string' && value !== undefined) {
    element.style[_camelCase(name)] = value;
  }

  var styleObj = getComputedStyle(element),
      isArray = jqLiteType(name) === 'array'; // Read single value

  if (!isArray) return _getCurrCssProp(element, name, styleObj); // Read multiple values

  var outObj = {},
      key;

  for (var i = 0; i < name.length; i++) {
    key = name[i];
    outObj[key] = _getCurrCssProp(element, key, styleObj);
  }

  return outObj;
}
/**
 * Check if element has class.
 * @param {Element} element - The DOM element.
 * @param {string} cls - The class name string.
 */


function jqLiteHasClass(element, cls) {
  if (!cls || !element.getAttribute) return false;
  return _getExistingClasses(element).indexOf(' ' + cls + ' ') > -1;
}
/**
 * Return the type of a variable.
 * @param {} somevar - The JavaScript variable.
 */


function jqLiteType(somevar) {
  // handle undefined
  if (somevar === undefined) return 'undefined'; // handle others (of type [object <Type>])

  var typeStr = Object.prototype.toString.call(somevar);

  if (typeStr.indexOf('[object ') === 0) {
    return typeStr.slice(8, -1).toLowerCase();
  } else {
    throw new Error("MUI: Could not understand type: " + typeStr);
  }
}
/**
 * Attach an event handler to a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */


function jqLiteOn(element, events, callback, useCapture) {
  useCapture = useCapture === undefined ? false : useCapture;
  var cache = element._muiEventCache = element._muiEventCache || {};
  events.split(' ').map(function (event) {
    // add to DOM
    element.addEventListener(event, callback, useCapture); // add to cache

    cache[event] = cache[event] || [];
    cache[event].push([callback, useCapture]);
  });
}
/**
 * Remove an event handler from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */


function jqLiteOff(element, events, callback, useCapture) {
  useCapture = useCapture === undefined ? false : useCapture; // remove from cache

  var cache = element._muiEventCache = element._muiEventCache || {},
      argsList,
      args,
      i;
  events.split(' ').map(function (event) {
    argsList = cache[event] || [];
    i = argsList.length;

    while (i--) {
      args = argsList[i]; // remove all events if callback is undefined

      if (callback === undefined || args[0] === callback && args[1] === useCapture) {
        // remove from cache
        argsList.splice(i, 1); // remove from DOM

        element.removeEventListener(event, args[0], args[1]);
      }
    }
  });
}
/**
 * Attach an event hander which will only execute once per element per event
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */


function jqLiteOne(element, events, callback, useCapture) {
  events.split(' ').map(function (event) {
    jqLiteOn(element, event, function onFn(ev) {
      // execute callback
      if (callback) callback.apply(this, arguments); // remove wrapper

      jqLiteOff(element, event, onFn, useCapture);
    }, useCapture);
  });
}
/**
 * Get or set horizontal scroll position
 * @param {Element} element - The DOM element
 * @param {number} [value] - The scroll position
 */


function jqLiteScrollLeft(element, value) {
  var win = window; // get

  if (value === undefined) {
    if (element === win) {
      var docEl = document.documentElement;
      return (win.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0);
    } else {
      return element.scrollLeft;
    }
  } // set


  if (element === win) win.scrollTo(value, jqLiteScrollTop(win));else element.scrollLeft = value;
}
/**
 * Get or set vertical scroll position
 * @param {Element} element - The DOM element
 * @param {number} value - The scroll position
 */


function jqLiteScrollTop(element, value) {
  var win = window; // get

  if (value === undefined) {
    if (element === win) {
      var docEl = document.documentElement;
      return (win.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
    } else {
      return element.scrollTop;
    }
  } // set


  if (element === win) win.scrollTo(jqLiteScrollLeft(win), value);else element.scrollTop = value;
}
/**
 * Return object representing top/left offset and element height/width.
 * @param {Element} element - The DOM element.
 */


function jqLiteOffset(element) {
  var win = window,
      rect = element.getBoundingClientRect(),
      scrollTop = jqLiteScrollTop(win),
      scrollLeft = jqLiteScrollLeft(win);
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    height: rect.height,
    width: rect.width
  };
}
/**
 * Attach a callback to the DOM ready event listener
 * @param {Function} fn - The callback function.
 */


function jqLiteReady(fn) {
  var done = false,
      top = true,
      doc = document,
      win = doc.defaultView,
      root = doc.documentElement,
      add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
      rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
      pre = doc.addEventListener ? '' : 'on';

  var init = function init(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') {
      return;
    }

    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  };

  var poll = function poll() {
    try {
      root.doScroll('left');
    } catch (e) {
      setTimeout(poll, 50);
      return;
    }

    init('poll');
  };

  if (doc.readyState == 'complete') {
    fn.call(win, 'lazy');
  } else {
    if (doc.createEventObject && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (e) {}

      if (top) poll();
    }

    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }
}
/**
 * Remove classes from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */


function jqLiteRemoveClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i = 0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();

    while (existingClasses.indexOf(' ' + cssClass + ' ') >= 0) {
      existingClasses = existingClasses.replace(' ' + cssClass + ' ', ' ');
    }
  }

  element.setAttribute('class', existingClasses.trim());
} // ------------------------------
// Utilities
// ------------------------------


var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
    MOZ_HACK_REGEXP = /^moz([A-Z])/,
    ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g;

function _getExistingClasses(element) {
  var classes = (element.getAttribute('class') || '').replace(/[\n\t]/g, '');
  return ' ' + classes + ' ';
}

function _camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

function _escapeRegExp(string) {
  return string.replace(ESCAPE_REGEXP, "\\$1");
}

function _getCurrCssProp(elem, name, computed) {
  var ret; // try computed style

  ret = computed.getPropertyValue(name); // try style attribute (if element is not attached to document)

  if (ret === '' && !elem.ownerDocument) ret = elem.style[_camelCase(name)];
  return ret;
}
/**
 * Module API
 */


module.exports = {
  /** Add classes */
  addClass: jqLiteAddClass,

  /** Get or set CSS properties */
  css: jqLiteCss,

  /** Check for class */
  hasClass: jqLiteHasClass,

  /** Remove event handlers */
  off: jqLiteOff,

  /** Return offset values */
  offset: jqLiteOffset,

  /** Add event handlers */
  on: jqLiteOn,

  /** Add an execute-once event handler */
  one: jqLiteOne,

  /** DOM ready event handler */
  ready: jqLiteReady,

  /** Remove classes */
  removeClass: jqLiteRemoveClass,

  /** Check JavaScript variable instance type */
  type: jqLiteType,

  /** Get or set horizontal scroll position */
  scrollLeft: jqLiteScrollLeft,

  /** Get or set vertical scroll position */
  scrollTop: jqLiteScrollTop
};

},{}],8:[function(require,module,exports){
/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */
'use strict';

var config = require('../config'),
    jqLite = require('./jqLite'),
    scrollLock = 0,
    scrollLockCls = 'mui-scroll-lock',
    scrollLockPos,
    scrollStyleEl,
    scrollEventHandler,
    _scrollBarWidth,
    _supportsPointerEvents;

scrollEventHandler = function scrollEventHandler(ev) {
  // stop propagation on window scroll events
  if (!ev.target.tagName) ev.stopImmediatePropagation();
};
/**
 * Logging function
 */


function logFn() {
  var win = window;

  if (config.debug && typeof win.console !== "undefined") {
    try {
      win.console.log.apply(win.console, arguments);
    } catch (a) {
      var e = Array.prototype.slice.call(arguments);
      win.console.log(e.join("\n"));
    }
  }
}
/**
 * Load CSS text in new stylesheet
 * @param {string} cssText - The css text.
 */


function loadStyleFn(cssText) {
  var doc = document,
      head; // copied from jQuery 

  head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
  var e = doc.createElement('style');
  e.type = 'text/css';
  if (e.styleSheet) e.styleSheet.cssText = cssText;else e.appendChild(doc.createTextNode(cssText)); // add to document

  head.insertBefore(e, head.firstChild);
  return e;
}
/**
 * Raise an error
 * @param {string} msg - The error message.
 */


function raiseErrorFn(msg, useConsole) {
  if (useConsole) {
    if (typeof console !== 'undefined') console.warn('MUI Warning: ' + msg);
  } else {
    throw new Error('MUI: ' + msg);
  }
}
/**
 * Convert Classname object, with class as key and true/false as value, to an
 * class string.
 * @param  {Object} classes The classes
 * @return {String}         class string
 */


function classNamesFn(classes) {
  var cs = '';

  for (var i in classes) {
    cs += classes[i] ? i + ' ' : '';
  }

  return cs.trim();
}
/**
 * Check if client supports pointer events.
 */


function supportsPointerEventsFn() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = element.style.pointerEvents === 'auto';
  return _supportsPointerEvents;
}
/**
 * Create callback closure.
 * @param {Object} instance - The object instance.
 * @param {String} funcName - The name of the callback function.
 */


function callbackFn(instance, funcName) {
  return function () {
    instance[funcName].apply(instance, arguments);
  };
}
/**
 * Dispatch event.
 * @param {Element} element - The DOM element.
 * @param {String} eventType - The event type.
 * @param {Boolean} bubbles=true - If true, event bubbles.
 * @param {Boolean} cancelable=true = If true, event is cancelable
 * @param {Object} [data] - Data to add to event object
 */


function dispatchEventFn(element, eventType, bubbles, cancelable, data) {
  var ev = document.createEvent('HTMLEvents'),
      bubbles = bubbles !== undefined ? bubbles : true,
      cancelable = cancelable !== undefined ? cancelable : true,
      k;
  ev.initEvent(eventType, bubbles, cancelable); // add data to event object

  if (data) for (k in data) {
    ev[k] = data[k];
  } // dispatch

  if (element) element.dispatchEvent(ev);
  return ev;
}
/**
 * Turn on window scroll lock.
 */


function enableScrollLockFn() {
  // increment counter
  scrollLock += 1; // add lock

  if (scrollLock === 1) {
    var doc = document,
        win = window,
        htmlEl = doc.documentElement,
        bodyEl = doc.body,
        scrollBarWidth = getScrollBarWidth(),
        cssProps,
        cssStr,
        x; // define scroll lock class dynamically

    cssProps = ['overflow:hidden'];

    if (scrollBarWidth) {
      // scrollbar-y
      if (htmlEl.scrollHeight > htmlEl.clientHeight) {
        x = parseInt(jqLite.css(bodyEl, 'padding-right')) + scrollBarWidth;
        cssProps.push('padding-right:' + x + 'px');
      } // scrollbar-x


      if (htmlEl.scrollWidth > htmlEl.clientWidth) {
        x = parseInt(jqLite.css(bodyEl, 'padding-bottom')) + scrollBarWidth;
        cssProps.push('padding-bottom:' + x + 'px');
      }
    } // define css class dynamically


    cssStr = '.' + scrollLockCls + '{';
    cssStr += cssProps.join(' !important;') + ' !important;}';
    scrollStyleEl = loadStyleFn(cssStr); // cancel 'scroll' event listener callbacks

    jqLite.on(win, 'scroll', scrollEventHandler, true); // add scroll lock

    scrollLockPos = {
      left: jqLite.scrollLeft(win),
      top: jqLite.scrollTop(win)
    };
    jqLite.addClass(bodyEl, scrollLockCls);
  }
}
/**
 * Turn off window scroll lock.
 * @param {Boolean} resetPos - Reset scroll position to original value.
 */


function disableScrollLockFn(resetPos) {
  // ignore
  if (scrollLock === 0) return; // decrement counter

  scrollLock -= 1; // remove lock 

  if (scrollLock === 0) {
    // remove scroll lock and delete style element
    jqLite.removeClass(document.body, scrollLockCls); // restore scroll position

    if (resetPos) window.scrollTo(scrollLockPos.left, scrollLockPos.top); // restore scroll event listeners

    jqLite.off(window, 'scroll', scrollEventHandler, true); // delete style element (deferred for Firefox Quantum bugfix)

    setTimeout(function () {
      scrollStyleEl.parentNode.removeChild(scrollStyleEl);
    }, 0);
  }
}
/**
 * Return scroll bar width.
 */


var getScrollBarWidth = function getScrollBarWidth() {
  // check cache
  if (_scrollBarWidth !== undefined) return _scrollBarWidth; // calculate scroll bar width

  var doc = document,
      bodyEl = doc.body,
      el = doc.createElement('div');
  el.innerHTML = '<div style="width:50px;height:50px;position:absolute;' + 'left:-50px;top:-50px;overflow:auto;"><div style="width:1px;' + 'height:100px;"></div></div>';
  el = el.firstChild;
  bodyEl.appendChild(el);
  _scrollBarWidth = el.offsetWidth - el.clientWidth;
  bodyEl.removeChild(el);
  return _scrollBarWidth;
};
/**
 * requestAnimationFrame polyfilled
 * @param {Function} callback - The callback function
 */


function requestAnimationFrameFn(callback) {
  var fn = window.requestAnimationFrame;
  if (fn) fn(callback);else setTimeout(callback, 0);
}
/**
 * Define the module API
 */


module.exports = {
  /** Create callback closures */
  callback: callbackFn,

  /** Classnames object to string */
  classNames: classNamesFn,

  /** Disable scroll lock */
  disableScrollLock: disableScrollLockFn,

  /** Dispatch event */
  dispatchEvent: dispatchEventFn,

  /** Enable scroll lock */
  enableScrollLock: enableScrollLockFn,

  /** Log messages to the console when debug is turned on */
  log: logFn,

  /** Load CSS text as new stylesheet */
  loadStyle: loadStyleFn,

  /** Raise MUI error */
  raiseError: raiseErrorFn,

  /** Request animation frame */
  requestAnimationFrame: requestAnimationFrameFn,

  /** Support Pointer Events check */
  supportsPointerEvents: supportsPointerEventsFn
};

},{"../config":5,"./jqLite":7}],9:[function(require,module,exports){
/**
 * MUI React helpers
 * @module react/_helpers
 */
'use strict';

var controlledMessage = 'You provided a `value` prop to a form field ' + 'without an `OnChange` handler. Please see React documentation on ' + 'controlled components';
/** Module export */

module.exports = {
  controlledMessage: controlledMessage
};

},{}],10:[function(require,module,exports){
/**
 * MUI React Textfield Helpers
 * @module react/_textfieldHelpers
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textfieldWrapper = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var _reactAddonsShallowCompare = babelHelpers.interopRequireDefault(require("react-addons-shallow-compare"));

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Textfield Wrapper
 * @function
 */
var textfieldWrapper = function textfieldWrapper(TextfieldComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    babelHelpers.inherits(_class, _React$Component);

    var _super = _createSuper(_class);

    function _class(props) {
      var _this;

      babelHelpers.classCallCheck(this, _class);
      _this = _super.call(this, props); // set initial state

      _this.state = {
        isEmpty: isEmpty('value' in props ? props.value : props.defaultValue),
        isTouched: false,
        isPristine: true
      }; // warn if value defined but onChange is not

      if ('value' in props && !props.onChange) {
        util.raiseError(_helpers.controlledMessage, true);
      } // callbacks


      var cb = util.callback;
      _this.onBlurCB = cb(babelHelpers.assertThisInitialized(_this), 'onBlur');
      _this.onChangeCB = cb(babelHelpers.assertThisInitialized(_this), 'onChange');
      _this.onLabelClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onLabelClick');
      return _this;
    }

    babelHelpers.createClass(_class, [{
      key: "onBlur",
      value: function onBlur(ev) {
        // ignore if event is a window blur
        if (document.activeElement !== this.controlEl) {
          this.setState({
            isTouched: true
          });
        } // execute callback


        var fn = this.props.onBlur;
        fn && fn(ev);
      }
    }, {
      key: "onChange",
      value: function onChange(ev) {
        this.setState({
          isEmpty: isEmpty(ev.target.value),
          isPristine: false
        }); // execute callback

        var fn = this.props.onChange;
        fn && fn(ev);
      }
    }, {
      key: "onLabelClick",
      value: function onLabelClick(ev) {
        // pointer-events shim
        if (util.supportsPointerEvents() === false) {
          ev.target.style.cursor = 'text';
          this.controlEl.focus();
        }
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          this.setState({
            isEmpty: isEmpty(nextProps.value)
          });
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare.default)(this, nextProps, nextState);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        // disable MUI js
        this.controlEl._muiTextfield = true;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var wrapperCls = {},
            inputCls = {},
            labelEl;
        var _this$props = this.props,
            children = _this$props.children,
            className = _this$props.className,
            style = _this$props.style,
            hint = _this$props.hint,
            invalid = _this$props.invalid,
            label = _this$props.label,
            floatingLabel = _this$props.floatingLabel,
            other = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "style", "hint", "invalid", "label", "floatingLabel"]);
        var labelType = jqLite.type(label);

        if (labelType == 'string' && label.length || labelType == 'object') {
          labelEl = /*#__PURE__*/_react.default.createElement(Label, {
            text: label,
            onClick: this.onClickCB,
            htmlFor: this.props.id
          });
        }

        wrapperCls['mui-textfield'] = true;
        wrapperCls['mui-textfield--float-label'] = floatingLabel;
        wrapperCls = util.classNames(wrapperCls);
        inputCls['mui--is-touched'] = this.state.isTouched;
        inputCls['mui--is-untouched'] = !this.state.isTouched;
        inputCls['mui--is-pristine'] = this.state.isPristine;
        inputCls['mui--is-dirty'] = !this.state.isPristine;
        inputCls['mui--is-empty'] = this.state.isEmpty;
        inputCls['mui--is-not-empty'] = !this.state.isEmpty;
        inputCls['mui--is-invalid'] = invalid;
        inputCls = util.classNames(inputCls);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: wrapperCls + ' ' + className,
          style: style
        }, /*#__PURE__*/_react.default.createElement(TextfieldComponent, babelHelpers.extends({
          className: inputCls,
          inputRef: function inputRef(el) {
            _this2.controlEl = el;
          },
          placeholder: hint
        }, other, {
          onBlur: this.onBlurCB,
          onChange: this.onChangeCB
        })), labelEl);
      }
    }]);
    return _class;
  }(_react.default.Component), babelHelpers.defineProperty(_class, "defaultProps", {
    className: '',
    hint: null,
    invalid: false,
    label: null,
    floatingLabel: false
  }), _temp;
};
/**
 * Label constructor
 * @class
 */


exports.textfieldWrapper = textfieldWrapper;

var Label = /*#__PURE__*/function (_React$Component2) {
  babelHelpers.inherits(Label, _React$Component2);

  var _super2 = _createSuper(Label);

  function Label() {
    var _this3;

    babelHelpers.classCallCheck(this, Label);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = _super2.call.apply(_super2, [this].concat(args));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this3), "state", {
      style: {}
    });
    return _this3;
  }

  babelHelpers.createClass(Label, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      this.styleTimer = setTimeout(function () {
        var s = '.15s ease-out';
        var style;
        style = {
          transition: s,
          WebkitTransition: s,
          MozTransition: s,
          OTransition: s,
          msTransform: s
        };

        _this4.setState({
          style: style
        });
      }, 150);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // clear timer
      clearTimeout(this.styleTimer);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("label", {
        style: this.state.style,
        onClick: this.props.onClick,
        htmlFor: this.props.htmlFor,
        tabIndex: "-1" // firefox bugfix (see #252)

      }, this.props.text);
    }
  }]);
  return Label;
}(_react.default.Component);
/**
 * isEmpty helper
 * @function
 */


babelHelpers.defineProperty(Label, "defaultProps", {
  text: '',
  onClick: null
});

function isEmpty(value) {
  return value === undefined || value === null || value === '';
}
/** Define module API */

},{"../js/lib/jqLite":7,"../js/lib/util":8,"./_helpers":9,"react":"react","react-addons-shallow-compare":4}],11:[function(require,module,exports){
/**
 * MUI React Appbar Module
 * @module react/appbar
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Appbar constructor
 * @class
 */
var Appbar = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Appbar, _React$Component);

  var _super = _createSuper(Appbar);

  function Appbar() {
    babelHelpers.classCallCheck(this, Appbar);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Appbar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-appbar ' + this.props.className
      }), children);
    }
  }]);
  return Appbar;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Appbar, "defaultProps", {
  className: ''
});
var _default = Appbar;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],12:[function(require,module,exports){
/**
 * MUI React button module
 * @module react/button
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var btnClass = 'mui-btn',
    btnAttrs = {
  color: 1,
  variant: 1,
  size: 1
};
/**
 * Button element
 * @class
 */

var Button = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Button, _React$Component);

  var _super = _createSuper(Button);

  function Button(props) {
    var _this;

    babelHelpers.classCallCheck(this, Button);
    _this = _super.call(this, props);
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "state", {
      rippleStyle: {},
      rippleIsVisible: false
    });
    var cb = util.callback;
    _this.onMouseDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onMouseDown');
    _this.onMouseUpCB = cb(babelHelpers.assertThisInitialized(_this), 'onMouseUp');
    _this.onMouseLeaveCB = cb(babelHelpers.assertThisInitialized(_this), 'onMouseLeave');
    _this.onTouchStartCB = cb(babelHelpers.assertThisInitialized(_this), 'onTouchStart');
    _this.onTouchEndCB = cb(babelHelpers.assertThisInitialized(_this), 'onTouchEnd');
    return _this;
  }

  babelHelpers.createClass(Button, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // disable MUI js
      var el = this.buttonElRef;
      el._muiDropdown = true;
      el._muiRipple = true;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(ev) {
      this.showRipple(ev); // execute callback

      var fn = this.props.onMouseDown;
      fn && fn(ev);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(ev) {
      this.hideRipple(ev); // execute callback

      var fn = this.props.onMouseUp;
      fn && fn(ev);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(ev) {
      this.hideRipple(ev); // execute callback

      var fn = this.props.onMouseLeave;
      fn && fn(ev);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(ev) {
      this.showRipple(ev); // execute callback

      var fn = this.props.onTouchStart;
      fn && fn(ev);
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(ev) {
      this.hideRipple(ev); // execute callback

      var fn = this.props.onTouchEnd;
      fn && fn(ev);
    }
  }, {
    key: "showRipple",
    value: function showRipple(ev) {
      var buttonEl = this.buttonElRef; // de-dupe touch events

      if ('ontouchstart' in buttonEl && ev.type === 'mousedown') return; // get (x, y) position of click

      var offset = jqLite.offset(this.buttonElRef),
          clickEv;
      if (ev.type === 'touchstart' && ev.touches) clickEv = ev.touches[0];else clickEv = ev; // calculate radius

      var radius = Math.sqrt(offset.width * offset.width + offset.height * offset.height);
      var diameterPx = radius * 2 + 'px'; // add ripple to state

      this.setState({
        rippleStyle: {
          top: Math.round(clickEv.pageY - offset.top - radius) + 'px',
          left: Math.round(clickEv.pageX - offset.left - radius) + 'px',
          width: diameterPx,
          height: diameterPx
        },
        rippleIsVisible: true
      });
    }
  }, {
    key: "hideRipple",
    value: function hideRipple(ev) {
      this.setState({
        rippleIsVisible: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var state = this.state,
          rippleEl = this.rippleElRef; // show ripple

      if (state.rippleIsVisible && !prevState.rippleIsVisible) {
        jqLite.removeClass(rippleEl, 'mui--is-animating');
        jqLite.addClass(rippleEl, 'mui--is-visible');
        util.requestAnimationFrame(function () {
          jqLite.addClass(rippleEl, 'mui--is-animating');
        });
      } // hide ripple


      if (!state.rippleIsVisible && prevState.rippleIsVisible) {
        // allow a repaint to occur before removing class so animation shows for
        // tap events
        util.requestAnimationFrame(function () {
          jqLite.removeClass(rippleEl, 'mui--is-visible');
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cls = btnClass,
          k,
          v;
      var _this$props = this.props,
          color = _this$props.color,
          size = _this$props.size,
          variant = _this$props.variant,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["color", "size", "variant"]); // button attributes

      for (k in btnAttrs) {
        v = this.props[k];
        if (v !== 'default') cls += ' ' + btnClass + '--' + v;
      }

      return /*#__PURE__*/_react.default.createElement("button", babelHelpers.extends({}, reactProps, {
        ref: function ref(el) {
          _this2.buttonElRef = el;
        },
        className: cls + ' ' + this.props.className,
        onMouseUp: this.onMouseUpCB,
        onMouseDown: this.onMouseDownCB,
        onMouseLeave: this.onMouseLeaveCB,
        onTouchStart: this.onTouchStartCB,
        onTouchEnd: this.onTouchEndCB
      }), this.props.children, /*#__PURE__*/_react.default.createElement("span", {
        className: "mui-btn__ripple-container"
      }, /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          _this2.rippleElRef = el;
        },
        className: "mui-ripple",
        style: this.state.rippleStyle
      })));
    }
  }]);
  return Button;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Button, "defaultProps", {
  className: '',
  color: 'default',
  size: 'default',
  variant: 'default'
});
var _default = Button;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/jqLite":7,"../js/lib/util":8,"react":"react"}],13:[function(require,module,exports){
/**
 * MUI React Caret Module
 * @module react/caret
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var caretClass = 'mui-caret';
/**
 * Caret constructor
 * @class
 */

var Caret = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Caret, _React$Component);

  var _super = _createSuper(Caret);

  function Caret() {
    babelHelpers.classCallCheck(this, Caret);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Caret, [{
    key: "render",
    value: function render() {
      var cls = caretClass;
      var _this$props = this.props,
          children = _this$props.children,
          direction = _this$props.direction,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "direction"]); // add direction class

      if (direction) cls += ' ' + caretClass + '--' + direction;
      return /*#__PURE__*/_react.default.createElement("span", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + this.props.className
      }));
    }
  }]);
  return Caret;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Caret, "defaultProps", {
  className: ''
});
var _default = Caret;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],14:[function(require,module,exports){
/**
 * MUI React checkbox module
 * @module react/checkbox
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Checkbox constructor
 * @class
 */
var Checkbox = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Checkbox, _React$Component);

  var _super = _createSuper(Checkbox);

  function Checkbox() {
    babelHelpers.classCallCheck(this, Checkbox);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          label = _this$props.label,
          autoFocus = _this$props.autoFocus,
          checked = _this$props.checked,
          defaultChecked = _this$props.defaultChecked,
          defaultValue = _this$props.defaultValue,
          disabled = _this$props.disabled,
          form = _this$props.form,
          name = _this$props.name,
          required = _this$props.required,
          value = _this$props.value,
          onChange = _this$props.onChange,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "label", "autoFocus", "checked", "defaultChecked", "defaultValue", "disabled", "form", "name", "required", "value", "onChange"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-checkbox ' + className
      }), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          _this.controlEl = el;
        },
        type: "checkbox",
        autoFocus: autoFocus,
        checked: checked,
        defaultChecked: defaultChecked,
        defaultValue: defaultValue,
        disabled: disabled,
        form: form,
        name: name,
        required: required,
        value: value,
        onChange: onChange
      }), label));
    }
  }]);
  return Checkbox;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Checkbox, "defaultProps", {
  className: '',
  label: null
});
var _default = Checkbox;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/util":8,"./_helpers":9,"react":"react"}],15:[function(require,module,exports){
/**
 * MUI React Col Component
 * @module react/col
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
/**
 * Col constructor
 * @class
 */

var Col = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Col, _React$Component);

  var _super = _createSuper(Col);

  function Col() {
    babelHelpers.classCallCheck(this, Col);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Col, [{
    key: "render",
    value: function render() {
      var cls = {},
          i,
          bk,
          val,
          baseCls;
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]); // add mui-col classes

      for (i = breakpoints.length - 1; i > -1; i--) {
        bk = breakpoints[i];
        baseCls = 'mui-col-' + bk; // add mui-col-{bk}-{val}

        val = this.props[bk];
        if (val) cls[baseCls + '-' + val] = true; // add mui-col-{bk}-offset-{val}

        val = this.props[bk + '-offset'];
        if (val) cls[baseCls + '-offset-' + val] = true; // remove from reactProps

        delete reactProps[bk];
        delete reactProps[bk + '-offset'];
      }

      cls = util.classNames(cls);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + className
      }), children);
    }
  }]);
  return Col;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Col, "defaultProps", {
  className: '',
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  'xs-offset': null,
  'sm-offset': null,
  'md-offset': null,
  'lg-offset': null,
  'xl-offset': null
});
var _default = Col;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/util":8,"react":"react"}],16:[function(require,module,exports){
/**
 * MUI React container module
 * @module react/container
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Container constructor
 * @class
 */
var Container = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Container, _React$Component);

  var _super = _createSuper(Container);

  function Container() {
    babelHelpers.classCallCheck(this, Container);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Container, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          fluid = _this$props.fluid,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "fluid"]);
      var cls = 'mui-container'; // fluid containers

      if (fluid) cls += '-fluid';
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + className
      }), children);
    }
  }]);
  return Container;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Container, "defaultProps", {
  className: '',
  fluid: false
});
var _default = Container;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],17:[function(require,module,exports){
/**
 * MUI React divider module
 * @module react/divider
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Divider constructor
 * @class
 */
var Divider = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Divider, _React$Component);

  var _super = _createSuper(Divider);

  function Divider() {
    babelHelpers.classCallCheck(this, Divider);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Divider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-divider ' + className
      }));
    }
  }]);
  return Divider;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Divider, "defaultProps", {
  className: ''
});
var _default = Divider;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],18:[function(require,module,exports){
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * DropdownItem constructor
 * @class
 */
var DropdownItem = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(DropdownItem, _React$Component);

  var _super = _createSuper(DropdownItem);

  function DropdownItem() {
    babelHelpers.classCallCheck(this, DropdownItem);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          link = _this$props.link,
          target = _this$props.target,
          value = _this$props.value,
          onClick = _this$props.onClick,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "link", "target", "value", "onClick"]);
      return /*#__PURE__*/_react.default.createElement("li", reactProps, /*#__PURE__*/_react.default.createElement("a", {
        href: link,
        target: target,
        "data-mui-value": value,
        onClick: onClick
      }, children));
    }
  }]);
  return DropdownItem;
}(_react.default.Component);
/** Define module API */


var _default = DropdownItem;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/util":8,"react":"react"}],19:[function(require,module,exports){
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var _button = babelHelpers.interopRequireDefault(require("./button"));

var _caret = babelHelpers.interopRequireDefault(require("./caret"));

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var dropdownClass = 'mui-dropdown',
    menuClass = 'mui-dropdown__menu',
    openClass = 'mui--is-open';
/**
 * Dropdown constructor
 * @class
 */

var Dropdown = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Dropdown, _React$Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    babelHelpers.classCallCheck(this, Dropdown);
    _this = _super.call(this, props);
    _this.state = {
      opened: false,
      menuPos: {}
    };
    var cb = util.callback;
    _this.selectCB = cb(babelHelpers.assertThisInitialized(_this), 'select');
    _this.onClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onClick');
    _this.onOutsideClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onOutsideClick');
    _this.onKeyDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onKeyDown');
    return _this;
  }

  babelHelpers.createClass(Dropdown, [{
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
      var doc = document;

      if (!this.state.opened && nextState.opened) {
        doc.addEventListener('click', this.onOutsideClickCB);
        doc.addEventListener('keydown', this.onKeyDownCB);
      } else if (this.state.opened && !nextState.opened) {
        doc.removeEventListener('click', this.onOutsideClickCB);
        doc.removeEventListener('keydown', this.onKeyDownCB);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var doc = document;
      doc.removeEventListener('click', this.onOutsideClickCB);
      doc.removeEventListener('keydown', this.onKeyDownCB);
    }
  }, {
    key: "onClick",
    value: function onClick(ev) {
      // only left clicks
      if (ev.button !== 0) return; // exit if toggle button is disabled

      if (this.props.disabled) return;

      if (!ev.defaultPrevented) {
        this.toggle(); // execute <Dropdown> onClick method

        var fn = this.props.onClick;
        fn && fn(ev);
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      // exit if no menu element
      if (!this.props.children) {
        return util.raiseError('Dropdown menu element not found');
      }

      if (this.state.opened) this.close();else this.open();
    }
  }, {
    key: "open",
    value: function open() {
      // position menu element below toggle button
      var pos = {},
          wrapperRect = this.wrapperElRef.getBoundingClientRect(),
          toggleRect;
      toggleRect = this.buttonElRef.buttonElRef.getBoundingClientRect(); // menu position

      switch (this.props.placement) {
        case 'up':
          pos.bottom = toggleRect.height + toggleRect.top - wrapperRect.top;
          break;

        case 'right':
          pos.left = toggleRect.width;
          pos.top = toggleRect.top - wrapperRect.top;
          break;

        case 'left':
          pos.right = toggleRect.width;
          pos.top = toggleRect.top - wrapperRect.top;
          break;

        default:
          pos.top = toggleRect.top - wrapperRect.top + toggleRect.height;
      } // menu alignment


      if (this.props.alignment === 'bottom') {
        pos.top = 'auto';
        pos.bottom = toggleRect.top - wrapperRect.top;
      }

      this.setState({
        opened: true,
        menuPos: pos
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        opened: false
      });
    }
  }, {
    key: "select",
    value: function select(ev) {
      // onSelect callback
      if (this.props.onSelect && ev.target.tagName === 'A') {
        this.props.onSelect(ev.target.getAttribute('data-mui-value'));
      } // close menu


      if (!ev.defaultPrevented) this.close();
    }
  }, {
    key: "onOutsideClick",
    value: function onOutsideClick(ev) {
      var isClickInside = this.wrapperElRef.contains(ev.target);
      if (!isClickInside) this.close();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(ev) {
      // close menu on escape key
      var key = ev.key;
      if (key === 'Escape' || key === 'Esc') this.close();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var wrapperCls = dropdownClass,
          buttonEl,
          menuEl,
          labelEl;
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          color = _this$props.color,
          variant = _this$props.variant,
          size = _this$props.size,
          label = _this$props.label,
          placement = _this$props.placement,
          alignment = _this$props.alignment,
          alignMenu = _this$props.alignMenu,
          onClick = _this$props.onClick,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "color", "variant", "size", "label", "placement", "alignment", "alignMenu", "onClick", "onSelect", "disabled"]); // build label

      if (jqLite.type(label) === 'string') {
        if (placement === 'left') {
          labelEl = /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_caret.default, {
            direction: placement
          }), " ", label);
        } else {
          labelEl = /*#__PURE__*/_react.default.createElement("span", null, label, " ", /*#__PURE__*/_react.default.createElement(_caret.default, {
            direction: placement
          }));
        }
      } else {
        labelEl = label;
      } // placement


      if (placement) wrapperCls += ' ' + dropdownClass + '--' + placement; // button

      buttonEl = /*#__PURE__*/_react.default.createElement(_button.default, {
        ref: function ref(el) {
          _this2.buttonElRef = el;
        },
        type: "button",
        onClick: this.onClickCB,
        color: color,
        variant: variant,
        size: size,
        disabled: disabled
      }, labelEl);

      if (this.state.opened) {
        var cs = {};
        cs[menuClass] = true;
        cs[openClass] = this.state.opened;
        cs = util.classNames(cs); // alignment (also handles `alignMenu` legacy argument)

        if (alignment || alignMenu) {
          cs += ' ' + menuClass + '--' + (alignment || alignMenu);
        }

        menuEl = /*#__PURE__*/_react.default.createElement("ul", {
          ref: function ref(el) {
            _this2.menuElRef = el;
          },
          className: cs,
          style: this.state.menuPos,
          onClick: this.selectCB
        }, children);
      } else {
        menuEl = /*#__PURE__*/_react.default.createElement("div", null);
      }

      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        ref: function ref(el) {
          _this2.wrapperElRef = el;
        },
        className: wrapperCls + ' ' + className
      }), buttonEl, menuEl);
    }
  }]);
  return Dropdown;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Dropdown, "defaultProps", {
  className: '',
  color: 'default',
  variant: 'default',
  size: 'default',
  label: '',
  placement: null,
  alignment: null,
  alignMenu: null,
  // legacy
  onClick: null,
  onSelect: null,
  disabled: false
});
var _default = Dropdown;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/jqLite":7,"../js/lib/util":8,"./button":12,"./caret":13,"react":"react"}],20:[function(require,module,exports){
/**
 * MUI React form module
 * @module react/form
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Form constructor
 * @class
 */
var Form = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form() {
    babelHelpers.classCallCheck(this, Form);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Form, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          inline = _this$props.inline,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "inline"]);
      var cls = 'mui-form'; // inline form

      if (inline) cls += ' mui-form--inline';
      return /*#__PURE__*/_react.default.createElement("form", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + className
      }), children);
    }
  }]);
  return Form;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Form, "defaultProps", {
  className: '',
  inline: false
});
var _default = Form;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],21:[function(require,module,exports){
/**                                                                            
 * MUI React Input Component
 * @module react/input
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var _textfieldHelpers = require("./_textfieldHelpers");

/**
 * Input constructor
 * @class
 */
var Input = (0, _textfieldHelpers.textfieldWrapper)(function (props) {
  var inputRef = props.inputRef,
      rest = babelHelpers.objectWithoutProperties(props, ["inputRef"]);
  return /*#__PURE__*/_react.default.createElement("input", babelHelpers.extends({
    ref: inputRef
  }, rest));
});
/** Module API */

var _default = Input;
exports.default = _default;
module.exports = exports.default;

},{"./_textfieldHelpers":10,"react":"react"}],22:[function(require,module,exports){
/**
 * MUI React options module
 * @module react/option
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var formlib = babelHelpers.interopRequireWildcard(require("../js/lib/forms"));
var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Option constructor
 * @class
 */
var Option = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Option, _React$Component);

  var _super = _createSuper(Option);

  function Option() {
    babelHelpers.classCallCheck(this, Option);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Option, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          label = _this$props.label,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "label"]);
      return /*#__PURE__*/_react.default.createElement("option", reactProps, label);
    }
  }]);
  return Option;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Option, "defaultProps", {
  className: '',
  label: null
});
var _default = Option;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/forms":6,"../js/lib/jqLite":7,"../js/lib/util":8,"./_helpers":9,"react":"react"}],23:[function(require,module,exports){
/**
 * MUI React layout module
 * @module react/layout
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Panel constructor
 * @class
 */
var Panel = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Panel, _React$Component);

  var _super = _createSuper(Panel);

  function Panel() {
    babelHelpers.classCallCheck(this, Panel);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-panel ' + className
      }), children);
    }
  }]);
  return Panel;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Panel, "defaultProps", {
  className: ''
});
var _default = Panel;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],24:[function(require,module,exports){
/**
 * MUI React radio module
 * @module react/radio
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Radio constructor
 * @class
 */
var Radio = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Radio, _React$Component);

  var _super = _createSuper(Radio);

  function Radio() {
    babelHelpers.classCallCheck(this, Radio);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Radio, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          label = _this$props.label,
          autoFocus = _this$props.autoFocus,
          checked = _this$props.checked,
          defaultChecked = _this$props.defaultChecked,
          defaultValue = _this$props.defaultValue,
          disabled = _this$props.disabled,
          form = _this$props.form,
          name = _this$props.name,
          required = _this$props.required,
          value = _this$props.value,
          onChange = _this$props.onChange,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "label", "autoFocus", "checked", "defaultChecked", "defaultValue", "disabled", "form", "name", "required", "value", "onChange"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-radio ' + className
      }), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          _this.controlEl = el;
        },
        type: "radio",
        autoFocus: autoFocus,
        checked: checked,
        defaultChecked: defaultChecked,
        defaultValue: defaultValue,
        disabled: disabled,
        form: form,
        name: name,
        required: required,
        value: value,
        onChange: onChange
      }), label));
    }
  }]);
  return Radio;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Radio, "defaultProps", {
  className: '',
  label: null
});
var _default = Radio;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],25:[function(require,module,exports){
/**
 * MUI React Row Component
 * @module react/row
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var breakpoints = ['xs', 'sm', 'md', 'lg'];
/**
 * Row constructor
 * @class
 */

var Row = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Row, _React$Component);

  var _super = _createSuper(Row);

  function Row() {
    babelHelpers.classCallCheck(this, Row);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-row ' + className
      }), children);
    }
  }]);
  return Row;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Row, "defaultProps", {
  className: ''
});
var _default = Row;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/util":8,"react":"react"}],26:[function(require,module,exports){
/**
 * MUI React select module
 * @module react/select
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var formlib = babelHelpers.interopRequireWildcard(require("../js/lib/forms"));
var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Select constructor
 * @class
 */
var Select = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Select, _React$Component);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    babelHelpers.classCallCheck(this, Select);
    _this = _super.call(this, props); // warn if value defined but onChange is not

    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "state", {
      showMenu: false
    });

    if (props.readOnly === false && props.value !== undefined && props.onChange === null) {
      util.raiseError(_helpers.controlledMessage, true);
    }

    _this.state.value = props.value; // bind callback function

    var cb = util.callback;
    _this.onInnerChangeCB = cb(babelHelpers.assertThisInitialized(_this), 'onInnerChange');
    _this.onInnerMouseDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onInnerMouseDown');
    _this.onOuterClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onOuterClick');
    _this.onOuterKeyDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onOuterKeyDown');
    _this.hideMenuCB = cb(babelHelpers.assertThisInitialized(_this), 'hideMenu');
    _this.onMenuChangeCB = cb(babelHelpers.assertThisInitialized(_this), 'onMenuChange');
    return _this;
  }

  babelHelpers.createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // disable MUI CSS/JS
      this.controlEl._muiSelect = true;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // ensure that doc event listners have been removed
      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB);
    }
  }, {
    key: "onInnerChange",
    value: function onInnerChange(ev) {
      // update state
      this.setState({
        value: ev.target.value
      });
    }
  }, {
    key: "onInnerMouseDown",
    value: function onInnerMouseDown(ev) {
      // only left clicks & check flag
      if (ev.button !== 0 || this.props.useDefault) return; // prevent built-in menu from opening

      ev.preventDefault();
    }
  }, {
    key: "onOuterClick",
    value: function onOuterClick(ev) {
      // only left clicks, return if <select> is disabled
      if (ev.button !== 0 || this.controlEl.disabled) return; // execute callback

      var fn = this.props.onClick;
      fn && fn(ev); // exit if preventDefault() was called

      if (ev.defaultPrevented || this.props.useDefault) return; // focus wrapper

      this.wrapperElRef.focus(); // open custom menu

      this.showMenu();
    }
  }, {
    key: "onOuterKeyDown",
    value: function onOuterKeyDown(ev) {
      // execute callback
      var fn = this.props.onKeyDown;
      fn && fn(ev); // exit if preventDevault() was called or useDefault is true

      if (ev.defaultPrevented || this.props.useDefault) return;

      if (this.state.showMenu === false) {
        var keyCode = ev.keyCode; // spacebar, down, up

        if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
          // prevent default browser action
          ev.preventDefault(); // open custom menu

          this.showMenu();
        }
      }
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      // check useDefault flag
      if (this.props.useDefault) return; // add event listeners

      jqLite.on(window, 'resize', this.hideMenuCB);
      jqLite.on(document, 'click', this.hideMenuCB); // re-draw

      this.setState({
        showMenu: true
      });
    }
  }, {
    key: "hideMenu",
    value: function hideMenu(ev) {
      // check default prevented
      if (ev && ev.defaultPrevented) return; // remove event listeners

      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB); // re-draw

      this.setState({
        showMenu: false
      }); // refocus

      this.wrapperElRef.focus();
    }
  }, {
    key: "onMenuChange",
    value: function onMenuChange(index) {
      if (this.props.readOnly) return; // update inner <select> and dispatch 'change' event

      this.controlEl.selectedIndex = index;
      util.dispatchEvent(this.controlEl, 'change');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.state.value,
          valueArgs = {},
          menuElem,
          placeholderElem,
          selectCls;

      if (this.state.showMenu) {
        menuElem = /*#__PURE__*/_react.default.createElement(Menu, {
          optionEls: this.controlEl.children,
          wrapperEl: this.wrapperElRef,
          onChange: this.onMenuChangeCB,
          onClose: this.hideMenuCB
        });
      } // set tab index so user can focus wrapper element


      var tabIndexWrapper = '-1',
          tabIndexInner = '0';

      if (this.props.useDefault === false) {
        tabIndexWrapper = '0';
        tabIndexInner = '-1';
      }

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          defaultValue = _this$props.defaultValue,
          readOnly = _this$props.readOnly,
          disabled = _this$props.disabled,
          useDefault = _this$props.useDefault,
          name = _this$props.name,
          placeholder = _this$props.placeholder,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "style", "label", "defaultValue", "readOnly", "disabled", "useDefault", "name", "placeholder"]); // build value arguments

      if (this.props.value !== undefined) valueArgs.value = value; // controlled

      if (defaultValue !== undefined) valueArgs.defaultValue = defaultValue; // handle placeholder

      if (placeholder) {
        placeholderElem = /*#__PURE__*/_react.default.createElement("option", {
          className: "mui--text-placeholder",
          value: ""
        }, placeholder); // apply class if value is empty

        if (value === '' || value === undefined && !defaultValue) {
          selectCls = 'mui--text-placeholder';
        }
      }

      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        ref: function ref(el) {
          _this2.wrapperElRef = el;
        },
        tabIndex: tabIndexWrapper,
        style: style,
        className: 'mui-select ' + className,
        onClick: this.onOuterClickCB,
        onKeyDown: this.onOuterKeyDownCB
      }), /*#__PURE__*/_react.default.createElement("select", babelHelpers.extends({}, valueArgs, {
        ref: function ref(el) {
          _this2.controlEl = el;
        },
        className: selectCls,
        name: name,
        disabled: disabled,
        tabIndex: tabIndexInner,
        readOnly: readOnly,
        onChange: this.onInnerChangeCB,
        onMouseDown: this.onInnerMouseDownCB,
        required: this.props.required
      }), placeholderElem, children), /*#__PURE__*/_react.default.createElement("label", {
        tabIndex: "-1"
      }, label), menuElem);
    }
  }]);
  return Select;
}(_react.default.Component);
/**
 * Menu constructor
 * @class
 */


babelHelpers.defineProperty(Select, "defaultProps", {
  className: '',
  name: '',
  placeholder: null,
  readOnly: false,
  useDefault: typeof document !== 'undefined' && 'ontouchstart' in document.documentElement ? true : false,
  onChange: null,
  onClick: null,
  onKeyDown: null
});

var Menu = /*#__PURE__*/function (_React$Component2) {
  babelHelpers.inherits(Menu, _React$Component2);

  var _super2 = _createSuper(Menu);

  function Menu(props) {
    var _this3;

    babelHelpers.classCallCheck(this, Menu);
    _this3 = _super2.call(this, props);
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this3), "state", {
      origIndex: null,
      currentIndex: 0
    });
    _this3.onKeyDownCB = util.callback(babelHelpers.assertThisInitialized(_this3), 'onKeyDown');
    _this3.onKeyPressCB = util.callback(babelHelpers.assertThisInitialized(_this3), 'onKeyPress');
    _this3.q = '';
    _this3.qTimeout = null;
    _this3.availOptionEls = []; // extract selectable options

    var optionEls = props.optionEls,
        el,
        i;

    for (i = 0; i < optionEls.length; i++) {
      el = optionEls[i];
      if (!el.disabled && !el.hidden) _this3.availOptionEls.push(el);
    }

    return _this3;
  }

  babelHelpers.createClass(Menu, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var optionEls = this.availOptionEls,
          m = optionEls.length,
          selectedPos = null,
          i; // get current selected position

      for (i = m - 1; i > -1; i--) {
        if (optionEls[i].selected) selectedPos = i;
      }

      if (selectedPos !== null) {
        this.setState({
          origIndex: selectedPos,
          currentIndex: selectedPos
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // prevent scrolling
      util.enableScrollLock();
      var menuEl = this.wrapperElRef; // set position

      var props = formlib.getMenuPositionalCSS(this.props.wrapperEl, menuEl, this.state.currentIndex);
      jqLite.css(menuEl, props);
      jqLite.scrollTop(menuEl, props.scrollTop); // attach keydown handler

      jqLite.on(document, 'keydown', this.onKeyDownCB);
      jqLite.on(document, 'keypress', this.onKeyPressCB);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // remove scroll lock
      util.disableScrollLock(true); // remove keydown handler

      jqLite.off(document, 'keydown', this.onKeyDownCB);
      jqLite.off(document, 'keypress', this.onKeyPressCB);
    }
  }, {
    key: "onClick",
    value: function onClick(pos, ev) {
      // don't allow events to bubble
      //ev.stopPropagation();
      ev.preventDefault();
      if (pos !== null) this.selectAndDestroy(pos);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(ev) {
      var keyCode = ev.keyCode; // tab

      if (keyCode === 9) return this.destroy(); // escape | up | down | enter

      if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
        ev.preventDefault();
      }

      if (keyCode === 27) this.destroy();else if (keyCode === 40) this.increment();else if (keyCode === 38) this.decrement();else if (keyCode === 13) this.selectAndDestroy();
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(ev) {
      // handle query timer
      var self = this;
      clearTimeout(this.qTimeout);
      this.q += ev.key;
      this.qTimeout = setTimeout(function () {
        self.q = '';
      }, 300); // select first match alphabetically

      var prefixRegex = new RegExp('^' + this.q, 'i'),
          optionEls = this.availOptionEls,
          m = optionEls.length,
          i;

      for (i = 0; i < m; i++) {
        // select item if code matches
        if (prefixRegex.test(optionEls[i].innerText)) {
          this.setState({
            currentIndex: i
          });
          break;
        }
      }
    }
  }, {
    key: "increment",
    value: function increment() {
      if (this.state.currentIndex === this.availOptionEls.length - 1) return;
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }, {
    key: "decrement",
    value: function decrement() {
      if (this.state.currentIndex === 0) return;
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }, {
    key: "selectAndDestroy",
    value: function selectAndDestroy(pos) {
      pos = pos === undefined ? this.state.currentIndex : pos; // handle onChange

      if (pos !== this.state.origIndex) {
        this.props.onChange(this.availOptionEls[pos].index);
      } // close menu


      this.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.props.onClose();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // scroll menu (if necessary)
      if (this.state.currentIndex != prevState.currentIndex) {
        var menuEl = this.wrapperElRef,
            itemEl = menuEl.children[this.state.currentIndex],
            itemRect = itemEl.getBoundingClientRect();

        if (itemRect.top < 0) {
          // menu item is hidden above visible window
          menuEl.scrollTop = menuEl.scrollTop + itemRect.top - 5;
        } else if (itemRect.top > window.innerHeight) {
          // menu item is hidden below visible window
          menuEl.scrollTop = menuEl.scrollTop + (itemRect.top + itemRect.height - window.innerHeight) + 5;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var menuItems = [],
          optionEls = this.props.optionEls,
          m = optionEls.length,
          pos = 0,
          optionEl,
          cls,
          val,
          i; // define menu items

      for (i = 0; i < m; i++) {
        optionEl = optionEls[i]; // handle hidden

        if (optionEl.hidden) continue; // handle disabled

        if (optionEl.disabled) {
          cls = 'mui--is-disabled ';
          val = null;
        } else {
          cls = pos === this.state.currentIndex ? 'mui--is-selected ' : '';
          val = pos;
          pos += 1;
        } // add custom css class from <Option> component


        cls += optionEl.className;
        menuItems.push( /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: cls,
          onClick: this.onClick.bind(this, val)
        }, optionEl.textContent));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          _this4.wrapperElRef = el;
        },
        className: "mui-select__menu"
      }, menuItems);
    }
  }]);
  return Menu;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Menu, "defaultProps", {
  optionEls: [],
  wrapperEl: null,
  onChange: null,
  onClose: null
});
var _default = Select;
exports.default = _default;
module.exports = exports.default;

},{"../js/lib/forms":6,"../js/lib/jqLite":7,"../js/lib/util":8,"./_helpers":9,"react":"react"}],27:[function(require,module,exports){
/**
 * MUI React tabs module
 * @module react/tabs
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Tab constructor
 * @class
 */
var Tab = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Tab, _React$Component);

  var _super = _createSuper(Tab);

  function Tab() {
    babelHelpers.classCallCheck(this, Tab);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Tab, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Tab;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Tab, "defaultProps", {
  value: null,
  label: '',
  onActive: null
});
var _default = Tab;
exports.default = _default;
module.exports = exports.default;

},{"react":"react"}],28:[function(require,module,exports){
(function (process){
/**
 * MUI React tabs module
 * @module react/tabs
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var _tab = babelHelpers.interopRequireDefault(require("./tab"));

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var tabsBarClass = 'mui-tabs__bar',
    tabsBarJustifiedClass = 'mui-tabs__bar--justified',
    tabsPaneClass = 'mui-tabs__pane',
    isActiveClass = 'mui--is-active';
/**
 * Tabs constructor
 * @class
 */

var Tabs = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Tabs, _React$Component);

  var _super = _createSuper(Tabs);

  function Tabs(props) {
    var _this;

    babelHelpers.classCallCheck(this, Tabs);

    /*
     * The following code exists only to warn about deprecating props.initialSelectedIndex in favor of props.defaultSelectedIndex.
     * It can be removed once support for props.initialSelectedIndex is officially dropped.
     */
    var defaultSelectedIndex;

    if (typeof props.initialSelectedIndex === 'number') {
      defaultSelectedIndex = props.initialSelectedIndex;

      if (console && process && process.env && process.NODE_ENV !== 'production') {
        console.warn('MUICSS DEPRECATION WARNING: ' + 'property "initialSelectedIndex" on the muicss Tabs component is deprecated in favor of "defaultSelectedIndex". ' + 'It will be removed in a future release.');
      }
    } else {
      defaultSelectedIndex = props.defaultSelectedIndex;
    }
    /*
     * End deprecation warning
     */


    _this = _super.call(this, props);
    _this.state = {
      currentSelectedIndex: typeof props.selectedIndex === 'number' ? props.selectedIndex : defaultSelectedIndex
    };
    return _this;
  }

  babelHelpers.createClass(Tabs, [{
    key: "onClick",
    value: function onClick(i, tab, ev) {
      if (typeof this.props.selectedIndex === 'number' && i !== this.props.selectedIndex || i !== this.state.currentSelectedIndex) {
        this.setState({
          currentSelectedIndex: i
        }); // onActive callback

        if (tab.props.onActive) tab.props.onActive(tab); // onChange callback

        if (this.props.onChange) {
          this.props.onChange(i, tab.props.value, tab, ev);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          defaultSelectedIndex = _this$props.defaultSelectedIndex,
          initialSelectedIndex = _this$props.initialSelectedIndex,
          justified = _this$props.justified,
          selectedIndex = _this$props.selectedIndex,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "defaultSelectedIndex", "initialSelectedIndex", "justified", "selectedIndex"]);

      var tabs = _react.default.Children.toArray(children);

      var tabEls = [],
          paneEls = [],
          m = tabs.length,
          currentSelectedIndex = (typeof selectedIndex === 'number' ? selectedIndex : this.state.currentSelectedIndex) % m,
          isActive,
          item,
          cls,
          i;

      for (i = 0; i < m; i++) {
        item = tabs[i]; // only accept MUITab elements

        if (item.type !== _tab.default) util.raiseError('Expecting MUITab React Element');
        isActive = i === currentSelectedIndex ? true : false; // tab element

        tabEls.push( /*#__PURE__*/_react.default.createElement("li", {
          key: i,
          className: isActive ? isActiveClass : ''
        }, /*#__PURE__*/_react.default.createElement("a", {
          onClick: this.onClick.bind(this, i, item)
        }, item.props.label))); // pane element

        cls = tabsPaneClass + ' ';
        if (isActive) cls += isActiveClass;
        paneEls.push( /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: cls
        }, item.props.children));
      }

      cls = tabsBarClass;
      if (justified) cls += ' ' + tabsBarJustifiedClass;
      return /*#__PURE__*/_react.default.createElement("div", reactProps, /*#__PURE__*/_react.default.createElement("ul", {
        className: cls
      }, tabEls), paneEls);
    }
  }]);
  return Tabs;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Tabs, "defaultProps", {
  className: '',
  defaultSelectedIndex: 0,

  /*
   * @deprecated
   */
  initialSelectedIndex: null,
  justified: false,
  onChange: null,
  selectedIndex: null
});
var _default = Tabs;
exports.default = _default;
module.exports = exports.default;

}).call(this,require('_process'))
},{"../js/lib/util":8,"./tab":27,"_process":3,"react":"react"}],29:[function(require,module,exports){
/**
 * MUI React Textarea Component
 * @module react/textarea
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(window.React);

var _textfieldHelpers = require("./_textfieldHelpers");

/**
 * Textarea constructor
 * @class
 */
var Textarea = (0, _textfieldHelpers.textfieldWrapper)(function (props) {
  var inputRef = props.inputRef,
      rest = babelHelpers.objectWithoutProperties(props, ["inputRef"]); // default number of rows

  if (!'rows' in rest) rest.rows = 2;
  return /*#__PURE__*/_react.default.createElement("textarea", babelHelpers.extends({
    ref: inputRef
  }, rest));
});
var _default = Textarea;
exports.default = _default;
module.exports = exports.default;

},{"./_textfieldHelpers":10,"react":"react"}]},{},[1]);
