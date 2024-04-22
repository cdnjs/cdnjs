import { Effector } from './Effector';
export type WahParams = {
    state?: boolean;
    auto?: boolean;
    cutoff?: number;
    depth?: number;
    rate?: number;
    resonance?: number;
};
/**
 * Effector's subclass for Wah.
 * @constructor
 * @extends {Effector}
 */
export declare class Wah extends Effector {
    private auto;
    private lowpass;
    private envelopeFollower;
    private sensitivity;
    private depthRate;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    stop(stopTime?: number, releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for wah effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof WahParams|WahParams} params This argument is string if getter. Otherwise, setter.
     * @return {WahParams[keyof WahParams]|Wah} Return value is parameter for wah effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'auto'): boolean;
    param(params: 'cutoff'): number;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: 'resonance'): number;
    param(params: WahParams): Wah;
    /** @override */
    params(): Required<WahParams>;
    /** @override */
    activate(): Wah;
    /** @override */
    deactivate(): Wah;
}
//# sourceMappingURL=Wah.d.ts.map