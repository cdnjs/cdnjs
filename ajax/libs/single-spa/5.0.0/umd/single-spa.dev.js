/* single-spa@5.0.0 - UMD - dev */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

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
	  if (typeof handler !== "function") {
	    throw Error(formatErrorMessage(28,  "a single-spa error handler must be a function"));
	  }

	  errorHandlers.push(handler);
	}
	function removeErrorHandler(handler) {
	  if (typeof handler !== "function") {
	    throw Error(formatErrorMessage(29,  "a single-spa error handler must be a function"));
	  }

	  var removedSomething = false;
	  errorHandlers = errorHandlers.filter(function (h) {
	    var isHandler = h === handler;
	    removedSomething = removedSomething || isHandler;
	    return !isHandler;
	  });
	  return removedSomething;
	}
	function formatErrorMessage(code, msg) {
	  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  return "single-spa minified message #".concat(code, ": ").concat(msg ? msg + " " : "", "See https://single-spa.js.org/error/?code=").concat(code).concat(args.length ? "&arg=".concat(args.join("&arg=")) : "");
	}
	function transformErr(ogErr, appOrParcel) {
	  var errPrefix = "".concat(objectType(appOrParcel), " '").concat(toName(appOrParcel), "' died in status ").concat(appOrParcel.status, ": ");
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
	    console.warn(formatErrorMessage(30,  "While ".concat(appOrParcel.status, ", '").concat(toName(appOrParcel), "' rejected its lifecycle function promise with a non-Error. This will cause stack traces to not be accurate."), appOrParcel.status, toName(appOrParcel)));

	    try {
	      result = Error(errPrefix + JSON.stringify(ogErr));
	    } catch (err) {
	      // If it's not an Error and you can't stringify it, then what else can you even do to it?
	      result = ogErr;
	    }
	  }

	  result.appOrParcelName = toName(appOrParcel);
	  return result;
	}

	var NOT_LOADED = "NOT_LOADED";
	var LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE";
	var NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED";
	var BOOTSTRAPPING = "BOOTSTRAPPING";
	var NOT_MOUNTED = "NOT_MOUNTED";
	var MOUNTING = "MOUNTING";
	var MOUNTED = "MOUNTED";
	var UPDATING = "UPDATING";
	var UNMOUNTING = "UNMOUNTING";
	var UNLOADING = "UNLOADING";
	var LOAD_ERROR = "LOAD_ERROR";
	var SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN";
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
	function isParcel(appOrParcel) {
	  return Boolean(appOrParcel.unmountThisParcel);
	}
	function objectType(appOrParcel) {
	  return isParcel(appOrParcel) ? "parcel" : "application";
	}

	// Object.assign() is not available in IE11. And the babel compiled output for object spread
	// syntax checks a bunch of Symbol stuff and is almost a kb. So this function is the smaller replacement.
	function assign() {
	  for (var i = arguments.length - 1; i > 0; i--) {
	    for (var key in arguments[i]) {
	      if (key === "__proto__") {
	        continue;
	      }

	      arguments[i - 1][key] = arguments[i][key];
	    }
	  }

	  return arguments[0];
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
	  return fn && (typeof fn === "function" || isArrayOfFns(fn));

	  function isArrayOfFns(arr) {
	    return Array.isArray(arr) && !find(arr, function (item) {
	      return typeof item !== "function";
	    });
	  }
	}
	function flattenFnArray(appOrParcel, lifecycle) {
	  var fns = appOrParcel[lifecycle] || [];
	  fns = Array.isArray(fns) ? fns : [fns];

	  if (fns.length === 0) {
	    fns = [function () {
	      return Promise.resolve();
	    }];
	  }

	  var type = objectType(appOrParcel);
	  var name = toName(appOrParcel);
	  return function (props) {
	    return fns.reduce(function (resultPromise, fn, index) {
	      return resultPromise.then(function () {
	        var thisPromise = fn(props);
	        return smellsLikeAPromise(thisPromise) ? thisPromise : Promise.reject(formatErrorMessage(15,  "Within ".concat(type, " ").concat(name, ", the lifecycle function ").concat(lifecycle, " at array index ").concat(index, " did not return a promise"), type, name, lifecycle, index));
	      });
	    }, Promise.resolve());
	  };
	}
	function smellsLikeAPromise(promise) {
	  return promise && typeof promise.then === "function" && typeof promise.catch === "function";
	}

	function toBootstrapPromise(appOrParcel, hardFail) {
	  return Promise.resolve().then(function () {
	    if (appOrParcel.status !== NOT_BOOTSTRAPPED) {
	      return appOrParcel;
	    }

	    appOrParcel.status = BOOTSTRAPPING;
	    return reasonableTime(appOrParcel, "bootstrap").then(function () {
	      appOrParcel.status = NOT_MOUNTED;
	      return appOrParcel;
	    }).catch(function (err) {
	      appOrParcel.status = SKIP_BECAUSE_BROKEN;

	      if (hardFail) {
	        throw transformErr(err, appOrParcel);
	      } else {
	        handleAppError(err, appOrParcel);
	        return appOrParcel;
	      }
	    });
	  });
	}

	function toUnmountPromise(appOrParcel, hardFail) {
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
	      return reasonableTime(appOrParcel, "unmount").then(function () {
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
	function toMountPromise(appOrParcel, hardFail) {
	  return Promise.resolve().then(function () {
	    if (appOrParcel.status !== NOT_MOUNTED) {
	      return appOrParcel;
	    }

	    if (!beforeFirstMountFired) {
	      window.dispatchEvent(new customEvent("single-spa:before-first-mount"));
	      beforeFirstMountFired = true;
	    }

	    return reasonableTime(appOrParcel, "mount").then(function () {
	      appOrParcel.status = MOUNTED;

	      if (!firstMountFired) {
	        window.dispatchEvent(new customEvent("single-spa:first-mount"));
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
	      throw Error(formatErrorMessage(32,  "Cannot update parcel '".concat(toName(parcel), "' because it is not mounted"), toName(parcel)));
	    }

	    parcel.status = UPDATING;
	    return reasonableTime(parcel, "update").then(function () {
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

	  if (!config || _typeof(config) !== "object" && typeof config !== "function") {
	    throw Error(formatErrorMessage(2,  "Cannot mount parcel without a config object or config loading function"));
	  }

	  if (config.name && typeof config.name !== "string") {
	    throw Error(formatErrorMessage(3,  "Parcel name must be a string, if provided. Was given ".concat(_typeof(config.name)), _typeof(config.name)));
	  }

	  if (_typeof(customProps) !== "object") {
	    throw Error(formatErrorMessage(4,  "Parcel ".concat(name, " has invalid customProps -- must be an object but was given ").concat(_typeof(customProps)), name, _typeof(customProps)));
	  }

	  if (!customProps.domElement) {
	    throw Error(formatErrorMessage(5,  "Parcel ".concat(name, " cannot be mounted without a domElement provided as a prop"), name));
	  }

	  var id = parcelCount++;
	  var passedConfigLoadingFunction = typeof config === "function";
	  var configLoadingFunction = passedConfigLoadingFunction ? config : function () {
	    return Promise.resolve(config);
	  }; // Internal representation

	  var parcel = {
	    id: id,
	    parcels: {},
	    status: passedConfigLoadingFunction ? LOADING_SOURCE_CODE : NOT_BOOTSTRAPPED,
	    customProps: customProps,
	    parentName: toName(owningAppOrParcel),
	    unmountThisParcel: function unmountThisParcel() {
	      if (parcel.status !== MOUNTED) {
	        throw Error(formatErrorMessage(6,  "Cannot unmount parcel '".concat(name, "' -- it is in a ").concat(parcel.status, " status"), name, parcel.status));
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

	  if (!loadPromise || typeof loadPromise.then !== "function") {
	    throw Error(formatErrorMessage(7,  "When mounting a parcel, the config loading function must return a promise that resolves with the parcel config"));
	  }

	  loadPromise = loadPromise.then(function (config) {
	    if (!config) {
	      throw Error(formatErrorMessage(8,  "When mounting a parcel, the config loading function returned a promise that did not resolve with a parcel config"));
	    }

	    var name = config.name || "parcel-".concat(id);

	    if (!validLifecycleFn(config.bootstrap)) {
	      throw Error(formatErrorMessage(9,  "Parcel ".concat(name, " must have a valid bootstrap function"), name));
	    }

	    if (!validLifecycleFn(config.mount)) {
	      throw Error(formatErrorMessage(10,  "Parcel ".concat(name, " must have a valid mount function"), name));
	    }

	    if (!validLifecycleFn(config.unmount)) {
	      throw Error(formatErrorMessage(11,  "Parcel ".concat(name, " must have a valid unmount function"), name));
	    }

	    if (config.update && !validLifecycleFn(config.update)) {
	      throw Error(formatErrorMessage(12,  "Parcel ".concat(name, " provided an invalid update function"), name));
	    }

	    var bootstrap = flattenFnArray(config, "bootstrap");
	    var mount = flattenFnArray(config, "mount");
	    var unmount = flattenFnArray(config, "unmount");
	    parcel.status = NOT_BOOTSTRAPPED;
	    parcel.name = name;
	    parcel.bootstrap = bootstrap;
	    parcel.mount = mount;
	    parcel.unmount = unmount;
	    parcel.timeouts = ensureValidAppTimeouts(config.timeouts);

	    if (config.update) {
	      parcel.update = flattenFnArray(config, "update");

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
	          throw Error(formatErrorMessage(13,  "Cannot mount parcel '".concat(name, "' -- it is in a ").concat(parcel.status, " status"), name, parcel.status));
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
	  var result = assign({}, appOrParcel.customProps, {
	    name: toName(appOrParcel),
	    mountParcel: mountParcel.bind(appOrParcel),
	    singleSpa: singleSpa
	  });

	  if (isParcel(appOrParcel)) {
	    result.unmountSelf = appOrParcel.unmountThisParcel;
	  }

	  return result;
	}

	var defaultWarningMillis = 1000;
	var globalTimeoutConfig = {
	  bootstrap: {
	    millis: 4000,
	    dieOnTimeout: false,
	    warningMillis: defaultWarningMillis
	  },
	  mount: {
	    millis: 3000,
	    dieOnTimeout: false,
	    warningMillis: defaultWarningMillis
	  },
	  unmount: {
	    millis: 3000,
	    dieOnTimeout: false,
	    warningMillis: defaultWarningMillis
	  },
	  unload: {
	    millis: 3000,
	    dieOnTimeout: false,
	    warningMillis: defaultWarningMillis
	  },
	  update: {
	    millis: 3000,
	    dieOnTimeout: false,
	    warningMillis: defaultWarningMillis
	  }
	};
	function setBootstrapMaxTime(time, dieOnTimeout, warningMillis) {
	  if (typeof time !== "number" || time <= 0) {
	    throw Error(formatErrorMessage(16,  "bootstrap max time must be a positive integer number of milliseconds"));
	  }

	  globalTimeoutConfig.bootstrap = {
	    millis: time,
	    dieOnTimeout: dieOnTimeout,
	    warningMillis: warningMillis || defaultWarningMillis
	  };
	}
	function setMountMaxTime(time, dieOnTimeout, warningMillis) {
	  if (typeof time !== "number" || time <= 0) {
	    throw Error(formatErrorMessage(17,  "mount max time must be a positive integer number of milliseconds"));
	  }

	  globalTimeoutConfig.mount = {
	    millis: time,
	    dieOnTimeout: dieOnTimeout,
	    warningMillis: warningMillis || defaultWarningMillis
	  };
	}
	function setUnmountMaxTime(time, dieOnTimeout, warningMillis) {
	  if (typeof time !== "number" || time <= 0) {
	    throw Error(formatErrorMessage(18,  "unmount max time must be a positive integer number of milliseconds"));
	  }

	  globalTimeoutConfig.unmount = {
	    millis: time,
	    dieOnTimeout: dieOnTimeout,
	    warningMillis: warningMillis || defaultWarningMillis
	  };
	}
	function setUnloadMaxTime(time, dieOnTimeout, warningMillis) {
	  if (typeof time !== "number" || time <= 0) {
	    throw Error(formatErrorMessage(19,  "unload max time must be a positive integer number of milliseconds"));
	  }

	  globalTimeoutConfig.unload = {
	    millis: time,
	    dieOnTimeout: dieOnTimeout,
	    warningMillis: warningMillis || defaultWarningMillis
	  };
	}
	function reasonableTime(appOrParcel, lifecycle) {
	  var timeoutConfig = appOrParcel.timeouts[lifecycle];
	  var warningPeriod = timeoutConfig.warningMillis;
	  var type = objectType(appOrParcel);
	  return new Promise(function (resolve, reject) {
	    var finished = false;
	    var errored = false;
	    appOrParcel[lifecycle](getProps(appOrParcel)).then(function (val) {
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
	    var errMsg = formatErrorMessage(31,  "Lifecycle function ".concat(lifecycle, " for ").concat(type, " ").concat(toName(appOrParcel), " lifecycle did not resolve or reject for ").concat(timeoutConfig.millis, " ms."), lifecycle, type, toName(appOrParcel), timeoutConfig.millis);

	    function maybeTimingOut(shouldError) {
	      if (!finished) {
	        if (shouldError === true) {
	          errored = true;

	          if (timeoutConfig.dieOnTimeout) {
	            reject(Error(errMsg));
	          } else {
	            console.error(errMsg); //don't resolve or reject, we're waiting this one out
	          }
	        } else if (!errored) {
	          var numWarnings = shouldError;
	          var numMillis = numWarnings * warningPeriod;
	          console.warn(errMsg);

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
	function ensureValidAppTimeouts(timeouts) {
	  var result = {};

	  for (var key in globalTimeoutConfig) {
	    result[key] = assign({}, globalTimeoutConfig[key], timeouts && timeouts[key] || {});
	  }

	  return result;
	}

	function toLoadPromise(app) {
	  return Promise.resolve().then(function () {
	    if (app.status !== NOT_LOADED && app.status !== LOAD_ERROR) {
	      return app;
	    }

	    app.status = LOADING_SOURCE_CODE;
	    var appOpts, isUserErr;
	    return Promise.resolve().then(function () {
	      var loadPromise = app.loadImpl(getProps(app));

	      if (!smellsLikeAPromise(loadPromise)) {
	        // The name of the app will be prepended to this error message inside of the handleAppError function
	        isUserErr = true;
	        throw Error(formatErrorMessage(33,  "single-spa loading function did not return a promise. Check the second argument to registerApplication('".concat(toName(app), "', loadingFunction, activityFunction)"), toName(app)));
	      }

	      return loadPromise.then(function (val) {
	        app.loadErrorTime = null;
	        appOpts = val;
	        var validationErrMessage, validationErrCode;

	        if (_typeof(appOpts) !== "object") {
	          validationErrCode = 34;

	          {
	            validationErrMessage = "does not export anything";
	          }
	        }

	        if (!validLifecycleFn(appOpts.bootstrap)) {
	          validationErrCode = 35;

	          {
	            validationErrMessage = "does not export a bootstrap function or array of functions";
	          }
	        }

	        if (!validLifecycleFn(appOpts.mount)) {
	          validationErrCode = 36;

	          {
	            validationErrMessage = "does not export a bootstrap function or array of functions";
	          }
	        }

	        if (!validLifecycleFn(appOpts.unmount)) {
	          validationErrCode = 37;

	          {
	            validationErrMessage = "does not export a bootstrap function or array of functions";
	          }
	        }

	        var type = objectType(appOpts);

	        if (validationErrCode) {
	          var appOptsStr;

	          try {
	            appOptsStr = JSON.stringify(appOpts);
	          } catch (_unused) {}

	          console.error(formatErrorMessage(validationErrCode,  "The loading function for single-spa ".concat(type, " '").concat(toName(app), "' resolved with the following, which does not have bootstrap, mount, and unmount functions"), type, toName(app), appOptsStr), appOpts);
	          handleAppError(validationErrMessage, app);
	          app.status = SKIP_BECAUSE_BROKEN;
	          return app;
	        }

	        if (appOpts.devtools && appOpts.devtools.overlays) {
	          app.devtools.overlays = assign({}, app.devtools.overlays, appOpts.devtools.overlays);
	        }

	        app.status = NOT_BOOTSTRAPPED;
	        app.bootstrap = flattenFnArray(appOpts, "bootstrap");
	        app.mount = flattenFnArray(appOpts, "mount");
	        app.unmount = flattenFnArray(appOpts, "unmount");
	        app.unload = flattenFnArray(appOpts, "unload");
	        app.timeouts = ensureValidAppTimeouts(appOpts.timeouts);
	        return app;
	      });
	    }).catch(function (err) {
	      handleAppError(err, app);

	      if (isUserErr) {
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
	var routingEventsListeningTo = ["hashchange", "popstate"];
	function navigateToUrl(obj) {
	  var url;

	  if (typeof obj === "string") {
	    url = obj;
	  } else if (this && this.href) {
	    url = this.href;
	  } else if (obj && obj.currentTarget && obj.currentTarget.href && obj.preventDefault) {
	    url = obj.currentTarget.href;
	    obj.preventDefault();
	  } else {
	    throw Error(formatErrorMessage(14,  "singleSpaNavigate/navigateToUrl must be either called with a string url, with an <a> tag as its context, or with an event whose currentTarget is an <a> tag"));
	  }

	  var current = parseUri(window.location.href);
	  var destination = parseUri(url);

	  if (url.indexOf("#") === 0) {
	    window.location.hash = destination.hash;
	  } else if (current.host !== destination.host && destination.host) {
	    {
	      window.location.href = url;
	    }
	  } else if (destination.pathname === current.pathname && destination.search === current.pathname) {
	    window.location.hash = destination.hash;
	  } else {
	    // different path, host, or query params
	    window.history.pushState(null, null, url);
	  }
	}
	function callCapturedEventListeners(eventArguments) {
	  var _this = this;

	  if (eventArguments) {
	    var eventType = eventArguments[0].type;

	    if (routingEventsListeningTo.indexOf(eventType) >= 0) {
	      capturedEventListeners[eventType].forEach(function (listener) {
	        try {
	          // The error thrown by application event listener should not break single-spa down.
	          // Just like https://github.com/single-spa/single-spa/blob/85f5042dff960e40936f3a5069d56fc9477fac04/src/navigation/reroute.js#L140-L146 did
	          listener.apply(_this, eventArguments);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          });
	        }
	      });
	    }
	  }
	}

	function urlReroute() {
	  reroute([], arguments);
	} // We will trigger an app change for any routing events.


	window.addEventListener("hashchange", urlReroute);
	window.addEventListener("popstate", urlReroute); // Monkeypatch addEventListener so that we can ensure correct timing

	var originalAddEventListener = window.addEventListener;
	var originalRemoveEventListener = window.removeEventListener;

	window.addEventListener = function (eventName, fn) {
	  if (typeof fn === "function") {
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
	  if (typeof listenerFn === "function") {
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
	  // https://github.com/single-spa/single-spa/issues/224 and https://github.com/single-spa/single-spa-angular/issues/49
	  // We need a popstate event even though the browser doesn't do one by default when you call replaceState, so that
	  // all the applications can reroute.
	  try {
	    return new PopStateEvent("popstate", {
	      state: state
	    });
	  } catch (err) {
	    // IE 11 compatibility https://github.com/single-spa/single-spa/issues/299
	    // https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-html5e/bd560f47-b349-4d2c-baa8-f1560fb489dd
	    var evt = document.createEvent("PopStateEvent");
	    evt.initPopStateEvent("popstate", false, false, state);
	    return evt;
	  }
	}
	/* For convenience in `onclick` attributes, we expose a global function for navigating to
	 * whatever an <a> tag's href is.
	 */


	window.singleSpaNavigate = navigateToUrl;

	function parseUri(str) {
	  var anchor = document.createElement("a");
	  anchor.href = str;
	  return anchor;
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
	  if (typeof eventString !== "string") {
	    return originalJQueryFunction.apply(this, originalArgs);
	  }

	  var eventNames = eventString.split(/\s+/);
	  eventNames.forEach(function (eventName) {
	    if (routingEventsListeningTo.indexOf(eventName) >= 0) {
	      nativeFunctionToCall(eventName, fn);
	      eventString = eventString.replace(eventName, "");
	    }
	  });

	  if (eventString.trim() === "") {
	    return this;
	  } else {
	    return originalJQueryFunction.apply(this, originalArgs);
	  }
	}

	var appsToUnload = {};
	function toUnloadPromise(app) {
	  return Promise.resolve().then(function () {
	    var unloadInfo = appsToUnload[toName(app)];

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
	    return reasonableTime(app, "unload").then(function () {
	      finishUnloadingApp(app, unloadInfo);
	      return app;
	    }).catch(function (err) {
	      errorUnloadingApp(app, unloadInfo, err);
	      return app;
	    });
	  });
	}

	function finishUnloadingApp(app, unloadInfo) {
	  delete appsToUnload[toName(app)]; // Unloaded apps don't have lifecycles

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
	  delete appsToUnload[toName(app)]; // Unloaded apps don't have lifecycles

	  delete app.bootstrap;
	  delete app.mount;
	  delete app.unmount;
	  delete app.unload;
	  handleAppError(err, app);
	  app.status = SKIP_BECAUSE_BROKEN;
	  unloadInfo.reject(err);
	}

	function addAppToUnload(app, promiseGetter, resolve, reject) {
	  appsToUnload[toName(app)] = {
	    app: app,
	    resolve: resolve,
	    reject: reject
	  };
	  Object.defineProperty(appsToUnload[toName(app)], "promise", {
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
	    return toName(app) === appName;
	  });
	  return app ? app.status : null;
	}
	function registerApplication(appName, applicationOrLoadingFn, activityFn) {
	  var customProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  if (typeof appName !== "string" || appName.length === 0) throw Error(formatErrorMessage(20,  "The first argument to registerApplication must be a non-empty string 'appName'"));
	  if (getAppNames().indexOf(appName) !== -1) throw Error(formatErrorMessage(21,  "There is already an app declared with name ".concat(appName), appName));
	  if (_typeof(customProps) !== "object" || Array.isArray(customProps)) throw Error(formatErrorMessage(22,  "customProps must be an object"));
	  if (!applicationOrLoadingFn) throw Error(formatErrorMessage(23,  "The application or loading function is required"));
	  var loadImpl;

	  if (typeof applicationOrLoadingFn !== "function") {
	    // applicationOrLoadingFn is an application
	    loadImpl = function loadImpl() {
	      return Promise.resolve(applicationOrLoadingFn);
	    };
	  } else {
	    // applicationOrLoadingFn is a loadingFn
	    loadImpl = applicationOrLoadingFn;
	  }

	  if (typeof activityFn !== "function") throw Error(formatErrorMessage(24,  "The activityFunction argument must be a function"));
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
	  return apps.filter(function (app) {
	    return app.activeWhen(location);
	  }).map(toName);
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
	    return toName(app) === appName;
	  })) {
	    throw Error(formatErrorMessage(25,  "Cannot unregister application '".concat(appName, "' because no such application has been registered"), appName));
	  }

	  return unloadApplication(appName).then(function () {
	    var appIndex = apps.findIndex(function (app) {
	      return toName(app) === appName;
	    });
	    apps.splice(appIndex, 1);
	  });
	}
	function unloadApplication(appName) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    waitForUnmount: false
	  };

	  if (typeof appName !== "string") {
	    throw Error(formatErrorMessage(26,  "unloadApplication requires a string 'appName'"));
	  }

	  var app = find(apps, function (App) {
	    return toName(App) === appName;
	  });

	  if (!app) {
	    throw Error(formatErrorMessage(27,  "Could not unload application '".concat(appName, "' because no such application has been registered"), appName));
	  }

	  var appUnloadInfo = getAppUnloadInfo(toName(app));

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
	setTimeout(function () {
	  if (!started) {
	    console.warn(formatErrorMessage(1,  "singleSpa.start() has not been called, 5000ms after single-spa was loaded. Before start() is called, apps can be declared and loaded, but not bootstrapped or mounted."));
	  }
	}, 5000);

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

	exports.BOOTSTRAPPING = BOOTSTRAPPING;
	exports.LOADING_SOURCE_CODE = LOADING_SOURCE_CODE;
	exports.LOAD_ERROR = LOAD_ERROR;
	exports.MOUNTED = MOUNTED;
	exports.MOUNTING = MOUNTING;
	exports.NOT_BOOTSTRAPPED = NOT_BOOTSTRAPPED;
	exports.NOT_LOADED = NOT_LOADED;
	exports.NOT_MOUNTED = NOT_MOUNTED;
	exports.SKIP_BECAUSE_BROKEN = SKIP_BECAUSE_BROKEN;
	exports.UNMOUNTING = UNMOUNTING;
	exports.UPDATING = UPDATING;
	exports.addErrorHandler = addErrorHandler;
	exports.checkActivityFunctions = checkActivityFunctions;
	exports.ensureJQuerySupport = ensureJQuerySupport;
	exports.getAppNames = getAppNames;
	exports.getAppStatus = getAppStatus;
	exports.getMountedApps = getMountedApps;
	exports.mountRootParcel = mountRootParcel;
	exports.navigateToUrl = navigateToUrl;
	exports.registerApplication = registerApplication;
	exports.removeErrorHandler = removeErrorHandler;
	exports.setBootstrapMaxTime = setBootstrapMaxTime;
	exports.setMountMaxTime = setMountMaxTime;
	exports.setUnloadMaxTime = setUnloadMaxTime;
	exports.setUnmountMaxTime = setUnmountMaxTime;
	exports.start = start;
	exports.triggerAppChange = triggerAppChange;
	exports.unloadApplication = unloadApplication;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.dev.js.map
