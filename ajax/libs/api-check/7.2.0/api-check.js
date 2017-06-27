// apiCheck.js v7.2.0 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	  addOptional: addOptional, getRequiredVersion: getRequiredVersion, setupChecker: setupChecker, addNullable: addNullable
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
	
	/**
	 * This will set up the checker with all of the defaults that most checkers want like required by default and an
	 * optional version
	 * @param checker
	 * @param properties properties to add to the checker
	 * @param disabled - when set to true, this will set the checker to a no-op function
	 */
	function setupChecker(checker, properties, disabled) {
	  /* jshint maxcomplexity:9 */
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
	
	  if (!checker.notRequired) {
	    checker = getRequiredVersion(checker, disabled);
	  }
	
	  if (!checker.notNullable) {
	    addNullable(checker, disabled);
	  }
	
	  if (!checker.notOptional) {
	    addOptional(checker, disabled);
	  }
	
	  return checker;
	}
	
	function getRequiredVersion(checker, disabled) {
	  var requiredChecker = disabled ? getNoop() : function requiredChecker(val, name, location, obj) {
	    if (undef(val) && !checker.isOptional) {
	      var tLocation = location ? " in " + t(location) : "";
	      var type = getCheckerDisplay(checker, { short: true });
	      var stringType = typeof type !== "object" ? type : stringify(type);
	      return new Error("Required " + t(name) + " not specified" + tLocation + ". Must be " + t(stringType));
	    } else {
	      return checker(val, name, location, obj);
	    }
	  };
	  copyProps(checker, requiredChecker);
	  requiredChecker.originalChecker = checker;
	  return requiredChecker;
	}
	
	function addOptional(checker, disabled) {
	  var optionalCheck = disabled ? getNoop() : function optionalCheck(val, name, location, obj) {
	    if (!undef(val)) {
	      return checker(val, name, location, obj);
	    }
	  };
	  // inherit all properties on the original checker
	  copyProps(checker, optionalCheck);
	
	  optionalCheck.isOptional = true;
	  optionalCheck.displayName = checker.displayName + " (optional)";
	  optionalCheck.originalChecker = checker;
	
	  // the magic line that allows you to add .optional to the end of the checkers
	  checker.optional = optionalCheck;
	
	  fixType(checker, checker.optional);
	}
	
	function addNullable(checker, disabled) {
	  var nullableCheck = disabled ? getNoop() : function nullableCheck(val, name, location, obj) {
	    if (val !== null) {
	      return checker(val, name, location, obj);
	    }
	  };
	  // inherit all properties on the original checker
	  copyProps(checker, nullableCheck);
	
	  nullableCheck.isNullable = true;
	  nullableCheck.displayName = checker.displayName + " (nullable)";
	  nullableCheck.originalChecker = checker;
	
	  // the magic line that allows you to add .nullable to the end of the checkers
	  checker.nullable = nullableCheck;
	
	  fixType(checker, checker.nullable);
	  if (!checker.notOptional) {
	    addOptional(checker.nullable, disabled);
	  }
	}
	
	function fixType(checker, checkerCopy) {
	  // fix type, because it's not a straight copy...
	  // the reason is we need to specify type.__apiCheckData.optional as true for the terse/verbose option.
	  // we also want to add "(optional)" to the types with a string
	  if (typeof checkerCopy.type === "object") {
	    checkerCopy.type = copy(checkerCopy.type); // make our own copy of this
	  } else if (typeof checkerCopy.type === "function") {
	    checkerCopy.type = function () {
	      return checker.type.apply(checker, arguments);
	    };
	  } else {
	    checkerCopy.type += " (optional)";
	    return;
	  }
	  checkerCopy.type.__apiCheckData = copy(checker.type.__apiCheckData) || {}; // and this
	  checkerCopy.type.__apiCheckData.optional = true;
	}
	
	// UTILS
	
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
	
	    emptyObject: emptyObjectCheckGetter(),
	
	    instanceOf: instanceCheckGetter,
	    oneOf: oneOfCheckGetter,
	    oneOfType: oneOfTypeCheckGetter,
	
	    arrayOf: arrayOfCheckGetter,
	    objectOf: objectOfCheckGetter,
	    typeOrArrayOf: typeOrArrayOfCheckGetter,
	
	    range: rangeCheckGetter,
	
	    shape: getShapeCheckGetter(),
	    args: argumentsCheckerGetter(),
	
	    any: anyCheckGetter(),
	    "null": nullCheckGetter()
	
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
	
	    shapeCheckGetter.requiredIfNot = function shapeRequiredIfNot(otherProps, propChecker) {
	      if (!Array.isArray(otherProps)) {
	        otherProps = [otherProps];
	      }
	      return getRequiredIfNotChecker(false, otherProps, propChecker);
	    };
	
	    shapeCheckGetter.requiredIfNot.all = function shapeRequiredIfNotAll(otherProps, propChecker) {
	      if (!Array.isArray(otherProps)) {
	        throw new Error("requiredIfNot.all must be passed an array");
	      }
	      return getRequiredIfNotChecker(true, otherProps, propChecker);
	    };
	
	    function getRequiredIfNotChecker(all, otherProps, propChecker) {
	      var props = t(otherProps.join(", "));
	      var ifProps = "if " + (all ? "all of" : "at least one of");
	      var type = "specified " + ifProps + " these are not specified: " + props + " (otherwise it's optional)";
	      return setupChecker(function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
	        var propExists = obj && obj.hasOwnProperty(propName);
	        var iteration = all ? "every" : "some";
	        var otherPropsExist = otherProps[iteration](function (otherProp) {
	          return obj && obj.hasOwnProperty(otherProp);
	        });
	        if (!otherPropsExist && !propExists) {
	          return getError(propName, location, type);
	        } else if (propExists) {
	          return propChecker(prop, propName, location, obj);
	        }
	      }, { type: type, notRequired: true }, disabled);
	    }
	
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
	
	  function nullCheckGetter() {
	    var type = "null";
	    return setupChecker(function nullChecker(val, name, location) {
	      if (val !== null) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }
	
	  function rangeCheckGetter(min, max) {
	    var type = "Range (" + min + " - " + max + ")";
	    return setupChecker(function rangeChecker(val, name, location) {
	      if (typeof val !== "number" || val < min || val > max) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }
	
	  function emptyObjectCheckGetter() {
	    var type = "empty object";
	    return setupChecker(function emptyObjectChecker(val, name, location) {
	      if (typeOf(val) !== "object" || val === null || Object.keys(val).length) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3MTg4MTM4ZWEzMDQ0YzgyYjhhYyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFF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O0FBQzVCLFlBQU8sWUFBWSxDQUFDLFNBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDbkUsV0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkUsZ0JBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkM7TUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCO0VBRUY7Ozs7Ozs7Ozs7O0FDdllEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDcxODgxMzhlYTMwNDRjODJiOGFjXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FwaUNoZWNrJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcbmNvbnN0IGFwaUNoZWNrVXRpbCA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7ZWFjaCwgaXNFcnJvciwgdCwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCB0eXBlT2YsIGdldEVycm9yfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xuY29uc3QgYXBpQ2hlY2tBcGlzID0gZ2V0QXBpQ2hlY2tBcGlzKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZTtcbm1vZHVsZS5leHBvcnRzLnV0aWxzID0gYXBpQ2hlY2tVdGlsO1xubW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnID0ge1xuICB2ZXJib3NlOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlXG59O1xuXG5jb25zdCBhcGlDaGVja0FwaUNoZWNrID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZSh7XG4gIG91dHB1dDoge3ByZWZpeDogJ2FwaUNoZWNrJ31cbn0pO1xubW9kdWxlLmV4cG9ydHMuaW50ZXJuYWxDaGVja2VyID0gYXBpQ2hlY2tBcGlDaGVjaztcblxuXG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tJbnN0YW5jZShjb25maWcgPSB7fSwgZXh0cmFDaGVja2VycyA9IHt9KSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgaWYgKGFwaUNoZWNrQXBpQ2hlY2sgJiYgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGFwaUNoZWNrQXBpQ2hlY2sudGhyb3coYXBpQ2hlY2tBcGlzLmdldEFwaUNoZWNrSW5zdGFuY2VDaGVja2VycywgYXJndW1lbnRzLCB7XG4gICAgICBwcmVmaXg6ICdjcmVhdGluZyBhbiBhcGlDaGVjayBpbnN0YW5jZSdcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgICB0aHJvdzogZ2V0QXBpQ2hlY2sodHJ1ZSksXG4gICAgd2FybjogZ2V0QXBpQ2hlY2soZmFsc2UpLFxuICAgIGdldEVycm9yTWVzc2FnZSxcbiAgICBoYW5kbGVFcnJvck1lc3NhZ2UsXG4gICAgY29uZmlnOiB7XG4gICAgICBvdXRwdXQ6IGNvbmZpZy5vdXRwdXQgfHwge1xuICAgICAgICBwcmVmaXg6ICcnLFxuICAgICAgICBzdWZmaXg6ICcnLFxuICAgICAgICBkb2NzQmFzZVVybDogJydcbiAgICAgIH0sXG4gICAgICB2ZXJib3NlOiBjb25maWcudmVyYm9zZSB8fCBmYWxzZSxcbiAgICAgIGRpc2FibGVkOiBjb25maWcuZGlzYWJsZWQgfHwgZmFsc2VcbiAgICB9LFxuICAgIHV0aWxzOiBhcGlDaGVja1V0aWxcbiAgfTtcblxuICBlYWNoKGFkZGl0aW9uYWxQcm9wZXJ0aWVzLCAod3JhcHBlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSB3cmFwcGVyKTtcblxuICBjb25zdCBkaXNhYmxlZCA9IGFwaUNoZWNrLmRpc2FibGVkIHx8IG1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZDtcbiAgZWFjaChjaGVja2Vycy5nZXRDaGVja2VycyhkaXNhYmxlZCksIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuICBlYWNoKGV4dHJhQ2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuXG4gIHJldHVybiBhcGlDaGVjaztcblxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBpbnN0YW5jZSBmdW5jdGlvbi4gT3RoZXIgdGhpbmdzIGFyZSBhdHRhY2hlZCB0byB0aGlzIHNlZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYWJvdmUuXG4gICAqIEBwYXJhbSBhcGkge0FycmF5fVxuICAgKiBAcGFyYW0gYXJncyB7YXJndW1lbnRzfVxuICAgKiBAcGFyYW0gb3V0cHV0IHtPYmplY3R9XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gaWYgdGhpcyBoYXMgYSBmYWlsZWQgPSB0cnVlIHByb3BlcnR5LCB0aGVuIGl0IGZhaWxlZFxuICAgKi9cbiAgZnVuY3Rpb24gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo4ICovXG4gICAgaWYgKGFwaUNoZWNrLmNvbmZpZy5kaXNhYmxlZCB8fCBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwaVR5cGVzOiB7fSwgYXJnVHlwZXM6IHt9LFxuICAgICAgICBwYXNzZWQ6IHRydWUsIG1lc3NhZ2U6ICcnLFxuICAgICAgICBmYWlsZWQ6IGZhbHNlXG4gICAgICB9OyAvLyBlbXB0eSB2ZXJzaW9uIG9mIHdoYXQgaXMgbm9ybWFsbHkgcmV0dXJuZWRcbiAgICB9XG4gICAgY2hlY2tBcGlDaGVja0FwaShhcmd1bWVudHMpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcGkpKSB7XG4gICAgICBhcGkgPSBbYXBpXTtcbiAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHR1cm4gYXJndW1lbnRzIGludG8gYW4gYXJyYXlcbiAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2VzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHRoaXMgaXMgd2hlcmUgd2UgYWN0dWFsbHkgZ28gcGVyZm9ybSB0aGUgY2hlY2tzLlxuICAgICAgbWVzc2FnZXMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncyk7XG4gICAgfVxuXG4gICAgbGV0IHJldHVybk9iamVjdCA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcywgb3V0cHV0KTtcbiAgICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9ICcnO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tBcGlDaGVja0FwaSwgc2hvdWxkIGJlIHJlYWQgbGlrZTogY2hlY2sgYXBpQ2hlY2sgYXBpLiBBcyBpbiwgY2hlY2sgdGhlIGFwaSBmb3IgYXBpQ2hlY2sgOi0pXG4gICAqIEBwYXJhbSBjaGVja0FwaUFyZ3NcbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrQXBpQ2hlY2tBcGkoY2hlY2tBcGlBcmdzKSB7XG4gICAgY29uc3QgYXBpID0gY2hlY2tBcGlBcmdzWzBdO1xuICAgIGNvbnN0IGFyZ3MgPSBjaGVja0FwaUFyZ3NbMV07XG4gICAgdmFyIGlzQXJyYXlPckFyZ3MgPSBBcnJheS5pc0FycmF5KGFyZ3MpIHx8IChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYXJncy5sZW5ndGggPT09ICdudW1iZXInKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGFwaSkgJiYgIWlzQXJyYXlPckFyZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoYXBpLCBbYXJnc10sXG4gICAgICAgIFsnSWYgYW4gYXJyYXkgaXMgcHJvdmlkZWQgZm9yIHRoZSBhcGksIGFuIGFycmF5IG11c3QgYmUgcHJvdmlkZWQgZm9yIHRoZSBhcmdzIGFzIHdlbGwuJ10sXG4gICAgICAgIHtwcmVmaXg6ICdhcGlDaGVjayd9XG4gICAgICApKTtcbiAgICB9XG4gICAgLy8gZG9nIGZvb2RpbmcgaGVyZVxuICAgIGNvbnN0IGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncywgZXJyb3JzLCB7XG4gICAgICAgIHByZWZpeDogJ2FwaUNoZWNrJ1xuICAgICAgfSk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBnZXRBcGlDaGVjayhzaG91bGRUaHJvdykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAgIGxldCByZXN1bHQgPSBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UsIHNob3VsZFRocm93KTtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIHdvbnQgZ2V0IGhlcmUgaWYgYW4gZXJyb3IgaXMgdGhyb3duXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCBzaG91bGRUaHJvdykge1xuICAgIGlmIChzaG91bGRUaHJvdyAmJiBtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMgPSBbXSwgb3V0cHV0ID0ge30pIHtcbiAgICBsZXQgZ091dCA9IGFwaUNoZWNrLmNvbmZpZy5vdXRwdXQgfHwge307XG4gICAgbGV0IHByZWZpeCA9IGdldFByZWZpeCgpO1xuICAgIGxldCBzdWZmaXggPSBnZXRTdWZmaXgoKTtcbiAgICBsZXQgdXJsID0gZ2V0VXJsKCk7XG4gICAgbGV0IG1lc3NhZ2UgPSBgYXBpQ2hlY2sgZmFpbGVkISAke21lc3NhZ2VzLmpvaW4oJywgJyl9YDtcbiAgICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fSAke21lc3NhZ2V9ICR7c3VmZml4fSAke3VybCB8fCAnJ30ke3Bhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWR9YC50cmltKCk7XG5cbiAgICBmdW5jdGlvbiBnZXRQcmVmaXgoKSB7XG4gICAgICBsZXQgcHJlZml4ID0gb3V0cHV0Lm9ubHlQcmVmaXg7XG4gICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICBwcmVmaXggPSBgJHtnT3V0LnByZWZpeCB8fCAnJ30gJHtvdXRwdXQucHJlZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdWZmaXgoKSB7XG4gICAgICBsZXQgc3VmZml4ID0gb3V0cHV0Lm9ubHlTdWZmaXg7XG4gICAgICBpZiAoIXN1ZmZpeCkge1xuICAgICAgICBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1ZmZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVcmwoKSB7XG4gICAgICBsZXQgdXJsID0gb3V0cHV0LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IGdPdXQuZG9jc0Jhc2VVcmwgJiYgb3V0cHV0LnVybFN1ZmZpeCAmJiBgJHtnT3V0LmRvY3NCYXNlVXJsfSR7b3V0cHV0LnVybFN1ZmZpeH1gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKSB7XG4gICAgbGV0IHthcGlUeXBlcywgYXJnVHlwZXN9ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBsZXQgY29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MgfHwgW10pO1xuICAgIGxldCByZXBsYWNlZEl0ZW1zID0gW107XG4gICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUoY29weSk7XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGdldE9iamVjdFN0cmluZyhjb3B5KTtcbiAgICBhcmdUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcmdUeXBlcyk7XG4gICAgYXBpVHlwZXMgPSBnZXRPYmplY3RTdHJpbmcoYXBpVHlwZXMpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRlTWVzc2FnZSgpO1xuXG5cbiAgICAvLyBmdW5jdGlvbnNcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VGdW5jdGlvbldpdGhOYW1lKG9iaikge1xuICAgICAgZWFjaChvYmosICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBpZiAocmVwbGFjZWRJdGVtcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7IC8vIGF2b2lkIHJlY3Vyc2l2ZSBwcm9ibGVtc1xuICAgICAgICAgIHJlcGxhY2VkSXRlbXMucHVzaCh2YWwpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbC5kaXNwbGF5TmFtZSB8fCB2YWwubmFtZSB8fCAnYW5vbnltb3VzIGZ1bmN0aW9uJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9iamVjdFN0cmluZyh0eXBlcykge1xuICAgICAgaWYgKCF0eXBlcyB8fCAhdHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnbm90aGluZyc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVzICYmIHR5cGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlcyA9IHR5cGVzWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmluZ2lmeSh0eXBlcywgbnVsbCwgMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVNZXNzYWdlKCkge1xuICAgICAgY29uc3QgbiA9ICdcXG4nO1xuICAgICAgbGV0IHVzZVMgPSB0cnVlO1xuICAgICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHVzZVMgPSAhIU9iamVjdC5rZXlzKGFyZ3NbMF0pLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1c2VTID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGVzID0gYHR5cGUke3VzZVMgPyAncycgOiAnJ31gO1xuICAgICAgY29uc3QgbmV3TGluZSA9IG4gKyBuO1xuICAgICAgcmV0dXJuIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9JHtuZXdMaW5lfWAgK1xuICAgICAgICBgV2l0aCB0aGUgJHt0eXBlc306JHtufSR7YXJnVHlwZXN9JHtuZXdMaW5lfWAgK1xuICAgICAgICBgVGhlIEFQSSBjYWxscyBmb3I6JHtufSR7YXBpVHlwZXN9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlcyhhcGksIGFyZ3MpIHtcbiAgICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICAgIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgICBsZXQgYXBpVHlwZXMgPSBhcGkubWFwKChjaGVja2VyLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3BlY2lmaWVkID0gbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmhhc093blByb3BlcnR5KCd2ZXJib3NlJyk7XG4gICAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge1xuICAgICAgICB0ZXJzZTogc3BlY2lmaWVkID8gIW1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy52ZXJib3NlIDogIWFwaUNoZWNrLmNvbmZpZy52ZXJib3NlLFxuICAgICAgICBvYmo6IGFyZ3NbaW5kZXhdLFxuICAgICAgICBhZGRIZWxwZXJzOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBsZXQgYXJnVHlwZXMgPSBhcmdzLm1hcCgoYXJnKSA9PiBnZXRBcmdEaXNwbGF5KGFyZywgW10pKTtcbiAgICByZXR1cm4ge2FyZ1R5cGVzOiBhcmdUeXBlcywgYXBpVHlwZXN9O1xuICB9XG5cbn1cblxuXG4vLyBTVEFURUxFU1MgRlVOQ1RJT05TXG5cbi8qKlxuICogVGhpcyBpcyB3aGVyZSB0aGUgbWFnaWMgaGFwcGVucyBmb3IgYWN0dWFsbHkgY2hlY2tpbmcgdGhlIGFyZ3VtZW50cyB3aXRoIHRoZSBhcGkuXG4gKiBAcGFyYW0gYXBpIHtBcnJheX0gLSBjaGVja2Vyc1xuICogQHBhcmFtIGFyZ3Mge0FycmF5fSAtIGFuZCBhcmd1bWVudHMgb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IG1lc3NhZ2VzID0gW107XG4gIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgbGV0IGNoZWNrZXJJbmRleCA9IDA7XG4gIGxldCBhcmdJbmRleCA9IDA7XG4gIGxldCBhcmcsIGNoZWNrZXIsIHJlcywgbGFzdENoZWNrZXIsIGFyZ05hbWUsIGFyZ0ZhaWxlZCwgc2tpcFByZXZpb3VzQ2hlY2tlcjtcbiAgLyoganNoaW50IC1XMDg0ICovXG4gIHdoaWxlICgoY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK10pICYmIChhcmdJbmRleCA8IGFyZ3MubGVuZ3RoKSkge1xuICAgIGFyZyA9IGFyZ3NbYXJnSW5kZXgrK107XG4gICAgYXJnTmFtZSA9ICdBcmd1bWVudCAnICsgYXJnSW5kZXggKyAoY2hlY2tlci5pc09wdGlvbmFsID8gJyAob3B0aW9uYWwpJyA6ICcnKTtcbiAgICByZXMgPSBjaGVja2VyKGFyZywgJ3ZhbHVlJywgYXJnTmFtZSk7XG4gICAgYXJnRmFpbGVkID0gaXNFcnJvcihyZXMpO1xuICAgIGxhc3RDaGVja2VyID0gY2hlY2tlckluZGV4ID49IGFwaS5sZW5ndGg7XG4gICAgc2tpcFByZXZpb3VzQ2hlY2tlciA9IGNoZWNrZXJJbmRleCA+IDEgJiYgYXBpW2NoZWNrZXJJbmRleCAtIDFdLmlzT3B0aW9uYWw7XG4gICAgaWYgKChhcmdGYWlsZWQgJiYgbGFzdENoZWNrZXIpIHx8IChhcmdGYWlsZWQgJiYgIWxhc3RDaGVja2VyICYmICFjaGVja2VyLmlzT3B0aW9uYWwgJiYgIXNraXBQcmV2aW91c0NoZWNrZXIpKSB7XG4gICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgbWVzc2FnZXMucHVzaChnZXRDaGVja2VyRXJyb3JNZXNzYWdlKHJlcywgY2hlY2tlciwgYXJnKSk7XG4gICAgfSBlbHNlIGlmIChhcmdGYWlsZWQgJiYgY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBhcmdJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKGAke3QoYXJnTmFtZSl9IHBhc3NlZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFpbGVkID8gbWVzc2FnZXMgOiBbXTtcbn1cblxuXG5jaGVja2VyVHlwZVR5cGUudHlwZSA9ICdmdW5jdGlvbiB3aXRoIF9fYXBpQ2hlY2tEYXRhIHByb3BlcnR5IGFuZCBgJHtmdW5jdGlvbi50eXBlfWAgcHJvcGVydHknO1xuZnVuY3Rpb24gY2hlY2tlclR5cGVUeXBlKGNoZWNrZXJUeXBlLCBuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCBhcGlDaGVja0RhdGFDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUoe1xuICAgIHR5cGU6IGNoZWNrZXJzLnN0cmluZyxcbiAgICBvcHRpb25hbDogY2hlY2tlcnMuYm9vbFxuICB9KTtcbiAgY29uc3QgYXNGdW5jID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7X19hcGlDaGVja0RhdGE6IGFwaUNoZWNrRGF0YUNoZWNrZXJ9KTtcbiAgY29uc3QgYXNTaGFwZSA9IGNoZWNrZXJzLnNoYXBlKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCB3cm9uZ1NoYXBlID0gY2hlY2tlcnMub25lT2ZUeXBlKFtcbiAgICBhc0Z1bmMsIGFzU2hhcGVcbiAgXSkoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKTtcbiAgaWYgKGlzRXJyb3Iod3JvbmdTaGFwZSkpIHtcbiAgICByZXR1cm4gd3JvbmdTaGFwZTtcbiAgfVxuICBpZiAodHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnZnVuY3Rpb24nICYmICFjaGVja2VyVHlwZS5oYXNPd25Qcm9wZXJ0eShjaGVja2VyVHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlKSkge1xuICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGVUeXBlLnR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCB2YWwpIHtcbiAgbGV0IGNoZWNrZXJIZWxwID0gZ2V0Q2hlY2tlckhlbHAoY2hlY2tlciwgdmFsKTtcbiAgY2hlY2tlckhlbHAgPSBjaGVja2VySGVscCA/ICcgLSAnICsgY2hlY2tlckhlbHAgOiAnJztcbiAgcmV0dXJuIHJlcy5tZXNzYWdlICsgY2hlY2tlckhlbHA7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJIZWxwKHtoZWxwfSwgdmFsKSB7XG4gIGlmICghaGVscCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodHlwZW9mIGhlbHAgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoZWxwID0gaGVscCh2YWwpO1xuICB9XG4gIHJldHVybiBoZWxwO1xufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IHJlcXVpcmVkQXJncyA9IGFwaS5maWx0ZXIoYSA9PiAhYS5pc09wdGlvbmFsKTtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWRBcmdzLmxlbmd0aCkge1xuICAgIHJldHVybiBbXG4gICAgICAnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXJnRGlzcGxheShhcmcsIGdvdHRlbkFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBjb25zdCBjTmFtZSA9IGFyZyAmJiBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGNvbnN0IHR5cGUgPSB0eXBlT2YoYXJnKTtcbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaGFzS2V5cygpKSB7XG4gICAgICBsZXQgcHJvcGVydGllcyA9IHN0cmluZ2lmeShnZXREaXNwbGF5SWZOb3RHb3R0ZW4oKSk7XG4gICAgICByZXR1cm4gY05hbWUgKyAnICh3aXRoIHByb3BlcnRpZXM6ICcgKyBwcm9wZXJ0aWVzICsgJyknO1xuICAgIH1cbiAgICByZXR1cm4gY05hbWU7XG4gIH1cblxuICBpZiAoYXJnID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIGlmICh0eXBlICE9PSAnYXJyYXknICYmIHR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBpZiAoaGFzS2V5cygpKSB7XG4gICAgcmV0dXJuIGdldERpc3BsYXlJZk5vdEdvdHRlbigpO1xuICB9XG5cbiAgcmV0dXJuIGNOYW1lO1xuXG4gIC8vIHV0aWxpdHkgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIGhhc0tleXMoKSB7XG4gICAgcmV0dXJuIGFyZyAmJiBPYmplY3Qua2V5cyhhcmcpLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpc3BsYXlJZk5vdEdvdHRlbigpIHtcbiAgICBpZiAoZ290dGVuQXJncy5pbmRleE9mKGFyZykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgIH1cbiAgICBnb3R0ZW5BcmdzLnB1c2goYXJnKTtcbiAgICByZXR1cm4gZ2V0RGlzcGxheShhcmcsIGdvdHRlbkFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqLCBnb3R0ZW5BcmdzKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodiwgaykgPT4gYXJnRGlzcGxheVtrXSA9IGdldEFyZ0Rpc3BsYXkodiwgZ290dGVuQXJncykpO1xuICByZXR1cm4gYXJnRGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tBcGlzKCkge1xuICBjb25zdCBvcyA9IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbDtcblxuICBjb25zdCBjaGVja2VyRm5DaGVja2VyID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7XG4gICAgdHlwZTogY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2Vycy5zdHJpbmcsIGNoZWNrZXJUeXBlVHlwZV0pLm9wdGlvbmFsLFxuICAgIGRpc3BsYXlOYW1lOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgc2hvcnRUeXBlOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgbm90T3B0aW9uYWw6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gICAgbm90UmVxdWlyZWQ6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWxcbiAgfSk7XG5cbiAgY29uc3QgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzID0gW1xuICAgIGNoZWNrZXJzLnNoYXBlKHtcbiAgICAgIG91dHB1dDogY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgICBwcmVmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgc3VmZml4OiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgIGRvY3NCYXNlVXJsOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWxcbiAgICAgIH0pLnN0cmljdC5vcHRpb25hbCxcbiAgICAgIHZlcmJvc2U6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gICAgICBkaXNhYmxlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICAgIH0pLnN0cmljdC5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5vYmplY3RPZihjaGVja2VyRm5DaGVja2VyKS5vcHRpb25hbFxuICBdO1xuXG4gIGNvbnN0IGNoZWNrQXBpQ2hlY2tBcGkgPSBbXG4gICAgY2hlY2tlcnMudHlwZU9yQXJyYXlPZihjaGVja2VyRm5DaGVja2VyKSxcbiAgICBjaGVja2Vycy5hbnkub3B0aW9uYWwsXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgcHJlZml4OiBvcywgc3VmZml4OiBvcywgdXJsU3VmZml4OiBvcywgLy8gYXBwZW5kZWQgY2FzZVxuICAgICAgb25seVByZWZpeDogb3MsIG9ubHlTdWZmaXg6IG9zLCB1cmw6IG9zIC8vIG92ZXJyaWRlIGNhc2VcbiAgICB9KS5zdHJpY3Qub3B0aW9uYWxcbiAgXTtcblxuICByZXR1cm4ge1xuICAgIGNoZWNrZXJGbkNoZWNrZXIsXG4gICAgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzLFxuICAgIGNoZWNrQXBpQ2hlY2tBcGlcbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrLmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3QgY2hlY2tlckhlbHBlcnMgPSB7XG4gIGFkZE9wdGlvbmFsLCBnZXRSZXF1aXJlZFZlcnNpb24sIHNldHVwQ2hlY2tlciwgYWRkTnVsbGFibGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlYWNoLCBjb3B5LCB0eXBlT2YsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSxcbiAgaXNFcnJvciwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIHVuZGVmLCBjaGVja2VySGVscGVycyxcbiAgbm9vcFxufTtcblxuZnVuY3Rpb24gY29weShvYmopIHtcbiAgbGV0IHR5cGUgPSB0eXBlT2Yob2JqKTtcbiAgbGV0IGRhQ29weTtcbiAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICBkYUNvcHkgPSBbXTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGRhQ29weSA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4ge1xuICAgIGRhQ29weVtrZXldID0gdmFsOyAvLyBjYW5ub3Qgc2luZ2xlLWxpbmUgdGhpcyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYWJvcnQgdGhlIGVhY2hcbiAgfSk7XG4gIHJldHVybiBkYUNvcHk7XG59XG5cblxuZnVuY3Rpb24gdHlwZU9mKG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIG9wdGlvbnMpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgZGlzcGxheTtcbiAgbGV0IHNob3J0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnNob3J0O1xuICBpZiAoc2hvcnQgJiYgY2hlY2tlci5zaG9ydFR5cGUpIHtcbiAgICBkaXNwbGF5ID0gY2hlY2tlci5zaG9ydFR5cGU7XG4gIH0gZWxzZSBpZiAoIXNob3J0ICYmIHR5cGVvZiBjaGVja2VyLnR5cGUgPT09ICdvYmplY3QnIHx8IGNoZWNrZXIudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRpc3BsYXkgPSBnZXRDaGVja2VyVHlwZShjaGVja2VyLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucykgfHwgY2hlY2tlci5kaXNwbGF5TmFtZSB8fCBjaGVja2VyLm5hbWU7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJUeXBlKHt0eXBlfSwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBsZXQgX19hcGlDaGVja0RhdGEgPSB0eXBlLl9fYXBpQ2hlY2tEYXRhO1xuICAgIGxldCB0eXBlVHlwZXMgPSB0eXBlKG9wdGlvbnMpO1xuICAgIHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YSxcbiAgICAgIFtfX2FwaUNoZWNrRGF0YS50eXBlXTogdHlwZVR5cGVzXG4gICAgfTtcbiAgfVxuICByZXR1cm4gdHlwZTtcbn1cblxuZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gIGlmICghb2JqKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtvYmpdO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gZWFjaEFycnkoLi4uYXJndW1lbnRzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWFjaE9iaiguLi5hcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2hPYmoob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBlYWNoQXJyeShvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0Vycm9yKG9iaikge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3I7XG59XG5cbmZ1bmN0aW9uIGxpc3QoYXJyeSwgam9pbiwgZmluYWxKb2luKSB7XG4gIGFycnkgPSBhcnJheWlmeShhcnJ5KTtcbiAgbGV0IGNvcHkgPSBhcnJ5LnNsaWNlKCk7XG4gIGxldCBsYXN0ID0gY29weS5wb3AoKTtcbiAgaWYgKGNvcHkubGVuZ3RoID09PSAxKSB7XG4gICAgam9pbiA9ICcgJztcbiAgfVxuICByZXR1cm4gY29weS5qb2luKGpvaW4pICsgYCR7Y29weS5sZW5ndGggPyBqb2luICsgZmluYWxKb2luIDogJyd9JHtsYXN0fWA7XG59XG5cblxuZnVuY3Rpb24gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIGNoZWNrZXJUeXBlKSB7XG4gIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdvYmplY3QnID8gY2hlY2tlclR5cGUgOiBzdHJpbmdpZnkoY2hlY2tlclR5cGUpO1xuICByZXR1cm4gbmV3IEVycm9yKGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBtdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbn1cblxuZnVuY3Rpb24gbkF0TChuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCB0TmFtZSA9IHQobmFtZSB8fCAndmFsdWUnKTtcbiAgbGV0IHRMb2NhdGlvbiA9ICFsb2NhdGlvbiA/ICcnIDogJyBhdCAnICsgdChsb2NhdGlvbik7XG4gIHJldHVybiBgJHt0TmFtZX0ke3RMb2NhdGlvbn1gO1xufVxuXG5mdW5jdGlvbiB0KHRoaW5nKSB7XG4gIHJldHVybiAnYCcgKyB0aGluZyArICdgJztcbn1cblxuZnVuY3Rpb24gdW5kZWYodGhpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuLyoqXG4gKiBUaGlzIHdpbGwgc2V0IHVwIHRoZSBjaGVja2VyIHdpdGggYWxsIG9mIHRoZSBkZWZhdWx0cyB0aGF0IG1vc3QgY2hlY2tlcnMgd2FudCBsaWtlIHJlcXVpcmVkIGJ5IGRlZmF1bHQgYW5kIGFuXG4gKiBvcHRpb25hbCB2ZXJzaW9uXG4gKiBAcGFyYW0gY2hlY2tlclxuICogQHBhcmFtIHByb3BlcnRpZXMgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIGNoZWNrZXJcbiAqIEBwYXJhbSBkaXNhYmxlZCAtIHdoZW4gc2V0IHRvIHRydWUsIHRoaXMgd2lsbCBzZXQgdGhlIGNoZWNrZXIgdG8gYSBuby1vcCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBzZXR1cENoZWNrZXIoY2hlY2tlciwgcHJvcGVydGllcywgZGlzYWJsZWQpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6OSAqL1xuICBpZiAoZGlzYWJsZWQpIHsgLy8gc3dhcCBvdXQgdGhlIGNoZWNrZXIgZm9yIGl0cyBvd24gY29weSBvZiBub29wXG4gICAgY2hlY2tlciA9IGdldE5vb3AoKTtcbiAgICBjaGVja2VyLmlzTm9vcCA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjaGVja2VyLnNob3J0VHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgfVxuXG4gIC8vIGFzc2lnbiBhbGwgcHJvcGVydGllcyBnaXZlblxuICBlYWNoKHByb3BlcnRpZXMsIChwcm9wLCBuYW1lKSA9PiBjaGVja2VyW25hbWVdID0gcHJvcCk7XG5cbiAgaWYgKCFjaGVja2VyLmRpc3BsYXlOYW1lKSB7XG4gICAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci5zaG9ydFR5cGUgfHwgY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIH1cblxuXG4gIGlmICghY2hlY2tlci5ub3RSZXF1aXJlZCkge1xuICAgIGNoZWNrZXIgPSBnZXRSZXF1aXJlZFZlcnNpb24oY2hlY2tlciwgZGlzYWJsZWQpO1xuICB9XG5cbiAgaWYgKCFjaGVja2VyLm5vdE51bGxhYmxlKSB7XG4gICAgYWRkTnVsbGFibGUoY2hlY2tlciwgZGlzYWJsZWQpO1xuICB9XG5cbiAgaWYgKCFjaGVja2VyLm5vdE9wdGlvbmFsKSB7XG4gICAgYWRkT3B0aW9uYWwoY2hlY2tlciwgZGlzYWJsZWQpO1xuICB9XG5cbiAgcmV0dXJuIGNoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGdldFJlcXVpcmVkVmVyc2lvbihjaGVja2VyLCBkaXNhYmxlZCkge1xuICB2YXIgcmVxdWlyZWRDaGVja2VyID0gZGlzYWJsZWQgPyBnZXROb29wKCkgOiBmdW5jdGlvbiByZXF1aXJlZENoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKHVuZGVmKHZhbCkgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgbGV0IHRMb2NhdGlvbiA9IGxvY2F0aW9uID8gYCBpbiAke3QobG9jYXRpb24pfWAgOiAnJztcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgICAgIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcgPyB0eXBlIDogc3RyaW5naWZ5KHR5cGUpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihgUmVxdWlyZWQgJHt0KG5hbWUpfSBub3Qgc3BlY2lmaWVkJHt0TG9jYXRpb259LiBNdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH07XG4gIGNvcHlQcm9wcyhjaGVja2VyLCByZXF1aXJlZENoZWNrZXIpO1xuICByZXF1aXJlZENoZWNrZXIub3JpZ2luYWxDaGVja2VyID0gY2hlY2tlcjtcbiAgcmV0dXJuIHJlcXVpcmVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gYWRkT3B0aW9uYWwoY2hlY2tlciwgZGlzYWJsZWQpIHtcbiAgdmFyIG9wdGlvbmFsQ2hlY2sgPSBkaXNhYmxlZCA/IGdldE5vb3AoKSA6IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKCF1bmRlZih2YWwpKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfTtcbiAgLy8gaW5oZXJpdCBhbGwgcHJvcGVydGllcyBvbiB0aGUgb3JpZ2luYWwgY2hlY2tlclxuICBjb3B5UHJvcHMoY2hlY2tlciwgb3B0aW9uYWxDaGVjayk7XG5cbiAgb3B0aW9uYWxDaGVjay5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgb3B0aW9uYWxDaGVjay5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWUgKyAnIChvcHRpb25hbCknO1xuICBvcHRpb25hbENoZWNrLm9yaWdpbmFsQ2hlY2tlciA9IGNoZWNrZXI7XG5cblxuICAvLyB0aGUgbWFnaWMgbGluZSB0aGF0IGFsbG93cyB5b3UgdG8gYWRkIC5vcHRpb25hbCB0byB0aGUgZW5kIG9mIHRoZSBjaGVja2Vyc1xuICBjaGVja2VyLm9wdGlvbmFsID0gb3B0aW9uYWxDaGVjaztcblxuICBmaXhUeXBlKGNoZWNrZXIsIGNoZWNrZXIub3B0aW9uYWwpO1xufVxuXG5mdW5jdGlvbiBhZGROdWxsYWJsZShjaGVja2VyLCBkaXNhYmxlZCkge1xuICB2YXIgbnVsbGFibGVDaGVjayA9IGRpc2FibGVkID8gZ2V0Tm9vcCgpIDogZnVuY3Rpb24gbnVsbGFibGVDaGVjayh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfTtcbiAgLy8gaW5oZXJpdCBhbGwgcHJvcGVydGllcyBvbiB0aGUgb3JpZ2luYWwgY2hlY2tlclxuICBjb3B5UHJvcHMoY2hlY2tlciwgbnVsbGFibGVDaGVjayk7XG5cbiAgbnVsbGFibGVDaGVjay5pc051bGxhYmxlID0gdHJ1ZTtcbiAgbnVsbGFibGVDaGVjay5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWUgKyAnIChudWxsYWJsZSknO1xuICBudWxsYWJsZUNoZWNrLm9yaWdpbmFsQ2hlY2tlciA9IGNoZWNrZXI7XG5cbiAgLy8gdGhlIG1hZ2ljIGxpbmUgdGhhdCBhbGxvd3MgeW91IHRvIGFkZCAubnVsbGFibGUgdG8gdGhlIGVuZCBvZiB0aGUgY2hlY2tlcnNcbiAgY2hlY2tlci5udWxsYWJsZSA9IG51bGxhYmxlQ2hlY2s7XG5cbiAgZml4VHlwZShjaGVja2VyLCBjaGVja2VyLm51bGxhYmxlKTtcbiAgaWYgKCFjaGVja2VyLm5vdE9wdGlvbmFsKSB7XG4gICAgYWRkT3B0aW9uYWwoY2hlY2tlci5udWxsYWJsZSwgZGlzYWJsZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpeFR5cGUoY2hlY2tlciwgY2hlY2tlckNvcHkpIHtcbiAgLy8gZml4IHR5cGUsIGJlY2F1c2UgaXQncyBub3QgYSBzdHJhaWdodCBjb3B5Li4uXG4gIC8vIHRoZSByZWFzb24gaXMgd2UgbmVlZCB0byBzcGVjaWZ5IHR5cGUuX19hcGlDaGVja0RhdGEub3B0aW9uYWwgYXMgdHJ1ZSBmb3IgdGhlIHRlcnNlL3ZlcmJvc2Ugb3B0aW9uLlxuICAvLyB3ZSBhbHNvIHdhbnQgdG8gYWRkIFwiKG9wdGlvbmFsKVwiIHRvIHRoZSB0eXBlcyB3aXRoIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YgY2hlY2tlckNvcHkudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjaGVja2VyQ29weS50eXBlID0gY29weShjaGVja2VyQ29weS50eXBlKTsgLy8gbWFrZSBvdXIgb3duIGNvcHkgb2YgdGhpc1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaGVja2VyQ29weS50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hlY2tlckNvcHkudHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIudHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgY2hlY2tlckNvcHkudHlwZSArPSAnIChvcHRpb25hbCknO1xuICAgIHJldHVybjtcbiAgfVxuICBjaGVja2VyQ29weS50eXBlLl9fYXBpQ2hlY2tEYXRhID0gY29weShjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpIHx8IHt9OyAvLyBhbmQgdGhpc1xuICBjaGVja2VyQ29weS50eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsID0gdHJ1ZTtcbn1cblxuXG4vLyBVVElMU1xuXG5mdW5jdGlvbiBjb3B5UHJvcHMoc3JjLCBkZXN0KSB7XG4gIGVhY2goT2JqZWN0LmtleXMoc3JjKSwga2V5ID0+IGRlc3Rba2V5XSA9IHNyY1trZXldKTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9vcCgpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIG5vb3AoKSB7XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnMsXG4gIHVuZGVmXG4gIH0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge3NldHVwQ2hlY2tlcn0gPSBjaGVja2VySGVscGVycztcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSBnZXRDaGVja2VycygpO1xubW9kdWxlLmV4cG9ydHMuZ2V0Q2hlY2tlcnMgPSBnZXRDaGVja2VycztcblxuZnVuY3Rpb24gZ2V0Q2hlY2tlcnMoZGlzYWJsZWQpIHtcbiAgcmV0dXJuIHtcbiAgICBhcnJheTogdHlwZU9mQ2hlY2tHZXR0ZXIoJ0FycmF5JyksXG4gICAgYm9vbDogdHlwZU9mQ2hlY2tHZXR0ZXIoJ0Jvb2xlYW4nKSxcbiAgICBudW1iZXI6IHR5cGVPZkNoZWNrR2V0dGVyKCdOdW1iZXInKSxcbiAgICBzdHJpbmc6IHR5cGVPZkNoZWNrR2V0dGVyKCdTdHJpbmcnKSxcbiAgICBmdW5jOiBmdW5jQ2hlY2tHZXR0ZXIoKSxcbiAgICBvYmplY3Q6IG9iamVjdENoZWNrR2V0dGVyKCksXG5cbiAgICBlbXB0eU9iamVjdDogZW1wdHlPYmplY3RDaGVja0dldHRlcigpLFxuXG4gICAgaW5zdGFuY2VPZjogaW5zdGFuY2VDaGVja0dldHRlcixcbiAgICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgICBvbmVPZlR5cGU6IG9uZU9mVHlwZUNoZWNrR2V0dGVyLFxuXG4gICAgYXJyYXlPZjogYXJyYXlPZkNoZWNrR2V0dGVyLFxuICAgIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuICAgIHR5cGVPckFycmF5T2Y6IHR5cGVPckFycmF5T2ZDaGVja0dldHRlcixcblxuICAgIHJhbmdlOiByYW5nZUNoZWNrR2V0dGVyLFxuXG4gICAgc2hhcGU6IGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSxcbiAgICBhcmdzOiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCksXG5cbiAgICBhbnk6IGFueUNoZWNrR2V0dGVyKCksXG4gICAgbnVsbDogbnVsbENoZWNrR2V0dGVyKClcblxuICB9O1xuXG4gIGZ1bmN0aW9uIHR5cGVPZkNoZWNrR2V0dGVyKHR5cGUpIHtcbiAgICBjb25zdCBsVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZ1bmNDaGVja0dldHRlcigpIHtcbiAgICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgICBsZXQgZnVuY3Rpb25DaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHR5cGVPZih2YWwpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG5cbiAgICBmdW5jdGlvbkNoZWNrZXIud2l0aFByb3BlcnRpZXMgPSBmdW5jdGlvbiBnZXRXaXRoUHJvcGVydGllc0NoZWNrZXIocHJvcGVydGllcykge1xuICAgICAgY29uc3QgYXBpRXJyb3IgPSBjaGVja2Vycy5vYmplY3RPZihjaGVja2Vycy5mdW5jKShwcm9wZXJ0aWVzLCAncHJvcGVydGllcycsICdhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzJyk7XG4gICAgICBpZiAoaXNFcnJvcihhcGlFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgYXBpRXJyb3I7XG4gICAgICB9XG4gICAgICBsZXQgc2hhcGVDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUocHJvcGVydGllcywgdHJ1ZSk7XG4gICAgICBzaGFwZUNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlID0gJ2Z1bmMud2l0aFByb3BlcnRpZXMnO1xuXG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uV2l0aFByb3BlcnRpZXNDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3Qgbm90RnVuY3Rpb24gPSBjaGVja2Vycy5mdW5jKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgICBpZiAoaXNFcnJvcihub3RGdW5jdGlvbikpIHtcbiAgICAgICAgICByZXR1cm4gbm90RnVuY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIH0sIHt0eXBlOiBzaGFwZUNoZWNrZXIudHlwZSwgc2hvcnRUeXBlOiAnZnVuYy53aXRoUHJvcGVydGllcyd9LCBkaXNhYmxlZCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb25DaGVja2VyO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICAgIGNvbnN0IG51bGxUeXBlID0gJ09iamVjdCAobnVsbCBvayknO1xuICAgIGxldCBvYmplY3ROdWxsT2tDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBudWxsVHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGU6IG51bGxUeXBlfSwgZGlzYWJsZWQpO1xuXG4gICAgbGV0IG9iamVjdENoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb2JqZWN0Q2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCBpc0Vycm9yKG9iamVjdE51bGxPa0NoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikpKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZSwgbnVsbE9rOiBvYmplY3ROdWxsT2tDaGVja2VyfSwgZGlzYWJsZWQpO1xuXG4gICAgcmV0dXJuIG9iamVjdENoZWNrZXI7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBpbnN0YW5jZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaykpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGU6IGNsYXNzVG9DaGVjay5uYW1lfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25lT2ZDaGVja0dldHRlcihlbnVtcykge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2VudW0nfSxcbiAgICAgIGVudW06IGVudW1zXG4gICAgfTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZbJHtlbnVtcy5tYXAoZW5tID0+IHN0cmluZ2lmeShlbm0pKS5qb2luKCcsICcpfV1gO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoIWVudW1zLnNvbWUoZW5tID0+IGVubSA9PT0gdmFsKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrR2V0dGVyKGNoZWNrZXJzKSB7XG4gICAgY29uc3QgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb25lT2ZUeXBlJ30sXG4gICAgICBvbmVPZlR5cGU6IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcikpXG4gICAgfTtcbiAgICBjb25zdCBjaGVja2Vyc0Rpc3BsYXkgPSBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pKTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZUeXBlWyR7Y2hlY2tlcnNEaXNwbGF5LmpvaW4oJywgJyl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoIWNoZWNrZXJzLnNvbWUoY2hlY2tlciA9PiAhaXNFcnJvcihjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICAgIGFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gICAgfTtcbiAgICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICAgIGNvbnN0IHNob3J0VHlwZSA9IGBhcnJheU9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhcnJheU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZSwgc2hvcnRUeXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gICAgY29uc3QgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICAgIG9iamVjdE9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICAgIH07XG4gICAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgb2JqZWN0T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgY29uc3Qgbm90T2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3Iobm90T2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gbm90T2JqZWN0O1xuICAgICAgfVxuICAgICAgY29uc3QgYWxsVHlwZXNTdWNjZXNzID0gZWFjaCh2YWwsIChpdGVtLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gICAgY29uc3QgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAndHlwZU9yQXJyYXlPZid9LFxuICAgICAgdHlwZU9yQXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgICB9O1xuICAgIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYHR5cGVPckFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2VyLCBjaGVja2Vycy5hcnJheU9mKGNoZWNrZXIpXSkodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaGFwZUNoZWNrR2V0dGVyKCkge1xuICAgIGZ1bmN0aW9uIHNoYXBlQ2hlY2tHZXR0ZXIoc2hhcGUsIG5vbk9iamVjdCkge1xuICAgICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIHNoYXBlVHlwZXNbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgICAgIH0pO1xuICAgICAgZnVuY3Rpb24gdHlwZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJlbnRSZXF1aXJlZCA9IG9wdGlvbnMucmVxdWlyZWQ7XG4gICAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICAgIGNvbnN0IHNwZWNpZmllZCA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCk7XG4gICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSB1bmRlZihwYXJlbnRSZXF1aXJlZCkgPyAhY2hlY2tlci5pc09wdGlvbmFsIDogcGFyZW50UmVxdWlyZWQ7XG4gICAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgICByZXRbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7dGVyc2UsIG9iajogb2JqICYmIG9ialtwcm9wXSwgcmVxdWlyZWQsIGFkZEhlbHBlcnN9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICAgIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICBmdW5jdGlvbiBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICdJVEVNJztcbiAgICAgICAgICAgIGlmIChjaGVja2VyLnR5cGUgJiYgY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkSGVscGVyKFxuICAgICAgICAgICAgICAnbWlzc2luZycsICdNSVNTSU5HIFRISVMgJyArIGl0ZW0sICcgPC0tIFlPVSBBUkUgTUlTU0lORyBUSElTJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNpZmllZCkge1xuICAgICAgICAgICAgbGV0IGVycm9yID0gY2hlY2tlcihvYmpbcHJvcF0sIHByb3AsIG51bGwsIG9iaik7XG4gICAgICAgICAgICBpZiAoaXNFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgYWRkSGVscGVyKCdlcnJvcicsICdUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSwgJyA8LS0gVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFkZEhlbHBlcihwcm9wZXJ0eSwgb2JqZWN0TWVzc2FnZSwgc3RyaW5nTWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldFtwcm9wXSArPSBzdHJpbmdNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0W3Byb3BdLl9fYXBpQ2hlY2tEYXRhW3Byb3BlcnR5XSA9IG9iamVjdE1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7c3RyaWN0OiBmYWxzZSwgb3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnc2hhcGUnfTtcbiAgICAgIGxldCBzaGFwZUNoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgbGV0IGlzT2JqZWN0ID0gIW5vbk9iamVjdCAmJiBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hhcGVQcm9wRXJyb3I7XG4gICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24gPyBsb2NhdGlvbiArIChuYW1lID8gJy8nIDogJycpIDogJyc7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuICAgICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgYCR7bG9jYXRpb259JHtuYW1lfWAsIHZhbCk7XG4gICAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBzaGFwZVByb3BFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSwge3R5cGUsIHNob3J0VHlwZTogJ3NoYXBlJ30sIGRpc2FibGVkKTtcblxuICAgICAgZnVuY3Rpb24gc3RyaWN0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpO1xuICAgICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YS5zdHJpY3QgPSB0cnVlO1xuICAgICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2hhcGVFcnJvciA9IHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVFcnJvcikpIHtcbiAgICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNoYXBlKTtcbiAgICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgICAgYEl0IGlzIGxpbWl0ZWQgdG8gJHt0KGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJ2AsIGAnKSl9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIHt0eXBlOiBzdHJpY3RUeXBlLCBzaG9ydFR5cGU6ICdzdHJpY3Qgc2hhcGUnfSwgZGlzYWJsZWQpO1xuXG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyO1xuICAgIH1cblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgICB9XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmIG5vbmUgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGlmTm90Q2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgICBsZXQgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgICBpZiAocHJvcEV4aXN0cyA9PT0gb3RoZXJQcm9wc0V4aXN0KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sIHtub3RSZXF1aXJlZDogdHJ1ZSwgdHlwZSwgc2hvcnRUeXBlOiBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9LCBkaXNhYmxlZCk7XG4gICAgfTtcblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIub25seUlmID0gZnVuY3Rpb24gb25seUlmKG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgICBvdGhlclByb3BzID0gYXJyYXlpZnkob3RoZXJQcm9wcyk7XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgYWxzbyBzcGVjaWZpZWRgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICAgIGNvbnN0IG90aGVyc1ByZXNlbnQgPSBvdGhlclByb3BzLmV2ZXJ5KHByb3AgPT4gb2JqLmhhc093blByb3BlcnR5KHByb3ApKTtcbiAgICAgICAgaWYgKCFvdGhlcnNQcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwge3R5cGUsIHNob3J0VHlwZTogYG9ubHlJZlske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0sIGRpc2FibGVkKTtcbiAgICB9O1xuXG4gICAgc2hhcGVDaGVja0dldHRlci5yZXF1aXJlZElmTm90ID0gZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRSZXF1aXJlZElmTm90Q2hlY2tlcihmYWxzZSwgb3RoZXJQcm9wcywgcHJvcENoZWNrZXIpO1xuICAgIH07XG5cbiAgICBzaGFwZUNoZWNrR2V0dGVyLnJlcXVpcmVkSWZOb3QuYWxsID0gZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90QWxsKG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZXF1aXJlZElmTm90LmFsbCBtdXN0IGJlIHBhc3NlZCBhbiBhcnJheScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFJlcXVpcmVkSWZOb3RDaGVja2VyKHRydWUsIG90aGVyUHJvcHMsIHByb3BDaGVja2VyKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UmVxdWlyZWRJZk5vdENoZWNrZXIoYWxsLCBvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgY29uc3QgcHJvcHMgPSB0KG90aGVyUHJvcHMuam9pbignLCAnKSk7XG4gICAgICBjb25zdCBpZlByb3BzID0gYGlmICR7YWxsID8gJ2FsbCBvZicgOiAnYXQgbGVhc3Qgb25lIG9mJ31gO1xuICAgICAgY29uc3QgdHlwZSA9IGBzcGVjaWZpZWQgJHtpZlByb3BzfSB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogJHtwcm9wc30gKG90aGVyd2lzZSBpdCdzIG9wdGlvbmFsKWA7XG4gICAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgICAgY29uc3QgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgICBjb25zdCBpdGVyYXRpb24gPSBhbGwgPyAnZXZlcnknIDogJ3NvbWUnO1xuICAgICAgICBjb25zdCBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzW2l0ZXJhdGlvbl0oZnVuY3Rpb24gKG90aGVyUHJvcCkge1xuICAgICAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIW90aGVyUHJvcHNFeGlzdCAmJiAhcHJvcEV4aXN0cykge1xuICAgICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgICB9XG4gICAgICB9LCB7dHlwZSwgbm90UmVxdWlyZWQ6IHRydWV9LCBkaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tHZXR0ZXI7XG4gIH1cblxuICBmdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnZnVuY3Rpb24gYXJndW1lbnRzJztcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfSwge3R5cGU6ICdhbnknfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbnVsbENoZWNrR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbnVsbCc7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBudWxsQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5nZUNoZWNrR2V0dGVyKG1pbiwgbWF4KSB7XG4gICAgY29uc3QgdHlwZSA9IGBSYW5nZSAoJHttaW59IC0gJHttYXh9KWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiByYW5nZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICdudW1iZXInIHx8IHZhbCA8IG1pbiB8fCB2YWwgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5T2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdlbXB0eSBvYmplY3QnO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gZW1wdHlPYmplY3RDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcgfHwgdmFsID09PSBudWxsIHx8IE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeTtcblxuZnVuY3Rpb24gZ2V0U2VyaWFsaXplIChmbiwgZGVjeWNsZSkge1xuICB2YXIgc2VlbiA9IFtdLCBrZXlzID0gW107XG4gIGRlY3ljbGUgPSBkZWN5Y2xlIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gJ1tDaXJjdWxhciAnICsgZ2V0UGF0aCh2YWx1ZSwgc2Vlbiwga2V5cykgKyAnXSdcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAgIGlmIChzZWVuLmluZGV4T2YodmFsdWUpICE9PSAtMSlcbiAgICAgICAgcmV0ID0gZGVjeWNsZShrZXksIHZhbHVlKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZuKSByZXQgPSBmbihrZXksIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoICh2YWx1ZSwgc2Vlbiwga2V5cykge1xuICB2YXIgaW5kZXggPSBzZWVuLmluZGV4T2YodmFsdWUpO1xuICB2YXIgcGF0aCA9IFsga2V5c1tpbmRleF0gXTtcbiAgZm9yIChpbmRleC0tOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKHNlZW5baW5kZXhdWyBwYXRoWzBdIF0gPT09IHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHNlZW5baW5kZXhdO1xuICAgICAgcGF0aC51bnNoaWZ0KGtleXNbaW5kZXhdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICd+JyArIHBhdGguam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCBmbiwgc3BhY2VzLCBkZWN5Y2xlKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIGdldFNlcmlhbGl6ZShmbiwgZGVjeWNsZSksIHNwYWNlcyk7XG59XG5cbnN0cmluZ2lmeS5nZXRTZXJpYWxpemUgPSBnZXRTZXJpYWxpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGktY2hlY2suanMifQ==