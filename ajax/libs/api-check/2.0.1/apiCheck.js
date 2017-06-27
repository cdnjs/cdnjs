// apiCheck.js v2.0.1 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	  return messages.length ? module.exports.getErrorMessage(api, args, messages, output) : "";
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
	    var message = apiCheck(api, args, output);
	    module.exports.handleErrorMessage(message, shouldThrow);
	    return message; // wont get here if an error is thrown
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
	  var apiTypes = api.map(function (checker) {
	    return getCheckerDisplay(checker);
	  }).join(", ");
	  var passedTypes = args.length ? "`" + args.map(getArgDisplay).join(", ") + "`" : "nothing";
	  return "You passed:\n" + passedTypes + "\n\nThe API calls for:\n`" + apiTypes + "`";
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
	  var daCopy = Array.isArray(obj) ? [] : {};
	  each(obj, function (val, key) {
	    return daCopy[key] = val;
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
	
	function getCheckerDisplay(checker) {
	  return (checker.type || checker.displayName || checker.name) + (checker.isOptional ? " (optional)" : "");
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
	  return new Error("" + nAtL(name, location) + " must be " + t(checkerType));
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
	  checker.optional.displayName = checker.displayName;
	}
	
	function wrapInSpecified(fn, type) {
	  fn.type = type;
	  function specifiedChecker(val, name, location, obj) {
	    var u = undef(val);
	    if (u && !fn.isOptional) {
	      var tLocation = location ? " in " + t(location) : "";
	      return new Error("Required " + t(name) + " not specified" + tLocation + ". Must be " + t(fn.type));
	    } else {
	      return fn(val, name, location, obj);
	    }
	  }
	  specifiedChecker.type = type;
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
	  var nullType = "Object[null ok]";
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
	  var type = "enum[" + enums.join(", ") + "]";
	  return checkerHelpers.wrapInSpecified(function oneOfCheckerDefinition(val, name, location) {
	    if (!enums.some(function (enm) {
	      return enm === val;
	    })) {
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function oneOfTypeCheckGetter(checkers) {
	  var type = "oneOf[" + checkers.map(getCheckerDisplay).join(", ") + "]";
	  return checkerHelpers.wrapInSpecified(function oneOfTypeCheckerDefinition(val, name, location) {
	    if (!checkers.some(function (checker) {
	      return !isError(checker(val, name, location));
	    })) {
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function arrayOfCheckGetter(checker) {
	  var type = "arrayOf[" + getCheckerDisplay(checker) + "]";
	  return checkerHelpers.wrapInSpecified(function arrayOfCheckerDefinition(val, name, location) {
	    if (isError(checkers.array(val)) || !val.every(function (item) {
	      return !isError(checker(item));
	    })) {
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function objectOfCheckGetter(checker) {
	  var type = "objectOf[" + getCheckerDisplay(checker) + "]";
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
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function typeOrArrayOfCheckGetter(checker) {
	  var type = "typeOrArrayOf[" + getCheckerDisplay(checker) + "]";
	  return checkerHelpers.wrapInSpecified(function typeOrArrayOfDefinition(val, name, location, obj) {
	    if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
	      return getError(name, location, type);
	    }
	  }, type);
	}
	
	function getShapeCheckGetter() {
	  function shapeCheckGetter(shape) {
	    var copiedShape = copy(shape);
	    each(copiedShape, function (val, prop) {
	      copiedShape[prop] = getCheckerDisplay(val);
	    });
	    var type = "shape(" + JSON.stringify(copiedShape) + ")";
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
	    }, type);
	
	    var strictType = "strict " + shapeChecker.type;
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
	    }, strictType);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4OTExNzA5ZGZjODI4OWY0NDU5NiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztBQ0F0QyxLQUFNLFlBQVksR0FBRyxtQkFBTyxDQUFDLHVCQUFnQixDQUFDLENBQUM7S0FDeEMsSUFBSSxHQUFxRCxZQUFZLENBQXJFLElBQUk7S0FBRSxPQUFPLEdBQTRDLFlBQVksQ0FBL0QsT0FBTztLQUFFLENBQUMsR0FBeUMsWUFBWSxDQUF0RCxDQUFDO0tBQUUsUUFBUSxHQUErQixZQUFZLENBQW5ELFFBQVE7S0FBRSxpQkFBaUIsR0FBWSxZQUFZLENBQXpDLGlCQUFpQjtLQUFFLE1BQU0sR0FBSSxZQUFZLENBQXRCLE1BQU07O0FBQzVELEtBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQUksUUFBUSxHQUFHLEtBQUssQ0FBQzs7QUFFckIsT0FBTSxDQUFDLE9BQU8sR0FB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UUFDekQsTUFBTTtBQUNMLGdCQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRDtNQUNGLENBQUM7O0FBRUYsa0JBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzFCLG1CQUFjLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLFlBQU8sYUFBYSxDQUFDO0lBQ3RCLENBQUM7O0FBRUYsVUFBTyxnQkFBZ0IsQ0FBQztFQUN6Qjs7QUFFRCxVQUFTLHNCQUFzQixHQUFHO0FBQ2hDLE9BQU0sSUFBSSxHQUFHLG9CQUFvQixDQUFDO0FBQ2xDLFVBQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3hGLFNBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQy9GLGNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkM7SUFDRixFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ1Y7O0FBRUQsVUFBUyxjQUFjLEdBQUc7QUFDeEIsVUFBTyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsb0JBQW9CLEdBQUcsRUFFckUsRUFBRSxLQUFLLENBQUMsQ0FBQztFQUNYIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDg5MTE3MDlkZmM4Mjg5ZjQ0NTk2XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2FwaUNoZWNrJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IGFwaUNoZWNrVXRpbCA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5jb25zdCB7ZWFjaCwgaXNFcnJvciwgdCwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCB0eXBlT2Z9ID0gYXBpQ2hlY2tVdGlsO1xuY29uc3QgY2hlY2tlcnMgPSByZXF1aXJlKCcuL2NoZWNrZXJzJyk7XG5sZXQgZGlzYWJsZWQgPSBmYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcGlDaGVjaztcblxubGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0ge1xuICB0aHJvdzogZ2V0QXBpQ2hlY2sodHJ1ZSksXG4gIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcbiAgZGlzYWJsZTogKCkgPT4gZGlzYWJsZWQgPSB0cnVlLFxuICBlbmFibGU6ICgpID0+IGRpc2FibGVkID0gZmFsc2UsXG4gIGdldEVycm9yTWVzc2FnZSxcbiAgaGFuZGxlRXJyb3JNZXNzYWdlLFxuICBjb25maWc6IHtcbiAgICBvdXRwdXQ6IHtcbiAgICAgIHByZWZpeDogJycsXG4gICAgICBzdWZmaXg6ICcnLFxuICAgICAgZG9jc0Jhc2VVcmw6ICcnXG4gICAgfVxuICB9LFxuICB1dGlsczogYXBpQ2hlY2tVdGlsXG59O1xuXG5lYWNoKGFkZGl0aW9uYWxQcm9wZXJ0aWVzLCAod3JhcHBlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSB3cmFwcGVyKTtcbmVhY2goY2hlY2tlcnMsIChjaGVja2VyLCBuYW1lKSA9PiBtb2R1bGUuZXhwb3J0c1tuYW1lXSA9IGNoZWNrZXIpO1xuXG5cblxuZnVuY3Rpb24gYXBpQ2hlY2soYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6OCAqL1xuICBpZiAoZGlzYWJsZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgY2hlY2tBcGlDaGVja0FwaShhcmd1bWVudHMpO1xuICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gIGxldCBtZXNzYWdlcztcbiAgYXBpID0gYXJyYXlpZnkoYXBpKTtcbiAgbGV0IGVub3VnaEFyZ3MgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKTtcbiAgaWYgKGVub3VnaEFyZ3MubGVuZ3RoKSB7XG4gICAgbWVzc2FnZXMgPSBlbm91Z2hBcmdzO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VzID0gY2hlY2tBcGlXaXRoQXJncyhhcGksIGFyZ3MpO1xuICB9XG4gIHJldHVybiBtZXNzYWdlcy5sZW5ndGggPyBtb2R1bGUuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcywgb3V0cHV0KSA6ICcnO1xufVxuXG5mdW5jdGlvbiBjaGVja0FwaUNoZWNrQXBpKGFyZ3MpIHtcblxuICBjb25zdCBzID0gY2hlY2tlcnMuc3RyaW5nO1xuICBjb25zdCBhcGkgPSBbIC8vIGRvZyBmb29kaW5nIGhlcmVcbiAgICBjaGVja2Vycy50eXBlT3JBcnJheU9mKGNoZWNrZXJzLmZ1bmMpLFxuICAgIGNoZWNrZXJzLmFyZ3MsXG4gICAgY2hlY2tlcnMuc2hhcGUoe3ByZWZpeDogcywgc3VmZml4OiBzLCB1cmw6IHN9KS5zdHJpY3Qub3B0aW9uYWxcbiAgXTtcbiAgbGV0IGVycm9ycyA9IGNoZWNrRW5vdWdoQXJncyhhcGksIGFyZ3MpO1xuICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcbiAgICBlcnJvcnMgPSBjaGVja0FwaVdpdGhBcmdzKGFwaSwgYXJncyk7XG4gIH1cbiAgbGV0IG1lc3NhZ2U7XG4gIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgbWVzc2FnZSA9IG1vZHVsZS5leHBvcnRzLmdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MsIGVycm9ycywge1xuICAgICAgcHJlZml4OiAnYXBpQ2hlY2snXG4gICAgfSk7XG4gICAgbW9kdWxlLmV4cG9ydHMuaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrQXBpV2l0aEFyZ3MoYXBpLCBhcmdzKSB7XG4gIGxldCBtZXNzYWdlcyA9IFtdO1xuICBsZXQgZmFpbGVkID0gZmFsc2U7XG4gIGxldCBjaGVja2VySW5kZXggPSAwO1xuICBsZXQgYXJnSW5kZXggPSAwO1xuICBsZXQgYXJnLCBjaGVja2VyLCByZXM7XG4gIC8qIGpzaGludCAtVzA4NCAqL1xuICB3aGlsZShjaGVja2VyID0gYXBpW2NoZWNrZXJJbmRleCsrXSkge1xuICAgIGFyZyA9IGFyZ3NbYXJnSW5kZXgrK107XG4gICAgcmVzID0gY2hlY2tlcihhcmcsIG51bGwsICdBcmd1bWVudCAnICsgYXJnSW5kZXgpO1xuICAgIGlmIChpc0Vycm9yKHJlcykgJiYgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VzLnB1c2gocmVzLm1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tlci5pc09wdGlvbmFsKSB7XG4gICAgICBhcmdJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlcy5wdXNoKGAke3QoJ0FyZ3VtZW50ICcgKyBhcmdJbmRleCl9IHBhc3NlZGApO1xuICAgIH1cbiAgfVxuICBpZiAoZmFpbGVkKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKSB7XG4gIGxldCByZXF1aXJlZEFyZ3MgPSBhcGkuZmlsdGVyKGEgPT4gIWEuaXNPcHRpb25hbCk7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkQXJncy5sZW5ndGgpIHtcbiAgICByZXR1cm4gWydOb3QgZW5vdWdoIGFyZ3VtZW50cyBzcGVjaWZpZWQuIFJlcXVpcmVzIGAnICsgcmVxdWlyZWRBcmdzLmxlbmd0aCArICdgLCB5b3UgcGFzc2VkIGAnICsgYXJncy5sZW5ndGggKyAnYCddO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICBsZXQgbWVzc2FnZSA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICBtb2R1bGUuZXhwb3J0cy5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICAgIHJldHVybiBtZXNzYWdlOyAvLyB3b250IGdldCBoZXJlIGlmIGFuIGVycm9yIGlzIHRocm93blxuICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBtZXNzYWdlcyA9IFtdLCBvdXRwdXQgPSB7fSkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIGxldCBnT3V0ID0gbW9kdWxlLmV4cG9ydHMuY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgbGV0IHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gIGxldCBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICBsZXQgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsfWAudHJpbSgpO1xuICBsZXQgbWVzc2FnZSA9IGBhcGlDaGVjayBmYWlsZWQhICR7bWVzc2FnZXMuam9pbignLCAnKX1gO1xuICB2YXIgcGFzc2VkQW5kU2hvdWxkSGF2ZVBhc3NlZCA9ICdcXG5cXG4nICsgYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKTtcbiAgcmV0dXJuIGAke3ByZWZpeH0gJHttZXNzYWdlfSAke3N1ZmZpeH0gJHt1cmwgfHwgJyd9JHtwYXNzZWRBbmRTaG91bGRIYXZlUGFzc2VkfWAudHJpbSgpO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncykge1xuICBhcGkgPSBhcnJheWlmeShhcGkpO1xuICBhcmdzID0gYXJyYXlpZnkoYXJncyk7XG4gIHZhciBhcGlUeXBlcyA9IGFwaS5tYXAoY2hlY2tlciA9PiB7XG4gICAgcmV0dXJuIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpO1xuICB9KS5qb2luKCcsICcpO1xuICB2YXIgcGFzc2VkVHlwZXMgPSBhcmdzLmxlbmd0aCA/ICdgJyArIGFyZ3MubWFwKGdldEFyZ0Rpc3BsYXkpLmpvaW4oJywgJykgKyAnYCcgOiAnbm90aGluZyc7XG4gIHJldHVybiAnWW91IHBhc3NlZDpcXG4nICsgcGFzc2VkVHlwZXMgKyAnXFxuXFxuVGhlIEFQSSBjYWxscyBmb3I6XFxuYCcgKyBhcGlUeXBlcyArICdgJztcbn1cblxudmFyIHN0cmluZ2lmeWFibGUgPSB7XG4gIE9iamVjdDogZ2V0RGlzcGxheSxcbiAgQXJyYXk6IGdldERpc3BsYXlcbn07XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodixrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2KSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIChrLCB2KSA9PiBhcmdEaXNwbGF5W2tdIHx8IHYpO1xufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZykge1xuICB2YXIgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICByZXR1cm4gY05hbWUgPyBzdHJpbmdpZnlhYmxlW2NOYW1lXSA/IHN0cmluZ2lmeWFibGVbY05hbWVdKGFyZykgOiBjTmFtZSA6IGFyZyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVPZihhcmcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJjb25zdCBjaGVja2VySGVscGVycyA9IHtcbiAgbWFrZU9wdGlvbmFsLCB3cmFwSW5TcGVjaWZpZWQsIHNldHVwQ2hlY2tlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2gsIGNvcHksIHR5cGVPZiwgYXJyYXlpZnksIGdldENoZWNrZXJEaXNwbGF5LCBpc0Vycm9yLCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgdW5kZWYsIGNoZWNrZXJIZWxwZXJzXG59O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICB2YXIgZGFDb3B5ID0gQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fTtcbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4gZGFDb3B5W2tleV0gPSB2YWwpO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKSB7XG4gIHJldHVybiAoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lKSArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRXJyb3Iob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvcjtcbn1cblxuZnVuY3Rpb24gbGlzdChhcnJ5LCBqb2luLCBmaW5hbEpvaW4pIHtcbiAgYXJyeSA9IGFycmF5aWZ5KGFycnkpO1xuICBsZXQgY29weSA9IGFycnkuc2xpY2UoKTtcbiAgbGV0IGxhc3QgPSBjb3B5LnBvcCgpO1xuICBpZiAoY29weS5sZW5ndGggPT09IDEpIHtcbiAgICBqb2luID0gJyAnO1xuICB9XG4gIHJldHVybiBjb3B5LmpvaW4oam9pbikgKyBgJHtjb3B5Lmxlbmd0aCA/IGpvaW4gKyBmaW5hbEpvaW4gOiAnJ30ke2xhc3R9YDtcbn1cblxuXG5mdW5jdGlvbiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgY2hlY2tlclR5cGUpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcihgJHtuQXRMKG5hbWUsIGxvY2F0aW9uKX0gbXVzdCBiZSAke3QoY2hlY2tlclR5cGUpfWApO1xufVxuXG5mdW5jdGlvbiBuQXRMKG5hbWUsIGxvY2F0aW9uKSB7XG4gIGNvbnN0IHROYW1lID0gdChuYW1lIHx8ICd2YWx1ZScpO1xuICBsZXQgdExvY2F0aW9uID0gdW5kZWYobG9jYXRpb24pID8gJycgOiAnIGF0ICcgKyB0KGxvY2F0aW9uKTtcbiAgcmV0dXJuIGAke3ROYW1lfSR7dExvY2F0aW9ufWA7XG59XG5cbmZ1bmN0aW9uIHQodGhpbmcpIHtcbiAgcmV0dXJuICdgJyArIHRoaW5nICsgJ2AnO1xufVxuXG5mdW5jdGlvbiB1bmRlZih0aGluZykge1xuICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAndW5kZWZpbmVkJztcbn1cblxuXG5cblxuZnVuY3Rpb24gbWFrZU9wdGlvbmFsKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5vcHRpb25hbCA9IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2sodmFsLCBuYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgaWYgKCF1bmRlZih2YWwpKSB7XG4gICAgICByZXR1cm4gY2hlY2tlcih2YWwsIG5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgIH1cbiAgfTtcbiAgY2hlY2tlci5vcHRpb25hbC5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY2hlY2tlci50eXBlO1xuICBjaGVja2VyLm9wdGlvbmFsLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZTtcbn1cblxuZnVuY3Rpb24gd3JhcEluU3BlY2lmaWVkKGZuLCB0eXBlKSB7XG4gIGZuLnR5cGUgPSB0eXBlO1xuICBmdW5jdGlvbiBzcGVjaWZpZWRDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGNvbnN0IHUgPSB1bmRlZih2YWwpO1xuICAgIGlmICh1ICYmICFmbi5pc09wdGlvbmFsKSB7XG4gICAgICBsZXQgdExvY2F0aW9uID0gbG9jYXRpb24gPyBgIGluICR7dChsb2NhdGlvbil9YCA6ICcnO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihgUmVxdWlyZWQgJHt0KG5hbWUpfSBub3Qgc3BlY2lmaWVkJHt0TG9jYXRpb259LiBNdXN0IGJlICR7dChmbi50eXBlKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgfVxuICB9XG4gIHNwZWNpZmllZENoZWNrZXIudHlwZSA9IHR5cGU7XG4gIHNwZWNpZmllZENoZWNrZXIubm90T3B0aW9uYWwgPSBmbi5ub3RPcHRpb25hbDtcbiAgc3BlY2lmaWVkQ2hlY2tlci5jaGlsZHJlbkNoZWNrZXJzID0gZm4uY2hpbGRyZW5DaGVja2VycztcbiAgc2V0dXBDaGVja2VyKHNwZWNpZmllZENoZWNrZXIpO1xuICBzZXR1cENoZWNrZXIoZm4pO1xuICByZXR1cm4gc3BlY2lmaWVkQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gc2V0dXBDaGVja2VyKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayAke3QoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIubmFtZSl9IHR5cGUgY2hlY2tlcmA7XG4gIGlmICghY2hlY2tlci5ub3RPcHRpb25hbCkge1xuICAgIG1ha2VPcHRpb25hbChjaGVja2VyKTtcbiAgfVxuICBlYWNoKGNoZWNrZXIuY2hpbGRyZW5DaGVja2VycywgY2hpbGROYW1lID0+IHtcbiAgICBzZXR1cENoZWNrZXIoY2hlY2tlcltjaGlsZE5hbWVdKTtcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJjb25zdCB7XG4gIHR5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXksIGlzRXJyb3IsXG4gIGFycmF5aWZ5LCBsaXN0LCBnZXRFcnJvciwgbkF0TCwgdCwgY2hlY2tlckhlbHBlcnNcbiAgfSA9IHJlcXVpcmUoJy4vYXBpQ2hlY2tVdGlsJyk7XG5cbmxldCBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheTogZ2V0VHlwZU9mQ2hlY2tlcignQXJyYXknKSxcbiAgYm9vbDogZ2V0VHlwZU9mQ2hlY2tlcignQm9vbGVhbicpLFxuICBmdW5jOiBnZXRUeXBlT2ZDaGVja2VyKCdGdW5jdGlvbicpLFxuICBudW1iZXI6IGdldFR5cGVPZkNoZWNrZXIoJ051bWJlcicpLFxuICBzdHJpbmc6IGdldFR5cGVPZkNoZWNrZXIoJ1N0cmluZycpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuICB0eXBlT3JBcnJheU9mOiB0eXBlT3JBcnJheU9mQ2hlY2tHZXR0ZXIsXG5cbiAgc2hhcGU6IGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSxcbiAgYXJnczogYXJndW1lbnRzQ2hlY2tlckdldHRlcigpLFxuXG4gIGFueTogYW55Q2hlY2tHZXR0ZXIoKVxufTtcblxuZWFjaChjaGVja2VycywgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKTtcblxuXG5mdW5jdGlvbiBnZXRUeXBlT2ZDaGVja2VyKHR5cGUpIHtcbiAgY29uc3QgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gdHlwZU9mQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh0eXBlT2YodmFsKSAhPT0gbFR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0Q2hlY2tlcigpIHtcbiAgY29uc3QgdHlwZSA9ICdPYmplY3QnO1xuICBjb25zdCBudWxsVHlwZSA9ICdPYmplY3RbbnVsbCBva10nO1xuICBsZXQgb2JqZWN0TnVsbE9rQ2hlY2tlciA9IGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvYmplY3ROdWxsT2tDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKHR5cGVPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBudWxsVHlwZSk7XG4gICAgfVxuICB9LCBudWxsVHlwZSk7XG5cbiAgbGV0IG9iamVjdENoZWNrZXIgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gb2JqZWN0Q2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgaXNFcnJvcihvYmplY3ROdWxsT2tDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBvYmplY3RDaGVja2VyLnR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG5cbiAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuICBvYmplY3RDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ251bGxPayddO1xuXG4gIHJldHVybiBvYmplY3RDaGVja2VyO1xufVxuXG5cbmZ1bmN0aW9uIGluc3RhbmNlQ2hlY2tHZXR0ZXIoY2xhc3NUb0NoZWNrKSB7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gaW5zdGFuY2VDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgaWYgKCEodmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCBjbGFzc1RvQ2hlY2submFtZSk7XG4gICAgfVxuICB9LCBjbGFzc1RvQ2hlY2submFtZSk7XG59XG5cbmZ1bmN0aW9uIG9uZU9mQ2hlY2tHZXR0ZXIoZW51bXMpIHtcbiAgY29uc3QgdHlwZSA9IGBlbnVtWyR7ZW51bXMuam9pbignLCAnKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvbmVPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWVudW1zLnNvbWUoZW5tID0+IGVubSA9PT0gdmFsKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBjb25zdCB0eXBlID0gYG9uZU9mWyR7Y2hlY2tlcnMubWFwKGdldENoZWNrZXJEaXNwbGF5KS5qb2luKCcsICcpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIG9uZU9mVHlwZUNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoIWNoZWNrZXJzLnNvbWUoY2hlY2tlciA9PiAhaXNFcnJvcihjaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgY29uc3QgdHlwZSA9IGBhcnJheU9mWyR7Z2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcil9XWA7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoaXNFcnJvcihjaGVja2Vycy5hcnJheSh2YWwpKSB8fCAhdmFsLmV2ZXJ5KChpdGVtKSA9PiAhaXNFcnJvcihjaGVja2VyKGl0ZW0pKSkpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcihuYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgfVxuICB9LCB0eXBlKTtcbn1cblxuZnVuY3Rpb24gb2JqZWN0T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSBgb2JqZWN0T2ZbJHtnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKX1dYDtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBvYmplY3RPZkNoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBjb25zdCBpc09iamVjdCA9IGNoZWNrZXJzLm9iamVjdCh2YWwsIG5hbWUsIGxvY2F0aW9uKTtcbiAgICBpZiAoaXNFcnJvcihpc09iamVjdCkpIHtcbiAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICB9XG4gICAgY29uc3QgYWxsVHlwZXNTdWNjZXNzID0gZWFjaCh2YWwsIChpdGVtLCBrZXkpID0+IHtcbiAgICAgIGlmIChpc0Vycm9yKGNoZWNrZXIoaXRlbSwga2V5LCBuYW1lKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYWxsVHlwZXNTdWNjZXNzKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPckFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG4gIGNvbnN0IHR5cGUgPSBgdHlwZU9yQXJyYXlPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICByZXR1cm4gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIHR5cGVPckFycmF5T2ZEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgIGlmIChpc0Vycm9yKGNoZWNrZXJzLm9uZU9mVHlwZShbY2hlY2tlciwgY2hlY2tlcnMuYXJyYXlPZihjaGVja2VyKV0pKHZhbCwgbmFtZSwgbG9jYXRpb24sIG9iaikpKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3IobmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH1cbiAgfSwgdHlwZSk7XG59XG5cbmZ1bmN0aW9uIGdldFNoYXBlQ2hlY2tHZXR0ZXIoKSB7XG4gIGZ1bmN0aW9uIHNoYXBlQ2hlY2tHZXR0ZXIoc2hhcGUpIHtcbiAgICBsZXQgY29waWVkU2hhcGUgPSBjb3B5KHNoYXBlKTtcbiAgICBlYWNoKGNvcGllZFNoYXBlLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBjb3BpZWRTaGFwZVtwcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KHZhbCk7XG4gICAgfSk7XG4gICAgY29uc3QgdHlwZSA9IGBzaGFwZSgke0pTT04uc3RyaW5naWZ5KGNvcGllZFNoYXBlKX0pYDtcbiAgICBsZXQgc2hhcGVDaGVja2VyID0gY2hlY2tlckhlbHBlcnMud3JhcEluU3BlY2lmaWVkKGZ1bmN0aW9uIHNoYXBlQ2hlY2tlckRlZmluaXRpb24odmFsLCBuYW1lLCBsb2NhdGlvbikge1xuICAgICAgbGV0IGlzT2JqZWN0ID0gY2hlY2tlcnMub2JqZWN0KHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3IoaXNPYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICAgIH1cbiAgICAgIGxldCBzaGFwZVByb3BFcnJvcjtcbiAgICAgIGVhY2goc2hhcGUsIChjaGVja2VyLCBwcm9wKSA9PiB7XG4gICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkocHJvcCkgfHwgIWNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgIHNoYXBlUHJvcEVycm9yID0gY2hlY2tlcih2YWxbcHJvcF0sIHByb3AsIG5hbWUsIHZhbCk7XG4gICAgICAgICAgcmV0dXJuICFpc0Vycm9yKHNoYXBlUHJvcEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFcnJvcihzaGFwZVByb3BFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlUHJvcEVycm9yO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgY29uc3Qgc3RyaWN0VHlwZSA9IGBzdHJpY3QgJHtzaGFwZUNoZWNrZXIudHlwZX1gO1xuICAgIHNoYXBlQ2hlY2tlci5zdHJpY3QgPSBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gc3RyaWN0U2hhcGVDaGVja2VyRGVmaW5pdGlvbih2YWwsIG5hbWUsIGxvY2F0aW9uKSB7XG4gICAgICBjb25zdCBzaGFwZUVycm9yID0gc2hhcGVDaGVja2VyKHZhbCwgbmFtZSwgbG9jYXRpb24pO1xuICAgICAgaWYgKGlzRXJyb3Ioc2hhcGVFcnJvcikpIHtcbiAgICAgICAgcmV0dXJuIHNoYXBlRXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCBhbGxvd2VkUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHNoYXBlKTtcbiAgICAgIGNvbnN0IGV4dHJhUHJvcHMgPSBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihwcm9wID0+IGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPT09IC0xKTtcbiAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgICAgIGAke25BdEwobmFtZSwgbG9jYXRpb24pfSBjYW5ub3QgaGF2ZSBleHRyYSBwcm9wZXJ0aWVzOiAke3QoZXh0cmFQcm9wcy5qb2luKCdgLCBgJykpfS5gICtcbiAgICAgICAgICBgSXQgaXMgbGltaXRlZCB0byAke3QoYWxsb3dlZFByb3BlcnRpZXMuam9pbignYCwgYCcpKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgc3RyaWN0VHlwZSk7XG4gICAgc2hhcGVDaGVja2VyLmNoaWxkcmVuQ2hlY2tlcnMgPSBbJ3N0cmljdCddO1xuICAgIGNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZUNoZWNrZXIpO1xuXG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgbGV0IHR5cGU7XG4gICAgaWYgKG90aGVyUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0eXBlID0gYHNwZWNpZmllZCBvbmx5IGlmICR7b3RoZXJQcm9wc1swXX0gaXMgbm90IHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgbm9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZSBzcGVjaWZpZWQ6IFske2xpc3Qob3RoZXJQcm9wcywgJywgJywgJ2FuZCAnKX1dYDtcbiAgICB9XG4gICAgbGV0IGlmTm90Q2hlY2tlciA9IGZ1bmN0aW9uIGlmTm90Q2hlY2tlckRlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIGxldCBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBsZXQgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgaWYgKHByb3BFeGlzdHMgPT09IG90aGVyUHJvcHNFeGlzdCkge1xuICAgICAgICByZXR1cm4gZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCBpZk5vdENoZWNrZXIudHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBpZk5vdENoZWNrZXIudHlwZSA9IHR5cGU7XG4gICAgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKGlmTm90Q2hlY2tlcik7XG4gICAgcmV0dXJuIGlmTm90Q2hlY2tlcjtcbiAgfTtcblxuICBzaGFwZUNoZWNrR2V0dGVyLm9ubHlJZiA9IGZ1bmN0aW9uIG9ubHlJZihvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIG90aGVyUHJvcHMgPSBhcnJheWlmeShvdGhlclByb3BzKTtcbiAgICBsZXQgdHlwZTtcbiAgICBpZiAob3RoZXJQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgJHtvdGhlclByb3BzWzBdfSBpcyBhbHNvIHNwZWNpZmllZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBgc3BlY2lmaWVkIG9ubHkgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHNwZWNpZmllZDogWyR7bGlzdChvdGhlclByb3BzLCAnLCAnLCAnYW5kICcpfV1gO1xuICAgIH1cbiAgICBsZXQgb25seUlmQ2hlY2tlciA9IGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXJEZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICBjb25zdCBvdGhlcnNQcmVzZW50ID0gb3RoZXJQcm9wcy5ldmVyeShwcm9wID0+IG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSk7XG4gICAgICBpZiAoIW90aGVyc1ByZXNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgb25seUlmQ2hlY2tlci50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9ubHlJZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gICAgY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKG9ubHlJZkNoZWNrZXIpO1xuICAgIHJldHVybiBvbmx5SWZDaGVja2VyO1xuICB9O1xuXG4gIHJldHVybiBzaGFwZUNoZWNrR2V0dGVyO1xufVxuXG5mdW5jdGlvbiBhcmd1bWVudHNDaGVja2VyR2V0dGVyKCkge1xuICBjb25zdCB0eXBlID0gJ2Z1bmN0aW9uIGFyZ3VtZW50cyc7XG4gIHJldHVybiBjaGVja2VySGVscGVycy53cmFwSW5TcGVjaWZpZWQoZnVuY3Rpb24gYXJnc0NoZWNrZXJEZWZpbml0aW9uKHZhbCwgbmFtZSwgbG9jYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IGlzRXJyb3IoY2hlY2tlcnMub2JqZWN0KHZhbCkpIHx8IGlzRXJyb3IoY2hlY2tlcnMubnVtYmVyKHZhbC5sZW5ndGgpKSkge1xuICAgICAgcmV0dXJuIGdldEVycm9yKG5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICB9XG4gIH0sIHR5cGUpO1xufVxuXG5mdW5jdGlvbiBhbnlDaGVja0dldHRlcigpIHtcbiAgcmV0dXJuIGNoZWNrZXJIZWxwZXJzLndyYXBJblNwZWNpZmllZChmdW5jdGlvbiBhbnlDaGVja2VyRGVmaW5pdGlvbigpIHtcbiAgICAvLyBkb24ndCBkbyBhbnl0aGluZ1xuICB9LCAnYW55Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9jaGVja2Vycy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFwaUNoZWNrLmpzIn0=