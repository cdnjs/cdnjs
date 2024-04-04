/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Annotation from '../Annotation.js';
import MockPoint from '../MockPoint.js';
import Tunnel from './Tunnel.js';
import U from '../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function createPathDGenerator(retracementIndex, isBackground) {
    return function () {
        const annotation = this.annotation;
        if (!annotation.startRetracements || !annotation.endRetracements) {
            return [];
        }
        const leftTop = this.anchor(annotation.startRetracements[retracementIndex]).absolutePosition, rightTop = this.anchor(annotation.endRetracements[retracementIndex]).absolutePosition, d = [
            ['M', Math.round(leftTop.x), Math.round(leftTop.y)],
            ['L', Math.round(rightTop.x), Math.round(rightTop.y)]
        ];
        if (isBackground) {
            const rightBottom = this.anchor(annotation.endRetracements[retracementIndex - 1]).absolutePosition;
            const leftBottom = this.anchor(annotation.startRetracements[retracementIndex - 1]).absolutePosition;
            d.push(['L', Math.round(rightBottom.x), Math.round(rightBottom.y)], ['L', Math.round(leftBottom.x), Math.round(leftBottom.y)]);
        }
        return d;
    };
}
/* *
 *
 *  Class
 *
 * */
class Fibonacci extends Tunnel {
    /* *
     *
     *  Functions
     *
     * */
    linkPoints() {
        super.linkPoints();
        this.linkRetracementsPoints();
        return;
    }
    linkRetracementsPoints() {
        const points = this.points, startDiff = points[0].y - points[3].y, endDiff = points[1].y - points[2].y, startX = points[0].x, endX = points[1].x;
        Fibonacci.levels.forEach((level, i) => {
            const startRetracement = points[0].y - startDiff * level, endRetracement = points[1].y - endDiff * level, index = this.options.typeOptions.reversed ?
                (Fibonacci.levels.length - i - 1) : i;
            this.startRetracements = this.startRetracements || [];
            this.endRetracements = this.endRetracements || [];
            this.linkRetracementPoint(index, startX, startRetracement, this.startRetracements);
            this.linkRetracementPoint(index, endX, endRetracement, this.endRetracements);
        });
    }
    linkRetracementPoint(pointIndex, x, y, retracements) {
        const point = retracements[pointIndex], typeOptions = this.options.typeOptions;
        if (!point) {
            retracements[pointIndex] = new MockPoint(this.chart, this, {
                x: x,
                y: y,
                xAxis: typeOptions.xAxis,
                yAxis: typeOptions.yAxis
            });
        }
        else {
            point.options.x = x;
            point.options.y = y;
            point.refresh();
        }
    }
    addShapes() {
        Fibonacci.levels.forEach(function (_level, i) {
            const { backgroundColors, lineColor, lineColors } = this.options.typeOptions;
            this.initShape({
                type: 'path',
                d: createPathDGenerator(i),
                stroke: lineColors[i] || lineColor
            }, i);
            if (i > 0) {
                this.initShape({
                    type: 'path',
                    fill: backgroundColors[i - 1],
                    strokeWidth: 0,
                    d: createPathDGenerator(i, true)
                });
            }
        }, this);
    }
    addLabels() {
        Fibonacci.levels.forEach(function (level, i) {
            const options = this.options.typeOptions, label = this.initLabel(merge(options.labels[i], {
                point: function (target) {
                    const point = MockPoint.pointToOptions(target.annotation.startRetracements[i]);
                    return point;
                },
                text: level.toString()
            }));
            options.labels[i] = label.options;
        }, this);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Fibonacci.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
Fibonacci.prototype.defaultOptions = merge(Tunnel.prototype.defaultOptions, 
/**
 * A fibonacci annotation.
 *
 * @sample highcharts/annotations-advanced/fibonacci/
 *         Fibonacci
 *
 * @extends      annotations.crookedLine
 * @product      highstock
 * @optionparent annotations.fibonacci
 */
{
    typeOptions: {
        /**
         * Whether the annotation levels should be reversed. By default they
         * start from 0 and go to 1.
         *
         * @sample highcharts/annotations-advanced/fibonacci-reversed/
         *         Fibonacci annotation reversed
         *
         * @type {boolean}
         * @apioption annotations.fibonacci.typeOptions.reversed
         */
        reversed: false,
        /**
         * The height of the fibonacci in terms of yAxis.
         */
        height: 2,
        /**
         * An array of background colors:
         * Default to:
         * ```
         * [
         * 'rgba(130, 170, 255, 0.4)',
         * 'rgba(139, 191, 216, 0.4)',
         * 'rgba(150, 216, 192, 0.4)',
         * 'rgba(156, 229, 161, 0.4)',
         * 'rgba(162, 241, 130, 0.4)',
         * 'rgba(169, 255, 101, 0.4)'
         * ]
         * ```
         */
        backgroundColors: [
            'rgba(130, 170, 255, 0.4)',
            'rgba(139, 191, 216, 0.4)',
            'rgba(150, 216, 192, 0.4)',
            'rgba(156, 229, 161, 0.4)',
            'rgba(162, 241, 130, 0.4)',
            'rgba(169, 255, 101, 0.4)'
        ],
        /**
         * The color of line.
         */
        lineColor: "#999999" /* Palette.neutralColor40 */,
        /**
         * An array of colors for the lines.
         */
        lineColors: [],
        /**
         * An array with options for the labels.
         *
         * @type      {Array<*>}
         * @extends   annotations.crookedLine.labelOptions
         * @apioption annotations.fibonacci.typeOptions.labels
         */
        labels: []
    },
    labelOptions: {
        allowOverlap: true,
        align: 'right',
        backgroundColor: 'none',
        borderWidth: 0,
        crop: false,
        overflow: 'none',
        shape: 'rect',
        style: {
            color: 'grey'
        },
        verticalAlign: 'middle',
        y: 0
    }
});
Annotation.types.fibonacci = Fibonacci;
/* *
 *
 *  Default Export
 *
 * */
export default Fibonacci;
