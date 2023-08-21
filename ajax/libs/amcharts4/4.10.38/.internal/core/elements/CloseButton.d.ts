/**
 * Zoom out button functionality.
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
 * Defines properties for [[CloseButton]].
 */
export interface ICloseButtonProperties extends IButtonProperties {
}
/**
 * Defines events for [[CloseButton]].
 */
export interface ICloseButtonEvents extends IButtonEvents {
}
/**
 * Defines adapters for [[CloseButton]].
 *
 * @see {@link Adapter}
 */
export interface ICloseButtonAdapters extends IButtonAdapters, ICloseButtonProperties {
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
 * @see {@link ICloseButtonEvents} for a list of available events
 * @see {@link ICloseButtonAdapters} for a list of available Adapters
 */
export declare class CloseButton extends Button {
    /**
     * Defines available properties.
     */
    _properties: ICloseButtonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICloseButtonAdapters;
    /**
     * Defines available events.
     */
    _events: ICloseButtonEvents;
    /**
     * Constructor
     */
    constructor();
    validate(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
}
