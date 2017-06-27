//! api-check version 7.5.5 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)

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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _apiCheck = __webpack_require__(1);

	var _apiCheck2 = _interopRequireDefault(_apiCheck);

	exports['default'] = _apiCheck2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stringify = __webpack_require__(2);
	var apiCheckUtil = __webpack_require__(3);
	var each = apiCheckUtil.each;
	var isError = apiCheckUtil.isError;
	var t = apiCheckUtil.t;
	var arrayify = apiCheckUtil.arrayify;
	var getCheckerDisplay = apiCheckUtil.getCheckerDisplay;
	var typeOf = apiCheckUtil.typeOf;
	var getError = apiCheckUtil.getError;

	var checkers = __webpack_require__(4);
	var apiCheckApis = getApiCheckApis();

	module.exports = getApiCheckInstance;
	module.exports.VERSION = ("7.5.5");
	module.exports.utils = apiCheckUtil;
	module.exports.globalConfig = {
	  verbose: false,
	  disabled: false
	};

	var apiCheckApiCheck = getApiCheckInstance({
	  output: { prefix: 'apiCheck' }
	});
	module.exports.internalChecker = apiCheckApiCheck;

	each(checkers, function (checker, name) {
	  return module.exports[name] = checker;
	});

	function getApiCheckInstance() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var extraCheckers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  /* eslint complexity:[2, 6] */
	  if (apiCheckApiCheck && arguments.length) {
	    apiCheckApiCheck['throw'](apiCheckApis.getApiCheckInstanceCheckers, arguments, {
	      prefix: 'creating an apiCheck instance'
	    });
	  }

	  var additionalProperties = {
	    'throw': getApiCheck(true),
	    warn: getApiCheck(false),
	    getErrorMessage: getErrorMessage,
	    handleErrorMessage: handleErrorMessage,
	    config: {
	      output: config.output || {
	        prefix: '',
	        suffix: '',
	        docsBaseUrl: ''
	      },
	      verbose: config.verbose || false,
	      disabled: config.disabled || false
	    },
	    utils: apiCheckUtil
	  };

	  each(additionalProperties, function (wrapper, name) {
	    return apiCheck[name] = wrapper;
	  });

	  var disabled = apiCheck.disabled || module.exports.globalConfig.disabled;
	  each(checkers.getCheckers(disabled), function (checker, name) {
	    return apiCheck[name] = checker;
	  });
	  each(extraCheckers, function (checker, name) {
	    return apiCheck[name] = checker;
	  });

	  return apiCheck;

	  /**
	   * This is the instance function. Other things are attached to this see additional properties above.
	   * @param {Array} api - the checkers to check with
	   * @param {Array} args - the args to check
	   * @param {Object} output - output options
	   * @returns {Object} - if this has a failed = true property, then it failed
	   */
	  function apiCheck(api, args, output) {
	    /* eslint complexity:[2, 8] */
	    if (apiCheck.config.disabled || module.exports.globalConfig.disabled) {
	      return {
	        apiTypes: {}, argTypes: {},
	        passed: true, message: '',
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
	    returnObject.args = args;
	    if (messages.length) {
	      returnObject.message = apiCheck.getErrorMessage(api, args, messages, output);
	      returnObject.failed = true;
	      returnObject.passed = false;
	    } else {
	      returnObject.message = '';
	      returnObject.failed = false;
	      returnObject.passed = true;
	    }
	    return returnObject;
	  }

	  /**
	   * checkApiCheckApi, should be read like: check apiCheck api. As in, check the api for apiCheck :-)
	   * @param {Array} checkApiArgs - args provided to apiCheck function
	   */
	  function checkApiCheckApi(checkApiArgs) {
	    var api = checkApiArgs[0];
	    var args = checkApiArgs[1];
	    var isArrayOrArgs = Array.isArray(args) || args && typeof args === 'object' && typeof args.length === 'number';

	    if (Array.isArray(api) && !isArrayOrArgs) {
	      throw new Error(getErrorMessage(api, [args], ['If an array is provided for the api, an array must be provided for the args as well.'], { prefix: 'apiCheck' }));
	    }
	    // dog fooding here
	    var errors = checkApiWithArgs(apiCheckApis.checkApiCheckApi, checkApiArgs);
	    if (errors.length) {
	      var message = apiCheck.getErrorMessage(apiCheckApis.checkApiCheckApi, checkApiArgs, errors, {
	        prefix: 'apiCheck'
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
	      /* eslint no-console:0 */
	      console.warn(message);
	    }
	  }

	  function getErrorMessage(api, args) {
	    var messages = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	    var output = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var gOut = apiCheck.config.output || {};
	    var prefix = getPrefix();
	    var suffix = getSuffix();
	    var url = getUrl();
	    var message = 'apiCheck failed! ' + messages.join(', ');
	    var passedAndShouldHavePassed = '\n\n' + buildMessageFromApiAndArgs(api, args);
	    return (prefix + ' ' + message + ' ' + suffix + ' ' + (url || '') + passedAndShouldHavePassed).trim();

	    function getPrefix() {
	      var p = output.onlyPrefix;
	      if (!p) {
	        p = ((gOut.prefix || '') + ' ' + (output.prefix || '')).trim();
	      }
	      return p;
	    }

	    function getSuffix() {
	      var s = output.onlySuffix;
	      if (!s) {
	        s = ((output.suffix || '') + ' ' + (gOut.suffix || '')).trim();
	      }
	      return s;
	    }

	    function getUrl() {
	      var u = output.url;
	      if (!u) {
	        u = gOut.docsBaseUrl && output.urlSuffix && ('' + gOut.docsBaseUrl + output.urlSuffix).trim();
	      }
	      return u;
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
	        /* eslint complexity:[2, 6] */
	        if (replacedItems.indexOf(val) === -1) {
	          // avoid recursive problems
	          replacedItems.push(val);
	          if (typeof val === 'object') {
	            replaceFunctionWithName(obj);
	          } else if (typeof val === 'function') {
	            obj[name] = val.displayName || val.name || 'anonymous function';
	          }
	        }
	      });
	    }

	    function getObjectString(types) {
	      if (!types || !types.length) {
	        return 'nothing';
	      } else if (types && types.length === 1) {
	        types = types[0];
	      }
	      return stringify(types, null, 2);
	    }

	    function generateMessage() {
	      var n = '\n';
	      var useS = true;
	      if (args && args.length === 1) {
	        if (typeof args[0] === 'object' && args[0] !== null) {
	          useS = !!Object.keys(args[0]).length;
	        } else {
	          useS = false;
	        }
	      }
	      var types = 'type' + (useS ? 's' : '');
	      var newLine = n + n;
	      return 'You passed:' + n + passedArgs + newLine + ('With the ' + types + ':' + n + argTypes + newLine) + ('The API calls for:' + n + apiTypes);
	    }
	  }

	  function getTypes(api, args) {
	    api = arrayify(api);
	    args = arrayify(args);
	    var apiTypes = api.map(function (checker, index) {
	      var specified = module.exports.globalConfig.hasOwnProperty('verbose');
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
	 * @param {Array} api - checkers
	 * @param  {Array} args - and arguments object
	 * @returns {Array} - the error messages
	 */
	function checkApiWithArgs(api, args) {
	  /* eslint complexity:[2, 7] */
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
	    argName = 'Argument ' + argIndex + (checker.isOptional ? ' (optional)' : '');
	    res = checker(arg, 'value', argName);
	    argFailed = isError(res);
	    lastChecker = checkerIndex >= api.length;
	    skipPreviousChecker = checkerIndex > 1 && api[checkerIndex - 1].isOptional;
	    if (argFailed && lastChecker || argFailed && !lastChecker && !checker.isOptional && !skipPreviousChecker) {
	      failed = true;
	      messages.push(getCheckerErrorMessage(res, checker, arg));
	    } else if (argFailed && checker.isOptional) {
	      argIndex--;
	    } else {
	      messages.push(t(argName) + ' passed');
	    }
	  }
	  return failed ? messages : [];
	}

	checkerTypeType.type = 'function with __apiCheckData property and `${function.type}` property';
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
	  if (typeof checkerType !== 'function' && !checkerType.hasOwnProperty(checkerType.__apiCheckData.type)) {
	    return getError(name, location, checkerTypeType.type);
	  }
	}

	function getCheckerErrorMessage(res, checker, val) {
	  var checkerHelp = getCheckerHelp(checker, val);
	  checkerHelp = checkerHelp ? ' - ' + checkerHelp : '';
	  return res.message + checkerHelp;
	}

	function getCheckerHelp(_ref, val) {
	  var help = _ref.help;

	  if (!help) {
	    return '';
	  }
	  if (typeof help === 'function') {
	    help = help(val);
	  }
	  return help;
	}

	function checkEnoughArgs(api, args) {
	  var requiredArgs = api.filter(function (a) {
	    return !a.isOptional;
	  });
	  if (args.length < requiredArgs.length) {
	    return ['Not enough arguments specified. Requires `' + requiredArgs.length + '`, you passed `' + args.length + '`'];
	  } else {
	    return [];
	  }
	}

	function getArgDisplay(arg, gottenArgs) {
	  /* eslint complexity:[2, 7] */
	  var cName = arg && arg.constructor && arg.constructor.name;
	  var type = typeOf(arg);
	  if (type === 'function') {
	    if (hasKeys()) {
	      var properties = stringify(getDisplayIfNotGotten());
	      return cName + ' (with properties: ' + properties + ')';
	    }
	    return cName;
	  }

	  if (arg === null) {
	    return 'null';
	  }

	  if (type !== 'array' && type !== 'object') {
	    return type;
	  }

	  if (hasKeys()) {
	    return getDisplayIfNotGotten();
	  }

	  return cName;

	  // utility functions
	  function hasKeys() {
	    return arg && Object.keys(arg).length;
	  }

	  function getDisplayIfNotGotten() {
	    if (gottenArgs.indexOf(arg) !== -1) {
	      return '[Circular]';
	    }
	    gottenArgs.push(arg);
	    return getDisplay(arg, gottenArgs);
	  }
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
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var stringify = __webpack_require__(2);
	var checkerHelpers = {
	  addOptional: addOptional, getRequiredVersion: getRequiredVersion, setupChecker: setupChecker, addNullable: addNullable
	};

	module.exports = {
	  each: each, copy: copy, typeOf: typeOf, arrayify: arrayify, getCheckerDisplay: getCheckerDisplay,
	  isError: isError, list: list, getError: getError, nAtL: nAtL, t: t, undef: undef, checkerHelpers: checkerHelpers,
	  noop: noop
	};

	function copy(obj) {
	  var type = typeOf(obj);
	  var daCopy = undefined;
	  if (type === 'array') {
	    daCopy = [];
	  } else if (type === 'object') {
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
	    return 'array';
	  } else if (obj instanceof RegExp) {
	    return 'object';
	  } else {
	    return typeof obj;
	  }
	}

	function getCheckerDisplay(checker, options) {
	  /* eslint complexity:[2, 7] */
	  var display = undefined;
	  var short = options && options.short;
	  if (short && checker.shortType) {
	    display = checker.shortType;
	  } else if (!short && typeof checker.type === 'object' || checker.type === 'function') {
	    display = getCheckerType(checker, options);
	  } else {
	    display = getCheckerType(checker, options) || checker.displayName || checker.name;
	  }
	  return display;
	}

	function getCheckerType(_ref, options) {
	  var type = _ref.type;

	  if (typeof type === 'function') {
	    var __apiCheckData = type.__apiCheckData;
	    var typeTypes = type(options);
	    type = _defineProperty({
	      __apiCheckData: __apiCheckData
	    }, __apiCheckData.type, typeTypes);
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
	    return eachArry(obj, iterator, context);
	  } else {
	    return eachObj(obj, iterator, context);
	  }
	}

	function eachObj(obj, iterator, context) {
	  var ret = undefined;
	  var hasOwn = Object.prototype.hasOwnProperty;
	  /* eslint prefer-const:0 */ // some weird eslint bug?
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
	  var ret = undefined;
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
	    join = ' ';
	  }
	  return copy.join(join) + ('' + (copy.length ? join + finalJoin : '') + last);
	}

	function getError(name, location, checkerType) {
	  if (typeof checkerType === 'function') {
	    checkerType = checkerType({ short: true });
	  }
	  var stringType = typeof checkerType !== 'object' ? checkerType : stringify(checkerType);
	  return new Error(nAtL(name, location) + ' must be ' + t(stringType));
	}

	function nAtL(name, location) {
	  var tName = t(name || 'value');
	  var tLocation = !location ? '' : ' at ' + t(location);
	  return '' + tName + tLocation;
	}

	function t(thing) {
	  return '`' + thing + '`';
	}

	function undef(thing) {
	  return typeof thing === 'undefined';
	}

	/**
	 * This will set up the checker with all of the defaults that most checkers want like required by default and an
	 * optional version
	 *
	 * @param {Function} checker - the checker to setup with properties
	 * @param {Object} properties - properties to add to the checker
	 * @param {boolean} disabled - when set to true, this will set the checker to a no-op function
	 * @returns {Function} checker - the setup checker
	 */
	function setupChecker(checker, properties, disabled) {
	  /* eslint complexity:[2, 9] */
	  if (disabled) {
	    // swap out the checker for its own copy of noop
	    checker = getNoop();
	    checker.isNoop = true;
	  }

	  if (typeof checker.type === 'string') {
	    checker.shortType = checker.type;
	  }

	  // assign all properties given
	  each(properties, function (prop, name) {
	    return checker[name] = prop;
	  });

	  if (!checker.displayName) {
	    checker.displayName = 'apiCheck ' + t(checker.shortType || checker.type || checker.name) + ' type checker';
	  }

	  if (!checker.notRequired) {
	    checker = getRequiredVersion(checker, disabled);
	  }

	  if (!checker.notNullable) {
	    addNullable(checker, disabled);
	  }

	  if (!checker.notOptional) {
	    addOptional(checker, disabled);
	  }

	  return checker;
	}

	function getRequiredVersion(checker, disabled) {
	  var requiredChecker = disabled ? getNoop() : function requiredChecker(val, name, location, obj) {
	    if (undef(val) && !checker.isOptional) {
	      var tLocation = location ? ' in ' + t(location) : '';
	      var type = getCheckerDisplay(checker, { short: true });
	      var stringType = typeof type !== 'object' ? type : stringify(type);
	      return new Error('Required ' + t(name) + ' not specified' + tLocation + '. Must be ' + t(stringType));
	    } else {
	      return checker(val, name, location, obj);
	    }
	  };
	  copyProps(checker, requiredChecker);
	  requiredChecker.originalChecker = checker;
	  return requiredChecker;
	}

	function addOptional(checker, disabled) {
	  var optionalCheck = disabled ? getNoop() : function optionalCheck(val, name, location, obj) {
	    if (!undef(val)) {
	      return checker(val, name, location, obj);
	    }
	  };
	  // inherit all properties on the original checker
	  copyProps(checker, optionalCheck);

	  optionalCheck.isOptional = true;
	  optionalCheck.displayName = checker.displayName + ' (optional)';
	  optionalCheck.originalChecker = checker;

	  // the magic line that allows you to add .optional to the end of the checkers
	  checker.optional = optionalCheck;

	  fixType(checker, checker.optional);
	}

	function addNullable(checker, disabled) {
	  var nullableCheck = disabled ? getNoop() : function nullableCheck(val, name, location, obj) {
	    if (val !== null) {
	      return checker(val, name, location, obj);
	    }
	  };
	  // inherit all properties on the original checker
	  copyProps(checker, nullableCheck);

	  nullableCheck.isNullable = true;
	  nullableCheck.displayName = checker.displayName + ' (nullable)';
	  nullableCheck.originalChecker = checker;

	  // the magic line that allows you to add .nullable to the end of the checkers
	  checker.nullable = nullableCheck;

	  fixType(checker, checker.nullable);
	  if (!checker.notOptional) {
	    addOptional(checker.nullable, disabled);
	  }
	}

	function fixType(checker, checkerCopy) {
	  // fix type, because it's not a straight copy...
	  // the reason is we need to specify type.__apiCheckData.optional as true for the terse/verbose option.
	  // we also want to add "(optional)" to the types with a string
	  if (typeof checkerCopy.type === 'object') {
	    checkerCopy.type = copy(checkerCopy.type); // make our own copy of this
	  } else if (typeof checkerCopy.type === 'function') {
	      checkerCopy.type = function () {
	        return checker.type.apply(checker, arguments);
	      };
	    } else {
	      checkerCopy.type += ' (optional)';
	      return;
	    }
	  checkerCopy.type.__apiCheckData = copy(checker.type.__apiCheckData) || {}; // and this
	  checkerCopy.type.__apiCheckData.optional = true;
	}

	// UTILS

	function copyProps(src, dest) {
	  each(Object.keys(src), function (key) {
	    return dest[key] = src[key];
	  });
	}

	function noop() {}

	function getNoop() {
	  /* eslint no-shadow:0 */
	  /* istanbul ignore next */
	  return function noop() {};
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stringify = __webpack_require__(2);

	var _require = __webpack_require__(3);

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

	var checkers = module.exports = getCheckers();
	module.exports.getCheckers = getCheckers;

	function getCheckers(disabled) {
	  return {
	    array: typeOfCheckGetter('Array'),
	    bool: typeOfCheckGetter('Boolean'),
	    number: typeOfCheckGetter('Number'),
	    string: typeOfCheckGetter('String'),
	    func: funcCheckGetter(),
	    object: objectCheckGetter(),

	    emptyObject: emptyObjectCheckGetter(),

	    instanceOf: instanceCheckGetter,
	    oneOf: oneOfCheckGetter,
	    oneOfType: oneOfTypeCheckGetter,

	    arrayOf: arrayOfCheckGetter,
	    objectOf: objectOfCheckGetter,
	    typeOrArrayOf: typeOrArrayOfCheckGetter,

	    range: rangeCheckGetter,
	    lessThan: lessThanCheckGetter,
	    greaterThan: greaterThanCheckGetter,

	    shape: getShapeCheckGetter(),
	    args: argumentsCheckerGetter(),

	    any: anyCheckGetter(),
	    'null': nullCheckGetter()

	  };

	  function typeOfCheckGetter(type) {
	    var lType = type.toLowerCase();
	    return setupChecker(function typeOfCheckerDefinition(val, name, location) {
	      if (typeOf(val) !== lType) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }

	  function funcCheckGetter() {
	    var type = 'Function';
	    var functionChecker = setupChecker(function functionCheckerDefinition(val, name, location) {
	      if (typeOf(val) !== 'function') {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);

	    functionChecker.withProperties = function getWithPropertiesChecker(properties) {
	      var apiError = checkers.objectOf(checkers.func)(properties, 'properties', 'apiCheck.func.withProperties');
	      if (isError(apiError)) {
	        throw apiError;
	      }
	      var shapeChecker = checkers.shape(properties, true);
	      shapeChecker.type.__apiCheckData.type = 'func.withProperties';

	      return setupChecker(function functionWithPropertiesChecker(val, name, location) {
	        var notFunction = checkers.func(val, name, location);
	        if (isError(notFunction)) {
	          return notFunction;
	        }
	        return shapeChecker(val, name, location);
	      }, { type: shapeChecker.type, shortType: 'func.withProperties' }, disabled);
	    };
	    return functionChecker;
	  }

	  function objectCheckGetter() {
	    var type = 'Object';
	    var nullType = 'Object (null ok)';
	    var objectNullOkChecker = setupChecker(function objectNullOkCheckerDefinition(val, name, location) {
	      if (typeOf(val) !== 'object') {
	        return getError(name, location, nullType);
	      }
	    }, { type: nullType }, disabled);

	    var objectChecker = setupChecker(function objectCheckerDefinition(val, name, location) {
	      if (val === null || isError(objectNullOkChecker(val, name, location))) {
	        return getError(name, location, objectChecker.type);
	      }
	    }, { type: type, nullOk: objectNullOkChecker }, disabled);

	    return objectChecker;
	  }

	  function instanceCheckGetter(classToCheck) {
	    return setupChecker(function instanceCheckerDefinition(val, name, location) {
	      if (!(val instanceof classToCheck)) {
	        return getError(name, location, classToCheck.name);
	      }
	    }, { type: classToCheck.name }, disabled);
	  }

	  function oneOfCheckGetter(enums) {
	    var type = {
	      __apiCheckData: { optional: false, type: 'enum' },
	      'enum': enums
	    };
	    var shortType = 'oneOf[' + enums.map(function (enm) {
	      return stringify(enm);
	    }).join(', ') + ']';
	    return setupChecker(function oneOfCheckerDefinition(val, name, location) {
	      if (!enums.some(function (enm) {
	        return enm === val;
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }

	  function oneOfTypeCheckGetter(typeCheckers) {
	    var checkersDisplay = typeCheckers.map(function (checker) {
	      return getCheckerDisplay(checker, { short: true });
	    });
	    var shortType = 'oneOfType[' + checkersDisplay.join(', ') + ']';
	    function type(options) {
	      if (options && options.short) {
	        return shortType;
	      }
	      return typeCheckers.map(function (checker) {
	        return getCheckerDisplay(checker, options);
	      });
	    }
	    type.__apiCheckData = { optional: false, type: 'oneOfType' };
	    return setupChecker(function oneOfTypeCheckerDefinition(val, name, location) {
	      if (!typeCheckers.some(function (checker) {
	        return !isError(checker(val, name, location));
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }

	  function arrayOfCheckGetter(checker) {
	    var shortCheckerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = 'arrayOf[' + shortCheckerDisplay + ']';

	    function type(options) {
	      if (options && options.short) {
	        return shortType;
	      }
	      return getCheckerDisplay(checker, options);
	    }
	    type.__apiCheckData = { optional: false, type: 'arrayOf' };

	    return setupChecker(function arrayOfCheckerDefinition(val, name, location) {
	      if (isError(checkers.array(val)) || !val.every(function (item) {
	        return !isError(checker(item));
	      })) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }

	  function objectOfCheckGetter(checker) {
	    var checkerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = 'objectOf[' + checkerDisplay + ']';

	    function type(options) {
	      if (options && options.short) {
	        return shortType;
	      }
	      return getCheckerDisplay(checker, options);
	    }
	    type.__apiCheckData = { optional: false, type: 'objectOf' };

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
	    }, { type: type, shortType: shortType }, disabled);
	  }

	  function typeOrArrayOfCheckGetter(checker) {
	    var checkerDisplay = getCheckerDisplay(checker, { short: true });
	    var shortType = 'typeOrArrayOf[' + checkerDisplay + ']';

	    function type(options) {
	      if (options && options.short) {
	        return shortType;
	      }
	      return getCheckerDisplay(checker, options);
	    }

	    type.__apiCheckData = { optional: false, type: 'typeOrArrayOf' };
	    return setupChecker(function typeOrArrayOfDefinition(val, name, location, obj) {
	      if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
	        return getError(name, location, shortType);
	      }
	    }, { type: type, shortType: shortType }, disabled);
	  }

	  function getShapeCheckGetter() {
	    function shapeCheckGetter(shape, nonObject) {
	      var shapeTypes = {};
	      each(shape, function (checker, prop) {
	        shapeTypes[prop] = getCheckerDisplay(checker);
	      });
	      function type() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        var ret = {};
	        var terse = options.terse;
	        var obj = options.obj;
	        var addHelpers = options.addHelpers;

	        var parentRequired = options.required;
	        each(shape, function (checker, prop) {
	          /* eslint complexity:[2, 6] */
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

	        function modifyTypeDisplayToHelpOut(theRet, prop, specified, checker, required) {
	          if (!specified && required && !checker.isOptional) {
	            var item = 'ITEM';
	            if (checker.type && checker.type.__apiCheckData) {
	              item = checker.type.__apiCheckData.type.toUpperCase();
	            }
	            addHelper('missing', 'MISSING THIS ' + item, ' <-- YOU ARE MISSING THIS');
	          } else if (specified) {
	            var error = checker(obj[prop], prop, null, obj);
	            if (isError(error)) {
	              addHelper('error', 'THIS IS THE PROBLEM: ' + error.message, ' <-- THIS IS THE PROBLEM: ' + error.message);
	            }
	          }

	          function addHelper(property, objectMessage, stringMessage) {
	            if (typeof theRet[prop] === 'string') {
	              theRet[prop] += stringMessage;
	            } else {
	              theRet[prop].__apiCheckData[property] = objectMessage;
	            }
	          }
	        }
	      }

	      type.__apiCheckData = { strict: false, optional: false, type: 'shape' };
	      var shapeChecker = setupChecker(function shapeCheckerDefinition(val, name, location) {
	        /* eslint complexity:[2, 6] */
	        var isObject = !nonObject && checkers.object(val, name, location);
	        if (isError(isObject)) {
	          return isObject;
	        }
	        var shapePropError = undefined;
	        location = location ? location + (name ? '/' : '') : '';
	        name = name || '';
	        each(shape, function (checker, prop) {
	          if (val.hasOwnProperty(prop) || !checker.isOptional) {
	            shapePropError = checker(val[prop], prop, '' + location + name, val);
	            return !isError(shapePropError);
	          }
	        });
	        if (isError(shapePropError)) {
	          return shapePropError;
	        }
	      }, { type: type, shortType: 'shape' }, disabled);

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
	          return new Error(nAtL(name, location) + ' cannot have extra properties: ' + t(extraProps.join('`, `')) + '.' + ('It is limited to ' + t(allowedProperties.join('`, `'))));
	        }
	      }, { type: strictType, shortType: 'strict shape' }, disabled);

	      return shapeChecker;
	    }

	    shapeCheckGetter.ifNot = function ifNot(otherProps, propChecker) {
	      if (!Array.isArray(otherProps)) {
	        otherProps = [otherProps];
	      }
	      var description = undefined;
	      if (otherProps.length === 1) {
	        description = 'specified only if ' + otherProps[0] + ' is not specified';
	      } else {
	        description = 'specified only if none of the following are specified: [' + list(otherProps, ', ', 'and ') + ']';
	      }
	      var shortType = 'ifNot[' + otherProps.join(', ') + ']';
	      var type = getTypeForShapeChild(propChecker, description, shortType);
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
	      }, { notRequired: true, type: type, shortType: shortType }, disabled);
	    };

	    shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
	      otherProps = arrayify(otherProps);
	      var description = undefined;
	      if (otherProps.length === 1) {
	        description = 'specified only if ' + otherProps[0] + ' is also specified';
	      } else {
	        description = 'specified only if all of the following are specified: [' + list(otherProps, ', ', 'and ') + ']';
	      }
	      var shortType = 'onlyIf[' + otherProps.join(', ') + ']';
	      var type = getTypeForShapeChild(propChecker, description, shortType);
	      return setupChecker(function onlyIfCheckerDefinition(prop, propName, location, obj) {
	        var othersPresent = otherProps.every(function (property) {
	          return obj.hasOwnProperty(property);
	        });
	        if (!othersPresent) {
	          return getError(propName, location, type);
	        } else {
	          return propChecker(prop, propName, location, obj);
	        }
	      }, { type: type, shortType: shortType }, disabled);
	    };

	    shapeCheckGetter.requiredIfNot = function shapeRequiredIfNot(otherProps, propChecker) {
	      if (!Array.isArray(otherProps)) {
	        otherProps = [otherProps];
	      }
	      return getRequiredIfNotChecker(false, otherProps, propChecker);
	    };

	    shapeCheckGetter.requiredIfNot.all = function shapeRequiredIfNotAll(otherProps, propChecker) {
	      if (!Array.isArray(otherProps)) {
	        throw new Error('requiredIfNot.all must be passed an array');
	      }
	      return getRequiredIfNotChecker(true, otherProps, propChecker);
	    };

	    function getRequiredIfNotChecker(all, otherProps, propChecker) {
	      var props = t(otherProps.join(', '));
	      var ifProps = 'if ' + (all ? 'all of' : 'at least one of');
	      var description = 'specified ' + ifProps + ' these are not specified: ' + props + ' (otherwise it\'s optional)';
	      var shortType = 'requiredIfNot' + (all ? '.all' : '') + '[' + otherProps.join(', ') + '}]';
	      var type = getTypeForShapeChild(propChecker, description, shortType);
	      return setupChecker(function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
	        var propExists = obj && obj.hasOwnProperty(propName);
	        var iteration = all ? 'every' : 'some';
	        var otherPropsExist = otherProps[iteration](function (otherProp) {
	          return obj && obj.hasOwnProperty(otherProp);
	        });
	        if (!otherPropsExist && !propExists) {
	          return getError(propName, location, type);
	        } else if (propExists) {
	          return propChecker(prop, propName, location, obj);
	        }
	      }, { type: type, notRequired: true }, disabled);
	    }

	    return shapeCheckGetter;

	    function getTypeForShapeChild(propChecker, description, shortType) {
	      function type(options) {
	        if (options && options.short) {
	          return shortType;
	        }
	        return getCheckerDisplay(propChecker);
	      }
	      type.__apiCheckData = { optional: false, type: 'ifNot', description: description };
	      return type;
	    }
	  }

	  function argumentsCheckerGetter() {
	    var type = 'function arguments';
	    return setupChecker(function argsCheckerDefinition(val, name, location) {
	      if (Array.isArray(val) || isError(checkers.object(val)) || isError(checkers.number(val.length))) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }

	  function anyCheckGetter() {
	    return setupChecker(function anyCheckerDefinition() {
	      // don't do anything
	    }, { type: 'any' }, disabled);
	  }

	  function nullCheckGetter() {
	    var type = 'null';
	    return setupChecker(function nullChecker(val, name, location) {
	      if (val !== null) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }

	  function rangeCheckGetter(min, max) {
	    var type = 'Range (' + min + ' - ' + max + ')';
	    return setupChecker(function rangeChecker(val, name, location) {
	      if (typeof val !== 'number' || val < min || val > max) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }

	  function lessThanCheckGetter(min) {
	    var type = 'lessThan[' + min + ']';
	    return setupChecker(function lessThanChecker(val, name, location) {
	      if (typeof val !== 'number' || val > min) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }

	  function greaterThanCheckGetter(max) {
	    var type = 'greaterThan[' + max + ']';
	    return setupChecker(function greaterThanChecker(val, name, location) {
	      if (typeof val !== 'number' || val < max) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }

	  function emptyObjectCheckGetter() {
	    var type = 'empty object';
	    return setupChecker(function emptyObjectChecker(val, name, location) {
	      if (typeOf(val) !== 'object' || val === null || Object.keys(val).length) {
	        return getError(name, location, type);
	      }
	    }, { type: type }, disabled);
	  }
	}

/***/ }
/******/ ])
});
;