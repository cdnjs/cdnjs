import { Statable } from '../../interfaces';
export type EnvelopeGeneratorParams = {
    state?: boolean;
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
};
/**
 * This private class is for Envelope Generator.
 * @constructor
 * @implements {Statable}
 */
export declare class EnvelopeGenerator implements Statable {
    static MIN_GAIN: number;
    private context;
    private generators;
    private activeIndexes;
    private activeCounter;
    private attack;
    private decay;
    private sustain;
    private release;
    private isActive;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method connects instance of `AudioNode`.
     * @param {number} index This argument is in order to select instance of `GainNode` that is Envelope Generator.
     * @param {AudioNode} input This argument is instance of `AudioNode` as input.
     * @param {AudioNode} output This argument is instance of `AudioNode` as output.
     */
    ready(index: number, input: AudioNode | null, output: AudioNode | null): void;
    /**
     * This method changes gain (Attack -> Decay -> Sustain).
     * @param {number} startTime This argument is start time of Attack.
     */
    start(startTime: number): void;
    /**
     * This method changes gain (Attack or Decay or Sustain -> Release).
     * @param {number} stopTime This argument is start time of Release.
     * @param {boolean} useCurve This argument is to use different methods. The default value is `false`.
     */
    stop(stopTime: number, useCurve?: boolean): void;
    /**
     * This method gets or sets parameters for envelope generator.
     * This method is overloaded for type interface and type check.
     * @param {keyof EnvelopeGeneratorParams|EnvelopeGeneratorParams} params This argument is string if getter. Otherwise, setter.
     * @return {EnvelopeGeneratorParams[keyof EnvelopeGeneratorParams]|EnvelopeGenerator} Return value is parameter for envelope generator if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'attack'): number;
    param(params: 'decay'): number;
    param(params: 'sustain'): number;
    param(params: 'release'): number;
    param(params: EnvelopeGeneratorParams): EnvelopeGenerator;
    /**
     * This method gets instance of `GainNode` for Envelope Generator.
     * @param {number} index This argument is index of array that contains instance of `GainNode` for Envelope Generator.
     * @return {GainNode} This is returned as instance of `GainNode` for Envelope Generator.
     */
    getGenerator(index: number): GainNode | null;
    /**
     * This method sets instance of `GainNode` for Envelope Generator.
     * @param {number} index This argument is index of array that contains instance of `GainNode` for Envelope Generator.
     * @return {EnvelopeGenerator} This is returned for method chain.
     */
    setGenerator(index: number): void;
    /**
     * This method determines whether the all of gain schedulings have ended.
     * @return {boolean} If the all of gain schedulings have ended, this value is `true`. Otherwise, this value is `false`.
     */
    paused(): boolean;
    /**
     * This method clears variables for managing instance of `GainNode`.
     * @param {boolean} isDisconnect This argument is in order to determine whether disconnect `AudioNode`.
     * @return {EnvelopeGenerator} This is returned for method chain.
     */
    clear(disconnected: boolean): void;
    /**
     * This method gets effector's parameters as associative array.
     * @return {EnvelopeGeneratorParams}
     */
    params(): Required<EnvelopeGeneratorParams>;
    /**
     * This method gets effector's parameters as JSON.
     * @return {string}
     */
    toJSON(): string;
    /**
     * This method gets envelope generator state. If returns `true`, envelope generator is active.
     * @return {boolean}
     */
    state(): boolean;
    /**
     * This method activates envelope generator.
     * @return {EnvelopeGenerator} Return value is for method chain.
     */
    activate(): EnvelopeGenerator;
    /**
     * This method deactivates envelope generator.
     * @return {EnvelopeGenerator} Return value is for method chain.
     */
    deactivate(): EnvelopeGenerator;
}
//# sourceMappingURL=EnvelopeGenerator.d.ts.map