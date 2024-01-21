import { Effector } from './Effector';
export type StereoParams = {
    state?: boolean;
    time?: number;
};
/**
 * Effector's subclass for Stereo.
 * @constructor
 * @extends {Effector}
 */
export declare class Stereo extends Effector {
    static MAX_DELAY_TIME: number;
    private processor;
    private splitter;
    private merger;
    private delayL;
    private delayR;
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
     * This method gets or sets parameters for stereo effector
     * This method is overloaded for type interface and type check.
     * @param {keyof StereoParams|StereoParams} params This argument is string if getter. Otherwise, setter.
     * @return {StereoParams[keyof StereoParams]|Stereo} Return value is parameter for stereo effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'time'): number;
    param(params: StereoParams): Stereo;
    /** @override */
    params(): Required<StereoParams>;
    /** @override */
    activate(): Stereo;
    /** @override */
    deactivate(): Stereo;
}
//# sourceMappingURL=Stereo.d.ts.map