import type { Inputs, Outputs } from '../worklet';
import { AudioWorkletProcessor } from '../worklet';
export type NoiseProcessingMessageEventData = {
    processing?: boolean;
};
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for generating noise.
 */
export declare class NoiseModuleProcessor extends AudioWorkletProcessor {
    private instance;
    private processing;
    private type;
    constructor();
    /** @override */
    protected process(_inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=NoiseModuleProcessor.d.ts.map