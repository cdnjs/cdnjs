import type { Inputs, Outputs } from '../../../worklet';
import { AudioWorkletProcessor } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for noise gate and Update parameters on message event.
 */
export declare class NoiseGateProcessor extends AudioWorkletProcessor {
    private level;
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
    /**
     * This method detects background noise and removes this.
     * @param {number} data This argument is amplitude (between -1 and 1).
     * @return {number} Return value is `0` or raw data.
     */
    private gate;
}
//# sourceMappingURL=NoiseGateProcessor.d.ts.map