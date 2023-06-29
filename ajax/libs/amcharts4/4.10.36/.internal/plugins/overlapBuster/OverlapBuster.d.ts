/**
 * Plugin which enables automatically exploding overlapping elements.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Plugin } from "../../core/utils/Plugin";
import { List } from "../../core/utils/List";
import * as d3force from "d3-force";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * @ignore
 */
export interface IOverlapBusterTarget {
    target: Sprite;
    originalX: number;
    originalY: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A plugin which automatically groups [[PercenSeries]] slices that are smaller
 * than certain percent into one "Other" slice.
 *
 * By pushing an instance of [[Annnotation]] into `plugin` list of
 * any [[Chart]], it automatically applies the functionality.
 *
 * Example:
 *
 * ```TypeScript
 * let overlap = chart.plugins.push(new am4plugins_overlapBuster.OverlapBuster());
 * overlap.targets.push(bullet);
 * ```
 * ```JavaScript
 * let overlap = chart.plugins.push(new am4plugins_overlapBuster.OverlapBuster());
 * overlap.targets.push(bullet);
 * ```
 * ```JSON
 * // this plugin does not support JSON config
 * ```
 *
 * @since 4.6.2
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-overlap-buster/} for more information and usage instructions
 */
export declare class OverlapBuster extends Plugin {
    /**
     * Overlap check targets.
     */
    private _targets;
    /**
     * List of elements that have been misplaced temporarily.
     */
    private _shiftedTargets;
    /**
     * An object which is current center of the exploded cluster.
     */
    private _centerTarget;
    /**
     * How much of the obstructed object should be arevealed approximately.
     *
     * The number is relative (0-1). With `0` meaning the objstructed objects
     * won't be moved at all, `0.5` (default) will make at least half of the
     * object show up, and `1` to reveal object whole.
     *
     * @default 0.7
     */
    revealRatio: number;
    /**
     * A delay in milliseconds to postpone collapse of expanded items once
     * they are unhovered.
     *
     * @default 500
     */
    collapseDelay: number;
    /**
     * How big an area to check for overlapping elements should be checked in
     * relation to hovered items size.
     *
     * `1` (one) means it will affect only elements that are at least partially
     * overlapping with the target element.
     *
     * `2` (two) will check area twice as big.
     *
     * Etc.
     *
     * @default 2
     */
    tolerance: number;
    /**
     * Timeout reference.
     */
    private _collapseTimeout;
    /**
     * A reference to the `d3.Simulation` instance for fine-grained configuration
     * of node gravitational dynamics.
     *
     * @see {@link https://github.com/d3/d3-force#simulation} For more info
     */
    d3forceSimulation: d3force.Simulation<{}, d3force.SimulationLinkDatum<d3force.SimulationNodeDatum>>;
    /**
     * List of affected nodes.
     */
    protected _nodes: any[];
    /**
     * Constructor
     */
    constructor();
    /**
     * Initializes plugin.
     */
    init(): void;
    /**
     * A list of objects to check for overlapping.
     *
     * If you push a list template into this, e.g. bullet from a series, all
     * elements created from that templat will automatically end up in this list.
     *
     * @return List of target objects
     */
    readonly targets: List<Sprite>;
    /**
     * Handles hover event on a target element.
     *
     * @param  ev  Event
     */
    private handleHover;
    /**
     * Handles out event on a target element.
     *
     * @param  ev  Event
     */
    private handleOut;
    /**
     * Stops object's animations.
     * @param  target  Target
     */
    private stopAnimation;
    /**
     * Collapses currently expanded cluster of objects.
     */
    private collapseCurrent;
    /**
     * Cancels the collapse timeout.
     */
    private cancelCollapse;
    /**
     * Registers new element.
     *
     * @param  ev  Event
     */
    private register;
    /**
     * Checks if the this element has any of its parts overlapping with another
     * element.
     *
     * @todo Description (review)
     * @param sprite  Second element to test again
     * @return Overlapping?
     */
    hitTest(target: Sprite, sprite: Sprite): boolean;
}
