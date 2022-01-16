/**
 * Defines Percent Chart Series.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem, ISeriesProperties, ISeriesDataFields, ISeriesAdapters, ISeriesEvents } from "./Series";
import { ISpriteEvents, AMEvent } from "../../core/Sprite";
import { Sprite } from "../../core/Sprite";
import { Label } from "../../core/elements/Label";
import { Tick } from "../elements/Tick";
import { ListTemplate } from "../../core/utils/List";
import { Container } from "../../core/Container";
import { Animation } from "../../core/utils/Animation";
import { LegendDataItem, LegendSettings } from "../../charts/Legend";
import { ColorSet } from "../../core/utils/ColorSet";
import { PatternSet } from "../../core/utils/PatternSet";
import { PercentChart } from "../types/PercentChart";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PercentSeries]].
 *
 * @see {@link DataItem}
 */
export declare class PercentSeriesDataItem extends SeriesDataItem {
    /**
     * A type of slice used for this series.
     */
    _slice: Sprite;
    /**
     * A reference to a slice label element.
     *
     * @ignore Exclude from docs
     */
    _label: Label;
    /**
     * A reference to a slice tick element.
     * @ignore Exclude from docs
     */
    _tick: Tick;
    /**
     * A reference to a corresponding legend data item.
     */
    protected _legendDataItem: LegendDataItem;
    /**
     * Custom settings for the legend item.
     * Not used, only added to sattisfy LegendDataItem
     *
     * @ignore
     */
    legendSettings: LegendSettings;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: PercentSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * Adds an `id` attribute the the slice element and returns its id.
     *
     * @ignore Exclude from docs
     */
    uidAttr(): string;
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
     * Sets visibility of the Data Item.
     *
     * @param value Data Item
     */
    setVisibility(value: boolean, noChangeValues?: boolean): void;
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    show(duration?: number, delay?: number, fields?: string[]): $type.Optional<Animation>;
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
     * Creates a marker used in the legend for this slice.
     *
     * @ignore Exclude from docs
     * @param marker  Marker container
     */
    createLegendMarker(marker: Container): void;
    /**
     * A legend's data item, that corresponds to this data item.
     *
     * @param value  Legend data item
     */
    /**
    * @return Legend data item
    */
    legendDataItem: LegendDataItem;
    /**
     * A Tick element, related to this data item. (slice)
     *
     * @readonly
     * @return Tick element
     */
    readonly tick: this["_tick"];
    /**
     * A Label element, related to this data item. (slice)
     *
     * @readonly
     * @return Label element
     */
    readonly label: this["_label"];
    /**
     * An element, related to this data item. (slice)
     *
     * @readonly
     * @return Slice element
     */
    readonly slice: this["_slice"];
    /**
     * Should dataItem (slice) be hidden in legend?
     *
     * @param value Visible in legend?
     */
    /**
    * @return Disabled in legend?
    */
    hiddenInLegend: boolean;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[PercentSeries]].
 */
export interface IPercentSeriesDataFields extends ISeriesDataFields {
    /**
     * Name of the field in data that holds category.
     */
    category?: string;
    /**
     * Name of the field in data that holds boolean flag if item should be
     * hidden in legend.
     */
    hiddenInLegend?: string;
}
/**
 * Defines properties for [[PercentSeries]].
 */
export interface IPercentSeriesProperties extends ISeriesProperties {
    /**
     * A color set to be used for slices.
     *
     * For each new subsequent slice, the chart will assign the next color in
     * this set.
     */
    colors?: ColorSet;
    /**
     * Pattern set to apply to fills.
     *
     * @since 4.7.5
     */
    patterns?: PatternSet;
    /**
     * Align labels into nice vertical columns?
     *
     * @default true
     */
    alignLabels?: boolean;
    /**
     * If set to `true` the chart will not show slices with zero values.
     *
     * @default false
     * @since 4.7.9
     */
    ignoreZeroValues?: boolean;
}
/**
 * Defines events for [[PercentSeries]].
 */
export interface IPercentSeriesEvents extends ISeriesEvents {
}
/**
 * Defines adapters for [[PercentSeries]].
 *
 * @see {@link Adapter}
 */
export interface IPercentSeriesAdapters extends ISeriesAdapters, IPercentSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[PercentSeries]] which is a base class for [[PieSeries]],
 * [[FunnelSeries]], and [[PyramidSeries]].
 *
 * @see {@link IPercentSeriesEvents} for a list of available Events
 * @see {@link IPercentSeriesAdapters} for a list of available Adapters
 */
export declare class PercentSeries extends Series {
    /**
     * Defines type of the slice elements for the series.
     */
    _slice: Sprite;
    /**
     * Defines type of the tick elements for the series.
     */
    _tick: Tick;
    /**
     * Defines type of the label elements for the series.
     */
    _label: Label;
    /**
     * A reference to chart this series is for.
     *
     * @ignore Exclude from docs
     */
    _chart: PercentChart;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IPercentSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IPercentSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPercentSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IPercentSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: PercentSeriesDataItem;
    /**
     * Container slice elements are put in.
     */
    slicesContainer: Container;
    /**
     * Container tick elements are put in.
     */
    ticksContainer: Container;
    /**
     * Container label elements are put in.
     */
    labelsContainer: Container;
    /**
     * List of slice elements.
     */
    protected _slices: ListTemplate<this["_slice"]>;
    /**
     * List of tick elements.
     */
    protected _ticks: ListTemplate<this["_tick"]>;
    /**
     * List of label elements.
     */
    protected _labels: ListTemplate<this["_label"]>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates a slice element.
     *
     * @return Slice
     */
    protected createSlice(): this["_slice"];
    /**
     * Creates a tick element.
     *
     * @return Tick
     */
    protected createTick(): this["_tick"];
    /**
     * Sreates label element.
     *
     * @return label
     */
    protected createLabel(): this["_label"];
    /**
     * A list of slice elements for the series.
     *
     * Use its `template` to configure look and behavior of the slices. E.g.:
     *
     * ```TypeScript
     * series.slices.template.stroke = am4core.color("#fff");
     * series.slices.template.strokeWidth = 2;
     * ```
     * ```JavaScript
     * series.slices.template.stroke = am4core.color("#fff");
     * series.slices.template.strokeWidth = 2;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "slices": {
     *       "stroke": "#fff",
     *       "strokeWidth": 2
     *     }
     *   }]
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/list-templates/} for more information about list templates
     * @return Slices
     */
    readonly slices: ListTemplate<this["_slice"]>;
    /**
     * A list of tick elements for the series. Ticks connect slice to its label.
     *
     * Use its `template` to configure look and behavior of the ticks. E.g.:
     *
     * ```TypeScript
     * series.ticks.template.strokeWidth = 2;
     * ```
     * ```JavaScript
     * series.ticks.template.strokeWidth = 2;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "ticks": {
     *       "strokeWidth": 2
     *     }
     *   }]
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/list-templates/} for more information about list templates
     * @return Ticks
     */
    readonly ticks: ListTemplate<this["_tick"]>;
    /**
     * A list of slice label elements for the series.
     *
     * Use its `template` to configure look and behavior of the labels. E.g.:
     *
     * ```TypeScript
     * series.labels.template.fill = am4core.color("#c00");
     * series.labels.template.fontSize = 20;
     * ```
     * ```JavaScript
     * series.labels.template.fill = am4core.color("#c00");
     * series.labels.template.fontSize = 20;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "labels": {
     *       "stroke": "#c00",
     *       "fontSize": 20
     *     }
     *   }]
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/list-templates/} for more information about list templates
     * @return Labels
     */
    readonly labels: ListTemplate<this["_label"]>;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Creates and returns a new slice element.
     *
     * @param sliceType  Type of the slice element
     * @return Slice
     */
    protected initSlice(slice: this["_slice"]): void;
    protected initLabel(label: this["_label"]): void;
    protected initTick(label: this["_tick"]): void;
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * Validates (processes) data.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Arranges slice labels according to position settings.
     *
     * @ignore Exclude from docs
     * @param dataItems  Data items
     */
    protected arrangeLabels(dataItems: this["_dataItem"][]): void;
    protected arrangeLabels2(dataItems: this["_dataItem"][]): void;
    /**
     * Returns the next label according to `index`.
     *
     * @param index      Current index
     * @param dataItems  Data items
     * @return Label element
     */
    protected getNextLabel(index: number, dataItems: this["_dataItem"][]): this["_label"];
    /**
     * A color set to be used for slices.
     *
     * For each new subsequent slice, the chart will assign the next color in
     * this set.
     *
     * @param value  Color set
     */
    /**
    * @return Color set
    */
    colors: ColorSet;
    /**
     * A [[PatternSet]] to use when creating patterned fills for slices.
     *
     * @since 4.7.5
     * @param value  Pattern set
     */
    /**
    * @return Pattern set
    */
    patterns: PatternSet;
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param marker    Container
     * @param dataItem  Data item
     */
    createLegendMarker(marker: Container, dataItem?: this["_dataItem"]): void;
    /**
     * Repositions bullets when slice's size changes.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    protected handleSliceScale(event: AMEvent<this["_slice"], ISpriteEvents>["propertychanged"]): void;
    /**
     * Repositions bullet and labels when slice moves.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    protected handleSliceMove(event: AMEvent<this["_slice"], ISpriteEvents>["propertychanged"]): void;
    /**
     * Copies all properties from another instance of [[PercentSeries]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
     * Align labels into nice vertical columns?
     *
     * This will ensure that labels never overlap with each other.
     *
     * Arranging labels into columns makes them more readble, and better user
     * experience.
     *
     * If set to `false` labels will be positioned at `label.radius` distance,
     * and may, in some cases, overlap.
     *
     * @default true
     * @param value  Align labels?
     */
    /**
    * @return Align labels?
    */
    alignLabels: boolean;
    /**
     * @ignore
     */
    protected setAlignLabels(value: boolean): void;
    /**
     * If set to `true` the chart will not show slices with zero values.
     *
     * @default false
     * @since 4.7.9
     * @param  value  Ignore zero values
     */
    /**
    * @return Ignore zero values
    */
    ignoreZeroValues: boolean;
    /**
     * Updates corresponding legend data item with current values.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    updateLegendValue(dataItem?: this["_dataItem"]): void;
}
