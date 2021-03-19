/**
 * [[Chart]] class provides base functionality for all chart types to inherit.
 */
import { Component, IComponentProperties, IComponentDataFields, IComponentEvents, IComponentAdapters } from "../core/Component";
import { MutableValueDisposer } from "../core/utils/Disposer";
import { ListTemplate, IListEvents } from "../core/utils/List";
import { Container } from "../core/Container";
import { Label } from "../core/elements/Label";
import { Grip } from "../core/elements/Grip";
import { Legend } from "../charts/Legend";
import { DataItem } from "../core/DataItem";
import * as $type from "../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Chart]].
 *
 * @see {@link DataItem}
 */
export declare class ChartDataItem extends DataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: Chart;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[Chart]].
 */
export interface IChartDataFields extends IComponentDataFields {
}
/**
 * Defines properties for [[Chart]].
 */
export interface IChartProperties extends IComponentProperties {
}
/**
 * Defines events for [[Chart]].
 */
export interface IChartEvents extends IComponentEvents {
}
/**
 * Defines adapters for [[Chart]].
 *
 * @see {@link Adapter}
 */
export interface IChartAdapters extends IComponentAdapters, IChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all Charts.
 *
 * @see {@link IChartEvents} for a list of available Events
 * @see {@link IChartAdapters} for a list of available Adapters
 */
export declare class Chart extends Component {
    /**
     * Available data fields.
     */
    _dataFields: IChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: IChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IChartAdapters;
    /**
     * Defines available events.
     */
    _events: IChartEvents;
    /**
     * A List of chart titles.
     */
    titles: ListTemplate<Label>;
    /**
     * Container that holds the chart itself.
     */
    chartContainer: Container;
    /**
     * A reference to a container that holds both the chart and the legend.
     */
    chartAndLegendContainer: Container;
    /**
     * A reference to chart's [[Legend]].
     * @ignore
     */
    protected _legend: MutableValueDisposer<Legend>;
    /**
     * Instance of the grip element.
     */
    protected _dragGrip: $type.Optional<Grip>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Initiates drawing of the chart.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Updates legend's hierarchy based on the position.
     */
    protected fixLayout(): void;
    /**
     * Setups the legend to use the chart's data.
     */
    protected feedLegend(): void;
    /**
     * Adds a new title to the chart when it is inserted into chart's titles
     * list.
     * @param event  An event object which is triggered when inserting into titles list
     * @return Label object
     */
    protected processTitle(event: IListEvents<Label>["inserted"]): Label;
    /**
     * Checks if chart has any title elements. If it does, we will use them in an
     * `aria-labelledby` attribute so that screen readers can use them to properly
     * describe the chart when it is focused or hovered.
     *
     * @ignore Exclude from docs
     */
    updateReaderTitleReferences(): void;
    /**
     * Holds the instance of chart's [[Leged]].
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/} for more information about legends
     * @param Legend
     */
    /**
    * @return Legend
    */
    legend: Legend;
    /**
     * Prepares the legend instance for use in this chart.
     *
     * @param legend  Legend
     */
    protected setLegend(legend: Legend): void;
    /**
     * Destroys this object and all related data.
     */
    dispose(): void;
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
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
     * An instance of [[Grip]] which serves as a grip point which appears on
     * touch and allows scrolling whole page even if chart is occupying the
     * whole of the screen and would otherwise prevent scrolling.
     *
     * @since 4.4.0
     * @see {@link https://www.amcharts.com/docs/v4/concepts/touch/} For more information.
     * @param  value  Grip
     */
    /**
    * @return Grip
    */
    dragGrip: Grip;
    focusable: boolean;
}
