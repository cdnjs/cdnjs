import { RefCallback } from "react";
import { AutoAnimateOptions, AutoAnimationPlugin } from "../index";
/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export declare function useAutoAnimate<T extends Element>(options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin): [RefCallback<T>, (enabled: boolean) => void];
