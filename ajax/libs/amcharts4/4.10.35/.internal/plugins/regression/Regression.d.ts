/**
 * Regression plugin.
 *
 * Uses regression-js library by Tom Alexander
 * http://tom-alexander.github.io/regression-js/
 */
import { Plugin } from "../../core/utils/Plugin";
import { XYSeries } from "../../charts/series/XYSeries";
import { Optional } from "../../core/utils/Type";
import { EventDispatcher, AMEvent } from "../../core/utils/EventDispatcher";
/**
 * Defines events for [[BaseObjectEvents]].
 */
export interface IRegressionEvents {
    /**
     * Invoked when regression finishes calculating data.
     */
    processed: {};
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A module which automatically calculates data for for trend lines using
 * various regression algorithms.
 *
 * By pushing an instance of [[Regression]] into `plugin` list of
 * any [[XYSeries]], it automatically recalculates and overrides its
 * data to show regression trend line, inestead of the source values.
 *
 * Example:
 *
 * ```TypeScript
 * let regseries = chart.series.push(new am4charts.LineSeries());
 * regseries.dataFields.valueY = "value";
 * regseries.dataFields.dateX = "date";
 *
 * let reg = regseries.plugins.push(new am4plugins_regression.Regression());
 * reg.method = "polynomial";
 * ```
 * ```JavaScript
 * var regseries = chart.series.push(new am4charts.LineSeries());
 * regseries.dataFields.valueY = "value";
 * regseries.dataFields.dateX = "date";
 *
 * var reg = regseries.plugins.push(new am4plugins_regression.Regression());
 * reg.method = "polynomial";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *   }, {
 *     "type": "LineSeries",
 *     "dataFields": {
 *       "valueY": "value",
 *       "dateX": "date"
 *     },
 *     "plugins": [{
 *       "type": "Regression",
 *       "method": "polynomial"
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.2.2
 */
export declare class Regression extends Plugin {
    /**
     * A series object that will be used for the trend line.
     */
    target: Optional<XYSeries>;
    /**
     * An [[EventDispatcher]] instance.
     *
     * @since 4.3.14
     */
    events: EventDispatcher<AMEvent<this, IRegressionEvents>>;
    /**
     * Method
     */
    protected _method: "linear" | "polynomial";
    /**
     * Options
     */
    protected _options: {
        [index: string]: any;
    };
    /**
     * Simplify output data.
     */
    protected _simplify: boolean;
    /**
     * Reorder data after calculation
     */
    protected _reorder: boolean;
    /**
     * Calculated data.
     */
    protected _data: Optional<any[]>;
    /**
     * An object containing results of the calculation.
     *
     * @since 4.3.14
     */
    result: Optional<any>;
    /**
     * Original series data.
     */
    protected _originalData: Optional<any[]>;
    /**
     * Hash of the data original data. Used to check whether we need to
     * recalculate, or the data did not change.
     */
    protected _originalDataHash: string;
    /**
     * Should skip next "beforedatavalidated" event?
     */
    protected _skipValidatedEvent: boolean;
    /**
     * Constructor
     */
    constructor();
    init(): void;
    /**
     * Decorates series with required events and adapters used to hijack its
     * data.
     */
    private processSeries;
    /**
     * Saves series' original data and (re)adds data adapter.
     */
    private saveOriginalData;
    /**
     * Invalidates data.
     */
    private invalidateData;
    /**
     * Calculates regression series data.
     */
    private calcData;
    /**
     * Method to calculate regression.
     *
     * Supported values: "linear" (default), "polynomial".
     *
     * @default linear
     * @param  value  Method
     */
    /**
    * @return Method
    */
    method: "linear" | "polynomial";
    /**
     * Regression output options.
     *
     * Below are default values.
     *
     * ```JSON
     * {
     *   order: 2,
     *   precision: 2,
     * }
     * ```
     *
     * @see {@link https://github.com/Tom-Alexander/regression-js#configuration-options} About options
     * @param  value  Options
     */
    /**
    * @return Options
    */
    options: {
        [index: string]: any;
    };
    /**
     * Simplify regression line data? If set to `true` it will use only two
     * result data points: first and last.
     *
     * NOTE: this does make sense with "linear" method only.
     *
     * @default false
     * @since 4.2.3
     * @param  value  Simplify?
     */
    /**
    * @return Simplify?
    */
    simplify: boolean;
    /**
     * Orders data points after calculation. This can make sense in scatter plot
     * scenarios where data points can come in non-linear fashion.
     *
     * @default false
     * @since 4.2.3
     * @param  value  Reorder data?
     */
    /**
    * @return Reorder data?
    */
    reorder: boolean;
}
