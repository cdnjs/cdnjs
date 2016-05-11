/*!
 * vue-validator v2.0.0-alpha.2
 * (c) 2015 kazuya kawaguchi
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-validator"] = factory();
	else
		root["vue-validator"] = factory();
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
	exports['default'] = install;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	var _asset = __webpack_require__(2);

	var _asset2 = _interopRequireDefault(_asset);

	var _override = __webpack_require__(4);

	var _override2 = _interopRequireDefault(_override);

	var _directivesValidate = __webpack_require__(5);

	var _directivesValidate2 = _interopRequireDefault(_directivesValidate);

	var _directivesValidator = __webpack_require__(7);

	var _directivesValidator2 = _interopRequireDefault(_directivesValidator);

	var _validation = __webpack_require__(6);

	var _validation2 = _interopRequireDefault(_validation);

	/**
	 * Install
	 *
	 * @param {Function} Vue
	 * @param {Object} options
	 */

	function install(Vue) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (install.installed) {
	    (0, _util.warn)('already installed.');
	    return;
	  }

	  _util2['default'].Vue = Vue;
	  (0, _asset2['default'])(Vue);

	  (0, _override2['default'])(Vue);
	  (0, _directivesValidator2['default'])(Vue);
	  (0, _directivesValidate2['default'])(Vue);
	}

	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Utilties
	 */

	// export default for holding the Vue reference
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.warn = warn;
	exports.each = each;
	exports.pull = pull;
	exports.attr = attr;
	exports.trigger = trigger;
	var _exports = {};
	exports['default'] = _exports;

	/**
	 * warn
	 *
	 * @param {String} msg
	 * @param {Error} [err]
	 *
	 */

	function warn(msg, err) {
	  if (window.console) {
	    console.warn('[vue-validator] ' + msg);
	    if (err) {
	      console.warn(err.stack);
	    }
	  }
	}

	/**
	 * each
	 *
	 * @param {Array|Object} target
	 * @param {Function} iterator
	 * @param {Object} [context]
	 */

	function each(target, iterator, context) {
	  if (Array.isArray(target)) {
	    for (var i = 0; i < target.length; i++) {
	      iterator.call(context || target[i], target[i], i);
	    }
	  } else if (_exports.Vue.util.isPlainObject(target)) {
	    for (var key in target) {
	      if (key in target) {
	        iterator.call(context || target[key], target[key], key);
	      }
	    }
	  }
	}

	/**
	 * pull
	 *
	 * @param {Array} arr
	 * @param {Object} item
	 * @return {Object|null}
	 */

	function pull(arr, item) {
	  var index = _exports.Vue.util.indexOf(arr, item);
	  return ~index ? arr.splice(index, 1) : null;
	}

	/**
	 * attr
	 *
	 * @param {Element} el
	 * @param {String} name
	 * @return {String|null}
	 */

	function attr(el, name) {
	  return el ? el.getAttribute(name) : null;
	}

	/**
	 * trigger
	 *
	 * @param {Element} el
	 * @param {String} event
	 */

	function trigger(el, event) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(event, true, false);
	  el.dispatchEvent(e);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _validators = __webpack_require__(3);

	var validators = _interopRequireWildcard(_validators);

	exports['default'] = function (Vue) {

	  // register validator asset
	  Vue.config._assetTypes.push('validator');

	  // set global validators asset
	  Vue.options.validators = validators;

	  // set option merge strategy
	  var strats = Vue.config.optionMergeStrategies;
	  if (strats) {
	    strats.validators = strats.methods;
	  }

	  /**
	   * Register or retrieve a global validator definition.
	   *
	   * @param {String} id
	   * @param {Function} definition
	   */

	  Vue.validator = function (id, definition) {
	    if (!definition) {
	      return Vue.options['validators'][id];
	    } else {
	      Vue.options['validators'][id] = definition;
	    }
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Fundamental validate functions
	 */

	/**
	 * required
	 *
	 * This function validate whether the value has been filled out.
	 *
	 * @param val
	 * @return {Boolean}
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.required = required;
	exports.pattern = pattern;
	exports.minlength = minlength;
	exports.maxlength = maxlength;
	exports.min = min;
	exports.max = max;

	function required(val) {
	  if (Array.isArray(val)) {
	    return val.length > 0;
	  } else if (typeof val === 'number' || typeof val === 'function') {
	    return true;
	  } else if (typeof val === 'boolean') {
	    return val;
	  } else if (typeof val === 'string') {
	    return val.length > 0;
	  } else if (val !== null && typeof val === 'object') {
	    return Object.keys(val).length > 0;
	  } else if (val === null || val === undefined) {
	    return false;
	  }
	}

	/**
	 * pattern
	 *
	 * This function validate whether the value matches the regex pattern
	 *
	 * @param val
	 * @param {String} pat
	 * @return {Boolean}
	 */

	function pattern(val, pat) {
	  if (typeof pat !== 'string') {
	    return false;
	  }

	  var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'));
	  if (!match) {
	    return false;
	  }

	  return new RegExp(match[1], match[2]).test(val);
	}

	/**
	 * minlength
	 *
	 * This function validate whether the minimum length of the string.
	 *
	 * @param {String} val
	 * @param {String|Number} min
	 * @return {Boolean}
	 */

	function minlength(val, min) {
	  return typeof val === 'string' && isInteger(min, 10) && val.length >= parseInt(min, 10);
	}

	/**
	 * maxlength
	 *
	 * This function validate whether the maximum length of the string.
	 *
	 * @param {String} val
	 * @param {String|Number} max
	 * @return {Boolean}
	 */

	function maxlength(val, max) {
	  return typeof val === 'string' && isInteger(max, 10) && val.length <= parseInt(max, 10);
	}

	/**
	 * min
	 *
	 * This function validate whether the minimum value of the numberable value.
	 *
	 * @param {*} val
	 * @param {*} arg minimum
	 * @return {Boolean}
	 */

	function min(val, arg) {
	  return !isNaN(+val) && !isNaN(+arg) && +val >= +arg;
	}

	/**
	 * max
	 *
	 * This function validate whether the maximum value of the numberable value.
	 *
	 * @param {*} val
	 * @param {*} arg maximum
	 * @return {Boolean}
	 */

	function max(val, arg) {
	  return !isNaN(+val) && !isNaN(+arg) && +val <= +arg;
	}

	/**
	 * isInteger
	 *
	 * This function check whether the value of the string is integer.
	 *
	 * @param {String} val
	 * @return {Boolean}
	 * @private
	 */

	function isInteger(val) {
	  return (/^(-?[1-9]\d*|0)$/.test(val)
	  );
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _util = __webpack_require__(1);

	exports['default'] = function (Vue) {

	  // override _init
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    if (!this._validatorMaps) {
	      this._validatorMaps = Object.create(null);
	    }
	    init.call(this, options);
	  };

	  // override _destroy
	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    this._validatorMaps = null;
	    destroy.call(this);
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _util = __webpack_require__(1);

	var _validation = __webpack_require__(6);

	var _validation2 = _interopRequireDefault(_validation);

	exports['default'] = function (Vue) {

	  var _ = Vue.util;

	  Vue.directive('validate', {
	    params: ['group'],

	    bind: function bind() {
	      //console.log('validate:bind', this, this.arg)
	      var vm = this.vm;
	      var validatorName = vm.$options._validator;
	      if (!validatorName) {
	        // TODO: should be implemented error message
	        _.warn('TODO: should be implemented error message');
	        return;
	      }

	      var validator = this.validator = this.vm._validatorMaps[validatorName];
	      var validation = this.validation = new _validation2['default'](this);
	      validator.addValidation(validation);

	      if (this.params.group) {
	        validator.addGroupValidation(this.params.group, validation);
	      }

	      this.on('blur', _.bind(this.validation.listener, this.validation));
	      this.on('input', _.bind(this.validation.listener, this.validation));
	    },

	    update: function update(value, old) {
	      //console.log('validate:update', this.arg, value, old, typeof value, JSON.stringify(value))
	      if (!value) {
	        return;
	      }

	      if (_.isPlainObject(value)) {
	        this.handleObject(value);
	      } else {
	        this.handleSingle(value);
	      }

	      this.validator.validate(this.validation);
	    },

	    handleSingle: function handleSingle(value) {
	      var validateKey = Object.keys(this.validation.validates)[0];
	      this.validation.updateValidate(validateKey, value);
	    },

	    handleObject: function handleObject(value) {
	      var _this = this;

	      (0, _util.each)(value, function (val, key) {
	        if (_.isPlainObject(val)) {
	          if ('rule' in val) {
	            _this.validation.updateValidate(key, val.rule);
	          }
	        } else {
	          _this.validation.updateValidate(key, val);
	        }
	      }, this);
	    },

	    unbind: function unbind() {
	      //console.log('validate:unbind', this)
	      if (this.validator && this.validation) {
	        if (this.params.group) {
	          this.validator.removeGroupValidation(this.params.group, this.validation);
	        }
	        this.validator.removeValidation(this.validation);
	        this.validator = null;
	        this.validation = null;
	      }
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	/**
	 * Validation class
	 */

	var Validation = (function () {
	  function Validation(dir) {
	    _classCallCheck(this, Validation);

	    this.model = dir.arg;
	    this.el = dir.el;
	    this.dir = dir;
	    this.init = dir.el.value;
	    this.touched = false;
	    this.dirty = false;
	    this.modified = false;
	    this.validates = this._buildValidates(dir);
	  }

	  _createClass(Validation, [{
	    key: '_buildValidates',
	    value: function _buildValidates(dir) {
	      var arg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	      var resolveAsset = _util2['default'].Vue.util.resolveAsset;
	      var camelize = _util2['default'].Vue.util.camelize;

	      var ret = Object.create(null);
	      var validates = dir.modifiers;

	      for (var validate in validates) {
	        var fn = resolveAsset(dir.vm.$options, 'validators', camelize(validate));
	        if (fn) {
	          ret[validate] = { arg: arg, fn: fn };
	        }
	      }

	      return ret;
	    }
	  }, {
	    key: 'updateValidate',
	    value: function updateValidate(name, arg, fn) {
	      if (this.validates[name]) {
	        this.validates[name].arg = arg;
	        if (fn) {
	          this.validates[name].fn = fn;
	        }
	      }
	    }
	  }, {
	    key: 'listener',
	    value: function listener(e) {
	      //console.log('input event', e.type)
	      if (e.relatedTarget && (e.relatedTarget.tagName === 'A' || e.relatedTarget.tagName === 'BUTTON')) {
	        return;
	      }

	      if (e.type === 'blur') {
	        this.touched = true;
	      }

	      if (!this.dirty && this.el.value !== this.init) {
	        this.dirty = true;
	      }

	      this.modified = this.el.value !== this.init;

	      this.dir.validator.validate();
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {
	      var _this = this;

	      var extend = _util2['default'].Vue.util.extend;
	      var ret = {};
	      var valid = true;

	      (0, _util.each)(this.validates, function (descriptor, name) {
	        var res = descriptor.fn(_this.el.value, descriptor.arg);
	        if (!res) {
	          valid = false;
	        }
	        ret[name] = !res;
	      }, this);

	      (0, _util.trigger)(this.el, valid ? 'valid' : 'invalid');

	      extend(ret, {
	        valid: valid,
	        invalid: !valid,
	        touched: this.touched,
	        untouched: !this.touched,
	        dirty: this.dirty,
	        pristine: !this.dirty,
	        modified: this.modified
	      });

	      return ret;
	    }
	  }]);

	  return Validation;
	})();

	exports['default'] = Validation;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _util = __webpack_require__(1);

	var _validator = __webpack_require__(8);

	var _validator2 = _interopRequireDefault(_validator);

	exports['default'] = function (Vue) {
	  var _ = Vue.util;
	  var FragmentFactory = Vue.FragmentFactory;
	  var vIf = Vue.directive('if');

	  Vue.elementDirective('validator', {
	    params: ['name', 'groups'],

	    bind: function bind() {
	      if (!this.params.name) {
	        // TODO: should be implemented validator:bind name params nothing error'
	        _.warn('TODO: should be implemented validator:bind name params nothing error');
	        return;
	      }

	      var validatorName = this.validatorName = '$' + this.params.name;
	      if (!this.vm._validatorMaps) {
	        // TODO: should be implemented error message'
	        _.warn('TODO: should be implemented error message');
	        return;
	      }

	      var groups = [];
	      if (this.params.groups) {
	        if (_.isArray(this.params.groups)) {
	          groups = this.params.groups;
	        } else if (!_.isPlainObject(this.params.groups) && typeof this.params.groups === 'string') {
	          groups.push(this.params.groups);
	        }
	      }

	      var validator = this.validator = new _validator2['default'](validatorName, this, groups);
	      validator.enableReactive();
	      validator.setupScope();

	      this.anchor = _.createAnchor('vue-validator');
	      _.replace(this.el, this.anchor);
	      this.insert(validatorName);

	      this.vm.$on('hook:compiled', function () {
	        validator.validate();
	      });
	    },

	    insert: function insert(name) {
	      _.extend(this.vm.$options, { _validator: name });
	      this.factory = new FragmentFactory(this.vm, this.el.innerHTML);
	      vIf.insert.call(this);
	    },

	    unbind: function unbind() {
	      vIf.unbind.call(this);

	      this.validator.disableReactive();

	      if (this.validatorName) {
	        this.validatorName = null;
	        this.validator = null;
	      }
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	/**
	 * Validator class
	 */

	var Validator = (function () {
	  function Validator(name, dir, groups) {
	    var _this = this;

	    _classCallCheck(this, Validator);

	    this.name = name;
	    this.scope = {}; // TODO: change to Object.create(null)
	    //this.scope = Object.create(null)
	    //this.scope.a = 1

	    this._dir = dir;
	    this._validations = [];
	    this._groups = groups;

	    this._groupValidations = Object.create(null);
	    (0, _util.each)(groups, function (group) {
	      _this._groupValidations[group] = [];
	    }, this);
	  }

	  _createClass(Validator, [{
	    key: 'enableReactive',
	    value: function enableReactive() {
	      _util2['default'].Vue.util.defineReactive(this._dir.vm, this.name, this.scope);
	      this._dir.vm._validatorMaps[this.name] = this;
	    }
	  }, {
	    key: 'disableReactive',
	    value: function disableReactive() {
	      this._dir.vm._validatorMaps[this.name] = null;
	      this._dir.vm[this.name] = null;
	    }
	  }, {
	    key: 'addValidation',
	    value: function addValidation(validation) {
	      this._validations.push(validation);
	    }
	  }, {
	    key: 'removeValidation',
	    value: function removeValidation(validation) {
	      _util2['default'].Vue.util['delete'](this.scope, validation.model);
	      (0, _util.pull)(this._validations, validation);
	    }
	  }, {
	    key: 'addGroupValidation',
	    value: function addGroupValidation(group, validation) {
	      var validations = this._groupValidations[group];
	      if (validations) {
	        validations.push(validation);
	      }
	    }
	  }, {
	    key: 'removeGroupValidation',
	    value: function removeGroupValidation(group, validation) {
	      var validations = this._groupValidations[group];
	      if (validations) {
	        (0, _util.pull)(validations, validation);
	      }
	    }
	  }, {
	    key: 'validate',
	    value: function validate(validation) {
	      var _this2 = this;

	      (0, _util.each)(this._validations, function (validation, index) {
	        var res = validation.validate();
	        _util2['default'].Vue.util.set(_this2.scope, validation.model, res);
	      }, this);
	    }
	  }, {
	    key: 'setupScope',
	    value: function setupScope() {
	      var _this3 = this;

	      this._defineProperties(this._validations, this.scope);

	      (0, _util.each)(this._groups, function (name) {
	        var validations = _this3._groupValidations[name];
	        var group = Object.create(null);
	        _util2['default'].Vue.util.set(_this3.scope, name, group);
	        _this3._defineProperties(validations, group);
	      }, this);
	    }
	  }, {
	    key: '_defineProperties',
	    value: function _defineProperties(validations, target) {
	      var _this4 = this;

	      var bind = _util2['default'].Vue.util.bind;

	      (0, _util.each)({
	        valid: { fn: this._defineValid, arg: validations },
	        invalid: { fn: this._defineInvalid, arg: target },
	        touched: { fn: this._defineTouched, arg: validations },
	        untouched: { fn: this._defineUntouched, arg: target },
	        modified: { fn: this._defineModified, arg: validations },
	        dirty: { fn: this._defineDirty, arg: validations },
	        pristine: { fn: this._definePristine, arg: target }
	      }, function (descriptor, name) {
	        Object.defineProperty(target, name, {
	          enumerable: true,
	          configurable: true,
	          get: function get() {
	            return bind(descriptor.fn, _this4)(descriptor.arg);
	          }
	        });
	      }, this);
	    }
	  }, {
	    key: '_walkValidations',
	    value: function _walkValidations(validations, property, condition) {
	      var _this5 = this;

	      var ret = condition;

	      (0, _util.each)(validations, function (validation, index) {
	        if (ret === !condition) {
	          return;
	        }
	        if (Object.prototype.hasOwnProperty.call(_this5.scope, validation.model)) {
	          var target = _this5.scope[validation.model];
	          if (target && target[property] === !condition) {
	            ret = !condition;
	          }
	        }
	      }, this);

	      return ret;
	    }
	  }, {
	    key: '_defineValid',
	    value: function _defineValid(validations) {
	      return this._walkValidations(validations, 'valid', true);
	    }
	  }, {
	    key: '_defineInvalid',
	    value: function _defineInvalid(scope) {
	      return !scope.valid;
	    }
	  }, {
	    key: '_defineTouched',
	    value: function _defineTouched(validations) {
	      return this._walkValidations(validations, 'touched', false);
	    }
	  }, {
	    key: '_defineUntouched',
	    value: function _defineUntouched(scope) {
	      return !scope.touched;
	    }
	  }, {
	    key: '_defineModified',
	    value: function _defineModified(validations) {
	      return this._walkValidations(validations, 'modified', false);
	    }
	  }, {
	    key: '_defineDirty',
	    value: function _defineDirty(validations) {
	      return this._walkValidations(validations, 'dirty', false);
	    }
	  }, {
	    key: '_definePristine',
	    value: function _definePristine(scope) {
	      return !scope.dirty;
	    }
	  }]);

	  return Validator;
	})();

	exports['default'] = Validator;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;