/**
 * Play button functionality.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Button, IButtonProperties, IButtonAdapters, IButtonEvents } from "./Button";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[PlayButton]].
 */
export interface IPlayButtonProperties extends IButtonProperties {
}
/**
 * Defines events for [[PlayButton]].
 */
export interface IPlayButtonEvents extends IButtonEvents {
}
/**
 * Defines adapters for [[PlayButton]].
 *
 * @see {@link Adapter}
 */
export interface IPlayButtonAdapters extends IButtonAdapters, IPlayButtonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a zoom out button.
 *
 * @see {@link IPlayButtonEvents} for a list of available events
 * @see {@link IPlayButtonAdapters} for a list of available Adapters
 */
export declare class PlayButton extends Button {
    /**
     * Defines available properties.
     */
    _properties: IPlayButtonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPlayButtonAdapters;
    /**
     * Defines available events.
     */
    _events: IPlayButtonEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
}
