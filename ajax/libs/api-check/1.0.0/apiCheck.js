// apiCheck.js v1.0.0 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)

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
	
	var _require = __webpack_require__(/*! ./apiCheckUtil */ 2);
	
	var each = _require.each;
	var arrayify = _require.arrayify;
	var getCheckerDisplay = _require.getCheckerDisplay;
	var typeOf = _require.typeOf;
	
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
	  }
	};
	
	each(additionalProperties, function (wrapper, name) {
	  return module.exports[name] = wrapper;
	});
	each(checkers, function (checker, name) {
	  return module.exports[name] = checker;
	});
	
	function apiCheck(api, args, output) {
	  /* jshint maxcomplexity:6 */
	  var success;
	  if (disabled) {
	    return null;
	  }
	  if (!args) {
	    throw new Error("apiCheck failed: Must pass arguments to check");
	  }
	  args = Array.prototype.slice.call(args);
	  if (checkers.array(api)) {
	    success = checkEnoughArgs(api, args) && checkMultiArgApi(api, args);
	  } else if (checkers.func(api)) {
	    success = api(args[0]);
	  } else {
	    throw new Error("apiCheck failed: Must pass an array or a function");
	  }
	  return success ? null : module.exports.getErrorMessage(api, args, output);
	}
	
	function checkMultiArgApi(api, args) {
	  var success = true;
	  var checkerIndex = 0;
	  var argIndex = 0;
	  var arg, checker, res;
	  /* jshint -W084 */
	  while (arg = args[argIndex++]) {
	    checker = api[checkerIndex++];
	    res = checker(arg);
	    if (!res && !checker.isOptional) {
	      return false;
	    } else if (!res) {
	      argIndex--;
	    }
	  }
	  return success;
	}
	
	function checkEnoughArgs(api, args) {
	  var requiredArgs = api.filter(function (a) {
	    return !a.isOptional;
	  });
	  return args.length >= requiredArgs.length;
	}
	
	function getApiCheck(shouldThrow) {
	  return function apiCheckWrapper(api, args, output) {
	    if (disabled) {
	      return null;
	    }
	    var message = apiCheck(api, args, output);
	    module.exports.handleErrorMessage(message, shouldThrow);
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
	  var output = arguments[2] === undefined ? {} : arguments[2];
	
	  /* jshint maxcomplexity:7 */
	  var gOut = module.exports.config.output || {};
	  var prefix = ("" + (gOut.prefix || "") + " " + (output.prefix || "")).trim();
	  var suffix = ("" + (output.suffix || "") + " " + (gOut.suffix || "")).trim();
	  var url = gOut.docsBaseUrl && output.url && ("" + gOut.docsBaseUrl + "" + output.url).trim();
	  return ("" + prefix + " " + buildMessageFromApiAndArgs(api, args) + " " + suffix + " " + (url || "")).trim();
	}
	
	function buildMessageFromApiAndArgs(api, args) {
	  api = arrayify(api);
	  args = arrayify(args);
	  var apiTypes = api.map(function (checker) {
	    return getCheckerDisplay(checker);
	  }).join(", ");
	  var passedTypes = args.length ? "`" + args.map(getArgDisplay).join(", ") + "`" : "nothing";
	  return "apiCheck failed! You passed: " + passedTypes + " and should have passed: `" + apiTypes + "`";
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
	
	module.exports = { each: each, copy: copy, typeOf: typeOf, arrayify: arrayify, getCheckerDisplay: getCheckerDisplay };
	
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
	
	  shape: getShapeCheckGetter(),
	
	  any: anyCheckGetter()
	};
	
	each(checkers, function (checker) {
	  checker.displayName = "apiCheck `" + checker.type + "` type checker";
	});
	
	function getTypeOfChecker(type) {
	  var lType = type.toLowerCase();
	  function typeOfChecker(val) {
	    return typeOf(val) === lType;
	  }
	
	  typeOfChecker.type = type;
	  makeOptional(typeOfChecker);
	  return typeOfChecker;
	}
	
	function getObjectChecker() {
	  function objectNullOkChecker(val) {
	    return typeOf(val) === "object";
	  }
	  objectNullOkChecker.type = "Object[null ok]";
	  makeOptional(objectNullOkChecker);
	  function objectChecker(val) {
	    return val !== null && objectNullOkChecker(val);
	  }
	  objectChecker.type = "Object";
	  makeOptional(objectChecker);
	  objectChecker.nullOk = objectNullOkChecker;
	
	  return objectChecker;
	}
	
	function instanceCheckGetter(classToCheck) {
	  function instanceChecker(val) {
	    return val instanceof classToCheck;
	  }
	
	  instanceChecker.type = classToCheck.name;
	  makeOptional(instanceChecker);
	  return instanceChecker;
	}
	
	function oneOfCheckGetter(enums) {
	  function oneOfChecker(val) {
	    return enums.some(function (enm) {
	      return enm === val;
	    });
	  }
	
	  oneOfChecker.type = "enum[" + enums.join(", ") + "]";
	  makeOptional(oneOfChecker);
	  return oneOfChecker;
	}
	
	function oneOfTypeCheckGetter(checkers) {
	  function oneOfTypeChecker(val) {
	    return checkers.some(function (checker) {
	      return checker(val);
	    });
	  }
	
	  oneOfTypeChecker.type = checkers.map(getCheckerDisplay).join(" or ");
	  makeOptional(oneOfTypeChecker);
	  return oneOfTypeChecker;
	}
	
	function arrayOfCheckGetter(checker) {
	  function arrayOfChecker(val) {
	    return checkers.array(val) && val.every(checker);
	  }
	
	  arrayOfChecker.type = "arrayOf[" + getCheckerDisplay(checker) + "]";
	  makeOptional(arrayOfChecker);
	  return arrayOfChecker;
	}
	
	function objectOfCheckGetter(checker) {
	  function objectOfChecker(val) {
	    return checkers.object(val) && each(val, checker);
	  }
	
	  objectOfChecker.type = "objectOf[" + getCheckerDisplay(checker) + "]";
	  makeOptional(objectOfChecker);
	  return objectOfChecker;
	}
	
	function getShapeCheckGetter() {
	  function shapeCheckGetter(shape) {
	    function shapeChecker(val) {
	      return checkers.object(val) && each(shape, function (checker, prop) {
	        if (!val.hasOwnProperty(prop) && checker.isOptional) {
	          return true;
	        } else {
	          return checker(val[prop], prop, val);
	        }
	      }) && (!shapeChecker.strict || each(val, function (prop, name) {
	        return shape.hasOwnProperty(name);
	      }));
	    }
	
	    var copiedShape = copy(shape);
	    each(copiedShape, function (val, prop) {
	      copiedShape[prop] = getCheckerDisplay(val);
	    });
	    shapeChecker.type = "shape(" + JSON.stringify(copiedShape) + ")";
	    makeOptional(shapeChecker);
	    return shapeChecker;
	  }
	
	  shapeCheckGetter.ifNot = function ifNot(otherProps, propChecker) {
	    if (!Array.isArray(otherProps)) {
	      otherProps = [otherProps];
	    }
	    function ifNotChecker(prop, propName, obj) {
	      var propExists = obj && obj.hasOwnProperty(propName);
	      var otherPropsExist = otherProps.some(function (otherProp) {
	        return obj && obj.hasOwnProperty(otherProp);
	      });
	      return propExists !== otherPropsExist && (!propExists || propExists && propChecker(prop) && !otherPropsExist);
	    }
	    ifNotChecker.type = "ifNot[" + otherProps.join(", ") + "]";
	    makeOptional(ifNotChecker);
	    return ifNotChecker;
	  };
	
	  shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
	    if (!Array.isArray(otherProps)) {
	      otherProps = [otherProps];
	    }
	    function onlyIfChecker(prop, propName, obj) {
	      return otherProps.every(function (prop) {
	        return obj.hasOwnProperty(prop);
	      }) && propChecker(prop);
	    }
	    onlyIfChecker.type = "onlyIf[" + otherProps.join(", ") + "]";
	    makeOptional(onlyIfChecker);
	    return onlyIfChecker;
	  };
	
	  return shapeCheckGetter;
	}
	
	function anyCheckGetter() {
	  function anyChecker() {
	    return true;
	  }
	
	  anyChecker.type = "any";
	  makeOptional(anyChecker);
	  return anyChecker;
	}
	
	function makeOptional(checker) {
	  checker.optional = function optionalCheck() {
	    return checker.apply(undefined, arguments);
	  };
	  checker.optional.isOptional = true;
	  checker.optional.type = checker.type;
	  checker.optional.displayName = checker.displayName;
	}

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlOGM3MDdiMDBhMTg1NTQ5OTU4MCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztnQkNBWSxtQkFBTyxDQUFDLHVCQUFnQixDQUFDOztLQUF0RSxJQUFJLFlBQUosSUFBSTtLQUFFLFFBQVEsWUFBUixRQUFRO0tBQUUsaUJBQWlCLFlBQWpCLGlCQUFpQjtLQUFFLE1BQU0sWUFBTixNQUFNOztBQUM5QyxLQUFJLFFBQVEsR0FBRyxtQkFBTyxDQUFDLG1CQUFZLENBQUMsQ0FBQztBQUNyQyxLQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXJCLE9BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOztBQUUxQixLQUFJLG9CQUFvQixHQUFHO0FBQ3pCLFlBQU8sV0FBVyxDQUFDLElBQUksQ0FBQztBQUN4QixPQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUN4QixVQUFPLEVBQUU7WUFBTSxRQUFR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dGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZThjNzA3YjAwYTE4NTU0OTk1ODBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwibGV0IHtlYWNoLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZn0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xubGV0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xubGV0IGRpc2FibGVkID0gZmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpQ2hlY2s7XG5cbmxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gIGRpc2FibGU6ICgpID0+IGRpc2FibGVkID0gdHJ1ZSxcbiAgZW5hYmxlOiAoKSA9PiBkaXNhYmxlZCA9IGZhbHNlLFxuICBnZXRFcnJvck1lc3NhZ2UsXG4gIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgY29uZmlnOiB7XG4gICAgb3V0cHV0OiB7XG4gICAgICBwcmVmaXg6ICcnLFxuICAgICAgc3VmZml4OiAnJyxcbiAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgIH1cbiAgfVxufTtcblxuZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gd3JhcHBlcik7XG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuXG5cbmZ1bmN0aW9uIGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgdmFyIHN1Y2Nlc3M7XG4gIGlmIChkaXNhYmxlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghYXJncykge1xuICAgIHRocm93IG5ldyBFcnJvcignYXBpQ2hlY2sgZmFpbGVkOiBNdXN0IHBhc3MgYXJndW1lbnRzIHRvIGNoZWNrJyk7XG4gIH1cbiAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICBpZiAoY2hlY2tlcnMuYXJyYXkoYXBpKSkge1xuICAgIHN1Y2Nlc3MgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKSAmJiBjaGVja011bHRpQXJnQXBpKGFwaSwgYXJncyk7XG4gIH0gZWxzZSBpZiAoY2hlY2tlcnMuZnVuYyhhcGkpKSB7XG4gICAgc3VjY2VzcyA9IGFwaShhcmdzWzBdKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FwaUNoZWNrIGZhaWxlZDogTXVzdCBwYXNzIGFuIGFycmF5IG9yIGEgZnVuY3Rpb24nKTtcbiAgfVxuICByZXR1cm4gc3VjY2VzcyA/IG51bGwgOiBtb2R1bGUuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBvdXRwdXQpO1xufVxuXG5mdW5jdGlvbiBjaGVja011bHRpQXJnQXBpKGFwaSwgYXJncykge1xuICB2YXIgc3VjY2VzcyA9IHRydWU7XG4gIHZhciBjaGVja2VySW5kZXggPSAwO1xuICB2YXIgYXJnSW5kZXggPSAwO1xuICB2YXIgYXJnLCBjaGVja2VyLCByZXM7XG4gIC8qIGpzaGludCAtVzA4NCAqL1xuICB3aGlsZShhcmcgPSBhcmdzW2FyZ0luZGV4KytdKSB7XG4gICAgY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK107XG4gICAgcmVzID0gY2hlY2tlcihhcmcpO1xuICAgIGlmICghcmVzICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKCFyZXMpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfVxuICB9XG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKSB7XG4gIHZhciByZXF1aXJlZEFyZ3MgPSBhcGkuZmlsdGVyKGEgPT4gIWEuaXNPcHRpb25hbCk7XG4gIHJldHVybiBhcmdzLmxlbmd0aCA+PSByZXF1aXJlZEFyZ3MubGVuZ3RoO1xufVxuXG5cbmZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWVzc2FnZSA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICBtb2R1bGUuZXhwb3J0cy5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBvdXRwdXQgPSB7fSkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIHZhciBnT3V0ID0gbW9kdWxlLmV4cG9ydHMuY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgdmFyIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gIHZhciBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICB2YXIgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsfWAudHJpbSgpO1xuICByZXR1cm4gYCR7cHJlZml4fSAke2J1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncyl9ICR7c3VmZml4fSAke3VybCB8fCAnJ31gLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKSB7XG4gIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgdmFyIGFwaVR5cGVzID0gYXBpLm1hcChjaGVja2VyID0+IHtcbiAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcik7XG4gIH0pLmpvaW4oJywgJyk7XG4gIHZhciBwYXNzZWRUeXBlcyA9IGFyZ3MubGVuZ3RoID8gJ2AnICsgYXJncy5tYXAoZ2V0QXJnRGlzcGxheSkuam9pbignLCAnKSArICdgJyA6ICdub3RoaW5nJztcbiAgcmV0dXJuICdhcGlDaGVjayBmYWlsZWQhIFlvdSBwYXNzZWQ6ICcgKyBwYXNzZWRUeXBlcyArICcgYW5kIHNob3VsZCBoYXZlIHBhc3NlZDogYCcgKyBhcGlUeXBlcyArICdgJztcbn1cblxudmFyIHN0cmluZ2lmeWFibGUgPSB7XG4gIE9iamVjdDogZ2V0RGlzcGxheSxcbiAgQXJyYXk6IGdldERpc3BsYXlcbn07XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodixrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2KSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIChrLCB2KSA9PiBhcmdEaXNwbGF5W2tdIHx8IHYpO1xufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZykge1xuICB2YXIgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICByZXR1cm4gY05hbWUgPyBzdHJpbmdpZnlhYmxlW2NOYW1lXSA/IHN0cmluZ2lmeWFibGVbY05hbWVdKGFyZykgOiBjTmFtZSA6IGFyZyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVPZihhcmcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJcblxubW9kdWxlLmV4cG9ydHMgPSB7ZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXl9O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICB2YXIgZGFDb3B5ID0gQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fTtcbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4gZGFDb3B5W2tleV0gPSB2YWwpO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKSB7XG4gIHJldHVybiAoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lKSArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJ2YXIge3R5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXl9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbnZhciBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheTogZ2V0VHlwZU9mQ2hlY2tlcignQXJyYXknKSxcbiAgYm9vbDogZ2V0VHlwZU9mQ2hlY2tlcignQm9vbGVhbicpLFxuICBmdW5jOiBnZXRUeXBlT2ZDaGVja2VyKCdGdW5jdGlvbicpLFxuICBudW1iZXI6IGdldFR5cGVPZkNoZWNrZXIoJ051bWJlcicpLFxuICBzdHJpbmc6IGdldFR5cGVPZkNoZWNrZXIoJ1N0cmluZycpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuXG4gIHNoYXBlOiBnZXRTaGFwZUNoZWNrR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5lYWNoKGNoZWNrZXJzLCBjaGVja2VyID0+IHtcbiAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayBcXGAke2NoZWNrZXIudHlwZX1cXGAgdHlwZSBjaGVja2VyYDtcbn0pO1xuXG5cbmZ1bmN0aW9uIGdldFR5cGVPZkNoZWNrZXIodHlwZSkge1xuICB2YXIgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXIodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVPZih2YWwpID09PSBsVHlwZTtcbiAgfVxuXG4gIHR5cGVPZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gIG1ha2VPcHRpb25hbCh0eXBlT2ZDaGVja2VyKTtcbiAgcmV0dXJuIHR5cGVPZkNoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGdldE9iamVjdENoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXIodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVPZih2YWwpID09PSAnb2JqZWN0JztcbiAgfVxuICBvYmplY3ROdWxsT2tDaGVja2VyLnR5cGUgPSAnT2JqZWN0W251bGwgb2tdJztcbiAgbWFrZU9wdGlvbmFsKG9iamVjdE51bGxPa0NoZWNrZXIpO1xuICBmdW5jdGlvbiBvYmplY3RDaGVja2VyKHZhbCkge1xuICAgIHJldHVybiB2YWwgIT09IG51bGwgJiYgb2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwpO1xuICB9XG4gIG9iamVjdENoZWNrZXIudHlwZSA9ICdPYmplY3QnO1xuICBtYWtlT3B0aW9uYWwob2JqZWN0Q2hlY2tlcik7XG4gIG9iamVjdENoZWNrZXIubnVsbE9rID0gb2JqZWN0TnVsbE9rQ2hlY2tlcjtcblxuICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcbn1cblxuXG5mdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICBmdW5jdGlvbiBpbnN0YW5jZUNoZWNrZXIodmFsKSB7XG4gICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaztcbiAgfVxuXG4gIGluc3RhbmNlQ2hlY2tlci50eXBlID0gY2xhc3NUb0NoZWNrLm5hbWU7XG4gIG1ha2VPcHRpb25hbChpbnN0YW5jZUNoZWNrZXIpO1xuICByZXR1cm4gaW5zdGFuY2VDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGZ1bmN0aW9uIG9uZU9mQ2hlY2tlcih2YWwpIHtcbiAgICByZXR1cm4gZW51bXMuc29tZShlbm0gPT4gZW5tID09PSB2YWwpO1xuICB9XG5cbiAgb25lT2ZDaGVja2VyLnR5cGUgPSBgZW51bVske2VudW1zLmpvaW4oJywgJyl9XWA7XG4gIG1ha2VPcHRpb25hbChvbmVPZkNoZWNrZXIpO1xuICByZXR1cm4gb25lT2ZDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyKHZhbCkge1xuICAgIHJldHVybiBjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gY2hlY2tlcih2YWwpKTtcbiAgfVxuXG4gIG9uZU9mVHlwZUNoZWNrZXIudHlwZSA9IGNoZWNrZXJzLm1hcChnZXRDaGVja2VyRGlzcGxheSkuam9pbignIG9yICcpO1xuICBtYWtlT3B0aW9uYWwob25lT2ZUeXBlQ2hlY2tlcik7XG4gIHJldHVybiBvbmVPZlR5cGVDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBmdW5jdGlvbiBhcnJheU9mQ2hlY2tlcih2YWwpIHtcbiAgICByZXR1cm4gY2hlY2tlcnMuYXJyYXkodmFsKSAmJiB2YWwuZXZlcnkoY2hlY2tlcik7XG4gIH1cblxuICBhcnJheU9mQ2hlY2tlci50eXBlID0gYGFycmF5T2ZbJHtnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKX1dYDtcbiAgbWFrZU9wdGlvbmFsKGFycmF5T2ZDaGVja2VyKTtcbiAgcmV0dXJuIGFycmF5T2ZDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyKHZhbCkge1xuICAgIHJldHVybiBjaGVja2Vycy5vYmplY3QodmFsKSAmJiBlYWNoKHZhbCwgY2hlY2tlcik7XG4gIH1cblxuICBvYmplY3RPZkNoZWNrZXIudHlwZSA9IGBvYmplY3RPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICBtYWtlT3B0aW9uYWwob2JqZWN0T2ZDaGVja2VyKTtcbiAgcmV0dXJuIG9iamVjdE9mQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSkge1xuICAgIGZ1bmN0aW9uIHNoYXBlQ2hlY2tlcih2YWwpIHtcbiAgICAgIHJldHVybiBjaGVja2Vycy5vYmplY3QodmFsKSAmJiBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAgIGlmICghdmFsLmhhc093blByb3BlcnR5KHByb3ApICYmIGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pICYmICghc2hhcGVDaGVja2VyLnN0cmljdCB8fCBlYWNoKHZhbCwgKHByb3AsIG5hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gc2hhcGUuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICB2YXIgY29waWVkU2hhcGUgPSBjb3B5KHNoYXBlKTtcbiAgICBlYWNoKGNvcGllZFNoYXBlLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBjb3BpZWRTaGFwZVtwcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KHZhbCk7XG4gICAgfSk7XG4gICAgc2hhcGVDaGVja2VyLnR5cGUgPSBgc2hhcGUoJHtKU09OLnN0cmluZ2lmeShjb3BpZWRTaGFwZSl9KWA7XG4gICAgbWFrZU9wdGlvbmFsKHNoYXBlQ2hlY2tlcik7XG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaWZOb3RDaGVja2VyKHByb3AsIHByb3BOYW1lLCBvYmopIHtcbiAgICAgIHZhciBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgcmV0dXJuIChwcm9wRXhpc3RzICE9PSBvdGhlclByb3BzRXhpc3QpICYmICghcHJvcEV4aXN0cyB8fCBwcm9wRXhpc3RzICYmIHByb3BDaGVja2VyKHByb3ApICYmICFvdGhlclByb3BzRXhpc3QpO1xuXG4gICAgfVxuICAgIGlmTm90Q2hlY2tlci50eXBlID0gYGlmTm90WyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIG1ha2VPcHRpb25hbChpZk5vdENoZWNrZXIpO1xuICAgIHJldHVybiBpZk5vdENoZWNrZXI7XG4gIH07XG5cbiAgc2hhcGVDaGVja0dldHRlci5vbmx5SWYgPSBmdW5jdGlvbiBvbmx5SWYob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXIocHJvcCwgcHJvcE5hbWUsIG9iaikge1xuICAgICAgcmV0dXJuIG90aGVyUHJvcHMuZXZlcnkocHJvcCA9PiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpICYmIHByb3BDaGVja2VyKHByb3ApO1xuICAgIH1cbiAgICBvbmx5SWZDaGVja2VyLnR5cGUgPSBgb25seUlmWyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIG1ha2VPcHRpb25hbChvbmx5SWZDaGVja2VyKTtcbiAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gIGZ1bmN0aW9uIGFueUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhbnlDaGVja2VyLnR5cGUgPSAnYW55JztcbiAgbWFrZU9wdGlvbmFsKGFueUNoZWNrZXIpO1xuICByZXR1cm4gYW55Q2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gbWFrZU9wdGlvbmFsKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5vcHRpb25hbCA9IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2soKSB7XG4gICAgcmV0dXJuIGNoZWNrZXIoLi4uYXJndW1lbnRzKTtcbiAgfTtcbiAgY2hlY2tlci5vcHRpb25hbC5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY2hlY2tlci50eXBlO1xuICBjaGVja2VyLm9wdGlvbmFsLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2NoZWNrZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiYXBpQ2hlY2suanMifQ==