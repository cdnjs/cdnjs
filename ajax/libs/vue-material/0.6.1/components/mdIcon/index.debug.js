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

	module.exports = __webpack_require__(83);


/***/ },

/***/ 1:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    mdTheme: String
	  },
	  data: function data() {
	    return {
	      closestThemedParent: false
	    };
	  },
	  methods: {
	    getClosestThemedParent: function getClosestThemedParent($parent) {
	      if (!$parent || !$parent.$el || $parent._uid === 0) {
	        return false;
	      }

	      if ($parent.mdTheme || $parent.mdName) {
	        return $parent;
	      }

	      return this.getClosestThemedParent($parent.$parent);
	    }
	  },
	  computed: {
	    themeClass: function themeClass() {
	      if (this.mdTheme) {
	        return 'md-theme-' + this.mdTheme;
	      }

	      var theme = this.closestThemedParent.mdTheme;

	      if (!theme) {
	        if (this.closestThemedParent) {
	          theme = this.closestThemedParent.mdName;
	        } else {
	          theme = this.$material.currentTheme;
	        }
	      }

	      return 'md-theme-' + theme;
	    }
	  },
	  mounted: function mounted() {
	    this.closestThemedParent = this.getClosestThemedParent(this.$parent);

	    if (!this.$material.currentTheme) {
	      this.$material.setCurrentTheme('default');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdIcon = __webpack_require__(276);

	var _mdIcon2 = _interopRequireDefault(_mdIcon);

	var _mdIcon3 = __webpack_require__(231);

	var _mdIcon4 = _interopRequireDefault(_mdIcon3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-icon', Vue.extend(_mdIcon2.default));

	  Vue.material.styles.push(_mdIcon4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var registeredIcons = {}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: {
	    mdSrc: String
	  },
	  data: function data() {
	    return {
	      svgContent: null,
	      imageSrc: null
	    };
	  },
	  mixins: [_mixin2.default],
	  watch: {
	    mdSrc: function mdSrc() {
	      this.svgContent = null;
	      this.imageSrc = null;
	      this.checkSrc();
	    }
	  },
	  methods: {
	    isImage: function isImage(mimetype) {
	      return mimetype.indexOf('image') >= 0;
	    },
	    isSVG: function isSVG(mimetype) {
	      return mimetype.indexOf('svg') >= 0;
	    },
	    setSVGContent: function setSVGContent(value) {
	      var _this = this;

	      this.svgContent = value;

	      this.$nextTick((function () {
	        _this.$el.children[0].removeAttribute('fill');
	      }));
	    },
	    loadSVG: function loadSVG() {
	      var _this2 = this;

	      if (!registeredIcons[this.mdSrc]) {
	        (function () {
	          var request = new XMLHttpRequest();
	          var self = _this2;

	          request.open('GET', _this2.mdSrc, true);

	          request.onload = function () {
	            var mimetype = this.getResponseHeader('content-type');

	            if (this.status >= 200 && this.status < 400 && self.isImage(mimetype)) {
	              if (self.isSVG(mimetype)) {
	                registeredIcons[self.mdSrc] = this.response;
	                self.setSVGContent(this.response);
	              } else {
	                self.loadImage();
	              }
	            } else {
	              console.warn('The file ' + self.mdSrc + ' is not a valid image.');
	            }
	          };

	          request.send();
	        })();
	      } else {
	        this.setSVGContent(registeredIcons[this.mdSrc]);
	      }
	    },
	    loadImage: function loadImage() {
	      this.imageSrc = this.mdSrc;
	    },
	    checkSrc: function checkSrc() {
	      if (this.mdSrc) {
	        if (this.mdSrc.indexOf('.svg') >= 0) {
	          this.loadSVG();
	        } else {
	          this.loadImage();
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.checkSrc();
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 221:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 231:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-icon.md-primary {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-icon.md-accent {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-icon.md-warn {\n  color: WARN-COLOR; }\n"

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(221)

	/* script */
	__vue_exports__ = __webpack_require__(130)

	/* template */
	var __vue_template__ = __webpack_require__(371)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdIcon/mdIcon.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f5836666", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-f5836666", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdIcon.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 371:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.svgContent) ? _c('i', {
	    staticClass: "md-icon",
	    class: [_vm.themeClass],
	    domProps: {
	      "innerHTML": _vm._s(_vm.svgContent)
	    }
	  }) : (_vm.imageSrc) ? _c('md-image', {
	    staticClass: "md-icon",
	    class: [_vm.themeClass],
	    attrs: {
	      "md-src": _vm.imageSrc
	    }
	  }) : _c('i', {
	    staticClass: "md-icon material-icons",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f5836666", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;