(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["panelmenu"] = factory();
	else
		root["panelmenu"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1fc9":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("585a");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("466901b7", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "585a":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".p-panelmenu .p-panelmenu-header-link{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-link:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;text-decoration:none}.p-panelmenu .p-menuitem-text{line-height:1}", ""]);

// exports


/***/ }),

/***/ "ca18":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelMenu_vue_vue_type_style_index_0_id_531dc28a_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1fc9");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelMenu_vue_vue_type_style_index_0_id_531dc28a_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelMenu_vue_vue_type_style_index_0_id_531dc28a_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d94e389a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/panelmenu/PanelMenu.vue?vue&type=template&id=531dc28a
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "p-panelmenu p-component"
  }, [_vm._l(_vm.model, function (item, index) {
    return [_vm.visible(item) ? _c('div', {
      key: _vm.label(item) + '_' + index,
      class: _vm.getPanelClass(item),
      style: item.style
    }, [_c('div', {
      class: _vm.getHeaderClass(item),
      style: item.style
    }, [item.to && !_vm.disabled(item) ? _c('router-link', {
      attrs: {
        "to": item.to,
        "custom": ""
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(_ref) {
          var navigate = _ref.navigate,
            href = _ref.href,
            isRouterActive = _ref.isActive,
            isExactActive = _ref.isExactActive;
          return [_c('a', {
            class: _vm.getHeaderLinkClass(item, {
              isRouterActive: isRouterActive,
              isExactActive: isExactActive
            }),
            attrs: {
              "href": href,
              "role": "treeitem"
            },
            on: {
              "click": function click($event) {
                return _vm.onItemClick($event, item, navigate);
              }
            }
          }, [item.icon ? _c('span', {
            class: _vm.getPanelIcon(item)
          }) : _vm._e(), _c('span', {
            staticClass: "p-menuitem-text"
          }, [_vm._v(_vm._s(_vm.label(item)))])])];
        }
      }], null, true)
    }) : _c('a', {
      class: _vm.getHeaderLinkClass(item),
      attrs: {
        "href": item.url,
        "tabindex": _vm.disabled(item) ? null : '0',
        "aria-expanded": _vm.isActive(item),
        "id": _vm.ariaId + '_header',
        "aria-controls": _vm.ariaId + '_content'
      },
      on: {
        "click": function click($event) {
          return _vm.onItemClick($event, item);
        }
      }
    }, [item.items ? _c('span', {
      class: _vm.getPanelToggleIcon(item)
    }) : _vm._e(), item.icon ? _c('span', {
      class: _vm.getPanelIcon(item)
    }) : _vm._e(), _c('span', {
      staticClass: "p-menuitem-text"
    }, [_vm._v(_vm._s(_vm.label(item)))])])], 1), _c('transition', {
      attrs: {
        "name": "p-toggleable-content"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: item === _vm.activeItem,
        expression: "item === activeItem"
      }],
      staticClass: "p-toggleable-content",
      attrs: {
        "role": "region",
        "id": _vm.ariaId + '_content',
        "aria-labelledby": _vm.ariaId + '_header'
      }
    }, [item.items ? _c('div', {
      staticClass: "p-panelmenu-content"
    }, [_c('PanelMenuSub', {
      staticClass: "p-panelmenu-root-submenu",
      attrs: {
        "model": item.items
      }
    })], 1) : _vm._e()])])], 1) : _vm._e()];
  })], 2);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/panelmenu/PanelMenu.vue?vue&type=template&id=531dc28a

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d94e389a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/panelmenu/PanelMenuSub.vue?vue&type=template&id=ba3c7c28
var PanelMenuSubvue_type_template_id_ba3c7c28_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('ul', {
    staticClass: "p-submenu-list",
    attrs: {
      "role": "tree"
    }
  }, [_vm._l(_vm.model, function (item, i) {
    return [_vm.visible(item) && !item.separator ? _c('li', {
      key: _vm.label(item) + i,
      class: _vm.getItemClass(item),
      style: item.style,
      attrs: {
        "role": "none"
      }
    }, [item.to && !_vm.disabled(item) ? _c('router-link', {
      attrs: {
        "to": item.to,
        "custom": ""
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(_ref) {
          var navigate = _ref.navigate,
            href = _ref.href,
            isRouterActive = _ref.isActive,
            isExactActive = _ref.isExactActive;
          return [_c('a', {
            class: _vm.linkClass(item, {
              isRouterActive: isRouterActive,
              isExactActive: isExactActive
            }),
            attrs: {
              "href": href,
              "role": "treeitem",
              "aria-expanded": _vm.isActive(item)
            },
            on: {
              "click": function click($event) {
                return _vm.onItemClick($event, item, navigate);
              }
            }
          }, [_c('span', {
            class: ['p-menuitem-icon', item.icon]
          }), _c('span', {
            staticClass: "p-menuitem-text"
          }, [_vm._v(_vm._s(_vm.label(item)))])])];
        }
      }], null, true)
    }) : _c('a', {
      class: _vm.linkClass(item),
      attrs: {
        "href": item.url,
        "target": item.target,
        "role": "treeitem",
        "aria-expanded": _vm.isActive(item),
        "tabindex": _vm.disabled(item) ? null : '0'
      },
      on: {
        "click": function click($event) {
          return _vm.onItemClick($event, item);
        }
      }
    }, [item.items ? _c('span', {
      class: _vm.getSubmenuIcon(item)
    }) : _vm._e(), _c('span', {
      class: ['p-menuitem-icon', item.icon]
    }), _c('span', {
      staticClass: "p-menuitem-text"
    }, [_vm._v(_vm._s(_vm.label(item)))])]), _c('transition', {
      attrs: {
        "name": "p-toggleable-content"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: item === _vm.activeItem,
        expression: "item === activeItem"
      }],
      staticClass: "p-toggleable-content"
    }, [_vm.visible(item) && item.items ? _c('sub-panelmenu', {
      key: _vm.label(item) + '_sub_',
      attrs: {
        "model": item.items,
        "exact": _vm.exact
      }
    }) : _vm._e()], 1)])], 1) : _vm._e(), _vm.visible(item) && item.separator ? _c('li', {
      key: 'separator' + i,
      class: ['p-menu-separator', item.class],
      style: item.style
    }) : _vm._e()];
  })], 2);
};
var PanelMenuSubvue_type_template_id_ba3c7c28_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/panelmenu/PanelMenuSub.vue?vue&type=template&id=ba3c7c28

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/panelmenu/PanelMenuSub.vue?vue&type=script&lang=js
/* harmony default export */ var PanelMenuSubvue_type_script_lang_js = ({
  name: 'sub-panelmenu',
  props: {
    model: {
      type: null,
      default: null
    },
    exact: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      activeItem: null
    };
  },
  methods: {
    onItemClick: function onItemClick(event, item, navigate) {
      if (this.disabled(item)) {
        event.preventDefault();
        return;
      }
      if (!item.url && !item.to) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (this.activeItem && this.activeItem === item) this.activeItem = null;else this.activeItem = item;
      if (item.to && navigate) {
        navigate(event);
      }
    },
    getItemClass: function getItemClass(item) {
      return ['p-menuitem', item.class];
    },
    linkClass: function linkClass(item, routerProps) {
      return ['p-menuitem-link', {
        'p-disabled': this.disabled(item),
        'router-link-active': routerProps && routerProps.isActive,
        'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
      }];
    },
    isActive: function isActive(item) {
      return item === this.activeItem;
    },
    getSubmenuIcon: function getSubmenuIcon(item) {
      var active = this.isActive(item);
      return ['p-panelmenu-icon pi pi-fw', {
        'pi-angle-right': !active,
        'pi-angle-down': active
      }];
    },
    visible: function visible(item) {
      return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    },
    label: function label(item) {
      return typeof item.label === 'function' ? item.label() : item.label;
    }
  }
});
// CONCATENATED MODULE: ./src/components/panelmenu/PanelMenuSub.vue?vue&type=script&lang=js
 /* harmony default export */ var panelmenu_PanelMenuSubvue_type_script_lang_js = (PanelMenuSubvue_type_script_lang_js); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/panelmenu/PanelMenuSub.vue





/* normalize component */

var component = normalizeComponent(
  panelmenu_PanelMenuSubvue_type_script_lang_js,
  PanelMenuSubvue_type_template_id_ba3c7c28_render,
  PanelMenuSubvue_type_template_id_ba3c7c28_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PanelMenuSub = (component.exports);
// CONCATENATED MODULE: ./src/components/utils/UniqueComponentId.js
var lastId = 0;
/* harmony default export */ var UniqueComponentId = (function () {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pv_id_';
  lastId++;
  return "".concat(prefix).concat(lastId);
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/panelmenu/PanelMenu.vue?vue&type=script&lang=js


/* harmony default export */ var PanelMenuvue_type_script_lang_js = ({
  props: {
    model: {
      type: Array,
      default: null
    },
    exact: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      activeItem: null
    };
  },
  methods: {
    onItemClick: function onItemClick(event, item, navigate) {
      if (this.disabled(item)) {
        event.preventDefault();
        return;
      }
      if (!item.url && !item.to) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (this.activeItem && this.activeItem === item) this.activeItem = null;else this.activeItem = item;
      if (item.to && navigate) {
        navigate(event);
      }
    },
    getPanelClass: function getPanelClass(item) {
      return ['p-panelmenu-panel', item.class];
    },
    getPanelToggleIcon: function getPanelToggleIcon(item) {
      var active = item === this.activeItem;
      return ['p-panelmenu-icon pi', {
        'pi-chevron-right': !active,
        ' pi-chevron-down': active
      }];
    },
    getPanelIcon: function getPanelIcon(item) {
      return ['p-menuitem-icon', item.icon];
    },
    getHeaderLinkClass: function getHeaderLinkClass(item, routerProps) {
      return ['p-panelmenu-header-link', {
        'router-link-active': routerProps && routerProps.isActive,
        'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
      }];
    },
    isActive: function isActive(item) {
      return item === this.activeItem;
    },
    getHeaderClass: function getHeaderClass(item) {
      return ['p-component p-panelmenu-header', {
        'p-highlight': this.isActive(item),
        'p-disabled': this.disabled(item)
      }];
    },
    visible: function visible(item) {
      return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    },
    label: function label(item) {
      return typeof item.label === 'function' ? item.label() : item.label;
    }
  },
  components: {
    'PanelMenuSub': PanelMenuSub
  },
  computed: {
    ariaId: function ariaId() {
      return UniqueComponentId();
    }
  }
});
// CONCATENATED MODULE: ./src/components/panelmenu/PanelMenu.vue?vue&type=script&lang=js
 /* harmony default export */ var panelmenu_PanelMenuvue_type_script_lang_js = (PanelMenuvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/panelmenu/PanelMenu.vue?vue&type=style&index=0&id=531dc28a&prod&lang=css
var PanelMenuvue_type_style_index_0_id_531dc28a_prod_lang_css = __webpack_require__("ca18");

// CONCATENATED MODULE: ./src/components/panelmenu/PanelMenu.vue






/* normalize component */

var PanelMenu_component = normalizeComponent(
  panelmenu_PanelMenuvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PanelMenu = (PanelMenu_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (PanelMenu);



/***/ })

/******/ })["default"];
});