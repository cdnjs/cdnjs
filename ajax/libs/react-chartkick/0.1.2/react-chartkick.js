(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("Chartkick"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "Chartkick"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("Chartkick")) : factory(root["React"], root["Chartkick"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	/*
	 * React Chartkick
	 * Create beautiful charts with one line in React
	 * https://github.com/ankane/react-chartkick
	 * v0.1.2
	 * @license MIT
	 */

	var React = __webpack_require__(1)
	var Chartkick = __webpack_require__(2)
	var chartId = 1

	var createComponent = function(chartType) {
	  return React.createClass({
	    componentDidMount: function() {
	      var data = this.props.data
	      var options = {}
	      for (var prop in this.props) {
	        if (this.props.hasOwnProperty(prop) && prop !== "data" && prop !== "id" && prop !== "height" && prop !== "width") {
	          options[prop] = this.props[prop]
	        }
	      }
	      new chartType(this.chartId, data, options)
	    },
	    render: function() {
	      var props = this.props
	      var style = {
	        height: props.height || "300px",
	        lineHeight: props.height || "300px",
	        width: props.width || "100%",
	        textAlign: "center",
	        color: "#999",
	        fontSize: "14px",
	        fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
	      }
	      this.chartId = this.chartId || props.id || ("chart-" + chartId++)
	      return (
	        React.createElement("div", {id: this.chartId, style: style},
	          "Loading..."
	        )
	      )
	    }
	  })
	}

	module.exports = {
	  LineChart: createComponent(Chartkick.LineChart),
	  PieChart: createComponent(Chartkick.PieChart),
	  ColumnChart: createComponent(Chartkick.ColumnChart),
	  BarChart: createComponent(Chartkick.BarChart),
	  AreaChart: createComponent(Chartkick.AreaChart),
	  ScatterChart: createComponent(Chartkick.ScatterChart),
	  GeoChart: createComponent(Chartkick.GeoChart),
	  Timeline: createComponent(Chartkick.Timeline)
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;