!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('2', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;

  var NativeCustomEvent = global.CustomEvent;

  function useNative() {
    try {
      var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
      return 'cat' === p.type && 'bar' === p.detail.foo;
    } catch (e) {}
    return false;
  }

  /**
   * Cross-browser `CustomEvent` constructor.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
   *
   * @public
   */

  module.exports = useNative() ? NativeCustomEvent :

  // IE >= 9
  'function' === typeof document.createEvent ? function CustomEvent(type, params) {
    var e = document.createEvent('CustomEvent');
    if (params) {
      e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
    } else {
      e.initCustomEvent(type, false, false, void 0);
    }
    return e;
  } :

  // IE <= 8
  function CustomEvent(type, params) {
    var e = document.createEventObject();
    e.type = type;
    if (params) {
      e.bubbles = Boolean(params.bubbles);
      e.cancelable = Boolean(params.cancelable);
      e.detail = params.detail;
    } else {
      e.bubbles = false;
      e.cancelable = false;
      e.detail = void 0;
    }
    return e;
  };
  return module.exports;
});
$__System.register("1", ["2"], function (_export, _context5) {
	"use strict";

	var CustomEvent, _regeneratorRuntime, _asyncToGenerator, NOT_LOADED, LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED, BOOTSTRAPPING, NOT_MOUNTED, MOUNTING, MOUNTED, UNMOUNTING, SKIP_BECAUSE_BROKEN, _extends, globalTimeoutConfig, toLoadPromise, toBootstrapPromise, toMountPromise, toUnmountPromise, Loader, capturedEventListeners, routingEventsListeningTo, originalAddEventListener, originalRemoveEventListener, originalPushState, originalReplaceState, hasInitialized, childApps, appChangeUnderway, peopleWaitingOnAppChange, started;

	function handleChildAppError(err, childApp) {
		var transformedErr = transformErr(err, childApp);

		if (window.SINGLE_SPA_TESTING) {
			console.error(transformedErr);
		} else {
			setTimeout(function () {
				throw transformedErr;
			});
		}
	}

	function transformErr(ogErr, childApp) {
		var errPrefix = "'" + childApp.name + "' died in status " + childApp.status + ": ";

		var result = void 0;

		if (ogErr instanceof Error) {
			ogErr.message = errPrefix + ogErr.message;
			result = ogErr;
		} else {
			console.warn("While " + childApp.status + ", '" + childApp.name + "' rejected its lifecycle function promise with a non-Error. This will cause stack traces to not be accurate.");
			try {
				result = new Error(errPrefix + JSON.stringify(ogErr));
			} catch (err) {
				// If it's not an Error and you can't stringify it, then what else can you even do to it?
				result = ogErr;
			}
		}

		return result;
	}

	// App statuses


	function isActive(app) {
		return app.status === MOUNTED;
	}

	function isntActive(app) {
		return !isActive(app);
	}

	function isLoaded(app) {
		return app.status !== NOT_LOADED && app.status !== LOADING_SOURCE_CODE;
	}

	function isntLoaded(app) {
		return !isLoaded(app);
	}

	function shouldBeActive(app) {
		try {
			return app.activeWhen(window.location);
		} catch (err) {
			handleChildAppError(err, app);
			app.status = SKIP_BECAUSE_BROKEN;
		}
	}

	function shouldntBeActive(app) {
		try {
			return !app.activeWhen(window.location);
		} catch (err) {
			handleChildAppError(err, app);
			app.status = SKIP_BECAUSE_BROKEN;
		}
	}

	function notSkipped(item) {
		return item !== SKIP_BECAUSE_BROKEN && (!item || item.status !== SKIP_BECAUSE_BROKEN);
	}

	function toName(app) {
		return app.name;
	}

	function setBootstrapMaxTime(time) {
		var dieOnTimeout = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		if (typeof time !== 'number' || time <= 0) {
			throw new Error('bootstrap max time must be a positive integer number of milliseconds');
		}

		globalTimeoutConfig.bootstrap = {
			millis: time,
			dieOnTimeout: dieOnTimeout
		};
	}

	function setMountMaxTime(time) {
		var dieOnTimeout = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		if (typeof time !== 'number' || time <= 0) {
			throw new Error('mount max time must be a positive integer number of milliseconds');
		}

		globalTimeoutConfig.mount = {
			millis: time,
			dieOnTimeout: dieOnTimeout
		};
	}

	function setUnmountMaxTime(time) {
		var dieOnTimeout = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		if (typeof time !== 'number' || time <= 0) {
			throw new Error('unmount max time must be a positive integer number of milliseconds');
		}

		globalTimeoutConfig.unmount = {
			millis: time,
			dieOnTimeout: dieOnTimeout
		};
	}

	function reasonableTime(promise, description, timeoutConfig, app) {
		var warningPeriod = 1000;

		return new Promise(function (resolve, reject) {
			var finished = false;
			var errored = false;

			promise.then(function (val) {
				finished = true;
				resolve(val);
			}).catch(function (val) {
				finished = true;
				reject(val);
			});

			setTimeout(function () {
				return maybeTimingOut(1);
			}, warningPeriod);
			setTimeout(function () {
				return maybeTimingOut(true);
			}, timeoutConfig.millis);

			function maybeTimingOut(shouldError) {
				if (!finished) {
					if (shouldError === true) {
						errored = true;
						if (timeoutConfig.dieOnTimeout) {
							reject(description + ' did not resolve or reject for ' + timeoutConfig.millis + ' milliseconds');
						} else {
							console.error(description + ' did not resolve or reject for ' + timeoutConfig.millis + ' milliseconds -- we\'re no longer going to warn you about it.');
							//don't resolve or reject, we're waiting this one out
						}
					} else if (!errored) {
						(function () {
							var numWarnings = shouldError;
							var numMillis = numWarnings * warningPeriod;
							console.warn(description + ' did not resolve or reject within ' + numMillis + ' milliseconds');
							if (numMillis + warningPeriod < timeoutConfig.millis) {
								setTimeout(function () {
									return maybeTimingOut(numWarnings + 1);
								}, warningPeriod);
							}
						})();
					}
				}
			}
		});
	}

	function ensureValidAppTimeouts() {
		var timeouts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		return _extends({}, globalTimeoutConfig, timeouts);
	}

	/* the array.prototype.find polyfill on npmjs.com is ~20kb (not worth it)
  * and lodash is ~200kb (not worth it)
  */

	function find(arr, func) {
		for (var i = 0; i < arr.length; i++) {
			if (func(arr[i])) {
				return arr[i];
			}
		}

		return null;
	}

	function validLifecycleFn(fn) {
		return fn && (typeof fn === 'function' || isArrayOfFns(fn));

		function isArrayOfFns(arr) {
			return Array.isArray(arr) && !find(arr, function (item) {
				return typeof item !== 'function';
			});
		}
	}

	function flattenFnArray(fns, description) {
		fns = Array.isArray(fns) ? fns : [fns];
		if (fns.length === 0) {
			fns = [function () {
				return Promise.resolve();
			}];
		}

		return function () {
			return new Promise(function (resolve, reject) {
				waitForPromises(0);

				function waitForPromises(index) {
					var promise = fns[index]();
					if (!(promise instanceof Promise)) {
						reject(description + ' at index ' + index + ' did not return a promise');
					} else {
						promise.then(function () {
							if (index === fns.length - 1) {
								resolve();
							} else {
								waitForPromises(index + 1);
							}
						}).catch(reject);
					}
				}
			});
		};
	}

	function setLoader(loader) {
		if (!loader || typeof loader.import !== 'function') {
			throw new Error('\'loader\' is not a real loader. Must have an import function that returns a Promise');
		}
		Loader = loader;
	}

	/* We capture navigation event listeners so that we can make sure
  * that child application navigation listeners are not called until
  * single-spa has ensured that the correct child applications are
  * unmounted and mounted.
  */


	function navigateToUrl(obj) {
		var url = void 0;
		if (typeof obj === 'string') {
			url = obj;
		} else if (this && this.href) {
			url = this.href;
		} else if (obj && obj.currentTarget && obj.currentTarget.href && obj.preventDefault) {
			url = obj.currentTarget.href;
			obj.preventDefault();
		} else {
			throw new Error('singleSpaNavigate must be either called with a string url, with an <a> tag as its context, or with an event whose currentTarget is an <a> tag');
		}

		var current = parseUri(window.location.href);
		var destination = parseUri(url);

		if (url.indexOf('#') === 0) {
			window.location.hash = '#' + destination.anchor;
		} else if (!isSamePath(destination.path, current.path) || current.host !== destination.host && destination.host) {
			// different path or a different host
			window.history.pushState(null, null, url);
		} else {
			window.location.hash = '#' + destination.anchor;
		}

		function isSamePath(destination, current) {
			// if the destination has a path but no domain, it doesn't include the root '/'
			return current === destination || current === '/' + destination;
		}
	}

	function callCapturedEventListeners(eventArguments) {
		var _this = this;

		if (eventArguments) {
			var eventType = eventArguments[0].type;
			if (routingEventsListeningTo.indexOf(eventType) >= 0) {
				capturedEventListeners[eventType].forEach(function (listener) {
					listener.apply(_this, eventArguments);
				});
			}
		}
	}

	function urlReroute() {
		reroute([], arguments);
	}

	// We will trigger an app change for any routing events.


	function parseUri(str) {
		// parseUri 1.2.2
		// (c) Steven Levithan <stevenlevithan.com>
		// MIT License
		// http://blog.stevenlevithan.com/archives/parseuri
		var parseOptions = {
			strictMode: true,
			key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
			q: {
				name: "queryKey",
				parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
			parser: {
				strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		};

		var o = parseOptions;
		var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str);
		var uri = {};
		var i = 14;

		while (i--) {
			uri[o.key[i]] = m[i] || "";
		}uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});

		return uri;
	}

	function ensureJQuerySupport() {
		var jQuery = arguments.length <= 0 || arguments[0] === undefined ? window.jQuery : arguments[0];

		if (!jQuery) {
			if (window.$ && window.$.fn && window.$.fn.jquery) {
				jQuery = window.$;
			}
		}

		if (jQuery && !hasInitialized) {
			(function () {
				var originalJQueryOn = jQuery.fn.on;
				var originalJQueryOff = jQuery.fn.off;

				jQuery.fn.on = function (eventString, fn) {
					return captureRoutingEvents.call(this, originalJQueryOn, window.addEventListener, eventString, fn, arguments);
				};

				jQuery.fn.off = function (eventString, fn) {
					return captureRoutingEvents.call(this, originalJQueryOff, window.removeEventListener, eventString, fn, arguments);
				};

				hasInitialized = true;
			})();
		}
	}

	function captureRoutingEvents(originalJQueryFunction, nativeFunctionToCall, eventString, fn, originalArgs) {
		if (typeof eventString !== 'string') {
			return originalJQueryFunction.apply(this, originalArgs);
		}

		var eventNames = eventString.split(/\s+/);
		eventNames.forEach(function (eventName) {
			if (routingEventsListeningTo.indexOf(eventName) >= 0) {
				nativeFunctionToCall(eventName, fn);
				eventString = eventString.replace(eventName, '');
			}
		});

		if (eventString.trim() === '') {
			return this;
		} else {
			return originalJQueryFunction.apply(this, originalArgs);
		}
	}

	function getMountedApps() {
		return childApps.filter(isActive).map(toName);
	}

	function getAppStatus(appName) {
		var app = find(childApps, function (app) {
			return app.name === appName;
		});
		return app ? app.status : null;
	}

	function declareChildApplication(appName, arg1, arg2) {
		if (typeof appName !== 'string' || appName.length === 0) throw new Error('The first argument must be a non-empty string \'appName\'');
		if (childApps[appName]) throw new Error('There is already an app declared with name ' + appName);

		var loadImpl = void 0,
		    activeWhen = void 0;
		if (!arg2) {
			if (!Loader) {
				throw new Error('You cannot declare a single-spa child application without either providing a way to load the application or a Loader. See https://github.com/CanopyTax/single-spa/blob/master/docs/single-spa-api.md#declarechildapplication');
			}
			loadImpl = function loadImpl() {
				return Loader.import(appName);
			};
			activeWhen = arg1;
		} else {
			loadImpl = arg1;
			activeWhen = arg2;
		}
		if (typeof activeWhen !== 'function') throw new Error('The activeWhen argument must be a function');

		childApps.push({
			name: appName,
			loadImpl: loadImpl,
			activeWhen: activeWhen,
			status: NOT_LOADED
		});

		ensureJQuerySupport();

		reroute();
	}

	function getAppsToLoad() {
		return childApps.filter(shouldBeActive).filter(notSkipped).filter(isntLoaded);
	}

	function getAppsToUnmount() {
		return childApps.filter(shouldntBeActive).filter(notSkipped).filter(isActive);
	}

	function getAppsToMount() {
		return childApps.filter(shouldBeActive).filter(notSkipped).filter(isntActive).filter(isLoaded);
	}

	function reroute() {
		var pendingPromises = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

		var loadApps = function () {
			var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
				var loadPromises;
				return _regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								loadPromises = getAppsToLoad().map(toLoadPromise);

								if (loadPromises.length > 0) {
									wasNoOp = false;
								}

								_context.prev = 2;
								_context.next = 5;
								return Promise.all(loadPromises);

							case 5:
								_context.next = 11;
								break;

							case 7:
								_context.prev = 7;
								_context.t0 = _context['catch'](2);

								callAllEventListeners();
								throw _context.t0;

							case 11:
								return _context.abrupt('return', finishUpAndReturn());

							case 12:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[2, 7]]);
			}));

			return function loadApps() {
				return _ref.apply(this, arguments);
			};
		}();

		var performAppChanges = function () {
			var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4() {
				var unmountPromises, unmountAllPromise, appsToLoad, loadThenMountPromises, mountPromises;
				return _regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								unmountPromises = getAppsToUnmount().map(toUnmountPromise);

								if (unmountPromises.length > 0) {
									wasNoOp = false;
								}
								unmountAllPromise = Promise.all(unmountPromises);
								appsToLoad = getAppsToLoad();

								/* We load and bootstrap apps while other apps are unmounting, but we
         * wait to mount the app until all apps are finishing unmounting
         */

								loadThenMountPromises = appsToLoad.map(function (app) {
									return toLoadPromise(app).then(toBootstrapPromise).then(function () {
										var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(app) {
											return _regeneratorRuntime.wrap(function _callee2$(_context2) {
												while (1) {
													switch (_context2.prev = _context2.next) {
														case 0:
															_context2.next = 2;
															return unmountAllPromise;

														case 2:
															return _context2.abrupt('return', toMountPromise(app));

														case 3:
														case 'end':
															return _context2.stop();
													}
												}
											}, _callee2, this);
										}));

										return function (_x2) {
											return _ref3.apply(this, arguments);
										};
									}());
								});

								if (loadThenMountPromises.length > 0) {
									wasNoOp = false;
								}

								/* These are the apps that are already bootstrapped and just need
         * to be mounted. They each wait for all unmounting apps to finish up
         * before they mount.
         */
								mountPromises = getAppsToMount().filter(function (appToMount) {
									return appsToLoad.indexOf(appToMount) < 0;
								}).map(function () {
									var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(appToMount) {
										return _regeneratorRuntime.wrap(function _callee3$(_context3) {
											while (1) {
												switch (_context3.prev = _context3.next) {
													case 0:
														_context3.next = 2;
														return toBootstrapPromise(appToMount);

													case 2:
														_context3.next = 4;
														return unmountAllPromise;

													case 4:
														return _context3.abrupt('return', toMountPromise(appToMount));

													case 5:
													case 'end':
														return _context3.stop();
												}
											}
										}, _callee3, this);
									}));

									return function (_x3) {
										return _ref4.apply(this, arguments);
									};
								}());

								if (mountPromises.length > 0) {
									wasNoOp = false;
								}

								_context4.prev = 8;
								_context4.next = 11;
								return Promise.all(unmountPromises);

							case 11:
								_context4.next = 17;
								break;

							case 13:
								_context4.prev = 13;
								_context4.t0 = _context4['catch'](8);

								callAllEventListeners();
								throw _context4.t0;

							case 17:

								/* Now that the apps that needed to be unmounted are unmounted, their DOM navigation
         * events (like hashchange or popstate) should have been cleaned up. So it's safe
         * to let the remaining captured event listeners to handle about the DOM event.
         */
								callAllEventListeners();

								_context4.prev = 18;
								_context4.next = 21;
								return Promise.all(loadThenMountPromises.concat(mountPromises));

							case 21:
								_context4.next = 27;
								break;

							case 23:
								_context4.prev = 23;
								_context4.t1 = _context4['catch'](18);

								pendingPromises.forEach(function (promise) {
									return promise.reject(_context4.t1);
								});
								throw _context4.t1;

							case 27:
								return _context4.abrupt('return', finishUpAndReturn());

							case 28:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this, [[8, 13], [18, 23]]);
			}));

			return function performAppChanges() {
				return _ref2.apply(this, arguments);
			};
		}();

		var eventArguments = arguments[1];

		if (appChangeUnderway) {
			return new Promise(function (resolve, reject) {
				peopleWaitingOnAppChange.push({
					resolve: resolve,
					reject: reject,
					eventArguments: eventArguments
				});
			});
		}

		appChangeUnderway = true;
		var wasNoOp = true;

		if (isStarted()) {
			return performAppChanges();
		} else {
			return loadApps();
		}

		function finishUpAndReturn() {
			var returnValue = getMountedApps();

			callAllEventListeners();
			pendingPromises.forEach(function (promise) {
				return promise.resolve(returnValue);
			});

			/* Setting this allows for subsequent calls to reroute() to actually perform
    * a reroute instead of just getting queued behind the current reroute call.
    * We want to do this after the mounting/unmounting is done but before we
    * resolve the promise for the `reroute` async function.
    */
			appChangeUnderway = false;

			if (peopleWaitingOnAppChange.length > 0) {
				/* While we were rerouting, someone else triggered another reroute that got queued.
     * So we need reroute again.
     */
				var nextPendingPromises = peopleWaitingOnAppChange;
				peopleWaitingOnAppChange = [];
				reroute(nextPendingPromises);
			} else {
				setTimeout(function () {
					if (!wasNoOp) {
						window.dispatchEvent(new CustomEvent("single-spa:app-change"));
					}

					window.dispatchEvent(new CustomEvent("single-spa:routing-event"));
				});
			}

			return returnValue;
		}

		/* We need to call all event listeners that have been delayed because they were
   * waiting on single-spa. This includes haschange and popstate events for both
   * the current run of performAppChanges(), but also all of the queued event listeners.
   * We want to call the listeners in the same order as if they had not been delayed by
   * single-spa, which means queued ones first and then the most recent one.
   */
		function callAllEventListeners() {
			pendingPromises.forEach(function (pendingPromise) {
				callCapturedEventListeners(pendingPromise.eventArguments);
			});

			callCapturedEventListeners(eventArguments);
		}
	}

	function start() {
		started = true;
		reroute();
	}

	function isStarted() {
		return started;
	}

	return {
		setters: [function (_) {
			CustomEvent = _.default;
		}],
		execute: function () {
			_regeneratorRuntime = function (module) {
				/**
     * Copyright (c) 2014, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
     * additional grant of patent rights can be found in the PATENTS file in
     * the same directory.
     */

				!function (global) {
					"use strict";

					var hasOwn = Object.prototype.hasOwnProperty;
					var undefined; // More compressible than void 0.
					var $Symbol = typeof Symbol === "function" ? Symbol : {};
					var iteratorSymbol = $Symbol.iterator || "@@iterator";
					var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

					var inModule = typeof module === "object";
					var runtime = global.regeneratorRuntime;
					if (runtime) {
						if (inModule) {
							// If regeneratorRuntime is defined globally and we're in a module,
							// make the exports object identical to regeneratorRuntime.
							module.exports = runtime;
						}
						// Don't bother evaluating the rest of this file if the runtime was
						// already defined globally.
						return;
					}

					// Define the runtime globally (as expected by generated code) as either
					// module.exports (if we're in a module) or a new, empty object.
					runtime = global.regeneratorRuntime = inModule ? module.exports : {};

					function wrap(innerFn, outerFn, self, tryLocsList) {
						// If outerFn provided, then outerFn.prototype instanceof Generator.
						var generator = Object.create((outerFn || Generator).prototype);
						var context = new Context(tryLocsList || []);

						// The ._invoke method unifies the implementations of the .next,
						// .throw, and .return methods.
						generator._invoke = makeInvokeMethod(innerFn, self, context);

						return generator;
					}
					runtime.wrap = wrap;

					// Try/catch helper to minimize deoptimizations. Returns a completion
					// record like context.tryEntries[i].completion. This interface could
					// have been (and was previously) designed to take a closure to be
					// invoked without arguments, but in all the cases we care about we
					// already have an existing method we want to call, so there's no need
					// to create a new function object. We can even get away with assuming
					// the method takes exactly one argument, since that happens to be true
					// in every case, so we don't have to touch the arguments object. The
					// only additional allocation required is the completion record, which
					// has a stable shape and so hopefully should be cheap to allocate.
					function tryCatch(fn, obj, arg) {
						try {
							return { type: "normal", arg: fn.call(obj, arg) };
						} catch (err) {
							return { type: "throw", arg: err };
						}
					}

					var GenStateSuspendedStart = "suspendedStart";
					var GenStateSuspendedYield = "suspendedYield";
					var GenStateExecuting = "executing";
					var GenStateCompleted = "completed";

					// Returning this object from the innerFn has the same effect as
					// breaking out of the dispatch switch statement.
					var ContinueSentinel = {};

					// Dummy constructor functions that we use as the .constructor and
					// .constructor.prototype properties for functions that return Generator
					// objects. For full spec compliance, you may wish to configure your
					// minifier not to mangle the names of these two functions.
					function Generator() {}
					function GeneratorFunction() {}
					function GeneratorFunctionPrototype() {}

					var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
					GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
					GeneratorFunctionPrototype.constructor = GeneratorFunction;
					GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

					// Helper for defining the .next, .throw, and .return methods of the
					// Iterator interface in terms of a single ._invoke method.
					function defineIteratorMethods(prototype) {
						["next", "throw", "return"].forEach(function (method) {
							prototype[method] = function (arg) {
								return this._invoke(method, arg);
							};
						});
					}

					runtime.isGeneratorFunction = function (genFun) {
						var ctor = typeof genFun === "function" && genFun.constructor;
						return ctor ? ctor === GeneratorFunction ||
						// For the native GeneratorFunction constructor, the best we can
						// do is to check its .name property.
						(ctor.displayName || ctor.name) === "GeneratorFunction" : false;
					};

					runtime.mark = function (genFun) {
						if (Object.setPrototypeOf) {
							Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
						} else {
							genFun.__proto__ = GeneratorFunctionPrototype;
							if (!(toStringTagSymbol in genFun)) {
								genFun[toStringTagSymbol] = "GeneratorFunction";
							}
						}
						genFun.prototype = Object.create(Gp);
						return genFun;
					};

					// Within the body of any async function, `await x` is transformed to
					// `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
					// `value instanceof AwaitArgument` to determine if the yielded value is
					// meant to be awaited. Some may consider the name of this method too
					// cutesy, but they are curmudgeons.
					runtime.awrap = function (arg) {
						return new AwaitArgument(arg);
					};

					function AwaitArgument(arg) {
						this.arg = arg;
					}

					function AsyncIterator(generator) {
						function invoke(method, arg, resolve, reject) {
							var record = tryCatch(generator[method], generator, arg);
							if (record.type === "throw") {
								reject(record.arg);
							} else {
								var result = record.arg;
								var value = result.value;
								if (value instanceof AwaitArgument) {
									return Promise.resolve(value.arg).then(function (value) {
										invoke("next", value, resolve, reject);
									}, function (err) {
										invoke("throw", err, resolve, reject);
									});
								}

								return Promise.resolve(value).then(function (unwrapped) {
									// When a yielded Promise is resolved, its final value becomes
									// the .value of the Promise<{value,done}> result for the
									// current iteration. If the Promise is rejected, however, the
									// result for this iteration will be rejected with the same
									// reason. Note that rejections of yielded Promises are not
									// thrown back into the generator function, as is the case
									// when an awaited Promise is rejected. This difference in
									// behavior between yield and await is important, because it
									// allows the consumer to decide what to do with the yielded
									// rejection (swallow it and continue, manually .throw it back
									// into the generator, abandon iteration, whatever). With
									// await, by contrast, there is no opportunity to examine the
									// rejection reason outside the generator function, so the
									// only option is to throw it from the await expression, and
									// let the generator function handle the exception.
									result.value = unwrapped;
									resolve(result);
								}, reject);
							}
						}

						if (typeof process === "object" && process.domain) {
							invoke = process.domain.bind(invoke);
						}

						var previousPromise;

						function enqueue(method, arg) {
							function callInvokeWithMethodAndArg() {
								return new Promise(function (resolve, reject) {
									invoke(method, arg, resolve, reject);
								});
							}

							return previousPromise =
							// If enqueue has been called before, then we want to wait until
							// all previous Promises have been resolved before calling invoke,
							// so that results are always delivered in the correct order. If
							// enqueue has not been called before, then it is important to
							// call invoke immediately, without waiting on a callback to fire,
							// so that the async generator function has the opportunity to do
							// any necessary setup in a predictable way. This predictability
							// is why the Promise constructor synchronously invokes its
							// executor callback, and why async functions synchronously
							// execute code before the first await. Since we implement simple
							// async functions in terms of async generators, it is especially
							// important to get this right, even though it requires care.
							previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
							// Avoid propagating failures to Promises returned by later
							// invocations of the iterator.
							callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
						}

						// Define the unified helper method that is used to implement .next,
						// .throw, and .return (see defineIteratorMethods).
						this._invoke = enqueue;
					}

					defineIteratorMethods(AsyncIterator.prototype);

					// Note that simple async functions are implemented on top of
					// AsyncIterator objects; they just return a Promise for the value of
					// the final result produced by the iterator.
					runtime.async = function (innerFn, outerFn, self, tryLocsList) {
						var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

						return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
						: iter.next().then(function (result) {
							return result.done ? result.value : iter.next();
						});
					};

					function makeInvokeMethod(innerFn, self, context) {
						var state = GenStateSuspendedStart;

						return function invoke(method, arg) {
							if (state === GenStateExecuting) {
								throw new Error("Generator is already running");
							}

							if (state === GenStateCompleted) {
								if (method === "throw") {
									throw arg;
								}

								// Be forgiving, per 25.3.3.3.3 of the spec:
								// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
								return doneResult();
							}

							while (true) {
								var delegate = context.delegate;
								if (delegate) {
									if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
										// A return or throw (when the delegate iterator has no throw
										// method) always terminates the yield* loop.
										context.delegate = null;

										// If the delegate iterator has a return method, give it a
										// chance to clean up.
										var returnMethod = delegate.iterator["return"];
										if (returnMethod) {
											var record = tryCatch(returnMethod, delegate.iterator, arg);
											if (record.type === "throw") {
												// If the return method threw an exception, let that
												// exception prevail over the original return or throw.
												method = "throw";
												arg = record.arg;
												continue;
											}
										}

										if (method === "return") {
											// Continue with the outer return, now that the delegate
											// iterator has been terminated.
											continue;
										}
									}

									var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

									if (record.type === "throw") {
										context.delegate = null;

										// Like returning generator.throw(uncaught), but without the
										// overhead of an extra function call.
										method = "throw";
										arg = record.arg;
										continue;
									}

									// Delegate generator ran and handled its own exceptions so
									// regardless of what the method was, we continue as if it is
									// "next" with an undefined arg.
									method = "next";
									arg = undefined;

									var info = record.arg;
									if (info.done) {
										context[delegate.resultName] = info.value;
										context.next = delegate.nextLoc;
									} else {
										state = GenStateSuspendedYield;
										return info;
									}

									context.delegate = null;
								}

								if (method === "next") {
									// Setting context._sent for legacy support of Babel's
									// function.sent implementation.
									context.sent = context._sent = arg;
								} else if (method === "throw") {
									if (state === GenStateSuspendedStart) {
										state = GenStateCompleted;
										throw arg;
									}

									if (context.dispatchException(arg)) {
										// If the dispatched exception was caught by a catch block,
										// then let that catch block handle the exception normally.
										method = "next";
										arg = undefined;
									}
								} else if (method === "return") {
									context.abrupt("return", arg);
								}

								state = GenStateExecuting;

								var record = tryCatch(innerFn, self, context);
								if (record.type === "normal") {
									// If an exception is thrown from innerFn, we leave state ===
									// GenStateExecuting and loop back for another invocation.
									state = context.done ? GenStateCompleted : GenStateSuspendedYield;

									var info = {
										value: record.arg,
										done: context.done
									};

									if (record.arg === ContinueSentinel) {
										if (context.delegate && method === "next") {
											// Deliberately forget the last sent value so that we don't
											// accidentally pass it on to the delegate.
											arg = undefined;
										}
									} else {
										return info;
									}
								} else if (record.type === "throw") {
									state = GenStateCompleted;
									// Dispatch the exception by looping back around to the
									// context.dispatchException(arg) call above.
									method = "throw";
									arg = record.arg;
								}
							}
						};
					}

					// Define Generator.prototype.{next,throw,return} in terms of the
					// unified ._invoke helper method.
					defineIteratorMethods(Gp);

					Gp[iteratorSymbol] = function () {
						return this;
					};

					Gp[toStringTagSymbol] = "Generator";

					Gp.toString = function () {
						return "[object Generator]";
					};

					function pushTryEntry(locs) {
						var entry = { tryLoc: locs[0] };

						if (1 in locs) {
							entry.catchLoc = locs[1];
						}

						if (2 in locs) {
							entry.finallyLoc = locs[2];
							entry.afterLoc = locs[3];
						}

						this.tryEntries.push(entry);
					}

					function resetTryEntry(entry) {
						var record = entry.completion || {};
						record.type = "normal";
						delete record.arg;
						entry.completion = record;
					}

					function Context(tryLocsList) {
						// The root entry object (effectively a try statement without a catch
						// or a finally block) gives us a place to store values thrown from
						// locations where there is no enclosing try statement.
						this.tryEntries = [{ tryLoc: "root" }];
						tryLocsList.forEach(pushTryEntry, this);
						this.reset(true);
					}

					runtime.keys = function (object) {
						var keys = [];
						for (var key in object) {
							keys.push(key);
						}
						keys.reverse();

						// Rather than returning an object with a next method, we keep
						// things simple and return the next function itself.
						return function next() {
							while (keys.length) {
								var key = keys.pop();
								if (key in object) {
									next.value = key;
									next.done = false;
									return next;
								}
							}

							// To avoid creating an additional object, we just hang the .value
							// and .done properties off the next function object itself. This
							// also ensures that the minifier will not anonymize the function.
							next.done = true;
							return next;
						};
					};

					function values(iterable) {
						if (iterable) {
							var iteratorMethod = iterable[iteratorSymbol];
							if (iteratorMethod) {
								return iteratorMethod.call(iterable);
							}

							if (typeof iterable.next === "function") {
								return iterable;
							}

							if (!isNaN(iterable.length)) {
								var i = -1,
								    next = function next() {
									while (++i < iterable.length) {
										if (hasOwn.call(iterable, i)) {
											next.value = iterable[i];
											next.done = false;
											return next;
										}
									}

									next.value = undefined;
									next.done = true;

									return next;
								};

								return next.next = next;
							}
						}

						// Return an iterator with no values.
						return { next: doneResult };
					}
					runtime.values = values;

					function doneResult() {
						return { value: undefined, done: true };
					}

					Context.prototype = {
						constructor: Context,

						reset: function reset(skipTempReset) {
							this.prev = 0;
							this.next = 0;
							// Resetting context._sent for legacy support of Babel's
							// function.sent implementation.
							this.sent = this._sent = undefined;
							this.done = false;
							this.delegate = null;

							this.tryEntries.forEach(resetTryEntry);

							if (!skipTempReset) {
								for (var name in this) {
									// Not sure about the optimal order of these conditions:
									if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
										this[name] = undefined;
									}
								}
							}
						},

						stop: function stop() {
							this.done = true;

							var rootEntry = this.tryEntries[0];
							var rootRecord = rootEntry.completion;
							if (rootRecord.type === "throw") {
								throw rootRecord.arg;
							}

							return this.rval;
						},

						dispatchException: function dispatchException(exception) {
							if (this.done) {
								throw exception;
							}

							var context = this;
							function handle(loc, caught) {
								record.type = "throw";
								record.arg = exception;
								context.next = loc;
								return !!caught;
							}

							for (var i = this.tryEntries.length - 1; i >= 0; --i) {
								var entry = this.tryEntries[i];
								var record = entry.completion;

								if (entry.tryLoc === "root") {
									// Exception thrown outside of any try block that could handle
									// it, so set the completion value of the entire function to
									// throw the exception.
									return handle("end");
								}

								if (entry.tryLoc <= this.prev) {
									var hasCatch = hasOwn.call(entry, "catchLoc");
									var hasFinally = hasOwn.call(entry, "finallyLoc");

									if (hasCatch && hasFinally) {
										if (this.prev < entry.catchLoc) {
											return handle(entry.catchLoc, true);
										} else if (this.prev < entry.finallyLoc) {
											return handle(entry.finallyLoc);
										}
									} else if (hasCatch) {
										if (this.prev < entry.catchLoc) {
											return handle(entry.catchLoc, true);
										}
									} else if (hasFinally) {
										if (this.prev < entry.finallyLoc) {
											return handle(entry.finallyLoc);
										}
									} else {
										throw new Error("try statement without catch or finally");
									}
								}
							}
						},

						abrupt: function abrupt(type, arg) {
							for (var i = this.tryEntries.length - 1; i >= 0; --i) {
								var entry = this.tryEntries[i];
								if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
									var finallyEntry = entry;
									break;
								}
							}

							if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
								// Ignore the finally entry if control is not jumping to a
								// location outside the try/catch block.
								finallyEntry = null;
							}

							var record = finallyEntry ? finallyEntry.completion : {};
							record.type = type;
							record.arg = arg;

							if (finallyEntry) {
								this.next = finallyEntry.finallyLoc;
							} else {
								this.complete(record);
							}

							return ContinueSentinel;
						},

						complete: function complete(record, afterLoc) {
							if (record.type === "throw") {
								throw record.arg;
							}

							if (record.type === "break" || record.type === "continue") {
								this.next = record.arg;
							} else if (record.type === "return") {
								this.rval = record.arg;
								this.next = "end";
							} else if (record.type === "normal" && afterLoc) {
								this.next = afterLoc;
							}
						},

						finish: function finish(finallyLoc) {
							for (var i = this.tryEntries.length - 1; i >= 0; --i) {
								var entry = this.tryEntries[i];
								if (entry.finallyLoc === finallyLoc) {
									this.complete(entry.completion, entry.afterLoc);
									resetTryEntry(entry);
									return ContinueSentinel;
								}
							}
						},

						"catch": function _catch(tryLoc) {
							for (var i = this.tryEntries.length - 1; i >= 0; --i) {
								var entry = this.tryEntries[i];
								if (entry.tryLoc === tryLoc) {
									var record = entry.completion;
									if (record.type === "throw") {
										var thrown = record.arg;
										resetTryEntry(entry);
									}
									return thrown;
								}
							}

							// The context.catch method must only be called with a location
							// argument that corresponds to a known catch block.
							throw new Error("illegal catch attempt");
						},

						delegateYield: function delegateYield(iterable, resultName, nextLoc) {
							this.delegate = {
								iterator: values(iterable),
								resultName: resultName,
								nextLoc: nextLoc
							};

							return ContinueSentinel;
						}
					};
				}(
				// Among the various tricks for obtaining a reference to the global
				// object, this seems to be the most reliable technique that does not
				// use indirect eval (which violates Content Security Policy).
				typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this);
				return module.exports;
			}({ exports: {} });

			_asyncToGenerator = function (fn) {
				return function () {
					var gen = fn.apply(this, arguments);
					return new Promise(function (resolve, reject) {
						function step(key, arg) {
							try {
								var info = gen[key](arg);
								var value = info.value;
							} catch (error) {
								reject(error);
								return;
							}

							if (info.done) {
								resolve(value);
							} else {
								return Promise.resolve(value).then(function (value) {
									return step("next", value);
								}, function (err) {
									return step("throw", err);
								});
							}
						}

						return step("next");
					});
				};
			};

			_export("NOT_LOADED", NOT_LOADED = 'NOT_LOADED');

			_export("LOADING_SOURCE_CODE", LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE');

			_export("NOT_BOOTSTRAPPED", NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED');

			_export("BOOTSTRAPPING", BOOTSTRAPPING = 'BOOTSTRAPPING');

			_export("NOT_MOUNTED", NOT_MOUNTED = 'NOT_MOUNTED');

			_export("MOUNTING", MOUNTING = 'MOUNTING');

			_export("MOUNTED", MOUNTED = 'MOUNTED');

			_export("UNMOUNTING", UNMOUNTING = 'UNMOUNTING');

			_export("SKIP_BECAUSE_BROKEN", SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN');

			_extends = Object.assign || function (target) {
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

			globalTimeoutConfig = {
				bootstrap: {
					millis: 4000,
					dieOnTimeout: false
				},
				mount: {
					millis: 3000,
					dieOnTimeout: false
				},
				unmount: {
					millis: 3000,
					dieOnTimeout: false
				}
			};

			toLoadPromise = function () {
				var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(app) {
					var appOpts, validationErrMessage;
					return _regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									if (!(app.status !== NOT_LOADED)) {
										_context.next = 2;
										break;
									}

									return _context.abrupt('return', app);

								case 2:

									app.status = LOADING_SOURCE_CODE;

									appOpts = void 0;
									_context.prev = 4;
									_context.next = 7;
									return app.loadImpl();

								case 7:
									appOpts = _context.sent;
									_context.next = 15;
									break;

								case 10:
									_context.prev = 10;
									_context.t0 = _context['catch'](4);

									handleChildAppError(_context.t0, app);
									app.status = SKIP_BECAUSE_BROKEN;
									return _context.abrupt('return', app);

								case 15:
									validationErrMessage = void 0;

									if (typeof appOpts !== 'object') {
										validationErrMessage = 'does not export anything';
									}

									if (!validLifecycleFn(appOpts.bootstrap)) {
										validationErrMessage = 'does not export a bootstrap function or array of functions';
									}

									if (!validLifecycleFn(appOpts.mount)) {
										validationErrMessage = 'does not export a mount function or array of functions';
									}

									if (!validLifecycleFn(appOpts.unmount)) {
										validationErrMessage = 'does not export an unmount function or array of functions';
									}

									if (!validationErrMessage) {
										_context.next = 24;
										break;
									}

									handleChildAppError(validationErrMessage, app);
									app.status = SKIP_BECAUSE_BROKEN;
									return _context.abrupt('return', app);

								case 24:

									app.status = NOT_BOOTSTRAPPED;
									app.bootstrap = flattenFnArray(appOpts.bootstrap, 'App \'' + app.name + '\' bootstrap function');
									app.mount = flattenFnArray(appOpts.mount, 'App \'' + app.name + '\' mount function');
									app.unmount = flattenFnArray(appOpts.unmount, 'App \'' + app.name + '\' unmount function');
									app.timeouts = ensureValidAppTimeouts(appOpts.timeouts);

									return _context.abrupt('return', app);

								case 30:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[4, 10]]);
				}));

				return function toLoadPromise(_x) {
					return _ref.apply(this, arguments);
				};
			}();

			toBootstrapPromise = function () {
				var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(app) {
					return _regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									if (!(app.status !== NOT_BOOTSTRAPPED)) {
										_context.next = 2;
										break;
									}

									return _context.abrupt('return', app);

								case 2:

									app.status = BOOTSTRAPPING;

									_context.prev = 3;
									_context.next = 6;
									return reasonableTime(app.bootstrap(), 'Bootstrapping app \'' + app.name + '\'', app.timeouts.bootstrap);

								case 6:
									app.status = NOT_MOUNTED;
									_context.next = 13;
									break;

								case 9:
									_context.prev = 9;
									_context.t0 = _context['catch'](3);

									app.status = SKIP_BECAUSE_BROKEN;
									handleChildAppError(_context.t0, app);

								case 13:
									return _context.abrupt('return', app);

								case 14:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[3, 9]]);
				}));

				return function toBootstrapPromise(_x) {
					return _ref.apply(this, arguments);
				};
			}();

			toMountPromise = function () {
				var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(app) {
					return _regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									if (!(app.status !== NOT_MOUNTED)) {
										_context.next = 2;
										break;
									}

									return _context.abrupt('return', app);

								case 2:
									_context.prev = 2;
									_context.next = 5;
									return reasonableTime(app.mount(), 'Mounting application ' + app.name + '\'', app.timeouts.mount);

								case 5:
									app.status = MOUNTED;
									_context.next = 12;
									break;

								case 8:
									_context.prev = 8;
									_context.t0 = _context['catch'](2);

									handleChildAppError(_context.t0, app);
									app.status = SKIP_BECAUSE_BROKEN;

								case 12:
									return _context.abrupt('return', app);

								case 13:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[2, 8]]);
				}));

				return function toMountPromise(_x) {
					return _ref.apply(this, arguments);
				};
			}();

			toUnmountPromise = function () {
				var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(app) {
					return _regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									if (!(app.status !== MOUNTED)) {
										_context.next = 2;
										break;
									}

									return _context.abrupt('return', app);

								case 2:
									app.status = UNMOUNTING;

									_context.prev = 3;
									_context.next = 6;
									return reasonableTime(app.unmount(), 'Unmounting application ' + app.name + '\'', app.timeouts.unmount);

								case 6:
									app.status = NOT_MOUNTED;
									_context.next = 13;
									break;

								case 9:
									_context.prev = 9;
									_context.t0 = _context['catch'](3);

									handleChildAppError(_context.t0, app);
									app.status = SKIP_BECAUSE_BROKEN;

								case 13:
									return _context.abrupt('return', app);

								case 14:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[3, 9]]);
				}));

				return function toUnmountPromise(_x) {
					return _ref.apply(this, arguments);
				};
			}();

			Loader = null;
			capturedEventListeners = {
				hashchange: [],
				popstate: []
			};
			routingEventsListeningTo = ['hashchange', 'popstate'];
			window.addEventListener('hashchange', urlReroute);
			window.addEventListener('popstate', urlReroute);

			// Monkeypatch addEventListener so that we can ensure correct timing
			originalAddEventListener = window.addEventListener;
			originalRemoveEventListener = window.removeEventListener;

			window.addEventListener = function (eventName, fn) {
				if (typeof fn === 'function') {
					if (routingEventsListeningTo.indexOf(eventName) >= 0 && !find(capturedEventListeners[eventName], function (listener) {
						return listener === fn;
					})) {
						capturedEventListeners[eventName].push(fn);
						return;
					}
				}

				return originalAddEventListener.apply(this, arguments);
			};

			window.removeEventListener = function (eventName, listenerFn) {
				if (typeof listenerFn === 'function') {
					if (routingEventsListeningTo.indexOf(eventName) >= 0) {
						capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(function (fn) {
							return fn.toString() !== listenerFn.toString();
						});
						return;
					}
				}

				return originalRemoveEventListener.apply(this, arguments);
			};

			originalPushState = window.history.pushState;

			window.history.pushState = function (state) {
				var result = originalPushState.apply(this, arguments);

				reroute();

				return result;
			};

			originalReplaceState = window.history.replaceState;

			window.history.replaceState = function () {
				var result = originalReplaceState.apply(this, arguments);
				reroute();
				return result;
			};

			/* For convenience in `onclick` attributes, we expose a global function for navigating to
    * whatever an <a> tag's href is.
    */
			window.singleSpaNavigate = navigateToUrl;hasInitialized = false;
			childApps = [];
			appChangeUnderway = false;
			peopleWaitingOnAppChange = [];
			started = false;

			_export("start", start);

			_export("ensureJQuerySupport", ensureJQuerySupport);

			_export("setBootstrapMaxTime", setBootstrapMaxTime);

			_export("setMountMaxTime", setMountMaxTime);

			_export("setUnmountMaxTime", setUnmountMaxTime);

			_export("declareChildApplication", declareChildApplication);

			_export("getMountedApps", getMountedApps);

			_export("getAppStatus", getAppStatus);

			_export("navigateToUrl", navigateToUrl);

			_export("triggerAppChange", reroute);

			_export("setLoader", setLoader);

			_export("NOT_LOADED", NOT_LOADED);

			_export("LOADING_SOURCE_CODE", LOADING_SOURCE_CODE);

			_export("NOT_BOOTSTRAPPED", NOT_BOOTSTRAPPED);

			_export("BOOTSTRAPPING", BOOTSTRAPPING);

			_export("NOT_MOUNTED", NOT_MOUNTED);

			_export("MOUNTING", MOUNTING);

			_export("MOUNTED", MOUNTED);

			_export("UNMOUNTING", UNMOUNTING);

			_export("SKIP_BECAUSE_BROKEN", SKIP_BECAUSE_BROKEN);
		}
	};
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    singleSpa = factory();
});
//# sourceMappingURL=single-spa.js.map