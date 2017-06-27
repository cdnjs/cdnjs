// apiCheck.js v7.0.0-beta.4 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["apiCheck"] = factory();
	else
		root["apiCheck"] = factory();
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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = __webpack_require__(/*! ./apiCheck */ 1);

/***/ },
/* 1 */
/*!*********************!*\
  !*** ./apiCheck.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var stringify = __webpack_require__(/*! json-stringify-safe */ 4);
	var apiCheckUtil = __webpack_require__(/*! ./apiCheckUtil */ 2);
	var each = apiCheckUtil.each;
	var isError = apiCheckUtil.isError;
	var t = apiCheckUtil.t;
	var arrayify = apiCheckUtil.arrayify;
	var getCheckerDisplay = apiCheckUtil.getCheckerDisplay;
	var typeOf = apiCheckUtil.typeOf;
	var getError = apiCheckUtil.getError;
	
	var checkers = __webpack_require__(/*! ./checkers */ 3);
	var apiCheckApis = getApiCheckApis();
	
	module.exports = getApiCheckInstance;
	module.exports.utils = apiCheckUtil;
	module.exports.globalConfig = {
	  verbose: false,
	  disabled: false
	};
	
	var apiCheckApiCheck = getApiCheckInstance({
	  output: { prefix: "apiCheck" }
	});
	module.exports.internalChecker = apiCheckApiCheck;
	
	each(checkers, function (checker, name) {
	  return module.exports[name] = checker;
	});
	
	function getApiCheckInstance() {
	  var config = arguments[0] === undefined ? {} : arguments[0];
	  var extraCheckers = arguments[1] === undefined ? {} : arguments[1];
	
	  /* jshint maxcomplexity:6 */
	  if (apiCheckApiCheck && arguments.length) {
	    apiCheckApiCheck["throw"](apiCheckApis.getApiCheckInstanceCheckers, arguments, {
	      prefix: "creating an apiCheck instance"
	    });
	  }
	
	  var additionalProperties = {
	    "throw": getApiCheck(true),
	    warn: getApiCheck(false),
	    getErrorMessage: getErrorMessage,
	    handleErrorMessage: handleErrorMessage,
	    config: {
	      output: config.output || {
	        prefix: "",
	        suffix: "",
	        docsBaseUrl: ""
	      },
	      verbose: config.verbose || false,
	      disabled: config.disabled || false
	    },
	    utils: apiCheckUtil
	  };
	
	  each(additionalProperties, function (wrapper, name) {
	    return apiCheck[name] = wrapper;
	  });
	
	  var disabled = apiCheck.disabled || module.exports.globalConfig.disabled;
	  each(checkers.getCheckers(disabled), function (checker, name) {
	    return apiCheck[name] = checker;
	  });
	  each(extraCheckers, function (checker, name) {
	    return apiCheck[name] = checker;
	  });
	
	  return apiCheck;
	
	  /**
	   * This is the instance function. Other things are attached to this see additional properties above.
	   * @param api {Array}
	   * @param args {arguments}
	   * @param output {Object}
	   * @returns {Object} - if this has a failed = true property, then it failed
	   */
	  function apiCheck(api, args, output) {
	    /* jshint maxcomplexity:8 */
	    if (apiCheck.config.disabled || module.exports.globalConfig.disabled) {
	      return {
	        apiTypes: {}, argTypes: {},
	        passed: true, message: "",
	        failed: false
	      }; // empty version of what is normally returned
	    }
	    checkApiCheckApi(arguments);
	    if (!Array.isArray(api)) {
	      api = [api];
	      args = [args];
	    } else {
	      // turn arguments into an array
	      args = Array.prototype.slice.call(args);
	    }
	    var messages = checkEnoughArgs(api, args);
	    if (!messages.length) {
	      // this is where we actually go perform the checks.
	      messages = checkApiWithArgs(api, args);
	    }
	
	    var returnObject = getTypes(api, args);
	    if (messages.length) {
	      returnObject.message = apiCheck.getErrorMessage(api, args, messages, output);
	      returnObject.failed = true;
	      returnObject.passed = false;
	    } else {
	      returnObject.message = "";
	      returnObject.failed = false;
	      returnObject.passed = true;
	    }
	    return returnObject;
	  }
	
	  /**
	   * checkApiCheckApi, should be read like: check apiCheck api. As in, check the api for apiCheck :-)
	   * @param checkApiArgs
	   */
	  function checkApiCheckApi(checkApiArgs) {
	    var api = checkApiArgs[0];
	    var args = checkApiArgs[1];
	    var isArrayOrArgs = Array.isArray(args) || args && typeof args === "object" && typeof args.length === "number";
	
	    if (Array.isArray(api) && !isArrayOrArgs) {
	      throw new Error(getErrorMessage(api, [args], ["If an array is provided for the api, an array must be provided for the args as well."], { prefix: "apiCheck" }));
	    }
	    // dog fooding here
	    var errors = checkApiWithArgs(apiCheckApis.checkApiCheckApi, checkApiArgs);
	    if (errors.length) {
	      var message = apiCheck.getErrorMessage(apiCheckApis.checkApiCheckApi, checkApiArgs, errors, {
	        prefix: "apiCheck"
	      });
	      apiCheck.handleErrorMessage(message, true);
	    }
	  }
	
	  function getApiCheck(shouldThrow) {
	    return function apiCheckWrapper(api, args, output) {
	      var result = apiCheck(api, args, output);
	      apiCheck.handleErrorMessage(result.message, shouldThrow);
	      return result; // wont get here if an error is thrown
	    };
	  }
	
	  function handleErrorMessage(message, shouldThrow) {
	    if (shouldThrow && message) {
	      throw new Error(message);
	    } else if (message) {
	      console.warn(message);
	    }
	  }
	
	  function getErrorMessage(api, args) {
	    var messages = arguments[2] === undefined ? [] : arguments[2];
	    var output = arguments[3] === undefined ? {} : arguments[3];
	
	    var gOut = apiCheck.config.output || {};
	    var prefix = getPrefix();
	    var suffix = getSuffix();
	    var url = getUrl();
	    var message = "apiCheck failed! " + messages.join(", ");
	    var passedAndShouldHavePassed = "\n\n" + buildMessageFromApiAndArgs(api, args);
	    return ("" + prefix + " " + message + " " + suffix + " " + (url || "") + "" + passedAndShouldHavePassed).trim();
	
	    function getPrefix() {
	      var prefix = output.onlyPrefix;
	      if (!prefix) {
	        prefix = ("" + (gOut.prefix || "") + " " + (output.prefix || "")).trim();
	      }
	      return prefix;
	    }
	
	    function getSuffix() {
	      var suffix = output.onlySuffix;
	      if (!suffix) {
	        suffix = ("" + (output.suffix || "") + " " + (gOut.suffix || "")).trim();
	      }
	      return suffix;
	    }
	
	    function getUrl() {
	      var url = output.url;
	      if (!url) {
	        url = gOut.docsBaseUrl && output.urlSuffix && ("" + gOut.docsBaseUrl + "" + output.urlSuffix).trim();
	      }
	      return url;
	    }
	  }
	
	  function buildMessageFromApiAndArgs(api, args) {
	    var _getTypes = getTypes(api, args);
	
	    var apiTypes = _getTypes.apiTypes;
	    var argTypes = _getTypes.argTypes;
	
	    var copy = Array.prototype.slice.call(args || []);
	    var replacedItems = [];
	    replaceFunctionWithName(copy);
	    var passedArgs = getObjectString(copy);
	    argTypes = getObjectString(argTypes);
	    apiTypes = getObjectString(apiTypes);
	
	    return generateMessage();
	
	    // functions
	
	    function replaceFunctionWithName(obj) {
	      each(obj, function (val, name) {
	        /* jshint maxcomplexity:6 */
	        if (replacedItems.indexOf(val) === -1) {
	          // avoid recursive problems
	          replacedItems.push(val);
	          if (typeof val === "object") {
	            replaceFunctionWithName(obj);
	          } else if (typeof val === "function") {
	            obj[name] = val.displayName || val.name || "anonymous function";
	          }
	        }
	      });
	    }
	
	    function getObjectString(types) {
	      if (!types || !types.length) {
	        return "nothing";
	      } else if (types && types.length === 1) {
	        types = types[0];
	      }
	      return stringify(types, null, 2);
	    }
	
	    function generateMessage() {
	      var n = "\n";
	      var useS = true;
	      if (args && args.length === 1) {
	        if (typeof args[0] === "object") {
	          useS = !!Object.keys(args[0]).length;
	        } else {
	          useS = false;
	        }
	      }
	      var types = "type" + (useS ? "s" : "");
	      var newLine = n + n;
	      return "You passed:" + n + "" + passedArgs + "" + newLine + ("With the " + types + ":" + n + "" + argTypes + "" + newLine) + ("The API calls for:" + n + "" + apiTypes);
	    }
	  }
	
	  function getTypes(api, args) {
	    api = arrayify(api);
	    args = arrayify(args);
	    var apiTypes = api.map(function (checker, index) {
	      var specified = module.exports.globalConfig.hasOwnProperty("verbose");
	      return getCheckerDisplay(checker, {
	        terse: specified ? !module.exports.globalConfig.verbose : !apiCheck.config.verbose,
	        obj: args[index],
	        addHelpers: true
	      });
	    });
	    var argTypes = args.map(function (arg) {
	      return getArgDisplay(arg, []);
	    });
	    return { argTypes: argTypes, apiTypes: apiTypes };
	  }
	}
	
	// STATELESS FUNCTIONS
	
	/**
	 * This is where the magic happens for actually checking the arguments with the api.
	 * @param api {Array} - checkers
	 * @param args {Array} - and arguments object
	 * @returns {Array}
	 */
	function checkApiWithArgs(api, args) {
	  /* jshint maxcomplexity:7 */
	  var messages = [];
	  var failed = false;
	  var checkerIndex = 0;
	  var argIndex = 0;
	  var arg = undefined,
	      checker = undefined,
	      res = undefined,
	      lastChecker = undefined,
	      argName = undefined,
	      argFailed = undefined,
	      skipPreviousChecker = undefined;
	  /* jshint -W084 */
	  while ((checker = api[checkerIndex++]) && argIndex < args.length) {
	    arg = args[argIndex++];
	    argName = "Argument " + argIndex + (checker.isOptional ? " (optional)" : "");
	    res = checker(arg, "value", argName);
	    argFailed = isError(res);
	    lastChecker = checkerIndex >= api.length;
	    skipPreviousChecker = checkerIndex > 1 && api[checkerIndex - 1].isOptional;
	    if (argFailed && lastChecker || argFailed && !lastChecker && !checker.isOptional && !skipPreviousChecker) {
	      failed = true;
	      messages.push(getCheckerErrorMessage(res, checker, arg));
	    } else if (argFailed && checker.isOptional) {
	      argIndex--;
	    } else {
	      messages.push("" + t(argName) + " passed");
	    }
	  }
	  return failed ? messages : [];
	}
	
	checkerTypeType.type = "function with __apiCheckData property and `${function.type}` property";
	function checkerTypeType(checkerType, name, location) {
	  var apiCheckDataChecker = checkers.shape({
	    type: checkers.string,
	    optional: checkers.bool
	  });
	  var asFunc = checkers.func.withProperties({ __apiCheckData: apiCheckDataChecker });
	  var asShape = checkers.shape({ __apiCheckData: apiCheckDataChecker });
	  var wrongShape = checkers.oneOfType([asFunc, asShape])(checkerType, name, location);
	  if (isError(wrongShape)) {
	    return wrongShape;
	  }
	  if (typeof checkerType !== "function" && !checkerType.hasOwnProperty(checkerType.__apiCheckData.type)) {
	    return getError(name, location, checkerTypeType.type);
	  }
	}
	
	function getCheckerErrorMessage(res, checker, val) {
	  var checkerHelp = getCheckerHelp(checker, val);
	  checkerHelp = checkerHelp ? " - " + checkerHelp : "";
	  return res.message + checkerHelp;
	}
	
	function getCheckerHelp(_ref, val) {
	  var help = _ref.help;
	
	  if (!help) {
	    return "";
	  }
	  if (typeof help === "function") {
	    help = help(val);
	  }
	  return help;
	}
	
	function checkEnoughArgs(api, args) {
	  var requiredArgs = api.filter(function (a) {
	    return !a.isOptional;
	  });
	  if (args.length < requiredArgs.length) {
	    return ["Not enough arguments specified. Requires `" + requiredArgs.length + "`, you passed `" + args.length + "`"];
	  } else {
	    return [];
	  }
	}
	
	function getArgDisplay(arg, gottenArgs) {
	  /* jshint maxcomplexity:7 */
	  var cName = arg && arg.constructor && arg.constructor.name;
	  var type = typeOf(arg);
	  if (type === "function") {
	    if (hasKeys()) {
	      var properties = stringify(getDisplayIfNotGotten());
	      return cName + " (with properties: " + properties + ")";
	    }
	    return cName;
	  }
	
	  if (arg === null) {
	    return "null";
	  }
	
	  if (type !== "array" && type !== "object") {
	    return type;
	  }
	
	  if (hasKeys()) {
	    return getDisplayIfNotGotten();
	  }
	
	  return cName;
	
	  // utility functions
	  function hasKeys() {
	    return arg && Object.keys(arg).length;
	  }
	
	  function getDisplayIfNotGotten() {
	    if (gottenArgs.indexOf(arg) !== -1) {
	      return "[Circular]";
	    }
	    gottenArgs.push(arg);
	    return getDisplay(arg, gottenArgs);
	  }
	}
	
	function getDisplay(obj, gottenArgs) {
	  var argDisplay = {};
	  each(obj, function (v, k) {
	    return argDisplay[k] = getArgDisplay(v, gottenArgs);
	  });
	  return argDisplay;
	}
	
	function getApiCheckApis() {
	  var os = checkers.string.optional;
	
	  var checkerFnChecker = checkers.func.withProperties({
	    type: checkers.oneOfType([checkers.string, checkerTypeType]).optional,
	    displayName: checkers.string.optional,
	    shortType: checkers.string.optional,
	    notOptional: checkers.bool.optional,
	    notRequired: checkers.bool.optional
	  });
	
	  var getApiCheckInstanceCheckers = [checkers.shape({
	    output: checkers.shape({
	      prefix: checkers.string.optional,
	      suffix: checkers.string.optional,
	      docsBaseUrl: checkers.string.optional
	    }).strict.optional,
	    verbose: checkers.bool.optional,
	    disabled: checkers.bool.optional
	  }).strict.optional, checkers.objectOf(checkerFnChecker).optional];
	
	  var checkApiCheckApi = [checkers.typeOrArrayOf(checkerFnChecker), checkers.any.optional, checkers.shape({
	    prefix: os, suffix: os, urlSuffix: os, // appended case
	    onlyPrefix: os, onlySuffix: os, url: os // override case
	  }).strict.optional];
	
	  return {
	    checkerFnChecker: checkerFnChecker,
	    getApiCheckInstanceCheckers: getApiCheckInstanceCheckers,
	    checkApiCheckApi: checkApiCheckApi
	  };
	}

/***/ },
/* 2 */
/*!*************************!*\
  !*** ./apiCheckUtil.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	var stringify = __webpack_require__(/*! json-stringify-safe */ 4);
	var checkerHelpers = {
	  addOptional: addOptional, getRequiredVersion: getRequiredVersion, setupChecker: setupChecker
	};
	
	module.exports = {
	  each: each, copy: copy, typeOf: typeOf, arrayify: arrayify, getCheckerDisplay: getCheckerDisplay,
	  isError: isError, list: list, getError: getError, nAtL: nAtL, t: t, undef: undef, checkerHelpers: checkerHelpers,
	  noop: noop
	};
	
	function copy(obj) {
	  var type = typeOf(obj);
	  var daCopy = undefined;
	  if (type === "array") {
	    daCopy = [];
	  } else if (type === "object") {
	    daCopy = {};
	  } else {
	    return obj;
	  }
	  each(obj, function (val, key) {
	    daCopy[key] = val; // cannot single-line this because we don't want to abort the each
	  });
	  return daCopy;
	}
	
	function typeOf(obj) {
	  if (Array.isArray(obj)) {
	    return "array";
	  } else if (obj instanceof RegExp) {
	    return "object";
	  } else {
	    return typeof obj;
	  }
	}
	
	function getCheckerDisplay(checker, options) {
	  /* jshint maxcomplexity:7 */
	  var display = undefined;
	  var short = options && options.short;
	  if (short && checker.shortType) {
	    display = checker.shortType;
	  } else if (!short && typeof checker.type === "object" || checker.type === "function") {
	    display = getCheckerType(checker, options);
	  } else {
	    display = getCheckerType(checker, options) || checker.displayName || checker.name;
	  }
	  return display;
	}
	
	function getCheckerType(_ref, options) {
	  var type = _ref.type;
	
	  if (typeof type === "function") {
	    var __apiCheckData = type.__apiCheckData;
	    var typeTypes = type(options);
	    type = _defineProperty({
	      __apiCheckData: __apiCheckData }, __apiCheckData.type, typeTypes);
	  }
	  return type;
	}
	
	function arrayify(obj) {
	  if (!obj) {
	    return [];
	  } else if (Array.isArray(obj)) {
	    return obj;
	  } else {
	    return [obj];
	  }
	}
	
	function each(obj, iterator, context) {
	  if (Array.isArray(obj)) {
	    return eachArry.apply(undefined, arguments);
	  } else {
	    return eachObj.apply(undefined, arguments);
	  }
	}
	
	function eachObj(obj, iterator, context) {
	  var ret;
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) {
	      ret = iterator.call(context, obj[key], key, obj);
	      if (ret === false) {
	        return ret;
	      }
	    }
	  }
	  return true;
	}
	
	function eachArry(obj, iterator, context) {
	  var ret;
	  var length = obj.length;
	  for (var i = 0; i < length; i++) {
	    ret = iterator.call(context, obj[i], i, obj);
	    if (ret === false) {
	      return ret;
	    }
	  }
	  return true;
	}
	
	function isError(obj) {
	  return obj instanceof Error;
	}
	
	function list(arry, join, finalJoin) {
	  arry = arrayify(arry);
	  var copy = arry.slice();
	  var last = copy.pop();
	  if (copy.length === 1) {
	    join = " ";
	  }
	  return copy.join(join) + ("" + (copy.length ? join + finalJoin : "") + "" + last);
	}
	
	function getError(name, location, checkerType) {
	  var stringType = typeof checkerType !== "object" ? checkerType : stringify(checkerType);
	  return new Error("" + nAtL(name, location) + " must be " + t(stringType));
	}
	
	function nAtL(name, location) {
	  var tName = t(name || "value");
	  var tLocation = !location ? "" : " at " + t(location);
	  return "" + tName + "" + tLocation;
	}
	
	function t(thing) {
	  return "`" + thing + "`";
	}
	
	function undef(thing) {
	  return typeof thing === "undefined";
	}
	
	function addOptional(checker) {
	  function optionalCheck(val, name, location, obj) {
	    if (!undef(val)) {
	      return checker(val, name, location, obj);
	    }
	  }
	  // inherit all properties on the original checker
	  copyProps(checker, optionalCheck);
	  each(Object.keys(checker), function (key) {
	    return optionalCheck[key] = checker[key];
	  });
	
	  optionalCheck.isOptional = true;
	  optionalCheck.displayName = checker.displayName + " (optional)";
	
	  // the magic line that allows you to add .optional to the end of the checkers
	  checker.optional = optionalCheck;
	
	  // fix type, because it's not a straight copy...
	  // the reason is we need to specify type.__apiCheckData.optional as true for the terse/verbose option.
	  // we also want to add "(optional)" to the types with a string
	  if (typeof checker.optional.type === "object") {
	    checker.optional.type = copy(checker.optional.type); // make our own copy of this
	  } else if (typeof checker.optional.type === "function") {
	    checker.optional.type = function () {
	      return checker.type.apply(checker, arguments);
	    };
	  } else {
	    checker.optional.type += " (optional)";
	    return;
	  }
	  checker.optional.type.__apiCheckData = copy(checker.type.__apiCheckData) || {}; // and this
	  checker.optional.type.__apiCheckData.optional = true;
	}
	
	/**
	 * This will set up the checker with all of the defaults that most checkers want like required by default and an
	 * optional version
	 * @param checker
	 * @param properties properties to add to the checker
	 * @param disabled - when set to true, this will set the checker to a no-op function
	 */
	function setupChecker(checker, properties, disabled) {
	  /* jshint maxcomplexity:8 */
	  if (disabled) {
	    // swap out the checker for its own copy of noop
	    checker = getNoop();
	    checker.isNoop = true;
	  }
	
	  if (typeof checker.type === "string") {
	    checker.shortType = checker.type;
	  }
	
	  // assign all properties given
	  each(properties, function (prop, name) {
	    return checker[name] = prop;
	  });
	
	  if (!checker.displayName) {
	    checker.displayName = "apiCheck " + t(checker.shortType || checker.type || checker.name) + " type checker";
	  }
	
	  if (!checker.notRequired && !disabled) {
	    checker = getRequiredVersion(checker);
	  }
	
	  if (!checker.notOptional) {
	    addOptional(checker);
	  }
	  return checker;
	}
	
	function getRequiredVersion(checker) {
	  function requiredChecker(val, name, location, obj) {
	    if (undef(val) && !checker.isOptional) {
	      var tLocation = location ? " in " + t(location) : "";
	      var type = getCheckerDisplay(checker, { short: true });
	      var stringType = typeof type !== "object" ? type : stringify(type);
	      return new Error("Required " + t(name) + " not specified" + tLocation + ". Must be " + t(stringType));
	    } else {
	      return checker(val, name, location, obj);
	    }
	  }
	  copyProps(checker, requiredChecker);
	  return requiredChecker;
	}
	
	function copyProps(src, dest) {
	  each(Object.keys(src), function (key) {
	    return dest[key] = src[key];
	  });
	}
	
	function noop() {}
	
	function getNoop() {
	  /* istanbul ignore next */
	  return function noop() {};
	}

/***/ },
/* 3 */
/*!*********************!*\
  !*** ./checkers.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var stringify = __webpack_require__(/*! json-stringify-safe */ 4);
	
	var _require = __webpack_require__(/*! ./apiCheckUtil */ 2);
	
	var typeOf = _require.typeOf;
	var each = _require.each;
	var copy = _require.copy;
	var getCheckerDisplay = _require.getCheckerDisplay;
	var isError = _require.isError;
	var arrayify = _require.arrayify;
	var list = _require.list;
	var getError = _require.getError;
	var nAtL = _require.nAtL;
	var t = _require.t;
	var checkerHelpers = _require.checkerHelpers;
	var undef = _require.undef;
	var setupChecker = checkerHelpers.setupChecker;
	
	var checkers = module.exports = getCheckers();
	module.exports.getCheckers = getCheckers;
	
	function getCheckers(disabled) {
	  return {
	    array: typeOfCheckGetter("Array"),
	    bool: typeOfCheckGetter("Boolean"),
	    number: typeOfCheckGetter("Number"),
	    string: typeOfCheckGetter("String"),
	    func: funcCheckGetter(),
	    object: objectCheckGetter(),
	
	    instanceOf: instanceCheckGetter,
	    oneOf: oneOfCheckGetter,
	    oneOfType: oneOfTypeCheckGetter,
	
	    arrayOf: arrayOfCheckGetter,
	    objectOf: objectOfCheckGetter,
	    typeOrArrayOf: typeOrArrayOfCheckGetter,
	
	    shape: getShapeCheckGetter(),
	    args: argumentsCheckerGetter(),
	
	    any: anyCheckGetter()
	  };
	
	  function typeOfCheckGetter(type) {
	    var lType = type.toLowerCase();
	    return setupChecker(function typeOfCheckerDefinition(val, name, location) {
	      if (typeOf(val) !== lType) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }
	
	  function funcCheckGetter() {
	    var type = "Function";
	    var functionChecker = setupChecker(function functionCheckerDefinition(val, name, location) {
	      if (typeOf(val) !== "function") {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	
	    functionChecker.withProperties = function getWithPropertiesChecker(properties) {
	      var apiError = checkers.objectOf(checkers.func)(properties, "properties", "apiCheck.func.withProperties");
	      if (isError(apiError)) {
	        throw apiError;
	      }
	      var shapeChecker = checkers.shape(properties, true);
	      shapeChecker.type.__apiCheckData.type = "func.withProperties";
	
	      return setupChecker(function functionWithPropertiesChecker(val, name, location) {
	        var notFunction = checkers.func(val, name, location);
	        if (isError(notFunction)) {
	          return notFunction;
	        }
	        return shapeChecker(val, name, location);
	      }, { type: shapeChecker.type, shortType: "func.withProperties" }, disabled);
	    };
	    return functionChecker;
	  }
	
	  function objectCheckGetter() {
	    var type = "Object";
	    var nullType = "Object (null ok)";
	    var objectNullOkChecker = setupChecker(function objectNullOkCheckerDefinition(val, name, location) {
	      if (typeOf(val) !== "object") {
	        return getError(name, location, nullType);
	      }
	    }, { type: nullType }, disabled);
	
	    var objectChecker = setupChecker(function objectCheckerDefinition(val, name, location) {
	      if (val === null || isError(objectNullOkChecker(val, name, location))) {
	        return getError(name, location, objectChecker.type);
	      }
	    }, { type: type, nullOk: objectNullOkChecker }, disabled);
	
	    return objectChecker;
	  }
	
	  function instanceCheckGetter(classToCheck) {
	    return setupChecker(function instanceCheckerDefinition(val, name, location) {
	      if (!(val instanceof classToCheck)) {
	        return getError(name, location, classToCheck.name);
	      }
	    }, { type: classToCheck.name }, disabled);
	  }
	
	  function oneOfCheckGetter(enums) {
	    var type = {
	      __apiCheckData: { optional: false, type: "enum" },
	      "enum": enums
	    };
	    var shortType = "oneOf[" + enums.map(function (enm) {
	      return stringify(enm);
	    }).join(", ") + "]";
	    return setupChecker(function oneOfCheckerDefinition(val, name, location) {
	      if (!enums.some(function (enm) {
	        return enm === val;
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }
	
	  function oneOfTypeCheckGetter(checkers) {
	    var type = {
	      __apiCheckData: { optional: false, type: "oneOfType" },
	      oneOfType: checkers.map(function (checker) {
	        return getCheckerDisplay(checker);
	      })
	    };
	    var checkersDisplay = checkers.map(function (checker) {
	      return getCheckerDisplay(checker, { short: true });
	    });
	    var shortType = "oneOfType[" + checkersDisplay.join(", ") + "]";
	    return setupChecker(function oneOfTypeCheckerDefinition(val, name, location) {
	      if (!checkers.some(function (checker) {
	        return !isError(checker(val, name, location));
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }
	
	  function arrayOfCheckGetter(checker) {
	    var type = {
	      __apiCheckData: { optional: false, type: "arrayOf" },
	      arrayOf: getCheckerDisplay(checker)
	    };
	    var checkerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = "arrayOf[" + checkerDisplay + "]";
	    return setupChecker(function arrayOfCheckerDefinition(val, name, location) {
	      if (isError(checkers.array(val)) || !val.every(function (item) {
	        return !isError(checker(item));
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }
	
	  function objectOfCheckGetter(checker) {
	    var type = {
	      __apiCheckData: { optional: false, type: "objectOf" },
	      objectOf: getCheckerDisplay(checker)
	    };
	    var checkerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = "objectOf[" + checkerDisplay + "]";
	    return setupChecker(function objectOfCheckerDefinition(val, name, location) {
	      var notObject = checkers.object(val, name, location);
	      if (isError(notObject)) {
	        return notObject;
	      }
	      var allTypesSuccess = each(val, function (item, key) {
	        if (isError(checker(item, key, name))) {
	          return false;
	        }
	      });
	      if (!allTypesSuccess) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }
	
	  function typeOrArrayOfCheckGetter(checker) {
	    var type = {
	      __apiCheckData: { optional: false, type: "typeOrArrayOf" },
	      typeOrArrayOf: getCheckerDisplay(checker)
	    };
	    var checkerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = "typeOrArrayOf[" + checkerDisplay + "]";
	    return setupChecker(function typeOrArrayOfDefinition(val, name, location, obj) {
	      if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }
	
	  function getShapeCheckGetter() {
	    function shapeCheckGetter(shape, nonObject) {
	      var shapeTypes = {};
	      each(shape, function (checker, prop) {
	        shapeTypes[prop] = getCheckerDisplay(checker);
	      });
	      function type() {
	        var options = arguments[0] === undefined ? {} : arguments[0];
	
	        var ret = {};
	        var terse = options.terse;
	        var obj = options.obj;
	        var addHelpers = options.addHelpers;
	
	        var parentRequired = options.required;
	        each(shape, function (checker, prop) {
	          /* jshint maxcomplexity:6 */
	          var specified = obj && obj.hasOwnProperty(prop);
	          var required = undef(parentRequired) ? !checker.isOptional : parentRequired;
	          if (!terse || (specified || !checker.isOptional)) {
	            ret[prop] = getCheckerDisplay(checker, { terse: terse, obj: obj && obj[prop], required: required, addHelpers: addHelpers });
	          }
	          if (addHelpers) {
	            modifyTypeDisplayToHelpOut(ret, prop, specified, checker, required);
	          }
	        });
	        return ret;
	
	        function modifyTypeDisplayToHelpOut(ret, prop, specified, checker, required) {
	          if (!specified && required && !checker.isOptional) {
	            var item = "ITEM";
	            if (checker.type && checker.type.__apiCheckData) {
	              item = checker.type.__apiCheckData.type.toUpperCase();
	            }
	            addHelper("missing", "MISSING THIS " + item, " <-- YOU ARE MISSING THIS");
	          } else if (specified) {
	            var error = checker(obj[prop], prop, null, obj);
	            if (isError(error)) {
	              addHelper("error", "THIS IS THE PROBLEM: " + error.message, " <-- THIS IS THE PROBLEM: " + error.message);
	            }
	          }
	
	          function addHelper(property, objectMessage, stringMessage) {
	            if (typeof ret[prop] === "string") {
	              ret[prop] += stringMessage;
	            } else {
	              ret[prop].__apiCheckData[property] = objectMessage;
	            }
	          }
	        }
	      }
	
	      type.__apiCheckData = { strict: false, optional: false, type: "shape" };
	      var shapeChecker = setupChecker(function shapeCheckerDefinition(val, name, location) {
	        /* jshint maxcomplexity:6 */
	        var isObject = !nonObject && checkers.object(val, name, location);
	        if (isError(isObject)) {
	          return isObject;
	        }
	        var shapePropError = undefined;
	        location = location ? location + (name ? "/" : "") : "";
	        name = name || "";
	        each(shape, function (checker, prop) {
	          if (val.hasOwnProperty(prop) || !checker.isOptional) {
	            shapePropError = checker(val[prop], prop, "" + location + "" + name, val);
	            return !isError(shapePropError);
	          }
	        });
	        if (isError(shapePropError)) {
	          return shapePropError;
	        }
	      }, { type: type, shortType: "shape" }, disabled);
	
	      function strictType() {
	        return type.apply(undefined, arguments);
	      }
	
	      strictType.__apiCheckData = copy(shapeChecker.type.__apiCheckData);
	      strictType.__apiCheckData.strict = true;
	      shapeChecker.strict = setupChecker(function strictShapeCheckerDefinition(val, name, location) {
	        var shapeError = shapeChecker(val, name, location);
	        if (isError(shapeError)) {
	          return shapeError;
	        }
	        var allowedProperties = Object.keys(shape);
	        var extraProps = Object.keys(val).filter(function (prop) {
	          return allowedProperties.indexOf(prop) === -1;
	        });
	        if (extraProps.length) {
	          return new Error("" + nAtL(name, location) + " cannot have extra properties: " + t(extraProps.join("`, `")) + "." + ("It is limited to " + t(allowedProperties.join("`, `"))));
	        }
	      }, { type: strictType, shortType: "strict shape" }, disabled);
	
	      return shapeChecker;
	    }
	
	    shapeCheckGetter.ifNot = function ifNot(otherProps, propChecker) {
	      if (!Array.isArray(otherProps)) {
	        otherProps = [otherProps];
	      }
	      var type = undefined;
	      if (otherProps.length === 1) {
	        type = "specified only if " + otherProps[0] + " is not specified";
	      } else {
	        type = "specified only if none of the following are specified: [" + list(otherProps, ", ", "and ") + "]";
	      }
	      return setupChecker(function ifNotChecker(prop, propName, location, obj) {
	        var propExists = obj && obj.hasOwnProperty(propName);
	        var otherPropsExist = otherProps.some(function (otherProp) {
	          return obj && obj.hasOwnProperty(otherProp);
	        });
	        if (propExists === otherPropsExist) {
	          return getError(propName, location, type);
	        } else if (propExists) {
	          return propChecker(prop, propName, location, obj);
	        }
	      }, { notRequired: true, type: type, shortType: "ifNot[" + otherProps.join(", ") + "]" }, disabled);
	    };
	
	    shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
	      otherProps = arrayify(otherProps);
	      var type = undefined;
	      if (otherProps.length === 1) {
	        type = "specified only if " + otherProps[0] + " is also specified";
	      } else {
	        type = "specified only if all of the following are specified: [" + list(otherProps, ", ", "and ") + "]";
	      }
	      return setupChecker(function onlyIfCheckerDefinition(prop, propName, location, obj) {
	        var othersPresent = otherProps.every(function (prop) {
	          return obj.hasOwnProperty(prop);
	        });
	        if (!othersPresent) {
	          return getError(propName, location, type);
	        } else {
	          return propChecker(prop, propName, location, obj);
	        }
	      }, { type: type, shortType: "onlyIf[" + otherProps.join(", ") + "]" }, disabled);
	    };
	
	    return shapeCheckGetter;
	  }
	
	  function argumentsCheckerGetter() {
	    var type = "function arguments";
	    return setupChecker(function argsCheckerDefinition(val, name, location) {
	      if (Array.isArray(val) || isError(checkers.object(val)) || isError(checkers.number(val.length))) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }
	
	  function anyCheckGetter() {
	    return setupChecker(function anyCheckerDefinition() {}, { type: "any" }, disabled);
	  }
	}
	
	// don't do anything

/***/ },
/* 4 */
/*!*********************************************!*\
  !*** ../~/json-stringify-safe/stringify.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = stringify;
	
	function getSerialize (fn, decycle) {
	  var seen = [], keys = [];
	  decycle = decycle || function(key, value) {
	    return '[Circular ' + getPath(value, seen, keys) + ']'
	  };
	  return function(key, value) {
	    var ret = value;
	    if (typeof value === 'object' && value) {
	      if (seen.indexOf(value) !== -1)
	        ret = decycle(key, value);
	      else {
	        seen.push(value);
	        keys.push(key);
	      }
	    }
	    if (fn) ret = fn(key, ret);
	    return ret;
	  }
	}
	
	function getPath (value, seen, keys) {
	  var index = seen.indexOf(value);
	  var path = [ keys[index] ];
	  for (index--; index >= 0; index--) {
	    if (seen[index][ path[0] ] === value) {
	      value = seen[index];
	      path.unshift(keys[index]);
	    }
	  }
	  return '~' + path.join('.');
	}
	
	function stringify(obj, fn, spaces, decycle) {
	  return JSON.stringify(obj, getSerialize(fn, decycle), spaces);
	}
	
	stringify.getSerialize = getSerialize;


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NDBjZWYzYTFmOTg2MDIwMTQ2ZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFF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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjQwY2VmM2ExZjk4NjAyMDE0NmRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3QgYXBpQ2hlY2tVdGlsID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtlYWNoLCBpc0Vycm9yLCB0LCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZiwgZ2V0RXJyb3J9ID0gYXBpQ2hlY2tVdGlsO1xuY29uc3QgY2hlY2tlcnMgPSByZXF1aXJlKCcuL2NoZWNrZXJzJyk7XG5jb25zdCBhcGlDaGVja0FwaXMgPSBnZXRBcGlDaGVja0FwaXMoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRBcGlDaGVja0luc3RhbmNlO1xubW9kdWxlLmV4cG9ydHMudXRpbHMgPSBhcGlDaGVja1V0aWw7XG5tb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcgPSB7XG4gIHZlcmJvc2U6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2Vcbn07XG5cbmNvbnN0IGFwaUNoZWNrQXBpQ2hlY2sgPSBnZXRBcGlDaGVja0luc3RhbmNlKHtcbiAgb3V0cHV0OiB7cHJlZml4OiAnYXBpQ2hlY2snfVxufSk7XG5tb2R1bGUuZXhwb3J0cy5pbnRlcm5hbENoZWNrZXIgPSBhcGlDaGVja0FwaUNoZWNrO1xuXG5cbmVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1tuYW1lXSA9IGNoZWNrZXIpO1xuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0luc3RhbmNlKGNvbmZpZyA9IHt9LCBleHRyYUNoZWNrZXJzID0ge30pIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICBpZiAoYXBpQ2hlY2tBcGlDaGVjayAmJiBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgYXBpQ2hlY2tBcGlDaGVjay50aHJvdyhhcGlDaGVja0FwaXMuZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzLCBhcmd1bWVudHMsIHtcbiAgICAgIHByZWZpeDogJ2NyZWF0aW5nIGFuIGFwaUNoZWNrIGluc3RhbmNlJ1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0ge1xuICAgIHRocm93OiBnZXRBcGlDaGVjayh0cnVlKSxcbiAgICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gICAgZ2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgICBjb25maWc6IHtcbiAgICAgIG91dHB1dDogY29uZmlnLm91dHB1dCB8fCB7XG4gICAgICAgIHByZWZpeDogJycsXG4gICAgICAgIHN1ZmZpeDogJycsXG4gICAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgICAgfSxcbiAgICAgIHZlcmJvc2U6IGNvbmZpZy52ZXJib3NlIHx8IGZhbHNlLFxuICAgICAgZGlzYWJsZWQ6IGNvbmZpZy5kaXNhYmxlZCB8fCBmYWxzZVxuICAgIH0sXG4gICAgdXRpbHM6IGFwaUNoZWNrVXRpbFxuICB9O1xuXG4gIGVhY2goYWRkaXRpb25hbFByb3BlcnRpZXMsICh3cmFwcGVyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IHdyYXBwZXIpO1xuXG4gIGNvbnN0IGRpc2FibGVkID0gYXBpQ2hlY2suZGlzYWJsZWQgfHwgbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmRpc2FibGVkO1xuICBlYWNoKGNoZWNrZXJzLmdldENoZWNrZXJzKGRpc2FibGVkKSwgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG4gIGVhY2goZXh0cmFDaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG5cbiAgcmV0dXJuIGFwaUNoZWNrO1xuXG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIGluc3RhbmNlIGZ1bmN0aW9uLiBPdGhlciB0aGluZ3MgYXJlIGF0dGFjaGVkIHRvIHRoaXMgc2VlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhYm92ZS5cbiAgICogQHBhcmFtIGFwaSB7QXJyYXl9XG4gICAqIEBwYXJhbSBhcmdzIHthcmd1bWVudHN9XG4gICAqIEBwYXJhbSBvdXRwdXQge09iamVjdH1cbiAgICogQHJldHVybnMge09iamVjdH0gLSBpZiB0aGlzIGhhcyBhIGZhaWxlZCA9IHRydWUgcHJvcGVydHksIHRoZW4gaXQgZmFpbGVkXG4gICAqL1xuICBmdW5jdGlvbiBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjggKi9cbiAgICBpZiAoYXBpQ2hlY2suY29uZmlnLmRpc2FibGVkIHx8IG1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXBpVHlwZXM6IHt9LCBhcmdUeXBlczoge30sXG4gICAgICAgIHBhc3NlZDogdHJ1ZSwgbWVzc2FnZTogJycsXG4gICAgICAgIGZhaWxlZDogZmFsc2VcbiAgICAgIH07IC8vIGVtcHR5IHZlcnNpb24gb2Ygd2hhdCBpcyBub3JtYWxseSByZXR1cm5lZFxuICAgIH1cbiAgICBjaGVja0FwaUNoZWNrQXBpKGFyZ3VtZW50cyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFwaSkpIHtcbiAgICAgIGFwaSA9IFthcGldO1xuICAgICAgYXJncyA9IFthcmdzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHVybiBhcmd1bWVudHMgaW50byBhbiBhcnJheVxuICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZXMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgICBpZiAoIW1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgLy8gdGhpcyBpcyB3aGVyZSB3ZSBhY3R1YWxseSBnbyBwZXJmb3JtIHRoZSBjaGVja3MuXG4gICAgICBtZXNzYWdlcyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgICB9XG5cbiAgICBsZXQgcmV0dXJuT2JqZWN0ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIG1lc3NhZ2VzLCBvdXRwdXQpO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IHRydWU7XG4gICAgICByZXR1cm5PYmplY3QucGFzc2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gJyc7XG4gICAgICByZXR1cm5PYmplY3QuZmFpbGVkID0gZmFsc2U7XG4gICAgICByZXR1cm5PYmplY3QucGFzc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja0FwaUNoZWNrQXBpLCBzaG91bGQgYmUgcmVhZCBsaWtlOiBjaGVjayBhcGlDaGVjayBhcGkuIEFzIGluLCBjaGVjayB0aGUgYXBpIGZvciBhcGlDaGVjayA6LSlcbiAgICogQHBhcmFtIGNoZWNrQXBpQXJnc1xuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tBcGlDaGVja0FwaShjaGVja0FwaUFyZ3MpIHtcbiAgICBjb25zdCBhcGkgPSBjaGVja0FwaUFyZ3NbMF07XG4gICAgY29uc3QgYXJncyA9IGNoZWNrQXBpQXJnc1sxXTtcbiAgICB2YXIgaXNBcnJheU9yQXJncyA9IEFycmF5LmlzQXJyYXkoYXJncykgfHwgKGFyZ3MgJiYgdHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhcmdzLmxlbmd0aCA9PT0gJ251bWJlcicpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXBpKSAmJiAhaXNBcnJheU9yQXJncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShhcGksIFthcmdzXSxcbiAgICAgICAgWydJZiBhbiBhcnJheSBpcyBwcm92aWRlZCBmb3IgdGhlIGFwaSwgYW4gYXJyYXkgbXVzdCBiZSBwcm92aWRlZCBmb3IgdGhlIGFyZ3MgYXMgd2VsbC4nXSxcbiAgICAgICAge3ByZWZpeDogJ2FwaUNoZWNrJ31cbiAgICAgICkpO1xuICAgIH1cbiAgICAvLyBkb2cgZm9vZGluZyBoZXJlXG4gICAgY29uc3QgZXJyb3JzID0gY2hlY2tBcGlXaXRoQXJncyhhcGlDaGVja0FwaXMuY2hlY2tBcGlDaGVja0FwaSwgY2hlY2tBcGlBcmdzKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGlDaGVja0FwaXMuY2hlY2tBcGlDaGVja0FwaSwgY2hlY2tBcGlBcmdzLCBlcnJvcnMsIHtcbiAgICAgICAgcHJlZml4OiAnYXBpQ2hlY2snXG4gICAgICB9KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGFwaUNoZWNrV3JhcHBlcihhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShyZXN1bHQubWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gd29udCBnZXQgaGVyZSBpZiBhbiBlcnJvciBpcyB0aHJvd25cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG4gICAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAgIGxldCBnT3V0ID0gYXBpQ2hlY2suY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgICBsZXQgcHJlZml4ID0gZ2V0UHJlZml4KCk7XG4gICAgbGV0IHN1ZmZpeCA9IGdldFN1ZmZpeCgpO1xuICAgIGxldCB1cmwgPSBnZXRVcmwoKTtcbiAgICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICAgIHZhciBwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkID0gJ1xcblxcbicgKyBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7bWVzc2FnZX0gJHtzdWZmaXh9ICR7dXJsIHx8ICcnfSR7cGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZH1gLnRyaW0oKTtcblxuICAgIGZ1bmN0aW9uIGdldFByZWZpeCgpIHtcbiAgICAgIGxldCBwcmVmaXggPSBvdXRwdXQub25seVByZWZpeDtcbiAgICAgIGlmICghcHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN1ZmZpeCgpIHtcbiAgICAgIGxldCBzdWZmaXggPSBvdXRwdXQub25seVN1ZmZpeDtcbiAgICAgIGlmICghc3VmZml4KSB7XG4gICAgICAgIHN1ZmZpeCA9IGAke291dHB1dC5zdWZmaXggfHwgJyd9ICR7Z091dC5zdWZmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VmZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVybCgpIHtcbiAgICAgIGxldCB1cmwgPSBvdXRwdXQudXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsU3VmZml4ICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsU3VmZml4fWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcbiAgICBsZXQge2FwaVR5cGVzLCBhcmdUeXBlc30gPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICAgIGxldCBjb3B5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyB8fCBbXSk7XG4gICAgbGV0IHJlcGxhY2VkSXRlbXMgPSBbXTtcbiAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShjb3B5KTtcbiAgICBjb25zdCBwYXNzZWRBcmdzID0gZ2V0T2JqZWN0U3RyaW5nKGNvcHkpO1xuICAgIGFyZ1R5cGVzID0gZ2V0T2JqZWN0U3RyaW5nKGFyZ1R5cGVzKTtcbiAgICBhcGlUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcGlUeXBlcyk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVNZXNzYWdlKCk7XG5cblxuICAgIC8vIGZ1bmN0aW9uc1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKSB7XG4gICAgICBlYWNoKG9iaiwgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIGlmIChyZXBsYWNlZEl0ZW1zLmluZGV4T2YodmFsKSA9PT0gLTEpIHsgLy8gYXZvaWQgcmVjdXJzaXZlIHByb2JsZW1zXG4gICAgICAgICAgcmVwbGFjZWRJdGVtcy5wdXNoKHZhbCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShvYmopO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsLmRpc3BsYXlOYW1lIHx8IHZhbC5uYW1lIHx8ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T2JqZWN0U3RyaW5nKHR5cGVzKSB7XG4gICAgICBpZiAoIXR5cGVzIHx8ICF0eXBlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICdub3RoaW5nJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZXMgJiYgdHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHR5cGVzID0gdHlwZXNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaW5naWZ5KHR5cGVzLCBudWxsLCAyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2UoKSB7XG4gICAgICBjb25zdCBuID0gJ1xcbic7XG4gICAgICBsZXQgdXNlUyA9IHRydWU7XG4gICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdXNlUyA9ICEhT2JqZWN0LmtleXMoYXJnc1swXSkubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVzZVMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdHlwZXMgPSBgdHlwZSR7dXNlUyA/ICdzJyA6ICcnfWA7XG4gICAgICBjb25zdCBuZXdMaW5lID0gbiArIG47XG4gICAgICByZXR1cm4gYFlvdSBwYXNzZWQ6JHtufSR7cGFzc2VkQXJnc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBXaXRoIHRoZSAke3R5cGVzfToke259JHthcmdUeXBlc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBUaGUgQVBJIGNhbGxzIGZvcjoke259JHthcGlUeXBlc31gO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGVzKGFwaSwgYXJncykge1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICAgIGxldCBhcGlUeXBlcyA9IGFwaS5tYXAoKGNoZWNrZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWZpZWQgPSBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuaGFzT3duUHJvcGVydHkoJ3ZlcmJvc2UnKTtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7XG4gICAgICAgIHRlcnNlOiBzcGVjaWZpZWQgPyAhbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLnZlcmJvc2UgOiAhYXBpQ2hlY2suY29uZmlnLnZlcmJvc2UsXG4gICAgICAgIG9iajogYXJnc1tpbmRleF0sXG4gICAgICAgIGFkZEhlbHBlcnM6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKChhcmcpID0+IGdldEFyZ0Rpc3BsYXkoYXJnLCBbXSkpO1xuICAgIHJldHVybiB7YXJnVHlwZXM6IGFyZ1R5cGVzLCBhcGlUeXBlc307XG4gIH1cblxufVxuXG5cbi8vIFNUQVRFTEVTUyBGVU5DVElPTlNcblxuLyoqXG4gKiBUaGlzIGlzIHdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zIGZvciBhY3R1YWxseSBjaGVja2luZyB0aGUgYXJndW1lbnRzIHdpdGggdGhlIGFwaS5cbiAqIEBwYXJhbSBhcGkge0FycmF5fSAtIGNoZWNrZXJzXG4gKiBAcGFyYW0gYXJncyB7QXJyYXl9IC0gYW5kIGFyZ3VtZW50cyBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzLCBsYXN0Q2hlY2tlciwgYXJnTmFtZSwgYXJnRmFpbGVkLCBza2lwUHJldmlvdXNDaGVja2VyO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUgKChjaGVja2VyID0gYXBpW2NoZWNrZXJJbmRleCsrXSkgJiYgKGFyZ0luZGV4IDwgYXJncy5sZW5ndGgpKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICBhcmdOYW1lID0gJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCAndmFsdWUnLCBhcmdOYW1lKTtcbiAgICBhcmdGYWlsZWQgPSBpc0Vycm9yKHJlcyk7XG4gICAgbGFzdENoZWNrZXIgPSBjaGVja2VySW5kZXggPj0gYXBpLmxlbmd0aDtcbiAgICBza2lwUHJldmlvdXNDaGVja2VyID0gY2hlY2tlckluZGV4ID4gMSAmJiBhcGlbY2hlY2tlckluZGV4IC0gMV0uaXNPcHRpb25hbDtcbiAgICBpZiAoKGFyZ0ZhaWxlZCAmJiBsYXN0Q2hlY2tlcikgfHwgKGFyZ0ZhaWxlZCAmJiAhbGFzdENoZWNrZXIgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCAmJiAhc2tpcFByZXZpb3VzQ2hlY2tlcikpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCBhcmcpKTtcbiAgICB9IGVsc2UgaWYgKGFyZ0ZhaWxlZCAmJiBjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goYCR7dChhcmdOYW1lKX0gcGFzc2VkYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWlsZWQgPyBtZXNzYWdlcyA6IFtdO1xufVxuXG5cbmNoZWNrZXJUeXBlVHlwZS50eXBlID0gJ2Z1bmN0aW9uIHdpdGggX19hcGlDaGVja0RhdGEgcHJvcGVydHkgYW5kIGAke2Z1bmN0aW9uLnR5cGV9YCBwcm9wZXJ0eSc7XG5mdW5jdGlvbiBjaGVja2VyVHlwZVR5cGUoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IGFwaUNoZWNrRGF0YUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZSh7XG4gICAgdHlwZTogY2hlY2tlcnMuc3RyaW5nLFxuICAgIG9wdGlvbmFsOiBjaGVja2Vycy5ib29sXG4gIH0pO1xuICBjb25zdCBhc0Z1bmMgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCBhc1NoYXBlID0gY2hlY2tlcnMuc2hhcGUoe19fYXBpQ2hlY2tEYXRhOiBhcGlDaGVja0RhdGFDaGVja2VyfSk7XG4gIGNvbnN0IHdyb25nU2hhcGUgPSBjaGVja2Vycy5vbmVPZlR5cGUoW1xuICAgIGFzRnVuYywgYXNTaGFwZVxuICBdKShjaGVja2VyVHlwZSwgbmFtZSwgbG9jYXRpb24pO1xuICBpZiAoaXNFcnJvcih3cm9uZ1NoYXBlKSkge1xuICAgIHJldHVybiB3cm9uZ1NoYXBlO1xuICB9XG4gIGlmICh0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdmdW5jdGlvbicgJiYgIWNoZWNrZXJUeXBlLmhhc093blByb3BlcnR5KGNoZWNrZXJUeXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUpKSB7XG4gICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZVR5cGUudHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIHZhbCkge1xuICBsZXQgY2hlY2tlckhlbHAgPSBnZXRDaGVja2VySGVscChjaGVja2VyLCB2YWwpO1xuICBjaGVja2VySGVscCA9IGNoZWNrZXJIZWxwID8gJyAtICcgKyBjaGVja2VySGVscCA6ICcnO1xuICByZXR1cm4gcmVzLm1lc3NhZ2UgKyBjaGVja2VySGVscDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckhlbHAoe2hlbHB9LCB2YWwpIHtcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh0eXBlb2YgaGVscCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhlbHAgPSBoZWxwKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGhlbHA7XG59XG5cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdOb3QgZW5vdWdoIGFyZ3VtZW50cyBzcGVjaWZpZWQuIFJlcXVpcmVzIGAnICsgcmVxdWlyZWRBcmdzLmxlbmd0aCArICdgLCB5b3UgcGFzc2VkIGAnICsgYXJncy5sZW5ndGggKyAnYCdcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZywgZ290dGVuQXJncykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGNvbnN0IGNOYW1lID0gYXJnICYmIGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZTtcbiAgY29uc3QgdHlwZSA9IHR5cGVPZihhcmcpO1xuICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChoYXNLZXlzKCkpIHtcbiAgICAgIGxldCBwcm9wZXJ0aWVzID0gc3RyaW5naWZ5KGdldERpc3BsYXlJZk5vdEdvdHRlbigpKTtcbiAgICAgIHJldHVybiBjTmFtZSArICcgKHdpdGggcHJvcGVydGllczogJyArIHByb3BlcnRpZXMgKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiBjTmFtZTtcbiAgfVxuXG4gIGlmIChhcmcgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9XG5cbiAgaWYgKHR5cGUgIT09ICdhcnJheScgJiYgdHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGlmIChoYXNLZXlzKCkpIHtcbiAgICByZXR1cm4gZ2V0RGlzcGxheUlmTm90R290dGVuKCk7XG4gIH1cblxuICByZXR1cm4gY05hbWU7XG5cbiAgLy8gdXRpbGl0eSBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gaGFzS2V5cygpIHtcbiAgICByZXR1cm4gYXJnICYmIE9iamVjdC5rZXlzKGFyZykubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGxheUlmTm90R290dGVuKCkge1xuICAgIGlmIChnb3R0ZW5BcmdzLmluZGV4T2YoYXJnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgfVxuICAgIGdvdHRlbkFyZ3MucHVzaChhcmcpO1xuICAgIHJldHVybiBnZXREaXNwbGF5KGFyZywgZ290dGVuQXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheShvYmosIGdvdHRlbkFyZ3MpIHtcbiAgdmFyIGFyZ0Rpc3BsYXkgPSB7fTtcbiAgZWFjaChvYmosICh2LCBrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2LCBnb3R0ZW5BcmdzKSk7XG4gIHJldHVybiBhcmdEaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0FwaXMoKSB7XG4gIGNvbnN0IG9zID0gY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsO1xuXG4gIGNvbnN0IGNoZWNrZXJGbkNoZWNrZXIgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgICB0eXBlOiBjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXJzLnN0cmluZywgY2hlY2tlclR5cGVUeXBlXSkub3B0aW9uYWwsXG4gICAgZGlzcGxheU5hbWU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBzaG9ydFR5cGU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBub3RPcHRpb25hbDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICBub3RSZXF1aXJlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICB9KTtcblxuICBjb25zdCBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMgPSBbXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgb3V0cHV0OiBjaGVja2Vycy5zaGFwZSh7XG4gICAgICAgIHByZWZpeDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICBzdWZmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgZG9jc0Jhc2VVcmw6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgICAgdmVyYm9zZTogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICAgIGRpc2FibGVkOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgIGNoZWNrZXJzLm9iamVjdE9mKGNoZWNrZXJGbkNoZWNrZXIpLm9wdGlvbmFsXG4gIF07XG5cbiAgY29uc3QgY2hlY2tBcGlDaGVja0FwaSA9IFtcbiAgICBjaGVja2Vycy50eXBlT3JBcnJheU9mKGNoZWNrZXJGbkNoZWNrZXIpLFxuICAgIGNoZWNrZXJzLmFueS5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5zaGFwZSh7XG4gICAgICBwcmVmaXg6IG9zLCBzdWZmaXg6IG9zLCB1cmxTdWZmaXg6IG9zLCAvLyBhcHBlbmRlZCBjYXNlXG4gICAgICBvbmx5UHJlZml4OiBvcywgb25seVN1ZmZpeDogb3MsIHVybDogb3MgLy8gb3ZlcnJpZGUgY2FzZVxuICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuXG4gIHJldHVybiB7XG4gICAgY2hlY2tlckZuQ2hlY2tlcixcbiAgICBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsXG4gICAgY2hlY2tBcGlDaGVja0FwaVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgYWRkT3B0aW9uYWwsIGdldFJlcXVpcmVkVmVyc2lvbiwgc2V0dXBDaGVja2VyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksXG4gIGlzRXJyb3IsIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCB1bmRlZiwgY2hlY2tlckhlbHBlcnMsXG4gIG5vb3Bcbn07XG5cbmZ1bmN0aW9uIGNvcHkob2JqKSB7XG4gIGxldCB0eXBlID0gdHlwZU9mKG9iaik7XG4gIGxldCBkYUNvcHk7XG4gIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgZGFDb3B5ID0gW107XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBkYUNvcHkgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGVhY2gob2JqLCAodmFsLCBrZXkpID0+IHtcbiAgICBkYUNvcHlba2V5XSA9IHZhbDsgLy8gY2Fubm90IHNpbmdsZS1saW5lIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFib3J0IHRoZSBlYWNoXG4gIH0pO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCBvcHRpb25zKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IGRpc3BsYXk7XG4gIGxldCBzaG9ydCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zaG9ydDtcbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgZGlzcGxheSA9IGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0JyB8fCBjaGVja2VyLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lO1xuICB9XG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyVHlwZSh7dHlwZX0sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IF9fYXBpQ2hlY2tEYXRhID0gdHlwZS5fX2FwaUNoZWNrRGF0YTtcbiAgICBsZXQgdHlwZVR5cGVzID0gdHlwZShvcHRpb25zKTtcbiAgICB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGEsXG4gICAgICBbX19hcGlDaGVja0RhdGEudHlwZV06IHR5cGVUeXBlc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogc3RyaW5naWZ5KGNoZWNrZXJUeXBlKTtcbiAgcmV0dXJuIG5ldyBFcnJvcihgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gbXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG59XG5cbmZ1bmN0aW9uIG5BdEwobmFtZSwgbG9jYXRpb24pIHtcbiAgY29uc3QgdE5hbWUgPSB0KG5hbWUgfHwgJ3ZhbHVlJyk7XG4gIGxldCB0TG9jYXRpb24gPSAhbG9jYXRpb24gPyAnJyA6ICcgYXQgJyArIHQobG9jYXRpb24pO1xuICByZXR1cm4gYCR7dE5hbWV9JHt0TG9jYXRpb259YDtcbn1cblxuZnVuY3Rpb24gdCh0aGluZykge1xuICByZXR1cm4gJ2AnICsgdGhpbmcgKyAnYCc7XG59XG5cbmZ1bmN0aW9uIHVuZGVmKHRoaW5nKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cblxuXG5mdW5jdGlvbiBhZGRPcHRpb25hbChjaGVja2VyKSB7XG4gIGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKCF1bmRlZih2YWwpKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICAvLyBpbmhlcml0IGFsbCBwcm9wZXJ0aWVzIG9uIHRoZSBvcmlnaW5hbCBjaGVja2VyXG4gIGNvcHlQcm9wcyhjaGVja2VyLCBvcHRpb25hbENoZWNrKTtcbiAgZWFjaChPYmplY3Qua2V5cyhjaGVja2VyKSwga2V5ID0+IG9wdGlvbmFsQ2hlY2tba2V5XSA9IGNoZWNrZXJba2V5XSk7XG5cblxuICBvcHRpb25hbENoZWNrLmlzT3B0aW9uYWwgPSB0cnVlO1xuICBvcHRpb25hbENoZWNrLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZSArICcgKG9wdGlvbmFsKSc7XG5cblxuICAvLyB0aGUgbWFnaWMgbGluZSB0aGF0IGFsbG93cyB5b3UgdG8gYWRkIC5vcHRpb25hbCB0byB0aGUgZW5kIG9mIHRoZSBjaGVja2Vyc1xuICBjaGVja2VyLm9wdGlvbmFsID0gb3B0aW9uYWxDaGVjaztcblxuICAvLyBmaXggdHlwZSwgYmVjYXVzZSBpdCdzIG5vdCBhIHN0cmFpZ2h0IGNvcHkuLi5cbiAgLy8gdGhlIHJlYXNvbiBpcyB3ZSBuZWVkIHRvIHNwZWNpZnkgdHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCBhcyB0cnVlIGZvciB0aGUgdGVyc2UvdmVyYm9zZSBvcHRpb24uXG4gIC8vIHdlIGFsc28gd2FudCB0byBhZGQgXCIob3B0aW9uYWwpXCIgdG8gdGhlIHR5cGVzIHdpdGggYSBzdHJpbmdcbiAgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY29weShjaGVja2VyLm9wdGlvbmFsLnR5cGUpOyAvLyBtYWtlIG91ciBvd24gY29weSBvZiB0aGlzXG4gIH0gZWxzZSBpZiAodHlwZW9mIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIudHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlICs9ICcgKG9wdGlvbmFsKSc7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB8fCB7fTsgLy8gYW5kIHRoaXNcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGlzIHdpbGwgc2V0IHVwIHRoZSBjaGVja2VyIHdpdGggYWxsIG9mIHRoZSBkZWZhdWx0cyB0aGF0IG1vc3QgY2hlY2tlcnMgd2FudCBsaWtlIHJlcXVpcmVkIGJ5IGRlZmF1bHQgYW5kIGFuXG4gKiBvcHRpb25hbCB2ZXJzaW9uXG4gKiBAcGFyYW0gY2hlY2tlclxuICogQHBhcmFtIHByb3BlcnRpZXMgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIGNoZWNrZXJcbiAqIEBwYXJhbSBkaXNhYmxlZCAtIHdoZW4gc2V0IHRvIHRydWUsIHRoaXMgd2lsbCBzZXQgdGhlIGNoZWNrZXIgdG8gYSBuby1vcCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBzZXR1cENoZWNrZXIoY2hlY2tlciwgcHJvcGVydGllcywgZGlzYWJsZWQpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6OCAqL1xuICBpZiAoZGlzYWJsZWQpIHsgLy8gc3dhcCBvdXQgdGhlIGNoZWNrZXIgZm9yIGl0cyBvd24gY29weSBvZiBub29wXG4gICAgY2hlY2tlciA9IGdldE5vb3AoKTtcbiAgICBjaGVja2VyLmlzTm9vcCA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjaGVja2VyLnNob3J0VHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgfVxuXG4gIC8vIGFzc2lnbiBhbGwgcHJvcGVydGllcyBnaXZlblxuICBlYWNoKHByb3BlcnRpZXMsIChwcm9wLCBuYW1lKSA9PiBjaGVja2VyW25hbWVdID0gcHJvcCk7XG5cbiAgaWYgKCFjaGVja2VyLmRpc3BsYXlOYW1lKSB7XG4gICAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci5zaG9ydFR5cGUgfHwgY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIH1cblxuICBpZiAoIWNoZWNrZXIubm90UmVxdWlyZWQgJiYgIWRpc2FibGVkKSB7XG4gICAgY2hlY2tlciA9IGdldFJlcXVpcmVkVmVyc2lvbihjaGVja2VyKTtcbiAgfVxuXG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIGFkZE9wdGlvbmFsKGNoZWNrZXIpO1xuICB9XG4gIHJldHVybiBjaGVja2VyO1xufVxuXG5mdW5jdGlvbiBnZXRSZXF1aXJlZFZlcnNpb24oY2hlY2tlcikge1xuICBmdW5jdGlvbiByZXF1aXJlZENoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKHVuZGVmKHZhbCkgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgbGV0IHRMb2NhdGlvbiA9IGxvY2F0aW9uID8gYCBpbiAke3QobG9jYXRpb24pfWAgOiAnJztcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgICAgIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcgPyB0eXBlIDogc3RyaW5naWZ5KHR5cGUpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihgUmVxdWlyZWQgJHt0KG5hbWUpfSBub3Qgc3BlY2lmaWVkJHt0TG9jYXRpb259LiBNdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgY29weVByb3BzKGNoZWNrZXIsIHJlcXVpcmVkQ2hlY2tlcik7XG4gIHJldHVybiByZXF1aXJlZENoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGNvcHlQcm9wcyhzcmMsIGRlc3QpIHtcbiAgZWFjaChPYmplY3Qua2V5cyhzcmMpLCBrZXkgPT4gZGVzdFtrZXldID0gc3JjW2tleV0pO1xufVxuXG5mdW5jdGlvbiBub29wKCkge1xufVxuXG5mdW5jdGlvbiBnZXROb29wKCkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gZnVuY3Rpb24gbm9vcCgpIHtcbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrVXRpbC5qc1xuICoqLyIsImNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcbmNvbnN0IHtcbiAgdHlwZU9mLCBlYWNoLCBjb3B5LCBnZXRDaGVja2VyRGlzcGxheSwgaXNFcnJvcixcbiAgYXJyYXlpZnksIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCBjaGVja2VySGVscGVycyxcbiAgdW5kZWZcbiAgfSA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7c2V0dXBDaGVja2VyfSA9IGNoZWNrZXJIZWxwZXJzO1xuXG5sZXQgY2hlY2tlcnMgPSBtb2R1bGUuZXhwb3J0cyA9IGdldENoZWNrZXJzKCk7XG5tb2R1bGUuZXhwb3J0cy5nZXRDaGVja2VycyA9IGdldENoZWNrZXJzO1xuXG5mdW5jdGlvbiBnZXRDaGVja2VycyhkaXNhYmxlZCkge1xuICByZXR1cm4ge1xuICAgIGFycmF5OiB0eXBlT2ZDaGVja0dldHRlcignQXJyYXknKSxcbiAgICBib29sOiB0eXBlT2ZDaGVja0dldHRlcignQm9vbGVhbicpLFxuICAgIG51bWJlcjogdHlwZU9mQ2hlY2tHZXR0ZXIoJ051bWJlcicpLFxuICAgIHN0cmluZzogdHlwZU9mQ2hlY2tHZXR0ZXIoJ1N0cmluZycpLFxuICAgIGZ1bmM6IGZ1bmNDaGVja0dldHRlcigpLFxuICAgIG9iamVjdDogb2JqZWN0Q2hlY2tHZXR0ZXIoKSxcblxuICAgIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gICAgb25lT2Y6IG9uZU9mQ2hlY2tHZXR0ZXIsXG4gICAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICAgIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgICBvYmplY3RPZjogb2JqZWN0T2ZDaGVja0dldHRlcixcbiAgICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuICAgIGFyZ3M6IGFyZ3VtZW50c0NoZWNrZXJHZXR0ZXIoKSxcblxuICAgIGFueTogYW55Q2hlY2tHZXR0ZXIoKVxuICB9O1xuXG4gIGZ1bmN0aW9uIHR5cGVPZkNoZWNrR2V0dGVyKHR5cGUpIHtcbiAgICBjb25zdCBsVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZ1bmNDaGVja0dldHRlcigpIHtcbiAgICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgICBsZXQgZnVuY3Rpb25DaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHR5cGVPZih2YWwpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG5cbiAgICBmdW5jdGlvbkNoZWNrZXIud2l0aFByb3BlcnRpZXMgPSBmdW5jdGlvbiBnZXRXaXRoUHJvcGVydGllc0NoZWNrZXIocHJvcGVydGllcykge1xuICAgICAgY29uc3QgYXBpRXJyb3IgPSBjaGVja2Vycy5vYmplY3RPZihjaGVja2Vycy5mdW5jKShwcm9wZXJ0aWVzLCAncHJvcGVydGllcycsICdhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzJyk7XG4gICAgICBpZiAoaXNFcnJvcihhcGlFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgYXBpRXJyb3I7XG4gICAgICB9XG4gICAgICBsZXQgc2hhcGVDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUocHJvcGVydGllcywgdHJ1ZSk7XG4gICAgICBzaGFwZUNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlID0gJ2Z1bmMud2l0aFByb3BlcnRpZXMnO1xuXG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uV2l0aFByb3BlcnRpZXNDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3Qgbm90RnVuY3Rpb24gPSBjaGVja2Vycy5mdW5jKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgICBpZiAoaXNFcnJvcihub3RGdW5jdGlvbikpIHtcbiAgICAgICAgICByZXR1cm4gbm90RnVuY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIH0sIHt0eXBlOiBzaGFwZUNoZWNrZXIudHlwZSwgc2hvcnRUeXBlOiAnZnVuYy53aXRoUHJvcGVydGllcyd9LCBkaXNhYmxlZCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb25DaGVja2VyO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICAgIGNvbnN0IG51bGxUeXBlID0gJ09iamVjdCAobnVsbCBvayknO1xuICAgIGxldCBvYmplY3ROdWxsT2tDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBudWxsVHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGU6IG51bGxUeXBlfSwgZGlzYWJsZWQpO1xuXG4gICAgbGV0IG9iamVjdENoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb2JqZWN0Q2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCBpc0Vycm9yKG9iamVjdE51bGxPa0NoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikpKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZSwgbnVsbE9rOiBvYmplY3ROdWxsT2tDaGVja2VyfSwgZGlzYWJsZWQpO1xuXG4gICAgcmV0dXJuIG9iamVjdENoZWNrZXI7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBpbnN0YW5jZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaykpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGU6IGNsYXNzVG9DaGVjay5uYW1lfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25lT2ZDaGVja0dldHRlcihlbnVtcykge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2VudW0nfSxcbiAgICAgIGVudW06IGVudW1zXG4gICAgfTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZbJHtlbnVtcy5tYXAoZW5tID0+IHN0cmluZ2lmeShlbm0pKS5qb2luKCcsICcpfV1gO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoIWVudW1zLnNvbWUoZW5tID0+IGVubSA9PT0gdmFsKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrR2V0dGVyKGNoZWNrZXJzKSB7XG4gICAgY29uc3QgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb25lT2ZUeXBlJ30sXG4gICAgICBvbmVPZlR5cGU6IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcikpXG4gICAgfTtcbiAgICBjb25zdCBjaGVja2Vyc0Rpc3BsYXkgPSBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pKTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZUeXBlWyR7Y2hlY2tlcnNEaXNwbGF5LmpvaW4oJywgJyl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoIWNoZWNrZXJzLnNvbWUoY2hlY2tlciA9PiAhaXNFcnJvcihjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICAgIGFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gICAgfTtcbiAgICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICAgIGNvbnN0IHNob3J0VHlwZSA9IGBhcnJheU9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhcnJheU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZSwgc2hvcnRUeXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gICAgY29uc3QgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICAgIG9iamVjdE9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICAgIH07XG4gICAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgb2JqZWN0T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgY29uc3Qgbm90T2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3Iobm90T2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gbm90T2JqZWN0O1xuICAgICAgfVxuICAgICAgY29uc3QgYWxsVHlwZXNTdWNjZXNzID0gZWFjaCh2YWwsIChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gICAgY29uc3QgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAndHlwZU9yQXJyYXlPZid9LFxuICAgICAgdHlwZU9yQXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgICB9O1xuICAgIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYHR5cGVPckFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2VyLCBjaGVja2Vycy5hcnJheU9mKGNoZWNrZXIpXSkodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaGFwZUNoZWNrR2V0dGVyKCkge1xuICAgIGZ1bmN0aW9uIHNoYXBlQ2hlY2tHZXR0ZXIoc2hhcGUsIG5vbk9iamVjdCkge1xuICAgICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIHNoYXBlVHlwZXNbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgICAgIH0pO1xuICAgICAgZnVuY3Rpb24gdHlwZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJlbnRSZXF1aXJlZCA9IG9wdGlvbnMucmVxdWlyZWQ7XG4gICAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICAgIGNvbnN0IHNwZWNpZmllZCA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCk7XG4gICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSB1bmRlZihwYXJlbnRSZXF1aXJlZCkgPyAhY2hlY2tlci5pc09wdGlvbmFsIDogcGFyZW50UmVxdWlyZWQ7XG4gICAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgICByZXRbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7dGVyc2UsIG9iajogb2JqICYmIG9ialtwcm9wXSwgcmVxdWlyZWQsIGFkZEhlbHBlcnN9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICAgIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICBmdW5jdGlvbiBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICdJVEVNJztcbiAgICAgICAgICAgIGlmIChjaGVja2VyLnR5cGUgJiYgY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkSGVscGVyKFxuICAgICAgICAgICAgICAnbWlzc2luZycsICdNSVNTSU5HIFRISVMgJyArIGl0ZW0sICcgPC0tIFlPVSBBUkUgTUlTU0lORyBUSElTJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNpZmllZCkge1xuICAgICAgICAgICAgbGV0IGVycm9yID0gY2hlY2tlcihvYmpbcHJvcF0sIHByb3AsIG51bGwsIG9iaik7XG4gICAgICAgICAgICBpZiAoaXNFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgYWRkSGVscGVyKCdlcnJvcicsICdUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSwgJyA8LS0gVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFkZEhlbHBlcihwcm9wZXJ0eSwgb2JqZWN0TWVzc2FnZSwgc3RyaW5nTWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldFtwcm9wXSArPSBzdHJpbmdNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0W3Byb3BdLl9fYXBpQ2hlY2tEYXRhW3Byb3BlcnR5XSA9IG9iamVjdE1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7c3RyaWN0OiBmYWxzZSwgb3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnc2hhcGUnfTtcbiAgICAgIGxldCBzaGFwZUNoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgbGV0IGlzT2JqZWN0ID0gIW5vbk9iamVjdCAmJiBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hhcGVQcm9wRXJyb3I7XG4gICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24gPyBsb2NhdGlvbiArIChuYW1lID8gJy8nIDogJycpIDogJyc7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuICAgICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgYCR7bG9jYXRpb259JHtuYW1lfWAsIHZhbCk7XG4gICAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBzaGFwZVByb3BFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSwge3R5cGUsIHNob3J0VHlwZTogJ3NoYXBlJ30sIGRpc2FibGVkKTtcblxuICAgICAgZnVuY3Rpb24gc3RyaWN0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpO1xuICAgICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YS5zdHJpY3QgPSB0cnVlO1xuICAgICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2hhcGVFcnJvciA9IHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVFcnJvcikpIHtcbiAgICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNoYXBlKTtcbiAgICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgICAgYEl0IGlzIGxpbWl0ZWQgdG8gJHt0KGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJ2AsIGAnKSl9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIHt0eXBlOiBzdHJpY3RUeXBlLCBzaG9ydFR5cGU6ICdzdHJpY3Qgc2hhcGUnfSwgZGlzYWJsZWQpO1xuXG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyO1xuICAgIH1cblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgICB9XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmIG5vbmUgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGlmTm90Q2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgICBsZXQgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgICBpZiAocHJvcEV4aXN0cyA9PT0gb3RoZXJQcm9wc0V4aXN0KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sIHtub3RSZXF1aXJlZDogdHJ1ZSwgdHlwZSwgc2hvcnRUeXBlOiBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9LCBkaXNhYmxlZCk7XG4gICAgfTtcblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIub25seUlmID0gZnVuY3Rpb24gb25seUlmKG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgICBvdGhlclByb3BzID0gYXJyYXlpZnkob3RoZXJQcm9wcyk7XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgYWxzbyBzcGVjaWZpZWRgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICAgIGNvbnN0IG90aGVyc1ByZXNlbnQgPSBvdGhlclByb3BzLmV2ZXJ5KHByb3AgPT4gb2JqLmhhc093blByb3BlcnR5KHByb3ApKTtcbiAgICAgICAgaWYgKCFvdGhlcnNQcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwge3R5cGUsIHNob3J0VHlwZTogYG9ubHlJZlske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0sIGRpc2FibGVkKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tHZXR0ZXI7XG4gIH1cblxuICBmdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnZnVuY3Rpb24gYXJndW1lbnRzJztcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfSwge3R5cGU6ICdhbnknfSwgZGlzYWJsZWQpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9jaGVja2Vycy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5O1xuXG5mdW5jdGlvbiBnZXRTZXJpYWxpemUgKGZuLCBkZWN5Y2xlKSB7XG4gIHZhciBzZWVuID0gW10sIGtleXMgPSBbXTtcbiAgZGVjeWNsZSA9IGRlY3ljbGUgfHwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiAnW0NpcmN1bGFyICcgKyBnZXRQYXRoKHZhbHVlLCBzZWVuLCBrZXlzKSArICddJ1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHZhciByZXQgPSB2YWx1ZTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuICAgICAgaWYgKHNlZW4uaW5kZXhPZih2YWx1ZSkgIT09IC0xKVxuICAgICAgICByZXQgPSBkZWN5Y2xlKGtleSwgdmFsdWUpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHNlZW4ucHVzaCh2YWx1ZSk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm4pIHJldCA9IGZuKGtleSwgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFBhdGggKHZhbHVlLCBzZWVuLCBrZXlzKSB7XG4gIHZhciBpbmRleCA9IHNlZW4uaW5kZXhPZih2YWx1ZSk7XG4gIHZhciBwYXRoID0gWyBrZXlzW2luZGV4XSBdO1xuICBmb3IgKGluZGV4LS07IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpZiAoc2VlbltpbmRleF1bIHBhdGhbMF0gXSA9PT0gdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gc2VlbltpbmRleF07XG4gICAgICBwYXRoLnVuc2hpZnQoa2V5c1tpbmRleF0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJ34nICsgcGF0aC5qb2luKCcuJyk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmosIGZuLCBzcGFjZXMsIGRlY3ljbGUpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgZ2V0U2VyaWFsaXplKGZuLCBkZWN5Y2xlKSwgc3BhY2VzKTtcbn1cblxuc3RyaW5naWZ5LmdldFNlcmlhbGl6ZSA9IGdldFNlcmlhbGl6ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFwaS1jaGVjay5qcyJ9