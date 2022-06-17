/**
 * This methods creates a circle inside a fitting array. Points inside the
 * circle are marked by true, points on the outside are undefined.
 * It uses the midpoint circle algorithm.
 * A cache is used to increase performance.
 * @param {number} radius Radius.
 * @returns {Array<Array<(boolean|undefined)>>} An array with marked circle points.
 */
export function getCircleArray(radius: number): boolean[][];
/**
 * @param {!Object<string, Array<*>>} declutterReplays Declutter replays.
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {number} opacity Opacity.
 * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
 * @param {Array<import("../../PluggableMap.js").DeclutterItems>} declutterItems Declutter items.
 */
export function replayDeclutter(declutterReplays: {
    [x: string]: any[];
}, context: CanvasRenderingContext2D, rotation: number, opacity: number, snapToPixel: boolean, declutterItems: import("../../PluggableMap.js").DeclutterItems[]): void;
export default ExecutorGroup;
declare class ExecutorGroup {
    /**
     * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
     * `maxExtent` was set on the Buillder for this executor group, the same `maxExtent`
     * should be set here, unless the target context does not exceet that extent (which
     * can be the case when rendering to tiles).
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} overlaps The executor group can have overlapping geometries.
     * @param {!Object<string, !Object<BuilderType, import("./Builder.js").SerializableInstructions>>} allInstructions
     * The serializable instructions.
     * @param {number=} opt_renderBuffer Optional rendering buffer.
     */
    constructor(maxExtent: number[], resolution: number, pixelRatio: number, overlaps: boolean, allInstructions: {
        [x: string]: any;
    }, opt_renderBuffer?: number);
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
     * @type {!Object<string, !Object<BuilderType, import("./Executor").default>>}
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
     * @param {!Object<string, !Object<BuilderType, import("./Builder.js").SerializableInstructions>>} allInstructions The serializable instructions
     */
    private createExecutors_;
    /**
     * @param {Array<BuilderType>} executors Executors.
     * @return {boolean} Has executors of the provided types.
     */
    hasExecutors(executors: {
        CIRCLE: string;
        DEFAULT: string;
        IMAGE: string;
        LINE_STRING: string;
        POLYGON: string;
        TEXT: string;
    }[]): boolean;
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(import("../../Feature.js").FeatureLike): T} callback Feature callback.
     * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
     * @return {T|undefined} Callback result.
     * @template T
     */
    forEachFeatureAtCoordinate<T>(coordinate: number[], resolution: number, rotation: number, hitTolerance: number, callback: (arg0: import("../Feature.js").default | import("../../Feature.js").default<any>) => T, declutteredFeatures: (import("../Feature.js").default | import("../../Feature.js").default<any>)[]): T;
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
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
     * @param {Array<BuilderType>=} opt_builderTypes Ordered replay types to replay.
     *     Default is {@link module:ol/render/replay~ORDER}
     * @param {Object<string, import("../canvas.js").DeclutterGroup>=} opt_declutterReplays Declutter replays.
     */
    execute(context: CanvasRenderingContext2D, transform: number[], viewRotation: number, snapToPixel: boolean, opt_builderTypes?: {
        CIRCLE: string;
        DEFAULT: string;
        IMAGE: string;
        LINE_STRING: string;
        POLYGON: string;
        TEXT: string;
    }[], opt_declutterReplays?: {
        [x: string]: any[];
    }): void;
}
//# sourceMappingURL=ExecutorGroup.d.ts.map