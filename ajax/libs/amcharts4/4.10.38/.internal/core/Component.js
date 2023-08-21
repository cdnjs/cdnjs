import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "./Container";
import { List, ListDisposer } from "./utils/List";
import { OrderedListTemplate } from "./utils/SortedList";
import { Dictionary } from "./utils/Dictionary";
import { Disposer, MultiDisposer } from "./utils/Disposer";
import { DataSource } from "./data/DataSource";
import { Responsive } from "./utils/Responsive";
import { system } from "./System";
import { DataItem } from "./DataItem";
import { registry } from "./Registry";
import * as $math from "./utils/Math";
import * as $array from "./utils/Array";
import * as $ease from "./utils/Ease";
import * as $utils from "./utils/Utils";
import * as $iter from "./utils/Iterator";
import * as $object from "./utils/Object";
import * as $type from "./utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A Component represents an independent functional element or control, that
 * can have it's own behavior, children, data, etc.
 *
 * A few examples of a Component: [[Legend]], [[Series]], [[Scrollbar]].
 *
 * @see {@link IComponentEvents} for a list of available events
 * @see {@link IComponentAdapters} for a list of available Adapters
 * @important
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /**
     * Constructor
     */
    function Component() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Holds data field names.
         *
         * Data fields define connection beween [[DataItem]] and actual properties
         * in raw data.
         */
        _this.dataFields = {};
        /**
         * A list of [[DataSource]] definitions of external data source.
         *
         * @ignore Exclude from docs
         */
        _this._dataSources = {};
        /**
         * This is used when only new data is invalidated (if added using `addData`
         * method).
         *
         * @ignore Exclude from docs
         */
        _this._parseDataFrom = 0;
        /**
         * Holds the disposers for the dataItems and dataUsers
         *
         * @ignore Exclude from docs
         */
        _this._dataDisposers = [];
        /**
         * Currently selected "data set".
         *
         * If it's set to `""`, main data set (unaggregated data) is used.
         */
        _this._currentDataSetId = "";
        /**
         * [_start description]
         *
         * @ignore Exclude from docs
         */
        _this._start = 0;
        /**
         * [_end description]
         *
         * @ignore Exclude from docs
         */
        _this._end = 1;
        /**
         * If set to `true`, changing data range in element will not trigger
         * `daterangechanged` event.
         */
        _this.skipRangeEvent = false;
        /**
         * Whenever selected scope changes (chart is zoomed or panned), for example
         * by interaction from a Scrollbar, or API, a chart needs to reposition
         * its contents.
         *
         * `rangeChangeDuration` influences how this is performed.
         *
         * If set to zero (0), the change will happen instantenously.
         *
         * If set to non-zero value, the chart will gradually animate into new
         * position for the set amount of milliseconds.
         *
         * @default 0
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.rangeChangeDuration = 0;
        /**
         * An easing function to use for range change animation.
         *
         * @see {@link Ease}
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.rangeChangeEasing = $ease.cubicOut;
        /**
         * A duration (ms) of each data parsing step. A Component parses its data in
         * chunks in order to avoid completely freezing the machine when large data
         * sets are used. This setting will control how many milliseconds should pass
         * when parsing data until parser stops for a brief moment to let other
         * processes catch up.
         */
        _this.parsingStepDuration = 50;
        /**
         * [dataInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.dataInvalid = false;
        /**
         *
         * @ignore Exclude from docs
         */
        _this.rawDataInvalid = false;
        /**
         * [dataRangeInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.dataRangeInvalid = false;
        /**
         * [dataItemsInvalid description]
         *
         * @ignore Exclude from docs
         * @todo Description
         */
        _this.dataItemsInvalid = false;
        /**
         * If set to a non-zero number the element will "animate" data values of its
         * children.
         *
         * This will happen on first load and whenever data values change.
         *
         * Enabling interpolation will mean that elements will transit smoothly into
         * new values rather than updating instantly.
         *
         * @default 0
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.interpolationDuration = 0;
        /**
         * An easing function to use for interpolating values when transiting from
         * one source value to another.
         *
         * @default cubicOut
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         * @see {@link Ease}
         */
        _this.interpolationEasing = $ease.cubicOut;
        /**
         * Indicates whether transition between data item's values should start and
         * play out all at once, or with a small delay (as defined by
         * `sequencedInterpolationDelay`) for each subsequent data item.
         *
         * @default true
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.sequencedInterpolation = true;
        /**
         * A delay (ms) to wait between animating each subsequent data item's
         * interpolation animation.
         *
         * Relative only if `sequencedInterpolation = true`.
         *
         * @default 0
         * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
         */
        _this.sequencedInterpolationDelay = 0;
        /**
         * A progress (0-1) for the data validation process.
         *
         * @ignore Exclude from docs
         */
        _this.dataValidationProgress = 0;
        _this._addAllDataItems = true;
        _this._usesData = true;
        _this.className = "Component";
        _this.minZoomCount = 1;
        _this.maxZoomCount = 0;
        _this._dataItems = new OrderedListTemplate(_this.createDataItem());
        _this._dataItems.events.on("inserted", _this.handleDataItemAdded, _this, false);
        _this._dataItems.events.on("removed", _this.handleDataItemRemoved, _this, false);
        _this._disposers.push(new ListDisposer(_this._dataItems));
        _this._disposers.push(_this._dataItems.template);
        _this.invalidateData();
        // TODO what about remove ?
        _this.dataUsers.events.on("inserted", _this.handleDataUserAdded, _this, false);
        // Set up disposers
        _this._disposers.push(new MultiDisposer(_this._dataDisposers));
        _this._start = 0;
        _this._end = 1;
        _this.maxZoomDeclination = 1;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    Component.prototype.createDataItem = function () {
        return new DataItem();
    };
    /**
     * [handleDataUserAdded description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param event Event object
     */
    Component.prototype.handleDataUserAdded = function (event) {
        var dataUser = event.newValue;
        dataUser.dataProvider = this;
    };
    /**
     * [handleDataItemValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.handleDataItemValueChange = function (dataItem, name) {
        if (!this.dataItemsInvalid) {
            this.invalidateDataItems();
        }
    };
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    Component.prototype.handleDataItemWorkingValueChange = function (dataItem, name) {
    };
    /**
     * [handleDataItemWorkingLocationChange description]
     *
     * @ignore Exclude from docs
     */
    Component.prototype.handleDataItemWorkingLocationChange = function (dataItem, name) {
    };
    /**
     * [handleDataItemCalculatedValueChange description]
     *
     * @ignore Exclude from docs
     */
    Component.prototype.handleDataItemCalculatedValueChange = function (dataItem, name) {
    };
    /**
     * [handleDataItemPropertyChange description]
     *
     * @ignore Exclude from docs
     */
    Component.prototype.handleDataItemPropertyChange = function (dataItem, name) {
    };
    /**
     * Populates a [[DataItem]] width data from data source.
     *
     * Loops through all the fields and if such a field is found in raw data
     * object, a corresponding value on passed in `dataItem` is set.
     *
     * @ignore Exclude from docs
     * @param item
     */
    Component.prototype.processDataItem = function (dataItem, dataContext) {
        var _this = this;
        if (dataItem) {
            if (!dataContext) {
                dataContext = {};
            }
            // store reference to original data item
            dataItem.dataContext = dataContext;
            var hasSomeValues_1 = false;
            $object.each(this.dataFields, function (key, fieldValue) {
                var fieldName = key;
                var value = dataContext[fieldValue];
                // Apply adapters to a retrieved value
                if (_this._adapterO) {
                    if (_this._adapterO.isEnabled("dataContextValue")) {
                        value = _this._adapterO.apply("dataContextValue", {
                            field: fieldName,
                            value: value,
                            dataItem: dataItem
                        }).value;
                    }
                }
                if ($type.hasValue(value)) {
                    hasSomeValues_1 = true;
                    if (dataItem.hasChildren[fieldName]) {
                        var template = _this.createDataItem();
                        template.copyFrom(_this.mainDataSet.template);
                        var children = new OrderedListTemplate(template);
                        children.events.on("inserted", _this.handleDataItemAdded, _this, false);
                        children.events.on("removed", _this.handleDataItemRemoved, _this, false);
                        _this._dataDisposers.push(new ListDisposer(children));
                        var count = value.length;
                        for (var i = 0; i < count; i++) {
                            var rawDataItem = value[i];
                            var childDataItem = children.create();
                            childDataItem.parent = dataItem;
                            _this.processDataItem(childDataItem, rawDataItem);
                        }
                        var anyDataItem = dataItem;
                        anyDataItem[fieldName] = children;
                    }
                    else {
                        // data is converted to numbers/dates in each dataItem
                        dataItem[fieldName] = value;
                    }
                }
            });
            $object.each(this.propertyFields, function (key, fieldValue) {
                var f = key;
                var value = dataContext[fieldValue];
                if ($type.hasValue(value)) {
                    hasSomeValues_1 = true;
                    dataItem.setProperty(f, value);
                }
            });
            // @todo we might need some flag which would tell whether we should create empty data items or not.
            if (!this._addAllDataItems && !hasSomeValues_1) {
                this.mainDataSet.remove(dataItem);
            }
        }
    };
    /**
     *
     * When validating raw data, instead of processing data item, we update it
     *
     * @ignore Exclude from docs
     * @param item
     */
    Component.prototype.updateDataItem = function (dataItem) {
        var _this = this;
        if (dataItem) {
            var dataContext_1 = dataItem.dataContext;
            $object.each(this.dataFields, function (key, fieldValue) {
                var fieldName = key;
                var value = dataContext_1[fieldValue];
                // Apply adapters to a retrieved value
                if (_this._adapterO) {
                    value = _this._adapterO.apply("dataContextValue", {
                        field: fieldName,
                        value: value,
                        dataItem: dataItem
                    }).value;
                }
                if ($type.hasValue(value)) {
                    if (dataItem.hasChildren[fieldName]) {
                        var anyDataItem = dataItem;
                        var children = (anyDataItem[fieldName]);
                        children.each(function (child) {
                            _this.updateDataItem(child);
                        });
                    }
                    else {
                        // data is converted to numbers/dates in each dataItem					
                        dataItem[fieldName] = value;
                    }
                }
            });
            $object.each(this.propertyFields, function (key, fieldValue) {
                var f = key;
                var value = dataContext_1[fieldValue];
                if ($type.hasValue(value)) {
                    dataItem.setProperty(f, value);
                }
            });
        }
    };
    /**
     * [validateDataElements description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.validateDataElements = function () {
        var count = this.endIndex;
        for (var i = this.startIndex; i < count; i++) {
            var dataItem = this.dataItems.getIndex(i);
            // TODO is this correct
            if (dataItem) {
                this.validateDataElement(dataItem);
            }
        }
    };
    /**
     * Validates this element and its related elements.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.validate = function () {
        this.validateDataElements();
        _super.prototype.validate.call(this);
    };
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @param dataItem [description]
     */
    Component.prototype.validateDataElement = function (dataItem) {
    };
    /**
     * Adds one or several (array) of data items to the existing data.
     *
     * @param rawDataItem One or many raw data item objects
     */
    Component.prototype.addData = function (rawDataItem, removeCount, skipRaw) {
        var _this = this;
        // need to check if data is invalid, as addData might be called multiple times
        if (!this.dataInvalid && this.inited) {
            this._parseDataFrom = this.data.length; // save length of parsed data
        }
        if (!skipRaw) {
            if (rawDataItem instanceof Array) {
                // can't use concat because new array is returned
                $array.each(rawDataItem, function (dataItem) {
                    _this.data.push(dataItem);
                });
            }
            else {
                this.data.push(rawDataItem); // add to raw data array
            }
        }
        if (this.inited) {
            this.removeData(removeCount, skipRaw);
        }
        else {
            if ($type.isNumber(removeCount)) {
                while (removeCount > 0) {
                    this.data.shift();
                    removeCount--;
                }
            }
        }
        this.invalidateData();
    };
    /**
     * Removes elements from the beginning of data
     *
     * @param count number of elements to remove
     */
    Component.prototype.removeData = function (count, skipRaw) {
        if ($type.isNumber(count) && count > 0) {
            while (count > 0) {
                var dataItem = this.mainDataSet.getIndex(0);
                if (dataItem) {
                    this.mainDataSet.remove(dataItem);
                }
                this.dataUsers.each(function (dataUser) {
                    if (!dataUser.data || dataUser.data.length == 0) {
                        var dataItem_1 = dataUser.mainDataSet.getIndex(0);
                        if (dataItem_1) {
                            dataUser.mainDataSet.remove(dataItem_1);
                        }
                    }
                });
                if (!skipRaw) {
                    this.data.shift();
                }
                if (this._parseDataFrom > 0) {
                    this._parseDataFrom--;
                }
                count--;
            }
            // changed from invalidateData since 4.7.19 to solve #51551
            this.invalidateDataItems();
        }
    };
    /**
     * Triggers a data (re)parsing.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateData = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        //if(!this.dataInvalid){
        registry.addToInvalidComponents(this);
        system.requestFrame();
        this.dataInvalid = true;
        $iter.each(this.dataUsers.iterator(), function (x) {
            x.invalidateDataItems();
        });
        //}
    };
    /**
     * [invalidateDataUsers description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.invalidateDataUsers = function () {
        $iter.each(this.dataUsers.iterator(), function (x) {
            x.invalidate();
        });
    };
    /**
     * Invalidates data values. When data array is not changed, but values within
     * it changes, we invalidate data so that component would process changes.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateDataItems = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        //if(!this.dataItemsInvalid){
        $array.move(registry.invalidDataItems, this);
        system.requestFrame();
        this.dataItemsInvalid = true;
        $iter.each(this.dataUsers.iterator(), function (x) {
            x.invalidateDataItems();
        });
        //}
    };
    /**
     * Invalidates data range. This is done when data which must be shown
     * changes (chart is zoomed for example).
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateDataRange = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        //if(!this.dataRangeInvalid){
        this.dataRangeInvalid = true;
        $array.move(registry.invalidDataRange, this);
        system.requestFrame();
        //}
    };
    /**
     * Processes data range.
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.validateDataRange = function () {
        $array.remove(registry.invalidDataRange, this);
        this.dataRangeInvalid = false;
        if (this.startIndex != this._prevStartIndex || this.endIndex != this._prevEndIndex) {
            this.rangeChangeUpdate();
            this.appendDataItems();
            this.invalidate();
            this.dispatchImmediately("datarangechanged");
        }
    };
    /**
     * [sliceData description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.sliceData = function () {
        this._workingStartIndex = this.startIndex;
        this._workingEndIndex = this.endIndex;
    };
    /**
     * [rangeChangeUpdate description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.rangeChangeUpdate = function () {
        this.sliceData();
        this._prevStartIndex = this.startIndex;
        this._prevEndIndex = this.endIndex;
    };
    /**
     * [appendDataItems description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    Component.prototype.appendDataItems = function () {
        // TODO use an iterator instead
        var count = this.endIndex;
        for (var i = this.startIndex; i < count; i++) {
            // data item
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem) {
                dataItem.__disabled = false;
            }
        }
        for (var i = 0; i < this.startIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem) {
                dataItem.__disabled = true;
            }
        }
        for (var i = this.endIndex; i < this.dataItems.length; i++) {
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem) {
                dataItem.__disabled = true;
            }
        }
    };
    /**
     * If you want to have a smooth transition from one data values to another, you change your raw data and then you must call this method.
     * then instead of redrawing everything, the chart will check raw data and smoothly transit from previous to new data
     */
    Component.prototype.invalidateRawData = function () {
        if (this.disabled || this.isTemplate) {
            return;
        }
        //if(!this.rawDataInvalid){
        $array.move(registry.invalidRawDatas, this);
        system.requestFrame();
        this.rawDataInvalid = true;
        $iter.each(this.dataUsers.iterator(), function (x) {
            x.invalidateRawData();
        });
        //}
    };
    /**
     * @ignore
     */
    Component.prototype.validateRawData = function () {
        var _this = this;
        $array.remove(registry.invalidRawDatas, this);
        $iter.each(this.mainDataSet.iterator(), function (dataItem) {
            if (dataItem) {
                _this.updateDataItem(dataItem);
            }
        });
    };
    /**
     * Destroys this object and all related data.
     */
    Component.prototype.dispose = function () {
        var _this = this;
        this.mainDataSet.template.clones.clear();
        $object.each(this._dataSources, function (key, source) {
            _this.removeDispose(source);
        });
        this.disposeData();
        _super.prototype.dispose.call(this);
    };
    /**
     * @ignore
     */
    Component.prototype.disposeData = function () {
        this.mainDataSet.template.clones.clear();
        $array.each(this._dataDisposers, function (x) {
            x.dispose();
        });
        // and for all components
        $iter.each(this.dataUsers.iterator(), function (dataUser) {
            dataUser.disposeData();
        });
        this._dataDisposers.length = 0;
        this._startIndex = undefined;
        this._endIndex = undefined;
        // dispose old
        this.mainDataSet.clear();
        this.mainDataSet.template.clones.clear();
        if (this._dataSets) {
            this._dataSets.clear();
        }
    };
    Component.prototype.getDataItem = function (dataContext) {
        return this.mainDataSet.create();
    };
    /**
     * Validates (processes) data.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.validateData = function () {
        this.dispatchImmediately("beforedatavalidated");
        this.dataInvalid = false;
        registry.removeFromInvalidComponents(this);
        if (this.__disabled) {
            return;
        }
        this.dataValidationProgress = 0;
        // need this to slice new data
        this._prevStartIndex = undefined;
        this._prevEndIndex = undefined;
        // todo: this needs some overthinking, maybe some extra settings like zoomOotonDataupdate like in v3 or so. some charts like pie chart probably should act like this always
        this._startIndex = undefined;
        this._endIndex = undefined;
        if (this.dataFields.data && this.dataItem) {
            var dataContext = this.dataItem.dataContext;
            this._data = dataContext[this.dataFields.data];
        }
        // data items array is reset only if all data is validated, if _parseDataFrom is not 0, we append new data only
        // check heatmap demo if uncommented
        // fixed both issues by adding && this.data.length > 0
        // check adding series example if changed
        if (this._parseDataFrom === 0 && this.data.length > 0) {
            this.disposeData();
        }
        if (this.data.length > 0) {
            var preloader = this.preloader;
            // and for all components
            $iter.each(this.dataUsers.iterator(), function (dataUser) {
                // todo: this needs some overthinking, maybe some extra settings like zoomOUtonDataupdate like in v3 or so. some charts like pie chart probably should act like this always
                dataUser._startIndex = undefined;
                dataUser._endIndex = undefined;
            });
            var counter = 0;
            var startTime = Date.now();
            // parse data
            var i = this._parseDataFrom;
            var n = this.data.length;
            var _loop_1 = function () {
                var rawDataItem = this_1.data[i];
                if (this_1._usesData) {
                    var dataItem = this_1.getDataItem(rawDataItem);
                    this_1.processDataItem(dataItem, rawDataItem);
                }
                this_1.dataUsers.each(function (dataUser) {
                    if (dataUser.data.length == 0) { // checking if data is not set directly
                        var dataUserDataItem = dataUser.getDataItem(rawDataItem);
                        dataUser.processDataItem(dataUserDataItem, rawDataItem);
                    }
                });
                counter++;
                // show preloader if this takes too many time
                if (counter == 100) { // no need to check it on each data item
                    counter = 0;
                    var elapsed = Date.now() - startTime;
                    if (elapsed > this_1.parsingStepDuration) {
                        if (i < this_1.data.length - 10) {
                            this_1._parseDataFrom = i + 1;
                            // update preloader
                            if (preloader) {
                                if (i / this_1.data.length > 0.5 && !preloader.visible) {
                                    // do not start showing
                                }
                                else {
                                    preloader.progress = i / this_1.data.length;
                                }
                            }
                            this_1.dataValidationProgress = i / this_1.data.length;
                            i = this_1.data.length; // stops cycle
                            this_1.invalidateData();
                            return { value: void 0 };
                        }
                    }
                }
            };
            var this_1 = this;
            for (i; i < n; i++) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            if (preloader) {
                preloader.progress = 1;
            }
            this.dataUsers.each(function (dataUser) {
                if (dataUser.hidden || (dataUser.appeared && !dataUser.visible && dataUser.stacked)) {
                    dataUser.hide(0);
                }
            });
        }
        this.dataValidationProgress = 1;
        this._parseDataFrom = 0; // reset this index, it is set to dataItems.length if addData() method was used.
        this.invalidateDataItems();
        if (!this._internalDefaultsApplied) {
            this.applyInternalDefaults();
        }
        this.dispatch("datavalidated"); // can't zoom chart if dispatched immediately
    };
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.validateDataItems = function () {
        $array.remove(registry.invalidDataItems, this);
        this.dataItemsInvalid = false;
        this.invalidateDataRange();
        this.invalidate();
        this.dispatch("dataitemsvalidated");
    };
    Object.defineProperty(Component.prototype, "data", {
        /**
         * Returns element's source (raw) data.
         *
         * @return Data
         */
        get: function () {
            if (!this._data) {
                this._data = [];
            }
            if (!this._adapterO) {
                return this._data;
            }
            else {
                return this._adapterO.apply("data", this._data);
            }
        },
        /**
         * Sets source (raw) data for the element. The "data" is always an `Array`
         * of objects.
         *
         * IMPORTANT: The order of data items in `data` array is important as it
         * might affect chart look and behavior. [More details](https://www.amcharts.com/docs/v4/concepts/data/#Order_of_data_items).
         *
         * @param value Data
         */
        set: function (value) {
            this.setData(value);
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setData = function (value) {
        // array might be the same, but there might be items added
        // todo: check if array changed, toString maybe?
        if (!this.isDisposed()) {
            this._parseDataFrom = 0;
            this.disposeData();
            this._data = value;
            if (value && value.length > 0) {
                this.invalidateData();
            }
            else {
                this.dispatchImmediately("beforedatavalidated");
                this.dispatch("datavalidated");
            }
        }
    };
    /**
     * Returns (creates if necessary) a [[DataSource]] bound to any specific
     * property.
     *
     * For example if I want to bind `data` to an external JSON file, I'd create
     * a DataSource for it.
     *
     * @param property  Property to bind external data to
     * @return A DataSource for property
     */
    Component.prototype.getDataSource = function (property) {
        var _this = this;
        if (!$type.hasValue(this._dataSources[property])) {
            this._dataSources[property] = new DataSource();
            this._dataSources[property].component = this;
            this.setDataSourceEvents(this._dataSources[property], property);
            this._dataSources[property].adapter.add("dateFields", function (val) {
                return _this.dataSourceDateFields(val);
            });
            this._dataSources[property].adapter.add("numberFields", function (val) {
                return _this.dataSourceNumberFields(val);
            });
            this.events.on("inited", function () {
                _this.loadData(property);
            }, this, false);
        }
        return this._dataSources[property];
    };
    Object.defineProperty(Component.prototype, "dataSource", {
        /**
         * @return Data source
         */
        get: function () {
            if (!this._dataSources["data"]) {
                this.getDataSource("data");
            }
            return this._dataSources["data"];
        },
        /**
         *A [[DataSource]] to be used for loading Component's data.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/loading-external-data/} for more on loading external data
         * @param value  Data source
         */
        set: function (value) {
            var _this = this;
            if (this._dataSources["data"]) {
                this.removeDispose(this._dataSources["data"]);
            }
            this._dataSources["data"] = value;
            this._dataSources["data"].component = this;
            this.events.on("inited", function () {
                _this.loadData("data");
            }, this, false);
            this.setDataSourceEvents(value, "data");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initiates loading of the external data via [[DataSource]].
     *
     * @ignore Exclude from docs
     */
    Component.prototype.loadData = function (property) {
        this._dataSources[property].load();
    };
    /**
     * This function is called by the [[DataSource]]'s `dateFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @ignore Exclude from docs
     * @param value  Array of date fields
     * @return Array of date fields populated with chart's date fields
     */
    Component.prototype.dataSourceDateFields = function (value) {
        return value;
    };
    /**
     * This function is called by the [[DataSource]]'s `numberFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @ignore Exclude from docs
     * @param value  Array of number fields
     * @return Array of number fields populated with chart's number fields
     */
    Component.prototype.dataSourceNumberFields = function (value) {
        return value;
    };
    /**
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param list        [description]
     * @param dataFields  [description]
     * @param targetList  [description]
     * @return [description]
     */
    Component.prototype.populateDataSourceFields = function (list, dataFields, targetList) {
        $array.each(targetList, function (value) {
            if (dataFields[value] && $array.indexOf(list, dataFields[value]) === -1) {
                list.push(dataFields[value]);
            }
        });
        return list;
    };
    /**
     * Sets events on a [[DataSource]].
     *
     * @ignore Exclude from docs
     */
    Component.prototype.setDataSourceEvents = function (ds, property) {
        var _this = this;
        ds.events.on("started", function (ev) {
            var preloader = _this.preloader;
            if (preloader) {
                preloader.progress = 0;
                //preloader.label.text = this.language.translate("Loading");
            }
        }, undefined, false);
        ds.events.on("loadstarted", function (ev) {
            var preloader = _this.preloader;
            if (preloader) {
                preloader.progress = 0.25;
            }
        }, undefined, false);
        ds.events.on("loadended", function (ev) {
            var preloader = _this.preloader;
            if (preloader) {
                preloader.progress = 0.5;
            }
        }, undefined, false);
        ds.events.on("parseended", function (ev) {
            var preloader = _this.preloader;
            if (preloader) {
                preloader.progress = 0.75;
            }
        }, undefined, false);
        ds.events.on("ended", function (ev) {
            var preloader = _this.preloader;
            if (preloader) {
                preloader.progress = 1;
            }
        }, undefined, false);
        ds.events.on("error", function (ev) {
            var preloader = _this.preloader;
            if (preloader) {
                preloader.progress = 1;
            }
            _this.openModal(ev.message);
        }, undefined, false);
        if (property) {
            ds.events.on("done", function (ev) {
                var preloader = _this.preloader;
                if (preloader) {
                    preloader.progress = 1;
                }
                if (property == "data" && !$type.isArray(ev.data)) {
                    ev.data = [ev.data];
                }
                if (ds.incremental && property == "data" && _this.data.length) {
                    _this.addData(ev.data, ds.keepCount ? ev.data.length : 0);
                }
                else if (ds.updateCurrentData && property == "data" && _this.data.length) {
                    // cycle through existing data items
                    $array.each(_this.data, function (item, index) {
                        if ($type.hasValue(ev.data[index])) {
                            $object.each(item, function (key, val) {
                                if ($type.hasValue(ev.data[index][key])) {
                                    item[key] = ev.data[index][key];
                                }
                            });
                        }
                    });
                    _this.invalidateRawData();
                }
                else {
                    _this[property] = ev.data;
                }
            });
        }
    };
    Object.defineProperty(Component.prototype, "responsive", {
        /**
         * @return Responsive rules handler
         */
        get: function () {
            if (!this._responsive) {
                this._responsive = new Responsive();
                this._responsive.component = this;
            }
            return this._responsive;
        },
        /**
         * A [[Responsive]] instance to be used when applying conditional
         * property values.
         *
         * NOTE: Responsive features are currently in development and may not work
         * as expected, if at all.
         *
         * @param value  Responsive rules handler
         */
        set: function (value) {
            this._responsive = value;
            this._responsive.component = this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets current zoom.
     *
     * The range uses relative values from 0 to 1, with 0 marking beginning and 1
     * marking end of the available data range.
     *
     * This method will not have any effect when called on a chart object.
     * Since the chart can have a number of axes and series, each with its own
     * data, the meaning of "range" is very ambiguous.
     *
     * To zoom the chart use `zoom*` methods on its respective axes.
     *
     * @param range          Range
     * @param skipRangeEvent Should rangechanged event not be triggered?
     * @param instantly      Do not animate?
     * @return Actual modidied range (taking `maxZoomFactor` into account)
     */
    Component.prototype.zoom = function (range, skipRangeEvent, instantly, declination) {
        var _this = this;
        if (skipRangeEvent === void 0) { skipRangeEvent = false; }
        if (instantly === void 0) { instantly = false; }
        var start = range.start;
        var end = range.end;
        var priority = range.priority;
        if (range.start == range.end) {
            range.start = range.start - 0.5 / this.maxZoomFactor;
            range.end = range.end + 0.5 / this.maxZoomFactor;
        }
        if (priority == "end" && end == 1 && start != 0) {
            if (start < this.start) {
                priority = "start";
            }
        }
        if (priority == "start" && start == 0) {
            if (end > this.end) {
                priority = "end";
            }
        }
        if (!$type.isNumber(declination)) {
            declination = this.maxZoomDeclination;
        }
        if (!$type.isNumber(start) || !$type.isNumber(end)) {
            return { start: this.start, end: this.end };
        }
        if (this._finalStart != start || this._finalEnd != end) {
            var maxZoomFactor = this.maxZoomFactor / this.minZoomCount;
            var minZoomFactor = this.maxZoomFactor / this.maxZoomCount;
            // most likely we are dragging left scrollbar grip here, so we tend to modify end
            if (priority == "start") {
                if (this.maxZoomCount > 0) {
                    // add to the end
                    if (1 / (end - start) < minZoomFactor) {
                        end = start + 1 / minZoomFactor;
                    }
                }
                // add to the end
                if (1 / (end - start) > maxZoomFactor) {
                    end = start + 1 / maxZoomFactor;
                }
                //unless end is > 0
                if (end > 1 && end - start < 1 / maxZoomFactor) {
                    //end = 1;
                    start = end - 1 / maxZoomFactor;
                }
            }
            // most likely we are dragging right, so we modify left
            else {
                if (this.maxZoomCount > 0) {
                    // add to the end
                    if (1 / (end - start) < minZoomFactor) {
                        start = end - 1 / minZoomFactor;
                    }
                }
                // remove from start
                if (1 / (end - start) > maxZoomFactor) {
                    if (start <= 0) {
                        end = start + 1 / maxZoomFactor;
                    }
                    else {
                        start = end - 1 / maxZoomFactor;
                    }
                }
                if (start < 0 && end - start < 1 / maxZoomFactor) {
                    //start = 0;
                    end = start + 1 / maxZoomFactor;
                }
            }
            if (start < -declination) {
                start = -declination;
            }
            if (1 / (end - start) > maxZoomFactor) {
                end = start + 1 / maxZoomFactor;
            }
            if (end > 1 + declination) {
                end = 1 + declination;
            }
            if (1 / (end - start) > maxZoomFactor) {
                start = end - 1 / maxZoomFactor;
            }
            this._finalEnd = end;
            this._finalStart = start;
            this.skipRangeEvent = skipRangeEvent;
            this.dispatchImmediately("rangechangestarted");
            if (this.rangeChangeDuration > 0 && !instantly) {
                // todo: maybe move this to Animation
                var rangeChangeAnimation = this.rangeChangeAnimation;
                if (rangeChangeAnimation && rangeChangeAnimation.progress < 1) {
                    var options = rangeChangeAnimation.animationOptions;
                    if (options.length > 1) {
                        if (options[0].to == start && options[1].to == end) {
                            return { start: start, end: end };
                        }
                        else {
                            if (!rangeChangeAnimation.isDisposed()) {
                                rangeChangeAnimation.stop();
                            }
                        }
                    }
                }
                if (this.rangeChangeAnimation) {
                    this.rangeChangeAnimation.kill();
                }
                rangeChangeAnimation = this.animate([{ property: "start", to: start }, { property: "end", to: end }], this.rangeChangeDuration, this.rangeChangeEasing);
                this.rangeChangeAnimation = rangeChangeAnimation;
                if (rangeChangeAnimation && !rangeChangeAnimation.isFinished()) {
                    rangeChangeAnimation.events.on("animationended", function () {
                        _this.dispatchImmediately("rangechangeended");
                    });
                }
                else {
                    this.dispatchImmediately("rangechangeended");
                }
            }
            else {
                this.start = start;
                this.end = end;
                this.dispatch("rangechangeended");
            }
        }
        return { start: start, end: end };
    };
    /**
     * Zooms to specific data items using their index in data.
     *
     * This method will not have any effect when called on a chart object.
     * Since the chart can have a number of axes and series, each with its own
     * data, the meaning of "index" is very ambiguous.
     *
     * To zoom the chart use `zoom*` methods on its respective axes.
     *
     * @param startIndex     Index of the starting data item
     * @param endIndex       Index of the ending data item
     * @param skipRangeEvent Should rangechanged event not be triggered?
     * @param instantly      Do not animate?
     */
    Component.prototype.zoomToIndexes = function (startIndex, endIndex, skipRangeEvent, instantly) {
        if (!$type.isNumber(startIndex) || !$type.isNumber(endIndex)) {
            return;
        }
        var start = startIndex / this.dataItems.length;
        var end = endIndex / this.dataItems.length;
        this.zoom({ start: start, end: end }, skipRangeEvent, instantly);
    };
    Object.defineProperty(Component.prototype, "zoomFactor", {
        /**
         * A current zoom factor (0-1). 1 meaning fully zoomed out. (showing all of
         * the available data)
         *
         * @return Zoom factor
         */
        get: function () {
            return $math.fitToRange(1 / (this.end - this.start), 1, this.maxZoomFactor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "maxZoomFactor", {
        /**
         * @return Maximum zoomFactor
         */
        get: function () {
            return this.getPropertyValue("maxZoomFactor");
        },
        /**
         * Max available `zoomFactor`.
         *
         * The element will not allow zoom to occur beyond this factor.
         *
         * [[DateAxis]] and [[CategoryAxis]] calculate this atutomatically so that
         * category axis could be zoomed to one category and date axis allows to be
         * zoomed up to one base interval.
         *
         * In case you want to restrict category or date axis to be zoomed to more
         * than one category or more than one base interval, use `minZoomCount`
         * property (set it to `> 1`).
         *
         * Default value of [[ValueAxis]]'s `maxZoomFactor` is `1000`.
         *
         * Feel free to modify it to allow bigger zoom or to restrict zooming.
         *
         * @param value  Maximum zoomFactor
         */
        set: function (value) {
            if (this.setPropertyValue("maxZoomFactor", value)) {
                if (value == 1) {
                    this.maxZoomDeclination = 0;
                }
                this.invalidateDataRange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "maxZoomDeclination", {
        /**
         * @ignore
         * @return Maximum zoom declination
         */
        get: function () {
            return this.getPropertyValue("maxZoomDeclination");
        },
        /**
         * Max zoom declination.
         *
         * @ignore
         * @default 1
         * @param value  Maximum zoom declination
         */
        set: function (value) {
            if (this.setPropertyValue("maxZoomDeclination", value)) {
                this.invalidateDataRange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "startIndex", {
        /**
         * Current starting index.
         *
         * @return Start index
         */
        get: function () {
            if (!$type.isNumber(this._startIndex)) {
                this._startIndex = 0;
            }
            return this._startIndex;
        },
        /**
         * Sets current starting index.
         *
         * @ignore Exclude from docs
         * @param value Start index
         */
        set: function (value) {
            this._startIndex = $math.fitToRange(Math.round(value), 0, this.dataItems.length);
            //this._workingStartIndex = this._startIndex; // not good, breaks adjusted working start index of line series
            this.start = this.indexToPosition(this._startIndex);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     * @todo:review description
     * returns item's relative position by the index of the item
     * @param index
     */
    Component.prototype.indexToPosition = function (index) {
        return index / this.dataItems.length;
    };
    Object.defineProperty(Component.prototype, "endIndex", {
        /**
         * Current ending index.
         *
         * @return End index
         */
        get: function () {
            var count = this.dataItems.length;
            if (!$type.isNumber(this._endIndex) || this._endIndex > count) {
                this._endIndex = count;
            }
            return this._endIndex;
        },
        /**
         * Sets current ending index.
         *
         * @ignore Exclude from docs
         * @param value End index
         */
        set: function (value) {
            this._endIndex = $math.fitToRange(Math.round(value), 0, this.dataItems.length);
            //this._workingEndIndex = this._endIndex; // not good, breaks adjusted workingend index of line series
            this.end = this.indexToPosition(this._endIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "start", {
        /**
         * @return Start (0-1)
         */
        get: function () {
            if (!this._adapterO) {
                return this._start;
            }
            else {
                return this._adapterO.apply("start", this._start);
            }
        },
        /**
         * Start of the current data range (zoom).
         *
         * These are relative values from 0 (beginning) to 1 (end).
         *
         * @param value Start (0-1)
         */
        set: function (value) {
            // value = $math.round(value, 10); not good
            //if (1 / (this.end - value) > this.maxZoomFactor) {
            //	value = this.end - 1 / this.maxZoomFactor;
            //}
            if (this._start != value) {
                this._start = value;
                var startIndex = Math.max(0, Math.floor(this.dataItems.length * value) || 0);
                this._startIndex = Math.min(startIndex, this.dataItems.length);
                this.invalidateDataRange();
                this.invalidate();
                this.dispatchImmediately("startchanged");
                this.dispatch("startendchanged");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "end", {
        /**
         * @return End (0-1)
         */
        get: function () {
            if (!this._adapterO) {
                return this._end;
            }
            else {
                return this._adapterO.apply("end", this._end);
            }
        },
        /**
         * End of the current data range (zoom).
         *
         * These are relative values from 0 (beginning) to 1 (end).
         *
         * @param value End (0-1)
         */
        set: function (value) {
            // value = $math.round(value, 10); // not good
            //if (1 / (value - this.start) > this.maxZoomFactor) {
            //	value = 1 / this.maxZoomFactor + this.start;
            //}
            if (this._end != value) {
                this._end = value;
                this._endIndex = Math.min(this.dataItems.length, Math.ceil(this.dataItems.length * value) || 0);
                this.invalidateDataRange();
                this.invalidate();
                this.dispatchImmediately("endchanged");
                this.dispatch("startendchanged");
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [removeFromInvalids description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.removeFromInvalids = function () {
        _super.prototype.removeFromInvalids.call(this);
        registry.removeFromInvalidComponents(this);
        $array.remove(registry.invalidDataItems, this);
        $array.remove(registry.invalidDataRange, this);
        $array.remove(registry.invalidRawDatas, this);
    };
    Object.defineProperty(Component.prototype, "dataItems", {
        /**
         * Returns a list of source [[DataItem]] objects currently used in the chart.
         *
         * @return List of data items
         */
        get: function () {
            if (this._currentDataSetId != "") {
                var dataItems = this.dataSets.getKey(this._currentDataSetId);
                if (dataItems) {
                    return dataItems;
                }
            }
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dataSets", {
        /**
         * Holds data items for data sets (usually aggregated data).
         *
         * @ignore
         * @since 4.7.0
         * @return  Data sets
         */
        get: function () {
            if (!this._dataSets) {
                this._dataSets = new Dictionary();
            }
            return this._dataSets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Makes the chart use particular data set.
     *
     * If `id` is not provided or there is no such data set, main data will be
     * used.
     *
     * @ignore
     * @since 4.7.0
     * @param  id  Data set id
     */
    Component.prototype.setDataSet = function (id) {
        if (this._currentDataSetId != id) {
            var dataSet = this.dataSets.getKey(id);
            if (!dataSet) {
                if (this._currentDataSetId != "") {
                    this.dataItems.each(function (dataItem) {
                        dataItem.__disabled = true;
                    });
                    this._currentDataSetId = "";
                    this.invalidateDataRange();
                    this._prevStartIndex = undefined;
                    this.dataItems.each(function (dataItem) {
                        dataItem.__disabled = false;
                    });
                    return true;
                }
            }
            else {
                this.dataItems.each(function (dataItem) {
                    dataItem.__disabled = true;
                });
                this._currentDataSetId = id;
                this.invalidateDataRange();
                this._prevStartIndex = undefined;
                this.dataItems.each(function (dataItem) {
                    dataItem.__disabled = false;
                });
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(Component.prototype, "currentDataSetId", {
        /**
         * Returns id of the currently used data set, or `undefined` if main data set
         * is in use.
         *
         * @since 4.7.0
         * @return Current data set id
         */
        get: function () {
            return this._currentDataSetId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "mainDataSet", {
        /**
         * Returns reference to "main" data set (unaggregated data as it was supplied
         * in `data`).
         *
         * @since 4.7.0
         * @return Main data set
         */
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the indexes for the dataItems
     *
     * @ignore Exclude from docs
     */
    Component.prototype._updateDataItemIndexes = function (startIndex) {
        var dataItems = this.mainDataSet.values;
        var length = dataItems.length;
        for (var i = startIndex; i < length; ++i) {
            dataItems[i]._index = i;
        }
    };
    /**
     * Processes newly added [[DataItem]] as well as triggers data re-validation.
     *
     * @ignore Exclude from docs
     * @param event [description]
     */
    Component.prototype.handleDataItemAdded = function (event) {
        event.newValue.component = this;
        this._updateDataItemIndexes(event.index);
        if (!this.dataItemsInvalid) {
            this.invalidateDataItems();
        }
    };
    /**
     * removes [[DataItem]] as well as triggers data re-validation.
     *
     * @ignore Exclude from docs
     * @param event [description]
     */
    Component.prototype.handleDataItemRemoved = function (event) {
        //		event.oldValue.component = undefined; // not good, as some items might be not removed from component lists
        this._updateDataItemIndexes(event.index);
        if (!this.dataItemsInvalid) {
            this.invalidateDataItems();
        }
    };
    /**
     * Binds a data element's field to a specific field in raw data.
     * For example, for the very basic column chart you'd want to bind a `value`
     * field to a field in data, such as `price`.
     *
     * Some more advanced Components, like [[CandlestickSeries]] need several
     * data fields bound to data, such as ones for open, high, low and close
     * values.
     *
     * @todo Example
     * @param field  Field name
     * @param value  Field name in data
     */
    Component.prototype.bindDataField = function (field, value) {
        this.dataFields[field] = value;
        this.invalidateDataRange();
    };
    /**
     * Invalidates processed data.
     *
     * @ignore Exclude from docs
     */
    Component.prototype.invalidateProcessedData = function () {
        this.resetProcessedRange();
        this.invalidateDataRange();
    };
    /**
     * [resetProcessedRange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Component.prototype.resetProcessedRange = function () {
        this._prevEndIndex = null;
        this._prevStartIndex = null;
    };
    Object.defineProperty(Component.prototype, "dataUsers", {
        /**
         * Returns all other [[Component]] objects that are using this element's
         * data.
         *
         * @ignore Exclude from docs
         * @todo Description (review)
         * @return [description]
         */
        get: function () {
            var _this = this;
            if (!this._dataUsers) {
                this._dataUsers = new List();
                //this._disposers.push(new ListDisposer(this._dataUsers));
                // TODO better way of handling this? e.g. move into another module ?
                this._disposers.push(new Disposer(function () {
                    // TODO clear the list ?
                    $iter.each(_this._dataUsers.iterator(), function (x) {
                        x.dispose();
                    });
                }));
            }
            return this._dataUsers;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a clone of this element.
     *
     * @return Clone
     */
    Component.prototype.clone = function () {
        var component = _super.prototype.clone.call(this);
        component.dataFields = $utils.copyProperties(this.dataFields, {});
        return component;
    };
    /**
     * Copies all parameters from another [[Component]].
     *
     * @param source Source Component
     */
    Component.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.data = source.data;
        this.sequencedInterpolation = source.sequencedInterpolation;
        this.sequencedInterpolationDelay = source.sequencedInterpolationDelay;
        this.interpolationDuration = source.interpolationDuration;
        this.interpolationEasing = source.interpolationEasing;
    };
    /**
     * Invalidates the whole element, including all its children, causing
     * complete re-parsing of data and redraw.
     *
     * Use sparingly!
     */
    Component.prototype.reinit = function () {
        this._inited = false;
        this.deepInvalidate();
    };
    /**
     * Add an adapter for data.
     *
     * @return Exporting
     */
    Component.prototype.getExporting = function () {
        var _export = _super.prototype.getExporting.call(this);
        if (!_export.adapter.has("data", this._exportData, -1, this)) {
            _export.adapter.add("data", this._exportData, -1, this);
            this.events.on("datavalidated", function (ev) {
                _export.handleDataUpdated();
            });
        }
        return _export;
    };
    Component.prototype._exportData = function (arg) {
        arg.data = this.data;
        return arg;
    };
    Component.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (changed) {
            this.invalidateData();
        }
        return changed;
    };
    /**
     * @ignore
     */
    Component.prototype.setShowOnInit = function (value) {
        if (value != this.getPropertyValue("showOnInit")) {
            if (value && !this.inited && !this.hidden) {
                this._showOnInitDisposer2 = this.events.once("dataitemsvalidated", this.hideInitially, this, false);
                this._disposers.push(this._showOnInitDisposer2);
            }
            else {
                if (this._showOnInitDisposer2) {
                    this.removeDispose(this._showOnInitDisposer2);
                }
            }
        }
        // important order here
        _super.prototype.setShowOnInit.call(this, value);
    };
    Component.prototype.setBaseId = function (value) {
        if (value != this._baseId) {
            if (this.dataInvalid) {
                this.dataInvalid = false;
                registry.removeFromInvalidComponents(this);
                this._baseId = value;
                this.invalidateData();
            }
        }
        _super.prototype.setBaseId.call(this, value);
    };
    Object.defineProperty(Component.prototype, "minZoomCount", {
        /**
         * @return Min zoom count
         */
        get: function () {
            return this.getPropertyValue("minZoomCount");
        },
        /**
         * Use this for [[CategoryAxis]] or [[DateAxis]].
         *
         * Allows restricting zoom in beyond certain number of categories or base
         * intervals.
         *
         * @default 1
         * @param value  Min zoom count
         */
        set: function (value) {
            this.setPropertyValue("minZoomCount", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "maxZoomCount", {
        /**
         * @return Max zoom count
         */
        get: function () {
            return this.getPropertyValue("maxZoomCount");
        },
        /**
         * Use this for [[CategoryAxis]] or [[DateAxis]].
         *
         * Limits how many categories or base intervals can be shown at the same
         * time.
         *
         * If there are more items in the chart, the chart will auto-zoom.
         *
         * @default 0 (no limit)
         * @since 4.6.2
         * @param value  Max zoom count
         */
        set: function (value) {
            this.setPropertyValue("maxZoomCount", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called during the System.update method
     *
     * @ignore Exclude from docs
     */
    Component.prototype._systemCheckIfValidate = function () {
        if (this.dataInvalid || (this.dataProvider && this.dataProvider.dataInvalid)) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    Component.prototype.asFunction = function (field) {
        return field == "interpolationEasing" || field == "rangeChangeEasing" || _super.prototype.asIs.call(this, field);
    };
    return Component;
}(Container));
export { Component };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Component"] = Component;
//# sourceMappingURL=Component.js.map