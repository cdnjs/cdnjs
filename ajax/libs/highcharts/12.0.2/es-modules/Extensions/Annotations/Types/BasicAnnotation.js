/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Annotation from '../Annotation.js';
import MockPoint from '../MockPoint.js';
import U from '../../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
class BasicAnnotation extends Annotation {
    /* *
     *
     *  Functions
     *
     * */
    addControlPoints() {
        const options = this.options, controlPoints = BasicAnnotation.basicControlPoints, annotationType = this.basicType, optionsGroup = (options.labels ||
            options.shapes ||
            []);
        optionsGroup.forEach((group) => {
            group.controlPoints = controlPoints[annotationType];
        });
    }
    init() {
        const options = this.options;
        if (options.shapes) {
            delete options.labelOptions;
            const type = options.shapes[0].type;
            options.shapes[0].className =
                (options.shapes[0].className || '') + ' highcharts-basic-shape';
            // The rectangle is rendered as a path, whereas other basic shapes
            // are rendered as their respective SVG shapes.
            if (type && type !== 'path') {
                this.basicType = type;
            }
            else {
                this.basicType = 'rectangle';
            }
        }
        else {
            delete options.shapes;
            this.basicType = 'label';
        }
        super.init.apply(this, arguments);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
BasicAnnotation.basicControlPoints = {
    label: [{
            symbol: 'triangle-down',
            positioner: function (target) {
                if (!target.graphic.placed) {
                    return {
                        x: 0,
                        y: -9e7
                    };
                }
                const xy = MockPoint
                    .pointToPixels(target.points[0]);
                return {
                    x: xy.x - (this.graphic.width || 0) / 2,
                    y: xy.y - (this.graphic.height || 0) / 2
                };
            },
            // TRANSLATE POINT/ANCHOR
            events: {
                drag: function (e, target) {
                    const xy = this.mouseMoveToTranslation(e);
                    target.translatePoint(xy.x, xy.y);
                    target.annotation.userOptions.labels[0].point =
                        target.options.point;
                    target.redraw(false);
                }
            }
        }, {
            symbol: 'square',
            positioner: function (target) {
                if (!target.graphic.placed) {
                    return {
                        x: 0,
                        y: -9e7
                    };
                }
                return {
                    x: target.graphic.alignAttr.x -
                        (this.graphic.width || 0) / 2,
                    y: target.graphic.alignAttr.y -
                        (this.graphic.height || 0) / 2
                };
            },
            // TRANSLATE POSITION WITHOUT CHANGING THE
            // ANCHOR
            events: {
                drag: function (e, target) {
                    const xy = this.mouseMoveToTranslation(e);
                    target.translate(xy.x, xy.y);
                    target.annotation.userOptions.labels[0].point =
                        target.options.point;
                    target.redraw(false);
                }
            }
        }],
    rectangle: [{
            positioner: function (annotation) {
                const xy = MockPoint
                    .pointToPixels(annotation.points[2]);
                return {
                    x: xy.x - 4,
                    y: xy.y - 4
                };
            },
            events: {
                drag: function (e, target) {
                    const annotation = target.annotation, coords = this.chart.pointer?.getCoordinates(e), points = target.options.points, shapes = annotation.userOptions.shapes, xAxisIndex = annotation.clipXAxis?.index || 0, yAxisIndex = annotation.clipYAxis?.index || 0;
                    if (coords) {
                        const x = coords.xAxis[xAxisIndex].value, y = coords.yAxis[yAxisIndex].value;
                        // Top right point
                        points[1].x = x;
                        // Bottom right point (cursor position)
                        points[2].x = x;
                        points[2].y = y;
                        // Bottom left
                        points[3].y = y;
                        if (shapes && shapes[0]) {
                            shapes[0].points = target.options.points;
                        }
                    }
                    annotation.redraw(false);
                }
            }
        }],
    circle: [{
            positioner: function (target) {
                const xy = MockPoint.pointToPixels(target.points[0]), r = target.options.r;
                return {
                    x: xy.x + r * Math.cos(Math.PI / 4) -
                        (this.graphic.width || 0) / 2,
                    y: xy.y + r * Math.sin(Math.PI / 4) -
                        (this.graphic.height || 0) / 2
                };
            },
            events: {
                // TRANSFORM RADIUS ACCORDING TO Y
                // TRANSLATION
                drag: function (e, target) {
                    const annotation = target.annotation, position = this.mouseMoveToTranslation(e), shapes = annotation.userOptions.shapes;
                    target.setRadius(Math.max(target.options.r +
                        position.y /
                            Math.sin(Math.PI / 4), 5));
                    if (shapes && shapes[0]) {
                        shapes[0].r = target.options.r;
                        shapes[0].point = target.options.point;
                    }
                    target.redraw(false);
                }
            }
        }],
    ellipse: [{
            positioner: function (target) {
                const position = target.getAbsolutePosition(target.points[0]);
                return {
                    x: position.x - (this.graphic.width || 0) / 2,
                    y: position.y - (this.graphic.height || 0) / 2
                };
            },
            events: {
                drag: function (e, target) {
                    const position = target.getAbsolutePosition(target.points[0]);
                    target.translatePoint(e.chartX - position.x, e.chartY - position.y, 0);
                    target.redraw(false);
                }
            }
        }, {
            positioner: function (target) {
                const position = target.getAbsolutePosition(target.points[1]);
                return {
                    x: position.x - (this.graphic.width || 0) / 2,
                    y: position.y - (this.graphic.height || 0) / 2
                };
            },
            events: {
                drag: function (e, target) {
                    const position = target.getAbsolutePosition(target.points[1]);
                    target.translatePoint(e.chartX - position.x, e.chartY - position.y, 1);
                    target.redraw(false);
                }
            }
        }, {
            positioner: function (target) {
                const position = target.getAbsolutePosition(target.points[0]), position2 = target.getAbsolutePosition(target.points[1]), attrs = target.getAttrs(position, position2);
                return {
                    x: attrs.cx - (this.graphic.width || 0) / 2 +
                        attrs.ry * Math.sin((attrs.angle * Math.PI) / 180),
                    y: attrs.cy - (this.graphic.height || 0) / 2 -
                        attrs.ry * Math.cos((attrs.angle * Math.PI) / 180)
                };
            },
            events: {
                drag: function (e, target) {
                    const position = target.getAbsolutePosition(target.points[0]), position2 = target.getAbsolutePosition(target.points[1]), newR = target.getDistanceFromLine(position, position2, e.chartX, e.chartY), yAxis = target.getYAxis(), newRY = Math.abs(yAxis.toValue(0) - yAxis.toValue(newR));
                    target.setYRadius(newRY);
                    target.redraw(false);
                }
            }
        }]
};
BasicAnnotation.prototype.defaultOptions = merge(Annotation.prototype.defaultOptions, {});
Annotation.types.basicAnnotation = BasicAnnotation;
/* *
 *
 *  Default Export
 *
 * */
export default BasicAnnotation;
