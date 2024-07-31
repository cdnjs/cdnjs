import { descending, max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { transition } from '../core/core.js';
import { events } from '../core/events.js';
/**
 * This Mixin provides reusable functionalities for any chart that needs to visualize data using bubbles.
 */
// tslint:disable-next-line:variable-name
export function BubbleMixin(Base) {
    // @ts-ignore
    return class extends Base {
        constructor(...args) {
            super(...args);
            this.configure({
                renderLabel: true,
                maxBubbleRelativeSize: 0.3,
                minRadiusWithLabel: 10,
                sortBubbleSize: false,
                elasticRadius: false,
                excludeElasticZero: true,
                radiusValueAccessor: d => d.r,
            });
            // These cane be used by derived classes as well, so member status
            this.BUBBLE_NODE_CLASS = 'node';
            this.BUBBLE_CLASS = 'bubble';
            this.MIN_RADIUS = 10;
            this._r = scaleLinear().domain([0, 100]);
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
        data() {
            const data = super.data();
            if (this._conf.sortBubbleSize) {
                // sort descending so smaller bubbles are on top
                const radiusAccessor = this._conf.radiusValueAccessor;
                data.sort((a, b) => descending(radiusAccessor(a), radiusAccessor(b)));
            }
            return data;
        }
        r(bubbleRadiusScale) {
            if (!arguments.length) {
                return this._r;
            }
            this._r = bubbleRadiusScale;
            return this;
        }
        /**
         * @hidden
         */
        calculateRadiusDomain() {
            if (this._conf.elasticRadius) {
                this.r().domain([this.rMin(), this.rMax()]);
            }
        }
        /**
         * @hidden
         */
        rMin() {
            let values = this.data().map(this._conf.radiusValueAccessor);
            if (this._conf.excludeElasticZero) {
                values = values.filter(value => value > 0);
            }
            return min(values);
        }
        /**
         * @hidden
         */
        rMax() {
            return max(this.data(), e => this._conf.radiusValueAccessor(e));
        }
        /**
         * @hidden
         */
        bubbleR(d) {
            const value = this._conf.radiusValueAccessor(d);
            let r = this.r()(value);
            if (isNaN(r) || value <= 0) {
                r = 0;
            }
            return r;
        }
        /**
         * @hidden
         */
        _labelFunction(d) {
            return this._conf.label(d);
        }
        /**
         * @hidden
         */
        _shouldLabel(d) {
            return this.bubbleR(d) > this._conf.minRadiusWithLabel;
        }
        /**
         * @hidden
         */
        _labelOpacity(d) {
            return this._shouldLabel(d) ? 1 : 0;
        }
        /**
         * @hidden
         */
        _labelPointerEvent(d) {
            return this._shouldLabel(d) ? 'all' : 'none';
        }
        /**
         * @hidden
         */
        _doRenderLabel(bubbleGEnter) {
            if (this._conf.renderLabel) {
                let label = bubbleGEnter.select('text');
                if (label.empty()) {
                    label = bubbleGEnter
                        .append('text')
                        .attr('text-anchor', 'middle')
                        .attr('dy', '.3em')
                        .on('click', (evt, d) => this.onClick(d));
                }
                label
                    .attr('opacity', 0)
                    .attr('pointer-events', d => this._labelPointerEvent(d))
                    .text(d => this._labelFunction(d));
                transition(label, this._conf.transitionDuration, this._conf.transitionDelay).attr('opacity', d => this._labelOpacity(d));
            }
        }
        /**
         * @hidden
         */
        doUpdateLabels(bubbleGEnter) {
            if (this._conf.renderLabel) {
                const labels = bubbleGEnter
                    .select('text')
                    .attr('pointer-events', d => this._labelPointerEvent(d))
                    .text(d => this._labelFunction(d));
                transition(labels, this._conf.transitionDuration, this._conf.transitionDelay).attr('opacity', d => this._labelOpacity(d));
            }
        }
        /**
         * @hidden
         */
        _titleFunction(d) {
            return this._conf.title(d);
        }
        /**
         * @hidden
         */
        _doRenderTitles(g) {
            if (this._conf.renderTitle) {
                const title = g.select('title');
                if (title.empty()) {
                    g.append('title').text(d => this._titleFunction(d));
                }
            }
        }
        /**
         * @hidden
         */
        doUpdateTitles(g) {
            if (this._conf.renderTitle) {
                g.select('title').text(d => this._titleFunction(d));
            }
        }
        minRadius(radius) {
            if (!arguments.length) {
                return this.MIN_RADIUS;
            }
            this.MIN_RADIUS = radius;
            return this;
        }
        fadeDeselectedArea(selection) {
            if (this.hasFilter()) {
                const chart = this;
                this.selectAll(`g.${chart.BUBBLE_NODE_CLASS}`).each(function (d) {
                    if (chart.isSelectedNode(d)) {
                        chart.highlightSelected(this);
                    }
                    else {
                        chart.fadeDeselected(this);
                    }
                });
            }
            else {
                const chart = this;
                this.selectAll(`g.${chart.BUBBLE_NODE_CLASS}`).each(function () {
                    chart.resetHighlight(this);
                });
            }
        }
        /**
         * @hidden
         */
        isSelectedNode(d) {
            return this.hasFilter(d.key);
        }
        onClick(d) {
            const filter = d.key;
            events.trigger(() => {
                this.filter(filter);
                this.redrawGroup();
            });
        }
    };
}
//# sourceMappingURL=bubble-mixin.js.map