/**
 * @module ol/source/TileJSON
 */
// FIXME check order of async callbacks

/**
 * See http://mapbox.com/developers/api/.
 */


import {createFromTemplates} from '../tileurlfunction.js';
import {assert} from '../asserts.js';
import {applyTransform, intersects} from '../extent.js';
import {jsonp as requestJSONP} from '../net.js';
import {get as getProjection, getTransformFromProjections} from '../proj.js';
import SourceState from './State.js';
import TileImage from './TileImage.js';
import {createXYZ, extentFromProjection} from '../tilegrid.js';


/**
 * @typedef {Object} Config
 * @property {string} [name] The name.
 * @property {string} [description] The description.
 * @property {string} [version] The version.
 * @property {string} [attribution] The attribution.
 * @property {string} [template] The template.
 * @property {string} [legend] The legend.
 * @property {string} [scheme] The scheme.
 * @property {Array<string>} tiles The tile URL templates.
 * @property {Array<string>} [grids] Optional grids.
 * @property {number} [minzoom] Minimum zoom level.
 * @property {number} [maxzoom] Maximum zoom level.
 * @property {Array<number>} [bounds] Optional bounds.
 * @property {Array<number>} [center] Optional center.
 */


/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize=2048] Cache size.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you are using the WebGL renderer or if you want to
 * access pixel data with the Canvas renderer.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [jsonp=false] Use JSONP with callback to load the TileJSON.
 * Useful when the server does not support CORS..
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {Config} [tileJSON] TileJSON configuration for this source.
 * If not provided, `url` must be configured.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {string} [url] URL to the TileJSON file. If not provided, `tileJSON` must be configured.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */


/**
 * @classdesc
 * Layer source for tile data in TileJSON format.
 * @api
 */
var TileJSON = /*@__PURE__*/(function (TileImage) {
  function TileJSON(options) {
    TileImage.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      projection: getProjection('EPSG:3857'),
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: SourceState.LOADING,
      tileLoadFunction: options.tileLoadFunction,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      transition: options.transition
    });

    /**
     * @type {Config}
     * @private
     */
    this.tileJSON_ = null;


    if (options.url) {
      if (options.jsonp) {
        requestJSONP(options.url, this.handleTileJSONResponse.bind(this),
          this.handleTileJSONError.bind(this));
      } else {
        var client = new XMLHttpRequest();
        client.addEventListener('load', this.onXHRLoad_.bind(this));
        client.addEventListener('error', this.onXHRError_.bind(this));
        client.open('GET', options.url);
        client.send();
      }
    } else if (options.tileJSON) {
      this.handleTileJSONResponse(options.tileJSON);
    } else {
      assert(false, 51); // Either `url` or `tileJSON` options must be provided
    }

  }

  if ( TileImage ) TileJSON.__proto__ = TileImage;
  TileJSON.prototype = Object.create( TileImage && TileImage.prototype );
  TileJSON.prototype.constructor = TileJSON;

  /**
   * @private
   * @param {Event} event The load event.
   */
  TileJSON.prototype.onXHRLoad_ = function onXHRLoad_ (event) {
    var client = /** @type {XMLHttpRequest} */ (event.target);
    // status will be 0 for file:// urls
    if (!client.status || client.status >= 200 && client.status < 300) {
      var response;
      try {
        response = /** @type {TileJSON} */(JSON.parse(client.responseText));
      } catch (err) {
        this.handleTileJSONError();
        return;
      }
      this.handleTileJSONResponse(response);
    } else {
      this.handleTileJSONError();
    }
  };

  /**
   * @private
   * @param {Event} event The error event.
   */
  TileJSON.prototype.onXHRError_ = function onXHRError_ (event) {
    this.handleTileJSONError();
  };

  /**
   * @return {Config} The tilejson object.
   * @api
   */
  TileJSON.prototype.getTileJSON = function getTileJSON () {
    return this.tileJSON_;
  };

  /**
   * @protected
   * @param {Config} tileJSON Tile JSON.
   */
  TileJSON.prototype.handleTileJSONResponse = function handleTileJSONResponse (tileJSON) {

    var epsg4326Projection = getProjection('EPSG:4326');

    var sourceProjection = this.getProjection();
    var extent;
    if (tileJSON['bounds'] !== undefined) {
      var transform = getTransformFromProjections(
        epsg4326Projection, sourceProjection);
      extent = applyTransform(tileJSON['bounds'], transform);
    }

    var minZoom = tileJSON['minzoom'] || 0;
    var maxZoom = tileJSON['maxzoom'] || 22;
    var tileGrid = createXYZ({
      extent: extentFromProjection(sourceProjection),
      maxZoom: maxZoom,
      minZoom: minZoom
    });
    this.tileGrid = tileGrid;

    this.tileUrlFunction = createFromTemplates(tileJSON['tiles'], tileGrid);

    if (tileJSON['attribution'] !== undefined && !this.getAttributions()) {
      var attributionExtent = extent !== undefined ?
        extent : epsg4326Projection.getExtent();

      this.setAttributions(function(frameState) {
        if (intersects(attributionExtent, frameState.extent)) {
          return [tileJSON['attribution']];
        }
        return null;
      });

    }
    this.tileJSON_ = tileJSON;
    this.setState(SourceState.READY);

  };

  /**
   * @protected
   */
  TileJSON.prototype.handleTileJSONError = function handleTileJSONError () {
    this.setState(SourceState.ERROR);
  };

  return TileJSON;
}(TileImage));


export default TileJSON;

//# sourceMappingURL=TileJSON.js.map