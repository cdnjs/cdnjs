/**
 * Bullet module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet, IBulletProperties, IBulletAdapters, IBulletEvents } from "./Bullet";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Bullet]]
 */
export interface IErrorBulletProperties extends IBulletProperties {
}
/**
 * Defines events for [[Bullet]]
 */
export interface IErrorBulletEvents extends IBulletEvents {
}
/**
 * Defines adapters
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface IErrorBulletAdapters extends IBulletAdapters, IErrorBulletProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a bullet with a textual label.
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * @see {@link IBulletEvents} for a list of available events
 * @see {@link IBulletAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
export declare class ErrorBullet extends Bullet {
    /**
     * Defines available properties.
     */
    _properties: IErrorBulletProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IErrorBulletAdapters;
    /**
     * Defines available events.
     */
    _events: IErrorBulletEvents;
    errorLine: Sprite;
    /**
     * Constructor
     */
    constructor();
    validatePosition(): void;
    /**
     * Copies all proprities and related stuff from another instance of
     * [[ErrorBullet]].
     *
     * @param source  Source element
     */
    copyFrom(source: this): void;
}
