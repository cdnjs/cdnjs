(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('chart.js/auto'), require('lodash/merge'), require('lodash/assign'), require('lodash/find')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'chart.js/auto', 'lodash/merge', 'lodash/assign', 'lodash/find'], factory) :
  (global = global || self, factory(global.reactChartjs2 = {}, global.react, global.Chart, global.merge, global.assign, global.find));
}(this, (function (exports, React, Chart, merge, assign, find) {
  var React__default = 'default' in React ? React['default'] : React;
  Chart = Chart && Object.prototype.hasOwnProperty.call(Chart, 'default') ? Chart['default'] : Chart;
  merge = merge && Object.prototype.hasOwnProperty.call(merge, 'default') ? merge['default'] : merge;
  assign = assign && Object.prototype.hasOwnProperty.call(assign, 'default') ? assign['default'] : assign;
  find = find && Object.prototype.hasOwnProperty.call(find, 'default') ? find['default'] : find;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var ChartComponent = React.forwardRef(function (props, ref) {
    var id = props.id,
        className = props.className,
        _props$height = props.height,
        height = _props$height === void 0 ? 150 : _props$height,
        _props$width = props.width,
        width = _props$width === void 0 ? 300 : _props$width,
        _props$redraw = props.redraw,
        redraw = _props$redraw === void 0 ? false : _props$redraw,
        type = props.type,
        data = props.data,
        _props$options = props.options,
        options = _props$options === void 0 ? {} : _props$options,
        _props$plugins = props.plugins,
        plugins = _props$plugins === void 0 ? [] : _props$plugins;
    var canvas = React.useRef(null);
    var computedData = React.useMemo(function () {
      if (typeof data === 'function') {
        return canvas.current ? data(canvas.current) : {};
      } else return merge({}, data);
    }, [data, canvas.current]);

    var _useState = React.useState(),
        chart = _useState[0],
        setChart = _useState[1];

    React.useImperativeHandle(ref, function () {
      return chart;
    }, [chart]);

    var renderChart = function renderChart() {
      if (!canvas.current) return;
      setChart(new Chart(canvas.current, {
        type: type,
        data: computedData,
        options: options,
        plugins: plugins
      }));
    };

    var onClick = function onClick(e) {
      if (!chart) return;
      var getDatasetAtEvent = props.getDatasetAtEvent,
          getElementAtEvent = props.getElementAtEvent,
          getElementsAtEvent = props.getElementsAtEvent;
      getDatasetAtEvent && getDatasetAtEvent(chart.getElementsAtEventForMode(e, 'dataset', {
        intersect: true
      }, false), e);
      getElementAtEvent && getElementAtEvent(chart.getElementsAtEventForMode(e, 'nearest', {
        intersect: true
      }, false), e);
      getElementsAtEvent && getElementsAtEvent(chart.getElementsAtEventForMode(e, 'index', {
        intersect: true
      }, false), e);
    };

    var updateChart = function updateChart() {
      if (!chart) return;

      if (options) {
        chart.options = _extends({}, options);
      }

      if (!chart.config.data) {
        chart.config.data = computedData;
        chart.update();
        return;
      }

      var _computedData$dataset = computedData.datasets,
          newDataSets = _computedData$dataset === void 0 ? [] : _computedData$dataset,
          newChartData = _objectWithoutPropertiesLoose(computedData, ["datasets"]);

      var _chart$config$data$da = chart.config.data.datasets,
          currentDataSets = _chart$config$data$da === void 0 ? [] : _chart$config$data$da;
      assign(chart.config.data, newChartData);
      chart.config.data.datasets = newDataSets.map(function (newDataSet) {
        var currentDataSet = find(currentDataSets, function (d) {
          return d.label === newDataSet.label && d.type === newDataSet.type;
        });
        if (!currentDataSet || !newDataSet.data) return newDataSet;

        if (!currentDataSet.data) {
          currentDataSet.data = [];
        } else {
          currentDataSet.data.length = newDataSet.data.length;
        }

        assign(currentDataSet.data, newDataSet.data);
        return _extends({}, currentDataSet, newDataSet, {
          data: currentDataSet.data
        });
      });
      chart.update();
    };

    var destroyChart = function destroyChart() {
      if (chart) chart.destroy();
    };

    React.useEffect(function () {
      renderChart();
      return function () {
        return destroyChart();
      };
    }, []);
    React.useEffect(function () {
      if (redraw) {
        destroyChart();
        setTimeout(function () {
          renderChart();
        }, 0);
      } else {
        updateChart();
      }
    }, [props, computedData]);
    return React__default.createElement("canvas", {
      height: height,
      width: width,
      ref: canvas,
      id: id,
      className: className,
      onClick: onClick,
      "data-testid": 'canvas'
    });
  });

  var Line = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'line',
      ref: ref,
      options: props.options || {}
    }));
  });
  var Bar = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'bar',
      ref: ref,
      options: props.options || {}
    }));
  });
  var Radar = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'radar',
      ref: ref,
      options: props.options || {}
    }));
  });
  var Doughnut = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'doughnut',
      ref: ref,
      options: props.options || {}
    }));
  });
  var PolarArea = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'polarArea',
      ref: ref,
      options: props.options || {}
    }));
  });
  var Bubble = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'bubble',
      ref: ref,
      options: props.options || {}
    }));
  });
  var Pie = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'pie',
      ref: ref,
      options: props.options || {}
    }));
  });
  var Scatter = React.forwardRef(function (props, ref) {
    return React__default.createElement(ChartComponent, Object.assign({}, props, {
      type: 'scatter',
      ref: ref,
      options: props.options || {}
    }));
  });
  var index = {
    ChartComponent: ChartComponent,
    Chart: Chart
  };

  exports.Bar = Bar;
  exports.Bubble = Bubble;
  exports.Doughnut = Doughnut;
  exports.Line = Line;
  exports.Pie = Pie;
  exports.PolarArea = PolarArea;
  exports.Radar = Radar;
  exports.Scatter = Scatter;
  exports.default = index;

})));
