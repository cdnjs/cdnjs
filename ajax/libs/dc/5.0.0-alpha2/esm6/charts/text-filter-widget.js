import { BaseMixin } from '../base/base-mixin.js';
import { constants } from '../core/constants.js';
import { events } from '../core/events.js';
const INPUT_CSS_CLASS = 'dc-text-filter-input';
/**
 * Text Filter Widget
 *
 * The text filter widget is a simple widget designed to display an input field allowing to filter
 * data that matches the text typed.
 * As opposed to the other charts, this doesn't display any result and doesn't update its display,
 * it's just to input an filter other charts.
 *
 */
export class TextFilterWidget extends BaseMixin {
    /**
     * Create Text Filter widget
     *
     * @example
     * ```
     * const data = [{"firstName":"John","lastName":"Coltrane"}{"firstName":"Miles",lastName:"Davis"}]
     * const ndx = crossfilter(data);
     * const dimension = ndx.dimension(d => `${d.lastName.toLowerCase()} ${d.firstName.toLowerCase()}`);
     *
     * new TextFilterWidget('#search')
     *     .dimension(dimension);
     *     // you don't need the group() function
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            placeHolder: 'search',
            normalize: s => s.toLowerCase(),
            filterFunctionFactory: query => {
                query = this._conf.normalize(query);
                return d => this._conf.normalize(d).indexOf(query) !== -1;
            },
        });
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _doRender() {
        this.select('input').remove();
        this._input = this.root().append('input').classed(INPUT_CSS_CLASS, true);
        const chart = this;
        this._input.on('input', function () {
            chart
                .dataProvider()
                .conf()
                .dimension.filterFunction(chart._conf.filterFunctionFactory(this.value));
            events.trigger(() => {
                chart.redrawGroup();
            }, constants.EVENT_DELAY);
        });
        this._doRedraw();
        return this;
    }
    _doRedraw() {
        this.root().selectAll('input').attr('placeholder', this._conf.placeHolder);
        return this;
    }
}
//# sourceMappingURL=text-filter-widget.js.map