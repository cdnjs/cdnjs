type Props = {
    direction?: 'horizontal' | 'vertical';
    hue?: number;
};
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    hue: number;
    direction: "horizontal" | "vertical";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {
    container: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
