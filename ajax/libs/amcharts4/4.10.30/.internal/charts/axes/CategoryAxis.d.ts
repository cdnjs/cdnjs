/**
 * Category axis module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Axis, AxisItemLocation, AxisDataItem, IAxisProperties, IAxisDataFields, IAxisAdapters, IAxisEvents, IAxisDataItemAdapters } from "./Axis";
import { IPoint, IOrientationPoint } from "../../core/defs/IPoint";
import { Animation } from "../../core/utils/Animation";
import { AxisRenderer } from "./AxisRenderer";
import { SerialChart } from "../types/SerialChart";
import { Dictionary } from "../../core/utils/Dictionary";
import { XYSeries, XYSeriesDataItem } from "../series/XYSeries";
import { ColumnSeries } from "../series/ColumnSeries";
import { CategoryAxisBreak } from "./CategoryAxisBreak";
import { IRange } from "../../core/defs/IRange";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CategoryAxis]].
 *
 * @see {@link DataItem}
 */
export declare class CategoryAxisDataItem extends AxisDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: CategoryAxis;
    seriesDataItems: {
        [index: string]: XYSeriesDataItem[];
    };
    deltaAnimation: Animation;
    /**
     * Defines available adapters.
     */
    _adapter: ICategoryAxisDataItemAdapters;
    /**
     * Constructor
     */
    constructor();
    /**
     * Category.
     *
     * @param value  Category
     */
    /**
    * @return Category
    */
    category: string;
    /**
     * End category.
     *
     * Used for items that span several categories, like [[CategoryAxisBreak]].
     *
     * @param value  End category
     */
    /**
    * @return End category
    */
    endCategory: string;
    deltaPosition: number;
}
/**
 * Defines adapters for [[DataItem]]
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface ICategoryAxisDataItemAdapters extends IAxisDataItemAdapters {
    category: string;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[CategoryAxis]].
 */
export interface ICategoryAxisDataFields extends IAxisDataFields {
    /**
     * A field that holds category information.
     */
    category?: string;
}
/**
 * Defines properties for [[CategoryAxis]].
 */
export interface ICategoryAxisProperties extends IAxisProperties {
    sortBySeries?: ColumnSeries;
}
/**
 * Defines events for [[CategoryAxis]].
 */
export interface ICategoryAxisEvents extends IAxisEvents {
}
/**
 * Defines adapter for [[CategoryAxis]].
 *
 * @see {@link Adapter}
 */
export interface ICategoryAxisAdapters extends IAxisAdapters, ICategoryAxisProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a category-based axis for the chart.
 *
 * ```TypeScript
 * // Create the axis
 * let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 *
 * // Set settings
 * xAxis.title.text = "Clients";
 * ```
 * ```JavaScript
 * // Create the axis
 * var valueAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Clients";
 * ```
 * ```JSON
 * "xAxes": [{
 *   "type": "CategoryAxis",
 *   "title": {
 *     "text": "Clients"
 *   }
 * }]
 * ```
 *
 * @see {@link ICategoryAxisEvents} for a list of available Events
 * @see {@link ICategoryAxisAdapters} for a list of available Adapters
 * @important
 */
export declare class CategoryAxis<T extends AxisRenderer = AxisRenderer> extends Axis<T> {
    /**
     * Defines data fields.
     */
    _dataFields: ICategoryAxisDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICategoryAxisProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICategoryAxisAdapters;
    /**
     * Defines available events.
     */
    _events: ICategoryAxisEvents;
    /**
     * Defines the type of the Date Items.
     */
    _dataItem: CategoryAxisDataItem;
    /**
     * Defines the type of the axis breaks.
     */
    _axisBreak: CategoryAxisBreak;
    /**
     * A reference to chart the axis is for.
     */
    chart: SerialChart;
    /**
     * Frequency of the labels on axis.
     */
    protected _frequency: number;
    /**
     * A collection that holds Axis' data items sorted by each category.
     */
    dataItemsByCategory: Dictionary<string, this["_dataItem"]>;
    /**
     * last data item is used for the closing grid
     */
    protected _lastDataItem: CategoryAxisDataItem;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns a new/empty [[DataItem]] of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Returns a new/empty [[AxisBreak]] of the appropriate type.
     *
     * @return Axis break
     */
    protected createAxisBreak(): this["_axisBreak"];
    /**
     * Processes a related series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    processSeriesDataItem(dataItem: XYSeriesDataItem, axisLetter?: string): void;
    /**
     * Validates the data range.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    validateDataRange(): void;
    /**
     * Validates the whole axis. Causes it to redraw.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    validate(): void;
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem   [description]
     * @param itemIndex  [description]
     */
    validateDataElement(dataItem: this["_dataItem"], itemIndex?: number, index?: number): void;
    /**
     * @ignore
     */
    disposeData(): void;
    /**
     * Processes the axis data item.
     *
     * @ignore Exclude from docs
     * @param dataItem     Data item
     * @param dataContext  The raw data that corresponds to this data item
     */
    processDataItem(dataItem: this["_dataItem"], dataContext: Object): void;
    protected getDataItem(dataContext?: any): this["_dataItem"];
    /**
     * Converts a category index to an actual screen coordinate on the axis.
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     *
     * @param index     Index
     * @param location  Location (0-1)
     * @return Position (px)
     */
    indexToPosition(index: number, location?: AxisItemLocation | number): number;
    /**
     * Converts a string category name to relative position on axis.
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     *
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Position
     */
    categoryToPosition(category: string, location?: AxisItemLocation): number;
    /**
     * Converts a string category name to a orientation point (x, y, angle) on axis
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Orientation point
     */
    categoryToPoint(category: string, location?: AxisItemLocation): IOrientationPoint;
    /**
     * Converts a string category name to a orientation point (x, y, angle) on axis
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Orientation point
     */
    anyToPoint(category: string, location?: AxisItemLocation): IOrientationPoint;
    /**
     * Converts a string category name to relative position on axis.
     *
     * An alias to `categoryToPosition()`.
     *
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Relative position
     */
    anyToPosition(category: string, location?: AxisItemLocation): number;
    /**
     * Converts named category to an index of data item it corresponds to.
     *
     * @param category  Category
     * @return Data item index
     */
    categoryToIndex(category: string): number;
    /**
     * Zooms the axis to specific named ctaegories.
     *
     * @param startCategory  Start category
     * @param endCategory    End category
     */
    zoomToCategories(startCategory: string, endCategory: string): void;
    /**
     * [getAnyRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param start         [description]
     * @param end           [description]
     * @param startLocation [description]
     * @param endLocation   [description]
     * @return [description]
     */
    getAnyRangePath(start: string, end: string, startLocation?: AxisItemLocation, endLocation?: AxisItemLocation): string;
    /**
     * Takes an absolute position (px) within axis and adjust it to a specific
     * `location` within category it corresponds to.
     *
     * @param position  Source position (px)
     * @param location  Location within category (0-1)
     * @return Adjusted position (px)
     */
    roundPosition(position: number, location?: AxisItemLocation): number;
    /**
     * Finds and returns first series data item with specific category
     * @param series    Target series
     * @param category  Category
     * @return XYSeriesDataItem data item
     */
    getFirstSeriesDataItem(series: XYSeries, category: string): XYSeriesDataItem;
    /**
     * Finds and returns last series data item with specific category.
     * @param series    Target series
     * @param category  Category
     * @return XYSeriesDataItem data item
     */
    getLastSeriesDataItem(series: XYSeries, category: string): XYSeriesDataItem;
    getSeriesDataItemByCategory(category: string, series: XYSeries): XYSeriesDataItem;
    /**
     * Returns a data item from Series that corresponds to a specific absolute
     * position on the Axis.
     *
     * @param series    Target series
     * @param position  Position (px)
     * @return XYSeriesDataItem data item
     */
    getSeriesDataItem(series: XYSeries, position: number, findNearest?: boolean): XYSeriesDataItem;
    /**
     * Returns the X coordinate for series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Category
     * @param location  Location (0-1)
     * @return X coordinate (px)
     */
    getX(dataItem: XYSeriesDataItem, key?: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns relative position on axis for series' data item.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Category
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    getPositionX(dataItem: XYSeriesDataItem, key?: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns the Y coordinate for series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Category
     * @param location  Location (0-1)
     * @return Y coordinate (px)
     */
    getY(dataItem: XYSeriesDataItem, key?: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns relative position on axis for series' data item.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Category
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    getPositionY(dataItem: XYSeriesDataItem, key?: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns an angle for series data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Category
     * @param location  Location (0-1)
     * @param stackKey  Stack key (?)
     * @param range Range to fit in
     * @return Angle
     */
    getAngle(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns an absolute pixel coordinate of the start of the cell (category),
     * that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Position (px)
     * @return Cell start position (px)
     */
    getCellStartPosition(position: number): number;
    /**
     * Returns an absolute pixel coordinate of the end of the cell (category),
     * that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Position (px)
     * @return Cell end position (px)
     */
    getCellEndPosition(position: number): number;
    /**
     * Returns text to show in a category tooltip, based on specific position
     * within axis.
     *
     * @ignore Exclude from docs
     * @param position  Position (px)
     * @return Label (category)
     */
    getTooltipText(position: number): string;
    /**
     * Returns an index of the category that corresponds to specific pixel
     * position within axis.
     *
     * @param position  Position (px)
     * @return Category index
     */
    positionToIndex(position: number): number;
    /**
     * Returns category based on position.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * This is a synonim of `getPositionLabel()` implemented here for consistentcy.
     *
     * @since 4.3.8
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    positionToCategory(position: number): string;
    /**
     * Returns category based on position.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    getPositionLabel(position: number): string;
    /**
     * Coordinates of the actual axis start.
     *
     * @ignore Exclude from docs
     * @return Base point
     */
    readonly basePoint: IPoint;
    /**
     * Initializes Axis' renderer.
     *
     * @ignore Exclude from docs
     */
    initRenderer(): void;
    /**
     * Current frequency of labels of the axis.
     *
     * Normally it would be 1, but when labels start to be hidden due
     * to `minGridDistance` this read-only property will increase.
     *
     * @readonly
     * @since 4.2.0
     * @return Label frequency
     */
    readonly frequency: number;
    /**
     * If set to a reference of [[ColumnSeries]] the categories will be sorted
     * by actual values.
     *
     * The categories are ordered in descending order (from highest values to
     * lowest). To reverse the order, use axis renderer's `inversed` setting.
     * E.g.:
     *
     * ```TypeScript
     * categoryAxis.sortBySeries = series;
     * categoryAxis.renderer.inversed = true;
     * ```
     * ```JavaScript
     * categoryAxis.sortBySeries = series;
     * categoryAxis.renderer.inversed = true;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "xAxes": [{
     *     // ...
     *     "sortBySeries": "s1",
     *     "renderer": {
     *       // ...
     *       "inversed": true
     *     }
     *   }]
     * }
     * ```
     *
     * @since 4.8.7
     * @param  value  Sort categories?
     */
    /**
    * @return Sort categories?
    */
    sortBySeries: ColumnSeries;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
