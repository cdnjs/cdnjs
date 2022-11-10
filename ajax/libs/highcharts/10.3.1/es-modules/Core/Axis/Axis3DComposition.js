/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  Extenstion for 3d axes
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Axis3DDefaults from './Axis3DDefaults.js';
import H from '../Globals.js';
var deg2rad = H.deg2rad;
import Math3D from '../Math3D.js';
var perspective = Math3D.perspective, perspective3D = Math3D.perspective3D, shapeArea = Math3D.shapeArea;
import Tick3D from './Tick3DComposition.js';
import U from '../Utilities.js';
var addEvent = U.addEvent, merge = U.merge, pick = U.pick, wrap = U.wrap;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function onAxisAfterSetOptions() {
    var axis = this, chart = axis.chart, options = axis.options;
    if (chart.is3d && chart.is3d() && axis.coll !== 'colorAxis') {
        options.tickWidth = pick(options.tickWidth, 0);
        options.gridLineWidth = pick(options.gridLineWidth, 1);
    }
}
/**
 * @private
 */
function onAxisDrawCrosshair(e) {
    var axis = this;
    if (axis.chart.is3d() &&
        axis.coll !== 'colorAxis') {
        if (e.point) {
            e.point.crosshairPos = axis.isXAxis ?
                e.point.axisXpos :
                axis.len - e.point.axisYpos;
        }
    }
}
/**
 * @private
 */
function onAxisInit() {
    var axis = this;
    if (!axis.axis3D) {
        axis.axis3D = new Axis3DAdditions(axis);
    }
}
/**
 * Do not draw axislines in 3D.
 * @private
 */
function wrapAxisGetLinePath(proceed) {
    var axis = this;
    // Do not do this if the chart is not 3D
    if (!axis.chart.is3d() || axis.coll === 'colorAxis') {
        return proceed.apply(axis, [].slice.call(arguments, 1));
    }
    return [];
}
/**
 * @private
 */
function wrapAxisGetPlotBandPath(proceed) {
    // Do not do this if the chart is not 3D
    if (!this.chart.is3d() || this.coll === 'colorAxis') {
        return proceed.apply(this, [].slice.call(arguments, 1));
    }
    var args = arguments, from = args[1], to = args[2], path = [], fromPath = this.getPlotLinePath({ value: from }), toPath = this.getPlotLinePath({ value: to });
    if (fromPath && toPath) {
        for (var i = 0; i < fromPath.length; i += 2) {
            var fromStartSeg = fromPath[i], fromEndSeg = fromPath[i + 1], toStartSeg = toPath[i], toEndSeg = toPath[i + 1];
            if (fromStartSeg[0] === 'M' &&
                fromEndSeg[0] === 'L' &&
                toStartSeg[0] === 'M' &&
                toEndSeg[0] === 'L') {
                path.push(fromStartSeg, fromEndSeg, toEndSeg, 
                // lineTo instead of moveTo
                ['L', toStartSeg[1], toStartSeg[2]], ['Z']);
            }
        }
    }
    return path;
}
/**
 * @private
 */
function wrapAxisGetPlotLinePath(proceed) {
    var axis = this, axis3D = axis.axis3D, chart = axis.chart, path = proceed.apply(axis, [].slice.call(arguments, 1));
    // Do not do this if the chart is not 3D
    if (axis.coll === 'colorAxis' ||
        !chart.chart3d ||
        !chart.is3d()) {
        return path;
    }
    if (path === null) {
        return path;
    }
    var options3d = chart.options.chart.options3d, d = axis.isZAxis ? chart.plotWidth : options3d.depth, frame = chart.chart3d.frame3d, startSegment = path[0], endSegment = path[1];
    var pArr, pathSegments = [];
    if (startSegment[0] === 'M' && endSegment[0] === 'L') {
        pArr = [
            axis3D.swapZ({ x: startSegment[1], y: startSegment[2], z: 0 }),
            axis3D.swapZ({ x: startSegment[1], y: startSegment[2], z: d }),
            axis3D.swapZ({ x: endSegment[1], y: endSegment[2], z: 0 }),
            axis3D.swapZ({ x: endSegment[1], y: endSegment[2], z: d })
        ];
        if (!this.horiz) { // Y-Axis
            if (frame.front.visible) {
                pathSegments.push(pArr[0], pArr[2]);
            }
            if (frame.back.visible) {
                pathSegments.push(pArr[1], pArr[3]);
            }
            if (frame.left.visible) {
                pathSegments.push(pArr[0], pArr[1]);
            }
            if (frame.right.visible) {
                pathSegments.push(pArr[2], pArr[3]);
            }
        }
        else if (this.isZAxis) { // Z-Axis
            if (frame.left.visible) {
                pathSegments.push(pArr[0], pArr[2]);
            }
            if (frame.right.visible) {
                pathSegments.push(pArr[1], pArr[3]);
            }
            if (frame.top.visible) {
                pathSegments.push(pArr[0], pArr[1]);
            }
            if (frame.bottom.visible) {
                pathSegments.push(pArr[2], pArr[3]);
            }
        }
        else { // X-Axis
            if (frame.front.visible) {
                pathSegments.push(pArr[0], pArr[2]);
            }
            if (frame.back.visible) {
                pathSegments.push(pArr[1], pArr[3]);
            }
            if (frame.top.visible) {
                pathSegments.push(pArr[0], pArr[1]);
            }
            if (frame.bottom.visible) {
                pathSegments.push(pArr[2], pArr[3]);
            }
        }
        pathSegments = perspective(pathSegments, this.chart, false);
    }
    return chart.renderer.toLineSegments(pathSegments);
}
/**
 * Wrap getSlotWidth function to calculate individual width value for each
 * slot (#8042).
 * @private
 */
function wrapAxisGetSlotWidth(proceed, tick) {
    var axis = this, chart = axis.chart, ticks = axis.ticks, gridGroup = axis.gridGroup;
    if (axis.categories &&
        chart.frameShapes &&
        chart.is3d() &&
        gridGroup &&
        tick &&
        tick.label) {
        var firstGridLine = (gridGroup.element.childNodes[0].getBBox()), frame3DLeft = chart.frameShapes.left.getBBox(), options3d = chart.options.chart.options3d, origin_1 = {
            x: chart.plotWidth / 2,
            y: chart.plotHeight / 2,
            z: options3d.depth / 2,
            vd: (pick(options3d.depth, 1) *
                pick(options3d.viewDistance, 0))
        }, tickId = tick.pos, prevTick = ticks[tickId - 1], nextTick = ticks[tickId + 1];
        var labelPos = void 0, prevLabelPos = void 0, nextLabelPos = void 0;
        // Check whether the tick is not the first one and previous tick
        // exists, then calculate position of previous label.
        if (tickId !== 0 &&
            prevTick &&
            prevTick.label &&
            prevTick.label.xy) {
            prevLabelPos = perspective3D({
                x: prevTick.label.xy.x,
                y: prevTick.label.xy.y,
                z: null
            }, origin_1, origin_1.vd);
        }
        // If next label position is defined, then recalculate its position
        // basing on the perspective.
        if (nextTick && nextTick.label && nextTick.label.xy) {
            nextLabelPos = perspective3D({
                x: nextTick.label.xy.x,
                y: nextTick.label.xy.y,
                z: null
            }, origin_1, origin_1.vd);
        }
        labelPos = {
            x: tick.label.xy.x,
            y: tick.label.xy.y,
            z: null
        };
        labelPos = perspective3D(labelPos, origin_1, origin_1.vd);
        // If tick is first one, check whether next label position is
        // already calculated, then return difference between the first and
        // the second label. If there is no next label position calculated,
        // return the difference between the first grid line and left 3d
        // frame.
        return Math.abs(prevLabelPos ?
            labelPos.x - prevLabelPos.x : nextLabelPos ?
            nextLabelPos.x - labelPos.x :
            firstGridLine.x - frame3DLeft.x);
    }
    return proceed.apply(axis, [].slice.call(arguments, 1));
}
/**
 * @private
 */
function wrapAxisGetTitlePosition(proceed) {
    var pos = proceed.apply(this, [].slice.call(arguments, 1));
    return this.axis3D ?
        this.axis3D.fix3dPosition(pos, true) :
        pos;
}
/* *
 *
 *  Class
 *
 * */
/**
 * Adds 3D support to axes.
 * @private
 * @class
 */
var Axis3DAdditions = /** @class */ (function () {
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * @private
     */
    function Axis3DAdditions(axis) {
        this.axis = axis;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Extends axis class with 3D support.
     * @private
     */
    Axis3DAdditions.compose = function (AxisClass, TickClass) {
        Tick3D.compose(TickClass);
        if (composedClasses.indexOf(AxisClass) === -1) {
            composedClasses.push(AxisClass);
            merge(true, AxisClass.defaultOptions, Axis3DDefaults);
            AxisClass.keepProps.push('axis3D');
            addEvent(AxisClass, 'init', onAxisInit);
            addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
            addEvent(AxisClass, 'drawCrosshair', onAxisDrawCrosshair);
            var axisProto = AxisClass.prototype;
            wrap(axisProto, 'getLinePath', wrapAxisGetLinePath);
            wrap(axisProto, 'getPlotBandPath', wrapAxisGetPlotBandPath);
            wrap(axisProto, 'getPlotLinePath', wrapAxisGetPlotLinePath);
            wrap(axisProto, 'getSlotWidth', wrapAxisGetSlotWidth);
            wrap(axisProto, 'getTitlePosition', wrapAxisGetTitlePosition);
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     * @param {Highcharts.Axis} axis
     * Related axis.
     * @param {Highcharts.Position3DObject} pos
     * Position to fix.
     * @param {boolean} [isTitle]
     * Whether this is a title position.
     * @return {Highcharts.Position3DObject}
     * Fixed position.
     */
    Axis3DAdditions.prototype.fix3dPosition = function (pos, isTitle) {
        var axis3D = this;
        var axis = axis3D.axis;
        var chart = axis.chart;
        // Do not do this if the chart is not 3D
        if (axis.coll === 'colorAxis' ||
            !chart.chart3d ||
            !chart.is3d()) {
            return pos;
        }
        var alpha = deg2rad * chart.options.chart.options3d.alpha, beta = deg2rad * chart.options.chart.options3d.beta, positionMode = pick(isTitle && axis.options.title.position3d, axis.options.labels.position3d), skew = pick(isTitle && axis.options.title.skew3d, axis.options.labels.skew3d), frame = chart.chart3d.frame3d, plotLeft = chart.plotLeft, plotRight = chart.plotWidth + plotLeft, plotTop = chart.plotTop, plotBottom = chart.plotHeight + plotTop;
        var offsetX = 0, offsetY = 0, vecX, vecY = { x: 0, y: 1, z: 0 }, 
        // Indicates that we are labelling an X or Z axis on the "back" of
        // the chart
        reverseFlap = false;
        pos = axis.axis3D.swapZ({ x: pos.x, y: pos.y, z: 0 });
        if (axis.isZAxis) { // Z Axis
            if (axis.opposite) {
                if (frame.axes.z.top === null) {
                    return {};
                }
                offsetY = pos.y - plotTop;
                pos.x = frame.axes.z.top.x;
                pos.y = frame.axes.z.top.y;
                vecX = frame.axes.z.top.xDir;
                reverseFlap = !frame.top.frontFacing;
            }
            else {
                if (frame.axes.z.bottom === null) {
                    return {};
                }
                offsetY = pos.y - plotBottom;
                pos.x = frame.axes.z.bottom.x;
                pos.y = frame.axes.z.bottom.y;
                vecX = frame.axes.z.bottom.xDir;
                reverseFlap = !frame.bottom.frontFacing;
            }
        }
        else if (axis.horiz) { // X Axis
            if (axis.opposite) {
                if (frame.axes.x.top === null) {
                    return {};
                }
                offsetY = pos.y - plotTop;
                pos.y = frame.axes.x.top.y;
                pos.z = frame.axes.x.top.z;
                vecX = frame.axes.x.top.xDir;
                reverseFlap = !frame.top.frontFacing;
            }
            else {
                if (frame.axes.x.bottom === null) {
                    return {};
                }
                offsetY = pos.y - plotBottom;
                pos.y = frame.axes.x.bottom.y;
                pos.z = frame.axes.x.bottom.z;
                vecX = frame.axes.x.bottom.xDir;
                reverseFlap = !frame.bottom.frontFacing;
            }
        }
        else { // Y Axis
            if (axis.opposite) {
                if (frame.axes.y.right === null) {
                    return {};
                }
                offsetX = pos.x - plotRight;
                pos.x = frame.axes.y.right.x;
                pos.z = frame.axes.y.right.z;
                vecX = frame.axes.y.right.xDir;
                // Rotate 90º on opposite edge
                vecX = { x: vecX.z, y: vecX.y, z: -vecX.x };
            }
            else {
                if (frame.axes.y.left === null) {
                    return {};
                }
                offsetX = pos.x - plotLeft;
                pos.x = frame.axes.y.left.x;
                pos.z = frame.axes.y.left.z;
                vecX = frame.axes.y.left.xDir;
            }
        }
        if (positionMode === 'chart') {
            // Labels preserve their direction relative to the chart
            // nothing to do
        }
        else if (positionMode === 'flap') {
            // Labels are rotated around the axis direction to face the screen
            if (!axis.horiz) { // Y Axis
                vecX = { x: Math.cos(beta), y: 0, z: Math.sin(beta) };
            }
            else { // X and Z Axis
                var sin = Math.sin(alpha);
                var cos = Math.cos(alpha);
                if (axis.opposite) {
                    sin = -sin;
                }
                if (reverseFlap) {
                    sin = -sin;
                }
                vecY = { x: vecX.z * sin, y: cos, z: -vecX.x * sin };
            }
        }
        else if (positionMode === 'ortho') {
            // Labels will be rotated to be ortogonal to the axis
            if (!axis.horiz) { // Y Axis
                vecX = { x: Math.cos(beta), y: 0, z: Math.sin(beta) };
            }
            else { // X and Z Axis
                var sina = Math.sin(alpha);
                var cosa = Math.cos(alpha);
                var sinb = Math.sin(beta);
                var cosb = Math.cos(beta);
                var vecZ = { x: sinb * cosa, y: -sina, z: -cosa * cosb };
                vecY = {
                    x: vecX.y * vecZ.z - vecX.z * vecZ.y,
                    y: vecX.z * vecZ.x - vecX.x * vecZ.z,
                    z: vecX.x * vecZ.y - vecX.y * vecZ.x
                };
                var scale = 1 / Math.sqrt(vecY.x * vecY.x + vecY.y * vecY.y + vecY.z * vecY.z);
                if (reverseFlap) {
                    scale = -scale;
                }
                vecY = {
                    x: scale * vecY.x, y: scale * vecY.y, z: scale * vecY.z
                };
            }
        }
        else { // positionMode  == 'offset'
            // Labels will be skewd to maintain vertical / horizontal offsets
            // from axis
            if (!axis.horiz) { // Y Axis
                vecX = { x: Math.cos(beta), y: 0, z: Math.sin(beta) };
            }
            else { // X and Z Axis
                vecY = {
                    x: Math.sin(beta) * Math.sin(alpha),
                    y: Math.cos(alpha),
                    z: -Math.cos(beta) * Math.sin(alpha)
                };
            }
        }
        pos.x += offsetX * vecX.x + offsetY * vecY.x;
        pos.y += offsetX * vecX.y + offsetY * vecY.y;
        pos.z += offsetX * vecX.z + offsetY * vecY.z;
        var projected = perspective([pos], axis.chart)[0];
        if (skew) {
            // Check if the label text would be mirrored
            var isMirrored = shapeArea(perspective([
                pos,
                { x: pos.x + vecX.x, y: pos.y + vecX.y, z: pos.z + vecX.z },
                { x: pos.x + vecY.x, y: pos.y + vecY.y, z: pos.z + vecY.z }
            ], axis.chart)) < 0;
            if (isMirrored) {
                vecX = { x: -vecX.x, y: -vecX.y, z: -vecX.z };
            }
            var pointsProjected = perspective([
                { x: pos.x, y: pos.y, z: pos.z },
                { x: pos.x + vecX.x, y: pos.y + vecX.y, z: pos.z + vecX.z },
                { x: pos.x + vecY.x, y: pos.y + vecY.y, z: pos.z + vecY.z }
            ], axis.chart);
            projected.matrix = [
                pointsProjected[1].x - pointsProjected[0].x,
                pointsProjected[1].y - pointsProjected[0].y,
                pointsProjected[2].x - pointsProjected[0].x,
                pointsProjected[2].y - pointsProjected[0].y,
                projected.x,
                projected.y
            ];
            projected.matrix[4] -= projected.x * projected.matrix[0] +
                projected.y * projected.matrix[2];
            projected.matrix[5] -= projected.x * projected.matrix[1] +
                projected.y * projected.matrix[3];
        }
        return projected;
    };
    /**
     * @private
     */
    Axis3DAdditions.prototype.swapZ = function (p, insidePlotArea) {
        var axis = this.axis;
        if (axis.isZAxis) {
            var plotLeft = insidePlotArea ? 0 : axis.chart.plotLeft;
            return {
                x: plotLeft + p.z,
                y: p.y,
                z: p.x - plotLeft
            };
        }
        return p;
    };
    return Axis3DAdditions;
}());
/* *
 *
 *  Default Export
 *
 * */
export default Axis3DAdditions;
