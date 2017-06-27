(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Chart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Polar = exports.Radar = exports.HorizontalBar = exports.Bar = exports.Line = exports.Pie = exports.Doughnut = exports.Bubble = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _chart = require('chart.js');

var _chart2 = _interopRequireDefault(_chart);

var _deepEqual = require('./utils/deepEqual');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartComponent = _react2.default.createClass({

	displayName: 'ChartComponent',

	propTypes: {
		data: _react.PropTypes.object.isRequired,
		height: _react.PropTypes.number,
		legend: _react.PropTypes.object,
		onElementsClick: _react.PropTypes.func,
		options: _react.PropTypes.object,
		redraw: _react.PropTypes.bool,
		type: _react.PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea', 'bubble']),
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
		return !(0, _deepEqual2.default)(compareNext, compareNow, { strict: true });
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
			this.chart_instance.options = _chart2.default.helpers.configMerge(this.chart_instance.options, options);
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

		var node = _reactDom2.default.findDOMNode(this);

		this.chart_instance = new _chart2.default(node, {
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


		return _react2.default.createElement('canvas', {
			height: height,
			width: width,
			onClick: typeof onElementsClick === 'function' ? this.handleOnClick : null
		});
	}
});

exports.default = ChartComponent;

var Doughnut = exports.Doughnut = function (_React$Component) {
	_inherits(Doughnut, _React$Component);

	function Doughnut() {
		_classCallCheck(this, Doughnut);

		return _possibleConstructorReturn(this, (Doughnut.__proto__ || Object.getPrototypeOf(Doughnut)).apply(this, arguments));
	}

	_createClass(Doughnut, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref) {
					return _this2.chart_instance = _ref && _ref.chart_instance;
				},
				type: 'doughnut'
			}));
		}
	}]);

	return Doughnut;
}(_react2.default.Component);

var Pie = exports.Pie = function (_React$Component2) {
	_inherits(Pie, _React$Component2);

	function Pie() {
		_classCallCheck(this, Pie);

		return _possibleConstructorReturn(this, (Pie.__proto__ || Object.getPrototypeOf(Pie)).apply(this, arguments));
	}

	_createClass(Pie, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref2) {
					return _this4.chart_instance = _ref2 && _ref2.chart_instance;
				},
				type: 'pie'
			}));
		}
	}]);

	return Pie;
}(_react2.default.Component);

var Line = exports.Line = function (_React$Component3) {
	_inherits(Line, _React$Component3);

	function Line() {
		_classCallCheck(this, Line);

		return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
	}

	_createClass(Line, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref3) {
					return _this6.chart_instance = _ref3 && _ref3.chart_instance;
				},
				type: 'line'
			}));
		}
	}]);

	return Line;
}(_react2.default.Component);

var Bar = exports.Bar = function (_React$Component4) {
	_inherits(Bar, _React$Component4);

	function Bar() {
		_classCallCheck(this, Bar);

		return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
	}

	_createClass(Bar, [{
		key: 'render',
		value: function render() {
			var _this8 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref4) {
					return _this8.chart_instance = _ref4 && _ref4.chart_instance;
				},
				type: 'bar'
			}));
		}
	}]);

	return Bar;
}(_react2.default.Component);

var HorizontalBar = exports.HorizontalBar = function (_React$Component5) {
	_inherits(HorizontalBar, _React$Component5);

	function HorizontalBar() {
		_classCallCheck(this, HorizontalBar);

		return _possibleConstructorReturn(this, (HorizontalBar.__proto__ || Object.getPrototypeOf(HorizontalBar)).apply(this, arguments));
	}

	_createClass(HorizontalBar, [{
		key: 'render',
		value: function render() {
			var _this10 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref5) {
					return _this10.chart_instance = _ref5 && _ref5.chart_instance;
				},
				type: 'horizontalBar'
			}));
		}
	}]);

	return HorizontalBar;
}(_react2.default.Component);

var Radar = exports.Radar = function (_React$Component6) {
	_inherits(Radar, _React$Component6);

	function Radar() {
		_classCallCheck(this, Radar);

		return _possibleConstructorReturn(this, (Radar.__proto__ || Object.getPrototypeOf(Radar)).apply(this, arguments));
	}

	_createClass(Radar, [{
		key: 'render',
		value: function render() {
			var _this12 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref6) {
					return _this12.chart_instance = _ref6 && _ref6.chart_instance;
				},
				type: 'radar'
			}));
		}
	}]);

	return Radar;
}(_react2.default.Component);

var Polar = exports.Polar = function (_React$Component7) {
	_inherits(Polar, _React$Component7);

	function Polar() {
		_classCallCheck(this, Polar);

		return _possibleConstructorReturn(this, (Polar.__proto__ || Object.getPrototypeOf(Polar)).apply(this, arguments));
	}

	_createClass(Polar, [{
		key: 'render',
		value: function render() {
			var _this14 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref7) {
					return _this14.chart_instance = _ref7 && _ref7.chart_instance;
				},
				type: 'polarArea'
			}));
		}
	}]);

	return Polar;
}(_react2.default.Component);

var Bubble = exports.Bubble = function (_React$Component8) {
	_inherits(Bubble, _React$Component8);

	function Bubble() {
		_classCallCheck(this, Bubble);

		return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).apply(this, arguments));
	}

	_createClass(Bubble, [{
		key: 'render',
		value: function render() {
			var _this16 = this;

			return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
				ref: function ref(_ref8) {
					return _this16.chart_instance = _ref8 && _ref8.chart_instance;
				},
				type: 'bubble'
			}));
		}
	}]);

	return Bubble;
}(_react2.default.Component);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils/deepEqual":2,"chart.js":undefined,"react-dom":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

	if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
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

exports.default = deepEqual;

},{}]},{},[1])(1)
});