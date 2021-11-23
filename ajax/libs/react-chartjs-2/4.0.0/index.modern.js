import React, { forwardRef, useRef, useEffect } from 'react';
import { Chart as Chart$1, LineController, BarController, RadarController, DoughnutController, PolarAreaController, BubbleController, PieController, ScatterController } from 'chart.js';

const defaultDatasetIdKey = 'label';
function reforwardRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}
function setOptions(chart, nextOptions) {
    chart.options = {
        ...nextOptions
    };
}
function setLabels(currentData, nextLabels) {
    currentData.labels = nextLabels;
}
function setDatasets(currentData, nextDatasets, datasetIdKey = defaultDatasetIdKey) {
    const addedDatasets = [];
    currentData.datasets = nextDatasets.map((nextDataset)=>{
        // given the new set, find it's current match
        const currentDataset = currentData.datasets.find((dataset)=>dataset[datasetIdKey] === nextDataset[datasetIdKey]
        );
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
function cloneData(data, datasetIdKey = defaultDatasetIdKey) {
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
    return chart.getElementsAtEventForMode(event.nativeEvent, 'dataset', {
        intersect: true
    }, false);
}
/**
 * Get single dataset element from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */ function getElementAtEvent(chart, event) {
    return chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', {
        intersect: true
    }, false);
}
/**
 * Get all dataset elements from mouse click event
 * @param chart - Chart.js instance
 * @param event - Mouse click event
 * @returns Dataset
 */ function getElementsAtEvent(chart, event) {
    return chart.getElementsAtEventForMode(event.nativeEvent, 'index', {
        intersect: true
    }, false);
}

function ChartComponent({ height =150 , width =300 , redraw =false , datasetIdKey , type , data , options , plugins =[] , fallbackContent , ...props }, ref) {
    const canvasRef = useRef(null);
    const chartRef = useRef();
    const renderChart = ()=>{
        if (!canvasRef.current) return;
        chartRef.current = new Chart$1(canvasRef.current, {
            type,
            data: cloneData(data, datasetIdKey),
            options,
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
    useEffect(()=>{
        if (!redraw && chartRef.current && options) {
            setOptions(chartRef.current, options);
        }
    }, [
        redraw,
        options
    ]);
    useEffect(()=>{
        if (!redraw && chartRef.current) {
            setLabels(chartRef.current.config.data, data.labels);
        }
    }, [
        redraw,
        data.labels
    ]);
    useEffect(()=>{
        if (!redraw && chartRef.current && data.datasets) {
            setDatasets(chartRef.current.config.data, data.datasets, datasetIdKey);
        }
    }, [
        redraw,
        data.datasets
    ]);
    useEffect(()=>{
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
    useEffect(()=>{
        renderChart();
        return ()=>destroyChart()
        ;
    }, []);
    return(/*#__PURE__*/ React.createElement("canvas", Object.assign({
        ref: canvasRef,
        role: "img",
        height: height,
        width: width
    }, props), fallbackContent));
}
const Chart = /*#__PURE__*/ forwardRef(ChartComponent);

function createTypedChart(type, registerables) {
    Chart$1.register(registerables);
    return(/*#__PURE__*/ forwardRef((props, ref)=>/*#__PURE__*/ React.createElement(Chart, Object.assign({
        }, props, {
            ref: ref,
            type: type
        }))
    ));
}
const Line = /* #__PURE__ */ createTypedChart('line', LineController);
const Bar = /* #__PURE__ */ createTypedChart('bar', BarController);
const Radar = /* #__PURE__ */ createTypedChart('radar', RadarController);
const Doughnut = /* #__PURE__ */ createTypedChart('doughnut', DoughnutController);
const PolarArea = /* #__PURE__ */ createTypedChart('polarArea', PolarAreaController);
const Bubble = /* #__PURE__ */ createTypedChart('bubble', BubbleController);
const Pie = /* #__PURE__ */ createTypedChart('pie', PieController);
const Scatter = /* #__PURE__ */ createTypedChart('scatter', ScatterController);

export { Bar, Bubble, Chart, Doughnut, Line, Pie, PolarArea, Radar, Scatter, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent };
//# sourceMappingURL=index.modern.js.map
