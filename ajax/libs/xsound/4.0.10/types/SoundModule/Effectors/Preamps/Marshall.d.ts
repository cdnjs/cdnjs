import type { PreampCurve } from '../Preamp';
import type { CabinetParams } from './Cabinet';
import { Effector } from '../Effector';
export type PreEqualizerParams = {
    state?: boolean;
    curve?: PreampCurve;
    oversample?: OverSampleType;
    gain?: number;
    lead?: number;
};
export type PostEqualizerParams = {
    state?: boolean;
    curve?: PreampCurve;
    oversample?: OverSampleType;
    bass?: number;
    middle?: number;
    treble?: number;
    frequency?: number;
};
export type MarshallParams = {
    state?: boolean;
    level?: number;
    samples?: number;
    pre?: PreEqualizerParams;
    post?: PostEqualizerParams;
    cabinet?: CabinetParams;
};
/**
 * Effector's subclass for Preamplifier (Marshall).
 */
export declare class Marshall extends Effector {
    private preEQ;
    private postEQ;
    private cabinet;
    private level;
    private numberOfSamples;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for preamp effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof MarshallParams|MarshallParams} params This argument is string if getter. Otherwise, setter.
     * @return {MarshallParams[keyof MarshallParams]|Marshall} Return value is parameter for preamp effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'level'): number;
    param(params: 'samples'): number;
    param(params: 'pre'): MarshallParams['pre'];
    param(params: 'post'): MarshallParams['post'];
    param(params: 'cabinet'): CabinetParams;
    param(params: MarshallParams): Marshall;
    /** @override */
    params(): Required<MarshallParams>;
    /** @override */
    activate(): Marshall;
    /** @override */
    deactivate(): Marshall;
}
//# sourceMappingURL=Marshall.d.ts.map