import tinycolor from 'tinycolor2';
type Props = {
    /** Use this hue value to render background first.
     * Second priority is the hue value from `v-model` or `v-model:tineColor`.
     * */
    hue?: number;
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
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
