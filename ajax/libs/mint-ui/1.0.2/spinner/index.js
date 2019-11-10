module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(179);


/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(108)
	__vue_script__ = __webpack_require__(110)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/spinner/src/spinner/fading-circle.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(113)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 108:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(111);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'fading-circle',

	  mixins: [_common2.default],

	  created: function created() {
	    this.styleNode = document.createElement('style');
	    var css = '.circle-color-' + this._uid + ' > div::before { background-color: ' + this.spinnerColor + '; }';

	    this.styleNode.type = 'text/css';
	    this.styleNode.rel = 'stylesheet';
	    this.styleNode.title = 'fading circle style';
	    document.getElementsByTagName('head')[0].appendChild(this.styleNode);
	    this.styleNode.appendChild(document.createTextNode(css));
	  },
	  destroyed: function destroyed() {
	    if (this.styleNode) {
	      this.styleNode.parentNode.removeChild(this.styleNode);
	    }
	  }
	};

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(112)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/spinner/src/spinner/common.vue: named exports in *.vue files are ignored.")}
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 112:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  computed: {
	    spinnerColor: function spinnerColor() {
	      return this.color || this.$parent.color || '#ccc';
	    },
	    spinnerSize: function spinnerSize() {
	      return (this.size || this.$parent.size || 28) + 'px';
	    }
	  },

	  props: {
	    size: Number,
	    color: String
	  }
	};

/***/ },

/***/ 113:
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"['mint-spinner-fading-circle circle-color-' + _uid]\" :style=\"{\n    width: spinnerSize,\n    height: spinnerSize\n  }\">\n  <div v-for=\"n in 12\" :class=\"['is-circle' + (n + 1)]\" class=\"mint-spinner-fading-circle-circle\"></div>\n</div>\n";

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _spinner = __webpack_require__(180);

	var _spinner2 = _interopRequireDefault(_spinner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_spinner2.default.install = function (Vue) {
	  Vue.component(_spinner2.default.name, _spinner2.default);
	};

	module.exports = _spinner2.default;

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(181)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/spinner/src/spinner.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(197)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var SPINNERS = ['snake', 'double-bounce', 'triple-bounce', 'fading-circle'];
	var parseSpinner = function parseSpinner(index) {
	  if ({}.toString.call(index) === '[object Number]') {
	    if (SPINNERS.length <= index) {
	      console.warn('\'' + index + '\' spinner not found, use the default spinner.');
	      index = 0;
	    }
	    return SPINNERS[index];
	  }

	  if (SPINNERS.indexOf(index) === -1) {
	    console.warn('\'' + index + '\' spinner not found, use the default spinner.');
	    index = SPINNERS[0];
	  }
	  return index;
	};

	exports.default = {
	  name: 'mt-spinner',

	  computed: {
	    spinner: function spinner() {
	      return 'spinner-' + parseSpinner(this.type);
	    }
	  },

	  components: {
	    SpinnerSnake: __webpack_require__(182),
	    SpinnerDoubleBounce: __webpack_require__(187),
	    SpinnerTripleBounce: __webpack_require__(192),
	    SpinnerFadingCircle: __webpack_require__(107)
	  },

	  props: {
	    type: {
	      default: 0
	    },
	    size: {
	      type: Number,
	      default: 28
	    },
	    color: {
	      type: String,
	      default: '#ccc'
	    }
	  }
	};

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(183)
	__vue_script__ = __webpack_require__(185)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/spinner/src/spinner/snake.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(186)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 183:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(111);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'snake',

	  mixins: [_common2.default]
	};

/***/ },

/***/ 186:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mint-spinner-snake\" :style=\"{\n  'border-top-color': spinnerColor,\n  'border-left-color': spinnerColor,\n  'border-bottom-color': spinnerColor,\n  'height': spinnerSize,\n  'width': spinnerSize\n  }\">\n</div>\n";

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(188)
	__vue_script__ = __webpack_require__(190)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/spinner/src/spinner/double-bounce.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(191)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 188:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(111);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'double-bounce',

	  mixins: [_common2.default]
	};

/***/ },

/***/ 191:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mint-spinner-double-bounce\" :style=\"{\n    width: spinnerSize,\n    height: spinnerSize\n  }\">\n  <div class=\"mint-spinner-double-bounce-bounce1\" :style=\"{ backgroundColor: spinnerColor }\"></div>\n  <div class=\"mint-spinner-double-bounce-bounce2\" :style=\"{ backgroundColor: spinnerColor }\"></div>\n</div>\n";

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(193)
	__vue_script__ = __webpack_require__(195)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/spinner/src/spinner/triple-bounce.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(196)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 193:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(111);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'triple-bounce',

	  mixins: [_common2.default],

	  computed: {
	    spinnerSize: function spinnerSize() {
	      return (this.size || this.$parent.size || 28) / 3 + 'px';
	    },
	    bounceStyle: function bounceStyle() {
	      return {
	        width: this.spinnerSize,
	        height: this.spinnerSize,
	        backgroundColor: this.spinnerColor
	      };
	    }
	  }
	};

/***/ },

/***/ 196:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mint-spinner-triple-bounce\">\n  <div class=\"mint-spinner-triple-bounce-bounce1\" :style=\"bounceStyle\"></div>\n  <div class=\"mint-spinner-triple-bounce-bounce2\" :style=\"bounceStyle\"></div>\n  <div class=\"mint-spinner-triple-bounce-bounce3\" :style=\"bounceStyle\"></div>\n</div>\n";

/***/ },

/***/ 197:
/***/ function(module, exports) {

	module.exports = "\n<span><component :is=\"spinner\"></component></span>\n";

/***/ }

/******/ });