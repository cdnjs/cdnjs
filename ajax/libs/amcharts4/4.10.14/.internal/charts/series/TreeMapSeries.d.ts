/**
 * TreeMap series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, IColumnSeriesProperties, IColumnSeriesDataFields, IColumnSeriesAdapters, IColumnSeriesEvents, ColumnSeriesDataItem } from "./ColumnSeries";
import { TreeMap, TreeMapDataItem } from "../types/TreeMap";
import { Animation } from "../../core/utils/Animation";
import * as $type from "../../core/utils/Type";
import { Container } from "../../core/Container";
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
export declare class TreeMapSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: TreeMapSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * Data for the this particular item.
     *
     * @param value  Item's data
     */
    /**
     * @return Item's data
     */
    /**
     * The name of the item's parent item.
     *
     * @return Parent name
     */
    readonly parentName: string;
    /**
     * Item's numeric value.
     *
     * @readonly
     * @return Value
     */
    readonly value: number;
    /**
     * A corresponding data item from the tree map.
     *
     * @readonly
     * @return Data item
     */
    readonly treeMapDataItem: TreeMapDataItem;
    /**
     * Hides the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param toValue   A value to set to `fields` when hiding
     * @param fields    A list of data fields to set value to `toValue`
     */
    hide(duration?: number, delay?: number, toValue?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * Shows the Data Item and related visual elements.
     *
     * @param duration  Animation duration (ms)
     * @param delay     Delay animation (ms)
     * @param fields    A list of fields to set values of
     */
    show(duration?: number, delay?: number, fields?: string[]): $type.Optional<Animation>;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[TreeMapSeries]].
 */
export interface ITreeMapSeriesDataFields extends IColumnSeriesDataFields {
    /**
     * Name of the field in data that holds numeric value.
     */
    value?: string;
}
/**
 * Defines properties for [[TreeMapSeries]].
 */
export interface ITreeMapSeriesProperties extends IColumnSeriesProperties {
}
/**
 * Defines events for [[TreeMapSeries]].
 */
export interface ITreeMapSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[TreeMapSeries]].
 *
 * @see {@link Adapter}
 */
export interface ITreeMapSeriesAdapters extends IColumnSeriesAdapters, ITreeMapSeriesProperties {
}
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
export declare class TreeMapSeries extends ColumnSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ITreeMapSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ITreeMapSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ITreeMapSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ITreeMapSeriesEvents;
    /**
     * The level in treemap hierarchy series is at.
     */
    level: number;
    /**
     * Type of the data item used by series.
     */
    _dataItem: TreeMapSeriesDataItem;
    /**
     * A chart series belongs to.
     */
    _chart: TreeMap;
    /**
     * Parent data item of a series.
     */
    parentDataItem: TreeMapDataItem;
    /**
     * Constructor
     */
    constructor();
    /**
     * Processes data item.
     *
     * @param dataItem     Data item
     * @param dataContext  Raw data
     * @param index        Index of the data item
     */
    protected processDataItem(dataItem: this["_dataItem"], dataContext?: Object): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Shows series.
     *
     * @param duration  Duration of fade in (ms)
     * @return Animation
     */
    show(duration?: number): Animation;
    /**
     * Hides series.
     *
     * @param duration  Duration of fade out (ms)
     * @return Animation
     */
    hide(duration?: number): Animation;
    /**
     * Process values.
     *
     * @ignore Exclude from docs
     */
    processValues(): void;
    /**
     * Returns relative start location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    protected getStartLocation(dataItem: this["_dataItem"]): number;
    /**
     * Returns relative end location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    protected getEndLocation(dataItem: this["_dataItem"]): number;
    /**
     * @ignore
     */
    dataChangeUpdate(): void;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    protected disableUnusedColumns(dataItem: ColumnSeriesDataItem): void;
}
