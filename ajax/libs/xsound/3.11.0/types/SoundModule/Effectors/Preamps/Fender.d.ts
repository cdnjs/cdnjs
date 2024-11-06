import type { CabinetParams } from './Cabinet';
import { Effector } from '../Effector';
export type SpeakerInches = -1 | 10 | 12 | 15;
export type PreEqualizerParams = {
    state?: boolean;
    gain?: number;
    bass?: number;
    middle?: number;
    treble?: number;
    level?: number;
    samples?: number;
    oversample?: OverSampleType;
};
export type PostFilterParams = {
    state?: boolean;
    inch?: SpeakerInches;
    tilt?: boolean;
};
export type FenderParams = {
    state?: boolean;
    pre?: PreEqualizerParams;
    post?: PostFilterParams;
    cabinet?: CabinetParams;
};
/**
 * Effector's subclass for Preamplifier (Fender).
 */
export declare class Fender extends Effector {
    private preEQ;
    private postFilter;
    private cabinet;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for preamp effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof FenderParams|FenderParams} params This argument is string if getter. Otherwise, setter.
     * @return {FenderParams[keyof FenderParams]|Fender} Return value is parameter for preamp effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'pre'): FenderParams['pre'];
    param(params: 'post'): FenderParams['post'];
    param(params: 'cabinet'): CabinetParams;
    param(params: FenderParams): Fender;
    /** @override */
    params(): Required<FenderParams>;
    /** @override */
    activate(): Fender;
    /** @override */
    deactivate(): Fender;
}
//# sourceMappingURL=Fender.d.ts.map