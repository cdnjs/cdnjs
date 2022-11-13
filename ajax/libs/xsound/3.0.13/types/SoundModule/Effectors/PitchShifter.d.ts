import { BufferSize } from '../../types';
import { Effector } from './Effector';
export declare type PitchShifterParams = {
    state?: boolean;
    pitch?: number;
};
/**
 * Effector's subclass for Pitch Shifter.
 * @constructor
 * @extends {Effector}
 */
export declare class PitchShifter extends Effector {
    static readonly GAIN_CORRECTION: 2;
    private pitch;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     * @param {BufferSize} bufferSize This argument is buffer size for `ScriptProcessorNode`.
     */
    constructor(context: AudioContext, bufferSize: BufferSize);
    /** @override */
    start(): void;
    /** @override */
    stop(): void;
    /** @override */
    connect(): GainNode;
    /**
     * This method gets or sets parameters for pitch shifter.
     * This method is overloaded for type interface and type check.
     * @param {keyof PitchShifterParams|PitchShifterParams} params This argument is string if getter. Otherwise, setter.
     * @return {PitchShifterParams[keyof PitchShifterParams]|PitchShifter} Return value is parameter for pitch shifter if getter.
     *     Otherwise, return value is for method chain.
     */
    param(params: 'state'): boolean;
    param(params: 'pitch'): number;
    param(params: PitchShifterParams): PitchShifter;
    /** @override */
    params(): Required<PitchShifterParams>;
    /** @override */
    activate(): PitchShifter;
    /** @override */
    deactivate(): PitchShifter;
}
//# sourceMappingURL=PitchShifter.d.ts.map