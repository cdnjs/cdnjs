import { format } from 'd3-format';
import { BaseMixin } from '../base/base-mixin.js';
/**
 * The data count widget is a simple widget designed to display the number of records selected by the
 * current filters out of the total number of records in the data set. Once created the data count widget
 * will automatically update the text content of child elements with the following classes:
 *
 * * `.total-count` - total number of records
 * * `.filter-count` - number of records matched by the current filters
 *
 * Note: this widget works best for the specific case of showing the number of records out of a
 * total. If you want a more general-purpose numeric display, please use the
 * {@link NumberDisplay} widget instead.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
 */
export class DataCount extends BaseMixin {
    /**
     * Create a Data Count widget.
     *
     * TODO update example
     * @example
     * ```
     * var ndx = crossfilter(data);
     * var all = ndx.groupAll();
     *
     * new DataCount('.dc-data-count')
     *     .crossfilter(ndx)
     *     .groupAll(all);
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            formatNumber: format(',d'),
            html: { some: '', all: '' },
        });
        this._crossfilter = null;
        this._groupAll = null;
        this._mandatoryAttributes(['crossfilter', 'groupAll']);
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _doRender() {
        const tot = this.crossfilter().size();
        const val = this.groupAll().value();
        const all = this._conf.formatNumber(tot);
        const selected = this._conf.formatNumber(val);
        if (tot === val && this._conf.html.all !== '') {
            this.root().html(this._conf.html.all.replace('%total-count', all).replace('%filter-count', selected));
        }
        else if (this._conf.html.some !== '') {
            this.root().html(this._conf.html.some.replace('%total-count', all).replace('%filter-count', selected));
        }
        else {
            this.selectAll('.total-count').text(all);
            this.selectAll('.filter-count').text(selected);
        }
        return this;
    }
    _doRedraw() {
        return this._doRender();
    }
    crossfilter(cf) {
        if (!arguments.length) {
            return this._crossfilter;
        }
        this._crossfilter = cf;
        return this;
    }
    groupAll(groupAll) {
        if (!arguments.length) {
            return this._groupAll;
        }
        this._groupAll = groupAll;
        return this;
    }
}
//# sourceMappingURL=data-count.js.map