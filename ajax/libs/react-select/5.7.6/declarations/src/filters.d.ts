export interface FilterOptionOption<Option> {
    readonly label: string;
    readonly value: string;
    readonly data: Option;
}
interface Config<Option> {
    readonly ignoreCase?: boolean;
    readonly ignoreAccents?: boolean;
    readonly stringify?: (option: FilterOptionOption<Option>) => string;
    readonly trim?: boolean;
    readonly matchFrom?: 'any' | 'start';
}
export declare const createFilter: <Option>(config?: Config<Option> | undefined) => (option: FilterOptionOption<Option>, rawInput: string) => boolean;
export {};
