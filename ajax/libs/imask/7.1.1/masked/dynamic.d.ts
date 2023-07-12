import ChangeDetails from '../core/change-details';
import { type ExtendFactoryArgOptions } from './factory';
import Masked, { type AppendFlags, type MaskedState, type MaskedOptions, type ExtractFlags } from './base';
import { type Direction } from '../core/utils';
import { type TailDetails } from '../core/tail-details';
type MaskedDynamicNoRefState = MaskedState & {
    compiledMasks: Array<MaskedState>;
};
type MaskedDynamicRefState = MaskedDynamicNoRefState & {
    currentMaskRef: Masked;
    currentMask: MaskedState;
};
export type MaskedDynamicState = MaskedDynamicNoRefState | MaskedDynamicRefState;
export type DynamicMaskType = Array<ExtendFactoryArgOptions<{
    expose?: boolean;
}>> | ArrayConstructor;
export type MaskedDynamicOptions = MaskedOptions<MaskedDynamic, 'dispatch'>;
type HandleState = MaskedDynamicState | MaskedState;
/** Dynamic mask for choosing appropriate mask in run-time */
export default class MaskedDynamic<Value = any> extends Masked<Value> {
    static DEFAULTS: Partial<MaskedDynamicOptions>;
    mask: DynamicMaskType;
    /** Currently chosen mask */
    currentMask?: Masked;
    /** Currently chosen mask */
    exposeMask?: Masked;
    /** Compliled {@link Masked} options */
    compiledMasks: Array<Masked>;
    /** Chooses {@link Masked} depending on input value */
    dispatch: (appended: string, masked: MaskedDynamic, flags: AppendFlags<HandleState>, tail: string | String | TailDetails) => (Masked | undefined);
    _overwrite?: this['overwrite'];
    _eager?: this['eager'];
    _skipInvalid?: this['skipInvalid'];
    constructor(opts?: MaskedDynamicOptions);
    updateOptions(opts: Partial<MaskedDynamicOptions>): void;
    _update(opts: Partial<MaskedDynamicOptions>): void;
    _appendCharRaw(ch: string, flags?: AppendFlags<HandleState>): ChangeDetails;
    _applyDispatch(appended?: string, flags?: AppendFlags<HandleState>, tail?: string | String | TailDetails): ChangeDetails;
    _appendPlaceholder(): ChangeDetails;
    _appendEager(): ChangeDetails;
    appendTail(tail: string | String | TailDetails): ChangeDetails;
    currentMaskFlags(flags: AppendFlags<HandleState>): AppendFlags;
    doDispatch(appended: string, flags?: AppendFlags<HandleState>, tail?: string | String | TailDetails): Masked | undefined;
    doValidate(flags: AppendFlags<HandleState>): boolean;
    doPrepare(str: string, flags?: AppendFlags<HandleState>): [string, ChangeDetails];
    doPrepareChar(str: string, flags?: AppendFlags<HandleState>): [string, ChangeDetails];
    reset(): void;
    get value(): string;
    set value(value: string);
    get unmaskedValue(): string;
    set unmaskedValue(unmaskedValue: string);
    get typedValue(): Value;
    set typedValue(typedValue: Value);
    get displayValue(): string;
    get isComplete(): boolean;
    get isFilled(): boolean;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    get state(): MaskedDynamicState;
    set state(state: HandleState);
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    extractTail(fromPos?: number, toPos?: number): TailDetails;
    doCommit(): void;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    get overwrite(): boolean | 'shift' | undefined;
    set overwrite(overwrite: boolean | 'shift' | undefined);
    get eager(): boolean | 'remove' | 'append' | undefined;
    set eager(eager: boolean | 'remove' | 'append' | undefined);
    get skipInvalid(): boolean | undefined;
    set skipInvalid(skipInvalid: boolean | undefined);
    maskEquals(mask: any): boolean;
    typedValueEquals(value: any): boolean;
}
export {};
//# sourceMappingURL=dynamic.d.ts.map