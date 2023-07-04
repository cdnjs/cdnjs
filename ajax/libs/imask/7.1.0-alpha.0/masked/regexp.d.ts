import Masked, { type MaskedOptions } from './base';
export type MaskedRegExpOptions = MaskedOptions<MaskedRegExp>;
/** Masking by RegExp */
export default class MaskedRegExp extends Masked<string> {
    /** */
    mask: RegExp;
    /** Enable characters overwriting */
    overwrite?: boolean | 'shift' | undefined;
    /** */
    eager?: boolean | 'remove' | 'append' | undefined;
    /** */
    skipInvalid?: boolean | undefined;
    updateOptions(opts: Partial<MaskedRegExpOptions>): void;
    _update(opts: Partial<MaskedRegExpOptions>): void;
}
//# sourceMappingURL=regexp.d.ts.map