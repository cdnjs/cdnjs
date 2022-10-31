import { AutoAnimateOptions, AutoAnimationPlugin } from "../index";
/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export declare function useAutoAnimate(options: Partial<AutoAnimateOptions> | AutoAnimationPlugin): import("react").RefObject<Element>;
