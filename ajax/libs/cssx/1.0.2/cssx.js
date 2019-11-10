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
	var isObject = __webpack_require__(4);
	var generate = __webpack_require__(6);
	
	var ids = 0;
	var getId = function () { return 'x' + (++ids); };
	
	module.exports = function () {
	  var _id = getId();
	  var _api = {};
	  var _rules = [];
	  var _remove = null;
	
	  var register = function (parent, selector, props, isWrapper) {
	    var rule;
	
	    rule = CSSRule(selector, props);
	
	    if (parent !== null) {
	      parent.addChild(rule, isWrapper);
	    } else {
	      _rules.push(rule);
	    }
	    return {
	      add: function (selector, props) {
	        var result = [], sel;
	
	        if (isObject(selector)) {
	          for (sel in selector) {
	            result.push(register(rule, sel, selector[sel], true));
	          }
	          return result;
	        }
	        return register(rule, selector, props);
	      }
	    };
	  };
	
	  _api.id = function () {
	    return _id;
	  };
	
	  _api.add = function (selector, props) {
	    var result = [], sel;
	
	    if (isObject(selector)) {
	      for (sel in selector) {
	        result.push(this.add(sel, selector[sel]));
	      }
	      return result;
	    }
	    return register(null, selector, props);
	  };
	
	  _api.rules = function () {
	    return _rules;
	  };
	
	  _api.compile = function (noDOM) {
	    var css = generate(_rules);
	
	    if (!noDOM) {
	      _remove = applyToDOM(css, _id);
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

	module.exports = function (selector, props) {
	  var _children = [];
	  var _nestedChildren = [];
	
	  var record = {
	    selector: selector,
	    props: props,
	    addChild: function (c, isWrapper) {
	      (isWrapper ? _nestedChildren : _children).push(c);
	    },
	    getChildren: function () {
	      return _children;
	    },
	    getNestedChildren: function () {
	      return _nestedChildren;
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
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5);
	
	module.exports = function (item) {
	  return (typeof item === 'object' && !isArray(item) && item !== null);
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function (v) {
	  return Object.prototype.toString.call(v) === '[object Array]';
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isEmpty = __webpack_require__(7);
	
	module.exports = function generate(rules, parent) {
	  var i, j, rule, props, prop, children, nestedChildren, selector, cssValue;
	  var css = '';
	
	  for (i = 0; i < rules.length; i++) {
	    rule = rules[i];
	    children = rule.getChildren();
	    nestedChildren = rule.getNestedChildren();
	    selector = (parent ? parent + ' ' : '');
	    selector += typeof rule.selector === 'function' ? rule.selector() : rule.selector;
	    props = typeof rule.props === 'function' ? rule.props() : rule.props;
	    if (!isEmpty(props) || nestedChildren.length > 0) {
	      css += selector + '{';
	      if (props) {
	        for (prop in props) {
	          cssValue = typeof props[prop] === 'function' ? props[prop]() : props[prop];
	          css += prop + ':' + cssValue + ';';
	        }
	      }
	      for (j = 0; j < nestedChildren.length; j++) {
	        css += generate([nestedChildren[j]]);
	      }
	      css += '}';
	    }
	    if (children.length > 0) {
	      css += generate(children, selector);
	    }
	  };
	  return css;
	};


/***/ },
/* 7 */
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