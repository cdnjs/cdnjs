import { type FactoryArg, type FactoryOpts, type FactoryReturnMasked } from '../factory';
import type Masked from '../base';
import type MaskedPattern from '../pattern';
import { type TailDetails } from '../../core/tail-details';
import { type ExtractFlags, type AppendFlags, type MaskedState } from '../base';
import ChangeDetails from '../../core/change-details';
import { type Direction } from '../../core/utils';
import type PatternBlock from './block';
export type PatternInputDefinitionOptions<Opts extends FactoryOpts> = Omit<Opts, 'parent' | 'isOptional' | 'lazy' | 'eager' | 'placeholderChar' | 'displayChar'> & Partial<Pick<PatternInputDefinition, 'parent' | 'isOptional' | 'lazy' | 'eager' | 'placeholderChar' | 'displayChar'>>;
export type PatternInputDefinitionState<Opts extends FactoryArg> = MaskedState & {
    masked: FactoryReturnMasked<Opts>['state'];
    isFilled: boolean;
};
export default class PatternInputDefinition<Opts extends FactoryOpts = any> implements PatternBlock<PatternInputDefinitionState<Opts>> {
    static DEFAULT_DEFINITIONS: {
        [k: string]: RegExp;
    };
    /** */
    readonly masked: FactoryReturnMasked<Opts>;
    /** */
    parent: Masked;
    /** */
    isOptional: boolean;
    /** */
    isFilled: boolean;
    /** */
    lazy: MaskedPattern['lazy'];
    /** */
    eager: MaskedPattern['eager'];
    /** */
    placeholderChar: MaskedPattern['placeholderChar'];
    /** */
    displayChar: MaskedPattern['displayChar'];
    constructor(opts: PatternInputDefinitionOptions<Opts>);
    reset(): void;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    get value(): string;
    get unmaskedValue(): string;
    get rawInputValue(): string;
    get displayValue(): string;
    get isComplete(): boolean;
    _appendChar(ch: string, flags?: AppendFlags<PatternInputDefinitionState<Opts>>): ChangeDetails;
    append(str: string, flags?: AppendFlags<PatternInputDefinitionState<Opts>>, tail?: TailDetails): ChangeDetails;
    _appendPlaceholder(): ChangeDetails;
    _appendEager(): ChangeDetails;
    extractTail(fromPos?: number, toPos?: number): TailDetails;
    appendTail(tail: string | TailDetails): ChangeDetails;
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    totalInputPositions(fromPos?: number, toPos?: number): number;
    doValidate(flags: AppendFlags<PatternInputDefinitionState<Opts>>): boolean;
    doCommit(): void;
    get state(): PatternInputDefinitionState<Opts>;
    set state(state: PatternInputDefinitionState<Opts>);
    currentMaskFlags(flags?: AppendFlags<PatternInputDefinitionState<Opts>>): AppendFlags;
}
//# sourceMappingURL=input-definition.d.ts.map