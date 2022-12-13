/**
 * Tick module
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
 * Defines properties for [[Tick]].
 */
export interface ITickProperties extends ISpriteProperties {
    /**
     * Length of the tick (px).
     */
    length?: number;
}
/**
 * Defines events for [[Tick]].
 */
export interface ITickEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Tick]].
 *
 * @see {@link Adapter}
 */
export interface ITickAdapters extends ISpriteAdapters, ITickProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A basic Tick class.
 *
 * A tick is a short dash, mainly connecting an object like axis or slice to
 * it's textual label.
 *
 * @see {@link ITickEvents} for a list of available events
 * @see {@link ITickAdapters} for a list of available Adapters
 * @important
 */
export declare class Tick extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: ITickProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ITickAdapters;
    /**
     * Defines available events.
     */
    _events: ITickEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Length of the tick in pixels.
     *
     * @param value  Length (px)
     */
    /**
    * @return Length (px)
    */
    length: number;
}
