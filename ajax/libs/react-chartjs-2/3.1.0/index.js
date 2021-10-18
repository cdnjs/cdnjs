'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Chart = require('chart.js/auto');
var chart_js = require('chart.js');
var merge = require('lodash/merge');
var assign = require('lodash/assign');
var find = require('lodash/find');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Chart__default = /*#__PURE__*/_interopDefaultLegacy(Chart);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var assign__default = /*#__PURE__*/_interopDefaultLegacy(assign);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);

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

var ChartComponent = /*#__PURE__*/ React.forwardRef(function(props, ref) {
    var id = props.id, className = props.className, _height = props.height, height = _height === void 0 ? 150 : _height, _width = props.width, width = _width === void 0 ? 300 : _width, _redraw = props.redraw, redraw = _redraw === void 0 ? false : _redraw, type = props.type, data = props.data, _options = props.options, options = _options === void 0 ? {
    } : _options, _plugins = props.plugins, plugins = _plugins === void 0 ? [] : _plugins, getDatasetAtEvent = props.getDatasetAtEvent, getElementAtEvent = props.getElementAtEvent, getElementsAtEvent = props.getElementsAtEvent, fallbackContent = props.fallbackContent, rest = _objectWithoutProperties(props, ["id", "className", "height", "width", "redraw", "type", "data", "options", "plugins", "getDatasetAtEvent", "getElementAtEvent", "getElementsAtEvent", "fallbackContent"]);
    var canvas = React.useRef(null);
    var computedData = React.useMemo(function() {
        if (typeof data === 'function') {
            return canvas.current ? data(canvas.current) : {
                datasets: []
            };
        } else return merge__default["default"]({
        }, data);
    }, [
        data,
        canvas.current
    ]);
    var ref1 = _slicedToArray(React.useState()), chart = ref1[0], setChart = ref1[1];
    React.useImperativeHandle(ref, function() {
        return chart;
    }, [
        chart, 
    ]);
    var renderChart = function() {
        if (!canvas.current) return;
        setChart(new Chart__default["default"](canvas.current, {
            type: type,
            data: computedData,
            options: options,
            plugins: plugins
        }));
    };
    var onClick = function(e) {
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
    var updateChart = function() {
        if (!chart) return;
        if (options) {
            chart.options = _objectSpread({
            }, options);
        }
        if (!chart.config.data) {
            chart.config.data = computedData;
            chart.update();
            return;
        }
        var tmp = computedData.datasets, newDataSets = tmp === void 0 ? [] : tmp, newChartData = _objectWithoutProperties(computedData, [
            "datasets"
        ]);
        var _data = chart.config.data, tmp1 = _data.datasets, currentDataSets = tmp1 === void 0 ? [] : tmp1;
        // copy values
        assign__default["default"](chart.config.data, newChartData);
        chart.config.data.datasets = newDataSets.map(function(newDataSet) {
            // given the new set, find it's current match
            var currentDataSet = find__default["default"](currentDataSets, function(d) {
                return d.label === newDataSet.label && d.type === newDataSet.type;
            });
            // There is no original to update, so simply add new one
            if (!currentDataSet || !newDataSet.data) return _objectSpread({
            }, newDataSet);
            if (!currentDataSet.data) {
                currentDataSet.data = [];
            } else {
                currentDataSet.data.length = newDataSet.data.length;
            }
            // copy in values
            assign__default["default"](currentDataSet.data, newDataSet.data);
            // apply dataset changes, but keep copied data
            assign__default["default"](currentDataSet, _objectSpread({
            }, newDataSet, {
                data: currentDataSet.data
            }));
            return currentDataSet;
        });
        chart.update();
    };
    var destroyChart = function() {
        if (chart) chart.destroy();
    };
    React.useEffect(function() {
        renderChart();
        return function() {
            return destroyChart();
        };
    }, []);
    React.useEffect(function() {
        if (redraw) {
            destroyChart();
            setTimeout(function() {
                renderChart();
            }, 0);
        } else {
            updateChart();
        }
    }, [
        props,
        computedData
    ]);
    return(/*#__PURE__*/ React__default["default"].createElement("canvas", Object.assign({
    }, rest, {
        height: height,
        width: width,
        ref: canvas,
        id: id,
        className: className,
        onClick: onClick,
        "data-testid": "canvas",
        role: "img"
    }), fallbackContent));
});

var Line = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "line",
        ref: ref,
        options: props.options || {
        }
    }));
});
var Bar = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "bar",
        ref: ref,
        options: props.options || {
        }
    }));
});
var Radar = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "radar",
        ref: ref,
        options: props.options || {
        }
    }));
});
var Doughnut = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "doughnut",
        ref: ref,
        options: props.options || {
        }
    }));
});
var PolarArea = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "polarArea",
        ref: ref,
        options: props.options || {
        }
    }));
});
var Bubble = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "bubble",
        ref: ref,
        options: props.options || {
        }
    }));
});
var Pie = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "pie",
        ref: ref,
        options: props.options || {
        }
    }));
});
var Scatter = /*#__PURE__*/ React.forwardRef(function(props, ref) {
     return React__default["default"].createElement(ChartComponent, Object.assign({
    }, props, {
        type: "scatter",
        ref: ref,
        options: props.options || {
        }
    }));
});

Object.defineProperty(exports, 'Chart', {
  enumerable: true,
  get: function () { return Chart__default["default"]; }
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
exports["default"] = ChartComponent;
//# sourceMappingURL=index.js.map
