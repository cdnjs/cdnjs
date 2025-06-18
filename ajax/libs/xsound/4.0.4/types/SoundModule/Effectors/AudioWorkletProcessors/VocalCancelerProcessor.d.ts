import type { Inputs, Outputs } from '../../../worklet';
import { AudioWorkletProcessor } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for vocal canceler and Update parameters on message event.
 */
export declare class VocalCancelerProcessor extends AudioWorkletProcessor {
    private instance;
    private algorithm;
    private depth;
    private minFrequency;
    private maxFrequency;
    private threshold;
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=VocalCancelerProcessor.d.ts.map