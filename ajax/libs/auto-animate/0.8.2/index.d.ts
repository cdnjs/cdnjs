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
 * Allows start/stop control of the animation
 */
export interface AnimationController<P = unknown> {
    /**
     * The original animation parent.
     */
    readonly parent: Element;
    /**
     * A function that enables future animations.
     */
    enable: () => void;
    /**
     * A function that disables future animations.
     */
    disable: () => void;
    /**
     * A function that returns true if the animations are currently enabled.
     */
    isEnabled: () => boolean;
    /**
     * (Svelte Specific) A function that runs if the parameters are changed.
     */
    update?: (newParams: P) => void;
    /**
     * (Svelte Specific) A function that runs when the component is removed from the DOM.
     */
    destroy?: () => void;
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
    easing: "linear" | "ease-in" | "ease-out" | "ease-in-out" | ({} & string);
    /**
     * Ignore a user’s "reduce motion" setting and enable animations. It is not
     * recommended to use this.
     */
    disrespectUserMotionPreference?: boolean;
}
/**
 * A custom plugin config object
 */
export interface AutoAnimationPluginOptions {
    styleReset: CSSStyleDeclaration | false;
}
/**
 * A custom plugin that determines what the effects to run
 */
export interface AutoAnimationPlugin {
    <T extends "add" | "remove" | "remain">(el: Element, action: T, newCoordinates?: T extends "add" | "remain" | "remove" ? Coordinates : undefined, oldCoordinates?: T extends "remain" ? Coordinates : undefined): KeyframeEffect | [KeyframeEffect, AutoAnimationPluginOptions];
}
/**
 * A function that automatically adds animation effects to itself and its
 * immediate children. Specifically it adds effects for adding, moving, and
 * removing DOM elements.
 * @param el - A parent element to add animations to.
 * @param options - An optional object of options.
 */
export default function autoAnimate(el: HTMLElement, config?: Partial<AutoAnimateOptions> | AutoAnimationPlugin): AnimationController;
/**
 * The vue directive.
 */
export declare const vAutoAnimate: {
    mounted: (el: HTMLElement, binding: {
        value: Partial<AutoAnimateOptions> | AutoAnimationPlugin | undefined;
    }) => void;
    getSSRProps: () => {};
};
export {};
