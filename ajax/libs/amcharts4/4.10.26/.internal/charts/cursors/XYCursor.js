/**
 * Cursor for XY chart
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Cursor } from "./Cursor";
import { Sprite } from "../../core/Sprite";
import { MutableValueDisposer, MultiDisposer } from "../../core/utils/Disposer";
import { ValueAxis } from "../axes/ValueAxis";
import { DateAxis } from "../axes/DateAxis";
import { XYSeries } from "../series/XYSeries";
import { registry } from "../../core/Registry";
import { color } from "../../core/utils/Color";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { getInteraction } from "../../core/interaction/Interaction";
import { MouseCursorStyle } from "../../core/interaction/Mouse";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import * as $array from "../../core/utils/Array";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A cursor used on [[XYChart]].
 *
 * @see {@link IXYCursorEvents} for a list of available events
 * @see {@link IXYCursorAdapters} for a list of available Adapters
 * @todo Add description, examples
 */
var XYCursor = /** @class */ (function (_super) {
    __extends(XYCursor, _super);
    /**
     * Constructor
     */
    function XYCursor() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Vertical cursor line element.
         */
        _this._lineX = new MutableValueDisposer();
        /**
         * Horizontal cursor line element.
         */
        _this._lineY = new MutableValueDisposer();
        /**
         * Horizontal [[Axis]].
         */
        _this._xAxis = new MutableValueDisposer();
        /**
         * Vertical [[Axis]].
         */
        _this._yAxis = new MutableValueDisposer();
        _this._snapToDisposers = [];
        _this.className = "XYCursor";
        // Defaults
        _this.behavior = "zoomX";
        _this.maxPanOut = 0.1;
        var interfaceColors = new InterfaceColorSet();
        _this.snapOnPan = true;
        // Create selection element
        var selection = _this.createChild(Sprite);
        selection.shouldClone = false;
        selection.fillOpacity = 0.2;
        selection.fill = interfaceColors.getFor("alternativeBackground");
        selection.isMeasured = false;
        selection.visible = false;
        selection.interactionsEnabled = false;
        _this.selection = selection;
        _this._disposers.push(_this.selection);
        // Create cursor's vertical line
        var lineX = _this.createChild(Sprite);
        lineX.shouldClone = false;
        lineX.stroke = interfaceColors.getFor("grid");
        lineX.fill = color();
        lineX.strokeDasharray = "3,3";
        lineX.isMeasured = false;
        lineX.strokeOpacity = 0.4;
        lineX.interactionsEnabled = false;
        lineX.y = 0; // important
        _this.lineX = lineX;
        _this._disposers.push(_this.lineX);
        // Create cursor's horizontal line
        var lineY = _this.createChild(Sprite);
        lineY.shouldClone = false;
        lineY.stroke = interfaceColors.getFor("grid");
        lineY.fill = color();
        lineY.strokeDasharray = "3,3";
        lineY.isMeasured = false;
        lineY.strokeOpacity = 0.4;
        lineY.interactionsEnabled = false;
        lineY.x = 0; // important
        _this.lineY = lineY;
        _this._disposers.push(_this.lineY);
        // Add handler for size changes
        _this.events.on("sizechanged", _this.updateSize, _this, false);
        _this._disposers.push(_this._lineX);
        _this._disposers.push(_this._lineY);
        _this._disposers.push(_this._xAxis);
        _this._disposers.push(_this._yAxis);
        _this.mask = _this;
        _this.hideSeriesTooltipsOnSelection = true;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Updates cursor element dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    XYCursor.prototype.updateSize = function () {
        if (this.lineX) {
            this.lineX.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: this.innerHeight });
        }
        if (this.lineY) {
            this.lineY.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: this.innerWidth, y: 0 });
        }
    };
    /**
     * Updates selection dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    XYCursor.prototype.updateSelection = function () {
        if (this._usesSelection) {
            var downPoint = this.downPoint;
            var behavior = this.behavior;
            if (downPoint) {
                var point = this.point;
                if (this.lineX) {
                    point.x = this.lineX.pixelX;
                }
                if (this.lineY) {
                    point.y = this.lineY.pixelY;
                }
                var selection = this.selection;
                var x = Math.min(point.x, downPoint.x);
                var y = Math.min(point.y, downPoint.y);
                var w = $math.round(Math.abs(downPoint.x - point.x), this._positionPrecision);
                var h = $math.round(Math.abs(downPoint.y - point.y), this._positionPrecision);
                switch (behavior) {
                    case "zoomX":
                        y = 0;
                        h = this.pixelHeight;
                        break;
                    case "zoomY":
                        x = 0;
                        w = this.pixelWidth;
                        break;
                    case "selectX":
                        y = 0;
                        h = this.pixelHeight;
                        break;
                    case "selectY":
                        x = 0;
                        w = this.pixelWidth;
                        break;
                }
                selection.x = x;
                selection.y = y;
                selection.path = $path.rectangle(w, h);
                selection.validatePosition(); // otherwise Edge shoes some incorrect size rectangle
            }
            else {
                if (this._generalBehavior != "select") {
                    this.selection.hide();
                }
            }
        }
    };
    /**
     *
     * @ignore Exclude from docs
     */
    XYCursor.prototype.fixPoint = function (point) {
        point.x = Math.max(0, point.x);
        point.y = Math.max(0, point.y);
        point.x = Math.min(this.pixelWidth, point.x);
        point.y = Math.min(this.pixelHeight, point.y);
        return point;
    };
    /**
     * Places the cursor at specific point.
     *
     * @param point Point to place cursor at
     */
    XYCursor.prototype.triggerMoveReal = function (point, force) {
        _super.prototype.triggerMoveReal.call(this, point, force);
        var snapToSeries = this.snapToSeries;
        if ((snapToSeries && !this.downPoint)) {
            if (snapToSeries instanceof XYSeries) {
                if (snapToSeries.isHidden) {
                    this.updateLinePositions(point);
                }
            }
            else {
                var allHidden_1 = true;
                $array.each(snapToSeries, function (s) {
                    if (!s.isHidden) {
                        allHidden_1 = false;
                    }
                });
                if (allHidden_1) {
                    this.updateLinePositions(point);
                }
            }
        }
        else {
            this.updateLinePositions(point);
        }
        if (this.downPoint && $math.getDistance(this.downPoint, point) > 3) {
            if (this._generalBehavior == "pan") {
                this.getPanningRanges();
                this.dispatch("panning");
            }
        }
    };
    /**
     *
     * @ignore Exclude from docs
     */
    XYCursor.prototype.updateLinePositions = function (point) {
        point = this.fixPoint(this.point);
        if (this.lineX && this.lineX.visible && !this.xAxis) {
            this.lineX.x = point.x;
        }
        if (this.lineY && this.lineY.visible && !this.yAxis) {
            this.lineY.y = point.y;
        }
        this.updateSelection();
    };
    XYCursor.prototype.triggerDownReal = function (point) {
        if (this.visible && !this.isHiding) {
            if (this._generalBehavior == "select") {
                this.selection.parent = this.parent;
            }
            if (this.fitsToBounds(point)) {
                this.downPoint = { x: point.x, y: point.y };
                this.updatePoint(point);
                //this.updateLinePositions(point); // otherwise lines won't be in correct position and touch won't work fine
                this.point.x = this.downPoint.x;
                this.point.y = this.downPoint.y;
                var selection = this.selection;
                var selectionX = this.downPoint.x;
                var selectionY = this.downPoint.y;
                if (this._usesSelection) {
                    selection.x = selectionX;
                    selection.y = selectionY;
                    selection.path = "";
                    selection.show();
                }
                _super.prototype.triggerDownReal.call(this, point);
            }
            else {
                this.downPoint = undefined;
            }
        }
        else {
            this.downPoint = undefined;
        }
    };
    /**
     * Updates the coordinates of where pointer down event occurred
     * (was pressed).
     */
    XYCursor.prototype.updatePoint = function (point) {
        if (this.lineX) {
            point.x = this.lineX.pixelX;
        }
        if (this.lineY) {
            point.y = this.lineY.pixelY;
        }
    };
    /**
     * Handle action when cursor is released, which should perform an operation
     * based on its `behavior`, like zoom.
     *
     * @param  point  Release point
     */
    XYCursor.prototype.triggerUpReal = function (point) {
        if (this.hasMoved()) {
            if (this.downPoint) {
                this.upPoint = point;
                this.updatePoint(this.upPoint);
                if (this._generalBehavior != "pan") {
                    this.getRanges();
                }
                if (this._generalBehavior != "select") {
                    this.selection.hide();
                }
                _super.prototype.triggerUpReal.call(this, point);
            }
        }
        else {
            if (this._generalBehavior != "select") {
                this.selection.hide(0);
            }
            else {
                this.xRange = undefined;
                this.yRange = undefined;
                this.dispatchImmediately("selectended");
            }
            // reset cursor style, just in case
            if (this._generalBehavior == "pan") {
                var interaction = getInteraction();
                interaction.setGlobalStyle(MouseCursorStyle.default);
            }
            this.dispatchImmediately("behaviorcanceled");
        }
        this.downPoint = undefined;
        this.dispatch("cursorpositionchanged");
    };
    /**
     * Calculates if the cursor has moved enough based on its `behavior`.
     *
     * @return Moved?
     */
    XYCursor.prototype.hasMoved = function () {
        var distance;
        if (this.behavior == "zoomX" || this.behavior == "panX") {
            distance = $math.getHorizontalDistance(this._upPointOrig, this._downPointOrig);
        }
        else if (this.behavior == "zoomY" || this.behavior == "panY") {
            distance = $math.getVerticalDistance(this._upPointOrig, this._downPointOrig);
        }
        else {
            distance = $math.getDistance(this._upPointOrig, this._downPointOrig);
        }
        return distance > getInteraction().getHitOption(this.interactions, "hitTolerance");
    };
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    XYCursor.prototype.getPanningRanges = function () {
        var startX = $math.round(this.downPoint.x / this.innerWidth, 5);
        var startY = 1 - $math.round(this.downPoint.y / this.innerHeight, 5);
        var currentX = $math.round(this.point.x / this.innerWidth, 5);
        var currentY = 1 - $math.round(this.point.y / this.innerHeight, 5);
        var deltaX = startX - currentX;
        var deltaY = startY - currentY;
        this.xRange = { start: deltaX, end: 1 + deltaX };
        this.yRange = { start: deltaY, end: 1 + deltaY };
        if (this.behavior == "panX") {
            this.yRange.start = 0;
            this.yRange.end = 1;
        }
        if (this.behavior == "panY") {
            this.xRange.start = 0;
            this.xRange.end = 1;
        }
    };
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    XYCursor.prototype.getRanges = function () {
        if (this.lineX) {
            this.upPoint.x = this.lineX.pixelX;
        }
        if (this.lineY) {
            this.upPoint.y = this.lineY.pixelY;
        }
        // @todo Is this needed?
        $utils.used(this.selection);
        var startX = $math.round(this.downPoint.x / this.innerWidth, 5);
        var endX = $math.round((this.upPoint.x) / this.innerWidth, 5);
        var startY = 1 - $math.round(this.downPoint.y / this.innerHeight, 5);
        var endY = 1 - $math.round((this.upPoint.y) / this.innerHeight, 5);
        this.xRange = { start: $math.min(startX, endX), end: $math.max(startX, endX) };
        this.yRange = { start: $math.min(startY, endY), end: $math.max(startY, endY) };
    };
    Object.defineProperty(XYCursor.prototype, "behavior", {
        /**
         * Behavior
         */
        get: function () {
            return this.getPropertyValue("behavior");
        },
        /**
         * Cursor's behavior when it's moved with pointer down:
         *
         * * `"zoomX"` - zooms horizontally.
         * * `"zoomY"` - zooms vertically.
         * * `"zoomXY"` - zooms both horizontally and vertically.
         * * `"selectX"` - selects a range horizontally.
         * * `"selectY"` - selects a range vertically.
         * * `"selectXY"` - selects a range both horizontally and vertically.
         * * `"panX"` - moves (pans) current selection horizontally.
         * * `"panY"` - moves (pans) current selection vertically.
         * * `"panXY"` - moves (pans) current selection both horizontally and vertically.
         * * `"none"` - does nothing with pointer down.
         *
         * E.g. "zoomXY" will mean that pressing a mouse (or touching) over plot area
         * and dragging it will start zooming the chart.
         *
         * NOTE: `"zoomXY"` acts differently when used on a `DateAxis`.
         * See [this note](https://www.amcharts.com/docs/v4/concepts/chart-cursor/#zoomXY_behavior_and_DateAxis).
         *
         * @param value Bheavior
         */
        set: function (value) {
            this.setPropertyValue("behavior", value, true);
            this._usesSelection = false;
            if (value.indexOf("zoom") != -1) {
                this._generalBehavior = "zoom";
                this._usesSelection = true;
            }
            if (value.indexOf("select") != -1) {
                this._generalBehavior = "select";
                this._usesSelection = true;
            }
            if (value.indexOf("pan") != -1) {
                this._generalBehavior = "pan";
                this._usesSelection = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines whether Cursor should prevent default action on move.
     *
     * If cursor's behavior is "none", it should not obstruct the page scrolling.
     *
     * @return Prevent default?
     */
    XYCursor.prototype.shouldPreventGestures = function (touch) {
        return (!this.interactions.isTouchProtected || !touch) && this.behavior != "none";
    };
    Object.defineProperty(XYCursor.prototype, "fullWidthLineX", {
        /**
         * @return Full width?
         */
        get: function () {
            return this.getPropertyValue("fullWidthLineX");
        },
        /**
         * Cursor's horizontal line is expanded to take full width of the related
         * Axis' cell/category.
         *
         * NOTE: this setting will work properly if `xAxis` is set and only in case
         * `xAxis` is [[CategoryAxis]] or [[DateAxis]].
         *
         * @param value Full width?
         */
        set: function (value) {
            this.setPropertyValue("fullWidthLineX", value);
            if (!value) {
                this.updateSize();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "fullWidthLineY", {
        /**
         * @return Full width?
         */
        get: function () {
            return this.getPropertyValue("fullWidthLineY");
        },
        /**
         * Cursor's vertical line is expanded to take full width of the related
         * Axis' cell/category.
         *
         * NOTE: this setting will work properly if `yAxis` is set and only in case
         * `yAxis` is [[CategoryAxis]] or [[DateAxis]].
         *
         * @param value Full width?
         */
        set: function (value) {
            this.setPropertyValue("fullWidthLineY", value);
            if (!value) {
                this.updateSize();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "hideSeriesTooltipsOnSelection", {
        /**
         * @return hide tooltip?
         */
        get: function () {
            return this.getPropertyValue("hideSeriesTooltipsOnSelection");
        },
        /**
         * If set to `true` this will hide series tooltips when selecting with cursor.
         *
         * @since 4.5.15
         * @param  value  hide tooltips?
         */
        set: function (value) {
            this.setPropertyValue("hideSeriesTooltipsOnSelection", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "maxTooltipDistance", {
        /**
         * @return Distance
         */
        get: function () {
            return this.getPropertyValue("maxTooltipDistance");
        },
        /**
         * If set to a numeric value, cursor will display closest series' tooltips
         * plus tooltips from series that are closer to than `maxTooltipDistance` to
         * it.
         *
         * Set it to `-1` to always force one tooltip, even if there are multiple
         * data items in exactly same place.
         *
         * @since 4.7.18
         * @param  value  Distance
         */
        set: function (value) {
            this.setPropertyValue("maxTooltipDistance", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "maxPanOut", {
        /**
         * @return Full width?
         */
        get: function () {
            return this.getPropertyValue("maxPanOut");
        },
        /**
         * If cursor behavior is panX or panY, we allow to pan plot out of it's max bounds for a better user experience.
         * This setting specifies relative value by how much we can pan out the plot
         *
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("maxPanOut", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "xAxis", {
        /**
         * @return X axis
         */
        get: function () {
            return this._xAxis.get();
        },
        /**
         * A reference to X [[Axis]].
         *
         * An XY cursor can live without `xAxis` set. You set xAxis for cursor when
         * you have axis tooltip enabled and you want cursor line to be at the same
         * position as tooltip.
         *
         * This works with [[CategoryAxis]] and [[DateAxis]] but not with
         * [[ValueAxis]].
         *
         * @todo Description (review)
         * @param axis X axis
         */
        set: function (axis) {
            var _this = this;
            if (this._xAxis.get() != axis) {
                this._xAxis.set(axis, new MultiDisposer([
                    axis.tooltip.events.on("positionchanged", this.handleXTooltipPosition, this, false),
                    axis.events.on("rangechangestarted", function (event) {
                        _this.hide(0);
                        _this.preventShow = true;
                    }, undefined, false),
                    axis.events.on("rangechangeended", function (event) {
                        _this.preventShow = false;
                        _this.hide(0);
                        _this.dispatch("cursorpositionchanged");
                    }, undefined, false)
                ]));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "yAxis", {
        /**
         * @return Y Axis
         */
        get: function () {
            return this._yAxis.get();
        },
        /**
         * A reference to Y [[Axis]].
         *
         * An XY cursor can live without `yAxis` set. You set xAxis for cursor when
         * you have axis tooltip enabled and you want cursor line to be at the same
         * position as tooltip.
         *
         * This works with [[CategoryAxis]] and [[DateAxis]] but not with
         * [[ValueAxis]].
         *
         * @todo Description (review)
         * @param axis Y axis
         */
        set: function (axis) {
            var _this = this;
            if (this._yAxis.get() != axis) {
                this._yAxis.set(axis, new MultiDisposer([
                    axis.tooltip.events.on("positionchanged", this.handleYTooltipPosition, this, false),
                    axis.events.on("rangechangestarted", function (event) {
                        _this.hide(0);
                        _this.__disabled = true;
                    }, undefined, false),
                    axis.events.on("rangechangeended", function (event) {
                        _this.__disabled = false;
                        _this.hide(0);
                        _this.dispatch("cursorpositionchanged");
                    }, undefined, false)
                ]));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates Cursor's position when axis tooltip changes position.
     *
     * @ignore Exclude from docs
     * @param event Original Axis event
     */
    XYCursor.prototype.handleXTooltipPosition = function (event) {
        var tooltip = this.xAxis.tooltip;
        var point = $utils.svgPointToSprite({ x: tooltip.pixelX, y: tooltip.pixelY }, this);
        var x = point.x;
        point.y = 1;
        if (this.lineX) {
            this.lineX.x = x;
            if (!this.fitsToBounds(point)) {
                this.hide();
            }
        }
        if (this.xAxis && this.fullWidthLineX) {
            var startPoint = this.xAxis.currentItemStartPoint;
            var endPoint = this.xAxis.currentItemEndPoint;
            if (startPoint && endPoint) {
                this.lineX.x = x;
                var width = endPoint.x - startPoint.x;
                this.lineX.path = $path.rectangle(width, this.innerHeight, -width / 2);
            }
        }
    };
    /**
     * Updates Cursor's position when Y axis changes position or scale.
     *
     * @ignore Exclude from docs
     * @param event Original Axis event
     */
    XYCursor.prototype.handleYTooltipPosition = function (event) {
        var tooltip = this.yAxis.tooltip;
        var point = $utils.svgPointToSprite({ x: tooltip.pixelX, y: tooltip.pixelY }, this);
        var y = point.y;
        point.x = 1;
        if (this.lineY) {
            this.lineY.y = y;
            if (!this.fitsToBounds(point)) {
                this.hide();
            }
        }
        if (this.yAxis && this.fullWidthLineY) {
            var startPoint = this.yAxis.currentItemStartPoint;
            var endPoint = this.yAxis.currentItemEndPoint;
            if (startPoint && endPoint) {
                this.lineY.y = y;
                var height = endPoint.y - startPoint.y;
                this.lineY.path = $path.rectangle(this.innerWidth, height, 0, -height / 2);
            }
        }
    };
    Object.defineProperty(XYCursor.prototype, "lineX", {
        /**
         * @return Line element
         */
        get: function () {
            return this._lineX.get();
        },
        /**
         * A Line element to use for X axis.
         *
         * @param lineX Line
         */
        set: function (lineX) {
            if (lineX) {
                lineX.setElement(this.paper.add("path"));
                this._lineX.set(lineX, lineX.events.on("positionchanged", this.updateSelection, this, false));
                lineX.interactionsEnabled = false;
                lineX.parent = this;
            }
            else {
                this._lineX.reset();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "lineY", {
        /**
         * @return Line element
         */
        get: function () {
            return this._lineY.get();
        },
        /**
         * A Line element to use Y axis.
         *
         * @param lineY Line
         */
        set: function (lineY) {
            if (lineY) {
                lineY.setElement(this.paper.add("path"));
                this._lineY.set(lineY, lineY.events.on("positionchanged", this.updateSelection, this, false));
                lineY.parent = this;
                lineY.interactionsEnabled = false;
            }
            else {
                this._lineY.reset();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "selection", {
        /**
         * @return Selection rectangle
         */
        get: function () {
            return this._selection;
        },
        /**
         * A selection element ([[Sprite]]).
         *
         * @param selection Selection rectangle
         */
        set: function (selection) {
            this._selection = selection;
            if (selection) {
                selection.element = this.paper.add("path");
                selection.parent = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * Looks if `xAxis` and `yAxis` is set via ID in JSON config, and replaces
     * with real references.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    XYCursor.prototype.processConfig = function (config) {
        var _this = this;
        if (config) {
            // Set up axes
            if ($type.hasValue(config.xAxis) && $type.isString(config.xAxis)) {
                if (this.map.hasKey(config.xAxis)) {
                    config.xAxis = this.map.getKey(config.xAxis);
                }
                else {
                    this.processingErrors.push("[XYCursor] No axis with id \"" + config.xAxis + "\" found for `xAxis`");
                    delete config.xAxis;
                }
            }
            if ($type.hasValue(config.yAxis) && $type.isString(config.yAxis)) {
                if (this.map.hasKey(config.yAxis)) {
                    config.yAxis = this.map.getKey(config.yAxis);
                }
                else {
                    this.processingErrors.push("[XYCursor] No axis with id \"" + config.yAxis + "\" found for `yAxis`");
                    delete config.yAxis;
                }
            }
            if ($type.hasValue(config.snapToSeries)) {
                var snapTo_1 = $type.isArray(config.snapToSeries) ? config.snapToSeries : [config.snapToSeries];
                var snapError_1 = false;
                $array.each(snapTo_1, function (snap, index) {
                    if ($type.isString(snap)) {
                        if (_this.map.hasKey(snap)) {
                            snapTo_1[index] = _this.map.getKey(snap);
                        }
                        else {
                            _this.processingErrors.push("[XYCursor] No series with id \"" + snap + "\" found for `series`");
                            snapError_1 = true;
                        }
                    }
                });
                if (snapError_1) {
                    delete config.snapToSeries;
                }
                else {
                    config.snapToSeries = snapTo_1;
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    Object.defineProperty(XYCursor.prototype, "snapToSeries", {
        /**
         * @return {XYSeries | XYSeries[]}
         */
        get: function () {
            return this.getPropertyValue("snapToSeries");
        },
        /**
         * Specifies to which series cursor lines should be snapped.
         *
         * Can be a single series instance or an array of series.
         *
         * @param {XYSeries | XYSeries[]}
         */
        set: function (series) {
            var _this = this;
            if (this.setPropertyValue("snapToSeries", series)) {
                if (series instanceof XYSeries) {
                    series = [series];
                }
                if (this._snapToDisposers) {
                    $array.each(this._snapToDisposers, function (disposer) {
                        disposer.dispose();
                    });
                }
                this._snapToDisposers = [];
                if (series) {
                    $array.each(series, function (s) {
                        _this._snapToDisposers.push(s.events.on("tooltipshownat", function () { _this.handleSnap(s); }, undefined, false));
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYCursor.prototype, "snapOnPan", {
        /**
         * Should zoom selection "snap" into equal categories/intervals after panning
         * the chart? (when `behavior == "panX"`)
         *
         * @default true
         * @since 4.10.17
         * @return Snap on pan?
         */
        get: function () {
            return this.getPropertyValue("snapOnPan");
        },
        /**
         * @param value Snap on pan?
         */
        set: function (value) {
            this.setPropertyValue("snapOnPan", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Snaps the zoom selection after chart is panned.
     *
     * @ignore
     */
    XYCursor.prototype.handleSnap = function (series) {
        if (!this.downPoint) {
            var x = series.getTooltipX() + series.xAxis.pixelX;
            var y = series.getTooltipY() + series.yAxis.pixelY;
            var xAxis = series.xAxis;
            var yAxis = series.yAxis;
            if (xAxis) {
                if (xAxis.renderer.opposite) {
                    y -= this.pixelHeight;
                }
            }
            this.point = { x: x, y: y };
            this.getPositions();
            var xx = x;
            var yy = y;
            x -= this.pixelWidth;
            if (yAxis) {
                if (yAxis.renderer.opposite) {
                    x += this.pixelWidth;
                }
            }
            var tooltip = series.tooltip;
            var duration = tooltip.animationDuration;
            var easing = tooltip.animationEasing;
            if (xAxis instanceof ValueAxis && !(xAxis instanceof DateAxis) && yAxis instanceof ValueAxis && !(yAxis instanceof DateAxis)) {
                series.yAxis.showTooltipAtPosition(this.yPosition);
                series.xAxis.showTooltipAtPosition(this.xPosition);
            }
            else {
                if (series.baseAxis == series.xAxis) {
                    series.yAxis.showTooltipAtPosition(this.yPosition);
                }
                if (series.baseAxis == series.yAxis) {
                    series.xAxis.showTooltipAtPosition(this.xPosition);
                }
            }
            //	this.lineX.animate([{ property: "y", to: y }], duration, easing);
            //	this.lineY.animate([{ property: "x", to: x }], duration, easing);
            this.lineY.x = x;
            this.lineX.y = y;
            if (!this.xAxis) {
                this.lineX.animate([{ property: "x", to: xx }], duration, easing);
            }
            if (!this.yAxis) {
                this.lineY.animate([{ property: "y", to: yy }], duration, easing);
            }
        }
    };
    /**
     * Destroys this object and all related data.
     */
    XYCursor.prototype.dispose = function () {
        this.hide(0);
        _super.prototype.dispose.call(this);
    };
    return XYCursor;
}(Cursor));
export { XYCursor };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["XYCursor"] = XYCursor;
//# sourceMappingURL=XYCursor.js.map