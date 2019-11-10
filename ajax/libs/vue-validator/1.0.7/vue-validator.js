/**
 * vue-validator v1.0.7
 * (c) 2014-2015 kazuya kawaguchi
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
	  var path = Vue.parsers.path

	  function getVal (obj, keypath) {
	    var ret = null
	    try {
	      ret = path.get(obj, keypath)
	    } catch (e) { }
	    return ret
	  }

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
	      var keypath = this._keypath = this._parseModelAttribute(el.getAttribute(Vue.config.prefix + 'model'))
	      var validator = this.arg ? this.arg : this.expression
	      var arg = this.arg ? this.expression : null
	      var init = el.getAttribute('value') || vm.$get(keypath)

	      if (!getVal($validator[validation], keypath)) {
	        $validator._defineModelValidationScope(keypath, init)
	      }

	      if (!getVal($validator[validation], keypath + '.' + validator)) {
	        $validator._defineValidatorToValidationScope(keypath, validator)
	        $validator._addValidators(keypath, validator, arg)
	      }

	      $validator._addManagedValidator(keypath, validator)

	      $validator._doValidate(keypath, init, $validator.$get(keypath))
	    },

	    unbind: function () {
	      var vm = this.vm
	      var keypath = this._keypath
	      var validator = this.arg ? this.arg : this.expression
	      var $validator = vm[componentName]

	      $validator._undefineValidatorToValidationScope(keypath, validator)
	      $validator._deleteManagedValidator(keypath, validator)

	      if (!$validator._isManagedValidator()) {
	        for (var key in $validator.validation) {
	          $validator._undefineModelValidationScope(key)
	        }
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

	  beforeDestroy: function () {
	    this._undefineProperties()
	    this._undefineValidationScope()
	  },

	  methods: {
	    _getValidationNamespace: function (key) {
	      return this.$options.validator.namespace[key]
	    },

	    _initValidationVariables: function () {
	      this._validators = {}
	      this._validates = {}
	      for (var key in validates) {
	        this._validates[key] = validates[key]
	      }
	      this._validatorWatchers = {}
	      this._managedValidator = {}
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
	      var customs = this.$options.validator.validates
	      for (var key in customs) {
	        this._validates[key] = customs[key]
	      }
	    },

	    _defineValidProperty: function (target, getter) {
	      Object.defineProperty(target, this._getValidationNamespace('valid'), {
	        enumerable: true,
	        configurable: true,
	        get: getter
	      })
	    },

	    _undefineValidProperty: function (target) {
	      delete target[this._getValidationNamespace('valid')]
	    },

	    _defineInvalidProperty: function (target) {
	      var self = this
	      Object.defineProperty(target, this._getValidationNamespace('invalid'), {
	        enumerable: true,
	        configurable: true,
	        get: function () {
	          return !target[self._getValidationNamespace('valid')]
	        }
	      })
	    },

	    _undefineInvalidProperty: function (target) {
	      delete target[this._getValidationNamespace('invalid')]
	    },

	    _defineDirtyProperty: function (target, getter) {
	      Object.defineProperty(target, this._getValidationNamespace('dirty'), {
	        enumerable: true,
	        configurable: true,
	        get: getter
	      })
	    },

	    _undefineDirtyProperty: function (target) {
	      delete target[this._getValidationNamespace('dirty')]
	    },

	    _defineProperties: function () {
	      var self = this

	      var walk = function (obj, propName, namespaces) {
	        var ret = true
	        var keys = Object.keys(obj)
	        var i = keys.length
	        var key, last
	        while (i--) {
	          key = keys[i]
	          last = obj[key]
	          if (!(key in namespaces) && typeof last === 'object') {
	            ret = walk(last, propName, namespaces)
	            if (!ret) { break }
	          } else if (key === propName && typeof last !== 'object') {
	            ret = last
	            if (!ret) { break }
	          }
	        }
	        return ret
	      }

	      this._defineValidProperty(this.$parent, function () {
	        var validationName = self._getValidationNamespace('validation')
	        var validName = self._getValidationNamespace('valid')
	        var namespaces = self.$options.validator.namespace

	        return walk(this[validationName], validName, namespaces)
	      })

	      this._defineInvalidProperty(this.$parent)

	      this._defineDirtyProperty(this.$parent, function () {
	        var validationName = self._getValidationNamespace('validation')
	        var dirtyName = self._getValidationNamespace('dirty')
	        var namespaces = self.$options.validator.namespace

	        return walk(this[validationName], dirtyName, namespaces)
	      })
	    },

	    _undefineProperties: function () {
	      this._undefineDirtyProperty(this.$parent)
	      this._undefineInvalidProperty(this.$parent)
	      this._undefineValidProperty(this.$parent)
	    },

	    _defineValidationScope: function () {
	      this.$parent.$add(this._getValidationNamespace('validation'), {})
	    },

	    _undefineValidationScope: function () {
	      this.$parent.$delete(this._getValidationNamespace('validation'))
	    },

	    _defineModelValidationScope: function (keypath, init) {
	      var self = this
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      var keys = keypath.split('.')
	      var last = this[validationName]
	      var obj, key
	      for (var i = 0; i < keys.length; i++) {
	        key = keys[i]
	        obj = last[key]
	        if (!obj) {
	          obj = {}
	          last.$add(key, obj)
	        }
	        last = obj
	      }
	      last.$add(dirtyName, false)

	      this._defineValidProperty(last, function () {
	        var ret = true
	        var validators = self._validators[keypath]
	        var i = validators.length
	        var validator
	        while (i--) {
	          validator = validators[i]
	          if (last[validator.name]) {
	            ret = false
	            break
	          }
	        }
	        return ret
	      })
	      this._defineInvalidProperty(last)
	      
	      this._validators[keypath] = []

	      this._watchModel(keypath, function (val, old) {
	        self._doValidate(keypath, init, val)
	      })
	    },

	    _undefineModelValidationScope: function (keypath) {
	      if (this.$parent) {
	        var targetPath = [this._getValidationNamespace('validation'), keypath].join('.')
	        var target = this.$parent.$get(targetPath)
	        if (target) {
	          this._unwatchModel(keypath)
	          this._undefineDirtyProperty(target)
	          this._undefineInvalidProperty(target)
	          this._undefineValidProperty(target)
	          var validation = this.$parent.$get(this._getValidationNamespace('validation'))
	          validation.$delete(keypath)
	        }
	      }
	    },

	    _defineValidatorToValidationScope: function (keypath, validator) {
	      var target = getTarget(this[this._getValidationNamespace('validation')], keypath)
	      target.$add(validator, null)
	    },

	    _undefineValidatorToValidationScope: function (keypath, validator) {
	      var validationName = this._getValidationNamespace('validation')
	      if (this.$parent) {
	        var targetPath = [validationName, keypath].join('.')
	        var target = this.$parent.$get(targetPath)
	        if (target) {
	          target.$delete(validator)
	        }
	      }
	    },

	    _addValidators: function (keypath, validator, arg) {
	      this._validators[keypath].push({ name: validator, arg: arg })
	    },

	    _watchModel: function (keypath, fn) {
	      this._validatorWatchers[keypath] = this.$watch(keypath, fn, false, true)
	    },

	    _unwatchModel: function (keypath) {
	      var unwatch = this._validatorWatchers[keypath]
	      unwatch()
	      delete this._validatorWatchers[keypath]
	    },
	    
	    _addManagedValidator: function (keypath, validator) {
	      this._managedValidator[[keypath, validator].join('.')] = true
	    },

	    _deleteManagedValidator: function (keypath, validator) {
	      var key = [keypath, validator].join('.')
	      this._managedValidator[key] = null
	      delete this._managedValidator[key]
	    },

	    _isManagedValidator: function () {
	      return Object.keys(this._managedValidator).length !== 0
	    },

	    _doValidate: function (keypath, init, val) {
	      var self = this
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      var target = getTarget(this[validationName], keypath)
	      target[dirtyName] = (init !== val)
	      this._validators[keypath].forEach(function (validator) {
	        target[validator.name] = 
	          !self._validates[validator.name].call(self, val, validator.arg)
	      })
	    }
	  }
	}

	/**
	 * Get target validatable object
	 *
	 * @param {Object} validation
	 * @param {String} keypath
	 * @return {Object} validatable object
	 */

	function getTarget (validation, keypath) {
	  var last = validation
	  var keys = keypath.split('.')
	  var key, obj
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i]
	    obj = last[key]
	    last = obj
	  }
	  return last
	}


/***/ },
/* 2 */
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

	function required (val) {
	  if (Array.isArray(val)) {
	    return val.length > 0
	  } else if ((val !== null) && (typeof val === 'object')) {
	    return Object.keys(val).length > 0
	  } else {
	    return !val ? false : true
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
	 * @param {String|Number} min
	 * @return {Boolean}
	 */

	function minLength (val, min) {
	  return typeof val === 'string' && isInteger(min) && val.length >= parseInt(min)
	}


	/**
	 * maxLength
	 *
	 * This function validate whether the maximum length of the string.
	 *
	 * @param {String} val
	 * @param {String|Number} max
	 * @return {Boolean}
	 */

	function maxLength (val, max) {
	  return typeof val === 'string' && isInteger(max) && val.length <= parseInt(max)
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

	function min (val, arg) {
	  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg))
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

	function max (val, arg) {
	  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg))
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
;