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
 * @module ol/VectorTile
 */
import Tile from './Tile.js';
import TileState from './TileState.js';
var VectorTile = /** @class */ (function (_super) {
    __extends(VectorTile, _super);
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {string} src Data source url.
     * @param {import("./format/Feature.js").default} format Feature format.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options=} opt_options Tile options.
     */
    function VectorTile(tileCoord, state, src, format, tileLoadFunction, opt_options) {
        var _this = _super.call(this, tileCoord, state, opt_options) || this;
        /**
         * Extent of this tile; set by the source.
         * @type {import("./extent.js").Extent}
         */
        _this.extent = null;
        /**
         * @private
         * @type {import("./format/Feature.js").default}
         */
        _this.format_ = format;
        /**
         * @private
         * @type {Array<import("./Feature.js").default>}
         */
        _this.features_ = null;
        /**
         * @private
         * @type {import("./featureloader.js").FeatureLoader}
         */
        _this.loader_;
        /**
         * Feature projection of this tile; set by the source.
         * @type {import("./proj/Projection.js").default}
         */
        _this.projection = null;
        /**
         * Resolution of this tile; set by the source.
         * @type {number}
         */
        _this.resolution;
        /**
         * @private
         * @type {import("./Tile.js").LoadFunction}
         */
        _this.tileLoadFunction_ = tileLoadFunction;
        /**
         * @private
         * @type {string}
         */
        _this.url_ = src;
        _this.key = src;
        return _this;
    }
    /**
     * Get the feature format assigned for reading this tile's features.
     * @return {import("./format/Feature.js").default} Feature format.
     * @api
     */
    VectorTile.prototype.getFormat = function () {
        return this.format_;
    };
    /**
     * Get the features for this tile. Geometries will be in the view projection.
     * @return {Array<import("./Feature.js").FeatureLike>} Features.
     * @api
     */
    VectorTile.prototype.getFeatures = function () {
        return this.features_;
    };
    /**
     * Load not yet loaded URI.
     */
    VectorTile.prototype.load = function () {
        if (this.state == TileState.IDLE) {
            this.setState(TileState.LOADING);
            this.tileLoadFunction_(this, this.url_);
            if (this.loader_) {
                this.loader_(this.extent, this.resolution, this.projection);
            }
        }
    };
    /**
     * Handler for successful tile load.
     * @param {Array<import("./Feature.js").default>} features The loaded features.
     * @param {import("./proj/Projection.js").default} dataProjection Data projection.
     */
    VectorTile.prototype.onLoad = function (features, dataProjection) {
        this.setFeatures(features);
    };
    /**
     * Handler for tile load errors.
     */
    VectorTile.prototype.onError = function () {
        this.setState(TileState.ERROR);
    };
    /**
     * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
     * Sets the features for the tile.
     * @param {Array<import("./Feature.js").default>} features Features.
     * @api
     */
    VectorTile.prototype.setFeatures = function (features) {
        this.features_ = features;
        this.setState(TileState.LOADED);
    };
    /**
     * Set the feature loader for reading this tile's features.
     * @param {import("./featureloader.js").FeatureLoader} loader Feature loader.
     * @api
     */
    VectorTile.prototype.setLoader = function (loader) {
        this.loader_ = loader;
    };
    return VectorTile;
}(Tile));
export default VectorTile;
//# sourceMappingURL=VectorTile.js.map