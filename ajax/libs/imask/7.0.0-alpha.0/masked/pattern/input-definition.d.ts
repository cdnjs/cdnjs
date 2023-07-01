import { type NormalizedOpts } from '../factory';
import type Masked from '../base';
import type MaskedPattern from '../pattern';
import { type TailDetails } from '../../core/tail-details';
import { type ExtractFlags, type AppendFlags } from '../base';
import ChangeDetails from '../../core/change-details';
import { type Direction } from '../../core/utils';
import type PatternBlock from './block';
export type PatternInputDefinitionOptions = NormalizedOpts & Partial<Pick<PatternInputDefinition, 'parent' | 'isOptional' | 'lazy' | 'eager' | 'placeholderChar' | 'displayChar'>>;
export type PatternInputDefinitionState = {
    masked: Masked['state'];
    isFilled: boolean;
};
export default class PatternInputDefinition implements PatternBlock {
    static DEFAULT_DEFINITIONS: {
        [k: string]: RegExp;
    };
    /** */
    readonly masked: Masked;
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
    constructor(opts: PatternInputDefinitionOptions);
    reset(): void;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    get value(): string;
    get unmaskedValue(): string;
    get displayValue(): string;
    get isComplete(): boolean;
    _appendChar(ch: string, flags?: AppendFlags): ChangeDetails;
    append(str: string, flags?: AppendFlags, tail?: TailDetails): ChangeDetails;
    _appendPlaceholder(): ChangeDetails;
    _appendEager(): ChangeDetails;
    extractTail(fromPos?: number, toPos?: number): TailDetails;
    appendTail(tail: string | TailDetails): ChangeDetails;
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    totalInputPositions(fromPos?: number, toPos?: number): number;
    doValidate(flags: AppendFlags): boolean;
    doCommit(): void;
    get state(): PatternInputDefinitionState;
    set state(state: PatternInputDefinitionState);
}
//# sourceMappingURL=input-definition.d.ts.map