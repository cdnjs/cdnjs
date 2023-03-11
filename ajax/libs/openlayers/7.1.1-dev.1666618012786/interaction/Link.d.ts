export default Link;
export type Params = 'x' | 'y' | 'z' | 'r' | 'l';
export type Options = {
    /**
     * Animate view transitions.
     */
    animate?: boolean | import("../View.js").AnimationOptions | undefined;
    /**
     * Properties to track. Default is to track
     * `x` (center x), `y` (center y), `z` (zoom), `r` (rotation) and `l` (layers).
     */
    params?: Params[] | undefined;
    /**
     * Replace the current URL without creating the new entry in browser history.
     * By default, changes in the map state result in a new entry being added to the browser history.
     */
    replace?: boolean | undefined;
    /**
     * By default, the URL will be updated with search parameters x, y, z, and r.  To
     * avoid collisions with existing search parameters that your application uses, you can supply a custom prefix for
     * the ones used by this interaction (e.g. 'ol:').
     */
    prefix?: string | undefined;
};
/** @typedef {'x'|'y'|'z'|'r'|'l'} Params */
/**
 * @typedef {Object} Options
 * @property {boolean|import('../View.js').AnimationOptions} [animate=true] Animate view transitions.
 * @property {Array<Params>} [params=['x', 'y', 'z', 'r', 'l']] Properties to track. Default is to track
 * `x` (center x), `y` (center y), `z` (zoom), `r` (rotation) and `l` (layers).
 * @property {boolean} [replace=false] Replace the current URL without creating the new entry in browser history.
 * By default, changes in the map state result in a new entry being added to the browser history.
 * @property {string} [prefix=''] By default, the URL will be updated with search parameters x, y, z, and r.  To
 * avoid collisions with existing search parameters that your application uses, you can supply a custom prefix for
 * the ones used by this interaction (e.g. 'ol:').
 */
/**
 * @classdesc
 * An interaction that synchronizes the map state with the URL.
 *
 * @api
 */
declare class Link extends Interaction {
    /**
     * @param {Options} [options] Link options.
     */
    constructor(options?: Options | undefined);
    /**
     * @type {import('../View.js').AnimationOptions|null}
     * @private
     */
    private animationOptions_;
    /**
     * @type {Object<Params, boolean>}
     * @private
     */
    private params_;
    /**
     * @private
     * @type {boolean}
     */
    private replace_;
    /**
     * @private
     * @type {string}
     */
    private prefix_;
    /**
     * @private
     * @type {!Array<import("../events.js").EventsKey>}
     */
    private listenerKeys_;
    /**
     * @private
     * @type {boolean}
     */
    private initial_;
    /**
     * @private
     */
    private updateState_;
    /**
     * @private
     * @param {string} name A parameter name.
     * @return {string} A name with the prefix applied.
     */
    private getParamName_;
    /**
     * @private
     * @param {URLSearchParams} params The search params.
     * @param {string} name The unprefixed parameter name.
     * @return {string|null} The parameter value.
     */
    private get_;
    /**
     * @private
     * @param {URLSearchParams} params The search params.
     * @param {string} name The unprefixed parameter name.
     * @param {string} value The param value.
     */
    private set_;
    /**
     * @private
     * @param {URLSearchParams} params The search params.
     * @param {string} name The unprefixed parameter name.
     */
    private delete_;
    /**
     * @param {import("../Map.js").default} map Map.
     * @private
     */
    private registerListeners_;
    /**
     * @param {import("../Map.js").default} map Map.
     * @private
     */
    private unregisterListeners_;
    /**
     * @private
     */
    private handleChangeLayerGroup_;
    /**
     * @private
     */
    private updateUrl_;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=Link.d.ts.map