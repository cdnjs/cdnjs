/**
 * Line series segment module.
 * @todo Add description about what this is
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ILineSeriesSegmentAdapters, ILineSeriesSegmentEvents, ILineSeriesSegmentProperties, LineSeriesSegment } from "./LineSeriesSegment";
import { IPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[StepLineSeriesSegment]].
 */
export interface IStepLineSeriesSegmentProperties extends ILineSeriesSegmentProperties {
}
/**
 * Defines events for [[StepLineSeriesSegment]].
 */
export interface IStepLineSeriesSegmentEvents extends ILineSeriesSegmentEvents {
}
/**
 * Defines adapters for [[StepLineSeriesSegment]].
 *
 * @see {@link Adapter}
 */
export interface IStepLineSeriesSegmentAdapters extends ILineSeriesSegmentAdapters, IStepLineSeriesSegmentProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Represents a line series segment.
 *
 * A line segment can be used to apply different properties to a part of the
 * line series, between two data points.
 *
 * @see {@link IStepLineSeriesSegmentEvents} for a list of available events
 * @see {@link IStepLineSeriesSegmentAdapters} for a list of available Adapters
 * @todo Example
 */
export declare class StepLineSeriesSegment extends LineSeriesSegment {
    /**
     * Defines available properties.
     */
    _properties: IStepLineSeriesSegmentProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IStepLineSeriesSegmentAdapters;
    /**
     * Defines available events.
     */
    _events: IStepLineSeriesSegmentEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the series segment.
     *
     * @ignore Exclude from docs
     * @param points       Points to connect
     * @param closePoints  ?
     * @param smoothnessX  Horizontal bezier setting (?)
     * @param smoothnessY  Vertical bezier setting (?)
     */
    drawSegment(points: IPoint[], closePoints: IPoint[], smoothnessX: number, smoothnessY: number, noRisers?: boolean, vertical?: boolean): void;
}
