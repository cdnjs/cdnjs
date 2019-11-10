(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cssx", [], factory);
	else if(typeof exports === 'object')
		exports["cssx"] = factory();
	else
		root["cssx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var factory, goGlobal, stylesheets, api, randomId, plugins = [];
	
	__webpack_require__(1);
	
	factory = __webpack_require__(5);
	goGlobal = __webpack_require__(15);
	randomId = __webpack_require__(16);
	
	stylesheets = [];
	
	function createStyleSheet(id) {
	  var s, i;
	
	  if (typeof id === 'undefined') {
	    id = randomId();
	  }
	
	  for (i = 0; i < stylesheets.length; i++) {
	    if (stylesheets[i].id() === id) {
	      return stylesheets[i];
	    }
	  }
	  s = factory.apply(factory, arguments);
	  stylesheets.push(s);
	  return s;
	};
	
	api = function (id) { return createStyleSheet(id, plugins); };
	
	api.domChanges = function (flag) {
	  factory.disableDOMChanges = !flag;
	};
	api.minify = function (flag) {
	  factory.minify = flag;
	};
	api.nextTick = function (flag) {
	  factory.useNextTick = flag;
	};
	api.getStylesheets = function () {
	  return stylesheets;
	};
	api.clear = function () {
	  var i;
	
	  for (i = 0; i < stylesheets.length; i++) {
	    stylesheets[i].clear();
	  }
	  stylesheets = [];
	  return api;
	};
	api.getCSS = function () {
	  var i, css = '';
	
	  for (i = 0; i < stylesheets.length; i++) {
	    css += stylesheets[i].getCSS();
	  }
	  return css;
	};
	api.plugins = function (arr) {
	  plugins = plugins.concat(arr);
	};
	
	module.exports = api;
	
	goGlobal(module.exports);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);


/***/ },
/* 2 */
/***/ function(module, exports) {

	if (!Array.prototype.filter) {
	  Array.prototype.filter = function(fun/*, thisArg*/) {
	    'use strict';
	
	    if (this === void 0 || this === null) {
	      throw new TypeError();
	    }
	
	    var t = Object(this);
	    var len = t.length >>> 0;
	    if (typeof fun !== 'function') {
	      throw new TypeError();
	    }
	
	    var res = [];
	    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
	    for (var i = 0; i < len; i++) {
	      if (i in t) {
	        var val = t[i];
	
	        // NOTE: Technically this should Object.defineProperty at
	        //       the next index, as push can be affected by
	        //       properties on Object.prototype and Array.prototype.
	        //       But that method's new, and collisions should be
	        //       rare, so use the more-compatible alternative.
	        if (fun.call(thisArg, val, i, t)) {
	          res.push(val);
	        }
	      }
	    }
	
	    return res;
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.io/#x15.4.4.18
	if (!Array.prototype.forEach) {
	
	  Array.prototype.forEach = function(callback, thisArg) {
	
	    var T, k;
	
	    if (this == null) {
	      throw new TypeError(' this is null or not defined');
	    }
	
	    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
	    var O = Object(this);
	
	    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;
	
	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (typeof callback !== "function") {
	      throw new TypeError(callback + ' is not a function');
	    }
	
	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    if (arguments.length > 1) {
	      T = thisArg;
	    }
	
	    // 6. Let k be 0
	    k = 0;
	
	    // 7. Repeat, while k < len
	    while (k < len) {
	
	      var kValue;
	
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {
	
	        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
	        kValue = O[k];
	
	        // ii. Call the Call internal method of callback with T as the this value and
	        // argument list containing kValue, k, and O.
	        callback.call(T, kValue, k, O);
	      }
	      // d. Increase k by 1.
	      k++;
	    }
	    // 8. return undefined
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {
	
	  Array.prototype.map = function(callback, thisArg) {
	
	    var T, A, k;
	
	    if (this == null) {
	      throw new TypeError(' this is null or not defined');
	    }
	
	    // 1. Let O be the result of calling ToObject passing the |this| 
	    //    value as the argument.
	    var O = Object(this);
	
	    // 2. Let lenValue be the result of calling the Get internal 
	    //    method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;
	
	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + ' is not a function');
	    }
	
	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    if (arguments.length > 1) {
	      T = thisArg;
	    }
	
	    // 6. Let A be a new array created as if by the expression new Array(len) 
	    //    where Array is the standard built-in constructor with that name and 
	    //    len is the value of len.
	    A = new Array(len);
	
	    // 7. Let k be 0
	    k = 0;
	
	    // 8. Repeat, while k < len
	    while (k < len) {
	
	      var kValue, mappedValue;
	
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {
	
	        // i. Let kValue be the result of calling the Get internal 
	        //    method of O with argument Pk.
	        kValue = O[k];
	
	        // ii. Let mappedValue be the result of calling the Call internal 
	        //     method of callback with T as the this value and argument 
	        //     list containing kValue, k, and O.
	        mappedValue = callback.call(T, kValue, k, O);
	
	        // iii. Call the DefineOwnProperty internal method of A with arguments
	        // Pk, Property Descriptor
	        // { Value: mappedValue,
	        //   Writable: true,
	        //   Enumerable: true,
	        //   Configurable: true },
	        // and false.
	
	        // In browsers that support Object.defineProperty, use the following:
	        // Object.defineProperty(A, k, {
	        //   value: mappedValue,
	        //   writable: true,
	        //   enumerable: true,
	        //   configurable: true
	        // });
	
	        // For best browser support, use the following:
	        A[k] = mappedValue;
	      }
	      // d. Increase k by 1.
	      k++;
	    }
	
	    // 9. return A
	    return A;
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var CSSRule = __webpack_require__(6);
	var applyToDOM = __webpack_require__(7);
	var nextTick = __webpack_require__(8);
	var generate = __webpack_require__(12);
	var isArray = __webpack_require__(14);
	
	var ids = 0;
	var getId = function () { return 'x' + (++ids); };
	
	module.exports = function (id, plugins) {
	  var _id = id || getId();
	  var _api = {};
	  var _rules = [];
	  var _customProperties = {};
	  var _remove = null;
	  var _css = '';
	  var _scope = '';
	
	  var ruleExists = function (rules, selector, parent) {
	    return rules.reduce(function (result, rule) {
	      if (result !== false) return result;
	      if (rule.selector === selector) {
	        if (parent) {
	          return rule.parent && parent.selector === rule.parent.selector ? rule : false;
	        }
	        return rule;
	      }
	      return false;
	    }, false);
	  };
	  var registerRule = function (rule, addAt) {
	    if (typeof addAt !== 'undefined') {
	      _rules.splice(addAt, 0, rule);
	    } else {
	      _rules.push(rule);
	    }
	    rule.index = _rules.length - 1;
	  };
	
	  _api.id = function () {
	    return _id;
	  };
	  _api.add = _api.update = function (rawRules, parent, addAt) {
	    var rule, prop, tmpRawRules, cssProps, props, nestedRules, selector, tmp;
	    var created = [];
	
	    if (typeof rawRules === 'string') {
	      tmp = {};
	      tmp[rawRules] = {};
	      rawRules = tmp;
	    }
	
	    if (typeof rawRules === 'function') {
	      rawRules = rawRules();
	    }
	
	    for (selector in rawRules) {
	      rule = ruleExists(_rules, selector, parent);
	      cssProps = {};
	      props = {};
	      nestedRules = [];
	
	      // new rule
	      if (!rule) {
	        props = rawRules[selector];
	        for (prop in props) {
	          if (typeof props[prop] !== 'object' || isArray(props[prop])) {
	            cssProps[prop] = props[prop];
	          } else {
	            tmpRawRules = {};
	            tmpRawRules[prop] = props[prop];
	            nestedRules.push(tmpRawRules);
	          }
	        }
	
	        rule = CSSRule(selector, this.resolveCustomProps(cssProps), _api);
	
	        if (!parent) {
	          registerRule(rule, addAt);
	        } else {
	          rule.parent = parent;
	          parent.registerNested(rule);
	        }
	        nestedRules.forEach(function (rawRulesNested) {
	          _api.add(rawRulesNested, rule);
	        });
	
	      // existing rule
	      } else {
	        rule.update(rawRules[selector]);
	      }
	
	      this.compile();
	      created.push(rule);
	    }
	
	    return created.length === 1 ? created[0] : created;
	  };
	  _api.rules = function () {
	    return _rules;
	  };
	  _api.compile = function () {
	    if (module.exports.useNextTick) {
	      nextTick(function () {
	        _api.compileImmediate();
	      }, _id);
	      return _api;
	    }
	    return _api.compileImmediate();
	  };
	  _api.compileImmediate = function () {
	    _css = generate(_rules, module.exports.minify, plugins, _scope);
	    if (!module.exports.disableDOMChanges) {
	      _remove = applyToDOM(_css, _id);
	    }
	    return _api;
	  };
	  _api.clear = function () {
	    _rules = [];
	    _css = '';
	    if (_remove !== null) {
	      _remove();
	      _remove = null;
	    }
	    return _api;
	  };
	  _api.destroy = function () {
	    return _api.clear();
	  };
	  _api.getCSS = function () {
	    this.compileImmediate();
	    return _css;
	  };
	  _api.define = function (prop, func) {
	    _customProperties[prop] = func;
	  };
	  _api.scope = function (scope) {
	    _scope = scope;
	  };
	  _api._getCustomProps = function () {
	    return _customProperties;
	  };
	  _api.resolveCustomProps = function (actual) {
	    var result = actual, prop, newProp, value;
	    var custom = _customProperties;
	
	    for (prop in custom) {
	      if (typeof actual[prop] !== 'undefined') {
	        value = custom[prop](actual[prop]);
	        delete actual[prop];
	        for (newProp in value) {
	          actual[newProp] = value[newProp];
	        }
	      }
	    }
	    return result;
	  };
	
	  return _api;
	};
	
	module.exports.disableDOMChanges = false;
	module.exports.minify = true;
	module.exports.useNextTick = true;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function CSSRule(selector, props, stylesheet) {
	  var _api = {
	    selector: selector,
	    props: props,
	    stylesheet: stylesheet,
	    index: null,
	    nestedRules: null,
	    parent: null
	  };
	
	  _api.clone = function () {
	    var rule = CSSRule(this.selector, this.props, this.stylesheet);
	
	    rule.index = this.index;
	    rule.nestedRules = this.nestedRules;
	    rule.parent = this.parent;
	
	    return rule;
	  };
	
	  _api.descendant = _api.d = function (rawRules) {
	    var selector;
	
	    if (typeof rawRules === 'function') rawRules = rawRules();
	
	    for (selector in rawRules) {
	      rawRules[_api.selector + ' ' + selector] = rawRules[selector];
	      delete rawRules[selector];
	    }
	    return _api.stylesheet.add(rawRules, this.parent, this.index);
	  };
	  _api.nested = _api.n = function (rawRules) {
	    return _api.stylesheet.add(rawRules, this);
	  };
	  _api.update = function (props) {
	    var prop, areThereNestedRules = this.nestedRules !== null;
	
	    if (typeof props === 'function') {
	      props = props();
	    }
	
	    props = this.stylesheet.resolveCustomProps(props);
	
	    for (prop in props) {
	      if (typeof props[prop] !== 'object') {
	        this.props[prop] = props[prop];
	      } else if (areThereNestedRules) {
	        if (this.nestedRules[prop]) {
	          this.nestedRules[prop].update(props[prop]);
	        }
	      }
	    }
	    return this;
	  };
	  _api.registerNested = function (rule) {
	    if (this.nestedRules === null) this.nestedRules = {};
	    this.nestedRules[rule.selector] = rule;
	    return this;
	  };
	
	  return _api;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	var cache = {};
	
	var qs = function (selector) {
	  return document.querySelector(selector);
	};
	
	var createNode = function (type, attrs, content) {
	  var node = document.createElement(type), i, a;
	
	  for (i = 0; i < attrs.length; i++) {
	    a = attrs[i];
	    node.setAttribute(a.name, a.value);
	  }
	  node.innerHTML = content;
	  (qs('head') || qs('body')).appendChild(node);
	  return node;
	};
	
	var remove = function (id) {
	  return function () {
	    if (cache[id]) {
	      cache[id].el.parentNode.removeChild(cache[id].el);
	      delete cache[id];
	    }
	  };
	};
	
	module.exports = function (css, id) {
	  var el;
	
	  if (!cache[id]) {
	    el = createNode(
	      'style', [
	        { name: 'id', value: id },
	        { name: 'type', value: 'text/css'}
	      ],
	       css
	    );
	    cache[id] = { el: el, css: css, remove: remove(id) };
	  } else {
	    if (cache[id].css !== css) {
	      cache[id].css = css;
	      cache[id].el.innerHTML = css;
	    }
	  }
	
	  return cache[id].remove;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {var cache = {};
	
	__webpack_require__(11);
	
	module.exports = function (work, id) {
	  if (!cache[id]) {
	    cache[id] = work;
	    setImmediate(function () {
	      delete cache[id];
	      work();
	    });
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).setImmediate))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(10).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).setImmediate, __webpack_require__(9).clearImmediate))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, clearImmediate, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var setImmediate;
	
	    function addFromSetImmediateArguments(args) {
	        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
	        return nextHandle++;
	    }
	
	    // This function accepts the same arguments as setImmediate, but
	    // returns a function that requires no arguments.
	    function partiallyApplied(handler) {
	        var args = [].slice.call(arguments, 1);
	        return function() {
	            if (typeof handler === "function") {
	                handler.apply(undefined, args);
	            } else {
	                (new Function("" + handler))();
	            }
	        };
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(partiallyApplied(runIfPresent, handle), 0);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    task();
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function installNextTickImplementation() {
	        setImmediate = function() {
	            var handle = addFromSetImmediateArguments(arguments);
	            process.nextTick(partiallyApplied(runIfPresent, handle));
	            return handle;
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        setImmediate = function() {
	            var handle = addFromSetImmediateArguments(arguments);
	            global.postMessage(messagePrefix + handle, "*");
	            return handle;
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        setImmediate = function() {
	            var handle = addFromSetImmediateArguments(arguments);
	            channel.port2.postMessage(handle);
	            return handle;
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        setImmediate = function() {
	            var handle = addFromSetImmediateArguments(arguments);
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	            return handle;
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        setImmediate = function() {
	            var handle = addFromSetImmediateArguments(arguments);
	            setTimeout(partiallyApplied(runIfPresent, handle), 0);
	            return handle;
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(9).clearImmediate, __webpack_require__(10)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isEmpty = __webpack_require__(13);
	var isArray = __webpack_require__(14);
	
	module.exports = function (topRules, minify, plugins, scope) {
	  var scopeTheSelector = function (selector) {
	    if (scope === '') return selector;
	    if (selector.indexOf(scope) === 0 || selector.indexOf('@') === 0) return selector;
	    return scope + ' ' + selector;
	  };
	  var applyPlugins = function (props) {
	    var n;
	
	    for (n = 0; n < plugins.length; n++) {
	      props = plugins[n](props);
	    }
	    return props;
	  };
	
	  var newLine = minify ? '' : '\n';
	  var interval = minify ? '' : ' ';
	  var tab = minify ? '' : '  ';
	
	  var process = function (rules, indent) {
	    var css = '', r, prop, props, value;
	    var addLine = function (line, noNewLine) {
	      css += line + (noNewLine ? '' : newLine);
	    };
	    var processRule = function (rule) {
	      if (!isEmpty(rule.props) || rule.nestedRules !== null) {
	        addLine(indent + scopeTheSelector(rule.selector) + interval + '{');
	        props = applyPlugins(rule.props);
	        for (prop in props) {
	          value = typeof props[prop] === 'function' ? props[prop]() : props[prop];
	          if (isArray(value)) {
	            value.forEach(function (v) {
	              addLine(indent + tab + prop + ':' + interval + v + ';');
	            });
	          } else {
	            addLine(indent + tab + prop + ':' + interval + value + ';');
	          }
	        }
	        if (rule.nestedRules !== null) {
	          addLine(process(rule.nestedRules, indent + tab), true);
	        }
	        addLine(indent + '}');
	      }
	    };
	
	    indent = minify ? '' : indent;
	
	    if (isArray(rules)) {
	      rules.forEach(processRule);
	    } else {
	      for (r in rules) {
	        processRule(rules[r]);
	      }
	    };
	
	    return css;
	  };
	
	  return process(topRules, '');
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	  var prop;
	
	  for (prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	      return false;
	    }
	  }
	  return true;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function (v) {
	  return Object.prototype.toString.call(v) === '[object Array]';
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = function (api) {
	  if (typeof global !== 'undefined') {
	    global.cssx = api;
	  }
	  if (typeof window !== 'undefined') {
	    window.cssx = api;
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	var ids = 0;
	
	module.exports = function () {
	  return '_cssx' + (++ids);
	};
	module.exports.resetIDs = function () {
	  ids = 0;
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=cssx.js.map