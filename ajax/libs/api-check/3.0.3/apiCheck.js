// apiCheck.js v3.0.3 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	
	var checkers = __webpack_require__(/*! ./checkers */ 3);
	var disabled = false;
	
	module.exports = apiCheck;
	
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
	    output: {
	      prefix: "",
	      suffix: "",
	      docsBaseUrl: ""
	    }
	  },
	  utils: apiCheckUtil
	};
	
	each(additionalProperties, function (wrapper, name) {
	  return module.exports[name] = wrapper;
	});
	each(checkers, function (checker, name) {
	  return module.exports[name] = checker;
	});
	
	function apiCheck(api, args, output) {
	  /* jshint maxcomplexity:8 */
	  if (disabled) {
	    return "";
	  }
	  checkApiCheckApi(arguments);
	  args = Array.prototype.slice.call(args);
	  var messages = undefined;
	  api = arrayify(api);
	  var enoughArgs = checkEnoughArgs(api, args);
	  if (enoughArgs.length) {
	    messages = enoughArgs;
	  } else {
	    messages = checkApiWithArgs(api, args);
	  }
	  var returnObject = getTypes(api, args);
	  if (messages.length) {
	    returnObject.message = module.exports.getErrorMessage(api, args, messages, output);
	    returnObject.failed = true;
	  }
	  return returnObject;
	}
	
	function checkApiCheckApi(args) {
	
	  var s = checkers.string;
	  var api = [// dog fooding here
	  checkers.typeOrArrayOf(checkers.func), checkers.args, checkers.shape({ prefix: s, suffix: s, url: s }).strict.optional];
	  var errors = checkEnoughArgs(api, args);
	  if (!errors.length) {
	    errors = checkApiWithArgs(api, args);
	  }
	  var message = undefined;
	  if (errors.length) {
	    message = module.exports.getErrorMessage(api, args, errors, {
	      prefix: "apiCheck"
	    });
	    module.exports.handleErrorMessage(message, true);
	  }
	}
	
	function checkApiWithArgs(api, args) {
	  var messages = [];
	  var failed = false;
	  var checkerIndex = 0;
	  var argIndex = 0;
	  var arg = undefined,
	      checker = undefined,
	      res = undefined;
	  /* jshint -W084 */
	  while (checker = api[checkerIndex++]) {
	    arg = args[argIndex++];
	    res = checker(arg, null, "Argument " + argIndex);
	    if (isError(res) && !checker.isOptional) {
	      failed = true;
	      messages.push(res.message);
	    } else if (checker.isOptional) {
	      argIndex--;
	    } else {
	      messages.push("" + t("Argument " + argIndex) + " passed");
	    }
	  }
	  if (failed) {
	    return messages;
	  } else {
	    return [];
	  }
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
	
	function getApiCheck(shouldThrow) {
	  return function apiCheckWrapper(api, args, output) {
	    var result = apiCheck(api, args, output);
	    module.exports.handleErrorMessage(result.message, shouldThrow);
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
	
	  /* jshint maxcomplexity:7 */
	  var gOut = module.exports.config.output || {};
	  var prefix = ("" + (gOut.prefix || "") + " " + (output.prefix || "")).trim();
	  var suffix = ("" + (output.suffix || "") + " " + (gOut.suffix || "")).trim();
	  var url = gOut.docsBaseUrl && output.url && ("" + gOut.docsBaseUrl + "" + output.url).trim();
	  var message = "apiCheck failed! " + messages.join(", ");
	  var passedAndShouldHavePassed = "\n\n" + buildMessageFromApiAndArgs(api, args);
	  return ("" + prefix + " " + message + " " + suffix + " " + (url || "") + "" + passedAndShouldHavePassed).trim();
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
	  var apiTypes = api.map(function (checker) {
	    return getCheckerDisplay(checker);
	  });
	  var argTypes = args.map(getArgDisplay);
	  return { argTypes: argTypes, apiTypes: apiTypes };
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
	
	function getCheckerDisplay(checker, short) {
	  /* jshint maxcomplexity:7 */
	  if (short && checker.shortType) {
	    return checker.shortType;
	  } else if (!short && typeof checker.type === "object") {
	    return checker.type;
	  } else {
	    return (checker.type || checker.displayName || checker.name) + (checker.isOptional ? " (optional)" : "");
	  }
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
	  var tLocation = undef(location) ? "" : " at " + t(location);
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
	  if (typeof checker.optional.type === "object") {
	    checker.optional.type = copy(checker.optional.type); // make our own copy of this
	    checker.optional.type.__apiCheckData = copy(checker.type.__apiCheckData) || {}; // and this
	    checker.optional.type.__apiCheckData.optional = true;
	  }
	  checker.optional.displayName = checker.displayName;
	}
	
	function wrapInSpecified(fn, type, shortType) {
	  fn.type = type;
	  fn.shortType = shortType;
	  function specifiedChecker(val, name, location, obj) {
	    var u = undef(val);
	    if (u && !fn.isOptional) {
	      var tLocation = location ? " in " + t(location) : "";
	      var _type = getCheckerDisplay(fn, true);
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
	  checker.displayName = "apiCheck " + t(checker.type || checker.name) + " type checker";
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
	
	var checkers = module.exports = {
	  array: getTypeOfChecker("Array"),
	  bool: getTypeOfChecker("Boolean"),
	  func: getTypeOfChecker("Function"),
	  number: getTypeOfChecker("Number"),
	  string: getTypeOfChecker("String"),
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
	  var shortType = "enum[" + enums.join(", ") + "]";
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
	    __apiCheckData: { optional: false, type: "oneOf" },
	    oneOf: checkers.map(getCheckerDisplay)
	  };
	  var shortType = "oneOf[" + checkers.map(getCheckerDisplay).join(", ") + "]";
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
	  var shortType = "arrayOf[" + getCheckerDisplay(checker) + "]";
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
	  var shortType = "objectOf[" + getCheckerDisplay(checker) + "]";
	  return checkerHelpers.wrapInSpecified(function objectOfCheckerDefinition(val, name, location) {
	    var isObject = checkers.object(val, name, location);
	    if (isError(isObject)) {
	      return isObject;
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
	  var shortType = "typeOrArrayOf[" + getCheckerDisplay(checker) + "]";
	  return checkerHelpers.wrapInSpecified(function typeOrArrayOfDefinition(val, name, location, obj) {
	    if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
	      return getError(name, location, shortType);
	    }
	  }, type, shortType);
	}
	
	function getShapeCheckGetter() {
	  function shapeCheckGetter(shape) {
	    var copiedShape = copy(shape);
	    each(copiedShape, function (val, prop) {
	      copiedShape[prop] = getCheckerDisplay(val);
	    });
	    var type = {
	      __apiCheckData: { strict: false, optional: false, type: "shape" },
	      shape: copiedShape
	    };
	    var shapeChecker = checkerHelpers.wrapInSpecified(function shapeCheckerDefinition(val, name, location) {
	      var isObject = checkers.object(val, name, location);
	      if (isError(isObject)) {
	        return isObject;
	      }
	      var shapePropError = undefined;
	      each(shape, function (checker, prop) {
	        if (val.hasOwnProperty(prop) || !checker.isOptional) {
	          shapePropError = checker(val[prop], prop, name, val);
	          return !isError(shapePropError);
	        }
	      });
	      if (isError(shapePropError)) {
	        return shapePropError;
	      }
	    }, type, "shape");
	
	    var strictType = copy(shapeChecker.type);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMzIzZjNjMmVjMWI3MDJjYjQ2ZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUFxRCxZQUFZLENBQXJFLElBQUk7S0FBRSxPQUFPLEdBQTRDLFlBQVksQ0FBL0QsT0FBTztLQUFFLENBQUMsR0FBeUMsWUFBWSxDQUF0RCxDQUFDO0tBQUUsUUFBUSxHQUErQixZQUFZLENBQW5ELFFBQVE7S0FBRSxpQkFBaUIsR0FBWSxZQUFZLENBQXpDLGlCQUFpQjtLQUFFLE1BQU0sR0FBSSxZQUFZLENBQXRCLE1BQU07O0FBQzVELEtBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQUksUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFckIsT0FBTSxDQUFDLE9BQU8sR0FB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Q0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGtCQUFhLENBQUMsU0FBUyxlQUFhLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztBQUM3RCxtQkFBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxZQUFPLGFBQWEsQ0FBQztJQUN0QixDQUFDOztBQUVGLFVBQU8sZ0JBQWdCLENBQUM7RUFDekI7O0FBRUQsVUFBUyxzQkFBc0IsR0FBRztBQUNoQyxPQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FBQztBQUNsQyxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN4RixTQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3ZDO0lBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNWOztBQUVELFVBQVMsY0FBYyxHQUFHO0FBQ3hCLFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLG9CQUFvQixHQUFHLEVBRXJFLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDWCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyMzIzZjNjMmVjMWI3MDJjYjQ2ZFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9hcGlDaGVjaycpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJjb25zdCBhcGlDaGVja1V0aWwgPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge2VhY2gsIGlzRXJyb3IsIHQsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgdHlwZU9mfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xubGV0IGRpc2FibGVkID0gZmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpQ2hlY2s7XG5cbmxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gIGRpc2FibGU6ICgpID0+IGRpc2FibGVkID0gdHJ1ZSxcbiAgZW5hYmxlOiAoKSA9PiBkaXNhYmxlZCA9IGZhbHNlLFxuICBnZXRFcnJvck1lc3NhZ2UsXG4gIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgY29uZmlnOiB7XG4gICAgb3V0cHV0OiB7XG4gICAgICBwcmVmaXg6ICcnLFxuICAgICAgc3VmZml4OiAnJyxcbiAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgIH1cbiAgfSxcbiAgdXRpbHM6IGFwaUNoZWNrVXRpbFxufTtcblxuZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gd3JhcHBlcik7XG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuXG5cbmZ1bmN0aW9uIGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjggKi9cbiAgaWYgKGRpc2FibGVkKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGNoZWNrQXBpQ2hlY2tBcGkoYXJndW1lbnRzKTtcbiAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICBsZXQgbWVzc2FnZXM7XG4gIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gIGxldCBlbm91Z2hBcmdzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gIGlmIChlbm91Z2hBcmdzLmxlbmd0aCkge1xuICAgIG1lc3NhZ2VzID0gZW5vdWdoQXJncztcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlcyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgfVxuICBsZXQgcmV0dXJuT2JqZWN0ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMsIG91dHB1dCk7XG4gICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHJldHVybk9iamVjdDtcbn1cblxuZnVuY3Rpb24gY2hlY2tBcGlDaGVja0FwaShhcmdzKSB7XG5cbiAgY29uc3QgcyA9IGNoZWNrZXJzLnN0cmluZztcbiAgY29uc3QgYXBpID0gWyAvLyBkb2cgZm9vZGluZyBoZXJlXG4gICAgY2hlY2tlcnMudHlwZU9yQXJyYXlPZihjaGVja2Vycy5mdW5jKSxcbiAgICBjaGVja2Vycy5hcmdzLFxuICAgIGNoZWNrZXJzLnNoYXBlKHtwcmVmaXg6IHMsIHN1ZmZpeDogcywgdXJsOiBzfSkuc3RyaWN0Lm9wdGlvbmFsXG4gIF07XG4gIGxldCBlcnJvcnMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgaWYgKCFlcnJvcnMubGVuZ3RoKSB7XG4gICAgZXJyb3JzID0gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpO1xuICB9XG4gIGxldCBtZXNzYWdlO1xuICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgIG1lc3NhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBlcnJvcnMsIHtcbiAgICAgIHByZWZpeDogJ2FwaUNoZWNrJ1xuICAgIH0pO1xuICAgIG1vZHVsZS5leHBvcnRzLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncykge1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUoY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK10pIHtcbiAgICBhcmcgPSBhcmdzW2FyZ0luZGV4KytdO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCBudWxsLCAnQXJndW1lbnQgJyArIGFyZ0luZGV4KTtcbiAgICBpZiAoaXNFcnJvcihyZXMpICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKHJlcy5tZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgYXJnSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMucHVzaChgJHt0KCdBcmd1bWVudCAnICsgYXJnSW5kZXgpfSBwYXNzZWRgKTtcbiAgICB9XG4gIH1cbiAgaWYgKGZhaWxlZCkge1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFsnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRBcGlDaGVjayhzaG91bGRUaHJvdykge1xuICByZXR1cm4gZnVuY3Rpb24gYXBpQ2hlY2tXcmFwcGVyKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICBtb2R1bGUuZXhwb3J0cy5oYW5kbGVFcnJvck1lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UsIHNob3VsZFRocm93KTtcbiAgICByZXR1cm4gcmVzdWx0OyAvLyB3b250IGdldCBoZXJlIGlmIGFuIGVycm9yIGlzIHRocm93blxuICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBnT3V0ID0gbW9kdWxlLmV4cG9ydHMuY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgbGV0IHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gIGxldCBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICBsZXQgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsfWAudHJpbSgpO1xuICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgcmV0dXJuIGAke3ByZWZpeH0gJHttZXNzYWdlfSAke3N1ZmZpeH0gJHt1cmwgfHwgJyd9JHtwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkfWAudHJpbSgpO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncykge1xuICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICBhcmdzID0gYXJyYXlpZnkoYXJncyk7XG4gIGxldCB7YXBpVHlwZXMsIGFyZ1R5cGVzfSA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gIGNvbnN0IHBhc3NlZEFyZ3MgPSBhcmdzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFyZ3MsIG51bGwsIDIpIDogJ25vdGhpbmcnO1xuICBhcmdUeXBlcyA9IGFyZ3MubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoYXJnVHlwZXMsIG51bGwsIDIpIDogJ25vdGhpbmcnO1xuICBhcGlUeXBlcyA9IGFwaVR5cGVzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFwaVR5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgY29uc3QgbiA9ICdcXG4nO1xuICByZXR1cm4gW1xuICAgIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9YCxcbiAgICBgV2l0aCB0aGUgdHlwZXMgb2Y6JHtufSR7YXJnVHlwZXN9YCxcbiAgICBgVGhlIEFQSSBjYWxscyBmb3I6JHtufSR7YXBpVHlwZXN9YFxuICBdLmpvaW4obiArIG4pO1xufVxuXG5mdW5jdGlvbiBnZXRUeXBlcyhhcGksIGFyZ3MpIHtcbiAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICBsZXQgYXBpVHlwZXMgPSBhcGkubWFwKGNoZWNrZXIgPT4ge1xuICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgfSk7XG4gIGxldCBhcmdUeXBlcyA9IGFyZ3MubWFwKGdldEFyZ0Rpc3BsYXkpO1xuICByZXR1cm4ge2FyZ1R5cGVzOiBhcmdUeXBlcywgYXBpVHlwZXN9O1xufVxuXG52YXIgZWFjaGFibGUgPSB7XG4gIE9iamVjdDogZ2V0RGlzcGxheSxcbiAgQXJyYXk6IGdldERpc3BsYXlcbn07XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodixrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2KSk7XG4gIHJldHVybiBhcmdEaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZykge1xuICB2YXIgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICByZXR1cm4gY05hbWUgPyBlYWNoYWJsZVtjTmFtZV0gPyBlYWNoYWJsZVtjTmFtZV0oYXJnKSA6IGNOYW1lIDogYXJnID09PSBudWxsID8gJ251bGwnIDogdHlwZU9mKGFyZyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVjay5qc1xuICoqLyIsImNvbnN0IGNoZWNrZXJIZWxwZXJzID0ge1xuICBtYWtlT3B0aW9uYWwsIHdyYXBJblNwZWNpZmllZCwgc2V0dXBDaGVja2VyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCB1bmRlZiwgY2hlY2tlckhlbHBlcnNcbn07XG5cbmZ1bmN0aW9uIGNvcHkob2JqKSB7XG4gIGxldCB0eXBlID0gdHlwZU9mKG9iaik7XG4gIGxldCBkYUNvcHk7XG4gIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgZGFDb3B5ID0gW107XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBkYUNvcHkgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGVhY2gob2JqLCAodmFsLCBrZXkpID0+IHtcbiAgICBkYUNvcHlba2V5XSA9IHZhbDsgLy8gY2Fubm90IHNpbmdsZS1saW5lIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFib3J0IHRoZSBlYWNoXG4gIH0pO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCBzaG9ydCkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGlmIChzaG9ydCAmJiBjaGVja2VyLnNob3J0VHlwZSkge1xuICAgIHJldHVybiBjaGVja2VyLnNob3J0VHlwZTtcbiAgfSBlbHNlIGlmICghc2hvcnQgJiYgdHlwZW9mIGNoZWNrZXIudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gY2hlY2tlci50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lKSArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGVhY2hBcnJ5KC4uLmFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVhY2hPYmooLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoT2JqKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZWFjaEFycnkob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG5mdW5jdGlvbiBsaXN0KGFycnksIGpvaW4sIGZpbmFsSm9pbikge1xuICBhcnJ5ID0gYXJyYXlpZnkoYXJyeSk7XG4gIGxldCBjb3B5ID0gYXJyeS5zbGljZSgpO1xuICBsZXQgbGFzdCA9IGNvcHkucG9wKCk7XG4gIGlmIChjb3B5Lmxlbmd0aCA9PT0gMSkge1xuICAgIGpvaW4gPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNvcHkuam9pbihqb2luKSArIGAke2NvcHkubGVuZ3RoID8gam9pbiArIGZpbmFsSm9pbiA6ICcnfSR7bGFzdH1gO1xufVxuXG5cbmZ1bmN0aW9uIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjaGVja2VyVHlwZSkge1xuICBjb25zdCBzdHJpbmdUeXBlID0gdHlwZW9mIGNoZWNrZXJUeXBlICE9PSAnb2JqZWN0JyA/IGNoZWNrZXJUeXBlIDogSlNPTi5zdHJpbmdpZnkoY2hlY2tlclR5cGUpO1xuICByZXR1cm4gbmV3IEVycm9yKGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBtdXN0IGJlICR7dChzdHJpbmdUeXBlKX1gKTtcbn1cblxuZnVuY3Rpb24gbkF0TChuYW1lLCBsb2NhdGlvbikge1xuICBjb25zdCB0TmFtZSA9IHQobmFtZSB8fCAndmFsdWUnKTtcbiAgbGV0IHRMb2NhdGlvbiA9IHVuZGVmKGxvY2F0aW9uKSA/ICcnIDogJyBhdCAnICsgdChsb2NhdGlvbik7XG4gIHJldHVybiBgJHt0TmFtZX0ke3RMb2NhdGlvbn1gO1xufVxuXG5mdW5jdGlvbiB0KHRoaW5nKSB7XG4gIHJldHVybiAnYCcgKyB0aGluZyArICdgJztcbn1cblxuZnVuY3Rpb24gdW5kZWYodGhpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuXG5cbmZ1bmN0aW9uIG1ha2VPcHRpb25hbChjaGVja2VyKSB7XG4gIGNoZWNrZXIub3B0aW9uYWwgPSBmdW5jdGlvbiBvcHRpb25hbENoZWNrKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmICghdW5kZWYodmFsKSkge1xuICAgICAgcmV0dXJuIGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH07XG4gIGNoZWNrZXIub3B0aW9uYWwuaXNPcHRpb25hbCA9IHRydWU7XG4gIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNoZWNrZXIudHlwZTtcbiAgaWYgKHR5cGVvZiBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY29weShjaGVja2VyLm9wdGlvbmFsLnR5cGUpOyAvLyBtYWtlIG91ciBvd24gY29weSBvZiB0aGlzXG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlLl9fYXBpQ2hlY2tEYXRhID0gY29weShjaGVja2VyLnR5cGUuX19hcGlDaGVja0RhdGEpIHx8IHt9OyAvLyBhbmQgdGhpc1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YS5vcHRpb25hbCA9IHRydWU7XG4gIH1cbiAgY2hlY2tlci5vcHRpb25hbC5kaXNwbGF5TmFtZSA9IGNoZWNrZXIuZGlzcGxheU5hbWU7XG59XG5cbmZ1bmN0aW9uIHdyYXBJblNwZWNpZmllZChmbiwgdHlwZSwgc2hvcnRUeXBlKSB7XG4gIGZuLnR5cGUgPSB0eXBlO1xuICBmbi5zaG9ydFR5cGUgPSBzaG9ydFR5cGU7XG4gIGZ1bmN0aW9uIHNwZWNpZmllZENoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgY29uc3QgdSA9IHVuZGVmKHZhbCk7XG4gICAgaWYgKHUgJiYgIWZuLmlzT3B0aW9uYWwpIHtcbiAgICAgIGxldCB0TG9jYXRpb24gPSBsb2NhdGlvbiA/IGAgaW4gJHt0KGxvY2F0aW9uKX1gIDogJyc7XG4gICAgICBjb25zdCB0eXBlID0gZ2V0Q2hlY2tlckRpc3BsYXkoZm4sIHRydWUpO1xuICAgICAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiB0eXBlICE9PSAnb2JqZWN0JyA/IHR5cGUgOiBKU09OLnN0cmluZ2lmeSh0eXBlKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoYFJlcXVpcmVkICR7dChuYW1lKX0gbm90IHNwZWNpZmllZCR7dExvY2F0aW9ufS4gTXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfVxuICBzcGVjaWZpZWRDaGVja2VyLnR5cGUgPSBmbi50eXBlO1xuICBzcGVjaWZpZWRDaGVja2VyLnNob3J0VHlwZSA9IGZuLnNob3J0VHlwZTtcbiAgc3BlY2lmaWVkQ2hlY2tlci5ub3RPcHRpb25hbCA9IGZuLm5vdE9wdGlvbmFsO1xuICBzcGVjaWZpZWRDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBmbi5jaGlsZHJlbkNoZWNrZXJzO1xuICBzZXR1cENoZWNrZXIoc3BlY2lmaWVkQ2hlY2tlcik7XG4gIHNldHVwQ2hlY2tlcihmbik7XG4gIHJldHVybiBzcGVjaWZpZWRDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBzZXR1cENoZWNrZXIoY2hlY2tlcikge1xuICBjaGVja2VyLmRpc3BsYXlOYW1lID0gYGFwaUNoZWNrICR7dChjaGVja2VyLnR5cGUgfHwgY2hlY2tlci5uYW1lKX0gdHlwZSBjaGVja2VyYDtcbiAgaWYgKCFjaGVja2VyLm5vdE9wdGlvbmFsKSB7XG4gICAgbWFrZU9wdGlvbmFsKGNoZWNrZXIpO1xuICB9XG4gIGVhY2goY2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzLCBjaGlsZE5hbWUgPT4ge1xuICAgIHNldHVwQ2hlY2tlcihjaGVja2VyW2NoaWxkTmFtZV0pO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrVXRpbC5qc1xuICoqLyIsImNvbnN0IHtcbiAgdHlwZU9mLCBlYWNoLCBjb3B5LCBnZXRDaGVja2VyRGlzcGxheSwgaXNFcnJvcixcbiAgYXJyYXlpZnksIGxpc3QsIGdldEVycm9yLCBuQXRMLCB0LCBjaGVja2VySGVscGVyc1xuICB9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcblxubGV0IGNoZWNrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5OiBnZXRUeXBlT2ZDaGVja2VyKCdBcnJheScpLFxuICBib29sOiBnZXRUeXBlT2ZDaGVja2VyKCdCb29sZWFuJyksXG4gIGZ1bmM6IGdldFR5cGVPZkNoZWNrZXIoJ0Z1bmN0aW9uJyksXG4gIG51bWJlcjogZ2V0VHlwZU9mQ2hlY2tlcignTnVtYmVyJyksXG4gIHN0cmluZzogZ2V0VHlwZU9mQ2hlY2tlcignU3RyaW5nJyksXG4gIG9iamVjdDogZ2V0T2JqZWN0Q2hlY2tlcigpLFxuXG4gIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG4gIG9uZU9mOiBvbmVPZkNoZWNrR2V0dGVyLFxuICBvbmVPZlR5cGU6IG9uZU9mVHlwZUNoZWNrR2V0dGVyLFxuXG4gIGFycmF5T2Y6IGFycmF5T2ZDaGVja0dldHRlcixcbiAgb2JqZWN0T2Y6IG9iamVjdE9mQ2hlY2tHZXR0ZXIsXG4gIHR5cGVPckFycmF5T2Y6IHR5cGVPckFycmF5T2ZDaGVja0dldHRlcixcblxuICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuICBhcmdzOiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5lYWNoKGNoZWNrZXJzLCBjaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIpO1xuXG5cbmZ1bmN0aW9uIGdldFR5cGVPZkNoZWNrZXIodHlwZSkge1xuICBjb25zdCBsVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiB0eXBlT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKHR5cGVPZih2YWwpICE9PSBsVHlwZSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRPYmplY3RDaGVja2VyKCkge1xuICBjb25zdCB0eXBlID0gJ09iamVjdCc7XG4gIGNvbnN0IG51bGxUeXBlID0gJ09iamVjdCAobnVsbCBvayknO1xuICBsZXQgb2JqZWN0TnVsbE9rQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvYmplY3ROdWxsT2tDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKHR5cGVPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBudWxsVHlwZSk7XG4gICAgfVxuICB9LCBudWxsVHlwZSk7XG5cbiAgbGV0IG9iamVjdENoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0Q2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgaXNFcnJvcihvYmplY3ROdWxsT2tDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBvYmplY3RDaGVja2VyLnR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG5cbiAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuICBvYmplY3RDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ251bGxPayddO1xuXG4gIHJldHVybiBvYmplY3RDaGVja2VyO1xufVxuXG5cbmZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCEodmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgfVxuICB9LCBjbGFzc1RvQ2hlY2submFtZSk7XG59XG5cbmZ1bmN0aW9uIG9uZU9mQ2hlY2tHZXR0ZXIoZW51bXMpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2VudW0nfSxcbiAgICBlbnVtOiBlbnVtc1xuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgZW51bVske2VudW1zLmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb25lT2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFlbnVtcy5zb21lKGVubSA9PiBlbm0gPT09IHZhbCkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrR2V0dGVyKGNoZWNrZXJzKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdvbmVPZid9LFxuICAgIG9uZU9mOiBjaGVja2Vycy5tYXAoZ2V0Q2hlY2tlckRpc3BsYXkpXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvbmVPZlske2NoZWNrZXJzLm1hcChnZXRDaGVja2VyRGlzcGxheSkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gIWlzRXJyb3IoY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnYXJyYXlPZid9LFxuICAgIGFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBhcnJheU9mWyR7Z2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcil9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5hcnJheSh2YWwpKSB8fCAhdmFsLmV2ZXJ5KChpdGVtKSA9PiAhaXNFcnJvcihjaGVja2VyKGl0ZW0pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICBvYmplY3RPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Z2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcil9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgY29uc3QgaXNPYmplY3QgPSBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgaWYgKGlzRXJyb3IoaXNPYmplY3QpKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgfVxuICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICBpZiAoaXNFcnJvcihjaGVja2VyKGl0ZW0sIGtleSwgbmFtZSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3R5cGVPckFycmF5T2YnfSxcbiAgICB0eXBlT3JBcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgdHlwZU9yQXJyYXlPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRTaGFwZUNoZWNrR2V0dGVyKCkge1xuICBmdW5jdGlvbiBzaGFwZUNoZWNrR2V0dGVyKHNoYXBlKSB7XG4gICAgbGV0IGNvcGllZFNoYXBlID0gY29weShzaGFwZSk7XG4gICAgZWFjaChjb3BpZWRTaGFwZSwgKHZhbCwgcHJvcCkgPT4ge1xuICAgICAgY29waWVkU2hhcGVbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheSh2YWwpO1xuICAgIH0pO1xuICAgIGNvbnN0IHR5cGUgPSB7XG4gICAgICBfX2FwaUNoZWNrRGF0YToge3N0cmljdDogZmFsc2UsIG9wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3NoYXBlJ30sXG4gICAgICBzaGFwZTogY29waWVkU2hhcGVcbiAgICB9O1xuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBsZXQgaXNPYmplY3QgPSBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihpc09iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgICAgfVxuICAgICAgbGV0IHNoYXBlUHJvcEVycm9yO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgbmFtZSwgdmFsKTtcbiAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVQcm9wRXJyb3I7XG4gICAgICB9XG4gICAgfSwgdHlwZSwgJ3NoYXBlJyk7XG5cbiAgICBsZXQgc3RyaWN0VHlwZSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUpO1xuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhLnN0cmljdCA9IHRydWU7XG4gICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZUVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbG93ZWRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2hhcGUpO1xuICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCBzdHJpY3RUeXBlLCAnc3RyaWN0IHNoYXBlJyk7XG4gICAgc2hhcGVDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ3N0cmljdCddO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZUNoZWNrZXIpO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IGlmTm90Q2hlY2tlciA9IGZ1bmN0aW9uIGlmTm90Q2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCBpZk5vdENoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWZOb3RDaGVja2VyLnR5cGUgPSB0eXBlO1xuICAgIGlmTm90Q2hlY2tlci5zaG9ydFR5cGUgPSBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWA7XG4gICAgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKGlmTm90Q2hlY2tlcik7XG4gICAgcmV0dXJuIGlmTm90Q2hlY2tlcjtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICBsZXQgb25seUlmQ2hlY2tlciA9IGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgb25seUlmQ2hlY2tlci50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9ubHlJZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gICAgb25seUlmQ2hlY2tlci5zaG9ydFR5cGUgPSBgb25seUlmWyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihvbmx5SWZDaGVja2VyKTtcbiAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYXJndW1lbnRzQ2hlY2tlckdldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdmdW5jdGlvbiBhcmd1bWVudHMnO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm9iamVjdCh2YWwpKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm51bWJlcih2YWwubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYW55Q2hlY2tlckRlZmluaXRpb24oKSB7XG4gICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcbiAgfSwgJ2FueScpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGlDaGVjay5qcyJ9