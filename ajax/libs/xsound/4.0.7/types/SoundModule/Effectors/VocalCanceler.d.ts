import { Effector } from './Effector';
export type VocalCancelerAlgorithm = 'time' | 'spectrum';
export type VocalCancelerParams = {
    state?: boolean;
    algorithm?: VocalCancelerAlgorithm;
    depth?: number;
    minFrequency?: number;
    maxFrequency?: number;
    threshold?: number;
};
/**
 * This private class is for Vocal Canceler.
 */
export declare class VocalCanceler extends Effector {
    private processor;
    private algorithm;
    private minFrequency;
    private maxFrequency;
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
     * This method gets or sets parameters for vocal canceler.
     * @param {keyof VocalCancelerParams|VocalCancelerParams} params This argument is string if getter. Otherwise, setter.
     * @return {VocalCancelerParams[keyof VocalCancelerParams]|VocalCanceler} Return value is parameter for vocal canceler if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'algorithm'): VocalCancelerAlgorithm;
    param(params: 'depth'): number;
    param(params: 'minFrequency'): number;
    param(params: 'maxFrequency'): number;
    param(params: 'threshold'): number;
    param(params: VocalCancelerParams): VocalCanceler;
    /**
     * This method gets vocal canceler parameters as associative array.
     * @return {VocalCancelerParams}
     */
    params(): Required<VocalCancelerParams>;
    /** @override */
    activate(): VocalCanceler;
    /** @override */
    deactivate(): VocalCanceler;
}
//# sourceMappingURL=VocalCanceler.d.ts.map