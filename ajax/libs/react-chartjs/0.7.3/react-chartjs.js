(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("Chartjs"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "Chartjs"], factory);
	else if(typeof exports === 'object')
		exports["react-chartjs"] = factory(require("react"), require("react-dom"), require("Chartjs"));
	else
		root["react-chartjs"] = factory(root["React"], root["ReactDOM"], root["Chart"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	module.exports = {
	  Bar: __webpack_require__(1),
	  Doughnut: __webpack_require__(6),
	  Line: __webpack_require__(7),
	  Pie: __webpack_require__(8),
	  PolarArea: __webpack_require__(9),
	  Radar: __webpack_require__(10),
	  createClass: __webpack_require__(2).createClass
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(2);

	module.exports = vars.createClass('Bar', ['getBarsAtEvent']);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(4);

	module.exports = {
	  createClass: function(chartType, methodNames, dataKey) {
	    var classData = {
	      displayName: chartType + 'Chart',
	      getInitialState: function() { return {}; },
	      render: function() {
	        var _props = {
	          ref: 'canvass'
	        };
	        for (var name in this.props) {
	          if (this.props.hasOwnProperty(name)) {
	            if (name !== 'data' && name !== 'options') {
	              _props[name] = this.props[name];
	            }
	          }
	        }
	        return React.createElement('canvas', _props);
	      }
	    };

	    var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'];
	    function extra(type) {
	      classData[type] = function() {
	        return this.state.chart[type].apply(this.state.chart, arguments);
	      };
	    }

	    classData.componentDidMount = function() {
	      this.initializeChart(this.props);
	    };

	    classData.componentWillUnmount = function() {
	      var chart = this.state.chart;
	      chart.destroy();
	    };

	    classData.componentWillReceiveProps = function(nextProps) {
	      var chart = this.state.chart;
	      if (nextProps.redraw) {
	        chart.destroy();
	        this.initializeChart(nextProps);
	      } else {
	        dataKey = dataKey || dataKeys[chart.name];
	        updatePoints(nextProps, chart, dataKey);
	        if (chart.scale) {
	          chart.scale.xLabels = nextProps.data.labels;
	          chart.scale.calculateXLabelRotation();
	        }
	        chart.update();
	      }
	    };

	    classData.initializeChart = function(nextProps) {
	      var Chart = __webpack_require__(5);
	      var el = ReactDOM.findDOMNode(this);
	      var ctx = el.getContext("2d");
	      var chart = new Chart(ctx)[chartType](nextProps.data, nextProps.options || {});
	      this.state.chart = chart;
	    };

	    // return the chartjs instance
	    classData.getChart = function() {
	      return this.state.chart;
	    };

	    // return the canvass element that contains the chart
	    classData.getCanvass = function() {
	      return this.refs.canvass;
	    };

	    classData.getCanvas = classData.getCanvass;

	    var i;
	    for (i=0; i<extras.length; i++) {
	      extra(extras[i]);
	    }
	    for (i=0; i<methodNames.length; i++) {
	      extra(methodNames[i]);
	    }

	    return React.createClass(classData);
	  }
	};

	var dataKeys = {
	  'Line': 'points',
	  'Radar': 'points',
	  'Bar': 'bars'
	};

	var updatePoints = function(nextProps, chart, dataKey) {
	  var name = chart.name;

	  if (name === 'PolarArea' || name === 'Pie' || name === 'Doughnut') {
	    nextProps.data.forEach(function(segment, segmentIndex) {
	      if (!chart.segments[segmentIndex]) {
	        chart.addData(segment);
	      } else {
	        Object.keys(segment).forEach(function (key) {
	          chart.segments[segmentIndex][key] = segment[key];
	        });
	      }
	    });
	  } else {
	    while (chart.scale.xLabels.length > nextProps.data.labels.length) {
	      chart.removeData();
	    }
	    nextProps.data.datasets.forEach(function(set, setIndex) {
	      set.data.forEach(function(val, pointIndex) {
	        if (typeof(chart.datasets[setIndex][dataKey][pointIndex]) == "undefined") {
	          addData(nextProps, chart, setIndex, pointIndex);
	        } else {
	          chart.datasets[setIndex][dataKey][pointIndex].value = val;
	        }
	      });
	    });
	  }
	};

	var addData = function(nextProps, chart, setIndex, pointIndex) {
	  var values = [];
	  nextProps.data.datasets.forEach(function(set) {
	    values.push(set.data[pointIndex]);
	  });
	  chart.addData(values, nextProps.data.labels[setIndex]);
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(2);

	module.exports = vars.createClass('Doughnut', ['getSegmentsAtEvent']);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(2);

	module.exports = vars.createClass('Line', ['getPointsAtEvent']);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(2);

	module.exports = vars.createClass('Pie', ['getSegmentsAtEvent']);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(2);

	module.exports = vars.createClass('PolarArea', ['getSegmentsAtEvent']);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(2);

	module.exports = vars.createClass('Radar', ['getPointsAtEvent']);


/***/ }
/******/ ])
});
;