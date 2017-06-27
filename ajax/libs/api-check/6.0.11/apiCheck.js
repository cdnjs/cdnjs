// apiCheck.js v6.0.11 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	var apiCheckApiCheck = getApiCheckInstance({
	  output: { prefix: "apiCheck" }
	});
	var checkerFnChecker = checkers.func.withProperties({
	  type: checkers.oneOfType([checkers.string, checkerTypeType]).optional,
	  displayName: checkers.string.optional,
	  shortType: checkers.string.optional,
	  notOptional: checkers.bool.optional,
	  childrenCheckers: checkers.arrayOf(checkers.string).optional
	});
	
	var getApiCheckInstanceCheckers = [checkers.shape({
	  output: checkers.shape({
	    prefix: checkers.string.optional
	  })
	}), checkers.objectOf(checkerFnChecker).optional];
	
	module.exports = getApiCheckInstance;
	module.exports.internalChecker = apiCheckApiCheck;
	module.exports.utils = apiCheckUtil;
	
	each(checkers, function (checker, name) {
	  return module.exports[name] = checker;
	});
	
	function getApiCheckInstance() {
	  var config = arguments[0] === undefined ? {} : arguments[0];
	  var extraCheckers = arguments[1] === undefined ? {} : arguments[1];
	
	  if (apiCheckApiCheck && arguments.length) {
	    apiCheckApiCheck["throw"](getApiCheckInstanceCheckers, arguments, {
	      prefix: "creating an instance of apiCheck"
	    });
	  }
	
	  var disabled = false;
	  var additionalProperties = {
	    "throw": getApiCheck(true),
	    warn: getApiCheck(false),
	    disable: function () {
	      return disabled = true;
	    },
	    enable: function () {
	      return disabled = false;
	    },
	    getErrorMessage: getErrorMessage,
	    handleErrorMessage: handleErrorMessage,
	    config: {
	      output: config.output || {
	        prefix: "",
	        suffix: "",
	        docsBaseUrl: ""
	      },
	      verbose: config.verbose || false
	    },
	    utils: apiCheckUtil
	  };
	
	  each(additionalProperties, function (wrapper, name) {
	    return apiCheck[name] = wrapper;
	  });
	  each(checkers, function (checker, name) {
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
	    if (disabled) {
	      return {
	        apiTypes: {}, argTypes: {},
	        passed: true, message: "",
	        failed: false
	      }; // empty version of what is normally returned
	    }
	    checkApiCheckApi(arguments);
	    var arrayArgs = Array.prototype.slice.call(args);
	    var messages = undefined;
	    api = arrayify(api);
	    var enoughArgs = checkEnoughArgs(api, arrayArgs);
	    if (enoughArgs.length) {
	      messages = enoughArgs;
	    } else {
	      messages = checkApiWithArgs(api, arrayArgs);
	    }
	    var returnObject = getTypes(api, arrayArgs);
	    if (messages.length) {
	      returnObject.message = apiCheck.getErrorMessage(api, arrayArgs, messages, output);
	      returnObject.failed = true;
	      returnObject.passed = false;
	    } else {
	      returnObject.message = "";
	      returnObject.passed = true;
	      returnObject.failed = false;
	    }
	    return returnObject;
	  }
	
	  function checkApiCheckApi(args) {
	    var os = checkers.string.optional;
	    var api = [// dog fooding here
	    checkers.typeOrArrayOf(checkerFnChecker), checkers.oneOfType([checkers.args, checkers.array]), checkers.shape({
	      prefix: os, suffix: os, urlSuffix: os, // appended case
	      onlyPrefix: os, onlySuffix: os, url: os // override case
	    }).strict.optional];
	    var errors = checkEnoughArgs(api, args);
	    if (!errors.length) {
	      errors = checkApiWithArgs(api, args);
	    }
	    var message = undefined;
	    if (errors.length) {
	      message = apiCheck.getErrorMessage(api, args, errors, {
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
	    api = arrayify(api);
	    args = arrayify(args);
	
	    var _getTypes = getTypes(api, args);
	
	    var apiTypes = _getTypes.apiTypes;
	    var argTypes = _getTypes.argTypes;
	
	    var copy = args.slice();
	    var replacedItems = [];
	    replaceFunctionWithName(copy);
	    var passedArgs = copy.length ? JSON.stringify(copy, null, 2) : "nothing";
	    argTypes = args.length ? JSON.stringify(argTypes, null, 2) : "nothing";
	    apiTypes = apiTypes.length ? JSON.stringify(apiTypes, null, 2) : "nothing";
	    var n = "\n";
	    return ["You passed:" + n + "" + passedArgs, "With the types of:" + n + "" + argTypes, "The API calls for:" + n + "" + apiTypes].join(n + n);
	
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
	  }
	
	  function getTypes(api, args) {
	    api = arrayify(api);
	    args = arrayify(args);
	    var apiTypes = api.map(function (checker, index) {
	      return getCheckerDisplay(checker, { terse: !apiCheck.config.verbose, obj: args[index], addHelpers: true });
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
	    res = checker(arg, null, argName);
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
	
	var eachable = {
	  Object: getDisplay,
	  Array: getDisplay
	};
	
	function getDisplay(obj) {
	  var argDisplay = {};
	  each(obj, function (v, k) {
	    return argDisplay[k] = getArgDisplay(v);
	  });
	  return argDisplay;
	}
	
	function getArgDisplay(arg) {
	  var cName = arg && arg.constructor && arg.constructor.name;
	  return cName ? eachable[cName] ? eachable[cName](arg) : cName : arg === null ? "null" : typeOf(arg);
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
	  makeOptional: makeOptional, wrapInSpecified: wrapInSpecified, setupChecker: setupChecker
	};
	
	module.exports = {
	  each: each, copy: copy, typeOf: typeOf, arrayify: arrayify, getCheckerDisplay: getCheckerDisplay, isError: isError, list: list, getError: getError, nAtL: nAtL, t: t, undef: undef, checkerHelpers: checkerHelpers
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
	  /* jshint maxcomplexity:17 */
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
	
	function makeOptional(checker) {
	  checker.optional = function optionalCheck(val, name, location, obj) {
	    if (!undef(val)) {
	      return checker(val, name, location, obj);
	    }
	  };
	  checker.optional.isOptional = true;
	  checker.optional.type = checker.type;
	  checker.optional.displayName = checker.displayName;
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
	
	function wrapInSpecified(fn, type, shortType) {
	  fn.type = type;
	  fn.shortType = shortType;
	  function specifiedChecker(val, name, location, obj) {
	    var u = undef(val);
	    if (u && !fn.isOptional) {
	      var tLocation = location ? " in " + t(location) : "";
	      var _type = getCheckerDisplay(fn, { short: true });
	      var stringType = typeof _type !== "object" ? _type : JSON.stringify(_type);
	      return new Error("Required " + t(name) + " not specified" + tLocation + ". Must be " + t(stringType));
	    } else {
	      return fn(val, name, location, obj);
	    }
	  }
	  specifiedChecker.type = fn.type;
	  specifiedChecker.shortType = fn.shortType;
	  specifiedChecker.notOptional = fn.notOptional;
	  specifiedChecker.childrenCheckers = fn.childrenCheckers;
	  setupChecker(specifiedChecker);
	  setupChecker(fn);
	  return specifiedChecker;
	}
	
	function setupChecker(checker) {
	  checker.displayName = "apiCheck " + t(checker.shortType || checker.type || checker.name) + " type checker";
	  if (!checker.notOptional) {
	    makeOptional(checker);
	  }
	  each(checker.childrenCheckers, function (childName) {
	    setupChecker(checker[childName]);
	  });
	}

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
	
	var checkers = module.exports = {
	  array: getTypeOfChecker("Array"),
	  bool: getTypeOfChecker("Boolean"),
	  number: getTypeOfChecker("Number"),
	  string: getTypeOfChecker("String"),
	  func: getFunctionChecker(),
	  object: getObjectChecker(),
	
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
	
	each(checkers, checkerHelpers.setupChecker);
	
	function getTypeOfChecker(type) {
	  var lType = type.toLowerCase();
	  return checkerHelpers.wrapInSpecified(function typeOfCheckerDefinition(val, name, location) {
	    if (typeOf(val) !== lType) {
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function getFunctionChecker() {
	  var type = "Function";
	  var functionChecker = checkerHelpers.wrapInSpecified(function functionCheckerDefinition(val, name, location) {
	    if (typeOf(val) !== "function") {
	      return getError(name, location, type);
	    }
	  }, type);
	
	  functionChecker.withProperties = function getWithPropertiesChecker(properties) {
	    var apiError = checkers.objectOf(checkers.func)(properties, "properties", "apiCheck.func.withProperties");
	    if (isError(apiError)) {
	      throw apiError;
	    }
	    var shapeChecker = checkers.shape(properties, true);
	    shapeChecker.type.__apiCheckData.type = "func.withProperties";
	
	    return checkerHelpers.wrapInSpecified(function functionWithPropertiesChecker(val, name, location) {
	      var notFunction = checkers.func(val, name, location);
	      if (isError(notFunction)) {
	        return notFunction;
	      }
	      return shapeChecker(val, name, location);
	    }, shapeChecker.type, "func.withProperties");
	  };
	
	  functionChecker.childrenCheckers = ["withProperties"];
	  return functionChecker;
	}
	
	function getObjectChecker() {
	  var type = "Object";
	  var nullType = "Object (null ok)";
	  var objectNullOkChecker = checkerHelpers.wrapInSpecified(function objectNullOkCheckerDefinition(val, name, location) {
	    if (typeOf(val) !== "object") {
	      return getError(name, location, nullType);
	    }
	  }, nullType);
	
	  var objectChecker = checkerHelpers.wrapInSpecified(function objectCheckerDefinition(val, name, location) {
	    if (val === null || isError(objectNullOkChecker(val, name, location))) {
	      return getError(name, location, objectChecker.type);
	    }
	  }, type);
	
	  objectChecker.nullOk = objectNullOkChecker;
	  objectChecker.childrenCheckers = ["nullOk"];
	
	  return objectChecker;
	}
	
	function instanceCheckGetter(classToCheck) {
	  return checkerHelpers.wrapInSpecified(function instanceCheckerDefinition(val, name, location) {
	    if (!(val instanceof classToCheck)) {
	      return getError(name, location, classToCheck.name);
	    }
	  }, classToCheck.name);
	}
	
	function oneOfCheckGetter(enums) {
	  var type = {
	    __apiCheckData: { optional: false, type: "enum" },
	    "enum": enums
	  };
	  var shortType = "enum[" + enums.map(function (enm) {
	    return JSON.stringify(enm);
	  }).join(", ") + "]";
	  return checkerHelpers.wrapInSpecified(function oneOfCheckerDefinition(val, name, location) {
	    if (!enums.some(function (enm) {
	      return enm === val;
	    })) {
	      return getError(name, location, shortType);
	    }
	  }, type, shortType);
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
	  return checkerHelpers.wrapInSpecified(function oneOfTypeCheckerDefinition(val, name, location) {
	    if (!checkers.some(function (checker) {
	      return !isError(checker(val, name, location));
	    })) {
	      return getError(name, location, shortType);
	    }
	  }, type, shortType);
	}
	
	function arrayOfCheckGetter(checker) {
	  var type = {
	    __apiCheckData: { optional: false, type: "arrayOf" },
	    arrayOf: getCheckerDisplay(checker)
	  };
	  var checkerDisplay = getCheckerDisplay(checker, { short: true });
	  var shortType = "arrayOf[" + checkerDisplay + "]";
	  return checkerHelpers.wrapInSpecified(function arrayOfCheckerDefinition(val, name, location) {
	    if (isError(checkers.array(val)) || !val.every(function (item) {
	      return !isError(checker(item));
	    })) {
	      return getError(name, location, shortType);
	    }
	  }, type, shortType);
	}
	
	function objectOfCheckGetter(checker) {
	  var type = {
	    __apiCheckData: { optional: false, type: "objectOf" },
	    objectOf: getCheckerDisplay(checker)
	  };
	  var checkerDisplay = getCheckerDisplay(checker, { short: true });
	  var shortType = "objectOf[" + checkerDisplay + "]";
	  return checkerHelpers.wrapInSpecified(function objectOfCheckerDefinition(val, name, location) {
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
	  }, type, shortType);
	}
	
	function typeOrArrayOfCheckGetter(checker) {
	  var type = {
	    __apiCheckData: { optional: false, type: "typeOrArrayOf" },
	    typeOrArrayOf: getCheckerDisplay(checker)
	  };
	  var checkerDisplay = getCheckerDisplay(checker, { short: true });
	  var shortType = "typeOrArrayOf[" + checkerDisplay + "]";
	  return checkerHelpers.wrapInSpecified(function typeOrArrayOfDefinition(val, name, location, obj) {
	    if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
	      return getError(name, location, shortType);
	    }
	  }, type, shortType);
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
	    var shapeChecker = checkerHelpers.wrapInSpecified(function shapeCheckerDefinition(val, name, location) {
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
	    }, type, "shape");
	
	    function strictType() {
	      return type.apply(undefined, arguments);
	    }
	
	    strictType.__apiCheckData = copy(shapeChecker.type.__apiCheckData);
	    strictType.__apiCheckData.strict = true;
	    shapeChecker.strict = checkerHelpers.wrapInSpecified(function strictShapeCheckerDefinition(val, name, location) {
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
	    }, strictType, "strict shape");
	    shapeChecker.childrenCheckers = ["strict"];
	    checkerHelpers.setupChecker(shapeChecker);
	
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
	    var ifNotChecker = function ifNotCheckerDefinition(prop, propName, location, obj) {
	      var propExists = obj && obj.hasOwnProperty(propName);
	      var otherPropsExist = otherProps.some(function (otherProp) {
	        return obj && obj.hasOwnProperty(otherProp);
	      });
	      if (propExists === otherPropsExist) {
	        return getError(propName, location, ifNotChecker.type);
	      } else if (propExists) {
	        return propChecker(prop, propName, location, obj);
	      }
	    };
	
	    ifNotChecker.type = type;
	    ifNotChecker.shortType = "ifNot[" + otherProps.join(", ") + "]";
	    checkerHelpers.setupChecker(ifNotChecker);
	    return ifNotChecker;
	  };
	
	  shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
	    otherProps = arrayify(otherProps);
	    var type = undefined;
	    if (otherProps.length === 1) {
	      type = "specified only if " + otherProps[0] + " is also specified";
	    } else {
	      type = "specified only if all of the following are specified: [" + list(otherProps, ", ", "and ") + "]";
	    }
	    var onlyIfChecker = function onlyIfCheckerDefinition(prop, propName, location, obj) {
	      var othersPresent = otherProps.every(function (prop) {
	        return obj.hasOwnProperty(prop);
	      });
	      if (!othersPresent) {
	        return getError(propName, location, onlyIfChecker.type);
	      } else {
	        return propChecker(prop, propName, location, obj);
	      }
	    };
	
	    onlyIfChecker.type = type;
	    onlyIfChecker.shortType = "onlyIf[" + otherProps.join(", ") + "]";
	    checkerHelpers.setupChecker(onlyIfChecker);
	    return onlyIfChecker;
	  };
	
	  return shapeCheckGetter;
	}
	
	function argumentsCheckerGetter() {
	  var type = "function arguments";
	  return checkerHelpers.wrapInSpecified(function argsCheckerDefinition(val, name, location) {
	    if (Array.isArray(val) || isError(checkers.object(val)) || isError(checkers.number(val.length))) {
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function anyCheckGetter() {
	  return checkerHelpers.wrapInSpecified(function anyCheckerDefinition() {}, "any");
	}
	
	// don't do anything

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMjM5ODU5YzZhNDI4Nzc1MmUxOCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUErRCxZQUFZLENBQS9FLElBQUk7S0FBRSxPQUFPLEdBQXNELFlBQVksQ0FBekUsT0FBTztLQUFFLENBQUMsR0FBbUQsWUFBWSxDQUFoRSxDQUFDO0tBQUUsUUFBUSxHQUF5QyxZQUFZLENBQTdELFFBQVE7S0FBRSxpQkFBaUIsR0FBc0IsWUFBWSxDQUFuRCxpQkFBaUI7S0FBRSxNQUFNLEdBQWMsWUFBWSxDQUFoQyxNQUFNO0tBQUUsUUFBUSxHQUFJLFlBQVksQ0FBeEIsUUFBUTs7QUFDdEUsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxtQkFBWSxDQUFDLENBQUM7QUFDdkMsS0FBTSxnQkFBZ0IsR0FBRyxt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QUFJLENBQUMsTUFBRyxDQUFDO0FBQzdELG1CQUFjLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLFlBQU8sYUFBYSxDQUFDO0lBQ3RCLENBQUM7O0FBRUYsVUFBTyxnQkFBZ0IsQ0FBQztFQUN6Qjs7QUFFRCxVQUFTLHNCQUFzQixHQUFHO0FBQ2hDLE9BQU0sSUFBSSxHQUFHLG9CQUFvQixDQUFDO0FBQ2xDLFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3hGLFNBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQy9GLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkM7SUFDRixFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ1Y7O0FBRUQsVUFBUyxjQUFjLEdBQUc7QUFDeEIsVUFBTyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsb0JBQW9CLEdBQUcsRUFFckUsRUFBRSxLQUFLLENBQUMsQ0FBQztFQUNYIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGIyMzk4NTljNmE0Mjg3NzUyZTE4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FwaUNoZWNrJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IGFwaUNoZWNrVXRpbCA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7ZWFjaCwgaXNFcnJvciwgdCwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCB0eXBlT2YsIGdldEVycm9yfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xuY29uc3QgYXBpQ2hlY2tBcGlDaGVjayA9IGdldEFwaUNoZWNrSW5zdGFuY2Uoe1xuICBvdXRwdXQ6IHtwcmVmaXg6ICdhcGlDaGVjayd9XG59KTtcbmNvbnN0IGNoZWNrZXJGbkNoZWNrZXIgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgdHlwZTogY2hlY2tlcnMub25lT2ZUeXBlKFtjaGVja2Vycy5zdHJpbmcsIGNoZWNrZXJUeXBlVHlwZV0pLm9wdGlvbmFsLFxuICBkaXNwbGF5TmFtZTogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICBzaG9ydFR5cGU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgbm90T3B0aW9uYWw6IGNoZWNrZXJzLmJvb2wub3B0aW9uYWwsXG4gIGNoaWxkcmVuQ2hlY2tlcnM6IGNoZWNrZXJzLmFycmF5T2YoY2hlY2tlcnMuc3RyaW5nKS5vcHRpb25hbFxufSk7XG5cbmNvbnN0IGdldEFwaUNoZWNrSW5zdGFuY2VDaGVja2VycyA9IFtcbiAgY2hlY2tlcnMuc2hhcGUoe1xuICAgIG91dHB1dDogY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgcHJlZml4OiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWxcbiAgICB9KVxuICB9KSxcbiAgY2hlY2tlcnMub2JqZWN0T2YoY2hlY2tlckZuQ2hlY2tlcikub3B0aW9uYWxcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZTtcbm1vZHVsZS5leHBvcnRzLmludGVybmFsQ2hlY2tlciA9IGFwaUNoZWNrQXBpQ2hlY2s7XG5tb2R1bGUuZXhwb3J0cy51dGlscyA9IGFwaUNoZWNrVXRpbDtcblxuZWFjaChjaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gY2hlY2tlcik7XG5cbmZ1bmN0aW9uIGdldEFwaUNoZWNrSW5zdGFuY2UoY29uZmlnID0ge30sIGV4dHJhQ2hlY2tlcnMgPSB7fSkge1xuICBpZiAoYXBpQ2hlY2tBcGlDaGVjayAmJiBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgYXBpQ2hlY2tBcGlDaGVjay50aHJvdyhnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMsIGFyZ3VtZW50cywge1xuICAgICAgcHJlZml4OiAnY3JlYXRpbmcgYW4gaW5zdGFuY2Ugb2YgYXBpQ2hlY2snXG4gICAgfSk7XG4gIH1cblxuICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcbiAgbGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0ge1xuICAgIHRocm93OiBnZXRBcGlDaGVjayh0cnVlKSxcbiAgICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gICAgZGlzYWJsZTogKCkgPT4gZGlzYWJsZWQgPSB0cnVlLFxuICAgIGVuYWJsZTogKCkgPT4gZGlzYWJsZWQgPSBmYWxzZSxcbiAgICBnZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFuZGxlRXJyb3JNZXNzYWdlLFxuICAgIGNvbmZpZzoge1xuICAgICAgb3V0cHV0OiBjb25maWcub3V0cHV0IHx8IHtcbiAgICAgICAgcHJlZml4OiAnJyxcbiAgICAgICAgc3VmZml4OiAnJyxcbiAgICAgICAgZG9jc0Jhc2VVcmw6ICcnXG4gICAgICB9LFxuICAgICAgdmVyYm9zZTogY29uZmlnLnZlcmJvc2UgfHwgZmFsc2VcbiAgICB9LFxuICAgIHV0aWxzOiBhcGlDaGVja1V0aWxcbiAgfTtcblxuICBlYWNoKGFkZGl0aW9uYWxQcm9wZXJ0aWVzLCAod3JhcHBlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSB3cmFwcGVyKTtcbiAgZWFjaChjaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG4gIGVhY2goZXh0cmFDaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gY2hlY2tlcik7XG5cbiAgcmV0dXJuIGFwaUNoZWNrO1xuXG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIGluc3RhbmNlIGZ1bmN0aW9uLiBPdGhlciB0aGluZ3MgYXJlIGF0dGFjaGVkIHRvIHRoaXMgc2VlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhYm92ZS5cbiAgICogQHBhcmFtIGFwaSB7QXJyYXl9XG4gICAqIEBwYXJhbSBhcmdzIHthcmd1bWVudHN9XG4gICAqIEBwYXJhbSBvdXRwdXQge09iamVjdH1cbiAgICogQHJldHVybnMge09iamVjdH0gLSBpZiB0aGlzIGhhcyBhIGZhaWxlZCA9IHRydWUgcHJvcGVydHksIHRoZW4gaXQgZmFpbGVkXG4gICAqL1xuICBmdW5jdGlvbiBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjggKi9cbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwaVR5cGVzOiB7fSwgYXJnVHlwZXM6IHt9LFxuICAgICAgICBwYXNzZWQ6IHRydWUsIG1lc3NhZ2U6ICcnLFxuICAgICAgICBmYWlsZWQ6IGZhbHNlXG4gICAgICB9OyAvLyBlbXB0eSB2ZXJzaW9uIG9mIHdoYXQgaXMgbm9ybWFsbHkgcmV0dXJuZWRcbiAgICB9XG4gICAgY2hlY2tBcGlDaGVja0FwaShhcmd1bWVudHMpO1xuICAgIGNvbnN0IGFycmF5QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIGxldCBtZXNzYWdlcztcbiAgICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICAgIGxldCBlbm91Z2hBcmdzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJyYXlBcmdzKTtcbiAgICBpZiAoZW5vdWdoQXJncy5sZW5ndGgpIHtcbiAgICAgIG1lc3NhZ2VzID0gZW5vdWdoQXJncztcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJyYXlBcmdzKTtcbiAgICB9XG4gICAgbGV0IHJldHVybk9iamVjdCA9IGdldFR5cGVzKGFwaSwgYXJyYXlBcmdzKTtcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGksIGFycmF5QXJncywgbWVzc2FnZXMsIG91dHB1dCk7XG4gICAgICByZXR1cm5PYmplY3QuZmFpbGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybk9iamVjdC5wYXNzZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSAnJztcbiAgICAgIHJldHVybk9iamVjdC5wYXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuT2JqZWN0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tBcGlDaGVja0FwaShhcmdzKSB7XG4gICAgY29uc3Qgb3MgPSBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWw7XG4gICAgY29uc3QgYXBpID0gWyAvLyBkb2cgZm9vZGluZyBoZXJlXG4gICAgICBjaGVja2Vycy50eXBlT3JBcnJheU9mKGNoZWNrZXJGbkNoZWNrZXIpLFxuICAgICAgY2hlY2tlcnMub25lT2ZUeXBlKFtcbiAgICAgICAgY2hlY2tlcnMuYXJncywgY2hlY2tlcnMuYXJyYXlcbiAgICAgIF0pLFxuICAgICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgICBwcmVmaXg6IG9zLCBzdWZmaXg6IG9zLCB1cmxTdWZmaXg6IG9zLCAvLyBhcHBlbmRlZCBjYXNlXG4gICAgICAgIG9ubHlQcmVmaXg6IG9zLCBvbmx5U3VmZml4OiBvcywgdXJsOiBvcyAvLyBvdmVycmlkZSBjYXNlXG4gICAgICB9KS5zdHJpY3Qub3B0aW9uYWxcbiAgICBdO1xuICAgIGxldCBlcnJvcnMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIG1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBlcnJvcnMsIHtcbiAgICAgICAgcHJlZml4OiAnYXBpQ2hlY2snXG4gICAgICB9KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGFwaUNoZWNrV3JhcHBlcihhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShyZXN1bHQubWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gd29udCBnZXQgaGVyZSBpZiBhbiBlcnJvciBpcyB0aHJvd25cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG4gICAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAgIGxldCBnT3V0ID0gYXBpQ2hlY2suY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgICBsZXQgcHJlZml4ID0gZ2V0UHJlZml4KCk7XG4gICAgbGV0IHN1ZmZpeCA9IGdldFN1ZmZpeCgpO1xuICAgIGxldCB1cmwgPSBnZXRVcmwoKTtcbiAgICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICAgIHZhciBwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkID0gJ1xcblxcbicgKyBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7bWVzc2FnZX0gJHtzdWZmaXh9ICR7dXJsIHx8ICcnfSR7cGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZH1gLnRyaW0oKTtcblxuICAgIGZ1bmN0aW9uIGdldFByZWZpeCgpIHtcbiAgICAgIGxldCBwcmVmaXggPSBvdXRwdXQub25seVByZWZpeDtcbiAgICAgIGlmICghcHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN1ZmZpeCgpIHtcbiAgICAgIGxldCBzdWZmaXggPSBvdXRwdXQub25seVN1ZmZpeDtcbiAgICAgIGlmICghc3VmZml4KSB7XG4gICAgICAgIHN1ZmZpeCA9IGAke291dHB1dC5zdWZmaXggfHwgJyd9ICR7Z091dC5zdWZmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VmZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVybCgpIHtcbiAgICAgIGxldCB1cmwgPSBvdXRwdXQudXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsU3VmZml4ICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsU3VmZml4fWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcbiAgICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICAgIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgICBsZXQge2FwaVR5cGVzLCBhcmdUeXBlc30gPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICAgIGxldCBjb3B5ID0gYXJncy5zbGljZSgpO1xuICAgIGxldCByZXBsYWNlZEl0ZW1zID0gW107XG4gICAgcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUoY29weSk7XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGNvcHkubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoY29weSwgbnVsbCwgMikgOiAnbm90aGluZyc7XG4gICAgYXJnVHlwZXMgPSBhcmdzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFyZ1R5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgICBhcGlUeXBlcyA9IGFwaVR5cGVzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFwaVR5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgICBjb25zdCBuID0gJ1xcbic7XG4gICAgcmV0dXJuIFtcbiAgICAgIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9YCxcbiAgICAgIGBXaXRoIHRoZSB0eXBlcyBvZjoke259JHthcmdUeXBlc31gLFxuICAgICAgYFRoZSBBUEkgY2FsbHMgZm9yOiR7bn0ke2FwaVR5cGVzfWBcbiAgICBdLmpvaW4obiArIG4pO1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUZ1bmN0aW9uV2l0aE5hbWUob2JqKSB7XG4gICAgICBlYWNoKG9iaiwgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIGlmIChyZXBsYWNlZEl0ZW1zLmluZGV4T2YodmFsKSA9PT0gLTEpIHsgLy8gYXZvaWQgcmVjdXJzaXZlIHByb2JsZW1zXG4gICAgICAgICAgcmVwbGFjZWRJdGVtcy5wdXNoKHZhbCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXBsYWNlRnVuY3Rpb25XaXRoTmFtZShvYmopO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsLmRpc3BsYXlOYW1lIHx8IHZhbC5uYW1lIHx8ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZXMoYXBpLCBhcmdzKSB7XG4gICAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgICBhcmdzID0gYXJyYXlpZnkoYXJncyk7XG4gICAgbGV0IGFwaVR5cGVzID0gYXBpLm1hcCgoY2hlY2tlciwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7dGVyc2U6ICFhcGlDaGVjay5jb25maWcudmVyYm9zZSwgb2JqOiBhcmdzW2luZGV4XSwgYWRkSGVscGVyczogdHJ1ZX0pO1xuICAgIH0pO1xuICAgIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKGdldEFyZ0Rpc3BsYXkpO1xuICAgIHJldHVybiB7YXJnVHlwZXM6IGFyZ1R5cGVzLCBhcGlUeXBlc307XG4gIH1cblxufVxuXG5cbi8vIFNUQVRFTEVTUyBGVU5DVElPTlNcblxuLyoqXG4gKiBUaGlzIGlzIHdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zIGZvciBhY3R1YWxseSBjaGVja2luZyB0aGUgYXJndW1lbnRzIHdpdGggdGhlIGFwaS5cbiAqIEBwYXJhbSBhcGkge0FycmF5fSAtIGNoZWNrZXJzXG4gKiBAcGFyYW0gYXJncyB7QXJyYXl9IC0gYW5kIGFyZ3VtZW50cyBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzLCBsYXN0Q2hlY2tlciwgYXJnTmFtZSwgYXJnRmFpbGVkLCBza2lwUHJldmlvdXNDaGVja2VyO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUgKChjaGVja2VyID0gYXBpW2NoZWNrZXJJbmRleCsrXSkgJiYgKGFyZ0luZGV4IDwgYXJncy5sZW5ndGgpKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICBhcmdOYW1lID0gJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCBudWxsLCBhcmdOYW1lKTtcbiAgICBhcmdGYWlsZWQgPSBpc0Vycm9yKHJlcyk7XG4gICAgbGFzdENoZWNrZXIgPSBjaGVja2VySW5kZXggPj0gYXBpLmxlbmd0aDtcbiAgICBza2lwUHJldmlvdXNDaGVja2VyID0gY2hlY2tlckluZGV4ID4gMSAmJiBhcGlbY2hlY2tlckluZGV4IC0gMV0uaXNPcHRpb25hbDtcbiAgICBpZiAoKGFyZ0ZhaWxlZCAmJiBsYXN0Q2hlY2tlcikgfHwgKGFyZ0ZhaWxlZCAmJiAhbGFzdENoZWNrZXIgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCAmJiAhc2tpcFByZXZpb3VzQ2hlY2tlcikpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCBhcmcpKTtcbiAgICB9IGVsc2UgaWYgKGFyZ0ZhaWxlZCAmJiBjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goYCR7dChhcmdOYW1lKX0gcGFzc2VkYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWlsZWQgPyBtZXNzYWdlcyA6IFtdO1xufVxuXG5cbmNoZWNrZXJUeXBlVHlwZS50eXBlID0gJ2Z1bmN0aW9uIHdpdGggX19hcGlDaGVja0RhdGEgcHJvcGVydHkgYW5kIGAke2Z1bmN0aW9uLnR5cGV9YCBwcm9wZXJ0eSc7XG5mdW5jdGlvbiBjaGVja2VyVHlwZVR5cGUoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IGFwaUNoZWNrRGF0YUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZSh7XG4gICAgdHlwZTogY2hlY2tlcnMuc3RyaW5nLFxuICAgIG9wdGlvbmFsOiBjaGVja2Vycy5ib29sXG4gIH0pO1xuICBjb25zdCBhc0Z1bmMgPSBjaGVja2Vycy5mdW5jLndpdGhQcm9wZXJ0aWVzKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCBhc1NoYXBlID0gY2hlY2tlcnMuc2hhcGUoe19fYXBpQ2hlY2tEYXRhOiBhcGlDaGVja0RhdGFDaGVja2VyfSk7XG4gIGNvbnN0IHdyb25nU2hhcGUgPSBjaGVja2Vycy5vbmVPZlR5cGUoW1xuICAgIGFzRnVuYywgYXNTaGFwZVxuICBdKShjaGVja2VyVHlwZSwgbmFtZSwgbG9jYXRpb24pO1xuICBpZiAoaXNFcnJvcih3cm9uZ1NoYXBlKSkge1xuICAgIHJldHVybiB3cm9uZ1NoYXBlO1xuICB9XG4gIGlmICh0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdmdW5jdGlvbicgJiYgIWNoZWNrZXJUeXBlLmhhc093blByb3BlcnR5KGNoZWNrZXJUeXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUpKSB7XG4gICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZVR5cGUudHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIHZhbCkge1xuICBsZXQgY2hlY2tlckhlbHAgPSBnZXRDaGVja2VySGVscChjaGVja2VyLCB2YWwpO1xuICBjaGVja2VySGVscCA9IGNoZWNrZXJIZWxwID8gJyAtICcgKyBjaGVja2VySGVscCA6ICcnO1xuICByZXR1cm4gcmVzLm1lc3NhZ2UgKyBjaGVja2VySGVscDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckhlbHAoe2hlbHB9LCB2YWwpIHtcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh0eXBlb2YgaGVscCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhlbHAgPSBoZWxwKHZhbCk7XG4gIH1cbiAgcmV0dXJuIGhlbHA7XG59XG5cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdOb3QgZW5vdWdoIGFyZ3VtZW50cyBzcGVjaWZpZWQuIFJlcXVpcmVzIGAnICsgcmVxdWlyZWRBcmdzLmxlbmd0aCArICdgLCB5b3UgcGFzc2VkIGAnICsgYXJncy5sZW5ndGggKyAnYCdcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG52YXIgZWFjaGFibGUgPSB7XG4gIE9iamVjdDogZ2V0RGlzcGxheSxcbiAgQXJyYXk6IGdldERpc3BsYXlcbn07XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodiwgaykgPT4gYXJnRGlzcGxheVtrXSA9IGdldEFyZ0Rpc3BsYXkodikpO1xuICByZXR1cm4gYXJnRGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0QXJnRGlzcGxheShhcmcpIHtcbiAgdmFyIGNOYW1lID0gYXJnICYmIGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZTtcbiAgcmV0dXJuIGNOYW1lID8gZWFjaGFibGVbY05hbWVdID8gZWFjaGFibGVbY05hbWVdKGFyZykgOiBjTmFtZSA6IGFyZyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVPZihhcmcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgbWFrZU9wdGlvbmFsLCB3cmFwSW5TcGVjaWZpZWQsIHNldHVwQ2hlY2tlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2gsIGNvcHksIHR5cGVPZiwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgdW5kZWYsIGNoZWNrZXJIZWxwZXJzXG59O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICBsZXQgdHlwZSA9IHR5cGVPZihvYmopO1xuICBsZXQgZGFDb3B5O1xuICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGRhQ29weSA9IFtdO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgZGFDb3B5ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBlYWNoKG9iaiwgKHZhbCwga2V5KSA9PiB7XG4gICAgZGFDb3B5W2tleV0gPSB2YWw7IC8vIGNhbm5vdCBzaW5nbGUtbGluZSB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBhYm9ydCB0aGUgZWFjaFxuICB9KTtcbiAgcmV0dXJuIGRhQ29weTtcbn1cblxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgb3B0aW9ucykge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eToxNyAqL1xuICBsZXQgZGlzcGxheTtcbiAgbGV0IHNob3J0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnNob3J0O1xuICBpZiAoc2hvcnQgJiYgY2hlY2tlci5zaG9ydFR5cGUpIHtcbiAgICBkaXNwbGF5ID0gY2hlY2tlci5zaG9ydFR5cGU7XG4gIH0gZWxzZSBpZiAoIXNob3J0ICYmIHR5cGVvZiBjaGVja2VyLnR5cGUgPT09ICdvYmplY3QnIHx8IGNoZWNrZXIudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRpc3BsYXkgPSBnZXRDaGVja2VyVHlwZShjaGVja2VyLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucykgfHwgY2hlY2tlci5kaXNwbGF5TmFtZSB8fCBjaGVja2VyLm5hbWU7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJUeXBlKHt0eXBlfSwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBsZXQgX19hcGlDaGVja0RhdGEgPSB0eXBlLl9fYXBpQ2hlY2tEYXRhO1xuICAgIGxldCB0eXBlVHlwZXMgPSB0eXBlKG9wdGlvbnMpO1xuICAgIHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YSxcbiAgICAgIFtfX2FwaUNoZWNrRGF0YS50eXBlXTogdHlwZVR5cGVzXG4gICAgfTtcbiAgfVxuICByZXR1cm4gdHlwZTtcbn1cblxuZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gIGlmICghb2JqKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtvYmpdO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gZWFjaEFycnkoLi4uYXJndW1lbnRzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWFjaE9iaiguLi5hcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2hPYmoob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBlYWNoQXJyeShvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0Vycm9yKG9iaikge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3I7XG59XG5cbmZ1bmN0aW9uIGxpc3QoYXJyeSwgam9pbiwgZmluYWxKb2luKSB7XG4gIGFycnkgPSBhcnJheWlmeShhcnJ5KTtcbiAgbGV0IGNvcHkgPSBhcnJ5LnNsaWNlKCk7XG4gIGxldCBsYXN0ID0gY29weS5wb3AoKTtcbiAgaWYgKGNvcHkubGVuZ3RoID09PSAxKSB7XG4gICAgam9pbiA9ICcgJztcbiAgfVxuICByZXR1cm4gY29weS5qb2luKGpvaW4pICsgYCR7Y29weS5sZW5ndGggPyBqb2luICsgZmluYWxKb2luIDogJyd9JHtsYXN0fWA7XG59XG5cblxuZnVuY3Rpb24gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIGNoZWNrZXJUeXBlKSB7XG4gIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdvYmplY3QnID8gY2hlY2tlclR5cGUgOiBKU09OLnN0cmluZ2lmeShjaGVja2VyVHlwZSk7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IG11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xufVxuXG5mdW5jdGlvbiBuQXRMKG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IHROYW1lID0gdChuYW1lIHx8ICd2YWx1ZScpO1xuICBsZXQgdExvY2F0aW9uID0gIWxvY2F0aW9uID8gJycgOiAnIGF0ICcgKyB0KGxvY2F0aW9uKTtcbiAgcmV0dXJuIGAke3ROYW1lfSR7dExvY2F0aW9ufWA7XG59XG5cbmZ1bmN0aW9uIHQodGhpbmcpIHtcbiAgcmV0dXJuICdgJyArIHRoaW5nICsgJ2AnO1xufVxuXG5mdW5jdGlvbiB1bmRlZih0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJztcbn1cblxuXG5cblxuZnVuY3Rpb24gbWFrZU9wdGlvbmFsKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5vcHRpb25hbCA9IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKCF1bmRlZih2YWwpKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfTtcbiAgY2hlY2tlci5vcHRpb25hbC5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY2hlY2tlci50eXBlO1xuICBjaGVja2VyLm9wdGlvbmFsLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZTtcbiAgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY29weShjaGVja2VyLm9wdGlvbmFsLnR5cGUpOyAvLyBtYWtlIG91ciBvd24gY29weSBvZiB0aGlzXG4gIH0gZWxzZSBpZiAodHlwZW9mIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIudHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlICs9ICcgKG9wdGlvbmFsKSc7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB8fCB7fTsgLy8gYW5kIHRoaXNcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsID0gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiB3cmFwSW5TcGVjaWZpZWQoZm4sIHR5cGUsIHNob3J0VHlwZSkge1xuICBmbi50eXBlID0gdHlwZTtcbiAgZm4uc2hvcnRUeXBlID0gc2hvcnRUeXBlO1xuICBmdW5jdGlvbiBzcGVjaWZpZWRDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGNvbnN0IHUgPSB1bmRlZih2YWwpO1xuICAgIGlmICh1ICYmICFmbi5pc09wdGlvbmFsKSB7XG4gICAgICBsZXQgdExvY2F0aW9uID0gbG9jYXRpb24gPyBgIGluICR7dChsb2NhdGlvbil9YCA6ICcnO1xuICAgICAgY29uc3QgdHlwZSA9IGdldENoZWNrZXJEaXNwbGF5KGZuLCB7c2hvcnQ6IHRydWV9KTtcbiAgICAgIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcgPyB0eXBlIDogSlNPTi5zdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4odmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc3BlY2lmaWVkQ2hlY2tlci50eXBlID0gZm4udHlwZTtcbiAgc3BlY2lmaWVkQ2hlY2tlci5zaG9ydFR5cGUgPSBmbi5zaG9ydFR5cGU7XG4gIHNwZWNpZmllZENoZWNrZXIubm90T3B0aW9uYWwgPSBmbi5ub3RPcHRpb25hbDtcbiAgc3BlY2lmaWVkQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gZm4uY2hpbGRyZW5DaGVja2VycztcbiAgc2V0dXBDaGVja2VyKHNwZWNpZmllZENoZWNrZXIpO1xuICBzZXR1cENoZWNrZXIoZm4pO1xuICByZXR1cm4gc3BlY2lmaWVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gc2V0dXBDaGVja2VyKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci5zaG9ydFR5cGUgfHwgY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIG1ha2VPcHRpb25hbChjaGVja2VyKTtcbiAgfVxuICBlYWNoKGNoZWNrZXIuY2hpbGRyZW5DaGVja2VycywgY2hpbGROYW1lID0+IHtcbiAgICBzZXR1cENoZWNrZXIoY2hlY2tlcltjaGlsZE5hbWVdKTtcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnMsXG4gIHVuZGVmXG4gIH0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuXG5sZXQgY2hlY2tlcnMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXJyYXk6IGdldFR5cGVPZkNoZWNrZXIoJ0FycmF5JyksXG4gIGJvb2w6IGdldFR5cGVPZkNoZWNrZXIoJ0Jvb2xlYW4nKSxcbiAgbnVtYmVyOiBnZXRUeXBlT2ZDaGVja2VyKCdOdW1iZXInKSxcbiAgc3RyaW5nOiBnZXRUeXBlT2ZDaGVja2VyKCdTdHJpbmcnKSxcbiAgZnVuYzogZ2V0RnVuY3Rpb25DaGVja2VyKCksXG4gIG9iamVjdDogZ2V0T2JqZWN0Q2hlY2tlcigpLFxuXG4gIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gIG9uZU9mOiBvbmVPZkNoZWNrR2V0dGVyLFxuICBvbmVPZlR5cGU6IG9uZU9mVHlwZUNoZWNrR2V0dGVyLFxuXG4gIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgb2JqZWN0T2Y6IG9iamVjdE9mQ2hlY2tHZXR0ZXIsXG4gIHR5cGVPckFycmF5T2Y6IHR5cGVPckFycmF5T2ZDaGVja0dldHRlcixcblxuICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuICBhcmdzOiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5lYWNoKGNoZWNrZXJzLCBjaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIpO1xuXG5cbmZ1bmN0aW9uIGdldFR5cGVPZkNoZWNrZXIodHlwZSkge1xuICBjb25zdCBsVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiB0eXBlT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKHR5cGVPZih2YWwpICE9PSBsVHlwZSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbkNoZWNrZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnRnVuY3Rpb24nO1xuICBsZXQgZnVuY3Rpb25DaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGZ1bmN0aW9uQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xuXG4gIGZ1bmN0aW9uQ2hlY2tlci53aXRoUHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFdpdGhQcm9wZXJ0aWVzQ2hlY2tlcihwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXBpRXJyb3IgPSBjaGVja2Vycy5vYmplY3RPZihjaGVja2Vycy5mdW5jKShwcm9wZXJ0aWVzLCAncHJvcGVydGllcycsICdhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzJyk7XG4gICAgaWYgKGlzRXJyb3IoYXBpRXJyb3IpKSB7XG4gICAgICB0aHJvdyBhcGlFcnJvcjtcbiAgICB9XG4gICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJzLnNoYXBlKHByb3BlcnRpZXMsIHRydWUpO1xuICAgIHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhLnR5cGUgPSAnZnVuYy53aXRoUHJvcGVydGllcyc7XG5cbiAgICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGZ1bmN0aW9uV2l0aFByb3BlcnRpZXNDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IG5vdEZ1bmN0aW9uID0gY2hlY2tlcnMuZnVuYyh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKG5vdEZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gbm90RnVuY3Rpb247XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIH0sIHNoYXBlQ2hlY2tlci50eXBlLCAnZnVuYy53aXRoUHJvcGVydGllcycpO1xuICB9O1xuXG4gIGZ1bmN0aW9uQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWyd3aXRoUHJvcGVydGllcyddO1xuICByZXR1cm4gZnVuY3Rpb25DaGVja2VyO1xufVxuXG5mdW5jdGlvbiBnZXRPYmplY3RDaGVja2VyKCkge1xuICBjb25zdCB0eXBlID0gJ09iamVjdCc7XG4gIGNvbnN0IG51bGxUeXBlID0gJ09iamVjdCAobnVsbCBvayknO1xuICBsZXQgb2JqZWN0TnVsbE9rQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvYmplY3ROdWxsT2tDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKHR5cGVPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBudWxsVHlwZSk7XG4gICAgfVxuICB9LCBudWxsVHlwZSk7XG5cbiAgbGV0IG9iamVjdENoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0Q2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgaXNFcnJvcihvYmplY3ROdWxsT2tDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBvYmplY3RDaGVja2VyLnR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG5cbiAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuICBvYmplY3RDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ251bGxPayddO1xuXG4gIHJldHVybiBvYmplY3RDaGVja2VyO1xufVxuXG5cbmZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCEodmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgfVxuICB9LCBjbGFzc1RvQ2hlY2submFtZSk7XG59XG5cbmZ1bmN0aW9uIG9uZU9mQ2hlY2tHZXR0ZXIoZW51bXMpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2VudW0nfSxcbiAgICBlbnVtOiBlbnVtc1xuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgZW51bVske2VudW1zLm1hcChlbm0gPT4gSlNPTi5zdHJpbmdpZnkoZW5tKSkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvbmVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWVudW1zLnNvbWUoZW5tID0+IGVubSA9PT0gdmFsKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tHZXR0ZXIoY2hlY2tlcnMpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29uZU9mVHlwZSd9LFxuICAgIG9uZU9mVHlwZTogY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKSlcbiAgfTtcbiAgY29uc3QgY2hlY2tlcnNEaXNwbGF5ID0gY2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlR5cGVbJHtjaGVja2Vyc0Rpc3BsYXkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gIWlzRXJyb3IoY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnYXJyYXlPZid9LFxuICAgIGFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBhcnJheU9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5hcnJheSh2YWwpKSB8fCAhdmFsLmV2ZXJ5KChpdGVtKSA9PiAhaXNFcnJvcihjaGVja2VyKGl0ZW0pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICBvYmplY3RPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Y2hlY2tlckRpc3BsYXl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgbm90T2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIGlmIChpc0Vycm9yKG5vdE9iamVjdCkpIHtcbiAgICAgIHJldHVybiBub3RPYmplY3Q7XG4gICAgfVxuICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICBpZiAoaXNFcnJvcihjaGVja2VyKGl0ZW0sIGtleSwgbmFtZSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3R5cGVPckFycmF5T2YnfSxcbiAgICB0eXBlT3JBcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgdHlwZU9yQXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRTaGFwZUNoZWNrR2V0dGVyKCkge1xuICBmdW5jdGlvbiBzaGFwZUNoZWNrR2V0dGVyKHNoYXBlLCBub25PYmplY3QpIHtcbiAgICBsZXQgc2hhcGVUeXBlcyA9IHt9O1xuICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICBzaGFwZVR5cGVzW3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcik7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gdHlwZShvcHRpb25zID0ge30pIHtcbiAgICAgIGxldCByZXQgPSB7fTtcbiAgICAgIGNvbnN0IHt0ZXJzZSwgb2JqLCBhZGRIZWxwZXJzfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXJlbnRSZXF1aXJlZCA9IG9wdGlvbnMucmVxdWlyZWQ7XG4gICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIGNvbnN0IHNwZWNpZmllZCA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCk7XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkID0gdW5kZWYocGFyZW50UmVxdWlyZWQpID8gIWNoZWNrZXIuaXNPcHRpb25hbCA6IHBhcmVudFJlcXVpcmVkO1xuICAgICAgICBpZiAoIXRlcnNlIHx8IChzcGVjaWZpZWQgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkpIHtcbiAgICAgICAgICByZXRbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7dGVyc2UsIG9iajogb2JqICYmIG9ialtwcm9wXSwgcmVxdWlyZWQsIGFkZEhlbHBlcnN9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRkSGVscGVycykge1xuICAgICAgICAgIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgZnVuY3Rpb24gbW9kaWZ5VHlwZURpc3BsYXlUb0hlbHBPdXQocmV0LCBwcm9wLCBzcGVjaWZpZWQsIGNoZWNrZXIsIHJlcXVpcmVkKSB7XG4gICAgICAgIGlmICghc3BlY2lmaWVkICYmIHJlcXVpcmVkICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgICAgICBsZXQgaXRlbSA9ICdJVEVNJztcbiAgICAgICAgICBpZiAoY2hlY2tlci50eXBlICYmIGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkge1xuICAgICAgICAgICAgaXRlbSA9IGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZEhlbHBlcihcbiAgICAgICAgICAgICdtaXNzaW5nJywgJ01JU1NJTkcgVEhJUyAnICsgaXRlbSwgJyA8LS0gWU9VIEFSRSBNSVNTSU5HIFRISVMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcGVjaWZpZWQpIHtcbiAgICAgICAgICBsZXQgZXJyb3IgPSBjaGVja2VyKG9ialtwcm9wXSwgcHJvcCwgbnVsbCwgb2JqKTtcbiAgICAgICAgICBpZiAoaXNFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIGFkZEhlbHBlcignZXJyb3InLCAnVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UsICcgPC0tIFRISVMgSVMgVEhFIFBST0JMRU06ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRIZWxwZXIocHJvcGVydHksIG9iamVjdE1lc3NhZ2UsIHN0cmluZ01lc3NhZ2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJldFtwcm9wXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldFtwcm9wXSArPSBzdHJpbmdNZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbcHJvcF0uX19hcGlDaGVja0RhdGFbcHJvcGVydHldID0gb2JqZWN0TWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0eXBlLl9fYXBpQ2hlY2tEYXRhID0ge3N0cmljdDogZmFsc2UsIG9wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3NoYXBlJ307XG4gICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBzaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgIGxldCBpc09iamVjdCA9ICFub25PYmplY3QgJiYgY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3IoaXNPYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgIH1cbiAgICAgIGxldCBzaGFwZVByb3BFcnJvcjtcbiAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24gPyBsb2NhdGlvbiArIChuYW1lID8gJy8nIDogJycpIDogJyc7XG4gICAgICBuYW1lID0gbmFtZSB8fCAnJztcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgIHNoYXBlUHJvcEVycm9yID0gY2hlY2tlcih2YWxbcHJvcF0sIHByb3AsIGAke2xvY2F0aW9ufSR7bmFtZX1gLCB2YWwpO1xuICAgICAgICAgIHJldHVybiAhaXNFcnJvcihzaGFwZVByb3BFcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBzaGFwZVByb3BFcnJvcjtcbiAgICAgIH1cbiAgICB9LCB0eXBlLCAnc2hhcGUnKTtcblxuICAgIGZ1bmN0aW9uIHN0cmljdFR5cGUoKSB7XG4gICAgICByZXR1cm4gdHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhLnN0cmljdCA9IHRydWU7XG4gICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZUVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbG93ZWRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2hhcGUpO1xuICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCBzdHJpY3RUeXBlLCAnc3RyaWN0IHNoYXBlJyk7XG4gICAgc2hhcGVDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ3N0cmljdCddO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZUNoZWNrZXIpO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IGlmTm90Q2hlY2tlciA9IGZ1bmN0aW9uIGlmTm90Q2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCBpZk5vdENoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWZOb3RDaGVja2VyLnR5cGUgPSB0eXBlO1xuICAgIGlmTm90Q2hlY2tlci5zaG9ydFR5cGUgPSBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWA7XG4gICAgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKGlmTm90Q2hlY2tlcik7XG4gICAgcmV0dXJuIGlmTm90Q2hlY2tlcjtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICBsZXQgb25seUlmQ2hlY2tlciA9IGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgb25seUlmQ2hlY2tlci50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9ubHlJZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gICAgb25seUlmQ2hlY2tlci5zaG9ydFR5cGUgPSBgb25seUlmWyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihvbmx5SWZDaGVja2VyKTtcbiAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYXJndW1lbnRzQ2hlY2tlckdldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdmdW5jdGlvbiBhcmd1bWVudHMnO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm9iamVjdCh2YWwpKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm51bWJlcih2YWwubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYW55Q2hlY2tlckRlZmluaXRpb24oKSB7XG4gICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcbiAgfSwgJ2FueScpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9jaGVja2Vycy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFwaUNoZWNrLmpzIn0=