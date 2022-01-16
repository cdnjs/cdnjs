/**
 * ForceDirectedTree chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, SerialChartDataItem } from "../../charts/types/SerialChart";
import { ForceDirectedSeries } from "./ForceDirectedSeries";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
import { color } from "../../core/utils/Color";
import { percent } from "../../core/utils/Percent";
import * as $ease from "../../core/utils/Ease";
import * as $math from "../../core/utils/Math";
import { ZoomOutButton } from "../../core/elements/ZoomOutButton";
import { getInteraction } from "../../core/interaction/Interaction";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ForceDirectedTree]].
 *
 * @since 4.3.8
 * @see {@link DataItem}
 */
var ForceDirectedTreeDataItem = /** @class */ (function (_super) {
    __extends(ForceDirectedTreeDataItem, _super);
    function ForceDirectedTreeDataItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ForceDirectedTreeDataItem;
}(SerialChartDataItem));
export { ForceDirectedTreeDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A main class for [[ForceDirectedTree]] chart type.
 *
 * @see {@link IForceDirectedTreeEvents} for a list of available Events
 * @see {@link IForceDirectedTreeAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/force-directed/} For more information
 * @since 4.3.8
 * @important
 */
var ForceDirectedTree = /** @class */ (function (_super) {
    __extends(ForceDirectedTree, _super);
    /**
     * Constructor
     */
    function ForceDirectedTree() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Default duration of zoom animations (ms).
         */
        _this.zoomDuration = 1000;
        /**
         * Default zooming animation easing function.
         */
        _this.zoomEasing = $ease.cubicOut;
        /**
         * Smallest available zoom level. The chart will not allow to zoom out past
         * this setting.
         *
         * NOTE: Should be power of 2.
         *
         * @default 1
         */
        _this.minZoomLevel = 1;
        /**
         * Biggest available zoom level. The chart will not allow to zoom in past
         * this setting.
         *
         * NOTE: Should be power of 2.
         *
         * @default 32
         */
        _this.maxZoomLevel = 16;
        _this.className = "ForceDirectedTree";
        _this.seriesContainer.isMeasured = true;
        _this.seriesContainer.layout = "absolute";
        _this.mouseWheelBehavior = "none";
        _this.zoomStep = 2;
        _this.seriesContainer.background.fillOpacity = 0;
        _this.seriesContainer.background.fill = color("#ffffff");
        var zoomOutButton = _this.createChild(ZoomOutButton);
        zoomOutButton.shouldClone = false;
        zoomOutButton.x = percent(100);
        zoomOutButton.horizontalCenter = "right";
        zoomOutButton.valign = "top";
        zoomOutButton.zIndex = Number.MAX_SAFE_INTEGER;
        zoomOutButton.marginTop = 5;
        zoomOutButton.marginRight = 5;
        zoomOutButton.isMeasured = false;
        zoomOutButton.adapter.add("dx", function (dx, target) {
            return -zoomOutButton.marginRight;
        });
        zoomOutButton.hide(0);
        _this.zoomOutButton = zoomOutButton;
        _this.addDisposer(_this.seriesContainer.events.on("sizechanged", function () {
            if (_this.seriesContainer.scale != 1) {
                _this.zoomOutButton.show();
            }
            else {
                _this.zoomOutButton.hide();
            }
        }));
        var interaction = getInteraction();
        _this._disposers.push(interaction.body.events.on("down", function (event) {
            if (_this.zoomable) {
                var svgPoint = $utils.documentPointToSvg(event.pointer.point, _this.htmlContainer);
                if (svgPoint.x > 0 && svgPoint.y > 0 && svgPoint.x < _this.svgContainer.width && svgPoint.y < _this.svgContainer.height) {
                    _this.seriesContainer.dragStart(event.pointer);
                }
            }
        }, _this));
        _this._disposers.push(interaction.body.events.on("up", function (event) {
            if (_this.zoomable) {
                _this.seriesContainer.dragStop(event.pointer, true);
            }
        }, _this));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates and returns a new series of the suitable type.
     *
     * @return New series
     */
    ForceDirectedTree.prototype.createSeries = function () {
        return new ForceDirectedSeries();
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    ForceDirectedTree.prototype.createDataItem = function () {
        return new ForceDirectedTreeDataItem();
    };
    /**
     * Setups the legend to use the chart's data.
     *
     * @ignore
     */
    ForceDirectedTree.prototype.feedLegend = function () {
        var legend = this.legend;
        if (legend) {
            var legendData_1 = [];
            this.series.each(function (series) {
                if (!series.hiddenInLegend) {
                    var dataItems = series.dataItems;
                    if (dataItems.length == 1) {
                        var children = series.dataItems.getIndex(0).children;
                        if (children && children.length > 0) {
                            dataItems = children;
                        }
                    }
                    dataItems.each(function (dataItem) {
                        if (!dataItem.hiddenInLegend) {
                            legendData_1.push(dataItem);
                            var legendSettings = series.legendSettings;
                            if (legendSettings) {
                                if (legendSettings.labelText) {
                                    legend.labels.template.text = legendSettings.labelText;
                                }
                                if (legendSettings.itemLabelText) {
                                    legend.labels.template.text = legendSettings.itemLabelText;
                                }
                                if (legendSettings.valueText) {
                                    legend.valueLabels.template.text = legendSettings.valueText;
                                }
                                if (legendSettings.itemValueText) {
                                    legend.valueLabels.template.text = legendSettings.itemValueText;
                                }
                            }
                        }
                    });
                }
            });
            legend.data = legendData_1;
            legend.dataFields.name = "name";
        }
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    ForceDirectedTree.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Force directed tree");
        }
    };
    /**
     * Since this chart uses hierarchical data, we need to remove childrent
     * dataField from export of non-hierarchical formats such as CSV and XSLX.
     *
     * @return Export
     */
    ForceDirectedTree.prototype.getExporting = function () {
        var _this = this;
        var exporting = _super.prototype.getExporting.call(this);
        exporting.adapter.add("formatDataFields", function (info) {
            if (info.format == "csv" || info.format == "xlsx") {
                _this.series.each(function (series) {
                    if ($type.hasValue(series.dataFields.children)) {
                        delete info.dataFields[series.dataFields.children];
                    }
                });
            }
            return info;
        });
        return exporting;
    };
    /**
     * Handles mouse wheel event, e.g. user rotates mouse wheel while over the
     * map: zooms in or out depending on the direction of the wheel turn.
     *
     * @param event  Original event
     */
    ForceDirectedTree.prototype.handleWheel = function (event) {
        var point = $utils.documentPointToSprite(event.point, this.seriesContainer);
        var zoomLevel = this.seriesContainer.scale;
        if (event.shift.y < 0) {
            zoomLevel *= this.zoomStep;
        }
        else {
            zoomLevel /= this.zoomStep;
        }
        zoomLevel = $math.fitToRange(zoomLevel, this.minZoomLevel, this.maxZoomLevel);
        this.zoomToPoint(point, zoomLevel);
    };
    /**
     * Zooms the chart to particular point.
     *
     * @from 4.10.0
     * @param  point      A point to zoom to
     * @param  zoomLevel  Zoom level
     * @param  center     Should the chart center on the target point?
     */
    ForceDirectedTree.prototype.zoomToPoint = function (point, zoomLevel, center) {
        var container = this.seriesContainer;
        var svgPoint;
        if (center) {
            svgPoint = { x: this.maxWidth / 2, y: this.maxHeight / 2 };
        }
        else {
            svgPoint = $utils.spritePointToSvg(point, container);
        }
        var x = svgPoint.x - point.x * zoomLevel;
        var y = svgPoint.y - point.y * zoomLevel;
        container.animate([{ property: "scale", to: zoomLevel }, { property: "x", to: x }, { property: "y", to: y }], this.zoomDuration, this.zoomEasing);
    };
    /**
     * Zooms the chart to particular data item (node).
     *
     * @from 4.10.0
     * @param  dataItem   A data item to zoom to
     * @param  zoomLevel  Zoom level
     * @param  center     Should the chart center on the target point?
     */
    ForceDirectedTree.prototype.zoomToDataItem = function (dataItem, zoomLevel, center) {
        var x = dataItem.node.pixelX;
        var y = dataItem.node.pixelY;
        if (!$type.isNumber(zoomLevel)) {
            zoomLevel = this.seriesContainer.scale * this.zoomStep;
        }
        this.zoomToPoint({ x: x, y: y }, zoomLevel, center);
    };
    /**
     * Zooms out the chart to initial full view.
     *
     * @from 4.10.0
     */
    ForceDirectedTree.prototype.zoomOut = function () {
        var container = this.seriesContainer;
        this.zoomToPoint({ x: container.pixelWidth / 2, y: container.pixelHeight / 2 }, 1, true);
    };
    Object.defineProperty(ForceDirectedTree.prototype, "zoomable", {
        /**
         * @return Zoomable
         */
        get: function () {
            return this.getPropertyValue("zoomable");
        },
        /**
         * When user zooms in or out current zoom level is multiplied or divided
         * by value of this setting.
         *
         * @default false
         * @since 4.10.0
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/force-directed/#Zooming} for more information about zooming ForceDirectedTree
         * @param value  Zoomable
         */
        set: function (value) {
            var _this = this;
            if (this.setPropertyValue("zoomable", value)) {
                if (value) {
                    this.seriesContainer.resizable = true;
                    this.seriesContainer.draggable = true;
                    this.seriesContainer.dragWhileResize = true;
                    this.mouseWheelBehavior = "zoom";
                    this._backgroundZoomoutDisposer = this.seriesContainer.background.events.on("hit", function () {
                        _this.zoomOut();
                    }, this, false);
                    this._disposers.push(this._backgroundZoomoutDisposer);
                    this._disposers.push(this.seriesContainer.events.on("sizechanged", function () {
                        _this.series.each(function (series) {
                            series.nodes.each(function (node) {
                                node.updateLabelSize();
                            });
                        });
                    }));
                }
                else {
                    this.seriesContainer.resizable = false;
                    this.seriesContainer.draggable = false;
                    this.seriesContainer.dragWhileResize = false;
                    this.mouseWheelBehavior = "none";
                    if (this._backgroundZoomoutDisposer) {
                        this._backgroundZoomoutDisposer.dispose();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedTree.prototype, "mouseWheelBehavior", {
        /**
         * @return Mouse wheel behavior
         */
        get: function () {
            return this.getPropertyValue("mouseWheelBehavior");
        },
        /**
         * Specifies what should chart do if when mouse wheel is rotated.
         *
         * @param Mouse wheel behavior
         * @since 4.10.0
         * @default none
         */
        set: function (value) {
            if (this.setPropertyValue("mouseWheelBehavior", value)) {
                if (value != "none") {
                    this._mouseWheelDisposer = this.chartContainer.events.on("wheel", this.handleWheel, this, false);
                    this._disposers.push(this._mouseWheelDisposer);
                }
                else {
                    if (this._mouseWheelDisposer) {
                        this._mouseWheelDisposer.dispose();
                    }
                    this.chartContainer.wheelable = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedTree.prototype, "zoomStep", {
        /**
         * @return Zoom factor
         */
        get: function () {
            return this.getPropertyValue("zoomStep");
        },
        /**
         * When user zooms in or out current zoom level is multiplied or divided
         * by value of this setting.
         *
         * @since 4.10.0
         * @default 2
         * @param value  Zoom factor
         */
        set: function (value) {
            this.setPropertyValue("zoomStep", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForceDirectedTree.prototype, "zoomOutButton", {
        /**
         * @return Zoom out button
         */
        get: function () {
            return this._zoomOutButton;
        },
        /**
         * A [[Button]] element that is used for zooming out the chart.
         *
         * This button appears only when chart is zoomed in, and disappears
         * autoamatically when it is zoome dout.
         *
         * @param button  Zoom out button
         */
        set: function (button) {
            var _this = this;
            this._zoomOutButton = button;
            if (button) {
                button.events.on("hit", function () {
                    _this.zoomOut();
                }, undefined, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ForceDirectedTree;
}(SerialChart));
export { ForceDirectedTree };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ForceDirectedTree"] = ForceDirectedTree;
registry.registeredClasses["ForceDirectedTreeDataItem"] = ForceDirectedTreeDataItem;
//# sourceMappingURL=ForceDirectedTree.js.map