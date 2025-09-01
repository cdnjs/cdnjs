import { type EmitFn } from 'vue';
import tinycolor from 'tinycolor2';
/**
 * Props used to bind color values via v-model in Vue 3 and Vue 2.7.
 *
 * ⚠️ Note: Due to a known limitation in Vue 2.7 (see https://github.com/vuejs/core/issues/4294#issuecomment-1025210436),
 * `defineProps` does not support type extension. As a result, this type definition is currently duplicated
 * where needed instead of being reused via extends.
 */
export interface defineColorModelProps {
    /**
     * Used with `v-model:tinyColor`. Accepts any valid TinyColor input format.
     */
    tinyColor?: tinycolor.ColorInput;
    /**
     * Used with `v-model`. Accepts any valid TinyColor input format.
     */
    modelValue?: tinycolor.ColorInput;
    /**
     * Fallback for `v-model` compatibility in Vue 2.7.
     * Accepts any valid TinyColor input.
     */
    value?: tinycolor.ColorInput;
}
export declare const EmitEventNames: string[];
export declare function defineColorModel(props: defineColorModelProps, emit: EmitFn, name?: string): import("vue").WritableComputedRef<tinycolor.Instance, tinycolor.ColorInput>;
