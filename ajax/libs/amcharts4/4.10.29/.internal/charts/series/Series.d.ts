/**
 * Functionality for any series-based elements, like Line Series (graphs),
 * Pie slice lists, etc.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component, IComponentProperties, IComponentDataFields, IComponentAdapters, IComponentEvents } from "../../core/Component";
import { AxisDataItem } from "../axes/Axis";
import { Sprite } from "../../core/Sprite";
import { List, ListTemplate, IListEvents } from "../../core/utils/List";
import { Dictionary } from "../../core/utils/Dictionary";
import { DataItem } from "../../core/DataItem";
import { Container } from "../../core/Container";
import { SerialChart } from "../types/SerialChart";
import { Axis } from "../axes/Axis";
import { LegendDataItem, LegendSettings } from "../Legend";
import { Ordering } from "../../core/utils/Order";
export interface IHeatRule {
    target: Sprite;
    property: string;
    min: any;
    max: any;
    dataField?: string;
    minValue?: number;
    maxValue?: number;
    logarithmic?: boolean;
}
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Series]].
 *
 * @see {@link DataItem}
 */
export declare class SeriesDataItem extends DataItem {
    /**
     * Related item's width in pixels.
     *
     * This is passed to bullets so that we'd know if the bullet (LabelBullet)
     * fits to max width/height.
     *
     * At the moment this is only used by column series.
     *
     * @ignore Exclude from docs
     */
    itemWidth: number;
    /**
     * Related item's height in pixels.
     *
     * This is passed to bullets so that we'd know if the bullet (LabelBullet)
     * fits to max width/height.
     *
     * At the moment this is only used by column series.
     *
     * @ignore Exclude from docs
     */
    itemHeight: number;
    /**
     * A dictionary of data items bullets, where key is uid of a bullet template.
     *
     * @ignore Exclude from docs
     */
    protected _bullets: Dictionary<string, Sprite>;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: Series;
    /**
     * A dictionary of data items bullets, where key is uid of a bullet template.
     */
    readonly bullets: Dictionary<string, Sprite>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Destroys this object and all related data.
     */
    dispose(): void;
    /**
     * data items's numeric value.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: number;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[Series]].
 */
export interface ISeriesDataFields extends IComponentDataFields {
    /**
     * Name of the field in data that holds numeric value.
     */
    value?: string;
    /**
     * Name of the field in data that holds boolean flag if item should be hidden.
     */
    hidden?: string;
}
/**
 * Defines properties for [[Series]].
 */
export interface ISeriesProperties extends IComponentProperties {
    /**
     * Minimal distance between data points in pixels.
     *
     * If distance gets smaller than this, bullets are turned off to avoid
     * overlapping.
     *
     * `0` (zero) disables this behavior.
     *
     * @default 0
     */
    minBulletDistance?: number;
    /**
     * Should series be hidden in chart's legend?
     */
    hiddenInLegend?: boolean;
    /**
     * Series' name.
     */
    name?: string;
}
/**
 * Defines events for [[Series]].
 */
export interface ISeriesEvents extends IComponentEvents {
    /**
     * @todo Description
     */
    selectionextremeschanged: {};
    /**
     * @todo Description
     */
    extremeschanged: {};
    /**
     * @todo Description
     */
    dataitemchanged: {
        dataItem: DataItem;
    };
}
/**
 * Defines adapters for [[Series]].
 *
 * @see {@link Adapter}
 */
export interface ISeriesAdapters extends IComponentAdapters, ISeriesProperties {
    /**
     * Applied to the name used by screen readers.
     */
    itemReaderText: string;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines base class for any kind of serial data.
 *
 * @see {@link ISeriesEvents} for a list of available Events
 * @see {@link ISeriesAdapters} for a list of available Adapters
 * @todo Separate axis-related stuff to some other class so that MapSeries would not have unrelated stuff
 */
export declare class Series extends Component {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ISeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ISeriesEvents;
    /**
     * Defines a type of data item used for the series.
     */
    _dataItem: SeriesDataItem;
    /**
     * A reference to the legend data item related to this series.
     */
    protected _legendDataItem: LegendDataItem;
    /**
     * Should this series excluded from the axis scale calculations?
     *
     * @default false
     */
    protected _ignoreMinMax: boolean;
    /**
     * Container series' elements are placed in.
     *
     * @ignore Exclude from docs
     */
    mainContainer: Container;
    /**
     * Should series' bullets?
     *
     * @default true
     */
    protected _showBullets: boolean;
    /**
     * List of series' bullets.
     */
    protected _bullets: ListTemplate<Sprite>;
    /**
     * Container bullets are placed in.
     *
     * @ignore Exclude from docs
     */
    bulletsContainer: Container;
    /**
     * A chart series belongs to.
     */
    _chart: SerialChart;
    /**
     * A container axis ranges are placed in.
     *
     * @ignore Exclude from docs
     */
    rangesContainer: Container;
    /**
     * A list of axis ranges for this series.
     */
    axisRanges: List<AxisDataItem>;
    /**
     * Settings for the appearance of the related legend items.
     */
    legendSettings: LegendSettings;
    /**
     * Lowest overal values by type.
     */
    protected _tmin: Dictionary<string, number>;
    /**
     * Highest overal values by type.
     */
    protected _tmax: Dictionary<string, number>;
    /**
     * Lowest values in current selection by type.
     */
    protected _smin: Dictionary<string, number>;
    /**
     * Highest values in current selection by type.
     */
    protected _smax: Dictionary<string, number>;
    /**
     * [dataItemsByAxis description]
     *
     * Both by category and date.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    dataItemsByAxis: Dictionary<string, Dictionary<string, this["_dataItem"]>>;
    /**
     * Normally series items are focusable using keyboard, so that people can
     * select them with a TAB key. However, if there are a lot of data points on
     * screen it might be long and useless to tab through all o fthem.
     *
     * This is where `skipFocusThreshold` comes in. If there are more items than
     * the value set here, we will not make those focusable and rather let screen
     * reader software rely on the series summary, or authors provide alternative
     * detailed information display, such as HTML table.
     *
     * Different series might have different threshold defaults.
     */
    skipFocusThreshold: number;
    /**
     * Holds a default screen reader text for series data items. It will be used
     * to generate information for screen readers. If not set, the series will
     * try to deduce reader text from `tooltipText` or `tooltipHTML`. If those
     * are not set either, a default reader text will be used which is relevant
     * for each Series type.
     */
    protected _itemReaderText: string;
    /**
     * Used to indicate if `itemReaderText` was changed "from the outside".
     */
    protected _itemReaderTextChanged: boolean;
    protected _heatRules: List<IHeatRule>;
    /**
     * Most of the series use absolute values. However sometimes various
     * calculated percent values are need, e.g. item's percent representation
     * across all values in series, etc.
     *
     * It's a resource-intensive operation, so it is disabled by default.
     *
     * If you need percents to be calculated, e.g. for showing them in tooltips,
     * or creating 100% stacks, this setting needs to be set to `true`.
     *
     * NOTE: `PieChart`, which relies on slice percentages, has this
     * automatically set to `true`.
     *
     * @default false
     */
    calculatePercent: boolean;
    /**
     * When `calculatePercent` is enabled and data item's percent value is
     * calculated, last item's real value is used instead of its working value.
     *
     * This is done for the animations when last item in series (e.g. slice in
     * a `PieSeries`) is hidden or shown. (if we would use real value, the
     * calculated percent would always be 100%).
     *
     * Sometimes there is a need (e.g. for drill-down Sunburst) to disable this
     * hack by setting `usePercentHack` to `false`.
     *
     * @since 4.9.13
     * @default true
     */
    usePercentHack: boolean;
    /**
     * Specifies if series should be automatically disposed when removing from
     * chart's `series` list.
     *
     * @default true
     */
    autoDispose: boolean;
    /**
     * When chart/series' data is processed, all kinds of derivative values are
     * calculated. E.g. sum, min, max, change, etc. This is a potentially
     * time-consuming operation, especially prominent in data-heavy charts.
     *
     * If your chart does not need those values, and you have a lot of data,
     * setting this to `true` might give a dramatic increase in initial chart
     * load speed.
     *
     * Please note, regular column and line series usage scenarios do not
     * require derivative values. Those come into play only when you do advanced
     * functionality like coloring segments of charts in different colors
     * depending on change between open and close values, have stacked series, or
     * display any of the derived values, like percent, in tooltips or bullets.
     *
     * @default false
     */
    simplifiedProcessing: boolean;
    /**
     * Constructor
     */
    constructor();
    /**
     * We need this here so that class names can be applied to bullets container.
     *
     * @ignore Exclude from docs
     */
    applyTheme(): void;
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
     * Chart series is used on.
     *
     * @param value  Chart
     */
    /**
    * @return Chart
    */
    chart: this["_chart"];
    /**
     * Positions bullet.
     *
     * @param bullet  Sprite
     */
    positionBullet(bullet: Sprite): void;
    /**
     * Decorates newly created bullet after it has been instert into the list.
     *
     * @param event  List event
     * @todo investigate why itemReaderText is undefined
     */
    protected processBullet(event: IListEvents<Sprite>["inserted"]): void;
    /**
     * removes bullets
     *
     * @param event  List event
     */
    protected removeBullet(event: IListEvents<Sprite>["removed"]): void;
    /**
     * Validates data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * Returns first value for the specific key in the series.
     *
     * @param key  Key
     * @return Value
     * @todo Description
     * @todo Convert to propert object property iterator
     */
    protected getFirstValue(key: string, startIndex: number): number;
    /**
     * Returns first value for the specific key in the series.
     *
     * @param key  Key
     * @return Value
     * @todo Description
     * @todo Convert to propert object property iterator
     */
    protected getAbsoluteFirstValue(key: string): number;
    /**
     * [rangeChangeUpdate description]
     *
     * @todo Description
     */
    protected rangeChangeUpdate(): void;
    /**
     * [processValues description]
     *
     * @todo Description
     * @todo Convert to propert object property iterator
     * @param dataItems [description]
     */
    protected processValues(working: boolean): void;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * @ignore
     */
    updateTooltipBounds(): void;
    protected shouldCreateBullet(dataItem: this["_dataItem"], bulletTemplate: Sprite): boolean;
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    handleDataItemWorkingValueChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * Should this series excluded from the axis scale calculations?
     *
     * @default false
     * @param value  Exclude from calculations?
     */
    /**
    * @return Exclude from calculations?
    */
    ignoreMinMax: boolean;
    /**
     * Create a mask for the series.
     *
     * @ignore Exclude from docs
     */
    createMask(): void;
    /**
     * Process axis range after it has been added to the list.
     *
     * @param event  Event
     */
    protected processAxisRange(event: IListEvents<AxisDataItem>["inserted"]): void;
    /**
     * [getAxisField description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param axis  [description]
     * @return [description]
     */
    getAxisField(axis: Axis): string;
    /**
     * Shows the tooltip at specific position.
     *
     * @ignore Exclude from docs
     * @param xPosition  X
     * @param yPosition  Y
     */
    showTooltipAtPosition(xPosition: number, yPosition: number): void;
    /**
     * Minimal distance between data points in pixels.
     *
     * If distance gets smaller than this, bullets are turned off to avoid
     * overlapping.
     *
     * `0` (zero) disables this behavior.
     *
     * IMPORTANT: This setting will work only when Series' base axis
     * is [[CategoryAxis]] or [[DateAxis]]. If base axis is [[ValueAxis]] the
     * setting will be ignored, because it would be a huge overhead to measure
     * distance between each and every bullet.
     *
     * @default 0
     * @param value  Distance (px)
     */
    /**
    * @return Distance (px)
    */
    minBulletDistance: number;
    /**
     * A list of bullets that will be added to each and every items in the
     * series.
     *
     * You can push any object that is a descendant of a [[Sprite]] here. All
     * items added to this list will be copied and used as a bullet on all data
     * items, including their properties, events, etc.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/bullets/} for more info about the concept of Bullets
     * @return List of bullets.
     */
    readonly bullets: ListTemplate<Sprite>;
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    /**
     * Should the series be hidden in legend?
     *
     * @param value Hidden in legend?
     */
    /**
    * @return Hidden in legend?
    */
    hiddenInLegend: boolean;
    /**
     * Series' name.
     *
     * @param value  Name
     */
    /**
    * @return Name
    */
    name: string;
    /**
     * Screen reader text to be applied to each individual data item, such
     * as bullets, columns or slices.
     *
     * The template can contain field reference meta codes, i.e. `{dateX}`,
     * `{valueY}`, etc.
     *
     * Any text formatting options, e.g. `[bold]` will be ignored.
     *
     * @param value Screen reader text template
     */
    /**
    * @return Screen reader text template
    */
    itemReaderText: string;
    /**
     * Returns if number of data items in the series are beyond non-focusable
     * count and should not be available for TAB-through.
     *
     * @ignore Exclude from docs
     * @return Items focusable?
     */
    itemsFocusable(): boolean;
    /**
     * Legend data item that corresponds to this series.
     *
     * @param value  Data item
     */
    /**
    * @return Data item
    */
    legendDataItem: LegendDataItem;
    /**
     * Updates corresponding legend data item with current values.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    updateLegendValue(dataItem?: this["_dataItem"], notRange?: boolean): void;
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
     * Displays a modal or console message with error, and halts any further
     * processing of this element.
     *
     * @param e Error
     */
    raiseCriticalError(e: Error): void;
    /**
     * Applies filters to the element.
     *
     * @ignore Exclude from docs
     */
    protected applyFilters(): void;
    /**
     * A list of heat rules to apply to series' elements based on the value
     * of the data item.
     *
     * Heat rules can be any "numeric" (including `Color`) property, and can also
     * be applied to child objects of series, like columns, bullets, etc.
     *
     * E.g.:
     *
     * ```TypeScript
     * series.heatRules.push({
     *  "target": series.columns.template,
     *  "property": "fill",
     *  "min": am4core.color("#F5DBCB"),
     *  "max": am4core.color("#ED7B84"),
     *  "dataField": "valueY"
     *});
     *```
     * ```Javacript
     * series.heatRules.push({
     *  "target": series.columns.template,
     *  "property": "fill",
     *  "min": am4core.color("#F5DBCB"),
     *  "max": am4core.color("#ED7B84"),
     *  "dataField": "valueY"
     *});
     *```
     *```JSON
     *{
     *  // ...
     *  "series": [{
     *    "type": "ColumnSeries",
     *    "heatRules": [{
     *      "target": "columns.template",
     *      "property": "fill",
     *      "min": "#F5DBCB",
     *      "max": "#ED7B84",
     *      "dataField": "valueY"
     *    }]
     *  }]
     *}
     *```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/series/#Heat_maps} for more about heat rules
     * @return  Heat rules
     */
    readonly heatRules: List<IHeatRule>;
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
     * Returns visibility value
     * @ignore
     */
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    protected configOrder(a: string, b: string): Ordering;
    /**
     * Sets `visibility` property:
     *
     * * `true` - visible
     * * `false` - hidden
     *
     * @param value  true - visible, false - hidden
     * @return Current visibility
     */
    setVisibility(value: boolean): void;
}
