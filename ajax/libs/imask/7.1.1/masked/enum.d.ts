import MaskedPattern, { type MaskedPatternOptions } from './pattern';
import { AppendFlags } from './base';
export type MaskedEnumOptions = Omit<MaskedPatternOptions, 'mask'> & Pick<MaskedEnum, 'enum'>;
export type MaskedEnumPatternOptions = MaskedPatternOptions & Partial<Pick<MaskedEnum, 'enum'>>;
/** Pattern which validates enum values */
export default class MaskedEnum extends MaskedPattern {
    enum: Array<string>;
    constructor(opts?: MaskedEnumOptions);
    updateOptions(opts: Partial<MaskedEnumOptions>): void;
    _update(opts: Partial<MaskedEnumOptions>): void;
    doValidate(flags: AppendFlags): boolean;
}
//# sourceMappingURL=enum.d.ts.map