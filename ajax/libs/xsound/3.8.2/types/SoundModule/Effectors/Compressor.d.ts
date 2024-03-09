import { Effector } from './Effector';
export type CompressorParams = {
    state?: boolean;
    threshold?: number;
    knee?: number;
    ratio?: number;
    attack?: number;
    release?: number;
};
/**
 * Effector's subclass for Compressor.
 * @constructor
 * @extends {Effector}
 */
export declare class Compressor extends Effector {
    private compressor;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for compressor.
     * This method is overloaded for type interface and type check.
     * @param {keyof CompressorParams|CompressorParams} params This argument is string if getter. Otherwise, setter.
     * @return {CompressorParams[keyof CompressorParams]|Compressor} Return value is parameter for compressor if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'threshold'): number;
    param(params: 'knee'): number;
    param(params: 'ratio'): number;
    param(params: 'attack'): number;
    param(params: 'release'): number;
    param(params: CompressorParams): Compressor;
    /** @override */
    params(): Required<CompressorParams>;
    /** @override */
    activate(): Compressor;
    /** @override */
    deactivate(): Compressor;
}
//# sourceMappingURL=Compressor.d.ts.map