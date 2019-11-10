/**
 * vue-validator v1.4.4
 * (c) 2014-2015 kazuya kawaguchi
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

	/**
	 * Import(s)
	 */

	var validates = __webpack_require__(1)
	var _ = __webpack_require__(2)


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
	  var util = Vue.util


	  // custom validators merge strategy setting
	  Vue.config.optionMergeStrategies.validator = function (parent, child, vm, k) {
	    var validatorOptions = { validates: {}, namespace: {} }
	    if (!parent && !child) {
	      return validatorOptions
	    } else if (!parent && child) {
	      util.extend(validatorOptions['validates'], child['validates'])
	      util.extend(validatorOptions['namespace'], child['namespace'])
	      return validatorOptions
	    } else if (parent && !child) {
	      util.extend(validatorOptions['validates'], parent['validates'])
	      util.extend(validatorOptions['namespace'], parent['namespace'])
	      return validatorOptions
	    } else if (parent && child) {
	      var key
	      if ('validates' in parent) {
	        util.extend(validatorOptions['validates'], parent['validates'])
	      }
	      if ('namespace' in parent) {
	        util.extend(validatorOptions['namespace'], parent['namespace'])
	      }
	      if ('validates' in child) {
	        for (key in child['validates']) {
	          if ('validates' in parent && !parent['validates'].hasOwnProperty(key)) {
	            validatorOptions['validates'][key] = child['validates'][key]
	          }
	        }
	      }
	      if ('namespace' in child) {
	        for (key in child['namespace']) {
	          if ('namespace' in parent && !parent['namespace'].hasOwnProperty(key)) {
	            validatorOptions['namespace'][key] = child['namespace'][key]
	          }
	        }
	      }
	      return validatorOptions
	    } else {
	      _.warn('unexpected validator option merge strategy')
	      return validatorOptions
	    }
	  }


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
	      var el = this.el
	      var $validator = vm[componentName]
	      var keypath = this._keypath = this._parseModelAttribute(el.getAttribute(Vue.config.prefix + 'model'))
	      var validator = this.arg ? this.arg : this.expression
	      var arg = this.arg ? this.expression : null

	      var customs = _.getCustomValidators(vm.$options)
	      if (!this._checkValidator(validator, validates, customs)) {
	        _.warn("specified invalid '"
	          + validator + "' validator at v-validate directive !! please check '"
	          + validator + "' validator !!")
	        this._ignore = true
	        return
	      }

	      if (!$validator) {
	        vm[componentName] = $validator = vm.$addChild(
	          {}, // null option
	          Vue.extend(__webpack_require__(3))
	        )
	      }

	      var value = el.getAttribute('value')
	      if (el.getAttribute('number') !== null) {
	        value = util.toNumber(value)
	      }
	      this._init = value

	      var validation = $validator._getValidationNamespace('validation')
	      var init = value || vm.$get(keypath)
	      var readyEvent = el.getAttribute('wait-for')

	      if (readyEvent && !$validator._isRegistedReadyEvent(keypath)) {
	        $validator._addReadyEvents(keypath, this._checkParam('wait-for'))
	      }
	      
	      this._setupValidator($validator, keypath, validation, validator, el, arg, init)
	    },

	    update: function (val, old) {
	      if (this._ignore) { return }

	      var self = this
	      var vm = this.vm
	      var keypath = this._keypath
	      var validator = this.arg ? this.arg : this.expression
	      var $validator = vm[componentName]

	      $validator._changeValidator(keypath, validator, val)
	      if (!$validator._isRegistedReadyEvent(keypath)) { // normal
	        this._updateValidator($validator, validator, keypath)
	      } else { // wait-for
	        vm.$once($validator._getReadyEvents(keypath), function (val) {
	          $validator._setInitialValue(keypath, val)
	          vm.$set(keypath, val)
	          self._updateValidator($validator, validator, keypath)
	        })
	      }
	    },

	     
	    unbind: function () {
	      if (this._ignore) { return }

	      var vm = this.vm
	      var keypath = this._keypath
	      var validator = this.arg ? this.arg : this.expression
	      var $validator = vm[componentName]

	      this._teardownValidator(vm, $validator, keypath, validator)
	    },

	    _parseModelAttribute: function (attr) {
	      var res = Vue.parsers.directive.parse(attr)
	      return res[0].arg ? res[0].arg : res[0].expression
	    },

	    _checkValidator: function (validator, validates, customs) {
	      var items = Object.keys(validates).concat(Object.keys(customs))
	      return items.some(function (item) {
	        return item === validator
	      })
	    },

	    _setupValidator: function ($validator, keypath, validation, validator, el, arg, init) {
	      var vm = this.vm

	      if (!getVal($validator[validation], keypath)) {
	        $validator._defineModelValidationScope(keypath)
	        if (el.tagName === 'INPUT' && el.type === 'radio') {
	          if (getVal(vm, keypath) === init) {
	            $validator._setInitialValue(keypath, init)
	          }
	        } else {
	          $validator._setInitialValue(keypath, init)
	        }
	      }

	      if (!getVal($validator[validation], [keypath, validator].join('.'))) {
	        $validator._defineValidatorToValidationScope(keypath, validator)
	        $validator._addValidator(keypath, validator, getVal(vm, arg) || arg)
	      }
	    },

	    _updateValidator: function ($validator, validator, keypath) {
	      var value = $validator.$get(keypath)
	      var el = this.el

	      if (this._init) {
	        value = this._init
	        delete this._init
	      }

	      if (el.tagName === 'INPUT' && el.type === 'radio') {
	        if (value === $validator.$get(keypath)) {
	          $validator._updateDirtyProperty(keypath, value)
	        }
	      } else {
	        $validator._updateDirtyProperty(keypath, value)
	      }

	      $validator._doValidate(keypath, validator, $validator.$get(keypath))
	    },

	    _teardownValidator: function (vm, $validator, keypath, validator) {
	      $validator._undefineValidatorToValidationScope(keypath, validator)
	      $validator._undefineModelValidationScope(keypath, validator)
	    }
	  })
	}


/***/ },
/* 1 */
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
	  } else if (typeof val === 'number') {
	    return true
	  } else if ((val !== null) && (typeof val === 'object')) {
	    return Object.keys(val).length > 0
	  } else {
	    return !val
	      ? false
	      : true
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
	  if (typeof pat !== 'string') { return false }

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
	  return typeof val === 'string' &&
	    isInteger(min, 10) &&
	    val.length >= parseInt(min, 10)
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
	  return typeof val === 'string' &&
	    isInteger(max, 10) &&
	    val.length <= parseInt(max, 10)
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Utilties
	 */


	/**
	 * warn
	 *
	 * @param {String} msg
	 * @param {Error} [err]
	 *
	 */

	exports.warn = function (msg, err) {
	  if (window.console) {
	    console.warn('[vue-validator] ' + msg)
	    if (err) {
	      console.warn(err.stack)
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

	exports.getTarget = function (validation, keypath) {
	  var last = validation
	  var keys = keypath.split('.')
	  var key, obj
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i]
	    obj = last[key]
	    last = obj
	    if (!last) {
	      break
	    }
	  }
	  return last
	}

	/**
	 * Get custom validators
	 *
	 * @param {Object} options
	 * @return {Object}
	 */

	exports.getCustomValidators = function (options) {
	  var opts = options
	  var validators = {}
	  var key
	  var context
	  do {
	    if (opts['validator'] && opts['validator']['validates']) {
	      for (key in opts['validator']['validates']) {
	        if (!validators.hasOwnProperty(key)) {
	          validators[key] = opts['validator']['validates'][key]
	        }
	      }
	    }
	    context = opts._context || opts._parent
	    if (context) {
	      opts = context.$options
	    }
	  } while (context || opts._parent)
	  return validators
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Import(s)
	 */

	var validates = __webpack_require__(1)
	var _ = __webpack_require__(2)


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
	      return this._namespace[key]
	    },

	    _initValidationVariables: function () {
	      this._validators = {}
	      this._validates = {}
	      this._initialValues = {}
	      for (var key in validates) {
	        this._validates[key] = validates[key]
	      }
	      this._validatorWatchers = {}
	      this._readyEvents = {}
	    },

	    _initOptions: function () {
	      this._namespace = getCustomNamespace(this.$options)
	      this._namespace.validation = this._namespace.validation || 'validation'
	      this._namespace.valid = this._namespace.valid || 'valid'
	      this._namespace.invalid = this._namespace.invalid || 'invalid'
	      this._namespace.dirty = this._namespace.dirty || 'dirty'
	    },

	    _mixinCustomValidates: function () {
	      var customs = _.getCustomValidators(this.$options)
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
	        var ret = false
	        var keys = Object.keys(obj)
	        var i = keys.length
	        var key, last
	        while (i--) {
	          key = keys[i]
	          last = obj[key]
	          if (!(key in namespaces) && typeof last === 'object') {
	            ret = walk(last, propName, namespaces)
	            if ((propName === self._getValidationNamespace('valid') && !ret) ||
	                (propName === self._getValidationNamespace('dirty') && ret)) {
	              break
	            }
	          } else if (key === propName && typeof last !== 'object') {
	            ret = last
	            if ((key === self._getValidationNamespace('valid') && !ret) ||
	                (key === self._getValidationNamespace('dirty') && ret)) {
	              break
	            }
	          }
	        }
	        return ret
	      }

	      this._defineValidProperty(this.$parent, function () {
	        var validationName = self._getValidationNamespace('validation')
	        var validName = self._getValidationNamespace('valid')
	        return walk(this[validationName], validName, self._namespace)
	      })

	      this._defineInvalidProperty(this.$parent)

	      this._defineDirtyProperty(this.$parent, function () {
	        var validationName = self._getValidationNamespace('validation')
	        var dirtyName = self._getValidationNamespace('dirty')
	        return walk(this[validationName], dirtyName, self._namespace)
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
	      var validationName = this._getValidationNamespace('validation')
	      this.$parent.$delete(validationName)
	    },

	    _defineModelValidationScope: function (keypath) {
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
	        self._updateDirtyProperty(keypath, val)
	        self._validators[keypath].forEach(function (validator) {
	          self._doValidate(keypath, validator.name, val)
	        })
	      })
	    },

	    _undefineModelValidationScope: function (keypath, validator) {
	      if (this.$parent) {
	        var targetPath = [this._getValidationNamespace('validation'), keypath].join('.')
	        var target = this.$parent.$get(targetPath)
	        if (target && Object.keys(target).length === 3 &&
	            this._getValidationNamespace('valid') in target &&
	            this._getValidationNamespace('invalid') in target &&
	            this._getValidationNamespace('dirty') in target) {
	          this._unwatchModel(keypath)
	          this._undefineDirtyProperty(target)
	          this._undefineInvalidProperty(target)
	          this._undefineValidProperty(target)
	          removeValidationProperties(
	            this.$parent.$get(this._getValidationNamespace('validation')),
	            keypath
	          )
	        }
	      }
	    },

	    _defineValidatorToValidationScope: function (keypath, validator) {
	      var target = _.getTarget(this[this._getValidationNamespace('validation')], keypath)
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

	    _getInitialValue: function (keypath) {
	      return this._initialValues[keypath]
	    },

	    _setInitialValue: function (keypath, val) {
	      this._initialValues[keypath] = val
	    },

	    _addValidator: function (keypath, validator, arg) {
	      this._validators[keypath].push({ name: validator, arg: arg })
	    },

	    _changeValidator: function (keypath, validator, arg) {
	      var validators = this._validators[keypath]
	      var i = validators.length
	      while (i--) {
	        if (validators[i].name === validator) {
	          validators[i].arg = arg
	          break
	        }
	      }
	    },

	    _findValidator: function (keypath, validator) {
	      var found = null
	      var validators = this._validators[keypath]
	      var i = validators.length
	      while (i--) {
	        if (validators[i].name === validator) {
	          found = validators[i]
	          break
	        }
	      }
	      return found
	    },

	    _watchModel: function (keypath, fn) {
	      this._validatorWatchers[keypath] =
	        this.$watch(keypath, fn, { deep: false, immediate: true })
	    },

	    _unwatchModel: function (keypath) {
	      var unwatch = this._validatorWatchers[keypath]
	      if (unwatch) {
	        unwatch()
	        delete this._validatorWatchers[keypath]
	      }
	    },
	    
	    _addReadyEvents: function (id, event) {
	      this._readyEvents[id] = event
	    },

	    _getReadyEvents: function (id) {
	      return this._readyEvents[id]
	    },

	    _isRegistedReadyEvent: function (id) {
	      return id in this._readyEvents
	    },

	    _updateDirtyProperty: function (keypath, val) {
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      var target = _.getTarget(this[validationName], keypath)
	      if (target) {
	        target.$set(dirtyName, this._getInitialValue(keypath) !== val)
	      }
	    },

	    _doValidate: function (keypath, validateName, val) {
	      var validationName = this._getValidationNamespace('validation')

	      var target = _.getTarget(this[validationName], keypath)
	      var validator = this._findValidator(keypath, validateName)
	      if (target && validator) {
	        this._invokeValidator(
	          this._validates[validateName],
	          val, validator.arg,
	          function (result) {
	            target.$set(validateName, !result)
	          })
	      }
	    },
	    
	    _invokeValidator: function (validator, val, arg, fn) {
	      var future = validator.call(this, val, arg)
	      if (typeof future === 'function') { // async
	        if (future.resolved) {
	          // cached
	          fn(future.resolved)
	        } else if (future.requested) {
	          // pool callbacks
	          future.pendingCallbacks.push(fn)
	        } else {
	          future.requested = true
	          var fns = future.pendingCallbacks = [fn]
	          future(function resolve () {
	            future.resolved = true
	            for (var i = 0, l = fns.length; i < l; i++) {
	              fns[i](true)
	            }
	          }, function reject () {
	            fn(false)
	          })
	        }
	      } else { // sync
	        fn(future)
	      }
	    }
	  }
	}

	/**
	 * Remove properties from target validation
	 *
	 * @param {Object} validation
	 * @param {String} keypath
	 */

	function removeValidationProperties (validation, keypath) {
	  var keys = keypath.split('.')
	  var key, obj
	  while (keys.length) {
	    key = keys.pop()
	    if (keys.length !== 0) {
	      obj = _.getTarget(validation, keys.join('.'))
	      obj.$delete(key)
	    } else {
	      validation.$delete(key)
	    }
	  }
	}

	/**
	 * Get custom namespace
	 *
	 * @param {Object} options
	 * @return {Object}
	 */

	function getCustomNamespace (options) {
	  var namespace = {}
	  var key
	  var context
	  do {
	    if (options['validator'] && options['validator']['namespace']) {
	      for (key in options['validator']['namespace']) {
	        if (!namespace.hasOwnProperty(key)) {
	          namespace[key] = options['validator']['namespace'][key]
	        }
	      }
	    }
	    context = options._context || options._parent
	    if (context) {
	      options = context.$options
	    }
	  } while (context || options._parent)
	  return namespace
	}


/***/ }
/******/ ])
});
;