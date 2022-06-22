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
 * @param {import("../proj.js").TransformFunction} [opt_transform] Transform from user to view projection.
 * @return {boolean} `true` if style is loading.
 * @template T
 */
export function renderFeature<T>(replayGroup: import("../render/canvas/BuilderGroup.js").default, feature: import("../Feature.js").FeatureLike, style: import("../style/Style.js").default, squaredTolerance: number, listener: (arg0: import("../events/Event.js").default) => void, opt_transform?: import("../proj.js").TransformFunction): boolean;
//# sourceMappingURL=vector.d.ts.map