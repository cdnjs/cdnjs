/**
 * Defines Percent Chart Series.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem } from "./Series";
import { Sprite } from "../../core/Sprite";
import { Label } from "../../core/elements/Label";
import { Color } from "../../core/utils/Color";
import { Tick } from "../elements/Tick";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { Container } from "../../core/Container";
import { ColorSet } from "../../core/utils/ColorSet";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $ease from "../../core/utils/Ease";
import * as $type from "../../core/utils/Type";
import { Disposer } from "../../core/utils/Disposer";
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
//@todo: sequenced?
/**
 * Defines a [[DataItem]] for [[PercentSeries]].
 *
 * @see {@link DataItem}
 */
var PercentSeriesDataItem = /** @class */ (function (_super) {
    __extends(PercentSeriesDataItem, _super);
    /**
     * Constructor
     */
    function PercentSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PercentSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    /**
     * Adds an `id` attribute the the slice element and returns its id.
     *
     * @ignore Exclude from docs
     */
    PercentSeriesDataItem.prototype.uidAttr = function () {
        return this.slice.uidAttr();
    };
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    PercentSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        if (!fields) {
            fields = ["value"];
        }
        return _super.prototype.hide.call(this, duration, delay, 0, fields);
    };
    /**
     * Sets visibility of the Data Item.
     *
     * @param value Data Item
     */
    PercentSeriesDataItem.prototype.setVisibility = function (value, noChangeValues) {
        if (!noChangeValues) {
            if (value) {
                this.setWorkingValue("value", this.values["value"].value, 0, 0);
            }
            else {
                this.setWorkingValue("value", 0, 0, 0);
            }
        }
        _super.prototype.setVisibility.call(this, value, noChangeValues);
    };
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    PercentSeriesDataItem.prototype.show = function (duration, delay, fields) {
        if (!fields) {
            fields = ["value"];
        }
        return _super.prototype.show.call(this, duration, delay, fields);
    };
    Object.defineProperty(PercentSeriesDataItem.prototype, "category", {
        /**
         * @return Category
         */
        get: function () {
            return this.properties.category;
        },
        /**
         * Category.
         *
         * @param value  Category
         */
        set: function (value) {
            this.setProperty("category", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a marker used in the legend for this slice.
     *
     * @ignore Exclude from docs
     * @param marker  Marker container
     */
    PercentSeriesDataItem.prototype.createLegendMarker = function (marker) {
        this.component.createLegendMarker(marker, this);
    };
    Object.defineProperty(PercentSeriesDataItem.prototype, "legendDataItem", {
        /**
         * @return Legend data item
         */
        get: function () {
            return this._legendDataItem;
        },
        /**
         * A legend's data item, that corresponds to this data item.
         *
         * @param value  Legend data item
         */
        set: function (value) {
            this._legendDataItem = value;
            if (value.label) {
                value.label.dataItem = this;
            }
            if (value.valueLabel) {
                value.valueLabel.dataItem = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "tick", {
        /**
         * A Tick element, related to this data item. (slice)
         *
         * @readonly
         * @return Tick element
         */
        get: function () {
            var _this = this;
            if (!this._tick) {
                var tick_1 = this.component.ticks.create();
                this._tick = tick_1;
                this.addSprite(tick_1);
                this._disposers.push(tick_1);
                tick_1.parent = this.component.ticksContainer;
                this._disposers.push(new Disposer(function () {
                    if (_this.component) {
                        _this.component.ticks.removeValue(tick_1);
                    }
                }));
                tick_1.visible = this.visible;
            }
            return this._tick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "label", {
        /**
         * A Label element, related to this data item. (slice)
         *
         * @readonly
         * @return Label element
         */
        get: function () {
            var _this = this;
            if (!this._label) {
                var label_1 = this.component.labels.create();
                this.addSprite(label_1);
                this._label = label_1;
                this._disposers.push(label_1);
                label_1.parent = this.component.labelsContainer;
                this._disposers.push(new Disposer(function () {
                    if (_this.component) {
                        _this.component.labels.removeValue(label_1);
                    }
                }));
                label_1.visible = this.visible;
            }
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "slice", {
        /**
         * An element, related to this data item. (slice)
         *
         * @readonly
         * @return Slice element
         */
        get: function () {
            var _this = this;
            if (!this._slice) {
                var component_1 = this.component;
                var slice_1 = component_1.slices.create();
                this.addSprite(slice_1);
                this._slice = slice_1;
                this._disposers.push(slice_1);
                slice_1.parent = component_1.slicesContainer;
                this._disposers.push(new Disposer(function () {
                    component_1.slices.removeValue(slice_1);
                }));
                slice_1.visible = this.visible;
                // Apply accessibility
                if (component_1.itemsFocusable()) {
                    if (!$type.hasValue(this.component.role)) {
                        this.component.role = "menu";
                    }
                    if (!$type.hasValue(slice_1.role)) {
                        slice_1.role = "menuitem";
                    }
                    slice_1.focusable = true;
                }
                else {
                    if (!$type.hasValue(this.component.role)) {
                        this.component.role = "list";
                    }
                    if (!$type.hasValue(slice_1.role)) {
                        slice_1.role = "listitem";
                    }
                    slice_1.focusable = false;
                }
                // Apply screen reader label
                if (slice_1.focusable) {
                    slice_1.events.on("focus", function (ev) {
                        slice_1.readerTitle = component_1.populateString(component_1.itemReaderText, _this);
                    }, undefined, false);
                    slice_1.events.on("blur", function (ev) {
                        slice_1.readerTitle = "";
                    }, undefined, false);
                }
                if (slice_1.hoverable) {
                    slice_1.events.on("over", function (ev) {
                        slice_1.readerTitle = component_1.populateString(component_1.itemReaderText, _this);
                    }, undefined, false);
                    slice_1.events.on("out", function (ev) {
                        slice_1.readerTitle = "";
                    }, undefined, false);
                }
            }
            return this._slice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "hiddenInLegend", {
        /**
         * @return Disabled in legend?
         */
        get: function () {
            return this.properties.hiddenInLegend;
        },
        /**
         * Should dataItem (slice) be hidden in legend?
         *
         * @param value Visible in legend?
         */
        set: function (value) {
            this.setProperty("hiddenInLegend", value);
        },
        enumerable: true,
        configurable: true
    });
    return PercentSeriesDataItem;
}(SeriesDataItem));
export { PercentSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[PercentSeries]] which is a base class for [[PieSeries]],
 * [[FunnelSeries]], and [[PyramidSeries]].
 *
 * @see {@link IPercentSeriesEvents} for a list of available Events
 * @see {@link IPercentSeriesAdapters} for a list of available Adapters
 */
var PercentSeries = /** @class */ (function (_super) {
    __extends(PercentSeries, _super);
    /**
     * Constructor
     */
    function PercentSeries() {
        var _this = _super.call(this) || this;
        _this.className = "PercentSeries";
        _this._addAllDataItems = false;
        _this.colors = new ColorSet();
        _this.colors.step = 1;
        _this.isMeasured = true;
        _this.calculatePercent = true;
        var slicesContainer = _this.createChild(Container);
        slicesContainer.shouldClone = false;
        slicesContainer.isMeasured = false;
        _this.slicesContainer = slicesContainer;
        var ticksContainer = _this.createChild(Container);
        ticksContainer.shouldClone = false;
        ticksContainer.isMeasured = false;
        ticksContainer.layout = "none";
        _this.ticksContainer = ticksContainer;
        var labelsContainer = _this.createChild(Container);
        labelsContainer.shouldClone = false;
        labelsContainer.isMeasured = false;
        labelsContainer.layout = "none";
        _this.labelsContainer = labelsContainer;
        _this.alignLabels = false;
        _this.bulletsContainer.toFront();
        // Make all slices focusable
        _this.skipFocusThreshold = 50;
        var defaultState = _this.defaultState;
        defaultState.transitionEasing = $ease.sinOut;
        // Accessibility
        _this.itemReaderText = "{category}: {value.percent.formatNumber('#.#p')}";
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates a slice element.
     *
     * @return Slice
     */
    PercentSeries.prototype.createSlice = function () {
        return new Sprite();
    };
    /**
     * Creates a tick element.
     *
     * @return Tick
     */
    PercentSeries.prototype.createTick = function () {
        return new Tick();
    };
    /**
     * Sreates label element.
     *
     * @return label
     */
    PercentSeries.prototype.createLabel = function () {
        return new Label();
    };
    Object.defineProperty(PercentSeries.prototype, "slices", {
        /**
         * A list of slice elements for the series.
         *
         * Use its `template` to configure look and behavior of the slices. E.g.:
         *
         * ```TypeScript
         * series.slices.template.stroke = am4core.color("#fff");
         * series.slices.template.strokeWidth = 2;
         * ```
         * ```JavaScript
         * series.slices.template.stroke = am4core.color("#fff");
         * series.slices.template.strokeWidth = 2;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "slices": {
         *       "stroke": "#fff",
         *       "strokeWidth": 2
         *     }
         *   }]
         * }
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/list-templates/} for more information about list templates
         * @return Slices
         */
        get: function () {
            if (!this._slices) {
                var slice = this.createSlice();
                slice.applyOnClones = true;
                this._disposers.push(slice);
                this.initSlice(slice);
                this._slices = new ListTemplate(slice);
                this._disposers.push(new ListDisposer(this._slices));
            }
            return this._slices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeries.prototype, "ticks", {
        /**
         * A list of tick elements for the series. Ticks connect slice to its label.
         *
         * Use its `template` to configure look and behavior of the ticks. E.g.:
         *
         * ```TypeScript
         * series.ticks.template.strokeWidth = 2;
         * ```
         * ```JavaScript
         * series.ticks.template.strokeWidth = 2;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "ticks": {
         *       "strokeWidth": 2
         *     }
         *   }]
         * }
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/list-templates/} for more information about list templates
         * @return Ticks
         */
        get: function () {
            if (!this._ticks) {
                var tick = this.createTick();
                tick.applyOnClones = true;
                this._disposers.push(tick);
                this.initTick(tick);
                this._ticks = new ListTemplate(tick);
                this._disposers.push(new ListDisposer(this._ticks));
            }
            return this._ticks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeries.prototype, "labels", {
        /**
         * A list of slice label elements for the series.
         *
         * Use its `template` to configure look and behavior of the labels. E.g.:
         *
         * ```TypeScript
         * series.labels.template.fill = am4core.color("#c00");
         * series.labels.template.fontSize = 20;
         * ```
         * ```JavaScript
         * series.labels.template.fill = am4core.color("#c00");
         * series.labels.template.fontSize = 20;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "labels": {
         *       "stroke": "#c00",
         *       "fontSize": 20
         *     }
         *   }]
         * }
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/list-templates/} for more information about list templates
         * @return Labels
         */
        get: function () {
            if (!this._labels) {
                var label = this.createLabel();
                label.applyOnClones = true;
                this._disposers.push(label);
                this.initLabel(label);
                this._labels = new ListTemplate(label);
                this._disposers.push(new ListDisposer(this._labels));
            }
            return this._labels;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    PercentSeries.prototype.createDataItem = function () {
        return new PercentSeriesDataItem();
    };
    /**
     * Creates and returns a new slice element.
     *
     * @param sliceType  Type of the slice element
     * @return Slice
     */
    PercentSeries.prototype.initSlice = function (slice) {
    };
    PercentSeries.prototype.initLabel = function (label) {
        label.text = "{category}: {value.percent.formatNumber('#.0p')}";
        label.isMeasured = false;
        label.padding(5, 5, 5, 5);
    };
    PercentSeries.prototype.initTick = function (label) {
    };
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    PercentSeries.prototype.validateDataItems = function () {
        this.colors.reset();
        if (this.patterns) {
            this.patterns.reset();
        }
        _super.prototype.validateDataItems.call(this);
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    PercentSeries.prototype.validateDataElement = function (dataItem) {
        var slice = dataItem.slice;
        if (slice) {
            if (slice.fill == undefined) {
                if (this.patterns) {
                    if (!$type.hasValue(slice.stroke)) {
                        slice.stroke = this.colors.next();
                    }
                    slice.fill = this.patterns.next();
                    if ($type.hasValue(slice.fillOpacity)) {
                        slice.fill.backgroundOpacity = slice.fillOpacity;
                    }
                    if (slice.stroke instanceof Color) {
                        slice.fill.stroke = slice.stroke;
                        slice.fill.fill = slice.stroke;
                    }
                }
                else {
                    slice.fill = this.colors.next();
                }
            }
            else {
                this.colors.currentStep += this.colors.step;
            }
            if (slice.stroke == undefined) {
                slice.stroke = slice.fill;
            }
        }
        // do this at the end, otherwise bullets won't be positioned properly
        _super.prototype.validateDataElement.call(this, dataItem);
        if (slice) {
            dataItem.bullets.each(function (key, bullet) {
                if (bullet.fill == undefined) {
                    bullet.fill = slice.fill;
                }
                if (bullet.stroke == undefined) {
                    bullet.stroke = slice.stroke;
                }
            });
        }
        this.updateLegendValue(dataItem);
    };
    /**
     * Validates (processes) data.
     *
     * @ignore Exclude from docs
     */
    PercentSeries.prototype.validateData = function () {
        _super.prototype.validateData.call(this);
        if (this.chart) {
            this.chart.feedLegend();
        }
    };
    /**
     * Arranges slice labels according to position settings.
     *
     * @ignore Exclude from docs
     * @param dataItems  Data items
     */
    PercentSeries.prototype.arrangeLabels = function (dataItems) {
        for (var i = 0, len = dataItems.length; i < len; i++) {
            var dataItem = dataItems[i];
            var label = dataItem.label;
            if (label) {
                if (label.invalid) {
                    label.validate();
                }
                var lh = label.measuredHeight;
                if (!label.visible) {
                    lh = 0;
                }
                if (label.pixelY - lh / 2 < -this.maxHeight / 2) {
                    label.y = -this.maxHeight / 2 + lh / 2;
                }
                var nextLabel = this.getNextLabel(i + 1, dataItems);
                var bottom = label.pixelY + lh / 2;
                if (nextLabel) {
                    if (nextLabel.invalid) {
                        nextLabel.validate();
                    }
                    var nextLabelHeight = nextLabel.measuredHeight;
                    if (!nextLabel.visible) {
                        nextLabelHeight = 0;
                    }
                    var nextLabelY = nextLabel.pixelY;
                    if (nextLabelY == null) {
                        nextLabelY = 0;
                    }
                    if (nextLabelY - nextLabelHeight / 2 < bottom) {
                        nextLabel.y = bottom + nextLabelHeight / 2;
                    }
                }
            }
        }
    };
    PercentSeries.prototype.arrangeLabels2 = function (dataItems) {
        var previousTop = this.maxHeight / 2;
        for (var i = dataItems.length - 1; i >= 0; i--) {
            var dataItem = dataItems[i];
            var label = dataItem.label;
            if (label) {
                if (label.invalid) {
                    label.validate();
                }
                var lh = label.measuredHeight;
                if (!label.visible) {
                    lh = 0;
                }
                //if (i == dataItems.length - 1) {
                //previousTop += lh / 2;
                //}
                if (label.pixelY + lh / 2 > previousTop) {
                    label.y = previousTop - lh / 2;
                    previousTop = label.y - lh / 2;
                }
            }
        }
    };
    /**
     * Returns the next label according to `index`.
     *
     * @param index      Current index
     * @param dataItems  Data items
     * @return Label element
     */
    PercentSeries.prototype.getNextLabel = function (index, dataItems) {
        if (dataItems.length >= index) {
            var nextDataItem = dataItems[index];
            if (nextDataItem) {
                if (nextDataItem.label) {
                    if (nextDataItem.visible) {
                        return nextDataItem.label;
                    }
                    else {
                        return this.getNextLabel(index + 1, dataItems);
                    }
                }
                else {
                    return this.getNextLabel(index + 1, dataItems);
                }
            }
        }
    };
    Object.defineProperty(PercentSeries.prototype, "colors", {
        /**
         * @return Color set
         */
        get: function () {
            return this.getPropertyValue("colors");
        },
        /**
         * A color set to be used for slices.
         *
         * For each new subsequent slice, the chart will assign the next color in
         * this set.
         *
         * @param value  Color set
         */
        set: function (value) {
            this.setPropertyValue("colors", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeries.prototype, "patterns", {
        /**
         * @return Pattern set
         */
        get: function () {
            return this.getPropertyValue("patterns");
        },
        /**
         * A [[PatternSet]] to use when creating patterned fills for slices.
         *
         * @since 4.7.5
         * @param value  Pattern set
         */
        set: function (value) {
            this.setPropertyValue("patterns", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param marker    Container
     * @param dataItem  Data item
     */
    PercentSeries.prototype.createLegendMarker = function (marker, dataItem) {
        $iter.each(marker.children.iterator(), function (child) {
            var slice = dataItem.slice;
            child.defaultState.properties.fill = slice.fill;
            child.defaultState.properties.stroke = slice.stroke;
            child.defaultState.properties.fillOpacity = slice.fillOpacity;
            child.defaultState.properties.strokeOpacity = slice.strokeOpacity;
            child.fill = slice.fill;
            child.stroke = slice.stroke;
            child.fillOpacity = slice.fillOpacity;
            child.strokeOpacity = slice.strokeOpacity;
            if (child.fill == undefined) {
                child.__disabled = true;
            }
            var legendDataItem = marker.dataItem;
            legendDataItem.color = slice.fill;
            legendDataItem.colorOrig = slice.fill;
            child.addDisposer(slice.events.on("propertychanged", function (ev) {
                if (ev.property == "fill") {
                    child.__disabled = false;
                    if (!child.isActive) {
                        child.fill = slice.fill;
                    }
                    child.defaultState.properties.fill = slice.fill;
                    legendDataItem.color = slice.fill;
                    legendDataItem.colorOrig = slice.fill;
                }
                if (ev.property == "stroke") {
                    if (!child.isActive) {
                        child.stroke = slice.stroke;
                    }
                    child.defaultState.properties.stroke = slice.stroke;
                }
                if (ev.property == "strokeOpacity") {
                    if (!child.isActive) {
                        child.strokeOpacity = slice.strokeOpacity;
                    }
                    child.defaultState.properties.strokeOpacity = slice.strokeOpacity;
                }
            }, undefined, false));
        });
    };
    /**
     * Repositions bullets when slice's size changes.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    PercentSeries.prototype.handleSliceScale = function (event) {
        var _this = this;
        var slice = event.target;
        var dataItem = slice.dataItem;
        if (dataItem && dataItem.bullets) {
            $iter.each(dataItem.bullets.iterator(), function (a) {
                var value = a[1];
                _this.positionBullet(value);
            });
        }
    };
    /**
     * Repositions bullet and labels when slice moves.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    PercentSeries.prototype.handleSliceMove = function (event) {
    };
    /**
     * Copies all properties from another instance of [[PercentSeries]].
     *
     * @param source  Source series
     */
    PercentSeries.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.slices.template.copyFrom(source.slices.template);
        this.labels.template.copyFrom(source.labels.template);
        this.ticks.template.copyFrom(source.ticks.template);
        this.colors = source.colors.clone();
    };
    Object.defineProperty(PercentSeries.prototype, "alignLabels", {
        /**
         * @return Align labels?
         */
        get: function () {
            return this.getPropertyValue("alignLabels");
        },
        /**
         * Align labels into nice vertical columns?
         *
         * This will ensure that labels never overlap with each other.
         *
         * Arranging labels into columns makes them more readble, and better user
         * experience.
         *
         * If set to `false` labels will be positioned at `label.radius` distance,
         * and may, in some cases, overlap.
         *
         * @default true
         * @param value  Align labels?
         */
        set: function (value) {
            this.setAlignLabels(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    PercentSeries.prototype.setAlignLabels = function (value) {
        this.setPropertyValue("alignLabels", value, true);
    };
    Object.defineProperty(PercentSeries.prototype, "ignoreZeroValues", {
        /**
         * @return Ignore zero values
         */
        get: function () {
            return this.getPropertyValue("ignoreZeroValues");
        },
        /**
         * If set to `true` the chart will not show slices with zero values.
         *
         * @default false
         * @since 4.7.9
         * @param  value  Ignore zero values
         */
        set: function (value) {
            this.setPropertyValue("ignoreZeroValues", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates corresponding legend data item with current values.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    PercentSeries.prototype.updateLegendValue = function (dataItem) {
        if (dataItem) {
            var legendDataItem = dataItem.legendDataItem;
            var legendSettings = dataItem.legendSettings;
            if (legendDataItem && legendSettings) {
                if (legendSettings) {
                    if (legendSettings.labelText) {
                        legendDataItem.label.text = legendSettings.labelText;
                    }
                    if (legendSettings.itemLabelText) {
                        legendDataItem.label.text = legendSettings.itemLabelText;
                    }
                    if (legendSettings.valueText) {
                        legendDataItem.valueLabel.text = legendSettings.valueText;
                    }
                    if (legendSettings.itemValueText) {
                        legendDataItem.valueLabel.text = legendSettings.itemValueText;
                    }
                }
            }
        }
    };
    return PercentSeries;
}(Series));
export { PercentSeries };
/**
 * bboxter class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PercentSeries"] = PercentSeries;
registry.registeredClasses["PercentSeriesDataItem"] = PercentSeriesDataItem;
/**
 * Add default responsive rules
 */
/**
 * Disable labels and ticks.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.maybeXS,
    state: function (target, stateId) {
        if (target instanceof PercentSeries) {
            var state = target.states.create(stateId);
            var labelState = target.labels.template.states.create(stateId);
            labelState.properties.disabled = true;
            var tickState = target.ticks.template.states.create(stateId);
            tickState.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=PercentSeries.js.map