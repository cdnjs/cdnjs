import { Effector } from './Effector';
export declare type NoiseGateParams = {
    state?: boolean;
    level?: number;
};
/**
 * This private class is for Noise Gate.
 * @constructor
 * @extends {Effector}
 */
export declare class NoiseGate extends Effector {
    private level;
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
     * This method gets or sets parameters for noise gate.
     * @param {keyof NoiseGateParams|NoiseGateParams} params This argument is string if getter. Otherwise, setter.
     * @return {NoiseGateParams[keyof NoiseGateParams]|NoiseGate} Return value is parameter for noise gate if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'level'): number;
    param(params: NoiseGateParams): NoiseGate;
    /** @override */
    params(): Required<NoiseGateParams>;
    /** @override */
    activate(): NoiseGate;
    /** @override */
    deactivate(): NoiseGate;
    /**
     * This method detects background noise and removes this.
     * @param {number} data This argument is amplitude (between -1 and 1).
     * @return {number} Return value is `0` or raw data.
     */
    private gate;
}
//# sourceMappingURL=NoiseGate.d.ts.map