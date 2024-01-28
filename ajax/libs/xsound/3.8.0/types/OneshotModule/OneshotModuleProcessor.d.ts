import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for sound source (bypass).
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class OneshotModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=OneshotModuleProcessor.d.ts.map