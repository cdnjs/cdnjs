/**
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisLine]].
 */
export interface IAxisLineProperties extends ISpriteProperties {
}
/**
 * Defines events for [[AxisLine]].
 */
export interface IAxisLineEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[AxisLine]].
 *
 * @see {@link Adapter}
 */
export interface IAxisLineAdapters extends ISpriteAdapters, IAxisLineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw Axis line.
 *
 * @see {@link IAxisLineEvents} for a list of available events
 * @see {@link IAxisLineAdapters} for a list of available Adapters
 */
export declare class AxisLine extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IAxisLineProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisLineAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisLineEvents;
    /**
     * Constructor
     */
    constructor();
}
