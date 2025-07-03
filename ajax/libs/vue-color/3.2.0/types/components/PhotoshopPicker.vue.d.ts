import tinycolor from 'tinycolor2';
type Props = {
    /**
     * Title text displayed at the top of the Photoshop color picker.
     * Defaults to "Color picker".
     */
    title?: string;
    /**
     * Whether to disable all manual color input fields (HSV, RGB, HEX).
     * When true, only the visual sliders are interactive.
     */
    disableFields?: boolean;
    /**
     * Whether to display a "Reset" button below the input fields.
     */
    hasResetButton?: boolean;
    /**
     * Label text for the "OK" button. Used to confirm color selection.
     */
    okLabel?: string;
    /**
     * Label text for the "Cancel" button. Used to revert color selection.
     */
    cancelLabel?: string;
    /**
     * Label text for the "Reset" button. Used to reset to the original color.
     */
    resetLabel?: string;
    /**
     * Label text displayed above the "new color" swatch preview.
     */
    newLabel?: string;
    /**
     * Label text displayed above the "current color" swatch preview.
     */
    currentLabel?: string;
    /**
     * The currently active color shown in the "current" swatch.
     * Clicking it will revert the selected color to this value.
     * Accepts any valid TinyColor-compatible color string (e.g., "#fff", "rgb(0,0,0)", etc.).
     */
    currentColor?: string;
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
    title: string;
    disableFields: boolean;
    currentColor: string;
    hasResetButton: boolean;
    okLabel: string;
    cancelLabel: string;
    resetLabel: string;
    newLabel: string;
    currentLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
