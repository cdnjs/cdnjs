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

	var factory = __webpack_require__(1);
	var goGlobal = __webpack_require__(11);
	
	var stylesheets = [];
	var api = function () {};
	
	function createStyleSheet(id) {
	  var s, i;
	
	  if (typeof id === 'undefined') {
	    throw new Error('`stylesheet` method expects ID as an argument');
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
	
	api.stylesheet = api.s = createStyleSheet;
	module.exports = api;
	
	goGlobal(module.exports);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CSSRule = __webpack_require__(2);
	var applyToDOM = __webpack_require__(3);
	var nextTick = __webpack_require__(4);
	var resolveSelector = __webpack_require__(8);
	var generate = __webpack_require__(9);
	
	var ids = 0;
	var getId = function () { return 'x' + (++ids); };
	
	module.exports = function (id) {
	  var _id = id || getId();
	  var _api = {};
	  var _rules = [];
	  var _remove = null;
	  var _css = '';
	
	  var ruleExists = function (selector, parent) {
	    var i, rule, areParentsMatching, areThereNoParents;
	
	    for (i = 0; i < _rules.length; i++) {
	      rule = _rules[i];
	      areParentsMatching = (rule.parent && typeof parent !== 'undefined' && parent.selector === rule.parent.selector);
	      areThereNoParents = !rule.parent && !parent;
	      if (resolveSelector(rule.selector) === resolveSelector(selector) && (areParentsMatching || areThereNoParents)) {
	        return rule;
	      }
	    }
	    return false;
	  };
	
	  _api.id = function () {
	    return _id;
	  };
	  _api.add = function (selector, props, parent, isWrapper) {
	    var rule, r = ruleExists(selector, parent);
	
	    if (r !== false) {
	      rule = r.update(false, props);
	    } else {
	      rule = CSSRule(selector, props, _api);
	      _rules.push(rule);
	      if (parent) {
	        rule.parent = parent;
	        parent.addChild(rule, isWrapper);
	      }
	    }
	    this.compile();
	    return rule;
	  };
	  _api.rules = function () {
	    return _rules;
	  };
	  _api.compile = function () {
	    if (module.exports.useNextTick) {
	      nextTick(function () {
	        _api.compileImmediate();
	      }, _id);
	    }
	    return _api.compileImmediate();
	  };
	  _api.compileImmediate = function () {
	    _css = generate(_rules, module.exports.minify);
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
	  _api.getCSS = function () {
	    this.compileImmediate();
	    return _css;
	  };
	
	  return _api;
	};
	
	module.exports.disableDOMChanges = false;
	module.exports.minify = true;
	module.exports.useNextTick = true;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var ids = 0;
	var getId = function () { return 'r' + (++ids); };
	
	module.exports = function (selector, props, stylesheet) {
	  var _id = getId();
	  var _children = [];
	  var _nestedChildren = [];
	
	  var record = {
	    selector: selector,
	    props: props,
	    parent: null,
	    addChild: function (c, isWrapper) {
	      (isWrapper ? _nestedChildren : _children).push(c);
	      return this;
	    },
	    getChildren: function () {
	      return _children;
	    },
	    getNestedChildren: function () {
	      return _nestedChildren;
	    },
	    descendant: function (s, p) {
	      return stylesheet.add(s, p, this, false);
	    },
	    nested: function (s, p) {
	      return stylesheet.add(s, p, this, true);
	    },
	    d: function (s, p) {
	      return this.descendant(s, p);
	    },
	    n: function (s, p) {
	      return this.nested(s, p);
	    },
	    update: function (s, p) {
	      var propName;
	
	      if (s) this.selector = s;
	      if (p) {
	        for (propName in p) {
	          this.props[propName] = p[propName];
	        }
	      }
	      return this;
	    },
	    id: function () {
	      return _id;
	    }
	  };
	
	  return record;
	};


/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {var cache = {};
	
	__webpack_require__(7);
	
	module.exports = function (work, id) {
	  if (!cache[id]) {
	    cache[id] = work;
	    setImmediate(function () {
	      delete cache[id];
	      work();
	    });
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
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
/* 7 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(5).clearImmediate, __webpack_require__(6)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function (selector) {
	  return typeof selector === 'function' ? selector() : selector;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isEmpty = __webpack_require__(10);
	var resolveSelector = __webpack_require__(8);
	
	module.exports = function (rules, minify) {
	  var processed = {};
	
	  return (function generate(rules, parent, minify, nesting) {
	    var i, j, rule, props, prop, children, nestedChildren, selector, cssValue, tab;
	    var css = '';
	    var newLine = minify ? '' : '\n';
	    var interval = minify ? '' : ' ';
	
	    nesting = typeof nesting !== 'undefined' ? nesting : '';
	    tab = minify ? '' : nesting + '  ';
	
	    for (i = 0; i < rules.length; i++) {
	      rule = rules[i];
	      children = rule.getChildren();
	      nestedChildren = rule.getNestedChildren();
	      selector = (parent ? parent + ' ' : '');
	      selector += resolveSelector(rule.selector);
	      props = typeof rule.props === 'function' ? rule.props() : rule.props;
	      if ((!isEmpty(props) || nestedChildren.length > 0) && !processed[rule.id()]) {
	        processed[rule.id()] = true;
	        css += nesting + selector + interval + '{' + newLine;
	        if (props) {
	          for (prop in props) {
	            cssValue = typeof props[prop] === 'function' ? props[prop]() : props[prop];
	            css += tab + prop + ':' + interval + cssValue + ';' + newLine;
	          }
	        }
	        for (j = 0; j < nestedChildren.length; j++) {
	          css += generate([nestedChildren[j]], null, minify, tab);
	        }
	        css += nesting + '}' + newLine;
	      }
	      if (children.length > 0) {
	        css += generate(children, selector, minify);
	      }
	    };
	    return css;
	  })(rules, null, minify);
	};


/***/ },
/* 10 */
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
/* 11 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cssx.js.map