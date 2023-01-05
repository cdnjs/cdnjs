var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/layer/Graticule
 */
import Collection from '../Collection.js';
import EventType from '../render/EventType.js';
import Feature from '../Feature.js';
import Fill from '../style/Fill.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import LineString from '../geom/LineString.js';
import Point from '../geom/Point.js';
import Stroke from '../style/Stroke.js';
import Style from '../style/Style.js';
import Text from '../style/Text.js';
import VectorLayer from './Vector.js';
import VectorSource from '../source/Vector.js';
import { applyTransform, approximatelyEquals, containsCoordinate, containsExtent, equals, getCenter, getHeight, getIntersection, getWidth, intersects, isEmpty, wrapX as wrapExtentX, } from '../extent.js';
import { assign } from '../obj.js';
import { clamp } from '../math.js';
import { degreesToStringHDMS } from '../coordinate.js';
import { equivalent as equivalentProjection, get as getProjection, getTransform, } from '../proj.js';
import { getVectorContext } from '../render.js';
import { meridian, parallel } from '../geom/flat/geodesic.js';
/**
 * @type {Stroke}
 * @private
 * @const
 */
var DEFAULT_STROKE_STYLE = new Stroke({
    color: 'rgba(0,0,0,0.2)',
});
/**
 * @type {Array<number>}
 * @private
 */
var INTERVALS = [
    90, 45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.002, 0.001,
];
/**
 * @typedef {Object} GraticuleLabelDataType
 * @property {Point} geom Geometry.
 * @property {string} text Text.
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [maxLines=100] The maximum number of meridians and
 * parallels from the center of the map. The default value of 100 means that at
 * most 200 meridians and 200 parallels will be displayed. The default value is
 * appropriate for conformal projections like Spherical Mercator. If you
 * increase the value, more lines will be drawn and the drawing performance will
 * decrease.
 * @property {Stroke} [strokeStyle] The
 * stroke style to use for drawing the graticule. If not provided, the following stroke will be used:
 * ```js
 * new Stroke({
 *   color: 'rgba(0, 0, 0, 0.2)' // a not fully opaque black
 * });
 * ```
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
 * @property {boolean} [wrapX=true] Whether to repeat the graticule horizontally.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * Layer that renders a grid for a coordinate system (currently only EPSG:4326 is supported).
 * Note that the view projection must define both extent and worldExtent.
 *
 * @fires import("../render/Event.js").RenderEvent
 * @extends {VectorLayer<import("../source/Vector.js").default>}
 * @api
 */
var Graticule = /** @class */ (function (_super) {
    __extends(Graticule, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function Graticule(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var baseOptions = assign({
            updateWhileAnimating: true,
            updateWhileInteracting: true,
            renderBuffer: 0,
        }, options);
        delete baseOptions.maxLines;
        delete baseOptions.strokeStyle;
        delete baseOptions.targetSize;
        delete baseOptions.showLabels;
        delete baseOptions.lonLabelFormatter;
        delete baseOptions.latLabelFormatter;
        delete baseOptions.lonLabelPosition;
        delete baseOptions.latLabelPosition;
        delete baseOptions.lonLabelStyle;
        delete baseOptions.latLabelStyle;
        delete baseOptions.intervals;
        _this = _super.call(this, baseOptions) || this;
        /**
         * @type {import("../proj/Projection.js").default}
         */
        _this.projection_ = null;
        /**
         * @type {number}
         * @private
         */
        _this.maxLat_ = Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.maxLon_ = Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.minLat_ = -Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.minLon_ = -Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.maxX_ = Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.maxY_ = Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.minX_ = -Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.minY_ = -Infinity;
        /**
         * @type {number}
         * @private
         */
        _this.targetSize_ =
            options.targetSize !== undefined ? options.targetSize : 100;
        /**
         * @type {number}
         * @private
         */
        _this.maxLines_ = options.maxLines !== undefined ? options.maxLines : 100;
        /**
         * @type {Array<LineString>}
         * @private
         */
        _this.meridians_ = [];
        /**
         * @type {Array<LineString>}
         * @private
         */
        _this.parallels_ = [];
        /**
         * @type {Stroke}
         * @private
         */
        _this.strokeStyle_ =
            options.strokeStyle !== undefined
                ? options.strokeStyle
                : DEFAULT_STROKE_STYLE;
        /**
         * @type {import("../proj.js").TransformFunction|undefined}
         * @private
         */
        _this.fromLonLatTransform_ = undefined;
        /**
         * @type {import("../proj.js").TransformFunction|undefined}
         * @private
         */
        _this.toLonLatTransform_ = undefined;
        /**
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.projectionCenterLonLat_ = null;
        /**
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.bottomLeft_ = null;
        /**
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.bottomRight_ = null;
        /**
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.topLeft_ = null;
        /**
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.topRight_ = null;
        /**
         * @type {Array<GraticuleLabelDataType>}
         * @private
         */
        _this.meridiansLabels_ = null;
        /**
         * @type {Array<GraticuleLabelDataType>}
         * @private
         */
        _this.parallelsLabels_ = null;
        if (options.showLabels) {
            /**
             * @type {null|function(number):string}
             * @private
             */
            _this.lonLabelFormatter_ =
                options.lonLabelFormatter == undefined
                    ? degreesToStringHDMS.bind(_this, 'EW')
                    : options.lonLabelFormatter;
            /**
             * @type {function(number):string}
             * @private
             */
            _this.latLabelFormatter_ =
                options.latLabelFormatter == undefined
                    ? degreesToStringHDMS.bind(_this, 'NS')
                    : options.latLabelFormatter;
            /**
             * Longitude label position in fractions (0..1) of view extent. 0 means
             * bottom, 1 means top.
             * @type {number}
             * @private
             */
            _this.lonLabelPosition_ =
                options.lonLabelPosition == undefined ? 0 : options.lonLabelPosition;
            /**
             * Latitude Label position in fractions (0..1) of view extent. 0 means left, 1
             * means right.
             * @type {number}
             * @private
             */
            _this.latLabelPosition_ =
                options.latLabelPosition == undefined ? 1 : options.latLabelPosition;
            /**
             * @type {Style}
             * @private
             */
            _this.lonLabelStyleBase_ = new Style({
                text: options.lonLabelStyle !== undefined
                    ? options.lonLabelStyle.clone()
                    : new Text({
                        font: '12px Calibri,sans-serif',
                        textBaseline: 'bottom',
                        fill: new Fill({
                            color: 'rgba(0,0,0,1)',
                        }),
                        stroke: new Stroke({
                            color: 'rgba(255,255,255,1)',
                            width: 3,
                        }),
                    }),
            });
            /**
             * @private
             * @param {import("../Feature").default} feature Feature
             * @return {Style} style
             */
            _this.lonLabelStyle_ = function (feature) {
                var label = feature.get('graticule_label');
                this.lonLabelStyleBase_.getText().setText(label);
                return this.lonLabelStyleBase_;
            }.bind(_this);
            /**
             * @type {Style}
             * @private
             */
            _this.latLabelStyleBase_ = new Style({
                text: options.latLabelStyle !== undefined
                    ? options.latLabelStyle.clone()
                    : new Text({
                        font: '12px Calibri,sans-serif',
                        textAlign: 'right',
                        fill: new Fill({
                            color: 'rgba(0,0,0,1)',
                        }),
                        stroke: new Stroke({
                            color: 'rgba(255,255,255,1)',
                            width: 3,
                        }),
                    }),
            });
            /**
             * @private
             * @param {import("../Feature").default} feature Feature
             * @return {Style} style
             */
            _this.latLabelStyle_ = function (feature) {
                var label = feature.get('graticule_label');
                this.latLabelStyleBase_.getText().setText(label);
                return this.latLabelStyleBase_;
            }.bind(_this);
            _this.meridiansLabels_ = [];
            _this.parallelsLabels_ = [];
            _this.addEventListener(EventType.POSTRENDER, _this.drawLabels_.bind(_this));
        }
        /**
         * @type {Array<number>}
         * @private
         */
        _this.intervals_ =
            options.intervals !== undefined ? options.intervals : INTERVALS;
        // use a source with a custom loader for lines & text
        _this.setSource(new VectorSource({
            loader: _this.loaderFunction.bind(_this),
            strategy: _this.strategyFunction.bind(_this),
            features: new Collection(),
            overlaps: false,
            useSpatialIndex: false,
            wrapX: options.wrapX,
        }));
        /**
         * feature pool to use when updating graticule
         * @type {Array<Feature>}
         * @private
         */
        _this.featurePool_ = [];
        /**
         * @type {Style}
         * @private
         */
        _this.lineStyle_ = new Style({
            stroke: _this.strokeStyle_,
        });
        /**
         * @type {?import("../extent.js").Extent}
         * @private
         */
        _this.loadedExtent_ = null;
        /**
         * @type {?import("../extent.js").Extent}
         */
        _this.renderedExtent_ = null;
        _this.setRenderOrder(null);
        return _this;
    }
    /**
     * Strategy function for loading features based on the view's extent and
     * resolution.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @return {Array<import("../extent.js").Extent>} Extents.
     */
    Graticule.prototype.strategyFunction = function (extent, resolution) {
        // extents may be passed in different worlds, to avoid endless loop we use only one
        var realWorldExtent = extent.slice();
        if (this.projection_ && this.getSource().getWrapX()) {
            wrapExtentX(realWorldExtent, this.projection_);
        }
        if (this.loadedExtent_) {
            if (approximatelyEquals(this.loadedExtent_, realWorldExtent, resolution)) {
                // make sure result is exactly equal to previous extent
                realWorldExtent = this.loadedExtent_.slice();
            }
            else {
                // we should not keep track of loaded extents
                this.getSource().removeLoadedExtent(this.loadedExtent_);
            }
        }
        return [realWorldExtent];
    };
    /**
     * Update geometries in the source based on current view
     * @param {import("../extent").Extent} extent Extent
     * @param {number} resolution Resolution
     * @param {import("../proj/Projection.js").default} projection Projection
     */
    Graticule.prototype.loaderFunction = function (extent, resolution, projection) {
        this.loadedExtent_ = extent;
        var source = this.getSource();
        // only consider the intersection between our own extent & the requested one
        var layerExtent = this.getExtent() || [
            -Infinity,
            -Infinity,
            Infinity,
            Infinity,
        ];
        var renderExtent = getIntersection(layerExtent, extent);
        if (this.renderedExtent_ && equals(this.renderedExtent_, renderExtent)) {
            return;
        }
        this.renderedExtent_ = renderExtent;
        // bail out if nothing to render
        if (isEmpty(renderExtent)) {
            return;
        }
        // update projection info
        var center = getCenter(renderExtent);
        var squaredTolerance = (resolution * resolution) / 4;
        var updateProjectionInfo = !this.projection_ || !equivalentProjection(this.projection_, projection);
        if (updateProjectionInfo) {
            this.updateProjectionInfo_(projection);
        }
        this.createGraticule_(renderExtent, center, resolution, squaredTolerance);
        // first make sure we have enough features in the pool
        var featureCount = this.meridians_.length + this.parallels_.length;
        if (this.meridiansLabels_) {
            featureCount += this.meridians_.length;
        }
        if (this.parallelsLabels_) {
            featureCount += this.parallels_.length;
        }
        var feature;
        while (featureCount > this.featurePool_.length) {
            feature = new Feature();
            this.featurePool_.push(feature);
        }
        var featuresColl = source.getFeaturesCollection();
        featuresColl.clear();
        var poolIndex = 0;
        // add features for the lines & labels
        var i, l;
        for (i = 0, l = this.meridians_.length; i < l; ++i) {
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(this.meridians_[i]);
            feature.setStyle(this.lineStyle_);
            featuresColl.push(feature);
        }
        for (i = 0, l = this.parallels_.length; i < l; ++i) {
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(this.parallels_[i]);
            feature.setStyle(this.lineStyle_);
            featuresColl.push(feature);
        }
    };
    /**
     * @param {number} lon Longitude.
     * @param {number} minLat Minimal latitude.
     * @param {number} maxLat Maximal latitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {number} Index.
     * @private
     */
    Graticule.prototype.addMeridian_ = function (lon, minLat, maxLat, squaredTolerance, extent, index) {
        var lineString = this.getMeridian_(lon, minLat, maxLat, squaredTolerance, index);
        if (intersects(lineString.getExtent(), extent)) {
            if (this.meridiansLabels_) {
                var text = this.lonLabelFormatter_(lon);
                if (index in this.meridiansLabels_) {
                    this.meridiansLabels_[index].text = text;
                }
                else {
                    this.meridiansLabels_[index] = {
                        geom: new Point([]),
                        text: text,
                    };
                }
            }
            this.meridians_[index++] = lineString;
        }
        return index;
    };
    /**
     * @param {number} lat Latitude.
     * @param {number} minLon Minimal longitude.
     * @param {number} maxLon Maximal longitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {number} Index.
     * @private
     */
    Graticule.prototype.addParallel_ = function (lat, minLon, maxLon, squaredTolerance, extent, index) {
        var lineString = this.getParallel_(lat, minLon, maxLon, squaredTolerance, index);
        if (intersects(lineString.getExtent(), extent)) {
            if (this.parallelsLabels_) {
                var text = this.latLabelFormatter_(lat);
                if (index in this.parallelsLabels_) {
                    this.parallelsLabels_[index].text = text;
                }
                else {
                    this.parallelsLabels_[index] = {
                        geom: new Point([]),
                        text: text,
                    };
                }
            }
            this.parallels_[index++] = lineString;
        }
        return index;
    };
    /**
     * @param {import("../render/Event.js").default} event Render event.
     * @private
     */
    Graticule.prototype.drawLabels_ = function (event) {
        var rotation = event.frameState.viewState.rotation;
        var extent = event.frameState.extent;
        var rotationCenter = getCenter(extent);
        var rotationExtent = extent;
        if (rotation) {
            var width = getWidth(extent);
            var height = getHeight(extent);
            var cr = Math.abs(Math.cos(rotation));
            var sr = Math.abs(Math.sin(rotation));
            var unrotatedWidth = (sr * height - cr * width) / (sr * sr - cr * cr);
            var unrotatedHeight = (sr * width - cr * height) / (sr * sr - cr * cr);
            rotationExtent = [
                rotationCenter[0] - unrotatedWidth / 2,
                rotationCenter[1] - unrotatedHeight / 2,
                rotationCenter[0] + unrotatedWidth / 2,
                rotationCenter[1] + unrotatedHeight / 2,
            ];
        }
        var startWorld = 0;
        var endWorld = 0;
        var labelsAtStart = this.latLabelPosition_ < 0.5;
        var projectionExtent = this.projection_.getExtent();
        var worldWidth = getWidth(projectionExtent);
        if (this.getSource().getWrapX() &&
            this.projection_.canWrapX() &&
            !containsExtent(projectionExtent, extent)) {
            startWorld = Math.floor((extent[0] - projectionExtent[0]) / worldWidth);
            endWorld = Math.ceil((extent[2] - projectionExtent[2]) / worldWidth);
            var inverted = Math.abs(rotation) > Math.PI / 2;
            labelsAtStart = labelsAtStart !== inverted;
        }
        var vectorContext = getVectorContext(event);
        for (var world = startWorld; world <= endWorld; ++world) {
            var poolIndex = this.meridians_.length + this.parallels_.length;
            var feature = void 0, index = void 0, l = void 0, textPoint = void 0;
            if (this.meridiansLabels_) {
                for (index = 0, l = this.meridiansLabels_.length; index < l; ++index) {
                    var lineString = this.meridians_[index];
                    if (!rotation && world === 0) {
                        textPoint = this.getMeridianPoint_(lineString, extent, index);
                    }
                    else {
                        var clone = lineString.clone();
                        clone.translate(world * worldWidth, 0);
                        clone.rotate(-rotation, rotationCenter);
                        textPoint = this.getMeridianPoint_(clone, rotationExtent, index);
                        textPoint.rotate(rotation, rotationCenter);
                    }
                    feature = this.featurePool_[poolIndex++];
                    feature.setGeometry(textPoint);
                    feature.set('graticule_label', this.meridiansLabels_[index].text);
                    vectorContext.drawFeature(feature, this.lonLabelStyle_(feature));
                }
            }
            if (this.parallelsLabels_) {
                if ((world === startWorld && labelsAtStart) ||
                    (world === endWorld && !labelsAtStart)) {
                    for (index = 0, l = this.parallels_.length; index < l; ++index) {
                        var lineString = this.parallels_[index];
                        if (!rotation && world === 0) {
                            textPoint = this.getParallelPoint_(lineString, extent, index);
                        }
                        else {
                            var clone = lineString.clone();
                            clone.translate(world * worldWidth, 0);
                            clone.rotate(-rotation, rotationCenter);
                            textPoint = this.getParallelPoint_(clone, rotationExtent, index);
                            textPoint.rotate(rotation, rotationCenter);
                        }
                        feature = this.featurePool_[poolIndex++];
                        feature.setGeometry(textPoint);
                        feature.set('graticule_label', this.parallelsLabels_[index].text);
                        vectorContext.drawFeature(feature, this.latLabelStyle_(feature));
                    }
                }
            }
        }
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {import("../coordinate.js").Coordinate} center Center.
     * @param {number} resolution Resolution.
     * @param {number} squaredTolerance Squared tolerance.
     * @private
     */
    Graticule.prototype.createGraticule_ = function (extent, center, resolution, squaredTolerance) {
        var interval = this.getInterval_(resolution);
        if (interval == -1) {
            this.meridians_.length = 0;
            this.parallels_.length = 0;
            if (this.meridiansLabels_) {
                this.meridiansLabels_.length = 0;
            }
            if (this.parallelsLabels_) {
                this.parallelsLabels_.length = 0;
            }
            return;
        }
        var wrapX = false;
        var projectionExtent = this.projection_.getExtent();
        var worldWidth = getWidth(projectionExtent);
        if (this.getSource().getWrapX() &&
            this.projection_.canWrapX() &&
            !containsExtent(projectionExtent, extent)) {
            if (getWidth(extent) >= worldWidth) {
                extent[0] = projectionExtent[0];
                extent[2] = projectionExtent[2];
            }
            else {
                wrapX = true;
            }
        }
        // Constrain the center to fit into the extent available to the graticule
        var validCenterP = [
            clamp(center[0], this.minX_, this.maxX_),
            clamp(center[1], this.minY_, this.maxY_),
        ];
        // Transform the center to lon lat
        // Some projections may have a void area at the poles
        // so replace any NaN latitudes with the min or max value closest to a pole
        var centerLonLat = this.toLonLatTransform_(validCenterP);
        if (isNaN(centerLonLat[1])) {
            centerLonLat[1] =
                Math.abs(this.maxLat_) >= Math.abs(this.minLat_)
                    ? this.maxLat_
                    : this.minLat_;
        }
        var centerLon = clamp(centerLonLat[0], this.minLon_, this.maxLon_);
        var centerLat = clamp(centerLonLat[1], this.minLat_, this.maxLat_);
        var maxLines = this.maxLines_;
        var cnt, idx, lat, lon;
        // Limit the extent to fit into the extent available to the graticule
        var validExtentP = extent;
        if (!wrapX) {
            validExtentP = [
                clamp(extent[0], this.minX_, this.maxX_),
                clamp(extent[1], this.minY_, this.maxY_),
                clamp(extent[2], this.minX_, this.maxX_),
                clamp(extent[3], this.minY_, this.maxY_),
            ];
        }
        // Transform the extent to get the lon lat ranges for the edges of the extent
        var validExtent = applyTransform(validExtentP, this.toLonLatTransform_, undefined, 8);
        var maxLat = validExtent[3];
        var maxLon = validExtent[2];
        var minLat = validExtent[1];
        var minLon = validExtent[0];
        if (!wrapX) {
            // Check if extremities of the world extent lie inside the extent
            // (for example the pole in a polar projection)
            // and extend the extent as appropriate
            if (containsCoordinate(validExtentP, this.bottomLeft_)) {
                minLon = this.minLon_;
                minLat = this.minLat_;
            }
            if (containsCoordinate(validExtentP, this.bottomRight_)) {
                maxLon = this.maxLon_;
                minLat = this.minLat_;
            }
            if (containsCoordinate(validExtentP, this.topLeft_)) {
                minLon = this.minLon_;
                maxLat = this.maxLat_;
            }
            if (containsCoordinate(validExtentP, this.topRight_)) {
                maxLon = this.maxLon_;
                maxLat = this.maxLat_;
            }
            // The transformed center may also extend the lon lat ranges used for rendering
            maxLat = clamp(maxLat, centerLat, this.maxLat_);
            maxLon = clamp(maxLon, centerLon, this.maxLon_);
            minLat = clamp(minLat, this.minLat_, centerLat);
            minLon = clamp(minLon, this.minLon_, centerLon);
        }
        // Create meridians
        centerLon = Math.floor(centerLon / interval) * interval;
        lon = clamp(centerLon, this.minLon_, this.maxLon_);
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, 0);
        cnt = 0;
        if (wrapX) {
            while ((lon -= interval) >= minLon && cnt++ < maxLines) {
                idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
            }
        }
        else {
            while (lon != this.minLon_ && cnt++ < maxLines) {
                lon = Math.max(lon - interval, this.minLon_);
                idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
            }
        }
        lon = clamp(centerLon, this.minLon_, this.maxLon_);
        cnt = 0;
        if (wrapX) {
            while ((lon += interval) <= maxLon && cnt++ < maxLines) {
                idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
            }
        }
        else {
            while (lon != this.maxLon_ && cnt++ < maxLines) {
                lon = Math.min(lon + interval, this.maxLon_);
                idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
            }
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
    Graticule.prototype.getInterval_ = function (resolution) {
        var centerLon = this.projectionCenterLonLat_[0];
        var centerLat = this.projectionCenterLonLat_[1];
        var interval = -1;
        var target = Math.pow(this.targetSize_ * resolution, 2);
        /** @type {Array<number>} **/
        var p1 = [];
        /** @type {Array<number>} **/
        var p2 = [];
        for (var i = 0, ii = this.intervals_.length; i < ii; ++i) {
            var delta = clamp(this.intervals_[i] / 2, 0, 90);
            // Don't attempt to transform latitudes beyond the poles!
            var clampedLat = clamp(centerLat, -90 + delta, 90 - delta);
            p1[0] = centerLon - delta;
            p1[1] = clampedLat - delta;
            p2[0] = centerLon + delta;
            p2[1] = clampedLat + delta;
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
     * @param {number} lon Longitude.
     * @param {number} minLat Minimal latitude.
     * @param {number} maxLat Maximal latitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LineString} The meridian line string.
     * @param {number} index Index.
     * @private
     */
    Graticule.prototype.getMeridian_ = function (lon, minLat, maxLat, squaredTolerance, index) {
        var flatCoordinates = meridian(lon, minLat, maxLat, this.projection_, squaredTolerance);
        var lineString = this.meridians_[index];
        if (!lineString) {
            lineString = new LineString(flatCoordinates, GeometryLayout.XY);
            this.meridians_[index] = lineString;
        }
        else {
            lineString.setFlatCoordinates(GeometryLayout.XY, flatCoordinates);
            lineString.changed();
        }
        return lineString;
    };
    /**
     * @param {LineString} lineString Meridian
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {Point} Meridian point.
     * @private
     */
    Graticule.prototype.getMeridianPoint_ = function (lineString, extent, index) {
        var flatCoordinates = lineString.getFlatCoordinates();
        var bottom = 1;
        var top = flatCoordinates.length - 1;
        if (flatCoordinates[bottom] > flatCoordinates[top]) {
            bottom = top;
            top = 1;
        }
        var clampedBottom = Math.max(extent[1], flatCoordinates[bottom]);
        var clampedTop = Math.min(extent[3], flatCoordinates[top]);
        var lat = clamp(extent[1] + Math.abs(extent[1] - extent[3]) * this.lonLabelPosition_, clampedBottom, clampedTop);
        var coordinate0 = flatCoordinates[bottom - 1] +
            ((flatCoordinates[top - 1] - flatCoordinates[bottom - 1]) *
                (lat - flatCoordinates[bottom])) /
                (flatCoordinates[top] - flatCoordinates[bottom]);
        var coordinate = [coordinate0, lat];
        var point = this.meridiansLabels_[index].geom;
        point.setCoordinates(coordinate);
        return point;
    };
    /**
     * Get the list of meridians.  Meridians are lines of equal longitude.
     * @return {Array<LineString>} The meridians.
     * @api
     */
    Graticule.prototype.getMeridians = function () {
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
    Graticule.prototype.getParallel_ = function (lat, minLon, maxLon, squaredTolerance, index) {
        var flatCoordinates = parallel(lat, minLon, maxLon, this.projection_, squaredTolerance);
        var lineString = this.parallels_[index];
        if (!lineString) {
            lineString = new LineString(flatCoordinates, GeometryLayout.XY);
        }
        else {
            lineString.setFlatCoordinates(GeometryLayout.XY, flatCoordinates);
            lineString.changed();
        }
        return lineString;
    };
    /**
     * @param {LineString} lineString Parallels.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {Point} Parallel point.
     * @private
     */
    Graticule.prototype.getParallelPoint_ = function (lineString, extent, index) {
        var flatCoordinates = lineString.getFlatCoordinates();
        var left = 0;
        var right = flatCoordinates.length - 2;
        if (flatCoordinates[left] > flatCoordinates[right]) {
            left = right;
            right = 0;
        }
        var clampedLeft = Math.max(extent[0], flatCoordinates[left]);
        var clampedRight = Math.min(extent[2], flatCoordinates[right]);
        var lon = clamp(extent[0] + Math.abs(extent[0] - extent[2]) * this.latLabelPosition_, clampedLeft, clampedRight);
        var coordinate1 = flatCoordinates[left + 1] +
            ((flatCoordinates[right + 1] - flatCoordinates[left + 1]) *
                (lon - flatCoordinates[left])) /
                (flatCoordinates[right] - flatCoordinates[left]);
        var coordinate = [lon, coordinate1];
        var point = this.parallelsLabels_[index].geom;
        point.setCoordinates(coordinate);
        return point;
    };
    /**
     * Get the list of parallels.  Parallels are lines of equal latitude.
     * @return {Array<LineString>} The parallels.
     * @api
     */
    Graticule.prototype.getParallels = function () {
        return this.parallels_;
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @private
     */
    Graticule.prototype.updateProjectionInfo_ = function (projection) {
        var epsg4326Projection = getProjection('EPSG:4326');
        var worldExtent = projection.getWorldExtent();
        this.maxLat_ = worldExtent[3];
        this.maxLon_ = worldExtent[2];
        this.minLat_ = worldExtent[1];
        this.minLon_ = worldExtent[0];
        // If the world extent crosses the dateline define a custom transform to
        // return longitudes which wrap the dateline
        var toLonLatTransform = getTransform(projection, epsg4326Projection);
        if (this.minLon_ < this.maxLon_) {
            this.toLonLatTransform_ = toLonLatTransform;
        }
        else {
            var split_1 = this.minLon_ + this.maxLon_ / 2;
            this.maxLon_ += 360;
            this.toLonLatTransform_ = function (coordinates, opt_output, opt_dimension) {
                var dimension = opt_dimension || 2;
                var lonLatCoordinates = toLonLatTransform(coordinates, opt_output, dimension);
                for (var i = 0, l = lonLatCoordinates.length; i < l; i += dimension) {
                    if (lonLatCoordinates[i] < split_1) {
                        lonLatCoordinates[i] += 360;
                    }
                }
                return lonLatCoordinates;
            };
        }
        // Transform the extent to get the limits of the view projection extent
        // which should be available to the graticule
        this.fromLonLatTransform_ = getTransform(epsg4326Projection, projection);
        var worldExtentP = applyTransform([this.minLon_, this.minLat_, this.maxLon_, this.maxLat_], this.fromLonLatTransform_, undefined, 8);
        this.minX_ = worldExtentP[0];
        this.maxX_ = worldExtentP[2];
        this.minY_ = worldExtentP[1];
        this.maxY_ = worldExtentP[3];
        // Determine the view projection coordinates of the extremities of the world extent
        // as these may lie inside a view extent (for example the pole in a polar projection)
        this.bottomLeft_ = this.fromLonLatTransform_([this.minLon_, this.minLat_]);
        this.bottomRight_ = this.fromLonLatTransform_([this.maxLon_, this.minLat_]);
        this.topLeft_ = this.fromLonLatTransform_([this.minLon_, this.maxLat_]);
        this.topRight_ = this.fromLonLatTransform_([this.maxLon_, this.maxLat_]);
        // Transform the projection center to lon lat
        // Some projections may have a void area at the poles
        // so replace any NaN latitudes with the min or max value closest to a pole
        this.projectionCenterLonLat_ = this.toLonLatTransform_(getCenter(projection.getExtent()));
        if (isNaN(this.projectionCenterLonLat_[1])) {
            this.projectionCenterLonLat_[1] =
                Math.abs(this.maxLat_) >= Math.abs(this.minLat_)
                    ? this.maxLat_
                    : this.minLat_;
        }
        this.projection_ = projection;
    };
    return Graticule;
}(VectorLayer));
export default Graticule;
//# sourceMappingURL=Graticule.js.map