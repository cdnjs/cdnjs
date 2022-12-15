/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [attribution=true] Include
 * {@link module:ol/control/Attribution~Attribution}.
 * @property {import("./control/Attribution.js").Options} [attributionOptions]
 * Options for {@link module:ol/control/Attribution~Attribution}.
 * @property {boolean} [rotate=true] Include
 * {@link module:ol/control/Rotate~Rotate}.
 * @property {import("./control/Rotate.js").Options} [rotateOptions] Options
 * for {@link module:ol/control/Rotate~Rotate}.
 * @property {boolean} [zoom] Include {@link module:ol/control/Zoom~Zoom}.
 * @property {import("./control/Zoom.js").Options} [zoomOptions] Options for
 * {@link module:ol/control/Zoom~Zoom}.
 * @api
 */
/**
 * Set of controls included in maps by default. Unless configured otherwise,
 * this returns a collection containing an instance of each of the following
 * controls:
 * * {@link module:ol/control/Zoom~Zoom}
 * * {@link module:ol/control/Rotate~Rotate}
 * * {@link module:ol/control/Attribution~Attribution}
 *
 * @param {DefaultsOptions} [opt_options]
 * Defaults options.
 * @return {Collection<import("./control/Control.js").default>}
 * Controls.
 * @api
 */
export function defaults(opt_options?: DefaultsOptions | undefined): Collection<import("./control/Control.js").default>;
export { default as Attribution } from "./control/Attribution.js";
export { default as Control } from "./control/Control.js";
export { default as FullScreen } from "./control/FullScreen.js";
export { default as MousePosition } from "./control/MousePosition.js";
export { default as OverviewMap } from "./control/OverviewMap.js";
export { default as Rotate } from "./control/Rotate.js";
export { default as ScaleLine } from "./control/ScaleLine.js";
export { default as Zoom } from "./control/Zoom.js";
export { default as ZoomSlider } from "./control/ZoomSlider.js";
export { default as ZoomToExtent } from "./control/ZoomToExtent.js";
export type DefaultsOptions = {
    /**
     * Include
     * {@link module:ol/control/Attribution~Attribution}.
     */
    attribution?: boolean;
    /**
     * Options for {@link module:ol/control/Attribution~Attribution}.
     */
    attributionOptions?: import("./control/Attribution.js").Options;
    /**
     * Include
     * {@link module:ol/control/Rotate~Rotate}.
     */
    rotate?: boolean;
    /**
     * Options
     * for {@link module:ol/control/Rotate~Rotate}.
     */
    rotateOptions?: import("./control/Rotate.js").Options;
    /**
     * Include {@link module:ol/control/Zoom~Zoom}.
     */
    zoom?: boolean;
    /**
     * Options for
     * {@link module:ol/control/Zoom~Zoom}.
     */
    zoomOptions?: import("./control/Zoom.js").Options;
};
import Collection from "./Collection.js";
//# sourceMappingURL=control.d.ts.map