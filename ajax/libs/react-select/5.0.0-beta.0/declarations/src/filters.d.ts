import { OptionBase } from './types';
export interface FilterOptionOption<Option extends OptionBase> {
    readonly label: string;
    readonly value: string;
    readonly data: Option;
}
interface Config<Option extends OptionBase> {
    readonly ignoreCase?: boolean;
    readonly ignoreAccents?: boolean;
    readonly stringify?: (option: FilterOptionOption<Option>) => string;
    readonly trim?: boolean;
    readonly matchFrom?: 'any' | 'start';
}
export declare const createFilter: <Option extends OptionBase>(config?: Config<Option> | undefined) => (option: FilterOptionOption<Option>, rawInput: string) => boolean;
export {};
