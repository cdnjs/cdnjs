/**
 * Module, defining base Axis Renderer.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { AxisDataItem } from "./Axis";
import { AxisLine } from "./AxisLine";
import { AxisFill } from "./AxisFill";
import { Grid } from "./Grid";
import { AxisLabel } from "./AxisLabel";
import { AxisTick } from "./AxisTick";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { registry } from "../../core/Registry";
import { percent } from "../../core/utils/Percent";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all axis renderers.
 *
 * @see {@link IAxisRendererEvents} for a list of available events
 * @see {@link IAxisRendererAdapters} for a list of available Adapters
 */
var AxisRenderer = /** @class */ (function (_super) {
    __extends(AxisRenderer, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRenderer() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A related chart.
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "AxisRenderer";
        // Set defaults
        _this.minGridDistance = 50;
        _this.inside = false;
        _this.inversed = false;
        _this.tooltipLocation = 0.5;
        _this.fullWidthTooltip = false;
        _this.cellStartLocation = 0;
        _this.cellEndLocation = 1;
        _this.minLabelPosition = 0;
        _this.maxLabelPosition = 1;
        _this.shouldClone = false;
        var gridContainer = _this.createChild(Container);
        gridContainer.shouldClone = false;
        gridContainer.layout = "none";
        //	gridContainer.isMeasured = false;
        gridContainer.virtualParent = _this;
        gridContainer.width = percent(100);
        gridContainer.height = percent(100);
        _this.gridContainer = gridContainer;
        // not good without this
        gridContainer.events.on("maxsizechanged", function () {
            if (_this.inited) {
                _this.invalidateAxisItems();
            }
        }, _this, false);
        var breakContainer = _this.createChild(Container);
        breakContainer.shouldClone = false;
        breakContainer.isMeasured = false;
        breakContainer.layout = "none";
        breakContainer.width = percent(100);
        breakContainer.height = percent(100);
        _this.breakContainer = breakContainer;
        var bulletsContainer = _this.createChild(Container);
        bulletsContainer.shouldClone = false;
        bulletsContainer.isMeasured = false;
        bulletsContainer.layout = "none";
        bulletsContainer.width = percent(100);
        bulletsContainer.height = percent(100);
        _this.bulletsContainer = bulletsContainer;
        _this.line = _this.createChild(AxisLine);
        _this.line.shouldClone = false;
        _this.line.strokeOpacity = 0;
        var baseGrid = _this.createChild(Grid);
        baseGrid.shouldClone = false;
        _this.baseGrid = baseGrid;
        // Make elements disposable
        var disposers = _this._disposers;
        disposers.push(baseGrid);
        disposers.push(_this.line);
        disposers.push(gridContainer);
        disposers.push(breakContainer);
        disposers.push(bulletsContainer);
        disposers.push(_this._chart);
        _this.ticks.template.disabled = true;
        _this.axisFills.template.disabled = true;
        _this.axisFills.template.interactionsEnabled = false;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisRenderer.prototype, "axis", {
        /**
         * Axis of a renderer
         * @return axis Axis
         */
        get: function () {
            return this._axis;
        },
        /**
         * Axis of a renderer
         * @param axis Axis
         */
        set: function (axis) {
            this.setAxis(axis);
        },
        enumerable: true,
        configurable: true
    });
    /**
    * @ignore
    */
    AxisRenderer.prototype.setAxis = function (axis) {
        this._axis = axis;
        this.baseGrid.parent = axis;
        this.line.parent = axis;
        this.gridContainer.bind("opacity", axis);
    };
    /**
     * Called when rendered is attached to an Axis, as well as a property of
     * Axis that might affect the appearance is updated.
     *
     * E.g. `axis.opposite`, `axis.inside`, etc.
     *
     * This method is called **before** draw, so that any related setting
     * changed in this method can be changed.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRenderer.prototype.processRenderer = function () {
        this.events.on("sizechanged", this.updateTooltip, this, false);
        this.events.on("positionchanged", this.updateTooltip, this, false);
        this.labels.template.inside = this.inside;
        this.ticks.template.inside = this.inside;
    };
    /**
     * Updates Axis' tooltip.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRenderer.prototype.updateTooltip = function () {
        // This is a placeholder method for extending classes to override.
    };
    Object.defineProperty(AxisRenderer.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            // This is a placeholder method for extending classes to override.
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Re-positions an element to new coordinates.
     *
     * @ignore Exclude from docs
     * @param item   A target element
     * @param point  New coordinates
     */
    AxisRenderer.prototype.positionItem = function (item, point) {
        if (item) {
            item.moveTo(point);
        }
    };
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @return Point
     */
    AxisRenderer.prototype.positionToPoint = function (position, position2) {
        // This is a placeholder method for extending classes to override.
        return { x: 0, y: 0 };
    };
    /**
     * Converts relative position on axis to angle.
     *
     * @ignore Exclude from docs
     * @todo Description (review / units)
     * @param position  Position (0-1)
     * @return Angle
     */
    AxisRenderer.prototype.positionToAngle = function (position) {
        // This is a placeholder method for extending classes to override.
        return 0;
    };
    /**
     * Converts relative position (0-1) on axis to a pixel coordinate.
     *
     * @param position  Position (0-1)
     * @return Coordinate (px)
     */
    AxisRenderer.prototype.positionToCoordinate = function (position) {
        var coordinate;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        if (axis.renderer.inversed) {
            coordinate = (axis.end - position) * axisFullLength;
        }
        else {
            coordinate = (position - axis.start) * axisFullLength;
        }
        return coordinate;
    };
    AxisRenderer.prototype.updateGridContainer = function () {
    };
    AxisRenderer.prototype.getHeight = function () {
        var gridContainer = this.gridContainer;
        if (gridContainer.parent) {
            return gridContainer.parent.pixelHeight;
        }
        return this.gridContainer.pixelHeight || 0;
    };
    AxisRenderer.prototype.getWidth = function () {
        var gridContainer = this.gridContainer;
        if (gridContainer.parent) {
            return gridContainer.parent.pixelWidth;
        }
        return this.gridContainer.pixelWidth || 0;
    };
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate of a second axis, only needed for complex axes systems, like timeline (px)
     * @return Position (0-1)
     */
    AxisRenderer.prototype.coordinateToPosition = function (coordinate, coordinate2) {
        var position;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        if (axis.renderer.inversed) {
            position = axis.end - coordinate / axisFullLength;
        }
        else {
            position = coordinate / axisFullLength + axis.start;
        }
        return $math.round(position, 5);
    };
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @ignore Exclude from docs
     * @param point  Point
     * @return Position (0-1)
     */
    AxisRenderer.prototype.pointToPosition = function (point) {
        // This is a placeholder method for extending classes to override.
        return 0;
    };
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition  Starting position
     * @param endPosition    End position
     * @return SVG path
     */
    AxisRenderer.prototype.getPositionRangePath = function (startPosition, endPosition) {
        return "";
    };
    /**
     * Invalidates all axis data items, effectively causing them re-evaluated.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    AxisRenderer.prototype.invalidateAxisItems = function () {
        var axis = this.axis;
        if (axis) {
            axis.invalidateDataItems();
        }
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRenderer.prototype.updateGridElement = function (grid, position, endPosition) {
        // This is a placeholder method for extending classes to override.
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick         Tick element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRenderer.prototype.updateTickElement = function (tick, position, endPosition) {
        // This is a placeholder method for extending classes to override.
    };
    /**
     * Updates and positions axis bullet.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRenderer.prototype.updateBullet = function (bullet, position, endPosition) {
        // This is a placeholder method for extending classes to override.
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRenderer.prototype.updateLabelElement = function (label, position, endPosition, location) {
        // This is a placeholder method for extending classes to override.
    };
    /**
     * Updates and positions the axis fill element.
     *
     * @ignore Exclude from docs
     * @param fill         Fill element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRenderer.prototype.updateFillElement = function (fill, position, endPosition) {
        fill.startPosition = position;
        fill.endPosition = endPosition;
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRenderer.prototype.updateAxisLine = function () {
        // This is a placeholder method for extending classes to override.
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRenderer.prototype.updateBaseGridElement = function () {
        // This is a placeholder method for extending classes to override.
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    AxisRenderer.prototype.updateBreakElement = function (axisBreak) {
        this.positionItem(axisBreak.startLine, axisBreak.startPoint);
        this.toggleVisibility(axisBreak.startLine, axisBreak.startPosition, 0, 1);
        this.positionItem(axisBreak.endLine, axisBreak.endPoint);
        this.toggleVisibility(axisBreak.endLine, axisBreak.endPosition, 0, 1);
    };
    Object.defineProperty(AxisRenderer.prototype, "minGridDistance", {
        /**
         * @return Min distance (px)
         */
        get: function () {
            return this.getPropertyValue("minGridDistance");
        },
        /**
         * Minimum distance in pixels between grid elements.
         *
         * Use it to control density of the grid/labels on the axis.element.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/#Setting_the_density_of_the_the_grid_labels} for more info
         * @param value  Min distance (px)
         */
        set: function (value) {
            if (this.setPropertyValue("minGridDistance", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "chart", {
        /**
         * @ignore Exclude from docs
         * @return Chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * A chart, associated with the Axis.
         *
         * @ignore Exclude from docs
         * @param value  Chart
         */
        set: function (value) {
            this._chart.set(value, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggles visibility of an element, based on its current position and
     * min/max position settings.
     *
     * E.g. labels based on `minLabelPosition` and `maxLabelPosition`.
     *
     * @ignore Exclude from docs
     * @param sprite       An element to toggle
     * @param position     Elements current position
     * @param minPosition  Min position setting
     * @param maxPosition  Max position setting
     */
    AxisRenderer.prototype.toggleVisibility = function (sprite, position, minPosition, maxPosition) {
        var axis = this.axis;
        var dataItem = sprite.dataItem;
        if (dataItem && dataItem instanceof AxisDataItem) {
            if ($type.isNumber(dataItem.minPosition)) {
                minPosition = dataItem.minPosition;
            }
            if ($type.isNumber(dataItem.maxPosition)) {
                maxPosition = dataItem.maxPosition;
            }
        }
        var updatedStart = axis.start + (axis.end - axis.start) * (minPosition - 0.0001);
        var updatedEnd = axis.start + (axis.end - axis.start) * (maxPosition + 0.0001);
        if (!sprite.disabled) {
            if (position < updatedStart || position > updatedEnd) {
                sprite.__disabled = true;
            }
            else {
                sprite.__disabled = false;
            }
        }
    };
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    AxisRenderer.prototype.createBreakSprites = function (axisBreak) {
        // This is a placeholder method for extending classes to override.
    };
    Object.defineProperty(AxisRenderer.prototype, "axisFills", {
        /**
         * A list of Axis' Fill elements.
         *
         * Those are fill elements that cover the space between every second set
         * of grid lines, and can be configured to create striped charts.
         *
         * Please note that these are disabled by default. To enable them, set
         * template to true.
         *
         * ```TypeScript
         * categoryAxis.renderer.axisFills.template.disabled = false;
         * ```
         * ```JavaScript
         * categoryAxis.renderer.axisFills.template.disabled = false;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     // ...
         *     "renderer": {
         *       "axisFills": {
         *         "disabled": false
         *       }
         *     }
         *   }]
         * }
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/tutorials/alternated-axis-fills/} this tutorial for more info.
         * @return Fill elements
         */
        get: function () {
            if (!this._axisFills) {
                var fill = this.createFill(this.axis);
                this._axisFills = new ListTemplate(fill);
                fill.applyOnClones = true;
                fill.events.on("enabled", this.invalidateAxisItems, this, false);
                this._disposers.push(new ListDisposer(this._axisFills));
                this._disposers.push(this._axisFills.template);
            }
            return this._axisFills;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new fill element, suitable for this Axis Renderer type.
     *
     * @return Fill element
     */
    AxisRenderer.prototype.createFill = function (axis) {
        return new AxisFill(axis);
    };
    Object.defineProperty(AxisRenderer.prototype, "grid", {
        /**
         * A list of Axis' Grid elements.
         *
         * @return Grid elements
         */
        get: function () {
            if (!this._grid) {
                var grid = this.createGrid();
                this._grid = new ListTemplate(grid);
                grid.applyOnClones = true;
                grid.events.on("enabled", this.invalidateAxisItems, this, false);
                this._disposers.push(new ListDisposer(this._grid));
                this._disposers.push(this._grid.template);
            }
            return this._grid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new grid element, suitable for this Axis Renderer type.
     *
     * @return Grid element
     */
    AxisRenderer.prototype.createGrid = function () {
        return new Grid();
    };
    Object.defineProperty(AxisRenderer.prototype, "ticks", {
        /**
         * A list of Axis' Tick elements.
         *
         * Please note that these are disabled by default. To enable ticks, you'll
         * need to set `disabled` and `strokeOpacity` properties of the tick template.
         *
         * ```TypeScript
         * categoryAxis.renderer.ticks.template.disabled = false;
         * categoryAxis.renderer.ticks.template.strokeOpacity = 0.5;
         * ```
         * ```JavaScript
         * categoryAxis.renderer.ticks.template.disabled = false;
         * categoryAxis.renderer.ticks.template.strokeOpacity = 0.5;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     // ...
         *     "renderer": {
         *       "ticks": {
         *         "disabled": false,
         *         "strokeOpacity": 0.5
         *       }
         *     }
         *   }]
         * }
         * ```
         *
         * @return Tick elements
         */
        get: function () {
            if (!this._ticks) {
                var tick = this.createTick();
                tick.applyOnClones = true;
                tick.isMeasured = false;
                tick.events.on("enabled", this.invalidateAxisItems, this, false);
                this._ticks = new ListTemplate(tick);
                this._disposers.push(new ListDisposer(this._ticks));
                this._disposers.push(this._ticks.template);
            }
            return this._ticks;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new tick element, suitable for this Axis Renderer type.
     *
     * @return Tick element
     */
    AxisRenderer.prototype.createTick = function () {
        return new AxisTick();
    };
    Object.defineProperty(AxisRenderer.prototype, "labels", {
        /**
         * A list of Axis' Label elements.
         *
         * @return Label elements
         */
        get: function () {
            if (!this._labels) {
                var label = this.createLabel();
                this._labels = new ListTemplate(label);
                label.applyOnClones = true;
                label.events.on("enabled", this.invalidateAxisItems, this, false);
                this._disposers.push(new ListDisposer(this._labels));
                this._disposers.push(this._labels.template);
            }
            return this._labels;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new label element, suitable for this Axis Renderer type.
     *
     * @return Label element
     */
    AxisRenderer.prototype.createLabel = function () {
        return new AxisLabel();
    };
    Object.defineProperty(AxisRenderer.prototype, "inside", {
        /**
         * @return Labels inside?
         */
        get: function () {
            return this.getPropertyValue("inside");
        },
        /**
         * Indicates whether Axis' labels and ticks should be drawn inside Plot area.
         *
         * Does not work with all renderers, like AxisRendererRadial.
         *
         * @param value  Labels inside?
         */
        set: function (value) {
            if (this.setPropertyValue("inside", value)) {
                if (this.axis) {
                    this.axis.invalidate();
                }
            }
            if (value) {
                this.width = 0;
                this.height = 0;
            }
            else {
                this.width = undefined;
                this.height = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "opposite", {
        /**
         * @return Draw axis on opposite side?
         */
        get: function () {
            return this.getPropertyValue("opposite");
        },
        /**
         * Indicates whether Axis should be drawn on the opposite side of the plot
         * area than it would normally be drawn based on chart's settings.
         *
         * Does not work with all renderers, like [[AxisRendererRadial]] and
         * [[AxisRenderer Circular].
         *
         * @param value  Draw axis on opposite side?
         */
        set: function (value) {
            this.setPropertyValue("opposite", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "fullWidthTooltip", {
        /**
         * @return Full width tooltip?
         */
        get: function () {
            return this.getPropertyValue("fullWidthTooltip");
        },
        /**
         * Indicates if Axis tooltip should take the whole width of the axis cell.
         * (between two grid lines)
         *
         * NOTE: this setting is ignored on circular axis types.
         *
         * @param value Full width tooltip?
         */
        set: function (value) {
            this.setPropertyValue("fullWidthTooltip", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "tooltipLocation", {
        /**
         * @return Tooltip location
         */
        get: function () {
            return this.getPropertyValue("tooltipLocation");
        },
        /**
         * Location within axis cell to show tooltip on. (0-1)
         *
         * 0 - show at the start
         * 0.5 - show right in the middle
         * 1 - show at the end
         *
         * @param value Tooltip location
         */
        set: function (value) {
            this.setPropertyValue("tooltipLocation", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "tooltipLocation2", {
        /**
         * @return Tooltip location
         */
        get: function () {
            return this.getPropertyValue("tooltipLocation2");
        },
        /**
         * Location within secondary axis cell to show tooltip on. (0-1)
         *
         * 0 - show at the start
         * 0.5 - show right in the middle
         * 1 - show at the end
         *
         * @param value Tooltip location
         */
        set: function (value) {
            this.setPropertyValue("tooltipLocation2", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "cellStartLocation", {
        /**
         * @return Cell start (0-1)
         */
        get: function () {
            return this.getPropertyValue("cellStartLocation");
        },
        /**
         * Location for the cell start.
         *
         * Normally a "cell" is the whole available width in a category.
         *
         * If there are several clustered column-like series available, the whole
         * space is divided between each clustered column, or column stacks.
         *
         * `cellStartLocation` identifies where, within available space, the actual
         * cell starts.
         *
         * This, together with column series' `width` will affect actual width of
         * columns, and thus gaps between them.
         *
         * This will affect category-like axes only, like [[DateAxis]], or
         * [[CategoryAxis]].
         *
         * This is used to limit a space occupied by series like column.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
         * @param value Cell start (0-1)
         */
        set: function (value) {
            if (this.setPropertyValue("cellStartLocation", value)) {
                if (this.axis) {
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "cellEndLocation", {
        /**
         * @return Cell end (0-1)
         */
        get: function () {
            return this.getPropertyValue("cellEndLocation");
        },
        /**
         * Location for the cell end.
         *
         * Normally a "cell" is the whole available width in a category.
         *
         * If there are several clustered column-like series available, the whole
         * space is divided between each clustered column, or column stacks.
         *
         * `cellEndLocation` identifies where, within available space, the actual
         * cell ends.
         *
         * This, together with column series' `width` will affect actual width of
         * columns, and thus gaps between them.
         *
         * This will affect category-like axes only, like [[DateAxis]], or
         * [[CategoryAxis]].
         *
         * This is used to limit a space occupied by series like column.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
         * @param value Cell end (0-1)
         */
        set: function (value) {
            if (this.setPropertyValue("cellEndLocation", value)) {
                if (this.axis) {
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "inversed", {
        /**
         * @return Flip axis?
         */
        get: function () {
            return this.getPropertyValue("inversed");
        },
        /**
         * Indicates if the scale of the axis should be flipped.
         *
         * @param value Flip axis?
         */
        set: function (value) {
            this.setPropertyValue("inversed", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "minLabelPosition", {
        /**
         * @return Min label position (0-1)
         */
        get: function () {
            return this.getPropertyValue("minLabelPosition");
        },
        /**
         * Minimum position along the Axis, for labels.
         *
         * Labels, which have their position closer to the start of the Axis, will be
         * automatically hidden.
         *
         * E.g., setting this to 0.05 (5% of total axis length) would hide labels,
         * that would otherwise be drawn very near start of the Axis.
         *
         * This is especially usefull with `inside = true`, or if the chart hasn't
         * got any extra margins.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
         * @param value  Min label position (0-1)
         */
        set: function (value) {
            this.setPropertyValue("minLabelPosition", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRenderer.prototype, "maxLabelPosition", {
        /**
         * @return Max label position (0-1)
         */
        get: function () {
            return this.getPropertyValue("maxLabelPosition");
        },
        /**
         * Maximum position along the Axis, for labels.
         *
         * Labels, which have their position closer to the and of the Axis, will be
         * automatically hidden.
         *
         * E.g., setting this to 0.95 (95% of total axis length) would hide labels,
         * that would otherwise be drawn very near end of the Axis.
         *
         * This is especially usefull with `inside = true`, or if the chart hasn't
         * got any extra margins.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
         * @param value  Max label position (0-1)
         */
        set: function (value) {
            this.setPropertyValue("maxLabelPosition", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all settings and related items from another object of the same
     * type.
     *
     * @param source  Source object
     */
    AxisRenderer.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.grid.template.copyFrom(source.grid.template);
        this.ticks.template.copyFrom(source.ticks.template);
        this.labels.template.copyFrom(source.labels.template);
        this.axisFills.template.copyFrom(source.axisFills.template);
        this.line.copyFrom(source.line);
        this.baseGrid.copyFrom(source.baseGrid);
    };
    /**
     * @ignore
     */
    AxisRenderer.prototype.toAxisPosition = function (value) {
        return value;
    };
    /**
     * Sets `visibility` property:
     *
     * * `true` - visible
     * * `false` - hidden
     *
     * @param value  true - visible, false - hidden
     * @return Current visibility
     */
    AxisRenderer.prototype.setVisibility = function (value) {
        _super.prototype.setVisibility.call(this, value);
        this.bulletsContainer.visible = value;
    };
    return AxisRenderer;
}(Container));
export { AxisRenderer };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRenderer"] = AxisRenderer;
//# sourceMappingURL=AxisRenderer.js.map