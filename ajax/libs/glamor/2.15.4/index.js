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
          (function () {
            var printWarning = function printWarning(format) {
              for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }

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
            };

            warning = function warning(condition, format) {
              if (format === undefined) {
                throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
              }

              if (format.indexOf('Failed Composite propType: ') === 0) {
                return; // Ignore CompositeComponent proptype check.
              }

              if (!condition) {
                for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                  args[_key2 - 2] = arguments[_key2];
                }

                printWarning.apply(undefined, [format].concat(args));
              }
            };
          })();
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
         * @providesModule ReactChildrenMutationWarningHook
         */

        'use strict';

        var ReactComponentTreeHook = _dereq_('./ReactComponentTreeHook');

        var warning = _dereq_('fbjs/lib/warning');

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
          if (!Array.isArray(element._shadowChildren) || isMutated) {
            "production" !== 'production' ? warning(false, 'Component\'s children should not be mutated.%s', ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
          }
        }

        var ReactChildrenMutationWarningHook = {
          onMountComponent: function onMountComponent(debugID) {
            handleElement(debugID, ReactComponentTreeHook.getElement(debugID));
          },
          onUpdateComponent: function onUpdateComponent(debugID) {
            handleElement(debugID, ReactComponentTreeHook.getElement(debugID));
          }
        };

        module.exports = ReactChildrenMutationWarningHook;
      }).call(this, _dereq_('_process'));
    }, { "./ReactComponentTreeHook": 17, "_process": 13, "fbjs/lib/warning": 12 }], 17: [function (_dereq_, module, exports) {
      (function (process) {
        /**
         * Copyright 2016-present, Facebook, Inc.
         * All rights reserved.
         *
         * This source code is licensed under the BSD-style license found in the
         * LICENSE file in the root directory of this source tree. An additional grant
         * of patent rights can be found in the PATENTS file in the same directory.
         *
         * @providesModule ReactComponentTreeHook
         */

        'use strict';

        var _prodInvariant = _dereq_('./reactProdInvariant');

        var ReactCurrentOwner = _dereq_('./ReactCurrentOwner');

        var invariant = _dereq_('fbjs/lib/invariant');
        var warning = _dereq_('fbjs/lib/warning');

        function isNative(fn) {
          // Based on isNative() from Lodash
          var funcToString = Function.prototype.toString;
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var reIsNative = RegExp('^' + funcToString
          // Take an example native function source for comparison
          .call(hasOwnProperty)
          // Strip regex characters so we can use it for regex
          .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
          // Remove hasOwnProperty from the template to make it generic
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
          try {
            var source = funcToString.call(fn);
            return reIsNative.test(source);
          } catch (err) {
            return false;
          }
        }

        var canUseCollections =
        // Array.from
        typeof Array.from === 'function' &&
        // Map
        typeof Map === 'function' && isNative(Map) &&
        // Map.prototype.keys
        Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
        // Set
        typeof Set === 'function' && isNative(Set) &&
        // Set.prototype.keys
        Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

        var itemMap;
        var rootIDSet;

        var itemByKey;
        var rootByKey;

        if (canUseCollections) {
          itemMap = new Map();
          rootIDSet = new Set();
        } else {
          itemByKey = {};
          rootByKey = {};
        }

        var unmountedIDs = [];

        // Use non-numeric keys to prevent V8 performance issues:
        // https://github.com/facebook/react/pull/7232
        function getKeyFromID(id) {
          return '.' + id;
        }
        function getIDFromKey(key) {
          return parseInt(key.substr(1), 10);
        }

        function get(id) {
          if (canUseCollections) {
            return itemMap.get(id);
          } else {
            var key = getKeyFromID(id);
            return itemByKey[key];
          }
        }

        function remove(id) {
          if (canUseCollections) {
            itemMap['delete'](id);
          } else {
            var key = getKeyFromID(id);
            delete itemByKey[key];
          }
        }

        function create(id, element, parentID) {
          var item = {
            element: element,
            parentID: parentID,
            text: null,
            childIDs: [],
            isMounted: false,
            updateCount: 0
          };

          if (canUseCollections) {
            itemMap.set(id, item);
          } else {
            var key = getKeyFromID(id);
            itemByKey[key] = item;
          }
        }

        function addRoot(id) {
          if (canUseCollections) {
            rootIDSet.add(id);
          } else {
            var key = getKeyFromID(id);
            rootByKey[key] = true;
          }
        }

        function removeRoot(id) {
          if (canUseCollections) {
            rootIDSet['delete'](id);
          } else {
            var key = getKeyFromID(id);
            delete rootByKey[key];
          }
        }

        function getRegisteredIDs() {
          if (canUseCollections) {
            return Array.from(itemMap.keys());
          } else {
            return Object.keys(itemByKey).map(getIDFromKey);
          }
        }

        function getRootIDs() {
          if (canUseCollections) {
            return Array.from(rootIDSet.keys());
          } else {
            return Object.keys(rootByKey).map(getIDFromKey);
          }
        }

        function purgeDeep(id) {
          var item = get(id);
          if (item) {
            var childIDs = item.childIDs;

            remove(id);
            childIDs.forEach(purgeDeep);
          }
        }

        function describeComponentFrame(name, source, ownerName) {
          return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
        }

        function _getDisplayName(element) {
          if (element == null) {
            return '#empty';
          } else if (typeof element === 'string' || typeof element === 'number') {
            return '#text';
          } else if (typeof element.type === 'string') {
            return element.type;
          } else {
            return element.type.displayName || element.type.name || 'Unknown';
          }
        }

        function describeID(id) {
          var name = ReactComponentTreeHook.getDisplayName(id);
          var element = ReactComponentTreeHook.getElement(id);
          var ownerID = ReactComponentTreeHook.getOwnerID(id);
          var ownerName;
          if (ownerID) {
            ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
          }
          "production" !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
          return describeComponentFrame(name, element && element._source, ownerName);
        }

        var ReactComponentTreeHook = {
          onSetChildren: function onSetChildren(id, nextChildIDs) {
            var item = get(id);
            item.childIDs = nextChildIDs;

            for (var i = 0; i < nextChildIDs.length; i++) {
              var nextChildID = nextChildIDs[i];
              var nextChild = get(nextChildID);
              !nextChild ? "production" !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
              !(nextChild.childIDs != null || _typeof(nextChild.element) !== 'object' || nextChild.element == null) ? "production" !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
              !nextChild.isMounted ? "production" !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
              if (nextChild.parentID == null) {
                nextChild.parentID = id;
                // TODO: This shouldn't be necessary but mounting a new root during in
                // componentWillMount currently causes not-yet-mounted components to
                // be purged from our tree data so their parent ID is missing.
              }
              !(nextChild.parentID === id) ? "production" !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
            }
          },
          onBeforeMountComponent: function onBeforeMountComponent(id, element, parentID) {
            create(id, element, parentID);
          },
          onBeforeUpdateComponent: function onBeforeUpdateComponent(id, element) {
            var item = get(id);
            if (!item || !item.isMounted) {
              // We may end up here as a result of setState() in componentWillUnmount().
              // In this case, ignore the element.
              return;
            }
            item.element = element;
          },
          onMountComponent: function onMountComponent(id) {
            var item = get(id);
            item.isMounted = true;
            var isRoot = item.parentID === 0;
            if (isRoot) {
              addRoot(id);
            }
          },
          onUpdateComponent: function onUpdateComponent(id) {
            var item = get(id);
            if (!item || !item.isMounted) {
              // We may end up here as a result of setState() in componentWillUnmount().
              // In this case, ignore the element.
              return;
            }
            item.updateCount++;
          },
          onUnmountComponent: function onUnmountComponent(id) {
            var item = get(id);
            if (item) {
              // We need to check if it exists.
              // `item` might not exist if it is inside an error boundary, and a sibling
              // error boundary child threw while mounting. Then this instance never
              // got a chance to mount, but it still gets an unmounting event during
              // the error boundary cleanup.
              item.isMounted = false;
              var isRoot = item.parentID === 0;
              if (isRoot) {
                removeRoot(id);
              }
            }
            unmountedIDs.push(id);
          },
          purgeUnmountedComponents: function purgeUnmountedComponents() {
            if (ReactComponentTreeHook._preventPurging) {
              // Should only be used for testing.
              return;
            }

            for (var i = 0; i < unmountedIDs.length; i++) {
              var id = unmountedIDs[i];
              purgeDeep(id);
            }
            unmountedIDs.length = 0;
          },
          isMounted: function isMounted(id) {
            var item = get(id);
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

            info += ReactComponentTreeHook.getStackAddendumByID(id);
            return info;
          },
          getStackAddendumByID: function getStackAddendumByID(id) {
            var info = '';
            while (id) {
              info += describeID(id);
              id = ReactComponentTreeHook.getParentID(id);
            }
            return info;
          },
          getChildIDs: function getChildIDs(id) {
            var item = get(id);
            return item ? item.childIDs : [];
          },
          getDisplayName: function getDisplayName(id) {
            var element = ReactComponentTreeHook.getElement(id);
            if (!element) {
              return null;
            }
            return _getDisplayName(element);
          },
          getElement: function getElement(id) {
            var item = get(id);
            return item ? item.element : null;
          },
          getOwnerID: function getOwnerID(id) {
            var element = ReactComponentTreeHook.getElement(id);
            if (!element || !element._owner) {
              return null;
            }
            return element._owner._debugID;
          },
          getParentID: function getParentID(id) {
            var item = get(id);
            return item ? item.parentID : null;
          },
          getSource: function getSource(id) {
            var item = get(id);
            var element = item ? item.element : null;
            var source = element != null ? element._source : null;
            return source;
          },
          getText: function getText(id) {
            var element = ReactComponentTreeHook.getElement(id);
            if (typeof element === 'string') {
              return element;
            } else if (typeof element === 'number') {
              return '' + element;
            } else {
              return null;
            }
          },
          getUpdateCount: function getUpdateCount(id) {
            var item = get(id);
            return item ? item.updateCount : 0;
          },

          getRegisteredIDs: getRegisteredIDs,

          getRootIDs: getRootIDs
        };

        module.exports = ReactComponentTreeHook;
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

        var ReactInvalidSetStateWarningHook = _dereq_('./ReactInvalidSetStateWarningHook');
        var ReactHostOperationHistoryHook = _dereq_('./ReactHostOperationHistoryHook');
        var ReactComponentTreeHook = _dereq_('./ReactComponentTreeHook');
        var ReactChildrenMutationWarningHook = _dereq_('./ReactChildrenMutationWarningHook');
        var ExecutionEnvironment = _dereq_('fbjs/lib/ExecutionEnvironment');

        var performanceNow = _dereq_('fbjs/lib/performanceNow');
        var warning = _dereq_('fbjs/lib/warning');

        var hooks = [];
        var didHookThrowForEvent = {};

        function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
          try {
            fn.call(context, arg1, arg2, arg3, arg4, arg5);
          } catch (e) {
            "production" !== 'production' ? warning(didHookThrowForEvent[event], 'Exception thrown by hook while handling %s: %s', event, e + '\n' + e.stack) : void 0;
            didHookThrowForEvent[event] = true;
          }
        }

        function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
          for (var i = 0; i < hooks.length; i++) {
            var hook = hooks[i];
            var fn = hook[event];
            if (fn) {
              callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
            }
          }
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
          ReactComponentTreeHook.purgeUnmountedComponents();
          ReactHostOperationHistoryHook.clearHistory();
        }

        function getTreeSnapshot(registeredIDs) {
          return registeredIDs.reduce(function (tree, id) {
            var ownerID = ReactComponentTreeHook.getOwnerID(id);
            var parentID = ReactComponentTreeHook.getParentID(id);
            tree[id] = {
              displayName: ReactComponentTreeHook.getDisplayName(id),
              text: ReactComponentTreeHook.getText(id),
              updateCount: ReactComponentTreeHook.getUpdateCount(id),
              childIDs: ReactComponentTreeHook.getChildIDs(id),
              // Text nodes don't have owners but this is close enough.
              ownerID: ownerID || ReactComponentTreeHook.getOwnerID(parentID),
              parentID: parentID
            };
            return tree;
          }, {});
        }

        function resetMeasurements() {
          var previousStartTime = currentFlushStartTime;
          var previousMeasurements = currentFlushMeasurements || [];
          var previousOperations = ReactHostOperationHistoryHook.getHistory();

          if (currentFlushNesting === 0) {
            currentFlushStartTime = null;
            currentFlushMeasurements = null;
            clearHistory();
            return;
          }

          if (previousMeasurements.length || previousOperations.length) {
            var registeredIDs = ReactComponentTreeHook.getRegisteredIDs();
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
          var allowRoot = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          if (allowRoot && debugID === 0) {
            return;
          }
          if (!debugID) {
            "production" !== 'production' ? warning(false, 'ReactDebugTool: debugID may not be empty.') : void 0;
          }
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
          addHook: function addHook(hook) {
            hooks.push(hook);
          },
          removeHook: function removeHook(hook) {
            for (var i = 0; i < hooks.length; i++) {
              if (hooks[i] === hook) {
                hooks.splice(i, 1);
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
            ReactDebugTool.addHook(ReactHostOperationHistoryHook);
          },
          endProfiling: function endProfiling() {
            if (!_isProfiling) {
              return;
            }

            _isProfiling = false;
            resetMeasurements();
            ReactDebugTool.removeHook(ReactHostOperationHistoryHook);
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
          onSetState: function onSetState() {
            emitEvent('onSetState');
          },
          onSetChildren: function onSetChildren(debugID, childDebugIDs) {
            checkDebugID(debugID);
            childDebugIDs.forEach(checkDebugID);
            emitEvent('onSetChildren', debugID, childDebugIDs);
          },
          onBeforeMountComponent: function onBeforeMountComponent(debugID, element, parentDebugID) {
            checkDebugID(debugID);
            checkDebugID(parentDebugID, true);
            emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
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
          onBeforeUnmountComponent: function onBeforeUnmountComponent(debugID) {
            checkDebugID(debugID);
            emitEvent('onBeforeUnmountComponent', debugID);
          },
          onUnmountComponent: function onUnmountComponent(debugID) {
            checkDebugID(debugID);
            emitEvent('onUnmountComponent', debugID);
          },
          onTestEvent: function onTestEvent() {
            emitEvent('onTestEvent');
          }
        };

        // TODO remove these when RN/www gets updated
        ReactDebugTool.addDevtool = ReactDebugTool.addHook;
        ReactDebugTool.removeDevtool = ReactDebugTool.removeHook;

        ReactDebugTool.addHook(ReactInvalidSetStateWarningHook);
        ReactDebugTool.addHook(ReactComponentTreeHook);
        ReactDebugTool.addHook(ReactChildrenMutationWarningHook);
        var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
        if (/[?&]react_perf\b/.test(url)) {
          ReactDebugTool.beginProfiling();
        }

        module.exports = ReactDebugTool;
      }).call(this, _dereq_('_process'));
    }, { "./ReactChildrenMutationWarningHook": 16, "./ReactComponentTreeHook": 17, "./ReactHostOperationHistoryHook": 20, "./ReactInvalidSetStateWarningHook": 22, "_process": 13, "fbjs/lib/ExecutionEnvironment": 2, "fbjs/lib/performanceNow": 11, "fbjs/lib/warning": 12 }], 20: [function (_dereq_, module, exports) {
      /**
       * Copyright 2016-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @providesModule ReactHostOperationHistoryHook
       */

      'use strict';

      var history = [];

      var ReactHostOperationHistoryHook = {
        onHostOperation: function onHostOperation(debugID, type, payload) {
          history.push({
            instanceID: debugID,
            type: type,
            payload: payload
          });
        },
        clearHistory: function clearHistory() {
          if (ReactHostOperationHistoryHook._preventClearing) {
            // Should only be used for tests.
            return;
          }

          history = [];
        },
        getHistory: function getHistory() {
          return history;
        }
      };

      module.exports = ReactHostOperationHistoryHook;
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
         * @providesModule ReactInvalidSetStateWarningHook
         */

        'use strict';

        var warning = _dereq_('fbjs/lib/warning');

        if ("production" !== 'production') {
          var processingChildContext = false;

          var warnInvalidSetState = function warnInvalidSetState() {
            "production" !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
          };
        }

        var ReactInvalidSetStateWarningHook = {
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

        module.exports = ReactInvalidSetStateWarningHook;
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// forked from https://www.npmjs.com/package/auto-prefixer

function capitalize(str) {
  return str && str.charAt(0).toUpperCase() + str.substring(1);
}

function includes(obj, search) {
  if (typeof obj === 'number') {
    obj = obj.toString();
  }
  return obj.indexOf(search) !== -1;
}

function values(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

var webkitPrefix = 'Webkit';
var mozPrefix = 'Moz';
var msPrefix = 'ms';
var oPrefix = 'o';

var webkit = [webkitPrefix];
var webkitO = [webkitPrefix, oPrefix];
var moz = [mozPrefix];
var ms = [msPrefix];

var webkitMoz = [webkitPrefix, mozPrefix];
var webkitMozO = [webkitPrefix, mozPrefix, oPrefix];
var webkitMozMs = [webkitPrefix, mozPrefix, msPrefix];
var webkitMs = [webkitPrefix, msPrefix];
var allPrefixes = [webkitPrefix, msPrefix, mozPrefix, oPrefix];

var neededRules = {
  alignContent: webkit,
  alignItems: webkit,
  alignSelf: webkit,
  animation: webkitMoz,
  animationDelay: webkitMoz,
  animationDirection: webkitMoz,
  animationDuration: webkitMoz,
  animationFillMode: webkitMoz,
  animationIterationCount: webkitMoz,
  animationName: webkitMoz,
  animationPlayState: webkitMoz,
  animationTimingFunction: webkitMoz,
  appearance: webkitMoz,
  backfaceVisibility: webkitMoz,
  backgroundClip: webkit,
  borderImage: webkitMozO,
  borderImageSlice: webkitMozO,
  boxShadow: webkitMozMs,
  boxSizing: webkitMoz,
  clipPath: webkit,
  columns: webkitMoz,
  cursor: webkitMoz,
  flex: webkitMs, //new flex and 2012 specification , no support for old specification
  flexBasis: webkitMs,
  flexDirection: webkitMs,
  flexFlow: webkitMs,
  flexGrow: webkitMs,
  flexShrink: webkitMs,
  flexWrap: webkitMs,
  fontSmoothing: webkitMoz,
  justifyContent: webkitMoz,
  order: webkitMoz,
  perspective: webkitMoz,
  perspectiveOrigin: webkitMoz,
  transform: webkitMozMs,
  transformOrigin: webkitMozMs,
  transformOriginX: webkitMozMs,
  transformOriginY: webkitMozMs,
  transformOriginZ: webkitMozMs,
  transformStyle: webkitMozMs,
  transition: webkitMozMs,
  transitionDelay: webkitMozMs,
  transitionDuration: webkitMozMs,
  transitionProperty: webkitMozMs,
  transitionTimingFunction: webkitMozMs,
  userSelect: webkitMozMs
};

var neededCssValues = {
  calc: webkitMoz,
  flex: webkitMs
};

var clientPrefix = function () {
  if (typeof navigator === 'undefined') {
    //in server rendering
    return allPrefixes; //also default when not passing true to 'all vendors' explicitly
  }
  var sUsrAg = navigator.userAgent;

  if (includes(sUsrAg, 'Chrome')) {
    return webkit;
  } else if (includes(sUsrAg, 'Safari')) {
    return webkit;
  } else if (includes(sUsrAg, 'Opera')) {
    return webkitO;
  } else if (includes(sUsrAg, 'Firefox')) {
    return moz;
  } else if (includes(sUsrAg, 'MSIE')) {
    return ms;
  }

  return [];
}();

function checkAndAddPrefix(styleObj, key, val, allVendors) {
  var oldFlex = true;

  function valueWithPrefix(cssVal, prefix) {
    return includes(val, cssVal) && (allVendors || includes(clientPrefix, prefix)) ? val.replace(cssVal, ['', prefix.toLowerCase(), cssVal].join('-')) : null;
    //example return -> 'transition: -webkit-transition'
  }

  function createObjectOfValuesWithPrefixes(cssVal) {
    return neededCssValues[cssVal].reduce(function (o, v) {
      o[v.toLowerCase()] = valueWithPrefix(cssVal, v);
      return o;
    }, {});
    //example return -> {webkit: -webkit-calc(10% - 1px), moz: -moz-calc(10% - 1px)}
  }

  function composePrefixedValues(objOfPrefixedValues) {
    var composed = values(objOfPrefixedValues).filter(function (str) {
      return str !== null;
    }).map(function (str) {
      return key + ':' + str;
    }).join(';');

    if (composed) {
      styleObj[key] = styleObj[key] + ';' + composed;
    }
    //example do -> {display: "flex;display:-webkit-flex;display:-ms-flexbox"}
  }

  function valWithoutFlex() {
    return val.replace('flex-', '').toLowerCase();
  }

  if (val === 'flex' && key === 'display') {

    var flex = createObjectOfValuesWithPrefixes('flex');
    if (flex.ms) {
      flex.ms = flex.ms.replace('flex', 'flexbox');
    } //special case

    composePrefixedValues(flex);
    //if(oldFlex){styleObj[key] = styleObj[key] + ';display:-webkit-box'; }
    if (oldFlex) {
      styleObj[key] = '-webkit-box;display:' + styleObj[key];
    }

    //display:flex is simple case, no need for other checks
    return styleObj;
  }

  var allPrefixedCssValues = Object.keys(neededCssValues).filter(function (c) {
    return c !== 'flex';
  }).reduce(function (o, c) {
    o[c] = createObjectOfValuesWithPrefixes(c);
    return o;
  }, {});
  /*
   example allPrefixedCssValues = {
   calc: {
   webkit: "translateX(-webkit-calc(10% - 10px))",
   moz: "translateX(-moz-calc(10% - 10px))"
   },
   flex: {
   ms: null,
   webkit: null
   }
   };*/

  //if(includes(val, 'gradient')){
  //
  //}

  if (neededRules[key]) {

    var prefixes = allVendors ? neededRules[key] : neededRules[key].filter(function (vendor) {
      return includes(clientPrefix, vendor);
    });

    var prefixedProperties = prefixes.reduce(function (obj, prefix) {
      var property = val;

      //add valueWithPrefixes in their position and null the property
      Object.keys(allPrefixedCssValues).forEach(function (cssKey) {
        var cssVal = allPrefixedCssValues[cssKey];
        Object.keys(cssVal).forEach(function (vendor) {
          if (cssVal[vendor] && capitalize(prefix) === capitalize(vendor)) {
            property = cssVal[vendor];
            cssVal[vendor] = null;
          }
        });
      });

      obj[prefix + capitalize(key)] = property;
      return obj;
    }, {});

    if (oldFlex) {
      switch (key) {
        case 'flexDirection':
          if (includes(val, 'reverse')) {
            prefixedProperties.WebkitBoxDirection = 'reverse';
          } else {
            prefixedProperties.WebkitBoxDirection = 'normal';
          }
          if (includes(val, 'row')) {
            prefixedProperties.WebkitBoxOrient = prefixedProperties.boxOrient = 'horizontal';
          } else if (includes(val, 'column')) {
            prefixedProperties.WebkitBoxOrient = 'vertical';
          }
          break;
        case 'alignSelf':
          prefixedProperties.msFlexItemAlign = valWithoutFlex();break;
        case 'alignItems':
          prefixedProperties.WebkitBoxAlign = prefixedProperties.msFlexAlign = valWithoutFlex();break;
        case 'alignContent':
          if (val === 'spaceAround') {
            prefixedProperties.msFlexLinePack = 'distribute';
          } else if (val === 'spaceBetween') {
            prefixedProperties.msFlexLinePack = 'justify';
          } else {
            prefixedProperties.msFlexLinePack = valWithoutFlex();
          }
          break;
        case 'justifyContent':
          if (val === 'spaceAround') {
            prefixedProperties.msFlexPack = 'distribute';
          } else if (val === 'spaceBetween') {
            prefixedProperties.WebkitBoxPack = prefixedProperties.msFlexPack = 'justify';
          } else {
            prefixedProperties.WebkitBoxPack = prefixedProperties.msFlexPack = valWithoutFlex();
          }
          break;
        case 'flexBasis':
          prefixedProperties.msFlexPreferredSize = val;break;
        case 'order':
          prefixedProperties.msFlexOrder = '-moz-calc(' + val + ')'; //ugly hack to prevent react from adding 'px'
          prefixedProperties.WebkitBoxOrdinalGroup = '-webkit-calc(' + (parseInt(val) + 1) + ')'; //this might not work for browsers who don't support calc
          break;
        case 'flexGrow':
          prefixedProperties.WebkitBoxFlex = prefixedProperties.msFlexPositive = val;break;
        case 'flexShrink':
          prefixedProperties.msFlexNegative = val;break;
        case 'flex':
          prefixedProperties.WebkitBoxFlex = val;break;
      }
    }

    Object.assign(styleObj, prefixedProperties);
  }

  //if valueWithPrefixes were not added before
  Object.keys(allPrefixedCssValues).forEach(function (cssKey) {
    composePrefixedValues(allPrefixedCssValues[cssKey]);
  });
  return styleObj;
}

function autoPrefixer(obj, allVendors) {
  Object.keys(obj).forEach(function (key) {
    return obj = checkAndAddPrefix(_extends({}, obj), key, obj[key], allVendors);
  });
  return obj;
}

function gate(objOrBool) {
  var optionalBoolean = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


  if (typeof objOrBool === 'boolean') {
    return function (obj) {
      return autoPrefixer(obj, objOrBool);
    };
  }
  if (!objOrBool) {
    return {};
  } else {
    return autoPrefixer(objOrBool, optionalBoolean);
  } // default: don't include all browsers
}

var autoprefix = exports.autoprefix = gate(true);

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
exports.presets = exports.compose = exports.$ = exports.plugins = exports.styleSheet = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.speedy = speedy;
exports.simulations = simulations;
exports.simulate = simulate;
exports.cssLabels = cssLabels;
exports.isLikeRule = isLikeRule;
exports.idFor = idFor;
exports.insertRule = insertRule;
exports.rehydrate = rehydrate;
exports.flush = flush;
exports.style = style;
exports.select = select;
exports.parent = parent;
exports.merge = merge;
exports.media = media;
exports.trackMediaQueryLabels = trackMediaQueryLabels;
exports.pseudo = pseudo;
exports.active = active;
exports.any = any;
exports.checked = checked;
exports.disabled = disabled;
exports.empty = empty;
exports.enabled = enabled;
exports._default = _default;
exports.first = first;
exports.firstChild = firstChild;
exports.firstOfType = firstOfType;
exports.fullscreen = fullscreen;
exports.focus = focus;
exports.hover = hover;
exports.indeterminate = indeterminate;
exports.inRange = inRange;
exports.invalid = invalid;
exports.lastChild = lastChild;
exports.lastOfType = lastOfType;
exports.left = left;
exports.link = link;
exports.onlyChild = onlyChild;
exports.onlyOfType = onlyOfType;
exports.optional = optional;
exports.outOfRange = outOfRange;
exports.readOnly = readOnly;
exports.readWrite = readWrite;
exports.required = required;
exports.right = right;
exports.root = root;
exports.scope = scope;
exports.target = target;
exports.valid = valid;
exports.visited = visited;
exports.dir = dir;
exports.lang = lang;
exports.not = not;
exports.nthChild = nthChild;
exports.nthLastChild = nthLastChild;
exports.nthLastOfType = nthLastOfType;
exports.nthOfType = nthOfType;
exports.after = after;
exports.before = before;
exports.firstLetter = firstLetter;
exports.firstLine = firstLine;
exports.selection = selection;
exports.backdrop = backdrop;
exports.placeholder = placeholder;
exports.keyframes = keyframes;
exports.fontFace = fontFace;
exports.cssFor = cssFor;
exports.attribsFor = attribsFor;

var _sheet = require('./sheet.js');

var _CSSPropertyOperations = require('./CSSPropertyOperations.js');

var _plugins = require('./plugins');

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**** stylesheet  ****/

var styleSheet = exports.styleSheet = new _sheet.StyleSheet();
// an isomorphic StyleSheet shim. hides all the nitty gritty. 

// /**************** LIFTOFF IN 3... 2... 1... ****************/
styleSheet.inject(); //eslint-disable-line indent
// /****************      TO THE MOOOOOOON     ****************/

// conveneience function to toggle speedy
function speedy(bool) {
  return styleSheet.speedy(bool);
}

// plugins 
// we include these by default 
var plugins = exports.plugins = styleSheet.plugins = new _plugins.PluginSet(_plugins.fallbacks, _plugins.bug20fix, _plugins.prefixes);
plugins.media = new _plugins.PluginSet(); // neat! media, font-face, keyframes
plugins.fontFace = new _plugins.PluginSet();
plugins.keyframes = new _plugins.PluginSet(_plugins.prefixes);

// define some constants 
var isBrowser = typeof document !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("production");
var isTest = "production" === 'test';

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
// *shouldn't* have to mess with this manually
var hasLabels = isDev;

function cssLabels(bool) {
  hasLabels = !!bool;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// flatten a nested array 
function flatten() {
  var arr = [];

  for (var _len2 = arguments.length, els = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    els[_key2] = arguments[_key2];
  }

  for (var i = 0; i < els.length; i++) {
    if (Array.isArray(els[i])) arr = arr.concat(flatten.apply(undefined, _toConsumableArray(els[i])));else arr = arr.concat(els[i]);
  }
  return arr;
}

// hashes a string to something 'unique'
// we use this to generate ids for styles

function hashify() {
  for (var _len3 = arguments.length, objs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    objs[_key3] = arguments[_key3];
  }

  return (0, _hash2.default)(objs.map(function (x) {
    return JSON.stringify(x);
  }).join('')).toString(36);
}

// of shape { 'data-css-<id>': ''}
function isLikeRule(rule) {
  if (Object.keys(rule).length !== 1) {
    return false;
  }
  return !!/data\-css\-([a-zA-Z0-9]+)/.exec(Object.keys(rule)[0]);
}

// extracts id from a { 'data-css-<id>': ''} like object 
function idFor(rule) {
  if (Object.keys(rule).length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9]+)/;
  var match = regex.exec(Object.keys(rule)[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

// a simple cache to store generated rules 
var registered = {};
function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec;
  }
}

// semi-deeply merge 2 'mega' style objects 
function deepMergeStyles(dest, src) {
  Object.keys(src).forEach(function (expr) {
    dest[expr] = dest[expr] || {};
    Object.keys(src[expr]).forEach(function (type) {
      dest[expr][type] = dest[expr][type] || {};
      Object.assign(dest[expr][type], src[expr][type]);
    });
  });
}

// extracts and composes styles from a rule into a 'mega' style
// with sub styles keyed by media query + 'path'
function extractStyles() {
  for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    rules[_key4] = arguments[_key4];
  }

  rules = flatten(rules);
  var exprs = {};

  // converts {[data-css-<id>]} to the backing rule 
  rules.forEach(function (rule) {
    // avoid possible label. todo - cleaner 
    if (typeof rule === 'string') {
      return;
    }
    if (isLikeRule(rule)) {
      rule = registered[idFor(rule)];
    }
    switch (rule.type) {
      case 'raw':
      case 'font-face':
      case 'keyframes':
        throw new Error('not implemented');

      case 'merge':
        return deepMergeStyles(exprs, extractStyles(rule.rules));

      case 'pseudo':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '%%%' + rule.selector, rule.style) });
      case 'select':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '^^^' + rule.selector, rule.style) });
      case 'parent':
        return deepMergeStyles(exprs, { _: _defineProperty({}, '***' + rule.selector, rule.style) });

      case 'style':
        return deepMergeStyles(exprs, { _: { _: rule.style } });

      case 'media':
        return deepMergeStyles(exprs, _defineProperty({}, rule.expr, extractStyles(rule.rules)._));

      default:
        return deepMergeStyles(exprs, { _: { _: rule } });
    }
  });
  return exprs;
}

// extract label from a rule / style 
function extractLabel(rule) {
  if (isLikeRule(rule)) {
    rule = registered[idFor(rule)];
  }
  return rule.label || '{:}';
}

// given an id / 'path', generate a css selector 
function selector(id, path) {
  if (path === '_') return '[data-css-' + id + ']';

  if (path.indexOf('%%%') === 0) {
    var x = '[data-css-' + id + ']' + path.slice(3);
    if (canSimulate) x += ', [data-css-' + id + '][data-simulate-' + simple(path) + ']';
    return x;
  }

  if (path.indexOf('***') === 0) {
    return path.slice(3).split(',').map(function (x) {
      return x + ' [data-css-' + id + ']';
    }).join(',');
  }
  if (path.indexOf('^^^') === 0) {
    return path.slice(3).split(',').map(function (x) {
      return '[data-css-' + id + ']' + x;
    }).join(',');
  }
}

function toCSS(_ref4) {
  var selector = _ref4.selector;
  var style = _ref4.style;

  var result = plugins.transform({ selector: selector, style: style });
  return result.selector + ' { ' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + ' }';
}

function ruleToAst(rule) {
  var styles = extractStyles(rule);
  return Object.keys(styles).reduce(function (o, expr) {
    o[expr] = Object.keys(styles[expr]).map(function (s) {
      return { selector: selector(rule.id, s), style: styles[expr][s] };
    });
    return o;
  }, {});
}

function ruleToCSS(spec) {
  var css = [];
  var ast = ruleToAst(spec);
  // plugins here 
  var _ = ast._;

  var exprs = _objectWithoutProperties(ast, ['_']);

  if (_) {
    _.map(toCSS).forEach(function (str) {
      return css.push(str);
    });
  }
  Object.keys(exprs).forEach(function (expr) {
    css.push('@media ' + expr + '{\n      ' + exprs[expr].map(toCSS).join('\n\t') + '\n    }');
  });
  return css;
}

// this cache to track which rules have 
// been inserted into the stylesheet
var inserted = styleSheet.inserted = {};

// and helpers to insert rules into said styleSheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true;
    ruleToCSS(spec).map(function (cssRule) {
      return styleSheet.insert(cssRule);
    });
  }
}

function insertRule(css) {
  var spec = {
    id: hashify(css),
    css: css,
    type: 'raw',
    label: '^'
  };
  register(spec);
  if (!inserted[spec.id]) {
    styleSheet.insert(spec.css);
    inserted[spec.id] = true;
  }
}

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    (function () {
      var inner = Object.keys(spec.keyframes).map(function (kf) {
        var result = plugins.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
        return result.name + ' { ' + (0, _CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
      }).join('\n');

      ['-webkit-', '-moz-', '-o-', ''].forEach(function (prefix) {
        return styleSheet.insert('@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + ' { ' + inner + '}');
      });

      inserted[spec.id] = true;
    })();
  }
}

function insertFontFace(spec) {
  if (!inserted[spec.id]) {
    styleSheet.insert('@font-face { ' + (0, _CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}');
    inserted[spec.id] = true;
  }
}

// rehydrate the insertion cache with ids sent from 
// renderStatic / renderStaticOptimized 
function rehydrate(ids) {
  // load up ids
  Object.assign(inserted, ids.reduce(function (o, i) {
    return o[i] = true, o;
  }, {}));
  // assume css loaded separately
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR. 

function flush() {
  inserted = styleSheet.inserted = {};
  registered = {};
  styleSheet.flush();
  styleSheet.inject();
}

function filterStyle(style) {
  var acc = {},
      keys = Object.keys(style),
      hasFalsy = false;
  for (var i = 0; i < keys.length; i++) {
    var value = style[keys[i]];
    if (value !== false && value !== null && value !== undefined) {
      acc[keys[i]] = value;
    } else {
      hasFalsy = true;
    }
  }
  return hasFalsy ? acc : style;
}

function toRule(spec) {
  register(spec);
  insert(spec);
  return _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
}

function style(obj) {
  var filtered = filterStyle(obj);
  return toRule({
    id: hashify(filtered),
    type: 'style',
    style: filtered,
    label: filtered.label || '*'
  });
}

// unique feature 
// when you need to define 'real' css (whatever that may be)
// https://twitter.com/threepointone/status/756585907877273600
// https://twitter.com/threepointone/status/756986938033254400
function select(selector, obj) {
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
    return style(selector);
  }
  var filtered = filterStyle(obj);
  return toRule({
    id: hashify(selector, filtered),
    type: 'select',
    selector: selector,
    style: filtered,
    label: filtered.label || '*'
  });
}

var $ = exports.$ = select; // bringin' jquery back

function parent(selector, obj) {
  var filtered = filterStyle(obj);
  return toRule({
    id: hashify(selector, filtered),
    type: 'parent',
    selector: selector,
    style: filtered,
    label: filtered.label || '*'
  });
}

// we define a function to 'merge' styles together.
// backstory - because of a browser quirk, multiple styles are applied in the order they're 
// defined in the stylesheet, not in the order of application 
// in most cases, this won't case an issue UNTIL IT DOES 
// instead, use merge() to merge styles,
// with latter styles gaining precedence over former ones 

function merge() {
  for (var _len5 = arguments.length, rules = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    rules[_key5] = arguments[_key5];
  }

  return toRule({
    id: hashify(extractStyles(rules)),
    type: 'merge',
    rules: rules,
    label: '[' + (typeof rules[0] === 'string' ? rules[0] : rules.map(extractLabel).join(' + ')) + ']'
  });
}

var compose = exports.compose = merge;

function media(expr) {
  for (var _len6 = arguments.length, rules = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    rules[_key6 - 1] = arguments[_key6];
  }

  return toRule({
    id: hashify(expr, extractStyles(rules)),
    type: 'media',
    rules: rules,
    expr: expr,
    label: '*mq(' + rules.map(extractLabel).join(' + ') + ')'
  });
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
  Object.keys(registered).forEach(function (id) {
    var expr = registered[id].expr;

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

function pseudo(selector, obj) {
  var filtered = filterStyle(obj);
  return toRule({
    id: hashify(selector, filtered),
    type: 'pseudo',
    selector: selector,
    style: filtered,
    label: filtered.label || ':*'
  });
}

// allllll the pseudoclasses

function active(x) {
  return pseudo(':active', x);
}

function any(x) {
  return pseudo(':any', x);
}

function checked(x) {
  return pseudo(':checked', x);
}

function disabled(x) {
  return pseudo(':disabled', x);
}

function empty(x) {
  return pseudo(':empty', x);
}

function enabled(x) {
  return pseudo(':enabled', x);
}

function _default(x) {
  return pseudo(':default', x); // note '_default' name  
}

function first(x) {
  return pseudo(':first', x);
}

function firstChild(x) {
  return pseudo(':first-child', x);
}

function firstOfType(x) {
  return pseudo(':first-of-type', x);
}

function fullscreen(x) {
  return pseudo(':fullscreen', x);
}

function focus(x) {
  return pseudo(':focus', x);
}

function hover(x) {
  return pseudo(':hover', x);
}

function indeterminate(x) {
  return pseudo(':indeterminate', x);
}

function inRange(x) {
  return pseudo(':in-range', x);
}

function invalid(x) {
  return pseudo(':invalid', x);
}

function lastChild(x) {
  return pseudo(':last-child', x);
}

function lastOfType(x) {
  return pseudo(':last-of-type', x);
}

function left(x) {
  return pseudo(':left', x);
}

function link(x) {
  return pseudo(':link', x);
}

function onlyChild(x) {
  return pseudo(':only-child', x);
}

function onlyOfType(x) {
  return pseudo(':only-of-type', x);
}

function optional(x) {
  return pseudo(':optional', x);
}

function outOfRange(x) {
  return pseudo(':out-of-range', x);
}

function readOnly(x) {
  return pseudo(':read-only', x);
}

function readWrite(x) {
  return pseudo(':read-write', x);
}

function required(x) {
  return pseudo(':required', x);
}

function right(x) {
  return pseudo(':right', x);
}

function root(x) {
  return pseudo(':root', x);
}

function scope(x) {
  return pseudo(':scope', x);
}

function target(x) {
  return pseudo(':target', x);
}

function valid(x) {
  return pseudo(':valid', x);
}

function visited(x) {
  return pseudo(':visited', x);
}

// parameterized pseudoclasses
function dir(p, x) {
  return pseudo(':dir(' + p + ')', x);
}
function lang(p, x) {
  return pseudo(':lang(' + p + ')', x);
}
function not(p, x) {
  // should this be a plugin?
  var selector = p.split(',').map(function (x) {
    return x.trim();
  }).map(function (x) {
    return ':not(' + x + ')';
  });
  if (selector.length === 1) {
    return pseudo(':not(' + p + ')', x);
  }
  return select(selector.join(''), x);
}
function nthChild(p, x) {
  return pseudo(':nth-child(' + p + ')', x);
}
function nthLastChild(p, x) {
  return pseudo(':nth-last-child(' + p + ')', x);
}
function nthLastOfType(p, x) {
  return pseudo(':nth-last-of-type(' + p + ')', x);
}
function nthOfType(p, x) {
  return pseudo(':nth-of-type(' + p + ')', x);
}

// pseudoelements
function after(x) {
  return pseudo('::after', x);
}
function before(x) {
  return pseudo('::before', x);
}
function firstLetter(x) {
  return pseudo('::first-letter', x);
}
function firstLine(x) {
  return pseudo('::first-line', x);
}
function selection(x) {
  return pseudo('::selection', x);
}
function backdrop(x) {
  return pseudo('::backdrop', x);
}
function placeholder(x) {
  // https://github.com/threepointone/glamor/issues/14
  return merge(pseudo('::placeholder', x), pseudo('::-webkit-input-placeholder', x), pseudo('::-moz-placeholder', x), pseudo('::-ms-input-placeholder', x));
}

// we can add keyframes in a similar manner, but still generating a unique name 
// for including in styles. this gives us modularity, but still a natural api 
function keyframes(name, kfs) {
  if (!kfs) {
    kfs = name, name = 'animation';
  }

  var spec = {
    id: hashify(name, kfs),
    type: 'keyframes',
    name: name,
    keyframes: kfs
  };
  register(spec);
  insertKeyframe(spec);
  return name + '_' + spec.id;
}

// we don't go all out for fonts as much, giving a simple font loading strategy 
// use a fancier lib if you need moar power
function fontFace(font) {
  var spec = {
    id: hashify(font),
    type: 'font-face',
    font: font
  };
  register(spec);
  insertFontFace(spec);

  return font.fontFamily;
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    rules[_key7] = arguments[_key7];
  }

  return flatten(rules.map(function (r) {
    return registered[idFor(r)];
  }).map(ruleToCSS)).join('\n');
}

function attribsFor() {
  for (var _len8 = arguments.length, rules = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    rules[_key8] = arguments[_key8];
  }

  var htmlAttributes = rules.map(function (rule) {
    idFor(rule); // throwaway check for rule 
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ');

  return htmlAttributes;
}

},{"./CSSPropertyOperations.js":1,"./hash":3,"./plugins":5,"./sheet.js":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginSet = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.fallbacks = fallbacks;
exports.prefixes = prefixes;
exports.bug20fix = bug20fix;

var _autoprefix = require('./autoprefix');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isDev = function (x) {
  return x === 'development' || !x;
}("production");

var PluginSet = exports.PluginSet = function () {
  function PluginSet() {
    _classCallCheck(this, PluginSet);

    for (var _len = arguments.length, initial = Array(_len), _key = 0; _key < _len; _key++) {
      initial[_key] = arguments[_key];
    }

    this.fns = initial || [];
  }

  _createClass(PluginSet, [{
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        fns[_key2] = arguments[_key2];
      }

      fns.forEach(function (fn) {
        if (_this.fns.indexOf(fn) >= 0) {
          if (isDev) {
            console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
          }
        } else {
          _this.fns = [fn].concat(_toConsumableArray(_this.fns));
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove(fn) {
      this.fns = this.fns.filter(function (x) {
        return x !== fn;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.fns = [];
    }
  }, {
    key: 'transform',
    value: function transform(o) {
      return this.fns.reduce(function (o, fn) {
        return fn(o);
      }, o);
    }
  }]);

  return PluginSet;
}();

function fallbacks(node) {
  var hasArray = Object.keys(node.style).map(function (x) {
    return Array.isArray(node.style[x]);
  }).indexOf(true) >= 0;
  if (hasArray) {
    var _ret = function () {
      var style = node.style;

      var rest = _objectWithoutProperties(node, ['style']);

      var flattened = Object.keys(style).reduce(function (o, key) {
        o[key] = Array.isArray(style[key]) ? style[key].join('; ' + key + ': ') : style[key];
        return o;
      }, {});
      // todo - 
      // flatten arrays which haven't been flattened yet 
      return {
        v: _extends({ style: flattened }, rest)
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return node;
}

function prefixes(_ref) {
  var style = _ref.style;

  var rest = _objectWithoutProperties(_ref, ['style']);

  return _extends({ style: (0, _autoprefix.autoprefix)(style) }, rest);
}

function bug20fix(_ref2) {
  var selector = _ref2.selector;
  var style = _ref2.style;

  // https://github.com/threepointone/glamor/issues/20
  // todo - only on chrome versions and server side   
  return { selector: selector.replace(/\:hover/g, ':hover:nth-child(n)'), style: style };
}

},{"./autoprefix":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 

high performance StyleSheet for css-in-js systems 

- uses multiple style tags behind the scenes for millions of rules 
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side 


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject() 
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }') 
- appends a css rule into the stylesheet 

styleSheet.flush() 
- empties the stylesheet of all its contents


*/

function last() {
  return this[this.length - 1];
}

function sheetForTag(tag) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof document !== 'undefined';
var isDev = function (x) {
  return x === 'development' || !x;
}("production");
var isTest = "production" === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

var StyleSheet = exports.StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$speedy = _ref.speedy;
    var speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy;
    var _ref$maxLength = _ref.maxLength;
    var maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

    _classCallCheck(this, StyleSheet);

    this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
    this.sheet = undefined;
    this.tags = [];
    this.maxLength = maxLength;
    this.ctr = 0;
  }

  _createClass(StyleSheet, [{
    key: 'inject',
    value: function inject() {
      var _this = this;

      if (this.injected) {
        throw new Error('already injected stylesheet!');
      }
      if (isBrowser) {
        // this section is just weird alchemy I found online off many sources 
        this.tags[0] = makeStyleTag();
        // this weirdness brought to you by firefox 
        this.sheet = sheetForTag(this.tags[0]);
      } else {
        // server side 'polyfill'. just enough behavior to be useful.
        this.sheet = {
          cssRules: [],
          insertRule: function insertRule(rule) {
            // enough 'spec compliance' to be able to extract the rules later  
            // in other words, just the cssText field 
            _this.sheet.cssRules.push({ cssText: rule });
          }
        };
      }
      this.injected = true;
    }
  }, {
    key: 'speedy',
    value: function speedy(bool) {
      if (this.ctr !== 0) {
        throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
      }
      this.isSpeedy = !!bool;
    }
  }, {
    key: '_insert',
    value: function _insert(rule) {
      // this weirdness for perf, and chrome's weird bug 
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      try {
        this.sheet.insertRule(rule, this.sheet.cssRules.length); // todo - correct index here     
      } catch (e) {
        if (isDev) {
          // might need beter dx for this 
          console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
        }
      }
    }
  }, {
    key: 'insert',
    value: function insert(rule) {

      if (isBrowser) {
        var _context;

        // this is the ultrafast version, works across browsers 
        if (this.isSpeedy && this.sheet.insertRule) {
          this._insert(rule);
        }
        // more browser weirdness. I don't even know    
        else if (this.tags.length > 0 && (_context = this.tags, last).call(_context).styleSheet) {
            var _context2;

            (_context2 = this.tags, last).call(_context2).styleSheet.cssText += rule;
          } else {
            var _context3;

            (_context3 = this.tags, last).call(_context3).appendChild(document.createTextNode(rule));

            if (!this.isSpeedy) {
              var _context4;

              // sighhh
              this.sheet = sheetForTag((_context4 = this.tags, last).call(_context4));
            }
          }
      } else {
        // server side is pretty simple         
        this.sheet.insertRule(rule);
      }

      this.ctr++;
      if (isBrowser && this.ctr % this.maxLength === 0) {
        var _context5;

        this.tags.push(makeStyleTag());
        this.sheet = sheetForTag((_context5 = this.tags, last).call(_context5));
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (isBrowser) {
        this.tags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.sheet = null;
        this.ctr = 0;
        // todo - look for remnants in document.styleSheets
      } else {
        // simpler on server 
        this.sheet.cssRules = [];
      }
      this.injected = false;
    }
  }, {
    key: 'rules',
    value: function rules() {
      if (!isBrowser) {
        return this.sheet.cssRules;
      }
      var arr = [];
      this.tags.forEach(function (tag) {
        return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
      });
      return arr;
    }
  }]);

  return StyleSheet;
}();

},{}]},{},[4])(4)
});