import tinycolor from 'tinycolor2';
declare const _default: import("vue").DefineComponent<{
    /**
     * Custom list of preset colors shown below the picker.
     * Defaults to the standard Sketch-style swatches.
     */
    presetColors?: string[];
    /**
     * Whether to disable the alpha (transparency) slider and input field.
     * When true, users cannot adjust transparency.
     */
    disableAlpha?: boolean;
    /**
     * Whether to hide all input fields (Hex, RGBA).
     * Only the visual picker and preset colors will be available.
     */
    disableFields?: boolean;
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
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    /**
     * Custom list of preset colors shown below the picker.
     * Defaults to the standard Sketch-style swatches.
     */
    presetColors?: string[];
    /**
     * Whether to disable the alpha (transparency) slider and input field.
     * When true, users cannot adjust transparency.
     */
    disableAlpha?: boolean;
    /**
     * Whether to hide all input fields (Hex, RGBA).
     * Only the visual picker and preset colors will be available.
     */
    disableFields?: boolean;
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
}> & Readonly<{}>, {
    disableAlpha: boolean;
    disableFields: boolean;
    presetColors: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
