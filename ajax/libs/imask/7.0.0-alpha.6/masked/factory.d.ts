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
    mask: infer M;
} ? M : never;
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
} ? MaskedDynamic : Masked;
export type FactoryOpts = FactoryConstructorOpts | FactoryInstanceOpts | FactoryStaticOpts;
export type FactoryArg = Masked | FactoryOpts;
export type FactoryReturnMasked<Opts extends FactoryArg> = Opts extends Masked ? Opts : Opts extends FactoryConstructorOpts ? FactoryConstructorReturnMasked<Opts> : Opts extends FactoryInstanceOpts ? FactoryInstanceReturnMasked<Opts> : Opts extends FactoryStaticOpts ? FactoryStaticReturnMasked<Opts> : never;
/** Get Masked class by mask type */
export declare function maskedClass(mask: Masked | FactoryOpts['mask']): any;
type MaskedClassOf<M extends Masked> = M extends MaskedDate ? typeof MaskedDate : M extends MaskedNumber ? typeof MaskedNumber : M extends MaskedEnum ? typeof MaskedEnum : M extends MaskedRange ? typeof MaskedRange : M extends MaskedRegExp ? typeof MaskedRegExp : M extends MaskedFunction ? typeof MaskedFunction : M extends MaskedPattern ? typeof MaskedPattern : M extends MaskedDynamic ? typeof MaskedDynamic : any;
type NormalizedMaskedOpts<Opts extends Masked> = Omit<Opts, 'mask'> & {
    _mask: Opts;
    mask: MaskedClassOf<Opts>;
};
type NormalizedInstanceOpts<Opts extends FactoryInstanceOpts> = Omit<Opts['mask'], `_${string}` | 'mask'> & NormalizedMaskedOpts<Opts['mask']>;
export type NormalizedOpts<Opts extends FactoryArg> = Opts extends Masked ? NormalizedMaskedOpts<Opts> : Opts extends FactoryInstanceOpts ? NormalizedInstanceOpts<Opts> : Opts extends FactoryStaticOpts | FactoryConstructorOpts ? Opts : {
    mask: Opts;
};
export declare function normalizeOpts<Opts extends FactoryArg>(opts: Opts): NormalizedOpts<Opts>;
/** Creates new {@link Masked} depending on mask type */
export default function createMask<Opts extends FactoryArg>(opts: Opts): FactoryReturnMasked<Opts>;
export {};
//# sourceMappingURL=factory.d.ts.map