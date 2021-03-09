"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var ChartJS = _interopRequireWildcard(require("chart.js"));

var _ClassNames = require("../utils/ClassNames");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Chart = /*#__PURE__*/function (_Component) {
  _inherits(Chart, _Component);

  var _super = _createSuper(Chart);

  function Chart() {
    _classCallCheck(this, Chart);

    return _super.apply(this, arguments);
  }

  _createClass(Chart, [{
    key: "initChart",
    value: function initChart() {
      this.chart = new ChartJS.Chart(this.canvas, {
        type: this.props.type,
        data: this.props.data,
        options: this.props.options
      });
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.canvas;
    }
  }, {
    key: "getBase64Image",
    value: function getBase64Image() {
      return this.chart.toBase64Image();
    }
  }, {
    key: "generateLegend",
    value: function generateLegend() {
      if (this.chart) {
        this.chart.generateLegend();
      }
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (this.chart) {
        this.chart.update();
      }
    }
  }, {
    key: "reinit",
    value: function reinit() {
      if (this.chart) {
        this.chart.destroy();
        this.initChart();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.data === this.props.data && nextProps.options === this.props.options && nextProps.type === this.props.type) {
        return false;
      }

      return true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initChart();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.reinit();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var className = (0, _ClassNames.classNames)('p-chart', this.props.className),
          style = Object.assign({
        width: this.props.width,
        height: this.props.height
      }, this.props.style);
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        style: style,
        className: className
      }, /*#__PURE__*/_react.default.createElement("canvas", {
        ref: function ref(el) {
          _this.canvas = el;
        },
        width: this.props.width,
        height: this.props.height
      }));
    }
  }]);

  return Chart;
}(_react.Component);

exports.Chart = Chart;

_defineProperty(Chart, "defaultProps", {
  id: null,
  type: null,
  data: null,
  options: null,
  width: null,
  height: null,
  style: null,
  className: null
});

_defineProperty(Chart, "propTypes", {
  id: _propTypes.default.string,
  type: _propTypes.default.string,
  data: _propTypes.default.object,
  options: _propTypes.default.object,
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string
});