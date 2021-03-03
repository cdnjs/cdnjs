/**
 * HeatLegend module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerEvents, IContainerAdapters } from "../../core/Container";
import { Series } from "../series/Series";
import { Color } from "../../core/utils/Color";
import { ListTemplate } from "../../core/utils/List";
import { ValueAxis } from "../../charts/axes/ValueAxis";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[HeatLegend]].
 */
export interface IHeatLegendProperties extends IContainerProperties {
    /**
     * Minimum color
     *
     * @todo Description
     */
    minColor?: Color;
    /**
     * Minimum value
     *
     * @todo Description
     */
    minValue?: number;
    /**
     * Maximum value
     *
     * @todo Description
     */
    maxValue?: number;
    /**
     * Maximum color
     *
     * @todo Description
     */
    maxColor?: Color;
    /**
     * Number of markers (steps)
     *
     * @todo Description
     */
    markerCount?: number;
    /**
     * Orientation
     *
     * @todo Description
     */
    orientation?: "horizontal" | "vertical";
}
/**
 * Defines events for [[HeatLegend]].
 */
export interface IHeatLegendEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[HeatLegend]].
 *
 * @see {@link Adapter}
 */
export interface IHeatLegendAdapters extends IContainerAdapters, IHeatLegendProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Sankey Diagram.
 *
 * @see {@link IHeatLegendEvents} for a list of available events
 * @see {@link IHeatLegendAdapters} for a list of available Adapters
 * @important
 */
export declare class HeatLegend extends Container {
    /**
     * Defines available properties.
     */
    _properties: IHeatLegendProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IHeatLegendAdapters;
    /**
     * Defines available events.
     */
    _events: IHeatLegendEvents;
    /**
     * List of heat legend markers (color step rectangles).
     */
    markers: ListTemplate<RoundedRectangle>;
    /**
     * Container which holds markers
     */
    markerContainer: Container;
    /**
     * Value axis of a heat legend
     * @ignore
     */
    protected _valueAxis: ValueAxis;
    /**
     * Series of a heat legend
     * @ignore
     */
    protected _series: Series;
    /**
     * Constructor
     */
    constructor();
    protected getMinFromRules(property: string): undefined;
    protected getMaxFromRules(property: string): undefined;
    /**
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Min color of a heat legend. If a series is set for the legend, minColor is taken from series.
     *
     * @param {Color}
     */
    /**
    * Returns minColor value
    * @return {Color}
    */
    minColor: Color;
    /**
     * Max color of a heat legend. If a series is set for the legend, maxColor is taken from series.
     *
     * @param {Color}
     */
    /**
    * Returns maxColor value
    * @return {Color}
    */
    maxColor: Color;
    /**
     * Number of color squares (markers) in the heat legend. If only 1 marker is used, it will be filled with gradient.
     *
     * @param {number}
     */
    /**
    * Returns number of color squares (markers).
    * @return {number}
    */
    markerCount: number;
    /**
     * Minimum value of heat legend's value axis. If a series is set for the legend, min is taken from series.
     *
     * @param {number}
     */
    /**
    * Returns minimum value of heat legend.
    * @return {number}
    */
    minValue: number;
    /**
     * Maximum value of heat legend's value axis. If a series is set for the legend, max is taken from series.
     *
     * @param {number}
     */
    /**
    * Returns maximum value of heat legend.
    * @return {number}
    */
    maxValue: number;
    /**
    * Heat legend orientation. Note, if you change orientation of a heat legend, you must set value axis renderer properties after that, as with orientation renderer changes.
    *
    * @param {"horizontal" | "vertical"}
    */
    /**
    * Returns orientation value.
    *
    * @return {"horizontal" | "vertical"}
    */
    orientation: "horizontal" | "vertical";
    /**
     * Sets a value axis of heat legend. Value axis for heat legend is created automatically.
     * @param {ValueAxis}
     */
    /**
    * Returns valueAxis value.
    * @return {ValueAxis}
    */
    valueAxis: ValueAxis;
    /**
     * You can set series for heat legend. It will take min, max, minColor and maxColor values from this series.
     * @param series
     */
    /**
    * Returns series value.
    * @return {Series}
    */
    series: Series;
    /**
     * Updates min/max of value axis.
     * @ignore
     */
    protected updateMinMax(min: number, max: number): void;
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
