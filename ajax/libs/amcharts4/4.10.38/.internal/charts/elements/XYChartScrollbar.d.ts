/**
 * A module with functionality for buildin a scrollbar with an XY graph in it.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Scrollbar, IScrollbarProperties, IScrollbarAdapters, IScrollbarEvents } from "../../core/elements/Scrollbar";
import { Sprite } from "../../core/Sprite";
import { List, IListEvents } from "../../core/utils/List";
import { XYSeries } from "../series/XYSeries";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { XYChart } from "../types/XYChart";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[XYChartScrollbar]].
 */
export interface IXYChartScrollbarProperties extends IScrollbarProperties {
}
/**
 * Defines events for [[XYChartScrollbar]].
 */
export interface IXYChartScrollbarEvents extends IScrollbarEvents {
}
/**
 * Defines adapters for [[XYChartScrollbar]].
 *
 * @see {@link Adapter}
 */
export interface IXYChartScrollbarAdapters extends IScrollbarAdapters, IXYChartScrollbarProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A special version of the Scrollbar that has an XY chart in it.
 *
 * Used mainly as an advanced scrollbar with a preview for other XY charts.
 *
 * However, can be used as standalone element.
 *
 * @see {@link IXYChartScrollbarEvents} for a list of available events
 * @see {@link IXYChartScrollbarAdapters} for a list of available Adapters
 * @important
 */
export declare class XYChartScrollbar extends Scrollbar {
    /**
     * Defines available properties.
     */
    _properties: IXYChartScrollbarProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IXYChartScrollbarAdapters;
    /**
     * Defines available events.
     */
    _events: IXYChartScrollbarEvents;
    /**
     * An [[XYSeries]] used to draw a graph on the Scrollbar.
     */
    protected _series: List<XYSeries>;
    /**
     * A chart element Scrollbar is for.
     */
    protected _chart: MutableValueDisposer<XYChart>;
    /**
     * A chart instance that shows mini-chart within Scrollbar.
     */
    protected _scrollbarChart: XYChart;
    /**
     * [_unselectedOverlay description]
     *
     * @todo Description
     */
    protected _unselectedOverlay: Sprite;
    /**
     * Constructor
     */
    constructor();
    /**
     * A list of series that are used to draw graph(s) on the scrollbar.
     *
     * @readonly
     * @return Series
     */
    readonly series: List<XYSeries>;
    /**
     * Decorates a new series when they are pushed into a `series` list.
     *
     * @param event Event
     */
    protected handleSeriesAdded(event: IListEvents<XYSeries>["inserted"]): void;
    /**
     * @ignore
     */
    protected updateByOrientation(): void;
    /**
     * Cleans up after series are removed from Scrollbar.
     *
     * @param event  Event
     */
    protected handleSeriesRemoved(event: IListEvents<XYSeries>["removed"]): void;
    /**
     * A chart element that is used to display graphs in the Scrollbar.
     *
     * This is not the same as `chart`. It's a totally independent instance of
     * [[XYChart]] with separate config, series, etc.
     *
     * It can be configured just like any other [[XYChart]].
     *
     * @readonly
     * @return Scrollbar's internal chart
     */
    readonly scrollbarChart: XYChart;
    /**
     * A chart that Scrollbar belongs to.
     *
     * @param chart  Chart
     */
    /**
    * @return Chart
    */
    chart: XYChart;
    /**
     * A [[Sprite]] object representing overlay that is used to dim area of the
     * scrollbar that is currently not selected.
     *
     * Use its `fillOpacity` to set opacity of the fill, with `0` (zero)
     * completely disabling the dimming, and `1` making unselected area completely
     * blank.
     *
     * @since 4.6.1
     * @readonly
     * @return Unselected area curtain element
     */
    readonly unselectedOverlay: Sprite;
    /**
     * Updates Scrollbar's internal chart's data when the main chart's data
     * changes.
     *
     * @ignore Exclude from docs
     */
    handleDataChanged(): void;
    /**
     * Zooms out all axes on the internal chart.
     */
    protected zoomOutAxes(): void;
    /**
     * Updates scrollbar thumb.
     *
     * @ignore
     */
    updateThumb(dispatchEvents?: boolean): void;
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
