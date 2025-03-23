import type { Inputs, Outputs } from '../worklet';
import { AudioWorkletProcessor } from '../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for sound source (bypass).
 */
export declare class AudioModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=AudioModuleProcessor.d.ts.map