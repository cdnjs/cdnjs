/* *
 *
 *  (c) 2019-2024 Torstein Honsi
 *
 *  Item series type for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ItemPoint from './ItemPoint.js';
import ItemSeriesDefaults from './ItemSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { pie: PieSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { defined, extend, fireEvent, isNumber, merge, pick } = U;
/* *
 *
 *  Class
 *
 * */
// Inherits pie as the most tested non-cartesian series with individual point
// legend, tooltips etc. Only downside is we need to re-enable marker options.
/**
 * The item series type.
 *
 * @requires module:modules/item-series
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.item
 *
 * @augments Highcharts.seriesTypes.pie
 */
class ItemSeries extends PieSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Fade in the whole chart.
     * @private
     */
    animate(init) {
        const group = this.group;
        if (group) {
            if (init) {
                group.attr({
                    opacity: 0
                });
            }
            else {
                group.animate({
                    opacity: 1
                }, this.options.animation);
            }
        }
    }
    drawDataLabels() {
        if (this.center && this.slots) {
            super.drawDataLabels();
            // Or it's just a dot chart with no natural place to put the data labels
        }
        else {
            for (const point of this.points) {
                point.destroyElements({ dataLabel: 1 });
            }
        }
    }
    drawPoints() {
        const series = this, options = this.options, renderer = series.chart.renderer, seriesMarkerOptions = options.marker, borderWidth = this.borderWidth, crisp = borderWidth % 2 ? 0.5 : 1, rows = this.getRows(), cols = Math.ceil(this.total / rows), cellWidth = this.chart.plotWidth / cols, cellHeight = this.chart.plotHeight / rows, itemSize = this.itemSize || Math.min(cellWidth, cellHeight);
        let i = 0;
        /* @todo: remove if not needed
        this.slots.forEach(slot => {
            this.chart.renderer.circle(slot.x, slot.y, 6)
                .attr({
                    fill: 'silver'
                })
                .add(this.group);
        });
        //*/
        for (const point of series.points) {
            const pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol ||
                seriesMarkerOptions.symbol), r = pick(pointMarkerOptions.radius, seriesMarkerOptions.radius), size = defined(r) ? 2 * r : itemSize, padding = size * options.itemPadding;
            let attr, graphics, pointAttr, x, y, width, height;
            point.graphics = graphics = point.graphics || [];
            if (!series.chart.styledMode) {
                pointAttr = series.pointAttribs(point, point.selected && 'select');
            }
            if (!point.isNull && point.visible) {
                if (!point.graphic) {
                    point.graphic = renderer.g('point')
                        .add(series.group);
                }
                for (let val = 0; val < (point.y || 0); ++val) {
                    // Semi-circle
                    if (series.center && series.slots) {
                        // Fill up the slots from left to right
                        const slot = series.slots.shift();
                        x = slot.x - itemSize / 2;
                        y = slot.y - itemSize / 2;
                    }
                    else if (options.layout === 'horizontal') {
                        x = cellWidth * (i % cols);
                        y = cellHeight * Math.floor(i / cols);
                    }
                    else {
                        x = cellWidth * Math.floor(i / rows);
                        y = cellHeight * (i % rows);
                    }
                    x += padding;
                    y += padding;
                    width = Math.round(size - 2 * padding);
                    height = width;
                    if (series.options.crisp) {
                        x = Math.round(x) - crisp;
                        y = Math.round(y) + crisp;
                    }
                    attr = {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    };
                    if (typeof r !== 'undefined') {
                        attr.r = r;
                    }
                    // Circles attributes update (#17257)
                    if (pointAttr) {
                        extend(attr, pointAttr);
                    }
                    let graphic = graphics[val];
                    if (graphic) {
                        graphic.animate(attr);
                    }
                    else {
                        graphic = renderer
                            .symbol(symbol, void 0, void 0, void 0, void 0, {
                            backgroundSize: 'within'
                        })
                            .attr(attr)
                            .add(point.graphic);
                    }
                    graphic.isActive = true;
                    graphics[val] = graphic;
                    ++i;
                }
            }
            for (let j = 0; j < graphics.length; j++) {
                const graphic = graphics[j];
                if (!graphic) {
                    return;
                }
                if (!graphic.isActive) {
                    graphic.destroy();
                    graphics.splice(j, 1);
                    j--; // Need to subtract 1 after splice, #19053
                }
                else {
                    graphic.isActive = false;
                }
            }
        }
    }
    getRows() {
        const chart = this.chart, total = this.total || 0;
        let rows = this.options.rows, cols, ratio;
        // Get the row count that gives the most square cells
        if (!rows) {
            ratio = chart.plotWidth / chart.plotHeight;
            rows = Math.sqrt(total);
            if (ratio > 1) {
                rows = Math.ceil(rows);
                while (rows > 0) {
                    cols = total / rows;
                    if (cols / rows > ratio) {
                        break;
                    }
                    rows--;
                }
            }
            else {
                rows = Math.floor(rows);
                while (rows < total) {
                    cols = total / rows;
                    if (cols / rows < ratio) {
                        break;
                    }
                    rows++;
                }
            }
        }
        return rows;
    }
    /**
     * Get the semi-circular slots.
     * @private
     */
    getSlots() {
        const series = this, center = series.center, diameter = center[2], slots = series.slots = series.slots || [], fullAngle = (series.endAngleRad - series.startAngleRad), rowsOption = series.options.rows, isCircle = fullAngle % (2 * Math.PI) === 0, total = series.total || 0;
        let innerSize = center[3], x, y, rowRadius, rowLength, colCount, increment, angle, col, itemSize = 0, rowCount, itemCount = Number.MAX_VALUE, finalItemCount, rows, testRows, 
        // How many rows (arcs) should be used
        rowFraction = (diameter - innerSize) / diameter;
        // Increase the itemSize until we find the best fit
        while (itemCount > total + (rows && isCircle ? rows.length : 0)) {
            finalItemCount = itemCount;
            // Reset
            slots.length = 0;
            itemCount = 0;
            // Now rows is the last successful run
            rows = testRows;
            testRows = [];
            itemSize++;
            // Total number of rows (arcs) from the center to the
            // perimeter
            rowCount = diameter / itemSize / 2;
            if (rowsOption) {
                innerSize = ((rowCount - rowsOption) / rowCount) * diameter;
                if (innerSize >= 0) {
                    rowCount = rowsOption;
                    // If innerSize is negative, we are trying to set too
                    // many rows in the rows option, so fall back to
                    // treating it as innerSize 0
                }
                else {
                    innerSize = 0;
                    rowFraction = 1;
                }
            }
            else {
                rowCount = Math.floor(rowCount * rowFraction);
            }
            for (let row = rowCount; row > 0; row--) {
                rowRadius = (innerSize + (row / rowCount) *
                    (diameter - innerSize - itemSize)) / 2;
                rowLength = fullAngle * rowRadius;
                colCount = Math.ceil(rowLength / itemSize);
                testRows.push({
                    rowRadius: rowRadius,
                    rowLength: rowLength,
                    colCount: colCount
                });
                itemCount += colCount + 1;
            }
        }
        if (!rows) {
            return;
        }
        // We now have more slots than we have total items. Loop over
        // the rows and remove the last slot until the count is correct.
        // For each iteration we sort the last slot by the angle, and
        // remove those with the highest angles.
        let overshoot = finalItemCount - series.total -
            (isCircle ? rows.length : 0);
        /**
         * @private
         * @param {Highcharts.ItemRowContainerObject} item
         * Wrapped object with angle and row
         */
        const cutOffRow = (item) => {
            if (overshoot > 0) {
                item.row.colCount--;
                overshoot--;
            }
        };
        while (overshoot > 0) {
            rows
                // Return a simplified representation of the angle of
                // the last slot within each row.
                .map((row) => ({
                angle: row.colCount / row.rowLength,
                row: row
            }))
                // Sort by the angles...
                .sort((a, b) => (b.angle - a.angle))
                // ...so that we can ignore the items with the lowest
                // angles...
                .slice(0, Math.min(overshoot, Math.ceil(rows.length / 2)))
                // ...and remove the ones with the highest angles
                .forEach(cutOffRow);
        }
        for (const row of rows) {
            const rowRadius = row.rowRadius, colCount = row.colCount;
            increment = colCount ? fullAngle / colCount : 0;
            for (col = 0; col <= colCount; col += 1) {
                angle = series.startAngleRad + col * increment;
                x = center[0] + Math.cos(angle) * rowRadius;
                y = center[1] + Math.sin(angle) * rowRadius;
                slots.push({ x: x, y: y, angle: angle });
            }
        }
        // Sort by angle
        slots.sort((a, b) => (a.angle - b.angle));
        series.itemSize = itemSize;
        return slots;
    }
    translate(positions) {
        // Initialize chart without setting data, #13379.
        if (this.total === 0 && // Check if that is a (semi-)circle
            isNumber(this.options.startAngle) &&
            isNumber(this.options.endAngle)) {
            this.center = this.getCenter();
        }
        if (!this.slots) {
            this.slots = [];
        }
        if (isNumber(this.options.startAngle) &&
            isNumber(this.options.endAngle)) {
            super.translate(positions);
            this.slots = this.getSlots();
        }
        else {
            this.generatePoints();
            fireEvent(this, 'afterTranslate');
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
ItemSeries.defaultOptions = merge(PieSeries.defaultOptions, ItemSeriesDefaults);
extend(ItemSeries.prototype, {
    markerAttribs: void 0,
    pointClass: ItemPoint
});
SeriesRegistry.registerSeriesType('item', ItemSeries);
/* *
 *
 *  Default Export
 *
 * */
export default ItemSeries;
