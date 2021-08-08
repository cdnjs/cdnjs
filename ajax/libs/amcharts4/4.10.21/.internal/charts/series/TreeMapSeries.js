/**
 * TreeMap series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem } from "./ColumnSeries";
import { visualProperties } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $type from "../../core/utils/Type";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
import * as $object from "../../core/utils/Object";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[TreeMapSeries]].
 *
 * @see {@link DataItem}
 */
var TreeMapSeriesDataItem = /** @class */ (function (_super) {
    __extends(TreeMapSeriesDataItem, _super);
    /**
     * Constructor
     */
    function TreeMapSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "TreeMapSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "parentName", {
        /**
         * Data for the this particular item.
         *
         * @param value  Item's data
         */
        //public set dataContext(value: Object) {
        //	this._dataContext = value;
        //}
        /**
         * @return Item's data
         */
        /*
       public get dataContext(): Object {
           // It's because data of tree series is TreeMapDataItems.
           if (this._dataContext) {
               return (<any>this._dataContext).dataContext;
           }
       }*/
        /**
         * The name of the item's parent item.
         *
         * @return Parent name
         */
        get: function () {
            var treeMapDataItem = this.treeMapDataItem;
            if (treeMapDataItem && treeMapDataItem.parent) {
                return treeMapDataItem.parent.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "value", {
        /**
         * Item's numeric value.
         *
         * @readonly
         * @return Value
         */
        get: function () {
            var treeMapDataItem = this.treeMapDataItem;
            if (treeMapDataItem) {
                return treeMapDataItem.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "treeMapDataItem", {
        /**
         * A corresponding data item from the tree map.
         *
         * @readonly
         * @return Data item
         */
        get: function () {
            return this._dataContext;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hides the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param toValue   A value to set to `fields` when hiding
     * @param fields    A list of data fields to set value to `toValue`
     */
    TreeMapSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        var treeMapDataItem = this.treeMapDataItem;
        if (treeMapDataItem) {
            treeMapDataItem.hide(duration);
        }
        return _super.prototype.hide.call(this, duration, delay, toValue, fields);
    };
    /**
     * Shows the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param fields    A list of fields to set values of
     */
    TreeMapSeriesDataItem.prototype.show = function (duration, delay, fields) {
        var treeMapDataItem = this.treeMapDataItem;
        if (treeMapDataItem) {
            treeMapDataItem.show(duration, delay, fields);
        }
        return _super.prototype.show.call(this, duration, delay, fields);
    };
    return TreeMapSeriesDataItem;
}(ColumnSeriesDataItem));
export { TreeMapSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines Series for a TreeMap chart.
 *
 * @see {@link ITreeMapSeriesEvents} for a list of available Events
 * @see {@link ITreeMapSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var TreeMapSeries = /** @class */ (function (_super) {
    __extends(TreeMapSeries, _super);
    /**
     * Constructor
     */
    function TreeMapSeries() {
        var _this = _super.call(this) || this;
        _this.className = "TreeMapSeries";
        _this.applyTheme();
        _this.fillOpacity = 1;
        _this.strokeOpacity = 1;
        _this.minBulletDistance = 0;
        _this.columns.template.tooltipText = "{parentName} {name}: {value}"; //@todo add format number?
        _this.columns.template.configField = "config";
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("background");
        _this.dataFields.openValueX = "x0";
        _this.dataFields.valueX = "x1";
        _this.dataFields.openValueY = "y0";
        _this.dataFields.valueY = "y1";
        _this.sequencedInterpolation = false;
        _this.showOnInit = false;
        // otherwise nodes don't stack nicely to each other
        _this.columns.template.pixelPerfect = false;
        return _this;
    }
    /**
     * Processes data item.
     *
     * @param dataItem     Data item
     * @param dataContext  Raw data
     * @param index        Index of the data item
     */
    TreeMapSeries.prototype.processDataItem = function (dataItem, dataContext) {
        dataContext.seriesDataItem = dataItem; // save a reference here. dataContext is TreeMapDataItem and we need to know dataItem sometimes
        _super.prototype.processDataItem.call(this, dataItem, dataContext);
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    TreeMapSeries.prototype.createDataItem = function () {
        return new TreeMapSeriesDataItem();
    };
    /**
     * Shows series.
     *
     * @param duration  Duration of fade in (ms)
     * @return Animation
     */
    TreeMapSeries.prototype.show = function (duration) {
        if (this.preventShow) {
            return;
        }
        var interpolationDuration = this.defaultState.transitionDuration;
        if ($type.isNumber(duration)) {
            interpolationDuration = duration;
        }
        this.dataItems.each(function (dataItem) {
            //dataItem.treeMapDataItem.setWorkingValue("value", dataItem.treeMapDataItem.values.value.value);
            dataItem.show(duration);
        });
        return _super.prototype.showReal.call(this, interpolationDuration);
    };
    /**
     * Hides series.
     *
     * @param duration  Duration of fade out (ms)
     * @return Animation
     */
    TreeMapSeries.prototype.hide = function (duration) {
        var interpolationDuration = this.defaultState.transitionDuration;
        if ($type.isNumber(duration)) {
            interpolationDuration = duration;
        }
        var animation = _super.prototype.hideReal.call(this, interpolationDuration);
        this.dataItems.each(function (dataItem) {
            //dataItem.treeMapDataItem.setWorkingValue("value", 0);
            dataItem.hide(duration);
        });
        return animation;
    };
    /**
     * Process values.
     *
     * @ignore Exclude from docs
     */
    TreeMapSeries.prototype.processValues = function () {
        // Just overriding so that inherited method does not kick in.
    };
    /**
     * Returns relative start location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    TreeMapSeries.prototype.getStartLocation = function (dataItem) {
        return 0;
    };
    /**
     * Returns relative end location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    TreeMapSeries.prototype.getEndLocation = function (dataItem) {
        return 1;
    };
    /**
     * @ignore
     */
    TreeMapSeries.prototype.dataChangeUpdate = function () {
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    TreeMapSeries.prototype.processConfig = function (config) {
        if (config) {
            // Add empty data fields if the they are not set, so that XYSeries
            // dataField check does not result in error.
            if (!$type.hasValue(config.dataFields) || !$type.isObject(config.dataFields)) {
                config.dataFields = {};
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    TreeMapSeries.prototype.createLegendMarker = function (marker) {
        var w = marker.pixelWidth;
        var h = marker.pixelHeight;
        marker.removeChildren();
        var column = marker.createChild(RoundedRectangle);
        column.shouldClone = false;
        $object.copyProperties(this, column, visualProperties);
        //column.copyFrom(<any>this.columns.template);
        column.padding(0, 0, 0, 0); // if columns will have padding (which is often), legend marker will be very narrow
        column.width = w;
        column.height = h;
        var legendDataItem = marker.dataItem;
        legendDataItem.color = column.fill;
        legendDataItem.colorOrig = column.fill;
    };
    TreeMapSeries.prototype.disableUnusedColumns = function (dataItem) {
        _super.prototype.disableUnusedColumns.call(this, dataItem);
        if (dataItem.column) {
            dataItem.column.__disabled = false;
        }
    };
    return TreeMapSeries;
}(ColumnSeries));
export { TreeMapSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["TreeMapSeries"] = TreeMapSeries;
registry.registeredClasses["TreeMapSeriesDataItem"] = TreeMapSeriesDataItem;
//# sourceMappingURL=TreeMapSeries.js.map