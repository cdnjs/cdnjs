import { type useTinyColorModelProps } from '../composable/vmodel.ts';
type Props = {
    title?: string;
    disableFields?: boolean;
    hasResetButton?: boolean;
    okLabel?: string;
    cancelLabel?: string;
    resetLabel?: string;
    newLabel?: string;
    currentLabel?: string;
    currentColor?: string;
};
type __VLS_Props = Props & useTinyColorModelProps;
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    title: string;
    disableFields: boolean;
    hasResetButton: boolean;
    okLabel: string;
    cancelLabel: string;
    resetLabel: string;
    newLabel: string;
    currentLabel: string;
    currentColor: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
