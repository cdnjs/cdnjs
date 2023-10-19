type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, unknown>;
interface ArgumentArray extends Array<Argument> {
}
interface ReadonlyArgumentArray extends ReadonlyArray<Argument> {
}
type Argument = Value | Mapping | ArgumentArray | ReadonlyArgumentArray;
export declare function classNames(...args: ArgumentArray): string;
type PropsMapping = {
    class?: Argument;
    className?: Argument;
} & Mapping;
export declare function extractClass(props: PropsMapping, ...args: ArgumentArray): {
    class: string;
} | undefined;
export {};
