/**
 * @module ol/source/BingMaps
 */

import {createFromTileUrlFunctions} from '../tileurlfunction.js';
import {applyTransform, intersects} from '../extent.js';
import {jsonp as requestJSONP} from '../net.js';
import {get as getProjection, getTransformFromProjections} from '../proj.js';
import SourceState from './State.js';
import TileImage from './TileImage.js';
import {createOrUpdate, quadKey} from '../tilecoord.js';
import {createXYZ, extentFromProjection} from '../tilegrid.js';


/**
 * The attribution containing a link to the Microsoft® Bing™ Maps Platform APIs’
 * Terms Of Use.
 * @const
 * @type {string}
 */
var TOS_ATTRIBUTION = '<a class="ol-attribution-bing-tos" ' +
      'href="https://www.microsoft.com/maps/product/terms.html">' +
      'Terms of Use</a>';


/**
 * @typedef {Object} Options
 * @property {number} [cacheSize=2048] Cache size.
 * @property {boolean} [hidpi=false] If `true` hidpi tiles will be requested.
 * @property {string} [culture='en-us'] Culture code.
 * @property {string} key Bing Maps API key. Get yours at http://www.bingmapsportal.com/.
 * @property {string} imagerySet Type of imagery.
 * @property {number} [maxZoom=21] Max zoom. Default is what's advertized by the BingMaps service.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */


/**
 * @typedef {Object} BingMapsImageryMetadataResponse
 * @property {number} statusCode The response status code
 * @property {string} statusDescription The response status description
 * @property {string} authenticationResultCode The authentication result code
 * @property {Array<ResourceSet>} resourceSets The array of resource sets
 */


/**
 * @typedef {Object} ResourceSet
 * @property {Array<Resource>} resources
 */


/**
 * @typedef {Object} Resource
 * @property {number} imageHeight The image height
 * @property {number} imageWidth The image width
 * @property {number} zoomMin The minimum zoom level
 * @property {number} zoomMax The maximum zoom level
 * @property {string} imageUrl The image URL
 * @property {Array<string>} imageUrlSubdomains The image URL subdomains for rotation
 * @property {Array<ImageryProvider>} [imageryProviders] The array of ImageryProviders
 */


/**
 * @typedef {Object} ImageryProvider
 * @property {Array<CoverageArea>} coverageAreas The coverage areas
 * @property {string} [attribution] The attribution
 */


/**
 * @typedef {Object} CoverageArea
 * @property {number} zoomMin The minimum zoom
 * @property {number} zoomMax The maximum zoom
 * @property {Array<number>} bbox The coverage bounding box
 */


/**
 * @classdesc
 * Layer source for Bing Maps tile data.
 * @api
 */
var BingMaps = /*@__PURE__*/(function (TileImage) {
  function BingMaps(options) {

    var hidpi = options.hidpi !== undefined ? options.hidpi : false;

    TileImage.call(this, {
      cacheSize: options.cacheSize,
      crossOrigin: 'anonymous',
      opaque: true,
      projection: getProjection('EPSG:3857'),
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: SourceState.LOADING,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: hidpi ? 2 : 1,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      transition: options.transition
    });

    /**
     * @private
     * @type {boolean}
     */
    this.hidpi_ = hidpi;


    /**
     * @private
     * @type {string}
     */
    this.culture_ = options.culture !== undefined ? options.culture : 'en-us';

    /**
     * @private
     * @type {number}
     */
    this.maxZoom_ = options.maxZoom !== undefined ? options.maxZoom : -1;

    /**
     * @private
     * @type {string}
     */
    this.apiKey_ = options.key;

    /**
     * @private
     * @type {string}
     */
    this.imagerySet_ = options.imagerySet;

    var url = 'https://dev.virtualearth.net/REST/v1/Imagery/Metadata/' +
        this.imagerySet_ +
        '?uriScheme=https&include=ImageryProviders&key=' + this.apiKey_ +
        '&c=' + this.culture_;

    requestJSONP(url, this.handleImageryMetadataResponse.bind(this), undefined,
      'jsonp');

  }

  if ( TileImage ) BingMaps.__proto__ = TileImage;
  BingMaps.prototype = Object.create( TileImage && TileImage.prototype );
  BingMaps.prototype.constructor = BingMaps;

  /**
   * Get the api key used for this source.
   *
   * @return {string} The api key.
   * @api
   */
  BingMaps.prototype.getApiKey = function getApiKey () {
    return this.apiKey_;
  };

  /**
   * Get the imagery set associated with this source.
   *
   * @return {string} The imagery set.
   * @api
   */
  BingMaps.prototype.getImagerySet = function getImagerySet () {
    return this.imagerySet_;
  };

  /**
   * @param {BingMapsImageryMetadataResponse} response Response.
   */
  BingMaps.prototype.handleImageryMetadataResponse = function handleImageryMetadataResponse (response) {
    if (response.statusCode != 200 ||
        response.statusDescription != 'OK' ||
        response.authenticationResultCode != 'ValidCredentials' ||
        response.resourceSets.length != 1 ||
        response.resourceSets[0].resources.length != 1) {
      this.setState(SourceState.ERROR);
      return;
    }

    var resource = response.resourceSets[0].resources[0];
    var maxZoom = this.maxZoom_ == -1 ? resource.zoomMax : this.maxZoom_;

    var sourceProjection = this.getProjection();
    var extent = extentFromProjection(sourceProjection);
    var scale = this.hidpi_ ? 2 : 1;
    var tileSize = resource.imageWidth == resource.imageHeight ?
      resource.imageWidth / scale :
      [resource.imageWidth / scale, resource.imageHeight / scale];

    var tileGrid = createXYZ({
      extent: extent,
      minZoom: resource.zoomMin,
      maxZoom: maxZoom,
      tileSize: tileSize
    });
    this.tileGrid = tileGrid;

    var culture = this.culture_;
    var hidpi = this.hidpi_;
    this.tileUrlFunction = createFromTileUrlFunctions(
      resource.imageUrlSubdomains.map(function(subdomain) {
        var quadKeyTileCoord = [0, 0, 0];
        var imageUrl = resource.imageUrl
          .replace('{subdomain}', subdomain)
          .replace('{culture}', culture);
        return (
          /**
           * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
           * @param {number} pixelRatio Pixel ratio.
           * @param {import("../proj/Projection.js").default} projection Projection.
           * @return {string|undefined} Tile URL.
           */
          function(tileCoord, pixelRatio, projection) {
            if (!tileCoord) {
              return undefined;
            } else {
              createOrUpdate(tileCoord[0], tileCoord[1], -tileCoord[2] - 1, quadKeyTileCoord);
              var url = imageUrl;
              if (hidpi) {
                url += '&dpi=d1&device=mobile';
              }
              return url.replace('{quadkey}', quadKey(quadKeyTileCoord));
            }
          }
        );
      }));

    if (resource.imageryProviders) {
      var transform = getTransformFromProjections(
        getProjection('EPSG:4326'), this.getProjection());

      this.setAttributions(function(frameState) {
        var attributions = [];
        var viewState = frameState.viewState;
        var tileGrid = this.getTileGrid();
        var tileCoord = tileGrid.getTileCoordForCoordAndResolution(viewState.center, viewState.resolution);
        var zoom = tileCoord[0];
        resource.imageryProviders.map(function(imageryProvider) {
          var intersecting = false;
          var coverageAreas = imageryProvider.coverageAreas;
          for (var i = 0, ii = coverageAreas.length; i < ii; ++i) {
            var coverageArea = coverageAreas[i];
            if (zoom >= coverageArea.zoomMin && zoom <= coverageArea.zoomMax) {
              var bbox = coverageArea.bbox;
              var epsg4326Extent = [bbox[1], bbox[0], bbox[3], bbox[2]];
              var extent = applyTransform(epsg4326Extent, transform);
              if (intersects(extent, frameState.extent)) {
                intersecting = true;
                break;
              }
            }
          }
          if (intersecting) {
            attributions.push(imageryProvider.attribution);
          }
        });

        attributions.push(TOS_ATTRIBUTION);
        return attributions;
      }.bind(this));
    }

    this.setState(SourceState.READY);
  };

  return BingMaps;
}(TileImage));

export default BingMaps;

//# sourceMappingURL=BingMaps.js.map