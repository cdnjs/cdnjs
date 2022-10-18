/**
 * @param {Array<number>} resolutions Resolutions.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
export function createSnapToResolutions(resolutions: number[], opt_smooth?: boolean, opt_maxExtent?: number[], opt_showFullExtent?: boolean): (arg0: number, arg1: number, arg2: number[], arg3?: boolean) => number;
/**
 * @param {number} power Power.
 * @param {number} maxResolution Maximum resolution.
 * @param {number} [opt_minResolution] Minimum resolution.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
export function createSnapToPower(power: number, maxResolution: number, opt_minResolution?: number, opt_smooth?: boolean, opt_maxExtent?: number[], opt_showFullExtent?: boolean): (arg0: number, arg1: number, arg2: number[], arg3?: boolean) => number;
/**
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @param {boolean} [opt_smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
 * @param {import("./extent.js").Extent} [opt_maxExtent] Maximum allowed extent.
 * @param {boolean} [opt_showFullExtent] If true, allows us to show the full extent. Default: false.
 * @return {Type} Zoom function.
 */
export function createMinMaxResolution(maxResolution: number, minResolution: number, opt_smooth?: boolean, opt_maxExtent?: number[], opt_showFullExtent?: boolean): (arg0: number, arg1: number, arg2: number[], arg3?: boolean) => number;
export type Type = (arg0: number, arg1: number, arg2: number[], arg3?: boolean) => number;
//# sourceMappingURL=resolutionconstraint.d.ts.map