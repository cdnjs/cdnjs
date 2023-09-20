import { Effector } from '/src/SoundModule/Effectors/Effector';
export type DelayParams = {
    state?: boolean;
    time?: number;
    dry?: number;
    wet?: number;
    tone?: number;
    feedback?: number;
};
/**
 * Effector's subclass for Delay.
 * @constructor
 * @extends {Effector}
 */
export declare class Delay extends Effector {
    static MAX_DELAY_TIME: number;
    private delay;
    private dry;
    private wet;
    private tone;
    private feedback;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for delay effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof DelayParams|DelayParams} params This argument is string if getter. Otherwise, setter.
     * @return {DelayParams[keyof DelayParams]|Delay} Return value is parameter for delay effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'time'): number;
    param(params: 'dry'): number;
    param(params: 'wet'): number;
    param(params: 'tone'): number;
    param(params: 'feedback'): number;
    param(params: DelayParams): Delay;
    /** @override */
    params(): Required<DelayParams>;
    /** @override */
    activate(): Delay;
    /** @override */
    deactivate(): Delay;
}
//# sourceMappingURL=Delay.d.ts.map