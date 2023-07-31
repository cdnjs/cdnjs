import { Effector } from '/src/SoundModule/Effectors/Effector';
export type ChorusParams = {
    state?: boolean;
    time?: number;
    depth?: number;
    rate?: number;
    mix?: number;
    tone?: number;
    feedback?: number;
};
/**
 * Effector's subclass for Chorus.
 * @constructor
 * @extends {Effector}
 */
export declare class Chorus extends Effector {
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
     * This method gets or sets parameters for chorus effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof ChorusParams|ChorusParams} params This argument is string if getter. Otherwise, setter.
     * @return {ChorusParams[keyof ChorusParams]|Chorus} Return value is parameter for chorus effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'time'): number;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: 'mix'): number;
    param(params: 'tone'): number;
    param(params: 'feedback'): number;
    param(params: ChorusParams): Chorus;
    /** @override */
    params(): Required<ChorusParams>;
    /** @override */
    activate(): Chorus;
    /** @override */
    deactivate(): Chorus;
}
//# sourceMappingURL=Chorus.d.ts.map