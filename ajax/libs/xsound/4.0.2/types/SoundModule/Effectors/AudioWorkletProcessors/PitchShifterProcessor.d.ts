import type { Inputs, Outputs } from '../../../worklet';
import { AudioWorkletProcessor } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for pitch shifter and Update parameters on message event.
 */
export declare class PitchShifterProcessor extends AudioWorkletProcessor {
    private instance;
    private isActive;
    private pitch;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=PitchShifterProcessor.d.ts.map