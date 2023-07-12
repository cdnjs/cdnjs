import ChangeDetails from '../core/change-details';
import { type Direction } from '../core/utils';
import { type TailDetails } from '../core/tail-details';
export type MaskedState = {
    _value: string;
    _rawInputValue: string;
};
/** Append flags */
export type AppendFlags<State = MaskedState> = {
    input?: boolean;
    tail?: boolean;
    raw?: boolean;
    _beforeTailState?: State;
};
/** Extract flags */
export type ExtractFlags = {
    raw?: boolean;
};
export type MaskedOptions<M extends Masked = Masked, Props extends keyof M = never> = Partial<Pick<M, 'mask' | 'parent' | 'prepare' | 'prepareChar' | 'validate' | 'commit' | 'format' | 'parse' | 'overwrite' | 'eager' | 'skipInvalid' | Props>>;
/** Provides common masking stuff */
export default abstract class Masked<Value = any> {
    static DEFAULTS: Record<string, any>;
    static EMPTY_VALUES: Array<any>;
    /** */
    mask: unknown;
    /** */
    parent?: Masked;
    /** Transforms value before mask processing */
    prepare?: (chars: string, masked: Masked, flags: AppendFlags) => string | [string, ChangeDetails];
    /** Transforms each char before mask processing */
    prepareChar?: (chars: string, masked: Masked, flags: AppendFlags) => string | [string, ChangeDetails];
    /** Validates if value is acceptable */
    validate?: (value: string, masked: Masked, flags: AppendFlags) => boolean;
    /** Does additional processing at the end of editing */
    commit?: (value: string, masked: Masked) => void;
    /** Format typed value to string */
    format?: (value: Value, masked: Masked) => string;
    /** Parse string to get typed value */
    parse?: (str: string, masked: Masked) => Value;
    /** Enable characters overwriting */
    abstract overwrite?: boolean | 'shift' | undefined;
    /** */
    abstract eager?: boolean | 'remove' | 'append' | undefined;
    /** */
    abstract skipInvalid?: boolean | undefined;
    /** */
    _initialized: boolean;
    _value: string;
    _refreshing?: boolean;
    _isolated?: boolean;
    constructor(opts: MaskedOptions);
    /** Sets and applies new options */
    updateOptions(opts: Partial<MaskedOptions>): void;
    /** Sets new options */
    _update(opts: Partial<MaskedOptions>): void;
    /** Mask state */
    get state(): MaskedState;
    set state(state: MaskedState);
    /** Resets value */
    reset(): void;
    get value(): string;
    set value(value: string);
    /** Resolve new value */
    resolve(value: string, flags?: AppendFlags): void;
    get unmaskedValue(): string;
    set unmaskedValue(value: string);
    get typedValue(): Value;
    set typedValue(value: Value);
    /** Value that includes raw user input */
    get rawInputValue(): string;
    set rawInputValue(value: string);
    get displayValue(): string;
    get isComplete(): boolean;
    get isFilled(): boolean;
    /** Finds nearest input position in direction */
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    totalInputPositions(fromPos?: number, toPos?: number): number;
    /** Extracts value in range considering flags */
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    /** Extracts tail in range */
    extractTail(fromPos?: number, toPos?: number): TailDetails;
    /** Appends tail */
    appendTail(tail: string | String | TailDetails): ChangeDetails;
    /** Appends char */
    _appendCharRaw(ch: string, flags?: AppendFlags): ChangeDetails;
    /** Appends char */
    _appendChar(ch: string, flags?: AppendFlags, checkTail?: TailDetails): ChangeDetails;
    /** Appends optional placeholder at the end */
    _appendPlaceholder(): ChangeDetails;
    /** Appends optional eager placeholder at the end */
    _appendEager(): ChangeDetails;
    /** Appends symbols considering flags */
    append(str: string, flags?: AppendFlags, tail?: string | String | TailDetails): ChangeDetails;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    /** Calls function and reapplies current value */
    withValueRefresh<T>(fn: () => T): T;
    runIsolated<T>(fn: (masked: this) => T): T;
    doSkipInvalid(ch: string, flags?: AppendFlags, checkTail?: TailDetails): boolean;
    /** Prepares string before mask processing */
    doPrepare(str: string, flags?: AppendFlags): [string, ChangeDetails];
    /** Prepares each char before mask processing */
    doPrepareChar(str: string, flags?: AppendFlags): [string, ChangeDetails];
    /** Validates if value is acceptable */
    doValidate(flags: AppendFlags): boolean;
    /** Does additional processing at the end of editing */
    doCommit(): void;
    splice(start: number, deleteCount: number, inserted: string, removeDirection?: Direction, flags?: AppendFlags): ChangeDetails;
    maskEquals(mask: any): boolean;
    typedValueEquals(value: any): boolean;
}
//# sourceMappingURL=base.d.ts.map