import { Effector } from '/src/SoundModule/Effectors/Effector';
export type PreampCurve = Float32Array | null;
export type PreEqualizerParams = {
    state?: boolean;
    curve?: PreampCurve;
    gain?: number;
    lead?: number;
};
export type PostEqualizerParams = {
    state?: boolean;
    curve?: PreampCurve;
    bass?: number;
    middle?: number;
    treble?: number;
    frequency?: number;
};
export type CabinetParams = {
    state?: boolean;
};
export type PreampParams = {
    state?: boolean;
    level?: number;
    samples?: number;
    pre?: PreEqualizerParams;
    post?: PostEqualizerParams;
    cabinet?: CabinetParams;
};
/**
 * Effector's subclass for Pre-Equalizer.
 * @constructor
 * @extends {Effector}
 */
export declare class PreEqualizer extends Effector {
    private shaper;
    private gain;
    private leadGain;
    private lowpass;
    private highpass1;
    private highpass2;
    private highpass3;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for pre-equalizer.
     * This method is overloaded for type interface and type check.
     * @param {keyof PreEqualizerParams|PreEqualizerParams} params This argument is string if getter. Otherwise, setter.
     * @return {PreEqualizerParams[keyof PreEqualizerParams]} Return value is parameter for pre-equalizer if getter.
     */
    param(params: 'state'): boolean;
    param(params: 'curve'): Float32Array | null;
    param(params: 'gain'): number;
    param(params: 'lead'): number;
    param(params: PreEqualizerParams): void;
    /** @override */
    params(): Required<PreEqualizerParams>;
}
/**
 * Effector's subclass for Post-Equalizer.
 * @constructor
 * @extends {Effector}
 */
export declare class PostEqualizer extends Effector {
    private shaper;
    private bass;
    private middle;
    private treble;
    private lowpass;
    private highpass;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for post-equalizer.
     * This method is overloaded for type interface and type check.
     * @param {keyof PostEqualizerParams|PostEqualizerParams} params This argument is string if getter. Otherwise, setter.
     * @return {PostEqualizerParams[keyof PostEqualizerParams]} Return value is parameter for post-equalizer if getter.
     */
    param(params: 'state'): boolean;
    param(params: 'curve'): Float32Array | null;
    param(params: 'bass'): number;
    param(params: 'middle'): number;
    param(params: 'treble'): number;
    param(params: 'frequency'): number;
    param(params: PostEqualizerParams): void;
    /** @override */
    params(): Required<PostEqualizerParams>;
}
/**
 * Effector's subclass for Cabinet.
 * @constructor
 * @extends {Effector}
 */
export declare class Cabinet extends Effector {
    private lowpass;
    private notch;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for cabinet.
     * This method is overloaded for type interface and type check.
     * @param {keyof CabinetParams|CabinetParams} params This argument is string if getter. Otherwise, setter.
     * @return {CabinetParams[keyof CabinetParams]} Return value is parameter for cabinet if getter.
     */
    param(params: 'state'): boolean;
    param(params: CabinetParams): void;
    /** @override */
    params(): Required<CabinetParams>;
}
/**
 * Effector's subclass for Preamplifier.
 * @constructor
 * @extends {Effector}
 */
export declare class Preamp extends Effector {
    /**
     * This class (static) method creates instance of `Float32Array` for `WaveShaperNode`.
     * @param {number} level This argument is preamp effect level.
     * @param {number} numberOfSamples This argument is curve size.
     * @return {Float32Array|null} Return value is `WaveShaperNode`'s 'curve'.
     */
    static createCurve(level: number, numberOfSamples: number): Float32Array | null;
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
     * @param {keyof PreampParams|PreampParams} params This argument is string if getter. Otherwise, setter.
     * @return {PreampParams[keyof PreampParams]|Preamp} Return value is parameter for preamp effector if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'level'): number;
    param(params: 'samples'): number;
    param(params: 'pre'): PreEqualizerParams;
    param(params: 'post'): PostEqualizerParams;
    param(params: 'cabinet'): CabinetParams;
    param(params: PreampParams): Preamp;
    /** @override */
    params(): Required<PreampParams>;
    /** @override */
    activate(): Preamp;
    /** @override */
    deactivate(): Preamp;
}
//# sourceMappingURL=Preamp.d.ts.map