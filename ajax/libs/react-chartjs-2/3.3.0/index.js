'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ChartJS = require('chart.js/auto');
var chart_js = require('chart.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChartJS__default = /*#__PURE__*/_interopDefaultLegacy(ChartJS);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _objectSpread(target) {
    var _arguments = arguments, _loop = function(i) {
        var source = _arguments[i] != null ? _arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    };
    for(var i = 1; i < arguments.length; i++)_loop(i);
    return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

function _objectWithoutProperties(source, excluded) {
    if (source == null) return {
    };
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function reforwardRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}
function setOptions(chart, nextOptions) {
    chart.options = _objectSpread({
    }, nextOptions);
}
function setLabels(currentData, nextLabels) {
    currentData.labels = nextLabels;
}
function setDatasets(currentData, nextDatasets) {
    currentData.datasets = nextDatasets.map(function(nextDataset) {
        // given the new set, find it's current match
        var currentDataset = currentData.datasets.find(function(dataset) {
            return dataset.label === nextDataset.label && dataset.type === nextDataset.type;
        });
        // There is no original to update, so simply add new one
        if (!currentDataset || !nextDataset.data) return _objectSpread({
        }, nextDataset);
        Object.assign(currentDataset, nextDataset);
        return currentDataset;
    });
}
function cloneData(data) {
    var nextData = {
        labels: [],
        datasets: []
    };
    setLabels(nextData, data.labels);
    setDatasets(nextData, data.datasets);
    return nextData;
}

var noopData = {
    datasets: []
};
function ChartComponent(_param, ref) {
    var _height = _param.height, height = _height === void 0 ? 150 : _height, _width = _param.width, width = _width === void 0 ? 300 : _width, _redraw = _param.redraw, redraw = _redraw === void 0 ? false : _redraw, type = _param.type, dataProp = _param.data, options = _param.options, _plugins = _param.plugins, plugins = _plugins === void 0 ? [] : _plugins, getDatasetAtEvent = _param.getDatasetAtEvent, getElementAtEvent = _param.getElementAtEvent, getElementsAtEvent = _param.getElementsAtEvent, fallbackContent = _param.fallbackContent, onClickProp = _param.onClick, props = _objectWithoutProperties(_param, [
        "height",
        "width",
        "redraw",
        "type",
        "data",
        "options",
        "plugins",
        "getDatasetAtEvent",
        "getElementAtEvent",
        "getElementsAtEvent",
        "fallbackContent",
        "onClick"
    ]);
    var canvasRef = React.useRef(null);
    var chartRef = React.useRef();
    /**
   * In case `dataProp` is function use internal state
   */ var ref1 = _slicedToArray(React.useState()), computedData = ref1[0], setComputedData = ref1[1];
    var data = computedData || (typeof dataProp === 'function' ? noopData : dataProp);
    var renderChart = function() {
        if (!canvasRef.current) return;
        chartRef.current = new ChartJS__default["default"](canvasRef.current, {
            type: type,
            data: cloneData(data),
            options: options,
            plugins: plugins
        });
        reforwardRef(ref, chartRef.current);
    };
    var destroyChart = function() {
        reforwardRef(ref, null);
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };
    var onClick = function(event) {
        if (onClickProp) {
            onClickProp(event);
        }
        var chart = chartRef.current;
        if (!chart) return;
        getDatasetAtEvent && getDatasetAtEvent(chart.getElementsAtEventForMode(event.nativeEvent, 'dataset', {
            intersect: true
        }, false), event);
        getElementAtEvent && getElementAtEvent(chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', {
            intersect: true
        }, false), event);
        getElementsAtEvent && getElementsAtEvent(chart.getElementsAtEventForMode(event.nativeEvent, 'index', {
            intersect: true
        }, false), event);
    };
    /**
   * In case `dataProp` is function,
   * then update internal state
   */ React.useEffect(function() {
        if (typeof dataProp === 'function' && canvasRef.current) {
            setComputedData(dataProp(canvasRef.current));
        }
    }, [
        dataProp
    ]);
    React.useEffect(function() {
        if (!redraw && chartRef.current && options) {
            setOptions(chartRef.current, options);
        }
    }, [
        redraw,
        options
    ]);
    React.useEffect(function() {
        if (!redraw && chartRef.current) {
            setLabels(chartRef.current.config.data, data.labels);
        }
    }, [
        redraw,
        data.labels
    ]);
    React.useEffect(function() {
        if (!redraw && chartRef.current && data.datasets) {
            setDatasets(chartRef.current.config.data, data.datasets);
        }
    }, [
        redraw,
        data.datasets
    ]);
    React.useEffect(function() {
        if (!chartRef.current) return;
        if (redraw) {
            destroyChart();
            setTimeout(renderChart);
        } else {
            chartRef.current.update();
        }
    }, [
        redraw,
        options,
        data.labels,
        data.datasets
    ]);
    React.useEffect(function() {
        renderChart();
        return function() {
            return destroyChart();
        };
    }, []);
    return(/*#__PURE__*/ React__default["default"].createElement("canvas", Object.assign({
        ref: canvasRef,
        role: "img",
        height: height,
        width: width,
        onClick: onClick
    }, props), fallbackContent));
}
var Chart = /*#__PURE__*/ React.forwardRef(ChartComponent);

function createTypedChart(type) {
    return(/*#__PURE__*/ React.forwardRef(function(props, ref) {
         return React__default["default"].createElement(Chart, Object.assign({
        }, props, {
            ref: ref,
            type: type
        }));
    }));
}
var Line = createTypedChart('line');
var Bar = createTypedChart('bar');
var Radar = createTypedChart('radar');
var Doughnut = createTypedChart('doughnut');
var PolarArea = createTypedChart('polarArea');
var Bubble = createTypedChart('bubble');
var Pie = createTypedChart('pie');
var Scatter = createTypedChart('scatter');

Object.defineProperty(exports, 'Chart', {
  enumerable: true,
  get: function () { return ChartJS__default["default"]; }
});
Object.defineProperty(exports, 'defaults', {
  enumerable: true,
  get: function () { return chart_js.defaults; }
});
exports.Bar = Bar;
exports.Bubble = Bubble;
exports.Doughnut = Doughnut;
exports.Line = Line;
exports.Pie = Pie;
exports.PolarArea = PolarArea;
exports.Radar = Radar;
exports.Scatter = Scatter;
exports["default"] = Chart;
//# sourceMappingURL=index.js.map
