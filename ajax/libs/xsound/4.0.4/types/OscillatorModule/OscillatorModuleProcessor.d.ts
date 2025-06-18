import type { Inputs, Outputs } from '../worklet';
import { AudioWorkletProcessor } from '../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Overrides `process` method for sound source (bypass).
 */
export declare class OscillatorModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=OscillatorModuleProcessor.d.ts.map