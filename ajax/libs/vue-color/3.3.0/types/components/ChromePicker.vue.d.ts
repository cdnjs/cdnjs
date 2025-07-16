import tinycolor from 'tinycolor2';
type Format = 'hex' | 'rgb' | 'hsl';
type Props = {
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
     * An array of color format options used to control the display of the format field.
     *
     * Determines both the **order** in which the format options appear and whether a format is **included or hidden**.
     * Only supports `'hex'`, `'hsl'`, and `'rgb'`. Duplicate or invalid values will be ignored at runtime.
     *
     * @default ['rgb', 'hex', 'hsl']
     */
    formats?: Array<Format>;
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
};
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    formats: Array<Format>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
