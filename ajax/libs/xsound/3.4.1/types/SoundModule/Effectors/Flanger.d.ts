import { Effector } from '/src/SoundModule/Effectors/Effector';
export type FlangerParams = {
    state?: boolean;
    time?: number;
    depth?: number;
    rate?: number;
    mix?: number;
    tone?: number;
    feedback?: number;
};
/**
 * Effector's subclass for Flanger.
 * @constructor
 * @extends {Effector}
 */
export declare class Flanger extends Effector {
    private delay;
    private tone;
    private mix;
    private feedback;
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
     * This method gets or sets parameters for flanger effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof FlangerParams|FlangerParams} params This argument is string if getter. Otherwise, setter.
     * @return {FlangerParams[keyof FlangerParams]|Flanger} Return value is parameter for flanger effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'time'): number;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: 'mix'): number;
    param(params: 'tone'): number;
    param(params: 'feedback'): number;
    param(params: FlangerParams): Flanger;
    /** @override */
    params(): Required<FlangerParams>;
    /** @override */
    activate(): Flanger;
    /** @override */
    deactivate(): Flanger;
}
//# sourceMappingURL=Flanger.d.ts.map