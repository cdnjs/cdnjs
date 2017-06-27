(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory(require("vue"));
	else
		root["VueMaterial"] = factory(root["Vue"]);
})(this, (function(__WEBPACK_EXTERNAL_MODULE_374__) {
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

	module.exports = __webpack_require__(93);


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

/***/ 38:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function transitionEndEventName() {
	  var el = document.createElement('span');
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };

	  for (var transition in transitions) {
	    if (el.style[transition] !== undefined) {
	      return transitions[transition];
	    }
	  }
	}

	exports.default = transitionEndEventName();
	module.exports = exports['default'];

/***/ },

/***/ 43:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var uniqueId = function uniqueId() {
	  return Math.random().toString(36).slice(4);
	};

	exports.default = uniqueId;
	module.exports = exports["default"];

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdSnackbar = __webpack_require__(293);

	var _mdSnackbar2 = _interopRequireDefault(_mdSnackbar);

	var _mdSnackbar3 = __webpack_require__(240);

	var _mdSnackbar4 = _interopRequireDefault(_mdSnackbar3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-snackbar', Vue.extend(_mdSnackbar2.default));

	  Vue.material.styles.push(_mdSnackbar4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(374);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var manager = new _vue2.default({
	  data: function data() {
	    return {
	      current: null
	    };
	  }
	});

	exports.default = manager;
	module.exports = exports['default'];

/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _uniqueId = __webpack_require__(43);

	var _uniqueId2 = _interopRequireDefault(_uniqueId);

	var _transitionEndEventName = __webpack_require__(38);

	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _manager = __webpack_require__(94);

	var _manager2 = _interopRequireDefault(_manager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	//

	exports.default = {
	  props: {
	    id: [String, Number],
	    mdPosition: {
	      type: String,
	      default: 'bottom center'
	    },
	    mdDuration: {
	      type: [String, Number],
	      default: 4000
	    }
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      snackbarId: this.id || 'snackbar-' + (0, _uniqueId2.default)(),
	      active: false,
	      rootElement: {},
	      snackbarElement: {},
	      directionClass: null,
	      closeTimeout: null
	    };
	  },

	  computed: {
	    classes: function classes() {
	      var cssClasses = {
	        'md-active': this.active
	      };

	      this.directionClass = this.mdPosition.replace(/ /g, '-');

	      cssClasses['md-position-' + this.directionClass] = true;

	      return cssClasses;
	    }
	  },
	  watch: {
	    active: function active(_active) {
	      var directionClass = 'md-has-toast-' + this.directionClass;
	      var toastClass = 'md-has-toast';

	      if (_active) {
	        document.body.classList.add(directionClass);
	        document.body.classList.add(toastClass);
	      } else {
	        document.body.classList.remove(directionClass);
	        document.body.classList.remove(toastClass);
	      }
	    }
	  },
	  methods: {
	    removeElement: function removeElement() {
	      if (this.rootElement.contains(this.snackbarElement)) {
	        var activeRipple = this.snackbarElement.querySelector('.md-ripple.md-active');

	        if (activeRipple) {
	          activeRipple.classList.remove('md-active');
	        }

	        this.rootElement.removeChild(this.snackbarElement);
	      }
	    },
	    open: function open() {
	      if (_manager2.default.current) {
	        _manager2.default.current.close();
	      }

	      _manager2.default.current = this;
	      this.rootElement.appendChild(this.snackbarElement);
	      window.getComputedStyle(this.$refs.container).backgroundColor;
	      this.active = true;
	      this.$emit('open');
	      this.closeTimeout = window.setTimeout(this.close, this.mdDuration);
	    },
	    close: function close() {
	      var _this = this;

	      if (this.$refs.container) {
	        (function () {
	          var removeElement = function removeElement() {
	            _this.$refs.container.removeEventListener(_transitionEndEventName2.default, removeElement);
	            _this.removeElement();
	          };

	          _manager2.default.current = null;
	          _this.active = false;
	          _this.$emit('close');
	          _this.$refs.container.removeEventListener(_transitionEndEventName2.default, removeElement);
	          _this.$refs.container.addEventListener(_transitionEndEventName2.default, removeElement);
	          window.clearTimeout(_this.closeTimeout);
	        })();
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;

	    this.$nextTick((function () {
	      _this2.rootElement = _this2.$root.$el;
	      _this2.snackbarElement = _this2.$el;
	      _this2.snackbarElement.parentNode.removeChild(_this2.snackbarElement);
	    }));
	  },
	  beforeDestroy: function beforeDestroy() {
	    window.clearTimeout(this.closeTimeout);
	    this.removeElement();
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 216:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 240:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-snackbar .md-ink-ripple, .THEME_NAME.md-snackbar .md-ink-ripple {\n  color: #fff; }\n"

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(216)

	/* script */
	__vue_exports__ = __webpack_require__(147)

	/* template */
	var __vue_template__ = __webpack_require__(362)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSnackbar/mdSnackbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b540e066", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b540e066", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSnackbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-snackbar",
	    class: [_vm.themeClass, _vm.classes],
	    attrs: {
	      "id": _vm.snackbarId
	    }
	  }, [_c('div', {
	    ref: "container",
	    staticClass: "md-snackbar-container"
	  }, [_c('div', {
	    staticClass: "md-snackbar-content"
	  }, [_vm._t("default")], 2)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b540e066", module.exports)
	  }
	}

/***/ },

/***/ 374:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_374__;

/***/ }

/******/ })
}));
;