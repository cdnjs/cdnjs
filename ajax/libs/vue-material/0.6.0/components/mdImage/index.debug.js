(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, (function() {
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(84);


/***/ },

/***/ 66:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getImageLightness = function getImageLightness(image, onLoad) {
	  var canvas = document.createElement('canvas');

	  image.onload = function () {
	    var colorSum = 0;
	    var ctx = void 0;
	    var imageData = void 0;
	    var imageMetadata = void 0;
	    var r = void 0;
	    var g = void 0;
	    var b = void 0;
	    var average = void 0;

	    canvas.width = this.width;
	    canvas.height = this.height;
	    ctx = canvas.getContext('2d');

	    ctx.drawImage(this, 0, 0);

	    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    imageMetadata = imageData.data;

	    for (var x = 0, len = imageMetadata.length; x < len; x += 4) {
	      r = imageMetadata[x];
	      g = imageMetadata[x + 1];
	      b = imageMetadata[x + 2];

	      average = Math.floor((r + g + b) / 3);
	      colorSum += average;
	    }

	    onLoad(Math.floor(colorSum / (this.width * this.height)));
	  };
	};

	exports.default = getImageLightness;
	module.exports = exports['default'];

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdImage = __webpack_require__(277);

	var _mdImage2 = _interopRequireDefault(_mdImage);

	var _mdImage3 = __webpack_require__(232);

	var _mdImage4 = _interopRequireDefault(_mdImage3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-image', Vue.extend(_mdImage2.default));

	  Vue.material.styles.push(_mdImage4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getImageLightness = __webpack_require__(66);

	var _getImageLightness2 = _interopRequireDefault(_getImageLightness);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    mdSrc: String
	  },
	  data: function data() {
	    return {
	      loaded: false,
	      applyBlack: true,
	      imageElement: null
	    };
	  },
	  watch: {
	    mdSrc: function mdSrc() {
	      this.createImage();
	    }
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-loaded': this.loaded,
	        'md-black-output': this.applyBlack
	      };
	    }
	  },
	  methods: {
	    analyzeLightness: function analyzeLightness(image) {
	      var _this = this;

	      (0, _getImageLightness2.default)(image, (function (lightness) {
	        var limit = 256;
	        var darkness = (Math.abs(limit - lightness) * 100 / limit + 15) / 100;

	        if (darkness >= 0.7) {
	          _this.applyBlack = true;
	        }

	        _this.$nextTick((function () {
	          _this.loaded = true;
	        }));
	      }));
	    },
	    createImage: function createImage() {
	      this.loaded = false;
	      this.applyBlack = false;
	      this.imageElement = null;

	      if (this.mdSrc) {
	        this.imageElement = document.createElement('img');
	        this.imageElement.crossOrigin = '';
	        this.imageElement.src = this.mdSrc;
	        this.analyzeLightness(this.imageElement);
	      }
	    }
	  },
	  created: function created() {
	    this.createImage();
	  }
	}; //
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 199:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 232:
/***/ function(module, exports) {

	module.exports = ""

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(199)

	/* script */
	__vue_exports__ = __webpack_require__(131)

	/* template */
	var __vue_template__ = __webpack_require__(329)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdImage/mdImage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2bb54057", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2bb54057", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdImage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('img', {
	    staticClass: "md-image",
	    class: _vm.classes,
	    attrs: {
	      "src": _vm.mdSrc
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2bb54057", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;