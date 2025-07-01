/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Annotation from '../Annotation.js';
import D from '../../../Core/Defaults.js';
const { defaultOptions } = D;
import InfinityLine from './InfinityLine.js';
import MockPoint from '../MockPoint.js';
import U from '../../../Core/Utilities.js';
const { merge } = U;
if (defaultOptions.annotations) {
    defaultOptions.annotations.types.pitchfork = merge(defaultOptions.annotations.types.infinityLine, 
    /**
     * Options for the pitchfork annotation type.
     *
     * @sample highcharts/annotations-advanced/pitchfork/
     *         Pitchfork
     *
     * @extends      annotations.types.infinityLine
     * @product      highstock
     * @optionparent annotations.types.pitchfork
     */
    {
        typeOptions: {
            /**
             * Inner background options.
             *
             * @extends   annotations.types.crookedLine.shapeOptions
             * @excluding height, r, type, width
             */
            innerBackground: {
                fill: 'rgba(130, 170, 255, 0.4)',
                strokeWidth: 0
            },
            /**
             * Outer background options.
             *
             * @extends   annotations.types.crookedLine.shapeOptions
             * @excluding height, r, type, width
             */
            outerBackground: {
                fill: 'rgba(156, 229, 161, 0.4)',
                strokeWidth: 0
            }
        }
    });
}
/* *
 *
 *  Class
 *
 * */
class Pitchfork extends InfinityLine {
    /* *
     *
     *  Static Functions
     *
     * */
    static outerLineEdgePoint(firstPointIndex) {
        return function (target) {
            const annotation = target.annotation, points = annotation.points;
            return Pitchfork.findEdgePoint(points[firstPointIndex], points[0], new MockPoint(annotation.chart, target, annotation.midPointOptions()));
        };
    }
    static findEdgePoint(point, firstAnglePoint, secondAnglePoint) {
        const angle = Math.atan2((secondAnglePoint.plotY -
            firstAnglePoint.plotY), secondAnglePoint.plotX - firstAnglePoint.plotX), distance = 1e7;
        return {
            x: point.plotX + distance * Math.cos(angle),
            y: point.plotY + distance * Math.sin(angle)
        };
    }
    static middleLineEdgePoint(target) {
        const annotation = target.annotation, points = annotation.points;
        return InfinityLine.findEdgePoint(points[0], new MockPoint(annotation.chart, target, annotation.midPointOptions()));
    }
    /* *
     *
     *  Functions
     *
     * */
    midPointOptions() {
        const points = this.points;
        return {
            x: (points[1].x + points[2].x) / 2,
            y: (points[1].y + points[2].y) / 2,
            xAxis: points[0].series.xAxis,
            yAxis: points[0].series.yAxis
        };
    }
    addShapes() {
        this.addLines();
        this.addBackgrounds();
    }
    addLines() {
        const className = 'highcharts-pitchfork-lines';
        this.initShape({
            type: 'path',
            points: [
                this.points[0],
                Pitchfork.middleLineEdgePoint
            ],
            className
        }, 0);
        this.initShape({
            type: 'path',
            points: [
                this.points[1],
                Pitchfork.topLineEdgePoint
            ],
            className
        }, 1);
        this.initShape({
            type: 'path',
            points: [
                this.points[2],
                Pitchfork.bottomLineEdgePoint
            ],
            className
        }, 2);
    }
    addBackgrounds() {
        const shapes = this.shapes, typeOptions = this.options.typeOptions;
        const innerBackground = this.initShape(merge(typeOptions.innerBackground, {
            type: 'path',
            points: [
                function (target) {
                    const annotation = target.annotation, points = annotation.points, midPointOptions = annotation.midPointOptions();
                    return {
                        x: (points[1].x + midPointOptions.x) / 2,
                        y: (points[1].y + midPointOptions.y) / 2,
                        xAxis: midPointOptions.xAxis,
                        yAxis: midPointOptions.yAxis
                    };
                },
                shapes[1].points[1],
                shapes[2].points[1],
                function (target) {
                    const annotation = target.annotation, points = annotation.points, midPointOptions = annotation.midPointOptions();
                    return {
                        x: (midPointOptions.x + points[2].x) / 2,
                        y: (midPointOptions.y + points[2].y) / 2,
                        xAxis: midPointOptions.xAxis,
                        yAxis: midPointOptions.yAxis
                    };
                }
            ],
            className: 'highcharts-pitchfork-inner-background'
        }), 3);
        const outerBackground = this.initShape(merge(typeOptions.outerBackground, {
            type: 'path',
            points: [
                this.points[1],
                shapes[1].points[1],
                shapes[2].points[1],
                this.points[2]
            ],
            className: 'highcharts-pitchfork-outer-background'
        }), 4);
        typeOptions.innerBackground = innerBackground.options;
        typeOptions.outerBackground = outerBackground.options;
    }
}
Pitchfork.topLineEdgePoint = Pitchfork.outerLineEdgePoint(1);
Pitchfork.bottomLineEdgePoint = Pitchfork.outerLineEdgePoint(0);
Annotation.types.pitchfork = Pitchfork;
/* *
 *
 *  Default Export
 *
 * */
export default Pitchfork;
