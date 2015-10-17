// apiCheck.js v6.0.7 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	
	    var passedArgs = args.length ? JSON.stringify(args, null, 2) : "nothing";
	    argTypes = args.length ? JSON.stringify(argTypes, null, 2) : "nothing";
	    apiTypes = apiTypes.length ? JSON.stringify(apiTypes, null, 2) : "nothing";
	    var n = "\n";
	    return ["You passed:" + n + "" + passedArgs, "With the types of:" + n + "" + argTypes, "The API calls for:" + n + "" + apiTypes].join(n + n);
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
	      argFailed = undefined;
	  /* jshint -W084 */
	  while (checker = api[checkerIndex++]) {
	    arg = args[argIndex++];
	    argName = "Argument " + argIndex + (checker.isOptional ? " (optional)" : "");
	    res = checker(arg, null, argName);
	    argFailed = isError(res);
	    lastChecker = checkerIndex >= api.length;
	    if (argFailed && (!checker.isOptional || lastChecker)) {
	      failed = true;
	      messages.push(getCheckerErrorMessage(res, checker, arg));
	    } else if (argFailed && checker.isOptional) {
	      argIndex--;
	    } else {
	      messages.push("" + t(argName) + " passed");
	    }
	  }
	  if (failed) {
	    return messages;
	  } else {
	    return [];
	  }
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
	          if (checker.type.__apiCheckData) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkZWQ2MWViZWNjNzU1ZTAyODY2MSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUErRCxZQUFZLENBQS9FLElBQUk7S0FBRSxPQUFPLEdBQXNELFlBQVksQ0FBekUsT0FBTztLQUFFLENBQUMsR0FBbUQsWUFBWSxDQUFoRSxDQUFDO0tBQUUsUUFBUSxHQUF5QyxZQUFZLENBQTdELFFBQVE7S0FBRSxpQkFBaUIsR0FBc0IsWUFBWSxDQUFuRCxpQkFBaUI7S0FBRSxNQUFNLEdBQWMsWUFBWSxDQUFoQyxNQUFNO0tBQUUsUUFBUSxHQUFJLFlBQVksQ0FBeEIsUUFBUTs7QUFDdEUsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxtQkFBWSxDQUFDLENBQUM7QUFDdkMsS0FBTSxnQkFBZ0IsR0FBRyxt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LFFBQVEsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELE1BQU07QUFDTCxnQkFBTyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQ7TUFDRixDQUFDOztBQUVGLGtCQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUMxQixrQkFBYSxDQUFDLFNBQVMsZUFBYSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFHLENBQUM7QUFDN0QsbUJBQWMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsWUFBTyxhQUFhLENBQUM7SUFDdEIsQ0FBQzs7QUFFRixVQUFPLGdCQUFnQixDQUFDO0VBQ3pCOztBQUVELFVBQVMsc0JBQXNCLEdBQUc7QUFDaEMsT0FBTSxJQUFJLEdBQUcsb0JBQW9CLENBQUM7QUFDbEMsVUFBTyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDeEYsU0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7QUFDL0YsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN2QztJQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDVjs7QUFFRCxVQUFTLGNBQWMsR0FBRztBQUN4QixVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxvQkFBb0IsR0FBRyxFQUVyRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQ1giLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZGVkNjFlYmVjYzc1NWUwMjg2NjFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwiY29uc3QgYXBpQ2hlY2tVdGlsID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtlYWNoLCBpc0Vycm9yLCB0LCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZiwgZ2V0RXJyb3J9ID0gYXBpQ2hlY2tVdGlsO1xuY29uc3QgY2hlY2tlcnMgPSByZXF1aXJlKCcuL2NoZWNrZXJzJyk7XG5jb25zdCBhcGlDaGVja0FwaUNoZWNrID0gZ2V0QXBpQ2hlY2tJbnN0YW5jZSh7XG4gIG91dHB1dDoge3ByZWZpeDogJ2FwaUNoZWNrJ31cbn0pO1xuY29uc3QgY2hlY2tlckZuQ2hlY2tlciA9IGNoZWNrZXJzLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICB0eXBlOiBjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXJzLnN0cmluZywgY2hlY2tlclR5cGVUeXBlXSkub3B0aW9uYWwsXG4gIGRpc3BsYXlOYW1lOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gIHNob3J0VHlwZTogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsLFxuICBub3RPcHRpb25hbDogY2hlY2tlcnMuYm9vbC5vcHRpb25hbCxcbiAgY2hpbGRyZW5DaGVja2VyczogY2hlY2tlcnMuYXJyYXlPZihjaGVja2Vycy5zdHJpbmcpLm9wdGlvbmFsXG59KTtcblxuY29uc3QgZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzID0gW1xuICBjaGVja2Vycy5zaGFwZSh7XG4gICAgb3V0cHV0OiBjaGVja2Vycy5zaGFwZSh7XG4gICAgICBwcmVmaXg6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbFxuICAgIH0pXG4gIH0pLFxuICBjaGVja2Vycy5vYmplY3RPZihjaGVja2VyRm5DaGVja2VyKS5vcHRpb25hbFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRBcGlDaGVja0luc3RhbmNlO1xubW9kdWxlLmV4cG9ydHMuaW50ZXJuYWxDaGVja2VyID0gYXBpQ2hlY2tBcGlDaGVjaztcbm1vZHVsZS5leHBvcnRzLnV0aWxzID0gYXBpQ2hlY2tVdGlsO1xuXG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2tJbnN0YW5jZShjb25maWcgPSB7fSwgZXh0cmFDaGVja2VycyA9IHt9KSB7XG4gIGlmIChhcGlDaGVja0FwaUNoZWNrICYmIGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBhcGlDaGVja0FwaUNoZWNrLnRocm93KGdldEFwaUNoZWNrSW5zdGFuY2VDaGVja2VycywgYXJndW1lbnRzLCB7XG4gICAgICBwcmVmaXg6ICdjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBhcGlDaGVjaydcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICBsZXQgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7XG4gICAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICAgIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcbiAgICBkaXNhYmxlOiAoKSA9PiBkaXNhYmxlZCA9IHRydWUsXG4gICAgZW5hYmxlOiAoKSA9PiBkaXNhYmxlZCA9IGZhbHNlLFxuICAgIGdldEVycm9yTWVzc2FnZSxcbiAgICBoYW5kbGVFcnJvck1lc3NhZ2UsXG4gICAgY29uZmlnOiB7XG4gICAgICBvdXRwdXQ6IGNvbmZpZy5vdXRwdXQgfHwge1xuICAgICAgICBwcmVmaXg6ICcnLFxuICAgICAgICBzdWZmaXg6ICcnLFxuICAgICAgICBkb2NzQmFzZVVybDogJydcbiAgICAgIH0sXG4gICAgICB2ZXJib3NlOiBjb25maWcudmVyYm9zZSB8fCBmYWxzZVxuICAgIH0sXG4gICAgdXRpbHM6IGFwaUNoZWNrVXRpbFxuICB9O1xuXG4gIGVhY2goYWRkaXRpb25hbFByb3BlcnRpZXMsICh3cmFwcGVyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IHdyYXBwZXIpO1xuICBlYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyKTtcbiAgZWFjaChleHRyYUNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gYXBpQ2hlY2tbbmFtZV0gPSBjaGVja2VyKTtcblxuICByZXR1cm4gYXBpQ2hlY2s7XG5cblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgaW5zdGFuY2UgZnVuY3Rpb24uIE90aGVyIHRoaW5ncyBhcmUgYXR0YWNoZWQgdG8gdGhpcyBzZWUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGFib3ZlLlxuICAgKiBAcGFyYW0gYXBpIHtBcnJheX1cbiAgICogQHBhcmFtIGFyZ3Mge2FyZ3VtZW50c31cbiAgICogQHBhcmFtIG91dHB1dCB7T2JqZWN0fVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIGlmIHRoaXMgaGFzIGEgZmFpbGVkID0gdHJ1ZSBwcm9wZXJ0eSwgdGhlbiBpdCBmYWlsZWRcbiAgICovXG4gIGZ1bmN0aW9uIGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6OCAqL1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXBpVHlwZXM6IHt9LCBhcmdUeXBlczoge30sXG4gICAgICAgIHBhc3NlZDogdHJ1ZSwgbWVzc2FnZTogJycsXG4gICAgICAgIGZhaWxlZDogZmFsc2VcbiAgICAgIH07IC8vIGVtcHR5IHZlcnNpb24gb2Ygd2hhdCBpcyBub3JtYWxseSByZXR1cm5lZFxuICAgIH1cbiAgICBjaGVja0FwaUNoZWNrQXBpKGFyZ3VtZW50cyk7XG4gICAgY29uc3QgYXJyYXlBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgbGV0IG1lc3NhZ2VzO1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgbGV0IGVub3VnaEFyZ3MgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcnJheUFyZ3MpO1xuICAgIGlmIChlbm91Z2hBcmdzLmxlbmd0aCkge1xuICAgICAgbWVzc2FnZXMgPSBlbm91Z2hBcmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlcyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcnJheUFyZ3MpO1xuICAgIH1cbiAgICBsZXQgcmV0dXJuT2JqZWN0ID0gZ2V0VHlwZXMoYXBpLCBhcnJheUFyZ3MpO1xuICAgIGlmIChtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gYXBpQ2hlY2suZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJyYXlBcmdzLCBtZXNzYWdlcywgb3V0cHV0KTtcbiAgICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9ICcnO1xuICAgICAgcmV0dXJuT2JqZWN0LnBhc3NlZCA9IHRydWU7XG4gICAgICByZXR1cm5PYmplY3QuZmFpbGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3Q7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0FwaUNoZWNrQXBpKGFyZ3MpIHtcbiAgICBjb25zdCBvcyA9IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbDtcbiAgICBjb25zdCBhcGkgPSBbIC8vIGRvZyBmb29kaW5nIGhlcmVcbiAgICAgIGNoZWNrZXJzLnR5cGVPckFycmF5T2YoY2hlY2tlckZuQ2hlY2tlciksXG4gICAgICBjaGVja2Vycy5vbmVPZlR5cGUoW1xuICAgICAgICBjaGVja2Vycy5hcmdzLCBjaGVja2Vycy5hcnJheVxuICAgICAgXSksXG4gICAgICBjaGVja2Vycy5zaGFwZSh7XG4gICAgICAgIHByZWZpeDogb3MsIHN1ZmZpeDogb3MsIHVybFN1ZmZpeDogb3MsIC8vIGFwcGVuZGVkIGNhc2VcbiAgICAgICAgb25seVByZWZpeDogb3MsIG9ubHlTdWZmaXg6IG9zLCB1cmw6IG9zIC8vIG92ZXJyaWRlIGNhc2VcbiAgICAgIH0pLnN0cmljdC5vcHRpb25hbFxuICAgIF07XG4gICAgbGV0IGVycm9ycyA9IGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpO1xuICAgIGlmICghZXJyb3JzLmxlbmd0aCkge1xuICAgICAgZXJyb3JzID0gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgbWVzc2FnZSA9IGFwaUNoZWNrLmdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIGVycm9ycywge1xuICAgICAgICBwcmVmaXg6ICdhcGlDaGVjaydcbiAgICAgIH0pO1xuICAgICAgYXBpQ2hlY2suaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHRydWUpO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ2V0QXBpQ2hlY2soc2hvdWxkVGhyb3cpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYXBpQ2hlY2tXcmFwcGVyKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gICAgICBsZXQgcmVzdWx0ID0gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpO1xuICAgICAgYXBpQ2hlY2suaGFuZGxlRXJyb3JNZXNzYWdlKHJlc3VsdC5tZXNzYWdlLCBzaG91bGRUaHJvdyk7XG4gICAgICByZXR1cm4gcmVzdWx0OyAvLyB3b250IGdldCBoZXJlIGlmIGFuIGVycm9yIGlzIHRocm93blxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgICBpZiAoc2hvdWxkVGhyb3cgJiYgbWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIG1lc3NhZ2VzID0gW10sIG91dHB1dCA9IHt9KSB7XG4gICAgbGV0IGdPdXQgPSBhcGlDaGVjay5jb25maWcub3V0cHV0IHx8IHt9O1xuICAgIGxldCBwcmVmaXggPSBnZXRQcmVmaXgoKTtcbiAgICBsZXQgc3VmZml4ID0gZ2V0U3VmZml4KCk7XG4gICAgbGV0IHVybCA9IGdldFVybCgpO1xuICAgIGxldCBtZXNzYWdlID0gYGFwaUNoZWNrIGZhaWxlZCEgJHttZXNzYWdlcy5qb2luKCcsICcpfWA7XG4gICAgdmFyIHBhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWQgPSAnXFxuXFxuJyArIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncyk7XG4gICAgcmV0dXJuIGAke3ByZWZpeH0gJHttZXNzYWdlfSAke3N1ZmZpeH0gJHt1cmwgfHwgJyd9JHtwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkfWAudHJpbSgpO1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xuICAgICAgbGV0IHByZWZpeCA9IG91dHB1dC5vbmx5UHJlZml4O1xuICAgICAgaWYgKCFwcmVmaXgpIHtcbiAgICAgICAgcHJlZml4ID0gYCR7Z091dC5wcmVmaXggfHwgJyd9ICR7b3V0cHV0LnByZWZpeCB8fCAnJ31gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3VmZml4KCkge1xuICAgICAgbGV0IHN1ZmZpeCA9IG91dHB1dC5vbmx5U3VmZml4O1xuICAgICAgaWYgKCFzdWZmaXgpIHtcbiAgICAgICAgc3VmZml4ID0gYCR7b3V0cHV0LnN1ZmZpeCB8fCAnJ30gJHtnT3V0LnN1ZmZpeCB8fCAnJ31gLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWZmaXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VXJsKCkge1xuICAgICAgbGV0IHVybCA9IG91dHB1dC51cmw7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSBnT3V0LmRvY3NCYXNlVXJsICYmIG91dHB1dC51cmxTdWZmaXggJiYgYCR7Z091dC5kb2NzQmFzZVVybH0ke291dHB1dC51cmxTdWZmaXh9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncykge1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICAgIGxldCB7YXBpVHlwZXMsIGFyZ1R5cGVzfSA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gICAgY29uc3QgcGFzc2VkQXJncyA9IGFyZ3MubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoYXJncywgbnVsbCwgMikgOiAnbm90aGluZyc7XG4gICAgYXJnVHlwZXMgPSBhcmdzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFyZ1R5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgICBhcGlUeXBlcyA9IGFwaVR5cGVzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFwaVR5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgICBjb25zdCBuID0gJ1xcbic7XG4gICAgcmV0dXJuIFtcbiAgICAgIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9YCxcbiAgICAgIGBXaXRoIHRoZSB0eXBlcyBvZjoke259JHthcmdUeXBlc31gLFxuICAgICAgYFRoZSBBUEkgY2FsbHMgZm9yOiR7bn0ke2FwaVR5cGVzfWBcbiAgICBdLmpvaW4obiArIG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZXMoYXBpLCBhcmdzKSB7XG4gICAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgICBhcmdzID0gYXJyYXlpZnkoYXJncyk7XG4gICAgbGV0IGFwaVR5cGVzID0gYXBpLm1hcCgoY2hlY2tlciwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7dGVyc2U6ICFhcGlDaGVjay5jb25maWcudmVyYm9zZSwgb2JqOiBhcmdzW2luZGV4XSwgYWRkSGVscGVyczogdHJ1ZX0pO1xuICAgIH0pO1xuICAgIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKGdldEFyZ0Rpc3BsYXkpO1xuICAgIHJldHVybiB7YXJnVHlwZXM6IGFyZ1R5cGVzLCBhcGlUeXBlc307XG4gIH1cblxufVxuXG5cbi8vIFNUQVRFTEVTUyBGVU5DVElPTlNcblxuLyoqXG4gKiBUaGlzIGlzIHdoZXJlIHRoZSBtYWdpYyBoYXBwZW5zIGZvciBhY3R1YWxseSBjaGVja2luZyB0aGUgYXJndW1lbnRzIHdpdGggdGhlIGFwaS5cbiAqIEBwYXJhbSBhcGkge0FycmF5fSAtIGNoZWNrZXJzXG4gKiBAcGFyYW0gYXJncyB7QXJyYXl9IC0gYW5kIGFyZ3VtZW50cyBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzLCBsYXN0Q2hlY2tlciwgYXJnTmFtZSwgYXJnRmFpbGVkO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUgKGNoZWNrZXIgPSBhcGlbY2hlY2tlckluZGV4KytdKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICBhcmdOYW1lID0gJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCBudWxsLCBhcmdOYW1lKTtcbiAgICBhcmdGYWlsZWQgPSBpc0Vycm9yKHJlcyk7XG4gICAgbGFzdENoZWNrZXIgPSBjaGVja2VySW5kZXggPj0gYXBpLmxlbmd0aDtcbiAgICBpZiAoYXJnRmFpbGVkICYmICghY2hlY2tlci5pc09wdGlvbmFsIHx8IGxhc3RDaGVja2VyKSkge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VzLnB1c2goZ2V0Q2hlY2tlckVycm9yTWVzc2FnZShyZXMsIGNoZWNrZXIsIGFyZykpO1xuICAgIH0gZWxzZSBpZiAoYXJnRmFpbGVkICYmIGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgYXJnSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMucHVzaChgJHt0KGFyZ05hbWUpfSBwYXNzZWRgKTtcbiAgICB9XG4gIH1cbiAgaWYgKGZhaWxlZCkge1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuXG5jaGVja2VyVHlwZVR5cGUudHlwZSA9ICdmdW5jdGlvbiB3aXRoIF9fYXBpQ2hlY2tEYXRhIHByb3BlcnR5IGFuZCBgJHtmdW5jdGlvbi50eXBlfWAgcHJvcGVydHknO1xuZnVuY3Rpb24gY2hlY2tlclR5cGVUeXBlKGNoZWNrZXJUeXBlLCBuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCBhcGlDaGVja0RhdGFDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUoe1xuICAgIHR5cGU6IGNoZWNrZXJzLnN0cmluZyxcbiAgICBvcHRpb25hbDogY2hlY2tlcnMuYm9vbFxuICB9KTtcbiAgY29uc3QgYXNGdW5jID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7X19hcGlDaGVja0RhdGE6IGFwaUNoZWNrRGF0YUNoZWNrZXJ9KTtcbiAgY29uc3QgYXNTaGFwZSA9IGNoZWNrZXJzLnNoYXBlKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCB3cm9uZ1NoYXBlID0gY2hlY2tlcnMub25lT2ZUeXBlKFtcbiAgICBhc0Z1bmMsIGFzU2hhcGVcbiAgXSkoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKTtcbiAgaWYgKGlzRXJyb3Iod3JvbmdTaGFwZSkpIHtcbiAgICByZXR1cm4gd3JvbmdTaGFwZTtcbiAgfVxuICBpZiAodHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnZnVuY3Rpb24nICYmICFjaGVja2VyVHlwZS5oYXNPd25Qcm9wZXJ0eShjaGVja2VyVHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlKSkge1xuICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGVUeXBlLnR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCB2YWwpIHtcbiAgbGV0IGNoZWNrZXJIZWxwID0gZ2V0Q2hlY2tlckhlbHAoY2hlY2tlciwgdmFsKTtcbiAgY2hlY2tlckhlbHAgPSBjaGVja2VySGVscCA/ICcgLSAnICsgY2hlY2tlckhlbHAgOiAnJztcbiAgcmV0dXJuIHJlcy5tZXNzYWdlICsgY2hlY2tlckhlbHA7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJIZWxwKHtoZWxwfSwgdmFsKSB7XG4gIGlmICghaGVscCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodHlwZW9mIGhlbHAgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoZWxwID0gaGVscCh2YWwpO1xuICB9XG4gIHJldHVybiBoZWxwO1xufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IHJlcXVpcmVkQXJncyA9IGFwaS5maWx0ZXIoYSA9PiAhYS5pc09wdGlvbmFsKTtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWRBcmdzLmxlbmd0aCkge1xuICAgIHJldHVybiBbXG4gICAgICAnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxudmFyIGVhY2hhYmxlID0ge1xuICBPYmplY3Q6IGdldERpc3BsYXksXG4gIEFycmF5OiBnZXREaXNwbGF5XG59O1xuXG5mdW5jdGlvbiBnZXREaXNwbGF5KG9iaikge1xuICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuICBlYWNoKG9iaiwgKHYsIGspID0+IGFyZ0Rpc3BsYXlba10gPSBnZXRBcmdEaXNwbGF5KHYpKTtcbiAgcmV0dXJuIGFyZ0Rpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIGdldEFyZ0Rpc3BsYXkoYXJnKSB7XG4gIHZhciBjTmFtZSA9IGFyZyAmJiBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gIHJldHVybiBjTmFtZSA/IGVhY2hhYmxlW2NOYW1lXSA/IGVhY2hhYmxlW2NOYW1lXShhcmcpIDogY05hbWUgOiBhcmcgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlT2YoYXJnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrLmpzXG4gKiovIiwiY29uc3QgY2hlY2tlckhlbHBlcnMgPSB7XG4gIG1ha2VPcHRpb25hbCwgd3JhcEluU3BlY2lmaWVkLCBzZXR1cENoZWNrZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlYWNoLCBjb3B5LCB0eXBlT2YsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgaXNFcnJvciwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIHVuZGVmLCBjaGVja2VySGVscGVyc1xufTtcblxuZnVuY3Rpb24gY29weShvYmopIHtcbiAgbGV0IHR5cGUgPSB0eXBlT2Yob2JqKTtcbiAgbGV0IGRhQ29weTtcbiAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICBkYUNvcHkgPSBbXTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGRhQ29weSA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4ge1xuICAgIGRhQ29weVtrZXldID0gdmFsOyAvLyBjYW5ub3Qgc2luZ2xlLWxpbmUgdGhpcyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYWJvcnQgdGhlIGVhY2hcbiAgfSk7XG4gIHJldHVybiBkYUNvcHk7XG59XG5cblxuZnVuY3Rpb24gdHlwZU9mKG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIG9wdGlvbnMpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTcgKi9cbiAgbGV0IGRpc3BsYXk7XG4gIGxldCBzaG9ydCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zaG9ydDtcbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgZGlzcGxheSA9IGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0JyB8fCBjaGVja2VyLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lO1xuICB9XG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyVHlwZSh7dHlwZX0sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IF9fYXBpQ2hlY2tEYXRhID0gdHlwZS5fX2FwaUNoZWNrRGF0YTtcbiAgICBsZXQgdHlwZVR5cGVzID0gdHlwZShvcHRpb25zKTtcbiAgICB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGEsXG4gICAgICBbX19hcGlDaGVja0RhdGEudHlwZV06IHR5cGVUeXBlc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogSlNPTi5zdHJpbmdpZnkoY2hlY2tlclR5cGUpO1xuICByZXR1cm4gbmV3IEVycm9yKGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBtdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbn1cblxuZnVuY3Rpb24gbkF0TChuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCB0TmFtZSA9IHQobmFtZSB8fCAndmFsdWUnKTtcbiAgbGV0IHRMb2NhdGlvbiA9ICFsb2NhdGlvbiA/ICcnIDogJyBhdCAnICsgdChsb2NhdGlvbik7XG4gIHJldHVybiBgJHt0TmFtZX0ke3RMb2NhdGlvbn1gO1xufVxuXG5mdW5jdGlvbiB0KHRoaW5nKSB7XG4gIHJldHVybiAnYCcgKyB0aGluZyArICdgJztcbn1cblxuZnVuY3Rpb24gdW5kZWYodGhpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuXG5cbmZ1bmN0aW9uIG1ha2VPcHRpb25hbChjaGVja2VyKSB7XG4gIGNoZWNrZXIub3B0aW9uYWwgPSBmdW5jdGlvbiBvcHRpb25hbENoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICghdW5kZWYodmFsKSkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH07XG4gIGNoZWNrZXIub3B0aW9uYWwuaXNPcHRpb25hbCA9IHRydWU7XG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgY2hlY2tlci5vcHRpb25hbC5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWU7XG4gIGlmICh0eXBlb2YgY2hlY2tlci5vcHRpb25hbC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNvcHkoY2hlY2tlci5vcHRpb25hbC50eXBlKTsgLy8gbWFrZSBvdXIgb3duIGNvcHkgb2YgdGhpc1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGVja2VyLnR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSArPSAnIChvcHRpb25hbCknO1xuICAgIHJldHVybjtcbiAgfVxuICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkgfHwge307IC8vIGFuZCB0aGlzXG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG59XG5cblxuZnVuY3Rpb24gd3JhcEluU3BlY2lmaWVkKGZuLCB0eXBlLCBzaG9ydFR5cGUpIHtcbiAgZm4udHlwZSA9IHR5cGU7XG4gIGZuLnNob3J0VHlwZSA9IHNob3J0VHlwZTtcbiAgZnVuY3Rpb24gc3BlY2lmaWVkQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBjb25zdCB1ID0gdW5kZWYodmFsKTtcbiAgICBpZiAodSAmJiAhZm4uaXNPcHRpb25hbCkge1xuICAgICAgbGV0IHRMb2NhdGlvbiA9IGxvY2F0aW9uID8gYCBpbiAke3QobG9jYXRpb24pfWAgOiAnJztcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDaGVja2VyRGlzcGxheShmbiwge3Nob3J0OiB0cnVlfSk7XG4gICAgICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIHR5cGUgIT09ICdvYmplY3QnID8gdHlwZSA6IEpTT04uc3RyaW5naWZ5KHR5cGUpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihgUmVxdWlyZWQgJHt0KG5hbWUpfSBub3Qgc3BlY2lmaWVkJHt0TG9jYXRpb259LiBNdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9XG4gIHNwZWNpZmllZENoZWNrZXIudHlwZSA9IGZuLnR5cGU7XG4gIHNwZWNpZmllZENoZWNrZXIuc2hvcnRUeXBlID0gZm4uc2hvcnRUeXBlO1xuICBzcGVjaWZpZWRDaGVja2VyLm5vdE9wdGlvbmFsID0gZm4ubm90T3B0aW9uYWw7XG4gIHNwZWNpZmllZENoZWNrZXIuY2hpbGRyZW5DaGVja2VycyA9IGZuLmNoaWxkcmVuQ2hlY2tlcnM7XG4gIHNldHVwQ2hlY2tlcihzcGVjaWZpZWRDaGVja2VyKTtcbiAgc2V0dXBDaGVja2VyKGZuKTtcbiAgcmV0dXJuIHNwZWNpZmllZENoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIHNldHVwQ2hlY2tlcihjaGVja2VyKSB7XG4gIGNoZWNrZXIuZGlzcGxheU5hbWUgPSBgYXBpQ2hlY2sgJHt0KGNoZWNrZXIuc2hvcnRUeXBlIHx8IGNoZWNrZXIudHlwZSB8fCBjaGVja2VyLm5hbWUpfSB0eXBlIGNoZWNrZXJgO1xuICBpZiAoIWNoZWNrZXIubm90T3B0aW9uYWwpIHtcbiAgICBtYWtlT3B0aW9uYWwoY2hlY2tlcik7XG4gIH1cbiAgZWFjaChjaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMsIGNoaWxkTmFtZSA9PiB7XG4gICAgc2V0dXBDaGVja2VyKGNoZWNrZXJbY2hpbGROYW1lXSk7XG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2tVdGlsLmpzXG4gKiovIiwiY29uc3Qge1xuICB0eXBlT2YsIGVhY2gsIGNvcHksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLFxuICBhcnJheWlmeSwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIGNoZWNrZXJIZWxwZXJzLFxuICB1bmRlZlxuICB9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5OiBnZXRUeXBlT2ZDaGVja2VyKCdBcnJheScpLFxuICBib29sOiBnZXRUeXBlT2ZDaGVja2VyKCdCb29sZWFuJyksXG4gIG51bWJlcjogZ2V0VHlwZU9mQ2hlY2tlcignTnVtYmVyJyksXG4gIHN0cmluZzogZ2V0VHlwZU9mQ2hlY2tlcignU3RyaW5nJyksXG4gIGZ1bmM6IGdldEZ1bmN0aW9uQ2hlY2tlcigpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgc2hhcGU6IGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSxcbiAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gIGFueTogYW55Q2hlY2tHZXR0ZXIoKVxufTtcblxuZWFjaChjaGVja2VycywgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKTtcblxuXG5mdW5jdGlvbiBnZXRUeXBlT2ZDaGVja2VyKHR5cGUpIHtcbiAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gdHlwZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb25DaGVja2VyKCkge1xuICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcblxuICBmdW5jdGlvbkNoZWNrZXIud2l0aFByb3BlcnRpZXMgPSBmdW5jdGlvbiBnZXRXaXRoUHJvcGVydGllc0NoZWNrZXIocHJvcGVydGllcykge1xuICAgIGNvbnN0IGFwaUVycm9yID0gY2hlY2tlcnMub2JqZWN0T2YoY2hlY2tlcnMuZnVuYykocHJvcGVydGllcywgJ3Byb3BlcnRpZXMnLCAnYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcycpO1xuICAgIGlmIChpc0Vycm9yKGFwaUVycm9yKSkge1xuICAgICAgdGhyb3cgYXBpRXJyb3I7XG4gICAgfVxuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZShwcm9wZXJ0aWVzLCB0cnVlKTtcbiAgICBzaGFwZUNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlID0gJ2Z1bmMud2l0aFByb3BlcnRpZXMnO1xuXG4gICAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBmdW5jdGlvbldpdGhQcm9wZXJ0aWVzQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBjb25zdCBub3RGdW5jdGlvbiA9IGNoZWNrZXJzLmZ1bmModmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihub3RGdW5jdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZ1bmN0aW9uO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICB9LCBzaGFwZUNoZWNrZXIudHlwZSwgJ2Z1bmMud2l0aFByb3BlcnRpZXMnKTtcbiAgfTtcblxuICBmdW5jdGlvbkNoZWNrZXIuY2hpbGRyZW5DaGVja2VycyA9IFsnd2l0aFByb3BlcnRpZXMnXTtcbiAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0Q2hlY2tlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgbGV0IG9iamVjdE51bGxPa0NoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0TnVsbE9rQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgIH1cbiAgfSwgbnVsbFR5cGUpO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xuXG4gIG9iamVjdENoZWNrZXIubnVsbE9rID0gb2JqZWN0TnVsbE9rQ2hlY2tlcjtcbiAgb2JqZWN0Q2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWydudWxsT2snXTtcblxuICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcbn1cblxuXG5mdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaykpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2xhc3NUb0NoZWNrLm5hbWUpO1xuICAgIH1cbiAgfSwgY2xhc3NUb0NoZWNrLm5hbWUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgZW51bTogZW51bXNcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYGVudW1bJHtlbnVtcy5tYXAoZW5tID0+IEpTT04uc3RyaW5naWZ5KGVubSkpLmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrR2V0dGVyKGNoZWNrZXJzKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdvbmVPZlR5cGUnfSxcbiAgICBvbmVPZlR5cGU6IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcikpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJzRGlzcGxheSA9IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSkpO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZUeXBlWyR7Y2hlY2tlcnNEaXNwbGF5LmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghY2hlY2tlcnMuc29tZShjaGVja2VyID0+ICFpc0Vycm9yKGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICBhcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgYXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFycmF5T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29iamVjdE9mJ30sXG4gICAgb2JqZWN0T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvYmplY3RPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGNvbnN0IG5vdE9iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICBpZiAoaXNFcnJvcihub3RPYmplY3QpKSB7XG4gICAgICByZXR1cm4gbm90T2JqZWN0O1xuICAgIH1cbiAgICBjb25zdCBhbGxUeXBlc1N1Y2Nlc3MgPSBlYWNoKHZhbCwgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPckFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICd0eXBlT3JBcnJheU9mJ30sXG4gICAgdHlwZU9yQXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYHR5cGVPckFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiB0eXBlT3JBcnJheU9mRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXIsIGNoZWNrZXJzLmFycmF5T2YoY2hlY2tlcildKSh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSwgbm9uT2JqZWN0KSB7XG4gICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgc2hhcGVUeXBlc1twcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICBsZXQgcmV0ID0ge307XG4gICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGFyZW50UmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBjb25zdCBzcGVjaWZpZWQgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApO1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IHVuZGVmKHBhcmVudFJlcXVpcmVkKSA/ICFjaGVja2VyLmlzT3B0aW9uYWwgOiBwYXJlbnRSZXF1aXJlZDtcbiAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgcmV0W3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3RlcnNlLCBvYmo6IG9iaiAmJiBvYmpbcHJvcF0sIHJlcXVpcmVkLCBhZGRIZWxwZXJzfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgIGZ1bmN0aW9uIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSAnSVRFTSc7XG4gICAgICAgICAgaWYgKGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkge1xuICAgICAgICAgICAgaXRlbSA9IGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZEhlbHBlcihcbiAgICAgICAgICAgICdtaXNzaW5nJywgJ01JU1NJTkcgVEhJUyAnICsgaXRlbSwgJyA8LS0gWU9VIEFSRSBNSVNTSU5HIFRISVMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcGVjaWZpZWQpIHtcbiAgICAgICAgICBsZXQgZXJyb3IgPSBjaGVja2VyKG9ialtwcm9wXSwgcHJvcCwgbnVsbCwgb2JqKTtcbiAgICAgICAgICBpZiAoaXNFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIGFkZEhlbHBlcignZXJyb3InLCAnVEhJUyBJUyBUSEUgUFJPQkxFTTogJyArIGVycm9yLm1lc3NhZ2UsICcgPC0tIFRISVMgSVMgVEhFIFBST0JMRU06ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRIZWxwZXIocHJvcGVydHksIG9iamVjdE1lc3NhZ2UsIHN0cmluZ01lc3NhZ2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJldFtwcm9wXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldFtwcm9wXSArPSBzdHJpbmdNZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRbcHJvcF0uX19hcGlDaGVja0RhdGFbcHJvcGVydHldID0gb2JqZWN0TWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0eXBlLl9fYXBpQ2hlY2tEYXRhID0ge3N0cmljdDogZmFsc2UsIG9wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3NoYXBlJ307XG4gICAgbGV0IHNoYXBlQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBzaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgIGxldCBpc09iamVjdCA9ICFub25PYmplY3QgJiYgY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3IoaXNPYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgIH1cbiAgICAgIGxldCBzaGFwZVByb3BFcnJvcjtcbiAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24gPyBsb2NhdGlvbiArIChuYW1lID8gJy8nIDogJycpIDogJyc7XG4gICAgICBuYW1lID0gbmFtZSB8fCAnJztcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgIHNoYXBlUHJvcEVycm9yID0gY2hlY2tlcih2YWxbcHJvcF0sIHByb3AsIGAke2xvY2F0aW9ufSR7bmFtZX1gLCB2YWwpO1xuICAgICAgICAgIHJldHVybiAhaXNFcnJvcihzaGFwZVByb3BFcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBzaGFwZVByb3BFcnJvcjtcbiAgICAgIH1cbiAgICB9LCB0eXBlLCAnc2hhcGUnKTtcblxuICAgIGZ1bmN0aW9uIHN0cmljdFR5cGUoKSB7XG4gICAgICByZXR1cm4gdHlwZSguLi5hcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhLnN0cmljdCA9IHRydWU7XG4gICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZUVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbG93ZWRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2hhcGUpO1xuICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCBzdHJpY3RUeXBlLCAnc3RyaWN0IHNoYXBlJyk7XG4gICAgc2hhcGVDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ3N0cmljdCddO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZUNoZWNrZXIpO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IGlmTm90Q2hlY2tlciA9IGZ1bmN0aW9uIGlmTm90Q2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCBpZk5vdENoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWZOb3RDaGVja2VyLnR5cGUgPSB0eXBlO1xuICAgIGlmTm90Q2hlY2tlci5zaG9ydFR5cGUgPSBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWA7XG4gICAgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKGlmTm90Q2hlY2tlcik7XG4gICAgcmV0dXJuIGlmTm90Q2hlY2tlcjtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICBsZXQgb25seUlmQ2hlY2tlciA9IGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgb25seUlmQ2hlY2tlci50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9ubHlJZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gICAgb25seUlmQ2hlY2tlci5zaG9ydFR5cGUgPSBgb25seUlmWyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihvbmx5SWZDaGVja2VyKTtcbiAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYXJndW1lbnRzQ2hlY2tlckdldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdmdW5jdGlvbiBhcmd1bWVudHMnO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm9iamVjdCh2YWwpKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm51bWJlcih2YWwubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYW55Q2hlY2tlckRlZmluaXRpb24oKSB7XG4gICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcbiAgfSwgJ2FueScpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9jaGVja2Vycy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFwaUNoZWNrLmpzIn0=