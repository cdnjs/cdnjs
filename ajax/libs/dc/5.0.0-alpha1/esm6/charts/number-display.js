import { format } from 'd3-format';
import { easeQuad } from 'd3-ease';
import { interpolateNumber } from 'd3-interpolate';
import { BaseMixin } from '../base/base-mixin.js';
const SPAN_CLASS = 'number-display';
/**
 * A display of a single numeric value.
 *
 * Unlike other charts, you do not need to set a dimension. Instead a group object must be provided and
 * a valueAccessor that returns a single value.
 *
 * If the group is a {@link https://github.com/crossfilter/crossfilter/wiki/API-Reference#crossfilter_groupAll | groupAll}
 * then its `.value()` will be displayed. This is the recommended usage.
 *
 * However, if it is given an ordinary group, the `numberDisplay` will show the last bin's value, after
 * sorting with the {@link https://dc-js.github.io/dc.js/docs/html/dc.baseMixin.html#ordering__anchor | ordering}
 * function. `numberDisplay` defaults the `ordering` function to sorting by value, so this will display
 * the largest value if the values are numeric.
 */
export class NumberDisplay extends BaseMixin {
    /**
     * Create a Number Display widget.
     *
     * @example
     * ```
     * // create a number display under #chart-container1 element using the default global chart group
     * const display1 = new NumberDisplay('#chart-container1');
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            transitionDuration: 250,
            transitionDelay: 0,
            formatNumber: format('.2s'),
        });
        this.dataProvider().configure({
            ordering: kv => kv.value, // default to ordering by value, to emulate old group.top(1) behavior when multiple groups
        });
        this._html = { one: '', some: '', none: '' };
        this._lastValue = undefined;
        // dimension not required
        this._mandatoryAttributes(['group']);
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    // TODO: chart specific DataProvider
    data() {
        const group = this.dataProvider().conf().group;
        const valObj = group.value ? group.value() : this._maxBin(group.all());
        return this.dataProvider().conf().valueAccessor(valObj);
    }
    html(html) {
        if (!arguments.length) {
            return this._html;
        }
        if (html.none) {
            this._html.none = html.none; // if none available
        }
        else if (html.one) {
            this._html.none = html.one; // if none not available use one
        }
        else if (html.some) {
            this._html.none = html.some; // if none and one not available use some
        }
        if (html.one) {
            this._html.one = html.one; // if one available
        }
        else if (html.some) {
            this._html.one = html.some; // if one not available use some
        }
        if (html.some) {
            this._html.some = html.some; // if some available
        }
        else if (html.one) {
            this._html.some = html.one; // if some not available use one
        }
        return this;
    }
    /**
     * Calculate and return the underlying value of the display.
     */
    value() {
        return this.data();
    }
    _maxBin(all) {
        if (!all.length) {
            return null;
        }
        const sorted = this._computeOrderedGroups(all);
        return sorted[sorted.length - 1];
    }
    _doRender() {
        const newValue = this.value();
        let span = this.selectAll(`.${SPAN_CLASS}`);
        if (span.empty()) {
            span = span.data([0]).enter().append('span').attr('class', SPAN_CLASS).merge(span);
        }
        {
            const chart = this;
            span.transition()
                .duration(chart._conf.transitionDuration)
                .delay(chart._conf.transitionDelay)
                .ease(easeQuad)
                .tween('text', function () {
                // [XA] don't try and interpolate from Infinity, else this breaks.
                const interpStart = isFinite(chart._lastValue) ? chart._lastValue : 0;
                const interp = interpolateNumber(interpStart || 0, newValue);
                chart._lastValue = newValue;
                // need to save it in D3v4
                const node = this;
                return t => {
                    let html = null;
                    const num = chart._conf.formatNumber(interp(t));
                    if (newValue === 0 && chart._html.none !== '') {
                        html = chart._html.none;
                    }
                    else if (newValue === 1 && chart._html.one !== '') {
                        html = chart._html.one;
                    }
                    else if (chart._html.some !== '') {
                        html = chart._html.some;
                    }
                    node.innerHTML = html ? html.replace('%number', num) : num;
                };
            });
        }
        return this;
    }
    _doRedraw() {
        return this._doRender();
    }
}
//# sourceMappingURL=number-display.js.map