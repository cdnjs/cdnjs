import tinycolor from "tinycolor2";
import { type WritableComputedRef } from "vue";
export declare const useHueRef: (tinyColorRef: WritableComputedRef<tinycolor.Instance, tinycolor.Instance>) => {
    hueRef: import("vue").Ref<number, number>;
    updateHueRef: (newHue: number) => void;
};
