import { type FactoryArg } from './factory';
/** Mask pipe source and destination types */
export declare const PIPE_TYPE: {
    readonly MASKED: "value";
    readonly UNMASKED: "unmaskedValue";
    readonly TYPED: "typedValue";
};
type ValueOf<T> = T[keyof T];
/** Creates new pipe function depending on mask type, source and destination options */
export declare function createPipe<Opts extends FactoryArg>(mask: Opts, from?: ValueOf<typeof PIPE_TYPE>, to?: ValueOf<typeof PIPE_TYPE>): (value: any) => any;
/** Pipes value through mask depending on mask type, source and destination options */
export declare function pipe<Opts extends FactoryArg>(value: any, mask: Opts, from?: ValueOf<typeof PIPE_TYPE>, to?: ValueOf<typeof PIPE_TYPE>): any;
export {};
//# sourceMappingURL=pipe.d.ts.map