// apiCheck.js v7.0.0-beta.2 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	  if (gottenArgs.indexOf(arg) !== -1) {
	    return "[Circular]";
	  }
	  gottenArgs.push(arg);
	  var cName = arg && arg.constructor && arg.constructor.name;
	  var type = typeOf(arg);
	  if (type === "function") {
	    if (hasKeys()) {
	      var properties = stringify(getDisplay(arg, gottenArgs));
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
	    return getDisplay(arg, gottenArgs);
	  }
	
	  return cName;
	
	  function hasKeys() {
	    return arg && Object.keys(arg).length;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2MTlkZjE3Y2VmNjMwYmFjYjE2NiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFF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USxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQy9GLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkM7SUFDRixFQUFFLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDLENBQUM7RUFDWjs7QUFFRCxVQUFTLGNBQWMsR0FBRztBQUN4QixVQUFPLFlBQVksQ0FBQyxTQUFTLG9CQUFvQixHQUFHLEVBRW5ELEVBQUUsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztFQUNuQjs7Ozs7Ozs7Ozs7QUNsVUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjE5ZGYxN2NlZjYzMGJhY2IxNjZcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3QgYXBpQ2hlY2tVdGlsID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtlYWNoLCBpc0Vycm9yLCB0LCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZiwgZ2V0RXJyb3J9ID0gYXBpQ2hlY2tVdGlsO1xuY29uc3QgY2hlY2tlcnMgPSByZXF1aXJlKCcuL2NoZWNrZXJzJyk7XG5jb25zdCBhcGlDaGVja0FwaXMgPSBnZXRBcGlDaGVja0FwaXMoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRBcGlDaGVja0luc3RhbmNlO1xubW9kdWxlLmV4cG9ydHMudXRpbHMgPSBhcGlDaGVja1V0aWw7XG5tb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcgPSB7XG4gIHZlcmJvc2U6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2Vcbn07XG5cbmNvbnN0IGFwaUNoZWNrQXBpQ2hlY2sgPSBnZXRBcGlDaGVja0luc3RhbmNlKHtcbiAgb3V0cHV0OiB7cHJlZml4OiAnYXBpQ2hlY2snfVxufSk7XG5tb2R1bGUuZXhwb3J0cy5pbnRlcm5hbENoZWNrZXIgPSBhcGlDaGVja0FwaUNoZWNrO1xuXG5cbmVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1tuYW1lXSA9IGNoZWNrZXIpO1xuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0luc3RhbmNlKGNvbmZpZyA9IHt9LCBleHRyYUNoZWNrZXJzID0ge30pIHtcbiAgaWYgKGFwaUNoZWNrQXBpQ2hlY2sgJiYgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGFwaUNoZWNrQXBpQ2hlY2sudGhyb3coYXBpQ2hlY2tBcGlzLmdldEFwaUNoZWNrSW5zdGFuY2VDaGVja2VycywgYXJndW1lbnRzLCB7XG4gICAgICBwcmVmaXg6ICdjcmVhdGluZyBhbiBhcGlDaGVjayBpbnN0YW5jZSdcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgICB0aHJvdzogZ2V0QXBpQ2hlY2sodHJ1ZSksXG4gICAgd2FybjogZ2V0QXBpQ2hlY2soZmFsc2UpLFxuICAgIGdldEVycm9yTWVzc2FnZSxcbiAgICBoYW5kbGVFcnJvck1lc3NhZ2UsXG4gICAgY29uZmlnOiB7XG4gICAgICBvdXRwdXQ6IGNvbmZpZy5vdXRwdXQgfHwge1xuICAgICAgICBwcmVmaXg6ICcnLFxuICAgICAgICBzdWZmaXg6ICcnLFxuICAgICAgICBkb2NzQmFzZVVybDogJydcbiAgICAgIH0sXG4gICAgICB2ZXJib3NlOiBjb25maWcudmVyYm9zZSB8fCBmYWxzZSxcbiAgICAgIGRpc2FibGVkOiBjb25maWcuZGlzYWJsZWQgfHwgZmFsc2VcbiAgICB9LFxuICAgIHV0aWxzOiBhcGlDaGVja1V0aWxcbiAgfTtcblxuICBlYWNoKGFkZGl0aW9uYWxQcm9wZXJ0aWVzLCAod3JhcHBlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSB3cmFwcGVyKTtcbiAgZWFjaChjaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IHtcbiAgICBpZiAoKCFhZGRpdGlvbmFsUHJvcGVydGllcy5kaXNhYmxlZCAmJiAhbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmRpc2FibGVkKSB8fCAhY2hlY2tlci5ub29wKSB7XG4gICAgICBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaUNoZWNrW25hbWVdID0gY2hlY2tlci5ub29wO1xuICAgIH1cbiAgfSk7XG4gIGVhY2goZXh0cmFDaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG5cbiAgcmV0dXJuIGFwaUNoZWNrO1xuXG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIGluc3RhbmNlIGZ1bmN0aW9uLiBPdGhlciB0aGluZ3MgYXJlIGF0dGFjaGVkIHRvIHRoaXMgc2VlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhYm92ZS5cbiAgICogQHBhcmFtIGFwaSB7QXJyYXl9XG4gICAqIEBwYXJhbSBhcmdzIHthcmd1bWVudHN9XG4gICAqIEBwYXJhbSBvdXRwdXQge09iamVjdH1cbiAgICogQHJldHVybnMge09iamVjdH0gLSBpZiB0aGlzIGhhcyBhIGZhaWxlZCA9IHRydWUgcHJvcGVydHksIHRoZW4gaXQgZmFpbGVkXG4gICAqL1xuICBmdW5jdGlvbiBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjggKi9cbiAgICBpZiAoYXBpQ2hlY2suY29uZmlnLmRpc2FibGVkIHx8IG1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXBpVHlwZXM6IHt9LCBhcmdUeXBlczoge30sXG4gICAgICAgIHBhc3NlZDogdHJ1ZSwgbWVzc2FnZTogJycsXG4gICAgICAgIGZhaWxlZDogZmFsc2VcbiAgICAgIH07IC8vIGVtcHR5IHZlcnNpb24gb2Ygd2hhdCBpcyBub3JtYWxseSByZXR1cm5lZFxuICAgIH1cbiAgICBjaGVja0FwaUNoZWNrQXBpKGFyZ3VtZW50cyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFwaSkpIHtcbiAgICAgIGFwaSA9IFthcGldO1xuICAgICAgYXJncyA9IFthcmdzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHVybiBhcmd1bWVudHMgaW50byBhbiBhcnJheVxuICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZXMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgICBpZiAoIW1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgLy8gdGhpcyBpcyB3aGVyZSB3ZSBhY3R1YWxseSBnbyBwZXJmb3JtIHRoZSBjaGVja3MuXG4gICAgICBtZXNzYWdlcyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgICB9XG5cbiAgICBsZXQgcmV0dXJuT2JqZWN0ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIG1lc3NhZ2VzLCBvdXRwdXQpO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IHRydWU7XG4gICAgICByZXR1cm5PYmplY3QucGFzc2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gJyc7XG4gICAgICByZXR1cm5PYmplY3QuZmFpbGVkID0gZmFsc2U7XG4gICAgICByZXR1cm5PYmplY3QucGFzc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja0FwaUNoZWNrQXBpLCBzaG91bGQgYmUgcmVhZCBsaWtlOiBjaGVjayBhcGlDaGVjayBhcGkuIEFzIGluLCBjaGVjayB0aGUgYXBpIGZvciBhcGlDaGVjayA6LSlcbiAgICogQHBhcmFtIGNoZWNrQXBpQXJnc1xuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tBcGlDaGVja0FwaShjaGVja0FwaUFyZ3MpIHtcbiAgICBjb25zdCBhcGkgPSBjaGVja0FwaUFyZ3NbMF07XG4gICAgY29uc3QgYXJncyA9IGNoZWNrQXBpQXJnc1sxXTtcbiAgICB2YXIgaXNBcnJheU9yQXJncyA9IEFycmF5LmlzQXJyYXkoYXJncykgfHwgKGFyZ3MgJiYgdHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhcmdzLmxlbmd0aCA9PT0gJ251bWJlcicpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXBpKSAmJiAhaXNBcnJheU9yQXJncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShhcGksIFthcmdzXSxcbiAgICAgICAgWydJZiBhbiBhcnJheSBpcyBwcm92aWRlZCBmb3IgdGhlIGFwaSwgYW4gYXJyYXkgbXVzdCBiZSBwcm92aWRlZCBmb3IgdGhlIGFyZ3MgYXMgd2VsbC4nXSxcbiAgICAgICAge3ByZWZpeDogJ2FwaUNoZWNrJ31cbiAgICAgICkpO1xuICAgIH1cbiAgICAvLyBkb2cgZm9vZGluZyBoZXJlXG4gICAgY29uc3QgZXJyb3JzID0gY2hlY2tBcGlXaXRoQXJncyhhcGlDaGVja0FwaXMuY2hlY2tBcGlDaGVja0FwaSwgY2hlY2tBcGlBcmdzKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGlDaGVja0FwaXMuY2hlY2tBcGlDaGVja0FwaSwgY2hlY2tBcGlBcmdzLCBlcnJvcnMsIHtcbiAgICAgICAgcHJlZml4OiAnYXBpQ2hlY2snXG4gICAgICB9KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGFwaUNoZWNrV3JhcHBlcihhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShyZXN1bHQubWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gd29udCBnZXQgaGVyZSBpZiBhbiBlcnJvciBpcyB0aHJvd25cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG4gICAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAgIGxldCBnT3V0ID0gYXBpQ2hlY2suY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgICBsZXQgcHJlZml4ID0gZ2V0UHJlZml4KCk7XG4gICAgbGV0IHN1ZmZpeCA9IGdldFN1ZmZpeCgpO1xuICAgIGxldCB1cmwgPSBnZXRVcmwoKTtcbiAgICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICAgIHZhciBwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkID0gJ1xcblxcbicgKyBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7bWVzc2FnZX0gJHtzdWZmaXh9ICR7dXJsIHx8ICcnfSR7cGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZH1gLnRyaW0oKTtcblxuICAgIGZ1bmN0aW9uIGdldFByZWZpeCgpIHtcbiAgICAgIGxldCBwcmVmaXggPSBvdXRwdXQub25seVByZWZpeDtcbiAgICAgIGlmICghcHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN1ZmZpeCgpIHtcbiAgICAgIGxldCBzdWZmaXggPSBvdXRwdXQub25seVN1ZmZpeDtcbiAgICAgIGlmICghc3VmZml4KSB7XG4gICAgICAgIHN1ZmZpeCA9IGAke291dHB1dC5zdWZmaXggfHwgJyd9ICR7Z091dC5zdWZmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VmZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVybCgpIHtcbiAgICAgIGxldCB1cmwgPSBvdXRwdXQudXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsU3VmZml4ICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsU3VmZml4fWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcbiAgICBsZXQge2FwaVR5cGVzLCBhcmdUeXBlc30gPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICAgIGxldCBjb3B5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyB8fCBbXSk7XG4gICAgbGV0IHJlcGxhY2VkSXRlbXMgPSBbXTtcbiAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShjb3B5KTtcbiAgICBjb25zdCBwYXNzZWRBcmdzID0gZ2V0T2JqZWN0U3RyaW5nKGNvcHkpO1xuICAgIGFyZ1R5cGVzID0gZ2V0T2JqZWN0U3RyaW5nKGFyZ1R5cGVzKTtcbiAgICBhcGlUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcGlUeXBlcyk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVNZXNzYWdlKCk7XG5cblxuICAgIC8vIGZ1bmN0aW9uc1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKSB7XG4gICAgICBlYWNoKG9iaiwgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIGlmIChyZXBsYWNlZEl0ZW1zLmluZGV4T2YodmFsKSA9PT0gLTEpIHsgLy8gYXZvaWQgcmVjdXJzaXZlIHByb2JsZW1zXG4gICAgICAgICAgcmVwbGFjZWRJdGVtcy5wdXNoKHZhbCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShvYmopO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsLmRpc3BsYXlOYW1lIHx8IHZhbC5uYW1lIHx8ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T2JqZWN0U3RyaW5nKHR5cGVzKSB7XG4gICAgICBpZiAoIXR5cGVzIHx8ICF0eXBlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICdub3RoaW5nJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZXMgJiYgdHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHR5cGVzID0gdHlwZXNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaW5naWZ5KHR5cGVzLCBudWxsLCAyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2UoKSB7XG4gICAgICBjb25zdCBuID0gJ1xcbic7XG4gICAgICBsZXQgdXNlUyA9IHRydWU7XG4gICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdXNlUyA9ICEhT2JqZWN0LmtleXMoYXJnc1swXSkubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVzZVMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdHlwZXMgPSBgdHlwZSR7dXNlUyA/ICdzJyA6ICcnfWA7XG4gICAgICBjb25zdCBuZXdMaW5lID0gbiArIG47XG4gICAgICByZXR1cm4gYFlvdSBwYXNzZWQ6JHtufSR7cGFzc2VkQXJnc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBXaXRoIHRoZSAke3R5cGVzfToke259JHthcmdUeXBlc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBUaGUgQVBJIGNhbGxzIGZvcjoke259JHthcGlUeXBlc31gO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGVzKGFwaSwgYXJncykge1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICAgIGxldCBhcGlUeXBlcyA9IGFwaS5tYXAoKGNoZWNrZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWZpZWQgPSBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuaGFzT3duUHJvcGVydHkoJ3ZlcmJvc2UnKTtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7XG4gICAgICAgIHRlcnNlOiBzcGVjaWZpZWQgPyAhbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLnZlcmJvc2UgOiAhYXBpQ2hlY2suY29uZmlnLnZlcmJvc2UsXG4gICAgICAgIG9iajogYXJnc1tpbmRleF0sXG4gICAgICAgIGFkZEhlbHBlcnM6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKChhcmcpID0+IGdldEFyZ0Rpc3BsYXkoYXJnLCBbXSkpO1xuICAgIHJldHVybiB7YXJnVHlwZXM6IGFyZ1R5cGVzLCBhcGlUeXBlc307XG4gIH1cblxufVxuXG5cbi8vIFNUQVRFTEVTUyBGVU5DVElPTlNcblxuLyoqXG4gKiBUaGlzIGlzIHdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zIGZvciBhY3R1YWxseSBjaGVja2luZyB0aGUgYXJndW1lbnRzIHdpdGggdGhlIGFwaS5cbiAqIEBwYXJhbSBhcGkge0FycmF5fSAtIGNoZWNrZXJzXG4gKiBAcGFyYW0gYXJncyB7QXJyYXl9IC0gYW5kIGFyZ3VtZW50cyBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzLCBsYXN0Q2hlY2tlciwgYXJnTmFtZSwgYXJnRmFpbGVkLCBza2lwUHJldmlvdXNDaGVja2VyO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUgKChjaGVja2VyID0gYXBpW2NoZWNrZXJJbmRleCsrXSkgJiYgKGFyZ0luZGV4IDwgYXJncy5sZW5ndGgpKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICBhcmdOYW1lID0gJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCAndmFsdWUnLCBhcmdOYW1lKTtcbiAgICBhcmdGYWlsZWQgPSBpc0Vycm9yKHJlcyk7XG4gICAgbGFzdENoZWNrZXIgPSBjaGVja2VySW5kZXggPj0gYXBpLmxlbmd0aDtcbiAgICBza2lwUHJldmlvdXNDaGVja2VyID0gY2hlY2tlckluZGV4ID4gMSAmJiBhcGlbY2hlY2tlckluZGV4IC0gMV0uaXNPcHRpb25hbDtcbiAgICBpZiAoKGFyZ0ZhaWxlZCAmJiBsYXN0Q2hlY2tlcikgfHwgKGFyZ0ZhaWxlZCAmJiAhbGFzdENoZWNrZXIgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCAmJiAhc2tpcFByZXZpb3VzQ2hlY2tlcikpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCBhcmcpKTtcbiAgICB9IGVsc2UgaWYgKGFyZ0ZhaWxlZCAmJiBjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goYCR7dChhcmdOYW1lKX0gcGFzc2VkYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWlsZWQgPyBtZXNzYWdlcyA6IFtdO1xufVxuXG5cbmNoZWNrZXJUeXBlVHlwZS50eXBlID0gJ2Z1bmN0aW9uIHdpdGggX19hcGlDaGVja0RhdGEgcHJvcGVydHkgYW5kIGAke2Z1bmN0aW9uLnR5cGV9YCBwcm9wZXJ0eSc7XG5mdW5jdGlvbiBjaGVja2VyVHlwZVR5cGUoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IGFwaUNoZWNrRGF0YUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZSh7XG4gICAgdHlwZTogY2hlY2tlcnMuc3RyaW5nLFxuICAgIG9wdGlvbmFsOiBjaGVja2Vycy5ib29sXG4gIH0pO1xuICBjb25zdCBhc0Z1bmMgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCBhc1NoYXBlID0gY2hlY2tlcnMuc2hhcGUoe19fYXBpQ2hlY2tEYXRhOiBhcGlDaGVja0RhdGFDaGVja2VyfSk7XG4gIGNvbnN0IHdyb25nU2hhcGUgPSBjaGVja2Vycy5vbmVPZlR5cGUoW1xuICAgIGFzRnVuYywgYXNTaGFwZVxuICBdKShjaGVja2VyVHlwZSwgbmFtZSwgbG9jYXRpb24pO1xuICBpZiAoaXNFcnJvcih3cm9uZ1NoYXBlKSkge1xuICAgIHJldHVybiB3cm9uZ1NoYXBlO1xuICB9XG4gIGlmICh0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdmdW5jdGlvbicgJiYgIWNoZWNrZXJUeXBlLmhhc093blByb3BlcnR5KGNoZWNrZXJUeXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUpKSB7XG4gICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZVR5cGUudHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIHZhbCkge1xuICBsZXQgY2hlY2tlckhlbHAgPSBnZXRDaGVja2VySGVscChjaGVja2VyLCB2YWwpO1xuICBjaGVja2VySGVscCA9IGNoZWNrZXJIZWxwID8gJyAtICcgKyBjaGVja2VySGVscCA6ICcnO1xuICByZXR1cm4gcmVzLm1lc3NhZ2UgKyBjaGVja2VySGVscDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckhlbHAoe2hlbHB9LCB2YWwpIHtcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh0eXBlb2YgaGVscCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhlbHAgPSBoZWxwKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGhlbHA7XG59XG5cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdOb3QgZW5vdWdoIGFyZ3VtZW50cyBzcGVjaWZpZWQuIFJlcXVpcmVzIGAnICsgcmVxdWlyZWRBcmdzLmxlbmd0aCArICdgLCB5b3UgcGFzc2VkIGAnICsgYXJncy5sZW5ndGggKyAnYCdcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZywgZ290dGVuQXJncykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGlmIChnb3R0ZW5BcmdzLmluZGV4T2YoYXJnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICB9XG4gIGdvdHRlbkFyZ3MucHVzaChhcmcpO1xuICBjb25zdCBjTmFtZSA9IGFyZyAmJiBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGNvbnN0IHR5cGUgPSB0eXBlT2YoYXJnKTtcbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaGFzS2V5cygpKSB7XG4gICAgICBsZXQgcHJvcGVydGllcyA9IHN0cmluZ2lmeShnZXREaXNwbGF5KGFyZywgZ290dGVuQXJncykpO1xuICAgICAgcmV0dXJuIGNOYW1lICsgJyAod2l0aCBwcm9wZXJ0aWVzOiAnICsgcHJvcGVydGllcyArICcpJztcbiAgICB9XG4gICAgcmV0dXJuIGNOYW1lO1xuICB9XG5cbiAgaWYgKGFyZyA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH1cblxuICBpZiAodHlwZSAhPT0gJ2FycmF5JyAmJiB0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgaWYgKGhhc0tleXMoKSkge1xuICAgIHJldHVybiBnZXREaXNwbGF5KGFyZywgZ290dGVuQXJncyk7XG4gIH1cblxuICByZXR1cm4gY05hbWU7XG5cbiAgZnVuY3Rpb24gaGFzS2V5cygpIHtcbiAgICByZXR1cm4gYXJnICYmIE9iamVjdC5rZXlzKGFyZykubGVuZ3RoO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqLCBnb3R0ZW5BcmdzKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodiwgaykgPT4gYXJnRGlzcGxheVtrXSA9IGdldEFyZ0Rpc3BsYXkodiwgZ290dGVuQXJncykpO1xuICByZXR1cm4gYXJnRGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tBcGlzKCkge1xuICBjb25zdCBvcyA9IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbDtcblxuICBjb25zdCBjaGVja2VyRm5DaGVja2VyID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7XG4gICAgdHlwZTogY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2Vycy5zdHJpbmcsIGNoZWNrZXJUeXBlVHlwZV0pLm9wdGlvbmFsLFxuICAgIGRpc3BsYXlOYW1lOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgc2hvcnRUeXBlOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgbm90T3B0aW9uYWw6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gICAgbm90UmVxdWlyZWQ6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWxcbiAgfSk7XG5cbiAgY29uc3QgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzID0gW1xuICAgIGNoZWNrZXJzLnNoYXBlKHtcbiAgICAgIG91dHB1dDogY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgICBwcmVmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgc3VmZml4OiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgIGRvY3NCYXNlVXJsOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWxcbiAgICAgIH0pLnN0cmljdC5vcHRpb25hbCxcbiAgICAgIHZlcmJvc2U6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gICAgICBkaXNhYmxlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICAgIH0pLnN0cmljdC5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5vYmplY3RPZihjaGVja2VyRm5DaGVja2VyKS5vcHRpb25hbFxuICBdO1xuXG4gIGNvbnN0IGNoZWNrQXBpQ2hlY2tBcGkgPSBbXG4gICAgY2hlY2tlcnMudHlwZU9yQXJyYXlPZihjaGVja2VyRm5DaGVja2VyKSxcbiAgICBjaGVja2Vycy5hbnkub3B0aW9uYWwsXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgcHJlZml4OiBvcywgc3VmZml4OiBvcywgdXJsU3VmZml4OiBvcywgLy8gYXBwZW5kZWQgY2FzZVxuICAgICAgb25seVByZWZpeDogb3MsIG9ubHlTdWZmaXg6IG9zLCB1cmw6IG9zIC8vIG92ZXJyaWRlIGNhc2VcbiAgICB9KS5zdHJpY3Qub3B0aW9uYWxcbiAgXTtcblxuICByZXR1cm4ge1xuICAgIGNoZWNrZXJGbkNoZWNrZXIsXG4gICAgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzLFxuICAgIGNoZWNrQXBpQ2hlY2tBcGlcbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrLmpzXG4gKiovIiwiY29uc3Qgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xuY29uc3QgY2hlY2tlckhlbHBlcnMgPSB7XG4gIGFkZE9wdGlvbmFsLCBnZXRSZXF1aXJlZFZlcnNpb24sIHNldHVwQ2hlY2tlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2gsIGNvcHksIHR5cGVPZiwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LFxuICBpc0Vycm9yLCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgdW5kZWYsIGNoZWNrZXJIZWxwZXJzLFxuICBub29wXG59O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICBsZXQgdHlwZSA9IHR5cGVPZihvYmopO1xuICBsZXQgZGFDb3B5O1xuICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGRhQ29weSA9IFtdO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgZGFDb3B5ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBlYWNoKG9iaiwgKHZhbCwga2V5KSA9PiB7XG4gICAgZGFDb3B5W2tleV0gPSB2YWw7IC8vIGNhbm5vdCBzaW5nbGUtbGluZSB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBhYm9ydCB0aGUgZWFjaFxuICB9KTtcbiAgcmV0dXJuIGRhQ29weTtcbn1cblxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgb3B0aW9ucykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBkaXNwbGF5O1xuICBsZXQgc2hvcnQgPSBvcHRpb25zICYmIG9wdGlvbnMuc2hvcnQ7XG4gIGlmIChzaG9ydCAmJiBjaGVja2VyLnNob3J0VHlwZSkge1xuICAgIGRpc3BsYXkgPSBjaGVja2VyLnNob3J0VHlwZTtcbiAgfSBlbHNlIGlmICghc2hvcnQgJiYgdHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ29iamVjdCcgfHwgY2hlY2tlci50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BsYXkgPSBnZXRDaGVja2VyVHlwZShjaGVja2VyLCBvcHRpb25zKSB8fCBjaGVja2VyLmRpc3BsYXlOYW1lIHx8IGNoZWNrZXIubmFtZTtcbiAgfVxuICByZXR1cm4gZGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlclR5cGUoe3R5cGV9LCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBfX2FwaUNoZWNrRGF0YSA9IHR5cGUuX19hcGlDaGVja0RhdGE7XG4gICAgbGV0IHR5cGVUeXBlcyA9IHR5cGUob3B0aW9ucyk7XG4gICAgdHlwZSA9IHtcbiAgICAgIF9fYXBpQ2hlY2tEYXRhLFxuICAgICAgW19fYXBpQ2hlY2tEYXRhLnR5cGVdOiB0eXBlVHlwZXNcbiAgICB9O1xuICB9XG4gIHJldHVybiB0eXBlO1xufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuZnVuY3Rpb24gbGlzdChhcnJ5LCBqb2luLCBmaW5hbEpvaW4pIHtcbiAgYXJyeSA9IGFycmF5aWZ5KGFycnkpO1xuICBsZXQgY29weSA9IGFycnkuc2xpY2UoKTtcbiAgbGV0IGxhc3QgPSBjb3B5LnBvcCgpO1xuICBpZiAoY29weS5sZW5ndGggPT09IDEpIHtcbiAgICBqb2luID0gJyAnO1xuICB9XG4gIHJldHVybiBjb3B5LmpvaW4oam9pbikgKyBgJHtjb3B5Lmxlbmd0aCA/IGpvaW4gKyBmaW5hbEpvaW4gOiAnJ30ke2xhc3R9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGUpIHtcbiAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiBjaGVja2VyVHlwZSAhPT0gJ29iamVjdCcgPyBjaGVja2VyVHlwZSA6IHN0cmluZ2lmeShjaGVja2VyVHlwZSk7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IG11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xufVxuXG5mdW5jdGlvbiBuQXRMKG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IHROYW1lID0gdChuYW1lIHx8ICd2YWx1ZScpO1xuICBsZXQgdExvY2F0aW9uID0gIWxvY2F0aW9uID8gJycgOiAnIGF0ICcgKyB0KGxvY2F0aW9uKTtcbiAgcmV0dXJuIGAke3ROYW1lfSR7dExvY2F0aW9ufWA7XG59XG5cbmZ1bmN0aW9uIHQodGhpbmcpIHtcbiAgcmV0dXJuICdgJyArIHRoaW5nICsgJ2AnO1xufVxuXG5mdW5jdGlvbiB1bmRlZih0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJztcbn1cblxuXG5cblxuZnVuY3Rpb24gYWRkT3B0aW9uYWwoY2hlY2tlcikge1xuICBmdW5jdGlvbiBvcHRpb25hbENoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICghdW5kZWYodmFsKSkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgLy8gaW5oZXJpdCBhbGwgcHJvcGVydGllcyBvbiB0aGUgb3JpZ2luYWwgY2hlY2tlclxuICBjb3B5UHJvcHMoY2hlY2tlciwgb3B0aW9uYWxDaGVjayk7XG4gIGVhY2goT2JqZWN0LmtleXMoY2hlY2tlciksIGtleSA9PiBvcHRpb25hbENoZWNrW2tleV0gPSBjaGVja2VyW2tleV0pO1xuXG5cbiAgb3B0aW9uYWxDaGVjay5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgb3B0aW9uYWxDaGVjay5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWUgKyAnIChvcHRpb25hbCknO1xuXG5cbiAgLy8gdGhlIG1hZ2ljIGxpbmUgdGhhdCBhbGxvd3MgeW91IHRvIGFkZCAub3B0aW9uYWwgdG8gdGhlIGVuZCBvZiB0aGUgY2hlY2tlcnNcbiAgY2hlY2tlci5vcHRpb25hbCA9IG9wdGlvbmFsQ2hlY2s7XG5cbiAgLy8gZml4IHR5cGUsIGJlY2F1c2UgaXQncyBub3QgYSBzdHJhaWdodCBjb3B5Li4uXG4gIC8vIHRoZSByZWFzb24gaXMgd2UgbmVlZCB0byBzcGVjaWZ5IHR5cGUuX19hcGlDaGVja0RhdGEub3B0aW9uYWwgYXMgdHJ1ZSBmb3IgdGhlIHRlcnNlL3ZlcmJvc2Ugb3B0aW9uLlxuICAvLyB3ZSBhbHNvIHdhbnQgdG8gYWRkIFwiKG9wdGlvbmFsKVwiIHRvIHRoZSB0eXBlcyB3aXRoIGEgc3RyaW5nXG4gIGlmICh0eXBlb2YgY2hlY2tlci5vcHRpb25hbC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNvcHkoY2hlY2tlci5vcHRpb25hbC50eXBlKTsgLy8gbWFrZSBvdXIgb3duIGNvcHkgb2YgdGhpc1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGVja2VyLnR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSArPSAnIChvcHRpb25hbCknO1xuICAgIHJldHVybjtcbiAgfVxuICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkgfHwge307IC8vIGFuZCB0aGlzXG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG59XG5cbi8qKlxuICogVGhpcyB3aWxsIHNldCB1cCB0aGUgY2hlY2tlciB3aXRoIGFsbCBvZiB0aGUgZGVmYXVsdHMgdGhhdCBtb3N0IGNoZWNrZXJzIHdhbnQgbGlrZSByZXF1aXJlZCBieSBkZWZhdWx0IGFuZCBhblxuICogb3B0aW9uYWwgdmVyc2lvblxuICogQHBhcmFtIGNoZWNrZXJcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIHByb3BlcnRpZXMgdG8gYWRkIHRvIHRoZSBjaGVja2VyXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ2hlY2tlcihjaGVja2VyLCBwcm9wZXJ0aWVzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgY2hlY2tlci5ub29wID0gbm9vcDsgLy8gZG8gdGhpcyBmaXJzdCwgc28gaXQgY2FuIGJlIG92ZXJ3cml0dGVuLlxuICBpZiAodHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjaGVja2VyLnNob3J0VHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgfVxuXG4gIC8vIGFzc2lnbiBhbGwgcHJvcGVydGllcyBnaXZlblxuICBlYWNoKHByb3BlcnRpZXMsIChwcm9wLCBuYW1lKSA9PiBjaGVja2VyW25hbWVdID0gcHJvcCk7XG5cbiAgaWYgKCFjaGVja2VyLmRpc3BsYXlOYW1lKSB7XG4gICAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci5zaG9ydFR5cGUgfHwgY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIH1cblxuICBpZiAoIWNoZWNrZXIubm90UmVxdWlyZWQpIHtcbiAgICBjaGVja2VyID0gZ2V0UmVxdWlyZWRWZXJzaW9uKGNoZWNrZXIpO1xuICB9XG5cbiAgaWYgKCFjaGVja2VyLm5vdE9wdGlvbmFsKSB7XG4gICAgYWRkT3B0aW9uYWwoY2hlY2tlcik7XG4gIH1cbiAgcmV0dXJuIGNoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGdldFJlcXVpcmVkVmVyc2lvbihjaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHJlcXVpcmVkQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAodW5kZWYodmFsKSAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBsZXQgdExvY2F0aW9uID0gbG9jYXRpb24gPyBgIGluICR7dChsb2NhdGlvbil9YCA6ICcnO1xuICAgICAgY29uc3QgdHlwZSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICAgICAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiB0eXBlICE9PSAnb2JqZWN0JyA/IHR5cGUgOiBzdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICBjb3B5UHJvcHMoY2hlY2tlciwgcmVxdWlyZWRDaGVja2VyKTtcbiAgcmV0dXJuIHJlcXVpcmVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gY29weVByb3BzKHNyYywgZGVzdCkge1xuICBlYWNoKE9iamVjdC5rZXlzKHNyYyksIGtleSA9PiBkZXN0W2tleV0gPSBzcmNba2V5XSk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnMsXG4gIHVuZGVmXG4gIH0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge3NldHVwQ2hlY2tlcn0gPSBjaGVja2VySGVscGVycztcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5OiB0eXBlT2ZDaGVja0dldHRlcignQXJyYXknKSxcbiAgYm9vbDogdHlwZU9mQ2hlY2tHZXR0ZXIoJ0Jvb2xlYW4nKSxcbiAgbnVtYmVyOiB0eXBlT2ZDaGVja0dldHRlcignTnVtYmVyJyksXG4gIHN0cmluZzogdHlwZU9mQ2hlY2tHZXR0ZXIoJ1N0cmluZycpLFxuICBmdW5jOiBmdW5jQ2hlY2tHZXR0ZXIoKSxcbiAgb2JqZWN0OiBvYmplY3RDaGVja0dldHRlcigpLFxuXG4gIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gIG9uZU9mOiBvbmVPZkNoZWNrR2V0dGVyLFxuICBvbmVPZlR5cGU6IG9uZU9mVHlwZUNoZWNrR2V0dGVyLFxuXG4gIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgb2JqZWN0T2Y6IG9iamVjdE9mQ2hlY2tHZXR0ZXIsXG4gIHR5cGVPckFycmF5T2Y6IHR5cGVPckFycmF5T2ZDaGVja0dldHRlcixcblxuICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuICBhcmdzOiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5mdW5jdGlvbiB0eXBlT2ZDaGVja0dldHRlcih0eXBlKSB7XG4gIGNvbnN0IGxUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09IGxUeXBlKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGV9KTtcbn1cblxuZnVuY3Rpb24gZnVuY0NoZWNrR2V0dGVyKCkge1xuICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZX0pO1xuXG4gIGZ1bmN0aW9uQ2hlY2tlci53aXRoUHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFdpdGhQcm9wZXJ0aWVzQ2hlY2tlcihwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXBpRXJyb3IgPSBjaGVja2Vycy5vYmplY3RPZihjaGVja2Vycy5mdW5jKShwcm9wZXJ0aWVzLCAncHJvcGVydGllcycsICdhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzJyk7XG4gICAgaWYgKGlzRXJyb3IoYXBpRXJyb3IpKSB7XG4gICAgICB0aHJvdyBhcGlFcnJvcjtcbiAgICB9XG4gICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHByb3BlcnRpZXMsIHRydWUpO1xuICAgIHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUgPSAnZnVuYy53aXRoUHJvcGVydGllcyc7XG5cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uV2l0aFByb3BlcnRpZXNDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdEZ1bmN0aW9uID0gY2hlY2tlcnMuZnVuYyh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKG5vdEZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gbm90RnVuY3Rpb247XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIH0sIHt0eXBlOiBzaGFwZUNoZWNrZXIudHlwZSwgc2hvcnRUeXBlOiAnZnVuYy53aXRoUHJvcGVydGllcyd9KTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gb2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnT2JqZWN0JztcbiAgY29uc3QgbnVsbFR5cGUgPSAnT2JqZWN0IChudWxsIG9rKSc7XG4gIGxldCBvYmplY3ROdWxsT2tDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIG51bGxUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlOiBudWxsVHlwZX0pO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlfSk7XG5cbiAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuXG4gIHJldHVybiBvYmplY3RDaGVja2VyO1xufVxuXG5cbmZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCEodmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgfVxuICB9LCB7dHlwZTogY2xhc3NUb0NoZWNrLm5hbWV9KTtcbn1cblxuZnVuY3Rpb24gb25lT2ZDaGVja0dldHRlcihlbnVtcykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnZW51bSd9LFxuICAgIGVudW06IGVudW1zXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlske2VudW1zLm1hcChlbm0gPT4gc3RyaW5naWZ5KGVubSkpLmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tHZXR0ZXIoY2hlY2tlcnMpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29uZU9mVHlwZSd9LFxuICAgIG9uZU9mVHlwZTogY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKSlcbiAgfTtcbiAgY29uc3QgY2hlY2tlcnNEaXNwbGF5ID0gY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlR5cGVbJHtjaGVja2Vyc0Rpc3BsYXkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gIWlzRXJyb3IoY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZSwgc2hvcnRUeXBlfSk7XG59XG5cbmZ1bmN0aW9uIGFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdhcnJheU9mJ30sXG4gICAgYXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYGFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhcnJheU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLmFycmF5KHZhbCkpIHx8ICF2YWwuZXZlcnkoKGl0ZW0pID0+ICFpc0Vycm9yKGNoZWNrZXIoaXRlbSkpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGUsIHNob3J0VHlwZX0pO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29iamVjdE9mJ30sXG4gICAgb2JqZWN0T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvYmplY3RPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGNvbnN0IG5vdE9iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICBpZiAoaXNFcnJvcihub3RPYmplY3QpKSB7XG4gICAgICByZXR1cm4gbm90T2JqZWN0O1xuICAgIH1cbiAgICBjb25zdCBhbGxUeXBlc1N1Y2Nlc3MgPSBlYWNoKHZhbCwgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3R5cGVPckFycmF5T2YnfSxcbiAgICB0eXBlT3JBcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgdHlwZU9yQXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZSwgc2hvcnRUeXBlfSk7XG59XG5cbmZ1bmN0aW9uIGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSB7XG4gIGZ1bmN0aW9uIHNoYXBlQ2hlY2tHZXR0ZXIoc2hhcGUsIG5vbk9iamVjdCkge1xuICAgIGxldCBzaGFwZVR5cGVzID0ge307XG4gICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgIHNoYXBlVHlwZXNbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiB0eXBlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgY29uc3Qge3RlcnNlLCBvYmosIGFkZEhlbHBlcnN9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBhcmVudFJlcXVpcmVkID0gb3B0aW9ucy5yZXF1aXJlZDtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgICAgY29uc3Qgc3BlY2lmaWVkID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKTtcbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSB1bmRlZihwYXJlbnRSZXF1aXJlZCkgPyAhY2hlY2tlci5pc09wdGlvbmFsIDogcGFyZW50UmVxdWlyZWQ7XG4gICAgICAgIGlmICghdGVyc2UgfHwgKHNwZWNpZmllZCB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSkge1xuICAgICAgICAgIHJldFtwcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHt0ZXJzZSwgb2JqOiBvYmogJiYgb2JqW3Byb3BdLCByZXF1aXJlZCwgYWRkSGVscGVyc30pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGRIZWxwZXJzKSB7XG4gICAgICAgICAgbW9kaWZ5VHlwZURpc3BsYXlUb0hlbHBPdXQocmV0LCBwcm9wLCBzcGVjaWZpZWQsIGNoZWNrZXIsIHJlcXVpcmVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuXG4gICAgICBmdW5jdGlvbiBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKCFzcGVjaWZpZWQgJiYgcmVxdWlyZWQgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgIGxldCBpdGVtID0gJ0lURU0nO1xuICAgICAgICAgIGlmIChjaGVja2VyLnR5cGUgJiYgY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB7XG4gICAgICAgICAgICBpdGVtID0gY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkSGVscGVyKFxuICAgICAgICAgICAgJ21pc3NpbmcnLCAnTUlTU0lORyBUSElTICcgKyBpdGVtLCAnIDwtLSBZT1UgQVJFIE1JU1NJTkcgVEhJUydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHNwZWNpZmllZCkge1xuICAgICAgICAgIGxldCBlcnJvciA9IGNoZWNrZXIob2JqW3Byb3BdLCBwcm9wLCBudWxsLCBvYmopO1xuICAgICAgICAgIGlmIChpc0Vycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgYWRkSGVscGVyKCdlcnJvcicsICdUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSwgJyA8LS0gVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEhlbHBlcihwcm9wZXJ0eSwgb2JqZWN0TWVzc2FnZSwgc3RyaW5nTWVzc2FnZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmV0W3Byb3BdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0W3Byb3BdICs9IHN0cmluZ01lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtwcm9wXS5fX2FwaUNoZWNrRGF0YVtwcm9wZXJ0eV0gPSBvYmplY3RNZXNzYWdlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHR5cGUuX19hcGlDaGVja0RhdGEgPSB7c3RyaWN0OiBmYWxzZSwgb3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnc2hhcGUnfTtcbiAgICBsZXQgc2hhcGVDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgbGV0IGlzT2JqZWN0ID0gIW5vbk9iamVjdCAmJiBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihpc09iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgICAgfVxuICAgICAgbGV0IHNoYXBlUHJvcEVycm9yO1xuICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbiA/IGxvY2F0aW9uICsgKG5hbWUgPyAnLycgOiAnJykgOiAnJztcbiAgICAgIG5hbWUgPSBuYW1lIHx8ICcnO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgYCR7bG9jYXRpb259JHtuYW1lfWAsIHZhbCk7XG4gICAgICAgICAgcmV0dXJuICFpc0Vycm9yKHNoYXBlUHJvcEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZVByb3BFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlUHJvcEVycm9yO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6ICdzaGFwZSd9KTtcblxuICAgIGZ1bmN0aW9uIHN0cmljdFR5cGUoKSB7XG4gICAgICByZXR1cm4gdHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhLnN0cmljdCA9IHRydWU7XG4gICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZUVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbG93ZWRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2hhcGUpO1xuICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCB7dHlwZTogc3RyaWN0VHlwZSwgc2hvcnRUeXBlOiAnc3RyaWN0IHNoYXBlJ30pO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBpZk5vdENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH0sIHtub3RSZXF1aXJlZDogdHJ1ZSwgdHlwZSwgc2hvcnRUeXBlOiBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9KTtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH0sIHt0eXBlLCBzaG9ydFR5cGU6IGBvbmx5SWZbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWB9KTtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYXJndW1lbnRzQ2hlY2tlckdldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdmdW5jdGlvbiBhcmd1bWVudHMnO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm9iamVjdCh2YWwpKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm51bWJlcih2YWwubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZX0pO1xufVxuXG5mdW5jdGlvbiBhbnlDaGVja0dldHRlcigpIHtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xuICB9LCB7dHlwZTogJ2FueSd9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeTtcblxuZnVuY3Rpb24gZ2V0U2VyaWFsaXplIChmbiwgZGVjeWNsZSkge1xuICB2YXIgc2VlbiA9IFtdLCBrZXlzID0gW107XG4gIGRlY3ljbGUgPSBkZWN5Y2xlIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gJ1tDaXJjdWxhciAnICsgZ2V0UGF0aCh2YWx1ZSwgc2Vlbiwga2V5cykgKyAnXSdcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAgIGlmIChzZWVuLmluZGV4T2YodmFsdWUpICE9PSAtMSlcbiAgICAgICAgcmV0ID0gZGVjeWNsZShrZXksIHZhbHVlKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZuKSByZXQgPSBmbihrZXksIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoICh2YWx1ZSwgc2Vlbiwga2V5cykge1xuICB2YXIgaW5kZXggPSBzZWVuLmluZGV4T2YodmFsdWUpO1xuICB2YXIgcGF0aCA9IFsga2V5c1tpbmRleF0gXTtcbiAgZm9yIChpbmRleC0tOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgaWYgKHNlZW5baW5kZXhdWyBwYXRoWzBdIF0gPT09IHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHNlZW5baW5kZXhdO1xuICAgICAgcGF0aC51bnNoaWZ0KGtleXNbaW5kZXhdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICd+JyArIHBhdGguam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCBmbiwgc3BhY2VzLCBkZWN5Y2xlKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIGdldFNlcmlhbGl6ZShmbiwgZGVjeWNsZSksIHNwYWNlcyk7XG59XG5cbnN0cmluZ2lmeS5nZXRTZXJpYWxpemUgPSBnZXRTZXJpYWxpemU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGktY2hlY2suanMifQ==