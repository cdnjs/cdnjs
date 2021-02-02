/**
 * Functionality for drawing a trapezoid.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Trapezoid]].
 */
export interface ITrapezoidProperties extends ISpriteProperties {
    /**
     * Wdith of the top side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     */
    topSide?: number | Percent;
    /**
     * Wdith of the bottom side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     */
    bottomSide?: number | Percent;
    /**
     * Height of the left side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     */
    leftSide?: number | Percent;
    /**
     * Height of the right side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     */
    rightSide?: number | Percent;
    /**
     * A relative vertical position of the "neck". If the top and bottom sides
     * are of different width, and `horizontalNeck` is set, a choke point
     * will be created at that position, creating a funnel shape.
     */
    horizontalNeck?: Percent;
    /**
     * A relative horizontal position of the "neck". If the left and right sides
     * are of different height, and `verticalNeck` is set, a choke point
     * will be created at that position, creating a funnel shape.
     */
    verticalNeck?: Percent;
}
/**
 * Defines events for [[Trapezoid]].
 */
export interface ITrapezoidEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Trapezoid]].
 *
 * @see {@link Adapter}
 */
export interface ITrapezoidAdapters extends ISpriteAdapters, ITrapezoidProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a Trapezoid.
 *
 * @see {@link ITrapezoidEvents} for a list of available events
 * @see {@link ITrapezoidAdapters} for a list of available Adapters
 */
export declare class Trapezoid extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: ITrapezoidProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ITrapezoidAdapters;
    /**
     * Defines available events.
     */
    _events: ITrapezoidEvents;
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
     * Wdith of the top side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     * @param value  Width
     */
    /**
    * @return Width
    */
    topSide: number | Percent;
    /**
     * Wdith of the bottom side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     * @param value  Width
     */
    /**
    * @return Width
    */
    bottomSide: number | Percent;
    /**
     * Height of the left side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     * @param value  Height
     */
    /**
    * @return Height
    */
    leftSide: number | Percent;
    /**
     * Height of the right side. Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     * @param value  Height
     */
    /**
    * @return Height
    */
    rightSide: number | Percent;
    /**
     * A relative vertical position of the "neck". If the top and bottom sides
     * are of different width, and `horizontalNeck` is set, a choke point
     * will be created at that position, creating a funnel shape.
     *
     * @param value  Horizontal neck position
     */
    /**
    * @return Horizontal neck position
    */
    horizontalNeck: Percent;
    /**
     * A relative horizontal position of the "neck". If the left and right sides
     * are of different height, and `verticalNeck` is set, a choke point
     * will be created at that position, creating a funnel shape.
     *
     * @param value  Vertical neck position
     */
    /**
    * @return Vertical neck position
    */
    verticalNeck: Percent;
}
