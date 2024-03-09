import { Effector } from './Effector';
export type EqualizerParams = {
    state?: boolean;
    bass?: number;
    middle?: number;
    treble?: number;
    presence?: number;
};
/**
 * Effector's subclass for Equalizer.
 * @constructor
 * @extends {Effector}
 */
export declare class Equalizer extends Effector {
    private bass;
    private middle;
    private treble;
    private presence;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     **/
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for equalizer.
     * This method is overloaded for type interface and type check.
     * @param {keyof EqualizerParams|EqualizerParams} params This argument is string if getter. Otherwise, setter.
     * @return {EqualizerParams[keyof EqualizerParams]|Equalizer} Return value is parameter for equalizer if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'bass'): number;
    param(params: 'middle'): number;
    param(params: 'treble'): number;
    param(params: 'presence'): number;
    param(params: EqualizerParams): Equalizer;
    /** @override */
    params(): Required<EqualizerParams>;
    /** @override */
    activate(): Equalizer;
    /** @override */
    deactivate(): Equalizer;
}
//# sourceMappingURL=Equalizer.d.ts.map