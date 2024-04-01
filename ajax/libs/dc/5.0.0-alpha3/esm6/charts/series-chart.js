import { ascending, groups } from 'd3-array';
import { CompositeChart } from './composite-chart.js';
import { LineChart } from './line-chart.js';
/**
 * A series chart is a chart that shows multiple series of data overlaid on one chart, where the
 * series is specified in the data. It is a specialization of Composite Chart and inherits all
 * composite features other than recomposing the chart.
 *
 * Examples:
 * - {@link http://dc-js.github.io/dc.js/examples/series.html | Series Chart}
 */
export class SeriesChart extends CompositeChart {
    /**
     * Create a Series Chart.
     *
     * TODO update example
     *
     * @example
     * ```
     * // create a series chart under #chart-container1 element using the default global chart group
     * const seriesChart1 = new SeriesChart("#chart-container1");
     * // create a series chart under #chart-container2 element using chart group A
     * const seriesChart2 = new SeriesChart("#chart-container2", "chartGroupA");
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        // This must precede the call to configure as that trigger _resetChildren which needs _charts to be a hash
        this._charts = {};
        this.configure({
            shareColors: true,
            chartFunction: (p, cg) => new LineChart(p, cg),
            seriesAccessor: undefined,
            seriesSort: ascending,
            valueSort: (a, b) => ascending(this._conf.keyAccessor(a), this._conf.keyAccessor(b)),
        });
        this._mandatoryAttributes().push('seriesAccessor', 'chart');
    }
    configure(conf) {
        super.configure(conf);
        // TODO: This is defensive, looking at the code - 'seriesAccessor', 'seriesSort', 'valueSort' do not need it
        if (['chartFunction', 'seriesAccessor', 'seriesSort', 'valueSort'].some(opt => opt in conf)) {
            this._resetChildren();
        }
        return this;
    }
    conf() {
        return this._conf;
    }
    _compose(subChartArray) {
        super.compose(subChartArray);
    }
    compose(subChartArray) {
        throw new Error('Not supported for this chart type');
    }
    _preprocessData() {
        const keep = [];
        let childrenChanged;
        // create a defensive copy before sorting
        let entries = [...this.data()].sort(this._conf.valueSort);
        const nesting = groups(entries, this._conf.seriesAccessor)
            .sort(this._conf.seriesSort)
            .map(e => ({
            // The code expects key and values as attributes
            key: `${e[0]}`,
            values: e[1],
        }));
        const children = nesting.map((sub, i) => {
            const subChart = this._charts[sub.key] || this._conf.chartFunction(this, this.chartGroup());
            if (!this._charts[sub.key]) {
                childrenChanged = true;
            }
            this._charts[sub.key] = subChart;
            keep.push(sub.key);
            subChart.dataProvider().configure({
                dimension: this.dataProvider().conf().dimension,
                valueAccessor: this.dataProvider().conf().valueAccessor,
                groupName: sub.key,
                group: {
                    all: typeof sub.values === 'function' ? sub.values : () => sub.values,
                },
            });
            subChart.configure({
                keyAccessor: this._conf.keyAccessor,
            });
            return subChart.configure({ brushOn: false });
        });
        // this works around the fact compositeChart doesn't really
        // have a removal interface
        Object.keys(this._charts)
            .filter(c => keep.indexOf(c) === -1)
            .forEach(c => {
            this._clearChart(c);
            childrenChanged = true;
        });
        this._compose(children);
        if (childrenChanged && this.legend()) {
            this.legend().render();
        }
    }
    _clearChart(c) {
        if (this._charts[c].g()) {
            this._charts[c].g().remove();
        }
        delete this._charts[c];
    }
    _resetChildren() {
        Object.keys(this._charts).map(this._clearChart);
        this._charts = {};
    }
}
//# sourceMappingURL=series-chart.js.map