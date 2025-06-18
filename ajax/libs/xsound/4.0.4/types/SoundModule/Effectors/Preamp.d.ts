import type { MarshallParams } from './Preamps/Marshall';
import type { MesaBoogieParams } from './Preamps/MesaBoogie';
import type { FenderParams } from './Preamps/Fender';
import { Effector } from './Effector';
export type PreampType = 'marshall' | 'mesa' | 'fender';
export type PreampCurve = Float32Array | null;
export type PreampParams = {
    state?: boolean;
    type?: PreampType;
    preamp?: MarshallParams | MesaBoogieParams | FenderParams;
};
/**
 * This function creates instance of `Float32Array` for `WaveShaperNode`.
 * @param {number} level This argument is preamp effect level.
 * @param {number} numberOfSamples This argument is curve size.
 * @return {Float32Array|null} Return value is `WaveShaperNode`'s 'curve'.
 */
export declare function createCurve(level: number, numberOfSamples: number): PreampCurve;
/**
 * Effector's subclass for Preamplifier.
 */
export declare class Preamp extends Effector {
    private type;
    private preamp;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for preamp effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof PreampParams|PreampParams} params This argument is string if getter. Otherwise, setter.
     * @return {PreampParams[keyof PreampParams]|Preamp} Return value is parameter for preamp effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'type'): PreampType;
    param(params: 'preamp'): PreampParams['preamp'];
    param(params: PreampParams): Preamp;
    /** @override */
    params(): Required<PreampParams>;
    /** @override */
    activate(): Preamp;
    /** @override */
    deactivate(): Preamp;
}
//# sourceMappingURL=Preamp.d.ts.map