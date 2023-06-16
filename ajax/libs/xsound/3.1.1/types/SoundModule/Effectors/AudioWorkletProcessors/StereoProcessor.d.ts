import { AudioWorkletProcessor, Inputs, Outputs } from '../../../worklet';
/**
 * This subclass is pseudo stereo effect.
 * @constructor
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class StereoProcessor extends AudioWorkletProcessor {
    private isActive;
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=StereoProcessor.d.ts.map