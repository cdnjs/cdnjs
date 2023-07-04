import { type FactoryArg, type FactoryReturnMasked } from './factory';
/** Mask pipe source and destination types */
export declare const PIPE_TYPE: {
    readonly MASKED: "value";
    readonly UNMASKED: "unmaskedValue";
    readonly TYPED: "typedValue";
};
type ValueOf<T> = T[keyof T];
type TypedValueOf<Opts extends FactoryArg, Type extends ValueOf<typeof PIPE_TYPE>> = Type extends (typeof PIPE_TYPE.MASKED | typeof PIPE_TYPE.UNMASKED) ? string : FactoryReturnMasked<Opts>['typedValue'];
/** Creates new pipe function depending on mask type, source and destination options */
export declare function createPipe<Arg extends FactoryArg, From extends ValueOf<typeof PIPE_TYPE> = typeof PIPE_TYPE.MASKED, To extends ValueOf<typeof PIPE_TYPE> = typeof PIPE_TYPE.MASKED>(arg: Arg, from?: From, to?: To): (value: TypedValueOf<Arg, From>) => TypedValueOf<Arg, To>;
/** Pipes value through mask depending on mask type, source and destination options */
export declare function pipe<Arg extends FactoryArg, From extends ValueOf<typeof PIPE_TYPE> = typeof PIPE_TYPE.MASKED, To extends ValueOf<typeof PIPE_TYPE> = typeof PIPE_TYPE.MASKED>(value: TypedValueOf<Arg, From>, mask: Arg, from?: From, to?: To): TypedValueOf<Arg, To>;
export {};
//# sourceMappingURL=pipe.d.ts.map