// apiCheck.js v7.0.0-beta.0 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	      return JSON.stringify(types, null, 2);
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
	    var argTypes = args.map(getArgDisplay);
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
	
	function getDisplay(obj) {
	  var argDisplay = {};
	  each(obj, function (v, k) {
	    return argDisplay[k] = getArgDisplay(v);
	  });
	  return argDisplay;
	}
	
	function getArgDisplay(arg) {
	  /* jshint maxcomplexity:7 */
	  var cName = arg && arg.constructor && arg.constructor.name;
	  var type = typeOf(arg);
	  var hasKeys = arg && Object.keys(arg).length;
	
	  if (type === "function") {
	    if (hasKeys) {
	      return cName + " (with properties: " + JSON.stringify(getDisplay(arg)) + ")";
	    }
	    return cName;
	  }
	
	  if (arg === null) {
	    return "null";
	  }
	
	  if (type !== "array" && type !== "object") {
	    return type;
	  }
	
	  if (hasKeys) {
	    return getDisplay(arg);
	  }
	
	  return cName;
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
	  var stringType = typeof checkerType !== "object" ? checkerType : JSON.stringify(checkerType);
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
	      var stringType = typeof type !== "object" ? type : JSON.stringify(type);
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
	    return JSON.stringify(enm);
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3NGZjOTNjYWY4MTI5YWZkYmI0NyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUErRCxZQUFZLENBQS9FLElBQUk7S0FBRSxPQUFPLEdBQXNELFlBQVksQ0FBekUsT0FBTztLQUFFLENBQUMsR0FBbUQsWUFBWSxDQUFoRSxDQUFDO0tBQUUsUUFBUSxHQUF5QyxZQUFZLENBQTdELFFBQVE7S0FBRSxpQkFBaUIsR0FBc0IsWUFBWSxDQUFuRCxpQkFBaUI7S0FBRSxNQUFNLEdBQWMsWUFBWSxDQUFoQyxNQUFNO0tBQUUsUUFBUSxHQUFJLFlBQVksQ0FBeEIsUUFBUTs7QUFDdEUsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxtQkFBWSxDQUFDLENBQUM7QUFDdkMsS0FBTSxZQUFZLEdBQUcsZUFB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QyxhQUFhLEVBQUU7QUFDbEIsZ0JBQU8sUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsTUFBTTtBQUNMLGdCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRDtNQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFFLFNBQVMsY0FBWSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7O0FBRUYsVUFBTyxnQkFBZ0IsQ0FBQztFQUN6Qjs7QUFFRCxVQUFTLHNCQUFzQixHQUFHO0FBQ2hDLE9BQU0sSUFBSSxHQUFHLG9CQUFvQixDQUFDO0FBQ2xDLFVBQU8sWUFBWSxDQUFDLFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDdEUsU0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7QUFDL0YsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN2QztJQUNGLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFDLENBQUMsQ0FBQztFQUNaOztBQUVELFVBQVMsY0FBYyxHQUFHO0FBQ3hCLFVBQU8sWUFBWSxDQUFDLFNBQVMsb0JBQW9CLEdBQUcsRUFFbkQsRUFBRSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0VBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc0ZmM5M2NhZjgxMjlhZmRiYjQ3XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FwaUNoZWNrJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IGFwaUNoZWNrVXRpbCA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7ZWFjaCwgaXNFcnJvciwgdCwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCB0eXBlT2YsIGdldEVycm9yfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xuY29uc3QgYXBpQ2hlY2tBcGlzID0gZ2V0QXBpQ2hlY2tBcGlzKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZTtcbm1vZHVsZS5leHBvcnRzLnV0aWxzID0gYXBpQ2hlY2tVdGlsO1xubW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnID0ge1xuICB2ZXJib3NlOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlXG59O1xuXG5jb25zdCBhcGlDaGVja0FwaUNoZWNrID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZSh7XG4gIG91dHB1dDoge3ByZWZpeDogJ2FwaUNoZWNrJ31cbn0pO1xubW9kdWxlLmV4cG9ydHMuaW50ZXJuYWxDaGVja2VyID0gYXBpQ2hlY2tBcGlDaGVjaztcblxuXG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tJbnN0YW5jZShjb25maWcgPSB7fSwgZXh0cmFDaGVja2VycyA9IHt9KSB7XG4gIGlmIChhcGlDaGVja0FwaUNoZWNrICYmIGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBhcGlDaGVja0FwaUNoZWNrLnRocm93KGFwaUNoZWNrQXBpcy5nZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsIGFyZ3VtZW50cywge1xuICAgICAgcHJlZml4OiAnY3JlYXRpbmcgYW4gYXBpQ2hlY2sgaW5zdGFuY2UnXG4gICAgfSk7XG4gIH1cblxuICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7XG4gICAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICAgIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcbiAgICBnZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFuZGxlRXJyb3JNZXNzYWdlLFxuICAgIGNvbmZpZzoge1xuICAgICAgb3V0cHV0OiBjb25maWcub3V0cHV0IHx8IHtcbiAgICAgICAgcHJlZml4OiAnJyxcbiAgICAgICAgc3VmZml4OiAnJyxcbiAgICAgICAgZG9jc0Jhc2VVcmw6ICcnXG4gICAgICB9LFxuICAgICAgdmVyYm9zZTogY29uZmlnLnZlcmJvc2UgfHwgZmFsc2UsXG4gICAgICBkaXNhYmxlZDogY29uZmlnLmRpc2FibGVkIHx8IGZhbHNlXG4gICAgfSxcbiAgICB1dGlsczogYXBpQ2hlY2tVdGlsXG4gIH07XG5cbiAgZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gd3JhcHBlcik7XG4gIGVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiB7XG4gICAgaWYgKCghYWRkaXRpb25hbFByb3BlcnRpZXMuZGlzYWJsZWQgJiYgIW1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZCkgfHwgIWNoZWNrZXIubm9vcCkge1xuICAgICAgYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIubm9vcDtcbiAgICB9XG4gIH0pO1xuICBlYWNoKGV4dHJhQ2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuXG4gIHJldHVybiBhcGlDaGVjaztcblxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBpbnN0YW5jZSBmdW5jdGlvbi4gT3RoZXIgdGhpbmdzIGFyZSBhdHRhY2hlZCB0byB0aGlzIHNlZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYWJvdmUuXG4gICAqIEBwYXJhbSBhcGkge0FycmF5fVxuICAgKiBAcGFyYW0gYXJncyB7YXJndW1lbnRzfVxuICAgKiBAcGFyYW0gb3V0cHV0IHtPYmplY3R9XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gaWYgdGhpcyBoYXMgYSBmYWlsZWQgPSB0cnVlIHByb3BlcnR5LCB0aGVuIGl0IGZhaWxlZFxuICAgKi9cbiAgZnVuY3Rpb24gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo4ICovXG4gICAgaWYgKGFwaUNoZWNrLmNvbmZpZy5kaXNhYmxlZCB8fCBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwaVR5cGVzOiB7fSwgYXJnVHlwZXM6IHt9LFxuICAgICAgICBwYXNzZWQ6IHRydWUsIG1lc3NhZ2U6ICcnLFxuICAgICAgICBmYWlsZWQ6IGZhbHNlXG4gICAgICB9OyAvLyBlbXB0eSB2ZXJzaW9uIG9mIHdoYXQgaXMgbm9ybWFsbHkgcmV0dXJuZWRcbiAgICB9XG4gICAgY2hlY2tBcGlDaGVja0FwaShhcmd1bWVudHMpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcGkpKSB7XG4gICAgICBhcGkgPSBbYXBpXTtcbiAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHR1cm4gYXJndW1lbnRzIGludG8gYW4gYXJyYXlcbiAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2VzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHRoaXMgaXMgd2hlcmUgd2UgYWN0dWFsbHkgZ28gcGVyZm9ybSB0aGUgY2hlY2tzLlxuICAgICAgbWVzc2FnZXMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncyk7XG4gICAgfVxuXG4gICAgbGV0IHJldHVybk9iamVjdCA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcywgb3V0cHV0KTtcbiAgICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9ICcnO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tBcGlDaGVja0FwaSwgc2hvdWxkIGJlIHJlYWQgbGlrZTogY2hlY2sgYXBpQ2hlY2sgYXBpLiBBcyBpbiwgY2hlY2sgdGhlIGFwaSBmb3IgYXBpQ2hlY2sgOi0pXG4gICAqIEBwYXJhbSBjaGVja0FwaUFyZ3NcbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrQXBpQ2hlY2tBcGkoY2hlY2tBcGlBcmdzKSB7XG4gICAgY29uc3QgYXBpID0gY2hlY2tBcGlBcmdzWzBdO1xuICAgIGNvbnN0IGFyZ3MgPSBjaGVja0FwaUFyZ3NbMV07XG4gICAgdmFyIGlzQXJyYXlPckFyZ3MgPSBBcnJheS5pc0FycmF5KGFyZ3MpIHx8IChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYXJncy5sZW5ndGggPT09ICdudW1iZXInKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGFwaSkgJiYgIWlzQXJyYXlPckFyZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoYXBpLCBbYXJnc10sXG4gICAgICAgIFsnSWYgYW4gYXJyYXkgaXMgcHJvdmlkZWQgZm9yIHRoZSBhcGksIGFuIGFycmF5IG11c3QgYmUgcHJvdmlkZWQgZm9yIHRoZSBhcmdzIGFzIHdlbGwuJ10sXG4gICAgICAgIHtwcmVmaXg6ICdhcGlDaGVjayd9XG4gICAgICApKTtcbiAgICB9XG4gICAgLy8gZG9nIGZvb2RpbmcgaGVyZVxuICAgIGNvbnN0IGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncywgZXJyb3JzLCB7XG4gICAgICAgIHByZWZpeDogJ2FwaUNoZWNrJ1xuICAgICAgfSk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBnZXRBcGlDaGVjayhzaG91bGRUaHJvdykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAgIGxldCByZXN1bHQgPSBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UsIHNob3VsZFRocm93KTtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIHdvbnQgZ2V0IGhlcmUgaWYgYW4gZXJyb3IgaXMgdGhyb3duXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCBzaG91bGRUaHJvdykge1xuICAgIGlmIChzaG91bGRUaHJvdyAmJiBtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMgPSBbXSwgb3V0cHV0ID0ge30pIHtcbiAgICBsZXQgZ091dCA9IGFwaUNoZWNrLmNvbmZpZy5vdXRwdXQgfHwge307XG4gICAgbGV0IHByZWZpeCA9IGdldFByZWZpeCgpO1xuICAgIGxldCBzdWZmaXggPSBnZXRTdWZmaXgoKTtcbiAgICBsZXQgdXJsID0gZ2V0VXJsKCk7XG4gICAgbGV0IG1lc3NhZ2UgPSBgYXBpQ2hlY2sgZmFpbGVkISAke21lc3NhZ2VzLmpvaW4oJywgJyl9YDtcbiAgICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fSAke21lc3NhZ2V9ICR7c3VmZml4fSAke3VybCB8fCAnJ30ke3Bhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWR9YC50cmltKCk7XG5cbiAgICBmdW5jdGlvbiBnZXRQcmVmaXgoKSB7XG4gICAgICBsZXQgcHJlZml4ID0gb3V0cHV0Lm9ubHlQcmVmaXg7XG4gICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICBwcmVmaXggPSBgJHtnT3V0LnByZWZpeCB8fCAnJ30gJHtvdXRwdXQucHJlZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdWZmaXgoKSB7XG4gICAgICBsZXQgc3VmZml4ID0gb3V0cHV0Lm9ubHlTdWZmaXg7XG4gICAgICBpZiAoIXN1ZmZpeCkge1xuICAgICAgICBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1ZmZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVcmwoKSB7XG4gICAgICBsZXQgdXJsID0gb3V0cHV0LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IGdPdXQuZG9jc0Jhc2VVcmwgJiYgb3V0cHV0LnVybFN1ZmZpeCAmJiBgJHtnT3V0LmRvY3NCYXNlVXJsfSR7b3V0cHV0LnVybFN1ZmZpeH1gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKSB7XG4gICAgbGV0IHthcGlUeXBlcywgYXJnVHlwZXN9ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBsZXQgY29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MgfHwgW10pO1xuICAgIGxldCByZXBsYWNlZEl0ZW1zID0gW107XG4gICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUoY29weSk7XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGdldE9iamVjdFN0cmluZyhjb3B5KTtcbiAgICBhcmdUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcmdUeXBlcyk7XG4gICAgYXBpVHlwZXMgPSBnZXRPYmplY3RTdHJpbmcoYXBpVHlwZXMpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRlTWVzc2FnZSgpO1xuXG5cbiAgICAvLyBmdW5jdGlvbnNcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VGdW5jdGlvbldpdGhOYW1lKG9iaikge1xuICAgICAgZWFjaChvYmosICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBpZiAocmVwbGFjZWRJdGVtcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7IC8vIGF2b2lkIHJlY3Vyc2l2ZSBwcm9ibGVtc1xuICAgICAgICAgIHJlcGxhY2VkSXRlbXMucHVzaCh2YWwpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbC5kaXNwbGF5TmFtZSB8fCB2YWwubmFtZSB8fCAnYW5vbnltb3VzIGZ1bmN0aW9uJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9iamVjdFN0cmluZyh0eXBlcykge1xuICAgICAgaWYgKCF0eXBlcyB8fCAhdHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnbm90aGluZyc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVzICYmIHR5cGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlcyA9IHR5cGVzWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHR5cGVzLCBudWxsLCAyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2UoKSB7XG4gICAgICBjb25zdCBuID0gJ1xcbic7XG4gICAgICBsZXQgdXNlUyA9IHRydWU7XG4gICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdXNlUyA9ICEhT2JqZWN0LmtleXMoYXJnc1swXSkubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVzZVMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdHlwZXMgPSBgdHlwZSR7dXNlUyA/ICdzJyA6ICcnfWA7XG4gICAgICBjb25zdCBuZXdMaW5lID0gbiArIG47XG4gICAgICByZXR1cm4gYFlvdSBwYXNzZWQ6JHtufSR7cGFzc2VkQXJnc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBXaXRoIHRoZSAke3R5cGVzfToke259JHthcmdUeXBlc30ke25ld0xpbmV9YCArXG4gICAgICAgIGBUaGUgQVBJIGNhbGxzIGZvcjoke259JHthcGlUeXBlc31gO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGVzKGFwaSwgYXJncykge1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICAgIGxldCBhcGlUeXBlcyA9IGFwaS5tYXAoKGNoZWNrZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzcGVjaWZpZWQgPSBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuaGFzT3duUHJvcGVydHkoJ3ZlcmJvc2UnKTtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7XG4gICAgICAgIHRlcnNlOiBzcGVjaWZpZWQgPyAhbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLnZlcmJvc2UgOiAhYXBpQ2hlY2suY29uZmlnLnZlcmJvc2UsXG4gICAgICAgIG9iajogYXJnc1tpbmRleF0sXG4gICAgICAgIGFkZEhlbHBlcnM6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKGdldEFyZ0Rpc3BsYXkpO1xuICAgIHJldHVybiB7YXJnVHlwZXM6IGFyZ1R5cGVzLCBhcGlUeXBlc307XG4gIH1cblxufVxuXG5cbi8vIFNUQVRFTEVTUyBGVU5DVElPTlNcblxuLyoqXG4gKiBUaGlzIGlzIHdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zIGZvciBhY3R1YWxseSBjaGVja2luZyB0aGUgYXJndW1lbnRzIHdpdGggdGhlIGFwaS5cbiAqIEBwYXJhbSBhcGkge0FycmF5fSAtIGNoZWNrZXJzXG4gKiBAcGFyYW0gYXJncyB7QXJyYXl9IC0gYW5kIGFyZ3VtZW50cyBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzLCBsYXN0Q2hlY2tlciwgYXJnTmFtZSwgYXJnRmFpbGVkLCBza2lwUHJldmlvdXNDaGVja2VyO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUgKChjaGVja2VyID0gYXBpW2NoZWNrZXJJbmRleCsrXSkgJiYgKGFyZ0luZGV4IDwgYXJncy5sZW5ndGgpKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICBhcmdOYW1lID0gJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCAndmFsdWUnLCBhcmdOYW1lKTtcbiAgICBhcmdGYWlsZWQgPSBpc0Vycm9yKHJlcyk7XG4gICAgbGFzdENoZWNrZXIgPSBjaGVja2VySW5kZXggPj0gYXBpLmxlbmd0aDtcbiAgICBza2lwUHJldmlvdXNDaGVja2VyID0gY2hlY2tlckluZGV4ID4gMSAmJiBhcGlbY2hlY2tlckluZGV4IC0gMV0uaXNPcHRpb25hbDtcbiAgICBpZiAoKGFyZ0ZhaWxlZCAmJiBsYXN0Q2hlY2tlcikgfHwgKGFyZ0ZhaWxlZCAmJiAhbGFzdENoZWNrZXIgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCAmJiAhc2tpcFByZXZpb3VzQ2hlY2tlcikpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCBhcmcpKTtcbiAgICB9IGVsc2UgaWYgKGFyZ0ZhaWxlZCAmJiBjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goYCR7dChhcmdOYW1lKX0gcGFzc2VkYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWlsZWQgPyBtZXNzYWdlcyA6IFtdO1xufVxuXG5cbmNoZWNrZXJUeXBlVHlwZS50eXBlID0gJ2Z1bmN0aW9uIHdpdGggX19hcGlDaGVja0RhdGEgcHJvcGVydHkgYW5kIGAke2Z1bmN0aW9uLnR5cGV9YCBwcm9wZXJ0eSc7XG5mdW5jdGlvbiBjaGVja2VyVHlwZVR5cGUoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IGFwaUNoZWNrRGF0YUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZSh7XG4gICAgdHlwZTogY2hlY2tlcnMuc3RyaW5nLFxuICAgIG9wdGlvbmFsOiBjaGVja2Vycy5ib29sXG4gIH0pO1xuICBjb25zdCBhc0Z1bmMgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCBhc1NoYXBlID0gY2hlY2tlcnMuc2hhcGUoe19fYXBpQ2hlY2tEYXRhOiBhcGlDaGVja0RhdGFDaGVja2VyfSk7XG4gIGNvbnN0IHdyb25nU2hhcGUgPSBjaGVja2Vycy5vbmVPZlR5cGUoW1xuICAgIGFzRnVuYywgYXNTaGFwZVxuICBdKShjaGVja2VyVHlwZSwgbmFtZSwgbG9jYXRpb24pO1xuICBpZiAoaXNFcnJvcih3cm9uZ1NoYXBlKSkge1xuICAgIHJldHVybiB3cm9uZ1NoYXBlO1xuICB9XG4gIGlmICh0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdmdW5jdGlvbicgJiYgIWNoZWNrZXJUeXBlLmhhc093blByb3BlcnR5KGNoZWNrZXJUeXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUpKSB7XG4gICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZVR5cGUudHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIHZhbCkge1xuICBsZXQgY2hlY2tlckhlbHAgPSBnZXRDaGVja2VySGVscChjaGVja2VyLCB2YWwpO1xuICBjaGVja2VySGVscCA9IGNoZWNrZXJIZWxwID8gJyAtICcgKyBjaGVja2VySGVscCA6ICcnO1xuICByZXR1cm4gcmVzLm1lc3NhZ2UgKyBjaGVja2VySGVscDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckhlbHAoe2hlbHB9LCB2YWwpIHtcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh0eXBlb2YgaGVscCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhlbHAgPSBoZWxwKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGhlbHA7XG59XG5cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdOb3QgZW5vdWdoIGFyZ3VtZW50cyBzcGVjaWZpZWQuIFJlcXVpcmVzIGAnICsgcmVxdWlyZWRBcmdzLmxlbmd0aCArICdgLCB5b3UgcGFzc2VkIGAnICsgYXJncy5sZW5ndGggKyAnYCdcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5KG9iaikge1xuICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuICBlYWNoKG9iaiwgKHYsIGspID0+IGFyZ0Rpc3BsYXlba10gPSBnZXRBcmdEaXNwbGF5KHYpKTtcbiAgcmV0dXJuIGFyZ0Rpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIGdldEFyZ0Rpc3BsYXkoYXJnKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgY29uc3QgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICBjb25zdCB0eXBlID0gdHlwZU9mKGFyZyk7XG4gIGNvbnN0IGhhc0tleXMgPSBhcmcgJiYgT2JqZWN0LmtleXMoYXJnKS5sZW5ndGg7XG5cbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaGFzS2V5cykge1xuICAgICAgcmV0dXJuIGNOYW1lICsgJyAod2l0aCBwcm9wZXJ0aWVzOiAnICsgSlNPTi5zdHJpbmdpZnkoZ2V0RGlzcGxheShhcmcpKSArICcpJztcbiAgICB9XG4gICAgcmV0dXJuIGNOYW1lO1xuICB9XG5cbiAgaWYgKGFyZyA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH1cblxuICBpZiAodHlwZSAhPT0gJ2FycmF5JyAmJiB0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgaWYgKGhhc0tleXMpIHtcbiAgICByZXR1cm4gZ2V0RGlzcGxheShhcmcpO1xuICB9XG5cbiAgcmV0dXJuIGNOYW1lO1xufVxuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0FwaXMoKSB7XG4gIGNvbnN0IG9zID0gY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsO1xuXG4gIGNvbnN0IGNoZWNrZXJGbkNoZWNrZXIgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgICB0eXBlOiBjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXJzLnN0cmluZywgY2hlY2tlclR5cGVUeXBlXSkub3B0aW9uYWwsXG4gICAgZGlzcGxheU5hbWU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBzaG9ydFR5cGU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBub3RPcHRpb25hbDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICBub3RSZXF1aXJlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICB9KTtcblxuICBjb25zdCBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMgPSBbXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgb3V0cHV0OiBjaGVja2Vycy5zaGFwZSh7XG4gICAgICAgIHByZWZpeDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICBzdWZmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgZG9jc0Jhc2VVcmw6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgICAgdmVyYm9zZTogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICAgIGRpc2FibGVkOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgIGNoZWNrZXJzLm9iamVjdE9mKGNoZWNrZXJGbkNoZWNrZXIpLm9wdGlvbmFsXG4gIF07XG5cbiAgY29uc3QgY2hlY2tBcGlDaGVja0FwaSA9IFtcbiAgICBjaGVja2Vycy50eXBlT3JBcnJheU9mKGNoZWNrZXJGbkNoZWNrZXIpLFxuICAgIGNoZWNrZXJzLmFueS5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5zaGFwZSh7XG4gICAgICBwcmVmaXg6IG9zLCBzdWZmaXg6IG9zLCB1cmxTdWZmaXg6IG9zLCAvLyBhcHBlbmRlZCBjYXNlXG4gICAgICBvbmx5UHJlZml4OiBvcywgb25seVN1ZmZpeDogb3MsIHVybDogb3MgLy8gb3ZlcnJpZGUgY2FzZVxuICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuXG4gIHJldHVybiB7XG4gICAgY2hlY2tlckZuQ2hlY2tlcixcbiAgICBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsXG4gICAgY2hlY2tBcGlDaGVja0FwaVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgYWRkT3B0aW9uYWwsIGdldFJlcXVpcmVkVmVyc2lvbiwgc2V0dXBDaGVja2VyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksXG4gIGlzRXJyb3IsIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCB1bmRlZiwgY2hlY2tlckhlbHBlcnMsXG4gIG5vb3Bcbn07XG5cbmZ1bmN0aW9uIGNvcHkob2JqKSB7XG4gIGxldCB0eXBlID0gdHlwZU9mKG9iaik7XG4gIGxldCBkYUNvcHk7XG4gIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgZGFDb3B5ID0gW107XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBkYUNvcHkgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGVhY2gob2JqLCAodmFsLCBrZXkpID0+IHtcbiAgICBkYUNvcHlba2V5XSA9IHZhbDsgLy8gY2Fubm90IHNpbmdsZS1saW5lIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFib3J0IHRoZSBlYWNoXG4gIH0pO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCBvcHRpb25zKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IGRpc3BsYXk7XG4gIGxldCBzaG9ydCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zaG9ydDtcbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgZGlzcGxheSA9IGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0JyB8fCBjaGVja2VyLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lO1xuICB9XG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyVHlwZSh7dHlwZX0sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IF9fYXBpQ2hlY2tEYXRhID0gdHlwZS5fX2FwaUNoZWNrRGF0YTtcbiAgICBsZXQgdHlwZVR5cGVzID0gdHlwZShvcHRpb25zKTtcbiAgICB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGEsXG4gICAgICBbX19hcGlDaGVja0RhdGEudHlwZV06IHR5cGVUeXBlc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogSlNPTi5zdHJpbmdpZnkoY2hlY2tlclR5cGUpO1xuICByZXR1cm4gbmV3IEVycm9yKGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBtdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbn1cblxuZnVuY3Rpb24gbkF0TChuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCB0TmFtZSA9IHQobmFtZSB8fCAndmFsdWUnKTtcbiAgbGV0IHRMb2NhdGlvbiA9ICFsb2NhdGlvbiA/ICcnIDogJyBhdCAnICsgdChsb2NhdGlvbik7XG4gIHJldHVybiBgJHt0TmFtZX0ke3RMb2NhdGlvbn1gO1xufVxuXG5mdW5jdGlvbiB0KHRoaW5nKSB7XG4gIHJldHVybiAnYCcgKyB0aGluZyArICdgJztcbn1cblxuZnVuY3Rpb24gdW5kZWYodGhpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuXG5cbmZ1bmN0aW9uIGFkZE9wdGlvbmFsKGNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gb3B0aW9uYWxDaGVjayh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAoIXVuZGVmKHZhbCkpIHtcbiAgICAgIHJldHVybiBjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9XG4gIC8vIGluaGVyaXQgYWxsIHByb3BlcnRpZXMgb24gdGhlIG9yaWdpbmFsIGNoZWNrZXJcbiAgY29weVByb3BzKGNoZWNrZXIsIG9wdGlvbmFsQ2hlY2spO1xuICBlYWNoKE9iamVjdC5rZXlzKGNoZWNrZXIpLCBrZXkgPT4gb3B0aW9uYWxDaGVja1trZXldID0gY2hlY2tlcltrZXldKTtcblxuXG4gIG9wdGlvbmFsQ2hlY2suaXNPcHRpb25hbCA9IHRydWU7XG4gIG9wdGlvbmFsQ2hlY2suZGlzcGxheU5hbWUgPSBjaGVja2VyLmRpc3BsYXlOYW1lICsgJyAob3B0aW9uYWwpJztcblxuXG4gIC8vIHRoZSBtYWdpYyBsaW5lIHRoYXQgYWxsb3dzIHlvdSB0byBhZGQgLm9wdGlvbmFsIHRvIHRoZSBlbmQgb2YgdGhlIGNoZWNrZXJzXG4gIGNoZWNrZXIub3B0aW9uYWwgPSBvcHRpb25hbENoZWNrO1xuXG4gIC8vIGZpeCB0eXBlLCBiZWNhdXNlIGl0J3Mgbm90IGEgc3RyYWlnaHQgY29weS4uLlxuICAvLyB0aGUgcmVhc29uIGlzIHdlIG5lZWQgdG8gc3BlY2lmeSB0eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsIGFzIHRydWUgZm9yIHRoZSB0ZXJzZS92ZXJib3NlIG9wdGlvbi5cbiAgLy8gd2UgYWxzbyB3YW50IHRvIGFkZCBcIihvcHRpb25hbClcIiB0byB0aGUgdHlwZXMgd2l0aCBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBjb3B5KGNoZWNrZXIub3B0aW9uYWwudHlwZSk7IC8vIG1ha2Ugb3VyIG93biBjb3B5IG9mIHRoaXNcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2hlY2tlci5vcHRpb25hbC50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2hlY2tlci50eXBlKC4uLmFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgKz0gJyAob3B0aW9uYWwpJztcbiAgICByZXR1cm47XG4gIH1cbiAgY2hlY2tlci5vcHRpb25hbC50eXBlLl9fYXBpQ2hlY2tEYXRhID0gY29weShjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpIHx8IHt9OyAvLyBhbmQgdGhpc1xuICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEub3B0aW9uYWwgPSB0cnVlO1xufVxuXG4vKipcbiAqIFRoaXMgd2lsbCBzZXQgdXAgdGhlIGNoZWNrZXIgd2l0aCBhbGwgb2YgdGhlIGRlZmF1bHRzIHRoYXQgbW9zdCBjaGVja2VycyB3YW50IGxpa2UgcmVxdWlyZWQgYnkgZGVmYXVsdCBhbmQgYW5cbiAqIG9wdGlvbmFsIHZlcnNpb25cbiAqIEBwYXJhbSBjaGVja2VyXG4gKiBAcGFyYW0gcHJvcGVydGllcyBwcm9wZXJ0aWVzIHRvIGFkZCB0byB0aGUgY2hlY2tlclxuICovXG5mdW5jdGlvbiBzZXR1cENoZWNrZXIoY2hlY2tlciwgcHJvcGVydGllcykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGNoZWNrZXIubm9vcCA9IG5vb3A7IC8vIGRvIHRoaXMgZmlyc3QsIHNvIGl0IGNhbiBiZSBvdmVyd3JpdHRlbi5cbiAgaWYgKHR5cGVvZiBjaGVja2VyLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgY2hlY2tlci5zaG9ydFR5cGUgPSBjaGVja2VyLnR5cGU7XG4gIH1cblxuICAvLyBhc3NpZ24gYWxsIHByb3BlcnRpZXMgZ2l2ZW5cbiAgZWFjaChwcm9wZXJ0aWVzLCAocHJvcCwgbmFtZSkgPT4gY2hlY2tlcltuYW1lXSA9IHByb3ApO1xuXG4gIGlmICghY2hlY2tlci5kaXNwbGF5TmFtZSkge1xuICAgIGNoZWNrZXIuZGlzcGxheU5hbWUgPSBgYXBpQ2hlY2sgJHt0KGNoZWNrZXIuc2hvcnRUeXBlIHx8IGNoZWNrZXIudHlwZSB8fCBjaGVja2VyLm5hbWUpfSB0eXBlIGNoZWNrZXJgO1xuICB9XG5cbiAgaWYgKCFjaGVja2VyLm5vdFJlcXVpcmVkKSB7XG4gICAgY2hlY2tlciA9IGdldFJlcXVpcmVkVmVyc2lvbihjaGVja2VyKTtcbiAgfVxuXG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIGFkZE9wdGlvbmFsKGNoZWNrZXIpO1xuICB9XG4gIHJldHVybiBjaGVja2VyO1xufVxuXG5mdW5jdGlvbiBnZXRSZXF1aXJlZFZlcnNpb24oY2hlY2tlcikge1xuICBmdW5jdGlvbiByZXF1aXJlZENoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKHVuZGVmKHZhbCkgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgbGV0IHRMb2NhdGlvbiA9IGxvY2F0aW9uID8gYCBpbiAke3QobG9jYXRpb24pfWAgOiAnJztcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgICAgIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcgPyB0eXBlIDogSlNPTi5zdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICBjb3B5UHJvcHMoY2hlY2tlciwgcmVxdWlyZWRDaGVja2VyKTtcbiAgcmV0dXJuIHJlcXVpcmVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gY29weVByb3BzKHNyYywgZGVzdCkge1xuICBlYWNoKE9iamVjdC5rZXlzKHNyYyksIGtleSA9PiBkZXN0W2tleV0gPSBzcmNba2V5XSk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnMsXG4gIHVuZGVmXG4gIH0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge3NldHVwQ2hlY2tlcn0gPSBjaGVja2VySGVscGVycztcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5OiB0eXBlT2ZDaGVja0dldHRlcignQXJyYXknKSxcbiAgYm9vbDogdHlwZU9mQ2hlY2tHZXR0ZXIoJ0Jvb2xlYW4nKSxcbiAgbnVtYmVyOiB0eXBlT2ZDaGVja0dldHRlcignTnVtYmVyJyksXG4gIHN0cmluZzogdHlwZU9mQ2hlY2tHZXR0ZXIoJ1N0cmluZycpLFxuICBmdW5jOiBmdW5jQ2hlY2tHZXR0ZXIoKSxcbiAgb2JqZWN0OiBvYmplY3RDaGVja0dldHRlcigpLFxuXG4gIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gIG9uZU9mOiBvbmVPZkNoZWNrR2V0dGVyLFxuICBvbmVPZlR5cGU6IG9uZU9mVHlwZUNoZWNrR2V0dGVyLFxuXG4gIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgb2JqZWN0T2Y6IG9iamVjdE9mQ2hlY2tHZXR0ZXIsXG4gIHR5cGVPckFycmF5T2Y6IHR5cGVPckFycmF5T2ZDaGVja0dldHRlcixcblxuICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuICBhcmdzOiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5mdW5jdGlvbiB0eXBlT2ZDaGVja0dldHRlcih0eXBlKSB7XG4gIGNvbnN0IGxUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09IGxUeXBlKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGV9KTtcbn1cblxuZnVuY3Rpb24gZnVuY0NoZWNrR2V0dGVyKCkge1xuICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IHNldHVwQ2hlY2tlcihmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZX0pO1xuXG4gIGZ1bmN0aW9uQ2hlY2tlci53aXRoUHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFdpdGhQcm9wZXJ0aWVzQ2hlY2tlcihwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXBpRXJyb3IgPSBjaGVja2Vycy5vYmplY3RPZihjaGVja2Vycy5mdW5jKShwcm9wZXJ0aWVzLCAncHJvcGVydGllcycsICdhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzJyk7XG4gICAgaWYgKGlzRXJyb3IoYXBpRXJyb3IpKSB7XG4gICAgICB0aHJvdyBhcGlFcnJvcjtcbiAgICB9XG4gICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHByb3BlcnRpZXMsIHRydWUpO1xuICAgIHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUgPSAnZnVuYy53aXRoUHJvcGVydGllcyc7XG5cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uV2l0aFByb3BlcnRpZXNDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdEZ1bmN0aW9uID0gY2hlY2tlcnMuZnVuYyh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKG5vdEZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gbm90RnVuY3Rpb247XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIH0sIHt0eXBlOiBzaGFwZUNoZWNrZXIudHlwZSwgc2hvcnRUeXBlOiAnZnVuYy53aXRoUHJvcGVydGllcyd9KTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gb2JqZWN0Q2hlY2tHZXR0ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnT2JqZWN0JztcbiAgY29uc3QgbnVsbFR5cGUgPSAnT2JqZWN0IChudWxsIG9rKSc7XG4gIGxldCBvYmplY3ROdWxsT2tDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIG51bGxUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlOiBudWxsVHlwZX0pO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlfSk7XG5cbiAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuXG4gIHJldHVybiBvYmplY3RDaGVja2VyO1xufVxuXG5cbmZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCEodmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgfVxuICB9LCB7dHlwZTogY2xhc3NUb0NoZWNrLm5hbWV9KTtcbn1cblxuZnVuY3Rpb24gb25lT2ZDaGVja0dldHRlcihlbnVtcykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnZW51bSd9LFxuICAgIGVudW06IGVudW1zXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlske2VudW1zLm1hcChlbm0gPT4gSlNPTi5zdHJpbmdpZnkoZW5tKSkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWVudW1zLnNvbWUoZW5tID0+IGVubSA9PT0gdmFsKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGUsIHNob3J0VHlwZX0pO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb25lT2ZUeXBlJ30sXG4gICAgb25lT2ZUeXBlOiBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpKVxuICB9O1xuICBjb25zdCBjaGVja2Vyc0Rpc3BsYXkgPSBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pKTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9uZU9mVHlwZVske2NoZWNrZXJzRGlzcGxheS5qb2luKCcsICcpfV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWNoZWNrZXJzLnNvbWUoY2hlY2tlciA9PiAhaXNFcnJvcihjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICBhcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgYXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFycmF5T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZSwgc2hvcnRUeXBlfSk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICBvYmplY3RPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgbm90T2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIGlmIChpc0Vycm9yKG5vdE9iamVjdCkpIHtcbiAgICAgIHJldHVybiBub3RPYmplY3Q7XG4gICAgfVxuICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICBpZiAoaXNFcnJvcihjaGVja2VyKGl0ZW0sIGtleSwgbmFtZSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGUsIHNob3J0VHlwZX0pO1xufVxuXG5mdW5jdGlvbiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAndHlwZU9yQXJyYXlPZid9LFxuICAgIHR5cGVPckFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGB0eXBlT3JBcnJheU9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2VyLCBjaGVja2Vycy5hcnJheU9mKGNoZWNrZXIpXSkodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSwgbm9uT2JqZWN0KSB7XG4gICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgc2hhcGVUeXBlc1twcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICBsZXQgcmV0ID0ge307XG4gICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGFyZW50UmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBjb25zdCBzcGVjaWZpZWQgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApO1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IHVuZGVmKHBhcmVudFJlcXVpcmVkKSA/ICFjaGVja2VyLmlzT3B0aW9uYWwgOiBwYXJlbnRSZXF1aXJlZDtcbiAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgcmV0W3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3RlcnNlLCBvYmo6IG9iaiAmJiBvYmpbcHJvcF0sIHJlcXVpcmVkLCBhZGRIZWxwZXJzfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgIGZ1bmN0aW9uIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSAnSVRFTSc7XG4gICAgICAgICAgaWYgKGNoZWNrZXIudHlwZSAmJiBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRIZWxwZXIoXG4gICAgICAgICAgICAnbWlzc2luZycsICdNSVNTSU5HIFRISVMgJyArIGl0ZW0sICcgPC0tIFlPVSBBUkUgTUlTU0lORyBUSElTJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3BlY2lmaWVkKSB7XG4gICAgICAgICAgbGV0IGVycm9yID0gY2hlY2tlcihvYmpbcHJvcF0sIHByb3AsIG51bGwsIG9iaik7XG4gICAgICAgICAgaWYgKGlzRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICBhZGRIZWxwZXIoJ2Vycm9yJywgJ1RISVMgSVMgVEhFIFBST0JMRU06ICcgKyBlcnJvci5tZXNzYWdlLCAnIDwtLSBUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkSGVscGVyKHByb3BlcnR5LCBvYmplY3RNZXNzYWdlLCBzdHJpbmdNZXNzYWdlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXRbcHJvcF0gKz0gc3RyaW5nTWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W3Byb3BdLl9fYXBpQ2hlY2tEYXRhW3Byb3BlcnR5XSA9IG9iamVjdE1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHlwZS5fX2FwaUNoZWNrRGF0YSA9IHtzdHJpY3Q6IGZhbHNlLCBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzaGFwZSd9O1xuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICBsZXQgaXNPYmplY3QgPSAhbm9uT2JqZWN0ICYmIGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgICB9XG4gICAgICBsZXQgc2hhcGVQcm9wRXJyb3I7XG4gICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uID8gbG9jYXRpb24gKyAobmFtZSA/ICcvJyA6ICcnKSA6ICcnO1xuICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG4gICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICBpZiAodmFsLmhhc093blByb3BlcnR5KHByb3ApIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgICAgICBzaGFwZVByb3BFcnJvciA9IGNoZWNrZXIodmFsW3Byb3BdLCBwcm9wLCBgJHtsb2NhdGlvbn0ke25hbWV9YCwgdmFsKTtcbiAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVQcm9wRXJyb3I7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZTogJ3NoYXBlJ30pO1xuXG4gICAgZnVuY3Rpb24gc3RyaWN0VHlwZSgpIHtcbiAgICAgIHJldHVybiB0eXBlKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpO1xuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEuc3RyaWN0ID0gdHJ1ZTtcbiAgICBzaGFwZUNoZWNrZXIuc3RyaWN0ID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHN0cmljdFNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgY29uc3Qgc2hhcGVFcnJvciA9IHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlRXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBzaGFwZUVycm9yO1xuICAgICAgfVxuICAgICAgY29uc3QgYWxsb3dlZFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzaGFwZSk7XG4gICAgICBjb25zdCBleHRyYVByb3BzID0gT2JqZWN0LmtleXModmFsKS5maWx0ZXIocHJvcCA9PiBhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKHByb3ApID09PSAtMSk7XG4gICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgICAgICBgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gY2Fubm90IGhhdmUgZXh0cmEgcHJvcGVydGllczogJHt0KGV4dHJhUHJvcHMuam9pbignYCwgYCcpKX0uYCArXG4gICAgICAgICAgYEl0IGlzIGxpbWl0ZWQgdG8gJHt0KGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJ2AsIGAnKSl9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIHt0eXBlOiBzdHJpY3RUeXBlLCBzaG9ydFR5cGU6ICdzdHJpY3Qgc2hhcGUnfSk7XG5cbiAgICByZXR1cm4gc2hhcGVDaGVja2VyO1xuICB9XG5cbiAgc2hhcGVDaGVja0dldHRlci5pZk5vdCA9IGZ1bmN0aW9uIGlmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuICAgIH1cbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBub3Qgc3BlY2lmaWVkYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBub25lIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGlmTm90Q2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgbGV0IHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIGxldCBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUob3RoZXJQcm9wID0+IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkob3RoZXJQcm9wKSk7XG4gICAgICBpZiAocHJvcEV4aXN0cyA9PT0gb3RoZXJQcm9wc0V4aXN0KSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfSwge25vdFJlcXVpcmVkOiB0cnVlLCB0eXBlLCBzaG9ydFR5cGU6IGBpZk5vdFske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0pO1xuICB9O1xuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIub25seUlmID0gZnVuY3Rpb24gb25seUlmKG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgb3RoZXJQcm9wcyA9IGFycmF5aWZ5KG90aGVyUHJvcHMpO1xuICAgIGxldCB0eXBlO1xuICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIGFsc28gc3BlY2lmaWVkYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgfVxuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25seUlmQ2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGNvbnN0IG90aGVyc1ByZXNlbnQgPSBvdGhlclByb3BzLmV2ZXJ5KHByb3AgPT4gb2JqLmhhc093blByb3BlcnR5KHByb3ApKTtcbiAgICAgIGlmICghb3RoZXJzUHJlc2VudCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZTogYG9ubHlJZlske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0pO1xuICB9O1xuXG4gIHJldHVybiBzaGFwZUNoZWNrR2V0dGVyO1xufVxuXG5mdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICBjb25zdCB0eXBlID0gJ2Z1bmN0aW9uIGFyZ3VtZW50cyc7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gYXJnc0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlfSk7XG59XG5cbmZ1bmN0aW9uIGFueUNoZWNrR2V0dGVyKCkge1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFueUNoZWNrZXJEZWZpbml0aW9uKCkge1xuICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gIH0sIHt0eXBlOiAnYW55J30pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9jaGVja2Vycy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFwaS1jaGVjay5qcyJ9