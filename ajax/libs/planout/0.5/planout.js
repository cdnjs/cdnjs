(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["PlanOut"] = factory();
	else
		root["PlanOut"] = factory();
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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _es6Experiment = __webpack_require__(1);

	var _es6Experiment2 = _interopRequireDefault(_es6Experiment);

	var _es6Interpreter = __webpack_require__(2);

	var _es6Interpreter2 = _interopRequireDefault(_es6Interpreter);

	var _es6OpsRandom = __webpack_require__(3);

	var _es6OpsRandom2 = _interopRequireDefault(_es6OpsRandom);

	var _es6OpsCore = __webpack_require__(4);

	var _es6OpsCore2 = _interopRequireDefault(_es6OpsCore);

	var _es6Namespace = __webpack_require__(5);

	var Namespace = _interopRequireWildcard(_es6Namespace);

	var _es6Assignment = __webpack_require__(6);

	var _es6Assignment2 = _interopRequireDefault(_es6Assignment);

	exports['default'] = {
	  Namespace: Namespace,
	  Assignment: _es6Assignment2['default'],
	  Interpreter: _es6Interpreter2['default'],
	  Experiment: _es6Experiment2['default'],
	  Ops: {
	    Random: _es6OpsRandom2['default'],
	    Core: _es6OpsCore2['default']
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _assignment = __webpack_require__(6);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _libUtils = __webpack_require__(8);

	var Experiment = (function () {
		function Experiment(inputs) {
			_classCallCheck(this, Experiment);

			this.logger_configured = false;
			this.inputs = inputs;
			this._exposure_logged = false;
			this._salt = null;
			this._in_experiment = true;

			this.name = this.getDefaultExperimentName();
			this._auto_exposure_log = true;

			this.setup();

			this._assignment = new _assignment2['default'](this.get_salt());
			this._assigned = false;
		}

		_createClass(Experiment, [{
			key: 'getDefaultExperimentName',

			//helper function to return the class name of the current experiment class
			value: function getDefaultExperimentName() {
				if (_libUtils.isObject(this) && this.constructor && this !== this.window) {
					var arr = this.constructor.toString().match(/function\s*(\w+)/);
					if (arr && arr.length === 2) {
						return arr[1];
					}
				}
				return 'GenericExperiment';
			}
		}, {
			key: 'require_assignment',
			value: function require_assignment() {
				if (!this._assigned) {
					this._assign();
				}
			}
		}, {
			key: 'require_exposure_logging',
			value: function require_exposure_logging() {
				if (this._auto_exposure_log && !this._exposure_logged) {
					this.log_exposure();
				}
			}
		}, {
			key: '_assign',
			value: function _assign() {
				this.configure_logger();
				this.assign(this._assignment, this.inputs);
				this._assigned = true;
			}
		}, {
			key: 'setup',
			value: function setup() {
				return;
			}
		}, {
			key: 'in_experiment',
			value: function in_experiment() {
				return this._in_experiment;
			}
		}, {
			key: 'set_overrides',
			value: function set_overrides(value) {
				this._assignment.set_overrides(value);
				var o = this._assignment.get_overrides();
				var self = this;
				_libUtils.forEach(Object.keys(o), function (key) {
					if (self.inputs[key] !== undefined) {
						self.inputs[key] = o[key];
					}
				});
			}
		}, {
			key: 'get_salt',
			value: function get_salt() {
				if (this._salt) {
					return this._salt;
				} else {
					return this.name;
				}
			}
		}, {
			key: 'set_salt',
			value: function set_salt(value) {
				this._salt = value;
				if (this._assignment) {
					this._assignment.experiment_salt = value;
				}
			}
		}, {
			key: 'get_name',
			value: function get_name() {
				return this._name;
			}
		}, {
			key: 'assign',
			value: function assign(params, args) {
				throw 'IMPLEMENT THIS';
			}
		}, {
			key: 'set_name',
			value: function set_name(value) {
				var re = /\s+/g;
				var name = value.replace(re, '-');
				if (this._assignment) {
					this._assignment.experiment_salt = this.get_salt();
				}
			}
		}, {
			key: '__asBlob',
			value: function __asBlob(extras) {
				if (!extras) {
					extras = {};
				}

				var d = {
					'name': this.get_name(),
					'time': new Date().getTime() / 1000,
					'salt': this.get_salt(),
					'inputs': this.inputs,
					'params': this._assignment.get_params()
				};
				_libUtils.extend(d, extras);
				return d;
			}
		}, {
			key: 'set_auto_exposure_logging',
			value: function set_auto_exposure_logging(value) {
				this._auto_exposure_log = value;
			}
		}, {
			key: 'get_params',
			value: function get_params() {
				this.require_assignment();
				this.require_exposure_logging();
				return this._assignment.get_params();
			}
		}, {
			key: 'get',
			value: function get(name, def) {
				this.require_assignment();
				this.require_exposure_logging();
				return this._assignment.get(name, def);
			}
		}, {
			key: 'toString',
			value: function toString() {
				this.require_assignment();
				this.require_exposure_logging();
				return JSON.stringify(this.__asBlob());
			}
		}, {
			key: 'log_exposure',
			value: function log_exposure(extras) {
				if (!this._in_experiment) {
					return;
				}
				this._exposure_logged = true;
				this.log_event('exposure', extras);
			}
		}, {
			key: 'log_event',
			value: function log_event(event_type, extras) {
				if (!this._in_experiment) {
					return;
				}

				var extra_payload;

				if (extras) {
					extra_payload = { 'event': event_type, 'extra_data': _libUtils.clone(extras) };
				} else {
					extra_payload = { 'event': event_type };
				}

				this.log(this.__asBlob(extra_payload));
			}
		}, {
			key: 'configure_logger',
			value: function configure_logger() {
				throw 'IMPLEMENT THIS';
			}
		}, {
			key: 'log',
			value: function log(data) {
				throw 'IMPLEMENT THIS';
			}
		}, {
			key: 'previously_logged',
			value: function previously_logged() {
				throw 'IMPLEMENT THIS';
			}
		}]);

		return Experiment;
	})();

	exports['default'] = Experiment;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _assignment = __webpack_require__(6);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _opsUtils = __webpack_require__(7);

	var _libUtils = __webpack_require__(8);

	var Interpreter = (function () {
		function Interpreter(serialization, _x, _x2, environment) {
			var experiment_salt = arguments[1] === undefined ? 'global_salt' : arguments[1];
			var inputs = arguments[2] === undefined ? {} : arguments[2];

			_classCallCheck(this, Interpreter);

			this._serialization = serialization;
			if (!environment) {
				this._env = new _assignment2['default'](experiment_salt);
			} else {
				this._env = environment;
			}
			this.experiment_salt = this._experiment_salt = experiment_salt;
			this._evaluated = false;
			this._in_experiment = false;
			this._inputs = _libUtils.shallowCopy(inputs);
		}

		_createClass(Interpreter, [{
			key: 'in_experiment',
			value: function in_experiment() {
				return this._in_experiment;
			}
		}, {
			key: 'set_env',
			value: function set_env(new_env) {
				this._env = _libUtils.deepCopy(new_env);
				return this;
			}
		}, {
			key: 'has',
			value: function has(name) {
				return this._env[name];
			}
		}, {
			key: 'get',
			value: function get(name, default_val) {
				var input_val = this._inputs[name];
				if (!input_val) {
					input_val = default_val;
				}
				var env_val = this._env.get(name);
				if (env_val) {
					return env_val;
				}
				return input_val;
			}
		}, {
			key: 'get_params',
			value: function get_params() {
				if (!this._evaluated) {
					try {
						this.evaluate(this._serialization);
					} catch (err) {
						if (err instanceof _opsUtils.StopPlanOutException) {
							this._in_experiment = err.in_experiment;
						}
					}
					this._evaluated = true;
				}
				return this._env.get_params();
			}
		}, {
			key: 'set',
			value: function set(name, value) {
				this._env.set(name, value);
				return this;
			}
		}, {
			key: 'set_overrides',
			value: function set_overrides(overrides) {
				this._env.set_overrides(overrides);
				return this;
			}
		}, {
			key: 'get_overrides',
			value: function get_overrides() {
				return this._env.get_overrides();
			}
		}, {
			key: 'has_override',
			value: function has_override(name) {
				var overrides = this.get_overrides();
				return overrides && overrides[name] !== undefined;
			}
		}, {
			key: 'evaluate',
			value: function evaluate(planout_code) {
				if (_libUtils.isObject(planout_code) && planout_code.op) {
					return _opsUtils.operatorInstance(planout_code).execute(this);
				} else if (_libUtils.isArray(planout_code)) {
					var self = this;
					return _libUtils.map(planout_code, function (obj) {
						return self.evaluate(obj);
					});
				} else {
					return planout_code;
				}
			}
		}]);

		return Interpreter;
	})();

	exports['default'] = Interpreter;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
	    property = _x2,
	    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _base = __webpack_require__(9);

	var _sha1 = __webpack_require__(10);

	var _sha12 = _interopRequireDefault(_sha1);

	var _libUtils = __webpack_require__(8);

	var _bignumberJs = __webpack_require__(11);

	var _bignumberJs2 = _interopRequireDefault(_bignumberJs);

	var PlanOutOpRandom = (function (_PlanOutOpSimple) {
		function PlanOutOpRandom(args) {
			_classCallCheck(this, PlanOutOpRandom);

			_get(Object.getPrototypeOf(PlanOutOpRandom.prototype), "constructor", this).call(this, args);
			this.LONG_SCALE = new _bignumberJs2["default"]("FFFFFFFFFFFFFFF", 16);
		}

		_inherits(PlanOutOpRandom, _PlanOutOpSimple);

		_createClass(PlanOutOpRandom, [{
			key: "getUnit",
			value: function getUnit(appended_unit) {
				var unit = this.getArgMixed("unit");
				if (Object.prototype.toString.call(unit) !== "[object Array]") {
					unit = [unit];
				}
				if (appended_unit) {
					unit.push(appended_unit);
				}
				return unit;
			}
		}, {
			key: "getUniform",
			value: function getUniform(min_val, max_val, appended_unit) {
				min_val = typeof min_val !== "undefined" ? min_val : 0;
				max_val = typeof max_val !== "undefined" ? max_val : 1;
				var zero_to_one = this.getHash(appended_unit).dividedBy(this.LONG_SCALE);
				return zero_to_one.times(max_val - min_val).add(min_val).toNumber();
			}
		}, {
			key: "getHash",
			value: function getHash(appended_unit) {
				var full_salt;
				if (this.args.full_salt) {
					full_salt = this.getArgString("full_salt");
				} else {
					var salt = this.getArgString("salt");
					full_salt = this.mapper.get("experiment_salt") + "." + salt;
				}

				var unit_str = this.getUnit(appended_unit).map(function (element) {
					return String(element);
				}).join(".");
				var hash_str = full_salt + "." + unit_str;
				var hash = _sha12["default"](hash_str);
				return new _bignumberJs2["default"](hash.substr(0, 15), 16);
			}
		}]);

		return PlanOutOpRandom;
	})(_base.PlanOutOpSimple);

	var RandomFloat = (function (_PlanOutOpRandom) {
		function RandomFloat() {
			_classCallCheck(this, RandomFloat);

			if (_PlanOutOpRandom != null) {
				_PlanOutOpRandom.apply(this, arguments);
			}
		}

		_inherits(RandomFloat, _PlanOutOpRandom);

		_createClass(RandomFloat, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var min_val = this.getArgNumber("min");
				var max_val = this.getArgNumber("max");
				return this.getUniform(min_val, max_val);
			}
		}]);

		return RandomFloat;
	})(PlanOutOpRandom);

	var RandomInteger = (function (_PlanOutOpRandom2) {
		function RandomInteger() {
			_classCallCheck(this, RandomInteger);

			if (_PlanOutOpRandom2 != null) {
				_PlanOutOpRandom2.apply(this, arguments);
			}
		}

		_inherits(RandomInteger, _PlanOutOpRandom2);

		_createClass(RandomInteger, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var min_val = this.getArgNumber("min");
				var max_val = this.getArgNumber("max");
				return this.getHash().plus(min_val).modulo(max_val - min_val + 1).toNumber();;
			}
		}]);

		return RandomInteger;
	})(PlanOutOpRandom);

	var BernoulliTrial = (function (_PlanOutOpRandom3) {
		function BernoulliTrial() {
			_classCallCheck(this, BernoulliTrial);

			if (_PlanOutOpRandom3 != null) {
				_PlanOutOpRandom3.apply(this, arguments);
			}
		}

		_inherits(BernoulliTrial, _PlanOutOpRandom3);

		_createClass(BernoulliTrial, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var p = this.getArgNumber("p");
				if (p < 0 || p > 1) {
					throw "Invalid probability";
				}

				if (this.getUniform(0, 1) <= p) {
					return 1;
				} else {
					return 0;
				}
			}
		}]);

		return BernoulliTrial;
	})(PlanOutOpRandom);

	var BernoulliFilter = (function (_PlanOutOpRandom4) {
		function BernoulliFilter() {
			_classCallCheck(this, BernoulliFilter);

			if (_PlanOutOpRandom4 != null) {
				_PlanOutOpRandom4.apply(this, arguments);
			}
		}

		_inherits(BernoulliFilter, _PlanOutOpRandom4);

		_createClass(BernoulliFilter, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var p = this.getArgNumber("p");
				var values = this.getArgList("choices");
				if (p < 0 || p > 1) {
					throw "Invalid probability";
				}
				if (values.length == 0) {
					return [];
				}
				var ret = [];
				for (var i = 0; i < values.length; i++) {
					var cur = values[i];
					if (this.getUniform(0, 1, cur) <= p) {
						ret.push(cur);
					}
				}
				return ret;
			}
		}]);

		return BernoulliFilter;
	})(PlanOutOpRandom);

	var UniformChoice = (function (_PlanOutOpRandom5) {
		function UniformChoice() {
			_classCallCheck(this, UniformChoice);

			if (_PlanOutOpRandom5 != null) {
				_PlanOutOpRandom5.apply(this, arguments);
			}
		}

		_inherits(UniformChoice, _PlanOutOpRandom5);

		_createClass(UniformChoice, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var choices = this.getArgList("choices");
				if (choices.length === 0) {
					return [];
				}
				var rand_index = this.getHash().modulo(choices.length).toNumber();
				return choices[rand_index];
			}
		}]);

		return UniformChoice;
	})(PlanOutOpRandom);

	var WeightedChoice = (function (_PlanOutOpRandom6) {
		function WeightedChoice() {
			_classCallCheck(this, WeightedChoice);

			if (_PlanOutOpRandom6 != null) {
				_PlanOutOpRandom6.apply(this, arguments);
			}
		}

		_inherits(WeightedChoice, _PlanOutOpRandom6);

		_createClass(WeightedChoice, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var choices = this.getArgList("choices");
				var weights = this.getArgList("weights");
				if (choices.length === 0) {
					return [];
				}
				var cum_sum = 0;
				var cum_weights = weights.map(function (weight) {
					cum_sum += weight;
					return cum_sum;
				});
				var stop_val = this.getUniform(0, cum_sum);
				return _libUtils.reduce(cum_weights, function (ret_val, cur_val, i) {
					if (ret_val) {
						return ret_val;
					}
					if (stop_val <= cur_val) {
						return choices[i];
					}
					return ret_val;
				}, null);
			}
		}]);

		return WeightedChoice;
	})(PlanOutOpRandom);

	var Sample = (function (_PlanOutOpRandom7) {
		function Sample() {
			_classCallCheck(this, Sample);

			if (_PlanOutOpRandom7 != null) {
				_PlanOutOpRandom7.apply(this, arguments);
			}
		}

		_inherits(Sample, _PlanOutOpRandom7);

		_createClass(Sample, [{
			key: "shuffle",
			value: function shuffle(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = this.getHash(i).modulo(i + 1).toNumber();
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
				return array;
			}
		}, {
			key: "simpleExecute",
			value: function simpleExecute() {
				var choices = _libUtils.shallowCopy(this.getArgList("choices"));
				var num_draws = 0;
				if (this.args.draws) {
					num_draws = this.args.draws;
				} else {
					num_draws = choices.length;
				}
				var shuffled_arr = this.shuffle(choices);
				return shuffled_arr.slice(0, num_draws);
			}
		}]);

		return Sample;
	})(PlanOutOpRandom);

	exports["default"] = { PlanOutOpRandom: PlanOutOpRandom, Sample: Sample, WeightedChoice: WeightedChoice, UniformChoice: UniformChoice, BernoulliFilter: BernoulliFilter, BernoulliTrial: BernoulliTrial, RandomInteger: RandomInteger, RandomFloat: RandomFloat };
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _base = __webpack_require__(9);

	var _utils = __webpack_require__(7);

	var _libUtils = __webpack_require__(8);

	var Literal = (function (_PlanOutOp) {
		function Literal() {
			_classCallCheck(this, Literal);

			if (_PlanOutOp != null) {
				_PlanOutOp.apply(this, arguments);
			}
		}

		_inherits(Literal, _PlanOutOp);

		_createClass(Literal, [{
			key: "execute",
			value: function execute(mapper) {
				return this.getArgMixed("value");
			}
		}]);

		return Literal;
	})(_base.PlanOutOp);

	var Get = (function (_PlanOutOp2) {
		function Get() {
			_classCallCheck(this, Get);

			if (_PlanOutOp2 != null) {
				_PlanOutOp2.apply(this, arguments);
			}
		}

		_inherits(Get, _PlanOutOp2);

		_createClass(Get, [{
			key: "execute",
			value: function execute(mapper) {
				return mapper.get(this.getArgString("var"));
			}
		}]);

		return Get;
	})(_base.PlanOutOp);

	var Seq = (function (_PlanOutOp3) {
		function Seq() {
			_classCallCheck(this, Seq);

			if (_PlanOutOp3 != null) {
				_PlanOutOp3.apply(this, arguments);
			}
		}

		_inherits(Seq, _PlanOutOp3);

		_createClass(Seq, [{
			key: "execute",
			value: function execute(mapper) {
				_libUtils.forEach(this.getArgList("seq"), function (op) {
					mapper.evaluate(op);
				});
			}
		}]);

		return Seq;
	})(_base.PlanOutOp);

	var Return = (function (_PlanOutOp4) {
		function Return() {
			_classCallCheck(this, Return);

			if (_PlanOutOp4 != null) {
				_PlanOutOp4.apply(this, arguments);
			}
		}

		_inherits(Return, _PlanOutOp4);

		_createClass(Return, [{
			key: "execute",
			value: function execute(mapper) {
				var value = mapper.evaluate(this.getArgMixed("value"));
				var in_experiment = false;
				if (value) {
					in_experiment = true;
				}
				throw new _utils.StopPlanOutException(in_experiment);
			}
		}]);

		return Return;
	})(_base.PlanOutOp);

	var Set = (function (_PlanOutOp5) {
		function Set() {
			_classCallCheck(this, Set);

			if (_PlanOutOp5 != null) {
				_PlanOutOp5.apply(this, arguments);
			}
		}

		_inherits(Set, _PlanOutOp5);

		_createClass(Set, [{
			key: "execute",
			value: function execute(mapper) {
				var variable = this.getArgString("var");
				var value = this.getArgMixed("value");
				if (mapper.has_override(variable)) {
					return;
				}

				if (_utils.isOperator(value) && !value.salt) {
					value.salt = variable;
				}

				if (variable == "experiment_salt") {
					mapper.experiment_salt = value;
				}
				mapper.set(variable, mapper.evaluate(value));
			}
		}]);

		return Set;
	})(_base.PlanOutOp);

	var Arr = (function (_PlanOutOp6) {
		function Arr() {
			_classCallCheck(this, Arr);

			if (_PlanOutOp6 != null) {
				_PlanOutOp6.apply(this, arguments);
			}
		}

		_inherits(Arr, _PlanOutOp6);

		_createClass(Arr, [{
			key: "execute",
			value: function execute(mapper) {
				return _libUtils.map(this.getArgList("values"), function (value) {
					return mapper.evaluate(value);
				});
			}
		}]);

		return Arr;
	})(_base.PlanOutOp);

	var Coalesce = (function (_PlanOutOp7) {
		function Coalesce() {
			_classCallCheck(this, Coalesce);

			if (_PlanOutOp7 != null) {
				_PlanOutOp7.apply(this, arguments);
			}
		}

		_inherits(Coalesce, _PlanOutOp7);

		_createClass(Coalesce, [{
			key: "execute",
			value: function execute(mapper) {
				var values = this.getArgList("values");
				for (var i = 0; i < values.length; i++) {
					var x = values[i];
					var eval_x = mapper.evaluate(x);
					if (eval_x !== null && eval_x !== undefined) {
						return eval_x;
					}
				}
				return null;
			}
		}]);

		return Coalesce;
	})(_base.PlanOutOp);

	var Index = (function (_PlanOutOpSimple) {
		function Index() {
			_classCallCheck(this, Index);

			if (_PlanOutOpSimple != null) {
				_PlanOutOpSimple.apply(this, arguments);
			}
		}

		_inherits(Index, _PlanOutOpSimple);

		_createClass(Index, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var base = this.getArgIndexish("base");
				var index = this.getArgMixed("index");
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
	})(_base.PlanOutOpSimple);

	var Cond = (function (_PlanOutOp8) {
		function Cond() {
			_classCallCheck(this, Cond);

			if (_PlanOutOp8 != null) {
				_PlanOutOp8.apply(this, arguments);
			}
		}

		_inherits(Cond, _PlanOutOp8);

		_createClass(Cond, [{
			key: "execute",
			value: function execute(mapper) {
				var list = this.getArgList("cond");
				for (var i in list) {
					var if_clause = list[i]["if"];
					var then_clause = list[i]["then"];
					if (mapper.evaluate(if_clause)) {
						return mapper.evaluate(then_clause);
					}
				}
				return null;
			}
		}]);

		return Cond;
	})(_base.PlanOutOp);

	var And = (function (_PlanOutOp9) {
		function And() {
			_classCallCheck(this, And);

			if (_PlanOutOp9 != null) {
				_PlanOutOp9.apply(this, arguments);
			}
		}

		_inherits(And, _PlanOutOp9);

		_createClass(And, [{
			key: "execute",
			value: function execute(mapper) {
				return _libUtils.reduce(this.getArgList("values"), function (ret, clause) {
					if (!ret) {
						return ret;
					}

					return Boolean(mapper.evaluate(clause));
				}, true);
			}
		}]);

		return And;
	})(_base.PlanOutOp);

	var Or = (function (_PlanOutOp10) {
		function Or() {
			_classCallCheck(this, Or);

			if (_PlanOutOp10 != null) {
				_PlanOutOp10.apply(this, arguments);
			}
		}

		_inherits(Or, _PlanOutOp10);

		_createClass(Or, [{
			key: "execute",
			value: function execute(mapper) {
				return _libUtils.reduce(this.getArgList("values"), function (ret, clause) {
					if (ret) {
						return ret;
					}

					return Boolean(mapper.evaluate(clause));
				}, false);
			}
		}]);

		return Or;
	})(_base.PlanOutOp);

	var Product = (function (_PlanOutOpCommutative) {
		function Product() {
			_classCallCheck(this, Product);

			if (_PlanOutOpCommutative != null) {
				_PlanOutOpCommutative.apply(this, arguments);
			}
		}

		_inherits(Product, _PlanOutOpCommutative);

		_createClass(Product, [{
			key: "commutativeExecute",
			value: function commutativeExecute(values) {
				return _libUtils.reduce(values, function (memo, value) {
					return memo * value;
				}, 1);
			}
		}]);

		return Product;
	})(_base.PlanOutOpCommutative);

	var Sum = (function (_PlanOutOpCommutative2) {
		function Sum() {
			_classCallCheck(this, Sum);

			if (_PlanOutOpCommutative2 != null) {
				_PlanOutOpCommutative2.apply(this, arguments);
			}
		}

		_inherits(Sum, _PlanOutOpCommutative2);

		_createClass(Sum, [{
			key: "commutativeExecute",
			value: function commutativeExecute(values) {
				return _libUtils.reduce(values, function (memo, value) {
					return memo + value;
				}, 0);
			}
		}]);

		return Sum;
	})(_base.PlanOutOpCommutative);

	var Equals = (function (_PlanOutOpBinary) {
		function Equals() {
			_classCallCheck(this, Equals);

			if (_PlanOutOpBinary != null) {
				_PlanOutOpBinary.apply(this, arguments);
			}
		}

		_inherits(Equals, _PlanOutOpBinary);

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
	})(_base.PlanOutOpBinary);

	var GreaterThan = (function (_PlanOutOpBinary2) {
		function GreaterThan() {
			_classCallCheck(this, GreaterThan);

			if (_PlanOutOpBinary2 != null) {
				_PlanOutOpBinary2.apply(this, arguments);
			}
		}

		_inherits(GreaterThan, _PlanOutOpBinary2);

		_createClass(GreaterThan, [{
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				return left > right;
			}
		}]);

		return GreaterThan;
	})(_base.PlanOutOpBinary);

	var LessThan = (function (_PlanOutOpBinary3) {
		function LessThan() {
			_classCallCheck(this, LessThan);

			if (_PlanOutOpBinary3 != null) {
				_PlanOutOpBinary3.apply(this, arguments);
			}
		}

		_inherits(LessThan, _PlanOutOpBinary3);

		_createClass(LessThan, [{
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				return left < right;
			}
		}]);

		return LessThan;
	})(_base.PlanOutOpBinary);

	var LessThanOrEqualTo = (function (_PlanOutOpBinary4) {
		function LessThanOrEqualTo() {
			_classCallCheck(this, LessThanOrEqualTo);

			if (_PlanOutOpBinary4 != null) {
				_PlanOutOpBinary4.apply(this, arguments);
			}
		}

		_inherits(LessThanOrEqualTo, _PlanOutOpBinary4);

		_createClass(LessThanOrEqualTo, [{
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				return left <= right;
			}
		}]);

		return LessThanOrEqualTo;
	})(_base.PlanOutOpBinary);

	var GreaterThanOrEqualTo = (function (_PlanOutOpBinary5) {
		function GreaterThanOrEqualTo() {
			_classCallCheck(this, GreaterThanOrEqualTo);

			if (_PlanOutOpBinary5 != null) {
				_PlanOutOpBinary5.apply(this, arguments);
			}
		}

		_inherits(GreaterThanOrEqualTo, _PlanOutOpBinary5);

		_createClass(GreaterThanOrEqualTo, [{
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				return left >= right;
			}
		}]);

		return GreaterThanOrEqualTo;
	})(_base.PlanOutOpBinary);

	var Mod = (function (_PlanOutOpBinary6) {
		function Mod() {
			_classCallCheck(this, Mod);

			if (_PlanOutOpBinary6 != null) {
				_PlanOutOpBinary6.apply(this, arguments);
			}
		}

		_inherits(Mod, _PlanOutOpBinary6);

		_createClass(Mod, [{
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				return left % right;
			}
		}]);

		return Mod;
	})(_base.PlanOutOpBinary);

	var Divide = (function (_PlanOutOpBinary7) {
		function Divide() {
			_classCallCheck(this, Divide);

			if (_PlanOutOpBinary7 != null) {
				_PlanOutOpBinary7.apply(this, arguments);
			}
		}

		_inherits(Divide, _PlanOutOpBinary7);

		_createClass(Divide, [{
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				return parseFloat(left) / parseFloat(right);
			}
		}]);

		return Divide;
	})(_base.PlanOutOpBinary);

	var Round = (function (_PlanOutOpBinary8) {
		function Round() {
			_classCallCheck(this, Round);

			if (_PlanOutOpBinary8 != null) {
				_PlanOutOpBinary8.apply(this, arguments);
			}
		}

		_inherits(Round, _PlanOutOpBinary8);

		_createClass(Round, [{
			key: "unaryExecute",
			value: function unaryExecute(value) {
				return Math.round(value);
			}
		}]);

		return Round;
	})(_base.PlanOutOpBinary);

	var Not = (function (_PlanOutOpUnary) {
		function Not() {
			_classCallCheck(this, Not);

			if (_PlanOutOpUnary != null) {
				_PlanOutOpUnary.apply(this, arguments);
			}
		}

		_inherits(Not, _PlanOutOpUnary);

		_createClass(Not, [{
			key: "getUnaryString",
			value: function getUnaryString() {
				return "!";
			}
		}, {
			key: "unaryExecute",
			value: function unaryExecute(value) {
				return !value;
			}
		}]);

		return Not;
	})(_base.PlanOutOpUnary);

	var Negative = (function (_PlanOutOpUnary2) {
		function Negative() {
			_classCallCheck(this, Negative);

			if (_PlanOutOpUnary2 != null) {
				_PlanOutOpUnary2.apply(this, arguments);
			}
		}

		_inherits(Negative, _PlanOutOpUnary2);

		_createClass(Negative, [{
			key: "getUnaryString",
			value: function getUnaryString() {
				return "-";
			}
		}, {
			key: "unaryExecute",
			value: function unaryExecute(value) {
				return 0 - value;
			}
		}]);

		return Negative;
	})(_base.PlanOutOpUnary);

	var Min = (function (_PlanOutOpCommutative3) {
		function Min() {
			_classCallCheck(this, Min);

			if (_PlanOutOpCommutative3 != null) {
				_PlanOutOpCommutative3.apply(this, arguments);
			}
		}

		_inherits(Min, _PlanOutOpCommutative3);

		_createClass(Min, [{
			key: "commutativeExecute",
			value: function commutativeExecute(values) {
				return Math.min.apply(null, values);
			}
		}]);

		return Min;
	})(_base.PlanOutOpCommutative);

	var Max = (function (_PlanOutOpCommutative4) {
		function Max() {
			_classCallCheck(this, Max);

			if (_PlanOutOpCommutative4 != null) {
				_PlanOutOpCommutative4.apply(this, arguments);
			}
		}

		_inherits(Max, _PlanOutOpCommutative4);

		_createClass(Max, [{
			key: "commutativeExecute",
			value: function commutativeExecute(values) {
				return Math.max.apply(null, values);
			}
		}]);

		return Max;
	})(_base.PlanOutOpCommutative);

	var Length = (function (_PlanOutOpUnary3) {
		function Length() {
			_classCallCheck(this, Length);

			if (_PlanOutOpUnary3 != null) {
				_PlanOutOpUnary3.apply(this, arguments);
			}
		}

		_inherits(Length, _PlanOutOpUnary3);

		_createClass(Length, [{
			key: "unaryExecute",
			value: function unaryExecute(value) {
				return value.length;
			}
		}]);

		return Length;
	})(_base.PlanOutOpUnary);

	exports.Literal = Literal;
	exports.Get = Get;
	exports.Seq = Seq;
	exports.Set = Set;
	exports.Arr = Arr;
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
	    property = _x2,
	    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _experimentJs = __webpack_require__(1);

	var _experimentJs2 = _interopRequireDefault(_experimentJs);

	var _assignmentJs = __webpack_require__(6);

	var _assignmentJs2 = _interopRequireDefault(_assignmentJs);

	var _opsRandomJs = __webpack_require__(3);

	var _libUtilsJs = __webpack_require__(8);

	var DefaultExperiment = (function (_Experiment) {
	  function DefaultExperiment() {
	    _classCallCheck(this, DefaultExperiment);

	    if (_Experiment != null) {
	      _Experiment.apply(this, arguments);
	    }
	  }

	  _inherits(DefaultExperiment, _Experiment);

	  _createClass(DefaultExperiment, [{
	    key: "configure_logger",
	    value: function configure_logger() {
	      return;
	    }
	  }, {
	    key: "setup",
	    value: function setup() {
	      this.name = "test_name";
	    }
	  }, {
	    key: "log",
	    value: function log(data) {
	      return;
	    }
	  }, {
	    key: "previously_logged",
	    value: function previously_logged() {
	      return true;
	    }
	  }, {
	    key: "assign",
	    value: function assign(params, args) {
	      return;
	    }
	  }]);

	  return DefaultExperiment;
	})(_experimentJs2["default"]);

	var Namespace = (function () {
	  function Namespace() {
	    _classCallCheck(this, Namespace);
	  }

	  _createClass(Namespace, [{
	    key: "add_experiment",
	    value: function add_experiment(name, obj, segments) {
	      throw "IMPLEMENT add_experiment";
	    }
	  }, {
	    key: "remove_experiment",
	    value: function remove_experiment(name) {
	      throw "IMPLEMENT remove_experiment";
	    }
	  }, {
	    key: "set_auto_exposure_logging",
	    value: function set_auto_exposure_logging(value) {
	      throw "IMPLEMENT set_auto_exposure_logging";
	    }
	  }, {
	    key: "in_experiment",
	    value: function in_experiment() {
	      throw "IMPLEMENT in_experiment";
	    }
	  }, {
	    key: "get",
	    value: function get(name, default_val) {
	      throw "IMPLEMENT get";
	    }
	  }, {
	    key: "log_exposure",
	    value: function log_exposure(extras) {
	      throw "IMPLEMENT log_exposure";
	    }
	  }, {
	    key: "log_event",
	    value: function log_event(event_type, extras) {
	      throw "IMPLEMENT log_event";
	    }
	  }, {
	    key: "require_experiment",
	    value: function require_experiment() {
	      if (!this._experiment) {
	        this._assign_experiment();
	      }
	    }
	  }, {
	    key: "require_default_experiment",
	    value: function require_default_experiment() {
	      if (!this._default_experiment) {
	        this._assign_default_experiment();
	      }
	    }
	  }]);

	  return Namespace;
	})();

	var SimpleNamespace = (function (_Namespace) {
	  function SimpleNamespace(args) {
	    _classCallCheck(this, SimpleNamespace);

	    _get(Object.getPrototypeOf(SimpleNamespace.prototype), "constructor", this).call(this, args);
	    this.name = this.getDefaultNamespaceName();
	    this.inputs = args;
	    this.num_segments = 1;
	    this.segment_allocations = {};
	    this.current_experiments = {};

	    this._experiment = null;
	    this._default_experiment = null;
	    this.default_experiment_class = DefaultExperiment;
	    this._in_experiment = false;

	    this.setup();
	    this.available_segments = _libUtilsJs.range(this.num_segments);

	    this.setup_experiments();
	  }

	  _inherits(SimpleNamespace, _Namespace);

	  _createClass(SimpleNamespace, [{
	    key: "setup",
	    value: function setup() {
	      throw "IMPLEMENT setup";
	    }
	  }, {
	    key: "setup_experiments",
	    value: function setup_experiments() {
	      throw "IMPLEMENT setup_experiments";
	    }
	  }, {
	    key: "get_primary_unit",
	    value: function get_primary_unit() {
	      return this._primary_unit;
	    }
	  }, {
	    key: "set_primary_unit",
	    value: function set_primary_unit(value) {
	      this._primary_unit = value;
	    }
	  }, {
	    key: "add_experiment",
	    value: function add_experiment(name, exp_object, segments) {
	      var number_available = this.available_segments.length;
	      if (number_available < segments) {
	        return false;
	      } else if (this.current_experiments[name] !== undefined) {
	        return false;
	      }
	      var a = new _assignmentJs2["default"](this.name);
	      a.set("sampled_segments", new _opsRandomJs.Sample({ "choices": this.available_segments, "draws": segments, "unit": name }));
	      var sample = a.get("sampled_segments");
	      for (var i = 0; i < sample.length; i++) {
	        this.segment_allocations[sample[i]] = name;
	        this.available_segments.splice(this.available_segments.indexOf(sample[i]), 1);
	      }
	      this.current_experiments[name] = exp_object;
	    }
	  }, {
	    key: "remove_experiment",
	    value: function remove_experiment(name) {
	      var _this2 = this;

	      if (this.current_experiments[name] === undefined) {
	        return false;
	      }

	      var segments_to_free = [];
	      _libUtilsJs.forEach(Object.keys(this.segment_allocations), function (cur) {
	        if (_this2.segment_allocations[cur] === name) {
	          segments_to_free.push(cur);
	        }
	      });
	      for (var i = 0; i < segments_to_free.length; i++) {
	        var segment = segments_to_free[i];
	        delete this.segment_allocations[segment];
	        this.available_segments.push(segment);
	      }
	      delete this.current_experiments[name];
	      return true;
	    }
	  }, {
	    key: "get_segment",
	    value: function get_segment() {
	      var a = new _assignmentJs2["default"](this.name);
	      var segment = new _opsRandomJs.RandomInteger({ "min": 0, "max": this.num_segments - 1, "unit": this.inputs[this.get_primary_unit()] });
	      a.set("segment", segment);
	      return a.get("segment");
	    }
	  }, {
	    key: "_assign_experiment",
	    value: function _assign_experiment() {
	      var in_experiment = false;
	      var segment = this.get_segment();

	      if (this.segment_allocations[segment] !== undefined) {
	        var experiment_name = this.segment_allocations[segment];
	        var experiment = new this.current_experiments[experiment_name](this.inputs);
	        experiment.set_name("" + this.name + "-" + experiment_name);
	        experiment.set_salt("" + this.name + "-" + experiment_name);
	        this._experiment = experiment;
	        this._in_experiment = experiment.in_experiment();
	        if (!this._in_experiment) {
	          this._assign_default_experiment();
	        }
	      }
	    }
	  }, {
	    key: "_assign_default_experiment",
	    value: function _assign_default_experiment() {
	      this._default_experiment = new this.default_experiment_class(this.inputs);
	    }
	  }, {
	    key: "default_get",
	    value: function default_get(name, default_val) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "require_default_experiment", this).call(this);
	      return this._default_experiment.get(name, default_val);
	    }
	  }, {
	    key: "in_experiment",
	    value: function in_experiment() {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "require_experiment", this).call(this);
	      return this._in_experiment;
	    }
	  }, {
	    key: "set_auto_exposure_logging",
	    value: function set_auto_exposure_logging(value) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "require_experiment", this).call(this);
	      this._experiment.set_auto_exposure_logging(value);
	    }
	  }, {
	    key: "get",
	    value: function get(name, default_val) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "require_experiment", this).call(this);
	      if (!this._experiment) {
	        return this.default_get(name, default_val);
	      } else {
	        return this._experiment.get(name, this.default_get(name, default_val));
	      }
	    }
	  }, {
	    key: "log_exposure",
	    value: function log_exposure(extras) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "require_experiment", this).call(this);
	      if (!this.experiment) {
	        return;
	      }
	      this._experiment.log_exposure(extras);
	    }
	  }, {
	    key: "log_event",
	    value: function log_event(event_type, extras) {
	      _get(Object.getPrototypeOf(SimpleNamespace.prototype), "require_experiment", this).call(this);
	      if (!this._experiment) {
	        return;
	      }
	      this._experiment.log_event(event_type, extras);
	    }
	  }, {
	    key: "getDefaultNamespaceName",

	    //helper function to return the class name of the current experiment class
	    value: function getDefaultNamespaceName() {
	      if (_libUtilsJs.isObject(this) && this.constructor && this !== this.window) {
	        var arr = this.constructor.toString().match(/function\s*(\w+)/);
	        if (arr && arr.length === 2) {
	          return arr[1];
	        }
	      }
	      return "GenericNamespace";
	    }
	  }]);

	  return SimpleNamespace;
	})(Namespace);

	exports.Namespace = Namespace;
	exports.SimpleNamespace = SimpleNamespace;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _opsRandom = __webpack_require__(3);

	var _libUtils = __webpack_require__(8);

	var Assignment = (function () {
	  function Assignment(experiment_salt, overrides) {
	    _classCallCheck(this, Assignment);

	    if (!overrides) {
	      overrides = {};
	    }
	    this.experiment_salt = experiment_salt;
	    this._overrides = _libUtils.shallowCopy(overrides);
	    this._data = _libUtils.shallowCopy(overrides);
	  }

	  _createClass(Assignment, [{
	    key: "evaluate",
	    value: function evaluate(value) {
	      return value;
	    }
	  }, {
	    key: "get_overrides",
	    value: function get_overrides() {
	      return this._overrides;
	    }
	  }, {
	    key: "set_overrides",
	    value: function set_overrides(overrides) {
	      this._overrides = _libUtils.shallowCopy(overrides);
	      var self = this;
	      _libUtils.forEach(Object.keys(this._overrides), function (override_key) {
	        self._data[override_key] = self._overrides[override_key];
	      });
	    }
	  }, {
	    key: "set",
	    value: function set(name, value) {
	      if (name === "_data") {
	        this._data = value;
	        return;
	      } else if (name === "_overrides") {
	        this._overrides = value;
	        return;
	      } else if (name === "experiment_salt") {
	        this.experiment_salt = value;
	        return;
	      }

	      if (this._overrides[name]) {
	        return;
	      }
	      if (value instanceof _opsRandom.PlanOutOpRandom) {
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
	      if (name === "_data") {
	        return this._data;
	      } else if (name === "_overrides") {
	        return this._overrides;
	      } else if (name === "experiment_salt") {
	        return this.experiment_salt;
	      } else {
	        return this._data[name];
	      }
	    }
	  }, {
	    key: "get_params",
	    value: function get_params() {
	      return this._data;
	    }
	  }, {
	    key: "del",
	    value: function del(name) {
	      delete this._data[name];
	    }
	  }, {
	    key: "to_string",
	    value: function to_string() {
	      return String(this._data);
	    }
	  }, {
	    key: "length",
	    value: function length() {
	      return Object.keys(this._data).length;
	    }
	  }]);

	  return Assignment;
	})();

	;

	exports["default"] = Assignment;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _core = __webpack_require__(4);

	var core = _interopRequireWildcard(_core);

	var _random = __webpack_require__(3);

	var random = _interopRequireWildcard(_random);

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
			'>': core.GreaterThan,
			'<': core.LessThan,
			'>=': core.GreaterThanOrEqualTo,
			'<=': core.LessThanOrEqualTo,
			'%': core.Mod,
			'/': core.Divide,
			'not': core.Not,
			'round': core.Round,
			'negative': core.Negative,
			'min': core.Min,
			'max': core.Max,
			'length': core.Length,
			'coalesce': core.Coalesce,
			'cond': core.Cond,
			'product': core.Product,
			'sum': core.Sum,
			'randomFloat': random.RandomFloat,
			'randomInteger': random.RandomInteger,
			'bernoulliTrial': random.BernoulliTrial,
			'bernoulliFilter': random.BernoulliFilter,
			'uniformChoice': random.UniformChoice,
			'weightedChoice': random.WeightedChoice,
			'sample': random.Sample
		};
	};

	var operators = initFactory();

	var isOperator = function isOperator(op) {
		return Object.prototype.toString.call(op) === '[object Object]' && op.op;
	};

	var operatorInstance = function operatorInstance(params) {
		var op = params.op;
		if (!operators[op]) {
			throw 'Unknown Operator {op}';
		}

		return new operators[op](params);
	};

	var StopPlanOutException = function StopPlanOutException(in_experiment) {
		_classCallCheck(this, StopPlanOutException);

		this.in_experiment = in_experiment;
	};

	exports.initFactory = initFactory;
	exports.isOperator = isOperator;
	exports.operatorInstance = operatorInstance;
	exports.StopPlanOutException = StopPlanOutException;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/*  Most of these functions are from the wonderful Underscore package http://underscorejs.org/  
	    This file exists so that the planoutjs library doesn't depend on a few unneeded third party dependencies
	    so that consumers of the library don't have to include dependencies such as underscore. As well, this helps reduce
	    the file size of the resulting library.
	*/

	var deepCopy = function deepCopy(obj) {
	  var newObj = obj;
	  if (obj && typeof obj === 'object') {
	    newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
	    for (var i in obj) {
	      newObj[i] = deepCopy(obj[i]);
	    }
	  }
	  return newObj;
	};

	var isObject = function isObject(obj) {
	  var type = typeof obj;
	  return type === 'function' || type === 'object' && !!obj;
	};

	var isArray = function isArray(object) {
	  if (Array.isArray) {
	    return Array.isArray(object);
	  } else {
	    return Object.prototype.toString.call(planout_code) === '[object Array]';
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
	  for (var key in obj) if (has(obj, key)) keys.push(key);

	  if (hasEnumBug) collectNonEnumProps(obj, keys);

	  return keys;
	};

	var allKeys = function allKeys(obj) {
	  if (!isObject(obj)) return [];
	  var keys = [];
	  for (var key in obj) keys.push(key);

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
	    var keys = keys(obj);
	    for (i = 0, length = keys.length; i < length; i++) {
	      iteratee(obj[keys[i]], keys[i], obj);
	    }
	  }
	  return obj;
	};

	//map functionality from underscore
	var map = function map(obj, iteratee, context) {
	  iteratee = cb(iteratee, context);
	  var keys = !isArrayLike(obj) && keys(obj),
	      length = (keys || obj).length,
	      results = Array(length);
	  for (var index = 0; index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
	    results[index] = iteratee(obj[currentKey], currentKey, obj);
	  }
	  return results;
	};

	//reduce functionality from underscore
	var reduce = function reduce(obj, iteratee, memo, context) {
	  iteratee = optimizeCb(iteratee, context, 4);
	  var keys = !isArrayLike(obj) && keys(obj),
	      length = (keys || obj).length,
	      index = 0;

	  if (arguments.length < 3) {
	    memo = obj[keys ? keys[index] : index];
	    index += 1;
	  }
	  for (; index >= 0 && index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
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
	var hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
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
	  if (!isArrayLike(obj)) obj = values(obj);
	  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	  return obj.indexOf(item) >= 0;
	};

	var vals = function vals(obj) {
	  var keys = _.keys(obj);
	  var length = keys.length;
	  var values = Array(length);
	  for (var i = 0; i < length; i++) {
	    values[i] = obj[keys[i]];
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

	exports['default'] = { deepCopy: deepCopy, map: map, reduce: reduce, forEach: forEach, shallowCopy: shallowCopy, extend: extend, isObject: isObject, isArray: isArray, range: range };
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _libUtils = __webpack_require__(8);

	var PlanOutOp = (function () {
		function PlanOutOp(args) {
			_classCallCheck(this, PlanOutOp);

			this.args = args;
		}

		_createClass(PlanOutOp, [{
			key: "execute",
			value: function execute(mapper) {
				throw "Implement this function";
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
				if (Object.prototype.toString.call(cur) !== "[object Array]") {
					throw name + " is not a list";
				}
				return cur;
			}
		}, {
			key: "getArgObject",
			value: function getArgObject(name) {
				var cur = this.getArgMixed(name);
				if (Object.prototype.toString.call(cur) !== "[object Object]") {
					throw name + " is not an object.";
				}
				return cur;
			}
		}, {
			key: "getArgIndexish",
			value: function getArgIndexish(name) {
				var cur = this.getArgMixed(name);
				var type = Object.prototype.toString.call(cur);
				if (type !== "[object Object]" && type !== "[object Array]") {
					throw name + " is not an list or object.";
				}
				return cur;
			}
		}]);

		return PlanOutOp;
	})();

	;

	var PlanOutOpSimple = (function (_PlanOutOp) {
		function PlanOutOpSimple() {
			_classCallCheck(this, PlanOutOpSimple);

			if (_PlanOutOp != null) {
				_PlanOutOp.apply(this, arguments);
			}
		}

		_inherits(PlanOutOpSimple, _PlanOutOp);

		_createClass(PlanOutOpSimple, [{
			key: "execute",
			value: function execute(mapper) {
				this.mapper = mapper;
				var self = this;
				_libUtils.forEach(Object.keys(this.args), function (key) {
					self.args[key] = mapper.evaluate(self.args[key]);
				});
				return this.simpleExecute();
			}
		}]);

		return PlanOutOpSimple;
	})(PlanOutOp);

	var PlanOutOpUnary = (function (_PlanOutOpSimple) {
		function PlanOutOpUnary() {
			_classCallCheck(this, PlanOutOpUnary);

			if (_PlanOutOpSimple != null) {
				_PlanOutOpSimple.apply(this, arguments);
			}
		}

		_inherits(PlanOutOpUnary, _PlanOutOpSimple);

		_createClass(PlanOutOpUnary, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				return this.unaryExecute(this.getArgMixed("value"));
			}
		}, {
			key: "getUnaryString",
			value: function getUnaryString() {
				return this.args.op;
			}
		}, {
			key: "unaryExecute",
			value: function unaryExecute(value) {
				throw "implement this";
			}
		}]);

		return PlanOutOpUnary;
	})(PlanOutOpSimple);

	var PlanOutOpBinary = (function (_PlanOutOpSimple2) {
		function PlanOutOpBinary() {
			_classCallCheck(this, PlanOutOpBinary);

			if (_PlanOutOpSimple2 != null) {
				_PlanOutOpSimple2.apply(this, arguments);
			}
		}

		_inherits(PlanOutOpBinary, _PlanOutOpSimple2);

		_createClass(PlanOutOpBinary, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				var left = this.getArgMixed("left");
				return this.binaryExecute(this.getArgMixed("left"), this.getArgMixed("right"));
			}
		}, {
			key: "getInfixString",
			value: function getInfixString() {
				return this.args.op;
			}
		}, {
			key: "binaryExecute",
			value: function binaryExecute(left, right) {
				throw "implement this";
			}
		}]);

		return PlanOutOpBinary;
	})(PlanOutOpSimple);

	var PlanOutOpCommutative = (function (_PlanOutOpSimple3) {
		function PlanOutOpCommutative() {
			_classCallCheck(this, PlanOutOpCommutative);

			if (_PlanOutOpSimple3 != null) {
				_PlanOutOpSimple3.apply(this, arguments);
			}
		}

		_inherits(PlanOutOpCommutative, _PlanOutOpSimple3);

		_createClass(PlanOutOpCommutative, [{
			key: "simpleExecute",
			value: function simpleExecute() {
				return this.commutativeExecute(this.getArgList("values"));
			}
		}, {
			key: "getCommutativeString",
			value: function getCommutativeString() {
				return this.args.op;
			}
		}, {
			key: "commutativeExecute",
			value: function commutativeExecute(values) {
				throw "implement this";
			}
		}]);

		return PlanOutOpCommutative;
	})(PlanOutOpSimple);

	exports.PlanOutOp = PlanOutOp;
	exports.PlanOutOpSimple = PlanOutOpSimple;
	exports.PlanOutOpCommutative = PlanOutOpCommutative;
	exports.PlanOutOpBinary = PlanOutOpBinary;
	exports.PlanOutOpUnary = PlanOutOpUnary;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {(function() {
	  var crypt = __webpack_require__(13),
	      utf8 = __webpack_require__(14).utf8,
	      bin = __webpack_require__(14).bin,

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ },
/* 11 */
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(17)
	var ieee754 = __webpack_require__(15)
	var isArray = __webpack_require__(16)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff
	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = String(string)

	  if (string.length === 0) return 0

	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      return string.length
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return string.length * 2
	    case 'hex':
	      return string.length >>> 1
	    case 'utf8':
	    case 'utf-8':
	      return utf8ToBytes(string).length
	    case 'base64':
	      return base64ToBytes(string).length
	    default:
	      return string.length
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function toString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).Buffer))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ }
/******/ ])
});
;