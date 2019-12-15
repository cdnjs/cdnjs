(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuetify"] = factory();
	else
		root["Vuetify"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'colorable',

  props: {
    color: String
  },

  data: function data() {
    return {
      defaultColor: null
    };
  },


  computed: {
    computedColor: function computedColor() {
      return this.color || this.defaultColor;
    }
  },

  methods: {
    addBackgroundColorClassChecks: function addBackgroundColorClassChecks() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.computedColor;

      var classes = Object.assign({}, obj);

      if (color) {
        classes[color] = true;
      }

      return classes;
    },
    addTextColorClassChecks: function addTextColorClassChecks() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.computedColor;

      var classes = Object.assign({}, obj);

      if (color) {
        var _color$trim$split = color.trim().split(' '),
            _color$trim$split2 = _slicedToArray(_color$trim$split, 2),
            colorName = _color$trim$split2[0],
            colorModifier = _color$trim$split2[1];

        classes[colorName + '--text'] = true;
        colorModifier && (classes['text--' + colorModifier] = true);
      }

      return classes;
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'themeable',

  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses: function themeClasses() {
      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = createSimpleFunctional;
/* harmony export (immutable) */ __webpack_exports__["e"] = createSimpleTransition;
/* harmony export (immutable) */ __webpack_exports__["b"] = createJavaScriptTransition;
/* unused harmony export directiveConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = addOnceEventListener;
/* harmony export (immutable) */ __webpack_exports__["h"] = getObjectValueByPath;
/* harmony export (immutable) */ __webpack_exports__["c"] = createRange;
/* harmony export (immutable) */ __webpack_exports__["i"] = getZIndex;
/* harmony export (immutable) */ __webpack_exports__["f"] = escapeHTML;
/* harmony export (immutable) */ __webpack_exports__["g"] = filterObjectOnKeys;
/* unused harmony export filterChildren */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var name = arguments[2];

  name = name || c.replace(/__/g, '-');

  return {
    name: 'v-' + name,
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = (c + ' ' + (data.staticClass || '')).trim();

      return h(el, data, children);
    }
  };
}

function createSimpleTransition(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
  var mode = arguments[2];

  return {
    name: name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = _extends({}, context.data.on);
      }

      if (mode) context.data.props.mode = mode;

      context.data.on.beforeEnter = function (el) {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      };

      return h('transition', context.data, context.children);
    }
  };
}

function createJavaScriptTransition(name, functions) {
  var css = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'in-out';

  return {
    name: name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render: function render(h, context) {
      var data = {
        props: _extends({}, context.props, {
          name: name
        }),
        on: functions
      };

      return h('transition', data, context.children);
    }
  };
}

function directiveConfig(binding) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}

function addOnceEventListener(el, event, cb) {
  var once = function once() {
    cb();
    el.removeEventListener(event, once, false);
  };

  el.addEventListener(event, once, false);
}

function getObjectValueByPath(obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return;
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (obj instanceof Object && k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

function createRange(length) {
  return [].concat(_toConsumableArray(Array.from({ length: length }, function (v, k) {
    return k;
  })));
}

function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
  var zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index');
  if (isNaN(zi)) return getZIndex(el.parentNode);

  return zi;
}

var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function escapeHTML(str) {
  return str.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
}

function filterObjectOnKeys(obj, keys) {
  var filtered = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key];
    }
  }

  return filtered;
}

function filterChildren() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var tag = arguments[1];

  return array.filter(function (child) {
    return child.componentOptions && child.componentOptions.Ctor.options.name === tag;
  });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(92);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inject;
/* harmony export (immutable) */ __webpack_exports__["b"] = provide;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_console__ = __webpack_require__(6);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function generateWarning(child, parent) {
  return function () {
    return Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["b" /* consoleWarn */])('The ' + child + ' component must be used inside a ' + parent);
  };
}

function inject(namespace, child, parent) {
  var defaultImpl = child && parent ? {
    register: generateWarning(child, parent),
    unregister: generateWarning(child, parent)
  } : null;

  return {
    name: 'registrable-inject',

    inject: _defineProperty({}, namespace, {
      default: defaultImpl
    })
  };
}

function provide(namespace) {
  return {
    name: 'registrable-provide',

    methods: {
      register: null,
      unregister: null
    },
    provide: function provide() {
      return _defineProperty({}, namespace, {
        register: this.register,
        unregister: this.unregister
      });
    }
  };
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = factory;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function factory() {
  var _watch;

  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';

  return {
    name: 'toggleable',

    model: { prop: prop, event: event },

    props: _defineProperty({}, prop, { required: false }),

    data: function data() {
      return {
        isActive: !!this[prop]
      };
    },


    watch: (_watch = {}, _defineProperty(_watch, prop, function (val) {
      this.isActive = !!val;
    }), _defineProperty(_watch, 'isActive', function isActive(val) {
      !!val !== this[prop] && this.$emit(event, val);
    }), _watch)
  };
}

var Toggleable = factory();

/* harmony default export */ __webpack_exports__["a"] = (Toggleable);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = consoleWarn;
/* harmony export (immutable) */ __webpack_exports__["a"] = consoleError;
function createMessage(message, componentInstance) {
  var componentInfo = componentInstance ? ' in "' + componentInstance.$options.name + '"' : '';
  return '[Vuetify] ' + message + componentInfo;
}

function consoleWarn(message) {
  var componentInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  console.warn(createMessage(message, componentInstance));
}

function consoleError(message) {
  var componentInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  console.error(createMessage(message, componentInstance));
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VBottomSheetTranstion */
/* unused harmony export VCarouselTransition */
/* unused harmony export VCarouselReverseTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VTabTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VTabReverseTransition; });
/* unused harmony export VMenuTransition */
/* unused harmony export VFabTransition */
/* unused harmony export VDialogTransition */
/* unused harmony export VDialogBottomTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VFadeTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VScaleTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VSlideXTransition; });
/* unused harmony export VSlideXReverseTransition */
/* unused harmony export VSlideYTransition */
/* unused harmony export VSlideYReverseTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VExpandTransition; });
/* unused harmony export VRowExpandTransition */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__expand_transition__ = __webpack_require__(39);




// Component specific transitions
var VBottomSheetTranstion = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('bottom-sheet-transition');
var VCarouselTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('carousel-transition');
var VCarouselReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('carousel-reverse-transition');
var VTabTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('tab-transition');
var VTabReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('tab-reverse-transition');
var VMenuTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('menu-transition');
var VFabTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('fab-transition', 'center center', 'out-in');

// Generic transitions
var VDialogTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('dialog-transition');
var VDialogBottomTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('dialog-bottom-transition');
var VFadeTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('fade-transition');
var VScaleTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('scale-transition');
var VSlideXTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-x-transition');
var VSlideXReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-x-reverse-transition');
var VSlideYTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-y-transition');
var VSlideYReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-y-reverse-transition');

// JavaScript transitions
var VExpandTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createJavaScriptTransition */])('expand-transition', Object(__WEBPACK_IMPORTED_MODULE_1__expand_transition__["a" /* default */])());
var VRowExpandTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createJavaScriptTransition */])('row-expand-transition', Object(__WEBPACK_IMPORTED_MODULE_1__expand_transition__["a" /* default */])('datatable__expand-col--expanded'));

/* harmony default export */ __webpack_exports__["g"] = (install);
/* istanbul ignore next */
function install(Vue) {
  Vue.component('v-bottom-sheet-transition', VBottomSheetTranstion);
  Vue.component('v-carousel-transition', VCarouselTransition);
  Vue.component('v-carousel-reverse-transition', VCarouselReverseTransition);
  Vue.component('v-dialog-transition', VDialogTransition);
  Vue.component('v-dialog-bottom-transition', VDialogBottomTransition);
  Vue.component('v-fab-transition', VFabTransition);
  Vue.component('v-fade-transition', VFadeTransition);
  Vue.component('v-menu-transition', VMenuTransition);
  Vue.component('v-scale-transition', VScaleTransition);
  Vue.component('v-slide-x-transition', VSlideXTransition);
  Vue.component('v-slide-x-reverse-transition', VSlideXReverseTransition);
  Vue.component('v-slide-y-transition', VSlideYTransition);
  Vue.component('v-slide-y-reverse-transition', VSlideYReverseTransition);
  Vue.component('v-tab-reverse-transition', VTabReverseTransition);
  Vue.component('v-tab-transition', VTabTransition);
  Vue.component('v-expand-transition', VExpandTransition);
  Vue.component('v-row-expand-transition', VRowExpandTransition);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function closeConditional() {
  return false;
}

function directive(e, el, binding) {
  // Args may not always be supplied
  binding.args = binding.args || {};

  // If no closeConditional was supplied assign a default
  var isActive = binding.args.closeConditional || closeConditional;

  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || isActive(e) === false) return;

  // If click was triggered programmaticaly (domEl.click()) then
  // it shouldn't be treated as click-outside
  // Chrome/Firefox support isTrusted property
  // IE/Edge support pointerType property (empty if not triggered
  // by pointing device)
  if ('isTrusted' in e && !e.isTrusted || 'pointerType' in e && !e.pointerType) return;

  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  var elements = (binding.args.include || function () {
    return [];
  })();
  // Add the root element for the component this directive was defined on
  elements.push(el);

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occure before
  // the bubbling click event on any outside elements.
  !clickedInEls(e, elements) && setTimeout(function () {
    isActive(e) && binding.value();
  }, 0);
}

function clickedInEls(e, elements) {
  // Get position of click
  var x = e.clientX,
      y = e.clientY;
  // Loop over all included elements to see if click was in any of them

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if (clickedInEl(el, x, y)) return true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

function clickedInEl(el, x, y) {
  // Get bounding rect for element
  // (we're in capturing event and we want to check for multiple elements,
  //  so can't use target.)
  var b = el.getBoundingClientRect();
  // Check if the click was in the element's bounding rect

  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'click-outside',

  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  inserted: function inserted(el, binding) {
    var onClick = function onClick(e) {
      return directive(e, el, binding);
    };
    // iOS does not recognize click events on document
    // or body, this is the entire purpose of the v-app
    // component and [data-app], stop removing this
    var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
    app.addEventListener('click', onClick, true);
    el._clickOutside = onClick;
  },
  unbind: function unbind(el) {
    var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
    app && app.removeEventListener('click', el._clickOutside, true);
    delete el._clickOutside;
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _touchstart = function _touchstart(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;

  wrapper.start && wrapper.start(Object.assign(event, wrapper));
};

var _touchend = function _touchend(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;

  wrapper.end && wrapper.end(Object.assign(event, wrapper));

  handleGesture(wrapper);
};

var _touchmove = function _touchmove(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;

  wrapper.move && wrapper.move(Object.assign(event, wrapper));
};

var handleGesture = function handleGesture(wrapper) {
  var touchstartX = wrapper.touchstartX,
      touchendX = wrapper.touchendX,
      touchstartY = wrapper.touchstartY,
      touchendY = wrapper.touchendY;

  var dirRatio = 0.5;
  var minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};

function inserted(el, _ref, _ref2) {
  var value = _ref.value;
  var context = _ref2.context;

  var wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };

  var target = value.parent ? el.parentNode : el;
  var options = value.options || { passive: true

    // Needed to pass unit tests
  };if (!target) return;

  var handlers = {
    touchstart: function touchstart(e) {
      return _touchstart(e, wrapper);
    },
    touchend: function touchend(e) {
      return _touchend(e, wrapper);
    },
    touchmove: function touchmove(e) {
      return _touchmove(e, wrapper);
    }
  };
  target._touchHandlers = Object.assign(Object(target._touchHandlers), _defineProperty({}, context._uid, handlers));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(handlers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var eventName = _step.value;

      target.addEventListener(eventName, handlers[eventName], options);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function unbind(el, _ref3, _ref4) {
  var value = _ref3.value;
  var context = _ref4.context;

  var target = value.parent ? el.parentNode : el;

  if (!target) return;

  var handlers = target._touchHandlers[context._uid];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(handlers)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var eventName = _step2.value;

      target.removeEventListener(eventName, handlers[eventName]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  delete target._touchHandlers[context._uid];
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'touch',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(111);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */]);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function inserted(el, binding) {
  var callback = binding.value;
  var options = binding.options || { passive: true };

  window.addEventListener('resize', callback, options);
  el._onResize = {
    callback: callback,
    options: options
  };

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback();
  }
}

function unbind(el, binding) {
  var _el$_onResize = el._onResize,
      callback = _el$_onResize.callback,
      options = _el$_onResize.options;


  window.removeEventListener('resize', callback, options);
  delete el._onResize;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'resize',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = factory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);


function factory() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var props = {
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  };

  return {
    name: 'positionable',
    props: selected.length ? Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g" /* filterObjectOnKeys */])(props, selected) : props
  };
}

/* harmony default export */ __webpack_exports__["a"] = (factory());

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'routable',

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a" /* default */]
  },

  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default: undefined
    },
    exactActiveClass: String,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: [Boolean, Object],
    tag: String,
    target: String
  },

  methods: {
    click: function click() {},
    generateRouteLink: function generateRouteLink() {
      var exact = this.exact;
      var tag = void 0;

      var data = _defineProperty({
        attrs: { disabled: this.disabled },
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple && !this.disabled ? this.ripple : false
        }]
      }, this.to ? 'nativeOn' : 'on', _extends({}, this.$listeners, {
        click: this.click
      }));

      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
      }

      if (this.to) {
        // Add a special activeClass hook
        // for component level styles
        var activeClass = this.activeClass;
        var exactActiveClass = this.exactActiveClass || activeClass;

        if (this.proxyClass) {
          activeClass += ' ' + this.proxyClass;
          exactActiveClass += ' ' + this.proxyClass;
        }

        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        Object.assign(data.props, {
          to: this.to,
          exact: exact,
          activeClass: activeClass,
          exactActiveClass: exactActiveClass,
          append: this.append,
          replace: this.replace
        });
      } else {
        tag = this.href && 'a' || this.tag || 'a';

        if (tag === 'a') {
          if (this.href) data.attrs.href = this.href;
          if (this.target) data.attrs.target = this.target;
        }
      }

      return { tag: tag, data: data };
    }
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createNativeLocaleFormatter__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monthChange__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pad__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__createNativeLocaleFormatter__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__monthChange__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__pad__["a"]; });






/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applicationable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__positionable__ = __webpack_require__(12);


function applicationable(value) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    name: 'applicationable',

    mixins: [Object(__WEBPACK_IMPORTED_MODULE_0__positionable__["b" /* factory */])(['absolute', 'fixed'])],

    props: {
      app: Boolean
    },

    computed: {
      applicationProperty: function applicationProperty() {
        return value;
      }
    },

    watch: {
      // If previous value was app
      // reset the provided prop
      app: function app(x, prev) {
        prev ? this.removeApplication() : this.callUpdate();
      }
    },

    created: function created() {
      for (var i = 0, length = events.length; i < length; i++) {
        this.$watch(events[i], this.callUpdate);
      }
      this.callUpdate();
    },
    mounted: function mounted() {
      this.callUpdate();
    },
    destroyed: function destroyed() {
      this.app && this.removeApplication();
    },


    methods: {
      callUpdate: function callUpdate() {
        if (!this.app) return;

        this.$vuetify.application[this.applicationProperty] = this.updateApplication();
      },
      removeApplication: function removeApplication() {
        this.$vuetify.application[this.applicationProperty] = 0;
      },

      updateApplication: function updateApplication() {}
    }
  };
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'bootable',

  data: function data() {
    return {
      isBooted: false
    };
  },

  props: {
    lazy: Boolean
  },

  watch: {
    isActive: function isActive() {
      this.isBooted = true;
    }
  },

  methods: {
    showLazyContent: function showLazyContent(content) {
      return this.isBooted || !this.lazy || this.isActive ? content : null;
    }
  }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function style(el, value) {
  el.style['transform'] = value;
  el.style['webkitTransform'] = value;
}

var ripple = {
  /**
   * @param {Event} e
   * @param {Element} el
   * @param {{ class?: string, center?: boolean }} [value={}]
   */
  show: function show(e, el) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!el._ripple || !el._ripple.enabled) {
      return;
    }

    var container = document.createElement('span');
    var animation = document.createElement('span');

    container.appendChild(animation);
    container.className = 'ripple__container';

    if (value.class) {
      container.className += ' ' + value.class;
    }

    var size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
    animation.className = 'ripple__animation';
    animation.style.width = size * (value.center ? 1 : 2) + 'px';
    animation.style.height = animation.style.width;

    el.appendChild(container);
    var computed = window.getComputedStyle(el);
    if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative';

    var offset = el.getBoundingClientRect();
    var x = value.center ? '50%' : e.clientX - offset.left + 'px';
    var y = value.center ? '50%' : e.clientY - offset.top + 'px';

    animation.classList.add('ripple__animation--enter');
    animation.classList.add('ripple__animation--visible');
    style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ') scale3d(0.01,0.01,0.01)');
    animation.dataset.activated = Date.now();

    setTimeout(function () {
      animation.classList.remove('ripple__animation--enter');
      style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ')  scale3d(0.99,0.99,0.99)');
    }, 0);
  },

  hide: function hide(el) {
    if (!el._ripple || !el._ripple.enabled) return;

    var ripples = el.getElementsByClassName('ripple__animation');

    if (ripples.length === 0) return;
    var animation = ripples[ripples.length - 1];
    var diff = Date.now() - Number(animation.dataset.activated);
    var delay = 400 - diff;

    delay = delay < 0 ? 0 : delay;

    setTimeout(function () {
      animation.classList.remove('ripple__animation--visible');

      setTimeout(function () {
        // Need to figure out a new way to do this
        try {
          if (ripples.length < 1) el.style.position = null;
          animation.parentNode && el.removeChild(animation.parentNode);
        } catch (e) {}
      }, 300);
    }, delay);
  }
};

function isRippleEnabled(value) {
  return typeof value === 'undefined' || !!value;
}

function rippleShow(e) {
  var value = {};
  var element = e.currentTarget;
  value.center = element._ripple.centered;
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  ripple.show(e, element, value);
}

function rippleHide(e) {
  ripple.hide(e.currentTarget);
}

function updateRipple(el, binding, wasEnabled) {
  var enabled = isRippleEnabled(binding.value);
  if (!enabled) {
    ripple.hide(el);
  }
  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;
  var value = binding.value || {};
  if (value.center) {
    el._ripple.centered = true;
  }
  if (value.class) {
    el._ripple.class = binding.value.class;
  }
  if (enabled && !wasEnabled) {
    if ('ontouchstart' in window) {
      el.addEventListener('touchend', rippleHide, false);
      el.addEventListener('touchcancel', rippleHide, false);
    }

    el.addEventListener('mousedown', rippleShow, false);
    el.addEventListener('mouseup', rippleHide, false);
    el.addEventListener('mouseleave', rippleHide, false);
    // Anchor tags can be dragged, causes other hides to fail - #1537
    el.addEventListener('dragstart', rippleHide, false);
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}

function removeListeners(el) {
  el.removeEventListener('touchstart', rippleShow, false);
  el.removeEventListener('mousedown', rippleShow, false);
  el.removeEventListener('touchend', rippleHide, false);
  el.removeEventListener('touchcancel', rippleHide, false);
  el.removeEventListener('mouseup', rippleHide, false);
  el.removeEventListener('mouseleave', rippleHide, false);
  el.removeEventListener('dragstart', rippleHide, false);
}

function directive(el, binding) {
  updateRipple(el, binding, false);
}

function unbind(el, binding) {
  delete el._ripple;
  removeListeners(el);
}

function update(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }

  var wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ripple',
  bind: directive,
  unbind: unbind,
  update: update
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validatable__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_VIcon__ = __webpack_require__(3);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'input',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_3__components_VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__loadable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__validatable__["a" /* default */]],

  data: function data() {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    };
  },


  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: function _default() {
        return [13, 32];
      }
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses: function inputGroupClasses() {
      return Object.assign({
        'input-group': true,
        'input-group--async-loading': this.loading !== false,
        'input-group--focused': this.isFocused,
        'input-group--dirty': this.isDirty,
        'input-group--tab-focused': this.tabFocused,
        'input-group--disabled': this.disabled,
        'input-group--error': this.hasError,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required,
        'input-group--hide-details': this.hideDetails,
        'input-group--placeholder': !!this.placeholder,
        'theme--dark': this.dark,
        'theme--light': this.light
      }, this.classes);
    },
    isDirty: function isDirty() {
      return !!this.inputValue;
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {},
    groupBlur: function groupBlur(e) {
      this.tabFocused = false;
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label);
    },
    genMessages: function genMessages() {
      var messages = null;

      if (this.hint && (this.isFocused || this.persistentHint) && !this.validations.length) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])];
      }

      return this.$createElement('transition', {
        props: {
          name: 'slide-y-transition'
        }
      }, messages);
    },
    genHint: function genHint() {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__hint',
        domProps: { innerHTML: this.hint }
      });
    },
    genError: function genError(error) {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__error'
      }, error);
    },
    genIcon: function genIcon(type) {
      var _class;

      var defaultCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var shouldClear = type === 'append' && this.clearable && this.isDirty;
      var icon = shouldClear ? 'clear' : this[type + 'Icon'];
      var callback = shouldClear ? this.clearableCallback : this[type + 'IconCb'] || defaultCallback;

      return this.$createElement('v-icon', {
        'class': (_class = {}, _defineProperty(_class, 'input-group__' + type + '-icon', true), _defineProperty(_class, 'input-group__icon-cb', !!callback), _defineProperty(_class, 'input-group__icon-clearable', shouldClear), _class),
        props: {
          disabled: this.disabled
        },
        on: {
          click: function click(e) {
            if (!callback) return;

            e.stopPropagation();
            callback();
          }
        }
      }, icon);
    },
    genInputGroup: function genInputGroup(input) {
      var _this = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultAppendCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var children = [];
      var wrapperChildren = [];
      var detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: function click() {
            return _this.tabFocused = false;
          },
          keyup: function keyup(e) {
            if ([9, 16].includes(e.keyCode)) {
              _this.tabFocused = true;
            }
          },
          keydown: function keydown(e) {
            if (!_this.toggle) return;

            if (_this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault();
              _this.toggle();
            }
          }
        }
      }, data);

      if (this.$slots.label || this.label) {
        children.push(this.genLabel());
      }

      wrapperChildren.push(input);

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'));
      }

      if (this.appendIcon || this.clearable) {
        wrapperChildren.push(this.genIcon('append', defaultAppendCallback));
      }

      var progress = this.genProgress();
      progress && detailsChildren.push(progress);

      children.push(this.$createElement('div', {
        'class': 'input-group__input'
      }, wrapperChildren));

      !this.hideDetails && detailsChildren.push(this.genMessages());

      if (this.counter) {
        detailsChildren.push(this.genCounter());
      }

      children.push(this.$createElement('div', {
        'class': 'input-group__details'
      }, detailsChildren));

      return this.$createElement('div', data, children);
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function searchChildren(children) {
  var results = [];
  for (var index = 0; index < children.length; index++) {
    var child = children[index];
    if (child.isActive && child.isDependent) {
      results.push(child);
    } else {
      results.push.apply(results, _toConsumableArray(searchChildren(child.$children)));
    }
  }

  return results;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'dependent',

  data: function data() {
    return {
      closeDependents: true,
      isDependent: true
    };
  },


  methods: {
    getOpenDependents: function getOpenDependents() {
      if (this.closeDependents) return searchChildren(this.$children);

      return [];
    },
    getOpenDependentElements: function getOpenDependentElements() {
      var result = [];
      var openDependents = this.getOpenDependents();

      for (var index = 0; index < openDependents.length; index++) {
        result.push.apply(result, _toConsumableArray(openDependents[index].getClickableDependentElements()));
      }

      return result;
    },
    getClickableDependentElements: function getClickableDependentElements() {
      var result = [this.$el];
      if (this.$refs.content) result.push(this.$refs.content);
      result.push.apply(result, _toConsumableArray(this.getOpenDependentElements()));

      return result;
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (val) return;

      var openDependents = this.getOpenDependents();
      for (var index = 0; index < openDependents.length; index++) {
        openDependents[index].isActive = false;
      }
    }
  }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VCardActions */
/* unused harmony export VCardText */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VCardMedia__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VCardTitle__ = __webpack_require__(119);
/* unused harmony reexport VCard */
/* unused harmony reexport VCardMedia */
/* unused harmony reexport VCardTitle */





var VCardActions = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('card__actions');
var VCardText = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('card__text');



/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a" /* default */]);
  Vue.component(VCardActions.name, VCardActions);
  Vue.component(VCardText.name, VCardText);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__ = __webpack_require__(17);


/** @mixin */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'rippleable',

  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a" /* default */] },

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  methods: {
    genRipple: function genRipple() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { directives: [] };

      data.class = this.rippleClasses || 'input-group--selection-controls__ripple';
      data.directives.push({
        name: 'ripple',
        value: this.ripple && !this.disabled && { center: true }
      });
      data.on = Object.assign({
        click: this.toggle
      }, this.$listeners);

      return this.$createElement('div', data);
    }
  }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var padStart = function padStart(string, targetLength, padString) {
  targetLength = targetLength >> 0;
  string = String(string);
  padString = String(padString);
  if (string.length > targetLength) {
    return String(string);
  }

  targetLength = targetLength - string.length;
  if (targetLength > padString.length) {
    padString += padString.repeat(targetLength / padString.length);
  }
  return padString.slice(0, targetLength) + String(string);
};

/* harmony default export */ __webpack_exports__["a"] = (function (n) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return padStart(n, length, '0');
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ssr-bootable',

  data: function data() {
    return {
      isBooted: false
    };
  },

  mounted: function mounted() {
    var _this = this;

    // Use setAttribute instead of dataset
    // because dataset does not work well
    // with unit tests
    window.requestAnimationFrame(function () {
      _this.$el.setAttribute('data-booted', true);
      _this.isBooted = true;
    });
  }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'transitionable',

  props: {
    mode: String,
    origin: String,
    transition: String
  }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootable__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_console__ = __webpack_require__(6);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




function validateAttachTarget(val) {
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);

  if (type === 'boolean' || type === 'string') return true;

  return val.nodeType === Node.ELEMENT_NODE;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'detachable',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__bootable__["a" /* default */]],

  props: {
    attach: {
      type: null,
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      default: ''
    }
  },

  mounted: function mounted() {
    this.initDetach();
  },
  deactivated: function deactivated() {
    this.isActive = false;
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.$refs.content) return;

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    } catch (e) {}
  },


  methods: {
    initDetach: function initDetach() {
      if (this._isDestroyed || !this.$refs.content ||
      // Leave menu in place if attached
      // and dev has not changed target
      this.attach === '' || // If used as a boolean prop (<v-menu attach>)
      this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
      this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) return;

      var target = void 0;
      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]');
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach);
      } else {
        // DOM Element
        target = this.attach;
      }

      if (!target) {
        Object(__WEBPACK_IMPORTED_MODULE_1__util_console__["b" /* consoleWarn */])('Unable to locate target ' + (this.attach || '[data-app]'), this);
        return;
      }

      target.insertBefore(this.$refs.content, target.firstChild);
    }
  }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'returnable',

  data: function data() {
    return {
      originalValue: null
    };
  },

  props: {
    returnValue: null
  },

  watch: {
    isActive: function isActive(val) {
      if (val) {
        this.originalValue = this.returnValue;
      } else {
        this.$emit('update:returnValue', this.originalValue);
      }
    }
  },

  methods: {
    save: function save(value) {
      this.originalValue = value;
      this.$emit('update:returnValue', value);
      this.isActive = false;
    }
  }
});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;
function Grid(name) {
  return {
    name: 'v-' + name,

    functional: true,

    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;

      data.staticClass = (name + ' ' + (data.staticClass || '')).trim();

      if (data.attrs) {
        var classes = Object.keys(data.attrs).filter(function (key) {
          var value = data.attrs[key];
          return value || typeof value === 'string';
        });

        if (classes.length) data.staticClass += ' ' + classes.join(' ');
        delete data.attrs;
      }

      if (props.id) {
        data.domProps = data.domProps || {};
        data.domProps.id = props.id;
      }

      return h(props.tag, data, children);
    }
  };
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = colorToInt;
/* harmony export (immutable) */ __webpack_exports__["b"] = intToHex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__console__ = __webpack_require__(6);


/**
 * @param {string|number} color
 * @returns {number}
 */
function colorToInt(color) {
  var rgb = void 0;

  if (typeof color === 'number') {
    rgb = color;
  } else if (typeof color === 'string') {
    var c = color[0] === '#' ? color.substring(1) : color;
    if (c.length === 3) {
      c = c.split('').map(function (char) {
        return char + char;
      }).join('');
    }
    if (c.length !== 6) {
      Object(__WEBPACK_IMPORTED_MODULE_0__console__["b" /* consoleWarn */])('\'' + color + '\' is not a valid rgb color');
    }
    rgb = parseInt(c, 16);
  } else {
    throw new TypeError('Colors can only be numbers or strings, recieved ' + color.constructor.name + ' instead');
  }

  if (rgb < 0) {
    Object(__WEBPACK_IMPORTED_MODULE_0__console__["b" /* consoleWarn */])('Colors cannot be negative: \'' + color + '\'');
    rgb = 0;
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    Object(__WEBPACK_IMPORTED_MODULE_0__console__["b" /* consoleWarn */])('\'' + color + '\' is not a valid rgb color');
    rgb = 0xffffff;
  }

  return rgb;
}

/**
 * @param {number} color
 * @returns {string}
 */
function intToHex(color) {
  color = color.toString(16);

  if (color.length < 6) color = '0'.repeat(6 - color.length) + color;

  return '#' + color;
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAvatar__ = __webpack_require__(94);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */]);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__registrable__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'button-group',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_0__registrable__["b" /* provide */])('buttonGroup')],

  data: function data() {
    return {
      buttons: [],
      listeners: []
    };
  },


  methods: {
    getValue: function getValue(i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value;
      }

      // Fix for testing, this should always be false in the browser
      if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
        return this.buttons[i].$el.value;
      }

      return i;
    },
    update: function update() {
      var selected = [];

      for (var i = 0; i < this.buttons.length; i++) {
        var elm = this.buttons[i].$el;
        var button = this.buttons[i];

        elm.removeAttribute('data-only-child');

        if (this.isSelected(i)) {
          !button.to && (button.isActive = true);
          selected.push(i);
        } else {
          !button.to && (button.isActive = false);
        }
      }

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true);
      }
    },
    register: function register(button) {
      var index = this.buttons.length;
      this.buttons.push(button);
      this.listeners.push(this.updateValue.bind(this, index));
      button.$on('click', this.listeners[index]);
    },
    unregister: function unregister(button) {
      var _this = this;

      var index = this.buttons.indexOf(button);
      if (index === -1) {
        return;
      }

      var wasSelected = this.isSelected(index);

      button.$off('click', this.listeners[index]);
      this.buttons.splice(index, 1);
      this.listeners.splice(index, 1);

      // Preserve the mandatory invariant
      if (wasSelected && this.mandatory && this.buttons.every(function (_, i) {
        return !_this.isSelected(i);
      }) && this.listeners.length > 0) {
        this.listeners[0]();
      }
    }
  },

  mounted: function mounted() {
    this.update();
  }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dialogs_styl__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dialogs_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_dialogs_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_dependent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_detachable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_overlayable__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_returnable__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_stackable__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_click_outside__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_helpers__ = __webpack_require__(2);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// Mixins







// Directives


// Helpers


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_returnable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_stackable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_7__directives_click_outside__["a" /* default */]
  },

  data: function data() {
    return {
      isDependent: false,
      stackClass: 'dialog__content__active',
      stackMinZIndex: 200
    };
  },


  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'none'
    },
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    }
  },

  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, ('dialog ' + this.contentClass).trim(), true), _defineProperty(_ref, 'dialog--active', this.isActive), _defineProperty(_ref, 'dialog--persistent', this.persistent), _defineProperty(_ref, 'dialog--fullscreen', this.fullscreen), _defineProperty(_ref, 'dialog--scrollable', this.scrollable), _ref;
    },
    contentClasses: function contentClasses() {
      return {
        'dialog__content': true,
        'dialog__content__active': this.isActive
      };
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (val) {
        this.show();
      } else {
        this.removeOverlay();
        this.unbind();
      }
    }
  },

  mounted: function mounted() {
    this.isBooted = this.isActive;
    this.isActive && this.show();
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') this.unbind();
  },


  methods: {
    closeConditional: function closeConditional(e) {
      // close dialog if !persistent, clicked outside and we're the topmost dialog.
      // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
      return this.isActive && !this.persistent && Object(__WEBPACK_IMPORTED_MODULE_8__util_helpers__["i" /* getZIndex */])(this.$refs.content) >= this.getMaxZIndex() && !this.$refs.content.contains(e.target);
    },
    show: function show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay();
      this.fullscreen && this.hideScroll();
      this.$refs.content.focus();
      this.$listeners.keydown && this.bind();
    },
    bind: function bind() {
      window.addEventListener('keydown', this.onKeydown);
    },
    unbind: function unbind() {
      window.removeEventListener('keydown', this.onKeydown);
    },
    onKeydown: function onKeydown(e) {
      this.$emit('keydown', e);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [];
    var data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [{
        name: 'click-outside',
        value: function value() {
          return _this.isActive = false;
        },
        args: {
          closeConditional: this.closeConditional,
          include: this.getOpenDependentElements
        }
      }, { name: 'show', value: this.isActive }],
      on: {
        click: function click(e) {
          e.stopPropagation();
        }
      }
    };

    if (!this.fullscreen) {
      data.style = {
        maxWidth: this.maxWidth === 'none' ? undefined : isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px',
        width: this.width === 'auto' ? undefined : isNaN(this.width) ? this.width : this.width + 'px'
      };
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: function click(e) {
            e.stopPropagation();
            if (!_this.disabled) _this.isActive = !_this.isActive;
          }
        }
      }, [this.$slots.activator]));
    }

    var dialog = h('transition', {
      props: {
        name: this.transition || '', // If false, show nothing
        origin: this.origin
      }
    }, [h('div', data, this.showLazyContent(this.$slots.default))]);

    children.push(h('div', {
      'class': this.contentClasses,
      domProps: { tabIndex: -1 },
      style: { zIndex: this.activeZIndex },
      ref: 'content'
    }, [dialog]));

    return h('div', {
      staticClass: 'dialog__container',
      style: {
        display: !this.$slots.activator || this.fullWidth ? 'block' : 'inline-block'
      }
    }, children);
  }
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_overlay_styl__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_overlay_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_overlay_styl__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'overlayable',

  data: function data() {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTimeout: null,
      overlayTransitionDuration: 500 + 150 // transition + delay
    };
  },


  props: {
    hideOverlay: Boolean
  },

  beforeDestroy: function beforeDestroy() {
    this.removeOverlay();
  },


  methods: {
    genOverlay: function genOverlay() {
      var _this = this;

      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if (!this.isActive || this.hideOverlay || this.isActive && this.overlayTimeout || this.overlay) {
        clearTimeout(this.overlayTimeout);

        return this.overlay && this.overlay.classList.add('overlay--active');
      }

      this.overlay = document.createElement('div');
      this.overlay.className = 'overlay';

      if (this.absolute) this.overlay.className += ' overlay--absolute';

      this.hideScroll();

      var parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');

      parent && parent.insertBefore(this.overlay, parent.firstChild);

      // eslint-disable-next-line no-unused-expressions
      this.overlay.clientHeight; // Force repaint
      requestAnimationFrame(function () {
        _this.overlay.className += ' overlay--active';

        if (_this.activeZIndex !== undefined) {
          _this.overlay.style.zIndex = _this.activeZIndex - 1;
        }
      });

      return true;
    },
    removeOverlay: function removeOverlay() {
      var _this2 = this;

      if (!this.overlay) {
        return this.showScroll();
      }

      this.overlay.classList.remove('overlay--active');

      this.overlayTimeout = setTimeout(function () {
        // IE11 Fix
        try {
          _this2.overlay.parentNode.removeChild(_this2.overlay);
          _this2.overlay = null;
          _this2.showScroll();
        } catch (e) {}

        clearTimeout(_this2.overlayTimeout);
        _this2.overlayTimeout = null;
      }, this.overlayTransitionDuration);
    },

    /**
     * @param {Event} e
     * @returns void
     */
    scrollListener: function scrollListener(e) {
      if (e.type === 'keydown') {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        var up = [38, 33];
        var down = [40, 34];

        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }

      if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) e.preventDefault();
    },
    hasScrollbar: function hasScrollbar(el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;

      var style = window.getComputedStyle(el);
      return ['auto', 'scroll'].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight;
    },
    shouldScroll: function shouldScroll(el, delta) {
      if (el.scrollTop === 0 && delta < 0) return true;
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    },
    isInside: function isInside(el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },

    /**
     * @param {Event} e
     * @returns boolean
     */
    checkPath: function checkPath(e) {
      var path = e.path || this.composedPath(e);
      var delta = e.deltaY || -e.wheelDelta;

      if (e.type === 'keydown' && path[0] === document.body) {
        var dialog = this.$refs.dialog;
        var selected = window.getSelection().anchorNode;
        if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }
        return true;
      }

      for (var index = 0; index < path.length; index++) {
        var el = path[index];

        if (el === document) return true;
        if (el === document.documentElement) return true;
        if (el === this.$refs.content) return true;

        if (this.hasScrollbar(el)) return this.shouldScroll(el, delta);
      }

      return true;
    },

    /**
     * Polyfill for Event.prototype.composedPath
     * @param {Event} e
     * @returns Element[]
     */
    composedPath: function composedPath(e) {
      if (e.composedPath) return e.composedPath();

      var path = [];
      var el = e.target;

      while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);

          return path;
        }

        el = el.parentElement;
      }
    },
    hideScroll: function hideScroll() {
      if (this.$vuetify.breakpoint.smAndDown) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        window.addEventListener('wheel', this.scrollListener);
        window.addEventListener('keydown', this.scrollListener);
      }
    },
    showScroll: function showScroll() {
      document.documentElement.classList.remove('overflow-y-hidden');
      window.removeEventListener('wheel', this.scrollListener);
      window.removeEventListener('keydown', this.scrollListener);
    }
  }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'stackable',

  data: function data() {
    return {
      stackBase: null,
      stackClass: 'unpecified',
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0
    };
  },

  computed: {
    /**
     * Currently active z-index
     *
     * @return {number}
     */
    activeZIndex: function activeZIndex() {
      if (typeof window === 'undefined') return 0;

      var content = this.stackElement || this.$refs.content;
      // Return current zindex if not active

      var index = !this.isActive ? Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["i" /* getZIndex */])(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;

      if (index == null) return index;

      // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)
      return parseInt(index);
    }
  },
  methods: {
    getMaxZIndex: function getMaxZIndex() {
      var exclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var base = this.stackBase || this.$el;
      // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater
      var zis = [this.stackMinZIndex, Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["i" /* getZIndex */])(base)];
      // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146
      var activeElements = [].concat(_toConsumableArray(document.getElementsByClassName(this.stackClass)));

      // Get z-index for all active dialogs
      for (var index = 0; index < activeElements.length; index++) {
        if (!exclude.includes(activeElements[index])) {
          zis.push(Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["i" /* getZIndex */])(activeElements[index]));
        }
      }

      return Math.max.apply(Math, zis);
    }
  }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VJumbotron__ = __webpack_require__(124);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a" /* default */]);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCheckbox__ = __webpack_require__(126);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */]);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = (function () {
  var expandedParentClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return {
    enter: function enter(el, done) {
      el._parent = el.parentNode;

      Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

      // Get height that is to be scrolled
      el.style.overflow = 'hidden';
      el.style.height = 0;
      el.style.display = 'block';
      expandedParentClass && el._parent.classList.add(expandedParentClass);

      setTimeout(function () {
        return el.style.height = el.scrollHeight + 'px';
      }, 100);
    },
    afterEnter: function afterEnter(el) {
      el.style.overflow = null;
      el.style.height = null;
    },
    leave: function leave(el, done) {
      // Remove initial transition
      Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

      // Set height before we transition to 0
      el.style.overflow = 'hidden';
      el.style.height = el.offsetHeight + 'px';

      setTimeout(function () {
        return el.style.height = 0;
      }, 100);
    },
    afterLeave: function afterLeave(el) {
      expandedParentClass && el._parent.classList.remove(expandedParentClass);
    }
  };
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(19);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'selectable',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__colorable__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  data: function data() {
    return {
      defaultColor: 'accent'
    };
  },

  props: {
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null
  },

  computed: {
    isActive: function isActive() {
      if (Array.isArray(this.inputValue)) {
        return this.inputValue.indexOf(this.value) !== -1;
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value ? this.value === this.inputValue : Boolean(this.inputValue);
      }

      return this.inputValue === this.trueValue;
    },
    isDirty: function isDirty() {
      return this.isActive;
    }
  },

  watch: {
    indeterminate: function indeterminate(val) {
      this.inputIndeterminate = val;
    }
  },

  methods: {
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: { click: this.toggle },
        attrs: {
          for: this.id
        }
      }, this.$slots.label || this.label);
    },
    toggle: function toggle() {
      if (this.disabled) {
        return;
      }

      var input = this.inputValue;
      if (Array.isArray(input)) {
        input = input.slice();
        var i = input.indexOf(this.value);

        if (i === -1) {
          input.push(this.value);
        } else {
          input.splice(i, 1);
        }
      } else if (this.trueValue || this.falseValue) {
        input = input === this.trueValue ? this.falseValue : this.trueValue;
      } else if (this.value) {
        input = this.value === this.inputValue ? null : this.value;
      } else {
        input = !input;
      }

      this.validate(true, input);

      this.$emit('change', input);
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'loadable',

  props: {
    loading: {
      type: [Boolean, String],
      default: false
    }
  },

  methods: {
    genProgress: function genProgress() {
      if (this.loading === false) return null;

      return this.$slots.progress || this.$createElement('v-progress-linear', {
        props: {
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
          height: 2,
          indeterminate: true
        }
      });
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VChip__ = __webpack_require__(128);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */]);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_VSelect__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filterable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loadable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_console__ = __webpack_require__(6);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();












/**
 * DataIterable
 *
 * @mixin
 *
 * Base behavior for data table and data iterator
 * providing selection, pagination, sorting and filtering.
 *
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'data-iterable',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_0__components_VBtn__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_1__components_VIcon__["a" /* default */],
    VSelect: __WEBPACK_IMPORTED_MODULE_2__components_VSelect__["a" /* default */]
  },

  data: function data() {
    return {
      searchLength: 0,
      defaultPagination: {
        descending: false,
        page: 1,
        rowsPerPage: 5,
        sortBy: null,
        totalItems: 0
      },
      expanded: {},
      actionsClasses: 'data-iterator__actions',
      actionsRangeControlsClasses: 'data-iterator__actions__range-controls',
      actionsSelectClasses: 'data-iterator__actions__select',
      actionsPaginationClasses: 'data-iterator__actions__pagination'
    };
  },


  mixins: [__WEBPACK_IMPORTED_MODULE_3__filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__loadable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__themeable__["a" /* default */]],

  props: {
    expand: Boolean,
    hideActions: Boolean,
    disableInitialSort: Boolean,
    mustSort: Boolean,
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    rowsPerPageItems: {
      type: Array,
      default: function _default() {
        return [5, 10, 25, { text: 'All', value: -1 }];
      }
    },
    rowsPerPageText: {
      type: String,
      default: 'Items per page:'
    },
    selectAll: [Boolean, String],
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: function _default(val, search) {
        return val != null && typeof val !== 'boolean' && val.toString().toLowerCase().indexOf(search) !== -1;
      }
    },
    customFilter: {
      type: Function,
      default: function _default(items, search, filter) {
        search = search.toString().toLowerCase();
        if (search.trim() === '') return items;

        return items.filter(function (i) {
          return Object.keys(i).some(function (j) {
            return filter(i[j], search);
          });
        });
      }
    },
    customSort: {
      type: Function,
      default: function _default(items, index, isDescending) {
        if (index === null) return items;

        return items.sort(function (a, b) {
          var sortA = Object(__WEBPACK_IMPORTED_MODULE_6__util_helpers__["h" /* getObjectValueByPath */])(a, index);
          var sortB = Object(__WEBPACK_IMPORTED_MODULE_6__util_helpers__["h" /* getObjectValueByPath */])(b, index);

          if (isDescending) {
            var _ref = [sortB, sortA];
            sortA = _ref[0];
            sortB = _ref[1];
          }

          // Check if both are numbers
          if (!isNaN(sortA) && !isNaN(sortB)) {
            return sortA - sortB;
          }

          // Check if both cannot be evaluated
          if (sortA === null && sortB === null) {
            return 0;
          }

          var _map = [sortA, sortB].map(function (s) {
            return (s || '').toString().toLocaleLowerCase();
          });

          var _map2 = _slicedToArray(_map, 2);

          sortA = _map2[0];
          sortB = _map2[1];


          if (sortA > sortB) return 1;
          if (sortA < sortB) return -1;

          return 0;
        });
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    items: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    totalItems: {
      type: Number,
      default: null
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    pagination: {
      type: Object,
      default: function _default() {}
    }
  },

  computed: {
    computedPagination: function computedPagination() {
      return this.hasPagination ? this.pagination : this.defaultPagination;
    },
    hasPagination: function hasPagination() {
      var pagination = this.pagination || {};

      return Object.keys(pagination).length > 0;
    },
    hasSelectAll: function hasSelectAll() {
      return this.selectAll !== undefined && this.selectAll !== false;
    },
    itemsLength: function itemsLength() {
      if (this.search) return this.searchLength;
      return this.totalItems || this.items.length;
    },
    indeterminate: function indeterminate() {
      return this.hasSelectAll && this.someItems && !this.everyItem;
    },
    everyItem: function everyItem() {
      var _this = this;

      return this.filteredItems.length && this.filteredItems.every(function (i) {
        return _this.isSelected(i);
      });
    },
    someItems: function someItems() {
      var _this2 = this;

      return this.filteredItems.some(function (i) {
        return _this2.isSelected(i);
      });
    },
    getPage: function getPage() {
      var rowsPerPage = this.computedPagination.rowsPerPage;


      return rowsPerPage === Object(rowsPerPage) ? rowsPerPage.value : rowsPerPage;
    },
    pageStart: function pageStart() {
      return this.getPage === -1 ? 0 : (this.computedPagination.page - 1) * this.getPage;
    },
    pageStop: function pageStop() {
      return this.getPage === -1 ? this.itemsLength : this.computedPagination.page * this.getPage;
    },
    filteredItems: function filteredItems() {
      return this.filteredItemsImpl();
    },
    selected: function selected() {
      var selected = {};
      for (var index = 0; index < this.value.length; index++) {
        selected[this.value[index][this.itemKey]] = true;
      }
      return selected;
    }
  },

  watch: {
    search: function search() {
      this.updatePagination({ page: 1, totalItems: this.itemsLength });
    }
  },

  methods: {
    initPagination: function initPagination() {
      if (!this.rowsPerPageItems.length) {
        Object(__WEBPACK_IMPORTED_MODULE_7__util_console__["b" /* consoleWarn */])('The prop \'rows-per-page-items\' can not be empty', this);
      } else {
        this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
      }

      this.defaultPagination.totalItems = this.itemsLength;

      this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
    },
    updatePagination: function updatePagination(val) {
      var pagination = this.hasPagination ? this.pagination : this.defaultPagination;
      var updatedPagination = Object.assign({}, pagination, val);
      this.$emit('update:pagination', updatedPagination);

      if (!this.hasPagination) {
        this.defaultPagination = updatedPagination;
      }
    },
    isSelected: function isSelected(item) {
      return this.selected[item[this.itemKey]];
    },
    isExpanded: function isExpanded(item) {
      return this.expanded[item[this.itemKey]];
    },
    filteredItemsImpl: function filteredItemsImpl() {
      if (this.totalItems) return this.items;

      var items = this.items.slice();
      var hasSearch = typeof this.search !== 'undefined' && this.search !== null;

      if (hasSearch) {
        for (var _len = arguments.length, additionalFilterArgs = Array(_len), _key = 0; _key < _len; _key++) {
          additionalFilterArgs[_key] = arguments[_key];
        }

        items = this.customFilter.apply(this, [items, this.search, this.filter].concat(additionalFilterArgs));
        this.searchLength = items.length;
      }

      items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);

      return this.hideActions && !this.hasPagination ? items : items.slice(this.pageStart, this.pageStop);
    },
    sort: function sort(index) {
      var _computedPagination = this.computedPagination,
          sortBy = _computedPagination.sortBy,
          descending = _computedPagination.descending;

      if (sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false });
      } else if (sortBy === index && !descending) {
        this.updatePagination({ descending: true });
      } else if (sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false });
      } else if (!this.mustSort) {
        this.updatePagination({ sortBy: null, descending: null });
      } else {
        this.updatePagination({ sortBy: index, descending: false });
      }
    },
    toggle: function toggle(value) {
      var _this3 = this;

      var selected = Object.assign({}, this.selected);
      for (var index = 0; index < this.filteredItems.length; index++) {
        selected[this.filteredItems[index][this.itemKey]] = value;
      }

      this.$emit('input', this.items.filter(function (i) {
        return selected[i[_this3.itemKey]];
      }));
    },
    createProps: function createProps(item, index) {
      var _this4 = this;

      var props = { item: item, index: index };
      var keyProp = this.itemKey;
      var itemKey = item[keyProp];

      Object.defineProperty(props, 'selected', {
        get: function get() {
          return _this4.selected[item[_this4.itemKey]];
        },
        set: function set(value) {
          if (itemKey == null) {
            Object(__WEBPACK_IMPORTED_MODULE_7__util_console__["b" /* consoleWarn */])('"' + keyProp + '" attribute must be defined for item', _this4);
          }

          var selected = _this4.value.slice();
          if (value) selected.push(item);else selected = selected.filter(function (i) {
            return i[keyProp] !== itemKey;
          });
          _this4.$emit('input', selected);
        }
      });

      Object.defineProperty(props, 'expanded', {
        get: function get() {
          return _this4.expanded[item[_this4.itemKey]];
        },
        set: function set(value) {
          if (itemKey == null) {
            Object(__WEBPACK_IMPORTED_MODULE_7__util_console__["b" /* consoleWarn */])('"' + keyProp + '" attribute must be defined for item', _this4);
          }

          if (!_this4.expand) {
            for (var key in _this4.expanded) {
              _this4.expanded.hasOwnProperty(key) && _this4.$set(_this4.expanded, key, false);
            }
          }
          _this4.$set(_this4.expanded, itemKey, value);
        }
      });

      return props;
    },
    genItems: function genItems() {
      if (!this.itemsLength && !this.items.length) {
        var noData = this.$slots['no-data'] || this.noDataText;
        return [this.genEmptyItems(noData)];
      }

      if (!this.filteredItems.length) {
        var noResults = this.$slots['no-results'] || this.noResultsText;
        return [this.genEmptyItems(noResults)];
      }

      return this.genFilteredItems();
    },
    genPrevIcon: function genPrevIcon() {
      var _this5 = this;

      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: function click() {
            var page = _this5.computedPagination.page;
            _this5.updatePagination({ page: page - 1 });
          }
        },
        attrs: {
          'aria-label': 'Previous page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', this.prevIcon)]);
    },
    genNextIcon: function genNextIcon() {
      var _this6 = this;

      var pagination = this.computedPagination;
      var disabled = pagination.rowsPerPage < 0 || pagination.page * pagination.rowsPerPage >= this.itemsLength || this.pageStop < 0;

      return this.$createElement('v-btn', {
        props: {
          disabled: disabled,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: function click() {
            var page = _this6.computedPagination.page;
            _this6.updatePagination({ page: page + 1 });
          }
        },
        attrs: {
          'aria-label': 'Next page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', this.nextIcon)]);
    },
    genSelect: function genSelect() {
      var _this7 = this;

      return this.$createElement('div', {
        'class': this.actionsSelectClasses
      }, [this.rowsPerPageText, this.$createElement('v-select', {
        attrs: {
          'aria-label': this.rowsPerPageText
        },
        props: {
          items: this.rowsPerPageItems,
          value: this.computedPagination.rowsPerPage,
          hideDetails: true,
          auto: true,
          minWidth: '75px'
        },
        on: {
          input: function input(val) {
            _this7.updatePagination({
              page: 1,
              rowsPerPage: val
            });
          }
        }
      })]);
    },
    genPagination: function genPagination() {
      var pagination = '–';

      if (this.itemsLength) {
        var stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;

        pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
          pageStart: this.pageStart + 1,
          pageStop: stop,
          itemsLength: this.itemsLength
        }) : this.pageStart + 1 + '-' + stop + ' of ' + this.itemsLength;
      }

      return this.$createElement('div', {
        'class': this.actionsPaginationClasses
      }, [pagination]);
    },
    genActions: function genActions() {
      var rangeControls = this.$createElement('div', {
        'class': this.actionsRangeControlsClasses
      }, [this.genPagination(), this.genPrevIcon(), this.genNextIcon()]);

      return [this.$createElement('div', {
        'class': this.actionsClasses
      }, [this.rowsPerPageItems.length > 1 ? this.genSelect() : null, rangeControls])];
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSelect__ = __webpack_require__(133);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */]);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VListTileActionText */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VListTileContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VListTileTitle; });
/* unused harmony export VListTileSubTitle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VList__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VListGroup__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VListTile__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VListTileAction__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VListTileAvatar__ = __webpack_require__(140);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__VList__["a"]; });
/* unused harmony reexport VListGroup */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__VListTile__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a"]; });
/* unused harmony reexport VListTileAvatar */









var VListTileActionText = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__action-text', 'span');
var VListTileContent = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__content', 'div');
var VListTileTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__title', 'div');
var VListTileSubTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__sub-title', 'div');

/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VListGroup__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VListGroup__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VListTile__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VListTile__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a" /* default */]);
  Vue.component(VListTileActionText.name, VListTileActionText);
  Vue.component(__WEBPACK_IMPORTED_MODULE_5__VListTileAvatar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_5__VListTileAvatar__["a" /* default */]);
  Vue.component(VListTileContent.name, VListTileContent);
  Vue.component(VListTileSubTitle.name, VListTileSubTitle);
  Vue.component(VListTileTitle.name, VListTileTitle);
};

/* harmony default export */ __webpack_exports__["f"] = (__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */]);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VMenu__ = __webpack_require__(141);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */]);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close
 * delay time for elements
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'delayable',

  data: function data() {
    return {
      openTimeout: null,
      closeTimeout: null
    };
  },

  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 200
    }
  },

  methods: {
    /**
     * Clear any pending delay
     * timers from executing
     *
     * @return {void}
     */
    clearDelay: function clearDelay() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);
    },

    /**
     * Runs callback after
     * a specified delay
     *
     * @param  {String}   type
     * @param  {Function} cb
     *
     * @return {void}
     */
    runDelay: function runDelay(type, cb) {
      this.clearDelay();

      var delay = parseInt(this[type + 'Delay'], 10);

      this[type + 'Timeout'] = setTimeout(cb, delay);
    }
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__positionable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stackable__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__themeable__ = __webpack_require__(1);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };






/* eslint-disable object-property-newline */
var dimensions = {
  activator: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  content: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  hasWindow: false
  /* eslint-enable object-property-newline */

  /**
   * Menuable
   *
   * @mixin
   *
   * Used for fixed or absolutely positioning
   * elements within the DOM
   * Can calculate X and Y axis overflows
   * As well as be manually positioned
   */
};/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'menuable',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__stackable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__themeable__["a" /* default */]],

  data: function data() {
    return {
      absoluteX: 0,
      absoluteY: 0,
      dimensions: Object.assign({}, dimensions),
      isContentActive: false,
      pageYOffset: 0,
      stackClass: 'menuable__content__active',
      stackMinZIndex: 6
    };
  },

  props: {
    activator: {
      default: null,
      validator: function validator(val) {
        return ['string', 'object'].includes(typeof val === 'undefined' ? 'undefined' : _typeof(val));
      }
    },
    allowOverflow: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: [Number, String],
      default: 0
    },
    nudgeRight: {
      type: [Number, String],
      default: 0
    },
    nudgeTop: {
      type: [Number, String],
      default: 0
    },
    nudgeWidth: {
      type: [Number, String],
      default: 0
    },
    offsetOverflow: Boolean,
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    zIndex: {
      type: [Number, String],
      default: null
    }
  },

  computed: {
    computedLeft: function computedLeft() {
      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var minWidth = a.width < c.width ? c.width : a.width;
      var left = 0;

      left += this.left ? a.left - (minWidth - a.width) : a.left;

      if (this.offsetX) left += this.left ? -a.width : a.width;
      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
      if (this.nudgeRight) left += parseInt(this.nudgeRight);

      return left;
    },
    computedTop: function computedTop() {
      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var top = this.top ? a.bottom - c.height : a.top;

      if (!this.isAttached) top += this.pageYOffset;
      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= this.nudgeTop;
      if (this.nudgeBottom) top += this.nudgeBottom;

      return top;
    },
    hasActivator: function hasActivator() {
      return !!this.$slots.activator || this.activator;
    },
    isAttached: function isAttached() {
      return this.attach !== false;
    }
  },

  watch: {
    disabled: function disabled(val) {
      val && this.callDeactivate();
    },
    isActive: function isActive(val) {
      if (this.disabled) return;

      val ? this.callActivate() : this.callDeactivate();
    }
  },

  beforeMount: function beforeMount() {
    this.checkForWindow();
  },


  methods: {
    absolutePosition: function absolutePosition() {
      return {
        offsetTop: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      };
    },
    activate: function activate() {},
    calcLeft: function calcLeft() {
      return (this.isAttached ? this.computedLeft : this.calcXOverflow(this.computedLeft)) + 'px';
    },
    calcTop: function calcTop() {
      return (this.isAttached ? this.computedTop : this.calcYOverflow(this.computedTop)) + 'px';
    },
    calcXOverflow: function calcXOverflow(left) {
      var parsedMaxWidth = isNaN(parseInt(this.maxWidth)) ? 0 : parseInt(this.maxWidth);
      var innerWidth = this.getInnerWidth();
      var maxWidth = Math.max(this.dimensions.content.width, parsedMaxWidth);
      var totalWidth = left + maxWidth;
      var availableWidth = totalWidth - innerWidth;

      if ((!this.left || this.right) && availableWidth > 0) {
        left = innerWidth - maxWidth - (innerWidth > 600 ? 30 : 12) // Account for scrollbar
        ;
      }

      if (left < 0) left = 12;

      return left;
    },
    calcYOverflow: function calcYOverflow(top) {
      var documentHeight = this.getInnerHeight();
      var toTop = this.pageYOffset + documentHeight;
      var activator = this.dimensions.activator;
      var contentHeight = this.dimensions.content.height;
      var totalHeight = top + contentHeight;
      var isOverflowing = toTop < totalHeight;

      // If overflowing bottom and offset
      // TODO: set 'bottom' position instead of 'top'
      if (isOverflowing && this.offsetOverflow) {
        top = this.pageYOffset + (activator.top - contentHeight);
        // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - 12;
        // If overflowing top
      } else if (top < this.pageYOffset && !this.allowOverflow) {
        top = this.pageYOffset + 12;
      }

      return top < 12 ? 12 : top;
    },
    callActivate: function callActivate() {
      if (!this.hasWindow) return;

      this.activate();
    },
    callDeactivate: function callDeactivate() {
      this.isContentActive = false;

      this.deactivate();
    },
    checkForWindow: function checkForWindow() {
      if (!this.hasWindow) {
        this.hasWindow = typeof window !== 'undefined';
      }

      if (this.hasWindow) {
        this.pageYOffset = this.getOffsetTop();
      }
    },
    deactivate: function deactivate() {},
    getActivator: function getActivator() {
      if (this.activator) {
        return typeof this.activator === 'string' ? document.querySelector(this.activator) : this.activator;
      }

      return this.$refs.activator.children.length > 0 ? this.$refs.activator.children[0] : this.$refs.activator;
    },
    getInnerHeight: function getInnerHeight() {
      if (!this.hasWindow) return 0;

      return window.innerHeight || document.documentElement.clientHeight;
    },
    getInnerWidth: function getInnerWidth() {
      if (!this.hasWindow) return 0;

      return window.innerWidth;
    },
    getOffsetTop: function getOffsetTop() {
      if (!this.hasWindow) return 0;

      return window.pageYOffset || document.documentElement.scrollTop;
    },
    getRoundedBoundedClientRect: function getRoundedBoundedClientRect(el) {
      var rect = el.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        bottom: Math.round(rect.bottom),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    },
    measure: function measure(el, selector) {
      el = selector ? el.querySelector(selector) : el;

      if (!el || !this.hasWindow) return null;

      var rect = this.getRoundedBoundedClientRect(el);

      // Account for activator margin
      if (this.isAttached) {
        var style = window.getComputedStyle(el);

        rect.left = parseInt(style.marginLeft);
        rect.top = parseInt(style.marginTop);
      }

      return rect;
    },
    sneakPeek: function sneakPeek(cb) {
      var _this = this;

      requestAnimationFrame(function () {
        var el = _this.$refs.content;

        if (!el || _this.isShown(el)) return cb();

        el.style.display = 'inline-block';
        cb();
        el.style.display = 'none';
      });
    },
    startTransition: function startTransition() {
      var _this2 = this;

      requestAnimationFrame(function () {
        return _this2.isContentActive = true;
      });
    },
    isShown: function isShown(el) {
      return el.style.display !== 'none';
    },
    updateDimensions: function updateDimensions() {
      var _this3 = this;

      this.checkForWindow();

      var dimensions = {};

      // Activator should already be shown
      dimensions.activator = !this.hasActivator || this.absolute ? this.absolutePosition() : this.measure(this.getActivator());

      // Display and hide to get dimensions
      this.sneakPeek(function () {
        dimensions.content = _this3.measure(_this3.$refs.content);

        _this3.dimensions = dimensions;
      });
    }
  }
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'filterable',

  props: {
    noDataText: {
      type: String,
      default: 'No data available'
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_mask__ = __webpack_require__(147);
/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'maskable',

  data: function data() {
    return {
      selection: 0,
      lazySelection: 0,
      preDefined: {
        'credit-card': '#### - #### - #### - ####',
        'date': '##/##/####',
        'date-with-time': '##/##/#### ##:##',
        'phone': '(###) ### - ####',
        'social': '###-##-####',
        'time': '##:##',
        'time-with-seconds': '##:##:##'
      }
    };
  },

  props: {
    dontFillMaskBlanks: Boolean,
    mask: {
      type: [Object, String],
      default: null
    },
    returnMaskedValue: Boolean
  },

  computed: {
    masked: function masked() {
      var preDefined = this.preDefined[this.mask];
      var mask = preDefined || this.mask || '';

      return mask.split('');
    }
  },

  watch: {
    /**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */
    mask: function mask() {
      var _this = this;

      if (!this.$refs.input) return;

      var oldValue = this.$refs.input.value;
      var newValue = this.maskText(Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["c" /* unmaskText */])(this.lazyValue));
      var position = 0;
      var selection = this.selection;

      for (var index = 0; index < selection; index++) {
        Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(oldValue[index]) || position++;
      }

      selection = 0;
      if (newValue) {
        for (var _index = 0; _index < newValue.length; _index++) {
          Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(newValue[_index]) || position--;
          selection++;
          if (position <= 0) break;
        }
      }

      this.$nextTick(function () {
        _this.$refs.input.value = newValue;
        _this.setCaretPosition(selection);
      });
    }
  },

  beforeMount: function beforeMount() {
    if (!this.mask || this.value == null || !this.returnMaskedValue) return;

    var value = this.maskText(this.value);

    // See if masked value does not
    // match the user given value
    if (value === this.value) return;

    this.$emit('input', value);
  },


  methods: {
    setCaretPosition: function setCaretPosition(selection) {
      var _this2 = this;

      this.selection = selection;
      window.setTimeout(function () {
        _this2.$refs.input && _this2.$refs.input.setSelectionRange(_this2.selection, _this2.selection);
      }, 0);
    },
    updateRange: function updateRange() {
      if (!this.$refs.input) return;

      var newValue = this.maskText(this.lazyValue);
      var selection = 0;

      this.$refs.input.value = newValue;
      if (newValue) {
        for (var index = 0; index < newValue.length; index++) {
          if (this.lazySelection <= 0) break;
          Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(newValue[index]) || this.lazySelection--;
          selection++;
        }
      }

      this.setCaretPosition(selection);
      // this.$emit() must occur only when all internal values are correct
      this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue);
    },
    maskText: function maskText(text) {
      return this.mask ? Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["b" /* maskText */])(text, this.masked, this.dontFillMaskBlanks) : text;
    },
    unmaskText: function unmaskText(text) {
      return this.mask && !this.returnMaskedValue ? Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["c" /* unmaskText */])(text) : text;
    },

    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange: function setSelectionRange() {
      this.$nextTick(this.updateRange);
    },
    resetSelections: function resetSelections(input) {
      if (!input.selectionEnd) return;
      this.selection = input.selectionEnd;
      this.lazySelection = 0;

      for (var index = 0; index < this.selection; index++) {
        Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(input.value[index]) || this.lazySelection++;
      }
    }
  }
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'soloable',

  props: {
    flat: Boolean,
    soloInverted: Boolean,
    solo: Boolean
  },

  computed: {
    isSolo: function isSolo() {
      return this.solo || this.soloInverted;
    }
  },

  methods: {
    genSoloClasses: function genSoloClasses() {
      return {
        'input-group--solo': this.isSolo,
        'input-group--solo-inverted': this.soloInverted,
        'elevation-0': this.flat
      };
    }
  }
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__ = __webpack_require__(160);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */]);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_title_styl__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_title_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_title_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_picker_button__ = __webpack_require__(55);


// Components


// Mixins


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker-title',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_picker_button__["a" /* default */]],

  data: function data() {
    return {
      isReversing: false
    };
  },

  props: {
    date: {
      type: String,
      default: ''
    },
    selectingYear: Boolean,
    year: {
      type: [Number, String],
      default: ''
    },
    yearIcon: {
      type: String
    },
    value: {
      type: String
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.isReversing ? 'picker-reverse-transition' : 'picker-transition';
    }
  },

  watch: {
    value: function value(val, prev) {
      this.isReversing = val < prev;
    }
  },

  methods: {
    genYearIcon: function genYearIcon() {
      return this.$createElement('v-icon', {
        props: {
          dark: true
        }
      }, this.yearIcon);
    },
    getYearBtn: function getYearBtn() {
      return this.genPickerButton('selectingYear', true, [this.year, this.yearIcon ? this.genYearIcon() : null], 'date-picker-title__year');
    },
    genTitleText: function genTitleText() {
      return this.$createElement('transition', {
        props: {
          name: this.computedTransition
        }
      }, [this.$createElement('div', {
        domProps: { innerHTML: this.date || '&nbsp;' },
        key: this.value
      })]);
    },
    genTitleDate: function genTitleDate(title) {
      return this.genPickerButton('selectingYear', false, this.genTitleText(title), 'date-picker-title__date');
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'date-picker-title'
    }, [this.getYearBtn(), this.genTitleDate()]);
  }
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genPickerButton: function genPickerButton(prop, value, content) {
      var _this = this;

      var staticClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

      var active = this[prop] === value;
      var click = function click(event) {
        event.stopPropagation();
        _this.$emit('update:' + prop, value);
      };

      return this.$createElement('div', {
        staticClass: ('picker__title__btn ' + staticClass).trim(),
        'class': { active: active },
        on: active ? undefined : { click: click }
      }, Array.isArray(content) ? content : [content]);
    }
  }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_header_styl__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_header_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_header_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(14);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



// Components



// Mixins


// Utils


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker-header',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_1__VBtn__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_2__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_colorable__["a" /* default */]],

  data: function data() {
    return {
      isReversing: false,
      defaultColor: 'accent'
    };
  },


  props: {
    disabled: Boolean,
    format: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: String,
    max: String,
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    value: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    formatter: function formatter() {
      if (this.format) {
        return this.format;
      } else if (String(this.value).split('-')[1]) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* createNativeLocaleFormatter */])(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 });
      } else {
        return Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* createNativeLocaleFormatter */])(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
      }
    }
  },

  watch: {
    value: function value(newVal, oldVal) {
      this.isReversing = newVal < oldVal;
    }
  },

  methods: {
    genBtn: function genBtn(change) {
      var _this = this;

      var disabled = this.disabled || change < 0 && this.min && this.calculateChange(change) < this.min || change > 0 && this.max && this.calculateChange(change) > this.max;

      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          disabled: disabled,
          icon: true
        },
        nativeOn: {
          click: function click(e) {
            e.stopPropagation();
            _this.$emit('input', _this.calculateChange(change));
          }
        }
      }, [this.$createElement('v-icon', change < 0 ? this.prevIcon : this.nextIcon)]);
    },
    calculateChange: function calculateChange(sign) {
      var _String$split$map = String(this.value).split('-').map(function (v) {
        return 1 * v;
      }),
          _String$split$map2 = _slicedToArray(_String$split$map, 2),
          year = _String$split$map2[0],
          month = _String$split$map2[1];

      if (month == null) {
        return '' + (year + sign);
      } else {
        return Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* monthChange */])(String(this.value), sign);
      }
    },
    genHeader: function genHeader() {
      var _this2 = this;

      var header = this.$createElement('strong', {
        'class': this.disabled ? undefined : this.addTextColorClassChecks(),
        key: String(this.value),
        on: {
          click: function click() {
            return _this2.$emit('toggle');
          }
        }
      }, [this.$slots.default || this.formatter(String(this.value))]);

      var transition = this.$createElement('transition', {
        props: {
          name: this.isReversing ? 'tab-reverse-transition' : 'tab-transition'
        }
      }, [header]);

      return this.$createElement('div', {
        staticClass: 'date-picker-header__value',
        class: {
          'date-picker-header__value--disabled': this.disabled
        }
      }, [transition]);
    }
  },

  render: function render(h) {
    return this.$createElement('div', {
      staticClass: 'date-picker-header'
    }, [this.genBtn(-1), this.genHeader(), this.genBtn(+1)]);
  }
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_helpers__ = __webpack_require__(2);
// Mixins



// Utils



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker-date-table',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__["a" /* default */]],

  props: {
    events: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning'
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    weekdayFormat: {
      type: Function,
      default: null
    }
  },

  computed: {
    formatter: function formatter() {
      return this.format || Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* createNativeLocaleFormatter */])(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 });
    },
    weekdayFormatter: function weekdayFormatter() {
      return this.weekdayFormat || Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* createNativeLocaleFormatter */])(this.locale, { weekday: 'narrow', timeZone: 'UTC' });
    },
    weekDays: function weekDays() {
      var _this = this;

      var first = parseInt(this.firstDayOfWeek, 10);

      return this.weekdayFormatter ? Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createRange */])(7).map(function (i) {
        return _this.weekdayFormatter('2017-01-' + (first + i + 15));
      }) // 2017-01-15 is Sunday
      : Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createRange */])(7).map(function (i) {
        return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7];
      });
    }
  },

  methods: {
    calculateTableDate: function calculateTableDate(delta) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* monthChange */])(this.tableDate, Math.sign(delta || 1));
    },
    genTHead: function genTHead() {
      var _this2 = this;

      var days = this.weekDays.map(function (day) {
        return _this2.$createElement('th', day);
      });
      return this.$createElement('thead', this.genTR(days));
    },
    genEvent: function genEvent(date) {
      var eventColor = void 0;
      if (typeof this.eventColor === 'string') {
        eventColor = this.eventColor;
      } else if (typeof this.eventColor === 'function') {
        eventColor = this.eventColor(date);
      } else {
        eventColor = this.eventColor[date];
      }
      return this.$createElement('div', {
        staticClass: 'date-picker-table__event',
        class: this.addBackgroundColorClassChecks({}, eventColor || this.color)
      });
    },

    // Returns number of the days from the firstDayOfWeek to the first day of the current month
    weekDaysBeforeFirstDayOfTheMonth: function weekDaysBeforeFirstDayOfTheMonth() {
      var firstDayOfTheMonth = new Date(this.displayedYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* pad */])(this.displayedMonth + 1) + '-01T00:00:00+00:00');
      var weekDay = firstDayOfTheMonth.getUTCDay();
      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
    },
    isEvent: function isEvent(date) {
      if (Array.isArray(this.events)) {
        return this.events.indexOf(date) > -1;
      } else if (this.events instanceof Function) {
        return this.events(date);
      } else {
        return false;
      }
    },
    genTBody: function genTBody() {
      var children = [];
      var daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();
      var rows = [];
      var day = this.weekDaysBeforeFirstDayOfTheMonth();

      while (day--) {
        rows.push(this.$createElement('td'));
      }for (day = 1; day <= daysInMonth; day++) {
        var date = this.displayedYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* pad */])(this.displayedMonth + 1) + '-' + Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* pad */])(day);

        rows.push(this.$createElement('td', [this.genButton(date, true), this.isEvent(date) ? this.genEvent(date) : null]));

        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows));
          rows = [];
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows));
      }

      return this.$createElement('tbody', children);
    },
    genTR: function genTR(children) {
      return [this.$createElement('tr', children)];
    }
  },

  render: function render(h) {
    return this.genTable('date-picker-table date-picker-table--date', [this.genTHead(), this.genTBody()]);
  }
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_table_styl__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_table_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_table_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_touch__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isDateAllowed__ = __webpack_require__(59);


// Directives


// Utils


/* harmony default export */ __webpack_exports__["a"] = ({
  directives: { Touch: __WEBPACK_IMPORTED_MODULE_1__directives_touch__["a" /* default */] },

  data: function data() {
    return {
      defaultColor: 'accent',
      isReversing: false
    };
  },


  props: {
    allowedDates: Function,
    current: String,
    disabled: Boolean,
    format: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: String,
    max: String,
    scrollable: Boolean,
    tableDate: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition';
    },
    displayedMonth: function displayedMonth() {
      return this.tableDate.split('-')[1] - 1;
    },
    displayedYear: function displayedYear() {
      return this.tableDate.split('-')[0] * 1;
    }
  },

  watch: {
    tableDate: function tableDate(newVal, oldVal) {
      this.isReversing = newVal < oldVal;
    }
  },

  methods: {
    genButtonClasses: function genButtonClasses(value, isDisabled, isFloating) {
      var isSelected = value === this.value;
      var isCurrent = value === this.current;

      var classes = {
        'btn--active': isSelected,
        'btn--flat': !isSelected,
        'btn--icon': isSelected && !isDisabled && isFloating,
        'btn--floating': isFloating,
        'btn--depressed': !isFloating && isSelected,
        'btn--disabled': isDisabled || this.disabled && isSelected,
        'btn--outline': isCurrent && !isSelected
      };

      if (isSelected) return this.addBackgroundColorClassChecks(classes);
      if (isCurrent) return this.addTextColorClassChecks(classes);
      return classes;
    },
    genButton: function genButton(value, isFloating) {
      var _this = this;

      var isDisabled = !Object(__WEBPACK_IMPORTED_MODULE_2__util_isDateAllowed__["a" /* default */])(value, this.min, this.max, this.allowedDates);

      return this.$createElement('button', {
        staticClass: 'btn',
        'class': this.genButtonClasses(value, isDisabled, isFloating),
        attrs: {
          type: 'button'
        },
        domProps: {
          disabled: isDisabled,
          innerHTML: '<div class="btn__content">' + this.formatter(value) + '</div>'
        },
        on: isDisabled ? {} : {
          click: function click() {
            return _this.$emit('input', value);
          }
        }
      });
    },
    wheel: function wheel(e) {
      e.preventDefault();
      this.$emit('tableDate', this.calculateTableDate(e.deltaY));
    },
    touch: function touch(value) {
      this.$emit('tableDate', this.calculateTableDate(value));
    },
    genTable: function genTable(staticClass, children) {
      var _this2 = this;

      var transition = this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [this.$createElement('table', { key: this.tableDate }, children)]);

      var touchDirective = {
        name: 'touch',
        value: {
          left: function left(e) {
            return e.offsetX < -15 && _this2.touch(1);
          },
          right: function right(e) {
            return e.offsetX > 15 && _this2.touch(-1);
          }
        }
      };

      return this.$createElement('div', {
        staticClass: staticClass,
        on: this.scrollable ? { wheel: this.wheel } : undefined,
        directives: [touchDirective]
      }, [transition]);
    }
  }
});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isDateAllowed;
function isDateAllowed(date, min, max, allowedFn) {
  return (!allowedFn || allowedFn(date)) && (!min || date >= min) && (!max || date <= max);
}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(14);
// Mixins



// Utils


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker-month-table',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__["a" /* default */]],

  computed: {
    formatter: function formatter() {
      return this.format || Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* createNativeLocaleFormatter */])(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 });
    }
  },

  methods: {
    calculateTableDate: function calculateTableDate(delta) {
      return '' + (parseInt(this.tableDate, 10) + Math.sign(delta || 1));
    },
    genTBody: function genTBody() {
      var _this = this;

      var children = [];
      var cols = Array(3).fill(null);
      var rows = 12 / cols.length;

      var _loop = function _loop(row) {
        var tds = cols.map(function (_, col) {
          var month = row * cols.length + col;
          return _this.$createElement('td', {
            key: month
          }, [_this.genButton(_this.displayedYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* pad */])(month + 1), false)]);
        });

        children.push(_this.$createElement('tr', {
          key: row
        }, tds));
      };

      for (var row = 0; row < rows; row++) {
        _loop(row);
      }

      return this.$createElement('tbody', children);
    }
  },

  render: function render(h) {
    return this.genTable('date-picker-table date-picker-table--month', [this.genTBody()]);
  }
});

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_years_styl__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_years_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_years_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(14);


// Mixins


// Utils


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker-years',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */]],

  data: function data() {
    return {
      defaultColor: 'primary'
    };
  },


  props: {
    format: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: [Number, String],
    max: [Number, String],
    value: [Number, String]
  },

  computed: {
    formatter: function formatter() {
      return this.format || Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* createNativeLocaleFormatter */])(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
    }
  },

  mounted: function mounted() {
    this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2;
  },


  methods: {
    genYearItem: function genYearItem(year) {
      var _this = this;

      var formatted = this.formatter('' + year);

      return this.$createElement('li', {
        key: year,
        'class': parseInt(this.value, 10) === year ? this.addTextColorClassChecks({ active: true }) : {},
        on: {
          click: function click() {
            return _this.$emit('input', year);
          }
        }
      }, formatted);
    },
    genYearItems: function genYearItems() {
      var children = [];
      var selectedYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
      var maxYear = this.max ? parseInt(this.max, 10) : selectedYear + 100;
      var minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : selectedYear - 100);

      for (var year = maxYear; year >= minYear; year--) {
        children.push(this.genYearItem(year));
      }

      return children;
    }
  },

  render: function render(h) {
    return this.$createElement('ul', {
      staticClass: 'date-picker-years',
      ref: 'years'
    }, this.genYearItems());
  }
});

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VPicker__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__themeable__ = __webpack_require__(1);
// Components


// Mixins



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'picker',

  components: {
    VPicker: __WEBPACK_IMPORTED_MODULE_0__components_VPicker__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__themeable__["a" /* default */]],

  props: {
    fullWidth: Boolean,
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    width: {
      type: [Number, String],
      default: 290,
      validator: function validator(value) {
        return parseInt(value, 10) > 0;
      }
    }
  },

  methods: {
    genPickerTitle: function genPickerTitle() {},
    genPickerBody: function genPickerBody() {},
    genPickerActionsSlot: function genPickerActionsSlot() {
      return this.$scopedSlots.default ? this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      }) : this.$slots.default;
    },
    genPicker: function genPicker(staticClass) {
      return this.$createElement('v-picker', {
        staticClass: staticClass,
        class: this.fullWidth ? ['picker--full-width'] : [],
        props: {
          color: this.headerColor || this.color,
          dark: this.dark,
          fullWidth: this.fullWidth,
          landscape: this.landscape,
          light: this.light,
          width: this.width
        }
      }, [this.noTitle ? null : this.genPickerTitle(), this.genPickerBody(), this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])]);
    }
  }
});

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VPicker__ = __webpack_require__(176);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VPicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VPicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VPicker__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VPicker__["a" /* default */]);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_touch__ = __webpack_require__(9);
// Mixins


// Directives


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-items',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_0__mixins_registrable__["b" /* provide */])('tabs')],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_1__directives_touch__["a" /* default */] },

  inject: {
    registerItems: {
      default: null
    },
    tabProxy: {
      default: null
    },
    unregisterItems: {
      default: null
    }
  },

  data: function data() {
    return {
      items: [],
      lazyValue: this.value,
      reverse: false
    };
  },


  props: {
    cycle: Boolean,
    touchless: Boolean,
    value: [Number, String]
  },

  computed: {
    activeIndex: function activeIndex() {
      var _this = this;

      return this.items.findIndex(function (item, index) {
        return (item.id || index.toString()) === _this.lazyValue;
      });
    },
    activeItem: function activeItem() {
      if (!this.items.length) return undefined;

      return this.items[this.activeIndex];
    },

    inputValue: {
      get: function get() {
        return this.lazyValue;
      },
      set: function set(val) {
        val = val.toString();

        this.lazyValue = val;

        if (this.tabProxy) this.tabProxy(val);else this.$emit('input', val);
      }
    }
  },

  watch: {
    activeIndex: function activeIndex(current, previous) {
      this.reverse = current < previous;
      this.updateItems();
    },
    value: function value(val) {
      this.lazyValue = val;
    }
  },

  mounted: function mounted() {
    this.registerItems && this.registerItems(this.changeModel);
  },
  beforeDestroy: function beforeDestroy() {
    this.unregisterItems && this.unregisterItems();
  },


  methods: {
    changeModel: function changeModel(val) {
      this.inputValue = val;
    },
    next: function next(cycle) {
      var nextIndex = this.activeIndex + 1;

      if (!this.items[nextIndex]) {
        if (!cycle) return;
        nextIndex = 0;
      }

      this.inputValue = this.items[nextIndex].id || nextIndex;
    },
    prev: function prev(cycle) {
      var prevIndex = this.activeIndex - 1;

      if (!this.items[prevIndex]) {
        if (!cycle) return;
        prevIndex = this.items.length - 1;
      }

      this.inputValue = this.items[prevIndex].id || prevIndex;
    },
    onSwipe: function onSwipe(action) {
      this[action](this.cycle);
    },
    register: function register(item) {
      this.items.push(item);
    },
    unregister: function unregister(item) {
      this.items = this.items.filter(function (i) {
        return i !== item;
      });
    },
    updateItems: function updateItems() {
      for (var index = this.items.length; --index >= 0;) {
        this.items[index].toggle(this.lazyValue, this.reverse, this.isBooted, index);
      }
      this.isBooted = true;
    }
  },

  render: function render(h) {
    var _this2 = this;

    var data = {
      staticClass: 'tabs__items',
      directives: []
    };

    !this.touchless && data.directives.push({
      name: 'touch',
      value: {
        left: function left() {
          return _this2.onSwipe('next');
        },
        right: function right() {
          return _this2.onSwipe('prev');
        }
      }
    });

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */]],

  data: function data() {
    return {
      defaultColor: 'accent'
    };
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'tabs__slider',
      class: this.addBackgroundColorClassChecks()
    });
  }
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_title_styl__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_title_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_title_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_picker_button__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VDatePicker_util__ = __webpack_require__(14);


// Mixins


// Utils


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-time-picker-title',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_picker_button__["a" /* default */]],

  props: {
    ampm: Boolean,
    hour: Number,
    minute: Number,
    period: {
      type: String,
      validator: function validator(period) {
        return period === 'am' || period === 'pm';
      }
    },
    selectingHour: Boolean
  },

  methods: {
    genTime: function genTime() {
      var hour = this.hour;
      if (this.ampm) {
        hour = hour ? (hour - 1) % 12 + 1 : 12;
      }

      var displayedHour = this.hour == null ? '--' : this.ampm ? hour : Object(__WEBPACK_IMPORTED_MODULE_2__VDatePicker_util__["c" /* pad */])(hour);
      var displayedMinute = this.minute == null ? '--' : Object(__WEBPACK_IMPORTED_MODULE_2__VDatePicker_util__["c" /* pad */])(this.minute);

      return this.$createElement('div', {
        'class': 'time-picker-title__time'
      }, [this.genPickerButton('selectingHour', true, displayedHour), this.$createElement('span', ':'), this.genPickerButton('selectingHour', false, displayedMinute)]);
    },
    genAmPm: function genAmPm() {
      return this.$createElement('div', {
        staticClass: 'time-picker-title__ampm'
      }, [this.genPickerButton('period', 'am', 'am'), this.genPickerButton('period', 'pm', 'pm')]);
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'time-picker-title'
    }, [this.genTime(), this.ampm ? this.genAmPm() : null]);
  }
});

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_clock_styl__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_clock_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_clock_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(1);


// Mixins



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-time-picker-clock',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      defaultColor: 'accent',
      inputValue: this.value,
      isDragging: false
    };
  },


  props: {
    allowedValues: Function,
    double: Boolean,
    format: {
      type: Function,
      default: function _default(val) {
        return val;
      }
    },
    max: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    scrollable: Boolean,
    rotate: {
      type: Number,
      default: 0
    },
    size: {
      type: [Number, String],
      default: 270
    },
    step: {
      type: Number,
      default: 1
    },
    value: Number
  },

  computed: {
    count: function count() {
      return this.max - this.min + 1;
    },
    innerRadius: function innerRadius() {
      return this.radius - Math.max(this.radius * 0.4, 48);
    },
    outerRadius: function outerRadius() {
      return this.radius - 4;
    },
    roundCount: function roundCount() {
      return this.double ? this.count / 2 : this.count;
    },
    degreesPerUnit: function degreesPerUnit() {
      return 360 / this.roundCount;
    },
    degrees: function degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    radius: function radius() {
      return this.size / 2;
    },
    displayedValue: function displayedValue() {
      return this.value == null ? this.min : this.value;
    }
  },

  watch: {
    value: function value(_value) {
      this.inputValue = _value;
    }
  },

  methods: {
    wheel: function wheel(e) {
      e.preventDefault();
      var value = this.displayedValue + Math.sign(e.wheelDelta || 1);
      this.update((value - this.min + this.count) % this.count + this.min);
    },
    handScale: function handScale(value) {
      return this.double && value - this.min >= this.roundCount ? this.innerRadius / this.radius : this.outerRadius / this.radius;
    },
    isAllowed: function isAllowed(value) {
      return !this.allowedValues || this.allowedValues(value);
    },
    genValues: function genValues() {
      var children = [];

      for (var value = this.min; value <= this.max; value = value + this.step) {
        var classes = {
          active: value === this.displayedValue,
          disabled: !this.isAllowed(value)
        };

        children.push(this.$createElement('span', {
          'class': this.addBackgroundColorClassChecks(classes, value === this.value ? this.computedColor : null),
          style: this.getTransform(value),
          domProps: { innerHTML: '<span>' + this.format(value) + '</span>' }
        }));
      }

      return children;
    },
    genHand: function genHand() {
      var scale = 'scaleY(' + this.handScale(this.displayedValue) + ')';
      var angle = this.rotate + this.degreesPerUnit * (this.displayedValue - this.min);

      return this.$createElement('div', {
        staticClass: 'time-picker-clock__hand',
        'class': this.value == null ? {} : this.addBackgroundColorClassChecks(),
        style: {
          transform: 'rotate(' + angle + 'deg) ' + scale
        }
      });
    },
    getTransform: function getTransform(i) {
      var _getPosition = this.getPosition(i),
          x = _getPosition.x,
          y = _getPosition.y;

      return { transform: 'translate(' + x + 'px, ' + y + 'px)' };
    },
    getPosition: function getPosition(value) {
      var radius = (this.radius - 24) * this.handScale(value);
      var rotateRadians = this.rotate * Math.PI / 180;
      return {
        x: Math.round(Math.sin((value - this.min) * this.degrees + rotateRadians) * radius),
        y: Math.round(-Math.cos((value - this.min) * this.degrees + rotateRadians) * radius)
      };
    },
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();

      this.isDragging = true;
      this.onDragMove(e);
    },
    onMouseUp: function onMouseUp() {
      this.isDragging = false;
      this.isAllowed(this.inputValue) && this.$emit('change', this.inputValue);
    },
    onDragMove: function onDragMove(e) {
      e.preventDefault();
      if (!this.isDragging && e.type !== 'click') return;

      var _$refs$clock$getBound = this.$refs.clock.getBoundingClientRect(),
          width = _$refs$clock$getBound.width,
          top = _$refs$clock$getBound.top,
          left = _$refs$clock$getBound.left;

      var _ref = 'touches' in e ? e.touches[0] : e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;

      var center = { x: width / 2, y: -width / 2 };
      var coords = { x: clientX - left, y: top - clientY };
      var handAngle = Math.round(this.angle(center, coords) - this.rotate + 360) % 360;
      var insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;
      var value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.roundCount : 0);

      // Necessary to fix edge case when selecting left part of max value
      if (handAngle >= 360 - this.degreesPerUnit / 2) {
        this.update(insideClick ? this.max : this.min);
      } else {
        this.update(value);
      }
    },
    update: function update(value) {
      if (this.inputValue !== value && this.isAllowed(value)) {
        this.inputValue = value;
        this.$emit('input', value);
      }
    },
    euclidean: function euclidean(p0, p1) {
      var dx = p1.x - p0.x;
      var dy = p1.y - p0.y;

      return Math.sqrt(dx * dx + dy * dy);
    },
    angle: function angle(center, p1) {
      var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
      return Math.abs(value * 180 / Math.PI);
    }
  },

  render: function render(h) {
    var _this = this;

    var data = {
      staticClass: 'time-picker-clock',
      class: {
        'time-picker-clock--indeterminate': this.value == null
      },
      on: {
        mousedown: this.onMouseDown,
        mouseup: this.onMouseUp,
        mouseleave: function mouseleave() {
          return _this.isDragging && _this.onMouseUp();
        },
        touchstart: this.onMouseDown,
        touchend: this.onMouseUp,
        mousemove: this.onDragMove,
        touchmove: this.onDragMove
      },
      style: {
        height: this.size + 'px',
        width: this.size + 'px'
      },
      ref: 'clock'
    };

    this.scrollable && (data.on.wheel = this.wheel);

    return this.$createElement('div', data, [this.genHand(), this.genValues()]);
  }
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function inserted(el, binding) {
  var callback = binding.value;
  var options = binding.options || { passive: true };
  var target = binding.arg || window;
  if (target === 'undefined') return;

  if (target !== window) {
    target = document.querySelector(target);
  }

  target.addEventListener('scroll', callback, options);

  el._onScroll = {
    callback: callback,
    options: options,
    target: target
  };
}

function unbind(el, binding) {
  if (!el._onScroll) return;

  var _el$_onScroll = el._onScroll,
      callback = _el$_onScroll.callback,
      options = _el$_onScroll.options,
      target = _el$_onScroll.target;


  target.removeEventListener('scroll', callback, options);
  delete el._onScroll;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'scroll',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_app_styl__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_app_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_app_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_semver__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_semver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_semver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_console__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








function Vuetify(Vue, args) {
  var Vuetify = __WEBPACK_IMPORTED_MODULE_3__components__["Vuetify"];

  Vue.use(Vuetify, _extends({
    components: __WEBPACK_IMPORTED_MODULE_3__components__,
    directives: __WEBPACK_IMPORTED_MODULE_4__directives__
  }, args));
}

Vuetify.version = __WEBPACK_IMPORTED_MODULE_2__package_json__["version"];

function checkVueVersion() {
  var vueDep = __WEBPACK_IMPORTED_MODULE_2__package_json__["peerDependencies"].vue;
  if (!__WEBPACK_IMPORTED_MODULE_1_semver___default.a.satisfies(window.Vue.version, vueDep)) {
    Object(__WEBPACK_IMPORTED_MODULE_5__util_console__["b" /* consoleWarn */])('Vuetify requires Vue version ' + vueDep);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion();
  window.Vue.use(Vuetify);
}

/* harmony default export */ __webpack_exports__["default"] = (Vuetify);

/***/ }),
/* 70 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};

Comparator.prototype.intersects = function(comp, loose) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, loose);
    return satisfies(this.value, rangeTmp, loose);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, loose);
    return satisfies(comp.semver, rangeTmp, loose);
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, loose) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, loose) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};


exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

Range.prototype.intersects = function(range, loose) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function(thisComparators) {
    return thisComparators.every(function(thisComparator) {
      return range.set.some(function(rangeComparators) {
        return rangeComparators.every(function(rangeComparator) {
          return thisComparator.intersects(rangeComparator, loose);
        });
      });
    });
  });
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, loose);
      }
    }
  })
  return max;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, loose);
      }
    }
  })
  return min;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}

exports.intersects = intersects;
function intersects(r1, r2, loose) {
  r1 = new Range(r1, loose)
  r2 = new Range(r2, loose)
  return r1.intersects(r2)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(72)))

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = {"name":"vuetify","version":"1.0.1","author":{"name":"John Leider","email":"john@vuetifyjs.com"},"license":"MIT","homepage":"http://vuetifyjs.com","repository":"vuetifyjs/vuetify","main":"dist/vuetify.js","unpkg":"dist/vuetify.js","types":"index.d.ts","scripts":{"watch":"cross-env TARGET=development webpack --config build/config.js --progress --hide-modules --watch","dev":"cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.config.js --open --hot","build":"npm run build:dist && npm run build:es5","build:dev":"cross-env NODE_ENV=production node build/webpack.dev.config.js","build:dist":"rimraf dist && cross-env NODE_ENV=production webpack --config build/config.js --progress --hide-modules","build:es5":"rimraf es5 && cross-env NODE_ENV=es5 babel src --out-dir es5","debug-build":"node --inspect --debug-brk build/config.js","debug:test":"cross-env NODE_ENV=test node --inspect --inspect-brk ./node_modules/jest/bin/jest.js --no-cache -i --verbose","test":"node build/run-tests.js","test:unix":"cross-env NODE_ENV=test jest","test:win32":"cross-env NODE_ENV=test jest -i","test:coverage":"cross-env NODE_ENV=test jest --coverage","lint":"eslint --ext .js,.vue src","preparecommitmsg":"node dev/prepare-commit-message.js","commitmsg":"node dev/lint-commit-message.js","precommit":"node dev/warn-npm-install.js && yarn lint && yarn test"},"description":"Vue.js 2 Semantic Component Framework","devDependencies":{"autoprefixer":"7.2.5","avoriaz":"6.3.0","babel-cli":"6.26.0","babel-core":"6.26.0","babel-eslint":"8.2.1","babel-jest":"22.1.0","babel-loader":"7.1.2","babel-plugin-add-filehash":"6.9.5","babel-plugin-detective":"2.0.0","babel-plugin-module-resolver":"3.0.0","babel-plugin-transform-async-to-generator":"6.24.1","babel-plugin-transform-runtime":"6.23.0","babel-polyfill":"6.26.0","babel-preset-env":"1.6.1","babel-preset-es2015":"6.24.1","babel-preset-stage-2":"6.24.1","cross-env":"5.1.1","cross-spawn":"5.1.0","css-loader":"0.28.8","css-mqpacker":"6.0.1","cssnano":"3.10.0","dotenv":"4.0.0","eslint":"4.15.0","eslint-config-standard":"^11.0.0-beta.0","eslint-friendly-formatter":"3.0.0","eslint-loader":"1.9.0","eslint-plugin-import":"^2.8.0","eslint-plugin-node":"^5.2.1","eslint-plugin-promise":"^3.6.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"0.9.6","extract-text-webpack-plugin":"3.0.2","friendly-errors-webpack-plugin":"1.6.1","function-bind":"1.1.1","husky":"0.14.3","inquirer":"5.0.0","jest":"21.2.1","jest-cli":"21.2.1","jest-css-modules":"1.1.0","jest-serializer-html":"5.0.0","jest-vue-preprocessor":"1.3.1","optimize-css-assets-webpack-plugin":"3.2.0","optimize-js-plugin":"0.0.4","postcss-loader":"2.0.10","progress-bar-webpack-plugin":"1.10.0","pug":"2.0.0-rc.4","pug-loader":"2.3.0","ress":"1.2.2","rimraf":"2.6.2","semver":"5.4.1","serialize-javascript":"1.4.0","shelljs":"0.8.0","style-loader":"0.19.1","stylus":"0.54.5","stylus-loader":"3.0.1","uglifyjs-webpack-plugin":"1.1.6","vue":"2.5.11","vue-loader":"13.7.0","vue-router":"3.0.1","vue-server-renderer":"2.5.11","vue-template-compiler":"2.5.11","webpack":"3.10.0","webpack-bundle-analyzer":"2.9.2","webpack-bundle-size-analyzer":"2.7.0","webpack-dev-server":"^2.11.1","webpack-merge":"4.1.1","write-file-webpack-plugin":"4.2.0"},"dependencies":{},"peerDependencies":{"vue":"^2.5.0"},"engines":{"node":">= 4.0.0","npm":">= 3.0.0"},"jest":{"verbose":false,"roots":["<rootDir>/src"],"moduleFileExtensions":["js","vue"],"moduleDirectories":["node_modules"],"moduleNameMapper":{"src/(.*)":"<rootDir>/src/$1","^@components/(.*)$":"<rootDir>/src/components/$1","^@directives/(.*)$":"<rootDir>/src/directives/$1","^@mixins/(.*)$":"<rootDir>/src/mixins/$1","^@util/(.*)$":"<rootDir>/src/util/$1"},"transform":{".*\\.(vue)$":"<rootDir>/node_modules/jest-vue-preprocessor","\\.(styl)$":"<rootDir>/node_modules/jest-css-modules",".*\\.(vue|js)$":"<rootDir>/node_modules/babel-jest"},"transformIgnorePatterns":["node_modules/(?!vue-router)"],"snapshotSerializers":["jest-serializer-html"]}}

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vuetify__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Vuetify", function() { return __WEBPACK_IMPORTED_MODULE_0__Vuetify__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VApp__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VApp", function() { return __WEBPACK_IMPORTED_MODULE_1__VApp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VAlert__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VAlert", function() { return __WEBPACK_IMPORTED_MODULE_2__VAlert__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VAvatar__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VAvatar", function() { return __WEBPACK_IMPORTED_MODULE_3__VAvatar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VBadge__ = __webpack_require__(96);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBadge", function() { return __WEBPACK_IMPORTED_MODULE_4__VBadge__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VBottomNav__ = __webpack_require__(99);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomNav", function() { return __WEBPACK_IMPORTED_MODULE_5__VBottomNav__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VBottomSheet__ = __webpack_require__(102);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomSheet", function() { return __WEBPACK_IMPORTED_MODULE_6__VBottomSheet__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VBreadcrumbs__ = __webpack_require__(107);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbs", function() { return __WEBPACK_IMPORTED_MODULE_7__VBreadcrumbs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VBtn__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBtn", function() { return __WEBPACK_IMPORTED_MODULE_8__VBtn__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__VBtnToggle__ = __webpack_require__(113);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBtnToggle", function() { return __WEBPACK_IMPORTED_MODULE_9__VBtnToggle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__VCard__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCard", function() { return __WEBPACK_IMPORTED_MODULE_10__VCard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__VCarousel__ = __webpack_require__(120);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCarousel", function() { return __WEBPACK_IMPORTED_MODULE_11__VCarousel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__VCheckbox__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCheckbox", function() { return __WEBPACK_IMPORTED_MODULE_12__VCheckbox__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__VChip__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VChip", function() { return __WEBPACK_IMPORTED_MODULE_13__VChip__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__VDataIterator__ = __webpack_require__(130);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDataIterator", function() { return __WEBPACK_IMPORTED_MODULE_14__VDataIterator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__VDataTable__ = __webpack_require__(156);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDataTable", function() { return __WEBPACK_IMPORTED_MODULE_15__VDataTable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__VDatePicker__ = __webpack_require__(168);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDatePicker", function() { return __WEBPACK_IMPORTED_MODULE_16__VDatePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__VDialog__ = __webpack_require__(178);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDialog", function() { return __WEBPACK_IMPORTED_MODULE_17__VDialog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__VDivider__ = __webpack_require__(179);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDivider", function() { return __WEBPACK_IMPORTED_MODULE_18__VDivider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__VExpansionPanel__ = __webpack_require__(182);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanel", function() { return __WEBPACK_IMPORTED_MODULE_19__VExpansionPanel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__VFooter__ = __webpack_require__(186);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VFooter", function() { return __WEBPACK_IMPORTED_MODULE_20__VFooter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__VForm__ = __webpack_require__(189);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VForm", function() { return __WEBPACK_IMPORTED_MODULE_21__VForm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__VGrid__ = __webpack_require__(191);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VGrid", function() { return __WEBPACK_IMPORTED_MODULE_22__VGrid__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__VIcon__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VIcon", function() { return __WEBPACK_IMPORTED_MODULE_23__VIcon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__VJumbotron__ = __webpack_require__(37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VJumbotron", function() { return __WEBPACK_IMPORTED_MODULE_24__VJumbotron__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__VList__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VList", function() { return __WEBPACK_IMPORTED_MODULE_25__VList__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__VMenu__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VMenu", function() { return __WEBPACK_IMPORTED_MODULE_26__VMenu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__VNavigationDrawer__ = __webpack_require__(197);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VNavigationDrawer", function() { return __WEBPACK_IMPORTED_MODULE_27__VNavigationDrawer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__VPagination__ = __webpack_require__(200);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VPagination", function() { return __WEBPACK_IMPORTED_MODULE_28__VPagination__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__VParallax__ = __webpack_require__(203);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VParallax", function() { return __WEBPACK_IMPORTED_MODULE_29__VParallax__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__VPicker__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VPicker", function() { return __WEBPACK_IMPORTED_MODULE_30__VPicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__VProgressCircular__ = __webpack_require__(207);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VProgressCircular", function() { return __WEBPACK_IMPORTED_MODULE_31__VProgressCircular__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__VProgressLinear__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VProgressLinear", function() { return __WEBPACK_IMPORTED_MODULE_32__VProgressLinear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__VRadioGroup__ = __webpack_require__(210);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VRadioGroup", function() { return __WEBPACK_IMPORTED_MODULE_33__VRadioGroup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__VSelect__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSelect", function() { return __WEBPACK_IMPORTED_MODULE_34__VSelect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__VSlider__ = __webpack_require__(215);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return __WEBPACK_IMPORTED_MODULE_35__VSlider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__VSnackbar__ = __webpack_require__(218);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSnackbar", function() { return __WEBPACK_IMPORTED_MODULE_36__VSnackbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__VSpeedDial__ = __webpack_require__(221);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSpeedDial", function() { return __WEBPACK_IMPORTED_MODULE_37__VSpeedDial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__VStepper__ = __webpack_require__(224);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VStepper", function() { return __WEBPACK_IMPORTED_MODULE_38__VStepper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__VSubheader__ = __webpack_require__(229);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSubheader", function() { return __WEBPACK_IMPORTED_MODULE_39__VSubheader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__VSwitch__ = __webpack_require__(232);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSwitch", function() { return __WEBPACK_IMPORTED_MODULE_40__VSwitch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__VSystemBar__ = __webpack_require__(235);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSystemBar", function() { return __WEBPACK_IMPORTED_MODULE_41__VSystemBar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__VTabs__ = __webpack_require__(238);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTabs", function() { return __WEBPACK_IMPORTED_MODULE_42__VTabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__VTextField__ = __webpack_require__(248);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTextField", function() { return __WEBPACK_IMPORTED_MODULE_43__VTextField__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__VTimePicker__ = __webpack_require__(250);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTimePicker", function() { return __WEBPACK_IMPORTED_MODULE_44__VTimePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__VToolbar__ = __webpack_require__(254);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VToolbar", function() { return __WEBPACK_IMPORTED_MODULE_45__VToolbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__VTooltip__ = __webpack_require__(258);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTooltip", function() { return __WEBPACK_IMPORTED_MODULE_46__VTooltip__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__transitions__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Transitions", function() { return __WEBPACK_IMPORTED_MODULE_47__transitions__["g"]; });

















































/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_application__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_options__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_goTo__ = __webpack_require__(79);





var Vuetify = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) return;

    this.installed = true;

    var $vuetify = {};
    Vue.util.defineReactive($vuetify, 'inspire', {
      breakpoint: {},
      application: __WEBPACK_IMPORTED_MODULE_0__mixins_application__["a" /* default */],
      dark: false,
      theme: Object(__WEBPACK_IMPORTED_MODULE_1__mixins_theme__["a" /* default */])(opts.theme),
      options: Object(__WEBPACK_IMPORTED_MODULE_2__mixins_options__["a" /* default */])(opts.options),
      goTo: __WEBPACK_IMPORTED_MODULE_3__util_goTo__["a" /* default */]
    });

    Vue.prototype.$vuetify = $vuetify.inspire;

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(function (transition) {
        if (transition.name !== undefined && transition.name.startsWith('v-')) {
          Vue.component(transition.name, transition);
        }
      });
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(function (directive) {
        Vue.directive(directive.name, directive);
      });
    }

    if (opts.components) {
      Object.values(opts.components).forEach(function (component) {
        Vue.use(component);
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Vuetify);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  bar: 0,
  bottom: 0,
  footer: 0,
  left: 0,
  right: 0,
  top: 0
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = theme;
/* eslint-disable no-multi-spaces */
var THEME_DEFAULTS = {
  primary: '#1976D2', // blue.darken2
  secondary: '#424242', // grey.darken3
  accent: '#82B1FF', // blue.accent1
  error: '#FF5252', // red.accent2
  info: '#2196F3', // blue.base
  success: '#4CAF50', // green.base
  warning: '#FFC107' // amber.base
};

function theme() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.assign({}, THEME_DEFAULTS, theme);
}

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = options;
var OPTIONS_DEFAULTS = {
  themeVariations: ['primary', 'secondary', 'accent'],
  minifyTheme: null,
  themeCache: null
};

function options() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.assign({}, OPTIONS_DEFAULTS, options);
}

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = goTo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_console__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_easing_patterns__ = __webpack_require__(80);



var defaults = {
  duration: 500,
  offset: 0,
  easing: 'easeInOutCubic'
};

function getDocumentHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
}

function getTargetLocation(target, settings) {
  var documentHeight = getDocumentHeight();
  var windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;

  var location = void 0;

  if (target instanceof Element) location = target.offsetTop;else if (target && target.constructor && target.constructor.name === 'VueComponent') location = target.$el.offsetTop;else if (typeof target === 'string') location = document.querySelector(target).offsetTop;else if (typeof target === 'number') location = target;else location = undefined;

  location += settings.offset;

  return Math.round(documentHeight - location < windowHeight ? documentHeight - windowHeight : location);
}

function goTo(target, options) {
  if (typeof window === 'undefined') return;

  var settings = Object.assign({}, defaults, options);

  var startTime = performance.now();
  var startLocation = window.pageYOffset;
  var targetLocation = getTargetLocation(target, settings);
  var distanceToScroll = targetLocation - startLocation;
  var easingFunction = typeof settings.easing === 'function' ? settings.easing : __WEBPACK_IMPORTED_MODULE_1__util_easing_patterns__[settings.easing];

  if (isNaN(targetLocation)) {
    var type = target && target.constructor ? target.constructor.name : target;
    return Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["a" /* consoleError */])('Target must be a Selector/Number/DOMElement/VueComponent, received ' + type + ' instead.');
  }
  if (!easingFunction) return Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["a" /* consoleError */])('Easing function \'' + settings.easing + '\' not found.');

  function step(currentTime) {
    var progressPercentage = Math.min(1, (currentTime - startTime) / settings.duration);
    var targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage));

    window.scrollTo(0, targetPosition);
    if (Math.round(window.pageYOffset) === targetLocation) return;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInQuad", function() { return easeInQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutQuad", function() { return easeOutQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuad", function() { return easeInOutQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInCubic", function() { return easeInCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutCubic", function() { return easeOutCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutCubic", function() { return easeInOutCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInQuart", function() { return easeInQuart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutQuart", function() { return easeOutQuart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuart", function() { return easeInOutQuart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInQuint", function() { return easeInQuint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutQuint", function() { return easeOutQuint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuint", function() { return easeInOutQuint; });
// linear
var linear = function linear(t) {
  return t;
};
// accelerating from zero velocity
var easeInQuad = function easeInQuad(t) {
  return t * t;
};
// decelerating to zero velocity
var easeOutQuad = function easeOutQuad(t) {
  return t * (2 - t);
};
// acceleration until halfway, then deceleration
var easeInOutQuad = function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
// accelerating from zero velocity
var easeInCubic = function easeInCubic(t) {
  return t * t * t;
};
// decelerating to zero velocity
var easeOutCubic = function easeOutCubic(t) {
  return --t * t * t + 1;
};
// acceleration until halfway, then deceleration
var easeInOutCubic = function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
// accelerating from zero velocity
var easeInQuart = function easeInQuart(t) {
  return t * t * t * t;
};
// decelerating to zero velocity
var easeOutQuart = function easeOutQuart(t) {
  return 1 - --t * t * t * t;
};
// acceleration until halfway, then deceleration
var easeInOutQuart = function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
// accelerating from zero velocity
var easeInQuint = function easeInQuint(t) {
  return t * t * t * t * t;
};
// decelerating to zero velocity
var easeOutQuint = function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
};
// acceleration until halfway, then deceleration
var easeInOutQuint = function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VApp__ = __webpack_require__(82);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */]);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_app_styl__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_app_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_app_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_app_theme__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_app_breakpoint__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_resize__ = __webpack_require__(11);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// Component level mixins



// Directives


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-app',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_app_breakpoint__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_app_theme__["a" /* default */]],

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_3__directives_resize__["a" /* default */]
  },

  props: {
    id: {
      type: String,
      default: 'app'
    },
    dark: Boolean
  },

  computed: {
    classes: function classes() {
      return _defineProperty({}, 'theme--' + (this.dark ? 'dark' : 'light'), true);
    }
  },

  mounted: function mounted() {
    this.$vuetify.dark = this.dark;
  },


  watch: {
    dark: function dark() {
      this.$vuetify.dark = this.dark;
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'application',
      'class': this.classes,
      attrs: { 'data-app': true },
      domProps: { id: this.id },
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    };

    var wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default);

    return h('div', data, [wrapper]);
  }
});

/***/ }),
/* 83 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_colorUtils__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_theme__ = __webpack_require__(85);



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      style: null
    };
  },

  computed: {
    parsedTheme: function parsedTheme() {
      return __WEBPACK_IMPORTED_MODULE_1__util_theme__["c" /* parse */](this.$vuetify.theme);
    }
  },

  watch: {
    parsedTheme: function parsedTheme() {
      this.applyTheme();
    }
  },

  created: function created() {
    if (typeof document === 'undefined' && this.$ssrContext) {
      this.$ssrContext.head = this.$ssrContext.head || '';
      this.$ssrContext.head += '<style id="vuetify-theme-stylesheet">' + this.genColors(this.parsedTheme) + '</style>';
    } else if (typeof document !== 'undefined') {
      this.genStyle();
      this.applyTheme();
    }
  },


  methods: {
    applyTheme: function applyTheme() {
      this.style.innerHTML = this.genColors(this.parsedTheme);
    },
    genColors: function genColors(theme) {
      var css = void 0;

      if (this.$vuetify.options.themeCache != null) {
        css = this.$vuetify.options.themeCache.get(theme);
        if (css != null) return css;
      }

      var colors = Object.keys(theme);
      css = 'a { color: ' + Object(__WEBPACK_IMPORTED_MODULE_0__util_colorUtils__["b" /* intToHex */])(theme.primary) + '; }';

      for (var i = 0; i < colors.length; ++i) {
        var name = colors[i];
        var value = theme[name];
        if (this.$vuetify.options.themeVariations.includes(name)) {
          css += __WEBPACK_IMPORTED_MODULE_1__util_theme__["b" /* genVariations */](name, value).join('');
        } else {
          css += __WEBPACK_IMPORTED_MODULE_1__util_theme__["a" /* genBaseColor */](name, value);
        }
      }

      if (this.$vuetify.options.minifyTheme != null) {
        css = this.$vuetify.options.minifyTheme(css);
      }

      if (this.$vuetify.options.themeCache != null) {
        this.$vuetify.options.themeCache.set(theme, css);
      }

      return css;
    },
    genStyle: function genStyle() {
      var style = document.querySelector('[data-vue-ssr-id=vuetify-theme-stylesheet]') || document.getElementById('vuetify-theme-stylesheet');

      if (!style) {
        style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'vuetify-theme-stylesheet';
        document.head.appendChild(style);
      }

      this.style = style;
    }
  }
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = parse;
/* harmony export (immutable) */ __webpack_exports__["b"] = genVariations;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return genBaseColor; });
/* unused harmony export genVariantColor */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colorUtils__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__ = __webpack_require__(87);




/**
 * @param {object} theme
 * @returns {object}
 */
function parse(theme) {
  var colors = Object.keys(theme);
  var parsedTheme = {};

  for (var i = 0; i < colors.length; ++i) {
    var name = colors[i];
    var value = theme[name];

    parsedTheme[name] = Object(__WEBPACK_IMPORTED_MODULE_0__colorUtils__["a" /* colorToInt */])(value);
  }

  return parsedTheme;
}

function genVariations(name, value) {
  var values = Array(10);
  values[0] = genBaseColor(name, value);

  for (var i = 1, n = 5; i <= 5; ++i, --n) {
    values[i] = genVariantColor(name, lighten(value, n), 'lighten', n);
  }

  for (var _i = 1; _i <= 4; ++_i) {
    values[_i + 5] = genVariantColor(name, darken(value, _i), 'darken', _i);
  }

  return values;
}

function lighten(value, amount) {
  var lab = __WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["a" /* fromXYZ */](__WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["b" /* toXYZ */](value));
  lab[0] = lab[0] + amount * 10;
  return __WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["a" /* fromXYZ */](__WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["b" /* toXYZ */](lab));
}

function darken(value, amount) {
  var lab = __WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["a" /* fromXYZ */](__WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["b" /* toXYZ */](value));
  lab[0] = lab[0] - amount * 10;
  return __WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["a" /* fromXYZ */](__WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["b" /* toXYZ */](lab));
}

/**
 * Generate the CSS for a base color (.primary)
 *
 * @param {string} name - The color name
 * @param {string|number} value - The color value
 * @returns {string}
 */
var genBaseColor = function genBaseColor(name, value) {
  value = Object(__WEBPACK_IMPORTED_MODULE_0__colorUtils__["b" /* intToHex */])(value);
  return '\n.' + name + ' {\n  background-color: ' + value + ' !important;\n  border-color: ' + value + ' !important;\n}\n.' + name + '--text {\n  color: ' + value + ' !important;\n}\n.' + name + '--text input,\n.' + name + '--text textarea {\n  caret-color: ' + value + ' !important;\n}\n.' + name + '--after::after {\n  background: ' + value + ' !important;\n}';
};

/**
 * Generate the CSS for a variant color (.primary.darken-2)
 *
 * @param {string} name - The color name
 * @param {string|number} value - The color value
 * @param {string} type - The variant type (darken/lighten)
 * @param {number} n - The darken/lighten step number
 * @returns {string}
 */
var genVariantColor = function genVariantColor(name, value, type, n) {
  value = Object(__WEBPACK_IMPORTED_MODULE_0__colorUtils__["b" /* intToHex */])(value);
  return '\n.' + name + '.' + type + '-' + n + ' {\n  background-color: ' + value + ' !important;\n  border-color: ' + value + ' !important;\n}\n.' + name + '--text.text--' + type + '-' + n + ' {\n  color: ' + value + ' !important;\n}\n.' + name + '--text.text--' + type + '-' + n + ' input,\n.' + name + '--text.text--' + type + '-' + n + ' textarea {\n  caret-color: ' + value + ' !important;\n}\n.' + name + '.' + type + '-' + n + '--after::after {\n  background: ' + value + ' !important;\n}';
};

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromXYZ;
/* harmony export (immutable) */ __webpack_exports__["b"] = toXYZ;
// For converting XYZ to sRGB
var srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];

// Forward gamma adjust
var srgbForwardTransform = function srgbForwardTransform(C) {
  return C <= 0.0031308 ? C * 12.92 : 1.055 * Math.pow(C, 1 / 2.4) - 0.055;
};

// For converting sRGB to XYZ
var srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

// Reverse gamma adjust
var srgbReverseTransform = function srgbReverseTransform(C) {
  return C <= 0.04045 ? C / 12.92 : Math.pow((C + 0.055) / 1.055, 2.4);
};

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function fromXYZ(xyz) {
  var rgb = Array(3);
  var transform = srgbForwardTransform;
  var matrix = srgbForwardMatrix;

  // Matrix transform, then gamma adjustment
  for (var i = 0; i < 3; ++i) {
    rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  }

  // Rescale back to [0, 255]
  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}

function toXYZ(rgb) {
  var xyz = Array(3);
  var transform = srgbReverseTransform;
  var matrix = srgbReverseMatrix;

  // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
  var r = transform((rgb >> 16 & 0xff) / 255);
  var g = transform((rgb >> 8 & 0xff) / 255);
  var b = transform((rgb >> 0 & 0xff) / 255);

  // Matrix color space transform
  for (var i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }

  return xyz;
}

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromXYZ;
/* harmony export (immutable) */ __webpack_exports__["b"] = toXYZ;
var delta = 0.20689655172413793; // 6÷29

var cielabForwardTransform = function cielabForwardTransform(t) {
  return t > Math.pow(delta, 3) ? Math.cbrt(t) : t / (3 * Math.pow(delta, 2)) + 4 / 29;
};

var cielabReverseTransform = function cielabReverseTransform(t) {
  return t > delta ? Math.pow(t, 3) : 3 * Math.pow(delta, 2) * (t - 4 / 29);
};

function fromXYZ(xyz) {
  var transform = cielabForwardTransform;
  var transformedY = transform(xyz[1]);

  return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
}

function toXYZ(lab) {
  var transform = cielabReverseTransform;
  var Ln = (lab[0] + 16) / 116;
  return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
}

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Vuetify (https://github.com/vuetifyjs).
 *
 * Use within a component:
 *
 *   import breakpoint from './breakpoint.js'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 */
var breakpoint = {
  data: function data() {
    return {
      clientWidth: clientDimensions.getWidth(),
      clientHeight: clientDimensions.getHeight(),
      resizeTimeout: null
    };
  },


  computed: {
    breakpoint: function breakpoint() {
      var xs = this.clientWidth < 600;
      var sm = this.clientWidth < 960 && !xs;
      var md = this.clientWidth < 1280 - 16 && !(sm || xs);
      var lg = this.clientWidth < 1920 - 16 && !(md || sm || xs);
      var xl = this.clientWidth >= 1920 - 16 && !(lg || md || sm || xs);

      var xsOnly = xs;
      var smOnly = sm;
      var smAndDown = (xs || sm) && !(md || lg || xl);
      var smAndUp = !xs && (sm || md || lg || xl);
      var mdOnly = md;
      var mdAndDown = (xs || sm || md) && !(lg || xl);
      var mdAndUp = !(xs || sm) && (md || lg || xl);
      var lgOnly = lg;
      var lgAndDown = (xs || sm || md || lg) && !xl;
      var lgAndUp = !(xs || sm || md) && (lg || xl);
      var xlOnly = xl;

      var name = void 0;
      switch (true) {
        case xs:
          name = 'xs';
          break;
        case sm:
          name = 'sm';
          break;
        case md:
          name = 'md';
          break;
        case lg:
          name = 'lg';
          break;
        default:
          name = 'xl';
          break;
      }

      var result = {
        // Definite breakpoint.
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,

        // Useful e.g. to construct CSS class names dynamically.
        name: name,

        // Breakpoint ranges.
        xsOnly: xsOnly,
        smOnly: smOnly,
        smAndDown: smAndDown,
        smAndUp: smAndUp,
        mdOnly: mdOnly,
        mdAndDown: mdAndDown,
        mdAndUp: mdAndUp,
        lgOnly: lgOnly,
        lgAndDown: lgAndDown,
        lgAndUp: lgAndUp,
        xlOnly: xlOnly,

        // For custom breakpoint logic.
        width: this.clientWidth,
        height: this.clientHeight
      };

      return result;
    }
  },

  watch: {
    breakpoint: function breakpoint(val) {
      this.$vuetify.breakpoint = val;
    }
  },

  created: function created() {
    this.$vuetify.breakpoint = this.breakpoint;
  },


  methods: {
    onResize: function onResize() {
      var _this = this;

      clearTimeout(this.resizeTimeout);

      // Added debounce to match what
      // v-resize used to do but was
      // removed due to a memory leak
      // https://github.com/vuetifyjs/vuetify/pull/2997
      this.resizeTimeout = setTimeout(function () {
        _this.clientWidth = clientDimensions.getWidth();
        _this.clientHeight = clientDimensions.getHeight();
      }, 200);
    }
  }

  // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081
};var clientDimensions = {
  getWidth: function getWidth() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },
  getHeight: function getHeight() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (breakpoint);

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAlert__ = __webpack_require__(90);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */]);

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_alerts_styl__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_alerts_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_alerts_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__ = __webpack_require__(25);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-alert',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__["a" /* default */]],

  props: {
    dismissible: Boolean,
    icon: String,
    outline: Boolean,
    type: {
      type: String,
      validator: function validator(val) {
        return ['info', 'error', 'success', 'warning'].includes(val);
      }
    }
  },

  data: function data() {
    return {
      defaultColor: 'error'
    };
  },

  computed: {
    classes: function classes() {
      var color = this.type && !this.color ? this.type : this.computedColor;
      var classes = {
        'alert--dismissible': this.dismissible,
        'alert--outline': this.outline
      };

      return this.outline ? this.addTextColorClassChecks(classes, color) : this.addBackgroundColorClassChecks(classes, color);
    },
    computedIcon: function computedIcon() {
      if (this.icon || !this.type) return this.icon;

      switch (this.type) {
        case 'info':
          return 'info';
        case 'error':
          return 'warning';
        case 'success':
          return 'check_circle';
        case 'warning':
          return 'priority_high';
      }
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [h('div', this.$slots.default)];

    if (this.computedIcon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.computedIcon));
    }

    if (this.dismissible) {
      var close = h('a', {
        'class': 'alert__dismissible',
        on: { click: function click() {
            return _this.$emit('input', false);
          } }
      }, [h(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], {
        props: {
          right: true
        }
      }, 'cancel')]);

      children.push(close);
    }

    var alert = h('div', {
      staticClass: 'alert',
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }, children);

    if (!this.transition) return alert;

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [alert]);
  }
});

/***/ }),
/* 91 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_icons_styl__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_icons_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_icons_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var SIZE_MAP = {
  small: '16px',
  default: '24px',
  medium: '28px',
  large: '36px',
  xLarge: '40px'
};

function isFontAwesome5(iconType) {
  return ['fas', 'far', 'fal', 'fab'].some(function (val) {
    return iconType.includes(val);
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-icon',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  props: {
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    size: {
      type: [Number, String]
    },
    small: Boolean,
    xLarge: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        _ref$children = _ref.children,
        children = _ref$children === undefined ? [] : _ref$children;
    var small = props.small,
        medium = props.medium,
        large = props.large,
        xLarge = props.xLarge;

    var sizes = { small: small, medium: medium, large: large, xLarge: xLarge };
    var explicitSize = Object.keys(sizes).find(function (key) {
      return sizes[key] && key;
    });
    var fontSize = explicitSize && SIZE_MAP[explicitSize] || props.size;

    if (fontSize) data.style = _extends({ fontSize: fontSize }, data.style);

    var iconName = '';
    if (children.length) iconName = children.pop().text;
    // Support usage of v-text and v-html
    else if (data.domProps) {
        iconName = data.domProps.textContent || data.domProps.innerHTML || iconName;

        // Remove nodes so it doesn't
        // overwrite our changes
        delete data.domProps.textContent;
        delete data.domProps.innerHTML;
      }

    var iconType = 'material-icons';
    // Material Icon delimiter is _
    // https://material.io/icons/
    var delimiterIndex = iconName.indexOf('-');
    var isCustomIcon = delimiterIndex > -1;

    if (isCustomIcon) {
      iconType = iconName.slice(0, delimiterIndex);

      if (isFontAwesome5(iconType)) iconType = '';
      // Assume if not a custom icon
      // is Material Icon font
    } else children.push(iconName);

    data.attrs = data.attrs || {};
    if (!('aria-hidden' in data.attrs)) {
      data.attrs['aria-hidden'] = true;
    }

    var classes = Object.assign({
      'icon--disabled': props.disabled,
      'icon--left': props.left,
      'icon--right': props.right,
      'theme--dark': props.dark,
      'theme--light': props.light
    }, props.color ? __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */].methods.addTextColorClassChecks.call(props, {}, props.color) : {});

    // Order classes
    // * Component class
    // * Vuetify classes
    // * Icon Classes
    data.staticClass = ['icon', data.staticClass, Object.keys(classes).filter(function (k) {
      return classes[k];
    }).join(' '), iconType, isCustomIcon ? iconName : null].reduce(function (prev, curr) {
      return curr ? prev + ' ' + curr : prev;
    }).trim();

    return h('i', data, children);
  }
});

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_avatars_styl__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_avatars_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_avatars_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);


// Mixins


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-avatar',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */]],

  props: {
    size: {
      type: [Number, String],
      default: 48
    },
    tile: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('avatar ' + (data.staticClass || '')).trim();
    data.style = data.style || {};

    if (props.tile) data.staticClass += ' avatar--tile';

    var size = parseInt(props.size) + 'px';
    data.style.height = size;
    data.style.width = size;
    data.class = [data.class, __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */].methods.addBackgroundColorClassChecks.call(props, {}, props.color)];

    return h('div', data, children);
  }
});

/***/ }),
/* 95 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBadge__ = __webpack_require__(97);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */]);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_badges_styl__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_badges_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_badges_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_positionable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__ = __webpack_require__(25);


// Mixins





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-badge',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3__mixins_positionable__["b" /* factory */])(['left', 'bottom']), __WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__["a" /* default */]],

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    overlap: Boolean,
    transition: {
      type: String,
      default: 'fab-transition'
    },
    value: {
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'badge--bottom': this.bottom,
        'badge--left': this.left,
        'badge--overlap': this.overlap
      };
    }
  },

  render: function render(h) {
    var badge = this.$slots.badge ? [h('span', {
      staticClass: 'badge__badge',
      'class': this.addBackgroundColorClassChecks(),
      attrs: this.attrs,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, this.$slots.badge)] : null;

    return h('span', {
      staticClass: 'badge',
      'class': this.classes
    }, [this.$slots.default, h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, badge)]);
  }
});

/***/ }),
/* 98 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBottomNav__ = __webpack_require__(100);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */]);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_navs_styl__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_navs_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_navs_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_button_group__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__ = __webpack_require__(0);
// Styles


// Mixins




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-bottom-nav',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a" /* default */])('bottom', ['height', 'value']), __WEBPACK_IMPORTED_MODULE_2__mixins_button_group__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__["a" /* default */]],

  props: {
    active: [Number, String],
    height: {
      default: 56,
      type: [Number, String],
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    shift: Boolean,
    value: { required: false }
  },

  watch: {
    active: function active() {
      this.update();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'bottom-nav--absolute': this.absolute,
        'bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
        'bottom-nav--shift': this.shift,
        'bottom-nav--active': this.value
      };
    },
    computedHeight: function computedHeight() {
      return parseInt(this.height);
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      return this.active === item;
    },

    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication: function updateApplication() {
      return !this.value ? 0 : this.computedHeight;
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);

      this.$emit('update:active', item);
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'bottom-nav',
      class: this.addBackgroundColorClassChecks(this.classes),
      style: {
        height: parseInt(this.computedHeight) + 'px'
      },
      ref: 'content'
    }, this.$slots.default);
  }
});

/***/ }),
/* 101 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__ = __webpack_require__(103);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */]);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_sheets_styl__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_sheets_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_sheets_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VDialog_VDialog__ = __webpack_require__(34);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-bottom-sheet',

  props: {
    disabled: Boolean,
    fullWidth: Boolean,
    hideOverlay: Boolean,
    inset: Boolean,
    lazy: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'auto'
    },
    persistent: Boolean,
    value: null
  },

  render: function render(h) {
    var activator = h('template', {
      slot: 'activator'
    }, this.$slots.activator);

    var contentClass = ['bottom-sheet', this.inset ? 'bottom-sheet--inset' : ''].join(' ');

    return h(__WEBPACK_IMPORTED_MODULE_1__VDialog_VDialog__["a" /* default */], {
      attrs: _extends({}, this.$props),
      on: _extends({}, this.$listeners),
      props: {
        contentClass: contentClass,
        transition: 'bottom-sheet-transition',
        value: this.value
      }
    }, [activator, this.$slots.default]);
  }
});

/***/ }),
/* 104 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 105 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__ = __webpack_require__(110);
/* unused harmony reexport VBreadcrumbs */
/* unused harmony reexport VBreadcrumbsItem */





/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */]);

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_breadcrumbs_styl__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_breadcrumbs_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_breadcrumbs_styl__);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-breadcrumbs',

  props: {
    divider: {
      type: String,
      default: '/'
    },
    large: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'breadcrumbs--large': this.large
      };
    },
    computedDivider: function computedDivider() {
      return this.$slots.divider ? this.$slots.divider : this.divider;
    },
    styles: function styles() {
      var justify = this.justifyCenter ? 'center' : this.justifyEnd ? 'flex-end' : 'flex-start';

      return {
        'justify-content': justify
      };
    }
  },

  methods: {
    /**
     * Add dividers between
     * v-breadcrumbs-item
     *
     * @return {array}
     */
    genChildren: function genChildren() {
      if (!this.$slots.default) return null;

      var children = [];
      var dividerData = { staticClass: 'breadcrumbs__divider' };
      var length = this.$slots.default.length;

      for (var i = 0; i < length; i++) {
        var elm = this.$slots.default[i];
        children.push(elm);

        if (!elm.componentOptions || elm.componentOptions.tag !== 'v-breadcrumbs-item' || i === length - 1) continue;

        children.push(this.$createElement('li', dividerData, this.computedDivider));
      }

      return children;
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'breadcrumbs',
      'class': this.classes,
      style: this.styles
    }, this.genChildren());
  }
});

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__ = __webpack_require__(13);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-breadcrumbs-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a" /* default */]],

  props: {
    // In a breadcrumb, the currently
    // active item should be dimmed
    activeClass: {
      type: String,
      default: 'breadcrumbs__item--disabled'
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'breadcrumbs__item': true
      }, this.activeClass, this.disabled);
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    return h('li', [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_buttons_styl__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_buttons_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_buttons_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_routable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_registrable__ = __webpack_require__(4);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-btn',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__["b" /* factory */])('inputValue'), Object(__WEBPACK_IMPORTED_MODULE_6__mixins_registrable__["a" /* inject */])('buttonGroup')],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },

  computed: {
    classes: function classes() {
      var classes = _extends({
        'btn': true,
        'btn--active': this.isActive,
        'btn--absolute': this.absolute,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
        'btn--disabled': this.disabled,
        'btn--flat': this.flat,
        'btn--floating': this.fab,
        'btn--fixed': this.fixed,
        'btn--hover': this.hover,
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--left': this.left,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--depressed': this.depressed && !this.flat || this.outline,
        'btn--right': this.right,
        'btn--round': this.round,
        'btn--router': this.to,
        'btn--small': this.small,
        'btn--top': this.top
      }, this.themeClasses);

      return !this.outline && !this.flat ? this.addBackgroundColorClassChecks(classes) : this.addTextColorClassChecks(classes);
    }
  },

  methods: {
    // Prevent focus to match md spec
    click: function click(e) {
      !this.fab && e.detail && this.$el.blur();

      this.$emit('click', e);
    },
    genContent: function genContent() {
      return this.$createElement('div', { 'class': 'btn__content' }, [this.$slots.default]);
    },
    genLoader: function genLoader() {
      var children = [];

      if (!this.$slots.loader) {
        children.push(this.$createElement('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }));
      } else {
        children.push(this.$slots.loader);
      }

      return this.$createElement('span', { 'class': 'btn__loading' }, children);
    }
  },

  mounted: function mounted() {
    if (this.buttonGroup) {
      this.buttonGroup.register(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.buttonGroup) {
      this.buttonGroup.unregister(this);
    }
  },
  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    var children = [this.genContent()];

    tag === 'button' && (data.attrs.type = this.type);
    this.loading && children.push(this.genLoader());

    data.attrs.value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);

    return h(tag, data, children);
  }
});

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__ = __webpack_require__(114);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */]);

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_button_toggle_styl__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_button_toggle_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_button_toggle_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_button_group__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(1);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-btn-toggle',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_button_group__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  props: {
    inputValue: {
      required: false
    },
    mandatory: Boolean,
    multiple: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'btn-toggle': true,
        'btn-toggle--selected': this.hasValue,
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    },
    hasValue: function hasValue() {
      return this.multiple && this.inputValue.length || !this.multiple && this.inputValue !== null && typeof this.inputValue !== 'undefined';
    }
  },

  watch: {
    inputValue: {
      handler: function handler() {
        this.update();
      },

      deep: true
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      if (!this.multiple) {
        return this.inputValue === item;
      }

      return this.inputValue.includes(item);
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item) return;
        return this.$emit('change', this.inputValue === item ? null : item);
      }

      var items = this.inputValue.slice();

      var index = items.indexOf(item);
      if (index > -1) {
        if (this.mandatory && items.length === 1) return;
        items.length >= 1 && items.splice(index, 1);
      } else {
        items.push(item);
      }

      this.$emit('change', items);
    }
  },

  render: function render(h) {
    return h('div', { class: this.classes }, this.$slots.default);
  }
});

/***/ }),
/* 115 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_cards_styl__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_cards_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_cards_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_routable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    hover: Boolean,
    img: String,
    raised: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean,
    width: [String, Number]
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'card': true,
        'card--flat': this.flat,
        'card--horizontal': this.horizontal,
        'card--hover': this.hover,
        'card--raised': this.raised,
        'card--tile': this.tile,
        'theme--light': this.light,
        'theme--dark': this.dark
      });
    },
    styles: function styles() {
      var style = {
        height: isNaN(this.height) ? this.height : this.height + 'px'
      };

      if (this.img) {
        style.background = 'url("' + this.img + '") center center / cover no-repeat';
      }

      if (this.width) {
        style.width = isNaN(this.width) ? this.width : this.width + 'px';
      }

      return style;
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    data.style = this.styles;

    return h(tag, data, this.$slots.default);
  }
});

/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card-media',

  props: {
    contain: Boolean,
    height: {
      type: [Number, String],
      default: 'auto'
    },
    src: {
      type: String
    }
  },

  render: function render(h) {
    var data = {
      'class': 'card__media',
      style: {
        height: !isNaN(this.height) ? this.height + 'px' : this.height
      },
      on: this.$listeners
    };

    var children = [];

    if (this.src) {
      children.push(h('div', {
        'class': 'card__media__background',
        style: {
          background: 'url(' + this.src + ') center center / ' + (this.contain ? 'contain' : 'cover') + ' no-repeat'
        }
      }));
    }

    children.push(h('div', {
      'class': 'card__media__content'
    }, this.$slots.default));

    return h('div', data, children);
  }
});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card-title',

  functional: true,

  props: {
    primaryTitle: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('card__title ' + (data.staticClass || '')).trim();

    if (props.primaryTitle) data.staticClass += ' card__title--primary';

    return h('div', data, children);
  }
});

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCarousel__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__ = __webpack_require__(123);
/* unused harmony reexport VCarousel */
/* unused harmony reexport VCarouselItem */





/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */]);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_carousel_styl__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_carousel_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_carousel_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_bootable__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_touch__ = __webpack_require__(9);











/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-carousel',

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_5__mixins_registrable__["b" /* provide */])('carousel')],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_6__directives_touch__["a" /* default */] },

  data: function data() {
    return {
      inputValue: null,
      items: [],
      slideTimeout: null,
      reverse: false
    };
  },


  props: {
    cycle: {
      type: Boolean,
      default: true
    },
    delimiterIcon: {
      type: String,
      default: 'fiber_manual_record'
    },
    hideControls: Boolean,
    hideDelimiters: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: function validator(value) {
        return value > 0;
      }
    },
    nextIcon: {
      type: [Boolean, String],
      default: 'chevron_right'
    },
    prevIcon: {
      type: [Boolean, String],
      default: 'chevron_left'
    },
    value: Number
  },

  watch: {
    items: function items() {
      if (this.inputValue >= this.items.length) {
        this.inputValue = this.items.length - 1;
      }
    },
    inputValue: function inputValue() {
      // Evaluates items when inputValue changes to
      // account for dynamic changing of children

      var uid = (this.items[this.inputValue] || {}).uid;
      for (var index = this.items.length; --index >= 0;) {
        this.items[index].open(uid, this.reverse);
      }

      this.$emit('input', this.inputValue);
      this.restartTimeout();
    },
    value: function value(val) {
      this.inputValue = val;
    },
    interval: function interval() {
      this.restartTimeout();
    },
    cycle: function cycle(val) {
      if (val) {
        this.restartTimeout();
      } else {
        clearTimeout(this.slideTimeout);
        this.slideTimeout = null;
      }
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    genDelimiters: function genDelimiters() {
      return this.$createElement('div', {
        staticClass: 'carousel__controls'
      }, this.genItems());
    },
    genIcon: function genIcon(direction, icon, fn) {
      if (!icon) return null;

      return this.$createElement('div', {
        staticClass: 'carousel__' + direction
      }, [this.$createElement(__WEBPACK_IMPORTED_MODULE_1__VBtn__["a" /* default */], {
        props: {
          icon: true,
          dark: this.dark || !this.light,
          light: this.light
        },
        on: { click: fn }
      }, [this.$createElement(__WEBPACK_IMPORTED_MODULE_2__VIcon__["a" /* default */], {
        props: { 'size': '46px' }
      }, icon)])]);
    },
    genItems: function genItems() {
      var _this = this;

      return this.items.map(function (item, index) {
        return _this.$createElement(__WEBPACK_IMPORTED_MODULE_1__VBtn__["a" /* default */], {
          class: {
            'carousel__controls__item': true,
            'carousel__controls__item--active': index === _this.inputValue
          },
          props: {
            icon: true,
            small: true,
            dark: _this.dark || !_this.light,
            light: _this.light
          },
          key: index,
          on: { click: _this.select.bind(_this, index) }
        }, [_this.$createElement(__WEBPACK_IMPORTED_MODULE_2__VIcon__["a" /* default */], {
          props: { size: '18px' }
        }, _this.delimiterIcon)]);
      });
    },
    restartTimeout: function restartTimeout() {
      this.slideTimeout && clearTimeout(this.slideTimeout);
      this.slideTimeout = null;

      var raf = requestAnimationFrame || setTimeout;
      raf(this.startTimeout);
    },
    init: function init() {
      this.inputValue = this.value || 0;
    },
    next: function next() {
      this.reverse = false;
      this.inputValue = (this.inputValue + 1) % this.items.length;
    },
    prev: function prev() {
      this.reverse = true;
      this.inputValue = (this.inputValue + this.items.length - 1) % this.items.length;
    },
    select: function select(index) {
      this.reverse = index < this.inputValue;
      this.inputValue = index;
    },
    startTimeout: function startTimeout() {
      var _this2 = this;

      if (!this.cycle) return;

      this.slideTimeout = setTimeout(function () {
        return _this2.next();
      }, this.interval > 0 ? this.interval : 6000);
    },
    register: function register(uid, open) {
      this.items.push({ uid: uid, open: open });
    },
    unregister: function unregister(uid) {
      this.items = this.items.filter(function (i) {
        return i.uid !== uid;
      });
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'carousel',
      directives: [{
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }]
    }, [this.hideControls ? null : this.genIcon('left', this.prevIcon, this.prev), this.hideControls ? null : this.genIcon('right', this.nextIcon, this.next), this.hideDelimiters ? null : this.genDelimiters(), this.$slots.default]);
  }
});

/***/ }),
/* 122 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VJumbotron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_registrable__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Components


// Mixins


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-carousel-item',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_registrable__["a" /* inject */])('carousel', 'v-carousel-item', 'v-carousel')],

  inheritAttrs: false,

  data: function data() {
    return {
      active: false,
      reverse: false
    };
  },


  props: {
    transition: {
      type: String,
      default: 'tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    open: function open(id, reverse) {
      this.active = this._uid === id;
      this.reverse = reverse;
    }
  },

  mounted: function mounted() {
    this.carousel.register(this._uid, this.open);
  },
  beforeDestroy: function beforeDestroy() {
    this.carousel.unregister(this._uid, this.open);
  },
  render: function render(h) {
    var item = h(__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a" /* default */], {
      props: _extends({}, this.$attrs, {
        height: '100%'
      }),
      on: this.$listeners,
      directives: [{
        name: 'show',
        value: this.active
      }]
    }, this.$slots.default);

    return h('transition', { props: { name: this.computedTransition } }, [item]);
  }
});

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_jumbotrons_styl__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_jumbotrons_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_jumbotrons_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_routable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);


// Mixins




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-jumbotron',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  props: {
    gradient: String,
    height: {
      type: [Number, String],
      default: '400px'
    },
    src: String,
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    backgroundStyles: function backgroundStyles() {
      var styles = {};

      if (this.gradient) {
        styles.background = 'linear-gradient(' + this.gradient + ')';
      }

      return styles;
    },
    classes: function classes() {
      return {
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    styles: function styles() {
      return {
        height: this.height
      };
    }
  },

  methods: {
    genBackground: function genBackground() {
      return this.$createElement('div', {
        staticClass: 'jumbotron__background',
        'class': this.addBackgroundColorClassChecks(),
        style: this.backgroundStyles
      });
    },
    genContent: function genContent() {
      return this.$createElement('div', {
        staticClass: 'jumbotron__content'
      }, this.$slots.default);
    },
    genImage: function genImage() {
      if (!this.src) return null;
      if (this.$slots.img) return this.$slots.img({ src: this.src });

      return this.$createElement('img', {
        staticClass: 'jumbotron__image',
        attrs: { src: this.src }
      });
    },
    genWrapper: function genWrapper() {
      return this.$createElement('div', {
        staticClass: 'jumbotron__wrapper'
      }, [this.genImage(), this.genBackground(), this.genContent()]);
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    data.staticClass = 'jumbotron';
    data.style = this.styles;

    return h(tag, data, [this.genWrapper()]);
  }
});

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transitions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_rippleable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_selectable__ = __webpack_require__(40);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-checkbox',

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_3__transitions__["b" /* VFadeTransition */],
    VIcon: __WEBPACK_IMPORTED_MODULE_2__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins_rippleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_selectable__["a" /* default */]],

  data: function data() {
    return {
      inputIndeterminate: this.indeterminate
    };
  },


  props: {
    indeterminate: Boolean
  },

  computed: {
    classes: function classes() {
      var classes = {
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    icon: function icon() {
      if (this.inputIndeterminate) {
        return 'indeterminate_check_box';
      } else if (this.isActive) {
        return 'check_box';
      } else {
        return 'check_box_outline_blank';
      }
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    groupBlur: function groupBlur(e) {
      this.isFocused = false;
      this.tabFocused = false;
      this.$emit('blur', this.inputValue);
    }
  },

  render: function render(h) {
    var transition = h('v-fade-transition', [h('v-icon', {
      staticClass: 'icon--selection-control',
      'class': {
        'icon--checkbox': this.icon === 'check_box'
      },
      key: this.icon,
      on: Object.assign({
        click: this.toggle
      }, this.$listeners)
    }, this.icon)]);

    var data = {
      attrs: {
        tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex,
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate ? 'mixed' : this.isActive ? 'true' : 'false',
        'aria-label': this.label
      }
    };

    var ripple = this.ripple ? this.genRipple() : null;

    return this.genInputGroup([transition, ripple], data);
  }
});

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_console__ = __webpack_require__(6);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'validatable',

  data: function data() {
    return {
      errorBucket: [],
      hasFocused: false,
      hasInput: false,
      shouldValidate: false,
      valid: false
    };
  },


  props: {
    error: {
      type: Boolean
    },
    errorMessages: {
      type: [String, Array],
      default: function _default() {
        return [];
      }
    },
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    validateOnBlur: Boolean
  },

  computed: {
    validations: function validations() {
      if (!Array.isArray(this.errorMessages)) {
        return [this.errorMessages];
      } else if (this.errorMessages.length > 0) {
        return this.errorMessages;
      } else if (this.shouldValidate) {
        return this.errorBucket;
      } else {
        return [];
      }
    },
    hasError: function hasError() {
      return this.validations.length > 0 || this.errorMessages.length > 0 || this.error;
    }
  },

  watch: {
    rules: {
      handler: function handler(newVal, oldVal) {
        // TODO: This handler seems to trigger when input changes, even though
        // rules array stays the same? Solved it like this for now
        if (newVal.length === oldVal.length) return;

        this.validate();
      },

      deep: true
    },
    inputValue: function inputValue(val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) this.hasInput = true;

      if (this.hasInput && !this.validateOnBlur) this.shouldValidate = true;
    },
    isFocused: function isFocused(val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true;
        this.shouldValidate = true;

        this.$emit('update:error', this.errorBucket.length > 0);
      }
    },
    hasError: function hasError(val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val);
      }
    },
    error: function error(val) {
      this.shouldValidate = !!val;
    }
  },

  mounted: function mounted() {
    this.shouldValidate = !!this.error;
    this.validate();
  },


  methods: {
    reset: function reset() {
      var _this = this;

      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', this.isMultiple ? [] : null);
      this.$emit('change', null);

      this.$nextTick(function () {
        _this.shouldValidate = false;
        _this.hasFocused = false;
        _this.validate();
      });
    },
    validate: function validate() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.inputValue;

      if (force) this.shouldValidate = true;

      this.errorBucket = [];

      for (var index = 0; index < this.rules.length; index++) {
        var rule = this.rules[index];
        var valid = typeof rule === 'function' ? rule(value) : rule;

        if (valid === false || typeof valid === 'string') {
          this.errorBucket.push(valid);
        } else if (valid !== true) {
          Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["a" /* consoleError */])('Rules should return a string or boolean, received \'' + (typeof valid === 'undefined' ? 'undefined' : _typeof(valid)) + '\' instead', this);
        }
      }

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    }
  }
});

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_chips_styl__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_chips_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_chips_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__ = __webpack_require__(5);







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-chip',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["a" /* default */]],

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes() {
      var classes = this.addBackgroundColorClassChecks({
        'chip--disabled': this.disabled,
        'chip--selected': this.selected,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      });

      return this.textColor || this.outline ? this.addTextColorClassChecks(classes, this.textColor || this.color) : classes;
    }
  },

  methods: {
    genClose: function genClose(h) {
      var _this = this;

      var data = {
        staticClass: 'chip__close',
        on: {
          click: function click(e) {
            e.stopPropagation();

            _this.$emit('input', false);
          }
        }
      };

      return h('div', data, [h(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], 'cancel')]);
    },
    genContent: function genContent(h) {
      var children = [this.$slots.default];

      this.close && children.push(this.genClose(h));

      return h('span', {
        staticClass: 'chip__content'
      }, children);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'chip',
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    };

    return h('span', data, [this.genContent(h)]);
  }
});

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDataIterator__ = __webpack_require__(131);


__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a" /* default */]);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_data_iterator_styl__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_data_iterator_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_data_iterator_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_data_iterable__ = __webpack_require__(43);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-data-iterator',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_data_iterable__["a" /* default */]],

  inheritAttrs: false,

  props: {
    contentTag: {
      type: String,
      default: 'div'
    },
    contentProps: {
      type: Object,
      required: false
    },
    contentClass: {
      type: String,
      required: false
    }
  },

  computed: {
    classes: function classes() {
      return {
        'data-iterator': true,
        'data-iterator--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  methods: {
    genContent: function genContent() {
      var children = this.genItems();

      var data = {
        'class': this.contentClass,
        attrs: this.$attrs,
        on: this.$listeners,
        props: this.contentProps
      };

      return this.$createElement(this.contentTag, data, children);
    },
    genEmptyItems: function genEmptyItems(content) {
      return [this.$createElement('div', {
        'class': 'text-xs-center',
        style: 'width: 100%'
      }, content)];
    },
    genFilteredItems: function genFilteredItems() {
      if (!this.$scopedSlots.item) {
        return null;
      }

      var items = [];
      for (var index = 0, len = this.filteredItems.length; index < len; ++index) {
        var item = this.filteredItems[index];
        var props = this.createProps(item, index);
        items.push(this.$scopedSlots.item(props));
      }

      return items;
    },
    genFooter: function genFooter() {
      var children = [];

      if (this.$slots.footer) {
        children.push(this.$slots.footer);
      }

      if (!this.hideActions) {
        children.push(this.genActions());
      }

      if (!children.length) return null;
      return this.$createElement('div', children);
    }
  },

  created: function created() {
    this.initPagination();
  },
  render: function render(h) {
    return h('div', {
      'class': this.classes
    }, [this.genContent(), this.genFooter()]);
  }
});

/***/ }),
/* 132 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_text_fields_styl__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_text_fields_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_text_fields_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_input_groups_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_input_groups_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_input_groups_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylus_components_select_styl__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylus_components_select_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stylus_components_select_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VCard__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VCheckbox__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VChip__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VList__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VMenu__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mixins_dependent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mixins_filterable__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mixins_input__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__mixins_maskable__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__mixins_soloable__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__mixins_select_autocomplete__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__mixins_select_computed__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__mixins_select_events__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__mixins_select_generators__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__mixins_select_helpers__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__mixins_select_menu__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__mixins_select_props__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__mixins_select_watchers__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__directives_click_outside__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles




// Components







// Mixins







// Component level mixins









// Directives


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-select',

  inheritAttrs: false,

  components: {
    VCard: __WEBPACK_IMPORTED_MODULE_4__VCard__["a" /* default */],
    VCheckbox: __WEBPACK_IMPORTED_MODULE_5__VCheckbox__["a" /* default */],
    VChip: __WEBPACK_IMPORTED_MODULE_6__VChip__["a" /* default */],
    VList: __WEBPACK_IMPORTED_MODULE_7__VList__["a" /* VList */],
    VListTile: __WEBPACK_IMPORTED_MODULE_7__VList__["b" /* VListTile */],
    VListTileAction: __WEBPACK_IMPORTED_MODULE_7__VList__["c" /* VListTileAction */],
    VListTileContent: __WEBPACK_IMPORTED_MODULE_7__VList__["d" /* VListTileContent */],
    VListTileTitle: __WEBPACK_IMPORTED_MODULE_7__VList__["e" /* VListTileTitle */],
    VMenu: __WEBPACK_IMPORTED_MODULE_8__VMenu__["a" /* default */],
    VBtn: __WEBPACK_IMPORTED_MODULE_3__VBtn__["a" /* default */]
  },

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_23__directives_click_outside__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_15__mixins_select_autocomplete__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_17__mixins_select_events__["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_18__mixins_select_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_19__mixins_select_helpers__["a" /* default */], __WEBPACK_IMPORTED_MODULE_12__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_13__mixins_maskable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_20__mixins_select_menu__["a" /* default */], __WEBPACK_IMPORTED_MODULE_21__mixins_select_props__["a" /* default */], __WEBPACK_IMPORTED_MODULE_14__mixins_soloable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_22__mixins_select_watchers__["a" /* default */],
  // Input and Computed both
  // contain isDirty props
  // last gets merged in
  __WEBPACK_IMPORTED_MODULE_16__mixins_select_computed__["a" /* default */]],

  data: function data() {
    return {
      cachedItems: this.cacheItems ? this.items : [],
      content: {},
      defaultColor: 'primary',
      inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      lazySearch: null,
      isActive: false,
      menuIsActive: false,
      selectedIndex: -1,
      selectedItems: [],
      shouldBreak: false
    };
  },
  mounted: function mounted() {
    // If instance is being destroyed
    // do not run mounted functions
    if (this._isDestroyed) return;

    // Evaluate the selected items immediately
    // to avoid a unnecessary label transition
    this.genSelectedItems();

    this.content = this.$refs.menu.$refs.content;
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isBooted) {
      if (this.content) {
        this.content.removeEventListener('scroll', this.onScroll, false);
      }
    }
  },


  methods: {
    needsTile: function needsTile(tile) {
      return tile.componentOptions == null || tile.componentOptions.tag !== 'v-list-tile';
    },
    changeSelectedIndex: function changeSelectedIndex(keyCode) {
      // backspace, left, right, delete
      if (![8, 37, 39, 46].includes(keyCode)) return;

      var indexes = this.selectedItems.length - 1;

      if (keyCode === 37) {
        // Left arrow
        this.selectedIndex = this.selectedIndex === -1 ? indexes : this.selectedIndex - 1;
      } else if (keyCode === 39) {
        // Right arrow
        this.selectedIndex = this.selectedIndex >= indexes ? -1 : this.selectedIndex + 1;
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = indexes;
        return;
      }

      // backspace/delete
      if ([8, 46].includes(keyCode)) {
        var newIndex = this.selectedIndex === indexes ? this.selectedIndex - 1 : this.selectedItems[this.selectedIndex + 1] ? this.selectedIndex : -1;

        this.combobox ? this.inputValue = null : this.selectItem(this.selectedItems[this.selectedIndex]);
        this.selectedIndex = newIndex;
      }
    },
    closeConditional: function closeConditional(e) {
      return this.isActive && !!this.content && !this.content.contains(e.target) && !!this.$el && !this.$el.contains(e.target);
    },
    filterDuplicates: function filterDuplicates(arr) {
      var uniqueValues = new Map();
      for (var index = 0; index < arr.length; ++index) {
        var item = arr[index];
        var val = this.getValue(item);

        !uniqueValues.has(val) && uniqueValues.set(val, item);
      }
      return Array.from(uniqueValues.values());
    },
    genDirectives: function genDirectives() {
      var _this = this;

      return [{
        name: 'click-outside',
        value: function value() {
          return _this.isActive = false;
        },
        args: {
          closeConditional: this.closeConditional
        }
      }];
    },
    genSelectedItems: function genSelectedItems() {
      var _this2 = this;

      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.inputValue;

      // If we are using tags, don't filter results
      if (this.tags) return this.selectedItems = val;

      // Combobox is the single version
      // of a taggable select element
      if (this.combobox) return this.selectedItems = val != null ? [val] : [];

      var selectedItems = this.computedItems.filter(function (i) {
        if (!_this2.isMultiple) {
          return _this2.getValue(i) === _this2.getValue(val);
        } else {
          // Always return Boolean
          return _this2.findExistingIndex(i) > -1;
        }
      });

      if (!selectedItems.length && val != null && this.tags) {
        selectedItems = Array.isArray(val) ? val : [val];
      }

      this.selectedItems = selectedItems;
    },
    clearableCallback: function clearableCallback() {
      var _this3 = this;

      var inputValue = this.isMultiple ? [] : null;

      this.inputValue = inputValue;
      this.$emit('change', inputValue);
      this.genSelectedItems();

      // When input is cleared
      // reset search value and
      // re-focus the input
      setTimeout(function () {
        _this3.searchValue = null;
        _this3.focusInput();
      }, 0);

      if (this.openOnClear) {
        setTimeout(this.showMenu, 50);
      }
    },
    onScroll: function onScroll() {
      var _this4 = this;

      if (!this.isActive) {
        requestAnimationFrame(function () {
          return _this4.content.scrollTop = 0;
        });
      } else {
        if (this.lastItem >= this.computedItems.length) return;

        var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },
    findExistingItem: function findExistingItem(val) {
      var _this5 = this;

      var itemValue = this.getValue(val);
      return this.items.find(function (i) {
        return _this5.valueComparator(_this5.getValue(i), itemValue);
      });
    },
    findExistingIndex: function findExistingIndex(item) {
      var _this6 = this;

      var itemValue = this.getValue(item);
      return this.inputValue.findIndex(function (i) {
        return _this6.valueComparator(_this6.getValue(i), itemValue);
      });
    },
    selectItem: function selectItem(item) {
      var _this7 = this;

      if (!this.isMultiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item);
        this.selectedItems = [item];
      } else {
        var selectedItems = [];
        var inputValue = this.inputValue.slice();
        var i = this.findExistingIndex(item);

        i !== -1 ? inputValue.splice(i, 1) : inputValue.push(item);
        this.inputValue = inputValue.map(function (i) {
          selectedItems.push(i);
          return _this7.returnObject ? i : _this7.getValue(i);
        });

        this.selectedItems = selectedItems;
        this.selectedIndex = -1;
      }

      this.searchValue = !this.isMultiple && !this.chips && !this.$scopedSlots.selection ? this.getText(this.selectedItem) : null;

      this.$emit('change', this.inputValue);

      // List tile will re-render, reset index to
      // maintain highlighting
      var savedIndex = this.getMenuIndex();
      this.resetMenuIndex();

      // After selecting an item
      // refocus the input and
      // reset the caret pos
      this.$nextTick(function () {
        _this7.focusInput();
        _this7.setCaretPosition(_this7.currentRange);

        requestAnimationFrame(function () {
          if (savedIndex > -1) {
            _this7.setMenuIndex(savedIndex);
          }
        });
      });
    }
  },

  render: function render(h) {
    var _this8 = this;

    var data = {
      attrs: _extends({
        tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex,
        'data-uid': this._uid
      }, this.isAutocomplete ? null : this.$attrs, {
        role: this.isAutocomplete ? null : 'combobox'
      })
    };

    if (!this.isAutocomplete) {
      data.on = this.genListeners();
      data.directives = this.genDirectives();
    } else {
      data.on = {
        click: function click() {
          if (_this8.disabled || _this8.readonly || _this8.isFocused) return;

          // If the input is dirty,
          // the input is not targetable
          // so we must manually focus
          if (_this8.isDirty) {
            _this8.focus();
            _this8.$nextTick(_this8.focusInput);
          }
        }
      };
    }

    return this.genInputGroup([this.genSelectionsAndSearch(), this.genMenu()], data, this.toggleMenu);
  }
});

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_lists_styl__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_lists_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_lists_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_registrable__ = __webpack_require__(4);
// Styles


// Mixins



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_2__mixins_registrable__["b" /* provide */])('list'), __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      'listClick': this.listClick
    };
  },


  data: function data() {
    return {
      groups: []
    };
  },

  props: {
    dense: Boolean,
    expand: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'list--dense': this.dense,
        'list--subheader': this.subheader,
        'list--two-line': this.twoLine,
        'list--three-line': this.threeLine,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  methods: {
    register: function register(uid, cb) {
      this.groups.push({ uid: uid, cb: cb });
    },
    unregister: function unregister(uid) {
      var index = this.groups.findIndex(function (g) {
        return g.uid === uid;
      });

      if (index > -1) {
        this.groups.splice(index, 1);
      }
    },
    listClick: function listClick(uid, isBooted) {
      if (this.expand) return;

      for (var i = this.groups.length; i--;) {
        this.groups[i].cb(uid);
      }
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'list',
      'class': this.classes
    };

    return h('ul', data, [this.$slots.default]);
  }
});

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transitions__ = __webpack_require__(7);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Components


// Mixins




// Transitions


/**
 * List group
 *
 * @component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list-group',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3__mixins_registrable__["a" /* inject */])('list', 'v-list-group', 'v-list'), __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  inject: ['listClick'],

  data: function data() {
    return {
      groups: []
    };
  },

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    appendIcon: {
      type: String,
      default: 'keyboard_arrow_down'
    },
    disabled: Boolean,
    group: String,
    noAction: Boolean,
    prependIcon: String,
    subGroup: Boolean
  },

  computed: {
    groupClasses: function groupClasses() {
      return {
        'list__group--active': this.isActive,
        'list__group--disabled': this.disabled
      };
    },
    headerClasses: function headerClasses() {
      return {
        'list__group__header--active': this.isActive,
        'list__group__header--sub-group': this.subGroup
      };
    },
    itemsClasses: function itemsClasses() {
      return {
        'list__group__items--no-action': this.noAction
      };
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (!this.subGroup && val) {
        this.listClick(this._uid);
      }
    },
    $route: function $route(to) {
      var isActive = this.matchRoute(to.path);

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.listClick(this._uid);
        }

        this.isActive = isActive;
      }
    }
  },

  mounted: function mounted() {
    this.list.register(this._uid, this.toggle);

    if (this.group && this.$route && this.value == null) {
      this.isActive = this.matchRoute(this.$route.path);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.list.unregister(this._uid);
  },


  methods: {
    click: function click() {
      if (this.disabled) return;

      this.isActive = !this.isActive;
    },
    genIcon: function genIcon(icon) {
      return this.$createElement(__WEBPACK_IMPORTED_MODULE_0__components_VIcon__["a" /* default */], icon);
    },
    genAppendIcon: function genAppendIcon() {
      var icon = !this.subGroup ? this.appendIcon : false;

      if (!icon && !this.$slots.appendIcon) return null;

      return this.$createElement('li', {
        staticClass: 'list__group__header__append-icon'
      }, [this.$slots.appendIcon || this.genIcon(icon)]);
    },
    genGroup: function genGroup() {
      return this.$createElement('ul', {
        staticClass: 'list__group__header',
        'class': this.headerClasses,
        on: Object.assign({}, {
          click: this.click
        }, this.$listeners),
        ref: 'item'
      }, [this.genPrependIcon(), this.$slots.activator, this.genAppendIcon()]);
    },
    genItems: function genItems() {
      return this.$createElement('ul', {
        staticClass: 'list__group__items',
        'class': this.itemsClasses,
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        ref: 'group'
      }, this.showLazyContent(this.$slots.default));
    },
    genPrependIcon: function genPrependIcon() {
      var icon = this.prependIcon ? this.prependIcon : this.subGroup ? 'arrow_drop_down' : false;

      if (!icon && !this.$slots.prependIcon) return null;

      return this.$createElement('li', {
        staticClass: 'list__group__header__prepend-icon',
        'class': _defineProperty({}, this.activeClass, this.isActive)
      }, [this.$slots.prependIcon || this.genIcon(icon)]);
    },
    toggle: function toggle(uid) {
      this.isActive = this._uid === uid;
    },
    matchRoute: function matchRoute(to) {
      if (!this.group) return false;
      return to.match(this.group) !== null;
    }
  },

  render: function render(h) {
    return h('li', {
      staticClass: 'list__group',
      'class': this.groupClasses
    }, [this.genGroup(), h(__WEBPACK_IMPORTED_MODULE_4__transitions__["a" /* VExpandTransition */], [this.genItems()])]);
  }
});

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_routable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_ripple__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mixins




// Directives


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list-tile',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_3__directives_ripple__["a" /* default */]
  },

  inheritAttrs: false,

  data: function data() {
    return {
      proxyClass: 'list__tile--active'
    };
  },

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String
  },

  computed: {
    listClasses: function listClasses() {
      return this.disabled ? 'text--disabled' : this.color ? this.addTextColorClassChecks() : this.defaultColor;
    },
    classes: function classes() {
      return _defineProperty({
        'list__tile': true,
        'list__tile--link': this.isLink && !this.inactive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled,
        'list__tile--active': !this.to && this.isActive
      }, this.activeClass, this.isActive);
    },
    isLink: function isLink() {
      return this.href || this.to || this.$listeners && (this.$listeners.click || this.$listeners['!click']);
    }
  },

  render: function render(h) {
    var isRouteLink = !this.inactive && this.isLink;

    var _ref2 = isRouteLink ? this.generateRouteLink() : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    },
        tag = _ref2.tag,
        data = _ref2.data;

    data.attrs = Object.assign({}, data.attrs, this.$attrs);

    return h('li', {
      'class': this.listClasses,
      attrs: {
        disabled: this.disabled
      },
      on: _extends({}, this.$listeners)
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  name: 'v-list-tile-action',

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'list__tile__action ' + data.staticClass : 'list__tile__action';
    if ((children || []).length > 1) data.staticClass += ' list__tile__action--stack';

    return h('div', data, children);
  }
});

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAvatar__ = __webpack_require__(32);
// Components


/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  name: 'v-list-tile-avatar',

  props: {
    color: String,
    size: {
      type: [Number, String],
      default: 40
    }
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;

    data.staticClass = ('list__tile__avatar ' + (data.staticClass || '')).trim();

    var avatar = h(__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */], {
      props: {
        color: props.color,
        size: props.size
      }
    }, [children]);

    return h('div', data, [avatar]);
  }
});

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_menus_styl__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_menus_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_menus_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_delayable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_dependent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_detachable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_menuable_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_returnable__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_menu_activator__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_menu_generators__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_menu_keyable__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mixins_menu_position__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_click_outside__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__directives_resize__ = __webpack_require__(11);


// Mixins







// Component level mixins





// Directives



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-menu',

  mixins: [__WEBPACK_IMPORTED_MODULE_7__mixins_menu_activator__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_delayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_menu_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__mixins_menu_keyable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_menuable_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__mixins_menu_position__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_returnable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_11__directives_click_outside__["a" /* default */],
    Resize: __WEBPACK_IMPORTED_MODULE_12__directives_resize__["a" /* default */]
  },

  data: function data() {
    return {
      defaultOffset: 8,
      maxHeightAutoDefault: '200px',
      startIndex: 3,
      stopIndex: 0,
      hasJustFocused: false,
      resizeTimeout: null
    };
  },


  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    fullWidth: Boolean,
    maxHeight: { default: 'auto' },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'menu-transition'
    }
  },

  computed: {
    calculatedLeft: function calculatedLeft() {
      if (!this.auto) return this.calcLeft();

      return this.calcXOverflow(this.calcLeftAuto()) + 'px';
    },
    calculatedMaxHeight: function calculatedMaxHeight() {
      return this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px';
    },
    calculatedMaxWidth: function calculatedMaxWidth() {
      return isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px';
    },
    calculatedMinWidth: function calculatedMinWidth() {
      if (this.minWidth) {
        return isNaN(this.minWidth) ? this.minWidth : this.minWidth + 'px';
      }

      var minWidth = this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);

      var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);

      return Math.min(calculatedMaxWidth, minWidth) + 'px';
    },
    calculatedTop: function calculatedTop() {
      if (!this.auto || this.isAttached) return this.calcTop();

      return this.calcYOverflow(this.calcTopAuto()) + 'px';
    },
    styles: function styles() {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      };
    }
  },

  watch: {
    activator: function activator(newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator);
      this.addActivatorEvents(newActivator);
    },
    isContentActive: function isContentActive(val) {
      this.hasJustFocused = val;
    }
  },

  methods: {
    activate: function activate() {
      // This exists primarily for v-select
      // helps determine which tiles to activate
      this.getTiles();
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions();
      // Start the transition
      requestAnimationFrame(this.startTransition);
      // Once transitioning, calculate scroll position
      setTimeout(this.calculateScroll, 50);
    },
    closeConditional: function closeConditional() {
      return this.isActive && this.closeOnClick;
    },
    onResize: function onResize() {
      if (!this.isActive) return;

      // Account for screen resize
      // and orientation change
      // eslint-disable-next-line no-unused-expressions
      this.$refs.content.offsetWidth;
      this.updateDimensions();

      // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateDimensions, 100);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'menu',
      class: {
        'menu--disabled': this.disabled
      },
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      },
      directives: [{
        arg: 500,
        name: 'resize',
        value: this.onResize
      }],
      on: {
        keydown: this.changeListIndex
      }
    };

    return h('div', data, [this.genActivator(), this.genTransition()]);
  }
});

/***/ }),
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    activatorClickHandler: function activatorClickHandler(e) {
      if (this.disabled) return;
      if (this.openOnClick && !this.isActive) {
        this.getActivator().focus();
        this.isActive = true;
        this.absoluteX = e.clientX;
        this.absoluteY = e.clientY;
      } else if (this.closeOnClick && this.isActive) {
        this.getActivator().blur();
        this.isActive = false;
      }
    },
    mouseEnterHandler: function mouseEnterHandler(e) {
      var _this = this;

      this.runDelay('open', function () {
        if (_this.hasJustFocused) return;

        _this.hasJustFocused = true;
        _this.isActive = true;
      });
    },
    mouseLeaveHandler: function mouseLeaveHandler(e) {
      var _this2 = this;

      // Prevent accidental re-activation
      this.runDelay('close', function () {
        if (_this2.$refs.content.contains(e.relatedTarget)) return;

        requestAnimationFrame(function () {
          _this2.isActive = false;
          _this2.callDeactivate();
        });
      });
    },
    addActivatorEvents: function addActivatorEvents() {
      var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!activator) return;
      activator.addEventListener('click', this.activatorClickHandler);
    },
    removeActivatorEvents: function removeActivatorEvents() {
      var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!activator) return;
      activator.removeEventListener('click', this.activatorClickHandler);
    }
  }
});

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Menu generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VMenu
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genActivator: function genActivator() {
      if (!this.$slots.activator) return null;

      var options = {
        staticClass: 'menu__activator',
        'class': {
          'menu__activator--active': this.hasJustFocused || this.isActive
        },
        ref: 'activator',
        on: {}
      };

      if (this.openOnHover) {
        options.on['mouseenter'] = this.mouseEnterHandler;
        options.on['mouseleave'] = this.mouseLeaveHandler;
      } else if (this.openOnClick) {
        options.on['click'] = this.activatorClickHandler;
      }

      return this.$createElement('div', options, this.$slots.activator);
    },
    genTransition: function genTransition() {
      if (!this.transition) return this.genContent();

      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, [this.genContent()]);
    },
    genDirectives: function genDirectives() {
      var _this = this;

      // Do not add click outside for hover menu
      var directives = !this.openOnHover ? [{
        name: 'click-outside',
        value: function value() {
          return _this.isActive = false;
        },
        args: {
          closeConditional: this.closeConditional,
          include: function include() {
            return [_this.$el].concat(_toConsumableArray(_this.getOpenDependentElements()));
          }
        }
      }] : [];

      directives.push({
        name: 'show',
        value: this.isContentActive
      });

      return directives;
    },
    genContent: function genContent() {
      var _class,
          _this2 = this;

      var options = {
        staticClass: 'menu__content',
        'class': (_class = {}, _defineProperty(_class, this.contentClass.trim(), true), _defineProperty(_class, 'menuable__content__active', this.isActive), _defineProperty(_class, 'theme--dark', this.dark), _defineProperty(_class, 'theme--light', this.light), _class),
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: function click(e) {
            e.stopPropagation();
            if (e.target.getAttribute('disabled')) return;
            if (_this2.closeOnContentClick) _this2.isActive = false;
          }
        }
      };

      !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
      this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);

      return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
    }
  }
});

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      listIndex: -1,
      tiles: []
    };
  },

  watch: {
    isActive: function isActive(val) {
      if (!val) this.listIndex = -1;
    },
    listIndex: function listIndex(next, prev) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles();

      if (next in this.tiles) {
        var tile = this.tiles[next];
        tile.classList.add('list__tile--highlighted');
        this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight;
      }

      prev in this.tiles && this.tiles[prev].classList.remove('list__tile--highlighted');
    }
  },

  methods: {
    changeListIndex: function changeListIndex(e) {
      // Up, Down, Enter, Space
      if ([40, 38, 13].includes(e.keyCode) || e.keyCode === 32 && !this.isActive) {
        e.preventDefault();
      }

      // Esc, Tab
      if ([27, 9].includes(e.keyCode)) return this.isActive = false;else if (!this.isActive &&
      // Enter, Space
      [13, 32].includes(e.keyCode) && this.openOnClick) {
        return this.isActive = true;
      }

      // Down
      if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) {
        this.listIndex++;
        // Up
      } else if (e.keyCode === 38 && this.listIndex > 0) {
        this.listIndex--;
        // Enter
      } else if (e.keyCode === 13 && this.listIndex !== -1) {
        this.tiles[this.listIndex].click();
      }
    },
    getTiles: function getTiles() {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile');
    }
  }
});

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    // Revisit this
    calculateScroll: function calculateScroll() {
      if (this.selectedIndex === null) return;

      var scrollTop = 0;

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight;
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = this.selectedIndex * (this.defaultOffset * 6) - this.defaultOffset * 7;
      }

      this.$refs.content.scrollTop = scrollTop;
    },
    calcLeftAuto: function calcLeftAuto() {
      if (this.isAttached) return 0;

      return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
    },
    calcTopAuto: function calcTopAuto() {
      var selectedIndex = Array.from(this.tiles).findIndex(function (n) {
        return n.classList.contains('list__tile--active');
      });

      if (selectedIndex === -1) {
        this.selectedIndex = null;

        return this.computedTop;
      }

      this.selectedIndex = selectedIndex;
      var actingIndex = selectedIndex;

      var offsetPadding = -(this.defaultOffset * 2);
      // #708 Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2;
        offsetPadding = this.defaultOffset * 3;
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -this.defaultOffset;
        actingIndex = selectedIndex - this.stopIndex;
      }

      // Is always off by 1 pixel, send help (┛ಠ_ಠ)┛彡┻━┻
      offsetPadding--;

      return this.computedTop + offsetPadding - actingIndex * (this.defaultOffset * 6);
    }
  }
});

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultDelimiters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isMaskDelimiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return maskText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return unmaskText; });
/**
 * Default delimiter RegExp
 *
 * @type {RegExp}
 */
var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;

/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */
var isMaskDelimiter = function isMaskDelimiter(char) {
  return char && defaultDelimiters.test(char);
};

/**
 * Mask keys
 *
 * @type {Object}
 */
var allowedMasks = {
  '#': {
    test: function test(char) {
      return char.match(/[0-9]/);
    }
  },
  'A': {
    test: function test(char) {
      return char.match(/[A-Z]/i);
    },
    convert: function convert(char) {
      return char.toUpperCase();
    }
  },
  'a': {
    test: function test(char) {
      return char.match(/[a-z]/i);
    },
    convert: function convert(char) {
      return char.toLowerCase();
    }
  },
  'N': {
    test: function test(char) {
      return char.match(/[0-9A-Z]/i);
    },
    convert: function convert(char) {
      return char.toUpperCase();
    }
  },
  'n': {
    test: function test(char) {
      return char.match(/[0-9a-z]/i);
    },
    convert: function convert(char) {
      return char.toLowerCase();
    }
  },
  'X': {
    test: isMaskDelimiter
  }

  /**
   * Is Character mask
   *
   * @param  {String} char
   *
   * @return {Boolean}
   */
};var isMask = function isMask(char) {
  return allowedMasks.hasOwnProperty(char);
};

/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {String}
 */
var convert = function convert(mask, char) {
  return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char;
};

/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */
var maskValidates = function maskValidates(mask, char) {
  if (char == null || !isMask(mask)) return false;
  return allowedMasks[mask].test(char);
};

/**
 * Mask Text
 *
 * Takes a string or an array of characters
 * and returns a masked string
 *
 * @param {*} text
 * @param {Array|String} masked
 * @param {Boolean} [dontFillMaskBlanks]
 *
 * @return {String}
 */
var maskText = function maskText(text, masked, dontFillMaskBlanks) {
  if (text == null) return '';
  text = String(text);
  if (!masked.length || !text.length) return text;
  if (!Array.isArray(masked)) masked = masked.split('');

  var textIndex = 0;
  var maskIndex = 0;
  var newText = '';

  while (maskIndex < masked.length) {
    var mask = masked[maskIndex];

    // Assign the next character
    var char = text[textIndex];

    // Check if mask is delimiter
    // and current char matches
    if (!isMask(mask) && char === mask) {
      newText += mask;
      textIndex++;
      // Check if not mask
    } else if (!isMask(mask) && !dontFillMaskBlanks) {
      newText += mask;
      // Check if is mask and validates
    } else if (maskValidates(mask, char)) {
      newText += convert(mask, char);
      textIndex++;
    } else {
      return newText;
    }

    maskIndex++;
  }

  return newText;
};

/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */
var unmaskText = function unmaskText(text) {
  return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text;
};

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);


/**
 * Select autocomplete
 *
 * @mixin
 *
 * Handles logic when using the "autocomplete" prop
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    filter: {
      type: Function,
      default: function _default(item, queryText, itemText) {
        var hasValue = function hasValue(val) {
          return val != null ? val : '';
        };

        var text = hasValue(itemText);
        var query = hasValue(queryText);

        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
      }
    }
  },

  methods: {
    filterSearch: function filterSearch() {
      var _this = this;

      if (!this.isAutocomplete) return this.computedItems;

      return this.computedItems.filter(function (i) {
        return _this.filter(i, _this.searchValue, _this.getText(i));
      });
    },
    genFiltered: function genFiltered(text) {
      text = (text || '').toString();

      if (!this.isAutocomplete || !this.searchValue || this.filteredItems.length < 1) return Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* escapeHTML */])(text);

      var _getMaskedCharacters = this.getMaskedCharacters(text),
          start = _getMaskedCharacters.start,
          middle = _getMaskedCharacters.middle,
          end = _getMaskedCharacters.end;

      return '' + Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* escapeHTML */])(start) + this.genHighlight(middle) + Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* escapeHTML */])(end);
    },
    genHighlight: function genHighlight(text) {
      if (this.isNotFiltering) return Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* escapeHTML */])(text);

      return '<span class="list__tile__mask">' + Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* escapeHTML */])(text) + '</span>';
    },
    getMaskedCharacters: function getMaskedCharacters(text) {
      var searchValue = (this.searchValue || '').toString().toLowerCase();
      var index = text.toLowerCase().indexOf(searchValue);

      if (index < 0) return { start: '', middle: text, end: '' };

      var start = text.slice(0, index);
      var middle = text.slice(index, index + searchValue.length);
      var end = text.slice(index + searchValue.length);
      return { start: start, middle: middle, end: end };
    },
    getCurrentTag: function getCurrentTag() {
      return this.isMenuItemSelected() ? this.filteredItems[this.getMenuIndex()] : this.isAnyValueAllowed ? this.searchValue : null;
    },
    tabOut: function tabOut() {
      this.blur();
    },
    onTabDown: function onTabDown(e) {
      var _this2 = this;

      // If tabbing through inputs and
      // and there is no need for an
      // update, blur the v-select
      if (!this.isAutocomplete || !this.getCurrentTag() || this.combobox) return this.tabOut();

      var menuIndex = this.getMenuIndex();

      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.tags && this.searchValue && menuIndex === -1) {
        e.preventDefault();

        return this.updateTags(this.searchValue);
      }

      // An item that is selected by
      // menu-index should toggled
      if (this.menuIsActive) {
        // Reset the list index if searching
        this.searchValue && this.$nextTick(function () {
          return setTimeout(_this2.resetMenuIndex, 0);
        });

        e.preventDefault();
        this.selectListTile(menuIndex);
      }
    },
    onEnterDown: function onEnterDown() {
      this.updateTags(this.getCurrentTag());
    },
    onEscDown: function onEscDown(e) {
      e.preventDefault();
      this.menuIsActive = false;
    },
    onKeyDown: function onKeyDown(e) {
      var _this3 = this;

      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        e.preventDefault();
        return this.showMenu();
      }

      // If escape deactivate the menu
      if (e.keyCode === 27) return this.onEscDown(e);

      // If tab - select item or close menu
      if (e.keyCode === 9) return this.onTabDown(e);

      if (!this.isAutocomplete || ![32].includes(e.keyCode) // space
      ) this.$refs.menu.changeListIndex(e);

      // Up or down
      if ([38, 40].includes(e.keyCode)) this.selectedIndex = -1;

      if (this.isAutocomplete && !this.hideSelections && !this.searchValue) this.changeSelectedIndex(e.keyCode);

      if (!this.isAnyValueAllowed || !this.searchValue) return;

      // Enter
      if (e.keyCode === 13) return this.onEnterDown();

      // Left arrow
      if (e.keyCode === 37 && this.$refs.input.selectionStart === 0 && this.selectedItems.length) {
        this.updateTags(this.searchValue);
        this.$nextTick(function () {
          _this3.selectedIndex = Math.max(_this3.selectedItems.length - 2, 0);
        });
      }

      // Right arrow
      if (e.keyCode === 39 && this.$refs.input.selectionEnd === this.searchValue.length) {
        this.resetMenuIndex();
      }
    },
    selectListTile: function selectListTile(index) {
      if (!this.$refs.menu.tiles[index]) return;

      this.$refs.menu.tiles[index].click();
    },
    updateTags: function updateTags(content) {
      var _this4 = this;

      // Avoid direct mutation
      // for vuex strict mode
      var selectedItems = this.selectedItems.slice();

      // If a duplicate item
      // exists, remove it
      if (selectedItems.includes(content)) {
        this.$delete(selectedItems, selectedItems.indexOf(content));
      }

      // When updating tags ensure
      // that that the search text
      // is populated if needed
      var searchValue = null;
      if (this.combobox) {
        selectedItems = [content];
        searchValue = this.chips ? null : content;
      } else {
        selectedItems.push(content);
      }

      this.selectedItems = selectedItems;

      this.$nextTick(function () {
        _this4.searchValue = searchValue;
        _this4.$emit('input', _this4.combobox ? content : _this4.selectedItems);
      });
    }
  }
});

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Select computed properties
 *
 * @mixin
 *
 * Computed properties for
 * the v-select component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    classes: function classes() {
      var classes = _extends({}, this.genSoloClasses(), {
        'input-group--text-field input-group--select': true,
        'input-group--auto': this.auto,
        'input-group--overflow': this.overflow,
        'input-group--segmented': this.segmented,
        'input-group--editable': this.editable,
        'input-group--autocomplete': this.isAutocomplete,
        'input-group--single-line': this.singleLine || this.isDropdown,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple,
        'input-group--open': this.menuIsVisible,
        'input-group--select--selecting-index': this.selectedIndex > -1
      });

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    computedContentClass: function computedContentClass() {
      var children = ['menu__content--select', this.auto ? 'menu__content--auto' : '', this.isDropdown ? 'menu__content--dropdown' : '', this.isAutocomplete ? 'menu__content--autocomplete' : '', this.contentClass || ''];

      return children.join(' ');
    },
    computedItems: function computedItems() {
      return this.filterDuplicates(this.cachedItems.concat(this.items));
    },

    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange: function currentRange() {
      if (this.selectedItem == null) return 0;

      return this.getText(this.selectedItem).toString().length;
    },
    filteredItems: function filteredItems() {
      // If we are not actively filtering
      // Show all available items
      var items = this.isNotFiltering ? this.computedItems : this.filterSearch();

      return !this.auto ? items.slice(0, this.lastItem) : items;
    },
    hideSelections: function hideSelections() {
      return this.isAutocomplete && !this.isMultiple && this.isFocused && !this.chips && !this.$scopedSlots.selection;
    },
    isNotFiltering: function isNotFiltering() {
      return this.isAutocomplete && this.isDirty && this.searchValue === this.getText(this.selectedItem);
    },
    isHidingSelected: function isHidingSelected() {
      return this.hideSelected && this.isAutocomplete && this.isMultiple;
    },
    isAutocomplete: function isAutocomplete() {
      return this.autocomplete || this.editable || this.tags || this.combobox;
    },
    isDirty: function isDirty() {
      return this.selectedItems.length > 0 || this.isAutocomplete && this.searchValue;
    },
    isDropdown: function isDropdown() {
      return this.segmented || this.overflow || this.editable || this.isSolo;
    },
    isMultiple: function isMultiple() {
      return this.multiple || this.tags;
    },
    isAnyValueAllowed: function isAnyValueAllowed() {
      return this.tags || this.combobox;
    },
    menuIsVisible: function menuIsVisible() {
      return this.menuIsActive && this.computedItems.length > 0 && (!this.isAnyValueAllowed || this.filteredItems.length > 0);
    },
    menuItems: function menuItems() {
      var _this = this;

      return this.isHidingSelected ? this.filteredItems.filter(function (o) {
        return (_this.selectedItems || []).indexOf(o) === -1;
      }) : this.filteredItems;
    },
    nudgeTop: function nudgeTop() {
      var nudgeTop = -18;

      if (this.isSolo) nudgeTop = 0;else if (this.shouldOffset) {
        nudgeTop += 44;

        nudgeTop += this.hideDetails ? -24 : 0;
        nudgeTop += this.isAutocomplete && !this.isDropdown ? -2 : 0;
      }

      return nudgeTop;
    },

    searchValue: {
      get: function get() {
        return this.lazySearch;
      },
      set: function set(val) {
        if (!this.isAutocomplete || !this.multiple && this.selectedIndex > -1) return;

        this.lazySearch = val;

        this.$emit('update:searchInput', val);
      }
    },
    selectedItem: function selectedItem() {
      var _this2 = this;

      if (this.isMultiple) return null;

      return this.selectedItems.find(function (i) {
        return _this2.getValue(i) === _this2.getValue(_this2.inputValue);
      });
    },
    shouldOffset: function shouldOffset() {
      return this.isAutocomplete || this.isDropdown;
    }
  }
});

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Select events
 *
 * @mixin
 *
 * Event based methods for
 * the v-select component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    blur: function blur() {
      this.deactivateInput();
      this.menuIsActive = false;
      this.$emit('blur');
    },
    focus: function focus() {
      this.showMenu();

      this.$emit('focus');
    },
    focusInput: function focusInput() {
      var _this = this;

      if (this.$refs.input && this.isAutocomplete) {
        this.$refs.input.focus();

        this.$nextTick(function () {
          _this.$refs.input.select();
          _this.shouldBreak && (_this.$refs.input.scrollLeft = _this.$refs.input.scrollWidth);
        });
      } else {
        !this.isFocused && this.$el.focus();
      }
    },
    genListeners: function genListeners() {
      var _this2 = this;

      var listeners = Object.assign({}, this.$listeners);
      delete listeners.input;

      return _extends({}, listeners, {
        click: function click() {
          if (_this2.disabled || _this2.readonly) return;

          if (_this2.isFocused && !_this2.menuIsVisible) {
            return _this2.showMenuItems();
          }

          _this2.selectedIndex > -1 ? _this2.selectedIndex = -1 : _this2.focus();
        },
        focus: function focus(e) {
          if (_this2.disabled || _this2.readonly || _this2.isFocused) {
            return;
          }

          _this2.activateInput();
          _this2.$nextTick(_this2.focusInput);
        },
        keydown: this.onKeyDown // Located in mixins/select-autocomplete.js
      });
    }
  }
});

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_console__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }




/**
 * Select generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VSelect
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genMenu: function genMenu() {
      var _this = this;

      var data = {
        ref: 'menu',
        props: {
          activator: this.$el,
          auto: this.auto,
          attach: this.attach && '[data-uid="' + this._uid + '"]',
          closeOnClick: false,
          closeOnContentClick: !this.isMultiple,
          contentClass: this.computedContentClass,
          dark: this.dark,
          disabled: this.disabled,
          light: this.light,
          maxHeight: this.maxHeight,
          nudgeTop: this.nudgeTop,
          offsetY: this.shouldOffset,
          offsetOverflow: this.isAutocomplete,
          openOnClick: false,
          value: this.menuIsVisible,
          zIndex: this.menuZIndex
        },
        on: {
          input: function input(val) {
            if (!val) {
              _this.menuIsActive = false;
            }
          }
        }
      };

      if (this.isAutocomplete) data.props.transition = '';

      this.minWidth && (data.props.minWidth = this.minWidth);

      return this.$createElement('v-menu', data, [this.genList()]);
    },
    getMenuIndex: function getMenuIndex() {
      return this.$refs.menu ? this.$refs.menu.listIndex : -1;
    },
    setMenuIndex: function setMenuIndex(index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index);
    },
    resetMenuIndex: function resetMenuIndex() {
      this.setMenuIndex(-1);
    },
    isMenuItemSelected: function isMenuItemSelected() {
      return this.menuIsActive && this.menuItems.length && this.getMenuIndex() > -1;
    },
    genSelectionsAndSearch: function genSelectionsAndSearch() {
      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [].concat(_toConsumableArray(this.genSelections()), [this.genSearch()]));
    },
    genSelections: function genSelections() {
      if (this.hideSelections) return [];

      var length = this.selectedItems.length;
      var children = new Array(length);

      var genSelection = void 0;
      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection;
      } else if (this.chips) {
        genSelection = this.genChipSelection;
      } else if (this.segmented) {
        genSelection = this.genSegmentedBtn;
      } else {
        genSelection = this.genCommaSelection;
      }

      while (length--) {
        children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
      }

      return children;
    },
    genSearch: function genSearch() {
      var _this2 = this;

      var data = {
        staticClass: 'input-group--select__autocomplete',
        'class': {
          'input-group--select__autocomplete--index': this.selectedIndex > -1
        },
        style: {
          flex: this.shouldBreak ? '1 0 100%' : null
        },
        attrs: _extends({}, this.$attrs, {
          disabled: this.disabled || !this.isAutocomplete,
          readonly: this.readonly,
          tabindex: this.disabled || !this.isAutocomplete ? -1 : this.tabindex
        }),
        domProps: {
          value: this.maskText(this.lazySearch || '')
        },
        directives: [{
          name: 'show',
          value: this.isAutocomplete || this.placeholder && !this.selectedItems.length
        }],
        ref: 'input',
        key: 'input'
      };

      if (this.isAutocomplete) {
        data.attrs.role = 'combobox';
        data.domProps.autocomplete = this.browserAutocomplete;

        data.on = _extends({}, this.genListeners(), {
          input: function input(e) {
            if (_this2.selectedIndex > -1) return;

            _this2.searchValue = _this2.unmaskText(e.target.value);
          }
        });

        data.directives = data.directives.concat(this.genDirectives());
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder;

      return this.$createElement('input', data);
    },
    genSegmentedBtn: function genSegmentedBtn(item) {
      if (!item.text || !item.callback) {
        Object(__WEBPACK_IMPORTED_MODULE_1__util_console__["b" /* consoleWarn */])('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this);
        return null;
      }

      return this.$createElement('v-btn', {
        props: {
          flat: true
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            item.callback(e);
          }
        }
      }, [item.text]);
    },
    genSlotSelection: function genSlotSelection(item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item: item,
        index: index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      });
    },
    genChipSelection: function genChipSelection(item, index) {
      var _this3 = this;

      var isDisabled = this.disabled || this.readonly;
      var click = function click(e) {
        if (isDisabled) return;

        e.stopPropagation();
        _this3.focusInput();
        _this3.selectedIndex = index;
      };

      return this.$createElement('v-chip', {
        staticClass: 'chip--select-multi',
        attrs: { tabindex: '-1' },
        props: {
          close: this.deletableChips && !isDisabled,
          dark: this.dark,
          disabled: isDisabled,
          selected: index === this.selectedIndex
        },
        on: {
          click: click,
          focus: click,
          input: function input() {
            if (_this3.isMultiple) _this3.selectItem(item);else _this3.inputValue = null;
          }
        },
        key: this.getValue(item)
      }, this.getText(item));
    },
    genCommaSelection: function genCommaSelection(item, index, last) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma--active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, '' + this.getText(item) + (last ? '' : ', '));
    },
    genList: function genList() {
      var _this4 = this;

      var children = this.menuItems.map(function (o) {
        if (o.header) return _this4.genHeader(o);
        if (o.divider) return _this4.genDivider(o);else return _this4.genTile(o);
      });

      if (!children.length) {
        var noData = this.$slots['no-data'];
        if (noData) {
          children.push(noData);
        } else {
          children.push(this.genTile(this.noDataText, true));
        }
      }

      return this.$createElement('v-card', [this.$createElement('v-list', {
        props: {
          dense: this.dense
        },
        ref: 'list'
      }, children)]);
    },
    genHeader: function genHeader(item) {
      return this.$createElement('v-subheader', {
        props: item
      }, item.header);
    },
    genDivider: function genDivider(item) {
      return this.$createElement('v-divider', {
        props: item
      });
    },
    genLabel: function genLabel() {
      var singleLine = this.singleLine || this.isDropdown;

      if (singleLine && (this.isDirty || this.isFocused && this.searchValue)) return null;

      var data = {};

      if (this.id) data.attrs = { for: this.id };

      return this.$createElement('label', data, this.$slots.label || this.label);
    },
    genTile: function genTile(item, disabled) {
      var _this5 = this;

      var active = this.selectedItems.indexOf(item) !== -1;

      if (typeof disabled === 'undefined') {
        disabled = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["h" /* getObjectValueByPath */])(item, this.itemDisabled);
      }

      var data = {
        on: {
          click: function click(e) {
            if (disabled) return;

            _this5.selectItem(item);
          }
        },
        props: {
          avatar: item === Object(item) && this.itemAvatar in item,
          ripple: true,
          value: active
        }
      };

      if (disabled) {
        data.props.disabled = disabled;
      }

      data.props.activeClass = Object.keys(this.addTextColorClassChecks()).join(' ');

      if (this.$scopedSlots.item) {
        var tile = this.$scopedSlots.item({ parent: this, item: item, tile: data });
        return this.needsTile(tile) ? this.$createElement('v-list-tile', data, [tile]) : tile;
      }

      return this.$createElement('v-list-tile', data, [this.genAction(item, active), this.genContent(item)]);
    },
    genAction: function genAction(item, active) {
      var _this6 = this;

      if (!this.isMultiple || this.isHidingSelected) return null;

      var data = {
        staticClass: 'list__tile__action--select-multi',
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this6.selectItem(item);
          }
        }
      };

      return this.$createElement('v-list-tile-action', data, [this.$createElement('v-checkbox', {
        props: {
          color: this.computedColor,
          inputValue: active
        }
      })]);
    },
    genContent: function genContent(item) {
      var text = this.getText(item);

      return this.$createElement('v-list-tile-content', [this.$createElement('v-list-tile-title', {
        domProps: {
          innerHTML: this.genFiltered(text)
        }
      })]);
    }
  }
});

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
// Helpers


/**
 * Select helpers
 *
 * @mixin
 *
 * Helper methods for the
 * v-select component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    getText: function getText(item) {
      return this.getPropertyFromItem(item, this.itemText);
    },
    getValue: function getValue(item) {
      return this.getPropertyFromItem(item, this.itemValue);
    },
    getPropertyFromItem: function getPropertyFromItem(item, field) {
      if (item !== Object(item)) return item;

      var value = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["h" /* getObjectValueByPath */])(item, field);

      return typeof value === 'undefined' ? item : value;
    }
  }
});

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Select menu methods
 *
 * @mixin
 *
 * Menu based methods for
 * the v-select component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    activateInput: function activateInput() {
      this.isActive = true;
      this.isFocused = true;
    },
    deactivateInput: function deactivateInput() {
      this.isFocused = false;
      this.isActive = false;
      this.selectedIndex = -1;
    },
    hideMenu: function hideMenu() {
      this.menuIsActive = false;
    },
    showMenu: function showMenu() {
      this.activateInput();
      this.showMenuItems();
      this.isMultiple && this.resetMenuIndex();
    },
    showMenuItems: function showMenuItems() {
      this.menuIsActive = true;
    },
    toggleMenu: function toggleMenu() {
      if (this.disabled || this.readonly || this.menuIsVisible) return this.hideMenu();

      this.showMenu();
      this.focusInput();
    }
  }
});

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    appendIconCb: Function,
    attach: Boolean,
    auto: Boolean,
    autocomplete: Boolean,
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    combobox: Boolean,
    contentClass: String,
    deletableChips: Boolean,
    dense: Boolean,
    editable: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    itemAvatar: {
      type: String,
      default: 'avatar'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    openOnClear: Boolean,
    overflow: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    segmented: Boolean,
    singleLine: Boolean,
    tags: Boolean,
    valueComparator: {
      type: Function,
      default: function _default(a, b) {
        if (a !== Object(a)) return a === b;
        var aProps = Object.keys(a);
        var bProps = Object.keys(b);
        return aProps.length === bProps.length && aProps.every(function (propName) {
          return a[propName] === b[propName];
        });
      }
    }
  }
});

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Select watchers
 *
 * @mixin
 *
 * Watchers for the
 * v-select component
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  watch: {
    filteredItems: function filteredItems() {
      this.$refs.menu && this.$refs.menu.updateDimensions();
    },
    inputValue: function inputValue(val) {
      // Search for an existing item when a
      // value was selected from the menu
      if (this.combobox && this.isNotFiltering) {
        val = this.findExistingItem(val);
      }

      // Populate selected items
      this.genSelectedItems(val);

      // Only fire an update
      // if values do not
      // match
      val !== this.value && this.$emit('input', val);

      // When inputValue is changed
      // and combobox is true set
      // menu property to false
      if (this.combobox) this.menuIsActive = false;
    },
    isActive: function isActive(val) {
      if (val) {
        if (!this.chips && !this.$scopedSlots.selection) {
          this.searchValue = this.getText(this.selectedItem);
        }
        return;
      }

      this.blur();

      if (this.tags && this.searchValue) {
        this.updateTags(this.searchValue);
      }

      if (this.combobox && this.lazySearch && !this.isNotFiltering) {
        this.inputValue = this.lazySearch;
      }

      // Only set search value if
      // there is a value to set
      this.searchValue && (this.searchValue = null);
    },
    isBooted: function isBooted() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.content && _this.content.addEventListener) {
          _this.content.addEventListener('scroll', _this.onScroll, false);
        }
      });
    },
    items: function items(val) {
      var _this2 = this;

      if (this.cacheItems) {
        this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
      }

      this.resetMenuIndex();

      // Tags and combobox should not
      // pre-select the first entry
      if (this.searchValue && !this.isAnyValueAllowed) {
        this.$nextTick(function () {
          return _this2.setMenuIndex(0);
        });
      }

      this.genSelectedItems();
    },
    menuIsActive: function menuIsActive(val) {
      if (!val) return;

      this.isBooted = true;
    },
    isMultiple: function isMultiple(val) {
      this.inputValue = val ? [] : null;
    },
    searchInput: function searchInput(val) {
      this.searchValue = val;
    },
    searchValue: function searchValue(val, prev) {
      var _this3 = this;

      // Wrap input to next line if overflowing
      if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
        this.shouldBreak = true;
        this.$nextTick(this.$refs.menu.updateDimensions);
      } else if (val === null) {
        this.shouldBreak = false;
      }

      // Activate menu if inactive and searching
      if (this.isActive && !this.menuIsActive && val !== this.getText(this.selectedItem)) {
        this.menuIsActive = true;
      }

      // Only reset list index
      // if typing in search
      !val && prev && this.resetMenuIndex();

      this.$nextTick(function () {
        if (val && !_this3.isAnyValueAllowed) {
          _this3.setMenuIndex(0);
        }
        if (val !== null && _this3.selectedIndex > -1) {
          _this3.selectedIndex = -1;
        }
      });
    },
    selectedItems: function selectedItems() {
      if (this.isAutocomplete) {
        this.$nextTick(this.$refs.menu.updateDimensions);
      }
    },
    value: function value(val) {
      this.inputValue = val;
      this.validate();
    }
  }
});

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VTableOverflow */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VDataTable__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VEditDialog__ = __webpack_require__(166);
/* unused harmony reexport VDataTable */
/* unused harmony reexport VEditDialog */





var VTableOverflow = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('table__overflow');



/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a" /* default */]);
  Vue.component(VTableOverflow.name, VTableOverflow);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */]);

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tables_styl__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tables_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_tables_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_data_table_styl__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_data_table_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_data_table_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_data_iterable__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VProgressLinear__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_head__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_body__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_foot__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_progress__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_helpers__ = __webpack_require__(2);














/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-data-table',

  components: {
    VProgressLinear: __WEBPACK_IMPORTED_MODULE_3__VProgressLinear__["a" /* default */],
    // Importing does not work properly
    'v-table-overflow': Object(__WEBPACK_IMPORTED_MODULE_8__util_helpers__["d" /* createSimpleFunctional */])('table__overflow')
  },

  data: function data() {
    return {
      actionsClasses: 'datatable__actions',
      actionsRangeControlsClasses: 'datatable__actions__range-controls',
      actionsSelectClasses: 'datatable__actions__select',
      actionsPaginationClasses: 'datatable__actions__pagination'
    };
  },


  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_data_iterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_head__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_foot__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_progress__["a" /* default */]],

  props: {
    headers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideHeaders: Boolean,
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    customFilter: {
      type: Function,
      default: function _default(items, search, filter, headers) {
        search = search.toString().toLowerCase();
        if (search.trim() === '') return items;

        var props = headers.map(function (h) {
          return h.value;
        });

        return items.filter(function (item) {
          return props.some(function (prop) {
            return filter(Object(__WEBPACK_IMPORTED_MODULE_8__util_helpers__["h" /* getObjectValueByPath */])(item, prop), search);
          });
        });
      }
    }
  },

  computed: {
    classes: function classes() {
      return {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    filteredItems: function filteredItems() {
      return this.filteredItemsImpl(this.headers);
    },
    headerColumns: function headerColumns() {
      return this.headers.length + (this.selectAll !== false);
    }
  },

  methods: {
    hasTag: function hasTag(elements, tag) {
      return Array.isArray(elements) && elements.find(function (e) {
        return e.tag === tag;
      });
    },
    genTR: function genTR(children) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.$createElement('tr', data, children);
    }
  },

  created: function created() {
    var firstSortable = this.headers.find(function (h) {
      return !('sortable' in h) || h.sortable;
    });

    this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable ? firstSortable.value : null;

    this.initPagination();
  },
  render: function render(h) {
    var tableOverflow = h('v-table-overflow', {}, [h('table', {
      'class': this.classes
    }, [this.genTHead(), this.genTBody(), this.genTFoot()])]);

    return h('div', [tableOverflow, this.genActionsFooter()]);
  }
});

/***/ }),
/* 158 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 159 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_linear_styl__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_linear_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_linear_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transitions__ = __webpack_require__(7);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-progress-linear',

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_2__transitions__["b" /* VFadeTransition */],
    VSlideXTransition: __WEBPACK_IMPORTED_MODULE_2__transitions__["d" /* VSlideXTransition */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */]],

  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 7
    },
    indeterminate: Boolean,
    query: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    styles: function styles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (!this.indeterminate && parseInt(this.bufferValue, 10) !== 100) {
        styles.width = this.bufferValue + '%';
      }

      return styles;
    },
    effectiveWidth: function effectiveWidth() {
      if (!this.bufferValue) {
        return 0;
      }

      return this.value * 100 / this.bufferValue;
    },
    backgroundStyle: function backgroundStyle() {
      var backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);

      return {
        height: this.active ? this.height + 'px' : 0,
        opacity: backgroundOpacity,
        width: this.bufferValue + '%'
      };
    }
  },

  methods: {
    genDeterminate: function genDeterminate(h) {
      return h('div', {
        ref: 'front',
        staticClass: 'progress-linear__bar__determinate',
        class: this.addBackgroundColorClassChecks(),
        style: {
          width: this.effectiveWidth + '%'
        }
      });
    },
    genBar: function genBar(h, name) {
      return h('div', {
        staticClass: 'progress-linear__bar__indeterminate',
        class: this.addBackgroundColorClassChecks(_defineProperty({}, name, true))
      });
    },
    genIndeterminate: function genIndeterminate(h) {
      return h('div', {
        ref: 'front',
        staticClass: 'progress-linear__bar__indeterminate',
        class: {
          'progress-linear__bar__indeterminate--active': this.active
        }
      }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
    }
  },

  render: function render(h) {
    var fade = h('v-fade-transition', [this.indeterminate && this.genIndeterminate(h)]);
    var slide = h('v-slide-x-transition', [!this.indeterminate && this.genDeterminate(h)]);

    var bar = h('div', {
      staticClass: 'progress-linear__bar',
      style: this.styles
    }, [fade, slide]);
    var background = h('div', {
      staticClass: 'progress-linear__background',
      class: [this.backgroundColor || this.color],
      style: this.backgroundStyle
    });

    return h('div', {
      staticClass: 'progress-linear',
      class: {
        'progress-linear--query': this.query
      },
      style: {
        height: this.height + 'px'
      },
      on: this.$listeners
    }, [background, bar]);
  }
});

/***/ }),
/* 161 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_console__ = __webpack_require__(6);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    sortIcon: {
      type: String,
      default: 'arrow_upward'
    }
  },

  methods: {
    genTHead: function genTHead() {
      var _this = this;

      if (this.hideHeaders) return; // Exit Early since no headers are needed.

      var children = [];

      if (this.$scopedSlots.headers) {
        var row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.everyItem
        });

        children = [this.hasTag(row, 'th') ? this.genTR(row) : row, this.genTProgress()];
      } else {
        var _row = this.headers.map(function (o) {
          return _this.genHeader(o);
        });
        var checkbox = this.$createElement('v-checkbox', {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true ? '' : this.selectAll,
            hideDetails: true,
            inputValue: this.everyItem,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        });

        this.hasSelectAll && _row.unshift(this.$createElement('th', [checkbox]));

        children = [this.genTR(_row), this.genTProgress()];
      }

      return this.$createElement('thead', [children]);
    },
    genHeader: function genHeader(header) {
      var array = [this.$scopedSlots.headerCell ? this.$scopedSlots.headerCell({ header: header }) : header[this.headerText]];

      return this.$createElement.apply(this, ['th'].concat(_toConsumableArray(this.genHeaderData(header, array))));
    },
    genHeaderData: function genHeaderData(header, children) {
      var classes = ['column'];
      var data = {
        key: header[this.headerText],
        attrs: {
          role: 'columnheader',
          scope: 'col',
          width: header.width || null,
          'aria-label': header[this.headerText] || '',
          'aria-sort': 'none'
        }
      };

      if (header.sortable == null || header.sortable) {
        this.genHeaderSortingData(header, children, data, classes);
      } else {
        data.attrs['aria-label'] += ': Not sorted.'; // TODO: Localization
      }

      classes.push('text-xs-' + (header.align || 'left'));
      if (Array.isArray(header.class)) {
        classes.push.apply(classes, _toConsumableArray(header.class));
      } else if (header.class) {
        classes.push(header.class);
      }
      data.class = classes;

      return [data, children];
    },
    genHeaderSortingData: function genHeaderSortingData(header, children, data, classes) {
      var _this2 = this;

      if (!('value' in header)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["b" /* consoleWarn */])('Headers must have a value property that corresponds to a value in the v-model array', this);
      }

      data.attrs.tabIndex = 0;
      data.on = {
        click: function click() {
          _this2.expanded = {};
          _this2.sort(header.value);
        },
        keydown: function keydown(e) {
          // check for space
          if (e.keyCode === 32) {
            e.preventDefault();
            _this2.sort(header.value);
          }
        }
      };

      classes.push('sortable');
      var icon = this.$createElement('v-icon', {
        props: {
          small: true
        }
      }, this.sortIcon);
      if (!header.align || header.align === 'left') {
        children.push(icon);
      } else {
        children.unshift(icon);
      }

      var pagination = this.computedPagination;
      var beingSorted = pagination.sortBy === header.value;
      if (beingSorted) {
        classes.push('active');
        if (pagination.descending) {
          classes.push('desc');
          data.attrs['aria-sort'] = 'descending';
          data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.'; // TODO: Localization
        } else {
          classes.push('asc');
          data.attrs['aria-sort'] = 'ascending';
          data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.'; // TODO: Localization
        }
      } else {
        data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.'; // TODO: Localization
      }
    }
  }
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions_expand_transition__ = __webpack_require__(39);


/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTBody: function genTBody() {
      var children = this.genItems();

      return this.$createElement('tbody', children);
    },
    genExpandedRow: function genExpandedRow(props) {
      var children = [];

      if (this.isExpanded(props.item)) {
        var expand = this.$createElement('div', {
          class: 'datatable__expand-content',
          key: props.item[this.itemKey]
        }, this.$scopedSlots.expand(props));

        children.push(expand);
      }

      var transition = this.$createElement('transition-group', {
        class: 'datatable__expand-col',
        attrs: { colspan: this.headerColumns },
        props: {
          tag: 'td'
        },
        on: Object(__WEBPACK_IMPORTED_MODULE_0__transitions_expand_transition__["a" /* default */])('datatable__expand-col--expanded')
      }, children);

      return this.genTR([transition], { class: 'datatable__expand-row' });
    },
    genFilteredItems: function genFilteredItems() {
      if (!this.$scopedSlots.items) {
        return null;
      }

      var rows = [];
      for (var index = 0, len = this.filteredItems.length; index < len; ++index) {
        var item = this.filteredItems[index];
        var props = this.createProps(item, index);
        var row = this.$scopedSlots.items(props);

        rows.push(this.hasTag(row, 'td') ? this.genTR(row, {
          key: index,
          attrs: { active: this.isSelected(item) }
        }) : row);

        if (this.$scopedSlots.expand) {
          var expandRow = this.genExpandedRow(props);
          rows.push(expandRow);
        }
      }

      return rows;
    },
    genEmptyItems: function genEmptyItems(content) {
      if (this.hasTag(content, 'tr')) {
        return content;
      } else if (this.hasTag(content, 'td')) {
        return this.genTR(content);
      } else {
        return this.genTR([this.$createElement('td', {
          class: {
            'text-xs-center': typeof content === 'string'
          },
          attrs: { colspan: this.headerColumns }
        }, content)]);
      }
    }
  }
});

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTFoot: function genTFoot() {
      if (!this.$slots.footer) {
        return null;
      }

      var footer = this.$slots.footer;
      var row = this.hasTag(footer, 'td') ? this.genTR(footer) : footer;

      return this.$createElement('tfoot', [row]);
    },
    genActionsFooter: function genActionsFooter() {
      if (this.hideActions) {
        return null;
      }

      return this.$createElement('div', {
        'class': this.classes
      }, this.genActions());
    }
  }
});

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTProgress: function genTProgress() {
      var col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: this.headerColumns
        }
      }, [this.genProgress()]);

      return this.genTR([col], {
        staticClass: 'datatable__progress'
      });
    }
  }
});

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_small_dialog_styl__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_small_dialog_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_small_dialog_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_returnable__ = __webpack_require__(27);


// Mixins


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-edit-dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_returnable__["a" /* default */]],

  data: function data() {
    return {
      isActive: false,
      isSaving: false
    };
  },


  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    lazy: Boolean,
    persistent: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition'
    }
  },

  watch: {
    isActive: function isActive(val) {
      val && setTimeout(this.focus, 50); // Give DOM time to paint
    }
  },

  methods: {
    cancel: function cancel() {
      this.isActive = false;
    },
    focus: function focus() {
      var input = this.$refs.content.querySelector('input');
      input && input.focus();
    },
    genButton: function genButton(fn, text) {
      return this.$createElement('v-btn', {
        props: {
          flat: true,
          color: 'primary',
          light: true
        },
        on: { click: fn }
      }, text);
    },
    genActions: function genActions() {
      var _this = this;

      return this.$createElement('div', {
        'class': 'small-dialog__actions'
      }, [this.genButton(this.cancel, this.cancelText), this.genButton(function () {
        return _this.save(_this.returnValue);
      }, this.saveText)]);
    },
    genContent: function genContent() {
      var _this2 = this;

      return this.$createElement('div', {
        on: {
          keydown: function keydown(e) {
            var input = _this2.$refs.content.querySelector('input');
            e.keyCode === 27 && _this2.cancel();
            e.keyCode === 13 && input && _this2.save(input.value);
          }
        },
        ref: 'content'
      }, [this.$slots.input]);
    }
  },

  render: function render(h) {
    var _this3 = this;

    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        contentClass: 'small-dialog__content',
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnClick: !this.persistent,
        closeOnContentClick: false,
        lazy: this.lazy
      },
      on: {
        input: function input(val) {
          return _this3.isActive = val;
        }
      }
    }, [h('a', {
      slot: 'activator'
    }, this.$slots.default), this.genContent(), this.large ? this.genActions() : null]);
  }
});

/***/ }),
/* 167 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDatePicker__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VDatePickerTitle__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VDatePickerHeader__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VDatePickerDateTable__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VDatePickerMonthTable__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VDatePickerYears__ = __webpack_require__(61);
/* unused harmony reexport VDatePicker */
/* unused harmony reexport VDatePickerTitle */
/* unused harmony reexport VDatePickerHeader */
/* unused harmony reexport VDatePickerDateTable */
/* unused harmony reexport VDatePickerMonthTable */
/* unused harmony reexport VDatePickerYears */









/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VDatePickerTitle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VDatePickerTitle__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VDatePickerHeader__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VDatePickerHeader__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VDatePickerDateTable__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VDatePickerDateTable__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VDatePickerMonthTable__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VDatePickerMonthTable__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_5__VDatePickerYears__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_5__VDatePickerYears__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */]);

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VDatePickerTitle__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VDatePickerHeader__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VDatePickerDateTable__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VDatePickerMonthTable__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VDatePickerYears__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_picker__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_isDateAllowed__ = __webpack_require__(59);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Components









// Mixins


// Utils



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */],
    VCard: __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_2__VIcon__["a" /* default */],
    VDatePickerTitle: __WEBPACK_IMPORTED_MODULE_3__VDatePickerTitle__["a" /* default */],
    VDatePickerHeader: __WEBPACK_IMPORTED_MODULE_4__VDatePickerHeader__["a" /* default */],
    VDatePickerDateTable: __WEBPACK_IMPORTED_MODULE_5__VDatePickerDateTable__["a" /* default */],
    VDatePickerMonthTable: __WEBPACK_IMPORTED_MODULE_6__VDatePickerMonthTable__["a" /* default */],
    VDatePickerYears: __WEBPACK_IMPORTED_MODULE_7__VDatePickerYears__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_8__mixins_picker__["a" /* default */]],

  data: function data() {
    var _this = this;

    var now = new Date();
    return {
      activePicker: this.type.toUpperCase(),
      defaultColor: 'accent',
      inputDay: null,
      inputMonth: null,
      inputYear: null,
      isReversing: false,
      now: now,
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: function () {
        if (_this.pickerDate) {
          return _this.pickerDate;
        }

        var date = _this.value || now.getFullYear() + '-' + (now.getMonth() + 1);
        var type = _this.type === 'date' ? 'month' : 'year';
        return _this.sanitizeDateString(date, type);
      }()
    };
  },


  props: {
    allowedDates: Function,
    // Function formatting the day in date picker table
    dayFormat: {
      type: Function,
      default: null
    },
    events: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning'
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    // Function formatting the tableDate in the day/month table header
    headerDateFormat: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    max: String,
    min: String,
    // Function formatting month in the months table
    monthFormat: {
      type: Function,
      default: null
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    pickerDate: String,
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    reactive: Boolean,
    readonly: Boolean,
    scrollable: Boolean,
    showCurrent: {
      type: [Boolean, String],
      default: true
    },
    // Function formatting currently selected date in the picker title
    titleDateFormat: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'date',
      validator: function validator(type) {
        return ['date', 'month'].includes(type);
      } // TODO: year
    },
    value: String,
    // Function formatting the year in table header and pickup title
    yearFormat: {
      type: Function,
      default: null
    },
    yearIcon: String
  },

  computed: {
    current: function current() {
      if (this.showCurrent === true) {
        return this.sanitizeDateString(this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate(), this.type);
      }

      return this.showCurrent || null;
    },
    inputDate: function inputDate() {
      return this.type === 'date' ? this.inputYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(this.inputMonth + 1) + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(this.inputDay) : this.inputYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(this.inputMonth + 1);
    },
    tableMonth: function tableMonth() {
      return (this.pickerDate || this.tableDate).split('-')[1] - 1;
    },
    tableYear: function tableYear() {
      return (this.pickerDate || this.tableDate).split('-')[0] * 1;
    },
    minMonth: function minMonth() {
      return this.min ? this.sanitizeDateString(this.min, 'month') : null;
    },
    maxMonth: function maxMonth() {
      return this.max ? this.sanitizeDateString(this.max, 'month') : null;
    },
    minYear: function minYear() {
      return this.min ? this.sanitizeDateString(this.min, 'year') : null;
    },
    maxYear: function maxYear() {
      return this.max ? this.sanitizeDateString(this.max, 'year') : null;
    },
    formatters: function formatters() {
      return {
        year: this.yearFormat || Object(__WEBPACK_IMPORTED_MODULE_9__util__["a" /* createNativeLocaleFormatter */])(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDate: this.titleDateFormat || this.defaultTitleDateFormatter
      };
    },
    defaultTitleDateFormatter: function defaultTitleDateFormatter() {
      var titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
      };

      var titleDateFormatter = Object(__WEBPACK_IMPORTED_MODULE_9__util__["a" /* createNativeLocaleFormatter */])(this.locale, titleFormats[this.type], {
        start: 0,
        length: { date: 10, month: 7, year: 4 }[this.type]
      });

      var landscapeFormatter = function landscapeFormatter(date) {
        return titleDateFormatter(date).replace(/([^\d\s])([\d])/g, function (match, nonDigit, digit) {
          return nonDigit + ' ' + digit;
        }).replace(', ', ',<br>');
      };

      return this.landscape ? landscapeFormatter : titleDateFormatter;
    }
  },

  watch: {
    tableDate: function tableDate(val, prev) {
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      var sanitizeType = this.type === 'month' ? 'year' : 'month';
      this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType);
      this.$emit('update:pickerDate', val);
    },
    pickerDate: function pickerDate(val) {
      if (val) {
        this.tableDate = val;
      } else if (this.value && this.type === 'date') {
        this.tableDate = this.sanitizeDateString(this.value, 'month');
      } else if (this.value && this.type === 'month') {
        this.tableDate = this.sanitizeDateString(this.value, 'year');
      }
    },
    value: function value() {
      this.setInputDate();
      if (this.value && !this.pickerDate) {
        this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
      }
    },
    type: function type(_type) {
      this.activePicker = _type.toUpperCase();

      if (this.value) {
        var date = this.sanitizeDateString(this.value, _type);
        this.$emit('input', this.isDateAllowed(date) ? date : null);
      }
    }
  },

  methods: {
    isDateAllowed: function isDateAllowed(value) {
      return Object(__WEBPACK_IMPORTED_MODULE_10__util_isDateAllowed__["a" /* default */])(value, this.min, this.max, this.allowedDates);
    },
    yearClick: function yearClick(value) {
      this.inputYear = value;
      if (this.type === 'month') {
        this.tableDate = '' + value;
      } else {
        this.tableDate = value + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(this.tableMonth + 1);
      }
      this.activePicker = 'MONTH';
      this.reactive && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate);
    },
    monthClick: function monthClick(value) {
      this.inputYear = parseInt(value.split('-')[0], 10);
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
      if (this.type === 'date') {
        this.tableDate = value;
        this.activePicker = 'DATE';
        this.reactive && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate);
      } else {
        this.$emit('input', this.inputDate);
        this.$emit('change', this.inputDate);
      }
    },
    dateClick: function dateClick(value) {
      this.inputYear = parseInt(value.split('-')[0], 10);
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
      this.inputDay = parseInt(value.split('-')[2], 10);
      this.$emit('input', this.inputDate);
      this.$emit('change', this.inputDate);
    },
    genPickerTitle: function genPickerTitle() {
      var _this2 = this;

      return this.$createElement('v-date-picker-title', {
        props: {
          date: this.value ? this.formatters.titleDate(this.value) : '',
          selectingYear: this.activePicker === 'YEAR',
          year: this.formatters.year('' + this.inputYear),
          yearIcon: this.yearIcon,
          value: this.value
        },
        slot: 'title',
        style: this.readonly ? {
          'pointer-events': 'none'
        } : undefined,
        on: {
          'update:selectingYear': function updateSelectingYear(value) {
            return _this2.activePicker = value ? 'YEAR' : _this2.type.toUpperCase();
          }
        }
      });
    },
    genTableHeader: function genTableHeader() {
      var _this3 = this;

      return this.$createElement('v-date-picker-header', {
        props: {
          nextIcon: this.nextIcon,
          color: this.color,
          disabled: this.readonly,
          format: this.headerDateFormat,
          locale: this.locale,
          min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
          max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
          prevIcon: this.prevIcon,
          value: this.activePicker === 'DATE' ? this.tableYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(this.tableMonth + 1) : '' + this.tableYear
        },
        on: {
          toggle: function toggle() {
            return _this3.activePicker = _this3.activePicker === 'DATE' ? 'MONTH' : 'YEAR';
          },
          input: function input(value) {
            return _this3.tableDate = value;
          }
        }
      });
    },
    genDateTable: function genDateTable() {
      var _this4 = this;

      return this.$createElement('v-date-picker-date-table', {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          current: this.current,
          disabled: this.readonly,
          events: this.events,
          eventColor: this.eventColor,
          firstDayOfWeek: this.firstDayOfWeek,
          format: this.dayFormat,
          locale: this.locale,
          min: this.min,
          max: this.max,
          tableDate: this.tableYear + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(this.tableMonth + 1),
          scrollable: this.scrollable,
          value: this.value
        },
        ref: 'table',
        on: {
          input: this.dateClick,
          tableDate: function tableDate(value) {
            return _this4.tableDate = value;
          }
        }
      });
    },
    genMonthTable: function genMonthTable() {
      var _this5 = this;

      return this.$createElement('v-date-picker-month-table', {
        props: {
          allowedDates: this.type === 'month' ? this.allowedDates : null,
          color: this.color,
          current: this.current ? this.sanitizeDateString(this.current, 'month') : null,
          disabled: this.readonly,
          format: this.monthFormat,
          locale: this.locale,
          min: this.minMonth,
          max: this.maxMonth,
          scrollable: this.scrollable,
          value: !this.value || this.type === 'month' ? this.value : this.value.substr(0, 7),
          tableDate: '' + this.tableYear
        },
        ref: 'table',
        on: {
          input: this.monthClick,
          tableDate: function tableDate(value) {
            return _this5.tableDate = value;
          }
        }
      });
    },
    genYears: function genYears() {
      return this.$createElement('v-date-picker-years', {
        props: {
          color: this.color,
          format: this.yearFormat,
          locale: this.locale,
          min: this.minYear,
          max: this.maxYear,
          value: '' + this.tableYear
        },
        on: {
          input: this.yearClick
        }
      });
    },
    genPickerBody: function genPickerBody() {
      var children = this.activePicker === 'YEAR' ? [this.genYears()] : [this.genTableHeader(), this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()];

      return this.$createElement('div', {
        key: this.activePicker,
        style: this.readonly ? {
          'pointer-events': 'none'
        } : undefined
      }, children);
    },

    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString: function sanitizeDateString(dateString, type) {
      var _dateString$split = dateString.split('-'),
          _dateString$split2 = _slicedToArray(_dateString$split, 3),
          year = _dateString$split2[0],
          _dateString$split2$ = _dateString$split2[1],
          month = _dateString$split2$ === undefined ? 1 : _dateString$split2$,
          _dateString$split2$2 = _dateString$split2[2],
          date = _dateString$split2$2 === undefined ? 1 : _dateString$split2$2;

      return (year + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(month) + '-' + Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* pad */])(date)).substr(0, { date: 10, month: 7, year: 4 }[type]);
    },
    setInputDate: function setInputDate() {
      if (this.value) {
        var array = this.value.split('-');
        this.inputYear = parseInt(array[0], 10);
        this.inputMonth = parseInt(array[1], 10) - 1;
        if (this.type === 'date') {
          this.inputDay = parseInt(array[2], 10);
        }
      } else {
        this.inputYear = this.inputYear || this.now.getFullYear();
        this.inputMonth = this.inputMonth == null ? this.inputMonth : this.now.getMonth();
        this.inputDay = this.inputDay || this.now.getDate();
      }
    }
  },

  created: function created() {
    if (this.pickerDate !== this.tableDate) {
      this.$emit('update:pickerDate', this.tableDate);
    }
    this.setInputDate();
  },
  render: function render(h) {
    return this.genPicker('picker--date');
  }
});

/***/ }),
/* 170 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 171 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pad__ = __webpack_require__(23);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



/* harmony default export */ __webpack_exports__["a"] = (function (locale, options) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { start: 0, length: 0 },
      start = _ref.start,
      length = _ref.length;

  var makeIsoString = function makeIsoString(dateString) {
    var _dateString$trim$spli = dateString.trim().split(' ')[0].split('-'),
        _dateString$trim$spli2 = _slicedToArray(_dateString$trim$spli, 3),
        year = _dateString$trim$spli2[0],
        month = _dateString$trim$spli2[1],
        date = _dateString$trim$spli2[2];

    return [year, Object(__WEBPACK_IMPORTED_MODULE_0__pad__["a" /* default */])(month || 1), Object(__WEBPACK_IMPORTED_MODULE_0__pad__["a" /* default */])(date || 1)].join('-');
  };

  try {
    var intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);
    return function (dateString) {
      return intlFormatter.format(new Date(makeIsoString(dateString) + 'T00:00:00+00:00'));
    };
  } catch (e) {
    return start || length ? function (dateString) {
      return makeIsoString(dateString).substr(start, length);
    } : null;
  }
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pad__ = __webpack_require__(23);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
/* harmony default export */ __webpack_exports__["a"] = (function (value, sign) {
  var _value$split$map = value.split('-').map(function (v) {
    return 1 * v;
  }),
      _value$split$map2 = _slicedToArray(_value$split$map, 2),
      year = _value$split$map2[0],
      month = _value$split$map2[1];

  if (month + sign === 0) {
    return year - 1 + '-12';
  } else if (month + sign === 13) {
    return year + 1 + '-01';
  } else {
    return year + '-' + Object(__WEBPACK_IMPORTED_MODULE_0__pad__["a" /* default */])(month + sign);
  }
});

/***/ }),
/* 174 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 175 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pickers_styl__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pickers_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_pickers_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



// Components


// Mixins



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-picker',

  components: {
    VCard: __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      defaultColor: 'primary'
    };
  },


  props: {
    fullWidth: Boolean,
    landscape: Boolean,
    transition: {
      type: String,
      default: 'fade-transition'
    },
    width: {
      type: [Number, String],
      default: 290,
      validator: function validator(value) {
        return parseInt(value, 10) > 0;
      }
    }
  },

  computed: {
    computedTitleColor: function computedTitleColor() {
      var darkTheme = this.dark || !this.light && this.$vuetify.dark;
      var defaultTitleColor = darkTheme ? null : this.computedColor;
      return this.color || defaultTitleColor;
    }
  },

  methods: {
    genTitle: function genTitle() {
      return this.$createElement('div', {
        staticClass: 'picker__title',
        'class': this.addBackgroundColorClassChecks({
          'picker__title--landscape': this.landscape
        }, this.computedTitleColor)
      }, this.$slots.title);
    },
    genBodyTransition: function genBodyTransition() {
      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, this.$slots.default);
    },
    genBody: function genBody() {
      return this.$createElement('div', {
        staticClass: 'picker__body',
        style: this.fullWidth ? undefined : {
          width: this.width + 'px'
        }
      }, [this.genBodyTransition()]);
    },
    genActions: function genActions() {
      return this.$createElement('div', {
        staticClass: 'picker__actions card__actions'
      }, this.$slots.actions);
    }
  },

  render: function render(h) {
    return h('v-card', {
      staticClass: 'picker',
      'class': _extends({
        'picker--landscape': this.landscape
      }, this.themeClasses)
    }, [this.$slots.title ? this.genTitle() : null, this.genBody(), this.$slots.actions ? this.genActions() : null]);
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDialog__ = __webpack_require__(34);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */]);

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDivider__ = __webpack_require__(180);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */]);

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dividers_styl__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dividers_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_dividers_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-divider',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    data.staticClass = ('divider ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' divider--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('hr', data);
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__ = __webpack_require__(185);
/* unused harmony reexport VExpansionPanel */
/* unused harmony reexport VExpansionPanelContent */





/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */]);

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_expansion_panel_styl__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_expansion_panel_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_expansion_panel_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_registrable__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-expansion-panel',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_2__mixins_registrable__["b" /* provide */])('expansionPanel')],

  provide: function provide() {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    };
  },
  data: function data() {
    return {
      items: []
    };
  },


  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    panelClick: function panelClick(uid) {
      if (!this.expand) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].toggle(uid);
        }
        return;
      }

      for (var _i = 0; _i < this.items.length; _i++) {
        if (this.items[_i].uid === uid) {
          this.items[_i].toggle(uid);
          return;
        }
      }
    },
    register: function register(uid, toggle) {
      this.items.push({ uid: uid, toggle: toggle });
    },
    unregister: function unregister(uid) {
      this.items = this.items.filter(function (i) {
        return i.uid !== uid;
      });
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'expansion-panel',
      'class': _extends({
        'expansion-panel--focusable': this.focusable,
        'expansion-panel--popout': this.popout,
        'expansion-panel--inset': this.inset
      }, this.themeClasses)
    }, this.$slots.default);
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_click_outside__ = __webpack_require__(8);











/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-expansion-panel-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_4__mixins_registrable__["a" /* inject */])('expansionPanel', 'v-expansion-panel', 'v-expansion-panel-content')],

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_5__VIcon__["a" /* default */]
  },

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_6__directives_click_outside__["a" /* default */]
  },

  inject: ['focusable', 'panelClick'],

  data: function data() {
    return {
      height: 'auto'
    };
  },


  props: {
    expandIcon: {
      type: String,
      default: 'keyboard_arrow_down'
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    }
  },

  methods: {
    genBody: function genBody() {
      return this.$createElement('div', {
        ref: 'body',
        class: 'expansion-panel__body',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, this.showLazyContent(this.$slots.default));
    },
    genHeader: function genHeader() {
      var _this = this;

      return this.$createElement('div', {
        staticClass: 'expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: function click() {
            return _this.panelClick(_this._uid);
          }
        }
      }, [this.$slots.header, this.genIcon()]);
    },
    genIcon: function genIcon(h) {
      if (this.hideActions) return null;

      var icon = this.$slots.actions || this.$createElement('v-icon', this.expandIcon);

      return this.$createElement('div', {
        staticClass: 'header__icon'
      }, [icon]);
    },
    toggle: function toggle(uid) {
      var _this2 = this;

      var isActive = this._uid === uid && !this.isActive;

      if (isActive) this.isBooted = true;

      // We treat bootable differently
      // Needs time to calc height
      this.$nextTick(function () {
        return _this2.isActive = isActive;
      });
    }
  },

  mounted: function mounted() {
    this.expansionPanel.register(this._uid, this.toggle);
  },
  beforeDestroy: function beforeDestroy() {
    this.expansionPanel.unregister(this._uid);
  },
  render: function render(h) {
    var _this3 = this;

    var children = [];

    this.$slots.header && children.push(this.genHeader());
    children.push(h(__WEBPACK_IMPORTED_MODULE_0__transitions__["a" /* VExpandTransition */], [this.genBody()]));

    return h('li', {
      staticClass: 'expansion-panel__container',
      'class': {
        'expansion-panel__container--active': this.isActive
      },
      attrs: {
        tabindex: 0
      },
      on: {
        keydown: function keydown(e) {
          // Ensure element is focusable and the activeElement
          if (_this3.focusable && _this3.$el === document.activeElement && e.keyCode === 13) _this3.panelClick(_this3._uid);
        }
      }
    }, children);
  }
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VFooter__ = __webpack_require__(187);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */]);

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_footer_styl__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_footer_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_footer_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);
// Styles


// Mixins




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-footer',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a" /* default */])('footer', ['height']), __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  props: {
    height: {
      default: 32,
      type: [Number, String]
    },
    inset: Boolean
  },

  computed: {
    computedMarginBottom: function computedMarginBottom() {
      if (!this.app) return;

      return this.$vuetify.application.bottom;
    },
    computedPaddingLeft: function computedPaddingLeft() {
      return !this.app || !this.inset ? 0 : this.$vuetify.application.left;
    },
    computedPaddingRight: function computedPaddingRight() {
      return !this.app ? 0 : this.$vuetify.application.right;
    },
    styles: function styles() {
      var styles = {
        height: isNaN(this.height) ? this.height : this.height + 'px'
      };

      if (this.computedPaddingLeft) {
        styles.paddingLeft = this.computedPaddingLeft + 'px';
      }

      if (this.computedPaddingRight) {
        styles.paddingRight = this.computedPaddingRight + 'px';
      }

      if (this.computedMarginBottom) {
        styles.marginBottom = this.computedMarginBottom + 'px';
      }

      return styles;
    }
  },

  methods: {
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication: function updateApplication() {
      return isNaN(this.height) ? this.$el ? this.$el.clientHeight : 0 : this.height;
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'footer',
      'class': this.addBackgroundColorClassChecks({
        'footer--absolute': this.absolute,
        'footer--fixed': !this.absolute && (this.app || this.fixed),
        'footer--inset': this.inset,
        'theme--dark': this.dark,
        'theme--light': this.light
      }),
      style: this.styles,
      ref: 'content'
    };

    return h('footer', data, this.$slots.default);
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VForm__ = __webpack_require__(190);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */]);

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-form',

  inheritAttrs: false,

  data: function data() {
    return {
      inputs: [],
      errorBag: {}
    };
  },


  props: {
    value: Boolean,
    lazyValidation: Boolean
  },

  watch: {
    errorBag: {
      handler: function handler() {
        var errors = Object.values(this.errorBag).includes(true);

        this.$emit('input', !errors);

        return !errors;
      },

      deep: true
    }
  },

  methods: {
    getInputs: function getInputs() {
      var results = [];

      var search = function search(children) {
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        for (var index = 0; index < children.length; index++) {
          var child = children[index];
          if (child.errorBucket !== undefined) {
            results.push(child);
          } else {
            search(child.$children, depth + 1);
          }
        }
        if (depth === 0) return results;
      };

      return search(this.$children);
    },
    watchInputs: function watchInputs() {
      var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getInputs();

      for (var index = 0; index < inputs.length; index++) {
        var child = inputs[index];
        if (this.inputs.includes(child)) {
          continue; // We already know about this input
        }

        this.inputs.push(child);
        this.watchChild(child);
      }
    },
    watchChild: function watchChild(child) {
      var _this = this;

      var watcher = function watcher(child) {
        child.$watch('valid', function (val) {
          _this.$set(_this.errorBag, child._uid, !val);
        }, { immediate: true });
      };

      if (!this.lazyValidation) return watcher(child);

      // Only start watching inputs if we need to
      child.$watch('shouldValidate', function (val) {
        if (!val) return;

        // Only watch if we're not already doing it
        if (_this.errorBag.hasOwnProperty(child._uid)) return;

        watcher(child);
      });
    },
    validate: function validate() {
      var errors = this.inputs.filter(function (input) {
        return !input.validate(true);
      }).length;
      return !errors;
    },
    reset: function reset() {
      for (var i = this.inputs.length; i--;) {
        this.inputs[i].reset();
      }
      if (this.lazyValidation) this.errorBag = {};
    }
  },

  mounted: function mounted() {
    this.watchInputs();
  },
  updated: function updated() {
    var inputs = this.getInputs();

    if (inputs.length < this.inputs.length) {
      // Something was removed, we don't want it in the errorBag any more
      var removed = this.inputs.filter(function (i) {
        return !inputs.includes(i);
      });

      for (var index = 0; index < removed.length; index++) {
        var input = removed[index];
        this.$delete(this.errorBag, input._uid);
        this.$delete(this.inputs, this.inputs.indexOf(input));
      }
    }

    this.watchInputs(inputs);
  },
  render: function render(h) {
    var _this2 = this;

    return h('form', {
      attrs: Object.assign({
        novalidate: true
      }, this.$attrs),
      on: {
        submit: function submit(e) {
          return _this2.$emit('submit', e);
        }
      }
    }, this.$slots.default);
  }
});

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VSpacer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VContent__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VContainer__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VFlex__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VLayout__ = __webpack_require__(196);
/* unused harmony reexport VContainer */
/* unused harmony reexport VContent */
/* unused harmony reexport VFlex */
/* unused harmony reexport VLayout */






var VSpacer = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('spacer');



var VGrid = {};

/* istanbul ignore next */
VGrid.install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VContainer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VContainer__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VFlex__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VFlex__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VLayout__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VLayout__["a" /* default */]);
  Vue.component(VSpacer.name, VSpacer);
};

/* harmony default export */ __webpack_exports__["a"] = (VGrid);

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_content_styl__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_content_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_content_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ssr_bootable__ = __webpack_require__(24);
// Styles


// Mixins


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_ssr_bootable__["a" /* default */]],

  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },

  computed: {
    styles: function styles() {
      var _$vuetify$application = this.$vuetify.application,
          bar = _$vuetify$application.bar,
          top = _$vuetify$application.top,
          right = _$vuetify$application.right,
          footer = _$vuetify$application.footer,
          bottom = _$vuetify$application.bottom,
          left = _$vuetify$application.left;


      return {
        paddingTop: top + bar + 'px',
        paddingRight: right + 'px',
        paddingBottom: footer + bottom + 'px',
        paddingLeft: left + 'px'
      };
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'content',
      'class': this.classes,
      style: this.styles,
      ref: 'content'
    };

    return h(this.tag, data, [h('div', { staticClass: 'content--wrap' }, this.$slots.default)]);
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(30);




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__grid__["a" /* default */])('container'));

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(30);




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__grid__["a" /* default */])('flex'));

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid__ = __webpack_require__(30);




/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__grid__["a" /* default */])('layout'));

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__ = __webpack_require__(198);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */]);

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_navigation_drawer_styl__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_navigation_drawer_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_navigation_drawer_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_ssr_bootable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_resize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_touch__ = __webpack_require__(9);


// Mixins





// Directives




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-navigation-drawer',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a" /* default */])(null, ['miniVariant', 'right', 'width']), __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_ssr_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__["a" /* default */],
    Resize: __WEBPACK_IMPORTED_MODULE_6__directives_resize__["a" /* default */],
    Touch: __WEBPACK_IMPORTED_MODULE_7__directives_touch__["a" /* default */]
  },

  data: function data() {
    return {
      isActive: false,
      touchArea: {
        left: 0,
        right: 0
      }
    };
  },

  props: {
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    disableResizeWatcher: Boolean,
    height: {
      type: [Number, String],
      default: '100%'
    },
    floating: Boolean,
    miniVariant: Boolean,
    miniVariantWidth: {
      type: [Number, String],
      default: 80
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264
    },
    permanent: Boolean,
    right: Boolean,
    stateless: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 300
    },
    value: { required: false }
  },

  computed: {
    /**
     * Used for setting an app
     * value from a dynamic
     * property. Called from
     * applicationable.js
     *
     * @return {string}
     */
    applicationProperty: function applicationProperty() {
      return this.right ? 'right' : 'left';
    },
    calculatedHeight: function calculatedHeight() {
      return isNaN(this.height) ? this.height : this.height + 'px';
    },
    calculatedTransform: function calculatedTransform() {
      if (this.isActive) return 0;

      return this.right ? this.calculatedWidth : -this.calculatedWidth;
    },
    calculatedWidth: function calculatedWidth() {
      return this.miniVariant ? this.miniVariantWidth : this.width;
    },
    classes: function classes() {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    isMobile: function isMobile() {
      return !this.permanent && !this.temporary && this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10);
    },
    marginTop: function marginTop() {
      if (!this.app) return 0;
      var marginTop = this.$vuetify.application.bar;

      marginTop += this.clipped ? this.$vuetify.application.top : 0;

      return marginTop;
    },
    maxHeight: function maxHeight() {
      if (!this.app) return '100%';

      return this.clipped ? this.$vuetify.application.top + this.$vuetify.application.bottom : this.$vuetify.application.bottom;
    },
    reactsToClick: function reactsToClick() {
      return !this.stateless && !this.permanent && (this.isMobile || this.temporary);
    },
    reactsToMobile: function reactsToMobile() {
      return !this.disableResizeWatcher && !this.stateless && !this.permanent && !this.temporary;
    },
    reactsToRoute: function reactsToRoute() {
      return !this.disableRouteWatcher && !this.stateless && (this.temporary || this.isMobile);
    },
    resizeIsDisabled: function resizeIsDisabled() {
      return this.disableResizeWatcher || this.stateless;
    },
    showOverlay: function showOverlay() {
      return this.isActive && (this.isMobile || this.temporary);
    },
    styles: function styles() {
      var styles = {
        height: this.calculatedHeight,
        marginTop: this.marginTop + 'px',
        maxHeight: 'calc(100% - ' + this.maxHeight + 'px)',
        transform: 'translateX(' + this.calculatedTransform + 'px)',
        width: this.calculatedWidth + 'px'
      };

      return styles;
    }
  },

  watch: {
    $route: function $route() {
      if (this.reactsToRoute && this.closeConditional()) {
        this.isActive = false;
      }
    },
    isActive: function isActive(val) {
      this.$emit('input', val);
      this.callUpdate();
    },

    /**
     * When mobile changes, adjust
     * the active state only when
     * there has been a previous
     * value
     */
    isMobile: function isMobile(val, prev) {
      !val && this.isActive && !this.temporary && this.removeOverlay();

      if (prev == null || this.resizeIsDisabled || !this.reactsToMobile) return;

      this.isActive = !val;
      this.callUpdate();
    },
    permanent: function permanent(val) {
      // If enabling prop
      // enable the drawer
      if (val) {
        this.isActive = true;
      }
      this.callUpdate();
    },
    showOverlay: function showOverlay(val) {
      if (val) this.genOverlay();else this.removeOverlay();
    },
    temporary: function temporary() {
      this.callUpdate();
    },
    value: function value(val) {
      if (this.permanent) return;

      if (val == null) return this.init();

      if (val !== this.isActive) this.isActive = val;
    }
  },

  beforeMount: function beforeMount() {
    this.init();
  },


  methods: {
    calculateTouchArea: function calculateTouchArea() {
      if (!this.$el.parentNode) return;
      var parentRect = this.$el.parentNode.getBoundingClientRect();

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      };
    },
    closeConditional: function closeConditional() {
      return this.isActive && this.reactsToClick;
    },
    genDirectives: function genDirectives() {
      var _this = this;

      var directives = [{
        name: 'click-outside',
        value: function value() {
          return _this.isActive = false;
        },
        args: {
          closeConditional: this.closeConditional
        }
      }];

      !this.touchless && directives.push({
        name: 'touch',
        value: {
          parent: true,
          left: this.swipeLeft,
          right: this.swipeRight
        }
      });

      return directives;
    },

    /**
     * Sets state before mount to avoid
     * entry transitions in SSR
     *
     * @return {void}
     */
    init: function init() {
      if (this.permanent) {
        this.isActive = true;
      } else if (this.stateless || this.value != null) {
        this.isActive = this.value;
      } else if (!this.temporary) {
        this.isActive = !this.isMobile;
      }
    },
    swipeRight: function swipeRight(e) {
      if (this.isActive && !this.right) return;
      this.calculateTouchArea();

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
      if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true;else if (this.right && this.isActive) this.isActive = false;
    },
    swipeLeft: function swipeLeft(e) {
      if (this.isActive && this.right) return;
      this.calculateTouchArea();

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
      if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true;else if (!this.right && this.isActive) this.isActive = false;
    },

    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication: function updateApplication() {
      return !this.isActive || this.temporary || this.isMobile ? 0 : this.calculatedWidth;
    }
  },

  render: function render(h) {
    var _this2 = this;

    var data = {
      'class': this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: {
        click: function click() {
          if (!_this2.miniVariant) return;

          _this2.$emit('update:miniVariant', false);
        }
      }
    };

    return h('aside', data, [this.$slots.default, h('div', { 'class': 'navigation-drawer__border' })]);
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VPagination__ = __webpack_require__(201);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */]);

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pagination_styl__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pagination_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_pagination_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_resize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-pagination',

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_colorable__["a" /* default */]],

  directives: { Resize: __WEBPACK_IMPORTED_MODULE_2__directives_resize__["a" /* default */] },

  data: function data() {
    return {
      maxButtons: 0,
      defaultColor: 'primary'
    };
  },


  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: function validator(val) {
        return val % 1 === 0;
      }
    },
    totalVisible: [Number, String],
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    classes: function classes() {
      return {
        'pagination': true,
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      };
    },
    items: function items() {
      var maxLength = this.totalVisible || this.maxButtons;
      if (this.length <= maxLength) {
        return this.range(1, this.length);
      }

      var even = maxLength % 2 === 0 ? 1 : 0;
      var left = Math.floor(maxLength / 2);
      var right = this.length - left + 1 + even;

      if (this.value >= left && this.value <= right) {
        var start = this.value - left + 2;
        var end = this.value + left - 2 - even;

        return [1, '...'].concat(_toConsumableArray(this.range(start, end)), ['...', this.length]);
      } else {
        return [].concat(_toConsumableArray(this.range(1, left)), ['...'], _toConsumableArray(this.range(this.length - left + 1 + even, this.length)));
      }
    }
  },

  watch: {
    value: function value() {
      this.init();
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    init: function init() {
      var _this = this;

      this.selected = null;

      // TODO: Change this (f75dee3a, cbdf7caa)
      setTimeout(function () {
        return _this.selected = _this.value;
      }, 100);
    },
    onResize: function onResize() {
      var width = this.$el && this.$el.parentNode ? this.$el.parentNode.clientWidth : window.innerWidth;

      this.maxButtons = Math.floor((width - 96) / 42);
    },
    next: function next(e) {
      e.preventDefault();
      this.$emit('input', this.value + 1);
      this.$emit('next');
    },
    previous: function previous(e) {
      e.preventDefault();
      this.$emit('input', this.value - 1);
      this.$emit('previous');
    },
    range: function range(from, to) {
      var range = [];

      from = from > 0 ? from : 1;

      for (var i = from; i <= to; i++) {
        range.push(i);
      }

      return range;
    },
    genIcon: function genIcon(h, icon, disabled, fn) {
      return h('li', [h('button', {
        staticClass: 'pagination__navigation',
        class: {
          'pagination__navigation--disabled': disabled
        },
        on: disabled ? {} : { click: fn }
      }, [h(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], [icon])])]);
    },
    genItem: function genItem(h, i) {
      var _this2 = this;

      return h('button', {
        staticClass: 'pagination__item',
        class: i === this.value ? this.addBackgroundColorClassChecks({
          'pagination__item--active': true
        }) : {},
        on: {
          click: function click() {
            return _this2.$emit('input', i);
          }
        }
      }, [i]);
    },
    genItems: function genItems(h) {
      var _this3 = this;

      return this.items.map(function (i, index) {
        return h('li', { key: index }, [isNaN(i) ? h('span', { class: 'pagination__more' }, [i]) : _this3.genItem(h, i)]);
      });
    }
  },

  render: function render(h) {
    var children = [this.genIcon(h, this.prevIcon, this.value <= 1, this.previous), this.genItems(h), this.genIcon(h, this.nextIcon, this.value >= this.length, this.next)];

    return h('ul', {
      directives: [{ name: 'resize', value: this.onResize }],
      class: this.classes
    }, children);
  }
});

/***/ }),
/* 202 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VParallax__ = __webpack_require__(204);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */]);

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_parallax_styl__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_parallax_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_parallax_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_translatable__ = __webpack_require__(206);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-parallax',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_translatable__["a" /* default */]],

  data: function data() {
    return {
      isBooted: false
    };
  },


  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    src: String
  },

  computed: {
    styles: function styles() {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: 'translate(-50%, ' + this.parallax + 'px)'
      };
    }
  },

  watch: {
    parallax: function parallax() {
      this.isBooted = true;
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    init: function init() {
      var _this = this;

      if (!this.$refs.img) return;

      if (this.$refs.img.complete) {
        this.translate();
        this.listeners();
      } else {
        this.$refs.img.addEventListener('load', function () {
          _this.translate();
          _this.listeners();
        }, false);
      }
    },
    objHeight: function objHeight() {
      return this.$refs.img.naturalHeight;
    },
    elOffsetTop: function elOffsetTop() {
      return this.$el.offsetTop;
    }
  },

  render: function render(h) {
    var imgData = {
      staticClass: 'parallax__image',
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    };

    if (this.alt) imgData.attrs.alt = this.alt;

    var container = h('div', {
      staticClass: 'parallax__image-container'
    }, [h('img', imgData)]);

    var content = h('div', {
      staticClass: 'parallax__content'
    }, this.$slots.default);

    return h('div', {
      staticClass: 'parallax',
      style: {
        height: this.normalizedHeight + 'px'
      },
      on: this.$listeners
    }, [container, content]);
  }
});

/***/ }),
/* 205 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'translatable',

  data: function data() {
    return {
      parallax: null,
      parallaxDist: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    };
  },


  computed: {
    normalizedHeight: function normalizedHeight() {
      if (this.jumbotron) {
        return isNaN(this.height) ? this.height : this.height + 'px';
      }

      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'));
    },
    imgHeight: function imgHeight() {
      return this.objHeight();
    }
  },

  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.translate, false);
    window.removeEventListener('resize', this.translate, false);
  },


  methods: {
    listeners: function listeners() {
      window.addEventListener('scroll', this.translate, false);
      window.addEventListener('resize', this.translate, false);
    },
    translate: function translate() {
      this.calcDimensions();

      this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (this.normalizedHeight + this.windowHeight);

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled);

      if (this.translated) {
        this.translated();
      }
    },
    calcDimensions: function calcDimensions() {
      var offset = this.$el.getBoundingClientRect();

      this.scrollTop = window.pageYOffset;
      this.parallaxDist = this.imgHeight - this.normalizedHeight;
      this.elOffsetTop = offset.top + this.scrollTop;
      this.windowHeight = window.innerHeight;
      this.windowBottom = this.scrollTop + this.windowHeight;
    }
  }
});

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__ = __webpack_require__(208);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */]);

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_circular_styl__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_circular_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_circular_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-progress-circular',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */]],

  props: {
    button: Boolean,

    indeterminate: Boolean,

    rotate: {
      type: Number,
      default: 0
    },

    size: {
      type: [Number, String],
      default: 32
    },

    width: {
      type: Number,
      default: 4
    },

    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    calculatedSize: function calculatedSize() {
      var size = Number(this.size);

      if (this.button) {
        size += 8;
      }

      return size;
    },
    circumference: function circumference() {
      return 2 * Math.PI * this.radius;
    },
    classes: function classes() {
      return this.addTextColorClassChecks({
        'progress-circular': true,
        'progress-circular--indeterminate': this.indeterminate,
        'progress-circular--button': this.button
      });
    },
    cxy: function cxy() {
      return this.indeterminate && !this.button ? 50 : this.calculatedSize / 2;
    },
    normalizedValue: function normalizedValue() {
      if (this.value < 0) {
        return 0;
      }

      if (this.value > 100) {
        return 100;
      }

      return this.value;
    },
    radius: function radius() {
      return this.indeterminate && !this.button ? 20 : (this.calculatedSize - this.width) / 2;
    },
    strokeDashArray: function strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },
    strokeDashOffset: function strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
    },
    styles: function styles() {
      return {
        height: this.calculatedSize + 'px',
        width: this.calculatedSize + 'px'
      };
    },
    svgSize: function svgSize() {
      return this.indeterminate ? false : this.calculatedSize;
    },
    svgStyles: function svgStyles() {
      return {
        transform: 'rotate(' + this.rotate + 'deg)'
      };
    },
    viewBox: function viewBox() {
      return this.indeterminate ? '25 25 50 50' : false;
    }
  },

  methods: {
    genCircle: function genCircle(h, name, offset) {
      return h('circle', {
        class: 'progress-circular__' + name,
        attrs: {
          fill: 'transparent',
          cx: this.cxy,
          cy: this.cxy,
          r: this.radius,
          'stroke-width': this.width,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      });
    },
    genSvg: function genSvg(h) {
      var children = [!this.indeterminate && this.genCircle(h, 'underlay', 0), this.genCircle(h, 'overlay', this.strokeDashOffset)];

      return h('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          height: this.svgSize,
          width: this.svgSize,
          viewBox: this.viewBox
        }
      }, children);
    }
  },

  render: function render(h) {
    var info = h('div', { class: 'progress-circular__info' }, [this.$slots.default]);
    var svg = this.genSvg(h);

    return h('div', {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }, [svg, info]);
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VRadio__ = __webpack_require__(213);
/* unused harmony reexport VRadioGroup */
/* unused harmony reexport VRadio */





/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VRadio__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VRadio__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */]);

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylus_components_radio_group_styl__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylus_components_radio_group_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stylus_components_radio_group_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_input__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_registrable__ = __webpack_require__(4);
// Styles




// Mixins



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-radio-group',

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_input__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_4__mixins_registrable__["b" /* provide */])('radio')],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  provide: function provide() {
    var _this = this;

    return {
      isMandatory: function isMandatory() {
        return _this.mandatory;
      },
      name: function name() {
        return _this.name;
      }
    };
  },


  data: function data() {
    return {
      internalTabIndex: -1,
      radios: []
    };
  },

  props: {
    column: {
      type: Boolean,
      default: true
    },
    inputValue: null,
    mandatory: {
      type: Boolean,
      default: true
    },
    name: String,
    row: Boolean
  },

  watch: {
    hasError: function hasError(val) {
      for (var index = this.radios.length; --index >= 0;) {
        this.radios[index].parentError = val;
      }
    },
    inputValue: function inputValue(val) {
      for (var index = this.radios.length; --index >= 0;) {
        var radio = this.radios[index];
        radio.isActive = val === radio.value;
      }
    }
  },

  computed: {
    classes: function classes() {
      return {
        'radio-group': true,
        'radio-group--column': this.column && !this.row,
        'radio-group--row': this.row,
        'error--text': this.hasError
      };
    }
  },

  methods: {
    toggleRadio: function toggleRadio(value) {
      var _this2 = this;

      if (this.disabled) {
        return;
      }

      this.shouldValidate = true;
      this.$emit('change', value);
      this.$nextTick(function () {
        return _this2.validate();
      });

      for (var index = this.radios.length; --index >= 0;) {
        var radio = this.radios[index];
        if (radio.value !== value) radio.isActive = false;
      }
    },
    radioBlur: function radioBlur(e) {
      if (!e.relatedTarget || !e.relatedTarget.classList.contains('radio')) {
        this.shouldValidate = true;
        this.$emit('blur', this.inputValue);
      }
    },
    register: function register(radio) {
      radio.isActive = this.inputValue === radio.value;
      radio.$el.tabIndex = radio.$el.tabIndex > 0 ? radio.$el.tabIndex : 0;
      radio.$on('change', this.toggleRadio);
      radio.$on('blur', this.radioBlur);
      radio.$on('focus', this.radioFocus);
      this.radios.push(radio);
    },
    unregister: function unregister(radio) {
      radio.$off('change', this.toggleRadio);
      radio.$off('blur', this.radioBlur);
      radio.$off('focus', this.radioFocus);

      var index = this.radios.findIndex(function (r) {
        return r === radio;
      });

      if (index > -1) this.radios.splice(index, 1);
    }
  },

  render: function render(h) {
    var data = {
      attrs: {
        role: 'radiogroup'
      }
    };
    return this.genInputGroup(this.$slots.default, data);
  }
});

/***/ }),
/* 212 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_tab_focusable__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_registrable__ = __webpack_require__(4);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Components



// Mixins






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-radio',

  inheritAttrs: false,

  inject: ['isMandatory', 'name'],

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["b" /* VFadeTransition */],
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_6__mixins_registrable__["a" /* inject */])('radio', 'v-radio', 'v-radio-group'), __WEBPACK_IMPORTED_MODULE_4__mixins_tab_focusable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      defaultColor: 'accent',
      isActive: false,
      parentError: false
    };
  },

  props: {
    disabled: Boolean,
    value: null,
    label: String
  },

  computed: {
    classes: function classes() {
      var classes = {
        'input-group': true,
        'input-group--active': this.isActive,
        'input-group--disabled': this.disabled,
        'input-group--selection-controls': true,
        'input-group--tab-focused': this.tabFocused,
        'radio': true,
        'theme--dark': this.dark,
        'theme--light': this.light
      };

      if (!this.parentError) {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    icon: function icon() {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked';
    }
  },

  methods: {
    genInput: function genInput(radio) {
      var value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);
      var input = this.$createElement('input', {
        ref: 'input',
        style: {
          display: 'none'
        },
        attrs: Object.assign({
          name: this.name && this.name(),
          id: this.id,
          type: 'radio',
          value: value
        }, this.$attrs)
      }, [value]);

      radio.push(input);

      return this.$createElement('div', {
        class: 'input-group__input'
      }, radio);
    },
    genWrapper: function genWrapper(radio) {
      var _this = this;

      var children = [];

      children.push(this.genLabel());
      children.push(this.genInput(radio));

      return this.$createElement('div', {
        class: this.classes,
        attrs: {
          role: 'radio',
          'aria-checked': this.isActive ? 'true' : 'false',
          'aria-label': this.label
        },
        on: {
          keydown: function keydown(e) {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault();
              _this.toggle();
            }
          },
          blur: function blur(e) {
            _this.$emit('blur', e);
            _this.tabFocused = false;
          }
        }
      }, children);
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: {
          click: this.toggle
        }
      }, this.$slots.label || this.label);
    },
    toggle: function toggle() {
      var mandatory = !!this.isMandatory && this.isMandatory();

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = true;
        this.isActive = true;
        this.$emit('change', this.value);
      }
    }
  },

  mounted: function mounted() {
    this.radio.register(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.radio.unregister(this);
  },
  render: function render(h) {
    var transition = h('v-fade-transition', {}, [h('v-icon', {
      staticClass: 'icon--selection-control',
      'class': {
        'icon--radio': this.isActive
      },
      key: this.icon,
      on: Object.assign({
        click: this.toggle
      }, this.$listeners)
    }, this.icon)]);

    var ripple = this.ripple ? this.genRipple() : null;

    return this.genWrapper([transition, ripple]);
  }
});

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'tab-focusable',

  data: function data() {
    return {
      tabFocused: false
    };
  }
});

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSlider__ = __webpack_require__(216);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */]);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_sliders_styl__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_sliders_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_sliders_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_input__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__transitions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_console__ = __webpack_require__(6);













/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_input__["a" /* default */]],

  directives: { ClickOutside: __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__["a" /* default */] },

  components: { VScaleTransition: __WEBPACK_IMPORTED_MODULE_5__transitions__["c" /* VScaleTransition */] },

  data: function data() {
    return {
      app: {},
      defaultColor: 'primary',
      isActive: false,
      keyPressed: 0
    };
  },


  props: {
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    ticks: Boolean,
    thumbColor: {
      type: String,
      default: null
    },
    thumbLabel: Boolean,
    trackColor: {
      type: String,
      default: null
    },
    value: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputWidth > 0,
        'input-group--disabled': this.disabled,
        'input-group--ticks': !this.disabled && this.stepNumeric && this.ticks
      };
    },
    computedColor: function computedColor() {
      return this.disabled ? null : this.color || this.defaultColor;
    },
    computedTrackColor: function computedTrackColor() {
      return this.disabled ? null : this.trackColor || null;
    },
    computedThumbColor: function computedThumbColor() {
      return this.disabled || !this.inputWidth ? null : this.thumbColor || this.color || this.defaultColor;
    },
    stepNumeric: function stepNumeric() {
      return this.step > 0 ? parseFloat(this.step) : 0;
    },

    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        var min = this.min,
            max = this.max;

        val = Math.min(Math.max(val, min), max);

        // Round value to ensure the
        // entire slider range can
        // be selected with step
        var value = this.roundValue(val);
        this.lazyValue = value;

        if (value !== this.value) {
          this.$emit('input', value);
        }
      }
    },
    interval: function interval() {
      return 100 / (this.max - this.min) * this.stepNumeric;
    },
    thumbStyles: function thumbStyles() {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: this.inputWidth + '%'
      };
    },
    tickContainerStyles: function tickContainerStyles() {
      return {
        transform: 'translate(0, -50%)'
      };
    },
    trackPadding: function trackPadding() {
      if (this.thumbLabel && this.isActive) return 0;

      return 6 + (this.isActive && !this.disabled ? 3 : 0);
    },
    trackStyles: function trackStyles() {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: 'calc(' + this.inputWidth + '% + ' + this.trackPadding + 'px)',
        width: 'calc(' + (100 - this.inputWidth) + '% - ' + this.trackPadding + 'px)'
      };
    },
    trackFillStyles: function trackFillStyles() {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        width: 'calc(' + this.inputWidth + '% - ' + this.trackPadding + 'px)'
      };
    },
    numTicks: function numTicks() {
      return Math.ceil((this.max - this.min) / this.stepNumeric);
    },
    inputWidth: function inputWidth() {
      return (this.roundValue(this.inputValue) - this.min) / (this.max - this.min) * 100;
    }
  },

  watch: {
    isActive: function isActive(val) {
      this.isFocused = val;
    },
    min: function min(val) {
      val > this.inputValue && this.$emit('input', parseFloat(val));
    },
    max: function max(val) {
      val < this.inputValue && this.$emit('input', parseFloat(val));
    },
    value: function value(val) {
      this.inputValue = parseFloat(val);
    }
  },

  mounted: function mounted() {
    this.inputValue = this.value;

    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') || Object(__WEBPACK_IMPORTED_MODULE_6__util_console__["b" /* consoleWarn */])('Missing v-app or a non-body wrapping element with the [data-app] attribute', this);
  },


  methods: {
    onMouseDown: function onMouseDown(e) {
      this.keyPressed = 2;
      var options = { passive: true };
      this.isActive = true;

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, options);
        Object(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["a" /* addOnceEventListener */])(this.app, 'touchend', this.onMouseUp);
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, options);
        Object(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["a" /* addOnceEventListener */])(this.app, 'mouseup', this.onMouseUp);
      }
    },
    onMouseUp: function onMouseUp() {
      this.keyPressed = 0;
      var options = { passive: true };
      this.isActive = false;
      this.app.removeEventListener('touchmove', this.onMouseMove, options);
      this.app.removeEventListener('mousemove', this.onMouseMove, options);
    },
    onMouseMove: function onMouseMove(e) {
      var _$refs$track$getBound = this.$refs.track.getBoundingClientRect(),
          offsetLeft = _$refs$track$getBound.left,
          trackWidth = _$refs$track$getBound.width;

      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      var left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1);

      if (clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8) {
        this.inputValue = parseFloat(this.min) + left * (this.max - this.min);
      }
    },
    onKeyDown: function onKeyDown(e) {
      if (this.disabled || ![33, 34, 35, 36, 37, 39].includes(e.keyCode)) return;

      e.preventDefault();
      var step = this.stepNumeric || 1;
      var steps = (this.max - this.min) / step;
      if (e.keyCode === 37 || e.keyCode === 39) {
        // Left/right
        this.keyPressed += 1;

        var direction = e.keyCode === 37 ? -1 : 1;
        var multiplier = e.shiftKey ? 3 : e.ctrlKey ? 2 : 1;

        this.inputValue = this.inputValue + direction * step * multiplier;
      } else if (e.keyCode === 36) {
        // Home
        this.inputValue = parseFloat(this.min);
      } else if (e.keyCode === 35) {
        // End
        this.inputValue = parseFloat(this.max);
      } else /* if (e.keyCode === 33 || e.keyCode === 34) */{
          // Page up/down
          var _direction = e.keyCode === 34 ? -1 : 1;
          this.inputValue = this.inputValue - _direction * step * (steps > 100 ? steps / 10 : 10);
        }
    },
    onKeyUp: function onKeyUp(e) {
      this.keyPressed = 0;
    },
    sliderMove: function sliderMove(e) {
      if (!this.isActive) {
        this.onMouseMove(e);
      }
    },
    genThumbLabel: function genThumbLabel(h) {
      return h('v-scale-transition', {
        props: { origin: 'bottom center' }
      }, [h('div', {
        staticClass: 'slider__thumb--label__container',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, [h('div', {
        staticClass: 'slider__thumb--label',
        'class': this.addBackgroundColorClassChecks({}, this.computedThumbColor)
      }, [h('span', {}, this.inputValue)])])]);
    },
    roundValue: function roundValue(value) {
      if (!this.stepNumeric) {
        return value;
      }

      // Format input value using the same number
      // of decimals places as in the step prop
      var trimmedStep = this.step.toString().trim();
      var decimals = trimmedStep.indexOf('.') > -1 ? trimmedStep.length - trimmedStep.indexOf('.') - 1 : 0;
      return 1 * (Math.round(value / this.stepNumeric) * this.stepNumeric).toFixed(decimals);
    },
    genThumbContainer: function genThumbContainer(h) {
      var children = [];
      children.push(h('div', {
        staticClass: 'slider__thumb',
        'class': this.addBackgroundColorClassChecks({}, this.computedThumbColor)
      }));

      this.thumbLabel && children.push(this.genThumbLabel(h));

      return h('div', {
        staticClass: 'slider__thumb-container',
        'class': {
          'slider__thumb-container--label': this.thumbLabel
        },
        style: this.thumbStyles,
        on: {
          touchstart: this.onMouseDown,
          mousedown: this.onMouseDown
        },
        ref: 'thumb'
      }, children);
    },
    genSteps: function genSteps(h) {
      var _this = this;

      var ticks = Object(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["c" /* createRange */])(this.numTicks + 1).map(function (i) {
        var span = h('span', {
          key: i,
          staticClass: 'slider__tick',
          style: {
            left: i * (100 / _this.numTicks) + '%'
          }
        });

        return span;
      });

      return h('div', {
        staticClass: 'slider__ticks-container',
        style: this.tickContainerStyles
      }, ticks);
    },
    genTrackContainer: function genTrackContainer(h) {
      var children = [h('div', {
        staticClass: 'slider__track',
        'class': this.addBackgroundColorClassChecks({}, this.computedTrackColor),
        style: this.trackStyles
      }), h('div', {
        staticClass: 'slider__track-fill',
        'class': this.addBackgroundColorClassChecks(),
        style: this.trackFillStyles
      })];

      return h('div', {
        staticClass: 'slider__track__container',
        ref: 'track'
      }, children);
    }
  },

  render: function render(h) {
    var _this2 = this;

    var children = [];

    children.push(this.genTrackContainer(h));
    this.step && this.ticks && children.push(this.genSteps(h));
    children.push(this.genThumbContainer(h));

    var slider = h('div', {
      staticClass: 'slider'
    }, children);

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.disabled ? -1 : this.tabindex
      },
      on: Object.assign({}, {
        mouseup: this.sliderMove,
        keydown: this.onKeyDown,
        keyup: this.onKeyUp
      }, this.$listeners),
      directives: [{
        name: 'click-outside',
        value: function value() {
          return _this2.isActive = false;
        }
      }]
    });
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSnackbar__ = __webpack_require__(219);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */]);

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_snackbars_styl__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_snackbars_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_snackbars_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_positionable__ = __webpack_require__(12);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-snackbar',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3__mixins_positionable__["b" /* factory */])(['absolute', 'top', 'bottom', 'left', 'right'])],

  data: function data() {
    return {
      activeTimeout: {}
    };
  },


  props: {
    autoHeight: Boolean,
    multiLine: Boolean,
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--auto-height': this.autoHeight,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--multi-line': this.multiLine && !this.vertical,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--vertical': this.vertical
      };
    }
  },

  watch: {
    isActive: function isActive() {
      this.setTimeout();
    }
  },

  methods: {
    setTimeout: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var _this = this;

      clearTimeout(this.activeTimeout);

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(function () {
          _this.isActive = false;
        }, this.timeout);
      }
    })
  },

  mounted: function mounted() {
    this.setTimeout();
  },
  render: function render(h) {
    var children = [];

    if (this.isActive) {
      children.push(h('div', {
        staticClass: 'snack',
        class: this.classes,
        on: this.$listeners
      }, [h('div', {
        staticClass: 'snack__wrapper',
        class: this.addBackgroundColorClassChecks()
      }, [h('div', {
        staticClass: 'snack__content'
      }, this.$slots.default)])]));
    }

    return h('transition', {
      attrs: { name: 'snack-transition' }
    }, children);
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__ = __webpack_require__(222);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */]);

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_speed_dial_styl__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_speed_dial_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_speed_dial_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__ = __webpack_require__(8);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-speed-dial',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__["a" /* default */]],

  directives: { ClickOutside: __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__["a" /* default */] },

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: function validator(val) {
        return ['top', 'right', 'bottom', 'left'].includes(val);
      }
    },
    openOnHover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'speed-dial': true,
        'speed-dial--top': this.top,
        'speed-dial--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'speed-dial--absolute': this.absolute,
        'speed-dial--fixed': this.fixed
      }, 'speed-dial--direction-' + this.direction, true);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [];
    var data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside',
        value: function value() {
          return _this.isActive = false;
        }
      }],
      on: {
        click: function click() {
          return _this.isActive = !_this.isActive;
        }
      }
    };

    if (this.openOnHover) {
      data.on.mouseenter = function () {
        return _this.isActive = true;
      };
      data.on.mouseleave = function () {
        return _this.isActive = false;
      };
    }

    if (this.isActive) {
      children = (this.$slots.default || []).map(function (b, i) {
        b.key = i;

        return b;
      });
    }

    var list = h('transition-group', {
      'class': 'speed-dial__list',
      props: {
        name: this.transition,
        mode: this.mode,
        origin: this.origin,
        tag: 'div'
      }
    }, children);

    return h('div', data, [this.$slots.activator, list]);
  }
});

/***/ }),
/* 223 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VStepperHeader */
/* unused harmony export VStepperItems */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VStepper__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VStepperStep__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VStepperContent__ = __webpack_require__(228);
/* unused harmony reexport VStepper */
/* unused harmony reexport VStepperContent */
/* unused harmony reexport VStepperStep */





var VStepperHeader = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('stepper__header');
var VStepperItems = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('stepper__items');



/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a" /* default */]);
  Vue.component(VStepperHeader.name, VStepperHeader);
  Vue.component(VStepperItems.name, VStepperItems);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */]);

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_steppers_styl__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_steppers_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_steppers_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      stepClick: this.stepClick
    };
  },
  data: function data() {
    return {
      inputValue: null,
      isBooted: false,
      steps: [],
      content: [],
      isReverse: false
    };
  },


  props: {
    nonLinear: Boolean,
    altLabels: Boolean,
    vertical: Boolean,
    value: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper': true,
        'stepper--is-booted': this.isBooted,
        'stepper--vertical': this.vertical,
        'stepper--alt-labels': this.altLabels,
        'stepper--non-linear': this.nonLinear,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  watch: {
    inputValue: function inputValue(val, prev) {
      this.isReverse = Number(val) < Number(prev);
      for (var index = this.steps.length; --index >= 0;) {
        this.steps[index].toggle(this.inputValue);
      }
      for (var _index = this.content.length; --_index >= 0;) {
        this.content[_index].toggle(this.inputValue, this.isReverse);
      }

      this.$emit('input', this.inputValue);
      prev && (this.isBooted = true);
    },
    value: function value() {
      var _this = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this.inputValue = _this.value;
      });
    }
  },

  mounted: function mounted() {
    this.getSteps();

    this.inputValue = this.value || this.steps[0].step || 1;
  },


  methods: {
    getSteps: function getSteps() {
      this.steps = [];
      this.content = [];
      for (var index = 0; index < this.$children.length; index++) {
        var child = this.$children[index];
        if (child.$options._componentTag === 'v-stepper-step') {
          this.steps.push(child);
        } else if (child.$options._componentTag === 'v-stepper-content') {
          child.isVertical = this.vertical;
          this.content.push(child);
        }
      }
    },
    stepClick: function stepClick(step) {
      var _this2 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this2.inputValue = step;
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default);
  }
});

/***/ }),
/* 226 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_ripple__ = __webpack_require__(17);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper-step',

  components: { VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */] },

  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_1__directives_ripple__["a" /* default */] },

  inject: ['stepClick'],

  data: function data() {
    return {
      isActive: false,
      isInactive: true
    };
  },


  props: {
    complete: Boolean,
    completeIcon: {
      type: String,
      default: 'check'
    },
    editIcon: {
      type: String,
      default: 'edit'
    },
    errorIcon: {
      type: String,
      default: 'warning'
    },
    editable: Boolean,
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    step: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable,
        'stepper__step--inactive': this.isInactive,
        'stepper__step--error': this.hasError,
        'stepper__step--complete': this.complete,
        'error--text': this.hasError
      };
    },
    hasError: function hasError() {
      return this.rules.some(function (i) {
        return i() !== true;
      });
    }
  },

  methods: {
    click: function click(e) {
      e.stopPropagation();

      if (this.editable) {
        this.stepClick(this.step);
      }
    },
    toggle: function toggle(step) {
      this.isActive = step.toString() === this.step.toString();
      this.isInactive = Number(step) < Number(this.step);
    }
  },

  render: function render(h) {
    var data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: { click: this.click }
    };
    var stepContent = void 0;

    if (this.hasError) {
      stepContent = [h('v-icon', {}, this.errorIcon)];
    } else if (this.complete) {
      if (this.editable) {
        stepContent = [h('v-icon', {}, this.editIcon)];
      } else {
        stepContent = [h('v-icon', {}, this.completeIcon)];
      }
    } else {
      stepContent = this.step;
    }

    var step = h('span', {
      staticClass: 'stepper__step__step',
      'class': {
        'primary': !this.hasError && (this.complete || this.isActive)
      }
    }, stepContent);

    var label = h('div', {
      staticClass: 'stepper__label'
    }, this.$slots.default);

    return h('div', data, [step, label]);
  }
});

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(7);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper-content',

  components: {
    VTabTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["f" /* VTabTransition */],
    VTabReverseTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["e" /* VTabReverseTransition */]
  },

  data: function data() {
    return {
      height: 0,
      // Must be null to allow
      // previous comparison
      isActive: null,
      isReverse: false,
      isVertical: false
    };
  },


  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'stepper__content': true
      };
    },
    computedTransition: function computedTransition() {
      return this.isReverse ? 'v-tab-reverse-transition' : 'v-tab-transition';
    },
    styles: function styles() {
      if (!this.isVertical) return {};

      return {
        height: !isNaN(this.height) ? this.height + 'px' : this.height
      };
    },
    wrapperClasses: function wrapperClasses() {
      return {
        'stepper__wrapper': true
      };
    }
  },

  watch: {
    isActive: function isActive(current, previous) {
      // If active and the previous state
      // was null, is just booting up
      if (current && previous == null) {
        return this.height = 'auto';
      }

      if (!this.isVertical) return;

      if (this.isActive) this.enter();else this.leave();
    }
  },

  mounted: function mounted() {
    this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
  },


  methods: {
    onTransition: function onTransition(e) {
      if (!this.isActive || e.propertyName !== 'height') return;

      this.height = 'auto';
    },
    enter: function enter() {
      var _this = this;

      var scrollHeight = 0;

      // Render bug with height
      requestAnimationFrame(function () {
        scrollHeight = _this.$refs.wrapper.scrollHeight;
      });

      this.height = 0;

      // Give the collapsing element time to collapse
      setTimeout(function () {
        return _this.height = scrollHeight || 'auto';
      }, 450);
    },
    leave: function leave() {
      var _this2 = this;

      this.height = this.$refs.wrapper.clientHeight;
      setTimeout(function () {
        return _this2.height = 0;
      }, 10);
    },
    toggle: function toggle(step, reverse) {
      this.isActive = step.toString() === this.step.toString();
      this.isReverse = reverse;
    }
  },

  render: function render(h) {
    var contentData = {
      'class': this.classes
    };
    var wrapperData = {
      'class': this.wrapperClasses,
      style: this.styles,
      ref: 'wrapper'
    };

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive
      }];
    }

    var wrapper = h('div', wrapperData, [this.$slots.default]);
    var content = h('div', contentData, [wrapper]);

    return h(this.computedTransition, {
      on: this.$listeners
    }, [content]);
  }
});

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSubheader__ = __webpack_require__(230);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */]);

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_subheaders_styl__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_subheaders_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_subheaders_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-subheader',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;

    data.staticClass = ('subheader ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' subheader--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('li', data, children);
  }
});

/***/ }),
/* 231 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSwitch__ = __webpack_require__(233);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */]);

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylus_components_switch_styl__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stylus_components_switch_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stylus_components_switch_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_selectable__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_touch__ = __webpack_require__(9);




// Mixins



// Directives


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-switch',

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_selectable__["a" /* default */]],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_5__directives_touch__["a" /* default */] },

  computed: {
    classes: function classes() {
      var classes = {
        'input-group--selection-controls switch': true
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    rippleClasses: function rippleClasses() {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      };
    },
    containerClasses: function containerClasses() {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled
      };
    },
    toggleClasses: function toggleClasses() {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      };
    }
  },

  methods: {
    onSwipeLeft: function onSwipeLeft() {
      if (this.isActive) this.toggle();
    },
    onSwipeRight: function onSwipeRight() {
      if (!this.isActive) this.toggle();
    }
  },

  render: function render(h) {
    var container = h('div', {
      'class': this.containerClasses
    }, [h('div', { 'class': this.toggleClasses }), this.genRipple({
      directives: [{
        name: 'touch',
        value: {
          left: this.onSwipeLeft,
          right: this.onSwipeRight
        }
      }]
    })]);

    return this.genInputGroup([container]);
  }
});

/***/ }),
/* 234 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSystemBar__ = __webpack_require__(236);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */]);

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_system_bars_styl__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_system_bars_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_system_bars_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-system-bar',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a" /* default */])('bar', ['height', 'window']), __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  props: {
    height: {
      type: [Number, String],
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks(Object.assign({
        'system-bar--lights-out': this.lightsOut,
        'system-bar--absolute': this.absolute,
        'system-bar--fixed': !this.absolute && (this.app || this.fixed),
        'system-bar--status': this.status,
        'system-bar--window': this.window
      }, this.themeClasses));
    },
    computedHeight: function computedHeight() {
      if (this.height) return parseInt(this.height);

      return this.window ? 32 : 24;
    }
  },

  methods: {
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication: function updateApplication() {
      return this.computedHeight;
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'system-bar',
      'class': this.classes,
      style: {
        height: this.computedHeight + 'px'
      }
    };

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 237 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTabs__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VTab__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VTabsItems__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VTabItem__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VTabsSlider__ = __webpack_require__(65);
/* unused harmony reexport VTabs */
/* unused harmony reexport VTabItem */
/* unused harmony reexport VTab */
/* unused harmony reexport VTabsItems */
/* unused harmony reexport VTabsSlider */








/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VTab__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VTab__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VTabsItems__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VTabsItems__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VTabItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VTabItem__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VTabsSlider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VTabsSlider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */]);

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tabs_styl__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tabs_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_tabs_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VTabsItems__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VTabsSlider__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_tabs_computed__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_tabs_generators__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_tabs_props__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_tabs_touch__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_tabs_watchers__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mixins_ssr_bootable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_resize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_touch__ = __webpack_require__(9);
// Styles


// Component imports




// Component level mixins






// Mixins





// Directives



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */],
    VTabsItems: __WEBPACK_IMPORTED_MODULE_2__VTabsItems__["a" /* default */],
    VTabsSlider: __WEBPACK_IMPORTED_MODULE_3__VTabsSlider__["a" /* default */]
  },

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_12__mixins_registrable__["b" /* provide */])('tabs'), __WEBPACK_IMPORTED_MODULE_9__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__mixins_ssr_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_tabs_computed__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_tabs_props__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_tabs_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_tabs_touch__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_tabs_watchers__["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__mixins_themeable__["a" /* default */]],

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_13__directives_resize__["a" /* default */],
    Touch: __WEBPACK_IMPORTED_MODULE_14__directives_touch__["a" /* default */]
  },

  provide: function provide() {
    return {
      tabClick: this.tabClick,
      tabProxy: this.tabProxy,
      registerItems: this.registerItems,
      unregisterItems: this.unregisterItems
    };
  },
  data: function data() {
    return {
      bar: [],
      content: [],
      isBooted: false,
      isOverflowing: false,
      lazyValue: this.value,
      nextIconVisible: false,
      prevIconVisible: false,
      resizeTimeout: null,
      reverse: false,
      scrollOffset: 0,
      sliderWidth: null,
      sliderLeft: null,
      startX: 0,
      tabsContainer: null,
      tabs: [],
      tabItems: null,
      transitionTime: 300
    };
  },


  methods: {
    checkPrevIcon: function checkPrevIcon() {
      return this.scrollOffset > 0;
    },
    checkNextIcon: function checkNextIcon() {
      // Check one scroll ahead to know the width of right-most item
      var container = this.$refs.container;
      var wrapper = this.$refs.wrapper;

      return container.clientWidth > this.scrollOffset + wrapper.clientWidth;
    },
    callSlider: function callSlider() {
      this.setOverflow();
      if (this.hideSlider || !this.activeTab) return false;

      // Give screen time to paint
      var action = this.activeTab.action;
      var activeTab = action === this.activeTab ? this.activeTab : this.tabs.find(function (tab) {
        return tab.action === action;
      });

      if (!activeTab) return;
      this.sliderWidth = activeTab.$el.scrollWidth;
      this.sliderLeft = activeTab.$el.offsetLeft;
    },

    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     */
    onContainerResize: function onContainerResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.callSlider, this.transitionTime);
    },
    onResize: function onResize() {
      if (this._isDestroyed) return;

      this.callSlider();
      this.scrollIntoView();
    },
    overflowCheck: function overflowCheck(e, fn) {
      this.isOverflowing && fn(e);
    },
    scrollTo: function scrollTo(direction) {
      this.scrollOffset = this.newOffset(direction);
    },
    setOverflow: function setOverflow() {
      this.isOverflowing = this.$refs.bar.clientWidth < this.$refs.container.clientWidth;
    },
    findActiveLink: function findActiveLink() {
      var _this = this;

      if (!this.tabs.length || this.lazyValue) return;

      var activeIndex = this.tabs.findIndex(function (tabItem, index) {
        var id = tabItem.action === tabItem ? index.toString() : tabItem.action;
        return id === _this.lazyValue || tabItem.$el.firstChild.className.indexOf(_this.activeClass) > -1;
      });

      var index = activeIndex > -1 ? activeIndex : 0;
      var tab = this.tabs[index];

      /* istanbul ignore next */
      // There is not a reliable way to test
      this.inputValue = tab.action === tab ? index : tab.action;
    },
    parseNodes: function parseNodes() {
      var item = [];
      var items = [];
      var slider = [];
      var tab = [];
      var length = (this.$slots.default || []).length;

      for (var i = 0; i < length; i++) {
        var vnode = this.$slots.default[i];

        /* istanbul ignore else */
        if (vnode.componentOptions) {
          switch (vnode.componentOptions.Ctor.options.name) {
            case 'v-tabs-slider':
              slider.push(vnode);
              break;
            case 'v-tabs-items':
              items.push(vnode);
              break;
            case 'v-tab-item':
              item.push(vnode);
              break;
            // case 'v-tab' - intentionally omitted
            default:
              tab.push(vnode);
          }
        }
      }

      return { tab: tab, slider: slider, items: items, item: item };
    },
    register: function register(options) {
      this.tabs.push(options);
    },
    scrollIntoView: function scrollIntoView() {
      if (!this.activeTab) return false;

      var _activeTab$$el = this.activeTab.$el,
          clientWidth = _activeTab$$el.clientWidth,
          offsetLeft = _activeTab$$el.offsetLeft;

      var wrapperWidth = this.$refs.wrapper.clientWidth;
      var totalWidth = wrapperWidth + this.scrollOffset;
      var itemOffset = clientWidth + offsetLeft;
      var additionalOffset = clientWidth * 0.3;

      /* instanbul ignore else */
      if (offsetLeft < this.scrollOffset) {
        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0);
      } else if (totalWidth < itemOffset) {
        this.scrollOffset -= totalWidth - itemOffset - additionalOffset;
      }
    },
    tabClick: function tabClick(tab) {
      this.inputValue = tab.action === tab ? this.tabs.indexOf(tab) : tab.action;
      this.scrollIntoView();
    },
    tabProxy: function tabProxy(val) {
      this.inputValue = val;
    },
    registerItems: function registerItems(fn) {
      this.tabItems = fn;
    },
    unregisterItems: function unregisterItems() {
      this.tabItems = null;
    },
    unregister: function unregister(tab) {
      this.tabs = this.tabs.filter(function (o) {
        return o !== tab;
      });
    },
    updateTabs: function updateTabs() {
      for (var index = this.tabs.length; --index >= 0;) {
        this.tabs[index].toggle(this.target);
      }

      this.setOverflow();
    }
  },

  mounted: function mounted() {
    this.prevIconVisible = this.checkPrevIcon();
    this.nextIconVisible = this.checkNextIcon();
  },
  render: function render(h) {
    var _parseNodes = this.parseNodes(),
        tab = _parseNodes.tab,
        slider = _parseNodes.slider,
        items = _parseNodes.items,
        item = _parseNodes.item;

    return h('div', {
      staticClass: 'tabs',
      directives: [{
        name: 'resize',
        arg: 400,
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]), this.genItems(items, item)]);
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Tabs computed
 *
 * @mixin
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    activeIndex: function activeIndex() {
      var _this = this;

      return this.tabs.findIndex(function (tab, index) {
        var id = tab.action === tab ? index.toString() : tab.action;
        return id === _this.lazyValue;
      });
    },
    activeTab: function activeTab() {
      if (!this.tabs.length) return undefined;

      return this.tabs[this.activeIndex];
    },
    containerStyles: function containerStyles() {
      return this.height ? {
        height: parseInt(this.height, 10) + 'px'
      } : null;
    },
    hasArrows: function hasArrows() {
      return (this.showArrows || !this.isMobile) && this.isOverflowing;
    },

    inputValue: {
      get: function get() {
        return this.lazyValue;
      },
      set: function set(val) {
        // Always use strings
        val = val.toString();

        this.lazyValue = val;
        this.$emit('input', val);
      }
    },
    isMobile: function isMobile() {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint;
    },
    sliderStyles: function sliderStyles() {
      return {
        left: this.sliderLeft + 'px',
        transition: this.sliderLeft != null ? null : 'none',
        width: this.sliderWidth + 'px'
      };
    },
    target: function target() {
      return this.activeTab ? this.activeTab.action : null;
    }
  }
});

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Tabs generators
 *
 * @mixin
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genBar: function genBar(items) {
      return this.$createElement('div', {
        staticClass: 'tabs__bar',
        'class': this.addBackgroundColorClassChecks({
          'theme--dark': this.dark,
          'theme--light': this.light
        }),
        ref: 'bar'
      }, [this.genTransition('prev'), this.genWrapper(this.genContainer(items)), this.genTransition('next')]);
    },
    genContainer: function genContainer(items) {
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        class: {
          'tabs__container--align-with-title': this.alignWithTitle,
          'tabs__container--centered': this.centered,
          'tabs__container--fixed-tabs': this.fixedTabs,
          'tabs__container--grow': this.grow,
          'tabs__container--icons-and-text': this.iconsAndText,
          'tabs__container--overflow': this.isOverflowing,
          'tabs__container--right': this.right
        },
        style: this.containerStyles,
        ref: 'container'
      }, items);
    },
    genIcon: function genIcon(direction) {
      var _this = this;

      if (!this.hasArrows || !this[direction + 'IconVisible']) return null;

      return this.$createElement('v-icon', {
        staticClass: 'tabs__icon tabs__icon--' + direction,
        props: {
          disabled: !this[direction + 'IconVisible']
        },
        on: {
          click: function click() {
            return _this.scrollTo(direction);
          }
        }
      }, this[direction + 'Icon']);
    },
    genItems: function genItems(items, item) {
      if (items.length > 0) return items;
      if (!item.length) return null;

      return this.$createElement('v-tabs-items', item);
    },
    genTransition: function genTransition(direction) {
      return this.$createElement('transition', {
        props: { name: 'fade-transition' }
      }, [this.genIcon(direction)]);
    },
    genWrapper: function genWrapper(items) {
      var _this2 = this;

      return this.$createElement('div', {
        staticClass: 'tabs__wrapper',
        class: {
          'tabs__wrapper--show-arrows': this.hasArrows
        },
        ref: 'wrapper',
        directives: [{
          name: 'touch',
          value: {
            start: function start(e) {
              return _this2.overflowCheck(e, _this2.onTouchStart);
            },
            move: function move(e) {
              return _this2.overflowCheck(e, _this2.onTouchMove);
            },
            end: function end(e) {
              return _this2.overflowCheck(e, _this2.onTouchEnd);
            }
          }
        }]
      }, [items]);
    },
    genSlider: function genSlider(items) {
      if (!items.length) {
        items = [this.$createElement('v-tabs-slider', {
          props: { color: this.sliderColor }
        })];
      }

      return this.$createElement('div', {
        staticClass: 'tabs__slider-wrapper',
        style: this.sliderStyles
      }, items);
    }
  }
});

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Tabs props
 *
 * @mixin
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    alignWithTitle: Boolean,
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    right: Boolean,
    showArrows: Boolean,
    sliderColor: {
      type: String,
      default: 'accent'
    },
    value: [Number, String]
  }
});

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Tabs touch
 *
 * @mixin
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    newOffset: function newOffset(direction) {
      var clientWidth = this.$refs.wrapper.clientWidth;

      if (direction === 'prev') {
        return Math.max(this.scrollOffset - clientWidth, 0);
      } else {
        return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);
      }
    },
    onTouchStart: function onTouchStart(e) {
      this.startX = this.scrollOffset + e.touchstartX;
      this.$refs.container.style.transition = 'none';
      this.$refs.container.style.willChange = 'transform';
    },
    onTouchMove: function onTouchMove(e) {
      this.scrollOffset = this.startX - e.touchmoveX;
    },
    onTouchEnd: function onTouchEnd() {
      var container = this.$refs.container;
      var wrapper = this.$refs.wrapper;
      var maxScrollOffset = container.clientWidth - wrapper.clientWidth;
      container.style.transition = null;
      container.style.willChange = null;

      /* istanbul ignore else */
      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0;
      } else if (this.scrollOffset >= maxScrollOffset) {
        this.scrollOffset = maxScrollOffset;
      }
    }
  }
});

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Tabs watchers
 *
 * @mixin
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  watch: {
    activeTab: function activeTab(tab, prev) {
      !prev && tab && this.updateTabs();

      setTimeout(this.callSlider, 0);

      if (!tab) return;

      var action = tab.action;
      this.tabItems && this.tabItems(action === tab ? this.tabs.indexOf(tab).toString() : action);
    },

    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    isBooted: 'findActiveLink',
    lazyValue: 'updateTabs',
    right: 'callSlider',
    value: function value(val) {
      var tab = this.tabs.find(function (tab) {
        return tab.action === val;
      }) || this.tabs[val];

      if (!tab) return;

      this.tabClick(tab);
    },

    '$vuetify.application.left': 'onContainerResize',
    '$vuetify.application.right': 'onContainerResize',
    scrollOffset: function scrollOffset(val) {
      this.$refs.container.style.transform = 'translateX(' + -val + 'px)';
      if (this.hasArrows) {
        this.prevIconVisible = this.checkPrevIcon();
        this.nextIconVisible = this.checkNextIcon();
      }
    }
  }
});

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_helpers__ = __webpack_require__(2);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mixins



// Utilities


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tab',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_registrable__["a" /* inject */])('tabs', 'v-tab', 'v-tabs'), __WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a" /* default */]],

  inject: ['tabClick'],

  data: function data() {
    return {
      isActive: false
    };
  },


  props: {
    activeClass: {
      type: String,
      default: 'tabs__item--active'
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'tabs__item': true,
        'tabs__item--disabled': this.disabled
      }, this.activeClass, !this.to && this.isActive);
    },
    action: function action() {
      var to = this.to || this.href;

      if (typeof to === 'string') return to.replace('#', '');
      if (to === Object(to) && to.hasOwnProperty('path')) return to.path;

      return this;
    }
  },

  watch: {
    $route: 'onRouteChange'
  },

  mounted: function mounted() {
    this.tabs.register(this);
    this.onRouteChange();
  },
  beforeDestroy: function beforeDestroy() {
    this.tabs.unregister(this);
  },


  methods: {
    click: function click(e) {
      // If user provides an
      // actual link, do not
      // prevent default
      if (this.href && this.href.indexOf('#') > -1) e.preventDefault();

      this.$emit('click', e);

      this.to || this.tabClick(this);
    },
    onRouteChange: function onRouteChange() {
      var _this = this;

      if (!this.to || !this.$refs.link) return;

      var path = '_vnode.data.class.' + this.activeClass;

      this.$nextTick(function () {
        if (Object(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["h" /* getObjectValueByPath */])(_this.$refs.link, path)) {
          _this.tabClick(_this);
        }
      });
    },
    toggle: function toggle(action) {
      this.isActive = action === this || action === this.action;
    }
  },

  render: function render(h) {
    var link = this.generateRouteLink();
    var data = link.data;

    // If disabled, use div as anchor tags do not support
    // being disabled

    var tag = this.disabled ? 'div' : link.tag;

    data.ref = 'link';

    return h('div', {
      staticClass: 'tabs__div'
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_registrable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_touch__ = __webpack_require__(9);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tab-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_2__mixins_registrable__["a" /* inject */])('tabs', 'v-tab-item', 'v-tabs-items')],

  components: {
    VTabTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["f" /* VTabTransition */],
    VTabReverseTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["e" /* VTabReverseTransition */]
  },

  directives: {
    Touch: __WEBPACK_IMPORTED_MODULE_3__directives_touch__["a" /* default */]
  },

  data: function data() {
    return {
      isActive: false,
      reverse: false
    };
  },


  props: {
    id: String,
    transition: {
      type: [Boolean, String],
      default: 'tab-transition'
    },
    reverseTransition: {
      type: [Boolean, String],
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    toggle: function toggle(target, reverse, showTransition, index) {
      this.$el.style.transition = !showTransition ? 'none' : null;
      this.reverse = reverse;
      this.isActive = (this.id || index.toString()) === target;
    }
  },

  mounted: function mounted() {
    this.tabs.register(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.tabs.unregister(this);
  },
  render: function render(h) {
    var data = {
      staticClass: 'tabs__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      domProps: { id: this.id },
      on: this.$listeners
    };

    var div = h('div', data, this.showLazyContent(this.$slots.default));

    if (!this.computedTransition) return div;

    return h('transition', {
      props: { name: this.computedTransition }
    }, [div]);
  }
});

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTextField__ = __webpack_require__(249);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */]);

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_text_fields_styl__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stylus_components_text_fields_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_text_fields_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_input__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_maskable__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_soloable__ = __webpack_require__(52);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles



// Mixins





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-text-field',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_maskable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_soloable__["a" /* default */]],

  inheritAttrs: false,

  data: function data() {
    return {
      initialValue: null,
      inputHeight: null,
      internalChange: false,
      badInput: false
    };
  },


  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    box: Boolean,
    clearable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    counter: [Boolean, Number, String],
    fullWidth: Boolean,
    multiLine: Boolean,
    noResize: Boolean,
    placeholder: String,
    prefix: String,
    rowHeight: {
      type: [Number, String],
      default: 24,
      validator: function validator(v) {
        return !isNaN(parseFloat(v));
      }
    },
    rows: {
      type: [Number, String],
      default: 5,
      validator: function validator(v) {
        return !isNaN(parseInt(v, 10));
      }
    },
    singleLine: Boolean,
    suffix: String,
    textarea: Boolean,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes: function classes() {
      var classes = _extends({}, this.genSoloClasses(), {
        'input-group--text-field': true,
        'input-group--text-field-box': this.box,
        'input-group--single-line': this.singleLine || this.isSolo,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth,
        'input-group--no-resize': this.noResizeHandle,
        'input-group--prefix': this.prefix,
        'input-group--suffix': this.suffix,
        'input-group--textarea': this.textarea
      });

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    count: function count() {
      var inputLength = void 0;
      if (this.inputValue) inputLength = this.inputValue.toString().length;else inputLength = 0;

      return inputLength + ' / ' + this.counterLength;
    },
    counterLength: function counterLength() {
      var parsedLength = parseInt(this.counter, 10);
      return isNaN(parsedLength) ? 25 : parsedLength;
    },

    inputValue: {
      get: function get() {
        return this.lazyValue;
      },
      set: function set(val) {
        if (this.mask) {
          this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)));
          this.setSelectionRange();
        } else {
          this.lazyValue = val;
          this.$emit('input', this.lazyValue);
        }
      }
    },
    isDirty: function isDirty() {
      return this.lazyValue != null && this.lazyValue.toString().length > 0 || this.badInput || ['time', 'date', 'datetime-local', 'week', 'month'].includes(this.type);
    },
    isTextarea: function isTextarea() {
      return this.multiLine || this.textarea;
    },
    noResizeHandle: function noResizeHandle() {
      return this.isTextarea && (this.noResize || this.shouldAutoGrow);
    },
    shouldAutoGrow: function shouldAutoGrow() {
      return this.isTextarea && this.autoGrow;
    }
  },

  watch: {
    isFocused: function isFocused(val) {
      if (val) {
        this.initialValue = this.lazyValue;
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue);
      }
    },
    value: function value(val) {
      var _this = this;

      if (this.mask && !this.internalChange) {
        var masked = this.maskText(this.unmaskText(val));
        this.lazyValue = this.unmaskText(masked);

        // Emit when the externally set value was modified internally
        String(val) !== this.lazyValue && this.$nextTick(function () {
          _this.$refs.input.value = masked;
          _this.$emit('input', _this.lazyValue);
        });
      } else this.lazyValue = val;

      if (this.internalChange) this.internalChange = false;

      !this.validateOnBlur && this.validate();
      this.shouldAutoGrow && this.calculateInputHeight();
    }
  },

  mounted: function mounted() {
    this.shouldAutoGrow && this.calculateInputHeight();
    this.autofocus && this.focus();
  },


  methods: {
    calculateInputHeight: function calculateInputHeight() {
      var _this2 = this;

      this.inputHeight = null;

      this.$nextTick(function () {
        var height = _this2.$refs.input ? _this2.$refs.input.scrollHeight : 0;
        var minHeight = parseInt(_this2.rows, 10) * parseFloat(_this2.rowHeight);
        _this2.inputHeight = Math.max(minHeight, height);
      });
    },
    onInput: function onInput(e) {
      this.mask && this.resetSelections(e.target);
      this.inputValue = e.target.value;
      this.badInput = e.target.validity && e.target.validity.badInput;
      this.shouldAutoGrow && this.calculateInputHeight();
    },
    blur: function blur(e) {
      var _this3 = this;

      this.isFocused = false;
      // Reset internalChange state
      // to allow external change
      // to persist
      this.internalChange = false;

      this.$nextTick(function () {
        _this3.validate();
      });
      this.$emit('blur', e);
    },
    focus: function focus(e) {
      if (!this.$refs.input) return;

      this.isFocused = true;
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus();
      }
      this.$emit('focus', e);
    },
    keyDown: function keyDown(e) {
      // Prevents closing of a
      // dialog when pressing
      // enter
      if (this.isTextarea && this.isFocused && e.keyCode === 13) {
        e.stopPropagation();
      }

      this.internalChange = true;
    },
    genCounter: function genCounter() {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': this.hasError
        }
      }, this.count);
    },
    genInput: function genInput() {
      var tag = this.isTextarea ? 'textarea' : 'input';
      var listeners = Object.assign({}, this.$listeners);
      delete listeners['change']; // Change should not be bound externally

      var data = {
        style: {},
        domProps: {
          value: this.maskText(this.lazyValue)
        },
        attrs: _extends({}, this.$attrs, {
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          readonly: this.readonly,
          tabindex: this.tabindex,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
        }),
        on: Object.assign(listeners, {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus,
          keydown: this.keyDown
        }),
        ref: 'input'
      };

      if (this.shouldAutoGrow) {
        data.style.height = this.inputHeight && this.inputHeight + 'px';
      }

      if (this.placeholder) data.attrs.placeholder = this.placeholder;

      if (!this.isTextarea) {
        data.attrs.type = this.type;
      } else {
        data.attrs.rows = this.rows;
      }

      if (this.mask) {
        data.attrs.maxlength = this.masked.length;
      }

      var children = [this.$createElement(tag, data)];

      this.prefix && children.unshift(this.genFix('prefix'));
      this.suffix && children.push(this.genFix('suffix'));

      return children;
    },
    genFix: function genFix(type) {
      return this.$createElement('span', {
        'class': 'input-group--text-field__' + type
      }, this[type]);
    },
    clearableCallback: function clearableCallback() {
      var _this4 = this;

      this.inputValue = null;
      this.$nextTick(function () {
        return _this4.$refs.input.focus();
      });
    }
  },

  render: function render() {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } });
  }
});

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTimePicker__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VTimePickerTitle__ = __webpack_require__(66);
/* unused harmony reexport VTimePicker */
/* unused harmony reexport VTimePickerClock */
/* unused harmony reexport VTimePickerTitle */






/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VTimePickerTitle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VTimePickerTitle__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */]);

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTimePickerTitle__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_picker__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__ = __webpack_require__(23);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Components



// Mixins


// Utils



var rangeHours24 = Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createRange */])(24);
var rangeHours12am = Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createRange */])(12);
var rangeHours12pm = rangeHours12am.map(function (v) {
  return v + 12;
});
var rangeMinutes = Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createRange */])(60);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-time-picker',

  components: {
    VTimePickerTitle: __WEBPACK_IMPORTED_MODULE_0__VTimePickerTitle__["a" /* default */],
    VTimePickerClock: __WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_picker__["a" /* default */]],

  data: function data() {
    return {
      inputHour: null,
      inputMinute: null,
      period: 'am',
      selectingHour: true
    };
  },


  props: {
    allowedHours: Function,
    allowedMinutes: Function,
    format: {
      type: String,
      default: 'ampm',
      validator: function validator(val) {
        return ['ampm', '24hr'].includes(val);
      }
    },
    min: String,
    max: String,
    scrollable: Boolean,
    value: null
  },

  computed: {
    isAllowedHourCb: function isAllowedHourCb() {
      var _this = this;

      if (!this.min && !this.max) return this.allowedHours;

      var minHour = this.min ? this.min.split(':')[0] : 0;
      var maxHour = this.max ? this.max.split(':')[0] : 23;

      return function (val) {
        return val >= minHour * 1 && val <= maxHour * 1 && (!_this.allowedHours || _this.allowedHours(val));
      };
    },
    isAllowedMinuteCb: function isAllowedMinuteCb() {
      var _this2 = this;

      var isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour);
      if (!this.min && !this.max) {
        return isHourAllowed ? this.allowedMinutes : function () {
          return false;
        };
      }

      var _ref = this.min ? this.min.split(':') : [0, 0],
          _ref2 = _slicedToArray(_ref, 2),
          minHour = _ref2[0],
          minMinute = _ref2[1];

      var _ref3 = this.max ? this.max.split(':') : [23, 59],
          _ref4 = _slicedToArray(_ref3, 2),
          maxHour = _ref4[0],
          maxMinute = _ref4[1];

      var minTime = minHour * 60 + minMinute * 1;
      var maxTime = maxHour * 60 + maxMinute * 1;

      return function (val) {
        var time = 60 * _this2.inputHour + val;
        return time >= minTime && time <= maxTime && isHourAllowed && (!_this2.allowedMinutes || _this2.allowedMinutes(val));
      };
    },
    isAmPm: function isAmPm() {
      return this.format === 'ampm';
    }
  },

  watch: {
    value: 'setInputData'
  },

  methods: {
    emitValue: function emitValue() {
      if (this.inputHour != null && this.inputMinute != null) {
        this.$emit('input', Object(__WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__["a" /* default */])(this.inputHour) + ':' + Object(__WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__["a" /* default */])(this.inputMinute));
      }
    },
    setPeriod: function setPeriod(period) {
      this.period = period;
      if (this.inputHour != null) {
        var newHour = this.inputHour + (period === 'am' ? -12 : 12);
        this.inputHour = this.firstAllowed('hour', newHour);
        this.emitValue();
      }
    },
    setInputData: function setInputData(value) {
      if (value == null) {
        this.inputHour = null;
        this.inputMinute = null;
        return;
      }

      if (value instanceof Date) {
        this.inputHour = value.getHours();
        this.inputMinute = value.getMinutes();
      } else {
        var _ref5 = value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || [],
            _ref6 = _slicedToArray(_ref5, 5),
            hour = _ref6[1],
            minute = _ref6[2],
            period = _ref6[4];

        this.inputHour = period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10);
        this.inputMinute = parseInt(minute, 10);
      }

      this.period = this.inputHour < 12 ? 'am' : 'pm';
    },
    convert24to12: function convert24to12(hour) {
      return hour ? (hour - 1) % 12 + 1 : 12;
    },
    convert12to24: function convert12to24(hour, period) {
      return hour % 12 + (period === 'pm' ? 12 : 0);
    },
    onInput: function onInput(value) {
      if (this.selectingHour) {
        this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value;
      } else {
        this.inputMinute = value;
      }
      this.emitValue();
    },
    onChange: function onChange() {
      if (!this.selectingHour) {
        this.$emit('change', this.value);
      }

      this.selectingHour = !this.selectingHour;
    },
    firstAllowed: function firstAllowed(type, value) {
      var allowedFn = type === 'hour' ? this.isAllowedHourCb : this.isAllowedMinuteCb;
      if (!allowedFn) return value;

      // TODO: clean up
      var range = type === 'minute' ? rangeMinutes : this.isAmPm ? value < 12 ? rangeHours12am : rangeHours12pm : rangeHours24;
      var first = range.find(function (v) {
        return allowedFn((v + value) % range.length + range[0]);
      });
      return ((first || 0) + value) % range.length + range[0];
    },
    genClock: function genClock() {
      return this.$createElement('v-time-picker-clock', {
        props: {
          allowedValues: this.selectingHour ? this.isAllowedHourCb : this.isAllowedMinuteCb,
          color: this.color,
          dark: this.dark,
          double: this.selectingHour && !this.isAmPm,
          format: this.selectingHour ? this.isAmPm ? this.convert24to12 : function (val) {
            return val;
          } : function (val) {
            return Object(__WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__["a" /* default */])(val, 2);
          },
          max: this.selectingHour ? this.isAmPm && this.period === 'am' ? 11 : 23 : 59,
          min: this.selectingHour && this.isAmPm && this.period === 'pm' ? 12 : 0,
          scrollable: this.scrollable,
          size: this.width - (!this.fullWidth && this.landscape ? 80 : 20),
          step: this.selectingHour ? 1 : 5,
          value: this.selectingHour ? this.inputHour : this.inputMinute
        },
        on: {
          input: this.onInput,
          change: this.onChange
        },
        ref: 'clock'
      });
    },
    genPickerBody: function genPickerBody() {
      return this.$createElement('div', {
        staticClass: 'time-picker-clock__container',
        style: {
          width: this.width + 'px',
          height: this.width - (!this.fullWidth && this.landscape ? 60 : 0) + 'px'
        },
        key: this.selectingHour
      }, [this.genClock()]);
    },
    genPickerTitle: function genPickerTitle() {
      var _this3 = this;

      return this.$createElement('v-time-picker-title', {
        props: {
          ampm: this.isAmPm,
          hour: this.inputHour,
          minute: this.inputMinute,
          period: this.period,
          selectingHour: this.selectingHour
        },
        on: {
          'update:selectingHour': function updateSelectingHour(value) {
            return _this3.selectingHour = value;
          },
          'update:period': this.setPeriod
        },
        ref: 'title',
        slot: 'title'
      });
    }
  },

  mounted: function mounted() {
    this.setInputData(this.value);
  },
  render: function render(h) {
    return this.genPicker('picker--time');
  }
});

/***/ }),
/* 252 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 253 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VToolbarTitle */
/* unused harmony export VToolbarItems */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VToolbar__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__ = __webpack_require__(257);
/* unused harmony reexport VToolbar */
/* unused harmony reexport VToolbarSideIcon */





var VToolbarTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('toolbar__title');
var VToolbarItems = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('toolbar__items');



/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */]);
  Vue.component(VToolbarItems.name, VToolbarItems);
  Vue.component(VToolbarTitle.name, VToolbarTitle);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */]);

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_toolbar_styl__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_toolbar_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_toolbar_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_ssr_bootable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_scroll__ = __webpack_require__(68);
// Styles


// Mixins





// Directives


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-toolbar',

  mixins: [Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a" /* default */])('top', ['clippedLeft', 'clippedRight', 'computedHeight', 'invertedScroll', 'manualScroll']), __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_ssr_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  directives: { Scroll: __WEBPACK_IMPORTED_MODULE_5__directives_scroll__["a" /* default */] },

  data: function data() {
    return {
      activeTimeout: null,
      currentScroll: 0,
      heights: {
        mobileLandscape: 48,
        mobile: 56,
        desktop: 64,
        dense: 48
      },
      isActive: true,
      isExtended: false,
      isScrollingUp: false,
      previousScroll: null,
      previousScrollDirection: null,
      savedScroll: 0,
      target: null
    };
  },

  props: {
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    dense: Boolean,
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    flat: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    invertedScroll: Boolean,
    manualScroll: Boolean,
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    },
    tabs: Boolean
  },

  computed: {
    computedContentHeight: function computedContentHeight() {
      if (this.height) return parseInt(this.height);
      if (this.dense) return this.heights.dense;

      if (this.prominent || this.$vuetify.breakpoint.mdAndUp) return this.heights.desktop;

      if (this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) return this.heights.mobileLandscape;

      return this.heights.mobile;
    },
    computedExtensionHeight: function computedExtensionHeight() {
      if (this.tabs) return 48;
      if (this.extensionHeight) return parseInt(this.extensionHeight);

      return this.computedContentHeight;
    },
    computedHeight: function computedHeight() {
      if (!this.isExtended) return this.computedContentHeight;

      return this.computedContentHeight + this.computedExtensionHeight;
    },
    computedMarginTop: function computedMarginTop() {
      if (!this.app) return 0;

      return this.$vuetify.application.bar;
    },
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'toolbar': true,
        'elevation-0': this.flat || !this.isActive && !this.tabs,
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--clipped': this.clippedLeft || this.clippedRight,
        'toolbar--dense': this.dense,
        'toolbar--extended': this.isExtended,
        'toolbar--fixed': !this.absolute && (this.app || this.fixed),
        'toolbar--floating': this.floating,
        'toolbar--prominent': this.prominent,
        'theme--dark': this.dark,
        'theme--light': this.light
      });
    },
    computedPaddingLeft: function computedPaddingLeft() {
      if (!this.app || this.clippedLeft) return 0;

      return this.$vuetify.application.left;
    },
    computedPaddingRight: function computedPaddingRight() {
      if (!this.app || this.clippedRight) return 0;

      return this.$vuetify.application.right;
    },
    computedTransform: function computedTransform() {
      return !this.isActive ? -this.computedHeight : 0;
    },
    currentThreshold: function currentThreshold() {
      return Math.abs(this.currentScroll - this.savedScroll);
    },
    styles: function styles() {
      return {
        marginTop: this.computedMarginTop + 'px',
        paddingRight: this.computedPaddingRight + 'px',
        paddingLeft: this.computedPaddingLeft + 'px',
        transform: 'translateY(' + this.computedTransform + 'px)'
      };
    }
  },

  watch: {
    currentThreshold: function currentThreshold(val) {
      if (this.invertedScroll) {
        return this.isActive = this.currentScroll > this.scrollThreshold;
      }

      if (val < this.scrollThreshold || !this.isBooted) return;

      this.isActive = this.isScrollingUp;
      this.savedScroll = this.currentScroll;
    },
    isActive: function isActive() {
      this.savedScroll = 0;
    },
    invertedScroll: function invertedScroll(val) {
      this.isActive = !val;
    },
    manualScroll: function manualScroll(val) {
      this.isActive = !val;
    },
    isScrollingUp: function isScrollingUp(val) {
      this.savedScroll = this.savedScroll || this.currentScroll;
    }
  },

  created: function created() {
    if (this.invertedScroll || this.manualScroll) this.isActive = false;
  },
  mounted: function mounted() {
    if (this.scrollTarget) {
      this.target = document.querySelector(this.scrollTarget);
    }
  },


  methods: {
    onScroll: function onScroll() {
      if (!this.scrollOffScreen || this.manualScroll || typeof window === 'undefined') return;

      var target = this.target || window;

      this.currentScroll = this.scrollTarget ? target.scrollTop : target.pageYOffset || document.documentElement.scrollTop;

      this.isScrollingUp = this.currentScroll < this.previousScroll;

      this.previousScroll = this.currentScroll;
    },

    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication: function updateApplication() {
      return this.invertedScroll || this.manualScroll ? 0 : this.computedHeight;
    }
  },

  render: function render(h) {
    this.isExtended = this.extended || !!this.$slots.extension;

    var children = [];
    var data = {
      'class': this.classes,
      style: this.styles,
      on: this.$listeners
    };

    data.directives = [{
      arg: this.scrollTarget,
      name: 'scroll',
      value: this.onScroll
    }];

    children.push(h('div', {
      staticClass: 'toolbar__content',
      style: { height: this.computedContentHeight + 'px' },
      ref: 'content'
    }, this.$slots.default));

    if (this.isExtended) {
      children.push(h('div', {
        staticClass: 'toolbar__extension',
        style: { height: this.computedExtensionHeight + 'px' }
      }, this.$slots.extension));
    }

    return h('nav', data, children);
  }
});

/***/ }),
/* 256 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VIcon__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-toolbar-side-icon',

  functional: true,

  render: function render(h, _ref) {
    var slots = _ref.slots,
        listeners = _ref.listeners,
        props = _ref.props,
        data = _ref.data;

    var classes = data.staticClass ? data.staticClass + ' toolbar__side-icon' : 'toolbar__side-icon';

    var d = Object.assign(data, {
      staticClass: classes,
      props: Object.assign(props, {
        icon: true
      }),
      on: listeners
    });

    var defaultSlot = slots().default;

    return h(__WEBPACK_IMPORTED_MODULE_0__components_VBtn__["a" /* default */], d, defaultSlot || [h(__WEBPACK_IMPORTED_MODULE_1__components_VIcon__["a" /* default */], 'menu')]);
  }
});

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTooltip__ = __webpack_require__(259);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */]);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tooltips_styl__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tooltips_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_tooltips_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_delayable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_dependent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_detachable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_menuable__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__ = __webpack_require__(5);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// Mixins







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tooltip',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_delayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_menuable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      calculatedMinWidth: 0,
      closeDependents: false
    };
  },

  props: {
    debounce: {
      type: [Number, String],
      default: 0
    },
    disabled: Boolean,
    fixed: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: [Number, String],
      default: 200
    },
    tag: {
      type: String,
      default: 'span'
    },
    transition: String,
    zIndex: {
      default: null
    }
  },

  computed: {
    calculatedLeft: function calculatedLeft() {
      var _dimensions = this.dimensions,
          activator = _dimensions.activator,
          content = _dimensions.content;

      var unknown = !this.bottom && !this.left && !this.top && !this.right;
      var left = 0;

      if (this.top || this.bottom || unknown) {
        left = activator.left + activator.width / 2 - content.width / 2;
      } else if (this.left || this.right) {
        left = activator.left + (this.right ? activator.width : -content.width) + (this.right ? 10 : -10);
      }

      return this.calcXOverflow(left) + 'px';
    },
    calculatedTop: function calculatedTop() {
      var _dimensions2 = this.dimensions,
          activator = _dimensions2.activator,
          content = _dimensions2.content;

      var top = 0;

      if (this.top || this.bottom) {
        top = activator.top - (this.top ? activator.height : -activator.height) - (this.top ? 0 : -10);
      } else if (this.left || this.right) {
        top = activator.top + activator.height / 2 - content.height / 2;
      }

      return this.calcYOverflow(top + this.pageYOffset) + 'px';
    },
    classes: function classes() {
      return {
        'tooltip--top': this.top,
        'tooltip--right': this.right,
        'tooltip--bottom': this.bottom,
        'tooltip--left': this.left
      };
    },
    computedTransition: function computedTransition() {
      if (this.transition) return this.transition;
      if (this.top) return 'slide-y-reverse-transition';
      if (this.right) return 'slide-x-transition';
      if (this.bottom) return 'slide-y-transition';
      if (this.left) return 'slide-x-reverse-transition';
    },
    offsetY: function offsetY() {
      return this.top || this.bottom;
    },
    offsetX: function offsetX() {
      return this.left || this.right;
    },
    styles: function styles() {
      return {
        left: this.calculatedLeft,
        maxWidth: isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px',
        opacity: this.isActive ? 0.9 : 0,
        top: this.calculatedTop,
        zIndex: this.zIndex || this.activeZIndex
      };
    }
  },

  methods: {
    activate: function activate() {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions();
      // Start the transition
      requestAnimationFrame(this.startTransition);
    }
  },

  mounted: function mounted() {
    this.value && this.callActivate();
  },
  render: function render(h) {
    var _addBackgroundColorCl,
        _this = this;

    var tooltip = h('div', {
      staticClass: 'tooltip__content',
      'class': this.addBackgroundColorClassChecks((_addBackgroundColorCl = {}, _defineProperty(_addBackgroundColorCl, this.contentClass, true), _defineProperty(_addBackgroundColorCl, 'menuable__content__active', this.isActive), _addBackgroundColorCl)),
      style: this.styles,
      attrs: this.attrs,
      directives: [{
        name: 'show',
        value: this.isContentActive
      }],
      ref: 'content'
    }, this.$slots.default);

    return h(this.tag, {
      staticClass: 'tooltip',
      'class': this.classes
    }, [h('transition', {
      props: {
        name: this.computedTransition
      }
    }, [tooltip]), h('span', {
      on: this.disabled ? {} : {
        mouseenter: function mouseenter() {
          _this.runDelay('open', function () {
            return _this.isActive = true;
          });
        },
        mouseleave: function mouseleave() {
          _this.runDelay('close', function () {
            return _this.isActive = false;
          });
        }
      },
      ref: 'activator'
    }, this.$slots.activator)]);
  }
});

/***/ }),
/* 260 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__click_outside__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resize__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ripple__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scroll__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__touch__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClickOutside", function() { return __WEBPACK_IMPORTED_MODULE_0__click_outside__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ripple", function() { return __WEBPACK_IMPORTED_MODULE_2__ripple__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Resize", function() { return __WEBPACK_IMPORTED_MODULE_1__resize__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scroll", function() { return __WEBPACK_IMPORTED_MODULE_3__scroll__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return __WEBPACK_IMPORTED_MODULE_4__touch__["a"]; });








function install(Vue) {
  Vue.directive('click-outside', __WEBPACK_IMPORTED_MODULE_0__click_outside__["a" /* default */]);
  Vue.directive('ripple', __WEBPACK_IMPORTED_MODULE_2__ripple__["a" /* default */]);
  Vue.directive('resize', __WEBPACK_IMPORTED_MODULE_1__resize__["a" /* default */]);
  Vue.directive('scroll', __WEBPACK_IMPORTED_MODULE_3__scroll__["a" /* default */]);
  Vue.directive('touch', __WEBPACK_IMPORTED_MODULE_4__touch__["a" /* default */]);
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=vuetify.js.map