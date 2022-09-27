'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chart_js = require('chart.js');
var vue = require('vue');

var ChartEmits;
(function(ChartEmits) {
    ChartEmits["ChartRendered"] = "chart:rendered";
    ChartEmits["ChartUpdated"] = "chart:updated";
    ChartEmits["ChartDestroyed"] = "chart:destroyed";
    ChartEmits["LabelsUpdated"] = "labels:updated";
})(ChartEmits || (ChartEmits = {}));
function chartCreate(createChartFunction, chartData, chartOptions, context) {
    createChartFunction(chartData, chartOptions);
    if (context !== undefined) {
        context.emit(ChartEmits.ChartRendered);
    }
}
function chartUpdate(chart, context) {
    chart.update();
    if (context !== undefined) {
        context.emit(ChartEmits.ChartUpdated);
    }
}
function chartDestroy(chart, context) {
    chart.destroy();
    if (context !== undefined) {
        context.emit(ChartEmits.ChartDestroyed);
    }
}
function getChartData(data, datasetIdKey) {
    const nextData = {
        labels: typeof data.labels === "undefined" ? [] : [
            ...data.labels
        ],
        datasets: []
    };
    setChartDatasets(nextData, {
        ...data
    }, datasetIdKey);
    return nextData;
}
function setChartDatasets(oldData, newData, datasetIdKey) {
    const addedDatasets = [];
    oldData.datasets = newData.datasets.map((nextDataset)=>{
        // given the new set, find it's current match
        const currentDataset = oldData.datasets.find((dataset)=>dataset[datasetIdKey] === nextDataset[datasetIdKey]);
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
function setChartLabels(chart, labels, context) {
    chart.data.labels = labels;
    if (context !== undefined) {
        context.emit(ChartEmits.LabelsUpdated);
    }
}
function setChartOptions(chart, options) {
    chart.options = {
        ...options
    };
}
function compareData(newData, oldData) {
    // Get new and old DataSet Labels
    const newDatasetLabels = newData.datasets.map((dataset)=>{
        return dataset.label;
    });
    const oldDatasetLabels = oldData.datasets.map((dataset)=>{
        return dataset.label;
    });
    // Check if Labels are equal and if dataset length is equal
    return oldData.datasets.length === newData.datasets.length && newDatasetLabels.every((value, index)=>value === oldDatasetLabels[index]);
}
const templateError = "Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components";
const chartUpdateError = "Update ERROR: chart instance not found";

const generateChart = (chartId, chartType, chartController)=>{
    return vue.defineComponent({
        props: {
            chartData: {
                type: Object,
                required: true
            },
            chartOptions: {
                type: Object,
                default: ()=>{}
            },
            datasetIdKey: {
                type: String,
                default: "label"
            },
            chartId: {
                type: String,
                default: chartId
            },
            width: {
                type: Number,
                default: 400
            },
            height: {
                type: Number,
                default: 400
            },
            cssClasses: {
                type: String,
                default: ""
            },
            styles: {
                type: Object,
                default: ()=>{}
            },
            plugins: {
                type: Array,
                default: ()=>[]
            }
        },
        setup (props, context) {
            chart_js.Chart.register(chartController);
            const _chart = vue.shallowRef(null);
            const canvasEl = vue.ref(null);
            function renderChart(data, options) {
                if (_chart.value !== null) {
                    chartDestroy(vue.toRaw(_chart.value), context);
                }
                if (canvasEl.value === null) {
                    throw new Error(templateError);
                } else {
                    const chartData = getChartData(data, props.datasetIdKey);
                    const canvasEl2DContext = canvasEl.value.getContext("2d");
                    if (canvasEl2DContext !== null) {
                        _chart.value = new chart_js.Chart(canvasEl2DContext, {
                            type: chartType,
                            data: vue.isProxy(data) ? new Proxy(chartData, {}) : chartData,
                            options,
                            plugins: props.plugins
                        });
                    }
                }
            }
            function chartDataHandler(newValue, oldValue) {
                const newData = vue.isProxy(newValue) ? vue.toRaw(newValue) : {
                    ...newValue
                };
                const oldData = vue.isProxy(oldValue) ? vue.toRaw(oldValue) : {
                    ...oldValue
                };
                if (Object.keys(oldData).length > 0) {
                    const chart = vue.toRaw(_chart.value);
                    const isEqualLabelsAndDatasetsLength = compareData(newData, oldData);
                    if (isEqualLabelsAndDatasetsLength && chart !== null) {
                        setChartDatasets(chart === null || chart === void 0 ? void 0 : chart.data, newData, props.datasetIdKey);
                        if (newData.labels !== undefined) {
                            setChartLabels(chart, newData.labels, context);
                        }
                        updateChart();
                    } else {
                        if (chart !== null) {
                            chartDestroy(chart, context);
                        }
                        chartCreate(renderChart, props.chartData, props.chartOptions, context);
                    }
                } else {
                    if (_chart.value !== null) {
                        chartDestroy(vue.toRaw(_chart.value), context);
                    }
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            }
            function chartOptionsHandler(options) {
                const chart = vue.toRaw(_chart.value);
                if (chart !== null) {
                    setChartOptions(chart, options);
                    updateChart();
                } else {
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            }
            function updateChart() {
                const chart = vue.toRaw(_chart.value);
                if (chart !== null) {
                    chartUpdate(chart, context);
                } else {
                    console.error(chartUpdateError);
                }
            }
            vue.watch(()=>props.chartData, (newValue, oldValue)=>chartDataHandler(newValue, oldValue), {
                deep: true
            });
            vue.watch(()=>props.chartOptions, (newValue)=>chartOptionsHandler(newValue), {
                deep: true
            });
            vue.onMounted(()=>{
                if ("datasets" in props.chartData && props.chartData.datasets.length > 0) {
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            });
            vue.onBeforeUnmount(()=>{
                if (_chart.value !== null) {
                    chartDestroy(vue.toRaw(_chart.value), context);
                }
            });
            context.expose({
                chart: _chart,
                updateChart
            });
            return ()=>vue.h("div", {
                    style: props.styles,
                    class: props.cssClasses
                }, [
                    vue.h("canvas", {
                        id: props.chartId,
                        width: props.width,
                        height: props.height,
                        ref: canvasEl
                    })
                ]);
        }
    });
};
const Bar = /* #__PURE__ */ generateChart("bar-chart", "bar", chart_js.BarController);
const Doughnut = /* #__PURE__ */ generateChart("doughnut-chart", "doughnut", chart_js.DoughnutController);
const Line = /* #__PURE__ */ generateChart("line-chart", "line", chart_js.LineController);
const Pie = /* #__PURE__ */ generateChart("pie-chart", "pie", chart_js.PieController);
const PolarArea = /* #__PURE__ */ generateChart("polar-chart", "polarArea", chart_js.PolarAreaController);
const Radar = /* #__PURE__ */ generateChart("radar-chart", "radar", chart_js.RadarController);
const Bubble = /* #__PURE__ */ generateChart("bubble-chart", "bubble", chart_js.BubbleController);
const Scatter = /* #__PURE__ */ generateChart("scatter-chart", "scatter", chart_js.ScatterController);

exports.Bar = Bar;
exports.Bubble = Bubble;
exports.Doughnut = Doughnut;
exports.Line = Line;
exports.Pie = Pie;
exports.PolarArea = PolarArea;
exports.Radar = Radar;
exports.Scatter = Scatter;
exports.generateChart = generateChart;
//# sourceMappingURL=index.cjs.map
