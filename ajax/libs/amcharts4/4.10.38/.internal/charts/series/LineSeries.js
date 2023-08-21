/**
 * Line series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYSeries, XYSeriesDataItem } from "./XYSeries";
import { visualProperties } from "../../core/Sprite";
import { Container } from "../../core/Container";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { LineSeriesSegment } from "./LineSeriesSegment";
import { ValueAxis } from "../axes/ValueAxis";
import { DateAxis } from "../axes/DateAxis";
import { DurationAxis } from "../axes/DurationAxis";
import { CategoryAxis } from "../axes/CategoryAxis";
import { registry } from "../../core/Registry";
import { Line } from "../../core/elements/Line";
import { Label } from "../../core/elements/Label";
import { Rectangle } from "../../core/elements/Rectangle";
import * as $iter from "../../core/utils/Iterator";
import * as $object from "../../core/utils/Object";
import * as $type from "../../core/utils/Type";
import * as $array from "../../core/utils/Array";
import { Bullet } from "../elements/Bullet";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[LineSeries]].
 *
 * @see {@link DataItem}
 */
var LineSeriesDataItem = /** @class */ (function (_super) {
    __extends(LineSeriesDataItem, _super);
    /**
     * Constructor
     */
    function LineSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "LineSeriesDataItem";
        return _this;
    }
    return LineSeriesDataItem;
}(XYSeriesDataItem));
export { LineSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a line graph.
 *
 * @see {@link ILineSeriesEvents} for a list of available Events
 * @see {@link ILineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var LineSeries = /** @class */ (function (_super) {
    __extends(LineSeries, _super);
    /**
     * Constructor
     */
    function LineSeries() {
        var _this = _super.call(this) || this;
        /**
         * Minimum distance in pixels between two adjacent points.
         *
         * If the distance is less than this setting, a point is skipped.
         *
         * This allows acceptable performance with huge amounts of data points.
         *
         * @default 0.5
         */
        _this.minDistance = 0.5;
        _this.segments = new ListTemplate(_this.createSegment());
        _this.segments.template.applyOnClones = true;
        _this._disposers.push(new ListDisposer(_this.segments));
        _this._disposers.push(_this.segments.template);
        _this._segmentsIterator = new $iter.ListIterator(_this.segments, function () { return _this.segments.create(); });
        _this._segmentsIterator.createNewItems = true;
        _this.className = "LineSeries";
        _this.strokeOpacity = 1;
        _this.fillOpacity = 0;
        _this.connect = true;
        _this.tensionX = 1;
        _this.tensionY = 1;
        _this.autoGapCount = 1.1;
        _this.smoothing = "bezier";
        _this.segmentsContainer = _this.mainContainer.createChild(Container);
        _this.segmentsContainer.isMeasured = false;
        // line series might have multiple segments and it has a separate sprite for fill and stroke for each segment. So we need to observe all the changes on series and set them on the segments
        // todo: we need list here, otherwise everything will be redrawn event on change of properties like tooltipX or similar.
        // this.addEventListener(SpriteEvent.PROPERTY_CHANGED, this.validateDataElements, false, this);
        _this.bulletsContainer.toFront();
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    LineSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Line Series");
        }
    };
    /**
     * @ignore
     */
    LineSeries.prototype.createSegment = function () {
        return new LineSeriesSegment();
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    LineSeries.prototype.createDataItem = function () {
        return new LineSeriesDataItem();
    };
    /**
     * Inits data item's working values.
     *
     * @param dataItem  Data item
     * @param index     Data item's index
     */
    LineSeries.prototype.setInitialWorkingValues = function (dataItem) {
        // this makes data items animate when added
        var yAxis = this._yAxis.get();
        var xAxis = this._xAxis.get();
        if (this.appeared && this.visible) {
            var previousDataItem = this.dataItems.getIndex(dataItem.index - 1);
            dataItem.component = this; // as these values are set before, we don't know component yet
            if (this.baseAxis == xAxis) {
                if (yAxis instanceof ValueAxis) {
                    var initialY = yAxis.minZoomed;
                    if (previousDataItem) {
                        initialY = previousDataItem.values["valueY"].workingValue;
                    }
                    // this makes line animate from previous point to newly added point
                    dataItem.setWorkingValue("valueY", initialY, 0);
                    dataItem.setWorkingValue("valueY", dataItem.values.valueY.value);
                    if (xAxis instanceof DateAxis) {
                        dataItem.setWorkingLocation("dateX", dataItem.locations.dateX - 1, 0); // instantly move it to previous
                        dataItem.setWorkingLocation("dateX", dataItem.locations.dateX); // animate to it's location
                    }
                    else if (xAxis instanceof DurationAxis) {
                        if (previousDataItem) {
                            var value = dataItem.valueX;
                            dataItem.setWorkingValue("valueX", previousDataItem.valueX, 0); // instantly move it to previous
                            dataItem.setWorkingValue("valueX", value); // animate to new value
                        }
                    }
                }
            }
            if (this.baseAxis == yAxis) {
                if (xAxis instanceof ValueAxis) {
                    var initialX = xAxis.minZoomed;
                    if (previousDataItem) {
                        initialX = previousDataItem.values["valueX"].workingValue;
                    }
                    dataItem.setWorkingValue("valueX", initialX, 0);
                    dataItem.setWorkingValue("valueX", dataItem.values.valueX.value);
                    if (yAxis instanceof DateAxis) {
                        dataItem.setWorkingLocation("dateY", dataItem.locations.dateX - 1, 0); // instantly move it to previous
                        dataItem.setWorkingLocation("dateY", dataItem.locations.dateY); // animate to it's location
                    }
                    else if (yAxis instanceof DurationAxis) {
                        if (previousDataItem) {
                            var value = dataItem.valueY;
                            dataItem.setWorkingValue("valueY", previousDataItem.valueY, 0); // instantly move it to previous
                            dataItem.setWorkingValue("valueY", value); // animate to new value
                        }
                    }
                }
            }
        }
        else {
            if (this.baseAxis == xAxis) {
                if (yAxis instanceof ValueAxis) {
                    if (xAxis instanceof DateAxis) {
                        dataItem.setWorkingLocation("dateX", dataItem.locations.dateX);
                    }
                    if (xAxis instanceof CategoryAxis) {
                        dataItem.setWorkingLocation("categoryX", dataItem.locations.categoryX);
                    }
                }
            }
            if (this.baseAxis == yAxis) {
                if (xAxis instanceof ValueAxis) {
                    if (yAxis instanceof DateAxis) {
                        dataItem.setWorkingLocation("dateY", dataItem.locations.dateY);
                    }
                    if (yAxis instanceof CategoryAxis) {
                        dataItem.setWorkingLocation("categoryY", dataItem.locations.categoryY);
                    }
                }
            }
        }
    };
    /**
     * Updates corresponding legend data item with current values.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    LineSeries.prototype.updateLegendValue = function (dataItem, notRange) {
        _super.prototype.updateLegendValue.call(this, dataItem, notRange);
        //This is hack to save some methos, used to set tooltip color source only
        if (dataItem && dataItem.segment) {
            this.tooltipColorSource = dataItem.segment;
        }
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    LineSeries.prototype.validate = function () {
        var _this = this;
        _super.prototype.validate.call(this);
        if (this.xAxis && this.yAxis) {
            this._segmentsIterator.reset();
            this.openSegmentWrapper(this._adjustedStartIndex);
            $iter.each(this.axisRanges.iterator(), function (range) {
                _this.openSegmentWrapper(_this._adjustedStartIndex, range);
            });
            $iter.each(this._segmentsIterator.iterator(), function (segment) {
                segment.__disabled = true;
            });
        }
    };
    /**
     * [sliceData description]
     *
     * @todo Description
     */
    LineSeries.prototype.sliceData = function () {
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        // we need extra one item to both sides with values for line series, otherwise the line will not continue out of bounds of the chart while scrolling
        // find first to the left
        // TODO use iterator instead
        for (var i = this.startIndex - 1; i >= 0; i--) {
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem && dataItem.hasValue(this._xValueFields) && dataItem.hasValue(this._yValueFields)) {
                startIndex = i;
                break;
            }
        }
        this._adjustedStartIndex = this.findAdjustedIndex(startIndex, ["stroke", "strokeWidth", "strokeDasharray", "strokeOpacity", "fill", "fillOpacity", "opacity"]);
        // find first to the right
        // TODO use iterator instead
        for (var i = this.endIndex, len = this.dataItems.length; i < len; i++) {
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem && dataItem.hasValue(this._xValueFields) && dataItem.hasValue(this._yValueFields)) {
                endIndex = i + 1;
                break;
            }
        }
        this._workingStartIndex = startIndex;
        this._workingEndIndex = endIndex;
    };
    /**
     * @ignore
     */
    LineSeries.prototype.findAdjustedIndex = function (adjustedIndex, properties) {
        var _this = this;
        var propertyFields = this.propertyFields;
        var startIndex = adjustedIndex;
        $array.each(properties, function (property) {
            if ($type.hasValue(propertyFields[property])) {
                for (var i = startIndex; i >= 0; i--) {
                    var dataItem = _this.dataItems.getIndex(i);
                    if (dataItem) {
                        if ($type.hasValue(dataItem.properties[property])) {
                            if (adjustedIndex > i) {
                                adjustedIndex = i;
                            }
                            break;
                        }
                    }
                }
            }
        });
        return adjustedIndex;
    };
    /**
     * Wraps openSegment call with iterative solution to prevent stack overflow
     *
     * @param openIndex  Index
     * @param axisRange  Range
     */
    LineSeries.prototype.openSegmentWrapper = function (openIndex, axisRange) {
        var params = {
            "index": openIndex,
            "axisRange": axisRange
        };
        do {
            params = this.openSegment(params.index, params.axisRange);
        } while (params);
    };
    LineSeries.prototype.getSegment = function () {
        var segment = this._segmentsIterator.getFirst();
        segment.series = this;
        if (segment.isDisposed()) {
            this.segments.removeValue(segment);
            return this.getSegment();
        }
        return segment;
    };
    /**
     * [openSegment description]
     *
     * @todo Description
     * @param openIndex  [description]
     * @param axisRange  [description]
     */
    LineSeries.prototype.openSegment = function (openIndex, axisRange) {
        var addToClose = false;
        var points = [];
        openIndex = Math.min(openIndex, this.dataItems.length);
        var endIndex = Math.min(this._workingEndIndex, this.dataItems.length);
        this._workingEndIndex = Math.min(this._workingEndIndex, this.dataItems.length);
        var closeIndex;
        var propertiesChanged = false;
        var segment = this.getSegment();
        segment.strokeDasharray = undefined;
        segment.__disabled = false;
        if (axisRange) {
            segment.parent = axisRange.contents;
            $object.copyProperties(axisRange.contents, segment, visualProperties);
        }
        else {
            $object.copyProperties(this, segment, visualProperties);
            segment.filters.clear();
            segment.parent = this.segmentsContainer;
        }
        this.group.node.removeAttribute("fill");
        var connect = this.connect;
        var valuesFound = false; // some flag to avoid multiple closes if no values found
        for (var i = openIndex; i < endIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            dataItem.segment = segment;
            if (dataItem.hasProperties) {
                // if this is first item of segment
                if (i == openIndex) {
                    this.updateSegmentProperties(dataItem.properties, segment);
                }
                else {
                    // this time we only need to know if properties changed, so we don't pass segment
                    propertiesChanged = this.updateSegmentProperties(dataItem.properties, segment, true);
                }
            }
            if (dataItem.hasValue(this._xValueFields) && dataItem.hasValue(this._yValueFields)) {
                this.addPoints(points, dataItem, this.xField, this.yField);
                valuesFound = true;
            }
            else {
                // if no values in first data item, go to next
                if (i == openIndex) {
                    continue;
                }
                else {
                    // stop cycle
                    if (!connect && valuesFound) {
                        closeIndex = i;
                        break;
                    }
                }
            }
            closeIndex = i;
            if (this.baseAxis instanceof DateAxis) {
                var next = this.dataItems.getIndex(i + 1);
                if (next && this.baseAxis.makeGap(next, dataItem)) {
                    addToClose = true;
                    break;
                }
            }
            if (propertiesChanged) {
                break;
            }
        }
        return this.closeSegment(segment, points, openIndex, closeIndex, axisRange, addToClose);
    };
    /**
     * [addPoints description]
     *
     * @todo Description
     * @param points    [description]
     * @param dataItem  [description]
     * @param xField    [description]
     * @param yField    [description]
     * @param backwards [description]
     */
    LineSeries.prototype.addPoints = function (points, dataItem, xField, yField, backwards) {
        var point = this.getPoint(dataItem, xField, yField, dataItem.workingLocations[xField], dataItem.workingLocations[yField]);
        if (!backwards) {
            dataItem.point = point;
        }
        points.push(point);
    };
    /**
     * [closeSegment description]
     *
     * @todo Description
     * @param segment    [description]
     * @param points     [description]
     * @param openIndex  [description]
     * @param closeIndex [description]
     * @param axisRange  [description]
     */
    LineSeries.prototype.closeSegment = function (segment, points, openIndex, closeIndex, axisRange, add) {
        var closePoints = [];
        if (this.dataFields[this._xOpenField] ||
            this.dataFields[this._yOpenField] ||
            this.stacked) {
            for (var i = closeIndex; i >= openIndex; i--) {
                var dataItem = this.dataItems.getIndex(i);
                if (dataItem.hasValue(this._xValueFields) && dataItem.hasValue(this._yValueFields)) { // not sure, this means that open point will only be added if value is also set for this point, but maybe it's ok.
                    this.addPoints(closePoints, dataItem, this.xOpenField, this.yOpenField, true);
                }
            }
        }
        else {
            var baseAxis = this.baseAxis;
            var count = points.length;
            var xAxis = this.xAxis;
            var yAxis = this.yAxis;
            if (count > 0) {
                if (baseAxis == xAxis) {
                    closePoints.push({ x: points[count - 1].x, y: yAxis.basePoint.y }); // last x
                    closePoints.push({ x: points[0].x, y: yAxis.basePoint.y }); // first x
                }
                else {
                    closePoints.push({ x: xAxis.basePoint.x, y: points[count - 1].y }); // last y
                    closePoints.push({ x: xAxis.basePoint.x, y: points[0].y }); // first y
                }
            }
        }
        this.drawSegment(segment, points, closePoints);
        if (add) {
            closeIndex++;
        }
        if (closeIndex < this._workingEndIndex - 1) {
            return { "index": closeIndex, "axisRange": axisRange };
        }
        else {
            return null;
        }
    };
    /**
     * Draws the line segment.
     *
     * @param segment     Segment
     * @param points      Segment points
     * @param closePoints Segment close points
     */
    LineSeries.prototype.drawSegment = function (segment, points, closePoints) {
        segment.drawSegment(points, closePoints, this.tensionX, this.tensionY);
    };
    /**
     * Segement will get its colors from `this.dataItem`, as thats how
     * `getPropertyValue()` method works.
     *
     * We pass `lineSeriesDataItem.properties` as item here each time when a flag
     * `hasProperties` is set to `true` on data item (this means it can contain
     * some properties set).
     *
     * @param itemProperties  Item properties
     * @param segment         Segment
     * @return Properties changed?
     */
    LineSeries.prototype.updateSegmentProperties = function (itemProperties, segment, checkOnly) {
        var changed = false;
        $object.each(itemProperties, function (propertyName, value) {
            // some value must be defined
            if ($type.hasValue(value)) {
                var currentValue = segment[propertyName];
                var currentValueStr = void 0;
                // current value can be Color, number, anything. So we check if it has toString, otherwise just do String().
                // toString() will return hex if it's color. The only problem is that it will return lowercased hex and if we have uppercase in data, it will think that it changed
                if (currentValue) {
                    if (currentValue.toString) {
                        currentValueStr = currentValue.toString();
                    }
                    else {
                        currentValueStr = currentValue; // not doing String(currentValue) as this will make all Objects the same
                    }
                }
                var valueStr = void 0;
                if (value) {
                    if (value.toString) {
                        valueStr = value.toString();
                    }
                    else {
                        valueStr = value; // not doing String(currentValue) as this will make all Objects the same
                    }
                }
                if (currentValue == value || (currentValueStr != undefined && valueStr != undefined && currentValueStr == valueStr)) {
                    // void
                }
                else {
                    if (!checkOnly) {
                        segment[propertyName] = value;
                    }
                    changed = true;
                }
            }
        });
        return changed;
    };
    Object.defineProperty(LineSeries.prototype, "connect", {
        /**
         * @return Connect?
         */
        get: function () {
            return this.getPropertyValue("connect");
        },
        /**
         * Connect the lines over empty data points?
         *
         * If set to `true` the line will connect two adjacent data points by a
         * straight line. Even if there are data points with missing values
         * in-between.
         *
         * If you set this to `false`, the line will break when there are missing
         * values.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/#Line_series_with_gaps} for more information about this feature
         * @default true
         * @param value  Connect?
         */
        set: function (value) {
            if (this.setPropertyValue("connect", value)) {
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSeries.prototype, "tensionX", {
        /**
         * @return Horizontal tension (0-1)
         */
        get: function () {
            return this.getPropertyValue("tensionX");
        },
        /**
         * Horizontal tension setting of the line (0-1).
         *
         * Can be used to create smoothed lines. It works like this:
         *
         * Accepted values are in the range between 0 and 1. The biggest value (1)
         * will mean that the "tension" is very high, so the line is maximally
         * attracted to the points it connects, hence the straight line.
         *
         * Using smaller numbers will "relax" the tension, creating some curving.
         *
         * The smaller the tension setting, the more relaxed the line and the more
         * wide the curve.
         *
         * This setting is for horizontal tension, meaning the curve will bend in
         * such way that it never goes below or above connecting points. To enable
         * vertical bending as well, use `tensionY`.
         *
         * IMPORTANT: line smoothing works best when data items are placed at regular
         * intervals. For setups where data items are spaced erratically, enabling
         * smoothing might result in awkwardly looking lines.
         *
         * @default 1
         * @param value  Horizontal tension (0-1)
         */
        set: function (value) {
            this.setPropertyValue("tensionX", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSeries.prototype, "tensionY", {
        /**
         * @return Vertical tension (0-1)
         */
        get: function () {
            return this.getPropertyValue("tensionY");
        },
        /**
         * Can be used to create smoothed lines. It works like this:
         *
         * Accepted values are in the range between 0 and 1. The biggest value (1)
         * will mean that the "tension" is very high, so the line is maximally
         * attracted to the points it connects, hence the straight line.
         *
         * Using smaller numbers will "relax" the tension, creating some curving.
         *
         * The smaller the tension setting, the more relaxed the line and the more
         * wide the curve.
         *
         * This setting is for vertical tension, meaning the curve might bend in
         * such way that it will go below or above connected points.
         *
         * Combine this setting with `tensionX` to create beautifully looking
         * smoothed line series.
         *
         * @default 1
         * @param value  Vertical tension (0-1)
         */
        set: function (value) {
            this.setPropertyValue("tensionY", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    LineSeries.prototype.createLegendMarker = function (marker) {
        var _this = this;
        var w = marker.pixelWidth;
        var h = marker.pixelHeight;
        marker.disposeChildren();
        var line = marker.createChild(Line);
        line.shouldClone = false;
        //line.copyFrom(<any>this); coppies events which is not good
        $object.copyProperties(this, line, visualProperties);
        line.x2 = w;
        line.y = h / 2;
        line.y2 = 0.00001;
        line.visible = true;
        if (this.fillOpacity > 0) {
            var fill = marker.createChild(Rectangle);
            //fill.copyFrom(<any>this); coppies events which is not good
            $object.copyProperties(this, fill, visualProperties);
            fill.width = w;
            fill.height = h;
            fill.y = 0;
            fill.strokeOpacity = 0;
            fill.visible = true;
            line.y = 0;
        }
        var legendDataItem = marker.dataItem;
        legendDataItem.color = this.stroke;
        legendDataItem.colorOrig = this.fill;
        $iter.eachContinue(this.bullets.iterator(), function (bullet) {
            if ((bullet instanceof Bullet) && !bullet.copyToLegendMarker) {
                return false;
            }
            var hasLabels = false;
            if (bullet instanceof Container) {
                // do not copy bullets with labels
                $iter.each(bullet.children.iterator(), function (child) {
                    if (child instanceof Label) {
                        hasLabels = true;
                        return true;
                    }
                });
            }
            if (!hasLabels) {
                var clone = bullet.clone();
                clone.parent = marker;
                clone.isMeasured = true;
                clone.tooltipText = undefined;
                clone.x = w / 2;
                if (_this.fillOpacity > 0) {
                    clone.y = 0;
                }
                else {
                    clone.y = h / 2;
                }
                clone.visible = true;
                // otherwise will not transit to color after hiding
                if (!$type.hasValue(clone.fill)) {
                    clone.fill = _this.fill;
                }
                if (!$type.hasValue(clone.stroke)) {
                    clone.stroke = _this.stroke;
                }
                return false;
            }
        });
    };
    /**
     * @ignore
     */
    LineSeries.prototype.disposeData = function () {
        _super.prototype.disposeData.call(this);
        this.segments.clear();
    };
    Object.defineProperty(LineSeries.prototype, "autoGapCount", {
        /**
         * @return Gap count
         */
        get: function () {
            return this.getPropertyValue("autoGapCount");
        },
        /**
         * If `connect = false` and distance between two data points is bigger
         * than `baseInterval * autoGapCount`, a line will break automatically.
         *
         * @since 4.2.4
         * @param  value  Gap count
         */
        set: function (value) {
            this.setPropertyValue("autoGapCount", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSeries.prototype, "smoothing", {
        /**
         * @return Smoothing algorithm
         */
        get: function () {
            return this.getPropertyValue("smoothing");
        },
        /**
         * Smoothing algorithm to be used for lines.
         *
         * Available options: `"bezier"` (default), `"monotoneX"`, and `"monotoneY"`.
         *
         * Monotone options are best suited for data with irregular intervals. Use `"monotoneX"` for
         * horizontal lines, and `"monotoneY"` vertical ones.
         *
         * NOTE: Both "monotone" algorithms will ignore `tensionX` and `tensionY` settings.
         *
         * @since 4.10.0
         * @param  value  Smoothing algorithm
         */
        set: function (value) {
            this.setPropertyValue("smoothing", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return LineSeries;
}(XYSeries));
export { LineSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["LineSeries"] = LineSeries;
registry.registeredClasses["LineSeriesDataItem"] = LineSeriesDataItem;
//# sourceMappingURL=LineSeries.js.map