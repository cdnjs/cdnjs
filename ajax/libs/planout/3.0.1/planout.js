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

	var _random = __webpack_require__(3);

	var _random2 = _interopRequireDefault(_random);

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
	    Random: _random2.default,
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

	    var _this = _possibleConstructorReturn(this, (PlanOutOpRandom.__proto__ || Object.getPrototypeOf(PlanOutOpRandom)).call(this, args));

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

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
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

	      return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
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

	      return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
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

	      return _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).apply(this, arguments));
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

	      return _possibleConstructorReturn(this, (_class5.__proto__ || Object.getPrototypeOf(_class5)).apply(this, arguments));
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

	      return _possibleConstructorReturn(this, (_class6.__proto__ || Object.getPrototypeOf(_class6)).apply(this, arguments));
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

	      return _possibleConstructorReturn(this, (_class7.__proto__ || Object.getPrototypeOf(_class7)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (PlanOutOpSimple.__proto__ || Object.getPrototypeOf(PlanOutOpSimple)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (PlanOutOpUnary.__proto__ || Object.getPrototypeOf(PlanOutOpUnary)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (PlanOutOpBinary.__proto__ || Object.getPrototypeOf(PlanOutOpBinary)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (PlanOutOpCommutative.__proto__ || Object.getPrototypeOf(PlanOutOpCommutative)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Literal.__proto__ || Object.getPrototypeOf(Literal)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Get.__proto__ || Object.getPrototypeOf(Get)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Seq.__proto__ || Object.getPrototypeOf(Seq)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Return.__proto__ || Object.getPrototypeOf(Return)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Set.__proto__ || Object.getPrototypeOf(Set)).apply(this, arguments));
	  }

	  _createClass(Set, [{
	    key: "execute",
	    value: function execute(mapper) {
	      var variable = this.getArgString('var');
	      var value = this.getArgMixed('value');

	      if (mapper.hasOverride(variable)) {
	        return;
	      }

	      if (value && (0, _utils.isOperator)(value) && !value.salt) {
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

	    return _possibleConstructorReturn(this, (Arr.__proto__ || Object.getPrototypeOf(Arr)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Coalesce.__proto__ || Object.getPrototypeOf(Coalesce)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Cond.__proto__ || Object.getPrototypeOf(Cond)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (And.__proto__ || Object.getPrototypeOf(And)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Or.__proto__ || Object.getPrototypeOf(Or)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Sum.__proto__ || Object.getPrototypeOf(Sum)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Equals.__proto__ || Object.getPrototypeOf(Equals)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (GreaterThan.__proto__ || Object.getPrototypeOf(GreaterThan)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (LessThan.__proto__ || Object.getPrototypeOf(LessThan)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (LessThanOrEqualTo.__proto__ || Object.getPrototypeOf(LessThanOrEqualTo)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (GreaterThanOrEqualTo.__proto__ || Object.getPrototypeOf(GreaterThanOrEqualTo)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Mod.__proto__ || Object.getPrototypeOf(Mod)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Divide.__proto__ || Object.getPrototypeOf(Divide)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Round.__proto__ || Object.getPrototypeOf(Round)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Not.__proto__ || Object.getPrototypeOf(Not)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Negative.__proto__ || Object.getPrototypeOf(Negative)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Min.__proto__ || Object.getPrototypeOf(Min)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Max.__proto__ || Object.getPrototypeOf(Max)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Length.__proto__ || Object.getPrototypeOf(Length)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));
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

	    return _possibleConstructorReturn(this, (DefaultExperiment.__proto__ || Object.getPrototypeOf(DefaultExperiment)).apply(this, arguments));
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

	    var _this2 = _possibleConstructorReturn(this, (SimpleNamespace.__proto__ || Object.getPrototypeOf(SimpleNamespace)).call(this, args));

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
	      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireDefaultExperiment", this).call(this);
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
	      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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
	      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
	      if (!this._experiment) {
	        return;
	      }
	      this._experiment.logExposure(extras);
	    }
	  }, {
	    key: "logEvent",
	    value: function logEvent(eventType, extras) {
	      _get(SimpleNamespace.prototype.__proto__ || Object.getPrototypeOf(SimpleNamespace.prototype), "requireExperiment", this).call(this);
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

/***/ }
/******/ ])
});
;