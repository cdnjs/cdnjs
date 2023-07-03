import Masked, { type MaskedOptions } from './base';
export type MaskedRegExpOptions = MaskedOptions<MaskedRegExp>;
/** Masking by RegExp */
export default class MaskedRegExp extends Masked<string> {
    mask: RegExp;
    updateOptions(opts: Partial<MaskedRegExpOptions>): void;
    _update(opts: Partial<MaskedRegExpOptions>): void;
}
//# sourceMappingURL=regexp.d.ts.map