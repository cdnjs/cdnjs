// apiCheck.js v6.0.2 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	      return "";
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
	    }
	    return returnObject;
	  }
	
	  function checkApiCheckApi(args) {
	    var os = checkers.string.optional;
	    var api = [// dog fooding here
	    checkers.typeOrArrayOf(checkerFnChecker), checkers.args, checkers.shape({
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
	      argName = undefined;
	  /* jshint -W084 */
	  while (checker = api[checkerIndex++]) {
	    arg = args[argIndex++];
	    argName = "Argument " + argIndex + (checker.isOptional ? " (optional)" : "");
	    res = checker(arg, null, argName);
	    lastChecker = checkerIndex >= api.length;
	    if (isError(res) && (!checker.isOptional || lastChecker)) {
	      failed = true;
	      messages.push(getCheckerErrorMessage(res, checker, arg));
	    } else if (checker.isOptional) {
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
	          var error = checker(obj[prop]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMjNmZTQwZWUwYmJjMDE3NmIyMyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUErRCxZQUFZLENBQS9FLElBQUk7S0FBRSxPQUFPLEdBQXNELFlBQVksQ0FBekUsT0FBTztLQUFFLENBQUMsR0FBbUQsWUFBWSxDQUFoRSxDQUFDO0tBQUUsUUFBUSxHQUF5QyxZQUFZLENBQTdELFFBQVE7S0FBRSxpQkFBaUIsR0FBc0IsWUFBWSxDQUFuRCxpQkFBaUI7S0FBRSxNQUFNLEdBQWMsWUFBWSxDQUFoQyxNQUFNO0tBQUUsUUFBUSxHQUFJLFlBQVksQ0FBeEIsUUFBUTs7QUFDdEUsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxtQkFBWSxDQUFDLENBQUM7QUFDdkMsS0FBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztBQUMzQyxTQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDO0VBQzdCLENBQUMsQ0FBQztBQUNILEtBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDcEQsT0FBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUTtBQUNyRSxjQUFXLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ3JDLFlBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVE7QUFDbkMsY0FBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUTtBQUNuQyxtQkFBZ0IsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRO0VBQzdELENBQUMsQ0FBQzs7QUFFSCxLQUFNLDJCQUEyQixHQUFHLENBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDYixTQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNyQixXQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0lBQ2pDLENBQUM7RUFDSCxDQUFDLEVBQ0YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FDN0MsQ0FBQzs7QUFFRixPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO0FBQ3JDLE9BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO0FBQ2xELE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQzs7QUFFcEMsS0FBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLE9BQU8sRUFBRSxJQUFJO1VBQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPO0VBQUEsQ0FBQyxDQUFDOztBQUVsRSxVQUFTLG1CQUFtQixHQUFrQztPQUFqQyxNQUFNLGdDQUFHLEVBQUU7T0FBRSxhQUFhLGdDQUFHLEVBQUU7O0FBQzFELE9BQUksZ0JBQWdCLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUN4QyxxQkFBZ0IsU0FBTSxDQUFDLDJCQUEyQixFQUFFLFNBQVMsRUFBRTtBQUM3RCxhQUFNLEVBQUUsa0NBQWtDO01BQzNDLENBQUMsQ0FBQztJQUNKOztBQUVELE9BQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNyQixPQUFJLG9CQUFvQixHQUFHO0FBQ3pCLGNBQU8sV0FBVyxDQUFDLElBQUksQ0FBQztBQUN4QixTQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUN4QixZQUFPLEVBQUU7Y0FBTSxRQUFRLEdBQUcsSUFBSTtNQUFBO0FBQzlCLFdBQU0sRUFBRTtjQUFNLFFBQVEsR0FBRyxLQUFLO01BQUE7QUFDOUIsb0JBQWUsRUFBZixlQUFlO0FBQ2YsdUJBQWtCLEVBQWxCLGtCQUFrQjtBQUNsQixXQUFNLEVBQUU7QUFDTixhQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSTtBQUN2QixlQUFNLEVBQUUsRUFBRTtBQUNWLGVBQU0sRUFBRSxFQUFFO0FBQ1Ysb0JBQVcsRUFBRSxFQUFFO1FBQ2hCO0FBQ0QsY0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSztNQUNqQztBQUNELFVBQUssRUFBRSxZQUFZO0lBQ3BCLENBQUM7O0FBRUYsT0FBSSxDQUFDLG9CQUFvQixFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTztJQUFBLENBQUMsQ0FBQztBQUN4RSxPQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTztJQUFBLENBQUMsQ0FBQztBQUM1RCxPQUFJLENBQUMsYUFBYSxFQUFFLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTztJQUFBLENBQUMsQ0FBQzs7QUFFakUsVUFBTyxRQUFRLENBQUM7Ozs7Ozs7OztBQVVoQixZQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTs7QUFFbkMsU0FBSSxRQUFRLEVBQUU7QUFDWixjQUFPLEVBQUUsQ0FBQztNQUNYO0FBQ0QscUJBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUIsU0FBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFNBQUksUUFBUSxhQUFDO0FBQ2IsUUFBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixTQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pELFNBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUNyQixlQUFRLEdBQUcsVUFBVSxDQUFDO01BQ3ZCLE1BQU07QUFDTCxlQUFRLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQzdDO0FBQ0QsU0FBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1QyxTQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDbkIsbUJBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRixtQkFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7TUFDNUI7QUFDRCxZQUFPLFlBQVksQ0FBQztJQUNyQjs7QUFFRCxZQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUM5QixTQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwQyxTQUFNLEdBQUcsR0FBRztBQUNWLGFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFDeEMsUUFBUSxDQUFDLElBQUksRUFDYixRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2IsYUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFO0FBQ3JDLGlCQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7QUFBQSxNQUN4QyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDbkIsQ0FBQztBQUNGLFNBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEMsU0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDbEIsYUFBTSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN0QztBQUNELFNBQUksT0FBTyxhQUFDO0FBQ1osU0FBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ2pCLGNBQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ3BELGVBQU0sRUFBRSxVQUFVO1FBQ25CLENBQUMsQ0FBQztBQUNILGVBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDNUM7SUFDRjs7QUFHRCxZQUFTLFdBQVcsQ0FBQyxXQUFXLEVBQUU7QUFDaEMsWUFBTyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNqRCxXQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6QyxlQUFRLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN6RCxjQUFPLE1BQU0sQ0FBQztNQUNmLENBQUM7SUFDSDs7QUFFRCxZQUFTLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7QUFDaEQsU0FBSSxXQUFXLElBQUksT0FBTyxFQUFFO0FBQzFCLGFBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDMUIsTUFBTSxJQUFJLE9BQU8sRUFBRTtBQUNsQixjQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQ3ZCO0lBQ0Y7O0FBRUQsWUFBUyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksRUFBOEI7U0FBNUIsUUFBUSxnQ0FBRyxFQUFFO1NBQUUsTUFBTSxnQ0FBRyxFQUFFOztBQUM1RCxTQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDeEMsU0FBSSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7QUFDekIsU0FBSSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7QUFDekIsU0FBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDbkIsU0FBSSxPQUFPLHlCQUF1QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQ3hELFNBQUkseUJBQXlCLEdBQUcsTUFBTSxHQUFHLDBCQUEwQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRSxZQUFPLE1BQUcsTUFBTSxTQUFJLE9BQU8sU0FBSSxNQUFNLFVBQUksR0FBRyxJQUFJLEVBQUUsU0FBRyx5QkFBeUIsRUFBRyxJQUFJLEVBQUUsQ0FBQzs7QUFFeEYsY0FBUyxTQUFTLEdBQUc7QUFDbkIsV0FBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUMvQixXQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZUFBTSxHQUFHLE9BQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLFdBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDL0Q7QUFDRCxjQUFPLE1BQU0sQ0FBQztNQUNmOztBQUVELGNBQVMsU0FBUyxHQUFHO0FBQ25CLFdBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDL0IsV0FBSSxDQUFDLE1BQU0sRUFBRTtBQUNYLGVBQU0sR0FBRyxPQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxXQUFJLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1FBQy9EO0FBQ0QsY0FBTyxNQUFNLENBQUM7TUFDZjs7QUFFRCxjQUFTLE1BQU0sR0FBRztBQUNoQixXQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3JCLFdBQUksQ0FBQyxHQUFHLEVBQUU7QUFDUixZQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQUcsSUFBSSxDQUFDLFdBQVcsUUFBRyxNQUFNLENBQUMsU0FBUyxFQUFHLElBQUksRUFBRSxDQUFDO1FBQy9GO0FBQ0QsY0FBTyxHQUFHLENBQUM7TUFDWjtJQUNGOztBQUVELFlBQVMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM3QyxRQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFNBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O3FCQUNLLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDOztTQUF6QyxRQUFRLGFBQVIsUUFBUTtTQUFFLFFBQVEsYUFBUixRQUFROztBQUN2QixTQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDM0UsYUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUN2RSxhQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQzNFLFNBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNmLFlBQU8saUJBQ1MsQ0FBQyxRQUFHLFVBQVUseUJBQ1AsQ0FBQyxRQUFHLFFBQVEseUJBQ1osQ0FBQyxRQUFHLFFBQVEsQ0FDbEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2Y7O0FBRUQsWUFBUyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMzQixRQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFNBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsU0FBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUs7QUFDekMsY0FBTyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO01BQzFHLENBQUMsQ0FBQztBQUNILFNBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsWUFBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBQyxDQUFDO0lBQ3ZDO0VBRUY7Ozs7Ozs7Ozs7QUFXRCxVQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRW5DLE9BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixPQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkIsT0FBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLE9BQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNqQixPQUFJLEdBQUc7T0FBRSxPQUFPO09BQUUsR0FBRztPQUFFLFdBQVc7T0FBRSxPQUFPLGFBQUM7O0FBRTVDLFVBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFO0FBQ3BDLFFBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUN2QixZQUFPLEdBQUcsV0FBVyxHQUFHLFFBQVEsSUFBSSxPQUFPLENBQUMsVUFBVSxHQUFHLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM3RSxRQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEMsZ0JBQVcsR0FBRyxZQUFZLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN6QyxTQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLEVBQUU7QUFDeEQsYUFBTSxHQUFHLElBQUksQ0FBQztBQUNkLGVBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQzFELE1BQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO0FBQzdCLGVBQVEsRUFBRSxDQUFDO01BQ1osTUFBTTtBQUNMLGVBQVEsQ0FBQyxJQUFJLE1BQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFVLENBQUM7TUFDdkM7SUFDRjtBQUNELE9BQUksTUFBTSxFQUFFO0FBQ1YsWUFBTyxRQUFRLENBQUM7SUFDakIsTUFBTTtBQUNMLFlBQU8sRUFBRSxDQUFDO0lBQ1g7RUFDRjs7QUFHRCxnQkFBZSxDQUFDLElBQUksR0FBRyx1RUFBdUUsQ0FBQztBQUMvRixVQUFTLGVBQWUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwRCxPQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDekMsU0FBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ3JCLGFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSTtJQUN4QixDQUFDLENBQUM7QUFDSCxPQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLGNBQWMsRUFBRSxtQkFBbUIsRUFBQyxDQUFDLENBQUM7QUFDbkYsT0FBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLGNBQWMsRUFBRSxtQkFBbUIsRUFBQyxDQUFDLENBQUM7QUFDdEUsT0FBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUNoQixDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoQyxPQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN2QixZQUFPLFVBQVUsQ0FBQztJQUNuQjtBQUNELE9BQUksT0FBTyxXQUFXLEtBQUssVUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3JHLFlBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZEO0VBQ0Y7O0FBRUQsVUFBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTtBQUNqRCxPQUFJLFdBQVcsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLGNBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckQsVUFBTyxHQUFHLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztFQUNsQzs7QUFFRCxVQUFTLGNBQWMsT0FBUyxHQUFHLEVBQUU7T0FBWixJQUFJLFFBQUosSUFBSTs7QUFDM0IsT0FBSSxDQUFDLElBQUksRUFBRTtBQUNULFlBQU8sRUFBRSxDQUFDO0lBQ1g7QUFDRCxPQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUM5QixTQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCO0FBQ0QsVUFBTyxJQUFJLENBQUM7RUFDYjs7QUFHRCxVQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLE9BQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBQztZQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVU7SUFBQSxDQUFDLENBQUM7QUFDbEQsT0FBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUU7QUFDckMsWUFBTyxDQUNMLDRDQUE0QyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQzNHLENBQUM7SUFDSCxNQUFNO0FBQ0wsWUFBTyxFQUFFLENBQUM7SUFDWDtFQUNGOztBQUVELEtBQUksUUFBUSxHQUFHO0FBQ2IsU0FBTSxFQUFFLFVBQVU7QUFDbEIsUUFBSyxFQUFFLFVBQVU7RUFDbEIsQ0FBQzs7QUFFRixVQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7QUFDdkIsT0FBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE9BQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDO0FBQ3RELFVBQU8sVUFBVSxDQUFDO0VBQ25COztBQUVELFVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUMxQixPQUFJLEtBQUssR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUMzRCxVQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLEtBQUssSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDcFN0RyxLQUFNLGNBQWMsR0FBRztBQUNyQixlQUFZLEVBQVosWUFBWSxFQUFFLGVBQWUsRUFBZixlQUFlLEVBQUUsWUFBWSxFQUFaLFlBQVk7RUFDNUMsQ0FBQzs7QUFFRixPQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2YsT0FBSSxFQUFKLElBQUksRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxpQkFBaUIsRUFBakIsaUJBQWlCLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsY0FBYyxFQUFkLGNBQWM7RUFDekcsQ0FBQzs7QUFFRixVQUFTLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDakIsT0FBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE9BQUksTUFBTSxhQUFDO0FBQ1gsT0FBSSxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQ3BCLFdBQU0sR0FBRyxFQUFFLENBQUM7SUFDYixNQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUM1QixXQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2IsTUFBTTtBQUNMLFlBQU8sR0FBRyxDQUFDO0lBQ1o7QUFDRCxPQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUN0QixXQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUMsQ0FBQztBQUNILFVBQU8sTUFBTSxDQUFDO0VBQ2Y7O0FBR0QsVUFBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ25CLE9BQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0QixZQUFPLE9BQU8sQ0FBQztJQUNoQixNQUFNLElBQUksR0FBRyxZQUFZLE1BQU0sRUFBRTtBQUNoQyxZQUFPLFFBQVEsQ0FBQztJQUNqQixNQUFNO0FBQ0wsWUFBTyxPQUFPLEdBQUcsQ0FBQztJQUNuQjtFQUNGOztBQUVELFVBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTs7QUFFM0MsT0FBSSxPQUFPLGFBQUM7QUFDWixPQUFJLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztBQUNyQyxPQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO0FBQzlCLFlBQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzdCLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO0FBQ3BGLFlBQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLE1BQU07QUFDTCxZQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDbkY7QUFDRCxVQUFPLE9BQU8sQ0FBQztFQUNoQjs7QUFFRCxVQUFTLGNBQWMsT0FBUyxPQUFPLEVBQUU7T0FBaEIsSUFBSSxRQUFKLElBQUk7O0FBQzNCLE9BQUksT0FBTyxJQUFJLEtBQUssVUFBVSxFQUFFO0FBQzlCLFNBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDekMsU0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLFNBQUk7QUFDRixxQ0FBYyxJQUNiLGNBQWMsQ0FBQyxJQUFJLEVBQUcsU0FBUyxDQUNqQyxDQUFDO0lBQ0g7QUFDRCxVQUFPLElBQUksQ0FBQztFQUNiOztBQUVELFVBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUNyQixPQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1IsWUFBTyxFQUFFLENBQUM7SUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM3QixZQUFPLEdBQUcsQ0FBQztJQUNaLE1BQU07QUFDTCxZQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZDtFQUNGOztBQUdELFVBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLE9BQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0QixZQUFPLFFBQVEsa0JBQUksU0FBUyxDQUFDLENBQUM7SUFDL0IsTUFBTTtBQUNMLFlBQU8sT0FBTyxrQkFBSSxTQUFTLENBQUMsQ0FBQztJQUM5QjtFQUNGOztBQUVELFVBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLE9BQUksR0FBRyxDQUFDO0FBQ1IsT0FBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7QUFDN0MsUUFBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDbkIsU0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtBQUN6QixVQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqRCxXQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7QUFDakIsZ0JBQU8sR0FBRyxDQUFDO1FBQ1o7TUFDRjtJQUNGO0FBQ0QsVUFBTyxJQUFJLENBQUM7RUFDYjs7QUFFRCxVQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN4QyxPQUFJLEdBQUcsQ0FBQztBQUNSLE9BQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDeEIsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQixRQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QyxTQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7QUFDakIsY0FBTyxHQUFHLENBQUM7TUFDWjtJQUNGO0FBQ0QsVUFBTyxJQUFJLENBQUM7RUFDYjs7QUFFRCxVQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDcEIsVUFBTyxHQUFHLFlBQVksS0FBSyxDQUFDO0VBQzdCOztBQUVELFVBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ25DLE9BQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLE9BQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN0QixPQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3JCLFNBQUksR0FBRyxHQUFHLENBQUM7SUFDWjtBQUNELFVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBTSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxTQUFTLEdBQUcsRUFBRSxTQUFHLElBQUksQ0FBRSxDQUFDO0VBQzFFOztBQUdELFVBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQzdDLE9BQU0sVUFBVSxHQUFHLE9BQU8sV0FBVyxLQUFLLFFBQVEsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRixVQUFPLElBQUksS0FBSyxNQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLGlCQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBRyxDQUFDO0VBQ3RFOztBQUVELFVBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDNUIsT0FBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQztBQUNqQyxPQUFJLFNBQVMsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RCxlQUFVLEtBQUssUUFBRyxTQUFTLENBQUc7RUFDL0I7O0FBRUQsVUFBUyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ2hCLFVBQU8sR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7RUFDMUI7O0FBRUQsVUFBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ3BCLFVBQU8sT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO0VBQ3JDOztBQUtELFVBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRTtBQUM3QixVQUFPLENBQUMsUUFBUSxHQUFHLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUNsRSxTQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2YsY0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7TUFDMUM7SUFDRixDQUFDO0FBQ0YsVUFBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ25DLFVBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDckMsVUFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUNuRCxPQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQzdDLFlBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELE1BQU0sSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUN0RCxZQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxZQUFXO0FBQ2pDLGNBQU8sT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLEVBQVMsU0FBUyxDQUFDLENBQUM7TUFDbkMsQ0FBQztJQUNILE1BQU07QUFDTCxZQUFPLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUM7QUFDdkMsWUFBTztJQUNSO0FBQ0QsVUFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMvRSxVQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztFQUN0RDs7QUFHRCxVQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUM1QyxLQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNmLEtBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLFlBQVMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ2xELFNBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixTQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7QUFDdkIsV0FBSSxTQUFTLEdBQUcsUUFBUSxZQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBSyxFQUFFLENBQUM7QUFDckQsV0FBTSxLQUFJLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDbEQsV0FBTSxVQUFVLEdBQUcsT0FBTyxLQUFJLEtBQUssUUFBUSxHQUFHLEtBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxDQUFDO0FBQzFFLGNBQU8sSUFBSSxLQUFLLGVBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBaUIsU0FBUyxrQkFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUcsQ0FBQztNQUM3RixNQUFNO0FBQ0wsY0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7TUFDckM7SUFDRjtBQUNELG1CQUFnQixDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ2hDLG1CQUFnQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQzFDLG1CQUFnQixDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0FBQzlDLG1CQUFnQixDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztBQUN4RCxlQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMvQixlQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakIsVUFBTyxnQkFBZ0IsQ0FBQztFQUN6Qjs7QUFFRCxVQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDN0IsVUFBTyxDQUFDLFdBQVcsaUJBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFlLENBQUM7QUFDdEcsT0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7QUFDeEIsaUJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QjtBQUNELE9BQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsbUJBQVMsRUFBSTtBQUMxQyxpQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O2dCQ2pNQyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDOztLQUg3QixNQUFNLFlBQU4sTUFBTTtLQUFFLElBQUksWUFBSixJQUFJO0tBQUUsSUFBSSxZQUFKLElBQUk7S0FBRSxpQkFBaUIsWUFBakIsaUJBQWlCO0tBQUUsT0FBTyxZQUFQLE9BQU87S0FDOUMsUUFBUSxZQUFSLFFBQVE7S0FBRSxJQUFJLFlBQUosSUFBSTtLQUFFLFFBQVEsWUFBUixRQUFRO0tBQUUsSUFBSSxZQUFKLElBQUk7S0FBRSxDQUFDLFlBQUQsQ0FBQztLQUFFLGNBQWMsWUFBZCxjQUFjO0tBQ2pELEtBQUssWUFBTCxLQUFLOztBQUdQLEtBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDOUIsUUFBSyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztBQUNoQyxPQUFJLEVBQUUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0FBQ2pDLFNBQU0sRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7QUFDbEMsU0FBTSxFQUFFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztBQUNsQyxPQUFJLEVBQUUsa0JBQWtCLEVBQUU7QUFDMUIsU0FBTSxFQUFFLGdCQUFnQixFQUFFOztBQUUxQixhQUFVLEVBQUUsbUJBQW1CO0FBQy9CLFFBQUssRUFBRSxnQkFBZ0I7QUFDdkIsWUFBUyxFQUFFLG9CQUFvQjs7QUFFL0IsVUFBTyxFQUFFLGtCQUFrQjtBQUMzQixXQUFRLEVBQUUsbUJBQW1CO0FBQzdCLGdCQUFhLEVBQUUsd0JBQXdCOztBQUV2QyxRQUFLLEVBQUUsbUJBQW1CLEVBQUU7QUFDNUIsT0FBSSxFQUFFLHNCQUFzQixFQUFFOztBQUU5QixNQUFHLEVBQUUsY0FBYyxFQUFFO0VBQ3RCLENBQUM7O0FBRUYsS0FBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRzVDLFVBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLE9BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNqQyxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUMxRixTQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDekIsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN2QztJQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDVjs7QUFFRCxVQUFTLGtCQUFrQixHQUFHO0FBQzVCLE9BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUN4QixPQUFJLGVBQWUsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMseUJBQXlCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDM0csU0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQzlCLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkM7SUFDRixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULGtCQUFlLENBQUMsY0FBYyxHQUFHLFNBQVMsd0JBQXdCLENBQUMsVUFBVSxFQUFFO0FBQzdFLFNBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsOEJBQThCLENBQUMsQ0FBQztBQUM1RyxTQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNyQixhQUFNLFFBQVEsQ0FBQztNQUNoQjtBQUNELFNBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BELGlCQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7O0FBRTlELFlBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2hHLFdBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2RCxXQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN4QixnQkFBTyxXQUFXLENBQUM7UUFDcEI7QUFDRCxjQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO01BQzFDLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0FBRUYsa0JBQWUsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdEQsVUFBTyxlQUFlLENBQUM7RUFDeEI7O0FBRUQsVUFBUyxnQkFBZ0IsR0FBRztBQUMxQixPQUFNLElBQUksR0FBRyxRQUFRLENBQUM7QUFDdEIsT0FBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUM7QUFDcEMsT0FBSSxtQkFBbUIsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsNkJBQTZCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDbkgsU0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQzVCLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7TUFDM0M7SUFDRixFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUViLE9BQUksYUFBYSxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN2RyxTQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUNyRSxjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNyRDtJQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsZ0JBQWEsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDM0MsZ0JBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUU1QyxVQUFPLGFBQWEsQ0FBQztFQUN0Qjs7QUFHRCxVQUFTLG1CQUFtQixDQUFDLFlBQVksRUFBRTtBQUN6QyxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyx5QkFBeUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM1RixTQUFJLEVBQUUsR0FBRyxZQUFZLFlBQVksQ0FBQyxFQUFFO0FBQ2xDLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ3BEO0lBQ0YsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdkI7O0FBRUQsVUFBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7QUFDL0IsT0FBTSxJQUFJLEdBQUc7QUFDWCxtQkFBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDO0FBQy9DLGFBQU0sS0FBSztJQUNaLENBQUM7QUFDRixPQUFNLFNBQVMsYUFBVyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQUc7WUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztBQUM5RSxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN6RixTQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFHO2NBQUksR0FBRyxLQUFLLEdBQUc7TUFBQSxDQUFDLEVBQUU7QUFDbkMsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztNQUM1QztJQUNGLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQ3JCOztBQUVELFVBQVMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO0FBQ3RDLE9BQU0sSUFBSSxHQUFHO0FBQ1gsbUJBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztBQUNwRCxjQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU87Y0FBSyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7TUFBQSxDQUFDO0lBQ2pFLENBQUM7QUFDRixPQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTztZQUFLLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQztBQUM3RixPQUFNLFNBQVMsa0JBQWdCLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztBQUM3RCxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM3RixTQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBTztjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO01BQUEsQ0FBQyxFQUFFO0FBQ3JFLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDNUM7SUFDRixFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztFQUNyQjs7QUFFRCxVQUFTLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtBQUNuQyxPQUFNLElBQUksR0FBRztBQUNYLG1CQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7QUFDbEQsWUFBTyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0FBQ0YsT0FBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDakUsT0FBTSxTQUFTLGdCQUFjLGNBQWMsTUFBRyxDQUFDO0FBQy9DLFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzNGLFNBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBQyxJQUFJO2NBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQUEsQ0FBQyxFQUFFO0FBQ2pGLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDNUM7SUFDRixFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztFQUNyQjs7QUFFRCxVQUFTLG1CQUFtQixDQUFDLE9BQU8sRUFBRTtBQUNwQyxPQUFNLElBQUksR0FBRztBQUNYLG1CQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7QUFDbkQsYUFBUSxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0FBQ0YsT0FBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDakUsT0FBTSxTQUFTLGlCQUFlLGNBQWMsTUFBRyxDQUFDO0FBQ2hELFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzVGLFNBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2RCxTQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUN0QixjQUFPLFNBQVMsQ0FBQztNQUNsQjtBQUNELFNBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFLO0FBQy9DLFdBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDckMsZ0JBQU8sS0FBSyxDQUFDO1FBQ2Q7TUFDRixDQUFDLENBQUM7QUFDSCxTQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3BCLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDNUM7SUFDRixFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztFQUNyQjs7QUFFRCxVQUFTLHdCQUF3QixDQUFDLE9BQU8sRUFBRTtBQUN6QyxPQUFNLElBQUksR0FBRztBQUNYLG1CQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUM7QUFDeEQsa0JBQWEsRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDMUMsQ0FBQztBQUNGLE9BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2pFLE9BQU0sU0FBUyxzQkFBb0IsY0FBYyxNQUFHLENBQUM7QUFDckQsVUFBTyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQy9GLFNBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQzVDO0lBQ0YsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7RUFDckI7O0FBRUQsVUFBUyxtQkFBbUIsR0FBRztBQUM3QixZQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDMUMsU0FBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFLO0FBQzdCLGlCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDL0MsQ0FBQyxDQUFDO0FBQ0gsY0FBUyxJQUFJLEdBQWU7V0FBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQ3hCLFdBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztXQUNOLEtBQUssR0FBcUIsT0FBTyxDQUFqQyxLQUFLO1dBQUUsR0FBRyxHQUFnQixPQUFPLENBQTFCLEdBQUc7V0FBRSxVQUFVLEdBQUksT0FBTyxDQUFyQixVQUFVOztBQUM3QixXQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3hDLFdBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFLOztBQUU3QixhQUFNLFNBQVMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxhQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztBQUM5RSxhQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNoRCxjQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFMLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFFLFVBQVUsRUFBVixVQUFVLEVBQUMsQ0FBQyxDQUFDO1VBQzlGO0FBQ0QsYUFBSSxVQUFVLEVBQUU7QUFDZCxxQ0FBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7VUFDckU7UUFDRixDQUFDLENBQUM7QUFDSCxjQUFPLEdBQUcsQ0FBQzs7QUFFWCxnQkFBUywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQzNFLGFBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNqRCxlQUFJLElBQUksR0FBRyxNQUFNLENBQUM7QUFDbEIsZUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUMvQixpQkFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2RDtBQUNELG9CQUFTLENBQ1AsU0FBUyxFQUFFLGVBQWUsR0FBRyxJQUFJLEVBQUUsMkJBQTJCLENBQy9ELENBQUM7VUFDSCxNQUFNLElBQUksU0FBUyxFQUFFO0FBQ3BCLGVBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMvQixlQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNsQixzQkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLDRCQUE0QixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRztVQUNGOztBQUVELGtCQUFTLFNBQVMsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRTtBQUN6RCxlQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtBQUNqQyxnQkFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQztZQUM1QixNQUFNO0FBQ0wsZ0JBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ3BEO1VBQ0Y7UUFDRjtNQUNGOztBQUVELFNBQUksQ0FBQyxjQUFjLEdBQUcsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQ3RFLFNBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs7QUFFckcsV0FBSSxRQUFRLEdBQUcsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xFLFdBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3JCLGdCQUFPLFFBQVEsQ0FBQztRQUNqQjtBQUNELFdBQUksY0FBYyxhQUFDO0FBQ25CLGVBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hELFdBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ2xCLFdBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFLO0FBQzdCLGFBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDbkQseUJBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksT0FBSyxRQUFRLFFBQUcsSUFBSSxFQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3JFLGtCQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1VBQ2pDO1FBQ0YsQ0FBQyxDQUFDO0FBQ0gsV0FBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUU7QUFDM0IsZ0JBQU8sY0FBYyxDQUFDO1FBQ3ZCO01BQ0YsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRWxCLGNBQVMsVUFBVSxHQUFHO0FBQ3BCLGNBQU8sSUFBSSxrQkFBSSxTQUFTLENBQUMsQ0FBQztNQUMzQjs7QUFFRCxlQUFVLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ25FLGVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUN4QyxpQkFBWSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsNEJBQTRCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDOUcsV0FBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsV0FBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDdkIsZ0JBQU8sVUFBVSxDQUFDO1FBQ25CO0FBQ0QsV0FBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLFdBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQUk7Z0JBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFBLENBQUMsQ0FBQztBQUMzRixXQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDckIsZ0JBQU8sSUFBSSxLQUFLLENBQ2QsS0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyx1Q0FBa0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsZ0NBQy9ELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxDQUN4RCxDQUFDO1FBQ0g7TUFDRixFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUMvQixpQkFBWSxDQUFDLGdCQUFnQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDM0MsbUJBQWMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTFDLFlBQU8sWUFBWSxDQUFDO0lBQ3JCOztBQUVELG1CQUFnQixDQUFDLEtBQUssR0FBRyxTQUFTLEtBQUssQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQy9ELFNBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzlCLGlCQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztNQUMzQjtBQUNELFNBQUksSUFBSSxhQUFDO0FBQ1QsU0FBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMzQixXQUFJLDBCQUF3QixVQUFVLENBQUMsQ0FBQyxDQUFDLHNCQUFtQixDQUFDO01BQzlELE1BQU07QUFDTCxXQUFJLGdFQUE4RCxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsTUFBRyxDQUFDO01BQ3JHO0FBQ0QsU0FBSSxZQUFZLEdBQUcsU0FBUyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7QUFDaEYsV0FBSSxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsV0FBSSxlQUFlLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBUztnQkFBSSxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFBQSxDQUFDLENBQUM7QUFDekYsV0FBSSxVQUFVLEtBQUssZUFBZSxFQUFFO0FBQ2xDLGdCQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxNQUFNLElBQUksVUFBVSxFQUFFO0FBQ3JCLGdCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRDtNQUNGLENBQUM7O0FBRUYsaUJBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLGlCQUFZLENBQUMsU0FBUyxjQUFZLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztBQUMzRCxtQkFBYyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQyxZQUFPLFlBQVksQ0FBQztJQUNyQixDQUFDOztBQUVGLG1CQUFnQixDQUFDLE1BQU0sR0FBRyxTQUFTLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQ2pFLGVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEMsU0FBSSxJQUFJLGFBQUM7QUFDVCxTQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzNCLFdBQUksMEJBQXdCLFVBQVUsQ0FBQyxDQUFDLENBQUMsdUJBQW9CLENBQUM7TUFDL0QsTUFBTTtBQUNMLFdBQUksK0RBQTZELElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFHLENBQUM7TUFDcEc7QUFDRCxTQUFJLGFBQWEsR0FBRyxTQUFTLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUNsRixXQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQUk7Z0JBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFBQSxDQUFDLENBQUM7QUFDekUsV0FBSSxDQUFDLGFBQWEsRUFBRTtBQUNsQixnQkFBTyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsTUFBTTtBQUNMLGdCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRDtNQUNGLENBQUM7O0FBRUYsa0JBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGtCQUFhLENBQUMsU0FBUyxlQUFhLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztBQUM3RCxtQkFBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxZQUFPLGFBQWEsQ0FBQztJQUN0QixDQUFDOztBQUVGLFVBQU8sZ0JBQWdCLENBQUM7RUFDekI7O0FBRUQsVUFBUyxzQkFBc0IsR0FBRztBQUNoQyxPQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FBQztBQUNsQyxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN4RixTQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3ZDO0lBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNWOztBQUVELFVBQVMsY0FBYyxHQUFHO0FBQ3hCLFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLG9CQUFvQixHQUFHLEVBRXJFLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDWCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxMjNmZTQwZWUwYmJjMDE3NmIyM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9hcGlDaGVjaycpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJjb25zdCBhcGlDaGVja1V0aWwgPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge2VhY2gsIGlzRXJyb3IsIHQsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgdHlwZU9mLCBnZXRFcnJvcn0gPSBhcGlDaGVja1V0aWw7XG5jb25zdCBjaGVja2VycyA9IHJlcXVpcmUoJy4vY2hlY2tlcnMnKTtcbmNvbnN0IGFwaUNoZWNrQXBpQ2hlY2sgPSBnZXRBcGlDaGVja0luc3RhbmNlKHtcbiAgb3V0cHV0OiB7cHJlZml4OiAnYXBpQ2hlY2snfVxufSk7XG5jb25zdCBjaGVja2VyRm5DaGVja2VyID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7XG4gIHR5cGU6IGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlcnMuc3RyaW5nLCBjaGVja2VyVHlwZVR5cGVdKS5vcHRpb25hbCxcbiAgZGlzcGxheU5hbWU6IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbCxcbiAgc2hvcnRUeXBlOiBjaGVja2Vycy5zdHJpbmcub3B0aW9uYWwsXG4gIG5vdE9wdGlvbmFsOiBjaGVja2Vycy5ib29sLm9wdGlvbmFsLFxuICBjaGlsZHJlbkNoZWNrZXJzOiBjaGVja2Vycy5hcnJheU9mKGNoZWNrZXJzLnN0cmluZykub3B0aW9uYWxcbn0pO1xuXG5jb25zdCBnZXRBcGlDaGVja0luc3RhbmNlQ2hlY2tlcnMgPSBbXG4gIGNoZWNrZXJzLnNoYXBlKHtcbiAgICBvdXRwdXQ6IGNoZWNrZXJzLnNoYXBlKHtcbiAgICAgIHByZWZpeDogY2hlY2tlcnMuc3RyaW5nLm9wdGlvbmFsXG4gICAgfSlcbiAgfSksXG4gIGNoZWNrZXJzLm9iamVjdE9mKGNoZWNrZXJGbkNoZWNrZXIpLm9wdGlvbmFsXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFwaUNoZWNrSW5zdGFuY2U7XG5tb2R1bGUuZXhwb3J0cy5pbnRlcm5hbENoZWNrZXIgPSBhcGlDaGVja0FwaUNoZWNrO1xubW9kdWxlLmV4cG9ydHMudXRpbHMgPSBhcGlDaGVja1V0aWw7XG5cbmVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1tuYW1lXSA9IGNoZWNrZXIpO1xuXG5mdW5jdGlvbiBnZXRBcGlDaGVja0luc3RhbmNlKGNvbmZpZyA9IHt9LCBleHRyYUNoZWNrZXJzID0ge30pIHtcbiAgaWYgKGFwaUNoZWNrQXBpQ2hlY2sgJiYgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGFwaUNoZWNrQXBpQ2hlY2sudGhyb3coZ2V0QXBpQ2hlY2tJbnN0YW5jZUNoZWNrZXJzLCBhcmd1bWVudHMsIHtcbiAgICAgIHByZWZpeDogJ2NyZWF0aW5nIGFuIGluc3RhbmNlIG9mIGFwaUNoZWNrJ1xuICAgIH0pO1xuICB9XG5cbiAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gIGxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgICB0aHJvdzogZ2V0QXBpQ2hlY2sodHJ1ZSksXG4gICAgd2FybjogZ2V0QXBpQ2hlY2soZmFsc2UpLFxuICAgIGRpc2FibGU6ICgpID0+IGRpc2FibGVkID0gdHJ1ZSxcbiAgICBlbmFibGU6ICgpID0+IGRpc2FibGVkID0gZmFsc2UsXG4gICAgZ2V0RXJyb3JNZXNzYWdlLFxuICAgIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgICBjb25maWc6IHtcbiAgICAgIG91dHB1dDogY29uZmlnLm91dHB1dCB8fCB7XG4gICAgICAgIHByZWZpeDogJycsXG4gICAgICAgIHN1ZmZpeDogJycsXG4gICAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgICAgfSxcbiAgICAgIHZlcmJvc2U6IGNvbmZpZy52ZXJib3NlIHx8IGZhbHNlXG4gICAgfSxcbiAgICB1dGlsczogYXBpQ2hlY2tVdGlsXG4gIH07XG5cbiAgZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IGFwaUNoZWNrW25hbWVdID0gd3JhcHBlcik7XG4gIGVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuICBlYWNoKGV4dHJhQ2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBhcGlDaGVja1tuYW1lXSA9IGNoZWNrZXIpO1xuXG4gIHJldHVybiBhcGlDaGVjaztcblxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBpbnN0YW5jZSBmdW5jdGlvbi4gT3RoZXIgdGhpbmdzIGFyZSBhdHRhY2hlZCB0byB0aGlzIHNlZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYWJvdmUuXG4gICAqIEBwYXJhbSBhcGkge0FycmF5fVxuICAgKiBAcGFyYW0gYXJncyB7YXJndW1lbnRzfVxuICAgKiBAcGFyYW0gb3V0cHV0IHtPYmplY3R9XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gaWYgdGhpcyBoYXMgYSBmYWlsZWQgPSB0cnVlIHByb3BlcnR5LCB0aGVuIGl0IGZhaWxlZFxuICAgKi9cbiAgZnVuY3Rpb24gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo4ICovXG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNoZWNrQXBpQ2hlY2tBcGkoYXJndW1lbnRzKTtcbiAgICBjb25zdCBhcnJheUFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICBsZXQgbWVzc2FnZXM7XG4gICAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgICBsZXQgZW5vdWdoQXJncyA9IGNoZWNrRW5vdWdoQXJncyhhcGksIGFycmF5QXJncyk7XG4gICAgaWYgKGVub3VnaEFyZ3MubGVuZ3RoKSB7XG4gICAgICBtZXNzYWdlcyA9IGVub3VnaEFyZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzID0gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFycmF5QXJncyk7XG4gICAgfVxuICAgIGxldCByZXR1cm5PYmplY3QgPSBnZXRUeXBlcyhhcGksIGFycmF5QXJncyk7XG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuT2JqZWN0Lm1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcnJheUFyZ3MsIG1lc3NhZ2VzLCBvdXRwdXQpO1xuICAgICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5PYmplY3Q7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0FwaUNoZWNrQXBpKGFyZ3MpIHtcbiAgICBjb25zdCBvcyA9IGNoZWNrZXJzLnN0cmluZy5vcHRpb25hbDtcbiAgICBjb25zdCBhcGkgPSBbIC8vIGRvZyBmb29kaW5nIGhlcmVcbiAgICAgIGNoZWNrZXJzLnR5cGVPckFycmF5T2YoY2hlY2tlckZuQ2hlY2tlciksXG4gICAgICBjaGVja2Vycy5hcmdzLFxuICAgICAgY2hlY2tlcnMuc2hhcGUoe1xuICAgICAgICBwcmVmaXg6IG9zLCBzdWZmaXg6IG9zLCB1cmxTdWZmaXg6IG9zLCAvLyBhcHBlbmRlZCBjYXNlXG4gICAgICAgIG9ubHlQcmVmaXg6IG9zLCBvbmx5U3VmZml4OiBvcywgdXJsOiBvcyAvLyBvdmVycmlkZSBjYXNlXG4gICAgICB9KS5zdHJpY3Qub3B0aW9uYWxcbiAgICBdO1xuICAgIGxldCBlcnJvcnMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2U7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIG1lc3NhZ2UgPSBhcGlDaGVjay5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBlcnJvcnMsIHtcbiAgICAgICAgcHJlZml4OiAnYXBpQ2hlY2snXG4gICAgICB9KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGFwaUNoZWNrV3JhcHBlcihhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICAgIGFwaUNoZWNrLmhhbmRsZUVycm9yTWVzc2FnZShyZXN1bHQubWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gd29udCBnZXQgaGVyZSBpZiBhbiBlcnJvciBpcyB0aHJvd25cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG4gICAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAgIGxldCBnT3V0ID0gYXBpQ2hlY2suY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgICBsZXQgcHJlZml4ID0gZ2V0UHJlZml4KCk7XG4gICAgbGV0IHN1ZmZpeCA9IGdldFN1ZmZpeCgpO1xuICAgIGxldCB1cmwgPSBnZXRVcmwoKTtcbiAgICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICAgIHZhciBwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkID0gJ1xcblxcbicgKyBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpO1xuICAgIHJldHVybiBgJHtwcmVmaXh9ICR7bWVzc2FnZX0gJHtzdWZmaXh9ICR7dXJsIHx8ICcnfSR7cGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZH1gLnRyaW0oKTtcblxuICAgIGZ1bmN0aW9uIGdldFByZWZpeCgpIHtcbiAgICAgIGxldCBwcmVmaXggPSBvdXRwdXQub25seVByZWZpeDtcbiAgICAgIGlmICghcHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN1ZmZpeCgpIHtcbiAgICAgIGxldCBzdWZmaXggPSBvdXRwdXQub25seVN1ZmZpeDtcbiAgICAgIGlmICghc3VmZml4KSB7XG4gICAgICAgIHN1ZmZpeCA9IGAke291dHB1dC5zdWZmaXggfHwgJyd9ICR7Z091dC5zdWZmaXggfHwgJyd9YC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VmZml4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFVybCgpIHtcbiAgICAgIGxldCB1cmwgPSBvdXRwdXQudXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsU3VmZml4ICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsU3VmZml4fWAudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcbiAgICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICAgIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgICBsZXQge2FwaVR5cGVzLCBhcmdUeXBlc30gPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICAgIGNvbnN0IHBhc3NlZEFyZ3MgPSBhcmdzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFyZ3MsIG51bGwsIDIpIDogJ25vdGhpbmcnO1xuICAgIGFyZ1R5cGVzID0gYXJncy5sZW5ndGggPyBKU09OLnN0cmluZ2lmeShhcmdUeXBlcywgbnVsbCwgMikgOiAnbm90aGluZyc7XG4gICAgYXBpVHlwZXMgPSBhcGlUeXBlcy5sZW5ndGggPyBKU09OLnN0cmluZ2lmeShhcGlUeXBlcywgbnVsbCwgMikgOiAnbm90aGluZyc7XG4gICAgY29uc3QgbiA9ICdcXG4nO1xuICAgIHJldHVybiBbXG4gICAgICBgWW91IHBhc3NlZDoke259JHtwYXNzZWRBcmdzfWAsXG4gICAgICBgV2l0aCB0aGUgdHlwZXMgb2Y6JHtufSR7YXJnVHlwZXN9YCxcbiAgICAgIGBUaGUgQVBJIGNhbGxzIGZvcjoke259JHthcGlUeXBlc31gXG4gICAgXS5qb2luKG4gKyBuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFR5cGVzKGFwaSwgYXJncykge1xuICAgIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gICAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICAgIGxldCBhcGlUeXBlcyA9IGFwaS5tYXAoKGNoZWNrZXIsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3RlcnNlOiAhYXBpQ2hlY2suY29uZmlnLnZlcmJvc2UsIG9iajogYXJnc1tpbmRleF0sIGFkZEhlbHBlcnM6IHRydWV9KTtcbiAgICB9KTtcbiAgICBsZXQgYXJnVHlwZXMgPSBhcmdzLm1hcChnZXRBcmdEaXNwbGF5KTtcbiAgICByZXR1cm4ge2FyZ1R5cGVzOiBhcmdUeXBlcywgYXBpVHlwZXN9O1xuICB9XG5cbn1cblxuXG4vLyBTVEFURUxFU1MgRlVOQ1RJT05TXG5cbi8qKlxuICogVGhpcyBpcyB3aGVyZSB0aGUgbWFnaWMgaGFwcGVucyBmb3IgYWN0dWFsbHkgY2hlY2tpbmcgdGhlIGFyZ3VtZW50cyB3aXRoIHRoZSBhcGkuXG4gKiBAcGFyYW0gYXBpIHtBcnJheX0gLSBjaGVja2Vyc1xuICogQHBhcmFtIGFyZ3Mge0FycmF5fSAtIGFuZCBhcmd1bWVudHMgb2JqZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgbGV0IG1lc3NhZ2VzID0gW107XG4gIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgbGV0IGNoZWNrZXJJbmRleCA9IDA7XG4gIGxldCBhcmdJbmRleCA9IDA7XG4gIGxldCBhcmcsIGNoZWNrZXIsIHJlcywgbGFzdENoZWNrZXIsIGFyZ05hbWU7XG4gIC8qIGpzaGludCAtVzA4NCAqL1xuICB3aGlsZSAoY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK10pIHtcbiAgICBhcmcgPSBhcmdzW2FyZ0luZGV4KytdO1xuICAgIGFyZ05hbWUgPSAnQXJndW1lbnQgJyArIGFyZ0luZGV4ICsgKGNoZWNrZXIuaXNPcHRpb25hbCA/ICcgKG9wdGlvbmFsKScgOiAnJyk7XG4gICAgcmVzID0gY2hlY2tlcihhcmcsIG51bGwsIGFyZ05hbWUpO1xuICAgIGxhc3RDaGVja2VyID0gY2hlY2tlckluZGV4ID49IGFwaS5sZW5ndGg7XG4gICAgaWYgKGlzRXJyb3IocmVzKSAmJiAoIWNoZWNrZXIuaXNPcHRpb25hbCB8fCBsYXN0Q2hlY2tlcikpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCBhcmcpKTtcbiAgICB9IGVsc2UgaWYgKGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgYXJnSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMucHVzaChgJHt0KGFyZ05hbWUpfSBwYXNzZWRgKTtcbiAgICB9XG4gIH1cbiAgaWYgKGZhaWxlZCkge1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuXG5jaGVja2VyVHlwZVR5cGUudHlwZSA9ICdmdW5jdGlvbiB3aXRoIF9fYXBpQ2hlY2tEYXRhIHByb3BlcnR5IGFuZCBgJHtmdW5jdGlvbi50eXBlfWAgcHJvcGVydHknO1xuZnVuY3Rpb24gY2hlY2tlclR5cGVUeXBlKGNoZWNrZXJUeXBlLCBuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCBhcGlDaGVja0RhdGFDaGVja2VyID0gY2hlY2tlcnMuc2hhcGUoe1xuICAgIHR5cGU6IGNoZWNrZXJzLnN0cmluZyxcbiAgICBvcHRpb25hbDogY2hlY2tlcnMuYm9vbFxuICB9KTtcbiAgY29uc3QgYXNGdW5jID0gY2hlY2tlcnMuZnVuYy53aXRoUHJvcGVydGllcyh7X19hcGlDaGVja0RhdGE6IGFwaUNoZWNrRGF0YUNoZWNrZXJ9KTtcbiAgY29uc3QgYXNTaGFwZSA9IGNoZWNrZXJzLnNoYXBlKHtfX2FwaUNoZWNrRGF0YTogYXBpQ2hlY2tEYXRhQ2hlY2tlcn0pO1xuICBjb25zdCB3cm9uZ1NoYXBlID0gY2hlY2tlcnMub25lT2ZUeXBlKFtcbiAgICBhc0Z1bmMsIGFzU2hhcGVcbiAgXSkoY2hlY2tlclR5cGUsIG5hbWUsIGxvY2F0aW9uKTtcbiAgaWYgKGlzRXJyb3Iod3JvbmdTaGFwZSkpIHtcbiAgICByZXR1cm4gd3JvbmdTaGFwZTtcbiAgfVxuICBpZiAodHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnZnVuY3Rpb24nICYmICFjaGVja2VyVHlwZS5oYXNPd25Qcm9wZXJ0eShjaGVja2VyVHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlKSkge1xuICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGVUeXBlLnR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJFcnJvck1lc3NhZ2UocmVzLCBjaGVja2VyLCB2YWwpIHtcbiAgbGV0IGNoZWNrZXJIZWxwID0gZ2V0Q2hlY2tlckhlbHAoY2hlY2tlciwgdmFsKTtcbiAgY2hlY2tlckhlbHAgPSBjaGVja2VySGVscCA/ICcgLSAnICsgY2hlY2tlckhlbHAgOiAnJztcbiAgcmV0dXJuIHJlcy5tZXNzYWdlICsgY2hlY2tlckhlbHA7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJIZWxwKHtoZWxwfSwgdmFsKSB7XG4gIGlmICghaGVscCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodHlwZW9mIGhlbHAgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoZWxwID0gaGVscCh2YWwpO1xuICB9XG4gIHJldHVybiBoZWxwO1xufVxuXG5cbmZ1bmN0aW9uIGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IHJlcXVpcmVkQXJncyA9IGFwaS5maWx0ZXIoYSA9PiAhYS5pc09wdGlvbmFsKTtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWRBcmdzLmxlbmd0aCkge1xuICAgIHJldHVybiBbXG4gICAgICAnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxudmFyIGVhY2hhYmxlID0ge1xuICBPYmplY3Q6IGdldERpc3BsYXksXG4gIEFycmF5OiBnZXREaXNwbGF5XG59O1xuXG5mdW5jdGlvbiBnZXREaXNwbGF5KG9iaikge1xuICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuICBlYWNoKG9iaiwgKHYsIGspID0+IGFyZ0Rpc3BsYXlba10gPSBnZXRBcmdEaXNwbGF5KHYpKTtcbiAgcmV0dXJuIGFyZ0Rpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIGdldEFyZ0Rpc3BsYXkoYXJnKSB7XG4gIHZhciBjTmFtZSA9IGFyZyAmJiBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gIHJldHVybiBjTmFtZSA/IGVhY2hhYmxlW2NOYW1lXSA/IGVhY2hhYmxlW2NOYW1lXShhcmcpIDogY05hbWUgOiBhcmcgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlT2YoYXJnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrLmpzXG4gKiovIiwiY29uc3QgY2hlY2tlckhlbHBlcnMgPSB7XG4gIG1ha2VPcHRpb25hbCwgd3JhcEluU3BlY2lmaWVkLCBzZXR1cENoZWNrZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlYWNoLCBjb3B5LCB0eXBlT2YsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgaXNFcnJvciwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIHVuZGVmLCBjaGVja2VySGVscGVyc1xufTtcblxuZnVuY3Rpb24gY29weShvYmopIHtcbiAgbGV0IHR5cGUgPSB0eXBlT2Yob2JqKTtcbiAgbGV0IGRhQ29weTtcbiAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICBkYUNvcHkgPSBbXTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGRhQ29weSA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4ge1xuICAgIGRhQ29weVtrZXldID0gdmFsOyAvLyBjYW5ub3Qgc2luZ2xlLWxpbmUgdGhpcyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYWJvcnQgdGhlIGVhY2hcbiAgfSk7XG4gIHJldHVybiBkYUNvcHk7XG59XG5cblxuZnVuY3Rpb24gdHlwZU9mKG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIG9wdGlvbnMpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTcgKi9cbiAgbGV0IGRpc3BsYXk7XG4gIGxldCBzaG9ydCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zaG9ydDtcbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgZGlzcGxheSA9IGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0JyB8fCBjaGVja2VyLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkaXNwbGF5ID0gZ2V0Q2hlY2tlclR5cGUoY2hlY2tlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGxheSA9IGdldENoZWNrZXJUeXBlKGNoZWNrZXIsIG9wdGlvbnMpIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lO1xuICB9XG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyVHlwZSh7dHlwZX0sIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IF9fYXBpQ2hlY2tEYXRhID0gdHlwZS5fX2FwaUNoZWNrRGF0YTtcbiAgICBsZXQgdHlwZVR5cGVzID0gdHlwZShvcHRpb25zKTtcbiAgICB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGEsXG4gICAgICBbX19hcGlDaGVja0RhdGEudHlwZV06IHR5cGVUeXBlc1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogSlNPTi5zdHJpbmdpZnkoY2hlY2tlclR5cGUpO1xuICByZXR1cm4gbmV3IEVycm9yKGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBtdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbn1cblxuZnVuY3Rpb24gbkF0TChuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCB0TmFtZSA9IHQobmFtZSB8fCAndmFsdWUnKTtcbiAgbGV0IHRMb2NhdGlvbiA9ICFsb2NhdGlvbiA/ICcnIDogJyBhdCAnICsgdChsb2NhdGlvbik7XG4gIHJldHVybiBgJHt0TmFtZX0ke3RMb2NhdGlvbn1gO1xufVxuXG5mdW5jdGlvbiB0KHRoaW5nKSB7XG4gIHJldHVybiAnYCcgKyB0aGluZyArICdgJztcbn1cblxuZnVuY3Rpb24gdW5kZWYodGhpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuXG5cbmZ1bmN0aW9uIG1ha2VPcHRpb25hbChjaGVja2VyKSB7XG4gIGNoZWNrZXIub3B0aW9uYWwgPSBmdW5jdGlvbiBvcHRpb25hbENoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICghdW5kZWYodmFsKSkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH07XG4gIGNoZWNrZXIub3B0aW9uYWwuaXNPcHRpb25hbCA9IHRydWU7XG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgY2hlY2tlci5vcHRpb25hbC5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWU7XG4gIGlmICh0eXBlb2YgY2hlY2tlci5vcHRpb25hbC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNvcHkoY2hlY2tlci5vcHRpb25hbC50eXBlKTsgLy8gbWFrZSBvdXIgb3duIGNvcHkgb2YgdGhpc1xuICB9IGVsc2UgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGVja2VyLnR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSArPSAnIChvcHRpb25hbCknO1xuICAgIHJldHVybjtcbiAgfVxuICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkgfHwge307IC8vIGFuZCB0aGlzXG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG59XG5cblxuZnVuY3Rpb24gd3JhcEluU3BlY2lmaWVkKGZuLCB0eXBlLCBzaG9ydFR5cGUpIHtcbiAgZm4udHlwZSA9IHR5cGU7XG4gIGZuLnNob3J0VHlwZSA9IHNob3J0VHlwZTtcbiAgZnVuY3Rpb24gc3BlY2lmaWVkQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBjb25zdCB1ID0gdW5kZWYodmFsKTtcbiAgICBpZiAodSAmJiAhZm4uaXNPcHRpb25hbCkge1xuICAgICAgbGV0IHRMb2NhdGlvbiA9IGxvY2F0aW9uID8gYCBpbiAke3QobG9jYXRpb24pfWAgOiAnJztcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDaGVja2VyRGlzcGxheShmbiwge3Nob3J0OiB0cnVlfSk7XG4gICAgICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIHR5cGUgIT09ICdvYmplY3QnID8gdHlwZSA6IEpTT04uc3RyaW5naWZ5KHR5cGUpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihgUmVxdWlyZWQgJHt0KG5hbWUpfSBub3Qgc3BlY2lmaWVkJHt0TG9jYXRpb259LiBNdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9XG4gIHNwZWNpZmllZENoZWNrZXIudHlwZSA9IGZuLnR5cGU7XG4gIHNwZWNpZmllZENoZWNrZXIuc2hvcnRUeXBlID0gZm4uc2hvcnRUeXBlO1xuICBzcGVjaWZpZWRDaGVja2VyLm5vdE9wdGlvbmFsID0gZm4ubm90T3B0aW9uYWw7XG4gIHNwZWNpZmllZENoZWNrZXIuY2hpbGRyZW5DaGVja2VycyA9IGZuLmNoaWxkcmVuQ2hlY2tlcnM7XG4gIHNldHVwQ2hlY2tlcihzcGVjaWZpZWRDaGVja2VyKTtcbiAgc2V0dXBDaGVja2VyKGZuKTtcbiAgcmV0dXJuIHNwZWNpZmllZENoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIHNldHVwQ2hlY2tlcihjaGVja2VyKSB7XG4gIGNoZWNrZXIuZGlzcGxheU5hbWUgPSBgYXBpQ2hlY2sgJHt0KGNoZWNrZXIuc2hvcnRUeXBlIHx8IGNoZWNrZXIudHlwZSB8fCBjaGVja2VyLm5hbWUpfSB0eXBlIGNoZWNrZXJgO1xuICBpZiAoIWNoZWNrZXIubm90T3B0aW9uYWwpIHtcbiAgICBtYWtlT3B0aW9uYWwoY2hlY2tlcik7XG4gIH1cbiAgZWFjaChjaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMsIGNoaWxkTmFtZSA9PiB7XG4gICAgc2V0dXBDaGVja2VyKGNoZWNrZXJbY2hpbGROYW1lXSk7XG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2tVdGlsLmpzXG4gKiovIiwiY29uc3Qge1xuICB0eXBlT2YsIGVhY2gsIGNvcHksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLFxuICBhcnJheWlmeSwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIGNoZWNrZXJIZWxwZXJzLFxuICB1bmRlZlxuICB9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5OiBnZXRUeXBlT2ZDaGVja2VyKCdBcnJheScpLFxuICBib29sOiBnZXRUeXBlT2ZDaGVja2VyKCdCb29sZWFuJyksXG4gIG51bWJlcjogZ2V0VHlwZU9mQ2hlY2tlcignTnVtYmVyJyksXG4gIHN0cmluZzogZ2V0VHlwZU9mQ2hlY2tlcignU3RyaW5nJyksXG4gIGZ1bmM6IGdldEZ1bmN0aW9uQ2hlY2tlcigpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgc2hhcGU6IGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSxcbiAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gIGFueTogYW55Q2hlY2tHZXR0ZXIoKVxufTtcblxuZWFjaChjaGVja2VycywgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKTtcblxuXG5mdW5jdGlvbiBnZXRUeXBlT2ZDaGVja2VyKHR5cGUpIHtcbiAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gdHlwZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb25DaGVja2VyKCkge1xuICBjb25zdCB0eXBlID0gJ0Z1bmN0aW9uJztcbiAgbGV0IGZ1bmN0aW9uQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBmdW5jdGlvbkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodHlwZU9mKHZhbCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcblxuICBmdW5jdGlvbkNoZWNrZXIud2l0aFByb3BlcnRpZXMgPSBmdW5jdGlvbiBnZXRXaXRoUHJvcGVydGllc0NoZWNrZXIocHJvcGVydGllcykge1xuICAgIGNvbnN0IGFwaUVycm9yID0gY2hlY2tlcnMub2JqZWN0T2YoY2hlY2tlcnMuZnVuYykocHJvcGVydGllcywgJ3Byb3BlcnRpZXMnLCAnYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcycpO1xuICAgIGlmIChpc0Vycm9yKGFwaUVycm9yKSkge1xuICAgICAgdGhyb3cgYXBpRXJyb3I7XG4gICAgfVxuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBjaGVja2Vycy5zaGFwZShwcm9wZXJ0aWVzLCB0cnVlKTtcbiAgICBzaGFwZUNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlID0gJ2Z1bmMud2l0aFByb3BlcnRpZXMnO1xuXG4gICAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBmdW5jdGlvbldpdGhQcm9wZXJ0aWVzQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBjb25zdCBub3RGdW5jdGlvbiA9IGNoZWNrZXJzLmZ1bmModmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihub3RGdW5jdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZ1bmN0aW9uO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNoYXBlQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICB9LCBzaGFwZUNoZWNrZXIudHlwZSwgJ2Z1bmMud2l0aFByb3BlcnRpZXMnKTtcbiAgfTtcblxuICBmdW5jdGlvbkNoZWNrZXIuY2hpbGRyZW5DaGVja2VycyA9IFsnd2l0aFByb3BlcnRpZXMnXTtcbiAgcmV0dXJuIGZ1bmN0aW9uQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0Q2hlY2tlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgbGV0IG9iamVjdE51bGxPa0NoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0TnVsbE9rQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgIH1cbiAgfSwgbnVsbFR5cGUpO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xuXG4gIG9iamVjdENoZWNrZXIubnVsbE9rID0gb2JqZWN0TnVsbE9rQ2hlY2tlcjtcbiAgb2JqZWN0Q2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWydudWxsT2snXTtcblxuICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcbn1cblxuXG5mdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaykpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2xhc3NUb0NoZWNrLm5hbWUpO1xuICAgIH1cbiAgfSwgY2xhc3NUb0NoZWNrLm5hbWUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgZW51bTogZW51bXNcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYGVudW1bJHtlbnVtcy5tYXAoZW5tID0+IEpTT04uc3RyaW5naWZ5KGVubSkpLmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrR2V0dGVyKGNoZWNrZXJzKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdvbmVPZlR5cGUnfSxcbiAgICBvbmVPZlR5cGU6IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcikpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJzRGlzcGxheSA9IGNoZWNrZXJzLm1hcCgoY2hlY2tlcikgPT4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSkpO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZUeXBlWyR7Y2hlY2tlcnNEaXNwbGF5LmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghY2hlY2tlcnMuc29tZShjaGVja2VyID0+ICFpc0Vycm9yKGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICBhcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBjaGVja2VyRGlzcGxheSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHtzaG9ydDogdHJ1ZX0pO1xuICBjb25zdCBzaG9ydFR5cGUgPSBgYXJyYXlPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFycmF5T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29iamVjdE9mJ30sXG4gICAgb2JqZWN0T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IGNoZWNrZXJEaXNwbGF5ID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3Nob3J0OiB0cnVlfSk7XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvYmplY3RPZlske2NoZWNrZXJEaXNwbGF5fV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGNvbnN0IG5vdE9iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICBpZiAoaXNFcnJvcihub3RPYmplY3QpKSB7XG4gICAgICByZXR1cm4gbm90T2JqZWN0O1xuICAgIH1cbiAgICBjb25zdCBhbGxUeXBlc1N1Y2Nlc3MgPSBlYWNoKHZhbCwgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPckFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICd0eXBlT3JBcnJheU9mJ30sXG4gICAgdHlwZU9yQXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3QgY2hlY2tlckRpc3BsYXkgPSBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB7c2hvcnQ6IHRydWV9KTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYHR5cGVPckFycmF5T2ZbJHtjaGVja2VyRGlzcGxheX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiB0eXBlT3JBcnJheU9mRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXIsIGNoZWNrZXJzLmFycmF5T2YoY2hlY2tlcildKSh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSwgbm9uT2JqZWN0KSB7XG4gICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgc2hhcGVUeXBlc1twcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHR5cGUob3B0aW9ucyA9IHt9KSB7XG4gICAgICBsZXQgcmV0ID0ge307XG4gICAgICBjb25zdCB7dGVyc2UsIG9iaiwgYWRkSGVscGVyc30gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGFyZW50UmVxdWlyZWQgPSBvcHRpb25zLnJlcXVpcmVkO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBjb25zdCBzcGVjaWZpZWQgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApO1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IHVuZGVmKHBhcmVudFJlcXVpcmVkKSA/ICFjaGVja2VyLmlzT3B0aW9uYWwgOiBwYXJlbnRSZXF1aXJlZDtcbiAgICAgICAgaWYgKCF0ZXJzZSB8fCAoc3BlY2lmaWVkIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgcmV0W3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwge3RlcnNlLCBvYmo6IG9iaiAmJiBvYmpbcHJvcF0sIHJlcXVpcmVkLCBhZGRIZWxwZXJzfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZEhlbHBlcnMpIHtcbiAgICAgICAgICBtb2RpZnlUeXBlRGlzcGxheVRvSGVscE91dChyZXQsIHByb3AsIHNwZWNpZmllZCwgY2hlY2tlciwgcmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgIGZ1bmN0aW9uIG1vZGlmeVR5cGVEaXNwbGF5VG9IZWxwT3V0KHJldCwgcHJvcCwgc3BlY2lmaWVkLCBjaGVja2VyLCByZXF1aXJlZCkge1xuICAgICAgICBpZiAoIXNwZWNpZmllZCAmJiByZXF1aXJlZCAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSAnSVRFTSc7XG4gICAgICAgICAgaWYgKGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkge1xuICAgICAgICAgICAgaXRlbSA9IGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YS50eXBlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZEhlbHBlcihcbiAgICAgICAgICAgICdtaXNzaW5nJywgJ01JU1NJTkcgVEhJUyAnICsgaXRlbSwgJyA8LS0gWU9VIEFSRSBNSVNTSU5HIFRISVMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcGVjaWZpZWQpIHtcbiAgICAgICAgICBsZXQgZXJyb3IgPSBjaGVja2VyKG9ialtwcm9wXSk7XG4gICAgICAgICAgaWYgKGlzRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICBhZGRIZWxwZXIoJ2Vycm9yJywgJ1RISVMgSVMgVEhFIFBST0JMRU06ICcgKyBlcnJvci5tZXNzYWdlLCAnIDwtLSBUSElTIElTIFRIRSBQUk9CTEVNOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkSGVscGVyKHByb3BlcnR5LCBvYmplY3RNZXNzYWdlLCBzdHJpbmdNZXNzYWdlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXRbcHJvcF0gKz0gc3RyaW5nTWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W3Byb3BdLl9fYXBpQ2hlY2tEYXRhW3Byb3BlcnR5XSA9IG9iamVjdE1lc3NhZ2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHlwZS5fX2FwaUNoZWNrRGF0YSA9IHtzdHJpY3Q6IGZhbHNlLCBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzaGFwZSd9O1xuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICBsZXQgaXNPYmplY3QgPSAhbm9uT2JqZWN0ICYmIGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgICB9XG4gICAgICBsZXQgc2hhcGVQcm9wRXJyb3I7XG4gICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uID8gbG9jYXRpb24gKyAobmFtZSA/ICcvJyA6ICcnKSA6ICcnO1xuICAgICAgbmFtZSA9IG5hbWUgfHwgJyc7XG4gICAgICBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICBpZiAodmFsLmhhc093blByb3BlcnR5KHByb3ApIHx8ICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgICAgICBzaGFwZVByb3BFcnJvciA9IGNoZWNrZXIodmFsW3Byb3BdLCBwcm9wLCBgJHtsb2NhdGlvbn0ke25hbWV9YCwgdmFsKTtcbiAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVQcm9wRXJyb3I7XG4gICAgICB9XG4gICAgfSwgdHlwZSwgJ3NoYXBlJyk7XG5cbiAgICBmdW5jdGlvbiBzdHJpY3RUeXBlKCkge1xuICAgICAgcmV0dXJuIHR5cGUoLi4uYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhID0gY29weShzaGFwZUNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSk7XG4gICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YS5zdHJpY3QgPSB0cnVlO1xuICAgIHNoYXBlQ2hlY2tlci5zdHJpY3QgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gc3RyaWN0U2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBjb25zdCBzaGFwZUVycm9yID0gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlRXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNoYXBlKTtcbiAgICAgIGNvbnN0IGV4dHJhUHJvcHMgPSBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihwcm9wID0+IGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPT09IC0xKTtcbiAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICAgIGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBjYW5ub3QgaGF2ZSBleHRyYSBwcm9wZXJ0aWVzOiAke3QoZXh0cmFQcm9wcy5qb2luKCdgLCBgJykpfS5gICtcbiAgICAgICAgICBgSXQgaXMgbGltaXRlZCB0byAke3QoYWxsb3dlZFByb3BlcnRpZXMuam9pbignYCwgYCcpKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgc3RyaWN0VHlwZSwgJ3N0cmljdCBzaGFwZScpO1xuICAgIHNoYXBlQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWydzdHJpY3QnXTtcbiAgICBjaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIoc2hhcGVDaGVja2VyKTtcblxuICAgIHJldHVybiBzaGFwZUNoZWNrZXI7XG4gIH1cblxuICBzaGFwZUNoZWNrR2V0dGVyLmlmTm90ID0gZnVuY3Rpb24gaWZOb3Qob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgfVxuICAgIGxldCB0eXBlO1xuICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIG5vdCBzcGVjaWZpZWRgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmIG5vbmUgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgfVxuICAgIGxldCBpZk5vdENoZWNrZXIgPSBmdW5jdGlvbiBpZk5vdENoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBsZXQgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgbGV0IG90aGVyUHJvcHNFeGlzdCA9IG90aGVyUHJvcHMuc29tZShvdGhlclByb3AgPT4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApKTtcbiAgICAgIGlmIChwcm9wRXhpc3RzID09PSBvdGhlclByb3BzRXhpc3QpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgaWZOb3RDaGVja2VyLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmTm90Q2hlY2tlci50eXBlID0gdHlwZTtcbiAgICBpZk5vdENoZWNrZXIuc2hvcnRUeXBlID0gYGlmTm90WyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihpZk5vdENoZWNrZXIpO1xuICAgIHJldHVybiBpZk5vdENoZWNrZXI7XG4gIH07XG5cbiAgc2hhcGVDaGVja0dldHRlci5vbmx5SWYgPSBmdW5jdGlvbiBvbmx5SWYob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBvdGhlclByb3BzID0gYXJyYXlpZnkob3RoZXJQcm9wcyk7XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgYWxzbyBzcGVjaWZpZWRgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IG9ubHlJZkNoZWNrZXIgPSBmdW5jdGlvbiBvbmx5SWZDaGVja2VyRGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgY29uc3Qgb3RoZXJzUHJlc2VudCA9IG90aGVyUHJvcHMuZXZlcnkocHJvcCA9PiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpO1xuICAgICAgaWYgKCFvdGhlcnNQcmVzZW50KSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIG9ubHlJZkNoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvbmx5SWZDaGVja2VyLnR5cGUgPSB0eXBlO1xuICAgIG9ubHlJZkNoZWNrZXIuc2hvcnRUeXBlID0gYG9ubHlJZlske290aGVyUHJvcHMuam9pbignLCAnKX1dYDtcbiAgICBjaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIob25seUlmQ2hlY2tlcik7XG4gICAgcmV0dXJuIG9ubHlJZkNoZWNrZXI7XG4gIH07XG5cbiAgcmV0dXJuIHNoYXBlQ2hlY2tHZXR0ZXI7XG59XG5cbmZ1bmN0aW9uIGFyZ3VtZW50c0NoZWNrZXJHZXR0ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnZnVuY3Rpb24gYXJndW1lbnRzJztcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBhcmdzQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgfHwgaXNFcnJvcihjaGVja2Vycy5vYmplY3QodmFsKSkgfHwgaXNFcnJvcihjaGVja2Vycy5udW1iZXIodmFsLmxlbmd0aCkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG59XG5cbmZ1bmN0aW9uIGFueUNoZWNrR2V0dGVyKCkge1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFueUNoZWNrZXJEZWZpbml0aW9uKCkge1xuICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gIH0sICdhbnknKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGlDaGVjay5qcyJ9