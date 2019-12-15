(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueFire"] = factory();
	else
		root["VueFire"] = factory();
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
/***/ (function(module, exports) {

	var Vue // late binding

	/**
	 * Returns the key of a Firebase snapshot across SDK versions.
	 *
	 * @param {FirebaseSnapshot} snapshot
	 * @return {string|null}
	 */
	function _getKey (snapshot) {
	  return typeof snapshot.key === 'function'
	    ? snapshot.key()
	    : snapshot.key
	}

	/**
	 * Returns the original reference of a Firebase reference or query across SDK versions.
	 *
	 * @param {FirebaseReference|FirebaseQuery} refOrQuery
	 * @return {FirebaseReference}
	 */
	function _getRef (refOrQuery) {
	  if (typeof refOrQuery.ref === 'function') {
	    refOrQuery = refOrQuery.ref()
	  } else if (typeof refOrQuery.ref === 'object') {
	    refOrQuery = refOrQuery.ref
	  }

	  return refOrQuery
	}

	/**
	 * Check if a value is an object.
	 *
	 * @param {*} val
	 * @return {boolean}
	 */
	function isObject (val) {
	  return Object.prototype.toString.call(val) === '[object Object]'
	}

	/**
	 * Convert firebase snapshot into a bindable data record.
	 *
	 * @param {FirebaseSnapshot} snapshot
	 * @return {Object}
	 */
	function createRecord (snapshot) {
	  var value = snapshot.val()
	  var res = isObject(value)
	    ? value
	    : { '.value': value }
	  res['.key'] = _getKey(snapshot)
	  return res
	}

	/**
	 * Find the index for an object with given key.
	 *
	 * @param {array} array
	 * @param {string} key
	 * @return {number}
	 */
	function indexForKey (array, key) {
	  for (var i = 0; i < array.length; i++) {
	    if (array[i]['.key'] === key) {
	      return i
	    }
	  }
	  /* istanbul ignore next */
	  return -1
	}

	/**
	 * Bind a firebase data source to a key on a vm.
	 *
	 * @param {Vue} vm
	 * @param {string} key
	 * @param {object} source
	 */
	function bind (vm, key, source) {
	  var asObject = false
	  var cancelCallback = null
	  var readyCallback = null
	  // check { source, asArray, cancelCallback } syntax
	  if (isObject(source) && source.hasOwnProperty('source')) {
	    asObject = source.asObject
	    cancelCallback = source.cancelCallback
	    readyCallback = source.readyCallback
	    source = source.source
	  }
	  if (!isObject(source)) {
	    throw new Error('VueFire: invalid Firebase binding source.')
	  }
	  var ref = _getRef(source)
	  vm.$firebaseRefs[key] = ref
	  vm._firebaseSources[key] = source
	  if (cancelCallback) {
	    cancelCallback = cancelCallback.bind(vm)
	  }
	  // bind based on initial value type
	  if (asObject) {
	    bindAsObject(vm, key, source, cancelCallback)
	  } else {
	    bindAsArray(vm, key, source, cancelCallback)
	  }
	  if (readyCallback) {
	    source.once('value', readyCallback.bind(vm))
	  }
	}

	/**
	 * Define a reactive property in a given vm if it's not defined
	 * yet
	 *
	 * @param {Vue} vm
	 * @param {string} key
	 * @param {*} val
	 */
	function defineReactive (vm, key, val) {
	  if (key in vm) {
	    vm[key] = val
	  } else {
	    Vue.util.defineReactive(vm, key, val)
	  }
	}

	/**
	 * Bind a firebase data source to a key on a vm as an Array.
	 *
	 * @param {Vue} vm
	 * @param {string} key
	 * @param {object} source
	 * @param {function|null} cancelCallback
	 */
	function bindAsArray (vm, key, source, cancelCallback) {
	  var array = []
	  defineReactive(vm, key, array)

	  var onAdd = source.on('child_added', function (snapshot, prevKey) {
	    var index = prevKey ? indexForKey(array, prevKey) + 1 : 0
	    array.splice(index, 0, createRecord(snapshot))
	  }, cancelCallback)

	  var onRemove = source.on('child_removed', function (snapshot) {
	    var index = indexForKey(array, _getKey(snapshot))
	    array.splice(index, 1)
	  }, cancelCallback)

	  var onChange = source.on('child_changed', function (snapshot) {
	    var index = indexForKey(array, _getKey(snapshot))
	    array.splice(index, 1, createRecord(snapshot))
	  }, cancelCallback)

	  var onMove = source.on('child_moved', function (snapshot, prevKey) {
	    var index = indexForKey(array, _getKey(snapshot))
	    var record = array.splice(index, 1)[0]
	    var newIndex = prevKey ? indexForKey(array, prevKey) + 1 : 0
	    array.splice(newIndex, 0, record)
	  }, cancelCallback)

	  vm._firebaseListeners[key] = {
	    child_added: onAdd,
	    child_removed: onRemove,
	    child_changed: onChange,
	    child_moved: onMove
	  }
	}

	/**
	 * Bind a firebase data source to a key on a vm as an Object.
	 *
	 * @param {Vue} vm
	 * @param {string} key
	 * @param {Object} source
	 * @param {function|null} cancelCallback
	 */
	function bindAsObject (vm, key, source, cancelCallback) {
	  defineReactive(vm, key, {})
	  var cb = source.on('value', function (snapshot) {
	    vm[key] = createRecord(snapshot)
	  }, cancelCallback)
	  vm._firebaseListeners[key] = { value: cb }
	}

	/**
	 * Unbind a firebase-bound key from a vm.
	 *
	 * @param {Vue} vm
	 * @param {string} key
	 */
	function unbind (vm, key) {
	  var source = vm._firebaseSources && vm._firebaseSources[key]
	  if (!source) {
	    throw new Error(
	      'VueFire: unbind failed: "' + key + '" is not bound to ' +
	      'a Firebase reference.'
	    )
	  }
	  var listeners = vm._firebaseListeners[key]
	  for (var event in listeners) {
	    source.off(event, listeners[event])
	  }
	  vm[key] = null
	  vm.$firebaseRefs[key] = null
	  vm._firebaseSources[key] = null
	  vm._firebaseListeners[key] = null
	}

	/**
	 * Ensure the related bookkeeping variables on an instance.
	 *
	 * @param {Vue} vm
	 */
	function ensureRefs (vm) {
	  if (!vm.$firebaseRefs) {
	    vm.$firebaseRefs = Object.create(null)
	    vm._firebaseSources = Object.create(null)
	    vm._firebaseListeners = Object.create(null)
	  }
	}

	var init = function () {
	  var bindings = this.$options.firebase
	  if (typeof bindings === 'function') bindings = bindings.call(this)
	  if (!bindings) return
	  ensureRefs(this)
	  for (var key in bindings) {
	    bind(this, key, bindings[key])
	  }
	}

	var VueFireMixin = {
	  created: init, // 1.x and 2.x
	  beforeDestroy: function () {
	    if (!this.$firebaseRefs) return
	    for (var key in this.$firebaseRefs) {
	      if (this.$firebaseRefs[key]) {
	        this.$unbind(key)
	      }
	    }
	    this.$firebaseRefs = null
	    this._firebaseSources = null
	    this._firebaseListeners = null
	  }
	}

	/**
	 * Install function passed to Vue.use() in manual installation.
	 *
	 * @param {function} _Vue
	 */
	function install (_Vue) {
	  Vue = _Vue
	  Vue.mixin(VueFireMixin)

	  // use object-based merge strategy
	  // TODO This makes impossible to merge functions
	  var mergeStrats = Vue.config.optionMergeStrategies
	  mergeStrats.firebase = mergeStrats.provide

	  // extend instance methods
	  Vue.prototype.$bindAsObject = function (key, source, cancelCallback, readyCallback) {
	    ensureRefs(this)
	    bind(this, key, {
	      source: source,
	      asObject: true,
	      cancelCallback: cancelCallback,
	      readyCallback: readyCallback
	    })
	  }

	  Vue.prototype.$bindAsArray = function (key, source, cancelCallback, readyCallback) {
	    ensureRefs(this)
	    bind(this, key, {
	      source: source,
	      cancelCallback: cancelCallback,
	      readyCallback: readyCallback
	    })
	  }

	  Vue.prototype.$unbind = function (key) {
	    unbind(this, key)
	  }
	}

	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue)
	}

	module.exports = install


/***/ })
/******/ ])
});
;