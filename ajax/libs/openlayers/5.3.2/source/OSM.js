/**
 * @module ol/source/OSM
 */

import XYZ from './XYZ.js';


/**
 * The attribution containing a link to the OpenStreetMap Copyright and License
 * page.
 * @const
 * @type {string}
 * @api
 */
export var ATTRIBUTION = '&#169; ' +
      '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      'contributors.';


/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize=2048] Cache size.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you are using the WebGL renderer or if you want to
 * access pixel data with the Canvas renderer.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {number} [maxZoom=19] Max zoom.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {number} [reprojectionErrorThreshold=1.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {string} [url='https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
 * Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */


/**
 * @classdesc
 * Layer source for the OpenStreetMap tile server.
 * @api
 */
var OSM = /*@__PURE__*/(function (XYZ) {
  function OSM(opt_options) {

    var options = opt_options || {};

    var attributions;
    if (options.attributions !== undefined) {
      attributions = options.attributions;
    } else {
      attributions = [ATTRIBUTION];
    }

    var crossOrigin = options.crossOrigin !== undefined ?
      options.crossOrigin : 'anonymous';

    var url = options.url !== undefined ?
      options.url : 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    XYZ.call(this, {
      attributions: attributions,
      cacheSize: options.cacheSize,
      crossOrigin: crossOrigin,
      opaque: options.opaque !== undefined ? options.opaque : true,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      url: url,
      wrapX: options.wrapX,
      attributionsCollapsible: false
    });

  }

  if ( XYZ ) OSM.__proto__ = XYZ;
  OSM.prototype = Object.create( XYZ && XYZ.prototype );
  OSM.prototype.constructor = OSM;

  return OSM;
}(XYZ));

export default OSM;

//# sourceMappingURL=OSM.js.map