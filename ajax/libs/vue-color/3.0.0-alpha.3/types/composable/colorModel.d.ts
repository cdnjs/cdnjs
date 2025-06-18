import { type EmitFn } from 'vue';
import tinycolor from 'tinycolor2';
export type useTinyColorModelProps = {
    tinyColor?: tinycolor.ColorInput;
    modelValue?: tinycolor.ColorInput;
};
export declare const EmitEventNames: string[];
export declare function defineColorModel(props: useTinyColorModelProps, emit: EmitFn): import("vue").WritableComputedRef<tinycolor.Instance, tinycolor.ColorInput>;
