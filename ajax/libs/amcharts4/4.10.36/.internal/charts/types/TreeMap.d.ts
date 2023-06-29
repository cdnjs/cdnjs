/**
 * TreeMap chart module.
 *
 * Parts of the functionality used in this module are taken from D3.js library
 * (https://d3js.org/)
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYChart, IXYChartProperties, IXYChartDataFields, IXYChartAdapters, IXYChartEvents, XYChartDataItem } from "./XYChart";
import { DictionaryTemplate } from "../../core/utils/Dictionary";
import { ValueAxis } from "../axes/ValueAxis";
import { OrderedListTemplate } from "../../core/utils/SortedList";
import { TreeMapSeries } from "../series/TreeMapSeries";
import { Color } from "../../core/utils/Color";
import { TreeMapSeriesDataItem } from "../series/TreeMapSeries";
import { NavigationBar } from "../elements/NavigationBar";
import { ColorSet } from "../../core/utils/ColorSet";
import { Export } from "../../core/export/Export";
import * as $type from "../../core/utils/Type";
import { Animation } from "../../core/utils/Animation";
import { LegendDataItem } from "../../charts/Legend";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[TreeMap]].
 *
 * @see {@link DataItem}
 */
export declare class TreeMapDataItem extends XYChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: TreeMap;
    /**
     * A treemap level this data item is displayed at.
     */
    protected _level: number;
    /**
     * Series of children data items.
     */
    protected _series: TreeMapSeries;
    /**
     * Related series data item.
     */
    seriesDataItem: TreeMapSeriesDataItem;
    /**
     * Required for squarify functionality.
     *
     * @ignore Exclude from docs
     */
    rows: TreeMapDataItem[];
    /**
     * Required for squarify functionality.
     *
     * @ignore Exclude from docs
     */
    rowsRatio: number;
    /**
     * Required for squarify functionality.
     *
     * @ignore Exclude from docs
     */
    dice: boolean;
    /**
     * A reference to a corresponding legend data item.
     */
    protected _legendDataItem: LegendDataItem;
    /**
     * Constructor
     */
    constructor();
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
     * Returns a duration (ms) the Data Item should take to animate from one
     * value to another.
     *
     * If the duration is not specified via parameter, this method will try to
     * request a default duration from the related `Component`.
     *
     * @param duration  Default duration (ms)
     * @return Duration (ms)
     */
    getDuration(): number;
    /**
     * Numeric value of the item.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: number;
    /**
     * Percent value of a node
     */
    readonly percent: number;
    /**
     * Item's X position.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param value  X
     */
    /**
    * @return X
    */
    x0: number;
    /**
     * Item's X position.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param value  X
     */
    /**
    * @return X
    */
    x1: number;
    /**
     * Item's Y position.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param value  Y
     */
    /**
    * @return Y
    */
    y0: number;
    /**
     * Item's Y position.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param value  Y
     */
    /**
    * @return Y
    */
    y1: number;
    /**
     * Item's name.
     *
     * @param name  Name
     */
    /**
    * @return Name
    */
    name: string;
    /**
     * A list of item's sub-children.
     *
     * Having children means that the TreeMap chat will automatically be
     * "drillable". Clicking on an item with children will zoom to the item, then
     * display its children.
     *
     * Treemap can have any level of nesting.
     *
     * @param children  Item's children
     */
    /**
    * @return Item's children
    */
    children: OrderedListTemplate<TreeMapDataItem>;
    /**
     * Depth level in the treemap hierarchy.
     *
     * The top-level item will have level set at 0. Its children will have
     * level 1, and so on.
     *
     * @readonly
     * @return Level
     */
    readonly level: number;
    /**
     * Item's color.
     *
     * If not set, will use parent's color, or, if that is not set either,
     * automatically assigned color from chart's color set. (`chart.colors`)
     *
     * @param value  Color
     */
    /**
    * @return Color
    */
    color: Color;
    /**
     * @ignore
     * For the legend to work properly
     */
    readonly fill: Color;
    /**
     * Series of children data items
     * @todo: proper descrition
     */
    series: TreeMapSeries;
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
 * Defines data fields for [[TreeMap]].
 */
export interface ITreeMapDataFields extends IXYChartDataFields {
    /**
     * A name of the field in data that holds item's numeric value.
     */
    value?: string;
    /**
     * A name of the field in data that holds item's sub-items.
     */
    children?: string;
    /**
     * A name of the field in data that holds item's name.
     */
    name?: string;
    /**
     * A name of the field in data that holds item's color.
     *
     * If not set, a new color will be automatically assigned to each item as
     * defined by theme.
     */
    color?: string;
}
/**
 * Defines properties for [[TreeMap]].
 */
export interface ITreeMapProperties extends IXYChartProperties {
    /**
     * Maximum number of levels the chart will display initially.
     *
     * @default 2
     */
    maxLevels?: number;
    /**
     * Current drill-down level the treemap is at.
     */
    currentLevel?: number;
    /**
     * Sorting direction of treemap items.
     *
     * @default "descending"
     */
    sorting?: "none" | "ascending" | "descending";
    /**
     * If set to `true`, columns of parent nodes will be hidden when user
     * drills-down into deeper levels.
     *
     * @sice 4.7.4
     * @default false
     */
    hideParentColumns?: boolean;
}
/**
 * Defines events for [[TreeMap]].
 */
export interface ITreeMapEvents extends IXYChartEvents {
}
/**
 * Defines adapters for [[TreeMap]].
 *
 * @see {@link Adapter}
 */
export interface ITreeMapAdapters extends IXYChartAdapters, ITreeMapProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a TreeMap chart.
 *
 * @see {@link ITreeMapEvents} for a list of available Events
 * @see {@link ITreeMapAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/treemap/} for documentation
 */
export declare class TreeMap extends XYChart {
    /**
     * Defines a type of the data item used for this chart.
     */
    _dataItem: TreeMapDataItem;
    /**
     * Defines available data fields.
     */
    _dataFields: ITreeMapDataFields;
    /**
     * Defines available properties.
     */
    _properties: ITreeMapProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ITreeMapAdapters;
    /**
     * Defines available events.
     */
    _events: ITreeMapEvents;
    /**
     * A horizontal value axis.
     *
     * TreeMap chart is basically an XY chart, which means it has vertical and
     * horizontal value axes.
     *
     * As with any XY-based chart, it can be zoomed.
     */
    xAxis: ValueAxis;
    /**
     * A vertical value axis.
     *
     * TreeMap chart is basically an XY chart, which means it has vertical and
     * horizontal value axes.
     *
     * As with any XY-based chart, it can be zoomed.
     */
    yAxis: ValueAxis;
    /**
     * An algorithm used to divide area into squares based on their value.
     *
     * Available options: squarify (default), binaryTree, slice, dice, sliceDice.
     *
     * ```TypeScript
     * chart.layoutAlgorithm = chart.sliceDice;
     * ```
     * ```JavaScript
     * chart.layoutAlgorithm = chart.sliceDice;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "layoutAlgorithm": "sliceDice",
     *   // ...
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/treemap/#Area_division_methods} For more info and examples.
     * @default squarify
     */
    layoutAlgorithm: (parent: TreeMapDataItem) => void;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: TreeMapSeries;
    /**
     * [_homeDataItem description]
     *
     * @todo Description
     */
    protected _homeDataItem: TreeMapDataItem;
    /**
     * [_tempSeries description]
     *
     * @todo Description
     */
    protected _tempSeries: TreeMapSeries[];
    /**
     * A text dispalyed on the home button in breadcurmb nav control.
     */
    protected _homeText: string;
    /**
     * A set of colors to be applied automatically to each new chart item, if
     * not explicitly set.
     */
    colors: ColorSet;
    /**
     * Holds series object for each TreeMap level.
     *
     * "0" is the top-level series.
     * "1" is the second level.
     * Etc.
     *
     * @todo Description
     * @param Templates for each level
     */
    seriesTemplates: DictionaryTemplate<string, this["_seriesType"]>;
    /**
     * Is the chart zoomable?
     *
     * If the chart is `zoomable`, and items have sub-items, the chart will
     * drill-down to sub-items when click on their parent item.
     *
     * @default true
     */
    zoomable: boolean;
    /**
     * A navigation bar used to show "breadcrumb" control, indicating current
     * drill-down path.
     */
    protected _navigationBar: NavigationBar;
    /**
     * Currently selected data item.
     * @readonly
     */
    currentlyZoomed: TreeMapDataItem;
    /**
     * Constructor
     */
    constructor();
    /**
     * A navigation bar used to show "breadcrumb" control, indicating current
     * drill-down path.
     */
    /**
    * Returns navigationBar if it is added to a chart
    */
    navigationBar: NavigationBar;
    /**
     * (Re)validates chart's data.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Layouts and sizes all items according to their value and
     * `layoutAlgorithm`.
     *
     * @ignore Exclude from docs
     * @param parent  Parent data item
     */
    layoutItems(parent: TreeMapDataItem, sorting?: "none" | "ascending" | "descending"): void;
    /**
     * Creates and returns a new treemap series.
     *
     * @todo Description
     * @param dataItem  Data item to create series out of
     */
    protected createTreeSeries(dataItem: TreeMapDataItem): void;
    /**
     * [createTreeSeriesReal description]
     *
     * @todo Description
     * @param dataItem [description]
     */
    protected createTreeSeriesReal(dataItem: TreeMapDataItem): void;
    protected setData(value: any[]): void;
    /**
     * @ignore
     * Overriding, as tree map series are created on the fly all the time
     */
    protected seriesAppeared(): boolean;
    /**
     * Initializes the treemap series.
     *
     * @todo Description
     * @param dataItem  Chart data item
     */
    protected initSeries(dataItem: TreeMapDataItem): void;
    /**
     * Toggles bullets so that labels that belong to current drill level are
     * shown.
     *
     * @param duration  Animation duration (ms)
     */
    protected toggleBullets(duration?: number): void;
    /**
     * Zooms to particular item in series.
     *
     * @param dataItem  Data item
     */
    zoomToSeriesDataItem(dataItem: TreeMapSeriesDataItem): void;
    /**
     * Zooms to particular item. If dataItem is not specified, the chart will zoom-out.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    zoomToChartDataItem(dataItem?: TreeMapDataItem): void;
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
     * Maximum number of levels the chart will display initially.
     *
     * @default 2
     * @param value  Maximum drill-down level
     */
    /**
    * @return Maximum drill-down level
    */
    maxLevels: number;
    /**
     * Current drill-down level the chart is at.
     *
     * @param value  Current level
     */
    /**
    * @return Current level
    */
    currentLevel: number;
    /**
     * If set to `true`, columns of parent nodes will be hidden when user
     * drills-down into deeper levels.
     *
     * @sice 4.7.4
     * @default false
     * @param  value  Hide?
     */
    /**
    * @return Hide?
    */
    hideParentColumns: boolean;
    /**
     * Sorting direction of treemap items.
     *
     * Available options: "none", "ascending", and "descending" (default).
     *
     * @default "descending"
     * @param value [description]
     */
    sorting: "none" | "ascending" | "descending";
    /**
     * Creates and returns a new series of the suitable type.
     *
     * @return new series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * A text displayed on the "home" button which is used to go back to level 0
     * after drill into sub-items.
     *
     * @param value  Home text
     */
    /**
    * @return Home text
    */
    homeText: string;
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
     * Measures the size of container and informs its children of how much size
     * they can occupy, by setting their relative `maxWidth` and `maxHeight`
     * properties.
     *
     * @ignore Exclude from docs
     */
    validateLayout(): void;
    /**
     * Validates (processes) data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * ==========================================================================
     * TREEMAP LAYOUT FUNCTIONS
     * ==========================================================================
     * @hidden
     */
    /**
     * The functions below are from D3.js library (https://d3js.org/)
     *
     * --------------------------------------------------------------------------
     * Copyright 2017 Mike Bostock
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *
     * 1. Redistributions of source code must retain the above copyright notice,
     *    this list of conditions and the following disclaimer.
     *
     * 2. Redistributions in binary form must reproduce the above copyright
     *    notice,this list of conditions and the following disclaimer in the
     *    documentation and/or other materials provided with the distribution.
     *
     * 3. Neither the name of the copyright holder nor the names of its
     *    contributors may be used to endorse or promote products derived from
     *    this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
     * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
     * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
     * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
     * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
     * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
     * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
     * POSSIBILITY OF SUCH DAMAGE.
     * --------------------------------------------------------------------------
     * @hidden
     */
    /**
     * Treemap layout algorithm: binaryTree.
     *
     * @ignore Exclude from docs
     * @param parent  Data item
     */
    binaryTree(parent: TreeMapDataItem): void;
    /**
     * Treemap layout algorithm: slice.
     *
     * @ignore Exclude from docs
     * @param parent  Data item
     */
    slice(parent: TreeMapDataItem): void;
    /**
     * Treemap layout algorithm: dice.
     *
     * @ignore Exclude from docs
     * @param parent  Data item
     */
    dice(parent: TreeMapDataItem): void;
    /**
     * Treemap layout algorithm: slideDice.
     *
     * @ignore Exclude from docs
     * @param parent  Data item
     */
    sliceDice(parent: TreeMapDataItem): void;
    /**
     * Treemap layout algorithm: squarify.
     *
     * @ignore Exclude from docs
     * @param parent  Data item
     */
    squarify(parent: TreeMapDataItem): void;
    protected handleSeriesAdded2(): void;
    /**
     * [handleDataItemValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    handleDataItemValueChange(dataItem?: this["_dataItem"], name?: string): void;
    handleDataItemWorkingValueChange(dataItem?: this["_dataItem"], name?: string): void;
    protected getLegendLevel(dataItem: TreeMapDataItem): TreeMapDataItem;
    protected handleLegendSeriesAdded(series: TreeMapSeries): void;
    /**
     * A data item associated with top node.
     *
     * @since 4.8.2
     */
    readonly homeDataItem: TreeMapDataItem;
    /**
     * Setups the legend to use the chart's data.
     * @ignore
     */
    feedLegend(): void;
    /**
     * @ignore
     */
    disposeData(): void;
    /**
     * Since this chart uses hierarchical data, we need to remove childrent
     * dataField from export of non-hierarchical formats such as CSV and XSLX.
     *
     * @return Export
     */
    protected getExporting(): Export;
}
