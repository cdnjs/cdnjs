import { AudioWorkletProcessor, Inputs, Outputs } from '/src/worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for sound source (bypass).
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class OscillatorModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=OscillatorModuleProcessor.d.ts.map