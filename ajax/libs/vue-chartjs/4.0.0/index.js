import { Chart, BarController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, BubbleController, ScatterController } from 'chart.js';
import { defineComponent, shallowRef, ref, watch, onMounted, onBeforeUnmount, toRaw, h, isProxy } from 'vue';

var ChartEmits;
(function(ChartEmits) {
    ChartEmits["ChartRendered"] = 'chart:rendered';
    ChartEmits["ChartUpdated"] = 'chart:updated';
    ChartEmits["ChartDestroyed"] = 'chart:destroyed';
    ChartEmits["LabelsUpdated"] = 'labels:updated';
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
        labels: typeof data.labels === 'undefined' ? [] : [
            ...data.labels
        ],
        datasets: []
    };
    setChartDatasets(nextData, {
        ...data
    }, datasetIdKey);
    return nextData;
}
function getChartOptions(options, plugins) {
    const chartOptions = options;
    if (chartOptions !== undefined && 'plugins' in chartOptions && typeof plugins !== 'undefined' && Object.keys(plugins).length > 0) {
        chartOptions.plugins = {
            ...chartOptions.plugins,
            ...plugins
        };
    }
    return chartOptions;
}
function setChartDatasets(oldData, newData, datasetIdKey) {
    const addedDatasets = [];
    oldData.datasets = newData.datasets.map((nextDataset)=>{
        // given the new set, find it's current match
        const currentDataset = oldData.datasets.find((dataset)=>dataset[datasetIdKey] === nextDataset[datasetIdKey]
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
function setChartLabels(chart, labels, context) {
    chart.data.labels = labels;
    if (context !== undefined) {
        context.emit(ChartEmits.LabelsUpdated);
    }
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
    return oldData.datasets.length === newData.datasets.length && newDatasetLabels.every((value, index)=>value === oldDatasetLabels[index]
    );
}
const templateError = 'Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components';

const generateChart = (chartId, chartType, chartController)=>{
    return defineComponent({
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
                default: 'label'
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
                default: ''
            },
            styles: {
                type: Object,
                default: ()=>{}
            },
            plugins: {
                type: Object,
                default: ()=>{}
            }
        },
        setup (props, context) {
            Chart.register(chartController);
            const _chart = shallowRef(null);
            const canvasEl = ref(null);
            function renderChart(data, options) {
                if (_chart.value !== null) {
                    chartDestroy(toRaw(_chart.value), context);
                }
                if (canvasEl.value === null) {
                    throw new Error(templateError);
                } else {
                    const chartData = getChartData(data, props.datasetIdKey);
                    const canvasEl2DContext = canvasEl.value.getContext('2d');
                    if (canvasEl2DContext !== null) {
                        _chart.value = new Chart(canvasEl2DContext, {
                            type: chartType,
                            data: isProxy(data) ? new Proxy(chartData, {}) : chartData,
                            options: getChartOptions(options, props.plugins)
                        });
                    }
                }
            }
            function chartDataHandler(newValue, oldValue) {
                const newData = isProxy(newValue) ? toRaw(newValue) : {
                    ...newValue
                };
                const oldData = isProxy(oldValue) ? toRaw(oldValue) : {
                    ...oldValue
                };
                if (Object.keys(oldData).length > 0) {
                    const chart = toRaw(_chart.value);
                    const isEqualLabelsAndDatasetsLength = compareData(newData, oldData);
                    if (isEqualLabelsAndDatasetsLength && chart !== null) {
                        setChartDatasets(chart === null || chart === void 0 ? void 0 : chart.data, newData, props.datasetIdKey);
                        if (newData.labels !== undefined) {
                            setChartLabels(chart, newData.labels, context);
                        }
                        chartUpdate(chart, context);
                    } else {
                        if (chart !== null) {
                            chartDestroy(chart, context);
                        }
                        chartCreate(renderChart, props.chartData, props.chartOptions, context);
                    }
                } else {
                    if (_chart.value !== null) {
                        chartDestroy(toRaw(_chart.value), context);
                    }
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            }
            watch(()=>props.chartData
            , (newValue, oldValue)=>chartDataHandler(newValue, oldValue)
            , {
                deep: true
            });
            onMounted(()=>{
                if ('datasets' in props.chartData && props.chartData.datasets.length > 0) {
                    chartCreate(renderChart, props.chartData, props.chartOptions, context);
                }
            });
            onBeforeUnmount(()=>{
                if (_chart.value !== null) {
                    chartDestroy(toRaw(_chart.value), context);
                }
            });
            return ()=>h('div', {
                    style: props.styles,
                    class: props.cssClasses
                }, [
                    h('canvas', {
                        id: props.chartId,
                        width: props.width,
                        height: props.height,
                        ref: canvasEl
                    })
                ])
            ;
        }
    });
};
const Bar = /* #__PURE__ */ generateChart('bar-chart', 'bar', BarController);
const Doughnut = /* #__PURE__ */ generateChart('doughnut-chart', 'doughnut', DoughnutController);
const Line = /* #__PURE__ */ generateChart('line-chart', 'line', LineController);
const Pie = /* #__PURE__ */ generateChart('pie-chart', 'pie', PieController);
const PolarArea = /* #__PURE__ */ generateChart('polar-chart', 'polarArea', PolarAreaController);
const Radar = /* #__PURE__ */ generateChart('radar-chart', 'radar', RadarController);
const Bubble = /* #__PURE__ */ generateChart('bubble-chart', 'bubble', BubbleController);
const Scatter = /* #__PURE__ */ generateChart('scatter-chart', 'scatter', ScatterController);

export { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter, generateChart };
//# sourceMappingURL=index.js.map
