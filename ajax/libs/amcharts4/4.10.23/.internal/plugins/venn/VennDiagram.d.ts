/**
 * Venn Diagram module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentChart, IPercentChartProperties, IPercentChartDataFields, IPercentChartAdapters, IPercentChartEvents, PercentChartDataItem } from "../../charts/types/PercentChart";
import { VennSeries } from "./VennSeries";
import { Legend } from "../../charts/Legend";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[VennDiagram]].
 *
 * @see {@link DataItem}
 */
export declare class VennDiagramDataItem extends PercentChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: VennDiagram;
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
 * Defines data fields for [[VennDiagram]].
 */
export interface IVennDiagramDataFields extends IPercentChartDataFields {
}
/**
 * Defines properties for [[VennDiagram]]
 */
export interface IVennDiagramProperties extends IPercentChartProperties {
}
/**
 * Defines events for [[VennDiagram]].
 */
export interface IVennDiagramEvents extends IPercentChartEvents {
}
/**
 * Defines adapters for [[VennDiagram]].
 *
 * @see {@link Adapter}
 */
export interface IVennDiagramAdapters extends IPercentChartAdapters, IVennDiagramProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Venn Diagram.
 *
 * Venn diagram uses Ben Frederickson's [venn.js](https://github.com/benfred/venn.js).
 *
 * @see {@link IVennDiagramEvents} for a list of available Events
 * @see {@link IVennDiagramAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/venn/} for documentation
 * @important
 * @since 4.9.0
 */
export declare class VennDiagram extends PercentChart {
    /**
     * Defines available data fields.
     */
    _dataFields: IVennDiagramDataFields;
    /**
     * Defines available properties.
     */
    _properties: IVennDiagramProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IVennDiagramAdapters;
    /**
     * Defines available events.
     */
    _events: IVennDiagramEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: VennSeries;
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
     * @ignore
     */
    protected setLegend(legend: Legend): void;
}
