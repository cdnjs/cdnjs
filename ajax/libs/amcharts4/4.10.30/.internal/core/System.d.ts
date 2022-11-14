import { Sprite } from "./Sprite";
import { Container } from "./Container";
import { IAnimationObject } from "./utils/Animation";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * The main class that handles system-wide tasks, like caching, heartbeats, etc.
 * @important
 */
export declare class System {
    /**
     * A flag indicating if the system is on pause.
     */
    protected _isPaused: boolean;
    /**
     * Holds the list of currently playing animations.
     *
     * @ignore Exclude from docs
     */
    animations: Array<IAnimationObject>;
    /**
     * Unique ID of the object.
     */
    uid: string;
    /**
     * amCharts Version.
     *
     * This follows npm's semver specification.
     *
     * @see {@link https://docs.npmjs.com/misc/semver}
     */
    static VERSION: string;
    /**
     * @todo Description
     * @todo Needed?
     * @ignore Exclude from docs
     */
    dummyCounter: number;
    /**
     * @todo Description
     * @ignore Exclude from docs
     */
    time: number;
    protected _frameRequested: boolean;
    updateStepDuration: number;
    /**
     * Performs initialization of the System object.
     *
     * Called when the first [[Sprite]] object is created.
     *
     * @ignore Exclude from docs
     */
    constructor();
    /**
     * Reports time elapsed since timer was reset.
     *
     * @ignore Exclude from docs
     * @todo Needed?
     * @param msg    Message to report in console
     * @param reset  Reset time counter
     */
    reportTime(msg: string, reset?: boolean): void;
    /**
     * Performs "heartbeat" operations `frameRate` number of times per second.
     *
     * When the chart element is invalidated, it is not immediately redrawn.
     *
     * Instead it waits for the next `update()` cycle to be re-validated.
     *
     * @ignore Exclude from docs
     * @todo Maybe should be private?
     */
    update(): void;
    checkIfValidate2(sprite: Sprite): boolean;
    /**
     * Requests new animation frame
     */
    requestFrame(): void;
    /**
     * Call this method if you update data or config of a chart that is in
     * hidden container, after revealing the container, so that labels and
     * possibly other elements can correctly arrange themselves.
     *
     * @since 4.7.10
     * @param  container  Target container
     */
    softInvalidate(container: Container): void;
    /**
     * Triggers position re-validation on all [[Sprite]] elements that have
     * invalid(ated) positions.
     *
     * @ignore Exclude from docs
     * @todo Maybe should be private?
     */
    validatePositions(id: string): void;
    /**
     * Triggers position re-validation on all [[Container]] elements that have
     * invalid(ated) layouts.
     *
     * @ignore Exclude from docs
     * @todo Maybe should be private?
     */
    validateLayouts(id: string): void;
    /**
     * Outputs string to console if `verbose` is `true`.
     *
     * @param value Message to output to console
     */
    log(value: any): void;
    /**
     * Pauses all the processes of all the amCharts objects on the page
     *
     * @return is paused?
     */
    /**
    * @return Is system on pause?
    */
    isPaused: boolean;
}
/**
 * A singleton global instance of [[System]].
 *
 * All code should use this, rather than instantiating their
 * own System objects.
 */
export declare const system: System;
