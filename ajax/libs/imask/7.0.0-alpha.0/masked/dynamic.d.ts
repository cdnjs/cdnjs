import ChangeDetails from '../core/change-details';
import { type FactoryArg } from './factory';
import Masked, { type AppendFlags, type MaskedState, type MaskedOptions, type ExtractFlags } from './base';
import { type Direction } from '../core/utils';
import { type TailDetails } from '../core/tail-details';
export type MaskedDynamicState = MaskedState & {
    _rawInputValue: string;
    compiledMasks: Array<MaskedState>;
    currentMaskRef?: Masked;
    currentMask: MaskedState;
};
export type DynamicMaskType = Array<FactoryArg> | ArrayConstructor;
export type MaskedDynamicOptions = MaskedOptions<MaskedDynamic, 'dispatch'>;
/** Dynamic mask for choosing appropriate mask in run-time */
export default class MaskedDynamic<Value = any> extends Masked<Value> {
    static DEFAULTS: Partial<MaskedDynamicOptions>;
    mask: DynamicMaskType;
    /** Currently chosen mask */
    currentMask?: Masked;
    /** Compliled {@link Masked} options */
    compiledMasks: Array<Masked>;
    /** Chooses {@link Masked} depending on input value */
    dispatch: (appended: string, masked: MaskedDynamic, flags: AppendFlags<MaskedDynamicState>, tail: string | String | TailDetails) => Masked;
    constructor(opts?: MaskedDynamicOptions);
    updateOptions(opts: Partial<MaskedDynamicOptions>): void;
    _update(opts: Partial<MaskedDynamicOptions>): void;
    _appendCharRaw(ch: string, flags?: AppendFlags<MaskedDynamicState>): ChangeDetails;
    _applyDispatch(appended?: string, flags?: AppendFlags<MaskedDynamicState>, tail?: string | String | TailDetails): ChangeDetails;
    _appendPlaceholder(): ChangeDetails;
    _appendEager(): ChangeDetails;
    appendTail(tail: string | String | TailDetails): ChangeDetails;
    currentMaskFlags(flags: AppendFlags<MaskedDynamicState>): AppendFlags;
    doDispatch(appended: string, flags?: AppendFlags<MaskedDynamicState>, tail?: string | String | TailDetails): Masked | undefined;
    doValidate(flags: AppendFlags<MaskedDynamicState>): boolean;
    doPrepare(str: string, flags?: AppendFlags<MaskedDynamicState>): [string, ChangeDetails];
    doPrepareChar(str: string, flags?: AppendFlags<MaskedDynamicState>): [string, ChangeDetails];
    reset(): void;
    get value(): string;
    set value(value: string);
    get unmaskedValue(): string;
    set unmaskedValue(unmaskedValue: string);
    get typedValue(): Value;
    set typedValue(value: Value);
    get displayValue(): string;
    get isComplete(): boolean;
    get isFilled(): boolean;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    get state(): MaskedDynamicState;
    set state(state: MaskedDynamicState);
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    extractTail(fromPos?: number, toPos?: number): TailDetails;
    doCommit(): void;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    get overwrite(): boolean | 'shift' | undefined;
    set overwrite(overwrite: boolean | 'shift');
    get eager(): boolean | 'remove' | 'append' | undefined;
    set eager(eager: boolean | 'remove' | 'append');
    get skipInvalid(): boolean | undefined;
    set skipInvalid(skipInvalid: boolean | undefined);
    maskEquals(mask: any): boolean;
    typedValueEquals(value: any): boolean;
}
//# sourceMappingURL=dynamic.d.ts.map