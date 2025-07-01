/* *
 *
 *  Authors: Rafal Sebestjanski and Pawel Lysy
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Annotation from '../Annotation.js';
import CrookedLine from './CrookedLine.js';
import D from '../../../Core/Defaults.js';
const { defaultOptions } = D;
import ControlPoint from '../ControlPoint.js';
import U from '../../../Core/Utilities.js';
const { merge, isNumber, defined } = U;
if (defaultOptions.annotations) {
    defaultOptions.annotations.types.timeCycles = merge(defaultOptions.annotations.types.crookedLine, 
    /**
     * Options for the  time cycles annotation type.
     *
     * @sample highcharts/annotations-advanced/time-cycles/
     *         Time Cycles annotation
     *
     * @extends      annotations.types.crookedLine
     * @product      highstock
     * @exclude      labelOptions
     * @optionparent annotations.types.timeCycles
     */
    {
        typeOptions: {
            /**
             * @exclude   y
             * @product   highstock
             * @apioption annotations.types.timeCycles.typeOptions.points
             */
            controlPointOptions: [{
                    positioner: function (target) {
                        const point = target.points[0], position = target.anchor(point).absolutePosition;
                        return {
                            x: position.x - (this.graphic.width || 0) / 2,
                            y: target.y - (this.graphic.height || 0)
                        };
                    },
                    events: {
                        drag: function (e, target) {
                            const position = target.anchor(target.points[0]).absolutePosition;
                            target.translatePoint(e.chartX - position.x, 0, 0);
                            target.redraw(false);
                        }
                    }
                }, {
                    positioner: function (target) {
                        const point = target.points[1], position = target.anchor(point).absolutePosition;
                        return {
                            x: position.x - (this.graphic.width || 0) / 2,
                            y: target.y - (this.graphic.height || 0)
                        };
                    },
                    events: {
                        drag: function (e, target) {
                            const position = target.anchor(target.points[1]).absolutePosition;
                            target.translatePoint(e.chartX - position.x, 0, 1);
                            target.redraw(false);
                        }
                    }
                }]
        }
    });
}
/* *
 *
 *  Functions
 *
 * */
/**
 * Function to create start of the path.
 * @param {number} x x position of the TimeCycles
 * @param {number} y y position of the TimeCycles
 * @return {string} path
 */
function getStartingPath(x, y) {
    return ['M', x, y];
}
/**
 * Function which generates the path of the halfcircle.
 *
 * @param {number} pixelInterval diameter of the circle in pixels
 * @param {number} numberOfCircles number of cricles
 * @param {number} startX x position of the first circle
 * @param {number} y y position of the bottom of the timeCycles
 * @return {string} path
 *
 */
function getCirclePath(pixelInterval, numberOfCircles, startX, y) {
    const path = [];
    for (let i = 1; i <= numberOfCircles; i++) {
        path.push([
            'A',
            pixelInterval / 2,
            pixelInterval / 2,
            0,
            1,
            1,
            startX + i * pixelInterval,
            y
        ]);
    }
    return path;
}
/* *
 *
 *  Class
 *
 * */
class TimeCycles extends CrookedLine {
    /* *
     *
     *  Functions
     *
     * */
    init(annotation, userOptions, index) {
        if (defined(userOptions.yAxis)) {
            userOptions.points.forEach((point) => {
                point.yAxis = userOptions.yAxis;
            });
        }
        if (defined(userOptions.xAxis)) {
            userOptions.points.forEach((point) => {
                point.xAxis = userOptions.xAxis;
            });
        }
        super.init(annotation, userOptions, index);
    }
    setPath() {
        this.shapes[0].options.d = this.getPath();
    }
    getPath() {
        return [getStartingPath(this.startX, this.y)].concat(getCirclePath(this.pixelInterval, this.numberOfCircles, this.startX, this.y));
    }
    addShapes() {
        const typeOptions = this.options.typeOptions;
        this.setPathProperties();
        const shape = this.initShape(merge(typeOptions.line, {
            type: 'path',
            d: this.getPath(),
            points: this.options.points,
            className: 'highcharts-timecycles-lines'
        }), 0);
        typeOptions.line = shape.options;
    }
    addControlPoints() {
        const options = this.options, typeOptions = options.typeOptions;
        options.controlPointOptions.style.cursor = this.chart.inverted ?
            'ns-resize' :
            'ew-resize';
        typeOptions.controlPointOptions.forEach((option) => {
            const controlPointsOptions = merge(options.controlPointOptions, option);
            const controlPoint = new ControlPoint(this.chart, this, controlPointsOptions, 0);
            this.controlPoints.push(controlPoint);
        });
    }
    setPathProperties() {
        const options = this.options.typeOptions, points = options.points;
        if (!points) {
            return;
        }
        const point1 = points[0], point2 = points[1], xAxisNumber = options.xAxis || 0, yAxisNumber = options.yAxis || 0, xAxis = this.chart.xAxis[xAxisNumber], yAxis = this.chart.yAxis[yAxisNumber], xValue1 = point1.x, yValue = point1.y, xValue2 = point2.x;
        if (!xValue1 || !xValue2) {
            return;
        }
        const y = isNumber(yValue) ?
            yAxis.toPixels(yValue) :
            yAxis.top + yAxis.height, x = isNumber(xValue1) ? xAxis.toPixels(xValue1) : xAxis.left, x2 = isNumber(xValue2) ? xAxis.toPixels(xValue2) : xAxis.left + 30, xAxisLength = xAxis.len, pixelInterval = Math.round(Math.max(Math.abs(x2 - x), 2)), 
        // There can be 2 not full circles on the chart, so add 2.
        numberOfCircles = Math.floor(xAxisLength / pixelInterval) + 2, 
        // Calculate where the annotation should start drawing relative to
        // first point.
        pixelShift = (Math.floor((x - xAxis.left) / pixelInterval) + 1) * pixelInterval;
        this.startX = x - pixelShift;
        this.y = y;
        this.pixelInterval = pixelInterval;
        this.numberOfCircles = numberOfCircles;
    }
    redraw(animation) {
        this.setPathProperties();
        this.setPath();
        super.redraw(animation);
    }
}
Annotation.types.timeCycles = TimeCycles;
/* *
 *
 *  Default Export
 *
 * */
export default TimeCycles;
