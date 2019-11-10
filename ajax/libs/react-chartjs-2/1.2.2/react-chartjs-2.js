(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Doughnut = Doughnut;
exports.Pie = Pie;
exports.Line = Line;
exports.Bar = Bar;
exports.HorizontalBar = HorizontalBar;
exports.Radar = Radar;
exports.Polar = Polar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _chartJs = require('chart.js');

var _chartJs2 = _interopRequireDefault(_chartJs);

var _utilsDeepEqual = require('./utils/deepEqual');

var _utilsDeepEqual2 = _interopRequireDefault(_utilsDeepEqual);

var ChartComponent = _react2['default'].createClass({

	displayName: 'ChartComponent',

	propTypes: {
		data: _react.PropTypes.object.isRequired,
		height: _react.PropTypes.number,
		legend: _react.PropTypes.object,
		onElementsClick: _react.PropTypes.func,
		options: _react.PropTypes.object,
		redraw: _react.PropTypes.bool,
		type: _react.PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea']),
		width: _react.PropTypes.number
	},

	getDefaultProps: function getDefaultProps() {
		return {
			legend: {
				display: true,
				position: 'bottom'
			},
			type: 'doughnut',
			height: 150,
			width: 300,
			redraw: false
		};
	},

	componentWillMount: function componentWillMount() {
		this.chart_instance = undefined;
	},

	componentDidMount: function componentDidMount() {
		this.renderChart();
	},

	componentDidUpdate: function componentDidUpdate() {
		if (this.props.redraw) {
			this.chart_instance.destroy();
			this.renderChart();
		} else {
			this.updateChart();
		}
	},

	_objectWithoutProperties: function _objectWithoutProperties(obj, keys) {
		var target = {};
		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}
		return target;
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		var compareNext = this._objectWithoutProperties(nextProps, ['id', 'width', 'height']);
		var compareNow = this._objectWithoutProperties(this.props, ['id', 'width', 'height']);
		return !(0, _utilsDeepEqual2['default'])(compareNext, compareNow, { strict: true });
	},

	componentWillUnmount: function componentWillUnmount() {
		this.chart_instance.destroy();
	},

	updateChart: function updateChart() {
		var _props = this.props;
		var data = _props.data;
		var options = _props.options;

		if (!this.chart_instance) return;

		if (options) {
			this.chart_instance.options = _chartJs2['default'].helpers.configMerge(this.chart_instance.options, options);
		}

		this.chart_instance.config.data = _extends({}, this.chart_instance.config.data, data);

		this.chart_instance.update();
	},

	renderChart: function renderChart() {
		var _props2 = this.props;
		var data = _props2.data;
		var options = _props2.options;
		var legend = _props2.legend;
		var type = _props2.type;

		var node = _reactDom2['default'].findDOMNode(this);

		this.chart_instance = new _chartJs2['default'](node, {
			type: type,
			data: data,
			options: options
		});
	},

	handleOnClick: function handleOnClick(evt) {
		var elems = this.chart_instance.getElementsAtEvent(evt);
		if (elems.length) {
			var onElementsClick = this.props.onElementsClick;

			onElementsClick(elems);
		}
	},

	render: function render() {
		var _props3 = this.props;
		var height = _props3.height;
		var width = _props3.width;
		var onElementsClick = _props3.onElementsClick;

		return _react2['default'].createElement('canvas', {
			height: height,
			width: width,
			onClick: typeof onElementsClick === 'function' ? this.handleOnClick : null
		});
	}
});

exports['default'] = ChartComponent;

function Doughnut(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'doughnut' }));
}

function Pie(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'pie' }));
}

function Line(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'line' }));
}

function Bar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'bar' }));
}

function HorizontalBar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'horizontalBar' }));
}

function Radar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'radar' }));
}

function Polar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'polarArea' }));
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils/deepEqual":2,"chart.js":undefined,"react-dom":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var hasOwnProperty = Object.prototype.hasOwnProperty;

var is = function is(x, y) {
	// SameValue algorithm
	if (x === y) {
		// Steps 1-5, 7-10
		// Steps 6.b-6.e: +0 != -0
		return x !== 0 || 1 / x === 1 / y;
	} else {
		// Step 6.a: NaN == NaN
		return x !== x && y !== y;
	}
};

var deepEqual = function deepEqual(objA, objB) {
	if (is(objA, objB)) {
		return true;
	}

	if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		return false;
	}

	var keysA = Object.keys(objA);

	// Test for A's keys different from B.
	for (var i = 0; i < keysA.length; i++) {
		if (!hasOwnProperty.call(objB, keysA[i])) {
			return false;
		}
	}

	for (var propty in objA) {
		if (objB.hasOwnProperty(propty)) {
			if (!deepEqual(objA[propty], objB[propty])) {
				return false;
			}
		} else {
			return false;
		}
	}

	return true;
};

exports['default'] = deepEqual;
module.exports = exports['default'];

},{}]},{},[1])(1)
});