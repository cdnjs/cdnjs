/**
 * Creates a 3D rectangle.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../Container";
import { Sprite } from "../../Sprite";
import { Color } from "../../utils/Color";
import { RadialGradient } from "../../rendering/fills/RadialGradient";
import { LinearGradient } from "../../rendering/fills/LinearGradient";
import { Pattern } from "../../rendering/fills/Pattern";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Rectangle3D]].
 */
export interface Rectangle3DProperties extends IContainerProperties {
    /**
     * Depth (Z dimension) of the 3D rectangle in pixels.
     *
     * @default 30
     */
    depth?: number;
    /**
     * Angle of the point of view to the 3D element. (0-360)
     *
     * @default 30
     */
    angle?: number;
}
/**
 * Defines events for [[Rectangle3D]]
 */
export interface Rectangle3DEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Rectangle3D]].
 *
 * @see {@link Adapter}
 */
export interface Rectangle3DAdapters extends IContainerAdapters, Rectangle3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Builds a 3D rectangle
 * @see {@link IRectangle3DEvents} for a list of available events
 * @see {@link IRectangle3DAdapters} for a list of available Adapters
 */
export declare class Rectangle3D extends Container {
    /**
     * Defines available properties.
     */
    _properties: Rectangle3DProperties;
    /**
     * Defines available adapters.
     */
    _adapter: Rectangle3DAdapters;
    /**
     * Defines available events.
     */
    _events: Rectangle3DEvents;
    /**
     * Left side element.
     *
     * @ignore Exclude from docs
     */
    sideLeft: Sprite;
    /**
     * Right side element.
     *
     * @ignore Exclude from docs
     */
    sideRight: Sprite;
    /**
     * Top element.
     *
     * @ignore Exclude from docs
     */
    sideTop: Sprite;
    /**
     * Bottom element.
     *
     * @ignore Exclude from docs
     */
    sideBottom: Sprite;
    /**
     * Back element.
     *
     * @ignore Exclude from docs
     */
    sideBack: Sprite;
    /**
     * Front element.
     *
     * @ignore Exclude from docs
     */
    sideFront: Sprite;
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
     * Depth (Z dimension) of the 3D rectangle in pixels.
     *
     * @default 30
     * @param value  Depth (px)
     */
    /**
    * @return Depth (px)
    */
    depth: number;
    /**
     * Angle of the point of view to the 3D element. (0-360)
     *
     * @default 30
     * @param value  Angle
     */
    /**
    * @return Angle
    */
    angle: number;
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    protected setFill(value: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>): void;
    /**
     * Copies all properties and related data from a different instance of Rectangle3D.
     *
     * @param source Source Rectangle3D
     */
    copyFrom(source: this): void;
}
