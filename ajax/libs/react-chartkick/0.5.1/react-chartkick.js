/*!
 * React Chartkick
 * Create beautiful JavaScript charts with one line of React
 * https://github.com/ankane/react-chartkick
 * v0.5.1
 * MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('chartkick')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'chartkick'], factory) :
  (global = global || self, factory(global.ReactChartkick = {}, global.React, global.Chartkick));
}(this, (function (exports, React, Chartkick) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  Chartkick = Chartkick && Object.prototype.hasOwnProperty.call(Chartkick, 'default') ? Chartkick['default'] : Chartkick;

  function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

  var chartId = 1;

  var ChartComponent = /*@__PURE__*/(function (superclass) {
    function ChartComponent () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) ChartComponent.__proto__ = superclass;
    ChartComponent.prototype = Object.create( superclass && superclass.prototype );
    ChartComponent.prototype.constructor = ChartComponent;

    ChartComponent.prototype.newChartType = function newChartType (props) {
      var data = props.data;
      var options = {};
      for (var prop in props) {
        if (props.hasOwnProperty(prop) && prop !== "data" && prop !== "id" && prop !== "height" && prop !== "width") {
          options[prop] = props[prop];
        }
      }
      if (this.element) {
        if (this.chart) {
          this.chart.updateData(data, options);
        } else {
          this.chart = new props.chartType(this.element, data, options);
        }
      }
    };

    ChartComponent.prototype.componentDidMount = function componentDidMount () {
      this.newChartType(this.props);
    };

    ChartComponent.prototype.componentDidUpdate = function componentDidUpdate () {
      this.newChartType(this.props);
    };

    ChartComponent.prototype.render = function render () {
      var this$1 = this;

      var props = this.props;
      var style = {
        height: props.height || "300px",
        lineHeight: props.height || "300px",
        width: props.width || "100%",
        textAlign: "center",
        color: "#999",
        fontSize: "14px",
        fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
      };
      this.chartId = props.id || this.chartId || ("chart-" + chartId++);

      // check if undefined so works with empty string
      var loading = props.loading !== undefined ? props.loading : "Loading...";

      // createElement accepts React children,
      // but limit to string since it may be used by Chartkick.js
      if (typeof loading !== "string") {
        throw new Error("loading must be a string");
      }

      return (
        React.createElement("div", {id: this.chartId, style: style, ref: function (element) { return this$1.element = element; }},
          loading
        )
      )
    };

    return ChartComponent;
  }(React.Component));

  var createComponent = function (chartType) {
    var ChartkickComponent = function (ref) {
      var innerRef = ref.innerRef;
      var rest = objectWithoutProperties( ref, ["innerRef"] );
      var props = rest;

      // props cloned when split from innerRef, so we can modify directly
      props.chartType = chartType;
      props.ref = innerRef;
      return React.createElement(ChartComponent, props)
    };
    ChartkickComponent.displayName = chartType.name;
    return ChartkickComponent
  };

  var LineChart = createComponent(Chartkick.LineChart);
  var PieChart = createComponent(Chartkick.PieChart);
  var ColumnChart = createComponent(Chartkick.ColumnChart);
  var BarChart = createComponent(Chartkick.BarChart);
  var AreaChart = createComponent(Chartkick.AreaChart);
  var ScatterChart = createComponent(Chartkick.ScatterChart);
  var GeoChart = createComponent(Chartkick.GeoChart);
  var Timeline = createComponent(Chartkick.Timeline);

  exports.AreaChart = AreaChart;
  exports.BarChart = BarChart;
  exports.ColumnChart = ColumnChart;
  exports.GeoChart = GeoChart;
  exports.LineChart = LineChart;
  exports.PieChart = PieChart;
  exports.ScatterChart = ScatterChart;
  exports.Timeline = Timeline;
  exports.default = Chartkick;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
