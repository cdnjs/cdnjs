import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for generating noise.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class NoiseModuleProcessor extends AudioWorkletProcessor {
    private type;
    private b0;
    private b1;
    private b2;
    private b3;
    private b4;
    private b5;
    private b6;
    private lastOut;
    constructor();
    /** @override */
    protected process(_inputs: Inputs, outputs: Outputs): boolean;
    /**
     * This method generates white noise.
     * @param {Float32Array} outputs This argument is instance of `Float32Array` for output.
     * @param {number} bufferSize This argument is buffer size for instance of `Float32Array`.
     */
    private generateWhiteNoise;
    /**
     * This method generates pink noise.
     * @param {Float32Array} outputs This argument is instance of `Float32Array` for output.
     * @param {number} bufferSize This argument is buffer size for instance of `Float32Array`.
     */
    private generatePinkNoise;
    /**
     * This method generates brownian noise.
     * @param {Float32Array} outputs This argument is instance of `Float32Array` for output.
     * @param {number} bufferSize This argument is buffer size for instance of `Float32Array`.
     */
    private generateBrownianNoise;
}
//# sourceMappingURL=NoiseModuleProcessor.d.ts.map