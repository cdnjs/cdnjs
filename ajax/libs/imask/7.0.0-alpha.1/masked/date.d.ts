import MaskedPattern, { type MaskedPatternOptions } from './pattern';
import { type MaskedRangeOptions } from './range';
import { type AppendFlags } from './base';
export type DateMaskType = DateConstructor;
type DateOptionsKeys = 'pattern' | 'min' | 'max' | 'autofix';
export type MaskedDateOptions<Value = Date> = Omit<MaskedPatternOptions<Value>, 'mask'> & Partial<Pick<MaskedDate<Value>, DateOptionsKeys>> & {
    mask?: string | DateMaskType;
};
/** Date mask */
export default class MaskedDate<Value = Date> extends MaskedPattern<Value> {
    static GET_DEFAULT_BLOCKS: () => {
        [k: string]: MaskedRangeOptions;
    };
    static DEFAULTS: Partial<MaskedPatternOptions<any, MaskedDate<any>, DateOptionsKeys>>;
    /** Pattern mask for date according to {@link MaskedDate#format} */
    pattern: string;
    /** Start date */
    min?: Date;
    /** End date */
    max?: Date;
    /** */
    autofix?: boolean | 'pad' | undefined;
    constructor(opts?: MaskedDateOptions<Value>);
    updateOptions(opts: Partial<MaskedDateOptions<Value>>): void;
    _update(opts: Partial<MaskedDateOptions<Value>>): void;
    doValidate(flags: AppendFlags): boolean;
    /** Checks if date is exists */
    isDateExist(str: string): boolean;
    /** Parsed Date */
    get date(): Value | null;
    set date(date: Value);
    get typedValue(): Value | null;
    set typedValue(value: Value);
    maskEquals(mask: any): boolean;
}
export {};
//# sourceMappingURL=date.d.ts.map