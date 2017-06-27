(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cssx", [], factory);
	else if(typeof exports === 'object')
		exports["cssx"] = factory();
	else
		root["cssx"] = factory();
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var CSSFactory = __webpack_require__(1);
	
	module.exports = CSSFactory();
	module.exports.stylesheet = CSSFactory;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CSSRule = __webpack_require__(2);
	var applyToDOM = __webpack_require__(3);
	var isArray = __webpack_require__(4);
	var isEmpty = __webpack_require__(5);
	
	var ids = 0;
	var getId = function () { return 'x' + (++ids); };
	
	module.exports = function () {
	  var _id = getId();
	  var _api = {};
	  var _rules = [];
	  var _remove = null;
	
	  var toDOM = function (css) {
	    return applyToDOM(css, _id);
	  };
	  var generate = function (rs, parent) {
	    var i, rule, props, prop, children, selector, firstRun = typeof rs === 'undefined';
	    var rules = firstRun ? _rules : rs;
	    var css = '';
	
	    for (i = 0; i < rules.length; i++) {
	      rule = rules[i];
	      children = rule.getChildren();
	      selector = (parent ? parent + ' ' : '');
	      selector += typeof rule.selector === 'function' ? rule.selector() : rule.selector;
	      props = typeof rule.props === 'function' ? rule.props() : rule.props;
	      if (!isEmpty(props)) {
	        css += selector + '{';
	        if (props) {
	          for (prop in props) {
	            css += prop + ':' + props[prop] + ';';
	          }
	        }
	        css += '}';
	      }
	      if (children.length > 0) {
	        css += generate(children, selector);
	      }
	    };
	    return css;
	  };
	
	  _api.id = function () {
	    return _id;
	  };
	  _api.add = function (parent, selector, props) {
	    var rule, i, args = Array.prototype.slice.call(arguments);
	
	    if (arguments.length <= 2) {
	      selector = args[0];
	      props = args[1];
	      parent = null;
	    }
	
	    rule = CSSRule(selector, props);
	
	    if (parent !== null) {
	      parent.addChild(rule);
	    } else {
	      _rules.push(rule);
	    }
	    return {
	      add: function (selector, props) {
	        var result = [];
	
	        if (isArray(selector)) {
	          for (i = 0; i < selector.length; i++) {
	            result.push(this.add(selector[i], props));
	          }
	          return result;
	        }
	        return _api.add(rule, selector, props);
	      }
	    };
	  };
	  _api.rules = function () {
	    return _rules;
	  };
	  _api.compile = function (noDOM) {
	    var css = generate();
	
	    if (!noDOM) {
	      _remove = toDOM(css);
	    }
	    return css;
	  };
	  _api.clear = function () {
	    _rules = [];
	    if (_remove !== null) {
	      _remove();
	      _remove = null;
	    }
	    return _api;
	  };
	
	  return _api;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function (selector, props, children) {
	  var _children = children || [];
	
	  var record = {
	    selector: selector,
	    props: props,
	    addChild: function (c) {
	      _children.push(c);
	    },
	    getChildren: function () {
	      return _children;
	    }
	  };
	
	  return record;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	var cache = {};
	
	var qs = function (selector) {
	  return document.querySelector(selector);
	};
	
	var createNode = function (type, attrs, content) {
	  var node = document.createElement(type), i, a;
	
	  for (i = 0; i < attrs.length; i++) {
	    a = attrs[i];
	    node.setAttribute(a.name, a.value);
	  }
	  node.innerHTML = content;
	  (qs('head') || qs('body')).appendChild(node);
	  return node;
	};
	
	var remove = function (id) {
	  return function () {
	    if (cache[id]) {
	      cache[id].el.parentNode.removeChild(cache[id].el);
	      delete cache[id];
	    }
	  };
	};
	
	module.exports = function (css, id) {
	  var el;
	
	  if (!cache[id]) {
	    el = createNode(
	      'style', [
	        { name: 'id', value: id },
	        { name: 'type', value: 'text/css'}
	      ],
	       css
	    );
	    cache[id] = { el: el, css: css, remove: remove(id) };
	  } else {
	    if (cache[id].css !== css) {
	      cache[id].css = css;
	      cache[id].el.innerHTML = css;
	    }
	  }
	
	  return cache[id].remove;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function (v) {
	  return Object.prototype.toString.call(v) === '[object Array]';
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	  var prop;
	
	  for (prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	      return false;
	    }
	  }
	  return true;
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=cssx.js.map