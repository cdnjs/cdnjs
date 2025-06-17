import { type WritableComputedRef } from "vue";
export declare const hueModel: (tinyColorRef: WritableComputedRef<tinycolor.Instance, tinycolor.Instance>, updateTinyColor: (value: tinycolor.ColorInput) => void) => {
    /** use for Editable Input to change the hue value */
    hueRef: import("vue").Ref<number | undefined, number | undefined>;
    /** use for the change event of <Hue /> Component */
    setHue: (hue: number, offset: number) => void;
    /**
     * Use for hue value of all color components.
     * This hue value handles the case when the hue value is lost when converting to tinycolor instance
     */
    retainedHueRef: import("vue").ComputedRef<number>;
};
