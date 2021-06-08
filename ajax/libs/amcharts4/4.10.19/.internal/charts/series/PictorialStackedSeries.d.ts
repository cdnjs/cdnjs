/**
 * Defines Pictorial Stacked Series.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IPyramidSeriesAdapters, IPyramidSeriesDataFields, IPyramidSeriesEvents, IPyramidSeriesProperties, PyramidSeries, PyramidSeriesDataItem } from "./PyramidSeries";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PictorialStackedSeries]].
 *
 * @see {@link DataItem}
 */
export declare class PictorialStackedSeriesDataItem extends PyramidSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: PictorialStackedSeries;
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
 * Defines data fields for [[PictorialStackedSeries]].
 */
export interface IPictorialStackedSeriesDataFields extends IPyramidSeriesDataFields {
}
/**
 * Defines properties for [[PictorialStackedSeries]].
 */
export interface IPictorialStackedSeriesProperties extends IPyramidSeriesProperties {
    /**
     * Relative location to start series from.
     *
     * @default 0
     */
    startLocation?: number;
    /**
     * Relative location to end series at.
     *
     * @default 1
     */
    endLocation?: number;
}
/**
 * Defines events for [[PictorialStackedSeries]].
 */
export interface IPictorialStackedSeriesEvents extends IPyramidSeriesEvents {
}
/**
 * Defines adapters for [[PictorialStackedSeries]].
 *
 * @see {@link Adapter}
 */
export interface IPictorialStackedSeriesAdapters extends IPyramidSeriesAdapters, IPictorialStackedSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a PictorialStacked series on a [[SlicedChart]].
 *
 * @see {@link IPictorialStackedSeriesEvents} for a list of available Events
 * @see {@link IPictorialStackedSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
export declare class PictorialStackedSeries extends PyramidSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IPictorialStackedSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IPictorialStackedSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPictorialStackedSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IPictorialStackedSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: PictorialStackedSeriesDataItem;
    /**
     * Holds a Sprite that acts as an intelligent mask for the serries.
     */
    protected _maskSprite: Sprite;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sizes the mask to fit the series.
     *
     * @ignore
     */
    validateDataElements(): void;
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
     * A [[Sprite]] element that is used as a series mask.
     *
     * If set, this element's shape will be used to apply shape to the whole
     * stacked pictorial series.
     *
     * You can use this element's `path` property to set an SVG path for the
     * shape:
     *
     * ```TypeScript
     * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
     * // ...
     * series.maskSprite.path = iconPath;
     * ```
     * ```JavaScript
     * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
     * // ...
     * series.maskSprite.path = iconPath;
     * ```
     * ```JSON
     * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
     * // ...
     * {
     *   // ...
     *   "series": [{
     *     "type": "PictorialStackedSeries",
     *     // ...
     *     "maskSprite": {
     *       "path": iconPath
     *     }
     *   }]
     * }
     * ```
     *
     * @return Mask sprite
     */
    readonly maskSprite: Sprite;
    /**
     * Inits FunnelSlice.
     *
     * @param slice to init
     */
    protected initSlice(slice: this["_slice"]): void;
    /**
     * Relative location to start series from.
     *
     * Range of values: 0 to 1.
     *
     * This setting indicates where actual slices will start relatively to the
     * whole height/width of the series.
     *
     * For example, if we want slices to start at 30% from the top/left of the
     * series, we can set `startLocation = 0.3`.
     *
     * To fill shape outside of the location range, use background of the
     * property `slicesContainer`.
     *
     * ```TypeScript
     * series.startLocation = 0.2;
     * series.endLocation = 0.8;
     * series.slicesContainer.background.fill = am4core.color("#eee");
     * ```
     * ```JavaScript
     * series.startLocation = 0.2;
     * series.endLocation = 0.8;
     * series.slicesContainer.background.fill = am4core.color("#eee");
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "startLocation": 0.2,
     *     "endLocation": 0.8,
     *     "slicesContainer": {
     *       "background": {
     *         "fill": "#eee"
     *       }
     *     }
     *   }]
     * }
     * ```
     *
     * @default 0
     * @since 4.1.13
     * @param  value  Start location
     */
    /**
    * @return  Start location
    */
    startLocation: number;
    /**
     * Relative location to end series at.
     *
     * Range of values: 0 to 1.
     *
     * This setting indicates where actual slices will end relatively to the
     * whole height/width of the series.
     *
     * For example, if we want slices to end at 70% from the top/left of the
     * series, we can set `endLocation = 0.7`.
     *
     * To fill shape outside of the location range, use background of the
     * property `slicesContainer`.
     *
     * ```TypeScript
     * series.startLocation = 0.2;
     * series.endLocation = 0.8;
     * series.slicesContainer.background.fill = am4core.color("#eee");
     * ```
     * ```JavaScript
     * series.startLocation = 0.2;
     * series.endLocation = 0.8;
     * series.slicesContainer.background.fill = am4core.color("#eee");
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "startLocation": 0.2,
     *     "endLocation": 0.8,
     *     "slicesContainer": {
     *       "background": {
     *         "fill": "#eee"
     *       }
     *     }
     *   }]
     * }
     * ```
     *
     * @default 1
     * @since 4.1.13
     * @param  value  End location
     */
    /**
    * @return End location
    */
    endLocation: number;
}
