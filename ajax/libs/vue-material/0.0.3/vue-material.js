(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-material"] = factory();
	else
		root["vue-material"] = factory();
})(this, function() {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _componentsButtonIndexJs = __webpack_require__(33);

	var _componentsButtonIndexJs2 = _interopRequireDefault(_componentsButtonIndexJs);

	var _componentsChipIndexJs = __webpack_require__(59);

	var _componentsChipIndexJs2 = _interopRequireDefault(_componentsChipIndexJs);

	var _componentsCommonsIndexJs = __webpack_require__(37);

	var _componentsCommonsIndexJs2 = _interopRequireDefault(_componentsCommonsIndexJs);

	var _componentsFooterIndexJs = __webpack_require__(64);

	var _componentsFooterIndexJs2 = _interopRequireDefault(_componentsFooterIndexJs);

	var _componentsFormsIndexJs = __webpack_require__(77);

	var _componentsFormsIndexJs2 = _interopRequireDefault(_componentsFormsIndexJs);

	var _componentsNavbarIndexJs = __webpack_require__(106);

	var _componentsNavbarIndexJs2 = _interopRequireDefault(_componentsNavbarIndexJs);

	var _componentsSidenavIndexJs = __webpack_require__(116);

	var _componentsSidenavIndexJs2 = _interopRequireDefault(_componentsSidenavIndexJs);

	var _componentsCardIndexJs = __webpack_require__(120);

	var _componentsCardIndexJs2 = _interopRequireDefault(_componentsCardIndexJs);

	/*
	import collection from './components/collection/index.js';
	import pagination from './components/pagination/index.js';
	import preloader from './components/preloader/index.js';*/

	exports['default'] = {
	    components: {
	        button: _componentsButtonIndexJs2['default'],
	        card: _componentsCardIndexJs2['default'],
	        chip: _componentsChipIndexJs2['default'],
	        commons: _componentsCommonsIndexJs2['default'],
	        footer: _componentsFooterIndexJs2['default'],
	        forms: _componentsFormsIndexJs2['default'],
	        navbar: _componentsNavbarIndexJs2['default'],
	        sidenav: _componentsSidenavIndexJs2['default']
	    },
	    /*    
	        collection,
	        pagination,
	        preloader,*/
	    _registered: [],
	    registerAll: function registerAll(Vue) {
	        for (var comName in this.components) {
	            this._regComponent(Vue, comName);
	        }
	    },
	    register: function register(Vue, names) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _name = _step.value;

	                _name = _name.toLowerCase();
	                if (_name in this.components && this._registered.indexOf(_name) === -1) {
	                    this._regComponent(Vue, _name);
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator['return']) {
	                    _iterator['return']();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    },
	    //mdXxYy=>md-xx-yy
	    _camel2kebab: function _camel2kebab(str) {
	        var reg = /(?=[A-Z])/g;
	        return str.replace(reg, '-').toLowerCase();
	    },
	    _regComponent: function _regComponent(Vue, name) {
	        var com = this.components[name];
	        for (var item in com) {
	            var regName = this._camel2kebab(item);
	            Vue.component(regName, com[item]);
	            console.log(regName);
	        }
	        this._registered.push(name);
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBtnVue = __webpack_require__(34);

	var _mdBtnVue2 = _interopRequireDefault(_mdBtnVue);

	var _mdBtnFVue = __webpack_require__(49);

	var _mdBtnFVue2 = _interopRequireDefault(_mdBtnFVue);

	var _mdFabVue = __webpack_require__(52);

	var _mdFabVue2 = _interopRequireDefault(_mdFabVue);

	exports['default'] = {
	    mdBtn: _mdBtnVue2['default'],
	    mdBtnF: _mdBtnFVue2['default'],
	    mdFab: _mdFabVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(48)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn.vue"], function () {
	var newOptions = require("-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsButtonMixinJs = __webpack_require__(36);

	exports["default"] = {
	    mixins: [_mixinsButtonMixinJs.btnIcon],
	    props: {
	        disabled: Boolean,
	        iconPos: {
	            type: String,
	            "default": "left"
	        },
	        flat: Boolean
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commonsIndexJs = __webpack_require__(37);

	exports["default"] = {
	    btnIcon: {
	        props: {
	            iconText: String,
	            reveal: Boolean
	        },
	        components: {
	            "md-icon": _commonsIndexJs.mdIcon
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBadgeVue = __webpack_require__(38);

	var _mdBadgeVue2 = _interopRequireDefault(_mdBadgeVue);

	var _mdIconVue = __webpack_require__(41);

	var _mdIconVue2 = _interopRequireDefault(_mdIconVue);

	var _mdLinkVue = __webpack_require__(44);

	var _mdLinkVue2 = _interopRequireDefault(_mdLinkVue);

	exports['default'] = {
	    mdBadge: _mdBadgeVue2['default'],
	    mdIcon: _mdIconVue2['default'],
	    mdLink: _mdLinkVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(40)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-badge.vue"], function () {
	var newOptions = require("-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-badge.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        badge: Object
	    },
	    computed: {
	        count: function count() {
	            return Math.trunc(undefined.badge.count);
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<span v-show=\"count>0\" :class=\"['badge',badge.new?'new':'']\"  >{{count}}</span>";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(43)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-icon.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-icon.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-icon.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-icon.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-icon.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        text: String,
	        pos: String
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<i v-if=\"text\" :class=\"['material-icons',pos]\">{{text}}</i>";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(47)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-link.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-link.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-link.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-link.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-link.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mdBadgeVue = __webpack_require__(38);

	var _mdBadgeVue2 = _interopRequireDefault(_mdBadgeVue);

	exports['default'] = {
	    props: {
	        link: Object,
	        badge: Object
	    },
	    components: {
	        mdBadge: _mdBadgeVue2['default']
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "<a href=\"{{link.href}}\">\n    {{link.text}}\n    <md-badge :badge=\"badge\"></md-badge>\n</a>";

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"[flat?'btn-flat':'btn',disabled?'disabled':'']\">\n    <slot  name=\"icon\">\n        <md-icon   v-if=\"!flat\"  :text=\"iconText\" :pos=\"iconPos\"></md-icon>\n    </slot>\n    <slot></slot>\n</a>";

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(51)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn-f.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn-f.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn-f.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn-f.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn-f.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsButtonMixinJs = __webpack_require__(36);

	exports['default'] = {
	    mixins: [_mixinsButtonMixinJs.btnIcon],
	    props: {
	        disabled: Boolean,
	        iconText: {
	            type: String,
	            require: true
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"['btn-floating',disabled?'disabled':'']\" >\n        <md-icon   :text=\"iconText\"</md-icon>\n    </a>";

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53)
	module.exports = __webpack_require__(57)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(58)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-fab.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-fab.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-fab.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-fab.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-fab.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(54);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(56)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./md-fab.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./md-fab.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(55)();
	// imports


	// module
	exports.push([module.id, ".fixed-action-btn.active>ul a {\n    opacity: 1;\n}", ""]);

	// exports


/***/ },
/* 55 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    data: function data() {
	        return {
	            hover: false
	        };
	    },
	    methods: {
	        mouseEvent: function mouseEvent() {
	            this.hover = !this.hover;
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = "<div :class=\"{'fixed-action-btn':true,'active':hover}\" @mouseover=\"mouseEvent\" @mouseout=\"mouseEvent\">\n    <slot name=\"main\"></slot>\n    <ul v-show=\"hover\">\n        <slot></slot>\n    </ul>\n</div>";

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdChipVue = __webpack_require__(60);

	var _mdChipVue2 = _interopRequireDefault(_mdChipVue);

	exports['default'] = {
	    mdChip: _mdChipVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(61)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(63)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-chip.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-chip.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-chip.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-chip.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-chip.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCommonMixinJs = __webpack_require__(62);

	exports['default'] = {
	    props: {
	        tag: Boolean
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    hasImg: {
	        props: {
	            imgSrc: String,
	            imgAlt: String
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "<div class=\"chip\">\n        <img v-if=\"imgSrc\" :src=\"imgSrc\" :alt=\"imgAlt\">\n        <slot></slot>\n        <i  v-if=\"tag\" class=\"material-icons\">close</i>\n    </div>";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdFooterVue = __webpack_require__(65);

	var _mdFooterVue2 = _interopRequireDefault(_mdFooterVue);

	var _mdFooterContentVue = __webpack_require__(68);

	var _mdFooterContentVue2 = _interopRequireDefault(_mdFooterContentVue);

	var _mdFooterCopyrightVue = __webpack_require__(71);

	var _mdFooterCopyrightVue2 = _interopRequireDefault(_mdFooterCopyrightVue);

	var _mdFooterLinksVue = __webpack_require__(74);

	var _mdFooterLinksVue2 = _interopRequireDefault(_mdFooterLinksVue);

	exports['default'] = {
	    mdFooter: _mdFooterVue2['default'],
	    mdFooterContent: _mdFooterContentVue2['default'],
	    mdFooterCopyright: _mdFooterCopyrightVue2['default'],
	    mdFooterLinks: _mdFooterLinksVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(66)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(67)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = "<footer class=\"page-footer\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <slot  name=\"main\"></slot>\n            </div>\n        </div>\n        <slot name=\"copyright\"></slot>\n    </footer>";

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(69)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(70)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-content.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-content.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer-content.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-content.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer-content.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        options: Object
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <slot name=\"title\">\n        <h5 :class=\"[options.titleClass]\">{{options.title}}</h5>\n    </slot>\n    <slot name=\"text\">\n        <p  :class=\"[options.textClass]\">\n                {{options.text}}\n        </p>\n    </slot>\n    <slot></slot>\n</div>";

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(72)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(73)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-copyright.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-copyright.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer-copyright.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-copyright.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer-copyright.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        options: Object
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "<div class=\"footer-copyright\">\n            <div class=\"container\">\n                <slot>\n                    <span :class=\"[textClass]\">{{options.text}}</span>\n                    <a :class=\"[options.link.linkClass,'right']\" :href=\"options.link.href\">{{options.link.text}}\n                    </a>\n                </slot>\n            </div>\n </div>";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(76)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-links.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-links.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer-links.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-footer-links.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-footer-links.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 75 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	     value: true
	});
	exports["default"] = {
	     props: {
	          options: Object
	     }
	};
	module.exports = exports["default"];

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <slot name=\"title\">\n      <h5 :class=\"[options.titleClass]\">{{options.title}}</h5>\n    </slot>\n    <slot name=\"links\">\n      <ul>\n          <li v-for=\"link in options.links\">\n              <a :href=\"link.href\"  :class=\"[options.linkClass]\">\n                  {{link.text}}\n              </a>\n          </li>\n      </ul>\n    </slot>\n</div>";

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdCheckboxVue = __webpack_require__(78);

	var _mdCheckboxVue2 = _interopRequireDefault(_mdCheckboxVue);

	var _mdFileVue = __webpack_require__(82);

	var _mdFileVue2 = _interopRequireDefault(_mdFileVue);

	var _mdInputVue = __webpack_require__(85);

	var _mdInputVue2 = _interopRequireDefault(_mdInputVue);

	var _mdRadioVue = __webpack_require__(88);

	var _mdRadioVue2 = _interopRequireDefault(_mdRadioVue);

	var _mdRangeVue = __webpack_require__(91);

	var _mdRangeVue2 = _interopRequireDefault(_mdRangeVue);

	var _mdSelectVue = __webpack_require__(94);

	var _mdSelectVue2 = _interopRequireDefault(_mdSelectVue);

	var _mdSubmitVue = __webpack_require__(97);

	var _mdSubmitVue2 = _interopRequireDefault(_mdSubmitVue);

	var _mdSwitchVue = __webpack_require__(100);

	var _mdSwitchVue2 = _interopRequireDefault(_mdSwitchVue);

	var _mdTextareaVue = __webpack_require__(103);

	var _mdTextareaVue2 = _interopRequireDefault(_mdTextareaVue);

	exports['default'] = {
	    mdCheckbox: _mdCheckboxVue2['default'],
	    mdFile: _mdFileVue2['default'],
	    mdInput: _mdInputVue2['default'],
	    mdRadio: _mdRadioVue2['default'],
	    mdRange: _mdRangeVue2['default'],
	    mdSelect: _mdSelectVue2['default'],
	    mdSubmit: _mdSubmitVue2['default'],
	    mdSwitch: _mdSwitchVue2['default'],
	    mdTextarea: _mdTextareaVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(79)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(81)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-checkbox.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-checkbox.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-checkbox.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-checkbox.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-checkbox.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        filled: Boolean
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _commonsIndexJs = __webpack_require__(37);

	var basicAttr = {
	    replace: false,
	    props: {
	        id: String,
	        name: String,
	        placeholder: String,
	        value: {
	            type: String,
	            twoWay: true
	        }
	    }
	};
	var status = {
	    props: {
	        checked: Boolean,
	        disabled: Boolean,
	        required: Boolean
	    }
	};
	var formIcon = {
	    props: {
	        iconText: String,
	        iconPos: {
	            type: String,
	            'default': "prefix"
	        }
	    },
	    components: {
	        'md-icon': _commonsIndexJs.mdIcon
	    }
	};
	exports['default'] = {
	    basicAttr: basicAttr,
	    formIcon: formIcon,
	    status: status
	};
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = "<input type=\"checkbox\" :id=\"id\" :class=\"{'filled-in':filled}\" :name=\"name\" :checked=\"checked\" :disabled=\"disabled\" />\n      <label :for=\"id\">{{label}}</label>";

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(83)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(84)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-file.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-file.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-file.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-file.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-file.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports["default"] = {
	    mixins: [_mixinsFormMixinJs.basicAttr],
	    porps: {
	        multiple: Boolean,
	        btnText: {
	            type: String,
	            "default": "File"
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "<div class=\"file-field input-field\">\n    <div class=\"btn\">\n        <span>{{btnText}}</span>\n        <input  type=\"file\" :multiple=\"multiple\">\n    </div>\n    <div class=\"file-path-wrapper\">\n        <input class=\"file-path validate\" type=\"text\">\n    </div>\n</div>";

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(86)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(87)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-input.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-input.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-input.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-input.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-input.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports["default"] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.formIcon, _mixinsFormMixinJs.status],
	    data: function data() {
	        return {
	            focus: false
	        };
	    },
	    props: {
	        type: {
	            type: String,
	            "default": "text"
	        },
	        validate: Boolean,
	        value: {
	            type: String
	        }
	    },
	    computed: {
	        labelActive: function labelActive() {}
	    },
	    ready: function ready() {
	        console.log(this.value);
	    },
	    watch: {
	        value: function value() {
	            console.log(this.value);
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = "<div class=\"input-field\">\n        <slot name=\"icon\">\n            <md-icon :icon=\"icon\"></md-icon>\n        </slot>\n        <input :id=\"id\" :name=\"name\" :value=\"value?value:''\" :placeholder=\"placeholder\" :type=\"type\"  :class=\"{'validate':validate}\" :disabled=\"disabled\" :required=\"required\" @focus=\"focus=true\" @blur=\"focus=false\">\n        <label :for=\"id\" :class=\"{'active':focus}\"><slot></slot></label>\n</div>";

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(89)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(90)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-radio.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-radio.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-radio.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-radio.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-radio.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        gap: Boolean
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = "<input :class=\"{'with-gap':gap}\" :name=\"name\" type=\"radio\" :id=\"id\" :disable=\"disable\" />\n    <label :for=\"id\">{{label}}</label>";

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(92)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(93)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-range.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-range.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-range.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-range.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-range.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    data: function data() {
	        return {
	            showThumb: false,
	            thumb: {}
	        };
	    },
	    props: {
	        min: {
	            type: Number,
	            'default': 0
	        },
	        max: {
	            type: Number,
	            'default': 0
	        },
	        step: {
	            type: Number,
	            'default': 1
	        },
	        value: Number
	    },
	    methods: {
	        mouseEvent: function mouseEvent() {
	            this.showThumb = !this.showThumb;
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = "<p class=\"range-field\">\n    <input  @mouseup=\"mouseEvent\" @mousedown=\"mouseEvent\" @type=\"range\" :step=\"step\" :value=\"value\" :min=\"min\" :max=\"max\" v-model=\"rangeValue\"/>\n    <span  v-show=\"showThumb\" class=\"thumb\" :style=\"thumbStyle\" style=\"left: 289.344px; height: 0px; width: 0px; top: 10px; margin-left: -6px;\"><span class=\"value\">{{rangeValue}}</span></span>\n</p>";

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(95)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(96)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-select.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-select.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-select.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-select.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-select.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports["default"] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        defaultValue: {
	            type: String,
	            "default": ""
	        },
	        browserDefault: Boolean,
	        options: Object,
	        title: String
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = "<select :id=\"id\" :class=\"{'browser-default':browserDefault}\" :required=\"required\" :disabled=\"disabled\">\n      <option :value=\"defaultValue\" disabled selected>{{title}}</option>\n      <option v-for=\"option in options\" :value=\"option.value\">{{option.text}}</option>\n    </select>\n    <label :for=\"id\">{{label}}</label>";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(98)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(99)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-submit.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-submit.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-submit.vue"], function () {
	var newOptions = require("-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-submit.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-submit.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports["default"] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        btnText: {
	            type: String,
	            "default": "Submit"
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = "<button class=\"btn\" type=\"submit\" :name=\"name\" :disabled=\"disabled\">{{btnText}}\n    <i class=\"material-icons right\">send</i>\n  </button>";

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(101)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(102)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-switch.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-switch.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-switch.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-switch.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-switch.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports["default"] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        offText: {
	            type: String,
	            "default": "off"
	        },
	        onText: {
	            type: String,
	            "default": "on"
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "<div class=\"switch\">\n    <label>\n        {{offText}}\n        <input type=\"checkbox\" :id=\"id\" :name=\"name\" :value=\"value\" :checked=\"checked\" :disabled=\"disabled\" >\n        <span class=\"lever\"></span> \n        {{onText}}\n    </label>\n</div>";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(104)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(105)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-textarea.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-textarea.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-textarea.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-textarea.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-textarea.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(80);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.formIcon, _mixinsFormMixinJs.status]
	};
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = "<div class=\"input-field \">\n    <slot name=\"icon\">\n        <md-icon :icon=\"icon\"></md-icon>\n    </slot>\n    <textarea :id=\"id\" :name=\"name\" value=\"value\" class=\"materialize-textarea\" :disabled=\"disabled\"></textarea>\n    <label :for=\"id\">{{label}}</label>\n</div>";

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdNavVue = __webpack_require__(107);

	var _mdNavVue2 = _interopRequireDefault(_mdNavVue);

	var _mdNavLiVue = __webpack_require__(110);

	var _mdNavLiVue2 = _interopRequireDefault(_mdNavLiVue);

	var _mdNavLogoVue = __webpack_require__(113);

	var _mdNavLogoVue2 = _interopRequireDefault(_mdNavLogoVue);

	exports['default'] = {
	    mdNav: _mdNavVue2['default'],
	    mdNavLi: _mdNavLiVue2['default'],
	    mdNavLogo: _mdNavLogoVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(108)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(109)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        fixed: Boolean,
	        logo: Object,
	        noLink: Boolean,
	        linksPos: String
	        /*        logoText:String,
	                logoPos:{
	                    type:String,
	                    default:"right",
	                },
	                logoHref:{
	                    type:String,
	                    default:"#"
	                }*/
	    },
	    created: function created() {
	        //check logo
	        //logo.pos can be empty
	        var logo = this.logo;
	        logo.href = logo.href || "#";
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = "<nav>\n      <div class=\"nav-wrapper\">\n        <md-nav-logo :href=\"logo.href\" :text=\"logo.text\" :pos=\"logo.pos\">\n            <slot name=\"logo\"></slot>\n        </md-nav-logo>\n        <ul v-if=\"noLink\" :class=\"[linksPos]\">\n            <slot></slot> \n        </ul>\n      </div>\n</nav>";

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(111)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(112)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-li.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-li.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-li.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-li.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-li.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commonsIndexJs = __webpack_require__(37);

	exports["default"] = {
	    props: {
	        //can't work now
	        dropdown: {
	            type: Boolean,
	            "default": false
	        },
	        item: Object
	    },
	    components: {
	        'md-icon': _commonsIndexJs.mdIcon
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "<li>\n    <a :href=\"item.href\">\n        <md-icon v-if=\"item.icon\" :text=\"item.icon.text\" :pos=\"item.icon.pos\"></md-icon>\n        {{item.text}}\n    </a>\n</li>";

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(114)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(115)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-logo.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-logo.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-logo.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-logo.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-logo.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        href: String,
	        text: String,
	        pos: String
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = "<a :href=\"href\" :class=\"['brand-logo',pos]\">\n    <slot name=\"logo\">\n        {{text}}\n    </slot>\n</a>";

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _mdSidenavVue = __webpack_require__(117);

	var _mdSidenavVue2 = _interopRequireDefault(_mdSidenavVue);

	exports["default"] = {
	    mdSidenav: _mdSidenavVue2["default"]
	};
	module.exports = exports["default"];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(118)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(119)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-sidenav.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-sidenav.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-sidenav.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-sidenav.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-sidenav.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        fixed: Boolean,
	        width: {
	            type: Number,
	            "default": 240
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = "<ul  :class=\"['side-nav',fixed?'fixed':'']\" :style=\"{width:width+'px'}\">\n        <slot></slot>\n    </ul>";

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBasicCardVue = __webpack_require__(121);

	var _mdBasicCardVue2 = _interopRequireDefault(_mdBasicCardVue);

	var _mdCardActionVue = __webpack_require__(124);

	var _mdCardActionVue2 = _interopRequireDefault(_mdCardActionVue);

	var _mdCardContentVue = __webpack_require__(127);

	var _mdCardContentVue2 = _interopRequireDefault(_mdCardContentVue);

	var _mdCardImgVue = __webpack_require__(130);

	var _mdCardImgVue2 = _interopRequireDefault(_mdCardImgVue);

	var _mdCardRevealVue = __webpack_require__(137);

	var _mdCardRevealVue2 = _interopRequireDefault(_mdCardRevealVue);

	var _mdCardTitleVue = __webpack_require__(133);

	var _mdCardTitleVue2 = _interopRequireDefault(_mdCardTitleVue);

	var _mdImageCardVue = __webpack_require__(140);

	var _mdImageCardVue2 = _interopRequireDefault(_mdImageCardVue);

	var _mdPanelCardVue = __webpack_require__(143);

	var _mdPanelCardVue2 = _interopRequireDefault(_mdPanelCardVue);

	exports['default'] = {
	    mdBasicCard: _mdBasicCardVue2['default'],
	    mdCardAction: _mdCardActionVue2['default'],
	    mdCardContent: _mdCardContentVue2['default'],
	    mdCardImg: _mdCardImgVue2['default'],
	    mdCardReveal: _mdCardRevealVue2['default'],
	    mdCardTitle: _mdCardTitleVue2['default'],
	    mdImageCard: _mdImageCardVue2['default'],
	    mdPanelCard: _mdPanelCardVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(122)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(136)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-basic-card.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-basic-card.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-basic-card.vue"], function () {
	var newOptions = require("-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-basic-card.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-basic-card.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCardMixinJs = __webpack_require__(123);

	exports['default'] = {
	    mixins: [_mixinsCardMixinJs.basic]
	};
	module.exports = exports['default'];

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _cardMdCardActionVue = __webpack_require__(124);

	var _cardMdCardActionVue2 = _interopRequireDefault(_cardMdCardActionVue);

	var _cardMdCardContentVue = __webpack_require__(127);

	var _cardMdCardContentVue2 = _interopRequireDefault(_cardMdCardContentVue);

	var _cardMdCardImgVue = __webpack_require__(130);

	var _cardMdCardImgVue2 = _interopRequireDefault(_cardMdCardImgVue);

	var _cardMdCardTitleVue = __webpack_require__(133);

	var _cardMdCardTitleVue2 = _interopRequireDefault(_cardMdCardTitleVue);

	exports['default'] = {

	    basic: {
	        props: {
	            options: Object,
	            reveal: Boolean
	        },
	        components: {
	            'md-card-action': _cardMdCardActionVue2['default'],
	            'md-card-content': _cardMdCardContentVue2['default'],
	            'md-card-title': _cardMdCardTitleVue2['default'],
	            'md-card-img': _cardMdCardImgVue2['default']
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(125)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(126)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-action.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-action.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-action.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-action.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-action.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 125 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        links: Array
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-action\">\n    <slot name=\"links\">\n        <a v-for=\"link in links\"  :href=\"link.href\">{{link.text}}</a>\n    </slot>\n</div>";

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(128)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(129)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-content.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-content.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-content.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-content.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-content.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-content\">  \n    <slot name=\"title\"></slot>\n    <p><slot></slot></p>\n</div>";

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(131)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(132)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-img.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-img.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-img.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-img.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-img.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCommonMixinJs = __webpack_require__(62);

	exports['default'] = {
	    props: {
	        reveal: Boolean,
	        imgSrc: String
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-image\">\n    <img :src=\"imgSrc\" :class=\"{'activator':reveal}\">\n    <slot name=\"title\"></slot>      \n</div>";

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(134)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(135)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-title.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-title.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-title.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-title.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-title.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 134 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        reveal: Boolean
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = "<span :class=\"['card-title',reveal?'activator':'']\">\n    <slot></slot>\n    <slot name=\"icon\"></slot>\n</span>";

/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card\">\n        <md-card-content :class=\"options.content.class\">\n            <md-card-title :class=\"options.title.class\"  slot=\"title\">\n            {{options.title.text}}\n            <i  v-if=\"reveal\"  slot=\"icon\" class=\"material-icons right\">more_vert</i>\n            </md-card-title>\n            <slot name=\"content\">\n                {{options.content.text}}     \n            </slot>\n        </md-card-content>\n        <md-card-action v-if=\"! reveal\" :links=\"options.links\" >\n            <slot name=\"links\"></slot>\n        </md-card-action>\n        <slot name=\"reveal\"></slot>    \n    </div>";

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(138)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(139)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-reveal.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-reveal.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-reveal.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card-reveal.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card-reveal.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mdCardTitleVue = __webpack_require__(133);

	var _mdCardTitleVue2 = _interopRequireDefault(_mdCardTitleVue);

	exports['default'] = {
	    props: {
	        options: Object
	    },
	    components: {
	        'md-card-title': _mdCardTitleVue2['default']
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-reveal\">\n  <md-card-title  :class=\"options.title.class\" reveal>\n        {{options.title.text}}\n        <i slot=\"icon\" class=\"material-icons right\" >close</i>\n  </md-card-title>\n  <slot name=\"reveal-content\">\n      <p :class=\"options.content.class\">{{options.content.text}}</p>\n  </slot>\n</div>";

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(141)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(142)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-image-card.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-image-card.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-image-card.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-image-card.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-image-card.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCardMixinJs = __webpack_require__(123);

	exports['default'] = {
	    mixins: [_mixinsCardMixinJs.basic]
	};
	module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card\">\n    <md-card-img v-if=\"options.imgSrc\" :img-src=\"options.imgSrc\"  :reveal=\"reveal\">\n        <md-card-title v-if=\"! reveal\" slot=\"title\"  :class=\"options.title.class\">\n            {{options.title.text}}\n        </md-card-title>\n    </md-card-img>\n    <md-card-content  :class=\"options.content.class\">\n        <md-card-title v-if=\"reveal\" slot=\"title\"  :class=\"options.title.class\">\n            {{options.title.text}}\n             <i  slot=\"icon\" slot=\"icon\" class=\"material-icons right\">more_vert</i>\n        </md-card-title>\n        <slot name=\"content\">\n            {{options.content.text}}\n        </slot>\n    </md-card-content>\n    <md-card-action v-if=\"! reveal\":links=\"options.links\">\n        <slot name=\"links\"></slot>\n    </md-card-action> \n    <slot name=\"reveal\"></slot>\n</div>";

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(144)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(145)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-panel-card.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-panel-card.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-panel-card.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-panel-card.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-panel-card.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 144 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        options: Object
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-panel\">\n    <span :class=\"options.class\">\n        <slot>\n                {{options.text}}\n        </slot>\n    </span>\n</div>";

/***/ }
/******/ ])
});
;