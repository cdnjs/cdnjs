System.register([], function (exports) {
	'use strict';
	return {
		execute: function () {

			exports({
				addErrorHandler: addErrorHandler,
				checkActivityFunctions: checkActivityFunctions,
				declareChildApplication: declareChildApplication,
				ensureJQuerySupport: ensureJQuerySupport,
				getAppNames: getAppNames,
				getAppStatus: getAppStatus,
				getMountedApps: getMountedApps,
				mountRootParcel: mountRootParcel,
				navigateToUrl: navigateToUrl,
				registerApplication: registerApplication,
				removeErrorHandler: removeErrorHandler,
				setBootstrapMaxTime: setBootstrapMaxTime,
				setMountMaxTime: setMountMaxTime,
				setUnloadMaxTime: setUnloadMaxTime,
				setUnmountMaxTime: setUnmountMaxTime,
				start: start,
				triggerAppChange: triggerAppChange,
				unloadApplication: unloadApplication,
				unloadChildApplication: unloadChildApplication
			});

			var singleSpa = /*#__PURE__*/Object.freeze({
				__proto__: null,
				get start () { return start; },
				get ensureJQuerySupport () { return ensureJQuerySupport; },
				get setBootstrapMaxTime () { return setBootstrapMaxTime; },
				get setMountMaxTime () { return setMountMaxTime; },
				get setUnmountMaxTime () { return setUnmountMaxTime; },
				get setUnloadMaxTime () { return setUnloadMaxTime; },
				get registerApplication () { return registerApplication; },
				get getMountedApps () { return getMountedApps; },
				get getAppStatus () { return getAppStatus; },
				get unloadApplication () { return unloadApplication; },
				get checkActivityFunctions () { return checkActivityFunctions; },
				get getAppNames () { return getAppNames; },
				get declareChildApplication () { return declareChildApplication; },
				get unloadChildApplication () { return unloadChildApplication; },
				get navigateToUrl () { return navigateToUrl; },
				get triggerAppChange () { return triggerAppChange; },
				get addErrorHandler () { return addErrorHandler; },
				get removeErrorHandler () { return removeErrorHandler; },
				get mountRootParcel () { return mountRootParcel; },
				get NOT_LOADED () { return NOT_LOADED; },
				get LOADING_SOURCE_CODE () { return LOADING_SOURCE_CODE; },
				get NOT_BOOTSTRAPPED () { return NOT_BOOTSTRAPPED; },
				get BOOTSTRAPPING () { return BOOTSTRAPPING; },
				get NOT_MOUNTED () { return NOT_MOUNTED; },
				get MOUNTING () { return MOUNTING; },
				get UPDATING () { return UPDATING; },
				get LOAD_ERROR () { return LOAD_ERROR; },
				get MOUNTED () { return MOUNTED; },
				get UNMOUNTING () { return UNMOUNTING; },
				get SKIP_BECAUSE_BROKEN () { return SKIP_BECAUSE_BROKEN; }
			});

			var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

			var NativeCustomEvent = commonjsGlobal.CustomEvent;

			function useNative () {
			  try {
			    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
			    return  'cat' === p.type && 'bar' === p.detail.foo;
			  } catch (e) {
			  }
			  return false;
			}

			/**
			 * Cross-browser `CustomEvent` constructor.
			 *
			 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
			 *
			 * @public
			 */

			var customEvent = useNative() ? NativeCustomEvent :

			// IE >= 9
			'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent (type, params) {
			  var e = document.createEvent('CustomEvent');
			  if (params) {
			    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
			  } else {
			    e.initCustomEvent(type, false, false, void 0);
			  }
			  return e;
			} :

			// IE <= 8
			function CustomEvent (type, params) {
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

			function _typeof(obj) {
			  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
			    _typeof = function (obj) {
			      return typeof obj;
			    };
			  } else {
			    _typeof = function (obj) {
			      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			    };
			  }

			  return _typeof(obj);
			}

			function _classCallCheck(instance, Constructor) {
			  if (!(instance instanceof Constructor)) {
			    throw new TypeError("Cannot call a class as a function");
			  }
			}

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

			function ownKeys(object, enumerableOnly) {
			  var keys = Object.keys(object);

			  if (Object.getOwnPropertySymbols) {
			    var symbols = Object.getOwnPropertySymbols(object);
			    if (enumerableOnly) symbols = symbols.filter(function (sym) {
			      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			    });
			    keys.push.apply(keys, symbols);
			  }

			  return keys;
			}

			function _objectSpread2(target) {
			  for (var i = 1; i < arguments.length; i++) {
			    var source = arguments[i] != null ? arguments[i] : {};

			    if (i % 2) {
			      ownKeys(source, true).forEach(function (key) {
			        _defineProperty(target, key, source[key]);
			      });
			    } else if (Object.getOwnPropertyDescriptors) {
			      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
			    } else {
			      ownKeys(source).forEach(function (key) {
			        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
			      });
			    }
			  }

			  return target;
			}

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
			  if (superClass) _setPrototypeOf(subClass, superClass);
			}

			function _getPrototypeOf(o) {
			  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
			    return o.__proto__ || Object.getPrototypeOf(o);
			  };
			  return _getPrototypeOf(o);
			}

			function _setPrototypeOf(o, p) {
			  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
			    o.__proto__ = p;
			    return o;
			  };

			  return _setPrototypeOf(o, p);
			}

			function isNativeReflectConstruct() {
			  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			  if (Reflect.construct.sham) return false;
			  if (typeof Proxy === "function") return true;

			  try {
			    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
			    return true;
			  } catch (e) {
			    return false;
			  }
			}

			function _construct(Parent, args, Class) {
			  if (isNativeReflectConstruct()) {
			    _construct = Reflect.construct;
			  } else {
			    _construct = function _construct(Parent, args, Class) {
			      var a = [null];
			      a.push.apply(a, args);
			      var Constructor = Function.bind.apply(Parent, a);
			      var instance = new Constructor();
			      if (Class) _setPrototypeOf(instance, Class.prototype);
			      return instance;
			    };
			  }

			  return _construct.apply(null, arguments);
			}

			function _isNativeFunction(fn) {
			  return Function.toString.call(fn).indexOf("[native code]") !== -1;
			}

			function _wrapNativeSuper(Class) {
			  var _cache = typeof Map === "function" ? new Map() : undefined;

			  _wrapNativeSuper = function _wrapNativeSuper(Class) {
			    if (Class === null || !_isNativeFunction(Class)) return Class;

			    if (typeof Class !== "function") {
			      throw new TypeError("Super expression must either be null or a function");
			    }

			    if (typeof _cache !== "undefined") {
			      if (_cache.has(Class)) return _cache.get(Class);

			      _cache.set(Class, Wrapper);
			    }

			    function Wrapper() {
			      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
			    }

			    Wrapper.prototype = Object.create(Class.prototype, {
			      constructor: {
			        value: Wrapper,
			        enumerable: false,
			        writable: true,
			        configurable: true
			      }
			    });
			    return _setPrototypeOf(Wrapper, Class);
			  };

			  return _wrapNativeSuper(Class);
			}

			function _assertThisInitialized(self) {
			  if (self === void 0) {
			    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			  }

			  return self;
			}

			function _possibleConstructorReturn(self, call) {
			  if (call && (typeof call === "object" || typeof call === "function")) {
			    return call;
			  }

			  return _assertThisInitialized(self);
			}

			var errorHandlers = [];
			function handleAppError(err, app) {
			  var transformedErr = transformErr(err, app);

			  if (errorHandlers.length) {
			    errorHandlers.forEach(function (handler) {
			      return handler(transformedErr);
			    });
			  } else {
			    setTimeout(function () {
			      throw transformedErr;
			    });
			  }
			}
			function addErrorHandler(handler) {
			  if (typeof handler !== 'function') {
			    throw Error('a single-spa error handler must be a function');
			  }

			  errorHandlers.push(handler);
			}
			function removeErrorHandler(handler) {
			  if (typeof handler !== 'function') {
			    throw Error('a single-spa error handler must be a function');
			  }

			  var removedSomething = false;
			  errorHandlers = errorHandlers.filter(function (h) {
			    var isHandler = h === handler;
			    removedSomething = removedSomething || isHandler;
			    return !isHandler;
			  });
			  return removedSomething;
			}
			function transformErr(ogErr, appOrParcel) {
			  var objectType = appOrParcel.unmountThisParcel ? 'Parcel' : 'Application';
			  var errPrefix = "".concat(objectType, " '").concat(appOrParcel.name, "' died in status ").concat(appOrParcel.status, ": ");
			  var result;

			  if (ogErr instanceof Error) {
			    try {
			      ogErr.message = errPrefix + ogErr.message;
			    } catch (err) {
			      /* Some errors have read-only message properties, in which case there is nothing
			       * that we can do.
			       */
			    }

			    result = ogErr;
			  } else {
			    console.warn("While ".concat(appOrParcel.status, ", '").concat(appOrParcel.name, "' rejected its lifecycle function promise with a non-Error. This will cause stack traces to not be accurate."));

			    try {
			      result = Error(errPrefix + JSON.stringify(ogErr));
			    } catch (err) {
			      // If it's not an Error and you can't stringify it, then what else can you even do to it?
			      result = ogErr;
			    }
			  }

			  result.appName = appOrParcel.name;
			  result.appOrParcelName = appOrParcel.name;

			  try {
			    result.name = appOrParcel.name;
			  } catch (err) {// See https://github.com/CanopyTax/single-spa/issues/323
			    // In a future major release, we can remove the `name` property altogether,
			    // as a breaking change, in favor of appOrParcelName.
			  }

			  return result;
			}

			var NOT_LOADED = exports('NOT_LOADED', 'NOT_LOADED');
			var LOADING_SOURCE_CODE = exports('LOADING_SOURCE_CODE', 'LOADING_SOURCE_CODE');
			var NOT_BOOTSTRAPPED = exports('NOT_BOOTSTRAPPED', 'NOT_BOOTSTRAPPED');
			var BOOTSTRAPPING = exports('BOOTSTRAPPING', 'BOOTSTRAPPING');
			var NOT_MOUNTED = exports('NOT_MOUNTED', 'NOT_MOUNTED');
			var MOUNTING = exports('MOUNTING', 'MOUNTING');
			var MOUNTED = exports('MOUNTED', 'MOUNTED');
			var UPDATING = exports('UPDATING', 'UPDATING');
			var UNMOUNTING = exports('UNMOUNTING', 'UNMOUNTING');
			var UNLOADING = 'UNLOADING';
			var LOAD_ERROR = exports('LOAD_ERROR', 'LOAD_ERROR');
			var SKIP_BECAUSE_BROKEN = exports('SKIP_BECAUSE_BROKEN', 'SKIP_BECAUSE_BROKEN');
			function isActive(app) {
			  return app.status === MOUNTED;
			}
			function isntActive(app) {
			  return !isActive(app);
			}
			function isLoaded(app) {
			  return app.status !== NOT_LOADED && app.status !== LOADING_SOURCE_CODE && app.status !== LOAD_ERROR;
			}
			function isntLoaded(app) {
			  return !isLoaded(app);
			}
			function shouldBeActive(app) {
			  try {
			    return app.activeWhen(window.location);
			  } catch (err) {
			    handleAppError(err, app);
			    app.status = SKIP_BECAUSE_BROKEN;
			  }
			}
			function shouldntBeActive(app) {
			  try {
			    return !app.activeWhen(window.location);
			  } catch (err) {
			    handleAppError(err, app);
			    app.status = SKIP_BECAUSE_BROKEN;
			  }
			}
			function notSkipped(item) {
			  return item !== SKIP_BECAUSE_BROKEN && (!item || item.status !== SKIP_BECAUSE_BROKEN);
			}
			function withoutLoadErrors(app) {
			  return app.status === LOAD_ERROR ? new Date().getTime() - app.loadErrorTime >= 200 : true;
			}
			function toName(app) {
			  return app.name;
			}

			var globalTimeoutConfig = {
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
			  },
			  unload: {
			    millis: 3000,
			    dieOnTimeout: false
			  }
			};
			function setBootstrapMaxTime(time) {
			  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			  if (typeof time !== 'number' || time <= 0) {
			    throw Error("bootstrap max time must be a positive integer number of milliseconds");
			  }

			  globalTimeoutConfig.bootstrap = {
			    millis: time,
			    dieOnTimeout: dieOnTimeout
			  };
			}
			function setMountMaxTime(time) {
			  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			  if (typeof time !== 'number' || time <= 0) {
			    throw Error("mount max time must be a positive integer number of milliseconds");
			  }

			  globalTimeoutConfig.mount = {
			    millis: time,
			    dieOnTimeout: dieOnTimeout
			  };
			}
			function setUnmountMaxTime(time) {
			  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			  if (typeof time !== 'number' || time <= 0) {
			    throw Error("unmount max time must be a positive integer number of milliseconds");
			  }

			  globalTimeoutConfig.unmount = {
			    millis: time,
			    dieOnTimeout: dieOnTimeout
			  };
			}
			function setUnloadMaxTime(time) {
			  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			  if (typeof time !== 'number' || time <= 0) {
			    throw Error("unload max time must be a positive integer number of milliseconds");
			  }

			  globalTimeoutConfig.unload = {
			    millis: time,
			    dieOnTimeout: dieOnTimeout
			  };
			}
			function reasonableTime(promise, description, timeoutConfig) {
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
			            reject("".concat(description, " did not resolve or reject for ").concat(timeoutConfig.millis, " milliseconds"));
			          } else {
			            console.error("".concat(description, " did not resolve or reject for ").concat(timeoutConfig.millis, " milliseconds -- we're no longer going to warn you about it.")); //don't resolve or reject, we're waiting this one out
			          }
			        } else if (!errored) {
			          var numWarnings = shouldError;
			          var numMillis = numWarnings * warningPeriod;
			          console.warn("".concat(description, " did not resolve or reject within ").concat(numMillis, " milliseconds"));

			          if (numMillis + warningPeriod < timeoutConfig.millis) {
			            setTimeout(function () {
			              return maybeTimingOut(numWarnings + 1);
			            }, warningPeriod);
			          }
			        }
			      }
			    }
			  });
			}
			function ensureValidAppTimeouts() {
			  var timeouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			  return _objectSpread2({}, globalTimeoutConfig, {}, timeouts);
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

			  return function (props) {
			    return new Promise(function (resolve, reject) {
			      waitForPromises(0);

			      function waitForPromises(index) {
			        var promise = fns[index](props);

			        if (!smellsLikeAPromise(promise)) {
			          reject("".concat(description, " at index ").concat(index, " did not return a promise"));
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
			function smellsLikeAPromise(promise) {
			  return promise && typeof promise.then === 'function' && typeof promise.catch === 'function';
			}

			function toBootstrapPromise(appOrParcel) {
			  var hardFail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			  return Promise.resolve().then(function () {
			    if (appOrParcel.status !== NOT_BOOTSTRAPPED) {
			      return appOrParcel;
			    }

			    appOrParcel.status = BOOTSTRAPPING;
			    return reasonableTime(appOrParcel.bootstrap(getProps(appOrParcel)), "Bootstrapping appOrParcel '".concat(appOrParcel.name, "'"), appOrParcel.timeouts.bootstrap).then(function () {
			      appOrParcel.status = NOT_MOUNTED;
			      return appOrParcel;
			    }).catch(function (err) {
			      appOrParcel.status = SKIP_BECAUSE_BROKEN;

			      if (hardFail) {
			        var transformedErr = transformErr(err, appOrParcel);
			        throw transformedErr;
			      } else {
			        handleAppError(err, appOrParcel);
			        return appOrParcel;
			      }
			    });
			  });
			}

			function toUnmountPromise(appOrParcel) {
			  var hardFail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			  return Promise.resolve().then(function () {
			    if (appOrParcel.status !== MOUNTED) {
			      return appOrParcel;
			    }

			    appOrParcel.status = UNMOUNTING;
			    var unmountChildrenParcels = Object.keys(appOrParcel.parcels).map(function (parcelId) {
			      return appOrParcel.parcels[parcelId].unmountThisParcel();
			    });
			    return Promise.all(unmountChildrenParcels).then(unmountAppOrParcel, function (parcelError) {
			      // There is a parcel unmount error
			      return unmountAppOrParcel().then(function () {
			        // Unmounting the app/parcel succeeded, but unmounting its children parcels did not
			        var parentError = Error(parcelError.message);

			        if (hardFail) {
			          var transformedErr = transformErr(parentError, appOrParcel);
			          appOrParcel.status = SKIP_BECAUSE_BROKEN;
			          throw transformedErr;
			        } else {
			          handleAppError(parentError, appOrParcel);
			          appOrParcel.status = SKIP_BECAUSE_BROKEN;
			        }
			      });
			    }).then(function () {
			      return appOrParcel;
			    });

			    function unmountAppOrParcel() {
			      // We always try to unmount the appOrParcel, even if the children parcels failed to unmount.
			      return reasonableTime(appOrParcel.unmount(getProps(appOrParcel)), "Unmounting application ".concat(appOrParcel.name, "'"), appOrParcel.timeouts.unmount).then(function () {
			        // The appOrParcel needs to stay in a broken status if its children parcels fail to unmount
			        {
			          appOrParcel.status = NOT_MOUNTED;
			        }
			      }).catch(function (err) {
			        if (hardFail) {
			          var transformedErr = transformErr(err, appOrParcel);
			          appOrParcel.status = SKIP_BECAUSE_BROKEN;
			          throw transformedErr;
			        } else {
			          handleAppError(err, appOrParcel);
			          appOrParcel.status = SKIP_BECAUSE_BROKEN;
			        }
			      });
			    }
			  });
			}

			var beforeFirstMountFired = false;
			var firstMountFired = false;
			function toMountPromise(appOrParcel) {
			  var hardFail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			  return Promise.resolve().then(function () {
			    if (appOrParcel.status !== NOT_MOUNTED) {
			      return appOrParcel;
			    }

			    if (!beforeFirstMountFired) {
			      window.dispatchEvent(new customEvent('single-spa:before-first-mount'));
			      beforeFirstMountFired = true;
			    }

			    return reasonableTime(appOrParcel.mount(getProps(appOrParcel)), "Mounting application '".concat(appOrParcel.name, "'"), appOrParcel.timeouts.mount).then(function () {
			      appOrParcel.status = MOUNTED;

			      if (!firstMountFired) {
			        window.dispatchEvent(new customEvent('single-spa:first-mount'));
			        firstMountFired = true;
			      }

			      return appOrParcel;
			    }).catch(function (err) {
			      // If we fail to mount the appOrParcel, we should attempt to unmount it before putting in SKIP_BECAUSE_BROKEN
			      // We temporarily put the appOrParcel into MOUNTED status so that toUnmountPromise actually attempts to unmount it
			      // instead of just doing a no-op.
			      appOrParcel.status = MOUNTED;
			      return toUnmountPromise(appOrParcel).then(setSkipBecauseBroken, setSkipBecauseBroken);

			      function setSkipBecauseBroken() {
			        if (!hardFail) {
			          handleAppError(err, appOrParcel);
			          appOrParcel.status = SKIP_BECAUSE_BROKEN;
			          return appOrParcel;
			        } else {
			          var transformedErr = transformErr(err, appOrParcel);
			          appOrParcel.status = SKIP_BECAUSE_BROKEN;
			          throw transformedErr;
			        }
			      }
			    });
			  });
			}

			function toUpdatePromise(parcel) {
			  return Promise.resolve().then(function () {
			    if (parcel.status !== MOUNTED) {
			      throw Error("Cannot update parcel '".concat(parcel.name, "' because it is not mounted"));
			    }

			    parcel.status = UPDATING;
			    return reasonableTime(parcel.update(getProps(parcel)), "Updating parcel '".concat(parcel.name, "'"), parcel.timeouts.mount).then(function () {
			      parcel.status = MOUNTED;
			      return parcel;
			    }).catch(function (err) {
			      var transformedErr = transformErr(err, parcel);
			      parcel.status = SKIP_BECAUSE_BROKEN;
			      throw transformedErr;
			    });
			  });
			}

			var parcelCount = 0;
			var rootParcels = {
			  parcels: {}
			}; // This is a public api, exported to users of single-spa

			function mountRootParcel() {
			  return mountParcel.apply(rootParcels, arguments);
			}
			function mountParcel(config, customProps) {
			  var owningAppOrParcel = this; // Validate inputs

			  if (!config || _typeof(config) !== 'object' && typeof config !== 'function') {
			    throw Error('Cannot mount parcel without a config object or config loading function');
			  }

			  if (config.name && typeof config.name !== 'string') {
			    throw Error('Parcel name must be a string, if provided');
			  }

			  if (_typeof(customProps) !== 'object') {
			    throw Error("Parcel ".concat(name, " has invalid customProps -- must be an object"));
			  }

			  if (!customProps.domElement) {
			    throw Error("Parcel ".concat(name, " cannot be mounted without a domElement provided as a prop"));
			  }

			  var id = parcelCount++;
			  var passedConfigLoadingFunction = typeof config === 'function';
			  var configLoadingFunction = passedConfigLoadingFunction ? config : function () {
			    return Promise.resolve(config);
			  }; // Internal representation

			  var parcel = {
			    id: id,
			    parcels: {},
			    status: passedConfigLoadingFunction ? LOADING_SOURCE_CODE : NOT_BOOTSTRAPPED,
			    customProps: customProps,
			    parentName: owningAppOrParcel.name,
			    unmountThisParcel: function unmountThisParcel() {
			      if (parcel.status !== MOUNTED) {
			        throw Error("Cannot unmount parcel '".concat(name, "' -- it is in a ").concat(parcel.status, " status"));
			      }

			      return toUnmountPromise(parcel, true).then(function (value) {
			        if (parcel.parentName) {
			          delete owningAppOrParcel.parcels[parcel.id];
			        }

			        return value;
			      }).then(function (value) {
			        resolveUnmount(value);
			        return value;
			      }).catch(function (err) {
			        parcel.status = SKIP_BECAUSE_BROKEN;
			        rejectUnmount(err);
			        throw err;
			      });
			    }
			  }; // We return an external representation

			  var externalRepresentation; // Add to owning app or parcel

			  owningAppOrParcel.parcels[id] = parcel;
			  var loadPromise = configLoadingFunction();

			  if (!loadPromise || typeof loadPromise.then !== 'function') {
			    throw Error("When mounting a parcel, the config loading function must return a promise that resolves with the parcel config");
			  }

			  loadPromise = loadPromise.then(function (config) {
			    if (!config) {
			      throw Error("When mounting a parcel, the config loading function returned a promise that did not resolve with a parcel config");
			    }

			    var name = config.name || "parcel-".concat(id);

			    if (!validLifecycleFn(config.bootstrap)) {
			      throw Error("Parcel ".concat(name, " must have a valid bootstrap function"));
			    }

			    if (!validLifecycleFn(config.mount)) {
			      throw Error("Parcel ".concat(name, " must have a valid mount function"));
			    }

			    if (!validLifecycleFn(config.unmount)) {
			      throw Error("Parcel ".concat(name, " must have a valid unmount function"));
			    }

			    if (config.update && !validLifecycleFn(config.update)) {
			      throw Error("Parcel ".concat(name, " provided an invalid update function"));
			    }

			    var bootstrap = flattenFnArray(config.bootstrap);
			    var mount = flattenFnArray(config.mount);
			    var unmount = flattenFnArray(config.unmount);
			    parcel.status = NOT_BOOTSTRAPPED;
			    parcel.name = name;
			    parcel.bootstrap = bootstrap;
			    parcel.mount = mount;
			    parcel.unmount = unmount;
			    parcel.timeouts = ensureValidAppTimeouts(config.timeouts);

			    if (config.update) {
			      parcel.update = flattenFnArray(config.update);

			      externalRepresentation.update = function (customProps) {
			        parcel.customProps = customProps;
			        return promiseWithoutReturnValue(toUpdatePromise(parcel));
			      };
			    }
			  }); // Start bootstrapping and mounting
			  // The .then() causes the work to be put on the event loop instead of happening immediately

			  var bootstrapPromise = loadPromise.then(function () {
			    return toBootstrapPromise(parcel, true);
			  });
			  var mountPromise = bootstrapPromise.then(function () {
			    return toMountPromise(parcel, true);
			  });
			  var resolveUnmount, rejectUnmount;
			  var unmountPromise = new Promise(function (resolve, reject) {
			    resolveUnmount = resolve;
			    rejectUnmount = reject;
			  });
			  externalRepresentation = {
			    mount: function mount() {
			      return promiseWithoutReturnValue(Promise.resolve().then(function () {
			        if (parcel.status !== NOT_MOUNTED) {
			          throw Error("Cannot mount parcel '".concat(name, "' -- it is in a ").concat(parcel.status, " status"));
			        } // Add to owning app or parcel


			        owningAppOrParcel.parcels[id] = parcel;
			        return toMountPromise(parcel);
			      }));
			    },
			    unmount: function unmount() {
			      return promiseWithoutReturnValue(parcel.unmountThisParcel());
			    },
			    getStatus: function getStatus() {
			      return parcel.status;
			    },
			    loadPromise: promiseWithoutReturnValue(loadPromise),
			    bootstrapPromise: promiseWithoutReturnValue(bootstrapPromise),
			    mountPromise: promiseWithoutReturnValue(mountPromise),
			    unmountPromise: promiseWithoutReturnValue(unmountPromise)
			  };
			  return externalRepresentation;
			}

			function promiseWithoutReturnValue(promise) {
			  return promise.then(function () {
			    return null;
			  });
			}

			function getProps(appOrParcel) {
			  var result = _objectSpread2({}, appOrParcel.customProps, {
			    name: appOrParcel.name,
			    mountParcel: mountParcel.bind(appOrParcel),
			    singleSpa: singleSpa
			  });

			  if (appOrParcel.unmountThisParcel) {
			    result.unmountSelf = appOrParcel.unmountThisParcel;
			  }

			  return result;
			}

			var UserError =
			/*#__PURE__*/
			function (_Error) {
			  _inherits(UserError, _Error);

			  function UserError() {
			    _classCallCheck(this, UserError);

			    return _possibleConstructorReturn(this, _getPrototypeOf(UserError).apply(this, arguments));
			  }

			  return UserError;
			}(_wrapNativeSuper(Error));

			function toLoadPromise(app) {
			  return Promise.resolve().then(function () {
			    if (app.status !== NOT_LOADED && app.status !== LOAD_ERROR) {
			      return app;
			    }

			    app.status = LOADING_SOURCE_CODE;
			    var appOpts;
			    return Promise.resolve().then(function () {
			      var loadPromise = app.loadImpl(getProps(app));

			      if (!smellsLikeAPromise(loadPromise)) {
			        // The name of the app will be prepended to this error message inside of the handleAppError function
			        throw new UserError("single-spa loading function did not return a promise. Check the second argument to registerApplication('".concat(app.name, "', loadingFunction, activityFunction)"));
			      }

			      return loadPromise.then(function (val) {
			        app.loadErrorTime = null;
			        appOpts = val;
			        var validationErrMessage;

			        if (_typeof(appOpts) !== 'object') {
			          validationErrMessage = "does not export anything";
			        }

			        if (!validLifecycleFn(appOpts.bootstrap)) {
			          validationErrMessage = "does not export a bootstrap function or array of functions";
			        }

			        if (!validLifecycleFn(appOpts.mount)) {
			          validationErrMessage = "does not export a mount function or array of functions";
			        }

			        if (!validLifecycleFn(appOpts.unmount)) {
			          validationErrMessage = "does not export an unmount function or array of functions";
			        }

			        if (validationErrMessage) {
			          console.error("The loading function for single-spa application '".concat(app.name, "' resolved with the following, which does not have bootstrap, mount, and unmount functions"), appOpts);
			          handleAppError(validationErrMessage, app);
			          app.status = SKIP_BECAUSE_BROKEN;
			          return app;
			        }

			        if (appOpts.devtools && appOpts.devtools.overlays) {
			          app.devtools.overlays = _objectSpread2({}, app.devtools.overlays, {}, appOpts.devtools.overlays);
			        }

			        app.status = NOT_BOOTSTRAPPED;
			        app.bootstrap = flattenFnArray(appOpts.bootstrap, "App '".concat(app.name, "' bootstrap function"));
			        app.mount = flattenFnArray(appOpts.mount, "App '".concat(app.name, "' mount function"));
			        app.unmount = flattenFnArray(appOpts.unmount, "App '".concat(app.name, "' unmount function"));
			        app.unload = flattenFnArray(appOpts.unload || [], "App '".concat(app.name, "' unload function"));
			        app.timeouts = ensureValidAppTimeouts(appOpts.timeouts);
			        return app;
			      });
			    }).catch(function (err) {
			      handleAppError(err, app);

			      if (err instanceof UserError) {
			        app.status = SKIP_BECAUSE_BROKEN;
			      } else {
			        app.status = LOAD_ERROR;
			        app.loadErrorTime = new Date().getTime();
			      }

			      return app;
			    });
			  });
			}

			/* We capture navigation event listeners so that we can make sure
			 * that application navigation listeners are not called until
			 * single-spa has ensured that the correct applications are
			 * unmounted and mounted.
			 */

			var capturedEventListeners = {
			  hashchange: [],
			  popstate: []
			};
			var routingEventsListeningTo = ['hashchange', 'popstate'];
			function navigateToUrl(obj) {
			  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			  var url;

			  if (typeof obj === 'string') {
			    url = obj;
			  } else if (this && this.href) {
			    url = this.href;
			  } else if (obj && obj.currentTarget && obj.currentTarget.href && obj.preventDefault) {
			    url = obj.currentTarget.href;
			    obj.preventDefault();
			  } else {
			    throw Error("singleSpaNavigate must be either called with a string url, with an <a> tag as its context, or with an event whose currentTarget is an <a> tag");
			  }

			  var current = parseUri(window.location.href);
			  var destination = parseUri(url);

			  if (url.indexOf('#') === 0) {
			    window.location.hash = '#' + destination.anchor;
			  } else if (current.host !== destination.host && destination.host) {
			    if (opts.isTestingEnv) {
			      return {
			        wouldHaveReloadedThePage: true
			      };
			    } else {
			      window.location.href = url;
			    }
			  } else if (!isSamePath(destination.path + "?" + destination.query, current.path + "?" + current.query)) {
			    // different path, host, or query params
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
			} // We will trigger an app change for any routing events.


			window.addEventListener('hashchange', urlReroute);
			window.addEventListener('popstate', urlReroute); // Monkeypatch addEventListener so that we can ensure correct timing

			var originalAddEventListener = window.addEventListener;
			var originalRemoveEventListener = window.removeEventListener;

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
			        return fn !== listenerFn;
			      });
			      return;
			    }
			  }

			  return originalRemoveEventListener.apply(this, arguments);
			};

			var originalPushState = window.history.pushState;

			window.history.pushState = function (state) {
			  var result = originalPushState.apply(this, arguments);
			  urlReroute(createPopStateEvent(state));
			  return result;
			};

			var originalReplaceState = window.history.replaceState;

			window.history.replaceState = function (state) {
			  var result = originalReplaceState.apply(this, arguments);
			  urlReroute(createPopStateEvent(state));
			  return result;
			};

			function createPopStateEvent(state) {
			  // https://github.com/CanopyTax/single-spa/issues/224 and https://github.com/CanopyTax/single-spa-angular/issues/49
			  // We need a popstate event even though the browser doesn't do one by default when you call replaceState, so that
			  // all the applications can reroute.
			  try {
			    return new PopStateEvent('popstate', {
			      state: state
			    });
			  } catch (err) {
			    // IE 11 compatibility https://github.com/CanopyTax/single-spa/issues/299
			    // https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-html5e/bd560f47-b349-4d2c-baa8-f1560fb489dd
			    var evt = document.createEvent('PopStateEvent');
			    evt.initPopStateEvent('popstate', false, false, state);
			    return evt;
			  }
			}
			/* For convenience in `onclick` attributes, we expose a global function for navigating to
			 * whatever an <a> tag's href is.
			 */


			window.singleSpaNavigate = navigateToUrl;

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
			  var m = o.parser[ "strict" ].exec(str);
			  var uri = {};
			  var i = 14;

			  while (i--) {
			    uri[o.key[i]] = m[i] || "";
			  }

			  uri[o.q.name] = {};
			  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			    if ($1) uri[o.q.name][$1] = $2;
			  });
			  return uri;
			}

			var hasInitialized = false;
			function ensureJQuerySupport() {
			  var jQuery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.jQuery;

			  if (!jQuery) {
			    if (window.$ && window.$.fn && window.$.fn.jquery) {
			      jQuery = window.$;
			    }
			  }

			  if (jQuery && !hasInitialized) {
			    var originalJQueryOn = jQuery.fn.on;
			    var originalJQueryOff = jQuery.fn.off;

			    jQuery.fn.on = function (eventString, fn) {
			      return captureRoutingEvents.call(this, originalJQueryOn, window.addEventListener, eventString, fn, arguments);
			    };

			    jQuery.fn.off = function (eventString, fn) {
			      return captureRoutingEvents.call(this, originalJQueryOff, window.removeEventListener, eventString, fn, arguments);
			    };

			    hasInitialized = true;
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

			var appsToUnload = {};
			function toUnloadPromise(app) {
			  return Promise.resolve().then(function () {
			    var unloadInfo = appsToUnload[app.name];

			    if (!unloadInfo) {
			      /* No one has called unloadApplication for this app,
			      */
			      return app;
			    }

			    if (app.status === NOT_LOADED) {
			      /* This app is already unloaded. We just need to clean up
			       * anything that still thinks we need to unload the app.
			       */
			      finishUnloadingApp(app, unloadInfo);
			      return app;
			    }

			    if (app.status === UNLOADING) {
			      /* Both unloadApplication and reroute want to unload this app.
			       * It only needs to be done once, though.
			       */
			      return unloadInfo.promise.then(function () {
			        return app;
			      });
			    }

			    if (app.status !== NOT_MOUNTED) {
			      /* The app cannot be unloaded until it is unmounted.
			      */
			      return app;
			    }

			    app.status = UNLOADING;
			    return reasonableTime(app.unload(getProps(app)), "Unloading application '".concat(app.name, "'"), app.timeouts.unload).then(function () {
			      finishUnloadingApp(app, unloadInfo);
			      return app;
			    }).catch(function (err) {
			      errorUnloadingApp(app, unloadInfo, err);
			      return app;
			    });
			  });
			}

			function finishUnloadingApp(app, unloadInfo) {
			  delete appsToUnload[app.name]; // Unloaded apps don't have lifecycles

			  delete app.bootstrap;
			  delete app.mount;
			  delete app.unmount;
			  delete app.unload;
			  app.status = NOT_LOADED;
			  /* resolve the promise of whoever called unloadApplication.
			   * This should be done after all other cleanup/bookkeeping
			   */

			  unloadInfo.resolve();
			}

			function errorUnloadingApp(app, unloadInfo, err) {
			  delete appsToUnload[app.name]; // Unloaded apps don't have lifecycles

			  delete app.bootstrap;
			  delete app.mount;
			  delete app.unmount;
			  delete app.unload;
			  handleAppError(err, app);
			  app.status = SKIP_BECAUSE_BROKEN;
			  unloadInfo.reject(err);
			}

			function addAppToUnload(app, promiseGetter, resolve, reject) {
			  appsToUnload[app.name] = {
			    app: app,
			    resolve: resolve,
			    reject: reject
			  };
			  Object.defineProperty(appsToUnload[app.name], 'promise', {
			    get: promiseGetter
			  });
			}
			function getAppUnloadInfo(appName) {
			  return appsToUnload[appName];
			}
			function getAppsToUnload() {
			  return Object.keys(appsToUnload).map(function (appName) {
			    return appsToUnload[appName].app;
			  }).filter(isntActive);
			}

			var apps = [];
			function getMountedApps() {
			  return apps.filter(isActive).map(toName);
			}
			function getAppNames() {
			  return apps.map(toName);
			} // used in devtools, not (currently) exposed as a single-spa API

			function getRawAppData() {
			  return [].concat(apps);
			}
			function getAppStatus(appName) {
			  var app = find(apps, function (app) {
			    return app.name === appName;
			  });
			  return app ? app.status : null;
			}
			function declareChildApplication(appName, arg1, arg2) {
			  console.warn('declareChildApplication is deprecated and will be removed in the next major version, use "registerApplication" instead');
			  return registerApplication(appName, arg1, arg2);
			}
			function registerApplication(appName, applicationOrLoadingFn, activityFn) {
			  var customProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			  if (typeof appName !== 'string' || appName.length === 0) throw Error("The first argument must be a non-empty string 'appName'");
			  if (getAppNames().indexOf(appName) !== -1) throw Error("There is already an app declared with name ".concat(appName));
			  if (_typeof(customProps) !== 'object' || Array.isArray(customProps)) throw Error('customProps must be an object');
			  if (!applicationOrLoadingFn) throw Error("The application or loading function is required");
			  var loadImpl;

			  if (typeof applicationOrLoadingFn !== 'function') {
			    // applicationOrLoadingFn is an application
			    loadImpl = function loadImpl() {
			      return Promise.resolve(applicationOrLoadingFn);
			    };
			  } else {
			    // applicationOrLoadingFn is a loadingFn
			    loadImpl = applicationOrLoadingFn;
			  }

			  if (typeof activityFn !== 'function') throw Error("The activeWhen argument must be a function");
			  apps.push({
			    loadErrorTime: null,
			    name: appName,
			    loadImpl: loadImpl,
			    activeWhen: activityFn,
			    status: NOT_LOADED,
			    parcels: {},
			    devtools: {
			      overlays: {
			        options: {},
			        selectors: []
			      }
			    },
			    customProps: customProps
			  });
			  ensureJQuerySupport();
			  reroute();
			}
			function checkActivityFunctions(location) {
			  var activeApps = [];

			  for (var i = 0; i < apps.length; i++) {
			    if (apps[i].activeWhen(location)) {
			      activeApps.push(apps[i].name);
			    }
			  }

			  return activeApps;
			}
			function getAppsToLoad() {
			  return apps.filter(notSkipped).filter(withoutLoadErrors).filter(isntLoaded).filter(shouldBeActive);
			}
			function getAppsToUnmount() {
			  return apps.filter(notSkipped).filter(isActive).filter(shouldntBeActive);
			}
			function getAppsToMount() {
			  return apps.filter(notSkipped).filter(isntActive).filter(isLoaded).filter(shouldBeActive);
			}
			function unregisterApplication(appName) {
			  if (!apps.find(function (app) {
			    return app.name === appName;
			  })) {
			    throw Error("Cannot unregister application '".concat(appName, "' because no such application has been registered"));
			  }

			  return unloadApplication(appName).then(function () {
			    var appIndex = apps.findIndex(function (app) {
			      return app.name === appName;
			    });
			    apps.splice(appIndex, 1);
			  });
			}
			function unloadChildApplication(appName, opts) {
			  console.warn('unloadChildApplication is deprecated and will be removed in the next major version, use "unloadApplication" instead');
			  return unloadApplication(appName, opts);
			}
			function unloadApplication(appName) {
			  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
			    waitForUnmount: false
			  };

			  if (typeof appName !== 'string') {
			    throw Error("unloadApplication requires a string 'appName'");
			  }

			  var app = find(apps, function (App) {
			    return App.name === appName;
			  });

			  if (!app) {
			    throw Error("Could not unload application '".concat(appName, "' because no such application has been registered"));
			  }

			  var appUnloadInfo = getAppUnloadInfo(app.name);

			  if (opts && opts.waitForUnmount) {
			    // We need to wait for unmount before unloading the app
			    if (appUnloadInfo) {
			      // Someone else is already waiting for this, too
			      return appUnloadInfo.promise;
			    } else {
			      // We're the first ones wanting the app to be resolved.
			      var promise = new Promise(function (resolve, reject) {
			        addAppToUnload(app, function () {
			          return promise;
			        }, resolve, reject);
			      });
			      return promise;
			    }
			  } else {
			    /* We should unmount the app, unload it, and remount it immediately.
			     */
			    var resultPromise;

			    if (appUnloadInfo) {
			      // Someone else is already waiting for this app to unload
			      resultPromise = appUnloadInfo.promise;
			      immediatelyUnloadApp(app, appUnloadInfo.resolve, appUnloadInfo.reject);
			    } else {
			      // We're the first ones wanting the app to be resolved.
			      resultPromise = new Promise(function (resolve, reject) {
			        addAppToUnload(app, function () {
			          return resultPromise;
			        }, resolve, reject);
			        immediatelyUnloadApp(app, resolve, reject);
			      });
			    }

			    return resultPromise;
			  }
			}

			function immediatelyUnloadApp(app, resolve, reject) {
			  toUnmountPromise(app).then(toUnloadPromise).then(function () {
			    resolve();
			    setTimeout(function () {
			      // reroute, but the unload promise is done
			      reroute();
			    });
			  }).catch(reject);
			}

			var appChangeUnderway = false,
			    peopleWaitingOnAppChange = [];
			function triggerAppChange() {
			  // Call reroute with no arguments, intentionally
			  return reroute();
			}
			function reroute() {
			  var pendingPromises = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			  var eventArguments = arguments.length > 1 ? arguments[1] : undefined;

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

			  function loadApps() {
			    return Promise.resolve().then(function () {
			      var loadPromises = getAppsToLoad().map(toLoadPromise);

			      if (loadPromises.length > 0) {
			        wasNoOp = false;
			      }

			      return Promise.all(loadPromises).then(finishUpAndReturn).catch(function (err) {
			        callAllEventListeners();
			        throw err;
			      });
			    });
			  }

			  function performAppChanges() {
			    return Promise.resolve().then(function () {
			      window.dispatchEvent(new customEvent("single-spa:before-routing-event", getCustomEventDetail()));
			      var unloadPromises = getAppsToUnload().map(toUnloadPromise);
			      var unmountUnloadPromises = getAppsToUnmount().map(toUnmountPromise).map(function (unmountPromise) {
			        return unmountPromise.then(toUnloadPromise);
			      });
			      var allUnmountPromises = unmountUnloadPromises.concat(unloadPromises);

			      if (allUnmountPromises.length > 0) {
			        wasNoOp = false;
			      }

			      var unmountAllPromise = Promise.all(allUnmountPromises);
			      var appsToLoad = getAppsToLoad();
			      /* We load and bootstrap apps while other apps are unmounting, but we
			       * wait to mount the app until all apps are finishing unmounting
			       */

			      var loadThenMountPromises = appsToLoad.map(function (app) {
			        return toLoadPromise(app).then(toBootstrapPromise).then(function (app) {
			          return unmountAllPromise.then(function () {
			            return toMountPromise(app);
			          });
			        });
			      });

			      if (loadThenMountPromises.length > 0) {
			        wasNoOp = false;
			      }
			      /* These are the apps that are already bootstrapped and just need
			       * to be mounted. They each wait for all unmounting apps to finish up
			       * before they mount.
			       */


			      var mountPromises = getAppsToMount().filter(function (appToMount) {
			        return appsToLoad.indexOf(appToMount) < 0;
			      }).map(function (appToMount) {
			        return toBootstrapPromise(appToMount).then(function () {
			          return unmountAllPromise;
			        }).then(function () {
			          return toMountPromise(appToMount);
			        });
			      });

			      if (mountPromises.length > 0) {
			        wasNoOp = false;
			      }

			      return unmountAllPromise.catch(function (err) {
			        callAllEventListeners();
			        throw err;
			      }).then(function () {
			        /* Now that the apps that needed to be unmounted are unmounted, their DOM navigation
			         * events (like hashchange or popstate) should have been cleaned up. So it's safe
			         * to let the remaining captured event listeners to handle about the DOM event.
			         */
			        callAllEventListeners();
			        return Promise.all(loadThenMountPromises.concat(mountPromises)).catch(function (err) {
			          pendingPromises.forEach(function (promise) {
			            return promise.reject(err);
			          });
			          throw err;
			        }).then(function () {
			          return finishUpAndReturn(false);
			        });
			      });
			    });
			  }

			  function finishUpAndReturn() {
			    var callEventListeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
			    var returnValue = getMountedApps();

			    if (callEventListeners) {
			      callAllEventListeners();
			    }

			    pendingPromises.forEach(function (promise) {
			      return promise.resolve(returnValue);
			    });

			    try {
			      var appChangeEventName = wasNoOp ? "single-spa:no-app-change" : "single-spa:app-change";
			      window.dispatchEvent(new customEvent(appChangeEventName, getCustomEventDetail()));
			      window.dispatchEvent(new customEvent("single-spa:routing-event", getCustomEventDetail()));
			    } catch (err) {
			      /* We use a setTimeout because if someone else's event handler throws an error, single-spa
			       * needs to carry on. If a listener to the event throws an error, it's their own fault, not
			       * single-spa's.
			       */
			      setTimeout(function () {
			        throw err;
			      });
			    }
			    /* Setting this allows for subsequent calls to reroute() to actually perform
			     * a reroute instead of just getting queued behind the current reroute call.
			     * We want to do this after the mounting/unmounting is done but before we
			     * resolve the promise for the `reroute` function.
			     */


			    appChangeUnderway = false;

			    if (peopleWaitingOnAppChange.length > 0) {
			      /* While we were rerouting, someone else triggered another reroute that got queued.
			       * So we need reroute again.
			       */
			      var nextPendingPromises = peopleWaitingOnAppChange;
			      peopleWaitingOnAppChange = [];
			      reroute(nextPendingPromises);
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

			  function getCustomEventDetail() {
			    var result = {
			      detail: {}
			    };

			    if (eventArguments && eventArguments[0]) {
			      result.detail.originalEvent = eventArguments[0];
			    }

			    return result;
			  }
			}

			var started = false;
			function start() {
			  started = true;
			  reroute();
			}
			function isStarted() {
			  return started;
			}
			var startWarningDelay = 5000;
			setTimeout(function () {
			  if (!started) {
			    console.warn("singleSpa.start() has not been called, ".concat(startWarningDelay, "ms after single-spa was loaded. Before start() is called, apps can be declared and loaded, but not bootstrapped or mounted. See https://github.com/CanopyTax/single-spa/blob/master/docs/single-spa-api.md#start"));
			  }
			}, startWarningDelay);

			var devtools = {
			  getRawAppData: getRawAppData,
			  reroute: reroute,
			  NOT_LOADED: NOT_LOADED,
			  toLoadPromise: toLoadPromise,
			  toBootstrapPromise: toBootstrapPromise,
			  unregisterApplication: unregisterApplication
			};

			if (window && window.__SINGLE_SPA_DEVTOOLS__) {
			  window.__SINGLE_SPA_DEVTOOLS__.exposedMethods = devtools;
			}

		}
	};
});
//# sourceMappingURL=single-spa.dev.js.map
