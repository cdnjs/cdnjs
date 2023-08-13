/**
 * Legend-related functionality.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component } from "../core/Component";
import { DataItem } from "../core/DataItem";
import { ListTemplate, ListDisposer } from "../core/utils/List";
import { RoundedRectangle } from "../core/elements/RoundedRectangle";
import { Container } from "../core/Container";
import { Label } from "../core/elements/Label";
import { keyboard } from "../core/utils/Keyboard";
import { registry } from "../core/Registry";
import { getInteraction } from "../core/interaction/Interaction";
import { percent, Percent } from "../core/utils/Percent";
import { InterfaceColorSet } from "../core/utils/InterfaceColorSet";
import * as $utils from "../core/utils/Utils";
import * as $type from "../core/utils/Type";
import * as $math from "../core/utils/Math";
import { Sprite } from "../core/Sprite";
import { Disposer } from "../core/utils/Disposer";
import { MouseCursorStyle } from "../core/interaction/Mouse";
import { defaultRules, ResponsiveBreakpoints } from "../core/utils/Responsive";
import { Scrollbar } from "../core/elements/Scrollbar";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Legend]].
 *
 * @see {@link DataItem}
 */
var LegendDataItem = /** @class */ (function (_super) {
    __extends(LegendDataItem, _super);
    /**
     * Constructor
     */
    function LegendDataItem() {
        var _this = _super.call(this) || this;
        /**
         * @ignore
         */
        _this.childrenCreated = false;
        _this.className = "LegendDataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(LegendDataItem.prototype, "label", {
        /**
         * A legend item's [[Label]] element.
         *
         * @return Label
         */
        get: function () {
            var _this = this;
            if (!this._label) {
                var label_1 = this.component.labels.create();
                this._label = label_1;
                this.addSprite(label_1);
                this._disposers.push(label_1);
                label_1.parent = this.itemContainer;
                this._disposers.push(new Disposer(function () {
                    if ($type.hasValue(_this.component)) {
                        _this.component.labels.removeValue(label_1);
                    }
                }));
            }
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LegendDataItem.prototype, "color", {
        /**
         * @return Main color
         */
        get: function () {
            return this.properties.color;
        },
        /**
         * Main color of legend data item.
         *
         * This is set by the target element this legend item represents, like
         * a Series or a Slice.
         *
         * It can be used to derive a color in legend's sub-items, like label:
         *
         * ```TypeScript
         * chart.legend.labels.template.text = "[{color}]{name}[/]";
         * ```
         * ```JavaScript
         * chart.legend.labels.template.text = "[{color}]{name}[/]";
         * ```
         * ```JSON
         * {
         *   // ...
         *   "legend": {
         *     // ...
         *     "labels": {
         *       "text": "[{color}]{name}[/]"
         *     }
         *   }
         * }
         * ```
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/#Legend_labels} For more information about configuring legend labels.
         * @param value  Main color
         */
        set: function (value) {
            this.setProperty("color", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LegendDataItem.prototype, "valueLabel", {
        /**
         * A legend item's [[Label]] element for "value label".
         *
         * @return Label
         */
        get: function () {
            var _this = this;
            if (!this._valueLabel) {
                var valueLabel_1 = this.component.valueLabels.create();
                this._valueLabel = valueLabel_1;
                this.addSprite(valueLabel_1);
                this._disposers.push(valueLabel_1);
                valueLabel_1.parent = this.itemContainer;
                this._disposers.push(new Disposer(function () {
                    if ($type.hasValue(_this.component)) {
                        _this.component.valueLabels.removeValue(valueLabel_1);
                    }
                }));
            }
            return this._valueLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LegendDataItem.prototype, "itemContainer", {
        /**
         * A reference to the main [[Container]] that holds legend item's elements:
         * marker and labels.
         *
         * @return Item container
         */
        get: function () {
            var _this = this;
            if (!this._itemContainer) {
                var component_1 = this.component;
                var itemContainer_1 = component_1.itemContainers.create();
                itemContainer_1.parent = component_1;
                this._itemContainer = itemContainer_1;
                this.addSprite(itemContainer_1);
                this._disposers.push(itemContainer_1);
                // Add click/tap event to toggle item
                if (itemContainer_1.togglable) {
                    itemContainer_1.events.on("toggled", function (ev) {
                        component_1.toggleDataItem(ev.target.dataItem);
                    }, undefined, false);
                }
                // Add focus event so that we can track which object is currently in focus
                // for keyboard toggling
                if (itemContainer_1.focusable) {
                    itemContainer_1.events.on("hit", function (ev) {
                        // We need this here in order to reset focused item when it is clicked
                        // normally so that it is not toggled by ENTER afterwards
                        component_1.focusedItem = undefined;
                    }, undefined, false);
                    itemContainer_1.events.on("focus", function (ev) {
                        component_1.focusedItem = ev.target.dataItem;
                    }, undefined, false);
                    itemContainer_1.events.on("blur", function (ev) {
                        component_1.focusedItem = undefined;
                    }, undefined, false);
                }
                this._disposers.push(new Disposer(function () {
                    if ($type.hasValue(_this.component)) {
                        _this.component.itemContainers.removeValue(itemContainer_1);
                    }
                }));
                if (this.dataContext.uidAttr) {
                    itemContainer_1.readerControls = this.dataContext.uidAttr();
                    itemContainer_1.readerLabelledBy = this.dataContext.uidAttr();
                }
                var sprite = this.dataContext;
                if ((sprite instanceof DataItem || sprite instanceof Sprite) && !sprite.isDisposed()) {
                    var visibilitychanged = function (ev) {
                        itemContainer_1.readerChecked = ev.visible;
                        itemContainer_1.events.disableType("toggled");
                        itemContainer_1.isActive = !ev.visible;
                        itemContainer_1.events.enableType("toggled");
                    };
                    sprite.addDisposer(new Disposer(function () {
                        if (_this.component) {
                            _this.component.dataItems.remove(_this);
                        }
                    }));
                    if (sprite instanceof Sprite) {
                        itemContainer_1.addDisposer(sprite.events.on("visibilitychanged", visibilitychanged, undefined, false));
                        itemContainer_1.addDisposer(sprite.events.on("hidden", function (ev) {
                            itemContainer_1.readerChecked = false;
                            itemContainer_1.events.disableType("toggled");
                            itemContainer_1.isActive = true;
                            itemContainer_1.events.enableType("toggled");
                        }, undefined, false));
                        itemContainer_1.addDisposer(sprite.events.on("shown", function (ev) {
                            itemContainer_1.readerChecked = true;
                            itemContainer_1.events.disableType("toggled");
                            itemContainer_1.isActive = false;
                            itemContainer_1.events.enableType("toggled");
                        }, undefined, false));
                    }
                    else {
                        itemContainer_1.addDisposer(sprite.events.on("visibilitychanged", visibilitychanged, undefined, false));
                    }
                }
            }
            return this._itemContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LegendDataItem.prototype, "marker", {
        /**
         * A [[Container]] that holds legend item's marker element.
         *
         * @return Marker
         */
        get: function () {
            var _this = this;
            if (!this._marker) {
                var marker_1 = this.component.markers.create();
                this._marker = marker_1;
                marker_1.parent = this.itemContainer;
                this.addSprite(marker_1);
                this._disposers.push(marker_1);
                this._disposers.push(new Disposer(function () {
                    if ($type.hasValue(_this.component)) {
                        _this.component.markers.removeValue(marker_1);
                    }
                }));
            }
            return this._marker;
        },
        enumerable: true,
        configurable: true
    });
    return LegendDataItem;
}(DataItem));
export { LegendDataItem };
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines a class that carries legend settings.
 *
 * A legend might change its settings dynamically. Legend can also be shared
 * by several elements, requiring different settings.
 *
 * Having legend's settings in a separate object is a good way to "hot swap"
 * a set of settings for the legend.
 */
var LegendSettings = /** @class */ (function () {
    function LegendSettings() {
        /**
         * Should marker be created for each legend item.
         */
        this.createMarker = true;
    }
    return LegendSettings;
}());
export { LegendSettings };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * [[Legend]] class is used to create legend for the chart.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/} for Legend documentation
 * @see {@link ILegendEvents} for a list of available events
 * @see {@link ILegendAdapters} for a list of available Adapters
 */
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    /**
     * Constructor
     */
    function Legend() {
        var _this = _super.call(this) || this;
        _this.className = "Legend";
        // Set defaults
        _this.layout = "grid";
        _this.setPropertyValue("useDefaultMarker", false);
        _this.setPropertyValue("scrollable", false);
        _this.setPropertyValue("contentAlign", "center");
        // Create a template container and list for legend items
        var itemContainer = new Container();
        itemContainer.applyOnClones = true;
        itemContainer.padding(8, 0, 8, 0);
        itemContainer.margin(0, 10, 0, 10);
        itemContainer.layout = "horizontal";
        itemContainer.clickable = true;
        itemContainer.focusable = true;
        itemContainer.role = "switch";
        itemContainer.togglable = true;
        itemContainer.cursorOverStyle = MouseCursorStyle.pointer;
        itemContainer.background.fillOpacity = 0; // creates hit area
        // Create container list using item template we just created
        _this.itemContainers = new ListTemplate(itemContainer);
        _this._disposers.push(new ListDisposer(_this.itemContainers));
        _this._disposers.push(_this.itemContainers.template);
        // Set up global keyboard events for toggling elements
        _this._disposers.push(getInteraction().body.events.on("keyup", function (ev) {
            if (keyboard.isKey(ev.event, "enter") && _this.focusedItem) {
                var focusedItem = _this.focusedItem;
                var target = focusedItem.itemContainer;
                if (target.togglable) {
                    _this.toggleDataItem(focusedItem);
                }
                else if (target.clickable && target.events.isEnabled("hit")) {
                    target.dispatchImmediately("hit", { event: ev });
                    // We need this here because "hit" event resets `this.focusedItem`
                    // And we need it here
                    _this.focusedItem = focusedItem;
                }
            }
        }, _this));
        var interfaceColors = new InterfaceColorSet();
        // Create a template container and list for the a marker
        var marker = new Container();
        marker.width = 23;
        marker.height = 23;
        marker.interactionsEnabled = false;
        marker.applyOnClones = true;
        marker.setStateOnChildren = true;
        marker.background.fillOpacity = 0;
        marker.background.strokeOpacity = 0;
        marker.propertyFields.fill = "fill";
        marker.valign = "middle";
        var disabledColor = interfaceColors.getFor("disabledBackground");
        marker.events.on("childadded", function (event) {
            var child = event.newValue;
            var activeState = child.states.create("active");
            activeState.properties.stroke = disabledColor;
            activeState.properties.fill = disabledColor;
        });
        _this.markers = new ListTemplate(marker);
        _this._disposers.push(new ListDisposer(_this.markers));
        _this._disposers.push(_this.markers.template);
        // Create a legend background element
        var rectangle = marker.createChild(RoundedRectangle);
        rectangle.width = percent(100);
        rectangle.height = percent(100);
        rectangle.applyOnClones = true;
        rectangle.propertyFields.fill = "fill"; //othrwise old edge doesn't like as the same pattern is set both on parent and child https://codepen.io/team/amcharts/pen/72d7a98f3fb811d3118795220ff63182
        rectangle.strokeOpacity = 0;
        // Create a template container and list for item labels
        var label = new Label();
        label.text = "{name}";
        label.margin(0, 5, 0, 5);
        label.valign = "middle";
        label.applyOnClones = true;
        label.states.create("active").properties.fill = interfaceColors.getFor("disabledBackground");
        _this.labels = new ListTemplate(label);
        _this._disposers.push(new ListDisposer(_this.labels));
        _this._disposers.push(_this.labels.template);
        label.interactionsEnabled = false;
        label.truncate = true;
        label.fullWords = false;
        // Create a template container and list for item value labels
        var valueLabel = new Label();
        valueLabel.margin(0, 5, 0, 0);
        valueLabel.valign = "middle";
        valueLabel.width = 50; // to avoid rearranging legend entries when value changes.
        valueLabel.align = "right";
        valueLabel.textAlign = "end";
        valueLabel.applyOnClones = true;
        valueLabel.states.create("active").properties.fill = interfaceColors.getFor("disabledBackground");
        valueLabel.interactionsEnabled = false;
        _this.valueLabels = new ListTemplate(valueLabel);
        _this._disposers.push(new ListDisposer(_this.valueLabels));
        _this._disposers.push(_this.valueLabels.template);
        _this.position = "bottom"; // don't use setPropertyValue here!
        // Create a state for disabled legend items
        itemContainer.states.create("active");
        itemContainer.setStateOnChildren = true;
        // Apply accessibility settings
        _this.role = "group";
        _this.events.on("layoutvalidated", _this.handleScrollbar, _this, false);
        _this.events.on("parentset", function () {
            var parent = _this.parent;
            if (parent) {
                _this._disposers.push(parent.events.on("maxsizechanged", function () {
                    if (_this.scrollable) {
                        _this.setTimeout(function () {
                            _this.updateMasks();
                            _this.handleScrollbar();
                            _this._handleWheelReal(1);
                        }, 100);
                    }
                }));
            }
        });
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    Legend.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Legend");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    Legend.prototype.createDataItem = function () {
        return new LegendDataItem();
    };
    /**
     * [validateDataElements description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Legend.prototype.validateDataElements = function () {
        if (this.scrollbar) {
            this.scrollbar.start = 0;
            this.scrollbar.end = 1;
        }
        _super.prototype.validateDataElements.call(this);
    };
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     * @todo Description
     * @todo Figure out how to update appearance of legend item without losing focus
     * @todo Update legend marker appearance as apperance of related series changes
     */
    Legend.prototype.validateDataElement = function (dataItem) {
        _super.prototype.validateDataElement.call(this, dataItem);
        // Get data item (legend item's) container
        var container = dataItem.itemContainer;
        var marker = dataItem.marker;
        $utils.used(dataItem.label);
        var valueLabel = dataItem.valueLabel;
        // Set parent and update current state
        container.readerChecked = dataItem.dataContext.visible;
        // Tell series its legend data item
        dataItem.dataContext.legendDataItem = dataItem;
        var tempMaxWidth = dataItem.label.maxWidth;
        if (!(dataItem.label.width instanceof Percent)) {
            dataItem.label.width = undefined;
        }
        if (tempMaxWidth > 0) {
            dataItem.label.maxWidth = tempMaxWidth;
        }
        if (valueLabel.align == "right") {
            valueLabel.width = undefined;
        }
        var legendSettings = dataItem.dataContext.legendSettings;
        // If we are not using default markers, create a unique legend marker based
        // on the data item type
        var dataContext = dataItem.dataContext;
        if (dataContext.createLegendMarker && (!this.useDefaultMarker || !(dataContext instanceof Sprite))) {
            if (!dataItem.childrenCreated) {
                dataContext.createLegendMarker(marker);
                dataItem.childrenCreated = true;
            }
        }
        else {
            this.markers.template.propertyFields.fill = undefined;
        }
        if (dataContext.updateLegendValue) {
            dataContext.updateLegendValue(); // this solves issue with external legend, as legend is created after chart updates legend values
        }
        if (dataContext.component && dataContext.component.updateLegendValue) {
            dataContext.component.updateLegendValue(dataContext);
        }
        if (valueLabel.invalid) {
            valueLabel.validate();
        }
        if (valueLabel.text == "" || valueLabel.text == undefined) {
            valueLabel.__disabled = true;
        }
        else {
            valueLabel.__disabled = false;
        }
        if (legendSettings && (legendSettings.itemValueText != undefined || legendSettings.valueText != undefined)) {
            valueLabel.__disabled = false;
        }
        var visible = dataItem.dataContext.visible;
        if (visible === undefined) {
            visible = true;
        }
        visible = $type.toBoolean(visible);
        dataItem.dataContext.visible = visible;
        container.events.disableType("toggled");
        container.isActive = !visible;
        if (container.isActive) {
            container.setState("active", 0);
        }
        else {
            container.setState("default", 0);
        }
        container.events.enableType("toggled");
    };
    Legend.prototype.afterDraw = function () {
        var _this = this;
        var maxWidth = this.getPropertyValue("maxWidth");
        var maxLabelWidth = 0;
        this.labels.each(function (label) {
            if (label.invalid) {
                label.maxWidth = undefined;
                label.validate();
            }
            if (label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight > maxLabelWidth) {
                maxLabelWidth = label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight;
            }
        });
        var maxValueLabelWidth = 0;
        this.valueLabels.each(function (label) {
            if (label.invalid) {
                label.validate();
            }
            if (label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight > maxValueLabelWidth) {
                maxValueLabelWidth = label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight;
            }
        });
        var maxMarkerWidth = 0;
        this.markers.each(function (marker) {
            if (marker.invalid) {
                marker.validate();
            }
            if (marker.measuredWidth + marker.pixelMarginLeft + marker.pixelMarginRight > maxMarkerWidth) {
                maxMarkerWidth = marker.measuredWidth + marker.pixelMarginLeft + marker.pixelMarginRight;
            }
        });
        var itemContainer = this.itemContainers.template;
        var margin = itemContainer.pixelMarginRight + itemContainer.pixelMarginLeft;
        var maxAdjustedLabelWidth;
        var trueMaxWidth = maxLabelWidth + maxValueLabelWidth + maxMarkerWidth;
        if (!$type.isNumber(maxWidth)) {
            maxAdjustedLabelWidth = maxLabelWidth;
        }
        else {
            maxWidth = maxWidth - margin;
            if (maxWidth > trueMaxWidth) {
                maxWidth = trueMaxWidth;
            }
            maxAdjustedLabelWidth = maxWidth - maxMarkerWidth - maxValueLabelWidth;
        }
        this.labels.each(function (label) {
            if (_this.valueLabels.template.align == "right" || label.measuredWidth > maxAdjustedLabelWidth) {
                if (!(label.width instanceof Percent)) {
                    label.width = Math.min(label.maxWidth, maxAdjustedLabelWidth - label.pixelMarginLeft - label.pixelMarginRight);
                    label.maxWidth = label.width;
                }
            }
        });
        if (this.valueLabels.template.align == "right") {
            this.valueLabels.each(function (valueLabel) {
                valueLabel.width = maxValueLabelWidth - valueLabel.pixelMarginRight - valueLabel.pixelMarginLeft;
            });
        }
        _super.prototype.afterDraw.call(this);
    };
    Legend.prototype.handleScrollbar = function () {
        var scrollbar = this.scrollbar;
        if (this.scrollable && scrollbar) {
            var measuredHeight = this.maxHeight;
            scrollbar.height = measuredHeight;
            scrollbar.x = this.measuredWidth - scrollbar.pixelWidth - scrollbar.pixelMarginLeft;
            if (this.contentHeight > measuredHeight) {
                scrollbar.visible = true;
                scrollbar.thumb.height = scrollbar.height * measuredHeight / this.contentHeight;
                this.paddingRight = scrollbar.pixelWidth + scrollbar.pixelMarginLeft + scrollbar.pixelMarginRight;
            }
            else {
                scrollbar.thumb.height = scrollbar.height * measuredHeight / this.contentHeight;
                this.paddingRight = scrollbar.pixelWidth + scrollbar.pixelMarginLeft + scrollbar.pixelMarginRight;
                scrollbar.visible = false;
                scrollbar.start = 0;
                scrollbar.end = 1;
            }
            scrollbar.handleThumbPosition();
            this.updateMasks();
        }
    };
    Object.defineProperty(Legend.prototype, "position", {
        /**
         * @return Position
         */
        get: function () {
            return this.getPropertyValue("position");
        },
        /**
         * Position of the legend.
         *
         * Options: "left", "right", "top", "bottom" (default), or "absolute".
         *
         * IMPORTANT: [[MapChart]] will ignore this setting, as it is using different
         * layout structure than other charts.
         *
         * To position legend in [[MapChart]] set legend's `align` (`"left"` or
         * `"right"`) and `valign` (`"top"` or `"bottom"`) properties instead.
         *
         * @default "bottom"
         * @param value  Position
         */
        set: function (value) {
            if (this.setPropertyValue("position", value)) {
                if (value == "left" || value == "right") {
                    this.margin(10, 5, 10, 10);
                    this.valign = "middle";
                    this.contentAlign = "none";
                    this.valueLabels.template.align = "right";
                    if (!$type.isNumber(this.maxColumns)) {
                        this.maxColumns = 1;
                    }
                    this.width = undefined;
                    this.maxWidth = 220;
                }
                else {
                    this.maxColumns = undefined;
                    this.width = percent(100);
                    this.valueLabels.template.align = "left";
                }
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Legend.prototype, "useDefaultMarker", {
        /**
         * @return Use default marker?
         */
        get: function () {
            return this.getPropertyValue("useDefaultMarker");
        },
        /**
         * Should legend try to mirror the look of the related item when building
         * the marker for legend item?
         *
         * If set to `false` it will try to make the marker look like its related
         * item.
         *
         * E.g. if an item is for a Line Series, it will display a line of the
         * same thickness, color, and will use the same bullets if series have them.
         *
         * If set to `true`, all markers will be shown as squares, regardless of te
         * series type.
         *
         * @default false
         * @param value Use default marker?
         */
        set: function (value) {
            this.setPropertyValue("useDefaultMarker", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Legend.prototype, "scrollable", {
        /**
         * @return Legend Scrollable?
         */
        get: function () {
            return this.getPropertyValue("scrollable");
        },
        /**
         * If set to `true` the Legend will display a scrollbar if its contents do
         * not fit into its `maxHeight`.
         *
         * Please note that `maxHeight` is automatically set for Legend when its
         * `position` is set to `"left"` or `"right"`.
         *
         * @default false
         * @since 4.8.0
         * @param  value  Legend Scrollable?
         */
        set: function (value) {
            if (this.setPropertyValue("scrollable", value, true)) {
                if (value) {
                    var scrollbar = this.createChild(Scrollbar);
                    this.scrollbar = scrollbar;
                    scrollbar.isMeasured = false;
                    scrollbar.orientation = "vertical";
                    scrollbar.endGrip.__disabled = true;
                    scrollbar.startGrip.__disabled = true;
                    scrollbar.visible = false;
                    scrollbar.marginLeft = 5;
                    this._mouseWheelDisposer = this.events.on("wheel", this.handleWheel, this, false);
                    this._disposers.push(this._mouseWheelDisposer);
                    this._disposers.push(scrollbar.events.on("rangechanged", this.updateMasks, this, false));
                }
                else {
                    if (this._mouseWheelDisposer) {
                        this._mouseWheelDisposer.dispose();
                        if (this.scrollbar) {
                            this.scrollbar.dispose();
                            this.scrollbar = undefined;
                        }
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles mouse wheel scrolling of legend.
     *
     * @param  event  Event
     */
    Legend.prototype.handleWheel = function (event) {
        this._handleWheelReal(event.shift.y);
    };
    Legend.prototype._handleWheelReal = function (shift) {
        var scrollbar = this.scrollbar;
        if (scrollbar) {
            var ds = (shift / 1000 * this.measuredHeight / this.contentHeight);
            var delta = scrollbar.end - scrollbar.start;
            if (shift > 0) {
                scrollbar.start = $math.max(0, scrollbar.start - ds);
                scrollbar.end = scrollbar.start + delta;
            }
            else {
                scrollbar.end = $math.min(1, scrollbar.end - ds);
                scrollbar.start = scrollbar.end - delta;
            }
        }
    };
    /**
     * @ignore
     */
    Legend.prototype.updateMasks = function () {
        var _this = this;
        if (this.scrollbar) {
            this.itemContainers.each(function (itemContainer) {
                itemContainer.dy = -_this.scrollbar.thumb.pixelY * _this.contentHeight / _this.maxHeight;
                itemContainer.maskRectangle = { x: 0, y: -itemContainer.dy, width: _this.measuredWidth, height: _this.maxHeight };
            });
        }
        this.invalidatePosition();
    };
    /**
     * Toggles a legend item.
     *
     * @ignore Exclude from docs
     * @param item Legend item
     * @todo Maybe do it with togglable instead
     */
    Legend.prototype.toggleDataItem = function (item) {
        var dataContext = item.dataContext;
        if (!dataContext.visible || dataContext.isHiding || (dataContext instanceof Sprite && dataContext.isHidden)) {
            item.color = item.colorOrig;
            dataContext.appeared = true;
            item.itemContainer.isActive = false;
            if (dataContext.hidden === true) {
                dataContext.hidden = false;
            }
            if (dataContext.show) {
                dataContext.show();
            }
            else {
                dataContext.visible = true;
            }
            this.svgContainer.readerAlert(this.language.translate("%1 shown", this.language.locale, item.label.readerTitle));
        }
        else {
            item.itemContainer.isActive = true;
            dataContext.appeared = true;
            if (dataContext.hide) {
                dataContext.hide();
            }
            else {
                dataContext.visible = false;
            }
            this.svgContainer.readerAlert(this.language.translate("%1 hidden", this.language.locale, item.label.readerTitle));
            item.color = new InterfaceColorSet().getFor("disabledBackground");
        }
    };
    Object.defineProperty(Legend.prototype, "preloader", {
        /**
         * Override preloader method so that legend does not accidentally show its
         * own preloader.
         *
         * @ignore Exclude from docs
         * @return Always `undefined`
         */
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [handleDataItemPropertyChange description]
     *
     * @ignore Exclude from docs
     */
    Legend.prototype.handleDataItemPropertyChange = function (dataItem, name) {
        dataItem.valueLabel.invalidate();
        dataItem.label.invalidate();
    };
    return Legend;
}(Component));
export { Legend };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Legend"] = Legend;
/**
 * Add default responsive rules
 */
/**
 * Move legend to below the chart if chart is narrow
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.widthXS,
    state: function (target, stateId) {
        if (target instanceof Legend && (target.position == "left" || target.position == "right")) {
            var state = target.states.create(stateId);
            state.properties.position = "bottom";
            return state;
        }
        return null;
    }
});
/**
 * Move legend to the right if chart is very short
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.heightXS,
    state: function (target, stateId) {
        if (target instanceof Legend && (target.position == "top" || target.position == "bottom")) {
            var state = target.states.create(stateId);
            state.properties.position = "right";
            return state;
        }
        return null;
    }
});
/**
 * Disable legend altogether on small charts
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.isXS,
    state: function (target, stateId) {
        if (target instanceof Legend) {
            var state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=Legend.js.map