/**
 * Cone module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../Container";
import { Sprite } from "../../Sprite";
import { Ellipse } from "../../elements/Ellipse";
import { LinearGradientModifier } from "../../rendering/fills/LinearGradientModifier";
import { Percent } from "../../utils/Percent";
import { Orientation } from "../../defs/Orientation";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Cone]].
 */
export interface IConeProperties extends IContainerProperties {
    /**
     * Angle of the point of view to the 3D element. (0-360)
     *
     * @default 30
     */
    angle?: number;
    /**
     * A relative radius of the cone's bottom (base).
     *
     * It is relevant to the inner width or height of the element.
     *
     * @default Percent(100)
     */
    radius?: Percent;
    /**
     * A relative radius of the cone's top (tip).
     *
     * It is relevant to the inner width or height of the element.
     *
     * @default Percent(0)
     */
    topRadius?: Percent;
    /**
     * Orientation of the cone
     *
     * @default "vertical"
     */
    orientation?: Orientation;
}
/**
 * Defines events for [[Cone]].
 */
export interface IConeEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Cone]].
 *
 * @see {@link Adapter}
 */
export interface IConeAdapters extends IContainerAdapters, IConeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Builds a round cone/cylinder.
 *
 * @see {@link IConeEvents} for a list of available events
 * @see {@link IConeAdapters} for a list of available Adapters
 */
export declare class Cone extends Container {
    /**
     * Defines available properties.
     */
    _properties: IConeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IConeAdapters;
    /**
     * Defines available events.
     */
    _events: IConeEvents;
    /**
     * Bottom ellement.
     *
     * @ignore Exclude from docs
     */
    bottom: Ellipse;
    /**
     * Top element.
     *
     * @ignore Exclude from docs
     */
    top: Ellipse;
    /**
     * Body element.
     *
     * @ignore Exclude from docs
     */
    body: Sprite;
    /**
     * Gradient for the fill of the body.
     */
    bodyFillModifier: LinearGradientModifier;
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
     * A relative radius of the cone's bottom (base).
     *
     * It is relevant to the inner width or height of the element.
     *
     * @default Percent(100)
     * @param value  Bottom radius
     */
    /**
    * @return Bottom radius
    */
    radius: Percent;
    /**
     * A relative radius of the cone's top (tip).
     *
     * It is relevant to the inner width or height of the element.
     *
     * @default Percent(0)
     * @param value  Top radius
     */
    /**
    * @return Top radius
    */
    topRadius: Percent;
    /**
     * Orientation of the cone
     *
     * @default "vertical"
     * @param value  Orientation
     */
    /**
    * Orientation
    */
    orientation: Orientation;
}
