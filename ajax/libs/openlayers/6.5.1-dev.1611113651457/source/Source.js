var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/source/Source
 */
import BaseObject from '../Object.js';
import SourceState from './State.js';
import { abstract } from '../util.js';
import { get as getProjection } from '../proj.js';
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
 * @property {import("./State.js").default} [state='ready']
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
var Source = /** @class */ (function (_super) {
    __extends(Source, _super);
    /**
     * @param {Options} options Source options.
     */
    function Source(options) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {import("../proj/Projection.js").default}
         */
        _this.projection_ = getProjection(options.projection);
        /**
         * @private
         * @type {?Attribution}
         */
        _this.attributions_ = adaptAttributions(options.attributions);
        /**
         * @private
         * @type {boolean}
         */
        _this.attributionsCollapsible_ =
            options.attributionsCollapsible !== undefined
                ? options.attributionsCollapsible
                : true;
        /**
         * This source is currently loading data. Sources that defer loading to the
         * map's tile queue never set this to `true`.
         * @type {boolean}
         */
        _this.loading = false;
        /**
         * @private
         * @type {import("./State.js").default}
         */
        _this.state_ =
            options.state !== undefined ? options.state : SourceState.READY;
        /**
         * @private
         * @type {boolean}
         */
        _this.wrapX_ = options.wrapX !== undefined ? options.wrapX : false;
        return _this;
    }
    /**
     * Get the attribution function for the source.
     * @return {?Attribution} Attribution function.
     */
    Source.prototype.getAttributions = function () {
        return this.attributions_;
    };
    /**
     * @return {boolean} Attributions are collapsible.
     */
    Source.prototype.getAttributionsCollapsible = function () {
        return this.attributionsCollapsible_;
    };
    /**
     * Get the projection of the source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    Source.prototype.getProjection = function () {
        return this.projection_;
    };
    /**
     * @abstract
     * @return {Array<number>|undefined} Resolutions.
     */
    Source.prototype.getResolutions = function () {
        return abstract();
    };
    /**
     * Get the state of the source, see {@link module:ol/source/State~State} for possible states.
     * @return {import("./State.js").default} State.
     * @api
     */
    Source.prototype.getState = function () {
        return this.state_;
    };
    /**
     * @return {boolean|undefined} Wrap X.
     */
    Source.prototype.getWrapX = function () {
        return this.wrapX_;
    };
    /**
     * @return {Object|undefined} Context options.
     */
    Source.prototype.getContextOptions = function () {
        return undefined;
    };
    /**
     * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
     * @api
     */
    Source.prototype.refresh = function () {
        this.changed();
    };
    /**
     * Set the attributions of the source.
     * @param {AttributionLike|undefined} attributions Attributions.
     *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
     *     or `undefined`.
     * @api
     */
    Source.prototype.setAttributions = function (attributions) {
        this.attributions_ = adaptAttributions(attributions);
        this.changed();
    };
    /**
     * Set the state of the source.
     * @param {import("./State.js").default} state State.
     */
    Source.prototype.setState = function (state) {
        this.state_ = state;
        this.changed();
    };
    return Source;
}(BaseObject));
/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {?Attribution} An attribution function (or null).
 */
function adaptAttributions(attributionLike) {
    if (!attributionLike) {
        return null;
    }
    if (Array.isArray(attributionLike)) {
        return function (frameState) {
            return attributionLike;
        };
    }
    if (typeof attributionLike === 'function') {
        return attributionLike;
    }
    return function (frameState) {
        return [attributionLike];
    };
}
export default Source;
//# sourceMappingURL=Source.js.map