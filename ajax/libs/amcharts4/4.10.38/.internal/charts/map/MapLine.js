/**
 * Map line module
 */
import { __extends, __values } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapObject } from "./MapObject";
import { MapLineObject } from "./MapLineObject";
import { MapImage } from "./MapImage";
import { MapImageSeries } from "./MapImageSeries";
import { Triangle } from "../../core/elements/Triangle";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { Polyline } from "../../core/elements/Polyline";
import { registry } from "../../core/Registry";
import { color } from "../../core/utils/Color";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { percent, Percent } from "../../core/utils/Percent";
import * as $type from "../../core/utils/Type";
import * as $iter from "../../core/utils/Iterator";
import * as $geo from "./Geo";
import * as $mapUtils from "./MapUtils";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a line on the map.
 *
 * @see {@link IMapLineEvents} for a list of available events
 * @see {@link IMapLineAdapters} for a list of available Adapters
 */
var MapLine = /** @class */ (function (_super) {
    __extends(MapLine, _super);
    /**
     * Constructor
     */
    function MapLine() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A list of event disposers for images.
         */
        _this._imageListeners = {};
        _this.className = "MapLine";
        _this.createLine();
        _this.line.stroke = color();
        _this.line.parent = _this;
        _this.strokeOpacity = 1;
        _this.setPropertyValue("precision", 0.1);
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("grid");
        _this.shortestDistance = true;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapLine.prototype.createLine = function () {
        this.line = new Polyline();
    };
    /**
     * Converts a position within the line (0-1) to a physical point
     * coordinates.
     *
     * 0 indicates start of the line, 0.5 - middle, while 1 indicates the end.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    MapLine.prototype.positionToPoint = function (position) {
        if (this.shortestDistance) {
            return this.series.chart.projection.positionToPoint(this.multiGeoLine, position);
        }
        else {
            if (this.line) {
                return this.line.positionToPoint(position);
            }
        }
        return { x: 0, y: 0, angle: 0 };
    };
    Object.defineProperty(MapLine.prototype, "multiGeoLine", {
        /**
         * @return Coordinates
         */
        get: function () {
            var multiGeoLine = this.getPropertyValue("multiGeoLine");
            if (!multiGeoLine && this.dataItem && this.dataItem.multiGeoLine) {
                multiGeoLine = this.dataItem.multiGeoLine;
            }
            return multiGeoLine;
        },
        /**
         * A collection of X/Y coordinates for a multi-segment line. E.g.:
         *
         * ```JSON
         * [
         *   // Segment 1
         *   [
         *     { longitude: 3.121, latitude: 0.58 },
         *     { longitude: -5.199, latitude: 21.223 }
         *   ],
         *
         *   // Segment 2
         *   [
         *     { longitude: -5.199, latitude: 21.223 },
         *     { longitude: -12.9, latitude: 25.85 }
         *   ]
         * ]
         * ```
         *
         * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.5} GeoJSON MultiLineString reference
         * @param multiGeoLine  Coordinates
         */
        set: function (multiGeoLine) {
            if (multiGeoLine && multiGeoLine.length > 0) {
                this.setPropertyValue("multiGeoLine", $geo.normalizeMultiline(multiGeoLine), true);
                var multiLine = $mapUtils.multiGeoLineToMultiLine(multiGeoLine);
                this.setPropertyValue("multiLine", multiLine);
                this.updateExtremes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLine.prototype, "multiLine", {
        /**
         * @return Coordinates
         */
        get: function () {
            var multiLine = this.getPropertyValue("multiLine");
            if (!multiLine && this.dataItem && this.dataItem.multiLine) {
                multiLine = this.dataItem.multiLine;
            }
            return multiLine;
        },
        /**
         * A collection of X/Y coordinates for a multi-segment line. E.g.:
         *
         * ```JSON
         * [
         *   // Segment 1
         *   [
         *     [ 100, 150 ],
         *     [ 120, 200 ]
         *   ],
         *
         *   // Segment 2
         *   [
         *     [ 120, 200 ],
         *     [ 150, 100 ]
         *   ]
         * ]
         * ```
         *
         * @param multiLine  Coordinates
         */
        set: function (multiLine) {
            this.setPropertyValue("multiLine", multiLine);
            this.multiGeoLine = $mapUtils.multiLineToGeo(multiLine);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLine.prototype, "imagesToConnect", {
        /**
         * @return {MapImages[]}
         */
        get: function () {
            return this.getPropertyValue("imagesToConnect");
        },
        /**
         * Instead of setting longitudes/latitudes you can set an array of images
         * which will be connected by the line.
         *
         * Parameter is an array that can hold string `id`'s to of the images, or
         * references to actual [[MapImage]] objects.
         *
         * @param images  Images
         */
        set: function (images) {
            var _this = this;
            this.setPropertyValue("imagesToConnect", images, true);
            this.handleImagesToConnect();
            if (this.series) {
                var chart = this.series.chart;
                if (chart) {
                    chart.series.each(function (series) {
                        if (series instanceof MapImageSeries) {
                            if (!series.isReady()) {
                                _this._disposers.push(series.events.on("ready", _this.handleImagesToConnect, _this, false));
                            }
                        }
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MapLine.prototype.handleImagesToConnect = function () {
        var e_1, _a;
        var _this = this;
        if (this.imagesToConnect) {
            var segment = [];
            var multiGeoLine = [segment];
            var _loop_1 = function (image) {
                if ($type.isString(image)) {
                    var chart = this_1.series.chart;
                    if (chart) {
                        chart.series.each(function (series) {
                            if (series instanceof MapImageSeries) {
                                var img = series.getImageById(image);
                                if (img) {
                                    image = img;
                                }
                            }
                        });
                    }
                }
                if (image instanceof MapImage) {
                    segment.push({ longitude: image.longitude, latitude: image.latitude });
                    if (!this_1._imageListeners[image.uid]) {
                        var disposer = image.events.on("propertychanged", function (event) {
                            if (event.property == "longitude" || event.property == "latitude") {
                                _this.handleImagesToConnect();
                                _this.invalidate();
                            }
                        }, this_1, false);
                        this_1._imageListeners[image.uid] = disposer;
                        this_1._disposers.push(disposer);
                    }
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.imagesToConnect), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var image = _c.value;
                    _loop_1(image);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.multiGeoLine = multiGeoLine;
        }
    };
    /**
     * (Re)validates the line, effectively forcing it to redraw.
     *
     * @ignore Exclude from docs
     */
    MapLine.prototype.validate = function () {
        var chart = this.series.chart;
        if (this.multiLine) {
            if (!this.shortestDistance) {
                var convertedPoints = [];
                for (var i = 0, len = this.multiLine.length; i < len; i++) {
                    var segment = this.multiLine[i];
                    var convertedSegmentPoints = [];
                    for (var s = 0, slen = segment.length; s < slen; s++) {
                        var geoPoint = segment[s];
                        var point = this.series.chart.projection.convert({ longitude: geoPoint[0], latitude: geoPoint[1] });
                        convertedSegmentPoints.push(point);
                    }
                    convertedPoints.push(convertedSegmentPoints);
                }
                this.line.segments = convertedPoints;
            }
            else {
                chart.projection.d3Projection.precision(this.precision);
                this.line.path = chart.projection.d3Path(this.getFeature());
            }
            if (this._arrow) {
                this._arrow.validatePosition();
            }
            $iter.each(this.lineObjects.iterator(), function (x) {
                x.validatePosition();
            });
            this.handleGlobalScale();
        }
        else if (this.imagesToConnect) {
            this.handleImagesToConnect();
        }
        _super.prototype.validate.call(this);
    };
    /**
     * @ignore
     */
    MapLine.prototype.getFeature = function () {
        if (this.multiLine && this.multiLine.length > 0 && this.multiLine[0] && this.multiLine[0].length > 0) {
            return { "type": "Feature", geometry: { type: "MultiLineString", coordinates: this.multiLine } };
        }
    };
    /**
     * @ignore Exclude from docs
     */
    MapLine.prototype.measureElement = function () {
        // Overriding, just to avoid extra measure
    };
    Object.defineProperty(MapLine.prototype, "shortestDistance", {
        /**
         * @return Real path?
         */
        get: function () {
            return this.getPropertyValue("shortestDistance");
        },
        /**
         * The line should take the shortest path over the globe.
         *
         * Enabling this will make the line look differently in different
         * projections. Only `MapLine` supports this setting, `MapArc` and
         * `MapSplice` don't.
         *
         * @default true
         * @param value  Real path?
         */
        set: function (value) {
            this.setPropertyValue("shortestDistance", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLine.prototype, "lineObjects", {
        /**
         * List of separate line objects the line consists of.
         *
         * @readonly
         * @return List of line objects
         */
        get: function () {
            if (!this._lineObjects) {
                this._lineObjects = new ListTemplate(new MapLineObject());
                this._lineObjects.events.on("inserted", this.handleLineObjectAdded, this, false);
                this._disposers.push(new ListDisposer(this._lineObjects));
                this._disposers.push(this._lineObjects.template);
            }
            return this._lineObjects;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Decorate a [[LineObject]] when it is added to the line.
     *
     * @param event  Event
     */
    MapLine.prototype.handleLineObjectAdded = function (event) {
        var mapLineObject = event.newValue;
        mapLineObject.mapLine = this;
        mapLineObject.shouldClone = false;
        mapLineObject.parent = this;
    };
    Object.defineProperty(MapLine.prototype, "arrow", {
        /**
         * @return Arrow element
         */
        get: function () {
            if (!this._arrow) {
                var arrow = this.createChild(MapLineObject);
                arrow.shouldClone = false;
                arrow.width = 8;
                arrow.height = 10;
                arrow.mapLine = this;
                arrow.position = 0.5;
                var triangle = arrow.createChild(Triangle);
                //triangle.shouldClone = false;
                triangle.fillOpacity = 1;
                triangle.width = percent(100);
                triangle.height = percent(100);
                triangle.rotation = 90;
                triangle.horizontalCenter = "middle";
                triangle.verticalCenter = "middle";
                this._arrow = arrow;
            }
            return this._arrow;
        },
        /**
         * A [[MapLineObject]] to use as an option arrowhead on the line.
         *
         * Just accessing this property will create a default arrowhead on the line
         * automatically.
         *
         * @param arrow  Arrow element
         */
        set: function (arrow) {
            this._arrow = arrow;
            arrow.mapLine = this;
            arrow.parent = this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies line properties and other attributes, like arrow, from another
     * instance of [[MapLine]].
     *
     * @param source  Source map line
     */
    MapLine.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.line.copyFrom(source.line);
        this.lineObjects.copyFrom(source.lineObjects);
        if (source._arrow) {
            this.arrow = source.arrow.clone();
        }
    };
    Object.defineProperty(MapLine.prototype, "latitude", {
        /**
         * Latitude of the line center.
         *
         * @readonly
         * @return Latitude
         */
        get: function () {
            return this.north + (this.south - this.north) / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLine.prototype, "longitude", {
        /**
         * Longitude of the line center.
         *
         * @readonly
         * @return Latitude
         */
        get: function () {
            return this.east + (this.west - this.east) / 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * X coordinate for the slice tooltip.
     *
     * @ignore
     * @return X
     */
    MapLine.prototype.getTooltipX = function () {
        var x = this.getPropertyValue("tooltipX");
        if (!(x instanceof Percent)) {
            x = percent(50);
        }
        if (x instanceof Percent) {
            return this.positionToPoint(x.value).x;
        }
        else {
            return 0;
        }
    };
    /**
     * Y coordinate for the slice tooltip.
     *
     * @ignore
     * @return Y
     */
    MapLine.prototype.getTooltipY = function () {
        var y = this.getPropertyValue("tooltipY");
        if (!(y instanceof Percent)) {
            y = percent(50);
        }
        if (y instanceof Percent) {
            return this.positionToPoint(y.value).y;
        }
        else {
            return 0;
        }
    };
    Object.defineProperty(MapLine.prototype, "precision", {
        /**
         * @return Precision
         */
        get: function () {
            return this.getPropertyValue("precision");
        },
        /**
         * When line is plotted, if its `shortestDistance` is set to `true` it is
         * bent according to the used projection, to depict the shortest distance how
         * it would go on the actual land.
         *
         * `precision` introduces a setting which can control when such bending
         * occurs.
         *
         * If the distance (in degrees) between line start and end points
         * is less than `precision`, no bending will take place and the line will be
         * straight.
         *
         * Set to large number (e.g. 10000) for perfectly straight line.
         *
         * @since 4.9.1
         * @default 0.1
         * @param  value  Precision
         */
        set: function (value) {
            this.setPropertyValue("precision", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return MapLine;
}(MapObject));
export { MapLine };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapLine"] = MapLine;
//# sourceMappingURL=MapLine.js.map