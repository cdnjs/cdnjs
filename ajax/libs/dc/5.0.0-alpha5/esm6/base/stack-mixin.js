import { stack } from 'd3-shape';
import { max, min } from 'd3-array';
import { add, subtract } from '../core/utils.js';
import { CoordinateGridMixin } from './coordinate-grid-mixin.js';
import { MultiDataAdapter } from '../data/multi-data-adapter.js';
/**
 * Stack Mixin is an mixin that provides cross-chart support of stackability using d3.stack.
 */
export class StackMixin extends CoordinateGridMixin {
    /**
     * Create a new instance.
     *
     * @see {@link BaseMixin.constructor}
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            colorAccessor: d => d.name,
            hidableStacks: false,
            evadeDomainFilter: false,
        });
        this.dataProvider(new MultiDataAdapter());
        this._stackLayout = stack();
        this._hiddenStacks = {};
    }
    /**
     * @see {@link BaseMixin.configure}
     */
    configure(conf) {
        super.configure(conf);
        return this;
    }
    /**
     * @see {@link BaseMixin.conf}
     */
    conf() {
        return this._conf;
    }
    dataProvider(dataProvider) {
        if (!arguments.length) {
            return super.dataProvider();
        }
        return super.dataProvider(dataProvider);
    }
    /**
     * @category Ninja
     * @see {@link BaseMixin.data}
     */
    data() {
        let layers = this.dataProvider().data();
        layers = layers.filter(l => this._isLayerVisible(l.name));
        if (!layers.length) {
            return [];
        }
        layers.forEach(l => {
            const allValues = l.rawData.map((d, i) => ({
                x: this._conf.keyAccessor(d, i),
                y: d._value,
                data: d,
                name: l.name,
            }));
            l.domainValues = allValues.filter(layer => this._domainFilter()(layer));
            l.values = this._conf.evadeDomainFilter ? allValues : l.domainValues;
        });
        const v4data = layers[0].values.map((v, i) => {
            const col = { x: v.x };
            layers.forEach(layer => {
                col[layer.name] = layer.values[i].y;
            });
            return col;
        });
        const keys = layers.map(layer => layer.name);
        const v4result = this.stackLayout().keys(keys)(v4data);
        v4result.forEach((series, i) => {
            series.forEach((ys, j) => {
                layers[i].values[j].y0 = ys[0];
                layers[i].values[j].y1 = ys[1];
            });
        });
        return layers;
    }
    _domainFilter() {
        if (!this.x()) {
            return () => true;
        }
        const xDomain = this.x().domain();
        if (this.isOrdinal()) {
            // TODO #416
            // var domainSet = d3.set(xDomain);
            return () => true; // domainSet.has(p.x);
        }
        if (this._conf.elasticX) {
            return () => true;
        }
        return p => p.x >= xDomain[0] && p.x <= xDomain[xDomain.length - 1];
    }
    /**
     * Hide the stack with the given name.
     * The chart must be re-rendered for this change to appear.
     *
     * @category Intermediate
     */
    hideStack(stackName) {
        this._hiddenStacks[stackName] = true;
        return this;
    }
    /**
     * Make stack with the given name visible.
     * The chart must be re-rendered for this change to appear.
     *
     * @category Intermediate
     */
    showStack(stackName) {
        this._hiddenStacks[stackName] = false;
        return this;
    }
    _isLayerVisible(layerName) {
        return !this._hiddenStacks[layerName];
    }
    /**
     * @see {@link CoordinateGridMixin.yAxisMin}
     *
     * @category Intermediate
     */
    yAxisMin() {
        const m = min(this._flattenStack(), p => (p.y < 0 ? p.y + p.y0 : p.y0));
        return subtract(m, this._conf.yAxisPadding);
    }
    /**
     * @see {@link CoordinateGridMixin.yAxisMax}
     *
     * @category Intermediate
     */
    yAxisMax() {
        const m = max(this._flattenStack(), p => (p.y > 0 ? p.y + p.y0 : p.y0));
        return add(m, this._conf.yAxisPadding);
    }
    // TODO: better types
    _flattenStack() {
        // @ts-ignore     // TODO: better types
        return this.data().flatMap(layer => layer.domainValues);
    }
    /**
     * @see {@link CoordinateGridMixin.xAxisMin}
     *
     * @category Intermediate
     */
    xAxisMin() {
        const m = min(this._flattenStack(), d => d.x);
        return subtract(m, this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
    }
    /**
     * @see {@link CoordinateGridMixin.xAxisMax}
     *
     * @category Intermediate
     */
    xAxisMax() {
        const m = max(this._flattenStack(), d => d.x);
        return add(m, this._conf.xAxisPadding, this._conf.xAxisPaddingUnit);
    }
    /**
     * @hidden
     */
    titleFn(stackName) {
        return (this._conf.titles && this._conf.titles[stackName]) || this._conf.title;
    }
    stackLayout(_stack) {
        if (!arguments.length) {
            return this._stackLayout;
        }
        this._stackLayout = _stack;
        return this;
    }
    /**
     * @hidden
     */
    _ordinalXDomain() {
        const flat = this._flattenStack().map(d => d.data);
        const ordered = this._computeOrderedGroups(flat);
        return ordered.map(this._conf.keyAccessor);
    }
    /**
     * @see {@link BaseMixin.legendables}
     */
    legendables() {
        return this.dataProvider()
            .layers()
            .map((layer, i) => ({
            chart: this,
            name: layer.name,
            hidden: !this._isLayerVisible(layer.name),
            color: this._colorHelper.getColor(layer, i),
        }));
    }
    /**
     * @hidden
     */
    isLegendableHidden(d) {
        return !this._isLayerVisible(d.name);
    }
    /**
     * @hidden
     */
    legendToggle(d) {
        if (this._conf.hidableStacks) {
            if (this.isLegendableHidden(d)) {
                this.showStack(d.name);
            }
            else {
                this.hideStack(d.name);
            }
            // _chart.redraw();
            this.renderGroup();
        }
    }
}
//# sourceMappingURL=stack-mixin.js.map