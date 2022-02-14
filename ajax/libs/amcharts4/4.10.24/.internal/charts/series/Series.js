/**
 * Functionality for any series-based elements, like Line Series (graphs),
 * Pie slice lists, etc.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component } from "../../core/Component";
import { Sprite } from "../../core/Sprite";
import { List, ListTemplate, ListDisposer } from "../../core/utils/List";
import { Dictionary, DictionaryDisposer } from "../../core/utils/Dictionary";
import { DataItem } from "../../core/DataItem";
import { Container } from "../../core/Container";
import { Tooltip } from "../../core/elements/Tooltip";
import { Bullet } from "../elements/Bullet";
import { LegendSettings } from "../Legend";
import { options } from "../../core/Options";
import { Color } from "../../core/utils/Color";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $ease from "../../core/utils/Ease";
import * as $utils from "../../core/utils/Utils";
import * as $object from "../../core/utils/Object";
import * as $type from "../../core/utils/Type";
import * as $array from "../../core/utils/Array";
import * as $colors from "../../core/utils/Colors";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Series]].
 *
 * @see {@link DataItem}
 */
var SeriesDataItem = /** @class */ (function (_super) {
    __extends(SeriesDataItem, _super);
    /**
     * Constructor
     */
    function SeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SeriesDataItem";
        //@todo Should we make `bullets` list disposable?
        //this._disposers.push(new DictionaryDisposer(this.bullets));
        _this.values.value = {};
        _this.values.value = {};
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SeriesDataItem.prototype, "bullets", {
        /**
         * A dictionary of data items bullets, where key is uid of a bullet template.
         */
        get: function () {
            if (!this._bullets) {
                this._bullets = new Dictionary();
                this._disposers.push(new DictionaryDisposer(this._bullets));
            }
            return this._bullets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroys this object and all related data.
     */
    SeriesDataItem.prototype.dispose = function () {
        this.bullets.clear();
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SeriesDataItem.prototype, "value", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.value.value;
        },
        /**
         * data items's numeric value.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("value", value);
        },
        enumerable: true,
        configurable: true
    });
    return SeriesDataItem;
}(DataItem));
export { SeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines base class for any kind of serial data.
 *
 * @see {@link ISeriesEvents} for a list of available Events
 * @see {@link ISeriesAdapters} for a list of available Adapters
 * @todo Separate axis-related stuff to some other class so that MapSeries would not have unrelated stuff
 */
var Series = /** @class */ (function (_super) {
    __extends(Series, _super);
    /**
     * Constructor
     */
    function Series() {
        var _this = _super.call(this) || this;
        /**
         * Should this series excluded from the axis scale calculations?
         *
         * @default false
         */
        _this._ignoreMinMax = false;
        /**
         * Should series' bullets?
         *
         * @default true
         */
        _this._showBullets = true;
        /**
         * Settings for the appearance of the related legend items.
         */
        _this.legendSettings = new LegendSettings();
        /**
         * Lowest overal values by type.
         */
        _this._tmin = new Dictionary();
        /**
         * Highest overal values by type.
         */
        _this._tmax = new Dictionary();
        /**
         * Lowest values in current selection by type.
         */
        _this._smin = new Dictionary();
        /**
         * Highest values in current selection by type.
         */
        _this._smax = new Dictionary();
        /**
         * [dataItemsByAxis description]
         *
         * Both by category and date.
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.dataItemsByAxis = new Dictionary();
        /**
         * Normally series items are focusable using keyboard, so that people can
         * select them with a TAB key. However, if there are a lot of data points on
         * screen it might be long and useless to tab through all o fthem.
         *
         * This is where `skipFocusThreshold` comes in. If there are more items than
         * the value set here, we will not make those focusable and rather let screen
         * reader software rely on the series summary, or authors provide alternative
         * detailed information display, such as HTML table.
         *
         * Different series might have different threshold defaults.
         */
        _this.skipFocusThreshold = 20;
        /**
         * Used to indicate if `itemReaderText` was changed "from the outside".
         */
        _this._itemReaderTextChanged = false;
        /**
         * Most of the series use absolute values. However sometimes various
         * calculated percent values are need, e.g. item's percent representation
         * across all values in series, etc.
         *
         * It's a resource-intensive operation, so it is disabled by default.
         *
         * If you need percents to be calculated, e.g. for showing them in tooltips,
         * or creating 100% stacks, this setting needs to be set to `true`.
         *
         * NOTE: `PieChart`, which relies on slice percentages, has this
         * automatically set to `true`.
         *
         * @default false
         */
        _this.calculatePercent = false;
        /**
         * When `calculatePercent` is enabled and data item's percent value is
         * calculated, last item's real value is used instead of its working value.
         *
         * This is done for the animations when last item in series (e.g. slice in
         * a `PieSeries`) is hidden or shown. (if we would use real value, the
         * calculated percent would always be 100%).
         *
         * Sometimes there is a need (e.g. for drill-down Sunburst) to disable this
         * hack by setting `usePercentHack` to `false`.
         *
         * @since 4.9.13
         * @default true
         */
        _this.usePercentHack = true;
        /**
         * Specifies if series should be automatically disposed when removing from
         * chart's `series` list.
         *
         * @default true
         */
        _this.autoDispose = true;
        /**
         * When chart/series' data is processed, all kinds of derivative values are
         * calculated. E.g. sum, min, max, change, etc. This is a potentially
         * time-consuming operation, especially prominent in data-heavy charts.
         *
         * If your chart does not need those values, and you have a lot of data,
         * setting this to `true` might give a dramatic increase in initial chart
         * load speed.
         *
         * Please note, regular column and line series usage scenarios do not
         * require derivative values. Those come into play only when you do advanced
         * functionality like coloring segments of charts in different colors
         * depending on change between open and close values, have stacked series, or
         * display any of the derived values, like percent, in tooltips or bullets.
         *
         * @default false
         */
        _this.simplifiedProcessing = false;
        if (_this.constructor === Series) {
            throw new Error("'Series' cannot be instantiated directly. Please use a specific series type.");
        }
        _this.className = "Series";
        _this.isMeasured = false;
        _this.layout = "none";
        _this.shouldClone = false;
        _this.setPropertyValue("hidden", false);
        _this.axisRanges = new List();
        _this.axisRanges.events.on("inserted", _this.processAxisRange, _this, false);
        _this.minBulletDistance = 0; // otherwise we'll have a lot of cases when people won't see bullets and think it's a bug
        _this.mainContainer = _this.createChild(Container);
        _this.mainContainer.shouldClone = false;
        _this.mainContainer.mask = _this.createChild(Sprite);
        _this._disposers.push(_this.mainContainer);
        // all bullets should go on top of lines/fills. So we add a separate container for bullets and later set it's parent to chart.bulletsContainer
        var bulletsContainer = _this.mainContainer.createChild(Container);
        _this._shouldBeReady.push(bulletsContainer);
        bulletsContainer.shouldClone = false;
        bulletsContainer.layout = "none";
        bulletsContainer.virtualParent = _this;
        _this._disposers.push(bulletsContainer);
        _this.bulletsContainer = bulletsContainer;
        _this.tooltip = new Tooltip();
        _this.tooltip.virtualParent = _this;
        _this._disposers.push(_this.tooltip);
        _this.hiddenState.transitionEasing = $ease.cubicIn;
        // this data item holds sums, averages, etc
        _this.dataItem = _this.createDataItem();
        _this._disposers.push(_this.dataItem);
        _this.dataItem.component = _this;
        // Apply accessibility
        _this.role = "group";
        _this.applyTheme();
        return _this;
    }
    /**
     * We need this here so that class names can be applied to bullets container.
     *
     * @ignore Exclude from docs
     */
    Series.prototype.applyTheme = function () {
        _super.prototype.applyTheme.call(this);
        if (options.autoSetClassName && this.bulletsContainer) {
            this.bulletsContainer.className = this.className + "-bullets";
            this.bulletsContainer.setClassName();
        }
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    Series.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    Series.prototype.createDataItem = function () {
        return new SeriesDataItem();
    };
    Object.defineProperty(Series.prototype, "chart", {
        /**
         * @return Chart
         */
        get: function () {
            return this._chart;
        },
        /**
         * Chart series is used on.
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
     * Positions bullet.
     *
     * @param bullet  Sprite
     */
    Series.prototype.positionBullet = function (bullet) {
        // Placeholder method for extending classes to override.
    };
    /**
     * Decorates newly created bullet after it has been instert into the list.
     *
     * @param event  List event
     * @todo investigate why itemReaderText is undefined
     */
    Series.prototype.processBullet = function (event) {
        var _this = this;
        var bullet = event.newValue;
        bullet.isTemplate = true;
        // Add accessibility options to bullet
        // If there are relatively few bullets, make them focusable
        this.events.once("datavalidated", function (ev) {
            if (_this.itemsFocusable()) {
                bullet.focusable = true;
            }
        });
        this.invalidate();
    };
    /**
     * removes bullets
     *
     * @param event  List event
     */
    Series.prototype.removeBullet = function (event) {
        var bullet = event.oldValue;
        this.dataItems.each(function (dataItem) {
            var eachBullet = dataItem.bullets.getKey(bullet.uid);
            if (eachBullet) {
                eachBullet.dispose();
            }
        });
        this.invalidate();
    };
    /**
     * Validates data items.
     *
     * @ignore Exclude from docs
     */
    Series.prototype.validateDataItems = function () {
        _super.prototype.validateDataItems.call(this);
        this.processValues(false);
    };
    /**
     * Returns first value for the specific key in the series.
     *
     * @param key  Key
     * @return Value
     * @todo Description
     * @todo Convert to propert object property iterator
     */
    Series.prototype.getFirstValue = function (key, startIndex) {
        // find first
        /*
        return $iter.findMap(this.dataItems.iterator(), (dataItem) => {
            for (let key in dataItem.values) {
                if ($object.hasKey(dataItem.values, key)) {
                    let value: number = dataItem.values[key].workingValue;
                    if ($type.isNumber(value)) {
                        return value;
                    }
                }
            }

            return null;
        });*/
        //if (startIndex > 0 && startIndex < this.dataItems.length - 1) {
        //startIndex++;
        //}
        for (var i = startIndex; i >= 0; i--) {
            var dataItem = this.dataItems.getIndex(i);
            var value = dataItem.getActualWorkingValue(key);
            if ($type.isNumber(value)) {
                return value;
            }
        }
        return null;
    };
    /**
     * Returns first value for the specific key in the series.
     *
     * @param key  Key
     * @return Value
     * @todo Description
     * @todo Convert to propert object property iterator
     */
    Series.prototype.getAbsoluteFirstValue = function (key) {
        for (var i = 0; i < this.dataItems.length; i++) {
            var dataItem = this.dataItems.getIndex(i);
            var value = dataItem.values[key].value;
            if ($type.isNumber(value)) {
                return value;
            }
        }
        return null;
    };
    /**
     * [rangeChangeUpdate description]
     *
     * @todo Description
     */
    Series.prototype.rangeChangeUpdate = function () {
        _super.prototype.rangeChangeUpdate.call(this);
        this.processValues(true);
    };
    /**
     * [processValues description]
     *
     * @todo Description
     * @todo Convert to propert object property iterator
     * @param dataItems [description]
     */
    Series.prototype.processValues = function (working) {
        var _this = this;
        if (!this.simplifiedProcessing) {
            var dataItems = this.dataItems;
            var count_1 = {};
            var sum_1 = {};
            var absoluteSum_1 = {};
            var low_1 = {};
            var high_1 = {};
            var open_1 = {};
            var close_1 = {};
            var previous_1 = {};
            var first_1 = {};
            var absoluteFirst_1 = {};
            //let duration: number = 0; // todo: check if series uses selection.change or selection.change.percent and set duration to interpolationduration
            var startIndex_1 = $math.max(0, this.startIndex);
            startIndex_1 = $math.min(startIndex_1, this.dataItems.length);
            var endIndex = $math.min(this.endIndex, this.dataItems.length);
            if (!$type.isNumber(startIndex_1)) {
                startIndex_1 = 0;
            }
            if (!$type.isNumber(endIndex)) {
                endIndex = this.dataItems.length;
            }
            if (startIndex_1 > 0) {
                var dataItem_1 = dataItems.getIndex(startIndex_1 - 1);
                $object.each(dataItem_1.values, function (key, values) {
                    var value = dataItem_1.getActualWorkingValue(key);
                    if ($type.isNumber(value)) {
                        // save previous
                        previous_1[key] = value;
                    }
                });
            }
            var _loop_1 = function (i) {
                var dataItem_2 = dataItems.getIndex(i);
                $object.each(dataItem_2.values, function (key, values) {
                    var value = dataItem_2.getActualWorkingValue(key);
                    //if (i >= startIndex && i <= endIndex) { // do not add to count, sum etc if it is not within start/end index
                    if ($type.isNumber(value)) {
                        // count values
                        if (!$type.isNumber(count_1[key])) {
                            count_1[key] = 0;
                        }
                        count_1[key]++;
                        // sum values
                        if (!$type.isNumber(sum_1[key])) {
                            sum_1[key] = 0;
                        }
                        sum_1[key] += value;
                        // absolute sum values
                        if (!$type.isNumber(absoluteSum_1[key])) {
                            absoluteSum_1[key] = 0;
                        }
                        absoluteSum_1[key] += Math.abs(value);
                        // open
                        if (!$type.isNumber(open_1[key])) {
                            open_1[key] = value;
                        }
                        // close
                        close_1[key] = value;
                        // low
                        if (!$type.isNumber(low_1[key])) {
                            low_1[key] = value;
                        }
                        else {
                            if (low_1[key] > value) {
                                low_1[key] = value;
                            }
                        }
                        // high
                        if (!$type.isNumber(high_1[key])) {
                            high_1[key] = value;
                        }
                        else {
                            if (high_1[key] < value) {
                                high_1[key] = value;
                            }
                        }
                        if (!$type.isNumber(first_1[key])) {
                            first_1[key] = _this.getFirstValue(key, startIndex_1);
                        }
                        if (!$type.isNumber(absoluteFirst_1[key])) {
                            absoluteFirst_1[key] = _this.getAbsoluteFirstValue(key);
                        }
                        // change
                        dataItem_2.setCalculatedValue(key, value - first_1[key], "change");
                        // change from start percent
                        // will fail if first value is 0
                        dataItem_2.setCalculatedValue(key, (value - first_1[key]) / first_1[key] * 100, "changePercent");
                        dataItem_2.setCalculatedValue(key, (value - absoluteFirst_1[key]), "startChange");
                        dataItem_2.setCalculatedValue(key, (value - absoluteFirst_1[key]) / absoluteFirst_1[key] * 100, "startChangePercent");
                        // previous change
                        var prevValue = previous_1[key];
                        if (!$type.isNumber(prevValue)) {
                            prevValue = value;
                        }
                        dataItem_2.setCalculatedValue(key, value - prevValue, "previousChange");
                        // previous change percent
                        dataItem_2.setCalculatedValue(key, (value - prevValue) / prevValue * 100, "previousChangePercent");
                        // save previous
                        previous_1[key] = value;
                    }
                });
            };
            for (var i = startIndex_1; i < endIndex; i++) {
                _loop_1(i);
            }
            if (this.calculatePercent) {
                var _loop_2 = function (i) {
                    var dataItem_3 = dataItems.getIndex(i);
                    $object.each(dataItem_3.values, function (key) {
                        var ksum = absoluteSum_1[key];
                        var value = dataItem_3.getActualWorkingValue(key);
                        if ($type.isNumber(value)) {
                            if (ksum > 0) {
                                if (_this.usePercentHack) {
                                    // this hack is made in order to make it possible to animate single slice to 0
                                    // if there is only one slice left, percent value is always 100%, so it won't animate
                                    // so we use real value of a slice instead of current value
                                    if (value == ksum) {
                                        ksum = dataItem_3.values[key].value;
                                    }
                                }
                                var percent = value / ksum * 100;
                                dataItem_3.setCalculatedValue(key, percent, "percent");
                            }
                            else {
                                dataItem_3.setCalculatedValue(key, 0, "percent");
                            }
                        }
                    });
                };
                for (var i = startIndex_1; i < endIndex; i++) {
                    _loop_2(i);
                }
            }
            // calculate one before first (cant do that in cycle, as we don't know open yet
            // when drawing line chart we should draw line to the invisible data point to the left, otherwise the line will always look like it starts from the selected point
            // so we do startIndex - 1
            if (startIndex_1 > 0) {
                var zeroItem_1 = dataItems.getIndex(startIndex_1 - 1);
                $object.each(zeroItem_1.values, function (key) {
                    var value = zeroItem_1.values[key].value;
                    // change
                    zeroItem_1.setCalculatedValue(key, value - open_1[key], "change");
                    // change percent
                    zeroItem_1.setCalculatedValue(key, (value - open_1[key]) / open_1[key] * 100, "changePercent");
                });
            }
            // we save various data like sum, average to dataPoint of the series
            var dataItem_4 = this.dataItem;
            $object.each(dataItem_4.values, function (key) {
                dataItem_4.setCalculatedValue(key, sum_1[key], "sum");
                dataItem_4.setCalculatedValue(key, absoluteSum_1[key], "absoluteSum");
                dataItem_4.setCalculatedValue(key, sum_1[key] / count_1[key], "average");
                dataItem_4.setCalculatedValue(key, open_1[key], "open");
                dataItem_4.setCalculatedValue(key, close_1[key], "close");
                dataItem_4.setCalculatedValue(key, low_1[key], "low");
                dataItem_4.setCalculatedValue(key, high_1[key], "high");
                dataItem_4.setCalculatedValue(key, count_1[key], "count");
            });
        }
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    Series.prototype.validate = function () {
        if ($utils.isIE()) {
            this.filters.clear();
        }
        $iter.each(this.axisRanges.iterator(), function (axisRange) {
            //axisRange.contents.disposeChildren(); // not good for columns, as they are reused
            //			axisRange.appendChildren();
            axisRange.validate();
        });
        _super.prototype.validate.call(this);
        var bulletsContainer = this.bulletsContainer;
        bulletsContainer.fill = this.fill;
        bulletsContainer.stroke = this.stroke;
        bulletsContainer.x = this.pixelX;
        bulletsContainer.y = this.pixelY;
        if (this.bulletsContainer.children.length > 0) {
            if (this._showBullets) {
                for (var i = 0; i < this.startIndex; i++) {
                    var dataItem = this.dataItems.getIndex(i);
                    if (dataItem) {
                        dataItem.bullets.each(function (key, bullet) {
                            bullet.__disabled = true;
                        });
                    }
                }
                for (var i = this.dataItems.length - 1; i > this.endIndex; i--) {
                    var dataItem = this.dataItems.getIndex(i);
                    if (dataItem) {
                        dataItem.bullets.each(function (key, bullet) {
                            bullet.__disabled = true;
                        });
                    }
                }
            }
            else {
                this.bulletsContainer.children.each(function (bullet) {
                    bullet.__disabled = true;
                });
            }
        }
        this.updateTooltipBounds();
    };
    /**
     * @ignore
     */
    Series.prototype.updateTooltipBounds = function () {
        if (this.topParent) {
            var x = 0;
            var y = 0;
            var w = this.topParent.maxWidth;
            var h = this.topParent.maxHeight;
            var rect = { x: x, y: y, width: w, height: h };
            this.tooltip.setBounds(rect);
        }
    };
    Series.prototype.shouldCreateBullet = function (dataItem, bulletTemplate) {
        return true;
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    Series.prototype.validateDataElement = function (dataItem) {
        var _this = this;
        _super.prototype.validateDataElement.call(this, dataItem);
        if (this._showBullets) {
            if (!this.isHidden) {
                this.bulletsContainer.visible = true;
            }
            this.bullets.each(function (bulletTemplate) {
                // always better to use the same, this helps to avoid redrawing
                var bullet = dataItem.bullets.getKey(bulletTemplate.uid);
                if (_this.shouldCreateBullet(dataItem, bulletTemplate)) {
                    if (!bullet) {
                        var disabledField = bulletTemplate.propertyFields.disabled;
                        var dataContext = dataItem.dataContext;
                        if (disabledField && dataContext && dataContext[disabledField] === false) {
                            bulletTemplate.applyOnClones = false;
                            bulletTemplate.disabled = false;
                            bullet = bulletTemplate.clone();
                            bulletTemplate.disabled = true;
                            bulletTemplate.applyOnClones = true;
                        }
                        else {
                            bullet = bulletTemplate.clone();
                        }
                        bullet.shouldClone = false;
                        dataItem.addSprite(bullet);
                        if (!_this.visible || _this.isHiding) {
                            bullet.hide(0);
                        }
                    }
                    var currentDataItem = bullet.dataItem;
                    if (currentDataItem != dataItem) {
                        // set to undefined in order not to reuse
                        if (currentDataItem) {
                            currentDataItem.bullets.setKey(bulletTemplate.uid, undefined);
                        }
                        var readerText_1 = _this.itemReaderText;
                        if (bullet instanceof Bullet) {
                            if (!readerText_1) {
                                readerText_1 = ("{" + bullet.xField + "}: {" + bullet.yField + "}");
                            }
                            if (bullet.isDynamic) {
                                dataItem.events.on("workingvaluechanged", bullet.deepInvalidate, bullet, false);
                                //dataItem.events.on("calculatedvaluechanged", bullet.deepInvalidate, bullet, false);
                                _this.dataItem.events.on("workingvaluechanged", bullet.deepInvalidate, bullet, false);
                            }
                            bullet.deepInvalidate();
                        }
                        // Add accessibility to bullet
                        if (bullet.focusable) {
                            bullet.events.on("focus", function (ev) {
                                bullet.readerTitle = _this.populateString(readerText_1, bullet.dataItem);
                            }, undefined, false);
                            bullet.events.on("blur", function (ev) {
                                bullet.readerTitle = "";
                            }, undefined, false);
                        }
                        if (bullet.hoverable) {
                            bullet.events.on("over", function (ev) {
                                bullet.readerTitle = _this.populateString(readerText_1, bullet.dataItem);
                            }, undefined, false);
                            bullet.events.on("out", function (ev) {
                                bullet.readerTitle = "";
                            }, undefined, false);
                        }
                    }
                    bullet.parent = _this.bulletsContainer;
                    dataItem.bullets.setKey(bulletTemplate.uid, bullet);
                    // pass max w/h so we'd know if we should show/hide somethings
                    bullet.maxWidth = dataItem.itemWidth;
                    bullet.maxHeight = dataItem.itemHeight;
                    bullet.__disabled = false;
                    _this.positionBullet(bullet);
                }
                else {
                    if (bullet) {
                        bullet.__disabled = true;
                    }
                }
            });
        }
        else {
            this.bulletsContainer.visible = false;
        }
    };
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    Series.prototype.handleDataItemWorkingValueChange = function (dataItem, name) {
        if (!this.dataRangeInvalid) {
            this.invalidateProcessedData();
        }
    };
    Object.defineProperty(Series.prototype, "ignoreMinMax", {
        /**
         * @return Exclude from calculations?
         */
        get: function () {
            return this._ignoreMinMax;
        },
        /**
         * Should this series excluded from the axis scale calculations?
         *
         * @default false
         * @param value  Exclude from calculations?
         */
        set: function (value) {
            this._ignoreMinMax = value;
            this.invalidateDataItems();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create a mask for the series.
     *
     * @ignore Exclude from docs
     */
    Series.prototype.createMask = function () {
        // A placeholder method for extending classes to override.
    };
    /**
     * Process axis range after it has been added to the list.
     *
     * @param event  Event
     */
    Series.prototype.processAxisRange = function (event) {
        // create container if not existing
        if (!this.rangesContainer) {
            this.rangesContainer = this.createChild(Container);
            this.rangesContainer.shouldClone = false;
            this.rangesContainer.isMeasured = false;
        }
        var axisRange = event.newValue;
        if (axisRange) {
            axisRange.contents.parent = this.rangesContainer;
            axisRange.isRange = true;
            axisRange.events.on("valuechanged", this.invalidateDataItems, this, false);
        }
    };
    /**
     * [getAxisField description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param axis  [description]
     * @return [description]
     */
    Series.prototype.getAxisField = function (axis) {
        return;
    };
    /**
     * Shows the tooltip at specific position.
     *
     * @ignore Exclude from docs
     * @param xPosition  X
     * @param yPosition  Y
     */
    Series.prototype.showTooltipAtPosition = function (xPosition, yPosition) {
        // Placeholder method for extending classes to override.
    };
    Object.defineProperty(Series.prototype, "minBulletDistance", {
        /**
         * @return Distance (px)
         */
        get: function () {
            return this.getPropertyValue("minBulletDistance");
        },
        /**
         * Minimal distance between data points in pixels.
         *
         * If distance gets smaller than this, bullets are turned off to avoid
         * overlapping.
         *
         * `0` (zero) disables this behavior.
         *
         * IMPORTANT: This setting will work only when Series' base axis
         * is [[CategoryAxis]] or [[DateAxis]]. If base axis is [[ValueAxis]] the
         * setting will be ignored, because it would be a huge overhead to measure
         * distance between each and every bullet.
         *
         * @default 0
         * @param value  Distance (px)
         */
        set: function (value) {
            this.setPropertyValue("minBulletDistance", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Series.prototype, "bullets", {
        /**
         * A list of bullets that will be added to each and every items in the
         * series.
         *
         * You can push any object that is a descendant of a [[Sprite]] here. All
         * items added to this list will be copied and used as a bullet on all data
         * items, including their properties, events, etc.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/bullets/} for more info about the concept of Bullets
         * @return List of bullets.
         */
        get: function () {
            if (!this._bullets) {
                this._bullets = new ListTemplate(new Bullet());
                this._bullets.template.virtualParent = this;
                this._bullets.events.on("inserted", this.processBullet, this, false);
                this._bullets.events.on("removed", this.removeBullet, this, false);
                this._disposers.push(new ListDisposer(this._bullets));
                this._disposers.push(this._bullets.template);
            }
            return this._bullets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    Series.prototype.createLegendMarker = function (marker) {
        // This is a placeholder method for extending classes to override.
    };
    Object.defineProperty(Series.prototype, "hiddenInLegend", {
        /**
         * @return Hidden in legend?
         */
        get: function () {
            return this.getPropertyValue("hiddenInLegend");
        },
        /**
         * Should the series be hidden in legend?
         *
         * @param value Hidden in legend?
         */
        set: function (value) {
            if (this.setPropertyValue("hiddenInLegend", value)) {
                if (this.chart) {
                    this.chart.feedLegend();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Series.prototype, "name", {
        /**
         * @return Name
         */
        get: function () {
            return this.getPropertyValue("name");
        },
        /**
         * Series' name.
         *
         * @param value  Name
         */
        set: function (value) {
            this.setPropertyValue("name", value);
            var legendDataItem = this.legendDataItem;
            if (legendDataItem) {
                legendDataItem.component.invalidate();
                legendDataItem.component.invalidateRawData();
            }
            this.readerTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Series.prototype, "itemReaderText", {
        /**
         * @return Screen reader text template
         */
        get: function () {
            // Get explicitly set reader text
            var readerText = this._itemReaderText;
            // Not set? Let's try something else
            if (!readerText) {
                // Tooltip text?
                if (this.tooltipText) {
                    readerText = $utils.plainText(this.tooltipText);
                }
                else if (this.tooltipHTML) {
                    readerText = $utils.plainText(this.tooltipHTML);
                }
            }
            if (!this._adapterO) {
                return readerText;
            }
            else {
                return this._adapterO.apply("itemReaderText", readerText);
            }
        },
        /**
         * Screen reader text to be applied to each individual data item, such
         * as bullets, columns or slices.
         *
         * The template can contain field reference meta codes, i.e. `{dateX}`,
         * `{valueY}`, etc.
         *
         * Any text formatting options, e.g. `[bold]` will be ignored.
         *
         * @param value Screen reader text template
         */
        set: function (value) {
            this._itemReaderText = value;
            this._itemReaderTextChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns if number of data items in the series are beyond non-focusable
     * count and should not be available for TAB-through.
     *
     * @ignore Exclude from docs
     * @return Items focusable?
     */
    Series.prototype.itemsFocusable = function () {
        return this.dataItems.length >= this.skipFocusThreshold ? false : true;
    };
    Object.defineProperty(Series.prototype, "legendDataItem", {
        /**
         * @return Data item
         */
        get: function () {
            return this._legendDataItem;
        },
        /**
         * Legend data item that corresponds to this series.
         *
         * @param value  Data item
         */
        set: function (value) {
            this._legendDataItem = value;
            this._legendDataItem.itemContainer.deepInvalidate();
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
    Series.prototype.updateLegendValue = function (dataItem, notRange) {
        // if this series has legend item
        if (this.legendDataItem) {
            var legendSettings = this.legendSettings;
            var legendDataItem = this.legendDataItem;
            var label = legendDataItem.label;
            var valueLabel = legendDataItem.valueLabel;
            // update legend
            if ((dataItem && !dataItem.isDisposed()) || notRange) {
                if (valueLabel) {
                    if (legendSettings.itemValueText) {
                        valueLabel.text = legendSettings.itemValueText;
                    }
                    valueLabel.dataItem = dataItem;
                }
                if (label) {
                    if (legendSettings.itemLabelText) {
                        label.text = legendSettings.itemLabelText;
                    }
                    label.dataItem = dataItem;
                }
            }
            else {
                if (label) {
                    // if itemLabelText is set, means we have to reset label even if labelText is not set
                    if (legendSettings.labelText || legendSettings.itemLabelText != undefined) {
                        label.text = legendSettings.labelText;
                    }
                    label.dataItem = this.dataItem;
                }
                if (valueLabel) {
                    if (legendSettings.valueText || legendSettings.itemValueText != undefined) {
                        valueLabel.text = legendSettings.valueText;
                    }
                    valueLabel.dataItem = this.dataItem;
                }
            }
        }
    };
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    Series.prototype.copyFrom = function (source) {
        this.bullets.copyFrom(source.bullets);
        this.bulletsContainer.copyFrom(source.bulletsContainer);
        this.calculatePercent = source.calculatePercent;
        this.usePercentHack = source.usePercentHack;
        this.simplifiedProcessing = source.simplifiedProcessing;
        _super.prototype.copyFrom.call(this, source);
    };
    /**
     * Displays a modal or console message with error, and halts any further
     * processing of this element.
     *
     * @param e Error
     */
    Series.prototype.raiseCriticalError = function (e) {
        if (this._chart && this._chart.modal) {
            this._chart.modal.content = this._chart.adapter.apply("criticalError", e).message;
            this._chart.modal.closable = false;
            if (!options.suppressErrors) {
                this._chart.modal.open();
            }
            this._chart.disabled = true;
        }
        if (options.verbose) {
            console.log(e);
        }
    };
    /**
     * Applies filters to the element.
     *
     * @ignore Exclude from docs
     */
    Series.prototype.applyFilters = function () {
        var _this = this;
        _super.prototype.applyFilters.call(this);
        this.bulletsContainer.filters.clear();
        // copyFrom of a list copies, does not clone
        $iter.each(this.filters.iterator(), function (filter) {
            _this.bulletsContainer.filters.push(filter.clone());
        });
    };
    Object.defineProperty(Series.prototype, "heatRules", {
        /**
         * A list of heat rules to apply to series' elements based on the value
         * of the data item.
         *
         * Heat rules can be any "numeric" (including `Color`) property, and can also
         * be applied to child objects of series, like columns, bullets, etc.
         *
         * E.g.:
         *
         * ```TypeScript
         * series.heatRules.push({
         *  "target": series.columns.template,
         *  "property": "fill",
         *  "min": am4core.color("#F5DBCB"),
         *  "max": am4core.color("#ED7B84"),
         *  "dataField": "valueY"
         *});
         *```
         * ```Javacript
         * series.heatRules.push({
         *  "target": series.columns.template,
         *  "property": "fill",
         *  "min": am4core.color("#F5DBCB"),
         *  "max": am4core.color("#ED7B84"),
         *  "dataField": "valueY"
         *});
         *```
         *```JSON
         *{
         *  // ...
         *  "series": [{
         *    "type": "ColumnSeries",
         *    "heatRules": [{
         *      "target": "columns.template",
         *      "property": "fill",
         *      "min": "#F5DBCB",
         *      "max": "#ED7B84",
         *      "dataField": "valueY"
         *    }]
         *  }]
         *}
         *```
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/series/#Heat_maps} for more about heat rules
         * @return  Heat rules
         */
        get: function () {
            var _this = this;
            if (!this._heatRules) {
                this._heatRules = new List();
                this._heatRules.events.on("inserted", function (event) {
                    var heatRule = event.newValue;
                    var target = heatRule.target;
                    if (target) {
                        var dataField_1 = heatRule.dataField;
                        if (!$type.hasValue(dataField_1)) {
                            dataField_1 = "value";
                        }
                        var seriesDataItem_1 = _this.dataItem;
                        var property_1 = heatRule.property;
                        var minValue = $type.toNumber(heatRule.minValue);
                        var maxValue = $type.toNumber(heatRule.maxValue);
                        if (!$type.isNumber(minValue) && !$type.isNumber(maxValue)) {
                            _this.dataItem.events.on("calculatedvaluechanged", function (event) {
                                if (event.property == dataField_1) {
                                    $iter.each(_this.dataItems.iterator(), function (dataItem) {
                                        var foundSprite = false;
                                        $array.each(dataItem.sprites, function (sprite) {
                                            if (sprite.clonedFrom == target) {
                                                var anySprite = sprite;
                                                anySprite[property_1] = anySprite[property_1];
                                                foundSprite = true;
                                            }
                                        });
                                        if (!foundSprite) {
                                            $array.each(dataItem.sprites, function (sprite) {
                                                if (sprite instanceof Container) {
                                                    $iter.each(sprite.children.iterator(), function (child) {
                                                        if (child.className == target.className) {
                                                            var anyChild = child;
                                                            anyChild[property_1] = anyChild[property_1];
                                                        }
                                                        // giveup here
                                                        else if (child instanceof Container) {
                                                            child.deepInvalidate();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        _this.dataItems.template.events.on("workingvaluechanged", function (event) {
                            if (event.property == dataField_1) {
                                var dataItem = event.target;
                                var foundSprite_1 = false;
                                $array.each(dataItem.sprites, function (sprite) {
                                    if (sprite.clonedFrom == target) {
                                        var anySprite = sprite;
                                        anySprite[property_1] = anySprite[property_1];
                                        foundSprite_1 = true;
                                    }
                                });
                                if (!foundSprite_1) {
                                    $array.each(dataItem.sprites, function (sprite) {
                                        if (sprite instanceof Container) {
                                            $iter.each(sprite.children.iterator(), function (child) {
                                                if (child.className == target.className) {
                                                    var anyChild = child;
                                                    anyChild[property_1] = anyChild[property_1];
                                                }
                                                // givup here
                                                else if (child instanceof Container) {
                                                    child.deepInvalidate();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                        target.adapter.add(property_1, function (value, ruleTarget, property) {
                            var minValue = $type.toNumber(heatRule.minValue);
                            var maxValue = $type.toNumber(heatRule.maxValue);
                            var min = heatRule.min;
                            var max = heatRule.max;
                            if (ruleTarget instanceof Sprite) {
                                var anySprite = ruleTarget;
                                var propertyField = anySprite.propertyFields[property];
                                if (propertyField && ruleTarget.dataItem) {
                                    var dataContext = ruleTarget.dataItem.dataContext;
                                    if (dataContext && $type.hasValue(dataContext[propertyField])) {
                                        return value;
                                    }
                                }
                            }
                            var dataItem = ruleTarget.dataItem;
                            if (!$type.isNumber(minValue)) {
                                minValue = seriesDataItem_1.values[dataField_1].low;
                            }
                            if (!$type.isNumber(maxValue)) {
                                maxValue = seriesDataItem_1.values[dataField_1].high;
                            }
                            if (dataItem) {
                                var fieldValues = dataItem.values[dataField_1];
                                if (fieldValues) {
                                    var workingValue = dataItem.getActualWorkingValue(dataField_1);
                                    if ($type.hasValue(min) && $type.hasValue(max) && $type.isNumber(minValue) && $type.isNumber(maxValue) && $type.isNumber(workingValue)) {
                                        var percent = void 0;
                                        if (heatRule.logarithmic) {
                                            percent = (Math.log(workingValue) * Math.LOG10E - Math.log(minValue) * Math.LOG10E) / ((Math.log(maxValue) * Math.LOG10E - Math.log(minValue) * Math.LOG10E));
                                        }
                                        else {
                                            percent = (workingValue - minValue) / (maxValue - minValue);
                                        }
                                        if ($type.isNumber(workingValue) && (!$type.isNumber(percent) || Math.abs(percent) == Infinity)) {
                                            percent = 0.5;
                                        }
                                        // fixes problems if all values are the same
                                        if ($type.isNumber(min)) {
                                            return min + (max - min) * percent;
                                        }
                                        else if (min instanceof Color) {
                                            return new Color($colors.interpolate(min.rgb, max.rgb, percent));
                                        }
                                    }
                                }
                            }
                            return value;
                        });
                    }
                });
            }
            return this._heatRules;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    Series.prototype.processConfig = function (config) {
        var heatRules;
        if (config) {
            // Set up bullets
            if ($type.hasValue(config.bullets) && $type.isArray(config.bullets)) {
                for (var i = 0, len = config.bullets.length; i < len; i++) {
                    var bullets = config.bullets[i];
                    if (!$type.hasValue(bullets.type)) {
                        bullets.type = "Bullet";
                    }
                }
            }
            // Let's take heatRules out of the config, so that we can process
            // them later, when bullets are already there
            if ($type.hasValue(config.heatRules) && $type.isArray(config.heatRules)) {
                heatRules = config.heatRules;
                delete config.heatRules;
            }
        }
        _super.prototype.processConfig.call(this, config);
        // Process heat rules again, when all other elements are ready
        if (heatRules) {
            for (var i = 0, len = heatRules.length; i < len; i++) {
                var rule = heatRules[i];
                // Resolve target
                var target = this;
                if ($type.hasValue(rule.target) && $type.isString(rule.target)) {
                    // Check if we can find this element by id
                    if (this.map.hasKey(rule.target)) {
                        target = this.map.getKey(rule.target);
                    }
                    else {
                        var parts = rule.target.split(".");
                        for (var x = 0; x < parts.length; x++) {
                            if (target instanceof List) {
                                var listitem = target.getIndex($type.toNumber(parts[x]));
                                if (!listitem) {
                                    target = target[parts[x]];
                                }
                                else {
                                    target = listitem;
                                }
                            }
                            else {
                                var maybeIndex = parts[x].match(/^(.*)\[([0-9]+)\]/);
                                if (maybeIndex) {
                                    if (target[maybeIndex[1]] instanceof List) {
                                        target = target[maybeIndex[1]].getIndex($type.toNumber(maybeIndex[2]));
                                    }
                                    else {
                                        target = target[maybeIndex[1]][$type.toNumber(maybeIndex[2])];
                                    }
                                }
                                else {
                                    target = target[parts[x]];
                                }
                            }
                        }
                    }
                }
                rule.target = target;
                // Resolve colors and percents
                if ($type.hasValue(rule.min)) {
                    rule.min = this.maybeColorOrPercent(rule.min);
                }
                if ($type.hasValue(rule.max)) {
                    rule.max = this.maybeColorOrPercent(rule.max);
                }
            }
            _super.prototype.processConfig.call(this, {
                heatRules: heatRules
            });
        }
    };
    /**
     * Returns visibility value
     * @ignore
     */
    /*
        protected getVisibility(): boolean {
            let hidden = this.getPropertyValue("hidden");
            if (hidden) {
                return false;
            }
            else {
                return super.getVisibility();
            }
        }*/
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    Series.prototype.configOrder = function (a, b) {
        if (a == b) {
            return 0;
        }
        // Must come last
        else if (a == "heatRules") {
            return 1;
        }
        else if (b == "heatRules") {
            return -1;
        }
        else {
            return _super.prototype.configOrder.call(this, a, b);
        }
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
    Series.prototype.setVisibility = function (value) {
        _super.prototype.setVisibility.call(this, value);
        this.bulletsContainer.visible = value;
    };
    return Series;
}(Component));
export { Series };
/**
 * Register class, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Series"] = Series;
registry.registeredClasses["SeriesDataItem"] = SeriesDataItem;
//# sourceMappingURL=Series.js.map