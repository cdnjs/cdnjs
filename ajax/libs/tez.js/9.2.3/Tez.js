(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//Code adapted from https://gist.github.com/Dynalon/a8790a1fa66bfd2c26e1
// Then improved by @dalisoft for tez.js
var createElement = function createElement(tagName, attributes) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    if (!tagName || typeof tagName !== 'string') throw new Error("tagName has to be defined, non-empty string");

    children = children || [];
    attributes = attributes || [];

    var element = document.createElement(tagName);
    var attrKeys = Object.keys(attributes);

    attrKeys.map(function (attribute_key) {
        var attribute_value = attributes[attribute_key];
        element.setAttribute(attribute_key, attribute_value);
    });

    children.map(function (child) {
        if (child instanceof HTMLElement) element.appendChild(child);else if (typeof child === 'string' || typeof child === 'number') element.appendChild(document.createTextNode(child));
    });

    return element;
};

exports.default = createElement;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.attrs = attrs;
function attrs(a) {
	if (!(a && a.attributes)) return '{}';
	var _a = {};
	var attributes = a.attributes;

	for (var i = 0, atr, len = attributes.length; i < len; i++) {
		atr = attributes[i];
		if (atr.value) {
			_a[atr.name] = atr.value;
		}
	}
	return JSON.stringify(_a);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ROOT = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : undefined;
var MAX_WORKER_THREAD = 2;
var CURRENT_WORKER_THREAD = 0;
var LIST_WORKER_THREAD = [];
var ARRAY_SLICE = [].slice;
var FUNC_STR = Function.toString;
var WORKER_SUPPORT = ROOT.Worker !== undefined;

exports.MAX_WORKER_THREAD = MAX_WORKER_THREAD;
exports.CURRENT_WORKER_THREAD = CURRENT_WORKER_THREAD;
exports.LIST_WORKER_THREAD = LIST_WORKER_THREAD;
exports.ARRAY_SLICE = ARRAY_SLICE;
exports.FUNC_STR = FUNC_STR;
exports.WORKER_SUPPORT = WORKER_SUPPORT;
exports.ROOT = ROOT;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._getItem = _getItem;

var _configs = __webpack_require__(2);

function _getItem(item, parent) {
	if (item.isEqualNode(parent)) {
		return item;
	}
	var childs = _configs.ARRAY_SLICE.call(parent.children);
	var i = 0;
	var _match = void 0;
	var _parentWhile = void 0;
	var _matchInsideWhile = void 0;
	if (childs.length) {
		while (i < childs.length) {
			if (childs[i] && childs[i].isEqualNode(item)) {
				_match = childs[i];
				_parentWhile = parent;
				break;
			} else if (_matchInsideWhile = _getItem(item, _parentWhile = childs[i])) {
				_match = _matchInsideWhile;
				break;
			}
			i++;
		}
	} else if (item.isEqualNode(parent)) {
		_match = parent;
	}
	if (_match) {
		return {
			matched: _match,
			matchParent: _parentWhile
		};
	}
	return null;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attrs2 = __webpack_require__(1);

var _str2node = __webpack_require__(11);

var _patchDiff = __webpack_require__(10);

var _makeNode2 = __webpack_require__(9);

var _getItem2 = __webpack_require__(3);

var _createElement = __webpack_require__(0);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var domClass = function () {
	function domClass(node) {
		var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, domClass);

		this._vars = vars;
		if (vars.quickRender === undefined) {
			vars.quickRender = true;
		}
		this._opt = {};
		this._node = typeof node === 'string' ? document.querySelector(node) : node.length && node[0].nodeType ? node[0] : node;
		this._vnode = this._node.cloneNode(true);
		this._quickRender = vars.quickRender;
		this._disableSafeParse = vars.disableSafeParse;
		this._appendStore = [];
		this.props = {};
		this._listOfNodes = [];
		if (vars.styling === undefined) {
			vars.styling = this._vnode.style.cssText;
		}
		if (vars.attrs === undefined) {
			vars.attrs = (0, _attrs2.attrs)(this._vnode);
		}
		if (vars.content === undefined) {
			vars.content = this._vnode.innerHTML;
		}
		return this.render();
	}

	_createClass(domClass, [{
		key: 'createElement',
		value: function createElement(opts) {
			var item = void 0;
			var appendStore = this._appendStore;
			var len = appendStore.length;
			appendStore[len] = {
				real: 'append',
				virtual: item = (0, _makeNode2._makeNode)(opts),
				diff: false,
				index: len
			};
			return item;
		}
	}, {
		key: 'sync',
		value: function sync(_ref) {
			var props = _ref.props,
			    content = _ref.content,
			    styling = _ref.styling,
			    attrs = _ref.attrs;

			if (props) {
				this.props = props;
			}
			if (content) {
				this.vars.content = content;
			}
			if (styling) {
				this.vars.styling = styling;
			}
			if (attrs) {
				this.vars.attrs = attrs;
			}

			return this;
		}
	}, {
		key: 'setProps',
		value: function setProps(props) {
			for (var p in props) {
				this.props[p] = props[p];
			}
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'setEvent',
		value: function setEvent(find, eventName, eventFunc) {
			var __self__ = this;
			var _node = this._node;


			if (eventFunc === undefined && typeof eventName === "function") {
				eventFunc = eventName;
				eventName = find;
				find = null;
			}

			var __eventFunc__ = function __eventFunc__(e) {
				eventFunc.call(__self__, this, e);
			};
			if (eventFunc && find === null) {
				_node.addEventListener(eventName, __eventFunc__);
			} else if (eventFunc) {
				find = _node.querySelector(find);
				find.addEventListener(eventName, __eventFunc__);
			}
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'createFunction',
		value: function createFunction(fn) {
			fn.call(this);
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'render',
		value: function render() {
			var _vars = this._vars,
			    _node = this._node,
			    _vnode = this._vnode,
			    _appendStore = this._appendStore,
			    _listOfNodes = this._listOfNodes,
			    _disableSafeParse = this._disableSafeParse;

			var _vattrs = _vars.attrs;
			var _attrs = (0, _attrs2.attrs)(_node);
			var _diff = void 0,
			    _diff2 = void 0;
			if (_attrs !== _vattrs) {
				_diff = JSON.parse(_vattrs);
				_diff2 = JSON.parse(_attrs);
				for (var p in _diff) {
					_node.setAttribute(p, _diff[p]);
				}
				for (var _p in _diff2) {
					if (_diff[_p] === undefined) {
						_node.removeAttribute(_p);
					}
				}
				_vars.attrs = (0, _attrs2.attrs)(_vnode);
			}
			_vattrs = _vars.styling;
			_attrs = _node.style.cssText;
			if (_vattrs !== _attrs) {
				this._node.style.cssText = _vattrs;
				_vars.styling = _node.style.cssText;
			}
			_vattrs = _vars.content;
			_attrs = _node.innerHTML;
			if (!_disableSafeParse) {
				_vattrs = _vattrs.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			for (var i = 0, idx, len = _listOfNodes.length; i < len; i++) {
				idx = _appendStore.length;
				_appendStore[idx] = {
					virtual: _listOfNodes[i],
					real: 'append',
					diff: false,
					index: idx
				};
			}
			if (_appendStore.length || _attrs !== _vattrs) {
				_vnode.innerHTML = _vattrs;
				(0, _patchDiff.replaceChildrenByDiff)(_node, _vnode, _vnode.childNodes, _node.childNodes, _appendStore);
				_vars.content = _vnode.innerHTML;
			}
			return this;
		}
	}, {
		key: 'setNode',
		value: function setNode(node) {
			this._listOfNodes.push(node);
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'setAttrs',
		value: function setAttrs(_attrs) {
			var attr = void 0;
			var nattr = {};
			var _attr = JSON.parse(this._vars.attrs);
			for (var p in _attr) {
				if (_attr[p] !== undefined) {
					nattr[p] = _attr[p];
				}
			}
			for (var p in _attrs) {
				if (_attrs[p] !== undefined) {
					nattr[p] = _attrs[p];
				}
			}
			this._vars.attrs = JSON.stringify(nattr);
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'setStyling',
		value: function setStyling(cssText) {
			var styling = this._vars.styling;
			var style = this._vnode.style;
			style.cssText = styling;
			for (var p in cssText) {
				style[p] = cssText[p];
			}
			this._vars.styling = style.cssText;
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'setView',
		value: function setView(get, param) {
			var finalNode = domClass.parseComponent(get, false, param, this);
			if (finalNode && finalNode.nodeType) {
				this._vars.content = finalNode.innerHTML;
				this._vars.styling = finalNode.style.cssText;
				this._vars.attrs = (0, _attrs2.attrs)(finalNode);
			}
			return this._quickRender ? this.render() : this;
		}
	}, {
		key: 'setContent',
		value: function setContent(contents, param) {
			var content = this._vars.content;
			if (!contents) {
				return this._quickRender ? this.render() : this;
			}
			contents = domClass.getComponentRendered(typeof contents === "string" ? contents : contents.nodeType ? contents.outerHTML : contents, param, this);
			contents = contents.nodeType ? contents.outerHTML : contents;
			var rel = contents.includes("=") ? contents.charAt(0) === "+" ? 1 : contents.charAt(0) === "-" ? -1 : 0 : 0;

			if (rel === 0) {
				content = contents;
			} else if (rel === 1) {
				content += contents.substr(2);
			} else if (rel === -1) {
				var _getParsed = (0, _str2node._parseString)(contents.substr(2))[0];
				var _find = (0, _getItem2._getItem)(_getParsed, this._node);
				if (_find && _find.matched) {
					this._appendStore.push({
						virtual: _find.matched,
						real: 'append',
						remove: true
					});
				}
			}

			this._vars.content = content;
			return this._quickRender ? this.render() : this;
		}
	}], [{
		key: 'getComponentRendered',
		value: function getComponentRendered(get, param, that) {
			var _params = Object.assign({}, that ? that.props : {}, param);
			if (that) {
				that.props = _params;
			}
			if (typeof get === "string" || typeof get === "number") {
				return get;
			} else if (get === undefined || get === null) {
				return '';
			} else if (typeof get === "function" || (typeof get === 'undefined' ? 'undefined' : _typeof(get)) === "object") {

				var oldGet = get;
				get = typeof get === "function" ? that && !get.initted ? new get(that) : get(that) : get;
				get.props = _params;
				if (!(get.Render || get.render)) {
					get = oldGet;
				}
				if (that) {
					get.super = that;
				}
				if (get && !get.initted && typeof get.init === "function") {
					get.init();
					get.initted = true;
				}
				var viewMethod = get.Render ? "Render" : "render";
				var compileComponent2Node = get && (get.Render || get.render);
				return compileComponent2Node && get[viewMethod] ? get[viewMethod]() : false;
			}
			return '';
		}
	}, {
		key: 'parseComponent',
		value: function parseComponent(get, multi, param, that) {
			var finalNode = void 0;
			if (get && get.nodeType) {
				finalNode = get;
			} else if (typeof get === "string") {
				var compileStr2Node = get.includes("</") || get.includes("/>");
				if (compileStr2Node) {
					finalNode = (0, _str2node._parseString)(get);
				} else {
					finalNode = [document.createElement(get)];
				}
			} else if (typeof get === "function" || (typeof get === 'undefined' ? 'undefined' : _typeof(get)) === "object") {
				var compileComponent2Node = domClass.getComponentRendered(get, param, that);
				if (compileComponent2Node) {
					finalNode = (0, _str2node._parseString)(compileComponent2Node);
				} else {
					finalNode = [(0, _makeNode2._makeNode)(typeof get === "function" ? get() : get)];
				}
			}
			return multi ? finalNode : finalNode[0];
		}
	}]);

	return domClass;
}();

;

exports.default = domClass;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Array.from) {
	var slice = [].slice;
	Array.from = function from(arrayLike) {
		return slice.call(arrayLike);
	};
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!String.prototype.includes) {
	String.prototype.includes = function (find) {
		return this.indexOf(find) > -1;
	};
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.extend = extend;
function extend() {
	var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	for (var p in b) {
		if (a[p] === undefined && b[p] !== undefined) {
			a[p] = b[p];
		}
	}
	return a;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var makeNode = function makeNode(opts) {
	if (!opts || !opts.tag) return;
	var tag = opts.tag,
	    css = opts.css,
	    content = opts.content,
	    attr = opts.attr;

	var _tag = document.createElement(tag);
	if (css) {
		_tag.style.cssText = css;
	}
	if (content) {
		_tag.innerHTML = content;
	}
	if (attr) {
		for (var p in attr) {
			_tag.setAttribute(p, attr[p]);
		}
	}
	return _tag;
};

var createElement = makeNode;

exports.createElement = createElement;
exports.makeNode = makeNode;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.replaceChildrenByDiff = replaceChildrenByDiff;

var _attrs3 = __webpack_require__(1);

var _extend = __webpack_require__(8);

var _getItem2 = __webpack_require__(3);

var HTMLSyntaxTags = new RegExp("&lt;|&gt;|/>|<|>", "g");

function replaceChildrenByDiff(_attrs, _vattrs) {
	var _childs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	var _childs2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

	var _store = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

	if (!_attrs || !_vattrs) {
		return null;
	}
	var _attrs1 = (0, _attrs3.attrs)(_attrs);
	var _attrs2 = (0, _attrs3.attrs)(_vattrs);
	var i = 0;
	var _max = Math.max(_childs.length, _childs2.length);
	var _attrTag = _attrs.tagName,
	    _vattrTag = _vattrs.tagName;
	var _isNT = _attrs.nodeType,
	    _isVNT = _vattrs.nodeType,
	    _isTN = _isNT === 3,
	    _isVTN = _isVNT === 3;
	var _attrCSS = _attrs && _attrs.style && _attrs.style.cssText,
	    _vattrCSS = _vattrs && _vattrs.style && _vattrs.style.cssText;
	var _attrHTML = _attrs.innerHTML,
	    _vattrHTML = _vattrs.innerHTML;
	var _isEqualHTML = _attrHTML === _vattrHTML;
	var _isEqualCSS = _attrCSS === _vattrCSS;
	var _isEqualTag = _attrTag === _vattrTag;
	var _isEqualTag8CSS = _isEqualCSS && _isEqualTag;
	var _isEqualTextNode = _isTN === true && _isTN === _isVTN;
	var _isEqualAttr = _attrs === _attrs2;
	var item = void 0;
	var pi;
	var ni;
	var _tmp;
	var len = void 0;
	var itemReal = void 0,
	    itemVirtual = void 0;
	if (_max) {
		while (i < _max) {
			itemVirtual = _childs[i];
			itemReal = _childs2[i];
			if (itemVirtual && !itemReal) {
				_store.push({
					index: i,
					diff: false,
					virtual: itemVirtual,
					real: 'append'
				});
			} else if (itemReal && !_childs[i]) {
				_store.push({
					index: i,
					diff: false,
					virtual: 'append',
					real: itemReal
				});
			} else if (itemVirtual && itemVirtual.isEqualNode(itemReal) === false) {
				_store.push({
					index: i,
					diff: true,
					virtual: itemVirtual,
					real: itemReal
				});
			}
			i++;
		}
	}
	if (_store.length) {
		var a = 0;
		var _tmp2 = void 0;
		while (item = _store.shift()) {
			i = item.index;
			var _pi = i - 1;
			var _ni = i + 1;
			var vr = item.virtual;
			var rr = item.real;
			if (!item.diff && rr === 'append') {
				_tmp2 = _childs2[_ni];
				if (_tmp2) {
					_attrs.insertBefore(vr, _tmp2);
				} else {
					_attrs.appendChild(vr);
				}
			} else if (!item.diff && vr === 'append') {
				if (rr.remove !== undefined) {
					rr.remove();
				} else {
					_attrs.removeChild(rr);
				}
			} else if (item.diff) {
				if (rr.tagName === undefined || vr.tagName === undefined || rr.tagName !== vr.tagName) {
					_attrs.replaceChild(vr, rr);
				} else {
					replaceChildrenByDiff(rr, vr, vr.childNodes, rr.childNodes);
				}
			}
		}
	} else if (_isEqualTextNode && _attrs.value !== _vattrs.value) {
		_attrs.value = _vattrs.value;
	} else if (!_isEqualTag && _attrs.parentNode !== null && _vattrs && _vattrs.nodeType) {
		_attrs.parentNode.replaceChild(_vattrs, _attrs);
	} else if (!_isEqualAttr && _isEqualTag8CSS && _isEqualHTML) {
		var _diff = (0, _extend.extend)(JSON.parse(_attrs2), JSON.parse(_attrs1));
		for (var p in _diff) {
			if (p === "style") {
				continue;
			}
			_attrs.setAttribute(p, _diff[p]);
		}
	} else if (HTMLSyntaxTags.test(_vattrHTML) && _attrHTML !== _vattrHTML) {
		if (_attrs.childNodes && _attrs.childNodes.length) {
			replaceChildrenByDiff(_attrs, _vattrs, _vattrs.childNodes, _attrs.childNodes);
		} else if (_attrs.isEqualNode(_vattrs)) {
			_attrs.innerHTML = _vattrs.innerHTML;
		} else {
			_attrs.parentNode.replaceChild(_vattrs, _attrs);
		}
		// maybe later...
	} else {
		if (_attrs.textContent) {
			_attrs.textContent = _vattrs.textContent;
		} else {
			_attrs.innerText = _vattrs.innerText;
		}
	}
	return _attrs;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports._parseString = _parseString;

var _configs = __webpack_require__(2);

var document = _configs.ROOT.document;

var _tmpDiv = document !== undefined ? document.createElement("div") : false;
function _parseString(str) {
	if (!str || !_tmpDiv) {
		return [];
	};
	_tmpDiv.innerHTML = str;
	return _configs.ARRAY_SLICE.call(_tmpDiv.children);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tez = undefined;

__webpack_require__(6);

__webpack_require__(5);

var _domClass = __webpack_require__(4);

var _domClass2 = _interopRequireDefault(_domClass);

var _createElement = __webpack_require__(0);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tez = Object.assign(_domClass2.default, { createElement: _createElement2.default });

exports.Tez = Tez;

/***/ })
/******/ ]);
});
//# sourceMappingURL=Tez.js.map