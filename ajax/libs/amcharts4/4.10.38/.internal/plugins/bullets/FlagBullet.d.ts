/**
 * Flag bullet module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet, IBulletProperties, IBulletAdapters, IBulletEvents } from "../../charts/elements/Bullet";
import { Label } from "../../core/elements/Label";
import { WavedRectangle } from "../../core/elements/WavedRectangle";
import { Line } from "../../core/elements/Line";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[FlagBullet]].
 */
export interface IFlagBulletProperties extends IBulletProperties {
    /**
     * Flag pole height in pixels.
     *
     * @default 10
     */
    poleHeight?: number;
}
/**
 * Defines events for [[FlagBullet]].
 */
export interface IFlagBulletEvents extends IBulletEvents {
}
/**
 * Defines adapters.
 *
 * Includes both the [[Adapter]] definitions and properties.
 * @see {@link Adapter}
 */
export interface IFlagBulletAdapters extends IBulletAdapters, IFlagBulletProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a flag-shaped bullet with an optional text label inside it.
 *
 * The background/body of the flag is a [[WavedRectangle]] element. Most of
 * its the visual appearance is configured via `background` property.
 *
 * The size of a background adopts to the size of a label automatically. If
 * you don't want a label to be shown at all, you can set it to `undefined`. In
 * this case flag size will be of the `width`/`height` set directly on the
 * [[FlagBullet]].
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * Example:
 *
 * ```TypeScript
 * let series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * let flagBullet = series.bullets.push(new am4plugins_bullets.FlagBullet());
 * flagBullet.poleHeight = 15;
 * flagBullet.label.text = "{valueY}";
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * var flagBullet = series.bullets.push(new am4plugins_bullets.FlagBullet());
 * flagBullet.poleHeight = 15;
 * flagBullet.label.text = "{valueY}";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *     "bullets": [{
 *       "type": "FlagBullet",
 *       "poleHeight": 15,
 *       "label": {
 *         "text": "{valueY}"
 *       }
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.5.7
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IBulletEvents} for a list of available events
 * @see {@link IBulletAdapters} for a list of available Adapters
 */
export declare class FlagBullet extends Bullet {
    /**
     * Defines available properties.
     */
    _properties: IFlagBulletProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFlagBulletAdapters;
    /**
     * Defines available events.
     */
    _events: IFlagBulletEvents;
    /**
     * A type for the background element.
     */
    _background: WavedRectangle;
    /**
     * Label element.
     */
    protected _label: Label;
    /**
     * An element of type [[Line]] that represents flag's "pole".
     *
     * To set actual height of the pole use `poleHeight` property, which
     * indicates height of the pole in pixels from bottom of the pole to the
     * bottom of the flag.
     */
    pole: Line;
    /**
     * Constructor
     */
    constructor();
    /**
     * Validates element:
     * * Triggers events
     * * Redraws the element
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Update the background to fit into specific dimensions.
     *
     * @ignore Exclude from docs
     * @todo Make it protected?
     */
    updateBackground(): void;
    /**
     * A [[Label]] element for displaying within flag.
     *
     * Use it's `text` property to set actual text, e.g.:
     *
     * ```TypeScript
     * flagBullet.text = "Hello";
     * ```
     * ```JavaScript
     * flagBullet.text = "Hello";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "bullets": [{
     *       "type": "FlagBullet",
     *       "label": {
     *         "text": "Hello"
     *       }
     *     }]
     *   }]
     * }
     * ```
     * @param  label  Label
     */
    /**
    * @return Label
    */
    label: Label;
    /**
     * Copies all proprities and related stuff from another instance of
     * [[FlagBullet]].
     *
     * @param source  Source element
     */
    copyFrom(source: this): void;
    /**
     * Creates and returns a background element.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    createBackground(): this["_background"];
    /**
     * Flag pole height in pixels.
     *
     * @default 10
     * @param  value  Height (px)
     */
    /**
    * @return Height (px)
    */
    poleHeight: number;
}
