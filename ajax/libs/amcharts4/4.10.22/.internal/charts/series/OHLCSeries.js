/**
 * Candlestick Series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CandlestickSeries, CandlestickSeriesDataItem } from "./CandlestickSeries";
import { visualProperties } from "../../core/Sprite";
import { OHLC } from "../elements/OHLC";
import { registry } from "../../core/Registry";
import * as $object from "../../core/utils/Object";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[OHLCSeries]].
 *
 * @see {@link DataItem}
 */
var OHLCSeriesDataItem = /** @class */ (function (_super) {
    __extends(OHLCSeriesDataItem, _super);
    /**
     * Defines a type of [[Component]] this data item is used for
     * @todo Disabled to work around TS bug (see if we can re-enable it again)
     */
    //public _component!: OHLCSeries;
    /**
     * Constructor
     */
    function OHLCSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "OHLCSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return OHLCSeriesDataItem;
}(CandlestickSeriesDataItem));
export { OHLCSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a candlestick graph.
 *
 * @see {@link IOHLCSeriesEvents} for a list of available Events
 * @see {@link IOHLCSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var OHLCSeries = /** @class */ (function (_super) {
    __extends(OHLCSeries, _super);
    /**
     * Constructor
     */
    function OHLCSeries() {
        var _this = _super.call(this) || this;
        _this.className = "OHLCSeries";
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    OHLCSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("OHLC Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    OHLCSeries.prototype.createDataItem = function () {
        return new OHLCSeriesDataItem();
    };
    OHLCSeries.prototype.validateCandlestick = function (dataItem) {
        var column = dataItem.column;
        if (column) {
            var openLine_1 = column.openLine;
            var highLowLine_1 = column.highLowLine;
            var closeLine_1 = column.closeLine;
            if (this.baseAxis == this.xAxis) {
                var x = column.pixelWidth / 2;
                highLowLine_1.x = x;
                // TODO can these be removed ?
                dataItem.getWorkingValue(this.yOpenField);
                dataItem.getWorkingValue(this.yField);
                var yOpen = this.yAxis.getY(dataItem, this.yOpenField);
                var yClose = this.yAxis.getY(dataItem, this.yField);
                var yLow = this.yAxis.getY(dataItem, this.yLowField);
                var yHigh = this.yAxis.getY(dataItem, this.yHighField);
                var pixelY = column.pixelY;
                openLine_1.y1 = yOpen - pixelY;
                openLine_1.y2 = yOpen - pixelY;
                openLine_1.x1 = 0;
                openLine_1.x2 = x;
                closeLine_1.y1 = yClose - pixelY;
                closeLine_1.y2 = yClose - pixelY;
                closeLine_1.x1 = x;
                closeLine_1.x2 = 2 * x;
                highLowLine_1.y1 = yHigh - pixelY;
                highLowLine_1.y2 = yLow - pixelY;
            }
            if (this.baseAxis == this.yAxis) {
                var y = column.pixelHeight / 2;
                highLowLine_1.y = y;
                // TODO can these be removed ?
                dataItem.getWorkingValue(this.xOpenField);
                dataItem.getWorkingValue(this.xField);
                var xOpen = this.xAxis.getX(dataItem, this.xOpenField);
                var xClose = this.xAxis.getX(dataItem, this.xField);
                var xLow = this.xAxis.getX(dataItem, this.xLowField);
                var xHigh = this.xAxis.getX(dataItem, this.xHighField);
                var pixelX = column.pixelX;
                openLine_1.x1 = xOpen - pixelX;
                openLine_1.x2 = xOpen - pixelX;
                openLine_1.y1 = y;
                openLine_1.y2 = 2 * y;
                closeLine_1.x1 = xClose - pixelX;
                closeLine_1.x2 = xClose - pixelX;
                closeLine_1.y1 = 0;
                closeLine_1.y2 = y;
                highLowLine_1.x1 = xHigh - pixelX;
                highLowLine_1.x2 = xLow - pixelX;
            }
            $iter.each(this.axisRanges.iterator(), function (axisRange) {
                var rangeColumn = dataItem.rangesColumns.getKey(axisRange.uid);
                if (rangeColumn) {
                    var rangeOpenLine = rangeColumn.openLine;
                    rangeOpenLine.x = openLine_1.x;
                    rangeOpenLine.y = openLine_1.y;
                    rangeOpenLine.x1 = openLine_1.x1;
                    rangeOpenLine.x2 = openLine_1.x2;
                    rangeOpenLine.y1 = openLine_1.y1;
                    rangeOpenLine.y2 = openLine_1.y2;
                    var rangeCloseLine = rangeColumn.closeLine;
                    rangeCloseLine.x = closeLine_1.x;
                    rangeCloseLine.y = closeLine_1.y;
                    rangeCloseLine.x1 = closeLine_1.x1;
                    rangeCloseLine.x2 = closeLine_1.x2;
                    rangeCloseLine.y1 = closeLine_1.y1;
                    rangeCloseLine.y2 = closeLine_1.y2;
                    var rangeHighLowLine = rangeColumn.highLowLine;
                    rangeHighLowLine.x = highLowLine_1.x;
                    rangeHighLowLine.y = highLowLine_1.y;
                    rangeHighLowLine.x1 = highLowLine_1.x1;
                    rangeHighLowLine.x2 = highLowLine_1.x2;
                    rangeHighLowLine.y1 = highLowLine_1.y1;
                    rangeHighLowLine.y2 = highLowLine_1.y2;
                }
            });
        }
    };
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    OHLCSeries.prototype.createLegendMarker = function (marker) {
        var w = marker.pixelWidth;
        var h = marker.pixelHeight;
        marker.removeChildren();
        var column = marker.createChild(OHLC);
        column.shouldClone = false;
        column.copyFrom(this.columns.template);
        var cw;
        var ch;
        var openLine = column.openLine;
        var closeLine = column.closeLine;
        var highLowLine = column.highLowLine;
        if (this.baseAxis == this.yAxis) {
            cw = w / 3;
            ch = h;
            highLowLine.y = h / 2;
            highLowLine.x2 = w;
            openLine.x = w / 3 * 2;
            openLine.y2 = h / 2;
            closeLine.x = w / 3;
            closeLine.y2 = h;
            closeLine.y1 = h / 2;
        }
        else {
            cw = w;
            ch = h / 3;
            highLowLine.x = w / 2;
            highLowLine.y2 = h;
            openLine.y = h / 3 * 2;
            openLine.x2 = w / 2;
            closeLine.y = h / 3;
            closeLine.x2 = w;
            closeLine.x1 = w / 2;
        }
        column.width = cw;
        column.height = ch;
        $object.copyProperties(this, marker, visualProperties);
        $object.copyProperties(this.columns.template, column, visualProperties);
        column.stroke = this.riseFromOpenState.properties.stroke;
        var legendDataItem = marker.dataItem;
        legendDataItem.color = column.stroke;
        legendDataItem.colorOrig = column.stroke;
    };
    /**
     * Returns an element to use for Candlestick
     * @ignore
     * @return Element.
     */
    OHLCSeries.prototype.createColumnTemplate = function () {
        return new OHLC();
    };
    return OHLCSeries;
}(CandlestickSeries));
export { OHLCSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["OHLCSeries"] = OHLCSeries;
registry.registeredClasses["OHLCSeriesDataItem"] = OHLCSeriesDataItem;
//# sourceMappingURL=OHLCSeries.js.map