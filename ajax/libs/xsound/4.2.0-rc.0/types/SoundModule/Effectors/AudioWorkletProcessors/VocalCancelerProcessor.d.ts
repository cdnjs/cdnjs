import type { Inputs, Outputs } from '../../../worklet';
import { OverlapAddProcessor } from '../../../worklet';
/**
 * This class extends `OverlapAddProcessor`.
 * Override `processOverlapAdd` method for vocal canceler and Update parameters on message event.
 */
export declare class VocalCancelerProcessor extends OverlapAddProcessor {
    private instance;
    private algorithm;
    private depth;
    private minFrequency;
    private maxFrequency;
    private threshold;
    private isActive;
    constructor(options: AudioWorkletNodeOptions);
    /** @override */
    protected processOverlapAdd(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=VocalCancelerProcessor.d.ts.map