(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(165);


/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSidenav = __webpack_require__(166);
	
	var _mdSidenav2 = _interopRequireDefault(_mdSidenav);
	
	var _mdSidenav3 = __webpack_require__(170);
	
	var _mdSidenav4 = _interopRequireDefault(_mdSidenav3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-sidenav', Vue.extend(_mdSidenav2.default));
	
	  Vue.material.styles.push(_mdSidenav4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(167)
	
	/* script */
	__vue_exports__ = __webpack_require__(168)
	
	/* template */
	var __vue_template__ = __webpack_require__(169)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdSidenav/mdSidenav.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0821376f", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0821376f", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSidenav.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 167:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 168:
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
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  data: function data() {
	    return {
	      mdVisible: false
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return this.mdVisible && 'md-active';
	    }
	  },
	  methods: {
	    show: function show() {
	      this.mdVisible = true;
	      this.$el.focus();
	      this.$emit('open');
	    },
	    close: function close() {
	      this.mdVisible = false;
	      this.$el.blur();
	      this.$emit('close');
	    },
	    toggle: function toggle() {
	      if (this.mdVisible) {
	        this.close();
	      } else {
	        this.show();
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-sidenav",
	    class: _vm.classes,
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.close($event)
	      }
	    }
	  }, [_h('div', {
	    staticClass: "md-sidenav-content"
	  }, [_vm._t("default")]), " ", _h('md-backdrop', {
	    staticClass: "md-sidenav-backdrop",
	    on: {
	      "close": _vm.close
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0821376f", module.exports)
	  }
	}

/***/ },

/***/ 170:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-sidenav .md-sidenav-content, .THEME_NAME.md-sidenav .md-sidenav-content {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map