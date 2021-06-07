import React, { forwardRef, useRef, useMemo, useState, useImperativeHandle, useEffect } from 'react';
import Chart$1 from 'chart.js/auto';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import find from 'lodash/find';
import { defaults as defaults$1, Chart as Chart$2 } from 'chart.js';

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

var ChartComponent = forwardRef(function (props, ref) {
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
      plugins = _props$plugins === void 0 ? [] : _props$plugins,
      getDatasetAtEvent = props.getDatasetAtEvent,
      getElementAtEvent = props.getElementAtEvent,
      getElementsAtEvent = props.getElementsAtEvent,
      fallbackContent = props.fallbackContent,
      rest = _objectWithoutPropertiesLoose(props, ["id", "className", "height", "width", "redraw", "type", "data", "options", "plugins", "getDatasetAtEvent", "getElementAtEvent", "getElementsAtEvent", "fallbackContent"]);

  var canvas = useRef(null);
  var computedData = useMemo(function () {
    if (typeof data === 'function') {
      return canvas.current ? data(canvas.current) : {};
    } else return merge({}, data);
  }, [data, canvas.current]);

  var _useState = useState(),
      chart = _useState[0],
      setChart = _useState[1];

  useImperativeHandle(ref, function () {
    return chart;
  }, [chart]);

  var renderChart = function renderChart() {
    if (!canvas.current) return;
    setChart(new Chart$1(canvas.current, {
      type: type,
      data: computedData,
      options: options,
      plugins: plugins
    }));
  };

  var onClick = function onClick(e) {
    if (!chart) return;
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

  useEffect(function () {
    renderChart();
    return function () {
      return destroyChart();
    };
  }, []);
  useEffect(function () {
    if (redraw) {
      destroyChart();
      setTimeout(function () {
        renderChart();
      }, 0);
    } else {
      updateChart();
    }
  }, [props, computedData]);
  return React.createElement("canvas", Object.assign({}, rest, {
    height: height,
    width: width,
    ref: canvas,
    id: id,
    className: className,
    onClick: onClick,
    "data-testid": 'canvas',
    role: 'img'
  }), fallbackContent);
});

var Line = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'line',
    ref: ref,
    options: props.options || {}
  }));
});
var Bar = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'bar',
    ref: ref,
    options: props.options || {}
  }));
});
var Radar = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'radar',
    ref: ref,
    options: props.options || {}
  }));
});
var Doughnut = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'doughnut',
    ref: ref,
    options: props.options || {}
  }));
});
var PolarArea = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'polarArea',
    ref: ref,
    options: props.options || {}
  }));
});
var Bubble = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'bubble',
    ref: ref,
    options: props.options || {}
  }));
});
var Pie = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'pie',
    ref: ref,
    options: props.options || {}
  }));
});
var Scatter = forwardRef(function (props, ref) {
  return React.createElement(ChartComponent, Object.assign({}, props, {
    type: 'scatter',
    ref: ref,
    options: props.options || {}
  }));
});
var defaults = defaults$1;
var Chart = Chart$2;

export default ChartComponent;
export { Bar, Bubble, Chart, Doughnut, Line, Pie, PolarArea, Radar, Scatter, defaults };
//# sourceMappingURL=index.modern.js.map
