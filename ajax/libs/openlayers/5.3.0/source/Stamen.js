/**
 * @module ol/source/Stamen
 */

import {ATTRIBUTION as OSM_ATTRIBUTION} from './OSM.js';
import XYZ from './XYZ.js';


/**
 * @const
 * @type {Array<string>}
 */
var ATTRIBUTIONS = [
  'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, ' +
        'under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY' +
        ' 3.0</a>.',
  OSM_ATTRIBUTION
];


/**
 * @type {Object<string, {extension: string, opaque: boolean}>}
 */
var LayerConfig = {
  'terrain': {
    extension: 'jpg',
    opaque: true
  },
  'terrain-background': {
    extension: 'jpg',
    opaque: true
  },
  'terrain-labels': {
    extension: 'png',
    opaque: false
  },
  'terrain-lines': {
    extension: 'png',
    opaque: false
  },
  'toner-background': {
    extension: 'png',
    opaque: true
  },
  'toner': {
    extension: 'png',
    opaque: true
  },
  'toner-hybrid': {
    extension: 'png',
    opaque: false
  },
  'toner-labels': {
    extension: 'png',
    opaque: false
  },
  'toner-lines': {
    extension: 'png',
    opaque: false
  },
  'toner-lite': {
    extension: 'png',
    opaque: true
  },
  'watercolor': {
    extension: 'jpg',
    opaque: true
  }
};


/**
 * @type {Object<string, {minZoom: number, maxZoom: number}>}
 */
var ProviderConfig = {
  'terrain': {
    minZoom: 4,
    maxZoom: 18
  },
  'toner': {
    minZoom: 0,
    maxZoom: 20
  },
  'watercolor': {
    minZoom: 1,
    maxZoom: 16
  }
};


/**
 * @typedef {Object} Options
 * @property {number} [cacheSize=2048] Cache size.
 * @property {string} layer Layer name.
 * @property {number} [minZoom] Minimum zoom.
 * @property {number} [maxZoom] Maximum zoom.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction]
 * Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */


/**
 * @classdesc
 * Layer source for the Stamen tile server.
 * @api
 */
var Stamen = /*@__PURE__*/(function (XYZ) {
  function Stamen(options) {
    var i = options.layer.indexOf('-');
    var provider = i == -1 ? options.layer : options.layer.slice(0, i);
    var providerConfig = ProviderConfig[provider];

    var layerConfig = LayerConfig[options.layer];

    var url = options.url !== undefined ? options.url :
      'https://stamen-tiles-{a-d}.a.ssl.fastly.net/' + options.layer +
        '/{z}/{x}/{y}.' + layerConfig.extension;

    XYZ.call(this, {
      attributions: ATTRIBUTIONS,
      cacheSize: options.cacheSize,
      crossOrigin: 'anonymous',
      maxZoom: options.maxZoom != undefined ? options.maxZoom : providerConfig.maxZoom,
      minZoom: options.minZoom != undefined ? options.minZoom : providerConfig.minZoom,
      opaque: layerConfig.opaque,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      url: url,
      wrapX: options.wrapX
    });

  }

  if ( XYZ ) Stamen.__proto__ = XYZ;
  Stamen.prototype = Object.create( XYZ && XYZ.prototype );
  Stamen.prototype.constructor = Stamen;

  return Stamen;
}(XYZ));

export default Stamen;

//# sourceMappingURL=Stamen.js.map