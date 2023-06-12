/**
 * Axis Label module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisLabel, IAxisLabelProperties, IAxisLabelAdapters, IAxisLabelEvents } from "./AxisLabel";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisLabelCircular]].
 */
export interface IAxisLabelCircularProperties extends IAxisLabelProperties {
    /**
     * Rotation angle of the label in relation to circle line.
     */
    relativeRotation?: number;
    /**
     * Distance of the label from circle line.
     */
    radius?: number | Percent;
    /**
     * Specifies if label should be bent along the circle
     *
     * @type {boolean}
     */
    bent?: boolean;
}
/**
 * Defines events for [[AxisLabelCircular]].
 */
export interface IAxisLabelCircularEvents extends IAxisLabelEvents {
}
/**
 * Defines adapters for [[AxisLabelCircular]].
 *
 * @see {@link Adapter}
 */
export interface IAxisLabelCircularAdapters extends IAxisLabelAdapters, IAxisLabelCircularProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Use to create labels on circular axis.
 *
 * @see {@link IAxisLabelCircularEvents} for a list of available events
 * @see {@link IAxisLabelCircularAdapters} for a list of available Adapters
 */
export declare class AxisLabelCircular extends AxisLabel {
    /**
     * Defines available properties.
     */
    _properties: IAxisLabelCircularProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisLabelCircularAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisLabelCircularEvents;
    /**
     * Related data item.
     */
    _dataItem: any;
    /**
     *
     * @ignore
     */
    fdx: number;
    /**
     *
     * @ignore
     */
    fdy: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Relative rotation of the label.
     *
     * It is an angle to circle. In case 90, labels will be positioned like rays
     * of light, if 0 - positioned along the circle.
     *
     * @param value Rotation angle
     */
    /**
    * @return Rotation angle
    */
    relativeRotation: number;
    /**
     * Distance from axis circle to label in pixels or percent.
     *
     * @param value Distance (px or percent)
     */
    /**
    * @return Distance (px)
    */
    radius: number | Percent;
    /**
     * Specifies if label should be bent along the circle.
     *
     * IMPORTANT: Use this with caution, since it is quite CPU-greedy.
     *
     * @since 4.1.2
     * @default false
     * @param  value  Bent?
     */
    /**
    * @return Bent?
    */
    bent: boolean;
    /**
     * Returns label radius in pixels.
     *
     * @param   axisRadius  Radius
     * @return              Pixel radius
     */
    pixelRadius(axisRadius: number): number;
    /**
     * Returns label horizontal radius in pixels.
     *
     * @param   axisRadius   Radius
     * @param   axisRadiusY  Vertical radius
     * @return               Radius
     */
    pixelRadiusY(axisRadius: number, axisRadiusY: number): number;
    /**
     * [fixPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param point       Label affixation point
     * @param axisRadius  Distance from point (px)
     */
    fixPosition(angle: number, axisRadius: number, axisRadiusY?: number, dx?: number, dy?: number): void;
}
