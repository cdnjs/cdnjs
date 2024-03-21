import { ascending, groups } from 'd3-array';
import { BaseMixin } from '../base/base-mixin.js';
const LABEL_CSS_CLASS = 'dc-grid-label';
const ITEM_CSS_CLASS = 'dc-grid-item';
const SECTION_CSS_CLASS = 'dc-grid-section dc-grid-group';
const GRID_CSS_CLASS = 'dc-grid-top';
/**
 * Data grid is a simple widget designed to list the filtered records, providing
 * a simple way to define how the items are displayed.
 *
 * Examples:
 * - {@link https://dc-js.github.io/dc.js/ep/ | List of members of the european parliament}
 */
export class DataGrid extends BaseMixin {
    /**
     * Create a Data Grid.
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            section: null,
            size: 999,
            html: d => `you need to provide an html() handling param:  ${JSON.stringify(d)}`,
            sortBy: d => d,
            order: ascending,
            beginSlice: 0,
            endSlice: undefined,
            htmlSection: d => `<div class='${SECTION_CSS_CLASS}'><h1 class='${LABEL_CSS_CLASS}'>${this._conf.keyAccessor(d)}</h1></div>`,
        });
        this._mandatoryAttributes(['dimension', 'section']);
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _doRender() {
        this.selectAll(`div.${GRID_CSS_CLASS}`).remove();
        this._renderItems(this._renderSections());
        return this;
    }
    _renderSections() {
        const sections = this.root()
            .selectAll(`div.${GRID_CSS_CLASS}`)
            .data(this._nestEntries(), d => this._conf.keyAccessor(d));
        const itemSection = sections
            .enter()
            .append('div')
            .attr('class', GRID_CSS_CLASS);
        if (this._conf.htmlSection) {
            itemSection.html(d => this._conf.htmlSection(d));
        }
        sections.exit().remove();
        return itemSection;
    }
    _nestEntries() {
        // TODO: consider creating special DataProvider
        let entries = this.dataProvider().conf().dimension.top(this._conf.size);
        entries = entries
            .sort((a, b) => this._conf.order(this._conf.sortBy(a), this._conf.sortBy(b)))
            .slice(this._conf.beginSlice, this._conf.endSlice);
        return groups(entries, this._conf.section)
            .sort(this._conf.order)
            .map(e => ({
            // The code expects key and values as attributes
            key: `${e[0]}`,
            values: e[1],
        }));
    }
    _renderItems(sections) {
        let items = sections
            .order()
            .selectAll(`div.${ITEM_CSS_CLASS}`)
            .data(d => d.values);
        items.exit().remove();
        items = items
            .enter()
            .append('div')
            .attr('class', ITEM_CSS_CLASS)
            .html(d => this._conf.html(d))
            .merge(items);
        return items;
    }
    _doRedraw() {
        return this._doRender();
    }
}
//# sourceMappingURL=data-grid.js.map