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
 * Defines properties for [[MinimizeButton]].
 */
export interface IMinimizeButtonProperties extends IButtonProperties {
}
/**
 * Defines events for [[MinimizeButton]].
 */
export interface IMinimizeButtonEvents extends IButtonEvents {
}
/**
 * Defines adapters for [[MinimizeButton]].
 *
 * @see {@link Adapter}
 */
export interface IMinimizeButtonAdapters extends IButtonAdapters, IMinimizeButtonProperties {
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
 * @see {@link IMinimizeButtonEvents} for a list of available events
 * @see {@link IMinimizeButtonAdapters} for a list of available Adapters
 */
export declare class MinimizeButton extends Button {
    /**
     * Defines available properties.
     */
    _properties: IMinimizeButtonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMinimizeButtonAdapters;
    /**
     * Defines available events.
     */
    _events: IMinimizeButtonEvents;
    protected _activePath: string;
    protected _path: string;
    /**
     * Constructor
     */
    constructor();
    protected setActive(value: boolean): void;
    protected updateIcon(): void;
    validate(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
}
