(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["planout"] = factory();
	else
		root["planout"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 837:
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

// NAMESPACE OBJECT: ./es6/ops/random.js
var random_namespaceObject = {};
__webpack_require__.r(random_namespaceObject);
__webpack_require__.d(random_namespaceObject, {
  "BernoulliFilter": () => BernoulliFilter,
  "BernoulliTrial": () => BernoulliTrial,
  "PlanOutOpRandom": () => PlanOutOpRandom,
  "RandomFloat": () => RandomFloat,
  "RandomInteger": () => RandomInteger,
  "Sample": () => Sample,
  "UniformChoice": () => UniformChoice,
  "WeightedChoice": () => WeightedChoice
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


;// CONCATENATED MODULE: ./es6/ops/random.js

var Sample = SampleBuilder(PlanOutOpRandom);
var WeightedChoice = WeightedChoiceBuilder(PlanOutOpRandom);
var UniformChoice = UniformChoiceBuilder(PlanOutOpRandom);
var BernoulliFilter = BernoulliFilterBuilder(PlanOutOpRandom);
var BernoulliTrial = BernoulliTrialBuilder(PlanOutOpRandom);
var RandomInteger = RandomIntegerBuilder(PlanOutOpRandom);
var RandomFloat = RandomFloatBuilder(PlanOutOpRandom);

;// CONCATENATED MODULE: ./build/index.js


var paf = planoutAPIFactory({
  Random: random_namespaceObject
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
/******/ 	return __webpack_require__(837);
/******/ })()
;
});