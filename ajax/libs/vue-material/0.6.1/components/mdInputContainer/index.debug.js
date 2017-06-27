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

	module.exports = __webpack_require__(85);


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

/***/ 13:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
	  if (!$parent || !$parent.$el) {
	    return false;
	  }

	  if ($parent._uid === 0) {
	    return false;
	  }

	  if ($parent.$el.classList.contains(cssClass)) {
	    return $parent;
	  }

	  return getClosestVueParent($parent.$parent, cssClass);
	};

	exports.default = getClosestVueParent;
	module.exports = exports["default"];

/***/ },

/***/ 67:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = function isArray(value) {
	  return value && value.constructor === Array;
	};

	exports.default = isArray;
	module.exports = exports["default"];

/***/ },

/***/ 68:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    value: [String, Number],
	    disabled: Boolean,
	    required: Boolean,
	    maxlength: [Number, String],
	    placeholder: String
	  },
	  watch: {
	    value: function value(_value) {
	      this.$el.value = _value;
	      this.setParentValue(_value);
	    },
	    disabled: function disabled() {
	      this.setParentDisabled();
	    },
	    required: function required() {
	      this.setParentRequired();
	    },
	    placeholder: function placeholder() {
	      this.setParentPlaceholder();
	    },
	    maxlength: function maxlength() {
	      this.handleMaxLength();
	    }
	  },
	  methods: {
	    handleMaxLength: function handleMaxLength() {
	      this.parentContainer.enableCounter = this.maxlength > 0;
	      this.parentContainer.counterLength = this.maxlength;
	    },
	    setParentValue: function setParentValue(value) {
	      this.parentContainer.setValue(value || this.$el.value);
	    },
	    setParentDisabled: function setParentDisabled() {
	      this.parentContainer.isDisabled = this.disabled;
	    },
	    setParentRequired: function setParentRequired() {
	      this.parentContainer.isRequired = this.required;
	    },
	    setParentPlaceholder: function setParentPlaceholder() {
	      this.parentContainer.hasPlaceholder = !!this.placeholder;
	    },
	    onFocus: function onFocus() {
	      this.parentContainer.isFocused = true;
	    },
	    onBlur: function onBlur() {
	      this.parentContainer.isFocused = false;
	      this.setParentValue();
	    },
	    onInput: function onInput() {
	      var value = this.$el.value;

	      this.setParentValue();
	      this.parentContainer.inputLength = value ? value.length : 0;
	      this.$emit('change', value);
	      this.$emit('input', value);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		Autosize 3.0.20
		license: MIT
		http://www.jacklmoore.com/autosize
	*/
	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
			factory(exports, module);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, mod);
			global.autosize = mod.exports;
		}
	})(this, (function (exports, module) {
		'use strict';

		var map = typeof Map === "function" ? new Map() : (function () {
			var keys = [];
			var values = [];

			return {
				has: function has(key) {
					return keys.indexOf(key) > -1;
				},
				get: function get(key) {
					return values[keys.indexOf(key)];
				},
				set: function set(key, value) {
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						values.push(value);
					}
				},
				'delete': function _delete(key) {
					var index = keys.indexOf(key);
					if (index > -1) {
						keys.splice(index, 1);
						values.splice(index, 1);
					}
				}
			};
		})();

		var createEvent = function createEvent(name) {
			return new Event(name, { bubbles: true });
		};
		try {
			new Event('test');
		} catch (e) {
			// IE does not support `new Event()`
			createEvent = function (name) {
				var evt = document.createEvent('Event');
				evt.initEvent(name, true, false);
				return evt;
			};
		}

		function assign(ta) {
			if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

			var heightOffset = null;
			var clientWidth = ta.clientWidth;
			var cachedHeight = null;

			function init() {
				var style = window.getComputedStyle(ta, null);

				if (style.resize === 'vertical') {
					ta.style.resize = 'none';
				} else if (style.resize === 'both') {
					ta.style.resize = 'horizontal';
				}

				if (style.boxSizing === 'content-box') {
					heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
				} else {
					heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
				}
				// Fix when a textarea is not on document body and heightOffset is Not a Number
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}

				update();
			}

			function changeOverflow(value) {
				{
					// Chrome/Safari-specific fix:
					// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
					// made available by removing the scrollbar. The following forces the necessary text reflow.
					var width = ta.style.width;
					ta.style.width = '0px';
					// Force reflow:
					/* jshint ignore:start */
					ta.offsetWidth;
					/* jshint ignore:end */
					ta.style.width = width;
				}

				ta.style.overflowY = value;
			}

			function getParentOverflows(el) {
				var arr = [];

				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop
						});
					}
					el = el.parentNode;
				}

				return arr;
			}

			function resize() {
				var originalHeight = ta.style.height;
				var overflows = getParentOverflows(ta);
				var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

				ta.style.height = 'auto';

				var endHeight = ta.scrollHeight + heightOffset;

				if (ta.scrollHeight === 0) {
					// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
					ta.style.height = originalHeight;
					return;
				}

				ta.style.height = endHeight + 'px';

				// used to check if an update is actually necessary on window.resize
				clientWidth = ta.clientWidth;

				// prevents scroll-position jumping
				overflows.forEach((function (el) {
					el.node.scrollTop = el.scrollTop;
				}));

				if (docTop) {
					document.documentElement.scrollTop = docTop;
				}
			}

			function update() {
				resize();

				var styleHeight = Math.round(parseFloat(ta.style.height));
				var computed = window.getComputedStyle(ta, null);
				var actualHeight = Math.round(parseFloat(computed.height));

				// The actual height not matching the style height (set via the resize method) indicates that
				// the max-height has been exceeded, in which case the overflow should be set to visible.
				if (actualHeight !== styleHeight) {
					if (computed.overflowY !== 'visible') {
						changeOverflow('visible');
						resize();
						actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
					}
				} else {
					// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
						resize();
						actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
					}
				}

				if (cachedHeight !== actualHeight) {
					cachedHeight = actualHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {
						// Firefox will throw an error on dispatchEvent for a detached element
						// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
					}
				}
			}

			var pageResize = function pageResize() {
				if (ta.clientWidth !== clientWidth) {
					update();
				}
			};

			var destroy = (function (style) {
				window.removeEventListener('resize', pageResize, false);
				ta.removeEventListener('input', update, false);
				ta.removeEventListener('keyup', update, false);
				ta.removeEventListener('autosize:destroy', destroy, false);
				ta.removeEventListener('autosize:update', update, false);

				Object.keys(style).forEach((function (key) {
					ta.style[key] = style[key];
				}));

				map['delete'](ta);
			}).bind(ta, {
				height: ta.style.height,
				resize: ta.style.resize,
				overflowY: ta.style.overflowY,
				overflowX: ta.style.overflowX,
				wordWrap: ta.style.wordWrap
			});

			ta.addEventListener('autosize:destroy', destroy, false);

			// IE9 does not fire onpropertychange or oninput for deletions,
			// so binding to onkeyup to catch most of those events.
			// There is no way that I know of to detect something like 'cut' in IE9.
			if ('onpropertychange' in ta && 'oninput' in ta) {
				ta.addEventListener('keyup', update, false);
			}

			window.addEventListener('resize', pageResize, false);
			ta.addEventListener('input', update, false);
			ta.addEventListener('autosize:update', update, false);
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';

			map.set(ta, {
				destroy: destroy,
				update: update
			});

			init();
		}

		function destroy(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.destroy();
			}
		}

		function update(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.update();
			}
		}

		var autosize = null;

		// Do nothing in Node.js environment and IE8 (or lower)
		if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			autosize = function (el) {
				return el;
			};
			autosize.destroy = function (el) {
				return el;
			};
			autosize.update = function (el) {
				return el;
			};
		} else {
			autosize = function (el, options) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], (function (x) {
						return assign(x, options);
					}));
				}
				return el;
			};
			autosize.destroy = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], destroy);
				}
				return el;
			};
			autosize.update = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], update);
				}
				return el;
			};
		}

		module.exports = autosize;
	}));

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdInputContainer = __webpack_require__(279);

	var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);

	var _mdInput = __webpack_require__(278);

	var _mdInput2 = _interopRequireDefault(_mdInput);

	var _mdTextarea = __webpack_require__(280);

	var _mdTextarea2 = _interopRequireDefault(_mdTextarea);

	var _mdInputContainer3 = __webpack_require__(233);

	var _mdInputContainer4 = _interopRequireDefault(_mdInputContainer3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-input-container', _mdInputContainer2.default);
	  Vue.component('md-input', _mdInput2.default);
	  Vue.component('md-textarea', _mdTextarea2.default);

	  Vue.material.styles.push(_mdInputContainer4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _common = __webpack_require__(68);

	var _common2 = _interopRequireDefault(_common);

	var _getClosestVueParent = __webpack_require__(13);

	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

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
	//
	//
	//
	//

	exports.default = {
	  mixins: [_common2.default],
	  props: {
	    type: {
	      type: String,
	      default: 'text'
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');

	    if (!this.parentContainer) {
	      this.$destroy();

	      throw new Error('You should wrap the md-input in a md-input-container');
	    }

	    this.setParentDisabled();
	    this.setParentRequired();
	    this.setParentPlaceholder();
	    this.setParentValue();
	    this.handleMaxLength();
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _isArray = __webpack_require__(67);

	var _isArray2 = _interopRequireDefault(_isArray);

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
	//
	//

	exports.default = {
	  props: {
	    mdInline: Boolean,
	    mdHasPassword: Boolean
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      value: '',
	      input: false,
	      showPassword: false,
	      enableCounter: false,
	      hasSelect: false,
	      hasPlaceholder: false,
	      hasFile: false,
	      isDisabled: false,
	      isRequired: false,
	      isFocused: false,
	      counterLength: 0,
	      inputLength: 0
	    };
	  },

	  computed: {
	    hasValue: function hasValue() {
	      if ((0, _isArray2.default)(this.value)) {
	        return this.value.length > 0;
	      }

	      return Boolean(this.value);
	    },
	    classes: function classes() {
	      return {
	        'md-input-inline': this.mdInline,
	        'md-has-password': this.mdHasPassword,
	        'md-has-select': this.hasSelect,
	        'md-has-file': this.hasFile,
	        'md-has-value': this.hasValue,
	        'md-input-placeholder': this.hasPlaceholder,
	        'md-input-disabled': this.isDisabled,
	        'md-input-required': this.isRequired,
	        'md-input-focused': this.isFocused
	      };
	    }
	  },
	  methods: {
	    isInput: function isInput() {
	      return this.input && this.input.tagName.toLowerCase() === 'input';
	    },
	    togglePasswordType: function togglePasswordType() {
	      if (this.isInput()) {
	        if (this.input.type === 'password') {
	          this.input.type = 'text';
	          this.showPassword = true;
	        } else {
	          this.input.type = 'password';
	          this.showPassword = false;
	        }

	        this.input.focus();
	      }
	    },
	    setValue: function setValue(value) {
	      this.value = value;
	    }
	  },
	  mounted: function mounted() {
	    this.input = this.$el.querySelectorAll('input, textarea, select, .md-file')[0];

	    if (!this.input) {
	      this.$destroy();

	      throw new Error('Missing input/select/textarea inside md-input-container');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _autosize = __webpack_require__(71);

	var _autosize2 = _interopRequireDefault(_autosize);

	var _common = __webpack_require__(68);

	var _common2 = _interopRequireDefault(_common);

	var _getClosestVueParent = __webpack_require__(13);

	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_common2.default],
	  watch: {
	    value: function value() {
	      var _this = this;

	      this.$nextTick((function () {
	        _autosize2.default.update(_this.$el);
	      }));
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');

	    if (!this.parentContainer) {
	      this.$destroy();

	      throw new Error('You should wrap the md-textarea in a md-input-container');
	    }

	    this.setParentDisabled();
	    this.setParentRequired();
	    this.setParentPlaceholder();
	    this.setParentValue();
	    this.handleMaxLength();

	    if (!this.$el.getAttribute('rows')) {
	      this.$el.setAttribute('rows', '1');
	    }

	    (0, _autosize2.default)(this.$el);
	  },
	  beforeDestroy: function beforeDestroy() {
	    _autosize2.default.destroy(this.$el);
	  }
	}; //
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

	module.exports = exports['default'];

/***/ },

/***/ 206:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 233:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-input-container.md-input-invalid:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-invalid label,\n.THEME_NAME.md-input-container.md-input-invalid input,\n.THEME_NAME.md-input-container.md-input-invalid textarea,\n.THEME_NAME.md-input-container.md-input-invalid .md-error,\n.THEME_NAME.md-input-container.md-input-invalid .md-count,\n.THEME_NAME.md-input-container.md-input-invalid .md-icon:not(.md-icon-delete) {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused.md-input-inline label {\n  color: rgba(0, 0, 0, 0.54); }\n\n.THEME_NAME.md-input-container.md-input-focused.md-input-required label:after {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused:after {\n  height: 2px;\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused input,\n.THEME_NAME.md-input-container.md-input-focused textarea {\n  color: PRIMARY-COLOR;\n  text-shadow: 0 0 0 BACKGROUND-CONTRAST;\n  -webkit-text-fill-color: transparent; }\n\n.THEME_NAME.md-input-container.md-input-focused label,\n.THEME_NAME.md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-disabled label,\n.THEME_NAME.md-input-container.md-input-disabled input,\n.THEME_NAME.md-input-container.md-input-disabled textarea,\n.THEME_NAME.md-input-container.md-input-disabled .md-error,\n.THEME_NAME.md-input-container.md-input-disabled .md-count,\n.THEME_NAME.md-input-container.md-input-disabled .md-icon:not(.md-icon-delete),\n.THEME_NAME.md-input-container.md-input-disabled ::-webkit-input-placeholder {\n  color: BACKGROUND-CONTRAST-0.38; }\n\n.THEME_NAME.md-input-container .md-icon:not(.md-icon-delete):after {\n  background: BACKGROUND-COLOR; }\n"

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(132)

	/* template */
	var __vue_template__ = __webpack_require__(342)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdInputContainer/mdInput.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-53a56078", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-53a56078", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdInput.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(206)

	/* script */
	__vue_exports__ = __webpack_require__(133)

	/* template */
	var __vue_template__ = __webpack_require__(339)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdInputContainer/mdInputContainer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4e747acd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4e747acd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdInputContainer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(134)

	/* template */
	var __vue_template__ = __webpack_require__(346)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdInputContainer/mdTextarea.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-62d24f30", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-62d24f30", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTextarea.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-input-container",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_vm._t("default"), _vm._v(" "), (_vm.enableCounter) ? _c('span', {
	    staticClass: "md-count"
	  }, [_vm._v(_vm._s(_vm.inputLength) + " / " + _vm._s(_vm.counterLength))]) : _vm._e(), _vm._v(" "), (_vm.mdHasPassword) ? _c('md-button', {
	    staticClass: "md-icon-button md-toggle-password",
	    on: {
	      "click": _vm.togglePasswordType
	    }
	  }, [_c('md-icon', [_vm._v(_vm._s(_vm.showPassword ? 'visibility_off' : 'visibility'))])], 1) : _vm._e()], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4e747acd", module.exports)
	  }
	}

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('input', {
	    staticClass: "md-input",
	    attrs: {
	      "type": _vm.type,
	      "disabled": _vm.disabled,
	      "required": _vm.required,
	      "placeholder": _vm.placeholder,
	      "maxlength": _vm.maxlength
	    },
	    domProps: {
	      "value": _vm.value
	    },
	    on: {
	      "focus": _vm.onFocus,
	      "blur": _vm.onBlur,
	      "input": _vm.onInput,
	      "keydown": [function($event) {
	        if (_vm._k($event.keyCode, "up", 38)) { return; }
	        _vm.onInput($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "down", 40)) { return; }
	        _vm.onInput($event)
	      }]
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-53a56078", module.exports)
	  }
	}

/***/ },

/***/ 346:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('textarea', {
	    staticClass: "md-input",
	    attrs: {
	      "disabled": _vm.disabled,
	      "required": _vm.required,
	      "placeholder": _vm.placeholder,
	      "maxlength": _vm.maxlength
	    },
	    domProps: {
	      "value": _vm.value
	    },
	    on: {
	      "focus": _vm.onFocus,
	      "blur": _vm.onBlur,
	      "input": _vm.onInput
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-62d24f30", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;