'use client';
import * as React from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useMergeProps, useUnmountEffect } from 'primereact/hooks';
import { classNames } from 'primereact/utils';

var ChartBase = ComponentBase.extend({
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
  css: {
    classes: {
      root: 'p-chart'
    },
    inlineStyles: {
      root: function root(_ref) {
        var props = _ref.props;
        return Object.assign({
          width: props.width,
          height: props.height
        }, props.style);
      }
    },
    styles: "\n        @layer primereact {\n            .p-chart {\n                position: relative\n            }\n        }\n        "
  }
});

// GitHub #3059 wrapper if loaded by script tag
var ChartJS = function () {
  try {
    return Chart;
  } catch (_unused) {
    return null;
  }
}();
var PrimeReactChart = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ChartBase.getProps(inProps, context);
  var _ChartBase$setMetaDat = ChartBase.setMetaData({
      props: props
    }),
    ptm = _ChartBase$setMetaDat.ptm,
    cx = _ChartBase$setMetaDat.cx,
    sx = _ChartBase$setMetaDat.sx,
    isUnstyled = _ChartBase$setMetaDat.isUnstyled;
  useHandleStyle(ChartBase.css.styles, isUnstyled, {
    name: 'chart'
  });
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
  var title = props.options && props.options.plugins && props.options.plugins.title && props.options.plugins.title.text;
  var ariaLabel = props.ariaLabel || title;
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    style: sx('root'),
    className: classNames(props.className, cx('root'))
  }, ChartBase.getOtherProps(props), ptm('root'));
  var canvasProps = mergeProps({
    ref: canvasRef,
    width: props.width,
    height: props.height,
    role: 'img',
    'aria-label': ariaLabel
  }, ptm('canvas'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("canvas", canvasProps));
}), function (prevProps, nextProps) {
  return prevProps.data === nextProps.data && prevProps.options === nextProps.options && prevProps.type === nextProps.type;
});
PrimeReactChart.displayName = 'Chart';

export { PrimeReactChart as Chart };
