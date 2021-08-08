/**
 * Module that defines everything related to building Funnel slices.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { Percent } from "../../core/utils/Percent";
import { Orientation } from "../../core/defs/Orientation";
import { IPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[FunnelSlice]].
 */
export interface IFunnelSliceProperties extends IContainerProperties {
    /**
     * Width of the top edge of the slice.
     */
    topWidth?: number | Percent;
    /**
     * Width of the bottom edge of the slice.
     */
    bottomWidth?: number | Percent;
    /**
     * A relative distance slice's sides should be bent to.
     *
     * @default 0
     */
    expandDistance?: number;
    /**
     * Orientation of the slice.
     */
    orientation?: Orientation;
}
/**
 * Defines events for [[FunnelSlice]].
 */
export interface IFunnelSliceEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[FunnelSlice]].
 *
 * @see {@link Adapter}
 */
export interface IFunnelSliceAdapters extends IContainerAdapters, IFunnelSliceProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to create [[FunnelSlice]] elements.
 *
 * @see {@link IFunnelSliceEvents} for a list of available events
 * @see {@link IFunnelSliceAdapters} for a list of available adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
export declare class FunnelSlice extends Container {
    /**
     * Defines available properties.
     */
    _properties: IFunnelSliceProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFunnelSliceAdapters;
    /**
     * Defines available events.
     */
    _events: IFunnelSliceEvents;
    /**
     * Main slice element.
     */
    slice: Sprite;
    /**
     * Am anchor point the slice tick line is pointing to.
     *
     * @ignore Exclude from docs
     * @readonly
     */
    tickPoint: IPoint;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the element.
     */
    protected draw(): void;
    getPoint(locationX: number, locationY: number): IPoint;
    /**
     * Bottom width in pixels or percent.
     *
     * IMPORTANT: this setting might be used to set dimensions if you use slice
     * as a standalone element. If it's a part of [[FunnelSeries]] this setting
     * becomes read-only as it will be automatically reset by series.
     *
     * @param value  Bottom width
     */
    /**
    * @return bottom width
    */
    bottomWidth: number | Percent;
    /**
     * Top width in pixels or percent.
     *
     * IMPORTANT: this setting might be used to set dimensions if you use slice
     * as a standalone element. If it's a part of [[FunnelSeries]] this setting
     * becomes read-only as it will be automatically reset by series.
     *
     * @param value  Top width
     */
    /**
    * @return Top width
    */
    topWidth: number | Percent;
    /**
     * Orientation of the funnel slice: "horizontal" or "vertical".
     *
     * IMPORTANT: this setting might be used to set orintation if you use slice
     * as a standalone element. If it's a part of [[FunnelSeries]] this setting
     * becomes read-only as it will be automatically reset by series.
     *
     * @param value  Orientation
     */
    /**
    * @return Orientation
    */
    orientation: Orientation;
    /**
     * A relative distance slice's sides should be bent to. It's relative to the
     * height of the slice.
     *
     * Zero (default) will mean the sides will be perfectly straight.
     *
     * Positive value will make them bend outwards, resulting in "puffed" slices.
     *
     * Negative values will make them bend inwards.
     *
     * @default 0
     * @param {number}
     */
    /**
    * @return expandDistance
    */
    expandDistance: number;
    /**
     * Copies all parameters from another [[Sprite]].
     *
     * @param source Source Sprite
     */
    copyFrom(source: this): void;
}
