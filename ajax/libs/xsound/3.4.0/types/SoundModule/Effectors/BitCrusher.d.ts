import { Effector } from '/src/SoundModule/Effectors/Effector';
export type BitCrusherParams = {
    state?: boolean;
    bits?: number;
};
/**
 * Effector's subclass for BitCrusher.
 * @constructor
 * @extends {Effector}
 */
export declare class BitCrusher extends Effector {
    private shaper;
    private inputShaper;
    private outputShaper;
    private inputLevel;
    private outputLevel;
    private bitsInput;
    private bitsGain;
    private bits;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    start(_startTime?: number): void;
    /** @override */
    stop(_stopTime?: number, _releaseTime?: number): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for bit crusher effector.
     * This method is overloaded for type interface and type check.
     * @param {keyof BitCrusherParams|BitCrusherParams} params This argument is string if getter. Otherwise, setter.
     * @return {BitCrusherParams[keyof BitCrusherParams]|BitCrusher} Return value is parameter for bit crusher effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'bits'): number;
    param(params: BitCrusherParams): BitCrusher;
    /** @override */
    params(): Required<BitCrusherParams>;
    /** @override */
    activate(): BitCrusher;
    /** @override */
    deactivate(): BitCrusher;
}
//# sourceMappingURL=BitCrusher.d.ts.map