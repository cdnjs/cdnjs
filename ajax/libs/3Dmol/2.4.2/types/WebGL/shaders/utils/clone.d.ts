export type Uniform = Record<any, {
    type?: unknown;
    value?: unknown;
}>;
export declare function clone(uniforms_src: Uniform): Uniform;
