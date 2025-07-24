import tinycolor from 'tinycolor2';
declare const _default: import("vue").DefineComponent<{
    /**
     * Width of the picker container.
     * Can be a number (in pixels) or a string with CSS units (e.g., "100%", "300px").
     * Defaults to 276.
     */
    width?: number | string;
    /**
     * List of preset color swatches to display.
     * Each color should be a valid hex string (e.g., "#FF6900").
     * Defaults to a curated Twitter-style palette.
     */
    presetColors?: string[];
    /**
     * Position of the decorative triangle at the top of the picker.
     * Can be `'top-left'`, `'top-right'`, or `'hide'`.
     * Defaults to `'top-left'`.
     */
    triangle?: "hide" | "top-left" | "top-right";
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
     * Width of the picker container.
     * Can be a number (in pixels) or a string with CSS units (e.g., "100%", "300px").
     * Defaults to 276.
     */
    width?: number | string;
    /**
     * List of preset color swatches to display.
     * Each color should be a valid hex string (e.g., "#FF6900").
     * Defaults to a curated Twitter-style palette.
     */
    presetColors?: string[];
    /**
     * Position of the decorative triangle at the top of the picker.
     * Can be `'top-left'`, `'top-right'`, or `'hide'`.
     * Defaults to `'top-left'`.
     */
    triangle?: "hide" | "top-left" | "top-right";
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
    presetColors: string[];
    width: number | string;
    triangle: "hide" | "top-left" | "top-right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
