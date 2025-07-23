import type { Inputs, Outputs } from '../../../worklet';
import { OverlapAddProcessor } from '../../../worklet';
/**
 * This class extends `OverlapAddProcessor`.
 * Override `processOverlapAdd` method for noise suppressor and Update parameters on message event.
 */
export declare class NoiseSuppressorProcessor extends OverlapAddProcessor {
    private instance;
    private threshold;
    private isActive;
    constructor(options: AudioWorkletNodeOptions);
    /** @override */
    protected processOverlapAdd(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=NoiseSuppressorProcessor.d.ts.map