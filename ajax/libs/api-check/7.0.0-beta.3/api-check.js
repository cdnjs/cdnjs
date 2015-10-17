// apiCheck.js v7.0.0-beta.3 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	  each(checkers, function (checker, name) {
	    if (!additionalProperties.disabled && !module.exports.globalConfig.disabled || !checker.noop) {
	      apiCheck[name] = checker;
	    } else {
	      apiCheck[name] = checker.noop;
	    }
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
	 */
	function setupChecker(checker, properties) {
	  /* jshint maxcomplexity:7 */
	  checker.noop = noop; // do this first, so it can be overwritten.
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
	
	var checkers = module.exports = {
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
	  }, { type: type });
	}
	
	function funcCheckGetter() {
	  var type = "Function";
	  var functionChecker = setupChecker(function functionCheckerDefinition(val, name, location) {
	    if (typeOf(val) !== "function") {
	      return getError(name, location, type);
	    }
	  }, { type: type });
	
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
	    }, { type: shapeChecker.type, shortType: "func.withProperties" });
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
	  }, { type: nullType });
	
	  var objectChecker = setupChecker(function objectCheckerDefinition(val, name, location) {
	    if (val === null || isError(objectNullOkChecker(val, name, location))) {
	      return getError(name, location, objectChecker.type);
	    }
	  }, { type: type });
	
	  objectChecker.nullOk = objectNullOkChecker;
	
	  return objectChecker;
	}
	
	function instanceCheckGetter(classToCheck) {
	  return setupChecker(function instanceCheckerDefinition(val, name, location) {
	    if (!(val instanceof classToCheck)) {
	      return getError(name, location, classToCheck.name);
	    }
	  }, { type: classToCheck.name });
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
	  }, { type: type, shortType: shortType });
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
	  }, { type: type, shortType: shortType });
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
	  }, { type: type, shortType: shortType });
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
	  }, { type: type, shortType: shortType });
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
	  }, { type: type, shortType: shortType });
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
	    }, { type: type, shortType: "shape" });
	
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
	    }, { type: strictType, shortType: "strict shape" });
	
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
	    }, { notRequired: true, type: type, shortType: "ifNot[" + otherProps.join(", ") + "]" });
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
	    }, { type: type, shortType: "onlyIf[" + otherProps.join(", ") + "]" });
	  };
	
	  return shapeCheckGetter;
	}
	
	function argumentsCheckerGetter() {
	  var type = "function arguments";
	  return setupChecker(function argsCheckerDefinition(val, name, location) {
	    if (Array.isArray(val) || isError(checkers.object(val)) || isError(checkers.number(val.length))) {
	      return getError(name, location, type);
	    }
	  }, { type: type });
	}
	
	function anyCheckGetter() {
	  return setupChecker(function anyCheckerDefinition() {}, { type: "any" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1Mjk5ZDllYTNiYWYwMWJjN2NhYiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFFLFFBQVEsR0FBSSxZQUFZLENBQXhCLFFBQVE7O0FBQ3RFLEtBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQU0sWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFDOztBQUV2QyxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO0FBQ3JDLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztBQUNwQyxPQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRztBQUM1QixVQUFPLEVBQUUsS0FBSztBQUNkLFdBQVEsRUFBRSxLQUFLO0VBQ2hCLENBQUM7O0FBRUYsS0FBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztBQUMzQyxTQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDO0VBQzdCLENBQUMsQ0FBQztBQUNILE9BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDOztBQUdsRCxLQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUk7VUFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU87RUFBQSxDQUFDLENBQUM7O0FBRWxFLFVBQVMsbUJBQW1CLEdBQWtDO09BQWpDLE1BQU0sZ0NBQUcsRUFBRTtPQUFFLGFBQWEsZ0NBQUcsRUFBRTs7QUFDMUQsT0FBSSxnQkFBZ0IsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3hDLHFCQUFnQixTQUFNLENBQUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFLFNBQVMsRUFBRTtBQUMxRSxhQUFNLEVBQUUsK0JBQStCO01BQ3hDLENBQUMsQ0FBQztJQUNKOztBQUVELE9BQUksb0JBQW9CLEdBQUc7QUFDekIsY0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFNBQUksRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ3hCLG9CQUFlLEVBQWYsZUFBZTtBQUNmLHVCQUFrQixFQUFsQixrQkFBa0I7QUFDbEIsV0FBTSxFQUFFO0FBQ04sYUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUk7QUFDdkIsZUFBTSxFQUFFLEVBQUU7QUFDVixlQUFNLEVBQUUsRUFBRTtBQUNWLG9CQUFXLEVBQUUsRUFBRTtRQUNoQjtBQUNELGNBQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEtBQUs7QUFDaEMsZUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLElBQUksS0FBSztNQUNuQztBQUNELFVBQUssRUFBRSxZQUFZO0lBQ3BCLENBQUM7O0FBRUYsT0FBSSxDQUFDLG9CQUFvQixFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTztJQUFBLENBQUMsQ0FBQztBQUN4RSxPQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUksRUFBSztBQUNoQyxTQUFLLENBQUMsb0JBQW9CLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUM5RixlQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO01BQzFCLE1BQU07QUFDTCxlQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztNQUMvQjtJQUNGLENBQUMsQ0FBQztBQUNILE9BQUksQ0FBQyxhQUFhLEVBQUUsVUFBQyxPQUFPLEVBQUUsSUFBSTtZQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPO0lBQUEsQ0FBQyxDQUFDOztBQUVqRSxVQUFPLFFBQVEsQ0FBQzs7Ozs7Ozs7O0FBVWhCLFlBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFOztBQUVuQyxTQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtBQUNwRSxjQUFPO0FBQ0wsaUJBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUU7QUFDMUIsZUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtBQUN6QixlQUFNLEVBQUUsS0FBSztRQUNkLENBQUM7TUFDSDtBQUNELHFCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVCLFNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLFVBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1osV0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDZixNQUFNOztBQUVMLFdBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDekM7QUFDRCxTQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFDLFNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOztBQUVwQixlQUFRLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3hDOztBQUVELFNBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsU0FBSSxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ25CLG1CQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0UsbUJBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzNCLG1CQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztNQUM3QixNQUFNO0FBQ0wsbUJBQVksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQzFCLG1CQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUM1QixtQkFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7TUFDNUI7QUFDRCxZQUFPLFlBQVksQ0FBQztJQUNyQjs7Ozs7O0FBTUQsWUFBUyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7QUFDdEMsU0FBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFNBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixTQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFLLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVMsQ0FBQzs7QUFFakgsU0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3hDLGFBQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUN6QyxDQUFDLHNGQUFzRixDQUFDLEVBQ3hGLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxDQUNyQixDQUFDLENBQUM7TUFDSjs7QUFFRCxTQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDN0UsU0FBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ2pCLFdBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUU7QUFDNUYsZUFBTSxFQUFFLFVBQVU7UUFDbkIsQ0FBQyxDQUFDO0FBQ0gsZUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztNQUM1QztJQUNGOztBQUdELFlBQVMsV0FBVyxDQUFDLFdBQVcsRUFBRTtBQUNoQyxZQUFPLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2pELFdBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLGVBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELGNBQU8sTUFBTSxDQUFDO01BQ2YsQ0FBQztJQUNIOztBQUVELFlBQVMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRTtBQUNoRCxTQUFJLFdBQVcsSUFBSSxPQUFPLEVBQUU7QUFDMUIsYUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztNQUMxQixNQUFNLElBQUksT0FBTyxFQUFFO0FBQ2xCLGNBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDdkI7SUFDRjs7QUFFRCxZQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUE4QjtTQUE1QixRQUFRLGdDQUFHLEVBQUU7U0FBRSxNQUFNLGdDQUFHLEVBQUU7O0FBQzVELFNBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUN4QyxTQUFJLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztBQUN6QixTQUFJLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztBQUN6QixTQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUNuQixTQUFJLE9BQU8seUJBQXVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDeEQsU0FBSSx5QkFBeUIsR0FBRyxNQUFNLEdBQUcsMEJBQTBCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9FLFlBQU8sTUFBRyxNQUFNLFNBQUksT0FBTyxTQUFJLE1BQU0sVUFBSSxHQUFHLElBQUksRUFBRSxTQUFHLHlCQUF5QixFQUFHLElBQUksRUFBRSxDQUFDOztBQUV4RixjQUFTLFNBQVMsR0FBRztBQUNuQixXQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQy9CLFdBQUksQ0FBQyxNQUFNLEVBQUU7QUFDWCxlQUFNLEdBQUcsT0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsV0FBSSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUMvRDtBQUNELGNBQU8sTUFBTSxDQUFDO01BQ2Y7O0FBRUQsY0FBUyxTQUFTLEdBQUc7QUFDbkIsV0FBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUMvQixXQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZUFBTSxHQUFHLE9BQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLFdBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDL0Q7QUFDRCxjQUFPLE1BQU0sQ0FBQztNQUNmOztBQUVELGNBQVMsTUFBTSxHQUFHO0FBQ2hCLFdBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDckIsV0FBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFlBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBRyxJQUFJLENBQUMsV0FBVyxRQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUcsSUFBSSxFQUFFLENBQUM7UUFDL0Y7QUFDRCxjQUFPLEdBQUcsQ0FBQztNQUNaO0lBQ0Y7O0FBRUQsWUFBUywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO3FCQUNsQixRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs7U0FBekMsUUFBUSxhQUFSLFFBQVE7U0FBRSxRQUFRLGFBQVIsUUFBUTs7QUFDdkIsU0FBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNsRCxTQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDdkIsNEJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsU0FBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLGFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckMsYUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFckMsWUFBTyxlQUFlLEVBQUUsQ0FBQzs7OztBQUt6QixjQUFTLHVCQUF1QixDQUFDLEdBQUcsRUFBRTtBQUNwQyxXQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUksRUFBSzs7QUFFdkIsYUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOztBQUNyQyx3QkFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixlQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtBQUMzQixvQ0FBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixNQUFNLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO0FBQ3BDLGdCQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLG9CQUFvQixDQUFDO1lBQ2pFO1VBQ0Y7UUFDRixDQUFDLENBQUM7TUFDSjs7QUFFRCxjQUFTLGVBQWUsQ0FBQyxLQUFLLEVBQUU7QUFDOUIsV0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDM0IsZ0JBQU8sU0FBUyxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdEMsY0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQjtBQUNELGNBQU8sU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDbEM7O0FBRUQsY0FBUyxlQUFlLEdBQUc7QUFDekIsV0FBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2YsV0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFdBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzdCLGFBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQy9CLGVBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7VUFDdEMsTUFBTTtBQUNMLGVBQUksR0FBRyxLQUFLLENBQUM7VUFDZDtRQUNGO0FBQ0QsV0FBTSxLQUFLLGFBQVUsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUUsQ0FBQztBQUN2QyxXQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLGNBQU8sZ0JBQWMsQ0FBQyxRQUFHLFVBQVUsUUFBRyxPQUFPLGtCQUMvQixLQUFLLFNBQUksQ0FBQyxRQUFHLFFBQVEsUUFBRyxPQUFPLENBQUUsMkJBQ3hCLENBQUMsUUFBRyxRQUFRLENBQUUsQ0FBQztNQUN2QztJQUNGOztBQUVELFlBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDM0IsUUFBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixTQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLFNBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFLO0FBQ3pDLFdBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RSxjQUFPLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtBQUNoQyxjQUFLLEVBQUUsU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPO0FBQ2xGLFlBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ2hCLG1CQUFVLEVBQUUsSUFBSTtRQUNqQixDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7QUFDSCxTQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztjQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO01BQUEsQ0FBQyxDQUFDO0FBQ3pELFlBQU8sRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUMsQ0FBQztJQUN2QztFQUVGOzs7Ozs7Ozs7O0FBV0QsVUFBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFOztBQUVuQyxPQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsT0FBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE9BQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixPQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsT0FBSSxHQUFHO09BQUUsT0FBTztPQUFFLEdBQUc7T0FBRSxXQUFXO09BQUUsT0FBTztPQUFFLFNBQVM7T0FBRSxtQkFBbUIsYUFBQzs7QUFFNUUsVUFBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU8sRUFBRTtBQUNsRSxRQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDdkIsWUFBTyxHQUFHLFdBQVcsR0FBRyxRQUFRLElBQUksT0FBTyxDQUFDLFVBQVUsR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDN0UsUUFBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLGNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsZ0JBQVcsR0FBRyxZQUFZLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN6Qyx3QkFBbUIsR0FBRyxZQUFZLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQzNFLFNBQUssU0FBUyxJQUFJLFdBQVcsSUFBTSxTQUFTLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsbUJBQW9CLEVBQUU7QUFDNUcsYUFBTSxHQUFHLElBQUksQ0FBQztBQUNkLGVBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQzFELE1BQU0sSUFBSSxTQUFTLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUMxQyxlQUFRLEVBQUUsQ0FBQztNQUNaLE1BQU07QUFDTCxlQUFRLENBQUMsSUFBSSxNQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBVSxDQUFDO01BQ3ZDO0lBQ0Y7QUFDRCxVQUFPLE1BQU0sR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDO0VBQy9COztBQUdELGdCQUFlLENBQUMsSUFBSSxHQUFHLHVFQUF1RSxDQUFDO0FBQy9GLFVBQVMsZUFBZSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3BELE9BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN6QyxTQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDckIsYUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO0lBQ3hCLENBQUMsQ0FBQztBQUNILE9BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUMsY0FBYyxFQUFFLG1CQUFtQixFQUFDLENBQUMsQ0FBQztBQUNuRixPQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsY0FBYyxFQUFFLG1CQUFtQixFQUFDLENBQUMsQ0FBQztBQUN0RSxPQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQ3BDLE1BQU0sRUFBRSxPQUFPLENBQ2hCLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLE9BQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3ZCLFlBQU8sVUFBVSxDQUFDO0lBQ25CO0FBQ0QsT0FBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckcsWUFBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQ7RUFDRjs7QUFFRCxVQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO0FBQ2pELE9BQUksV0FBVyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDL0MsY0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFLLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxVQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0VBQ2xDOztBQUVELFVBQVMsY0FBYyxPQUFTLEdBQUcsRUFBRTtPQUFaLElBQUksUUFBSixJQUFJOztBQUMzQixPQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1QsWUFBTyxFQUFFLENBQUM7SUFDWDtBQUNELE9BQUksT0FBTyxJQUFJLEtBQUssVUFBVSxFQUFFO0FBQzlCLFNBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEI7QUFDRCxVQUFPLElBQUksQ0FBQztFQUNiOztBQUdELFVBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDbEMsT0FBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFDO1lBQUksQ0FBQyxDQUFDLENBQUMsVUFBVTtJQUFBLENBQUMsQ0FBQztBQUNsRCxPQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRTtBQUNyQyxZQUFPLENBQ0wsNENBQTRDLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FDM0csQ0FBQztJQUNILE1BQU07QUFDTCxZQUFPLEVBQUUsQ0FBQztJQUNYO0VBQ0Y7O0FBRUQsVUFBUyxhQUFhLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRTs7QUFFdEMsT0FBTSxLQUFLLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDN0QsT0FBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLE9BQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUN2QixTQUFJLE9BQU8sRUFBRSxFQUFFO0FBQ2IsV0FBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztBQUNwRCxjQUFPLEtBQUssR0FBRyxxQkFBcUIsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDO01BQ3pEO0FBQ0QsWUFBTyxLQUFLLENBQUM7SUFDZDs7QUFFRCxPQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7QUFDaEIsWUFBTyxNQUFNLENBQUM7SUFDZjs7QUFFRCxPQUFJLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUN6QyxZQUFPLElBQUksQ0FBQztJQUNiOztBQUVELE9BQUksT0FBTyxFQUFFLEVBQUU7QUFDYixZQUFPLHFCQUFxQixFQUFFLENBQUM7SUFDaEM7O0FBRUQsVUFBTyxLQUFLLENBQUM7OztBQUdiLFlBQVMsT0FBTyxHQUFHO0FBQ2pCLFlBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3ZDOztBQUVELFlBQVMscUJBQXFCLEdBQUc7QUFDL0IsU0FBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2xDLGNBQU8sWUFBWSxDQUFDO01BQ3JCO0FBQ0QsZUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixZQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEM7RUFDRjs7QUFFRCxVQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFO0FBQ25DLE9BQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNwQixPQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7SUFBQSxDQUFDLENBQUM7QUFDbEUsVUFBTyxVQUFVLENBQUM7RUFDbkI7O0FBRUQsVUFBUyxlQUFlLEdBQUc7QUFDekIsT0FBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7O0FBRXBDLE9BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDcEQsU0FBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUTtBQUNyRSxnQkFBVyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUTtBQUNyQyxjQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ25DLGdCQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRO0FBQ25DLGdCQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRO0lBQ3BDLENBQUMsQ0FBQzs7QUFFSCxPQUFNLDJCQUEyQixHQUFHLENBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDYixXQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNyQixhQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ2hDLGFBQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVE7QUFDaEMsa0JBQVcsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVE7TUFDdEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ2xCLFlBQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVE7QUFDL0IsYUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUTtJQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDbEIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FDN0MsQ0FBQzs7QUFFRixPQUFNLGdCQUFnQixHQUFHLENBQ3ZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFDeEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQ3JCLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDYixXQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUU7QUFDckMsZUFBVSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQUEsSUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ25CLENBQUM7O0FBRUYsVUFBTztBQUNMLHFCQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsZ0NBQTJCLEVBQTNCLDJCQUEyQjtBQUMzQixxQkFBZ0IsRUFBaEIsZ0JBQWdCO0lBQ2pCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDaGFKLEtBQU0sU0FBUyxHQUFHLG1CQUFPLENBQUMsNEJBQXFCLENBQUMsQ0FBQztBQUNqRCxLQUFNLGNBQWMsR0FBRztBQUNyQixjQUFXLEVBQVgsV0FBVyxFQUFFLGtCQUFrQixFQUFsQixrQkFBa0IsRUFBRSxZQUFZLEVBQVosWUFBWTtFQUM5QyxDQUFDOztBQUVGLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixPQUFJLEVBQUosSUFBSSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLGlCQUFpQixFQUFqQixpQkFBaUI7QUFDL0MsVUFBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsY0FBYyxFQUFkLGNBQWM7QUFDdkQsT0FBSSxFQUFKLElBQUk7RUFDTCxDQUFDOztBQUVGLFVBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNqQixPQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsT0FBSSxNQUFNLGFBQUM7QUFDWCxPQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDcEIsV0FBTSxHQUFHLEVBQUUsQ0FBQztJQUNiLE1BQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQzVCLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFDYixNQUFNO0FBQ0wsWUFBTyxHQUFHLENBQUM7SUFDWjtBQUNELE9BQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ3RCLFdBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFHRCxVQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDbkIsT0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQU8sT0FBTyxDQUFDO0lBQ2hCLE1BQU0sSUFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO0FBQ2hDLFlBQU8sUUFBUSxDQUFDO0lBQ2pCLE1BQU07QUFDTCxZQUFPLE9BQU8sR0FBRyxDQUFDO0lBQ25CO0VBQ0Y7O0FBRUQsVUFBUyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFOztBQUUzQyxPQUFJLE9BQU8sYUFBQztBQUNaLE9BQUksS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3JDLE9BQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDOUIsWUFBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDN0IsTUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7QUFDcEYsWUFBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsTUFBTTtBQUNMLFlBQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztJQUNuRjtBQUNELFVBQU8sT0FBTyxDQUFDO0VBQ2hCOztBQUVELFVBQVMsY0FBYyxPQUFTLE9BQU8sRUFBRTtPQUFoQixJQUFJLFFBQUosSUFBSTs7QUFDM0IsT0FBSSxPQUFPLElBQUksS0FBSyxVQUFVLEVBQUU7QUFDOUIsU0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztBQUN6QyxTQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsU0FBSTtBQUNGLHFDQUFjLElBQ2IsY0FBYyxDQUFDLElBQUksRUFBRyxTQUFTLENBQ2pDLENBQUM7SUFDSDtBQUNELFVBQU8sSUFBSSxDQUFDO0VBQ2I7O0FBRUQsVUFBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3JCLE9BQUksQ0FBQyxHQUFHLEVBQUU7QUFDUixZQUFPLEVBQUUsQ0FBQztJQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLFlBQU8sR0FBRyxDQUFDO0lBQ1osTUFBTTtBQUNMLFlBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkO0VBQ0Y7O0FBR0QsVUFBUyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDcEMsT0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQU8sUUFBUSxrQkFBSSxTQUFTLENBQUMsQ0FBQztJQUMvQixNQUFNO0FBQ0wsWUFBTyxPQUFPLGtCQUFJLFNBQVMsQ0FBQyxDQUFDO0lBQzlCO0VBQ0Y7O0FBRUQsVUFBUyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDdkMsT0FBSSxHQUFHLENBQUM7QUFDUixPQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUM3QyxRQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUNuQixTQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ3pCLFVBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELFdBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtBQUNqQixnQkFBTyxHQUFHLENBQUM7UUFDWjtNQUNGO0lBQ0Y7QUFDRCxVQUFPLElBQUksQ0FBQztFQUNiOztBQUVELFVBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3hDLE9BQUksR0FBRyxDQUFDO0FBQ1IsT0FBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN4QixRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9CLFFBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLFNBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtBQUNqQixjQUFPLEdBQUcsQ0FBQztNQUNaO0lBQ0Y7QUFDRCxVQUFPLElBQUksQ0FBQztFQUNiOztBQUVELFVBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNwQixVQUFPLEdBQUcsWUFBWSxLQUFLLENBQUM7RUFDN0I7O0FBRUQsVUFBUyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDbkMsT0FBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixPQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEIsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE9BQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDckIsU0FBSSxHQUFHLEdBQUcsQ0FBQztJQUNaO0FBQ0QsVUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxFQUFFLFNBQUcsSUFBSSxDQUFFLENBQUM7RUFDMUU7O0FBR0QsVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFDN0MsT0FBTSxVQUFVLEdBQUcsT0FBTyxXQUFXLEtBQUssUUFBUSxHQUFHLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUYsVUFBTyxJQUFJLEtBQUssTUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxpQkFBWSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUcsQ0FBQztFQUN0RTs7QUFFRCxVQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzVCLE9BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUM7QUFDakMsT0FBSSxTQUFTLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsZUFBVSxLQUFLLFFBQUcsU0FBUyxDQUFHO0VBQy9COztBQUVELFVBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRTtBQUNoQixVQUFPLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO0VBQzFCOztBQUVELFVBQVMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNwQixVQUFPLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQztFQUNyQzs7QUFLRCxVQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDNUIsWUFBUyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQy9DLFNBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDZixjQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztNQUMxQztJQUNGOztBQUVELFlBQVMsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDbEMsT0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsYUFBRztZQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQUEsQ0FBQyxDQUFDOztBQUdyRSxnQkFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDaEMsZ0JBQWEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7OztBQUloRSxVQUFPLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQzs7Ozs7QUFLakMsT0FBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUM3QyxZQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxNQUFNLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7QUFDdEQsWUFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUNqQyxjQUFPLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxFQUFTLFNBQVMsQ0FBQyxDQUFDO01BQ25DLENBQUM7SUFDSCxNQUFNO0FBQ0wsWUFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDO0FBQ3ZDLFlBQU87SUFDUjtBQUNELFVBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0UsVUFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7RUFDdEQ7Ozs7Ozs7O0FBUUQsVUFBUyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRTs7QUFFekMsVUFBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDcEIsT0FBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQ3BDLFlBQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNsQzs7O0FBR0QsT0FBSSxDQUFDLFVBQVUsRUFBRSxVQUFDLElBQUksRUFBRSxJQUFJO1lBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7SUFBQSxDQUFDLENBQUM7O0FBRXZELE9BQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO0FBQ3hCLFlBQU8sQ0FBQyxXQUFXLGlCQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBZSxDQUFDO0lBQ3ZHOztBQUVELE9BQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO0FBQ3hCLFlBQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2Qzs7QUFFRCxPQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUN4QixnQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCO0FBQ0QsVUFBTyxPQUFPLENBQUM7RUFDaEI7O0FBRUQsVUFBUyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7QUFDbkMsWUFBUyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ2pELFNBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNyQyxXQUFJLFNBQVMsR0FBRyxRQUFRLFlBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFLLEVBQUUsQ0FBQztBQUNyRCxXQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUN2RCxXQUFNLFVBQVUsR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRSxjQUFPLElBQUksS0FBSyxlQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQWlCLFNBQVMsa0JBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFHLENBQUM7TUFDN0YsTUFBTTtBQUNMLGNBQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO01BQzFDO0lBQ0Y7QUFDRCxZQUFTLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3BDLFVBQU8sZUFBZSxDQUFDO0VBQ3hCOztBQUVELFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDNUIsT0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBRztZQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQUEsQ0FBQyxDQUFDO0VBQ3JEOztBQUVELFVBQVMsSUFBSSxHQUFHLEU7Ozs7Ozs7Ozs7O0FDdE9oQixLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7O2dCQUszQyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDOztLQUg3QixNQUFNLFlBQU4sTUFBTTtLQUFFLElBQUksWUFBSixJQUFJO0tBQUUsSUFBSSxZQUFKLElBQUk7S0FBRSxpQkFBaUIsWUFBakIsaUJBQWlCO0tBQUUsT0FBTyxZQUFQLE9BQU87S0FDOUMsUUFBUSxZQUFSLFFBQVE7S0FBRSxJQUFJLFlBQUosSUFBSTtLQUFFLFFBQVEsWUFBUixRQUFRO0tBQUUsSUFBSSxZQUFKLElBQUk7S0FBRSxDQUFDLFlBQUQsQ0FBQztLQUFFLGNBQWMsWUFBZCxjQUFjO0tBQ2pELEtBQUssWUFBTCxLQUFLO0tBRUEsWUFBWSxHQUFJLGNBQWMsQ0FBOUIsWUFBWTs7QUFFbkIsS0FBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUM5QixRQUFLLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0FBQ2pDLE9BQUksRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7QUFDbEMsU0FBTSxFQUFFLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztBQUNuQyxTQUFNLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDO0FBQ25DLE9BQUksRUFBRSxlQUFlLEVBQUU7QUFDdkIsU0FBTSxFQUFFLGlCQUFpQixFQUFFOztBQUUzQixhQUFVLEVBQUUsbUJBQW1CO0FBQy9CLFFBQUssRUFBRSxnQkFBZ0I7QUFDdkIsWUFBUyxFQUFFLG9CQUFvQjs7QUFFL0IsVUFBTyxFQUFFLGtCQUFrQjtBQUMzQixXQUFRLEVBQUUsbUJBQW1CO0FBQzdCLGdCQUFhLEVBQUUsd0JBQXdCOztBQUV2QyxRQUFLLEVBQUUsbUJBQW1CLEVBQUU7QUFDNUIsT0FBSSxFQUFFLHNCQUFzQixFQUFFOztBQUU5QixNQUFHLEVBQUUsY0FBYyxFQUFFO0VBQ3RCLENBQUM7O0FBRUYsVUFBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUU7QUFDL0IsT0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLFVBQU8sWUFBWSxDQUFDLFNBQVMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDeEUsU0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQ3pCLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkM7SUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7RUFDWjs7QUFFRCxVQUFTLGVBQWUsR0FBRztBQUN6QixPQUFNLElBQUksR0FBRyxVQUFVLENBQUM7QUFDeEIsT0FBSSxlQUFlLEdBQUcsWUFBWSxDQUFDLFNBQVMseUJBQXlCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDekYsU0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQzlCLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkM7SUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7O0FBRVgsa0JBQWUsQ0FBQyxjQUFjLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQyxVQUFVLEVBQUU7QUFDN0UsU0FBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzVHLFNBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3JCLGFBQU0sUUFBUSxDQUFDO01BQ2hCO0FBQ0QsU0FBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsaUJBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQzs7QUFFOUQsWUFBTyxZQUFZLENBQUMsU0FBUyw2QkFBNkIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM5RSxXQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkQsV0FBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDeEIsZ0JBQU8sV0FBVyxDQUFDO1FBQ3BCO0FBQ0QsY0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztNQUMxQyxFQUFFLEVBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0FBQ0YsVUFBTyxlQUFlLENBQUM7RUFDeEI7O0FBRUQsVUFBUyxpQkFBaUIsR0FBRztBQUMzQixPQUFNLElBQUksR0FBRyxRQUFRLENBQUM7QUFDdEIsT0FBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUM7QUFDcEMsT0FBSSxtQkFBbUIsR0FBRyxZQUFZLENBQUMsU0FBUyw2QkFBNkIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNqRyxTQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7QUFDNUIsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztNQUMzQztJQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQzs7QUFFckIsT0FBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLFNBQVMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDckYsU0FBSSxHQUFHLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDckUsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDckQ7SUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7O0FBRVgsZ0JBQWEsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7O0FBRTNDLFVBQU8sYUFBYSxDQUFDO0VBQ3RCOztBQUdELFVBQVMsbUJBQW1CLENBQUMsWUFBWSxFQUFFO0FBQ3pDLFVBQU8sWUFBWSxDQUFDLFNBQVMseUJBQXlCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDMUUsU0FBSSxFQUFFLEdBQUcsWUFBWSxZQUFZLENBQUMsRUFBRTtBQUNsQyxjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNwRDtJQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7RUFDL0I7O0FBRUQsVUFBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7QUFDL0IsT0FBTSxJQUFJLEdBQUc7QUFDWCxtQkFBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDO0FBQy9DLGFBQU0sS0FBSztJQUNaLENBQUM7QUFDRixPQUFNLFNBQVMsY0FBWSxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQUc7WUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBRyxDQUFDO0FBQzFFLFVBQU8sWUFBWSxDQUFDLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDdkUsU0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBRztjQUFJLEdBQUcsS0FBSyxHQUFHO01BQUEsQ0FBQyxFQUFFO0FBQ25DLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDNUM7SUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUMsQ0FBQztFQUN2Qjs7QUFFRCxVQUFTLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtBQUN0QyxPQUFNLElBQUksR0FBRztBQUNYLG1CQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUM7QUFDcEQsY0FBUyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO2NBQUssaUJBQWlCLENBQUMsT0FBTyxDQUFDO01BQUEsQ0FBQztJQUNqRSxDQUFDO0FBQ0YsT0FBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU87WUFBSyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFBQSxDQUFDLENBQUM7QUFDN0YsT0FBTSxTQUFTLGtCQUFnQixlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFHLENBQUM7QUFDN0QsVUFBTyxZQUFZLENBQUMsU0FBUywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUMzRSxTQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBTztjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO01BQUEsQ0FBQyxFQUFFO0FBQ3JFLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDNUM7SUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUMsQ0FBQztFQUN2Qjs7QUFFRCxVQUFTLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtBQUNuQyxPQUFNLElBQUksR0FBRztBQUNYLG1CQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7QUFDbEQsWUFBTyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0FBQ0YsT0FBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDakUsT0FBTSxTQUFTLGdCQUFjLGNBQWMsTUFBRyxDQUFDO0FBQy9DLFVBQU8sWUFBWSxDQUFDLFNBQVMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDekUsU0FBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUk7Y0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7TUFBQSxDQUFDLEVBQUU7QUFDakYsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztNQUM1QztJQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUMsQ0FBQyxDQUFDO0VBQ3ZCOztBQUVELFVBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFFO0FBQ3BDLE9BQU0sSUFBSSxHQUFHO0FBQ1gsbUJBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQztBQUNuRCxhQUFRLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7QUFDRixPQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUNqRSxPQUFNLFNBQVMsaUJBQWUsY0FBYyxNQUFHLENBQUM7QUFDaEQsVUFBTyxZQUFZLENBQUMsU0FBUyx5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUMxRSxTQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkQsU0FBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDdEIsY0FBTyxTQUFTLENBQUM7TUFDbEI7QUFDRCxTQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBSztBQUMvQyxXQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3JDLGdCQUFPLEtBQUssQ0FBQztRQUNkO01BQ0YsQ0FBQyxDQUFDO0FBQ0gsU0FBSSxDQUFDLGVBQWUsRUFBRTtBQUNwQixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQzVDO0lBQ0YsRUFBRSxFQUFDLElBQUksRUFBSixJQUFJLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDLENBQUM7RUFDdkI7O0FBRUQsVUFBUyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUU7QUFDekMsT0FBTSxJQUFJLEdBQUc7QUFDWCxtQkFBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDO0FBQ3hELGtCQUFhLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0lBQzFDLENBQUM7QUFDRixPQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUNqRSxPQUFNLFNBQVMsc0JBQW9CLGNBQWMsTUFBRyxDQUFDO0FBQ3JELFVBQU8sWUFBWSxDQUFDLFNBQVMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQzdFLFNBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQzVDO0lBQ0YsRUFBRSxFQUFDLElBQUksRUFBSixJQUFJLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDLENBQUM7RUFDdkI7O0FBRUQsVUFBUyxtQkFBbUIsR0FBRztBQUM3QixZQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDMUMsU0FBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFLO0FBQzdCLGlCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDL0MsQ0FBQyxDQUFDO0FBQ0gsY0FBUyxJQUFJLEdBQWU7V0FBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQ3hCLFdBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztXQUNOLEtBQUssR0FBcUIsT0FBTyxDQUFqQyxLQUFLO1dBQUUsR0FBRyxHQUFnQixPQUFPLENBQTFCLEdBQUc7V0FBRSxVQUFVLEdBQUksT0FBTyxDQUFyQixVQUFVOztBQUM3QixXQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3hDLFdBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFLOztBQUU3QixhQUFNLFNBQVMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxhQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztBQUM5RSxhQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNoRCxjQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFMLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLFVBQVUsRUFBVixVQUFVLEVBQUMsQ0FBQyxDQUFDO1VBQzlGO0FBQ0QsYUFBSSxVQUFVLEVBQUU7QUFDZCxxQ0FBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7VUFDckU7UUFDRixDQUFDLENBQUM7QUFDSCxjQUFPLEdBQUcsQ0FBQzs7QUFFWCxnQkFBUywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQzNFLGFBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNqRCxlQUFJLElBQUksR0FBRyxNQUFNLENBQUM7QUFDbEIsZUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQy9DLGlCQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZEO0FBQ0Qsb0JBQVMsQ0FDUCxTQUFTLEVBQUUsZUFBZSxHQUFHLElBQUksRUFBRSwyQkFBMkIsQ0FDL0QsQ0FBQztVQUNILE1BQU0sSUFBSSxTQUFTLEVBQUU7QUFDcEIsZUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELGVBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xCLHNCQUFTLENBQUMsT0FBTyxFQUFFLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNHO1VBQ0Y7O0FBRUQsa0JBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ3pELGVBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQ2pDLGdCQUFHLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDO1lBQzVCLE1BQU07QUFDTCxnQkFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDcEQ7VUFDRjtRQUNGO01BQ0Y7O0FBRUQsU0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDdEUsU0FBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7O0FBRW5GLFdBQUksUUFBUSxHQUFHLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRSxXQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNyQixnQkFBTyxRQUFRLENBQUM7UUFDakI7QUFDRCxXQUFJLGNBQWMsYUFBQztBQUNuQixlQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN4RCxXQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNsQixXQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUksRUFBSztBQUM3QixhQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO0FBQ25ELHlCQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE9BQUssUUFBUSxRQUFHLElBQUksRUFBSSxHQUFHLENBQUMsQ0FBQztBQUNyRSxrQkFBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztVQUNqQztRQUNGLENBQUMsQ0FBQztBQUNILFdBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQzNCLGdCQUFPLGNBQWMsQ0FBQztRQUN2QjtNQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDOztBQUUvQixjQUFTLFVBQVUsR0FBRztBQUNwQixjQUFPLElBQUksa0JBQUksU0FBUyxDQUFDLENBQUM7TUFDM0I7O0FBRUQsZUFBVSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNuRSxlQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDeEMsaUJBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFNBQVMsNEJBQTRCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDNUYsV0FBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsV0FBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDdkIsZ0JBQU8sVUFBVSxDQUFDO1FBQ25CO0FBQ0QsV0FBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLFdBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQUk7Z0JBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUMsQ0FBQztBQUMzRixXQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDckIsZ0JBQU8sSUFBSSxLQUFLLENBQ2QsS0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyx1Q0FBa0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsZ0NBQy9ELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxDQUN4RCxDQUFDO1FBQ0g7TUFDRixFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQzs7QUFFbEQsWUFBTyxZQUFZLENBQUM7SUFDckI7O0FBRUQsbUJBQWdCLENBQUMsS0FBSyxHQUFHLFNBQVMsS0FBSyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFDL0QsU0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDOUIsaUJBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO01BQzNCO0FBQ0QsU0FBSSxJQUFJLGFBQUM7QUFDVCxTQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzNCLFdBQUksMEJBQXdCLFVBQVUsQ0FBQyxDQUFDLENBQUMsc0JBQW1CLENBQUM7TUFDOUQsTUFBTTtBQUNMLFdBQUksZ0VBQThELElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFHLENBQUM7TUFDckc7QUFDRCxZQUFPLFlBQVksQ0FBQyxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7QUFDdkUsV0FBSSxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsV0FBSSxlQUFlLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBUztnQkFBSSxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFBQSxDQUFDLENBQUM7QUFDekYsV0FBSSxVQUFVLEtBQUssZUFBZSxFQUFFO0FBQ2xDLGdCQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sSUFBSSxVQUFVLEVBQUU7QUFDckIsZ0JBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25EO01BQ0YsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxTQUFTLGFBQVcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBRyxFQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDOztBQUVGLG1CQUFnQixDQUFDLE1BQU0sR0FBRyxTQUFTLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQ2pFLGVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEMsU0FBSSxJQUFJLGFBQUM7QUFDVCxTQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzNCLFdBQUksMEJBQXdCLFVBQVUsQ0FBQyxDQUFDLENBQUMsdUJBQW9CLENBQUM7TUFDL0QsTUFBTTtBQUNMLFdBQUksK0RBQTZELElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFHLENBQUM7TUFDcEc7QUFDRCxZQUFPLFlBQVksQ0FBQyxTQUFTLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUNsRixXQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQUk7Z0JBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFBQSxDQUFDLENBQUM7QUFDekUsV0FBSSxDQUFDLGFBQWEsRUFBRTtBQUNsQixnQkFBTyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxNQUFNO0FBQ0wsZ0JBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25EO01BQ0YsRUFBRSxFQUFDLElBQUksRUFBSixJQUFJLEVBQUUsU0FBUyxjQUFZLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7QUFFRixVQUFPLGdCQUFnQixDQUFDO0VBQ3pCOztBQUVELFVBQVMsc0JBQXNCLEdBQUc7QUFDaEMsT0FBTSxJQUFJLEdBQUcsb0JBQW9CLENBQUM7QUFDbEMsVUFBTyxZQUFZLENBQUMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN0RSxTQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3ZDO0lBQ0YsRUFBRSxFQUFDLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUFDO0VBQ1o7O0FBRUQsVUFBUyxjQUFjLEdBQUc7QUFDeEIsVUFBTyxZQUFZLENBQUMsU0FBUyxvQkFBb0IsR0FBRyxFQUVuRCxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7RUFDbkI7Ozs7Ozs7Ozs7O0FDbFVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDUyOTlkOWVhM2JhZjAxYmM3Y2FiXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FwaUNoZWNrJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcbmNvbnN0IGFwaUNoZWNrVXRpbCA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7ZWFjaCwgaXNFcnJvciwgdCwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCB0eXBlT2YsIGdldEVycm9yfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xuY29uc3QgYXBpQ2hlY2tBcGlzID0gZ2V0QXBpQ2hlY2tBcGlzKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZTtcbm1vZHVsZS5leHBvcnRzLnV0aWxzID0gYXBpQ2hlY2tVdGlsO1xubW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnID0ge1xuICB2ZXJib3NlOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlXG59O1xuXG5jb25zdCBhcGlDaGVja0FwaUNoZWNrID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZSh7XG4gIG91dHB1dDoge3ByZWZpeDogJ2FwaUNoZWNrJ31cbn0pO1xubW9kdWxlLmV4cG9ydHMuaW50ZXJuYWxDaGVja2VyID0gYXBpQ2hlY2tBcGlDaGVjaztcblxuXG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tJbnN0YW5jZShjb25maWcgPSB7fSwgZXh0cmFDaGVja2VycyA9IHt9KSB7XG4gIGlmIChhcGlDaGVja0FwaUNoZWNrICYmIGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBhcGlDaGVja0FwaUNoZWNrLnRocm93KGFwaUNoZWNrQXBpcy5nZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsIGFyZ3VtZW50cywge1xuICAgICAgcHJlZml4OiAnY3JlYXRpbmcgYW4gYXBpQ2hlY2sgaW5zdGFuY2UnXG4gICAgfSk7XG4gIH1cblxuICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7XG4gICAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICAgIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcbiAgICBnZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFuZGxlRXJyb3JNZXNzYWdlLFxuICAgIGNvbmZpZzoge1xuICAgICAgb3V0cHV0OiBjb25maWcub3V0cHV0IHx8IHtcbiAgICAgICAgcHJlZml4OiAnJyxcbiAgICAgICAgc3VmZml4OiAnJyxcbiAgICAgICAgZG9jc0Jhc2VVcmw6ICcnXG4gICAgICB9LFxuICAgICAgdmVyYm9zZTogY29uZmlnLnZlcmJvc2UgfHwgZmFsc2UsXG4gICAgICBkaXNhYmxlZDogY29uZmlnLmRpc2FibGVkIHx8IGZhbHNlXG4gICAgfSxcbiAgICB1dGlsczogYXBpQ2hlY2tVdGlsXG4gIH07XG5cbiAgZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gd3JhcHBlcik7XG4gIGVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiB7XG4gICAgaWYgKCghYWRkaXRpb25hbFByb3BlcnRpZXMuZGlzYWJsZWQgJiYgIW1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZCkgfHwgIWNoZWNrZXIubm9vcCkge1xuICAgICAgYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIubm9vcDtcbiAgICB9XG4gIH0pO1xuICBlYWNoKGV4dHJhQ2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuXG4gIHJldHVybiBhcGlDaGVjaztcblxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBpbnN0YW5jZSBmdW5jdGlvbi4gT3RoZXIgdGhpbmdzIGFyZSBhdHRhY2hlZCB0byB0aGlzIHNlZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYWJvdmUuXG4gICAqIEBwYXJhbSBhcGkge0FycmF5fVxuICAgKiBAcGFyYW0gYXJncyB7YXJndW1lbnRzfVxuICAgKiBAcGFyYW0gb3V0cHV0IHtPYmplY3R9XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gaWYgdGhpcyBoYXMgYSBmYWlsZWQgPSB0cnVlIHByb3BlcnR5LCB0aGVuIGl0IGZhaWxlZFxuICAgKi9cbiAgZnVuY3Rpb24gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo4ICovXG4gICAgaWYgKGFwaUNoZWNrLmNvbmZpZy5kaXNhYmxlZCB8fCBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwaVR5cGVzOiB7fSwgYXJnVHlwZXM6IHt9LFxuICAgICAgICBwYXNzZWQ6IHRydWUsIG1lc3NhZ2U6ICcnLFxuICAgICAgICBmYWlsZWQ6IGZhbHNlXG4gICAgICB9OyAvLyBlbXB0eSB2ZXJzaW9uIG9mIHdoYXQgaXMgbm9ybWFsbHkgcmV0dXJuZWRcbiAgICB9XG4gICAgY2hlY2tBcGlDaGVja0FwaShhcmd1bWVudHMpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcGkpKSB7XG4gICAgICBhcGkgPSBbYXBpXTtcbiAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHR1cm4gYXJndW1lbnRzIGludG8gYW4gYXJyYXlcbiAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2VzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHRoaXMgaXMgd2hlcmUgd2UgYWN0dWFsbHkgZ28gcGVyZm9ybSB0aGUgY2hlY2tzLlxuICAgICAgbWVzc2FnZXMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncyk7XG4gICAgfVxuXG4gICAgbGV0IHJldHVybk9iamVjdCA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcywgb3V0cHV0KTtcbiAgICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9ICcnO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tBcGlDaGVja0FwaSwgc2hvdWxkIGJlIHJlYWQgbGlrZTogY2hlY2sgYXBpQ2hlY2sgYXBpLiBBcyBpbiwgY2hlY2sgdGhlIGFwaSBmb3IgYXBpQ2hlY2sgOi0pXG4gICAqIEBwYXJhbSBjaGVja0FwaUFyZ3NcbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrQXBpQ2hlY2tBcGkoY2hlY2tBcGlBcmdzKSB7XG4gICAgY29uc3QgYXBpID0gY2hlY2tBcGlBcmdzWzBdO1xuICAgIGNvbnN0IGFyZ3MgPSBjaGVja0FwaUFyZ3NbMV07XG4gICAgdmFyIGlzQXJyYXlPckFyZ3MgPSBBcnJheS5pc0FycmF5KGFyZ3MpIHx8IChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYXJncy5sZW5ndGggPT09ICdudW1iZXInKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGFwaSkgJiYgIWlzQXJyYXlPckFyZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoYXBpLCBbYXJnc10sXG4gICAgICAgIFsnSWYgYW4gYXJyYXkgaXMgcHJvdmlkZWQgZm9yIHRoZSBhcGksIGFuIGFycmF5IG11c3QgYmUgcHJvdmlkZWQgZm9yIHRoZSBhcmdzIGFzIHdlbGwuJ10sXG4gICAgICAgIHtwcmVmaXg6ICdhcGlDaGVjayd9XG4gICAgICApKTtcbiAgICB9XG4gICAgLy8gZG9nIGZvb2RpbmcgaGVyZVxuICAgIGNvbnN0IGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncywgZXJyb3JzLCB7XG4gICAgICAgIHByZWZpeDogJ2FwaUNoZWNrJ1xuICAgICAgfSk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBnZXRBcGlDaGVjayhzaG91bGRUaHJvdykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAgIGxldCByZXN1bHQgPSBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UsIHNob3VsZFRocm93KTtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIHdvbnQgZ2V0IGhlcmUgaWYgYW4gZXJyb3IgaXMgdGhyb3duXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCBzaG91bGRUaHJvdykge1xuICAgIGlmIChzaG91bGRUaHJvdyAmJiBtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMgPSBbXSwgb3V0cHV0ID0ge30pIHtcbiAgICBsZXQgZ091dCA9IGFwaUNoZWNrLmNvbmZpZy5vdXRwdXQgfHwge307XG4gICAgbGV0IHByZWZpeCA9IGdldFByZWZpeCgpO1xuICAgIGxldCBzdWZmaXggPSBnZXRTdWZmaXgoKTtcbiAgICBsZXQgdXJsID0gZ2V0VXJsKCk7XG4gICAgbGV0IG1lc3NhZ2UgPSBgYXBpQ2hlY2sgZmFpbGVkISAke21lc3NhZ2VzLmpvaW4oJywgJyl9YDtcbiAgICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fSAke21lc3NhZ2V9ICR7c3VmZml4fSAke3VybCB8fCAnJ30ke3Bhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWR9YC50cmltKCk7XG5cbiAgICBmdW5jdGlvbiBnZXRQcmVmaXgoKSB7XG4gICAgICBsZXQgcHJlZml4ID0gb3V0cHV0Lm9ubHlQcmVmaXg7XG4gICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICBwcmVmaXggPSBgJHtnT3V0LnByZWZpeCB8fCAnJ30gJHtvdXRwdXQucHJlZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdWZmaXgoKSB7XG4gICAgICBsZXQgc3VmZml4ID0gb3V0cHV0Lm9ubHlTdWZmaXg7XG4gICAgICBpZiAoIXN1ZmZpeCkge1xuICAgICAgICBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1ZmZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVcmwoKSB7XG4gICAgICBsZXQgdXJsID0gb3V0cHV0LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IGdPdXQuZG9jc0Jhc2VVcmwgJiYgb3V0cHV0LnVybFN1ZmZpeCAmJiBgJHtnT3V0LmRvY3NCYXNlVXJsfSR7b3V0cHV0LnVybFN1ZmZpeH1gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKSB7XG4gICAgbGV0IHthcGlUeXBlcywgYXJnVHlwZXN9ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBsZXQgY29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MgfHwgW10pO1xuICAgIGxldCByZXBsYWNlZEl0ZW1zID0gW107XG4gICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUoY29weSk7XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGdldE9iamVjdFN0cmluZyhjb3B5KTtcbiAgICBhcmdUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcmdUeXBlcyk7XG4gICAgYXBpVHlwZXMgPSBnZXRPYmplY3RTdHJpbmcoYXBpVHlwZXMpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRlTWVzc2FnZSgpO1xuXG5cbiAgICAvLyBmdW5jdGlvbnNcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VGdW5jdGlvbldpdGhOYW1lKG9iaikge1xuICAgICAgZWFjaChvYmosICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBpZiAocmVwbGFjZWRJdGVtcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7IC8vIGF2b2lkIHJlY3Vyc2l2ZSBwcm9ibGVtc1xuICAgICAgICAgIHJlcGxhY2VkSXRlbXMucHVzaCh2YWwpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbC5kaXNwbGF5TmFtZSB8fCB2YWwubmFtZSB8fCAnYW5vbnltb3VzIGZ1bmN0aW9uJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9iamVjdFN0cmluZyh0eXBlcykge1xuICAgICAgaWYgKCF0eXBlcyB8fCAhdHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnbm90aGluZyc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVzICYmIHR5cGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlcyA9IHR5cGVzWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmluZ2lmeSh0eXBlcywgbnVsbCwgMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVNZXNzYWdlKCkge1xuICAgICAgY29uc3QgbiA9ICdcXG4nO1xuICAgICAgbGV0IHVzZVMgPSB0cnVlO1xuICAgICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHVzZVMgPSAhIU9iamVjdC5rZXlzKGFyZ3NbMF0pLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1c2VTID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGVzID0gYHR5cGUke3VzZVMgPyAncycgOiAnJ31gO1xuICAgICAgY29uc3QgbmV3TGluZSA9IG4gKyBuO1xuICAgICAgcmV0dXJuIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9JHtuZXdMaW5lfWAgK1xuICAgICAgICBgV2l0aCB0aGUgJHt0eXBlc306JHtufSR7YXJnVHlwZXN9JHtuZXdMaW5lfWAgK1xuICAgICAgICBgVGhlIEFQSSBjYWxscyBmb3I6JHtufSR7YXBpVHlwZXN9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlcyhhcGksIGFyZ3MpIHtcbiAgICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICAgIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgICBsZXQgYXBpVHlwZXMgPSBhcGkubWFwKChjaGVja2VyLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3BlY2lmaWVkID0gbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmhhc093blByb3BlcnR5KCd2ZXJib3NlJyk7XG4gICAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge1xuICAgICAgICB0ZXJzZTogc3BlY2lmaWVkID8gIW1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy52ZXJib3NlIDogIWFwaUNoZWNrLmNvbmZpZy52ZXJib3NlLFxuICAgICAgICBvYmo6IGFyZ3NbaW5kZXhdLFxuICAgICAgICBhZGRIZWxwZXJzOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBsZXQgYXJnVHlwZXMgPSBhcmdzLm1hcCgoYXJnKSA9PiBnZXRBcmdEaXNwbGF5KGFyZywgW10pKTtcbiAgICByZXR1cm4ge2FyZ1R5cGVzOiBhcmdUeXBlcywgYXBpVHlwZXN9O1xuICB9XG5cbn1cblxuXG4vLyBTVEFURUxFU1MgRlVOQ1RJT05TXG5cbi8qKlxuICogVGhpcyBpcyB3aGVyZSB0aGUgbWFnaWMgaGFwcGVucyBmb3IgYWN0dWFsbHkgY2hlY2tpbmcgdGhlIGFyZ3VtZW50cyB3aXRoIHRoZSBhcGkuXG4gKiBAcGFyYW0gYXBpIHtBcnJheX0gLSBjaGVja2Vyc1xuICogQHBhcmFtIGFyZ3Mge0FycmF5fSAtIGFuZCBhcmd1bWVudHMgb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IG1lc3NhZ2VzID0gW107XG4gIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgbGV0IGNoZWNrZXJJbmRleCA9IDA7XG4gIGxldCBhcmdJbmRleCA9IDA7XG4gIGxldCBhcmcsIGNoZWNrZXIsIHJlcywgbGFzdENoZWNrZXIsIGFyZ05hbWUsIGFyZ0ZhaWxlZCwgc2tpcFByZXZpb3VzQ2hlY2tlcjtcbiAgLyoganNoaW50IC1XMDg0ICovXG4gIHdoaWxlICgoY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK10pICYmIChhcmdJbmRleCA8IGFyZ3MubGVuZ3RoKSkge1xuICAgIGFyZyA9IGFyZ3NbYXJnSW5kZXgrK107XG4gICAgYXJnTmFtZSA9ICdBcmd1bWVudCAnICsgYXJnSW5kZXggKyAoY2hlY2tlci5pc09wdGlvbmFsID8gJyAob3B0aW9uYWwpJyA6ICcnKTtcbiAgICByZXMgPSBjaGVja2VyKGFyZywgJ3ZhbHVlJywgYXJnTmFtZSk7XG4gICAgYXJnRmFpbGVkID0gaXNFcnJvcihyZXMpO1xuICAgIGxhc3RDaGVja2VyID0gY2hlY2tlckluZGV4ID49IGFwaS5sZW5ndGg7XG4gICAgc2tpcFByZXZpb3VzQ2hlY2tlciA9IGNoZWNrZXJJbmRleCA+IDEgJiYgYXBpW2NoZWNrZXJJbmRleCAtIDFdLmlzT3B0aW9uYWw7XG4gICAgaWYgKChhcmdGYWlsZWQgJiYgbGFzdENoZWNrZXIpIHx8IChhcmdGYWlsZWQgJiYgIWxhc3RDaGVja2VyICYmICFjaGVja2VyLmlzT3B0aW9uYWwgJiYgIXNraXBQcmV2aW91c0NoZWNrZXIpKSB7XG4gICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgbWVzc2FnZXMucHVzaChnZXRDaGVja2VyRXJyb3JNZXNzYWdlKHJlcywgY2hlY2tlciwgYXJnKSk7XG4gICAgfSBlbHNlIGlmIChhcmdGYWlsZWQgJiYgY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBhcmdJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKGAke3QoYXJnTmFtZSl9IHBhc3NlZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFpbGVkID8gbWVzc2FnZXMgOiBbXTtcbn1cblxuXG5jaGVja2VyVHlwZVR5cGUudHlwZSA9ICdmdW5jdGlvbiB3aXRoIF9fYXBpQ2hlY2tEYXRhIHByb3BlcnR5IGFuZCBgJHtmdW5jdGlvbi50eXBlfWAgcHJvcGVydHknO1xuZnVuY3Rpb24gY2hlY2tlclR5cGVUeXBlKGNoZWNrZXJUeXBlLCBuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCBhcGlDaGVja0RhdGFDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUoe1xuICAgIHR5cGU6IGNoZWNrZXJzLnN0cmluZyxcbiAgICBvcHRpb25hbDogY2hlY2tlcnMuYm9vbFxuICB9KTtcbiAgY29uc3QgYXNGdW5jID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7X19hcGlDaGVja0RhdGE6IGFwaUNoZWNrRGF0YUNoZWNrZXJ9KTtcbiAgY29uc3QgYXNTaGFwZSA9IGNoZWNrZXJzLnNoYXBlKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCB3cm9uZ1NoYXBlID0gY2hlY2tlcnMub25lT2ZUeXBlKFtcbiAgICBhc0Z1bmMsIGFzU2hhcGVcbiAgXSkoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKTtcbiAgaWYgKGlzRXJyb3Iod3JvbmdTaGFwZSkpIHtcbiAgICByZXR1cm4gd3JvbmdTaGFwZTtcbiAgfVxuICBpZiAodHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnZnVuY3Rpb24nICYmICFjaGVja2VyVHlwZS5oYXNPd25Qcm9wZXJ0eShjaGVja2VyVHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlKSkge1xuICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGVUeXBlLnR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCB2YWwpIHtcbiAgbGV0IGNoZWNrZXJIZWxwID0gZ2V0Q2hlY2tlckhlbHAoY2hlY2tlciwgdmFsKTtcbiAgY2hlY2tlckhlbHAgPSBjaGVja2VySGVscCA/ICcgLSAnICsgY2hlY2tlckhlbHAgOiAnJztcbiAgcmV0dXJuIHJlcy5tZXNzYWdlICsgY2hlY2tlckhlbHA7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJIZWxwKHtoZWxwfSwgdmFsKSB7XG4gIGlmICghaGVscCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodHlwZW9mIGhlbHAgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoZWxwID0gaGVscCh2YWwpO1xuICB9XG4gIHJldHVybiBoZWxwO1xufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IHJlcXVpcmVkQXJncyA9IGFwaS5maWx0ZXIoYSA9PiAhYS5pc09wdGlvbmFsKTtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWRBcmdzLmxlbmd0aCkge1xuICAgIHJldHVybiBbXG4gICAgICAnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXJnRGlzcGxheShhcmcsIGdvdHRlbkFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBjb25zdCBjTmFtZSA9IGFyZyAmJiBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGNvbnN0IHR5cGUgPSB0eXBlT2YoYXJnKTtcbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaGFzS2V5cygpKSB7XG4gICAgICBsZXQgcHJvcGVydGllcyA9IHN0cmluZ2lmeShnZXREaXNwbGF5SWZOb3RHb3R0ZW4oKSk7XG4gICAgICByZXR1cm4gY05hbWUgKyAnICh3aXRoIHByb3BlcnRpZXM6ICcgKyBwcm9wZXJ0aWVzICsgJyknO1xuICAgIH1cbiAgICByZXR1cm4gY05hbWU7XG4gIH1cblxuICBpZiAoYXJnID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIGlmICh0eXBlICE9PSAnYXJyYXknICYmIHR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBpZiAoaGFzS2V5cygpKSB7XG4gICAgcmV0dXJuIGdldERpc3BsYXlJZk5vdEdvdHRlbigpO1xuICB9XG5cbiAgcmV0dXJuIGNOYW1lO1xuXG4gIC8vIHV0aWxpdHkgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIGhhc0tleXMoKSB7XG4gICAgcmV0dXJuIGFyZyAmJiBPYmplY3Qua2V5cyhhcmcpLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpc3BsYXlJZk5vdEdvdHRlbigpIHtcbiAgICBpZiAoZ290dGVuQXJncy5pbmRleE9mKGFyZykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgIH1cbiAgICBnb3R0ZW5BcmdzLnB1c2goYXJnKTtcbiAgICByZXR1cm4gZ2V0RGlzcGxheShhcmcsIGdvdHRlbkFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqLCBnb3R0ZW5BcmdzKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodiwgaykgPT4gYXJnRGlzcGxheVtrXSA9IGdldEFyZ0Rpc3BsYXkodiwgZ290dGVuQXJncykpO1xuICByZXR1cm4gYXJnRGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tBcGlzKCkge1xuICBjb25zdCBvcyA9IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbDtcblxuICBjb25zdCBjaGVja2VyRm5DaGVja2VyID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7XG4gICAgdHlwZTogY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2Vycy5zdHJpbmcsIGNoZWNrZXJUeXBlVHlwZV0pLm9wdGlvbmFsLFxuICAgIGRpc3BsYXlOYW1lOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgc2hvcnRUeXBlOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgbm90T3B0aW9uYWw6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gICAgbm90UmVxdWlyZWQ6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWxcbiAgfSk7XG5cbiAgY29uc3QgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzID0gW1xuICAgIGNoZWNrZXJzLnNoYXBlKHtcbiAgICAgIG91dHB1dDogY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgICBwcmVmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgc3VmZml4OiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgIGRvY3NCYXNlVXJsOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWxcbiAgICAgIH0pLnN0cmljdC5vcHRpb25hbCxcbiAgICAgIHZlcmJvc2U6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gICAgICBkaXNhYmxlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICAgIH0pLnN0cmljdC5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5vYmplY3RPZihjaGVja2VyRm5DaGVja2VyKS5vcHRpb25hbFxuICBdO1xuXG4gIGNvbnN0IGNoZWNrQXBpQ2hlY2tBcGkgPSBbXG4gICAgY2hlY2tlcnMudHlwZU9yQXJyYXlPZihjaGVja2VyRm5DaGVja2VyKSxcbiAgICBjaGVja2Vycy5hbnkub3B0aW9uYWwsXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgcHJlZml4OiBvcywgc3VmZml4OiBvcywgdXJsU3VmZml4OiBvcywgLy8gYXBwZW5kZWQgY2FzZVxuICAgICAgb25seVByZWZpeDogb3MsIG9ubHlTdWZmaXg6IG9zLCB1cmw6IG9zIC8vIG92ZXJyaWRlIGNhc2VcbiAgICB9KS5zdHJpY3Qub3B0aW9uYWxcbiAgXTtcblxuICByZXR1cm4ge1xuICAgIGNoZWNrZXJGbkNoZWNrZXIsXG4gICAgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzLFxuICAgIGNoZWNrQXBpQ2hlY2tBcGlcbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrLmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3QgY2hlY2tlckhlbHBlcnMgPSB7XG4gIGFkZE9wdGlvbmFsLCBnZXRSZXF1aXJlZFZlcnNpb24sIHNldHVwQ2hlY2tlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2gsIGNvcHksIHR5cGVPZiwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LFxuICBpc0Vycm9yLCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgdW5kZWYsIGNoZWNrZXJIZWxwZXJzLFxuICBub29wXG59O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICBsZXQgdHlwZSA9IHR5cGVPZihvYmopO1xuICBsZXQgZGFDb3B5O1xuICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGRhQ29weSA9IFtdO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgZGFDb3B5ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBlYWNoKG9iaiwgKHZhbCwga2V5KSA9PiB7XG4gICAgZGFDb3B5W2tleV0gPSB2YWw7IC8vIGNhbm5vdCBzaW5nbGUtbGluZSB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBhYm9ydCB0aGUgZWFjaFxuICB9KTtcbiAgcmV0dXJuIGRhQ29weTtcbn1cblxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgb3B0aW9ucykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBkaXNwbGF5O1xuICBsZXQgc2hvcnQgPSBvcHRpb25zICYmIG9wdGlvbnMuc2hvcnQ7XG4gIGlmIChzaG9ydCAmJiBjaGVja2VyLnNob3J0VHlwZSkge1xuICAgIGRpc3BsYXkgPSBjaGVja2VyLnNob3J0VHlwZTtcbiAgfSBlbHNlIGlmICghc2hvcnQgJiYgdHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ29iamVjdCcgfHwgY2hlY2tlci50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BsYXkgPSBnZXRDaGVja2VyVHlwZShjaGVja2VyLCBvcHRpb25zKSB8fCBjaGVja2VyLmRpc3BsYXlOYW1lIHx8IGNoZWNrZXIubmFtZTtcbiAgfVxuICByZXR1cm4gZGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlclR5cGUoe3R5cGV9LCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBfX2FwaUNoZWNrRGF0YSA9IHR5cGUuX19hcGlDaGVja0RhdGE7XG4gICAgbGV0IHR5cGVUeXBlcyA9IHR5cGUob3B0aW9ucyk7XG4gICAgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhLFxuICAgICAgW19fYXBpQ2hlY2tEYXRhLnR5cGVdOiB0eXBlVHlwZXNcbiAgICB9O1xuICB9XG4gIHJldHVybiB0eXBlO1xufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuZnVuY3Rpb24gbGlzdChhcnJ5LCBqb2luLCBmaW5hbEpvaW4pIHtcbiAgYXJyeSA9IGFycmF5aWZ5KGFycnkpO1xuICBsZXQgY29weSA9IGFycnkuc2xpY2UoKTtcbiAgbGV0IGxhc3QgPSBjb3B5LnBvcCgpO1xuICBpZiAoY29weS5sZW5ndGggPT09IDEpIHtcbiAgICBqb2luID0gJyAnO1xuICB9XG4gIHJldHVybiBjb3B5LmpvaW4oam9pbikgKyBgJHtjb3B5Lmxlbmd0aCA/IGpvaW4gKyBmaW5hbEpvaW4gOiAnJ30ke2xhc3R9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGUpIHtcbiAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiBjaGVja2VyVHlwZSAhPT0gJ29iamVjdCcgPyBjaGVja2VyVHlwZSA6IHN0cmluZ2lmeShjaGVja2VyVHlwZSk7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IG11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xufVxuXG5mdW5jdGlvbiBuQXRMKG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IHROYW1lID0gdChuYW1lIHx8ICd2YWx1ZScpO1xuICBsZXQgdExvY2F0aW9uID0gIWxvY2F0aW9uID8gJycgOiAnIGF0ICcgKyB0KGxvY2F0aW9uKTtcbiAgcmV0dXJuIGAke3ROYW1lfSR7dExvY2F0aW9ufWA7XG59XG5cbmZ1bmN0aW9uIHQodGhpbmcpIHtcbiAgcmV0dXJuICdgJyArIHRoaW5nICsgJ2AnO1xufVxuXG5mdW5jdGlvbiB1bmRlZih0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJztcbn1cblxuXG5cblxuZnVuY3Rpb24gYWRkT3B0aW9uYWwoY2hlY2tlcikge1xuICBmdW5jdGlvbiBvcHRpb25hbENoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICghdW5kZWYodmFsKSkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgLy8gaW5oZXJpdCBhbGwgcHJvcGVydGllcyBvbiB0aGUgb3JpZ2luYWwgY2hlY2tlclxuICBjb3B5UHJvcHMoY2hlY2tlciwgb3B0aW9uYWxDaGVjayk7XG4gIGVhY2goT2JqZWN0LmtleXMoY2hlY2tlciksIGtleSA9PiBvcHRpb25hbENoZWNrW2tleV0gPSBjaGVja2VyW2tleV0pO1xuXG5cbiAgb3B0aW9uYWxDaGVjay5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgb3B0aW9uYWxDaGVjay5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWUgKyAnIChvcHRpb25hbCknO1xuXG5cbiAgLy8gdGhlIG1hZ2ljIGxpbmUgdGhhdCBhbGxvd3MgeW91IHRvIGFkZCAub3B0aW9uYWwgdG8gdGhlIGVuZCBvZiB0aGUgY2hlY2tlcnNcbiAgY2hlY2tlci5vcHRpb25hbCA9IG9wdGlvbmFsQ2hlY2s7XG5cbiAgLy8gZml4IHR5cGUsIGJlY2F1c2UgaXQncyBub3QgYSBzdHJhaWdodCBjb3B5Li4uXG4gIC8vIHRoZSByZWFzb24gaXMgd2UgbmVlZCB0byBzcGVjaWZ5IHR5cGUuX19hcGlDaGVja0RhdGEub3B0aW9uYWwgYXMgdHJ1ZSBmb3IgdGhlIHRlcnNlL3ZlcmJvc2Ugb3B0aW9uLlxuICAvLyB3ZSBhbHNvIHdhbnQgdG8gYWRkIFwiKG9wdGlvbmFsKVwiIHRvIHRoZSB0eXBlcyB3aXRoIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YgY2hlY2tlci5vcHRpb25hbC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNvcHkoY2hlY2tlci5vcHRpb25hbC50eXBlKTsgLy8gbWFrZSBvdXIgb3duIGNvcHkgb2YgdGhpc1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGVja2VyLnR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSArPSAnIChvcHRpb25hbCknO1xuICAgIHJldHVybjtcbiAgfVxuICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkgfHwge307IC8vIGFuZCB0aGlzXG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG59XG5cbi8qKlxuICogVGhpcyB3aWxsIHNldCB1cCB0aGUgY2hlY2tlciB3aXRoIGFsbCBvZiB0aGUgZGVmYXVsdHMgdGhhdCBtb3N0IGNoZWNrZXJzIHdhbnQgbGlrZSByZXF1aXJlZCBieSBkZWZhdWx0IGFuZCBhblxuICogb3B0aW9uYWwgdmVyc2lvblxuICogQHBhcmFtIGNoZWNrZXJcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIHByb3BlcnRpZXMgdG8gYWRkIHRvIHRoZSBjaGVja2VyXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ2hlY2tlcihjaGVja2VyLCBwcm9wZXJ0aWVzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgY2hlY2tlci5ub29wID0gbm9vcDsgLy8gZG8gdGhpcyBmaXJzdCwgc28gaXQgY2FuIGJlIG92ZXJ3cml0dGVuLlxuICBpZiAodHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjaGVja2VyLnNob3J0VHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgfVxuXG4gIC8vIGFzc2lnbiBhbGwgcHJvcGVydGllcyBnaXZlblxuICBlYWNoKHByb3BlcnRpZXMsIChwcm9wLCBuYW1lKSA9PiBjaGVja2VyW25hbWVdID0gcHJvcCk7XG5cbiAgaWYgKCFjaGVja2VyLmRpc3BsYXlOYW1lKSB7XG4gICAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci5zaG9ydFR5cGUgfHwgY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIH1cblxuICBpZiAoIWNoZWNrZXIubm90UmVxdWlyZWQpIHtcbiAgICBjaGVja2VyID0gZ2V0UmVxdWlyZWRWZXJzaW9uKGNoZWNrZXIpO1xuICB9XG5cbiAgaWYgKCFjaGVja2VyLm5vdE9wdGlvbmFsKSB7XG4gICAgYWRkT3B0aW9uYWwoY2hlY2tlcik7XG4gIH1cbiAgcmV0dXJuIGNoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGdldFJlcXVpcmVkVmVyc2lvbihjaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHJlcXVpcmVkQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAodW5kZWYodmFsKSAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBsZXQgdExvY2F0aW9uID0gbG9jYXRpb24gPyBgIGluICR7dChsb2NhdGlvbil9YCA6ICcnO1xuICAgICAgY29uc3QgdHlwZSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICAgICAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiB0eXBlICE9PSAnb2JqZWN0JyA/IHR5cGUgOiBzdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICBjb3B5UHJvcHMoY2hlY2tlciwgcmVxdWlyZWRDaGVja2VyKTtcbiAgcmV0dXJuIHJlcXVpcmVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gY29weVByb3BzKHNyYywgZGVzdCkge1xuICBlYWNoKE9iamVjdC5rZXlzKHNyYyksIGtleSA9PiBkZXN0W2tleV0gPSBzcmNba2V5XSk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnMsXG4gIHVuZGVmXG4gIH0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge3NldHVwQ2hlY2tlcn0gPSBjaGVja2VySGVscGVycztcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5OiB0eXBlT2ZDaGVja0dldHRlcignQXJyYXknKSxcbiAgYm9vbDogdHlwZU9mQ2hlY2tHZXR0ZXIoJ0Jvb2xlYW4nKSxcbiAgbnVtYmVyOiB0eXBlT2ZDaGVja0dldHRlcignTnVtYmVyJyksXG4gIHN0cmluZzogdHlwZU9mQ2hlY2tHZXR0ZXIoJ1N0cmluZycpLFxuICBmdW5jOiBmdW5jQ2hlY2tHZXR0ZXIoKSxcbiAgb2JqZWN0OiBvYmplY3RDaGVja0dldHRlcigpLFxuXG4gIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gIG9uZU9mOiBvbmVPZkNoZWNrR2V0dGVyLFxuICBvbmVPZlR5cGU6IG9uZU9mVHlwZUNoZWNrR2V0dGVyLFxuXG4gIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgb2JqZWN0T2Y6IG9iamVjdE9mQ2hlY2tHZXR0ZXIsXG4gIHR5cGVPckFycmF5T2Y6IHR5cGVPckFycmF5T2ZDaGVja0dldHRlcixcblxuICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuICBhcmdzOiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5mdW5jdGlvbiB0eXBlT2ZDaGVja0dldHRlcih0eXBlKSB7XG4gIGNvbnN0IGxUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09IGxUeXBlKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGV9KTtcbn1cblxuZnVuY3Rpb24gZnVuY0NoZWNrR2V0dGVyKCkge1xuICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZX0pO1xuXG4gIGZ1bmN0aW9uQ2hlY2tlci53aXRoUHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFdpdGhQcm9wZXJ0aWVzQ2hlY2tlcihwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXBpRXJyb3IgPSBjaGVja2Vycy5vYmplY3RPZihjaGVja2Vycy5mdW5jKShwcm9wZXJ0aWVzLCAncHJvcGVydGllcycsICdhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzJyk7XG4gICAgaWYgKGlzRXJyb3IoYXBpRXJyb3IpKSB7XG4gICAgICB0aHJvdyBhcGlFcnJvcjtcbiAgICB9XG4gICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHByb3BlcnRpZXMsIHRydWUpO1xuICAgIHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUgPSAnZnVuYy53aXRoUHJvcGVydGllcyc7XG5cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uV2l0aFByb3BlcnRpZXNDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdEZ1bmN0aW9uID0gY2hlY2tlcnMuZnVuYyh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKG5vdEZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gbm90RnVuY3Rpb247XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIH0sIHt0eXBlOiBzaGFwZUNoZWNrZXIudHlwZSwgc2hvcnRUeXBlOiAnZnVuYy53aXRoUHJvcGVydGllcyd9KTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gb2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnT2JqZWN0JztcbiAgY29uc3QgbnVsbFR5cGUgPSAnT2JqZWN0IChudWxsIG9rKSc7XG4gIGxldCBvYmplY3ROdWxsT2tDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIG51bGxUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlOiBudWxsVHlwZX0pO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlfSk7XG5cbiAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuXG4gIHJldHVybiBvYmplY3RDaGVja2VyO1xufVxuXG5cbmZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCEodmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgfVxuICB9LCB7dHlwZTogY2xhc3NUb0NoZWNrLm5hbWV9KTtcbn1cblxuZnVuY3Rpb24gb25lT2ZDaGVja0dldHRlcihlbnVtcykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnZW51bSd9LFxuICAgIGVudW06IGVudW1zXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlske2VudW1zLm1hcChlbm0gPT4gc3RyaW5naWZ5KGVubSkpLmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tHZXR0ZXIoY2hlY2tlcnMpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29uZU9mVHlwZSd9LFxuICAgIG9uZU9mVHlwZTogY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKSlcbiAgfTtcbiAgY29uc3QgY2hlY2tlcnNEaXNwbGF5ID0gY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlR5cGVbJHtjaGVja2Vyc0Rpc3BsYXkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gIWlzRXJyb3IoY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZSwgc2hvcnRUeXBlfSk7XG59XG5cbmZ1bmN0aW9uIGFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdhcnJheU9mJ30sXG4gICAgYXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYGFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhcnJheU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLmFycmF5KHZhbCkpIHx8ICF2YWwuZXZlcnkoKGl0ZW0pID0+ICFpc0Vycm9yKGNoZWNrZXIoaXRlbSkpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGUsIHNob3J0VHlwZX0pO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29iamVjdE9mJ30sXG4gICAgb2JqZWN0T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvYmplY3RPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGNvbnN0IG5vdE9iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICBpZiAoaXNFcnJvcihub3RPYmplY3QpKSB7XG4gICAgICByZXR1cm4gbm90T2JqZWN0O1xuICAgIH1cbiAgICBjb25zdCBhbGxUeXBlc1N1Y2Nlc3MgPSBlYWNoKHZhbCwgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3R5cGVPckFycmF5T2YnfSxcbiAgICB0eXBlT3JBcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgdHlwZU9yQXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZSwgc2hvcnRUeXBlfSk7XG59XG5cbmZ1bmN0aW9uIGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSB7XG4gIGZ1bmN0aW9uIHNoYXBlQ2hlY2tHZXR0ZXIoc2hhcGUsIG5vbk9iamVjdCkge1xuICAgIGxldCBzaGFwZVR5cGVzID0ge307XG4gICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgIHNoYXBlVHlwZXNbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiB0eXBlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgY29uc3Qge3RlcnNlLCBvYmosIGFkZEhlbHBlcnN9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBhcmVudFJlcXVpcmVkID0gb3B0aW9ucy5yZXF1aXJlZDtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgY29uc3Qgc3BlY2lmaWVkID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKTtcbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSB1bmRlZihwYXJlbnRSZXF1aXJlZCkgPyAhY2hlY2tlci5pc09wdGlvbmFsIDogcGFyZW50UmVxdWlyZWQ7XG4gICAgICAgIGlmICghdGVyc2UgfHwgKHNwZWNpZmllZCB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSkge1xuICAgICAgICAgIHJldFtwcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHt0ZXJzZSwgb2JqOiBvYmogJiYgb2JqW3Byb3BdLCByZXF1aXJlZCwgYWRkSGVscGVyc30pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGRIZWxwZXJzKSB7XG4gICAgICAgICAgbW9kaWZ5VHlwZURpc3BsYXlUb0hlbHBPdXQocmV0LCBwcm9wLCBzcGVjaWZpZWQsIGNoZWNrZXIsIHJlcXVpcmVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuXG4gICAgICBmdW5jdGlvbiBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKCFzcGVjaWZpZWQgJiYgcmVxdWlyZWQgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgIGxldCBpdGVtID0gJ0lURU0nO1xuICAgICAgICAgIGlmIChjaGVja2VyLnR5cGUgJiYgY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB7XG4gICAgICAgICAgICBpdGVtID0gY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkSGVscGVyKFxuICAgICAgICAgICAgJ21pc3NpbmcnLCAnTUlTU0lORyBUSElTICcgKyBpdGVtLCAnIDwtLSBZT1UgQVJFIE1JU1NJTkcgVEhJUydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHNwZWNpZmllZCkge1xuICAgICAgICAgIGxldCBlcnJvciA9IGNoZWNrZXIob2JqW3Byb3BdLCBwcm9wLCBudWxsLCBvYmopO1xuICAgICAgICAgIGlmIChpc0Vycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgYWRkSGVscGVyKCdlcnJvcicsICdUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSwgJyA8LS0gVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEhlbHBlcihwcm9wZXJ0eSwgb2JqZWN0TWVzc2FnZSwgc3RyaW5nTWVzc2FnZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmV0W3Byb3BdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0W3Byb3BdICs9IHN0cmluZ01lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtwcm9wXS5fX2FwaUNoZWNrRGF0YVtwcm9wZXJ0eV0gPSBvYmplY3RNZXNzYWdlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7c3RyaWN0OiBmYWxzZSwgb3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnc2hhcGUnfTtcbiAgICBsZXQgc2hhcGVDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgbGV0IGlzT2JqZWN0ID0gIW5vbk9iamVjdCAmJiBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihpc09iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgICAgfVxuICAgICAgbGV0IHNoYXBlUHJvcEVycm9yO1xuICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbiA/IGxvY2F0aW9uICsgKG5hbWUgPyAnLycgOiAnJykgOiAnJztcbiAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgYCR7bG9jYXRpb259JHtuYW1lfWAsIHZhbCk7XG4gICAgICAgICAgcmV0dXJuICFpc0Vycm9yKHNoYXBlUHJvcEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZVByb3BFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlUHJvcEVycm9yO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6ICdzaGFwZSd9KTtcblxuICAgIGZ1bmN0aW9uIHN0cmljdFR5cGUoKSB7XG4gICAgICByZXR1cm4gdHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhLnN0cmljdCA9IHRydWU7XG4gICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZUVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbG93ZWRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2hhcGUpO1xuICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZTogc3RyaWN0VHlwZSwgc2hvcnRUeXBlOiAnc3RyaWN0IHNoYXBlJ30pO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBpZk5vdENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH0sIHtub3RSZXF1aXJlZDogdHJ1ZSwgdHlwZSwgc2hvcnRUeXBlOiBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9KTtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6IGBvbmx5SWZbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9KTtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYXJndW1lbnRzQ2hlY2tlckdldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdmdW5jdGlvbiBhcmd1bWVudHMnO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm9iamVjdCh2YWwpKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm51bWJlcih2YWwubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZX0pO1xufVxuXG5mdW5jdGlvbiBhbnlDaGVja0dldHRlcigpIHtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xuICB9LCB7dHlwZTogJ2FueSd9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeTtcblxuZnVuY3Rpb24gZ2V0U2VyaWFsaXplIChmbiwgZGVjeWNsZSkge1xuICB2YXIgc2VlbiA9IFtdLCBrZXlzID0gW107XG4gIGRlY3ljbGUgPSBkZWN5Y2xlIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gJ1tDaXJjdWxhciAnICsgZ2V0UGF0aCh2YWx1ZSwgc2Vlbiwga2V5cykgKyAnXSdcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAgIGlmIChzZWVuLmluZGV4T2YodmFsdWUpICE9PSAtMSlcbiAgICAgICAgcmV0ID0gZGVjeWNsZShrZXksIHZhbHVlKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZuKSByZXQgPSBmbihrZXksIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoICh2YWx1ZSwgc2Vlbiwga2V5cykge1xuICB2YXIgaW5kZXggPSBzZWVuLmluZGV4T2YodmFsdWUpO1xuICB2YXIgcGF0aCA9IFsga2V5c1tpbmRleF0gXTtcbiAgZm9yIChpbmRleC0tOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKHNlZW5baW5kZXhdWyBwYXRoWzBdIF0gPT09IHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHNlZW5baW5kZXhdO1xuICAgICAgcGF0aC51bnNoaWZ0KGtleXNbaW5kZXhdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICd+JyArIHBhdGguam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCBmbiwgc3BhY2VzLCBkZWN5Y2xlKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIGdldFNlcmlhbGl6ZShmbiwgZGVjeWNsZSksIHNwYWNlcyk7XG59XG5cbnN0cmluZ2lmeS5nZXRTZXJpYWxpemUgPSBnZXRTZXJpYWxpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGktY2hlY2suanMifQ==