/**
 * Bullet module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet, IBulletProperties, IBulletAdapters, IBulletEvents } from "../../charts/elements/Bullet";
import { Circle } from "../../core/elements/Circle";
import { PointedCircle } from "./PointedCircle";
import { Image } from "../../core/elements/Image";
import { Label } from "../../core/elements/Label";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[PinBullet]].
 */
export interface IPinBulletProperties extends IBulletProperties {
}
/**
 * Defines events for [[PinBullet]].
 */
export interface IPinBulletEvents extends IBulletEvents {
}
/**
 * Defines adapters.
 *
 * Includes both the [[Adapter]] definitions and properties
 *
 * @see {@link Adapter}
 */
export interface IPinBulletAdapters extends IBulletAdapters, IPinBulletProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a pin-shaped bullet with an optional text label and/or image inside
 * it.
 *
 * The background/body of the flag is a [[PointedCircle]] element. Most of
 * its the visual appearance is configured via `background` property.
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * Example:
 *
 * ```TypeScript
 * let series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * let pinBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
 * pinBullet.poleHeight = 15;
 * pinBullet.label.text = "{valueY}";
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * var pinBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
 * pinBullet.poleHeight = 15;
 * pinBullet.label.text = "{valueY}";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *     "bullets": [{
 *       "type": "PinBullet",
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
export declare class PinBullet extends Bullet {
    /**
     * Defines available properties.
     */
    _properties: IPinBulletProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPinBulletAdapters;
    /**
     * Defines available events.
     */
    _events: IPinBulletEvents;
    /**
     * A [[Circle]] element of the pin. It is used for the "inside" of the pin.
     */
    circle: Circle;
    /**
     * A type for the background element.
     */
    _background: PointedCircle;
    /**
     * Image element.
     */
    protected _image: Image;
    /**
     * Label element.
     */
    protected _label: Label;
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
     * An element of type [[Image]] to show inside pin's circle.
     *
     * @param  image  Image
     */
    /**
    * @return Image
    */
    image: Image;
    /**
     * A [[Label]] element for displaying within flag.
     *
     * Use it's `text` property to set actual text, e.g.:
     *
     * ```TypeScript
     * pinBullet.text = "Hello";
     * ```
     * ```JavaScript
     * pinBullet.text = "Hello";
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "bullets": [{
     *       "type": "PinBullet",
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
     * [[PinBullet]].
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
}
