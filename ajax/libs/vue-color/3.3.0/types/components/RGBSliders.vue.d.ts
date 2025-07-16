import tinycolor from 'tinycolor2';
declare const _default: import("vue").DefineComponent<{
    /**
     * Whether to disable the alpha (transparency) channel in the UI.
     * When set to true, the color picker will not display or allow adjustment of alpha values.
     */
    disableAlpha?: boolean;
    /**
     * Whether to disable all input fields in the UI.
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
     * Whether to disable the alpha (transparency) channel in the UI.
     * When set to true, the color picker will not display or allow adjustment of alpha values.
     */
    disableAlpha?: boolean;
    /**
     * Whether to disable all input fields in the UI.
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
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
