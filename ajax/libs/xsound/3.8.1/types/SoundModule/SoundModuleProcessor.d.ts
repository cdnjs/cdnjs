import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for sound source (bypass).
 * However, this processor is not used.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class SoundModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=SoundModuleProcessor.d.ts.map