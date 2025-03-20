import type { CabinetParams } from './Cabinet';
import { Effector } from '../Effector';
export type PreEqualizerParams = {
    state?: boolean;
    gain?: number;
    bass?: number;
    middle?: number;
    treble?: number;
    level?: number;
    samples?: number;
    oversample?: OverSampleType;
    postFilters?: boolean;
};
export type PostEqualizerParams = {
    state?: boolean;
    fc100?: number;
    fc360?: number;
    fc720?: number;
    fc1600?: number;
    fc4800?: number;
};
export type MesaBoogieParams = {
    state?: boolean;
    pre?: PreEqualizerParams;
    post?: PostEqualizerParams;
    cabinet?: CabinetParams;
};
/**
 * Effector's subclass for Preamplifier (MesaBoogie).
 */
export declare class MesaBoogie extends Effector {
    private preEQ;
    private postEQ;
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
     * @param {keyof MesaBoogieParams|MesaBoogieParams} params This argument is string if getter. Otherwise, setter.
     * @return {MesaBoogieParams[keyof MesaBoogieParams]|MesaBoogie} Return value is parameter for preamp effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'pre'): MesaBoogieParams['pre'];
    param(params: 'post'): MesaBoogieParams['post'];
    param(params: 'cabinet'): CabinetParams;
    param(params: MesaBoogieParams): MesaBoogie;
    /** @override */
    params(): Required<MesaBoogieParams>;
    /** @override */
    activate(): MesaBoogie;
    /** @override */
    deactivate(): MesaBoogie;
}
//# sourceMappingURL=MesaBoogie.d.ts.map