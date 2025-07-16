type Props = {
    direction?: 'horizontal' | 'vertical';
    modelValue?: number;
    value?: number;
    max?: number;
    step?: number;
    ariaLabel?: string;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    background?: (props: typeof __VLS_1) => any;
} & {
    picker?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    input: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: number;
    value: number;
    direction: "horizontal" | "vertical";
    max: number;
    ariaLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
