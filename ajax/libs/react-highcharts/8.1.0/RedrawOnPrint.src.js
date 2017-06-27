(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["RedrawOnPrint"] = factory(require("react"));
	else
		root["RedrawOnPrint"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var RedrawOnPrint = React.createClass({
	  displayName: 'RedrawOnPrint',
	  componentDidMount: function componentDidMount() {
	    // This is a listiner bind to the print media query
	    // it call reflow since highcharts doesn't reflow upon print
	    // http://stackoverflow.com/questions/32821003/redraw-resize-highcharts-when-printing-website
	    if (window.matchMedia) {
	      var mediaQueryList = window.matchMedia('print');
	      mediaQueryList.addListener(this._reflowChildren);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (window.matchMedia) {
	      var mediaQueryList = window.matchMedia('print');
	      mediaQueryList.removeListener(this._reflowChildren);
	    }
	  },
	  _reflowChildren: function _reflowChildren() {
	    this.children.map(function (child) {
	      if (!child || !child.chart) {
	        throw new Error('RedrawOnPrint child should be a highcharts');
	      }
	      child.chart.reflow();
	    });
	  },
	  render: function render() {
	    var _this = this;

	    this.children = [];
	    return React.createElement(
	      'div',
	      null,
	      React.Children.map(this.props.children, function (child) {
	        return React.cloneElement(child, {
	          ref: function ref(c) {
	            return c && _this.children.push(c);
	          }
	        });
	      })
	    );
	  }
	});

	module.exports = RedrawOnPrint;

/***/ }

/******/ })
});
;