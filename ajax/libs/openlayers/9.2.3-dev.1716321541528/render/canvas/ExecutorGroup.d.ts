/**
 * This methods creates an array with indexes of all pixels within a circle,
 * ordered by how close they are to the center.
 * A cache is used to increase performance.
 * @param {number} radius Radius.
 * @return {Array<number>} An array with indexes within a circle.
 */
export function getPixelIndexArray(radius: number): Array<number>;
/**
 * @const
 * @type {Array<import("../canvas.js").BuilderType>}
 */
export const ALL: Array<import("../canvas.js").BuilderType>;
/**
 * @const
 * @type {Array<import("../canvas.js").BuilderType>}
 */
export const DECLUTTER: Array<import("../canvas.js").BuilderType>;
/**
 * @const
 * @type {Array<import("../canvas.js").BuilderType>}
 */
export const NON_DECLUTTER: Array<import("../canvas.js").BuilderType>;
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
     * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
     * The serializable instructions.
     * @param {number} [renderBuffer] Optional rendering buffer.
     * @param {boolean} [deferredRendering] Enable deferred rendering with renderDeferred().
     */
    constructor(maxExtent: import("../../extent.js").Extent, resolution: number, pixelRatio: number, overlaps: boolean, allInstructions: {
        [x: string]: any;
    }, renderBuffer?: number | undefined, deferredRendering?: boolean | undefined);
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
     * @type {!Object<string, !Object<string, import("./Executor").default>>}
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
     * @private
     * @type {CanvasRenderingContext2D}
     */
    private renderedContext_;
    /**
     * @type {Object<number, Array<import("./ZIndexContext.js").default>>}
     */
    deferredZIndexContexts_: {
        [x: number]: Array<import("./ZIndexContext.js").default>;
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     */
    clip(context: CanvasRenderingContext2D, transform: import("../../transform.js").Transform): void;
    /**
     * Create executors and populate them using the provided instructions.
     * @private
     * @param {!Object<string, !Object<string, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
     * @param {boolean} deferredRendering Enable deferred rendering.
     */
    private createExecutors_;
    /**
     * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
     * @return {boolean} Has executors of the provided types.
     */
    hasExecutors(executors: Array<import("../canvas.js").BuilderType>): boolean;
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
    forEachFeatureAtCoordinate<T>(coordinate: import("../../coordinate.js").Coordinate, resolution: number, rotation: number, hitTolerance: number, callback: (arg0: import("../../Feature.js").FeatureLike, arg1: import("../../geom/SimpleGeometry.js").default, arg2: number) => T, declutteredFeatures: Array<import("../../Feature.js").FeatureLike>): T | undefined;
    /**
     * @param {import("../../transform.js").Transform} transform Transform.
     * @return {Array<number>|null} Clip coordinates.
     */
    getClipCoords(transform: import("../../transform.js").Transform): Array<number> | null;
    /**
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * @param {CanvasRenderingContext2D} targetContext Context.
     * @param {import('../../size.js').Size} scaledCanvasSize Scale of the context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
     * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
     *     Default is {@link module:ol/render/replay~ALL}
     * @param {import("rbush").default|null} [declutterTree] Declutter tree.
     *     When set to null, no decluttering is done, even when the executor group has a `ZIndexContext`.
     */
    execute(targetContext: CanvasRenderingContext2D, scaledCanvasSize: import('../../size.js').Size, transform: import("../../transform.js").Transform, viewRotation: number, snapToPixel: boolean, builderTypes?: import("../canvas.js").BuilderType[] | undefined, declutterTree?: any | null): void;
    getDeferredZIndexContexts(): {
        [x: number]: import("./ZIndexContext.js").default[];
    };
    getRenderedContext(): CanvasRenderingContext2D;
    renderDeferred(): void;
}
//# sourceMappingURL=ExecutorGroup.d.ts.map