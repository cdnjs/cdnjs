import { AudioWorkletProcessor, Inputs, Outputs } from '/src/worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for noise suppressor and Update parameters on message event.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class NoiseSuppressorProcessor extends AudioWorkletProcessor {
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
    private threshold;
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
    /**
     * This method detects background noise and removes this.
     * @param {Float32Array} inputs This argument is instance of `Float32Array` for FFT/IFFT.
     * @param {Float32Array} outputs This argument is instance of `Float32Array` for FFT/IFFT.
     * @param {number} fftSize This argument is FFT/IFFT size (power of two).
     */
    private suppress;
}
//# sourceMappingURL=NoiseSuppressorProcessor.d.ts.map