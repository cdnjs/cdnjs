this.primereact = this.primereact || {};
this.primereact.chart = (function (exports, React, hooks, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

  var ChartJS = function () {
    try {
      return Chart;
    } catch (_unused) {
      return null;
    }
  }();

  var PrimeReactChart = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var chartRef = React__namespace.useRef(null);
    var canvasRef = React__namespace.useRef(null);

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

    React__namespace.useImperativeHandle(ref, function () {
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
    React__namespace.useEffect(function () {
      initChart();
    });
    hooks.useUnmountEffect(function () {
      destroyChart();
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, PrimeReactChart.defaultProps);
    var className = utils.classNames('p-chart', props.className);
    var style = Object.assign({
      width: props.width,
      height: props.height
    }, props.style);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      style: style,
      className: className
    }, otherProps), /*#__PURE__*/React__namespace.createElement("canvas", {
      ref: canvasRef,
      width: props.width,
      height: props.height
    }));
  }), function (prevProps, nextProps) {
    return prevProps.data === nextProps.data && prevProps.options === nextProps.options && prevProps.type === nextProps.type;
  });
  PrimeReactChart.displayName = 'Chart';
  PrimeReactChart.defaultProps = {
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

  exports.Chart = PrimeReactChart;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.utils);
