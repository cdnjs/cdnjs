// apiCheck.js v3.0.4 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	    __apiCheckData: { optional: false, type: "oneOfType" },
	    oneOfType: checkers.map(function (checker) {
	      return getCheckerDisplay(checker);
	    })
	  };
	  var shortType = "oneOfType[" + checkers.map(function (checker) {
	    return getCheckerDisplay(checker, true);
	  }).join(", ") + "]";
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
	    var shapeTypes = {};
	    each(shape, function (val, prop) {
	      shapeTypes[prop] = getCheckerDisplay(val);
	    });
	    var type = {
	      __apiCheckData: { strict: false, optional: false, type: "shape" },
	      shape: shapeTypes
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZDgyOTU1YmE3ZjgwMTZkMzQ3NCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUFxRCxZQUFZLENBQXJFLElBQUk7S0FBRSxPQUFPLEdBQTRDLFlBQVksQ0FBL0QsT0FBTztLQUFFLENBQUMsR0FBeUMsWUFBWSxDQUF0RCxDQUFDO0tBQUUsUUFBUSxHQUErQixZQUFZLENBQW5ELFFBQVE7S0FBRSxpQkFBaUIsR0FBWSxZQUFZLENBQXpDLGlCQUFpQjtLQUFFLE1BQU0sR0FBSSxZQUFZLENBQXRCLE1BQU07O0FBQzVELEtBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQUksUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFckIsT0FBTSxDQUFDLE9BQU8sR0FB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QUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQ7TUFDRixDQUFDOztBQUVGLGtCQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUMxQixrQkFBYSxDQUFDLFNBQVMsZUFBYSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFHLENBQUM7QUFDN0QsbUJBQWMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsWUFBTyxhQUFhLENBQUM7SUFDdEIsQ0FBQzs7QUFFRixVQUFPLGdCQUFnQixDQUFDO0VBQ3pCOztBQUVELFVBQVMsc0JBQXNCLEdBQUc7QUFDaEMsT0FBTSxJQUFJLEdBQUcsb0JBQW9CLENBQUM7QUFDbEMsVUFBTyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDeEYsU0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7QUFDL0YsY0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN2QztJQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDVjs7QUFFRCxVQUFTLGNBQWMsR0FBRztBQUN4QixVQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxvQkFBb0IsR0FBRyxFQUVyRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQ1giLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgM2Q4Mjk1NWJhN2Y4MDE2ZDM0NzRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwiY29uc3QgYXBpQ2hlY2tVdGlsID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbmNvbnN0IHtlYWNoLCBpc0Vycm9yLCB0LCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZn0gPSBhcGlDaGVja1V0aWw7XG5jb25zdCBjaGVja2VycyA9IHJlcXVpcmUoJy4vY2hlY2tlcnMnKTtcbmxldCBkaXNhYmxlZCA9IGZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwaUNoZWNrO1xuXG5sZXQgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7XG4gIHRocm93OiBnZXRBcGlDaGVjayh0cnVlKSxcbiAgd2FybjogZ2V0QXBpQ2hlY2soZmFsc2UpLFxuICBkaXNhYmxlOiAoKSA9PiBkaXNhYmxlZCA9IHRydWUsXG4gIGVuYWJsZTogKCkgPT4gZGlzYWJsZWQgPSBmYWxzZSxcbiAgZ2V0RXJyb3JNZXNzYWdlLFxuICBoYW5kbGVFcnJvck1lc3NhZ2UsXG4gIGNvbmZpZzoge1xuICAgIG91dHB1dDoge1xuICAgICAgcHJlZml4OiAnJyxcbiAgICAgIHN1ZmZpeDogJycsXG4gICAgICBkb2NzQmFzZVVybDogJydcbiAgICB9XG4gIH0sXG4gIHV0aWxzOiBhcGlDaGVja1V0aWxcbn07XG5cbmVhY2goYWRkaXRpb25hbFByb3BlcnRpZXMsICh3cmFwcGVyLCBuYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1tuYW1lXSA9IHdyYXBwZXIpO1xuZWFjaChjaGVja2VycywgKGNoZWNrZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gY2hlY2tlcik7XG5cblxuXG5mdW5jdGlvbiBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo4ICovXG4gIGlmIChkaXNhYmxlZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjaGVja0FwaUNoZWNrQXBpKGFyZ3VtZW50cyk7XG4gIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgbGV0IG1lc3NhZ2VzO1xuICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICBsZXQgZW5vdWdoQXJncyA9IGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpO1xuICBpZiAoZW5vdWdoQXJncy5sZW5ndGgpIHtcbiAgICBtZXNzYWdlcyA9IGVub3VnaEFyZ3M7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZXMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncyk7XG4gIH1cbiAgbGV0IHJldHVybk9iamVjdCA9IGdldFR5cGVzKGFwaSwgYXJncyk7XG4gIGlmIChtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICByZXR1cm5PYmplY3QubWVzc2FnZSA9IG1vZHVsZS5leHBvcnRzLmdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIG1lc3NhZ2VzLCBvdXRwdXQpO1xuICAgIHJldHVybk9iamVjdC5mYWlsZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiByZXR1cm5PYmplY3Q7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQXBpQ2hlY2tBcGkoYXJncykge1xuXG4gIGNvbnN0IHMgPSBjaGVja2Vycy5zdHJpbmc7XG4gIGNvbnN0IGFwaSA9IFsgLy8gZG9nIGZvb2RpbmcgaGVyZVxuICAgIGNoZWNrZXJzLnR5cGVPckFycmF5T2YoY2hlY2tlcnMuZnVuYyksXG4gICAgY2hlY2tlcnMuYXJncyxcbiAgICBjaGVja2Vycy5zaGFwZSh7cHJlZml4OiBzLCBzdWZmaXg6IHMsIHVybDogc30pLnN0cmljdC5vcHRpb25hbFxuICBdO1xuICBsZXQgZXJyb3JzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncyk7XG4gIGlmICghZXJyb3JzLmxlbmd0aCkge1xuICAgIGVycm9ycyA9IGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKTtcbiAgfVxuICBsZXQgbWVzc2FnZTtcbiAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICBtZXNzYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgZXJyb3JzLCB7XG4gICAgICBwcmVmaXg6ICdhcGlDaGVjaydcbiAgICB9KTtcbiAgICBtb2R1bGUuZXhwb3J0cy5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgdHJ1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IG1lc3NhZ2VzID0gW107XG4gIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgbGV0IGNoZWNrZXJJbmRleCA9IDA7XG4gIGxldCBhcmdJbmRleCA9IDA7XG4gIGxldCBhcmcsIGNoZWNrZXIsIHJlcztcbiAgLyoganNoaW50IC1XMDg0ICovXG4gIHdoaWxlKGNoZWNrZXIgPSBhcGlbY2hlY2tlckluZGV4KytdKSB7XG4gICAgYXJnID0gYXJnc1thcmdJbmRleCsrXTtcbiAgICByZXMgPSBjaGVja2VyKGFyZywgbnVsbCwgJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCk7XG4gICAgaWYgKGlzRXJyb3IocmVzKSAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgbWVzc2FnZXMucHVzaChyZXMubWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzLnB1c2goYCR7dCgnQXJndW1lbnQgJyArIGFyZ0luZGV4KX0gcGFzc2VkYCk7XG4gICAgfVxuICB9XG4gIGlmIChmYWlsZWQpIHtcbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpIHtcbiAgbGV0IHJlcXVpcmVkQXJncyA9IGFwaS5maWx0ZXIoYSA9PiAhYS5pc09wdGlvbmFsKTtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWRBcmdzLmxlbmd0aCkge1xuICAgIHJldHVybiBbJ05vdCBlbm91Z2ggYXJndW1lbnRzIHNwZWNpZmllZC4gUmVxdWlyZXMgYCcgKyByZXF1aXJlZEFyZ3MubGVuZ3RoICsgJ2AsIHlvdSBwYXNzZWQgYCcgKyBhcmdzLmxlbmd0aCArICdgJ107XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0QXBpQ2hlY2soc2hvdWxkVGhyb3cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFwaUNoZWNrV3JhcHBlcihhcGksIGFyZ3MsIG91dHB1dCkge1xuICAgIGxldCByZXN1bHQgPSBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCk7XG4gICAgbW9kdWxlLmV4cG9ydHMuaGFuZGxlRXJyb3JNZXNzYWdlKHJlc3VsdC5tZXNzYWdlLCBzaG91bGRUaHJvdyk7XG4gICAgcmV0dXJuIHJlc3VsdDsgLy8gd29udCBnZXQgaGVyZSBpZiBhbiBlcnJvciBpcyB0aHJvd25cbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG4gIGlmIChzaG91bGRUaHJvdyAmJiBtZXNzYWdlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGFwaSwgYXJncywgbWVzc2FnZXMgPSBbXSwgb3V0cHV0ID0ge30pIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBsZXQgZ091dCA9IG1vZHVsZS5leHBvcnRzLmNvbmZpZy5vdXRwdXQgfHwge307XG4gIGxldCBwcmVmaXggPSBgJHtnT3V0LnByZWZpeCB8fCAnJ30gJHtvdXRwdXQucHJlZml4IHx8ICcnfWAudHJpbSgpO1xuICBsZXQgc3VmZml4ID0gYCR7b3V0cHV0LnN1ZmZpeCB8fCAnJ30gJHtnT3V0LnN1ZmZpeCB8fCAnJ31gLnRyaW0oKTtcbiAgbGV0IHVybCA9IGdPdXQuZG9jc0Jhc2VVcmwgJiYgb3V0cHV0LnVybCAmJiBgJHtnT3V0LmRvY3NCYXNlVXJsfSR7b3V0cHV0LnVybH1gLnRyaW0oKTtcbiAgbGV0IG1lc3NhZ2UgPSBgYXBpQ2hlY2sgZmFpbGVkISAke21lc3NhZ2VzLmpvaW4oJywgJyl9YDtcbiAgdmFyIHBhc3NlZEFuZFNob3VsZEhhdmVQYXNzZWQgPSAnXFxuXFxuJyArIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncyk7XG4gIHJldHVybiBgJHtwcmVmaXh9ICR7bWVzc2FnZX0gJHtzdWZmaXh9ICR7dXJsIHx8ICcnfSR7cGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZH1gLnRyaW0oKTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcbiAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgYXJncyA9IGFycmF5aWZ5KGFyZ3MpO1xuICBsZXQge2FwaVR5cGVzLCBhcmdUeXBlc30gPSBnZXRUeXBlcyhhcGksIGFyZ3MpO1xuICBjb25zdCBwYXNzZWRBcmdzID0gYXJncy5sZW5ndGggPyBKU09OLnN0cmluZ2lmeShhcmdzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgYXJnVHlwZXMgPSBhcmdzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGFyZ1R5cGVzLCBudWxsLCAyKSA6ICdub3RoaW5nJztcbiAgYXBpVHlwZXMgPSBhcGlUeXBlcy5sZW5ndGggPyBKU09OLnN0cmluZ2lmeShhcGlUeXBlcywgbnVsbCwgMikgOiAnbm90aGluZyc7XG4gIGNvbnN0IG4gPSAnXFxuJztcbiAgcmV0dXJuIFtcbiAgICBgWW91IHBhc3NlZDoke259JHtwYXNzZWRBcmdzfWAsXG4gICAgYFdpdGggdGhlIHR5cGVzIG9mOiR7bn0ke2FyZ1R5cGVzfWAsXG4gICAgYFRoZSBBUEkgY2FsbHMgZm9yOiR7bn0ke2FwaVR5cGVzfWBcbiAgXS5qb2luKG4gKyBuKTtcbn1cblxuZnVuY3Rpb24gZ2V0VHlwZXMoYXBpLCBhcmdzKSB7XG4gIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgbGV0IGFwaVR5cGVzID0gYXBpLm1hcChjaGVja2VyID0+IHtcbiAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcik7XG4gIH0pO1xuICBsZXQgYXJnVHlwZXMgPSBhcmdzLm1hcChnZXRBcmdEaXNwbGF5KTtcbiAgcmV0dXJuIHthcmdUeXBlczogYXJnVHlwZXMsIGFwaVR5cGVzfTtcbn1cblxudmFyIGVhY2hhYmxlID0ge1xuICBPYmplY3Q6IGdldERpc3BsYXksXG4gIEFycmF5OiBnZXREaXNwbGF5XG59O1xuXG5mdW5jdGlvbiBnZXREaXNwbGF5KG9iaikge1xuICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuICBlYWNoKG9iaiwgKHYsaykgPT4gYXJnRGlzcGxheVtrXSA9IGdldEFyZ0Rpc3BsYXkodikpO1xuICByZXR1cm4gYXJnRGlzcGxheTtcbn1cblxuZnVuY3Rpb24gZ2V0QXJnRGlzcGxheShhcmcpIHtcbiAgdmFyIGNOYW1lID0gYXJnICYmIGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZTtcbiAgcmV0dXJuIGNOYW1lID8gZWFjaGFibGVbY05hbWVdID8gZWFjaGFibGVbY05hbWVdKGFyZykgOiBjTmFtZSA6IGFyZyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVPZihhcmcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgbWFrZU9wdGlvbmFsLCB3cmFwSW5TcGVjaWZpZWQsIHNldHVwQ2hlY2tlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2gsIGNvcHksIHR5cGVPZiwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgdW5kZWYsIGNoZWNrZXJIZWxwZXJzXG59O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICBsZXQgdHlwZSA9IHR5cGVPZihvYmopO1xuICBsZXQgZGFDb3B5O1xuICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGRhQ29weSA9IFtdO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgZGFDb3B5ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBlYWNoKG9iaiwgKHZhbCwga2V5KSA9PiB7XG4gICAgZGFDb3B5W2tleV0gPSB2YWw7IC8vIGNhbm5vdCBzaW5nbGUtbGluZSB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBhYm9ydCB0aGUgZWFjaFxuICB9KTtcbiAgcmV0dXJuIGRhQ29weTtcbn1cblxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlciwgc2hvcnQpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICBpZiAoc2hvcnQgJiYgY2hlY2tlci5zaG9ydFR5cGUpIHtcbiAgICByZXR1cm4gY2hlY2tlci5zaG9ydFR5cGU7XG4gIH0gZWxzZSBpZiAoIXNob3J0ICYmIHR5cGVvZiBjaGVja2VyLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGNoZWNrZXIudHlwZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKGNoZWNrZXIudHlwZSB8fCBjaGVja2VyLmRpc3BsYXlOYW1lIHx8IGNoZWNrZXIubmFtZSkgKyAoY2hlY2tlci5pc09wdGlvbmFsID8gJyAob3B0aW9uYWwpJyA6ICcnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuZnVuY3Rpb24gbGlzdChhcnJ5LCBqb2luLCBmaW5hbEpvaW4pIHtcbiAgYXJyeSA9IGFycmF5aWZ5KGFycnkpO1xuICBsZXQgY29weSA9IGFycnkuc2xpY2UoKTtcbiAgbGV0IGxhc3QgPSBjb3B5LnBvcCgpO1xuICBpZiAoY29weS5sZW5ndGggPT09IDEpIHtcbiAgICBqb2luID0gJyAnO1xuICB9XG4gIHJldHVybiBjb3B5LmpvaW4oam9pbikgKyBgJHtjb3B5Lmxlbmd0aCA/IGpvaW4gKyBmaW5hbEpvaW4gOiAnJ30ke2xhc3R9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGUpIHtcbiAgY29uc3Qgc3RyaW5nVHlwZSA9IHR5cGVvZiBjaGVja2VyVHlwZSAhPT0gJ29iamVjdCcgPyBjaGVja2VyVHlwZSA6IEpTT04uc3RyaW5naWZ5KGNoZWNrZXJUeXBlKTtcbiAgcmV0dXJuIG5ldyBFcnJvcihgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gbXVzdCBiZSAke3Qoc3RyaW5nVHlwZSl9YCk7XG59XG5cbmZ1bmN0aW9uIG5BdEwobmFtZSwgbG9jYXRpb24pIHtcbiAgY29uc3QgdE5hbWUgPSB0KG5hbWUgfHwgJ3ZhbHVlJyk7XG4gIGxldCB0TG9jYXRpb24gPSB1bmRlZihsb2NhdGlvbikgPyAnJyA6ICcgYXQgJyArIHQobG9jYXRpb24pO1xuICByZXR1cm4gYCR7dE5hbWV9JHt0TG9jYXRpb259YDtcbn1cblxuZnVuY3Rpb24gdCh0aGluZykge1xuICByZXR1cm4gJ2AnICsgdGhpbmcgKyAnYCc7XG59XG5cbmZ1bmN0aW9uIHVuZGVmKHRoaW5nKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cblxuXG5mdW5jdGlvbiBtYWtlT3B0aW9uYWwoY2hlY2tlcikge1xuICBjaGVja2VyLm9wdGlvbmFsID0gZnVuY3Rpb24gb3B0aW9uYWxDaGVjayh2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICBpZiAoIXVuZGVmKHZhbCkpIHtcbiAgICAgIHJldHVybiBjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9O1xuICBjaGVja2VyLm9wdGlvbmFsLmlzT3B0aW9uYWwgPSB0cnVlO1xuICBjaGVja2VyLm9wdGlvbmFsLnR5cGUgPSBjaGVja2VyLnR5cGU7XG4gIGlmICh0eXBlb2YgY2hlY2tlci5vcHRpb25hbC50eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNvcHkoY2hlY2tlci5vcHRpb25hbC50eXBlKTsgLy8gbWFrZSBvdXIgb3duIGNvcHkgb2YgdGhpc1xuICAgIGNoZWNrZXIub3B0aW9uYWwudHlwZS5fX2FwaUNoZWNrRGF0YSA9IGNvcHkoY2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKSB8fCB7fTsgLy8gYW5kIHRoaXNcbiAgICBjaGVja2VyLm9wdGlvbmFsLnR5cGUuX19hcGlDaGVja0RhdGEub3B0aW9uYWwgPSB0cnVlO1xuICB9XG4gIGNoZWNrZXIub3B0aW9uYWwuZGlzcGxheU5hbWUgPSBjaGVja2VyLmRpc3BsYXlOYW1lO1xufVxuXG5mdW5jdGlvbiB3cmFwSW5TcGVjaWZpZWQoZm4sIHR5cGUsIHNob3J0VHlwZSkge1xuICBmbi50eXBlID0gdHlwZTtcbiAgZm4uc2hvcnRUeXBlID0gc2hvcnRUeXBlO1xuICBmdW5jdGlvbiBzcGVjaWZpZWRDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGNvbnN0IHUgPSB1bmRlZih2YWwpO1xuICAgIGlmICh1ICYmICFmbi5pc09wdGlvbmFsKSB7XG4gICAgICBsZXQgdExvY2F0aW9uID0gbG9jYXRpb24gPyBgIGluICR7dChsb2NhdGlvbil9YCA6ICcnO1xuICAgICAgY29uc3QgdHlwZSA9IGdldENoZWNrZXJEaXNwbGF5KGZuLCB0cnVlKTtcbiAgICAgIGNvbnN0IHN0cmluZ1R5cGUgPSB0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcgPyB0eXBlIDogSlNPTi5zdHJpbmdpZnkodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBSZXF1aXJlZCAke3QobmFtZSl9IG5vdCBzcGVjaWZpZWQke3RMb2NhdGlvbn0uIE11c3QgYmUgJHt0KHN0cmluZ1R5cGUpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4odmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc3BlY2lmaWVkQ2hlY2tlci50eXBlID0gZm4udHlwZTtcbiAgc3BlY2lmaWVkQ2hlY2tlci5zaG9ydFR5cGUgPSBmbi5zaG9ydFR5cGU7XG4gIHNwZWNpZmllZENoZWNrZXIubm90T3B0aW9uYWwgPSBmbi5ub3RPcHRpb25hbDtcbiAgc3BlY2lmaWVkQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gZm4uY2hpbGRyZW5DaGVja2VycztcbiAgc2V0dXBDaGVja2VyKHNwZWNpZmllZENoZWNrZXIpO1xuICBzZXR1cENoZWNrZXIoZm4pO1xuICByZXR1cm4gc3BlY2lmaWVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gc2V0dXBDaGVja2VyKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIG1ha2VPcHRpb25hbChjaGVja2VyKTtcbiAgfVxuICBlYWNoKGNoZWNrZXIuY2hpbGRyZW5DaGVja2VycywgY2hpbGROYW1lID0+IHtcbiAgICBzZXR1cENoZWNrZXIoY2hlY2tlcltjaGlsZE5hbWVdKTtcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnNcbiAgfSA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5cbmxldCBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheTogZ2V0VHlwZU9mQ2hlY2tlcignQXJyYXknKSxcbiAgYm9vbDogZ2V0VHlwZU9mQ2hlY2tlcignQm9vbGVhbicpLFxuICBmdW5jOiBnZXRUeXBlT2ZDaGVja2VyKCdGdW5jdGlvbicpLFxuICBudW1iZXI6IGdldFR5cGVPZkNoZWNrZXIoJ051bWJlcicpLFxuICBzdHJpbmc6IGdldFR5cGVPZkNoZWNrZXIoJ1N0cmluZycpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgc2hhcGU6IGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSxcbiAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gIGFueTogYW55Q2hlY2tHZXR0ZXIoKVxufTtcblxuZWFjaChjaGVja2VycywgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKTtcblxuXG5mdW5jdGlvbiBnZXRUeXBlT2ZDaGVja2VyKHR5cGUpIHtcbiAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gdHlwZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0Q2hlY2tlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3QgKG51bGwgb2spJztcbiAgbGV0IG9iamVjdE51bGxPa0NoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0TnVsbE9rQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgbnVsbFR5cGUpO1xuICAgIH1cbiAgfSwgbnVsbFR5cGUpO1xuXG4gIGxldCBvYmplY3RDaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9iamVjdENoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IGlzRXJyb3Iob2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgb2JqZWN0Q2hlY2tlci50eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xuXG4gIG9iamVjdENoZWNrZXIubnVsbE9rID0gb2JqZWN0TnVsbE9rQ2hlY2tlcjtcbiAgb2JqZWN0Q2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gWydudWxsT2snXTtcblxuICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcbn1cblxuXG5mdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaykpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2xhc3NUb0NoZWNrLm5hbWUpO1xuICAgIH1cbiAgfSwgY2xhc3NUb0NoZWNrLm5hbWUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGNvbnN0IHR5cGUgPSB7XG4gICAgX19hcGlDaGVja0RhdGE6IHtvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdlbnVtJ30sXG4gICAgZW51bTogZW51bXNcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYGVudW1bJHtlbnVtcy5qb2luKCcsICcpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9uZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICghZW51bXMuc29tZShlbm0gPT4gZW5tID09PSB2YWwpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb25lT2ZUeXBlJ30sXG4gICAgb25lT2ZUeXBlOiBjaGVja2Vycy5tYXAoKGNoZWNrZXIpID0+IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpKVxuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgb25lT2ZUeXBlWyR7Y2hlY2tlcnMubWFwKChjaGVja2VyKSA9PiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyLCB0cnVlKSkuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCFjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gIWlzRXJyb3IoY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uKSkpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnYXJyYXlPZid9LFxuICAgIGFycmF5T2Y6IGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpXG4gIH07XG4gIGNvbnN0IHNob3J0VHlwZSA9IGBhcnJheU9mWyR7Z2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcil9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5hcnJheSh2YWwpKSB8fCAhdmFsLmV2ZXJ5KChpdGVtKSA9PiAhaXNFcnJvcihjaGVja2VyKGl0ZW0pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgc2hvcnRUeXBlKTtcbiAgICB9XG4gIH0sIHR5cGUsIHNob3J0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIG9iamVjdE9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBjb25zdCB0eXBlID0ge1xuICAgIF9fYXBpQ2hlY2tEYXRhOiB7b3B0aW9uYWw6IGZhbHNlLCB0eXBlOiAnb2JqZWN0T2YnfSxcbiAgICBvYmplY3RPZjogZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcilcbiAgfTtcbiAgY29uc3Qgc2hvcnRUeXBlID0gYG9iamVjdE9mWyR7Z2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcil9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgY29uc3QgaXNPYmplY3QgPSBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgaWYgKGlzRXJyb3IoaXNPYmplY3QpKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgfVxuICAgIGNvbnN0IGFsbFR5cGVzU3VjY2VzcyA9IGVhY2godmFsLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICBpZiAoaXNFcnJvcihjaGVja2VyKGl0ZW0sIGtleSwgbmFtZSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFsbFR5cGVzU3VjY2Vzcykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBzaG9ydFR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSwgc2hvcnRUeXBlKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9yQXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IHtcbiAgICBfX2FwaUNoZWNrRGF0YToge29wdGlvbmFsOiBmYWxzZSwgdHlwZTogJ3R5cGVPckFycmF5T2YnfSxcbiAgICB0eXBlT3JBcnJheU9mOiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKVxuICB9O1xuICBjb25zdCBzaG9ydFR5cGUgPSBgdHlwZU9yQXJyYXlPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHNob3J0VHlwZSk7XG4gICAgfVxuICB9LCB0eXBlLCBzaG9ydFR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRTaGFwZUNoZWNrR2V0dGVyKCkge1xuICBmdW5jdGlvbiBzaGFwZUNoZWNrR2V0dGVyKHNoYXBlKSB7XG4gICAgbGV0IHNoYXBlVHlwZXMgPSB7fTtcbiAgICBlYWNoKHNoYXBlLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBzaGFwZVR5cGVzW3Byb3BdID0gZ2V0Q2hlY2tlckRpc3BsYXkodmFsKTtcbiAgICB9KTtcbiAgICBjb25zdCB0eXBlID0ge1xuICAgICAgX19hcGlDaGVja0RhdGE6IHtzdHJpY3Q6IGZhbHNlLCBvcHRpb25hbDogZmFsc2UsIHR5cGU6ICdzaGFwZSd9LFxuICAgICAgc2hhcGU6IHNoYXBlVHlwZXNcbiAgICB9O1xuICAgIGxldCBzaGFwZUNoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gc2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBsZXQgaXNPYmplY3QgPSBjaGVja2Vycy5vYmplY3QodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihpc09iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgICAgfVxuICAgICAgbGV0IHNoYXBlUHJvcEVycm9yO1xuICAgICAgZWFjaChzaGFwZSwgKGNoZWNrZXIsIHByb3ApID0+IHtcbiAgICAgICAgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSB8fCAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgc2hhcGVQcm9wRXJyb3IgPSBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgbmFtZSwgdmFsKTtcbiAgICAgICAgICByZXR1cm4gIWlzRXJyb3Ioc2hhcGVQcm9wRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Vycm9yKHNoYXBlUHJvcEVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVQcm9wRXJyb3I7XG4gICAgICB9XG4gICAgfSwgdHlwZSwgJ3NoYXBlJyk7XG5cbiAgICBsZXQgc3RyaWN0VHlwZSA9IGNvcHkoc2hhcGVDaGVja2VyLnR5cGUpO1xuICAgIHN0cmljdFR5cGUuX19hcGlDaGVja0RhdGEgPSBjb3B5KHNoYXBlQ2hlY2tlci50eXBlLl9fYXBpQ2hlY2tEYXRhKTtcbiAgICBzdHJpY3RUeXBlLl9fYXBpQ2hlY2tEYXRhLnN0cmljdCA9IHRydWU7XG4gICAgc2hhcGVDaGVja2VyLnN0cmljdCA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBzdHJpY3RTaGFwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHNoYXBlRXJyb3IgPSBzaGFwZUNoZWNrZXIodmFsLCBuYW1lLCBsb2NhdGlvbik7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZUVycm9yKSkge1xuICAgICAgICByZXR1cm4gc2hhcGVFcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFsbG93ZWRQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2hhcGUpO1xuICAgICAgY29uc3QgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKHByb3AgPT4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTEpO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7bkF0TChuYW1lLCBsb2NhdGlvbil9IGNhbm5vdCBoYXZlIGV4dHJhIHByb3BlcnRpZXM6ICR7dChleHRyYVByb3BzLmpvaW4oJ2AsIGAnKSl9LmAgK1xuICAgICAgICAgIGBJdCBpcyBsaW1pdGVkIHRvICR7dChhbGxvd2VkUHJvcGVydGllcy5qb2luKCdgLCBgJykpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCBzdHJpY3RUeXBlLCAnc3RyaWN0IHNoYXBlJyk7XG4gICAgc2hhcGVDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ3N0cmljdCddO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZUNoZWNrZXIpO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IGlmTm90Q2hlY2tlciA9IGZ1bmN0aW9uIGlmTm90Q2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCBpZk5vdENoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWZOb3RDaGVja2VyLnR5cGUgPSB0eXBlO1xuICAgIGlmTm90Q2hlY2tlci5zaG9ydFR5cGUgPSBgaWZOb3RbJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XWA7XG4gICAgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKGlmTm90Q2hlY2tlcik7XG4gICAgcmV0dXJuIGlmTm90Q2hlY2tlcjtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICBsZXQgb25seUlmQ2hlY2tlciA9IGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgb25seUlmQ2hlY2tlci50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9ubHlJZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gICAgb25seUlmQ2hlY2tlci5zaG9ydFR5cGUgPSBgb25seUlmWyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihvbmx5SWZDaGVja2VyKTtcbiAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYXJndW1lbnRzQ2hlY2tlckdldHRlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdmdW5jdGlvbiBhcmd1bWVudHMnO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIGFyZ3NDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm9iamVjdCh2YWwpKSB8fCBpc0Vycm9yKGNoZWNrZXJzLm51bWJlcih2YWwubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYW55Q2hlY2tlckRlZmluaXRpb24oKSB7XG4gICAgLy8gZG9uJ3QgZG8gYW55dGhpbmdcbiAgfSwgJ2FueScpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vY2hlY2tlcnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhcGlDaGVjay5qcyJ9