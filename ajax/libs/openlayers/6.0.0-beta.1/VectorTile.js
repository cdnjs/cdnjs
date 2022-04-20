var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
/**
 * @const
 * @type {import("./extent.js").Extent}
 */
var DEFAULT_EXTENT = [0, 0, 4096, 4096];
var VectorTile = /** @class */ (function (_super) {
    __extends(VectorTile, _super);
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {TileState} state State.
     * @param {string} src Data source url.
     * @param {import("./format/Feature.js").default} format Feature format.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options=} opt_options Tile options.
     */
    function VectorTile(tileCoord, state, src, format, tileLoadFunction, opt_options) {
        var _this = _super.call(this, tileCoord, state, opt_options) || this;
        /**
         * @type {number}
         */
        _this.consumers = 0;
        /**
         * @private
         * @type {import("./extent.js").Extent}
         */
        _this.extent_ = null;
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
         * Data projection
         * @private
         * @type {import("./proj/Projection.js").default}
         */
        _this.projection_ = null;
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
        return _this;
    }
    /**
     * @inheritDoc
     */
    VectorTile.prototype.disposeInternal = function () {
        this.setState(TileState.ABORT);
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Gets the extent of the vector tile.
     * @return {import("./extent.js").Extent} The extent.
     * @api
     */
    VectorTile.prototype.getExtent = function () {
        return this.extent_ || DEFAULT_EXTENT;
    };
    /**
     * Get the feature format assigned for reading this tile's features.
     * @return {import("./format/Feature.js").default} Feature format.
     * @api
     */
    VectorTile.prototype.getFormat = function () {
        return this.format_;
    };
    /**
     * Get the features for this tile. Geometries will be in the projection returned
     * by {@link module:ol/VectorTile~VectorTile#getProjection}.
     * @return {Array<import("./Feature.js").FeatureLike>} Features.
     * @api
     */
    VectorTile.prototype.getFeatures = function () {
        return this.features_;
    };
    /**
     * @inheritDoc
     */
    VectorTile.prototype.getKey = function () {
        return this.url_;
    };
    /**
     * Get the feature projection of features returned by
     * {@link module:ol/VectorTile~VectorTile#getFeatures}.
     * @return {import("./proj/Projection.js").default} Feature projection.
     * @api
     */
    VectorTile.prototype.getProjection = function () {
        return this.projection_;
    };
    /**
     * @inheritDoc
     */
    VectorTile.prototype.load = function () {
        if (this.state == TileState.IDLE) {
            this.setState(TileState.LOADING);
            this.tileLoadFunction_(this, this.url_);
            this.loader_(null, NaN, null);
        }
    };
    /**
     * Handler for successful tile load.
     * @param {Array<import("./Feature.js").default>} features The loaded features.
     * @param {import("./proj/Projection.js").default} dataProjection Data projection.
     * @param {import("./extent.js").Extent} extent Extent.
     */
    VectorTile.prototype.onLoad = function (features, dataProjection, extent) {
        this.setProjection(dataProjection);
        this.setFeatures(features);
        this.setExtent(extent);
    };
    /**
     * Handler for tile load errors.
     */
    VectorTile.prototype.onError = function () {
        this.setState(TileState.ERROR);
    };
    /**
     * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s
     * `tileLoadFunction`. Sets the extent of the vector tile. This is only required
     * for tiles in projections with `tile-pixels` as units. The extent should be
     * set to `[0, 0, tilePixelSize, tilePixelSize]`, where `tilePixelSize` is
     * calculated by multiplying the tile size with the tile pixel ratio. For
     * sources using {@link module:ol/format/MVT~MVT} as feature format, the
     * {@link module:ol/format/MVT~MVT#getLastExtent} method will return the correct
     * extent. The default is `[0, 0, 4096, 4096]`.
     * @param {import("./extent.js").Extent} extent The extent.
     * @api
     */
    VectorTile.prototype.setExtent = function (extent) {
        this.extent_ = extent;
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
     * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
     * Sets the projection of the features that were added with
     * {@link module:ol/VectorTile~VectorTile#setFeatures}.
     * @param {import("./proj/Projection.js").default} projection Feature projection.
     * @api
     */
    VectorTile.prototype.setProjection = function (projection) {
        this.projection_ = projection;
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