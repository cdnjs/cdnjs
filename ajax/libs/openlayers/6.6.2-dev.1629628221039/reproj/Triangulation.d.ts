export default Triangulation;
/**
 * Single triangle; consists of 3 source points and 3 target points.
 */
export type Triangle = {
    /**
     * Source.
     */
    source: number[][];
    /**
     * Target.
     */
    target: number[][];
};
/**
 * @classdesc
 * Class containing triangulation of the given target extent.
 * Used for determining source data and the reprojection itself.
 */
declare class Triangulation {
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection.
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
     * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
     * @param {number} errorThreshold Acceptable error (in source units).
     * @param {?number} opt_destinationResolution The (optional) resolution of the destination.
     */
    constructor(sourceProj: import("../proj/Projection.js").default, targetProj: import("../proj/Projection.js").default, targetExtent: number[], maxSourceExtent: number[], errorThreshold: number, opt_destinationResolution: number | null);
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */
    private sourceProj_;
    /**
     * @type {import("../proj/Projection.js").default}
     * @private
     */
    private targetProj_;
    /**
     * @param {import("../coordinate.js").Coordinate} c A coordinate.
     * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
     * @private
     */
    private transformInv_;
    /**
     * @type {import("../extent.js").Extent}
     * @private
     */
    private maxSourceExtent_;
    /**
     * @type {number}
     * @private
     */
    private errorThresholdSquared_;
    /**
     * @type {Array<Triangle>}
     * @private
     */
    private triangles_;
    /**
     * Indicates that the triangulation crosses edge of the source projection.
     * @type {boolean}
     * @private
     */
    private wrapsXInSource_;
    /**
     * @type {boolean}
     * @private
     */
    private canWrapXInSource_;
    /**
     * @type {?number}
     * @private
     */
    private sourceWorldWidth_;
    /**
     * @type {?number}
     * @private
     */
    private targetWorldWidth_;
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
    private addTriangle_;
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
    private addQuad_;
    /**
     * Calculates extent of the 'source' coordinates from all the triangles.
     *
     * @return {import("../extent.js").Extent} Calculated extent.
     */
    calculateSourceExtent(): number[];
    /**
     * @return {Array<Triangle>} Array of the calculated triangles.
     */
    getTriangles(): Triangle[];
}
//# sourceMappingURL=Triangulation.d.ts.map