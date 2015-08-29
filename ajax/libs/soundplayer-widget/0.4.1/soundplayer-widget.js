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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	__webpack_require__(1);

	var _widget = __webpack_require__(5);

	var SPWidget = _interopRequireWildcard(_widget);

	var elements = document.querySelectorAll('.sb-soundplayer-widget');

	for (var i = 0, len = elements.length; i < len; i++) {
	    var el = elements[i];
	    var url = el.getAttribute('data-url');
	    var layout = el.getAttribute('data-layout');

	    SPWidget.create(el, { url: url, layout: layout });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {"singleton":true});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/cssnext-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/cssnext-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	exports.push([module.id, ".sb-soundplayer-widget {\n    color: #fff;\n    font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Arial, sans-serif;\n    background-color: #f5f5f5;\n    background-image: url('https://w.soundcloud.com/player/assets/images/logo-200x120-177df3dd.png');\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: 100px 60px;\n    min-height: 240px;\n    overflow: hidden;\n    position: relative;\n    box-sizing: border-box;\n    border-radius: 3px;\n}\n.sb-soundplayer-widget *,\n.sb-soundplayer-widget *:before,\n.sb-soundplayer-widget *:after {\n    box-sizing: inherit;\n    margin: 0;\n    padding: 0;\n}\n.sb-soundplayer-widget-track-info {\n    color: #fff;\n    position: relative;\n    z-index: 1;\n    text-align: center;\n    padding-top: 80px;\n    padding-bottom: 53px;\n    text-transform: uppercase;\n    letter-spacing: .1em;\n}\n.sb-soundplayer-widget-user,\n.sb-soundplayer-widget-title {\n    margin: 2px 0;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    cursor: default;\n}\n.sb-soundplayer-widget-user {\n    font-size: 14px;\n}\n.sb-soundplayer-widget-title {\n    font-size: 20px;\n}\n.sb-soundplayer-widget-controls {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 0 10px 15px;\n    position: relative;\n    z-index: 1;\n}\n.sb-soundplayer-progress-container {\n    background-color: #000000;\n    background-color: rgba(0, 0, 0, .25);\n    width: 100%;\n    height: 8px;\n    overflow: hidden;\n    cursor: pointer;\n    border-radius: 3px;\n}\n.sb-soundplayer-progress-inner {\n    background-color: #fff;\n    height: 100%;\n    -webkit-transition: width .2s ease-in;\n            transition: width .2s ease-in;\n}\n.sb-soundplayer-cover {\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n    border-radius: 3px;\n    position: relative;\n    min-height: 240px;\n}\n.sb-soundplayer-widget-overlay {\n    background-color: #000000;\n    background-color: rgba(0, 0, 0, .3);\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border-radius: 3px;\n}\n.sb-soundplayer-play-btn {\n    display: inline-block;\n    border: 1px solid transparent;\n    color: #fff;\n    font-size: 20px;\n    text-decoration: none;\n    line-height: 1;\n    padding: 8px 16px;\n    height: auto;\n    vertical-align: middle;\n    -webkit-box-flex: 0;\n    -webkit-flex: none;\n        -ms-flex: none;\n            flex: none;\n    margin-right: 12px;\n    position: relative;\n    z-index: 2;\n    background-color: transparent;\n    -webkit-transition-duration: .1s;\n            transition-duration: .1s;\n    -webkit-transition-timing-function: ease-out;\n            transition-timing-function: ease-out;\n    -webkit-transition-property: box-shadow;\n            transition-property: box-shadow;\n    -webkit-appearance: none;\n    border-radius: 3px;\n    cursor: pointer;\n}\n.sb-soundplayer-play-btn:before {\n    content: '';\n    display: block;\n    border: 1px solid transparent;\n    background-color: currentcolor;\n    position: absolute;\n    z-index: -1;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    left: -1px;\n    -webkit-transition-duration: .1s;\n            transition-duration: .1s;\n    -webkit-transition-timing-function: ease-out;\n            transition-timing-function: ease-out;\n    -webkit-transition-property: opacity;\n            transition-property: opacity;\n    opacity: 0;\n    border-radius: 3px;\n}\n.sb-soundplayer-play-btn:hover,\n.sb-soundplayer-play-btn:active {\n  box-shadow: none;\n}\n.sb-soundplayer-play-btn:hover:before,\n.sb-soundplayer-play-btn:focus:before {\n    opacity: .09375;\n}\n.sb-soundplayer-play-btn:focus {\n    outline: none;\n    border-color: transparent;\n    box-shadow: 0 0 0 2px;\n}\n.sb-soundplayer-button-icon {\n    width: 1em;\n    height: 1em;\n    position: relative;\n    vertical-align: middle;\n}\n.sb-soundplayer-cover-logo {\n    color: #fff;\n    width: 100px;\n    height: 14px;\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    z-index: 1;\n}\n.sb-soundplayer-timer {\n    -webkit-box-flex: 0;\n    -webkit-flex: none;\n        -ms-flex: none;\n            flex: none;\n    color: #fff;\n    font-size: 12px;\n    padding: 0 3px 0 15px;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    cursor: default;\n}\n.sb-soundplayer-widget-message {\n    color: #999;\n    font-size: 12px;\n    text-align: center;\n    position: absolute;\n    right: 0;\n    left: 0;\n    bottom: 10px;\n}\n.sb-soundplayer-widget-message a {\n    color: #666;\n}\n", ""]);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @jsx dom */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.create = create;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var _deku = __webpack_require__(32);

	var _deku2 = _interopRequireDefault(_deku);

	var _Player = __webpack_require__(57);

	var _Player2 = _interopRequireDefault(_Player);

	var env = process.env.NODE_ENV || 'development';

	function create(el, opts) {
	    var clientId = opts.clientId || window.sb_soundplayer_client_id;
	    if (!clientId) {
	        console.error(['You must provide SoundCloud clientId for SoundPlayer widget', '', 'Example:', '<script>', 'var sb_soundplayer_client_id = "YOUR_CLIENT_ID";', '</script>', '', 'Register for an app and get clientId at https://developers.soundcloud.com/'].join('\n'));
	        return;
	    }

	    var app = _deku2['default'].tree((0, _magicVirtualElement2['default'])(_Player2['default'], { resolveUrl: opts.url, clientId: clientId }));

	    if (env === 'development') {
	        app.option('validateProps', true);
	    }

	    _deku2['default'].render(app, el);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var toStyle = __webpack_require__(8).string
	var classnames = __webpack_require__(25)
	var element = __webpack_require__(26)
	var type = __webpack_require__(30)
	var slice = __webpack_require__(31)

	module.exports = function (t, attributes, children) {

	  // Account for JSX putting the children as multiple arguments.
	  // This is essentially just the ES6 rest param
	  if (arguments.length > 2 && Array.isArray(arguments[2]) === false) {
	    children = slice(arguments, 2)
	  }

	  var node = element(t, attributes, children)

	  if (type(node.attributes.class) === 'array') {
	    node.attributes.class = classnames.apply(null, node.attributes.class)
	  }

	  if (type(node.attributes.class) === 'object') {
	    node.attributes.class = classnames(node.attributes.class)
	  }

	  if (type(node.attributes.style) === 'object') {
	    node.attributes.style = toStyle(node.attributes.style)
	  }

	  return node
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = {
	   prefixProperties: __webpack_require__(9) ,
	   cssUnitless: __webpack_require__(10) ,
	   object: __webpack_require__(11),
	   string: __webpack_require__(24)
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    'border-radius'              : 1,
	    'border-top-left-radius'     : 1,
	    'border-top-right-radius'    : 1,
	    'border-bottom-left-radius'  : 1,
	    'border-bottom-right-radius' : 1,
	    'box-shadow'                 : 1,
	    'order'                      : 1,
	    'flex'                       : function(name, prefix){
	        return [prefix + 'box-flex']
	    },
	    'box-flex'                   : 1,
	    'box-align'                  : 1,
	    'animation'                  : 1,
	    'animation-duration'         : 1,
	    'animation-name'             : 1,
	    'transition'                 : 1,
	    'transition-duration'        : 1,
	    'transform'                  : 1,
	    'transform-style'            : 1,
	    'transform-origin'           : 1,
	    'backface-visibility'        : 1,
	    'perspective'                : 1,
	    'box-pack'                   : 1
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use exports'

	//make sure properties are in hyphenated form

	module.exports = {
	    'animation'    : 1,
	    'column-count' : 1,
	    'columns'      : 1,
	    'font-weight'  : 1,
	    'opacity'      : 1,
	    'order  '      : 1,
	    'z-index'      : 1,
	    'zoom'         : 1,
	    'flex'         : 1,
	    'box-flex'     : 1,
	    'transform'    : 1,
	    'perspective'  : 1,
	    'box-pack'     : 1,
	    'box-align'    : 1,
	    'colspan'      : 1,
	    'rowspan'      : 1
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var prefixInfo  = __webpack_require__(13)
	var cssPrefixFn = __webpack_require__(15)

	var HYPHENATE   = __webpack_require__(19)
	var CAMELIZE   = __webpack_require__(17)
	var HAS_OWN     = __webpack_require__(12)
	var IS_OBJECT   = __webpack_require__(22)
	var IS_FUNCTION = __webpack_require__(23)

	var applyPrefix = function(target, property, value, normalizeFn){
	    cssPrefixFn(property).forEach(function(p){
	        target[normalizeFn? normalizeFn(p): p] = value
	    })
	}

	var toObject = function(str){
	    str = (str || '').split(';')

	    var result = {}

	    str.forEach(function(item){
	        var split = item.split(':')

	        if (split.length == 2){
	            result[split[0].trim()] = split[1].trim()
	        }
	    })

	    return result
	}

	var CONFIG = {
	    cssUnitless: __webpack_require__(10)
	}

	/**
	 * @ignore
	 * @method toStyleObject
	 *
	 * @param  {Object} styles The object to convert to a style object.
	 * @param  {Object} [config]
	 * @param  {Boolean} [config.addUnits=true] True if you want to add units when numerical values are encountered.
	 * @param  {Object}  config.cssUnitless An object whose keys represent css numerical property names that will not be appended with units.
	 * @param  {Object}  config.prefixProperties An object whose keys represent css property names that should be prefixed
	 * @param  {String}  config.cssUnit='px' The css unit to append to numerical values. Defaults to 'px'
	 * @param  {String}  config.normalizeName A function that normalizes a name to a valid css property name
	 * @param  {String}  config.scope
	 *
	 * @return {Object} The object, normalized with css style names
	 */
	var TO_STYLE_OBJECT = function(styles, config, prepend, result){

	    if (typeof styles == 'string'){
	        styles = toObject(styles)
	    }

	    config = config || CONFIG

	    config.cssUnitless = config.cssUnitless || CONFIG.cssUnitless

	    result = result || {}

	    var scope    = config.scope || {},

	        //configs
	        addUnits = config.addUnits != null?
	                            config.addUnits:
	                            scope && scope.addUnits != null?
	                                scope.addUnits:
	                                true,

	        cssUnitless      = (config.cssUnitless != null?
	                                config.cssUnitless:
	                                scope?
	                                    scope.cssUnitless:
	                                    null) || {},
	        cssUnit          = (config.cssUnit || scope? scope.cssUnit: null) || 'px',
	        prefixProperties = (config.prefixProperties || (scope? scope.prefixProperties: null)) || {},

	        camelize    = config.camelize,
	        normalizeFn = camelize? CAMELIZE: HYPHENATE

	    // Object.keys(cssUnitless).forEach(function(key){
	    //     cssUnitless[normalizeFn(key)] = 1
	    // })

	    var processed,
	        styleName,

	        propName,
	        propValue,
	        propCssUnit,
	        propType,
	        propIsNumber,

	        fnPropValue,
	        prefix

	    for (propName in styles) if (HAS_OWN(styles, propName)) {

	        propValue = styles[ propName ]

	        //the hyphenated style name (css property name)
	        styleName = HYPHENATE(prepend? prepend + propName: propName)

	        processed = false
	        prefix    = false

	        if (IS_FUNCTION(propValue)) {

	            //a function can either return a css value
	            //or an object with { value, prefix, name }
	            fnPropValue = propValue.call(scope || styles, propValue, propName, styleName, styles)

	            if (IS_OBJECT(fnPropValue) && fnPropValue.value != null){

	                propValue = fnPropValue.value
	                prefix    = fnPropValue.prefix
	                styleName = fnPropValue.name?
	                                HYPHENATE(fnPropValue.name):
	                                styleName

	            } else {
	                propValue = fnPropValue
	            }
	        }

	        propType     = typeof propValue
	        propIsNumber = propType == 'number' || (propType == 'string' && propValue != '' && propValue * 1 == propValue)

	        if (propValue == null || styleName == null || styleName === ''){
	            continue
	        }

	        if (propIsNumber || propType == 'string'){
	           processed = true
	        }

	        if (!processed && propValue.value != null && propValue.prefix){
	           processed = true
	           prefix    = propValue.prefix
	           propValue = propValue.value
	        }

	        // hyphenStyleName = camelize? HYPHENATE(styleName): styleName

	        if (processed){

	            prefix = prefix || !!prefixProperties[styleName]

	            if (propIsNumber){
	                propValue = addUnits && !(styleName in cssUnitless) ?
	                                propValue + cssUnit:
	                                propValue + ''//change it to a string, so that jquery does not append px or other units
	            }

	            //special border treatment
	            if (
	                    (
	                     styleName == 'border' ||
	                    (!styleName.indexOf('border')
	                        &&
	                        !~styleName.indexOf('radius')
	                        &&
	                        !~styleName.indexOf('width'))
	                    ) &&
	                    propIsNumber
	                ){

	                styleName = styleName + '-width'
	            }

	            //special border radius treatment
	            if (!styleName.indexOf('border-radius-')){
	                styleName.replace(/border(-radius)(-(.*))/, function(str, radius, theRest){
	                    var positions = {
	                        '-top'    : ['-top-left',      '-top-right' ],
	                        '-left'   : ['-top-left',    '-bottom-left' ],
	                        '-right'  : ['-top-right',   '-bottom-right'],
	                        '-bottom' : ['-bottom-left', '-bottom-right']
	                    }

	                    if (theRest in positions){
	                        styleName = []

	                        positions[theRest].forEach(function(pos){
	                            styleName.push('border' + pos + radius)
	                        })
	                    } else {
	                        styleName = 'border'+ theRest + radius
	                    }

	                })

	                if (Array.isArray(styleName)){
	                    styleName.forEach(function(styleName){
	                        if (prefix){
	                            applyPrefix(result, styleName, propValue, normalizeFn)
	                        } else {
	                            result[normalizeFn(styleName)] = propValue
	                        }
	                    })

	                    continue
	                }
	            }

	            if (prefix){
	                applyPrefix(result, styleName, propValue, normalizeFn)
	            } else {
	                result[normalizeFn(styleName)] = propValue
	            }

	        } else {
	            //the propValue must be an object, so go down the hierarchy
	            TO_STYLE_OBJECT(propValue, config, styleName + '-', result)
	        }
	    }

	    return result
	}

	module.exports = TO_STYLE_OBJECT

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectHasOwn = Object.prototype.hasOwnProperty

	module.exports = function(object, propertyName){
	    return objectHasOwn.call(object, propertyName)
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(14)

	var re         = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/

	var docStyle   = typeof document == 'undefined'?
	                    {}:
	                    document.documentElement.style

	var prefixInfo = (function(){

	    var prefix = (function(){

	            for (var prop in docStyle) {
	                if( re.test(prop) ) {
	                    // test is faster than match, so it's better to perform
	                    // that on the lot and match only when necessary
	                    return  prop.match(re)[0]
	                }
	            }

	            // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
	            // However (prop in style) returns the correct value, so we'll have to test for
	            // the precence of a specific property
	            if ('WebkitOpacity' in docStyle){
	                return 'Webkit'
	            }

	            if ('KhtmlOpacity' in docStyle) {
	                return 'Khtml'
	            }

	            return ''
	        })(),

	    lower = prefix.toLowerCase()

	    return {
	        style       : prefix,
	        css       : '-' + lower + '-',
	        dom       : ({
	            Webkit: 'WebKit',
	            ms    : 'MS',
	            o     : 'WebKit'
	        })[prefix] || toUpperFirst(prefix)
	    }

	})()

	module.exports = prefixInfo

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return value.length?
	                value.charAt(0).toUpperCase() + value.substring(1):
	                value
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16)()

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var camelize     = __webpack_require__(17)
	var hyphenate    = __webpack_require__(19)
	var toLowerFirst = __webpack_require__(21)
	var toUpperFirst = __webpack_require__(14)

	var prefixInfo = __webpack_require__(13)
	var prefixProperties = __webpack_require__(9)

	var docStyle = typeof document == 'undefined'?
	                {}:
	                document.documentElement.style

	module.exports = function(asStylePrefix){

	    return function(name, config){
	        config = config || {}

	        var styleName = toLowerFirst(camelize(name)),
	            cssName   = hyphenate(name),

	            theName   = asStylePrefix?
	                            styleName:
	                            cssName,

	            thePrefix = prefixInfo.style?
	                            asStylePrefix?
	                                prefixInfo.style:
	                                prefixInfo.css
	                            :
	                            ''

	        if ( styleName in docStyle ) {
	            return config.asString?
	                              theName :
	                            [ theName ]
	        }

	        //not a valid style name, so we'll return the value with a prefix

	        var upperCased     = theName,
	            prefixProperty = prefixProperties[cssName],
	            result         = []

	        if (asStylePrefix){
	            upperCased = toUpperFirst(theName)
	        }

	        if (typeof prefixProperty == 'function'){
	            var prefixedCss = prefixProperty(theName, thePrefix) || []
	            if (prefixedCss && !Array.isArray(prefixedCss)){
	                prefixedCss = [prefixedCss]
	            }

	            if (prefixedCss.length){
	                prefixedCss = prefixedCss.map(function(property){
	                    return asStylePrefix?
	                                toLowerFirst(camelize(property)):
	                                hyphenate(property)

	                })
	            }

	            result = result.concat(prefixedCss)
	        }

	        if (thePrefix){
	            result.push(thePrefix + upperCased)
	        }

	        result.push(theName)

	        if (config.asString || result.length == 1){
	            return result[0]
	        }

	        return result
	    }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var toCamelFn = function(str, letter){
	       return letter ? letter.toUpperCase(): ''
	   }

	var hyphenRe = __webpack_require__(18)

	module.exports = function(str){
	   return str?
	          str.replace(hyphenRe, toCamelFn):
	          ''
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = /[-\s]+(.)?/g

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var separate = __webpack_require__(20)

	module.exports = function(name){
	   return separate(name).toLowerCase()
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var doubleColonRe      = /::/g
	var upperToLowerRe     = /([A-Z]+)([A-Z][a-z])/g
	var lowerToUpperRe     = /([a-z\d])([A-Z])/g
	var underscoreToDashRe = /_/g

	module.exports = function(name, separator){

	   return name?
	           name.replace(doubleColonRe, '/')
	                .replace(upperToLowerRe, '$1_$2')
	                .replace(lowerToUpperRe, '$1_$2')
	                .replace(underscoreToDashRe, separator || '-')
	            :
	            ''
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return value.length?
	                value.charAt(0).toLowerCase() + value.substring(1):
	                value
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(v){
	    return !!v && objectToString.call(v) === '[object Object]'
	}



/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(v) {
	    return objectToString.apply(v) === '[object Function]'
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var toStyleObject = __webpack_require__(11)
	var hasOwn        = __webpack_require__(12)

	/**
	 * @ignore
	 * @method toStyleString
	 *
	 * @param  {Object} styles The object to convert to a style string.
	 * @param  {Object} config
	 * @param  {Boolean} config.addUnits=true True if you want to add units when numerical values are encountered. Defaults to true
	 * @param  {Object}  config.cssUnitless An object whose keys represent css numerical property names that will not be appended with units.
	 * @param  {Object}  config.prefixProperties An object whose keys represent css property names that should be prefixed
	 * @param  {String}  config.cssUnit='px' The css unit to append to numerical values. Defaults to 'px'
	 * @param  {String}  config.scope
	 *
	 * @return {Object} The object, normalized with css style names
	 */
	module.exports = function(styles, config){
	    styles = toStyleObject(styles, config)

	    var result = []
	    var prop

	    for(prop in styles) if (hasOwn(styles, prop)){
	        result.push(prop + ': ' + styles[prop])
	    }

	    return result.join('; ')
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var slice = __webpack_require__(27)
	var flatten = __webpack_require__(29)

	/**
	 * This function lets us create virtual nodes using a simple
	 * syntax. It is compatible with JSX transforms so you can use
	 * JSX to write nodes that will compile to this function.
	 *
	 * let node = element('div', { id: 'foo' }, [
	 *   element('a', { href: 'http://google.com' }, 'Google')
	 * ])
	 *
	 * You can leave out the attributes or the children if either
	 * of them aren't needed and it will figure out what you're
	 * trying to do.
	 */

	module.exports = element

	/**
	 * Create virtual trees of components.
	 *
	 * This creates the nicer API for the user.
	 * It translates that friendly API into an actual tree of nodes.
	 *
	 * @param {*} type
	 * @param {Object} attributes
	 * @param {Array} children
	 * @return {Object}
	 * @api public
	 */

	function element (type, attributes, children) {
	  // Default to div with no args
	  if (!type) {
	    throw new TypeError('element() needs a type.')
	  }

	  // Skipped adding attributes and we're passing
	  // in children instead.
	  if (arguments.length === 2 && (typeof attributes === 'string' || Array.isArray(attributes))) {
	    children = attributes
	    attributes = {}
	  }

	  // Account for JSX putting the children as multiple arguments.
	  // This is essentially just the ES6 rest param
	  if (arguments.length > 2 && children && Array.isArray(arguments[2]) === false) {
	    children = slice(arguments, 2)
	  }

	  children = children || []
	  attributes = attributes || {}

	  // passing in a single child, you can skip
	  // using the array
	  if (!Array.isArray(children)) {
	    children = [children]
	  }

	  // Flatten nested child arrays. This is how JSX compiles some nodes.
	  children = flatten(children, 2)

	  // if you pass in a function, it's a `Component` constructor.
	  // otherwise it's an element.
	  return {
	    type: type,
	    children: children,
	    attributes: attributes
	  }
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(28);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * An Array.prototype.slice.call(arguments) alternative
	 *
	 * @param {Object} args something with a length
	 * @param {Number} slice
	 * @param {Number} sliceEnd
	 * @api public
	 */

	module.exports = function (args, slice, sliceEnd) {
	  var ret = [];
	  var len = args.length;

	  if (0 === len) return ret;

	  var start = slice < 0
	    ? Math.max(0, slice + len)
	    : slice || 0;

	  if (sliceEnd !== undefined) {
	    len = sliceEnd < 0
	      ? sliceEnd + len
	      : sliceEnd
	  }

	  while (len-- > start) {
	    ret[len - start] = args[len];
	  }

	  return ret;
	}



/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	/**
	 * Expose `arrayFlatten`.
	 */
	module.exports = arrayFlatten

	/**
	 * Recursive flatten function with depth.
	 *
	 * @param  {Array}  array
	 * @param  {Array}  result
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function flattenWithDepth (array, result, depth) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]

	    if (depth > 0 && Array.isArray(value)) {
	      flattenWithDepth(value, result, depth - 1)
	    } else {
	      result.push(value)
	    }
	  }

	  return result
	}

	/**
	 * Recursive flatten function. Omitting depth is slightly faster.
	 *
	 * @param  {Array} array
	 * @param  {Array} result
	 * @return {Array}
	 */
	function flattenForever (array, result) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]

	    if (Array.isArray(value)) {
	      flattenForever(value, result)
	    } else {
	      result.push(value)
	    }
	  }

	  return result
	}

	/**
	 * Flatten an array, with the ability to define a depth.
	 *
	 * @param  {Array}  array
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function arrayFlatten (array, depth) {
	  if (depth == null) {
	    return flattenForever(array, [])
	  }

	  return flattenWithDepth(array, [], depth)
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * toString ref.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)

	  return typeof val;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * An Array.prototype.slice.call(arguments) alternative
	 *
	 * @param {Object} args something with a length
	 * @param {Number} slice
	 * @param {Number} sliceEnd
	 * @api public
	 */

	module.exports = function (args, slice, sliceEnd) {
	  var ret = [];
	  var len = args.length;

	  if (0 === len) return ret;

	  var start = slice < 0
	    ? Math.max(0, slice + len)
	    : slice || 0;

	  if (sliceEnd !== undefined) {
	    len = sliceEnd < 0
	      ? sliceEnd + len
	      : sliceEnd
	  }

	  while (len-- > start) {
	    ret[len - start] = args[len];
	  }

	  return ret;
	}



/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Create the application.
	 */

	exports.tree =
	exports.scene =
	exports.deku = __webpack_require__(33)

	/**
	 * Render scenes to the DOM.
	 */

	if (typeof document !== 'undefined') {
	  exports.render = __webpack_require__(35)
	}

	/**
	 * Render scenes to a string
	 */

	exports.renderString = __webpack_require__(56)

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(34)

	/**
	 * Expose `scene`.
	 */

	module.exports = Application

	/**
	 * Create a new `Application`.
	 *
	 * @param {Object} element Optional initial element
	 */

	function Application (element) {
	  if (!(this instanceof Application)) return new Application(element)
	  this.options = {}
	  this.sources = {}
	  this.element = element
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Application.prototype)

	/**
	 * Add a plugin
	 *
	 * @param {Function} plugin
	 */

	Application.prototype.use = function (plugin) {
	  plugin(this)
	  return this
	}

	/**
	 * Set an option
	 *
	 * @param {String} name
	 */

	Application.prototype.option = function (name, val) {
	  this.options[name] = val
	  return this
	}

	/**
	 * Set value used somewhere in the IO network.
	 */

	Application.prototype.set = function (name, data) {
	  this.sources[name] = data
	  this.emit('source', name, data)
	  return this
	}

	/**
	 * Mount a virtual element.
	 *
	 * @param {VirtualElement} element
	 */

	Application.prototype.mount = function (element) {
	  this.element = element
	  this.emit('mount', element)
	  return this
	}

	/**
	 * Remove the world. Unmount everything.
	 */

	Application.prototype.unmount = function () {
	  if (!this.element) return
	  this.element = null
	  this.emit('unmount')
	  return this
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Dependencies.
	 */

	var raf = __webpack_require__(36)
	var isDom = __webpack_require__(37)
	var uid = __webpack_require__(38)
	var keypath = __webpack_require__(39)
	var events = __webpack_require__(40)
	var svg = __webpack_require__(41)
	var defaults = __webpack_require__(44)
	var forEach = __webpack_require__(45)
	var assign = __webpack_require__(49)
	var reduce = __webpack_require__(50)
	var nodeType = __webpack_require__(54)

	/**
	 * Expose `dom`.
	 */

	module.exports = render

	/**
	 * Render an app to the DOM
	 *
	 * @param {Application} app
	 * @param {HTMLElement} container
	 * @param {Object} opts
	 *
	 * @return {Object}
	 */

	function render (app, container, opts) {
	  var frameId
	  var isRendering
	  var rootId = 'root'
	  var currentElement
	  var currentNativeElement
	  var connections = {}
	  var components = {}
	  var entities = {}
	  var handlers = {}
	  var mountQueue = []
	  var children = {}
	  children[rootId] = {}

	  if (!isDom(container)) {
	    throw new Error('Container element must be a DOM element')
	  }

	  /**
	   * Rendering options. Batching is only ever really disabled
	   * when running tests, and pooling can be disabled if the user
	   * is doing something stupid with the DOM in their components.
	   */

	  var options = defaults(assign({}, app.options || {}, opts || {}), {
	    batching: true
	  })

	  /**
	   * Listen to DOM events
	   */
	  var rootElement = getRootElement(container)
	  addNativeEventListeners()

	  /**
	   * Watch for changes to the app so that we can update
	   * the DOM as needed.
	   */

	  app.on('unmount', onunmount)
	  app.on('mount', onmount)
	  app.on('source', onupdate)

	  /**
	   * If the app has already mounted an element, we can just
	   * render that straight away.
	   */

	  if (app.element) render()

	  /**
	   * Teardown the DOM rendering so that it stops
	   * rendering and everything can be garbage collected.
	   */

	  function teardown () {
	    removeNativeEventListeners()
	    removeNativeElement()
	    app.off('unmount', onunmount)
	    app.off('mount', onmount)
	    app.off('source', onupdate)
	  }

	  /**
	   * Swap the current rendered node with a new one that is rendered
	   * from the new virtual element mounted on the app.
	   *
	   * @param {VirtualElement} element
	   */

	  function onmount () {
	    invalidate()
	  }

	  /**
	   * If the app unmounts an element, we should clear out the current
	   * rendered element. This will remove all the entities.
	   */

	  function onunmount () {
	    removeNativeElement()
	    currentElement = null
	  }

	  /**
	   * Update all components that are bound to the source
	   *
	   * @param {String} name
	   * @param {*} data
	   */

	  function onupdate (name, data) {
	    if (!connections[name]) return;
	    connections[name].forEach(function(update) {
	      update(data)
	    })
	  }

	  /**
	   * Render and mount a component to the native dom.
	   *
	   * @param {Entity} entity
	   * @return {HTMLElement}
	   */

	  function mountEntity (entity) {
	    register(entity)
	    setSources(entity)
	    children[entity.id] = {}
	    entities[entity.id] = entity

	    // commit initial state and props.
	    commit(entity)

	    // callback before mounting.
	    trigger('beforeMount', entity, [entity.context])
	    trigger('beforeRender', entity, [entity.context])

	    // render virtual element.
	    var virtualElement = renderEntity(entity)
	    // create native element.
	    var nativeElement = toNative(entity.id, '0', virtualElement)

	    entity.virtualElement = virtualElement
	    entity.nativeElement = nativeElement

	    // Fire afterRender and afterMount hooks at the end
	    // of the render cycle
	    mountQueue.push(entity.id)

	    return nativeElement
	  }

	  /**
	   * Remove a component from the native dom.
	   *
	   * @param {Entity} entity
	   */

	  function unmountEntity (entityId) {
	    var entity = entities[entityId]
	    if (!entity) return
	    trigger('beforeUnmount', entity, [entity.context, entity.nativeElement])
	    unmountChildren(entityId)
	    removeAllEvents(entityId)
	    var componentEntities = components[entityId].entities;
	    delete componentEntities[entityId]
	    delete components[entityId]
	    delete entities[entityId]
	    delete children[entityId]
	  }

	  /**
	   * Render the entity and make sure it returns a node
	   *
	   * @param {Entity} entity
	   *
	   * @return {VirtualTree}
	   */

	  function renderEntity (entity) {
	    var component = entity.component
	    var fn = typeof component === 'function' ? component : component.render
	    if (!fn) throw new Error('Component needs a render function')
	    var result = fn(entity.context, setState(entity))
	    if (!result) throw new Error('Render function must return an element.')
	    return result
	  }

	  /**
	   * Whenever setState or setProps is called, we mark the entity
	   * as dirty in the renderer. This lets us optimize the re-rendering
	   * and skip components that definitely haven't changed.
	   *
	   * @param {Entity} entity
	   *
	   * @return {Function} A curried function for updating the state of an entity
	   */

	  function setState (entity) {
	    return function (nextState) {
	      updateEntityState(entity, nextState)
	    }
	  }

	  /**
	   * Tell the app it's dirty and needs to re-render. If batching is disabled
	   * we can just trigger a render immediately, otherwise we'll wait until
	   * the next available frame.
	   */

	  function invalidate () {
	    if (!options.batching) {
	      if (!isRendering) render()
	    } else {
	      if (!frameId) frameId = raf(render)
	    }
	  }

	  /**
	   * Update the DOM. If the update fails we stop the loop
	   * so we don't get errors on every frame.
	   *
	   * @api public
	   */

	  function render () {
	    // If this is called synchronously we need to
	    // cancel any pending future updates
	    clearFrame()

	    // If the rendering from the previous frame is still going,
	    // we'll just wait until the next frame. Ideally renders should
	    // not take over 16ms to stay within a single frame, but this should
	    // catch it if it does.
	    if (isRendering) {
	      frameId = raf(render)
	      return
	    } else {
	      isRendering = true
	    }

	    // 1. If there isn't a native element rendered for the current mounted element
	    // then we need to create it from scratch.
	    // 2. If a new element has been mounted, we should diff them.
	    // 3. We should update check all child components for changes.
	    if (!currentNativeElement) {
	      currentElement = app.element
	      currentNativeElement = toNative(rootId, '0', currentElement)
	      if (container.children.length > 0) {
	        console.info('deku: The container element is not empty. These elements will be removed. Read more: http://cl.ly/b0Sr')
	      }
	      if (container === document.body) {
	        console.warn('deku: Using document.body is allowed but it can cause some issues. Read more: http://cl.ly/b0SC')
	      }
	      removeAllChildren(container)
	      container.appendChild(currentNativeElement)
	    } else if (currentElement !== app.element) {
	      currentNativeElement = patch(rootId, currentElement, app.element, currentNativeElement)
	      currentElement = app.element
	      updateChildren(rootId)
	    } else {
	      updateChildren(rootId)
	    }

	    // Call mount events on all new entities
	    flushMountQueue()

	    // Allow rendering again.
	    isRendering = false

	  }

	  /**
	   * Call hooks for all new entities that have been created in
	   * the last render from the bottom up.
	   */

	  function flushMountQueue () {
	    while (mountQueue.length > 0) {
	      var entityId = mountQueue.shift()
	      var entity = entities[entityId]
	      trigger('afterRender', entity, [entity.context, entity.nativeElement])
	      trigger('afterMount', entity, [entity.context, entity.nativeElement, setState(entity)])
	    }
	  }

	  /**
	   * Clear the current scheduled frame
	   */

	  function clearFrame () {
	    if (!frameId) return
	    raf.cancel(frameId)
	    frameId = 0
	  }

	  /**
	   * Update a component.
	   *
	   * The entity is just the data object for a component instance.
	   *
	   * @param {String} id Component instance id.
	   */

	  function updateEntity (entityId) {
	    var entity = entities[entityId]
	    setSources(entity)

	    if (!shouldUpdate(entity)) {
	      commit(entity)
	      return updateChildren(entityId)
	    }

	    var currentTree = entity.virtualElement
	    var nextProps = entity.pendingProps
	    var nextState = entity.pendingState
	    var previousState = entity.context.state
	    var previousProps = entity.context.props

	    // hook before rendering. could modify state just before the render occurs.
	    trigger('beforeUpdate', entity, [entity.context, nextProps, nextState])
	    trigger('beforeRender', entity, [entity.context])

	    // commit state and props.
	    commit(entity)

	    // re-render.
	    var nextTree = renderEntity(entity)

	    // if the tree is the same we can just skip this component
	    // but we should still check the children to see if they're dirty.
	    // This allows us to memoize the render function of components.
	    if (nextTree === currentTree) return updateChildren(entityId)

	    // apply new virtual tree to native dom.
	    entity.nativeElement = patch(entityId, currentTree, nextTree, entity.nativeElement)
	    entity.virtualElement = nextTree
	    updateChildren(entityId)

	    // trigger render hook
	    trigger('afterRender', entity, [entity.context, entity.nativeElement])

	    // trigger afterUpdate after all children have updated.
	    trigger('afterUpdate', entity, [entity.context, previousProps, previousState, setState(entity)])
	  }

	  /**
	   * Update all the children of an entity.
	   *
	   * @param {String} id Component instance id.
	   */

	  function updateChildren (entityId) {
	    forEach(children[entityId], function (childId) {
	      updateEntity(childId)
	    })
	  }

	  /**
	   * Remove all of the child entities of an entity
	   *
	   * @param {Entity} entity
	   */

	  function unmountChildren (entityId) {
	    forEach(children[entityId], function (childId) {
	      unmountEntity(childId)
	    })
	  }

	  /**
	   * Remove the root element. If this is called synchronously we need to
	   * cancel any pending future updates.
	   */

	  function removeNativeElement () {
	    clearFrame()
	    removeElement(rootId, '0', currentNativeElement)
	    currentNativeElement = null
	  }

	  /**
	   * Create a native element from a virtual element.
	   *
	   * @param {String} entityId
	   * @param {String} path
	   * @param {Object} vnode
	   *
	   * @return {HTMLDocumentFragment}
	   */

	  function toNative (entityId, path, vnode) {
	    switch (nodeType(vnode)) {
	      case 'text': return toNativeText(vnode)
	      case 'empty': return toNativeEmptyElement(entityId, path)
	      case 'element': return toNativeElement(entityId, path, vnode)
	      case 'component': return toNativeComponent(entityId, path, vnode)
	    }
	  }

	  /**
	   * Create a native text element from a virtual element.
	   *
	   * @param {Object} vnode
	   */

	  function toNativeText (text) {
	    return document.createTextNode(text)
	  }

	  /**
	   * Create a native element from a virtual element.
	   */

	  function toNativeElement (entityId, path, vnode) {
	    var el
	    var attributes = vnode.attributes
	    var tagName = vnode.type
	    var childNodes = vnode.children

	    // create element either from pool or fresh.
	    if (svg.isElement(tagName)) {
	      el = document.createElementNS(svg.namespace, tagName)
	    } else {
	      el = document.createElement(tagName)
	    }

	    // set attributes.
	    forEach(attributes, function (value, name) {
	      setAttribute(entityId, path, el, name, value)
	    })

	    // add children.
	    forEach(childNodes, function (child, i) {
	      var childEl = toNative(entityId, path + '.' + i, child)
	      if (!childEl.parentNode) el.appendChild(childEl)
	    })

	    // store keys on the native element for fast event handling.
	    el.__entity__ = entityId
	    el.__path__ = path

	    return el
	  }

	  /**
	   * Create a native element from a virtual element.
	   */

	  function toNativeEmptyElement (entityId, path) {
	    var el = document.createElement('noscript')
	    el.__entity__ = entityId
	    el.__path__ = path
	    return el
	  }

	  /**
	   * Create a native element from a component.
	   */

	  function toNativeComponent (entityId, path, vnode) {
	    var child = new Entity(vnode.type, assign({ children: vnode.children }, vnode.attributes), entityId)
	    children[entityId][path] = child.id
	    return mountEntity(child)
	  }

	  /**
	   * Patch an element with the diff from two trees.
	   */

	  function patch (entityId, prev, next, el) {
	    return diffNode('0', entityId, prev, next, el)
	  }

	  /**
	   * Create a diff between two trees of nodes.
	   */

	  function diffNode (path, entityId, prev, next, el) {
	    var leftType = nodeType(prev)
	    var rightType = nodeType(next)

	    // Type changed. This could be from element->text, text->ComponentA,
	    // ComponentA->ComponentB etc. But NOT div->span. These are the same type
	    // (ElementNode) but different tag name.
	    if (leftType !== rightType) return replaceElement(entityId, path, el, next)

	    switch (rightType) {
	      case 'text': return diffText(prev, next, el)
	      case 'empty': return el
	      case 'element': return diffElement(path, entityId, prev, next, el)
	      case 'component': return diffComponent(path, entityId, prev, next, el)
	    }
	  }

	  /**
	   * Diff two text nodes and update the element.
	   */

	  function diffText (previous, current, el) {
	    if (current !== previous) el.data = current
	    return el
	  }

	  /**
	   * Diff the children of an ElementNode.
	   */

	  function diffChildren (path, entityId, prev, next, el) {
	    var positions = []
	    var hasKeys = false
	    var childNodes = Array.prototype.slice.apply(el.childNodes)
	    var leftKeys = reduce(prev.children, keyMapReducer, {})
	    var rightKeys = reduce(next.children, keyMapReducer, {})
	    var currentChildren = assign({}, children[entityId])

	    function keyMapReducer (acc, child, i) {
	      if (child && child.attributes && child.attributes.key != null) {
	        acc[child.attributes.key] = {
	          element: child,
	          index: i
	        }
	        hasKeys = true
	      }
	      return acc
	    }

	    // Diff all of the nodes that have keys. This lets us re-used elements
	    // instead of overriding them and lets us move them around.
	    if (hasKeys) {

	      // Removals
	      forEach(leftKeys, function (leftNode, key) {
	        if (rightKeys[key] == null) {
	          var leftPath = path + '.' + leftNode.index
	          removeElement(
	            entityId,
	            leftPath,
	            childNodes[leftNode.index]
	          )
	        }
	      })

	      // Update nodes
	      forEach(rightKeys, function (rightNode, key) {
	        var leftNode = leftKeys[key]

	        // We only want updates for now
	        if (leftNode == null) return

	        var leftPath = path + '.' + leftNode.index

	        // Updated
	        positions[rightNode.index] = diffNode(
	          leftPath,
	          entityId,
	          leftNode.element,
	          rightNode.element,
	          childNodes[leftNode.index]
	        )
	      })

	      // Update the positions of all child components and event handlers
	      forEach(rightKeys, function (rightNode, key) {
	        var leftNode = leftKeys[key]

	        // We just want elements that have moved around
	        if (leftNode == null || leftNode.index === rightNode.index) return

	        var rightPath = path + '.' + rightNode.index
	        var leftPath = path + '.' + leftNode.index

	        // Update all the child component path positions to match
	        // the latest positions if they've changed. This is a bit hacky.
	        forEach(currentChildren, function (childId, childPath) {
	          if (leftPath === childPath) {
	            delete children[entityId][childPath]
	            children[entityId][rightPath] = childId
	          }
	        })
	      })

	      // Now add all of the new nodes last in case their path
	      // would have conflicted with one of the previous paths.
	      forEach(rightKeys, function (rightNode, key) {
	        var rightPath = path + '.' + rightNode.index
	        if (leftKeys[key] == null) {
	          positions[rightNode.index] = toNative(
	            entityId,
	            rightPath,
	            rightNode.element
	          )
	        }
	      })

	    } else {
	      var maxLength = Math.max(prev.children.length, next.children.length)

	      // Now diff all of the nodes that don't have keys
	      for (var i = 0; i < maxLength; i++) {
	        var leftNode = prev.children[i]
	        var rightNode = next.children[i]

	        // Removals
	        if (rightNode === undefined) {
	          removeElement(
	            entityId,
	            path + '.' + i,
	            childNodes[i]
	          )
	          continue
	        }

	        // New Node
	        if (leftNode === undefined) {
	          positions[i] = toNative(
	            entityId,
	            path + '.' + i,
	            rightNode
	          )
	          continue
	        }

	        // Updated
	        positions[i] = diffNode(
	          path + '.' + i,
	          entityId,
	          leftNode,
	          rightNode,
	          childNodes[i]
	        )
	      }
	    }

	    // Reposition all the elements
	    forEach(positions, function (childEl, newPosition) {
	      var target = el.childNodes[newPosition]
	      if (childEl && childEl !== target) {
	        if (target) {
	          el.insertBefore(childEl, target)
	        } else {
	          el.appendChild(childEl)
	        }
	      }
	    })
	  }

	  /**
	   * Diff the attributes and add/remove them.
	   */

	  function diffAttributes (prev, next, el, entityId, path) {
	    var nextAttrs = next.attributes
	    var prevAttrs = prev.attributes

	    // add new attrs
	    forEach(nextAttrs, function (value, name) {
	      if (events[name] || !(name in prevAttrs) || prevAttrs[name] !== value) {
	        setAttribute(entityId, path, el, name, value)
	      }
	    })

	    // remove old attrs
	    forEach(prevAttrs, function (value, name) {
	      if (!(name in nextAttrs)) {
	        removeAttribute(entityId, path, el, name)
	      }
	    })
	  }

	  /**
	   * Update a component with the props from the next node. If
	   * the component type has changed, we'll just remove the old one
	   * and replace it with the new component.
	   */

	  function diffComponent (path, entityId, prev, next, el) {
	    if (next.type !== prev.type) {
	      return replaceElement(entityId, path, el, next)
	    } else {
	      var targetId = children[entityId][path]

	      // This is a hack for now
	      if (targetId) {
	        updateEntityProps(targetId, assign({ children: next.children }, next.attributes))
	      }

	      return el
	    }
	  }

	  /**
	   * Diff two element nodes.
	   */

	  function diffElement (path, entityId, prev, next, el) {
	    if (next.type !== prev.type) return replaceElement(entityId, path, el, next)
	    diffAttributes(prev, next, el, entityId, path)
	    diffChildren(path, entityId, prev, next, el)
	    return el
	  }

	  /**
	   * Removes an element from the DOM and unmounts and components
	   * that are within that branch
	   *
	   * side effects:
	   *   - removes element from the DOM
	   *   - removes internal references
	   *
	   * @param {String} entityId
	   * @param {String} path
	   * @param {HTMLElement} el
	   */

	  function removeElement (entityId, path, el) {
	    var childrenByPath = children[entityId]
	    var childId = childrenByPath[path]
	    var entityHandlers = handlers[entityId] || {}
	    var removals = []

	    // If the path points to a component we should use that
	    // components element instead, because it might have moved it.
	    if (childId) {
	      var child = entities[childId]
	      el = child.nativeElement
	      unmountEntity(childId)
	      removals.push(path)
	    } else {

	      // Just remove the text node
	      if (!isElement(el)) return el && el.parentNode.removeChild(el)

	      // Then we need to find any components within this
	      // branch and unmount them.
	      forEach(childrenByPath, function (childId, childPath) {
	        if (childPath === path || isWithinPath(path, childPath)) {
	          unmountEntity(childId)
	          removals.push(childPath)
	        }
	      })

	      // Remove all events at this path or below it
	      forEach(entityHandlers, function (fn, handlerPath) {
	        if (handlerPath === path || isWithinPath(path, handlerPath)) {
	          removeEvent(entityId, handlerPath)
	        }
	      })
	    }

	    // Remove the paths from the object without touching the
	    // old object. This keeps the object using fast properties.
	    forEach(removals, function (path) {
	      delete children[entityId][path]
	    })

	    // Remove it from the DOM
	    el.parentNode.removeChild(el)
	  }

	  /**
	   * Replace an element in the DOM. Removing all components
	   * within that element and re-rendering the new virtual node.
	   *
	   * @param {Entity} entity
	   * @param {String} path
	   * @param {HTMLElement} el
	   * @param {Object} vnode
	   *
	   * @return {void}
	   */

	  function replaceElement (entityId, path, el, vnode) {
	    var parent = el.parentNode
	    var index = Array.prototype.indexOf.call(parent.childNodes, el)

	    // remove the previous element and all nested components. This
	    // needs to happen before we create the new element so we don't
	    // get clashes on the component paths.
	    removeElement(entityId, path, el)

	    // then add the new element in there
	    var newEl = toNative(entityId, path, vnode)
	    var target = parent.childNodes[index]

	    if (target) {
	      parent.insertBefore(newEl, target)
	    } else {
	      parent.appendChild(newEl)
	    }

	    // walk up the tree and update all `entity.nativeElement` references.
	    if (entityId !== 'root' && path === '0') {
	      updateNativeElement(entityId, newEl)
	    }

	    return newEl
	  }

	  /**
	   * Update all entities in a branch that have the same nativeElement. This
	   * happens when a component has another component as it's root node.
	   *
	   * @param {String} entityId
	   * @param {HTMLElement} newEl
	   *
	   * @return {void}
	   */

	  function updateNativeElement (entityId, newEl) {
	    var target = entities[entityId]
	    if (target.ownerId === 'root') return
	    if (children[target.ownerId]['0'] === entityId) {
	      entities[target.ownerId].nativeElement = newEl
	      updateNativeElement(target.ownerId, newEl)
	    }
	  }

	  /**
	   * Set the attribute of an element, performing additional transformations
	   * dependning on the attribute name
	   *
	   * @param {HTMLElement} el
	   * @param {String} name
	   * @param {String} value
	   */

	  function setAttribute (entityId, path, el, name, value) {
	    if (!value) {
	      removeAttribute(entityId, path, el, name)
	      return
	    }
	    if (events[name]) {
	      addEvent(entityId, path, events[name], value)
	      return
	    }
	    switch (name) {
	      case 'checked':
	      case 'disabled':
	      case 'selected':
	        el[name] = true
	        break
	      case 'innerHTML':
	        el.innerHTML = value
	        break
	      case 'value':
	        setElementValue(el, value)
	        break
	      case svg.isAttribute(name):
	        el.setAttributeNS(svg.namespace, name, value)
	        break
	      default:
	        el.setAttribute(name, value)
	        break
	    }
	  }

	  /**
	   * Remove an attribute, performing additional transformations
	   * dependning on the attribute name
	   *
	   * @param {HTMLElement} el
	   * @param {String} name
	   */

	  function removeAttribute (entityId, path, el, name) {
	    if (events[name]) {
	      removeEvent(entityId, path, events[name])
	      return
	    }
	    switch (name) {
	      case 'checked':
	      case 'disabled':
	      case 'selected':
	        el[name] = false
	        break
	      case 'innerHTML':
	        el.innerHTML = ''
	      case 'value':
	        setElementValue(el, null)
	        break
	      default:
	        el.removeAttribute(name)
	        break
	    }
	  }

	  /**
	   * Checks to see if one tree path is within
	   * another tree path. Example:
	   *
	   * 0.1 vs 0.1.1 = true
	   * 0.2 vs 0.3.5 = false
	   *
	   * @param {String} target
	   * @param {String} path
	   *
	   * @return {Boolean}
	   */

	  function isWithinPath (target, path) {
	    return path.indexOf(target + '.') === 0
	  }

	  /**
	   * Is the DOM node an element node
	   *
	   * @param {HTMLElement} el
	   *
	   * @return {Boolean}
	   */

	  function isElement (el) {
	    return !!(el && el.tagName)
	  }

	  /**
	   * Remove all the child nodes from an element
	   *
	   * @param {HTMLElement} el
	   */

	  function removeAllChildren (el) {
	    while (el.firstChild) el.removeChild(el.firstChild)
	  }

	  /**
	   * Trigger a hook on a component.
	   *
	   * @param {String} name Name of hook.
	   * @param {Entity} entity The component instance.
	   * @param {Array} args To pass along to hook.
	   */

	  function trigger (name, entity, args) {
	    if (typeof entity.component[name] !== 'function') return
	    return entity.component[name].apply(null, args)
	  }

	  /**
	   * Update an entity to match the latest rendered vode. We always
	   * replace the props on the component when composing them. This
	   * will trigger a re-render on all children below this point.
	   *
	   * @param {Entity} entity
	   * @param {String} path
	   * @param {Object} vnode
	   *
	   * @return {void}
	   */

	  function updateEntityProps (entityId, nextProps) {
	    var entity = entities[entityId]
	    entity.pendingProps = defaults({}, nextProps, entity.component.defaultProps || {})
	    entity.dirty = true
	    invalidate()
	  }

	  /**
	   * Update component instance state.
	   */

	  function updateEntityState (entity, nextState) {
	    entity.pendingState = assign(entity.pendingState, nextState)
	    entity.dirty = true
	    invalidate()
	  }

	  /**
	   * Commit props and state changes to an entity.
	   */

	  function commit (entity) {
	    entity.context = {
	      state: entity.pendingState,
	      props: entity.pendingProps,
	      id: entity.id
	    }
	    entity.pendingState = assign({}, entity.context.state)
	    entity.pendingProps = assign({}, entity.context.props)
	    entity.dirty = false
	    if (typeof entity.component.validate === 'function') {
	      entity.component.validate(entity.context)
	    }
	  }

	  /**
	   * Try to avoid creating new virtual dom if possible.
	   *
	   * Later we may expose this so you can override, but not there yet.
	   */

	  function shouldUpdate (entity) {
	    if (!entity.dirty) return false
	    if (!entity.component.shouldUpdate) return true
	    var nextProps = entity.pendingProps
	    var nextState = entity.pendingState
	    var bool = entity.component.shouldUpdate(entity.context, nextProps, nextState)
	    return bool
	  }

	  /**
	   * Register an entity.
	   *
	   * This is mostly to pre-preprocess component properties and values chains.
	   *
	   * The end result is for every component that gets mounted,
	   * you create a set of IO nodes in the network from the `value` definitions.
	   *
	   * @param {Component} component
	   */

	  function register (entity) {
	    registerEntity(entity)
	    var component = entity.component
	    if (component.registered) return

	    // initialize sources once for a component type.
	    registerSources(entity)
	    component.registered = true
	  }

	  /**
	   * Add entity to data-structures related to components/entities.
	   *
	   * @param {Entity} entity
	   */

	  function registerEntity(entity) {
	    var component = entity.component
	    // all entities for this component type.
	    var entities = component.entities = component.entities || {}
	    // add entity to component list
	    entities[entity.id] = entity
	    // map to component so you can remove later.
	    components[entity.id] = component
	  }

	  /**
	   * Initialize sources for a component by type.
	   *
	   * @param {Entity} entity
	   */

	  function registerSources(entity) {
	    var component = components[entity.id]
	    // get 'class-level' sources.
	    // if we've already hooked it up, then we're good.
	    var sources = component.sources
	    if (sources) return
	    var entities = component.entities

	    // hook up sources.
	    var map = component.sourceToPropertyName = {}
	    component.sources = sources = []
	    var propTypes = component.propTypes
	    for (var name in propTypes) {
	      var data = propTypes[name]
	      if (!data) continue
	      if (!data.source) continue
	      sources.push(data.source)
	      map[data.source] = name
	    }

	    // send value updates to all component instances.
	    sources.forEach(function (source) {
	      connections[source] = connections[source] || []
	      connections[source].push(update)

	      function update (data) {
	        var prop = map[source]
	        for (var entityId in entities) {
	          var entity = entities[entityId]
	          var changes = {}
	          changes[prop] = data
	          updateEntityProps(entityId, assign(entity.pendingProps, changes))
	        }
	      }
	    })
	  }

	  /**
	   * Set the initial source value on the entity
	   *
	   * @param {Entity} entity
	   */

	  function setSources (entity) {
	    var component = entity.component
	    var map = component.sourceToPropertyName
	    var sources = component.sources
	    sources.forEach(function (source) {
	      var name = map[source]
	      if (entity.pendingProps[name] != null) return
	      entity.pendingProps[name] = app.sources[source] // get latest value plugged into global store
	    })
	  }

	  /**
	   * Add all of the DOM event listeners
	   */

	  function addNativeEventListeners () {
	    forEach(events, function (eventType) {
	      rootElement.addEventListener(eventType, handleEvent, true)
	    })
	  }

	  /**
	   * Add all of the DOM event listeners
	   */

	  function removeNativeEventListeners () {
	    forEach(events, function (eventType) {
	      rootElement.removeEventListener(eventType, handleEvent, true)
	    })
	  }

	  /**
	   * Handle an event that has occured within the container
	   *
	   * @param {Event} event
	   */

	  function handleEvent (event) {
	    var target = event.target
	    var eventType = event.type

	    // Walk up the DOM tree and see if there is a handler
	    // for this event type higher up.
	    while (target) {
	      var fn = keypath.get(handlers, [target.__entity__, target.__path__, eventType])
	      if (fn) {
	        event.delegateTarget = target
	        if (fn(event) === false) break
	      }
	      target = target.parentNode
	    }
	  }

	  /**
	   * Bind events for an element, and all it's rendered child elements.
	   *
	   * @param {String} path
	   * @param {String} event
	   * @param {Function} fn
	   */

	  function addEvent (entityId, path, eventType, fn) {
	    keypath.set(handlers, [entityId, path, eventType], function (e) {
	      var entity = entities[entityId]
	      if (entity) {
	        fn.call(null, e, entity.context, setState(entity))
	      } else {
	        fn.call(null, e)
	      }
	    })
	  }

	  /**
	   * Unbind events for a entityId
	   *
	   * @param {String} entityId
	   */

	  function removeEvent (entityId, path, eventType) {
	    var args = [entityId]
	    if (path) args.push(path)
	    if (eventType) args.push(eventType)
	    keypath.del(handlers, args)
	  }

	  /**
	   * Unbind all events from an entity
	   *
	   * @param {Entity} entity
	   */

	  function removeAllEvents (entityId) {
	    keypath.del(handlers, [entityId])
	  }

	  /**
	   * Used for debugging to inspect the current state without
	   * us needing to explicitly manage storing/updating references.
	   *
	   * @return {Object}
	   */

	  function inspect () {
	    return {
	      entities: entities,
	      handlers: handlers,
	      connections: connections,
	      currentElement: currentElement,
	      options: options,
	      app: app,
	      container: container,
	      children: children
	    }
	  }

	  /**
	   * Return an object that lets us completely remove the automatic
	   * DOM rendering and export debugging tools.
	   */

	  return {
	    remove: teardown,
	    inspect: inspect
	  }
	}

	/**
	 * A rendered component instance.
	 *
	 * This manages the lifecycle, props and state of the component.
	 * It's basically just a data object for more straightfoward lookup.
	 *
	 * @param {Component} component
	 * @param {Object} props
	 */

	function Entity (component, props, ownerId) {
	  this.id = uid()
	  this.ownerId = ownerId
	  this.component = component
	  this.propTypes = component.propTypes || {}
	  this.context = {}
	  this.context.id = this.id
	  this.context.props = defaults(props || {}, component.defaultProps || {})
	  this.context.state = this.component.initialState ? this.component.initialState(this.context.props) : {}
	  this.pendingProps = assign({}, this.context.props)
	  this.pendingState = assign({}, this.context.state)
	  this.dirty = false
	  this.virtualElement = null
	  this.nativeElement = null
	  this.displayName = component.name || 'Component'
	}

	/**
	 * Retrieve the nearest 'body' ancestor of the given element or else the root
	 * element of the document in which stands the given element.
	 *
	 * This is necessary if you want to attach the events handler to the correct
	 * element and be able to dispatch events in document fragments such as
	 * Shadow DOM.
	 *
	 * @param  {HTMLElement} el The element on which we will render an app.
	 * @return {HTMLElement}    The root element on which we will attach the events
	 *                          handler.
	 */

	function getRootElement (el) {
	  while (el.parentElement) {
	    if (el.tagName === 'BODY' || !el.parentElement) {
	      return el
	    }
	    el = el.parentElement
	  }
	  return el
	}

	/**
	 * Set the value property of an element and keep the text selection
	 * for input fields.
	 *
	 * @param {HTMLElement} el
	 * @param {String} value
	 */

	function setElementValue (el, value) {
	  if (el === document.activeElement && canSelectText(el)) {
	    var start = el.selectionStart
	    var end = el.selectionEnd
	    el.value = value
	    el.setSelectionRange(start, end)
	  } else {
	    el.value = value
	  }
	}

	/**
	 * For some reason only certain types of inputs can set the selection range.
	 *
	 * @param {HTMLElement} el
	 *
	 * @return {Boolean}
	 */

	function canSelectText (el) {
	  return el.tagName === 'INPUT' && ['text','search','password','tel','url'].indexOf(el.type) > -1
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */

	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;

	/**
	 * Fallback implementation.
	 */

	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}

	/**
	 * Cancel.
	 */

	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;

	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*global window*/

	/**
	 * Check if object is dom node.
	 *
	 * @param {Object} val
	 * @return {Boolean}
	 * @api public
	 */

	module.exports = function isNode(val){
	  if (!val || typeof val !== 'object') return false;
	  if (window && 'object' == typeof window.Node) return val instanceof window.Node;
	  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/** generate unique id for selector */
	var counter = Date.now() % 1e9;

	module.exports = function getUid(){
		return (Math.random() * 1e9 >>> 0) + (counter++);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';

	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';

	  var
	    toStr = Object.prototype.toString,
	    _hasOwnProperty = Object.prototype.hasOwnProperty;

	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (!isString(value)) {
	        for (var i in value) {
	            if (_hasOwnProperty.call(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }

	  function toString(type){
	    return toStr.call(type);
	  }

	  function isNumber(value){
	    return typeof value === 'number' || toString(value) === "[object Number]";
	  }

	  function isString(obj){
	    return typeof obj === 'string' || toString(obj) === "[object String]";
	  }

	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }

	  function isArray(obj){
	    return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
	  }

	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }

	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }

	  function set(obj, path, value, doNotReplace){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isString(path)) {
	      return set(obj, path.split('.').map(getKey), value, doNotReplace);
	    }
	    var currentPath = path[0];

	    if (path.length === 1) {
	      var oldVal = obj[currentPath];
	      if (oldVal === void 0 || !doNotReplace) {
	        obj[currentPath] = value;
	      }
	      return oldVal;
	    }

	    if (obj[currentPath] === void 0) {
	      //check if we assume an array
	      if(isNumber(path[1])) {
	        obj[currentPath] = [];
	      } else {
	        obj[currentPath] = {};
	      }
	    }

	    return set(obj[currentPath], path.slice(1), value, doNotReplace);
	  }

	  function del(obj, path) {
	    if (isNumber(path)) {
	      path = [path];
	    }

	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    if (isEmpty(path)) {
	      return obj;
	    }
	    if(isString(path)) {
	      return del(obj, path.split('.'));
	    }

	    var currentPath = getKey(path[0]);
	    var oldVal = obj[currentPath];

	    if(path.length === 1) {
	      if (oldVal !== void 0) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      }
	    } else {
	      if (obj[currentPath] !== void 0) {
	        return del(obj[currentPath], path.slice(1));
	      }
	    }

	    return obj;
	  }

	  var objectPath = function(obj) {
	    return Object.keys(objectPath).reduce(function(proxy, prop) {
	      if (typeof objectPath[prop] === 'function') {
	        proxy[prop] = objectPath[prop].bind(objectPath, obj);
	      }

	      return proxy;
	    }, {});
	  };

	  objectPath.has = function (obj, path) {
	    if (isEmpty(obj)) {
	      return false;
	    }

	    if (isNumber(path)) {
	      path = [path];
	    } else if (isString(path)) {
	      path = path.split('.');
	    }

	    if (isEmpty(path) || path.length === 0) {
	      return false;
	    }

	    for (var i = 0; i < path.length; i++) {
	      var j = path[i];
	      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
	        obj = obj[j];
	      } else {
	        return false;
	      }
	    }

	    return true;
	  };

	  objectPath.ensureExists = function (obj, path, value){
	    return set(obj, path, value, true);
	  };

	  objectPath.set = function (obj, path, value, doNotReplace){
	    return set(obj, path, value, doNotReplace);
	  };

	  objectPath.insert = function (obj, path, value, at){
	    var arr = objectPath.get(obj, path);
	    at = ~~at;
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }
	    arr.splice(at, 0, value);
	  };

	  objectPath.empty = function(obj, path) {
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    var value, i;
	    if (!(value = objectPath.get(obj, path))) {
	      return obj;
	    }

	    if (isString(value)) {
	      return objectPath.set(obj, path, '');
	    } else if (isBoolean(value)) {
	      return objectPath.set(obj, path, false);
	    } else if (isNumber(value)) {
	      return objectPath.set(obj, path, 0);
	    } else if (isArray(value)) {
	      value.length = 0;
	    } else if (isObject(value)) {
	      for (i in value) {
	        if (_hasOwnProperty.call(value, i)) {
	          delete value[i];
	        }
	      }
	    } else {
	      return objectPath.set(obj, path, null);
	    }
	  };

	  objectPath.push = function (obj, path /*, values */){
	    var arr = objectPath.get(obj, path);
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }

	    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	  };

	  objectPath.coalesce = function (obj, paths, defaultValue) {
	    var value;

	    for (var i = 0, len = paths.length; i < len; i++) {
	      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	        return value;
	      }
	    }

	    return defaultValue;
	  };

	  objectPath.get = function (obj, path, defaultValue){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return defaultValue;
	    }
	    if (isString(path)) {
	      return objectPath.get(obj, path.split('.'), defaultValue);
	    }

	    var currentPath = getKey(path[0]);

	    if (path.length === 1) {
	      if (obj[currentPath] === void 0) {
	        return defaultValue;
	      }
	      return obj[currentPath];
	    }

	    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	  };

	  objectPath.del = function(obj, path) {
	    return del(obj, path);
	  };

	  return objectPath;
	});


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * All of the events can bind to
	 */

	module.exports = {
	  onBlur: 'blur',
	  onChange: 'change',
	  onClick: 'click',
	  onContextMenu: 'contextmenu',
	  onCopy: 'copy',
	  onCut: 'cut',
	  onDoubleClick: 'dblclick',
	  onDrag: 'drag',
	  onDragEnd: 'dragend',
	  onDragEnter: 'dragenter',
	  onDragExit: 'dragexit',
	  onDragLeave: 'dragleave',
	  onDragOver: 'dragover',
	  onDragStart: 'dragstart',
	  onDrop: 'drop',
	  onError: 'error',
	  onFocus: 'focus',
	  onInput: 'input',
	  onInvalid: 'invalid',
	  onKeyDown: 'keydown',
	  onKeyPress: 'keypress',
	  onKeyUp: 'keyup',
	  onMouseDown: 'mousedown',
	  onMouseEnter: 'mouseenter',
	  onMouseLeave: 'mouseleave',
	  onMouseMove: 'mousemove',
	  onMouseOut: 'mouseout',
	  onMouseOver: 'mouseover',
	  onMouseUp: 'mouseup',
	  onPaste: 'paste',
	  onReset: 'reset',
	  onScroll: 'scroll',
	  onSubmit: 'submit',
	  onTouchCancel: 'touchcancel',
	  onTouchEnd: 'touchend',
	  onTouchMove: 'touchmove',
	  onTouchStart: 'touchstart',
	  onWheel: 'wheel'
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  isElement: __webpack_require__(42).isElement,
	  isAttribute: __webpack_require__(43),
	  namespace: 'http://www.w3.org/2000/svg'
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Supported SVG elements
	 *
	 * @type {Array}
	 */

	exports.elements = {
	  'animate': true,
	  'circle': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'mask': true,
	  'path': true,
	  'pattern': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'svg': true,
	  'text': true,
	  'tspan': true
	}

	/**
	 * Is element's namespace SVG?
	 *
	 * @param {String} name
	 */

	exports.isElement = function (name) {
	  return name in exports.elements
	}


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Supported SVG attributes
	 */

	exports.attributes = {
	  'cx': true,
	  'cy': true,
	  'd': true,
	  'dx': true,
	  'dy': true,
	  'fill': true,
	  'fillOpacity': true,
	  'fontFamily': true,
	  'fontSize': true,
	  'fx': true,
	  'fy': true,
	  'gradientTransform': true,
	  'gradientUnits': true,
	  'markerEnd': true,
	  'markerMid': true,
	  'markerStart': true,
	  'offset': true,
	  'opacity': true,
	  'patternContentUnits': true,
	  'patternUnits': true,
	  'points': true,
	  'preserveAspectRatio': true,
	  'r': true,
	  'rx': true,
	  'ry': true,
	  'spreadMethod': true,
	  'stopColor': true,
	  'stopOpacity': true,
	  'stroke': true,
	  'strokeDasharray': true,
	  'strokeLinecap': true,
	  'strokeOpacity': true,
	  'strokeWidth': true,
	  'textAnchor': true,
	  'transform': true,
	  'version': true,
	  'viewBox': true,
	  'x1': true,
	  'x2': true,
	  'x': true,
	  'y1': true,
	  'y2': true,
	  'y': true
	}

	/**
	 * Are element's attributes SVG?
	 *
	 * @param {String} attr
	 */

	module.exports = function (attr) {
	  return attr in exports.attributes
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(target) {
	  target = target || {}

	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i]
	    if (!source) continue

	    Object.getOwnPropertyNames(source).forEach(function(key) {
	      if (undefined === target[key])
	        target[key] = source[key]
	    })
	  }

	  return target
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEachArray = __webpack_require__(46),
	    forEachObject = __webpack_require__(48);

	/**
	 * # ForEach
	 *
	 * A fast `.forEach()` implementation.
	 *
	 * @param  {Array|Object} subject     The array or object to iterate over.
	 * @param  {Function}     fn          The visitor function.
	 * @param  {Object}       thisContext The context for the visitor.
	 */
	module.exports = function fastForEach (subject, fn, thisContext) {
	  if (subject instanceof Array) {
	    return forEachArray(subject, fn, thisContext);
	  }
	  else {
	    return forEachObject(subject, fn, thisContext);
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal3 = __webpack_require__(47);

	/**
	 * # For Each
	 *
	 * A fast `.forEach()` implementation.
	 *
	 * @param  {Array}    subject     The array (or array-like) to iterate over.
	 * @param  {Function} fn          The visitor function.
	 * @param  {Object}   thisContext The context for the visitor.
	 */
	module.exports = function fastForEach (subject, fn, thisContext) {
	  var length = subject.length,
	      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
	      i;
	  for (i = 0; i < length; i++) {
	    iterator(subject[i], i, subject);
	  }
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Internal helper to bind a function known to have 3 arguments
	 * to a given context.
	 */
	module.exports = function bindInternal3 (func, thisContext) {
	  return function (a, b, c) {
	    return func.call(thisContext, a, b, c);
	  };
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal3 = __webpack_require__(47);

	/**
	 * # For Each
	 *
	 * A fast object `.forEach()` implementation.
	 *
	 * @param  {Object}   subject     The object to iterate over.
	 * @param  {Function} fn          The visitor function.
	 * @param  {Object}   thisContext The context for the visitor.
	 */
	module.exports = function fastForEachObject (subject, fn, thisContext) {
	  var keys = Object.keys(subject),
	      length = keys.length,
	      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
	      key, i;
	  for (i = 0; i < length; i++) {
	    key = keys[i];
	    iterator(subject[key], key, subject);
	  }
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Analogue of Object.assign().
	 * Copies properties from one or more source objects to
	 * a target object. Existing keys on the target object will be overwritten.
	 *
	 * > Note: This differs from spec in some important ways:
	 * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
	 * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
	 * > For more details, see:
	 * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	 *
	 *
	 *
	 * @param  {Object} target      The target object to copy properties to.
	 * @param  {Object} source, ... The source(s) to copy properties from.
	 * @return {Object}             The updated target object.
	 */
	module.exports = function fastAssign (target) {
	  var totalArgs = arguments.length,
	      source, i, totalKeys, keys, key, j;

	  for (i = 1; i < totalArgs; i++) {
	    source = arguments[i];
	    keys = Object.keys(source);
	    totalKeys = keys.length;
	    for (j = 0; j < totalKeys; j++) {
	      key = keys[j];
	      target[key] = source[key];
	    }
	  }
	  return target;
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reduceArray = __webpack_require__(51),
	    reduceObject = __webpack_require__(53);

	/**
	 * # Reduce
	 *
	 * A fast `.reduce()` implementation.
	 *
	 * @param  {Array|Object} subject      The array or object to reduce over.
	 * @param  {Function}     fn           The reducer function.
	 * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}       thisContext  The context for the reducer.
	 * @return {Array|Object}              The array or object containing the results.
	 */
	module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
	  if (subject instanceof Array) {
	    return reduceArray(subject, fn, initialValue, thisContext);
	  }
	  else {
	    return reduceObject(subject, fn, initialValue, thisContext);
	  }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal4 = __webpack_require__(52);

	/**
	 * # Reduce
	 *
	 * A fast `.reduce()` implementation.
	 *
	 * @param  {Array}    subject      The array (or array-like) to reduce.
	 * @param  {Function} fn           The reducer function.
	 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}   thisContext  The context for the reducer.
	 * @return {mixed}                 The final result.
	 */
	module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
	  var length = subject.length,
	      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
	      i, result;

	  if (initialValue === undefined) {
	    i = 1;
	    result = subject[0];
	  }
	  else {
	    i = 0;
	    result = initialValue;
	  }

	  for (; i < length; i++) {
	    result = iterator(result, subject[i], i, subject);
	  }

	  return result;
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Internal helper to bind a function known to have 4 arguments
	 * to a given context.
	 */
	module.exports = function bindInternal4 (func, thisContext) {
	  return function (a, b, c, d) {
	    return func.call(thisContext, a, b, c, d);
	  };
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal4 = __webpack_require__(52);

	/**
	 * # Reduce
	 *
	 * A fast object `.reduce()` implementation.
	 *
	 * @param  {Object}   subject      The object to reduce over.
	 * @param  {Function} fn           The reducer function.
	 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}   thisContext  The context for the reducer.
	 * @return {mixed}                 The final result.
	 */
	module.exports = function fastReduceObject (subject, fn, initialValue, thisContext) {
	  var keys = Object.keys(subject),
	      length = keys.length,
	      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
	      i, key, result;

	  if (initialValue === undefined) {
	    i = 1;
	    result = subject[keys[0]];
	  }
	  else {
	    i = 0;
	    result = initialValue;
	  }

	  for (; i < length; i++) {
	    key = keys[i];
	    result = iterator(result, subject[key], key, subject);
	  }

	  return result;
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var type = __webpack_require__(55)

	/**
	 * Returns the type of a virtual node
	 *
	 * @param  {Object} node
	 * @return {String}
	 */

	module.exports = function nodeType (node) {
	  var v = type(node)
	  if (v === 'null' || node === false) return 'empty'
	  if (v !== 'object') return 'text'
	  if (type(node.type) === 'string') return 'element'
	  return 'component'
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * toString ref.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)

	  return typeof val;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(44)
	var nodeType = __webpack_require__(54)
	var type = __webpack_require__(55)

	/**
	 * Expose `stringify`.
	 */

	module.exports = function (app) {
	  if (!app.element) {
	    throw new Error('No element mounted')
	  }

	  /**
	   * Render to string.
	   *
	   * @param {Component} component
	   * @param {Object} [props]
	   * @return {String}
	   */

	  function stringify (component, optProps, children) {
	    var propTypes = component.propTypes || {}
	    var props = defaults(optProps || {}, component.defaultProps || {})
	    var state = component.initialState ? component.initialState(props) : {}
	    props.children = children;

	    for (var name in propTypes) {
	      var options = propTypes[name]
	      if (options.source) {
	        props[name] = app.sources[options.source]
	      }
	    }

	    if (component.beforeMount) component.beforeMount({ props: props, state: state })
	    if (component.beforeRender) component.beforeRender({ props: props, state: state })
	    var node = component.render({ props: props, state: state })
	    return stringifyNode(node, '0')
	  }

	  /**
	   * Render a node to a string
	   *
	   * @param {Node} node
	   * @param {Tree} tree
	   *
	   * @return {String}
	   */

	  function stringifyNode (node, path) {
	    switch (nodeType(node)) {
	      case 'empty': return '<noscript />'
	      case 'text': return node
	      case 'element':
	        var children = node.children
	        var attributes = node.attributes
	        var tagName = node.type
	        var innerHTML = attributes.innerHTML
	        var str = '<' + tagName + attrs(attributes) + '>'

	        if (innerHTML) {
	          str += innerHTML
	        } else {
	          for (var i = 0, n = children.length; i < n; i++) {
	            str += stringifyNode(children[i], path + '.' + i)
	          }
	        }

	        str += '</' + tagName + '>'
	        return str
	      case 'component': return stringify(node.type, node.attributes, node.children)
	    }

	    throw new Error('Invalid type')
	  }

	  return stringifyNode(app.element, '0')
	}

	/**
	 * HTML attributes to string.
	 *
	 * @param {Object} attributes
	 * @return {String}
	 * @api private
	 */

	function attrs (attributes) {
	  var str = ''
	  for (var key in attributes) {
	    var value = attributes[key]
	    if (key === 'innerHTML') continue
	    if (isValidAttributeValue(value)) str += attr(key, attributes[key])
	  }
	  return str
	}

	/**
	 * HTML attribute to string.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @return {String}
	 * @api private
	 */

	function attr (key, val) {
	  return ' ' + key + '="' + val + '"'
	}

	/**
	 * Is a value able to be set a an attribute value?
	 *
	 * @param {Any} value
	 *
	 * @return {Boolean}
	 */

	function isValidAttributeValue (value) {
	  var valueType = type(value)
	  switch (valueType) {
	  case 'string':
	  case 'number':
	    return true;

	  case 'boolean':
	    return value;

	  default:
	    return false;
	  }
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var _soundcloudAudio = __webpack_require__(58);

	var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

	var _dekuSoundplayerComponents = __webpack_require__(59);

	var _dekuSoundplayerAddons = __webpack_require__(67);

	var SoundCloudLogoSVG = _dekuSoundplayerComponents.Icons.SoundCloudLogoSVG;

	var Player = {
	    propTypes: {
	        duration: {
	            type: 'number',
	            optional: true
	        },

	        currentTime: {
	            type: 'number',
	            optional: true
	        },

	        playing: {
	            type: 'boolean',
	            optional: true
	        },

	        seeking: {
	            type: 'boolean',
	            optional: true
	        },

	        track: {
	            type: 'object',
	            optional: true
	        },

	        soundCloudAudio: function soundCloudAudio(prop) {
	            return prop instanceof _soundcloudAudio2['default'];
	        }
	    },

	    defaultProps: {
	        duration: 0,
	        currentTime: 0,
	        seeking: false,
	        playing: false
	    },

	    render: function render(component) {
	        var props = component.props;

	        if (!props.track) {
	            return (0, _magicVirtualElement2['default'])('span', null);
	        }

	        if (props.track && !props.track.streamable) {
	            return (0, _magicVirtualElement2['default'])(
	                'div',
	                { 'class': 'sb-soundplayer-widget-message' },
	                (0, _magicVirtualElement2['default'])(
	                    'a',
	                    { href: props.track.permalink_url, target: '_blank' },
	                    props.track.title
	                ),
	                ' is not streamable!'
	            );
	        }

	        var artwork_url = props.track.artwork_url;

	        return (0, _magicVirtualElement2['default'])(
	            _dekuSoundplayerComponents.Cover,
	            { artworkUrl: artwork_url && artwork_url.replace('large', 't500x500') },
	            (0, _magicVirtualElement2['default'])('div', { 'class': 'sb-soundplayer-widget-overlay' }),
	            (0, _magicVirtualElement2['default'])(
	                'div',
	                { 'class': 'sb-soundplayer-widget-track-info' },
	                (0, _magicVirtualElement2['default'])(
	                    'h3',
	                    { 'class': 'sb-soundplayer-widget-user' },
	                    props.track.user.username
	                ),
	                (0, _magicVirtualElement2['default'])(
	                    'h2',
	                    { 'class': 'sb-soundplayer-widget-title' },
	                    props.track.title
	                )
	            ),
	            (0, _magicVirtualElement2['default'])(
	                'a',
	                { href: props.track.permalink_url, target: '_blank' },
	                (0, _magicVirtualElement2['default'])(SoundCloudLogoSVG, null)
	            ),
	            (0, _magicVirtualElement2['default'])(
	                'div',
	                { 'class': 'sb-soundplayer-widget-controls' },
	                (0, _magicVirtualElement2['default'])(_dekuSoundplayerComponents.PlayButton, {
	                    playing: props.playing,
	                    soundCloudAudio: props.soundCloudAudio
	                }),
	                (0, _magicVirtualElement2['default'])(_dekuSoundplayerComponents.Progress, {
	                    value: props.currentTime / props.duration * 100 || 0,
	                    soundCloudAudio: props.soundCloudAudio
	                }),
	                (0, _magicVirtualElement2['default'])(_dekuSoundplayerComponents.Timer, {
	                    duration: props.track.duration / 1000,
	                    currentTime: props.currentTime
	                })
	            )
	        );
	    }
	};

	exports['default'] = {
	    propTypes: {
	        resolveUrl: {
	            type: 'string'
	        },

	        clientId: {
	            type: 'string'
	        }
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            _dekuSoundplayerAddons.SoundPlayerContainer,
	            props,
	            (0, _magicVirtualElement2['default'])(Player, null)
	        );
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function SoundCloud (clientId) {
	    if (!(this instanceof SoundCloud)) {
	        return new SoundCloud(clientId);
	    }

	    if (!clientId) {
	        throw new Error('SoundCloud API clientId is required, get it - https://developers.soundcloud.com/');
	    }

	    this._events = {};

	    this._clientId = clientId;
	    this._baseUrl = 'http://api.soundcloud.com';

	    this.playing = false;
	    this.duration = 0;

	    this.audio = document.createElement('audio');
	}

	SoundCloud.prototype.resolve = function (url, callback) {
	    if (!url) {
	        throw new Error('SoundCloud track or playlist url is required');
	    }

	    url = this._baseUrl+'/resolve.json?url='+url+'&client_id='+this._clientId;

	    this._jsonp(url, function (data) {
	        if (data.tracks) {
	            this._playlist = data;
	        } else {
	            this._track = data;
	        }

	        this.duration = data.duration/1000; // convert to seconds
	        callback(data);
	    }.bind(this));
	};

	SoundCloud.prototype._jsonp = function (url, callback) {
	    var target = document.getElementsByTagName('script')[0] || document.head;
	    var script = document.createElement('script');

	    var id = 'jsonp_callback_'+Math.round(100000*Math.random());
	    window[id] = function (data) {
	        if (script.parentNode) {
	            script.parentNode.removeChild(script);
	        }
	        window[id] = function () {};
	        callback(data);
	    };

	    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + id;
	    target.parentNode.insertBefore(script, target);
	};

	SoundCloud.prototype.on = function (e, fn) {
	    this._events[e] = fn;
	    this.audio.addEventListener(e, fn, false);
	};

	SoundCloud.prototype.off = function (e, fn) {
	    this._events[e] = null;
	    this.audio.removeEventListener(e, fn);
	};

	SoundCloud.prototype.unbindAll = function () {
	    for (var e in this._events) {
	        var fn = this._events[e];
	        if (fn) {
	            this.off(e, fn);
	        }
	    }
	};

	SoundCloud.prototype.preload = function (streamUrl) {
	    this._track = {stream_url: streamUrl};
	    this.audio.src = streamUrl+'?client_id='+this._clientId;
	};

	SoundCloud.prototype.play = function (options) {
	    options = options || {};
	    var src;

	    if (options.streamUrl) {
	        src = options.streamUrl;
	    } else if (this._playlist) {
	        var length = this._playlist.tracks.length;
	        if (length) {
	            this._playlistIndex = options.playlistIndex || 0;

	            // be silent if index is out of range
	            if (this._playlistIndex >= length || this._playlistIndex < 0) {
	                this._playlistIndex = 0;
	                return;
	            }
	            src = this._playlist.tracks[this._playlistIndex].stream_url;
	        }
	    } else if (this._track) {
	        src = this._track.stream_url;
	    }

	    if (!src) {
	        throw new Error('There is no tracks to play, use `streamUrl` option or `load` method');
	    }

	    src += '?client_id='+this._clientId;

	    if (src !== this.audio.src) {
	        this.audio.src = src;
	    }

	    this.playing = src;
	    this.audio.play();
	};

	SoundCloud.prototype.pause = function () {
	    this.audio.pause();
	    this.playing = false;
	};

	SoundCloud.prototype.stop = function () {
	    this.audio.pause();
	    this.audio.currentTime = 0;
	    this.playing = false;
	};

	SoundCloud.prototype.next = function () {
	    var tracksLength = this._playlist.tracks.length;
	    if (this._playlistIndex >= tracksLength-1) {
	        return;
	    }
	    if (this._playlist && tracksLength) {
	        this.play({playlistIndex: ++this._playlistIndex});
	    }
	};

	SoundCloud.prototype.previous = function () {
	    if (this._playlistIndex <= 0) {
	        return;
	    }
	    if (this._playlist && this._playlist.tracks.length) {
	        this.play({playlistIndex: --this._playlistIndex});
	    }
	};

	SoundCloud.prototype.seek = function (e) {
	    if (!this.audio.readyState) {
	        return false;
	    }
	    var percent = e.offsetX / e.target.offsetWidth || (e.layerX - e.target.offsetLeft) / e.target.offsetWidth;
	    this.audio.currentTime = percent * (this.audio.duration || 0);
	};

	module.exports = SoundCloud;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(60);


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _PlayButton2 = __webpack_require__(61);

	var _PlayButton3 = _interopRequireDefault(_PlayButton2);

	exports.PlayButton = _PlayButton3['default'];

	var _Progress2 = __webpack_require__(63);

	var _Progress3 = _interopRequireDefault(_Progress2);

	exports.Progress = _Progress3['default'];

	var _Timer2 = __webpack_require__(64);

	var _Timer3 = _interopRequireDefault(_Timer2);

	exports.Timer = _Timer3['default'];

	var _Cover2 = __webpack_require__(65);

	var _Cover3 = _interopRequireDefault(_Cover2);

	exports.Cover = _Cover3['default'];

	var _Icons2 = __webpack_require__(62);

	var _Icons3 = _interopRequireDefault(_Icons2);

	exports.Icons = _Icons3['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var _soundcloudAudio = __webpack_require__(58);

	var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

	var _Icons = __webpack_require__(62);

	exports['default'] = {
	    defaultProps: {
	        playing: false,
	        seeking: false
	    },

	    propTypes: {
	        playing: {
	            type: 'boolean',
	            optional: true
	        },
	        seeking: {
	            type: 'boolean',
	            optional: true
	        },
	        soundCloudAudio: function soundCloudAudio(prop) {
	            return prop instanceof _soundcloudAudio2['default'];
	        }
	    },

	    render: function render(component) {
	        var props = component.props;

	        function handleClick(e) {
	            e.preventDefault();

	            var playing = props.playing;
	            var soundCloudAudio = props.soundCloudAudio;

	            if (!playing) {
	                soundCloudAudio && soundCloudAudio.play();
	            } else {
	                soundCloudAudio && soundCloudAudio.pause();
	            }
	        }

	        return (0, _magicVirtualElement2['default'])(
	            'button',
	            { 'class': 'sb-soundplayer-play-btn', onClick: handleClick },
	            !props.playing ? (0, _magicVirtualElement2['default'])(_Icons.PlayIconSVG, { onClick: handleClick }) : (0, _magicVirtualElement2['default'])(_Icons.PauseIconSVG, { onClick: handleClick })
	        );
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var iconPropTypes = {
	    onClick: {
	        type: 'function',
	        optional: true
	    }
	};

	// SoundCloud Logo
	var SoundCloudLogoSVG = {
	    propTypes: iconPropTypes,

	    shouldUpdate: function shouldUpdate() {
	        return false;
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            'svg',
	            {
	                'class': 'sb-soundplayer-cover-logo',
	                xmlns: 'http://www.w3.org/2000/svg',
	                fill: 'currentColor',
	                onClick: props.onClick
	            },
	            (0, _magicVirtualElement2['default'])('path', { d: 'M10.517 3.742c-.323 0-.49.363-.49.582 0 0-.244 3.591-.244 4.641 0 1.602.15 2.621.15 2.621 0 .222.261.401.584.401.321 0 .519-.179.519-.401 0 0 .398-1.038.398-2.639 0-1.837-.153-4.127-.284-4.592-.112-.395-.313-.613-.633-.613zm-1.996.268c-.323 0-.49.363-.49.582 0 0-.244 3.322-.244 4.372 0 1.602.119 2.621.119 2.621 0 .222.26.401.584.401.321 0 .581-.179.581-.401 0 0 .081-1.007.081-2.608 0-1.837-.206-4.386-.206-4.386 0-.218-.104-.581-.425-.581zm-2.021 1.729c-.324 0-.49.362-.49.582 0 0-.272 1.594-.272 2.644 0 1.602.179 2.559.179 2.559 0 .222.229.463.552.463.321 0 .519-.241.519-.463 0 0 .19-.944.19-2.546 0-1.837-.253-2.657-.253-2.657 0-.22-.104-.582-.425-.582zm-2.046-.358c-.323 0-.49.363-.49.582 0 0-.162 1.92-.162 2.97 0 1.602.069 2.496.069 2.496 0 .222.26.557.584.557.321 0 .581-.304.581-.526 0 0 .143-.936.143-2.538 0-1.837-.206-2.96-.206-2.96 0-.218-.198-.581-.519-.581zm-2.169 1.482c-.272 0-.232.218-.232.218v3.982s-.04.335.232.335c.351 0 .716-.832.716-2.348 0-1.245-.436-2.187-.716-2.187zm18.715-.976c-.289 0-.567.042-.832.116-.417-2.266-2.806-3.989-5.263-3.989-1.127 0-2.095.705-2.931 1.316v8.16s0 .484.5.484h8.526c1.655 0 3-1.55 3-3.155 0-1.607-1.346-2.932-3-2.932zm10.17.857c-1.077-.253-1.368-.389-1.368-.815 0-.3.242-.611.97-.611.621 0 1.106.253 1.542.699l.981-.951c-.641-.669-1.417-1.067-2.474-1.067-1.339 0-2.425.757-2.425 1.99 0 1.338.873 1.736 2.124 2.026 1.281.291 1.513.486 1.513.923 0 .514-.379.738-1.184.738-.65 0-1.26-.223-1.736-.777l-.98.873c.514.757 1.504 1.232 2.639 1.232 1.853 0 2.668-.873 2.668-2.163 0-1.477-1.193-1.845-2.27-2.097zm6.803-2.745c-1.853 0-2.949 1.435-2.949 3.502s1.096 3.501 2.949 3.501c1.852 0 2.949-1.434 2.949-3.501s-1.096-3.502-2.949-3.502zm0 5.655c-1.097 0-1.553-.941-1.553-2.153 0-1.213.456-2.153 1.553-2.153 1.096 0 1.551.94 1.551 2.153.001 1.213-.454 2.153-1.551 2.153zm8.939-1.736c0 1.086-.533 1.756-1.396 1.756-.864 0-1.388-.689-1.388-1.775v-3.897h-1.358v3.916c0 1.978 1.106 3.084 2.746 3.084 1.726 0 2.754-1.136 2.754-3.103v-3.897h-1.358v3.916zm8.142-.89l.019 1.485c-.087-.174-.31-.515-.475-.768l-2.703-3.692h-1.362v6.894h1.401v-2.988l-.02-1.484c.088.175.311.514.475.767l2.79 3.705h1.213v-6.894h-1.339v2.975zm5.895-2.923h-2.124v6.791h2.027c1.746 0 3.474-1.01 3.474-3.395 0-2.484-1.437-3.396-3.377-3.396zm-.097 5.472h-.67v-4.152h.719c1.436 0 2.028.688 2.028 2.076 0 1.242-.651 2.076-2.077 2.076zm7.909-4.229c.611 0 1 .271 1.242.737l1.26-.582c-.426-.883-1.202-1.503-2.483-1.503-1.775 0-3.016 1.435-3.016 3.502 0 2.143 1.191 3.501 2.968 3.501 1.232 0 2.047-.572 2.513-1.533l-1.145-.68c-.358.602-.718.864-1.329.864-1.019 0-1.611-.932-1.611-2.153-.001-1.261.583-2.153 1.601-2.153zm5.17-1.192h-1.359v6.791h4.083v-1.338h-2.724v-5.453zm6.396-.157c-1.854 0-2.949 1.435-2.949 3.502s1.095 3.501 2.949 3.501c1.853 0 2.95-1.434 2.95-3.501s-1.097-3.502-2.95-3.502zm0 5.655c-1.097 0-1.553-.941-1.553-2.153 0-1.213.456-2.153 1.553-2.153 1.095 0 1.55.94 1.55 2.153.001 1.213-.454 2.153-1.55 2.153zm8.557-1.736c0 1.086-.532 1.756-1.396 1.756-.864 0-1.388-.689-1.388-1.775v-3.794h-1.358v3.813c0 1.978 1.106 3.084 2.746 3.084 1.726 0 2.755-1.136 2.755-3.103v-3.794h-1.36v3.813zm5.449-3.907h-2.318v6.978h2.211c1.908 0 3.789-1.037 3.789-3.489 0-2.552-1.565-3.489-3.682-3.489zm-.108 5.623h-.729v-4.266h.783c1.565 0 2.21.706 2.21 2.133.001 1.276-.707 2.133-2.264 2.133z' })
	        );
	    }
	};

	// Player Button Icons
	var ButtonIconSVG = {
	    propTypes: iconPropTypes,

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            'svg',
	            {
	                'class': 'sb-soundplayer-button-icon',
	                xmlns: 'http://www.w3.org/2000/svg',
	                viewBox: '0 0 32 32',
	                fill: 'currentColor',
	                onClick: props.onClick
	            },
	            props.children
	        );
	    }
	};

	// |> Play
	var PlayIconSVG = {
	    propTypes: iconPropTypes,

	    shouldUpdate: function shouldUpdate() {
	        return false;
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            ButtonIconSVG,
	            props,
	            (0, _magicVirtualElement2['default'])('path', { d: 'M0 0 L32 16 L0 32 z' })
	        );
	    }
	};

	// || Pause
	var PauseIconSVG = {
	    propTypes: iconPropTypes,

	    shouldUpdate: function shouldUpdate() {
	        return false;
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            ButtonIconSVG,
	            props,
	            (0, _magicVirtualElement2['default'])('path', { d: 'M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z' })
	        );
	    }
	};

	// |>| Next
	var NextIconSVG = {
	    propTypes: {
	        onClick: {
	            type: 'function',
	            optional: true
	        }
	    },

	    shouldUpdate: function shouldUpdate() {
	        return false;
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            ButtonIconSVG,
	            props,
	            (0, _magicVirtualElement2['default'])('path', { d: 'M4 4 L24 14 V4 H28 V28 H24 V18 L4 28 z ' })
	        );
	    }
	};

	// |<| Prev
	var PrevIconSVG = {
	    propTypes: {
	        onClick: {
	            type: 'function',
	            optional: true
	        }
	    },

	    shouldUpdate: function shouldUpdate() {
	        return false;
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            ButtonIconSVG,
	            props,
	            (0, _magicVirtualElement2['default'])('path', { d: 'M4 4 H8 V14 L28 4 V28 L8 18 V28 H4 z ' })
	        );
	    }
	};

	exports['default'] = {
	    SoundCloudLogoSVG: SoundCloudLogoSVG,
	    PlayIconSVG: PlayIconSVG,
	    PauseIconSVG: PauseIconSVG,
	    NextIconSVG: NextIconSVG,
	    PrevIconSVG: PrevIconSVG
	};
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var _soundcloudAudio = __webpack_require__(58);

	var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

	exports['default'] = {
	    defaultProps: {
	        value: 0
	    },

	    propTypes: {
	        value: {
	            type: 'number'
	        },

	        soundCloudAudio: function soundCloudAudio(prop) {
	            return prop instanceof _soundcloudAudio2['default'];
	        }
	    },

	    render: function render(component) {
	        var props = component.props;
	        var value = props.value;
	        var soundCloudAudio = props.soundCloudAudio;

	        if (value < 0) {
	            value = 0;
	        }

	        if (value > 100) {
	            value = 100;
	        }

	        var style = { width: '' + value + '%' };

	        function handleSeekTrack(e) {
	            var xPos = (e.pageX - e.delegateTarget.getBoundingClientRect().left) / e.delegateTarget.offsetWidth;

	            if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
	                soundCloudAudio.audio.currentTime = xPos * soundCloudAudio.audio.duration;
	            }
	        }

	        return (0, _magicVirtualElement2['default'])(
	            'div',
	            { 'class': 'sb-soundplayer-progress-container', onClick: handleSeekTrack },
	            (0, _magicVirtualElement2['default'])('div', { 'class': 'sb-soundplayer-progress-inner', style: style })
	        );
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	function prettyTime(time) {
	    var hours = Math.floor(time / 3600);
	    var mins = '0' + Math.floor(time % 3600 / 60);
	    var secs = '0' + Math.floor(time % 60);

	    mins = mins.substr(mins.length - 2);
	    secs = secs.substr(secs.length - 2);

	    if (!isNaN(secs)) {
	        if (hours) {
	            return '' + hours + ':' + mins + ':' + secs;
	        } else {
	            return '' + mins + ':' + secs;
	        }
	    } else {
	        return '00:00';
	    }
	}

	exports['default'] = {
	    defaultProps: {
	        duration: 0,
	        currentTime: 0
	    },

	    propTypes: {
	        duration: {
	            type: 'number'
	        },

	        currentTime: {
	            type: 'number'
	        }
	    },

	    render: function render(component) {
	        var props = component.props;

	        return (0, _magicVirtualElement2['default'])(
	            'div',
	            { 'class': 'sb-soundplayer-timer' },
	            prettyTime(props.currentTime),
	            ' / ',
	            prettyTime(props.duration)
	        );
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var _classnames = __webpack_require__(66);

	var _classnames2 = _interopRequireDefault(_classnames);

	exports['default'] = {
	    propTypes: {
	        artworkUrl: {
	            type: 'string'
	        }
	    },

	    render: function render(component) {
	        var props = component.props;

	        var classNames = (0, _classnames2['default'])('sb-soundplayer-cover', props['class']);

	        return (0, _magicVirtualElement2['default'])(
	            'div',
	            { 'class': classNames, style: props.artworkUrl ? { 'background-image': 'url(' + props.artworkUrl + ')' } : {} },
	            props.children
	        );
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(68);


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _SoundPlayerContainer2 = __webpack_require__(69);

	var _SoundPlayerContainer3 = _interopRequireDefault(_SoundPlayerContainer2);

	exports.SoundPlayerContainer = _SoundPlayerContainer3['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx dom */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magicVirtualElement = __webpack_require__(7);

	var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

	// eslint-disable-line no-unused-vars

	var _objectAssign = __webpack_require__(70);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _soundcloudAudio = __webpack_require__(58);

	var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

	var _utilsAudioStore = __webpack_require__(71);

	exports['default'] = {
	    propTypes: {
	        resolveUrl: {
	            type: 'string'
	        },

	        clientId: {
	            type: 'string'
	        }
	    },

	    initialState: function initialState() {
	        return {
	            duration: 0,
	            currentTime: 0,
	            seeking: false,
	            playing: false
	        };
	    },

	    beforeMount: function beforeMount(component) {
	        var props = component.props;
	        var state = component.state;
	        var id = component.id;
	        var clientId = props.clientId;

	        if (!clientId) {
	            throw new Error('You need to get clientId from SoundCloud\n                https://github.com/soundblogs/react-soundplayer#usage');
	        }

	        if ('undefined' !== typeof window) {
	            var soundCloudAudio = new _soundcloudAudio2['default'](clientId);
	            (0, _utilsAudioStore.addToRegistry)(id, soundCloudAudio);
	        }
	    },

	    afterMount: function afterMount(component, el, setState) {
	        var props = component.props;
	        var state = component.state;
	        var id = component.id;
	        var resolveUrl = props.resolveUrl;
	        var streamUrl = props.streamUrl;

	        var soundCloudAudio = (0, _utilsAudioStore.getFromRegistry)(id);

	        if (streamUrl) {
	            soundCloudAudio.preload(streamUrl);
	        } else if (resolveUrl) {
	            soundCloudAudio.resolve(resolveUrl, function (data) {
	                // TBD: support for playlists
	                var track = data.tracks ? data.tracks[0] : data;
	                setState({ track: track });
	            });
	        }

	        function onAudioStarted() {
	            setState({ playing: true });

	            (0, _utilsAudioStore.stopAllOther)(soundCloudAudio.playing);
	            (0, _utilsAudioStore.addToPlayedStore)(soundCloudAudio);
	        }

	        function getCurrentTime() {
	            setState({ currentTime: soundCloudAudio.audio.currentTime });
	        }

	        function getDuration() {
	            setState({ duration: soundCloudAudio.audio.duration });
	        }

	        function onSeekingTrack() {
	            setState({ seeking: true });
	        }

	        function onSeekedTrack() {
	            setState({ seeking: false });
	        }

	        function onAudioEnded() {
	            setState({ playing: false });
	        }

	        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
	        soundCloudAudio.on('playing', onAudioStarted);
	        soundCloudAudio.on('timeupdate', getCurrentTime);
	        soundCloudAudio.on('loadedmetadata', getDuration);
	        soundCloudAudio.on('seeking', onSeekingTrack);
	        soundCloudAudio.on('seeked', onSeekedTrack);
	        soundCloudAudio.on('pause', onAudioEnded);
	        soundCloudAudio.on('ended', onAudioEnded);
	    },

	    afterUpdate: function afterUpdate(component, prevProps, prevState, setState) {
	        var props = component.props;
	        var state = component.state;
	        var id = component.id;
	        var resolveUrl = props.resolveUrl;
	        var streamUrl = props.streamUrl;

	        var soundCloudAudio = (0, _utilsAudioStore.getFromRegistry)(id);
	        var playedBefore = state.playing;

	        function restartIfPlayed() {
	            if (playedBefore) {
	                soundCloudAudio.play();
	            }
	        }

	        if (streamUrl !== prevProps.streamUrl) {
	            soundCloudAudio.stop();
	            soundCloudAudio.preload(streamUrl);
	            restartIfPlayed();
	        } else if (resolveUrl !== prevProps.resolveUrl) {
	            soundCloudAudio.stop();
	            soundCloudAudio.resolve(resolveUrl, function (data) {
	                // TBD: support for playlists
	                var track = data.tracks ? data.tracks[0] : data;
	                setState({ track: track });
	                restartIfPlayed();
	            });
	        }
	    },

	    beforeUnmount: function beforeUnmount(component) {
	        var soundCloudAudio = (0, _utilsAudioStore.getFromRegistry)(component.id);
	        soundCloudAudio.unbindAll();
	    },

	    render: function render(component) {
	        var props = component.props;
	        var state = component.state;
	        var id = component.id;

	        var soundCloudAudio = (0, _utilsAudioStore.getFromRegistry)(id);

	        function wrapChild(child) {
	            var cloneElement = (0, _objectAssign2['default'])({}, child);
	            if (cloneElement.props) {
	                cloneElement.props = (0, _objectAssign2['default'])({}, cloneElement.props, state, { soundCloudAudio: soundCloudAudio });
	            }
	            return cloneElement;
	        }

	        return (0, _magicVirtualElement2['default'])(
	            'span',
	            null,
	            props.children.map(wrapChild)
	        );
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// handling multiple audio on the page helpers
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.stopAllOther = stopAllOther;
	exports.addToPlayedStore = addToPlayedStore;
	exports.addToRegistry = addToRegistry;
	exports.getFromRegistry = getFromRegistry;
	var _playedAudios = [];
	var _audioRegistry = {};

	function each(arr, cb) {
	    if (arr) {
	        for (var i = 0, len = arr.length; i < len; i++) {
	            if (arr[i] && cb(arr[i], i, arr)) {
	                break;
	            }
	        }
	    }
	}

	function stopAllOther(playing) {
	    each(_playedAudios, function (soundCloudAudio) {
	        if (soundCloudAudio.playing && soundCloudAudio.playing !== playing) {
	            soundCloudAudio.stop();
	        }
	    });
	}

	function addToPlayedStore(soundCloudAudio) {
	    var isPresent = false;

	    each(_playedAudios, function (_soundCloudAudio) {
	        if (_soundCloudAudio.playing === soundCloudAudio.playing) {
	            isPresent = true;
	            return true;
	        }
	    });

	    if (!isPresent) {
	        _playedAudios.push(soundCloudAudio);
	    }
	}

	function addToRegistry(componentId, soundCloudAudio) {
	    _audioRegistry[componentId] = soundCloudAudio;
	}

	function getFromRegistry(componentId) {
	    return _audioRegistry[componentId];
	}

/***/ }
/******/ ]);