/**
 * Base class for all Axis
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component } from "../../core/Component";
import { Container } from "../../core/Container";
import { DataItem } from "../../core/DataItem";
import { AxisBreak } from "./AxisBreak";
import { Label } from "../../core/elements/Label";
import { Tooltip } from "../../core/elements/Tooltip";
import { SortedListTemplate } from "../../core/utils/SortedList";
import { List, ListTemplate, ListDisposer } from "../../core/utils/List";
import { Disposer, MultiDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
import * as $number from "../../core/utils/Number";
import * as $array from "../../core/utils/Array";
import * as $type from "../../core/utils/Type";
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Axis]].
 *
 * @see {@link DataItem}
 */
var AxisDataItem = /** @class */ (function (_super) {
    __extends(AxisDataItem, _super);
    /**
     * Constructor
     */
    function AxisDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "AxisDataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisDataItem.prototype, "grid", {
        /**
         * @return Grid element
         */
        get: function () {
            if (!this._grid) {
                var component_1 = this.component;
                if (component_1) {
                    var template = void 0;
                    var grid_1;
                    if (this.isRange) {
                        template = component_1.axisRanges.template.grid;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            grid_1 = template.clone();
                        }
                    }
                    else {
                        template = component_1.renderer.grid.template;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            grid_1 = component_1.renderer.grid.create();
                            this._disposers.push(new Disposer(function () {
                                component_1.renderer.grid.removeValue(grid_1);
                            }));
                        }
                    }
                    this.grid = grid_1;
                    grid_1.shouldClone = false;
                    this._disposers.push(grid_1);
                    grid_1.axis = this.component;
                }
            }
            return this._grid;
        },
        /**
         * A [[Grid]] element associated with this data item.
         *
         * If there is no grid element associated with data item, a new one is
         * created and returned.
         *
         * @param grid  Grid element
         */
        set: function (grid) {
            if (this._grid && this._grid != grid) {
                $array.remove(this.sprites, this._grid);
                this._grid.dataItem = undefined;
            }
            if (grid) {
                if (grid.dataItem && grid.dataItem != this) {
                    $array.remove(grid.dataItem.sprites, grid);
                    grid.dataItem.grid = undefined;
                }
                this.addSprite(grid);
            }
            this._grid = grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "tick", {
        /**
         * @return Tick element
         */
        get: function () {
            if (!this._tick) {
                var component_2 = this.component;
                if (component_2) {
                    var template = void 0;
                    var tick_1;
                    if (this.isRange) {
                        template = component_2.axisRanges.template.tick;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            tick_1 = template.clone();
                        }
                    }
                    else {
                        template = component_2.renderer.ticks.template;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            tick_1 = component_2.renderer.ticks.create();
                            this._disposers.push(new Disposer(function () {
                                component_2.renderer.ticks.removeValue(tick_1);
                            }));
                        }
                    }
                    this.tick = tick_1;
                    tick_1.axis = this.component;
                    tick_1.shouldClone = false;
                    this._disposers.push(tick_1);
                }
            }
            return this._tick;
        },
        /**
         * An [[AxisTick]] element associated with this data item.
         *
         * If there is no tick element associated with data item, a new one is
         * created and returned.
         *
         * @param tick  Tick element
         */
        set: function (tick) {
            if (this._tick && this._tick != tick) {
                $array.remove(this.sprites, this._tick);
                this._tick.dataItem = undefined;
            }
            if (tick) {
                if (tick.dataItem && tick.dataItem != this) {
                    $array.remove(tick.dataItem.sprites, tick);
                    tick.dataItem.tick = undefined;
                }
                this.addSprite(tick);
            }
            this._tick = tick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "label", {
        /**
         * @return Label element
         */
        get: function () {
            if (!this._label) {
                var component_3 = this.component;
                if (component_3) {
                    var template = void 0;
                    var label_1;
                    if (this.isRange) {
                        template = component_3.axisRanges.template.label;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            label_1 = template.clone();
                        }
                    }
                    else {
                        template = component_3.renderer.labels.template;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            label_1 = component_3.renderer.labels.create();
                            this._disposers.push(new Disposer(function () {
                                component_3.renderer.labels.removeValue(label_1);
                            }));
                        }
                    }
                    this._disposers.push(label_1);
                    this.label = label_1;
                    label_1.shouldClone = false;
                    label_1.axis = this.component;
                    label_1.virtualParent = component_3;
                }
            }
            return this._label;
        },
        /**
         * An [[AxisLabel]] element associated with this data item.
         *
         * If there is no label element associated with data item, a new one is
         * created and returned.
         *
         * @param label Label element
         */
        set: function (label) {
            if (this._label && this._label != label) {
                $array.remove(this.sprites, this._label);
                this._label.dataItem = undefined;
            }
            if (label) {
                if (label.dataItem && label.dataItem != this) {
                    $array.remove(label.dataItem.sprites, label);
                    label.dataItem.label = undefined;
                }
                this.addSprite(label);
            }
            this._label = label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "axisFill", {
        /**
         * @return Label element
         */
        get: function () {
            if (!this._axisFill) {
                var component_4 = this.component;
                if (component_4) {
                    var template = void 0;
                    var axisFill_1;
                    if (this.isRange) {
                        template = component_4.axisRanges.template.axisFill;
                        if (!this.isTemplate && template.disabled) {
                            return;
                        }
                        else {
                            axisFill_1 = template.clone();
                        }
                    }
                    else {
                        template = component_4.renderer.axisFills.template;
                        if (template.disabled) {
                            return;
                        }
                        else {
                            axisFill_1 = component_4.renderer.axisFills.create();
                            this._disposers.push(new Disposer(function () {
                                component_4.renderer.axisFills.removeValue(axisFill_1);
                            }));
                        }
                    }
                    this.axisFill = axisFill_1;
                    axisFill_1.shouldClone = false;
                    this._disposers.push(axisFill_1);
                }
            }
            return this._axisFill;
        },
        /**
         * An [[AxisFill]] associated element with this data item.
         *
         * If there is no fill element associated with data item, a new one is
         * created and returned.
         *
         * @param label Label element
         */
        set: function (axisFill) {
            if (this._axisFill && this._axisFill != axisFill) {
                $array.remove(this.sprites, this._axisFill);
                this._axisFill.dataItem = undefined;
            }
            if (axisFill) {
                if (axisFill.dataItem && axisFill.dataItem != this) {
                    $array.remove(axisFill.dataItem.sprites, axisFill);
                    axisFill.dataItem.axisFill = undefined;
                }
                axisFill.axis = this.component;
                this.addSprite(axisFill);
            }
            this._axisFill = axisFill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "text", {
        /**
         * @return Text label
         */
        get: function () {
            return this._text;
        },
        /**
         * Text to be used as data item's label.
         *
         * @param text Text label
         */
        set: function (text) {
            this._text = text;
            if (this._label) { // do not use getter, it will create unwanted instances!
                this._label.text = text;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "mask", {
        /**
         * Data item's mask.
         *
         * @return Mask
         */
        get: function () {
            return this._mask;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "contents", {
        /**
         * Returns a [[Container]] to place all visual elements, related to data item
         * in.
         *
         * If there is no Container, a new one is created.
         *
         * @return Contents container
         */
        get: function () {
            if (!this._contents) {
                var contents = new Container();
                this.addSprite(contents);
                contents.isMeasured = false;
                this._contents = contents;
                var component = this.component;
                if (component) {
                    var mask = component.renderer.createFill(this.component);
                    mask.disabled = false;
                    mask.axis = component;
                    this.addSprite(mask);
                    this._mask = mask;
                    contents.mask = mask;
                }
            }
            return this._contents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisDataItem.prototype, "axisBreak", {
        /**
         * @return Axis break
         */
        get: function () {
            return this._axisBreak;
        },
        /**
         * An [[AxisBreak]] this data item falls within.
         *
         * @param axisBreak Axis break
         */
        set: function (axisBreak) {
            if (this._axisBreak) {
                this._axisBreak.dataItems.removeValue(this);
            }
            if (axisBreak) {
                axisBreak.dataItems.push(this);
            }
            this._axisBreak = axisBreak;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Re-draws the element.
     *
     * @ignore Exclude from docs
     */
    AxisDataItem.prototype.validate = function () {
        if (this.component) {
            this.component.validateDataElement(this);
        }
    };
    /**
     * Appends data item's elements to the parent [[Container]].
     *
     * @ignore Exclude from docs
     */
    AxisDataItem.prototype.appendChildren = function () {
        if (this.component) {
            this.component.appendDataItem(this);
        }
    };
    /**
     * Checks if data item has particular property set.
     *
     * @param prop  Property name
     * @return Property set?
     */
    AxisDataItem.prototype.hasProperty = function (prop) {
        return prop == "component" ? true : _super.prototype.hasProperty.call(this, prop);
    };
    /**
     * Copies all parameters from another [[AxisDataItem]].
     *
     * @param source Source AxisDataItem
     */
    AxisDataItem.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.text = source.text;
        if (source.bullet) {
            this.bullet = source.bullet.clone();
        }
        this.minPosition = source.minPosition;
        this.maxPosition = source.maxPosition;
    };
    /**
     * Sets visibility of the Data Item.
     *
     * @param value Data Item
     */
    AxisDataItem.prototype.setVisibility = function (value, noChangeValues) {
        _super.prototype.setVisibility.call(this, value, noChangeValues);
        if (this._contents) {
            this._contents.visible = value;
        }
    };
    Object.defineProperty(AxisDataItem.prototype, "bullet", {
        /**
         * @return Bullet
         */
        get: function () {
            return this._bullet;
        },
        /**
         * Set it to an instance of any [[Sprite]]. It will be displayed as an axis
         * bullet in the middle of the cell, or specific value.
         *
         * If you need position bullet relatively to the cell, use [[AxisBullet]]
         * instead. It has a `location` property which can be used to indicate
         * precise relative location within cell/range.
         *
         * Also, [[AxisBullet]] is a [[Container]] so you can push any other element
         * into it.
         *
         * NOTE: `location` is relative to the parent axis range's scope, i.e.
         * between its `date` and `endDate` for [[DateAxis]], or `value`/`endValue`
         * ([[ValueAxis]]), or `category`/`endCategory` ([[categoryAxis]]).
         *
         * ```TypeScript
         * let range = dateAxis.axisRanges.create();
         * range.date = new Date(2018, 0, 5);
         *
         * let flag = new am4plugins_bullets.FlagBullet();
         * flag.label.text = "Hello";
         *
         * range.bullet = flag;
         * ```
         * ```JavaScript
         * var range = dateAxis.axisRanges.create();
         * range.date = new Date(2018, 0, 5);
         *
         * var flag = new am4plugins_bullets.FlagBullet();
         * flag.label.text = "Hello";
         *
         * range.bullet = flag;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     "type": "DateAxis",
         *     // ...
         *     "axisRanges": [{
         *       "date": new Date(2018, 0, 5),
         *       "bullet: {
         *         "type": "FlagBullet",
         *         "label": {
         *           "text": "Hello"
         *         }
         *       }
         *     }]
         *   }]
         * }
         * ```
         *
         * @since 4.5.9
         * @param  value  Bullet
         */
        set: function (value) {
            if (this._bullet && this._bullet != value) {
                $array.remove(this.sprites, this._bullet);
                this._bullet.dataItem = undefined;
            }
            this._bullet = value;
            if (value) {
                this.addSprite(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return AxisDataItem;
}(DataItem));
export { AxisDataItem };
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines named positions for data item's location within [[Axis]].
 */
export var AxisItemLocation;
(function (AxisItemLocation) {
    AxisItemLocation[AxisItemLocation["Start"] = 0] = "Start";
    AxisItemLocation[AxisItemLocation["Middle"] = 0.5] = "Middle";
    AxisItemLocation[AxisItemLocation["End"] = 1] = "End";
})(AxisItemLocation || (AxisItemLocation = {}));
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all Axis elements.
 *
 * @see {@link IAxisEvents} for a list of available Events
 * @see {@link IAxisAdapters} for a list of available Adapters
 */
var Axis = /** @class */ (function (_super) {
    __extends(Axis, _super);
    /**
     * Constructor
     */
    function Axis() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Number of Grid elements on the axis.
         */
        _this._gridCount = 10;
        /**
         * A list of [[XYSeries]] that are using this Axis.
         */
        _this._series = new List();
        /**
         * Specifies if axis should be automatically disposed when removing from
         * chart's axis list.
         *
         * @default true
         */
        _this.autoDispose = true;
        /**
         * @ignore
         */
        _this._axisItemCount = 0;
        if (_this.constructor === Axis) {
            throw new Error("'Axis' cannot be instantiated directly. Please use a specific axis type.");
        }
        _this.hideTooltipWhileZooming = true;
        _this.minWidth = 0.0001;
        _this.minHeight = 0.0001;
        _this.className = "Axis";
        _this.shouldClone = false;
        _this.setPropertyValue("cursorTooltipEnabled", true);
        _this.toggleZoomOutButton = true;
        _this.zoomable = true;
        var interfaceColors = new InterfaceColorSet();
        // Create title
        _this.title = new Label();
        _this.title.shouldClone = false;
        _this._disposers.push(_this.title);
        _this.setPropertyValue("startLocation", 0);
        _this.setPropertyValue("endLocation", 1);
        // Data item iterator
        _this._dataItemsIterator = new $iter.ListIterator(_this.dataItems, function () { return _this.dataItems.create(); });
        _this._dataItemsIterator.createNewItems = true;
        // Create tooltip
        var tooltip = new Tooltip();
        _this._disposers.push(tooltip);
        tooltip.label.padding(5, 10, 5, 10);
        tooltip.background.pointerLength = 5;
        tooltip.fitPointerToBounds = true;
        tooltip.background.filters.clear();
        // Set virtual parentfor the tooltip so that it can properly inheirt
        // formatters from the axis.
        tooltip.virtualParent = _this;
        // Create background element for the tooltip
        var background = tooltip.background;
        background.cornerRadius = 0;
        background.fill = interfaceColors.getFor("alternativeBackground");
        background.stroke = background.fill;
        background.strokeWidth = 1;
        background.fillOpacity = 1;
        tooltip.label.fill = interfaceColors.getFor("alternativeText");
        _this.tooltip = tooltip;
        // Accessibility
        _this.readerHidden = true;
        _this.events.on("rangechangestarted", function () {
            _this.series.each(function (series) {
                if (series.hideTooltipWhileZooming) {
                    series.tooltip.hide();
                    series.tooltip.preventShow = true;
                }
            });
            if (_this.hideTooltipWhileZooming) {
                _this.tooltip.hide();
                _this.tooltip.preventShow = true;
            }
        }, undefined, false);
        _this.events.on("rangechangeended", function () {
            _this.series.each(function (series) {
                if (series.hideTooltipWhileZooming) {
                    series.tooltip.hide();
                    series.tooltip.preventShow = false;
                }
            });
            if (_this.hideTooltipWhileZooming) {
                _this.tooltip.hide();
                _this.tooltip.preventShow = false;
            }
        }, undefined, false);
        _this.applyTheme();
        return _this;
    }
    /**
     * Holds reference to a function that accepts a DataItem and its index as
     * parameters.
     *
     * It can either return a fill opacity for a fill, or manipulate data item
     * directly, to create various highlighting scenarios.
     *
     * For example, you can set it up to highlight only weekends on a
     * [[DateAxis]].
     */
    Axis.prototype.fillRule = function (dataItem, index) {
        if (!$type.isNumber(index)) {
            index = dataItem.index;
        }
        if (index / 2 == Math.round(index / 2)) {
            dataItem.axisFill.__disabled = true;
            dataItem.axisFill.opacity = 0;
        }
        else {
            dataItem.axisFill.opacity = 1;
            dataItem.axisFill.__disabled = false;
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    Axis.prototype.createDataItem = function () {
        return new AxisDataItem();
    };
    /**
     * Invalidates layout.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.invalidateLayout = function () {
        _super.prototype.invalidateLayout.call(this);
        // this puts series after axis in invalidation order also makes series update it's data items in case widht/height of a series is not 100%
        $iter.each(this.series.iterator(), function (series) {
            series.invalidateLayout();
        });
    };
    /**
     * Invalidates series of this axis.
     */
    Axis.prototype.invalidateSeries = function () {
        // this puts series after axis in invalidation order also makes series update it's data items in case widht/height of a series is not 100%
        $iter.each(this.series.iterator(), function (series) {
            series.invalidate();
        });
    };
    /**
     * Override to cancel super call for data element validation.
     * @ignore
     */
    Axis.prototype.validateDataElements = function () {
        this._axisItemCount = 0;
        if (this.ghostLabel) {
            this.renderer.updateLabelElement(this.ghostLabel, this.start, this.end);
            this.ghostLabel.validate();
        }
    };
    /**
     * Recalculates the number of grid items on the axis.
     */
    Axis.prototype.updateGridCount = function () {
        if (this.renderer) {
            var gridCount = this.axisLength / this.renderer.minGridDistance;
            if (gridCount != this._gridCount) {
                this._gridCount = gridCount;
                this.clearCache();
            }
        }
    };
    /**
     * Redraws the element.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.validateLayout = function () {
        this.axisFullLength = this.axisLength / (this.end - this.start);
        _super.prototype.validateLayout.call(this);
        this.updateGridCount();
        var renderer = this.renderer;
        if (renderer) {
            renderer.updateAxisLine();
            renderer.updateTooltip();
            renderer.updateBaseGridElement();
        }
        if (this._prevLength != this.axisLength) {
            this.dispatchImmediately("lengthchanged");
            this._prevLength = this.axisLength;
        }
    };
    /**
     * Initializes Axis' renderer.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.initRenderer = function () {
    };
    /**
     * Adds a data item to the Axis.
     *
     * @param dataItem Data item
     */
    Axis.prototype.appendDataItem = function (dataItem) {
        var renderer = this.renderer;
        var tick = dataItem.tick;
        if (tick) {
            if (tick.above) {
                tick.parent = renderer.bulletsContainer;
            }
            else {
                tick.parent = renderer.gridContainer;
            }
        }
        if (dataItem.label) {
            dataItem.label.parent = renderer;
        }
        var axisFill = dataItem.axisFill;
        if (axisFill) {
            if (axisFill.above) {
                axisFill.parent = renderer.bulletsContainer;
            }
            else {
                axisFill.parent = renderer.gridContainer;
            }
        }
        var grid = dataItem.grid;
        if (grid) {
            if (grid.above) {
                grid.parent = renderer.bulletsContainer;
            }
            else {
                grid.parent = renderer.gridContainer;
            }
        }
        if (dataItem.bullet) {
            dataItem.bullet.parent = renderer.bulletsContainer;
        }
    };
    /**
     * Redraws Axis' related items.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.validate = function () {
        _super.prototype.validate.call(this);
        this.validateLayout();
        this.renderer.updateGridContainer();
    };
    /**
     * Redars Axis ranges.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.validateAxisRanges = function () {
        var _this = this;
        $iter.each(this.axisRanges.iterator(), function (axisRange) {
            _this.appendDataItem(axisRange);
            _this.validateDataElement(axisRange);
            if (axisRange.grid) {
                axisRange.grid.validate();
            }
            if (axisRange.tick) {
                axisRange.tick.validate();
            }
            if (axisRange.axisFill) {
                axisRange.axisFill.validate();
            }
            if (axisRange.label) {
                axisRange.label.validate();
            }
        });
    };
    /**
     * Invalidates all axis breaks, so they are redrawn.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.validateBreaks = function () {
        if (this._axisBreaks) {
            $iter.each(this._axisBreaks.iterator(), function (axisBreak) {
                axisBreak.invalidate();
            });
        }
    };
    /**
     * Associates an Axis break with this Axis, after it is inserted into
     * `axisBreaks`.
     *
     * @ignore Exclude from docs
     * @param event Event
     */
    Axis.prototype.processBreak = function (event) {
        var axisBreak = event.newValue;
        axisBreak.parent = this.renderer.breakContainer;
        axisBreak.axis = this;
    };
    /**
     * Registers a [[XYSeries]] element with this Axis.
     *
     * Returns a [[Disposer]] for all events, added to Series for watching
     * changes in Axis, and vice versa.
     * @ignore
     * @param series  Series
     * @return Event disposer
     */
    Axis.prototype.registerSeries = function (series) {
        var _this = this;
        this.series.moveValue(series);
        return new MultiDisposer([
            new Disposer(function () {
                _this.series.removeValue(series);
            }),
            this.events.on("lengthchanged", series.invalidate, series, false),
            this.events.on("lengthchanged", series.createMask, series, false),
            this.events.on("startchanged", series.invalidate, series, false),
            this.events.on("endchanged", series.invalidate, series, false),
        ]);
    };
    Object.defineProperty(Axis.prototype, "renderer", {
        /**
         * @return Renderer
         */
        get: function () {
            return this._renderer;
        },
        /**
         * An [[AxisRenderer]] to be used to render this Axis.
         *
         * Please note that most of the settings, related to Axis' appearance are set
         * via its renderer. Not directly on the Axis.
         *
         * E.g.:
         *
         * ```TypeScript
         * axis.renderer.inside = true;
         * axis.renderer.minLabelPosition = 0.1;
         * axis.renderer.maxLabelPosition = 0.9;
         * ```
         * ```JavaScript
         * axis.renderer.inside = true;
         * axis.renderer.minLabelPosition = 0.1;
         * axis.renderer.maxLabelPosition = 0.9;
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/} for more info
         * @param renderer  Renderer
         */
        set: function (renderer) {
            if (renderer != this._renderer) {
                this._renderer = renderer;
                renderer.chart = this.chart;
                renderer.axis = this;
                renderer.parent = this;
                this.title.parent = this; // we add title to axis and set layout in renderer to avoid one extra container, as otherwise axis container would be used for holding renderer only
                this.initRenderer();
                this._disposers.push(renderer.gridContainer.events.on("maxsizechanged", this.invalidate, this, false));
                var ghostLabel_1 = this.renderer.labels.create();
                this._disposers.push(ghostLabel_1);
                ghostLabel_1.dataItem = this.dataItems.template.clone(); // just for the adapters not to fail
                ghostLabel_1.text = "L";
                ghostLabel_1.parent = this.renderer;
                ghostLabel_1.shouldClone = false;
                ghostLabel_1.fillOpacity = 0;
                ghostLabel_1.opacity = 0;
                ghostLabel_1.strokeOpacity = 0;
                ghostLabel_1.interactionsEnabled = false;
                ghostLabel_1.validate();
                this.ghostLabel = ghostLabel_1;
                this.events.on("beforedatavalidated", function () {
                    ghostLabel_1.text = "L";
                }, undefined, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts a relative position to angle. (for circular axes)
     *
     * @param position Position (0-1)
     * @return Angle
     */
    Axis.prototype.positionToAngle = function (position) {
        return this.renderer.positionToAngle(position);
    };
    /**
     * Converts pixel coordinates to a relative position. (0-1)
     *
     * @param point  Coorinates (px)
     * @return Position (0-1)
     */
    Axis.prototype.pointToPosition = function (point) {
        return this.renderer.pointToPosition(point);
    };
    /**
     * Converts relative position to coordinate.
     *
     * @since 4.7.15
     * @param position (0-1)
     * @return coordinate (px)
     */
    Axis.prototype.positionToCoordinate = function (position) {
        return this.renderer.positionToCoordinate(position);
    };
    /**
     * [getAnyRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param start  [description]
     * @param end    [description]
     * @return [description]
     */
    Axis.prototype.getAnyRangePath = function (start, end) {
        return this.renderer.getPositionRangePath(start, end);
    };
    /**
     * Converts any positional parameter to a relative position on axis.
     *
     * @todo Description (review)
     * @param value  Pisition
     * @return Position (0-1)
     */
    Axis.prototype.anyToPosition = function (value) {
        return 0;
    };
    /**
     * Converts any positional parameter to a relative position on axis.
     *
     * @todo Description (review)
     * @param value  Pisition
     * @return Orientation point
     */
    Axis.prototype.anyToPoint = function (value) {
        return { x: 0, y: 0, angle: 0 };
    };
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition [description]
     * @param endPosition   [description]
     * @return [description]
     */
    Axis.prototype.getPositionRangePath = function (startPosition, endPosition) {
        if (this.renderer) {
            return this.renderer.getPositionRangePath(startPosition, endPosition);
        }
        return "";
    };
    Object.defineProperty(Axis.prototype, "axisLength", {
        /**
         * Actual axis length in pixels.
         *
         * @return Axis length (px)
         */
        get: function () {
            if (this.renderer) {
                return this.renderer.axisLength;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "cursorTooltipEnabled", {
        /**
         * @return Display tooltip?
         */
        get: function () {
            return this.getPropertyValue("cursorTooltipEnabled");
        },
        /**
         * Indicates if axis should display a tooltip for chart's cursor.
         *
         * @param value Display tooltip?
         */
        set: function (value) {
            if (this.setPropertyValue("cursorTooltipEnabled", value)) {
                if (value && this.renderer) {
                    this.renderer.updateTooltip();
                }
                else if (this.tooltip) {
                    this.tooltip.hide(0);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "toggleZoomOutButton", {
        /**
         * @return Toggle zoom out button?
         */
        get: function () {
            return this.getPropertyValue("toggleZoomOutButton");
        },
        /**
         * Normally, when axis is zoomed in, a zoom out button is shown by a chart,
         * and vice versa: when axis is zoomed out completely, zoom out button is
         * hidden.
         *
         * Setting this to `false` will disable this behavior. Zooming in our out
         * this axis will not reveal or hide zoom out button.
         *
         * @default true
         * @since 4.6.2
         * @param  value  Toggle zoom out button?
         */
        set: function (value) {
            this.setPropertyValue("toggleZoomOutButton", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hides element's [[Tooltip]].
     *
     * @see {@link Tooltip}
     */
    Axis.prototype.hideTooltip = function (duration) {
        _super.prototype.hideTooltip.call(this, duration);
        this._tooltipPosition = undefined;
    };
    /**
     * Shows Axis tooltip at specific relative position within Axis. (0-1)
     *
     * @param position Position (0-1)
     * @param local or global position
     */
    Axis.prototype.showTooltipAtPosition = function (position, local) {
        var tooltip = this._tooltip;
        if (!tooltip || this.dataItems.length <= 0) {
            this._tooltipPosition = undefined;
        }
        else {
            if (!local) {
                position = this.toAxisPosition(position);
            }
            if (!$type.isNumber(position) || position < this.start || position > this.end) {
                tooltip.hide(0);
                this._tooltipPosition = undefined;
                return;
            }
            var renderer = this.renderer;
            //@todo: think of how to solve this better
            if (!tooltip.parent) {
                tooltip.parent = this.tooltipContainer;
            }
            var tooltipLocation = renderer.tooltipLocation;
            var startPosition = this.getCellStartPosition(position);
            var endPosition = this.getCellEndPosition(position);
            if (this.tooltipPosition == "fixed") {
                position = startPosition + (endPosition - startPosition) * tooltipLocation;
            }
            position = $math.fitToRange(position, this.start, this.end);
            if (this._tooltipPosition != position) {
                this._tooltipPosition = position;
                var tooltipLocation2 = renderer.tooltipLocation2;
                var startPoint = renderer.positionToPoint(startPosition, tooltipLocation2);
                var endPoint = renderer.positionToPoint(endPosition, tooltipLocation2);
                // save values so cursor could use them
                this.currentItemStartPoint = startPoint;
                this.currentItemEndPoint = endPoint;
                if (renderer.fullWidthTooltip) {
                    tooltip.width = endPoint.x - startPoint.x;
                    tooltip.height = endPoint.y - startPoint.y;
                }
                var point = renderer.positionToPoint(position, tooltipLocation2);
                var globalPoint = $utils.spritePointToSvg(point, this.renderer.line);
                tooltip.text = this.getTooltipText(position);
                if (tooltip.text) {
                    tooltip.delayedPointTo(globalPoint);
                    tooltip.show();
                }
            }
            if (!this.cursorTooltipEnabled || this.tooltip.disabled) {
                tooltip.hide(0);
            }
        }
    };
    /**
     * Converts relative position (0-1) to Axis position with zoom level and
     * inversed taken into account.
     *
     * @param position Global position (0-1)
     * @return Position within Axis (0-1)
     */
    Axis.prototype.toAxisPosition = function (position) {
        position = this.renderer.toAxisPosition(position);
        if (position == undefined) {
            return;
        }
        position = position * (this.end - this.start);
        if (this.renderer.inversed) {
            position = this.end - position;
        }
        else {
            position = this.start + position;
        }
        return position;
    };
    /**
     * Converts position on the axis with zoom level and
     * inversed taken into account to global position.
     *
     * @param position Axis position (0-1)
     * @return Global position (0-1)
     */
    Axis.prototype.toGlobalPosition = function (position) {
        if (this.renderer.inversed) {
            position = this.end - position;
        }
        else {
            position = position - this.start;
        }
        return position / (this.end - this.start);
    };
    /**
     * Returns text to be used for cursor's Axis tooltip.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param position  Position coordinate (px)
     * @return Label text
     */
    Axis.prototype.getTooltipText = function (position) {
        return;
    };
    /**
     * Updates Axis' tooltip's position and possibly size, and pointer (stem)
     * place.
     *
     * @ignore Exclude from docs
     * @param pointerOrientation  Pointer (stem) orientation
     * @param boundingRectangle   A rectangle for tooltip to fit within
     */
    Axis.prototype.updateTooltip = function (pointerOrientation, boundingRectangle) {
        var tooltip = this._tooltip;
        if (tooltip) {
            tooltip.fixDoc = false;
            tooltip.pointerOrientation = pointerOrientation;
            tooltip.setBounds($utils.spriteRectToSvg(boundingRectangle, this.renderer.line));
        }
    };
    /**
     * [roundPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param position  Relative position
     * @param location  Location on axis
     * @return Rounded position
     */
    Axis.prototype.roundPosition = function (position, location, axisLocation) {
        return position;
    };
    /**
     * [getCellStartPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param position [description]
     * @return [description]
     */
    Axis.prototype.getCellStartPosition = function (position) {
        return position;
    };
    /**
     * [getCellEndPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param position [description]
     * @return [description]
     */
    Axis.prototype.getCellEndPosition = function (position) {
        return position;
    };
    Object.defineProperty(Axis.prototype, "axisRanges", {
        /**
         * A list of axis ranges for this Axis.
         *
         * @return Axis ranges
         */
        get: function () {
            if (!this._axisRanges) {
                var dataItem = this.createDataItem();
                dataItem.isRange = true;
                dataItem.axisFill = this.renderer.axisFills.template.clone();
                dataItem.grid = this.renderer.grid.template.clone();
                dataItem.tick = this.renderer.ticks.template.clone();
                dataItem.label = this.renderer.labels.template.clone();
                dataItem.isTemplate = true;
                dataItem.component = this;
                dataItem.axisFill.disabled = false;
                dataItem.tick.disabled = false;
                dataItem.grid.disabled = false;
                dataItem.label.disabled = false;
                this._axisRanges = new ListTemplate(dataItem);
                this._axisRanges.events.on("inserted", this.processAxisRange, this, false);
                this._disposers.push(new ListDisposer(this._axisRanges));
                this._disposers.push(this._axisRanges.template);
            }
            return this._axisRanges;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Decorates an axis range after it has been added to the axis range list.
     *
     * @param event Event
     */
    Axis.prototype.processAxisRange = function (event) {
        var axisRange = event.newValue;
        axisRange.component = this;
        axisRange.isRange = true;
    };
    Object.defineProperty(Axis.prototype, "axisBreaks", {
        /**
         * A list of axis breaks on this Axis.
         *
         * @return Axis breaks.
         */
        get: function () {
            if (!this._axisBreaks) {
                this._axisBreaks = new SortedListTemplate(this.createAxisBreak(), function (a, b) {
                    return $number.order(a.adjustedStartValue, b.adjustedStartValue);
                });
                this._axisBreaks.events.on("inserted", this.processBreak, this, false);
                this._disposers.push(new ListDisposer(this._axisBreaks));
                this._disposers.push(this._axisBreaks.template);
            }
            return this._axisBreaks;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new axis break.
     *
     * @return Axis break
     */
    Axis.prototype.createAxisBreak = function () {
        return new AxisBreak();
    };
    Object.defineProperty(Axis.prototype, "series", {
        /**
         * A list of Series currently associated with this Axis.
         *
         * @return Series
         */
        get: function () {
            if (!this._series) {
                this._series = new List();
            }
            return this._series;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes Series' data items.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.processSeriesDataItems = function () {
    };
    /**
     * Processes Series' single data item.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     */
    Axis.prototype.processSeriesDataItem = function (dataItem, axisLetter) {
    };
    /**
     * Post-processes Serie's data items.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.postProcessSeriesDataItems = function (series) {
    };
    /**
     * Post-processes Serie's single data item.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     */
    Axis.prototype.postProcessSeriesDataItem = function (dataItem) {
    };
    //
    /**
     * Updates Axis based on all Series that might influence it.
     *
     * Called by Series after Series data is validated.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.updateAxisBySeries = function () {
    };
    /**
     * Hides unused data items.
     *
     * @ignore Exclude from docs
     */
    Axis.prototype.hideUnusedDataItems = function () {
        var _this = this;
        // hide all unused
        var dataItemsIterator = this._dataItemsIterator;
        dataItemsIterator.createNewItems = false;
        $iter.each(dataItemsIterator.iterator(), function (dataItem) {
            _this.validateDataElement(dataItem); // solves shrinking
            dataItem.__disabled = true;
        });
        dataItemsIterator.clear();
        dataItemsIterator.createNewItems = true;
    };
    /**
     * Returns a Series' data item that corresponds to specific position on Axis.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param series    Series
     * @param position  Position (0-1)
     * @param findNearest  Should axis try to find nearest tooltip if there is no data item at exact position
     * @return Data item
     */
    Axis.prototype.getSeriesDataItem = function (series, position, findNearest) {
        return;
    };
    /**
     * Returns an angle that corresponds to specific position on axis.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       ???
     * @param location  Location
     * @param stackKey  ???
     * @return Angle
     */
    Axis.prototype.getAngle = function (dataItem, key, location, stackKey, range) {
        return;
    };
    /**
     * [getX description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    Axis.prototype.getX = function (dataItem, key, location, stackKey, range) {
        return;
    };
    /**
     * [getX description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    Axis.prototype.getPositionX = function (dataItem, key, location, stackKey, range) {
        return;
    };
    /**
     * [getY description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    Axis.prototype.getY = function (dataItem, key, location, stackKey, range) {
        return;
    };
    /**
     * [getY description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    Axis.prototype.getPositionY = function (dataItem, key, location, stackKey, range) {
        return;
    };
    Object.defineProperty(Axis.prototype, "basePoint", {
        /**
         * Coordinates of the actual axis start.
         *
         * @ignore Exclude from docs
         * @return Base point coordinates
         */
        get: function () {
            return { x: 0, y: 0 };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [dataChangeUpdate description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Axis.prototype.dataChangeUpdate = function () {
    };
    /**
     * [dataChangeUpdate description]
     *
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Axis.prototype.seriesDataChangeUpdate = function (series) {
    };
    /**
     * Removes axis breaks that fall between `min` and `max` (???)
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param min  Start value
     * @param max  End value
     * @return Spread o
     */
    Axis.prototype.adjustDifference = function (min, max) {
        var difference = max - min;
        if ($type.isNumber(difference)) {
            if (this._axisBreaks) {
                $iter.eachContinue(this._axisBreaks.iterator(), function (axisBreak) {
                    var startValue = axisBreak.adjustedStartValue;
                    var endValue = axisBreak.adjustedEndValue;
                    if ($type.isNumber(startValue) && $type.isNumber(endValue)) {
                        // breaks are sorted, we don't need go further anymore
                        if (startValue > max) {
                            return false;
                        }
                        if (endValue >= min) {
                            if ($type.isNumber(startValue) && $type.isNumber(endValue)) {
                                var breakSize = axisBreak.breakSize;
                                var intersection = $math.intersection({ start: startValue, end: endValue }, { start: min, end: max });
                                if (intersection) {
                                    difference -= (intersection.end - intersection.start) * (1 - breakSize);
                                }
                            }
                        }
                        return true;
                    }
                });
            }
            return difference;
        }
    };
    /**
     * Checks if specific value falls within a break.
     *
     * Returns [[AxisBreak]] the value falls into.
     *
     * @param value  Value to check
     * @return Axis break
     */
    Axis.prototype.isInBreak = function (value) {
        if (this._axisBreaks) {
            return $iter.find(this._axisBreaks.iterator(), function (axisBreak) {
                return value >= axisBreak.adjustedStartValue &&
                    value <= axisBreak.adjustedEndValue;
            });
        }
    };
    /**
     * [fixAxisBreaks description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Axis.prototype.fixAxisBreaks = function () {
        var _this = this;
        if (this._axisBreaks) {
            var axisBreaks = this._axisBreaks;
            if (axisBreaks.length > 0) {
                // first make sure that startValue is <= end value
                // This needs to make a copy of axisBreaks because it mutates the list while traversing
                // TODO very inefficient
                $array.each($iter.toArray(axisBreaks.iterator()), function (axisBreak) {
                    var startValue = $math.min(axisBreak.startValue, axisBreak.endValue);
                    var endValue = $math.max(axisBreak.startValue, axisBreak.endValue);
                    axisBreak.adjustedStartValue = startValue;
                    axisBreak.adjustedEndValue = endValue;
                    _this._axisBreaks.update(axisBreak);
                });
                var firstAxisBreak = axisBreaks.first;
                var previousEndValue_1 = Math.min(firstAxisBreak.startValue, firstAxisBreak.endValue);
                // process breaks
                // TODO does this need to call axisBreaks.update ?
                $iter.each(axisBreaks.iterator(), function (axisBreak) {
                    var startValue = axisBreak.adjustedStartValue;
                    var endValue = axisBreak.adjustedEndValue;
                    // breaks can't overlap
                    // if break starts before previous break ends
                    if (startValue < previousEndValue_1) {
                        startValue = previousEndValue_1;
                        if (endValue < previousEndValue_1) {
                            endValue = previousEndValue_1;
                        }
                    }
                    axisBreak.adjustedStartValue = startValue;
                    axisBreak.adjustedEndValue = endValue;
                });
            }
        }
    };
    Object.defineProperty(Axis.prototype, "startIndex", {
        /**
         * @ignore Exclude from docs
         * @return [description]
         */
        get: function () {
            return 0;
        },
        /**
         * We need start/end indexes of axes to be 0 - `dataItems.length`.
         *
         * Yes, also for category axis, this helps to avoid jumping of categories
         * while scrolling and does not do a lot of extra work as we use
         * protected `_startIndex` and `_endIndex` when working with items.
         *
         * @hidden
         */
        /**
         * [startIndex description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "endIndex", {
        /**
         * @ignore Exclude from docs
         * @return [description]
         */
        get: function () {
            return this.dataItems.length;
        },
        /**
         * [endIndex description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a formatted label based on position.
     *
     * Individual axis types should override this method to generate a label
     * that is relevant to axis type.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    Axis.prototype.getPositionLabel = function (position) {
        return Math.round(position * 100) + "%x";
    };
    Object.defineProperty(Axis.prototype, "chart", {
        /**
         * @return Chart
         */
        get: function () {
            return this._chart;
        },
        /**
         * A Chart this Axis belongs to.
         *
         * @param value  Chart
         */
        set: function (value) {
            this._chart = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a data item for a Series range.
     *
     * @param series  Target Series
     * @return Range data item
     */
    Axis.prototype.createSeriesRange = function (series) {
        var range = this.axisRanges.create();
        range.component = this;
        range.axisFill = this.renderer.axisFills.template.clone();
        range.axisFill.disabled = false;
        range.axisFill.fillOpacity = 0;
        range.grid = this.renderer.grid.template.clone();
        range.grid.disabled = true;
        range.tick = this.renderer.ticks.template.clone();
        range.tick.disabled = true;
        range.label = this.renderer.labels.template.clone();
        range.label.disabled = true;
        range.addDisposer(new Disposer(function () {
            series.axisRanges.removeValue(range);
        }));
        series.axisRanges.push(range);
        return range;
    };
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    Axis.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.renderer) {
            this.renderer.copyFrom(source.renderer);
        }
        else {
            if (source.renderer) {
                this.renderer = source.renderer.clone();
                this._disposers.push(this.renderer);
            }
        }
        if (source.title) {
            if (!this.title) {
                this.title = source.title.clone();
                this.title.parent = this;
            }
            else {
                this.title.copyFrom(source.title);
            }
            this._disposers.push(this.title);
        }
    };
    /**
     * Resets internal iterator.
     */
    Axis.prototype.resetIterators = function () {
        this._dataItemsIterator.reset();
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    Axis.prototype.processConfig = function (config) {
        if (config) {
            // Set up axis ranges
            if ($type.hasValue(config.axisRanges) && $type.isArray(config.axisRanges)) {
                for (var i = 0, len = config.axisRanges.length; i < len; i++) {
                    var range = config.axisRanges[i];
                    // If `series` is set, we know it's a series range
                    if ($type.hasValue(range["series"])) {
                        if ($type.isString(range["series"])) {
                            if (this.map.hasKey(range["series"])) {
                                //range["series"] = this.map.getKey(range["series"]);
                                config.axisRanges[i] = this.createSeriesRange(this.map.getKey(range["series"]));
                                delete (range["series"]);
                                config.axisRanges[i].config = range;
                            }
                        }
                    }
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Ordering function used in JSON setup.
     *
     * @param a  Item A
     * @param b  Item B
     * @return Order
     */
    Axis.prototype.configOrder = function (a, b) {
        if (a == b) {
            return 0;
        }
        // last
        else if (a == "title") {
            return 1;
        }
        else if (b == "title") {
            return -1;
        }
        // first
        else if (a == "component") {
            return -1;
        }
        else if (b == "component") {
            return 1;
        }
        else {
            return _super.prototype.configOrder.call(this, a, b);
        }
    };
    Object.defineProperty(Axis.prototype, "startLocation", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("startLocation");
        },
        /**
         * Axis start location. Works on Date/Category axis, doesn't work on Value axis.
         *
         * * 0 - Full first cell is shown.
         * * 0.5 - Half of first cell is shown.
         * * 1 - None of the first cell is visible. (you probably don't want that)
         *
         * @param value Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("startLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "endLocation", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("endLocation");
        },
        /**
         * Axis end location. Works on Date/Category axis, doesn't work on Value axis.
         *
         * * 0 - None of the last cell is shown. (don't do that)
         * * 0.5 - Half of the last cell is shown.
         * * 1 - Full last cell is shown.
         *
         * @param value Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("endLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Axis.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (this.renderer) {
            this.renderer.gridContainer.disabled = value;
        }
        return changed;
    };
    Object.defineProperty(Axis.prototype, "title", {
        /**
         * @return Title label
         */
        get: function () {
            return this._title;
        },
        /**
         * A reference to a [[Label]] element which serves as a title to the axis.
         *
         * When axis is created it aleready has an element, so you can just modify
         * it.
         *
         * Or you can replace it with your own instance of `Label`.
         *
         * @param  value  Title label
         */
        set: function (value) {
            if (this._title && this._title != value) {
                this._title.dispose();
            }
            if (value) {
                this._title = value;
                value.parent = this;
                value.shouldClone = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "hideTooltipWhileZooming", {
        /**
         * @return Hide tooltip while zooming?
         */
        get: function () {
            return this.getPropertyValue("hideTooltipWhileZooming");
        },
        /**
         * Indicates if axis' tooltip should be hidden while axis range is animating
         * (zooming)
         *
         * @default true
         * @since 4.7.16
         * @param  value  Hide tooltip while zooming?
         */
        set: function (value) {
            this.setPropertyValue("hideTooltipWhileZooming", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "zoomable", {
        /**
         * @return Zoomable?
         */
        get: function () {
            return this.getPropertyValue("zoomable");
        },
        /**
         * Should the axis be zoomed with scrollbar/cursor?
         *
         * @default true
         * @since 4.9.28
         * @param  value  Zoomable?
         */
        set: function (value) {
            this.setPropertyValue("zoomable", value);
        },
        enumerable: true,
        configurable: true
    });
    return Axis;
}(Component));
export { Axis };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Axis"] = Axis;
registry.registeredClasses["AxisDataItem"] = AxisDataItem;
/**
 * Add default responsive rules
 */
/**
 * Disable axis tooltips.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.maybeXS,
    state: function (target, stateId) {
        if (target instanceof Axis && target.tooltip) {
            var state = target.states.create(stateId);
            state.properties.cursorTooltipEnabled = false;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=Axis.js.map