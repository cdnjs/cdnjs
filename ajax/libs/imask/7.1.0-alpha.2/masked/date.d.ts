import MaskedPattern, { type MaskedPatternOptions } from './pattern';
import { type MaskedRangeOptions } from './range';
import type Masked from './base';
import { type AppendFlags } from './base';
export type DateMaskType = DateConstructor;
type DateOptionsKeys = 'pattern' | 'min' | 'max' | 'autofix';
export type DateValue = Date | null;
export type MaskedDateOptions = Omit<MaskedPatternOptions<DateValue>, 'mask'> & Partial<Pick<MaskedDate, DateOptionsKeys>> & {
    mask?: string | DateMaskType;
};
/** Date mask */
export default class MaskedDate extends MaskedPattern<DateValue> {
    static GET_DEFAULT_BLOCKS: () => {
        [k: string]: MaskedRangeOptions;
    };
    static DEFAULTS: Record<string, any>;
    /** Pattern mask for date according to {@link MaskedDate#format} */
    pattern: string;
    /** Start date */
    min?: Date;
    /** End date */
    max?: Date;
    /** */
    autofix?: boolean | 'pad' | undefined;
    /** Format typed value to string */
    format: (value: DateValue, masked: Masked) => string;
    /** Parse string to get typed value */
    parse: (str: string, masked: Masked) => DateValue;
    constructor(opts?: MaskedDateOptions);
    updateOptions(opts: Partial<MaskedDateOptions>): void;
    _update(opts: Partial<MaskedDateOptions>): void;
    doValidate(flags: AppendFlags): boolean;
    /** Checks if date is exists */
    isDateExist(str: string): boolean;
    /** Parsed Date */
    get date(): DateValue;
    set date(date: DateValue);
    get typedValue(): DateValue;
    set typedValue(value: DateValue);
    maskEquals(mask: any): boolean;
}
export {};
//# sourceMappingURL=date.d.ts.map