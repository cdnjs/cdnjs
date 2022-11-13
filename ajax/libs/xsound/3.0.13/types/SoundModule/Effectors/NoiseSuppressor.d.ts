import { BufferSize } from '../../types';
import { Effector } from './Effector';
export declare type NoiseSuppressorParams = {
    state?: boolean;
    threshold?: number;
};
/**
 * This private class is for Noise Suppressor.
 * @constructor
 * @extends {Effector}
 */
export declare class NoiseSuppressor extends Effector {
    private threshold;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     * @param {BufferSize} bufferSize This argument is buffer size for `ScriptProcessorNode`.
     */
    constructor(context: AudioContext, bufferSize: BufferSize);
    /** @override */
    start(): void;
    /** @override */
    stop(): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for noise suppressor.
     * @param {keyof NoiseSuppressorParams|NoiseSuppressorParams} params This argument is string if getter. Otherwise, setter.
     * @return {NoiseSuppressorParams[keyof NoiseSuppressorParams]|NoiseSuppressor} Return value is parameter for noise suppressor if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'threshold'): number;
    param(params: NoiseSuppressorParams): NoiseSuppressor;
    /** @override */
    params(): Required<NoiseSuppressorParams>;
    /** @override */
    activate(): NoiseSuppressor;
    /** @override */
    deactivate(): NoiseSuppressor;
    /**
     * This method detects background noise and removes this.
     * @param {Float32Array} inputs This argument is instance of `Float32Array` for FFT/IFFT.
     * @param {Float32Array} outputs This argument is instance of `Float32Array` for FFT/IFFT.
     * @param {number} fftSize This argument is FFT/IFFT size (power of two).
     */
    private suppress;
}
//# sourceMappingURL=NoiseSuppressor.d.ts.map