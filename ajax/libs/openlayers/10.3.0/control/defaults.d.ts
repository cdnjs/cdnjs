/**
 * @typedef {Object} DefaultsOptions
 * @property {boolean} [attribution=true] Include
 * {@link module:ol/control/Attribution~Attribution}.
 * @property {import("./Attribution.js").Options} [attributionOptions]
 * Options for {@link module:ol/control/Attribution~Attribution}.
 * @property {boolean} [rotate=true] Include
 * {@link module:ol/control/Rotate~Rotate}.
 * @property {import("./Rotate.js").Options} [rotateOptions] Options
 * for {@link module:ol/control/Rotate~Rotate}.
 * @property {boolean} [zoom] Include {@link module:ol/control/Zoom~Zoom}.
 * @property {import("./Zoom.js").Options} [zoomOptions] Options for
 * {@link module:ol/control/Zoom~Zoom}.
 */
/**
 * Set of controls included in maps by default. Unless configured otherwise,
 * this returns a collection containing an instance of each of the following
 * controls:
 * * {@link module:ol/control/Zoom~Zoom}
 * * {@link module:ol/control/Rotate~Rotate}
 * * {@link module:ol/control/Attribution~Attribution}
 *
 * @param {DefaultsOptions} [options] Options for the default controls.
 * @return {Collection<import("./Control.js").default>} A collection of controls
 * to be used with the {@link module:ol/Map~Map} constructor's `controls` option.
 * @api
 */
export function defaults(options?: DefaultsOptions): Collection<import("./Control.js").default>;
export type DefaultsOptions = {
    /**
     * Include
     * {@link module :ol/control/Attribution~Attribution}.
     */
    attribution?: boolean | undefined;
    /**
     * Options for {@link module :ol/control/Attribution~Attribution}.
     */
    attributionOptions?: import("./Attribution.js").Options | undefined;
    /**
     * Include
     * {@link module :ol/control/Rotate~Rotate}.
     */
    rotate?: boolean | undefined;
    /**
     * Options
     * for {@link module :ol/control/Rotate~Rotate}.
     */
    rotateOptions?: import("./Rotate.js").Options | undefined;
    /**
     * Include {@link module :ol/control/Zoom~Zoom}.
     */
    zoom?: boolean | undefined;
    /**
     * Options for
     * {@link module :ol/control/Zoom~Zoom}.
     */
    zoomOptions?: import("./Zoom.js").Options | undefined;
};
import Collection from '../Collection.js';
//# sourceMappingURL=defaults.d.ts.map