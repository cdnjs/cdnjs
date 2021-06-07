(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["planout_core_compatible"] = factory();
	else
		root["planout_core_compatible"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Assignment": () => /* binding */ Assignment,
  "Experiment": () => /* binding */ Experiment,
  "ExperimentSetup": () => /* binding */ ExperimentSetup,
  "Interpreter": () => /* binding */ Interpreter,
  "Namespace": () => /* binding */ Namespace,
  "Ops": () => /* binding */ Ops
});

// NAMESPACE OBJECT: ./es6/experimentSetup.js
var experimentSetup_namespaceObject = {};
__webpack_require__.r(experimentSetup_namespaceObject);
__webpack_require__.d(experimentSetup_namespaceObject, {
  "getExperimentInputs": () => getExperimentInputs,
  "registerExperimentInput": () => registerExperimentInput
});

// NAMESPACE OBJECT: ./es6/ops/base.js
var base_namespaceObject = {};
__webpack_require__.r(base_namespaceObject);
__webpack_require__.d(base_namespaceObject, {
  "PlanOutOp": () => PlanOutOp,
  "PlanOutOpBinary": () => PlanOutOpBinary,
  "PlanOutOpCommutative": () => PlanOutOpCommutative,
  "PlanOutOpSimple": () => PlanOutOpSimple,
  "PlanOutOpUnary": () => PlanOutOpUnary
});

// NAMESPACE OBJECT: ./es6/ops/utils.js
var ops_utils_namespaceObject = {};
__webpack_require__.r(ops_utils_namespaceObject);
__webpack_require__.d(ops_utils_namespaceObject, {
  "StopPlanOutException": () => StopPlanOutException,
  "initializeOperators": () => initializeOperators,
  "isOperator": () => isOperator,
  "operatorInstance": () => operatorInstance,
  "registerOperators": () => registerOperators
});

// NAMESPACE OBJECT: ./es6/ops/core.js
var core_namespaceObject = {};
__webpack_require__.r(core_namespaceObject);
__webpack_require__.d(core_namespaceObject, {
  "And": () => And,
  "Arr": () => Arr,
  "Coalesce": () => Coalesce,
  "Cond": () => Cond,
  "Divide": () => Divide,
  "Equals": () => Equals,
  "Exp": () => Exp,
  "Get": () => Get,
  "GreaterThan": () => GreaterThan,
  "GreaterThanOrEqualTo": () => GreaterThanOrEqualTo,
  "Index": () => Index,
  "Length": () => Length,
  "LessThan": () => LessThan,
  "LessThanOrEqualTo": () => LessThanOrEqualTo,
  "Literal": () => Literal,
  "Map": () => Map,
  "Max": () => Max,
  "Min": () => Min,
  "Mod": () => Mod,
  "Negative": () => Negative,
  "Not": () => Not,
  "Or": () => Or,
  "Product": () => Product,
  "Return": () => Return,
  "Round": () => Round,
  "Seq": () => Seq,
  "Set": () => Set,
  "Sqrt": () => Sqrt,
  "Sum": () => Sum
});

// NAMESPACE OBJECT: ./es6/ops/randomPlanoutCoreCompatible.js
var randomPlanoutCoreCompatible_namespaceObject = {};
__webpack_require__.r(randomPlanoutCoreCompatible_namespaceObject);
__webpack_require__.d(randomPlanoutCoreCompatible_namespaceObject, {
  "BernoulliFilter": () => BernoulliFilterCoreCompatible,
  "BernoulliTrial": () => BernoulliTrialCoreCompatible,
  "PlanOutOpRandom": () => PlanOutOpRandomCoreCompatible,
  "RandomFloat": () => RandomFloatCoreCompatible,
  "RandomInteger": () => RandomIntegerCoreCompatible,
  "Sample": () => SampleCoreCompatible,
  "UniformChoice": () => UniformChoiceCoreCompatible,
  "WeightedChoice": () => WeightedChoiceCoreCompatible
});

;// CONCATENATED MODULE: ./es6/lib/utils.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*  Most of these functions are from the wonderful Underscore package http://underscorejs.org/
    This file exists so that the planoutjs library doesn't depend on a few unneeded third party dependencies
    so that consumers of the library don't have to include dependencies such as underscore. As well, this helps reduce
    the file size of the resulting library.
*/
var trimTrailingWhitespace = function trimTrailingWhitespace(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var getParameterByName = function getParameterByName(name) {
  var hasLocation = typeof location !== 'undefined';
  var hasWindow = typeof window !== 'undefined';
  var queryParamVal;

  if (hasLocation) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    queryParamVal = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  } else {
    queryParamVal = "";
  }

  if (queryParamVal === null || queryParamVal === undefined || queryParamVal.length === 0) {
    if (hasWindow && window.localStorage !== undefined && window.localStorage !== null) {
      return window.localStorage.getItem(name);
    }
  }

  return queryParamVal;
};

var deepCopy = function deepCopy(obj) {
  var newObj = obj;

  if (obj && _typeof(obj) === 'object') {
    newObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};

    for (var i in obj) {
      newObj[i] = deepCopy(obj[i]);
    }
  }

  return newObj;
};

var isObject = function isObject(obj) {
  var type = _typeof(obj);

  return type === 'function' || type === 'object' && !!obj;
};

var isArray = function isArray(object) {
  if (Array.isArray) {
    return Array.isArray(object);
  } else {
    return Object.prototype.toString.call(object) === '[object Array]';
  }
};

var isFunction = function isFunction(obj) {
  return typeof obj == 'function' || false;
}; //extend helpers


var keys = function keys(obj) {
  if (!isObject(obj)) return [];
  if (Object.keys) return Object.keys(obj);
  var keys = [];

  for (var key in obj) {
    if (has(obj, key)) keys.push(key);
  }

  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

var allKeys = function allKeys(obj) {
  if (!isObject(obj)) return [];
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

var extendHolder = function extendHolder(keysFunc, undefinedOnly) {
  return function (obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;

    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;

      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
    }

    return obj;
  };
}; //extend functionality from underscore


var extend = extendHolder(allKeys);
var extendOwn = extendHolder(keys);
/* underscore helpers */

var identity = function identity(value) {
  return value;
};

var isMatch = function isMatch(object, attrs) {
  var keys = keys(attrs),
      length = keys.length;
  if (object == null) return !length;
  var obj = Object(object);

  for (var i = 0; i < length; i++) {
    var key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }

  return true;
};

var matcher = function matcher(attrs) {
  attrs = extendOwn({}, attrs);
  return function (obj) {
    return isMatch(obj, attrs);
  };
};

var cb = function cb(value, context, argCount) {
  if (value == null) return identity;
  if (isFunction(value)) return optimizeCb(value, context, argCount);
  if (isObject(value)) return matcher(value);
  return property(value);
};

var optimizeCb = function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };

    case 2:
      return function (value, other) {
        return func.call(context, value, other);
      };

    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };

    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }

  return function () {
    return func.apply(context, arguments);
  };
}; //from underscore


var forEach = function forEach(obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;

  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var theKeys = keys(obj);

    for (i = 0, length = theKeys.length; i < length; i++) {
      iteratee(obj[theKeys[i]], theKeys[i], obj);
    }
  }

  return obj;
}; //map functionality from underscore


var map = function map(obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var theKeys = !isArrayLike(obj) && keys(obj),
      length = (theKeys || obj).length,
      results = Array(length);

  for (var index = 0; index < length; index++) {
    var currentKey = theKeys ? theKeys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}; //reduce functionality from underscore


var reduce = function reduce(obj, iteratee, memo, context) {
  iteratee = optimizeCb(iteratee, context, 4);
  var theKeys = !isArrayLike(obj) && keys(obj),
      length = (theKeys || obj).length,
      index = 0;

  if (arguments.length < 3) {
    memo = obj[theKeys ? theKeys[index] : index];
    index += 1;
  }

  for (; index >= 0 && index < length; index++) {
    var currentKey = theKeys ? theKeys[index] : index;
    memo = iteratee(memo, obj[currentKey], currentKey, obj);
  }

  return memo;
}; //clone functionality from underscore


var shallowCopy = function shallowCopy(obj) {
  if (!isObject(obj)) return obj;
  return isArray(obj) ? obj.slice() : extend({}, obj);
};
/* helper functions from underscore */


var property = function property(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');

var isArrayLike = function isArrayLike(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

var has = function has(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
};
/* All these are helper functions to deal with older versions of IE  :(*/


var hasEnumBug = !{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

function collectNonEnumProps(obj, keys) {
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = isFunction(constructor) && constructor.prototype || Object.Prototype;
  var prop = 'constructor';
  if (has(obj, prop) && !contains(keys, prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];

    if (prop in obj && obj[prop] !== proto[prop] && !contains(keys, prop)) {
      keys.push(prop);
    }
  }
}

var contains = function contains(obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = vals(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return obj.indexOf(item) >= 0;
};

var vals = function vals(obj) {
  var objectKeys = keys(obj);
  var length = objectKeys.length;
  var values = Array(length);

  for (var i = 0; i < length; i++) {
    values[i] = obj[objectKeys[i]];
  }

  return values;
};

var range = function range(max) {
  var l = [];

  for (var i = 0; i < max; i++) {
    l.push(i);
  }

  return l;
};

var hasKey = function hasKey(obj, key) {
  return typeof obj[key] !== 'undefined';
};


;// CONCATENATED MODULE: ./es6/assignment.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


function provideAssignment(Random) {
  var Assignment = /*#__PURE__*/function () {
    function Assignment(experimentSalt, overrides) {
      _classCallCheck(this, Assignment);

      if (!overrides) {
        overrides = {};
      }

      this.experimentSalt = experimentSalt;
      this._overrides = shallowCopy(overrides);
      this._data = shallowCopy(overrides);
      this.saltSeparator = '.';
    }

    _createClass(Assignment, [{
      key: "evaluate",
      value: function evaluate(value) {
        return value;
      }
    }, {
      key: "getOverrides",
      value: function getOverrides() {
        return this._overrides;
      }
    }, {
      key: "addOverride",
      value: function addOverride(key, value) {
        this._overrides[key] = value;
        this._data[key] = value;
      }
    }, {
      key: "setOverrides",
      value: function setOverrides(overrides) {
        this._overrides = shallowCopy(overrides);
        var self = this;
        forEach(Object.keys(this._overrides), function (overrideKey) {
          self._data[overrideKey] = self._overrides[overrideKey];
        });
      }
    }, {
      key: "set",
      value: function set(name, value) {
        if (name === '_data') {
          this._data = value;
          return;
        } else if (name === '_overrides') {
          this._overrides = value;
          return;
        } else if (name === 'experimentSalt') {
          this.experimentSalt = value;
          return;
        } else if (name === 'saltSeparator') {
          this.saltSeparator = value;
          return;
        }

        if (hasKey(this._overrides, name)) {
          return;
        }

        if (value instanceof Random.PlanOutOpRandom) {
          if (!value.args.salt) {
            value.args.salt = name;
          }

          this._data[name] = value.execute(this);
        } else {
          this._data[name] = value;
        }
      }
    }, {
      key: "get",
      value: function get(name, defaultVal) {
        if (name === '_data') {
          return this._data;
        } else if (name === '_overrides') {
          return this._overrides;
        } else if (name === 'experimentSalt') {
          return this.experimentSalt;
        } else if (name === 'saltSeparator') {
          return this.saltSeparator;
        } else {
          var value = this._data[name];
          return value === null || value === undefined ? defaultVal : value;
        }
      }
    }, {
      key: "getParams",
      value: function getParams() {
        return this._data;
      }
    }, {
      key: "del",
      value: function del(name) {
        delete this._data[name];
      }
    }, {
      key: "toString",
      value: function toString() {
        return String(this._data);
      }
    }, {
      key: "length",
      value: function length() {
        return Object.keys(this._data).length;
      }
    }]);

    return Assignment;
  }();

  ;
  return Assignment;
}
;// CONCATENATED MODULE: ./es6/experiment.js
function experiment_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function experiment_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function experiment_createClass(Constructor, protoProps, staticProps) { if (protoProps) experiment_defineProperties(Constructor.prototype, protoProps); if (staticProps) experiment_defineProperties(Constructor, staticProps); return Constructor; }


function provideExperiment(Assignment) {
  var Experiment = /*#__PURE__*/function () {
    function Experiment(inputs) {
      experiment_classCallCheck(this, Experiment);

      this.inputs = inputs;
      this._exposureLogged = false;
      this._salt = null;
      this._inExperiment = true;
      this._autoExposureLog = true;
      this.setup();

      if (!this.name) {
        throw "setup() must set an experiment name via this.setName()";
      }

      this._assignment = new Assignment(this.getSalt());
      this._assigned = false;
    }
    /* default implementation of fetching the range of experiment parameters that this experiment can take */


    experiment_createClass(Experiment, [{
      key: "getDefaultParamNames",
      value: function getDefaultParamNames() {
        var assignmentFxn = this.assign.toString();
        var possibleKeys = assignmentFxn.split('.set(');
        possibleKeys.splice(0, 1); //remove first index since it'll have the function definitions

        return map(possibleKeys, function (val) {
          var str = trimTrailingWhitespace(val.split(',')[0]);
          return str.substr(1, str.length - 2); //remove string chars
        });
      }
    }, {
      key: "requireAssignment",
      value: function requireAssignment() {
        if (!this._assigned) {
          this._assign();
        }
      }
    }, {
      key: "requireExposureLogging",
      value: function requireExposureLogging(paramName) {
        if (this.shouldLogExposure(paramName)) {
          this.logExposure();
        }
      }
    }, {
      key: "_assign",
      value: function _assign() {
        this.configureLogger();
        var assignVal = this.assign(this._assignment, this.inputs);

        if (assignVal || assignVal === undefined) {
          this._inExperiment = true;
        } else {
          this._inExperiment = false;
        }

        this._assigned = true;
      }
    }, {
      key: "setup",
      value: function setup() {
        throw "IMPLEMENT setup";
      }
    }, {
      key: "inExperiment",
      value: function inExperiment() {
        return this._inExperiment;
      }
    }, {
      key: "addOverride",
      value: function addOverride(key, value) {
        this._assignment.addOverride(key, value);
      }
    }, {
      key: "setOverrides",
      value: function setOverrides(value) {
        this._assignment.setOverrides(value);

        var o = this._assignment.getOverrides();

        var self = this;
        forEach(Object.keys(o), function (key) {
          if (self.inputs[key] !== undefined) {
            self.inputs[key] = o[key];
          }
        });
      }
    }, {
      key: "setLocalOverride",
      value: function setLocalOverride(name) {
        var experimentName = getParameterByName('experimentOverride');
        var overrideValue = getParameterByName(name);

        if (experimentName === this.name && overrideValue) {
          this.addOverride(name, overrideValue);
        }
      }
    }, {
      key: "getSalt",
      value: function getSalt() {
        if (this._salt) {
          return this._salt;
        } else {
          return this.name;
        }
      }
    }, {
      key: "setSalt",
      value: function setSalt(value) {
        this._salt = value;

        if (this._assignment) {
          this._assignment.experimentSalt = value;
        }
      }
    }, {
      key: "getName",
      value: function getName() {
        return this.name;
      }
    }, {
      key: "assign",
      value: function assign(params, args) {
        throw "IMPLEMENT assign";
      }
      /*
      This function should return a list of the possible parameter names that the assignment procedure may assign.
      You can optionally override this function to always return this.getDefaultParamNames()
      which will analyze your program at runtime to determine what the range of possible experimental parameters are.
      Otherwise, simply return a fixed list of the experimental parameters that your assignment procedure may assign.
      */

    }, {
      key: "getParamNames",
      value: function getParamNames() {
        throw "IMPLEMENT getParamNames";
      }
    }, {
      key: "shouldFetchExperimentParameter",
      value: function shouldFetchExperimentParameter(name) {
        var experimentalParams = this.getParamNames();
        return experimentalParams.indexOf(name) >= 0;
      }
    }, {
      key: "setName",
      value: function setName(value) {
        var re = /\s+/g;
        this.name = value.replace(re, '-');

        if (this._assignment) {
          this._assignment.experimentSalt = this.getSalt();
        }
      }
    }, {
      key: "__asBlob",
      value: function __asBlob() {
        var extras = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var d = {
          'name': this.getName(),
          'time': new Date().getTime() / 1000,
          'salt': this.getSalt(),
          'inputs': this.inputs,
          'params': this._assignment.getParams()
        };
        extend(d, extras);
        return d;
      }
    }, {
      key: "setAutoExposureLogging",
      value: function setAutoExposureLogging(value) {
        this._autoExposureLog = value;
      }
    }, {
      key: "getParams",
      value: function getParams() {
        this.requireAssignment();
        this.requireExposureLogging();
        return this._assignment.getParams();
      }
    }, {
      key: "get",
      value: function get(name, def) {
        this.requireAssignment();
        this.requireExposureLogging(name);
        this.setLocalOverride(name);
        return this._assignment.get(name, def);
      }
    }, {
      key: "toString",
      value: function toString() {
        this.requireAssignment();
        this.requireExposureLogging();
        return JSON.stringify(this.__asBlob());
      }
    }, {
      key: "logExposure",
      value: function logExposure(extras) {
        if (!this.inExperiment()) {
          return;
        }

        this._exposureLogged = true;
        this.logEvent('exposure', extras);
      }
    }, {
      key: "shouldLogExposure",
      value: function shouldLogExposure(paramName) {
        if (paramName !== undefined && !this.shouldFetchExperimentParameter(paramName)) {
          return false;
        }

        return this._autoExposureLog && !this.previouslyLogged();
      }
    }, {
      key: "logEvent",
      value: function logEvent(eventType, extras) {
        if (!this.inExperiment()) {
          return;
        }

        var extraPayload;

        if (extras) {
          extraPayload = {
            'event': eventType,
            'extra_data': shallowCopy(extras)
          };
        } else {
          extraPayload = {
            'event': eventType
          };
        }

        this.log(this.__asBlob(extraPayload));
      }
    }, {
      key: "configureLogger",
      value: function configureLogger() {
        throw "IMPLEMENT configureLogger";
      }
    }, {
      key: "log",
      value: function log(data) {
        throw "IMPLEMENT log";
      }
    }, {
      key: "previouslyLogged",
      value: function previouslyLogged() {
        throw "IMPLEMENT previouslyLogged";
      }
    }]);

    return Experiment;
  }();

  return Experiment;
}
;// CONCATENATED MODULE: ./es6/experimentSetup.js

var globalInputArgs = {};
var experimentSpecificInputArgs = {};

var fetchInputs = function fetchInputs(args) {
  if (!args) {
    return {};
  }

  return resolveArgs(shallowCopy(args));
};

var resolveArgs = function resolveArgs(args) {
  forEach(Object.keys(args), function (key) {
    if (isFunction(args[key])) {
      args[key] = args[key]();
    }
  });
  return args;
};

var registerExperimentInput = function registerExperimentInput(key, value, experimentName) {
  if (!experimentName) {
    globalInputArgs[key] = value;
  } else {
    if (!experimentSpecificInputArgs[experimentName]) {
      experimentSpecificInputArgs[experimentName] = {};
    }

    experimentSpecificInputArgs[experimentName][key] = value;
  }
};

var getExperimentInputs = function getExperimentInputs(experimentName) {
  var inputArgs = fetchInputs(globalInputArgs);

  if (experimentName && experimentSpecificInputArgs[experimentName]) {
    return extend(inputArgs, fetchInputs(experimentSpecificInputArgs[experimentName]));
  }

  return inputArgs;
};


;// CONCATENATED MODULE: ./es6/interpreter.js
function interpreter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function interpreter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function interpreter_createClass(Constructor, protoProps, staticProps) { if (protoProps) interpreter_defineProperties(Constructor.prototype, protoProps); if (staticProps) interpreter_defineProperties(Constructor, staticProps); return Constructor; }


function provideInterpreter(OpsUtils, Assignment) {
  var Interpreter = /*#__PURE__*/function () {
    function Interpreter(serialization) {
      var experimentSalt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global_salt';
      var inputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var environment = arguments.length > 3 ? arguments[3] : undefined;

      interpreter_classCallCheck(this, Interpreter);

      this._serialization = deepCopy(serialization);

      if (!environment) {
        this._env = new Assignment(experimentSalt);
      } else {
        this._env = environment;
      }

      this.experimentSalt = this._experimentSalt = experimentSalt;
      this._evaluated = false;
      this._inExperiment = false;
      this._inputs = shallowCopy(inputs);
    }

    interpreter_createClass(Interpreter, [{
      key: "inExperiment",
      value: function inExperiment() {
        return this._inExperiment;
      }
    }, {
      key: "setEnv",
      value: function setEnv(newEnv) {
        this._env = deepCopy(newEnv);
        return this;
      }
    }, {
      key: "has",
      value: function has(name) {
        return this._env[name];
      }
    }, {
      key: "get",
      value: function get(name, defaultVal) {
        var inputVal = this._inputs[name];

        if (inputVal === null || inputVal === undefined) {
          inputVal = defaultVal;
        }

        var envVal = this._env.get(name);

        if (envVal !== undefined && envVal !== null) {
          return envVal;
        }

        return inputVal;
      }
    }, {
      key: "getParams",
      value: function getParams() {
        if (!this._evaluated) {
          try {
            this.evaluate(this._serialization);
          } catch (err) {
            if (err instanceof OpsUtils.StopPlanOutException) {
              this._inExperiment = err.inExperiment;
            }
          }

          this._evaluated = true;
        }

        return this._env.getParams();
      }
    }, {
      key: "set",
      value: function set(name, value) {
        this._env.set(name, value);

        return this;
      }
    }, {
      key: "getSaltSeparator",
      value: function getSaltSeparator() {
        return this._env.saltSeparator;
      }
    }, {
      key: "setOverrides",
      value: function setOverrides(overrides) {
        this._env.setOverrides(overrides);

        return this;
      }
    }, {
      key: "getOverrides",
      value: function getOverrides() {
        return this._env.getOverrides();
      }
    }, {
      key: "hasOverride",
      value: function hasOverride(name) {
        var overrides = this.getOverrides();
        return overrides && overrides[name] !== undefined;
      }
    }, {
      key: "registerCustomOperators",
      value: function registerCustomOperators(operators) {
        OpsUtils.registerOperators(operators);
      }
    }, {
      key: "evaluate",
      value: function evaluate(planoutCode) {
        if (isObject(planoutCode) && planoutCode.op) {
          return OpsUtils.operatorInstance(planoutCode).execute(this);
        } else if (isArray(planoutCode)) {
          var self = this;
          return map(planoutCode, function (obj) {
            return self.evaluate(obj);
          });
        } else {
          return planoutCode;
        }
      }
    }]);

    return Interpreter;
  }();

  return Interpreter;
}
;// CONCATENATED MODULE: ./es6/ops/base.js
function base_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { base_typeof = function _typeof(obj) { return typeof obj; }; } else { base_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return base_typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (base_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function base_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function base_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function base_createClass(Constructor, protoProps, staticProps) { if (protoProps) base_defineProperties(Constructor.prototype, protoProps); if (staticProps) base_defineProperties(Constructor, staticProps); return Constructor; }



var PlanOutOp = /*#__PURE__*/function () {
  function PlanOutOp(args) {
    base_classCallCheck(this, PlanOutOp);

    this.args = args;
  }

  base_createClass(PlanOutOp, [{
    key: "execute",
    value: function execute(mapper) {
      throw "Implement the execute function";
    }
  }, {
    key: "dumpArgs",
    value: function dumpArgs() {
      console.log(this.args);
    }
  }, {
    key: "getArgMixed",
    value: function getArgMixed(name) {
      if (this.args[name] === undefined) {
        throw "Missing argument " + name;
      }

      return this.args[name];
    }
  }, {
    key: "getArgNumber",
    value: function getArgNumber(name) {
      var cur = this.getArgMixed(name);

      if (typeof cur !== "number") {
        throw name + " is not a number.";
      }

      return cur;
    }
  }, {
    key: "getArgString",
    value: function getArgString(name) {
      var cur = this.getArgMixed(name);

      if (typeof cur !== "string") {
        throw name + " is not a string.";
      }

      return cur;
    }
  }, {
    key: "getArgList",
    value: function getArgList(name) {
      var cur = this.getArgMixed(name);

      if (Object.prototype.toString.call(cur) !== '[object Array]') {
        throw name + " is not a list";
      }

      return cur;
    }
  }, {
    key: "getArgObject",
    value: function getArgObject(name) {
      var cur = this.getArgMixed(name);

      if (Object.prototype.toString.call(cur) !== '[object Object]') {
        throw name + " is not an object.";
      }

      return cur;
    }
  }, {
    key: "getArgIndexish",
    value: function getArgIndexish(name) {
      var cur = this.getArgMixed(name);
      var type = Object.prototype.toString.call(cur);

      if (type !== '[object Object]' && type !== '[object Array]') {
        throw name + " is not an list or object.";
      }

      return cur;
    }
  }]);

  return PlanOutOp;
}();

;

var PlanOutOpSimple = /*#__PURE__*/function (_PlanOutOp) {
  _inherits(PlanOutOpSimple, _PlanOutOp);

  var _super = _createSuper(PlanOutOpSimple);

  function PlanOutOpSimple() {
    base_classCallCheck(this, PlanOutOpSimple);

    return _super.apply(this, arguments);
  }

  base_createClass(PlanOutOpSimple, [{
    key: "execute",
    value: function execute(mapper) {
      this.mapper = mapper;
      var self = this;
      forEach(Object.keys(this.args), function (key) {
        self.args[key] = mapper.evaluate(self.args[key]);
      });
      return this.simpleExecute();
    }
  }]);

  return PlanOutOpSimple;
}(PlanOutOp);

var PlanOutOpUnary = /*#__PURE__*/function (_PlanOutOpSimple) {
  _inherits(PlanOutOpUnary, _PlanOutOpSimple);

  var _super2 = _createSuper(PlanOutOpUnary);

  function PlanOutOpUnary() {
    base_classCallCheck(this, PlanOutOpUnary);

    return _super2.apply(this, arguments);
  }

  base_createClass(PlanOutOpUnary, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      return this.unaryExecute(this.getArgMixed('value'));
    }
  }, {
    key: "getUnaryString",
    value: function getUnaryString() {
      return this.args.op;
    }
  }, {
    key: "unaryExecute",
    value: function unaryExecute(value) {
      throw "implement unaryExecute";
    }
  }]);

  return PlanOutOpUnary;
}(PlanOutOpSimple);

var PlanOutOpBinary = /*#__PURE__*/function (_PlanOutOpSimple2) {
  _inherits(PlanOutOpBinary, _PlanOutOpSimple2);

  var _super3 = _createSuper(PlanOutOpBinary);

  function PlanOutOpBinary() {
    base_classCallCheck(this, PlanOutOpBinary);

    return _super3.apply(this, arguments);
  }

  base_createClass(PlanOutOpBinary, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var left = this.getArgMixed('left');
      var right = this.getArgMixed('right');
      return this.binaryExecute(left, right);
    }
  }, {
    key: "getInfixString",
    value: function getInfixString() {
      return this.args.op;
    }
  }, {
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      throw "implement binaryExecute";
    }
  }]);

  return PlanOutOpBinary;
}(PlanOutOpSimple);

var PlanOutOpCommutative = /*#__PURE__*/function (_PlanOutOpSimple3) {
  _inherits(PlanOutOpCommutative, _PlanOutOpSimple3);

  var _super4 = _createSuper(PlanOutOpCommutative);

  function PlanOutOpCommutative() {
    base_classCallCheck(this, PlanOutOpCommutative);

    return _super4.apply(this, arguments);
  }

  base_createClass(PlanOutOpCommutative, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      return this.commutativeExecute(this.getArgList('values'));
    }
  }, {
    key: "getCommutativeString",
    value: function getCommutativeString() {
      return this.args.op;
    }
  }, {
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      throw "implement commutativeExecute";
    }
  }]);

  return PlanOutOpCommutative;
}(PlanOutOpSimple);


;// CONCATENATED MODULE: ./es6/ops/utils.js
function utils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var initializeOperators = function initializeOperators(Core, Random) {
  registerOperators({
    'literal': Core.Literal,
    'get': Core.Get,
    'set': Core.Set,
    'seq': Core.Seq,
    'return': Core.Return,
    'index': Core.Index,
    'array': Core.Arr,
    'equals': Core.Equals,
    'and': Core.And,
    'or': Core.Or,
    ">": Core.GreaterThan,
    "<": Core.LessThan,
    ">=": Core.GreaterThanOrEqualTo,
    "<=": Core.LessThanOrEqualTo,
    "%": Core.Mod,
    "/": Core.Divide,
    "not": Core.Not,
    "round": Core.Round,
    "exp": Core.Exp,
    "sqrt": Core.Sqrt,
    "negative": Core.Negative,
    "min": Core.Min,
    "max": Core.Max,
    "length": Core.Length,
    "coalesce": Core.Coalesce,
    "map": Core.Map,
    "cond": Core.Cond,
    "product": Core.Product,
    "sum": Core.Sum,
    "randomFloat": Random.RandomFloat,
    "randomInteger": Random.RandomInteger,
    "bernoulliTrial": Random.BernoulliTrial,
    "bernoulliFilter": Random.BernoulliFilter,
    "uniformChoice": Random.UniformChoice,
    "weightedChoice": Random.WeightedChoice,
    "sample": Random.Sample
  });
};

var operators = {};

var registerOperators = function registerOperators(ops) {
  forEach(ops, function (value, op) {
    if (operators[op]) {
      throw "".concat(op, " already is defined");
    } else {
      operators[op] = value;
    }
  });
};

var isOperator = function isOperator(op) {
  return isObject(op) && op.op;
};

var operatorInstance = function operatorInstance(params) {
  var op = params.op;

  if (!operators[op]) {
    throw "Unknown Operator ".concat(op);
  }

  return new operators[op](params);
};

var StopPlanOutException = function StopPlanOutException(inExperiment) {
  utils_classCallCheck(this, StopPlanOutException);

  this.inExperiment = inExperiment;
};


;// CONCATENATED MODULE: ./es6/ops/core.js
function core_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { core_typeof = function _typeof(obj) { return typeof obj; }; } else { core_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return core_typeof(obj); }

function core_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function core_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function core_createClass(Constructor, protoProps, staticProps) { if (protoProps) core_defineProperties(Constructor.prototype, protoProps); if (staticProps) core_defineProperties(Constructor, staticProps); return Constructor; }

function core_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) core_setPrototypeOf(subClass, superClass); }

function core_setPrototypeOf(o, p) { core_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return core_setPrototypeOf(o, p); }

function core_createSuper(Derived) { var hasNativeReflectConstruct = core_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = core_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = core_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return core_possibleConstructorReturn(this, result); }; }

function core_possibleConstructorReturn(self, call) { if (call && (core_typeof(call) === "object" || typeof call === "function")) { return call; } return core_assertThisInitialized(self); }

function core_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function core_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function core_getPrototypeOf(o) { core_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return core_getPrototypeOf(o); }





var Literal = /*#__PURE__*/function (_PlanOutOp) {
  core_inherits(Literal, _PlanOutOp);

  var _super = core_createSuper(Literal);

  function Literal() {
    core_classCallCheck(this, Literal);

    return _super.apply(this, arguments);
  }

  core_createClass(Literal, [{
    key: "execute",
    value: function execute(mapper) {
      return this.getArgMixed('value');
    }
  }]);

  return Literal;
}(PlanOutOp);

var Get = /*#__PURE__*/function (_PlanOutOp2) {
  core_inherits(Get, _PlanOutOp2);

  var _super2 = core_createSuper(Get);

  function Get() {
    core_classCallCheck(this, Get);

    return _super2.apply(this, arguments);
  }

  core_createClass(Get, [{
    key: "execute",
    value: function execute(mapper) {
      return mapper.get(this.getArgString('var'));
    }
  }]);

  return Get;
}(PlanOutOp);

var Seq = /*#__PURE__*/function (_PlanOutOp3) {
  core_inherits(Seq, _PlanOutOp3);

  var _super3 = core_createSuper(Seq);

  function Seq() {
    core_classCallCheck(this, Seq);

    return _super3.apply(this, arguments);
  }

  core_createClass(Seq, [{
    key: "execute",
    value: function execute(mapper) {
      forEach(this.getArgList('seq'), function (op) {
        mapper.evaluate(op);
      });
    }
  }]);

  return Seq;
}(PlanOutOp);

var Return = /*#__PURE__*/function (_PlanOutOp4) {
  core_inherits(Return, _PlanOutOp4);

  var _super4 = core_createSuper(Return);

  function Return() {
    core_classCallCheck(this, Return);

    return _super4.apply(this, arguments);
  }

  core_createClass(Return, [{
    key: "execute",
    value: function execute(mapper) {
      var value = mapper.evaluate(this.getArgMixed('value'));
      var inExperiment = false;

      if (value) {
        inExperiment = true;
      }

      throw new StopPlanOutException(inExperiment);
    }
  }]);

  return Return;
}(PlanOutOp);

var Set = /*#__PURE__*/function (_PlanOutOp5) {
  core_inherits(Set, _PlanOutOp5);

  var _super5 = core_createSuper(Set);

  function Set() {
    core_classCallCheck(this, Set);

    return _super5.apply(this, arguments);
  }

  core_createClass(Set, [{
    key: "execute",
    value: function execute(mapper) {
      var variable = this.getArgString('var');
      var value = this.getArgMixed('value');

      if (mapper.hasOverride(variable)) {
        return;
      }

      if (value && isOperator(value) && !value.salt) {
        value.salt = variable;
      }

      if (variable == "experimentSalt") {
        mapper.experimentSalt = value;
      }

      mapper.set(variable, mapper.evaluate(value));
    }
  }]);

  return Set;
}(PlanOutOp);

var Arr = /*#__PURE__*/function (_PlanOutOp6) {
  core_inherits(Arr, _PlanOutOp6);

  var _super6 = core_createSuper(Arr);

  function Arr() {
    core_classCallCheck(this, Arr);

    return _super6.apply(this, arguments);
  }

  core_createClass(Arr, [{
    key: "execute",
    value: function execute(mapper) {
      return map(this.getArgList('values'), function (value) {
        return mapper.evaluate(value);
      });
    }
  }]);

  return Arr;
}(PlanOutOp);

var Coalesce = /*#__PURE__*/function (_PlanOutOp7) {
  core_inherits(Coalesce, _PlanOutOp7);

  var _super7 = core_createSuper(Coalesce);

  function Coalesce() {
    core_classCallCheck(this, Coalesce);

    return _super7.apply(this, arguments);
  }

  core_createClass(Coalesce, [{
    key: "execute",
    value: function execute(mapper) {
      var values = this.getArgList('values');

      for (var i = 0; i < values.length; i++) {
        var x = values[i];
        var evalX = mapper.evaluate(x);

        if (evalX !== null && evalX !== undefined) {
          return evalX;
        }
      }

      return null;
    }
  }]);

  return Coalesce;
}(PlanOutOp);

var Index = /*#__PURE__*/function (_PlanOutOpSimple) {
  core_inherits(Index, _PlanOutOpSimple);

  var _super8 = core_createSuper(Index);

  function Index() {
    core_classCallCheck(this, Index);

    return _super8.apply(this, arguments);
  }

  core_createClass(Index, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var base = this.getArgIndexish('base');
      var index = this.getArgMixed('index');

      if (typeof index === "number") {
        if (index >= 0 && index < base.length) {
          return base[index];
        } else {
          return undefined;
        }
      } else {
        return base[index];
      }
    }
  }]);

  return Index;
}(PlanOutOpSimple);

var Cond = /*#__PURE__*/function (_PlanOutOp8) {
  core_inherits(Cond, _PlanOutOp8);

  var _super9 = core_createSuper(Cond);

  function Cond() {
    core_classCallCheck(this, Cond);

    return _super9.apply(this, arguments);
  }

  core_createClass(Cond, [{
    key: "execute",
    value: function execute(mapper) {
      var list = this.getArgList('cond');

      for (var i in list) {
        var ifClause = list[i]['if'];
        var thenClause = list[i]['then'];

        if (mapper.evaluate(ifClause)) {
          return mapper.evaluate(thenClause);
        }
      }

      return null;
    }
  }]);

  return Cond;
}(PlanOutOp);

var And = /*#__PURE__*/function (_PlanOutOp9) {
  core_inherits(And, _PlanOutOp9);

  var _super10 = core_createSuper(And);

  function And() {
    core_classCallCheck(this, And);

    return _super10.apply(this, arguments);
  }

  core_createClass(And, [{
    key: "execute",
    value: function execute(mapper) {
      return reduce(this.getArgList('values'), function (ret, clause) {
        if (!ret) {
          return ret;
        }

        return Boolean(mapper.evaluate(clause));
      }, true);
    }
  }]);

  return And;
}(PlanOutOp);

var Or = /*#__PURE__*/function (_PlanOutOp10) {
  core_inherits(Or, _PlanOutOp10);

  var _super11 = core_createSuper(Or);

  function Or() {
    core_classCallCheck(this, Or);

    return _super11.apply(this, arguments);
  }

  core_createClass(Or, [{
    key: "execute",
    value: function execute(mapper) {
      return reduce(this.getArgList('values'), function (ret, clause) {
        if (ret) {
          return ret;
        }

        return Boolean(mapper.evaluate(clause));
      }, false);
    }
  }]);

  return Or;
}(PlanOutOp);

var Product = /*#__PURE__*/function (_PlanOutOpCommutative) {
  core_inherits(Product, _PlanOutOpCommutative);

  var _super12 = core_createSuper(Product);

  function Product() {
    core_classCallCheck(this, Product);

    return _super12.apply(this, arguments);
  }

  core_createClass(Product, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return reduce(values, function (memo, value) {
        return memo * value;
      }, 1);
    }
  }]);

  return Product;
}(PlanOutOpCommutative);

var Sum = /*#__PURE__*/function (_PlanOutOpCommutative2) {
  core_inherits(Sum, _PlanOutOpCommutative2);

  var _super13 = core_createSuper(Sum);

  function Sum() {
    core_classCallCheck(this, Sum);

    return _super13.apply(this, arguments);
  }

  core_createClass(Sum, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return reduce(values, function (memo, value) {
        return memo + value;
      }, 0);
    }
  }]);

  return Sum;
}(PlanOutOpCommutative);

var Equals = /*#__PURE__*/function (_PlanOutOpBinary) {
  core_inherits(Equals, _PlanOutOpBinary);

  var _super14 = core_createSuper(Equals);

  function Equals() {
    core_classCallCheck(this, Equals);

    return _super14.apply(this, arguments);
  }

  core_createClass(Equals, [{
    key: "getInfixString",
    value: function getInfixString() {
      return "==";
    }
  }, {
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left === right;
    }
  }]);

  return Equals;
}(PlanOutOpBinary);

var GreaterThan = /*#__PURE__*/function (_PlanOutOpBinary2) {
  core_inherits(GreaterThan, _PlanOutOpBinary2);

  var _super15 = core_createSuper(GreaterThan);

  function GreaterThan() {
    core_classCallCheck(this, GreaterThan);

    return _super15.apply(this, arguments);
  }

  core_createClass(GreaterThan, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left > right;
    }
  }]);

  return GreaterThan;
}(PlanOutOpBinary);

var LessThan = /*#__PURE__*/function (_PlanOutOpBinary3) {
  core_inherits(LessThan, _PlanOutOpBinary3);

  var _super16 = core_createSuper(LessThan);

  function LessThan() {
    core_classCallCheck(this, LessThan);

    return _super16.apply(this, arguments);
  }

  core_createClass(LessThan, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left < right;
    }
  }]);

  return LessThan;
}(PlanOutOpBinary);

var LessThanOrEqualTo = /*#__PURE__*/function (_PlanOutOpBinary4) {
  core_inherits(LessThanOrEqualTo, _PlanOutOpBinary4);

  var _super17 = core_createSuper(LessThanOrEqualTo);

  function LessThanOrEqualTo() {
    core_classCallCheck(this, LessThanOrEqualTo);

    return _super17.apply(this, arguments);
  }

  core_createClass(LessThanOrEqualTo, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left <= right;
    }
  }]);

  return LessThanOrEqualTo;
}(PlanOutOpBinary);

var GreaterThanOrEqualTo = /*#__PURE__*/function (_PlanOutOpBinary5) {
  core_inherits(GreaterThanOrEqualTo, _PlanOutOpBinary5);

  var _super18 = core_createSuper(GreaterThanOrEqualTo);

  function GreaterThanOrEqualTo() {
    core_classCallCheck(this, GreaterThanOrEqualTo);

    return _super18.apply(this, arguments);
  }

  core_createClass(GreaterThanOrEqualTo, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left >= right;
    }
  }]);

  return GreaterThanOrEqualTo;
}(PlanOutOpBinary);

var Mod = /*#__PURE__*/function (_PlanOutOpBinary6) {
  core_inherits(Mod, _PlanOutOpBinary6);

  var _super19 = core_createSuper(Mod);

  function Mod() {
    core_classCallCheck(this, Mod);

    return _super19.apply(this, arguments);
  }

  core_createClass(Mod, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return left % right;
    }
  }]);

  return Mod;
}(PlanOutOpBinary);

var Divide = /*#__PURE__*/function (_PlanOutOpBinary7) {
  core_inherits(Divide, _PlanOutOpBinary7);

  var _super20 = core_createSuper(Divide);

  function Divide() {
    core_classCallCheck(this, Divide);

    return _super20.apply(this, arguments);
  }

  core_createClass(Divide, [{
    key: "binaryExecute",
    value: function binaryExecute(left, right) {
      return parseFloat(left) / parseFloat(right);
    }
  }]);

  return Divide;
}(PlanOutOpBinary);

var Round = /*#__PURE__*/function (_PlanOutOpUnary) {
  core_inherits(Round, _PlanOutOpUnary);

  var _super21 = core_createSuper(Round);

  function Round() {
    core_classCallCheck(this, Round);

    return _super21.apply(this, arguments);
  }

  core_createClass(Round, [{
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return Math.round(value);
    }
  }]);

  return Round;
}(PlanOutOpUnary);

var Exp = /*#__PURE__*/function (_PlanOutOpUnary2) {
  core_inherits(Exp, _PlanOutOpUnary2);

  var _super22 = core_createSuper(Exp);

  function Exp() {
    core_classCallCheck(this, Exp);

    return _super22.apply(this, arguments);
  }

  core_createClass(Exp, [{
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return Math.exp(value);
    }
  }]);

  return Exp;
}(PlanOutOpUnary);

var Sqrt = /*#__PURE__*/function (_PlanOutOpUnary3) {
  core_inherits(Sqrt, _PlanOutOpUnary3);

  var _super23 = core_createSuper(Sqrt);

  function Sqrt() {
    core_classCallCheck(this, Sqrt);

    return _super23.apply(this, arguments);
  }

  core_createClass(Sqrt, [{
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return Math.sqrt(value);
    }
  }]);

  return Sqrt;
}(PlanOutOpUnary);

var Not = /*#__PURE__*/function (_PlanOutOpUnary4) {
  core_inherits(Not, _PlanOutOpUnary4);

  var _super24 = core_createSuper(Not);

  function Not() {
    core_classCallCheck(this, Not);

    return _super24.apply(this, arguments);
  }

  core_createClass(Not, [{
    key: "getUnaryString",
    value: function getUnaryString() {
      return '!';
    }
  }, {
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return !value;
    }
  }]);

  return Not;
}(PlanOutOpUnary);

var Negative = /*#__PURE__*/function (_PlanOutOpUnary5) {
  core_inherits(Negative, _PlanOutOpUnary5);

  var _super25 = core_createSuper(Negative);

  function Negative() {
    core_classCallCheck(this, Negative);

    return _super25.apply(this, arguments);
  }

  core_createClass(Negative, [{
    key: "getUnaryString",
    value: function getUnaryString() {
      return '-';
    }
  }, {
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return 0 - value;
    }
  }]);

  return Negative;
}(PlanOutOpUnary);

var Min = /*#__PURE__*/function (_PlanOutOpCommutative3) {
  core_inherits(Min, _PlanOutOpCommutative3);

  var _super26 = core_createSuper(Min);

  function Min() {
    core_classCallCheck(this, Min);

    return _super26.apply(this, arguments);
  }

  core_createClass(Min, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return Math.min.apply(null, values);
    }
  }]);

  return Min;
}(PlanOutOpCommutative);

var Max = /*#__PURE__*/function (_PlanOutOpCommutative4) {
  core_inherits(Max, _PlanOutOpCommutative4);

  var _super27 = core_createSuper(Max);

  function Max() {
    core_classCallCheck(this, Max);

    return _super27.apply(this, arguments);
  }

  core_createClass(Max, [{
    key: "commutativeExecute",
    value: function commutativeExecute(values) {
      return Math.max.apply(null, values);
    }
  }]);

  return Max;
}(PlanOutOpCommutative);

var Length = /*#__PURE__*/function (_PlanOutOpUnary6) {
  core_inherits(Length, _PlanOutOpUnary6);

  var _super28 = core_createSuper(Length);

  function Length() {
    core_classCallCheck(this, Length);

    return _super28.apply(this, arguments);
  }

  core_createClass(Length, [{
    key: "unaryExecute",
    value: function unaryExecute(value) {
      return value.length;
    }
  }]);

  return Length;
}(PlanOutOpUnary);

var Map = /*#__PURE__*/function (_PlanOutOpSimple2) {
  core_inherits(Map, _PlanOutOpSimple2);

  var _super29 = core_createSuper(Map);

  function Map() {
    core_classCallCheck(this, Map);

    return _super29.apply(this, arguments);
  }

  core_createClass(Map, [{
    key: "simpleExecute",
    value: function simpleExecute() {
      var copy = deepCopy(this.args);
      delete copy.op;
      delete copy.salt;
      return copy;
    }
  }]);

  return Map;
}(PlanOutOpSimple);


;// CONCATENATED MODULE: ./es6/namespace.js
function namespace_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { namespace_typeof = function _typeof(obj) { return typeof obj; }; } else { namespace_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return namespace_typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = namespace_getPrototypeOf(object); if (object === null) break; } return object; }

function namespace_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function namespace_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function namespace_createClass(Constructor, protoProps, staticProps) { if (protoProps) namespace_defineProperties(Constructor.prototype, protoProps); if (staticProps) namespace_defineProperties(Constructor, staticProps); return Constructor; }

function namespace_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) namespace_setPrototypeOf(subClass, superClass); }

function namespace_setPrototypeOf(o, p) { namespace_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return namespace_setPrototypeOf(o, p); }

function namespace_createSuper(Derived) { var hasNativeReflectConstruct = namespace_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = namespace_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = namespace_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return namespace_possibleConstructorReturn(this, result); }; }

function namespace_possibleConstructorReturn(self, call) { if (call && (namespace_typeof(call) === "object" || typeof call === "function")) { return call; } return namespace_assertThisInitialized(self); }

function namespace_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function namespace_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function namespace_getPrototypeOf(o) { namespace_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return namespace_getPrototypeOf(o); }



function provideNamespace(Random, Assignment, Experiment) {
  var DefaultExperiment = /*#__PURE__*/function (_Experiment) {
    namespace_inherits(DefaultExperiment, _Experiment);

    var _super = namespace_createSuper(DefaultExperiment);

    function DefaultExperiment() {
      namespace_classCallCheck(this, DefaultExperiment);

      return _super.apply(this, arguments);
    }

    namespace_createClass(DefaultExperiment, [{
      key: "configureLogger",
      value: function configureLogger() {
        return;
      }
    }, {
      key: "setup",
      value: function setup() {
        this.name = 'test_name';
      }
    }, {
      key: "log",
      value: function log(data) {
        return;
      }
    }, {
      key: "getParamNames",
      value: function getParamNames() {
        return this.getDefaultParamNames();
      }
    }, {
      key: "previouslyLogged",
      value: function previouslyLogged() {
        return true;
      }
    }, {
      key: "assign",
      value: function assign(params, args) {
        return;
      }
    }]);

    return DefaultExperiment;
  }(Experiment);

  var Namespace = /*#__PURE__*/function () {
    function Namespace() {
      namespace_classCallCheck(this, Namespace);
    }

    namespace_createClass(Namespace, [{
      key: "addExperiment",
      value: function addExperiment(name, obj, segments) {
        throw "IMPLEMENT addExperiment";
      }
    }, {
      key: "removeExperiment",
      value: function removeExperiment(name) {
        throw "IMPLEMENT removeExperiment";
      }
    }, {
      key: "setAutoExposureLogging",
      value: function setAutoExposureLogging(value) {
        throw "IMPLEMENT setAutoExposureLogging";
      }
    }, {
      key: "inExperiment",
      value: function inExperiment() {
        throw "IMPLEMENT inExperiment";
      }
    }, {
      key: "get",
      value: function get(name, defaultVal) {
        throw "IMPLEMENT get";
      }
    }, {
      key: "logExposure",
      value: function logExposure(extras) {
        throw "IMPLEMENT logExposure";
      }
    }, {
      key: "logEvent",
      value: function logEvent(eventType, extras) {
        throw "IMPLEMENT logEvent";
      }
    }, {
      key: "requireExperiment",
      value: function requireExperiment() {
        if (!this._experiment) {
          this._assignExperiment();
        }
      }
    }, {
      key: "requireDefaultExperiment",
      value: function requireDefaultExperiment() {
        if (!this._defaultExperiment) {
          this._assignDefaultExperiment();
        }
      }
    }]);

    return Namespace;
  }();

  var SimpleNamespace = /*#__PURE__*/function (_Namespace) {
    namespace_inherits(SimpleNamespace, _Namespace);

    var _super2 = namespace_createSuper(SimpleNamespace);

    function SimpleNamespace(args) {
      var _this;

      namespace_classCallCheck(this, SimpleNamespace);

      _this = _super2.call(this, args);
      _this.inputs = args || {};
      _this.numSegments = 1;
      _this.segmentAllocations = {};
      _this.currentExperiments = {};
      _this._experiment = null;
      _this._defaultExperiment = null;
      _this.defaultExperimentClass = DefaultExperiment;
      _this._inExperiment = false;

      _this.setupDefaults();

      _this.setup();

      if (!_this.name) {
        throw "setup() must set a namespace name via this.setName()";
      }

      _this.availableSegments = range(_this.numSegments);

      _this.setupExperiments();

      return _this;
    }

    namespace_createClass(SimpleNamespace, [{
      key: "setupDefaults",
      value: function setupDefaults() {
        return;
      }
    }, {
      key: "setup",
      value: function setup() {
        throw "IMPLEMENT setup";
      }
    }, {
      key: "setupExperiments",
      value: function setupExperiments() {
        throw "IMPLEMENT setupExperiments";
      }
    }, {
      key: "getPrimaryUnit",
      value: function getPrimaryUnit() {
        return this._primaryUnit;
      }
    }, {
      key: "allowedOverride",
      value: function allowedOverride() {
        return false;
      }
    }, {
      key: "getOverrides",
      value: function getOverrides() {
        return {};
      }
    }, {
      key: "setPrimaryUnit",
      value: function setPrimaryUnit(value) {
        this._primaryUnit = value;
      }
    }, {
      key: "addExperiment",
      value: function addExperiment(name, expObject, segments) {
        var numberAvailable = this.availableSegments.length;

        if (numberAvailable < segments) {
          return false;
        } else if (this.currentExperiments[name] !== undefined) {
          return false;
        }

        var a = new Assignment(this.name);
        a.set('sampled_segments', new Random.Sample({
          'choices': this.availableSegments,
          'draws': segments,
          'unit': name
        }));
        var sample = a.get('sampled_segments');

        for (var i = 0; i < sample.length; i++) {
          this.segmentAllocations[sample[i]] = name;
          var currentIndex = this.availableSegments.indexOf(sample[i]);
          this.availableSegments[currentIndex] = this.availableSegments[numberAvailable - 1];
          this.availableSegments.splice(numberAvailable - 1, 1);
          numberAvailable -= 1;
        }

        this.currentExperiments[name] = expObject;
      }
    }, {
      key: "removeExperiment",
      value: function removeExperiment(name) {
        var _this2 = this;

        if (this.currentExperiments[name] === undefined) {
          return false;
        }

        forEach(Object.keys(this.segmentAllocations), function (cur) {
          if (_this2.segmentAllocations[cur] === name) {
            delete _this2.segmentAllocations[cur];

            _this2.availableSegments.push(cur);
          }
        });
        delete this.currentExperiments[name];
        return true;
      }
    }, {
      key: "getSegment",
      value: function getSegment() {
        var a = new Assignment(this.name);
        var segment = new Random.RandomInteger({
          'min': 0,
          'max': this.numSegments - 1,
          'unit': this.inputs[this.getPrimaryUnit()]
        });
        a.set('segment', segment);
        return a.get('segment');
      }
    }, {
      key: "_assignExperiment",
      value: function _assignExperiment() {
        this.inputs = extend(this.inputs, getExperimentInputs(this.getName()));
        var segment = this.getSegment();

        if (this.segmentAllocations[segment] !== undefined) {
          var experimentName = this.segmentAllocations[segment];

          this._assignExperimentObject(experimentName);
        }
      }
    }, {
      key: "_assignExperimentObject",
      value: function _assignExperimentObject(experimentName) {
        var experiment = new this.currentExperiments[experimentName](this.inputs);
        experiment.setName("".concat(this.getName(), "-").concat(experimentName));
        experiment.setSalt("".concat(this.getName(), "-").concat(experimentName));
        this._experiment = experiment;
        this._inExperiment = experiment.inExperiment();

        if (!this._inExperiment) {
          this._assignDefaultExperiment();
        }
      }
    }, {
      key: "_assignDefaultExperiment",
      value: function _assignDefaultExperiment() {
        this._defaultExperiment = new this.defaultExperimentClass(this.inputs);
      }
    }, {
      key: "defaultGet",
      value: function defaultGet(name, default_val) {
        _get(namespace_getPrototypeOf(SimpleNamespace.prototype), "requireDefaultExperiment", this).call(this);

        return this._defaultExperiment.get(name, default_val);
      }
    }, {
      key: "getName",
      value: function getName() {
        return this.name;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
      }
    }, {
      key: "previouslyLogged",
      value: function previouslyLogged() {
        if (this._experiment) {
          return this._experiment.previouslyLogged();
        }

        return null;
      }
    }, {
      key: "inExperiment",
      value: function inExperiment() {
        _get(namespace_getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);

        return this._inExperiment;
      }
    }, {
      key: "setAutoExposureLogging",
      value: function setAutoExposureLogging(value) {
        this._autoExposureLoggingSet = value;

        if (this._defaultExperiment) {
          this._defaultExperiment.setAutoExposureLogging(value);
        }

        if (this._experiment) {
          this._experiment.setAutoExposureLogging(value);
        }
      }
    }, {
      key: "setGlobalOverride",
      value: function setGlobalOverride(name) {
        var globalOverrides = this.getOverrides();

        if (globalOverrides && hasKey(globalOverrides, name)) {
          var overrides = globalOverrides[name];

          if (overrides && hasKey(this.currentExperiments, overrides.experimentName)) {
            this._assignExperimentObject(overrides.experimentName);

            this._experiment.addOverride(name, overrides.value);
          }
        }
      }
    }, {
      key: "setLocalOverride",
      value: function setLocalOverride(name) {
        var experimentName = getParameterByName('experimentOverride');

        if (experimentName && hasKey(this.currentExperiments, experimentName)) {
          this._assignExperimentObject(experimentName);

          if (getParameterByName(name)) {
            this._experiment.addOverride(name, getParameterByName(name));
          }
        }
      }
    }, {
      key: "getParams",
      value: function getParams(experimentName) {
        _get(namespace_getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);

        if (this._experiment && this.getOriginalExperimentName() === experimentName) {
          return this._experiment.getParams();
        } else {
          return null;
        }
      }
    }, {
      key: "getOriginalExperimentName",
      value: function getOriginalExperimentName() {
        if (this._experiment) {
          return this._experiment.getName().split('-')[1];
        }

        return null;
      }
    }, {
      key: "get",
      value: function get(name, defaultVal) {
        _get(namespace_getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);

        if (this.allowedOverride()) {
          this.setGlobalOverride(name);
        }

        this.setLocalOverride(name);

        if (!this._experiment) {
          return this.defaultGet(name, defaultVal);
        } else {
          if (this._autoExposureLoggingSet !== undefined) {
            this._experiment.setAutoExposureLogging(this._autoExposureLoggingSet);
          }

          return this._experiment.get(name, this.defaultGet(name, defaultVal));
        }
      }
    }, {
      key: "logExposure",
      value: function logExposure(extras) {
        _get(namespace_getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);

        if (!this._experiment) {
          return;
        }

        this._experiment.logExposure(extras);
      }
    }, {
      key: "logEvent",
      value: function logEvent(eventType, extras) {
        _get(namespace_getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);

        if (!this._experiment) {
          return;
        }

        this._experiment.logEvent(eventType, extras);
      }
    }]);

    return SimpleNamespace;
  }(Namespace);

  return {
    Namespace: Namespace,
    SimpleNamespace: SimpleNamespace
  };
}
;// CONCATENATED MODULE: ./build/planoutAPIFactory.js








/* harmony default export */ const planoutAPIFactory = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$Random = _ref.Random,
      Random = _ref$Random === void 0 ? null : _ref$Random;

  // Provide our operations to the OpsUtils module
  initializeOperators(core_namespaceObject, Random); // Inject our Random and other dependencies into our modules

  var Assignment = provideAssignment(Random);
  var Experiment = provideExperiment(Assignment);
  var Interpreter = provideInterpreter(ops_utils_namespaceObject, Assignment);
  var Namespace = provideNamespace(Random, Assignment, Experiment);
  return {
    Assignment: Assignment,
    Experiment: Experiment,
    ExperimentSetup: experimentSetup_namespaceObject,
    Interpreter: Interpreter,
    Ops: {
      Random: Random,
      Core: core_namespaceObject,
      Base: base_namespaceObject
    },
    Namespace: Namespace
  };
});
// EXTERNAL MODULE: ./node_modules/sha1/sha1.js
var sha1 = __webpack_require__(738);
var sha1_default = /*#__PURE__*/__webpack_require__.n(sha1);
;// CONCATENATED MODULE: ./es6/ops/randomBase.js
function randomBase_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { randomBase_typeof = function _typeof(obj) { return typeof obj; }; } else { randomBase_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return randomBase_typeof(obj); }

function randomBase_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function randomBase_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function randomBase_createClass(Constructor, protoProps, staticProps) { if (protoProps) randomBase_defineProperties(Constructor.prototype, protoProps); if (staticProps) randomBase_defineProperties(Constructor, staticProps); return Constructor; }

function randomBase_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) randomBase_setPrototypeOf(subClass, superClass); }

function randomBase_setPrototypeOf(o, p) { randomBase_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return randomBase_setPrototypeOf(o, p); }

function randomBase_createSuper(Derived) { var hasNativeReflectConstruct = randomBase_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = randomBase_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = randomBase_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return randomBase_possibleConstructorReturn(this, result); }; }

function randomBase_possibleConstructorReturn(self, call) { if (call && (randomBase_typeof(call) === "object" || typeof call === "function")) { return call; } return randomBase_assertThisInitialized(self); }

function randomBase_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function randomBase_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function randomBase_getPrototypeOf(o) { randomBase_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return randomBase_getPrototypeOf(o); }





var PlanOutOpRandom = /*#__PURE__*/function (_PlanOutOpSimple) {
  randomBase_inherits(PlanOutOpRandom, _PlanOutOpSimple);

  var _super = randomBase_createSuper(PlanOutOpRandom);

  function PlanOutOpRandom() {
    randomBase_classCallCheck(this, PlanOutOpRandom);

    return _super.apply(this, arguments);
  }

  randomBase_createClass(PlanOutOpRandom, [{
    key: "hashCalculation",
    value: function hashCalculation(hash) {
      return parseInt(hash.substr(0, 13), 16);
    }
  }, {
    key: "zeroToOneCalculation",
    value: function zeroToOneCalculation(appendedUnit) {
      // 0xFFFFFFFFFFFFF == LONG_SCALE
      return this.getHash(appendedUnit) / 0xFFFFFFFFFFFFF;
    }
  }, {
    key: "getUnit",
    value: function getUnit(appendedUnit) {
      var unit = this.getArgMixed('unit');

      if (!isArray(unit)) {
        unit = [unit];
      }

      if (appendedUnit) {
        unit.push(appendedUnit);
      }

      return unit;
    }
  }, {
    key: "getUniform",
    value: function getUniform() {
      var minVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.0;
      var maxVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;
      var appendedUnit = arguments.length > 2 ? arguments[2] : undefined;
      var zeroToOne = this.zeroToOneCalculation(appendedUnit);
      return zeroToOne * (maxVal - minVal) + minVal;
    }
  }, {
    key: "getHash",
    value: function getHash(appendedUnit) {
      var fullSalt;

      if (this.args.full_salt) {
        fullSalt = this.getArgString('full_salt') + '.';
      } else {
        var salt = this.getArgString('salt');
        fullSalt = this.mapper.get('experimentSalt') + '.' + salt + this.mapper.get('saltSeparator');
      }

      var unitStr = this.getUnit(appendedUnit).map(function (element) {
        return String(element);
      }).join('.');
      var hashStr = fullSalt + unitStr;
      var hash = sha1_default()(hashStr);
      return this.hashCalculation(hash);
    }
  }]);

  return PlanOutOpRandom;
}(PlanOutOpSimple);

var RandomFloatBuilder = function RandomFloatBuilder(RandomOpsClass) {
  return /*#__PURE__*/function (_RandomOpsClass) {
    randomBase_inherits(_class, _RandomOpsClass);

    var _super2 = randomBase_createSuper(_class);

    function _class() {
      randomBase_classCallCheck(this, _class);

      return _super2.apply(this, arguments);
    }

    randomBase_createClass(_class, [{
      key: "simpleExecute",
      value: function simpleExecute() {
        var minVal = this.getArgNumber('min');
        var maxVal = this.getArgNumber('max');
        return this.getUniform(minVal, maxVal);
      }
    }]);

    return _class;
  }(RandomOpsClass);
};

var RandomIntegerBuilder = function RandomIntegerBuilder(RandomOpsClass) {
  return /*#__PURE__*/function (_RandomOpsClass2) {
    randomBase_inherits(_class2, _RandomOpsClass2);

    var _super3 = randomBase_createSuper(_class2);

    function _class2() {
      randomBase_classCallCheck(this, _class2);

      return _super3.apply(this, arguments);
    }

    randomBase_createClass(_class2, [{
      key: "randomIntegerCalculation",
      value: function randomIntegerCalculation(minVal, maxVal) {
        return (this.getHash() + minVal) % (maxVal - minVal + 1);
      }
    }, {
      key: "simpleExecute",
      value: function simpleExecute() {
        var minVal = this.getArgNumber('min');
        var maxVal = this.getArgNumber('max');
        return this.randomIntegerCalculation(minVal, maxVal);
      }
    }]);

    return _class2;
  }(RandomOpsClass);
};

var BernoulliTrialBuilder = function BernoulliTrialBuilder(RandomOpsClass) {
  return /*#__PURE__*/function (_RandomOpsClass3) {
    randomBase_inherits(_class3, _RandomOpsClass3);

    var _super4 = randomBase_createSuper(_class3);

    function _class3() {
      randomBase_classCallCheck(this, _class3);

      return _super4.apply(this, arguments);
    }

    randomBase_createClass(_class3, [{
      key: "simpleExecute",
      value: function simpleExecute() {
        var p = this.getArgNumber('p');

        if (p < 0 || p > 1) {
          throw "Invalid probability";
        }

        if (this.getUniform(0.0, 1.0) <= p) {
          return 1;
        } else {
          return 0;
        }
      }
    }]);

    return _class3;
  }(RandomOpsClass);
};

var BernoulliFilterBuilder = function BernoulliFilterBuilder(RandomOpsClass) {
  return /*#__PURE__*/function (_RandomOpsClass4) {
    randomBase_inherits(_class4, _RandomOpsClass4);

    var _super5 = randomBase_createSuper(_class4);

    function _class4() {
      randomBase_classCallCheck(this, _class4);

      return _super5.apply(this, arguments);
    }

    randomBase_createClass(_class4, [{
      key: "simpleExecute",
      value: function simpleExecute() {
        var p = this.getArgNumber('p');
        var values = this.getArgList('choices');

        if (p < 0 || p > 1) {
          throw "Invalid probability";
        }

        if (values.length == 0) {
          return [];
        }

        var ret = [];

        for (var i = 0; i < values.length; i++) {
          var cur = values[i];

          if (this.getUniform(0.0, 1.0, cur) <= p) {
            ret.push(cur);
          }
        }

        return ret;
      }
    }]);

    return _class4;
  }(RandomOpsClass);
};

var UniformChoiceBuilder = function UniformChoiceBuilder(OpRandomClass) {
  return /*#__PURE__*/function (_OpRandomClass) {
    randomBase_inherits(_class5, _OpRandomClass);

    var _super6 = randomBase_createSuper(_class5);

    function _class5() {
      randomBase_classCallCheck(this, _class5);

      return _super6.apply(this, arguments);
    }

    randomBase_createClass(_class5, [{
      key: "randomIndexCalculation",
      value: function randomIndexCalculation(choices) {
        return this.getHash() % choices.length;
      }
    }, {
      key: "simpleExecute",
      value: function simpleExecute() {
        var choices = this.getArgList('choices');

        if (choices.length === 0) {
          return [];
        }

        var randIndex = this.randomIndexCalculation(choices);
        return choices[randIndex];
      }
    }]);

    return _class5;
  }(OpRandomClass);
};

var WeightedChoiceBuilder = function WeightedChoiceBuilder(RandomOpsClass) {
  return /*#__PURE__*/function (_RandomOpsClass5) {
    randomBase_inherits(_class6, _RandomOpsClass5);

    var _super7 = randomBase_createSuper(_class6);

    function _class6() {
      randomBase_classCallCheck(this, _class6);

      return _super7.apply(this, arguments);
    }

    randomBase_createClass(_class6, [{
      key: "simpleExecute",
      value: function simpleExecute() {
        var choices = this.getArgList('choices');
        var weights = this.getArgList('weights');

        if (choices.length === 0) {
          return [];
        }

        var cumSum = 0;
        var cumWeights = weights.map(function (weight) {
          cumSum += weight;
          return cumSum;
        });
        var stopVal = this.getUniform(0.0, cumSum);

        for (var i = 0; i < cumWeights.length; ++i) {
          if (stopVal <= cumWeights[i]) {
            return choices[i];
          }
        }
      }
    }]);

    return _class6;
  }(RandomOpsClass);
};

var SampleBuilder = function SampleBuilder(RandomOpsClass) {
  return /*#__PURE__*/function (_RandomOpsClass6) {
    randomBase_inherits(_class7, _RandomOpsClass6);

    var _super8 = randomBase_createSuper(_class7);

    function _class7() {
      randomBase_classCallCheck(this, _class7);

      return _super8.apply(this, arguments);
    }

    randomBase_createClass(_class7, [{
      key: "sampleIndexCalculation",
      value: function sampleIndexCalculation(i) {
        return this.getHash(i) % (i + 1);
      }
    }, {
      key: "allowSampleStoppingPoint",
      value: function allowSampleStoppingPoint() {
        return true;
      }
    }, {
      key: "sample",
      value: function sample(array, numDraws) {
        var len = array.length;
        var stoppingPoint = len - numDraws;
        var allowStoppingPoint = this.allowSampleStoppingPoint();

        for (var i = len - 1; i > 0; i--) {
          var j = this.sampleIndexCalculation(i);
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;

          if (allowStoppingPoint && stoppingPoint === i) {
            return array.slice(i, len);
          }
        }

        return array.slice(0, numDraws);
      }
    }, {
      key: "simpleExecute",
      value: function simpleExecute() {
        var choices = shallowCopy(this.getArgList('choices'));
        var numDraws = 0;

        if (this.args.draws !== undefined) {
          numDraws = this.getArgNumber('draws');
        } else {
          numDraws = choices.length;
        }

        return this.sample(choices, numDraws);
      }
    }]);

    return _class7;
  }(RandomOpsClass);
};


;// CONCATENATED MODULE: ./node_modules/bignumber.js/bignumber.mjs
/*
 *      bignumber.js v9.0.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2020 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


var
  isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,

  mathceil = Math.ceil,
  mathfloor = Math.floor,

  bignumberError = '[BigNumber Error] ',
  tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

  BASE = 1e14,
  LOG_BASE = 14,
  MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
  SQRT_BASE = 1e7,

  // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9;                                   // 0 to MAX_INT32


/*
 * Create and return a BigNumber constructor.
 */
function clone(configObject) {
  var div, convertBase, parseNumeric,
    P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
    ONE = new BigNumber(1),


    //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.

    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,                     // 0 to MAX

    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,                       // 0 to 8

    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,                         // 0 to -MAX

    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,                         // 0 to MAX

    // RANGE : [MIN_EXP, MAX_EXP]

    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,                          // -1 to -MAX

    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,                           // 1 to MAX

    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,                          // true or false

    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,                         // 0 to 9

    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,                    // 0 to MAX

    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      prefix: '',
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ',',
      decimalSeparator: '.',
      fractionGroupSize: 0,
      fractionGroupSeparator: '\xA0',      // non-breaking space
      suffix: ''
    },

    // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
    // '-', '.', whitespace, or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


  //------------------------------------------------------------------------------------------


  // CONSTRUCTOR


  /*
   * The BigNumber constructor and exported function.
   * Create and return a new instance of a BigNumber object.
   *
   * v {number|string|BigNumber} A numeric value.
   * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
   */
  function BigNumber(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str,
      x = this;

    // Enable constructor call without `new`.
    if (!(x instanceof BigNumber)) return new BigNumber(v, b);

    if (b == null) {

      if (v && v._isBigNumber === true) {
        x.s = v.s;

        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }

        return;
      }

      if ((isNum = typeof v == 'number') && v * 0 == 0) {

        // Use `1 / n` to handle minus zero also.
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;

        // Fast path for integers, where n < 2147483648 (2**31).
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++);

          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }

          return;
        }

        str = String(v);
      } else {

        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

      // Exponential form?
      if ((i = str.search(/e/i)) > 0) {

        // Determine exponent.
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {

        // Integer.
        e = str.length;
      }

    } else {

      // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
      intCheck(b, 2, ALPHABET.length, 'Base');

      // Allow exponential notation to be used with base 10 argument, while
      // also rounding to DECIMAL_PLACES as with other bases.
      if (b == 10) {
        x = new BigNumber(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }

      str = String(v);

      if (isNum = typeof v == 'number') {

        // Avoid potential interpretation of Infinity and NaN as base 44+ values.
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
          throw Error
           (tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }

      alphabet = ALPHABET.slice(0, b);
      e = i = 0;

      // Check that str is a valid base b number.
      // Don't use RegExp, so alphabet can contain special characters.
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == '.') {

            // If '.' is not the first character and it has not be found before.
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {

            // Allow e.g. hexadecimal 'FF' as well as 'ff'.
            if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }

          return parseNumeric(x, String(v), isNum, b);
        }
      }

      // Prevent later check for length on converted number.
      isNum = false;
      str = convertBase(str, b, 10, x.s);

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
      else e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(--len) === 48;);

    if (str = str.slice(i, ++len)) {
      len -= i;

      // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
      if (isNum && BigNumber.DEBUG &&
        len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error
           (tooManyDigits + (x.s * v));
      }

       // Overflow?
      if ((e = e - i - 1) > MAX_EXP) {

        // Infinity.
        x.c = x.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];

        // Transform base

        // e is the base 10 exponent.
        // i is where to slice str to get the first element of the coefficient array.
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;  // i < 1

        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));

          for (len -= LOG_BASE; i < len;) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }

          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }

        for (; i--; str += '0');
        x.c.push(+str);
      }
    } else {

      // Zero.
      x.c = [x.e = 0];
    }
  }


  // CONSTRUCTOR PROPERTIES


  BigNumber.clone = clone;

  BigNumber.ROUND_UP = 0;
  BigNumber.ROUND_DOWN = 1;
  BigNumber.ROUND_CEIL = 2;
  BigNumber.ROUND_FLOOR = 3;
  BigNumber.ROUND_HALF_UP = 4;
  BigNumber.ROUND_HALF_DOWN = 5;
  BigNumber.ROUND_HALF_EVEN = 6;
  BigNumber.ROUND_HALF_CEIL = 7;
  BigNumber.ROUND_HALF_FLOOR = 8;
  BigNumber.EUCLID = 9;


  /*
   * Configure infrequently-changing library-wide settings.
   *
   * Accept an object with the following optional properties (if the value of a property is
   * a number, it must be an integer within the inclusive range stated):
   *
   *   DECIMAL_PLACES   {number}           0 to MAX
   *   ROUNDING_MODE    {number}           0 to 8
   *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
   *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
   *   CRYPTO           {boolean}          true or false
   *   MODULO_MODE      {number}           0 to 9
   *   POW_PRECISION       {number}           0 to MAX
   *   ALPHABET         {string}           A string of two or more unique characters which does
   *                                     not contain '.'.
   *   FORMAT           {object}           An object with some of the following properties:
   *     prefix                 {string}
   *     groupSize              {number}
   *     secondaryGroupSize     {number}
   *     groupSeparator         {string}
   *     decimalSeparator       {string}
   *     fractionGroupSize      {number}
   *     fractionGroupSeparator {string}
   *     suffix                 {string}
   *
   * (The values assigned to the above FORMAT object properties are not checked for validity.)
   *
   * E.g.
   * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
   *
   * Ignore properties/parameters set to null or undefined, except for ALPHABET.
   *
   * Return an object with the properties current values.
   */
  BigNumber.config = BigNumber.set = function (obj) {
    var p, v;

    if (obj != null) {

      if (typeof obj == 'object') {

        // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }

        // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
        // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }

        // EXPONENTIAL_AT {number|number[]}
        // Integer, -MAX to MAX inclusive or
        // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
        // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }

        // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
        // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
        // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
        if (obj.hasOwnProperty(p = 'RANGE')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error
               (bignumberError + p + ' cannot be zero: ' + v);
            }
          }
        }

        // CRYPTO {boolean} true or false.
        // '[BigNumber Error] CRYPTO not true or false: {v}'
        // '[BigNumber Error] crypto unavailable'
        if (obj.hasOwnProperty(p = 'CRYPTO')) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != 'undefined' && crypto &&
               (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error
                 (bignumberError + 'crypto unavailable');
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error
             (bignumberError + p + ' not true or false: ' + v);
          }
        }

        // MODULO_MODE {number} Integer, 0 to 9 inclusive.
        // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }

        // POW_PRECISION {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }

        // FORMAT {object}
        // '[BigNumber Error] FORMAT not an object: {v}'
        if (obj.hasOwnProperty(p = 'FORMAT')) {
          v = obj[p];
          if (typeof v == 'object') FORMAT = v;
          else throw Error
           (bignumberError + p + ' not an object: ' + v);
        }

        // ALPHABET {string}
        // '[BigNumber Error] ALPHABET invalid: {v}'
        if (obj.hasOwnProperty(p = 'ALPHABET')) {
          v = obj[p];

          // Disallow if only one character,
          // or if it contains '+', '-', '.', whitespace, or a repeated character.
          if (typeof v == 'string' && !/^.$|[+-.\s]|(.).*\1/.test(v)) {
            ALPHABET = v;
          } else {
            throw Error
             (bignumberError + p + ' invalid: ' + v);
          }
        }

      } else {

        // '[BigNumber Error] Object expected: {v}'
        throw Error
         (bignumberError + 'Object expected: ' + obj);
      }
    }

    return {
      DECIMAL_PLACES: DECIMAL_PLACES,
      ROUNDING_MODE: ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO: CRYPTO,
      MODULO_MODE: MODULO_MODE,
      POW_PRECISION: POW_PRECISION,
      FORMAT: FORMAT,
      ALPHABET: ALPHABET
    };
  };


  /*
   * Return true if v is a BigNumber instance, otherwise return false.
   *
   * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
   *
   * v {any}
   *
   * '[BigNumber Error] Invalid BigNumber: {v}'
   */
  BigNumber.isBigNumber = function (v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber.DEBUG) return true;

    var i, n,
      c = v.c,
      e = v.e,
      s = v.s;

    out: if ({}.toString.call(c) == '[object Array]') {

      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

        // If the first element is zero, the BigNumber value must be zero.
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }

        // Calculate number of digits that c[0] should have, based on the exponent.
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;

        // Calculate number of digits of c[0].
        //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
        if (String(c[0]).length == i) {

          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }

          // Last element cannot be zero, unless it is the only element.
          if (n !== 0) return true;
        }
      }

    // Infinity/NaN
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }

    throw Error
      (bignumberError + 'Invalid BigNumber: ' + v);
  };


  /*
   * Return a new BigNumber whose value is the maximum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.maximum = BigNumber.max = function () {
    return maxOrMin(arguments, P.lt);
  };


  /*
   * Return a new BigNumber whose value is the minimum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.minimum = BigNumber.min = function () {
    return maxOrMin(arguments, P.gt);
  };


  /*
   * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
   * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
   * zeros are produced).
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
   * '[BigNumber Error] crypto unavailable'
   */
  BigNumber.random = (function () {
    var pow2_53 = 0x20000000000000;

    // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
    // Check if Math.random() produces more than 32 bits of randomness.
    // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
    // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
    var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
     ? function () { return mathfloor(Math.random() * pow2_53); }
     : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
       (Math.random() * 0x800000 | 0); };

    return function (dp) {
      var a, b, e, k, v,
        i = 0,
        c = [],
        rand = new BigNumber(ONE);

      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);

      k = mathceil(dp / LOG_BASE);

      if (CRYPTO) {

        // Browsers supporting crypto.getRandomValues.
        if (crypto.getRandomValues) {

          a = crypto.getRandomValues(new Uint32Array(k *= 2));

          for (; i < k;) {

            // 53 bits:
            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
            //                                     11111 11111111 11111111
            // 0x20000 is 2^21.
            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

            // Rejection sampling:
            // 0 <= v < 9007199254740992
            // Probability that v >= 9e15, is
            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {

              // 0 <= v <= 8999999999999999
              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;

        // Node.js supporting crypto.randomBytes.
        } else if (crypto.randomBytes) {

          // buffer
          a = crypto.randomBytes(k *= 7);

          for (; i < k;) {

            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
            // 0x100000000 is 2^32, 0x1000000 is 2^24
            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
            // 0 <= v < 9007199254740992
            v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
               (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
               (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {

              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error
           (bignumberError + 'crypto unavailable');
        }
      }

      // Use Math.random.
      if (!CRYPTO) {

        for (; i < k;) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }

      k = c[--i];
      dp %= LOG_BASE;

      // Convert trailing digits to zeros according to dp.
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }

      // Remove trailing elements which are zero.
      for (; c[i] === 0; c.pop(), i--);

      // Zero?
      if (i < 0) {
        c = [e = 0];
      } else {

        // Remove leading elements which are zero and adjust exponent accordingly.
        for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

        // Count the digits of the first element of c to determine leading zeros, and...
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

        // adjust the exponent accordingly.
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }

      rand.e = e;
      rand.c = c;
      return rand;
    };
  })();


   /*
   * Return a BigNumber whose value is the sum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.sum = function () {
    var i = 1,
      args = arguments,
      sum = new BigNumber(args[0]);
    for (; i < args.length;) sum = sum.plus(args[i++]);
    return sum;
  };


  // PRIVATE FUNCTIONS


  // Called by BigNumber and BigNumber.prototype.toString.
  convertBase = (function () {
    var decimal = '0123456789';

    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. toBaseOut('255', 10, 16) returns [15, 15].
     * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j,
        arr = [0],
        arrL,
        i = 0,
        len = str.length;

      for (; i < len;) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

        arr[0] += alphabet.indexOf(str.charAt(i++));

        for (j = 0; j < arr.length; j++) {

          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }

      return arr.reverse();
    }

    // Convert a numeric string of baseIn to a numeric string of baseOut.
    // If the caller is toString, we are converting from base 10 to baseOut.
    // If the caller is BigNumber, we are converting from baseIn to base 10.
    return function (str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y,
        i = str.indexOf('.'),
        dp = DECIMAL_PLACES,
        rm = ROUNDING_MODE;

      // Non-integer.
      if (i >= 0) {
        k = POW_PRECISION;

        // Unlimited precision.
        POW_PRECISION = 0;
        str = str.replace('.', '');
        y = new BigNumber(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;

        // Convert str as if an integer, then restore the fraction part by dividing the
        // result by its base raised to a power.

        y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
         10, baseOut, decimal);
        y.e = y.c.length;
      }

      // Convert the number as integer.

      xc = toBaseOut(str, baseIn, baseOut, callerIsToString
       ? (alphabet = ALPHABET, decimal)
       : (alphabet = decimal, ALPHABET));

      // xc now represents str as an integer and converted to baseOut. e is the exponent.
      e = k = xc.length;

      // Remove trailing zeros.
      for (; xc[--k] == 0; xc.pop());

      // Zero?
      if (!xc[0]) return alphabet.charAt(0);

      // Does str represent an integer? If so, no need for the division.
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;

        // The sign is needed for correct rounding.
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }

      // xc now represents str converted to baseOut.

      // THe index of the rounding digit.
      d = e + dp + 1;

      // The rounding digit: the digit to the right of the digit that may be rounded up.
      i = xc[d];

      // Look at the rounding digits and mode to determine whether to round up.

      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;

      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
            : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
             rm == (x.s < 0 ? 8 : 7));

      // If the index of the rounding digit is not greater than zero, or xc represents
      // zero, then the result of the base conversion is zero or, if rounding up, a value
      // such as 0.00001.
      if (d < 1 || !xc[0]) {

        // 1^-dp or 0
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {

        // Truncate xc to the required number of decimal places.
        xc.length = d;

        // Round up?
        if (r) {

          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (--baseOut; ++xc[--d] > baseOut;) {
            xc[d] = 0;

            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }

        // Determine trailing zeros.
        for (k = xc.length; !xc[--k];);

        // E.g. [4, 11, 15] becomes 4bf.
        for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

        // Add leading zeros, decimal point and trailing zeros as required.
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }

      // The caller will add the sign.
      return str;
    };
  })();


  // Perform division in the specified base. Called by div and convertBase.
  div = (function () {

    // Assume non-zero x and k.
    function multiply(x, k, base) {
      var m, temp, xlo, xhi,
        carry = 0,
        i = x.length,
        klo = k % SQRT_BASE,
        khi = k / SQRT_BASE | 0;

      for (x = x.slice(); i--;) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }

      if (carry) x = [carry].concat(x);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, cmp;

      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {

        for (i = cmp = 0; i < aL; i++) {

          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return cmp;
    }

    function subtract(a, b, aL, base) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1; a.splice(0, 1));
    }

    // x: dividend, y: divisor.
    return function (x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
        yL, yz,
        s = x.s == y.s ? 1 : -1,
        xc = x.c,
        yc = y.c;

      // Either NaN, Infinity or 0?
      if (!xc || !xc[0] || !yc || !yc[0]) {

        return new BigNumber(

         // Return NaN if either NaN, or both Infinity or 0.
         !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

          // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0
       );
      }

      q = new BigNumber(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;

      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }

      // Result exponent may be one less then the current value of e.
      // The coefficients of the BigNumbers from convertBase may have trailing zeros.
      for (i = 0; yc[i] == (xc[i] || 0); i++);

      if (yc[i] > (xc[i] || 0)) e--;

      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;

        // Normalise xc and yc so highest order digit of yc is >= base / 2.

        n = mathfloor(base / (yc[0] + 1));

        // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
        // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }

        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL; rem[remL++] = 0);
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        // Not necessary, but to prevent trial digit n > base, when using base 3.
        // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

        do {
          n = 0;

          // Compare divisor and remainder.
          cmp = compare(yc, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, n.

            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

            // n is how many times the divisor goes into the current remainder.
            n = mathfloor(rem0 / yc0);

            //  Algorithm:
            //  product = divisor multiplied by trial digit (n).
            //  Compare product and remainder.
            //  If product is greater than remainder:
            //    Subtract divisor from product, decrement trial digit.
            //  Subtract product from remainder.
            //  If product was less than remainder at the last compare:
            //    Compare new remainder and divisor.
            //    If remainder is greater than divisor:
            //      Subtract divisor from remainder, increment trial digit.

            if (n > 1) {

              // n may be > base only when base is 3.
              if (n >= base) n = base - 1;

              // product = divisor * trial digit.
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              // If product > remainder then trial digit n too high.
              // n is 1 too high about 5% of the time, and is not known to have
              // ever been more than 1 too high.
              while (compare(prod, rem, prodL, remL) == 1) {
                n--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {

              // n is 0 or 1, cmp is -1.
              // If n is 0, there is no need to compare yc and rem again below,
              // so change cmp to 1 to avoid it.
              // If n is 1, leave cmp as -1, so yc and rem are compared again.
              if (n == 0) {

                // divisor < remainder, so n must be at least 1.
                cmp = n = 1;
              }

              // product = divisor
              prod = yc.slice();
              prodL = prod.length;
            }

            if (prodL < remL) prod = [0].concat(prod);

            // Subtract product from remainder.
            subtract(rem, prod, remL, base);
            remL = rem.length;

             // If product was < remainder.
            if (cmp == -1) {

              // Compare divisor and new remainder.
              // If divisor < new remainder, subtract divisor from remainder.
              // Trial digit n too low.
              // n is 1 too low about 5% of the time, and very rarely 2 too low.
              while (compare(yc, rem, yL, remL) < 1) {
                n++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          } // else cmp === 1 and n will be 0

          // Add the next digit, n, to the result array.
          qc[i++] = n;

          // Update the remainder.
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);

        more = rem[0] != null;

        // Leading zero?
        if (!qc[0]) qc.splice(0, 1);
      }

      if (base == BASE) {

        // To calculate q.e, first get the number of digits of qc[0].
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

      // Caller is convertBase.
      } else {
        q.e = e;
        q.r = +more;
      }

      return q;
    };
  })();


  /*
   * Return a string representing the value of BigNumber n in fixed-point or exponential
   * notation rounded to the specified decimal places or significant digits.
   *
   * n: a BigNumber.
   * i: the index of the last digit required (i.e. the digit that may be rounded up).
   * rm: the rounding mode.
   * id: 1 (toExponential) or 2 (toPrecision).
   */
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;

    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);

    if (!n.c) return n.toString();

    c0 = n.c[0];
    ne = n.e;

    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
       ? toExponential(str, ne)
       : toFixedPoint(str, ne, '0');
    } else {
      n = round(new BigNumber(n), i, rm);

      // n.e may have changed if the value was rounded up.
      e = n.e;

      str = coeffToString(n.c);
      len = str.length;

      // toPrecision returns exponential notation if the number of significant digits
      // specified is less than the number of digits necessary to represent the integer
      // part of the value in fixed-point notation.

      // Exponential notation.
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

        // Append zeros?
        for (; len < i; str += '0', len++);
        str = toExponential(str, e);

      // Fixed-point notation.
      } else {
        i -= ne;
        str = toFixedPoint(str, e, '0');

        // Append zeros?
        if (e + 1 > len) {
          if (--i > 0) for (str += '.'; i--; str += '0');
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += '.';
            for (; i--; str += '0');
          }
        }
      }
    }

    return n.s < 0 && c0 ? '-' + str : str;
  }


  // Handle BigNumber.max and BigNumber.min.
  function maxOrMin(args, method) {
    var n,
      i = 1,
      m = new BigNumber(args[0]);

    for (; i < args.length; i++) {
      n = new BigNumber(args[i]);

      // If any number is NaN, return NaN.
      if (!n.s) {
        m = n;
        break;
      } else if (method.call(m, n)) {
        m = n;
      }
    }

    return m;
  }


  /*
   * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
   * Called by minus, plus and times.
   */
  function normalise(n, c, e) {
    var i = 1,
      j = c.length;

     // Remove trailing zeros.
    for (; !c[--j]; c.pop());

    // Calculate the base 10 exponent. First get the number of digits of c[0].
    for (j = c[0]; j >= 10; j /= 10, i++);

    // Overflow?
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

      // Infinity.
      n.c = n.e = null;

    // Underflow?
    } else if (e < MIN_EXP) {

      // Zero.
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }

    return n;
  }


  // Handle values that fail the validity test in BigNumber.
  parseNumeric = (function () {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
      dotAfter = /^([^.]+)\.$/,
      dotBefore = /^\.([^.]+)$/,
      isInfinityOrNaN = /^-?(Infinity|NaN)$/,
      whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

    return function (x, str, isNum, b) {
      var base,
        s = isNum ? str : str.replace(whitespaceOrPlus, '');

      // No exception on ±Infinity or NaN.
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {

          // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
          s = s.replace(basePrefix, function (m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
            return !b || b == base ? p1 : m;
          });

          if (b) {
            base = b;

            // E.g. '1.' to '1', '.1' to '0.1'
            s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
          }

          if (str != s) return new BigNumber(s, base);
        }

        // '[BigNumber Error] Not a number: {n}'
        // '[BigNumber Error] Not a base {b} number: {n}'
        if (BigNumber.DEBUG) {
          throw Error
            (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
        }

        // NaN
        x.s = null;
      }

      x.c = x.e = null;
    }
  })();


  /*
   * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
   * If r is truthy, it is known that there are more digits after the rounding digit.
   */
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd,
      xc = x.c,
      pows10 = POWS_TEN;

    // if x is not Infinity or NaN...
    if (xc) {

      // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
      // n is a base 1e14 number, the value of the element of array x.c containing rd.
      // ni is the index of n within x.c.
      // d is the number of digits of n.
      // i is the index of rd within n including leading zeros.
      // j is the actual index of rd within n (if < 0, rd is a leading zero).
      out: {

        // Get the number of digits of the first element of xc.
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
        i = sd - d;

        // If the rounding digit is in the first element of xc...
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];

          // Get the rounding digit at index j of n.
          rd = n / pows10[d - j - 1] % 10 | 0;
        } else {
          ni = mathceil((i + 1) / LOG_BASE);

          if (ni >= xc.length) {

            if (r) {

              // Needed by sqrt.
              for (; xc.length <= ni; xc.push(0));
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];

            // Get the number of digits of n.
            for (d = 1; k >= 10; k /= 10, d++);

            // Get the index of rd within n.
            i %= LOG_BASE;

            // Get the index of rd within n, adjusted for leading zeros.
            // The number of leading zeros of n is given by LOG_BASE - d.
            j = i - LOG_BASE + d;

            // Get the rounding digit at index j of n.
            rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
          }
        }

        r = r || sd < 0 ||

        // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
         xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

        r = rm < 4
         ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
         : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
           rm == (x.s < 0 ? 8 : 7));

        if (sd < 1 || !xc[0]) {
          xc.length = 0;

          if (r) {

            // Convert sd to decimal places.
            sd -= x.e + 1;

            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {

            // Zero.
            xc[0] = x.e = 0;
          }

          return x;
        }

        // Remove excess digits.
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];

          // E.g. 56700 becomes 56000 if 7 is the rounding digit.
          // j > 0 means i > number of leading zeros of n.
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }

        // Round up?
        if (r) {

          for (; ;) {

            // If the digit to be rounded up is in the first element of xc...
            if (ni == 0) {

              // i will be the length of xc[0] before k is added.
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++);

              // if i != k the length has increased.
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }

              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }

        // Remove trailing zeros.
        for (i = xc.length; xc[--i] === 0; xc.pop());
      }

      // Overflow? Infinity.
      if (x.e > MAX_EXP) {
        x.c = x.e = null;

      // Underflow? Zero.
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }

    return x;
  }


  function valueOf(n) {
    var str,
      e = n.e;

    if (e === null) return n.toString();

    str = coeffToString(n.c);

    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
      ? toExponential(str, e)
      : toFixedPoint(str, e, '0');

    return n.s < 0 ? '-' + str : str;
  }


  // PROTOTYPE/INSTANCE METHODS


  /*
   * Return a new BigNumber whose value is the absolute value of this BigNumber.
   */
  P.absoluteValue = P.abs = function () {
    var x = new BigNumber(this);
    if (x.s < 0) x.s = 1;
    return x;
  };


  /*
   * Return
   *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
   *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
   *   0 if they have the same value,
   *   or null if the value of either is NaN.
   */
  P.comparedTo = function (y, b) {
    return compare(this, new BigNumber(y, b));
  };


  /*
   * If dp is undefined or null or true or false, return the number of decimal places of the
   * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   *
   * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.decimalPlaces = P.dp = function (dp, rm) {
    var c, n, v,
      x = this;

    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), dp + x.e + 1, rm);
    }

    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

    // Subtract the number of trailing zeros of the last number.
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
    if (n < 0) n = 0;

    return n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
   * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.dividedBy = P.div = function (y, b) {
    return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };


  /*
   * Return a new BigNumber whose value is the integer part of dividing the value of this
   * BigNumber by the value of BigNumber(y, b).
   */
  P.dividedToIntegerBy = P.idiv = function (y, b) {
    return div(this, new BigNumber(y, b), 0, 1);
  };


  /*
   * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
   *
   * If m is present, return the result modulo m.
   * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
   * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
   *
   * The modular power operation works efficiently when x, n, and m are integers, otherwise it
   * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
   *
   * n {number|string|BigNumber} The exponent. An integer.
   * [m] {number|string|BigNumber} The modulus.
   *
   * '[BigNumber Error] Exponent not an integer: {n}'
   */
  P.exponentiatedBy = P.pow = function (n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
      x = this;

    n = new BigNumber(n);

    // Allow NaN and ±Infinity, but not other non-integers.
    if (n.c && !n.isInteger()) {
      throw Error
        (bignumberError + 'Exponent not an integer: ' + valueOf(n));
    }

    if (m != null) m = new BigNumber(m);

    // Exponent of MAX_SAFE_INTEGER is 15.
    nIsBig = n.e > 14;

    // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

      // The sign of the result of pow when x is negative depends on the evenness of n.
      // If +n overflows to ±Infinity, the evenness of n would be not be known.
      y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }

    nIsNeg = n.s < 0;

    if (m) {

      // x % m returns NaN if abs(m) is zero, or m is NaN.
      if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

      isModExp = !nIsNeg && x.isInteger() && m.isInteger();

      if (isModExp) x = x.mod(m);

    // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
    // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
      // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
      // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

      // If x is negative and n is odd, k = -0, else k = 0.
      k = x.s < 0 && isOdd(n) ? -0 : 0;

      // If x >= 1, k = ±Infinity.
      if (x.e > -1) k = 1 / k;

      // If n is negative return ±0, else return ±Infinity.
      return new BigNumber(nIsNeg ? 1 / k : k);

    } else if (POW_PRECISION) {

      // Truncating each coefficient array to a length of k after each multiplication
      // equates to truncating significant digits to POW_PRECISION + [28, 41],
      // i.e. there will be a minimum of 28 guard digits retained.
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }

    if (nIsBig) {
      half = new BigNumber(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }

    y = new BigNumber(ONE);

    // Performs 54 loop iterations for n of 9007199254740991.
    for (; ;) {

      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;

        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
        }
      }

      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);

        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }

      x = x.times(x);

      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
      }
    }

    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);

    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
   * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
   */
  P.integerValue = function (rm) {
    var n = new BigNumber(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };


  /*
   * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isEqualTo = P.eq = function (y, b) {
    return compare(this, new BigNumber(y, b)) === 0;
  };


  /*
   * Return true if the value of this BigNumber is a finite number, otherwise return false.
   */
  P.isFinite = function () {
    return !!this.c;
  };


  /*
   * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isGreaterThan = P.gt = function (y, b) {
    return compare(this, new BigNumber(y, b)) > 0;
  };


  /*
   * Return true if the value of this BigNumber is greater than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

  };


  /*
   * Return true if the value of this BigNumber is an integer, otherwise return false.
   */
  P.isInteger = function () {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };


  /*
   * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isLessThan = P.lt = function (y, b) {
    return compare(this, new BigNumber(y, b)) < 0;
  };


  /*
   * Return true if the value of this BigNumber is less than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isLessThanOrEqualTo = P.lte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
  };


  /*
   * Return true if the value of this BigNumber is NaN, otherwise return false.
   */
  P.isNaN = function () {
    return !this.s;
  };


  /*
   * Return true if the value of this BigNumber is negative, otherwise return false.
   */
  P.isNegative = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this BigNumber is positive, otherwise return false.
   */
  P.isPositive = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
   */
  P.isZero = function () {
    return !!this.c && this.c[0] == 0;
  };


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber minus the value of
   * BigNumber(y, b).
   */
  P.minus = function (y, b) {
    var i, j, t, xLTy,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Either Infinity?
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

      // Either zero?
      if (!xc[0] || !yc[0]) {

        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

         // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
         ROUNDING_MODE == 3 ? -0 : 0);
      }
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Determine which is the bigger number.
    if (a = xe - ye) {

      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();

      // Prepend zeros to equalise exponents.
      for (b = a; b--; t.push(0));
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

      for (a = b = 0; b < j; b++) {

        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

    b = (j = yc.length) - (i = xc.length);

    // Append zeros to xc if shorter.
    // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
    if (b > 0) for (; b--; xc[i++] = 0);
    b = BASE - 1;

    // Subtract yc from xc.
    for (; j > a;) {

      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b);
        --xc[i];
        xc[j] += BASE;
      }

      xc[j] -= yc[j];
    }

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] == 0; xc.splice(0, 1), --ye);

    // Zero?
    if (!xc[0]) {

      // Following IEEE 754 (2008) 6.3,
      // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }

    // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
    // for finite x and y.
    return normalise(y, xc, ye);
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
   * BigNumber(y, b). The result depends on the value of MODULO_MODE.
   */
  P.modulo = P.mod = function (y, b) {
    var q, s,
      x = this;

    y = new BigNumber(y, b);

    // Return NaN if x is Infinity or NaN, or y is NaN or zero.
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber(NaN);

    // Return x if y is Infinity or x is zero.
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber(x);
    }

    if (MODULO_MODE == 9) {

      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // r = x - qy    where  0 <= r < abs(y)
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }

    y = x.minus(q.times(y));

    // To match JavaScript %, ensure sign of zero is sign of dividend.
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

    return y;
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
   * of BigNumber(y, b).
   */
  P.multipliedBy = P.times = function (y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
      base, sqrtBase,
      x = this,
      xc = x.c,
      yc = (y = new BigNumber(y, b)).c;

    // Either NaN, ±Infinity or ±0?
    if (!xc || !yc || !xc[0] || !yc[0]) {

      // Return NaN if either is NaN, or one is 0 and the other is Infinity.
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;

        // Return ±Infinity if either is ±Infinity.
        if (!xc || !yc) {
          y.c = y.e = null;

        // Return ±0 if either is ±0.
        } else {
          y.c = [0];
          y.e = 0;
        }
      }

      return y;
    }

    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;

    // Ensure xc points to longer array and xcL to its length.
    if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

    // Initialise the result array with zeros.
    for (i = xcL + ycL, zc = []; i--; zc.push(0));

    base = BASE;
    sqrtBase = SQRT_BASE;

    for (i = ycL; --i >= 0;) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;

      for (k = xcL, j = i + k; j > i;) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }

      zc[j] = c;
    }

    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }

    return normalise(y, zc, e);
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber negated,
   * i.e. multiplied by -1.
   */
  P.negated = function () {
    var x = new BigNumber(this);
    x.s = -x.s || null;
    return x;
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber plus the value of
   * BigNumber(y, b).
   */
  P.plus = function (y, b) {
    var t,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
     if (a != b) {
      y.s = -b;
      return x.minus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Return ±Infinity if either ±Infinity.
      if (!xc || !yc) return new BigNumber(a / 0);

      // Either zero?
      // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }

      t.reverse();
      for (; a--; t.push(0));
      t.reverse();
    }

    a = xc.length;
    b = yc.length;

    // Point xc to the longer array, and b to the shorter length.
    if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

    // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
    for (a = 0; b;) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }

    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    // ye = MAX_EXP + 1 possible
    return normalise(y, xc, ye);
  };


  /*
   * If sd is undefined or null or true or false, return the number of significant digits of
   * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   * If sd is true include integer-part trailing zeros in the count.
   *
   * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
   *                     boolean: whether to count integer-part trailing zeros: true or false.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.precision = P.sd = function (sd, rm) {
    var c, n, v,
      x = this;

    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), sd, rm);
    }

    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;

    if (v = c[v]) {

      // Subtract the number of trailing zeros of the last element.
      for (; v % 10 == 0; v /= 10, n--);

      // Add the number of digits of the first element.
      for (v = c[0]; v >= 10; v /= 10, n++);
    }

    if (sd && x.e + 1 > n) n = x.e + 1;

    return n;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
   * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
   *
   * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
   */
  P.shiftedBy = function (k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times('1e' + k);
  };


  /*
   *  sqrt(-n) =  N
   *  sqrt(N) =  N
   *  sqrt(-I) =  N
   *  sqrt(I) =  I
   *  sqrt(0) =  0
   *  sqrt(-0) = -0
   *
   * Return a new BigNumber whose value is the square root of the value of this BigNumber,
   * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.squareRoot = P.sqrt = function () {
    var m, n, r, rep, t,
      x = this,
      c = x.c,
      s = x.s,
      e = x.e,
      dp = DECIMAL_PLACES + 4,
      half = new BigNumber('0.5');

    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }

    // Initial estimate.
    s = Math.sqrt(+valueOf(x));

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new BigNumber(n);
    } else {
      r = new BigNumber(s + '');
    }

    // Check for zero.
    // r could be zero if MIN_EXP is changed after the this value was created.
    // This would cause a division by zero (x/t) and hence Infinity below, which would cause
    // coeffToString to throw.
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;

      // Newton-Raphson iteration.
      for (; ;) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));

        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

          // The exponent of r may here be one less than the final result exponent,
          // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
          // are indexed correctly.
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);

          // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
          // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
          // iteration.
          if (n == '9999' || !rep && n == '4999') {

            // On the first iteration only, check to see if rounding up gives the
            // exact result as the nines may infinitely repeat.
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);

              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }

            dp += 4;
            s += 4;
            rep = 1;
          } else {

            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
            // result. If not, then there are further digits and m will be truthy.
            if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

              // Truncate to the first rounding digit.
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }

            break;
          }
        }
      }
    }

    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };


  /*
   * Return a string representing the value of this BigNumber in exponential notation and
   * rounded using ROUNDING_MODE to dp fixed decimal places.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toExponential = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounding
   * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
   * but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toFixed = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounded
   * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
   * of the format or FORMAT object (see BigNumber.set).
   *
   * The formatting object may contain some or all of the properties shown below.
   *
   * FORMAT = {
   *   prefix: '',
   *   groupSize: 3,
   *   secondaryGroupSize: 0,
   *   groupSeparator: ',',
   *   decimalSeparator: '.',
   *   fractionGroupSize: 0,
   *   fractionGroupSeparator: '\xA0',      // non-breaking space
   *   suffix: ''
   * };
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   * [format] {object} Formatting options. See FORMAT pbject above.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   * '[BigNumber Error] Argument not an object: {format}'
   */
  P.toFormat = function (dp, rm, format) {
    var str,
      x = this;

    if (format == null) {
      if (dp != null && rm && typeof rm == 'object') {
        format = rm;
        rm = null;
      } else if (dp && typeof dp == 'object') {
        format = dp;
        dp = rm = null;
      } else {
        format = FORMAT;
      }
    } else if (typeof format != 'object') {
      throw Error
        (bignumberError + 'Argument not an object: ' + format);
    }

    str = x.toFixed(dp, rm);

    if (x.c) {
      var i,
        arr = str.split('.'),
        g1 = +format.groupSize,
        g2 = +format.secondaryGroupSize,
        groupSeparator = format.groupSeparator || '',
        intPart = arr[0],
        fractionPart = arr[1],
        isNeg = x.s < 0,
        intDigits = isNeg ? intPart.slice(1) : intPart,
        len = intDigits.length;

      if (g2) i = g1, g1 = g2, g2 = i, len -= i;

      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = '-' + intPart;
      }

      str = fractionPart
       ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
        ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
         '$&' + (format.fractionGroupSeparator || ''))
        : fractionPart)
       : intPart;
    }

    return (format.prefix || '') + str + (format.suffix || '');
  };


  /*
   * Return an array of two BigNumbers representing the value of this BigNumber as a simple
   * fraction with an integer numerator and an integer denominator.
   * The denominator will be a positive non-zero value less than or equal to the specified
   * maximum denominator. If a maximum denominator is not specified, the denominator will be
   * the lowest value necessary to represent the number exactly.
   *
   * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
   *
   * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
   */
  P.toFraction = function (md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
      x = this,
      xc = x.c;

    if (md != null) {
      n = new BigNumber(md);

      // Throw if md is less than one or is not an integer, unless it is Infinity.
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error
          (bignumberError + 'Argument ' +
            (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
      }
    }

    if (!xc) return new BigNumber(x);

    d = new BigNumber(ONE);
    n1 = d0 = new BigNumber(ONE);
    d1 = n0 = new BigNumber(ONE);
    s = coeffToString(xc);

    // Determine initial denominator.
    // d is a power of 10 and the minimum max denominator that specifies the value exactly.
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber(s);

    // n0 = d1 = 0
    n0.c[0] = 0;

    for (; ;)  {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }

    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;

    // Determine which fraction is closer to x, n0/d0 or n1/d1
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
        div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

    MAX_EXP = exp;

    return r;
  };


  /*
   * Return the value of this BigNumber converted to a number primitive.
   */
  P.toNumber = function () {
    return +valueOf(this);
  };


  /*
   * Return a string representing the value of this BigNumber rounded to sd significant digits
   * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
   * necessary to represent the integer part of the value in fixed-point notation, then use
   * exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.toPrecision = function (sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };


  /*
   * Return a string representing the value of this BigNumber in base b, or base 10 if b is
   * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
   * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
   * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
   * TO_EXP_NEG, return exponential notation.
   *
   * [b] {number} Integer, 2 to ALPHABET.length inclusive.
   *
   * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
   */
  P.toString = function (b) {
    var str,
      n = this,
      s = n.s,
      e = n.e;

    // Infinity or NaN?
    if (e === null) {
      if (s) {
        str = 'Infinity';
        if (s < 0) str = '-' + str;
      } else {
        str = 'NaN';
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS
         ? toExponential(coeffToString(n.c), e)
         : toFixedPoint(coeffToString(n.c), e, '0');
      } else if (b === 10) {
        n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, '0');
      } else {
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
      }

      if (s < 0 && n.c[0]) str = '-' + str;
    }

    return str;
  };


  /*
   * Return as toString, but do not accept a base argument, and include the minus sign for
   * negative zero.
   */
  P.valueOf = P.toJSON = function () {
    return valueOf(this);
  };


  P._isBigNumber = true;

  P[Symbol.toStringTag] = 'BigNumber';

  // Node.js v10.12.0+
  P[Symbol.for('nodejs.util.inspect.custom')] = P.valueOf;

  if (configObject != null) BigNumber.set(configObject);

  return BigNumber;
}


// PRIVATE HELPER FUNCTIONS

// These functions don't need access to variables,
// e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}


// Return a coefficient array as a string of base 10 digits.
function coeffToString(a) {
  var s, z,
    i = 1,
    j = a.length,
    r = a[0] + '';

  for (; i < j;) {
    s = a[i++] + '';
    z = LOG_BASE - s.length;
    for (; z--; s = '0' + s);
    r += s;
  }

  // Determine trailing zeros.
  for (j = r.length; r.charCodeAt(--j) === 48;);

  return r.slice(0, j + 1 || 1);
}


// Compare the value of BigNumbers x and y.
function compare(x, y) {
  var a, b,
    xc = x.c,
    yc = y.c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;

  // Either NaN?
  if (!i || !j) return null;

  a = xc && !xc[0];
  b = yc && !yc[0];

  // Either zero?
  if (a || b) return a ? b ? 0 : -j : i;

  // Signs differ?
  if (i != j) return i;

  a = i < 0;
  b = k == l;

  // Either Infinity?
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

  // Compare exponents.
  if (!b) return k > l ^ a ? 1 : -1;

  j = (k = xc.length) < (l = yc.length) ? k : l;

  // Compare digit by digit.
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

  // Compare lengths.
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}


/*
 * Check that n is a primitive number, an integer, and in range, otherwise throw.
 */
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error
     (bignumberError + (name || 'Argument') + (typeof n == 'number'
       ? n < min || n > max ? ' out of range: ' : ' not an integer: '
       : ' not a primitive number: ') + String(n));
  }
}


// Assumes finite n.
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}


function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
   (e < 0 ? 'e' : 'e+') + e;
}


function toFixedPoint(str, e, z) {
  var len, zs;

  // Negative exponent?
  if (e < 0) {

    // Prepend zeros.
    for (zs = z + '.'; ++e; zs += z);
    str = zs + str;

  // Positive exponent
  } else {
    len = str.length;

    // Append zeros.
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z);
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + '.' + str.slice(e);
    }
  }

  return str;
}


// EXPORT


var BigNumber = clone();

/* harmony default export */ const bignumber = (BigNumber);

;// CONCATENATED MODULE: ./es6/ops/randomPlanoutCoreCompatible.js
function randomPlanoutCoreCompatible_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { randomPlanoutCoreCompatible_typeof = function _typeof(obj) { return typeof obj; }; } else { randomPlanoutCoreCompatible_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return randomPlanoutCoreCompatible_typeof(obj); }

function randomPlanoutCoreCompatible_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function randomPlanoutCoreCompatible_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function randomPlanoutCoreCompatible_createClass(Constructor, protoProps, staticProps) { if (protoProps) randomPlanoutCoreCompatible_defineProperties(Constructor.prototype, protoProps); if (staticProps) randomPlanoutCoreCompatible_defineProperties(Constructor, staticProps); return Constructor; }

function randomPlanoutCoreCompatible_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) randomPlanoutCoreCompatible_setPrototypeOf(subClass, superClass); }

function randomPlanoutCoreCompatible_setPrototypeOf(o, p) { randomPlanoutCoreCompatible_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return randomPlanoutCoreCompatible_setPrototypeOf(o, p); }

function randomPlanoutCoreCompatible_createSuper(Derived) { var hasNativeReflectConstruct = randomPlanoutCoreCompatible_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = randomPlanoutCoreCompatible_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = randomPlanoutCoreCompatible_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return randomPlanoutCoreCompatible_possibleConstructorReturn(this, result); }; }

function randomPlanoutCoreCompatible_possibleConstructorReturn(self, call) { if (call && (randomPlanoutCoreCompatible_typeof(call) === "object" || typeof call === "function")) { return call; } return randomPlanoutCoreCompatible_assertThisInitialized(self); }

function randomPlanoutCoreCompatible_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function randomPlanoutCoreCompatible_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function randomPlanoutCoreCompatible_getPrototypeOf(o) { randomPlanoutCoreCompatible_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return randomPlanoutCoreCompatible_getPrototypeOf(o); }



var LONG_SCALE = new bignumber("FFFFFFFFFFFFFFF", 16);

var PlanOutOpRandomCoreCompatible = /*#__PURE__*/function (_PlanOutOpRandom) {
  randomPlanoutCoreCompatible_inherits(PlanOutOpRandomCoreCompatible, _PlanOutOpRandom);

  var _super = randomPlanoutCoreCompatible_createSuper(PlanOutOpRandomCoreCompatible);

  function PlanOutOpRandomCoreCompatible() {
    randomPlanoutCoreCompatible_classCallCheck(this, PlanOutOpRandomCoreCompatible);

    return _super.apply(this, arguments);
  }

  randomPlanoutCoreCompatible_createClass(PlanOutOpRandomCoreCompatible, [{
    key: "hashCalculation",
    value: function hashCalculation(hash) {
      return new bignumber(hash.substr(0, 15), 16);
    }
  }, {
    key: "zeroToOneCalculation",
    value: function zeroToOneCalculation(appendedUnit) {
      return this.getHash(appendedUnit).dividedBy(LONG_SCALE).toNumber();
    }
  }]);

  return PlanOutOpRandomCoreCompatible;
}(PlanOutOpRandom);

var RandomIntegerCoreCompatible = /*#__PURE__*/function (_RandomIntegerBuilder) {
  randomPlanoutCoreCompatible_inherits(RandomIntegerCoreCompatible, _RandomIntegerBuilder);

  var _super2 = randomPlanoutCoreCompatible_createSuper(RandomIntegerCoreCompatible);

  function RandomIntegerCoreCompatible() {
    randomPlanoutCoreCompatible_classCallCheck(this, RandomIntegerCoreCompatible);

    return _super2.apply(this, arguments);
  }

  randomPlanoutCoreCompatible_createClass(RandomIntegerCoreCompatible, [{
    key: "randomIntegerCalculation",
    value: function randomIntegerCalculation(minVal, maxVal) {
      return this.getHash().modulo(maxVal - minVal + 1).plus(minVal).toNumber();
    }
  }]);

  return RandomIntegerCoreCompatible;
}(RandomIntegerBuilder(PlanOutOpRandomCoreCompatible));

var UniformChoiceCoreCompatible = /*#__PURE__*/function (_UniformChoiceBuilder) {
  randomPlanoutCoreCompatible_inherits(UniformChoiceCoreCompatible, _UniformChoiceBuilder);

  var _super3 = randomPlanoutCoreCompatible_createSuper(UniformChoiceCoreCompatible);

  function UniformChoiceCoreCompatible() {
    randomPlanoutCoreCompatible_classCallCheck(this, UniformChoiceCoreCompatible);

    return _super3.apply(this, arguments);
  }

  randomPlanoutCoreCompatible_createClass(UniformChoiceCoreCompatible, [{
    key: "randomIndexCalculation",
    value: function randomIndexCalculation(choices) {
      return this.getHash().modulo(choices.length).toNumber();
    }
  }]);

  return UniformChoiceCoreCompatible;
}(UniformChoiceBuilder(PlanOutOpRandomCoreCompatible));

var SampleCoreCompatible = /*#__PURE__*/function (_SampleBuilder) {
  randomPlanoutCoreCompatible_inherits(SampleCoreCompatible, _SampleBuilder);

  var _super4 = randomPlanoutCoreCompatible_createSuper(SampleCoreCompatible);

  function SampleCoreCompatible() {
    randomPlanoutCoreCompatible_classCallCheck(this, SampleCoreCompatible);

    return _super4.apply(this, arguments);
  }

  randomPlanoutCoreCompatible_createClass(SampleCoreCompatible, [{
    key: "sampleIndexCalculation",
    value: function sampleIndexCalculation(i) {
      return this.getHash(i).modulo(i + 1).toNumber();
    }
  }, {
    key: "allowSampleStoppingPoint",
    value: function allowSampleStoppingPoint() {
      return false;
    }
  }]);

  return SampleCoreCompatible;
}(SampleBuilder(PlanOutOpRandomCoreCompatible));

var WeightedChoiceCoreCompatible = WeightedChoiceBuilder(PlanOutOpRandomCoreCompatible);
var BernoulliFilterCoreCompatible = BernoulliFilterBuilder(PlanOutOpRandomCoreCompatible);
var BernoulliTrialCoreCompatible = BernoulliTrialBuilder(PlanOutOpRandomCoreCompatible);
var RandomFloatCoreCompatible = RandomFloatBuilder(PlanOutOpRandomCoreCompatible);

;// CONCATENATED MODULE: ./build/index_core_compatible.js


var paf = planoutAPIFactory({
  Random: randomPlanoutCoreCompatible_namespaceObject
});
var Assignment = paf.Assignment,
    Experiment = paf.Experiment,
    ExperimentSetup = paf.ExperimentSetup,
    Interpreter = paf.Interpreter,
    Ops = paf.Ops,
    Namespace = paf.Namespace;


/***/ }),

/***/ 487:
/***/ ((module) => {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ 12:
/***/ ((module) => {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ 738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function() {
  var crypt = __webpack_require__(12),
      utf8 = __webpack_require__(487).utf8,
      bin = __webpack_require__(487).bin,

  // The core
  sha1 = function (message) {
    // Convert to byte array
    if (message.constructor == String)
      message = utf8.stringToBytes(message);
    else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();

    // otherwise assume byte array

    var m  = crypt.bytesToWords(message),
        l  = message.length * 8,
        w  = [],
        H0 =  1732584193,
        H1 = -271733879,
        H2 = -1732584194,
        H3 =  271733878,
        H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      var a = H0,
          b = H1,
          c = H2,
          d = H3,
          e = H4;

      for (var j = 0; j < 80; j++) {

        if (j < 16)
          w[j] = m[i + j];
        else {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = (n << 1) | (n >>> 31);
        }

        var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                         (H1 ^ H2 ^ H3) - 899497514);

        H4 = H3;
        H3 = H2;
        H2 = (H1 << 30) | (H1 >>> 2);
        H1 = H0;
        H0 = t;
      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;
    }

    return [H0, H1, H2, H3, H4];
  },

  // Public API
  api = function (message, options) {
    var digestbytes = crypt.wordsToBytes(sha1(message));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

  api._blocksize = 16;
  api._digestsize = 20;

  module.exports = api;
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(637);
/******/ })()
;
});