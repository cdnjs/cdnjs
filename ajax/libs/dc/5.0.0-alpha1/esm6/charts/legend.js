import { isNumber } from '../core/utils.js';
import { constants } from '../core/constants.js';
const LABEL_GAP = 2;
/**
 * Legend is a attachable widget that can be added to other dc charts to render horizontal legend
 * labels.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ | Nasdaq 100 Index}
 * - {@link http://dc-js.github.com/dc.js/crime/index.html | Canadian City Crime Stats}
 * @example
 * ```
 * chart.legend(new Legend().x(400).y(10).itemHeight(13).gap(5))
 * ```
 */
export class Legend {
    constructor() {
        this._parent = undefined;
        this._x = 0;
        this._y = 0;
        this._itemHeight = 12;
        this._gap = 5;
        this._horizontal = false;
        this._legendWidth = 560;
        this._itemWidth = 70;
        this._autoItemWidth = false;
        this._legendText = d => d.name;
        this._maxItems = undefined;
        this._highlightSelected = false;
        this._g = undefined;
    }
    parent(p) {
        if (!arguments.length) {
            return this._parent;
        }
        this._parent = p;
        return this;
    }
    x(x) {
        if (!arguments.length) {
            return this._x;
        }
        this._x = x;
        return this;
    }
    y(y) {
        if (!arguments.length) {
            return this._y;
        }
        this._y = y;
        return this;
    }
    gap(gap) {
        if (!arguments.length) {
            return this._gap;
        }
        this._gap = gap;
        return this;
    }
    highlightSelected(highlightSelected) {
        if (!arguments.length) {
            return this._highlightSelected;
        }
        this._highlightSelected = highlightSelected;
        return this;
    }
    itemHeight(itemHeight) {
        if (!arguments.length) {
            return this._itemHeight;
        }
        this._itemHeight = itemHeight;
        return this;
    }
    horizontal(horizontal) {
        if (!arguments.length) {
            return this._horizontal;
        }
        this._horizontal = horizontal;
        return this;
    }
    legendWidth(legendWidth) {
        if (!arguments.length) {
            return this._legendWidth;
        }
        this._legendWidth = legendWidth;
        return this;
    }
    itemWidth(itemWidth) {
        if (!arguments.length) {
            return this._itemWidth;
        }
        this._itemWidth = itemWidth;
        return this;
    }
    autoItemWidth(autoItemWidth) {
        if (!arguments.length) {
            return this._autoItemWidth;
        }
        this._autoItemWidth = autoItemWidth;
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
    // Implementation methods
    _legendItemHeight() {
        return this._gap + this._itemHeight;
    }
    render() {
        this._parent.svg().select('g.dc-legend').remove();
        this._g = this._parent
            .svg()
            .append('g')
            .attr('class', 'dc-legend')
            .attr('transform', `translate(${this._x},${this._y})`);
        let legendables = this._parent.legendables();
        const filters = this._parent.filters();
        if (this._maxItems !== undefined) {
            legendables = legendables.slice(0, this._maxItems);
        }
        const itemEnter = this._g
            .selectAll('g.dc-legend-item')
            .data(legendables)
            .enter()
            .append('g')
            .attr('class', 'dc-legend-item')
            .on('mouseover', (evt, d) => {
            this._parent.legendHighlight(d);
        })
            .on('mouseout', (evt, d) => {
            this._parent.legendReset(d);
        })
            .on('click', (evt, d) => {
            d.chart.legendToggle(d);
        });
        if (this._highlightSelected) {
            // TODO: fragile code - there may be other types of filters
            itemEnter.classed(constants.SELECTED_CLASS, d => filters.indexOf(d.name) !== -1);
        }
        this._g
            .selectAll('g.dc-legend-item')
            .classed('fadeout', d => d.chart.isLegendableHidden(d));
        if (legendables.some(d => d.dashstyle)) {
            itemEnter
                .append('line')
                .attr('x1', 0)
                .attr('y1', this._itemHeight / 2)
                .attr('x2', this._itemHeight)
                .attr('y2', this._itemHeight / 2)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', d => d.dashstyle)
                .attr('stroke', d => d.color);
        }
        else {
            itemEnter
                .append('rect')
                .attr('width', this._itemHeight)
                .attr('height', this._itemHeight)
                .attr('fill', d => (d ? d.color : 'blue'));
        }
        {
            const self = this;
            itemEnter
                .append('text')
                .text(self._legendText)
                .attr('x', self._itemHeight + LABEL_GAP)
                .attr('y', function () {
                const clientHeight = this.getBoundingClientRect().height || 13;
                return self._itemHeight / 2 + clientHeight / 2 - 2;
            });
        }
        let cumulativeLegendTextWidth = 0;
        let row = 0;
        {
            const self = this;
            itemEnter.attr('transform', function (d, i) {
                if (self._horizontal) {
                    const itemWidth = self._autoItemWidth === true
                        ? this.getBBox().width + self._gap
                        : self._itemWidth;
                    if (cumulativeLegendTextWidth + itemWidth > self._legendWidth &&
                        cumulativeLegendTextWidth > 0) {
                        ++row;
                        cumulativeLegendTextWidth = 0;
                    }
                    const translateBy = `translate(${cumulativeLegendTextWidth},${row * self._legendItemHeight()})`;
                    cumulativeLegendTextWidth += itemWidth;
                    return translateBy;
                }
                else {
                    return `translate(0,${i * self._legendItemHeight()})`;
                }
            });
        }
    }
}
//# sourceMappingURL=legend.js.map