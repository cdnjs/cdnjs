/**
 * vue-validator v0.11.0
 * (c) 2014 kazuya kawaguchi
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["vue-validator"] = factory();
	else
		root["vue-validator"] = factory();
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
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Export(s)
	 */

	module.exports = install


	/**
	 * Install plugin
	 */

	function install (Vue, options) {
	  options = options || {}
	  var componentName = options.component = options.component || '$validator'
	  var directiveName = options.directive = options.directive || 'validate'

	  Vue.directive(directiveName, {
	    priority: 1024,

	    bind: function () {
	      var vm = this.vm
	      
	      if (!vm[componentName]) {
	        vm[componentName] = vm.$addChild({
	          validator: vm.$options.validator
	        }, Vue.extend(__webpack_require__(1)))
	      }

	      var $validator = vm[componentName]
	      var el = this.el
	      var validation = $validator._getValidationNamespace('validation')
	      var model = this._parseModelAttribute(el.getAttribute(Vue.config.prefix + 'model'))
	      var validator = this.arg ? this.arg : this.expression
	      var arg = this.arg ? this.expression : null
	      var init = el.getAttribute('value') || vm[model]

	      if (!$validator[validation][model]) {
	        $validator._defineModelValidationScope(model, init)
	      }

	      if (!$validator[validation][model][validator]) {
	        $validator._defineValidatorToValidationScope(model, validator)
	        $validator._addValidators(model, validator, arg)
	      }

	      $validator._doValidate(model, init, $validator[model])
	    },

	    unbind: function () {
	      var vm = this.vm
	      var $validator = vm[componentName]

	      if ($validator) {
	        $validator.$destroy()
	        vm[componentName] = null
	        delete vm[componentName]
	      }
	    },

	    _parseModelAttribute: function (attr) {
	      var res = Vue.parsers.directive.parse(attr)
	      return res[0].arg ? res[0].arg : res[0].expression
	    }
	  })
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Import(s)
	 */

	var validates = __webpack_require__(2)


	/**
	 * Export(s)
	 */


	/**
	 * `v-validator` component with mixin
	 */

	module.exports = {
	  inherit: true,

	  created: function () {
	    this._initValidationVariables()
	    this._initOptions()
	    this._mixinCustomValidates()
	    this._defineProperties()
	    this._defineValidationScope()
	  },

	  methods: {
	    _getValidationNamespace: function (key) {
	      return this.$options.validator.namespace[key]
	    },

	    _initValidationVariables: function () {
	      this._validators = {}
	      this._validates = validates
	    },

	    _initOptions: function () {
	      var validator = this.$options.validator = this.$options.validator || {}
	      var namespace = validator.namespace = validator.namespace || {}
	      namespace.validation = namespace.validation || 'validation'
	      namespace.valid = namespace.valid || 'valid'
	      namespace.invalid = namespace.invalid || 'invalid'
	      namespace.dirty = namespace.dirty || 'dirty'
	    },

	    _mixinCustomValidates: function () {
	      var validates = this.$options.validator.validates
	      for (var key in validates) {
	        this._validates[key] = validates[key]
	      }
	    },

	    _defineValidProperty: function (target, getter) {
	      Object.defineProperty(target, this._getValidationNamespace('valid'), {
	        enumerable: true,
	        configurable: true,
	        get: getter
	      })
	    },

	    _defineInvalidProperty: function (target) {
	      var self = this
	      Object.defineProperty(target, this._getValidationNamespace('invalid'), {
	        enumerable: true,
	        configurable: true,
	        get: function () {
	          return !this[self._getValidationNamespace('valid')]
	        }
	      })
	    },

	    _defineProperties: function () {
	      var $validator = this
	      this._defineValidProperty(this.$parent, function () {
	        var self = this
	        var ret = true
	        var validationName = $validator._getValidationNamespace('validation')
	        var validName = $validator._getValidationNamespace('valid')

	        Object.keys(this[validationName]).forEach(function (model) {
	          if (!self[validationName][model][validName]) {
	            ret = false
	          }
	        })
	        return ret
	      })

	      this._defineInvalidProperty(this.$parent)
	    },

	    _defineValidationScope: function () {
	      this.$parent.$add(this._getValidationNamespace('validation'), {})
	    },

	    _defineModelValidationScope: function (key, init) {
	      var self = this
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      this[validationName].$add(key, {})
	      this[validationName][key].$add(dirtyName, false)
	      this._defineValidProperty(this[validationName][key], function () {
	        var ret = true
	        var validators = self._validators[key]
	        validators.forEach(function (validator) {
	          if (self[validationName][key][validator.name]) {
	            ret = false
	          }
	        })
	        return ret
	      })
	      this._defineInvalidProperty(this[validationName][key])
	      
	      this._validators[key] = []

	      this._watchModel(key, function (val, old) {
	        self._doValidate(key, init, val)
	      })
	    },

	    _defineValidatorToValidationScope: function (target, validator) {
	      this[this._getValidationNamespace('validation')][target].$add(validator, null)
	    },

	    _addValidators: function (target, validator, arg) {
	      this._validators[target].push({ name: validator, arg: arg })
	    },

	    _watchModel: function (key, fn) {
	      this.$watch(key, fn, false, true)
	    },

	    _doValidate: function (model, init, val) {
	      var self = this
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      this[validationName][model][dirtyName] = (init !== val)
	      this._validators[model].forEach(function (validator) {
	        self[validationName][model][validator.name] = 
	          !self._validates[validator.name].call(self, val, validator.arg)
	      })
	    }
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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

	function required (val) {
	  return !val ? false : true
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

	function pattern (val, pat) {
	  if (typeof(pat) !== 'string') { return false }

	  var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'))
	  if (!match) { return false }

	  return new RegExp(match[1], match[2]).test(val)
	}


	/**
	 * minLength
	 *
	 * This function validate whether the minimum length of the string.
	 *
	 * @param {String} val
	 * @param {String} min
	 * @return {Boolean}
	 */

	function minLength (val, min) {
	  return typeof(val) === 'string' && isInteger(min) && val.length >= parseInt(min)
	}


	/**
	 * maxLength
	 *
	 * This function validate whether the maximum length of the string.
	 *
	 * @param {String} val
	 * @param {String} max
	 * @return {Boolean}
	 */

	function maxLength (val, max) {
	  return typeof(val) === 'string' && isInteger(max) && val.length <= parseInt(max)
	}


	/**
	 * min
	 *
	 * This function validate whether the minimum value of the integer string.
	 *
	 * @param {String} val
	 * @param {String} arg minimum
	 * @return {Boolean}
	 */

	function min (val, arg) {
	  return typeof(val) === 'string' && isInteger(val) && 
	    isInteger(arg) && parseInt(val) >= parseInt(arg)
	}


	/**
	 * max
	 *
	 * This function validate whether the maximum value of the integer string.
	 *
	 * @param {String} val
	 * @param {String} arg maximum
	 * @return {Boolean}
	 */

	function max (val, arg) {
	  return typeof(val) === 'string' && isInteger(val) && 
	    isInteger(arg) && parseInt(val) <= parseInt(arg)
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

	function isInteger (val) {
	  return /^(-?[1-9]\d*|0)$/.test(val)
	}


	/**
	 * export(s)
	 */
	module.exports = {
	  required: required,
	  pattern: pattern,
	  minLength: minLength,
	  maxLength: maxLength,
	  min: min,
	  max: max
	}


/***/ }
/******/ ])
});
