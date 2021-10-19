import ChartJS from 'chart.js/auto';
export { default as Chart } from 'chart.js/auto';
export { defaults } from 'chart.js';
import React, { forwardRef, useRef, useMemo, useState, useImperativeHandle, useEffect } from 'react';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import find from 'lodash/find';

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

function ChartComponent(_param, ref) {
    var _height = _param.height, height = _height === void 0 ? 150 : _height, _width = _param.width, width = _width === void 0 ? 300 : _width, _redraw = _param.redraw, redraw = _redraw === void 0 ? false : _redraw, type = _param.type, data = _param.data, options = _param.options, _plugins = _param.plugins, plugins = _plugins === void 0 ? [] : _plugins, getDatasetAtEvent = _param.getDatasetAtEvent, getElementAtEvent = _param.getElementAtEvent, getElementsAtEvent = _param.getElementsAtEvent, fallbackContent = _param.fallbackContent, onClickProp = _param.onClick, props = _objectWithoutProperties(_param, ["height", "width", "redraw", "type", "data", "options", "plugins", "getDatasetAtEvent", "getElementAtEvent", "getElementsAtEvent", "fallbackContent", "onClick"
    ]);
    var canvas = useRef(null);
    var computedData = useMemo(function() {
        if (typeof data === 'function') {
            return canvas.current ? data(canvas.current) : {
                datasets: []
            };
        } else return merge({
        }, data);
    }, [
        data,
        canvas.current
    ]);
    var ref1 = _slicedToArray(useState()), chart = ref1[0], setChart = ref1[1];
    useImperativeHandle(ref, function() {
        return chart;
    }, [
        chart
    ]);
    var renderChart = function() {
        if (!canvas.current) return;
        setChart(new ChartJS(canvas.current, {
            type: type,
            data: computedData,
            options: options,
            plugins: plugins
        }));
    };
    var onClick = function(event) {
        if (onClickProp) {
            onClickProp(event);
        }
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
        assign(chart.config.data, newChartData);
        chart.config.data.datasets = newDataSets.map(function(newDataSet) {
            // given the new set, find it's current match
            var currentDataSet = find(currentDataSets, function(d) {
                return d.label === newDataSet.label && d.type === newDataSet.type;
            });
            // There is no original to update, so simply add new one
            if (!currentDataSet || !newDataSet.data) return _objectSpread({
            }, newDataSet);
            if (!currentDataSet.data) {
                // @ts-expect-error Need to refactor
                currentDataSet.data = [];
            } else {
                // @ts-expect-error Need to refactor
                currentDataSet.data.length = newDataSet.data.length;
            }
            // copy in values
            assign(currentDataSet.data, newDataSet.data);
            // apply dataset changes, but keep copied data
            assign(currentDataSet, _objectSpread({
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
    useEffect(function() {
        renderChart();
        return function() {
            return destroyChart();
        };
    }, []);
    useEffect(function() {
        if (redraw) {
            destroyChart();
            setTimeout(function() {
                renderChart();
            }, 0);
        } else {
            updateChart();
        }
    });
    return(/*#__PURE__*/ React.createElement("canvas", Object.assign({
        ref: canvas,
        role: "img",
        height: height,
        width: width,
        onClick: onClick
    }, props), fallbackContent));
}
var Chart = /*#__PURE__*/ forwardRef(ChartComponent);

function createTypedChart(type) {
    return(/*#__PURE__*/ forwardRef(function(props, ref) {
         return React.createElement(Chart, Object.assign({
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

export { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter, Chart as default };
//# sourceMappingURL=index.modern.js.map
