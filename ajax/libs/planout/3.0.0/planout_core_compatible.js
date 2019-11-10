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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _experiment = __webpack_require__(1);

	var _experiment2 = _interopRequireDefault(_experiment);

	var _interpreter = __webpack_require__(9);

	var _interpreter2 = _interopRequireDefault(_interpreter);

	var _randomPlanoutCoreCompatible = __webpack_require__(14);

	var _randomPlanoutCoreCompatible2 = _interopRequireDefault(_randomPlanoutCoreCompatible);

	var _core = __webpack_require__(11);

	var _core2 = _interopRequireDefault(_core);

	var _namespace = __webpack_require__(12);

	var Namespace = _interopRequireWildcard(_namespace);

	var _assignment = __webpack_require__(2);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _experimentSetup = __webpack_require__(13);

	var _experimentSetup2 = _interopRequireDefault(_experimentSetup);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  Namespace: Namespace,
	  Assignment: _assignment2.default,
	  Interpreter: _interpreter2.default,
	  Experiment: _experiment2.default,
	  ExperimentSetup: _experimentSetup2.default,
	  Ops: {
	    Random: _randomPlanoutCoreCompatible2.default,
	    Core: _core2.default
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assignment = __webpack_require__(2);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Experiment = function () {
	  function Experiment(inputs) {
	    _classCallCheck(this, Experiment);

	    this.inputs = inputs;
	    this._exposureLogged = false;
	    this._salt = null;
	    this._inExperiment = true;

	    this.name = this.getDefaultExperimentName();
	    this._autoExposureLog = true;

	    this.setup();

	    this._assignment = new _assignment2.default(this.getSalt());
	    this._assigned = false;
	  }

	  //helper function to return the class name of the current experiment class


	  _createClass(Experiment, [{
	    key: 'getDefaultExperimentName',
	    value: function getDefaultExperimentName() {
	      if ((0, _utils.isObject)(this) && this.constructor && this !== this.window) {
	        var arr = this.constructor.toString().match(/function\s*(\w+)/);
	        if (arr && arr.length === 2) {
	          return arr[1];
	        }
	      }
	      return "GenericExperiment";
	    }

	    /* default implementation of fetching the range of experiment parameters that this experiment can take */

	  }, {
	    key: 'getDefaultParamNames',
	    value: function getDefaultParamNames() {
	      var assignmentFxn = this.assign.toString();
	      var possibleKeys = assignmentFxn.split('.set(');
	      possibleKeys.splice(0, 1); //remove first index since it'll have the function definitions
	      return (0, _utils.map)(possibleKeys, function (val) {
	        var str = (0, _utils.trimTrailingWhitespace)(val.split(',')[0]);
	        return str.substr(1, str.length - 2); //remove string chars
	      });
	    }
	  }, {
	    key: 'requireAssignment',
	    value: function requireAssignment() {
	      if (!this._assigned) {
	        this._assign();
	      }
	    }
	  }, {
	    key: 'requireExposureLogging',
	    value: function requireExposureLogging(paramName) {
	      if (this.shouldLogExposure(paramName)) {
	        this.logExposure();
	      }
	    }
	  }, {
	    key: '_assign',
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
	    key: 'setup',
	    value: function setup() {
	      return;
	    }
	  }, {
	    key: 'inExperiment',
	    value: function inExperiment() {
	      return this._inExperiment;
	    }
	  }, {
	    key: 'addOverride',
	    value: function addOverride(key, value) {
	      this._assignment.addOverride(key, value);
	    }
	  }, {
	    key: 'setOverrides',
	    value: function setOverrides(value) {
	      this._assignment.setOverrides(value);
	      var o = this._assignment.getOverrides();
	      var self = this;
	      (0, _utils.forEach)(Object.keys(o), function (key) {
	        if (self.inputs[key] !== undefined) {
	          self.inputs[key] = o[key];
	        }
	      });
	    }
	  }, {
	    key: 'getSalt',
	    value: function getSalt() {
	      if (this._salt) {
	        return this._salt;
	      } else {
	        return this.name;
	      }
	    }
	  }, {
	    key: 'setSalt',
	    value: function setSalt(value) {
	      this._salt = value;
	      if (this._assignment) {
	        this._assignment.experimentSalt = value;
	      }
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return this.name;
	    }
	  }, {
	    key: 'assign',
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
	    key: 'getParamNames',
	    value: function getParamNames() {
	      throw "IMPLEMENT getParamNames";
	    }
	  }, {
	    key: 'shouldFetchExperimentParameter',
	    value: function shouldFetchExperimentParameter(name) {
	      var experimentalParams = this.getParamNames();
	      return experimentalParams.indexOf(name) >= 0;
	    }
	  }, {
	    key: 'setName',
	    value: function setName(value) {
	      var re = /\s+/g;
	      this.name = value.replace(re, '-');
	      if (this._assignment) {
	        this._assignment.experimentSalt = this.getSalt();
	      }
	    }
	  }, {
	    key: '__asBlob',
	    value: function __asBlob() {
	      var extras = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var d = {
	        'name': this.getName(),
	        'time': new Date().getTime() / 1000,
	        'salt': this.getSalt(),
	        'inputs': this.inputs,
	        'params': this._assignment.getParams()
	      };
	      (0, _utils.extend)(d, extras);
	      return d;
	    }
	  }, {
	    key: 'setAutoExposureLogging',
	    value: function setAutoExposureLogging(value) {
	      this._autoExposureLog = value;
	    }
	  }, {
	    key: 'getParams',
	    value: function getParams() {
	      this.requireAssignment();
	      this.requireExposureLogging();
	      return this._assignment.getParams();
	    }
	  }, {
	    key: 'get',
	    value: function get(name, def) {
	      this.requireAssignment();
	      this.requireExposureLogging(name);
	      return this._assignment.get(name, def);
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      this.requireAssignment();
	      this.requireExposureLogging();
	      return JSON.stringify(this.__asBlob());
	    }
	  }, {
	    key: 'logExposure',
	    value: function logExposure(extras) {
	      if (!this.inExperiment()) {
	        return;
	      }
	      this._exposureLogged = true;
	      this.logEvent('exposure', extras);
	    }
	  }, {
	    key: 'shouldLogExposure',
	    value: function shouldLogExposure(paramName) {
	      if (paramName !== undefined && !this.shouldFetchExperimentParameter(paramName)) {
	        return false;
	      }
	      return this._autoExposureLog && !this.previouslyLogged();
	    }
	  }, {
	    key: 'logEvent',
	    value: function logEvent(eventType, extras) {
	      if (!this.inExperiment()) {
	        return;
	      }

	      var extraPayload;

	      if (extras) {
	        extraPayload = { 'event': eventType, 'extra_data': (0, _utils.shallowCopy)(extras) };
	      } else {
	        extraPayload = { 'event': eventType };
	      }

	      this.log(this.__asBlob(extraPayload));
	    }
	  }, {
	    key: 'configureLogger',
	    value: function configureLogger() {
	      throw "IMPLEMENT configureLogger";
	    }
	  }, {
	    key: 'log',
	    value: function log(data) {
	      throw "IMPLEMENT log";
	    }
	  }, {
	    key: 'previouslyLogged',
	    value: function previouslyLogged() {
	      throw "IMPLEMENT previouslyLogged";
	    }
	  }]);

	  return Experiment;
	}();

	exports.default = Experiment;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _random = __webpack_require__(3);

	var _utils = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Assignment = function () {
	  function Assignment(experimentSalt, overrides) {
	    _classCallCheck(this, Assignment);

	    if (!overrides) {
	      overrides = {};
	    }
	    this.experimentSalt = experimentSalt;
	    this._overrides = (0, _utils.shallowCopy)(overrides);
	    this._data = (0, _utils.shallowCopy)(overrides);
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
	      this._overrides = (0, _utils.shallowCopy)(overrides);
	      var self = this;
	      (0, _utils.forEach)(Object.keys(this._overrides), function (overrideKey) {
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

	      if ((0, _utils.hasKey)(this._overrides, name)) {
	        return;
	      }
	      if (value instanceof _random.PlanOutOpRandom) {
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
	    value: function get(name) {
	      if (name === '_data') {
	        return this._data;
	      } else if (name === '_overrides') {
	        return this._overrides;
	      } else if (name === 'experimentSalt') {
	        return this.experimentSalt;
	      } else if (name === 'saltSeparator') {
	        return this.saltSeparator;
	      } else {
	        return this._data[name];
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

	exports.default = Assignment;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(4);

	var _sha = __webpack_require__(6);

	var _sha2 = _interopRequireDefault(_sha);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlanOutOpRandom = function (_PlanOutOpSimple) {
	  _inherits(PlanOutOpRandom, _PlanOutOpSimple);

	  function PlanOutOpRandom(args) {
	    _classCallCheck(this, PlanOutOpRandom);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlanOutOpRandom).call(this, args));

	    _this.LONG_SCALE = 0xFFFFFFFFFFFFF;
	    return _this;
	  }

	  _createClass(PlanOutOpRandom, [{
	    key: "compatHashCalculation",
	    value: function compatHashCalculation(hash) {
	      return parseInt(hash.substr(0, 13), 16);
	    }
	  }, {
	    key: "compatZeroToOneCalculation",
	    value: function compatZeroToOneCalculation(appendedUnit) {
	      return this.getHash(appendedUnit) / this.LONG_SCALE;
	    }
	  }, {
	    key: "getUnit",
	    value: function getUnit(appendedUnit) {
	      var unit = this.getArgMixed('unit');
	      if (!(0, _utils.isArray)(unit)) {
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
	      var minVal = arguments.length <= 0 || arguments[0] === undefined ? 0.0 : arguments[0];
	      var maxVal = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
	      var appendedUnit = arguments[2];

	      var zeroToOne = this.compatZeroToOneCalculation(appendedUnit);
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
	      var hash = (0, _sha2.default)(hashStr);
	      return this.compatHashCalculation(hash);
	    }
	  }]);

	  return PlanOutOpRandom;
	}(_base.PlanOutOpSimple);

	var RandomFloatBuilder = function RandomFloatBuilder(RandomOpsClass) {
	  return function (_RandomOpsClass) {
	    _inherits(_class, _RandomOpsClass);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
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
	  return function (_RandomOpsClass2) {
	    _inherits(_class2, _RandomOpsClass2);

	    function _class2() {
	      _classCallCheck(this, _class2);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
	    }

	    _createClass(_class2, [{
	      key: "compatRandomIntegerCalculation",
	      value: function compatRandomIntegerCalculation(minVal, maxVal) {
	        return (this.getHash() + minVal) % (maxVal - minVal + 1);
	      }
	    }, {
	      key: "simpleExecute",
	      value: function simpleExecute() {
	        var minVal = this.getArgNumber('min');
	        var maxVal = this.getArgNumber('max');
	        return this.compatRandomIntegerCalculation(minVal, maxVal);
	      }
	    }]);

	    return _class2;
	  }(RandomOpsClass);
	};

	var BernoulliTrialBuilder = function BernoulliTrialBuilder(RandomOpsClass) {
	  return function (_RandomOpsClass3) {
	    _inherits(_class3, _RandomOpsClass3);

	    function _class3() {
	      _classCallCheck(this, _class3);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).apply(this, arguments));
	    }

	    _createClass(_class3, [{
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
	  return function (_RandomOpsClass4) {
	    _inherits(_class4, _RandomOpsClass4);

	    function _class4() {
	      _classCallCheck(this, _class4);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).apply(this, arguments));
	    }

	    _createClass(_class4, [{
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
	  return function (_OpRandomClass) {
	    _inherits(_class5, _OpRandomClass);

	    function _class5() {
	      _classCallCheck(this, _class5);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class5).apply(this, arguments));
	    }

	    _createClass(_class5, [{
	      key: "compatRandomIndexCalculation",
	      value: function compatRandomIndexCalculation(choices) {
	        return this.getHash() % choices.length;
	      }
	    }, {
	      key: "simpleExecute",
	      value: function simpleExecute() {
	        var choices = this.getArgList('choices');
	        if (choices.length === 0) {
	          return [];
	        }
	        var randIndex = this.compatRandomIndexCalculation(choices);
	        return choices[randIndex];
	      }
	    }]);

	    return _class5;
	  }(OpRandomClass);
	};

	var WeightedChoiceBuilder = function WeightedChoiceBuilder(RandomOpsClass) {
	  return function (_RandomOpsClass5) {
	    _inherits(_class6, _RandomOpsClass5);

	    function _class6() {
	      _classCallCheck(this, _class6);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class6).apply(this, arguments));
	    }

	    _createClass(_class6, [{
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
	        return (0, _utils.reduce)(cumWeights, function (retVal, curVal, i) {
	          if (retVal) {
	            return retVal;
	          }
	          if (stopVal <= curVal) {
	            return choices[i];
	          }
	          return retVal;
	        }, null);
	      }
	    }]);

	    return _class6;
	  }(RandomOpsClass);
	};

	var SampleBuilder = function SampleBuilder(RandomOpsClass) {
	  return function (_RandomOpsClass6) {
	    _inherits(_class7, _RandomOpsClass6);

	    function _class7() {
	      _classCallCheck(this, _class7);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class7).apply(this, arguments));
	    }

	    _createClass(_class7, [{
	      key: "compatSampleIndexCalculation",
	      value: function compatSampleIndexCalculation(i) {
	        return this.getHash(i) % (i + 1);
	      }
	    }, {
	      key: "compatAllowSampleStoppingPoint",
	      value: function compatAllowSampleStoppingPoint() {
	        return true;
	      }
	    }, {
	      key: "sample",
	      value: function sample(array, numDraws) {
	        var len = array.length;
	        var stoppingPoint = len - numDraws;
	        var allowStoppingPoint = this.compatAllowSampleStoppingPoint();

	        for (var i = len - 1; i > 0; i--) {
	          var j = this.compatSampleIndexCalculation(i);

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
	        var choices = (0, _utils.shallowCopy)(this.getArgList('choices'));
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

	exports.default = {
	  PlanOutOpRandom: PlanOutOpRandom,
	  SampleBuilder: SampleBuilder,
	  Sample: SampleBuilder(PlanOutOpRandom),
	  WeightedChoiceBuilder: WeightedChoiceBuilder,
	  WeightedChoice: WeightedChoiceBuilder(PlanOutOpRandom),
	  UniformChoiceBuilder: UniformChoiceBuilder,
	  UniformChoice: UniformChoiceBuilder(PlanOutOpRandom),
	  BernoulliFilterBuilder: BernoulliFilterBuilder,
	  BernoulliFilter: BernoulliFilterBuilder(PlanOutOpRandom),
	  BernoulliTrialBuilder: BernoulliTrialBuilder,
	  BernoulliTrial: BernoulliTrialBuilder(PlanOutOpRandom),
	  RandomIntegerBuilder: RandomIntegerBuilder,
	  RandomInteger: RandomIntegerBuilder(PlanOutOpRandom),
	  RandomFloatBuilder: RandomFloatBuilder,
	  RandomFloat: RandomFloatBuilder(PlanOutOpRandom)
	};
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PlanOutOpUnary = exports.PlanOutOpBinary = exports.PlanOutOpCommutative = exports.PlanOutOpSimple = exports.PlanOutOp = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(5);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlanOutOp = function () {
	  function PlanOutOp(args) {
	    _classCallCheck(this, PlanOutOp);

	    this.args = args;
	  }

	  _createClass(PlanOutOp, [{
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

	var PlanOutOpSimple = function (_PlanOutOp) {
	  _inherits(PlanOutOpSimple, _PlanOutOp);

	  function PlanOutOpSimple() {
	    _classCallCheck(this, PlanOutOpSimple);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlanOutOpSimple).apply(this, arguments));
	  }

	  _createClass(PlanOutOpSimple, [{
	    key: "execute",
	    value: function execute(mapper) {
	      this.mapper = mapper;
	      var self = this;
	      (0, _utils.forEach)(Object.keys(this.args), function (key) {
	        self.args[key] = mapper.evaluate(self.args[key]);
	      });
	      return this.simpleExecute();
	    }
	  }]);

	  return PlanOutOpSimple;
	}(PlanOutOp);

	var PlanOutOpUnary = function (_PlanOutOpSimple) {
	  _inherits(PlanOutOpUnary, _PlanOutOpSimple);

	  function PlanOutOpUnary() {
	    _classCallCheck(this, PlanOutOpUnary);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlanOutOpUnary).apply(this, arguments));
	  }

	  _createClass(PlanOutOpUnary, [{
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

	var PlanOutOpBinary = function (_PlanOutOpSimple2) {
	  _inherits(PlanOutOpBinary, _PlanOutOpSimple2);

	  function PlanOutOpBinary() {
	    _classCallCheck(this, PlanOutOpBinary);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlanOutOpBinary).apply(this, arguments));
	  }

	  _createClass(PlanOutOpBinary, [{
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

	var PlanOutOpCommutative = function (_PlanOutOpSimple3) {
	  _inherits(PlanOutOpCommutative, _PlanOutOpSimple3);

	  function PlanOutOpCommutative() {
	    _classCallCheck(this, PlanOutOpCommutative);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlanOutOpCommutative).apply(this, arguments));
	  }

	  _createClass(PlanOutOpCommutative, [{
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

	exports.PlanOutOp = PlanOutOp;
	exports.PlanOutOpSimple = PlanOutOpSimple;
	exports.PlanOutOpCommutative = PlanOutOpCommutative;
	exports.PlanOutOpBinary = PlanOutOpBinary;
	exports.PlanOutOpUnary = PlanOutOpUnary;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	  if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    newObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
	    for (var i in obj) {
	      newObj[i] = deepCopy(obj[i]);
	    }
	  }
	  return newObj;
	};

	var isObject = function isObject(obj) {
	  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
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
	};

	//extend helpers

	var keys = function keys(obj) {
	  if (!isObject(obj)) return [];
	  if (Object.keys) return Object.keys(obj);
	  var keys = [];
	  for (var key in obj) {
	    if (has(obj, key)) keys.push(key);
	  }if (hasEnumBug) collectNonEnumProps(obj, keys);

	  return keys;
	};

	var allKeys = function allKeys(obj) {
	  if (!isObject(obj)) return [];
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }if (hasEnumBug) collectNonEnumProps(obj, keys);

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
	};

	//extend functionality from underscore
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
	};

	//from underscore
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
	};

	//map functionality from underscore
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
	};

	//reduce functionality from underscore
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
	};

	//clone functionality from underscore
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
	var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
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

	exports.default = { deepCopy: deepCopy, map: map, reduce: reduce, getParameterByName: getParameterByName, forEach: forEach, isFunction: isFunction, trimTrailingWhitespace: trimTrailingWhitespace, hasKey: hasKey, shallowCopy: shallowCopy, extend: extend, isObject: isObject, isArray: isArray, range: range };
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  var crypt = __webpack_require__(7),
	      utf8 = __webpack_require__(8).utf8,
	      bin = __webpack_require__(8).bin,

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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assignment = __webpack_require__(2);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _utils = __webpack_require__(10);

	var _utils2 = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interpreter = function () {
	  function Interpreter(serialization) {
	    var experimentSalt = arguments.length <= 1 || arguments[1] === undefined ? 'global_salt' : arguments[1];
	    var inputs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var environment = arguments[3];

	    _classCallCheck(this, Interpreter);

	    this._serialization = serialization;
	    if (!environment) {
	      this._env = new _assignment2.default(experimentSalt);
	    } else {
	      this._env = environment;
	    }
	    this.experimentSalt = this._experimentSalt = experimentSalt;
	    this._evaluated = false;
	    this._inExperiment = false;
	    this._inputs = (0, _utils2.shallowCopy)(inputs);
	  }

	  _createClass(Interpreter, [{
	    key: 'inExperiment',
	    value: function inExperiment() {
	      return this._inExperiment;
	    }
	  }, {
	    key: 'setEnv',
	    value: function setEnv(newEnv) {
	      this._env = (0, _utils2.deepCopy)(newEnv);
	      return this;
	    }
	  }, {
	    key: 'has',
	    value: function has(name) {
	      return this._env[name];
	    }
	  }, {
	    key: 'get',
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
	    key: 'getParams',
	    value: function getParams() {
	      if (!this._evaluated) {
	        try {
	          this.evaluate(this._serialization);
	        } catch (err) {
	          if (err instanceof _utils.StopPlanOutException) {
	            this._inExperiment = err.inExperiment;
	          }
	        }
	        this._evaluated = true;
	      }
	      return this._env.getParams();
	    }
	  }, {
	    key: 'set',
	    value: function set(name, value) {
	      this._env.set(name, value);
	      return this;
	    }
	  }, {
	    key: 'getSaltSeparator',
	    value: function getSaltSeparator() {
	      return this._env.saltSeparator;
	    }
	  }, {
	    key: 'setOverrides',
	    value: function setOverrides(overrides) {
	      this._env.setOverrides(overrides);
	      return this;
	    }
	  }, {
	    key: 'getOverrides',
	    value: function getOverrides() {
	      return this._env.getOverrides();
	    }
	  }, {
	    key: 'hasOverride',
	    value: function hasOverride(name) {
	      var overrides = this.getOverrides();
	      return overrides && overrides[name] !== undefined;
	    }
	  }, {
	    key: 'registerCustomOperators',
	    value: function registerCustomOperators(operators) {
	      (0, _utils.registerOperators)(operators);
	    }
	  }, {
	    key: 'evaluate',
	    value: function evaluate(planoutCode) {
	      if ((0, _utils2.isObject)(planoutCode) && planoutCode.op) {
	        return (0, _utils.operatorInstance)(planoutCode).execute(this);
	      } else if ((0, _utils2.isArray)(planoutCode)) {
	        var self = this;
	        return (0, _utils2.map)(planoutCode, function (obj) {
	          return self.evaluate(obj);
	        });
	      } else {
	        return planoutCode;
	      }
	    }
	  }]);

	  return Interpreter;
	}();

	exports.default = Interpreter;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerOperators = exports.StopPlanOutException = exports.operatorInstance = exports.isOperator = exports.initFactory = exports.operators = undefined;

	var _core = __webpack_require__(11);

	var core = _interopRequireWildcard(_core);

	var _random = __webpack_require__(3);

	var random = _interopRequireWildcard(_random);

	var _utils = __webpack_require__(5);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var initFactory = function initFactory() {
	  return {
	    'literal': core.Literal,
	    'get': core.Get,
	    'set': core.Set,
	    'seq': core.Seq,
	    'return': core.Return,
	    'index': core.Index,
	    'array': core.Arr,
	    'equals': core.Equals,
	    'and': core.And,
	    'or': core.Or,
	    ">": core.GreaterThan,
	    "<": core.LessThan,
	    ">=": core.GreaterThanOrEqualTo,
	    "<=": core.LessThanOrEqualTo,
	    "%": core.Mod,
	    "/": core.Divide,
	    "not": core.Not,
	    "round": core.Round,
	    "negative": core.Negative,
	    "min": core.Min,
	    "max": core.Max,
	    "length": core.Length,
	    "coalesce": core.Coalesce,
	    "map": core.Map,
	    "cond": core.Cond,
	    "product": core.Product,
	    "sum": core.Sum,
	    "randomFloat": random.RandomFloat,
	    "randomInteger": random.RandomInteger,
	    "bernoulliTrial": random.BernoulliTrial,
	    "bernoulliFilter": random.BernoulliFilter,
	    "uniformChoice": random.UniformChoice,
	    "weightedChoice": random.WeightedChoice,
	    "sample": random.Sample
	  };
	};

	var operators = initFactory();

	var isOperator = function isOperator(op) {
	  return (0, _utils.isObject)(op) && op.op;
	};

	var operatorInstance = function operatorInstance(params) {
	  var op = params.op;
	  if (!operators[op]) {
	    throw 'Unknown Operator ' + op;
	  }

	  return new operators[op](params);
	};

	var registerOperators = function registerOperators(ops) {
	  (0, _utils.forEach)(ops, function (value, op) {
	    if (operators[op]) {
	      throw op + ' already is defined';
	    } else {
	      operators[op] = value;
	    }
	  });
	};

	var StopPlanOutException = function StopPlanOutException(inExperiment) {
	  _classCallCheck(this, StopPlanOutException);

	  this.inExperiment = inExperiment;
	};

	exports.operators = operators;
	exports.initFactory = initFactory;
	exports.isOperator = isOperator;
	exports.operatorInstance = operatorInstance;
	exports.StopPlanOutException = StopPlanOutException;
	exports.registerOperators = registerOperators;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Return = exports.Length = exports.Max = exports.Min = exports.Negative = exports.Not = exports.Round = exports.Divide = exports.Mod = exports.GreaterThanOrEqualTo = exports.LessThanOrEqualTo = exports.LessThan = exports.GreaterThan = exports.Equals = exports.Sum = exports.Product = exports.Or = exports.And = exports.Cond = exports.Index = exports.Coalesce = exports.Map = exports.Arr = exports.Set = exports.Seq = exports.Get = exports.Literal = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(4);

	var _utils = __webpack_require__(10);

	var _utils2 = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Literal = function (_PlanOutOp) {
	  _inherits(Literal, _PlanOutOp);

	  function Literal() {
	    _classCallCheck(this, Literal);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Literal).apply(this, arguments));
	  }

	  _createClass(Literal, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return this.getArgMixed('value');
	    }
	  }]);

	  return Literal;
	}(_base.PlanOutOp);

	var Get = function (_PlanOutOp2) {
	  _inherits(Get, _PlanOutOp2);

	  function Get() {
	    _classCallCheck(this, Get);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Get).apply(this, arguments));
	  }

	  _createClass(Get, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return mapper.get(this.getArgString('var'));
	    }
	  }]);

	  return Get;
	}(_base.PlanOutOp);

	var Seq = function (_PlanOutOp3) {
	  _inherits(Seq, _PlanOutOp3);

	  function Seq() {
	    _classCallCheck(this, Seq);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Seq).apply(this, arguments));
	  }

	  _createClass(Seq, [{
	    key: "execute",
	    value: function execute(mapper) {
	      (0, _utils2.forEach)(this.getArgList('seq'), function (op) {
	        mapper.evaluate(op);
	      });
	    }
	  }]);

	  return Seq;
	}(_base.PlanOutOp);

	var Return = function (_PlanOutOp4) {
	  _inherits(Return, _PlanOutOp4);

	  function Return() {
	    _classCallCheck(this, Return);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Return).apply(this, arguments));
	  }

	  _createClass(Return, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var value = mapper.evaluate(this.getArgMixed('value'));
	      var inExperiment = false;
	      if (value) {
	        inExperiment = true;
	      }
	      throw new _utils.StopPlanOutException(inExperiment);
	    }
	  }]);

	  return Return;
	}(_base.PlanOutOp);

	var Set = function (_PlanOutOp5) {
	  _inherits(Set, _PlanOutOp5);

	  function Set() {
	    _classCallCheck(this, Set);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Set).apply(this, arguments));
	  }

	  _createClass(Set, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var variable = this.getArgString('var');
	      var value = this.getArgMixed('value');
	      if (mapper.hasOverride(variable)) {
	        return;
	      }

	      if ((0, _utils.isOperator)(value) && !value.salt) {
	        value.salt = variable;
	      }

	      if (variable == "experimentSalt") {
	        mapper.experimentSalt = value;
	      }
	      mapper.set(variable, mapper.evaluate(value));
	    }
	  }]);

	  return Set;
	}(_base.PlanOutOp);

	var Arr = function (_PlanOutOp6) {
	  _inherits(Arr, _PlanOutOp6);

	  function Arr() {
	    _classCallCheck(this, Arr);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Arr).apply(this, arguments));
	  }

	  _createClass(Arr, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return (0, _utils2.map)(this.getArgList('values'), function (value) {
	        return mapper.evaluate(value);
	      });
	    }
	  }]);

	  return Arr;
	}(_base.PlanOutOp);

	var Coalesce = function (_PlanOutOp7) {
	  _inherits(Coalesce, _PlanOutOp7);

	  function Coalesce() {
	    _classCallCheck(this, Coalesce);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Coalesce).apply(this, arguments));
	  }

	  _createClass(Coalesce, [{
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
	}(_base.PlanOutOp);

	var Index = function (_PlanOutOpSimple) {
	  _inherits(Index, _PlanOutOpSimple);

	  function Index() {
	    _classCallCheck(this, Index);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
	  }

	  _createClass(Index, [{
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
	}(_base.PlanOutOpSimple);

	var Cond = function (_PlanOutOp8) {
	  _inherits(Cond, _PlanOutOp8);

	  function Cond() {
	    _classCallCheck(this, Cond);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Cond).apply(this, arguments));
	  }

	  _createClass(Cond, [{
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
	}(_base.PlanOutOp);

	var And = function (_PlanOutOp9) {
	  _inherits(And, _PlanOutOp9);

	  function And() {
	    _classCallCheck(this, And);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(And).apply(this, arguments));
	  }

	  _createClass(And, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return (0, _utils2.reduce)(this.getArgList('values'), function (ret, clause) {
	        if (!ret) {
	          return ret;
	        }

	        return Boolean(mapper.evaluate(clause));
	      }, true);
	    }
	  }]);

	  return And;
	}(_base.PlanOutOp);

	var Or = function (_PlanOutOp10) {
	  _inherits(Or, _PlanOutOp10);

	  function Or() {
	    _classCallCheck(this, Or);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Or).apply(this, arguments));
	  }

	  _createClass(Or, [{
	    key: "execute",
	    value: function execute(mapper) {
	      return (0, _utils2.reduce)(this.getArgList('values'), function (ret, clause) {
	        if (ret) {
	          return ret;
	        }

	        return Boolean(mapper.evaluate(clause));
	      }, false);
	    }
	  }]);

	  return Or;
	}(_base.PlanOutOp);

	var Product = function (_PlanOutOpCommutative) {
	  _inherits(Product, _PlanOutOpCommutative);

	  function Product() {
	    _classCallCheck(this, Product);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Product).apply(this, arguments));
	  }

	  _createClass(Product, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return (0, _utils2.reduce)(values, function (memo, value) {
	        return memo * value;
	      }, 1);
	    }
	  }]);

	  return Product;
	}(_base.PlanOutOpCommutative);

	var Sum = function (_PlanOutOpCommutative2) {
	  _inherits(Sum, _PlanOutOpCommutative2);

	  function Sum() {
	    _classCallCheck(this, Sum);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sum).apply(this, arguments));
	  }

	  _createClass(Sum, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return (0, _utils2.reduce)(values, function (memo, value) {
	        return memo + value;
	      }, 0);
	    }
	  }]);

	  return Sum;
	}(_base.PlanOutOpCommutative);

	var Equals = function (_PlanOutOpBinary) {
	  _inherits(Equals, _PlanOutOpBinary);

	  function Equals() {
	    _classCallCheck(this, Equals);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Equals).apply(this, arguments));
	  }

	  _createClass(Equals, [{
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
	}(_base.PlanOutOpBinary);

	var GreaterThan = function (_PlanOutOpBinary2) {
	  _inherits(GreaterThan, _PlanOutOpBinary2);

	  function GreaterThan() {
	    _classCallCheck(this, GreaterThan);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GreaterThan).apply(this, arguments));
	  }

	  _createClass(GreaterThan, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left > right;
	    }
	  }]);

	  return GreaterThan;
	}(_base.PlanOutOpBinary);

	var LessThan = function (_PlanOutOpBinary3) {
	  _inherits(LessThan, _PlanOutOpBinary3);

	  function LessThan() {
	    _classCallCheck(this, LessThan);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LessThan).apply(this, arguments));
	  }

	  _createClass(LessThan, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left < right;
	    }
	  }]);

	  return LessThan;
	}(_base.PlanOutOpBinary);

	var LessThanOrEqualTo = function (_PlanOutOpBinary4) {
	  _inherits(LessThanOrEqualTo, _PlanOutOpBinary4);

	  function LessThanOrEqualTo() {
	    _classCallCheck(this, LessThanOrEqualTo);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LessThanOrEqualTo).apply(this, arguments));
	  }

	  _createClass(LessThanOrEqualTo, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left <= right;
	    }
	  }]);

	  return LessThanOrEqualTo;
	}(_base.PlanOutOpBinary);

	var GreaterThanOrEqualTo = function (_PlanOutOpBinary5) {
	  _inherits(GreaterThanOrEqualTo, _PlanOutOpBinary5);

	  function GreaterThanOrEqualTo() {
	    _classCallCheck(this, GreaterThanOrEqualTo);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GreaterThanOrEqualTo).apply(this, arguments));
	  }

	  _createClass(GreaterThanOrEqualTo, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left >= right;
	    }
	  }]);

	  return GreaterThanOrEqualTo;
	}(_base.PlanOutOpBinary);

	var Mod = function (_PlanOutOpBinary6) {
	  _inherits(Mod, _PlanOutOpBinary6);

	  function Mod() {
	    _classCallCheck(this, Mod);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Mod).apply(this, arguments));
	  }

	  _createClass(Mod, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return left % right;
	    }
	  }]);

	  return Mod;
	}(_base.PlanOutOpBinary);

	var Divide = function (_PlanOutOpBinary7) {
	  _inherits(Divide, _PlanOutOpBinary7);

	  function Divide() {
	    _classCallCheck(this, Divide);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Divide).apply(this, arguments));
	  }

	  _createClass(Divide, [{
	    key: "binaryExecute",
	    value: function binaryExecute(left, right) {
	      return parseFloat(left) / parseFloat(right);
	    }
	  }]);

	  return Divide;
	}(_base.PlanOutOpBinary);

	var Round = function (_PlanOutOpUnary) {
	  _inherits(Round, _PlanOutOpUnary);

	  function Round() {
	    _classCallCheck(this, Round);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Round).apply(this, arguments));
	  }

	  _createClass(Round, [{
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      return Math.round(value);
	    }
	  }]);

	  return Round;
	}(_base.PlanOutOpUnary);

	var Not = function (_PlanOutOpUnary2) {
	  _inherits(Not, _PlanOutOpUnary2);

	  function Not() {
	    _classCallCheck(this, Not);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Not).apply(this, arguments));
	  }

	  _createClass(Not, [{
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
	}(_base.PlanOutOpUnary);

	var Negative = function (_PlanOutOpUnary3) {
	  _inherits(Negative, _PlanOutOpUnary3);

	  function Negative() {
	    _classCallCheck(this, Negative);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Negative).apply(this, arguments));
	  }

	  _createClass(Negative, [{
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
	}(_base.PlanOutOpUnary);

	var Min = function (_PlanOutOpCommutative3) {
	  _inherits(Min, _PlanOutOpCommutative3);

	  function Min() {
	    _classCallCheck(this, Min);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Min).apply(this, arguments));
	  }

	  _createClass(Min, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return Math.min.apply(null, values);
	    }
	  }]);

	  return Min;
	}(_base.PlanOutOpCommutative);

	var Max = function (_PlanOutOpCommutative4) {
	  _inherits(Max, _PlanOutOpCommutative4);

	  function Max() {
	    _classCallCheck(this, Max);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Max).apply(this, arguments));
	  }

	  _createClass(Max, [{
	    key: "commutativeExecute",
	    value: function commutativeExecute(values) {
	      return Math.max.apply(null, values);
	    }
	  }]);

	  return Max;
	}(_base.PlanOutOpCommutative);

	var Length = function (_PlanOutOpUnary4) {
	  _inherits(Length, _PlanOutOpUnary4);

	  function Length() {
	    _classCallCheck(this, Length);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Length).apply(this, arguments));
	  }

	  _createClass(Length, [{
	    key: "unaryExecute",
	    value: function unaryExecute(value) {
	      return value.length;
	    }
	  }]);

	  return Length;
	}(_base.PlanOutOpUnary);

	var Map = function (_PlanOutOpSimple2) {
	  _inherits(Map, _PlanOutOpSimple2);

	  function Map() {
	    _classCallCheck(this, Map);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Map).apply(this, arguments));
	  }

	  _createClass(Map, [{
	    key: "simpleExecute",
	    value: function simpleExecute() {
	      var copy = (0, _utils2.deepCopy)(this.args);
	      delete copy.op;
	      delete copy.salt;
	      return copy;
	    }
	  }]);

	  return Map;
	}(_base.PlanOutOpSimple);

	exports.Literal = Literal;
	exports.Get = Get;
	exports.Seq = Seq;
	exports.Set = Set;
	exports.Arr = Arr;
	exports.Map = Map;
	exports.Coalesce = Coalesce;
	exports.Index = Index;
	exports.Cond = Cond;
	exports.And = And;
	exports.Or = Or;
	exports.Product = Product;
	exports.Sum = Sum;
	exports.Equals = Equals;
	exports.GreaterThan = GreaterThan;
	exports.LessThan = LessThan;
	exports.LessThanOrEqualTo = LessThanOrEqualTo;
	exports.GreaterThanOrEqualTo = GreaterThanOrEqualTo;
	exports.Mod = Mod;
	exports.Divide = Divide;
	exports.Round = Round;
	exports.Not = Not;
	exports.Negative = Negative;
	exports.Min = Min;
	exports.Max = Max;
	exports.Length = Length;
	exports.Return = Return;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SimpleNamespace = exports.Namespace = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _experiment = __webpack_require__(1);

	var _experiment2 = _interopRequireDefault(_experiment);

	var _assignment = __webpack_require__(2);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _random = __webpack_require__(3);

	var _utils = __webpack_require__(5);

	var _experimentSetup = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DefaultExperiment = function (_Experiment) {
	  _inherits(DefaultExperiment, _Experiment);

	  function DefaultExperiment() {
	    _classCallCheck(this, DefaultExperiment);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DefaultExperiment).apply(this, arguments));
	  }

	  _createClass(DefaultExperiment, [{
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
	}(_experiment2.default);

	var Namespace = function () {
	  function Namespace() {
	    _classCallCheck(this, Namespace);
	  }

	  _createClass(Namespace, [{
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

	var SimpleNamespace = function (_Namespace) {
	  _inherits(SimpleNamespace, _Namespace);

	  function SimpleNamespace(args) {
	    _classCallCheck(this, SimpleNamespace);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleNamespace).call(this, args));

	    _this2.name = _this2.getDefaultNamespaceName();
	    _this2.inputs = args || {};
	    _this2.numSegments = 1;
	    _this2.segmentAllocations = {};
	    _this2.currentExperiments = {};

	    _this2._experiment = null;
	    _this2._defaultExperiment = null;
	    _this2.defaultExperimentClass = DefaultExperiment;
	    _this2._inExperiment = false;

	    _this2.setupDefaults();
	    _this2.setup();
	    _this2.availableSegments = (0, _utils.range)(_this2.numSegments);

	    _this2.setupExperiments();
	    return _this2;
	  }

	  _createClass(SimpleNamespace, [{
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
	      var a = new _assignment2.default(this.name);
	      a.set('sampled_segments', new _random.Sample({ 'choices': this.availableSegments, 'draws': segments, 'unit': name }));
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
	      var _this3 = this;

	      if (this.currentExperiments[name] === undefined) {
	        return false;
	      }

	      (0, _utils.forEach)(Object.keys(this.segmentAllocations), function (cur) {
	        if (_this3.segmentAllocations[cur] === name) {
	          delete _this3.segmentAllocations[cur];
	          _this3.availableSegments.push(cur);
	        }
	      });

	      delete this.currentExperiments[name];
	      return true;
	    }
	  }, {
	    key: "getSegment",
	    value: function getSegment() {
	      var a = new _assignment2.default(this.name);
	      var segment = new _random.RandomInteger({ 'min': 0, 'max': this.numSegments - 1, 'unit': this.inputs[this.getPrimaryUnit()] });
	      a.set('segment', segment);
	      return a.get('segment');
	    }
	  }, {
	    key: "_assignExperiment",
	    value: function _assignExperiment() {
	      this.inputs = (0, _utils.extend)(this.inputs, (0, _experimentSetup.getExperimentInputs)(this.getName()));
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
	      experiment.setName(this.getName() + "-" + experimentName);
	      experiment.setSalt(this.getName() + "-" + experimentName);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireDefaultExperiment", this).call(this);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      if (globalOverrides && (0, _utils.hasKey)(globalOverrides, name)) {
	        var overrides = globalOverrides[name];
	        if (overrides && (0, _utils.hasKey)(this.currentExperiments, overrides.experimentName)) {
	          this._assignExperimentObject(overrides.experimentName);
	          this._experiment.addOverride(name, overrides.value);
	        }
	      }
	    }
	  }, {
	    key: "setLocalOverride",
	    value: function setLocalOverride(name) {
	      var experimentName = (0, _utils.getParameterByName)('experimentOverride');
	      if (experimentName && (0, _utils.hasKey)(this.currentExperiments, experimentName)) {
	        this._assignExperimentObject(experimentName);
	        if ((0, _utils.getParameterByName)(name)) {
	          this._experiment.addOverride(name, (0, _utils.getParameterByName)(name));
	        }
	      }
	    }
	  }, {
	    key: "getParams",
	    value: function getParams(experimentName) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
	      if (!this._experiment) {
	        return;
	      }
	      this._experiment.logExposure(extras);
	    }
	  }, {
	    key: "logEvent",
	    value: function logEvent(eventType, extras) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
	      if (!this._experiment) {
	        return;
	      }
	      this._experiment.logEvent(eventType, extras);
	    }

	    //helper function to return the class name of the current experiment class

	  }, {
	    key: "getDefaultNamespaceName",
	    value: function getDefaultNamespaceName() {
	      if ((0, _utils.isObject)(this) && this.constructor && this !== this.window) {
	        var arr = this.constructor.toString().match(/function\s*(\w+)/);
	        if (arr && arr.length === 2) {
	          return arr[1];
	        }
	      }
	      return "GenericNamespace";
	    }
	  }]);

	  return SimpleNamespace;
	}(Namespace);

	exports.Namespace = Namespace;
	exports.SimpleNamespace = SimpleNamespace;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(5);

	var globalInputArgs = {};
	var experimentSpecificInputArgs = {};

	var fetchInputs = function fetchInputs(args) {
	  if (!args) {
	    return {};
	  }

	  return resolveArgs((0, _utils.shallowCopy)(args));
	};

	var resolveArgs = function resolveArgs(args) {
	  (0, _utils.forEach)(Object.keys(args), function (key) {
	    if ((0, _utils.isFunction)(args[key])) {
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
	    return (0, _utils.extend)(inputArgs, fetchInputs(experimentSpecificInputArgs[experimentName]));
	  }
	  return inputArgs;
	};

	exports.default = { registerExperimentInput: registerExperimentInput, getExperimentInputs: getExperimentInputs };
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _random = __webpack_require__(3);

	var _bignumber = __webpack_require__(15);

	var _bignumber2 = _interopRequireDefault(_bignumber);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlanOutOpRandomCoreCompatible = function (_PlanOutOpRandom) {
	  _inherits(PlanOutOpRandomCoreCompatible, _PlanOutOpRandom);

	  function PlanOutOpRandomCoreCompatible(args) {
	    _classCallCheck(this, PlanOutOpRandomCoreCompatible);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlanOutOpRandomCoreCompatible).call(this, args));

	    _this.LONG_SCALE = new _bignumber2.default("FFFFFFFFFFFFFFF", 16);
	    return _this;
	  }

	  _createClass(PlanOutOpRandomCoreCompatible, [{
	    key: "compatHashCalculation",
	    value: function compatHashCalculation(hash) {
	      return new _bignumber2.default(hash.substr(0, 15), 16);
	    }
	  }, {
	    key: "compatZeroToOneCalculation",
	    value: function compatZeroToOneCalculation(appendedUnit) {
	      return this.getHash(appendedUnit).dividedBy(this.LONG_SCALE).toNumber();
	    }
	  }]);

	  return PlanOutOpRandomCoreCompatible;
	}(_random.PlanOutOpRandom);

	var RandomIntegerCoreCompatible = function (_RandomIntegerBuilder) {
	  _inherits(RandomIntegerCoreCompatible, _RandomIntegerBuilder);

	  function RandomIntegerCoreCompatible() {
	    _classCallCheck(this, RandomIntegerCoreCompatible);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RandomIntegerCoreCompatible).apply(this, arguments));
	  }

	  _createClass(RandomIntegerCoreCompatible, [{
	    key: "compatRandomIntegerCalculation",
	    value: function compatRandomIntegerCalculation(minVal, maxVal) {
	      return this.getHash().plus(minVal).modulo(maxVal - minVal + 1).toNumber();
	    }
	  }]);

	  return RandomIntegerCoreCompatible;
	}((0, _random.RandomIntegerBuilder)(PlanOutOpRandomCoreCompatible));

	var UniformChoiceCoreCompatible = function (_UniformChoiceBuilder) {
	  _inherits(UniformChoiceCoreCompatible, _UniformChoiceBuilder);

	  function UniformChoiceCoreCompatible() {
	    _classCallCheck(this, UniformChoiceCoreCompatible);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(UniformChoiceCoreCompatible).apply(this, arguments));
	  }

	  _createClass(UniformChoiceCoreCompatible, [{
	    key: "compatRandomIndexCalculation",
	    value: function compatRandomIndexCalculation(choices) {
	      return this.getHash().modulo(choices.length).toNumber();
	    }
	  }]);

	  return UniformChoiceCoreCompatible;
	}((0, _random.UniformChoiceBuilder)(PlanOutOpRandomCoreCompatible));

	var SampleCoreCompatible = function (_SampleBuilder) {
	  _inherits(SampleCoreCompatible, _SampleBuilder);

	  function SampleCoreCompatible() {
	    _classCallCheck(this, SampleCoreCompatible);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SampleCoreCompatible).apply(this, arguments));
	  }

	  _createClass(SampleCoreCompatible, [{
	    key: "compatSampleIndexCalculation",
	    value: function compatSampleIndexCalculation(i) {
	      return this.getHash(i).modulo(i + 1).toNumber();
	    }
	  }, {
	    key: "compatAllowSampleStoppingPoint",
	    value: function compatAllowSampleStoppingPoint() {
	      return false;
	    }
	  }]);

	  return SampleCoreCompatible;
	}((0, _random.SampleBuilder)(PlanOutOpRandomCoreCompatible));

	exports.default = {
	  PlanOutOpRandom: PlanOutOpRandomCoreCompatible,
	  Sample: SampleCoreCompatible,
	  WeightedChoice: (0, _random.WeightedChoiceBuilder)(PlanOutOpRandomCoreCompatible),
	  UniformChoice: UniformChoiceCoreCompatible,
	  BernoulliFilter: (0, _random.BernoulliFilterBuilder)(PlanOutOpRandomCoreCompatible),
	  BernoulliTrial: (0, _random.BernoulliTrialBuilder)(PlanOutOpRandomCoreCompatible),
	  RandomInteger: RandomIntegerCoreCompatible,
	  RandomFloat: (0, _random.RandomFloatBuilder)(PlanOutOpRandomCoreCompatible)
	};
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v2.0.7 https://github.com/MikeMcl/bignumber.js/LICENCE */

	;(function (global) {
	    'use strict';

	    /*
	      bignumber.js v2.0.7
	      A JavaScript library for arbitrary-precision arithmetic.
	      https://github.com/MikeMcl/bignumber.js
	      Copyright (c) 2015 Michael Mclaughlin <M8ch88l@gmail.com>
	      MIT Expat Licence
	    */


	    var BigNumber, crypto, parseNumeric,
	        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        mathceil = Math.ceil,
	        mathfloor = Math.floor,
	        notBool = ' not a boolean or binary digit',
	        roundingMode = 'rounding mode',
	        tooManyDigits = 'number type has more than 15 significant digits',
	        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
	        BASE = 1e14,
	        LOG_BASE = 14,
	        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	        SQRT_BASE = 1e7,

	        /*
	         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
	         * exception is thrown (if ERRORS is true).
	         */
	        MAX = 1E9;                                   // 0 to MAX_INT32


	    /*
	     * Create and return a BigNumber constructor.
	     */
	    function another(configObj) {
	        var div,

	            // id tracks the caller function, so its name can be included in error messages.
	            id = 0,
	            P = BigNumber.prototype,
	            ONE = new BigNumber(1),


	            /********************************* EDITABLE DEFAULTS **********************************/


	            /*
	             * The default values below must be integers within the inclusive ranges stated.
	             * The values can also be changed at run-time using BigNumber.config.
	             */

	            // The maximum number of decimal places for operations involving division.
	            DECIMAL_PLACES = 20,                     // 0 to MAX

	            /*
	             * The rounding mode used when rounding to the above decimal places, and when using
	             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
	             * UP         0 Away from zero.
	             * DOWN       1 Towards zero.
	             * CEIL       2 Towards +Infinity.
	             * FLOOR      3 Towards -Infinity.
	             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	             */
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

	            // Whether BigNumber Errors are ever thrown.
	            ERRORS = true,                           // true or false

	            // Change to intValidatorNoErrors if ERRORS is false.
	            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

	            // Whether to use cryptographically-secure random number generation, if available.
	            CRYPTO = false,                          // true or false

	            /*
	             * The modulo mode used when calculating the modulus: a mod n.
	             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	             * The remainder (r) is calculated as: r = a - n * q.
	             *
	             * UP        0 The remainder is positive if the dividend is negative, else is negative.
	             * DOWN      1 The remainder has the same sign as the dividend.
	             *             This modulo mode is commonly known as 'truncated division' and is
	             *             equivalent to (a % n) in JavaScript.
	             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
	             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	             *             The remainder is always positive.
	             *
	             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
	             * modes are commonly used for the modulus operation.
	             * Although the other rounding modes can also be used, they may not give useful results.
	             */
	            MODULO_MODE = 1,                         // 0 to 9

	            // The maximum number of significant digits of the result of the toPower operation.
	            // If POW_PRECISION is 0, there will be unlimited significant digits.
	            POW_PRECISION = 100,                     // 0 to MAX

	            // The format specification used by the BigNumber.prototype.toFormat method.
	            FORMAT = {
	                decimalSeparator: '.',
	                groupSeparator: ',',
	                groupSize: 3,
	                secondaryGroupSize: 0,
	                fractionGroupSeparator: '\xA0',      // non-breaking space
	                fractionGroupSize: 0
	            };


	        /******************************************************************************************/


	        // CONSTRUCTOR


	        /*
	         * The BigNumber constructor and exported function.
	         * Create and return a new instance of a BigNumber object.
	         *
	         * n {number|string|BigNumber} A numeric value.
	         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
	         */
	        function BigNumber( n, b ) {
	            var c, e, i, num, len, str,
	                x = this;

	            // Enable constructor usage without new.
	            if ( !( x instanceof BigNumber ) ) {

	                // 'BigNumber() constructor call without new: {n}'
	                if (ERRORS) raise( 26, 'constructor call without new', n );
	                return new BigNumber( n, b );
	            }

	            // 'new BigNumber() base not an integer: {b}'
	            // 'new BigNumber() base out of range: {b}'
	            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

	                // Duplicate.
	                if ( n instanceof BigNumber ) {
	                    x.s = n.s;
	                    x.e = n.e;
	                    x.c = ( n = n.c ) ? n.slice() : n;
	                    id = 0;
	                    return;
	                }

	                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
	                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

	                    // Fast path for integers.
	                    if ( n === ~~n ) {
	                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
	                        x.e = e;
	                        x.c = [n];
	                        id = 0;
	                        return;
	                    }

	                    str = n + '';
	                } else {
	                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }
	            } else {
	                b = b | 0;
	                str = n + '';

	                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
	                // Allow exponential notation to be used with base 10 argument.
	                if ( b == 10 ) {
	                    x = new BigNumber( n instanceof BigNumber ? n : str );
	                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
	                }

	                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	                // Any number in exponential form will fail due to the [Ee][+-].
	                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
	                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
	                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
	                    return parseNumeric( x, str, num, b );
	                }

	                if (num) {
	                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

	                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

	                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                        raise( id, tooManyDigits, n );
	                    }

	                    // Prevent later check for length on converted number.
	                    num = false;
	                } else {
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }

	                str = convertBase( str, 10, b, x.s );
	            }

	            // Decimal point?
	            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

	            // Exponential form?
	            if ( ( i = str.search( /e/i ) ) > 0 ) {

	                // Determine exponent.
	                if ( e < 0 ) e = i;
	                e += +str.slice( i + 1 );
	                str = str.substring( 0, i );
	            } else if ( e < 0 ) {

	                // Integer.
	                e = str.length;
	            }

	            // Determine leading zeros.
	            for ( i = 0; str.charCodeAt(i) === 48; i++ );

	            // Determine trailing zeros.
	            for ( len = str.length; str.charCodeAt(--len) === 48; );
	            str = str.slice( i, len + 1 );

	            if (str) {
	                len = str.length;

	                // Disallow numbers with over 15 significant digits if number type.
	                // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                if ( num && ERRORS && len > 15 ) raise( id, tooManyDigits, x.s * n );

	                e = e - i - 1;

	                 // Overflow?
	                if ( e > MAX_EXP ) {

	                    // Infinity.
	                    x.c = x.e = null;

	                // Underflow?
	                } else if ( e < MIN_EXP ) {

	                    // Zero.
	                    x.c = [ x.e = 0 ];
	                } else {
	                    x.e = e;
	                    x.c = [];

	                    // Transform base

	                    // e is the base 10 exponent.
	                    // i is where to slice str to get the first element of the coefficient array.
	                    i = ( e + 1 ) % LOG_BASE;
	                    if ( e < 0 ) i += LOG_BASE;

	                    if ( i < len ) {
	                        if (i) x.c.push( +str.slice( 0, i ) );

	                        for ( len -= LOG_BASE; i < len; ) {
	                            x.c.push( +str.slice( i, i += LOG_BASE ) );
	                        }

	                        str = str.slice(i);
	                        i = LOG_BASE - str.length;
	                    } else {
	                        i -= len;
	                    }

	                    for ( ; i--; str += '0' );
	                    x.c.push( +str );
	                }
	            } else {

	                // Zero.
	                x.c = [ x.e = 0 ];
	            }

	            id = 0;
	        }


	        // CONSTRUCTOR PROPERTIES


	        BigNumber.another = another;

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
	         * Accept an object or an argument list, with one or many of the following properties or
	         * parameters respectively:
	         *
	         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
	         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
	         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
	         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
	         *   ERRORS          {boolean|number}   true, false, 1 or 0
	         *   CRYPTO          {boolean|number}   true, false, 1 or 0
	         *   MODULO_MODE     {number}           0 to 9 inclusive
	         *   POW_PRECISION   {number}           0 to MAX inclusive
	         *   FORMAT          {object}           See BigNumber.prototype.toFormat
	         *      decimalSeparator       {string}
	         *      groupSeparator         {string}
	         *      groupSize              {number}
	         *      secondaryGroupSize     {number}
	         *      fractionGroupSeparator {string}
	         *      fractionGroupSize      {number}
	         *
	         * (The values assigned to the above FORMAT object properties are not checked for validity.)
	         *
	         * E.g.
	         * BigNumber.config(20, 4) is equivalent to
	         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	         *
	         * Ignore properties/parameters set to null or undefined.
	         * Return an object with the properties current values.
	         */
	        BigNumber.config = function () {
	            var v, p,
	                i = 0,
	                r = {},
	                a = arguments,
	                o = a[0],
	                has = o && typeof o == 'object'
	                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
	                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

	            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	            // 'config() DECIMAL_PLACES not an integer: {v}'
	            // 'config() DECIMAL_PLACES out of range: {v}'
	            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                DECIMAL_PLACES = v | 0;
	            }
	            r[p] = DECIMAL_PLACES;

	            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	            // 'config() ROUNDING_MODE not an integer: {v}'
	            // 'config() ROUNDING_MODE out of range: {v}'
	            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
	                ROUNDING_MODE = v | 0;
	            }
	            r[p] = ROUNDING_MODE;

	            // EXPONENTIAL_AT {number|number[]}
	            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	            // 'config() EXPONENTIAL_AT not an integer: {v}'
	            // 'config() EXPONENTIAL_AT out of range: {v}'
	            if ( has( p = 'EXPONENTIAL_AT' ) ) {

	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
	                        TO_EXP_NEG = v[0] | 0;
	                        TO_EXP_POS = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
	                }
	            }
	            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

	            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	            // 'config() RANGE not an integer: {v}'
	            // 'config() RANGE cannot be zero: {v}'
	            // 'config() RANGE out of range: {v}'
	            if ( has( p = 'RANGE' ) ) {

	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
	                        MIN_EXP = v[0] | 0;
	                        MAX_EXP = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
	                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
	                }
	            }
	            r[p] = [ MIN_EXP, MAX_EXP ];

	            // ERRORS {boolean|number} true, false, 1 or 0.
	            // 'config() ERRORS not a boolean or binary digit: {v}'
	            if ( has( p = 'ERRORS' ) ) {

	                if ( v === !!v || v === 1 || v === 0 ) {
	                    id = 0;
	                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = ERRORS;

	            // CRYPTO {boolean|number} true, false, 1 or 0.
	            // 'config() CRYPTO not a boolean or binary digit: {v}'
	            // 'config() crypto unavailable: {crypto}'
	            if ( has( p = 'CRYPTO' ) ) {

	                if ( v === !!v || v === 1 || v === 0 ) {
	                    CRYPTO = !!( v && crypto && typeof crypto == 'object' );
	                    if ( v && !CRYPTO && ERRORS ) raise( 2, 'crypto unavailable', crypto );
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = CRYPTO;

	            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	            // 'config() MODULO_MODE not an integer: {v}'
	            // 'config() MODULO_MODE out of range: {v}'
	            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
	                MODULO_MODE = v | 0;
	            }
	            r[p] = MODULO_MODE;

	            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	            // 'config() POW_PRECISION not an integer: {v}'
	            // 'config() POW_PRECISION out of range: {v}'
	            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                POW_PRECISION = v | 0;
	            }
	            r[p] = POW_PRECISION;

	            // FORMAT {object}
	            // 'config() FORMAT not an object: {v}'
	            if ( has( p = 'FORMAT' ) ) {

	                if ( typeof v == 'object' ) {
	                    FORMAT = v;
	                } else if (ERRORS) {
	                    raise( 2, p + ' not an object', v );
	                }
	            }
	            r[p] = FORMAT;

	            return r;
	        };


	        /*
	         * Return a new BigNumber whose value is the maximum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


	        /*
	         * Return a new BigNumber whose value is the minimum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


	        /*
	         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	         * zeros are produced).
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         *
	         * 'random() decimal places not an integer: {dp}'
	         * 'random() decimal places out of range: {dp}'
	         * 'random() crypto unavailable: {crypto}'
	         */
	        BigNumber.random = (function () {
	            var pow2_53 = 0x20000000000000;

	            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	            // Check if Math.random() produces more than 32 bits of randomness.
	            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	              ? function () { return mathfloor( Math.random() * pow2_53 ); }
	              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	                  (Math.random() * 0x800000 | 0); };

	            return function (dp) {
	                var a, b, e, k, v,
	                    i = 0,
	                    c = [],
	                    rand = new BigNumber(ONE);

	                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
	                k = mathceil( dp / LOG_BASE );

	                if (CRYPTO) {

	                    // Browsers supporting crypto.getRandomValues.
	                    if ( crypto && crypto.getRandomValues ) {

	                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

	                        for ( ; i < k; ) {

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
	                            if ( v >= 9e15 ) {
	                                b = crypto.getRandomValues( new Uint32Array(2) );
	                                a[i] = b[0];
	                                a[i + 1] = b[1];
	                            } else {

	                                // 0 <= v <= 8999999999999999
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 2;
	                            }
	                        }
	                        i = k / 2;

	                    // Node.js supporting crypto.randomBytes.
	                    } else if ( crypto && crypto.randomBytes ) {

	                        // buffer
	                        a = crypto.randomBytes( k *= 7 );

	                        for ( ; i < k; ) {

	                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	                            // 0x100000000 is 2^32, 0x1000000 is 2^24
	                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	                            // 0 <= v < 9007199254740992
	                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
	                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
	                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

	                            if ( v >= 9e15 ) {
	                                crypto.randomBytes(7).copy( a, i );
	                            } else {

	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 7;
	                            }
	                        }
	                        i = k / 7;
	                    } else if (ERRORS) {
	                        raise( 14, 'crypto unavailable', crypto );
	                    }
	                }

	                // Use Math.random: CRYPTO is false or crypto is unavailable and ERRORS is false.
	                if (!i) {

	                    for ( ; i < k; ) {
	                        v = random53bitInt();
	                        if ( v < 9e15 ) c[i++] = v % 1e14;
	                    }
	                }

	                k = c[--i];
	                dp %= LOG_BASE;

	                // Convert trailing digits to zeros according to dp.
	                if ( k && dp ) {
	                    v = POWS_TEN[LOG_BASE - dp];
	                    c[i] = mathfloor( k / v ) * v;
	                }

	                // Remove trailing elements which are zero.
	                for ( ; c[i] === 0; c.pop(), i-- );

	                // Zero?
	                if ( i < 0 ) {
	                    c = [ e = 0 ];
	                } else {

	                    // Remove leading elements which are zero and adjust exponent accordingly.
	                    for ( e = -1 ; c[0] === 0; c.shift(), e -= LOG_BASE);

	                    // Count the digits of the first element of c to determine leading zeros, and...
	                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

	                    // adjust the exponent accordingly.
	                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
	                }

	                rand.e = e;
	                rand.c = c;
	                return rand;
	            };
	        })();


	        // PRIVATE FUNCTIONS


	        // Convert a numeric string of baseIn to a numeric string of baseOut.
	        function convertBase( str, baseOut, baseIn, sign ) {
	            var d, e, k, r, x, xc, y,
	                i = str.indexOf( '.' ),
	                dp = DECIMAL_PLACES,
	                rm = ROUNDING_MODE;

	            if ( baseIn < 37 ) str = str.toLowerCase();

	            // Non-integer.
	            if ( i >= 0 ) {
	                k = POW_PRECISION;

	                // Unlimited precision.
	                POW_PRECISION = 0;
	                str = str.replace( '.', '' );
	                y = new BigNumber(baseIn);
	                x = y.pow( str.length - i );
	                POW_PRECISION = k;

	                // Convert str as if an integer, then restore the fraction part by dividing the
	                // result by its base raised to a power.
	                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
	                y.e = y.c.length;
	            }

	            // Convert the number as integer.
	            xc = toBaseOut( str, baseIn, baseOut );
	            e = k = xc.length;

	            // Remove trailing zeros.
	            for ( ; xc[--k] == 0; xc.pop() );
	            if ( !xc[0] ) return '0';

	            if ( i < 0 ) {
	                --e;
	            } else {
	                x.c = xc;
	                x.e = e;

	                // sign is needed for correct rounding.
	                x.s = sign;
	                x = div( x, y, dp, rm, baseOut );
	                xc = x.c;
	                r = x.r;
	                e = x.e;
	            }

	            d = e + dp + 1;

	            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
	            i = xc[d];
	            k = baseOut / 2;
	            r = r || d < 0 || xc[d + 1] != null;

	            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	                         rm == ( x.s < 0 ? 8 : 7 ) );

	            if ( d < 1 || !xc[0] ) {

	                // 1^-dp or 0.
	                str = r ? toFixedPoint( '1', -dp ) : '0';
	            } else {
	                xc.length = d;

	                if (r) {

	                    // Rounding up may mean the previous digit has to be rounded up and so on.
	                    for ( --baseOut; ++xc[--d] > baseOut; ) {
	                        xc[d] = 0;

	                        if ( !d ) {
	                            ++e;
	                            xc.unshift(1);
	                        }
	                    }
	                }

	                // Determine trailing zeros.
	                for ( k = xc.length; !xc[--k]; );

	                // E.g. [4, 11, 15] becomes 4bf.
	                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
	                str = toFixedPoint( str, e );
	            }

	            // The caller will add the sign.
	            return str;
	        }


	        // Perform division in the specified base. Called by div and convertBase.
	        div = (function () {

	            // Assume non-zero x and k.
	            function multiply( x, k, base ) {
	                var m, temp, xlo, xhi,
	                    carry = 0,
	                    i = x.length,
	                    klo = k % SQRT_BASE,
	                    khi = k / SQRT_BASE | 0;

	                for ( x = x.slice(); i--; ) {
	                    xlo = x[i] % SQRT_BASE;
	                    xhi = x[i] / SQRT_BASE | 0;
	                    m = khi * xlo + xhi * klo;
	                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
	                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
	                    x[i] = temp % base;
	                }

	                if (carry) x.unshift(carry);

	                return x;
	            }

	            function compare( a, b, aL, bL ) {
	                var i, cmp;

	                if ( aL != bL ) {
	                    cmp = aL > bL ? 1 : -1;
	                } else {

	                    for ( i = cmp = 0; i < aL; i++ ) {

	                        if ( a[i] != b[i] ) {
	                            cmp = a[i] > b[i] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }
	                return cmp;
	            }

	            function subtract( a, b, aL, base ) {
	                var i = 0;

	                // Subtract b from a.
	                for ( ; aL--; ) {
	                    a[aL] -= i;
	                    i = a[aL] < b[aL] ? 1 : 0;
	                    a[aL] = i * base + a[aL] - b[aL];
	                }

	                // Remove leading zeros.
	                for ( ; !a[0] && a.length > 1; a.shift() );
	            }

	            // x: dividend, y: divisor.
	            return function ( x, y, dp, rm, base ) {
	                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	                    yL, yz,
	                    s = x.s == y.s ? 1 : -1,
	                    xc = x.c,
	                    yc = y.c;

	                // Either NaN, Infinity or 0?
	                if ( !xc || !xc[0] || !yc || !yc[0] ) {

	                    return new BigNumber(

	                      // Return NaN if either NaN, or both Infinity or 0.
	                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

	                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	                    );
	                }

	                q = new BigNumber(s);
	                qc = q.c = [];
	                e = x.e - y.e;
	                s = dp + e + 1;

	                if ( !base ) {
	                    base = BASE;
	                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
	                    s = s / LOG_BASE | 0;
	                }

	                // Result exponent may be one less then the current value of e.
	                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
	                if ( yc[i] > ( xc[i] || 0 ) ) e--;

	                if ( s < 0 ) {
	                    qc.push(1);
	                    more = true;
	                } else {
	                    xL = xc.length;
	                    yL = yc.length;
	                    i = 0;
	                    s += 2;

	                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

	                    n = mathfloor( base / ( yc[0] + 1 ) );

	                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
	                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
	                    if ( n > 1 ) {
	                        yc = multiply( yc, n, base );
	                        xc = multiply( xc, n, base );
	                        yL = yc.length;
	                        xL = xc.length;
	                    }

	                    xi = yL;
	                    rem = xc.slice( 0, yL );
	                    remL = rem.length;

	                    // Add zeros to make remainder as long as divisor.
	                    for ( ; remL < yL; rem[remL++] = 0 );
	                    yz = yc.slice();
	                    yz.unshift(0);
	                    yc0 = yc[0];
	                    if ( yc[1] >= base / 2 ) yc0++;
	                    // Not necessary, but to prevent trial digit n > base, when using base 3.
	                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

	                    do {
	                        n = 0;

	                        // Compare divisor and remainder.
	                        cmp = compare( yc, rem, yL, remL );

	                        // If divisor < remainder.
	                        if ( cmp < 0 ) {

	                            // Calculate trial digit, n.

	                            rem0 = rem[0];
	                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

	                            // n is how many times the divisor goes into the current remainder.
	                            n = mathfloor( rem0 / yc0 );

	                            //  Algorithm:
	                            //  1. product = divisor * trial digit (n)
	                            //  2. if product > remainder: product -= divisor, n--
	                            //  3. remainder -= product
	                            //  4. if product was < remainder at 2:
	                            //    5. compare new remainder and divisor
	                            //    6. If remainder > divisor: remainder -= divisor, n++

	                            if ( n > 1 ) {

	                                // n may be > base only when base is 3.
	                                if (n >= base) n = base - 1;

	                                // product = divisor * trial digit.
	                                prod = multiply( yc, n, base );
	                                prodL = prod.length;
	                                remL = rem.length;

	                                // Compare product and remainder.
	                                // If product > remainder.
	                                // Trial digit n too high.
	                                // n is 1 too high about 5% of the time, and is not known to have
	                                // ever been more than 1 too high.
	                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
	                                    n--;

	                                    // Subtract divisor from product.
	                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
	                                    prodL = prod.length;
	                                    cmp = 1;
	                                }
	                            } else {

	                                // n is 0 or 1, cmp is -1.
	                                // If n is 0, there is no need to compare yc and rem again below,
	                                // so change cmp to 1 to avoid it.
	                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                                if ( n == 0 ) {

	                                    // divisor < remainder, so n must be at least 1.
	                                    cmp = n = 1;
	                                }

	                                // product = divisor
	                                prod = yc.slice();
	                                prodL = prod.length;
	                            }

	                            if ( prodL < remL ) prod.unshift(0);

	                            // Subtract product from remainder.
	                            subtract( rem, prod, remL, base );
	                            remL = rem.length;

	                             // If product was < remainder.
	                            if ( cmp == -1 ) {

	                                // Compare divisor and new remainder.
	                                // If divisor < new remainder, subtract divisor from remainder.
	                                // Trial digit n too low.
	                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                                while ( compare( yc, rem, yL, remL ) < 1 ) {
	                                    n++;

	                                    // Subtract divisor from remainder.
	                                    subtract( rem, yL < remL ? yz : yc, remL, base );
	                                    remL = rem.length;
	                                }
	                            }
	                        } else if ( cmp === 0 ) {
	                            n++;
	                            rem = [0];
	                        } // else cmp === 1 and n will be 0

	                        // Add the next digit, n, to the result array.
	                        qc[i++] = n;

	                        // Update the remainder.
	                        if ( rem[0] ) {
	                            rem[remL++] = xc[xi] || 0;
	                        } else {
	                            rem = [ xc[xi] ];
	                            remL = 1;
	                        }
	                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

	                    more = rem[0] != null;

	                    // Leading zero?
	                    if ( !qc[0] ) qc.shift();
	                }

	                if ( base == BASE ) {

	                    // To calculate q.e, first get the number of digits of qc[0].
	                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
	                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

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
	         * n is a BigNumber.
	         * i is the index of the last digit required (i.e. the digit that may be rounded up).
	         * rm is the rounding mode.
	         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
	         */
	        function format( n, i, rm, caller ) {
	            var c0, e, ne, len, str;

	            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
	              ? rm | 0 : ROUNDING_MODE;

	            if ( !n.c ) return n.toString();
	            c0 = n.c[0];
	            ne = n.e;

	            if ( i == null ) {
	                str = coeffToString( n.c );
	                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
	                  ? toExponential( str, ne )
	                  : toFixedPoint( str, ne );
	            } else {
	                n = round( new BigNumber(n), i, rm );

	                // n.e may have changed if the value was rounded up.
	                e = n.e;

	                str = coeffToString( n.c );
	                len = str.length;

	                // toPrecision returns exponential notation if the number of significant digits
	                // specified is less than the number of digits necessary to represent the integer
	                // part of the value in fixed-point notation.

	                // Exponential notation.
	                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

	                    // Append zeros?
	                    for ( ; len < i; str += '0', len++ );
	                    str = toExponential( str, e );

	                // Fixed-point notation.
	                } else {
	                    i -= ne;
	                    str = toFixedPoint( str, e );

	                    // Append zeros?
	                    if ( e + 1 > len ) {
	                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
	                    } else {
	                        i += e - len;
	                        if ( i > 0 ) {
	                            if ( e + 1 == len ) str += '.';
	                            for ( ; i--; str += '0' );
	                        }
	                    }
	                }
	            }

	            return n.s < 0 && c0 ? '-' + str : str;
	        }


	        // Handle BigNumber.max and BigNumber.min.
	        function maxOrMin( args, method ) {
	            var m, n,
	                i = 0;

	            if ( isArray( args[0] ) ) args = args[0];
	            m = new BigNumber( args[0] );

	            for ( ; ++i < args.length; ) {
	                n = new BigNumber( args[i] );

	                // If any number is NaN, return NaN.
	                if ( !n.s ) {
	                    m = n;
	                    break;
	                } else if ( method.call( m, n ) ) {
	                    m = n;
	                }
	            }

	            return m;
	        }


	        /*
	         * Return true if n is an integer in range, otherwise throw.
	         * Use for argument validation when ERRORS is true.
	         */
	        function intValidatorWithErrors( n, min, max, caller, name ) {
	            if ( n < min || n > max || n != truncate(n) ) {
	                raise( caller, ( name || 'decimal places' ) +
	                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
	            }

	            return true;
	        }


	        /*
	         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	         * Called by minus, plus and times.
	         */
	        function normalise( n, c, e ) {
	            var i = 1,
	                j = c.length;

	             // Remove trailing zeros.
	            for ( ; !c[--j]; c.pop() );

	            // Calculate the base 10 exponent. First get the number of digits of c[0].
	            for ( j = c[0]; j >= 10; j /= 10, i++ );

	            // Overflow?
	            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

	                // Infinity.
	                n.c = n.e = null;

	            // Underflow?
	            } else if ( e < MIN_EXP ) {

	                // Zero.
	                n.c = [ n.e = 0 ];
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

	            return function ( x, str, num, b ) {
	                var base,
	                    s = num ? str : str.replace( whitespaceOrPlus, '' );

	                // No exception on ±Infinity or NaN.
	                if ( isInfinityOrNaN.test(s) ) {
	                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	                } else {
	                    if ( !num ) {

	                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
	                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	                            return !b || b == base ? p1 : m;
	                        });

	                        if (b) {
	                            base = b;

	                            // E.g. '1.' to '1', '.1' to '0.1'
	                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
	                        }

	                        if ( str != s ) return new BigNumber( s, base );
	                    }

	                    // 'new BigNumber() not a number: {n}'
	                    // 'new BigNumber() not a base {b} number: {n}'
	                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
	                    x.s = null;
	                }

	                x.c = x.e = null;
	                id = 0;
	            }
	        })();


	        // Throw a BigNumber Error.
	        function raise( caller, msg, val ) {
	            var error = new Error( [
	                'new BigNumber',     // 0
	                'cmp',               // 1
	                'config',            // 2
	                'div',               // 3
	                'divToInt',          // 4
	                'eq',                // 5
	                'gt',                // 6
	                'gte',               // 7
	                'lt',                // 8
	                'lte',               // 9
	                'minus',             // 10
	                'mod',               // 11
	                'plus',              // 12
	                'precision',         // 13
	                'random',            // 14
	                'round',             // 15
	                'shift',             // 16
	                'times',             // 17
	                'toDigits',          // 18
	                'toExponential',     // 19
	                'toFixed',           // 20
	                'toFormat',          // 21
	                'toFraction',        // 22
	                'pow',               // 23
	                'toPrecision',       // 24
	                'toString',          // 25
	                'BigNumber'          // 26
	            ][caller] + '() ' + msg + ': ' + val );

	            error.name = 'BigNumber Error';
	            id = 0;
	            throw error;
	        }


	        /*
	         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	         * If r is truthy, it is known that there are more digits after the rounding digit.
	         */
	        function round( x, sd, rm, r ) {
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
	                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
	                    i = sd - d;

	                    // If the rounding digit is in the first element of xc...
	                    if ( i < 0 ) {
	                        i += LOG_BASE;
	                        j = sd;
	                        n = xc[ ni = 0 ];

	                        // Get the rounding digit at index j of n.
	                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
	                    } else {
	                        ni = mathceil( ( i + 1 ) / LOG_BASE );

	                        if ( ni >= xc.length ) {

	                            if (r) {

	                                // Needed by sqrt.
	                                for ( ; xc.length <= ni; xc.push(0) );
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
	                            for ( d = 1; k >= 10; k /= 10, d++ );

	                            // Get the index of rd within n.
	                            i %= LOG_BASE;

	                            // Get the index of rd within n, adjusted for leading zeros.
	                            // The number of leading zeros of n is given by LOG_BASE - d.
	                            j = i - LOG_BASE + d;

	                            // Get the rounding digit at index j of n.
	                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
	                        }
	                    }

	                    r = r || sd < 0 ||

	                    // Are there any non-zero digits after the rounding digit?
	                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
	                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

	                    r = rm < 4
	                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

	                        // Check whether the digit to the left of the rounding digit is odd.
	                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
	                          rm == ( x.s < 0 ? 8 : 7 ) );

	                    if ( sd < 1 || !xc[0] ) {
	                        xc.length = 0;

	                        if (r) {

	                            // Convert sd to decimal places.
	                            sd -= x.e + 1;

	                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                            xc[0] = pows10[ sd % LOG_BASE ];
	                            x.e = -sd || 0;
	                        } else {

	                            // Zero.
	                            xc[0] = x.e = 0;
	                        }

	                        return x;
	                    }

	                    // Remove excess digits.
	                    if ( i == 0 ) {
	                        xc.length = ni;
	                        k = 1;
	                        ni--;
	                    } else {
	                        xc.length = ni + 1;
	                        k = pows10[ LOG_BASE - i ];

	                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	                        // j > 0 means i > number of leading zeros of n.
	                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
	                    }

	                    // Round up?
	                    if (r) {

	                        for ( ; ; ) {

	                            // If the digit to be rounded up is in the first element of xc...
	                            if ( ni == 0 ) {

	                                // i will be the length of xc[0] before k is added.
	                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
	                                j = xc[0] += k;
	                                for ( k = 1; j >= 10; j /= 10, k++ );

	                                // if i != k the length has increased.
	                                if ( i != k ) {
	                                    x.e++;
	                                    if ( xc[0] == BASE ) xc[0] = 1;
	                                }

	                                break;
	                            } else {
	                                xc[ni] += k;
	                                if ( xc[ni] != BASE ) break;
	                                xc[ni--] = 0;
	                                k = 1;
	                            }
	                        }
	                    }

	                    // Remove trailing zeros.
	                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
	                }

	                // Overflow? Infinity.
	                if ( x.e > MAX_EXP ) {
	                    x.c = x.e = null;

	                // Underflow? Zero.
	                } else if ( x.e < MIN_EXP ) {
	                    x.c = [ x.e = 0 ];
	                }
	            }

	            return x;
	        }


	        // PROTOTYPE/INSTANCE METHODS


	        /*
	         * Return a new BigNumber whose value is the absolute value of this BigNumber.
	         */
	        P.absoluteValue = P.abs = function () {
	            var x = new BigNumber(this);
	            if ( x.s < 0 ) x.s = 1;
	            return x;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of Infinity.
	         */
	        P.ceil = function () {
	            return round( new BigNumber(this), this.e + 1, 2 );
	        };


	        /*
	         * Return
	         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * 0 if they have the same value,
	         * or null if the value of either is NaN.
	         */
	        P.comparedTo = P.cmp = function ( y, b ) {
	            id = 1;
	            return compare( this, new BigNumber( y, b ) );
	        };


	        /*
	         * Return the number of decimal places of the value of this BigNumber, or null if the value
	         * of this BigNumber is ±Infinity or NaN.
	         */
	        P.decimalPlaces = P.dp = function () {
	            var n, v,
	                c = this.c;

	            if ( !c ) return null;
	            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

	            // Subtract the number of trailing zeros of the last number.
	            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
	            if ( n < 0 ) n = 0;

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
	        P.dividedBy = P.div = function ( y, b ) {
	            id = 3;
	            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
	        };


	        /*
	         * Return a new BigNumber whose value is the integer part of dividing the value of this
	         * BigNumber by the value of BigNumber(y, b).
	         */
	        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
	            id = 4;
	            return div( this, new BigNumber( y, b ), 0, 1 );
	        };


	        /*
	         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.equals = P.eq = function ( y, b ) {
	            id = 5;
	            return compare( this, new BigNumber( y, b ) ) === 0;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of -Infinity.
	         */
	        P.floor = function () {
	            return round( new BigNumber(this), this.e + 1, 3 );
	        };


	        /*
	         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.greaterThan = P.gt = function ( y, b ) {
	            id = 6;
	            return compare( this, new BigNumber( y, b ) ) > 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is greater than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
	            id = 7;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

	        };


	        /*
	         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
	         */
	        P.isFinite = function () {
	            return !!this.c;
	        };


	        /*
	         * Return true if the value of this BigNumber is an integer, otherwise return false.
	         */
	        P.isInteger = P.isInt = function () {
	            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
	        };


	        /*
	         * Return true if the value of this BigNumber is NaN, otherwise returns false.
	         */
	        P.isNaN = function () {
	            return !this.s;
	        };


	        /*
	         * Return true if the value of this BigNumber is negative, otherwise returns false.
	         */
	        P.isNegative = P.isNeg = function () {
	            return this.s < 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
	         */
	        P.isZero = function () {
	            return !!this.c && this.c[0] == 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.lessThan = P.lt = function ( y, b ) {
	            id = 8;
	            return compare( this, new BigNumber( y, b ) ) < 0;
	        };


	        /*
	         * Return true if the value of this BigNumber is less than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
	            id = 9;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
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
	        P.minus = P.sub = function ( y, b ) {
	            var i, j, t, xLTy,
	                x = this,
	                a = x.s;

	            id = 10;
	            y = new BigNumber( y, b );
	            b = y.s;

	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);

	            // Signs differ?
	            if ( a != b ) {
	                y.s = -b;
	                return x.plus(y);
	            }

	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;

	            if ( !xe || !ye ) {

	                // Either Infinity?
	                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

	                // Either zero?
	                if ( !xc[0] || !yc[0] ) {

	                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

	                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	                      ROUNDING_MODE == 3 ? -0 : 0 );
	                }
	            }

	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();

	            // Determine which is the bigger number.
	            if ( a = xe - ye ) {

	                if ( xLTy = a < 0 ) {
	                    a = -a;
	                    t = xc;
	                } else {
	                    ye = xe;
	                    t = yc;
	                }

	                t.reverse();

	                // Prepend zeros to equalise exponents.
	                for ( b = a; b--; t.push(0) );
	                t.reverse();
	            } else {

	                // Exponents equal. Check digit by digit.
	                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

	                for ( a = b = 0; b < j; b++ ) {

	                    if ( xc[b] != yc[b] ) {
	                        xLTy = xc[b] < yc[b];
	                        break;
	                    }
	                }
	            }

	            // x < y? Point xc to the array of the bigger number.
	            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

	            b = ( j = yc.length ) - ( i = xc.length );

	            // Append zeros to xc if shorter.
	            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
	            b = BASE - 1;

	            // Subtract yc from xc.
	            for ( ; j > a; ) {

	                if ( xc[--j] < yc[j] ) {
	                    for ( i = j; i && !xc[--i]; xc[i] = b );
	                    --xc[i];
	                    xc[j] += BASE;
	                }

	                xc[j] -= yc[j];
	            }

	            // Remove leading zeros and adjust exponent accordingly.
	            for ( ; xc[0] == 0; xc.shift(), --ye );

	            // Zero?
	            if ( !xc[0] ) {

	                // Following IEEE 754 (2008) 6.3,
	                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	                y.s = ROUNDING_MODE == 3 ? -1 : 1;
	                y.c = [ y.e = 0 ];
	                return y;
	            }

	            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	            // for finite x and y.
	            return normalise( y, xc, ye );
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
	        P.modulo = P.mod = function ( y, b ) {
	            var q, s,
	                x = this;

	            id = 11;
	            y = new BigNumber( y, b );

	            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	            if ( !x.c || !y.s || y.c && !y.c[0] ) {
	                return new BigNumber(NaN);

	            // Return x if y is Infinity or x is zero.
	            } else if ( !y.c || x.c && !x.c[0] ) {
	                return new BigNumber(x);
	            }

	            if ( MODULO_MODE == 9 ) {

	                // Euclidian division: q = sign(y) * floor(x / abs(y))
	                // r = x - qy    where  0 <= r < abs(y)
	                s = y.s;
	                y.s = 1;
	                q = div( x, y, 0, 3 );
	                y.s = s;
	                q.s *= s;
	            } else {
	                q = div( x, y, 0, MODULO_MODE );
	            }

	            return x.minus( q.times(y) );
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber negated,
	         * i.e. multiplied by -1.
	         */
	        P.negated = P.neg = function () {
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
	        P.plus = P.add = function ( y, b ) {
	            var t,
	                x = this,
	                a = x.s;

	            id = 12;
	            y = new BigNumber( y, b );
	            b = y.s;

	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);

	            // Signs differ?
	             if ( a != b ) {
	                y.s = -b;
	                return x.minus(y);
	            }

	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;

	            if ( !xe || !ye ) {

	                // Return ±Infinity if either ±Infinity.
	                if ( !xc || !yc ) return new BigNumber( a / 0 );

	                // Either zero?
	                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
	            }

	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();

	            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	            if ( a = xe - ye ) {
	                if ( a > 0 ) {
	                    ye = xe;
	                    t = yc;
	                } else {
	                    a = -a;
	                    t = xc;
	                }

	                t.reverse();
	                for ( ; a--; t.push(0) );
	                t.reverse();
	            }

	            a = xc.length;
	            b = yc.length;

	            // Point xc to the longer array, and b to the shorter length.
	            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

	            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	            for ( a = 0; b; ) {
	                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
	                xc[b] %= BASE;
	            }

	            if (a) {
	                xc.unshift(a);
	                ++ye;
	            }

	            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	            // ye = MAX_EXP + 1 possible
	            return normalise( y, xc, ye );
	        };


	        /*
	         * Return the number of significant digits of the value of this BigNumber.
	         *
	         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	         */
	        P.precision = P.sd = function (z) {
	            var n, v,
	                x = this,
	                c = x.c;

	            // 'precision() argument not a boolean or binary digit: {z}'
	            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
	                if (ERRORS) raise( 13, 'argument' + notBool, z );
	                if ( z != !!z ) z = null;
	            }

	            if ( !c ) return null;
	            v = c.length - 1;
	            n = v * LOG_BASE + 1;

	            if ( v = c[v] ) {

	                // Subtract the number of trailing zeros of the last element.
	                for ( ; v % 10 == 0; v /= 10, n-- );

	                // Add the number of digits of the first element.
	                for ( v = c[0]; v >= 10; v /= 10, n++ );
	            }

	            if ( z && x.e + 1 > n ) n = x.e + 1;

	            return n;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
	         * omitted.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'round() decimal places out of range: {dp}'
	         * 'round() decimal places not an integer: {dp}'
	         * 'round() rounding mode not an integer: {rm}'
	         * 'round() rounding mode out of range: {rm}'
	         */
	        P.round = function ( dp, rm ) {
	            var n = new BigNumber(this);

	            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
	                round( n, ~~dp + this.e + 1, rm == null ||
	                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
	            }

	            return n;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	         *
	         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         *
	         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
	         * otherwise.
	         *
	         * 'shift() argument not an integer: {k}'
	         * 'shift() argument out of range: {k}'
	         */
	        P.shift = function (k) {
	            var n = this;
	            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

	              // k < 1e+21, or truncate(k) will produce exponential notation.
	              ? n.times( '1e' + truncate(k) )
	              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
	                ? n.s * ( k < 0 ? 0 : 1 / 0 )
	                : n );
	        };


	        /*
	         *  sqrt(-n) =  N
	         *  sqrt( N) =  N
	         *  sqrt(-I) =  N
	         *  sqrt( I) =  I
	         *  sqrt( 0) =  0
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
	            if ( s !== 1 || !c || !c[0] ) {
	                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
	            }

	            // Initial estimate.
	            s = Math.sqrt( +x );

	            // Math.sqrt underflow/overflow?
	            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	            if ( s == 0 || s == 1 / 0 ) {
	                n = coeffToString(c);
	                if ( ( n.length + e ) % 2 == 0 ) n += '0';
	                s = Math.sqrt(n);
	                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

	                if ( s == 1 / 0 ) {
	                    n = '1e' + e;
	                } else {
	                    n = s.toExponential();
	                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
	                }

	                r = new BigNumber(n);
	            } else {
	                r = new BigNumber( s + '' );
	            }

	            // Check for zero.
	            // r could be zero if MIN_EXP is changed after the this value was created.
	            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	            // coeffToString to throw.
	            if ( r.c[0] ) {
	                e = r.e;
	                s = e + dp;
	                if ( s < 3 ) s = 0;

	                // Newton-Raphson iteration.
	                for ( ; ; ) {
	                    t = r;
	                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

	                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
	                         coeffToString( r.c ) ).slice( 0, s ) ) {

	                        // The exponent of r may here be one less than the final result exponent,
	                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	                        // are indexed correctly.
	                        if ( r.e < e ) --s;
	                        n = n.slice( s - 3, s + 1 );

	                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	                        // iteration.
	                        if ( n == '9999' || !rep && n == '4999' ) {

	                            // On the first iteration only, check to see if rounding up gives the
	                            // exact result as the nines may infinitely repeat.
	                            if ( !rep ) {
	                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

	                                if ( t.times(t).eq(x) ) {
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
	                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

	                                // Truncate to the first rounding digit.
	                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
	                                m = !r.times(r).eq(x);
	                            }

	                            break;
	                        }
	                    }
	                }
	            }

	            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
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
	         * Return a new BigNumber whose value is the value of this BigNumber times the value of
	         * BigNumber(y, b).
	         */
	        P.times = P.mul = function ( y, b ) {
	            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	                base, sqrtBase,
	                x = this,
	                xc = x.c,
	                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

	            // Either NaN, ±Infinity or ±0?
	            if ( !xc || !yc || !xc[0] || !yc[0] ) {

	                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
	                    y.c = y.e = y.s = null;
	                } else {
	                    y.s *= x.s;

	                    // Return ±Infinity if either is ±Infinity.
	                    if ( !xc || !yc ) {
	                        y.c = y.e = null;

	                    // Return ±0 if either is ±0.
	                    } else {
	                        y.c = [0];
	                        y.e = 0;
	                    }
	                }

	                return y;
	            }

	            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
	            y.s *= x.s;
	            xcL = xc.length;
	            ycL = yc.length;

	            // Ensure xc points to longer array and xcL to its length.
	            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

	            // Initialise the result array with zeros.
	            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

	            base = BASE;
	            sqrtBase = SQRT_BASE;

	            for ( i = ycL; --i >= 0; ) {
	                c = 0;
	                ylo = yc[i] % sqrtBase;
	                yhi = yc[i] / sqrtBase | 0;

	                for ( k = xcL, j = i + k; j > i; ) {
	                    xlo = xc[--k] % sqrtBase;
	                    xhi = xc[k] / sqrtBase | 0;
	                    m = yhi * xlo + xhi * ylo;
	                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
	                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
	                    zc[j--] = xlo % base;
	                }

	                zc[j] = c;
	            }

	            if (c) {
	                ++e;
	            } else {
	                zc.shift();
	            }

	            return normalise( y, zc, e );
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toDigits() precision out of range: {sd}'
	         * 'toDigits() precision not an integer: {sd}'
	         * 'toDigits() rounding mode not an integer: {rm}'
	         * 'toDigits() rounding mode out of range: {rm}'
	         */
	        P.toDigits = function ( sd, rm ) {
	            var n = new BigNumber(this);
	            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
	            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
	            return sd ? round( n, sd, rm ) : n;
	        };


	        /*
	         * Return a string representing the value of this BigNumber in exponential notation and
	         * rounded using ROUNDING_MODE to dp fixed decimal places.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toExponential() decimal places not an integer: {dp}'
	         * 'toExponential() decimal places out of range: {dp}'
	         * 'toExponential() rounding mode not an integer: {rm}'
	         * 'toExponential() rounding mode out of range: {rm}'
	         */
	        P.toExponential = function ( dp, rm ) {
	            return format( this,
	              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
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
	         * 'toFixed() decimal places not an integer: {dp}'
	         * 'toFixed() decimal places out of range: {dp}'
	         * 'toFixed() rounding mode not an integer: {rm}'
	         * 'toFixed() rounding mode out of range: {rm}'
	         */
	        P.toFixed = function ( dp, rm ) {
	            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
	              ? ~~dp + this.e + 1 : null, rm, 20 );
	        };


	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounded
	         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	         * of the FORMAT object (see BigNumber.config).
	         *
	         * FORMAT = {
	         *      decimalSeparator : '.',
	         *      groupSeparator : ',',
	         *      groupSize : 3,
	         *      secondaryGroupSize : 0,
	         *      fractionGroupSeparator : '\xA0',    // non-breaking space
	         *      fractionGroupSize : 0
	         * };
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFormat() decimal places not an integer: {dp}'
	         * 'toFormat() decimal places out of range: {dp}'
	         * 'toFormat() rounding mode not an integer: {rm}'
	         * 'toFormat() rounding mode out of range: {rm}'
	         */
	        P.toFormat = function ( dp, rm ) {
	            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
	              ? ~~dp + this.e + 1 : null, rm, 21 );

	            if ( this.c ) {
	                var i,
	                    arr = str.split('.'),
	                    g1 = +FORMAT.groupSize,
	                    g2 = +FORMAT.secondaryGroupSize,
	                    groupSeparator = FORMAT.groupSeparator,
	                    intPart = arr[0],
	                    fractionPart = arr[1],
	                    isNeg = this.s < 0,
	                    intDigits = isNeg ? intPart.slice(1) : intPart,
	                    len = intDigits.length;

	                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

	                if ( g1 > 0 && len > 0 ) {
	                    i = len % g1 || g1;
	                    intPart = intDigits.substr( 0, i );

	                    for ( ; i < len; i += g1 ) {
	                        intPart += groupSeparator + intDigits.substr( i, g1 );
	                    }

	                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
	                    if (isNeg) intPart = '-' + intPart;
	                }

	                str = fractionPart
	                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
	                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
	                      '$&' + FORMAT.fractionGroupSeparator )
	                    : fractionPart )
	                  : intPart;
	            }

	            return str;
	        };


	        /*
	         * Return a string array representing the value of this BigNumber as a simple fraction with
	         * an integer numerator and an integer denominator. The denominator will be a positive
	         * non-zero value less than or equal to the specified maximum denominator. If a maximum
	         * denominator is not specified, the denominator will be the lowest value necessary to
	         * represent the number exactly.
	         *
	         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
	         *
	         * 'toFraction() max denominator not an integer: {md}'
	         * 'toFraction() max denominator out of range: {md}'
	         */
	        P.toFraction = function (md) {
	            var arr, d0, d2, e, exp, n, n0, q, s,
	                k = ERRORS,
	                x = this,
	                xc = x.c,
	                d = new BigNumber(ONE),
	                n1 = d0 = new BigNumber(ONE),
	                d1 = n0 = new BigNumber(ONE);

	            if ( md != null ) {
	                ERRORS = false;
	                n = new BigNumber(md);
	                ERRORS = k;

	                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

	                    if (ERRORS) {
	                        raise( 22,
	                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
	                    }

	                    // ERRORS is false:
	                    // If md is a finite non-integer >= 1, round it to an integer and use it.
	                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
	                }
	            }

	            if ( !xc ) return x.toString();
	            s = coeffToString(xc);

	            // Determine initial denominator.
	            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	            e = d.e = s.length - x.e - 1;
	            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
	            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

	            exp = MAX_EXP;
	            MAX_EXP = 1 / 0;
	            n = new BigNumber(s);

	            // n0 = d1 = 0
	            n0.c[0] = 0;

	            for ( ; ; )  {
	                q = div( n, d, 0, 1 );
	                d2 = d0.plus( q.times(d1) );
	                if ( d2.cmp(md) == 1 ) break;
	                d0 = d1;
	                d1 = d2;
	                n1 = n0.plus( q.times( d2 = n1 ) );
	                n0 = d2;
	                d = n.minus( q.times( d2 = d ) );
	                n = d2;
	            }

	            d2 = div( md.minus(d0), d1, 0, 1 );
	            n0 = n0.plus( d2.times(n1) );
	            d0 = d0.plus( d2.times(d1) );
	            n0.s = n1.s = x.s;
	            e *= 2;

	            // Determine which fraction is closer to x, n0/d0 or n1/d1
	            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
	                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
	                    ? [ n1.toString(), d1.toString() ]
	                    : [ n0.toString(), d0.toString() ];

	            MAX_EXP = exp;
	            return arr;
	        };


	        /*
	         * Return the value of this BigNumber converted to a number primitive.
	         */
	        P.toNumber = function () {
	            var x = this;

	            // Ensure zero has correct sign.
	            return +x || ( x.s ? x.s * 0 : NaN );
	        };


	        /*
	         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
	         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	         * If POW_PRECISION is not 0, round to POW_PRECISION using ROUNDING_MODE.
	         *
	         * n {number} Integer, -9007199254740992 to 9007199254740992 inclusive.
	         * (Performs 54 loop iterations for n of 9007199254740992.)
	         *
	         * 'pow() exponent not an integer: {n}'
	         * 'pow() exponent out of range: {n}'
	         */
	        P.toPower = P.pow = function (n) {
	            var k, y,
	                i = mathfloor( n < 0 ? -n : +n ),
	                x = this;

	            // Pass ±Infinity to Math.pow if exponent is out of range.
	            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
	              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
	                parseFloat(n) != n && !( n = NaN ) ) ) {
	                return new BigNumber( Math.pow( +x, n ) );
	            }

	            // Truncating each coefficient array to a length of k after each multiplication equates
	            // to truncating significant digits to POW_PRECISION + [28, 41], i.e. there will be a
	            // minimum of 28 guard digits retained. (Using + 1.5 would give [9, 21] guard digits.)
	            k = POW_PRECISION ? mathceil( POW_PRECISION / LOG_BASE + 2 ) : 0;
	            y = new BigNumber(ONE);

	            for ( ; ; ) {

	                if ( i % 2 ) {
	                    y = y.times(x);
	                    if ( !y.c ) break;
	                    if ( k && y.c.length > k ) y.c.length = k;
	                }

	                i = mathfloor( i / 2 );
	                if ( !i ) break;

	                x = x.times(x);
	                if ( k && x.c && x.c.length > k ) x.c.length = k;
	            }

	            if ( n < 0 ) y = ONE.div(y);
	            return k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
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
	         * 'toPrecision() precision not an integer: {sd}'
	         * 'toPrecision() precision out of range: {sd}'
	         * 'toPrecision() rounding mode not an integer: {rm}'
	         * 'toPrecision() rounding mode out of range: {rm}'
	         */
	        P.toPrecision = function ( sd, rm ) {
	            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
	              ? sd | 0 : null, rm, 24 );
	        };


	        /*
	         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	         * TO_EXP_NEG, return exponential notation.
	         *
	         * [b] {number} Integer, 2 to 64 inclusive.
	         *
	         * 'toString() base not an integer: {b}'
	         * 'toString() base out of range: {b}'
	         */
	        P.toString = function (b) {
	            var str,
	                n = this,
	                s = n.s,
	                e = n.e;

	            // Infinity or NaN?
	            if ( e === null ) {

	                if (s) {
	                    str = 'Infinity';
	                    if ( s < 0 ) str = '-' + str;
	                } else {
	                    str = 'NaN';
	                }
	            } else {
	                str = coeffToString( n.c );

	                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
	                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	                      ? toExponential( str, e )
	                      : toFixedPoint( str, e );
	                } else {
	                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
	                }

	                if ( s < 0 && n.c[0] ) str = '-' + str;
	            }

	            return str;
	        };


	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
	         * number.
	         */
	        P.truncated = P.trunc = function () {
	            return round( new BigNumber(this), this.e + 1, 1 );
	        };



	        /*
	         * Return as toString, but do not accept a base argument.
	         */
	        P.valueOf = P.toJSON = function () {
	            return this.toString();
	        };


	        // Aliases for BigDecimal methods.
	        //P.add = P.plus;         // P.add included above
	        //P.subtract = P.minus;   // P.sub included above
	        //P.multiply = P.times;   // P.mul included above
	        //P.divide = P.div;
	        //P.remainder = P.mod;
	        //P.compareTo = P.cmp;
	        //P.negate = P.neg;


	        if ( configObj != null ) BigNumber.config(configObj);

	        return BigNumber;
	    }


	    // PRIVATE HELPER FUNCTIONS


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

	        for ( ; i < j; ) {
	            s = a[i++] + '';
	            z = LOG_BASE - s.length;
	            for ( ; z--; s = '0' + s );
	            r += s;
	        }

	        // Determine trailing zeros.
	        for ( j = r.length; r.charCodeAt(--j) === 48; );
	        return r.slice( 0, j + 1 || 1 );
	    }


	    // Compare the value of BigNumbers x and y.
	    function compare( x, y ) {
	        var a, b,
	            xc = x.c,
	            yc = y.c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;

	        // Either NaN?
	        if ( !i || !j ) return null;

	        a = xc && !xc[0];
	        b = yc && !yc[0];

	        // Either zero?
	        if ( a || b ) return a ? b ? 0 : -j : i;

	        // Signs differ?
	        if ( i != j ) return i;

	        a = i < 0;
	        b = k == l;

	        // Either Infinity?
	        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

	        // Compare exponents.
	        if ( !b ) return k > l ^ a ? 1 : -1;

	        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

	        // Compare digit by digit.
	        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

	        // Compare lengths.
	        return k == l ? 0 : k > l ^ a ? 1 : -1;
	    }


	    /*
	     * Return true if n is a valid number in range, otherwise false.
	     * Use for argument validation when ERRORS is false.
	     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
	     */
	    function intValidatorNoErrors( n, min, max ) {
	        return ( n = truncate(n) ) >= min && n <= max;
	    }


	    function isArray(obj) {
	        return Object.prototype.toString.call(obj) == '[object Array]';
	    }


	    /*
	     * Convert string of baseIn to an array of numbers of baseOut.
	     * Eg. convertBase('255', 10, 16) returns [15, 15].
	     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	     */
	    function toBaseOut( str, baseIn, baseOut ) {
	        var j,
	            arr = [0],
	            arrL,
	            i = 0,
	            len = str.length;

	        for ( ; i < len; ) {
	            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
	            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

	            for ( ; j < arr.length; j++ ) {

	                if ( arr[j] > baseOut - 1 ) {
	                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
	                    arr[j + 1] += arr[j] / baseOut | 0;
	                    arr[j] %= baseOut;
	                }
	            }
	        }

	        return arr.reverse();
	    }


	    function toExponential( str, e ) {
	        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
	          ( e < 0 ? 'e' : 'e+' ) + e;
	    }


	    function toFixedPoint( str, e ) {
	        var len, z;

	        // Negative exponent?
	        if ( e < 0 ) {

	            // Prepend zeros.
	            for ( z = '0.'; ++e; z += '0' );
	            str = z + str;

	        // Positive exponent
	        } else {
	            len = str.length;

	            // Append zeros.
	            if ( ++e > len ) {
	                for ( z = '0', e -= len; --e; z += '0' );
	                str += z;
	            } else if ( e < len ) {
	                str = str.slice( 0, e ) + '.' + str.slice(e);
	            }
	        }

	        return str;
	    }


	    function truncate(n) {
	        n = parseFloat(n);
	        return n < 0 ? mathceil(n) : mathfloor(n);
	    }


	    // EXPORT


	    BigNumber = another();

	    // AMD.
	    if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return BigNumber; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    // Node and other environments that support module.exports.
	    } else if ( typeof module != 'undefined' && module.exports ) {
	        module.exports = BigNumber;
	        if ( !crypto ) try { crypto = require('crypto'); } catch (e) {}

	    // Browser.
	    } else {
	        global.BigNumber = BigNumber;
	    }
	})(this);


/***/ }
/******/ ])
});
;