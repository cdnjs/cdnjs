/**
 * Absolute coordinate positions adjusted for scroll.
 */
interface Coordinates {
    top: number;
    left: number;
    width: number;
    height: number;
}
/**
 * Returns the width/height that the element should be transitioned between.
 * This takes into account box-sizing.
 * @param el - Element being animated
 * @param oldCoords - Old set of Coordinates coordinates
 * @param newCoords - New set of Coordinates coordinates
 * @returns
 */
export declare function getTransitionSizes(el: Element, oldCoords: Coordinates, newCoords: Coordinates): number[];
export interface AutoAnimateOptions {
    /**
     * The time it takes to run a single sequence of animations in milliseconds.
     */
    duration: number;
    /**
     * The type of easing to use.
     * Default: ease-in-out
     */
    easing: "linear" | "ease-in" | "ease-out" | "ease-in-out" | string;
}
/**
 * A custom plugin that determines what the effects to run
 */
export interface AutoAnimationPlugin {
    <T extends "add" | "remove" | "remain">(el: Element, action: T, newCoordinates?: T extends "add" | "remain" | "remove" ? Coordinates : undefined, oldCoordinates?: T extends "remain" ? Coordinates : undefined): KeyframeEffect;
}
/**
 * A function that automatically adds animation effects to itself and its
 * immediate children. Specifically it adds effects for adding, moving, and
 * removing DOM elements.
 * @param el - A parent element to add animations to.
 * @param options - An optional object of options.
 */
export default function autoAnimate(el: HTMLElement, config?: Partial<AutoAnimateOptions> | AutoAnimationPlugin): void;
/**
 * The vue directive.
 */
export declare const vAutoAnimate: {
    mounted: (el: HTMLElement, binding: {
        value: Partial<AutoAnimateOptions> | AutoAnimationPlugin;
    }) => void;
};
export {};
