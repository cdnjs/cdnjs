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

	'use strict';
	
	var CSSFactory = __webpack_require__(1);
	
	var ids = 0;
	var getId = function getId() {
	  return 'cssx' + (ids += 1);
	};
	var cssCache = {};
	
	var applyToDOM = function applyToDOM(css, id) {
	  var el;
	
	  if (!cssCache[id]) {
	    el = createNode('style', [{ name: "id", value: id }, { name: "type", value: "text/css" }], css);
	    cssCache[id] = { el: el, css: css };
	  } else {
	    if (cssCache[id].css !== css) {
	      cssCache[id].css = css;
	      cssCache[id].el.innerHTML = css;
	    }
	  }
	};
	
	var createNode = function createNode(type, attrs, content) {
	  var node = document.createElement(type),
	      i,
	      a;
	  for (i = 0; i < attrs.length, a = attrs[i]; i++) {
	    node.setAttribute(a.name, a.value);
	  }
	  node.innerHTML = content;
	  (qs("head") || qs("body")).appendChild(node);
	  return node;
	};
	
	var qs = function qs(selector) {
	  return document.querySelector(selector);
	};
	
	var cssx = function cssx(rule, id) {
	  if (!id) id = getId();
	  if (rule) applyToDOM(CSSFactory.generate(rule), id);
	  return id;
	};
	
	module.exports.compile = function () {
	  var id = cssx();
	  return function (rule) {
	    return cssx(rule, id);
	  };
	};
	module.exports.rule = CSSFactory.rule;
	module.exports.generate = CSSFactory.generate;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	function rule(selector, props, children) {
	  if (children) {
	    if (Array !== children.constructor) children = [children];
	  } else {
	    children = [];
	  }
	
	  return {
	    _ownSelector: selector,
	    selector: selector,
	    props: props,
	    children: children,
	    setProperSelectors: function setProperSelectors(s) {
	      var self = this;
	      !!s ? self.selector = s + ' ' + self._ownSelector : null;
	      self.children.forEach(function (c) {
	        c.setProperSelectors(self.selector);
	      });
	    }
	  };
	};
	
	function generate(rule) {
	  rule.setProperSelectors();
	  return (function rulesToCSS(r) {
	    var result = '',
	        key,
	        skip = isEmpty(r.props);
	
	    if (!skip) {
	      result += r.selector + '{';
	      for (key in r.props) {
	        result += key + ':' + r.props[key] + ';';
	      }
	      result += '}';
	    }
	    r.children.forEach(function (c) {
	      result += rulesToCSS(c);
	    });
	    return result;
	  })(rule);
	};
	
	function isEmpty(obj) {
	  for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) return false;
	  }
	  return true;
	}
	
	module.exports = {
	  rule: rule,
	  generate: generate
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cssx.js.map