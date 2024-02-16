import { AudioWorkletProcessor, Inputs, Outputs } from '../../../worklet';
/**
 * This class extends `AudioWorkletProcessor`.
 * Override `process` method for stereo effect and Update parameters on message event.
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class StereoProcessor extends AudioWorkletProcessor {
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=StereoProcessor.d.ts.map