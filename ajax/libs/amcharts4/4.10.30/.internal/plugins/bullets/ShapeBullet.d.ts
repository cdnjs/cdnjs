/**
 * Functionality for drawing bullets with basic shapes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../core/Sprite";
import { Bullet, IBulletProperties, IBulletAdapters, IBulletEvents } from "../../charts/elements/Bullet";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ShapeBullet]].
 */
export interface IShapeBulletProperties extends IBulletProperties {
    /**
     * Size (width and height in pixels) of the bullet. The actual shapes will be
     * sized and positioned to fit this pixel value.
     *
     * @default 10
     */
    size?: number;
    /**
     * Shape of the bullet.
     */
    shape?: BulletShapes;
}
/**
 * Defines events for [[ShapeBullet]].
 */
export interface IShapeBulletEvents extends IBulletEvents {
}
/**
 * Defines adapters for [[ShapeBullet]].
 *
 * @see {@link Adapter}
 */
export interface IShapeBulletAdapters extends IBulletAdapters, IShapeBulletProperties {
}
/**
 * Defines available shapes for a [[ShapeBullet]].
 */
export declare type BulletShapes = "square" | "diamond" | "circle" | "up" | "down" | "left" | "right";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a ShapeBullet shape.
 *
 * @since 4.9.34
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IShapeBulletEvents} for a list of available events
 * @see {@link IShapeBulletAdapters} for a list of available Adapters
 */
export declare class ShapeBullet extends Bullet {
    /**
     * Defines available properties.
     */
    _properties: IShapeBulletProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IShapeBulletAdapters;
    /**
     * Defines available events.
     */
    _events: IShapeBulletEvents;
    /**
     * An actual element comprising the shape.
     *
     * The type of the element will depend on the `shape` setting. It could be
     * a `Circle`, `Rectangle`, or `Triangle`.
     */
    shapeElement: Sprite;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Decorates the shape so it is positioned properly.
     */
    private processShape;
    /**
     * Creates a square shape.
     */
    private createSquare;
    /**
     * Creates a circle shape.
     */
    private createCircle;
    /**
     * Creates a triangle shape.
     */
    private createTriangle;
    /**
     * Shape of the bullet.
     *
     * Available options: `"square"`, `"diamond"`, `"circle"`, `"up"`, `"down"`,
     * `"left"`, `"right"`.
     *
     * There is no default. If `shape` is not set, the bullets will come out
     * empty.
     *
     * @param  value  Shape
     */
    /**
    * @return shape scope
    */
    shape: BulletShapes;
    /**
     * Size (width and height in pixels) of the bullet. The actual shapes will be
     * sized and positioned to fit this pixel value.
     *
     * @default 10
     * @param value  Size (px)
     */
    /**
    * @return Size (px)
    */
    size: number;
}
