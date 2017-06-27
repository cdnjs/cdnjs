// apiCheck.js v3.0.1 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	  return { argTypes: args.map(getArgDisplay), apiTypes: apiTypes };
	}
	
	var stringifyable = {
	  Object: getDisplay,
	  Array: getDisplay
	};
	
	function getDisplay(obj) {
	  var argDisplay = {};
	  each(obj, function (v, k) {
	    return argDisplay[k] = getArgDisplay(v);
	  });
	  return JSON.stringify(obj, function (k, v) {
	    return argDisplay[k] || v;
	  });
	}
	
	function getArgDisplay(arg) {
	  var cName = arg && arg.constructor && arg.constructor.name;
	  return cName ? stringifyable[cName] ? stringifyable[cName](arg) : cName : arg === null ? "null" : typeOf(arg);
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
	      console.log(_type);
	      console.log(typeof _type);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNWIzNWFmNGVjNDU2MDk4ODEzYiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUFxRCxZQUFZLENBQXJFLElBQUk7S0FBRSxPQUFPLEdBQTRDLFlBQVksQ0FBL0QsT0FBTztLQUFFLENBQUMsR0FBeUMsWUFBWSxDQUF0RCxDQUFDO0tBQUUsUUFBUSxHQUErQixZQUFZLENBQW5ELFFBQVE7S0FBRSxpQkFBaUIsR0FBWSxZQUFZLENBQXpDLGlCQUFpQjtLQUFFLE1BQU0sR0FBSSxZQUFZLENBQXRCLE1BQU07O0FBQzVELEtBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQUksUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFckIsT0FBTSxDQUFDLE9BQU8sR0FB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USxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsTUFBTTtBQUNMLGdCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRDtNQUNGLENBQUM7O0FBRUYsa0JBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGtCQUFhLENBQUMsU0FBUyxlQUFhLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztBQUM3RCxtQkFBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxZQUFPLGFBQWEsQ0FBQztJQUN0QixDQUFDOztBQUVGLFVBQU8sZ0JBQWdCLENBQUM7RUFDekI7O0FBRUQsVUFBUyxzQkFBc0IsR0FBRztBQUNoQyxPQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FBQztBQUNsQyxVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN4RixTQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUMvRixjQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3ZDO0lBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNWOztBQUVELFVBQVMsY0FBYyxHQUFHO0FBQ3hCLFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLG9CQUFvQixHQUFHLEVBRXJFLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDWCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXBpQ2hlY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNWIzNWFmNGVjNDU2MDk4ODEzYlxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9hcGlDaGVjaycpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJjb25zdCBhcGlDaGVja1V0aWwgPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xuY29uc3Qge2VhY2gsIGlzRXJyb3IsIHQsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgdHlwZU9mfSA9IGFwaUNoZWNrVXRpbDtcbmNvbnN0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xubGV0IGRpc2FibGVkID0gZmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpQ2hlY2s7XG5cbmxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gIGRpc2FibGU6ICgpID0+IGRpc2FibGVkID0gdHJ1ZSxcbiAgZW5hYmxlOiAoKSA9PiBkaXNhYmxlZCA9IGZhbHNlLFxuICBnZXRFcnJvck1lc3NhZ2UsXG4gIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgY29uZmlnOiB7XG4gICAgb3V0cHV0OiB7XG4gICAgICBwcmVmaXg6ICcnLFxuICAgICAgc3VmZml4OiAnJyxcbiAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgIH1cbiAgfSxcbiAgdXRpbHM6IGFwaUNoZWNrVXRpbFxufTtcblxuZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gd3JhcHBlcik7XG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuXG5cbmZ1bmN0aW9uIGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjggKi9cbiAgaWYgKGRpc2FibGVkKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGNoZWNrQXBpQ2hlY2tBcGkoYXJndW1lbnRzKTtcbiAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICBsZXQgbWVzc2FnZXM7XG4gIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gIGxldCBlbm91Z2hBcmdzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gIGlmIChlbm91Z2hBcmdzLmxlbmd0aCkge1xuICAgIG1lc3NhZ2VzID0gZW5vdWdoQXJncztcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlcyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgfVxuICBsZXQgcmV0dXJuT2JqZWN0ID0gZ2V0VHlwZXMoYXBpLCBhcmdzKTtcbiAgaWYgKG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgIHJldHVybk9iamVjdC5tZXNzYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMsIG91dHB1dCk7XG4gICAgcmV0dXJuT2JqZWN0LmZhaWxlZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHJldHVybk9iamVjdDtcbn1cblxuZnVuY3Rpb24gY2hlY2tBcGlDaGVja0FwaShhcmdzKSB7XG5cbiAgY29uc3QgcyA9IGNoZWNrZXJzLnN0cmluZztcbiAgY29uc3QgYXBpID0gWyAvLyBkb2cgZm9vZGluZyBoZXJlXG4gICAgY2hlY2tlcnMudHlwZU9yQXJyYXlPZihjaGVja2Vycy5mdW5jKSxcbiAgICBjaGVja2Vycy5hcmdzLFxuICAgIGNoZWNrZXJzLnNoYXBlKHtwcmVmaXg6IHMsIHN1ZmZpeDogcywgdXJsOiBzfSkuc3RyaWN0Lm9wdGlvbmFsXG4gIF07XG4gIGxldCBlcnJvcnMgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgaWYgKCFlcnJvcnMubGVuZ3RoKSB7XG4gICAgZXJyb3JzID0gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpO1xuICB9XG4gIGxldCBtZXNzYWdlO1xuICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgIG1lc3NhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBlcnJvcnMsIHtcbiAgICAgIHByZWZpeDogJ2FwaUNoZWNrJ1xuICAgIH0pO1xuICAgIG1vZHVsZS5leHBvcnRzLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCB0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncykge1xuICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgbGV0IGZhaWxlZCA9IGZhbHNlO1xuICBsZXQgY2hlY2tlckluZGV4ID0gMDtcbiAgbGV0IGFyZ0luZGV4ID0gMDtcbiAgbGV0IGFyZywgY2hlY2tlciwgcmVzO1xuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUoY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK10pIHtcbiAgICBhcmcgPSBhcmdzW2FyZ0luZGV4KytdO1xuICAgIHJlcyA9IGNoZWNrZXIoYXJnLCBudWxsLCAnQXJndW1lbnQgJyArIGFyZ0luZGV4KTtcbiAgICBpZiAoaXNFcnJvcihyZXMpICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBtZXNzYWdlcy5wdXNoKHJlcy5tZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgYXJnSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXMucHVzaChgJHt0KCdBcmd1bWVudCAnICsgYXJnSW5kZXgpfSBwYXNzZWRgKTtcbiAgICB9XG4gIH1cbiAgaWYgKGZhaWxlZCkge1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuICBsZXQgcmVxdWlyZWRBcmdzID0gYXBpLmZpbHRlcihhID0+ICFhLmlzT3B0aW9uYWwpO1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZEFyZ3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFsnTm90IGVub3VnaCBhcmd1bWVudHMgc3BlY2lmaWVkLiBSZXF1aXJlcyBgJyArIHJlcXVpcmVkQXJncy5sZW5ndGggKyAnYCwgeW91IHBhc3NlZCBgJyArIGFyZ3MubGVuZ3RoICsgJ2AnXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRBcGlDaGVjayhzaG91bGRUaHJvdykge1xuICByZXR1cm4gZnVuY3Rpb24gYXBpQ2hlY2tXcmFwcGVyKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICBtb2R1bGUuZXhwb3J0cy5oYW5kbGVFcnJvck1lc3NhZ2UocmVzdWx0Lm1lc3NhZ2UsIHNob3VsZFRocm93KTtcbiAgICByZXR1cm4gcmVzdWx0OyAvLyB3b250IGdldCBoZXJlIGlmIGFuIGVycm9yIGlzIHRocm93blxuICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBnT3V0ID0gbW9kdWxlLmV4cG9ydHMuY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgbGV0IHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gIGxldCBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICBsZXQgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsfWAudHJpbSgpO1xuICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgcmV0dXJuIGAke3ByZWZpeH0gJHttZXNzYWdlfSAke3N1ZmZpeH0gJHt1cmwgfHwgJyd9JHtwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkfWAudHJpbSgpO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncykge1xuICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICBhcmdzID0gYXJyYXlpZnkoYXJncyk7XG4gIGxldCB7YXBpVHlwZXMsIGFyZ1R5cGVzfSA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gIGNvbnN0IHBhc3NlZEFyZ3MgPSBhcmdzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFyZ3MsIG51bGwsIDIpIDogJ25vdGhpbmcnO1xuICBhcmdUeXBlcyA9IGFyZ3MubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoYXJnVHlwZXMsIG51bGwsIDIpIDogJ25vdGhpbmcnO1xuICBhcGlUeXBlcyA9IGFwaVR5cGVzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFwaVR5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgY29uc3QgbiA9ICdcXG4nO1xuICByZXR1cm4gW1xuICAgIGBZb3UgcGFzc2VkOiR7bn0ke3Bhc3NlZEFyZ3N9YCxcbiAgICBgV2l0aCB0aGUgdHlwZXMgb2Y6JHtufSR7YXJnVHlwZXN9YCxcbiAgICBgVGhlIEFQSSBjYWxscyBmb3I6JHtufSR7YXBpVHlwZXN9YFxuICBdLmpvaW4obiArIG4pO1xufVxuXG5mdW5jdGlvbiBnZXRUeXBlcyhhcGksIGFyZ3MpIHtcbiAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICBsZXQgYXBpVHlwZXMgPSBhcGkubWFwKGNoZWNrZXIgPT4ge1xuICAgIHJldHVybiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKTtcbiAgfSk7XG4gIHJldHVybiB7YXJnVHlwZXM6IGFyZ3MubWFwKGdldEFyZ0Rpc3BsYXkpLCBhcGlUeXBlc307XG59XG5cbnZhciBzdHJpbmdpZnlhYmxlID0ge1xuICBPYmplY3Q6IGdldERpc3BsYXksXG4gIEFycmF5OiBnZXREaXNwbGF5XG59O1xuXG5mdW5jdGlvbiBnZXREaXNwbGF5KG9iaikge1xuICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuICBlYWNoKG9iaiwgKHYsaykgPT4gYXJnRGlzcGxheVtrXSA9IGdldEFyZ0Rpc3BsYXkodikpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCAoaywgdikgPT4gYXJnRGlzcGxheVtrXSB8fCB2KTtcbn1cblxuZnVuY3Rpb24gZ2V0QXJnRGlzcGxheShhcmcpIHtcbiAgdmFyIGNOYW1lID0gYXJnICYmIGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZTtcbiAgcmV0dXJuIGNOYW1lID8gc3RyaW5naWZ5YWJsZVtjTmFtZV0gPyBzdHJpbmdpZnlhYmxlW2NOYW1lXShhcmcpIDogY05hbWUgOiBhcmcgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlT2YoYXJnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FwaUNoZWNrLmpzXG4gKiovIiwiY29uc3QgY2hlY2tlckhlbHBlcnMgPSB7XG4gIG1ha2VPcHRpb25hbCwgd3JhcEluU3BlY2lmaWVkLCBzZXR1cENoZWNrZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlYWNoLCBjb3B5LCB0eXBlT2YsIGFycmF5aWZ5LCBnZXRDaGVja2VyRGlzcGxheSwgaXNFcnJvciwgbGlzdCwgZ2V0RXJyb3IsIG5BdEwsIHQsIHVuZGVmLCBjaGVja2VySGVscGVyc1xufTtcblxuZnVuY3Rpb24gY29weShvYmopIHtcbiAgbGV0IHR5cGUgPSB0eXBlT2Yob2JqKTtcbiAgbGV0IGRhQ29weTtcbiAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICBkYUNvcHkgPSBbXTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGRhQ29weSA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4ge1xuICAgIGRhQ29weVtrZXldID0gdmFsOyAvLyBjYW5ub3Qgc2luZ2xlLWxpbmUgdGhpcyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYWJvcnQgdGhlIGVhY2hcbiAgfSk7XG4gIHJldHVybiBkYUNvcHk7XG59XG5cblxuZnVuY3Rpb24gdHlwZU9mKG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIsIHNob3J0KSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgaWYgKHNob3J0ICYmIGNoZWNrZXIuc2hvcnRUeXBlKSB7XG4gICAgcmV0dXJuIGNoZWNrZXIuc2hvcnRUeXBlO1xuICB9IGVsc2UgaWYgKCFzaG9ydCAmJiB0eXBlb2YgY2hlY2tlci50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBjaGVja2VyLnR5cGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChjaGVja2VyLnR5cGUgfHwgY2hlY2tlci5kaXNwbGF5TmFtZSB8fCBjaGVja2VyLm5hbWUpICsgKGNoZWNrZXIuaXNPcHRpb25hbCA/ICcgKG9wdGlvbmFsKScgOiAnJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gIGlmICghb2JqKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtvYmpdO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gZWFjaEFycnkoLi4uYXJndW1lbnRzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWFjaE9iaiguLi5hcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2hPYmoob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICB2YXIgcmV0O1xuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBlYWNoQXJyeShvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0Vycm9yKG9iaikge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3I7XG59XG5cbmZ1bmN0aW9uIGxpc3QoYXJyeSwgam9pbiwgZmluYWxKb2luKSB7XG4gIGFycnkgPSBhcnJheWlmeShhcnJ5KTtcbiAgbGV0IGNvcHkgPSBhcnJ5LnNsaWNlKCk7XG4gIGxldCBsYXN0ID0gY29weS5wb3AoKTtcbiAgaWYgKGNvcHkubGVuZ3RoID09PSAxKSB7XG4gICAgam9pbiA9ICcgJztcbiAgfVxuICByZXR1cm4gY29weS5qb2luKGpvaW4pICsgYCR7Y29weS5sZW5ndGggPyBqb2luICsgZmluYWxKb2luIDogJyd9JHtsYXN0fWA7XG59XG5cblxuZnVuY3Rpb24gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIGNoZWNrZXJUeXBlKSB7XG4gIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgY2hlY2tlclR5cGUgIT09ICdvYmplY3QnID8gY2hlY2tlclR5cGUgOiBKU09OLnN0cmluZ2lmeShjaGVja2VyVHlwZSk7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IG11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xufVxuXG5mdW5jdGlvbiBuQXRMKG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IHROYW1lID0gdChuYW1lIHx8ICd2YWx1ZScpO1xuICBsZXQgdExvY2F0aW9uID0gdW5kZWYobG9jYXRpb24pID8gJycgOiAnIGF0ICcgKyB0KGxvY2F0aW9uKTtcbiAgcmV0dXJuIGAke3ROYW1lfSR7dExvY2F0aW9ufWA7XG59XG5cbmZ1bmN0aW9uIHQodGhpbmcpIHtcbiAgcmV0dXJuICdgJyArIHRoaW5nICsgJ2AnO1xufVxuXG5mdW5jdGlvbiB1bmRlZih0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJztcbn1cblxuXG5cblxuZnVuY3Rpb24gbWFrZU9wdGlvbmFsKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5vcHRpb25hbCA9IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKCF1bmRlZih2YWwpKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfTtcbiAgY2hlY2tlci5vcHRpb25hbC5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY2hlY2tlci50eXBlO1xuICBpZiAodHlwZW9mIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBjb3B5KGNoZWNrZXIub3B0aW9uYWwudHlwZSk7IC8vIG1ha2Ugb3VyIG93biBjb3B5IG9mIHRoaXNcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KGNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSkgfHwge307IC8vIGFuZCB0aGlzXG4gICAgY2hlY2tlci5vcHRpb25hbC50eXBlLl9fYXBpQ2hlY2tEYXRhLm9wdGlvbmFsID0gdHJ1ZTtcbiAgfVxuICBjaGVja2VyLm9wdGlvbmFsLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZTtcbn1cblxuZnVuY3Rpb24gd3JhcEluU3BlY2lmaWVkKGZuLCB0eXBlLCBzaG9ydFR5cGUpIHtcbiAgZm4udHlwZSA9IHR5cGU7XG4gIGZuLnNob3J0VHlwZSA9IHNob3J0VHlwZTtcbiAgZnVuY3Rpb24gc3BlY2lmaWVkQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBjb25zdCB1ID0gdW5kZWYodmFsKTtcbiAgICBpZiAodSAmJiAhZm4uaXNPcHRpb25hbCkge1xuICAgICAgbGV0IHRMb2NhdGlvbiA9IGxvY2F0aW9uID8gYCBpbiAke3QobG9jYXRpb24pfWAgOiAnJztcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDaGVja2VyRGlzcGxheShmbiwgdHJ1ZSk7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlKTtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0eXBlKTtcbiAgICAgIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcgPyB0eXBlIDogSlNPTi5zdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4odmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc3BlY2lmaWVkQ2hlY2tlci50eXBlID0gZm4udHlwZTtcbiAgc3BlY2lmaWVkQ2hlY2tlci5zaG9ydFR5cGUgPSBmbi5zaG9ydFR5cGU7XG4gIHNwZWNpZmllZENoZWNrZXIubm90T3B0aW9uYWwgPSBmbi5ub3RPcHRpb25hbDtcbiAgc3BlY2lmaWVkQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gZm4uY2hpbGRyZW5DaGVja2VycztcbiAgc2V0dXBDaGVja2VyKHNwZWNpZmllZENoZWNrZXIpO1xuICBzZXR1cENoZWNrZXIoZm4pO1xuICByZXR1cm4gc3BlY2lmaWVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gc2V0dXBDaGVja2VyKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIG1ha2VPcHRpb25hbChjaGVja2VyKTtcbiAgfVxuICBlYWNoKGNoZWNrZXIuY2hpbGRyZW5DaGVja2VycywgY2hpbGROYW1lID0+IHtcbiAgICBzZXR1cENoZWNrZXIoY2hlY2tlcltjaGlsZE5hbWVdKTtcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnNcbiAgfSA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5cbmxldCBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheTogZ2V0VHlwZU9mQ2hlY2tlcignQXJyYXknKSxcbiAgYm9vbDogZ2V0VHlwZU9mQ2hlY2tlcignQm9vbGVhbicpLFxuICBmdW5jOiBnZXRUeXBlT2ZDaGVja2VyKCdGdW5jdGlvbicpLFxuICBudW1iZXI6IGdldFR5cGVPZkNoZWNrZXIoJ051bWJlcicpLFxuICBzdHJpbmc6IGdldFR5cGVPZkNoZWNrZXIoJ1N0cmluZycpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgc2hhcGU6IGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSxcbiAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gIGFueTogYW55Q2hlY2tHZXR0ZXIoKVxufTtcblxuZWFjaChjaGVja2VycywgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKTtcblxuXG5mdW5jdGlvbiBnZXRUeXBlT2ZDaGVja2VyKHR5cGUpIHtcbiAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gdHlwZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0Q2hlY2tlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgbGV0IG9iamVjdE51bGxPa0NoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0TnVsbE9rQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgIH1cbiAgfSwgbnVsbFR5cGUpO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xuXG4gIG9iamVjdENoZWNrZXIubnVsbE9rID0gb2JqZWN0TnVsbE9rQ2hlY2tlcjtcbiAgb2JqZWN0Q2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWydudWxsT2snXTtcblxuICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcbn1cblxuXG5mdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaykpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2xhc3NUb0NoZWNrLm5hbWUpO1xuICAgIH1cbiAgfSwgY2xhc3NUb0NoZWNrLm5hbWUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgZW51bTogZW51bXNcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYGVudW1bJHtlbnVtcy5qb2luKCcsICcpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9uZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghZW51bXMuc29tZShlbm0gPT4gZW5tID09PSB2YWwpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb25lT2YnfSxcbiAgICBvbmVPZjogY2hlY2tlcnMubWFwKGdldENoZWNrZXJEaXNwbGF5KVxuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZbJHtjaGVja2Vycy5tYXAoZ2V0Q2hlY2tlckRpc3BsYXkpLmpvaW4oJywgJyl9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghY2hlY2tlcnMuc29tZShjaGVja2VyID0+ICFpc0Vycm9yKGNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbikpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ2FycmF5T2YnfSxcbiAgICBhcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgYXJyYXlPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFycmF5T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKGlzRXJyb3IoY2hlY2tlcnMuYXJyYXkodmFsKSkgfHwgIXZhbC5ldmVyeSgoaXRlbSkgPT4gIWlzRXJyb3IoY2hlY2tlcihpdGVtKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ29iamVjdE9mJ30sXG4gICAgb2JqZWN0T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBvYmplY3RPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGNvbnN0IGlzT2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgIGlmIChpc0Vycm9yKGlzT2JqZWN0KSkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgIH1cbiAgICBjb25zdCBhbGxUeXBlc1N1Y2Nlc3MgPSBlYWNoKHZhbCwgKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgaWYgKGlzRXJyb3IoY2hlY2tlcihpdGVtLCBrZXksIG5hbWUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhbGxUeXBlc1N1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPckFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICd0eXBlT3JBcnJheU9mJ30sXG4gICAgdHlwZU9yQXJyYXlPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYHR5cGVPckFycmF5T2ZbJHtnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiB0eXBlT3JBcnJheU9mRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5vbmVPZlR5cGUoW2NoZWNrZXIsIGNoZWNrZXJzLmFycmF5T2YoY2hlY2tlcildKSh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSkge1xuICAgIGxldCBjb3BpZWRTaGFwZSA9IGNvcHkoc2hhcGUpO1xuICAgIGVhY2goY29waWVkU2hhcGUsICh2YWwsIHByb3ApID0+IHtcbiAgICAgIGNvcGllZFNoYXBlW3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkodmFsKTtcbiAgICB9KTtcbiAgICBjb25zdCB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGE6IHtzdHJpY3Q6IGZhbHNlLCBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzaGFwZSd9LFxuICAgICAgc2hhcGU6IGNvcGllZFNoYXBlXG4gICAgfTtcbiAgICBsZXQgc2hhcGVDaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIHNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgbGV0IGlzT2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3IoaXNPYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgIH1cbiAgICAgIGxldCBzaGFwZVByb3BFcnJvcjtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgIHNoYXBlUHJvcEVycm9yID0gY2hlY2tlcih2YWxbcHJvcF0sIHByb3AsIG5hbWUsIHZhbCk7XG4gICAgICAgICAgcmV0dXJuICFpc0Vycm9yKHNoYXBlUHJvcEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZVByb3BFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlUHJvcEVycm9yO1xuICAgICAgfVxuICAgIH0sIHR5cGUsICdzaGFwZScpO1xuXG4gICAgbGV0IHN0cmljdFR5cGUgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhID0gY29weShzaGFwZUNoZWNrZXIudHlwZS5fX2FwaUNoZWNrRGF0YSk7XG4gICAgc3RyaWN0VHlwZS5fX2FwaUNoZWNrRGF0YS5zdHJpY3QgPSB0cnVlO1xuICAgIHNoYXBlQ2hlY2tlci5zdHJpY3QgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gc3RyaWN0U2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBjb25zdCBzaGFwZUVycm9yID0gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlRXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNoYXBlKTtcbiAgICAgIGNvbnN0IGV4dHJhUHJvcHMgPSBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihwcm9wID0+IGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPT09IC0xKTtcbiAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICAgIGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBjYW5ub3QgaGF2ZSBleHRyYSBwcm9wZXJ0aWVzOiAke3QoZXh0cmFQcm9wcy5qb2luKCdgLCBgJykpfS5gICtcbiAgICAgICAgICBgSXQgaXMgbGltaXRlZCB0byAke3QoYWxsb3dlZFByb3BlcnRpZXMuam9pbignYCwgYCcpKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgc3RyaWN0VHlwZSwgJ3N0cmljdCBzaGFwZScpO1xuICAgIHNoYXBlQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWydzdHJpY3QnXTtcbiAgICBjaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIoc2hhcGVDaGVja2VyKTtcblxuICAgIHJldHVybiBzaGFwZUNoZWNrZXI7XG4gIH1cblxuICBzaGFwZUNoZWNrR2V0dGVyLmlmTm90ID0gZnVuY3Rpb24gaWZOb3Qob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgfVxuICAgIGxldCB0eXBlO1xuICAgIGlmIChvdGhlclByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdHlwZSA9IGBzcGVjaWZpZWQgb25seSBpZiAke290aGVyUHJvcHNbMF19IGlzIG5vdCBzcGVjaWZpZWRgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmIG5vbmUgb2YgdGhlIGZvbGxvd2luZyBhcmUgc3BlY2lmaWVkOiBbJHtsaXN0KG90aGVyUHJvcHMsICcsICcsICdhbmQgJyl9XWA7XG4gICAgfVxuICAgIGxldCBpZk5vdENoZWNrZXIgPSBmdW5jdGlvbiBpZk5vdENoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBsZXQgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgbGV0IG90aGVyUHJvcHNFeGlzdCA9IG90aGVyUHJvcHMuc29tZShvdGhlclByb3AgPT4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApKTtcbiAgICAgIGlmIChwcm9wRXhpc3RzID09PSBvdGhlclByb3BzRXhpc3QpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgaWZOb3RDaGVja2VyLnR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmTm90Q2hlY2tlci50eXBlID0gdHlwZTtcbiAgICBpZk5vdENoZWNrZXIuc2hvcnRUeXBlID0gYGlmTm90WyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihpZk5vdENoZWNrZXIpO1xuICAgIHJldHVybiBpZk5vdENoZWNrZXI7XG4gIH07XG5cbiAgc2hhcGVDaGVja0dldHRlci5vbmx5SWYgPSBmdW5jdGlvbiBvbmx5SWYob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBvdGhlclByb3BzID0gYXJyYXlpZnkob3RoZXJQcm9wcyk7XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgYWxzbyBzcGVjaWZpZWRgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IG9ubHlJZkNoZWNrZXIgPSBmdW5jdGlvbiBvbmx5SWZDaGVja2VyRGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgY29uc3Qgb3RoZXJzUHJlc2VudCA9IG90aGVyUHJvcHMuZXZlcnkocHJvcCA9PiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpO1xuICAgICAgaWYgKCFvdGhlcnNQcmVzZW50KSB7XG4gICAgICAgIHJldHVybiBnZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIG9ubHlJZkNoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvbmx5SWZDaGVja2VyLnR5cGUgPSB0eXBlO1xuICAgIG9ubHlJZkNoZWNrZXIuc2hvcnRUeXBlID0gYG9ubHlJZlske290aGVyUHJvcHMuam9pbignLCAnKX1dYDtcbiAgICBjaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIob25seUlmQ2hlY2tlcik7XG4gICAgcmV0dXJuIG9ubHlJZkNoZWNrZXI7XG4gIH07XG5cbiAgcmV0dXJuIHNoYXBlQ2hlY2tHZXR0ZXI7XG59XG5cbmZ1bmN0aW9uIGFyZ3VtZW50c0NoZWNrZXJHZXR0ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAnZnVuY3Rpb24gYXJndW1lbnRzJztcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBhcmdzQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgfHwgaXNFcnJvcihjaGVja2Vycy5vYmplY3QodmFsKSkgfHwgaXNFcnJvcihjaGVja2Vycy5udW1iZXIodmFsLmxlbmd0aCkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG59XG5cbmZ1bmN0aW9uIGFueUNoZWNrR2V0dGVyKCkge1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFueUNoZWNrZXJEZWZpbml0aW9uKCkge1xuICAgIC8vIGRvbid0IGRvIGFueXRoaW5nXG4gIH0sICdhbnknKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2NoZWNrZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiYXBpQ2hlY2suanMifQ==