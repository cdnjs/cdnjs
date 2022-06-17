/**
 * Update the scale line element.
 * @param {import("../MapEvent.js").default} mapEvent Map event.
 * @this {ScaleLine}
 */
export function render(mapEvent: import("../MapEvent.js").default): void;
export class render {
    /**
     * Update the scale line element.
     * @param {import("../MapEvent.js").default} mapEvent Map event.
     * @this {ScaleLine}
     */
    constructor(mapEvent: import("../MapEvent.js").default);
    viewState_: import("../View.js").State;
}
/**
 * Units for the scale line. Supported values are `'degrees'`, `'imperial'`,
 * `'nautical'`, `'metric'`, `'us'`.
 */
export type Units = string;
export namespace Units {
    export const DEGREES: string;
    export const IMPERIAL: string;
    export const NAUTICAL: string;
    export const METRIC: string;
    export const US: string;
}
export default ScaleLine;
export type Options = {
    /**
     * CSS Class name.
     */
    className?: string;
    /**
     * Minimum width in pixels.
     */
    minWidth?: number;
    /**
     * Function called when the control
     * should be re-rendered. This is called in a `requestAnimationFrame` callback.
     */
    render?: (arg0: import("../MapEvent.js").default) => any;
    /**
     * Specify a target if you want the control
     * to be rendered outside of the map's viewport.
     */
    target?: string | HTMLElement;
    /**
     * Units.
     */
    units?: string;
    /**
     * Render scalebars instead of a line.
     */
    bar?: boolean;
    /**
     * Number of steps the scalebar should use. Use even numbers
     * for best results. Only applies when `bar` is `true`.
     */
    steps?: number;
    /**
     * Render the text scale above of the scalebar. Only applies
     * when `bar` is `true`.
     */
    text?: boolean;
};
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-scale-line'] CSS Class name.
 * @property {number} [minWidth=64] Minimum width in pixels.
 * @property {function(import("../MapEvent.js").default)} [render] Function called when the control
 * should be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {HTMLElement|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {Units|string} [units='metric'] Units.
 * @property {boolean} [bar=false] Render scalebars instead of a line.
 * @property {number} [steps=4] Number of steps the scalebar should use. Use even numbers
 * for best results. Only applies when `bar` is `true`.
 * @property {boolean} [text=false] Render the text scale above of the scalebar. Only applies
 * when `bar` is `true`.
 */
/**
 * @classdesc
 * A control displaying rough y-axis distances, calculated for the center of the
 * viewport. For conformal projections (e.g. EPSG:3857, the default view
 * projection in OpenLayers), the scale is valid for all directions.
 * No scale line will be shown when the y-axis distance of a pixel at the
 * viewport center cannot be calculated in the view projection.
 * By default the scale line will show in the bottom left portion of the map,
 * but this can be changed by using the css selector `.ol-scale-line`.
 * When specifying `bar` as `true`, a scalebar will be rendered instead
 * of a scaleline.
 *
 * @api
 */
declare class ScaleLine extends Control {
    /**
     * @param {Options=} opt_options Scale line options.
     */
    constructor(opt_options?: Options);
    /**
     * @private
     * @type {HTMLElement}
     */
    private innerElement_;
    /**
     * @private
     * @type {?import("../View.js").State}
     */
    private viewState_;
    /**
     * @private
     * @type {number}
     */
    private minWidth_;
    /**
     * @private
     * @type {boolean}
     */
    private renderedVisible_;
    /**
     * @private
     * @type {number|undefined}
     */
    private renderedWidth_;
    /**
     * @private
     * @type {string}
     */
    private renderedHTML_;
    /**
     * @private
     * @type {boolean}
     */
    private scaleBar_;
    /**
     * @private
     * @type {number}
     */
    private scaleBarSteps_;
    /**
     * @private
     * @type {boolean}
     */
    private scaleBarText_;
    /**
     * Return the units to use in the scale line.
     * @return {Units} The units
     * to use in the scale line.
     * @observable
     * @api
     */
    getUnits(): string;
    /**
     * @private
     */
    private handleUnitsChanged_;
    /**
     * Set the units to use in the scale line.
     * @param {Units} units The units to use in the scale line.
     * @observable
     * @api
     */
    setUnits(units: string): void;
    /**
     * @private
     */
    private updateElement_;
    /**
     * @private
     * @param {number} width The current width of the scalebar.
     * @param {number} scale The current scale.
     * @param {string} suffix The suffix to append to the scale text.
     * @returns {string} The stringified HTML of the scalebar.
     */
    private createScaleBar;
    /**
     * Creates a marker at given position
     * @param {string} position - The position, absolute or relative
     * @param {number} i - The iterator
     * @returns {string} The stringified div containing the marker
     */
    createMarker(position: string, i: number): string;
    /**
     * Creates the label for a marker marker at given position
     * @param {number} i - The iterator
     * @param {number} width - The width the scalebar will currently use
     * @param {boolean} isLast - Flag indicating if we add the last step text
     * @param {number} scale - The current scale for the whole scalebar
     * @param {string} suffix - The suffix for the scale
     * @returns {string} The stringified div containing the step text
     */
    createStepText(i: number, width: number, isLast: boolean, scale: number, suffix: string): string;
    /**
     * Returns the appropriate scale for the given resolution and units.
     * @return {number} The appropriate scale.
     */
    getScaleForResolution(): number;
}
import Control from "./Control.js";
//# sourceMappingURL=ScaleLine.d.ts.map