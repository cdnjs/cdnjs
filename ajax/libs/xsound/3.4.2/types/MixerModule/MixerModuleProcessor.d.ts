import { AudioWorkletProcessor, Inputs, Outputs } from '/src/worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for mixing sound source.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class MixerModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=MixerModuleProcessor.d.ts.map