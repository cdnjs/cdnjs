import { AudioWorkletProcessor, Inputs, Outputs } from '../worklet';
/**
 * @constructor
 * @extends {AudioWorkletGlobalScope.AudioWorkletProcessor}
 */
export declare class StreamModuleProcessor extends AudioWorkletProcessor {
    constructor();
    /** @override */
    protected process(inputs: Inputs, outputs: Outputs): boolean;
}
//# sourceMappingURL=StreamModuleProcessor.d.ts.map