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

	module.exports = __webpack_require__(80);


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

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdDialog = __webpack_require__(267);

	var _mdDialog2 = _interopRequireDefault(_mdDialog);

	var _mdDialogTitle = __webpack_require__(270);

	var _mdDialogTitle2 = _interopRequireDefault(_mdDialogTitle);

	var _mdDialogContent = __webpack_require__(269);

	var _mdDialogContent2 = _interopRequireDefault(_mdDialogContent);

	var _mdDialogActions = __webpack_require__(268);

	var _mdDialogActions2 = _interopRequireDefault(_mdDialogActions);

	var _mdDialogAlert = __webpack_require__(271);

	var _mdDialogAlert2 = _interopRequireDefault(_mdDialogAlert);

	var _mdDialogConfirm = __webpack_require__(272);

	var _mdDialogConfirm2 = _interopRequireDefault(_mdDialogConfirm);

	var _mdDialogPrompt = __webpack_require__(273);

	var _mdDialogPrompt2 = _interopRequireDefault(_mdDialogPrompt);

	var _mdDialog3 = __webpack_require__(229);

	var _mdDialog4 = _interopRequireDefault(_mdDialog3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-dialog', Vue.extend(_mdDialog2.default));
	  Vue.component('md-dialog-title', Vue.extend(_mdDialogTitle2.default));
	  Vue.component('md-dialog-content', Vue.extend(_mdDialogContent2.default));
	  Vue.component('md-dialog-actions', Vue.extend(_mdDialogActions2.default));

	  /* Presets */
	  Vue.component('md-dialog-alert', Vue.extend(_mdDialogAlert2.default));
	  Vue.component('md-dialog-confirm', Vue.extend(_mdDialogConfirm2.default));
	  Vue.component('md-dialog-prompt', Vue.extend(_mdDialogPrompt2.default));

	  Vue.material.styles.push(_mdDialog4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _transitionEndEventName = __webpack_require__(38);

	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

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
	    mdClickOutsideToClose: {
	      type: Boolean,
	      default: true
	    },
	    mdEscToClose: {
	      type: Boolean,
	      default: true
	    },
	    mdBackdrop: {
	      type: Boolean,
	      default: true
	    },
	    mdOpenFrom: String,
	    mdCloseTo: String,
	    mdFullscreen: {
	      type: Boolean,
	      default: false
	    }
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      active: false,
	      transitionOff: false,
	      dialogTransform: ''
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-active': this.active
	      };
	    },
	    dialogClasses: function dialogClasses() {
	      return {
	        'md-fullscreen': this.mdFullscreen,
	        'md-transition-off': this.transitionOff,
	        'md-reference': this.mdOpenFrom || this.mdCloseTo
	      };
	    },
	    styles: function styles() {
	      return {
	        transform: this.dialogTransform
	      };
	    }
	  },
	  methods: {
	    removeDialog: function removeDialog() {
	      if (this.rootElement.contains(this.dialogElement)) {
	        this.$el.parentNode.removeChild(this.$el);
	      }
	    },
	    calculateDialogPos: function calculateDialogPos(ref) {
	      var reference = document.querySelector(ref);

	      if (reference) {
	        var openFromRect = reference.getBoundingClientRect();
	        var dialogRect = this.dialogInnerElement.getBoundingClientRect();
	        var widthInScale = openFromRect.width / dialogRect.width;
	        var heightInScale = openFromRect.height / dialogRect.height;
	        var distance = {
	          top: -(dialogRect.top - openFromRect.top),
	          left: -(dialogRect.left - openFromRect.left + openFromRect.width)
	        };

	        if (openFromRect.top > dialogRect.top + dialogRect.height) {
	          distance.top = openFromRect.top - dialogRect.top;
	        }

	        if (openFromRect.left > dialogRect.left + dialogRect.width) {
	          distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
	        }

	        this.dialogTransform = 'translate3D(' + distance.left + 'px, ' + distance.top + 'px, 0) scale(' + widthInScale + ', ' + heightInScale + ')';
	      }
	    },
	    open: function open() {
	      var _this = this;

	      this.rootElement.appendChild(this.dialogElement);
	      this.transitionOff = true;
	      this.calculateDialogPos(this.mdOpenFrom);

	      window.setTimeout((function () {
	        _this.dialogElement.focus();
	        _this.transitionOff = false;
	        _this.active = true;
	      }));

	      this.$emit('open');
	    },
	    closeOnEsc: function closeOnEsc() {
	      if (this.mdEscToClose) {
	        this.close();
	      }
	    },
	    close: function close() {
	      var _this2 = this;

	      if (this.rootElement.contains(this.dialogElement)) {
	        this.$nextTick((function () {
	          var cleanElement = function cleanElement() {
	            var activeRipple = _this2.dialogElement.querySelector('.md-ripple.md-active');

	            if (activeRipple) {
	              activeRipple.classList.remove('md-active');
	            }

	            _this2.dialogInnerElement.removeEventListener(_transitionEndEventName2.default, cleanElement);
	            _this2.rootElement.removeChild(_this2.dialogElement);
	            _this2.dialogTransform = '';
	          };

	          _this2.transitionOff = true;
	          _this2.dialogTransform = '';
	          _this2.calculateDialogPos(_this2.mdCloseTo);

	          window.setTimeout((function () {
	            _this2.transitionOff = false;
	            _this2.active = false;
	            _this2.dialogInnerElement.addEventListener(_transitionEndEventName2.default, cleanElement);
	          }));

	          _this2.$emit('close');
	        }));
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;

	    this.$nextTick((function () {
	      _this3.rootElement = _this3.$root.$el;
	      _this3.dialogElement = _this3.$el;
	      _this3.dialogInnerElement = _this3.$refs.dialog;
	      _this3.removeDialog();
	    }));
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeDialog();
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 126:
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
	//

	exports.default = {
	  props: {
	    mdTitle: String,
	    mdContent: String,
	    mdContentHtml: String,
	    mdOkText: {
	      type: String,
	      default: 'Ok'
	    }
	  },
	  data: function data() {
	    return {
	      debounce: false
	    };
	  },
	  methods: {
	    fireCloseEvent: function fireCloseEvent() {
	      if (!this.debounce) {
	        this.$emit('close');
	      }
	    },
	    open: function open() {
	      this.$emit('open');
	      this.debounce = false;
	      this.$refs.dialog.open();
	    },
	    close: function close() {
	      this.fireCloseEvent();
	      this.debounce = true;
	      this.$refs.dialog.close();
	    }
	  },
	  mounted: function mounted() {
	    if (!this.mdContent && !this.mdContentHtml) {
	      throw new Error('Missing md-content or md-content-html attributes');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 127:
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
	//
	//

	exports.default = {
	  props: {
	    mdTitle: String,
	    mdContent: String,
	    mdContentHtml: String,
	    mdOkText: {
	      type: String,
	      default: 'Ok'
	    },
	    mdCancelText: {
	      type: String,
	      default: 'Cancel'
	    }
	  },
	  data: function data() {
	    return {
	      debounce: false
	    };
	  },
	  methods: {
	    fireCloseEvent: function fireCloseEvent(type) {
	      if (!this.debounce) {
	        this.$emit('close', type);
	      }
	    },
	    open: function open() {
	      this.$emit('open');
	      this.debounce = false;
	      this.$refs.dialog.open();
	    },
	    close: function close(type) {
	      this.fireCloseEvent(type);
	      this.debounce = true;
	      this.$refs.dialog.close();
	    }
	  },
	  mounted: function mounted() {
	    if (!this.mdContent && !this.mdContentHtml) {
	      throw new Error('Missing md-content or md-content-html attributes');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 128:
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
	//
	//
	//

	exports.default = {
	  props: {
	    value: {
	      type: [String, Number],
	      required: true
	    },
	    mdTitle: String,
	    mdContent: String,
	    mdContentHtml: String,
	    mdOkText: {
	      type: String,
	      default: 'Ok'
	    },
	    mdCancelText: {
	      type: String,
	      default: 'Cancel'
	    },
	    mdInputId: String,
	    mdInputName: String,
	    mdInputMaxlength: [String, Number],
	    mdInputPlaceholder: String
	  },
	  data: function data() {
	    return {
	      debounce: false
	    };
	  },
	  methods: {
	    fireCloseEvent: function fireCloseEvent(type) {
	      if (!this.debounce) {
	        this.$emit('close', type);
	      }
	    },
	    open: function open() {
	      var _this = this;

	      this.$emit('open');
	      this.debounce = false;
	      this.$refs.dialog.open();

	      window.setTimeout((function () {
	        _this.$refs.input.$el.focus();
	      }));
	    },
	    close: function close(type) {
	      this.fireCloseEvent(type);
	      this.debounce = true;
	      this.$refs.dialog.close();
	    },
	    confirmValue: function confirmValue() {
	      this.$emit('input', this.$refs.input.$el.value);
	      this.close('ok');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 209:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 229:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-dialog-container .md-dialog {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(209)

	/* script */
	__vue_exports__ = __webpack_require__(125)

	/* template */
	var __vue_template__ = __webpack_require__(351)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialog.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-78b956ed", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-78b956ed", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialog.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(348)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialogActions.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6e6a9f00", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6e6a9f00", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogActions.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(318)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialogContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-10712708", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-10712708", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(313)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialogTitle.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0083d19b", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0083d19b", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogTitle.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(126)

	/* template */
	var __vue_template__ = __webpack_require__(369)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/presets/mdDialogAlert.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e4165678", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e4165678", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogAlert.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(127)

	/* template */
	var __vue_template__ = __webpack_require__(349)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/presets/mdDialogConfirm.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-70186c28", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-70186c28", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogConfirm.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(128)

	/* template */
	var __vue_template__ = __webpack_require__(316)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/presets/mdDialogPrompt.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-047e25a8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-047e25a8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogPrompt.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-dialog-title md-title"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0083d19b", module.exports)
	  }
	}

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('md-dialog', {
	    ref: "dialog",
	    staticClass: "md-dialog-prompt",
	    on: {
	      "close": function($event) {
	        _vm.fireCloseEvent('cancel')
	      }
	    }
	  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.mdContentHtml)
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.mdContent) ? _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]) : _vm._e(), _vm._v(" "), _c('md-dialog-content', [_c('md-input-container', [_c('md-input', {
	    ref: "input",
	    attrs: {
	      "id": _vm.mdInputId,
	      "name": _vm.mdInputName,
	      "maxlength": _vm.mdInputMaxlength,
	      "placeholder": _vm.mdInputPlaceholder,
	      "value": _vm.value
	    },
	    nativeOn: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.confirmValue($event)
	      }
	    }
	  })], 1)], 1), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close('cancel')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdCancelText))]), _vm._v(" "), _c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": _vm.confirmValue
	    }
	  }, [_vm._v(_vm._s(_vm.mdOkText))])], 1)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-047e25a8", module.exports)
	  }
	}

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-dialog-content"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-10712708", module.exports)
	  }
	}

/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-dialog-actions"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6e6a9f00", module.exports)
	  }
	}

/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('md-dialog', {
	    ref: "dialog",
	    staticClass: "md-dialog-confirm",
	    on: {
	      "close": function($event) {
	        _vm.fireCloseEvent('cancel')
	      }
	    }
	  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.mdContentHtml)
	    }
	  }) : _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close('cancel')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdCancelText))]), _vm._v(" "), _c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close('ok')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdOkText))])], 1)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-70186c28", module.exports)
	  }
	}

/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-dialog-container",
	    class: [_vm.themeClass, _vm.classes],
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        $event.stopPropagation();
	        _vm.closeOnEsc($event)
	      }
	    }
	  }, [_c('div', {
	    ref: "dialog",
	    staticClass: "md-dialog",
	    class: _vm.dialogClasses,
	    style: (_vm.styles)
	  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.mdBackdrop) ? _c('md-backdrop', {
	    ref: "backdrop",
	    staticClass: "md-dialog-backdrop",
	    class: _vm.classes,
	    on: {
	      "close": function($event) {
	        _vm.mdClickOutsideToClose && _vm.close()
	      }
	    }
	  }) : _vm._e()], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-78b956ed", module.exports)
	  }
	}

/***/ },

/***/ 369:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('md-dialog', {
	    ref: "dialog",
	    staticClass: "md-dialog-alert",
	    on: {
	      "close": function($event) {
	        _vm.fireCloseEvent()
	      }
	    }
	  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.mdContentHtml)
	    }
	  }) : _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdOkText))])], 1)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e4165678", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;