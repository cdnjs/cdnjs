import ChangeDetails from '../core/change-details';
import { type AppendFlags } from './base';
import MaskedPattern, { type MaskedPatternOptions } from './pattern';
type MaskedRangePatternOptions = MaskedPatternOptions & Pick<MaskedRange, 'from' | 'to' | 'autofix'> & Partial<Pick<MaskedRange, 'maxLength'>>;
export type MaskedRangeOptions = Omit<MaskedRangePatternOptions, 'mask'>;
/** Pattern which accepts ranges */
export default class MaskedRange extends MaskedPattern {
    /**
      Optionally sets max length of pattern.
      Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
    */
    maxLength: number;
    /** Min bound */
    from: number;
    /** Max bound */
    to: number;
    /** */
    autofix?: boolean | 'pad';
    get _matchFrom(): number;
    constructor(opts?: MaskedRangeOptions);
    updateOptions(opts: Partial<MaskedRangeOptions>): void;
    _update(opts: Partial<MaskedRangeOptions>): void;
    get isComplete(): boolean;
    boundaries(str: string): [string, string];
    doPrepareChar(ch: string, flags?: AppendFlags): [string, ChangeDetails];
    doValidate(flags: AppendFlags): boolean;
}
export {};
//# sourceMappingURL=range.d.ts.map