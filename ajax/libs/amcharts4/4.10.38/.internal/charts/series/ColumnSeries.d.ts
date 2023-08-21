/**
 * Column series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYSeries, IXYSeriesDataFields, XYSeriesDataItem, IXYSeriesProperties, IXYSeriesAdapters, IXYSeriesEvents } from "./XYSeries";
import { Sprite } from "../../core/Sprite";
import { SpriteState } from "../../core/SpriteState";
import { Container } from "../../core/Container";
import { ListTemplate } from "../../core/utils/List";
import { Dictionary } from "../../core/utils/Dictionary";
import { CategoryAxis } from "../axes/CategoryAxis";
import { Bullet } from "../elements/Bullet";
import { Column } from "../elements/Column";
import { Percent } from "../../core/utils/Percent";
import { IDataItemAdapters } from "../../core/DataItem";
/**
 * Defines adapters for [[DataItem]]
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface IColumnSeriesDataItemAdapters extends IDataItemAdapters {
    width: number | Percent;
    height: number | Percent;
}
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ColumnSeries]].
 *
 * @see {@link DataItem}
 */
export declare class ColumnSeriesDataItem extends XYSeriesDataItem {
    /**
     * Defines available adapters.
     */
    _adapter: IColumnSeriesDataItemAdapters;
    /**
     * A Column Element
     */
    _column: Column;
    /**
     * Indicates if this data items close value is lower than its open value.
     */
    droppedFromOpen: boolean;
    /**
     * Indicates if this items value is lower than previous data item's value.
     */
    droppedFromPrevious: boolean;
    /**
     * Defines a type of [[Component]] this data item is used for
     */
    _component: ColumnSeries;
    /**
     * A dictionary storing axes ranges columns by axis uid
     *
     * @ignore
     */
    protected _rangesColumns: Dictionary<string, this["_column"]>;
    /**
     * Constructor
     */
    constructor();
    /**
     * A column used to draw a column for this data item.
     *
     * @param column
     */
    /**
    * @return Column
    */
    column: this["_column"];
    protected setColumn(column: this["_column"]): void;
    width: number | Percent;
    height: number | Percent;
    /**
     * A dictionary storing axes ranges columns by axis uid
     */
    readonly rangesColumns: Dictionary<string, this["_column"]>;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[XYSeries]].
 */
export interface IColumnSeriesDataFields extends IXYSeriesDataFields {
    width?: string;
}
/**
 * Defines properties for [[ColumnSeries]].
 */
export interface IColumnSeriesProperties extends IXYSeriesProperties {
    /**
     * Cluster this series columns?
     *
     * Setting to `false` will make columns overlap with other series.
     *
     * @default true
     */
    clustered?: boolean;
}
/**
 * Defines events for [[ColumnSeries]].
 */
export interface IColumnSeriesEvents extends IXYSeriesEvents {
}
/**
 * Defines adapters for [[ColumnSeries]].
 *
 * @see {@link Adapter}
 */
export interface IColumnSeriesAdapters extends IXYSeriesAdapters, IColumnSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a column graph.
 *
 * @see {@link IColumnSeriesEvents} for a list of available Events
 * @see {@link IColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class ColumnSeries extends XYSeries {
    /**
     * Type of column.
     */
    _column: Column;
    /**
     * Defines available data fields.
     */
    _dataFields: IColumnSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IColumnSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IColumnSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IColumnSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: ColumnSeriesDataItem;
    /**
     * A list of column elements.
     */
    protected _columns: ListTemplate<this["_column"]>;
    /**
     * Container to put column elements in.
     */
    protected _columnsContainer: Container;
    /**
     * Start location within cell for columns.
     */
    protected _startLocation: number;
    /**
     * End location within cell for columns.
     */
    protected _endLocation: number;
    /**
     * A state to apply to a column when close value is lower than open value.
     */
    protected _dropFromOpenState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * A state to apply to a column when its value is lower value of a previous
     * column.
     */
    protected _dropFromPreviousState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * A state to apply to a column when close value is same or higher than open
     * value.
     */
    protected _riseFromOpenState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * A state to apply to a column when its value is same or higher than value
     * of a previous column.
     */
    protected _riseFromPreviousState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * Constructor
     */
    constructor();
    /**
     * A container that columns are created in.
     *
     * @ignore Exclude from docs
     */
    readonly columnsContainer: Container;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    protected sortCategoryAxis(axis: CategoryAxis, key: string): void;
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * Returns relative start location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    protected getStartLocation(dataItem: this["_dataItem"]): number;
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    /**
     * Returns relative end location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    protected getEndLocation(dataItem: this["_dataItem"]): number;
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElementReal(dataItem: this["_dataItem"]): void;
    /**
     * @ignore
     */
    protected disableUnusedColumns(dataItem: ColumnSeriesDataItem): void;
    /**
     * Apply different state/coloring to columns based on the change value.
     *
     * @param sprite  Sprite to apply state to
     * @todo Do not apply accessibility to wicks of the candlesticks
     */
    protected setColumnStates(sprite: Sprite): void;
    /**
     * A list of column elements in the series.
     *
     * @return Columns
     */
    readonly columns: ListTemplate<this["_column"]>;
    /**
     * Creates and returns a column element to use as a template.
     *
     * @return Column template
     */
    protected createColumnTemplate(): this["_column"];
    /**
     * Cluster this series columns?
     *
     * Setting to `false` will make columns overlap with other series.
     *
     * @default true
     * @param value  Clustered?
     */
    /**
    * @return Clustered?
    */
    clustered: boolean;
    /**
     * A state to apply to a column when close value is lower than open value.
     *
     * Can be used to differentiate appearance based on value relations.
     *
     * NOTE: this will work only if at least one axis is [[ValueAxis]].
     *
     * @readonly You can modify state object, but can't overwrite it
     * @param  value  State
     */
    /**
    * @return State
    */
    dropFromOpenState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * A state to apply to a column when its value is lower value of a previous
     * column.
     *
     * Can be used to differentiate appearance based on value relations.
     *
     * @readonly You can modify state object, but can't overwrite it
     * @param  value  State
     */
    /**
    * @return State
    */
    dropFromPreviousState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * A state to apply to a column when close value is same or higher than open
     * value.
     *
     * Can be used to differentiate appearance based on value relations.
     *
     * NOTE: this will work only if at least one axis is [[ValueAxis]].
     *
     * @readonly You can modify state object, but can't overwrite it
     * @param  value  State
     */
    /**
    * @return State
    */
    riseFromOpenState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * A state to apply to a column when its value is same or higher than value
     * of a previous column.
     *
     * Can be used to differentiate appearance based on value relations.
     *
     * @readonly You can modify state object, but can't overwrite it
     * @param  value  State
     */
    /**
    * @return State
    */
    riseFromPreviousState: SpriteState<this["_properties"], this["_adapter"]>;
    /**
     * Updates value of the related legend item.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    updateLegendValue(dataItem?: this["_dataItem"], notRange?: boolean): void;
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    /**
     * Copies all properties from another instance of [[ColumnSeries]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
    * returns bullet x location
    * @ignore
    */
    protected getBulletLocationX(bullet: Bullet, field: string): number;
    /**
    * returns bullet y location
    * @ignore
    */
    protected getBulletLocationY(bullet: Bullet, field: string): number;
    protected getAdjustedXLocation(dataItem: this["_dataItem"], field: string, bulletLocationX?: number): number;
    protected getAdjustedYLocation(dataItem: this["_dataItem"], field: string, bulletLocationY?: number): number;
    /**
     * @ignore Exclude from docs
     */
    protected fixVerticalCoordinate(coordinate: number): number;
    /**
     * @ignore Exclude from docs
     */
    protected fixHorizontalCoordinate(coordinate: number): number;
    /**
     * @ignore
     */
    disposeData(): void;
}
