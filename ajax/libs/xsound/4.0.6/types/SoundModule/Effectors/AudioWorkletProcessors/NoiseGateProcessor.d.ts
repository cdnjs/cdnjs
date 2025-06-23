import type { Inputs, Outputs } from '../../../worklet';
import { AudioWorkletProcessor } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for noise gate and Update parameters on message event.
 */
export declare class NoiseGateProcessor extends AudioWorkletProcessor {
    private instance;
    private level;
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=NoiseGateProcessor.d.ts.map