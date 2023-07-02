import type ChangeDetails from '../../core/change-details';
import { type TailDetails } from '../../core/tail-details';
import { type ExtractFlags, type AppendFlags } from '../base';
import { type Direction } from '../../core/utils';
/**
  Subset of {@link Masked} attributes used with pattern
  @interface
*/
export default interface PatternBlock {
    readonly value: string;
    readonly unmaskedValue: string;
    readonly displayValue: string;
    readonly isComplete: boolean;
    readonly lazy?: boolean;
    readonly eager?: boolean | 'remove' | 'append';
    readonly isFilled: boolean;
    readonly isOptional?: boolean;
    readonly isFixed?: boolean;
    state: any;
    reset(): void;
    remove(fromPos?: number, toPos?: number): ChangeDetails;
    extractInput(fromPos?: number, toPos?: number, flags?: ExtractFlags): string;
    extractTail(fromPos?: number, toPos?: number): TailDetails;
    append(str: string, flags?: AppendFlags, tail?: TailDetails): ChangeDetails;
    appendTail(tail: string | TailDetails): ChangeDetails;
    _appendChar(str: string, flags: AppendFlags): ChangeDetails;
    _appendPlaceholder(toBlockIndex?: number): ChangeDetails;
    _appendEager(): ChangeDetails;
    doCommit(): void;
    nearestInputPos(cursorPos: number, direction: Direction): number;
    totalInputPositions(fromPos?: number, toPos?: number): number;
}
//# sourceMappingURL=block.d.ts.map