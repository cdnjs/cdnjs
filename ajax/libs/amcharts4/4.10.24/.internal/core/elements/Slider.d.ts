/**
 * Slider is a scrollbar with just one selection grip.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Scrollbar, IScrollbarProperties, IScrollbarAdapters, IScrollbarEvents } from "../../core/elements/Scrollbar";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Slider]].
 */
export interface ISliderProperties extends IScrollbarProperties {
}
/**
 * Defines events for [[Slider]].
 */
export interface ISliderEvents extends IScrollbarEvents {
}
/**
 * Defines adapters for [[Slider]].
 *
 * @see {@link Adapter}
 */
export interface ISliderAdapters extends IScrollbarAdapters, ISliderProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a slider - a version of scrollbar with just one grip.
 *
 * @see {@link ISliderEvents} for a list of available events
 * @see {@link ISliderAdapters} for a list of available Adapters
 */
export declare class Slider extends Scrollbar {
    /**
     * Defines available properties.
     */
    _properties: ISliderProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISliderAdapters;
    /**
     * Defines available events.
     */
    _events: ISliderEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * @return [description]
     */
    protected __end: number;
    /**
     * @return [description]
     */
    /**
    * Relative position (0-1) of the end grip.
    *
    * @param position  Position (0-1)
    */
    end: number;
    /**
     * Relative position (0-1) of the start grip.
     *
     * @param position  Position (0-1)
     */
    /**
    * @return Position (0-1)
    */
    start: number;
}
