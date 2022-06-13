export default Source;
/**
 * A function that returns a string or an array of strings representing source
 * attributions.
 */
export type Attribution = (arg0: import("../PluggableMap.js").FrameState) => string | string[];
/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 */
export type AttributionLike = string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
export type Options = {
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean;
    /**
     * Projection. Default is the view projection.
     */
    projection?: string | import("../proj/Projection.js").default;
    state?: {
        UNDEFINED: string;
        LOADING: string;
        /**
         * A type that can be used to provide attribution information for data sources.
         *
         * It represents either
         * * a simple string (e.g. `'© Acme Inc.'`)
         * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
         * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
         *
         * @typedef {string|Array<string>|Attribution} AttributionLike
         */
        /**
         * @typedef {Object} Options
         * @property {AttributionLike} [attributions]
         * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
         * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
         * @property {SourceState} [state='ready']
         * @property {boolean} [wrapX=false]
         */
        /**
         * @classdesc
         * Abstract base class; normally only used for creating subclasses and not
         * instantiated in apps.
         * Base class for {@link module:ol/layer/Layer~Layer} sources.
         *
         * A generic `change` event is triggered when the state of the source changes.
         * @abstract
         * @api
         */
        READY: string;
        ERROR: string;
    };
    wrapX?: boolean;
};
/**
 * A function that returns a string or an array of strings representing source
 * attributions.
 *
 * @typedef {function(import("../PluggableMap.js").FrameState): (string|Array<string>)} Attribution
 */
/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */
/**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {SourceState} [state='ready']
 * @property {boolean} [wrapX=false]
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */
declare class Source extends BaseObject {
    /**
     * @param {Options} options Source options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    private projection_;
    /**
     * @private
     * @type {?Attribution}
     */
    private attributions_;
    /**
     * @private
     * @type {boolean}
     */
    private attributionsCollapsible_;
    /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */
    loading: boolean;
    /**
     * @private
     * @type {SourceState}
     */
    private state_;
    /**
     * @private
     * @type {boolean}
     */
    private wrapX_;
    /**
     * Get the attribution function for the source.
     * @return {?Attribution} Attribution function.
     */
    getAttributions(): (arg0: import("../PluggableMap.js").FrameState) => string | string[];
    /**
     * @return {boolean} Attributions are collapsible.
     */
    getAttributionsCollapsible(): boolean;
    /**
     * Get the projection of the source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    getProjection(): import("../proj/Projection.js").default;
    /**
     * @abstract
     * @return {Array<number>|undefined} Resolutions.
     */
    getResolutions(): number[];
    /**
     * Get the state of the source, see {@link module:ol/source/State~State} for possible states.
     * @return {SourceState} State.
     * @api
     */
    getState(): {
        UNDEFINED: string;
        LOADING: string;
        /**
         * A type that can be used to provide attribution information for data sources.
         *
         * It represents either
         * * a simple string (e.g. `'© Acme Inc.'`)
         * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
         * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
         *
         * @typedef {string|Array<string>|Attribution} AttributionLike
         */
        /**
         * @typedef {Object} Options
         * @property {AttributionLike} [attributions]
         * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
         * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
         * @property {SourceState} [state='ready']
         * @property {boolean} [wrapX=false]
         */
        /**
         * @classdesc
         * Abstract base class; normally only used for creating subclasses and not
         * instantiated in apps.
         * Base class for {@link module:ol/layer/Layer~Layer} sources.
         *
         * A generic `change` event is triggered when the state of the source changes.
         * @abstract
         * @api
         */
        READY: string;
        ERROR: string;
    };
    /**
     * @return {boolean|undefined} Wrap X.
     */
    getWrapX(): boolean;
    /**
     * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
     * @api
     */
    refresh(): void;
    /**
     * Set the attributions of the source.
     * @param {AttributionLike|undefined} attributions Attributions.
     *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
     *     or `undefined`.
     * @api
     */
    setAttributions(attributions: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[])): void;
    /**
     * Set the state of the source.
     * @param {SourceState} state State.
     * @protected
     */
    protected setState(state: {
        UNDEFINED: string;
        LOADING: string;
        /**
         * A type that can be used to provide attribution information for data sources.
         *
         * It represents either
         * * a simple string (e.g. `'© Acme Inc.'`)
         * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
         * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
         *
         * @typedef {string|Array<string>|Attribution} AttributionLike
         */
        /**
         * @typedef {Object} Options
         * @property {AttributionLike} [attributions]
         * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
         * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
         * @property {SourceState} [state='ready']
         * @property {boolean} [wrapX=false]
         */
        /**
         * @classdesc
         * Abstract base class; normally only used for creating subclasses and not
         * instantiated in apps.
         * Base class for {@link module:ol/layer/Layer~Layer} sources.
         *
         * A generic `change` event is triggered when the state of the source changes.
         * @abstract
         * @api
         */
        READY: string;
        ERROR: string;
    }): void;
}
import BaseObject from "../Object.js";
//# sourceMappingURL=Source.d.ts.map