/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "./Container";
import { List, IListEvents } from "./utils/List";
import { OrderedListTemplate, ISortedListEvents } from "./utils/SortedList";
import { Animation } from "./utils/Animation";
import { Dictionary } from "./utils/Dictionary";
import { IDisposer } from "./utils/Disposer";
import { Export } from "./export/Export";
import { DataSource } from "./data/DataSource";
import { Responsive } from "./utils/Responsive";
import { DataItem } from "./DataItem";
import { IRange } from "./defs/IRange";
import * as $type from "./utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * A list of available types for calculated values.
 */
export declare type CalculatedValue = "value" | "percent" | "change" | "changePercent" | "startChangePercent" | "startChange" | "previousChangePercent" | "previousChange" | "sum" | "absoluteSum" | "average" | "open" | "close" | "low" | "high" | "count" | "total" | "totalPercent" | "stack" | "stackTrue";
/**
 * Defines properties for [[Component]].
 */
export interface IComponentProperties extends IContainerProperties {
    /**
     * Maximum zoom factor of a component.
     */
    maxZoomFactor?: number;
    /**
     * Maximum zoom declination (how much out of 0-1 range it will allow to step out)
     *
     * @ignore
     * @default 0.5
     */
    maxZoomDeclination?: number;
    /**
     * Use this for [[CategoryAxis]] or [[DateAxis]].
     *
     * Allows restricting zoom in beyond certain number of categories or base
     * intervals.
     *
     * The chart will not zoom in beyond this number of items.
     *
     * @default 1
     */
    minZoomCount?: number;
    /**
     * Use this for [[CategoryAxis]] or [[DateAxis]].
     *
     * Limits how many categories or base intervals can be shown at the same
     * time.
     *
     * If there are more items in the chart, the chart will auto-zoom.
     *
     * @default 0 (no limit)
     */
    maxZoomCount?: number;
}
/**
 * Defines data fields for [[Component]].
 */
export interface IComponentDataFields {
    /**
     * Data.
     */
    data?: string;
    /**
     * ID.
     */
    id?: string;
}
/**
 * Defines events for [[Component]].
 */
export interface IComponentEvents extends IContainerEvents {
    /**
     * Invoked when range of the currently selected data is validated.
     *
     * @todo: change to datarangevalidated?
     */
    datarangechanged: {};
    /**
     * Invoked when the raw data for the component changes.
     */
    datavalidated: {};
    /**
     * Invoked when value(s) of the element's data items are validated.
     */
    dataitemsvalidated: {};
    /**
     * Invoked just before element is validated (after changes).
     */
    beforedatavalidated: {};
    /**
     * Invoked when range change animation starts
     */
    rangechangestarted: {};
    /**
     * Invoked when range change animation ends
     */
    rangechangeended: {};
    /**
     * Invoked when start position changes.
     *
     * Please note that `startchanged` event is dispatched immediately after
     * zoom occurs, so some related properties (e.g. `minZoomed` on [[ValueAxis]])
     * might not be yet updated.
     *
     * Use `startendchanged` event instead if you need to rely on updated
     * zoom-related values.
     */
    startchanged: {};
    /**
     * Invoked when end position changes
     *
     * Please note that `endhanged` event is dispatched immediately after
     * zoom occurs, so some related properties (e.g. `maxZoomed` on [[ValueAxis]])
     * might not be yet updated.
     *
     * Use `startendchanged` event instead if you need to rely on updated
     * zoom-related values.
     */
    endchanged: {};
    /**
     * Invoked when start or end position changes, unlike startchanged/endchanged
     * this event is fired not immediately but at the end of a cycle.
     */
    startendchanged: {};
}
/**
 * Defines adapters
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface IComponentAdapters extends IContainerAdapters, IComponentProperties {
    /**
     * Applied after [[Component]] retrieves data value from data context
     * (raw data), but before it is provided to [[DataItem]].
     */
    dataContextValue: {
        value: any;
        field: string;
        dataItem: DataItem;
    };
    /**
     * Applied to chart's data before it is retrieved for use.
     */
    data: any[];
    start: number;
    end: number;
}
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
export declare class Component extends Container {
    /**
     * Defines available data fields.
     */
    _dataFields: IComponentDataFields;
    /**
     * Holds data field names.
     *
     * Data fields define connection beween [[DataItem]] and actual properties
     * in raw data.
     */
    dataFields: this["_dataFields"];
    /**
     * Defines available properties.
     */
    _properties: IComponentProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IComponentAdapters;
    /**
     * Defines available events.
     */
    _events: IComponentEvents;
    /**
     * Holds the data for the component.
     *
     * @ignore Exclude from docs
     */
    protected _data: $type.Optional<any[]>;
    /**
     * A [[Component]] which provides data to this component (like Chart provides
     * data for Series).
     */
    dataProvider: $type.Optional<Component>;
    /**
     * A list of [[DataSource]] definitions of external data source.
     *
     * @ignore Exclude from docs
     */
    protected _dataSources: {
        [index: string]: DataSource;
    };
    /**
     * An instance of [[Responsive]].
     *
     * @ignore Exclude from docs
     */
    protected _responsive: $type.Optional<Responsive>;
    /**
     * This is used when only new data is invalidated (if added using `addData`
     * method).
     *
     * @ignore Exclude from docs
     */
    protected _parseDataFrom: number;
    /**
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _dataUsers: $type.Optional<List<Component>>;
    /**
     * Holds the disposers for the dataItems and dataUsers
     *
     * @ignore Exclude from docs
     */
    protected _dataDisposers: Array<IDisposer>;
    /**
     * Identifies the type of the [[DataItem]] used in this element.
     */
    _dataItem: DataItem;
    /**
     * List of element's source data items.
     *
     * @ignore Exclude from docs
     */
    protected _dataItems: $type.Optional<OrderedListTemplate<this["_dataItem"]>>;
    /**
     * Holds aggregated data items.
     *
     * @ignore
     */
    _dataSets: Dictionary<string, OrderedListTemplate<this["_dataItem"]>>;
    /**
     * Currently selected "data set".
     *
     * If it's set to `""`, main data set (unaggregated data) is used.
     */
    protected _currentDataSetId: string;
    /**
     * [_startIndex description]
     *
     * @ignore Exclude from docs
     */
    protected _startIndex: $type.Optional<number>;
    /**
     * [_endIndex description]
     *
     * @ignore Exclude from docs
     */
    protected _endIndex: $type.Optional<number>;
    /**
     * [_start description]
     *
     * @ignore Exclude from docs
     */
    protected _start: number;
    /**
     * [_end description]
     *
     * @ignore Exclude from docs
     */
    protected _end: number;
    /**
     * [_finalStart description]
     *
     * @ignore Exclude from docs
     */
    protected _finalStart: $type.Optional<number>;
    /**
     * [_finalEnd description]
     *
     * @ignore Exclude from docs
     */
    protected _finalEnd: $type.Optional<number>;
    /**
     * If set to `true`, changing data range in element will not trigger
     * `daterangechanged` event.
     */
    skipRangeEvent: boolean;
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
    rangeChangeDuration: number;
    /**
     * An easing function to use for range change animation.
     *
     * @see {@link Ease}
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    rangeChangeEasing: (value: number) => number;
    /**
     * A reference to a currently playing range change [[Animation]] object.
     *
     * @ignore Exclude from docs
     */
    rangeChangeAnimation: $type.Optional<Animation>;
    /**
     * A duration (ms) of each data parsing step. A Component parses its data in
     * chunks in order to avoid completely freezing the machine when large data
     * sets are used. This setting will control how many milliseconds should pass
     * when parsing data until parser stops for a brief moment to let other
     * processes catch up.
     */
    parsingStepDuration: number;
    /**
     * [dataInvalid description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    dataInvalid: boolean;
    /**
     *
     * @ignore Exclude from docs
     */
    rawDataInvalid: boolean;
    /**
     * [dataRangeInvalid description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    dataRangeInvalid: boolean;
    /**
     * [dataItemsInvalid description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    dataItemsInvalid: boolean;
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
    interpolationDuration: number;
    /**
     * An easing function to use for interpolating values when transiting from
     * one source value to another.
     *
     * @default cubicOut
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     * @see {@link Ease}
     */
    interpolationEasing: (value: number) => number;
    /**
     * Indicates whether transition between data item's values should start and
     * play out all at once, or with a small delay (as defined by
     * `sequencedInterpolationDelay`) for each subsequent data item.
     *
     * @default true
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    sequencedInterpolation: boolean;
    /**
     * A delay (ms) to wait between animating each subsequent data item's
     * interpolation animation.
     *
     * Relative only if `sequencedInterpolation = true`.
     *
     * @default 0
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    sequencedInterpolationDelay: number;
    /**
     * A progress (0-1) for the data validation process.
     *
     * @ignore Exclude from docs
     */
    dataValidationProgress: number;
    /**
     * [_prevStartIndex description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _prevStartIndex: $type.Optional<number>;
    /**
     * [_prevEndIndex description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _prevEndIndex: $type.Optional<number>;
    /**
     * Sometimes we need to process more dataItems then actually is
     * selected (for example, not to cut lines at the end/beginning).
     * However when calculating averages, min, max, etc we need not to include
     * them. So we store `workingStartIndex` and `workingEndIndex` to know which
     * dataItems should be included and which should not.
     */
    /**
     * [_workingStartIndex description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _workingStartIndex: $type.Optional<number>;
    /**
     * [_workingEndIndex description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected _workingEndIndex: $type.Optional<number>;
    protected _addAllDataItems: boolean;
    protected _showOnInitDisposer2: IDisposer;
    protected _usesData: boolean;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * [handleDataUserAdded description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param event Event object
     */
    protected handleDataUserAdded(event: IListEvents<Component>["inserted"]): void;
    /**
     * [handleDataItemValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    handleDataItemValueChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemWorkingValueChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * [handleDataItemWorkingLocationChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemWorkingLocationChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * [handleDataItemCalculatedValueChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemCalculatedValueChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * [handleDataItemPropertyChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemPropertyChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * Populates a [[DataItem]] width data from data source.
     *
     * Loops through all the fields and if such a field is found in raw data
     * object, a corresponding value on passed in `dataItem` is set.
     *
     * @ignore Exclude from docs
     * @param item
     */
    protected processDataItem(dataItem: this["_dataItem"], dataContext?: Object): void;
    /**
     *
     * When validating raw data, instead of processing data item, we update it
     *
     * @ignore Exclude from docs
     * @param item
     */
    protected updateDataItem(dataItem: this["_dataItem"]): void;
    /**
     * [validateDataElements description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected validateDataElements(): void;
    /**
     * Validates this element and its related elements.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @param dataItem [description]
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * Adds one or several (array) of data items to the existing data.
     *
     * @param rawDataItem One or many raw data item objects
     */
    addData(rawDataItem: Object | Object[], removeCount?: number, skipRaw?: boolean): void;
    /**
     * Removes elements from the beginning of data
     *
     * @param count number of elements to remove
     */
    removeData(count: $type.Optional<number>, skipRaw?: boolean): void;
    /**
     * Triggers a data (re)parsing.
     *
     * @ignore Exclude from docs
     */
    invalidateData(): void;
    /**
     * [invalidateDataUsers description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    invalidateDataUsers(): void;
    /**
     * Invalidates data values. When data array is not changed, but values within
     * it changes, we invalidate data so that component would process changes.
     *
     * @ignore Exclude from docs
     */
    invalidateDataItems(): void;
    /**
     * Invalidates data range. This is done when data which must be shown
     * changes (chart is zoomed for example).
     *
     * @ignore Exclude from docs
     */
    invalidateDataRange(): void;
    /**
     * Processes data range.
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    validateDataRange(): void;
    /**
     * [sliceData description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    protected sliceData(): void;
    /**
     * [rangeChangeUpdate description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    protected rangeChangeUpdate(): void;
    /**
     * [appendDataItems description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    protected appendDataItems(): void;
    /**
     * If you want to have a smooth transition from one data values to another, you change your raw data and then you must call this method.
     * then instead of redrawing everything, the chart will check raw data and smoothly transit from previous to new data
     */
    invalidateRawData(): void;
    /**
     * @ignore
     */
    validateRawData(): void;
    /**
     * Destroys this object and all related data.
     */
    dispose(): void;
    /**
     * @ignore
     */
    disposeData(): void;
    protected getDataItem(dataContext?: any): this["_dataItem"];
    /**
     * Validates (processes) data.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * Sets source (raw) data for the element. The "data" is always an `Array`
     * of objects.
     *
     * IMPORTANT: The order of data items in `data` array is important as it
     * might affect chart look and behavior. [More details](https://www.amcharts.com/docs/v4/concepts/data/#Order_of_data_items).
     *
     * @param value Data
     */
    /**
    * Returns element's source (raw) data.
    *
    * @return Data
    */
    data: any[];
    protected setData(value: any[]): void;
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
    getDataSource(property: string): DataSource;
    /**
     *A [[DataSource]] to be used for loading Component's data.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/loading-external-data/} for more on loading external data
     * @param value  Data source
     */
    /**
    * @return Data source
    */
    dataSource: DataSource;
    /**
     * Initiates loading of the external data via [[DataSource]].
     *
     * @ignore Exclude from docs
     */
    protected loadData(property: string): void;
    /**
     * This function is called by the [[DataSource]]'s `dateFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @ignore Exclude from docs
     * @param value  Array of date fields
     * @return Array of date fields populated with chart's date fields
     */
    protected dataSourceDateFields(value: string[]): string[];
    /**
     * This function is called by the [[DataSource]]'s `numberFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @ignore Exclude from docs
     * @param value  Array of number fields
     * @return Array of number fields populated with chart's number fields
     */
    protected dataSourceNumberFields(value: string[]): string[];
    /**
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param list        [description]
     * @param dataFields  [description]
     * @param targetList  [description]
     * @return [description]
     */
    protected populateDataSourceFields(list: string[], dataFields: {
        [index: string]: string;
    }, targetList: string[]): string[];
    /**
     * Sets events on a [[DataSource]].
     *
     * @ignore Exclude from docs
     */
    protected setDataSourceEvents(ds: DataSource, property?: string): void;
    /**
     * A [[Responsive]] instance to be used when applying conditional
     * property values.
     *
     * NOTE: Responsive features are currently in development and may not work
     * as expected, if at all.
     *
     * @param value  Responsive rules handler
     */
    /**
    * @return Responsive rules handler
    */
    responsive: Responsive;
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
    zoom(range: IRange, skipRangeEvent?: boolean, instantly?: boolean, declination?: number): IRange;
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
    zoomToIndexes(startIndex: number, endIndex: number, skipRangeEvent?: boolean, instantly?: boolean): void;
    /**
     * A current zoom factor (0-1). 1 meaning fully zoomed out. (showing all of
     * the available data)
     *
     * @return Zoom factor
     */
    readonly zoomFactor: number;
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
    /**
    * @return Maximum zoomFactor
    */
    maxZoomFactor: number;
    /**
     * Max zoom declination.
     *
     * @ignore
     * @default 1
     * @param value  Maximum zoom declination
     */
    /**
    * @ignore
    * @return Maximum zoom declination
    */
    maxZoomDeclination: number;
    /**
     * Sets current starting index.
     *
     * @ignore Exclude from docs
     * @param value Start index
     */
    /**
    * Current starting index.
    *
    * @return Start index
    */
    startIndex: number;
    /**
     * @ignore
     * @todo:review description
     * returns item's relative position by the index of the item
     * @param index
     */
    indexToPosition(index: number): number;
    /**
     * Sets current ending index.
     *
     * @ignore Exclude from docs
     * @param value End index
     */
    /**
    * Current ending index.
    *
    * @return End index
    */
    endIndex: number;
    /**
     * Start of the current data range (zoom).
     *
     * These are relative values from 0 (beginning) to 1 (end).
     *
     * @param value Start (0-1)
     */
    /**
    * @return Start (0-1)
    */
    start: number;
    /**
     * End of the current data range (zoom).
     *
     * These are relative values from 0 (beginning) to 1 (end).
     *
     * @param value End (0-1)
     */
    /**
    * @return End (0-1)
    */
    end: number;
    /**
     * [removeFromInvalids description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected removeFromInvalids(): void;
    /**
     * Returns a list of source [[DataItem]] objects currently used in the chart.
     *
     * @return List of data items
     */
    readonly dataItems: OrderedListTemplate<this["_dataItem"]>;
    /**
     * Holds data items for data sets (usually aggregated data).
     *
     * @ignore
     * @since 4.7.0
     * @return  Data sets
     */
    readonly dataSets: Dictionary<string, OrderedListTemplate<this["_dataItem"]>>;
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
    setDataSet(id: string): boolean;
    /**
     * Returns id of the currently used data set, or `undefined` if main data set
     * is in use.
     *
     * @since 4.7.0
     * @return Current data set id
     */
    readonly currentDataSetId: string;
    /**
     * Returns reference to "main" data set (unaggregated data as it was supplied
     * in `data`).
     *
     * @since 4.7.0
     * @return Main data set
     */
    readonly mainDataSet: OrderedListTemplate<this["_dataItem"]>;
    /**
     * Updates the indexes for the dataItems
     *
     * @ignore Exclude from docs
     */
    protected _updateDataItemIndexes(startIndex: number): void;
    /**
     * Processes newly added [[DataItem]] as well as triggers data re-validation.
     *
     * @ignore Exclude from docs
     * @param event [description]
     */
    protected handleDataItemAdded(event: ISortedListEvents<DataItem>["inserted"]): void;
    /**
     * removes [[DataItem]] as well as triggers data re-validation.
     *
     * @ignore Exclude from docs
     * @param event [description]
     */
    protected handleDataItemRemoved(event: ISortedListEvents<DataItem>["removed"]): void;
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
    bindDataField<Key extends keyof this["_dataFields"]>(field: Key, value: this["_dataFields"][Key]): void;
    /**
     * Invalidates processed data.
     *
     * @ignore Exclude from docs
     */
    invalidateProcessedData(): void;
    /**
     * [resetProcessedRange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    resetProcessedRange(): void;
    /**
     * Returns all other [[Component]] objects that are using this element's
     * data.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @return [description]
     */
    readonly dataUsers: List<Component>;
    /**
     * Returns a clone of this element.
     *
     * @return Clone
     */
    clone(): this;
    /**
     * Copies all parameters from another [[Component]].
     *
     * @param source Source Component
     */
    copyFrom(source: this): void;
    /**
     * Invalidates the whole element, including all its children, causing
     * complete re-parsing of data and redraw.
     *
     * Use sparingly!
     */
    reinit(): void;
    /**
     * Add an adapter for data.
     *
     * @return Exporting
     */
    protected getExporting(): Export;
    private _exportData;
    protected setDisabled(value: boolean): boolean;
    /**
     * @ignore
     */
    protected setShowOnInit(value: boolean): void;
    protected setBaseId(value: string): void;
    /**
     * Use this for [[CategoryAxis]] or [[DateAxis]].
     *
     * Allows restricting zoom in beyond certain number of categories or base
     * intervals.
     *
     * @default 1
     * @param value  Min zoom count
     */
    /**
    * @return Min zoom count
    */
    minZoomCount: number;
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
    /**
    * @return Max zoom count
    */
    maxZoomCount: number;
    /**
     * Called during the System.update method
     *
     * @ignore Exclude from docs
     */
    _systemCheckIfValidate(): boolean;
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    protected asFunction(field: string): boolean;
}
