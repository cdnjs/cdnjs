// apiCheck.js v7.2.1 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	    function type(options) {
	      return checkers.map(function (checker) {
	        return getCheckerDisplay(checker, options);
	      });
	    }
	    type.__apiCheckData = { optional: false, type: "oneOfType" };
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
	
	    function type(options) {
	      return getCheckerDisplay(checker, options);
	    }
	    type.__apiCheckData = { optional: false, type: "arrayOf" };
	
	    var shortCheckerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = "arrayOf[" + shortCheckerDisplay + "]";
	    return setupChecker(function arrayOfCheckerDefinition(val, name, location) {
	      if (isError(checkers.array(val)) || !val.every(function (item) {
	        return !isError(checker(item));
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }
	
	  function objectOfCheckGetter(checker) {
	
	    function type(options) {
	      return getCheckerDisplay(checker, options);
	    }
	    type.__apiCheckData = { optional: false, type: "objectOf" };
	
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
	    function type(options) {
	      return getCheckerDisplay(checker, options);
	    }
	
	    type.__apiCheckData = { optional: false, type: "typeOrArrayOf" };
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
	      var description = undefined;
	      if (otherProps.length === 1) {
	        description = "specified only if " + otherProps[0] + " is not specified";
	      } else {
	        description = "specified only if none of the following are specified: [" + list(otherProps, ", ", "and ") + "]";
	      }
	      var type = getTypeForShapeChild(propChecker, description);
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
	      var description = undefined;
	      if (otherProps.length === 1) {
	        description = "specified only if " + otherProps[0] + " is also specified";
	      } else {
	        description = "specified only if all of the following are specified: [" + list(otherProps, ", ", "and ") + "]";
	      }
	      var type = getTypeForShapeChild(propChecker, description);
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
	      var description = "specified " + ifProps + " these are not specified: " + props + " (otherwise it's optional)";
	      var type = getTypeForShapeChild(propChecker, description);
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
	
	    function getTypeForShapeChild(propChecker, description) {
	      function type(options) {
	        return getCheckerDisplay(propChecker);
	      }
	      type.__apiCheckData = { optional: false, type: "ifNot", description: description };
	      return type;
	    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYzk4MDM1OTVkNmM3ZjdmMzc1MyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmYzk4MDM1OTVkNmM3ZjdmMzc1M1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9hcGlDaGVjaycpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCBhcGlDaGVja1V0aWwgPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge2VhY2gsIGlzRXJyb3IsIHQsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgdHlwZU9mLCBnZXRFcnJvcn0gPSBhcGlDaGVja1V0aWw7XG5jb25zdCBjaGVja2VycyA9IHJlcXVpcmUoJy4vY2hlY2tlcnMnKTtcbmNvbnN0IGFwaUNoZWNrQXBpcyA9IGdldEFwaUNoZWNrQXBpcygpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFwaUNoZWNrSW5zdGFuY2U7XG5tb2R1bGUuZXhwb3J0cy51dGlscyA9IGFwaUNoZWNrVXRpbDtcbm1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZyA9IHtcbiAgdmVyYm9zZTogZmFsc2UsXG4gIGRpc2FibGVkOiBmYWxzZVxufTtcblxuY29uc3QgYXBpQ2hlY2tBcGlDaGVjayA9IGdldEFwaUNoZWNrSW5zdGFuY2Uoe1xuICBvdXRwdXQ6IHtwcmVmaXg6ICdhcGlDaGVjayd9XG59KTtcbm1vZHVsZS5leHBvcnRzLmludGVybmFsQ2hlY2tlciA9IGFwaUNoZWNrQXBpQ2hlY2s7XG5cblxuZWFjaChjaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gY2hlY2tlcik7XG5cbmZ1bmN0aW9uIGdldEFwaUNoZWNrSW5zdGFuY2UoY29uZmlnID0ge30sIGV4dHJhQ2hlY2tlcnMgPSB7fSkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gIGlmIChhcGlDaGVja0FwaUNoZWNrICYmIGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBhcGlDaGVja0FwaUNoZWNrLnRocm93KGFwaUNoZWNrQXBpcy5nZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsIGFyZ3VtZW50cywge1xuICAgICAgcHJlZml4OiAnY3JlYXRpbmcgYW4gYXBpQ2hlY2sgaW5zdGFuY2UnXG4gICAgfSk7XG4gIH1cblxuICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7XG4gICAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICAgIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcbiAgICBnZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFuZGxlRXJyb3JNZXNzYWdlLFxuICAgIGNvbmZpZzoge1xuICAgICAgb3V0cHV0OiBjb25maWcub3V0cHV0IHx8IHtcbiAgICAgICAgcHJlZml4OiAnJyxcbiAgICAgICAgc3VmZml4OiAnJyxcbiAgICAgICAgZG9jc0Jhc2VVcmw6ICcnXG4gICAgICB9LFxuICAgICAgdmVyYm9zZTogY29uZmlnLnZlcmJvc2UgfHwgZmFsc2UsXG4gICAgICBkaXNhYmxlZDogY29uZmlnLmRpc2FibGVkIHx8IGZhbHNlXG4gICAgfSxcbiAgICB1dGlsczogYXBpQ2hlY2tVdGlsXG4gIH07XG5cbiAgZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gd3JhcHBlcik7XG5cbiAgY29uc3QgZGlzYWJsZWQgPSBhcGlDaGVjay5kaXNhYmxlZCB8fCBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuZGlzYWJsZWQ7XG4gIGVhY2goY2hlY2tlcnMuZ2V0Q2hlY2tlcnMoZGlzYWJsZWQpLCAoY2hlY2tlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyKTtcbiAgZWFjaChleHRyYUNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyKTtcblxuICByZXR1cm4gYXBpQ2hlY2s7XG5cblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgaW5zdGFuY2UgZnVuY3Rpb24uIE90aGVyIHRoaW5ncyBhcmUgYXR0YWNoZWQgdG8gdGhpcyBzZWUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGFib3ZlLlxuICAgKiBAcGFyYW0gYXBpIHtBcnJheX1cbiAgICogQHBhcmFtIGFyZ3Mge2FyZ3VtZW50c31cbiAgICogQHBhcmFtIG91dHB1dCB7T2JqZWN0fVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIGlmIHRoaXMgaGFzIGEgZmFpbGVkID0gdHJ1ZSBwcm9wZXJ0eSwgdGhlbiBpdCBmYWlsZWRcbiAgICovXG4gIGZ1bmN0aW9uIGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6OCAqL1xuICAgIGlmIChhcGlDaGVjay5jb25maWcuZGlzYWJsZWQgfHwgbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhcGlUeXBlczoge30sIGFyZ1R5cGVzOiB7fSxcbiAgICAgICAgcGFzc2VkOiB0cnVlLCBtZXNzYWdlOiAnJyxcbiAgICAgICAgZmFpbGVkOiBmYWxzZVxuICAgICAgfTsgLy8gZW1wdHkgdmVyc2lvbiBvZiB3aGF0IGlzIG5vcm1hbGx5IHJldHVybmVkXG4gICAgfVxuICAgIGNoZWNrQXBpQ2hlY2tBcGkoYXJndW1lbnRzKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXBpKSkge1xuICAgICAgYXBpID0gW2FwaV07XG4gICAgICBhcmdzID0gW2FyZ3NdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0dXJuIGFyZ3VtZW50cyBpbnRvIGFuIGFycmF5XG4gICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgfVxuICAgIGxldCBtZXNzYWdlcyA9IGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpO1xuICAgIGlmICghbWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAvLyB0aGlzIGlzIHdoZXJlIHdlIGFjdHVhbGx5IGdvIHBlcmZvcm0gdGhlIGNoZWNrcy5cbiAgICAgIG1lc3NhZ2VzID0gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpO1xuICAgIH1cblxuICAgIGxldCByZXR1cm5PYmplY3QgPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gYXBpQ2hlY2suZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMsIG91dHB1dCk7XG4gICAgICByZXR1cm5PYmplY3QuZmFpbGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybk9iamVjdC5wYXNzZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSAnJztcbiAgICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybk9iamVjdC5wYXNzZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrQXBpQ2hlY2tBcGksIHNob3VsZCBiZSByZWFkIGxpa2U6IGNoZWNrIGFwaUNoZWNrIGFwaS4gQXMgaW4sIGNoZWNrIHRoZSBhcGkgZm9yIGFwaUNoZWNrIDotKVxuICAgKiBAcGFyYW0gY2hlY2tBcGlBcmdzXG4gICAqL1xuICBmdW5jdGlvbiBjaGVja0FwaUNoZWNrQXBpKGNoZWNrQXBpQXJncykge1xuICAgIGNvbnN0IGFwaSA9IGNoZWNrQXBpQXJnc1swXTtcbiAgICBjb25zdCBhcmdzID0gY2hlY2tBcGlBcmdzWzFdO1xuICAgIHZhciBpc0FycmF5T3JBcmdzID0gQXJyYXkuaXNBcnJheShhcmdzKSB8fCAoYXJncyAmJiB0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGFyZ3MubGVuZ3RoID09PSAnbnVtYmVyJyk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcGkpICYmICFpc0FycmF5T3JBcmdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGFwaSwgW2FyZ3NdLFxuICAgICAgICBbJ0lmIGFuIGFycmF5IGlzIHByb3ZpZGVkIGZvciB0aGUgYXBpLCBhbiBhcnJheSBtdXN0IGJlIHByb3ZpZGVkIGZvciB0aGUgYXJncyBhcyB3ZWxsLiddLFxuICAgICAgICB7cHJlZml4OiAnYXBpQ2hlY2snfVxuICAgICAgKSk7XG4gICAgfVxuICAgIC8vIGRvZyBmb29kaW5nIGhlcmVcbiAgICBjb25zdCBlcnJvcnMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaUNoZWNrQXBpcy5jaGVja0FwaUNoZWNrQXBpLCBjaGVja0FwaUFyZ3MpO1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYXBpQ2hlY2suZ2V0RXJyb3JNZXNzYWdlKGFwaUNoZWNrQXBpcy5jaGVja0FwaUNoZWNrQXBpLCBjaGVja0FwaUFyZ3MsIGVycm9ycywge1xuICAgICAgICBwcmVmaXg6ICdhcGlDaGVjaydcbiAgICAgIH0pO1xuICAgICAgYXBpQ2hlY2suaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHRydWUpO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ2V0QXBpQ2hlY2soc2hvdWxkVGhyb3cpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYXBpQ2hlY2tXcmFwcGVyKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gICAgICBsZXQgcmVzdWx0ID0gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpO1xuICAgICAgYXBpQ2hlY2suaGFuZGxlRXJyb3JNZXNzYWdlKHJlc3VsdC5tZXNzYWdlLCBzaG91bGRUaHJvdyk7XG4gICAgICByZXR1cm4gcmVzdWx0OyAvLyB3b250IGdldCBoZXJlIGlmIGFuIGVycm9yIGlzIHRocm93blxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgICBpZiAoc2hvdWxkVGhyb3cgJiYgbWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIG1lc3NhZ2VzID0gW10sIG91dHB1dCA9IHt9KSB7XG4gICAgbGV0IGdPdXQgPSBhcGlDaGVjay5jb25maWcub3V0cHV0IHx8IHt9O1xuICAgIGxldCBwcmVmaXggPSBnZXRQcmVmaXgoKTtcbiAgICBsZXQgc3VmZml4ID0gZ2V0U3VmZml4KCk7XG4gICAgbGV0IHVybCA9IGdldFVybCgpO1xuICAgIGxldCBtZXNzYWdlID0gYGFwaUNoZWNrIGZhaWxlZCEgJHttZXNzYWdlcy5qb2luKCcsICcpfWA7XG4gICAgdmFyIHBhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWQgPSAnXFxuXFxuJyArIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncyk7XG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHttZXNzYWdlfSAke3N1ZmZpeH0gJHt1cmwgfHwgJyd9JHtwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkfWAudHJpbSgpO1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xuICAgICAgbGV0IHByZWZpeCA9IG91dHB1dC5vbmx5UHJlZml4O1xuICAgICAgaWYgKCFwcmVmaXgpIHtcbiAgICAgICAgcHJlZml4ID0gYCR7Z091dC5wcmVmaXggfHwgJyd9ICR7b3V0cHV0LnByZWZpeCB8fCAnJ31gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3VmZml4KCkge1xuICAgICAgbGV0IHN1ZmZpeCA9IG91dHB1dC5vbmx5U3VmZml4O1xuICAgICAgaWYgKCFzdWZmaXgpIHtcbiAgICAgICAgc3VmZml4ID0gYCR7b3V0cHV0LnN1ZmZpeCB8fCAnJ30gJHtnT3V0LnN1ZmZpeCB8fCAnJ31gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWZmaXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXJsKCkge1xuICAgICAgbGV0IHVybCA9IG91dHB1dC51cmw7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSBnT3V0LmRvY3NCYXNlVXJsICYmIG91dHB1dC51cmxTdWZmaXggJiYgYCR7Z091dC5kb2NzQmFzZVVybH0ke291dHB1dC51cmxTdWZmaXh9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncykge1xuICAgIGxldCB7YXBpVHlwZXMsIGFyZ1R5cGVzfSA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gICAgbGV0IGNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzIHx8IFtdKTtcbiAgICBsZXQgcmVwbGFjZWRJdGVtcyA9IFtdO1xuICAgIHJlcGxhY2VGdW5jdGlvbldpdGhOYW1lKGNvcHkpO1xuICAgIGNvbnN0IHBhc3NlZEFyZ3MgPSBnZXRPYmplY3RTdHJpbmcoY29weSk7XG4gICAgYXJnVHlwZXMgPSBnZXRPYmplY3RTdHJpbmcoYXJnVHlwZXMpO1xuICAgIGFwaVR5cGVzID0gZ2V0T2JqZWN0U3RyaW5nKGFwaVR5cGVzKTtcblxuICAgIHJldHVybiBnZW5lcmF0ZU1lc3NhZ2UoKTtcblxuXG4gICAgLy8gZnVuY3Rpb25zXG5cbiAgICBmdW5jdGlvbiByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShvYmopIHtcbiAgICAgIGVhY2gob2JqLCAodmFsLCBuYW1lKSA9PiB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgaWYgKHJlcGxhY2VkSXRlbXMuaW5kZXhPZih2YWwpID09PSAtMSkgeyAvLyBhdm9pZCByZWN1cnNpdmUgcHJvYmxlbXNcbiAgICAgICAgICByZXBsYWNlZEl0ZW1zLnB1c2godmFsKTtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJlcGxhY2VGdW5jdGlvbldpdGhOYW1lKG9iaik7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSB2YWwuZGlzcGxheU5hbWUgfHwgdmFsLm5hbWUgfHwgJ2Fub255bW91cyBmdW5jdGlvbic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPYmplY3RTdHJpbmcodHlwZXMpIHtcbiAgICAgIGlmICghdHlwZXMgfHwgIXR5cGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJ25vdGhpbmcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlcyAmJiB0eXBlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdHlwZXMgPSB0eXBlc1swXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpbmdpZnkodHlwZXMsIG51bGwsIDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWVzc2FnZSgpIHtcbiAgICAgIGNvbnN0IG4gPSAnXFxuJztcbiAgICAgIGxldCB1c2VTID0gdHJ1ZTtcbiAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB1c2VTID0gISFPYmplY3Qua2V5cyhhcmdzWzBdKS5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXNlUyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB0eXBlcyA9IGB0eXBlJHt1c2VTID8gJ3MnIDogJyd9YDtcbiAgICAgIGNvbnN0IG5ld0xpbmUgPSBuICsgbjtcbiAgICAgIHJldHVybiBgWW91IHBhc3NlZDoke259JHtwYXNzZWRBcmdzfSR7bmV3TGluZX1gICtcbiAgICAgICAgYFdpdGggdGhlICR7dHlwZXN9OiR7bn0ke2FyZ1R5cGVzfSR7bmV3TGluZX1gICtcbiAgICAgICAgYFRoZSBBUEkgY2FsbHMgZm9yOiR7bn0ke2FwaVR5cGVzfWA7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZXMoYXBpLCBhcmdzKSB7XG4gICAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgICBhcmdzID0gYXJyYXlpZnkoYXJncyk7XG4gICAgbGV0IGFwaVR5cGVzID0gYXBpLm1hcCgoY2hlY2tlciwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHNwZWNpZmllZCA9IG1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5oYXNPd25Qcm9wZXJ0eSgndmVyYm9zZScpO1xuICAgICAgcmV0dXJuIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtcbiAgICAgICAgdGVyc2U6IHNwZWNpZmllZCA/ICFtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcudmVyYm9zZSA6ICFhcGlDaGVjay5jb25maWcudmVyYm9zZSxcbiAgICAgICAgb2JqOiBhcmdzW2luZGV4XSxcbiAgICAgICAgYWRkSGVscGVyczogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgbGV0IGFyZ1R5cGVzID0gYXJncy5tYXAoKGFyZykgPT4gZ2V0QXJnRGlzcGxheShhcmcsIFtdKSk7XG4gICAgcmV0dXJuIHthcmdUeXBlczogYXJnVHlwZXMsIGFwaVR5cGVzfTtcbiAgfVxuXG59XG5cblxuLy8gU1RBVEVMRVNTIEZVTkNUSU9OU1xuXG4vKipcbiAqIFRoaXMgaXMgd2hlcmUgdGhlIG1hZ2ljIGhhcHBlbnMgZm9yIGFjdHVhbGx5IGNoZWNraW5nIHRoZSBhcmd1bWVudHMgd2l0aCB0aGUgYXBpLlxuICogQHBhcmFtIGFwaSB7QXJyYXl9IC0gY2hlY2tlcnNcbiAqIEBwYXJhbSBhcmdzIHtBcnJheX0gLSBhbmQgYXJndW1lbnRzIG9iamVjdFxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBtZXNzYWdlcyA9IFtdO1xuICBsZXQgZmFpbGVkID0gZmFsc2U7XG4gIGxldCBjaGVja2VySW5kZXggPSAwO1xuICBsZXQgYXJnSW5kZXggPSAwO1xuICBsZXQgYXJnLCBjaGVja2VyLCByZXMsIGxhc3RDaGVja2VyLCBhcmdOYW1lLCBhcmdGYWlsZWQsIHNraXBQcmV2aW91c0NoZWNrZXI7XG4gIC8qIGpzaGludCAtVzA4NCAqL1xuICB3aGlsZSAoKGNoZWNrZXIgPSBhcGlbY2hlY2tlckluZGV4KytdKSAmJiAoYXJnSW5kZXggPCBhcmdzLmxlbmd0aCkpIHtcbiAgICBhcmcgPSBhcmdzW2FyZ0luZGV4KytdO1xuICAgIGFyZ05hbWUgPSAnQXJndW1lbnQgJyArIGFyZ0luZGV4ICsgKGNoZWNrZXIuaXNPcHRpb25hbCA/ICcgKG9wdGlvbmFsKScgOiAnJyk7XG4gICAgcmVzID0gY2hlY2tlcihhcmcsICd2YWx1ZScsIGFyZ05hbWUpO1xuICAgIGFyZ0ZhaWxlZCA9IGlzRXJyb3IocmVzKTtcbiAgICBsYXN0Q2hlY2tlciA9IGNoZWNrZXJJbmRleCA+PSBhcGkubGVuZ3RoO1xuICAgIHNraXBQcmV2aW91c0NoZWNrZXIgPSBjaGVja2VySW5kZXggPiAxICYmIGFwaVtjaGVja2VySW5kZXggLSAxXS5pc09wdGlvbmFsO1xuICAgIGlmICgoYXJnRmFpbGVkICYmIGxhc3RDaGVja2VyKSB8fCAoYXJnRmFpbGVkICYmICFsYXN0Q2hlY2tlciAmJiAhY2hlY2tlci5pc09wdGlvbmFsICYmICFza2lwUHJldmlvdXNDaGVja2VyKSkge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VzLnB1c2goZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIGFyZykpO1xuICAgIH0gZWxzZSBpZiAoYXJnRmFpbGVkICYmIGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgYXJnSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMucHVzaChgJHt0KGFyZ05hbWUpfSBwYXNzZWRgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhaWxlZCA/IG1lc3NhZ2VzIDogW107XG59XG5cblxuY2hlY2tlclR5cGVUeXBlLnR5cGUgPSAnZnVuY3Rpb24gd2l0aCBfX2FwaUNoZWNrRGF0YSBwcm9wZXJ0eSBhbmQgYCR7ZnVuY3Rpb24udHlwZX1gIHByb3BlcnR5JztcbmZ1bmN0aW9uIGNoZWNrZXJUeXBlVHlwZShjaGVja2VyVHlwZSwgbmFtZSwgbG9jYXRpb24pIHtcbiAgY29uc3QgYXBpQ2hlY2tEYXRhQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHtcbiAgICB0eXBlOiBjaGVja2Vycy5zdHJpbmcsXG4gICAgb3B0aW9uYWw6IGNoZWNrZXJzLmJvb2xcbiAgfSk7XG4gIGNvbnN0IGFzRnVuYyA9IGNoZWNrZXJzLmZ1bmMud2l0aFByb3BlcnRpZXMoe19fYXBpQ2hlY2tEYXRhOiBhcGlDaGVja0RhdGFDaGVja2VyfSk7XG4gIGNvbnN0IGFzU2hhcGUgPSBjaGVja2Vycy5zaGFwZSh7X19hcGlDaGVja0RhdGE6IGFwaUNoZWNrRGF0YUNoZWNrZXJ9KTtcbiAgY29uc3Qgd3JvbmdTaGFwZSA9IGNoZWNrZXJzLm9uZU9mVHlwZShbXG4gICAgYXNGdW5jLCBhc1NoYXBlXG4gIF0pKGNoZWNrZXJUeXBlLCBuYW1lLCBsb2NhdGlvbik7XG4gIGlmIChpc0Vycm9yKHdyb25nU2hhcGUpKSB7XG4gICAgcmV0dXJuIHdyb25nU2hhcGU7XG4gIH1cbiAgaWYgKHR5cGVvZiBjaGVja2VyVHlwZSAhPT0gJ2Z1bmN0aW9uJyAmJiAhY2hlY2tlclR5cGUuaGFzT3duUHJvcGVydHkoY2hlY2tlclR5cGUuX19hcGlDaGVja0RhdGEudHlwZSkpIHtcbiAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIGNoZWNrZXJUeXBlVHlwZS50eXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRXJyb3JNZXNzYWdlKHJlcywgY2hlY2tlciwgdmFsKSB7XG4gIGxldCBjaGVja2VySGVscCA9IGdldENoZWNrZXJIZWxwKGNoZWNrZXIsIHZhbCk7XG4gIGNoZWNrZXJIZWxwID0gY2hlY2tlckhlbHAgPyAnIC0gJyArIGNoZWNrZXJIZWxwIDogJyc7XG4gIHJldHVybiByZXMubWVzc2FnZSArIGNoZWNrZXJIZWxwO1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VySGVscCh7aGVscH0sIHZhbCkge1xuICBpZiAoIWhlbHApIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKHR5cGVvZiBoZWxwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaGVscCA9IGhlbHAodmFsKTtcbiAgfVxuICByZXR1cm4gaGVscDtcbn1cblxuXG5mdW5jdGlvbiBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKSB7XG4gIGxldCByZXF1aXJlZEFyZ3MgPSBhcGkuZmlsdGVyKGEgPT4gIWEuaXNPcHRpb25hbCk7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkQXJncy5sZW5ndGgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ05vdCBlbm91Z2ggYXJndW1lbnRzIHNwZWNpZmllZC4gUmVxdWlyZXMgYCcgKyByZXF1aXJlZEFyZ3MubGVuZ3RoICsgJ2AsIHlvdSBwYXNzZWQgYCcgKyBhcmdzLmxlbmd0aCArICdgJ1xuICAgIF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFyZ0Rpc3BsYXkoYXJnLCBnb3R0ZW5BcmdzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgY29uc3QgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICBjb25zdCB0eXBlID0gdHlwZU9mKGFyZyk7XG4gIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGhhc0tleXMoKSkge1xuICAgICAgbGV0IHByb3BlcnRpZXMgPSBzdHJpbmdpZnkoZ2V0RGlzcGxheUlmTm90R290dGVuKCkpO1xuICAgICAgcmV0dXJuIGNOYW1lICsgJyAod2l0aCBwcm9wZXJ0aWVzOiAnICsgcHJvcGVydGllcyArICcpJztcbiAgICB9XG4gICAgcmV0dXJuIGNOYW1lO1xuICB9XG5cbiAgaWYgKGFyZyA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH1cblxuICBpZiAodHlwZSAhPT0gJ2FycmF5JyAmJiB0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgaWYgKGhhc0tleXMoKSkge1xuICAgIHJldHVybiBnZXREaXNwbGF5SWZOb3RHb3R0ZW4oKTtcbiAgfVxuXG4gIHJldHVybiBjTmFtZTtcblxuICAvLyB1dGlsaXR5IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBoYXNLZXlzKCkge1xuICAgIHJldHVybiBhcmcgJiYgT2JqZWN0LmtleXMoYXJnKS5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaXNwbGF5SWZOb3RHb3R0ZW4oKSB7XG4gICAgaWYgKGdvdHRlbkFyZ3MuaW5kZXhPZihhcmcpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICB9XG4gICAgZ290dGVuQXJncy5wdXNoKGFyZyk7XG4gICAgcmV0dXJuIGdldERpc3BsYXkoYXJnLCBnb3R0ZW5BcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5KG9iaiwgZ290dGVuQXJncykge1xuICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuICBlYWNoKG9iaiwgKHYsIGspID0+IGFyZ0Rpc3BsYXlba10gPSBnZXRBcmdEaXNwbGF5KHYsIGdvdHRlbkFyZ3MpKTtcbiAgcmV0dXJuIGFyZ0Rpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIGdldEFwaUNoZWNrQXBpcygpIHtcbiAgY29uc3Qgb3MgPSBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWw7XG5cbiAgY29uc3QgY2hlY2tlckZuQ2hlY2tlciA9IGNoZWNrZXJzLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICAgIHR5cGU6IGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlcnMuc3RyaW5nLCBjaGVja2VyVHlwZVR5cGVdKS5vcHRpb25hbCxcbiAgICBkaXNwbGF5TmFtZTogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgIHNob3J0VHlwZTogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgIG5vdE9wdGlvbmFsOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsLFxuICAgIG5vdFJlcXVpcmVkOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsXG4gIH0pO1xuXG4gIGNvbnN0IGdldEFwaUNoZWNrSW5zdGFuY2VDaGVja2VycyA9IFtcbiAgICBjaGVja2Vycy5zaGFwZSh7XG4gICAgICBvdXRwdXQ6IGNoZWNrZXJzLnNoYXBlKHtcbiAgICAgICAgcHJlZml4OiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgIHN1ZmZpeDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICBkb2NzQmFzZVVybDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsXG4gICAgICB9KS5zdHJpY3Qub3B0aW9uYWwsXG4gICAgICB2ZXJib3NlOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsLFxuICAgICAgZGlzYWJsZWQ6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWxcbiAgICB9KS5zdHJpY3Qub3B0aW9uYWwsXG4gICAgY2hlY2tlcnMub2JqZWN0T2YoY2hlY2tlckZuQ2hlY2tlcikub3B0aW9uYWxcbiAgXTtcblxuICBjb25zdCBjaGVja0FwaUNoZWNrQXBpID0gW1xuICAgIGNoZWNrZXJzLnR5cGVPckFycmF5T2YoY2hlY2tlckZuQ2hlY2tlciksXG4gICAgY2hlY2tlcnMuYW55Lm9wdGlvbmFsLFxuICAgIGNoZWNrZXJzLnNoYXBlKHtcbiAgICAgIHByZWZpeDogb3MsIHN1ZmZpeDogb3MsIHVybFN1ZmZpeDogb3MsIC8vIGFwcGVuZGVkIGNhc2VcbiAgICAgIG9ubHlQcmVmaXg6IG9zLCBvbmx5U3VmZml4OiBvcywgdXJsOiBvcyAvLyBvdmVycmlkZSBjYXNlXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsXG4gIF07XG5cbiAgcmV0dXJuIHtcbiAgICBjaGVja2VyRm5DaGVja2VyLFxuICAgIGdldEFwaUNoZWNrSW5zdGFuY2VDaGVja2VycyxcbiAgICBjaGVja0FwaUNoZWNrQXBpXG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVjay5qc1xuICoqLyIsImNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcbmNvbnN0IGNoZWNrZXJIZWxwZXJzID0ge1xuICBhZGRPcHRpb25hbCwgZ2V0UmVxdWlyZWRWZXJzaW9uLCBzZXR1cENoZWNrZXIsIGFkZE51bGxhYmxlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksXG4gIGlzRXJyb3IsIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCB1bmRlZiwgY2hlY2tlckhlbHBlcnMsXG4gIG5vb3Bcbn07XG5cbmZ1bmN0aW9uIGNvcHkob2JqKSB7XG4gIGxldCB0eXBlID0gdHlwZU9mKG9iaik7XG4gIGxldCBkYUNvcHk7XG4gIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgZGFDb3B5ID0gW107XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBkYUNvcHkgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGVhY2gob2JqLCAodmFsLCBrZXkpID0+IHtcbiAgICBkYUNvcHlba2V5XSA9IHZhbDsgLy8gY2Fubm90IHNpbmdsZS1saW5lIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFib3J0IHRoZSBlYWNoXG4gIH0pO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCBvcHRpb25zKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IGRpc3BsYXk7XG4gIGxldCBzaG9ydCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zaG9ydDtcbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgZGlzcGxheSA9IGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0JyB8fCBjaGVja2VyLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lO1xuICB9XG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyVHlwZSh7dHlwZX0sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IF9fYXBpQ2hlY2tEYXRhID0gdHlwZS5fX2FwaUNoZWNrRGF0YTtcbiAgICBsZXQgdHlwZVR5cGVzID0gdHlwZShvcHRpb25zKTtcbiAgICB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGEsXG4gICAgICBbX19hcGlDaGVja0RhdGEudHlwZV06IHR5cGVUeXBlc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogc3RyaW5naWZ5KGNoZWNrZXJUeXBlKTtcbiAgcmV0dXJuIG5ldyBFcnJvcihgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gbXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG59XG5cbmZ1bmN0aW9uIG5BdEwobmFtZSwgbG9jYXRpb24pIHtcbiAgY29uc3QgdE5hbWUgPSB0KG5hbWUgfHwgJ3ZhbHVlJyk7XG4gIGxldCB0TG9jYXRpb24gPSAhbG9jYXRpb24gPyAnJyA6ICcgYXQgJyArIHQobG9jYXRpb24pO1xuICByZXR1cm4gYCR7dE5hbWV9JHt0TG9jYXRpb259YDtcbn1cblxuZnVuY3Rpb24gdCh0aGluZykge1xuICByZXR1cm4gJ2AnICsgdGhpbmcgKyAnYCc7XG59XG5cbmZ1bmN0aW9uIHVuZGVmKHRoaW5nKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cbi8qKlxuICogVGhpcyB3aWxsIHNldCB1cCB0aGUgY2hlY2tlciB3aXRoIGFsbCBvZiB0aGUgZGVmYXVsdHMgdGhhdCBtb3N0IGNoZWNrZXJzIHdhbnQgbGlrZSByZXF1aXJlZCBieSBkZWZhdWx0IGFuZCBhblxuICogb3B0aW9uYWwgdmVyc2lvblxuICogQHBhcmFtIGNoZWNrZXJcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIHByb3BlcnRpZXMgdG8gYWRkIHRvIHRoZSBjaGVja2VyXG4gKiBAcGFyYW0gZGlzYWJsZWQgLSB3aGVuIHNldCB0byB0cnVlLCB0aGlzIHdpbGwgc2V0IHRoZSBjaGVja2VyIHRvIGEgbm8tb3AgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gc2V0dXBDaGVja2VyKGNoZWNrZXIsIHByb3BlcnRpZXMsIGRpc2FibGVkKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjkgKi9cbiAgaWYgKGRpc2FibGVkKSB7IC8vIHN3YXAgb3V0IHRoZSBjaGVja2VyIGZvciBpdHMgb3duIGNvcHkgb2Ygbm9vcFxuICAgIGNoZWNrZXIgPSBnZXROb29wKCk7XG4gICAgY2hlY2tlci5pc05vb3AgPSB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjaGVja2VyLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgY2hlY2tlci5zaG9ydFR5cGUgPSBjaGVja2VyLnR5cGU7XG4gIH1cblxuICAvLyBhc3NpZ24gYWxsIHByb3BlcnRpZXMgZ2l2ZW5cbiAgZWFjaChwcm9wZXJ0aWVzLCAocHJvcCwgbmFtZSkgPT4gY2hlY2tlcltuYW1lXSA9IHByb3ApO1xuXG4gIGlmICghY2hlY2tlci5kaXNwbGF5TmFtZSkge1xuICAgIGNoZWNrZXIuZGlzcGxheU5hbWUgPSBgYXBpQ2hlY2sgJHt0KGNoZWNrZXIuc2hvcnRUeXBlIHx8IGNoZWNrZXIudHlwZSB8fCBjaGVja2VyLm5hbWUpfSB0eXBlIGNoZWNrZXJgO1xuICB9XG5cblxuICBpZiAoIWNoZWNrZXIubm90UmVxdWlyZWQpIHtcbiAgICBjaGVja2VyID0gZ2V0UmVxdWlyZWRWZXJzaW9uKGNoZWNrZXIsIGRpc2FibGVkKTtcbiAgfVxuXG4gIGlmICghY2hlY2tlci5ub3ROdWxsYWJsZSkge1xuICAgIGFkZE51bGxhYmxlKGNoZWNrZXIsIGRpc2FibGVkKTtcbiAgfVxuXG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIGFkZE9wdGlvbmFsKGNoZWNrZXIsIGRpc2FibGVkKTtcbiAgfVxuXG4gIHJldHVybiBjaGVja2VyO1xufVxuXG5mdW5jdGlvbiBnZXRSZXF1aXJlZFZlcnNpb24oY2hlY2tlciwgZGlzYWJsZWQpIHtcbiAgdmFyIHJlcXVpcmVkQ2hlY2tlciA9IGRpc2FibGVkID8gZ2V0Tm9vcCgpIDogZnVuY3Rpb24gcmVxdWlyZWRDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICh1bmRlZih2YWwpICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGxldCB0TG9jYXRpb24gPSBsb2NhdGlvbiA/IGAgaW4gJHt0KGxvY2F0aW9uKX1gIDogJyc7XG4gICAgICBjb25zdCB0eXBlID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIHR5cGUgIT09ICdvYmplY3QnID8gdHlwZSA6IHN0cmluZ2lmeSh0eXBlKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoYFJlcXVpcmVkICR7dChuYW1lKX0gbm90IHNwZWNpZmllZCR7dExvY2F0aW9ufS4gTXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9O1xuICBjb3B5UHJvcHMoY2hlY2tlciwgcmVxdWlyZWRDaGVja2VyKTtcbiAgcmVxdWlyZWRDaGVja2VyLm9yaWdpbmFsQ2hlY2tlciA9IGNoZWNrZXI7XG4gIHJldHVybiByZXF1aXJlZENoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGFkZE9wdGlvbmFsKGNoZWNrZXIsIGRpc2FibGVkKSB7XG4gIHZhciBvcHRpb25hbENoZWNrID0gZGlzYWJsZWQgPyBnZXROb29wKCkgOiBmdW5jdGlvbiBvcHRpb25hbENoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICghdW5kZWYodmFsKSkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH07XG4gIC8vIGluaGVyaXQgYWxsIHByb3BlcnRpZXMgb24gdGhlIG9yaWdpbmFsIGNoZWNrZXJcbiAgY29weVByb3BzKGNoZWNrZXIsIG9wdGlvbmFsQ2hlY2spO1xuXG4gIG9wdGlvbmFsQ2hlY2suaXNPcHRpb25hbCA9IHRydWU7XG4gIG9wdGlvbmFsQ2hlY2suZGlzcGxheU5hbWUgPSBjaGVja2VyLmRpc3BsYXlOYW1lICsgJyAob3B0aW9uYWwpJztcbiAgb3B0aW9uYWxDaGVjay5vcmlnaW5hbENoZWNrZXIgPSBjaGVja2VyO1xuXG5cbiAgLy8gdGhlIG1hZ2ljIGxpbmUgdGhhdCBhbGxvd3MgeW91IHRvIGFkZCAub3B0aW9uYWwgdG8gdGhlIGVuZCBvZiB0aGUgY2hlY2tlcnNcbiAgY2hlY2tlci5vcHRpb25hbCA9IG9wdGlvbmFsQ2hlY2s7XG5cbiAgZml4VHlwZShjaGVja2VyLCBjaGVja2VyLm9wdGlvbmFsKTtcbn1cblxuZnVuY3Rpb24gYWRkTnVsbGFibGUoY2hlY2tlciwgZGlzYWJsZWQpIHtcbiAgdmFyIG51bGxhYmxlQ2hlY2sgPSBkaXNhYmxlZCA/IGdldE5vb3AoKSA6IGZ1bmN0aW9uIG51bGxhYmxlQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH07XG4gIC8vIGluaGVyaXQgYWxsIHByb3BlcnRpZXMgb24gdGhlIG9yaWdpbmFsIGNoZWNrZXJcbiAgY29weVByb3BzKGNoZWNrZXIsIG51bGxhYmxlQ2hlY2spO1xuXG4gIG51bGxhYmxlQ2hlY2suaXNOdWxsYWJsZSA9IHRydWU7XG4gIG51bGxhYmxlQ2hlY2suZGlzcGxheU5hbWUgPSBjaGVja2VyLmRpc3BsYXlOYW1lICsgJyAobnVsbGFibGUpJztcbiAgbnVsbGFibGVDaGVjay5vcmlnaW5hbENoZWNrZXIgPSBjaGVja2VyO1xuXG4gIC8vIHRoZSBtYWdpYyBsaW5lIHRoYXQgYWxsb3dzIHlvdSB0byBhZGQgLm51bGxhYmxlIHRvIHRoZSBlbmQgb2YgdGhlIGNoZWNrZXJzXG4gIGNoZWNrZXIubnVsbGFibGUgPSBudWxsYWJsZUNoZWNrO1xuXG4gIGZpeFR5cGUoY2hlY2tlciwgY2hlY2tlci5udWxsYWJsZSk7XG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIGFkZE9wdGlvbmFsKGNoZWNrZXIubnVsbGFibGUsIGRpc2FibGVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaXhUeXBlKGNoZWNrZXIsIGNoZWNrZXJDb3B5KSB7XG4gIC8vIGZpeCB0eXBlLCBiZWNhdXNlIGl0J3Mgbm90IGEgc3RyYWlnaHQgY29weS4uLlxuICAvLyB0aGUgcmVhc29uIGlzIHdlIG5lZWQgdG8gc3BlY2lmeSB0eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsIGFzIHRydWUgZm9yIHRoZSB0ZXJzZS92ZXJib3NlIG9wdGlvbi5cbiAgLy8gd2UgYWxzbyB3YW50IHRvIGFkZCBcIihvcHRpb25hbClcIiB0byB0aGUgdHlwZXMgd2l0aCBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGNoZWNrZXJDb3B5LnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY2hlY2tlckNvcHkudHlwZSA9IGNvcHkoY2hlY2tlckNvcHkudHlwZSk7IC8vIG1ha2Ugb3VyIG93biBjb3B5IG9mIHRoaXNcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2hlY2tlckNvcHkudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoZWNrZXJDb3B5LnR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGVja2VyLnR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNoZWNrZXJDb3B5LnR5cGUgKz0gJyAob3B0aW9uYWwpJztcbiAgICByZXR1cm47XG4gIH1cbiAgY2hlY2tlckNvcHkudHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB8fCB7fTsgLy8gYW5kIHRoaXNcbiAgY2hlY2tlckNvcHkudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG59XG5cblxuLy8gVVRJTFNcblxuZnVuY3Rpb24gY29weVByb3BzKHNyYywgZGVzdCkge1xuICBlYWNoKE9iamVjdC5rZXlzKHNyYyksIGtleSA9PiBkZXN0W2tleV0gPSBzcmNba2V5XSk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG59XG5cbmZ1bmN0aW9uIGdldE5vb3AoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiBmdW5jdGlvbiBub29wKCkge1xuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2tVdGlsLmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3Qge1xuICB0eXBlT2YsIGVhY2gsIGNvcHksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLFxuICBhcnJheWlmeSwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIGNoZWNrZXJIZWxwZXJzLFxuICB1bmRlZlxuICB9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtzZXR1cENoZWNrZXJ9ID0gY2hlY2tlckhlbHBlcnM7XG5cbmxldCBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0gZ2V0Q2hlY2tlcnMoKTtcbm1vZHVsZS5leHBvcnRzLmdldENoZWNrZXJzID0gZ2V0Q2hlY2tlcnM7XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJzKGRpc2FibGVkKSB7XG4gIHJldHVybiB7XG4gICAgYXJyYXk6IHR5cGVPZkNoZWNrR2V0dGVyKCdBcnJheScpLFxuICAgIGJvb2w6IHR5cGVPZkNoZWNrR2V0dGVyKCdCb29sZWFuJyksXG4gICAgbnVtYmVyOiB0eXBlT2ZDaGVja0dldHRlcignTnVtYmVyJyksXG4gICAgc3RyaW5nOiB0eXBlT2ZDaGVja0dldHRlcignU3RyaW5nJyksXG4gICAgZnVuYzogZnVuY0NoZWNrR2V0dGVyKCksXG4gICAgb2JqZWN0OiBvYmplY3RDaGVja0dldHRlcigpLFxuXG4gICAgZW1wdHlPYmplY3Q6IGVtcHR5T2JqZWN0Q2hlY2tHZXR0ZXIoKSxcblxuICAgIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gICAgb25lT2Y6IG9uZU9mQ2hlY2tHZXR0ZXIsXG4gICAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICAgIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgICBvYmplY3RPZjogb2JqZWN0T2ZDaGVja0dldHRlcixcbiAgICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgICByYW5nZTogcmFuZ2VDaGVja0dldHRlcixcblxuICAgIHNoYXBlOiBnZXRTaGFwZUNoZWNrR2V0dGVyKCksXG4gICAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gICAgYW55OiBhbnlDaGVja0dldHRlcigpLFxuICAgIG51bGw6IG51bGxDaGVja0dldHRlcigpXG5cbiAgfTtcblxuICBmdW5jdGlvbiB0eXBlT2ZDaGVja0dldHRlcih0eXBlKSB7XG4gICAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiB0eXBlT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodHlwZU9mKHZhbCkgIT09IGxUeXBlKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBmdW5jQ2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdGdW5jdGlvbic7XG4gICAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlfSwgZGlzYWJsZWQpO1xuXG4gICAgZnVuY3Rpb25DaGVja2VyLndpdGhQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZ2V0V2l0aFByb3BlcnRpZXNDaGVja2VyKHByb3BlcnRpZXMpIHtcbiAgICAgIGNvbnN0IGFwaUVycm9yID0gY2hlY2tlcnMub2JqZWN0T2YoY2hlY2tlcnMuZnVuYykocHJvcGVydGllcywgJ3Byb3BlcnRpZXMnLCAnYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcycpO1xuICAgICAgaWYgKGlzRXJyb3IoYXBpRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGFwaUVycm9yO1xuICAgICAgfVxuICAgICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHByb3BlcnRpZXMsIHRydWUpO1xuICAgICAgc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZSA9ICdmdW5jLndpdGhQcm9wZXJ0aWVzJztcblxuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbldpdGhQcm9wZXJ0aWVzQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5vdEZ1bmN0aW9uID0gY2hlY2tlcnMuZnVuYyh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgaWYgKGlzRXJyb3Iobm90RnVuY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIG5vdEZ1bmN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICB9LCB7dHlwZTogc2hhcGVDaGVja2VyLnR5cGUsIHNob3J0VHlwZTogJ2Z1bmMud2l0aFByb3BlcnRpZXMnfSwgZGlzYWJsZWQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdENoZWNrR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnT2JqZWN0JztcbiAgICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgICBsZXQgb2JqZWN0TnVsbE9rQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvYmplY3ROdWxsT2tDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlOiBudWxsVHlwZX0sIGRpc2FibGVkKTtcblxuICAgIGxldCBvYmplY3RDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgaXNFcnJvcihvYmplY3ROdWxsT2tDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIG9iamVjdENoZWNrZXIudHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIG51bGxPazogb2JqZWN0TnVsbE9rQ2hlY2tlcn0sIGRpc2FibGVkKTtcblxuICAgIHJldHVybiBvYmplY3RDaGVja2VyO1xuICB9XG5cblxuICBmdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBjbGFzc1RvQ2hlY2spKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2xhc3NUb0NoZWNrLm5hbWUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlOiBjbGFzc1RvQ2hlY2submFtZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZU9mQ2hlY2tHZXR0ZXIoZW51bXMpIHtcbiAgICBjb25zdCB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgICBlbnVtOiBlbnVtc1xuICAgIH07XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYG9uZU9mWyR7ZW51bXMubWFwKGVubSA9PiBzdHJpbmdpZnkoZW5tKSkuam9pbignLCAnKX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9uZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucykge1xuICAgICAgcmV0dXJuIGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgb3B0aW9ucykpO1xuICAgIH1cbiAgICB0eXBlLl9fYXBpQ2hlY2tEYXRhID0ge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29uZU9mVHlwZSd9O1xuICAgIGNvbnN0IGNoZWNrZXJzRGlzcGxheSA9IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSkpO1xuICAgIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlR5cGVbJHtjaGVja2Vyc0Rpc3BsYXkuam9pbignLCAnKX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICghY2hlY2tlcnMuc29tZShjaGVja2VyID0+ICFpc0Vycm9yKGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG5cbiAgICBmdW5jdGlvbiB0eXBlKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCBvcHRpb25zKTtcbiAgICB9XG4gICAgdHlwZS5fX2FwaUNoZWNrRGF0YSA9IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdhcnJheU9mJ307XG5cbiAgICBjb25zdCBzaG9ydENoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYGFycmF5T2ZbJHtzaG9ydENoZWNrZXJEaXNwbGF5fV1gO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLmFycmF5KHZhbCkpIHx8ICF2YWwuZXZlcnkoKGl0ZW0pID0+ICFpc0Vycm9yKGNoZWNrZXIoaXRlbSkpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuXG4gICAgZnVuY3Rpb24gdHlwZShvcHRpb25zKSB7XG4gICAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfTtcblxuICAgIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvYmplY3RPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdE9iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKG5vdE9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIG5vdE9iamVjdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgIGlmIChpc0Vycm9yKGNoZWNrZXIoaXRlbSwga2V5LCBuYW1lKSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucykge1xuICAgICAgcmV0dXJuIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAndHlwZU9yQXJyYXlPZid9O1xuICAgIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYHR5cGVPckFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2VyLCBjaGVja2Vycy5hcnJheU9mKGNoZWNrZXIpXSkodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTaGFwZUNoZWNrR2V0dGVyKCkge1xuICAgIGZ1bmN0aW9uIHNoYXBlQ2hlY2tHZXR0ZXIoc2hhcGUsIG5vbk9iamVjdCkge1xuICAgICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIHNoYXBlVHlwZXNbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgICAgIH0pO1xuICAgICAgZnVuY3Rpb24gdHlwZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBwYXJlbnRSZXF1aXJlZCA9IG9wdGlvbnMucmVxdWlyZWQ7XG4gICAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICAgIGNvbnN0IHNwZWNpZmllZCA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCk7XG4gICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSB1bmRlZihwYXJlbnRSZXF1aXJlZCkgPyAhY2hlY2tlci5pc09wdGlvbmFsIDogcGFyZW50UmVxdWlyZWQ7XG4gICAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgICByZXRbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7dGVyc2UsIG9iajogb2JqICYmIG9ialtwcm9wXSwgcmVxdWlyZWQsIGFkZEhlbHBlcnN9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICAgIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICBmdW5jdGlvbiBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9ICdJVEVNJztcbiAgICAgICAgICAgIGlmIChjaGVja2VyLnR5cGUgJiYgY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkSGVscGVyKCdtaXNzaW5nJywgYE1JU1NJTkcgVEhJUyAke2l0ZW19YCwgJyA8LS0gWU9VIEFSRSBNSVNTSU5HIFRISVMnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNpZmllZCkge1xuICAgICAgICAgICAgbGV0IGVycm9yID0gY2hlY2tlcihvYmpbcHJvcF0sIHByb3AsIG51bGwsIG9iaik7XG4gICAgICAgICAgICBpZiAoaXNFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgYWRkSGVscGVyKCdlcnJvcicsIGBUSElTIElTIFRIRSBQUk9CTEVNOiAke2Vycm9yLm1lc3NhZ2V9YCwgYCA8LS0gVEhJUyBJUyBUSEUgUFJPQkxFTTogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFkZEhlbHBlcihwcm9wZXJ0eSwgb2JqZWN0TWVzc2FnZSwgc3RyaW5nTWVzc2FnZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldFtwcm9wXSArPSBzdHJpbmdNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0W3Byb3BdLl9fYXBpQ2hlY2tEYXRhW3Byb3BlcnR5XSA9IG9iamVjdE1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7c3RyaWN0OiBmYWxzZSwgb3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnc2hhcGUnfTtcbiAgICAgIGxldCBzaGFwZUNoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgbGV0IGlzT2JqZWN0ID0gIW5vbk9iamVjdCAmJiBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hhcGVQcm9wRXJyb3I7XG4gICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24gPyBsb2NhdGlvbiArIChuYW1lID8gJy8nIDogJycpIDogJyc7XG4gICAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuICAgICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgYCR7bG9jYXRpb259JHtuYW1lfWAsIHZhbCk7XG4gICAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBzaGFwZVByb3BFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSwge3R5cGUsIHNob3J0VHlwZTogJ3NoYXBlJ30sIGRpc2FibGVkKTtcblxuICAgICAgZnVuY3Rpb24gc3RyaWN0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpO1xuICAgICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YS5zdHJpY3QgPSB0cnVlO1xuICAgICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2hhcGVFcnJvciA9IHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVFcnJvcikpIHtcbiAgICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNoYXBlKTtcbiAgICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgICAgYEl0IGlzIGxpbWl0ZWQgdG8gJHt0KGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJ2AsIGAnKSl9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIHt0eXBlOiBzdHJpY3RUeXBlLCBzaG9ydFR5cGU6ICdzdHJpY3Qgc2hhcGUnfSwgZGlzYWJsZWQpO1xuXG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyO1xuICAgIH1cblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgICB9XG4gICAgICBsZXQgZGVzY3JpcHRpb247XG4gICAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZGVzY3JpcHRpb24gPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBub3Qgc3BlY2lmaWVkYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gYHNwZWNpZmllZCBvbmx5IGlmIG5vbmUgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgICB9XG4gICAgICBjb25zdCB0eXBlID0gZ2V0VHlwZUZvclNoYXBlQ2hpbGQocHJvcENoZWNrZXIsIGRlc2NyaXB0aW9uKTtcbiAgICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gaWZOb3RDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICAgIGxldCBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUob3RoZXJQcm9wID0+IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkob3RoZXJQcm9wKSk7XG4gICAgICAgIGlmIChwcm9wRXhpc3RzID09PSBvdGhlclByb3BzRXhpc3QpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwge25vdFJlcXVpcmVkOiB0cnVlLCB0eXBlLCBzaG9ydFR5cGU6IGBpZk5vdFske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0sIGRpc2FibGVkKTtcbiAgICB9O1xuXG4gICAgc2hhcGVDaGVja0dldHRlci5vbmx5SWYgPSBmdW5jdGlvbiBvbmx5SWYob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICAgIGxldCBkZXNjcmlwdGlvbjtcbiAgICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBkZXNjcmlwdGlvbiA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIGFsc28gc3BlY2lmaWVkYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gYHNwZWNpZmllZCBvbmx5IGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRUeXBlRm9yU2hhcGVDaGlsZChwcm9wQ2hlY2tlciwgZGVzY3JpcHRpb24pO1xuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmx5SWZDaGVja2VyRGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICAgIGlmICghb3RoZXJzUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6IGBvbmx5SWZbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9LCBkaXNhYmxlZCk7XG4gICAgfTtcblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIucmVxdWlyZWRJZk5vdCA9IGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0UmVxdWlyZWRJZk5vdENoZWNrZXIoZmFsc2UsIG90aGVyUHJvcHMsIHByb3BDaGVja2VyKTtcbiAgICB9O1xuXG4gICAgc2hhcGVDaGVja0dldHRlci5yZXF1aXJlZElmTm90LmFsbCA9IGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdEFsbChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVxdWlyZWRJZk5vdC5hbGwgbXVzdCBiZSBwYXNzZWQgYW4gYXJyYXknKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRSZXF1aXJlZElmTm90Q2hlY2tlcih0cnVlLCBvdGhlclByb3BzLCBwcm9wQ2hlY2tlcik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFJlcXVpcmVkSWZOb3RDaGVja2VyKGFsbCwgb3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICAgIGNvbnN0IHByb3BzID0gdChvdGhlclByb3BzLmpvaW4oJywgJykpO1xuICAgICAgY29uc3QgaWZQcm9wcyA9IGBpZiAke2FsbCA/ICdhbGwgb2YnIDogJ2F0IGxlYXN0IG9uZSBvZid9YDtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYHNwZWNpZmllZCAke2lmUHJvcHN9IHRoZXNlIGFyZSBub3Qgc3BlY2lmaWVkOiAke3Byb3BzfSAob3RoZXJ3aXNlIGl0J3Mgb3B0aW9uYWwpYDtcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRUeXBlRm9yU2hhcGVDaGlsZChwcm9wQ2hlY2tlciwgZGVzY3JpcHRpb24pO1xuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICAgIGNvbnN0IHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgICAgY29uc3QgaXRlcmF0aW9uID0gYWxsID8gJ2V2ZXJ5JyA6ICdzb21lJztcbiAgICAgICAgY29uc3Qgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wc1tpdGVyYXRpb25dKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcbiAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFvdGhlclByb3BzRXhpc3QgJiYgIXByb3BFeGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfSwge3R5cGUsIG5vdFJlcXVpcmVkOiB0cnVlfSwgZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFwZUNoZWNrR2V0dGVyO1xuXG4gICAgZnVuY3Rpb24gZ2V0VHlwZUZvclNoYXBlQ2hpbGQocHJvcENoZWNrZXIsIGRlc2NyaXB0aW9uKSB7XG4gICAgICBmdW5jdGlvbiB0eXBlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGdldENoZWNrZXJEaXNwbGF5KHByb3BDaGVja2VyKTtcbiAgICAgIH1cbiAgICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnaWZOb3QnLCBkZXNjcmlwdGlvbn07XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnZnVuY3Rpb24gYXJndW1lbnRzJztcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfSwge3R5cGU6ICdhbnknfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbnVsbENoZWNrR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbnVsbCc7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBudWxsQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5nZUNoZWNrR2V0dGVyKG1pbiwgbWF4KSB7XG4gICAgY29uc3QgdHlwZSA9IGBSYW5nZSAoJHttaW59IC0gJHttYXh9KWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiByYW5nZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICdudW1iZXInIHx8IHZhbCA8IG1pbiB8fCB2YWwgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5T2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdlbXB0eSBvYmplY3QnO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gZW1wdHlPYmplY3RDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcgfHwgdmFsID09PSBudWxsIHx8IE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeTtcblxuZnVuY3Rpb24gZ2V0U2VyaWFsaXplIChmbiwgZGVjeWNsZSkge1xuICB2YXIgc2VlbiA9IFtdLCBrZXlzID0gW107XG4gIGRlY3ljbGUgPSBkZWN5Y2xlIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gJ1tDaXJjdWxhciAnICsgZ2V0UGF0aCh2YWx1ZSwgc2Vlbiwga2V5cykgKyAnXSdcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAgIGlmIChzZWVuLmluZGV4T2YodmFsdWUpICE9PSAtMSlcbiAgICAgICAgcmV0ID0gZGVjeWNsZShrZXksIHZhbHVlKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZuKSByZXQgPSBmbihrZXksIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoICh2YWx1ZSwgc2Vlbiwga2V5cykge1xuICB2YXIgaW5kZXggPSBzZWVuLmluZGV4T2YodmFsdWUpO1xuICB2YXIgcGF0aCA9IFsga2V5c1tpbmRleF0gXTtcbiAgZm9yIChpbmRleC0tOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKHNlZW5baW5kZXhdWyBwYXRoWzBdIF0gPT09IHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHNlZW5baW5kZXhdO1xuICAgICAgcGF0aC51bnNoaWZ0KGtleXNbaW5kZXhdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICd+JyArIHBhdGguam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCBmbiwgc3BhY2VzLCBkZWN5Y2xlKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIGdldFNlcmlhbGl6ZShmbiwgZGVjeWNsZSksIHNwYWNlcyk7XG59XG5cbnN0cmluZ2lmeS5nZXRTZXJpYWxpemUgPSBnZXRTZXJpYWxpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGktY2hlY2suanMifQ==