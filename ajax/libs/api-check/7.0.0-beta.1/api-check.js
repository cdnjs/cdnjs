// apiCheck.js v7.0.0-beta.1 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	  var hasKeys = arg && Object.keys(arg).length;
	
	  if (type === "function") {
	    if (hasKeys) {
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
	
	  if (hasKeys) {
	    return getDisplay(arg, gottenArgs);
	  }
	
	  return cName;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZDkzMDkyZDU5ZmJkOTkxNWQzOSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFNBQVMsR0FBRyxtQkFBTyxDQUFDLDRCQUFxQixDQUFDLENBQUM7QUFDakQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyx1QkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksR0FBK0QsWUFBWSxDQUEvRSxJQUFJO0tBQUUsT0FBTyxHQUFzRCxZQUFZLENBQXpFLE9BQU87S0FBRSxDQUFDLEdBQW1ELFlBQVksQ0FBaEUsQ0FBQztLQUFFLFFBQVEsR0FBeUMsWUFBWSxDQUE3RCxRQUFRO0tBQUUsaUJBQWlCLEdBQXNCLFlBQVksQ0FBbkQsaUJBQWlCO0tBQUUsTUFBTSxHQUFjLFlBQVksQ0FBaEMsTUFBTTtLQUFF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LENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3ZDO0lBQ0YsRUFBRSxFQUFDLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUFDO0VBQ1o7O0FBRUQsVUFBUyxjQUFjLEdBQUc7QUFDeEIsVUFBTyxZQUFZLENBQUMsU0FBUyxvQkFBb0IsR0FBRyxFQUVuRCxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7RUFDbkI7Ozs7Ozs7Ozs7O0FDbFVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhkOTMwOTJkNTlmYmQ5OTE1ZDM5XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FwaUNoZWNrJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcbmNvbnN0IGFwaUNoZWNrVXRpbCA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7ZWFjaCwgaXNFcnJvciwgdCwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCB0eXBlT2YsIGdldEVycm9yfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xuY29uc3QgYXBpQ2hlY2tBcGlzID0gZ2V0QXBpQ2hlY2tBcGlzKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZTtcbm1vZHVsZS5leHBvcnRzLnV0aWxzID0gYXBpQ2hlY2tVdGlsO1xubW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnID0ge1xuICB2ZXJib3NlOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlXG59O1xuXG5jb25zdCBhcGlDaGVja0FwaUNoZWNrID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZSh7XG4gIG91dHB1dDoge3ByZWZpeDogJ2FwaUNoZWNrJ31cbn0pO1xubW9kdWxlLmV4cG9ydHMuaW50ZXJuYWxDaGVja2VyID0gYXBpQ2hlY2tBcGlDaGVjaztcblxuXG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tJbnN0YW5jZShjb25maWcgPSB7fSwgZXh0cmFDaGVja2VycyA9IHt9KSB7XG4gIGlmIChhcGlDaGVja0FwaUNoZWNrICYmIGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBhcGlDaGVja0FwaUNoZWNrLnRocm93KGFwaUNoZWNrQXBpcy5nZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsIGFyZ3VtZW50cywge1xuICAgICAgcHJlZml4OiAnY3JlYXRpbmcgYW4gYXBpQ2hlY2sgaW5zdGFuY2UnXG4gICAgfSk7XG4gIH1cblxuICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7XG4gICAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICAgIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcbiAgICBnZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFuZGxlRXJyb3JNZXNzYWdlLFxuICAgIGNvbmZpZzoge1xuICAgICAgb3V0cHV0OiBjb25maWcub3V0cHV0IHx8IHtcbiAgICAgICAgcHJlZml4OiAnJyxcbiAgICAgICAgc3VmZml4OiAnJyxcbiAgICAgICAgZG9jc0Jhc2VVcmw6ICcnXG4gICAgICB9LFxuICAgICAgdmVyYm9zZTogY29uZmlnLnZlcmJvc2UgfHwgZmFsc2UsXG4gICAgICBkaXNhYmxlZDogY29uZmlnLmRpc2FibGVkIHx8IGZhbHNlXG4gICAgfSxcbiAgICB1dGlsczogYXBpQ2hlY2tVdGlsXG4gIH07XG5cbiAgZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gd3JhcHBlcik7XG4gIGVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiB7XG4gICAgaWYgKCghYWRkaXRpb25hbFByb3BlcnRpZXMuZGlzYWJsZWQgJiYgIW1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy5kaXNhYmxlZCkgfHwgIWNoZWNrZXIubm9vcCkge1xuICAgICAgYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIubm9vcDtcbiAgICB9XG4gIH0pO1xuICBlYWNoKGV4dHJhQ2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuXG4gIHJldHVybiBhcGlDaGVjaztcblxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBpbnN0YW5jZSBmdW5jdGlvbi4gT3RoZXIgdGhpbmdzIGFyZSBhdHRhY2hlZCB0byB0aGlzIHNlZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYWJvdmUuXG4gICAqIEBwYXJhbSBhcGkge0FycmF5fVxuICAgKiBAcGFyYW0gYXJncyB7YXJndW1lbnRzfVxuICAgKiBAcGFyYW0gb3V0cHV0IHtPYmplY3R9XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gaWYgdGhpcyBoYXMgYSBmYWlsZWQgPSB0cnVlIHByb3BlcnR5LCB0aGVuIGl0IGZhaWxlZFxuICAgKi9cbiAgZnVuY3Rpb24gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo4ICovXG4gICAgaWYgKGFwaUNoZWNrLmNvbmZpZy5kaXNhYmxlZCB8fCBtb2R1bGUuZXhwb3J0cy5nbG9iYWxDb25maWcuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwaVR5cGVzOiB7fSwgYXJnVHlwZXM6IHt9LFxuICAgICAgICBwYXNzZWQ6IHRydWUsIG1lc3NhZ2U6ICcnLFxuICAgICAgICBmYWlsZWQ6IGZhbHNlXG4gICAgICB9OyAvLyBlbXB0eSB2ZXJzaW9uIG9mIHdoYXQgaXMgbm9ybWFsbHkgcmV0dXJuZWRcbiAgICB9XG4gICAgY2hlY2tBcGlDaGVja0FwaShhcmd1bWVudHMpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcGkpKSB7XG4gICAgICBhcGkgPSBbYXBpXTtcbiAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHR1cm4gYXJndW1lbnRzIGludG8gYW4gYXJyYXlcbiAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2VzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHRoaXMgaXMgd2hlcmUgd2UgYWN0dWFsbHkgZ28gcGVyZm9ybSB0aGUgY2hlY2tzLlxuICAgICAgbWVzc2FnZXMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncyk7XG4gICAgfVxuXG4gICAgbGV0IHJldHVybk9iamVjdCA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcywgb3V0cHV0KTtcbiAgICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9ICcnO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tBcGlDaGVja0FwaSwgc2hvdWxkIGJlIHJlYWQgbGlrZTogY2hlY2sgYXBpQ2hlY2sgYXBpLiBBcyBpbiwgY2hlY2sgdGhlIGFwaSBmb3IgYXBpQ2hlY2sgOi0pXG4gICAqIEBwYXJhbSBjaGVja0FwaUFyZ3NcbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrQXBpQ2hlY2tBcGkoY2hlY2tBcGlBcmdzKSB7XG4gICAgY29uc3QgYXBpID0gY2hlY2tBcGlBcmdzWzBdO1xuICAgIGNvbnN0IGFyZ3MgPSBjaGVja0FwaUFyZ3NbMV07XG4gICAgdmFyIGlzQXJyYXlPckFyZ3MgPSBBcnJheS5pc0FycmF5KGFyZ3MpIHx8IChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYXJncy5sZW5ndGggPT09ICdudW1iZXInKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGFwaSkgJiYgIWlzQXJyYXlPckFyZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoYXBpLCBbYXJnc10sXG4gICAgICAgIFsnSWYgYW4gYXJyYXkgaXMgcHJvdmlkZWQgZm9yIHRoZSBhcGksIGFuIGFycmF5IG11c3QgYmUgcHJvdmlkZWQgZm9yIHRoZSBhcmdzIGFzIHdlbGwuJ10sXG4gICAgICAgIHtwcmVmaXg6ICdhcGlDaGVjayd9XG4gICAgICApKTtcbiAgICB9XG4gICAgLy8gZG9nIGZvb2RpbmcgaGVyZVxuICAgIGNvbnN0IGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncyk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpQ2hlY2tBcGlzLmNoZWNrQXBpQ2hlY2tBcGksIGNoZWNrQXBpQXJncywgZXJyb3JzLCB7XG4gICAgICAgIHByZWZpeDogJ2FwaUNoZWNrJ1xuICAgICAgfSk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBnZXRBcGlDaGVjayhzaG91bGRUaHJvdykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAgIGxldCByZXN1bHQgPSBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCk7XG4gICAgICBhcGlDaGVjay5oYW5kbGVFcnJvck1lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UsIHNob3VsZFRocm93KTtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIHdvbnQgZ2V0IGhlcmUgaWYgYW4gZXJyb3IgaXMgdGhyb3duXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCBzaG91bGRUaHJvdykge1xuICAgIGlmIChzaG91bGRUaHJvdyAmJiBtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMgPSBbXSwgb3V0cHV0ID0ge30pIHtcbiAgICBsZXQgZ091dCA9IGFwaUNoZWNrLmNvbmZpZy5vdXRwdXQgfHwge307XG4gICAgbGV0IHByZWZpeCA9IGdldFByZWZpeCgpO1xuICAgIGxldCBzdWZmaXggPSBnZXRTdWZmaXgoKTtcbiAgICBsZXQgdXJsID0gZ2V0VXJsKCk7XG4gICAgbGV0IG1lc3NhZ2UgPSBgYXBpQ2hlY2sgZmFpbGVkISAke21lc3NhZ2VzLmpvaW4oJywgJyl9YDtcbiAgICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fSAke21lc3NhZ2V9ICR7c3VmZml4fSAke3VybCB8fCAnJ30ke3Bhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWR9YC50cmltKCk7XG5cbiAgICBmdW5jdGlvbiBnZXRQcmVmaXgoKSB7XG4gICAgICBsZXQgcHJlZml4ID0gb3V0cHV0Lm9ubHlQcmVmaXg7XG4gICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICBwcmVmaXggPSBgJHtnT3V0LnByZWZpeCB8fCAnJ30gJHtvdXRwdXQucHJlZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdWZmaXgoKSB7XG4gICAgICBsZXQgc3VmZml4ID0gb3V0cHV0Lm9ubHlTdWZmaXg7XG4gICAgICBpZiAoIXN1ZmZpeCkge1xuICAgICAgICBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1ZmZpeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRVcmwoKSB7XG4gICAgICBsZXQgdXJsID0gb3V0cHV0LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IGdPdXQuZG9jc0Jhc2VVcmwgJiYgb3V0cHV0LnVybFN1ZmZpeCAmJiBgJHtnT3V0LmRvY3NCYXNlVXJsfSR7b3V0cHV0LnVybFN1ZmZpeH1gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKSB7XG4gICAgbGV0IHthcGlUeXBlcywgYXJnVHlwZXN9ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgICBsZXQgY29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MgfHwgW10pO1xuICAgIGxldCByZXBsYWNlZEl0ZW1zID0gW107XG4gICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUoY29weSk7XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGdldE9iamVjdFN0cmluZyhjb3B5KTtcbiAgICBhcmdUeXBlcyA9IGdldE9iamVjdFN0cmluZyhhcmdUeXBlcyk7XG4gICAgYXBpVHlwZXMgPSBnZXRPYmplY3RTdHJpbmcoYXBpVHlwZXMpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRlTWVzc2FnZSgpO1xuXG5cbiAgICAvLyBmdW5jdGlvbnNcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VGdW5jdGlvbldpdGhOYW1lKG9iaikge1xuICAgICAgZWFjaChvYmosICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBpZiAocmVwbGFjZWRJdGVtcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7IC8vIGF2b2lkIHJlY3Vyc2l2ZSBwcm9ibGVtc1xuICAgICAgICAgIHJlcGxhY2VkSXRlbXMucHVzaCh2YWwpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbC5kaXNwbGF5TmFtZSB8fCB2YWwubmFtZSB8fCAnYW5vbnltb3VzIGZ1bmN0aW9uJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9iamVjdFN0cmluZyh0eXBlcykge1xuICAgICAgaWYgKCF0eXBlcyB8fCAhdHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnbm90aGluZyc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVzICYmIHR5cGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0eXBlcyA9IHR5cGVzWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmluZ2lmeSh0eXBlcywgbnVsbCwgMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVNZXNzYWdlKCkge1xuICAgICAgY29uc3QgbiA9ICdcXG4nO1xuICAgICAgbGV0IHVzZVMgPSB0cnVlO1xuICAgICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHVzZVMgPSAhIU9iamVjdC5rZXlzKGFyZ3NbMF0pLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1c2VTID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGVzID0gYHR5cGUke3VzZVMgPyAncycgOiAnJ31gO1xuICAgICAgY29uc3QgbmV3TGluZSA9IG4gKyBuO1xuICAgICAgcmV0dXJuIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9JHtuZXdMaW5lfWAgK1xuICAgICAgICBgV2l0aCB0aGUgJHt0eXBlc306JHtufSR7YXJnVHlwZXN9JHtuZXdMaW5lfWAgK1xuICAgICAgICBgVGhlIEFQSSBjYWxscyBmb3I6JHtufSR7YXBpVHlwZXN9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlcyhhcGksIGFyZ3MpIHtcbiAgICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICAgIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgICBsZXQgYXBpVHlwZXMgPSBhcGkubWFwKChjaGVja2VyLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3BlY2lmaWVkID0gbW9kdWxlLmV4cG9ydHMuZ2xvYmFsQ29uZmlnLmhhc093blByb3BlcnR5KCd2ZXJib3NlJyk7XG4gICAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge1xuICAgICAgICB0ZXJzZTogc3BlY2lmaWVkID8gIW1vZHVsZS5leHBvcnRzLmdsb2JhbENvbmZpZy52ZXJib3NlIDogIWFwaUNoZWNrLmNvbmZpZy52ZXJib3NlLFxuICAgICAgICBvYmo6IGFyZ3NbaW5kZXhdLFxuICAgICAgICBhZGRIZWxwZXJzOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBsZXQgYXJnVHlwZXMgPSBhcmdzLm1hcCgoYXJnKSA9PiBnZXRBcmdEaXNwbGF5KGFyZywgW10pKTtcbiAgICByZXR1cm4ge2FyZ1R5cGVzOiBhcmdUeXBlcywgYXBpVHlwZXN9O1xuICB9XG5cbn1cblxuXG4vLyBTVEFURUxFU1MgRlVOQ1RJT05TXG5cbi8qKlxuICogVGhpcyBpcyB3aGVyZSB0aGUgbWFnaWMgaGFwcGVucyBmb3IgYWN0dWFsbHkgY2hlY2tpbmcgdGhlIGFyZ3VtZW50cyB3aXRoIHRoZSBhcGkuXG4gKiBAcGFyYW0gYXBpIHtBcnJheX0gLSBjaGVja2Vyc1xuICogQHBhcmFtIGFyZ3Mge0FycmF5fSAtIGFuZCBhcmd1bWVudHMgb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IG1lc3NhZ2VzID0gW107XG4gIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgbGV0IGNoZWNrZXJJbmRleCA9IDA7XG4gIGxldCBhcmdJbmRleCA9IDA7XG4gIGxldCBhcmcsIGNoZWNrZXIsIHJlcywgbGFzdENoZWNrZXIsIGFyZ05hbWUsIGFyZ0ZhaWxlZCwgc2tpcFByZXZpb3VzQ2hlY2tlcjtcbiAgLyoganNoaW50IC1XMDg0ICovXG4gIHdoaWxlICgoY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK10pICYmIChhcmdJbmRleCA8IGFyZ3MubGVuZ3RoKSkge1xuICAgIGFyZyA9IGFyZ3NbYXJnSW5kZXgrK107XG4gICAgYXJnTmFtZSA9ICdBcmd1bWVudCAnICsgYXJnSW5kZXggKyAoY2hlY2tlci5pc09wdGlvbmFsID8gJyAob3B0aW9uYWwpJyA6ICcnKTtcbiAgICByZXMgPSBjaGVja2VyKGFyZywgJ3ZhbHVlJywgYXJnTmFtZSk7XG4gICAgYXJnRmFpbGVkID0gaXNFcnJvcihyZXMpO1xuICAgIGxhc3RDaGVja2VyID0gY2hlY2tlckluZGV4ID49IGFwaS5sZW5ndGg7XG4gICAgc2tpcFByZXZpb3VzQ2hlY2tlciA9IGNoZWNrZXJJbmRleCA+IDEgJiYgYXBpW2NoZWNrZXJJbmRleCAtIDFdLmlzT3B0aW9uYWw7XG4gICAgaWYgKChhcmdGYWlsZWQgJiYgbGFzdENoZWNrZXIpIHx8IChhcmdGYWlsZWQgJiYgIWxhc3RDaGVja2VyICYmICFjaGVja2VyLmlzT3B0aW9uYWwgJiYgIXNraXBQcmV2aW91c0NoZWNrZXIpKSB7XG4gICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgbWVzc2FnZXMucHVzaChnZXRDaGVja2VyRXJyb3JNZXNzYWdlKHJlcywgY2hlY2tlciwgYXJnKSk7XG4gICAgfSBlbHNlIGlmIChhcmdGYWlsZWQgJiYgY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBhcmdJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKGAke3QoYXJnTmFtZSl9IHBhc3NlZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFpbGVkID8gbWVzc2FnZXMgOiBbXTtcbn1cblxuXG5jaGVja2VyVHlwZVR5cGUudHlwZSA9ICdmdW5jdGlvbiB3aXRoIF9fYXBpQ2hlY2tEYXRhIHByb3BlcnR5IGFuZCBgJHtmdW5jdGlvbi50eXBlfWAgcHJvcGVydHknO1xuZnVuY3Rpb24gY2hlY2tlclR5cGVUeXBlKGNoZWNrZXJUeXBlLCBuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCBhcGlDaGVja0RhdGFDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUoe1xuICAgIHR5cGU6IGNoZWNrZXJzLnN0cmluZyxcbiAgICBvcHRpb25hbDogY2hlY2tlcnMuYm9vbFxuICB9KTtcbiAgY29uc3QgYXNGdW5jID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7X19hcGlDaGVja0RhdGE6IGFwaUNoZWNrRGF0YUNoZWNrZXJ9KTtcbiAgY29uc3QgYXNTaGFwZSA9IGNoZWNrZXJzLnNoYXBlKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCB3cm9uZ1NoYXBlID0gY2hlY2tlcnMub25lT2ZUeXBlKFtcbiAgICBhc0Z1bmMsIGFzU2hhcGVcbiAgXSkoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKTtcbiAgaWYgKGlzRXJyb3Iod3JvbmdTaGFwZSkpIHtcbiAgICByZXR1cm4gd3JvbmdTaGFwZTtcbiAgfVxuICBpZiAodHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnZnVuY3Rpb24nICYmICFjaGVja2VyVHlwZS5oYXNPd25Qcm9wZXJ0eShjaGVja2VyVHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlKSkge1xuICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGVUeXBlLnR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCB2YWwpIHtcbiAgbGV0IGNoZWNrZXJIZWxwID0gZ2V0Q2hlY2tlckhlbHAoY2hlY2tlciwgdmFsKTtcbiAgY2hlY2tlckhlbHAgPSBjaGVja2VySGVscCA/ICcgLSAnICsgY2hlY2tlckhlbHAgOiAnJztcbiAgcmV0dXJuIHJlcy5tZXNzYWdlICsgY2hlY2tlckhlbHA7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJIZWxwKHtoZWxwfSwgdmFsKSB7XG4gIGlmICghaGVscCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodHlwZW9mIGhlbHAgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoZWxwID0gaGVscCh2YWwpO1xuICB9XG4gIHJldHVybiBoZWxwO1xufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IHJlcXVpcmVkQXJncyA9IGFwaS5maWx0ZXIoYSA9PiAhYS5pc09wdGlvbmFsKTtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWRBcmdzLmxlbmd0aCkge1xuICAgIHJldHVybiBbXG4gICAgICAnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QXJnRGlzcGxheShhcmcsIGdvdHRlbkFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBpZiAoZ290dGVuQXJncy5pbmRleE9mKGFyZykgIT09IC0xKSB7XG4gICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgfVxuICBnb3R0ZW5BcmdzLnB1c2goYXJnKTtcbiAgY29uc3QgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICBjb25zdCB0eXBlID0gdHlwZU9mKGFyZyk7XG4gIGNvbnN0IGhhc0tleXMgPSBhcmcgJiYgT2JqZWN0LmtleXMoYXJnKS5sZW5ndGg7XG5cbiAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaGFzS2V5cykge1xuICAgICAgbGV0IHByb3BlcnRpZXMgPSBzdHJpbmdpZnkoZ2V0RGlzcGxheShhcmcsIGdvdHRlbkFyZ3MpKTtcbiAgICAgIHJldHVybiBjTmFtZSArICcgKHdpdGggcHJvcGVydGllczogJyArIHByb3BlcnRpZXMgKyAnKSc7XG4gICAgfVxuICAgIHJldHVybiBjTmFtZTtcbiAgfVxuXG4gIGlmIChhcmcgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9XG5cbiAgaWYgKHR5cGUgIT09ICdhcnJheScgJiYgdHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIGlmIChoYXNLZXlzKSB7XG4gICAgcmV0dXJuIGdldERpc3BsYXkoYXJnLCBnb3R0ZW5BcmdzKTtcbiAgfVxuXG4gIHJldHVybiBjTmFtZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheShvYmosIGdvdHRlbkFyZ3MpIHtcbiAgdmFyIGFyZ0Rpc3BsYXkgPSB7fTtcbiAgZWFjaChvYmosICh2LCBrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2LCBnb3R0ZW5BcmdzKSk7XG4gIHJldHVybiBhcmdEaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0FwaXMoKSB7XG4gIGNvbnN0IG9zID0gY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsO1xuXG4gIGNvbnN0IGNoZWNrZXJGbkNoZWNrZXIgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgICB0eXBlOiBjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXJzLnN0cmluZywgY2hlY2tlclR5cGVUeXBlXSkub3B0aW9uYWwsXG4gICAgZGlzcGxheU5hbWU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBzaG9ydFR5cGU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICBub3RPcHRpb25hbDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICBub3RSZXF1aXJlZDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbFxuICB9KTtcblxuICBjb25zdCBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMgPSBbXG4gICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgb3V0cHV0OiBjaGVja2Vycy5zaGFwZSh7XG4gICAgICAgIHByZWZpeDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICBzdWZmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgZG9jc0Jhc2VVcmw6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgICAgdmVyYm9zZTogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgICAgIGRpc2FibGVkOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsLFxuICAgIGNoZWNrZXJzLm9iamVjdE9mKGNoZWNrZXJGbkNoZWNrZXIpLm9wdGlvbmFsXG4gIF07XG5cbiAgY29uc3QgY2hlY2tBcGlDaGVja0FwaSA9IFtcbiAgICBjaGVja2Vycy50eXBlT3JBcnJheU9mKGNoZWNrZXJGbkNoZWNrZXIpLFxuICAgIGNoZWNrZXJzLmFueS5vcHRpb25hbCxcbiAgICBjaGVja2Vycy5zaGFwZSh7XG4gICAgICBwcmVmaXg6IG9zLCBzdWZmaXg6IG9zLCB1cmxTdWZmaXg6IG9zLCAvLyBhcHBlbmRlZCBjYXNlXG4gICAgICBvbmx5UHJlZml4OiBvcywgb25seVN1ZmZpeDogb3MsIHVybDogb3MgLy8gb3ZlcnJpZGUgY2FzZVxuICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuXG4gIHJldHVybiB7XG4gICAgY2hlY2tlckZuQ2hlY2tlcixcbiAgICBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsXG4gICAgY2hlY2tBcGlDaGVja0FwaVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XG5jb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgYWRkT3B0aW9uYWwsIGdldFJlcXVpcmVkVmVyc2lvbiwgc2V0dXBDaGVja2VyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksXG4gIGlzRXJyb3IsIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCB1bmRlZiwgY2hlY2tlckhlbHBlcnMsXG4gIG5vb3Bcbn07XG5cbmZ1bmN0aW9uIGNvcHkob2JqKSB7XG4gIGxldCB0eXBlID0gdHlwZU9mKG9iaik7XG4gIGxldCBkYUNvcHk7XG4gIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgZGFDb3B5ID0gW107XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBkYUNvcHkgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGVhY2gob2JqLCAodmFsLCBrZXkpID0+IHtcbiAgICBkYUNvcHlba2V5XSA9IHZhbDsgLy8gY2Fubm90IHNpbmdsZS1saW5lIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFib3J0IHRoZSBlYWNoXG4gIH0pO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCBvcHRpb25zKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IGRpc3BsYXk7XG4gIGxldCBzaG9ydCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zaG9ydDtcbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgZGlzcGxheSA9IGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0JyB8fCBjaGVja2VyLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lO1xuICB9XG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyVHlwZSh7dHlwZX0sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IF9fYXBpQ2hlY2tEYXRhID0gdHlwZS5fX2FwaUNoZWNrRGF0YTtcbiAgICBsZXQgdHlwZVR5cGVzID0gdHlwZShvcHRpb25zKTtcbiAgICB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGEsXG4gICAgICBbX19hcGlDaGVja0RhdGEudHlwZV06IHR5cGVUeXBlc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogc3RyaW5naWZ5KGNoZWNrZXJUeXBlKTtcbiAgcmV0dXJuIG5ldyBFcnJvcihgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gbXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG59XG5cbmZ1bmN0aW9uIG5BdEwobmFtZSwgbG9jYXRpb24pIHtcbiAgY29uc3QgdE5hbWUgPSB0KG5hbWUgfHwgJ3ZhbHVlJyk7XG4gIGxldCB0TG9jYXRpb24gPSAhbG9jYXRpb24gPyAnJyA6ICcgYXQgJyArIHQobG9jYXRpb24pO1xuICByZXR1cm4gYCR7dE5hbWV9JHt0TG9jYXRpb259YDtcbn1cblxuZnVuY3Rpb24gdCh0aGluZykge1xuICByZXR1cm4gJ2AnICsgdGhpbmcgKyAnYCc7XG59XG5cbmZ1bmN0aW9uIHVuZGVmKHRoaW5nKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cblxuXG5mdW5jdGlvbiBhZGRPcHRpb25hbChjaGVja2VyKSB7XG4gIGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKCF1bmRlZih2YWwpKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICAvLyBpbmhlcml0IGFsbCBwcm9wZXJ0aWVzIG9uIHRoZSBvcmlnaW5hbCBjaGVja2VyXG4gIGNvcHlQcm9wcyhjaGVja2VyLCBvcHRpb25hbENoZWNrKTtcbiAgZWFjaChPYmplY3Qua2V5cyhjaGVja2VyKSwga2V5ID0+IG9wdGlvbmFsQ2hlY2tba2V5XSA9IGNoZWNrZXJba2V5XSk7XG5cblxuICBvcHRpb25hbENoZWNrLmlzT3B0aW9uYWwgPSB0cnVlO1xuICBvcHRpb25hbENoZWNrLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZSArICcgKG9wdGlvbmFsKSc7XG5cblxuICAvLyB0aGUgbWFnaWMgbGluZSB0aGF0IGFsbG93cyB5b3UgdG8gYWRkIC5vcHRpb25hbCB0byB0aGUgZW5kIG9mIHRoZSBjaGVja2Vyc1xuICBjaGVja2VyLm9wdGlvbmFsID0gb3B0aW9uYWxDaGVjaztcblxuICAvLyBmaXggdHlwZSwgYmVjYXVzZSBpdCdzIG5vdCBhIHN0cmFpZ2h0IGNvcHkuLi5cbiAgLy8gdGhlIHJlYXNvbiBpcyB3ZSBuZWVkIHRvIHNwZWNpZnkgdHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCBhcyB0cnVlIGZvciB0aGUgdGVyc2UvdmVyYm9zZSBvcHRpb24uXG4gIC8vIHdlIGFsc28gd2FudCB0byBhZGQgXCIob3B0aW9uYWwpXCIgdG8gdGhlIHR5cGVzIHdpdGggYSBzdHJpbmdcbiAgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY29weShjaGVja2VyLm9wdGlvbmFsLnR5cGUpOyAvLyBtYWtlIG91ciBvd24gY29weSBvZiB0aGlzXG4gIH0gZWxzZSBpZiAodHlwZW9mIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIudHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlICs9ICcgKG9wdGlvbmFsKSc7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB8fCB7fTsgLy8gYW5kIHRoaXNcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGlzIHdpbGwgc2V0IHVwIHRoZSBjaGVja2VyIHdpdGggYWxsIG9mIHRoZSBkZWZhdWx0cyB0aGF0IG1vc3QgY2hlY2tlcnMgd2FudCBsaWtlIHJlcXVpcmVkIGJ5IGRlZmF1bHQgYW5kIGFuXG4gKiBvcHRpb25hbCB2ZXJzaW9uXG4gKiBAcGFyYW0gY2hlY2tlclxuICogQHBhcmFtIHByb3BlcnRpZXMgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIGNoZWNrZXJcbiAqL1xuZnVuY3Rpb24gc2V0dXBDaGVja2VyKGNoZWNrZXIsIHByb3BlcnRpZXMpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBjaGVja2VyLm5vb3AgPSBub29wOyAvLyBkbyB0aGlzIGZpcnN0LCBzbyBpdCBjYW4gYmUgb3ZlcndyaXR0ZW4uXG4gIGlmICh0eXBlb2YgY2hlY2tlci50eXBlID09PSAnc3RyaW5nJykge1xuICAgIGNoZWNrZXIuc2hvcnRUeXBlID0gY2hlY2tlci50eXBlO1xuICB9XG5cbiAgLy8gYXNzaWduIGFsbCBwcm9wZXJ0aWVzIGdpdmVuXG4gIGVhY2gocHJvcGVydGllcywgKHByb3AsIG5hbWUpID0+IGNoZWNrZXJbbmFtZV0gPSBwcm9wKTtcblxuICBpZiAoIWNoZWNrZXIuZGlzcGxheU5hbWUpIHtcbiAgICBjaGVja2VyLmRpc3BsYXlOYW1lID0gYGFwaUNoZWNrICR7dChjaGVja2VyLnNob3J0VHlwZSB8fCBjaGVja2VyLnR5cGUgfHwgY2hlY2tlci5uYW1lKX0gdHlwZSBjaGVja2VyYDtcbiAgfVxuXG4gIGlmICghY2hlY2tlci5ub3RSZXF1aXJlZCkge1xuICAgIGNoZWNrZXIgPSBnZXRSZXF1aXJlZFZlcnNpb24oY2hlY2tlcik7XG4gIH1cblxuICBpZiAoIWNoZWNrZXIubm90T3B0aW9uYWwpIHtcbiAgICBhZGRPcHRpb25hbChjaGVja2VyKTtcbiAgfVxuICByZXR1cm4gY2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRWZXJzaW9uKGNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gcmVxdWlyZWRDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICh1bmRlZih2YWwpICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGxldCB0TG9jYXRpb24gPSBsb2NhdGlvbiA/IGAgaW4gJHt0KGxvY2F0aW9uKX1gIDogJyc7XG4gICAgICBjb25zdCB0eXBlID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gICAgICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIHR5cGUgIT09ICdvYmplY3QnID8gdHlwZSA6IHN0cmluZ2lmeSh0eXBlKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoYFJlcXVpcmVkICR7dChuYW1lKX0gbm90IHNwZWNpZmllZCR7dExvY2F0aW9ufS4gTXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9XG4gIGNvcHlQcm9wcyhjaGVja2VyLCByZXF1aXJlZENoZWNrZXIpO1xuICByZXR1cm4gcmVxdWlyZWRDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBjb3B5UHJvcHMoc3JjLCBkZXN0KSB7XG4gIGVhY2goT2JqZWN0LmtleXMoc3JjKSwga2V5ID0+IGRlc3Rba2V5XSA9IHNyY1trZXldKTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrVXRpbC5qc1xuICoqLyIsImNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcbmNvbnN0IHtcbiAgdHlwZU9mLCBlYWNoLCBjb3B5LCBnZXRDaGVja2VyRGlzcGxheSwgaXNFcnJvcixcbiAgYXJyYXlpZnksIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCBjaGVja2VySGVscGVycyxcbiAgdW5kZWZcbiAgfSA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7c2V0dXBDaGVja2VyfSA9IGNoZWNrZXJIZWxwZXJzO1xuXG5sZXQgY2hlY2tlcnMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXJyYXk6IHR5cGVPZkNoZWNrR2V0dGVyKCdBcnJheScpLFxuICBib29sOiB0eXBlT2ZDaGVja0dldHRlcignQm9vbGVhbicpLFxuICBudW1iZXI6IHR5cGVPZkNoZWNrR2V0dGVyKCdOdW1iZXInKSxcbiAgc3RyaW5nOiB0eXBlT2ZDaGVja0dldHRlcignU3RyaW5nJyksXG4gIGZ1bmM6IGZ1bmNDaGVja0dldHRlcigpLFxuICBvYmplY3Q6IG9iamVjdENoZWNrR2V0dGVyKCksXG5cbiAgaW5zdGFuY2VPZjogaW5zdGFuY2VDaGVja0dldHRlcixcbiAgb25lT2Y6IG9uZU9mQ2hlY2tHZXR0ZXIsXG4gIG9uZU9mVHlwZTogb25lT2ZUeXBlQ2hlY2tHZXR0ZXIsXG5cbiAgYXJyYXlPZjogYXJyYXlPZkNoZWNrR2V0dGVyLFxuICBvYmplY3RPZjogb2JqZWN0T2ZDaGVja0dldHRlcixcbiAgdHlwZU9yQXJyYXlPZjogdHlwZU9yQXJyYXlPZkNoZWNrR2V0dGVyLFxuXG4gIHNoYXBlOiBnZXRTaGFwZUNoZWNrR2V0dGVyKCksXG4gIGFyZ3M6IGFyZ3VtZW50c0NoZWNrZXJHZXR0ZXIoKSxcblxuICBhbnk6IGFueUNoZWNrR2V0dGVyKClcbn07XG5cbmZ1bmN0aW9uIHR5cGVPZkNoZWNrR2V0dGVyKHR5cGUpIHtcbiAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gdHlwZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZX0pO1xufVxuXG5mdW5jdGlvbiBmdW5jQ2hlY2tHZXR0ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnRnVuY3Rpb24nO1xuICBsZXQgZnVuY3Rpb25DaGVja2VyID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGZ1bmN0aW9uQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlfSk7XG5cbiAgZnVuY3Rpb25DaGVja2VyLndpdGhQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZ2V0V2l0aFByb3BlcnRpZXNDaGVja2VyKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBhcGlFcnJvciA9IGNoZWNrZXJzLm9iamVjdE9mKGNoZWNrZXJzLmZ1bmMpKHByb3BlcnRpZXMsICdwcm9wZXJ0aWVzJywgJ2FwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMnKTtcbiAgICBpZiAoaXNFcnJvcihhcGlFcnJvcikpIHtcbiAgICAgIHRocm93IGFwaUVycm9yO1xuICAgIH1cbiAgICBsZXQgc2hhcGVDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUocHJvcGVydGllcywgdHJ1ZSk7XG4gICAgc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZSA9ICdmdW5jLndpdGhQcm9wZXJ0aWVzJztcblxuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gZnVuY3Rpb25XaXRoUHJvcGVydGllc0NoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgY29uc3Qgbm90RnVuY3Rpb24gPSBjaGVja2Vycy5mdW5jKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3Iobm90RnVuY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBub3RGdW5jdGlvbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgfSwge3R5cGU6IHNoYXBlQ2hlY2tlci50eXBlLCBzaG9ydFR5cGU6ICdmdW5jLndpdGhQcm9wZXJ0aWVzJ30pO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb25DaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvYmplY3RDaGVja0dldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgbGV0IG9iamVjdE51bGxPa0NoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb2JqZWN0TnVsbE9rQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGU6IG51bGxUeXBlfSk7XG5cbiAgbGV0IG9iamVjdENoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb2JqZWN0Q2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgaXNFcnJvcihvYmplY3ROdWxsT2tDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBvYmplY3RDaGVja2VyLnR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGV9KTtcblxuICBvYmplY3RDaGVja2VyLm51bGxPayA9IG9iamVjdE51bGxPa0NoZWNrZXI7XG5cbiAgcmV0dXJuIG9iamVjdENoZWNrZXI7XG59XG5cblxuZnVuY3Rpb24gaW5zdGFuY2VDaGVja0dldHRlcihjbGFzc1RvQ2hlY2spIHtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBpbnN0YW5jZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBjbGFzc1RvQ2hlY2spKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIGNsYXNzVG9DaGVjay5uYW1lKTtcbiAgICB9XG4gIH0sIHt0eXBlOiBjbGFzc1RvQ2hlY2submFtZX0pO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgZW51bTogZW51bXNcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9uZU9mWyR7ZW51bXMubWFwKGVubSA9PiBzdHJpbmdpZnkoZW5tKSkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIHNldHVwQ2hlY2tlcihmdW5jdGlvbiBvbmVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWVudW1zLnNvbWUoZW5tID0+IGVubSA9PT0gdmFsKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGUsIHNob3J0VHlwZX0pO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb25lT2ZUeXBlJ30sXG4gICAgb25lT2ZUeXBlOiBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpKVxuICB9O1xuICBjb25zdCBjaGVja2Vyc0Rpc3BsYXkgPSBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pKTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9uZU9mVHlwZVske2NoZWNrZXJzRGlzcGxheS5qb2luKCcsICcpfV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWNoZWNrZXJzLnNvbWUoY2hlY2tlciA9PiAhaXNFcnJvcihjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICBhcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgYXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFycmF5T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB7dHlwZSwgc2hvcnRUeXBlfSk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICBvYmplY3RPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgbm90T2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIGlmIChpc0Vycm9yKG5vdE9iamVjdCkpIHtcbiAgICAgIHJldHVybiBub3RPYmplY3Q7XG4gICAgfVxuICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICBpZiAoaXNFcnJvcihjaGVja2VyKGl0ZW0sIGtleSwgbmFtZSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwge3R5cGUsIHNob3J0VHlwZX0pO1xufVxuXG5mdW5jdGlvbiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAndHlwZU9yQXJyYXlPZid9LFxuICAgIHR5cGVPckFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGB0eXBlT3JBcnJheU9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2VyLCBjaGVja2Vycy5hcnJheU9mKGNoZWNrZXIpXSkodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlLCBzaG9ydFR5cGV9KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSwgbm9uT2JqZWN0KSB7XG4gICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgc2hhcGVUeXBlc1twcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICBsZXQgcmV0ID0ge307XG4gICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGFyZW50UmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBjb25zdCBzcGVjaWZpZWQgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApO1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IHVuZGVmKHBhcmVudFJlcXVpcmVkKSA/ICFjaGVja2VyLmlzT3B0aW9uYWwgOiBwYXJlbnRSZXF1aXJlZDtcbiAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgcmV0W3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3RlcnNlLCBvYmo6IG9iaiAmJiBvYmpbcHJvcF0sIHJlcXVpcmVkLCBhZGRIZWxwZXJzfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgIGZ1bmN0aW9uIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSAnSVRFTSc7XG4gICAgICAgICAgaWYgKGNoZWNrZXIudHlwZSAmJiBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEudHlwZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRIZWxwZXIoXG4gICAgICAgICAgICAnbWlzc2luZycsICdNSVNTSU5HIFRISVMgJyArIGl0ZW0sICcgPC0tIFlPVSBBUkUgTUlTU0lORyBUSElTJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3BlY2lmaWVkKSB7XG4gICAgICAgICAgbGV0IGVycm9yID0gY2hlY2tlcihvYmpbcHJvcF0sIHByb3AsIG51bGwsIG9iaik7XG4gICAgICAgICAgaWYgKGlzRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICBhZGRIZWxwZXIoJ2Vycm9yJywgJ1RISVMgSVMgVEhFIFBST0JMRU06ICcgKyBlcnJvci5tZXNzYWdlLCAnIDwtLSBUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkSGVscGVyKHByb3BlcnR5LCBvYmplY3RNZXNzYWdlLCBzdHJpbmdNZXNzYWdlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXRbcHJvcF0gKz0gc3RyaW5nTWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W3Byb3BdLl9fYXBpQ2hlY2tEYXRhW3Byb3BlcnR5XSA9IG9iamVjdE1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHlwZS5fX2FwaUNoZWNrRGF0YSA9IHtzdHJpY3Q6IGZhbHNlLCBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzaGFwZSd9O1xuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBzZXR1cENoZWNrZXIoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICBsZXQgaXNPYmplY3QgPSAhbm9uT2JqZWN0ICYmIGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgICB9XG4gICAgICBsZXQgc2hhcGVQcm9wRXJyb3I7XG4gICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uID8gbG9jYXRpb24gKyAobmFtZSA/ICcvJyA6ICcnKSA6ICcnO1xuICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG4gICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICBpZiAodmFsLmhhc093blByb3BlcnR5KHByb3ApIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgICAgICBzaGFwZVByb3BFcnJvciA9IGNoZWNrZXIodmFsW3Byb3BdLCBwcm9wLCBgJHtsb2NhdGlvbn0ke25hbWV9YCwgdmFsKTtcbiAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVQcm9wRXJyb3I7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZTogJ3NoYXBlJ30pO1xuXG4gICAgZnVuY3Rpb24gc3RyaWN0VHlwZSgpIHtcbiAgICAgIHJldHVybiB0eXBlKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpO1xuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEuc3RyaWN0ID0gdHJ1ZTtcbiAgICBzaGFwZUNoZWNrZXIuc3RyaWN0ID0gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIHN0cmljdFNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgY29uc3Qgc2hhcGVFcnJvciA9IHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlRXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBzaGFwZUVycm9yO1xuICAgICAgfVxuICAgICAgY29uc3QgYWxsb3dlZFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzaGFwZSk7XG4gICAgICBjb25zdCBleHRyYVByb3BzID0gT2JqZWN0LmtleXModmFsKS5maWx0ZXIocHJvcCA9PiBhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKHByb3ApID09PSAtMSk7XG4gICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgICAgICBgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gY2Fubm90IGhhdmUgZXh0cmEgcHJvcGVydGllczogJHt0KGV4dHJhUHJvcHMuam9pbignYCwgYCcpKX0uYCArXG4gICAgICAgICAgYEl0IGlzIGxpbWl0ZWQgdG8gJHt0KGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJ2AsIGAnKSl9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIHt0eXBlOiBzdHJpY3RUeXBlLCBzaG9ydFR5cGU6ICdzdHJpY3Qgc2hhcGUnfSk7XG5cbiAgICByZXR1cm4gc2hhcGVDaGVja2VyO1xuICB9XG5cbiAgc2hhcGVDaGVja0dldHRlci5pZk5vdCA9IGZ1bmN0aW9uIGlmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuICAgIH1cbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBub3Qgc3BlY2lmaWVkYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBub25lIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGlmTm90Q2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgbGV0IHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIGxldCBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUob3RoZXJQcm9wID0+IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkob3RoZXJQcm9wKSk7XG4gICAgICBpZiAocHJvcEV4aXN0cyA9PT0gb3RoZXJQcm9wc0V4aXN0KSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfSwge25vdFJlcXVpcmVkOiB0cnVlLCB0eXBlLCBzaG9ydFR5cGU6IGBpZk5vdFske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0pO1xuICB9O1xuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIub25seUlmID0gZnVuY3Rpb24gb25seUlmKG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgb3RoZXJQcm9wcyA9IGFycmF5aWZ5KG90aGVyUHJvcHMpO1xuICAgIGxldCB0eXBlO1xuICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIGFsc28gc3BlY2lmaWVkYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgfVxuICAgIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gb25seUlmQ2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGNvbnN0IG90aGVyc1ByZXNlbnQgPSBvdGhlclByb3BzLmV2ZXJ5KHByb3AgPT4gb2JqLmhhc093blByb3BlcnR5KHByb3ApKTtcbiAgICAgIGlmICghb3RoZXJzUHJlc2VudCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfSwge3R5cGUsIHNob3J0VHlwZTogYG9ubHlJZlske290aGVyUHJvcHMuam9pbignLCAnKX1dYH0pO1xuICB9O1xuXG4gIHJldHVybiBzaGFwZUNoZWNrR2V0dGVyO1xufVxuXG5mdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICBjb25zdCB0eXBlID0gJ2Z1bmN0aW9uIGFyZ3VtZW50cyc7XG4gIHJldHVybiBzZXR1cENoZWNrZXIoZnVuY3Rpb24gYXJnc0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHt0eXBlfSk7XG59XG5cbmZ1bmN0aW9uIGFueUNoZWNrR2V0dGVyKCkge1xuICByZXR1cm4gc2V0dXBDaGVja2VyKGZ1bmN0aW9uIGFueUNoZWNrZXJEZWZpbml0aW9uKCkge1xuICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gIH0sIHt0eXBlOiAnYW55J30pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9jaGVja2Vycy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5O1xuXG5mdW5jdGlvbiBnZXRTZXJpYWxpemUgKGZuLCBkZWN5Y2xlKSB7XG4gIHZhciBzZWVuID0gW10sIGtleXMgPSBbXTtcbiAgZGVjeWNsZSA9IGRlY3ljbGUgfHwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiAnW0NpcmN1bGFyICcgKyBnZXRQYXRoKHZhbHVlLCBzZWVuLCBrZXlzKSArICddJ1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHZhciByZXQgPSB2YWx1ZTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuICAgICAgaWYgKHNlZW4uaW5kZXhPZih2YWx1ZSkgIT09IC0xKVxuICAgICAgICByZXQgPSBkZWN5Y2xlKGtleSwgdmFsdWUpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHNlZW4ucHVzaCh2YWx1ZSk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm4pIHJldCA9IGZuKGtleSwgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFBhdGggKHZhbHVlLCBzZWVuLCBrZXlzKSB7XG4gIHZhciBpbmRleCA9IHNlZW4uaW5kZXhPZih2YWx1ZSk7XG4gIHZhciBwYXRoID0gWyBrZXlzW2luZGV4XSBdO1xuICBmb3IgKGluZGV4LS07IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpZiAoc2VlbltpbmRleF1bIHBhdGhbMF0gXSA9PT0gdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gc2VlbltpbmRleF07XG4gICAgICBwYXRoLnVuc2hpZnQoa2V5c1tpbmRleF0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJ34nICsgcGF0aC5qb2luKCcuJyk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmosIGZuLCBzcGFjZXMsIGRlY3ljbGUpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgZ2V0U2VyaWFsaXplKGZuLCBkZWN5Y2xlKSwgc3BhY2VzKTtcbn1cblxuc3RyaW5naWZ5LmdldFNlcmlhbGl6ZSA9IGdldFNlcmlhbGl6ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9qc29uLXN0cmluZ2lmeS1zYWZlL3N0cmluZ2lmeS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFwaS1jaGVjay5qcyJ9