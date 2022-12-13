/**
 * A module for the mini-map control.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { Rectangle } from "../../core/elements/Rectangle";
import { List } from "../../core/utils/List";
import { MutableValueDisposer, MultiDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
import { color } from "../../core/utils/Color";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "bird's eye" view of the whole map.
 *
 * This control creates a mini-map with the whole of the map, highlighting
 * the area which is in the current viewport of the map map.
 *
 * @see {@link ISmallMapEvents} for a list of available events
 * @see {@link ISmallMapAdapters} for a list of available Adapters
 * @important
 */
var SmallMap = /** @class */ (function (_super) {
    __extends(SmallMap, _super);
    /**
     * Constructor
     */
    function SmallMap() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A target map.
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "SmallMap";
        // Set defaults
        _this.align = "left";
        _this.valign = "bottom";
        _this.percentHeight = 20;
        _this.percentWidth = 20;
        _this.margin(5, 5, 5, 5);
        var interfaceColors = new InterfaceColorSet();
        // Set background defailts
        _this.background.fillOpacity = 0.9;
        _this.background.fill = interfaceColors.getFor("background");
        // Set up events
        _this.events.on("hit", _this.moveToPosition, _this, false);
        _this.events.on("maxsizechanged", _this.updateMapSize, _this, false);
        // Create a container
        _this.seriesContainer = _this.createChild(Container);
        _this.seriesContainer.shouldClone = false;
        // Create an outline rectangle
        var rectangle = _this.createChild(Rectangle);
        rectangle.shouldClone = false;
        rectangle.stroke = interfaceColors.getFor("alternativeBackground");
        rectangle.strokeWidth = 1;
        rectangle.strokeOpacity = 0.5;
        rectangle.fill = color(); //"none";
        rectangle.verticalCenter = "middle";
        rectangle.horizontalCenter = "middle";
        rectangle.isMeasured = false;
        rectangle.visible = false;
        _this.rectangle = rectangle;
        _this._disposers.push(_this._chart);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SmallMap.prototype, "series", {
        /**
         * A list of map series used to draw the mini-map.
         *
         * @readonly
         * @return Series
         */
        get: function () {
            if (!this._series) {
                this._series = new List();
                this._series.events.on("inserted", this.handleSeriesAdded, this, false);
                this._series.events.on("removed", this.handleSeriesRemoved, this, false);
            }
            return this._series;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Decorates a new series when they are pushed into a `series` list.
     *
     * @param event Event
     */
    SmallMap.prototype.handleSeriesAdded = function (event) {
        var series = event.newValue;
        if (this.chart.series.contains(series)) {
            var newSeries = series.clone();
            this._series.removeValue(series);
            this._series.push(newSeries);
            series = newSeries;
            this.chart.dataUsers.push(newSeries);
        }
        series.chart = this.chart;
        series.parent = this.seriesContainer;
        series.interactionsEnabled = false;
        series.events.on("inited", this.updateMapSize, this, false);
        series.hidden = false;
    };
    /**
     * Cleans up after series are removed from Scrollbar.
     *
     * @param event  Event
     */
    SmallMap.prototype.handleSeriesRemoved = function (event) {
        //let sourceSeries: MapSeries = event.oldValue;
        this.invalidate();
    };
    /**
     * Moves main map pan position after click on the small map.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    SmallMap.prototype.moveToPosition = function (event) {
        var rectPoint = $utils.spritePointToSprite(event.spritePoint, this, this.seriesContainer);
        var geoPoint = this.chart.seriesPointToGeo(rectPoint);
        this.chart.zoomToGeoPoint(geoPoint, this.chart.zoomLevel, true);
    };
    Object.defineProperty(SmallMap.prototype, "chart", {
        /**
         * @return Chart/map
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * A chart/map that this control is meant for.
         *
         * @param chart  Chart/map
         */
        set: function (chart) {
            if (this.chart != chart) {
                this._chart.set(chart, new MultiDisposer([
                    //chart.events.on("zoomlevelchanged", this.updateRectangle, this, false),
                    chart.events.on("mappositionchanged", this.updateRectangle, this, false),
                    chart.events.on("scaleratiochanged", this.updateMapSize, this, false)
                ]));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the viewport recangle as per current map zoom/pan position.
     *
     * @ignore Exclude from docs
     */
    SmallMap.prototype.updateRectangle = function () {
        var chart = this.chart;
        var zoomLevel = chart.zoomLevel;
        var rectangle = this.rectangle;
        rectangle.width = this.pixelWidth / zoomLevel;
        rectangle.height = this.pixelHeight / zoomLevel;
        var scale = Math.min(this.percentWidth, this.percentHeight) / 100;
        var seriesContainer = chart.seriesContainer;
        rectangle.x = Math.ceil((-seriesContainer.pixelX) * scale / zoomLevel) + this.seriesContainer.pixelX;
        rectangle.y = Math.ceil((-seriesContainer.pixelY) * scale / zoomLevel) + this.seriesContainer.pixelY;
        rectangle.validate();
    };
    /**
     * Update map size so that internal elements can redraw themselves after
     * the size of the small map changes.
     *
     * @ignore Exclude from docs
     */
    SmallMap.prototype.updateMapSize = function () {
        if (this.chart) {
            var scale = this.chart.scaleRatio * Math.min(this.percentWidth, this.percentHeight) / 100;
            this.seriesContainer.scale = scale;
            var bbox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            try { // Add exception catching to tame FF
                bbox = this.seriesContainer.group.node.getBBox();
            }
            catch (err) { }
            if (bbox.width > 0) {
                this.rectangle.visible = true;
            }
            this.seriesContainer.x = this.pixelWidth / 2 - bbox.x * scale - bbox.width / 2 * scale;
            this.seriesContainer.y = this.pixelHeight / 2 - bbox.y * scale - bbox.height / 2 * scale;
            this.updateRectangle();
            this.afterDraw();
        }
    };
    /**
     * Update elements after drawing the small map.
     */
    SmallMap.prototype.afterDraw = function () {
        _super.prototype.afterDraw.call(this);
        //this.seriesContainer.moveTo({ x: this.pixelWidth / 2, y: this.pixelHeight / 2 });
        this.rectangle.maskRectangle = { x: -1, y: -1, width: Math.ceil(this.pixelWidth + 2), height: Math.ceil(this.pixelHeight + 2) };
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    SmallMap.prototype.processConfig = function (config) {
        if (config) {
            // Set up series
            if ($type.hasValue(config.series) && $type.isArray(config.series)) {
                for (var i = 0, len = config.series.length; i < len; i++) {
                    var series = config.series[i];
                    if ($type.hasValue(series) && $type.isString(series) && this.map.hasKey(series)) {
                        config.series[i] = this.map.getKey(series);
                    }
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return SmallMap;
}(Container));
export { SmallMap };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SmallMap"] = SmallMap;
//# sourceMappingURL=SmallMap.js.map