import Masked, { type MaskedOptions } from './base';
export type MaskedFunctionOptions = MaskedOptions<MaskedFunction>;
/** Masking by custom Function */
export default class MaskedFunction<Value = any> extends Masked<Value> {
    mask: (value: string, masked: this) => boolean;
    updateOptions(opts: Partial<MaskedFunctionOptions>): void;
    _update(opts: Partial<MaskedFunctionOptions>): void;
}
//# sourceMappingURL=function.d.ts.map