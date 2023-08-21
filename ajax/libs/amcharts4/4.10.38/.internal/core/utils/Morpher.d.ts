/**
 * Morpher module contains functionality that allows morphing one polygon to
 * another.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { IPoint } from "../defs/IPoint";
import { IRectangle } from "../defs/IRectangle";
import { IMorphable } from "../defs/IMorphable";
import { IAnimatable, Animation } from "../utils/Animation";
import * as $type from "../utils/Type";
/**
 * Morpher can be used to morph one polygon to some other polygon.
 */
export declare class Morpher extends BaseObject implements IAnimatable {
    /**
     * An element that will be a subject for morphing.
     */
    morphable: IMorphable;
    /**
     * [_morphFromPointsReal description]
     *
     * @todo Description
     */
    protected _morphFromPointsReal: $type.Optional<Array<Array<Array<IPoint>>>>;
    /**
     * [_morphToPointsReal description]
     *
     * @todo Description
     */
    protected _morphToPointsReal: $type.Optional<Array<Array<Array<IPoint>>>>;
    /**
     * [_morphToPoints description]
     *
     * @todo Description
     */
    protected _morphToPoints: $type.Optional<Array<Array<Array<IPoint>>>>;
    /**
     * Morph progress (0-1)
     */
    protected _morphProgress: $type.Optional<number>;
    /**
     * List of animations currently running.
     */
    protected _animations: $type.Optional<Array<Animation>>;
    /**
     * A storage for measurements.
     */
    protected _bboxes: IRectangle[];
    /**
     * Duration of the morphing animation in milliseconds.
     */
    morphDuration: number;
    /**
     * An easing function to use for morphing animation.
     *
     * @see {@link Ease}
     */
    morphEasing: (value: number) => number;
    /**
     * If set to `true`, all separate parts of the multi-part polygon will
     * morph into a single circle or polygon when using built-in methods
     * `morphToCircle()` or `morphToPolygon()`.
     *
     * Otherwise each separate part of polygon will morph to individual target
     * circle or polgyon.
     */
    morphToSingle: boolean;
    /**
     * A ratio to scale morphed object in relation to the source object.
     */
    scaleRatio: number;
    /**
     * Constructor.
     *
     * @param morphable An object to morph
     */
    constructor(morphable: IMorphable);
    /**
     * Morphs a polygon to another polygon.
     *
     * @param toPoints  Corner points of the target shape
     * @param duration  Duration in milliseconds
     * @param easing    Easing function
     * @return Animation
     */
    morphToPolygon(toPoints: Array<Array<Array<IPoint>>>, duration?: number, easing?: (value: number) => number): Animation;
    /**
     * [normalizePoints description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param pointsA  Point A
     * @param pointsB  Point B
     * @return Normalized points
     */
    normalizePoints(pointsA: Array<Array<Array<IPoint>>>, pointsB: Array<Array<Array<IPoint>>>): Array<Array<Array<IPoint>>>;
    /**
     * [sortPoints description]
     *
     * @ignore Exclude from doc
     * @todo Description
     * @param points  [description]
     * @return                        common bbox of points
     */
    sortPoints(points: Array<Array<Array<IPoint>>>): $type.Optional<IRectangle>;
    /**
     * Morphs polygon to a circle (it is actually a polygon which makes a circle).
     *
     * @param radius    Target circle radius (px)
     * @param duration  Duration (ms)
     * @param easing    Easing function
     * @return Animation
     */
    morphToCircle(radius?: number, duration?: number, easing?: (value: number) => number): Animation;
    /**
     * [addPoints description]
     *
     * @ignore Exclude from doc
     * @todo Description
     * @param points         [description]
     * @param mustHaveCount  [description]
     * @return [description]
     */
    addPoints(points: IPoint[], mustHaveCount: number): IPoint[];
    /**
     * Morphs polygon into a rectangular polygon.
     *
     * @param width     Width of the target rectangle (px)
     * @param height    Height of the target rectangle (px)
     * @param duration  Duration (ms)
     * @param easing    Easing function
     * @return Animation
     */
    morphToRectangle(width?: number, height?: number, duration?: number, easing?: (value: number) => number): Animation;
    /**
     * Progress of the morph transition.
     *
     * Setting this will also trigger actual transformation.
     *
     * @param value  Progress (0-1)
     */
    /**
    * Returns the progress of morph transition.
    *
    * @return Progress (0-1)
    */
    morphProgress: $type.Optional<number>;
    /**
     * Restores the polygon to its original appearance.
     *
     * @param duration  Duration (ms)
     * @param easing    Easing function
     * @return Animation
     */
    morphBack(duration?: number, easing?: (value: number) => number): Animation;
    /**
     * Returns a list of morph animations currently being played.
     *
     * @return List of animations
     */
    readonly animations: Array<Animation>;
}
