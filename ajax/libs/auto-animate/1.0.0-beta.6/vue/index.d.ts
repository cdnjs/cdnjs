import { Plugin, Ref } from "vue";
import { AutoAnimateOptions, AutoAnimationPlugin } from "../index";
export declare const autoAnimatePlugin: Plugin;
/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @param options - Auto animate options or a plugin
 * @returns A template ref. Use the `ref` attribute of your parent element
 * to store the element in this template ref.
 */
export declare function useAutoAnimate<T extends Element>(options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin): [Ref<T>, (enabled: boolean) => void];
