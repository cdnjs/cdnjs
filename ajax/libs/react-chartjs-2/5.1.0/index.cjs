'use strict';

var React = require('react');
var chart_js = require('chart.js');

const defaultDatasetIdKey = "label";
function reforwardRef(ref, value) {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}
function setOptions(chart, nextOptions) {
    const options = chart.options;
    if (options && nextOptions) {
        Object.assign(options, nextOptions);
    }
}
function setLabels(currentData, nextLabels) {
    currentData.labels = nextLabels;
}
function setDatasets(currentData, nextDatasets) {
    let datasetIdKey = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultDatasetIdKey;
    const addedDatasets = [];
    currentData.datasets = nextDatasets.map((nextDataset)=>{
        // given the new set, find it's current match
        const currentDataset = currentData.datasets.find((dataset)=>dataset[datasetIdKey] === nextDataset[datasetIdKey]);
        // There is no original to update, so simply add new one
        if (!currentDataset || !nextDataset.data || addedDatasets.includes(currentDataset)) {
            return {
                ...nextDataset
            };
        }
        addedDatasets.push(currentDataset);
        Object.assign(currentDataset, nextDataset);
        return currentDataset;
    });
}
function cloneData(data) {
    let datasetIdKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultDatasetIdKey;
    const nextData = {
        labels: [],
        datasets: []
    };
    setLabels(nextData, data.labels);
    setDatasets(nextData, data.datasets, datasetIdKey);
    return nextData;
}
/**
 * Get dataset from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */ function getDatasetAtEvent(chart, event) {
    return chart.getElementsAtEventForMode(event.nativeEvent, "dataset", {
        intersect: true
    }, false);
}
/**
 * Get single dataset element from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */ function getElementAtEvent(chart, event) {
    return chart.getElementsAtEventForMode(event.nativeEvent, "nearest", {
        intersect: true
    }, false);
}
/**
 * Get all dataset elements from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */ function getElementsAtEvent(chart, event) {
    return chart.getElementsAtEventForMode(event.nativeEvent, "index", {
        intersect: true
    }, false);
}

function ChartComponent(props, ref) {
    const { height =150 , width =300 , redraw =false , datasetIdKey , type , data , options , plugins =[] , fallbackContent , updateMode , ...canvasProps } = props;
    const canvasRef = React.useRef(null);
    const chartRef = React.useRef();
    const renderChart = ()=>{
        if (!canvasRef.current) return;
        chartRef.current = new chart_js.Chart(canvasRef.current, {
            type,
            data: cloneData(data, datasetIdKey),
            options: options && {
                ...options
            },
            plugins
        });
        reforwardRef(ref, chartRef.current);
    };
    const destroyChart = ()=>{
        reforwardRef(ref, null);
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };
    React.useEffect(()=>{
        if (!redraw && chartRef.current && options) {
            setOptions(chartRef.current, options);
        }
    }, [
        redraw,
        options
    ]);
    React.useEffect(()=>{
        if (!redraw && chartRef.current) {
            setLabels(chartRef.current.config.data, data.labels);
        }
    }, [
        redraw,
        data.labels
    ]);
    React.useEffect(()=>{
        if (!redraw && chartRef.current && data.datasets) {
            setDatasets(chartRef.current.config.data, data.datasets, datasetIdKey);
        }
    }, [
        redraw,
        data.datasets
    ]);
    React.useEffect(()=>{
        if (!chartRef.current) return;
        if (redraw) {
            destroyChart();
            setTimeout(renderChart);
        } else {
            chartRef.current.update(updateMode);
        }
    }, [
        redraw,
        options,
        data.labels,
        data.datasets,
        updateMode
    ]);
    React.useEffect(()=>{
        if (!chartRef.current) return;
        destroyChart();
        setTimeout(renderChart);
    }, [
        type
    ]);
    React.useEffect(()=>{
        renderChart();
        return ()=>destroyChart();
    }, []);
    return /*#__PURE__*/ React.createElement("canvas", Object.assign({
        ref: canvasRef,
        role: "img",
        height: height,
        width: width
    }, canvasProps), fallbackContent);
}
const Chart = /*#__PURE__*/ React.forwardRef(ChartComponent);

function createTypedChart(type, registerables) {
    chart_js.Chart.register(registerables);
    return /*#__PURE__*/ React.forwardRef((props, ref)=>/*#__PURE__*/ React.createElement(Chart, Object.assign({}, props, {
            ref: ref,
            type: type
        })));
}
const Line = /* #__PURE__ */ createTypedChart("line", chart_js.LineController);
const Bar = /* #__PURE__ */ createTypedChart("bar", chart_js.BarController);
const Radar = /* #__PURE__ */ createTypedChart("radar", chart_js.RadarController);
const Doughnut = /* #__PURE__ */ createTypedChart("doughnut", chart_js.DoughnutController);
const PolarArea = /* #__PURE__ */ createTypedChart("polarArea", chart_js.PolarAreaController);
const Bubble = /* #__PURE__ */ createTypedChart("bubble", chart_js.BubbleController);
const Pie = /* #__PURE__ */ createTypedChart("pie", chart_js.PieController);
const Scatter = /* #__PURE__ */ createTypedChart("scatter", chart_js.ScatterController);

exports.Bar = Bar;
exports.Bubble = Bubble;
exports.Chart = Chart;
exports.Doughnut = Doughnut;
exports.Line = Line;
exports.Pie = Pie;
exports.PolarArea = PolarArea;
exports.Radar = Radar;
exports.Scatter = Scatter;
exports.getDatasetAtEvent = getDatasetAtEvent;
exports.getElementAtEvent = getElementAtEvent;
exports.getElementsAtEvent = getElementsAtEvent;
//# sourceMappingURL=index.cjs.map
