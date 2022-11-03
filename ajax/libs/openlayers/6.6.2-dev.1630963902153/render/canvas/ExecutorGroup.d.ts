/**
 * This methods creates an array with indexes of all pixels within a circle,
 * ordered by how close they are to the center.
 * A cache is used to increase performance.
 * @param {number} radius Radius.
 * @return {Array<number>} An array with indexes within a circle.
 */
export function getPixelIndexArray(radius: number): number[];
export default ExecutorGroup;
declare class ExecutorGroup {
    /**
     * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
     * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
     * should be set here, unless the target context does not exceed that extent (which
     * can be the case when rendering to tiles).
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} overlaps The executor group can have overlapping geometries.
     * @param {!Object<string, !Object<import("./BuilderType.js").default, import("../canvas.js").SerializableInstructions>>} allInstructions
     * The serializable instructions.
     * @param {number} [opt_renderBuffer] Optional rendering buffer.
     */
    constructor(maxExtent: number[], resolution: number, pixelRatio: number, overlaps: boolean, allInstructions: {
        [x: string]: any;
    }, opt_renderBuffer?: number | undefined);
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    private maxExtent_;
    /**
     * @private
     * @type {boolean}
     */
    private overlaps_;
    /**
     * @private
     * @type {number}
     */
    private pixelRatio_;
    /**
     * @private
     * @type {number}
     */
    private resolution_;
    /**
     * @private
     * @type {number|undefined}
     */
    private renderBuffer_;
    /**
     * @private
     * @type {!Object<string, !Object<import("./BuilderType.js").default, import("./Executor").default>>}
     */
    private executorsByZIndex_;
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    private hitDetectionContext_;
    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private hitDetectionTransform_;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     */
    clip(context: CanvasRenderingContext2D, transform: number[]): void;
    /**
     * Create executors and populate them using the provided instructions.
     * @private
     * @param {!Object<string, !Object<import("./BuilderType.js").default, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
     */
    private createExecutors_;
    /**
     * @param {Array<import("./BuilderType.js").default>} executors Executors.
     * @return {boolean} Has executors of the provided types.
     */
    hasExecutors(executors: any[]): boolean;
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
     * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
     * @return {T|undefined} Callback result.
     * @template T
     */
    forEachFeatureAtCoordinate<T>(coordinate: number[], resolution: number, rotation: number, hitTolerance: number, callback: (arg0: import("../Feature.js").default | import("../../Feature.js").default<import("../../geom/Geometry.js").default>, arg1: import("../../geom/SimpleGeometry.js").default, arg2: number) => T, declutteredFeatures: (import("../Feature.js").default | import("../../Feature.js").default<import("../../geom/Geometry.js").default>)[]): T | undefined;
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     * @return {Array<number>} Clip coordinates.
     */
    getClipCoords(transform: number[]): number[];
    /**
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
     * @param {Array<import("./BuilderType.js").default>} [opt_builderTypes] Ordered replay types to replay.
     *     Default is {@link module:ol/render/replay~ORDER}
     * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
     */
    execute(context: CanvasRenderingContext2D, contextScale: number, transform: number[], viewRotation: number, snapToPixel: boolean, opt_builderTypes?: any[] | undefined, opt_declutterTree?: any): void;
}
//# sourceMappingURL=ExecutorGroup.d.ts.map