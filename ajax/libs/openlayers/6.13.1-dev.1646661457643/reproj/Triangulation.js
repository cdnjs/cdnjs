/**
 * @module ol/reproj/Triangulation
 */
import { boundingExtent, createEmpty, extendCoordinate, getArea, getBottomLeft, getBottomRight, getTopLeft, getTopRight, getWidth, intersects, } from '../extent.js';
import { getTransform } from '../proj.js';
import { log2, modulo } from '../math.js';
/**
 * Single triangle; consists of 3 source points and 3 target points.
 * @typedef {Object} Triangle
 * @property {Array<import("../coordinate.js").Coordinate>} source Source.
 * @property {Array<import("../coordinate.js").Coordinate>} target Target.
 */
/**
 * Maximum number of subdivision steps during raster reprojection triangulation.
 * Prevents high memory usage and large number of proj4 calls (for certain
 * transformations and areas). At most `2*(2^this)` triangles are created for
 * each triangulated extent (tile/image).
 * @type {number}
 */
var MAX_SUBDIVISION = 10;
/**
 * Maximum allowed size of triangle relative to world width. When transforming
 * corners of world extent between certain projections, the resulting
 * triangulation seems to have zero error and no subdivision is performed. If
 * the triangle width is more than this (relative to world width; 0-1),
 * subdivison is forced (up to `MAX_SUBDIVISION`). Default is `0.25`.
 * @type {number}
 */
var MAX_TRIANGLE_WIDTH = 0.25;
/**
 * @classdesc
 * Class containing triangulation of the given target extent.
 * Used for determining source data and the reprojection itself.
 */
var Triangulation = /** @class */ (function () {
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection.
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
     * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
     * @param {number} errorThreshold Acceptable error (in source units).
     * @param {?number} opt_destinationResolution The (optional) resolution of the destination.
     */
    function Triangulation(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, opt_destinationResolution) {
        /**
         * @type {import("../proj/Projection.js").default}
         * @private
         */
        this.sourceProj_ = sourceProj;
        /**
         * @type {import("../proj/Projection.js").default}
         * @private
         */
        this.targetProj_ = targetProj;
        /** @type {!Object<string, import("../coordinate.js").Coordinate>} */
        var transformInvCache = {};
        var transformInv = getTransform(this.targetProj_, this.sourceProj_);
        /**
         * @param {import("../coordinate.js").Coordinate} c A coordinate.
         * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
         * @private
         */
        this.transformInv_ = function (c) {
            var key = c[0] + '/' + c[1];
            if (!transformInvCache[key]) {
                transformInvCache[key] = transformInv(c);
            }
            return transformInvCache[key];
        };
        /**
         * @type {import("../extent.js").Extent}
         * @private
         */
        this.maxSourceExtent_ = maxSourceExtent;
        /**
         * @type {number}
         * @private
         */
        this.errorThresholdSquared_ = errorThreshold * errorThreshold;
        /**
         * @type {Array<Triangle>}
         * @private
         */
        this.triangles_ = [];
        /**
         * Indicates that the triangulation crosses edge of the source projection.
         * @type {boolean}
         * @private
         */
        this.wrapsXInSource_ = false;
        /**
         * @type {boolean}
         * @private
         */
        this.canWrapXInSource_ =
            this.sourceProj_.canWrapX() &&
                !!maxSourceExtent &&
                !!this.sourceProj_.getExtent() &&
                getWidth(maxSourceExtent) == getWidth(this.sourceProj_.getExtent());
        /**
         * @type {?number}
         * @private
         */
        this.sourceWorldWidth_ = this.sourceProj_.getExtent()
            ? getWidth(this.sourceProj_.getExtent())
            : null;
        /**
         * @type {?number}
         * @private
         */
        this.targetWorldWidth_ = this.targetProj_.getExtent()
            ? getWidth(this.targetProj_.getExtent())
            : null;
        var destinationTopLeft = getTopLeft(targetExtent);
        var destinationTopRight = getTopRight(targetExtent);
        var destinationBottomRight = getBottomRight(targetExtent);
        var destinationBottomLeft = getBottomLeft(targetExtent);
        var sourceTopLeft = this.transformInv_(destinationTopLeft);
        var sourceTopRight = this.transformInv_(destinationTopRight);
        var sourceBottomRight = this.transformInv_(destinationBottomRight);
        var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
        /*
         * The maxSubdivision controls how many splittings of the target area can
         * be done. The idea here is to do a linear mapping of the target areas
         * but the actual overal reprojection (can be) extremely non-linear. The
         * default value of MAX_SUBDIVISION was chosen based on mapping a 256x256
         * tile size. However this function is also called to remap canvas rendered
         * layers which can be much larger. This calculation increases the maxSubdivision
         * value by the right factor so that each 256x256 pixel area has
         * MAX_SUBDIVISION divisions.
         */
        var maxSubdivision = MAX_SUBDIVISION +
            (opt_destinationResolution
                ? Math.max(0, Math.ceil(log2(getArea(targetExtent) /
                    (opt_destinationResolution *
                        opt_destinationResolution *
                        256 *
                        256))))
                : 0);
        this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
        if (this.wrapsXInSource_) {
            var leftBound_1 = Infinity;
            this.triangles_.forEach(function (triangle, i, arr) {
                leftBound_1 = Math.min(leftBound_1, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
            });
            // Shift triangles to be as close to `leftBound` as possible
            // (if the distance is more than `worldWidth / 2` it can be closer.
            this.triangles_.forEach(function (triangle) {
                if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) -
                    leftBound_1 >
                    this.sourceWorldWidth_ / 2) {
                    var newTriangle = [
                        [triangle.source[0][0], triangle.source[0][1]],
                        [triangle.source[1][0], triangle.source[1][1]],
                        [triangle.source[2][0], triangle.source[2][1]],
                    ];
                    if (newTriangle[0][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
                        newTriangle[0][0] -= this.sourceWorldWidth_;
                    }
                    if (newTriangle[1][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
                        newTriangle[1][0] -= this.sourceWorldWidth_;
                    }
                    if (newTriangle[2][0] - leftBound_1 > this.sourceWorldWidth_ / 2) {
                        newTriangle[2][0] -= this.sourceWorldWidth_;
                    }
                    // Rarely (if the extent contains both the dateline and prime meridian)
                    // the shift can in turn break some triangles.
                    // Detect this here and don't shift in such cases.
                    var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
                    var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
                    if (maxX - minX < this.sourceWorldWidth_ / 2) {
                        triangle.source = newTriangle;
                    }
                }
            }.bind(this));
        }
        transformInvCache = {};
    }
    /**
     * Adds triangle to the triangulation.
     * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
     * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
     * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
     * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
     * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
     * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
     * @private
     */
    Triangulation.prototype.addTriangle_ = function (a, b, c, aSrc, bSrc, cSrc) {
        this.triangles_.push({
            source: [aSrc, bSrc, cSrc],
            target: [a, b, c],
        });
    };
    /**
     * Adds quad (points in clock-wise order) to the triangulation
     * (and reprojects the vertices) if valid.
     * Performs quad subdivision if needed to increase precision.
     *
     * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
     * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
     * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
     * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
     * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
     * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
     * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
     * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
     * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
     * @private
     */
    Triangulation.prototype.addQuad_ = function (a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
        var sourceQuadExtent = boundingExtent([aSrc, bSrc, cSrc, dSrc]);
        var sourceCoverageX = this.sourceWorldWidth_
            ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_
            : null;
        var sourceWorldWidth = /** @type {number} */ (this.sourceWorldWidth_);
        // when the quad is wrapped in the source projection
        // it covers most of the projection extent, but not fully
        var wrapsX = this.sourceProj_.canWrapX() &&
            sourceCoverageX > 0.5 &&
            sourceCoverageX < 1;
        var needsSubdivision = false;
        if (maxSubdivision > 0) {
            if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
                var targetQuadExtent = boundingExtent([a, b, c, d]);
                var targetCoverageX = getWidth(targetQuadExtent) / this.targetWorldWidth_;
                needsSubdivision =
                    targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
            }
            if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
                needsSubdivision =
                    sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
            }
        }
        if (!needsSubdivision && this.maxSourceExtent_) {
            if (isFinite(sourceQuadExtent[0]) &&
                isFinite(sourceQuadExtent[1]) &&
                isFinite(sourceQuadExtent[2]) &&
                isFinite(sourceQuadExtent[3])) {
                if (!intersects(sourceQuadExtent, this.maxSourceExtent_)) {
                    // whole quad outside source projection extent -> ignore
                    return;
                }
            }
        }
        var isNotFinite = 0;
        if (!needsSubdivision) {
            if (!isFinite(aSrc[0]) ||
                !isFinite(aSrc[1]) ||
                !isFinite(bSrc[0]) ||
                !isFinite(bSrc[1]) ||
                !isFinite(cSrc[0]) ||
                !isFinite(cSrc[1]) ||
                !isFinite(dSrc[0]) ||
                !isFinite(dSrc[1])) {
                if (maxSubdivision > 0) {
                    needsSubdivision = true;
                }
                else {
                    // It might be the case that only 1 of the points is infinite. In this case
                    // we can draw a single triangle with the other three points
                    isNotFinite =
                        (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) +
                            (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) +
                            (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) +
                            (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
                    if (isNotFinite != 1 &&
                        isNotFinite != 2 &&
                        isNotFinite != 4 &&
                        isNotFinite != 8) {
                        return;
                    }
                }
            }
        }
        if (maxSubdivision > 0) {
            if (!needsSubdivision) {
                var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
                var centerSrc = this.transformInv_(center);
                var dx = void 0;
                if (wrapsX) {
                    var centerSrcEstimX = (modulo(aSrc[0], sourceWorldWidth) +
                        modulo(cSrc[0], sourceWorldWidth)) /
                        2;
                    dx = centerSrcEstimX - modulo(centerSrc[0], sourceWorldWidth);
                }
                else {
                    dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
                }
                var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
                var centerSrcErrorSquared = dx * dx + dy * dy;
                needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
            }
            if (needsSubdivision) {
                if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
                    // split horizontally (top & bottom)
                    var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
                    var bcSrc = this.transformInv_(bc);
                    var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
                    var daSrc = this.transformInv_(da);
                    this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
                    this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
                }
                else {
                    // split vertically (left & right)
                    var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
                    var abSrc = this.transformInv_(ab);
                    var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
                    var cdSrc = this.transformInv_(cd);
                    this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
                    this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
                }
                return;
            }
        }
        if (wrapsX) {
            if (!this.canWrapXInSource_) {
                return;
            }
            this.wrapsXInSource_ = true;
        }
        // Exactly zero or one of *Src is not finite
        // The triangles must have the diagonal line as the first side
        // This is to allow easy code in reproj.s to make it straight for broken
        // browsers that can't handle diagonal clipping
        if ((isNotFinite & 0xb) == 0) {
            this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
        }
        if ((isNotFinite & 0xe) == 0) {
            this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
        }
        if (isNotFinite) {
            // Try the other two triangles
            if ((isNotFinite & 0xd) == 0) {
                this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
            }
            if ((isNotFinite & 0x7) == 0) {
                this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
            }
        }
    };
    /**
     * Calculates extent of the `source` coordinates from all the triangles.
     *
     * @return {import("../extent.js").Extent} Calculated extent.
     */
    Triangulation.prototype.calculateSourceExtent = function () {
        var extent = createEmpty();
        this.triangles_.forEach(function (triangle, i, arr) {
            var src = triangle.source;
            extendCoordinate(extent, src[0]);
            extendCoordinate(extent, src[1]);
            extendCoordinate(extent, src[2]);
        });
        return extent;
    };
    /**
     * @return {Array<Triangle>} Array of the calculated triangles.
     */
    Triangulation.prototype.getTriangles = function () {
        return this.triangles_;
    };
    return Triangulation;
}());
export default Triangulation;
//# sourceMappingURL=Triangulation.js.map