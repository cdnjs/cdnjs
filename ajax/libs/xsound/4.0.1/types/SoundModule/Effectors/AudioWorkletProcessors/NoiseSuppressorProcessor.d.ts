import type { Inputs, Outputs } from '../../../worklet';
import { AudioWorkletProcessor } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for noise suppressor and Update parameters on message event.
 */
export declare class NoiseSuppressorProcessor extends AudioWorkletProcessor {
    private instance;
    private threshold;
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=NoiseSuppressorProcessor.d.ts.map