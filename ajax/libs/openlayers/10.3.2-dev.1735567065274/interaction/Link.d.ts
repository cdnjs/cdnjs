export default Link;
export type Params = "x" | "y" | "z" | "r" | "l";
export type Callback = (arg0: string) => void;
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
 * @typedef {function(string):void} Callback
 */
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
    constructor(options?: Options);
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
     * The tracked parameter callbacks.
     * @private
     * @type {Object<string, Callback>}
     */
    private trackedCallbacks_;
    /**
     * The tracked parameter values.
     * @private
     * @type {Object<string, string|null>}
     */
    private trackedValues_;
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
     * Register a listener for a URL search parameter.  The callback will be called with a new value
     * when the corresponding search parameter changes due to history events (e.g. browser navigation).
     *
     * @param {string} key The URL search parameter.
     * @param {Callback} callback The function to call when the search parameter changes.
     * @return {string|null} The initial value of the search parameter (or null if absent from the URL).
     * @api
     */
    track(key: string, callback: Callback): string | null;
    /**
     * Update the URL with a new search parameter value.  If the value is null, it will be
     * deleted from the search parameters.
     *
     * @param {string} key The URL search parameter.
     * @param {string|null} value The updated value (or null to remove it from the URL).
     * @api
     */
    update(key: string, value: string | null): void;
    /**
     * @private
     */
    private updateUrl_;
    /**
     * @private
     * @param {URL} url The URL.
     */
    private updateHistory_;
}
import Interaction from './Interaction.js';
//# sourceMappingURL=Link.d.ts.map