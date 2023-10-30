/* *
 *
 *  (c) 2010-2021 Paweł Dalek
 *
 *  Volume By Price (VBP) indicator for Highcharts Stock
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import VBPPoint from './VBPPoint.js';
import A from '../../../Core/Animation/AnimationUtilities.js';
const { animObject } = A;
import H from '../../../Core/Globals.js';
const { noop } = H;
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { column: { prototype: columnProto }, sma: SMAIndicator } = SeriesRegistry.seriesTypes;
import U from '../../../Core/Utilities.js';
import StockChart from '../../../Core/Chart/StockChart.js';
const { addEvent, arrayMax, arrayMin, correctFloat, defined, error, extend, isArray, merge } = U;
/* *
 *
 *  Constants
 *
 * */
const abs = Math.abs;
/* *
 *
 *  Functions
 *
 * */
// Utils
/**
 * @private
 */
function arrayExtremesOHLC(data) {
    const dataLength = data.length;
    let min = data[0][3], max = min, i = 1, currentPoint;
    for (; i < dataLength; i++) {
        currentPoint = data[i][3];
        if (currentPoint < min) {
            min = currentPoint;
        }
        if (currentPoint > max) {
            max = currentPoint;
        }
    }
    return {
        min: min,
        max: max
    };
}
/* *
 *
 *  Class
 *
 * */
/**
 * The Volume By Price (VBP) series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.vbp
 *
 * @augments Highcharts.Series
 */
class VBPIndicator extends SMAIndicator {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.negWidths = void 0;
        this.options = void 0;
        this.points = void 0;
        this.posWidths = void 0;
        this.priceZones = void 0;
        this.rangeStep = void 0;
        this.volumeDataArray = void 0;
        this.zoneStarts = void 0;
        this.zoneLinesSVG = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    init(chart, options) {
        const indicator = this;
        // series.update() sends data that is not necessary
        // as everything is calculated in getValues(), #17007
        delete options.data;
        super.init.apply(indicator, arguments);
        // Only after series are linked add some additional logic/properties.
        const unbinder = addEvent(StockChart, 'afterLinkSeries', function () {
            // Protection for a case where the indicator is being updated,
            // for a brief moment the indicator is deleted.
            if (indicator.options) {
                const params = indicator.options.params, baseSeries = indicator.linkedParent, volumeSeries = chart.get(params.volumeSeriesID);
                indicator.addCustomEvents(baseSeries, volumeSeries);
            }
            unbinder();
        }, {
            order: 1
        });
        return indicator;
    }
    // Adds events related with removing series
    addCustomEvents(baseSeries, volumeSeries) {
        const indicator = this, toEmptyIndicator = () => {
            indicator.chart.redraw();
            indicator.setData([]);
            indicator.zoneStarts = [];
            if (indicator.zoneLinesSVG) {
                indicator.zoneLinesSVG = indicator.zoneLinesSVG.destroy();
            }
        };
        // If base series is deleted, indicator series data is filled with
        // an empty array
        indicator.dataEventsToUnbind.push(addEvent(baseSeries, 'remove', function () {
            toEmptyIndicator();
        }));
        // If volume series is deleted, indicator series data is filled with
        // an empty array
        if (volumeSeries) {
            indicator.dataEventsToUnbind.push(addEvent(volumeSeries, 'remove', function () {
                toEmptyIndicator();
            }));
        }
        return indicator;
    }
    // Initial animation
    animate(init) {
        const series = this, inverted = series.chart.inverted, group = series.group, attr = {};
        if (!init && group) {
            const position = inverted ? series.yAxis.top : series.xAxis.left;
            if (inverted) {
                group['forceAnimate:translateY'] = true;
                attr.translateY = position;
            }
            else {
                group['forceAnimate:translateX'] = true;
                attr.translateX = position;
            }
            group.animate(attr, extend(animObject(series.options.animation), {
                step: function (val, fx) {
                    series.group.attr({
                        scaleX: Math.max(0.001, fx.pos)
                    });
                }
            }));
        }
    }
    drawPoints() {
        const indicator = this;
        if (indicator.options.volumeDivision.enabled) {
            indicator.posNegVolume(true, true);
            columnProto.drawPoints.apply(indicator, arguments);
            indicator.posNegVolume(false, false);
        }
        columnProto.drawPoints.apply(indicator, arguments);
    }
    // Function responsible for dividing volume into positive and negative
    posNegVolume(initVol, pos) {
        const indicator = this, signOrder = pos ?
            ['positive', 'negative'] :
            ['negative', 'positive'], volumeDivision = indicator.options.volumeDivision, pointLength = indicator.points.length;
        let posWidths = [], negWidths = [], i = 0, pointWidth, priceZone, wholeVol, point;
        if (initVol) {
            indicator.posWidths = posWidths;
            indicator.negWidths = negWidths;
        }
        else {
            posWidths = indicator.posWidths;
            negWidths = indicator.negWidths;
        }
        for (; i < pointLength; i++) {
            point = indicator.points[i];
            point[signOrder[0] + 'Graphic'] = point.graphic;
            point.graphic = point[signOrder[1] + 'Graphic'];
            if (initVol) {
                pointWidth = point.shapeArgs.width;
                priceZone = indicator.priceZones[i];
                wholeVol = priceZone.wholeVolumeData;
                if (wholeVol) {
                    posWidths.push(pointWidth / wholeVol * priceZone.positiveVolumeData);
                    negWidths.push(pointWidth / wholeVol * priceZone.negativeVolumeData);
                }
                else {
                    posWidths.push(0);
                    negWidths.push(0);
                }
            }
            point.color = pos ?
                volumeDivision.styles.positiveColor :
                volumeDivision.styles.negativeColor;
            point.shapeArgs.width = pos ?
                indicator.posWidths[i] :
                indicator.negWidths[i];
            point.shapeArgs.x = pos ?
                point.shapeArgs.x :
                indicator.posWidths[i];
        }
    }
    translate() {
        const indicator = this, options = indicator.options, chart = indicator.chart, yAxis = indicator.yAxis, yAxisMin = yAxis.min, zoneLinesOptions = indicator.options.zoneLines, priceZones = (indicator.priceZones);
        let yBarOffset = 0, volumeDataArray, maxVolume, primalBarWidth, barHeight, barHeightP, oldBarHeight, barWidth, pointPadding, chartPlotTop, barX, barY;
        columnProto.translate.apply(indicator);
        const indicatorPoints = indicator.points;
        // Do translate operation when points exist
        if (indicatorPoints.length) {
            pointPadding = options.pointPadding < 0.5 ?
                options.pointPadding :
                0.1;
            volumeDataArray = indicator.volumeDataArray;
            maxVolume = arrayMax(volumeDataArray);
            primalBarWidth = chart.plotWidth / 2;
            chartPlotTop = chart.plotTop;
            barHeight = abs(yAxis.toPixels(yAxisMin) -
                yAxis.toPixels(yAxisMin + indicator.rangeStep));
            oldBarHeight = abs(yAxis.toPixels(yAxisMin) -
                yAxis.toPixels(yAxisMin + indicator.rangeStep));
            if (pointPadding) {
                barHeightP = abs(barHeight * (1 - 2 * pointPadding));
                yBarOffset = abs((barHeight - barHeightP) / 2);
                barHeight = abs(barHeightP);
            }
            indicatorPoints.forEach(function (point, index) {
                barX = point.barX = point.plotX = 0;
                barY = point.plotY = (yAxis.toPixels(priceZones[index].start) -
                    chartPlotTop -
                    (yAxis.reversed ?
                        (barHeight - oldBarHeight) :
                        barHeight) -
                    yBarOffset);
                barWidth = correctFloat(primalBarWidth *
                    priceZones[index].wholeVolumeData / maxVolume);
                point.pointWidth = barWidth;
                point.shapeArgs = indicator.crispCol.apply(// eslint-disable-line no-useless-call
                indicator, [barX, barY, barWidth, barHeight]);
                point.volumeNeg = priceZones[index].negativeVolumeData;
                point.volumePos = priceZones[index].positiveVolumeData;
                point.volumeAll = priceZones[index].wholeVolumeData;
            });
            if (zoneLinesOptions.enabled) {
                indicator.drawZones(chart, yAxis, indicator.zoneStarts, zoneLinesOptions.styles);
            }
        }
    }
    getExtremes() {
        const prevCompare = this.options.compare, prevCumulative = this.options.cumulative;
        let ret;
        // Temporarily disable cumulative and compare while getting the extremes
        if (this.options.compare) {
            this.options.compare = void 0;
            ret = super.getExtremes();
            this.options.compare = prevCompare;
        }
        else if (this.options.cumulative) {
            this.options.cumulative = false;
            ret = super.getExtremes();
            this.options.cumulative = prevCumulative;
        }
        else {
            ret = super.getExtremes();
        }
        return ret;
    }
    getValues(series, params) {
        const indicator = this, xValues = series.processedXData, yValues = series.processedYData, chart = indicator.chart, ranges = params.ranges, VBP = [], xData = [], yData = [], volumeSeries = chart.get(params.volumeSeriesID);
        // Checks if base series exists
        if (!series.chart) {
            error('Base series not found! In case it has been removed, add ' +
                'a new one.', true, chart);
            return;
        }
        // Checks if volume series exists and if it has data
        if (!volumeSeries ||
            !volumeSeries.processedXData.length) {
            const errorMessage = volumeSeries && !volumeSeries.processedXData.length ?
                ' does not contain any data.' :
                ' not found! Check `volumeSeriesID`.';
            error('Series ' +
                params.volumeSeriesID + errorMessage, true, chart);
            return;
        }
        // Checks if series data fits the OHLC format
        const isOHLC = isArray(yValues[0]);
        if (isOHLC && yValues[0].length !== 4) {
            error('Type of ' +
                series.name +
                ' series is different than line, OHLC or candlestick.', true, chart);
            return;
        }
        // Price zones contains all the information about the zones (index,
        // start, end, volumes, etc.)
        const priceZones = indicator.priceZones = indicator.specifyZones(isOHLC, xValues, yValues, ranges, volumeSeries);
        priceZones.forEach(function (zone, index) {
            VBP.push([zone.x, zone.end]);
            xData.push(VBP[index][0]);
            yData.push(VBP[index][1]);
        });
        return {
            values: VBP,
            xData: xData,
            yData: yData
        };
    }
    // Specifing where each zone should start ans end
    specifyZones(isOHLC, xValues, yValues, ranges, volumeSeries) {
        const indicator = this, rangeExtremes = (isOHLC ? arrayExtremesOHLC(yValues) : false), zoneStarts = indicator.zoneStarts = [], priceZones = [];
        let lowRange = rangeExtremes ?
            rangeExtremes.min :
            arrayMin(yValues), highRange = rangeExtremes ?
            rangeExtremes.max :
            arrayMax(yValues), i = 0, j = 1;
        // If the compare mode is set on the main series, change the VBP
        // zones to fit new extremes, #16277.
        const mainSeries = indicator.linkedParent;
        if (!indicator.options.compareToMain &&
            mainSeries.dataModify) {
            lowRange = mainSeries.dataModify.modifyValue(lowRange);
            highRange = mainSeries.dataModify.modifyValue(highRange);
        }
        if (!defined(lowRange) || !defined(highRange)) {
            if (this.points.length) {
                this.setData([]);
                this.zoneStarts = [];
                if (this.zoneLinesSVG) {
                    this.zoneLinesSVG = this.zoneLinesSVG.destroy();
                }
            }
            return [];
        }
        const rangeStep = indicator.rangeStep =
            correctFloat(highRange - lowRange) / ranges;
        zoneStarts.push(lowRange);
        for (; i < ranges - 1; i++) {
            zoneStarts.push(correctFloat(zoneStarts[i] + rangeStep));
        }
        zoneStarts.push(highRange);
        const zoneStartsLength = zoneStarts.length;
        //    Creating zones
        for (; j < zoneStartsLength; j++) {
            priceZones.push({
                index: j - 1,
                x: xValues[0],
                start: zoneStarts[j - 1],
                end: zoneStarts[j]
            });
        }
        return indicator.volumePerZone(isOHLC, priceZones, volumeSeries, xValues, yValues);
    }
    // Calculating sum of volume values for a specific zone
    volumePerZone(isOHLC, priceZones, volumeSeries, xValues, yValues) {
        const indicator = this, volumeXData = volumeSeries.processedXData, volumeYData = volumeSeries.processedYData, lastZoneIndex = priceZones.length - 1, baseSeriesLength = yValues.length, volumeSeriesLength = volumeYData.length;
        let previousValue, startFlag, endFlag, value, i;
        // Checks if each point has a corresponding volume value
        if (abs(baseSeriesLength - volumeSeriesLength)) {
            // If the first point don't have volume, add 0 value at the
            // beggining of the volume array
            if (xValues[0] !== volumeXData[0]) {
                volumeYData.unshift(0);
            }
            // If the last point don't have volume, add 0 value at the end
            // of the volume array
            if (xValues[baseSeriesLength - 1] !==
                volumeXData[volumeSeriesLength - 1]) {
                volumeYData.push(0);
            }
        }
        indicator.volumeDataArray = [];
        priceZones.forEach(function (zone) {
            zone.wholeVolumeData = 0;
            zone.positiveVolumeData = 0;
            zone.negativeVolumeData = 0;
            for (i = 0; i < baseSeriesLength; i++) {
                startFlag = false;
                endFlag = false;
                value = isOHLC ? yValues[i][3] : yValues[i];
                previousValue = i ?
                    (isOHLC ?
                        yValues[i - 1][3] :
                        yValues[i - 1]) :
                    value;
                // If the compare mode is set on the main series,
                // change the VBP zones to fit new extremes, #16277.
                const mainSeries = indicator.linkedParent;
                if (!indicator.options.compareToMain &&
                    mainSeries.dataModify) {
                    value = mainSeries.dataModify.modifyValue(value);
                    previousValue = mainSeries.dataModify
                        .modifyValue(previousValue);
                }
                // Checks if this is the point with the
                // lowest close value and if so, adds it calculations
                if (value <= zone.start && zone.index === 0) {
                    startFlag = true;
                }
                // Checks if this is the point with the highest
                // close value and if so, adds it calculations
                if (value >= zone.end && zone.index === lastZoneIndex) {
                    endFlag = true;
                }
                if ((value > zone.start || startFlag) &&
                    (value < zone.end || endFlag)) {
                    zone.wholeVolumeData += volumeYData[i];
                    if (previousValue > value) {
                        zone.negativeVolumeData += volumeYData[i];
                    }
                    else {
                        zone.positiveVolumeData += volumeYData[i];
                    }
                }
            }
            indicator.volumeDataArray.push(zone.wholeVolumeData);
        });
        return priceZones;
    }
    // Function responsoble for drawing additional lines indicating zones
    drawZones(chart, yAxis, zonesValues, zonesStyles) {
        const indicator = this, renderer = chart.renderer, leftLinePos = 0, rightLinePos = chart.plotWidth, verticalOffset = chart.plotTop;
        let zoneLinesSVG = indicator.zoneLinesSVG, zoneLinesPath = [], verticalLinePos;
        zonesValues.forEach(function (value) {
            verticalLinePos = yAxis.toPixels(value) - verticalOffset;
            zoneLinesPath = zoneLinesPath.concat(chart.renderer.crispLine([[
                    'M',
                    leftLinePos,
                    verticalLinePos
                ], [
                    'L',
                    rightLinePos,
                    verticalLinePos
                ]], zonesStyles.lineWidth));
        });
        // Create zone lines one path or update it while animating
        if (zoneLinesSVG) {
            zoneLinesSVG.animate({
                d: zoneLinesPath
            });
        }
        else {
            zoneLinesSVG = indicator.zoneLinesSVG =
                renderer
                    .path(zoneLinesPath)
                    .attr({
                    'stroke-width': zonesStyles.lineWidth,
                    'stroke': zonesStyles.color,
                    'dashstyle': zonesStyles.dashStyle,
                    'zIndex': indicator.group.zIndex + 0.1
                })
                    .add(indicator.group);
        }
    }
}
/**
 * Volume By Price indicator.
 *
 * This series requires `linkedTo` option to be set.
 *
 * @sample stock/indicators/volume-by-price
 *         Volume By Price indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/volume-by-price
 * @optionparent plotOptions.vbp
 */
VBPIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index, period
     */
    params: {
        // Index and period are unchangeable, do not inherit (#15362)
        index: void 0,
        period: void 0,
        /**
         * The number of price zones.
         */
        ranges: 12,
        /**
         * The id of volume series which is mandatory. For example using
         * OHLC data, volumeSeriesID='volume' means the indicator will be
         * calculated using OHLC and volume values.
         */
        volumeSeriesID: 'volume'
    },
    /**
     * The styles for lines which determine price zones.
     */
    zoneLines: {
        /**
         * Enable/disable zone lines.
         */
        enabled: true,
        /**
         * Specify the style of zone lines.
         *
         * @type    {Highcharts.CSSObject}
         * @default {"color": "#0A9AC9", "dashStyle": "LongDash", "lineWidth": 1}
         */
        styles: {
            /** @ignore-option */
            color: '#0A9AC9',
            /** @ignore-option */
            dashStyle: 'LongDash',
            /** @ignore-option */
            lineWidth: 1
        }
    },
    /**
     * The styles for bars when volume is divided into positive/negative.
     */
    volumeDivision: {
        /**
         * Option to control if volume is divided.
         */
        enabled: true,
        styles: {
            /**
             * Color of positive volume bars.
             *
             * @type {Highcharts.ColorString}
             */
            positiveColor: 'rgba(144, 237, 125, 0.8)',
            /**
             * Color of negative volume bars.
             *
             * @type {Highcharts.ColorString}
             */
            negativeColor: 'rgba(244, 91, 91, 0.8)'
        }
    },
    // To enable series animation; must be animationLimit > pointCount
    animationLimit: 1000,
    enableMouseTracking: false,
    pointPadding: 0,
    zIndex: -1,
    crisp: true,
    dataGrouping: {
        enabled: false
    },
    dataLabels: {
        allowOverlap: true,
        enabled: true,
        format: 'P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}',
        padding: 0,
        style: {
            /** @internal */
            fontSize: '0.5em'
        },
        verticalAlign: 'top'
    }
});
extend(VBPIndicator.prototype, {
    nameBase: 'Volume by Price',
    nameComponents: ['ranges'],
    calculateOn: {
        chart: 'render',
        xAxis: 'afterSetExtremes'
    },
    pointClass: VBPPoint,
    markerAttribs: noop,
    drawGraph: noop,
    getColumnMetrics: columnProto.getColumnMetrics,
    crispCol: columnProto.crispCol
});
SeriesRegistry.registerSeriesType('vbp', VBPIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default VBPIndicator;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `Volume By Price (VBP)` series. If the [type](#series.vbp.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.vbp
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL, compare, compareBase, compareStart
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/volume-by-price
 * @apioption series.vbp
 */
''; // to include the above in the js output
