/**
 * @module ol/Graticule
 */
import {degreesToStringHDMS} from './coordinate.js';
import {listen, unlistenByKey} from './events.js';
import {intersects, getCenter} from './extent.js';
import GeometryLayout from './geom/GeometryLayout.js';
import LineString from './geom/LineString.js';
import Point from './geom/Point.js';
import {meridian, parallel} from './geom/flat/geodesic.js';
import {clamp} from './math.js';
import {get as getProjection, equivalent as equivalentProjection, getTransform, transformExtent} from './proj.js';
import RenderEventType from './render/EventType.js';
import Fill from './style/Fill.js';
import Stroke from './style/Stroke.js';
import Text from './style/Text.js';


/**
 * @type {Stroke}
 * @private
 * @const
 */
var DEFAULT_STROKE_STYLE = new Stroke({
  color: 'rgba(0,0,0,0.2)'
});

/**
 * @type {Array<number>}
 * @private
 */
var INTERVALS = [
  90, 45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.002, 0.001
];

/**
 * @typedef {Object} GraticuleLabelDataType
 * @property {Point} geom
 * @property {string} text
 */

/**
 * @typedef {Object} Options
 * @property {import("./PluggableMap.js").default} [map] Reference to an
 * {@link module:ol/Map~Map} object.
 * @property {number} [maxLines=100] The maximum number of meridians and
 * parallels from the center of the map. The default value of 100 means that at
 * most 200 meridians and 200 parallels will be displayed. The default value is
 * appropriate for conformal projections like Spherical Mercator. If you
 * increase the value, more lines will be drawn and the drawing performance will
 * decrease.
 * @property {Stroke} [strokeStyle='rgba(0,0,0,0.2)'] The
 * stroke style to use for drawing the graticule. If not provided, a not fully
 * opaque black will be used.
 * @property {number} [targetSize=100] The target size of the graticule cells,
 * in pixels.
 * @property {boolean} [showLabels=false] Render a label with the respective
 * latitude/longitude for each graticule line.
 * @property {function(number):string} [lonLabelFormatter] Label formatter for
 * longitudes. This function is called with the longitude as argument, and
 * should return a formatted string representing the longitude. By default,
 * labels are formatted as degrees, minutes, seconds and hemisphere.
 * @property {function(number):string} [latLabelFormatter] Label formatter for
 * latitudes. This function is called with the latitude as argument, and
 * should return a formatted string representing the latitude. By default,
 * labels are formatted as degrees, minutes, seconds and hemisphere.
 * @property {number} [lonLabelPosition=0] Longitude label position in fractions
 * (0..1) of view extent. 0 means at the bottom of the viewport, 1 means at the
 * top.
 * @property {number} [latLabelPosition=1] Latitude label position in fractions
 * (0..1) of view extent. 0 means at the left of the viewport, 1 means at the
 * right.
 * @property {Text} [lonLabelStyle] Longitude label text
 * style. If not provided, the following style will be used:
 * ```js
 * new Text({
 *   font: '12px Calibri,sans-serif',
 *   textBaseline: 'bottom',
 *   fill: new Fill({
 *     color: 'rgba(0,0,0,1)'
 *   }),
 *   stroke: new Stroke({
 *     color: 'rgba(255,255,255,1)',
 *     width: 3
 *   })
 * });
 * ```
 * Note that the default's `textBaseline` configuration will not work well for
 * `lonLabelPosition` configurations that position labels close to the top of
 * the viewport.
 * @property {Text} [latLabelStyle] Latitude label text style.
 * If not provided, the following style will be used:
 * ```js
 * new Text({
 *   font: '12px Calibri,sans-serif',
 *   textAlign: 'end',
 *   fill: new Fill({
 *     color: 'rgba(0,0,0,1)'
 *   }),
 *   stroke: Stroke({
 *     color: 'rgba(255,255,255,1)',
 *     width: 3
 *   })
 * });
 * ```
 * Note that the default's `textAlign` configuration will not work well for
 * `latLabelPosition` configurations that position labels close to the left of
 * the viewport.
 * @property {Array<number>} [intervals=[90, 45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.002, 0.001]]
 * Intervals (in degrees) for the graticule. Example to limit graticules to 30 and 10 degrees intervals:
 * ```js
 * [30, 10]
 * ```
 */


/**
 * Render a grid for a coordinate system on a map.
 * @api
 */
var Graticule = function Graticule(opt_options) {
  var options = opt_options || {};

  /**
   * @type {import("./PluggableMap.js").default}
   * @private
   */
  this.map_ = null;

  /**
   * @type {?import("./events.js").EventsKey}
   * @private
   */
  this.postcomposeListenerKey_ = null;

  /**
   * @type {import("./proj/Projection.js").default}
   */
  this.projection_ = null;

  /**
   * @type {number}
   * @private
   */
  this.maxLat_ = Infinity;

  /**
   * @type {number}
   * @private
   */
  this.maxLon_ = Infinity;

  /**
   * @type {number}
   * @private
   */
  this.minLat_ = -Infinity;

  /**
   * @type {number}
   * @private
   */
  this.minLon_ = -Infinity;

  /**
   * @type {number}
   * @private
   */
  this.maxLatP_ = Infinity;

  /**
   * @type {number}
   * @private
   */
  this.maxLonP_ = Infinity;

  /**
   * @type {number}
   * @private
   */
  this.minLatP_ = -Infinity;

  /**
   * @type {number}
   * @private
   */
  this.minLonP_ = -Infinity;

  /**
   * @type {number}
   * @private
   */
  this.targetSize_ = options.targetSize !== undefined ? options.targetSize : 100;

  /**
   * @type {number}
   * @private
   */
  this.maxLines_ = options.maxLines !== undefined ? options.maxLines : 100;

  /**
   * @type {Array<LineString>}
   * @private
   */
  this.meridians_ = [];

  /**
   * @type {Array<LineString>}
   * @private
   */
  this.parallels_ = [];

  /**
   * @type {Stroke}
   * @private
   */
  this.strokeStyle_ = options.strokeStyle !== undefined ? options.strokeStyle : DEFAULT_STROKE_STYLE;

  /**
   * @type {import("./proj.js").TransformFunction|undefined}
   * @private
   */
  this.fromLonLatTransform_ = undefined;

  /**
   * @type {import("./proj.js").TransformFunction|undefined}
   * @private
   */
  this.toLonLatTransform_ = undefined;

  /**
   * @type {import("./coordinate.js").Coordinate}
   * @private
   */
  this.projectionCenterLonLat_ = null;

  /**
   * @type {Array<GraticuleLabelDataType>}
   * @private
   */
  this.meridiansLabels_ = null;

  /**
   * @type {Array<GraticuleLabelDataType>}
   * @private
   */
  this.parallelsLabels_ = null;

  if (options.showLabels == true) {

    /**
     * @type {null|function(number):string}
     * @private
     */
    this.lonLabelFormatter_ = options.lonLabelFormatter == undefined ?
      degreesToStringHDMS.bind(this, 'EW') : options.lonLabelFormatter;

    /**
     * @type {function(number):string}
     * @private
     */
    this.latLabelFormatter_ = options.latLabelFormatter == undefined ?
      degreesToStringHDMS.bind(this, 'NS') : options.latLabelFormatter;

    /**
     * Longitude label position in fractions (0..1) of view extent. 0 means
     * bottom, 1 means top.
     * @type {number}
     * @private
     */
    this.lonLabelPosition_ = options.lonLabelPosition == undefined ? 0 :
      options.lonLabelPosition;

    /**
     * Latitude Label position in fractions (0..1) of view extent. 0 means left, 1
     * means right.
     * @type {number}
     * @private
     */
    this.latLabelPosition_ = options.latLabelPosition == undefined ? 1 :
      options.latLabelPosition;

    /**
     * @type {Text}
     * @private
     */
    this.lonLabelStyle_ = options.lonLabelStyle !== undefined ? options.lonLabelStyle :
      new Text({
        font: '12px Calibri,sans-serif',
        textBaseline: 'bottom',
        fill: new Fill({
          color: 'rgba(0,0,0,1)'
        }),
        stroke: new Stroke({
          color: 'rgba(255,255,255,1)',
          width: 3
        })
      });

    /**
     * @type {Text}
     * @private
     */
    this.latLabelStyle_ = options.latLabelStyle !== undefined ? options.latLabelStyle :
      new Text({
        font: '12px Calibri,sans-serif',
        textAlign: 'end',
        fill: new Fill({
          color: 'rgba(0,0,0,1)'
        }),
        stroke: new Stroke({
          color: 'rgba(255,255,255,1)',
          width: 3
        })
      });

    this.meridiansLabels_ = [];
    this.parallelsLabels_ = [];
  }

  /**
   * @type {Array<number>}
   * @private
   */
  this.intervals_ = options.intervals !== undefined ? options.intervals : INTERVALS;

  this.setMap(options.map !== undefined ? options.map : null);
};

/**
 * @param {number} lon Longitude.
 * @param {number} minLat Minimal latitude.
 * @param {number} maxLat Maximal latitude.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} index Index.
 * @return {number} Index.
 * @private
 */
Graticule.prototype.addMeridian_ = function addMeridian_ (lon, minLat, maxLat, squaredTolerance, extent, index) {
  var lineString = this.getMeridian_(lon, minLat, maxLat, squaredTolerance, index);
  if (intersects(lineString.getExtent(), extent)) {
    if (this.meridiansLabels_) {
      var textPoint = this.getMeridianPoint_(lineString, extent, index);
      this.meridiansLabels_[index] = {
        geom: textPoint,
        text: this.lonLabelFormatter_(lon)
      };
    }
    this.meridians_[index++] = lineString;
  }
  return index;
};

/**
 * @param {LineString} lineString Meridian
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} index Index.
 * @return {Point} Meridian point.
 * @private
 */
Graticule.prototype.getMeridianPoint_ = function getMeridianPoint_ (lineString, extent, index) {
  var flatCoordinates = lineString.getFlatCoordinates();
  var clampedBottom = Math.max(extent[1], flatCoordinates[1]);
  var clampedTop = Math.min(extent[3], flatCoordinates[flatCoordinates.length - 1]);
  var lat = clamp(
    extent[1] + Math.abs(extent[1] - extent[3]) * this.lonLabelPosition_,
    clampedBottom, clampedTop);
  var coordinate = [flatCoordinates[0], lat];
  var point;
  if (index in this.meridiansLabels_) {
    point = this.meridiansLabels_[index].geom;
    point.setCoordinates(coordinate);
  } else {
    point = new Point(coordinate);
  }
  return point;
};

/**
 * @param {number} lat Latitude.
 * @param {number} minLon Minimal longitude.
 * @param {number} maxLon Maximal longitude.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} index Index.
 * @return {number} Index.
 * @private
 */
Graticule.prototype.addParallel_ = function addParallel_ (lat, minLon, maxLon, squaredTolerance, extent, index) {
  var lineString = this.getParallel_(lat, minLon, maxLon, squaredTolerance, index);
  if (intersects(lineString.getExtent(), extent)) {
    if (this.parallelsLabels_) {
      var textPoint = this.getParallelPoint_(lineString, extent, index);
      this.parallelsLabels_[index] = {
        geom: textPoint,
        text: this.latLabelFormatter_(lat)
      };
    }
    this.parallels_[index++] = lineString;
  }
  return index;
};

/**
 * @param {LineString} lineString Parallels.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} index Index.
 * @return {Point} Parallel point.
 * @private
 */
Graticule.prototype.getParallelPoint_ = function getParallelPoint_ (lineString, extent, index) {
  var flatCoordinates = lineString.getFlatCoordinates();
  var clampedLeft = Math.max(extent[0], flatCoordinates[0]);
  var clampedRight = Math.min(extent[2], flatCoordinates[flatCoordinates.length - 2]);
  var lon = clamp(
    extent[0] + Math.abs(extent[0] - extent[2]) * this.latLabelPosition_,
    clampedLeft, clampedRight);
  var coordinate = [lon, flatCoordinates[1]];
  var point;
  if (index in this.parallelsLabels_) {
    point = this.parallelsLabels_[index].geom;
    point.setCoordinates(coordinate);
  } else {
    point = new Point(coordinate);
  }
  return point;
};

/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} squaredTolerance Squared tolerance.
 * @private
 */
Graticule.prototype.createGraticule_ = function createGraticule_ (extent, center, resolution, squaredTolerance) {

  var interval = this.getInterval_(resolution);
  if (interval == -1) {
    this.meridians_.length = this.parallels_.length = 0;
    if (this.meridiansLabels_) {
      this.meridiansLabels_.length = 0;
    }
    if (this.parallelsLabels_) {
      this.parallelsLabels_.length = 0;
    }
    return;
  }

  var centerLonLat = this.toLonLatTransform_(center);
  var centerLon = centerLonLat[0];
  var centerLat = centerLonLat[1];
  var maxLines = this.maxLines_;
  var cnt, idx, lat, lon;

  var validExtent = [
    Math.max(extent[0], this.minLonP_),
    Math.max(extent[1], this.minLatP_),
    Math.min(extent[2], this.maxLonP_),
    Math.min(extent[3], this.maxLatP_)
  ];

  validExtent = transformExtent(validExtent, this.projection_, 'EPSG:4326');
  var maxLat = validExtent[3];
  var maxLon = validExtent[2];
  var minLat = validExtent[1];
  var minLon = validExtent[0];

  // Create meridians

  centerLon = Math.floor(centerLon / interval) * interval;
  lon = clamp(centerLon, this.minLon_, this.maxLon_);

  idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, 0);

  cnt = 0;
  while (lon != this.minLon_ && cnt++ < maxLines) {
    lon = Math.max(lon - interval, this.minLon_);
    idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
  }

  lon = clamp(centerLon, this.minLon_, this.maxLon_);

  cnt = 0;
  while (lon != this.maxLon_ && cnt++ < maxLines) {
    lon = Math.min(lon + interval, this.maxLon_);
    idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
  }

  this.meridians_.length = idx;
  if (this.meridiansLabels_) {
    this.meridiansLabels_.length = idx;
  }

  // Create parallels

  centerLat = Math.floor(centerLat / interval) * interval;
  lat = clamp(centerLat, this.minLat_, this.maxLat_);

  idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, 0);

  cnt = 0;
  while (lat != this.minLat_ && cnt++ < maxLines) {
    lat = Math.max(lat - interval, this.minLat_);
    idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
  }

  lat = clamp(centerLat, this.minLat_, this.maxLat_);

  cnt = 0;
  while (lat != this.maxLat_ && cnt++ < maxLines) {
    lat = Math.min(lat + interval, this.maxLat_);
    idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
  }

  this.parallels_.length = idx;
  if (this.parallelsLabels_) {
    this.parallelsLabels_.length = idx;
  }

};

/**
 * @param {number} resolution Resolution.
 * @return {number} The interval in degrees.
 * @private
 */
Graticule.prototype.getInterval_ = function getInterval_ (resolution) {
  var centerLon = this.projectionCenterLonLat_[0];
  var centerLat = this.projectionCenterLonLat_[1];
  var interval = -1;
  var target = Math.pow(this.targetSize_ * resolution, 2);
  /** @type {Array<number>} **/
  var p1 = [];
  /** @type {Array<number>} **/
  var p2 = [];
  for (var i = 0, ii = this.intervals_.length; i < ii; ++i) {
    var delta = this.intervals_[i] / 2;
    p1[0] = centerLon - delta;
    p1[1] = centerLat - delta;
    p2[0] = centerLon + delta;
    p2[1] = centerLat + delta;
    this.fromLonLatTransform_(p1, p1);
    this.fromLonLatTransform_(p2, p2);
    var dist = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
    if (dist <= target) {
      break;
    }
    interval = this.intervals_[i];
  }
  return interval;
};

/**
 * Get the map associated with this graticule.
 * @return {import("./PluggableMap.js").default} The map.
 * @api
 */
Graticule.prototype.getMap = function getMap () {
  return this.map_;
};

/**
 * @param {number} lon Longitude.
 * @param {number} minLat Minimal latitude.
 * @param {number} maxLat Maximal latitude.
 * @param {number} squaredTolerance Squared tolerance.
 * @return {LineString} The meridian line string.
 * @param {number} index Index.
 * @private
 */
Graticule.prototype.getMeridian_ = function getMeridian_ (lon, minLat, maxLat, squaredTolerance, index) {
  var flatCoordinates = meridian(lon, minLat, maxLat, this.projection_, squaredTolerance);
  var lineString = this.meridians_[index];
  if (!lineString) {
    lineString = this.meridians_[index] = new LineString(flatCoordinates, GeometryLayout.XY);
  } else {
    lineString.setFlatCoordinates(GeometryLayout.XY, flatCoordinates);
    lineString.changed();
  }
  return lineString;
};

/**
 * Get the list of meridians.Meridians are lines of equal longitude.
 * @return {Array<LineString>} The meridians.
 * @api
 */
Graticule.prototype.getMeridians = function getMeridians () {
  return this.meridians_;
};

/**
 * @param {number} lat Latitude.
 * @param {number} minLon Minimal longitude.
 * @param {number} maxLon Maximal longitude.
 * @param {number} squaredTolerance Squared tolerance.
 * @return {LineString} The parallel line string.
 * @param {number} index Index.
 * @private
 */
Graticule.prototype.getParallel_ = function getParallel_ (lat, minLon, maxLon, squaredTolerance, index) {
  var flatCoordinates = parallel(lat, minLon, maxLon, this.projection_, squaredTolerance);
  var lineString = this.parallels_[index];
  if (!lineString) {
    lineString = new LineString(flatCoordinates, GeometryLayout.XY);
  } else {
    lineString.setFlatCoordinates(GeometryLayout.XY, flatCoordinates);
    lineString.changed();
  }
  return lineString;
};

/**
 * Get the list of parallels.Parallels are lines of equal latitude.
 * @return {Array<LineString>} The parallels.
 * @api
 */
Graticule.prototype.getParallels = function getParallels () {
  return this.parallels_;
};

/**
 * @param {import("./render/Event.js").default} e Event.
 * @private
 */
Graticule.prototype.handlePostCompose_ = function handlePostCompose_ (e) {
  var vectorContext = e.vectorContext;
  var frameState = e.frameState;
  var extent = frameState.extent;
  var viewState = frameState.viewState;
  var center = viewState.center;
  var projection = viewState.projection;
  var resolution = viewState.resolution;
  var pixelRatio = frameState.pixelRatio;
  var squaredTolerance =
      resolution * resolution / (4 * pixelRatio * pixelRatio);

  var updateProjectionInfo = !this.projection_ ||
      !equivalentProjection(this.projection_, projection);

  if (updateProjectionInfo) {
    this.updateProjectionInfo_(projection);
  }

  this.createGraticule_(extent, center, resolution, squaredTolerance);

  // Draw the lines
  vectorContext.setFillStrokeStyle(null, this.strokeStyle_);
  var i, l, line;
  for (i = 0, l = this.meridians_.length; i < l; ++i) {
    line = this.meridians_[i];
    vectorContext.drawGeometry(line);
  }
  for (i = 0, l = this.parallels_.length; i < l; ++i) {
    line = this.parallels_[i];
    vectorContext.drawGeometry(line);
  }
  var labelData;
  if (this.meridiansLabels_) {
    for (i = 0, l = this.meridiansLabels_.length; i < l; ++i) {
      labelData = this.meridiansLabels_[i];
      this.lonLabelStyle_.setText(labelData.text);
      vectorContext.setTextStyle(this.lonLabelStyle_);
      vectorContext.drawGeometry(labelData.geom);
    }
  }
  if (this.parallelsLabels_) {
    for (i = 0, l = this.parallelsLabels_.length; i < l; ++i) {
      labelData = this.parallelsLabels_[i];
      this.latLabelStyle_.setText(labelData.text);
      vectorContext.setTextStyle(this.latLabelStyle_);
      vectorContext.drawGeometry(labelData.geom);
    }
  }
};

/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @private
 */
Graticule.prototype.updateProjectionInfo_ = function updateProjectionInfo_ (projection) {
  var epsg4326Projection = getProjection('EPSG:4326');

  var worldExtent = projection.getWorldExtent();
  var worldExtentP = transformExtent(worldExtent, epsg4326Projection, projection);

  this.maxLat_ = worldExtent[3];
  this.maxLon_ = worldExtent[2];
  this.minLat_ = worldExtent[1];
  this.minLon_ = worldExtent[0];

  this.maxLatP_ = worldExtentP[3];
  this.maxLonP_ = worldExtentP[2];
  this.minLatP_ = worldExtentP[1];
  this.minLonP_ = worldExtentP[0];

  this.fromLonLatTransform_ = getTransform(epsg4326Projection, projection);

  this.toLonLatTransform_ = getTransform(projection, epsg4326Projection);

  this.projectionCenterLonLat_ = this.toLonLatTransform_(getCenter(projection.getExtent()));

  this.projection_ = projection;
};

/**
 * Set the map for this graticule.The graticule will be rendered on the
 * provided map.
 * @param {import("./PluggableMap.js").default} map Map.
 * @api
 */
Graticule.prototype.setMap = function setMap (map) {
  if (this.map_) {
    unlistenByKey(this.postcomposeListenerKey_);
    this.postcomposeListenerKey_ = null;
    this.map_.render();
  }
  if (map) {
    this.postcomposeListenerKey_ = listen(map, RenderEventType.POSTCOMPOSE, this.handlePostCompose_, this);
    map.render();
  }
  this.map_ = map;
};

export default Graticule;

//# sourceMappingURL=Graticule.js.map