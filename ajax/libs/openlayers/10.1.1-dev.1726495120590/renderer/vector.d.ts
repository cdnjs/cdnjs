/**
 * @param {import("../Feature.js").FeatureLike} feature1 Feature 1.
 * @param {import("../Feature.js").FeatureLike} feature2 Feature 2.
 * @return {number} Order.
 */
export function defaultOrder(feature1: import("../Feature.js").FeatureLike, feature2: import("../Feature.js").FeatureLike): number;
/**
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @return {number} Squared pixel tolerance.
 */
export function getSquaredTolerance(resolution: number, pixelRatio: number): number;
/**
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @return {number} Pixel tolerance.
 */
export function getTolerance(resolution: number, pixelRatio: number): number;
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {function(import("../events/Event.js").default): void} listener Listener function.
 * @param {import("../proj.js").TransformFunction} [transform] Transform from user to view projection.
 * @param {boolean} [declutter] Enable decluttering.
 * @param {number} [index] Render order index..
 * @return {boolean} `true` if style is loading.
 */
export function renderFeature(replayGroup: import("../render/canvas/BuilderGroup.js").default, feature: import("../Feature.js").FeatureLike, style: import("../style/Style.js").default, squaredTolerance: number, listener: (arg0: import("../events/Event.js").default) => void, transform?: import("../proj.js").TransformFunction | undefined, declutter?: boolean | undefined, index?: number | undefined): boolean;
/**
 * Feature callback. The callback will be called with three arguments. The first
 * argument is one {@link module :ol/Feature~Feature feature} or {@link module :ol/render/Feature~RenderFeature render feature}
 * at the pixel, the second is the {@link module :ol/layer/Layer~Layer layer} of the feature and will be null for
 * unmanaged layers. The third is the {@link module :ol/geom/SimpleGeometry~SimpleGeometry} of the feature. For features
 * with a GeometryCollection geometry, it will be the first detected geometry from the collection.
 */
export type FeatureCallback<T> = (arg0: import("../Feature.js").FeatureLike, arg1: import("../layer/Layer.js").default<import("../source/Source").default>, arg2: import("../geom/SimpleGeometry.js").default) => T;
//# sourceMappingURL=vector.d.ts.map