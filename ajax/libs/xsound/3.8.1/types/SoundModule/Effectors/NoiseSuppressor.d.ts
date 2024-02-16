import { Effector } from './Effector';
export type NoiseSuppressorParams = {
    state?: boolean;
    threshold?: number;
};
/**
 * This private class is for Noise Suppressor.
 * @constructor
 * @extends {Effector}
 */
export declare class NoiseSuppressor extends Effector {
    private processor;
    private threshold;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
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
}
//# sourceMappingURL=NoiseSuppressor.d.ts.map