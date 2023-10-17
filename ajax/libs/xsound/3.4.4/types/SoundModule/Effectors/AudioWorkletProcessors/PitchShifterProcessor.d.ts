import { AudioWorkletProcessor, Inputs, Outputs } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for pitch shifter and Update parameters on message event.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class PitchShifterProcessor extends AudioWorkletProcessor {
    private static readonly GAIN_CORRECTION;
    /**
     * This class (static) method executes FFT.
     * @param {Float32Array} reals This argument is instance of `Float32Array` for real number.
     * @param {Float32Array} imags This argument is instance of `Float32Array` for imaginary number.
     * @param {number} size This argument is FFT size (power of two).
     */
    private static FFT;
    /**
     * This class (static) method executes IFFT.
     * @param {Float32Array} reals This argument is instance of `Float32Array` for real number.
     * @param {Float32Array} imags This argument is instance of `Float32Array` for imaginary number.
     * @param {number} size This argument is IFFT size (power of two).
     */
    private static IFFT;
    private isActive;
    private pitch;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
    /**
     * This method shifts pitch.
     * @param {Float32Array} inputs This argument is instance of `Float32Array` as input.
     * @param {Float32Array} outputs This argument is instance of `Float32Array` as output.
     * @param {number} size This argument is FFT size (power of two).
     */
    private shift;
}
//# sourceMappingURL=PitchShifterProcessor.d.ts.map