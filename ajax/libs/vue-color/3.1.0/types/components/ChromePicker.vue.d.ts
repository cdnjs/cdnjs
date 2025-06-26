import { type useTinyColorModelProps } from '../composable/colorModel.ts';
type Format = 'hex' | 'rgb' | 'hsl';
type Props = {
    disableAlpha?: boolean;
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
};
type __VLS_Props = Props & useTinyColorModelProps;
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    formats: Array<Format>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
