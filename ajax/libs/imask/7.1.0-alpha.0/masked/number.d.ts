import { type Direction } from '../core/utils';
import ChangeDetails from '../core/change-details';
import { type TailDetails } from '../core/tail-details';
import Masked, { type MaskedOptions, type ExtractFlags, type AppendFlags } from './base';
export type MaskedNumberOptions = MaskedOptions<MaskedNumber, 'radix' | 'thousandsSeparator' | 'mapToRadix' | 'scale' | 'min' | 'max' | 'normalizeZeros' | 'padFractionalZeros'>;
/**
  Number mask
*/
export default class MaskedNumber extends Masked<number> {
    static UNMASKED_RADIX: string;
    static EMPTY_VALUES: Array<null | undefined | string | number>;
    static DEFAULTS: Partial<MaskedNumberOptions>;
    mask: NumberConstructor;
    /** Single char */
    radix: string;
    /** Single char */
    thousandsSeparator: string;
    /** Array of single chars */
    mapToRadix: Array<string>;
    /** */
    min: number;
    /** */
    max: number;
    /** Digits after point */
    scale: number;
    /** Flag to remove leading and trailing zeros in the end of editing */
    normalizeZeros: boolean;
    /** Flag to pad trailing zeros after point in the end of editing */
    padFractionalZeros: boolean;
    /** Enable characters overwriting */
    overwrite?: boolean | 'shift' | undefined;
    /** */
    eager?: boolean | 'remove' | 'append' | undefined;
    /** */
    skipInvalid?: boolean | undefined;
    /** Format typed value to string */
    format: (value: number, masked: Masked) => string;
    /** Parse string to get typed value */
    parse: (str: string, masked: Masked) => number;
    _numberRegExp: RegExp;
    _thousandsSeparatorRegExp: RegExp;
    _mapToRadixRegExp: RegExp;
    _separatorsProcessed: boolean;
    constructor(opts?: MaskedNumberOptions);
    updateOptions(opts: Partial<MaskedNumberOptions>): void;
    _update(opts: Partial<MaskedNumberOptions>): void;
    _updateRegExps(): void;
    _removeThousandsSeparators(value: string): string;
    _insertThousandsSeparators(value: string): string;
    doPrepareChar(ch: string, flags?: AppendFlags): [string, ChangeDetails];
    _separatorsCount(to: number, extendOnSeparators?: boolean): number;
    _separatorsCountFromSlice(slice?: string): number;
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    _appendCharRaw(ch: string, flags?: AppendFlags): ChangeDetails;
    _findSeparatorAround(pos: number): number;
    _adjustRangeWithSeparators(from: number, to: number): [number, number];
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    doValidate(flags: AppendFlags): boolean;
    doCommit(): void;
    _normalizeZeros(value: string): string;
    _padFractionalZeros(value: string): string;
    doSkipInvalid(ch: string, flags?: AppendFlags, checkTail?: TailDetails): boolean;
    get unmaskedValue(): string;
    set unmaskedValue(unmaskedValue: string);
    get typedValue(): number;
    set typedValue(n: number);
    /** Parsed Number */
    get number(): number;
    set number(number: number);
    /**
      Is negative allowed
    */
    get allowNegative(): boolean;
    /**
      Is positive allowed
    */
    get allowPositive(): boolean;
    typedValueEquals(value: any): boolean;
}
//# sourceMappingURL=number.d.ts.map