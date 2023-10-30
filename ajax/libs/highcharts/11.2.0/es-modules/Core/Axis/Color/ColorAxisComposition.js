/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from '../../Color/Color.js';
const { parse: color } = Color;
import U from '../../Utilities.js';
const { addEvent, extend, merge, pick, splat } = U;
/* *
 *
 *  Composition
 *
 * */
var ColorAxisComposition;
(function (ColorAxisComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    const composedMembers = [];
    /* *
     *
     *  Variables
     *
     * */
    let ColorAxisConstructor;
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(ColorAxisClass, ChartClass, FxClass, LegendClass, SeriesClass) {
        if (!ColorAxisConstructor) {
            ColorAxisConstructor = ColorAxisClass;
        }
        if (U.pushUnique(composedMembers, ChartClass)) {
            const chartProto = ChartClass.prototype;
            chartProto.collectionsWithUpdate.push('colorAxis');
            chartProto.collectionsWithInit.colorAxis = [
                chartProto.addColorAxis
            ];
            addEvent(ChartClass, 'afterGetAxes', onChartAfterGetAxes);
            wrapChartCreateAxis(ChartClass);
        }
        if (U.pushUnique(composedMembers, FxClass)) {
            const fxProto = FxClass.prototype;
            fxProto.fillSetter = wrapFxFillSetter;
            fxProto.strokeSetter = wrapFxStrokeSetter;
        }
        if (U.pushUnique(composedMembers, LegendClass)) {
            addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
            addEvent(LegendClass, 'afterColorizeItem', onLegendAfterColorizeItem);
            addEvent(LegendClass, 'afterUpdate', onLegendAfterUpdate);
        }
        if (U.pushUnique(composedMembers, SeriesClass)) {
            extend(SeriesClass.prototype, {
                optionalAxis: 'colorAxis',
                translateColors: seriesTranslateColors
            });
            extend(SeriesClass.prototype.pointClass.prototype, {
                setVisible: pointSetVisible
            });
            addEvent(SeriesClass, 'afterTranslate', onSeriesAfterTranslate, { order: 1 });
            addEvent(SeriesClass, 'bindAxes', onSeriesBindAxes);
        }
    }
    ColorAxisComposition.compose = compose;
    /**
     * Extend the chart getAxes method to also get the color axis.
     * @private
     */
    function onChartAfterGetAxes() {
        const options = this.options;
        this.colorAxis = [];
        if (options.colorAxis) {
            options.colorAxis = splat(options.colorAxis);
            options.colorAxis.map((axisOptions) => (new ColorAxisConstructor(this, axisOptions)));
        }
    }
    /**
     * Add the color axis. This also removes the axis' own series to prevent
     * them from showing up individually.
     * @private
     */
    function onLegendAfterGetAllItems(e) {
        const colorAxes = this.chart.colorAxis || [], destroyItem = (item) => {
            const i = e.allItems.indexOf(item);
            if (i !== -1) {
                // #15436
                this.destroyItem(e.allItems[i]);
                e.allItems.splice(i, 1);
            }
        };
        let colorAxisItems = [], options, i;
        colorAxes.forEach(function (colorAxis) {
            options = colorAxis.options;
            if (options && options.showInLegend) {
                // Data classes
                if (options.dataClasses && options.visible) {
                    colorAxisItems = colorAxisItems.concat(colorAxis.getDataClassLegendSymbols());
                    // Gradient legend
                }
                else if (options.visible) {
                    // Add this axis on top
                    colorAxisItems.push(colorAxis);
                }
                // If dataClasses are defined or showInLegend option is not set
                // to true, do not add color axis' series to legend.
                colorAxis.series.forEach(function (series) {
                    if (!series.options.showInLegend || options.dataClasses) {
                        if (series.options.legendType === 'point') {
                            series.points.forEach(function (point) {
                                destroyItem(point);
                            });
                        }
                        else {
                            destroyItem(series);
                        }
                    }
                });
            }
        });
        i = colorAxisItems.length;
        while (i--) {
            e.allItems.unshift(colorAxisItems[i]);
        }
    }
    /**
     * @private
     */
    function onLegendAfterColorizeItem(e) {
        if (e.visible && e.item.legendColor) {
            e.item.legendItem.symbol.attr({
                fill: e.item.legendColor
            });
        }
    }
    /**
     * Updates in the legend need to be reflected in the color axis. (#6888)
     * @private
     */
    function onLegendAfterUpdate(e) {
        this.chart.colorAxis?.forEach((colorAxis) => {
            colorAxis.update({}, e.redraw);
        });
    }
    /**
     * Calculate and set colors for points.
     * @private
     */
    function onSeriesAfterTranslate() {
        if (this.chart.colorAxis &&
            this.chart.colorAxis.length ||
            this.colorAttribs) {
            this.translateColors();
        }
    }
    /**
     * Add colorAxis to series axisTypes.
     * @private
     */
    function onSeriesBindAxes() {
        const axisTypes = this.axisTypes;
        if (!axisTypes) {
            this.axisTypes = ['colorAxis'];
        }
        else if (axisTypes.indexOf('colorAxis') === -1) {
            axisTypes.push('colorAxis');
        }
    }
    /**
     * Set the visibility of a single point
     * @private
     * @function Highcharts.colorPointMixin.setVisible
     * @param {boolean} visible
     */
    function pointSetVisible(vis) {
        const point = this, method = vis ? 'show' : 'hide';
        point.visible = point.options.visible = Boolean(vis);
        // Show and hide associated elements
        ['graphic', 'dataLabel'].forEach(function (key) {
            if (point[key]) {
                point[key][method]();
            }
        });
        this.series.buildKDTree(); // rebuild kdtree #13195
    }
    ColorAxisComposition.pointSetVisible = pointSetVisible;
    /**
     * In choropleth maps, the color is a result of the value, so this needs
     * translation too
     * @private
     * @function Highcharts.colorSeriesMixin.translateColors
     */
    function seriesTranslateColors() {
        const series = this, points = this.data.length ? this.data : this.points, nullColor = this.options.nullColor, colorAxis = this.colorAxis, colorKey = this.colorKey;
        points.forEach((point) => {
            const value = point.getNestedProperty(colorKey), color = point.options.color || (point.isNull || point.value === null ?
                nullColor :
                (colorAxis && typeof value !== 'undefined') ?
                    colorAxis.toColor(value, point) :
                    point.color || series.color);
            if (color && point.color !== color) {
                point.color = color;
                if (series.options.legendType === 'point' &&
                    point.legendItem &&
                    point.legendItem.label) {
                    series.chart.legend.colorizeItem(point, point.visible);
                }
            }
        });
    }
    /**
     * @private
     */
    function wrapChartCreateAxis(ChartClass) {
        const superCreateAxis = ChartClass.prototype.createAxis;
        ChartClass.prototype.createAxis = function (type, options) {
            const chart = this;
            if (type !== 'colorAxis') {
                return superCreateAxis.apply(chart, arguments);
            }
            const axis = new ColorAxisConstructor(chart, merge(options.axis, {
                index: chart[type].length,
                isX: false
            }));
            chart.isDirtyLegend = true;
            // Clear before 'bindAxes' (#11924)
            chart.axes.forEach((axis) => {
                axis.series = [];
            });
            chart.series.forEach((series) => {
                series.bindAxes();
                series.isDirtyData = true;
            });
            if (pick(options.redraw, true)) {
                chart.redraw(options.animation);
            }
            return axis;
        };
    }
    /**
     * Handle animation of the color attributes directly.
     * @private
     */
    function wrapFxFillSetter() {
        this.elem.attr('fill', color(this.start).tweenTo(color(this.end), this.pos), void 0, true);
    }
    /**
     * Handle animation of the color attributes directly.
     * @private
     */
    function wrapFxStrokeSetter() {
        this.elem.attr('stroke', color(this.start).tweenTo(color(this.end), this.pos), void 0, true);
    }
})(ColorAxisComposition || (ColorAxisComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ColorAxisComposition;
