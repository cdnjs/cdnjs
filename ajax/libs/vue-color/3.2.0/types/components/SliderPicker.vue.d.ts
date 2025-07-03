import tinycolor from 'tinycolor2';
declare const _default: import("vue").DefineComponent<{
    /**
     * A list of swatches (color stops) to show below the slider.
     * Each swatch can be an object `{ s: number, l: number }` representing
     * saturation and lightness in HSL, or a string like '.8' which will be parsed as `l`.
     * Defaults to five swatches from light to dark.
     */
    swatches?: ({
        s: number;
        l: number;
    } | string)[];
    /**
     * Whether to display the alpha (transparency) slider.
     * When false, the alpha slider is hidden and alpha is ignored.
     */
    alpha?: boolean;
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
     * A list of swatches (color stops) to show below the slider.
     * Each swatch can be an object `{ s: number, l: number }` representing
     * saturation and lightness in HSL, or a string like '.8' which will be parsed as `l`.
     * Defaults to five swatches from light to dark.
     */
    swatches?: ({
        s: number;
        l: number;
    } | string)[];
    /**
     * Whether to display the alpha (transparency) slider.
     * When false, the alpha slider is hidden and alpha is ignored.
     */
    alpha?: boolean;
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
    swatches: ({
        s: number;
        l: number;
    } | string)[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
