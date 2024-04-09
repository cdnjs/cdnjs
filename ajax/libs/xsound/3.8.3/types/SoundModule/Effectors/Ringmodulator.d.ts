import { Effector } from './Effector';
export type RingmodulatorParams = {
    state?: boolean;
    depth?: number;
    rate?: number;
};
/**
 * Effector's subclass for Ring Modulator.
 * @constructor
 * @extends {Effector}
 */
export declare class Ringmodulator extends Effector {
    private amplitude;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    stop(stopTime?: number, releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for ring modulator effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof RingmodulatorParams|RingmodulatorParams} params This argument is string if getter. Otherwise, setter.
     * @return {RingmodulatorParams[keyof RingmodulatorParams]|Autopanner} Return value is parameter for ring modulator effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: RingmodulatorParams): Ringmodulator;
    /** @override */
    params(): Required<RingmodulatorParams>;
    /** @override */
    activate(): Ringmodulator;
    /** @override */
    deactivate(): Ringmodulator;
}
//# sourceMappingURL=Ringmodulator.d.ts.map