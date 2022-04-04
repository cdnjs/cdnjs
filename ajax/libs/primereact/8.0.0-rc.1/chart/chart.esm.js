import * as React from 'react';
import { useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, classNames } from 'primereact/utils';

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

var Chart = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var chartRef = React.useRef(null);
  var canvasRef = React.useRef(null);

  var initChart = function initChart() {
    import('chart.js/auto').then(function (module) {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      if (module && module["default"]) {
        chartRef.current = new module["default"](canvasRef.current, {
          type: props.type,
          data: props.data,
          options: props.options,
          plugins: props.plugins
        });
      }
    });
  };

  React.useImperativeHandle(ref, function () {
    return {
      getCanvas: function getCanvas() {
        return canvasRef.current;
      },
      getChart: function getChart() {
        return chartRef.current;
      },
      getBase64Image: function getBase64Image() {
        return chartRef.current.toBase64Image();
      },
      generateLegend: function generateLegend() {
        return chartRef.current && chartRef.current.generateLegend();
      },
      refresh: function refresh() {
        return chartRef.current && chartRef.current.update();
      }
    };
  });
  React.useEffect(function () {
    initChart();
  });
  useUnmountEffect(function () {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  });
  var otherProps = ObjectUtils.findDiffKeys(props, Chart.defaultProps);
  var className = classNames('p-chart', props.className);
  var style = Object.assign({
    width: props.width,
    height: props.height
  }, props.style);
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    style: style,
    className: className
  }, otherProps), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: props.width,
    height: props.height
  }));
}), function (prevProps, nextProps) {
  return prevProps.data === nextProps.data && prevProps.options === nextProps.options && prevProps.type === nextProps.type;
});
Chart.displayName = 'Chart';
Chart.defaultProps = {
  __TYPE: 'Chart',
  id: null,
  type: null,
  data: null,
  options: null,
  plugins: null,
  width: null,
  height: null,
  style: null,
  className: null
};

export { Chart };
