(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Glamor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.CSSOps = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = _dereq_("react/lib/CSSPropertyOperations");
    }, { "react/lib/CSSPropertyOperations": 15 }], 2: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

      /**
       * Simple, lightweight module assisting with the detection and context of
       * Worker. Helps avoid circular dependencies and allows code to reason about
       * whether or not they are in a Worker, even if they never include the main
       * `ReactWorker` dependency.
       */
      var ExecutionEnvironment = {

        canUseDOM: canUseDOM,

        canUseWorkers: typeof Worker !== 'undefined',

        canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

        canUseViewport: canUseDOM && !!window.screen,

        isInWorker: !canUseDOM // For now, this is true - might change in the future.

      };

      module.exports = ExecutionEnvironment;
    }, {}], 3: [function (_dereq_, module, exports) {
      "use strict";

      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      var _hyphenPattern = /-(.)/g;

      /**
       * Camelcases a hyphenated string, for example:
       *
       *   > camelize('background-color')
       *   < "backgroundColor"
       *
       * @param {string} string
       * @return {string}
       */
      function camelize(string) {
        return string.replace(_hyphenPattern, function (_, character) {
          return character.toUpperCase();
        });
      }

      module.exports = camelize;
    }, {}], 4: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      'use strict';

      var camelize = _dereq_('./camelize');

      var msPattern = /^-ms-/;

      /**
       * Camelcases a hyphenated CSS property name, for example:
       *
       *   > camelizeStyleName('background-color')
       *   < "backgroundColor"
       *   > camelizeStyleName('-moz-transition')
       *   < "MozTransition"
       *   > camelizeStyleName('-ms-transition')
       *   < "msTransition"
       *
       * As Andi Smith suggests
       * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
       * is converted to lowercase `ms`.
       *
       * @param {string} string
       * @return {string}
       */
      function camelizeStyleName(string) {
        return camelize(string.replace(msPattern, 'ms-'));
      }

      module.exports = camelizeStyleName;
    }, { "./camelize": 3 }], 5: [function (_dereq_, module, exports) {
      "use strict";

      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * 
       */

      function makeEmptyFunction(arg) {
        return function () {
          return arg;
        };
      }

      /**
       * This function accepts and discards inputs; it has no side effects. This is
       * primarily useful idiomatically for overridable function endpoints which
       * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
       */
      var emptyFunction = function emptyFunction() {};

      emptyFunction.thatReturns = makeEmptyFunction;
      emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
      emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
      emptyFunction.thatReturnsNull = makeEmptyFunction(null);
      emptyFunction.thatReturnsThis = function () {
        return this;
      };
      emptyFunction.thatReturnsArgument = function (arg) {
        return arg;
      };

      module.exports = emptyFunction;
    }, {}], 6: [function (_dereq_, module, exports) {
      'use strict';

      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      var _uppercasePattern = /([A-Z])/g;

      /**
       * Hyphenates a camelcased string, for example:
       *
       *   > hyphenate('backgroundColor')
       *   < "background-color"
       *
       * For CSS style names, use `hyphenateStyleName` instead which works properly
       * with all vendor prefixes, including `ms`.
       *
       * @param {string} string
       * @return {string}
       */
      function hyphenate(string) {
        return string.replace(_uppercasePattern, '-$1').toLowerCase();
      }

      module.exports = hyphenate;
    }, {}], 7: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      'use strict';

      var hyphenate = _dereq_('./hyphenate');

      var msPattern = /^ms-/;

      /**
       * Hyphenates a camelcased CSS property name, for example:
       *
       *   > hyphenateStyleName('backgroundColor')
       *   < "background-color"
       *   > hyphenateStyleName('MozTransition')
       *   < "-moz-transition"
       *   > hyphenateStyleName('msTransition')
       *   < "-ms-transition"
       *
       * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
       * is converted to `-ms-`.
       *
       * @param {string} string
       * @return {string}
       */
      function hyphenateStyleName(string) {
        return hyphenate(string).replace(msPattern, '-ms-');
      }

      module.exports = hyphenateStyleName;
    }, { "./hyphenate": 6 }], 8: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright (c) 2013-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         */

        'use strict';

        /**
         * Use invariant() to assert state which your program assumes to be true.
         *
         * Provide sprintf-style format (only %s is supported) and arguments
         * to provide information about what broke and what you were
         * expecting.
         *
         * The invariant message will be stripped in production, but the invariant
         * will remain to ensure logic does not differ in production.
         */

        function invariant(condition, format, a, b, c, d, e, f) {
          if ("production" !== 'production') {
            if (format === undefined) {
              throw new Error('invariant requires an error message argument');
            }
          }

          if (!condition) {
            var error;
            if (format === undefined) {
              error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
            } else {
              var args = [a, b, c, d, e, f];
              var argIndex = 0;
              error = new Error(format.replace(/%s/g, function () {
                return args[argIndex++];
              }));
              error.name = 'Invariant Violation';
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
          }
        }

        module.exports = invariant;
      }).call(this, _dereq_('_process'));
    }, { "_process": 13 }], 9: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * 
       * @typechecks static-only
       */

      'use strict';

      /**
       * Memoizes the return value of a function that accepts one string argument.
       */

      function memoizeStringOnly(callback) {
        var cache = {};
        return function (string) {
          if (!cache.hasOwnProperty(string)) {
            cache[string] = callback.call(this, string);
          }
          return cache[string];
        };
      }

      module.exports = memoizeStringOnly;
    }, {}], 10: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      'use strict';

      var ExecutionEnvironment = _dereq_('./ExecutionEnvironment');

      var performance;

      if (ExecutionEnvironment.canUseDOM) {
        performance = window.performance || window.msPerformance || window.webkitPerformance;
      }

      module.exports = performance || {};
    }, { "./ExecutionEnvironment": 2 }], 11: [function (_dereq_, module, exports) {
      'use strict';

      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      var performance = _dereq_('./performance');

      var performanceNow;

      /**
       * Detect if we can use `window.performance.now()` and gracefully fallback to
       * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
       * because of Facebook's testing infrastructure.
       */
      if (performance.now) {
        performanceNow = function performanceNow() {
          return performance.now();
        };
      } else {
        performanceNow = function performanceNow() {
          return Date.now();
        };
      }

      module.exports = performanceNow;
    }, { "./performance": 10 }], 12: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2014-2015, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         */

        'use strict';

        var emptyFunction = _dereq_('./emptyFunction');

        /**
         * Similar to invariant but only logs a warning if the condition is not met.
         * This can be used to log issues in development environments in critical
         * paths. Removing the logging code for production environments will keep the
         * same logic and follow the same code paths.
         */

        var warning = emptyFunction;

        if ("production" !== 'production') {
          warning = function warning(condition, format) {
            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              args[_key - 2] = arguments[_key];
            }

            if (format === undefined) {
              throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
            }

            if (format.indexOf('Failed Composite propType: ') === 0) {
              return; // Ignore CompositeComponent proptype check.
            }

            if (!condition) {
              var argIndex = 0;
              var message = 'Warning: ' + format.replace(/%s/g, function () {
                return args[argIndex++];
              });
              if (typeof console !== 'undefined') {
                console.error(message);
              }
              try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
              } catch (x) {}
            }
          };
        }

        module.exports = warning;
      }).call(this, _dereq_('_process'));
    }, { "./emptyFunction": 5, "_process": 13 }], 13: [function (_dereq_, module, exports) {
      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      (function () {
        try {
          cachedSetTimeout = setTimeout;
        } catch (e) {
          cachedSetTimeout = function cachedSetTimeout() {
            throw new Error('setTimeout is not defined');
          };
        }
        try {
          cachedClearTimeout = clearTimeout;
        } catch (e) {
          cachedClearTimeout = function cachedClearTimeout() {
            throw new Error('clearTimeout is not defined');
          };
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        } else {
          return cachedSetTimeout.call(null, fun, 0);
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          clearTimeout(marker);
        } else {
          cachedClearTimeout.call(null, marker);
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
        while (len) {
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

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };
    }, {}], 14: [function (_dereq_, module, exports) {
      /**
       * Copyright 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @providesModule CSSProperty
       */

      'use strict';

      /**
       * CSS properties which accept numbers but are not in units of "px".
       */

      var isUnitlessNumber = {
        animationIterationCount: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridRow: true,
        gridColumn: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,

        // SVG-related properties
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };

      /**
       * @param {string} prefix vendor-specific prefix, eg: Webkit
       * @param {string} key style name, eg: transitionDuration
       * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
       * WebkitTransitionDuration
       */
      function prefixKey(prefix, key) {
        return prefix + key.charAt(0).toUpperCase() + key.substring(1);
      }

      /**
       * Support style names that may come passed in prefixed by adding permutations
       * of vendor prefixes.
       */
      var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

      // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
      // infinite loop, because it iterates over the newly added props too.
      Object.keys(isUnitlessNumber).forEach(function (prop) {
        prefixes.forEach(function (prefix) {
          isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
        });
      });

      /**
       * Most style properties can be unset by doing .style[prop] = '' but IE8
       * doesn't like doing that with shorthand properties so for the properties that
       * IE8 breaks on, which are listed here, we instead unset each of the
       * individual properties. See http://bugs.jquery.com/ticket/12385.
       * The 4-value 'clock' properties like margin, padding, border-width seem to
       * behave without any problems. Curiously, list-style works too without any
       * special prodding.
       */
      var shorthandPropertyExpansions = {
        background: {
          backgroundAttachment: true,
          backgroundColor: true,
          backgroundImage: true,
          backgroundPositionX: true,
          backgroundPositionY: true,
          backgroundRepeat: true
        },
        backgroundPosition: {
          backgroundPositionX: true,
          backgroundPositionY: true
        },
        border: {
          borderWidth: true,
          borderStyle: true,
          borderColor: true
        },
        borderBottom: {
          borderBottomWidth: true,
          borderBottomStyle: true,
          borderBottomColor: true
        },
        borderLeft: {
          borderLeftWidth: true,
          borderLeftStyle: true,
          borderLeftColor: true
        },
        borderRight: {
          borderRightWidth: true,
          borderRightStyle: true,
          borderRightColor: true
        },
        borderTop: {
          borderTopWidth: true,
          borderTopStyle: true,
          borderTopColor: true
        },
        font: {
          fontStyle: true,
          fontVariant: true,
          fontWeight: true,
          fontSize: true,
          lineHeight: true,
          fontFamily: true
        },
        outline: {
          outlineWidth: true,
          outlineStyle: true,
          outlineColor: true
        }
      };

      var CSSProperty = {
        isUnitlessNumber: isUnitlessNumber,
        shorthandPropertyExpansions: shorthandPropertyExpansions
      };

      module.exports = CSSProperty;
    }, {}], 15: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2013-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule CSSPropertyOperations
         */

        'use strict';

        var CSSProperty = _dereq_('./CSSProperty');
        var ExecutionEnvironment = _dereq_('fbjs/lib/ExecutionEnvironment');
        var ReactInstrumentation = _dereq_('./ReactInstrumentation');

        var camelizeStyleName = _dereq_('fbjs/lib/camelizeStyleName');
        var dangerousStyleValue = _dereq_('./dangerousStyleValue');
        var hyphenateStyleName = _dereq_('fbjs/lib/hyphenateStyleName');
        var memoizeStringOnly = _dereq_('fbjs/lib/memoizeStringOnly');
        var warning = _dereq_('fbjs/lib/warning');

        var processStyleName = memoizeStringOnly(function (styleName) {
          return hyphenateStyleName(styleName);
        });

        var hasShorthandPropertyBug = false;
        var styleFloatAccessor = 'cssFloat';
        if (ExecutionEnvironment.canUseDOM) {
          var tempStyle = document.createElement('div').style;
          try {
            // IE8 throws "Invalid argument." if resetting shorthand style properties.
            tempStyle.font = '';
          } catch (e) {
            hasShorthandPropertyBug = true;
          }
          // IE8 only supports accessing cssFloat (standard) as styleFloat
          if (document.documentElement.style.cssFloat === undefined) {
            styleFloatAccessor = 'styleFloat';
          }
        }

        if ("production" !== 'production') {
          // 'msTransform' is correct, but the other prefixes should be capitalized
          var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

          // style values shouldn't contain a semicolon
          var badStyleValueWithSemicolonPattern = /;\s*$/;

          var warnedStyleNames = {};
          var warnedStyleValues = {};
          var warnedForNaNValue = false;

          var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }

            warnedStyleNames[name] = true;
            "production" !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), checkRenderMessage(owner)) : void 0;
          };

          var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }

            warnedStyleNames[name] = true;
            "production" !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
          };

          var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
            if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
              return;
            }

            warnedStyleValues[value] = true;
            "production" !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
          };

          var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
            if (warnedForNaNValue) {
              return;
            }

            warnedForNaNValue = true;
            "production" !== 'production' ? warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
          };

          var checkRenderMessage = function checkRenderMessage(owner) {
            if (owner) {
              var name = owner.getName();
              if (name) {
                return ' Check the render method of `' + name + '`.';
              }
            }
            return '';
          };

          /**
           * @param {string} name
           * @param {*} value
           * @param {ReactDOMComponent} component
           */
          var warnValidStyle = function warnValidStyle(name, value, component) {
            var owner;
            if (component) {
              owner = component._currentElement._owner;
            }
            if (name.indexOf('-') > -1) {
              warnHyphenatedStyleName(name, owner);
            } else if (badVendoredStyleNamePattern.test(name)) {
              warnBadVendoredStyleName(name, owner);
            } else if (badStyleValueWithSemicolonPattern.test(value)) {
              warnStyleValueWithSemicolon(name, value, owner);
            }

            if (typeof value === 'number' && isNaN(value)) {
              warnStyleValueIsNaN(name, value, owner);
            }
          };
        }

        /**
         * Operations for dealing with CSS properties.
         */
        var CSSPropertyOperations = {

          /**
           * Serializes a mapping of style properties for use as inline styles:
           *
           *   > createMarkupForStyles({width: '200px', height: 0})
           *   "width:200px;height:0;"
           *
           * Undefined values are ignored so that declarative programming is easier.
           * The result should be HTML-escaped before insertion into the DOM.
           *
           * @param {object} styles
           * @param {ReactDOMComponent} component
           * @return {?string}
           */
          createMarkupForStyles: function createMarkupForStyles(styles, component) {
            var serialized = '';
            for (var styleName in styles) {
              if (!styles.hasOwnProperty(styleName)) {
                continue;
              }
              var styleValue = styles[styleName];
              if ("production" !== 'production') {
                warnValidStyle(styleName, styleValue, component);
              }
              if (styleValue != null) {
                serialized += processStyleName(styleName) + ':';
                serialized += dangerousStyleValue(styleName, styleValue, component) + ';';
              }
            }
            return serialized || null;
          },

          /**
           * Sets the value for multiple styles on a node.  If a value is specified as
           * '' (empty string), the corresponding style property will be unset.
           *
           * @param {DOMElement} node
           * @param {object} styles
           * @param {ReactDOMComponent} component
           */
          setValueForStyles: function setValueForStyles(node, styles, component) {
            if ("production" !== 'production') {
              ReactInstrumentation.debugTool.onHostOperation(component._debugID, 'update styles', styles);
            }

            var style = node.style;
            for (var styleName in styles) {
              if (!styles.hasOwnProperty(styleName)) {
                continue;
              }
              if ("production" !== 'production') {
                warnValidStyle(styleName, styles[styleName], component);
              }
              var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
              if (styleName === 'float' || styleName === 'cssFloat') {
                styleName = styleFloatAccessor;
              }
              if (styleValue) {
                style[styleName] = styleValue;
              } else {
                var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
                if (expansion) {
                  // Shorthand property that IE8 won't like unsetting, so unset each
                  // component to placate it
                  for (var individualStyleName in expansion) {
                    style[individualStyleName] = '';
                  }
                } else {
                  style[styleName] = '';
                }
              }
            }
          }

        };

        module.exports = CSSPropertyOperations;
      }).call(this, _dereq_('_process'));
    }, { "./CSSProperty": 14, "./ReactInstrumentation": 21, "./dangerousStyleValue": 23, "_process": 13, "fbjs/lib/ExecutionEnvironment": 2, "fbjs/lib/camelizeStyleName": 4, "fbjs/lib/hyphenateStyleName": 7, "fbjs/lib/memoizeStringOnly": 9, "fbjs/lib/warning": 12 }], 16: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2013-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule ReactChildrenMutationWarningDevtool
         */

        'use strict';

        var ReactComponentTreeDevtool = _dereq_('./ReactComponentTreeDevtool');

        var warning = _dereq_('fbjs/lib/warning');

        var elements = {};

        function handleElement(debugID, element) {
          if (element == null) {
            return;
          }
          if (element._shadowChildren === undefined) {
            return;
          }
          if (element._shadowChildren === element.props.children) {
            return;
          }
          var isMutated = false;
          if (Array.isArray(element._shadowChildren)) {
            if (element._shadowChildren.length === element.props.children.length) {
              for (var i = 0; i < element._shadowChildren.length; i++) {
                if (element._shadowChildren[i] !== element.props.children[i]) {
                  isMutated = true;
                }
              }
            } else {
              isMutated = true;
            }
          }
          "production" !== 'production' ? warning(Array.isArray(element._shadowChildren) && !isMutated, 'Component\'s children should not be mutated.%s', ReactComponentTreeDevtool.getStackAddendumByID(debugID)) : void 0;
        }

        var ReactDOMUnknownPropertyDevtool = {
          onBeforeMountComponent: function onBeforeMountComponent(debugID, element) {
            elements[debugID] = element;
          },
          onBeforeUpdateComponent: function onBeforeUpdateComponent(debugID, element) {
            elements[debugID] = element;
          },
          onComponentHasMounted: function onComponentHasMounted(debugID) {
            handleElement(debugID, elements[debugID]);
            delete elements[debugID];
          },
          onComponentHasUpdated: function onComponentHasUpdated(debugID) {
            handleElement(debugID, elements[debugID]);
            delete elements[debugID];
          }
        };

        module.exports = ReactDOMUnknownPropertyDevtool;
      }).call(this, _dereq_('_process'));
    }, { "./ReactComponentTreeDevtool": 17, "_process": 13, "fbjs/lib/warning": 12 }], 17: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2016-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule ReactComponentTreeDevtool
         */

        'use strict';

        var _prodInvariant = _dereq_('./reactProdInvariant');

        var ReactCurrentOwner = _dereq_('./ReactCurrentOwner');

        var invariant = _dereq_('fbjs/lib/invariant');
        var warning = _dereq_('fbjs/lib/warning');

        var tree = {};
        var unmountedIDs = {};
        var rootIDs = {};

        function updateTree(id, update) {
          if (!tree[id]) {
            tree[id] = {
              element: null,
              parentID: null,
              ownerID: null,
              text: null,
              childIDs: [],
              displayName: 'Unknown',
              isMounted: false,
              updateCount: 0
            };
          }
          update(tree[id]);
        }

        function purgeDeep(id) {
          var item = tree[id];
          if (item) {
            var childIDs = item.childIDs;

            delete tree[id];
            childIDs.forEach(purgeDeep);
          }
        }

        function describeComponentFrame(name, source, ownerName) {
          return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
        }

        function describeID(id) {
          var name = ReactComponentTreeDevtool.getDisplayName(id);
          var element = ReactComponentTreeDevtool.getElement(id);
          var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
          var ownerName;
          if (ownerID) {
            ownerName = ReactComponentTreeDevtool.getDisplayName(ownerID);
          }
          "production" !== 'production' ? warning(element, 'ReactComponentTreeDevtool: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
          return describeComponentFrame(name, element && element._source, ownerName);
        }

        var ReactComponentTreeDevtool = {
          onSetDisplayName: function onSetDisplayName(id, displayName) {
            updateTree(id, function (item) {
              return item.displayName = displayName;
            });
          },
          onSetChildren: function onSetChildren(id, nextChildIDs) {
            updateTree(id, function (item) {
              item.childIDs = nextChildIDs;

              nextChildIDs.forEach(function (nextChildID) {
                var nextChild = tree[nextChildID];
                !nextChild ? "production" !== 'production' ? invariant(false, 'Expected devtool events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('68') : void 0;
                !(nextChild.displayName != null) ? "production" !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('69') : void 0;
                !(nextChild.childIDs != null || nextChild.text != null) ? "production" !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('70') : void 0;
                !nextChild.isMounted ? "production" !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
                if (nextChild.parentID == null) {
                  nextChild.parentID = id;
                  // TODO: This shouldn't be necessary but mounting a new root during in
                  // componentWillMount currently causes not-yet-mounted components to
                  // be purged from our tree data so their parent ID is missing.
                }
                !(nextChild.parentID === id) ? "production" !== 'production' ? invariant(false, 'Expected onSetParent() and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('72', nextChildID, nextChild.parentID, id) : void 0;
              });
            });
          },
          onSetOwner: function onSetOwner(id, ownerID) {
            updateTree(id, function (item) {
              return item.ownerID = ownerID;
            });
          },
          onSetParent: function onSetParent(id, parentID) {
            updateTree(id, function (item) {
              return item.parentID = parentID;
            });
          },
          onSetText: function onSetText(id, text) {
            updateTree(id, function (item) {
              return item.text = text;
            });
          },
          onBeforeMountComponent: function onBeforeMountComponent(id, element) {
            updateTree(id, function (item) {
              return item.element = element;
            });
          },
          onBeforeUpdateComponent: function onBeforeUpdateComponent(id, element) {
            updateTree(id, function (item) {
              return item.element = element;
            });
          },
          onMountComponent: function onMountComponent(id) {
            updateTree(id, function (item) {
              return item.isMounted = true;
            });
          },
          onMountRootComponent: function onMountRootComponent(id) {
            rootIDs[id] = true;
          },
          onUpdateComponent: function onUpdateComponent(id) {
            updateTree(id, function (item) {
              return item.updateCount++;
            });
          },
          onUnmountComponent: function onUnmountComponent(id) {
            updateTree(id, function (item) {
              return item.isMounted = false;
            });
            unmountedIDs[id] = true;
            delete rootIDs[id];
          },
          purgeUnmountedComponents: function purgeUnmountedComponents() {
            if (ReactComponentTreeDevtool._preventPurging) {
              // Should only be used for testing.
              return;
            }

            for (var id in unmountedIDs) {
              purgeDeep(id);
            }
            unmountedIDs = {};
          },
          isMounted: function isMounted(id) {
            var item = tree[id];
            return item ? item.isMounted : false;
          },
          getCurrentStackAddendum: function getCurrentStackAddendum(topElement) {
            var info = '';
            if (topElement) {
              var type = topElement.type;
              var name = typeof type === 'function' ? type.displayName || type.name : type;
              var owner = topElement._owner;
              info += describeComponentFrame(name || 'Unknown', topElement._source, owner && owner.getName());
            }

            var currentOwner = ReactCurrentOwner.current;
            var id = currentOwner && currentOwner._debugID;

            info += ReactComponentTreeDevtool.getStackAddendumByID(id);
            return info;
          },
          getStackAddendumByID: function getStackAddendumByID(id) {
            var info = '';
            while (id) {
              info += describeID(id);
              id = ReactComponentTreeDevtool.getParentID(id);
            }
            return info;
          },
          getChildIDs: function getChildIDs(id) {
            var item = tree[id];
            return item ? item.childIDs : [];
          },
          getDisplayName: function getDisplayName(id) {
            var item = tree[id];
            return item ? item.displayName : 'Unknown';
          },
          getElement: function getElement(id) {
            var item = tree[id];
            return item ? item.element : null;
          },
          getOwnerID: function getOwnerID(id) {
            var item = tree[id];
            return item ? item.ownerID : null;
          },
          getParentID: function getParentID(id) {
            var item = tree[id];
            return item ? item.parentID : null;
          },
          getSource: function getSource(id) {
            var item = tree[id];
            var element = item ? item.element : null;
            var source = element != null ? element._source : null;
            return source;
          },
          getText: function getText(id) {
            var item = tree[id];
            return item ? item.text : null;
          },
          getUpdateCount: function getUpdateCount(id) {
            var item = tree[id];
            return item ? item.updateCount : 0;
          },
          getRootIDs: function getRootIDs() {
            return Object.keys(rootIDs);
          },
          getRegisteredIDs: function getRegisteredIDs() {
            return Object.keys(tree);
          }
        };

        module.exports = ReactComponentTreeDevtool;
      }).call(this, _dereq_('_process'));
    }, { "./ReactCurrentOwner": 18, "./reactProdInvariant": 24, "_process": 13, "fbjs/lib/invariant": 8, "fbjs/lib/warning": 12 }], 18: [function (_dereq_, module, exports) {
      /**
       * Copyright 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @providesModule ReactCurrentOwner
       */

      'use strict';

      /**
       * Keeps track of the current owner.
       *
       * The current owner is the component who should own any components that are
       * currently being constructed.
       */

      var ReactCurrentOwner = {

        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null

      };

      module.exports = ReactCurrentOwner;
    }, {}], 19: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2016-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule ReactDebugTool
         */

        'use strict';

        var ReactInvalidSetStateWarningDevTool = _dereq_('./ReactInvalidSetStateWarningDevTool');
        var ReactHostOperationHistoryDevtool = _dereq_('./ReactHostOperationHistoryDevtool');
        var ReactComponentTreeDevtool = _dereq_('./ReactComponentTreeDevtool');
        var ReactChildrenMutationWarningDevtool = _dereq_('./ReactChildrenMutationWarningDevtool');
        var ExecutionEnvironment = _dereq_('fbjs/lib/ExecutionEnvironment');

        var performanceNow = _dereq_('fbjs/lib/performanceNow');
        var warning = _dereq_('fbjs/lib/warning');

        var eventHandlers = [];
        var handlerDoesThrowForEvent = {};

        function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
          eventHandlers.forEach(function (handler) {
            try {
              if (handler[handlerFunctionName]) {
                handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
              }
            } catch (e) {
              "production" !== 'production' ? warning(handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e + '\n' + e.stack) : void 0;
              handlerDoesThrowForEvent[handlerFunctionName] = true;
            }
          });
        }

        var _isProfiling = false;
        var flushHistory = [];
        var lifeCycleTimerStack = [];
        var currentFlushNesting = 0;
        var currentFlushMeasurements = null;
        var currentFlushStartTime = null;
        var currentTimerDebugID = null;
        var currentTimerStartTime = null;
        var currentTimerNestedFlushDuration = null;
        var currentTimerType = null;

        var lifeCycleTimerHasWarned = false;

        function clearHistory() {
          ReactComponentTreeDevtool.purgeUnmountedComponents();
          ReactHostOperationHistoryDevtool.clearHistory();
        }

        function getTreeSnapshot(registeredIDs) {
          return registeredIDs.reduce(function (tree, id) {
            var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
            var parentID = ReactComponentTreeDevtool.getParentID(id);
            tree[id] = {
              displayName: ReactComponentTreeDevtool.getDisplayName(id),
              text: ReactComponentTreeDevtool.getText(id),
              updateCount: ReactComponentTreeDevtool.getUpdateCount(id),
              childIDs: ReactComponentTreeDevtool.getChildIDs(id),
              // Text nodes don't have owners but this is close enough.
              ownerID: ownerID || ReactComponentTreeDevtool.getOwnerID(parentID),
              parentID: parentID
            };
            return tree;
          }, {});
        }

        function resetMeasurements() {
          var previousStartTime = currentFlushStartTime;
          var previousMeasurements = currentFlushMeasurements || [];
          var previousOperations = ReactHostOperationHistoryDevtool.getHistory();

          if (currentFlushNesting === 0) {
            currentFlushStartTime = null;
            currentFlushMeasurements = null;
            clearHistory();
            return;
          }

          if (previousMeasurements.length || previousOperations.length) {
            var registeredIDs = ReactComponentTreeDevtool.getRegisteredIDs();
            flushHistory.push({
              duration: performanceNow() - previousStartTime,
              measurements: previousMeasurements || [],
              operations: previousOperations || [],
              treeSnapshot: getTreeSnapshot(registeredIDs)
            });
          }

          clearHistory();
          currentFlushStartTime = performanceNow();
          currentFlushMeasurements = [];
        }

        function checkDebugID(debugID) {
          "production" !== 'production' ? warning(debugID, 'ReactDebugTool: debugID may not be empty.') : void 0;
        }

        function beginLifeCycleTimer(debugID, timerType) {
          if (currentFlushNesting === 0) {
            return;
          }
          if (currentTimerType && !lifeCycleTimerHasWarned) {
            "production" !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
            lifeCycleTimerHasWarned = true;
          }
          currentTimerStartTime = performanceNow();
          currentTimerNestedFlushDuration = 0;
          currentTimerDebugID = debugID;
          currentTimerType = timerType;
        }

        function endLifeCycleTimer(debugID, timerType) {
          if (currentFlushNesting === 0) {
            return;
          }
          if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
            "production" !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
            lifeCycleTimerHasWarned = true;
          }
          if (_isProfiling) {
            currentFlushMeasurements.push({
              timerType: timerType,
              instanceID: debugID,
              duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration
            });
          }
          currentTimerStartTime = null;
          currentTimerNestedFlushDuration = null;
          currentTimerDebugID = null;
          currentTimerType = null;
        }

        function pauseCurrentLifeCycleTimer() {
          var currentTimer = {
            startTime: currentTimerStartTime,
            nestedFlushStartTime: performanceNow(),
            debugID: currentTimerDebugID,
            timerType: currentTimerType
          };
          lifeCycleTimerStack.push(currentTimer);
          currentTimerStartTime = null;
          currentTimerNestedFlushDuration = null;
          currentTimerDebugID = null;
          currentTimerType = null;
        }

        function resumeCurrentLifeCycleTimer() {
          var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop();

          var startTime = _lifeCycleTimerStack$.startTime;
          var nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime;
          var debugID = _lifeCycleTimerStack$.debugID;
          var timerType = _lifeCycleTimerStack$.timerType;

          var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
          currentTimerStartTime = startTime;
          currentTimerNestedFlushDuration += nestedFlushDuration;
          currentTimerDebugID = debugID;
          currentTimerType = timerType;
        }

        var ReactDebugTool = {
          addDevtool: function addDevtool(devtool) {
            eventHandlers.push(devtool);
          },
          removeDevtool: function removeDevtool(devtool) {
            for (var i = 0; i < eventHandlers.length; i++) {
              if (eventHandlers[i] === devtool) {
                eventHandlers.splice(i, 1);
                i--;
              }
            }
          },
          isProfiling: function isProfiling() {
            return _isProfiling;
          },
          beginProfiling: function beginProfiling() {
            if (_isProfiling) {
              return;
            }

            _isProfiling = true;
            flushHistory.length = 0;
            resetMeasurements();
            ReactDebugTool.addDevtool(ReactHostOperationHistoryDevtool);
          },
          endProfiling: function endProfiling() {
            if (!_isProfiling) {
              return;
            }

            _isProfiling = false;
            resetMeasurements();
            ReactDebugTool.removeDevtool(ReactHostOperationHistoryDevtool);
          },
          getFlushHistory: function getFlushHistory() {
            return flushHistory;
          },
          onBeginFlush: function onBeginFlush() {
            currentFlushNesting++;
            resetMeasurements();
            pauseCurrentLifeCycleTimer();
            emitEvent('onBeginFlush');
          },
          onEndFlush: function onEndFlush() {
            resetMeasurements();
            currentFlushNesting--;
            resumeCurrentLifeCycleTimer();
            emitEvent('onEndFlush');
          },
          onBeginLifeCycleTimer: function onBeginLifeCycleTimer(debugID, timerType) {
            checkDebugID(debugID);
            emitEvent('onBeginLifeCycleTimer', debugID, timerType);
            beginLifeCycleTimer(debugID, timerType);
          },
          onEndLifeCycleTimer: function onEndLifeCycleTimer(debugID, timerType) {
            checkDebugID(debugID);
            endLifeCycleTimer(debugID, timerType);
            emitEvent('onEndLifeCycleTimer', debugID, timerType);
          },
          onBeginReconcilerTimer: function onBeginReconcilerTimer(debugID, timerType) {
            checkDebugID(debugID);
            emitEvent('onBeginReconcilerTimer', debugID, timerType);
          },
          onEndReconcilerTimer: function onEndReconcilerTimer(debugID, timerType) {
            checkDebugID(debugID);
            emitEvent('onEndReconcilerTimer', debugID, timerType);
          },
          onError: function onError(debugID) {
            if (currentTimerDebugID != null) {
              endLifeCycleTimer(currentTimerDebugID, currentTimerType);
            }
            emitEvent('onError', debugID);
          },
          onBeginProcessingChildContext: function onBeginProcessingChildContext() {
            emitEvent('onBeginProcessingChildContext');
          },
          onEndProcessingChildContext: function onEndProcessingChildContext() {
            emitEvent('onEndProcessingChildContext');
          },
          onHostOperation: function onHostOperation(debugID, type, payload) {
            checkDebugID(debugID);
            emitEvent('onHostOperation', debugID, type, payload);
          },
          onComponentHasMounted: function onComponentHasMounted(debugID) {
            checkDebugID(debugID);
            emitEvent('onComponentHasMounted', debugID);
          },
          onComponentHasUpdated: function onComponentHasUpdated(debugID) {
            checkDebugID(debugID);
            emitEvent('onComponentHasUpdated', debugID);
          },
          onSetState: function onSetState() {
            emitEvent('onSetState');
          },
          onSetDisplayName: function onSetDisplayName(debugID, displayName) {
            checkDebugID(debugID);
            emitEvent('onSetDisplayName', debugID, displayName);
          },
          onSetChildren: function onSetChildren(debugID, childDebugIDs) {
            checkDebugID(debugID);
            childDebugIDs.forEach(checkDebugID);
            emitEvent('onSetChildren', debugID, childDebugIDs);
          },
          onSetOwner: function onSetOwner(debugID, ownerDebugID) {
            checkDebugID(debugID);
            emitEvent('onSetOwner', debugID, ownerDebugID);
          },
          onSetParent: function onSetParent(debugID, parentDebugID) {
            checkDebugID(debugID);
            emitEvent('onSetParent', debugID, parentDebugID);
          },
          onSetText: function onSetText(debugID, text) {
            checkDebugID(debugID);
            emitEvent('onSetText', debugID, text);
          },
          onMountRootComponent: function onMountRootComponent(debugID) {
            checkDebugID(debugID);
            emitEvent('onMountRootComponent', debugID);
          },
          onBeforeMountComponent: function onBeforeMountComponent(debugID, element) {
            checkDebugID(debugID);
            emitEvent('onBeforeMountComponent', debugID, element);
          },
          onMountComponent: function onMountComponent(debugID) {
            checkDebugID(debugID);
            emitEvent('onMountComponent', debugID);
          },
          onBeforeUpdateComponent: function onBeforeUpdateComponent(debugID, element) {
            checkDebugID(debugID);
            emitEvent('onBeforeUpdateComponent', debugID, element);
          },
          onUpdateComponent: function onUpdateComponent(debugID) {
            checkDebugID(debugID);
            emitEvent('onUpdateComponent', debugID);
          },
          onUnmountComponent: function onUnmountComponent(debugID) {
            checkDebugID(debugID);
            emitEvent('onUnmountComponent', debugID);
          },
          onTestEvent: function onTestEvent() {
            emitEvent('onTestEvent');
          }
        };

        ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
        ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
        ReactDebugTool.addDevtool(ReactChildrenMutationWarningDevtool);
        var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
        if (/[?&]react_perf\b/.test(url)) {
          ReactDebugTool.beginProfiling();
        }

        module.exports = ReactDebugTool;
      }).call(this, _dereq_('_process'));
    }, { "./ReactChildrenMutationWarningDevtool": 16, "./ReactComponentTreeDevtool": 17, "./ReactHostOperationHistoryDevtool": 20, "./ReactInvalidSetStateWarningDevTool": 22, "_process": 13, "fbjs/lib/ExecutionEnvironment": 2, "fbjs/lib/performanceNow": 11, "fbjs/lib/warning": 12 }], 20: [function (_dereq_, module, exports) {
      /**
       * Copyright 2016-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @providesModule ReactHostOperationHistoryDevtool
       */

      'use strict';

      var history = [];

      var ReactHostOperationHistoryDevtool = {
        onHostOperation: function onHostOperation(debugID, type, payload) {
          history.push({
            instanceID: debugID,
            type: type,
            payload: payload
          });
        },
        clearHistory: function clearHistory() {
          if (ReactHostOperationHistoryDevtool._preventClearing) {
            // Should only be used for tests.
            return;
          }

          history = [];
        },
        getHistory: function getHistory() {
          return history;
        }
      };

      module.exports = ReactHostOperationHistoryDevtool;
    }, {}], 21: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2016-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule ReactInstrumentation
         */

        'use strict';

        var debugTool = null;

        if ("production" !== 'production') {
          var ReactDebugTool = _dereq_('./ReactDebugTool');
          debugTool = ReactDebugTool;
        }

        module.exports = { debugTool: debugTool };
      }).call(this, _dereq_('_process'));
    }, { "./ReactDebugTool": 19, "_process": 13 }], 22: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2016-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule ReactInvalidSetStateWarningDevTool
         */

        'use strict';

        var warning = _dereq_('fbjs/lib/warning');

        if ("production" !== 'production') {
          var processingChildContext = false;

          var warnInvalidSetState = function warnInvalidSetState() {
            "production" !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
          };
        }

        var ReactInvalidSetStateWarningDevTool = {
          onBeginProcessingChildContext: function onBeginProcessingChildContext() {
            processingChildContext = true;
          },
          onEndProcessingChildContext: function onEndProcessingChildContext() {
            processingChildContext = false;
          },
          onSetState: function onSetState() {
            warnInvalidSetState();
          }
        };

        module.exports = ReactInvalidSetStateWarningDevTool;
      }).call(this, _dereq_('_process'));
    }, { "_process": 13, "fbjs/lib/warning": 12 }], 23: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2013-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule dangerousStyleValue
         */

        'use strict';

        var CSSProperty = _dereq_('./CSSProperty');
        var warning = _dereq_('fbjs/lib/warning');

        var isUnitlessNumber = CSSProperty.isUnitlessNumber;
        var styleWarnings = {};

        /**
         * Convert a value into the proper css writable value. The style name `name`
         * should be logical (no hyphens), as specified
         * in `CSSProperty.isUnitlessNumber`.
         *
         * @param {string} name CSS property name such as `topMargin`.
         * @param {*} value CSS property value such as `10px`.
         * @param {ReactDOMComponent} component
         * @return {string} Normalized style value with dimensions applied.
         */
        function dangerousStyleValue(name, value, component) {
          // Note that we've removed escapeTextForBrowser() calls here since the
          // whole string will be escaped when the attribute is injected into
          // the markup. If you provide unsafe user data here they can inject
          // arbitrary CSS which may be problematic (I couldn't repro this):
          // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
          // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
          // This is not an XSS hole but instead a potential CSS injection issue
          // which has lead to a greater discussion about how we're going to
          // trust URLs moving forward. See #2115901

          var isEmpty = value == null || typeof value === 'boolean' || value === '';
          if (isEmpty) {
            return '';
          }

          var isNonNumeric = isNaN(value);
          if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
            return '' + value; // cast to string
          }

          if (typeof value === 'string') {
            if ("production" !== 'production') {
              // Allow '0' to pass through without warning. 0 is already special and
              // doesn't require units, so we don't need to warn about it.
              if (component && value !== '0') {
                var owner = component._currentElement._owner;
                var ownerName = owner ? owner.getName() : null;
                if (ownerName && !styleWarnings[ownerName]) {
                  styleWarnings[ownerName] = {};
                }
                var warned = false;
                if (ownerName) {
                  var warnings = styleWarnings[ownerName];
                  warned = warnings[name];
                  if (!warned) {
                    warnings[name] = true;
                  }
                }
                if (!warned) {
                  "production" !== 'production' ? warning(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
                }
              }
            }
            value = value.trim();
          }
          return value + 'px';
        }

        module.exports = dangerousStyleValue;
      }).call(this, _dereq_('_process'));
    }, { "./CSSProperty": 14, "_process": 13, "fbjs/lib/warning": 12 }], 24: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @providesModule reactProdInvariant
       * 
       */
      'use strict';

      /**
       * WARNING: DO NOT manually require this module.
       * This is a replacement for `invariant(...)` used by the error code system
       * and will _only_ be required by the corresponding babel pass.
       * It always throws.
       */

      function reactProdInvariant(code) {
        var argCount = arguments.length - 1;

        var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

        for (var argIdx = 0; argIdx < argCount; argIdx++) {
          message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
        }

        message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

        var error = new Error(message);
        error.name = 'Invariant Violation';
        error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

        throw error;
      }

      module.exports = reactProdInvariant;
    }, {}] }, {}, [1])(1);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoprefix;
// from https://github.com/petehunt/jsxstyle/blob/master/lib/autoprefix.js

var assign = Object.assign;

function autoprefix(style) {
  if (style.hasOwnProperty('animation')) {
    // assign(style, {
    //   WebkitAnimation: style.animation
    // })
  }

  if (style.hasOwnProperty('transform')) {
    assign(style, {
      WebkitTransform: style.transform
    });
  }

  if (style.hasOwnProperty('userSelect')) {
    assign(style, {
      WebkitUserSelect: style.userSelect,
      MozUserSelect: style.userSelect,
      msUserSelect: style.userSelect
    });
  }

  if (style.hasOwnProperty('transition')) {
    assign(style, {
      WebkitTransition: style.transition,
      MozTransition: style.transition,
      msTransition: style.transition
    });
  }

  if (style.hasOwnProperty('boxShadow')) {
    assign(style, {
      WebkitBoxShadow: style.boxShadow,
      MozBoxShadow: style.boxShadow,
      msBoxSelect: style.boxShadow
    });
  }

  if (style.hasOwnProperty('fontSmoothing')) {
    assign(style, {
      WebkitFontSmoothing: style.fontSmoothing,
      MozOsxFontSmoothing: style.fontSmoothing === 'antialiased' ? 'grayscale' : undefined
    });
  }

  if (style.hasOwnProperty('flexDirection')) {
    assign(style, {
      WebkitFlexDirection: style.flexDirection
    });
  }

  if (style.hasOwnProperty('flexWrap')) {
    assign(style, {
      WebkitFlexWrap: style.flexWrap
    });
  }

  if (style.hasOwnProperty('alignItems')) {
    assign(style, {
      WebkitAlignItems: style.alignItems
    });
  }

  if (style.hasOwnProperty('flexGrow')) {
    assign(style, {
      WebkitFlexGrow: style.flexGrow
    });
  }

  if (style.hasOwnProperty('flexShrink')) {
    assign(style, {
      WebkitFlexShrink: style.flexShrink
    });
  }

  if (style.hasOwnProperty('order')) {
    assign(style, {
      WebkitOrder: style.order
    });
  }

  if (style.hasOwnProperty('justifyContent')) {
    assign(style, {
      WebkitJustifyContent: style.justifyContent
    });
  }

  if (style.hasOwnProperty('flex')) {
    assign(style, {
      WebkitFlex: style.flex
    });
  }

  if (style.display === 'flex') {
    style.display = style.display + ';display:-webkit-flex;display:-ms-flexbox';
  }

  return style;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doHash;
// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presets = exports.compose = exports.$ = exports.multi = exports.placeholder = exports.backdrop = exports.selection = exports.firstLine = exports.firstLetter = exports.before = exports.after = exports.nthOfType = exports.nthLastOfType = exports.nthLastChild = exports.nthChild = exports.not = exports.lang = exports.dir = exports.visited = exports.valid = exports.target = exports.scope = exports.root = exports.right = exports.required = exports.readWrite = exports.readOnly = exports.outOfRange = exports.optional = exports.onlyOfType = exports.onlyChild = exports.link = exports.left = exports.lastOfType = exports.lastChild = exports.invalid = exports.inRange = exports.indeterminate = exports.hover = exports.focus = exports.fullscreen = exports.firstOfType = exports.firstChild = exports.first = exports._default = exports.enabled = exports.empty = exports.disabled = exports.checked = exports.any = exports.active = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.simulations = simulations;
exports.simulate = simulate;
exports.cssLabels = cssLabels;
exports.speedy = speedy;
exports.appendSheetRule = appendSheetRule;
exports.flush = flush;
exports.remove = remove;
exports.idFor = idFor;
exports.add = add;
exports.style = style;
exports.select = select;
exports.keyed = keyed;
exports.merge = merge;
exports.media = media;
exports.trackMediaQueryLabels = trackMediaQueryLabels;
exports.fontFace = fontFace;
exports.keyframes = keyframes;
exports.cssFor = cssFor;
exports.attribsFor = attribsFor;
exports.renderStatic = renderStatic;
exports.renderStaticOptimized = renderStaticOptimized;
exports.rehydrate = rehydrate;

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

var _autoprefix = require('./autoprefix');

var _autoprefix2 = _interopRequireDefault(_autoprefix);

var _CSSPropertyOperations = require('./CSSPropertyOperations.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // first we import some helpers 
// hashes a string to something 'unique'

// yurgh must get back to this 
// import prefixAll from 'inline-style-prefixer/static'   // adds vendor prefixes to styles 
// import  Prefix  from 'inline-style-prefixer'
// let prefixer = new Prefix({ userAgent: navigator.userAgent })


// we've used browserify to extract react's CSSPropertyOperations module and it's deps into ./CSSPropertyOperations 


// converts a js style object to css markup
// todo - rewrite this yourself, save a kb or two 

// define some constants 
var isBrowser = typeof document !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("production");
var isTest = "production" === 'test';

// a useful utility for quickly tapping objects. use with the :: operator 
// {x: 1}::log()
// [5, 12, 90]::log().filter(x => x%5)::log()
function log(msg) {
  //eslint-disable-line no-unused-vars
  console.log(msg || this); //eslint-disable-line no-console
  return this;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**** simulations  ****/

// a flag to enable simulation meta tags on dom nodes 
// defaults to true in dev mode. recommend *not* to 
// toggle often. 
var canSimulate = isDev;

// we use these flags for issuing warnings when simulate is called 
// in prod / in incorrect order 
var warned1 = false,
    warned2 = false;

// toggles simulation activity. shouldn't be needed in most cases 
function simulations() {
  var bool = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  canSimulate = !!bool;
}

// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format 
// and matches an existing rule on the element 
// eg simulate('nthChild2', ':hover:active') etc 
function simulate() {
  if (!canSimulate) {
    if (!warned1) {
      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
      warned1 = true;
    }
    if (!isDev && !isTest && !warned2) {
      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
      warned2 = true;
    }
    return {};
  }

  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
    pseudos[_key] = arguments[_key];
  }

  return pseudos.reduce(function (o, p) {
    return o['data-simulate-' + simple(p)] = '', o;
  }, {});
}

/**** labels ****/
// toggle for debug labels. 
// shouldn't *have* to mess with this manually
var hasLabels = false; // isDev

function cssLabels(bool) {
  hasLabels = !!bool;
}

/**** stylesheet ****/

// these here are our main 'mutable' references
var cache = {},
    // stores all the registered styles. most important, for such a small name.  
styleTag = void 0,
    // reference to the <style> tag, if in browser 
styleSheet = void 0,
    // reference to the styleSheet object, either native on browser / polyfilled on server 
keyIndices = {}; // avoid scanning when inserting rules 


function injectStyleSheet() {
  if (isBrowser) {
    // this section is just weird alchemy I found online off many sources 
    // it checks to see if the tag exists; creates an empty one if not 
    styleTag = document.getElementById('_css_');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.id = styleTag.id || '_css_';
      styleTag.setAttribute('id', '_css_');
      styleTag.appendChild(document.createTextNode(''));
      (document.head || document.getElementsByTagName('head')[0]).appendChild(styleTag);
    }
    // this weirdness brought to you by firefox 
    styleSheet = [].concat(_toConsumableArray(document.styleSheets)).filter(function (x) {
      return x.ownerNode === styleTag;
    })[0];
  } else {
    // server side 'polyfill'. just enough behavior to be useful.
    styleSheet = {
      cssRules: [],
      deleteRule: function deleteRule(index) {
        styleSheet.cssRules = [].concat(_toConsumableArray(styleSheet.cssRules.slice(0, index)), _toConsumableArray(styleSheet.cssRules.slice(index + 1)));
      },
      insertRule: function insertRule(rule, index) {
        // enough 'spec compliance' to be able to extract the rules later  
        // in other words, just the cssText field 
        styleSheet.cssRules = [].concat(_toConsumableArray(styleSheet.cssRules.slice(0, index)), [{ cssText: rule }], _toConsumableArray(styleSheet.cssRules.slice(index)));
      }
    };
  }
}

/**************** LIFTOFF IN 3... 2... 1... ****************/
injectStyleSheet();
/****************      TO THE MOOOOOOON     ****************/

// a flag to use stylesheet.insertrule 
// the big drawback here is that the css won't be editable in devtools
var isSpeedy = !isDev && !isTest; // only in prod mode does it make 'sense' 

function speedy() {
  var bool = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  // we don't let you change isSpeedy if you've already made a modification to the stylesheet
  if (bool !== isSpeedy && Object.keys(cache).length !== 0) {
    console.error('cannot change speedy setting after appending styles in a different mode'); //eslint-disable-line no-console
    return;
  }
  isSpeedy = !!bool;
}

function inlineInsertRule(rule) {
  var index = arguments.length <= 1 || arguments[1] === undefined ? styleSheet.cssRules.length : arguments[1];

  // this weirdness for perf, and chrome's weird bug 
  // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule

  try {
    styleSheet.insertRule(rule, index);
  } catch (e) {
    if (isDev) {
      // might need beter dx for this 
      console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
    }
  }
}

// adds a css rule to the sheet. only used 'internally'. 
function appendSheetRule(rule, index) {
  // todo - tests 

  // more browser weirdness. I don't even know
  if (styleTag && styleTag.styleSheet) {
    styleTag.styleSheet.cssText += rule;
  } else {
    if (isBrowser) {
      if (isSpeedy && styleSheet.insertRule) {
        inlineInsertRule(rule, index);
      } else {
        styleTag.appendChild(document.createTextNode(rule));
        // todo - more efficent here please 
        if (!isSpeedy) {
          // sighhh
          styleSheet = [].concat(_toConsumableArray(document.styleSheets)).filter(function (x) {
            return x.ownerNode === styleTag;
          })[0];
        }
      }
    } else {
      // server side is pretty simple 
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    }
  }
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR. 
function flush() {
  // todo - tests 
  cache = {};
  // todo backward compat (styleTag.styleSheet.cssText?)
  if (isBrowser) {
    styleTag && styleTag.parentNode.removeChild(styleTag);
    styleTag = null;
    // todo - look for remnants in document.styleSheets
    injectStyleSheet();
  } else {
    // simpler on server 
    styleSheet.cssRules = [];
  }
}

function remove() {
  // todo
  // remove rule
  throw new Error('this is not tested or anything yet! beware!'); //eslint-disable-line no-console

  // let id = o[Object.keys(o)[0]]
  // let i = sheet.rules.indexOf(x => x.selectorText === selector(id, cache[id].type))
  // sheet.deleteRule(i)
  // delete cache[id]
}

// now, some functions to help deal with styles / rules 

// generates a hash for (type, style)
function styleHash(type, style) {
  // todo - default type = '_'. this changes all the hashes and will break tests, so do later 
  // make sure type exists
  // make sure obj is style-like?
  return (0, _hash2.default)(type + Object.keys(style).reduce(function (str, k) {
    return str + k + style[k];
  }, '')).toString(36);
}

// helper to hack around isp's array format 
function prefixes(style) {
  return (0, _autoprefix2.default)(style);
}

// generates a css selector for (id, type)
function selector(id, type) {
  // id should exist
  var isFullSelector = type && type[0] === '$';
  var cssType = type === '_' ? '' : type[0] === '$' ? type.slice(1) : ':' + type;
  var result = void 0;

  if (isFullSelector) {
    // todo - do we need the weird chrome bug fix here too?
    result = cssType.split(',').map(function (x) {
      return '[data-css-' + id + ']' + x;
    }).join(',');
  } else {
    result = '[data-css-' + id + ']' + cssType;
  }

  // https://github.com/threepointone/glamor/issues/20
  result = result.replace(/\:hover/g, ':hover:nth-child(n)');

  if (canSimulate && type !== '_' && !isFullSelector && cssType[0] === ':') {
    // todo - work with pseudo selector  on full selector at least 
    result += ', [data-css-' + id + '][data-simulate-' + simple(type) + ']';
  }
  return result;
}

// ... which is them used to generate css rules 
function cssrule(id, type, style) {
  return selector(id, type) + '{ ' + (0, _CSSPropertyOperations.createMarkupForStyles)(prefixes(style)) + ' } ';
}

// given a rule {data-css-id: ''}, checks if it's a valid, registered id
// returns the id 
function idFor(rule) {
  // todo - weak map hash for this?
  if (Object.keys(rule).length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9]+)/;
  var match = regex.exec(Object.keys(rule)[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

// checks if a rule is registered
function isRule(rule) {
  try {
    var id = idFor(rule);
    return id && cache[id];
  } catch (e) {
    return false;
  }
}

// a generic rule creator/insertor 
function add() {
  var type = arguments.length <= 0 || arguments[0] === undefined ? '_' : arguments[0];
  var style = arguments[1];
  var key = arguments[2];

  var id = key || styleHash(type, style),
      // generate a hash based on type/style, use this to 'id' the rule everywhere 
  label = '',
      keyIndex = -1;

  if (!cache[id] || key) {
    if (key) {
      // if the key already exists, delete it 
      keyIndex = keyIndices[key];
      if (keyIndex >= 0) {
        //remove rule
        if (isSpeedy || !isBrowser) {
          styleSheet.deleteRule(keyIndex);
        } else {
          styleTag.removeChild(styleTag.childNodes[keyIndex + 1]); // the +1 to account for the blank node we added
          // reassign stylesheet, because firefox is weird 
          styleSheet = [].concat(_toConsumableArray(document.styleSheets)).filter(function (x) {
            return x.ownerNode === styleTag;
          })[0];
        }
      }
    }

    // add rule to sheet, update cache. easy!
    if (key) {
      appendSheetRule(cssrule(id, type, style), keyIndex);
      keyIndices[key] = keyIndex || styleSheet.cssRules.length - 1;
    } else {
      appendSheetRule(cssrule(id, type, style));
    }

    cache[id] = { type: type, style: style, id: id };
  }
  if (hasLabels) {
    // adds a debug label 
    label = style.label || (type !== '_' ? ':' + type : '');
  }

  return _defineProperty({}, 'data-css-' + id, label);
}

// with those in place, we can now define user-friendly functions for 
// defining styles on nodes 

// first up, what will probably be most commonly used.
// defines some css 'directly' on the node it's applied on
function style(obj) {
  return add(undefined, obj);
}

// alllllll the pseudoclasses
// todo - autogenerate this by scraping MDN
var active = exports.active = function active(x) {
  return add('active', x);
};
var any = exports.any = function any(x) {
  return add('any', x);
};
var checked = exports.checked = function checked(x) {
  return add('checked', x);
};
var disabled = exports.disabled = function disabled(x) {
  return add('disabled', x);
};
var empty = exports.empty = function empty(x) {
  return add('empty', x);
};
var enabled = exports.enabled = function enabled(x) {
  return add('enabled', x);
};
var _default = exports._default = function _default(x) {
  return add('default', x);
}; // note '_default' name 
var first = exports.first = function first(x) {
  return add('first', x);
};
var firstChild = exports.firstChild = function firstChild(x) {
  return add('first-child', x);
};
var firstOfType = exports.firstOfType = function firstOfType(x) {
  return add('first-of-type', x);
};
var fullscreen = exports.fullscreen = function fullscreen(x) {
  return add('fullscreen', x);
};
var focus = exports.focus = function focus(x) {
  return add('focus', x);
};
var hover = exports.hover = function hover(x) {
  return add('hover', x);
};
var indeterminate = exports.indeterminate = function indeterminate(x) {
  return add('indeterminate', x);
};
var inRange = exports.inRange = function inRange(x) {
  return add('in-range', x);
};
var invalid = exports.invalid = function invalid(x) {
  return add('invalid', x);
};
var lastChild = exports.lastChild = function lastChild(x) {
  return add('last-child', x);
};
var lastOfType = exports.lastOfType = function lastOfType(x) {
  return add('last-of-type', x);
};
var left = exports.left = function left(x) {
  return add('left', x);
};
var link = exports.link = function link(x) {
  return add('link', x);
};
var onlyChild = exports.onlyChild = function onlyChild(x) {
  return add('only-child', x);
};
var onlyOfType = exports.onlyOfType = function onlyOfType(x) {
  return add('only-of-type', x);
};
var optional = exports.optional = function optional(x) {
  return add('optional', x);
};
var outOfRange = exports.outOfRange = function outOfRange(x) {
  return add('out-of-range', x);
};
var readOnly = exports.readOnly = function readOnly(x) {
  return add('read-only', x);
};
var readWrite = exports.readWrite = function readWrite(x) {
  return add('read-write', x);
};
var required = exports.required = function required(x) {
  return add('required', x);
};
var right = exports.right = function right(x) {
  return add('right', x);
};
var root = exports.root = function root(x) {
  return add('root', x);
};
var scope = exports.scope = function scope(x) {
  return add('scope', x);
};
var target = exports.target = function target(x) {
  return add('target', x);
};
var valid = exports.valid = function valid(x) {
  return add('valid', x);
};
var visited = exports.visited = function visited(x) {
  return add('visited', x);
};

// parameterized pseudoclasses
var dir = exports.dir = function dir(p, x) {
  return add('dir(' + p + ')', x);
};
var lang = exports.lang = function lang(p, x) {
  return add('lang(' + p + ')', x);
};
var not = exports.not = function not(p, x) {
  return add('not(' + p + ')', x);
};
var nthChild = exports.nthChild = function nthChild(p, x) {
  return add('nth-child(' + p + ')', x);
};
var nthLastChild = exports.nthLastChild = function nthLastChild(p, x) {
  return add('nth-last-child(' + p + ')', x);
};
var nthLastOfType = exports.nthLastOfType = function nthLastOfType(p, x) {
  return add('nth-last-of-type(' + p + ')', x);
};
var nthOfType = exports.nthOfType = function nthOfType(p, x) {
  return add('nth-of-type(' + p + ')', x);
};

// pseudoelements
var after = exports.after = function after(x) {
  return add(':after', x);
};
var before = exports.before = function before(x) {
  return add(':before', x);
};
var firstLetter = exports.firstLetter = function firstLetter(x) {
  return add(':first-letter', x);
};
var firstLine = exports.firstLine = function firstLine(x) {
  return add(':first-line', x);
};
var selection = exports.selection = function selection(x) {
  return add(':selection', x);
};
var backdrop = exports.backdrop = function backdrop(x) {
  return add(':backdrop', x);
};
var placeholder = exports.placeholder = function placeholder(x) {
  return add(':placeholder', x);
};

// when you need multiple pseudoclasses in a single selector
// eg x:hover:visited for when hovering over visited elements 
var multi = exports.multi = function multi(selector, style) {
  console.warn('multi is deprecated, use select(\':' + selector + '\', {...}) instead'); // eslint-disable-line no-console
  return add(selector, style);
};

// unique feature 
// when you need to define 'real' css (whatever that may be)
// https://twitter.com/threepointone/status/756585907877273600
// https://twitter.com/threepointone/status/756986938033254400
function select(selector, style) {
  return add('$' + selector, style); // signalling ahead that this is a plain selector 
}

var $ = exports.$ = select;

// unique feature 
// use for advanced perf/animations/whatnot 
// instead of overwriting, it replaces the rule in the stylesheet
function keyed(key, type, style) {
  // todo - accept a style/rule? unlcear. 
  if (typeof key !== 'string') {
    throw new Error('whoops, did you forget a key?');
  }
  if (!style && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
    style = type;
    type = undefined;
  }
  // should be able to pass a merged rule etc too 
  // maybe ...styles as well?
  return add(type, style, key);
}

// we define a function to 'merge' styles together.
// backstory - because of a browser quirk, multiple styles are applied in the order they're 
// defined the stylesheet, not in the order of application 
// in most cases, thsi won't case an issue UNTIL IT DOES 
// instead, use merge() to merge styles,
// with latter styles gaining precedence over former ones 
function merge() {
  var labels = [],
      mergeLabel = void 0,
      styleBag = {},
      mediaBag = {};

  for (var _len2 = arguments.length, rules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    rules[_key2] = arguments[_key2];
  }

  rules.forEach(function (rule, i) {
    // optionally send a string as first argumnet to 'label' this merged rule  
    if (i === 0 && typeof rule === 'string') {
      mergeLabel = rule;
      // bail early
      return;
    }
    if (isRule(rule)) {
      // it's a rule!

      var _id = idFor(rule);

      if (cache[_id].bag) {
        var _ret = function () {
          // merged rule 

          var _cache$_id = cache[_id];
          var bag = _cache$_id.bag;
          var label = _cache$_id.label;
          var media = _cache$_id.media;

          Object.keys(bag).forEach(function (type) {
            styleBag[type] = _extends({}, styleBag[type] || {}, bag[type]);
          });
          // if there's a media bag, merge those in 
          if (media) {
            Object.keys(media).forEach(function (expr) {
              mediaBag[expr] = mediaBag[expr] || {};
              Object.keys(media[expr]).forEach(function (type) {
                // mediaBag[expr][type] = mediaBag[expr][type] || {}
                mediaBag[expr][type] = _extends({}, mediaBag[expr][type] || {}, media[expr][type]);
              });
            });
          }

          hasLabels && labels.push('[' + label + ']');
          return {
            v: void 0
          };
          // that was fairly straightforward
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      if (cache[_id].expr) {
        var _ret2 = function () {
          // media rule
          var _cache$_id2 = cache[_id];
          var expr = _cache$_id2.expr;
          var label = _cache$_id2.label;
          var rule = _cache$_id2.rule;
          var style = _cache$_id2.style;

          mediaBag[expr] = mediaBag[expr] || {};
          if (rule) {
            var iid = idFor(rule);
            if (cache[iid].bag) {
              (function () {
                // if merged rule, merge it's bag into stylebag 
                // we won't expect a mediabag in this merged rule, because it would have thrown in media (phew)

                var bag = cache[iid].bag;

                Object.keys(bag).forEach(function (type) {
                  mediaBag[expr][type] = _extends({}, mediaBag[expr][type] || {}, bag[type]);
                });
              })();
            } else {
              var _cache$iid = cache[iid];
              var type = _cache$iid.type;
              var _style = _cache$iid.style;

              mediaBag[expr][type] = _extends({}, mediaBag[expr][type] || {}, _style);
            }
          } else {
            mediaBag[expr]._ = _extends({}, mediaBag[expr]._ || {}, style);
          }

          // mediaBag[expr].push(rule)
          hasLabels && labels.push(label);
          return {
            v: void 0
          };

          // throw new Error('cannot merge a media rule')
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        // simple rule 

        var _cache$_id3 = cache[_id];
        var type = _cache$_id3.type;
        var _style2 = _cache$_id3.style;

        styleBag[type] = _extends({}, styleBag[type] || {}, _style2);
        hasLabels && labels.push((_style2.label || '`' + _id) + ('' + (type !== '_' ? ':' + type : ''))); // todo - match 'add()'s original label
        return;
        // not too bad 
      }
    } else {
      // plain style 
      styleBag._ = _extends({}, styleBag._ || {}, rule);
      hasLabels && labels.push('{…}');
    }
  });

  // todo - remove label from merged styles? unclear. 

  var id = (0, _hash2.default)(mergeLabel + JSON.stringify(mediaBag) + JSON.stringify(styleBag)).toString(36); // todo - predictable order
  // make a merged label
  var label = hasLabels ? '' + (mergeLabel ? mergeLabel + '= ' : '') + (labels.length ? labels.join(' + ') : '') : ''; // yuck 

  if (!cache[id]) {
    cache[id] = _extends({ bag: styleBag, id: id, label: label }, Object.keys(mediaBag).length > 0 ? { media: mediaBag } : {});
    Object.keys(styleBag).forEach(function (type) {
      appendSheetRule(cssrule(id, type, styleBag[type]));
    });

    Object.keys(mediaBag).forEach(function (expr) {
      var css = Object.keys(mediaBag[expr]).map(function (type) {
        return cssrule(id, type, mediaBag[expr][type]);
      }).join('\n');

      appendSheetRule('@media ' + expr + ' { ' + css + ' }');
    });
  }
  return _defineProperty({}, 'data-css-' + id, label);
}

var compose = exports.compose = merge;

// this one's for media queries 
// they cannot be merged with other queries 
// todo - we should test whether the query is valid and give dev feedback 
function media(expr) {
  for (var _len3 = arguments.length, rules = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    rules[_key3 - 1] = arguments[_key3];
  }

  if (rules.length > 1) {
    return media(expr, merge.apply(undefined, rules));
  } // todo - iterate yourself instead 
  var rule = rules[0];
  // test if valid media query
  if (isRule(rule)) {
    var id = idFor(rule);

    if (cache[id].bag) {
      var _ret4 = function () {
        // merged rule       
        // todo - test if any media rules in this merged rule, throw if so 
        if (cache[id].media) {
          throw new Error('cannot apply a media rule onto another');
        }
        var bag = cache[id].bag;

        var newId = (0, _hash2.default)(expr + id).toString(36);
        var label = hasLabels ? '*mq [' + cache[id].label + ']' : '';

        if (!cache[newId]) {
          var cssRules = Object.keys(bag).map(function (type) {
            return cssrule(newId, type, bag[type]);
          });
          appendSheetRule('@media ' + expr + ' { ' + cssRules.join('\n') + ' }');
          cache[newId] = { expr: expr, rule: rule, id: newId, label: label };
        }

        return {
          v: _defineProperty({}, 'data-css-' + newId, label)
        };
        // easy 
      }();

      if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
    } else if (cache[id].expr) {
      // media rule
      throw new Error('cannot apply a media rule onto another');
    } else {
      // simple rule
      var _newId = (0, _hash2.default)(expr + id).toString(36);
      var _label = hasLabels ? '*mq ' + (cache[id].style.label || '`' + id) : '';

      if (!cache[_newId]) {
        appendSheetRule('@media ' + expr + ' { ' + cssrule(_newId, cache[id].type, cache[id].style) + ' }');
        cache[_newId] = { expr: expr, rule: rule, id: _newId, label: _label };
      }

      return _defineProperty({}, 'data-css-' + _newId, _label);
      // easier 
    }
  } else {
    // a plain style 
    var _style3 = rule;
    var _newId2 = styleHash(expr, _style3);
    var _label2 = hasLabels ? '*mq ' + (_style3.label || '') : '';
    if (!cache[_newId2]) {
      appendSheetRule('@media ' + expr + ' { ' + cssrule(_newId2, '_', _style3) + ' }');
      cache[_newId2] = { expr: expr, style: _style3, id: _newId2, label: _label2 };
    }
    return _defineProperty({}, 'data-css-' + _newId2, _label2);
  }
}

var presets = exports.presets = {
  mobile: '(min-width: 400px)',
  phablet: '(min-width: 550px)',
  tablet: '(min-width: 750px)',
  desktop: '(min-width: 1000px)',
  hd: '(min-width: 1200px)'
};

/**** live media query labels ****/

// simplest implementation -
// cycle through the cache, and for every media query
// find matching elements and update the label 
function updateMediaQueryLabels() {
  Object.keys(cache).forEach(function (id) {
    var expr = cache[id].expr;

    if (expr && hasLabels && window.matchMedia) {
      (function () {
        var els = document.querySelectorAll('[data-css-' + id + ']');
        var match = window.matchMedia(expr).matches ? '✓' : '✕';
        var regex = /^(✓|✕|\*)mq/;
        [].concat(_toConsumableArray(els)).forEach(function (el) {
          return el.setAttribute('data-css-' + id, el.getAttribute('data-css-' + id).replace(regex, match + 'mq'));
        });
      })();
    }
  });
}

// saves a reference to the loop we trigger 
var interval = void 0;

function trackMediaQueryLabels() {
  var bool = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
  var period = arguments.length <= 1 || arguments[1] === undefined ? 2000 : arguments[1];

  if (bool) {
    if (interval) {
      console.warn('already tracking labels, call trackMediaQueryLabels(false) to stop'); // eslint-disable-line no-console 
      return;
    }
    interval = setInterval(function () {
      return updateMediaQueryLabels();
    }, period);
  } else {
    clearInterval(interval);
    interval = null;
  }
}

// in dev mode, start this up immediately 
if (isDev && isBrowser) {
  trackMediaQueryLabels(true);
  // todo - make sure hot loading isn't broken
  // todo - clearInterval on browser close  
}

// we don't go all out for fonts as much, giving a simple font loading strategy 
// use a fancier lib if you need moar power
function fontFace(font) {
  var id = (0, _hash2.default)(JSON.stringify(font)).toString(36);
  if (!cache[id]) {
    cache[id] = { id: id, family: font.fontFamily, font: font };
    // todo - crossbrowser 
    appendSheetRule('@font-face { ' + (0, _CSSPropertyOperations.createMarkupForStyles)(font) + '}');
  }
  return font.fontFamily;
}

// we can add keyframes in a similar manner, but still generating a unique name 
// for including in styles. this gives us modularity, but still a natural api 
function keyframes(name, kfs) {
  if (typeof name !== 'string') {
    kfs = name;
    name = 'animate';
  }
  var id = (0, _hash2.default)(name + JSON.stringify(kfs)).toString(36);
  if (!cache[id]) {
    (function () {
      cache[id] = { id: id, name: name, kfs: kfs };
      var inner = Object.keys(kfs).map(function (kf) {
        return kf + ' { ' + (0, _CSSPropertyOperations.createMarkupForStyles)(prefixes(kfs[kf])) + '}';
      }).join('\n');

      ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
        return appendSheetRule('@' + prefix + 'keyframes ' + (name + '_' + id) + ' { ' + inner + '}');
      });
    })();
  }
  return name + '_' + id;
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    rules[_key4] = arguments[_key4];
  }

  var ids = rules.reduce(function (o, r) {
    return o[idFor(r)] = true, o;
  }, {});
  var css = [].concat(_toConsumableArray(styleSheet.cssRules)).map(function (_ref5) {
    var cssText = _ref5.cssText;

    var regex = /\[data\-css\-([a-zA-Z0-9]+)\]/gm;
    var match = regex.exec(cssText);

    if (match && ids[match[1]]) {
      return cssText;
    }
  }).filter(function (x) {
    return !!x;
  }).join('\n');
  return css;
}

function attribsFor() {
  for (var _len5 = arguments.length, rules = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    rules[_key5] = arguments[_key5];
  }

  var htmlAttributes = rules.map(function (rule) {
    idFor(rule); // throwaway check for rule 
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ');

  return htmlAttributes;
}

/**** serverside stuff ****/

// the api's copied from aphrodite, with 1 key difference 
// we include *all* the css generated by the app 
// to optimize to only include generated styles on the pages 
// use renderStaticOptimized
function renderStatic(fn) {
  var optimized = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var html = fn();
  if (html === undefined) {
    throw new Error('did you forget to return from renderToString?');
  }
  var rules = [].concat(_toConsumableArray(styleSheet.cssRules)),
      css = rules.map(function (r) {
    return r.cssText;
  }).join('\n');
  if (optimized) {
    var _ret7 = function () {
      // parse out ids from html
      // reconstruct css/rules/cache to pass

      var o = { html: html, cache: {}, css: '' };
      var regex = /data\-css\-([a-zA-Z0-9]+)=/gm;
      var match = void 0,
          ids = [];
      while ((match = regex.exec(html)) !== null) {
        ids.push(match[1]);
      }
      ids.forEach(function (id) {
        o.cache[id] = cache[id];

        // todo - add fonts / animations
        o.css += rules.map(function (x) {
          return x.cssText;
        }).filter(function (r) {
          return new RegExp('\\[data-css-' + id + '\\]').test(r);
        }).join('\n') + '\n';
      });
      return {
        v: o
      };
    }();

    if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
  }
  return { html: html, cache: cache, css: css };
}

function renderStaticOptimized(fn) {
  return renderStatic(fn, true);
}

function rehydrate(c) {
  // load up cache
  cache = _extends({}, cache, c);
  // assume css loaded separately
}

},{"./CSSPropertyOperations.js":1,"./autoprefix":2,"./hash":3}]},{},[4])(4)
});