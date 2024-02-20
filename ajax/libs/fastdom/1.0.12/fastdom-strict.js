(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fastdom"));
	else if(typeof define === 'function' && define.amd)
		define(["fastdom"], factory);
	else if(typeof exports === 'object')
		exports["fastdom"] = factory(require("fastdom"));
	else
		root["fastdom"] = factory(root["fastdom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var strictdom = __webpack_require__(1);
	var fastdom = __webpack_require__(2);

	/**
	 * Mini logger
	 *
	 * @return {Function}
	 */
	var debug = 0 ? console.log.bind(console, '[fastdom-strict]') : function() {};

	/**
	 * Enabled state
	 *
	 * @type {Boolean}
	 */
	var enabled = false;

	window.fastdom = module.exports = fastdom.extend({
	  measure: function(fn, ctx) {
	    debug('measure');
	    var task = !ctx ? fn : fn.bind(ctx);
	    return this.fastdom.measure(function() {
	      if (!enabled) return task();
	      return strictdom.phase('measure', task);
	    }, ctx);
	  },

	  mutate: function(fn, ctx) {
	    debug('mutate');
	    var task = !ctx ? fn : fn.bind(ctx);
	    return this.fastdom.mutate(function() {
	      if (!enabled) return task();
	      return strictdom.phase('mutate', task);
	    }, ctx);
	  },

	  strict: function(value) {
	    if (value) {
	      enabled = true;
	      strictdom.enable();
	    } else {
	      enabled = false;
	      strictdom.disable();
	    }
	  }
	});

	// turn on strict-mode
	window.fastdom.strict(true);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(function() {
	'use strict';

	var debug = 0 ? console.log.bind(console, '[strictdom]') : function() {};

	/**
	 * Crude webkit test.
	 *
	 * @type {Boolean}
	 */
	// var isWebkit = !!window.webkitURL;

	/**
	 * List of properties observed.
	 *
	 * @type {Object}
	 */
	var properties = {
	  prototype: {
	    Document: {
	      execCommand: Mutate,
	      elementFromPoint: Measure,
	      elementsFromPoint: Measure,
	      scrollingElement: Measure
	    },

	    Node: {
	      appendChild: {
	        type: Mutate,
	        test: function(dom, parent, args) {
	          var attached = isAttached(parent) || isAttached(args[0]);
	          if (attached && dom.not('mutate')) throw error(3, this.name);
	        }
	      },

	      insertBefore: {
	        type: Mutate,
	        test: function(dom, parent, args) {
	          var attached = isAttached(parent) || isAttached(args[0]);
	          if (attached && dom.not('mutate')) throw error(3, this.name);
	        }
	      },

	      removeChild: {
	        type: Mutate,
	        test: function(dom, parent, args) {
	          var attached = isAttached(parent) || isAttached(args[0]);
	          if (attached && dom.not('mutate')) throw error(3, this.name);
	        }
	      },

	      textContent: Mutate
	    },

	    Element: {
	      scrollIntoView: Mutate,
	      scrollBy: Mutate,
	      scrollTo: Mutate,
	      getClientRects: Measure,
	      getBoundingClientRect: Measure,
	      clientLeft: Measure,
	      clientWidth: Measure,
	      clientHeight: Measure,
	      scrollLeft: Accessor,
	      scrollTop: Accessor,
	      scrollWidth: Measure,
	      scrollHeight: Measure,
	      innerHTML: Mutate,
	      outerHTML: Mutate,
	      insertAdjacentHTML: Mutate,
	      remove: Mutate,
	      setAttribute: Mutate,
	      removeAttribute: Mutate,
	      className: Mutate,
	      classList: ClassList
	    },

	    HTMLElement: {
	      offsetLeft: Measure,
	      offsetTop: Measure,
	      offsetWidth: Measure,
	      offsetHeight: Measure,
	      offsetParent: Measure,
	      innerText: Accessor,
	      outerText: Accessor,
	      focus: Measure,
	      blur: Measure,
	      style: Style,

	      // `element.dataset` is hard to wrap.
	      // We could use `Proxy` but it's not
	      // supported in Chrome yet. Not too
	      // concerned as `data-` attributes are
	      // not often associated with render.
	      // dataset: DATASET
	    },

	    CharacterData: {
	      remove: Mutate,
	      data: Mutate
	    },

	    Range: {
	      getClientRects: Measure,
	      getBoundingClientRect: Measure
	    },

	    MouseEvent: {
	      layerX: Measure,
	      layerY: Measure,
	      offsetX: Measure,
	      offsetY: Measure
	    },

	    HTMLButtonElement: {
	      reportValidity: Measure
	    },

	    HTMLDialogElement: {
	      showModal: Mutate
	    },

	    HTMLFieldSetElement: {
	      reportValidity: Measure
	    },

	    HTMLImageElement: {
	      width: Accessor,
	      height: Accessor,
	      x: Measure,
	      y: Measure
	    },

	    HTMLInputElement: {
	      reportValidity: Measure
	    },

	    HTMLKeygenElement: {
	      reportValidity: Measure
	    },

	    SVGSVGElement: {
	      currentScale: Accessor
	    }
	  },

	  instance: {
	    window: {
	      getComputedStyle: {
	        type: Measure,

	        /**
	         * Throws when the Element is in attached
	         * and strictdom is not in the 'measure' phase.
	         *
	         * @param  {StrictDom} strictdom
	         * @param  {Window} win
	         * @param  {Object} args
	         */
	        test: function(strictdom, win, args) {
	          if (isAttached(args[0]) && strictdom.not('measure')) {
	            throw error(2, 'getComputedStyle');
	          }
	        }
	      },

	      // innerWidth: {
	      //   type: isWebkit ? Value : Measure,
	      //
	      //   /**
	      //    * Throws when the window is nested (in <iframe>)
	      //    * and StrictDom is not in the 'measure' phase.
	      //    *
	      //    * @param  {StrictDom} strictdom
	      //    */
	      //   test: function(strictdom) {
	      //     var inIframe = window !== window.top;
	      //     if (inIframe && strictdom.not('measure')) {
	      //       throw error(2, '`.innerWidth` (in iframe)');
	      //     }
	      //   }
	      // },
	      //
	      // innerHeight: {
	      //   type: isWebkit ? Value : Measure,
	      //
	      //   /**
	      //    * Throws when the window is nested (in <iframe>)
	      //    * and StrictDom is not in the 'measure' phase.
	      //    *
	      //    * @param  {StrictDom} strictdom
	      //    */
	      //   test: function(strictdom) {
	      //     var inIframe = window !== window.top;
	      //     if (inIframe && strictdom.not('measure')) {
	      //       throw error(2, '`.innerHeight` (in iframe)');
	      //     }
	      //   }
	      // },
	      //
	      // scrollX: isWebkit ? Value : Measure,
	      // scrollY: isWebkit ? Value : Measure,
	      scrollBy: Mutate,
	      scrollTo: Mutate,
	      scroll: Mutate,
	    }
	  }
	};

	/**
	 * The master controller for all properties.
	 *
	 * @param {Window} win
	 */
	function StrictDom(win) {
	  this.properties = [];
	  this._phase = null;
	  this.win = win;

	  this.createPrototypeProperties();
	  this.createInstanceProperties();
	}

	StrictDom.prototype = {

	  /**
	   * Set the current phase.
	   * @param  {[type]} value [description]
	   * @return {[type]}       [description]
	   */
	  phase: function(type, task) {
	    if (!arguments.length) return this._phase;
	    if (!this.knownPhase(type)) throw error(4, type);

	    var previous = this._phase;
	    this._phase = type;

	    if (typeof task != 'function') return;

	    var result = task();
	    this._phase = previous;
	    return result;
	  },

	  knownPhase: function(value) {
	    return !!~['measure', 'mutate', null].indexOf(value);
	  },

	  is: function(value) {
	    return this._phase === value;
	  },

	  not: function(value) {
	    return !this.is(value);
	  },

	  /**
	   * Enable strict mode.
	   *
	   * @public
	   */
	  enable: function() {
	    if (this.enabled) return;
	    debug('enable');
	    var i = this.properties.length;
	    while (i--) this.properties[i].enable();
	    this.enabled = true;
	  },

	  /**
	   * Disable strict mode.
	   *
	   * @public
	   */
	  disable: function() {
	    if (!this.enabled) return;
	    debug('disable');
	    var i = this.properties.length;
	    while (i--) this.properties[i].disable();
	    this.enabled = false;
	    this.phase(null);
	  },

	  /**
	   * Create wrappers for each of
	   * of the prototype properties.
	   *
	   * @private
	   */
	  createPrototypeProperties: function() {
	    debug('create prototype properties');
	    var props = properties.prototype;
	    for (var key in props) {
	      for (var name in props[key]) {
	        var object = this.win[key] && this.win[key].prototype;
	        if (!object || !object.hasOwnProperty(name)) continue;
	        this.properties.push(this.create(object, name, props[key][name]));
	      }
	    }
	  },

	  /**
	   * Create wrappers for each of
	   * of the instance properties.
	   *
	   * @private
	   */
	  createInstanceProperties: function() {
	    debug('create instance properties');
	    var props = properties.instance;
	    for (var key in props) {
	      for (var name in props[key]) {
	        var object = this.win[key];
	        if (!object || !object.hasOwnProperty(name)) continue;
	        this.properties.push(this.create(object, name, props[key][name]));
	      }
	    }
	  },

	  /**
	   * Create a wrapped `Property` that
	   * can be individually enabled/disabled.
	   *
	   * @param  {Object} object - the parent object (eg. Node.prototype)
	   * @param  {String} name - the property name (eg. 'appendChild')
	   * @param  {(constructor|Object)} config - from the above property definition
	   * @return {Property}
	   */
	  create: function(object, name, config) {
	    debug('create', name);
	    var Constructor = config.type || config;
	    return new Constructor(object, name, config, this);
	  }
	};

	/**
	 * Create a new `Property`.
	 *
	 * A wrapper around a property that observes
	 * usage, throwing errors when used in the
	 * incorrect phase.
	 *
	 * @param {Object} object - the parent object (eg. Node.prototype)
	 * @param {[type]} name - the property name (eg. 'appendChild')
	 * @param {(constructor|Object)} config - from the above definition
	 * @param {StrictDom} strictdom - injected as a dependency
	 */
	function Property(object, name, config, strictdom) {
	  debug('Property', name, config);

	  this.strictdom = strictdom;
	  this.object = object;
	  this.name = name;

	  var descriptor = this.getDescriptor();

	  // defaults can be overriden from config
	  if (typeof config == 'object') Object.assign(this, config);

	  this.descriptors = {
	    unwrapped: descriptor,
	    wrapped: this.wrap(descriptor)
	  };
	}

	Property.prototype = {

	  /**
	   * Get the property's descriptor.
	   *
	   * @return {Object}
	   * @private
	   */
	  getDescriptor: function() {
	    debug('get descriptor', this.name);
	    return Object.getOwnPropertyDescriptor(this.object, this.name);
	  },

	  /**
	   * Enable observation by replacing the
	   * current descriptor with the wrapped one.
	   *
	   * @private
	   */
	  enable: function() {
	    debug('enable', this.name);
	    Object.defineProperty(this.object, this.name, this.descriptors.wrapped);
	  },

	  /**
	   * Disable observation by replacing the
	   * current descriptor with the original one.
	   *
	   * @private
	   */
	  disable: function() {
	    debug('disable', this.name);
	    Object.defineProperty(this.object, this.name, this.descriptors.unwrapped);
	  },

	  // to be overwritten by subclass
	  wrap: function() {}
	};

	/**
	 * A wrapper for properties that measure
	 * geometry data from the DOM.
	 *
	 * Once a `Measure` property is enabled
	 * it can only be used when StrictDom
	 * is in the 'measure' phase, else it
	 * will throw.
	 *
	 * @constructor
	 * @extends Property
	 */
	function Measure() {
	  Property.apply(this, arguments);
	}

	Measure.prototype = extend(Property, {

	  /**
	   * Return a wrapped descriptor.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap measure', this.name);

	    var clone = Object.assign({}, descriptor);
	    var value = descriptor.value;
	    var get = descriptor.get;
	    var self = this;

	    if (typeof value == 'function') {
	      clone.value = function() {
	        debug('measure', self.name);
	        self.test(self.strictdom, this, arguments);
	        return value.apply(this, arguments);
	      };
	    } else if (get) {
	      clone.get = function() {
	        debug('measure', self.name);
	        self.test(self.strictdom, this, arguments);
	        return get.apply(this, arguments);
	      };
	    }

	    return clone;
	  },

	  /**
	   * Throws an Error if the element is attached
	   * and StrictDOM is not in the 'measure' phase.
	   *
	   * If methods/properties are used without
	   * a context (eg. `getComputedStyle()` instead
	   * of `window.getComputedStyle()`) we infer
	   * a `window` context.
	   *
	   * @param  {StrictDom} strictdom
	   * @param  {Node} ctx
	   */
	  test: function(strictdom, ctx) {
	    if (isAttached(ctx || window) && strictdom.not('measure')) {
	      throw error(2, this.name);
	    }
	  }
	});

	/**
	 * A wrapper for properties that mutate
	 * to the DOM, triggering style/reflow
	 * operations.
	 *
	 * Once a `Mutate` property is enabled
	 * it can only be used when StrictDom
	 * is in the 'measure' phase, else it
	 * will throw.
	 *
	 * @constructor
	 * @extends Property
	 */
	function Mutate() {
	  Property.apply(this, arguments);
	}

	Mutate.prototype = extend(Property, {

	  /**
	   * Return a wrapped descriptor.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap mutate', this.name);

	    var clone = Object.assign({}, descriptor);
	    var value = descriptor.value;
	    var self = this;

	    if (typeof value == 'function') {
	      clone.value = function() {
	        self.test(self.strictdom, this, arguments);
	        return value.apply(this, arguments);
	      };
	    } else if (descriptor.set) {
	      clone.set = function() {
	        self.test(self.strictdom, this, arguments);
	        return descriptor.set.apply(this, arguments);
	      };
	    }

	    return clone;
	  },

	  /**
	   * Throws an Error if the element is attached
	   * and StrictDOM is not in the 'mutate' phase.
	   *
	   * If methods/properties are used without
	   * a context (eg. `getComputedStyle()` instead
	   * of `window.getComputedStyle()`) we infer
	   * a `window` context.
	   *
	   * @param  {StrictDom} strictdom
	   * @param  {Node} ctx
	   */
	  test: function(strictdom, ctx) {
	    if (isAttached(ctx || window) && strictdom.not('mutate')) {
	      throw error(3, this.name);
	    }
	  }
	});

	/**
	 * A wrapper for 'accessor' (get/set) properties.
	 *
	 * An `Accessor` should be used to wrap
	 * properties that can both measure and mutate
	 * the DOM (eg. `element.scrollTop`).
	 *
	 * @constructor
	 * @extends Property
	 */
	function Accessor() {
	  Property.apply(this, arguments);
	}

	Accessor.prototype = extend(Property, {

	  /**
	   * Return a wrapped descriptor.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap accessor', this.name);

	    var clone = Object.assign({}, descriptor);
	    var get = descriptor.get;
	    var set = descriptor.set;
	    var self = this;

	    if (get) {
	      clone.get = function() {
	        self.testRead(self.strictdom, this, arguments);
	        return get.apply(this, arguments);
	      };
	    }

	    if (descriptor.set) {
	      clone.set = function() {
	        self.testWrite(self.strictdom, this, arguments);
	        return set.apply(this, arguments);
	      };
	    }

	    return clone;
	  },

	  testRead: Measure.prototype.test,
	  testWrite: Mutate.prototype.test
	});

	/**
	 * A wrapper for 'value' properties.
	 *
	 * A `Value` should be used to wrap special
	 * values that like `window.innerWidth`, which
	 * in Chrome (not Gecko) are not normal 'getter'
	 * functions, but magical flat getters.
	 *
	 * Value wrappers are a for very special cases.
	 *
	 * @constructor
	 * @extends Property
	 */
	function Value() {
	  Property.apply(this, arguments);
	}

	Value.prototype = extend(Property, {

	  /**
	   * Calling `Object.getOwnDescriptor()` can
	   * trigger a reflow as it returns the `value`
	   * of the property. So here we just
	   * return an empty object instead.
	   *
	   * @return {Object}
	   * @private
	   */
	  getDescriptor: function() {
	    return {};
	  },

	  /**
	   * Value wrappers are disabled by simply
	   * deleting them from the instance,
	   * revealing the original descriptor.
	   *
	   * @private
	   */
	  disable: function() {
	    delete this.object[this.name];
	  },

	  /**
	   * Return a wrapped descriptor.
	   *
	   * `Value` properties are actually on the
	   * instance of objects. To wrap them we need
	   * to replace them with a getter which
	   * deletes itself on access, call into the v8
	   * interceptor, and then add themselves back.
	   *
	   * This won't be fast, but these are rarely
	   * accessed so it should be fine.
	   *
	   * @param  {Object} descriptor
	   * @return {Object}
	   */
	  wrap: function(descriptor) {
	    debug('wrap value');
	    var name = this.name;
	    var self = this;

	    descriptor.get = function() {
	      debug('get value', name);
	      self.test(self.strictdom, this, arguments);
	      self.disable();
	      var result = this[name];
	      self.enable();
	      return result;
	    };

	    return descriptor;
	  },

	  test: Measure.prototype.test
	});

	function Style() {
	  Property.apply(this, arguments);
	}

	Style.prototype = extend(Property, {
	  wrap: function(descriptor) {
	    debug('wrap style');
	    var strictdom = this.strictdom;
	    var clone = Object.assign({}, descriptor);
	    clone.get = function() { return new StrictStyle(this, strictdom); };
	    return clone;
	  }
	});

	function ClassList() {
	  Property.apply(this, arguments);
	}

	ClassList.prototype = extend(Property, {
	  wrap: function(descriptor) {
	    debug('wrap style');
	    var strictdom = this.strictdom;
	    var clone = Object.assign({}, descriptor);
	    clone.get = function() { return new StrictClassList(this, strictdom); };
	    return clone;
	  }
	});

	function StrictStyle(el, strictdom) {
	  this.strictdom = strictdom;
	  this.el = el;
	}

	StrictStyle.prototype = {
	  _getter: getDescriptor(HTMLElement.prototype, 'style').get,
	  _get: function() {
	    return this._getter.call(this.el);
	  },

	  setProperty: function(key, value) {
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) throw error(1, 'style.' + key);
	    return this._get()[key] = value;
	  },

	  removeProperty: function(key) {
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) throw error(1, 'style.' + key);
	    return this._get().removeProperty(key);
	  }
	};

	// dynamically construct prototype
	// from real element.style
	(function() {
	  var styles = document.createElement('div').style;
	  var proto = {};

	  for (var key in styles) {
	    if (styles[key] === '') {
	      Object.defineProperty(StrictStyle.prototype, key, {
	        get: getter(key),
	        set: setter(key)
	      });
	    }
	  }

	  [
	    'item',
	    'getPropertyValue',
	    'getPropertyCSSValue',
	    'getPropertyPriority'
	  ].forEach(function(method) {
	    StrictStyle.prototype[method] = caller(method);
	  });

	  function getter(key) {
	    return function() {
	      return this._get()[key];
	    };
	  }

	  function setter(key) {
	    return function(value) {
	      var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	      if (illegal) throw error(1, 'style.' + key);
	      return this.setProperty(key, value);
	    };
	  }

	  function caller(key) {
	    return function() {
	      var style = this._get();
	      return style[key].apply(style, arguments);
	    };
	  }

	  return proto;
	})();

	function StrictClassList(el, strictdom) {
	  this.strictdom = strictdom;
	  this.el = el;
	}

	StrictClassList.prototype = {
	  _getter: getDescriptor(Element.prototype, 'classList').get,
	  _get: function() { return this._getter.call(this.el); },

	  add: function(className) {
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) throw error(1, 'class names');
	    this._get().add(className);
	  },

	  contains: function(className) {
	    return this._get().contains(className);
	  },

	  remove: function(className) {
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) throw error(1, 'class names');
	    this._get().remove(className);
	  },

	  toggle: function() {
	    var illegal = isAttached(this.el) && this.strictdom.not('mutate');
	    if (illegal) throw error(1, 'class names');
	    var classList = this._get();
	    return classList.toggle.apply(classList, arguments);
	  }
	};

	/**
	 * Utils
	 */

	function error(type) {
	  return new Error({
	    1: 'Can only set ' + arguments[1] + ' during \'mutate\' phase',
	    2: 'Can only get ' + arguments[1] + ' during \'measure\' phase',
	    3: 'Can only call `.' + arguments[1] + '()` during \'mutate\' phase',
	    4: 'Invalid phase: ' + arguments[1]
	  }[type]);
	}

	function getDescriptor(object, prop) {
	  return Object.getOwnPropertyDescriptor(object, prop);
	}

	function extend(parent, props) {
	  return Object.assign(Object.create(parent.prototype), props);
	}

	function isAttached(el) {
	  return el === window || document.contains(el);
	}

	/**
	 * Exports
	 */

	// Only ever allow one `StrictDom` per document
	var exports = window['strictdom'] = (window['strictdom'] || new StrictDom(window)); // jshint ignore:line

	// CJS & AMD support
	if (("function")[0] == 'f') !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return exports; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	else if ((typeof module)[0] == 'o') module.exports = exports;

	})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ])
});
;