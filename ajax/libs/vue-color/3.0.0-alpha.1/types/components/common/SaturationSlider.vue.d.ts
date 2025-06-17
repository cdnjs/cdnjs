import { type useTinyColorModelProps } from '../../composable/vmodel.ts';
type Props = {
    /** Use this hue value to render background first.
     * Second priority is the hue value from `v-model` or `v-model:tineColor`.
     * */
    hue?: number;
};
type __VLS_Props = Props & useTinyColorModelProps;
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {
    container: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
