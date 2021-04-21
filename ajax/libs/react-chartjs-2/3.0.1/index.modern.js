import React, { forwardRef, useRef, useMemo, useState, useImperativeHandle, useEffect } from 'react';
import Chart$1 from 'chart.js/auto';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import find from 'lodash/find';
import * as chartjs from 'chart.js';
import { defaults as defaults$1 } from 'chart.js';

const ChartComponent = forwardRef((props, ref) => {
  const {
    id,
    className,
    height = 150,
    width = 300,
    redraw = false,
    type,
    data,
    options = {},
    plugins = []
  } = props;
  const canvas = useRef(null);
  const computedData = useMemo(() => {
    if (typeof data === 'function') {
      return canvas.current ? data(canvas.current) : {};
    } else return merge({}, data);
  }, [data, canvas.current]);
  const [chart, setChart] = useState();
  useImperativeHandle(ref, () => chart, [chart]);

  const renderChart = () => {
    if (!canvas.current) return;
    setChart(new Chart$1(canvas.current, {
      type,
      data: computedData,
      options,
      plugins
    }));
  };

  const onClick = e => {
    if (!chart) return;
    const {
      getDatasetAtEvent,
      getElementAtEvent,
      getElementsAtEvent
    } = props;
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

  const updateChart = () => {
    if (!chart) return;

    if (options) {
      chart.options = { ...options
      };
    }

    if (!chart.config.data) {
      chart.config.data = computedData;
      chart.update();
      return;
    }

    const {
      datasets: newDataSets = [],
      ...newChartData
    } = computedData;
    const {
      datasets: currentDataSets = []
    } = chart.config.data;
    assign(chart.config.data, newChartData);
    chart.config.data.datasets = newDataSets.map(newDataSet => {
      const currentDataSet = find(currentDataSets, d => d.label === newDataSet.label && d.type === newDataSet.type);
      if (!currentDataSet || !newDataSet.data) return newDataSet;

      if (!currentDataSet.data) {
        currentDataSet.data = [];
      } else {
        currentDataSet.data.length = newDataSet.data.length;
      }

      assign(currentDataSet.data, newDataSet.data);
      return { ...currentDataSet,
        ...newDataSet,
        data: currentDataSet.data
      };
    });
    chart.update();
  };

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  useEffect(() => {
    renderChart();
    return () => destroyChart();
  }, []);
  useEffect(() => {
    if (redraw) {
      destroyChart();
      setTimeout(() => {
        renderChart();
      }, 0);
    } else {
      updateChart();
    }
  }, [props, computedData]);
  return React.createElement("canvas", {
    height: height,
    width: width,
    ref: canvas,
    id: id,
    className: className,
    onClick: onClick,
    "data-testid": 'canvas'
  });
});

const Line = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'line',
  ref: ref,
  options: props.options || {}
})));
const Bar = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'bar',
  ref: ref,
  options: props.options || {}
})));
const Radar = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'radar',
  ref: ref,
  options: props.options || {}
})));
const Doughnut = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'doughnut',
  ref: ref,
  options: props.options || {}
})));
const PolarArea = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'polarArea',
  ref: ref,
  options: props.options || {}
})));
const Bubble = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'bubble',
  ref: ref,
  options: props.options || {}
})));
const Pie = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'pie',
  ref: ref,
  options: props.options || {}
})));
const Scatter = forwardRef((props, ref) => React.createElement(ChartComponent, Object.assign({}, props, {
  type: 'scatter',
  ref: ref,
  options: props.options || {}
})));
const defaults = defaults$1;
const Chart = chartjs;

export default ChartComponent;
export { Bar, Bubble, Chart, Doughnut, Line, Pie, PolarArea, Radar, Scatter, defaults };
//# sourceMappingURL=index.modern.js.map
