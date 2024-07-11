/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * Item series type for Highcharts
 *
 * (c) 2019 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/item-series', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/Item/ItemPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
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
        const { series: { prototype: { pointClass: Point } }, seriesTypes: { pie: { prototype: { pointClass: PiePoint } } } } = SeriesRegistry;
        const { extend } = U;
        /* *
         *
         *  Class
         *
         * */
        class ItemPoint extends PiePoint {
        }
        extend(ItemPoint.prototype, {
            haloPath: Point.prototype.haloPath
        });
        /* *
         *
         *  Default Export
         *
         * */

        return ItemPoint;
    });
    _registerModule(_modules, 'Series/Item/ItemSeriesDefaults.js', [_modules['Core/Series/SeriesDefaults.js'], _modules['Core/Utilities.js']], function (SeriesDefaults, U) {
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
        const { merge } = U;
        /* *
         *
         *  API Options
         *
         * */
        /**
         * An item chart is an infographic chart where a number of items are laid
         * out in either a rectangular or circular pattern. It can be used to
         * visualize counts within a group, or for the circular pattern, typically
         * a parliament.
         *
         * The circular layout has much in common with a pie chart. Many of the item
         * series options, like `center`, `size` and data label positioning, are
         * inherited from the pie series and don't apply for rectangular layouts.
         *
         * @sample       highcharts/demo/parliament-chart
         *               Parliament chart (circular item chart)
         * @sample       highcharts/series-item/rectangular
         *               Rectangular item chart
         * @sample       highcharts/series-item/symbols
         *               Infographic with symbols
         *
         * @extends      plotOptions.pie
         * @since        7.1.0
         * @product      highcharts
         * @excluding    borderColor, borderWidth, depth, linecap, shadow,
         *               slicedOffset
         * @requires     modules/item-series
         * @optionparent plotOptions.item
         */
        const ItemSeriesDefaults = {
            /**
             * In circular view, the end angle of the item layout, in degrees where
             * 0 is up.
             *
             * @sample highcharts/demo/parliament-chart
             *         Parliament chart
             * @type {undefined|number}
             */
            endAngle: void 0,
            /**
             * In circular view, the size of the inner diameter of the circle. Can
             * be a percentage or pixel value. Percentages are relative to the outer
             * perimeter. Pixel values are given as integers.
             *
             * If the `rows` option is set, it overrides the `innerSize` setting.
             *
             * @sample highcharts/demo/parliament-chart
             *         Parliament chart
             * @type {string|number}
             */
            innerSize: '40%',
            /**
             * The padding between the items, given in relative size where the size
             * of the item is 1.
             * @type {number}
             */
            itemPadding: 0.1,
            /**
             * The layout of the items in rectangular view. Can be either
             * `horizontal` or `vertical`.
             * @sample highcharts/series-item/symbols
             *         Horizontal layout
             * @type {string}
             */
            layout: 'vertical',
            /**
             * @extends plotOptions.series.marker
             */
            marker: merge(SeriesDefaults.marker, {
                radius: null
            }),
            /**
             * The number of rows to display in the rectangular or circular view. If
             * the `innerSize` is set, it will be overridden by the `rows` setting.
             *
             * @sample highcharts/series-item/rows-columns
             *         Fixed row count
             * @type {number}
             */
            rows: void 0,
            crisp: false,
            showInLegend: true,
            /**
             * In circular view, the start angle of the item layout, in degrees
             * where 0 is up.
             *
             * @sample highcharts/demo/parliament-chart
             *         Parliament chart
             * @type {undefined|number}
             */
            startAngle: void 0
        };
        /**
         * An `item` series. If the [type](#series.item.type) option is not specified,
         * it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.item
         * @excluding dataParser, dataURL, stack, xAxis, yAxis, dataSorting,
         *            boostThreshold, boostBlending
         * @product   highcharts
         * @requires  modules/item-series
         * @apioption series.item
         */
        /**
         * An array of data points for the series. For the `item` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.item.turboThreshold),
         *    this option is not available.
         *    ```js
         *    data: [{
         *        y: 1,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        y: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|Array<string,(number|null)>|null|*>}
         * @extends   series.pie.data
         * @exclude   sliced
         * @product   highcharts
         * @apioption series.item.data
         */
        /**
         * The sequential index of the data point in the legend.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.pie.data.legendIndex
         */
        /**
         * @excluding legendItemClick
         * @apioption series.item.events
         */
        ''; // Keeps the doclets above separate
        /* *
         *
         *  Default Export
         *
         * */

        return ItemSeriesDefaults;
    });
    _registerModule(_modules, 'Series/Item/ItemSeries.js', [_modules['Series/Item/ItemPoint.js'], _modules['Series/Item/ItemSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ItemPoint, ItemSeriesDefaults, SeriesRegistry, U) {
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
        const { pie: PieSeries } = SeriesRegistry.seriesTypes;
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
         * @requires modules/item-series
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

        return ItemSeries;
    });
    _registerModule(_modules, 'masters/modules/item-series.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
