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

	module.exports = __webpack_require__(77);


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

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdCard = __webpack_require__(254);

	var _mdCard2 = _interopRequireDefault(_mdCard);

	var _mdCardMedia = __webpack_require__(261);

	var _mdCardMedia2 = _interopRequireDefault(_mdCardMedia);

	var _mdCardMediaCover = __webpack_require__(263);

	var _mdCardMediaCover2 = _interopRequireDefault(_mdCardMediaCover);

	var _mdCardMediaActions = __webpack_require__(262);

	var _mdCardMediaActions2 = _interopRequireDefault(_mdCardMediaActions);

	var _mdCardHeader = __webpack_require__(259);

	var _mdCardHeader2 = _interopRequireDefault(_mdCardHeader);

	var _mdCardHeaderText = __webpack_require__(260);

	var _mdCardHeaderText2 = _interopRequireDefault(_mdCardHeaderText);

	var _mdCardContent = __webpack_require__(257);

	var _mdCardContent2 = _interopRequireDefault(_mdCardContent);

	var _mdCardActions = __webpack_require__(255);

	var _mdCardActions2 = _interopRequireDefault(_mdCardActions);

	var _mdCardArea = __webpack_require__(256);

	var _mdCardArea2 = _interopRequireDefault(_mdCardArea);

	var _mdCardExpand = __webpack_require__(258);

	var _mdCardExpand2 = _interopRequireDefault(_mdCardExpand);

	var _mdCard3 = __webpack_require__(226);

	var _mdCard4 = _interopRequireDefault(_mdCard3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-card', Vue.extend(_mdCard2.default));
	  Vue.component('md-card-media', Vue.extend(_mdCardMedia2.default));
	  Vue.component('md-card-media-cover', Vue.extend(_mdCardMediaCover2.default));
	  Vue.component('md-card-media-actions', Vue.extend(_mdCardMediaActions2.default));
	  Vue.component('md-card-header', Vue.extend(_mdCardHeader2.default));
	  Vue.component('md-card-header-text', Vue.extend(_mdCardHeaderText2.default));
	  Vue.component('md-card-content', Vue.extend(_mdCardContent2.default));
	  Vue.component('md-card-actions', Vue.extend(_mdCardActions2.default));
	  Vue.component('md-card-area', Vue.extend(_mdCardArea2.default));
	  Vue.component('md-card-expand', Vue.extend(_mdCardExpand2.default));

	  Vue.material.styles.push(_mdCard4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    mdWithHover: Boolean
	  },
	  mixins: [_mixin2.default],
	  computed: {
	    classes: function classes() {
	      return {
	        'md-with-hover': this.mdWithHover
	      };
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 117:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: {
	    mdInset: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-inset': this.mdInset
	      };
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 118:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//

	exports.default = {
	  methods: {
	    setContentMargin: function setContentMargin() {
	      this.content.style.marginTop = -this.content.offsetHeight + 'px';
	    },
	    toggle: function toggle() {
	      this.$refs.expand.classList.toggle('md-active');
	    },
	    onWindowResize: function onWindowResize() {
	      window.requestAnimationFrame(this.setContentMargin);
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    window.setTimeout((function () {
	      _this.trigger = _this.$el.querySelector('[md-expand-trigger]');
	      _this.content = _this.$el.querySelector('.md-card-content');

	      if (_this.content) {
	        _this.setContentMargin();

	        _this.trigger.addEventListener('click', _this.toggle);
	        window.addEventListener('resize', _this.onWindowResize);
	      }
	    }), 200);
	  },
	  destroyed: function destroyed() {
	    if (this.content) {
	      this.trigger.removeEventListener('click', this.toggle);
	      window.removeEventListener('resize', this.onWindowResize);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 119:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//

	exports.default = {
	  mounted: function mounted() {
	    this.parentClasses = this.$parent.$el.classList;

	    if (this.parentClasses.contains('md-card-header')) {
	      this.insideParent = true;
	      this.parentClasses.add('md-card-header-flex');
	    }
	  },
	  destroyed: function destroyed() {
	    this.parentClasses.remove('md-card-header-flex');
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 120:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//

	exports.default = {
	  props: {
	    mdRatio: String,
	    mdMedium: Boolean,
	    mdBig: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      var classes = {
	        'md-16-9': this.mdRatio === '16:9' || this.mdRatio === '16/9',
	        'md-4-3': this.mdRatio === '4:3' || this.mdRatio === '4/3',
	        'md-1-1': this.mdRatio === '1:1' || this.mdRatio === '1/1'
	      };

	      if (this.mdMedium || this.mdBig) {
	        classes = {
	          'md-medium': this.mdMedium,
	          'md-big': this.mdBig
	        };
	      }

	      return classes;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 121:
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
	    mdTextScrim: Boolean,
	    mdSolid: Boolean
	  },
	  data: function data() {
	    return {
	      backdropBg: {}
	    };
	  },

	  computed: {
	    classes: function classes() {
	      return {
	        'md-text-scrim': this.mdTextScrim,
	        'md-solid': this.mdSolid
	      };
	    },
	    styles: function styles() {
	      return {
	        background: this.backdropBg
	      };
	    }
	  },
	  methods: {
	    applyScrimColor: function applyScrimColor(darkness) {
	      if (this.$refs.backdrop) {
	        this.backdropBg = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, ' + darkness / 2 + ') 66%, rgba(0, 0, 0, ' + darkness + ') 100%)';
	      }
	    },
	    applySolidColor: function applySolidColor(darkness) {
	      var area = this.$el.querySelector('.md-card-area');

	      if (area) {
	        area.style.background = 'rgba(0, 0, 0, ' + darkness + ')';
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    var image = this.$el.querySelector('img');

	    if (image && (this.mdTextScrim || this.mdSolid)) {
	      (0, _getImageLightness2.default)(image, (function (lightness) {
	        var limit = 256;
	        var darkness = (Math.abs(limit - lightness) * 100 / limit + 15) / 100;

	        if (darkness >= 0.7) {
	          darkness = 0.7;
	        }

	        if (_this.mdTextScrim) {
	          _this.applyScrimColor(darkness);
	        } else if (_this.mdSolid) {
	          _this.applySolidColor(darkness);
	        }
	      }));
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 207:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 226:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-card {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-card.md-primary {\n    background-color: PRIMARY-COLOR;\n    color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-card-header .md-icon-button .md-icon,\n    .THEME_NAME.md-card.md-primary .md-card-actions .md-icon-button .md-icon {\n      color: PRIMARY-CONTRAST-0.87; }\n  .THEME_NAME.md-card.md-accent {\n    background-color: ACCENT-COLOR;\n    color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-card-header .md-icon-button .md-icon,\n    .THEME_NAME.md-card.md-accent .md-card-actions .md-icon-button .md-icon {\n      color: ACCENT-CONTRAST-0.87; }\n  .THEME_NAME.md-card.md-warn {\n    background-color: WARN-COLOR;\n    color: WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-card-header .md-icon-button .md-icon,\n    .THEME_NAME.md-card.md-warn .md-card-actions .md-icon-button .md-icon {\n      color: WARN-CONTRAST-0.87; }\n  .THEME_NAME.md-card .md-card-header .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon,\n  .THEME_NAME.md-card .md-card-actions .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon {\n    color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME.md-card > .md-card-area:after {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-card .md-card-media-cover.md-text-scrim .md-backdrop {\n    background: linear-gradient(to bottom, BACKGROUND-CONTRAST-0.0 20%, BACKGROUND-CONTRAST-0.275 66%, BACKGROUND-CONTRAST-0.55 100%); }\n  .THEME_NAME.md-card .md-card-media-cover.md-solid .md-card-area {\n    background-color: BACKGROUND-CONTRAST-0.4; }\n  .THEME_NAME.md-card .md-card-expand .md-card-actions {\n    background-color: BACKGROUND-COLOR; }\n"

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(207)

	/* script */
	__vue_exports__ = __webpack_require__(116)

	/* template */
	var __vue_template__ = __webpack_require__(340)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5074f4ed", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5074f4ed", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(350)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardActions.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-78014100", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-78014100", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardActions.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(117)

	/* template */
	var __vue_template__ = __webpack_require__(332)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardArea.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3894e89a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3894e89a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardArea.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(314)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-015e0e7c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-015e0e7c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(118)

	/* template */
	var __vue_template__ = __webpack_require__(365)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardExpand.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d6fa0232", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-d6fa0232", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardExpand.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(328)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardHeader.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2b945d4c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2b945d4c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardHeader.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(119)

	/* template */
	var __vue_template__ = __webpack_require__(333)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardHeaderText.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3c04eb27", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3c04eb27", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardHeaderText.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(120)

	/* template */
	var __vue_template__ = __webpack_require__(345)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardMedia.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-623c9b27", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-623c9b27", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardMedia.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(356)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardMediaActions.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9711f4f4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9711f4f4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardMediaActions.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(121)

	/* template */
	var __vue_template__ = __webpack_require__(320)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardMediaCover.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1a9ce900", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1a9ce900", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardMediaCover.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-content"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-015e0e7c", module.exports)
	  }
	}

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-media-cover",
	    class: _vm.classes
	  }, [_vm._t("default"), _vm._v(" "), (_vm.mdTextScrim) ? _c('div', {
	    ref: "backdrop",
	    staticClass: "md-card-backdrop",
	    style: (_vm.styles)
	  }) : _vm._e()], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1a9ce900", module.exports)
	  }
	}

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-header"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2b945d4c", module.exports)
	  }
	}

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-area",
	    class: _vm.classes
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3894e89a", module.exports)
	  }
	}

/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-header-text"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3c04eb27", module.exports)
	  }
	}

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5074f4ed", module.exports)
	  }
	}

/***/ },

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-media",
	    class: _vm.classes
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-623c9b27", module.exports)
	  }
	}

/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-actions"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-78014100", module.exports)
	  }
	}

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-card-media-actions"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9711f4f4", module.exports)
	  }
	}

/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    ref: "expand",
	    staticClass: "md-card-expand"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d6fa0232", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;