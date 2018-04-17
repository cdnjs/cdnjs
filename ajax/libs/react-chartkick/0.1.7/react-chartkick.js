/*
 * React Chartkick
 * Create beautiful JavaScript charts with one line of React
 * https://github.com/ankane/react-chartkick
 * v0.1.7
 * MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('chartkick')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'chartkick'], factory) :
  (factory((global.ReactChartkick = {}),global.React,global.Chartkick));
}(this, (function (exports,React,Chartkick) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  Chartkick = Chartkick && Chartkick.hasOwnProperty('default') ? Chartkick['default'] : Chartkick;

  var chartId = 1;

  var ChartComponent = (function (superclass) {
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
        new props.chartType(this.element, data, options);
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
      return (
        React.createElement("div", {id: this.chartId, style: style, ref: function (element) { return this$1.element = element; }},
          "Loading..."
        )
      )
    };

    return ChartComponent;
  }(React.Component));

  var createComponent = function (chartType) {
    return function (props) {
      return React.createElement(ChartComponent, Object.assign({}, props, {chartType: chartType}))
    }
  };

  var LineChart = createComponent(Chartkick.LineChart);
  var PieChart = createComponent(Chartkick.PieChart);
  var ColumnChart = createComponent(Chartkick.ColumnChart);
  var BarChart = createComponent(Chartkick.BarChart);
  var AreaChart = createComponent(Chartkick.AreaChart);
  var ScatterChart = createComponent(Chartkick.ScatterChart);
  var GeoChart = createComponent(Chartkick.GeoChart);
  var Timeline = createComponent(Chartkick.Timeline);

  exports.LineChart = LineChart;
  exports.PieChart = PieChart;
  exports.ColumnChart = ColumnChart;
  exports.BarChart = BarChart;
  exports.AreaChart = AreaChart;
  exports.ScatterChart = ScatterChart;
  exports.GeoChart = GeoChart;
  exports.Timeline = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
