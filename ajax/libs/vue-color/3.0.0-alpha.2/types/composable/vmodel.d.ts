import { type EmitFn } from 'vue';
import tinycolor from 'tinycolor2';
export type useTinyColorModelProps = {
    tinyColor?: tinycolor.ColorInput;
    modelValue?: tinycolor.ColorInput;
};
export declare const EmitEventNames: string[];
/**
 * To support `v-model:tinyColor="color"`
 * @param props
 * @param emit
 * @returns a tinycolor instance wrapped by `computed` and a function to invoke emit;
 */
export declare function useTinyColorModel(props: useTinyColorModelProps, emit: EmitFn): {
    colorRef: import("vue").WritableComputedRef<tinycolor.Instance, tinycolor.Instance>;
    updateColor: (value: tinycolor.ColorInput) => void;
};
