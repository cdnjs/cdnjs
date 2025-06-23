import type { Inputs, Outputs } from '../../../worklet';
import { OverlapAddProcessor } from '../../../worklet';
/**
 * This class extends `OverlapAddProcessor`.
 * Override `processOverlapAdd` method for pitch shifter and Update parameters on message event.
 */
export declare class PitchShifterProcessor extends OverlapAddProcessor {
    private instance;
    private timeCursor;
    private isActive;
    private pitch;
    constructor(options: AudioWorkletNodeOptions);
    /** @override */
    protected processOverlapAdd(inputs: Inputs, outputs: Outputs): void;
}
//# sourceMappingURL=PitchShifterProcessor.d.ts.map