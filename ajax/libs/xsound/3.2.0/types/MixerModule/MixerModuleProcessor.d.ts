import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * @constructor
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class MixerModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=MixerModuleProcessor.d.ts.map