/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	var microtask = __webpack_require__(1);
	var es6Promise = __webpack_require__(2);
	var core = __webpack_require__(6);
	var browserPatch = __webpack_require__(10);
	if (core.Zone.prototype['scheduleMicrotask']) {
	    console.warn('Zone-microtasks already exported on window the object!');
	}
	else {
	    microtask.addMicrotaskSupport(core.Zone);
	    global.Zone = core.Zone;
	    global.zone = new global.Zone();
	    // Monkey patch the Promise implementation to add support for microtasks
	    global.Promise = es6Promise.Promise;
	    browserPatch.apply();
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1taWNyb3Rhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvYnJvd3Nlci96b25lLW1pY3JvdGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLFNBQVMsV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUMxQyxJQUFZLFVBQVUsV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUMxQyxJQUFZLElBQUksV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNoQyxJQUFZLFlBQVksV0FBTSxrQkFBa0IsQ0FBQyxDQUFBO0FBRWpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhDLHdFQUF3RTtJQUN4RSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFFcEMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIG1pY3JvdGFzayBmcm9tICcuLi9taWNyb3Rhc2snO1xuaW1wb3J0ICogYXMgZXM2UHJvbWlzZSBmcm9tICdlczYtcHJvbWlzZSc7XG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0ICogYXMgYnJvd3NlclBhdGNoIGZyb20gJy4uL3BhdGNoL2Jyb3dzZXInO1xuXG5pZiAoY29yZS5ab25lLnByb3RvdHlwZVsnc2NoZWR1bGVNaWNyb3Rhc2snXSkge1xuICBjb25zb2xlLndhcm4oJ1pvbmUtbWljcm90YXNrcyBhbHJlYWR5IGV4cG9ydGVkIG9uIHdpbmRvdyB0aGUgb2JqZWN0IScpO1xufSBlbHNlIHtcbiAgbWljcm90YXNrLmFkZE1pY3JvdGFza1N1cHBvcnQoY29yZS5ab25lKTtcblxuICBnbG9iYWwuWm9uZSA9IGNvcmUuWm9uZTtcbiAgZ2xvYmFsLnpvbmUgPSBuZXcgZ2xvYmFsLlpvbmUoKTtcblxuICAvLyBNb25rZXkgcGF0Y2ggdGhlIFByb21pc2UgaW1wbGVtZW50YXRpb24gdG8gYWRkIHN1cHBvcnQgZm9yIG1pY3JvdGFza3NcbiAgZ2xvYmFsLlByb21pc2UgPSBlczZQcm9taXNlLlByb21pc2U7XG5cbiAgYnJvd3NlclBhdGNoLmFwcGx5KCk7XG59XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// TODO(vicb): Create a benchmark for the different methods & the usage of the queue
	// see https://github.com/angular/zone.js/issues/97
	// It is required to initialize hasNativePromise before requiring es6-promise otherwise es6-promise would
	// overwrite the native Promise implementation on v8 and the check would always return false.
	// see https://github.com/jakearchibald/es6-promise/issues/140
	var hasNativePromise = typeof Promise !== "undefined" &&
	    Promise.toString().indexOf("[native code]") !== -1;
	var isFirefox = global.navigator &&
	    global.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	var resolvedPromise;
	// TODO(vicb): remove '!isFirefox' when the bug gets fixed:
	// https://bugzilla.mozilla.org/show_bug.cgi?id=1162013
	if (hasNativePromise && !isFirefox) {
	    // When available use a native Promise to schedule microtasks.
	    // When not available, es6-promise fallback will be used
	    resolvedPromise = Promise.resolve();
	}
	var es6Promise = __webpack_require__(2).Promise;
	if (resolvedPromise) {
	    es6Promise._setScheduler(function (fn) {
	        resolvedPromise.then(fn);
	    });
	}
	// es6-promise asap should schedule microtasks via zone.scheduleMicrotask so that any
	// user defined hooks are triggered
	es6Promise._setAsap(function (fn, arg) {
	    global.zone.scheduleMicrotask(function () {
	        fn(arg);
	    });
	});
	// The default implementation of scheduleMicrotask use the original es6-promise implementation
	// to schedule a microtask
	function scheduleMicrotask(fn) {
	    es6Promise._asap(this.bind(fn));
	}
	function addMicrotaskSupport(zoneClass) {
	    zoneClass.prototype.scheduleMicrotask = scheduleMicrotask;
	    return zoneClass;
	}
	exports.addMicrotaskSupport = addMicrotaskSupport;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm90YXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pY3JvdGFzay50cyJdLCJuYW1lcyI6WyJzY2hlZHVsZU1pY3JvdGFzayIsImFkZE1pY3JvdGFza1N1cHBvcnQiXSwibWFwcGluZ3MiOiJBQUFBLG9GQUFvRjtBQUNwRixtREFBbUQ7QUFFbkQseUdBQXlHO0FBQ3pHLDZGQUE2RjtBQUM3Riw4REFBOEQ7QUFDOUQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLE9BQU8sS0FBSyxXQUFXO0lBQ2pELE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFFdkQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVM7SUFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXJFLElBQUksZUFBZSxDQUFDO0FBRXBCLDJEQUEyRDtBQUMzRCx1REFBdUQ7QUFDdkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25DLDhEQUE4RDtJQUM5RCx3REFBd0Q7SUFDeEQsZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN0QyxDQUFDO0FBRUQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUVoRCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBUyxFQUFFO1FBQ2xDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQscUZBQXFGO0FBQ3JGLG1DQUFtQztBQUNuQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVMsRUFBRSxFQUFFLEdBQUc7SUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUM1QixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsOEZBQThGO0FBQzlGLDBCQUEwQjtBQUMxQiwyQkFBMkIsRUFBRTtJQUMzQkEsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDbENBLENBQUNBO0FBRUQsNkJBQW9DLFNBQVM7SUFDM0NDLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLGlCQUFpQkEsR0FBR0EsaUJBQWlCQSxDQUFDQTtJQUMxREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7QUFDbkJBLENBQUNBO0FBSGUsMkJBQW1CLHNCQUdsQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETyh2aWNiKTogQ3JlYXRlIGEgYmVuY2htYXJrIGZvciB0aGUgZGlmZmVyZW50IG1ldGhvZHMgJiB0aGUgdXNhZ2Ugb2YgdGhlIHF1ZXVlXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvOTdcblxuLy8gSXQgaXMgcmVxdWlyZWQgdG8gaW5pdGlhbGl6ZSBoYXNOYXRpdmVQcm9taXNlIGJlZm9yZSByZXF1aXJpbmcgZXM2LXByb21pc2Ugb3RoZXJ3aXNlIGVzNi1wcm9taXNlIHdvdWxkXG4vLyBvdmVyd3JpdGUgdGhlIG5hdGl2ZSBQcm9taXNlIGltcGxlbWVudGF0aW9uIG9uIHY4IGFuZCB0aGUgY2hlY2sgd291bGQgYWx3YXlzIHJldHVybiBmYWxzZS5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFrZWFyY2hpYmFsZC9lczYtcHJvbWlzZS9pc3N1ZXMvMTQwXG52YXIgaGFzTmF0aXZlUHJvbWlzZSA9IHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgUHJvbWlzZS50b1N0cmluZygpLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpICE9PSAtMTtcblxudmFyIGlzRmlyZWZveCA9IGdsb2JhbC5uYXZpZ2F0b3IgJiZcbiAgICBnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xuXG52YXIgcmVzb2x2ZWRQcm9taXNlO1xuXG4vLyBUT0RPKHZpY2IpOiByZW1vdmUgJyFpc0ZpcmVmb3gnIHdoZW4gdGhlIGJ1ZyBnZXRzIGZpeGVkOlxuLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTE2MjAxM1xuaWYgKGhhc05hdGl2ZVByb21pc2UgJiYgIWlzRmlyZWZveCkge1xuICAvLyBXaGVuIGF2YWlsYWJsZSB1c2UgYSBuYXRpdmUgUHJvbWlzZSB0byBzY2hlZHVsZSBtaWNyb3Rhc2tzLlxuICAvLyBXaGVuIG5vdCBhdmFpbGFibGUsIGVzNi1wcm9taXNlIGZhbGxiYWNrIHdpbGwgYmUgdXNlZFxuICByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbn1cblxudmFyIGVzNlByb21pc2UgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpLlByb21pc2U7XG5cbmlmIChyZXNvbHZlZFByb21pc2UpIHtcbiAgZXM2UHJvbWlzZS5fc2V0U2NoZWR1bGVyKGZ1bmN0aW9uKGZuKSB7XG4gICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oZm4pO1xuICB9KTtcbn1cblxuLy8gZXM2LXByb21pc2UgYXNhcCBzaG91bGQgc2NoZWR1bGUgbWljcm90YXNrcyB2aWEgem9uZS5zY2hlZHVsZU1pY3JvdGFzayBzbyB0aGF0IGFueVxuLy8gdXNlciBkZWZpbmVkIGhvb2tzIGFyZSB0cmlnZ2VyZWRcbmVzNlByb21pc2UuX3NldEFzYXAoZnVuY3Rpb24oZm4sIGFyZykge1xuICBnbG9iYWwuem9uZS5zY2hlZHVsZU1pY3JvdGFzayhmdW5jdGlvbigpIHtcbiAgICBmbihhcmcpO1xuICB9KTtcbn0pO1xuXG4vLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBzY2hlZHVsZU1pY3JvdGFzayB1c2UgdGhlIG9yaWdpbmFsIGVzNi1wcm9taXNlIGltcGxlbWVudGF0aW9uXG4vLyB0byBzY2hlZHVsZSBhIG1pY3JvdGFza1xuZnVuY3Rpb24gc2NoZWR1bGVNaWNyb3Rhc2soZm4pIHtcbiAgZXM2UHJvbWlzZS5fYXNhcCh0aGlzLmJpbmQoZm4pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1pY3JvdGFza1N1cHBvcnQoem9uZUNsYXNzKSB7XG4gIHpvbmVDbGFzcy5wcm90b3R5cGUuc2NoZWR1bGVNaWNyb3Rhc2sgPSBzY2hlZHVsZU1pY3JvdGFzaztcbiAgcmV0dXJuIHpvbmVDbGFzcztcbn1cbiJdfQ==
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(4);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(5)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var keys = __webpack_require__(7);
	var promise = __webpack_require__(8);
	var deprecated = {};
	function deprecatedWarning(key, text) {
	    if (!deprecated.hasOwnProperty(key)) {
	        deprecated[key] = true;
	        console.warn("DEPRECATION WARNING: '" + key +
	            "' is no longer supported and will be removed in next major release. " + text);
	    }
	}
	var Zone = (function () {
	    function Zone(parentZone, data) {
	        this.parent = null;
	        // onError is used to override error handling.
	        // When a custom error handler is provided, it should most probably rethrow the exception
	        // not to break the expected control flow:
	        //
	        // `promise.then(fnThatThrows).catch(fn);`
	        //
	        // When this code is executed in a zone with a custom onError handler that doesn't rethrow, the
	        // `.catch()` branch will not be taken as the `fnThatThrows` exception will be swallowed by the
	        // handler.
	        this.onError = null;
	        var zone = (arguments.length) ? Object.create(parentZone) : this;
	        zone.parent = parentZone || null;
	        Object.keys(data || {}).forEach(function (property) {
	            var _property = property.substr(1);
	            // augment the new zone with a hook decorates the parent's hook
	            if (property[0] === '$') {
	                zone[_property] = data[property](parentZone[_property] || function () { });
	            }
	            else if (property[0] === '+') {
	                if (parentZone[_property]) {
	                    zone[_property] = function () {
	                        var result = parentZone[_property].apply(this, arguments);
	                        data[property].apply(this, arguments);
	                        return result;
	                    };
	                }
	                else {
	                    zone[_property] = data[property];
	                }
	            }
	            else if (property[0] === '-') {
	                if (parentZone[_property]) {
	                    zone[_property] = function () {
	                        data[property].apply(this, arguments);
	                        return parentZone[_property].apply(this, arguments);
	                    };
	                }
	                else {
	                    zone[_property] = data[property];
	                }
	            }
	            else {
	                zone[property] = (typeof data[property] === 'object') ?
	                    JSON.parse(JSON.stringify(data[property])) :
	                    data[property];
	            }
	        });
	        zone.$id = Zone.nextId++;
	        return zone;
	    }
	    Zone.prototype.fork = function (locals) {
	        this.onZoneCreated();
	        return new Zone(this, locals);
	    };
	    Zone.prototype.bind = function (fn, skipEnqueue) {
	        if (typeof fn !== 'function') {
	            throw new Error('Expecting function got: ' + fn);
	        }
	        skipEnqueue || this.enqueueTask(fn);
	        var zone = this.isRootZone() ? this : this.fork();
	        return function zoneBoundFn() {
	            return zone.run(fn, this, arguments);
	        };
	    };
	    /// @deprecated
	    Zone.prototype.bindOnce = function (fn) {
	        deprecatedWarning('bindOnce', 'There is no replacement.');
	        var boundZone = this;
	        return this.bind(function () {
	            var result = fn.apply(this, arguments);
	            boundZone.dequeueTask(fn);
	            return result;
	        });
	    };
	    Zone.prototype.isRootZone = function () {
	        return this.parent === null;
	    };
	    Zone.prototype.run = function (fn, applyTo, applyWith) {
	        applyWith = applyWith || [];
	        var oldZone = global.zone;
	        // MAKE THIS ZONE THE CURRENT ZONE
	        global.zone = this;
	        try {
	            this.beforeTask();
	            return fn.apply(applyTo, applyWith);
	        }
	        catch (e) {
	            if (this.onError) {
	                this.onError(e);
	            }
	            else {
	                throw e;
	            }
	        }
	        finally {
	            this.afterTask();
	            // REVERT THE CURRENT ZONE BACK TO THE ORIGINAL ZONE
	            global.zone = oldZone;
	        }
	    };
	    Zone.prototype.beforeTask = function () { };
	    Zone.prototype.onZoneCreated = function () { };
	    Zone.prototype.afterTask = function () { };
	    Zone.prototype.enqueueTask = function (fn) {
	        deprecatedWarning('enqueueTask', 'Use addTask/addRepeatingTask/addMicroTask');
	    };
	    Zone.prototype.dequeueTask = function (fn) {
	        deprecatedWarning('dequeueTask', 'Use removeTask/removeRepeatingTask/removeMicroTask');
	    };
	    Zone.prototype.addTask = function (taskFn) { this.enqueueTask(taskFn); };
	    Zone.prototype.removeTask = function (taskFn) { this.dequeueTask(taskFn); };
	    Zone.prototype.addRepeatingTask = function (taskFn) { this.enqueueTask(taskFn); };
	    Zone.prototype.removeRepeatingTask = function (taskFn) { this.dequeueTask(taskFn); };
	    Zone.prototype.addMicrotask = function (taskFn) { this.enqueueTask(taskFn); };
	    Zone.prototype.removeMicrotask = function (taskFn) { this.dequeueTask(taskFn); };
	    Zone.prototype.addEventListener = function () {
	        return this[keys.common.addEventListener].apply(this, arguments);
	    };
	    Zone.prototype.removeEventListener = function () {
	        return this[keys.common.removeEventListener].apply(this, arguments);
	    };
	    // Root zone ID === 1
	    Zone.nextId = 1;
	    Zone.bindPromiseFn = promise.bindPromiseFn;
	    return Zone;
	})();
	exports.Zone = Zone;
	;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlLnRzIl0sIm5hbWVzIjpbImRlcHJlY2F0ZWRXYXJuaW5nIiwiWm9uZSIsIlpvbmUuY29uc3RydWN0b3IiLCJab25lLmZvcmsiLCJab25lLmJpbmQiLCJab25lLmJpbmQuem9uZUJvdW5kRm4iLCJab25lLmJpbmRPbmNlIiwiWm9uZS5pc1Jvb3Rab25lIiwiWm9uZS5ydW4iLCJab25lLmJlZm9yZVRhc2siLCJab25lLm9uWm9uZUNyZWF0ZWQiLCJab25lLmFmdGVyVGFzayIsIlpvbmUuZW5xdWV1ZVRhc2siLCJab25lLmRlcXVldWVUYXNrIiwiWm9uZS5hZGRUYXNrIiwiWm9uZS5yZW1vdmVUYXNrIiwiWm9uZS5hZGRSZXBlYXRpbmdUYXNrIiwiWm9uZS5yZW1vdmVSZXBlYXRpbmdUYXNrIiwiWm9uZS5hZGRNaWNyb3Rhc2siLCJab25lLnJlbW92ZU1pY3JvdGFzayIsIlpvbmUuYWRkRXZlbnRMaXN0ZW5lciIsIlpvbmUucmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxJQUFJLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDL0IsSUFBWSxPQUFPLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUUzQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFFcEIsMkJBQTJCLEdBQUcsRUFBRSxJQUFJO0lBQ2xDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNwQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDdkJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLHdCQUF3QkEsR0FBR0EsR0FBR0E7WUFDdkNBLHNFQUFzRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckZBLENBQUNBO0FBQ0hBLENBQUNBO0FBRUQ7SUFR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LDhCQUFlQSxHQUFmQSxVQUFnQkEsTUFBTUEsSUFBSWtCLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRXJEbEIsK0JBQWdCQSxHQUFoQkE7UUFDRW1CLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDbkVBLENBQUNBO0lBRURuQixrQ0FBbUJBLEdBQW5CQTtRQUNFb0IsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUN0RUEsQ0FBQ0E7SUFuSkRwQixxQkFBcUJBO0lBQ2RBLFdBQU1BLEdBQUdBLENBQUNBLENBQUNBO0lBQ1hBLGtCQUFhQSxHQUFHQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQTtJQWtKL0NBLFdBQUNBO0FBQURBLENBQUNBLEFBckpELElBcUpDO0FBckpZLFlBQUksT0FxSmhCLENBQUE7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMga2V5cyBmcm9tICcuL2tleXMnO1xuaW1wb3J0ICogYXMgcHJvbWlzZSBmcm9tICcuL3BhdGNoL3Byb21pc2UnO1xuXG52YXIgZGVwcmVjYXRlZCA9IHt9O1xuXG5mdW5jdGlvbiBkZXByZWNhdGVkV2FybmluZyhrZXksIHRleHQpIHtcbiAgaWYgKCFkZXByZWNhdGVkLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBkZXByZWNhdGVkW2tleV0gPSB0cnVlO1xuICAgIGNvbnNvbGUud2FybihcIkRFUFJFQ0FUSU9OIFdBUk5JTkc6ICdcIiArIGtleSArXG4gICAgICAgIFwiJyBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gbmV4dCBtYWpvciByZWxlYXNlLiBcIiArIHRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lIHtcbiAgLy8gUm9vdCB6b25lIElEID09PSAxXG4gIHN0YXRpYyBuZXh0SWQgPSAxO1xuICBzdGF0aWMgYmluZFByb21pc2VGbiA9IHByb21pc2UuYmluZFByb21pc2VGbjtcblxuXG4gIHBhcmVudDogWm9uZSA9IG51bGw7XG4gICRpZDogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihwYXJlbnRab25lPywgZGF0YT8pIHtcbiAgICB2YXIgem9uZSA9IChhcmd1bWVudHMubGVuZ3RoKSA/IE9iamVjdC5jcmVhdGUocGFyZW50Wm9uZSkgOiB0aGlzO1xuXG4gICAgem9uZS5wYXJlbnQgPSBwYXJlbnRab25lIHx8IG51bGw7XG5cbiAgICBPYmplY3Qua2V5cyhkYXRhIHx8IHt9KS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG5cbiAgICAgIHZhciBfcHJvcGVydHkgPSBwcm9wZXJ0eS5zdWJzdHIoMSk7XG5cbiAgICAgIC8vIGF1Z21lbnQgdGhlIG5ldyB6b25lIHdpdGggYSBob29rIGRlY29yYXRlcyB0aGUgcGFyZW50J3MgaG9va1xuICAgICAgaWYgKHByb3BlcnR5WzBdID09PSAnJCcpIHtcbiAgICAgICAgem9uZVtfcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV0ocGFyZW50Wm9uZVtfcHJvcGVydHldIHx8IGZ1bmN0aW9uICgpIHt9KTtcblxuICAgICAgLy8gYXVnbWVudCB0aGUgbmV3IHpvbmUgd2l0aCBhIGhvb2sgdGhhdCBydW5zIGFmdGVyIHRoZSBwYXJlbnQncyBob29rXG4gICAgICB9IGVsc2UgaWYgKHByb3BlcnR5WzBdID09PSAnKycpIHtcbiAgICAgICAgaWYgKHBhcmVudFpvbmVbX3Byb3BlcnR5XSkge1xuICAgICAgICAgIHpvbmVbX3Byb3BlcnR5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwYXJlbnRab25lW19wcm9wZXJ0eV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGRhdGFbcHJvcGVydHldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZVtfcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV07XG4gICAgICAgIH1cblxuICAgICAgLy8gYXVnbWVudCB0aGUgbmV3IHpvbmUgd2l0aCBhIGhvb2sgdGhhdCBydW5zIGJlZm9yZSB0aGUgcGFyZW50J3MgaG9va1xuICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eVswXSA9PT0gJy0nKSB7XG4gICAgICAgIGlmIChwYXJlbnRab25lW19wcm9wZXJ0eV0pIHtcbiAgICAgICAgICB6b25lW19wcm9wZXJ0eV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkYXRhW3Byb3BlcnR5XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudFpvbmVbX3Byb3BlcnR5XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZVtfcHJvcGVydHldID0gZGF0YVtwcm9wZXJ0eV07XG4gICAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBuZXcgem9uZSdzIGhvb2sgKHJlcGxhY2luZyB0aGUgcGFyZW50IHpvbmUncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHpvbmVbcHJvcGVydHldID0gKHR5cGVvZiBkYXRhW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhW3Byb3BlcnR5XSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB6b25lLiRpZCA9ICg8YW55PlpvbmUpLm5leHRJZCsrO1xuXG4gICAgcmV0dXJuIHpvbmU7XG4gIH1cblxuICBmb3JrKGxvY2Fscz8pIHtcbiAgICB0aGlzLm9uWm9uZUNyZWF0ZWQoKTtcbiAgICByZXR1cm4gbmV3IFpvbmUodGhpcywgbG9jYWxzKTtcbiAgfVxuXG4gIGJpbmQoZm4sIHNraXBFbnF1ZXVlPykge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0aW5nIGZ1bmN0aW9uIGdvdDogJyArIGZuKTtcbiAgICB9XG4gICAgc2tpcEVucXVldWUgfHwgdGhpcy5lbnF1ZXVlVGFzayhmbik7XG4gICAgdmFyIHpvbmUgPSB0aGlzLmlzUm9vdFpvbmUoKSA/IHRoaXMgOiB0aGlzLmZvcmsoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gem9uZUJvdW5kRm4oKSB7XG4gICAgICByZXR1cm4gem9uZS5ydW4oZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vLyBAZGVwcmVjYXRlZFxuICBiaW5kT25jZShmbikge1xuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdiaW5kT25jZScsICdUaGVyZSBpcyBubyByZXBsYWNlbWVudC4nKTtcbiAgICB2YXIgYm91bmRab25lID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgYm91bmRab25lLmRlcXVldWVUYXNrKGZuKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gIH1cblxuICBpc1Jvb3Rab25lKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gbnVsbDtcbiAgfVxuXG4gIHJ1bihmbiwgYXBwbHlUbz8sIGFwcGx5V2l0aD8pIHtcbiAgICBhcHBseVdpdGggPSBhcHBseVdpdGggfHwgW107XG5cbiAgICB2YXIgb2xkWm9uZSA9IGdsb2JhbC56b25lO1xuXG4gICAgLy8gTUFLRSBUSElTIFpPTkUgVEhFIENVUlJFTlQgWk9ORVxuICAgIGdsb2JhbC56b25lID0gdGhpcztcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmJlZm9yZVRhc2soKTtcbiAgICAgIHJldHVybiBmbi5hcHBseShhcHBseVRvLCBhcHBseVdpdGgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICh0aGlzLm9uRXJyb3IpIHtcbiAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5hZnRlclRhc2soKTtcbiAgICAgIC8vIFJFVkVSVCBUSEUgQ1VSUkVOVCBaT05FIEJBQ0sgVE8gVEhFIE9SSUdJTkFMIFpPTkVcbiAgICAgIGdsb2JhbC56b25lID0gb2xkWm9uZTtcbiAgICB9XG4gIH1cblxuICAvLyBvbkVycm9yIGlzIHVzZWQgdG8gb3ZlcnJpZGUgZXJyb3IgaGFuZGxpbmcuXG4gIC8vIFdoZW4gYSBjdXN0b20gZXJyb3IgaGFuZGxlciBpcyBwcm92aWRlZCwgaXQgc2hvdWxkIG1vc3QgcHJvYmFibHkgcmV0aHJvdyB0aGUgZXhjZXB0aW9uXG4gIC8vIG5vdCB0byBicmVhayB0aGUgZXhwZWN0ZWQgY29udHJvbCBmbG93OlxuICAvL1xuICAvLyBgcHJvbWlzZS50aGVuKGZuVGhhdFRocm93cykuY2F0Y2goZm4pO2BcbiAgLy9cbiAgLy8gV2hlbiB0aGlzIGNvZGUgaXMgZXhlY3V0ZWQgaW4gYSB6b25lIHdpdGggYSBjdXN0b20gb25FcnJvciBoYW5kbGVyIHRoYXQgZG9lc24ndCByZXRocm93LCB0aGVcbiAgLy8gYC5jYXRjaCgpYCBicmFuY2ggd2lsbCBub3QgYmUgdGFrZW4gYXMgdGhlIGBmblRoYXRUaHJvd3NgIGV4Y2VwdGlvbiB3aWxsIGJlIHN3YWxsb3dlZCBieSB0aGVcbiAgLy8gaGFuZGxlci5cbiAgb25FcnJvciA9IG51bGw7XG4gIGJlZm9yZVRhc2soKSB7fVxuICBvblpvbmVDcmVhdGVkKCkge31cbiAgYWZ0ZXJUYXNrKCkge31cbiAgXG4gIGVucXVldWVUYXNrKGZuOiBGdW5jdGlvbikge1xuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdlbnF1ZXVlVGFzaycsICdVc2UgYWRkVGFzay9hZGRSZXBlYXRpbmdUYXNrL2FkZE1pY3JvVGFzaycpO1xuICB9XG4gIGRlcXVldWVUYXNrKGZuOiBGdW5jdGlvbikge1xuICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdkZXF1ZXVlVGFzaycsICdVc2UgcmVtb3ZlVGFzay9yZW1vdmVSZXBlYXRpbmdUYXNrL3JlbW92ZU1pY3JvVGFzaycpO1xuICB9XG5cbiAgYWRkVGFzayh0YXNrRm4pIHsgdGhpcy5lbnF1ZXVlVGFzayh0YXNrRm4pOyB9XG4gIHJlbW92ZVRhc2sodGFza0ZuKSB7IHRoaXMuZGVxdWV1ZVRhc2sodGFza0ZuKTsgfVxuXG4gIGFkZFJlcGVhdGluZ1Rhc2sodGFza0ZuKSB7IHRoaXMuZW5xdWV1ZVRhc2sodGFza0ZuKTsgfVxuICByZW1vdmVSZXBlYXRpbmdUYXNrKHRhc2tGbikgeyB0aGlzLmRlcXVldWVUYXNrKHRhc2tGbik7IH1cblxuICBhZGRNaWNyb3Rhc2sodGFza0ZuKSB7IHRoaXMuZW5xdWV1ZVRhc2sodGFza0ZuKTsgfVxuICByZW1vdmVNaWNyb3Rhc2sodGFza0ZuKSB7IHRoaXMuZGVxdWV1ZVRhc2sodGFza0ZuKTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNba2V5cy5jb21tb24uYWRkRXZlbnRMaXN0ZW5lcl0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNba2V5cy5jb21tb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcl0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufTtcblxuIl19
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Creates keys for `private` properties on exposed objects to minimize interactions with other codebases.
	 */
	function create(name) {
	    // `Symbol` implementation is broken in Chrome 39.0.2171, do not use them even if they are available
	    return '_zone$' + name;
	}
	exports.create = create;
	exports.common = {
	    addEventListener: create('addEventListener'),
	    removeEventListener: create('removeEventListener')
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9rZXlzLnRzIl0sIm5hbWVzIjpbImNyZWF0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxnQkFBdUIsSUFBSTtJQUN6QkEsb0dBQW9HQTtJQUNwR0EsTUFBTUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0E7QUFDekJBLENBQUNBO0FBSGUsY0FBTSxTQUdyQixDQUFBO0FBRVUsY0FBTSxHQUFHO0lBQ2xCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM1QyxtQkFBbUIsRUFBRSxNQUFNLENBQUMscUJBQXFCLENBQUM7Q0FDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlcyBrZXlzIGZvciBgcHJpdmF0ZWAgcHJvcGVydGllcyBvbiBleHBvc2VkIG9iamVjdHMgdG8gbWluaW1pemUgaW50ZXJhY3Rpb25zIHdpdGggb3RoZXIgY29kZWJhc2VzLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUobmFtZSkge1xuICAvLyBgU3ltYm9sYCBpbXBsZW1lbnRhdGlvbiBpcyBicm9rZW4gaW4gQ2hyb21lIDM5LjAuMjE3MSwgZG8gbm90IHVzZSB0aGVtIGV2ZW4gaWYgdGhleSBhcmUgYXZhaWxhYmxlXG4gIHJldHVybiAnX3pvbmUkJyArIG5hbWU7XG59XG5cbmV4cG9ydCB2YXIgY29tbW9uID0ge1xuICBhZGRFdmVudExpc3RlbmVyOiBjcmVhdGUoJ2FkZEV2ZW50TGlzdGVuZXInKSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogY3JlYXRlKCdyZW1vdmVFdmVudExpc3RlbmVyJylcbn07XG4iXX0=

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(9);
	if (global.Promise) {
	    exports.bindPromiseFn = function (delegate) {
	        return function () {
	            var delegatePromise = delegate.apply(this, arguments);
	            // if the delegate returned an instance of Promise, forward it.
	            if (delegatePromise instanceof Promise) {
	                return delegatePromise;
	            }
	            // Otherwise wrap the Promise-like in a global Promise
	            return new Promise(function (resolve, reject) {
	                delegatePromise.then(resolve, reject);
	            });
	        };
	    };
	}
	else {
	    exports.bindPromiseFn = function (delegate) {
	        return function () {
	            return _patchThenable(delegate.apply(this, arguments));
	        };
	    };
	}
	function _patchPromiseFnsOnObject(objectPath, fnNames) {
	    var obj = global;
	    var exists = objectPath.every(function (segment) {
	        obj = obj[segment];
	        return obj;
	    });
	    if (!exists) {
	        return;
	    }
	    fnNames.forEach(function (name) {
	        var fn = obj[name];
	        if (fn) {
	            obj[name] = exports.bindPromiseFn(fn);
	        }
	    });
	}
	function _patchThenable(thenable) {
	    var then = thenable.then;
	    thenable.then = function () {
	        var args = utils.bindArguments(arguments);
	        var nextThenable = then.apply(thenable, args);
	        return _patchThenable(nextThenable);
	    };
	    var ocatch = thenable.catch;
	    thenable.catch = function () {
	        var args = utils.bindArguments(arguments);
	        var nextThenable = ocatch.apply(thenable, args);
	        return _patchThenable(nextThenable);
	    };
	    return thenable;
	}
	function apply() {
	    // Patch .then() and .catch() on native Promises to execute callbacks in the zone where
	    // those functions are called.
	    if (global.Promise) {
	        utils.patchPrototype(Promise.prototype, [
	            'then',
	            'catch'
	        ]);
	        // Patch browser APIs that return a Promise
	        var patchFns = [
	            // fetch
	            [[], ['fetch']],
	            [['Response', 'prototype'], ['arrayBuffer', 'blob', 'json', 'text']]
	        ];
	        patchFns.forEach(function (objPathAndFns) {
	            _patchPromiseFnsOnObject(objPathAndFns[0], objPathAndFns[1]);
	        });
	    }
	}
	exports.apply = apply;
	module.exports = {
	    apply: apply,
	    bindPromiseFn: exports.bindPromiseFn
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9wcm9taXNlLnRzIl0sIm5hbWVzIjpbIl9wYXRjaFByb21pc2VGbnNPbk9iamVjdCIsIl9wYXRjaFRoZW5hYmxlIiwiYXBwbHkiXSwibWFwcGluZ3MiOiJBQUFBLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBdUJsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuQixxQkFBYSxHQUFHLFVBQVUsUUFBUTtRQUNoQyxNQUFNLENBQUM7WUFDTCxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV0RCwrREFBK0Q7WUFDL0QsRUFBRSxDQUFDLENBQUMsZUFBZSxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDekIsQ0FBQztZQUVELHNEQUFzRDtZQUN0RCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtnQkFDekMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixxQkFBYSxHQUFHLFVBQVUsUUFBUTtRQUNoQyxNQUFNLENBQUM7WUFDTCxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUdELGtDQUFrQyxVQUFVLEVBQUUsT0FBTztJQUNuREEsSUFBSUEsR0FBR0EsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFFakJBLElBQUlBLE1BQU1BLEdBQUdBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLFVBQVVBLE9BQU9BO1FBQzdDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFFSEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDWkEsTUFBTUEsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsSUFBSUE7UUFDNUIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcscUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDQSxDQUFDQTtBQUNMQSxDQUFDQTtBQUVELHdCQUF3QixRQUFRO0lBQzlCQyxJQUFJQSxJQUFJQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUN6QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0E7UUFDZCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDQTtJQUVGQSxJQUFJQSxNQUFNQSxHQUFHQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUM1QkEsUUFBUUEsQ0FBQ0EsS0FBS0EsR0FBR0E7UUFDZixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDQTtJQUVGQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtBQUNsQkEsQ0FBQ0E7QUFHRDtJQUNFQyx1RkFBdUZBO0lBQ3ZGQSw4QkFBOEJBO0lBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuQkEsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUE7WUFDdENBLE1BQU1BO1lBQ05BLE9BQU9BO1NBQ1JBLENBQUNBLENBQUNBO1FBRUhBLDJDQUEyQ0E7UUFDM0NBLElBQUlBLFFBQVFBLEdBQUdBO1lBQ2JBLFFBQVFBO1lBQ1JBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ2ZBLENBQUNBLENBQUNBLFVBQVVBLEVBQUVBLFdBQVdBLENBQUNBLEVBQUVBLENBQUNBLGFBQWFBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1NBQ3JFQSxDQUFDQTtRQUVGQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFTQSxhQUFhQTtZQUNyQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtBQUNIQSxDQUFDQTtBQXBCZSxhQUFLLFFBb0JwQixDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLEtBQUssRUFBRSxLQUFLO0lBQ1osYUFBYSxFQUFFLHFCQUFhO0NBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5cbi8qXG4gKiBQYXRjaGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZS1saWtlIGluc3RhbmNlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gbXVzdCBiZSB1c2VkIHdoZW4gZWl0aGVyOlxuICogLSBOYXRpdmUgUHJvbWlzZXMgYXJlIG5vdCBhdmFpbGFibGUsXG4gKiAtIFRoZSBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZS1saWtlIG9iamVjdC5cbiAqXG4gKiBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2Ugem9uZXMgcmVseSBvbiBhIFByb21pc2UgbW9ua2V5IHBhdGNoIHRoYXQgY291bGQgbm90IGJlIGFwcGxpZWQgd2hlblxuICogUHJvbWlzZSBpcyBub3QgbmF0aXZlbHkgYXZhaWxhYmxlIG9yIHdoZW4gdGhlIHJldHVybmVkIG9iamVjdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUHJvbWlzZS5cbiAqXG4gKiBOb3RlIHRoYXQgY2FsbGluZyBgYmluZFByb21pc2VGbmAgb24gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBuYXRpdmUgUHJvbWlzZSB3aWxsIGFsc28gd29ya1xuICogd2l0aCBtaW5pbWFsIG92ZXJoZWFkLlxuICpcbiAqIGBgYFxuICogdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kUHJvbWlzZUZuKEZ1bmN0aW9uUmV0dXJuaW5nQVByb21pc2UpO1xuICpcbiAqIGJvdW5kRnVuY3Rpb24udGhlbihzdWNjZXNzSGFuZGxlciwgZXJyb3JIYW5kbGVyKTtcbiAqIGBgYFxuICovXG5leHBvcnQgdmFyIGJpbmRQcm9taXNlRm47XG5cbmlmIChnbG9iYWwuUHJvbWlzZSkge1xuICBiaW5kUHJvbWlzZUZuID0gZnVuY3Rpb24gKGRlbGVnYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlbGVnYXRlUHJvbWlzZSA9IGRlbGVnYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgIC8vIGlmIHRoZSBkZWxlZ2F0ZSByZXR1cm5lZCBhbiBpbnN0YW5jZSBvZiBQcm9taXNlLCBmb3J3YXJkIGl0LlxuICAgICAgaWYgKGRlbGVnYXRlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGRlbGVnYXRlUHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIHdyYXAgdGhlIFByb21pc2UtbGlrZSBpbiBhIGdsb2JhbCBQcm9taXNlXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGRlbGVnYXRlUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufSBlbHNlIHtcbiAgYmluZFByb21pc2VGbiA9IGZ1bmN0aW9uIChkZWxlZ2F0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3BhdGNoVGhlbmFibGUoZGVsZWdhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBfcGF0Y2hQcm9taXNlRm5zT25PYmplY3Qob2JqZWN0UGF0aCwgZm5OYW1lcykge1xuICB2YXIgb2JqID0gZ2xvYmFsO1xuXG4gIHZhciBleGlzdHMgPSBvYmplY3RQYXRoLmV2ZXJ5KGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgb2JqID0gb2JqW3NlZ21lbnRdO1xuICAgIHJldHVybiBvYmo7XG4gIH0pO1xuXG4gIGlmICghZXhpc3RzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm5OYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGZuID0gb2JqW25hbWVdO1xuICAgIGlmIChmbikge1xuICAgICAgb2JqW25hbWVdID0gYmluZFByb21pc2VGbihmbik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX3BhdGNoVGhlbmFibGUodGhlbmFibGUpIHtcbiAgdmFyIHRoZW4gPSB0aGVuYWJsZS50aGVuO1xuICB0aGVuYWJsZS50aGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gdXRpbHMuYmluZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgIHZhciBuZXh0VGhlbmFibGUgPSB0aGVuLmFwcGx5KHRoZW5hYmxlLCBhcmdzKTtcbiAgICByZXR1cm4gX3BhdGNoVGhlbmFibGUobmV4dFRoZW5hYmxlKTtcbiAgfTtcblxuICB2YXIgb2NhdGNoID0gdGhlbmFibGUuY2F0Y2g7XG4gIHRoZW5hYmxlLmNhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gdXRpbHMuYmluZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgIHZhciBuZXh0VGhlbmFibGUgPSBvY2F0Y2guYXBwbHkodGhlbmFibGUsIGFyZ3MpO1xuICAgIHJldHVybiBfcGF0Y2hUaGVuYWJsZShuZXh0VGhlbmFibGUpO1xuICB9O1xuXG4gIHJldHVybiB0aGVuYWJsZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIC8vIFBhdGNoIC50aGVuKCkgYW5kIC5jYXRjaCgpIG9uIG5hdGl2ZSBQcm9taXNlcyB0byBleGVjdXRlIGNhbGxiYWNrcyBpbiB0aGUgem9uZSB3aGVyZVxuICAvLyB0aG9zZSBmdW5jdGlvbnMgYXJlIGNhbGxlZC5cbiAgaWYgKGdsb2JhbC5Qcm9taXNlKSB7XG4gICAgdXRpbHMucGF0Y2hQcm90b3R5cGUoUHJvbWlzZS5wcm90b3R5cGUsIFtcbiAgICAgICd0aGVuJyxcbiAgICAgICdjYXRjaCdcbiAgICBdKTtcblxuICAgIC8vIFBhdGNoIGJyb3dzZXIgQVBJcyB0aGF0IHJldHVybiBhIFByb21pc2VcbiAgICB2YXIgcGF0Y2hGbnMgPSBbXG4gICAgICAvLyBmZXRjaFxuICAgICAgW1tdLCBbJ2ZldGNoJ11dLFxuICAgICAgW1snUmVzcG9uc2UnLCAncHJvdG90eXBlJ10sIFsnYXJyYXlCdWZmZXInLCAnYmxvYicsICdqc29uJywgJ3RleHQnXV1cbiAgICBdO1xuXG4gICAgcGF0Y2hGbnMuZm9yRWFjaChmdW5jdGlvbihvYmpQYXRoQW5kRm5zKSB7XG4gICAgICBfcGF0Y2hQcm9taXNlRm5zT25PYmplY3Qob2JqUGF0aEFuZEZuc1swXSwgb2JqUGF0aEFuZEZuc1sxXSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFwcGx5OiBhcHBseSxcbiAgYmluZFByb21pc2VGbjogYmluZFByb21pc2VGblxufTtcbiJdfQ==
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var keys = __webpack_require__(7);
	function bindArguments(args) {
	    for (var i = args.length - 1; i >= 0; i--) {
	        if (typeof args[i] === 'function') {
	            args[i] = global.zone.bind(args[i]);
	        }
	    }
	    return args;
	}
	exports.bindArguments = bindArguments;
	;
	function patchPrototype(obj, fnNames) {
	    fnNames.forEach(function (name) {
	        var delegate = obj[name];
	        if (delegate) {
	            obj[name] = function () {
	                return delegate.apply(this, bindArguments(arguments));
	            };
	        }
	    });
	}
	exports.patchPrototype = patchPrototype;
	;
	function isWebWorker() {
	    return (typeof document === "undefined");
	}
	exports.isWebWorker = isWebWorker;
	function patchProperty(obj, prop) {
	    var desc = Object.getOwnPropertyDescriptor(obj, prop) || {
	        enumerable: true,
	        configurable: true
	    };
	    // A property descriptor cannot have getter/setter and be writable
	    // deleting the writable and value properties avoids this error:
	    //
	    // TypeError: property descriptors must not specify a value or be writable when a
	    // getter or setter has been specified
	    delete desc.writable;
	    delete desc.value;
	    // substr(2) cuz 'onclick' -> 'click', etc
	    var eventName = prop.substr(2);
	    var _prop = '_' + prop;
	    desc.set = function (fn) {
	        if (this[_prop]) {
	            this.removeEventListener(eventName, this[_prop]);
	        }
	        if (typeof fn === 'function') {
	            this[_prop] = fn;
	            this.addEventListener(eventName, fn, false);
	        }
	        else {
	            this[_prop] = null;
	        }
	    };
	    desc.get = function () {
	        return this[_prop];
	    };
	    Object.defineProperty(obj, prop, desc);
	}
	exports.patchProperty = patchProperty;
	;
	function patchProperties(obj, properties) {
	    (properties || (function () {
	        var props = [];
	        for (var prop in obj) {
	            props.push(prop);
	        }
	        return props;
	    }()).
	        filter(function (propertyName) {
	        return propertyName.substr(0, 2) === 'on';
	    })).
	        forEach(function (eventName) {
	        patchProperty(obj, eventName);
	    });
	}
	exports.patchProperties = patchProperties;
	;
	var originalFnKey = keys.create('originalFn');
	var boundFnsKey = keys.create('boundFns');
	function patchEventTargetMethods(obj) {
	    // This is required for the addEventListener hook on the root zone.
	    obj[keys.common.addEventListener] = obj.addEventListener;
	    obj.addEventListener = function (eventName, handler, useCapturing) {
	        //Ignore special listeners of IE11 & Edge dev tools, see https://github.com/angular/zone.js/issues/150
	        if (handler && handler.toString() !== "[object FunctionWrapper]") {
	            var eventType = eventName + (useCapturing ? '$capturing' : '$bubbling');
	            var fn;
	            if (handler.handleEvent) {
	                // Have to pass in 'handler' reference as an argument here, otherwise it gets clobbered in
	                // IE9 by the arguments[1] assignment at end of this function.
	                fn = (function (handler) {
	                    return function () {
	                        handler.handleEvent.apply(handler, arguments);
	                    };
	                })(handler);
	            }
	            else {
	                fn = handler;
	            }
	            handler[originalFnKey] = fn;
	            handler[boundFnsKey] = handler[boundFnsKey] || {};
	            handler[boundFnsKey][eventType] = handler[boundFnsKey][eventType] || global.zone.bind(fn);
	            arguments[1] = handler[boundFnsKey][eventType];
	        }
	        // - Inside a Web Worker, `this` is undefined, the context is `global` (= `self`)
	        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
	        // see https://github.com/angular/zone.js/issues/190
	        var target = this || global;
	        return global.zone.addEventListener.apply(target, arguments);
	    };
	    // This is required for the removeEventListener hook on the root zone.
	    obj[keys.common.removeEventListener] = obj.removeEventListener;
	    obj.removeEventListener = function (eventName, handler, useCapturing) {
	        var eventType = eventName + (useCapturing ? '$capturing' : '$bubbling');
	        if (handler && handler[boundFnsKey] && handler[boundFnsKey][eventType]) {
	            var _bound = handler[boundFnsKey];
	            arguments[1] = _bound[eventType];
	            delete _bound[eventType];
	            global.zone.dequeueTask(handler[originalFnKey]);
	        }
	        // - Inside a Web Worker, `this` is undefined, the context is `global`
	        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
	        // see https://github.com/angular/zone.js/issues/190
	        var target = this || global;
	        var result = global.zone.removeEventListener.apply(target, arguments);
	        return result;
	    };
	}
	exports.patchEventTargetMethods = patchEventTargetMethods;
	;
	var originalInstanceKey = keys.create('originalInstance');
	// wrap some native API on `window`
	function patchClass(className) {
	    var OriginalClass = global[className];
	    if (!OriginalClass)
	        return;
	    global[className] = function () {
	        var a = bindArguments(arguments);
	        switch (a.length) {
	            case 0:
	                this[originalInstanceKey] = new OriginalClass();
	                break;
	            case 1:
	                this[originalInstanceKey] = new OriginalClass(a[0]);
	                break;
	            case 2:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
	                break;
	            case 3:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
	                break;
	            case 4:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
	                break;
	            default: throw new Error('what are you even doing?');
	        }
	    };
	    var instance = new OriginalClass();
	    var prop;
	    for (prop in instance) {
	        (function (prop) {
	            if (typeof instance[prop] === 'function') {
	                global[className].prototype[prop] = function () {
	                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
	                };
	            }
	            else {
	                Object.defineProperty(global[className].prototype, prop, {
	                    set: function (fn) {
	                        if (typeof fn === 'function') {
	                            this[originalInstanceKey][prop] = global.zone.bind(fn);
	                        }
	                        else {
	                            this[originalInstanceKey][prop] = fn;
	                        }
	                    },
	                    get: function () {
	                        return this[originalInstanceKey][prop];
	                    }
	                });
	            }
	        }(prop));
	    }
	    for (prop in OriginalClass) {
	        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
	            global[className][prop] = OriginalClass[prop];
	        }
	    }
	}
	exports.patchClass = patchClass;
	;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOlsiYmluZEFyZ3VtZW50cyIsInBhdGNoUHJvdG90eXBlIiwiaXNXZWJXb3JrZXIiLCJwYXRjaFByb3BlcnR5IiwicGF0Y2hQcm9wZXJ0aWVzIiwicGF0Y2hFdmVudFRhcmdldE1ldGhvZHMiLCJwYXRjaENsYXNzIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFZLElBQUksV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUUvQix1QkFBOEIsSUFBSTtJQUNoQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7UUFDMUNBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7QUFDZEEsQ0FBQ0E7QUFQZSxxQkFBYSxnQkFPNUIsQ0FBQTtBQUFBLENBQUM7QUFFRix3QkFBK0IsR0FBRyxFQUFFLE9BQU87SUFDekNDLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLElBQUlBO1FBQzVCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNWLE1BQU0s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O0FBQ0hBLENBQUNBO0FBL0NlLGtCQUFVLGFBK0N6QixDQUFBO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGtleXMgZnJvbSAnLi9rZXlzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBcmd1bWVudHMoYXJncykge1xuICBmb3IgKHZhciBpID0gYXJncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmICh0eXBlb2YgYXJnc1tpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYXJnc1tpXSA9IGdsb2JhbC56b25lLmJpbmQoYXJnc1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcmdzO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoUHJvdG90eXBlKG9iaiwgZm5OYW1lcykge1xuICBmbk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGVsZWdhdGUgPSBvYmpbbmFtZV07XG4gICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICBvYmpbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZWxlZ2F0ZS5hcHBseSh0aGlzLCBiaW5kQXJndW1lbnRzKGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2ViV29ya2VyKCkge1xuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaFByb3BlcnR5KG9iaiwgcHJvcCkge1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKSB8fCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfTtcblxuICAvLyBBIHByb3BlcnR5IGRlc2NyaXB0b3IgY2Fubm90IGhhdmUgZ2V0dGVyL3NldHRlciBhbmQgYmUgd3JpdGFibGVcbiAgLy8gZGVsZXRpbmcgdGhlIHdyaXRhYmxlIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzIGF2b2lkcyB0aGlzIGVycm9yOlxuICAvL1xuICAvLyBUeXBlRXJyb3I6IHByb3BlcnR5IGRlc2NyaXB0b3JzIG11c3Qgbm90IHNwZWNpZnkgYSB2YWx1ZSBvciBiZSB3cml0YWJsZSB3aGVuIGFcbiAgLy8gZ2V0dGVyIG9yIHNldHRlciBoYXMgYmVlbiBzcGVjaWZpZWRcbiAgZGVsZXRlIGRlc2Mud3JpdGFibGU7XG4gIGRlbGV0ZSBkZXNjLnZhbHVlO1xuXG4gIC8vIHN1YnN0cigyKSBjdXogJ29uY2xpY2snIC0+ICdjbGljaycsIGV0Y1xuICB2YXIgZXZlbnROYW1lID0gcHJvcC5zdWJzdHIoMik7XG4gIHZhciBfcHJvcCA9ICdfJyArIHByb3A7XG5cbiAgZGVzYy5zZXQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodGhpc1tfcHJvcF0pIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXNbX3Byb3BdKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzW19wcm9wXSA9IGZuO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1tfcHJvcF0gPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBkZXNjLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpc1tfcHJvcF07XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVzYyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hQcm9wZXJ0aWVzKG9iaiwgcHJvcGVydGllcz8pIHtcbiAgKHByb3BlcnRpZXMgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwcm9wcyA9IFtdO1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgcHJvcHMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9wcztcbiAgICB9KCkpLlxuICAgIGZpbHRlcihmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XG4gICAgICByZXR1cm4gcHJvcGVydHlOYW1lLnN1YnN0cigwLDIpID09PSAnb24nO1xuICAgIH0pKS5cbiAgICBmb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgIHBhdGNoUHJvcGVydHkob2JqLCBldmVudE5hbWUpO1xuICAgIH0pO1xufTtcblxudmFyIG9yaWdpbmFsRm5LZXkgPSBrZXlzLmNyZWF0ZSgnb3JpZ2luYWxGbicpO1xudmFyIGJvdW5kRm5zS2V5ID0ga2V5cy5jcmVhdGUoJ2JvdW5kRm5zJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaEV2ZW50VGFyZ2V0TWV0aG9kcyhvYmopIHtcbiAgLy8gVGhpcyBpcyByZXF1aXJlZCBmb3IgdGhlIGFkZEV2ZW50TGlzdGVuZXIgaG9vayBvbiB0aGUgcm9vdCB6b25lLlxuICBvYmpba2V5cy5jb21tb24uYWRkRXZlbnRMaXN0ZW5lcl0gPSBvYmouYWRkRXZlbnRMaXN0ZW5lcjtcbiAgb2JqLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJpbmcpIHtcbiAgICAvL0lnbm9yZSBzcGVjaWFsIGxpc3RlbmVycyBvZiBJRTExICYgRWRnZSBkZXYgdG9vbHMsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci96b25lLmpzL2lzc3Vlcy8xNTBcbiAgICBpZiAoaGFuZGxlciAmJiBoYW5kbGVyLnRvU3RyaW5nKCkgIT09IFwiW29iamVjdCBGdW5jdGlvbldyYXBwZXJdXCIpIHtcbiAgICAgIHZhciBldmVudFR5cGUgPSBldmVudE5hbWUgKyAodXNlQ2FwdHVyaW5nID8gJyRjYXB0dXJpbmcnIDogJyRidWJibGluZycpO1xuICAgICAgdmFyIGZuO1xuICAgICAgaWYgKGhhbmRsZXIuaGFuZGxlRXZlbnQpIHtcbiAgICAgICAgLy8gSGF2ZSB0byBwYXNzIGluICdoYW5kbGVyJyByZWZlcmVuY2UgYXMgYW4gYXJndW1lbnQgaGVyZSwgb3RoZXJ3aXNlIGl0IGdldHMgY2xvYmJlcmVkIGluXG4gICAgICAgIC8vIElFOSBieSB0aGUgYXJndW1lbnRzWzFdIGFzc2lnbm1lbnQgYXQgZW5kIG9mIHRoaXMgZnVuY3Rpb24uXG4gICAgICAgIGZuID0gKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoYW5kbGVyLmhhbmRsZUV2ZW50LmFwcGx5KGhhbmRsZXIsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoaGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbiA9IGhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIGhhbmRsZXJbb3JpZ2luYWxGbktleV0gPSBmbjtcbiAgICAgIGhhbmRsZXJbYm91bmRGbnNLZXldID0gaGFuZGxlcltib3VuZEZuc0tleV0gfHwge307XG4gICAgICBoYW5kbGVyW2JvdW5kRm5zS2V5XVtldmVudFR5cGVdID0gaGFuZGxlcltib3VuZEZuc0tleV1bZXZlbnRUeXBlXSB8fCBnbG9iYWwuem9uZS5iaW5kKGZuKTtcbiAgICAgIGFyZ3VtZW50c1sxXSA9IGhhbmRsZXJbYm91bmRGbnNLZXldW2V2ZW50VHlwZV07XG4gICAgfVxuXG4gICAgLy8gLSBJbnNpZGUgYSBXZWIgV29ya2VyLCBgdGhpc2AgaXMgdW5kZWZpbmVkLCB0aGUgY29udGV4dCBpcyBgZ2xvYmFsYCAoPSBgc2VsZmApXG4gICAgLy8gLSBXaGVuIGBhZGRFdmVudExpc3RlbmVyYCBpcyBjYWxsZWQgb24gdGhlIGdsb2JhbCBjb250ZXh0IGluIHN0cmljdCBtb2RlLCBgdGhpc2AgaXMgdW5kZWZpbmVkXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzE5MFxuICAgIHZhciB0YXJnZXQgPSB0aGlzIHx8IGdsb2JhbDtcbiAgICByZXR1cm4gZ2xvYmFsLnpvbmUuYWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyByZXF1aXJlZCBmb3IgdGhlIHJlbW92ZUV2ZW50TGlzdGVuZXIgaG9vayBvbiB0aGUgcm9vdCB6b25lLlxuICBvYmpba2V5cy5jb21tb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcl0gPSBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgb2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJpbmcpIHtcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZlbnROYW1lICsgKHVzZUNhcHR1cmluZyA/ICckY2FwdHVyaW5nJyA6ICckYnViYmxpbmcnKTtcbiAgICBpZiAoaGFuZGxlciAmJiBoYW5kbGVyW2JvdW5kRm5zS2V5XSAmJiBoYW5kbGVyW2JvdW5kRm5zS2V5XVtldmVudFR5cGVdKSB7XG4gICAgICB2YXIgX2JvdW5kID0gaGFuZGxlcltib3VuZEZuc0tleV07XG4gICAgICBhcmd1bWVudHNbMV0gPSBfYm91bmRbZXZlbnRUeXBlXTtcbiAgICAgIGRlbGV0ZSBfYm91bmRbZXZlbnRUeXBlXTtcbiAgICAgIGdsb2JhbC56b25lLmRlcXVldWVUYXNrKGhhbmRsZXJbb3JpZ2luYWxGbktleV0pO1xuICAgIH1cblxuICAgIC8vIC0gSW5zaWRlIGEgV2ViIFdvcmtlciwgYHRoaXNgIGlzIHVuZGVmaW5lZCwgdGhlIGNvbnRleHQgaXMgYGdsb2JhbGBcbiAgICAvLyAtIFdoZW4gYGFkZEV2ZW50TGlzdGVuZXJgIGlzIGNhbGxlZCBvbiB0aGUgZ2xvYmFsIGNvbnRleHQgaW4gc3RyaWN0IG1vZGUsIGB0aGlzYCBpcyB1bmRlZmluZWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvMTkwXG4gICAgdmFyIHRhcmdldCA9IHRoaXMgfHwgZ2xvYmFsO1xuICAgIHZhciByZXN1bHQgPSBnbG9iYWwuem9uZS5yZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRhcmdldCwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxudmFyIG9yaWdpbmFsSW5zdGFuY2VLZXkgPSBrZXlzLmNyZWF0ZSgnb3JpZ2luYWxJbnN0YW5jZScpO1xuXG4vLyB3cmFwIHNvbWUgbmF0aXZlIEFQSSBvbiBgd2luZG93YFxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoQ2xhc3MoY2xhc3NOYW1lKSB7XG4gIHZhciBPcmlnaW5hbENsYXNzID0gZ2xvYmFsW2NsYXNzTmFtZV07XG4gIGlmICghT3JpZ2luYWxDbGFzcykgcmV0dXJuO1xuXG4gIGdsb2JhbFtjbGFzc05hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhID0gYmluZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgIHN3aXRjaCAoYS5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKCk7IGJyZWFrO1xuICAgICAgY2FzZSAxOiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoYVswXSk7IGJyZWFrO1xuICAgICAgY2FzZSAyOiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoYVswXSwgYVsxXSk7IGJyZWFrO1xuICAgICAgY2FzZSAzOiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoYVswXSwgYVsxXSwgYVsyXSk7IGJyZWFrO1xuICAgICAgY2FzZSA0OiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoYVswXSwgYVsxXSwgYVsyXSwgYVszXSk7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd3aGF0IGFyZSB5b3UgZXZlbiBkb2luZz8nKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGluc3RhbmNlID0gbmV3IE9yaWdpbmFsQ2xhc3MoKTtcblxuICB2YXIgcHJvcDtcbiAgZm9yIChwcm9wIGluIGluc3RhbmNlKSB7XG4gICAgKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBpZiAodHlwZW9mIGluc3RhbmNlW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGdsb2JhbFtjbGFzc05hbWVdLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXS5hcHBseSh0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbFtjbGFzc05hbWVdLnByb3RvdHlwZSwgcHJvcCwge1xuICAgICAgICAgIHNldDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0gPSBnbG9iYWwuem9uZS5iaW5kKGZuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0gPSBmbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KHByb3ApKTtcbiAgfVxuXG4gIGZvciAocHJvcCBpbiBPcmlnaW5hbENsYXNzKSB7XG4gICAgaWYgKHByb3AgIT09ICdwcm90b3R5cGUnICYmIE9yaWdpbmFsQ2xhc3MuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGdsb2JhbFtjbGFzc05hbWVdW3Byb3BdID0gT3JpZ2luYWxDbGFzc1twcm9wXTtcbiAgICB9XG4gIH1cbn07XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var fnPatch = __webpack_require__(11);
	var promisePatch = __webpack_require__(8);
	var mutationObserverPatch = __webpack_require__(13);
	var definePropertyPatch = __webpack_require__(14);
	var registerElementPatch = __webpack_require__(15);
	var eventTargetPatch = __webpack_require__(16);
	var propertyDescriptorPatch = __webpack_require__(17);
	var geolocationPatch = __webpack_require__(19);
	var fileReaderPatch = __webpack_require__(20);
	function apply() {
	    fnPatch.patchSetClearFunction(global, global.Zone, [
	        ['setTimeout', 'clearTimeout', false, false],
	        ['setInterval', 'clearInterval', true, false],
	        ['setImmediate', 'clearImmediate', false, false],
	        ['requestAnimationFrame', 'cancelAnimationFrame', false, true],
	        ['mozRequestAnimationFrame', 'mozCancelAnimationFrame', false, true],
	        ['webkitRequestAnimationFrame', 'webkitCancelAnimationFrame', false, true]
	    ]);
	    fnPatch.patchFunction(global, [
	        'alert',
	        'prompt'
	    ]);
	    eventTargetPatch.apply();
	    propertyDescriptorPatch.apply();
	    promisePatch.apply();
	    mutationObserverPatch.patchClass('MutationObserver');
	    mutationObserverPatch.patchClass('WebKitMutationObserver');
	    definePropertyPatch.apply();
	    registerElementPatch.apply();
	    geolocationPatch.apply();
	    fileReaderPatch.apply();
	}
	exports.apply = apply;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9icm93c2VyLnRzIl0sIm5hbWVzIjpbImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFZLE9BQU8sV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUN2QyxJQUFZLFlBQVksV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUMxQyxJQUFZLHFCQUFxQixXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDN0QsSUFBWSxtQkFBbUIsV0FBTSxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pELElBQVksb0JBQW9CLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUUzRCxJQUFZLGdCQUFnQixXQUFNLGdCQUFnQixDQUFDLENBQUE7QUFDbkQsSUFBWSx1QkFBdUIsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pFLElBQVksZ0JBQWdCLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFDbEQsSUFBWSxlQUFlLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFFakQ7SUFDRUEsT0FBT0EsQ0FBQ0EscUJBQXFCQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQTtRQUNqREEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0E7UUFDNUNBLENBQUNBLGFBQWFBLEVBQUVBLGVBQWVBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLENBQUNBO1FBQzdDQSxDQUFDQSxjQUFjQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBO1FBQ2hEQSxDQUFDQSx1QkFBdUJBLEVBQUVBLHNCQUFzQkEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0E7UUFDOURBLENBQUNBLDBCQUEwQkEsRUFBRUEseUJBQXlCQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQTtRQUNwRUEsQ0FBQ0EsNkJBQTZCQSxFQUFFQSw0QkFBNEJBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBO0tBQzNFQSxDQUFDQSxDQUFDQTtJQUVIQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxFQUFFQTtRQUM1QkEsT0FBT0E7UUFDUEEsUUFBUUE7S0FDVEEsQ0FBQ0EsQ0FBQ0E7SUFFSEEsZ0JBQWdCQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUV6QkEsdUJBQXVCQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUVoQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7SUFFckJBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtJQUNyREEscUJBQXFCQSxDQUFDQSxVQUFVQSxDQUFDQSx3QkFBd0JBLENBQUNBLENBQUNBO0lBRTNEQSxtQkFBbUJBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO0lBRTVCQSxvQkFBb0JBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO0lBRTdCQSxnQkFBZ0JBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO0lBRXpCQSxlQUFlQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtBQUMxQkEsQ0FBQ0E7QUEvQmUsYUFBSyxRQStCcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZuUGF0Y2ggZnJvbSAnLi9mdW5jdGlvbnMnO1xuaW1wb3J0ICogYXMgcHJvbWlzZVBhdGNoIGZyb20gJy4vcHJvbWlzZSc7XG5pbXBvcnQgKiBhcyBtdXRhdGlvbk9ic2VydmVyUGF0Y2ggZnJvbSAnLi9tdXRhdGlvbi1vYnNlcnZlcic7XG5pbXBvcnQgKiBhcyBkZWZpbmVQcm9wZXJ0eVBhdGNoIGZyb20gJy4vZGVmaW5lLXByb3BlcnR5JztcbmltcG9ydCAqIGFzIHJlZ2lzdGVyRWxlbWVudFBhdGNoIGZyb20gJy4vcmVnaXN0ZXItZWxlbWVudCc7XG5pbXBvcnQgKiBhcyB3ZWJTb2NrZXRQYXRjaCBmcm9tICcuL3dlYnNvY2tldCc7XG5pbXBvcnQgKiBhcyBldmVudFRhcmdldFBhdGNoIGZyb20gJy4vZXZlbnQtdGFyZ2V0JztcbmltcG9ydCAqIGFzIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoIGZyb20gJy4vcHJvcGVydHktZGVzY3JpcHRvcic7XG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvblBhdGNoIGZyb20gJy4vZ2VvbG9jYXRpb24nO1xuaW1wb3J0ICogYXMgZmlsZVJlYWRlclBhdGNoIGZyb20gJy4vZmlsZS1yZWFkZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIGZuUGF0Y2gucGF0Y2hTZXRDbGVhckZ1bmN0aW9uKGdsb2JhbCwgZ2xvYmFsLlpvbmUsIFtcbiAgICBbJ3NldFRpbWVvdXQnLCAnY2xlYXJUaW1lb3V0JywgZmFsc2UsIGZhbHNlXSxcbiAgICBbJ3NldEludGVydmFsJywgJ2NsZWFySW50ZXJ2YWwnLCB0cnVlLCBmYWxzZV0sXG4gICAgWydzZXRJbW1lZGlhdGUnLCAnY2xlYXJJbW1lZGlhdGUnLCBmYWxzZSwgZmFsc2VdLFxuICAgIFsncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ2NhbmNlbEFuaW1hdGlvbkZyYW1lJywgZmFsc2UsIHRydWVdLFxuICAgIFsnbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ21vekNhbmNlbEFuaW1hdGlvbkZyYW1lJywgZmFsc2UsIHRydWVdLFxuICAgIFsnd2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ3dlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lJywgZmFsc2UsIHRydWVdXG4gIF0pO1xuXG4gIGZuUGF0Y2gucGF0Y2hGdW5jdGlvbihnbG9iYWwsIFtcbiAgICAnYWxlcnQnLFxuICAgICdwcm9tcHQnXG4gIF0pO1xuXG4gIGV2ZW50VGFyZ2V0UGF0Y2guYXBwbHkoKTtcblxuICBwcm9wZXJ0eURlc2NyaXB0b3JQYXRjaC5hcHBseSgpO1xuXG4gIHByb21pc2VQYXRjaC5hcHBseSgpO1xuXG4gIG11dGF0aW9uT2JzZXJ2ZXJQYXRjaC5wYXRjaENsYXNzKCdNdXRhdGlvbk9ic2VydmVyJyk7XG4gIG11dGF0aW9uT2JzZXJ2ZXJQYXRjaC5wYXRjaENsYXNzKCdXZWJLaXRNdXRhdGlvbk9ic2VydmVyJyk7XG5cbiAgZGVmaW5lUHJvcGVydHlQYXRjaC5hcHBseSgpO1xuXG4gIHJlZ2lzdGVyRWxlbWVudFBhdGNoLmFwcGx5KCk7XG5cbiAgZ2VvbG9jYXRpb25QYXRjaC5hcHBseSgpO1xuXG4gIGZpbGVSZWFkZXJQYXRjaC5hcHBseSgpO1xufVxuXG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var wtf = __webpack_require__(12);
	function patchSetClearFunction(window, Zone, fnNames) {
	    function patchMacroTaskMethod(setName, clearName, repeating, isRaf) {
	        var setNative = window[setName];
	        var clearNative = window[clearName];
	        var ids = {};
	        if (setNative) {
	            var wtfSetEventFn = wtf.createEvent('Zone#' + setName + '(uint32 zone, uint32 id, uint32 delay)');
	            var wtfClearEventFn = wtf.createEvent('Zone#' + clearName + '(uint32 zone, uint32 id)');
	            var wtfCallbackFn = wtf.createScope('Zone#cb:' + setName + '(uint32 zone, uint32 id, uint32 delay)');
	            // Forward all calls from the window through the zone.
	            window[setName] = function () {
	                return global.zone[setName].apply(global.zone, arguments);
	            };
	            window[clearName] = function () {
	                return global.zone[clearName].apply(global.zone, arguments);
	            };
	            // Set up zone processing for the set function.
	            Zone.prototype[setName] = function (fn, delay) {
	                // We need to save `fn` in var different then argument. This is because
	                // in IE9 `argument[0]` and `fn` have same identity, and assigning to
	                // `argument[0]` changes `fn`.
	                var callbackFn = fn;
	                if (typeof callbackFn !== 'function') {
	                    // force the error by calling the method with wrong args
	                    setNative.apply(window, arguments);
	                }
	                var zone = this;
	                var setId = null;
	                // wrap the callback function into the zone.
	                arguments[0] = function () {
	                    var callbackZone = zone.isRootZone() || isRaf ? zone : zone.fork();
	                    var callbackThis = this;
	                    var callbackArgs = arguments;
	                    return wtf.leaveScope(wtfCallbackFn(callbackZone.$id, setId, delay), callbackZone.run(function () {
	                        if (!repeating) {
	                            delete ids[setId];
	                            callbackZone.removeTask(callbackFn);
	                        }
	                        return callbackFn.apply(callbackThis, callbackArgs);
	                    }));
	                };
	                if (repeating) {
	                    zone.addRepeatingTask(callbackFn);
	                }
	                else {
	                    zone.addTask(callbackFn);
	                }
	                setId = setNative.apply(window, arguments);
	                ids[setId] = callbackFn;
	                wtfSetEventFn(zone.$id, setId, delay);
	                return setId;
	            };
	            Zone.prototype[setName + 'Unpatched'] = function () {
	                return setNative.apply(window, arguments);
	            };
	            // Set up zone processing for the clear function.
	            Zone.prototype[clearName] = function (id) {
	                wtfClearEventFn(this.$id, id);
	                if (ids.hasOwnProperty(id)) {
	                    var callbackFn = ids[id];
	                    delete ids[id];
	                    if (repeating) {
	                        this.removeRepeatingTask(callbackFn);
	                    }
	                    else {
	                        this.removeTask(callbackFn);
	                    }
	                }
	                return clearNative.apply(window, arguments);
	            };
	            Zone.prototype[clearName + 'Unpatched'] = function () {
	                return clearNative.apply(window, arguments);
	            };
	        }
	    }
	    fnNames.forEach(function (args) {
	        patchMacroTaskMethod.apply(null, args);
	    });
	}
	exports.patchSetClearFunction = patchSetClearFunction;
	;
	function patchFunction(obj, fnNames) {
	    fnNames.forEach(function (name) {
	        var delegate = obj[name];
	        global.zone[name] = function () {
	            return delegate.apply(obj, arguments);
	        };
	        obj[name] = function () {
	            return global.zone[name].apply(this, arguments);
	        };
	    });
	}
	exports.patchFunction = patchFunction;
	;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL2Z1bmN0aW9ucy50cyJdLCJuYW1lcyI6WyJwYXRjaFNldENsZWFyRnVuY3Rpb24iLCJwYXRjaFNldENsZWFyRnVuY3Rpb24ucGF0Y2hNYWNyb1Rhc2tNZXRob2QiLCJwYXRjaEZ1bmN0aW9uIl0sIm1hcHBpbmdzIjoiQUFDQSxJQUFZLEdBQUcsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU5QiwrQkFBc0MsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPO0lBQ3pEQSw4QkFBOEJBLE9BQU9BLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLEtBQUtBO1FBQ2hFQyxJQUFJQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNoQ0EsSUFBSUEsV0FBV0EsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDcENBLElBQUlBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1FBRWJBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2RBLElBQUlBLGFBQWFBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLEdBQUdBLHdDQUF3Q0EsQ0FBQ0EsQ0FBQ0E7WUFDbEdBLElBQUlBLGVBQWVBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEdBQUdBLFNBQVNBLEdBQUdBLDBCQUEwQkEsQ0FBQ0EsQ0FBQ0E7WUFDeEZBLElBQUlBLGFBQWFBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLEdBQUdBLE9BQU9BLEdBQUdBLHdDQUF3Q0EsQ0FBQ0EsQ0FBQ0E7WUFFckdBLHNEQUFzREE7WUFDdERBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBO2dCQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFP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QUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDVixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0E7QUFYZSxxQkFBYSxnQkFXNUIsQ0FBQTtBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgKiBhcyB3dGYgZnJvbSAnLi4vd3RmJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoU2V0Q2xlYXJGdW5jdGlvbih3aW5kb3csIFpvbmUsIGZuTmFtZXMpIHtcbiAgZnVuY3Rpb24gcGF0Y2hNYWNyb1Rhc2tNZXRob2Qoc2V0TmFtZSwgY2xlYXJOYW1lLCByZXBlYXRpbmcsIGlzUmFmKSB7XG4gICAgdmFyIHNldE5hdGl2ZSA9IHdpbmRvd1tzZXROYW1lXTtcbiAgICB2YXIgY2xlYXJOYXRpdmUgPSB3aW5kb3dbY2xlYXJOYW1lXTtcbiAgICB2YXIgaWRzID0ge307XG5cbiAgICBpZiAoc2V0TmF0aXZlKSB7XG4gICAgICB2YXIgd3RmU2V0RXZlbnRGbiA9IHd0Zi5jcmVhdGVFdmVudCgnWm9uZSMnICsgc2V0TmFtZSArICcodWludDMyIHpvbmUsIHVpbnQzMiBpZCwgdWludDMyIGRlbGF5KScpO1xuICAgICAgdmFyIHd0ZkNsZWFyRXZlbnRGbiA9IHd0Zi5jcmVhdGVFdmVudCgnWm9uZSMnICsgY2xlYXJOYW1lICsgJyh1aW50MzIgem9uZSwgdWludDMyIGlkKScpO1xuICAgICAgdmFyIHd0ZkNhbGxiYWNrRm4gPSB3dGYuY3JlYXRlU2NvcGUoJ1pvbmUjY2I6JyArIHNldE5hbWUgKyAnKHVpbnQzMiB6b25lLCB1aW50MzIgaWQsIHVpbnQzMiBkZWxheSknKTtcblxuICAgICAgLy8gRm9yd2FyZCBhbGwgY2FsbHMgZnJvbSB0aGUgd2luZG93IHRocm91Z2ggdGhlIHpvbmUuXG4gICAgICB3aW5kb3dbc2V0TmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWwuem9uZVtzZXROYW1lXS5hcHBseShnbG9iYWwuem9uZSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3dbY2xlYXJOYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbC56b25lW2NsZWFyTmFtZV0uYXBwbHkoZ2xvYmFsLnpvbmUsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG5cbiAgICAgIC8vIFNldCB1cCB6b25lIHByb2Nlc3NpbmcgZm9yIHRoZSBzZXQgZnVuY3Rpb24uXG4gICAgICBab25lLnByb3RvdHlwZVtzZXROYW1lXSA9IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBzYXZlIGBmbmAgaW4gdmFyIGRpZmZlcmVudCB0aGVuIGFyZ3VtZW50LiBUaGlzIGlzIGJlY2F1c2VcbiAgICAgICAgLy8gaW4gSUU5IGBhcmd1bWVudFswXWAgYW5kIGBmbmAgaGF2ZSBzYW1lIGlkZW50aXR5LCBhbmQgYXNzaWduaW5nIHRvXG4gICAgICAgIC8vIGBhcmd1bWVudFswXWAgY2hhbmdlcyBgZm5gLlxuICAgICAgICB2YXIgY2FsbGJhY2tGbiA9IGZuO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrRm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBmb3JjZSB0aGUgZXJyb3IgYnkgY2FsbGluZyB0aGUgbWV0aG9kIHdpdGggd3JvbmcgYXJnc1xuICAgICAgICAgIHNldE5hdGl2ZS5hcHBseSh3aW5kb3csIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHpvbmUgPSB0aGlzO1xuICAgICAgICB2YXIgc2V0SWQgPSBudWxsO1xuICAgICAgICAvLyB3cmFwIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpbnRvIHRoZSB6b25lLlxuICAgICAgICBhcmd1bWVudHNbMF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2FsbGJhY2tab25lID0gem9uZS5pc1Jvb3Rab25lKCkgfHwgaXNSYWYgPyB6b25lIDogem9uZS5mb3JrKCk7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrVGhpcyA9IHRoaXM7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrQXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICByZXR1cm4gd3RmLmxlYXZlU2NvcGUoXG4gICAgICAgICAgICAgIHd0ZkNhbGxiYWNrRm4oY2FsbGJhY2tab25lLiRpZCwgc2V0SWQsIGRlbGF5KSxcbiAgICAgICAgICAgICAgY2FsbGJhY2tab25lLnJ1bihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcGVhdGluZykge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGlkc1tzZXRJZF07XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja1pvbmUucmVtb3ZlVGFzayhjYWxsYmFja0ZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrRm4uYXBwbHkoY2FsbGJhY2tUaGlzLCBjYWxsYmFja0FyZ3MpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChyZXBlYXRpbmcpIHtcbiAgICAgICAgICB6b25lLmFkZFJlcGVhdGluZ1Rhc2soY2FsbGJhY2tGbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZS5hZGRUYXNrKGNhbGxiYWNrRm4pO1xuICAgICAgICB9XG4gICAgICAgIHNldElkID0gc2V0TmF0aXZlLmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKTtcbiAgICAgICAgaWRzW3NldElkXSA9IGNhbGxiYWNrRm47XG4gICAgICAgIHd0ZlNldEV2ZW50Rm4oem9uZS4kaWQsIHNldElkLCBkZWxheSk7XG4gICAgICAgIHJldHVybiBzZXRJZDtcbiAgICAgIH07XG5cbiAgICAgIFpvbmUucHJvdG90eXBlW3NldE5hbWUgKyAnVW5wYXRjaGVkJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNldE5hdGl2ZS5hcHBseSh3aW5kb3csIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG4gICAgICAvLyBTZXQgdXAgem9uZSBwcm9jZXNzaW5nIGZvciB0aGUgY2xlYXIgZnVuY3Rpb24uXG4gICAgICBab25lLnByb3RvdHlwZVtjbGVhck5hbWVdID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHd0ZkNsZWFyRXZlbnRGbih0aGlzLiRpZCwgaWQpO1xuICAgICAgICBpZiAoaWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgIHZhciBjYWxsYmFja0ZuID0gaWRzW2lkXTtcbiAgICAgICAgICBkZWxldGUgaWRzW2lkXTtcbiAgICAgICAgICBpZiAocmVwZWF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVJlcGVhdGluZ1Rhc2soY2FsbGJhY2tGbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFzayhjYWxsYmFja0ZuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFyTmF0aXZlLmFwcGx5KHdpbmRvdywgYXJndW1lbnRzKTtcbiAgICAgIH07XG5cbiAgICAgIFpvbmUucHJvdG90eXBlW2NsZWFyTmFtZSArICdVbnBhdGNoZWQnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2xlYXJOYXRpdmUuYXBwbHkod2luZG93LCBhcmd1bWVudHMpO1xuICAgICAgfTtcblxuICAgIH1cbiAgfVxuICBmbk5hbWVzLmZvckVhY2goZnVuY3Rpb24oYXJncykge1xuICAgIHBhdGNoTWFjcm9UYXNrTWV0aG9kLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaEZ1bmN0aW9uKG9iaiwgZm5OYW1lcykge1xuICBmbk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGVsZWdhdGUgPSBvYmpbbmFtZV07XG4gICAgZ2xvYmFsLnpvbmVbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGVsZWdhdGUuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBvYmpbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsLnpvbmVbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcbn07XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {// Detect and setup WTF.
	var wtfTrace = null;
	var wtfEvents = null;
	var wtfEnabled = (function () {
	    var wtf = global['wtf'];
	    if (wtf) {
	        wtfTrace = wtf['trace'];
	        if (wtfTrace) {
	            wtfEvents = wtfTrace['events'];
	            return true;
	        }
	    }
	    return false;
	})();
	function noop() {
	}
	exports.enabled = wtfEnabled;
	exports.createScope = wtfEnabled ? function (signature, flags) {
	    return wtfEvents.createScope(signature, flags);
	} : function (s, f) {
	    return noop;
	};
	exports.createEvent = wtfEnabled ? function (signature, flags) {
	    return wtfEvents.createInstance(signature, flags);
	} : function (s, f) {
	    return noop;
	};
	exports.leaveScope = wtfEnabled ? function (scope, returnValue) {
	    wtfTrace.leaveScope(scope, returnValue);
	    return returnValue;
	} : function (s, v) {
	    return v;
	};
	exports.beginTimeRange = wtfEnabled ? function (rangeType, action) {
	    return wtfTrace.beginTimeRange(rangeType, action);
	} : function (t, a) {
	    return null;
	};
	exports.endTimeRange = wtfEnabled ? function (range) {
	    wtfTrace.endTimeRange(range);
	} : function (r) {
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3RmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3d0Zi50cyJdLCJuYW1lcyI6WyJub29wIl0sIm1hcHBpbmdzIjoiQUFBQSx3QkFBd0I7QUFDeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixJQUFJLFVBQVUsR0FBRyxDQUFDO0lBQ2hCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1IsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMO0FBQ0FBLENBQUNBO0FBVVksZUFBTyxHQUFXLFVBQVUsQ0FBQztBQUM3QixtQkFBVyxHQUFnRCxVQUFVLEdBQUcsVUFBVSxTQUFTLEVBQUUsS0FBSztJQUM3RyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNXLG1CQUFXLEdBQXVELFVBQVUsR0FBRyxVQUFVLFNBQVMsRUFBRSxLQUFLO0lBQ3BILE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNwRCxDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBQ1csa0JBQVUsR0FBRyxVQUFVLEdBQUcsVUFBVSxLQUFnQixFQUFFLFdBQWU7SUFDaEYsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNyQixDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDO0FBQ1csc0JBQWMsR0FBRyxVQUFVLEdBQUcsVUFBVSxTQUFTLEVBQUUsTUFBTTtJQUNwRSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEQsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNXLG9CQUFZLEdBQUcsVUFBVSxHQUFHLFVBQVUsS0FBSztJQUN0RCxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDZixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXRlY3QgYW5kIHNldHVwIFdURi5cbnZhciB3dGZUcmFjZSA9IG51bGw7XG52YXIgd3RmRXZlbnRzID0gbnVsbDtcbnZhciB3dGZFbmFibGVkID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHd0ZiA9IGdsb2JhbFsnd3RmJ107XG4gIGlmICh3dGYpIHtcbiAgICB3dGZUcmFjZSA9IHd0ZlsndHJhY2UnXTtcbiAgICBpZiAod3RmVHJhY2UpIHtcbiAgICAgIHd0ZkV2ZW50cyA9IHd0ZlRyYWNlWydldmVudHMnXTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5mdW5jdGlvbiBub29wKCkge1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFd0ZlNjb3BlRm4ge1xuICAoLi4uYXJncyk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXdGZFdmVudEZuIHtcbiAgKC4uLmFyZ3MpOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBlbmFibGVkOmJvb2xlYW4gPSB3dGZFbmFibGVkO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNjb3BlOihzaWduYXR1cmU6c3RyaW5nLCBmbGFncz86YW55KSA9PiBXdGZTY29wZUZuID0gd3RmRW5hYmxlZCA/IGZ1bmN0aW9uIChzaWduYXR1cmUsIGZsYWdzKSB7XG4gIHJldHVybiB3dGZFdmVudHMuY3JlYXRlU2NvcGUoc2lnbmF0dXJlLCBmbGFncyk7XG59IDogZnVuY3Rpb24gKHMsIGYpIHtcbiAgcmV0dXJuIG5vb3A7XG59O1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUV2ZW50OiAoc2lnbmF0dXJlOiBzdHJpbmcsIGFjdGlvbj86IHN0cmluZykgPT4gV3RmRXZlbnRGbiA9IHd0ZkVuYWJsZWQgPyBmdW5jdGlvbiAoc2lnbmF0dXJlLCBmbGFncykge1xuICByZXR1cm4gd3RmRXZlbnRzLmNyZWF0ZUluc3RhbmNlKHNpZ25hdHVyZSwgZmxhZ3MpO1xufSA6IGZ1bmN0aW9uIChzLCBmKSB7XG4gIHJldHVybiBub29wO1xufTtcbmV4cG9ydCBjb25zdCBsZWF2ZVNjb3BlID0gd3RmRW5hYmxlZCA/IGZ1bmN0aW9uIChzY29wZTpXdGZTY29wZUZuLCByZXR1cm5WYWx1ZTphbnkpOmFueSB7XG4gIHd0ZlRyYWNlLmxlYXZlU2NvcGUoc2NvcGUsIHJldHVyblZhbHVlKTtcbiAgcmV0dXJuIHJldHVyblZhbHVlO1xufSA6IGZ1bmN0aW9uIChzLCB2KSB7XG4gIHJldHVybiB2O1xufTtcbmV4cG9ydCBjb25zdCBiZWdpblRpbWVSYW5nZSA9IHd0ZkVuYWJsZWQgPyBmdW5jdGlvbiAocmFuZ2VUeXBlLCBhY3Rpb24pIHtcbiAgcmV0dXJuIHd0ZlRyYWNlLmJlZ2luVGltZVJhbmdlKHJhbmdlVHlwZSwgYWN0aW9uKTtcbn0gOiBmdW5jdGlvbiAodCwgYSkge1xuICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgZW5kVGltZVJhbmdlID0gd3RmRW5hYmxlZCA/IGZ1bmN0aW9uIChyYW5nZSkge1xuICB3dGZUcmFjZS5lbmRUaW1lUmFuZ2UocmFuZ2UpO1xufSA6IGZ1bmN0aW9uIChyKSB7XG59O1xuIl19
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var keys = __webpack_require__(7);
	var originalInstanceKey = keys.create('originalInstance');
	var creationZoneKey = keys.create('creationZone');
	var isActiveKey = keys.create('isActive');
	// wrap some native API on `window`
	function patchClass(className) {
	    var OriginalClass = global[className];
	    if (!OriginalClass)
	        return;
	    global[className] = function (fn) {
	        this[originalInstanceKey] = new OriginalClass(global.zone.bind(fn, true));
	        // Remember where the class was instantiate to execute the enqueueTask and dequeueTask hooks
	        this[creationZoneKey] = global.zone;
	    };
	    var instance = new OriginalClass(function () { });
	    global[className].prototype.disconnect = function () {
	        var result = this[originalInstanceKey].disconnect.apply(this[originalInstanceKey], arguments);
	        if (this[isActiveKey]) {
	            this[creationZoneKey].dequeueTask();
	            this[isActiveKey] = false;
	        }
	        return result;
	    };
	    global[className].prototype.observe = function () {
	        if (!this[isActiveKey]) {
	            this[creationZoneKey].enqueueTask();
	            this[isActiveKey] = true;
	        }
	        return this[originalInstanceKey].observe.apply(this[originalInstanceKey], arguments);
	    };
	    var prop;
	    for (prop in instance) {
	        (function (prop) {
	            if (typeof global[className].prototype !== 'undefined') {
	                return;
	            }
	            if (typeof instance[prop] === 'function') {
	                global[className].prototype[prop] = function () {
	                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
	                };
	            }
	            else {
	                Object.defineProperty(global[className].prototype, prop, {
	                    set: function (fn) {
	                        if (typeof fn === 'function') {
	                            this[originalInstanceKey][prop] = global.zone.bind(fn);
	                        }
	                        else {
	                            this[originalInstanceKey][prop] = fn;
	                        }
	                    },
	                    get: function () {
	                        return this[originalInstanceKey][prop];
	                    }
	                });
	            }
	        }(prop));
	    }
	}
	exports.patchClass = patchClass;
	;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcGF0Y2gvbXV0YXRpb24tb2JzZXJ2ZXIudHMiXSwibmFtZXMiOlsicGF0Y2hDbGFzcyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxJQUFJLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFaEMsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDMUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTFDLG1DQUFtQztBQUNuQyxvQkFBMkIsU0FBUztJQUNsQ0EsSUFBSUEsYUFBYUEsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDdENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLGFBQWFBLENBQUNBO1FBQUNBLE1BQU1BLENBQUNBO0lBRTNCQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxVQUFVQSxFQUFFQTtRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRSw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQyxDQUFDQTtJQUVGQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxhQUFhQSxDQUFDQSxjQUFhLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFFakRBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBO1FBQ3ZDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUNBO0lBRUZBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLEdBQUdBO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDQTtJQUVGQSxJQUFJQSxJQUFJQSxDQUFDQTtJQUNUQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0EsVUFBVUEsSUFBSUE7WUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3JGLENBQUMsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO29CQUN2RCxHQUFHLEVBQUUsVUFBVSxFQUFFO3dCQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDdkMsQ0FBQztvQkFDSCxDQUFDO29CQUNELEdBQUcsRUFBRTt3QkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLENBQUM7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDWEEsQ0FBQ0E7QUFDSEEsQ0FBQ0E7QUF2RGUsa0JBQVUsYUF1RHpCLENBQUE7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMga2V5cyBmcm9tICcuLi9rZXlzJztcblxudmFyIG9yaWdpbmFsSW5zdGFuY2VLZXkgPSBrZXlzLmNyZWF0ZSgnb3JpZ2luYWxJbnN0YW5jZScpO1xudmFyIGNyZWF0aW9uWm9uZUtleSA9IGtleXMuY3JlYXRlKCdjcmVhdGlvblpvbmUnKTtcbnZhciBpc0FjdGl2ZUtleSA9IGtleXMuY3JlYXRlKCdpc0FjdGl2ZScpO1xuXG4vLyB3cmFwIHNvbWUgbmF0aXZlIEFQSSBvbiBgd2luZG93YFxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoQ2xhc3MoY2xhc3NOYW1lKSB7XG4gIHZhciBPcmlnaW5hbENsYXNzID0gZ2xvYmFsW2NsYXNzTmFtZV07XG4gIGlmICghT3JpZ2luYWxDbGFzcykgcmV0dXJuO1xuXG4gIGdsb2JhbFtjbGFzc05hbWVdID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGdsb2JhbC56b25lLmJpbmQoZm4sIHRydWUpKTtcbiAgICAvLyBSZW1lbWJlciB3aGVyZSB0aGUgY2xhc3Mgd2FzIGluc3RhbnRpYXRlIHRvIGV4ZWN1dGUgdGhlIGVucXVldWVUYXNrIGFuZCBkZXF1ZXVlVGFzayBob29rc1xuICAgIHRoaXNbY3JlYXRpb25ab25lS2V5XSA9IGdsb2JhbC56b25lO1xuICB9O1xuXG4gIHZhciBpbnN0YW5jZSA9IG5ldyBPcmlnaW5hbENsYXNzKGZ1bmN0aW9uICgpIHt9KTtcblxuICBnbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XS5kaXNjb25uZWN0LmFwcGx5KHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0sIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXNbaXNBY3RpdmVLZXldKSB7XG4gICAgICB0aGlzW2NyZWF0aW9uWm9uZUtleV0uZGVxdWV1ZVRhc2soKTtcbiAgICAgIHRoaXNbaXNBY3RpdmVLZXldID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgZ2xvYmFsW2NsYXNzTmFtZV0ucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzW2lzQWN0aXZlS2V5XSkge1xuICAgICAgdGhpc1tjcmVhdGlvblpvbmVLZXldLmVucXVldWVUYXNrKCk7XG4gICAgICB0aGlzW2lzQWN0aXZlS2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldLm9ic2VydmUuYXBwbHkodGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICB2YXIgcHJvcDtcbiAgZm9yIChwcm9wIGluIGluc3RhbmNlKSB7XG4gICAgKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBpZiAodHlwZW9mIGdsb2JhbFtjbGFzc05hbWVdLnByb3RvdHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBnbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0uYXBwbHkodGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gZ2xvYmFsLnpvbmUuYmluZChmbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gZm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfShwcm9wKSk7XG4gIH1cbn07XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(7);
	// might need similar for object.freeze
	// i regret nothing
	var _defineProperty = Object.defineProperty;
	var _getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var _create = Object.create;
	var unconfigurablesKey = keys.create('unconfigurables');
	function apply() {
	    Object.defineProperty = function (obj, prop, desc) {
	        if (isUnconfigurable(obj, prop)) {
	            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
	        }
	        if (prop !== 'prototype') {
	            desc = rewriteDescriptor(obj, prop, desc);
	        }
	        return _defineProperty(obj, prop, desc);
	    };
	    Object.defineProperties = function (obj, props) {
	        Object.keys(props).forEach(function (prop) {
	            Object.defineProperty(obj, prop, props[prop]);
	        });
	        return obj;
	    };
	    Object.create = function (obj, proto) {
	        if (typeof proto === 'object') {
	            Object.keys(proto).forEach(function (prop) {
	                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
	            });
	        }
	        return _create(obj, proto);
	    };
	    Object.getOwnPropertyDescriptor = function (obj, prop) {
	        var desc = _getOwnPropertyDescriptor(obj, prop);
	        if (isUnconfigurable(obj, prop)) {
	            desc.configurable = false;
	        }
	        return desc;
	    };
	}
	exports.apply = apply;
	;
	function _redefineProperty(obj, prop, desc) {
	    desc = rewriteDescriptor(obj, prop, desc);
	    return _defineProperty(obj, prop, desc);
	}
	exports._redefineProperty = _redefineProperty;
	;
	function isUnconfigurable(obj, prop) {
	    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
	}
	function rewriteDescriptor(obj, prop, desc) {
	    desc.configurable = true;
	    if (!desc.configurable) {
	        if (!obj[unconfigurablesKey]) {
	            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
	        }
	        obj[unconfigurablesKey][prop] = true;
	    }
	    return desc;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL2RlZmluZS1wcm9wZXJ0eS50cyJdLCJuYW1lcyI6WyJhcHBseSIsIl9yZWRlZmluZVByb3BlcnR5IiwiaXNVbmNvbmZpZ3VyYWJsZSIsInJld3JpdGVEZXNjcmlwdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFZLElBQUksV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVoQyx1Q0FBdUM7QUFDdkMsbUJBQW1CO0FBRW5CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDNUMsSUFBSSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUM7QUFDaEUsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM1QixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV4RDtJQUNFQSxNQUFNQSxDQUFDQSxjQUFjQSxHQUFHQSxVQUFVQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUNBO0lBRUZBLE1BQU1BLENBQUNBLGdCQUFnQkEsR0FB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Jy4uL2tleXMnO1xuXG4vLyBtaWdodCBuZWVkIHNpbWlsYXIgZm9yIG9iamVjdC5mcmVlemVcbi8vIGkgcmVncmV0IG5vdGhpbmdcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciB1bmNvbmZpZ3VyYWJsZXNLZXkgPSBrZXlzLmNyZWF0ZSgndW5jb25maWd1cmFibGVzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseSgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgZGVzYykge1xuICAgIGlmIChpc1VuY29uZmlndXJhYmxlKG9iaiwgcHJvcCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBhc3NpZ24gdG8gcmVhZCBvbmx5IHByb3BlcnR5IFxcJycgKyBwcm9wICsgJ1xcJyBvZiAnICsgb2JqKTtcbiAgICB9XG4gICAgaWYgKHByb3AgIT09ICdwcm90b3R5cGUnKSB7XG4gICAgICBkZXNjID0gcmV3cml0ZURlc2NyaXB0b3Iob2JqLCBwcm9wLCBkZXNjKTtcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwgcHJvcHMpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgcHJvcHNbcHJvcF0pO1xuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgT2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChvYmosIHByb3RvKSB7XG4gICAgaWYgKHR5cGVvZiBwcm90byA9PT0gJ29iamVjdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3RvKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHByb3RvW3Byb3BdID0gcmV3cml0ZURlc2NyaXB0b3Iob2JqLCBwcm9wLCBwcm90b1twcm9wXSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGUob2JqLCBwcm90byk7XG4gIH07XG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICB2YXIgZGVzYyA9IF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcbiAgICBpZiAoaXNVbmNvbmZpZ3VyYWJsZShvYmosIHByb3ApKSB7XG4gICAgICBkZXNjLmNvbmZpZ3VyYWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZGVzYztcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfcmVkZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2MpIHtcbiAgZGVzYyA9IHJld3JpdGVEZXNjcmlwdG9yKG9iaiwgcHJvcCwgZGVzYyk7XG4gIHJldHVybiBfZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZXNjKTtcbn07XG5cbmZ1bmN0aW9uIGlzVW5jb25maWd1cmFibGUgKG9iaiwgcHJvcCkge1xuICByZXR1cm4gb2JqICYmIG9ialt1bmNvbmZpZ3VyYWJsZXNLZXldICYmIG9ialt1bmNvbmZpZ3VyYWJsZXNLZXldW3Byb3BdO1xufVxuXG5mdW5jdGlvbiByZXdyaXRlRGVzY3JpcHRvciAob2JqLCBwcm9wLCBkZXNjKSB7XG4gIGRlc2MuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgaWYgKCFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgIGlmICghb2JqW3VuY29uZmlndXJhYmxlc0tleV0pIHtcbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShvYmosIHVuY29uZmlndXJhYmxlc0tleSwgeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHt9IH0pO1xuICAgIH1cbiAgICBvYmpbdW5jb25maWd1cmFibGVzS2V5XVtwcm9wXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGRlc2M7XG59XG5cblxuIl19

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var define_property_1 = __webpack_require__(14);
	var utils = __webpack_require__(9);
	function apply() {
	    if (utils.isWebWorker() || !('registerElement' in global.document)) {
	        return;
	    }
	    var _registerElement = document.registerElement;
	    var callbacks = [
	        'createdCallback',
	        'attachedCallback',
	        'detachedCallback',
	        'attributeChangedCallback'
	    ];
	    document.registerElement = function (name, opts) {
	        if (opts && opts.prototype) {
	            callbacks.forEach(function (callback) {
	                if (opts.prototype.hasOwnProperty(callback)) {
	                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
	                    if (descriptor && descriptor.value) {
	                        descriptor.value = global.zone.bind(descriptor.value);
	                        define_property_1._redefineProperty(opts.prototype, callback, descriptor);
	                    }
	                    else {
	                        opts.prototype[callback] = global.zone.bind(opts.prototype[callback]);
	                    }
	                }
	                else if (opts.prototype[callback]) {
	                    opts.prototype[callback] = global.zone.bind(opts.prototype[callback]);
	                }
	            });
	        }
	        return _registerElement.apply(document, [name, opts]);
	    };
	}
	exports.apply = apply;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9yZWdpc3Rlci1lbGVtZW50LnRzIl0sIm5hbWVzIjpbImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0MsbUJBQW1CLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUVsQztJQUNFQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxpQkFBaUJBLElBQVVBLE1BQU9BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFFQSxNQUFNQSxDQUFDQTtJQUNUQSxDQUFDQTtJQUVEQSxJQUFJQSxnQkFBZ0JBLEdBQVNBLFFBQVNBLENBQUNBLGVBQWVBLENBQUNBO0lBQ3ZEQSxJQUFJQSxTQUFTQSxHQUFHQTtRQUNkQSxpQkFBaUJBO1FBQ2pCQSxrQkFBa0JBO1FBQ2xCQSxrQkFBa0JBO1FBQ2xCQSwwQkFBMEJBO0tBQzNCQSxDQUFDQTtJQUVJQSxRQUFTQSxDQUFDQSxlQUFlQSxHQUFHQSxVQUFVQSxJQUFJQSxFQUFFQSxJQUFJQTtRQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLFFBQVE7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzNFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3RELG1DQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUMxRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDQTtBQUNKQSxDQUFDQTtBQWhDZSxhQUFLLFFBZ0NwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtfcmVkZWZpbmVQcm9wZXJ0eX0gZnJvbSAnLi9kZWZpbmUtcHJvcGVydHknO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIGlmICh1dGlscy5pc1dlYldvcmtlcigpIHx8ICEoJ3JlZ2lzdGVyRWxlbWVudCcgaW4gKDxhbnk+Z2xvYmFsKS5kb2N1bWVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX3JlZ2lzdGVyRWxlbWVudCA9ICg8YW55PmRvY3VtZW50KS5yZWdpc3RlckVsZW1lbnQ7XG4gIHZhciBjYWxsYmFja3MgPSBbXG4gICAgJ2NyZWF0ZWRDYWxsYmFjaycsXG4gICAgJ2F0dGFjaGVkQ2FsbGJhY2snLFxuICAgICdkZXRhY2hlZENhbGxiYWNrJyxcbiAgICAnYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJ1xuICBdO1xuXG4gICg8YW55PmRvY3VtZW50KS5yZWdpc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAobmFtZSwgb3B0cykge1xuICAgIGlmIChvcHRzICYmIG9wdHMucHJvdG90eXBlKSB7XG4gICAgICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG9wdHMucHJvdG90eXBlLmhhc093blByb3BlcnR5KGNhbGxiYWNrKSkge1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcHRzLnByb3RvdHlwZSwgY2FsbGJhY2spO1xuICAgICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWUpIHtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBnbG9iYWwuem9uZS5iaW5kKGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgICAgICAgX3JlZGVmaW5lUHJvcGVydHkob3B0cy5wcm90b3R5cGUsIGNhbGxiYWNrLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0cy5wcm90b3R5cGVbY2FsbGJhY2tdID0gZ2xvYmFsLnpvbmUuYmluZChvcHRzLnByb3RvdHlwZVtjYWxsYmFja10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLnByb3RvdHlwZVtjYWxsYmFja10pIHtcbiAgICAgICAgICBvcHRzLnByb3RvdHlwZVtjYWxsYmFja10gPSBnbG9iYWwuem9uZS5iaW5kKG9wdHMucHJvdG90eXBlW2NhbGxiYWNrXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBfcmVnaXN0ZXJFbGVtZW50LmFwcGx5KGRvY3VtZW50LCBbbmFtZSwgb3B0c10pO1xuICB9O1xufVxuIl19
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	var utils = __webpack_require__(9);
	function apply() {
	    // patched properties depend on addEventListener, so this needs to come first
	    if (global.EventTarget) {
	        utils.patchEventTargetMethods(global.EventTarget.prototype);
	    }
	    else {
	        var apis = [
	            'ApplicationCache',
	            'EventSource',
	            'FileReader',
	            'InputMethodContext',
	            'MediaController',
	            'MessagePort',
	            'Node',
	            'Performance',
	            'SVGElementInstance',
	            'SharedWorker',
	            'TextTrack',
	            'TextTrackCue',
	            'TextTrackList',
	            'WebKitNamedFlow',
	            'Worker',
	            'WorkerGlobalScope',
	            'XMLHttpRequest',
	            'XMLHttpRequestEventTarget',
	            'XMLHttpRequestUpload'
	        ];
	        apis.forEach(function (api) {
	            var proto = global[api] && global[api].prototype;
	            // Some browsers e.g. Android 4.3's don't actually implement
	            // the EventTarget methods for all of these e.g. FileReader.
	            // In this case, there is nothing to patch.
	            if (proto && proto.addEventListener) {
	                utils.patchEventTargetMethods(proto);
	            }
	        });
	        // Patch the methods on `window` instead of `Window.prototype`
	        // `Window` is not accessible on Android 4.3
	        if (typeof (window) !== 'undefined') {
	            utils.patchEventTargetMethods(window);
	        }
	    }
	}
	exports.apply = apply;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdGFyZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL2V2ZW50LXRhcmdldC50cyJdLCJuYW1lcyI6WyJhcHBseSJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxLQUFLLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFFbEM7SUFDRUEsNkVBQTZFQTtJQUM3RUEsRUFBRUEsQ0FBQ0EsQ0FBT0EsTUFBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBT0EsTUFBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFJckVBLENBQUNBO0lBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ05BLElBQUlBLElBQUlBLEdBQUdBO1lBQ1RBLGtCQUFrQkE7WUFDbEJBLGFBQWFBO1lBQ2JBLFlBQVlBO1lBQ1pBLG9CQUFvQkE7WUFDcEJBLGlCQUFpQkE7WUFDakJBLGFBQWFBO1lBQ2JBLE1BQU1BO1lBQ05BLGFBQWFBO1lBQ2JBLG9CQUFvQkE7WUFDcEJBLGNBQWNBO1lBQ2RBLFdBQVdBO1lBQ1hBLGNBQWNBO1lBQ2RBLGVBQWVBO1lBQ2ZBLGlCQUFpQkE7WUFDakJBLFFBQVFBO1lBQ1JBLG1CQUFtQkE7WUFDbkJBLGdCQUFnQkE7WUFDaEJBLDJCQUEyQkE7WUFDM0JBLHNCQUFzQkE7U0FDdkJBLENBQUNBO1FBRUZBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFVBQVNBLEdBQUdBO1lBQ3ZCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRWpELDREQUE0RDtZQUM1RCw0REFBNEQ7WUFDNUQsMkNBQTJDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUMsQ0FBQ0EsQ0FBQ0E7UUFFSEEsOERBQThEQTtRQUM5REEsNENBQTRDQTtRQUM1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDeENBLENBQUNBO0lBQ0hBLENBQUNBO0FBQ0hBLENBQUNBO0FBL0NlLGFBQUssUUErQ3BCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KCkge1xuICAvLyBwYXRjaGVkIHByb3BlcnRpZXMgZGVwZW5kIG9uIGFkZEV2ZW50TGlzdGVuZXIsIHNvIHRoaXMgbmVlZHMgdG8gY29tZSBmaXJzdFxuICBpZiAoKDxhbnk+Z2xvYmFsKS5FdmVudFRhcmdldCkge1xuICAgIHV0aWxzLnBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKCg8YW55Pmdsb2JhbCkuRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcblxuICAvLyBOb3RlOiBFdmVudFRhcmdldCBpcyBub3QgYXZhaWxhYmxlIGluIGFsbCBicm93c2VycyxcbiAgLy8gaWYgaXQncyBub3QgYXZhaWxhYmxlLCB3ZSBpbnN0ZWFkIHBhdGNoIHRoZSBBUElzIGluIHRoZSBJREwgdGhhdCBpbmhlcml0IGZyb20gRXZlbnRUYXJnZXRcbiAgfSBlbHNlIHtcbiAgICB2YXIgYXBpcyA9IFtcbiAgICAgICdBcHBsaWNhdGlvbkNhY2hlJyxcbiAgICAgICdFdmVudFNvdXJjZScsXG4gICAgICAnRmlsZVJlYWRlcicsXG4gICAgICAnSW5wdXRNZXRob2RDb250ZXh0JyxcbiAgICAgICdNZWRpYUNvbnRyb2xsZXInLFxuICAgICAgJ01lc3NhZ2VQb3J0JyxcbiAgICAgICdOb2RlJyxcbiAgICAgICdQZXJmb3JtYW5jZScsXG4gICAgICAnU1ZHRWxlbWVudEluc3RhbmNlJyxcbiAgICAgICdTaGFyZWRXb3JrZXInLFxuICAgICAgJ1RleHRUcmFjaycsXG4gICAgICAnVGV4dFRyYWNrQ3VlJyxcbiAgICAgICdUZXh0VHJhY2tMaXN0JyxcbiAgICAgICdXZWJLaXROYW1lZEZsb3cnLFxuICAgICAgJ1dvcmtlcicsXG4gICAgICAnV29ya2VyR2xvYmFsU2NvcGUnLFxuICAgICAgJ1hNTEh0dHBSZXF1ZXN0JyxcbiAgICAgICdYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0JyxcbiAgICAgICdYTUxIdHRwUmVxdWVzdFVwbG9hZCdcbiAgICBdO1xuXG4gICAgYXBpcy5mb3JFYWNoKGZ1bmN0aW9uKGFwaSkge1xuICAgICAgdmFyIHByb3RvID0gZ2xvYmFsW2FwaV0gJiYgZ2xvYmFsW2FwaV0ucHJvdG90eXBlO1xuXG4gICAgICAvLyBTb21lIGJyb3dzZXJzIGUuZy4gQW5kcm9pZCA0LjMncyBkb24ndCBhY3R1YWxseSBpbXBsZW1lbnRcbiAgICAgIC8vIHRoZSBFdmVudFRhcmdldCBtZXRob2RzIGZvciBhbGwgb2YgdGhlc2UgZS5nLiBGaWxlUmVhZGVyLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCB0aGVyZSBpcyBub3RoaW5nIHRvIHBhdGNoLlxuICAgICAgaWYgKHByb3RvICYmIHByb3RvLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdXRpbHMucGF0Y2hFdmVudFRhcmdldE1ldGhvZHMocHJvdG8pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUGF0Y2ggdGhlIG1ldGhvZHMgb24gYHdpbmRvd2AgaW5zdGVhZCBvZiBgV2luZG93LnByb3RvdHlwZWBcbiAgICAvLyBgV2luZG93YCBpcyBub3QgYWNjZXNzaWJsZSBvbiBBbmRyb2lkIDQuM1xuICAgIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHV0aWxzLnBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKHdpbmRvdyk7XG4gICAgfVxuICB9XG59XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var webSocketPatch = __webpack_require__(18);
	var utils = __webpack_require__(9);
	var keys = __webpack_require__(7);
	var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'.split(' ');
	function apply() {
	    if (utils.isWebWorker()) {
	        // on WebWorker so don't apply patch
	        return;
	    }
	    var supportsWebSocket = typeof WebSocket !== 'undefined';
	    if (canPatchViaPropertyDescriptor()) {
	        // for browsers that we can patch the descriptor:  Chrome & Firefox
	        var onEventNames = eventNames.map(function (property) {
	            return 'on' + property;
	        });
	        utils.patchProperties(HTMLElement.prototype, onEventNames);
	        utils.patchProperties(XMLHttpRequest.prototype);
	        if (supportsWebSocket) {
	            utils.patchProperties(WebSocket.prototype);
	        }
	    }
	    else {
	        // Safari, Android browsers (Jelly Bean)
	        patchViaCapturingAllTheEvents();
	        utils.patchClass('XMLHttpRequest');
	        if (supportsWebSocket) {
	            webSocketPatch.apply();
	        }
	    }
	}
	exports.apply = apply;
	function canPatchViaPropertyDescriptor() {
	    if (!Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') && typeof Element !== 'undefined') {
	        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
	        // IDL interface attributes are not configurable
	        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
	        if (desc && !desc.configurable)
	            return false;
	    }
	    Object.defineProperty(HTMLElement.prototype, 'onclick', {
	        get: function () {
	            return true;
	        }
	    });
	    var elt = document.createElement('div');
	    var result = !!elt.onclick;
	    Object.defineProperty(HTMLElement.prototype, 'onclick', {});
	    return result;
	}
	;
	var unboundKey = keys.create('unbound');
	// Whenever any event fires, we check the event target and all parents
	// for `onwhatever` properties and replace them with zone-bound functions
	// - Chrome (for now)
	function patchViaCapturingAllTheEvents() {
	    eventNames.forEach(function (property) {
	        var onproperty = 'on' + property;
	        document.addEventListener(property, function (event) {
	            var elt = event.target, bound;
	            while (elt) {
	                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
	                    bound = global.zone.bind(elt[onproperty]);
	                    bound[unboundKey] = elt[onproperty];
	                    elt[onproperty] = bound;
	                }
	                elt = elt.parentElement;
	            }
	        }, true);
	    });
	}
	;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9wYXRjaC9wcm9wZXJ0eS1kZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbImFwcGx5IiwiY2FuUGF0Y2hWaWFQcm9wZXJ0eURlc2NyaXB0b3IiLCJwYXRjaFZpYUNhcHR1cmluZ0FsbFRoZUV2ZW50cyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxjQUFjLFdBQU0sYUFBYSxDQUFDLENBQUE7QUFDOUMsSUFBWSxLQUFLLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDbEMsSUFBWSxJQUFJLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFaEMsSUFBSSxVQUFVLEdBQUcsdW1CQUF1bUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFcG9CO0lBQ0VBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLENBQUFBLENBQUNBO1FBQ3ZCQSxvQ0FBb0NBO1FBQ3BDQSxNQUFNQSxDQUFDQTtJQUNUQSxDQUFDQTtJQUVEQSxJQUFJQSxpQkFBaUJBLEdBQUdBLE9BQU9BLFNBQVNBLEtBQUtBLFdBQVdBLENBQUNBO0lBQ3pEQSxFQUFFQSxDQUFDQSxDQUFDQSw2QkFBNkJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3BDQSxtRUFBbUVBO1FBQ25FQSxJQUFJQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxRQUFRQTtZQUNsRCxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUN6QixDQUFDLENBQUNBLENBQUNBO1FBQ0hBLEtBQUtBLENBQUNBLGVBQWVBLENBQUNBLFdBQVdBLENBQUNBLFNBQVNBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO1FBQzNEQSxLQUFLQSxDQUFDQSxlQUFlQSxDQUFDQSxjQUFjQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUNoREEsRUFBRUEsQ0FBQ0EsQ0FB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Q0FBQztRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0E7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgd2ViU29ja2V0UGF0Y2ggZnJvbSAnLi93ZWJzb2NrZXQnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0ICogYXMga2V5cyBmcm9tICcuLi9rZXlzJztcblxudmFyIGV2ZW50TmFtZXMgPSAnY29weSBjdXQgcGFzdGUgYWJvcnQgYmx1ciBmb2N1cyBjYW5wbGF5IGNhbnBsYXl0aHJvdWdoIGNoYW5nZSBjbGljayBjb250ZXh0bWVudSBkYmxjbGljayBkcmFnIGRyYWdlbmQgZHJhZ2VudGVyIGRyYWdsZWF2ZSBkcmFnb3ZlciBkcmFnc3RhcnQgZHJvcCBkdXJhdGlvbmNoYW5nZSBlbXB0aWVkIGVuZGVkIGlucHV0IGludmFsaWQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBsb2FkIGxvYWRlZGRhdGEgbG9hZGVkbWV0YWRhdGEgbG9hZHN0YXJ0IG1lc3NhZ2UgbW91c2Vkb3duIG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBtb3VzZW1vdmUgbW91c2VvdXQgbW91c2VvdmVyIG1vdXNldXAgcGF1c2UgcGxheSBwbGF5aW5nIHByb2dyZXNzIHJhdGVjaGFuZ2UgcmVzZXQgc2Nyb2xsIHNlZWtlZCBzZWVraW5nIHNlbGVjdCBzaG93IHN0YWxsZWQgc3VibWl0IHN1c3BlbmQgdGltZXVwZGF0ZSB2b2x1bWVjaGFuZ2Ugd2FpdGluZyBtb3pmdWxsc2NyZWVuY2hhbmdlIG1vemZ1bGxzY3JlZW5lcnJvciBtb3pwb2ludGVybG9ja2NoYW5nZSBtb3pwb2ludGVybG9ja2Vycm9yIGVycm9yIHdlYmdsY29udGV4dHJlc3RvcmVkIHdlYmdsY29udGV4dGxvc3Qgd2ViZ2xjb250ZXh0Y3JlYXRpb25lcnJvcicuc3BsaXQoJyAnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KCkge1xuICBpZiAodXRpbHMuaXNXZWJXb3JrZXIoKSl7XG4gICAgLy8gb24gV2ViV29ya2VyIHNvIGRvbid0IGFwcGx5IHBhdGNoXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN1cHBvcnRzV2ViU29ja2V0ID0gdHlwZW9mIFdlYlNvY2tldCAhPT0gJ3VuZGVmaW5lZCc7XG4gIGlmIChjYW5QYXRjaFZpYVByb3BlcnR5RGVzY3JpcHRvcigpKSB7XG4gICAgLy8gZm9yIGJyb3dzZXJzIHRoYXQgd2UgY2FuIHBhdGNoIHRoZSBkZXNjcmlwdG9yOiAgQ2hyb21lICYgRmlyZWZveFxuICAgIHZhciBvbkV2ZW50TmFtZXMgPSBldmVudE5hbWVzLm1hcChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiAnb24nICsgcHJvcGVydHk7XG4gICAgfSk7XG4gICAgdXRpbHMucGF0Y2hQcm9wZXJ0aWVzKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgb25FdmVudE5hbWVzKTtcbiAgICB1dGlscy5wYXRjaFByb3BlcnRpZXMoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlKTtcbiAgICBpZiAoc3VwcG9ydHNXZWJTb2NrZXQpIHtcbiAgICAgIHV0aWxzLnBhdGNoUHJvcGVydGllcyhXZWJTb2NrZXQucHJvdG90eXBlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gU2FmYXJpLCBBbmRyb2lkIGJyb3dzZXJzIChKZWxseSBCZWFuKVxuICAgIHBhdGNoVmlhQ2FwdHVyaW5nQWxsVGhlRXZlbnRzKCk7XG4gICAgdXRpbHMucGF0Y2hDbGFzcygnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICBpZiAoc3VwcG9ydHNXZWJTb2NrZXQpIHtcbiAgICAgIHdlYlNvY2tldFBhdGNoLmFwcGx5KCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhblBhdGNoVmlhUHJvcGVydHlEZXNjcmlwdG9yKCkge1xuICBpZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnb25jbGljaycpICYmIHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFdlYktpdCBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM0MzY0XG4gICAgLy8gSURMIGludGVyZmFjZSBhdHRyaWJ1dGVzIGFyZSBub3QgY29uZmlndXJhYmxlXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLCAnb25jbGljaycpO1xuICAgIGlmIChkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSkgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciByZXN1bHQgPSAhIWVsdC5vbmNsaWNrO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnb25jbGljaycsIHt9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciB1bmJvdW5kS2V5ID0ga2V5cy5jcmVhdGUoJ3VuYm91bmQnKTtcblxuLy8gV2hlbmV2ZXIgYW55IGV2ZW50IGZpcmVzLCB3ZSBjaGVjayB0aGUgZXZlbnQgdGFyZ2V0IGFuZCBhbGwgcGFyZW50c1xuLy8gZm9yIGBvbndoYXRldmVyYCBwcm9wZXJ0aWVzIGFuZCByZXBsYWNlIHRoZW0gd2l0aCB6b25lLWJvdW5kIGZ1bmN0aW9uc1xuLy8gLSBDaHJvbWUgKGZvciBub3cpXG5mdW5jdGlvbiBwYXRjaFZpYUNhcHR1cmluZ0FsbFRoZUV2ZW50cygpIHtcbiAgZXZlbnROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciBvbnByb3BlcnR5ID0gJ29uJyArIHByb3BlcnR5O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIocHJvcGVydHksIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIGVsdCA9IDxOb2RlPmV2ZW50LnRhcmdldCwgYm91bmQ7XG4gICAgICB3aGlsZSAoZWx0KSB7XG4gICAgICAgIGlmIChlbHRbb25wcm9wZXJ0eV0gJiYgIWVsdFtvbnByb3BlcnR5XVt1bmJvdW5kS2V5XSkge1xuICAgICAgICAgIGJvdW5kID0gZ2xvYmFsLnpvbmUuYmluZChlbHRbb25wcm9wZXJ0eV0pO1xuICAgICAgICAgIGJvdW5kW3VuYm91bmRLZXldID0gZWx0W29ucHJvcGVydHldO1xuICAgICAgICAgIGVsdFtvbnByb3BlcnR5XSA9IGJvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsdCA9IGVsdC5wYXJlbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH0sIHRydWUpO1xuICB9KTtcbn07XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(9);
	// we have to patch the instance since the proto is non-configurable
	function apply() {
	    var WS = global.WebSocket;
	    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
	    // On older Chrome, no need since EventTarget was already patched
	    if (!global.EventTarget) {
	        utils.patchEventTargetMethods(WS.prototype);
	    }
	    global.WebSocket = function (a, b) {
	        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
	        var proxySocket;
	        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
	        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
	        if (onmessageDesc && onmessageDesc.configurable === false) {
	            proxySocket = Object.create(socket);
	            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
	                proxySocket[propName] = function () {
	                    return socket[propName].apply(socket, arguments);
	                };
	            });
	        }
	        else {
	            // we can patch the real socket
	            proxySocket = socket;
	        }
	        utils.patchProperties(proxySocket, ['onclose', 'onerror', 'onmessage', 'onopen']);
	        return proxySocket;
	    };
	}
	exports.apply = apply;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3BhdGNoL3dlYnNvY2tldC50cyJdLCJuYW1lcyI6WyJhcHBseSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBWSxLQUFLLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFFbEMsb0VBQW9FO0FBQ3BFO0lBQ0VBLElBQUlBLEVBQUVBLEdBQVNBLE1BQU9BLENBQUNBLFNBQVNBLENBQUNBO0lBQ2pDQSx5RkFBeUZBO0lBQ3pGQSxpRUFBaUVBO0lBQ2pFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFPQSxNQUFPQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvQkEsS0FBS0EsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUM5Q0EsQ0FBQ0E7SUFDS0EsTUFBT0EsQ0FBQ0EsU0FBU0EsR0FBR0EsVUFBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDckMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksV0FBVyxDQUFDO1FBRWhCLGdHQUFnRztRQUNoRyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUTtnQkFDcEYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sK0JBQStCO1lBQy9CLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVsRixNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUMsQ0FBQ0E7QUFDSkEsQ0FBQ0E7QUE3QmUsYUFBSyxRQTZCcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuLy8gd2UgaGF2ZSB0byBwYXRjaCB0aGUgaW5zdGFuY2Ugc2luY2UgdGhlIHByb3RvIGlzIG5vbi1jb25maWd1cmFibGVcbmV4cG9ydCBmdW5jdGlvbiBhcHBseSgpIHtcbiAgdmFyIFdTID0gKDxhbnk+Z2xvYmFsKS5XZWJTb2NrZXQ7XG4gIC8vIE9uIFNhZmFyaSB3aW5kb3cuRXZlbnRUYXJnZXQgZG9lc24ndCBleGlzdCBzbyBuZWVkIHRvIHBhdGNoIFdTIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyXG4gIC8vIE9uIG9sZGVyIENocm9tZSwgbm8gbmVlZCBzaW5jZSBFdmVudFRhcmdldCB3YXMgYWxyZWFkeSBwYXRjaGVkXG4gIGlmICghKDxhbnk+Z2xvYmFsKS5FdmVudFRhcmdldCkge1xuICAgIHV0aWxzLnBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKFdTLnByb3RvdHlwZSk7XG4gIH1cbiAgKDxhbnk+Z2xvYmFsKS5XZWJTb2NrZXQgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHNvY2tldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gbmV3IFdTKGEsIGIpIDogbmV3IFdTKGEpO1xuICAgIHZhciBwcm94eVNvY2tldDtcblxuICAgIC8vIFNhZmFyaSA3LjAgaGFzIG5vbi1jb25maWd1cmFibGUgb3duICdvbm1lc3NhZ2UnIGFuZCBmcmllbmRzIHByb3BlcnRpZXMgb24gdGhlIHNvY2tldCBpbnN0YW5jZVxuICAgIHZhciBvbm1lc3NhZ2VEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb2NrZXQsICdvbm1lc3NhZ2UnKTtcbiAgICBpZiAob25tZXNzYWdlRGVzYyAmJiBvbm1lc3NhZ2VEZXNjLmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHByb3h5U29ja2V0ID0gT2JqZWN0LmNyZWF0ZShzb2NrZXQpO1xuICAgICAgWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCAnc2VuZCcsICdjbG9zZSddLmZvckVhY2goZnVuY3Rpb24ocHJvcE5hbWUpIHtcbiAgICAgICAgcHJveHlTb2NrZXRbcHJvcE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHNvY2tldFtwcm9wTmFtZV0uYXBwbHkoc29ja2V0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGNhbiBwYXRjaCB0aGUgcmVhbCBzb2NrZXRcbiAgICAgIHByb3h5U29ja2V0ID0gc29ja2V0O1xuICAgIH1cblxuICAgIHV0aWxzLnBhdGNoUHJvcGVydGllcyhwcm94eVNvY2tldCwgWydvbmNsb3NlJywgJ29uZXJyb3InLCAnb25tZXNzYWdlJywgJ29ub3BlbiddKTtcblxuICAgIHJldHVybiBwcm94eVNvY2tldDtcbiAgfTtcbn1cbiJdfQ==
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(9);
	function apply() {
	    if (global.navigator && global.navigator.geolocation) {
	        utils.patchPrototype(global.navigator.geolocation, [
	            'getCurrentPosition',
	            'watchPosition'
	        ]);
	    }
	}
	exports.apply = apply;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcGF0Y2gvZ2VvbG9jYXRpb24udHMiXSwibmFtZXMiOlsiYXBwbHkiXSwibWFwcGluZ3MiOiJBQUFBLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBRWxDO0lBQ0VBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLElBQUlBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3JEQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQTtZQUNqREEsb0JBQW9CQTtZQUNwQkEsZUFBZUE7U0FDaEJBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0FBQ0hBLENBQUNBO0FBUGUsYUFBSyxRQU9wQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoKSB7XG4gIGlmIChnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICB1dGlscy5wYXRjaFByb3RvdHlwZShnbG9iYWwubmF2aWdhdG9yLmdlb2xvY2F0aW9uLCBbXG4gICAgICAnZ2V0Q3VycmVudFBvc2l0aW9uJyxcbiAgICAgICd3YXRjaFBvc2l0aW9uJ1xuICAgIF0pO1xuICB9XG59XG4iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(9);
	function apply() {
	    utils.patchClass('FileReader');
	}
	exports.apply = apply;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1yZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcGF0Y2gvZmlsZS1yZWFkZXIudHMiXSwibmFtZXMiOlsiYXBwbHkiXSwibWFwcGluZ3MiOiJBQUFBLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBRWxDO0lBQ0VBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0FBQ2pDQSxDQUFDQTtBQUZlLGFBQUssUUFFcEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KCkge1xuICB1dGlscy5wYXRjaENsYXNzKCdGaWxlUmVhZGVyJyk7XG59XG4iXX0=

/***/ }
/******/ ]);