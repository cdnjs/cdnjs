/**
 * @param {Array<number>} resolutions Resolutions.
 * @param {boolean} [smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [maxExtent] Maximum allowed extent.
 * @param {boolean} [showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
export function createSnapToResolutions(resolutions: Array<number>, smooth?: boolean | undefined, maxExtent?: import("./extent.js").Extent | undefined, showFullExtent?: boolean | undefined): Type;
/**
 * @param {number} power Power.
 * @param {number} maxResolution Maximum resolution.
 * @param {number} [minResolution] Minimum resolution.
 * @param {boolean} [smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [maxExtent] Maximum allowed extent.
 * @param {boolean} [showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
export function createSnapToPower(power: number, maxResolution: number, minResolution?: number | undefined, smooth?: boolean | undefined, maxExtent?: import("./extent.js").Extent | undefined, showFullExtent?: boolean | undefined): Type;
/**
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @param {boolean} [smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [maxExtent] Maximum allowed extent.
 * @param {boolean} [showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
export function createMinMaxResolution(maxResolution: number, minResolution: number, smooth?: boolean | undefined, maxExtent?: import("./extent.js").Extent | undefined, showFullExtent?: boolean | undefined): Type;
export type Type = (arg0: (number | undefined), arg1: number, arg2: import("./size.js").Size, arg3: boolean | undefined) => (number | undefined);
//# sourceMappingURL=resolutionconstraint.d.ts.map