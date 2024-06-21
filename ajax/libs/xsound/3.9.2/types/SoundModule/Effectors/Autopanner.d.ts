import { Effector } from './Effector';
export type AutopannerParams = {
    state?: boolean;
    depth?: number;
    rate?: number;
};
/**
 * Effector's subclass for Autopanner.
 * @constructor
 * @extends {Effector}
 */
export declare class Autopanner extends Effector {
    private panner;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    stop(stopTime?: number, releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for autopanner effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof AutopannerParams|AutopannerParams} params This argument is string if getter. Otherwise, setter.
     * @return {AutopannerParams[keyof AutopannerParams]|Autopanner} Return value is parameter for autopanner effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'depth'): number;
    param(params: 'rate'): number;
    param(params: AutopannerParams): Autopanner;
    /** @override */
    params(): Required<AutopannerParams>;
    /** @override */
    activate(): Autopanner;
    /** @override */
    deactivate(): Autopanner;
}
//# sourceMappingURL=Autopanner.d.ts.map