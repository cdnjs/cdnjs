/**
 * Plugin for automatically grouping small chart slices into single group.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Plugin } from "../../core/utils/Plugin";
import { PercentSeries } from "../../charts/series/PercentSeries";
import { FunnelSlice, IFunnelSliceProperties } from "../../charts/elements/FunnelSlice";
import { IDisposer } from "../../core/utils/Disposer";
import { List } from "../../core/utils/List";
import { Slice } from "../../core/elements/Slice";
import { Sprite } from "../../core/Sprite";
import { Optional } from "../../core/utils/Type";
import { ZoomOutButton } from "../../core/elements/ZoomOutButton";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A plugin which automatically groups [[PercenSeries]] slices that are smaller
 * than certain percent into one "Other" slice.
 *
 * By pushing an instance of [[SliceGrouper]] into `plugin` list of
 * any [[PercentSeries]], it automatically applies the functionality.
 *
 * Example:
 *
 * ```TypeScript
 * let series = chart.series.push(new am4charts.PieSeries());
 * series.dataFields.valueY = "value";
 * series.dataFields.dateX = "date";
 *
 * let grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.PieSeries());
 * series.dataFields.valueY = "value";
 * series.dataFields.dateX = "date";
 *
 * var grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *   }, {
 *     "type": "PieSeries",
 *     "dataFields": {
 *       "valueY": "value",
 *       "dateX": "date"
 *     },
 *     "plugins": [{
 *       "type": "SliceGrouper"
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.3.11
 */
export declare class SliceGrouper extends Plugin {
    /**
     * A series object that will need its slices grouped.
     */
    target: Optional<PercentSeries>;
    /**
     * A reference to "Other" slice.
     */
    groupSlice: Sprite;
    /**
     * A list of small slices that do not satisfy `threshold`.
     */
    smallSlices: List<Sprite | Slice | FunnelSlice>;
    /**
     * A list of big slices that do not satisfy `threshold`.
     */
    bigSlices: List<Sprite | Slice | FunnelSlice>;
    /**
     * A name to use for the "Other" slice.
     *
     * @default "Other"
     */
    groupName: string;
    /**
     * Custom properties to apply to the "Other" slice.
     *
     * @since 4.5.3
     * @type {IFunnelSliceProperties}
     */
    groupProperties: IFunnelSliceProperties;
    /**
     * If set to `true` the legend will be synced to show currently visible
     * slices only.
     *
     * @defaylt false
     */
    syncLegend: boolean;
    /**
     * Threshold percent.
     */
    protected _threshold: number;
    /**
     * Maximum number of slices.
     */
    protected _limit: Optional<number>;
    /**
     * Zoom out button. Shown when "Other" slice is broken down to zoom back
     * out to "Other".
     */
    protected _zoomOutButton: ZoomOutButton;
    /**
     * Disposer for click events.
     */
    protected _clickDisposers: Array<IDisposer>;
    /**
     * What happens when "Other" slice is cicked.
     */
    protected _clickBehavior: "none" | "break" | "zoom";
    protected _ignoreDataUpdate: boolean;
    /**
     * Is group slice currently closed or expanded?
     */
    protected _closed: boolean;
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
     * Initializes group slice.
     */
    private initSlices;
    /**
     * Toggles group on.
     */
    private toggleGroupOn;
    /**
     * Toggles group off.
     */
    private toggleGroupOff;
    /**
     * Percent threshold which slices to group. If a slice is less than
     * `threshold` percent, it will be moved into "Other" group.
     *
     * @default 5
     * @param  value  Threshold
     */
    /**
    * @return Threshold
    */
    threshold: number;
    /**
     * Maximum number of ungrouped slices to show. Any slice beyond `limit` will
     * go into the "Other" group.
     *
     * NOTE: if `limit` is set, `threshold` setting will be ignored.
     *
     * @default undefined
     * @since 4.9.14
     * @param  value  Limit
     */
    /**
    * @return Limit
    */
    limit: number;
    /**
     * An instance of [[ZoomOutButton]] that is shown when "Other" slice is
     * broken down, to get back to grouped state.
     *
     * @param  value  Button
     */
    /**
    * @return Button
    */
    zoomOutButton: ZoomOutButton;
    /**
     * What happens when "Other" slice is clicked/tapped:
     *
     * * "none": nothing (default)
     * * "break": the slice is broken down into actual slices it consists of
     * * "zoom": actual small slices are shown and the rest of the slices are hidden
     *
     * @param  value  Click behavior
     */
    /**
    * @returns Click behavior
    */
    clickBehavior: "none" | "break" | "zoom";
    /**
     * Disposes the element
     */
    dispose(): void;
    private disposeClickEvents;
}
