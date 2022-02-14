/**
 * Defines Venn Diagram Series.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IPercentSeriesAdapters, IPercentSeriesDataFields, IPercentSeriesEvents, IPercentSeriesProperties, PercentSeries, PercentSeriesDataItem } from "../../charts/series/PercentSeries";
import { Label } from "../../core/elements/Label";
import { VennDiagram } from "./VennDiagram";
import * as $type from "../../core/utils/Type";
import { Sprite } from "../../core/Sprite";
import { Animation } from "../../core/utils/Animation";
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
export declare class VennSeriesDataItem extends PercentSeriesDataItem {
    /**
     * A type of slice used for this series.
     */
    _slice: Sprite;
    /**
     * A reference to a label element.
     */
    _label: Label;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: VennSeries;
    /**
     * @ignore
     */
    radius: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * List of categories this data item represents intersection of.
     *
     * @param  value  Array of intersecting categories
     */
    /**
    * @return Array of intersecting categories
    */
    intersections: string[];
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    hide(duration?: number, delay?: number, toValue?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    show(duration?: number, delay?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * @ignore
     */
    animateRadius(toValue: number, duration: number, easing: (value: number) => number): void;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[VennSeries]].
 */
export interface IVennSeriesDataFields extends IPercentSeriesDataFields {
    /**
     * A field that may hold an array of categories. If present, this data item
     * will represent an intersection of categories listed in an array.
     */
    intersections?: string;
}
/**
 * Defines properties for [[VennSeries]].
 */
export interface IVennSeriesProperties extends IPercentSeriesProperties {
}
/**
 * Defines events for [[VennSeries]].
 */
export interface IVennSeriesEvents extends IPercentSeriesEvents {
}
/**
 * Defines adapters for [[VennSeries]].
 *
 * @see {@link Adapter}
 */
export interface IVennSeriesAdapters extends IPercentSeriesAdapters, IVennSeriesProperties {
}
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
export declare class VennSeries extends PercentSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _slice: Sprite;
    /**
     * Defines available adapters.
     */
    _label: Label;
    /**
     * A reference to chart this series is for.
     *
     * @ignore Exclude from docs
     */
    _chart: VennDiagram;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IVennSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IVennSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IVennSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IVennSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: VennSeriesDataItem;
    /**
     * Holds sum of values for all slices.
     */
    protected _total: number;
    /**
     * Holds number of slices.
     */
    protected _count: number;
    /**
     * A sprite which is visible when slice is hovered.
     *
     * This sprite gets the path of a hovered slice so the shape is identical. It
     * helps create nice hover effect.
     */
    hoverSprite: Sprite;
    /**
     * @ignore
     */
    protected vennData: string;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates a Sprite element.
     *
     * @return Sprite
     */
    protected createSlice(): Sprite;
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
     * Inits Slice.
     *
     * @param Slice to init
     */
    protected initSlice(slice: this["_slice"]): void;
    /**
     * Inits a Slice label.
     *
     * @param Label
     */
    protected initLabel(label: this["_label"]): void;
    /**
     * @ignore
     */
    updateHoverSprite(sprite: Sprite): void;
    /**
     * [validateDataElements description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    validateDataElements(): void;
    /**
     * Returns data item by category.
     *
     * @param   category  Category
     * @return            Data item
     */
    getDataItemByCategory(category: string): VennSeriesDataItem;
}
