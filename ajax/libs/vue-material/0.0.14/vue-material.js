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

	var _componentsButtons = __webpack_require__(37);

	var _componentsButtons2 = _interopRequireDefault(_componentsButtons);

	var _componentsCards = __webpack_require__(54);

	var _componentsCards2 = _interopRequireDefault(_componentsCards);

	var _componentsChips = __webpack_require__(73);

	var _componentsChips2 = _interopRequireDefault(_componentsChips);

	var _componentsCommons = __webpack_require__(77);

	var _componentsCommons2 = _interopRequireDefault(_componentsCommons);

	var _componentsCrumb = __webpack_require__(81);

	var _componentsCrumb2 = _interopRequireDefault(_componentsCrumb);

	var _componentsFooter = __webpack_require__(85);

	var _componentsFooter2 = _interopRequireDefault(_componentsFooter);

	var _componentsForms = __webpack_require__(98);

	var _componentsForms2 = _interopRequireDefault(_componentsForms);

	var _componentsLists = __webpack_require__(127);

	var _componentsLists2 = _interopRequireDefault(_componentsLists);

	var _componentsNavbar = __webpack_require__(139);

	var _componentsNavbar2 = _interopRequireDefault(_componentsNavbar);

	var _componentsPreloader = __webpack_require__(151);

	var _componentsPreloader2 = _interopRequireDefault(_componentsPreloader);

	var _componentsSidenav = __webpack_require__(161);

	var _componentsSidenav2 = _interopRequireDefault(_componentsSidenav);

	var _directives = __webpack_require__(167);

	var _directives2 = _interopRequireDefault(_directives);

	/*
	import pagination from './components/pagination/';
	import waves from 'node-waves';
	*/

	exports['default'] = {
	    components: {
	        buttons: _componentsButtons2['default'],
	        cards: _componentsCards2['default'],
	        chips: _componentsChips2['default'],
	        commons: _componentsCommons2['default'],
	        crumb: _componentsCrumb2['default'],
	        footer: _componentsFooter2['default'],
	        forms: _componentsForms2['default'],
	        navbar: _componentsNavbar2['default'],
	        sidenav: _componentsSidenav2['default'],
	        preloader: _componentsPreloader2['default'],
	        lists: _componentsLists2['default']
	    },
	    directives: _directives2['default'],
	    _registered: [],
	    regAll: function regAll(Vue) {
	        for (var comName in this.components) {
	            if (this._registered.indexOf(comName) === -1) {
	                this._regComponent(Vue, comName);
	            }
	        }
	        this.regAllDirectives(Vue);
	    },
	    reg: function reg(Vue, names) {
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

	        this.regAllDirectives(Vue);
	    },
	    regAllDirectives: function regAllDirectives(Vue) {
	        for (var dirName in this.directives) {
	            if (this._registered.indexOf(dirName) === -1) {
	                this._regDirective(Vue, dirName);
	            }
	        }
	    },
	    getConstructor: function getConstructor(name) {
	        var result = undefined;
	        if (typeof name === "string") {}
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
	        }
	        this._registered.push(name);
	    },
	    _regDirective: function _regDirective(Vue, name) {
	        var obj = this.directives[name];
	        name = this._camel2kebab(name);
	        Vue.directive(name, obj);
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
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBtnVue = __webpack_require__(38);

	var _mdBtnVue2 = _interopRequireDefault(_mdBtnVue);

	var _mdFabVue = __webpack_require__(45);

	var _mdFabVue2 = _interopRequireDefault(_mdFabVue);

	exports['default'] = {
	    mdBtn: _mdBtnVue2['default'],
	    mdFab: _mdFabVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(44)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCommonMixinJs = __webpack_require__(40);

	exports['default'] = {
	    mixins: [_mixinsCommonMixinJs.hasIcon],
	    props: {
	        large: Boolean,
	        disabled: Boolean,
	        type: String
	    },
	    computed: {
	        btnType: function btnType() {
	            switch (this.type) {
	                case 'floating':
	                    return 'btn-floating';
	                case 'flat':
	                    return 'btn-flat';
	                default:
	                    return 'btn';
	            }
	        },
	        showIcon: function showIcon() {
	            return this.type !== 'flat' && this.iconText;
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _commonsMdIconVue = __webpack_require__(41);

	var _commonsMdIconVue2 = _interopRequireDefault(_commonsMdIconVue);

	exports["default"] = {
	    hasIcon: {
	        props: {
	            iconText: String,
	            iconPos: String
	        },
	        components: {
	            "md-icon": _commonsMdIconVue2["default"]
	        }
	    },
	    hasImg: {
	        props: {
	            imgSrc: String,
	            imgAlt: String
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(43)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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

	module.exports = "<i :class=\"['material-icons',pos]\">{{text}}</i>";

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"[btnType,disabled?'disabled':'',large?'btn-large':'']\">\n       <slot name=\"icon\">\n            <md-icon   v-if=\"showIcon\"  :text=\"iconText\" :pos=\"iconPos\"></md-icon>\n       </slot> \n        <slot>\n        </slot>\n    </a>";

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46)
	module.exports = __webpack_require__(50)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(53)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(49)(content, {});
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(48)();
	// imports


	// module
	exports.push([module.id, ".fixed-action-btn.active>ul a {\n    opacity: 1;\n}", ""]);

	// exports


/***/ },
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(51)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _utilsWrapChildrenJs = __webpack_require__(52);

	var _utilsWrapChildrenJs2 = _interopRequireDefault(_utilsWrapChildrenJs);

	exports['default'] = {
	    data: function data() {
	        return {
	            showSubs: false,
	            mainBtn: null
	        };
	    },
	    props: {
	        clickOnly: Boolean,
	        horizontal: Boolean
	    },
	    methods: {
	        toggleSubs: function toggleSubs() {
	            this.showSubs = !this.showSubs;
	        },
	        bindEvent: function bindEvent(isClick) {
	            this.showSubs = false;
	            this.unbindEvent();
	            if (isClick) {
	                this.mainBtn.addEventListener('click', this.toggleSubs);
	            } else {
	                this.$els.container.addEventListener('mouseover', this.toggleSubs);
	                this.$els.container.addEventListener('mouseout', this.toggleSubs);
	            }
	        },
	        unbindEvent: function unbindEvent() {
	            this.mainBtn.removeEventListener('click', this.toggleSubs);
	            this.$els.container.removeEventListener('mouseover', this.toggleSubs);
	            this.$els.container.removeEventListener('mouseout', this.toggleSubs);
	        }
	    },
	    watch: {
	        clickOnly: function clickOnly(v) {
	            this.bindEvent(v);
	        }
	    },
	    ready: function ready() {
	        var ul = this.$els.ul;
	        this.mainBtn = ul.children[0];
	        this.$el.insertBefore(this.mainBtn, ul);
	        (0, _utilsWrapChildrenJs2['default'])(ul, "li");

	        this.bindEvent(this.clickOnly);
	    },
	    beforeDestroy: function beforeDestroy() {
	        this.unbindEvent();
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (parent, tag) {
	    var len = parent.children.length;
	    for (var i = 0; i < len; i++) {
	        var wrapper = document.createElement(tag);
	        wrapper.appendChild(parent.children[0]);
	        parent.appendChild(wrapper);
	    }
	};

	module.exports = exports["default"];

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "<div v-el:container :class=\"{'fixed-action-btn':true,'active':showSubs,'horizontal':horizontal}\">\n    <ul v-el:ul v-show=\"showSubs\">\n        <slot></slot>\n    </ul>\n</div>";

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// import mdBasicCard from './md-basic-card.vue';
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdCardVue = __webpack_require__(55);

	var _mdCardVue2 = _interopRequireDefault(_mdCardVue);

	var _mdCardActionVue = __webpack_require__(58);

	var _mdCardActionVue2 = _interopRequireDefault(_mdCardActionVue);

	var _mdCardContentVue = __webpack_require__(61);

	var _mdCardContentVue2 = _interopRequireDefault(_mdCardContentVue);

	var _mdCardImgVue = __webpack_require__(64);

	var _mdCardImgVue2 = _interopRequireDefault(_mdCardImgVue);

	var _mdCardRevealVue = __webpack_require__(67);

	var _mdCardRevealVue2 = _interopRequireDefault(_mdCardRevealVue);

	var _mdCardTitleVue = __webpack_require__(70);

	var _mdCardTitleVue2 = _interopRequireDefault(_mdCardTitleVue);

	// import mdImageCard from './md-image-card.vue';
	// import mdPanelCard from './md-panel-card.vue';

	exports['default'] = {
	    // mdBasicCard,
	    mdCard: _mdCardVue2['default'],
	    mdCardAction: _mdCardActionVue2['default'],
	    mdCardContent: _mdCardContentVue2['default'],
	    mdCardImg: _mdCardImgVue2['default'],
	    mdCardReveal: _mdCardRevealVue2['default'],
	    mdCardTitle: _mdCardTitleVue2['default']
	};
	module.exports = exports['default'];
	// mdImageCard,
	// mdPanelCard,

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(56)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(57)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-card.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-card.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        panel: Boolean
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "<div :class=\"panel?'card-panel':'card'\">\n        <slot></slot>\n    </div>";

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(59)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(60)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 59 */
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
/* 60 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-action\">\n    <slot>\n        <a v-for=\"link in links\"  :href=\"link.href\">{{link.text}}</a>\n    </slot>\n</div>";

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(62)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(63)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 62 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-content\">  \n    <slot></slot>\n</div>";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(66)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCommonMixinJs = __webpack_require__(40);

	exports['default'] = {
	    props: {
	        reveal: Boolean,
	        src: String
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-image\">\n    <img :src=\"src\" :class=\"{'activator':reveal}\">\n    <slot></slot>      \n</div>";

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(68)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(69)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 68 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "<div class=\"card-reveal\">\n  <slot></slot>\n</div>";

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(71)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(72)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCommonMixinJs = __webpack_require__(40);

	exports['default'] = {
	    mixins: [_mixinsCommonMixinJs.hasIcon],
	    props: {
	        reveal: Boolean,
	        iconText: String
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "<span :class=\"{'card-title':true,'activator':reveal}\">\n    <slot></slot>\n    <md-icon v-if=\"reveal\" :text=\"iconText\" pos=\"right\"></md-icon>\n</span>";

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdChipVue = __webpack_require__(74);

	var _mdChipVue2 = _interopRequireDefault(_mdChipVue);

	exports['default'] = {
	    mdChip: _mdChipVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(76)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsCommonMixinJs = __webpack_require__(40);

	exports['default'] = {
	    mixins: [_mixinsCommonMixinJs.hasImg],
	    props: {
	        tag: Boolean
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "<div class=\"chip\">\n        <img v-if=\"imgSrc\" :src=\"imgSrc\" :alt=\"imgAlt\">\n        <slot></slot>\n        <i  v-if=\"tag\" class=\"material-icons\">close</i>\n    </div>";

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBadgeVue = __webpack_require__(78);

	var _mdBadgeVue2 = _interopRequireDefault(_mdBadgeVue);

	var _mdIconVue = __webpack_require__(41);

	var _mdIconVue2 = _interopRequireDefault(_mdIconVue);

	exports['default'] = {
	    mdBadge: _mdBadgeVue2['default'],
	    mdIcon: _mdIconVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(79)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(80)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-badge.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-badge.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 79 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        "new": Boolean
	    }
	};
	module.exports = exports["default"];
	// count:Number

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = "<span :class=\"['badge',new?'new':'']\"  >\n        <slot></slot>\n    </span>";

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdCrumbVue = __webpack_require__(82);

	var _mdCrumbVue2 = _interopRequireDefault(_mdCrumbVue);

	exports['default'] = {
	    mdCrumb: _mdCrumbVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(83)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(84)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-crumb.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-crumb.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-crumb.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-crumb.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-crumb.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        text: String
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "<a class=\"breadcrumb\">\n    <slot>\n        {{text}}\n    </slot>\n</a>";

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdFooterVue = __webpack_require__(86);

	var _mdFooterVue2 = _interopRequireDefault(_mdFooterVue);

	var _mdFooterContentVue = __webpack_require__(89);

	var _mdFooterContentVue2 = _interopRequireDefault(_mdFooterContentVue);

	var _mdFooterCopyrightVue = __webpack_require__(92);

	var _mdFooterCopyrightVue2 = _interopRequireDefault(_mdFooterCopyrightVue);

	var _mdFooterLinksVue = __webpack_require__(95);

	var _mdFooterLinksVue2 = _interopRequireDefault(_mdFooterLinksVue);

	exports['default'] = {
	    mdFooter: _mdFooterVue2['default'],
	    mdFooterContent: _mdFooterContentVue2['default'],
	    mdFooterCopyright: _mdFooterCopyrightVue2['default'],
	    mdFooterLinks: _mdFooterLinksVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(87)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(88)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 87 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = "<footer class=\"page-footer\">\n        <div class=\"container\">\n            <div v-el:row class=\"row\">\n                <slot></slot>\n            </div>\n        </div>\n        <slot name=\"copyright\"></slot>\n    </footer>";

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(90)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(91)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 90 */
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
/* 91 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <slot name=\"title\">\n        <h5 :class=\"[options.titleClass]\">{{options.title}}</h5>\n    </slot>\n    <slot name=\"text\">\n        <p  :class=\"[options.textClass]\">\n                {{options.text}}\n        </p>\n    </slot>\n    <slot></slot>\n</div>";

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(93)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(94)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 93 */
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
/* 94 */
/***/ function(module, exports) {

	module.exports = "<div class=\"footer-copyright\">\n            <div class=\"container\">\n                <slot>\n                    <span :class=\"[textClass]\">{{options.text}}</span>\n                    <a :class=\"[options.link.linkClass,'right']\" :href=\"options.link.href\">{{options.link.text}}\n                    </a>\n                </slot>\n            </div>\n </div>";

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(96)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(97)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 96 */
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
/* 97 */
/***/ function(module, exports) {

	module.exports = "<div>\n    <slot name=\"title\">\n      <h5 :class=\"[options.titleClass]\">{{options.title}}</h5>\n    </slot>\n    <slot name=\"links\">\n      <ul>\n          <li v-for=\"link in options.links\">\n              <a :href=\"link.href\"  :class=\"[options.linkClass]\">\n                  {{link.text}}\n              </a>\n          </li>\n      </ul>\n    </slot>\n</div>";

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdCheckboxVue = __webpack_require__(99);

	var _mdCheckboxVue2 = _interopRequireDefault(_mdCheckboxVue);

	// import mdDatepicker from './date_picker/';

	var _mdFileVue = __webpack_require__(103);

	var _mdFileVue2 = _interopRequireDefault(_mdFileVue);

	var _mdInputVue = __webpack_require__(106);

	var _mdInputVue2 = _interopRequireDefault(_mdInputVue);

	var _mdRadioVue = __webpack_require__(109);

	var _mdRadioVue2 = _interopRequireDefault(_mdRadioVue);

	var _mdRangeVue = __webpack_require__(112);

	var _mdRangeVue2 = _interopRequireDefault(_mdRangeVue);

	var _mdSelectVue = __webpack_require__(115);

	var _mdSelectVue2 = _interopRequireDefault(_mdSelectVue);

	var _mdSubmitVue = __webpack_require__(118);

	var _mdSubmitVue2 = _interopRequireDefault(_mdSubmitVue);

	var _mdSwitchVue = __webpack_require__(121);

	var _mdSwitchVue2 = _interopRequireDefault(_mdSwitchVue);

	var _mdTextareaVue = __webpack_require__(124);

	var _mdTextareaVue2 = _interopRequireDefault(_mdTextareaVue);

	exports['default'] = {
	    mdCheckbox: _mdCheckboxVue2['default'],
	    // mdDatepicker,
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(100)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(102)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        filled: Boolean
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _commonsIndexJs = __webpack_require__(77);

	var basicAttr = {
	    props: {
	        id: {
	            type: String,
	            'default': ''
	        },
	        name: {
	            type: String,
	            'default': ''
	        },
	        placeholder: {
	            type: String,
	            'default': ''
	        },
	        value: {
	            type: String,
	            'default': ''
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
	var actLabel = {
	    computed: {
	        labelActive: function labelActive() {
	            console.log("msg: " + this.mdValue);
	            return this.mdValue || this.placeholder || this.focus;
	        }
	    }
	};
	exports['default'] = {
	    basicAttr: basicAttr,
	    formIcon: formIcon,
	    status: status,
	    actLabel: actLabel
	};
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "<input type=\"checkbox\" :id=\"id\" :class=\"{'filled-in':filled}\" :name=\"name\" :checked=\"checked\" :disabled=\"disabled\" />\n      <label :for=\"id\"><slot></slot></label>";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(104)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(105)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

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
/* 105 */
/***/ function(module, exports) {

	module.exports = "<div class=\"file-field input-field\">\n    <div class=\"btn\">\n        <span>{{btnText}}</span>\n        <input  type=\"file\" :multiple=\"multiple\">\n    </div>\n    <div class=\"file-path-wrapper\">\n        <input class=\"file-path validate\" type=\"text\">\n    </div>\n</div>";

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(107)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(108)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

	exports["default"] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.formIcon, _mixinsFormMixinJs.status, _mixinsFormMixinJs.actLabel],
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
	        validate: Boolean
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "<div class=\"input-field\">\n        <md-icon v-if=\"iconText\" :class=\"{'active':focus}\" :text=\"iconText\" :pos=\"iconPos\"></md-icon>\n        <input v-model=\"mdValue\" :id=\"id\" v-el:input :name=\"name\" :value=\"value\" :placeholder=\"placeholder\" :type=\"type\" :disabled=\"disabled\" :required=\"required\" @focus=\"focus=true\" @blur=\"focus=false\" lazy>\n        <label :for=\"id\" :class=\"{'active':labelActive}\"><slot></slot></label>\n</div>";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(110)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(111)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        gap: Boolean
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = "<input :class=\"{'with-gap':gap}\" v-model=\"mdValue\" :checked=\"checked\" :value=\"value\" :name=\"name\" type=\"radio\" :id=\"id\" :disabled=\"disabled\" />\n    <label :for=\"id\"><slot></slot></label>";

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(113)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(114)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    data: function data() {
	        return {
	            showThumb: false,
	            thumbStyle: {
	                left: "0px",
	                width: '30px',
	                height: '30px',
	                top: '-20px',
	                marginLeft: "-15px"
	            }
	        };
	    },
	    props: {
	        id: String,
	        min: {
	            type: Number,
	            'default': 0
	        },
	        max: {
	            type: Number,
	            'default': 100
	        },
	        step: {
	            type: Number,
	            'default': 1
	        },
	        value: Number
	    },
	    watch: {
	        mdValue: function mdValue(value) {
	            var input = this.$els.input;
	            var left = value * input.clientWidth / this.max + 'px';
	            this.$set('thumbStyle.left', left);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = "<p class=\"range-field\">\n        <input v-el:input :id=\"id\" v-model=\"mdValue\" type=\"range\" :step=\"step\" :value=\"value\" :min=\"min\" :max=\"max\" @change=\"showThumb=true\" @click=\"showThumb=true\" @mouseout=\"showThumb=false\"/>\n        <span  v-show=\"showThumb\" :class=\"{thumb:true,active:showThumb}\" :style=\"thumbStyle\">\n            <span class=\"value\">{{mdValue}}</span>\n        </span>\n    </p>";

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(116)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(117)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

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
/* 117 */
/***/ function(module, exports) {

	module.exports = "<select :id=\"id\" :class=\"{'browser-default':browserDefault}\" :required=\"required\" :disabled=\"disabled\">\n      <option :value=\"defaultValue\" disabled selected>{{title}}</option>\n      <option v-for=\"option in options\" :value=\"option.value\">{{option.text}}</option>\n    </select>\n    <label :for=\"id\">{{label}}</label>";

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(119)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(120)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-submit.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-submit.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-submit.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-submit.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-submit.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

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
/* 120 */
/***/ function(module, exports) {

	module.exports = "<button class=\"btn\" type=\"submit\" :name=\"name\" :disabled=\"disabled\">{{btnText}}\n    <i class=\"material-icons right\">send</i>\n  </button>";

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(122)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(123)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.status],
	    props: {
	        text: {
	            type: Array,
	            'default': function _default() {
	                return ['off', 'on'];
	            }
	        },
	        value: Array
	    },
	    created: function created() {
	        if (this.text.length < 2) {
	            this.text = ['off', 'on'];
	        }
	        if (!this.value) {
	            this.value = [false, true];
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = "<div class=\"switch\">\n    <label>\n        <slot name=\"off\">\n        {{text[0]}}\n        </slot>\n        <input type=\"checkbox\" v-model=\"mdValue\" :false-value=\"value[0]\" :true-value=\"value[1]\" :checked=\"checked\" :disabled=\"disabled\" >\n        <span class=\"lever\"></span> \n        <slot name=\"on\">\n        {{text[1]}}\n        </slot>\n    </label>\n</div>";

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(125)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(126)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsFormMixinJs = __webpack_require__(101);

	exports['default'] = {
	    mixins: [_mixinsFormMixinJs.basicAttr, _mixinsFormMixinJs.formIcon, _mixinsFormMixinJs.status, _mixinsFormMixinJs.actLabel],
	    data: function data() {
	        return {
	            focus: false
	        };
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "<div class=\"input-field \">\n    <md-icon v-if=\"iconText\" :class=\"{'active':focus}\" :text=\"iconText\" :pos=\"iconPos\"></md-icon>\n    <textarea class=\"materialize-textarea\" v-model=\"mdValue\" :id=\"id\" v-el:input :name=\"name\" :value=\"value\" :placeholder=\"placeholder\" :disabled=\"disabled\" :required=\"required\" @focus=\"focus=true\" @blur=\"focus=false\" lazy></textarea>\n    <label :for=\"id\" :class=\"{'active':labelActive}\"><slot></slot></label>\n</div>";

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdListVue = __webpack_require__(128);

	var _mdListVue2 = _interopRequireDefault(_mdListVue);

	var _mdListAvatarVue = __webpack_require__(131);

	var _mdListAvatarVue2 = _interopRequireDefault(_mdListAvatarVue);

	var _mdListItemVue = __webpack_require__(133);

	var _mdListItemVue2 = _interopRequireDefault(_mdListItemVue);

	var _mdListSecVue = __webpack_require__(136);

	var _mdListSecVue2 = _interopRequireDefault(_mdListSecVue);

	exports['default'] = {
	    mdList: _mdListVue2['default'],
	    mdListAvatar: _mdListAvatarVue2['default'],
	    mdListItem: _mdListItemVue2['default'],
	    mdListSec: _mdListSecVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(129)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(130)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 129 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    data: function data() {
	        return {
	            withHeader: false,
	            isLinks: false
	        };
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = "<div v-if=\"isLinks\" :class=\"{'collection':true,'with-header':withHeader}\">\n    <slot></slot>\n</div>\n<ul v-else  :class=\"{'collection':true,'with-header':withHeader}\">\n<slot></slot>\n</ul>";

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(132)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-avatar.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-avatar.vue"], function () {
	var newOptions = null
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-avatar.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = "<li class=\"collection-item avatar\">\n    <slot></slot>\n</li>";

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(134)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(135)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list-item.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list-item.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-item.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list-item.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-item.vue")
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
	        header: Boolean,
	        href: String
	    },
	    created: function created() {
	        var parent = this.$parent;
	        if (!parent.withHeader && this.header === true) {
	            parent.withHeader = true;
	        }
	        if (!parent.isLinks && this.href) {
	            parent.isLinks = true;
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = "<a v-if=\"href\" :href=\"href\" :class=\"header?'collection-header':'collection-item'\">\n    <slot></slot>\n</a>\n<li v-else  :class=\"header?'collection-header':'collection-item'\">\n    <slot></slot>\n</li>";

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(137)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(138)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list-sec.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list-sec.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-sec.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-list-sec.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-list-sec.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 137 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = "<a class=\"secondary-content\">\n      <slot></slot>\n  </a>";

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdNavVue = __webpack_require__(140);

	var _mdNavVue2 = _interopRequireDefault(_mdNavVue);

	var _mdNavLinksVue = __webpack_require__(145);

	var _mdNavLinksVue2 = _interopRequireDefault(_mdNavLinksVue);

	var _mdNavLogoVue = __webpack_require__(148);

	var _mdNavLogoVue2 = _interopRequireDefault(_mdNavLogoVue);

	exports['default'] = {
	    mdNav: _mdNavVue2['default'],
	    mdNavLinks: _mdNavLinksVue2['default'],
	    mdNavLogo: _mdNavLogoVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(141)
	module.exports = __webpack_require__(143)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(144)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(49)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./md-nav.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./md-nav.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(48)();
	// imports


	// module
	exports.push([module.id, ".brand-logo.left {\n        left:0.5rem;\n    }", ""]);

	// exports


/***/ },
/* 143 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        fixed: Boolean
	    },
	    ready: function ready() {
	        if (this.fixed) {
	            var el = this.$el;
	            var parentNode = el.parentNode;
	            var div = document.createElement("div");
	            div.className = "navbar-fixed";
	            parentNode.insertBefore(div, el);
	            div.appendChild(el);
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "<nav>\n    <div class=\"nav-wrapper\">\n        <slot></slot>\n    </div>\n</nav>";

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(146)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(147)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-links.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-links.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-links.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-links.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-links.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(51)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utilsWrapChildrenJs = __webpack_require__(52);

	var _utilsWrapChildrenJs2 = _interopRequireDefault(_utilsWrapChildrenJs);

	exports["default"] = {
	    props: {
	        pos: {
	            type: String,
	            "default": "right"
	        }
	    },
	    ready: function ready() {
	        (0, _utilsWrapChildrenJs2["default"])(this.$el, "li");
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "<ul :class=\"[pos]\">\n        <slot></slot> \n    </ul>";

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(149)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(150)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 149 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        pos: {
	            type: String,
	            "default": "left"
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"['brand-logo',pos]\">\n    <slot>\n    </slot>\n</a>";

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdCircularVue = __webpack_require__(152);

	var _mdCircularVue2 = _interopRequireDefault(_mdCircularVue);

	var _mdCircularItemVue = __webpack_require__(154);

	var _mdCircularItemVue2 = _interopRequireDefault(_mdCircularItemVue);

	var _mdProgressVue = __webpack_require__(158);

	var _mdProgressVue2 = _interopRequireDefault(_mdProgressVue);

	exports['default'] = {
	    mdCircular: _mdCircularVue2['default'],
	    mdCircularItem: _mdCircularItemVue2['default'],
	    mdProgress: _mdProgressVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(153)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(157)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-circular.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-circular.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-circular.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-circular.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-circular.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(51)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mdCircularItemVue = __webpack_require__(154);

	var _mdCircularItemVue2 = _interopRequireDefault(_mdCircularItemVue);

	exports['default'] = {
	    props: ['colors'],
	    created: function created() {
	        var colors = this.colors;
	        if (colors == undefined) {
	            this.colors = [""];
	            return;
	        }
	        if (typeof colors === "string") {
	            colors = colors.split(' ');
	        }
	        if (colors.length === 1) {
	            this.colors = ['spinner-' + colors[0] + '-only'];
	        } else {
	            this.colors = colors.map(function (v) {
	                return 'spinner-' + v;
	            });
	        }
	    },
	    components: {
	        'md-circular-item': _mdCircularItemVue2['default']
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(155)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(156)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-circular-item.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-circular-item.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-circular-item.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-circular-item.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-circular-item.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 155 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		props: {
			color: String
		}
	};
	module.exports = exports["default"];

/***/ },
/* 156 */
/***/ function(module, exports) {

	module.exports = "<div :class=\"['spinner-layer',color]\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div>\n      <div class=\"gap-patch\">\n        <div class=\"circle\"></div>\n      </div>\n      <div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n   </div>";

/***/ },
/* 157 */
/***/ function(module, exports) {

	module.exports = "<div class=\"preloader-wrapper active\">\n        <md-circular-item v-for=\"color in colors\" :color=\"color\"></md-circular-item>\n  </div>";

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(159)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(160)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-progress.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-progress.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-progress.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-progress.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-progress.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 159 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        barColor: String,
	        percent: Number
	    },
	    computed: {
	        widthValue: function widthValue() {
	            if (this.percent >= 0) {
	                return this.percent < 100 ? this.percent + "%" : "100%";
	            } else {
	                return "";
	            }
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = "<div class=\"progress\">\n      <div :class=\"[widthValue?'determinate':'indeterminate',barColor]\" :style=\"{width:widthValue}\"></div>\n  </div>";

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _mdSidenavVue = __webpack_require__(162);

	var _mdSidenavVue2 = _interopRequireDefault(_mdSidenavVue);

	exports["default"] = {
	    mdSidenav: _mdSidenavVue2["default"]
	};
	module.exports = exports["default"];

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(163)
	module.exports = __webpack_require__(165)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(166)
	if (false) {
	(function () {
	var hotAPI = require("/Users/ElvisKang/projects/vue-material/node_modules/vue-loader/node_modules/vue-hot-reload-api/index.js")
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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(164);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(49)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./md-sidenav.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./md-sidenav.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(48)();
	// imports


	// module
	exports.push([module.id, ".side-nav.fixed li a {\n        font-size: 13px;\n        line-height: 44px;\n        height: 44px;\n    }", ""]);

	// exports


/***/ },
/* 165 */
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
/* 166 */
/***/ function(module, exports) {

	module.exports = "<ul  :class=\"['side-nav',fixed?'fixed':'']\" :style=\"{width:width+'px'}\">\n        <slot></slot>\n    </ul>";

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdModelJs = __webpack_require__(168);

	var _mdModelJs2 = _interopRequireDefault(_mdModelJs);

	exports['default'] = {
	    mdModel: _mdModelJs2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 168 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    twoWay: true,
	    bind: function bind() {
	        this.handler = (function () {
	            // console.log(this.el.__vue__.mdValue);
	            this.set(this.el.__vue__.mdValue);
	        }).bind(this);
	        this.el.addEventListener('change', this.handler);
	    },
	    unbind: function unbind() {
	        this.el.removeEventListener('change', this.handler);
	    }
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;