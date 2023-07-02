import type Masked from './base';
import { type MaskedOptions } from './base';
import type MaskedRegExp from './regexp';
import type MaskedPattern from './pattern';
import type MaskedFunction from './function';
import type MaskedDate from './date';
import type MaskedNumber from './number';
import type MaskedDynamic from './dynamic';
import type MaskedRange from './range';
import type MaskedEnum from './enum';
import { type MaskedEnumOptions } from './enum';
import { type MaskedRangeOptions } from './range';
import { type MaskedDynamicOptions } from './dynamic';
import { type MaskedPatternOptions } from './pattern';
import { type MaskedNumberOptions } from './number';
import { type MaskedRegExpOptions } from './regexp';
import { type MaskedFunctionOptions } from './function';
import { type MaskedDateOptions } from './date';
type MaskedDateFactoryOptions = Omit<MaskedDateOptions, 'mask'> & {
    mask: DateConstructor;
};
export type FactoryStaticOpts = MaskedDateFactoryOptions | MaskedNumberOptions | MaskedPatternOptions | MaskedDynamicOptions | MaskedRegExpOptions | MaskedFunctionOptions;
export type AllFactoryStaticOpts = MaskedDateFactoryOptions & MaskedNumberOptions & MaskedPatternOptions & MaskedDynamicOptions & MaskedRegExpOptions & MaskedFunctionOptions & MaskedEnumOptions & MaskedRangeOptions;
export type FactoryStaticReturnMasked<Opts extends FactoryStaticOpts> = Opts extends MaskedDateFactoryOptions ? MaskedDate : Opts extends MaskedNumberOptions ? MaskedNumber : Opts extends MaskedEnumOptions ? MaskedEnum : Opts extends MaskedRangeOptions ? MaskedRange : Opts extends MaskedPatternOptions ? MaskedPattern : Opts extends MaskedDynamicOptions ? MaskedDynamic : Opts extends MaskedRegExpOptions ? MaskedRegExp : Opts extends MaskedFunctionOptions ? MaskedFunction : never;
export type FactoryInstanceOpts = MaskedOptions & {
    mask: Masked;
};
export type FactoryInstanceReturnMasked<Opts extends FactoryInstanceOpts> = Opts extends {
    mask: infer Masked;
} ? Masked : never;
export type DeduceMaskedFromOpts<Opts extends FactoryStaticOpts> = Opts extends MaskedPatternOptions ? MaskedPattern : Opts extends MaskedDateFactoryOptions ? MaskedDate : Opts extends MaskedNumberOptions ? MaskedNumber : Opts extends MaskedRegExpOptions ? MaskedRegExp : Opts extends MaskedFunctionOptions ? MaskedFunction : Opts extends MaskedDynamicOptions ? MaskedDynamic : Opts extends FactoryInstanceOpts ? FactoryInstanceReturnMasked<Opts> : never;
export type FactoryConstructorOpts = MaskedOptions & {
    mask: typeof Masked | typeof MaskedDate | typeof MaskedNumber | typeof MaskedEnum | typeof MaskedRange | typeof MaskedRegExp | typeof MaskedFunction | typeof MaskedPattern | typeof MaskedDynamic | typeof MaskedRegExp;
};
export type FactoryConstructorReturnMasked<Opts extends FactoryConstructorOpts> = Opts extends {
    mask: typeof MaskedDate;
} ? MaskedDate : Opts extends {
    mask: typeof MaskedNumber;
} ? MaskedNumber : Opts extends {
    mask: typeof MaskedEnum;
} ? MaskedEnum : Opts extends {
    mask: typeof MaskedRange;
} ? MaskedRange : Opts extends {
    mask: typeof MaskedRegExp;
} ? MaskedRegExp : Opts extends {
    mask: typeof MaskedFunction;
} ? MaskedFunction : Opts extends {
    mask: typeof MaskedPattern;
} ? MaskedPattern : Opts extends {
    mask: typeof MaskedDynamic;
} ? MaskedDynamic : Opts extends {
    mask: typeof MaskedRegExp;
} ? MaskedRegExp : Masked;
export type FactoryOpts = FactoryConstructorOpts | FactoryInstanceOpts | FactoryStaticOpts;
export type FactoryArg = Masked | FactoryOpts;
export type FactoryReturnMasked<Opts extends FactoryArg> = Opts extends Masked ? Opts : Opts extends FactoryConstructorOpts ? FactoryConstructorReturnMasked<Opts> : Opts extends FactoryInstanceOpts ? FactoryInstanceReturnMasked<Opts> : Opts extends FactoryStaticOpts ? FactoryStaticReturnMasked<Opts> : never;
/** Get Masked class by mask type */
export declare function maskedClass(mask: any): any;
export type NormalizedOpts = FactoryOpts & {
    _mask?: FactoryStaticOpts['mask'];
};
export declare function normalizeOpts<Opts extends FactoryArg>(opts: Opts): NormalizedOpts;
/** Creates new {@link Masked} depending on mask type */
export default function createMask<Opts extends FactoryArg>(opts: Opts): FactoryReturnMasked<Opts>;
export {};
//# sourceMappingURL=factory.d.ts.map