(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
		var ignoredProperties = ['id', 'width', 'height', 'onElementsClick'];
		var compareNext = this._objectWithoutProperties(nextProps, ignoredProperties);
		var compareNow = this._objectWithoutProperties(this.props, ignoredProperties);
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

var Doughnut = (function (_React$Component) {
	_inherits(Doughnut, _React$Component);

	function Doughnut() {
		_classCallCheck(this, Doughnut);

		_get(Object.getPrototypeOf(Doughnut.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Doughnut, [{
		key: 'render',
		value: function render() {
			var _this = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this.chart_instance = ref && ref.chart_instance;
				},
				type: 'doughnut'
			}));
		}
	}]);

	return Doughnut;
})(_react2['default'].Component);

exports.Doughnut = Doughnut;

var Pie = (function (_React$Component2) {
	_inherits(Pie, _React$Component2);

	function Pie() {
		_classCallCheck(this, Pie);

		_get(Object.getPrototypeOf(Pie.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Pie, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this2.chart_instance = ref && ref.chart_instance;
				},
				type: 'pie'
			}));
		}
	}]);

	return Pie;
})(_react2['default'].Component);

exports.Pie = Pie;

var Line = (function (_React$Component3) {
	_inherits(Line, _React$Component3);

	function Line() {
		_classCallCheck(this, Line);

		_get(Object.getPrototypeOf(Line.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Line, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this3.chart_instance = ref && ref.chart_instance;
				},
				type: 'line'
			}));
		}
	}]);

	return Line;
})(_react2['default'].Component);

exports.Line = Line;

var Bar = (function (_React$Component4) {
	_inherits(Bar, _React$Component4);

	function Bar() {
		_classCallCheck(this, Bar);

		_get(Object.getPrototypeOf(Bar.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Bar, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this4.chart_instance = ref && ref.chart_instance;
				},
				type: 'bar'
			}));
		}
	}]);

	return Bar;
})(_react2['default'].Component);

exports.Bar = Bar;

var HorizontalBar = (function (_React$Component5) {
	_inherits(HorizontalBar, _React$Component5);

	function HorizontalBar() {
		_classCallCheck(this, HorizontalBar);

		_get(Object.getPrototypeOf(HorizontalBar.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(HorizontalBar, [{
		key: 'render',
		value: function render() {
			var _this5 = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this5.chart_instance = ref && ref.chart_instance;
				},
				type: 'horizontalBar'
			}));
		}
	}]);

	return HorizontalBar;
})(_react2['default'].Component);

exports.HorizontalBar = HorizontalBar;

var Radar = (function (_React$Component6) {
	_inherits(Radar, _React$Component6);

	function Radar() {
		_classCallCheck(this, Radar);

		_get(Object.getPrototypeOf(Radar.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Radar, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this6.chart_instance = ref && ref.chart_instance;
				},
				type: 'radar'
			}));
		}
	}]);

	return Radar;
})(_react2['default'].Component);

exports.Radar = Radar;

var Polar = (function (_React$Component7) {
	_inherits(Polar, _React$Component7);

	function Polar() {
		_classCallCheck(this, Polar);

		_get(Object.getPrototypeOf(Polar.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Polar, [{
		key: 'render',
		value: function render() {
			var _this7 = this;

			return _react2['default'].createElement(ChartComponent, _extends({}, this.props, {
				ref: function (ref) {
					return _this7.chart_instance = ref && ref.chart_instance;
				},
				type: 'polarArea'
			}));
		}
	}]);

	return Polar;
})(_react2['default'].Component);

exports.Polar = Polar;

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