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
import { Label } from "../../core/elements/Label";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Bullet]]
 */
export interface ILabelBulletProperties extends IBulletProperties {
}
/**
 * Defines events for [[Bullet]]
 */
export interface ILabelBulletEvents extends IBulletEvents {
}
/**
 * Defines adapters
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface ILabelBulletAdapters extends IBulletAdapters, ILabelBulletProperties {
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
export declare class LabelBullet extends Bullet {
    /**
     * Defines available properties.
     */
    _properties: ILabelBulletProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ILabelBulletAdapters;
    /**
     * Defines available events.
     */
    _events: ILabelBulletEvents;
    /**
     * A label (textual) element for the bullet.
     */
    label: Label;
    /**
     * Constructor
     */
    constructor();
    protected handleMaxSize(): void;
    /**
     * Copies all proprities and related stuff from another instance of
     * [[LabelBullet]].
     *
     * @param source  Source element
     */
    copyFrom(source: this): void;
}
