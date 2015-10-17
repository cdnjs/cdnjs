// apiCheck.js v7.1.0 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	      var type = "specified if these are not specified: " + t(otherProps.join(", ")) + " (otherwise it's optional)";
	      return setupChecker(function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
	        var propExists = obj && obj.hasOwnProperty(propName);
	        var otherPropsExist = otherProps.some(function (otherProp) {
	          return obj && obj.hasOwnProperty(otherProp);
	        });
	        if (!otherPropsExist && !propExists) {
	          return getError(propName, location, type);
	        } else if (propExists) {
	          return propChecker(prop, propName, location, obj);
	        }
	      }, { type: type, notRequired: true }, disabled);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYzBiODA2MWU3OTJhMzYzMjFkZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFF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WSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzdELFdBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtBQUNyRCxnQkFBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QztNQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEI7O0FBRUQsWUFBUyxzQkFBc0IsR0FBRztBQUNoQyxTQUFNLElBQUksR0FBRyxjQUFjLENBQUM7QUFDNUIsWUFBTyxZQUFZLENBQUMsU0FBUyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuRSxXQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN2RSxnQkFBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QztNQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEI7RUFFRjs7Ozs7Ozs7Ozs7QUMxWEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMmMwYjgwNjFlNzkyYTM2MzIxZGRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3QgYXBpQ2hlY2tVdGlsID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtlYWNoLCBpc0Vycm9yLCB0LCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZiwgZ2V0RXJyb3J9ID0gYXBpQ2hlY2tVdGlsO1xuY29uc3QgY2hlY2tlcnMgPSByZXF1aXJlKCcuL2NoZWNrZXJzJyk7XG5jb25zdCBhcGlDaGVja0FwaXMgPSBnZXRBcGlDaGVja0FwaXMoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRBcGlDaGVja0luc3RhbmNlO1xubW9kdWxlLmV4cG9ydHMudXRpbHMgPSBhcGlDaGVja1V0aWw7XG5tb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcgPSB7XG4gIHZlcmJvc2U6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2Vcbn07XG5cbmNvbnN0IGFwaUNoZWNrQXBpQ2hlY2sgPSBnZXRBcGlDaGVja0luc3RhbmNlKHtcbiAgb3V0cHV0OiB7cHJlZml4OiAnYXBpQ2hlY2snfVxufSk7XG5tb2R1bGUuZXhwb3J0cy5pbnRlcm5hbENoZWNrZXIgPSBhcGlDaGVja0FwaUNoZWNrO1xuXG5cbmVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1tuYW1lXSA9IGNoZWNrZXIpO1xuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0luc3RhbmNlKGNvbmZpZyA9IHt9LCBleHRyYUNoZWNrZXJzID0ge30pIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICBpZiAoYXBpQ2hlY2tBcGlDaGVjayAmJiBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgYXBpQ2hlY2tBcGlDaGVjay50aHJvdyhhcGlDaGVja0FwaXMuZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzLCBhcmd1bWVudHMsIHtcbiAgICAgIHByZWZpeDogJ2NyZWF0aW5nIGFuIGFwaUNoZWNrIGluc3RhbmNlJ1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0ge1xuICAgIHRocm93OiBnZXRBcGlDaGVjayh0cnVlKSxcbiAgICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gICAgZ2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgICBjb25maWc6IHtcbiAgICAgIG91dHB1dDogY29uZmlnLm91dHB1dCB8fCB7XG4gICAgICAgIHByZWZpeDogJycsXG4gICAgICAgIHN1ZmZpeDogJycsXG4gICAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgICAgfSxcbiAgICAgIHZlcmJvc2U6IGNvbmZpZy52ZXJib3NlIHx8IGZhbHNlLFxuICAgICAgZGlzYWJsZWQ6IGNvbmZpZy5kaXNhYmxlZCB8fCBmYWxzZVxuICAgIH0sXG4gICAgdXRpbHM6IGFwaUNoZWNrVXRpbFxuICB9O1xuXG4gIGVhY2goYWRkaXRpb25hbFByb3BlcnRpZXMsICh3cmFwcGVyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IHdyYXBwZXIpO1xuXG4gIGNvbnN0IGRpc2FibGVkID0gYXBpQ2hlY2suZGlzYWJsZWQgfHwgbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmRpc2FibGVkO1xuICBlYWNoKGNoZWNrZXJzLmdldENoZWNrZXJzKGRpc2FibGVkKSwgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG4gIGVhY2goZXh0cmFDaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG5cbiAgcmV0dXJuIGFwaUNoZWNrO1xuXG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIGluc3RhbmNlIGZ1bmN0aW9uLiBPdGhlciB0aGluZ3MgYXJlIGF0dGFjaGVkIHRvIHRoaXMgc2VlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhYm92ZS5cbiAgICogQHBhcmFtIGFwaSB7QXJyYXl9XG4gICAqIEBwYXJhbSBhcmdzIHthcmd1bWVudHN9XG4gICAqIEBwYXJhbSBvdXRwdXQge09iamVjdH1cbiAgICogQHJldHVybnMge09iamVjdH0gLSBpZiB0aGlzIGhhcyBhIGZhaWxlZCA9IHRydWUgcHJvcGVydHksIHRoZW4gaXQgZmFpbGVkXG4gICAqL1xuICBmdW5jdGlvbiBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjggKi9cbiAgICBpZiAoYXBpQ2hlY2suY29uZmlnLmRpc2FibGVkIHx8IG1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXBpVHlwZXM6IHt9LCBhcmdUeXBlczoge30sXG4gICAgICAgIHBhc3NlZDogdHJ1ZSwgbWVzc2FnZTogJycsXG4gICAgICAgIGZhaWxlZDogZmFsc2VcbiAgICAgIH07IC8vIGVtcHR5IHZlcnNpb24gb2Ygd2hhdCBpcyBub3JtYWxseSByZXR1cm5lZFxuICAgIH1cbiAgICBjaGVja0FwaUNoZWNrQXBpKGFyZ3VtZW50cyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFwaSkpIHtcbiAgICAgIGFwaSA9IFthcGldO1xuICAgICAgYXJncyA9IFthcmdzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHVybiBhcmd1bWVudHMgaW50byBhbiBhcnJheVxuICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZXMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgICBpZiAoIW1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgLy8gdGhpcyBpcyB3aGVyZSB3ZSBhY3R1YWxseSBnbyBwZXJmb3JtIHRoZSBjaGVja3MuXG4gICAgICBtZXNzYWdlcyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgICB9XG5cbiAgICBsZXQgcmV0dXJuT2JqZWN0ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIG1lc3NhZ2VzLCBvdXRwdXQpO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IHRydWU7XG4gICAgICByZXR1cm5PYmplY3QucGFzc2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gJyc7XG4gICAgICByZXR1cm5PYmplY3QuZmFpbGVkID0gZmFsc2U7XG4gICAgICByZXR1cm5PYmplY3QucGFzc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja0FwaUNoZWNrQXBpLCBzaG91bGQgYmUgcmVhZCBsaWtlOiBjaGVjayBhcGlDaGVjayBhcGkuIEFzIGluLCBjaGVjayB0aGUgYXBpIGZvciBhcGlDaGVjayA6LSlcbiAgICogQHBhcmFtIGNoZWNrQXBpQXJnc1xuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tBcGlDaGVja0FwaShjaGVja0FwaUFyZ3MpIHtcbiAgICBjb25zdCBhcGkgPSBjaGVja0FwaUFyZ3NbMF07XG4gICAgY29uc3QgYXJncyA9IGNoZWNrQXBpQXJnc1sxXTtcbiAgICB2YXIgaXNBcnJheU9yQXJncyA9IEFycmF5LmlzQXJyYXkoYXJncykgfHwgKGFyZ3MgJiYgdHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhcmdzLmxlbmd0aCA9PT0gJ251bWJlcicpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXBpKSAmJiAhaXNBcnJheU9yQXJncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShhcGksIFthcmdzXSxcbiAgICAgICAgWydJZiBhbiBhcnJheSBpcyBwcm92aWRlZCBmb3IgdGhlIGFwaSwgYW4gYXJyYXkgbXVzdCBiZSBwcm92aWRlZCBmb3IgdGhlIGFyZ3MgYXMgd2VsbC4nXSxcbiAgICAgICAge3ByZWZpeDogJ2FwaUNoZWNrJ31cbiAgICAgICkpO1xuICAgIH1cbiAgICAvLyBkb2cgZm9vZGluZyBoZXJlXG4gICAgY29uc3QgZXJyb3JzID0gY2hlY2tBcGlXaXRoQXJncyhhcGlDaGVja0FwaXMuY2hlY2tBcGlDaGVja0FwaSwgY2hlY2tBcGlBcmdzKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGlDaGVja0FwaXMuY2hlY2tBcGlDaGVja0FwaSwgY2hlY2tBcGlBcmdzLCBlcnJvcnMsIHtcbiAgICAgICAgcHJlZml4OiAnYXBpQ2hlY2snXG4gICAgICB9KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGFwaUNoZWNrV3JhcHBlcihhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShyZXN1bHQubWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gd29udCBnZXQgaGVyZSBpZiBhbiBlcnJvciBpcyB0aHJvd25cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG4gICAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAgIGxldCBnT3V0ID0gYXBpQ2hlY2suY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgICBsZXQgcHJlZml4ID0gZ2V0UHJlZml4KCk7XG4gICAgbGV0IHN1ZmZpeCA9IGdldFN1ZmZpeCgpO1xuICAgIGxldCB1cmwgPSBnZXRVcmwoKTtcbiAgICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICAgIHZhciBwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkID0gJ1xcblxcbicgKyBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7bWVzc2FnZX0gJHtzdWZmaXh9ICR7dXJsIHx8ICcnfSR7cGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZH1gLnRyaW0oKTtcblxuICAgIGZ1bmN0aW9uIGdldFByZWZpeCgpIHtcbiAgICAgIGxldCBwcmVmaXggPSBvdXRwdXQub25seVByZWZpeDtcbiAgICAgIGlmICghcHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN1ZmZpeCgpIHtcbiAgICAgIGxldCBzdWZmaXggPSBvdXRwdXQub25seVN1ZmZpeDtcbiAgICAgIGlmICghc3VmZml4KSB7XG4gICAgICAgIHN1ZmZpeCA9IGAke291dHB1dC5zdWZmaXggfHwgJyd9ICR7Z091dC5zdWZmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VmZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVybCgpIHtcbiAgICAgIGxldCB1cmwgPSBvdXRwdXQudXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsU3VmZml4ICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsU3VmZml4fWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcbiAgICBsZXQge2FwaVR5cGVzLCBhcmdUeXBlc30gPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICAgIGxldCBjb3B5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyB8fCBbXSk7XG4gICAgbGV0IHJlcGxhY2VkSXRlbXMgPSBbXTtcbiAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShjb3B5KTtcbiAgICBjb25zdCBwYXNzZWRBcmdzID0gZ2V0T2JqZWN0U3RyaW5nKGNvcHkpO1xuICAgIGFyZ1R5cGVzID0gZ2V0T2JqZWN0U3RyaW5nKGFyZ1R5cGVzKTtcbiAgICBhcGlUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcGlUeXBlcyk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVNZXNzYWdlKCk7XG5cblxuICAgIC8vIGZ1bmN0aW9uc1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKSB7XG4gICAgICBlYWNoKG9iaiwgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIGlmIChyZXBsYWNlZEl0ZW1zLmluZGV4T2YodmFsKSA9PT0gLTEpIHsgLy8gYXZvaWQgcmVjdXJzaXZlIHByb2JsZW1zXG4gICAgICAgICAgcmVwbGFjZWRJdGVtcy5wdXNoKHZhbCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShvYmopO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsLmRpc3BsYXlOYW1lIHx8IHZhbC5uYW1lIHx8ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T2JqZWN0U3RyaW5nKHR5cGVzKSB7XG4gICAgICBpZiAoIXR5cGVzIHx8ICF0eXBlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICdub3RoaW5nJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZXMgJiYgdHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHR5cGVzID0gdHlwZXNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaW5naWZ5KHR5cGVzLCBudWxsLCAyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2UoKSB7XG4gICAgICBjb25zdCBuID0gJ1xcbic7XG4gICAgICBsZXQgdXNlUyA9IHRydWU7XG4gICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdXNlUyA9ICEhT2JqZWN0LmtleXMoYXJnc1swXSkubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVzZVMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdHlwZXMgPSBgdHlwZSR7dXNlUyA/ICdzJyA6ICcnfWA7XG4gICAgICBjb25zdCBuZXdMaW5lID0gbiArIG47XG4gICAgICByZXR1cm4gYFlvdSBwYXNzZWQ6JHtufSR7cGFzc2VkQXJnc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBXaXRoIHRoZSAke3R5cGVzfToke259JHthcmdUeXBlc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBUaGUgQVBJIGNhbGxzIGZvcjoke259JHthcGlUeXBlc31gO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGVzKGFwaSwgYXJncykge1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICAgIGxldCBhcGlUeXBlcyA9IGFwaS5tYXAoKGNoZWNrZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWZpZWQgPSBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuaGFzT3duUHJvcGVydHkoJ3ZlcmJvc2UnKTtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7XG4gICAgICAgIHRlcnNlOiBzcGVjaWZpZWQgPyAhbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLnZlcmJvc2UgOiAhYXBpQ2hlY2suY29uZmlnLnZlcmJvc2UsXG4gICAgICAgIG9iajogYXJnc1tpbmRleF0sXG4gICAgICAgIGFkZEhlbHBlcnM6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKChhcmcpID0+IGdldEFyZ0Rpc3BsYXkoYXJnLCBbXSkpO1xuICAgIHJldHVybiB7YXJnVHlwZXM6IGFyZ1R5cGVzLCBhcGlUeXBlc307XG4gIH1cblxufVxuXG5cbi8vIFNUQVRFTEVTUyBGVU5DVElPTlNcblxuLyoqXG4gKiBUaGlzIGlzIHdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zIGZvciBhY3R1YWxseSBjaGVja2luZyB0aGUgYXJndW1lbnRzIHdpdGggdGhlIGFwaS5cbiAqIEBwYXJhbSBhcGkge0FycmF5fSAtIGNoZWNrZXJzXG4gKiBAcGFyYW0gYXJncyB7QXJyYXl9IC0gYW5kIGFyZ3VtZW50cyBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzLCBsYXN0Q2hlY2tlciwgYXJnTmFtZSwgYXJnRmFpbGVkLCBza2lwUHJldmlvdXNDaGVja2VyO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUgKChjaGVja2VyID0gYXBpW2NoZWNrZXJJbmRleCsrXSkgJiYgKGFyZ0luZGV4IDwgYXJncy5sZW5ndGgpKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICBhcmdOYW1lID0gJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCAndmFsdWUnLCBhcmdOYW1lKTtcbiAgICBhcmdGYWlsZWQgPSBpc0Vycm9yKHJlcyk7XG4gICAgbGFzdENoZWNrZXIgPSBjaGVja2VySW5kZXggPj0gYXBpLmxlbmd0aDtcbiAgICBza2lwUHJldmlvdXNDaGVja2VyID0gY2hlY2tlckluZGV4ID4gMSAmJiBhcGlbY2hlY2tlckluZGV4IC0gMV0uaXNPcHRpb25hbDtcbiAgICBpZiAoKGFyZ0ZhaWxlZCAmJiBsYXN0Q2hlY2tlcikgfHwgKGFyZ0ZhaWxlZCAmJiAhbGFzdENoZWNrZXIgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCAmJiAhc2tpcFByZXZpb3VzQ2hlY2tlcikpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCBhcmcpKTtcbiAgICB9IGVsc2UgaWYgKGFyZ0ZhaWxlZCAmJiBjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goYCR7dChhcmdOYW1lKX0gcGFzc2VkYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWlsZWQgPyBtZXNzYWdlcyA6IFtdO1xufVxuXG5cbmNoZWNrZXJUeXBlVHlwZS50eXBlID0gJ2Z1bmN0aW9uIHdpdGggX19hcGlDaGVja0RhdGEgcHJvcGVydHkgYW5kIGAke2Z1bmN0aW9uLnR5cGV9YCBwcm9wZXJ0eSc7XG5mdW5jdGlvbiBjaGVja2VyVHlwZVR5cGUoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IGFwaUNoZWNrRGF0YUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZSh7XG4gICAgdHlwZTogY2hlY2tlcnMuc3RyaW5nLFxuICAgIG9wdGlvbmFsOiBjaGVja2Vycy5ib29sXG4gIH0pO1xuICBjb25zdCBhc0Z1bmMgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCBhc1NoYXBlID0gY2hlY2tlcnMuc2hhcGUoe19fYXBpQ2hlY2tEYXRhOiBhcGlDaGVja0RhdGFDaGVja2VyfSk7XG4gIGNvbnN0IHdyb25nU2hhcGUgPSBjaGVja2Vycy5vbmVPZlR5cGUoW1xuICAgIGFzRnVuYywgYXNTaGFwZVxuICBdKShjaGVja2VyVHlwZSwgbmFtZSwgbG9jYXRpb24pO1xuICBpZiAoaXNFcnJvcih3cm9uZ1NoYXBlKSkge1xuICAgIHJldHVybiB3cm9uZ1NoYXBlO1xuICB9XG4gIGlmICh0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdmdW5jdGlvbicgJiYgIWNoZWNrZXJUeXBlLmhhc093blByb3BlcnR5KGNoZWNrZXJUeXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUpKSB7XG4gICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZVR5cGUudHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIHZhbCkge1xuICBsZXQgY2hlY2tlckhlbHAgPSBnZXRDaGVja2VySGVscChjaGVja2VyLCB2YWwpO1xuICBjaGVja2VySGVscCA9IGNoZWNrZXJIZWxwID8gJyAtICcgKyBjaGVja2VySGVscCA6ICcnO1xuICByZXR1cm4gcmVzLm1lc3NhZ2UgKyBjaGVja2VySGVscDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckhlbHAoe2hlbHB9LCB2YWwpIHtcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh0eXBlb2YgaGVscCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhlbHAgPSBoZWxwKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGhlbHA7XG59XG5cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdOb3QgZW5vdWdoIGFyZ3VtZW50cyBzcGVjaWZpZWQuIFJlcXVpcmVzIGAnICsgcmVxdWlyZWRBcmdzLmxlbmd0aCArICdgLCB5b3UgcGFzc2VkIGAnICsgYXJncy5sZW5ndGggKyAnYCdcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZywgZ290dGVuQXJncykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGNvbnN0IGNOYW1lID0gYXJnICYmIGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZTtcbiAgY29uc3QgdHlwZSA9IHR5cGVPZihhcmcpO1xuICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChoYXNLZXlzKCkpIHtcbiAgICAgIGxldCBwcm9wZXJ0aWVzID0gc3RyaW5naWZ5KGdldERpc3BsYXlJZk5vdEdvdHRlbigpKTtcbiAgICAgIHJldHVybiBjTmFtZSArICcgKHdpdGggcHJvcGVydGllczogJyArIHByb3BlcnRpZXMgKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiBjTmFtZTtcbiAgfVxuXG4gIGlmIChhcmcgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9XG5cbiAgaWYgKHR5cGUgIT09ICdhcnJheScgJiYgdHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGlmIChoYXNLZXlzKCkpIHtcbiAgICByZXR1cm4gZ2V0RGlzcGxheUlmTm90R290dGVuKCk7XG4gIH1cblxuICByZXR1cm4gY05hbWU7XG5cbiAgLy8gdXRpbGl0eSBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gaGFzS2V5cygpIHtcbiAgICByZXR1cm4gYXJnICYmIE9iamVjdC5rZXlzKGFyZykubGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGlzcGxheUlmTm90R290dGVuKCkge1xuICAgIGlmIChnb3R0ZW5BcmdzLmluZGV4T2YoYXJnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgfVxuICAgIGdvdHRlbkFyZ3MucHVzaChhcmcpO1xuICAgIHJldHVybiBnZXREaXNwbGF5KGFyZywgZ290dGVuQXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheShvYmosIGdvdHRlbkFyZ3MpIHtcbiAgdmFyIGFyZ0Rpc3BsYXkgPSB7fTtcbiAgZWFjaChvYmosICh2LCBrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2LCBnb3R0ZW5BcmdzKSk7XG4gIHJldHVybiBhcmdEaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0FwaXMoKSB7XG4gIGNvbnN0IG9zID0gY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsO1xuXG4gIGNvbnN0IGNoZWNrZXJGbkNoZWNrZXIgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgICB0eXBlOiBjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXJzLnN0cmluZywgY2hlY2tlclR5cGVUeXBlXSkub3B0aW9uYWwsXG4gICAgZGlzcGxheU5hbWU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBzaG9ydFR5cGU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBub3RPcHRpb25hbDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICBub3RSZXF1aXJlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICB9KTtcblxuICBjb25zdCBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMgPSBbXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgb3V0cHV0OiBjaGVja2Vycy5zaGFwZSh7XG4gICAgICAgIHByZWZpeDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICBzdWZmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgZG9jc0Jhc2VVcmw6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgICAgdmVyYm9zZTogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICAgIGRpc2FibGVkOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgIGNoZWNrZXJzLm9iamVjdE9mKGNoZWNrZXJGbkNoZWNrZXIpLm9wdGlvbmFsXG4gIF07XG5cbiAgY29uc3QgY2hlY2tBcGlDaGVja0FwaSA9IFtcbiAgICBjaGVja2Vycy50eXBlT3JBcnJheU9mKGNoZWNrZXJGbkNoZWNrZXIpLFxuICAgIGNoZWNrZXJzLmFueS5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5zaGFwZSh7XG4gICAgICBwcmVmaXg6IG9zLCBzdWZmaXg6IG9zLCB1cmxTdWZmaXg6IG9zLCAvLyBhcHBlbmRlZCBjYXNlXG4gICAgICBvbmx5UHJlZml4OiBvcywgb25seVN1ZmZpeDogb3MsIHVybDogb3MgLy8gb3ZlcnJpZGUgY2FzZVxuICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuXG4gIHJldHVybiB7XG4gICAgY2hlY2tlckZuQ2hlY2tlcixcbiAgICBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsXG4gICAgY2hlY2tBcGlDaGVja0FwaVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgYWRkT3B0aW9uYWwsIGdldFJlcXVpcmVkVmVyc2lvbiwgc2V0dXBDaGVja2VyLCBhZGROdWxsYWJsZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2gsIGNvcHksIHR5cGVPZiwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LFxuICBpc0Vycm9yLCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgdW5kZWYsIGNoZWNrZXJIZWxwZXJzLFxuICBub29wXG59O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICBsZXQgdHlwZSA9IHR5cGVPZihvYmopO1xuICBsZXQgZGFDb3B5O1xuICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGRhQ29weSA9IFtdO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgZGFDb3B5ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBlYWNoKG9iaiwgKHZhbCwga2V5KSA9PiB7XG4gICAgZGFDb3B5W2tleV0gPSB2YWw7IC8vIGNhbm5vdCBzaW5nbGUtbGluZSB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBhYm9ydCB0aGUgZWFjaFxuICB9KTtcbiAgcmV0dXJuIGRhQ29weTtcbn1cblxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgb3B0aW9ucykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBkaXNwbGF5O1xuICBsZXQgc2hvcnQgPSBvcHRpb25zICYmIG9wdGlvbnMuc2hvcnQ7XG4gIGlmIChzaG9ydCAmJiBjaGVja2VyLnNob3J0VHlwZSkge1xuICAgIGRpc3BsYXkgPSBjaGVja2VyLnNob3J0VHlwZTtcbiAgfSBlbHNlIGlmICghc2hvcnQgJiYgdHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ29iamVjdCcgfHwgY2hlY2tlci50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BsYXkgPSBnZXRDaGVja2VyVHlwZShjaGVja2VyLCBvcHRpb25zKSB8fCBjaGVja2VyLmRpc3BsYXlOYW1lIHx8IGNoZWNrZXIubmFtZTtcbiAgfVxuICByZXR1cm4gZGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlclR5cGUoe3R5cGV9LCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBfX2FwaUNoZWNrRGF0YSA9IHR5cGUuX19hcGlDaGVja0RhdGE7XG4gICAgbGV0IHR5cGVUeXBlcyA9IHR5cGUob3B0aW9ucyk7XG4gICAgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhLFxuICAgICAgW19fYXBpQ2hlY2tEYXRhLnR5cGVdOiB0eXBlVHlwZXNcbiAgICB9O1xuICB9XG4gIHJldHVybiB0eXBlO1xufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuZnVuY3Rpb24gbGlzdChhcnJ5LCBqb2luLCBmaW5hbEpvaW4pIHtcbiAgYXJyeSA9IGFycmF5aWZ5KGFycnkpO1xuICBsZXQgY29weSA9IGFycnkuc2xpY2UoKTtcbiAgbGV0IGxhc3QgPSBjb3B5LnBvcCgpO1xuICBpZiAoY29weS5sZW5ndGggPT09IDEpIHtcbiAgICBqb2luID0gJyAnO1xuICB9XG4gIHJldHVybiBjb3B5LmpvaW4oam9pbikgKyBgJHtjb3B5Lmxlbmd0aCA/IGpvaW4gKyBmaW5hbEpvaW4gOiAnJ30ke2xhc3R9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGUpIHtcbiAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiBjaGVja2VyVHlwZSAhPT0gJ29iamVjdCcgPyBjaGVja2VyVHlwZSA6IHN0cmluZ2lmeShjaGVja2VyVHlwZSk7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IG11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xufVxuXG5mdW5jdGlvbiBuQXRMKG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IHROYW1lID0gdChuYW1lIHx8ICd2YWx1ZScpO1xuICBsZXQgdExvY2F0aW9uID0gIWxvY2F0aW9uID8gJycgOiAnIGF0ICcgKyB0KGxvY2F0aW9uKTtcbiAgcmV0dXJuIGAke3ROYW1lfSR7dExvY2F0aW9ufWA7XG59XG5cbmZ1bmN0aW9uIHQodGhpbmcpIHtcbiAgcmV0dXJuICdgJyArIHRoaW5nICsgJ2AnO1xufVxuXG5mdW5jdGlvbiB1bmRlZih0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJztcbn1cblxuXG4vKipcbiAqIFRoaXMgd2lsbCBzZXQgdXAgdGhlIGNoZWNrZXIgd2l0aCBhbGwgb2YgdGhlIGRlZmF1bHRzIHRoYXQgbW9zdCBjaGVja2VycyB3YW50IGxpa2UgcmVxdWlyZWQgYnkgZGVmYXVsdCBhbmQgYW5cbiAqIG9wdGlvbmFsIHZlcnNpb25cbiAqIEBwYXJhbSBjaGVja2VyXG4gKiBAcGFyYW0gcHJvcGVydGllcyBwcm9wZXJ0aWVzIHRvIGFkZCB0byB0aGUgY2hlY2tlclxuICogQHBhcmFtIGRpc2FibGVkIC0gd2hlbiBzZXQgdG8gdHJ1ZSwgdGhpcyB3aWxsIHNldCB0aGUgY2hlY2tlciB0byBhIG5vLW9wIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ2hlY2tlcihjaGVja2VyLCBwcm9wZXJ0aWVzLCBkaXNhYmxlZCkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo5ICovXG4gIGlmIChkaXNhYmxlZCkgeyAvLyBzd2FwIG91dCB0aGUgY2hlY2tlciBmb3IgaXRzIG93biBjb3B5IG9mIG5vb3BcbiAgICBjaGVja2VyID0gZ2V0Tm9vcCgpO1xuICAgIGNoZWNrZXIuaXNOb29wID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY2hlY2tlci50eXBlID09PSAnc3RyaW5nJykge1xuICAgIGNoZWNrZXIuc2hvcnRUeXBlID0gY2hlY2tlci50eXBlO1xuICB9XG5cbiAgLy8gYXNzaWduIGFsbCBwcm9wZXJ0aWVzIGdpdmVuXG4gIGVhY2gocHJvcGVydGllcywgKHByb3AsIG5hbWUpID0+IGNoZWNrZXJbbmFtZV0gPSBwcm9wKTtcblxuICBpZiAoIWNoZWNrZXIuZGlzcGxheU5hbWUpIHtcbiAgICBjaGVja2VyLmRpc3BsYXlOYW1lID0gYGFwaUNoZWNrICR7dChjaGVja2VyLnNob3J0VHlwZSB8fCBjaGVja2VyLnR5cGUgfHwgY2hlY2tlci5uYW1lKX0gdHlwZSBjaGVja2VyYDtcbiAgfVxuXG5cbiAgaWYgKCFjaGVja2VyLm5vdFJlcXVpcmVkKSB7XG4gICAgY2hlY2tlciA9IGdldFJlcXVpcmVkVmVyc2lvbihjaGVja2VyLCBkaXNhYmxlZCk7XG4gIH1cblxuICBpZiAoIWNoZWNrZXIubm90TnVsbGFibGUpIHtcbiAgICBhZGROdWxsYWJsZShjaGVja2VyLCBkaXNhYmxlZCk7XG4gIH1cblxuICBpZiAoIWNoZWNrZXIubm90T3B0aW9uYWwpIHtcbiAgICBhZGRPcHRpb25hbChjaGVja2VyLCBkaXNhYmxlZCk7XG4gIH1cblxuICByZXR1cm4gY2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRWZXJzaW9uKGNoZWNrZXIsIGRpc2FibGVkKSB7XG4gIHZhciByZXF1aXJlZENoZWNrZXIgPSBkaXNhYmxlZCA/IGdldE5vb3AoKSA6IGZ1bmN0aW9uIHJlcXVpcmVkQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAodW5kZWYodmFsKSAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBsZXQgdExvY2F0aW9uID0gbG9jYXRpb24gPyBgIGluICR7dChsb2NhdGlvbil9YCA6ICcnO1xuICAgICAgY29uc3QgdHlwZSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICAgICAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiB0eXBlICE9PSAnb2JqZWN0JyA/IHR5cGUgOiBzdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfTtcbiAgY29weVByb3BzKGNoZWNrZXIsIHJlcXVpcmVkQ2hlY2tlcik7XG4gIHJlcXVpcmVkQ2hlY2tlci5vcmlnaW5hbENoZWNrZXIgPSBjaGVja2VyO1xuICByZXR1cm4gcmVxdWlyZWRDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBhZGRPcHRpb25hbChjaGVja2VyLCBkaXNhYmxlZCkge1xuICB2YXIgb3B0aW9uYWxDaGVjayA9IGRpc2FibGVkID8gZ2V0Tm9vcCgpIDogZnVuY3Rpb24gb3B0aW9uYWxDaGVjayh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAoIXVuZGVmKHZhbCkpIHtcbiAgICAgIHJldHVybiBjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9O1xuICAvLyBpbmhlcml0IGFsbCBwcm9wZXJ0aWVzIG9uIHRoZSBvcmlnaW5hbCBjaGVja2VyXG4gIGNvcHlQcm9wcyhjaGVja2VyLCBvcHRpb25hbENoZWNrKTtcblxuICBvcHRpb25hbENoZWNrLmlzT3B0aW9uYWwgPSB0cnVlO1xuICBvcHRpb25hbENoZWNrLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZSArICcgKG9wdGlvbmFsKSc7XG4gIG9wdGlvbmFsQ2hlY2sub3JpZ2luYWxDaGVja2VyID0gY2hlY2tlcjtcblxuXG4gIC8vIHRoZSBtYWdpYyBsaW5lIHRoYXQgYWxsb3dzIHlvdSB0byBhZGQgLm9wdGlvbmFsIHRvIHRoZSBlbmQgb2YgdGhlIGNoZWNrZXJzXG4gIGNoZWNrZXIub3B0aW9uYWwgPSBvcHRpb25hbENoZWNrO1xuXG4gIGZpeFR5cGUoY2hlY2tlciwgY2hlY2tlci5vcHRpb25hbCk7XG59XG5cbmZ1bmN0aW9uIGFkZE51bGxhYmxlKGNoZWNrZXIsIGRpc2FibGVkKSB7XG4gIHZhciBudWxsYWJsZUNoZWNrID0gZGlzYWJsZWQgPyBnZXROb29wKCkgOiBmdW5jdGlvbiBudWxsYWJsZUNoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9O1xuICAvLyBpbmhlcml0IGFsbCBwcm9wZXJ0aWVzIG9uIHRoZSBvcmlnaW5hbCBjaGVja2VyXG4gIGNvcHlQcm9wcyhjaGVja2VyLCBudWxsYWJsZUNoZWNrKTtcblxuICBudWxsYWJsZUNoZWNrLmlzTnVsbGFibGUgPSB0cnVlO1xuICBudWxsYWJsZUNoZWNrLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZSArICcgKG51bGxhYmxlKSc7XG4gIG51bGxhYmxlQ2hlY2sub3JpZ2luYWxDaGVja2VyID0gY2hlY2tlcjtcblxuICAvLyB0aGUgbWFnaWMgbGluZSB0aGF0IGFsbG93cyB5b3UgdG8gYWRkIC5udWxsYWJsZSB0byB0aGUgZW5kIG9mIHRoZSBjaGVja2Vyc1xuICBjaGVja2VyLm51bGxhYmxlID0gbnVsbGFibGVDaGVjaztcblxuICBmaXhUeXBlKGNoZWNrZXIsIGNoZWNrZXIubnVsbGFibGUpO1xufVxuXG5mdW5jdGlvbiBmaXhUeXBlKGNoZWNrZXIsIGNoZWNrZXJDb3B5KSB7XG4gIC8vIGZpeCB0eXBlLCBiZWNhdXNlIGl0J3Mgbm90IGEgc3RyYWlnaHQgY29weS4uLlxuICAvLyB0aGUgcmVhc29uIGlzIHdlIG5lZWQgdG8gc3BlY2lmeSB0eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsIGFzIHRydWUgZm9yIHRoZSB0ZXJzZS92ZXJib3NlIG9wdGlvbi5cbiAgLy8gd2UgYWxzbyB3YW50IHRvIGFkZCBcIihvcHRpb25hbClcIiB0byB0aGUgdHlwZXMgd2l0aCBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGNoZWNrZXJDb3B5LnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY2hlY2tlckNvcHkudHlwZSA9IGNvcHkoY2hlY2tlckNvcHkudHlwZSk7IC8vIG1ha2Ugb3VyIG93biBjb3B5IG9mIHRoaXNcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2hlY2tlckNvcHkudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoZWNrZXJDb3B5LnR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGVja2VyLnR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNoZWNrZXJDb3B5LnR5cGUgKz0gJyAob3B0aW9uYWwpJztcbiAgICByZXR1cm47XG4gIH1cbiAgY2hlY2tlckNvcHkudHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB8fCB7fTsgLy8gYW5kIHRoaXNcbiAgY2hlY2tlckNvcHkudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG59XG5cblxuLy8gVVRJTFNcblxuZnVuY3Rpb24gY29weVByb3BzKHNyYywgZGVzdCkge1xuICBlYWNoKE9iamVjdC5rZXlzKHNyYyksIGtleSA9PiBkZXN0W2tleV0gPSBzcmNba2V5XSk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG59XG5cbmZ1bmN0aW9uIGdldE5vb3AoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiBmdW5jdGlvbiBub29wKCkge1xuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2tVdGlsLmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3Qge1xuICB0eXBlT2YsIGVhY2gsIGNvcHksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLFxuICBhcnJheWlmeSwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIGNoZWNrZXJIZWxwZXJzLFxuICB1bmRlZlxuICB9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtzZXR1cENoZWNrZXJ9ID0gY2hlY2tlckhlbHBlcnM7XG5cbmxldCBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0gZ2V0Q2hlY2tlcnMoKTtcbm1vZHVsZS5leHBvcnRzLmdldENoZWNrZXJzID0gZ2V0Q2hlY2tlcnM7XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJzKGRpc2FibGVkKSB7XG4gIHJldHVybiB7XG4gICAgYXJyYXk6IHR5cGVPZkNoZWNrR2V0dGVyKCdBcnJheScpLFxuICAgIGJvb2w6IHR5cGVPZkNoZWNrR2V0dGVyKCdCb29sZWFuJyksXG4gICAgbnVtYmVyOiB0eXBlT2ZDaGVja0dldHRlcignTnVtYmVyJyksXG4gICAgc3RyaW5nOiB0eXBlT2ZDaGVja0dldHRlcignU3RyaW5nJyksXG4gICAgZnVuYzogZnVuY0NoZWNrR2V0dGVyKCksXG4gICAgb2JqZWN0OiBvYmplY3RDaGVja0dldHRlcigpLFxuXG4gICAgZW1wdHlPYmplY3Q6IGVtcHR5T2JqZWN0Q2hlY2tHZXR0ZXIoKSxcblxuICAgIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gICAgb25lT2Y6IG9uZU9mQ2hlY2tHZXR0ZXIsXG4gICAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICAgIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgICBvYmplY3RPZjogb2JqZWN0T2ZDaGVja0dldHRlcixcbiAgICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgICByYW5nZTogcmFuZ2VDaGVja0dldHRlcixcblxuICAgIHNoYXBlOiBnZXRTaGFwZUNoZWNrR2V0dGVyKCksXG4gICAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gICAgYW55OiBhbnlDaGVja0dldHRlcigpLFxuICAgIG51bGw6IG51bGxDaGVja0dldHRlcigpXG5cbiAgfTtcblxuICBmdW5jdGlvbiB0eXBlT2ZDaGVja0dldHRlcih0eXBlKSB7XG4gICAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiB0eXBlT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodHlwZU9mKHZhbCkgIT09IGxUeXBlKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBmdW5jQ2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdGdW5jdGlvbic7XG4gICAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlfSwgZGlzYWJsZWQpO1xuXG4gICAgZnVuY3Rpb25DaGVja2VyLndpdGhQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZ2V0V2l0aFByb3BlcnRpZXNDaGVja2VyKHByb3BlcnRpZXMpIHtcbiAgICAgIGNvbnN0IGFwaUVycm9yID0gY2hlY2tlcnMub2JqZWN0T2YoY2hlY2tlcnMuZnVuYykocHJvcGVydGllcywgJ3Byb3BlcnRpZXMnLCAnYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcycpO1xuICAgICAgaWYgKGlzRXJyb3IoYXBpRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGFwaUVycm9yO1xuICAgICAgfVxuICAgICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHByb3BlcnRpZXMsIHRydWUpO1xuICAgICAgc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZSA9ICdmdW5jLndpdGhQcm9wZXJ0aWVzJztcblxuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbldpdGhQcm9wZXJ0aWVzQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5vdEZ1bmN0aW9uID0gY2hlY2tlcnMuZnVuYyh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgaWYgKGlzRXJyb3Iobm90RnVuY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIG5vdEZ1bmN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICB9LCB7dHlwZTogc2hhcGVDaGVja2VyLnR5cGUsIHNob3J0VHlwZTogJ2Z1bmMud2l0aFByb3BlcnRpZXMnfSwgZGlzYWJsZWQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdENoZWNrR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnT2JqZWN0JztcbiAgICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgICBsZXQgb2JqZWN0TnVsbE9rQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvYmplY3ROdWxsT2tDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlOiBudWxsVHlwZX0sIGRpc2FibGVkKTtcblxuICAgIGxldCBvYmplY3RDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgaXNFcnJvcihvYmplY3ROdWxsT2tDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIG9iamVjdENoZWNrZXIudHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIG51bGxPazogb2JqZWN0TnVsbE9rQ2hlY2tlcn0sIGRpc2FibGVkKTtcblxuICAgIHJldHVybiBvYmplY3RDaGVja2VyO1xuICB9XG5cblxuICBmdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBjbGFzc1RvQ2hlY2spKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2xhc3NUb0NoZWNrLm5hbWUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlOiBjbGFzc1RvQ2hlY2submFtZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZU9mQ2hlY2tHZXR0ZXIoZW51bXMpIHtcbiAgICBjb25zdCB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgICBlbnVtOiBlbnVtc1xuICAgIH07XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYG9uZU9mWyR7ZW51bXMubWFwKGVubSA9PiBzdHJpbmdpZnkoZW5tKSkuam9pbignLCAnKX1dYDtcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9uZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29uZU9mVHlwZSd9LFxuICAgICAgb25lT2ZUeXBlOiBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpKVxuICAgIH07XG4gICAgY29uc3QgY2hlY2tlcnNEaXNwbGF5ID0gY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYG9uZU9mVHlwZVske2NoZWNrZXJzRGlzcGxheS5qb2luKCcsICcpfV1gO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKCFjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gIWlzRXJyb3IoY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZSwgc2hvcnRUeXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgICBjb25zdCB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdhcnJheU9mJ30sXG4gICAgICBhcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICAgIH07XG4gICAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgICBjb25zdCBzaG9ydFR5cGUgPSBgYXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLmFycmF5KHZhbCkpIHx8ICF2YWwuZXZlcnkoKGl0ZW0pID0+ICFpc0Vycm9yKGNoZWNrZXIoaXRlbSkpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29iamVjdE9mJ30sXG4gICAgICBvYmplY3RPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgICB9O1xuICAgIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvYmplY3RPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdE9iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKG5vdE9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIG5vdE9iamVjdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgIGlmIChpc0Vycm9yKGNoZWNrZXIoaXRlbSwga2V5LCBuYW1lKSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3R5cGVPckFycmF5T2YnfSxcbiAgICAgIHR5cGVPckFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gICAgfTtcbiAgICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICAgIGNvbnN0IHNob3J0VHlwZSA9IGB0eXBlT3JBcnJheU9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiB0eXBlT3JBcnJheU9mRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZSwgc2hvcnRUeXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgICBmdW5jdGlvbiBzaGFwZUNoZWNrR2V0dGVyKHNoYXBlLCBub25PYmplY3QpIHtcbiAgICAgIGxldCBzaGFwZVR5cGVzID0ge307XG4gICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICBzaGFwZVR5cGVzW3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcik7XG4gICAgICB9KTtcbiAgICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCByZXQgPSB7fTtcbiAgICAgICAgY29uc3Qge3RlcnNlLCBvYmosIGFkZEhlbHBlcnN9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgcGFyZW50UmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xuICAgICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgICBjb25zdCBzcGVjaWZpZWQgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApO1xuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gdW5kZWYocGFyZW50UmVxdWlyZWQpID8gIWNoZWNrZXIuaXNPcHRpb25hbCA6IHBhcmVudFJlcXVpcmVkO1xuICAgICAgICAgIGlmICghdGVyc2UgfHwgKHNwZWNpZmllZCB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSkge1xuICAgICAgICAgICAgcmV0W3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3RlcnNlLCBvYmo6IG9iaiAmJiBvYmpbcHJvcF0sIHJlcXVpcmVkLCBhZGRIZWxwZXJzfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhZGRIZWxwZXJzKSB7XG4gICAgICAgICAgICBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgZnVuY3Rpb24gbW9kaWZ5VHlwZURpc3BsYXlUb0hlbHBPdXQocmV0LCBwcm9wLCBzcGVjaWZpZWQsIGNoZWNrZXIsIHJlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKCFzcGVjaWZpZWQgJiYgcmVxdWlyZWQgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSAnSVRFTSc7XG4gICAgICAgICAgICBpZiAoY2hlY2tlci50eXBlICYmIGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkge1xuICAgICAgICAgICAgICBpdGVtID0gY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEhlbHBlcihcbiAgICAgICAgICAgICAgJ21pc3NpbmcnLCAnTUlTU0lORyBUSElTICcgKyBpdGVtLCAnIDwtLSBZT1UgQVJFIE1JU1NJTkcgVEhJUydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjaWZpZWQpIHtcbiAgICAgICAgICAgIGxldCBlcnJvciA9IGNoZWNrZXIob2JqW3Byb3BdLCBwcm9wLCBudWxsLCBvYmopO1xuICAgICAgICAgICAgaWYgKGlzRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgIGFkZEhlbHBlcignZXJyb3InLCAnVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UsICcgPC0tIFRISVMgSVMgVEhFIFBST0JMRU06ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBhZGRIZWxwZXIocHJvcGVydHksIG9iamVjdE1lc3NhZ2UsIHN0cmluZ01lc3NhZ2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0W3Byb3BdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXRbcHJvcF0gKz0gc3RyaW5nTWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldFtwcm9wXS5fX2FwaUNoZWNrRGF0YVtwcm9wZXJ0eV0gPSBvYmplY3RNZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0eXBlLl9fYXBpQ2hlY2tEYXRhID0ge3N0cmljdDogZmFsc2UsIG9wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3NoYXBlJ307XG4gICAgICBsZXQgc2hhcGVDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIGxldCBpc09iamVjdCA9ICFub25PYmplY3QgJiYgY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgICBpZiAoaXNFcnJvcihpc09iamVjdCkpIHtcbiAgICAgICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNoYXBlUHJvcEVycm9yO1xuICAgICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uID8gbG9jYXRpb24gKyAobmFtZSA/ICcvJyA6ICcnKSA6ICcnO1xuICAgICAgICBuYW1lID0gbmFtZSB8fCAnJztcbiAgICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgICBpZiAodmFsLmhhc093blByb3BlcnR5KHByb3ApIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHNoYXBlUHJvcEVycm9yID0gY2hlY2tlcih2YWxbcHJvcF0sIHByb3AsIGAke2xvY2F0aW9ufSR7bmFtZX1gLCB2YWwpO1xuICAgICAgICAgICAgcmV0dXJuICFpc0Vycm9yKHNoYXBlUHJvcEVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXNFcnJvcihzaGFwZVByb3BFcnJvcikpIHtcbiAgICAgICAgICByZXR1cm4gc2hhcGVQcm9wRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6ICdzaGFwZSd9LCBkaXNhYmxlZCk7XG5cbiAgICAgIGZ1bmN0aW9uIHN0cmljdFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0eXBlKC4uLmFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEuc3RyaWN0ID0gdHJ1ZTtcbiAgICAgIHNoYXBlQ2hlY2tlci5zdHJpY3QgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gc3RyaWN0U2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICAgIGlmIChpc0Vycm9yKHNoYXBlRXJyb3IpKSB7XG4gICAgICAgICAgcmV0dXJuIHNoYXBlRXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsb3dlZFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzaGFwZSk7XG4gICAgICAgIGNvbnN0IGV4dHJhUHJvcHMgPSBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihwcm9wID0+IGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPT09IC0xKTtcbiAgICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgICAgICAgIGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBjYW5ub3QgaGF2ZSBleHRyYSBwcm9wZXJ0aWVzOiAke3QoZXh0cmFQcm9wcy5qb2luKCdgLCBgJykpfS5gICtcbiAgICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LCB7dHlwZTogc3RyaWN0VHlwZSwgc2hvcnRUeXBlOiAnc3RyaWN0IHNoYXBlJ30sIGRpc2FibGVkKTtcblxuICAgICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgICB9XG5cbiAgICBzaGFwZUNoZWNrR2V0dGVyLmlmTm90ID0gZnVuY3Rpb24gaWZOb3Qob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGU7XG4gICAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIG5vdCBzcGVjaWZpZWRgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBub25lIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBpZk5vdENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgICAgbGV0IHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgICAgbGV0IG90aGVyUHJvcHNFeGlzdCA9IG90aGVyUHJvcHMuc29tZShvdGhlclByb3AgPT4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApKTtcbiAgICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgICB9XG4gICAgICB9LCB7bm90UmVxdWlyZWQ6IHRydWUsIHR5cGUsIHNob3J0VHlwZTogYGlmTm90WyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gfSwgZGlzYWJsZWQpO1xuICAgIH07XG5cbiAgICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgb3RoZXJQcm9wcyA9IGFycmF5aWZ5KG90aGVyUHJvcHMpO1xuICAgICAgbGV0IHR5cGU7XG4gICAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIGFsc28gc3BlY2lmaWVkYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmx5SWZDaGVja2VyRGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICAgIGlmICghb3RoZXJzUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6IGBvbmx5SWZbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9LCBkaXNhYmxlZCk7XG4gICAgfTtcblxuICAgIHNoYXBlQ2hlY2tHZXR0ZXIucmVxdWlyZWRJZk5vdCA9IGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgICB9XG4gICAgICBjb25zdCB0eXBlID0gYHNwZWNpZmllZCBpZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogJHt0KG90aGVyUHJvcHMuam9pbignLCAnKSl9IChvdGhlcndpc2UgaXQncyBvcHRpb25hbClgO1xuICAgICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICAgIHZhciBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICAgIHZhciBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUoZnVuY3Rpb24gKG90aGVyUHJvcCkge1xuICAgICAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIW90aGVyUHJvcHNFeGlzdCAmJiAhcHJvcEV4aXN0cykge1xuICAgICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgICB9XG4gICAgICB9LCB7dHlwZSwgbm90UmVxdWlyZWQ6IHRydWV9LCBkaXNhYmxlZCk7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tHZXR0ZXI7XG4gIH1cblxuICBmdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnZnVuY3Rpb24gYXJndW1lbnRzJztcbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfVxuICAgIH0sIHt0eXBlfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gICAgfSwge3R5cGU6ICdhbnknfSwgZGlzYWJsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbnVsbENoZWNrR2V0dGVyKCkge1xuICAgIGNvbnN0IHR5cGUgPSAnbnVsbCc7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBudWxsQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5nZUNoZWNrR2V0dGVyKG1pbiwgbWF4KSB7XG4gICAgY29uc3QgdHlwZSA9IGBSYW5nZSAoJHttaW59IC0gJHttYXh9KWA7XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiByYW5nZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICdudW1iZXInIHx8IHZhbCA8IG1pbiB8fCB2YWwgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZX0sIGRpc2FibGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5T2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gICAgY29uc3QgdHlwZSA9ICdlbXB0eSBvYmplY3QnO1xuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gZW1wdHlPYmplY3RDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcgfHwgdmFsID09PSBudWxsIHx8IE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9XG4gICAgfSwge3R5cGV9LCBkaXNhYmxlZCk7XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeTtcblxuZnVuY3Rpb24gZ2V0U2VyaWFsaXplIChmbiwgZGVjeWNsZSkge1xuICB2YXIgc2VlbiA9IFtdLCBrZXlzID0gW107XG4gIGRlY3ljbGUgPSBkZWN5Y2xlIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gJ1tDaXJjdWxhciAnICsgZ2V0UGF0aCh2YWx1ZSwgc2Vlbiwga2V5cykgKyAnXSdcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAgIGlmIChzZWVuLmluZGV4T2YodmFsdWUpICE9PSAtMSlcbiAgICAgICAgcmV0ID0gZGVjeWNsZShrZXksIHZhbHVlKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZuKSByZXQgPSBmbihrZXksIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoICh2YWx1ZSwgc2Vlbiwga2V5cykge1xuICB2YXIgaW5kZXggPSBzZWVuLmluZGV4T2YodmFsdWUpO1xuICB2YXIgcGF0aCA9IFsga2V5c1tpbmRleF0gXTtcbiAgZm9yIChpbmRleC0tOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKHNlZW5baW5kZXhdWyBwYXRoWzBdIF0gPT09IHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHNlZW5baW5kZXhdO1xuICAgICAgcGF0aC51bnNoaWZ0KGtleXNbaW5kZXhdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICd+JyArIHBhdGguam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCBmbiwgc3BhY2VzLCBkZWN5Y2xlKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIGdldFNlcmlhbGl6ZShmbiwgZGVjeWNsZSksIHNwYWNlcyk7XG59XG5cbnN0cmluZ2lmeS5nZXRTZXJpYWxpemUgPSBnZXRTZXJpYWxpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGktY2hlY2suanMifQ==