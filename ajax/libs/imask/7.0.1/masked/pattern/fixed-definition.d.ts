import ChangeDetails from '../../core/change-details';
import { type Direction } from '../../core/utils';
import { type TailDetails } from '../../core/tail-details';
import { type ExtractFlags, type AppendFlags, type MaskedState } from '../base';
import type PatternBlock from './block';
export type PatternFixedDefinitionOptions = Pick<PatternFixedDefinition, 'char' | 'isUnmasking' | 'eager'>;
export default class PatternFixedDefinition implements PatternBlock {
    /** */
    _value: string;
    /** */
    char: string;
    /** */
    isUnmasking?: boolean;
    /** */
    eager: boolean | 'remove' | 'append' | undefined;
    /** */
    _isRawInput?: boolean;
    /** */
    isFixed: boolean;
    constructor(opts: PatternFixedDefinitionOptions);
    get value(): string;
    get unmaskedValue(): string;
    get rawInputValue(): string;
    get displayValue(): string;
    reset(): void;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    nearestInputPos(cursorPos: number, direction?: Direction): number;
    totalInputPositions(fromPos?: number, toPos?: number): number;
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    get isComplete(): boolean;
    get isFilled(): boolean;
    _appendChar(ch: string, flags?: AppendFlags): ChangeDetails;
    _appendEager(): ChangeDetails;
    _appendPlaceholder(): ChangeDetails;
    extractTail(): TailDetails;
    appendTail(tail: string | String | TailDetails): ChangeDetails;
    append(str: string, flags?: AppendFlags, tail?: TailDetails): ChangeDetails;
    doCommit(): void;
    get state(): MaskedState;
    set state(state: MaskedState);
}
//# sourceMappingURL=fixed-definition.d.ts.map