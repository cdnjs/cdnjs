import type { Inputs, Outputs } from '../worklet';
import { AudioWorkletProcessor } from '../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for sound source (bypass).
 * However, this processor is not used.
 */
export declare class SoundModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=SoundModuleProcessor.d.ts.map