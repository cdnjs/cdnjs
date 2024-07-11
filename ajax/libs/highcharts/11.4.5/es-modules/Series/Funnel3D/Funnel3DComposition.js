/* *
 *
 *  Highcharts funnel3d series module
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SVGElement3DFunnel from './SVGElement3DFunnel.js';
import H from '../../Core/Globals.js';
const { charts } = H;
import U from '../../Core/Utilities.js';
const { error, extend, merge } = U;
/* *
 *
 *  Functions
 *
 * */
/** @private */
function compose(SVGRendererClass) {
    const rendererProto = SVGRendererClass.prototype;
    if (!rendererProto.funnel3d) {
        rendererProto.Element3D.types.funnel3d = SVGElement3DFunnel;
        extend(rendererProto, {
            funnel3d: rendererFunnel3d,
            funnel3dPath: rendererFunnel3dPath
        });
    }
}
/** @private */
function rendererFunnel3d(shapeArgs) {
    const renderer = this, funnel3d = renderer.element3d('funnel3d', shapeArgs), styledMode = renderer.styledMode, 
    // Hide stroke for Firefox
    strokeAttrs = {
        'stroke-width': 1,
        stroke: 'none'
    };
    // Create groups for sides for opacity setter
    funnel3d.upperGroup = renderer.g('funnel3d-upper-group').attr({
        zIndex: funnel3d.frontUpper.zIndex
    }).add(funnel3d);
    for (const upperElem of [funnel3d.frontUpper, funnel3d.backUpper, funnel3d.rightUpper]) {
        if (!styledMode) {
            upperElem.attr(strokeAttrs);
        }
        upperElem.add(funnel3d.upperGroup);
    }
    funnel3d.lowerGroup = renderer.g('funnel3d-lower-group').attr({
        zIndex: funnel3d.frontLower.zIndex
    }).add(funnel3d);
    for (const lowerElem of [funnel3d.frontLower, funnel3d.backLower, funnel3d.rightLower]) {
        if (!styledMode) {
            lowerElem.attr(strokeAttrs);
        }
        lowerElem.add(funnel3d.lowerGroup);
    }
    funnel3d.gradientForSides = shapeArgs.gradientForSides;
    return funnel3d;
}
/**
 * Generates paths and zIndexes.
 * @private
 */
function rendererFunnel3dPath(shapeArgs) {
    // Check getCylinderEnd for better error message if
    // the cylinder module is missing
    if (!this.getCylinderEnd) {
        error('A required Highcharts module is missing: cylinder.js', true, charts[this.chartIndex]);
    }
    const renderer = this, chart = charts[renderer.chartIndex], 
    // Adjust angles for visible edges
    // based on alpha, selected through visual tests
    alphaCorrection = shapeArgs.alphaCorrection = 90 - Math.abs((chart.options.chart.options3d.alpha % 180) -
        90), 
    // Set zIndexes of parts based on cuboid logic, for
    // consistency
    cuboidData = this.cuboidPath.call(renderer, merge(shapeArgs, {
        depth: shapeArgs.width,
        width: (shapeArgs.width + shapeArgs.bottom.width) / 2
    })), isTopFirst = cuboidData.isTop, isFrontFirst = !cuboidData.isFront, hasMiddle = !!shapeArgs.middle, 
    //
    top = renderer.getCylinderEnd(chart, merge(shapeArgs, {
        x: shapeArgs.x - shapeArgs.width / 2,
        z: shapeArgs.z - shapeArgs.width / 2,
        alphaCorrection: alphaCorrection
    })), bottomWidth = shapeArgs.bottom.width, bottomArgs = merge(shapeArgs, {
        width: bottomWidth,
        x: shapeArgs.x - bottomWidth / 2,
        z: shapeArgs.z - bottomWidth / 2,
        alphaCorrection: alphaCorrection
    }), bottom = renderer.getCylinderEnd(chart, bottomArgs, true);
    let middleWidth = bottomWidth, middleTopArgs = bottomArgs, middleTop = bottom, middleBottom = bottom, 
    // Masking for cylinders or a missing part of a side shape
    useAlphaCorrection;
    if (hasMiddle) {
        middleWidth = shapeArgs.middle.width;
        middleTopArgs = merge(shapeArgs, {
            y: (shapeArgs.y +
                shapeArgs.middle.fraction * shapeArgs.height),
            width: middleWidth,
            x: shapeArgs.x - middleWidth / 2,
            z: shapeArgs.z - middleWidth / 2
        });
        middleTop = renderer.getCylinderEnd(chart, middleTopArgs, false);
        middleBottom = renderer.getCylinderEnd(chart, middleTopArgs, false);
    }
    const ret = {
        top: top,
        bottom: bottom,
        frontUpper: renderer.getCylinderFront(top, middleTop),
        zIndexes: {
            group: cuboidData.zIndexes.group,
            top: isTopFirst !== 0 ? 0 : 3,
            bottom: isTopFirst !== 1 ? 0 : 3,
            frontUpper: isFrontFirst ? 2 : 1,
            backUpper: isFrontFirst ? 1 : 2,
            rightUpper: isFrontFirst ? 2 : 1
        }
    };
    ret.backUpper = renderer.getCylinderBack(top, middleTop);
    useAlphaCorrection = (Math.min(middleWidth, shapeArgs.width) /
        Math.max(middleWidth, shapeArgs.width)) !== 1;
    ret.rightUpper = renderer.getCylinderFront(renderer.getCylinderEnd(chart, merge(shapeArgs, {
        x: shapeArgs.x - shapeArgs.width / 2,
        z: shapeArgs.z - shapeArgs.width / 2,
        alphaCorrection: useAlphaCorrection ?
            -alphaCorrection : 0
    }), false), renderer.getCylinderEnd(chart, merge(middleTopArgs, {
        alphaCorrection: useAlphaCorrection ?
            -alphaCorrection : 0
    }), !hasMiddle));
    if (hasMiddle) {
        useAlphaCorrection = (Math.min(middleWidth, bottomWidth) /
            Math.max(middleWidth, bottomWidth)) !== 1;
        merge(true, ret, {
            frontLower: renderer.getCylinderFront(middleBottom, bottom),
            backLower: renderer.getCylinderBack(middleBottom, bottom),
            rightLower: renderer.getCylinderFront(renderer.getCylinderEnd(chart, merge(bottomArgs, {
                alphaCorrection: useAlphaCorrection ?
                    -alphaCorrection : 0
            }), true), renderer.getCylinderEnd(chart, merge(middleTopArgs, {
                alphaCorrection: useAlphaCorrection ?
                    -alphaCorrection : 0
            }), false)),
            zIndexes: {
                frontLower: isFrontFirst ? 2 : 1,
                backLower: isFrontFirst ? 1 : 2,
                rightLower: isFrontFirst ? 1 : 2
            }
        });
    }
    return ret;
}
/* *
 *
 *  Default Export
 *
 * */
const Funnel3DComposition = {
    compose
};
export default Funnel3DComposition;
