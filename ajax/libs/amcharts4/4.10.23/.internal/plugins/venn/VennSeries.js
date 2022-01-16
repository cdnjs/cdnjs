/**
 * Defines Venn Diagram Series.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentSeries, PercentSeriesDataItem } from "../../charts/series/PercentSeries";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
import * as $type from "../../core/utils/Type";
import { percent } from "../../core/utils/Percent";
import { Sprite } from "../../core/Sprite";
import { color } from "../../core/utils/Color";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as venn from "../../venn.js/index.js";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[VennSeries]].
 *
 * @see {@link DataItem}
 */
var VennSeriesDataItem = /** @class */ (function (_super) {
    __extends(VennSeriesDataItem, _super);
    /**
     * Constructor
     */
    function VennSeriesDataItem() {
        var _this = _super.call(this) || this;
        /**
         * @ignore
         */
        _this.radius = 0;
        _this.className = "VennSeriesDataItem";
        // this helps to invalidate series when value is 0 an it is hidden (no other events are triggered then)
        _this.events.on("visibilitychanged", function () {
            if (_this.component) {
                //this.component.invalidateDataItems();
            }
        }, _this, false);
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(VennSeriesDataItem.prototype, "intersections", {
        /**
         * @return Array of intersecting categories
         */
        get: function () {
            return this.properties.intersections;
        },
        /**
         * List of categories this data item represents intersection of.
         *
         * @param  value  Array of intersecting categories
         */
        set: function (value) {
            this.setProperty("intersections", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    VennSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        var _this = this;
        if (!this.intersections) {
            this.component.dataItems.each(function (dataItem) {
                if (dataItem != _this && dataItem.intersections) {
                    if (dataItem.intersections.indexOf(_this.category) != -1) {
                        dataItem.hide(duration, delay, toValue, fields);
                    }
                }
            });
        }
        return _super.prototype.hide.call(this, duration, delay, toValue, fields);
        if (this.component) {
            this.component.invalidateProcessedData();
        }
    };
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    VennSeriesDataItem.prototype.show = function (duration, delay, fields) {
        var _this = this;
        if (!this.intersections) {
            this.component.dataItems.each(function (dataItem) {
                if (dataItem != _this && dataItem.intersections) {
                    if (dataItem.intersections.indexOf(_this.category) != -1) {
                        dataItem.show(duration, delay, fields);
                    }
                }
            });
        }
        return _super.prototype.show.call(this, duration, delay, fields);
        if (this.component) {
            this.component.invalidateProcessedData();
        }
    };
    /**
     * @ignore
     */
    VennSeriesDataItem.prototype.animateRadius = function (toValue, duration, easing) {
        var _this = this;
        var animation = this.animate({ property: "radius", to: toValue }, duration, easing);
        this._disposers.push(animation);
        this._disposers.push(animation.events.on("animationprogress", function (event) {
            var radius = _this.radius;
            var path = $path.moveTo({ x: -radius, y: 0 });
            path += $path.arcToPoint({ x: radius, y: 0 }, radius, radius, true);
            path += $path.arcToPoint({ x: -radius, y: 0 }, radius, radius, true);
            _this.slice.path = path;
            if (_this.slice.isHover) {
                _this.component.updateHoverSprite(_this.slice);
            }
        }));
    };
    return VennSeriesDataItem;
}(PercentSeriesDataItem));
export { VennSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates Venn Diagram Series.
 *
 * Venn series uses Ben Frederickson's [venn.js](https://github.com/benfred/venn.js).
 *
 * @see {@link IVennSeriesEvents} for a list of available Events
 * @see {@link IVennSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/venn/} for documentation
 * @important
 * @since 4.9.0
 */
var VennSeries = /** @class */ (function (_super) {
    __extends(VennSeries, _super);
    /**
     * Constructor
     */
    function VennSeries() {
        var _this = _super.call(this) || this;
        _this.className = "VennSeries";
        _this.width = percent(100);
        _this.height = percent(100);
        _this.layout = "absolute";
        _this.slicesContainer.width = percent(100);
        _this.slicesContainer.height = percent(100);
        _this.slicesContainer.layout = "none";
        var template = _this.slices.template;
        template.strokeWidth = 0;
        template.stroke = color("#ffffff");
        _this._disposers.push(_this.events.on("maxsizechanged", function () {
            _this.vennData = undefined;
            _this.invalidateDataItems();
        }, _this, false));
        _this.labelsContainer.layout = "none";
        _this.itemReaderText = "{category}";
        var hoverSprite = _this.slicesContainer.createChild(Sprite);
        hoverSprite.strokeOpacity = 1;
        hoverSprite.strokeWidth = 2;
        hoverSprite.stroke = new InterfaceColorSet().getFor("background");
        hoverSprite.strokeDasharray = "3,3";
        hoverSprite.zIndex = Number.MAX_VALUE;
        hoverSprite.interactionsEnabled = false;
        hoverSprite.fill = color();
        hoverSprite.strokeDashoffset = 0;
        var hs = hoverSprite.states.create("hover");
        hs.properties.strokeDashoffset = 1000;
        hs.transitionDuration = 100000;
        _this.hoverSprite = hoverSprite;
        template.events.on("over", function (event) {
            hoverSprite.hide(0);
            hoverSprite.show();
            hoverSprite.isHover = true;
            _this.updateHoverSprite(event.target);
        });
        template.events.on("out", function (event) {
            hoverSprite.isHover = false;
        });
        template.events.on("visibilitychanged", function (event) {
            if (event.visible == false) {
                _this.hoverSprite.hide();
            }
        });
        template.events.on("out", function (event) {
            _this.hoverSprite.hide();
        });
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates a Sprite element.
     *
     * @return Sprite
     */
    VennSeries.prototype.createSlice = function () {
        return new Sprite();
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    VennSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Venn Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    VennSeries.prototype.createDataItem = function () {
        return new VennSeriesDataItem();
    };
    /**
     * Inits Slice.
     *
     * @param Slice to init
     */
    VennSeries.prototype.initSlice = function (slice) {
        slice.isMeasured = false;
        slice.tooltipText = "{category}";
    };
    /**
     * Inits a Slice label.
     *
     * @param Label
     */
    VennSeries.prototype.initLabel = function (label) {
        label.verticalCenter = "middle";
        label.horizontalCenter = "middle";
        label.isMeasured = false;
        label.text = "{category}";
    };
    /**
     * @ignore
     */
    VennSeries.prototype.updateHoverSprite = function (sprite) {
        this.hoverSprite.path = sprite.path;
        this.hoverSprite.x = sprite.x;
        this.hoverSprite.y = sprite.y;
    };
    /**
     * [validateDataElements description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    VennSeries.prototype.validateDataElements = function () {
        var _this = this;
        _super.prototype.validateDataElements.call(this);
        var slicesContainer = this.slicesContainer;
        var labelsContainer = this.labelsContainer;
        var labelTemplate = this.labels.template;
        if (this.alignLabels) {
            labelTemplate.interactionsEnabled = true;
            slicesContainer.isMeasured = true;
            labelsContainer.isMeasured = true;
        }
        else {
            labelTemplate.interactionsEnabled = false;
            slicesContainer.isMeasured = false;
            labelsContainer.isMeasured = false;
        }
        var sets = [];
        // prepare data for venn
        this.dataItems.each(function (dataItem) {
            var set = {};
            if (dataItem.intersections) {
                set.sets = dataItem.intersections;
            }
            else {
                set.sets = [dataItem.category];
            }
            set.size = dataItem.getValue("value");
            var isHidden = false;
            if (dataItem.intersections) {
                for (var i = 0; i < dataItem.intersections.length; i++) {
                    var category = dataItem.intersections[i];
                    var di = _this.getDataItemByCategory(category);
                    if (di.isHiding || !di.visible) {
                        isHidden = true;
                    }
                }
                if (isHidden && dataItem.visible) {
                    dataItem.hide(0);
                }
            }
            if (set.size > 0 && !isHidden && !dataItem.isHiding && dataItem.visible) {
                sets.push(set);
            }
        });
        var newSets = sets.toString();
        if (newSets != this.vennData) {
            this.vennData = newSets;
            if (sets.length > 0) {
                var vennData = venn.venn(sets);
                vennData = venn.normalizeSolution(vennData, null, null);
                vennData = venn.scaleSolution(vennData, this.innerWidth, this.innerHeight, 0);
                var circles_1 = {};
                for (var name_1 in vennData) {
                    var item = vennData[name_1];
                    var radius = item.radius;
                    var dataItem = this.getDataItemByCategory(name_1);
                    if (this.interpolationDuration > 0) {
                        dataItem.animateRadius(radius, this.interpolationDuration, this.interpolationEasing);
                    }
                    else {
                        var path = $path.moveTo({ x: -radius, y: 0 });
                        path += $path.arcToPoint({ x: radius, y: 0 }, radius, radius, true);
                        path += $path.arcToPoint({ x: -radius, y: 0 }, radius, radius, true);
                        dataItem.slice.path = path;
                        if (dataItem.slice.isHover) {
                            this.updateHoverSprite(dataItem.slice);
                        }
                    }
                    var slice = dataItem.slice;
                    if (slice.x == undefined || slice.y == undefined) {
                        slice.x = item.x;
                        slice.y = item.y;
                    }
                    else {
                        slice.animate([{ property: "x", to: item.x }, { property: "y", to: item.y }], this.interpolationDuration, this.interpolationEasing);
                    }
                    circles_1[name_1] = item;
                }
                var centers_1 = venn.computeTextCentres(circles_1, sets);
                var i_1 = 0;
                this.dataItems.each(function (dataItem) {
                    var name = dataItem.category;
                    var center = centers_1[name];
                    if (dataItem.intersections) {
                        name = dataItem.intersections.toString();
                        center = centers_1[name];
                        if (center) {
                            var set = dataItem.intersections;
                            var cc = [];
                            for (var s = 0; s < set.length; s++) {
                                cc.push(circles_1[set[s]]);
                            }
                            var intersectionPath = venn.intersectionAreaPath(cc);
                            var slice = dataItem.slice;
                            slice.path = intersectionPath;
                            slice.tooltipX = center.x;
                            slice.tooltipY = center.y;
                        }
                    }
                    if (center) {
                        var label = dataItem.label;
                        if (label.x == undefined || label.y == undefined) {
                            label.x = center.x;
                            label.y = center.y;
                        }
                        else {
                            label.animate([{ property: "x", to: center.x }, { property: "y", to: center.y }], _this.interpolationDuration, _this.interpolationEasing);
                        }
                    }
                    else {
                        //dataItem.label.x = -10000;
                    }
                    _this.updateLegendValue(dataItem);
                    if (!_this.slices.template.propertyFields.zIndex) {
                        dataItem.slice.zIndex = i_1;
                    }
                    i_1++;
                });
            }
        }
    };
    /**
     * Returns data item by category.
     *
     * @param   category  Category
     * @return            Data item
     */
    VennSeries.prototype.getDataItemByCategory = function (category) {
        var di;
        this.dataItems.each(function (dataItem) {
            if (dataItem.category == category) {
                di = dataItem;
            }
        });
        return di;
    };
    return VennSeries;
}(PercentSeries));
export { VennSeries };
/**
 * Adds class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["VennSeries"] = VennSeries;
registry.registeredClasses["VennSeriesDataItem"] = VennSeriesDataItem;
//# sourceMappingURL=VennSeries.js.map