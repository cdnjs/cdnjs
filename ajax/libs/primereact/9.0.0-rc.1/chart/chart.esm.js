import * as React from 'react';
import { useUnmountEffect } from 'primereact/hooks';
import { ObjectUtils, classNames } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

var ChartBase = {
  defaultProps: {
    __TYPE: 'Chart',
    id: null,
    type: null,
    data: null,
    options: null,
    plugins: null,
    width: null,
    height: null,
    style: null,
    className: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, ChartBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, ChartBase.defaultProps);
  }
};

// GitHub #3059 wrapper if loaded by script tag
var ChartJS = function () {
  try {
    return Chart;
  } catch (_unused) {
    return null;
  }
}();
var PrimeReactChart = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = ChartBase.getProps(inProps);
  var elementRef = React.useRef(null);
  var chartRef = React.useRef(null);
  var canvasRef = React.useRef(null);
  var initChart = function initChart() {
    destroyChart();
    var configuration = {
      type: props.type,
      data: props.data,
      options: props.options,
      plugins: props.plugins
    };
    if (ChartJS) {
      // GitHub #3059 loaded by script only
      chartRef.current = new ChartJS(canvasRef.current, configuration);
    } else {
      import('chart.js/auto').then(function (module) {
        destroyChart();

        // In case that the Chart component has been unmounted during asynchronous loading of ChartJS,
        // the canvasRef will not be available anymore, and no Chart should be created.
        if (!canvasRef.current) {
          return;
        }
        if (module) {
          if (module["default"]) {
            // WebPack
            chartRef.current = new module["default"](canvasRef.current, configuration);
          } else {
            // ParcelJS
            chartRef.current = new module(canvasRef.current, configuration);
          }
        }
      });
    }
  };
  var destroyChart = function destroyChart() {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getCanvas: function getCanvas() {
        return canvasRef.current;
      },
      getChart: function getChart() {
        return chartRef.current;
      },
      getBase64Image: function getBase64Image() {
        return chartRef.current.toBase64Image();
      },
      getElement: function getElement() {
        return elementRef.current;
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
    destroyChart();
  });
  var otherProps = ChartBase.getOtherProps(props);
  var className = classNames('p-chart', props.className);
  var style = Object.assign({
    width: props.width,
    height: props.height
  }, props.style);
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
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
PrimeReactChart.displayName = 'Chart';

export { PrimeReactChart as Chart };
