import { select } from 'd3-selection';
import { isNumber } from '../core/utils.js';
import { constants } from '../core/constants.js';
/**
 * htmlLegend is a attachable widget that can be added to other dc charts to render horizontal/vertical legend
 * labels.
 *
 * @example
 * ```
 * chart.legend(HtmlLegend().container(legendContainerElement).horizontal(false))
 * ```
 */
export class HtmlLegend {
    constructor() {
        this._htmlLegendDivCssClass = 'dc-html-legend';
        this._legendItemCssClassHorizontal = 'dc-legend-item-horizontal';
        this._legendItemCssClassVertical = 'dc-legend-item-vertical';
        this._parent = undefined;
        this._container = undefined;
        this._legendText = d => d.name;
        this._maxItems = undefined;
        this._horizontal = false;
        this._legendItemClass = undefined;
        this._highlightSelected = false;
    }
    parent(p) {
        if (!arguments.length) {
            return this._parent;
        }
        this._parent = p;
        return this;
    }
    render() {
        const defaultLegendItemCssClass = this._horizontal
            ? this._legendItemCssClassHorizontal
            : this._legendItemCssClassVertical;
        this._container.select(`div.${this._htmlLegendDivCssClass}`).remove();
        const container = this._container.append('div').attr('class', this._htmlLegendDivCssClass);
        container.attr('style', `max-width:${this._container.nodes()[0].style.width}`);
        let legendables = this._parent.legendables();
        const filters = this._parent.filters();
        if (this._maxItems !== undefined) {
            legendables = legendables.slice(0, this._maxItems);
        }
        const legendItemClassName = this._legendItemClass
            ? this._legendItemClass
            : defaultLegendItemCssClass;
        const itemEnter = container
            .selectAll(`div.${legendItemClassName}`)
            .data(legendables)
            .enter()
            .append('div')
            .classed(legendItemClassName, true)
            .on('mouseover', (evt, d) => this._parent.legendHighlight(d))
            .on('mouseout', (evt, d) => this._parent.legendReset(d))
            .on('click', (evt, d) => this._parent.legendToggle(d));
        if (this._highlightSelected) {
            // TODO: fragile code - there may be other types of filters
            itemEnter.classed(constants.SELECTED_CLASS, d => filters.indexOf(d.name) !== -1);
        }
        itemEnter
            .append('span')
            .attr('class', 'dc-legend-item-color')
            .style('background-color', d => d.color);
        itemEnter
            .append('span')
            .attr('class', 'dc-legend-item-label')
            .attr('title', this._legendText)
            .text(this._legendText);
    }
    container(container) {
        if (!arguments.length) {
            return this._container;
        }
        this._container = select(container);
        return this;
    }
    legendItemClass(legendItemClass) {
        if (!arguments.length) {
            return this._legendItemClass;
        }
        this._legendItemClass = legendItemClass;
        return this;
    }
    highlightSelected(highlightSelected) {
        if (!arguments.length) {
            return this._highlightSelected;
        }
        this._highlightSelected = highlightSelected;
        return this;
    }
    horizontal(horizontal) {
        if (!arguments.length) {
            return this._horizontal;
        }
        this._horizontal = horizontal;
        return this;
    }
    legendText(legendText) {
        if (!arguments.length) {
            return this._legendText;
        }
        this._legendText = legendText;
        return this;
    }
    maxItems(maxItems) {
        if (!arguments.length) {
            return this._maxItems;
        }
        this._maxItems = isNumber(maxItems) ? maxItems : undefined;
        return this;
    }
}
//# sourceMappingURL=html-legend.js.map