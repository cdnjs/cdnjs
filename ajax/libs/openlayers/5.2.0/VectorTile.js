/**
 * @module ol/VectorTile
 */
import {getUid} from './util.js';
import Tile from './Tile.js';
import TileState from './TileState.js';

/**
 * @const
 * @type {module:ol/extent~Extent}
 */
var DEFAULT_EXTENT = [0, 0, 4096, 4096];


/**
 * @typedef {function(new: module:ol/VectorTile, module:ol/tilecoord~TileCoord,
 * module:ol/TileState, string, ?string, module:ol/Tile~LoadFunction)} TileClass
 * @api
 */

var VectorTile = (function (Tile) {
  function VectorTile(tileCoord, state, src, format, tileLoadFunction, opt_options) {

    Tile.call(this, tileCoord, state, opt_options);

    /**
     * @type {number}
     */
    this.consumers = 0;

    /**
     * @private
     * @type {module:ol/extent~Extent}
     */
    this.extent_ = null;

    /**
     * @private
     * @type {module:ol/format/Feature}
     */
    this.format_ = format;

    /**
     * @private
     * @type {Array<module:ol/Feature>}
     */
    this.features_ = null;

    /**
     * @private
     * @type {module:ol/featureloader~FeatureLoader}
     */
    this.loader_;

    /**
     * Data projection
     * @private
     * @type {module:ol/proj/Projection}
     */
    this.projection_ = null;

    /**
     * @private
     * @type {Object<string, module:ol/render/ReplayGroup>}
     */
    this.replayGroups_ = {};

    /**
     * @private
     * @type {module:ol/Tile~LoadFunction}
     */
    this.tileLoadFunction_ = tileLoadFunction;

    /**
     * @private
     * @type {string}
     */
    this.url_ = src;

  }

  if ( Tile ) VectorTile.__proto__ = Tile;
  VectorTile.prototype = Object.create( Tile && Tile.prototype );
  VectorTile.prototype.constructor = VectorTile;

  /**
   * @inheritDoc
   */
  VectorTile.prototype.disposeInternal = function disposeInternal () {
    this.features_ = null;
    this.replayGroups_ = {};
    this.state = TileState.ABORT;
    this.changed();
    Tile.prototype.disposeInternal.call(this);
  };

  /**
   * Gets the extent of the vector tile.
   * @return {module:ol/extent~Extent} The extent.
   * @api
   */
  VectorTile.prototype.getExtent = function getExtent () {
    return this.extent_ || DEFAULT_EXTENT;
  };

  /**
   * Get the feature format assigned for reading this tile's features.
   * @return {module:ol/format/Feature} Feature format.
   * @api
   */
  VectorTile.prototype.getFormat = function getFormat () {
    return this.format_;
  };

  /**
   * Get the features for this tile. Geometries will be in the projection returned
   * by {@link module:ol/VectorTile~VectorTile#getProjection}.
   * @return {Array<module:ol/Feature|module:ol/render/Feature>} Features.
   * @api
   */
  VectorTile.prototype.getFeatures = function getFeatures () {
    return this.features_;
  };

  /**
   * @inheritDoc
   */
  VectorTile.prototype.getKey = function getKey () {
    return this.url_;
  };

  /**
   * Get the feature projection of features returned by
   * {@link module:ol/VectorTile~VectorTile#getFeatures}.
   * @return {module:ol/proj/Projection} Feature projection.
   * @api
   */
  VectorTile.prototype.getProjection = function getProjection () {
    return this.projection_;
  };

  /**
   * @param {module:ol/layer/Layer} layer Layer.
   * @param {string} key Key.
   * @return {module:ol/render/ReplayGroup} Replay group.
   */
  VectorTile.prototype.getReplayGroup = function getReplayGroup (layer, key) {
    return this.replayGroups_[getUid(layer) + ',' + key];
  };

  /**
   * @inheritDoc
   */
  VectorTile.prototype.load = function load () {
    if (this.state == TileState.IDLE) {
      this.setState(TileState.LOADING);
      this.tileLoadFunction_(this, this.url_);
      this.loader_(null, NaN, null);
    }
  };

  /**
   * Handler for successful tile load.
   * @param {Array<module:ol/Feature>} features The loaded features.
   * @param {module:ol/proj/Projection} dataProjection Data projection.
   * @param {module:ol/extent~Extent} extent Extent.
   */
  VectorTile.prototype.onLoad = function onLoad (features, dataProjection, extent) {
    this.setProjection(dataProjection);
    this.setFeatures(features);
    this.setExtent(extent);
  };

  /**
   * Handler for tile load errors.
   */
  VectorTile.prototype.onError = function onError () {
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
   * @param {module:ol/extent~Extent} extent The extent.
   * @api
   */
  VectorTile.prototype.setExtent = function setExtent (extent) {
    this.extent_ = extent;
  };

  /**
   * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
   * Sets the features for the tile.
   * @param {Array<module:ol/Feature>} features Features.
   * @api
   */
  VectorTile.prototype.setFeatures = function setFeatures (features) {
    this.features_ = features;
    this.setState(TileState.LOADED);
  };

  /**
   * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
   * Sets the projection of the features that were added with
   * {@link module:ol/VectorTile~VectorTile#setFeatures}.
   * @param {module:ol/proj/Projection} projection Feature projection.
   * @api
   */
  VectorTile.prototype.setProjection = function setProjection (projection) {
    this.projection_ = projection;
  };

  /**
   * @param {module:ol/layer/Layer} layer Layer.
   * @param {string} key Key.
   * @param {module:ol/render/ReplayGroup} replayGroup Replay group.
   */
  VectorTile.prototype.setReplayGroup = function setReplayGroup (layer, key, replayGroup) {
    this.replayGroups_[getUid(layer) + ',' + key] = replayGroup;
  };

  /**
   * Set the feature loader for reading this tile's features.
   * @param {module:ol/featureloader~FeatureLoader} loader Feature loader.
   * @api
   */
  VectorTile.prototype.setLoader = function setLoader (loader) {
    this.loader_ = loader;
  };

  return VectorTile;
}(Tile));

export default VectorTile;

//# sourceMappingURL=VectorTile.js.map